function writeHoroscopesLink() {
	var today = new Date();
	var month = today.getMonth() + 1;
	var date = today.getDate();
	var currentSign;
	var todayString = '' + padDigits(today.getMonth() + 1,2) + padDigits(today.getDate(),2) + today.getFullYear().toString().substring(2);

	if (month == 1 && date >=21 || month == 2 && date <=18) {currentSign = "aquarius";}
	else if (month == 2 && date >=19 || month == 3 && date <=20) {currentSign = "pisces";}
	else if (month == 3 && date >=21 || month == 4 && date <=20) {currentSign = "aries";}
	else if (month == 4 && date >=21 || month == 5 && date <=21) {currentSign = "taurus";}
	else if (month == 5 && date >=22 || month == 6 && date <=23) {currentSign = "gemini";}
	else if (month == 6 && date >=24 || month == 7 && date <=22) {currentSign = "cancer";}
	else if (month == 7 && date >=23 || month == 8 && date <=23) {currentSign = "leo";}
	else if (month == 8 && date >=24 || month == 9 && date <=22) {currentSign = "virgo";}
	else if (month == 9 && date >=23 || month == 10 && date <=23) {currentSign = "libra";}
	else if (month == 10 && date >=24 || month == 11 && date <=21) {currentSign = "scorpio";}
	else if (month == 11 && date >=22 || month == 12 && date <=21) {currentSign = "sagittarius";}
	else if (month == 12 && date >=22 || month == 1 && date <=20) {currentSign = "capricorn";}

	document.getElementById("site_nav_horoscopes").innerHTML = '<a href="/horoscopes/'+currentSign+'/'+currentSign+'-'+todayString+'">Horoscopes</a>';
}
function padDigits(n, totalDigits) { 
	n = n.toString(); 
	var pd = ''; 
	if (totalDigits > n.length) { 
		for (i=0; i < (totalDigits-n.length); i++) { 
			pd += '0';
		} 
	} 
	return pd + n.toString(); 
}
