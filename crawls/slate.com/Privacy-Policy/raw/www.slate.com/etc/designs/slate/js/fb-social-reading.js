var SG = SG || {
    FBSR:function(){
        //static fbUid. This value is cached locally in multiple locations, but 
        //I wanted to add something global. This is set in docuemnt.ready @ eof
        //
        //I just discovered that FB.getUserID() will pull the current user id 
        //from cache. All the passing around of different Facebook User IDs is
        //totally unnecessary and should be cleaned up.
        this.fbUid;
    }
};
var clog = function(msg) {
    if (typeof console == "object") {
        console.info(msg);
    }
};
SG.config = {
        PAGE_SIZE : 5,
        getUserAPI : "http://my.slate.com/users/api/v1/user/?format=jsonp",
        newUserAPI : "http://my.slate.com/reads/add_user/",
        updateUserAPI : "http://my.slate.com/reads/update_user/",
        myReadsAPI : "http://my.slate.com/reads/list_reads/",
        friendReadsAPI : "http://my.slate.com/reads/list_friend_reads/",
        addReadAPI : "http://my.slate.com/reads/add/",
        deleteReadAPI : "http://my.slate.com/reads/delete/",
        isUser : null,
        srCookieName : $.cookie("wapo_login_id") + "-SR",
        snCookieName : $.cookie("wapo_login_id") + "-SN",
        fbUserCookieName : "fb_uid",
        SR : "social_reading",
        SRE : "social_reading_enabled",
        SRN : "social_reading_notifications",
        GRAPH_BASE : "http://graph.facebook.com/",
        PROFILE_BASE : "http://www.facebook.com/profile.php?id=",
        //note: a value of -1 gets passed in a hash at certain times this causes
        //a bug were the full Identity login gets loaded into the small, FB pop-
        //up. Making sure it's stripped out. 
        slateFBLoginURL : wapoEnv.wapo_reg_url + window.location.href.replace(window.location.hash, '') +
        "&providerSpecific=fbOnly"+
        "&KeepThis=true"+
        "&TB_iframe=true"+
        "&height=150"+
        "&width=300"+ 
        "&modal=true&" + 
        wapoEnv.param_name_previous_url + "=" + window.location.href.replace(window.location.hash, '')
};
SG.fbLoginManager = {
    fbConfig : {
        fbSocialReading : null,
        fbNotify : null,
        fbUserId : null
    },
    load : function() {
        clog("[fbLoginManager load] SG.Wrapper: ");
        clog(SG.FBWrapper);
        if (typeof SG.FBWrapper !== 'undefined') {
            clog("[fbLoginManager load] SG.Wrapper checked. Load UI.");
            SG.FBWrapper.loadUid(function(){
            clog("[fbLoginManager load] loginStatus: " + SG.FBWrapper.loginStatus.status);
            if (SG.FBWrapper.loginStatus.status == "connected") {
                clog("[fbLoginManager load] FB.getLoginStatus is connected");
                clog("[fbLoginManager load] triggering EVENT loginManagerLoaded");
                SG.fbUIController.switchToLoginView();

                //this trigger doesn't seem to fire on first sign in, putting
                //those steps here instead of a handler
                //$(document).trigger("loginManagerLoaded");
                if ($("meta[property=\"og:type\"]").attr("content") == "article") {
                    var d = new Date().toLocaleTimeString();
                    clog("[EVENT loginManagerLoaded] Trigger read after 10 seconds from " + d);
                    //Trigger read after 10 seconds
                    setTimeout(function(){
                        var d = new Date().toLocaleTimeString();
                        clog("[SG.wapoFBAsyncLoad load] Triggering read at " + d);
                        if (SG.fbLoginManager.isReady()) {
                            SG.FBWrapper.read();
                        }
                    }, 10000);
                }


            } else if (SG.FBWrapper.loginStatus.status == "other_user") {
                clog("WARNING: [fbLoginManager load] other user logged into FB.");
                SG.fbUIController.switchToLogoutView();
            } else {
                clog("WARNING: [fbLoginManager load] Unexpected Status.");
                SG.fbUIController.switchToLogoutView();
            }
        }, true);
        } else {
            clog("WARNING: [fbLoginManager load] SG.FBWrapper not loaded.");
            setTimeout(function (){SG.fbLoginManager.load()}, 2000);
        }
    },
    loadTabs : function() {
        this.loadFriendsActivity();
        this.loadMyReads();
        this.loadMySettings();
    },
    loadFriendsActivity : function() {
        if($("#sb_friendsreds").length) {
            this.updateFriendsActivityHtml();
        }
    },
    updateFriendsActivityHtml : function () {
        clog('[fbLoginManager updateFriendsActivityHtml]');
        clog('[AJAX REQUEST]\n' + SG.config.friendReadsAPI);
        $.ajax({url : SG.config.friendReadsAPI,
            type : "GET",
            dataType : "jsonp",
            success : function(res){
                var articles = [];
                clog("[fbLoginManager updateFriendsActivityHtml] friendReadsAPI request successful. Data:");
                clog(res);
                
                if(res.data && typeof res.data.friend_reads !== 'undefined'){
                    for (var i=0; i<res.data.friend_reads.length; i++){
                        articles.push(res.data.friend_reads[i]);
                    }
                }
                else{
                    clog("WARNING [fbLoginManager updateFriendsActivityHtml] AJAX CB: prop friends_reads does not exist.");
                }
                
                SG.fbLoginManager._displayArticles(articles);
            },
            error : function () {
                clog("ERROR: [fbLoginManager updateFriendsActivityHtml] Error in getting friends read API..");
            }
        });
    },
    _displayArticles: function (articles) {
        $readsDiv = $("#sb_friendsreds_content");
        $readsDiv.html("");
        for (var i=0; i<articles.length; i++) {
            $readsDiv.append(this._articleHtml(articles[i]));
        }
        if ($readsDiv.html() == "") {
            $readsDiv.html("<div class='no-activity fb-myreads-item'>No friends' activity yet.</div>");
        }
    },
    _articleHtml: function(article) {
        var content = "";
        var count;
        for (var i=0; i<article.friends.length; i++) {
            count = i;
            if (i == 0) {
                var reader = article.friends[i];
                var readerProfile = (reader.fb_uid == undefined) ? "" : SG.config.PROFILE_BASE + reader.fb_uid;
                content += "<div class='fb-freads-item-left'>"+
                "<a href='"+ readerProfile + "'><img src='" + SG.config.GRAPH_BASE + reader.fb_uid + '/picture' +  
                "' /></a></div>" +  "<div class='fb-freads-item-right'><a href='"+
                readerProfile + "'>" + reader.display_name + "</a>";
            }
        }
        if (count == 1) {
            var readerProfile = (article.friends[count].fb_uid == undefined) ? "" : SG.config.PROFILE_BASE + article.friends[count].fb_uid;
            content += " and <a href='"+ readerProfile + "'>" +
            article.friends[count].display_name + "</a> ";
        } else  if (count > 1) {
            content += " and "+ count +" others ";
        }
        return "<div class='fb-freads-item'>" + content  + " read " +
            "<a href='" + article.article.url + "'>" + article.article.hed + "</a></div>"+
            "<div class='clearing' ></div></div>";
    },
    loadMyReads : function() {
        if($("#sb_myreads").length) {
            this.updateMyReadsHtml('/me/news.reads?access_token=' +
                    SG.FBWrapper.accessToken + '&limit=' + SG.config.PAGE_SIZE, true);
        }
    },
    loadMySettings : function () {
        if (SG.fbLoginManager.fbConfig.fbNotify == "true") {
            clog("[fbLoginManager loadMySettings] fbNotify is true, check the box.");
             $('#fb_notify_cb').attr('checked', true);
        } else {
            clog("[fbLoginManager loadMySettings] fbNotify is false");
        }
    },
    updateMyReadsHtml : function(pageUrl, isFirst) {
        clog('[fbLoginManager updateMyReadsHtml]');
        clog('[FB AJAX REQUEST]\nFB.api("' + pageUrl + '")');
        var baseReadUrl = '/me/news.reads';
        FB.api(pageUrl, 'get',
                function(response) {
                clog("[FB AJAX READS RESPONSE]");
                clog(response);
                var prevEl = $("#sb_myreads_prev");
                var nextEl = $("#sb_myreads_next");
                //If valid page then only load.
                if (response.data.length > 0) {
                var myReadContent = '';
                for(var i=0; i<response.data.length; i++) {
                    var obj = response.data[i];
                    if(obj.data != undefined) {
                        clog('[fbLoginManager updateMyReadsHtml] obj.data:');
                        clog(obj.data);
                        var iDiv = $(document.createElement('div'));
                        var oDiv = $(document.createElement('div'));
                        oDiv.addClass("fb-myreads-item");
                        var lDiv = $(document.createElement('div'));
                        lDiv.addClass("fb-myreads-item-left");
                        var itemLink = $(document.createElement('a'));
                        itemLink.attr("href", obj.data.article.url);
                        itemLink.attr("ref", "fb_sb_my_reads");
                        itemLink.html(obj.data.article.title);
                        lDiv.append(itemLink);
                        var rDiv = $(document.createElement('div'));
                        rDiv.addClass("fb-myreads-item-right");
                        var xLink = $(document.createElement('a'));
                        xLink.addClass("myreads-x hand-cursor");
                        xLink.attr("id", "mx_" + obj.id);
                        xLink.attr("ref", obj.data.article.url);
                        rDiv.append(xLink);
                        var cDiv = $(document.createElement('div'));
                        cDiv.addClass("clearing");
                        oDiv.append(lDiv).append(rDiv).append(cDiv);
                        iDiv.append(oDiv);
                        myReadContent += iDiv.html();
                    }
                }
                $("#sb_myreads_content").html(myReadContent);
                if ($(".myreads-x")) {
                    SG.FBWrapper.bindXClick($(".myreads-x"));
                }
                if (typeof response.paging.previous !== 'undefined') {
                    prevEl.unbind("click");
                    prevEl.removeClass("link-disabled");
                    prevEl.click(function(){
                        /* necessary? not sure why we need to parse the perfectly-good
                         * previous URL we get from FB.api
                         
                        var prevUrl = baseReadUrl + "?access_token=" +
                        SG.FBWrapper.accessToken + "&" + response.paging.previous.
                        substring(response.paging.previous.indexOf("offset")) +
                        '&limit=' + SG.config.PAGE_SIZE;
                        clog("previous page---"  + prevUrl);
                        *
                        * note: prevUrl was passed as updateMyReadsHtml's arg
                        */
                        
                        SG.fbLoginManager.updateMyReadsHtml(response.paging.previous);
                    });
                } else {
                    prevEl.addClass("link-disabled");
                }
                if (typeof response.paging.next !== 'undefined') {
                    if (response.data.length < SG.config.PAGE_SIZE) {
                        //Disable the next button
                        nextEl.addClass("link-disabled");
                    } else {
                        nextEl.unbind("click");
                        nextEl.removeClass("link-disabled");
                        nextEl.click(function(){
                            /* necessary? not sure why we need to parse the perfectly-good
                             * next URL we get from FB.api
                         
                            var nextUrl = baseReadUrl + "?access_token=" +
                            SG.FBWrapper.accessToken + "&" + response.paging.next.
                            substring(response.paging.next.indexOf("offset")) +
                            '&limit=' + SG.config.PAGE_SIZE;
                            clog("nextUrl page---"  + nextUrl);
                            *
                            * note: nextUrl was passed as updateMyReadsHtml's arg
                            */
                            SG.fbLoginManager.updateMyReadsHtml(response.paging.next);
                        });
                    }
                } else {
                    nextEl.addClass("link-disabled");
                }
                } else {
                    if ((typeof isFirst !== 'undefined') && isFirst) {
                        var iNoDiv  = $(document.createElement('div'));
                        var noDiv = $(document.createElement('div'));
                        noDiv.addClass("fb-myreads-item");
                        noDiv.html('You haven\'t read anything yet.');
                        iNoDiv.append(noDiv);
                        $("#sb_myreads_content").html(iNoDiv.html());
                    } else {
                        //This is supposed to happen when the next page has no data
                        nextEl.addClass("link-disabled");
                    }
                }
            });
        //TODO: May be later we implement it    
        /*
         * not sure what this was going to be. could be useful?
         *
        clog('[fbLoginManager updateMyReadsHtml]');
        clog('[AJAX REQUEST]\n' + SG.config.myReadsAPI);
        $.ajax({url : SG.config.myReadsAPI,
                type : "GET",
                dataType : "jsonp",
                success :  function(res){
                    clog("[fbLoginManager updateMyReadsHtml] myReadsAPI call successful. Data:");
                    clog(res);
                    if (res.success && (res.data != null)) {
                        clog("[fbLoginManager updateMyReadsHtml] Read records found.");
                    } else {
                        clog("[fbLoginManager updateMyReadsHtml] Read records not found.");
                    }
                },
                error : function () {
                    clog("ERROR [fbLoginManager updateMyReadsHtml] myReadsAPI call failed.");
                }
            });
            */
    },
    loadFromCookie : function() {
        clog("[fbLoginManager loadFromCookie] " + SG.config.srCookieName + " = " + $.cookie(SG.config.srCookieName));
        SG.fbLoginManager.fbConfig.fbSocialReading = $.cookie(SG.config.srCookieName);
        SG.fbLoginManager.fbConfig.fbNotify = $.cookie(SG.config.snCookieName);
        //SG.fbLoginManager.fbConfig.fbUserId = SG.FBSR.fbUid = $.cookie(SG.config.fbUserCookieName);//NEW, STATIC FB UID
        clog("srFlag::" + SG.fbLoginManager.fbConfig.fbSocialReading + "-srnFlag::" + SG.fbLoginManager.fbConfig.fbNotify);
        if ($.cookie("sr_settings_loaded") == "true") {
            SG.config.isUser = true;
        }
        if (SG.fbLoginManager.fbConfig.fbSocialReading != null) {
            clog("Load() from loadFromCookie");
            SG.fbLoginManager.load();
        } else {
            SG.fbUIController.switchToDisabled();
        }
    },
    loadFromServer : function (isFBUser) {
        clog("[fbLoginManager loadFromServer] wapo_login_id cookie value is: " + $.cookie('wapo_login_id'));
        clog("[fbLoginManager loadFromServer] wapo_provider cookie value is: " + $.cookie('wapo_provider'));
        clog("[AJAX REQUEST]\n" + SG.config.getUserAPI);
        var self = this;
        $.ajax({url : SG.config.getUserAPI,
            type: 'GET',
            dataType : 'jsonp',
            success: function(d){
                clog('[fbLoginManager loadFromServer] getUserAPI request successful. Data:');
                clog(d);
                /*try{
                    SG.FBSR.fbUid = d.objects[0].fb_uid;//NEW, STATIC FB UID
                }catch(e){
                    clog('WARNING: [fbLoginManager loadFromServer] setting SG.FBSR.fbUid failed. : ' + e);
                    SG.FBSR.fbUid = null;//NEW, STATIC FB UID
                }*/
                
                if(isFBUser){
                    self.forceActivate(d)
                }
                else{
                    self.getUserCB(d)
                }
            },
            error: function(request, settings){
                    clog('ERROR [fbLoginManager loadFromServer] getUserAPI request failed. Request & Settings:');
                    clog(request);
                    clog(settings);
            }
        });
    },
    forceActivate : function(res){
        clog("[fbLoginManager forceActivate]DATA:");
        clog(res);
        if ((res.objects != undefined) && (res.objects.length > 0)) {
            SG.config.isUser = true;
            clog("[fbLoginManager forceActivate] 'res' arg has objects property. Process with enableReading(false,res.uid)");
            SG.fbLoginManager.enableReading(false, res.objects[0]['fb_uid']);
        } else {
            clog("[fbLoginManager forceActivate] could not get fb_uid from getUserAPI. Trying FB.getLoginStatus.");
            //hit the API to get FB id
            setTimeout(function(){
                clog('[fbLoginManager forceActivate]');
                clog('[FB AJAX REQUEST]\nFB.getLoginStatus(...)');
                FB.getLoginStatus(function(response){
                    clog('[fbLoginManager forceActivate] FB.getLoginStatus response:');
                    clog(response);                    
                    if (response.status === 'connected') {
                        clog("[fbLoginManager forceActivate] Already FB-connected as: "+response.authResponse.userID);
                        clog("[fbLoginManager forceActivate] FB response.status = 'connected'. Process with enableReading(false,response.uid)");
                        //SG.FBSR.fbUid = response.authResponse.userID;//NEW, STATIC FB UID
                        SG.fbLoginManager.enableReading(false,response.authResponse.userID);
                    } else {
                        clog("[fbLoginManager forceActivate] Not FB-connected. See if auto_activate_FBSR cookie is true. If it is, try a refresh.\n\tIt's: " + $.cookie("auto_activate_FBSR"));
                        if ($.cookie("auto_activate_FBSR")) {
                            window.location.reload();
                        } else {
                            clog("[fbLoginManager forceActivate] auto_activate_FBSR is not true, don't refresh. Switch to logout view.");
                           SG.fbUIController.switchToLogoutView();
                        }
                    }
                 }, true);
                 }, 
            1000);
        }
    },
    getUserCB : function (res) {
        clog(res);
        if ((res.objects != undefined) && (res.objects.length > 0)) {
            var srFlag = res.objects[0][SG.config.SR];
            var sreFlag = res.objects[0][SG.config.SRE];
            var srnFlag = res.objects[0][SG.config.SRN];
            var fbUid = res.objects[0][SG.config.fbUserCookieName];
            SG.config.isUser = true;
            clog("srFlag::" + srFlag + "-sreFlag::" + sreFlag +
                    "-srnFlag::" + srnFlag);
            if (srFlag) {
                if (sreFlag) {
                    clog("From server :: SR on");
                    SG.fbLoginManager.setCookie(SG.config.srCookieName, "true");
                } else {
                    clog("From server :: SR off");
                    SG.fbLoginManager.setCookie(SG.config.srCookieName, false);
                }
                if (srnFlag) {
                    //Notify on
                    SG.fbLoginManager.setCookie(SG.config.snCookieName, "true");
                } else {
                    //Notify off
                    SG.fbLoginManager.setCookie(SG.config.snCookieName, false);
                }
                SG.fbLoginManager.setCookie(SG.config.fbUserCookieName, fbUid);
                clog("Launching from server value...");
                SG.fbLoginManager.load();
            } else {
                //user exists but he/she disabled it.
                SG.fbUIController.switchToDisabled();
            }
            SG.fbLoginManager.setCookie("sr_settings_loaded", true);
        } else {
            clog("No existing record for user in GetAPI call for SR");
            SG.config.isUser = false;
            SG.fbLoginManager.setCookie("sr_settings_loaded", false);
            SG.fbUIController.switchToDisabled();
        }
    },
    enableReading : function(noLaunch, fbUid) {
        //showUi deprecated
        clog('[fbLoginManager enableReading]');
        clog('[AJAX REQUEST]\n' + SG.config.updateUserAPI + ' GET:');
        clog({
            social_reading : 1,
            social_reading_enabled : 1,
            social_reading_notifications : 1
        });
        //Add the reading to identity object
        if (SG.config.isUser) {
            $.ajax({url : SG.config.updateUserAPI,
                type : "GET",
                dataType : "jsonp",
                data : {social_reading : 1,
                    social_reading_enabled : 1,
                    social_reading_notifications : 1
                },
                success :  function(res){
                    clog('[fbLoginManager enableReading] updateUserAPI call successful. Data:');
                    clog(res);
                    //Show the notify cb on
                    $('#fb_notify_cb').attr('checked', true);
                    //move the state machine into 'on' state
                    SG.FBSR.sc.state.turnOn();
                    // Set Cookie
                    SG.fbLoginManager.setCookie(SG.config.srCookieName, "true");
                    SG.fbLoginManager.setCookie(SG.config.snCookieName, "true");
                    SG.fbLoginManager.setCookie(SG.config.fbUserCookieName, fbUid);
                    if (noLaunch===false) {
                        clog("[fbLoginManager enableReading] updateUserAPI successful and noLaunch===false. Set cookie sr_settins_loaded=true & call load().");
                        SG.fbLoginManager.setCookie("sr_settings_loaded", true);
                        SG.fbLoginManager.load();
                    }
                },
                error : function () {
                    clog('ERROR [fbLoginManager enableReading] updateUserAPI call failed.');
                }
            });
        } else {
            clog('[AJAX REQUEST]\n' + SG.config.newUserAPI);
            $.ajax({url : SG.config.newUserAPI,
                type : "GET",
                dataType : "jsonp",
                data : {fb_uid : fbUid},
                success :  function(res){
                    clog("[fbLoginManager enableReading] newUserAPI successful. Data:");
                    clog(res);
                    //Show the notify cb on
                    $('#fb_notify_cb').attr('checked', true);
                    //move the state machine into 'on' state
                    SG.FBSR.sc.state.turnOn();
                    // Set Cookie
                    SG.config.isUser = true;
                    SG.fbLoginManager.setCookie(SG.config.srCookieName, "true");
                    SG.fbLoginManager.setCookie("sr_settings_loaded", "true");
                    SG.fbLoginManager.setCookie(SG.config.fbUserCookieName, fbUid);
                    SG.fbLoginManager.load();
                    if (typeof showUi !== 'undefined' && showUi) {
                        clog('[fbLoginManager enableReading] newUserAPI successful, showUi != undefined && showUI. Calling switchToLoginView');
                        SG.fbUIController.switchToLoginView();
                    }
                },
                error : function () {
                    clog("[fbLoginManager enableReading] Error in setting reading API.");
                }
            });
        }
    },
    disableReading : function() {
        clog('[fbLoginManager disableReading]');
        clog('[AJAX REQUEST]\n' + SG.config.updateUserAPI);
        //Remove the reading to identity object
        $.ajax({ url : SG.config.updateUserAPI,
            data : {social_reading : 0},
            type : "GET",
            dataType : "jsonp",
            success : function(res){
                clog("[fbLoginManager disableReading] updateUserAPI request successful. Data:");
                clog(res);
                //move the state machine into 'off' state, flag true for total disablement
                SG.FBSR.sc.state.turnOff(true);
                // Remove Cookie
                SG.fbLoginManager.resetCookies();
            },
            error : function(res) {
                clog("[fbLoginManager disableReading] failed the disable reading API.");
            }
        });
    },
    resetCookies : function() {
        SG.fbLoginManager.setCookie(SG.config.srCookieName, null);
        SG.fbLoginManager.setCookie(SG.config.snCookieName, null);
        SG.fbLoginManager.setCookie(SG.config.fbUserCookieName, null);
        SG.fbLoginManager.setCookie("sr_settings_loaded", null);
    },
    turnOffReading : function() {
        //Remove the reading to identity object
        $.ajax({ url : SG.config.updateUserAPI,
            data : {social_reading_enabled : 0},
            type : "GET",
            dataType : "jsonp",
            success : function(res){
                clog("Inside turn off SRE function!");
                clog(res);
                // Remove Cookie
                //move the state machine into 'off' state
                SG.FBSR.sc.state.turnOff();
                SG.fbLoginManager.setCookie(SG.config.srCookieName, false);
            },
            error : function(res) {
                clog("failed the turn off reading API");
            }
        });
    },
    setNotifyOff : function () {
        clog('[fbLoginManager setNotifyOff]');
        clog('[AJAX REQUEST]\n' + SG.config.updateUserAPI);
         //call API to Set the notification off
         $.ajax({url : SG.config.updateUserAPI,
            type : "GET",
            dataType : "jsonp",
            data : {social_reading_notifications : 0},
            success :  function(res){
                    clog("Inside turn off notify function!");
                    clog(res);
                    // Set Cookie
                    SG.fbLoginManager.setCookie(SG.config.snCookieName, false);
            },
            error : function () {
                clog("Error in turn notify off API..");
            }
        });
    },
    setNotifyOn : function () {
         //call API to Set the notification off
        clog('[fbLoginManager setNotifyOn]');
        clog('[AJAX REQUEST]\n' + SG.config.updateUserAPI);
         $.ajax({url : SG.config.updateUserAPI,
            type : "GET",
            dataType : "jsonp",
            data : {social_reading_notifications : 1},
            success :  function(res){
                    clog("Inside turn on notify function!");
                    clog(res);
                    // Set Cookie
                    SG.fbLoginManager.setCookie(SG.config.snCookieName, "true");
            },
            error : function () {
                clog("Error in turn on notify API..");
            }
        });
   },
   setCookie : function(name, state) {
        //if (state == undefined) {state = "true";}
        clog("[fbLoginManager setCookie] " + name + " : " + state);
        $.cookie(name, state, {path : "/",
            domain:wapoEnv.site_base_domain});
        if (name == SG.config.srCookieName) {
            SG.fbLoginManager.fbConfig.fbSocialReading = state;
        } else if (name == SG.config.snCookieName) {
            SG.fbLoginManager.fbConfig.fbNotify = state;
        } else if (name == SG.config.fbUserCookieName) {
            SG.fbLoginManager.fbConfig.fbUserId = state;
        }
    },
    isReady : function() {
        if ($.cookie("wapo_login_id") && (this.fbConfig.fbSocialReading == "true")) {
            clog("ready to read..");
            return true;
        } else {
            clog("article reading is not enabled..");
            return false;
        }
    },
    loginToFB : function (cb, failCB) {
        clog("[fbLoginManager loginToFB]");
        clog('[FB AJAX REQUEST]\nFB.login()');
        FB.login(function(response) {
             if (response.authResponse) {
                 clog("[fbLoginManager loginToFB] Permission granted:");
                 clog(response.authResponse);
                 SG.FBWrapper.accessToken = response.authResponse.accessToken;
                 SG.FBWrapper.uid = response.authResponse.userID;
                 cb();
         } else {
             if (failCB != undefined) {
                 failCB();
             }
             clog("[fbLoginManager loginToFB] Permission denied.");
         }
        },
        {'scope' : 'publish_actions'});
    }
};
SG.wapoFBAsyncLoad = {
    init : function() {        
        if ($.cookie("wapo_login_id")) {
            $(document).bind("wapoFbAsyncInit", function() {
                clog("[wapoFBAsyncLoad init]");
                //if ($.cookie("sr_settings_loaded")) {
                //    clog("[wapoFBAsyncLoad init] loading from sr_settings_loaded cookie.");
                //    SG.fbLoginManager.loadFromCookie();
                //} else {
                    //clog("[wapoFBAsyncLoad init] sr_settings_loaded cookie does not exist.");
                    //If not found in cookie, hit the server
                    
                    //update:always hit the server
                    //clog("\n\nCOOKIE: "+$.cookie("auto_activate_FBSR")+"\n\n");
                    if ($.cookie("auto_activate_FBSR") == "true") {
                        clog("[wapoFBAsyncLoad init] auto_activate_FBSR exists.");
                        SG.fbLoginManager.setCookie("auto_activate_FBSR", null);
                        SG.fbLoginManager.loadFromServer(true);
                    } else {
                        clog("[wapoFBAsyncLoad init] auto_activate_FBSR does not exist.");
                        SG.fbLoginManager.loadFromServer(false);
                    }
                //}
            });
            /* not being fired when first loggin in. Moving into fbLoginManager.load()
            $(document).bind("loginManagerLoaded", function() {
                clog("[EVENT loginManagerLoaded] fired");
                if ($("meta[property=\"og:type\"]").attr("content") == "article") {
                    //var d = new Date().toLocaleTimeString();
                    //clog("[EVENT loginManagerLoaded] Trigger read after 10 seconds from " + d);
                    //Trigger read after 10 seconds
                    setTimeout(function(){
                       // var d = new Date().toLocaleTimeString();
                        //clog("[SG.wapoFBAsyncLoad init] Triggering read at " + d);
                        if (SG.fbLoginManager.isReady()) {
                            SG.FBWrapper.read();
                        }
                    }, 10000);
                }
            });*/
            SG.fbUIController.bindLogout(); 
        } else {
            SG.fbUIController.switchToDisabled();
        } 
    }
};
SG.fbUIController = {
        toggleToolbarIcon : function(state) {
            if (state == "on") {
                $(".fb-social-float-buttonOFF").hide();
                $(".fb-social-float-buttonON").show();
                $(".fb-social-top-buttonOFF").hide();
                $(".fb-social-top-buttonON").show();
                $(".fb-profile-pic-cls").show();
                $(".fb-social-bottom-buttonOFF").hide();
                $(".fb-social-bottom-buttonON").show();
                //$(".fb-wrapper").hide();
            } else {
                //Off case
                $(".fb-social-float-buttonON").hide();
                $(".fb-social-float-buttonOFF").show();
                $(".fb-social-top-buttonON").hide();
                $(".fb-social-top-buttonOFF").show();
                $(".fb-profile-pic-cls").hide();
                $(".fb-social-bottom-buttonOFF").show();
                $(".fb-social-bottom-buttonON").hide();
                /*if (state == null) {
                    $(".fb-wrapper").show();
                }*/
            }
        },
        bindEvents : function () {
            if ($("#enable_fb_reading").length || $(".enable_fb_reading_banner").length) {
                 $("#enable_fb_reading,.enable_fb_reading_banner").click(function(){
                     clog("[fbLoginManager bindEvents] Handling: $('#enable_fb_reading,.enable_fb_reading_banner').click()"); 
                    if ($.cookie("wapo_login_id")) {
                        clog("[fbUIController bindEvents] wapo_login_id cookie: " + $.cookie("wapo_login_id"));
						if(!$.cookie("wapo_provider") || $.cookie("wapo_provider") != "Facebook") {
							//and login again via FB
							SG.fbUIController.loginTOProceed(true);
						} else {
							//ask for permission
							SG.fbLoginManager.loginToFB(function(){
								clog("[fbLoginManager bindEvents] Callback to loginToFB. Process with enableReading(false,FBWrapper.uid)");
								SG.fbLoginManager.enableReading(false,SG.FBWrapper.uid);
							});
						}
                    } else {
                        //Login
                     clog("[fbUIController bindEvents] wapo_login_id does not exist. Assume logged out.");
                         SG.fbUIController.loginTOProceed();
                    }
                 });
                 $('#fb_notify_cb').click(function(){
                    if (this.checked) {
                        clog("setting notify on...");
                        SG.fbLoginManager.setNotifyOn();
                    } else {
                        clog("setting notify off...");
                        SG.fbLoginManager.setNotifyOff();
                    }
                 });
                $("#fb_sb_disable_btn").click(function(){
                    SG.fbLoginManager.disableReading();
                    SG.FBSR.sc.state.turnOff(true);
                });
                $("#fb_social_friends_reading").click(function () {
                    $(".social-fb-friends-readings").css("background-image",'url("/etc/designs/slate/images/friendsactivity_on.gif")');
                    $(".social-fb-my-readings").css("background-image",'url("/etc/designs/slate/images/myreads_off.gif")');
                    $(".social-fb-my-settings").css("background-image",'url("/etc/designs/slate/images/settings_off.gif")');
                    $(".social-fb-friendsreds").show();
                    $(".social-fb-myreads").hide();
                    $(".social-fb-settings").hide();
                });
                $("#fb_social_my_readings").click(function () {
                    $(".social-fb-friends-readings").css("background-image",'url("/etc/designs/slate/images/friendsactivity_off.gif")');
                    $(".social-fb-my-readings").css("background-image",'url("/etc/designs/slate/images/myreads_on.gif")');
                    $(".social-fb-my-settings").css("background-image",'url("/etc/designs/slate/images/settings_off.gif")');
                    $(".social-fb-friendsreds").hide();
                    $(".social-fb-myreads").show();
                    $(".social-fb-settings").hide();
                });
                $("#fb_social_reading_settings").click(function () {
                    $(".social-fb-friends-readings").css("background-image",'url("/etc/designs/slate/images/friendsactivity_off.gif")');
                    $(".social-fb-my-readings").css("background-image",'url("/etc/designs/slate/images/myreads_off.gif")');
                    $(".social-fb-my-settings").css("background-image",'url("/etc/designs/slate/images/settings_on.gif")');
                    $(".social-fb-friendsreds").hide();
                    $(".social-fb-myreads").hide();
                    $(".social-fb-settings").show();
                    $(".slb-rrw-fb-spacer").hide();
                });
            }
            if ($("#fb-friends-turn-off").length ||
                    $(".fb-sr-turn-off").length) {
                $("#fb-friends-turn-off, .fb-sr-turn-off").click(function(){
                     $(".fb-turn-off").show();
                     $(".fb-turn-on").hide();
                     // toolbar icons
                     SG.fbUIController.toggleToolbarIcon("off");
                     SG.fbLoginManager.turnOffReading();
                });
                $("#fb-friends-turn-on, .fb-sr-turn-on").click(function(){
                    clog("[fbLoginManager bindEvents] Handling: $('#fb-friends-turn-on, .fb-sr-turn-on').click()"); 
                    if (SG.fbLoginManager.fbConfig.fbSocialReading == null) {
                        $("#enable_fb_reading").click();
                    } else {    
                        clog("[fbLoginManager bindEvents] fbSocialReading != null. Process with enableReading(true,FBWrapper.uid)");
                        SG.fbLoginManager.enableReading(true, SG.FBWrapper.uid);
                        $(".fb-turn-on").show();
                        $(".fb-turn-off").hide();
                    }
                });
            }
        },
        switchToDisabled : function () {
            clog("[fbUIController switchToDisabled]");
            SG.FBSR.sc.state.turnOff();
            $("#fb_sb_head").show();
            $("#fb_sb_body").hide();
            $("#fb_sb_footer").show();
            SG.fbUIController.toggleToolbarIcon(null);
        },
        switchToLogoutView : function () {
            clog("[fbUIController switchToLogoutView]");
            SG.FBSR.sc.state.turnOff();
            $("#fb_sb_footer").show();
            //brought over from switchToLoginView when SR is Off
           // $(".fb-wrapper").show();
            $(".fb-turn-on").hide();
            $(".fb-turn-off").show();
            SG.fbUIController.toggleToolbarIcon("off");
            //rrail 
            $("#fb_sb_body").hide();
            $("#fb_sb_head").show();
        },
        switchToLoginView : function () {            
            clog("[fbUIController switchToLoginView]");
            clog("[fbUIController switchToLoginView] slate_avatar cookie: " + $.cookie('slate_avatar'))
            clog("[fbUIController switchToLoginView] auto_activate_FBSR cookie: " + $.cookie('auto_activate_FBSR'))
            //#providerPic & #helloPic is causing issues. Let's just hide it for now. 
            $('#providerPic, #helloPic').hide();
            
            if (SG.fbLoginManager.fbConfig.fbSocialReading == null) {
                clog("[fbUIController switchToLoginView] Social Reading is not enabled");
                SG.fbUIController.switchToDisabled();
                SG.fbUIController.toggleToolbarIcon(null);
            } else if (SG.fbLoginManager.fbConfig.fbSocialReading == "true") {
                clog("[fbUIController switchToLoginView] Social Reading is enabled.");
                SG.FBSR.sc.state.turnOn();
            } else {
                clog("[fbUIController switchToLoginView] Social Reading is Off");
                SG.FBSR.sc.state.turnOff();
            }
            if ($("#enable_fb_reading").length) {
                //There is SR box, load it
                SG.fbLoginManager.loadTabs();
            }

        },
        loginTOProceed : function(doLogout) {
            var doLogin = confirm('To enable Social Reading on Slate, log in to Slate using your Facebook account. Click "OK" to proceed.');
            if (doLogin) {
                SG.fbLoginManager.setCookie("auto_activate_FBSR", true);
                SG.config.srCookieName = $.cookie('wapo_login_id')+ "-SR";
                SG.config.snCookieName = $.cookie('wapo_login_id')+ "-SN";
                $(document).bind('wapoLogin', function() {
                    clog("[fbUIController loginTOProceed] wapoLogin fired.");
                    SG.fbLoginManager.loadFromServer(true);
                    SG.fbUIController.bindLogout();
                });
                clog('[fbUIController loginTOProceed] Open a Thickbox with Identity FB Login URL: ' + SG.config.slateFBLoginURL);
                tb_show("Login to Slate", SG.config.slateFBLoginURL, "nofollow");
            } else {
                clog("[fbUIController loginTOProceed] User cancelled the login.");
            }
        },
        bindLogout : function(){
            if (typeof logoutBinded === "undefined") {
                logoutBinded = function() {
                    clog("[fbUIController bindLogout] wapoLogout fired.");
                    SG.fbLoginManager.resetCookies();
                    SG.fbUIController.switchToDisabled();
                    SG.FBSR.sc.state.turnOff();
                };
                $(document).bind("wapoLogout", logoutBinded);
            }
        }
}
//IMPLEMENTING A STATE MACHINE TO SYNC ALL BUTTONS
//INSTANTIATED IN [wapoFBAsyncLoad init]
SG.FBSR.StateController = function(){
    clog('[SG.FBSR.StateController Instantiated]');
    this.FBSR_STATE_CHANGED = "fbsrStateChanged";
    this.on = new SG.FBSR.OnState(this);
    this.off = new SG.FBSR.OffState(this);
    this.idle = new SG.FBSR.IdleState(this);
    this.state = null;

    //default state
    this.setState(this.idle);
}
SG.FBSR.StateController.prototype.setState = function(s){
    clog('[SG.FBSR.StateController setState] ' + s.name);
    clog(s);
    var that = this;
    this.state = s;
    
    //DISPATCH EVENT
    Dispatcher.fbsrStateChanged.deliver({
        type:this.FBSR_STATE_CHANGED,
        target:that.state
    });
}

//State functions to implement
/*
    function turnOn();
    function turnOff();
*/

// OnState Implementation
SG.FBSR.OnState = function(c){
    this.controller = c;
    this.name = 'on';
}
SG.FBSR.OnState.prototype.turnOn = function(){
    //already turned on
    clog('WARNING [SG.FBSR.OnState turnOn] aleady turned on.');
}
SG.FBSR.OnState.prototype.turnOff = function(disable){
    clog('[SG.FBSR.OnState turnOff] disable: ' + disable);
    //set UI elements to OFF & set state to off
    $(".fb-turn-off, #fb_sb_body").show();
    $(".fb-turn-on, #fb-profile-pic").hide();
    SG.fbUIController.toggleToolbarIcon("off");
    if (disable==true) {
        SG.fbUIController.switchToDisabled();
    }
    this.controller.setState(this.controller.off);
}

// OffState Implementaion
SG.FBSR.OffState = function(c){
    this.controller = c;
    this.name = 'off';
}
SG.FBSR.OffState.prototype.turnOn = function(){
    //set UI components to on and set to on state
    $(".fb-turn-off, #fb_sb_head, #fb_sb_footer, #sb_myreads, #sb_settings").hide();
    $(".fb-turn-on, #fb_sb_body, #fb_sb_image, #sb_friendsreds, #fb-profile-pic").show();
    $(".social-fb-friends-readings").css("background-image",'url("/etc/designs/slate/images/friendsactivity_on.gif")');
    $(".social-fb-my-readings").css("background-image",'url("/etc/designs/slate/images/myreads_off.gif")');
    $(".social-fb-my-settings").css("background-image",'url("/etc/designs/slate/images/settings_off.gif")');
    SG.fbUIController.toggleToolbarIcon("on");
    //brought these in from fbLoginManager.load
    //slate_avatar cookie seems to be causing problems, using graph api instead
    //var slate_avatar = $.cookie('slate_avatar').replace(/"/g, '');
    
    var fbuid;
    var slate_avatar;
    if(FB.getUserID() == 0){
        slate_avatar = wapoVisitor.picUrl;
    }
    else{
        slate_avatar = SG.config.GRAPH_BASE + FB.getUserID() + '/picture';
    }    
    
    clog('[fbUIController switchToLoginView] setting picture to ' + slate_avatar);
    $('#fb-profile-pic').attr("src", slate_avatar);
    $('#fb-profile-pic-float').attr("src", slate_avatar);

    this.controller.setState(this.controller.on);
}
SG.FBSR.OffState.prototype.turnOff = function(disable){
    clog('WARNING [SG.FBSR.OffState turnOff] aleady turned off.');
    if(disable===true){
        clog('[SG.FBSR.OffState turnOff] aleady turned off, but disable=true is passed. Set to idle state and try to turn off again.');
        this.controller.setState(this.controller.idle);
        this.controller.state.turnOff(true);
    }
}

// IdleState Implementaion
SG.FBSR.IdleState = function(c){
    this.controller = c;
    this.name = 'idle';
}
//inherit on/off methods from the other classes
SG.FBSR.IdleState.prototype.turnOn = SG.FBSR.OffState.prototype.turnOn;
SG.FBSR.IdleState.prototype.turnOff = SG.FBSR.OnState.prototype.turnOff;
//END STATE MACHINE

//For some reason this breaks when putting inside document.ready
SG.FBSR.sc = new SG.FBSR.StateController();
SG.wapoFBAsyncLoad.init();

$(document).ready(function() {
    //polling for presence of FB in order to set static/global SG.FBSR.fbUid
    var FBIntv = setInterval(function(){
        if(typeof FB !== 'undefined'){
            clog("[document ready] setting SG.FBSR.fbUid to: " + FB.getUserID());
            SG.FBSR.fbUid = FB.getUserID();
            clearInterval(FBIntv);
        }
    },250)
    
    SG.fbUIController.bindEvents();
});