 var AX_Width=0, AX_Height=0;
 var AX_ScrOfX=0, AX_ScrOfY=0;
 var pageW=960;
 var py=0;
 var dnsp=false;//Popup will remain static on the window when scrolled
 var reloadIt=false;//PArent will not reload
 var t=".png";
 var popVisibleDivID = null;
 var laodingContent="Loading...Please Wait!";

  var browser = navigator.appName;//detecting browser IE 6 and below
    var version = navigator.appVersion;
    if ( browser== "Microsoft Internet Explorer" )
        {
        var version1 = version.substring(22,25);
        var sisop = version.substring(26,41);
		if (parseInt(version1)<7){
			t=".gif";
		}
    }
 function AX_Win_Prop() {
    AX_Width = jQuery(window).width();
    AX_Height = jQuery(window).height();
	AX_ScrOfY = jQuery(document).scrollTop();
    AX_ScrOfX = jQuery(document).scrollLeft();
}
function rLoad(x){
document.getElementById("popLoad").style.display="none";
	x.style.visibility="visible";
}
function rRemove(){
	document.getElementById("popLoad").style.display="block";
}
function closePopup(){
	jQuery("iframe[name^='lPopFrame']").remove();
	jQuery("#popdiv").html("");
	py-=1;
	if(reloadIt){document.location.reload(true);reloadIt=false;}
 }


 function AX_Pop_Create(objpop){
	var pPID="";
	py+=1;
	document.getElementById("popdiv").style.display="block";
	if (objpop.pID && typeof(objpop.pID) != "undefined") pPID = objpop.pID;
	var pBG=document.createElement("DIV");
	pBG.className="pBG";
	pBG.style.zIndex=1001+py;
	AX_Win_Prop();
	pBG.style.top=AX_ScrOfY+"px";
	pBG.style.left=AX_ScrOfX+"px";
	pBG.id="ipopbg"+pPID+py;
	popVisibleDivID = pPID+py;
	//document.body.appendChild(pBG);
	document.getElementById("popdiv").appendChild(pBG);

	var pP=document.createElement("DIV");
	var dHeight=parseInt(objpop.pHeight)+43, dWidth=parseInt(objpop.pWidth)+20;
	var iHeight=parseInt(objpop.pHeight)-2;
	var iWidth=parseInt(objpop.pWidth)-2;


	if (isNaN(objpop.pTop/objpop.pTop)){
		var dTop=((AX_Height-parseInt(objpop.pHeight))/2)+AX_ScrOfY;
	}
	else {
		var dTop=parseInt(AX_ScrOfY)+parseInt(objpop.pTop);
	}
	if (isNaN(objpop.pLeft/objpop.pLeft)){
		var dLeft=((AX_Width-parseInt(objpop.pWidth))/2)+AX_ScrOfX;
	}
	else {
		var dLeft=((AX_Width-pageW)/2)+parseInt(objpop.pLeft);
	}
	

	
	pP.style.position="absolute";
	pP.style.zIndex=1001+py;
	pP.style.height=dHeight+"px";
	pP.style.width=dWidth+"px";
	pP.style.top=dTop+"px";
	pP.style.left=dLeft+"px";
	pP.style.overflow="hidden";
	pP.id="ipop"+pPID+py;
	var d=new Date();
	var fID="lPopFrame"+pPID+py;
	var scrl="no";
	if(objpop.pSC)scrl=objpop.pSC;

	pP.innerHTML='<table border="0" cellspacing="0" cellpadding="0" id="lPopTbl"><tr><td style="height:33px;width:10px;"><div id="popCL" style="width:'+dWidth+'px;"><a id="cl"><img src="'+iPop_imagePath+'local/localgraphics/popClose.gif" alt="Close" border="0"></a></div><img src="'+iPop_imagePath+'global/globalgraphics/spacer01.gif" height="33" width="10"></td><td style="height:33px;"></td><td style="height:33px;width:10px;"><img src="'+iPop_imagePath+'global/globalgraphics/spacer01.gif" height="33" width="10"></td></tr><tr><td style="width:10px;"></td><td style="background-color:#FFFFFF;padding-top:'+objpop.tP+';padding-right:'+objpop.rP+';padding-bottom:'+objpop.bP+';padding-left:'+objpop.lP+';"><div id="popLoad" style="position:absolute;width:'+iWidth+'px;height:'+iHeight+'px;z-index:100;"><div>'+laodingContent+'</div></div><iframe class="lPopIframe" scrolling="'+scrl+'" src="" frameborder="0" height="'+iHeight+'" width="'+iWidth+'" id="'+fID+'" name="'+fID+'" style="visibility:hidden;" closeP="" onload="javascript:rLoad(this);"></iframe></td><td style="width:10px;"></td></tr><tr><td style="height:10px;width:10px;"><img src="'+iPop_imagePath+'global/globalgraphics/spacer01.gif" height="10" width="10" ></td><td style="height:10px;"></td><td style="height:10px;width:10px;"><img src="'+iPop_imagePath+'global/globalgraphics/spacer01.gif" height="10" width="10" ></td></tr></table>';
	pBG.pop=pP;
	
	document.getElementById("popdiv").appendChild(pP);
	document.getElementById(fID).src=objpop.source;
	//document.getElementById(fID).contentWindow.pop=pBG;

	objpop.pBG=pBG;
	objpop.pF=document.getElementById(fID);
	objpop.close=function(){
		//parent.document.getElementById("lPopFrame"+pPID+py).src=iPop_imagePath+'local/localbuttons/close03_btn.gif';
		jQuery("iframe[name^='lPopFrame']").remove();
		
		jQuery("#popdiv").html("");
		py-=1;
		delete objpop;
		if(!py){
		//	$('#popdiv').css('visibility','invisible')
		//	document.getElementById("popdiv").style.visibility="invisible";
			//if($.browser.msie && ($.browser.version < 7))$("select").css("visibility","visible");
		}
		if(reloadIt){document.location.reload(true);reloadIt=false;}
	}
	if(objpop.pTP=="close_on_outside_click"){pBG.onclick=closePopup;}
	document.getElementById(fID).closeP=closePopup;
	document.getElementById("cl").onclick=closePopup;
	//if($.browser.msie && ($.browser.version < 7)){$("select").css("visibility","hidden");}
 }

 

  function PC_Pop(pH,pW,pT,pL,pS,pID,pST,pTP,pSC){
	this.pHeight=pH;
	this.pWidth=pW;
	this.pTop=pT;
	this.pLeft=pL;
	this.pType=pTP;
	this.source=pS;
	this.pID=pID;
	this.sourceType=pST;
	this.pSC=pSC;
	this.pTP=pTP;
	AX_Pop_Create(this);
 }
 var uagent = function(){
	if(
		(navigator.userAgent.match(/Windows Phone/i))
            || (navigator.userAgent.match(/ZuneWP7/i))
			|| (navigator.userAgent.match(/android/i))
			|| (navigator.userAgent.match(/iPad/i))
			|| (navigator.userAgent.match(/iPhone/i))
			|| (navigator.userAgent.match(/iPod/i))
		) {return "mobile";}
	else{return "desktop";}
}
function wf(){
	if(uagent()=="mobile")dnsp=true;
	AX_Win_Prop();
	if(py>0){
		for(i=1;i<=py;i++){
				if(dnsp){
					document.getElementById("ipopbg" + i).style.top=AX_ScrOfY+"px";
					document.getElementById("ipopbg" + i).style.left=AX_ScrOfX+"px";
				}
				else{
					//alert (AX_ScrOfY+"px");
					document.getElementById("ipopbg" + i).style.top=AX_ScrOfY+"px";
					document.getElementById("ipopbg" + i).style.left=AX_ScrOfX+"px";
					document.getElementById("ipop"  + i).style.top=((AX_Height-parseInt(document.getElementById("ipop" + i).style.height))/2)+AX_ScrOfY+"px";
					document.getElementById("ipop" + i).style.left=((AX_Width-parseInt(document.getElementById("ipop" + i).style.width))/2)+AX_ScrOfX+"px";
				}
			}
		}
}
window.onscroll=wf;
window.onresize=wf;