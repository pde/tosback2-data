document.domain = "naver.com";

function fa(i){
	if (i != "i7") {
		(i).style.backgroundPosition='0 -34px';
	} else {
		(i).style.backgroundPosition='0 -23px';
	}
}
function ba(i){
	(i).style.backgroundPosition='0 0';
}
function fi(id){
//	for(num=1; num<=6; num++) document.getElementById('i'+num).style.zIndex='1';
//	document.getElementById(id).style.zIndex='2';
	if (id != "i7") {
		document.getElementById(id).style.backgroundPosition='right -34px';
	} else {
		if (!isEtc(id)) {
			document.getElementById(id).style.backgroundPosition='right -23px';
		}
	}
}
function bi(id){
	if (!isEtc(id)) {
		document.getElementById(id).style.backgroundPosition='right 0';
	}
}
function setHeader(string){
	if (string == "i1") {
		document.getElementById(string).className="first on";
	} else if (string == "i7") {
		document.getElementById(string).className="etc_on";
	} else {
		document.getElementById(string).className="on";
	}
}
function isEtc(id){
	if (document.getElementById(id).className != "etc_on") {
		return false;
	} else {
		return true;
	}
}
