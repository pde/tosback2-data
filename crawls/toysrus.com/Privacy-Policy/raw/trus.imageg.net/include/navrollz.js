function imgOn(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "on.src");
	}
}
function imgOff(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "off.src");
	}
}

// email
function toggleVisibility(id)
{
    var displaySet = $(id).getStyle('display');
    if(displaySet.include('none')){
	    $(id).setStyle({
		display: 'block'
	    });
	} else {
		$(id).hide();
	}
}

function toggleiFrame(id, NNtype, IEtype, WC3type)
{
    if (document.getElementById) {
        eval("document.getElementById(id).style.zIndex = \"" + WC3type + "\"");
    } else {
        if (document.layers) {
            document.layers[id].visibility = NNtype;
        } else {
            if (document.all) {
                eval("document.all." + id + ".style.zIndex = \"" + IEtype + "\"");
            }
        }
    }
}
