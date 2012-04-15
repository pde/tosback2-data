var Tracker = {
  category: false,
  enabled: false,
  userID: 'unknown',
  RTTrackerFile: 'out',

   // Random comment change to get this to Prod, because builds are annoying

  init: function(categoryID,userID) {
    if(categoryID!=null) {
      this.setCategory(categoryID);
    }
    if(userID!=null) {
      this.userID = userID;
    }

  },
  
  RTTrack: function (eventID){
  },

  track: function(eventID,cat) {
    if(!this.enabled) {
      return;
    }
  },

  trackSearch: function(eventID,query,numResults) {
    if(!this.enabled) {
      return;
    }
  },

  trackError: function(eventID) {
    if(!this.enabled) {
      return;
    }
  },

  startConversion: function(eventID, points) {
    if(!this.enabled) {
      return;
    }
    
    if(arguments.length < 2) {
      points = 0;
    }
  },

  completeConversion: function(eventID, points) {
    if(!this.enabled) {
      return;
    }

    if(arguments.length < 2) {
      points = 0;
    }
  },

  productView: function(productID, productName) {
    if(!this.enabled) {
      return;
    }

    if(productName==null) {
      productName = productID;
    }
  },

  purchaseClick: function(productID, productName, price) {
    //shop5

    if(!this.enabled) {
      return;
    }

    if(productName==null) {
      productName = productID;
    }
  },

	cartPrice: 0,
  purchaseComplete: function(productID, productName, price, isCart) {
    //shop9
    var orderID;

    if(!this.enabled) {
      return;
    }

    if(productName==null) {
      productName = productID;
    }

    if(typeof(sessionToken)!='undefined' && sessionToken.length>15) {
      orderID = sessionToken.substring(sessionToken.length-10);
    } else {
      orderID = this.userID;
    }

    this.cartPrice += price;
	if(!isCart) {
	  }
  },

	orderComplete: function() {
        if(typeof(sessionToken)!='undefined' && sessionToken.length>15) {
		  orderID = sessionToken.substring(sessionToken.length-10);
		} else {
		  orderID = this.userID;
		}         
	},

  setCategory: function(newCategory) {
    this.category = newCategory;
  },
  setUserID: function(newuserid) {
    this.userID = newuserid;
  },

  loadCMLibraries: function() {
  },

  loadScript: function(src, appendTo) {
    if(arguments.length > 1) {
      var script = document.createElement('script');
      script.src = this.url;
      script.type = "text/javascript";
      appendTo?appendTo.appendChild(script):document.body.appendChild(script);
    } else {
      document.write('<script type="text/javascript" src="' + src + '"></script>');
    }
  },
  
  makeCMSafe: function(str) {
    return str.replace(/\W/g,"").substring(0,15);
  }
};
