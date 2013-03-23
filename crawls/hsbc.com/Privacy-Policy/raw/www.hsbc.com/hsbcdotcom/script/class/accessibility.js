function Accessibility(opt)
{

    this.settings = {
		"context" : document,
		"elements" : "a,input,select,radio,checkbox",
		"instructions" : null,
		"focusedClass" : "focused",
		"toolTipWrapperId" : "accessibilityToolTip",
		"pointerWrapperId" : "toolTipPointer",
		"hasToolTipClass" : "hasToolTip",
		"imageEnabledClass" : "images_enabled",
		"imageDisabledClass" : "images_disabled",
		"pingImage": "/hsbcdotcom/images/background/ping.gif",
		"toolTipTemplate" : "<div class='tooltip'><!--text--></div>",
		"labelTemplate" : "<span class='tooltip-label'></span>",
		"pointerTemplate" : "<span class='tooltip-pointer'></span>",
		//"pointerTemplate" : "<img src='../../../images/background/point.gif' />",
		"toolTipAttr": "data-tooltip",
		"hideOnMouseMove" : true,
		"pointOnFocus" : true,
		"pointOnGaps": false,
        "handdleDynamicContent" : true,
		"gapSize" : 200,
		"navKey" : 9,
		"enterKey" : 13,
		"escKey" : 27,
		"ctrlKey" : 17,
		"directions" : [],
		"groups" : [],
		"rules" : [],
		"tooltips" : []
	};

	this.events = {
		"focus" : "customFocus",
		"enter" : "customClick",
		"blur" : "customBlur",
		"tab" : "tabPress",
		"esc" : "escape"
	};
	this.exception = null;
	this.direction = "";
	this.selectedNode = null;
	this.prevNode = null;
	this.selectedNodeNo = 0;
	this.prevNodeNo = 0;
	this.selectedInstructionNodeNo = 0;
	this.navigating = false;
	this.insideGroup = false;
	this.lastGroup = null;
	this.pointerTop = 0;
	this.pointerLeft = 0;
	this.hasToolTip = false;
	this.lastPos = 0;
    this.settings = $.extend(this.settings, opt);

}

window.showInstructions = true;

Accessibility.prototype.init = function () {

    try {

        //if(this.settings.instructions!=null)
        //this.selectedNodeNo = 0-1;
        var obj = this;

        this.detectImageEnabled();

        obj.update();

        if (this.settings.handdleDynamicContent)
		{
			$(this.settings.context).ajaxStop(function () {
				obj.update(); 
			});
		}

    }
    catch (ex) {
        this.exception = ex;
    }
}

Accessibility.prototype.update = function () {

    try {

        //if(this.settings.instructions!=null)
        //this.selectedNodeNo = 0-1;
        var obj = this;

        for (var i = 0; i < obj.settings.rules.length; i++) {
            obj.processRule(obj.settings.rules[i]);
        }

        obj.processToolTips();

        $(obj.settings.context).unbind('keydown', obj.initKeyDown).bind('keydown', { "obj": obj }, obj.initKeyDown);

        if (obj.settings.hideOnMouseMove)
        $(obj.settings.context).unbind('mousemove', obj.initMouseMove).bind('mousemove', { "obj": obj }, obj.initMouseMove);

        $(obj.settings.elements).unbind('keyup', obj.initKeyUp).bind('keyup', { "obj": obj }, obj.initKeyUp);

        $(obj.settings.elements).unbind(obj.events.tab, obj.initTabPress).bind(obj.events.tab, { "obj": obj }, obj.initTabPress);

        for (var i = 0; i < obj.settings.groups.length; i++)
        obj.settings.groups[i].unbind(obj.events.tab).bind(obj.events.tab, { "obj": obj, "group": obj.settings.groups[i] }, obj.initGroupTabPress);


    }
    catch (ex) {
        this.exception = ex;
    }

}

Accessibility.prototype.detectImageEnabled = function(){
	
	var obj = this;
	var actionCounter = 0;
	var imageEnabled = false;
	var enabledAction = function(){
		if($("html").hasClass(obj.settings.imageDisabledClass))
		$("html").removeClass(obj.settings.imageDisabledClass);
		if($("html").hasClass(obj.settings.imageEnabledClass)==false)
		$("html").addClass(obj.settings.imageEnabledClass);
		imageEnabled = true;
	}
	var disabledAction = function(){
		if($("html").hasClass(obj.settings.imageEnabledClass))
		$("html").removeClass(obj.settings.imageEnabledClass);
		if($("html").hasClass(obj.settings.imageDisabledClass)==false)
		$("html").addClass(obj.settings.imageDisabledClass);
	}
	/* create image */
	var img = new Image();
	var currentTime = (new Date()).getTime();
	if(navigator.appName.indexOf('Microsoft Internet Explorer') != -1){// ie
		img.onload = enabledAction;
		img.onabort = enabledAction;
		img.onerror = enabledAction;
		img.src = obj.settings.pingImage+'?t='+currentTime;
		setTimeout(function(){
			if(imageEnabled==false)
			disabledAction();
		}, 0);
	}else if (navigator.appName.indexOf('Opera') != -1) {// opera
		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="+'?time='+(new Date()).getTime();
		if(img.complete){
			enabledAction();
		}else{
			disabledAction();
		}
	}else{// other
		img.src = obj.settings.pingImage+'?t='+currentTime;
		if(navigator.userAgent.indexOf('BlackBerry') != -1)
		{
			if(img.complete){
				enabledAction();
				}else{
				disabledAction();
			}
		}
		else
		{
			if(img.complete){
				disabledAction();
				}else{
				enabledAction();
			}
		}
	}
}

Accessibility.prototype.initKeyDown = function(e) {
		
	var keyCode = e.keyCode;
	var shiftKey = e.shiftKey;
	var obj = e.data.obj;
	var activeEl = $(document.activeElement);
	
	if(keyCode==obj.settings.navKey)
	{
		obj.navigating = true;
		$(obj.settings.elements).removeClass(obj.settings.focusedClass);
		
		if(obj.settings.instructions!=null && window.showInstructions==true)
		{
			if(obj.settings.instructions.css("display")=="block")
			{
				
				e.preventDefault();
				var instructionLinks = obj.settings.instructions.find("a");
			
				/*if(shiftKey==true)
				{
					if(obj.selectedNodeNo>0)
					obj.selectedNodeNo-=1;
					else
					obj.selectedNodeNo=instructionLinks.length-1;
				}
				else
				{
					if(obj.selectedNodeNo<(instructionLinks.length-1))
					obj.selectedNodeNo+=1;
					else
					obj.selectedNodeNo=0;
				}*/
				
				if(shiftKey==true)
				{
					
					if(obj.selectedInstructionNodeNo>0 && obj.selectedInstructionNodeNo<instructionLinks.length && obj.insideGroup==true)
					obj.selectedInstructionNodeNo-=1;
					else if(obj.selectedInstructionNodeNo==(instructionLinks.length-1) && obj.insideGroup==false)
					{
						obj.selectedInstructionNodeNo = instructionLinks.length-1;
						obj.insideGroup = true;
					}
					else
					obj.selectedInstructionNodeNo = instructionLinks.length-1;

				}
				else
				{
					if(obj.selectedInstructionNodeNo>=0 && obj.selectedInstructionNodeNo<(instructionLinks.length-1) && obj.insideGroup==true)
					obj.selectedInstructionNodeNo+=1;
					else if(obj.selectedInstructionNodeNo==0 && obj.insideGroup==false)
					{
						obj.selectedInstructionNodeNo = 0;
						obj.insideGroup = true;
					}
					else if(obj.selectedInstructionNodeNo>0 && obj.selectedInstructionNodeNo<(instructionLinks.length-1) && obj.insideGroup==false)
					obj.selectedInstructionNodeNo+=1;
					else
					obj.selectedInstructionNodeNo = 0;
					
				}
				
				instructionLinks.removeClass(obj.settings.focusedClass);
				instructionLinks.eq(obj.selectedInstructionNodeNo).focus();
				instructionLinks.eq(obj.selectedInstructionNodeNo).addClass(obj.settings.focusedClass);
				return false;
				
			}
			else
			{
				obj.toggleInfoBox();
			}
			
		}
		
		if(obj.settings.instructions==null || window.showInstructions==false)
		{
			var match = false;
			for(var i=0; i<obj.settings.groups.length; i++)
			{
				var tempCount=1;
				var tempMax = obj.settings.groups[i].length;
				
				obj.settings.groups[i].each(function() {
				
					if((shiftKey==false && tempCount!=tempMax) || (shiftKey==true && tempCount!=1))
					{
						if($(this).is(activeEl))
						{
							match = true;
							return false;
						}
					}
					tempCount++;
				
				});
			}
			if(match==true)
			{
				e.preventDefault();
				return false;
			}
		}
		
	}
	else if(keyCode==obj.settings.escKey)
	{
		e.preventDefault();
		obj.initReset(e);
		if(obj.selectedNode!=null)
		{
			var event = jQuery.Event(obj.events.esc);
			event.keyCode = keyCode;
			event.shiftKey = e.shiftKey;
			obj.selectedNode.trigger(event);
		}
	}
	else if(keyCode==obj.settings.enterKey)
	{
		if(obj.selectedNode!=null)
		{
			var event = jQuery.Event(obj.events.enter);
			event.keyCode = keyCode;
			event.shiftKey = e.shiftKey;
			obj.selectedNode.trigger(event);
		}
	}
	else if(keyCode==obj.settings.ctrlKey)
	{
		if(obj.selectedNode!=null)
		{
			if(obj.settings.pointOnFocus)
			{
				$('html,body').animate({scrollTop: obj.lastPos}, 300);
				obj.pointFocused();
			}
		}
	}
	
}

Accessibility.prototype.initMouseMove = function(e) {
	
	var obj = e.data.obj;
	obj.initReset(e);
	
}

Accessibility.prototype.initReset = function(e) {
	
	var obj = (e!==undefined) ? e.data.obj : this;
	
	if(obj.navigating==true)
	{
		if(this.settings.instructions!=null && this.settings.instructions.css("display")=="block")
		{
			window.showInstructions = false;
			this.settings.instructions.slideUp(500);
			//obj.selectedNodeNo = 0-1;
		}

		
		$(obj.settings.elements).removeClass(obj.settings.focusedClass);
		$("#"+obj.settings.toolTipWrapperId).remove();
		
		var pointer = $("#"+this.settings.pointerWrapperId);
		if(pointer.length>0)
		pointer.remove();
		
		var event = jQuery.Event(obj.events.blur);
		$(obj.settings.elements).trigger(event);
		
		obj.navigating = false;
	}

}

Accessibility.prototype.initKeyUp = function(e) {
			
	var keyCode = e.keyCode;
	var obj = e.data.obj;
	obj.selectedNode = $(this);
	//$(obj.settings.elements).removeClass(obj.settings.focusedClass);
	
	if(obj.settings.instructions==null || obj.settings.instructions.css("display")=="none")
	{

		//tab
		if(keyCode==obj.settings.navKey)
		{
			e.preventDefault();
			var event = jQuery.Event(obj.events.tab);
			event.keyCode = keyCode;
			event.shiftKey = e.shiftKey;
			obj.selectedNode.trigger(event);	
		}
	}
	
}

Accessibility.prototype.initTabPress = function(e) {
			
	var obj = e.data.obj;
	
	obj.insideGroup = false;
	obj.setFocus($(this),e);
	
}

Accessibility.prototype.initGroupTabPress = function(e) {
				
	e.preventDefault();
	var keyCode = e.keyCode;
	var shiftKey = e.shiftKey;
	var obj = e.data.obj;
	var group = e.data.group;
	
	obj.lastGroup = group;

	if(shiftKey==true)
	{
		
		if(obj.selectedNodeNo>0 && obj.selectedNodeNo<group.length && obj.insideGroup==true)
		obj.selectedNodeNo-=1;
		else if(obj.selectedNodeNo==(group.length-1) && obj.insideGroup==false)
		{
			obj.selectedNodeNo = group.length-1;
			obj.prevNodeNo = group.length-1;
			obj.insideGroup = true;
		}
		else
		{
			obj.selectedNodeNo = group.length-1;
			obj.prevNodeNo = group.length-1;
			obj.insideGroup = true;
		}

	}
	else
	{
		if(obj.selectedNodeNo>=0 && obj.selectedNodeNo<(group.length-1) && obj.insideGroup==true)
		obj.selectedNodeNo+=1;
		else if(obj.selectedNodeNo==0 && obj.insideGroup==false)
		{
			obj.selectedNodeNo=0;
			obj.prevNodeNo=0;
			obj.insideGroup = true;
		}
		else if(obj.selectedNodeNo>0 && obj.selectedNodeNo<(group.length-1) && obj.insideGroup==false)
		obj.selectedNodeNo+=1;
		else
		{
			obj.selectedNodeNo=0;
			obj.prevNodeNo=0;
			obj.insideGroup = true;
		}
		
	}
	//console.log(obj.selectedNodeNo);
	
	var prevNode = group.eq(obj.prevNodeNo);
	var selectedNode = group.eq(obj.selectedNodeNo);
	//group.removeClass(obj.settings.focusedClass);
	
	if(selectedNode.is(prevNode)==false)
	{
		var event = jQuery.Event(obj.events.blur);
		event.keyCode = (e!==undefined) ? keyCode : obj.settings.navKey ;
		event.shiftKey = (e!==undefined) ? e.shiftKey : false ;
		prevNode.trigger(event);
	}
	
	obj.prevNodeNo = obj.selectedNodeNo;
	obj.setFocus(selectedNode,e);	
	
}

Accessibility.prototype.setFocus = function(el,e) { 
	
	if(e!==undefined)
	{
		var keyCode = e.keyCode;
		var obj = e.data.obj;
	}
	else
	{
		var obj = this;
	}
	
	obj.selectedNode = el;
	obj.selectedNode.focus();
	$(obj.settings.elements).removeClass(obj.settings.focusedClass);
	obj.selectedNode.addClass(obj.settings.focusedClass);
	
	if(obj.prevNode!=null)
	{
		var event = jQuery.Event(obj.events.blur);
		event.keyCode = (e!==undefined) ? keyCode : obj.settings.navKey ;
		event.shiftKey = (e!==undefined) ? e.shiftKey : false ;
		obj.prevNode.trigger(event);
	}
	var event = jQuery.Event(obj.events.focus);
	event.keyCode = (e!==undefined) ? keyCode : obj.settings.navKey;
	event.shiftKey = (e!==undefined) ? e.shiftKey : false ;
	obj.selectedNode.trigger(event);

	
	if(e===undefined)
	el.focus();
	
	obj.prevNode = obj.selectedNode;

	obj.updateToolTip();

}

Accessibility.prototype.updateToolTip = function(delay) {
	
	var obj = this;
	var direction = "left";
	var delay = (delay!==undefined) ? parseInt(delay) : 0;
	
	setTimeout(function() {
	
		if($("#"+obj.settings.toolTipWrapperId).length>0)
		$("#"+obj.settings.toolTipWrapperId).remove();
		
		obj.hasToolTip = false;
		
		var toolTipText = obj.selectedNode.attr(obj.settings.toolTipAttr);
		if(toolTipText!==undefined && toolTipText!="")
		{
			var toolTipHtml = obj.settings.toolTipTemplate.replace("<!--text-->",toolTipText);
			toolTipHtml = "<div id='"+obj.settings.toolTipWrapperId+"' class='"+obj.settings.toolTipWrapperId+"'>"+toolTipHtml+"</div>";
			obj.hasToolTip = true;			
		}
		else
		{
			toolTipHtml = "<div id='"+obj.settings.toolTipWrapperId+"' class='"+obj.settings.toolTipWrapperId+"'>"+obj.settings.labelTemplate+"</div>";
		}
		
		//obj.selectedNode.before(toolTipHtml);
		$("body").append(toolTipHtml);
		
		for(var i=0; i<obj.settings.directions.length; i++)
		{
			if(obj.settings.directions[i][0].is(obj.selectedNode))
			direction = obj.settings.directions[i][1];
		}
		
		var toolTip = $("#"+obj.settings.toolTipWrapperId);
		var tooltipTop = obj.selectedNode.offset().top;
		var tooltipLeft = obj.selectedNode.offset().left;
		var helptipwidth = toolTip.children().eq(0).outerWidth();
		var helptipheight = toolTip.outerHeight();
		var nodeWidth = obj.selectedNode.outerWidth();
		var nodeHeight = obj.selectedNode.outerHeight();
		
		obj.pointerTop = tooltipTop;
		obj.pointerLeft = tooltipLeft;
		var paddingTop = 0;
		var paddingLeft = 0;
		
		if(direction=="right")
		{
			tooltipTop = tooltipTop;
			tooltipLeft = tooltipLeft+nodeWidth;
		}
		else if(direction=="top")
		{
			tooltipTop = tooltipTop - helptipheight;
			tooltipLeft = tooltipLeft;
		}
		else if(direction=="bottom")
		{
			tooltipTop = tooltipTop + nodeHeight + parseFloat(obj.selectedNode.css("padding-top")) + parseFloat(obj.selectedNode.css("padding-bottom"));
			tooltipLeft = tooltipLeft;
		}
		else
		{
			paddingTop = (toolTipText!==undefined && toolTipText!="") ? 0 : parseFloat(obj.selectedNode.css("padding-top"));
			paddingLeft = (toolTipText!==undefined && toolTipText!="") ? 0 : parseFloat(obj.selectedNode.css("padding-left"));
			tooltipTop = tooltipTop + paddingTop;
			tooltipLeft = tooltipLeft-helptipwidth;
		}
		
		obj.pointerTop += paddingTop;
		//obj.pointerLeft += paddingLeft;
		
		toolTip.css({"position":"absolute"});
		toolTip.offset({top:tooltipTop,left:tooltipLeft});
		
		
		var pos = tooltipTop - ($(window).height()/2);
		pos = (tooltipTop>($(window).height()/2)) ? pos : $('html,body').scrollTop();
		var gap = Math.abs(pos-obj.lastPos);
		if(gap>10)
		$('html,body').animate({scrollTop: pos}, 300);
		//$('html,body').scrollTop(pos);
		if(gap>obj.settings.gapSize && obj.settings.pointOnGaps==true)
		obj.pointFocused();
		obj.lastPos = pos;
	
	},delay);
}

Accessibility.prototype.pointFocused = function() { 
		
	if(this.settings.instructions==null || window.showInstructions==false)
	{
		var pointer = $("#"+this.settings.pointerWrapperId);
		if(pointer.length>0)
		pointer.remove();
		var cls = (this.hasToolTip) ? " "+this.settings.hasToolTipClass : "";
		pointer = "<div id='"+this.settings.pointerWrapperId+"' class='"+this.settings.pointerWrapperId+cls+"'>"+this.settings.pointerTemplate+"</div>";
		//this.selectedNode.before(pointer);
		$("body").append(pointer);
		pointer = $("#"+this.settings.pointerWrapperId);
		pointer.css({"position":"absolute"});
		pointer.offset({top:this.pointerTop,left:this.pointerLeft});
		setTimeout(function() { pointer.remove(); },1000);
	}

}

Accessibility.prototype.customTrigger = function(e) { 
		
	var right_event = e.data.event;
	var right_element = e.data.element;
	right_element = (typeof right_element=="string") ? eval("$(this)."+right_element) : right_element;
	right_element.trigger(right_event);

}

Accessibility.prototype.customFunction = function(e) { 
		
	var obj = e.data.obj;
	var func = e.data.func;
	var node = $(this);
	var group = e.data.group;
	eval("obj."+func);

}

Accessibility.prototype.processRule = function(rule) {

	try
	{
		if(rule.indexOf(" trigger ")>=0)
		{
			var ruleSplits = rule.split(" trigger ");
			var mode = "trigger";
		}
		else if(rule.indexOf(" run ")>=0)
		{
			var ruleSplits = rule.split(" run ");
			var mode = "run";
		}
		else if(rule.indexOf("group ")>=0)
		{
			var ruleSplits = rule.split("group ");
			var mode = "group";
		}
		else
		{
			throw "Invalid rule.";
		}
		
		if(mode=="trigger" || mode=="run")
		{
			var left = ruleSplits[0];
			var right = ruleSplits[1];
			
			left = left.replace(/\bfocus\b/gi,this.events.focus);
			left = left.replace(/\benter\b/gi,this.events.enter);
			left = left.replace(/\bblur\b/gi,this.events.blur);
			left = left.replace(/\besc\b/gi,this.events.esc);
			var left_splits = left.split(" on ");
			var left_event = left_splits[0];
			var left_pattern =  /^\$\(('|")[\w->\.# ]+('|")\)(\.[\w-]+\(((('|")[\w->\.# ]+('|"))|([\d]+))?\))*$/i;
			if(left_splits[1]=="document")
			var left_element = $(eval(left_splits[1]));
			else if(left_pattern.exec(left_splits[1])!=null)
			var left_element = eval(left_splits[1]);
			else
			var left_element = $(left_splits[1]);
		}
		else if(mode=="group")
		{
			var group = (typeof ruleSplits[1]=="undefined") ? ruleSplits[0] : ruleSplits[1];
			var group = $(group);
			this.addGroup(group);
		}
		
		if(mode=="trigger")
		{
			var right_splits = right.split(" on ");
			var right_event = right_splits[0];
			var right_pattern =  /(parent|children|siblings|next|prev)+/i;
			if(right_pattern.exec(right_splits[1])!=null)
			var right_element = right_splits[1];
			else
			var right_element = eval("$('"+right_splits[1]+"')");
				
			left_element.unbind(left_event,this.customTrigger).bind(left_event, {"event":right_event,"element":right_element} , this.customTrigger);
		}
		else if(mode=="run")
		{
			left_element.unbind(left_event,this.customFunction).bind(left_event, {"func":right,"obj":this,"group":left_element} ,this.customFunction);
		}

	}
	catch(ex)
	{
		this.exception = ex;
	}

}

Accessibility.prototype.processToolTips = function() {

	try
	{
		for(var i=0; i<this.settings.tooltips.length; i++)
		{
			this.settings.tooltips[i][0].attr(this.settings.toolTipAttr,this.settings.tooltips[i][1]);
		}

	}
	catch(ex)
	{
		this.exception = ex;
	}

}

Accessibility.prototype.toggleInfoBox = function() {
	if(this.settings.instructions!=null && this.settings.instructions.css("display")=="block")
	{
		window.showInstructions = false;
		this.settings.instructions.slideUp(500);
		this.selectedNodeNo = 0-1;
	}
	else if(this.settings.instructions!=null && this.settings.instructions.css("display")=="none")
	{
		window.showInstructions = true;
		var instructionLinks = this.settings.instructions.find("a");
		instructionLinks.removeClass(this.settings.focusedClass);
		instructionLinks.eq(this.selectedInstructionNodeNo).focus();
		instructionLinks.eq(this.selectedInstructionNodeNo).addClass(this.settings.focusedClass);
		
		this.settings.instructions.slideDown(500);
		$('html, body').animate({ scrollTop: 0 }, 300);
	}
}

Accessibility.prototype.addRule = function(rule) { this.settings.rules.push(rule); }
Accessibility.prototype.addGroup = function(group) { this.settings.groups.push(group); }
Accessibility.prototype.addToolTip = function(element,tooltip) { var tmpArray = []; tmpArray.push(element); tmpArray.push(tooltip); this.settings.tooltips.push(tmpArray); }
Accessibility.prototype.addDirection = function(element,direction) { var tmpArray = []; tmpArray.push(element); tmpArray.push(direction); this.settings.directions.push(tmpArray); }

Accessibility.prototype.setContext = function (context) { this.settings.context = context; }
Accessibility.prototype.getContext = function () { return this.settings.context; }

Accessibility.prototype.setElements = function (elements) { this.settings.elements = elements; }
Accessibility.prototype.getElements = function () { return this.settings.elements; }

Accessibility.prototype.setInstructions = function (instructions) { this.settings.instructions = instructions; }
Accessibility.prototype.getInstructions = function () { return this.settings.instructions; }

Accessibility.prototype.setFocusedClass = function (focusedClass) { this.settings.focusedClass = focusedClass; }
Accessibility.prototype.getFocusedClass = function () { return this.settings.focusedClass; }

Accessibility.prototype.setToolTipWrapperId = function (toolTipWrapperId) { this.settings.toolTipWrapperId = toolTipWrapperId; }
Accessibility.prototype.getToolTipWrapperId = function () { return this.settings.toolTipWrapperId; }

Accessibility.prototype.setToolTipTemplate = function (toolTipTemplate) { this.settings.toolTipTemplate = toolTipTemplate; }
Accessibility.prototype.getToolTipTemplate = function () { return this.settings.toolTipTemplate; }

Accessibility.prototype.setPointerWrapperId = function (pointerWrapperId) { this.settings.pointerWrapperId = pointerWrapperId; }
Accessibility.prototype.getPointerWrapperId = function () { return this.settings.pointerWrapperId; }

Accessibility.prototype.setPointerTemplate = function (pointerTemplate) { this.settings.pointerTemplate = pointerTemplate; }
Accessibility.prototype.getPointerTemplate = function () { return this.settings.pointerTemplate; }

Accessibility.prototype.setLabelTemplate = function (labelTemplate) { this.settings.labelTemplate = labelTemplate; }
Accessibility.prototype.getLabelTemplate = function () { return this.settings.labelTemplate; }

Accessibility.prototype.setToolTipAttr = function (toolTipAttr) { this.settings.toolTipAttr = toolTipAttr; }
Accessibility.prototype.getToolTipAttr = function () { return this.settings.toolTipAttr; }

Accessibility.prototype.setHideOnMouseMove = function (hideOnMouseMove) { this.settings.hideOnMouseMove = hideOnMouseMove; }
Accessibility.prototype.getHideOnMouseMove = function () { return this.settings.hideOnMouseMove; }

Accessibility.prototype.setPointOnFocus = function (pointOnFocus) { this.settings.pointOnFocus = pointOnFocus; }
Accessibility.prototype.getPointOnFocus = function () { return this.settings.pointOnFocus; }

Accessibility.prototype.setpointOnGaps = function (pointOnGaps) { this.settings.pointOnGaps = pointOnGaps; }
Accessibility.prototype.getpointOnGaps = function () { return this.settings.pointOnGaps; }

Accessibility.prototype.setHanddleDynamicContent = function (handdleDynamicContent) { this.settings.handdleDynamicContent = handdleDynamicContent; }
Accessibility.prototype.getHanddleDynamicContent = function () { return this.settings.handdleDynamicContent; }

Accessibility.prototype.setNavKey = function (navKey) { this.settings.navKey = navKey; }
Accessibility.prototype.getNavKey = function () { return this.settings.navKey; }

Accessibility.prototype.setEnterKey = function (enterKey) { this.settings.enterKey = enterKey; }
Accessibility.prototype.getEnterKey = function () { return this.settings.enterKey; }

Accessibility.prototype.setEscKey = function (escKey) { this.settings.escKey = escKey; }
Accessibility.prototype.getEscKey = function () { return this.settings.escKey; }

