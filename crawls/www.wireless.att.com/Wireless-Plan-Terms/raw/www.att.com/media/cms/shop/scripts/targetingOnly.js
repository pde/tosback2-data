//**************************************************
// targetingOnly.js
// Author: Jason Cortese;
// Modified from targetingFW.js by Andrew Burgess last updated 1/14/2010;
// this framework is the js side of the
// homepage targeting framework
//***************************************************

if(typeof console !== 'undefined') {var debug = false}

function targetingOnlyObj() {
    //cookies
    var cookies = this.cookies = document.cookie.split(';');
    for (var i=0; i < cookies.length; ++i) {
        var index = cookies[i].indexOf('=');
        var name = cookies[i].slice(0, index).replace(/^\s+/,'');
        var value = cookies[i].slice(index+1).replace(/^\s+/,'');
        cookies[name] = [value];

        var values = value.split('|');
        for (var j=0; j < values.length; ++j) {
            var index = values[j].indexOf('=');
            var subname = values[j].slice(0, index).replace(/^\s+/,'');
            var subvalue = values[j].slice(index+1).replace(/^\s+/,'');
            cookies[name][subname] = subvalue;
        }
    }

    var customerType, regionCode, accountType, competitiveISP, uverseEligible, idFlow;
    var _ = {getAttribute: function () {}, setAttribute: function () {}};
    var $ = window.jQuery || _.getAttribute;

    var aka_region_code = ($('meta[name*=wt_aka_region_code]')[0]||_).getAttribute('content');
    var aka_network = ($('meta[name*=wt_aka_network]')[0]||_).getAttribute('content');
    var aka_dma = ($('meta[name*=wt_aka_dma]')[0]||_).getAttribute('content');

    //localization region
    this.getRegionCode = function getRegionCode () {
        regionCode = '';

        var locale = cookies.attPersistantLocalization || [];
        var state = aka_region_code || locale.state;

        var region_13_state = ['AR','KS','MS','OK','TX','CA','NE','CO','IL','IN','MI','OH','WI'];
        var region_9_state = ['AL','FL','GA','KN','LO','MS','NC','SC','TN'];
        var region_OF = ['AK','AZ','CT','DE','DC','HI','ID','IA','ME','MD','MA','MN','MT','NV','NH','NJ','NM','NY','ND','OR','PA','RI','SD','UT','VT','VA','WA','WV','WY'];

        if (~region_13_state.toString().indexOf(state)) regionCode = '13';
        else if (~region_9_state.toString().indexOf(state)) regionCode = '9';
        else if (~region_OF.toString().indexOf(state)) regionCode = 'OF';

        return regionCode;
    }

    //account type
    this.getAccountType = function getAccountType () {
        accountType = '';
        regionCode = regionCode || this.getRegionCode();

        if (cookies.uvp_env) accountType += 'U';
        else if (regionCode == '13' || regionCode == '9') accountType += 'D';

        if (cookies.colam_ctn && cookies.colam_ctn[0].substr(4, 9)<<0) accountType += 'M';

        return accountType;
    }

    //u-verse eligible
    this.getUverseEligible = function getUverseEligible () {
        uverseEligible = '';
        accountType = accountType || this.getAccountType();

        var qualified = (accountType != 'U' && accountType != 'UM' && regionCode != 'OF');
        if (cookies.attTargetUverse && qualified) uverseEligible = 'UG';

        return uverseEligible;
    }

    //existing customer type
    this.getCustomerType = function getCustomerType () {
        customerType = '';
        regionCode = regionCode || this.getRegionCode();
        accountType = accountType || this.getAccountType();

        if (regionCode && accountType) customerType = '3';
        else if (regionCode && (cookies.uvp_env || cookies.colam_ctn)) customerType = '2';
        else customerType = '1';

        return customerType;
    }

    //competing isp
    this.getCompetitiveISP = function getCompetitiveISP () {
        competitiveISP = '';
        regionCode = regionCode || this.getRegionCode();
        customerType = customerType || this.getCustomerType();

        if (aka_network == 'att' || aka_network == 'sbc_internet' || aka_network == 'prodigy') competitiveISP = '';
        else if (aka_network && (regionCode != 'OF' || customerType != '3')) competitiveISP = 'CI';

        return competitiveISP;
    }

    //id flow flag
    this.getIdFlow = function getIdFlow () {
        idFlow = '';

        if(cookies.IDcookie) idFlow = 'ID';

        return idFlow;
    }

    this.getCustSeg = function getCustSeg() {
        this.getRegionCode();
        this.getAccountType();
        this.getUverseEligible();
        this.getCustomerType();
        this.getCompetitiveISP();
        this.getIdFlow();

        var custSeg = '';
        custSeg += customerType;
        custSeg += '~' + regionCode;
        custSeg += '~' + accountType;
        custSeg += '~' + competitiveISP;
        custSeg += '~' + uverseEligible;
        custSeg += idFlow ? '~' + idFlow : '';

        return custSeg;
    }
}

//TODO: finish updating deferred promise to use ATT.ready;
var reporting_ready = window.reporting_ready || ATT.ready('Reporting') || new jQuery.Deferred();
jQuery.when(reporting_ready).then(function (reporting) {
    var targetingOnly = new targetingOnlyObj();

    jQuery('<meta/>', {name: 'DCSext.wtCustSeg', content: targetingOnly.getCustSeg()}).appendTo('head');

});

