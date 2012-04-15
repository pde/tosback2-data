function autoTab(element, nextElement, e) {
		
	var doAutoTab = true;
	// This code allow for the shift tab
	if (e != undefined) {
		var key = (window.event) ? event.keyCode : e.which;
		if (key == 0) {
			doAutoTab = false;
		} else if (key == 9) {
			doAutoTab = false;
		} else if (key == 16) {
			doAutoTab = false;
		} 
	}
	
	if (doAutoTab) { 
		if (element.value.length == element.maxLength && nextElement != null) {
			element.form.elements[nextElement].focus();
		}
	}
}