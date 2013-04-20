    /**
     *  Declare the CUNewsletter object
     */
    if (CUNewsletter == null) var CUNewsletter = {};
    CUNewsletter.signup = function()
    {
        var theErrorCount = 0;
        var theEmail = document.getElementById('userEmail').value;
        var theHref = window.location.href;
        var theSource = (theHref.indexOf("\/cars\/")>0)? "cars":"PreferenceCenter";
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
            var requestUrl = "http://consumerreports.org/bin/emailnewsletter?email=" + theEmail;
            jQuery.ajax({
                url: requestUrl,
                dataType: 'jsonp',
                contentType: "application/json; charset=utf-8",
                timeout: 1000,
                async: false,
                cache: false,
                jsonpCallback: 'CUNewsletter.callback',
                error: function (x, t, m) {
                }
            });
        }
    };
    CUNewsletter.callback = function(obj){
        var theEmail = document.getElementById('userEmail').value;
        var theHref = window.location.href;
        var theSource = (theHref.indexOf("\/cars\/")>0)? "cars":"PreferenceCenter";
        if(typeof obj.email === "undefined" || typeof obj.firstname === "undefined" || typeof obj.lastname === "undefined" || obj.email == "" || obj.firstname == "" || obj.lastname == ""){
            var theRedirectUrl ='http://web.consumerreports.org/newsletter/email-newsletters-step1.html?email=' + theEmail + '&source=' + theSource;
            window.location.replace(theRedirectUrl);
        }else{
            var theRedirectUrl ='http://web.consumerreports.org/newsletter/email-newsletters-step2.html?email=' + theEmail + '&source=' + theSource;
            window.location.replace(theRedirectUrl);
        }
    }