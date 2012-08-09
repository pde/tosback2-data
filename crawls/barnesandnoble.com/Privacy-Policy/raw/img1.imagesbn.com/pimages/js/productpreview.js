function loadLib (libPath) {
	document.write('<script type="text/javascript" src="' + libPath + '"> <\/script>');
}

function loadCss (cssPath) {
	document.write('<link rel="stylesheet" type="text/css" href="' + cssPath + '">');
}

var imgSrvHostPath;
if (document.location.protocol=="https:") {
	imgSrvHostPath = "https://simg1.imagesbn.com";
} else {
	imgSrvHostPath = "http://img1.imagesbn.com";
}

if(!window['BN']){
	loadLib(imgSrvHostPath+'/pace/js/core/core.js');
}

loadLib(imgSrvHostPath+'/pimages/js/XmlUtil.js');
loadLib(imgSrvHostPath+'/pimages/js/XslStyleSheet.js');
//loadLib(imgSrvHostPath + '/pimages/js/product-preview-core.js');
loadLib(imgSrvHostPath + '/presources/global/js/legacy/buynow_0001.js');