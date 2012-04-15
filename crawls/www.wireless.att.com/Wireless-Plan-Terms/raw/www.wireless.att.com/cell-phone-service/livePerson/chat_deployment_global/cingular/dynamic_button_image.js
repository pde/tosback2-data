var lpdbButtonSizeString="";
if (typeof(lpdbButtonImageHeight)!="undefined" && lpdbButtonImageHeight.indexOf('<')<0) {
	lpdbButtonSizeString += " height='" + lpdbButtonImageHeight +"'";
}
if (typeof(lpdbButtonImageWidth)!="undefined" && lpdbButtonImageWidth.indexOf('<')<0) {
	lpdbButtonSizeString += " width='" + lpdbButtonImageWidth +"'";	
}
var lpUASinitialButtonImageName;
if (typeof(lpUASinitialButtonImageName)=="undefined"){
	lpUASinitialButtonImageName = "transparent.gif";
}
document.write("  <img id='hcDynamicIcon' name='hcDynamicIcon' src='" + lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/" + lpUASinitialButtonImageName +"'" + " border='0' " + lpdbButtonSizeString); 
document.write( ((document.layers) ? " " : " style='cursor:default' ") +" alt='"+ lpUASbuttonTitle +"'></a>");
