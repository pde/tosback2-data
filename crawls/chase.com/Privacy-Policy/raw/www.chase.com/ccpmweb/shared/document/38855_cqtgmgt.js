function getNvp(strKey) {
	strVal = window.location.search.substr(1); 
	if(strVal.indexOf(strKey) >= 0) 
	{	strVal = strVal.substr(strVal.indexOf(strKey) + strKey.length); 
		// Check for & or + 
		if(strVal.indexOf("&") >= 0){
			strVal = strVal.substr(0, strVal.indexOf("&")); 
		} 
		else if(strVal.indexOf("+") >= 0){
			strVal = strVal.substr(0, strVal.indexOf("+")); 
		} 
	} 
	else { 
		strVal = ""; 
	} 
	return strVal; 
}

var pgn =  getNvp("pg_name=");


if ( pgn != "") {

	var overridePageLocation = "https://www.chase.com/ccpm/" + pgn ;
}