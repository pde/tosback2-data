function determineMethod() {
    var currentMethod;
    var sPath = window.location.toString();

    if(sPath.indexOf("SearchInterface") != -1) { 
        currentMethod = 1;  //Search
    }
    else if(sPath.indexOf("Shopping/ProductDetails.aspx") != -1) {
        currentMethod = 2;  //Cross Sell
    }
    else if(document.referrer == "http://www.shoes.com" && sPath.indexOf("ProductDetails.aspx") != -1) {
        currentMethod = 3;  //Internal Campaign
    }
    
    if(sPath.indexOf("ProductDetails.aspx") != -1) {
        if(currentMethod == 2) {
            setCookie("pfm","cross-sell",1)    
        
        }
    }    
    else {
        switch (currentMethod) {
            case 1:
                setCookie("pfm","search",1);
                break;
            case 2:
                setCookie("pfm","cross-sell",1);
                break;
            case 3:
                setCookie("pfm","internal campaign",1);
                break;
            default:
                setCookie("pfm","browse",1); //If none of these then it is browse
        }
    }              
}

function setCookie(c_name,value,expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
}

$(document).ready(determineMethod);


