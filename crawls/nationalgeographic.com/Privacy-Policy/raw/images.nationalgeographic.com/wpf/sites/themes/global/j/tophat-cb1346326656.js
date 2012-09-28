var is_wpf = false;
var is_non_wpf = false;

/* define a global is_jquery variable */
var is_jquery = ((typeof(jQuery)!="undefined")?true:false);

wpf_checkFlyoutPath = function(coll) {
    for(var opts in coll) {
        var pth = ((typeof(coll[opts].pth) != "undefined") ? coll[opts].pth : null);
        if(pth) {
            var req_obj = jQuery.ajax({
                url:pth,
                error:function(requestObject,status,err) {},
                complete:function(requestObject,status) {
                    var is_flyout = /<div *class *= *\".*sneak_peek.*\".*>/i.test(requestObject.responseText);
                    window[opts] = (((parseInt(requestObject.status) < 400) && is_flyout) ? true : false);
                    if(opts == 'is_wpf' && !window[opts]) {
                        wpf_checkFlyoutPath({ is_non_wpf:{ pth:'/wpf-includes/nav-flyout-home.html' } });
                    }
                }
            });
        }
    }
}
wpf_checkFlyoutPath({ is_wpf:{ pth:'/common/nav-flyout/home/' } });

/* set up the common selectors used for internationlization */
var ngs_intl_selectors = {
    home: "#intl_link_tophat_primary_home, #intl_link_headerboard_logo, #intl_link_footer_home, #intl_link_breadcrumb_home",
    header_search: "#header_search",
    subscriptions: "#intl_link_subscriptions, #intl_link_footer_subscriptions",
    natgeotv: "#intl_link_tophat_primary_natgeotv, #intl_link_footer_natgeotv",
    natgeotv_subnav: "#intl_link_sub_natgeotv > li",
    natgeotv_flyout: "#intl_link_sub_natgeotv .sneak_peak",
    shop: "#intl_link_tophat_primary_shop, #intl_link_footer_shop",
    shop_subnav: "#intl_link_sub_shop > li",
    shop_flyout: "#intl_link_tophat_primary_shop > ul.nav .sneak_peak"
};

/* define the basic/default international settings and any country based changes */
var ngs_intl_settings /* in alphabetical order by 2-letter country code */ = {
    default_country: "United States",
    active_countries: [
        "India",
        "United Kingdom",
        "Australia"
    ],
    "au": {
        init: function() {
            this.setAttributes = _ngs_proto.setAttributes;
            return this.setAttributes({
                home:{
                    selector: ngs_intl_selectors.home,
                    atts: { href: "http://nationalgeographic.com.au" }
                },
                header_search: {
                    selector: ngs_intl_selectors.header_search,
                    atts: { action: "http://nationalgeographic.com.au/search/" }
                },
                natgeotv:{
                    selector: ngs_intl_selectors.natgeotv,
                    atts: { href: "http://natgeotv.com/" }
                },
                natgeotv_subnav:{
                    selector: ngs_intl_selectors.natgeotv_subnav,
                    atts: {
                        html: "&nbsp;",
                        css: {"border":"0px solid black"}
                    }
                },
                // any flyouts being hidden must follow the naming convention:
                // [nav label]_flyout - where [nav label] is the link text for that tophat nav item
                // i.e., 'environment_flyout', or 'animals_flyout'
                // natgeotv_flyout: {
                //     selector: ngs_intl_selectors.natgeotv_flyout,
                //     atts: { css: {"display":"none"}, disabled: true }
                // },
                shop:{
                    selector: ngs_intl_selectors.shop,
                    atts: { href: -1 }
                }
            }/* optional callback function *//*,
            function() {}*/
            );
        }
    },
    "in": {
        init: function() {
            this.setAttributes = _ngs_proto.setAttributes;
            return this.setAttributes({
                home:{
                    selector: ngs_intl_selectors.home,
                    atts: { href: "http://www.nationalgeographic.co.in" }
                },
                header_search: {
                    selector: ngs_intl_selectors.header_search,
                    atts: { action: "http://nationalgeographic.co.in/search/" }
                },
                subscriptions:{
                    selector: ngs_intl_selectors.subscriptions,
                    atts: { href:
                         "https://w1.buysub.com/pubs/NG/NGM/3167120100628.jsp?cds_page_id=31671&cds_mag_code=NGM&id=1278439647292&lsid=31871306557012781&vid=3&cds_misc_5=MULTISUBS4" }
                },
                natgeotv:{
                    selector: ngs_intl_selectors.natgeotv,
                    atts: { href: "http://natgeotv.com/" }
                },
                natgeotv_subnav:{
                    selector: ngs_intl_selectors.natgeotv_subnav,
                    atts: {
                        html: "&nbsp;",
                        css: {"border":"0px solid black"}
                    }
                },
                // any flyouts being hidden must follow the naming convention:
                // [nav label]_flyout - where [nav label] is the link text for that tophat nav item
                // i.e., 'environment_flyout', or 'animals_flyout'
                natgeotv_flyout: {
                    selector: ngs_intl_selectors.natgeotv_flyout,
                    atts: { css: {"display":"none"}, disabled: true }
                },
                shop:{
                    selector: ngs_intl_selectors.shop,
                    atts: { href: -1 }
                }
            }/* optional callback function *//*,
            function() {}*/
            );
        }
    },
    "uk": {
        init: function() {
            this.setAttributes = _ngs_proto.setAttributes;
            /*Since the setAttributes function creates a new API layer above jQuery that is less flexible and does not provide a way to accurately reference the "this" object when setting attributes that I can see, I have to change the URL for the Kids section from .com to .co.uk outside the setAttributes call. */
            jQuery('#navigation_tophat_primary>li.nav8 a').each(function(){
                if(jQuery(this).text() != 'Little Kids'){
                    jQuery(this).attr('href', jQuery(this).attr('href').replace("nationalgeographic.com","nationalgeographic.co.uk"));
                }
            });
            jQuery('#navigation_tophat_primary>li.nav5>ul.nav>li.nav7>a').attr('href', 'http://www.natgeotraveller.co.uk/');
            return this.setAttributes({
                home:{
                    selector: ngs_intl_selectors.home,
                    atts: { href: "http://www.nationalgeographic.co.uk" }
                },
                header_search: {
                    selector: ngs_intl_selectors.header_search,
                    atts: { action: "http://nationalgeographic.co.uk/search/" }
                },
                subscriptions:{
                    selector: ngs_intl_selectors.subscriptions,
                    atts: { href: "https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=NGM&cds_page_id=37881&cds_misc_5=UKSUBSPAGE9" }
                },
                natgeotv:{
                    selector: ngs_intl_selectors.natgeotv,
                    atts: { href: "http://natgeotv.com/" }
                },
                natgeotv_subnav:{
                    selector: ngs_intl_selectors.natgeotv_subnav,
                    atts: {
                        html: "&nbsp;",
                        css: {"border":"0px solid black"}
                    }
                },
                // any flyouts being hidden must follow the naming convention:
                // [nav label]_flyout - where [nav label] is the link text for that tophat nav item
                // i.e., 'environment_flyout', or 'animals_flyout'
                natgeotv_flyout: {
                    selector: ngs_intl_selectors.natgeotv_flyout,
                    atts: { css: {"display":"none"}, disabled: true }
                },
                shop:{
                    selector: ngs_intl_selectors.shop,
                    atts: { href: "http://www.shopnatgeo.co.uk" }
                },
                shop_subnav:{
                    selector: ngs_intl_selectors.shop_subnav,
                    atts: {
                        html: "&nbsp;",
                        css: {"border":"0px solid black"}
                    }
                },
                shop_flyout: {
                    selector: ngs_intl_selectors.shop_flyout,
                    atts: { css: {"display":"none"}, disabled: true }
                },
                photography_subnav:{
                    /*The "Buy Prints" link in the Photography subnav will be hidden*/
                    selector: '#navigation_tophat_primary>li.nav2>ul.nav>li.nav8',
                    atts: { css: {"display":"none"}, disabled: true }
                },
                environment_subnav:{
                    /*"The Green Guide" link in the Environment subnav will be hidden*/
                    selector: '#navigation_tophat_primary>li.nav4>ul.nav>li.nav8',
                    atts: { css: {"display":"none"}, disabled: true }
                },
                video_link:{
                    /*"The Green Guide" link in the Environment subnav will be hidden*/
                    selector: '#navigation_tophat_primary>li.nav9 span a',
                    atts: { href: "http://video.nationalgeographic.co.uk/video/"}
                },
                wild_link1:{
                    selector: "#navigation_tophat_primary>li.nav3>ul.nav>li.nav5",
                    atts: { css: {"display":"none"}, disabled: true }
                },
                wild_link2:{
                    selector: "#navigation_tophat_primary>li.nav3>ul.nav>li.nav6",
                    atts: { css: {"display":"none"}, disabled: true }
                },
                wild_link3:{
                    selector: "#navigation_tophat_primary>li.nav3>ul.nav>li.nav7",
                    atts: { css: {"display":"none"}, disabled: true }
                },
                movies_link:{
                    selector: "#navigation_tophat_primary>li.nav1>ul.nav>li.nav9",
                    atts: { css: {"display":"none"}, disabled: true }
                }
            }/* optional callback function *//*,
            function() {}*/
            );
        }
    }
};

/* set up a 'core' object/class with some basic methods so other objects/classes can efficiently use common methods */
var _ngs_proto = {
    defaults: {},
    setOption: function(opt,val) {
        if(typeof(this[opt])=="undefined") {
            this.defaults[opt]=val;
        }
        return this[opt]=val;
    },
    getOption: function(v) {
        return ((typeof(this[v])!="undefined")?this[v]:((typeof(this.opts[v])!="undefined")?this.opts[v]:this.defaults[v]));
    },
    parseOptions: function(opts) {
        var opts = ((opts)?opts:((typeof(this.defaults)!="undefined")?this.defaults:{}));
        for(var d in this.defaults) {
            this[d] = this.getOption(d);
        }
        for(var v in opts) {
            this[v] = this.getOption(v);
        }
        return this;
    },
    convertLinkToAbsolute: function(options) {
        var default_link_selector = '#navigation_mainB ul.nav > li a';
        var options = ((typeof(options)!="undefined"&&options)?options:{});
        var baseURL = ((typeof(options.baseURL)!="undefined")?options.baseURL:'http://www.nationalgeographic.com');
        // ensure the baseURL is an absoluteURL, with protocol
        var baseProtocol = ((typeof(location)!="undefined"&&typeof(location.protocol)!="undefined")?((/(^[a-z]+\:)(\/\/){0,1}$/i.test(location.protocol+''))?location.protocol:''):'');
        baseProtocol+=((RegExp.$2!="")?RegExp.$2:((baseProtocol!="")?"//":""));
        baseURL = ((/^[a-z]+\:(\/\/){0,1}/i.test(baseURL))?baseURL:baseProtocol+baseURL);
        var container = ((typeof(options.container)!="undefined")?options.container:this.container);
        var link_selector = ((typeof(options.link_selector)!="undefined")?options.link_selector:default_link_selector);
        jQuery(container).find(link_selector).each(function() {
            var cur_a = this;
            if((/^\/([^#]+|$)/.test(jQuery(cur_a).attr('href')))) {
                jQuery(cur_a).attr('href',baseURL+jQuery(cur_a).attr('href'));
            }
        });
        return this;
    },
    runCallback: function(callback,delay) {
        if(typeof(callback)=="function") {
            if(delay&&delay>0) {
                if(typeof(this.callback_tmr)!="undefined"&&this.callback_tmr>0) { clearTimeout(this.callback_tmr); };
                this.callback_tmr = setTimeout(callback,delay);
            } else {
                callback();
            }
        }
        return this;
    },
    setAttributes: function(queue,callback) {
        if(!queue) return false;
        var callback = ((typeof(callback)=="function")?callback:null);
        var ob = this;
        this.runCallback = ((typeof(this.runCallback)!="function")?_ngs_proto.runCallback:this.runCallback);
        this.disabled_flyouts = {};
        for(var itm in queue) {
            if((/^.+_flyout$/i.test(itm)) && (typeof(queue[itm].atts.disabled)!="undefined") && (queue[itm].atts.disabled)) {
                ob.disabled_flyouts[itm.replace(/^(.+)_flyout$/i,"$1")] = queue[itm].selector;
            }
            for(var att in queue[itm].atts) {
                if(att=="href"&&(queue[itm].atts[att]==-1)) {
                    jQuery(queue[itm].selector).each(function() {
                        if(/li/i.test(jQuery(this).attr('tagName'))) {
                            jQuery(this).remove();
                        } else {
                            jQuery(this).parents('li').remove();
                        }
                    });
                } else if(att=="css") {
                    jQuery(queue[itm].selector).css(queue[itm].atts[att]);
                } else if(att=="html") {
                    jQuery(queue[itm].selector).html(queue[itm].atts[att]);
                } else {
                    jQuery(queue[itm].selector).attr(att,queue[itm].atts[att]);
                }
            }
        }
        if(callback) { this.runCallback(callback,111); };
        return this;
    }
};
/* set up the internationalization object, used by international pages/navigation
-------------------------------------------------------------------------*/
var ngs_country_codes = {
    standard:"iso-3166",
    activate: function(activeCountries) {
        if(activeCountries==null) {
            return;
        }
        var ac_re = new RegExp("^\\s*"+activeCountries.join("\\s*$|^\\s*")+"\\s*$","i");
        var ac = {};
        for(var ccode in this) {
            if(typeof(this[ccode].country)!="undefined") {
                if(ac_re.test(this[ccode].country)) {
                    ac[ccode] = {country:this[ccode].country,active:1};
                }
            }
        }
        return ac;
    },
    getCodeByName: function(name) {
        var cn_re = new RegExp("^\\s*"+name+"\\s*$","i");
        for(var ccode in this) {
            if(typeof(this[ccode].country)!="undefined") {
                if(cn_re.test(this[ccode].country)) {
                    return ccode;
                }
            }
        }
    },
    "AC":{country:"Ascension Island",active:-1}, "AD":{country:"Andorra",active:-1}, "AE":{country:"United Arab Emirates",active:-1}, "AF":{country:"Afghanistan",active:-1}, "AG":{country:"Antigua and Barbuda",active:-1}, "AI":{country:"Anguilla",active:-1}, "AL":{country:"Albania",active:-1}, "AM":{country:"Armenia",active:-1}, "AN":{country:"Netherlands Antilles",active:-1}, "AO":{country:"Angola",active:-1}, "AQ":{country:"Antarctica",active:-1}, "AR":{country:"Argentina",active:-1}, "AS":{country:"American Samoa",active:-1}, "AT":{country:"Austria",active:-1}, "AU":{country:"Australia",active:-1}, "AW":{country:"Aruba",active:-1}, "AX":{country:"Aland Islands",active:-1}, "AZ":{country:"Azerbaijan",active:-1},
    "BA":{country:"Bosnia and Herzegovina",active:-1}, "BB":{country:"Barbados",active:-1}, "BD":{country:"Bangladesh",active:-1}, "BE":{country:"Belgium",active:-1}, "BF":{country:"Burkina Faso",active:-1}, "BG":{country:"Bulgaria",active:-1}, "BH":{country:"Bahrain",active:-1}, "BI":{country:"Burundi",active:-1}, "BJ":{country:"Benin",active:-1}, "BM":{country:"Bermuda",active:-1}, "BN":{country:"Brunei Darussalam",active:-1}, "BO":{country:"Bolivia",active:-1}, "BR":{country:"Brazil",active:-1}, "BS":{country:"Bahamas",active:-1}, "BT":{country:"Bhutan",active:-1}, "BV":{country:"Bouvet Island",active:-1}, "BW":{country:"Botswana",active:-1}, "BY":{country:"Belarus",active:-1}, "BZ":{country:"Belize",active:-1},
    "CA":{country:"Canada",active:-1}, "CC":{country:"Cocos (Keeling) Islands",active:-1}, "CD":{country:"Congo, Democratic Republic",active:-1}, "CF":{country:"Central African Republic",active:-1}, "CG":{country:"Congo",active:-1}, "CH":{country:"Switzerland",active:-1}, "CI":{country:"Cote D'Ivoire (Ivory Coast)",active:-1}, "CK":{country:"Cook Islands",active:-1}, "CL":{country:"Chile",active:-1}, "CM":{country:"Cameroon",active:-1}, "CN":{country:"China",active:-1}, "CO":{country:"Colombia",active:-1}, "CR":{country:"Costa Rica",active:-1}, "CS":{country:"Czechoslovakia (former)",active:-1}, "CU":{country:"Cuba",active:-1}, "CV":{country:"Cape Verde",active:-1}, "CX":{country:"Christmas Island",active:-1}, "CY":{country:"Cyprus",active:-1}, "CZ":{country:"Czech Republic",active:-1},
    "DE":{country:"Germany",active:-1}, "DJ":{country:"Djibouti",active:-1}, "DK":{country:"Denmark",active:-1}, "DM":{country:"Dominica",active:-1}, "DO":{country:"Dominican Republic",active:-1}, "DZ":{country:"Algeria",active:-1},
    "EC":{country:"Ecuador",active:-1}, "EE":{country:"Estonia",active:-1}, "EG":{country:"Egypt",active:-1}, "EH":{country:"Western Sahara",active:-1}, "ER":{country:"Eritrea",active:-1}, "ES":{country:"Spain",active:-1}, "ET":{country:"Ethiopia",active:-1},
    "FI":{country:"Finland",active:-1}, "FJ":{country:"Fiji",active:-1}, "FK":{country:"Falkland Islands (Malvinas)",active:-1}, "FM":{country:"Micronesia",active:-1}, "FO":{country:"Faroe Islands",active:-1}, "FR":{country:"France",active:-1}, "FX":{country:"France, Metropolitan",active:-1},
    "GA":{country:"Gabon",active:-1}, "GB":{country:"Great Britain (UK)",active:-1}, "GD":{country:"Grenada",active:-1}, "GE":{country:"Georgia",active:-1}, "GF":{country:"French Guiana",active:-1}, "GG":{country:"Guernsey",active:-1}, "GH":{country:"Ghana",active:-1}, "GI":{country:"Gibraltar",active:-1}, "GL":{country:"Greenland",active:-1}, "GM":{country:"Gambia",active:-1}, "GN":{country:"Guinea",active:-1}, "GP":{country:"Guadeloupe",active:-1}, "GQ":{country:"Equatorial Guinea",active:-1}, "GR":{country:"Greece",active:-1}, "GS":{country:"S. Georgia and S. Sandwich Isls.",active:-1}, "GT":{country:"Guatemala",active:-1}, "GU":{country:"Guam",active:-1}, "GW":{country:"Guinea-Bissau",active:-1}, "GY":{country:"Guyana",active:-1},
    "HK":{country:"Hong Kong",active:-1}, "HM":{country:"Heard and McDonald Islands",active:-1}, "HN":{country:"Honduras",active:-1}, "HR":{country:"Croatia (Hrvatska)",active:-1}, "HT":{country:"Haiti",active:-1}, "HU":{country:"Hungary",active:-1},
    "ID":{country:"Indonesia",active:-1}, "IE":{country:"Ireland",active:-1}, "IL":{country:"Israel",active:-1}, "IM":{country:"Isle of Man",active:-1}, "IN":{country:"India",active:-1}, "IO":{country:"British Indian Ocean Territory",active:-1}, "IQ":{country:"Iraq",active:-1}, "IR":{country:"Iran",active:-1}, "IS":{country:"Iceland",active:-1}, "IT":{country:"Italy",active:-1},
    "JE":{country:"Jersey",active:-1}, "JM":{country:"Jamaica",active:-1}, "JO":{country:"Jordan",active:-1}, "JP":{country:"Japan",active:-1},
    "KE":{country:"Kenya",active:-1}, "KG":{country:"Kyrgyzstan",active:-1}, "KH":{country:"Cambodia",active:-1}, "KI":{country:"Kiribati",active:-1}, "KM":{country:"Comoros",active:-1}, "KN":{country:"Saint Kitts and Nevis",active:-1}, "KP":{country:"Korea (North)",active:-1}, "KR":{country:"Korea (South)",active:-1}, "KW":{country:"Kuwait",active:-1}, "KY":{country:"Cayman Islands",active:-1}, "KZ":{country:"Kazakhstan",active:-1},
    "LA":{country:"Laos",active:-1}, "LB":{country:"Lebanon",active:-1}, "LC":{country:"Saint Lucia",active:-1}, "LI":{country:"Liechtenstein",active:-1}, "LK":{country:"Sri Lanka",active:-1}, "LR":{country:"Liberia",active:-1}, "LS":{country:"Lesotho",active:-1}, "LT":{country:"Lithuania",active:-1}, "LU":{country:"Luxembourg",active:-1}, "LV":{country:"Latvia",active:-1}, "LY":{country:"Libya",active:-1},
    "MA":{country:"Morocco",active:-1}, "MC":{country:"Monaco",active:-1}, "MD":{country:"Moldova",active:-1}, "ME":{country:"Montenegro",active:-1}, "MG":{country:"Madagascar",active:-1}, "MH":{country:"Marshall Islands",active:-1}, "MK":{country:"F.Y.R.O.M. (Macedonia)",active:-1}, "ML":{country:"Mali",active:-1}, "MM":{country:"Myanmar",active:-1}, "MN":{country:"Mongolia",active:-1}, "MO":{country:"Macau",active:-1}, "MP":{country:"Northern Mariana Islands",active:-1}, "MQ":{country:"Martinique",active:-1}, "MR":{country:"Mauritania",active:-1}, "MS":{country:"Montserrat",active:-1}, "MT":{country:"Malta",active:-1}, "MU":{country:"Mauritius",active:-1}, "MV":{country:"Maldives",active:-1}, "MW":{country:"Malawi",active:-1}, "MX":{country:"Mexico",active:-1}, "MY":{country:"Malaysia",active:-1}, "MZ":{country:"Mozambique",active:-1},
    "NA":{country:"Namibia",active:-1}, "NC":{country:"New Caledonia",active:-1}, "NE":{country:"Niger",active:-1}, "NF":{country:"Norfolk Island",active:-1}, "NG":{country:"Nigeria",active:-1}, "NI":{country:"Nicaragua",active:-1}, "NL":{country:"Netherlands",active:-1}, "NO":{country:"Norway",active:-1}, "NP":{country:"Nepal",active:-1}, "NR":{country:"Nauru",active:-1}, "NT":{country:"Neutral Zone",active:-1}, "NU":{country:"Niue",active:-1}, "NZ":{country:"New Zealand (Aotearoa)",active:-1},
    "OM":{country:"Oman",active:-1},
    "PA":{country:"Panama",active:-1}, "PE":{country:"Peru",active:-1}, "PF":{country:"French Polynesia",active:-1}, "PG":{country:"Papua New Guinea",active:-1}, "PH":{country:"Philippines",active:-1}, "PK":{country:"Pakistan",active:-1}, "PL":{country:"Poland",active:-1}, "PM":{country:"St. Pierre and Miquelon",active:-1}, "PN":{country:"Pitcairn",active:-1}, "PR":{country:"Puerto Rico",active:-1}, "PS":{country:"Palestinian Territory, Occupied",active:-1}, "PT":{country:"Portugal",active:-1}, "PW":{country:"Palau",active:-1}, "PY":{country:"Paraguay",active:-1},
    "QA":{country:"Qatar",active:-1},
    "RE":{country:"Reunion",active:-1}, "RO":{country:"Romania",active:-1}, "RS":{country:"Serbia",active:-1}, "RU":{country:"Russian Federation",active:-1}, "RW":{country:"Rwanda",active:-1},
    "SA":{country:"Saudi Arabia",active:-1}, "SB":{country:"Solomon Islands",active:-1}, "SC":{country:"Seychelles",active:-1}, "SD":{country:"Sudan",active:-1}, "SE":{country:"Sweden",active:-1}, "SG":{country:"Singapore",active:-1}, "SH":{country:"St. Helena",active:-1}, "SI":{country:"Slovenia",active:-1}, "SJ":{country:"Svalbard & Jan Mayen Islands",active:-1}, "SK":{country:"Slovak Republic",active:-1}, "SL":{country:"Sierra Leone",active:-1}, "SM":{country:"San Marino",active:-1}, "SN":{country:"Senegal",active:-1}, "SO":{country:"Somalia",active:-1}, "SR":{country:"Suriname",active:-1}, "ST":{country:"Sao Tome and Principe",active:-1}, "SU":{country:"USSR (former)",active:-1}, "SV":{country:"El Salvador",active:-1}, "SY":{country:"Syria",active:-1}, "SZ":{country:"Swaziland",active:-1},
    "TC":{country:"Turks and Caicos Islands",active:-1}, "TD":{country:"Chad",active:-1}, "TF":{country:"French Southern Territories",active:-1}, "TG":{country:"Togo",active:-1}, "TH":{country:"Thailand",active:-1}, "TJ":{country:"Tajikistan",active:-1}, "TK":{country:"Tokelau",active:-1}, "TM":{country:"Turkmenistan",active:-1}, "TN":{country:"Tunisia",active:-1}, "TO":{country:"Tonga",active:-1}, "TP":{country:"East Timor",active:-1}, "TR":{country:"Turkey",active:-1}, "TT":{country:"Trinidad and Tobago",active:-1}, "TV":{country:"Tuvalu",active:-1}, "TW":{country:"Taiwan",active:-1}, "TZ":{country:"Tanzania",active:-1},
    "UA":{country:"Ukraine",active:-1}, "UG":{country:"Uganda",active:-1}, "UK":{country:"United Kingdom",active:-1}, "UM":{country:"US Minor Outlying Islands",active:-1}, "US":{country:"United States",active:-1}, "UY":{country:"Uruguay",active:-1}, "UZ":{country:"Uzbekistan",active:-1},
    "VA":{country:"Vatican City State (Holy See)",active:-1}, "VC":{country:"Saint Vincent & the Grenadines",active:-1}, "VE":{country:"Venezuela",active:-1}, "VG":{country:"British Virgin Islands",active:-1}, "VI":{country:"Virgin Islands (U.S.)",active:-1}, "VN":{country:"Viet Nam",active:-1}, "VU":{country:"Vanuatu",active:-1},
    "WF":{country:"Wallis and Futuna Islands",active:-1}, "WS":{country:"Samoa",active:-1},
    "YE":{country:"Yemen",active:-1}, "YT":{country:"Mayotte",active:-1}, "YU":{country:"Yugoslavia (former)",active:-1},
    "ZA":{country:"South Africa",active:-1}, "ZM":{country:"Zambia",active:-1}, /* "ZR":{country:"Zaire",active:-1}, // - See: "CD" - Congo, Democratic Republic */ "ZW":{country:"Zimbabwe",active:-1}
};
var internationalization = function(opts) {

    var o = this;
    o.opts = ((opts)?opts:{});
    o.setOption = _ngs_proto.setOption;
    o.getOption = _ngs_proto.getOption;
    o.parseOptions = _ngs_proto.parseOptions;
    o.defaults = {
        default_country: ngs_intl_settings.default_country,
        country_codes: ngs_country_codes.activate( [ngs_intl_settings.default_country].concat(ngs_intl_settings.active_countries) )
    };
    for(var ccode in ngs_intl_settings) {
        if(ccode!="active_countries") {
            o[ccode]=ngs_intl_settings[ccode];
        }
    }
    o.ccode = function() {
        var host = ((window.location && window.location.host && window.location.host!="")?(window.location.host+'').toLowerCase():null);
        var test_ccode = ( (window.location && window.location.search && ( (window.location.search+'').match(/intl_test=([a-z]{2})\b/i) ) )?RegExp.$1:null);
        var acc = ((test_ccode)?test_ccode:ngs_country_codes.getCodeByName(o.default_country));
        if(!host) {
            return acc;
        }
        for(var cc in o.country_codes) {
            var re = new RegExp('\\.'+cc+'$','i');
            if(re.test(host)) { acc = cc; break; }
        }

        return acc;
    }
    o.init = function(opts) {
        o.parseOptions((opts)?opts:((typeof(o.defaults)!="undefined")?o.defaults:{}));
        o.country_code = o.ccode();
        o.is_intl = ((o.country_code && /us/i.test(o.country_code) == null)) ? true : false;
        o.country = ((o.country_code&&o.is_intl&&typeof(o.country_codes[(o.country_code+"").toUpperCase()])!="undefined")?o.country_codes[(o.country_code+"").toUpperCase()].country:null);
        if(typeof(o[(o.country_code+'').toLowerCase()])!="undefined"&&typeof(o[(o.country_code+'').toLowerCase()].init)=="function") {
            o[(o.country_code+'').toLowerCase()].init();
        }
        return o;
    }
    o.init();
};

/* create the 'ngsTophat' object/JS class
 ------------------------------------------------------------------------*/
ngsTophat = function(opts) {
    var o = this;
    o.opts = ((opts)?opts:{});
    o.setOption = _ngs_proto.setOption;
    o.getOption = _ngs_proto.getOption;
    o.parseOptions = _ngs_proto.parseOptions;
    o.defaults = {
        state: 'initializing',
        is_extended_setup: true,
        link_selector: '#navigation_mainB ul.nav > li a, #mission_learn_link a',
        callback: ((o.opts && o.opts.callback)?o.opts.callback:null),
        container: ((o.opts && o.opts.container)?o.opts.container:((jQuery('#navigation_tophat_container').length>0)?jQuery('#navigation_tophat_container').get(0):null))
    };
    o.is_external = function() {
        return ( (typeof(is_wpf)!="undefined"&&!is_wpf&&is_non_wpf)?true:( ( (typeof(navFlyouts)=="undefined" || (typeof(navFlyouts)!="undefined" && typeof(navFlyouts.template_dir)=="undefined") ) || (/\/wpf\-includes\//i.test(navFlyouts.template_dir)) )?true:false ) );
    };
    o.intl = function() { try{ return new internationalization(); } catch(e) { }; return {default_country:ngs_intl_settings.default_country,country:ngs_intl_settings.default_country,country_code:ngs_country_codes.getCodeByName(ngs_intl_settings.default_country)}; };
    o.convertToAbsolute = _ngs_proto.convertLinkToAbsolute;
    o.init = function(opts) {
        o.parseOptions((opts)?opts:((typeof(o.defaults)!="undefined")?o.defaults:{}));
        if(typeof(o.callback)=="function") {
            o.callback();
        }
        if(o.is_extended_setup) {

            o.intl_settings = o.intl();
            if(o.is_external()===true) {
                o.convertToAbsolute({link_selector:o.link_selector});
            }
        }
        o.setOption('state','initialized');
        return o;
    };
    o.init();
}
var ngs_tophat_init = function() {
    if(jQuery('#navigation_tophat_container').length>0) {
        ngs_tophat = new ngsTophat();
        if( typeof(ngs_tophat_tmr) != "undefined" ) {
            clearTimeout(ngs_tophat_tmr);
        }
    } else {
        if(typeof(is_populateNavFlyouts)=="undefined"){
            ngs_tophat_tmr = setTimeout(ngs_tophat_init,3333);
        }
    }
};
ngs_tophat_init();

/* create the 'ngsFooter' object/JS class
 ------------------------------------------------------------------------*/
ngsFooter = function(opts) {
    var o = this;
    o.opts = ((opts)?opts:{});
    o.setOption = _ngs_proto.setOption;
    o.getOption = _ngs_proto.getOption;
    o.parseOptions = _ngs_proto.parseOptions;
    o.defaults = {
        state: 'initializing',
        is_extended_setup: true,
        link_selector: '#footer_global ul.nav > li a',
        callback: ((o.opts && o.opts.callback)?o.opts.callback:null),
        container: ((o.opts && o.opts.container)?o.opts.container:((jQuery('#footer_global').length>0)?jQuery('#footer_global').get(0):null))
    };
    o.is_external = function() {
        return ( (typeof(is_wpf)!="undefined"&&!is_wpf&&is_non_wpf)?true:( ( (typeof(navFlyouts)=="undefined" || (typeof(navFlyouts)!="undefined" && typeof(navFlyouts.template_dir)=="undefined") ) || (/\/wpf\-includes\//i.test(navFlyouts.template_dir)) )?true:false ) );
    };
    o.intl = function() { try{ return new internationalization(); } catch(e) { }; return {default_country:ngs_intl_settings.default_country,country:ngs_intl_settings.default_country,country_code:ngs_country_codes.getCodeByName(ngs_intl_settings.default_country)}; };
    o.convertToAbsolute = _ngs_proto.convertLinkToAbsolute;
    o.init = function(opts) {
        o.parseOptions((opts)?opts:((typeof(o.defaults)!="undefined")?o.defaults:{}));
        if(typeof(o.callback)=="function") {
            o.callback();
        }
        if(o.is_extended_setup) {
            o.intl_settings = o.intl();
            if(o.is_external()===true) {
                o.convertToAbsolute({link_selector:o.link_selector});
            }
        }
        o.setOption('state','initialized');
        return o;
    };
    o.init();
}
var ngs_footer_init = function() {
    if(jQuery('#navigation_footer_container').length>0) {
        ngs_footer = new ngsFooter();
        if( typeof(ngs_footer_tmr) != "undefined" ) {
            clearTimeout(ngs_footer_tmr);
        }
    } else {
        if(typeof(is_populateNavFlyouts)=="undefined"){
            ngs_footer_tmr = setTimeout(ngs_footer_init,3333);
        }
    }
};
ngs_footer_init();

/* run javascript that's waiting for the document to complete loading
 -----------------------------------------------------------------------*/
jQuery(document).ready(function($) {

    /*--------------------------------------------------------------------
     * JQuery Plugin: "EqualHeights" & "EqualWidths"
     * by:  Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
     *
     * Copyright (c) 2007 Filament Group
     * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
     * Version: 2.0, 07.24.2008
     * Changelog:
     *  08.02.2007 initial Version 1.0
     *  07.24.2008 v 2.0 - added support for widths
    --------------------------------------------------------------------*/
   if(typeof(jQuery.fn.equalHeights)=="undefined") {(function($){$.fn.equalHeights = function(px) { $(this).each(function(){ var currentTallest = 0; $(this).children('div').each(function(i){ if ($(this).height() > currentTallest) { currentTallest = $(this).height(); } }); if ($.browser.msie && $.browser.version == 6.0) { $(this).children('div').css({'height': currentTallest}); } $(this).children('div').css({'min-height': currentTallest}); }); return this;};})(jQuery);};

    /**
    * hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
    * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
    *
    * @param  f  onMouseOver function || An object with configuration options
    * @param  g  onMouseOut function  || Nothing (use configuration options object)
    * @author    Brian Cherne <brian@cherne.net>
    --------------------------------------------------------------------*/
    if(typeof(jQuery.fn.hoverIntent)=="undefined") {(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);};

    /**
     * jQuery.labelify - Display in-textbox hints
     * Stuart Langridge, http://www.kryogenix.org/
     * Released into the public domain
     * Date: 25th June 2008
     * @author Stuart Langridge
     * @version 1.3
    --------------------------------------------------------------------*/
    if(typeof(jQuery.fn.labelify)=="undefined") { (function($){$.fn.labelify=function(settings){settings=$.extend({text:"title",labelledClass:""},settings);var lookups={title:function(input){return $(input).attr("title")},label:function(input){return $("label[for="+input.id+"]").text()}};var lookup;var $_labellified_elements=$(this);return $(this).each(function(){if(typeof settings.text==="string"){lookup=lookups[settings.text]}else{lookup=settings.text};if(typeof lookup!=="function"){return}var lookupval=lookup(this);if(!lookupval){return}$(this).data("label",lookup(this).replace(/\n/g,''));$(this).focus(function(){if(this.value===$(this).data("label")){this.value=this.defaultValue;$(this).removeClass(settings.labelledClass)}}).blur(function(){if(this.value===this.defaultValue){this.value=$(this).data("label");$(this).addClass(settings.labelledClass)}});var removeValuesOnExit=function(){$_labellified_elements.each(function(){if(this.value===$(this).data("label")){this.value=this.defaultValue;$(this).removeClass(settings.labelledClass)}})};$(this).parents("form").submit(removeValuesOnExit);$(window).unload(removeValuesOnExit);if(this.value!==this.defaultValue){return}this.value=$(this).data("label");$(this).addClass(settings.labelledClass)});};})(jQuery);};

    /* set up the 'js enabled' class for the navigation tophat
     * and add 'Search' to the tophat search form's keyword field (labelify it)
    --------------------------------------------------------------------*/
    jQuery('#navigation_tophat_primary').addClass('js');

    if (($('#header_search_input').val() == '')){
        $('#header_search_input').labelify({ text: function(input) { return "Search"; } });
    }
//  jQuery('#header_search_input').labelify({ text: function(input) { return "Search"; } });

    /* -------------------------------------------------------------------- */

    /* set up the hover settings for the tophat navigation
    --------------------------------------------------------------------*/
    jQuery('#navigation_tophat_primary > li').hoverIntent({
         sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
         interval: 100, // number = milliseconds for onMouseOver polling interval
         over: function(){
            jQuery(this).addClass("hover", 500);
            jQuery(this).find('span a').addClass("hover");
            if(typeof(ngs_nav_flyouts) != "undefined" && (is_wpf || is_non_wpf) && jQuery(this).find('div.sneak_peek').length < 1) {
                var nv_lbl = jQuery.trim( (jQuery(this).find('span:first-child a:first-child').text() + '').toLowerCase() );
                ngs_nav_flyouts.loadNavFlyout(nv_lbl);
            }
        }, // function = onMouseOver callback (REQUIRED)
         timeout: 0, // number = milliseconds delay before onMouseOut
         out: function(){
            jQuery(this).removeClass("hover");
            jQuery(this).find('span a').removeClass("hover");
        } // function = onMouseOut callback (REQUIRED)
    });
    // to manage clicks for the custom radio buttons cross browser a little better
    $('#header_search_video .search-context input').live('change', function (e) {
        var $target = $(e.target),
            $targetLabel = $target.parent();
        if ($target.is(':checked')) {
            $targetLabel.siblings().removeClass('selected');
            $targetLabel.addClass('selected');
        }
    });

    /* -------------------------------------------------------------------- */

    /* populate the 'Sneak Preview' flyouts for the tophat navigation
    --------------------------------------------------------------------*/
    ngs_addQueryParams = function(opts) {
        var opts = ((opts)?opts:{});
        var params = ((typeof(opts.params)!="undefined")?opts.params:false);
        var hrefs = ((typeof(opts.hrefs)!="undefined")?opts.hrefs:false);
        var is_useIndex = ((typeof(opts.is_useIndex)!="undefined")?opts.is_useIndex:false);
        var last_known_link = false;
        var ndx = 0;
        if(!params || !hrefs) {
            return;
        }
        jQuery(hrefs).each(function() {
            var a = this;
            var a_href = jQuery(a).attr('href');
            var is_js = /^ *javascript *:/i.test(a_href);
            var is_videoPlayer = false;
            var prepend = "";
            var append = "";
            // handle video player links
            if(/^( *javascript: *videoPlayer\( *[\'\"])([^\'\"\)]+)([\'\"] *\).*)/i.test(a_href)) {
                is_videoPlayer = true;
                var prepend = RegExp.$1;
                a_href = RegExp.$2;
                var append = RegExp.$3;
            }
            if(!is_js || is_videoPlayer) {
                var base = ((/^ *([^#\?]+)/.test(a_href))?RegExp.$1:"");
                var hash = ((/(#.+)$/.test(a_href))?RegExp.$1:"");
                var query = ((/(\?[^#]+)/.test(a_href))?RegExp.$1:"");
                // process thumbnails and headlines linked to the same URL as a single increment when 'is_useIndex'
                ndx++;
                if(a_href==last_known_link) { ndx--; }
                // add all the supplied query string parameters
                for(var p in params) {
                    if(!(/source=/i.test(query))) {
                        query+= ((query.length<1)?"?":"&")+encodeURIComponent(p) + "=" + encodeURIComponent(params[p]) + ((is_useIndex)?(""+ndx):"");
                    }
                }
                last_known_link = a_href;
                jQuery(a).attr({'href':prepend+base+query+hash+append});
            }
        })
        return;
    }
    var ngs_flyoutTracking = {
        home: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"fohomeleft"},
                feature:{source:"fohomefeat"},
                sidecar:{source:"fohomesc"},
                right:{source:"fohomeright"}
            }
        },
        photography: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"fophotoleft"},
                feature:{source:"fophotofeat"},
                sidecar:{source:"fophotosc"},
                right:{source:"fophotoright"}
            }
        },
        animals: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"foanimalsleft"},
                feature:{source:"foanimalsfeat"},
                sidecar:{source:"foanimalssc"},
                right:{source:"foanimalsright"}
            }
        },
        environment: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"foenvleft"},
                feature:{source:"foenvfeat"},
                sidecar:{source:"foenvsc"},
                right:{source:"foenvright"}
            }
        },
        travel: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"fotravelleft"},
                feature:{source:"fotravelfeat"},
                sidecar:{source:"fotravelsc"},
                right:{source:"fotravelright"}
            }
        },
        adventure: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"foadvleft"},
                feature:{source:"foadvfeat"},
                sidecar:{source:"foadvsc"},
                right:{source:"foadvright"}
            }
        },
        natgeotv: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"fongcleft"},
                feature:{source:"fongcfeat"},
                sidecar:{source:"fongcsc"},
                right:{source:"fongcright"}
            }
        },
        kids: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"fokidsleft"},
                feature:{source:"fokidsfeat"},
                sidecar:{source:"fokidssc"},
                right:{source:"fokidsright"}
            }
        },
        shop: {
            selectors:
            {
                left: '.promo_collection.layout_a:first a',
                feature: '.promo_collection.layout_b:first > .promo a',
                sidecar: '.promo_collection.layout_b:first > .sidecar a',
                right: '.promo_collection.last_collection a'
            },
            params:
            {
                left:{source:"foshopleft"},
                feature:{source:"foshopfeat"},
                sidecar:{source:"foshopsc"},
                right:{source:"foshopright"}
            }
        }
    };
    var is_populateNavFlyouts = !!(location.hostname.match(/.com$/) && !location.search.match(/intl\=/) && !location.pathname.match(/\/video\//));
    var ngs_flyouts = function() {
        var o = this;
        o.load_queue = [];
        o.nav_set = [];
        o.loadNext = function(opts) {
            var o = this;
            var is_load_by_label = (opts && (opts!==-1) );
            if(is_load_by_label) { o.load_queue.push(opts); };
            if( ( o.load_queue.length > 0 ) && (is_wpf || is_non_wpf) ) {
                var opts = o.load_queue.pop();
                var stage = opts.stage;
                var nav_text = opts.nav_text;
                var load_sel = opts.load_sel;
                var nav_item = opts.nav_item;
                jQuery(stage).load(load_sel,function(){
                    if(jQuery(stage).children('div.sneak_peek').length>0) {
                        var src_html = jQuery(stage).children('div.sneak_peek').html();
                        if(src_html != "") {
                            var nav_sneak_peek = jQuery(nav_item).children('div.sneak_peek');
                            if(nav_sneak_peek.length<1) {
                                jQuery(nav_item).append('<div class="sneak_peek"></div>');
                                var nav_sneak_peek = jQuery(nav_item).children('div.sneak_peek');
                            }
                            jQuery(nav_sneak_peek).html(src_html);
                            jQuery(stage).empty();
                            jQuery(nav_sneak_peek).equalHeights(true);
                            if((typeof(ngs_flyoutTracking[nav_text])!="undefined")&&(typeof(ngs_flyoutTracking[nav_text].selectors)!="undefined")&&(typeof(ngs_flyoutTracking[nav_text].params)!="undefined")) {
                                for(var sel in ngs_flyoutTracking[nav_text].selectors) {
                                    ngs_addQueryParams({hrefs:jQuery(nav_sneak_peek).find(ngs_flyoutTracking[nav_text].selectors[sel]),params:ngs_flyoutTracking[nav_text].params[sel],is_useIndex:true});
                                }
                            }
                            jQuery(nav_sneak_peek).find('a').each(function(){
                                if(is_non_wpf) {
                                    var cur_a = this;
                                    var rr_match = ((jQuery.browser.msie) ? '^((http|https|ftp):\/\/'+document.domain+'\/|\/)' : '^\/');
                                    var re_rr = new RegExp(rr_match,'gi');
                                    if(re_rr.test(jQuery(cur_a).attr('href'))) {
                                        jQuery(cur_a).attr('href','http://www.nationalgeographic.com'+((jQuery.browser.msie)?jQuery(cur_a).attr('href').replace(re_rr,'/'):jQuery(cur_a).attr('href')));
                                    }
                                }
                            })
                        }
                    }
                    if(!is_load_by_label) { return o.loadNext(); };
                })
            }
            return o;
        };
        o.loadNavFlyout = function(label) {
            if(label) {
                this.queueNavFlyout(label);
                jQuery(o.nav_set).filter(function(lx) {
                    var nv = this;
                    var fly = (nv.nav_text != "undefined" && new RegExp('^'+label+'$','i').test(nv.nav_text) ) ? nv : -1;
                    if(fly!==-1) {
                        o.load_queue.push(fly);
                        return o.loadNext( fly );
                    } else {
                        return false;
                    }
                });
            }
        };
        o.queueNavFlyout = function(label) {
            jQuery(o.load_queue).filter(function(lx) {
                var nv = this;
                var fly = (nv.nav_text != "undefined" && new RegExp('^'+label+'$','i').test(nv.nav_text) ) ? nv : -1;
                if(fly!==-1) {
                    o.load_queue.splice(lx,1);
                } else {
                    return false;
                }
            });
        };
        o.init = function() {
            o.load_queue.reverse();
            o.state = 'initialized';
            o.loadNext();
        };
        o.state = 'starting';
        return o;
    }

    var getFlyout = function(){
        var $this = $(this),
            nav_li = $this.parent().parent();
            //nav_li = $this.parentsUntil('ul','li'), //Breaks on NGM
            nav_label = $this.text().toLowerCase(),
            flyout_disabled_for_intl = (typeof(ngs_tophat)!="undefined"&&typeof(ngs_tophat.intl_settings)!="undefined"&&typeof(ngs_tophat.intl_settings.country_code)!="undefined"&&typeof(ngs_tophat.intl_settings[(ngs_tophat.intl_settings.country_code+'').toLowerCase()])!="undefined"&&typeof(ngs_tophat.intl_settings[(ngs_tophat.intl_settings.country_code+'').toLowerCase()].disabled_flyouts[nav_label])!="undefined");
        
        if(!flyout_disabled_for_intl) {
            var req_sel = ngs_nav_flyouts.template_dir +
                            '' +
                            ( (is_non_wpf===true) ? 'nav-flyout-'+nav_label+'.html' : nav_label+'/' ) +
                            ' div.sneak_peek';
            ngs_nav_flyouts.load_queue[ngs_nav_flyouts.indx] = {nav_text:nav_label,stage:sneak_peek_stage,load_sel:req_sel,nav_item:nav_li};
            ngs_nav_flyouts.nav_set[ngs_nav_flyouts.indx] = ngs_nav_flyouts.load_queue[ngs_nav_flyouts.indx];
            ngs_nav_flyouts.indx++;
        }
    } 

    if(is_populateNavFlyouts && (jQuery('ul#navigation_tophat_primary > li').length>0)) {
        if(typeof(ngs_tophat_tmr)!="undefined"){ clearInterval(ngs_tophat_tmr); }
        if(typeof(ngs_tophat)=="undefined") { ngs_tophat = new ngsTophat(); }
        if(typeof(ngs_footer_tmr)!="undefined"){ clearInterval(ngs_footer_tmr); }
        if(typeof(ngs_footer)=="undefined") { ngs_footer = new ngsFooter(); }
        ngs_nav_flyouts = new ngs_flyouts();
        ngs_nav_flyouts.indx = 0;
        ngs_nav_flyouts.template_dir = ((((typeof(navFlyouts)!="undefined") && (typeof(navFlyouts.template_dir)!="undefined") && is_wpf))?navFlyouts.template_dir:((is_wpf)?"/common/nav-flyout/":((is_non_wpf)?"/wpf-includes/":"/common/nav-flyout/")));
        jQuery('body').append('<div id="sneak_peek_stage"></div>');
        var sneak_peek_stage = jQuery('div#sneak_peek_stage');
        // Convert the links on the header search form 'action' and the account 'log in' links
        if(typeof(ngs_tophat)!="undefined"&&typeof(ngs_tophat.intl_settings)!="undefined"&&typeof(ngs_tophat.intl_settings.is_intl)!="undefined"&&!ngs_tophat.intl_settings.is_intl) {
            if((/^\//.test(jQuery('#header_search').attr('action')))) {
                jQuery('#header_search').attr('action','http://www.nationalgeographic.com'+jQuery('#header_search').attr('action'));
            }
            if((/^\//.test(jQuery('#account .action a').attr('href')))) {
                jQuery('#account .action a').attr('href','http://www.nationalgeographic.com'+jQuery('#account .action a').attr('href'));
            }
        }
        
        jQuery('#intl_link_tophat_primary_shop').each(function () {
            getFlyout.apply(this);
        });

        ngs_nav_flyouts.init();
    }
    /* -------------------------------------------------------------------- */


    /* This is a rushed patch to bridge between Vii and WPF until WPF is retired or it's primary navigation is loaded from Vii */

    $.ajax({
        url: 'http://channel.nationalgeographic.com/include/channel_supernav/',
        dataType: "jsonp",
        cache: true,
        jsonpCallback: 'channel_supernav',
        success: function (data, status, jqXHR) {
            $('#intl_link_sub_natgeotv').after(data.html);
        },
        error: function ( jqXHR, textStatus, err ) {
            if (window.console && window.console.error) {
                window.cosole.error( err );
            }
        }
    });
});

