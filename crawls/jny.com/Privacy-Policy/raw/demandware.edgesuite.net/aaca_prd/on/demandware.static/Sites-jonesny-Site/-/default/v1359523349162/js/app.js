/*
 * All java script logic for the Demandware reference application.
 *
 * The code relies on the prototype.js and scriptaculous.js libraries to
 * be also loaded.
 */


/*
 * Register more initializations here
 */
window.onload = function()
{
}
function gcx(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
/*
	Opens a new window with the provided url and dimension. Used
	for Scene7 and other situations.

	@param url the url to open
	@param width the window width
	@param height the window height
*/
function openPopup( url, width, height )
{
	if (url != null)
	{
		if (width != null && height != null)
		{
			window.open(url, "", "width=" + width +", height=" + height +", scrollbars=no, resizable=yes");
		}
		else
		{
			window.open(url, "", "scrollbars=no, resizable=yes");
		}
	}
}


/*
 * Support for the compare window
 */
ProductCompare = {
	openPopup: function( url ) {
		window.open(
			url,
			'product_compare',
			'width=800,height=600,scrollbars=yes,resizable=yes',
			true /* replace history in the popped up window */
		).focus();
	}
}

/*
 * Script for GiftCard Check
 */
 
function giftCardMod10(giftCardNumber) {  

	
	var valid = "0123456789"  // Valid digits of giftcard number
	var sGCN = giftCardNumber.toString();  // string of giftCardNumber
	sGCN = sGCN.replace (/^\s+|\s+$/g,'');  // strip spaces
	var len = sGCN.length;  // length of giftcard number
	var iTotal = 0;  // integer total set at zero
	var bNum = true;  // by default assume it is a number
	var bResult = false;  // by default assume it is NOT a valid gc number
	var calc;  // used for calculation of each digit
	var checkDigit = sGCN.charAt(len-1);
	var temp;
	
	
	// Determine if the giftCardNumber is all numbers
	for (var j=0; j<len; j++) {
		temp = "" + sGCN.charAt(j);
		if (valid.indexOf(temp) == "-1"){bNum = false;}
		
	}
	
	// if it is NOT a number, you can either alert to the fact, or just pass a failure
	if(!bNum){
		/*alert("Not a Number");*/bResult = false;
	}
	
	if (len == 16 || len == 17) {
	
		for(i = len-2; i>0; i--){ 				// start at second rightmost digit.  Note that i is decremented again inside the loop, so we'll reach this point half as many times as usual.		 
			calc = sGCN.charAt(i) * 2;					// alternating, multiply first digit by two
			switch(calc){ 						// if calc is now greater than 10, add its two digits
				case 10: calc = 1; break;       //5*2=10 & 1+0 = 1
				case 12: calc = 3; break;       //6*2=12 & 1+2 = 3
				case 14: calc = 5; break;       //7*2=14 & 1+4 = 5
				case 16: calc = 7; break;       //8*2=16 & 1+6 = 7
				case 18: calc = 9; break;       //9*2=18 & 1+8 = 9
				default: calc = calc;           //4*2= 8 &   8 = 8  -same for all lower numbers
			}
			iTotal += parseInt(calc)			// now add the result to the running total
			i--;
			calc = sGCN.charAt(i);						// don't multiply the following digit by two, keep it as-is
			iTotal += parseInt(calc);			// again, add to running total
		}
		
		if (10 - iTotal % 10 == checkDigit){  // next highest multiple of 10 minus iTotal should equal checkDigit
			bResult = true;  // This IS (or could be) a valid credit card number.
		} else {
			bResult = false;  // This could NOT be a valid credit card number
		}
	
	}
	
	// change alert to on-page display or other indication as needed.
	if(bResult) {
		alert("This IS a valid Reward Pass Number!");
	}
	if(!bResult){
		alert("This is NOT a valid Reward Pass Number!");
	}
	return bResult; // Return the results

}


var isNN = (navigator.appName.indexOf("Netscape")!=-1);

function autoTab(input,len, e) {
  var keyCode = (isNN) ? e.which : e.keyCode; 
  var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
  if(input.value.length >= len && !containsElement(filter,keyCode)) {
    input.value = input.value.slice(0, len);
    input.form[(getIndex(input)+1) % input.form.length].focus();
  }

  function containsElement(arr, ele) {
    var found = false, index = 0;
    while(!found && index < arr.length)
    if(arr[index] == ele)
    found = true;
    else
    index++;
    return found;
  }

  function getIndex(input) {
    var index = -1, i = 0, found = false;
    while (i < input.form.length && index == -1)
    if (input.form[i] == input)index = i;
    else i++;
    return index;
  }
  return true;
}