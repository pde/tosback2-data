function submitOnce(myButton) {
    if (typeof (Page_ClientValidate) == 'function') {
        if (Page_ClientValidate() == false) {
            return false;
        }
    }

    if (myButton.getAttribute('type') == 'button') {
        myButton.disabled = true;
        myButton.value = "processing...";
		if(myButton.id == 'Button1' && typeof window.recordSubmission == 'function') {
			recordSubmission(myButton);
		}
    }

    return true;
}
