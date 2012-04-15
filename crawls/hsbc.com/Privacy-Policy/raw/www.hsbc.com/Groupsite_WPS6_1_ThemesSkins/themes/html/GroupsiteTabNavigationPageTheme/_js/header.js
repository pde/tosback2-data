HW.onload(function() {
	try{
	var csTrigger = $('country_select_trigger');
	if(csTrigger) {
		new HW.Ajax(csTrigger.href.split('#')[0],function(r){HW.Header.buildDropDown(r.text);},null);
	}
	new HW.ClearDefault('inputSearch');
	}
	catch(e)
	{
	}
});
		
HW.Header = {
	buildDropDown:function(text) {
		var dd = $('country_selector');
		if(dd) {
			// if the link requested has a hash value then pick out the right node
			if($('country_select_trigger').href.split('#')[1] !== null) {
				var idToLoad = $('country_select_trigger').href.split('#')[1];
				// first check the id doesn't exist in the current page, if it does then temporarily rename
				if($(idToLoad)) {
					$(idToLoad).id += '_tmpID';
				}
			}
			// create a placeholder for the imported content
			var div = HW.createNode('div',document.body);
			// find the body element
			var reg = new RegExp("<body[ a-zA-Z0-9=;:\-_\"]*>([\\w\\W]+)</body>");
			div.innerHTML = reg.exec(text)[1];
			HW.setStyle(div,{display:'none'});
			var c;
			if(idToLoad) {
				// get the node with id matching our hash value
				c = $($('country_select_trigger').href.split('#')[1]);
			}
			// if we have founbd a particular element, use it, else use the whole page
			var content = c?c.innerHTML:div.innerHTML;
			// remove placeholder
			document.body.removeChild(div);
			// reset the elements we changed id of earlier
			if($(idToLoad+'_tmpID')) {
				$(idToLoad+'_tmpID').id = idToLoad;
			}
			
			dd.innerHTML = content;
			
			HW.DropDown.add('dropDownLink','dropDownParent','dropDownContent','dropDownOpen');
		}
	}
}



HW.DropDown = {
	elements:[],
	add:function(linkClass,parentClass,contentClass,openClass) {
		var dds = HW.getElementsByClassName(linkClass,document.body,'a');
		for(var i=0;i<dds.length;i++) {
			var dd = new HW.DropDown.Element(dds[i],parentClass,contentClass,openClass);
		}
		var obj = this;
		HW.attachEvent(document,'click',function(e){obj.closeAll(e,parentClass);});
	},
	closeAll:function(e,pClass) {
		e=e||window.event;
		var trg = e.target||e.srcElement;
		var inDD = false;
		while(trg) {
			if(HW.hasClass(trg,pClass)) {
				inDD = trg;
			}
			trg = trg.parentNode;
		}
		for(var i=0;i<this.elements.length;i++) {
			if(inDD != this.elements[i].parent) {
				this.elements[i].close();
			}
		}
	}
}

HW.DropDown.Element = function(a,parentClass,contentClass,openClass) {
	this.parentClass = parentClass;
	this.contentClass = contentClass;
	this.openClass = openClass;
	var obj = this;
	a.onclick = function() {
		obj.toggle();
		this.blur();
		return false;
	}
	while(a.parentNode) {
		if(HW.hasClass(a.parentNode,this.parentClass)) {
			this.parent = a.parentNode;
		}
		a = a.parentNode;
	}
	if(this.parent) {
		this.trgs = HW.getElementsByClassName(HW.DropDown.contentClass,this.parent,'div');
		if(HW.isIE) {this.ieSelectHack();}
		for(var i=0;i<this.trgs.length;i++) {
			HW.hide(this.trgs[i]);
		}
		HW.DropDown.elements.push(this);
	}
}

HW.DropDown.Element.prototype = {
	opened:false,
	trgs:[],
	trans:null,
	toggle:function() {
		if(this.opened) {
			this.close();
		}
		else {
			this.open();
		}
	},
	open:function() {
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.display = 'block';
		}
		this.opened = true;
		HW.addClass(this.parent,this.openClass);
	},
	close:function() {
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.display = 'none';
		}
		this.opened = false;
		HW.removeClass(this.parent,this.openClass);
	},
	ieSelectHack:function() {
		var tmp = [];
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.visibility = 'hidden';
			this.trgs[i].style.display = 'block';
			var w = this.trgs[i].offsetWidth;
			var h = this.trgs[i].offsetHeight;
			this.trgs[i].style.display = 'none';
			this.trgs[i].style.visibility = 'visible';
			var iframe = document.createElement('iframe');
			iframe.src = '#';
			iframe.width = w+'px';
			iframe.height = h+'px';
			iframe.frameBorder = '0';
			HW.addClass(iframe,this.contentClass);
			HW.setFade(iframe,0);
			this.trgs[i].parentNode.insertBefore(iframe,this.trgs[i]);
			tmp.push(this.trgs[i]);
			tmp.push(iframe);
		}
		this.trgs = tmp;
	}
}

HW.ClearDefault = function(cls) {
	if(cls) {
		var inputs = $$(cls,document.body,'input');
		for(var i=0;i<inputs.length;i++) {
			var elm = this;
			(function(){
				var obj = inputs[i];
				inputs[i] = HW.extendObject(inputs[i],elm.Element);
				HW.attachEvent(inputs[i],'focus',function() {obj.focusHandler()});
				HW.attachEvent(inputs[i],'blur',function() {obj.blurHandler()});
			})()
		}
	}
}

HW.ClearDefault.prototype = {
	expClass:'clearField',
	Element:{
		focusHandler:function() {
			if (this.value == this.defaultValue) {this.value = '';}
			HW.removeClass(this,'clearField');
		},
		blurHandler:function() {
			if (this.value == "") {
				this.value= this.defaultValue;
				HW.addClass(this,'clearField');
			}
		}
	}
}

