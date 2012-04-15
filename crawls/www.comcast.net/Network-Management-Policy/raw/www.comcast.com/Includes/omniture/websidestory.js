function RemoveIllegalHitboxCharacters(sString) {
    var rxWhiteSpace = /\s/g;
    var rxIllegal = /[&"'#$%^\*:!\\<>~;\[\]\{\}]/g;
    var sReturn = sString.replace(rxWhiteSpace, "+");
    sReturn = sReturn.replace(rxIllegal, "");

    return sReturn;
}

//For setting of PEC variable on Writeback collect account and Add Account pages.
function RemoveDigits(sString) {
    var rxDigits = /\w/g;
    return sString.replace(rxDigits, 'x');
}

function GetContentGroup(sPrimary, sSecondary) {
    var sReturn = "";
    if (getCookieVal("DivName") != '') {
        sReturn += "/" + RemoveIllegalHitboxCharacters(getCookieVal("DivName"));
        sReturn += "/" + RemoveIllegalHitboxCharacters(getCookieVal("MktName"));
    }

    if (sPrimary != null && sPrimary != '')
        sReturn += "/" + RemoveIllegalHitboxCharacters(sPrimary);
    if (sSecondary != null && sSecondary != '')
        sReturn += "/" + RemoveIllegalHitboxCharacters(sSecondary);

    //	alert("GetContentGroup=" + sReturn);
    return sReturn;
}

// Duplicated because of incorrect use in hbx variables xml document.
// the variables doc will be updated in 4.06.05 
function GetContentType(sPrimary, sSecondary) {
    var sReturn = "";
    if (getCookieVal("DivName") != '') {
        sReturn += "/" + RemoveIllegalHitboxCharacters(getCookieVal("DivName"));
        sReturn += "/" + RemoveIllegalHitboxCharacters(getCookieVal("MktName"));
    }

    if (sPrimary != null && sPrimary != '')
        sReturn += "/" + RemoveIllegalHitboxCharacters(sPrimary);
    if (sSecondary != null && sSecondary != '')
        sReturn += "/" + RemoveIllegalHitboxCharacters(sSecondary);

    //	alert("GetContentGroup=" + sReturn);
    return sReturn;
}

function GetHBXSuffix() {
    // getCookieVal requires CookieHelper.js
    var sSuffix = getCookieVal("HBXPageNameSuffix");
    sSuffix = sSuffix == false ? "" : "+-+" + sSuffix;
    return sSuffix;
}

function SetPageTitle(interimVal) {
    var sPageTitle = document.title.replace(" ", "+"); 
    var sInterim = interimVal == undefined ? "" : "+-+" + interimVal;
    var sSuffix = GetHBXSuffix();
}

function GetSegment() {
    var sSegment = "++"; // Clear all previous segments
    if (getCookieVal("Hash") != "")
        sSegment += "2"; //switched the --2,3 to --3,2 per bug #5000 
    else
        sSegment += "3";

    var iHFStatus = getCookieVal("HFStatus");

    //Hitbox Code for defining Segment based on HFStatus
    var custTypeSeg = GetCookie("Serviceability", "CustType");
    if (iHFStatus == "2" || custTypeSeg == 2)
        sSegment += ",4";
    else if (iHFStatus == "1" || custTypeSeg == 1)
        sSegment += ",6";
    else if (iHFStatus == "3")
        sSegment += ",5";

    var sBFStatus = GetCookie("BuyFlow", "BFStatus");

    if (sBFStatus == "InBuyFlow")
        sSegment += ",8";
    else if (sBFStatus == "InWritebackArea")
        sSegment += ",8,9";
    else if (sBFStatus == "InWritebacks")
        sSegment += ",8,9,10";
    else if (sBFStatus == "FailedWriteback")
        sSegment += ",8,9,11";

    var languageCode = getCookieVal("Language");
    if (languageCode == "es")
        sSegment += ",16";

    return sSegment;
}

function GetLocChange() {
    var sResult = "";

    var sLocGUID = GetCookie("Serviceability", "GUID");
    var sPrevLocGUID = GetCookie("Serviceability", "PrevGUID");

    if (sLocGUID != false || sPrevLocGUID != false) {
        if (sLocGUID != sPrevLocGUID) {
            sLocType = GetCookie("Serviceability", "LocalizationTypeID");
            switch (sLocType) {
                case "1":
                    sResult = "Address Type-In (DST Footprint)";
                    break;
                case "2":
                    sResult = "DST Account (Address)";
                    break;
                case "3":
                    sResult = "ZIP Code";
                    break;
                case "4":
                    sResult = "ZIP Code - User Picked Franchise";
                    break;
                case "5":
                    sResult = "DST Account (FranchiseMapID) - After G2B Failure";
                    break;
                case "9":
                    sResult = "Address Type-In (CSG Footprint)";
                    break;
                case "10":
                    sResult = "CSG Account (FranchiseMapID)";
                    break;
                default:
                    sResult = "Unknown";
                    break;
            }

            sResult += " | " + document.title;

            SetCookie("Serviceability", "PrevGUID", sLocGUID);
        }
    }

    return sResult;
}

function getTimeZone() {
    var d;
    d = new Date();
    var localHours = d.getHours();
    var greenwichHours = d.getUTCHours();
    var diff;
    if (greenwichHours > localHours)
        diff = greenwichHours - localHours;
    else
        diff = (greenwichHours + 24) - localHours;  // Compensate for when England is on the next day

    var dstBegins = getDaylightTimeBegins();
    var dstEnd = getDaylightTimeEnds();

    // test for daylight time
    if (d > dstBegins && d < dstEnds) {
        switch (diff) {
            case 9:
                return "PDT";
            case 8:
                return "MDT";
            case 7:
                return "CDT";
            case 6:
                return "EDT";
        }
    }
    else {
        switch (diff) {
            case 8:
                return "PST";
            case 7:
                return "MNT";
            case 6:
                return "CNT";
            case 5:
                return "EST";
        }
    }
    return "Not USA";
}

function getDaylightTimeBegins() //2nd Sunday in March @ 2:00am
{
    var dt = new Date();
    dt.setDate(1);
    dt.setMonth(2);
    dt.setHours(2, 0, 0, 0);
    var sundayCount = 0;
    do {
        if (dt.getDay() == 0)
            sundayCount++;
        if (sundayCount < 2) {
            dt.setDate(dt.getDate() + 1)
        }
    } while (sundayCount < 2)
    return dt;
}

function getDaylightTimeEnds() //1st Sunday in November @ 2:00am
{
    var dt = new Date();
    dt.setDate(1);
    dt.setMonth(10);
    dt.setHours(2, 0, 0, 0);
    var sundayCount = 0;
    do {
        if (dt.getDay() == 0)
            sundayCount++;
        if (sundayCount < 1) {
            dt.setDate(dt.getDate() + 1)
        }
    } while (sundayCount < 1)
    return dt;
}
function _hbPageView(p, m) {
    //Signature retained to avoid JS errors on homepage flash dl
}

function _hbLink(a, b, c) {
    //Signature retained to avoid JS errors on homepage flash dl
}