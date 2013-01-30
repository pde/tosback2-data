menuBrowse = document.getElementById("browse");
 menuOutlet = document.getElementById("outlet");
 menuDownload = document.getElementById("download");
 menuStores = document.getElementById("stores");
 menuMobile = document.getElementById("mobile");
 menuWrap =  document.getElementById("mainMenu");
 headerWrap =  document.getElementById("head");
 subnavWrap =  document.getElementById("nav_OuterWrap");
 subDownload = document.getElementById("submenu_download");
 subBrowse = document.getElementById("submenu_browse");
 subOutlet = document.getElementById("submenu_outlet");
 subMobile = document.getElementById("submenu_mobile");
 subStores = document.getElementById("submenu_stores");
 menuHeader = document.getElementById("navWrap");

 var mouseIsOver;
 instanceheight = -30
 navVisible = 0;
 subnavWrap.style.position= 'relative'; 
 subnavWrap.style.top = '-30px';
 setOpen = false;
 var activeNav;
 second = false;
 
 
 var href = document.URL;
 var j=href.substr(href.lastIndexOf('/') + 1);
displayAll(j);

	
function displayAll(j){
	switch(j){
	case 'browse':browse_hover();
				  	break;
	case 'outlet':outlet_hover();
					break;
	case 'download':download_hover();
					break;	
	case 'stores':stores_hover();
					break;			
	
	}
	
}	

bindEvent(menuBrowse, "mouseover",  browse_hover);
bindEvent(menuOutlet, "mouseover",  outlet_hover);
bindEvent(menuDownload, "mouseover",  download_hover);
bindEvent(menuStores, "mouseover",  stores_hover);
bindEvent(menuMobile, "mouseover",  mobile_hover);


bindEvent(subBrowse, "mouseover",  browse_hover);
bindEvent(subOutlet, "mouseover",  outlet_hover);
bindEvent(subDownload, "mouseover",  download_hover);
bindEvent(subStores, "mouseover",  stores_hover);
bindEvent(subMobile, "mouseover",  mobile_hover);

bindEvent(subnavWrap, "mouseover",  setMouseIsOver);
bindEvent(menuHeader, "mouseout",  makeMouseOverFalse);

function bindEvent(el, eventName, eventHandler) {
       if (el.addEventListener){
       el.addEventListener(eventName, eventHandler, false);
       } else if (el.attachEvent){
       el.attachEvent('on'+eventName, eventHandler);
       }
}
function unbindEvent(el, eventName, eventHandler) {
       if (el.removeEventListener){
       el.removeEventListener(eventName, eventHandler, false);
       } else if (el.attachEvent){
       el.detachEvent('on'+eventName, eventHandler);
       }
}

function makeMouseOverFalse(){
	 mouseIsOver = false;
	// navUp();
}
function setMouseIsOver(){
	mouseIsOver = true;
}
function browse_hover(){
	if(!mouseIsOver){
	mouseIsOver = true;
	navDown();
	}
	var i = 'browse';
	display(i);
}
function outlet_hover(){
	if(!mouseIsOver){
		mouseIsOver = true;
		navDown();
	}
	var i = 'outlet';
	display(i);
}
function download_hover(){
	if(!mouseIsOver){
		mouseIsOver = true;
		navDown(); 
	}
	var i = 'download';
	display(i);
}
function stores_hover(){
	if(!mouseIsOver){
		mouseIsOver = true;
		//navDown();
		animate = setTimeout(navDown,20);
	}
	var i = 'stores';
	display(i);
}
function mobile_hover(){
	if(!mouseIsOver){
		mouseIsOver = false;
		/* navDown(); */
	}
	var i = 'mobile';
	display(i);
}

function display(i){	
	subnavWrap.style.display = "";
	subnavWrap.style.overflow = "visible";
	switch(i){
	case 'download': 
		subnavWrap.style.top = '0px';
		subDownload.style.display = "inline";	
		subBrowse.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
	break;
	case 'rent':	
		subnavWrap.style.top = '0px';
		subDownload.style.display = "none";
		subBrowse.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'browse':
		subnavWrap.style.top = '0px';
		subBrowse.style.display = "inline";
		subDownload.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'outlet': 
		subnavWrap.style.top = '0px';
		subOutlet.style.display = "inline";
		subBrowse.style.display = "none";
		subDownload.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	
	case 'stores': 
		
		if(second){
			newNav();
			//subnavWrap.style.top = '0px';
			subStores.style.display = "inline";
		 	/*subBrowse.style.display = "none";
			subDownload.style.display = "none";
			subOutlet.style.display = "none";
			subMobile.style.display = "none";*/
		}
		else{
			subnavWrap.style.top = '0px';
			subStores.style.display = "inline";
		 	subBrowse.style.display = "none";
			subDownload.style.display = "none";
			subOutlet.style.display = "none";
			subMobile.style.display = "none";
		}
		
		
		break;
		
	case 'mobile': 
		instanceheight = 0;
		newnavUp();
		subMobile.style.display = "none";
		subBrowse.style.display = "none";
		subDownload.style.display = "none";
		subOutlet.style.display = "none";
		subStores.style.display = "none";
		second = true;
		break;	
	}
}
var checkSubPage = document.getElementById('navSecondWrap');
var checkListElement = checkSubPage.getElementsByTagName('li');
for(var x = 0; x < checkListElement.length; x++){
	var splitClassNames = checkListElement[x].className.split(' ');	
	for(var y = 0; y < splitClassNames.length; y++){
		if(splitClassNames[y] === "active"){
			mouseIsOver = true;
			navVisible = 0;
			subnavWrap.style.position= 'relative'; 
			subnavWrap.style.top = '0px';
			activeNav = true;
			break;
		}
	}
	var specificLi = checkListElement[x];
	if(activeNav){
		var specificLi = checkListElement[x];
		var getUl = specificLi.parentNode;
		var getDiv = getUl.parentNode;
		var splitParentMenu = getDiv.getAttribute("id").split("_");
		var findParentMenu = splitParentMenu[1];
		display(findParentMenu);
		break;
	}
}

/* animation  */
/*function navUp(){
	if(!mouseIsOver){
		instanceheight = instanceheight  - 1;
		if(setOpen == true){
			if(instanceheight >= -30){
			subnavWrap.style.top = instanceheight  + 'px';
			animate = setTimeout(navUp,20);}
			else{setOpen = false; return instanceheight;}
		}
 	}
	
}*/
function newnavUp(){
		instanceheight = instanceheight  - 1;
		if(instanceheight >= -30){
			subnavWrap.style.top = instanceheight  + 'px';
			animate = setTimeout(newnavUp,20);
			}

}

function newNav(){
	
	//p=subnavWrap.style.top;
	//alert(p);
	instanceheight = instanceheight  + 1;
	 if(instanceheight <= 0){
		 subnavWrap.style.top = instanceheight  + 'px';
		 animate = setTimeout(newNav,20);
	}
	 second = false;
}

 function navDown(){
	 
	 if(!activeNav){
		 instanceheight = instanceheight  + 1;
		 if(instanceheight >= navVisible){setOpen = true; return instanceheight;}
		 else{
			 subnavWrap.style.top = instanceheight  + 'px';
			 animate = setTimeout(navDown,20);}
	 }
}