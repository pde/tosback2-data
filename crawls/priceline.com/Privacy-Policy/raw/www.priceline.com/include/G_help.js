var gIQConstPopUpSmall = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=425,height=350';
var gIQConstPopUpMedium = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=525,height=450';
var gIQConstPopUpLarge = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=625,height=550';

function gfIQPopUpHelp(faq, size){
var sSize = gIQConstPopUpMedium;

if (arguments.length == 0)
return;
	if (arguments.length == 2){
		if (size == gIQConstPopUpSmall || size == gIQConstPopUpMedium || size == gIQConstPopUpLarge) {
		sSize = size;
		}
	} 
	if(faq != ""){ 
	var sLink = "/Customerservice/faq/ShowHelp.asp?session_key=" + gSK() + "&faq=" + faq; 
	var helpwin = window.open(sLink, "PricelineHelp", sSize);
	helpwin.focus();
	}
}