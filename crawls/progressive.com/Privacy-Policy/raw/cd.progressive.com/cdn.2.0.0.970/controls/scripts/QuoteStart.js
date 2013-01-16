var quoteStartSelectedProduct = '';
function ValZip(src, args) {
    args.IsValid = false;
    if (args.Value.length == 5) {
        var valZipReg = new RegExp("^[0-9]{5}$");
        if (valZipReg.test(args.Value)) {
            args.IsValid = true;
        }
    }
}
function AmadesaQuoteStartClickConversion(btn) {
    if (quoteStartSelectedProduct.length > 0) {
        var id; //Amadesa conversion page id (these are obtained from Amadesa)
        switch (quoteStartSelectedProduct) {
            case "AU":
                id = '6139'; break;
            case "H":
                id = '6146'; break;
            case "C":
                id = '6147'; break;
            case "R":
                id = '6148'; break;
            case "CA":
                id = '6145'; break;
            case "MC":
                id = '6140'; break;
            case "BT":
                id = '6141'; break;
            case "TT":
                id = '6143'; break;
            case "MT":
            case "RV":
                id = '6142'; break;
            case "SM":
                id = '6144'; break;
            case "SW":
                id = '6204'; break;
            case "MH":
                id = '6645'; break;
            case "AU+HO":
                id = '9377'; break;
            case "AU+RT":
                id = '9378'; break;
            case "AU+CO":
                id = '9379'; break;
            default:
                return; break;
        }
        //check for Amadesa javascript variable before calling method
        if (typeof AmConstant == "object") {
            //amReportCompletion(id);
            if (typeof reportToAmadesa == "function") {
                reportToAmadesa(id);
            }
        }
    }
}
function trackQS_Event(btn) {
    var validationGroup = btn.id.substring(0, btn.id.lastIndexOf('_'));
    var groupId = validationGroup.substring(validationGroup.lastIndexOf('_') + 1);
    if (!Page_ClientValidate(validationGroup)) {
        return false;
    }
    var eventName = "clickQS";
    if (typeof pageTracker == "object") {
        var selectElems = document.getElementsByTagName("select");
        var ddProductList = null;
        //Need this section to get exact selection group on page
        //Complicated DOM parsing to solve automatic ASP.Net ID insertion problems
        for (var i = 0; i < selectElems.length; i++) {
            if (!selectElems[i].id) continue;
            var sections = selectElems[i].id.split("_");
            var found = false;
            for (var j = 0; j < sections.length; j++) {
                if (sections[j] === groupId) {  //Group ID should be part of the list's ID 
                    found = true;
                    ddProductList = selectElems[i];
                    break;
                }
            }
            if (found) break;
        }
        if (ddProductList == null) return;
        var selectedItemValue = ddProductList.value.toUpperCase();
        quoteStartSelectedProduct = selectedItemValue; //store product code in global (used by Amadesa method above)
        switch (selectedItemValue) {
            case "AU":
                eventName = eventName;
                AddGALinkByPost();
                break;
            case "H":
                eventName += "-homeowners";
                break;
            case "C":
                eventName += "-condo";
                break;
            case "R":
                eventName += "-renter"
                break;
            case "CA":
                eventName += "-commercial-auto";
                break;
            case "MC":
                var productName = ddProductList.options[ddProductList.selectedIndex].text.toUpperCase()
                if (productName == "GOLF CART" || productName == "GOLFCART") { //golfcart to have same product code as MC at the moment
                    eventName += "-golfcart";
                } else {
                    eventName += "-motorcycle";
                }
                AddGALinkByPost();
                break;
            case "BT":
                eventName += "-boat";
                AddGALinkByPost();
                break;
            case "TT":
                eventName += "-travel-trailer";
                AddGALinkByPost();
                break;
            case "MT":
                eventName += "-motor-home";
                AddGALinkByPost();
                break;
            case "SM":
                eventName += "-snowmobile";
                AddGALinkByPost();
                break;
            case "RV":
                eventName += "-rv";
                AddGALinkByPost();
                break;
            case "SW":
                eventName += "-segway";
                AddGALinkByPost();
                break;
            case "MH":
                eventName += "-mobile-home";
                AddGALinkByPost();
                break;
            case "AU+HO":
                eventName += "-auto-homeowners";
		        AddGALinkByPost();
                break;
            case "AU+RT":
                eventName += "-auto-renters";
		        AddGALinkByPost();
                break;
            case "AU+CO":
                eventName += "-auto-condo";
		        AddGALinkByPost();
                break;
            default:
                return; break;
        }
        pageTracker._trackPageview(eventName);
    }
}
function trackImageClick(gaMessage, redirectURL) {
    if (typeof pageTracker == "object") {
        if (gaMessage != "") {
            pageTracker._trackPageview(gaMessage);
        }
    }
    newWin = window.open(redirectURL);
}

function AddGALinkByPost() {
    $($('form')[0]).bind('submit', function() {
        pageTracker._linkByPost(this);
    });
}
