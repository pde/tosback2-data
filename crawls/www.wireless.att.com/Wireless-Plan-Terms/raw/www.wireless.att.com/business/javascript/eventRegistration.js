var ev = {
	eventObserve: function (elm, evType, fn, useCapture) {
		//
		//	Cross-browser friendly means of registering event handlers
		//	based on the addEvent function by Scott Andrew
		//	with slight customization.
		//
		if((typeof elm == 'undefined') || (elm == null)){return false}
		
		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, useCapture);
			return fn;
		}
		else if (elm.attachEvent) {
			try {
				elm['e'+evType+fn] = fn;
				elm[evType+fn] = function(){
                                    elm['e'+evType+fn](window.event);
                                };
				elm.attachEvent( 'on'+evType, elm[evType+fn] );
			} catch (e) {}
			return fn;
		}
		else {
			elm['on' + evType] = fn;
		}
	},
	eventStopObserving: function(elm, evType, fn, useCapture) {
		//
		//	Cross-browser friendly means of unregistering event handlers
		//	modified from prototype event.stopObserving, then formatted to cooperate with eventObserve
		//
		if (elm.removeEventListener) {
			elm.removeEventListener(evType, fn, useCapture);
		} else if (elm.detachEvent) {
		  try {
			elm.detachEvent( 'on'+evType, elm[evType+fn] );
			elm[evType+fn] = null;	  
			} 
		  catch (e) {}
		}
		return fn;
	}
};
