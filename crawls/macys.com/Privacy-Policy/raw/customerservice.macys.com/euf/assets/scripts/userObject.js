
/**
 * Author :  Statik
 * Name :    userObject
 * Desc :    creates a user object with methods to return values on etc
 *           v1.4      
 */
 
/**
 * group cookie includes the following - set with thisUser.isGroupCookie()
 *
 * getBrowserName(), getPlatformName(), getHasFlash()
 * getCartItemTotal(), getSignedIn(), getUserName()
 */

 /* make a new user */
 thisUser = new MCY_UserObj();

 /**
 * object constructor
 */
 function MCY_UserObj()
 {
    this.getUserID           = getUserID;
    this.getMachID           = getMachID;
    this.getBrowserName      = getBrowserName;
    this.getBrowserVersion   = getBrowserVersion;
    this.getPlatformName     = getPlatformName;
    this.getHasFlash         = getHasFlash;
    this.getCartItemTotal    = getCartItemTotal;
    this.getSignedIn         = getSignedIn;
    this.getUserName         = getUserName;
    this.getBazaarVoiceId    = getBazaarVoiceId;
    this.getUserZip          = getUserZip;
    this.getCatalogZip       = getCatalogZip;
    this.writeUserName       = writeUserName;
    this.writeWelcome        = writeWelcome;
    this.writeBag            = writeBag;
    this.writeSignedInButton = writeSignedInButton;
    this.writeRegisterButton = writeRegisterButton;
    this.writeCartItems      = writeCartItems;
    this.GroupCookie         = new GroupCookie();
 }
 
 function getBazaarVoiceId(){
     var bvId = "";
     if(thisUser.GroupCookie.isGroupCookie){
     	bvId = getCookieValue("; "+thisUser.GroupCookie.groupCookieName, 'BazaarVoiceId', thisUser.GroupCookie.groupCookieDelimiter, thisUser.GroupCookie.propertyAssigner) + "";
     	if(bvId == "undefined"){
     	bvId = getCookieValue(thisUser.GroupCookie.groupCookieName, 'BazaarVoiceId', thisUser.GroupCookie.groupCookieDelimiter, thisUser.GroupCookie.propertyAssigner) + "";
     	}
     } else {
 	bvId = getCookie('BazaarVoiceId') + "";
     }
     if(bvId == ""){
        bvId = "null";
     }
     return bvId;
 }
 
 function GroupCookie()
 {
    this.isGroupCookie         = true;
    this.groupCookieName       = "GCs";
    this.groupCookieDelimiter  = "3_87_";
    this.propertyAssigner	   = "1_92_";
 }
 
 function getUserID()
 {
    return getCookie('macys_online_uid');
 }
 
 function getMachID()
 {
    return getCookie('macys_online');
 }
 
 function getBrowserName()
 {
    return getCookie('BrowserName');
 }
 
 function getBrowserVersion()
 {
    return getCookie('BrowserVersion');
 } 
 
 function getPlatformName()
 {
    return getCookie('PlatformName');
 } 
 
 function getHasFlash()
 {
    return getCookie('Flash');
 } 
 
 function getCartItemTotal()
 {
    if(this.GroupCookie.isGroupCookie)
    {
    	crtItm = getCookieValue(this.GroupCookie.groupCookieName, 'CartItem', this.GroupCookie.groupCookieDelimiter, this.GroupCookie.propertyAssigner) + "";
    }
    else
    {
        crtItm = getCookie('CartItem') + "";
    }
    if(crtItm == "")
    {
        crtItm = "null";
    }
    return crtItm;
 }
 
 function getSignedIn()
 {
    return getCookie('SignedIn');
 }
 
 function getUserName()
 {
    var usrNm = "";
    if(this.GroupCookie.isGroupCookie)
    {
    	usrNm = getCookieValue(this.GroupCookie.groupCookieName, 'UserName', this.GroupCookie.groupCookieDelimiter, this.GroupCookie.propertyAssigner) + "";
    }
    else
    {
		usrNm = getCookie('UserName') + "";
	}
    if(usrNm == "")
    {
        usrNm = "null";
    }
    return usrNm;
 }
 
 function getUserZip()
 {
    var usrZip = getCookie('dfltZipCode') + "";
    if(usrZip == "" || usrZip == "null")
    {
        usrZip = "99999";
    }
    return usrZip;
 }
 
  function getCatalogZip()
 {
    var catZip = getCookie('catalogZipCode') + "";
    if(catZip == "" || catZip == "null")
    {
        catZip = "99999";
    }
    return catZip;
 }

 /**
  * methods used for header bar
  */
 function writeUserName()
 {
   document.write(this.getUserName());
 }
 
  function writeBag()
  {
        if(this.getUserName() != "null" && this.getSignedIn() == "1") /* user must be signed in to display shopping bag */
        {
            str = "<a href='" + ShoppingBagPath + "' target='_top' style='text-decoration:none; color:#666666'>" + thisUser.getUserName() + "'s bag:&#160;</a>";
        }
        else
        {
            str = "<a href='" + ShoppingBagPath + "' target='_top' style='text-decoration:none; color:#666666'>" + "shopping bag:&#160;</a>";
         }
         document.write(str);
 }
  
  function writeWelcome()
  {
        if(this.getUserName() != "null")
        {
            var welcomeText="<span style='text-transform: uppercase; font-weight: bold;'>" + thisUser.getUserName() + "'s shopping bag</span>";
            var note=" (if you're not " + thisUser.getUserName() + ", please <a href='" + signOutPath + "?logOut=TRUE'>click here</a>.)";
            
             if(this.getSignedIn() != "1") 
            {
                str= welcomeText + note;
            } 
            else 
            {
                str= welcomeText;
            }
            
            document.write(str);          
        }
  }
  
 /**
  * write out Sign In / out button
  */
 function writeSignedInButton()
 {
    if(this.getSignedIn() == "1")
    {
        str = "<a href ='" + signOutPath + "' target='_top' style='text-decoration:none; color:#666666'>sign out</a>";
      }
    else
    {
        str = "<a href ='" + signInPath + "' target='_top' style='text-decoration:none; color:#666666'>sign in</a>";
    }
    document.write(str);
}

 function writeCartItems()
 {
    if(this.getCartItemTotal() != "null")
    {
         document.write(this.getCartItemTotal());
    }
}

 /**
  * write Register button should only be displayed if user is not signed in
  */
function writeRegisterButton()
 {
    if(this.getSignedIn() != "1")
    {
        str = "<a href ='" + registerPath + "' target='_top' style='text-decoration:none; color:#666666'>register</a>";
        document.write(str);
    }
}

 /* end */