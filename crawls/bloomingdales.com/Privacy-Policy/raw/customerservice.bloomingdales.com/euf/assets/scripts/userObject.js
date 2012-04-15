
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
 thisUser = new BLM_UserObj();

 /**
 * object constructor
 */
 function BLM_UserObj()
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
    this.getUserZip          = getUserZip;
    this.getCatalogZip     = getCatalogZip;
    this.writeUserName       = writeUserName;
    this.writeWelcome        = writeWelcome;
    this.qb_writeWelcome	 = qb_writeWelcome;
    this.writeBag            = writeBag;
    this.writeSignedInButton = writeSignedInButton;
    this.writeRegisterButton = writeRegisterButton;
    this.writeCartItems      = writeCartItems;
    this.getBazaarVoiceId	 = getBazaarVoiceId; 
    this.GroupCookie         = new GroupCookie();
 }
 
 function GroupCookie()
 {
    this.isGroupCookie         = true;
    this.groupCookieName       = "GCs";
    this.groupCookieDelimiter  = "3_87_";
    this.propertyAssigner      = "1_92_";
 }
 
 function getUserID()
 {
    return getCookie('bloomingdales_online_uid');
 }
 
 function getMachID()
 {
    return getCookie('bloomingdales_online');
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
        var welcomeMessage = (this.getSignedIn()==1) ? this.getUserName()+"'S" : "MY";
        document.write(welcomeMessage);
  }
  
  function qb_writeWelcome()
  {
        var welcomeMessage = (this.getSignedIn()==1) ? "WELCOME, " + this.getUserName() + "&nbsp;|&nbsp;" : "";
        document.write(welcomeMessage);
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

/**
 * get BazaarVoiceID
 */ 
  function getBazaarVoiceId()
  {
     if(this.GroupCookie.isGroupCookie)
     {
    	 bvId = getCookieValue(this.GroupCookie.groupCookieName, 'BazaarVoiceId', this.GroupCookie.groupCookieDelimiter, this.GroupCookie.propertyAssigner) + "";
     }
     else
     {
    	 bvId = getCookie('BazaarVoiceID') + "";
     }
     if(bvId == "")
     {
    	 bvId = "null";
     }
     return bvId;
  }
 /* end */