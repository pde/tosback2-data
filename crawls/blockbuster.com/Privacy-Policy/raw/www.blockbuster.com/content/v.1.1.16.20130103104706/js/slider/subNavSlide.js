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

 var mouseIsOver ;
 instanceheight = -30
 navVisible = 0;
 subnavWrap.style.position= 'relative'; 
 subnavWrap.style.top = '-30px';
 setOpen = false;
 
 subnavWrap.onmouseover = function(){
      mouseIsOver = true;
   };
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
		navDown();
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
		subDownload.style.display = "inline";	
		subBrowse.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
	break;
	case 'rent':	
		subDownload.style.display = "none";
		subBrowse.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'browse': 
		subBrowse.style.display = "inline";
		subDownload.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'outlet': 
		subOutlet.style.display = "inline";
		subBrowse.style.display = "none";
		subDownload.style.display = "none";
		subMobile.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'mobile': 
		subMobile.style.display = "none";
		subBrowse.style.display = "none";
		subDownload.style.display = "none";
		subOutlet.style.display = "none";
		subStores.style.display = "none";
		break;
	case 'stores': 	
		subStores.style.display = "inline";
	 	subBrowse.style.display = "none";
		subDownload.style.display = "none";
		subOutlet.style.display = "none";
		subMobile.style.display = "none";
		break;
	}
}

/*
 *animation 
 */

 function navDown(){
	instanceheight = instanceheight  + 1;
	if(instanceheight >= navVisible){setOpen = true; return instanceheight;}
	else{
		subnavWrap.style.top = instanceheight  + 'px';
		animate = setTimeout(navDown,20);}
}
