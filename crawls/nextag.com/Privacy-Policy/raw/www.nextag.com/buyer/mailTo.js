
function mailTo(name, domain, options) {
	var mailToString = null;
	if ((name != null) && (domain != null) && (options != null)) {
		mailToString = "mailto:"+name+"@"+domain+"?"+options;
	}
	else if ((name != null) && (domain != null)) {
		mailToString = "mailto:"+name+"@"+domain;
	}

	if (mailToString != null) {
		window.location = mailToString;
	}
}

