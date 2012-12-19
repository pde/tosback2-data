//client side Credit card validation

function ValidateCreditCard(paymentType, creditcardtype, cardnumber, month, year) {
    try {
        var PTypeDrop = document.getElementById(paymentType);
        var PType = PTypeDrop.options[PTypeDrop.selectedIndex].text.toLowerCase();
        if (PType == 'creditcard') {

            var cardTypeDrop = document.getElementById(creditcardtype);
            var cardType = cardTypeDrop.options[cardTypeDrop.selectedIndex].text;

            var Number = document.getElementById(cardnumber).value;
            var expMonthDrop = document.getElementById(month);
            var expMonth = expMonthDrop.options[expMonthDrop.selectedIndex].text;

            var expYearDrop = document.getElementById(year);
            var expYear = expYearDrop.options[expYearDrop.selectedIndex].text;

            if (!IsExpiredCard(expYear, expMonth)) {
                alert("Expired Credit Card!");
                return false;
            }
            if (IsValidCreditCard(cardType, Number)) {
                return true;
            }
            else {
                alert("Invalid Credit Card Number");
                return false;
            }
        }
        else {
            return true;
        }
        return false;
    }
    catch (err) {
        alert("Payment Information - Missing Mandatory Fields!");
        return false;
    }
}

function IsValidCreditCard(type, ccnum) 
{
    if (type == "Visa") {
        // Visa: length 16, prefix 4, dashes optional.
        var re = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "MasterCard") {
        // Mastercard: length 16, prefix 51-55, dashes optional.
        var re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "Discover") {
        // Discover: length 16, prefix 6011, dashes optional.
        var re = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "American Express") {
        // American Express: length 15, prefix 34 or 37.
        var re = /^3[4,7]\d{13}$/;
    } else if (type == "Diners") {
        // Diners: length 14, prefix 30, 36, or 38.
        var re = /^3[0,6,8]\d{12}$/;
    }
    if (!re.test(ccnum)) return false;
    // Remove all dashes for the checksum checks to eliminate negative numbers
    ccnum = ccnum.split("-").join("");
    // Checksum ("Mod 10")
    // Add even digits in even length strings or odd digits in odd length strings.
    var checksum = 0;
    for (var i = (2 - (ccnum.length % 2)); i <= ccnum.length; i += 2) {
        checksum += parseInt(ccnum.charAt(i - 1));
    }
    // Analyze odd digits in even length strings or even digits in odd length strings.
    for (var i = (ccnum.length % 2) + 1; i < ccnum.length; i += 2) {
        var digit = parseInt(ccnum.charAt(i - 1)) * 2;
        if (digit < 10) { checksum += digit; } else { checksum += (digit - 9); }
    }
    if ((checksum % 10) == 0) return true; else return false;
}

function IsExpiredCard(year, month) 
{
    today = new Date();
    expiry = new Date(year, month);
    if (today.getTime() > expiry.getTime())
        return false;
    else
        return true;
}


var ssArrSrc = String('<%=moreImages%>').split(",");
var ssCurrImgInd = 1;

function ssPreload() {
    var ssArrPL = new Array();
    for (var iPL = 0; iPL < ssArrSrc.length; iPL++) {
        ssArrSrc[iPL] = String(ssArrSrc[iPL]).split('|');
        ssArrPL[iPL] = new Image();
        ssArrPL[iPL].src = ssArrSrc[iPL][0];
    }
}

function ssNext(oImg) {
    ssCurrImgInd++;
    if (ssCurrImgInd >= ssArrSrc.length) {
        ssCurrImgInd = 0;
    }
    oImg.src = ssArrSrc[ssCurrImgInd][0];
    oImg.width = ssArrSrc[ssCurrImgInd][1];
}

function ssPrev(oImg) {
    ssCurrImgInd--;
    if (ssCurrImgInd < 0) {
        ssCurrImgInd = ssArrSrc.length - 1;
    }
    oImg.src = ssArrSrc[ssCurrImgInd][0];
    oImg.width = ssArrSrc[ssCurrImgInd][1];
}

function ProductPopUp(id) {
    window.open("viewallimages.aspx?id=" + id + "", "", "width=710, height=560, top=90, left=90, resizable=0")
}

function ProductPopOut() {
    window.close();
}

function LargeImageURL(productImage) {
    window.open("", "url", "align=center, width=300, height=300, bottom=90, top=90, left=70, right=70, resizable=0")
}

//function to set the current page tab highlighted
function setActiveMenu(arr, currentPage) {
    if (currentPage == "") {
        currentPage = "default";
    }
    for (var i = 0; i < arr.length; i++) {
        if (extractPageName(arr[i].href) == currentPage) {
            arr[i].parentNode.id = "current";
            break;
        }
    }
}

//function extraxt the page name to highlight the current page anchor on the top navigation
function extractPageName(hrefString) {
    var arr = hrefString.split('.');
    arr = arr[arr.length - 2].split('/');
    return arr[arr.length - 1].toLowerCase();
}

function setPage() {
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    sPage = sPage.replace('.aspx', "")

    if (document.getElementById("tabs") != null) {
        setActiveMenu(document.getElementById("tabs").getElementsByTagName("a"), sPage.toLowerCase());
    }
}
