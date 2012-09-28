//////////////////////
////  PPT Data Object
//////////////////////
    var seoRoutesNativeUrl = seoRoutesNativeUrl ? seoRoutesNativeUrl : window.location.href;
    var ppt = {}
    // ppt.fancy = seoRoutesNativeUrl.replace(/http(s|):\/\/[\s\S]+?\//i, '/') != window.location.href.replace(/http(s|):\/\/[\s\S]+?\//i, '/'); 
    ppt.pageName  = (seoRoutesNativeUrl.match(/\/([a-z0-9]+?)\.aspx/i)) ? seoRoutesNativeUrl.match(/\/([a-z0-9]+?)\.aspx/i)[1].toLowerCase() : 'default';
    ppt.pResults  = /(results)/i.test(ppt.pageName);
    ppt.pDetails  = /(details)/i.test(ppt.pageName);
    ppt.pContent  = /(content|default)/i.test(ppt.pageName);
    ppt.pCart     = /(cart)/i.test(ppt.pageName);
    ppt.pShopping = /(results|details)/i.test(ppt.pageName);
    //language/gender/color/brand/category/sort/page

    if (ppt.pContent) {
        ppt.pContent = (/default$/i.test(ppt.page)) ?  'home' : seoRoutesNativeUrl.replace(/^[\s\S]+?contentid=([\s\S]+?)(&[\s\S]+|#[\s\S]+|)$/i, '$1');
    }

    ppt.sActions    = s.events;
    ppt.sBrand      = s.prop9;
    ppt.sCat        = s.prop2 + ' ' + s.prop3 + ' ' + s.prop14;
    ppt.sCat1       = s.prop2;
    ppt.sCat2       = s.prop3;
    ppt.sCat3       = s.prop14;
    ppt.sColor      = s.prop8;
    ppt.sGender     = s.prop1;
    ppt.sGroup      = s.prop11;
    ppt.sModel      = s.eVar40;
    ppt.sPageCount  = ($('.pagerInactive:first').length > 0) ? $('.pagerInactive:first').text() : '';
    ppt.sPrice      = s.prop19;
    ppt.sRoute      = seoRoutesNativeUrl;
    ppt.sSearchTerm = (/search/i.test(s.eVar40)) ? seoRoutesNativeUrl.replace(/[\s\S]+?&ntt=([\s\S]+?)(&[\s\S]+|)$/i, '$1') : "";
    ppt.sSort       = s.eVar43;
    ppt.sTopLevel   = /^Department(.AgeLevel|)$|^On Sale$/i.test(s.eVar41);
    ppt.sURL        = window.location.href;
    ppt.sWidth      = s.prop10;



    ppt.aLogin = "";
    if(/username=/i.test(document.cookie)){
        if(document.cookie.match(/username=(.*?)($|;)/i)[1] !== "") {
          ppt.aLogin = true;
        }
    }
    if(/CART_TOTAL_QUANTITY_20000=/i.test(document.cookie)){
        ppt.aCartCount = (document.cookie.match(/CART_TOTAL_QUANTITY_20000=([\s\S]+?)($|;)/i)[1]) ? document.cookie.match(/CART_TOTAL_QUANTITY_20000=([\s\S]+?)($|;)/i)[1] : "";
    } else {
        ppt.aCartCount = "";
    }
    
    ppt.aPromo = ""; 
    if(/haspromo/i.test(document.cookie)) {
        ppt.aPromo = true;
    }
    $(function(){
        if(ppt.sResults){
            ppt.sPageCount = ($('.pagerInactive:first').length > 0) ? $('.pagerInactive:first').text() : '';
        };
    });




//////////////////////
////  PINPOINT PLUGIN
//////////////////////

(function($){
    $.pinpointBanner = function(el, placement, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("pinpointBanner", base);
        
        base.init = function(){
            if( typeof( placement ) === "undefined" || placement === null ) placement = "append";
            
            base.placement = placement;
            
            base.options = $.extend({},$.pinpointBanner.defaultOptions, options);

            base.adName         = base.options['adName'];
            base.banners        = base.options['banners'];
            base.callback       = base.options['callback'];
            base.campaign       = base.options['campaign'];
            base.debug          = base.options['debug'];
            base.errorMarkup    = base.options['errorMarkup'];
            base.errorRedirect  = base.options['errorRedirect'];
            base.expires        = base.options['expires'];
            base.landingPage    = base.options['landingPage'];
            base.markup         = base.options['markup'];
            base.pinStandard    = base.options['pinStandard'];
            base.place          = base.options['placementTest'];
            base.placementEnd   = base.options['placementEnd'];
            base.placementStart = base.options['placementStart'];
            base.strict         = base.options['strict'];
            base.switches       = base.options['switches'];
            base.placementGrades = [];
            base.gradeSheet = [];

            if(base.place) {
                var start = (base.placementStart) ? new Date(base.placementStart).getTime() : new Date('01/01/2000').getTime();
                var end = (base.placementEnd) ? new Date(base.placementEnd).getTime() : new Date('01/01/9999').getTime();

                // Main Test Models 
                var schedule = base.timeQualifier(start, end); 

                if(schedule) {
                    base.processMarkup(base.markup, base.options);                    
                }

            } else if (base.banners) {
                base.placementTest(base.banners, base.switches);
            }

            // Standard placement test for R2D2 Ads.
            if(/r2d2/i.test(base.adName)){ base.place = base.switches.pResults;}

            // Put your initialization code here
        };
        
        // Schedule Analysis
        base.timeQualifier = function(startTime, endTime) {  

            // this instant
            var rightNow    = new Date().getTime();

            // Tests
            var pastStart   = rightNow > startTime;
            var priorEnd    = rightNow < endTime;

            // Run the final assesment.
            if(!pastStart || !priorEnd) {
              return false;
            } else {
              return true;
            }

        };
        // STEP ONE (PLACEMENT)
        base.placementTest = function(ads, switches, grades){

            // Question Grading
            var questionFinder = function (qObj, o, sub) {
                var count = 0;
                $.each(qObj, function (prop, val) {
                        prop = prop.replace(/^[a-z0-9]+?_/i, '');
                    var grade = 0;
                    // There are two required forms of quiz AND and NOT - OR must return at least 1 true to be counted.
                    if (typeof val == 'object') {

                        // if we found that this test was actually a grouped set we need to dig in to that object
                        var objectCounter = 0;
                        $.each(qObj, function () {
                            objectCounter = objectCounter + 1;
                        });
                        
                        grade = questionFinder(val, prop, true);

                        if(/and|not/i.test(prop) &&  objectCounter > grade) {
                            grade = 0;
                        };
                        // if(base.debug){console.log('>> subObject tested with: "'+ prop + '" and returned: ' + groupedResult);}
                        // grade = groupedResult;
                        // base.gradeSheet.push(prop + '_' + groupedResult);
                        // we only want to return 1 or 0 even if it's nested
                            // groupedResult = (!/fail/i.test(groupedResult) && groupedResult > 1) ? 1 : 'fail';
                        // final test incase we have "or" or "optional" groups inset in "and" queries
                            // if(/or/i.test(o) && /fail/i.test(groupedResult)) {groupedResult = 0;}
                        // as long as the test didn't fail return count plus up to 1
                            // if(!/fail/i.test(count)){
                            //     count = (!/fail/i.test(groupedResult)) ? count + groupedResult : 'fail';   
                            // }
                        // console.log(prop + ': ' + o + ' - ' + groupedResult + ' - ' + count);
                        

                    } else {
                        var rxp = new RegExp(val, 'i');
                        if(base.debug){console.log(rxp + ' = ' + rxp.test(switches[prop]));}
                        grade = (rxp.test(switches[prop])) ? 1 : 0;                    
                    }
                        

                    if (/and/i.test(o)) {
                        count = (grade > 0) ? count + grade : grade;
                    } else if (/not/i.test(o)) {
                        count = (grade > 0) ? 0 : 1;
                    } else if (/optional/i.test(o)) {
                        count = count + grade;
                    } else if (/or/i.test(o)) {
                        count = grade + count;
                    } 
                    // if(base.debug){console.log('testing for '+prop+'='+val+' with "'+o+'": ' + count);}
                    base.gradeSheet.push(prop+'_'+val+'_'+count);



                    // } else if (/and/i.test(o)) {

                    //     // positively (include all) required
                    //     count = rxp.test(switches[prop]) ? count + 1 : 'fail';

                    // } else if (/not/i.test(o)) {

                    //     // negatively (exclude) required
                    //     count = rxp.test(switches[prop]) ? 'fail' : count + 1;

                    // } else if(!/fail/i.test(count)) {

                    //     // neutral (optional include at least 1)
                    //     count = rxp.test(switches[prop]) ? count + 1 : count;

                    // }






                    // Mandatory Includes All MUST be met to move forward
                    if (/and|not/i.test(o) && count < 1) {
                        return(false);
                    }

                });

                // Or Includes at least 1 MUST be met to move forward
                if (/or/i.test(o) && count >= 1) {count = 1; }
                if(/fail/i.test(count)) {count= 0;}
                if(!sub && base.debug) {console.log('>> >> mainObject tested with: "'+ o + '" and returned: ' + count);}
                return count;
            };

            var checkAnswer = function (value) {

                 (/ignore/i.test(value))

            }
            // Start looping through the banner group (using predefined tests...)
            var i;
            for (i = 0; i < ads.length; i = i + 1) {

                base.gradeSheet = [];

                var start = (base.banners[i].placementStart) ? new Date(base.banners[i].placementStart).getTime() : new Date('01/01/2000').getTime();
                var end = (base.banners[i].placementEnd) ? new Date(base.banners[i].placementEnd).getTime() : new Date('01/01/9999').getTime();

                // Main Test Models 
                var schedule = base.timeQualifier(start, end); 
                var optional = (ads[i].optional) ? true : false;
                var and      = (ads[i].and) ? true : false;
                var not      = (ads[i].not) ? true : false;
                var or       = (ads[i].or) ? true : false;

                var placeCount = 0;
                if(optional) {
                   var result = questionFinder(ads[i].optional, 'optional');
                   placeCount = placeCount + result; 
                   optional = result;
                }

                if(and) {
                   var result = questionFinder(ads[i].and, 'and');
                   placeCount = (result > 0) ? placeCount + result : 'fail'; 
                   and = result;
                }

                if(not) {
                   var result = questionFinder(ads[i].not, 'not');
                   placeCount = (result > 0) ? placeCount + result : 'fail'; 
                   not = result;
                }

                if(or) {
                   var result = questionFinder(ads[i].or, 'or');
                   placeCount = (result > 0) ? placeCount + result : 'fail'; 
                   or = result;
                }
            
                placeCount = (/fail/i.test(placeCount)) ? 0 : placeCount;
                
                if(placeCount > 0){
                    // Assign banner placement value to the ad AND/OPTIONAL get 1 point for each match OR only gets 1 point NOT gets no value added
                    ads[i].placementValue = placeCount;    
                    base.placementGrades.push(ads[i].placementValue + '_' + i);
                    
                }
                if (base.debug) {
                    console.log('Ad Quiz Number: ' + i);
                    console.log('Schedule: ' + schedule + " | Optional: " +optional+ " | AND: " +and+ " | NOT: " +not+ " | OR: " +or);
                    console.log(base.gradeSheet);
                    console.log((base.placementGrades.length > 0) ? base.placementGrades : false);
                    console.log(base.banners[i]);
                    console.log('>>')
                }
            }

            // Is there anything to place?

            if (base.placementGrades.length > 0) {
                base.place = true;
                var selectedAd = ads[base.placementGrades.sort()[0].replace(/[0-9]+_/i, '')];
                base.processMarkup(selectedAd.markup, selectedAd);

            } else {
                return false;
            }
        };
        
        // STEP TWO (markup and landingOptions)
        base.processMarkup = function(markup, options){
            // Does this pinpoint use pin tokens?
            if (/@@pin/i.test(markup) && base.place) {

                // Case 1 - the base.campaign option must be set - or else we don't know where we are
                if (base.campaign) {
                    var cookieName = 'pinData-' + base.campaign;
                    var cookieRxp = new RegExp(cookieName);
                    var vars = '';
                    // OK, now test to see if we are on a landing page that doesn't have a cookie
                    if (base.landingPage || (base.landingPage && !cookieRxp.test(document.cookie))) {
                        // if so set a cookie based on the page
                        vars = base.pinStandard.replace(/^.*?\?/, '');
                        $.cookie(cookieName, vars, {
                            expires: base.expires,
                            path: '/'
                        });
                        if (base.debug) {
                            console.log(base.pinStandard)
                        };

                    } else if (/pinData/.test(document.cookie)) {
                        // if not read the cookie
                        vars = $.cookie(cookieName);
                    }

                    // Now, checkpoint (in case something went wrong with the last part)
                    if (vars) {
                        // if it all worked run through the cookie and setup a pinpoint object for reference later
                        var varRay = vars.split('&');
                        var pageVars = {};
                        for (i = 0; i < varRay.length; i++) {
                            var currVar = varRay[i].split('=');
                            pageVars[currVar[0].toLowerCase()] = currVar[1];
                        }
                        if (base.debug) {
                            console.log('Pinpoint "' + base.campaign + '":');
                            console.log(pageVars)
                        };
                    }
                    // Second checkpoint, make sure the object was created successfully
                    if (pageVars) {


                        // Now do our pin token replacement on the markup
                        markup = markup.replace(/@@pin-([a-z0-9\-\_\+\.]+?)@@/ig, function (str, p1) {
                            p1 = p1.toLowerCase();
                            if (pageVars[p1]) {
                                return pageVars[p1];
                            } else if (base.strict) {
                                // strict failure
                                base.place = false;
                                if (base.debug) {
                                    console.log('Strict failure, could not find "' + p1 + '" in the pageVars object. For pinpoint project:' + base.campaign)
                                }
                            }
                        });


                    } else {
                        // major failure 
                        base.place = false;
                        if (base.debug) {
                            console.log('No pageVars object was made - maybe you have not visited the landing page. For pinpoint project: "' + base.campaign + '"')
                        }
                    }
                } else {
                    // No base.campaign was set, major failure
                    base.place = false;
                    if (base.debug) {
                        console.log('No base.campaign was set. For pinpoint project.')
                    }
                }                
            }

            // Does this pinpoint use livepin tokens?
            if (/@@livepin/i.test(markup) && base.place) {
                // Now do our livepin token replacement on the markup
                markup = markup.replace(/@@livepin-([a-z0-9\-\_\+\.]+?)@@/ig, function (str, p1) {
                    if (options[p1]) {
                        return options[p1];
                    } else if (base.strict) {
                        // strict failure
                        base.place = false;
                        if (base.debug) {
                            console.log('Strict failure, could not find "' + p1 + '" in the pinpoint options.')
                        }
                    } else {
                        return '';
                    }
                });
            }

            // Quick error check before placing pinpointed banner
            if (!base.place && base.errorMarkup) {
                markup = base.errorMarkup;
                base.place = true;
                if(base.debug) {console.log('Changing base.place to TRUE')}
            } else if (!base.place && base.errorRedirect && !base.debug) {
                window.location = base.errorRedirect;
            }
            if(base.place){
                markup = $('<span class="pin">'+markup+'</span>');
                base.placeMarkup(markup);
            };
        };

        base.placeMarkup = function(markup) {
            // Run conditional test simple on off switch
            if (base.place){
              if(base.debug) {console.log('Placing pinpoint to '); console.log('markup:'); console.log(markup); console.log('target:'); console.log(base.$el); console.log('>>')}
              // figure out how to base.place the markup
              switch(base.placement) {
                case 'html': 
                    base.$el.html('').show(0, function(){
                        markup.appendTo(base.$el).show(0, function(){
                            if(base.callback){base.callback(this)}
                        });
                    });
                break;
                case 'prepend': 
                    markup.prependTo(base.$el).show(0, function(){
                        if(base.callback){base.callback(this)}
                    });
                break;
                case 'after': 
                    // base.$el.after(markup.html());
                    markup.insertAfter(base.$el).show(0, function(){
                        if(base.callback){base.callback(this)}
                    });
                break;
                case 'before': 
                    // base.$el.before(markup.html());
                    markup.insertBefore(base.$el).show(0, function(){
                        if(base.callback){base.callback(this)}
                    });
                break;
                default :
                markup.appendTo(base.$el).show(0, function(){
                    if(base.callback){base.callback(this)}
                });             
              }
            }
        }
        // Run initializer
        base.init();
    };
    
    $.pinpointBanner.defaultOptions = {
        adName        : false,
        banners       : false,
        callback      : false,
        campaign      : '',
        debug         : false,
        errorMarkup   : false,
        errorRedirect : false,
        expires       : 15,
        landingPage   : false,
        markup        : false,
        pinStandard   : (typeof seoRoutesNativeUrl == 'undefined') ? false : seoRoutesNativeUrl,
        placementEnd  : false,
        placementStart: false,
        placementTest : false,
        strict        : true,
        switches      : (typeof ppt == 'undefined') ? false : ppt
    };
    
    $.fn.pinpointBanner = function(placement, options){
        return this.each(function(){
            (new $.pinpointBanner(this, placement, options));
        });
    };
    
})(jQuery);