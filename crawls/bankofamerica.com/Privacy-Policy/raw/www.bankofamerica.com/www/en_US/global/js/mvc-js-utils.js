function radio_button_check(bob) {
	var radio_choice = false;
	
	for (counter = 0; counter < document.SigninRedirectForm.SigninGoto.length; counter++) {
		if (document.SigninRedirectForm.SigninGoto[counter].checked)
			radio_choice = true; 
	}
	
	if (!radio_choice) {
		alert("Please select a service.");
	} else {
		document.SigninRedirectForm.buttonClicked.value = bob;
		document.SigninRedirectForm.submit();
	}
}
	
function glossaryWindow(adr,name) {
	var NS4 = (document.layers) ? true : false;
	// var NS6 = (!document.layers) && (navigator.userAgent.indexOf('Netscape')!=-1) ? true : false;
	var NS6 = (document.getElementByID) ? true : false;
	var IE4plus = (document.all) ? true : false;

	var topPosition;
	var leftPosition;
	var PageHeight;
			
	if (NS4 || NS6){   
		PageHeight = window.innerHeight;     

		if (PageHeight < 500){
			topPosition = 161;
			leftPosition = 35;
		} else if (PageHeight < 620){ 
			topPosition = 161;
			leftPosition = 35;
		} else {
			topPosition = 161;
			leftPosition = 35;
		}   
		window.open(adr, name, 'height=250,width=372,screenY='+topPosition+',screenX='+leftPosition+',scrollbars=yes,resizable=yes');
	} else {
		PageHeight = screen.availHeight; 
		
		if (PageHeight < 600){
			topPosition = 161;
			leftPosition = 35;
		} else if (PageHeight < 800){ 
			topPosition = 161;
			leftPosition = 35;
		} else {
			topPosition = 161;
			leftPosition = 35;
		}   
		window.open(adr, name, 'height=250,width=372,top='+topPosition+',left='+leftPosition+',scrollbars=yes,resizable=yes');
	}
}

function mvc_PopUp(adr,name,win_width,win_height){
	var topPosition = 161;
	var leftPosition = 35;
	window.open(adr, name, 'height=' + win_height + ',width=' + win_width
	 +',screenY=' + topPosition + ',screenX=' + leftPosition + ',scrollbars=yes,resizable=yes');
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}