/**  
 * global.js - Mainstreet v3.0 Master JavaScript include
 *
 * @author Mike Lee <michael.lee@thestreet.com>
 * @version 3.0 - June 18, 2009
 *
 * Notes:
 */


// === Init ===
var MS = {};

MS.cfg = {
    staticFileBase: '/sites/all/themes/mainstreet'
}

MS.ads = {
    /**
     * Draws ads onto page. Looks for global config variables.
     * Sizes enforced within function.
     * Requires: ms_adConfig object with props...
     *           site - dart site name
     *           kw - dart keywords (array)
     *           cau - Story type for articles
     *           cauIndex - Cau index page flag
     * Note: iframes ONLY support single size
     *
     * @param adType Type of ad (top|right|cau)
     * @param (optional) forceFrame If true, forces an iframe display
     * @param (optional) adSiteOverride Changes default adsite
     */
    drawAd: function(adType, forceFrame, adSiteOverride) {
                // Defaults, just in case...
                if (typeof ms_adConfig == 'undefined') { 
                    ms_adConfig = { site: "mainstreet", storyid: "", kw: ["Homepage"], cau: "", cauIndex: false }
                }

                var adSite = ms_adConfig.site;
                if (adSiteOverride) { adSite = adSiteOverride; }

                // Generate DoubleClick requests
                var ord = Math.random() * 100000000000000000;
                var kwPath = ms_adConfig.kw.join('/');
                var kwKval = ms_adConfig.kw.join('|');
                var adStyle = 'adj';

                var tile = ''; var size = ''; var iframe = false; var iframeID = ''; var cauXtra = '';
                var cauValue = (typeof ms_adConfig.cau == 'undefined' || ms_adConfig.cau == '' ? 'none' : ms_adConfig.cau);
                switch (adType) {
                    case 'top': tile = 1; size = '728x90'; iframeID = 'iframe_ad728x90t2'; break;
                    case 'cau': tile = 2; size = '233x224'; cauXtra = ';adtype=cau'; iframeID = 'iframe_cau'; break;
                    case 'right': tile = 3; size = '336x280,300x250,336x850'; iframeID = 'iframe_right'; break;
                    case 'rightxtra': tile = 4; size = '336x280,300x250'; iframeID = 'iframe_rightxtra'; break;
                    default:
                }

                if (iframe || forceFrame) { adStyle = 'adi'; }
                var kwCau = (ms_adConfig.cauIndex ? ';index=' : ';storytype=') + cauValue;
                kwCau += cauXtra;

                // Would be nice to insert script object, but with crappy browsers out there, resort to old method
                var scriptSrc = 'http://ad.doubleclick.net/'+ adStyle + '/'+ adSite + '/'+ kwPath + kwCau + ';kval='+ kwKval + ';storyid='+ ms_adConfig.storyid + ';tile='+ tile + ';dcopt=ist;sz='+ size + ';ord=' + ord + ';cmn=ts;';

                if (iframe || forceFrame) {
                    var sSplit = size.split('x');
                    var width = sSplit[0];
                    var height = sSplit[1];
                    var dcRequest = '<iframe id="'+ iframeID + '" width="'+ width + '" height="'+ height + '" scrolling="no" frameborder="no" src="'+ scriptSrc + '"></iframe>';
                } else {
                    var dcRequest = '<script type="text/javascript" src="'+ scriptSrc + '"></scr' + 'ipt>';
                }

                document.write(dcRequest);
            },

    /**
     * Reloads all ads (ads required to be iframes)
     */
    reloadAll: function() {
                   var aFrame = new Array('iframe_ad728x90t2', 'iframe_cau', 'iframe_right');
                   for (var i = 0; i < aFrame.length; i++) {
                       var oFrame = YAHOO.util.Dom.get(aFrame[i]);
                       if (!oFrame) { continue; }

                       var newSrc = oFrame.src;
                       var ord = Math.random() * 100000000000000000;
                       newSrc = newSrc.replace(/ord=[^;]+/, 'ord='+ ord);
                       oFrame.src = newSrc;
                   }
               }
}

MS.ads.cau = {
    cauDiv: 'customAdUnit',     // div id for cau
    sponsorName: '',

    /**
     * Initializes cau.
     * @param sponsorName Sponsor key
     * @param cauID CAU id
     */ 
    init: function(sponsorName, cauID) {
        this.sponsorName = sponsorName;
        this.cauID = cauID;
    },

    /**
     * Initiates cau draw. Currently only supports one cau on a page.
     */
    drawAd: function() {
        callback = { success: this.handleSuccess, failure: this.handleFailure, scope: this }

        // Insert cau css into page
        var head = document.getElementsByTagName('head')[0];
        MS.utils.insertCSS(MS.cfg.staticFileBase + '/css/cau.css', head);
        MS.utils.insertCSS('/cau/css/'+ this.sponsorName, head);

        // Retrieve cau html
        var cauSrc = '/cau/html/'+ this.sponsorName;
        var oConn = YAHOO.util.Connect.asyncRequest('get', cauSrc, callback);

    },

    /**
     * Ajax failure handler.
     * @param o Response object
     */
    handleFailure: function(o) {
        alert('Failed to load CAU source.');
    },

    /**
     * Ajax success handler.
     * @param o Response object
     */
    handleSuccess: function(o) {
        var targetDiv = YAHOO.util.Dom.get(this.cauDiv);
        targetDiv.innerHTML = o.responseText;

        // tracking pixel cache buster, runs once XML content is written to page and if "adImg" is present
        YAHOO.util.Event.onAvailable('adImg', function() {
                var adImg = document.getElementById('adImg');
                if (!adImg) { return; }
                var oldSrc = adImg.src;
                adImg.src = oldSrc + Math.floor(Math.random() * 10000000000);
        });
    },

    /** 
     * Links to sponsor.
     */
    linkToSponsor: function() {
        var urlBase = '/category/custom-ad-units/';

        if (typeof this.indexOverride == 'undefined') { 
            var url = urlBase + this.sponsorName;
        } else {
            var url = this.indexOverride;
        }

        document.location = url;
    }
}

MS.misc = {}

MS.utils = {
    /**
     * Equalizes column heights. Exits on invalid id.
     * @param aIDs Array of ids to compare.
     */
    equalizeColumns: function(aIDs) {
                         var maxHeight = 0;

                         for (var i = 0; i < aIDs.length; i++) {
                             var el = document.getElementById(aIDs[i]);
                             if (!el) { return; }
                             el.style.height = 'auto';
                             if (el.offsetHeight > maxHeight) { maxHeight = el.offsetHeight; }
                         }

                         for (var i = 0; i < aIDs.length; i++) {
                             var el = document.getElementById(aIDs[i]);
                             el.style.height = maxHeight + 'px';
                         }
                     },

/**
 * Toggle form fields between entry mode and base state
 * @param formID (string) Form id
 * @param fieldData (string) {field:[{name: *, defaultField: *}, ...]}   (default is the name of the hidden field)
 */
formToggler: function(formID, fieldData) {
                 for (var i = 0; i < fieldData.field.length; i++) {
                     var oField = fieldData.field[i];
                     var oFormField = '#'+ formID + " input[name='"+ oField.name + "']";
                     var oFormFieldDefault = '#'+ formID + " input[name='"+ oField.defaultField + "']";
                     
                     $(oFormField).focus(function() { MS.utils._formCheck($(this), 'focus', $(oFormFieldDefault)) });
                     $(oFormField).blur(function() { MS.utils._formCheck($(this), 'blur', $(oFormFieldDefault)) });
                 }
             },

/**
 * Simple form validator. Custom error messages can be added by using title attribute.
 * @param formID (string) Form id
 * @param fieldData (string) {field:[{name: *, defaultField: *, valType: *}, ...]}   (defaultField is the name of the hidden default field, also optional)
 *                           valType(email) - otherwise simple empty check
 */
formValidate: function(formID, fieldData) {
                  var errorFlag = false;

                  for (var i = 0; i < fieldData.field.length; i++) {
                      var oField = fieldData.field[i];
                      var oFormField = $('#'+ formID + " input[name='"+ oField.name + "']");
                      var oFormFieldDefault = $('#'+ formID + " input[name='"+ oField.defaultField + "']");
                      var v = $.trim(oFormField.val());

                      var valType = oField.valType ? oField.valType : 'required';

                      if (v == '') { errorFlag = true; }
                      if (valType == 'email') {
                          if (!errorFlag) { errorFlag =  !v.match(/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/); }
                      }

                      if (oFormFieldDefault.length && v == oFormFieldDefault.val()) { errorFlag = true; }

                      // Allow display of custom error
                      if (errorFlag) {
                          var msg = 'Please enter a value first.';
                          if (oFormField.attr('title')) { msg = "An error has occured. Please:\n\n"+ oFormField.attr('title'); }
                          alert(msg);
                          oFormField.focus();
                          return false;
                      }
                  }

                  return true;
              },

    /**
     * Master page initialization. Calls local script second if present. Not used yet.
     */
    globalInit: function() {
                    var formSearch = document.getElementById('searchForm'); 
                    if (formSearch) { formSearch.keys.value = ms_searchTerm; }

                    var formSymbol = document.getElementById('symbolForm'); 
                    if (formSymbol) { formSymbol.symbol.value = ms_searchSymbol; }

                    YAHOO.util.Event.onAvailable('navMain', ms_startMenu);

                    // Insert partner logo
                    var partner = YAHOO.util.History.getQueryStringParameter('cm_ven');
                    var partnerHTML = '';
                    switch (partner) {
                        case 'msAOL': partnerHTML = '<a href="http://money.aol.com/"><img src="/sites/all/themes/mainstreet/images/logo_aol.gif" alt="" \/><\/a>'; break;
                        case 'msYAHOO': partnerHTML = '<a href="http://finance.yahoo.com/"><img src="/sites/all/themes/mainstreet/images/logo_yahoo.gif" alt="" \/><\/a>'; break;
                    }

                    var partnerLogo = document.getElementById('partnerLogo'); 
                    if (partnerLogo) { partnerLogo.innerHTML = partnerHTML; }

                    ms_addFooterMsg();
										
                    var visitCount = $.cookie('visit_count');
					 if (!visitCount) { visitCount = 0; }
                    visitCount++;
                    
                    $.cookie('visit_count', visitCount, {path: '/'});
                    if (visitCount == 1000000) {
                        // Marketing overlay
                        MS.utils.formToggler('frmMarketing', {field:[{name:'txtFName', defaultField:'txtDefFName'}]});
                        MS.utils.formToggler('frmMarketing', {field:[{name:'txtLName', defaultField:'txtDefLName'}]});
                        MS.utils.formToggler('frmMarketing', {field:[{name:'txtEmail', defaultField:'txtDefEmail'}]});

                        // Needs to be global
                        apiOverlay = $('#prompt').overlay({
top: 'center', expose: { color: '#000', loadSpeed: 200, opacity: 0.6 }, closeOnClick: false, closeOnEsc: true, api: true
});
                        apiOverlay.load();

                        $("#prompt form").submit(function(e) {
                            var isValid = MS.utils.formValidate('frmMarketing', {field:[{name:'txtFName', defaultField:'txtDefFName'}, {name:'txtLName', defaultField:'txtDefLName'}, {name:'txtEmail', defaultField:'txtDefEmail', valType:'email'}]});
                            if (!isValid) { return e.preventDefault(); }

                            var jsonData = {txtEmail: $("input[name='txtEmail']", this).val(), txtFName: $("input[name='txtFName']", this).val(), txtLName: $("input[name='txtLName']", this).val()};

                            $.getJSON('/nc/marketing', jsonData, function(data) { $('#prompt').html(data.status); });
                            return e.preventDefault();
                            });
                    }

                    if (MS.localInit) { MS.localInit(); }
                },

    /**
     * Inserts css file directly into page.
     * @param url CSS location
     * @param targetEl Target element
     */
    insertCSS: function(url, targetEl) {
               var link = document.createElement('link');
               link.href = url;
               link.rel = 'stylesheet';
               targetEl.appendChild(link);
           },

    /**
     * Inserts script file directly into body.
     * @param url JS script location
     */
     insertScript: function(url) {
         var link = document.createElement('script');
         link.src = url;
         link.type = 'text/javascript';
         document.body.appendChild(link);
     },

/**
 * Helper function.
 * @param oFormField Entry field
 * @param event Type of event
 * @param oFormFieldDefault Hidden value field
 */
_formCheck: function(oFormField, event, oFormFieldDefault) {
                var valField = $.trim(oFormField.val());
                var valDefault = oFormFieldDefault.val();
                if (event == 'focus') {
                    if (valField == valDefault) { oFormField.val(''); }
                } else {
                    if (valField == '') { oFormField.val(valDefault); }
                }
            }
}


// === Config ===
// addthis settings: sets positions values for the dropdown bookmark element
addthis_settings = { top:5, left:-199 };
ms_searchTerm = 'Search Mainstreet.com';      // Search term header
ms_searchSymbol = 'Quote Search';     		// Search symbol header


// === Functions ===
/**
 * Draws footer_message onto the page. 
 *
 */
function ms_addFooterMsg() {
    var topLink = document.getElementById('msFooterTop');
    var bottomLink = document.getElementById('msFooter');
    if (!topLink || !bottomLink) { return; }    // if elements don't exist, do nothing
    bottomLink.innerHTML = topLink.innerHTML;
    topLink.innerHTML = '';
}

/**
 * Output OpenX Ads
 */
function ms_drawOpenX() {
    // OpenX Javascript Tag v2.8.0
    var m3_u = (location.protocol=='https:'?'https://addelivery.thestreet.com':'http://addelivery.thestreet.com');
    var m3_r = Math.floor(Math.random()*99999999999);
    var zone = 'zoneid=38';
    var cb = '&amp;cb=' + m3_r;
    var iframeSrc = m3_u + '/afr.php?'+ zone + cb;
    var aSrc = m3_u + '/ck.php?n=adbdc17f'+ cb;
    var iSrc = m3_u + '/avw.php?'+ zone + cb + '&amp;n=adbdc17f';

    var adRequest = '<iframe id="a595a127" name="a595a127" src="'+ iframeSrc + '" framespacing="0" frameborder="no" scrolling="no" width="300" height="250"><a href="'+ aSrc + '" target="_blank"><img src="'+ iSrc + '" border="0" alt="" /></a></iframe>';
    //alert(adRequest);
    document.write(adRequest);
}

/**
 * Resets search form if no value set.
 */
function ms_resetSearchText() {
    var sForm = document.getElementById("searchForm"); 
    if (sForm.keys.value.replace(/^\s*|\s*$/g,'') == '') { sForm.keys.value = ms_searchTerm; }
}

/**
 * Resets symbol form if no value set.
 */
function ms_resetSymbolText() {
    var sForm = document.getElementById("symbolForm");
    if (sForm.symbol.value.replace(/^\s*|\s*$/g,'') == '') { sForm.symbol.value = ms_searchSymbol; }
}

/**
 * Take user to canned search
 * @param Form object
 * @return boolean Always false
 */
function ms_searchHotTopics(oForm) {
    var hotTopicBase = '/hottopics/';

    var oRad = oForm.keys;
    var searchValue = '';
    for (var i = 0; i < oRad.length; i++) {
        if (oRad[i].checked) { searchValue = oRad[i].value; }
    }

    if (searchValue == '') {
        alert('Please select an item first.');
    } else {
        document.location = hotTopicBase + searchValue;
    }

    return false;
}

/**
 * Hook up menu tabs.
 */
function ms_startMenu() {
    var nMenu = document.getElementById('navMain');
    var nListItems = nMenu.getElementsByTagName('li');
    for (var i = 0; i < nListItems.length; i++) {
        var nLI = nListItems[i];
        if (nLI.className == 'on') { continue; }
        nLI.onmouseover = function() { this.className = 'over'; };
        nLI.onmouseout = function() { this.className = ''; };
    }
}

/**
 * Search submit callback.
 * @param oForm Form object
 * @return Boolean depending on validation
 */
function ms_validateSearch(oForm) {
    var sForm = oForm;
    if (sForm.keys.value.replace(/^\s*|\s*$/g,'') == '' || sForm.keys.value == ms_searchTerm) {
        alert("Please enter a search term first.");
        return false;
    }
    return true;
}

/**
 * Symbol search submit callback.
 * @param oForm Form object
 * @return False everytime
 */
function ms_validateSymbolSearch(oForm) {
    oForm.symbol.value = oForm.symbol.value.replace(/^\s*|\s*$/g,'');
    return true;
}

/**
 * Opens up content in external window.
 * @param type (slideshow) Type of window
 * @param url Url to open up.
 */
function ms_openExternal(type, url) {
    switch(type) {
        case 'photogallery':
            h = 700;
            w = 970;
            break;
        default:
            return;
    }

    window.open(url, type, "location=0,status=1,scrollbars=0,width=" + w + ",height=" + h); 
}



// ===================== Polls ===================== 
/**
 * Poll object.
 * @param pID Poll nid
 * @param pDiv Div to target poll display to
 * @param pHeader Poll/Tool header text
 * @param pTitle Poll title
 * @param globalPoll (boolean) Indicates whether this is the global poll or not
 */
var MS_Poll = function(pID, pDiv, pHeader, pTitle, globalPoll) { 
    // === Instance Vars: Private ===
    var pollID = pID;
    var pollDiv = document.getElementById(pDiv);
    var pollHeader = pHeader;
    var pollTitle = pTitle;
    var pollCookie = 'ms_showPollResults_'+ pID;
    var globalPoll = globalPoll;

    // used to pass along data to ajax handler with supplemental data
    var ajaxRequestParams = { pid: pollID, choice: '', headerTitle: pollHeader, oPoll: pollDiv, global: globalPoll };


    return {
pollForm: '',
relLinks: '',

/**
 * Draws polls (smart display - either display poll or request through ajax)
 */
drawPoll: function() {
    // Read cookie (display results or poll?)
    var pCookie = YAHOO.util.Cookie.get(pollCookie);
    if (pCookie == 1) {
        YAHOO.util.Cookie.set(pollCookie, 0, { path: "/" });
        MS_PollAjax.startRequest('display', ajaxRequestParams);
    } else {
        pollDiv.innerHTML = this.pollForm;
    }
},

/**
 * Calls YUI connection module for AJAX submit of the poll
 * @param oForm Form object
 */
getVote: function(oForm) {
    var choice = -1;
    if (oForm) {
        oRadio = oForm.choice;
        for (var i = 0; i < oRadio.length; i++) { if (oRadio[i].checked) { choice = oRadio[i].value; } }
    }

    choice = choice == -1 ? '' : 'choice=' + choice;
    YAHOO.util.Cookie.set(pollCookie, 1, { path: "/" }); 

    if (choice == '') { window.location.reload(); return false; }   // not voting, so just show results

    ajaxRequestParams.choice = choice;     // set the choices
    MS_PollAjax.startRequest('vote', ajaxRequestParams);
    return false;
}
    }
}

/**
 * Calls YUI connection module for AJAX submit of the poll
 */
var MS_PollAjax = { 
    handleFailure: function(o) { alert("Voting failed."); },

    handleSuccess: function(o) { 
        rText = o.responseText;

        // Reload only if voting
        if (rText.replace(/\W*/g,'') == 'reload') { window.location.reload(); return; }

        output = "<h3>"+ this.pollParams.headerTitle + "</h3>\n";
        output += rText;
        this.pollParams.oPoll.innerHTML = output;
        this.pollParams.oPoll.scrollIntoView(true);
    },

    pollParams: null,           // internal variable for holding all poll params in one spot

    /**
     * Initiate poll request.
     * @param requestType (vote|display) Update db or retrieve poll display.
     * @param pollParams Poll details.
     */
    startRequest: function(requestType, pollParams) { 
        this.pollParams = pollParams;

        var ajaxURL = requestType == 'vote' ? '/nc/poll/handle' : '/nc/poll/display';
        var ajaxArgs = 'global='+ this.pollParams.global + '&pollID='+ this.pollParams.pid + '&'+ this.pollParams.choice;
        YAHOO.util.Connect.asyncRequest('POST', ajaxURL, MS_PollCallback, ajaxArgs); 
    } 
}; 

// MS_Poll callback definition
var MS_PollCallback = {
    success: MS_PollAjax.handleSuccess, 
    failure: MS_PollAjax.handleFailure, 
    scope: MS_PollAjax
}; 
// =================== End Polls =================== 

/**
 * Print the page
 */
function ms_printPage() {
    this.print();
}


/**
 * Log function
 * @param m Message
 **/
function ms_log(m){
    if (typeof console != "undefined") { console.log(m); }
}

/** register a javascript name space
 * usage: registerNS("MS.foo.bar");
 *
 * */

function registerNS(C){var D=C.split(".");var A=window;for(var B=0;B<D.length;B++){if(typeof A[D[B]]=="undefined"){A[D[B]]=new Object()}A=A[D[B]]}}


