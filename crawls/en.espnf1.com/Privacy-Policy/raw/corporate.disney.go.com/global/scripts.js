//Detect older browsers and redirect

if(!document.getElementById)top.location.replace("http://disney.go.com/guestservices/upgrade/index.html");


//----------------------------------------------------------------


function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}


function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}


function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}


function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


function pdfNote(docURL, contentExists, position){
   fullPath = document.location;
   var pathString  = new String(fullPath)
	
	if (!position){
		position = 0;
	}
	if (contentExists){
	  if(pathString.indexOf("annual_reports")!=-1 || pathString.indexOf("fact_books")!=-1){
	    document.writeln('<p>This document is also available in PDF format.  Right-click <a href="'+docURL+'">here</a> and select the<br>"Save Target As..." option to save the PDF file to your desktop, or<br>click <a href="javascript:showhide(\'pdfNote\',\''+docURL+'\',\'pdfWin\')">here</a> to open the PDF file directly.');
	  }else{
		document.writeln('<p>This document is also available in <a href="javascript:showhide(\'pdfNote\',\''+docURL+'\',\'pdfWin\')">PDF</a> format.');
      }
	}
	
	document.writeln('<div style="position:relative;"><div class="pdfNote" style="left:'+position+'px;" align="left" id="pdfNote"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td valign="top" width="88"><a href="javascript:winOpener(\'http://www.adobe.com/products/acrobat/readstep.html\',\'pdfWin\',null,null); javascript:showhide(\'pdfNote\')"><img border="0" height="31" width="88" src="http://corporate.disney.go.com/media/corporate/getacro.gif" alt="Get Acrobat Reader" align="absmiddle" vspace="3"></a></td><td><strong>Note:</strong> The file you are trying to access is an Adobe Acrobat document.</td></tr><tr><td colspan="2" align="center"><a href="javascript:showhide(\'pdfNote\')"><strong>cancel</strong></a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="javascript:redirect(\'pdfNote\',\''+docURL+'\',\'pdfWin\')"><strong>continue</strong></a></td></tr></table></div></div>');

}

function pdfNote3(name, docURL, position){
	
	if (!position){
		position = 0;
	}

	document.writeln('<div style="position:relative;"><div class="pdfNote" style="left:'+position+'px;" align="left" id="'+name+'"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td valign="top" width="88"><a href="javascript:winOpener(\'http://www.adobe.com/products/acrobat/readstep.html\',\'pdfWin\',null,null); javascript:showhide(\''+name+'\')"><img border="0" height="31" width="88" src="http://corporate.disney.go.com/media/corporate/getacro.gif" alt="Get Acrobat Reader" align="absmiddle" vspace="3"></a></td><td><strong>Note:</strong> The file you are trying to access is an Adobe Acrobat document.</td></tr><tr><td colspan="2" align="center"><a href="javascript:showhide(\''+name+'\')"><strong>cancel</strong></a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="javascript:redirect(\''+name+'\',\''+docURL+'\',\'pdfWin\')"><strong>continue</strong></a></td></tr></table></div></div>');

}


function pdfNote2(position){
	
	if (!position){
		position = 0;
	}
	
	document.writeln('<div class="pdfNote2" style="left:'+position+'px;" id="pdfNote"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td valign="top" width="88"><a href="javascript:winOpener(\'http://www.adobe.com/products/acrobat/readstep.html\',\'pdfWin\',null,null);"><img border="0" height="31" width="88" src="http://corporate.disney.go.com/media/corporate/getacro.gif" alt="Get Acrobat Reader" align="absmiddle" vspace="3"></a></td><td><strong>Note:</strong> Adobe Acrobat is needed to access these documents.</td></tr></table></div>');

}


function externalDisclaimer(name, URL, position){
	
	if (!position){
		position = 0;
	}
	
	document.writeln('<div style="position:relative;"><div class="pdfNote" style="left:'+position+'px;" id="'+name+'"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td><strong>Note:</strong> The web site you are about to link to is not controlled by Disney Online and different terms of use and privacy policy will apply. By proceeding you agree and understand that Disney Online is not responsible for the site you are about to access.</td></tr><tr><td colspan="2" align="center"><a href="javascript:showhide(\''+name+'\')"><strong>cancel</strong></a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="javascript:redirect(\''+name+'\', \''+URL+'\',\'externalWin\')"><strong>continue</strong></a></td></tr></table></div></div>');

}

function externalDisclaimer2(name, URL, position){
	
	if (!position){
		position = 0;
	}
	
	document.writeln('<div style="position:relative;"><div class="pdfNote" style="left:'+position+'px;" id="'+name+'"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td><strong>Note:</strong> The web site you are about to link to is not controlled by Disney Online and different terms of use and privacy policy will apply. By proceeding you agree and understand that Disney Online is not responsible for the site you are about to access.</td></tr><tr><td colspan="2" align="center"><a href="javascript:showhide(\''+name+'\')"><strong>cancel</strong></a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="javascript:redirect(\''+name+'\', \''+URL+'\',\'externalWin\');window.close()"><strong>continue</strong></a></td></tr></table></div></div>');

}

function adultDisclaimer(name, URL, position){
	
	if (!position){
		position = 0;
	}
	
	document.writeln('<div style="position:relative;"><div class="pdfNote" style="left:'+position+'px;" id="'+name+'"><table width="100%" border="0" cellpadding="2" cellspacing="0"><tr><td><strong>Note:</strong> The site you are about to visit may contain content not intended for children.</td></tr><tr><td colspan="2" align="center"><a href="javascript:showhide(\''+name+'\')"><strong>cancel</strong></a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="javascript:redirect(\''+name+'\', \''+URL+'\',\'externalWin\')"><strong>continue</strong></a></td></tr></table></div></div>');

}


function showhide(divID, docURL, windowName){
	
	if (!windowName){
		windowName = "externalWin";
	}
	
	obj=document.getElementById(divID);
	
	if (!obj.style.overflow || obj.style.overflow == "hidden"){
		obj.style.overflow="visible";
		obj.style.visibility="visible";
		the_timeout = setTimeout('redirect("'+divID+'","'+docURL+'","'+windowName+'")',11000);
	} else {
		obj.style.overflow="hidden";
		obj.style.visibility="hidden";
		clearTimeout(the_timeout);
	}

}


function redirect(divID, URL, windowName){
	showhide(divID);
	win = window.open(URL, windowName, "");
	win.focus();
}


function winOpener(URL, name, width, height){
	
	if (width != null && height != null){
	
		var newWin = window.open(URL, name, 'width='+width+',height='+height+',toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0');
		newWin.focus();
		
	} else {
		
		var newWin = window.open(URL, name);
		newWin.focus();
		
	}
	
}


function switchPage(){

	document.location = document.navigationForm.navigationSelect.options[document.navigationForm.navigationSelect.selectedIndex].value;

}
