//Anonymous function pattern described: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work
var _http = window.document.location.protocol;

function CCook(n,v,d){var exp= ''; var dm = document.domain;if (d) {var dt= new Date();dt.setTime(dt.getTime()+(d*24*60*60*1000));exp='; expires='+dt.toGMTString();}document.cookie= n+'='+v+exp+'; path=/;domain=' + dm +';' }

function GetC(n){var nEQ= n+'='; var ca= document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c= ca[i];while (c.charAt(0)==' ') c= c.substring(1,c.length);if (c.indexOf(nEQ) == 0) return c.substring(nEQ.length,c.length);} return null;}

function lScript(file) {
    var script = window.document.createElement('script');
    script.type = 'text/javascript'; script.src = file;	
    window.document.getElementsByTagName('head')[0].appendChild(script);
}

function IPEOpenSurvey() {
    var height = screen.height;
    var width = screen.width;
    var href = escape(window.location.href);

    CCook("IPE103923", "IPE103923", 90);

    var url = window.location.href;
    window.open( _http + '//ips-collect.iperceptions.com/startPage.aspx?sdfc=03b756c0-103923-0dcbb1db-cd59-44d5-8c25-4e78d3da0dac&lID=1&loc=STUDY&cD=90&rF=False&iType=1&domainname=0&rn=103923&pID=1&hc=81887&res=' + screen.width + 'x' + screen.height + '&referrer=' + href, "", "width=" + width + ",height=" + height + ", left=0, top=0, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no"); 
}

function IPEGetImage() {
    return document.getElementById('imgSurvey');
}

function Exec() {  
    //Check again here in case they load Banner script FIRST.
    if(GetC("IPE103923") === null) {
        if(typeof(globalswitch) !== "undefined" && globalswitch) {
            var img = IPEGetImage();
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.setAttribute('onclick','IPEOpenSurvey();'); // for FF
            img.onclick = function() {IPEOpenSurvey();}; // for IE
        }
    }
};

//Script executes this as anonmyous function to validate the image and call Global Shutoff
(function () {
    var GJS = _http + "//ipinvite.iperceptions.com/Invitations/Javascripts/Layer_Global_aicollect.js"; 
    var img = IPEGetImage();
    if(img) {
        img.style.display = 'none';
        img.style.visibility = 'collapse';

        //If user cookied already, do not show the self-serve image
        if(GetC("IPE103923") === null) {
            setTimeout(function() { lScript(GJS); }, 100);
        }
    }
})();
