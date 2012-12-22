/**
 *	This function will target an element containing a number and count
 *	it down to zero, incrementing every second.
 *
 *	@param int seconds
 */
function startTimer(seconds) {
	var i;
	if (seconds > 0) {
		document.getElementById('time-left').innerHTML = seconds--;
		setTimeout(function(){
			startTimer(seconds);
		}, 1000);
	}
}