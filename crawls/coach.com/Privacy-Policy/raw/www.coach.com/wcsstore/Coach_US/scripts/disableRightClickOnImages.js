$(document).bind('contextmenu', contextMenu);

function contextMenu(e)
{
	if(e == null){
		e = window.event;
	}
	
	var element = e.srcElement;
	if(element == null){
		element = e.target;
	}
	if (element.tagName == 'IMG'){
	    return false;
	}
	else{
		return true;
	}
}
