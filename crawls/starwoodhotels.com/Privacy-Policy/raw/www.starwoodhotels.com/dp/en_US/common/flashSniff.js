
<!-- BEGIN FLASH SNIFF -->
flagVar = "";
flashTrue = "";
function flashSniff () {
	if (is_nav6up) {
		flashTrue = navigator.plugins["Shockwave Flash"];
		if (flashTrue) {
			flagVar = true;
			return true;
		} else {
			flagVar = false;
			return false;
		}
	}

	var plugin = (navigator.mimeTypes &&
	navigator.mimeTypes["application/x-shockwave-flash"] ?
	navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0);

	if (!((navigator.appName == "Microsoft Internet Explorer" &&
	navigator.appVersion.indexOf("Mac") == -1 &&
	navigator.appVersion.indexOf("3.1") == -1) || (plugin &&
	parseInt(plugin.description.substring(plugin.description.indexOf(".")-1))>=5))){
		flagVar = false;
		return false;
	}else{
		flagVar = true;
		return true;
	}
}
<!-- END FLASH SNIFF -->
