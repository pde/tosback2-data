function isValidChar(refVar, strValidChars) {
 // C. Crawford 21/07/2004
 // Allow only certain characters in a string
 // example usage:	isValidChar('132 \'-.', 'abcdefghijklmnopqrstuvwxyz1234567890 \'-.')"	
 // alert("In isValidChar");
 var validChars = strValidChars ;
 var strRefVar = '' + refVar
 for (var i = 0; i < validChars.length; i++) {
   if (validChars.indexOf(strRefVar.substring(i, i + 1).toLowerCase()) == -1) {
   // alert("Invalid Character " + strRefVar.substring(i, i + 1));
   return false;
  }
 }
 // alert("Passed");
 return true;
} 

function highlightField(field) {
field.focus();
field.select();
}

function hasNumbers(str) {
var numError = false;
//Check string for numbers
for(var i=0;i<str.length;i++) {
	if(!isNaN(str.charAt(i))) numError=true;
	}
return numError;
}

function isNumeric(str) {
var numError = true;
//Check string for numbers
for(var i=0;i<str.length;i++) {
	if(isNaN(str.charAt(i))) numError=false;
	}
return numError;
}

function isAlpha(str) {
var alphaError = true;
//Check string for numbers
for(var i=0;i<str.length;i++) {
	if(str.charAt(i) < "A" || str.charAt(i) > "z") alphaError=false;
	}
return alphaError;
}

function isAlphaAndNumeric(str) {
var alphaNumError = true;
for(var i=0;i<str.length;i++) {
		if(!hasNumbers(str.charAt(i)) && !isAlpha(str.charAt(i))) {
		alphaNumError=false;
		}
	}
return alphaNumError;
}

function trimSpaces(str) {
var tempStr="";
for(var i=0;i<str.length;i++) {
	if(str.charAt(i)!=" ") tempStr+=str.charAt(i);
	}
return tempStr;
}

function trimOutsideSpaces(str) {
var tempStr="";
var foundLeadingSpc=false;
var foundTrailingSpc=false;
var trailIndex=0;
//find last index of first trailing space	
for(var i=str.length-1;i>=0;i--) {
		if(str.charAt(i)!=" " && !foundTrailingSpc) {
		foundTrailingSpc=true;
		trailIndex=(i+1);
		}
	}
//remove leading space(s) and stop at trailIndex value
for(var i=0;i<trailIndex;i++) {
	if(str.charAt(i)!=" ") foundLeadingSpc=true;
	if(str.charAt(i)!=" " && !foundLeadingSpc) tempStr+=str.charAt(i);
	if(foundLeadingSpc) tempStr+=str.charAt(i);
	}
return tempStr;
}

//usage: <string>,<valid char1>,<valid char2>,<valid char3>,etc.(any num of params)
//e.g. isValidSequence(" 0123456789","0","1","2","3","4","5","6","7","8","9"," ")
function isValidSequence(refStr) {
for (var i=0; i<refStr.length; i++) {
	if (!arrayContainsElement(isValidSequence.arguments,isValidSequence.arguments[0].charAt(i))) return false;
	}
return true;
}

function arrayContainsElement(array, elem) {
for (var i=0; i<array.length; i++) {
	if(array[i] == elem) return true;
	}
return false;
}

function isValidSequenceAndAlpha(refStr) {
for (var i=0; i<refStr.length; i++) {
	if (!arrayContainsElement(isValidSequenceAndAlpha.arguments,isValidSequenceAndAlpha.arguments[0].charAt(i)) && !isAlpha(isValidSequenceAndAlpha.arguments[0].charAt(i))) return false;
	}
return true;
}

function spawn(URL,winName,features) {
//features example - note you must pass in width & height first (IE 4+ Mac bug) width=620,height=460,directories=no,location=no,menubar=no,scrollbars=yes,toolbar=no,status=no,resizable=no,top=0,left=0
var newWindow=window.open(URL,winName,features);
}

//
// JS to remove '/' char from the search string
// + upper case
// + mid (colapse multiple spaces to 1), left and right trim (whitespace)
//
function submitSearch(formRef) {
	var searchText = formRef.searchTerms.value;
	var rExp = /\//gi;
	var newSearchText = searchText.replace(rExp, "");
	//PEP429 Start - convert one occurance of double quote to IN if after letter or number
	var count = newSearchText.split('"').length
	var leftChr = newSearchText.charAt(newSearchText.indexOf('"')-1)

	//if there is more than one quote, convert them all to blank
	//or if there is just one quote but it's the first character or is after a space then convert to blank
		if (count > 2 || (leftChr == "" || leftChr == " ") && count == 2) {
		newSearchText = newSearchText.replace(/"/g, '');
		}

	//Now our string either has no quotes or just one so lastly we need to
	//check that the character before the double quote is a valid char. If
	//it isn't, remove it.
	var isValidChr = true
		if (!isAlpha(leftChr) && !isNumeric(leftChr)) {
		isValidChr = false;
		newSearchText = newSearchText.replace(/"/,'')
		}
	//If it's valid, convert the quote to IN
		if (count == 2 && (leftChr != "" || leftChr != " ") && isValidChr) {
		newSearchText = newSearchText.replace(/"/,'IN')
		}
	//PEP429 End
	
	newSearchText = newSearchText.toUpperCase();
	newSearchText = trim(newSearchText," ");
	formRef.searchTerms.value = newSearchText;
	newSearchText = newSearchText.replace(/\s+/mg, '+');//Fix: QC# 23145.
	var doc_location = document.location;
	var escapedSearchText = escape(newSearchText);
	// And again... defect 23440
	// HTTPServer will unescape it after rewrite, and then the WC application will unescape again reading the value.
	// This is inline with how this works when JS is off.
	escapedSearchText = escape(escapedSearchText);
	var url = http+'//'+doc_location.hostname+'/static/Search/searchTerms/'+escapedSearchText+'.htm';//Fix QC# 23146
	document.location = url;
	return false;
	//return true;
}

/**
* Javascript trim, ltrim, rtrim
* http://www.webtoolkit.info/
**/
function trim(str, chars) {
    var s= ltrim(rtrim(str, chars), chars);
    return s.replace(new RegExp("[\\s]+", "g"), " ");
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

// Allow FireFox to add bookmark to sidebar as well
// as IE 'AddFavorite'
function addBookmark(title, url) {
	if (window.sidebar) {
		window.sidebar.addPanel(title, url,"");
	} else if( document.all ) {
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) {
		return true;
	} 
} 

function formatTabName(tabName){
	var formattedTabName = tabName.replace(/[^a-zA-Z0-9]+/g,'').toLowerCase();
	return formattedTabName;
}


var ArgosUtils = new (function(){
	
	this.getTrackingObj = getTrackingObj;
	function getTrackingObj(input){
		var output;	    	
		if($.browser.msie){
			//Create new object without the attributes that crash inside s_code in IE
	    	output = new Object();
	    	try{
		    	for(g in input){
					output[g] = input[g];			    	
		    	}
	    	}catch(e){/*silent failure*/}
		}else{
			output = input;
		}
		
		return output;
	}
});