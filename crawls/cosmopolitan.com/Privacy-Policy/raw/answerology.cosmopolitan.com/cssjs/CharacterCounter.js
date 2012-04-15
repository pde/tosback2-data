function countChars(element) {
    var defaultText = "In a nutshell, what's your question?";
    var currentText = element.value;
    // regex replaces all occurences of double space with one space and removes the leading and trailing spaces.
    var truncatedString = currentText.replace(/\s+/g," ").replace(/^\s*|\s*$/,"").substr(0,100);
    
    if (truncatedString == defaultText) {
	document.getElementById("char_count").innerHTML = "You have 100 characters remaining.";
	element.value = '';
	return true;
    }

    document.getElementById("char_count").innerHTML = "You have " + (100 - truncatedString.length) + " characters remaining.";

    if (truncatedString != currentText) {
	element.value = truncatedString;
    }

}

function checkText(element) {
    var defaultText = "In a nutshell, what's your question?";
    
    if (element.value == defaultText) return true;
    countChars(element);
}
