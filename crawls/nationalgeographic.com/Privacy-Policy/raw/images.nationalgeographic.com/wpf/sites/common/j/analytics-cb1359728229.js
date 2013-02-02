if( !Object.prototype.hasOwnProperty.call( String.prototype, 'endsWith'))
   String.prototype.endsWith = function(str){
       var lastIndex = this.lastIndexOf(str);
       return (lastIndex != -1) && (lastIndex + str.length == this.length);
   };
 
(function(window, document, $, undefined) {
    allReady = function (window, document, $, a) {
       'use strict';
     
        var debug = !!window.location.search.match('debug'),
            log = function (msg) {
                if (debug) {
                    if (window.console && window.console.log) {
                        window.console.log(msg);
                    }
                }
            },
            track = function (item) {
                window._gaq.push(item);
                log(item);
                
            },
           root = document.documentElement,
     
           //Utilities
           isHTTPS = !!document.location.protocol.match('https:'),
           isHTTP = !!document.location.protocol.match('http:'),
           serialize = function (obj) {
               var str = [],
                   p;
               for (p in obj) {
                   if (obj.hasOwnProperty(p)) {
                       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                   }
               }
               return str.join("&");
           },
           addEvent = function (type, el, func) {
               var oldOn,
                   onContainer;
               if (el.addEventListener) {
                   el.addEventListener(type, func, false);
               } else if (el.attachEvent) {
                   el.attachEvent('on' + type, func);
               } else {
                   if (typeof el['on' + type] === 'function') {
                       oldOn = el['on' + type];
                       onContainer = function (oldOn, newOn) {
                           if (typeof oldOn === 'function') {
                               oldOn();
                           }
                           newOn();
                       };
                       el['on' + type] = onContainer;
                   } else {
                       el['on' + type] = func;
                   }
               }
           },
           addScript = function (src, cb, async) {
               var s = document.createElement('script');
                if (typeof cb === 'function') {
                    addEvent('load', s, cb);
                }
               s.src = src;
               s.async = (async === undefined) ? true : async;
               root.insertBefore(s, root.childNodes[0]);
               return s;
           },
           thinmint = {
                get: function (sKey) {
                  if (!sKey || !this.has(sKey)) { return null; }
                  return window.unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
                },
                set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
                  var sExpires = "";
                  if (vEnd) {
                    switch (vEnd.constructor) {
                      case Number:
                        sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                        break;
                      case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                      case Date:
                        sExpires = "; expires=" + vEnd.toGMTString();
                        break;
                    }
                  }
                  document.cookie = window.escape(sKey) + "=" + window.escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                },
                remove: function (sKey, sPath) {
                  if (!sKey || !this.has(sKey)) { return; }
                  document.cookie = window.escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
                },
                has: function (sKey) {
                  return (new RegExp("(?:^|;\\s*)" + window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
                },
                keys: /* optional method: you can safely remove it! */ function () {
                  var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = window.unescape(aKeys[nIdx]); }
                  return aKeys;
                }
            },
           i,
           iLen,
           csScript = (function () {
               window._comscore = window._comscore || [];
               window._comscore.push({ c1: "2", c2: "3005368" });
                return addScript((isHTTPS ? 'https://s' : 'http://') + 'b.scorecardresearch.com/beacon.js?');
           })(),
     
           //Google Analytics
           gaScript = document.createElement('script'),
           //gpt = document.createElement('script'),
     
           //Omniture
           omnitureScript = (function () {
               var src = (window.staticURL || (isHTTPS ? "https://www-s.nationalgeographic.com/wpf/" : "http://images.nationalgeographic.com/wpf/")) + 'sites/common/j/omniture_code.js';
               return addScript(src);
           })(),
     
           //Survey Monkey
           surveyMonkey = (function () {
               if (isHTTP && window.location.hostname === "environment.nationalgeographic.com") {
                   var isGEC = !!(window.location.pathname.match('/environment/energy/great-energy-challenge/')),
                       smGECid = 'zsmmDV05_2fJzMmJDaTkjvfg_3d_3d',
                       smid = 'j3Pcrw2nwpcrRWelX96W7w_3d_3d',
                       basePath = 'http://www.surveymonkey.com/jsPop.aspx',
                       path = basePath + '?sm=' + ((isGEC) ? smGECid : smid);
     
                   return addScript(path);
               }
           })(),
     
           qcScript = (function () {
               var qs;
               //only loads for http
               if (isHTTP) {
                   qs = addScript('http://edge.quantserve.com/quant.js');
                   addEvent('load', qs, function () {
                       if(typeof window.quantserve === 'function') {
                           window._qacct="p-c8v-iKfiW8tsY";
                           window.quantserve();
                       }
                   });
                   return qs;
               }
           })();
     
       //Google Analytics
       window._gaq = window._gaq || [];
       //The ga._gaEarlyQ in the analytics object allows for items to be pushed the the _gaq before the _trackPageView call
       a.ga._gaEarlyQ = a.ga._gaEarlyQ || [];
       track(['_setAccount', a.ga.accountID || 'UA-28236326-1']);
       track(['_setDomainName', window.location.siteName()]);
       track(['_setAllowLinker', true]);
       track(['_addIgnoredRef', 'nationalgeographic']);
        
        (function(){
            var vidTitleElem = document.getElementById('natgeov-vtitle'),
            vidTitle = (vidTitleElem) ? (vidTitleElem.textContent || vidTitleElem.innerText) : undefined;
            
            if (vidTitle) {
              vidTitle = vidTitle.trim();
              track(['_setCustomVar', 4, 'videoTitle', vidTitle]);
            }
        }());
        (function (_gaq) {
            var sess = thinmint.get('memSess'),
                parts;
                
            if (sess) {
                parts = sess.split('|');
                track(['_setCustomVar', 3, 'isLoged', 'true', 3]);
                track(['_setCustomVar', 8, 'userToken', parts[0], 3]);
                track(['_setCustomVar', 9, 'memberLevel', parts[1], 3]);
            } else {
                track(['_setCustomVar', 3, 'isLoged', 'false', 3]);
            }
        })(window._gaq);
     
        for (i = a.ga._gaEarlyQ.length - 1; i >= 0; i--) {
            track(a.ga._gaEarlyQ[i]);
        }

        //The ga.trackPageViewItem in the analytics object allows custom attributes to be passed to the _trackPageView method.
        track(a.ga.trackPageViewItem || ['_trackPageview']);
        gaScript = addScript((isHTTPS ? "https://ssl" : "http://www") + '.google-analytics.com/ga.js');
       
        // Login/out events
        $(window).on('login',function(e) {
            track(['_trackEvent', 'Membership', 'General', 'Sign In']);
        });
     
        $(window).on('logout',function(e) {
            track(['_trackEvent', 'Membership', 'General', 'Log Out']);
        });
       
        // Downloads
        $(function () {
            $('#container').on('click', 'a', function (e) {
                var $this = $(this),
                    //Shortcircut flag for determining if a link is a download, but can't count on it.
                    isDownload = $this.hasClass('download'),
                    downloadType = '';
                if ($this.hasClass('pdf') || (($this.attr('href') !== undefined) && $this.attr('href').match('.pdf'))) {
                    log('downloading pdf');
                    isDownload = true;
                    downloadType = 'pdf';
                } else if ($this.hasClass('wallpaper')) {
                    log('downloading wallpaper');
                    isDownload = true;
                    downloadType = 'wallpaper';
                } else if (isDownload){
                    log('downloading file');
                    downloadType = 'file';
                }
                if (isDownload) {
                    track(['_trackEvent', 'engage', 'download: ' + downloadType, $(this).attr('title') || document.title]);
                }
            });
        }());
     
        //Event Tracking
        (function () {
           var videoDuration;  //Used for Video Tracking progress tracking
            //Outbound links
            $('body').on('click', 'a[href^="http"]:not([href*="' + window.location.siteName() + '"])', function (e) {
                var siteName = window.location.siteName,
                    natGeoDomains = [
                        'nationalgeographicexpeditions.com',
                        'scienceblogs.com',
                        'buysub.com',
                        'ngtravelerseminars.com',
                        'greatenergychallengeblog.com',
                        '360energydiet.com',
                        'nationalgeographic.org',
                        'nationalgeographic.com',
                        'ngstudentexpeditions.com',
                        'natgeotakeaction.org',
                        'customersvc.com',
                        'killinglincolnconspiracy.com'
                    ],
                    targetA = this;
                //NatGeo TLDs
                if ($.inArray(siteName(targetA.href), natGeoDomains) >= 0) {
                    track(['_link', targetA.href]);
                //Third Party TLDs
                } else {
                    track(['_trackEvent', 'engagement', 'outbound-click', targetA.title || window.location.siteName(targetA.href)]);
                }
            });
     
            //Nav Events
            (function () {
                $('#navigation_mainB .primary_nav, #site_nav > ul').on('click', 'a', function (e) {
                    var $this = $(e.target),
                        $thisParentNav = $this.parentsUntil('.primary_nav', '.primary_nav > li').eq(0),
                        parentNav = $thisParentNav.children('a').eq(0).text();
     
                    //this is for clicks on subnav items
                    if ($thisParentNav.length) {
                        track(['_trackEvent', 'main-nav', parentNav, $this.text().trim()]);
     
                    //clicks on primary nav items.
                    } else {
                        track(['_trackEvent', 'main-nav', 'home', $this.text().trim()]);
                    }
                });
            }());
     
           // Floodlight Tags
            (function(awe){
                var pathname = awe.pathname,
                    host = awe.host,
                    FloodLightTags,
                    FloodLightOptions,
                    floodLightInstance;
                
                if(!pathname.endsWith('/')) {
                   pathname = [pathname,'/'].join('');
                }
                
                /*
                 * When this dataset is looped over, we first check for the right domain.
                 *
                 * If the domain doesn't match, everything falls back to
                 *  nationalgeographic.com
                 *
                 * Within the domain scope, the first match found is returned.
                 */
                FloodLightOptions = {
                   'animals.nationalgeographic.com': {
                       '^/animals/wild/animal-underworld/$':'natio040',
                       '^/animals/big-cats/$':'natio634',
                       '^/animals/big-cats/cause-an-uproar/episode-guide/$':'natio095',
                       '^/animals/wild/built-for-the-kill/$':'natio606',
                       '^/animals/wild/shows-deadly-60/$':'natio203',
                       '^/animals/wild/dog-whisperer/$':'natio111',
                       '^/animals/$':'natio708',
                       '^/animals/wild/shows-incredible-dr-pol/$':'natio457',
                       '^/animals/wild/events-penguin-palooza/$':'natio557',
                       '^/animals/schedule/wild/$':'gibpn088',
                       '^/animals/wild/events-shark-attack-experiment-live/$':'natio677',
                       '^/animals/wild/shows-swamp-men/$':'natio667'
                   },
                   'channel.nationalgeographic.com':{
                       '^/channel/abandoned/$':'natio516',
                       '^/channel/alaska-state-troopers/$':'natio907',
                       '^/channel/american-colony-meet-the-hutterites/$' : 'natio574',
                       '^/channel/american-gypsies/$':'natio319',
                       '^/channel/american-weed/$' : 'natio510',
                       '^/channel/americas-lost-treasures/': 'natio318',
                       '^/channel/amish-out-of-order/$':'natio632',
                       '^/channel/border-wars/$':'natio852',
                       '^/channel/brain-games/$':'natio268',
                       '^/channel/chasing-ufos/$':'natio226',
                       '^/channel/doomsday-preppers/$':'natio169',
                       '^/channel/drugs-inc/$':'natio597',
                       '^/channel/explorer/$' : 'natio706',
                       '^/channel/family-guns/$' : 'natio997',
                       '^/channel/hard-time/$' : 'natio699',
                       '^/channel/knights-of-mayhem/$':'natio681',
                       '^/channel/the-last-days-of-osama-bin-laden/$':'natio143',
                       '^/channel/locked-up-abroad/$':'natio465',
                       '^/channel/meet-the-hutterites/$':'natio574',
                       '^/channel/rocket-city-rednecks/$':'natio533',
                       '^/channel/schedule/ngc/$':'natio428',
                       '^/channel/taboo/$':'natio172',
                       '^/channel/the-link/$' : 'natio531',
                       '^/channel/the-truth-behind/$' : 'natio572',
                       '^/channel/titanic-100-years/$' : 'qocse441',
                       '^/channel/titanic/final-word-with-james-cameron$':'natio575',
                       '^/channel/ultimate-factories/$' : 'natio607',
                       '^/channel/untamed-americas/$':'natio395',
                       '^/channel/wicked-tuna/$':'natio144',
                       '^/channel/wild-justice/$':'natio208',
                       '^/channel/witness-disaster/$' : 'natio202',
                       '^/channel/$':'natio857',
                       // Wild
                       '^/wild/africas-deadliest/$' : 'natio768',
                       '^/wild/animal-intervention/$':'natio780',
                       '^/wild/dangerous-encounters/$' : 'natio064',
                       '^/wild/outback-wrangler/$' : 'natio293',
                       '^/wild/stranger-than-nature/$' : 'natio048',
                       // Default
                       '^/$':'natio517'
                   },
                   'nationalgeographic.com':{
                       '^/$':'natio411',
                       '^/channel/$':'natio857',
                       '^/animals/$':'natio708',
                       '^/wild/tv-schedule$':'gibpn088',
                       '^/animals/schedule/wild/$':'gibpn088',
                       '^/animals/big-cats/cause-an-uproar/episode-guide/$':'natio095',
                       '^/animals/big-cats/$':'natio634',
                       '^/(channel|wild)/schedule/(daily|weekly)/$':'natio428'
                   },
                   'ngm.nationalgeographic.com':{
                       '/':'natio933'
                   }
               };
               
                FloodLightTags = function(opts) {
                    var instanceOpts = function(category) {
                        return {
                           '%(category)s':category,
                           '%(bust)s':Math.random()*10000000000000
                        };
                    },
                    optsSwitcher=function(opts) {
                        if (Object.prototype.hasOwnProperty.call(opts, host)) {
                            return opts[host];
                        }
                       return opts['nationalgeographic.com'];
                    },
                    optsPicker,
                    self,
                    src,
                    f;

                    this.opts = optsSwitcher(opts);
                    optsPicker = function(opts) {
                        var key;
                        
                        for(key in opts) {
                            // Exclude unwanted properties.
                            if( opts.hasOwnProperty(key)) {
                                if( new RegExp(key).test(pathname)) {
                                    return instanceOpts(opts[key]);
                                }
                            }
                        }
                        return instanceOpts(opts['^/$']);
                    };
                    this.opts = optsPicker(this.opts);
                    src = '//fls.doubleclick.net/activityi;src=3661093;type=indiv055;cat=%(category)s;ord=%(bust)s?';
                    $.each( this.opts, function(index, item) {
                        src=src.split(index).join(item);
                    });

                    f = $("<iframe/>");
                    f.attr('src',src);
                    f.attr('width',1);
                    f.attr('height',1);
                    f.attr('frameborder',0);
                    f.css('display','none');

                    self = this;
                    $('body').append(f);
                    return this;
                };
               
                floodLightInstance = new FloodLightTags( FloodLightOptions);
            })(window.location);
     
           //Module Events
     
           //Social Connect Engagement
           (function () {
                $('#connect_with_us, .connect_ng').on('click', 'a', function(e) {
                    var service = window.location.siteName($(this).attr('href')).split('.')[0];
                    track(['_trackEvent', 'social', 'outbound-click', service]);
                });
            }());
     
           //Newsletter Engagemet
            (function () {
                var trackNewsletterEngagement = function (id) {
                    var section = document.location.pathname.split('/')[1]; //cus pathname starts with "/"
                    track(['_trackEvent', 'engage', 'newsletter', section + ':newsletter_' + id]);
                };
                //Flyout
                $('#newsletter_flyout_form').on('click', '[type="submit"]', function () {
                    var $this = $(this),
                        $form = $this.parents('form').eq(0),
                        newsletterID = $form.find('[name="newsletter"]').eq(0).attr('value');
     
                    trackNewsletterEngagement(newsletterID);
                });
                //newsletter close
                $('body').on('mousedown', 'div.dod_close, .no_flyout', function () {
                    var $this = $(this),
                        closeType = $this.hasClass('no_flyout') ? 'no_flyout' : 'close';
     
                    trackNewsletterEngagement(closeType);
                });
     
                //Right Rail Module
                $('.newsletter_signup').on('click', '[value="submit"]', function () {
                    var $this = $(this),
                        $form = $this.parents('form').eq(0),
                        newsletterID = $form.find('[name="newsletter"]').eq(0).attr('value');
     
                    trackNewsletterEngagement(newsletterID);
                });
     
                //This handles a custom "newsletterSignup" event which is fired on a successfull ajax resonse from the newsletter submit action.
                $('form[id^="newsletters_signup"], form#newsletter_flyout_form').on('newsletterSignup', function(e) {
                    track(['_setAccount', 'UA-28236326-1'],
                        ['_setDomainName', 'nationalgeographic.com'],
                        ['_setAllowLinker', true],
                        ['_setCustomVar', 2, 'isSubscriber-Email', 'true', 1]);
                    track(['_trackPageview', e.url]);
                });
            }());
     
            //Email Registration Test Events
            (function () {
                $('#eregtest').on('Displayed', function (e) {
                    // Determine section names
                    var section = document.location.pathname.split('/')[1],
                        site = window.location.hostname.split('.')[0];
                    if (section === '' || section === ' ') {
                        if (site === 'www') {
                            section = 'Home';
                        } else if (site === 'news') {
                            section = 'News';
                        } else if (site === 'animals') {
                            section = 'Animals';
                        } else if (site === 'photography') {
                            section = 'Photography';
                        } else {
                            section = site;
                        }
                    } else if (section === 'news') {
                        section = 'News';
                    } else if (section === 'animals') {
                        section = 'Animals';
                    } else if (section === 'photography') {
                        if (document.location.pathname.split('/')[3] === 'photo-of-the-day') {
                            section = "Photography-POD";
                        } else if (window.location.hostname === 'ngm.nationalgeographic.com') {
                            if (document.location.pathname.split('/')[1] === 'photography') {
                                section = "NGM Photos";
                            }
                        } else {
                            section = "Photography";
                        }
                    } else {
                       section = section;
                    }
     
                    // Push the custom variable
                    track(['_setCustomVar', 7, 'Reg-wall-section', section + '-1st-hit', 2]);
     
                    // Record the modal display event
                    track(['_trackPageview', 'Reg-wall-view ']);
                });
     
                $('#eregtest').on('Privacy_Link', function () {
                    track(['_trackEvent', 'Reg-wall-section', 'click', 'privacy-policy']);
                });
     
                $('#eregtest').on('TOS_Link', function () {
                    track(['_trackEvent', 'Reg-wall-section', 'click', 'terms-service']);
                });
     
                $('#eregtest').on('Explanation_Link', function () {
                    track(['_trackEvent', 'Reg-wall-section', 'click', 'whats-this']);
                });
     
                $('#eregtest').on('Email_Reg_Button', function () {
                    track(['_trackEvent', 'Reg-wall-section', 'click', 'join-now']);
                });
     
                $('#eregtest').on('FB_Reg_Button', function () {
                    track(['_trackEvent', 'Reg-wall-section', 'Social Login', 'facebook']);
                });
            }());
     
            //Packaged Homepage Module GA Events
            (function () {
               var $home = $('body.www.homepage'),
                   $DLModule = $home.find('#content_top'),
                   $DL = $DLModule.find('.dl'),
                   $moreLink = $DL.find("ul > li div > p.action > a"),
                   $sideMods = $DLModule.find('.secondary .promo_collection'),
                   $pod = $sideMods.eq(0),
                   $featuredVideo = $sideMods.eq(1),
                   $homeContent = $home.find('#content_mainA'),
                   $homeRR = $home.find('#content_mainB');
     
               $moreLink.attr("data-index", 1);

               //This should only target the <a> around the DL image.
               $DL.on('click', 'a', function (e) {
                   var $this = $(this),
                       $thisLI = $this.parentsUntil('.dl > ul').eq(0),
                       isDLNav = ($thisLI.length) ? $thisLI.parent().hasClass('dl_navigation') : false,
                       index = $thisLI.index() + 1;
                   
                   //Should only be dealing with links inside lists.
                   if ($thisLI.attr("tagName").toLowerCase() === "li") {
                       //Dl Nav
                       if (isDLNav) {
                           $moreLink.attr("data-index", $this.text());
                           track(['_trackEvent', 'DL', 'DLNav', 'HPDL' + $this.text() + '_HPMod']);
                        }
                       //DL Image
                       else {
                           track(['_trackEvent', 'DL', 'DLImage', 'DLMain Image' + index + '_HPMod']);
                       }
                   //Direct parent of More link is a <p>.
                   } 
                   else if ($this.parent('.action')[0]) {
                       track(['_trackEvent', 'DL', 'DLMore', 'HPDL' + $moreLink.attr("data-index") + '_More_HPMod']);
                   }
               });
               $pod.on('click', 'a', function () {
                   track(['_trackEvent', 'Module', 'DLSide1', 'POD_HPMod']);
               });
               $featuredVideo.on('click', 'a', function () {
                   track(['_trackEvent', 'Module', 'DLSlide2', 'FeaturedContent RL_HPMod ']);
               });
               $homeContent.on('click', 'a', function () {
                    var $this = $(this),
                        $thisModule = $this.parents('.promo_collection').eq(0),
                        moduleClassList = ($thisModule.length) ? $thisModule.attr('class').split(' ') : [];
     
                    if ($.inArray('news_stories', moduleClassList) >= 0) {
                        track(['_trackEvent', 'Module', 'LeftUDL', 'DailyNews_HPMod']);
                    } else if ($.inArray('vcalendar', moduleClassList) >= 0) {
                        track(['_trackEvent', 'Module', 'RightUDL', 'TV_HPMod']);
                    }
                });
                $homeRR.on('click', 'a', function () {
                    var $this = $(this),
                        $thisModule = $this.parents('.promo_collection').eq(0),
                        moduleClassList = ($thisModule.length) ? $thisModule.attr('class').split(' ') : [];

                    if ($.inArray('links_list', moduleClassList) && $.inArray('small', moduleClassList)) {
                        if ($thisModule.find('h3.title').text('Travel With Us')) {
                            track(['_trackEvent', 'Module', 'RightRLTra', 'TravelWithUs_HPMod']);
                        } else if ($thisModule.find('h3.title').text('Newsletters')) {
                            track(['_trackEvent', 'Module', 'RightRLNewsltr', 'Newsletter_HPMod']);
                        }
                    }
                });
            }());
     
           //Packaged News Article Module GA Events
           (function () {
               var $news = $('body.news.article').eq(0),
                   $modules = $news.find('.most-popular-news, .great-energy-challenge-blog, .news-video, .news-blogs');
               
               $modules.on('click', 'a', function (e) {
                    var $this = $(this),
                        $thisModule = $this.parents('.most-popular-news, .great-energy-challenge-blog, .news-video, .news-blogs').eq(0);
     
                    if ($thisModule.hasClass('most-popular-news')) {
                        track(['_trackEvent', 'Module', 'RightRLNewsDL', 'MostPopNews_NewsMod']);
                    } else if ($thisModule.hasClass('great-energy-challenge-blog')) {
                        track(['_trackEvent', 'Module', 'RightRLNews1', 'GEC_NewsMod']);
                    } else if ($thisModule.hasClass('news-video')) {
                        track(['_trackEvent', 'Module', 'LeftRLNews2', 'NewsVideos_NewsMod']);
                    } else if ($thisModule.hasClass('news-blogs')) {
                        track(['_trackEvent', 'Module', 'RightRLNews2', 'NewsBlogs_NewsMod']);
                    }
                });
            }());
     
           //Video Modules
           (function () {
               var $modules = $('#content_mainB').find('[class*="video"]');
               $('#content_mainB .videos').on('click', 'a', function () {
                    var $this = $(this),
                        $thisModule = $this.parentsUntil('.tabs-content').find('[class*="video"]').eq(0),
                        moduleName;
     
                    if ($thisModule.hasClass('featured-video')) {
                        moduleName = 'FeaturedVideo';
                    } else if ($thisModule.hasClass('latest-video')) {
                        moduleName = 'LatestVideo';
                    }
                    track(['_trackEvent', 'Module', 'RightRLVideo', moduleName]);
                });
            }());
     
           //video tracking
           (function () {
                /*
                Needs to be delegated since original #ngplayer node get replaced with
                <object/> for flash video.
                */
                $('body').on('Ready Start Play Pause Progress Complete', '#ngplayer', function (e) {
                    var percentageViewed,
                        timeInSec;
                    if (e.type === 'Ready') {
                        videoDuration = e.value;
                        track(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
                    } else if (e.type === 'Progress') {
                        percentageViewed = (e.value)/100;
                        timeInSec = Math.floor(videoDuration * percentageViewed);
                        track(['_trackEvent', 'video', e.type, 'Video complete ' + e.value + '%']);
                    } else {
                        track(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
                    }
                });
            }());
            //Scroll Tracking
            (function (doc, win) {
                var de = doc.documentElement,
                    scrollY = function () {
                        return win.self.pageYOffset || (de && de.scrollTop) || doc.body.scrollTop;
                    },
                    pageHeight = function () {
                        return doc.body.scrollHeight;
                    },
                    windowHeight = function () {
                        return win.self.innerHeight || (de && de.clientHeight) || doc.body.clientHeight;
                    },
                    trackAt = {
                        topHat      : 290,
                        engagementA : 0.6,
                        engagementB : 0.9
                    },
                    isTracked = {
                        topHat      : false,
                        engagementA : false,
                        engagementB : false
                    };
     
                addEvent('scroll', win, function () {
                    var percentScroll = (scrollY() + windowHeight())/pageHeight(),
                        pxScroll = scrollY(),
                        page = win.location.pathname,
                        search = win.location.search,
                        url = page + search;
     
                    if (!isTracked.topHat && pxScroll > trackAt.topHat) {
                        isTracked.topHat = true;
                        track(['_trackEvent', 'engagement', 'scrolled past ' + trackAt.topHat, url]);
                    } else if (!isTracked.engagementA && percentScroll > trackAt.engagementA) {
                        isTracked.engagementA = true;
                        track(['_trackEvent', 'engagement', 'scrolled ' + (trackAt.engagementA * 100) + '%', url]);
                    } else if (!isTracked.engagementB && percentScroll > trackAt.engagementB) {
                        isTracked.engagementB = true;
                        track(['_trackEvent', 'engagement', 'scrolled ' + (trackAt.engagementB * 100) + '%', url]);
                    }
                });
            }(document, window, undefined));
     
            //Bounce modification
            (function (sec) {
                var url = document.location.pathname + document.location.search,
                    bounce = window.setTimeout(function () {
                        track(['_trackEvent', 'engagement', 'Dwell time (more than ' + sec + ' seconds)', url]);
                    }, sec * 1000);
                }(20));
       
        })();
        //End Google Analytics
     
        // Nielsen Online SiteCensus V6.0 | COPYRIGHT 2010 Nielsen Online
        (function () {
            var d = new Image(1, 1);
            d.onerror = d.onload = function () {
                d.onerror = d.onload = null;
            };
           d.src = [ document.location.protocol,
                     "//secure-us.imrworldwide.com/cgi-bin/m?ci=us-301776h&cg=0&cc=1&si=",
                     window.escape(window.location.href),
                     "&rp=",
                     window.escape(document.referrer),
                     "&ts=compact&rnd=",
                     (new Date()).getTime()].join('');
       })();
    };
 
    if ($) {
        if ($.fn.on) {
            $(document).ready(function() {
                allReady(window, document, $, analytics);
            });
        } else {
            $.fn.on = function (events, selector, data, handler) {
                var $this = this,
                    $filtered,
                    attach = ($.fn.delegate) ? 'delegate' : ($.fn.live) ? 'live' : 'bind';

                if (handler === undefined) {
                    if (data === undefined) {
                        handler = selector;
                        selector = undefined;
                    } else {
                        handler = data;
                        data = undefined;
                    }
                }

                if (attach === 'delegate' && typeof selector === 'string') {
                    return $this[attach](selector, events, data || {}, handler);
                } else {
                    attach = (attach === 'delegate') ? 'live' : attach;
                    $filtered = (selector) ? $this.find(selector) : $this;

                    if (data) {
                        return $this[attach].call($filtered, events, data, handler);
                    } else {
                        return $this[attach].call($filtered, events, handler);
                    }
                }
            };
            $(document).ready(function() {
                allReady(window, document, $, analytics);
            });
        }
    } else {
        (function () {
            var jq = document.createElement('script'),
                jqS = document.body || document.head || document.documentElement;
            jq.async = true;
            if (jq.addEventListener) {
                jq.addEventListener('load', function () {
                   allReady(window, document, jQuery.noConflict(!!$), analytics);
                });
            } else if (jq.onreadystatechange !== undefined) {
            // Added for IE8 otherwise it won't know that we're ready
                jq.onreadystatechange = function () {
                    if (this.readyState === 'loaded') {
                        allReady(window, document, jQuery.noConflict(!!$), analytics);
                    }
                };
            }
            jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            jqS.appendChild(jq);
        })();
    }
     
    window.analytics = window.analytics || {ga: {}};
    window.analytics.ga = window.analytics.ga || {};
    //window.location.siteName reduces a either the documents url or a given url to the top most site name.
    //i.e. photography.nataionalgeographic.com would return nationalgeographic.com,
    // mysubdomain.mywebsite.co.uk would return mywebsite.co.uk.
    if (typeof window.location.siteName === 'undefined') {
       window.location.siteName = function (url) {
           var hostName = url || window.location.hostname,
               hostNamePosFromEnd;
           //Don't want any http:// or similar stuff.
           hostName = hostName.replace(/^\w+?:\d*?\/\//, '');
           
           //Drop any path info from url.
           hostName = hostName.split('/')[0];
           hostName = hostName.split('.');
           hostNamePosFromEnd = (hostName.length >= 2) ? ((hostName[hostName.length - 2].length === 2) ? 3 : 2) : 1;
           while (hostName.length > hostNamePosFromEnd) {
               hostName.shift();
           }
           return hostName.join('.');
       };
    }
     
    if (typeof String.prototype.trim === 'undefined') {
       String.prototype.trim = function () {
           return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
       };
    }
})(window, document, window.jQuery);
