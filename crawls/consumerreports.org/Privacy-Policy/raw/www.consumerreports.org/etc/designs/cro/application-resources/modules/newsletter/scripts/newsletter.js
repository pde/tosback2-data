
/**
 *  Declare the CUNewsletter object
 */
if (CUNewsletter == null) var CUNewsletter = {};

CUNewsletter.signup = function()
{
    var theErrorCount = 0;
    var theEmail = document.getElementById('userEmail').value;
    var theSource = "HN";
    var theHref = window.location.href;

    //check that all required fields are filled-out
    if (theEmail == '')
    {
        alert('Please enter an e-mail address');
        theErrorCount++;
    }
    else if (theEmail.indexOf("\@") == -1 || theEmail.indexOf("\.") == -1)
    {
        alert('Please enter a valid e-mail address');
        theErrorCount++;
    }

    if (theHref.indexOf("1.htm") != -1)
    {
        theSource += "1";
    }
    else if (theHref.indexOf("2.htm") != -1)
    {
        theSource += "2";
    }
    else if (theHref.indexOf("3.htm") != -1)
    {
        theSource += "3";
    }
    else if (theHref.indexOf("4.htm") != -1)
    {
        theSource += "4";
    }


    //submit form if no errors
    if (theErrorCount == 0)
    {
        var theParamString = '?' + 'email=' + escape(theEmail) +
                                  '&firstname=' +
                                  '&lastName=&source=' + theSource +                
                                  '&redirect=' + encodeURIComponent('http://web.consumerreports.org/newsletter/email-newsletters-step1.html');
        document.location.href = 'http://consumerreports.p.delivery.net/m/p/csu/sub/process.asp'+theParamString;
    }
};

