
<!-- This function opens the appropriate glossary file in the popup when one of a glossary term is clicked-->
//window.name = "_glossaryWindow";
var glossaryWindow
function openGlossWin(bookMark) {
	if (glossaryWindow && !glossaryWindow.closed) {
		glossaryWindow.location = glossaryPage(bookMark)
		//glossaryWindow = window.open(glossaryPage(bookMark),'glossaryWindow','width=500,height=300,screenX=300,screenY=50,left=150,top=50,scrollbars');
		return;
	}
	glossaryWindow = window.open(glossaryPage(bookMark),'glossaryWindow','width=500,height=300,screenX=300,screenY=50,left=150,top=50,scrollbars=yes,resizable=yes');
}


<!-- This function opens the appropriate full glossary file in the main when one of the letter buttons is clicked-->
function glossaryTOC(bookMarkTOC) {
	window.location.href = glossaryPage(bookMarkTOC);	
}


<!-- This function opens the appropriate glossary file in the glossary popup when one of the letter buttons is clicked-->
function glossaryPopTOC(bookMarkPopTOC) {
	window.location.href = glossaryPage(bookMarkPopTOC);
}

//--- UTILITY FUNCTIONS ----
function glossaryPage(bookMark){
	var firstLetter = bookMark.charAt(0);
	var glossaryMark = "message.aspx?pagetypeID=";
	switch (firstLetter.toLowerCase()){
		case "a":
		case "b":
		case "c":
		case "d":
		case "e":
		case "f":
		case "g":
		case "h":	
			glossaryMark += "Glossary&nav=false";
			break;
		case "i":
		case "j":
		case "k":
		case "l":
		case "m":
		case "n":
		case "o":
		case "p":
		case "q":
			glossaryMark += "Glossary&nav=false";
			break;
		case "r":
		case "s":
		case "t":
		case "u":
		case "v":
		case "w":
		case "x":
		case "y":
		case "z":
			glossaryMark += "Glossary&nav=false";
			break;
	}
	glossaryMark += "#" + bookMark;
	return glossaryMark;
}