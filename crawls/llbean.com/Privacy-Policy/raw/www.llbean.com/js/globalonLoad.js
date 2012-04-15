/*requires llbglobalnavigation.js*/
/*requires shoppingBag.js*/
/*requires thumbnails.js*/
function addOnLoadEvent(func) {

	var oldonload = window.onload;

	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
