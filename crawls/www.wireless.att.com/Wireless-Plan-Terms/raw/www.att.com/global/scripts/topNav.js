function setHideNav(idname)
{
	document.getElementById(idname).style.display  = "none";
}
function setShowNav(idname)
{
	document.getElementById(idname).style.display  = "block";
}

function swapInPNI(idname)
{
	document.getElementById(idname).style.backgroundPosition  =  "0px -36px";
}
function swapOutPNI(idname)
{
	document.getElementById(idname).style.backgroundPosition  =  "0px 0px";
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
	document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);