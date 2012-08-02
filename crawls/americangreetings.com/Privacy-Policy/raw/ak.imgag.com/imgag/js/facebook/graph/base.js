/*
    $Rev: 165112 $
    XXX: REQUIREMENTS
        -- OOP.js
*/

function makeTokenObject(authResponse) {
    /*
       Get any data we need from the OAuth 2.0
       authorization response object.
    */
    var tokenObject = {};
    tokenObject.access_token = authResponse.accessToken;
    tokenObject.uid = authResponse.userID;

    return tokenObject;
}

function clone(obj){
    /*
       http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone

       Clone an object and return it. This is very useful for an ``attachment``
       that gets used multiple times on a page (and needs to do ``.replace()``)
    */
    if (obj == null || typeof(obj) != 'object') {
        return obj;
    }
    var temp = new obj.constructor();
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }
    return temp;
}


var DEFAULTPIC = '/agbeta/ecards/fb-silhouette-50x50.jpg';


var CommonInterface = {
    /*
       XXX: base class

       A base module that holds common functionality for Facebook
       clients (visible website modules). This is more geared towards
       being able to post to a Facebook wall, but it also has methods
       for retrieving data from Facebook, and methods to display one's
       Facebook friends.
    */

    init: function(friendRenderer, pageAttrs, FBAttrs) {
        this.friendRenderer = friendRenderer;

        this.userTemplate = pageAttrs.userTemplate;
        this.friendTemplate = pageAttrs.friendTemplate;
        this.ahost = pageAttrs.ahost;
        this.site = pageAttrs.site;
        this.source = pageAttrs.source;

        this.processUsagePage = pageAttrs.processUsagePage;
        this.attachment = FBAttrs.attachment;
        this.perms = FBAttrs.perms;

        this.tokenObject = undefined; // set by checkStatus()
        this.appId = undefined; // set by initFacebook()

        this._initPageIds(pageAttrs.pageIds);
        this.completeFriendsList = '';
        this.numColsShow = '';

        this.FQLQueries = {
            user: 'SELECT name, birthday, pic_square_with_logo, uid ' +
                'FROM user WHERE uid = me()',

            friends: 'SELECT name, birthday, birthday_date, ' +
                'pic_square_with_logo, uid ' +
                'FROM user WHERE uid IN ' +
                    '(SELECT uid2 FROM friend WHERE uid1 = me()) ' +
                'ORDER BY name',

            friendsAndBirthdays: 'SELECT name, birthday, birthday_date, ' +
                'pic_square_with_logo, uid ' +
                'FROM user WHERE birthday_date != "" and uid IN ' +
                    '(SELECT uid2 FROM friend WHERE uid1 = me()) ' +
                'ORDER BY birthday_date ASC',

            permissions: 'SELECT {0} from permissions WHERE uid = me()'
        };
    },

    _initPageIds: function(pageIds) {
        /* Given a dictionary of DOM node IDs, initialize the IDs that we need
           for filling in various parts of the page (with FB data).
        */
        if (!pageIds) {
            pageIds = {};
        }

        this.signedInId = pageIds.signedIn;
        this.signedOutId = pageIds.signedOut;
        this.pageLoadId = pageIds.pageLoad;
        this.userContainerId = pageIds.userContainer;
        this.friendListContainerId = pageIds.friendListContainer;
        this.searchBoxId = pageIds.searchBox;
    },

    login: function(perms_, callback){
        /*
           Pop the FB login dialog. If permissions string passed
           in, use those. Else, use perms assigned to class.

           If callback passed in, assign that to the FB login callback.
        */
        var permissions = perms_ ? perms_ : this.perms;

        FB.login(
            function(response) {
                if(callback) {
                    callback(response);
                }
            },
            { scope: permissions }
        );
    },

    flashProxy: function(id, connection) {
        /* Due to security issues in Flash, this method will proxy
           the call for in Flash's stead and return the data.
        */
        if (!connection)
            connection = '';

        var fullConnection = '/' + id + '/' + connection;

        FB.api(fullConnection,
                function(response) {
                    try {
                        getFlashHandle().returnFacebookData(
                            response, id, connection);
                    }
                    catch (err) { OOP.log(err); }
                });
    },

    logout: function(callback) {
        /* Log the user out of facebook. If a callback is passed in, assign
           that to the FB logout callback.

                -- If the desire is to reload that page, GO to the page
                   again instead of calling ``reload()``.

                   This is because reload doesn't always completely
                   reload the page.  *shrug*
        */

        // reload the page ?
        if (callback && callback.toString() == 'reload') {
            callback = function() {
                window.location = window.location.toString();
            }
        }

        FB.logout(
            function(response) {
                if (callback) {
                    callback(response);
                }
            }
        );
    },

    onLoggedOut: function() {
        /*
           This will only be called if not defined in child, or if child
           calls ``this.parent()`` (which it absolutely should)
        */
        this.tokenObject = undefined;
        this.completeFriendsList = {};
        this._showLoggedOut();
    },

    onLoggedIn: function() {
        /*
           This will only be called if not defined in child, or if child
           calls ``this.parent()`` (which it absolutely should)
        */
        this._showLoggedIn();
    },

    getAccessToken: function() {
        /* Convenience function for Flash show calling into us.
           Also a nice helper method in general.

           Returns the ``access_token`` set by FB after logging in.
        */
        try {
            return this.tokenObject.access_token;
        } catch (err) { return ''; } // user is probably logged out
    },

    initFacebook: function(appId) {
        /*
           Initialize the Facebook environ/api.
        */
        this.appId = appId;

        FB.init({
            appId: appId,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true
        });

        // is user logged in ?
        FB.getLoginStatus(OOP.hitch(this.handleLoginStatus, this));

        // respond to session changes
        FB.Event.subscribe('auth.authResponseChange',
                OOP.hitch(this.handleLoginStatus, this));

    },

    handleLoginStatus: function(response) {
        /* Wire up what to call when user is logged in/out.
               -- Also save off token cookie (as an object)
        */
        if (response.authResponse){
            /* Logged in and has necessary permissions ?
            */
            this.tokenObject = makeTokenObject(response.authResponse);
            this.onLoggedIn();
        }
        else {
            /* User is logged out (or doesn't have necessary perms).
                -- if defined in child, it will first be called there.
                -- to call this object's version, child needs to call
                    ``this.parent()`` (inside onLoggedOut)
            */
            this.onLoggedOut();
        }
    },

    __checkPermissionsFromSession: function(perms) {
        /* Loop through perms (as returned by sessions.perms) and check them
           against what this app needs.
        */
        // (code still needed)
    },

    __checkPermissionsFromDB: function(perms) {
        /* Given permissions (as a result of an FQL call), loop over perms
           and perform appropriate action.

            -- If missing perms, performed logged-out action(s)
               Else, perform logged-in action(s)
        */
        for (var perm in perms[0]) {
            // XXX: FB has a bug with "friends_birthday"
            if (perm == "uid" || perm == "friends_birthday") {
                continue;
            }

            // missing a perm; fail
            if (perms[0][perm] == "0") {
                this.onLoggedOut();
                return;
            }
        }

        // Permissions check out; perform logged-in action(s)
        this.onLoggedIn();
    },


    renderUser: function() {
        /* Display a user's profile picture and user name.
        */
        var user = FB.api('/me', OOP.hitch(this._renderUserCallback, this));
    },

    _renderUserCallback: function(user) {
        /* Given a user object (via call to GRAPH), pull out the necessary bits
           to swap into the userTemplate.
        */
        var picSource = document.location.protocol + '//graph.facebook.com/' + user.id + '/picture';
        var userContainerElem = document.getElementById(this.userContainerId);

        userContainerElem.innerHTML = this.userTemplate.
            replace(/NAME/g, user.name).
            replace(/PICTURE/g, picSource);
    },

    renderFriends: function (users, friendTemplate, numShow, numCols) {
        if (this.completeFriendsList == ''){
            this.completeFriendsList = users;
        }
        /* Set the reset friends list for search and only set it if it
            has never been set before.
        */
        this.numColsShow = numCols;
        /* Build HTML markup for a user's friends; display grid or list

           -- If ``numCols`` is specified, a graph will be rendered;
              otherwise, it will be a single list.
        */
        if (!numShow || numShow == 'all') {
            numShow = users.length;
        }
        /* if searchBox isn't defined under pageIds: attaching this does nothing
            so it is safe for sites which aren't ready yet.
        */
        this._attachSearchEvents();
        return this.friendRenderer.makeMarkup(
                users, friendTemplate, numShow, numCols);
    },

    searchUsers: function(users, term, callback) {
        /*  Given a list of users and a search term, find
            users whose name contains that term. (searches first + last);

            If a callback is passed in, call it with refined user list,
            else return list.
        */
        term = term.replace(/ /g, '');
        var foundUsers = [];
        for (var i=0; i < users.length; i++) {

            // strip spaces from name (in a safeguarded fashion)
            // if 'null' encountered, provide a default
            var name = users[i].name;
            if (!name) {
                name = "name not found";
            } else {
                name = name.toLowerCase().replace(/ /g, '');
            }

            if (name.indexOf(term.toLowerCase()) > -1) {
                foundUsers.push(users[i]);
            }
        }

        if (!callback) {
            return foundUsers;
        }

        callback(foundUsers);
    },

    SendAsMessage: function(host, productnum, custnum, source, fbThumb, producttype){

        /* Distinguish between sending a [private] message and posting to a
        * friend's wall or your wall. */
        delivMethod = document.getElementById('deliverymethod');
        delivMethod.value = "SHAREMESSAGE";

        usageNum = this.giveMeUsageNumber();
        var fbPostThumb = "http://www.imgag.com/"+fbThumb;
        var messagePickupPage = host+'/view_facebook.pd?p=' + productnum +
                '&m='+custnum+'&i='+usageNum+'&source='+source+'&isFaceBookRequest=true';

        /*R7 are postcards which do not have a view_facebook.pd experience. Also all
        postcards are supposed to use f.jpg instead of t.gif per brand.
        */
        if (producttype == 'R7') {
            messagePickupPage = host+'/ecards/postcards';
            fbPostThumb = fbPostThumb.replace('t.gif','f.jpg');
        }

        var messageAttachment = {
             href: messagePickupPage
        };

        messagePickup = this.generateShortUrl(messageAttachment);

        FB.ui({
            method:'send',
            name:productTitle,
            description:'Become a fan:bluemountain.com',
            picture:fbPostThumb,
            link:messagePickup
        },
        function(resp) {
            var url=null;
            if (resp != null) {
                url = this.ahost + '/fb/usage/' + usageNum + '/status/mailed';
            } else {
                url = this.ahost + '/facebook/usage/' + usageNum + '/status/cancel';
            }
            var ajax = new Requester(url, 'POST', false, false);
            ajax.sendRequest();
        });
    },

    giveMeUsageNumber: function() {
        var usageNumber = this.insertUsageRecord(
                this.ahost + this.processUsagePage,
                document.facebookHiddens);
        return (usageNumber);
    },

    _attachSearchEvents: function() {
        /* In addition to wiring up the various searchbox events, set the
           default search text.
        */
        if (this.searchBoxId) {
            var box = document.getElementById(this.searchBoxId);
            box.onkeydown = OOP.hitch(this.enterOnSearch, this);
            box.onkeyup = OOP.hitch(this.searchAgiUsers, this);
            box.onclick = OOP.hitch(this.toggleDefaultSearchText, this);
            box.onblur = OOP.hitch(this.toggleDefaultSearchText, this);
            this.defaultSearchText = box.value;
            this.searchBox = box;
        }
    },

    enterOnSearch: function(event) {
        if (event.keyCode == 13)  {
            /*13 is "Enter" or "Return"
                we have to make it not submit the page
                with multiple commands for browser compatability.
            */
            event.returnValue=false;
            return false;
            event.cancel = true;
        }
    },

    toggleDefaultSearchText: function() {
        if (this.searchBox.value == this.defaultSearchText) {
            this.searchBox.value = '';
        }
        else if (this.searchBox.value == '') {
            this.searchBox.value = this.defaultSearchText;
        }
    },

    searchAgiUsers: function(evt) {
        /* Based upon user inputted text, search against full list of friends.
           Then display the users whose names contain search term.
        */
        var searchedUsers =
                this.searchUsers(this.completeFriendsList, this.searchBox.value);
        this.renderFriends(searchedUsers, this.friendTemplate, 'all', this.numColsShow);
    },

    postProduct: function(friendId) {
        /* Post a product to a friend's (or the user's) FB Wall.
                -- Insert usage
                -- Retrieve usagenum
                -- Swap usagenum into attachment
                -- Pop dialog

                If ``friendId`` is empty, it will post to user's wall.
        */

        // make copy so we can re-use ``this.attachment``
        var attachment = clone(this.attachment);

        delivMethod = document.getElementById('deliverymethod');
        delivMethod.value = friendId ? 'SHAREFRIEND' : 'SHARESELF';

        // Insert record + retrieve usage number
        var usageNumber = this.insertUsageRecord(
                this.ahost + this.processUsagePage,
                document.facebookHiddens);

        // Swap usagenum into attachment
        this._attachUsageNumber(attachment, usageNumber);

        // Storing necessary page info for inclusion into the callback function
        // for posting to FB below.

        // Store long URL so we can update properties appropriately.
        original_long_url = attachment.href;
        public_short_url = this.generateShortUrl(attachment);

        if (public_short_url && public_short_url.length > 0) {
            attachment.href = public_short_url;

            for( var property_key in attachment.properties ) {
                var property = attachment.properties[property_key];

                if( property.href && property.href === original_long_url ) {
                    property.href = public_short_url;
                }
            }
        }

        this._callFacebookUI(friendId, attachment, usageNumber);
    },

    _callFacebookUI: function(friendId, attachment, usageNumber) {
        // Pop dialog (for posting to FB Wall)
        var url = null;
        FB.ui(
            {
            method: 'stream.publish',
            target_id: friendId,
            display: 'popup',
            message: '',
            user_message_prompt: '',
            attachment: attachment,
            action_links: attachment.action_links || [{
                'text': this.site,
                'href': this.ahost + '?source=' + this.source
                }]
            },
            function(response) {
                if (response && response.post_id) {
                    url = this.ahost + '/fb/usage/' + usageNumber + '/status/mailed';
                } else if (response === null){
                    url = this.ahost + '/facebook/usage/' + usageNumber + '/status/cancel';
                } else if (response === undefined) {
                    // Do nothing. i.e. leave status as 'pending';
                    url = '';
                }
                if (url) {
                    var ajax = new Requester(url, 'POST', false, false);
                    ajax.sendRequest();
                }
            }
        );
    },

    generateShortUrl: function(attachment) {
        /* Given a long URL, call into the server in order to generate
         * a short URL appropriate for sending to the user.
         */

        /* postData
         *      long_url: URL that we're going to convert to short URL
         *      link_type: Defined by URL Shortener API Service, indicates the
         *                 type of URL we're working with. Possible values are
         *                 -1, 1, 2. A value of 2 indicates a Facebook short URL,
         *                 the other values are defined for other uses of the
         *                 API
         */
        var postData = {'long_url': attachment.href,
                        'link_type' : 2};

        /*
         * Initialize the short URL to the original href. If, for whatever
         * reason the call to the URL shortener API fails then we'll default
         * to existing functionality and use the original, long URL.
         */
        var ajax = new Requester('/facebook/shorturl', 'POST', false, false);
        var qs = object_to_query(postData);

        ajax.sendRequest(qs);

        // Strip newlines
        // NOTE: The Facebook JS code is still not ready for conversion/use of
        // the Dojo framework. However, in the interest of security we are
        // using the dojo.fromJson() method because Dojo's implementation of
        // JSON parsing is more likely to be correct and secure than existing
        // in-house solutions, especially due to the need for an eval() call
        // to properly generate the resulting object.
        var resp = dojo.fromJson(ajax.req.responseText.replace(/\n/g, ''));
        // Response from URL service is JSON.

        return resp['public_url'];

    },

    insertUsageRecord: function(ajaxPage, formElements) {
        /* Contact a .pd page (on our site) to insert a usage record
           into our DB. return the usage number.
        */
        var ajax = new Requester(ajaxPage, 'POST', false, false);
        var qs = ajax.formToQuery(formElements);

        //XXX: needs some serious error handling
        ajax.sendRequest(qs);

        // strip newlines
        var usageNumber = ajax.req.responseText.replace(/\n/g, '');

        return usageNumber;
    },

    _attachUsageNumber: function(attachment, usageNumber) {
        /* Replace (in the known spots) 'USAGENUM' with the actual
           order usage number.

                known places:
                    * main ``href``
                    * ``properties`` dict
                    * ``media`` list (of dicts)
                        * copy over from ``attachment.href``
        */

        // main ``href``
        attachment.href = attachment.href.
            replace(/USAGENUM/g, usageNumber);

        // ``properties`` dict
        for (var item_ in attachment.properties) {
            attachment.properties[item_].href = attachment.
                properties[item_].href.
                    replace(/USAGENUM/g, usageNumber);
        }

        // ``media`` list
        for (var i=0; i < attachment.media.length; i++) {
            attachment.media[i].href = attachment.href;
            if (typeof attachment.media[i].swfsrc !== "undefined") {
                attachment.media[i].swfsrc = attachment.media[i].swfsrc.replace(/USAGENUM/g, usageNumber);
            }
        }
    },

    _showLoggedIn: function() {
        /* SHOW logged in and HIDE logged out.
        */
        this.__toggleLoginState('block', 'none');
    },

    _showLoggedOut: function() {
        /* HIDE logged in and SHOW logged out.
        */
        this.__toggleLoginState('none', 'block');
    },

    __toggleLoginState: function(signedInStyle, signedOutStyle) {
        // hide the page-loading div (if present)
        try {
            if (this.pageLoadId) {
                document.getElementById(this.pageLoadId).
                    style.display = 'none';
            }
        } catch (err) { OOP.log(err); }

        // display/hide the logged in/out sections appropriately
        try {
            if (this.signedInId && document.getElementById(this.signedInId)) {
                document.getElementById(this.signedInId).
                style.display = signedInStyle;
            }

            if (this.signedOutId && document.getElementById(this.signedOutId)) {
                document.getElementById(this.signedOutId).
                style.display = signedOutStyle;
            }

        } catch (err) { OOP.log(err); }
    }
};
