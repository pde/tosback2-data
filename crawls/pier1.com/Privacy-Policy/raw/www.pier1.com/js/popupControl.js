function closePopup(Window, ParentLocation) {
	if (Window == null && self != null) {
		Window = self;
	}
	
	if (Window != null && !Window.closed) {
		Window.close();
		if (Window == self && Window.opener != null && !Window.opener.closed) {
			if (ParentLocation != null) {
				Window.opener.location.href=ParentLocation;
			}
			Window.opener.focus();
		}
	}
}

function openPopup(url, features, name, shouldReplace, shouldCenter, shouldPopUnder, shouldCheatBlockers, shouldAlertOnBlock) {
	if (url != null) {
		if (features != null && features.length > 0) {
			
			shouldCenter = ((shouldCenter == null || shouldCenter == true) 
							&& (features.indexOf('width') >= 0 && features.indexOf('height') >= 0) 
							&& !(features.indexOf('top') >= 0 || features.indexOf('left') >= 0));
			
			if (shouldCenter) {
				var winHeight = new Number(parseInt(features.substr(features.indexOf('=', features.indexOf('height')) + 1)));
				var winWidth  = new Number(parseInt(features.substr(features.indexOf('=', features.indexOf('width')) + 1)));
				var winTop    = (screen.availHeight - winHeight) / 2;
				var winLeft	  = (screen.availWidth - winWidth) / 2;
				features = appendNameValueStrings(features, 'top=' + winTop + ',left=' + winLeft, ',');
			}

		} else {
			if (features == null) { features = new String(''); }
		}
		
		if (name == undefined) {
			name = null
		}
		
		if (shouldReplace == undefined){
			shouldReplace = null;
		}
		
		var poppedWin = window.open(url, name, features, shouldReplace);
		
		if (poppedWin != null && !poppedWin.closed) {
			if (shouldPopUnder) {
				poppedWin.blur();
				if (self != null) {
					self.focus();
				}
			} else {
				poppedWin.focus();
			}
		} else {
			if (shouldCheatBlockers) {
			
			} else if (shouldAlertOnBlock) {
				window.alert('It appears an important Pier 1 promotion has been blocked from appearing.\n\nTo view this promotion please disable any pop-up blocking software or add pier1.com to the blocker\'s list of allowed sites.');
			}
		}
	}
}