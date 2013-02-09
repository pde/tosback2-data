function showCountdown(main, kicker_idx, category) {
    dateNow.setSeconds(dateNow.getSeconds() + 1);
    amount = dateFuture.getTime() - dateNow.getTime(); //calc milliseconds between dates
    delete dateNow;
    // time is already past
    if (amount < 0) {
        document.getElementById('countbox').innerHTML = "Now!";
    }
    // date is still good
    else {
        days = 0; hours = 0; mins = 0; secs = 0; out = "";
        amount = Math.floor(amount / 1000); //kill the "milliseconds" so just secs
        days = Math.floor(amount / 86400); //days
        amount = amount % 86400;
        hours = Math.floor(amount / 3600); //hours
        amount = amount % 3600;
        mins = Math.floor(amount / 60); //minutes
        amount = amount % 60;
        secs = Math.floor(amount); //seconds 
        if (days != 0) { out += "<font class='day'>" + days + " DAY" + ((days != 1) ? "S" : "") + "</font>&nbsp;" + ", "; }

        out += '<font class="time">';

        if (days != 0 || hours != 0) { out += (hours <= 9 ? "0" : "") + hours + ":"; }
        if (days != 0 || hours != 0 || mins != 0) { out += (mins <= 9 ? "0" : "") + mins + ":"; }
        out += (secs <= 9 ? "0" : "") + secs + "";

        out += "</font>";

        //if (days != 0 || hours != 0) { out += hours + " hour" + ((hours != 1) ? "s" : "") + ", "; }
        //if (days != 0 || hours != 0 || mins != 0) { out += mins + " minute" + ((mins != 1) ? "s" : "") + ", "; }
        //out += secs + " seconds";

		if(main == 'true'){
		    if (kicker_idx == 0) {
		        if (document.getElementById('CountDown1'))
		            document.getElementById('CountDown1').innerHTML = out;
		    }
		    else if (kicker_idx == 1) {
		        if (document.getElementById('CountDown2'))
		            document.getElementById('CountDown2').innerHTML = out;
		    }
		    else {
		        if (document.getElementById('CountDown3'))
		            document.getElementById('CountDown3').innerHTML = out;
		    }
		}

		if(category == 'true'){
			if(document.getElementById('CategoryCountDown'))
		        document.getElementById('CategoryCountDown').innerHTML = out;
		}

		setTimeout(function(){
		    showCountdown(main, kicker_idx, category);
		},1000);
    }
}