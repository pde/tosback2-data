/*
    $Rev: 83911 $
    XXX: REQUIREMENTS
        -- OOP.js
        -- facebook/graph/base.js
*/


var BaseHeader = {
    /*
       XXX: Must extend CommonInterface

       This class handles all functionality for displaying
       facebook user information in the header.
       that is necessary to perform:

            - Logging into Facebook
            - pull user's personal information
            - store info in a cookie
            - update page header with facebook pic and greeting etc

       For further definitions of some of the base calls, see CommonInterface.
    */

    userTemplate: '' +
            '<p><a href="javascript:FB.logout()">Click here</a> to log out of Facebook</p>' +
            '<a href=""><img src="PICTURE" alt"NAME" and title="NAME"></a>',

    friendTemplate: '',

    init: function(friendRenderer, pageAttrs, FBAttrs) {
        /* Call our parent's init(), save off some attrs.
                
                @param friendRender given an HTML template, and a User
                                    object, it will swap in all the dynamic
                                    bits in the HTML template and return it.
                @param pageAttrs  page related values (dictionary)
                                    e.g. ``ahost``, ``source``
                @param FBAttrs  FB related values (dictionary)
                                  e.g. ``attachment``, ``friendID``
        */
        pageAttrs.userTemplate = pageAttrs.userTemplate || this.userTemplate;
        pageAttrs.friendTemplate = pageAttrs.friendTemplate || this.friendTemplate;

        this.parent(friendRenderer, pageAttrs, FBAttrs);
    },

    onLoggedIn: function() {
        /* Called when:
                -- user logs in
                -- it's determined user is logged in (on page load)

           -- fetch friends from FB
           -- render friend markup (+ display)
           -- render markup for user (+ display)
        */

        this.parent();
        this.renderUser();
    }

};

var AGHeader = {
    /*
       XXX: Must extend BaseHeader

       Specialized version for AG to override userTemplate.
           -- See docstring of BaseHeader
    */

    userTemplate: '' +
        '<li id="agi-fbheader-uphoto">\n' +
           '<a href="#" onclick="FB.logout(); return false" >\n' +
              '<img id="agi-fbheaderphoto" alt="" src="PICTURE" style="height: 30px; width: 30px;">\n' +
           '</a>' + 
        '</li>\n' +
        '<li id="agi-fbheader-logout">\n' +
            '<a href="#" onclick="FB.logout(); return false" >Logout of Facebook</a>\n' +
        '</li>\n',

    init: function(friendRenderer, pageAttrs, FBAttrs) {
        pageAttrs.friendTemplate = this.friendTemplate;
        this.parent(friendRenderer, pageAttrs,FBAttrs);
    }

};

var BMAHeader = {
    /*
       XXX: Must extend BaseHeader

       Specialized version for BMA to override userTemplate.
           -- See docstring of BaseHeader
    */

    userTemplate: '' +
        '<li style="float:right;margin-left:6px;">\n' +
            '<img alt="" src="PICTURE" style="height: 30px; width: 30px;">\n' +
        '</li>\n' +
        '<li style="float:right;color:#000000;font-size:11px;line-height:11px;">\n' +
            'Welcome NAME!<br><a href="#" onclick="FB.logout(); return false" style="color:#000000;font-size:11px;">Logout of Facebook</a>\n' +
        '</li>\n',

    init: function(friendRenderer, pageAttrs, FBAttrs) {
        pageAttrs.friendTemplate = this.friendTemplate;
        this.parent(friendRenderer, pageAttrs,FBAttrs);
    }

};

