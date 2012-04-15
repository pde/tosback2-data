(function(){
	window.FL = window.FL || {};

	/* things go in, but nothing EVER comes out */
	var blackHole = function() {};

	FL.state = FL.state || {
		consoleInitialized : false
	};
	if (FL.state.consoleInitialized == true) {
		return;
	} else if (typeof console != "object" || typeof console.log != "function") {
		/*
		 * for production, no console logging is ever necessary.
		 * for development, these functions should already be defined and will not be overridden.
		 */
		console = {
			log 		: blackHole,
			group 		: blackHole,
			groupEnd	: blackHole,
			dir 		: blackHole,
			info 		: blackHole,
			error 		: blackHole,
			count 		: blackHole
		}
	}
	FL.state.consoleInitialized = true;
})();