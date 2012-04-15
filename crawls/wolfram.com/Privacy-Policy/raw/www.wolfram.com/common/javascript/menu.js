var w3 = document.getElementById ? 1 : 0;
var ns = document.layers ? 0 : 0;
var ie = document.all ? 1 : 0;
var t_out = 0;
var t_out2 = 0;
var current_layer = 0;

function showLayer(thelayer, rol_imagename, rol_imagesrc) {
	if (t_out)		{ clearTimeout(t_out); }
	if (t_out2)		{ clearTimeout(t_out2); }
	if (current_layer)	{ hideLayer(current_layer); }
	if (w3) {
		document.getElementById(thelayer).style.visibility = 'visible';
		if (document.getElementById('searchselect')) {
			document.getElementById('searchselect').style.visibility = 'hidden';
		}
		if ((rol_imagename) && (rol_imagesrc)) {
			document.getElementById(rol_imagename).src = rol_imagesrc;
		}
	}
	else if (ns) {
		eval("document.layers." + thelayer + ".visibility = 'visible';");
		if ((rol_imagename) && (rol_imagesrc) && (document.images)) {
			eval("document.images." + rol_imagename + ".src = " + rol_imagesrc);
		}
	}
	else if (ie) {
		eval("document.all." + thelayer + ".style.visibility = 'visible';");
		if (document.all.searchselect) {
			document.all.searchselect.style.visibility = 'hidden';
		}
		if ((rol_imagename) && (rol_imagesrc)) {
			eval("document.all." + rol_imagename + ".src = " + rol_imagesrc + ";");
		}
	}
	current_layer = thelayer;
}

function hideLayer(thelayer, rol_imagename, rol_imagesrc) {
	if (w3) {
		if ((rol_imagename) && (rol_imagesrc)) {
			document.getElementById(rol_imagename).src = rol_imagesrc;
		}
		document.getElementById(thelayer).style.visibility = 'hidden';
		if (document.getElementById('searchselect')) {
			document.getElementById('searchselect').style.visibility = 'visible';
		}
	}
	else if (ns) {
		if ((rol_imagename) && (rol_imagesrc) && (document.images)) {
			eval("document.images." + rol_imagename + ".src = " + rol_imagesrc + ";");
		}
		eval("document.layers."+thelayer+".visibility = 'hidden';");
	}
	else if (ie) {
		if ((rol_imagename) && (rol_imagesrc)) {
			eval("document.all." + rol_imagename + ".src = " + rol_imagesrc + ";");
		}
		eval("document.all."+thelayer+".style.visibility = 'hidden';");
		if (document.all.searchselect) {
			document.all.searchselect.style.visibility = 'visible';
		}
	}
}

function hide(thelayer, rol_imagename, rol_imagesrc) {
	if (rol_imagesrc)	{ t_out = setTimeout("hideLayer('"+thelayer+"','"+rol_imagename+"','"+rol_imagesrc+"')", 1000); }
	else			{ t_out = setTimeout("hideLayer('"+thelayer+"','"+rol_imagename+"','')", 1000); }
}

function hide2(thelayer, rol_imagename, rol_imagesrc) {
	if (rol_imagesrc)	{ t_out = setTimeout("hideLayer('"+thelayer+"','"+rol_imagename+"','"+rol_imagesrc+"')", 500); }
	else			{ t_out = setTimeout("hideLayer('"+thelayer+"','"+rol_imagename+"','')", 500); }
}

function PreloadImages() {
	if (document.images) {
		if (!document.preload_images) document.preload_images = new Array();
		var 	i,
			j = document.preload_images.length,
			a = PreloadImages.arguments;
		for (i = 0; i < a.length; i++) {
			if (a[i].indexOf("#") != 0) {
				document.preload_images[j] = new Image;
				document.preload_images[j++].src = a[i];
			}
		}
	}
}

function MM_swapImgRestore() {
	var i, x, a = document.MM_sr;
	for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
		x.src = x.oSrc;
	}
}

function MM_findObj(n, d) {
	var p, i, x;
	if (!d) { d = document; }
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p+1)].document;
		n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all) { x = d.all[n]; }
	for (i = 0; !x && i < d.forms.length; i++) { x = d.forms[i][n]; }
	for (i = 0; !x && d.layers && i < d.layers.length; i++) { x = MM_findObj(n, d.layers[i].document); }
	if (!x && d.getElementById) { x = d.getElementById(n); }
	return x;
}

function MM_swapImage() {
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;
	for (i = 0; i < (a.length - 2); i += 3) {
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;
			if (!x.oSrc) { x.oSrc = x.src; }
			x.src = a[i+2];
		}
	}
}

function change_image(image_id, image_src) {
	if (w3) {
		if ((image_id) && (image_src)) {
			document.getElementById(image_id).src = image_src;
		}
	}
	else if (ns) {
		if ((image_id) && (image_src) && (document.images)) {
			eval("document.images." + image_id + ".src = " + image_src + ";");
		}
	}
	else if (ie) {
		if ((image_id) && (image_src)) {
			eval("document.all." + image_id + ".src = " + image_src + ";");
		}
	}
}

function set_domain() {
	var regexp = /[\w\-]+\.com$/i;
	var domstr = new String(document.domain.substr(document.domain.search(regexp)));
	if (domstr.indexOf('.com') != -1) {
		document.domain = domstr;
	}
}


// event handler to initialize text in input box and clear onFocus
// Usage:
// onFocus="initTextInput(this,'clear')"
// onBlur="initTextInput(this,'setDefault') 
function initTextInput(element, action, text, cssname, checkForDefault) {
        var txt = text;
        if (text == null || text == "") {
	  txt = "SEARCH"
	}
	
	if(element != null){
    		switch (action) {
        		case 'clear':
			cl = cssname;
			if(cssname == null) {
			  cl = 'searchboxsub-on';
			}
            		if (element.value == txt) {
                		element.value = "";
                		element.className=cl; 
            		}
            		break;
        		case 'setDefault':
			cl = cssname;
                        if(cssname == null) {
                          cl = 'searchboxsub';
                        }
            		if (element.value == "") {
                		element.value = txt;
                		element.className=cl; 
            		}
            		break;
        		default:
            		break;
    		}
	}
}

function checkForDefaultInput(fieldId, defaultInput) {
	var fieldContent;
	if (w3) { 
		fieldContent = document.getElementById(fieldId).value;
	} else if (ie) { //this is ie
		fieldContent = eval("document.all." + fieldId + ".value");
	} else {  //this is netscape 
		fieldContent = eval("document.layers." + fieldId + ".value");
	}
	return(fieldContent == defaultInput);
}
