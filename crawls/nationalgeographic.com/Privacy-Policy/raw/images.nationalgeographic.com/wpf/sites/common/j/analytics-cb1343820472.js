if (!window.jQuery || !jQuery.fn.delegate) {
    var jq = document.createElement('script'),
        jqS = document.body || document.head || document.documentElement;
    jq.async = true;
    if (jq.addEventListener) {
            jq.addEventListener('load', function () {
            jqReady(window, document, jQuery, analytics);
            })
    } else if (jq.onreadystatechange !== undefined) {
    // Added for IE8 otherwise it won't know that we're ready
        jq.onreadystatechange = function () {
            if (this.readyState === 'loaded') {
                jqReady(window, document, jQuery, analytics);
            }
        } 
    }
    jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    jqS.appendChild(jq);
} else {
    jQuery(document).ready(function() {
        jqReady(window, document, jQuery, analytics);
    });
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

jqReady = function (window, document, $, a) {
    'use strict';

    var debug = !!window.location.search.match('debug'),
        log  = function (msg) {
            if (debug) {
                if (window.console && window.console.log) {
                    window.console.log(msg);
                }
            }
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
        addScript = function (src, async) {
            var s = document.createElement('script');

            s.src = src;
            s.async = (async === undefined) ? true : async;
            root.insertBefore(s, root.childNodes[0]);
            return s;
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
    window._gaq.push(['_setAccount', 'UA-28236326-1'],
                     ['_setDomainName', window.location.siteName()],
                     ['_setAllowLinker', true],
                     ['_addIgnoredRef', 'nationalgeographic']);
    (function(){
        var vidTitleElem = document.getElementById('natgeov-vtitle'),
            vidTitle = (vidTitleElem) ? (vidTitleElem.textContent || vidTitleElem.innerText) : undefined;
        if (vidTitle) {
            log('_setCustomVar, 4, videoTitle, ' + vidTitle);
            window._gaq.push(['_setCustomVar', 4, 'videoTitle', vidTitle]);
        }
    }());
    for (i = a.ga._gaEarlyQ.length - 1; i >= 0; i--) {
        log(a.ga._gaEarlyQ[i]);
        window._gaq.push(a.ga._gaEarlyQ[i]);
    }
    if (window.isAuthenticated) {
        log('_setCustomVar, 3, isLoged, true ,2');
        window._gaq.push(['_setCustomVar',3,'isLoged','true',2]);
    }
    //The ga.trackPageViewItem in the analytics object allows custom attributes to be passed to the _trackPageView method.
    window._gaq.push(a.ga.trackPageViewItem || ['_trackPageview']);
    log(window._gaq);
    gaScript = addScript((isHTTPS ? "https://ssl" : "http://www") + '.google-analytics.com/ga.js');

    // Downloads
    $(function () {
        $('#container').delegate('a', 'click', function (e) {
            var $this = $(this),
                //Shortcircut flag for determining if a link is a download, but can't count on it.
                isDownload = $this.hasClass('download'),
                downloadType = '';
            if ($this.hasClass('pdf') || $this.attr('href').match('.pdf')) {
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
                window._gaq.push(['_trackEvent', 'engage', 'download: ' + downloadType, $(this).attr('title') || document.title]);
            }
        });
    }());

    //Event Tracking
    $('document').ready(function () {
        //Outbound links
        $('body').delegate('a[href^="http"]:not([href*="' + window.location.siteName() + '"])', 'click', function (e) {
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
                    'customersvc.com'
                ],
                targetA = this;
            //NatGeo TLDs
            if ($.inArray(siteName(targetA.href), natGeoDomains) >= 0) {
                window._gaq.push(['_link', targetA.href]);
            //Third Party TLDs
            } else {
                window._gaq.push(['_trackEvent', 'engagement', 'outbound-click', targetA.title || window.location.siteName(targetA.href)]);
            }
        });

        //Nav Events
        (function () {
            $('#navigation_tophat_primary').delegate('a', 'click', function (e) {
                var $this = $(this),
                    $thisParentNav = $this.parentsUntil('#navigation_tophat_primary', '#navigation_tophat_primary > li').eq(0),
                    parentNav = $thisParentNav.children('span').eq(0).text();

                //this is for clicks on subnav items
                if ($thisParentNav.length) {
                    log("_trackEvent, main-nav, " + parentNav + ", " + $this.text());
                    window._gaq.push(['_trackEvent', 'main-nav', parentNav, $this.text()]);

                //clicks on primary nav items.
                } else {
                    log("'_trackEvent', main-nav, home, " + $this.text());
                    window._gaq.push(['_trackEvent', 'main-nav', 'home', $this.text()]);
                }
            });
        }());


        //Module Events

        //Social Connect Engagement
        (function () {
            $('#connect_with_us, .connect_ng').delegate('a', 'click', function(e) {
                var service = window.location.siteName($(this).attr('href')).split('.')[0];
                log('_trackEvent, social, outbound-click, ' + service);
                window._gaq.push(['_trackEvent', 'social', 'outbound-click', service]);
            });
        }());

        //Newsletter Engagemet
        (function () {
            var trackNewsletterEngagement = function (id) {
                var section = document.location.pathname.split('/')[1]; //cus pathname starts with "/"
                log('_trackEvent, engage, newsletter,' + section + ':newsletter_' + id);
                window._gaq.push(['_trackEvent', 'engage', 'newsletter', section + ':newsletter_' + id]);
            };
            //Flyout
            $('#newsletter_flyout_form').delegate('[type="submit"]', 'click', function () {
                var $this = $(this),
                    $form = $this.parents('form').eq(0),
                    newsletterID = $form.find('[name="newsletter"]').eq(0).attr('value');

                trackNewsletterEngagement(newsletterID);
            });
            //newsletter close
            $('body').delegate('div.dod_close, .no_flyout', 'mousedown', function (e) {
                var $this = $(this),
                    closeType = $this.hasClass('no_flyout') ? 'no_flyout' : 'close';

                trackNewsletterEngagement(closeType);
            });

            //Right Rail Module
            $('.newsletter_signup').delegate('[value="submit"]', 'click', function () {
                var $this = $(this),
                    $form = $this.parents('form').eq(0),
                    newsletterID = $form.find('[name="newsletter"]').eq(0).attr('value');

                trackNewsletterEngagement(newsletterID);
            });

            //This handles a custom "newsletterSignup" event which is fired on a successfull ajax resonse from the newsletter submit action.
            $('form[id^="newsletters_signup"], form#newsletter_flyout_form').bind('newsletterSignup', function(e) {
                log([['_setAccount', 'UA-28236326-1'],
                    ['_setDomainName', 'nationalgeographic.com'],
                    ['_setAllowLinker', true],
                    ['_setCustomVar', 2, 'isSubscriber-Email', 'true', 1],
                    ['_trackPageview', e.url]]);
                window._gaq = window._gaq || [];
                window._gaq.push(['_setAccount', 'UA-28236326-1'],
                    ['_setDomainName', 'nationalgeographic.com'],
                    ['_setAllowLinker', true],
                    ['_setCustomVar', 2, 'isSubscriber-Email', 'true', 1]);
                window._gaq.push(['_trackPageview', e.url]);
            });
        }());

        //Email Registration Test Events
        (function () {
            $('#eregtest').live('Displayed', function (e) {
                // Determine section names
                var section = document.location.pathname.split('/')[1];
                if (section === '' || section === ' ') {
                    section = 'Home';
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
                }

                // Push the custom variable
                log('_setCustomVar, 7, Reg-wall-section, '+section + '-1st-hit, 2');
                window._gaq.push(['_setCustomVar', 7, 'Reg-wall-section', section + '-1st-hit', 2]);

                // Record the modal display event
                log('_trackPageview, Reg-wall-view ');
                window._gaq.push(['_trackPageview', 'Reg-wall-view ']);
            });

            $('#eregtest').live('Privacy_Link', function (e) {
                log('_trackEvent, Reg-wall-section, click, privacy-policy');
                window._gaq.push(['_trackEvent', 'Reg-wall-section', 'click', 'privacy-policy']);
            });

            $('#eregtest').live('TOS_Link', function (e) {
                log('_trackEvent, Reg-wall-section, click, terms-service');
                window._gaq.push(['_trackEvent', 'Reg-wall-section', 'click', 'terms-service']);
            });

            $('#eregtest').live('Explanation_Link', function (e) {
                log('_trackEvent, Reg-wall-section, click, whats-this');
                window._gaq.push(['_trackEvent', 'Reg-wall-section', 'click', 'whats-this']);
            });

            $('#eregtest').live('Email_Reg_Button', function (e) {
                log('_trackEvent, Reg-wall-section, click, join-now');
                window._gaq.push(['_trackEvent', 'Reg-wall-section', 'click', 'join-now']);
            });
        }());

        //Packaged Homepage Module GA Events
        (function () {
            var $home = $('body.homepage'),
                $DLModule = $home.find('#content_top'),
                $DL = $DLModule.find('.dl'),
                $sideMods = $DLModule.find('.secondary .promo_collection'),
                $pod = $sideMods.eq(0),
                $featuredVideo = $sideMods.eq(1),
                $homeContent = $home.find('#content_mainA'),
                $homeRR = $home.find('#content_mainB');

            //This should only target the <a> around the DL image.
            $DL.delegate('a', 'click', function (e) {
                var $this = $(this),
                    $thisLI = $this.parentsUntil('.dl > ul').eq(0),
                    isDLNav = ($thisLI.length) ? $thisLI.parent().hasClass('dl_navigation') : false,
                    index = $thisLI.index() + 1;

                //Should only be dealing with links inside lists.
                if ($thisLI.length) {
                    //Dl Nav
                    if (isDLNav){
                        log(['_trackEvent', 'DL', 'DLNav', 'HPDL' + $this.text() + '_HPMod']);
                        window._gaq.push(['_trackEvent', 'DL', 'DLNav', 'HPDL' + $this.text() + '_HPMod']);
                    //DL Image
                    } else {
                        log(['_trackEvent', 'DL', 'DLImage', 'DLMain Image' + index + '_HPMod']);
                        window._gaq.push(['_trackEvent', 'DL', 'DLImage', 'DLMain Image' + index + '_HPMod']);
                    }
                //Direct parent of More link is a <p>.
                } else if ($this.parent('.action')[0]) {
                    log($this.parent('.action')[0]);
                    window._gaq.push(['_trackEvent', 'DL', 'DLMore', 'DLMore_HPMod']);
                }
            });
            $pod.delegate('a', 'click', function (e) {
                log($(this));
                window._gaq.push(['_trackEvent', 'Module', 'DLSide1', 'POD_HPMod']);
            });
            $featuredVideo.delegate('a', 'click', function (e) {
                log('_trackEvent, Module, DLSlide2, FeaturedContent RL_HPMod ');
                window._gaq.push(['_trackEvent', 'Module', 'DLSlide2', 'FeaturedContent RL_HPMod ']);
            });
            $homeContent.delegate('a', 'click', function (e) {
                var $this = $(this),
                    $thisModule = $this.parents('.promo_collection').eq(0),
                    moduleClassList = $thisModule.attr('class').split(' ');

                if ($.inArray('news_stories', moduleClassList) >= 0) {
                    log(['_trackEvent', 'Module', 'LeftUDL', 'DailyNews_HPMod']);
                    window._gaq.push(['_trackEvent', 'Module', 'LeftUDL', 'DailyNews_HPMod']);
                } else if ($.inArray('vcalendar', moduleClassList)) {
                    log(['_trackEvent', 'Module', 'RightUDL', 'TV_HPMod']);
                    window._gaq.push(['_trackEvent', 'Module', 'RightUDL', 'TV_HPMod']);
                }
            });
            /*
            $homeRR.delegate('a', 'click', function (e) {
                var $this = $(this),
                    $thisModule = $this.parents('.promo_collection').eq(0),
                    moduleClassList = $thisModule.attr('class').split(' ');
                log('clicked in rr');
                if ($.inArray('links_list', moduleClassList) && $.inArray('small', moduleClassList)) {
                    log($thisModule);
                    if ($thisModule.find('h3.title').text('Travel With Us')) {
                        log($thisModule);
                        window._gaq.push(['_trackEvent', 'Module', 'RightRLTra', 'TravelWithUs_HPMod']);
                    } else if ($thisModule.find('h3.title').text('Newsletters')) {
                        log($thisModule);
                        window._gaq.push(['_trackEvent', 'Module', 'RightRLNewsltr', 'Newsletter_HPMod']);
                    }
                }
            });*/
        }());

        //Packaged News Article Module GA Events
        (function () {
            var $news = $('body.news.article').eq(0),
                $modules = $news.find('.most-popular-news, .great-energy-challenge-blog, .news-video, .news-blogs');
            
            $modules.delegate('a', 'click', function (e) {
                var $this = $(this),
                    $thisModule = $this.parents('.most-popular-news, .great-energy-challenge-blog, .news-video, .news-blogs').eq(0);

                if ($thisModule.hasClass('most-popular-news')) {
                    log($thisModule);
                    window._gaq.push(['_trackEvent', 'Module', 'RightRLNewsDL', 'MostPopNews_NewsMod']);
                } else if ($thisModule.hasClass('great-energy-challenge-blog')) {
                    log($thisModule);
                    window._gaq.push(['_trackEvent', 'Module', 'RightRLNews1', 'GEC_NewsMod']);
                } else if ($thisModule.hasClass('news-video')) {
                    log($thisModule);
                    window._gaq.push(['_trackEvent', 'Module', 'LeftRLNews2', 'NewsVideos_NewsMod']);
                } else if ($thisModule.hasClass('news-blogs')) {
                    log($thisModule);
                    window._gaq.push(['_trackEvent', 'Module', 'RightRLNews2', 'NewsBlogs_NewsMod']);
                }
            });
        }());

        //Video Modules
        (function () {
            var $modules = $('#content_mainB').find('[class*="video"]');
            $('#content_mainB .videos').delegate('a', 'click', function () {
                var $this = $(this),
                    $thisModule = $this.parentsUntil('.tabs-content').find('[class*="video"]').eq(0),
                    moduleName;

                if ($thisModule.hasClass('featured-video')) {
                    moduleName = 'FeaturedVideo';
                } else if ($thisModule.hasClass('latest-video')) {
                    moduleName = 'LatestVideo';
                }
                window._gaq.push('_trackEvent', 'Module', 'RightRLVideo', moduleName);
            });
        }());

        //video tracking
        var videoDuration;  //Used for Video Tracking progress tracking
        (function () {
            $('#ngplayer').live('Ready Start Play Pause Progress Complete', function (e) {
                if (e.type === 'Ready') {
                    videoDuration = e.value;
                    log(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
                    window._gaq.push(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
                } else if (e.type === 'Progress') {
                    var percentageViewed = (e.value)/100;
                    var timeInSec = Math.floor(videoDuration * percentageViewed);
                    log(['_trackEvent', 'video', e.type, 'Video complete ' + e.value + '%']);
                    window._gaq.push(['_trackEvent', 'video', e.type, 'Video complete ' + e.value + '%']);
                } else {
                    log(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
                    window._gaq.push(['_trackEvent', 'video', e.type, $('#natgeov-vtitle').text().trim()]);
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
                    log('_trackEvent, engagement, scrolled past topHat', url);
                    win._gaq.push(['_trackEvent', 'engagement', 'scrolled past ' + trackAt.topHat, url]);
                } else if (!isTracked.engagementA && percentScroll > trackAt.engagementA) {
                    isTracked.engagementA = true;
                    log('_trackEvent, engagement, scrolled past ' + (trackAt.engagementA * 100) + '%', url);
                    win._gaq.push(['_trackEvent', 'engagement', 'scrolled ' + (trackAt.engagementA * 100) + '%', url]);
                } else if (!isTracked.engagementB && percentScroll > trackAt.engagementB) {
                    isTracked.engagementB = true;
                    log('_trackEvent, engagement, scrolled past ' + (trackAt.engagementB * 100) + '%', url);
                    win._gaq.push(['_trackEvent', 'engagement', 'scrolled ' + (trackAt.engagementB * 100) + '%', url]);
                }
            });
        }(document, window, undefined));

        //Bounce modification
        (function (sec) {
            var url = document.location.pathname + document.location.search,
                bounce = window.setTimeout(function () {
                    log('_trackEvent, engagement, Dwell time (more than ' + sec + ' seconds), ' + url);
                    window._gaq.push(['_trackEvent', 'engagement', 'Dwell time (more than ' + sec + ' seconds)', url]);
                }, sec * 1000);
            }(20));
    
    });
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
