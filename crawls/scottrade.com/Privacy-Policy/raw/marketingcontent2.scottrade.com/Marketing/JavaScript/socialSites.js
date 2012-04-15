//inner array item data sructure
function SocialLinkData(text, url, image, target, shareImage) {
    this.myText = text;
    this.myUrl = url;
    this.myImage = image;
    this.myTarget = target; 
    this.myShareImage = shareImage;
};

//JS class that will generate a dialog box whose data is stored in leftArr and 
//rightArr.
function SocialSites(name, id, title) {

    var ss_self = this;
    var ss_myName = name;
    var ss_popUpTitle = title;
    var ss_myID = id;
    
    var leftArr = [];
    var rightArr = [];
    var myDialog = null;
    
    //url and title are strings that will replace $URL$ and $TITLE$ in the function
    //generateURL
    this.openPopup = function(currentUrl, currentTitle) {
        //encode the shared url in order to assure the share site URL does not break
        //encodeURICompont encodes all special characters, ignoring ~!*()'
        currentUrl = encodeURIComponent(currentUrl);
        //encode the shared title in order to assure the share site URL does not break
        currentTitle = encodeURIComponent(currentTitle);
        var h = ss_self.renderHtml(currentUrl, currentTitle);
        if (!myDialog) {
            myDialog = $("#" + ss_myID).dialog( {
                modal : true,
                width : 360,
                height : 'auto',
                autoOpen : false,
                overlay : {opacity : 0.5, background : "black"},
                closeText : "Close (X)"
            });
            myDialog.dialog( "option", "title", ss_popUpTitle);
        }
        myDialog.html(h);
        myDialog.dialog("open");
    };
    
    this.closePopup = function() {
        myDialog.dialog("close");
    };
    
    //render the HTML for the dialog box
    this.renderHtml = function(currentUrl, currentTitle) {
        var h = "<div id=\"sharePopup\"><div class=\"padding\">"; //outer div
        if (leftArr.length > 0) {
            h += ss_self.renderLink(leftArr, "leftCol", currentUrl, currentTitle);
        }
        if (rightArr.length > 0) {
            h += ss_self.renderLink(rightArr, "rightCol", currentUrl, currentTitle);
        }
        h += "</div></div>";
        return h;
    };
    
    /**
     * create html for each link
     */
    this.renderLink = function(array, colType, currentUrl, currentTitle) {
        var link = "";
        if (array.length > 0) {
            link += "<div class=\"" + colType + "\"><ul>";
            for (i = 0; i < array.length; i++) {
                //complete URL
                var baseUrl = array[i].myUrl;
                var name = array[i].myText;
                baseUrl = ss_self.generateURL(baseUrl, currentUrl, currentTitle, array[i].myShareImage);
                //specific link data html
                link += "<li><img src=\"" + array[i].myImage + "\">";
                link += "<a class=\"" + id + "_" + name + "\"";
                link += "href=\"" + baseUrl + "\"" + " onclick=\"_socialSites_global.closePopup();sTrackShare('" + name + "');return true;\"";
                link += "target=\"" + array[i].myTarget + "\">";
                link += name + "</a></li>"; 
            }
            link += "</ul></div>";
        }
        return link;
    };
    
    /**
     *replace $URL$ and $TITLE$ with url and title respectively in the initialUrl
     *the function first checks if the url passed in alrady has a protocol and
     *domain attacked to it by checking for a protocol. Rewrite rules will not allow
     *a domain to exist without a protocol, unless the user has specified it with 
     *an external link, which is user error.
     */
    this.generateURL = function(initialUrl, currentUrl, currentTitle, shareImage) {
        if (!currentUrl.match(/^(http|https)(\:|\%3A)(\/|\%2F)(\/|\%2F)(\w*\.?)\/*/i)) {
            currentUrl = window.location.protocol.replace(":", "%3A") + "%2F%2F" + window.location.hostname + currentUrl;
        }
        var completedUrl = initialUrl;
        completedUrl = completedUrl.replace("$URL$", currentUrl);
        completedUrl = completedUrl.replace("$TITLE$", currentTitle);
        completedUrl = completedUrl.replace("$SOURCE$", shareImage);

        return completedUrl;
    }
    
    //add link data to the left column array
    this.addShareSiteLeft = function(text, url, image, target, shareImage) {
        var socialLinkLeft = new SocialLinkData(text, url, image, target, shareImage);
        var indexLeft = leftArr.length;
        leftArr[indexLeft] = socialLinkLeft;
    };
    
    //add link data to the right column array
    this.addShareSiteRight = function(text, url, image, target, shareImage) {
        var socialLinkRight = new SocialLinkData(text, url, image, target, shareImage);
        var indexRight = rightArr.length;
        rightArr[indexRight] = socialLinkRight;
    };

}