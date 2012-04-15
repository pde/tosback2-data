
function trimString (str) {
  while (str.charAt(0) == ' ')
    str = str.substring(1);
  while (str.charAt(str.length - 1) == ' ')
    str = str.substring(0, str.length - 1);
  return str;
}


function emailCheck(type) // not sure if anybody uses this, but just in case i'm leaving it functional
{
 var email = trimString(document.emailForm.emailAddress.value);

    if (!validEmail(email))
	{
        alert('Please enter a valid e-mail address.');
        return false;
    }
	if(type == 1)
	{
        document.emailForm.submit();
	}
}

function validEmail(email)
{
    var vAtSym    = email.indexOf('@')
    var vPeriod   = email.lastIndexOf('.')
    var vSpace    = email.indexOf(' ')
    var vLength   = email.length - 1   // Array is from 0 to length-1

    if (vAtSym < 1 ||                     // '@' cannot be in first position
    	vPeriod <= vAtSym + 1 ||          // Must be atleast one valid char btwn '@' and '.'
    	vPeriod == vLength  ||            // Must be atleast one valid char after '.'
    	vSpace  != -1)                    // No empty spaces permitted
	{
        return false;
    }
	return true;
}


function showCustomPopUp(thisUrl,thisName,theseParams)
{
	remote = open(thisUrl, thisName, theseParams);
}


//	verisign POP-UP WINDOW
function popUp(url)
{
	sealWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=500,height=450');
	self.name = "mainWin";
}

function jump(url)
{
	if (url != "" && url != null)
	{
		self.location.href = url;
	}
}

