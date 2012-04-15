var currency = new Array();





var rate = 1.0;
var _rateSmall = 1.0;
var currencySymbol = 'us$';
var currencyCode = 'USD';
var _currencyCodeSmall = 'CAD';
var roundingType = 'Floor';
var currencyDisplayMode = 'CurrencySymbol';
var funHandlerBefore = null;
var funHandlerAfter = null;
var timer;
var DefaultCurrencyCode = 'USD';
var DefaultCurrencySymbol = '$';
var showOnlyDefaultCurrencySymbolOnSelection = true;
var _showSmallCurrency = true;
var afterfunctionCallCount = 0;
var beforefunctionCallCount = 0;


function ConvertCurrency(currencyTo_, currencyDisplayMode_, rounding_, domid_) {

    if (currency.length == 0) {
        InitCurrencyArray();
    }
    rate = currency[currencyTo_].CurrencyRate;
    _rateSmall = currency[currencyTo_].CurrencyRateSmall;
    _currencyCodeSmall = currency[currencyTo_].CurrencyCodeSmall;
    currencyCode = currencyTo_;
    currencySymbol = currency[currencyTo_].CurrencySymbol;
    currencyDisplayMode = currencyDisplayMode_;
    roundingType = rounding_;
    _showSmallCurrency = true;
    
    if (domid_ == null) domid_ = window.document;

    if (funHandlerBefore != null && beforefunctionCallCount < 1) {
        beforefunctionCallCount = beforefunctionCallCount + 1;
        funHandlerBefore();
        beforefunctionCallCount = 0;
    }
    
    var rateSmall = currency[currencyTo_].CurrencyRateSmall;
    var currencyFlagImage = currency[currencyTo_].CurrencyFlagImage;
    var CurrencyFlagImageSmall = currency[currencyTo_].CurrencyFlagImageSmall;
    var currencySymbolSmall = currency[currencyTo_].CurrencyCodeSmall;
    var defaultCurrencySymbol = currency[DefaultCurrencyCode];

    if (showOnlyDefaultCurrencySymbolOnSelection && DefaultCurrencyCode == currencyCode) {
        currencySymbol = DefaultCurrencySymbol;
        jQuery(domid_).contents().find(".fpDefaultCurrencySymbol").text(DefaultCurrencySymbol);
        _showSmallCurrency = false;
    }
    else {
        
        switch (currencyDisplayMode_) {

            case "DefaultCurrencySymbol":
                currencySymbol = DefaultCurrencySymbol;
                currencySymbolSmall = currency[currencyTo_].CurrencySymbolSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencySymbolSmall;
            case "CurrencyCode":
                currencySymbol = currency[currencyTo_].CurrencyCode;
                currencySymbolSmall = currency[currencyTo_].CurrencyCodeSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCodeSmall;
                break;
            case "CurrencySymbol":
                currencySymbol = currency[currencyTo_].CurrencySymbol;
                currencySymbolSmall = currency[currencyTo_].CurrencySymbolSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencySymbol;
                break;
            case "CurrencyFlagAndCode":
                currencySymbol = currencyFlagImage + currency[currencyTo_].CurrencyCode;
                currencySymbolSmall = CurrencyFlagImageSmall + currency[currencyTo_].CurrencyCodeSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCode;
                break;
            case "CurrencyFlagAndSymbol":
                currencySymbol = currencyFlagImage + currency[currencyTo_].CurrencyCustomSymbol;
                currencySymbolSmall = CurrencyFlagImageSmall + currency[currencyTo_].CurrencyCustomSymbolSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCustomSymbol;
                break;
            case "CurrencyCustomText":
                currencySymbol = currency[currencyTo_].CurrencyCustomText;
                currencySymbolSmall = currency[currencyTo_].CurrencyCustomTextSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCustomText;
                break;
            case "CurrencyCustomSymbol":
                currencySymbol = currency[currencyTo_].CurrencyCustomSymbol;
                currencySymbolSmall = currency[currencyTo_].CurrencyCustomSymbolSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCustomSymbol;
                break;
            case "CurrencyFlagAndSymbolBigCurrencyCodeSmall":
                currencySymbol = currencyFlagImage + currency[currencyTo_].CurrencyCustomSymbol;
                currencySymbolSmall = currency[currencyTo_].CurrencyCodeSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencyCustomSymbol;
                break;
            default:
                currencySymbol = currency[currencyTo_].CurrencySymbol;
                currencySymbolSmall = currency[currencyTo_].CurrencySymbolSmall;
                defaultCurrencySymbol = currency[DefaultCurrencyCode].CurrencySymbol;
                break;
        }
    }


    jQuery(domid_).contents().find(".fpcurrencytext").html(currencySymbol);
             
    jQuery(domid_).contents().find(".fpcurrencytext.FPCurrencyCode").html(currency[currencyTo_].CurrencyCode);

    jQuery(domid_).contents().find(".fpcurrencytext.FPCurrencySymbol").html(currency[currencyTo_].CurrencySymbol);

    jQuery(domid_).contents().find(".fpcurrencytext.FPCurrencyFlagImage").html(currency[currencyTo_].CurrencyFlagImage);

    jQuery(domid_).contents().find(".fpcurrencytext.FPCurrencyCustomSymbol").html(currency[currencyTo_].CurrencyCustomSymbol);

    jQuery(domid_).contents().find(".fpcurrencytext.FPNone").html('');

    jQuery(domid_).contents().find('.fpDefaultCurrencySymbol').html(defaultCurrencySymbol);

    var funPtrRound = null;

    switch (rounding_) {
        case "Floor": funPtrRound = Math.floor; break;
        case "Ceil": funPtrRound = Math.ceil; break;
        case "Round": funPtrRound = Math.round; break;
        case "RoundToFixDecimal": funPtrRound = RoundToFixDecimal; break;
        default: funPtrRound = RoundToFixDecimal; break;
    }

    // Round: specified in rounding
    jQuery(domid_).contents().find('.fpamount').each(function () {
        var newamount = jQuery(this).attr("title");
        newamount = newamount.replace(",", "");
        newamount = funPtrRound(parseFloat((newamount * 1.0) * rate));
        jQuery(this).text(newamount);
    });

    // Round ToCeil
    jQuery(domid_).contents().find('.fpamount.fpRoundCeil').each(function () {
        var newamount = jQuery(this).attr("title");
        newamount = newamount.replace(",", "");
        newamount = Math.ceil(parseFloat((newamount * 1.0) * rate));
        jQuery(this).text(newamount);
    });

    // Round: ToFloor
    jQuery(domid_).contents().find('.fpamount.fpRoundFloor').each(function () {
        var newamount = jQuery(this).attr("title");
        newamount = newamount.replace(",", "");
        newamount = Math.floor(parseFloat((newamount * 1.0) * rate));
        jQuery(this).text(newamount);
    });

    // Round: RoundToFixDecimal
    jQuery(domid_).contents().find('.fpamount.fpRoundToFixDecimal').each(function () {
        var newamount = jQuery(this).attr("title");
        newamount = newamount.replace(",", "");
        newamount = RoundToFixDecimal(parseFloat((newamount * 1.0) * rate));
        jQuery(this).text(newamount);
    });

    if (_showSmallCurrency == true) {

        jQuery(domid_).contents().find('.fpcurrencytextSmall').show();

        jQuery(domid_).contents().find('.fpamountSmall').show();

        jQuery(domid_).contents().find('.fpamountSmall').each(function () {
            var newamount = jQuery(this).attr("title");
            newamount = newamount.replace(",", "");
            newamount = funPtrRound(parseFloat((newamount * 1.0) * rateSmall));
            jQuery(this).text(newamount);
        });

        jQuery(domid_).contents().find('.fpamountSmall.fpRoundCeil').each(function () {
            var newamount = jQuery(this).attr("title");
            newamount = newamount.replace(",", "");
            newamount = Math.ceil(parseFloat((newamount * 1.0) * rateSmall));
            jQuery(this).text(newamount);
        });

        jQuery(domid_).contents().find('.fpamountSmall.fpRoundFloor').each(function () {
            var newamount = jQuery(this).attr("title");
            newamount = newamount.replace(",", "");
            newamount = Math.floor(parseFloat((newamount * 1.0) * rateSmall));
            jQuery(this).text(newamount);
        });

        jQuery(domid_).contents().find('.fpamountSmall.fpRoundToFixDecimal').each(function () {
            var newamount = jQuery(this).attr("title");
            newamount = newamount.replace(",", "");
            newamount = RoundToFixDecimal(parseFloat((newamount * 1.0) * rateSmall));
            jQuery(this).text(newamount);
        });

        jQuery(domid_).contents().find('.fpcurrencytextSmall').html(currencySymbolSmall);

        jQuery(domid_).contents().find(".fpcurrencytextSmall.FPCurrencyCode").html(currency[currencyTo_].CurrencyCodeSmall);

        jQuery(domid_).contents().find(".fpcurrencytextSmall.FPCurrencySymbol").html(currency[currencyTo_].CurrencySymbolSmall);

        jQuery(domid_).contents().find(".fpcurrencytextSmall.FPCurrencyFlagImage").html(currency[currencyTo_].CurrencyFlagImageSmall);

        jQuery(domid_).contents().find(".fpcurrencytextSmall.FPCurrencyCustomSymbol").html(currency[currencyTo_].CurrencyCustomSymbolSmall);

        jQuery(domid_).contents().find(".fpcurrencytextSmall.None").html('');
    }
    else {

        jQuery(domid_).contents().find('.fpcurrencytextSmall').hide();
        jQuery(domid_).contents().find('.fpamountSmall').hide();
    }

    for (key in currency) 
    {
        if (currencyTo_ == currency[key].CurrencyCode) 
        {
            jQuery(domid_).contents().find('.fpHideWhen' + currency[key].CurrencyCode).hide();
            jQuery(domid_).contents().find('.fpShowWhen' + currency[key].CurrencyCode).show();
        }

        if (currencyTo_ != currency[key].CurrencyCode) {
            jQuery(domid_).contents().find('.fpHideWhenNot' + currency[key].CurrencyCode).hide();
            jQuery(domid_).contents().find('.fpShowWhenNot' + currency[key].CurrencyCode).show();
        }
    }

    if (funHandlerAfter != null && afterfunctionCallCount < 1) {
        afterfunctionCallCount = afterfunctionCallCount + 1;
        funHandlerAfter();
        afterfunctionCallCount = 0;
    }

}

function RoundToFixDecimal(value) {
    var num = new Number(Math.round(value * 100.00) / 100);
    return num.toFixed(2);
}

function SetCurrencyRoundingType(roundingType_) {
    roundingType = roundingType_;
}

function SetCurrencyRate(currencycode_, newrate_) {

    if (currency[currencycode_] != null) {
        currency[currencycode_].CurrencyRate = newrate_;
    }

    for (i=0;i< currency.length; i++)
    {
        if (currency[i].CurrencyCodeSmall == currencycode_) {
            currency[i].CurrencyRateSmall = newrate_;
        }
    }
}

function GetCurrencyRate(currencyCode_) {
    if (currencyCode_ != null && currency[currencyCode_].CurrencyRate != null) {
        return currency[currencyCode_].CurrencyRate;
    }
    else {
        return rate;
    }
}

function GetSmallCurrencyRate(currencyCode_) {
    if (currencyCode_ != null && currency[currencyCode_].CurrencyRateSmall != null) {
        return currency[currencyCode_].CurrencyRateSmall;
    }
    else {
        return _rateSmall;
    }

}

function GetCurrencySymbol(currencyCode_) {
    if (currencyCode_ != null && currency[currencyCode_].CurrencySymbol != null) {
        return currency[currencyCode_].CurrencySymbol;
    }
    else {
        return currencySymbol;
    }
}

function GetRoundingType() {
    return roundingType;
}



function GetCurrencyCode() {
    return currencyCode;
}

function SetCurrencySymbol(symbol) {
    currencySymbol = symbol;
}

function GetCurrencyCodeSmall() {
    return _currencyCodeSmall;
}

function GetCurrencyDisplayMode() {
    return currencyDisplayMode;
}

function SetSmallCurrencyShowFlag(showFlag_) {
    _showSmallCurrency = showFlag_;
}

function SetFunctionHandlerBefore(functionName) {
    funHandlerBefore = functionName;
}

function SetFunctionHandlerAfter(functionName) {
    funHandlerAfter = functionName;
}

function RefreshCurrency(delay) {
    if (delay * 1.0 > 0) {
        timer = setTimeout("OnRefreshCurrency()", delay);
    }
    else {
        OnRefreshCurrency();
    }
}

function OnRefreshCurrency() {
    ConvertCurrency(currencyCode, currencyDisplayMode, roundingType);

    if (timer != null) {
        clearTimeout(timer);
    }
}

function AddCurrency(_currencyToAdd) {
    if (currency[_currencyToAdd.CurrencyCode] == null) {
        currency[_currencyToAdd.CurrencyCode] = _currencyToAdd;
    }
}
//Get Query String Value
function GetValForQParam(name) {
    var results = (new RegExp("[\\?&]" + name.toLowerCase().replace("/[\[]/", "\\\[").replace("/[\]]/", "\\\]") + "=([^&#]*)")).exec(window.location.href.toLowerCase());
    if (results != null && results.length > 1)
        return unescape(results[1]);

    return "";
}





function InitCurrencyArray() {

    currency["USD"] = { CurrencyName: "US Dollar",
        CurrencyCode: "USD",
        CurrencyRate: .85,
        CurrencySymbol: "US$",
        CurrencyFlagImage: '<span class="flagsprite flagUSD"></span>',
        CurrencyCustomSymbol: "$",
        CurrencyCodeSmall: "CAD",
        CurrencyRateSmall: 1.00,
        CurrencySymbolSmall: "C$",
        CurrencyFlagImageSmall: '<span class="flagsprite flagCAD"></span>',
        CurrencyCustomSymbolSmall: "$"
    };

    currency["CAD"] = { CurrencyName: "Canadian Dollar",
    CurrencyCode: "CAD",
    CurrencyRate: 1.0,
    CurrencySymbol: "C$",
    CurrencyFlagImage: '<span class="flagsprite flagCAD"></span>',
    CurrencyCustomSymbol: "$",
    CurrencyCodeSmall: "USD",
    CurrencyRateSmall: 1,
    CurrencySymbolSmall: "US$",
    CurrencyFlagImageSmall: '<span class="flagsprite flagUSD"></span>',
    CurrencyCustomSymbolSmall: "$"
};

}

function CountryShow()
{
	document.getElementById('SltCountrydrop').style.display = "block";
}	

function CountryHide()  
{
	document.getElementById('SltCountrydrop').style.display = "none";
}

$(document).ready(function(){
  $("body").click(function(){
	$("#SltCountrydrop").hide();
  });
});