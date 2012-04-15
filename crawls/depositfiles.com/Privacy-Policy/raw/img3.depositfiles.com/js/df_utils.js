	
if (!window.DF) 
	window.DF = {};
window.DF.WindowInfo = {
	getHeight: function() { 
		var myHeight = 0; 
		if( typeof( window.innerHeight ) == 'number' ) { //Non-IE 
			myHeight = window.innerHeight; 
		} else if( document.documentElement && document.documentElement.clientHeight ) { //IE 6+ in 'standards compliant mode' 
			myHeight = document.documentElement.clientHeight; 
		} else if( document.body && document.body.clientHeight ) { //IE 4 compatible 
			myHeight = document.body.clientHeight; 
		} 
		return myHeight; 
	}, 
	getWidth: function() { 
		var myWidth = 0; 
		if( typeof( window.innerWidth ) == 'number' ) { //Non-IE 
			myWidth = window.innerWidth; 
		} else if( document.documentElement && document.documentElement.clientWidth ) { //IE 6+ in 'standards compliant mode' 
			myWidth = document.documentElement.clientWidth; 
		} else if( document.body && document.body.clientWidth ) { //IE 4 compatible 
			myWidth	= document.body.clientWidth; 
		} 
		return myWidth; 
	}, 
	getTop: function () { 
		return (window.screenTop != undefined) ? window.screenTop : window.screenY;
		//return (window.screenTop != undefined) ? window.screenTop : window.screenY; 
	}, 
	getLeft: function () { 
		return (window.screenLeft != undefined) ? window.screenLeft : window.screenX; 
		//return (window.screenLeft != undefined) ? window.screenLeft : window.screenX;
	}
}
window.DF.Popup = {
	params: {
		width: 900,
		height: 600,
		url: 'about:blank'
	},
	popwin: null,
	init: function(params) {
		if (params && params.width) 
			this.params.width = params.width; 
		if (params && params.height)
			this.params.height = params.height;
		if (params && params.url)
			this.params.url = params.url;
		return true;
	},
	open: function() {
		// Place the window coordinates in the center of the active window 
		var pxLeft = Math.round(DF.WindowInfo.getLeft() + (DF.WindowInfo.getWidth() / 2)  - (this.params.width / 2)); 
		var pxTop  = Math.round(DF.WindowInfo.getTop()  + (DF.WindowInfo.getHeight() / 2) - (this.params.height / 2)); 
		this.popwin = window.open(this.params.url,'','toolbar=0,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=1,top='+pxTop+',left='+pxLeft+
			',width=' + this.params.width + ',height=' + this.params.height);
		return false;
	}
}
	
