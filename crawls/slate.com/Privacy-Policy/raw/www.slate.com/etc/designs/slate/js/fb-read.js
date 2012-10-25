SG.FBWrapper = {
    loginStatus : {},
    permissions : {},
    permissions_to_check : "publish_actions",
    uid : -1,
    accessToken : null,
    initialized : false,
    init : function() {
        // populate the user ID
        this.loadUid(function() {
            clog("inside loadUid...");
            SG.FBWrapper.loadPermissions(function() {
                clog("SG.FBWrapper.initialized...........");
                SG.FBWrapper.initialized = true;
            });
        });
    },
    /**
     * Track a read. Only works for article pages, and only for logged in users
     * who have granted timeline permissions.
     */
    read : function() {
        if (!SG.FBWrapper.initialized) {
            this.init();
            clog("skipping read artilce.....");
            setTimeout('SG.FBWrapper.read()', 1000);
            return;
        }
        if (this.uid < 0) {return;}
        if ($("meta[property=\"og:type\"]").attr("content") != "article") {
            clog("Will not send a read for things that are not articles");
            return false;
        }
        clog("Read: " + $("meta[property=\"og:url\"]").attr("content"));
        this.hasPermission("publish_actions", function() {
            clog("Got success callback");
            SG.FBWrapper.logArticle();
        }, function() {
            clog("User does not have permission to publish to the Slate Facebook application!");
        });
    },
    /**
     * Checks FB for a specific permission, caches the result locally.
     * 
     */
    loadPermissions : function(callback) {
        clog("Checking: " + this.permissions_to_check + " " + this.uid);
        if (this.uid < 0) {return;}
        clog('[FBWrapper loadPermissions]');
        clog('[FB AJAX REQUEST]\nFB.Data.query("select {0} from permissions where uid={1}", ' + SG.FBWrapper.permissions_to_check + ', '+ SG.FBWrapper.uid +')');
        FB.api('/me/permissions', function(response) {
			if (response && response.data) {
				var permissions = response.data.shift();
				//console.log(permissions);
				if (!permissions || (!permissions.publish_actions) || (permissions.publish_actions == 0)) {
					SG.FBWrapper.permissions[SG.FBWrapper.permissions_to_check] = false;
				} else {
					SG.FBWrapper.permissions[SG.FBWrapper.permissions_to_check] = true;
				}
			}
			callback();
		});
        clog("[/FBWrapper loadPermissions]");
    },
    /**
     * Checks for a permission in the cache.
     * 
     */
    hasPermission : function(permission_name, success, failure) {
        clog("Checking permission: " + permission_name + " / "
                + typeof (this.permissions[permission_name]));
        if (typeof (this.permissions[permission_name]) === "undefined") {
            failure();
        } else {
            if (this.permissions[permission_name]) {
                success();
            } else {
                failure();
            }
        }
    },
    /**
     * Loads an FB UID, if the user is logged in.
     */
    loadUid : function(cb, forceful) {
        clog('[FBWrapper loadUid]');
        /*
        clog('RETURN FALSE!\n\n');
        return false;
        */
        clog('[FB AJAX REQUEST]\nFB.getLoginStatus()');
        FB.getLoginStatus(function(response) {
            clog('[FBWrapper loadUid] FB.getLoginStatus returned:');
            clog(response);
            if (response.session) {
                clog('[FBWrapper loadUid] response has prop: session');
                SG.FBWrapper.uid = response.session.uid;
                SG.FBWrapper.accessToken = response.session.accessToken;
                SG.FBWrapper.loginStatus.status = "connected";
                //clog(this);
                clog('[FBWrapper loadUid] call cb()');
                cb();
            } else if (response.authResponse) {
                clog('[FBWrapper loadUid] response has prop: authResponse');
                if (SG.fbLoginManager.fbConfig.fbUserId == response.authResponse.userID) {
                    SG.FBWrapper.accessToken = response.authResponse.accessToken;
                    SG.FBWrapper.uid = response.authResponse.userID;
                    SG.FBWrapper.loginStatus.status = "connected";
                    //clog(this);
                } else {
                    clog('WARNING: [FBWrapper loadUid] Identity userId != FB userId: ' +SG.fbLoginManager.fbConfig.fbUserId+ ' !=' +response.authResponse.userID);
                    SG.FBWrapper.loginStatus.status = "other_user";
                }
                clog('[FBWrapper loadUid] call cb()');
                cb();
            } else {
                clog('WARNING: [FBWrapper loadUid] Unknown FB User.');
                SG.FBWrapper.initialized = true;
                SG.FBWrapper.loginStatus.status = "";
                //clog(response);
                if ((forceful != undefined) && forceful) {
                    clog('[FBWrapper loadUid] forcefull callback');
                    clog('[FBWrapper loadUid] call cb()');
                    cb();
                }
            }
        }, true);
    },
    logArticle : function() {
        var url = $("meta[property=\"og:url\"]").attr("content");
        clog('[FBWrapper logArticle]');
        clog('[FB AJAX REQUEST]\nFB.api('+'/me/news.reads?article=' + url + '&access_token=' + SG.FBWrapper.accessToken + ', POST)');
        FB.api('/me/news.reads?article=' + url +
                '&access_token=' + SG.FBWrapper.accessToken, 'post',
                function(data) {
            clog(data);
            if (data.id != undefined) {
                //Read successful
                if (SG.fbLoginManager.fbConfig.fbNotify == "true") {
                    clog("Read posted to your timeline...");
                    clog("Article read id::" + data.id);
                    SG.FBNotifier.init(data.id);
                }
                var article_id = wp_meta_data.page_id;
                if (article_id != null) {
                    $.ajax({url : SG.config.addReadAPI,
                        type : "GET",
                        dataType : "jsonp",
                        data : {articleId : article_id,
                            fbPostId : data.id},
                        success :  function(res){
                            clog("Inside add read function!");
                            clog(res);
                        },
                        error : function () {
                            clog("Error in adding reading API..");
                        }
                    });
                } else {
                    clog("Could not store the my read::Article id is null!");
                }
            } else {
                //Read failed
                clog("Error in read article::" + data.error.message);
            }
        });
    },
    clearArticle : function(obj) {
        var itemId = obj.attr('id').replace("mx_", "");
        var itemURL = obj.attr('ref');
        //SG.FBWrapper.uid
        //var appId = $("meta[property=\"fb:app_id\"]").attr("content");
        this.processDeleteARead(itemId, itemURL, function(){
            obj.parent().parent().remove();
            clog("Just removed article log!");
        }, obj);
    },
    processDeleteARead : function(fbReadId, readURL, cb, obj) {
        clog('[FBWrapper processDeleteARead]');
        clog('[FB AJAX REQUEST]\nFB.api(' + fbReadId + ', DELETE)');
        FB.api(fbReadId, 'delete',
                {access_token : SG.FBWrapper.accessToken},
                function(data) {
                    clog("DELETE-----------read----------URL::" + readURL +
                            " item-fb-id::" + fbReadId);
                    clog(data);
                    if (data == true) {
                        clog("Delete from FB successful.");
                        cb();
                        SG.FBWrapper.deleteReadFromSlate(readURL);
                    } else {
                        if (data.error.code == 190) {
                            clog("User session exipred/ logout!");
                            var r=confirm("You are logged out of Facebook. Click OK to log in.");
                            if (r==true) {
                                clog("user opted for FB login!");
                                //Have time lag so that FB is ready
                                setTimeout(function(){
                                SG.fbLoginManager.loginToFB(function(){
                                    clog("Login was successful. try delete again!");
                                    setTimeout(function(){
                                    if (obj != undefined) {
                                        SG.FBWrapper.clearArticle(obj);
                                    } else {
                                        SG.FBWrapper.processDeleteARead(fbReadId, readURL, cb);
                                    }
                                    }, 2000);
                                }, function(){
                                    SG.FBWrapper.bindXClick(obj)});
                                }, 3000);
                            } else {
                                SG.FBWrapper.bindXClick(obj);
                                clog("User pressed Cancel to FB login!")
                            }
                        } else {
                            SG.FBWrapper.bindXClick(obj);
                            alert("An error occurred. \n\n"+data.error.message+"\n\n Click OK to try again.");
                        }
                        clog("Failed to delete the read!!!" + data.error.message);
                    }
        });
    },
    deleteReadFromSlate : function(article_id) {
        var dataObj;
        if (article_id.indexOf("http:") == 0) {
            dataObj = {url : article_id};
        } else {
            dataObj = {articleId : article_id};
        }
        clog("Del from sl db..");
        clog(dataObj);
        $.ajax({url : SG.config.deleteReadAPI,
            type : "GET",
            dataType : "jsonp",
            data : dataObj,
            success :  function(res){
                clog("Inside response of delete read from sl db!");
                clog(res);
                //Put check if delete successful?
                if (res.deleted) {
                    clog("Delete was successful.");
                } else {
                    clog("Delete from sl db failed! Message::" + res.error);
                }
            },
            error : function () {
                clog("Error in delete read FROM sl db..");
            }
        });
    },
    bindXClick : function (obj) {
        if (obj != undefined) {
            obj.one('click', function(e){
                 e.preventDefault();
                clog("X clicked...");
                SG.FBWrapper.clearArticle($(this));
            });
        }
    }
};
SG.FBNotifier = {
        popupEl : null,
        init: function(readId) {
            this.popupEl = $('.fb_read_msg_box_popup');
            //if (this.popupEl) {
                 $("#remove_this_read, .fb_settings_popup_ok, .do-not-notify-cb").unbind("click");
                if ($('#fb-profile-pic-float-on').length > 0) {
                    SG.FBNotifier.launchPopup("fb-profile-pic-float-on", "left");
                } else {
                    //SG.FBNotifier.launchPopup("fb-social-top-buttonON", "top");
                    SG.FBNotifier.launchPopup("fb-social-bottom-buttonON", "bottom");
                }
                $('.fb_settings_popup_ok').click(function() {
                    //Hide the window
                    SG.FBNotifier.hidePopup();
                });
                $('.do-not-notify-cb').click(function(){
                    if (this.checked) {
                        clog("setting notify off...");
                        SG.fbLoginManager.setNotifyOff();
                    } else {
                        clog("setting notify on...");
                        SG.fbLoginManager.setNotifyOn();
                    }
                 });
                 $("#remove_this_read").click(function(){
                     clog("[SG.FBNotifier] Remove this read id..." + readId);
                     SG.FBWrapper.processDeleteARead(readId, wp_meta_data.page_id,
                             function(){ SG.FBNotifier.hidePopup();});
                 });

                //NEW stuff for in-article top toolbar
                var clone = $('#fb_read_msg_box_popup').clone();
                clone.attr('id','fb_read_msg_box_popup_clone');
                $('.tbar-art').append(clone);
                clone.css({
                    "background-image":"url(/etc/designs/slate/images/leftPointerBox.png)",
                    'top':'-64px'
                });
                clone.css('left','144px');
                clone.find('.fb_settings_popup_ok').click(function() {
                    //Hide the window
                    SG.FBNotifier.hidePopup();
                });
                clone.find('.do-not-notify-cb').click(function(){
                    if (this.checked) {
                        clog("setting notify off...");
                        SG.fbLoginManager.setNotifyOff();
                    } else {
                        clog("setting notify on...");
                        SG.fbLoginManager.setNotifyOn();
                    }
                 });
                 clone.find("#remove_this_read").click(function(){
                     clog("[SG.FBNotifier] Remove this read id..." + readId);
                     SG.FBWrapper.processDeleteARead(readId, wp_meta_data.page_id,
                             function(){ SG.FBNotifier.hidePopup();});
                 });
            //}
        },
        launchPopup : function(elId, position) {
            var el = $('#' + elId);
            var pos = el.offset();
            var h = el.height();
            var w = el.width();
            var left;
            if ($(".sl-tbar").length != 0)
                left = 7;
            else
                left = pos.left - 100;
            if (position == "top") {
                this.popupEl.css("background-image",
                        "url(/etc/designs/slate/images/topPointerBox.png)");
                this.popupEl.css({
                    left : left,
                    top : pos.top + 30,
                    position : 'absolute'
                });
            } else if (position == "left") {
                this.popupEl.css("background-image",
                        "url(/etc/designs/slate/images/leftPointerBox.png)");
                this.popupEl.css({
                    left : w,
                    top : h/2,
                    position : 'absolute'
                });
                $(".fb_read_msg_box_inner").css("margin", "0 auto");
                $(".fb_read_msg_box_inner").css("padding", "10px 10px 10px 15px");
                $(".fb_read_settings_inner").css("padding", "10px 0 15px");
                $(".fb_read_settings_inner").css("margin", "5px 0");
                $(".fb_read_msg_box_popup").css("height", "200px");
                this.popupEl.show();
                return;
            } else {
                this.popupEl.css("background-image",
                        "url(/etc/designs/slate/images/topPointerBox.png)");
                this.popupEl.css({
                    left : pos.left + w/2 - this.popupEl.width()/2 + 10,
                    top : pos.top + 65,
                    position : 'absolute'
                });

            }
            $(".fb_read_msg_box_inner").css("margin", "0 auto 0 2px");
            $(".fb_read_msg_box_inner").css("padding", "25px 10px 10px 15px");
            $(".fb_read_settings_inner").css("padding", "3px 0 15px");
            $(".fb_read_msg_box_popup").css("height", "220px");
            this.popupEl.show();
            
        },
        hidePopup : function () {
            setTimeout(function() {
                SG.FBNotifier.popupEl.hide();
                $('.fb_read_msg_box_popup').hide()
            }, 300);
        }
    }