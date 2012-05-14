/* carl@criticalmass.com */
function BaseLibrary(){
	var t = this;
	var v = navigator.appVersion.toLowerCase(), u = navigator.userAgent.toLowerCase(), n = navigator.appName;
	var d = document;
	t.ua = new Object();
	t.ua.mac = (v.indexOf("mac")!=-1);
	t.ua.win = (v.indexOf("win")!=-1);
	t.ua.nn = (n=="Netscape");
	t.ua.ie = (n=="Microsoft Internet Explorer");
	t.ua.aol = (u.indexOf("aol")!=-1);
	t.ua.opera = (u.indexOf("opera")!=-1);
	t.ua.ver = (t.ua.ie) ? parseFloat(v.split('msie ')[1]) : parseFloat(v);
	t.ua.os = (t.ua.mac) ? 'mac' : (t.ua.win) ? 'win' : navigator.platform;
	t.ua.name = (t.ua.nn) ? 'nn' : (t.ua.ie) ? 'ie' : n;
	t.ua.codeName = t.ua.name +'_'+ parseInt(t.ua.ver) + '_'+ t.ua.os;
	t.docloaded = false;
	t.onloadEvent = [];
	t.printContent = "";
	t.addOnLoadEvent = function(str){
		t.onloadEvent[t.onloadEvent.length] = str;
		return t.onloadEvent.length; 
	}
	t.loadEvents = function(){
		for(var i=0; i<t.onloadEvent.length;i++) {
			eval(t.onloadEvent[i]);
		}
		t.docloaded = true;
	}
	window.onload = t.loadEvents;
	t.getParameter = function(p){
		var s = window.location.search;
		if(!s){
			return null;
		}
		if(!(s.indexOf(p+'=')+1)){
			return null;
		}
		return s.split(p+'=')[1].split('&')[0];
	}	
	t.winOpen = function(){
		var a = arguments;
		var n,f,s,w,h,t,l;
		n = (a[1]) ? a[1] : 'child';
		f = (a[6]) ? a[6].toString() : null;
		s = (f && f.search(/scrollbars=(1|true)/) != -1);
		w = getWidth(a[2],s);
		h = getHeight(a[3],s);
		t = (a[4]) ? a[4] : 0;
		l = (a[5]) ? a[5] : 0;
		child = window.open(a[0],n,'width='+w+',height='+h+',top='+t+',left='+l+',directories=0,'+f);
		setTimeout('child.focus()',100);
		if(f && f.search(/temp=(1|true)/)!=-1) window.onfocus = function(){if(window.child) child.close(); child = null};
	}
	var getWidth = function (w,s){
		if(s){
			if(t.ua.mac){
				if(t.ua.nn){
					w += 17;
				}
			}
			if(t.ua.win){
				w += 16;
				if(t.ua.aol){
					w += 20;
				}
			}
		}else{
			if(t.ua.win){
				if(t.ua.aol){
					w += 20;
				}
			}
  		}
		return w;
	}
	var getHeight = function(h,s){
		if(s){
			if(t.ua.win){
				if(t.ua.aol){
					h += 20;
				}
			}
		}else{
			if(t.ua.win){
				if(t.ua.aol){
					h += 20;
				}
			}
		}
		return h;
	}	
	t.importJS = function(file, qStr){
		var q = (qStr)?"?"+qStr:"";
		var s = file + q, ty = "text/javascript", q = "\u0022", e;
		if(t.ua.ie && t.ua.mac){
			(d.createElement("div")).innerHTML="\u003cscript type="+q+ty+q+" src="+q+s+q+"\u003e\u003c/script\u003e";
		}else{
			(e=d.createElement("script")).setAttribute("src",s);
			e.setAttribute("type",ty);
			d.getElementsByTagName("head")[0].appendChild(e);
		}
	}
	t.anchorImgSwap = function(){
		var imgObj = this.getElementsByTagName("IMG")[0];
		if(imgObj){
			imgObj.src = t.swapImgParse(imgObj.src);
		}
	}
	var anchorImgSwapInit = function(aObj,events){
		var imgObj = aObj.getElementsByTagName("IMG")[0];
		if(imgObj){
			var img = new Image();
			img.src = t.swapImgParse(imgObj.src);
			for(var i=0; i<events.length; i++){
				aObj[events[i]] = t.anchorImgSwap;
			}
		}
	}
	t.inputImgSwap = function(){
		this.src = t.swapImgParse(this.src);
	}
	var inputImgSwapInit = function(iObj,events){
		var img = new Image();
		img.src = t.swapImgParse(iObj.src);
		for(var i=0; i<events.length; i++){
			iObj[events[i]] = t.inputImgSwap;
		}
	}
	var trImgSwapInit = function(trObj,events){
		var imgObj = trObj.getElementsByTagName("IMG")[0];
		var aObj = trObj.getElementsByTagName("A")[0];
		if(imgObj){
			var img = new Image();
			img.src = t.swapImgParse(imgObj.src);
			for(var i=0; i<events.length; i++){
				imgObj[events[i]] = t.trImgSwap;
			}
			imgObj.anchorObj = aObj;
		}
		if(aObj){
			for(var i=0; i<events.length; i++){
				aObj[events[i]] = t.trImgSwap;
			}
			aObj.imageObj = imgObj; 
		}
	}
	t.trImgSwap = function(){
		var classActive = "active";
		var classInActive = "inactive";
		if(this.nodeName=="A"){
			if(this.imageObj){
				this.imageObj.src = t.swapImgParse(this.imageObj.src);
			}
			this.className = "";
		}else if(this.nodeName=="IMG"){
			this.src = t.swapImgParse(this.src);
			if(this.anchorObj){
				if(!this.anchorObj.className){
					this.anchorObj.className = classActive;
				}else{
					this.anchorObj.className = (this.anchorObj.className.indexOf(classInActive)==-1)?classInActive:classActive;
				}
			}
		}
	}
	t.swapImgParse = function(str){
		var imgSrcMouseOverPattern = "_1.";
		var imgSrcMouseOutPattern = "_0.";
		return (str.indexOf(imgSrcMouseOverPattern)!=-1)?str.replace(imgSrcMouseOverPattern,imgSrcMouseOutPattern):str.replace(imgSrcMouseOutPattern,imgSrcMouseOverPattern);
	}
	t.classTagEvent = [['base-anchor-img-swap',"A",anchorImgSwapInit,["onmouseover","onmouseout"]],['base-input-img-swap',"INPUT",inputImgSwapInit,["onmouseover","onmouseout"]],['base-tr-img-swap',"TR",trImgSwapInit,["onmouseover","onmouseout"]]];
	t.classTagEventAssigment = function(){
		for(var i=0; i<t.classTagEvent.length; i++){
			var tagCol = document.getElementsByTagName(t.classTagEvent[i][1]);
			for(var j=0; j<tagCol.length; j++){
				if(tagCol[j].className.indexOf(t.classTagEvent[i][0])!=-1){
					t.classTagEvent[i][2](tagCol[j],t.classTagEvent[i][3]);
				}
			}
		}
	}
	t.addOnLoadEvent('base.classTagEventAssigment()');
	t.printArea = function(divID){
		if(t.ua.ie) {
			t.printContent = eval("top." + divID + ".innerHTML");
			t.winOpen('/global/templates/printWin.jhtml','PrintWin',450,500,0,0,'scrollbars=1,resizable=1');
		}
		else {
			window.print();
		}
	}
	t.leaving_site = function(compName, compURL, lang) {
		companyName = compName;
	  	companyURL = compURL;
	  	newWindow = window.open("","","scrollbars=no,toolbar=no,directories=no,menubar=no,resizable=no,status=yes,width=530,height=250"), newWindow.focus();
	  	if(!lang) {
			lang = "english";
		}
		t.subWrite(lang)
	}
	t.subWrite = function(lang) {
		if (newWindow.closed){
			t.leaving_site()
		}
		/***************************************************************************************
		 To modify the popup please use /doc/global/templates/leaving_site_popup_template.jhtml
		 edit the file and test it, then do a find and replace to remove all carriage returns
		 and tabs, and replace all " (double quotes) with ' (single quotes) then copy that
		 and paste it into var newContent.  NOTE: NO JHTML CAN BE USED.  This is because the
		 page is being generated client side.
		 
		 9.30.03 - Jesse Brown 
		*****************************************************************************************/
		if(lang == "spanish") {
			var newContent = "<html><head><title>AT&T/title><link type='text/css' rel='stylesheet' href='/styles/popup.css' /><link type='text/css' rel='stylesheet' href='/styles/popup_type_3.css' /><link type='text/css' rel='stylesheet' href='/styles/default.css' /><script src='/scripts/base.js' type='text/javascript'></script></head><body><div id='popup-top-spacer'></div><div id='popup-parent'><div id='popup-parent-header'><div id='popup-parent-header-logo'><img src='/images/global/common/att_logo_sm.gif' width='94' height='23' alt='AT&amp;T Wireless' /></div><div id='popup-parent-header-close'><a href='#' onclick='window.close();' class='base-link-secondary base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif' alt='' />Cerrar</a> </div><div id='popup-parent-header-corners'><table cellspacing='0' cellpadding='0' class='base-bubble'><tr><td class='base-bubble-top-left'>&nbsp;</td><td></td><td class='base-bubble-top-right'>&nbsp;</td></tr></table></div><div id='popup-parent-header-placeholder'></div><div id='popup-parent-divider' class='base-line-horizontal-1'></div><div id='popup-parent-content'><script language='JavaScript'>function newSite(){window.opener.location='"+companyURL+"';window.close() ;}</script><table id='popup-type-3' cellpadding='20' cellspacing='0' ><tr><td><p class='base-segment-copy-header-2' />gracias por visitar nuestro sitio.<p />Est&aacute;s a punto de salir del sitio de AT&T Wireless e ingresar a un sitio administrado por terceros. AT&T Wireless no es responsable de la informaci&oacute;n ni del contenido incluidos en otros sitios y toda informaci&oacute;n que proporciones de forma autom&aacute;tica o de cualquier otra manera  se regir&aacute; por las normas de privacidad de esos sitios.<p /><a href='javascript:newSite();' class='base-link-secondary base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif' border='0' alt='Continuar'>Continuar*</a><p /><a href='javascript:close(self);' class='base-link-secondary base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif'  alt='Volver a AT&T Wireless' border='0'>Volver a AT&T Wireless</a></td></tr></table></div></div></body></html>"
		}
		else { // default to english
			var newContent = "<html><head><title>AT&T</title><link type='text/css' rel='stylesheet' href='/styles/popup.css' /><link 	type='text/css' rel='stylesheet' href='/styles/popup_type_3.css' /><link type='text/css' rel='stylesheet' href='/styles/default.css' /><script src='/scripts/base.js' 	type='text/javascript'></script></head><body><div id='popup-top-spacer'></div><div id='popup-parent'><div id='popup-parent-header'><div id='popup-parent-header-logo'><img 	src='/images/global/common/att_logo_sm.gif' width='94' height='23' alt='AT&amp;T Wireless' /></div><div id='popup-parent-header-close'><a href='#' onclick='window.close();' class='base-link-secondary 	base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif' alt='' />Close</a> </div><div id='popup-parent-header-corners'><table cellspacing='0' cellpadding='0' class='base-bubble'>    <tr>        	<td class='base-bubble-top-left'>&nbsp;</td><td></td><td class='base-bubble-top-right'>&nbsp;</td></tr></table></div><div id='popup-parent-header-placeholder'></div><div 	id='popup-parent-divider' class='base-line-horizontal-1'></div><div id='popup-parent-content'><script language='JavaScript'>function newSite(){window.opener.location='"+companyURL+"';window.close();}</script><table id='popup-type-3' cellpadding='20' cellspacing='0' ><tr><td><p class='base-segment-copy-header-2' />thank you for visiting<p />You are now leaving the AT&T Wireless Web site and entering a site operated by another party. AT&T Wireless is not responsible for any information or content contained on other sites and any information you provide automatically or otherwise will be governed by the other party's policies. <p /><a href='javascript:newSite();' class='base-link-secondary base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif' border='0' alt='Continue'>Continue</a><p /><a href='javascript:close(self);' class='base-link-secondary base-anchor-img-swap'><img src='/images/global/common/single_arrow_0.gif' alt='Return to AT&T Wireless' border='0'>Return to AT&amp;T 	Wireless</a></td></tr></table></div></div></body></html>";
		}
		newWindow.document.write(newContent)
		newWindow.document.close() 
	}
	
}
var base = new BaseLibrary();

/*toggle.show will show/hide an element based on its current display
 *argument takes an elementID
 *USECASE: javascript:toggle.show('string')
 *toggle.hide will hide an array of objects
 *argument takes an array of elementIDs
 *USECASE: javascript:toggle.hide('string1','string2','string3')
 */
var toggle = 
{
	show : function(obj) 
	{
		$(obj).style.display = ($(obj).style.display != 'none' ? 'none' : '' );
	},
	hide : function(obj) 
	{
		for ( i=0; i < arguments.length; i++ ) 
		{
			$(arguments[i]).style.display = 'none';
		}
	}
};

function findHeight(obj, padding)
{
    return obj.offsetHeight+padding;
}

/*
 *use this variable to set the height of the active content div for tabs
 */
var mContentHeight = 0;

/*
 *initializes the tab module. This must be called after the tab html has been written to the client
 *sets the display properties for all tab content
 */
function tabInit(mainCont, navCont, contentCont, panelToShow)
{
    var c = $(mainCont);
    var nav = $(navCont);
    var content = $(contentCont);
    var panel = $(panelToShow);
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                panel.style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+'px';
                }
                if(c.parentNode.className=="previewWindowModule")
                {
                    $('tabModule').style.height = '260px';
                }
				mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }   
}
/*
 *sets the clicked tab to active and sets the proper display properties for all tab content
 */
function tabShow(contentShow, panelToShow, navContainer, tab)
{  
    var content = $(contentShow);
    var panel = $(panelToShow);
    var activeTab = $(tab);
    var navCont = $(navContainer);   
	
	tabS1 = contentShow;
	tabS2 = panelToShow;
	tabS3 = navContainer;
	tabS4 = tab;
    
    for(i = 0; i < navCont.childNodes.length; i++)
    {
        if(navCont.childNodes[i].nodeType!=3)
        {
            if(navCont.childNodes[i].childNodes[0] == activeTab)
            {
                navCont.childNodes[i].childNodes[0].className = 'active';
            }
            else
            {
                navCont.childNodes[i].childNodes[0].className = '';
            }
        }
    }
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                content.childNodes[i].style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+"px";
                }
                if(content.parentNode.parentNode.className=="previewWindowModule")
                {
                    $('tabModule').style.height = '260px';
                }
                mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }
}




/********************************************    UTILS.JS    **********************************************************************
 *the next tab functions are for the Phone Details page
 *it is meant to default to the "flash tab"
 *then show the 360 flash and a promo in the left hand column
 */

/*
 *initializes the tab module. This must be called after the tab html has been written to the client
 *sets the display properties for all tab content
 */
function tabInitFlash(mainCont, navCont, contentCont, panelToShow, flash360)
{
    var c = $(mainCont);
    var nav = $(navCont);
    var content = $(contentCont);
    var panel = $(panelToShow);
    var flashTab = $(flash360);
    
    flashTab.style.display = 'none';
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                panel.style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+'px';
                }
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }   
}
/*
 *sets the clicked tab to active and sets the proper display properties for all tab content
 */
function tabShowFlash(contentShow, panelToShow, navContainer, tab, showFlash, flash360, flashTabLink)
{    

    var content = $(contentShow);
    var panel = $(panelToShow);
    var activeTab = $(tab);
    var navCont = $(navContainer);
    var flashTab = $(flash360);
    var flashLink = $(flashTabLink);
	
	tabSF1 = contentShow;
	tabSF2 = panelToShow;
	tabSF3 = navContainer;
	tabSF4 = tab;
	tabSF5 = showFlash;
	tabSF6 = flash360;
	tabSF7 = flashTabLink;
	
    if(showFlash)
    {
        flashTab.style.display = 'none';
        flashLink.className = 'active';        
    }
    else
    {
        flashTab.style.display = 'block';
        flashLink.className = '';
    }    
    
    for(i = 0; i < navCont.childNodes.length; i++)
    {
        if(navCont.childNodes[i].nodeType!=3)
        {
            if(navCont.childNodes[i].childNodes[0] == activeTab)
            {
                navCont.childNodes[i].childNodes[0].className = 'active';
            }
            else
            {
                navCont.childNodes[i].childNodes[0].className = '';
            }
        }
    }
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                content.childNodes[i].style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+"px";
                }
                mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }
}

/*
 * Toggles content, arrows. Used in the tabs on Plan Detail pages.
 */
function toggleContent(pId)
{
	var idToToggle = pId.substring(pId.indexOf("_"));
	var imgToToggle = document.getElementById("toggleArrow" + idToToggle);
	var contentToToggle = document.getElementById("toggleContent" + idToToggle);
	
	var contentHeight = 0;

	if(imgToToggle.src.indexOf("toggle_arrow_u.gif") != -1)
	{
		imgToToggle.src = "/global/images/toggle_arrow_d.gif";
	}
	else
	{
		imgToToggle.src = "/global/images/toggle_arrow_u.gif";
	}
	if(contentToToggle.style.display == "none")
	{
		contentToToggle.style.display = "block";
		contentHeight = findHeight(contentToToggle,10);
		mContentHeight += contentHeight;
	}
	else
	{
		contentHeight = findHeight(contentToToggle,10);
		contentToToggle.style.display = "none";
		mContentHeight -= contentHeight;
	}
	
	try {
    	$('tabModule').style.height = mContentHeight+"px";
	}
	catch (e) {
		// do nothing
	}
}


// for Enhanced Device Preview Window
function toggleSelects (destination, str) {
    var selectsList = $(destination).getElementsByTagName('select');
    var l = selectsList.length;
    for(var i=0; i<l; i++){
        selectsList[i].style.visibility = str;
    }
}
