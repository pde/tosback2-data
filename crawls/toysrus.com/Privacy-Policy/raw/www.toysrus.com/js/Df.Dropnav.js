if(Df){
}else{
	var Df = {}
}
Df.Dropnav = function(el){
	//BEGIN constructor
	var ele = this.ele = $(el)
	
	var pars = this.pars = {
		animate: false,
		pause:200,
		iframe: true,
		activeClassName: 'active',
		eventType: 'hover',
		onDisplay: false,
		onHide: false,
		childElement: 'UL'
	}
	
	var status = false;
	var displayStatus = false;
	var list, animation;
	
	this.version = function(){
		return 1.2;
	}
	
	this.requires = function(){
		return [
			'/js/Df.js',
			'/js/prototype1_6.js',
			'/js/prototype1_6_extend.js',
			'/js/Df.Animate.js'
			];
	}
	
	this.set = function(para){
		if(para){
			pars = Object.extend(pars,para)
		}
		
		list = ele.getElementsByTagName(pars.childElement)[0];
		if(list){
			
			if(pars.animate){
				animation = new Df.Animate(list);
				if(pars.animate){
					animation.pars = Object.extend(animation.pars,pars.animate);
				}
			}
			
			if(pars.eventType == "hover"){
				Event.observe(ele, 'mouseover', display ,false);
				Event.observe(ele, 'mouseout', hide ,false);
			}
			else if(pars.eventType == "click"){
				Event.observe(ele, 'click', waitToDisplay ,false);
			}
		}
	}
	
	this.getState = function(){
		return displayStatus;
	}
	
	var display = this.display = function(event){
		status = true;
		if (Prototype.Browser.WebKit) {
			waitToDisplay(event);
		} else {
			setTimeout(function(){waitToDisplay(event)},pars.pause);
		}
	}
	
	var hide = this.hide = function(event){
		status = false;
		if (Prototype.Browser.WebKit) {
			waitToHide(event);
		} else {
			setTimeout(function(){waitToHide(event)},pars.pause);
		}
	}
	
	var waitToDisplay = function(event){
		
		if(pars.eventType == 'click'){
			findOpen();
			status = true;
		}
		
		if(status && !displayStatus){
		
			displayStatus = true;
			
			if(pars.eventType == "click"){
				Event.stop(event)
				Event.stopObserving(ele,'click',waitToDisplay,false)
				Event.observe(ele,'click',waitToHide,false)
				Event.observe(document.body,'click',waitToHide,false)
			}
			
			if(pars.activeClassName){
				ele.addClassName(pars.activeClassName)
			}
			
			if((ele == event.target || ele == event.target.parentNode) && pars.onDisplay){
				pars.onDisplay(ele);
			}
			
			list.style.display = "block";
			
			if(animation){
				if(animation.getHistoryCount() == 0){
					animation.run();	
				}else{
					animation.last();
				}
			}
			
			if((Df.browser()).ie6 && pars.iframe){
				showIframe();
			}
		}
	}
	
	var waitToHide = this.waitToHide = function(event){
		
		if(pars.eventType == 'click'){
			status = false;
		}
		
		if(!status){
			
			displayStatus = false;
			
			if(animation){
				if(animation.getHistoryCount() > 0){
					animation.first({onComplete: function(){
							finishHide();
						}
					});
				}
				
			}else{
				finishHide()
			}
			
			if((Df.browser()).ie6 && pars.iframe){
				hideIframe();
			}
		}
	}
	
	var finishHide = function(){
		
		list.style.display = "none";
				
		if(pars.activeClassName){
			ele.removeClassName(pars.activeClassName)
		}
		
		if(pars.onHide){
			pars.onHide(ele);
		}
		
		if(pars.eventType == 'click'){
			Event.stopObserving(ele,'click',waitToHide,false)
			Event.stopObserving(document.body,'click',waitToHide,false)
			Event.observe(ele,'click',waitToDisplay,false)
		}
	}
	
	var showIframe = function(){
		var oDiv = ele.select('iframe.oDiv')[0];
		if(oDiv){
			oDiv.style.display = "block";
		}else{
			var html = '<iframe class="oDiv" style="display:block; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" src="javascript:false;" frameborder="0" height="'+ parseInt(list.offsetHeight) +'px" width="'+ parseInt(list.offsetWidth) +'px"></iframe>';
			new Insertion.Top(ele, html);
		}
	}

	var hideIframe = function(){
		var oDiv = ele.select('iframe.oDiv')[0];
		if(oDiv){
			oDiv.style.display = "none";
		}
	}
	
	var findOpen = function(){
		var elem = ele.siblings();
		for(var i=0; i<elem.length; i++){
			if((elem[i].tagName == "LI" || elem[i].tagName == "li") && elem[i].df.dropnav.getState() == true){
				elem[i].df.dropnav.waitToHide();
			}
		}
	}
}
