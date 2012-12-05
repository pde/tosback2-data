/*******************************************************************************
* lister tagging
******************************************************************************/
argos.tracking.lister =  (new function(listerPageTag) {
      
      this.init = function(listerPageTag) {
            var basetag = listerPageTag;
            var location = argos.tracking.location.get();         
            var pageName = argos.tracking.cleanString(location.join(':'));
            var qvpProp4 = pageName;
            var recommended = argos.tracking.cleanString(location[0]);
            var promoslot = argos.tracking.cleanString(location[0]);    
            var sortBy = $('.sortBy option');
            var searchterm = $('.searchterm').text().replace(/"/g, "").toLowerCase();;
            var recommendedproduct = $('.recommendedproduct a');  
            var promoitem = $('.promoitem a');
            var imageAnchor = $('.lister.searchLister .product .image a');    
            var customerrating = $('#products .customerrating a');
                  
            sortBy.click(function(){
                  var optionText = $(this).text();    
            
                  argos.tracking.set(this, "Lister Sort Option", {
                        prop18 : argos.tracking.cleanString(optionText).replace(/:/g,""),
                        eVar43 : 'Browse^Bazaarvoice^Ratings And Reviews^sortbyreviews^',
                        var32 : 'search:'+searchterm+':'+optionText //applies to  navigation
                  });         
            });   
  
            recommendedproduct.click(function(){
                  var partnum = $(this).parent().parent().find('.partnum').text();              
                  argos.tracking.set(this, "Lister Recommended Product", {                      
                        eVar49 : basetag+recommended+':recommended:',
                        eVar44 : basetag+'recommended:'+partnum+':'           
                  });   
            });
            promoitem.click(function(){                     
                  argos.tracking.set(this, "Lister Promotional Slot", {                   
                        eVar49 : basetag+promoslot+':promoslot:'
                  });   
            })    
            imageAnchor.click(function(){ // not currently showing in WATS requires more work
                  argos.tracking.set(this, "Lister Search Custom Link", {                       
                        CUSTOMLINK : 'onclick="var s=s_gi("argosprod");s.tl(this,"o","ar:search:list:thumbnail:")'
                  });   
            })           
      }     
});

/*******************************************************************************
* Custom Omniture tagging for RVI
******************************************************************************/
argos.tracking.rvi = (new function() {          
      
      var basetag  = "ar:cat:recentlyviewed:";
      var basetagRemoved  = "ar:cat:recentlyviewed:removed:";
      
      function captureProduct(position,partNumber) {
            argos.tracking.set(this, "rvi product link", {
                  eVar44 : basetag+position+':'+partNumber+':'
                  
            });   
      }
      
      this.captureProduct = captureProduct;
      
      this.captureRemove = function() {
      
            if ($('body').hasClass('lister')) {
                  basetag = "ar:recentlyviewed:lister:"
            }
            argos.tracking.set(this, "rvi product removed", {
                  prop25 : basetag+'removed:'
            });   
      }     
      
      this.init = function() {
            $('#recentlyViewed .product').each(function(i) {
                  var partNumber = $(this).find('.partnum').text();
                  i = i+1; // Compensate for zero index
                  $(this).find('.image a , .title a').bind("click", function() {          
                        captureProduct(i,partNumber);
                  });               
            });
      }
});


/*******************************************************************************
* Question and Answer
******************************************************************************/
argos.tracking.question = (new function() {     

      this.init = function() {
            
            var askandanswer = $('#BVQASummaryBoxAskFirstQuestionID a');
            if (askandanswer.length) {
                  argos.tracking.set(this, "Ask and Answer", {
                        eVar41 : 'L3:NO'              
                  });   
            }     
            
            var askandanswer = $('#BVQASummaryBoxAskFirstQuestionID a');
            
            askandanswer.bind('click', function() {
                  argos.tracking.set(this, "PDP Essential Extras Quick View", {
                        eVar41 : 'L3:NO'                          
                  });   
            });         
            
      }
      

});

/*******************************************************************************
* Global Navigation
******************************************************************************/
argos.tracking.globalNav = (new function() {    
      
      this.checkUrlString = function(str) {
            return window.location.href.indexOf(str) != -1
      }
      
      this.init = function() {                  
            var basetag = 'ar:';
            if (this.checkUrlString("Price+Cut")) {
                  basetag = 'ar:pricecuts:';
            }                 
            var tnav = 'topnav:';
            var snav = 'subnav:';
            var topNav = $('#primary').find('li a');
            var subNav = $('.MenuActivatee dd a');
            //var vav49 = basetag+subNav; 
            
            topNav.bind('click', function() {               
                  var prop38 = argos.tracking.cleanString($(this).text());
                  argos.tracking.set(this, "Global Navigation Top Level", {
                        prop38 : basetag+tnav+prop38+':'                
                  });   
            });   
            
            subNav.bind('click', function() {
                  var id = $(this).parent().parent().parent().attr('id');
                  var topNavText = $('.'+id).find('a').text();
                  var subNav = $(this).text();
                  
                  argos.tracking.set(this, "Global Navigation Sub Level", {
                        prop38 : basetag+tnav+argos.tracking.cleanString(topNavText)+':'+argos.tracking.cleanString(subNav)+':',
                        eVar49 : basetag+snav+argos.tracking.cleanString(topNavText)+':'
                  });   
            });   

      }
      

});

/*******************************************************************************
* Cat landing pages (and price cuts)
******************************************************************************/
argos.tracking.catlanding = (new function() {   //integrates prices

      this.checkUrlString = function(str) {
            return window.location.href.indexOf(str) != -1
      }
      
      this.init = function() {
            
            
            var basetag = 'ar:cat:';
            var basetag2 = 'ar:cat';
            if (this.checkUrlString("Price+Cut")) {
                  basetag = 'ar:cat:pricecuts:';
                  basetag2 = 'ar:cat:pricecuts';
            }                                         
            var brands = $('#brands li a');
            var carousel = $('.carousel a');
        var isLatestOffers = false;
            if(!carousel.length > 0) {
            carousel = $('#latestOffers a');
            isLatestOffers = true;
        }
            var location = s.pageName.replace(/ar:cat:/g, "").slice(0, -1);   
            var browserLevel = argos.app.browseLevel;
            var slot = $('#categories ul.navigation a.tVisualBrowse');
            
            slot.bind('click', function() {
                  var location = s.pageName.replace(/ar:cat:/g, "").slice(0, -1);
                  var title = $(this).find('span').text();
                  argos.tracking.set(this, "Category Landing Brands Component", {
                        eVar49 : basetag+location+':'+argos.tracking.cleanString(title)+'visualbrowse:',
                        eVar41 : basetag+location+':'+argos.tracking.cleanString(title)+'visualbrowse:'
                  });   
            });
            
            brands.bind('click', function() {
                  var title = argos.tracking.cleanString($(this).find('img').attr('alt'));
                  var location = s.pageName.replace(/ar:cat:/g, "").slice(0, -1);
            
                        argos.tracking.set(this, "Category Landing Brands Component", {
                              eVar10 : title+':'+location,
                              eVar49 : basetag2+location+':'+title+':visualbrowse:',
                              eVar41 : basetag2+location+':'+title+':visualbrowse:'
                        });         

            });         
            
            carousel.bind('click', function() { 
            var location = s.pageName.replace(/ar:cat:/g, "").slice(0, -1);
            var position = $(this).closest('dl').find('.carouselItemNumber').text().replace(".","");
           if(isLatestOffers)
                    position = $(this).closest('dl').index();
            var partNo = $(this).parent().parent().find('.partnum').text();
            var pageNameSplit = s.pageName.split(':');
            var level2Cat = pageNameSplit[2];
            if(level2Cat == 'pricecuts')
               level2Cat = pageNameSplit[3];
            argos.tracking.set(this, "Category Landing Carousel", {
                    eVar44 : basetag+pageNameSplit[pageNameSplit.length-2]+':hero'+position+':'+partNo,
                    eVar49 : basetag+level2Cat+':hero'
            });               
            });
      }
      

});




/*******************************************************************************
* Custom Omniture tagging for "What's hot"
******************************************************************************/
argos.tracking.whatshot = (new function() {
      var basetag  = "ar:cat:whatshot:";
      var suffix = ":whatshot:"; 
      
      function captureProduct(position,partNumber) {
            var location = argos.tracking.location.get();
            var value = argos.tracking.cleanString(location.join(':')); 
            //argos.url.extractCatValues()[0].text
        var level2Cat = s.pageName.split(':')[2];        
            var rviLister = $('body.rviLister').length>0?true:false;
            var searchLister = $('body.searchResultsNone').length>0?true:false;
        var first = rviLister?"recentlyviewed:lister":searchLister?"searchlist":level2Cat;            
            first = argos.tracking.cleanString(first);      
            argos.tracking.set(this,"Whats Hot Product", {        
                  eVar44 : basetag+position+':'+partNumber+':',
                  eVar49 : 'ar:'+first+suffix,
                  eVar41 : 'ar:'+value+suffix
            });         
      }
      this.captureProduct = captureProduct;
      this.init = function() {
            var $products = $('#whatsNew .product');
            
            $products.each(function(i) {
                  var $links = $(this).find('.image a , .title a');
                  var partNumber = $(this).find('.partnum').text();
                  i = i+1;
                  $links.bind("click", function() {                     
                        captureProduct(i,partNumber);                                                 
                  });               
            });
            
      }     
});


/*******************************************************************************
* Custom Omniture tagging for QVC
******************************************************************************/
argos.tracking.qvc = (new function() {
      
      var properties = {};
      var basetag  = "ar:quickview:";

      this.captureSubmit = function(url) {
            var newUser = argos.url.getParameter(url, "edit") == "registeruser";
            var user = new argos.classes.User();
            if(url.indexOf("gethelp") >= 0) {
                  argos.tracking.set(this, "Forgotten Password", {
                        prop25 : basetag + "forgottenpassword:"
                  });         
            }
            else {
                  argos.tracking.set(this, "Continue", {
                        prop4 : basetag + (user.getState() == "RECOGNISED" ? "knownuser" : (newUser ? "newuser:" : "existinguser:"))
                  });
            }
      }
      
      this.captureEmail = function(url) {
            var email = argos.url.getParameter(url, "logonId");
            argos.tracking.set(this, "Continue", {
                  prop37 : email,
                  eVar37 : email
            });
      }
      
      this.captureSuccessfulLogin = function() {
            argos.tracking.set(this, "Successful Login", {
                  events : "" 
                  /*
                  * events value should be "event5" but adding this results in
                  * "event5,event5". Leaving as blank "" results in "event5". Have no
                  * idea where that's coming from.
                  */
            });         
      }
});

/*******************************************************************************
* Registration
******************************************************************************/
argos.tracking.registration = (new function() { 
      this.init = function() {
            
            // mandatory login
            var signIn = $('#userRecognition.signIn');
            var loginSubmit = signIn.find('#loginSubmit');
            var forgotPassword = signIn.find('#forgotPassword');
            var error = $('#userRecognition').find('.error');
            var member = $('#personal span.name').text().length;
            var prop4 = "ar:trolley:loginlightbox:newuser";
            if (member) { 
                  prop4 = "ar:trolley:loginlightbox:existinguser";      
            }
            
            loginSubmit.bind('click', function(e) {
                  if (member) {
                        argos.tracking.set(this, "Mandatory Login Continue Button", {
                              prop4: "ar:trolley:loginlightbox:knownuser"
                        });
                  } else {
                        argos.tracking.set(this, "Mandatory Login Continue Button", {
                              prop4: prop4
                        });
                  }                 
                  if (error.length) {
                        argos.tracking.set(this, "Mandatory Login Continue Button Error Message", {
                              prop6: error.text()
                        });
                  }
                  
            });

            forgotPassword.bind('click', function() {
                  argos.tracking.set(this, "Mandatory Login Forgot Password Link", {
                        prop25: 'ar:trolley:loginlightbox:forgottenpassword'
                  });   
            });
            
            

            
            //registration
            var submitBtn = $('#contextualSubmitContinue'); 
            var singleInput = $('.fieldError .singleInput');                  
            
            submitBtn.click(function(){ 
                  setTimeout(function(){ //wait for errors to populate
                              var errors = '';  
                              var textBoxes = $('.fieldError');
                              var label = '';
                              for (var i = 0; i < textBoxes.length; i++) {
                                    label = $(textBoxes[i]).find('label').attr('for');
                                    errors = errors+':'+label
                              }     
                              captureErrors(errors.replace(/zipCode/g, "PostCode").replace(/lastName/g, "surName"));                           
                        },1000);                            
            }); 
            
            function captureErrors(errors) {
                  
                  argos.tracking.set(this, "Registation submit", {                        
                        eVar35 : 'ar:registration'+errors   // error on submitting this variable
                        // var s = s_gi(s_account);
                  });   
            }           
      }
});


/*******************************************************************************
* PDP
******************************************************************************/
argos.tracking.pdp = (new function() {    

      this.stockAvailability = function() {
    	    var lightBoxStockAvailability = $('#lightBoxStockAvailability');
            var primaryAvailable = lightBoxStockAvailability.find('.storePickup .inStock .stockGood').text().indexOf("In stock,");
            var homeDelivery = lightBoxStockAvailability.find('.homeDelivery .inStock').text().indexOf("In stock");
            var emailPartNumber = lightBoxStockAvailability.find('input[name=partNumber_0]').val();
            var isLister = $('body').hasClass('lister');
            var partNumber = isLister ? emailPartNumber : argos.pdp.product.number;
            var product = '';
            var event = 'event57';
            var container = '';
            var action = '';
            var prefix = 'product:stock';
            var primaryStore = lightBoxStockAvailability.find('input[name=otherStoreNo_1]').val();
            var csoInStock = lightBoxStockAvailability.find('.storePickup #csoInstock');
            var separator='';
            
            if (homeDelivery <= -1) { //if out of stock in home
            	product = partNumber+';;;event33=1;eVar16=500';
                event = 'event33,'+event;
                separator= ';,;';
            }             
            
            if (primaryAvailable <= -1) { //if out of stock in primary             	
            	if (csoInStock.length){ //and cso
            		product = product + separator + partNumber+';;;event40=1;eVar16='+primaryStore;
                    event = 'event40,'+event;
            	} else { // not cso
            		product = product + separator + partNumber+';;;event32=1;eVar16='+primaryStore;
            		event = 'event32,'+event;
            	}                  
            }
            
            if (product == '') {
            	argos.tracking.set(this, "Stock-check Lightbox. Store Selected And Results Displayed",{
            		events : event
            	});  
            } else {
            	argos.tracking.set(this, "Stock-check Lightbox. Store Selected And Results Displayed",{
            		products : ';'+product, 
            		events : event
            	});
            } 
                    
            
            /* eVar29 related 
            get container id and pass it to container function, action setVar29() */
            
            function actionClick(el,action) {               
                  container = setContainer();
                  setVar29(prefix,container,action);
            }
            
            //this container is identified and string set
            function setContainer() {
                  var has_resultsTable = lightBoxStockAvailability.find('.resultsTable').length;
                  var has_stockCheck_postcode = lightBoxStockAvailability.find('.stockCheck_postcode').length;
                  var has_storelist = lightBoxStockAvailability.find('.storeList').length;
                  var has_lightBoxEmailMe = lightBoxStockAvailability.find('#lightBoxEmailMe').length;
                  
                  if (has_resultsTable >= 1) {
                        container = 'availability'
                              
                  } else if (has_stockCheck_postcode >= 1) {
                        container = 'postcode'
                        if (has_stockCheck_postcode.find('.error').length >= 1 ) {
                              container = 'postcodeerror'
                        }                       
                  } else if (has_lightBoxEmailMe >= 1) {
                        container = 'emailinstock'
                              if (has_stockCheck_postcode.find('.error').length >= 1 ) {
                                    container = 'emailerror'
                              }     
                  } else if (has_storelist >= 1) {
                        container = 'storelist'
                  }                 
                  
                  return container
            }
            
            function setVar29(prefix,container,action) {                
                  argos.tracking.set(this, "colour Check Stock Go Button", {
                        eVar29 : prefix+':'+container+':'+action
                  })
            }

            $(this).on("click", "button.close", function() {
                  actionClick($(this),'close');
            });
            $(this).on("click", ".CheckStockActivator", function() {
                  actionClick($(this),'checkstock');
            });
            $(this).on("click", ".buyOrReserve", function() {
                  actionClick($(this),'buyorreseserve');
            });   
            $(this).on("click", ".checkOtherStores", function() {
                  actionClick($(this),'checkotherstores');
            });
            $(this).on("click", "#emailMeSubmit", function() {
                  actionClick($(this),'go');
            });   
            
      }
      
      
      this.stockCheck = function() {      //Uses CheckStockActivatee.prototype.modifyContent()
            
    	  var status
            var titlePresent = 0;
            var outOfStock = $('.improvedInventory_checkStockInOtherArea');
            var regRes = $('.outOfStock').text();
            var notAvailable = $('.notAvailable').text();
            var buyReserveButton = $('.AddToTrolleyActivator',this); //specify 'this' or it will include all instances
            
            //eVar52
            function checkStock() {
                  if (outOfStock.length >= 1) {
                        status = 'stockcheck:lightbox:outofstock:'
                  } else if (notAvailable.toLowerCase().indexOf("not available to reserve in stores") >= 0) {
                        status = 'stockcheck:lightbox:regular:reservation:'
                  } else {
                        status = 'stockcheck:lightbox:improvedinventory:reservation:'
                  } 
                  
                  return status
            } 
            
            buyReserveButton.bind('click', function() {
                  argos.tracking.set(this, "colour Check Stock Go Button", {
                        eVar29 : 'Add to basket pop-up:yes selected:'   
                  });
            });
      
            
            this.captureLightboxDetails = function() {
            	
            	$(function() {            	
            		var title = $('#lightBoxStockAvailability').find('.location');
                	
                	title.each(function() {
                        var $thisText = $(this).text(); 
                        var var9;
                        var otherStock = $('#showOtherNearbyStoresWithStock').length;
                        if ($thisText == 'Nearest store with stock') { //broken
                        	if (otherStock >= 1) {
                        		var9 = 'more than 1 improved inventory store';
                        	} else {
                        		var9 = '1 improved inventory store';
                        	}
                        	
                        	
                        	
                        	argos.tracking.set(this, "Stock Check Details", {
                                eVar9 : var9
                          });
                     
    		              }                    
                	}); 
                	
                	 var var52 = checkStock();                  
                     
                     argos.tracking.set(this, "Stock Check Details", {
                           eVar52 : var52
                     });
                
            	});
            	
                    
                  
            }
            
            this.captureLightboxDetails();

      };
      
      this.pdpAddToTrolley = function() {       
            var pdpContinue = $('body.pdp .addToTrolley .continue')
            if (pdpContinue.length <= 1) {            
                  argos.tracking.set(this, "PDP Add To Trolley", {
                        prop25 : 'ar:product:continueshopping'
                  });
            }     
      }
      
      /*
      this.pdpGoToTrolley = function() {        
            var pdpGoTo = $('body.pdp .addToTrolley .trolleyAction')
            if (pdpGoTo.length <= 1) {          
                  argos.tracking.set(this, "PDP Go To Trolley", {
                        prop25 : 'ar:product:continueshopping'
                  });
            }     
      }
      */
  
      this.checkOneClickLoaded = function() { //one click tagging
                  
            var oneClickResultsLi = $('.oneClickResults li',this); 
            
            //test oneClickResultsLi
            
            var result = [];
            var oneClickLoaded = 0;
            var setEvents, setProducts;
            
            oneClickResultsLi.each(function(index) {
                  var $this = $(this);
            
                  result.push({
                    label: $this.find('label').text(),
                    storeNumber: $this.find('input').val().slice(0,4),
                    isDisabled : $this.find('.labelSet span').hasClass('inStock')?true:false,        
                    order: index+1
                });                 

                  oneClickLoaded = 1;                                   
            });

            

            
            if (oneClickLoaded == 1) { 
                  oneClickOnLoad();             
            };                      

            //general tests - console.log('label: '+result[0].label);
      
            function storeOutOfStock() {
                  var oos = '';
                  for (i in result){
                        if (result[i].isDisabled == true) {
                              oos = oos + result[i].label+'|'
                        }                       
                  }
                  return oos.replace("undefined", "");
            }
            
            function getVar16() {
                  var var16;
                  for (i in result){
                        if (result[i].isDisabled == true) {
                              var16 = var16 + ':'+result[i].storeNumber
                        }                       
                  }
                  return var16.replace("undefined", "");
            }
            
            function getProp() {
                  var setProp;
                  for (i in result){
                        if (result[0].isDisabled == false && result[i].isDisabled == false ) {     
                              if (i <= 2) {
                                    setProp = (setProp + ':'+result[i].storeNumber + ':'+result[i].order).replace(/undefined/g, ""); 
                              }
                        }                       
                  }
                  return setProp
            }
                  
            //7.1.2     Product Details page 
            // prop25 - set to active when one click becomes available
            function oneClickOnLoad(){
                  var setVar16 = getVar16();
                  var setProp = getProp();
                  var setVar27;
                  var prodEvent;
                  var setProducts;
                  var partNumber = $('#pdpProduct .partnumber').text().replace(/\D/g,''); 
                  //does it contain text 'in stock'
                  if (result[0].isDisabled == false) {//no it doesn't its out of Stock
                        prodEvent = 'event51=1';
                        setEvents = 'event51,event57';
                        
                  } else {//yes it does its in stock
                        prodEvent = 'event52=1';
                        setEvents = 'event52,event57';            
                        setVar27 = '1click:Stockck:';                   
                  }
                  
                  // check first product is oos or in stock 
                  var firstStoreInStock = result[0].isDisabled;
                  setProducts = partNumber+';;;'
                  for (var i=0; i < result.length; i++) {                     
                        if (result[i].isDisabled == firstStoreInStock) {
                              setProducts = setProducts + prodEvent +';'+'evar16='+result[i].storeNumber.replace(/:/g, "")+';'
                        }
                  }  
      
                  //set up products                  
                  
                  // oos get all stores that are oos plus all values
                  // of not oss get all stores that are oos plus all values
                  
                  
                  
                  argos.tracking.set(this, "One Click Loaded", {
                        prop25 : '1click:activate:offered:',
                        eVar16 : setVar16,
                        prop42 : setProp+':',
                        //products : ';'+partNumber+';;;'+setProducts+';'+'evar16='+setVar16.replace(/:/g, "")+';',
                        products : ';'+setProducts,
                        events : setEvents,
                        eVar27 : setVar27
                  });
            }     
            
            // prop25 - if signin available set on click
            $('.oneClickSignIn',this).bind('click', function() {  
                  argos.tracking.set(this, "One Click Sign In", {
                        prop25 : '1click:signin:'
                  });
            });
            
            // prop25 - when one click button clicked - user logged out
            $('#oneClickActivate a',this).bind('click', function() {    

                  argos.tracking.set(this, "One Click Button Activated", {
                        events : 'event60',
                        prop25 : '1click:activate:selected:'
                  });
            });
            
            // s.products - when one click button clicked
            $('.oneClickEnabled',this).bind('click', function() { 
                  var storeLink = $('.storeLink').length; 
                  var var27 = '1click:RegularReservation:';
                  var setProp51 = storeOutOfStock();
                  
                  if (storeLink >= 1) { // if exists it DOES use improved inventory
                        var27 = '1click:Imporved Inventory Reservation:';
                  } 
                  argos.tracking.set(this, "One Click Button Clicked", {
                        prop25 : '1click:activate:selected:',
                        eVar27 : var27,
                        prop51 : setProp51,
                        eVar16 : '512'
                  });
            });
            
      };

      
      this.init = function() {      
            
            var basetag = 'ar:';
            if (argos.tracking.catlanding.checkUrlString("Price+Cut")) {
                  basetag = 'ar:pricecuts:';
            }     
            var location = argos.tracking.location.get();
            var reviewsAnchor = $('#ratingsReviews .button');
            var alsoLikeAnchor = $('#main h2:contains("You may also like")').parent().find('.product a');
            var alsoLikeButton = $('#main h2:contains("You may also like")').parent().find('.product .button');
            var essentialExtras = $('#pdpEssentialExtras a');
            var pdpAlternativeProducts = $('#pdpAlternativeProducts .product a');
            var pdpAlternativeProductsButton = $('#pdpAlternativeProducts .button');            
            var alsoInRange = $('.pdp #pdpAlsoInThisRange .product a');
            var alsoInRangeButton = $('#pdpAlsoInThisRange .product .button');
            var chooseProductsButton = $('.button_chooseProduct');
            var addOfferToTrolley = $('.button_buyOrReserve');
            var buyOrReserve = $('.btnbuyreserve.progressive');
            var fullDetials = $('#pdpBriefDetails .button');      
            var addToCart = $('.addtocart');
            var paging = $('.paging span');//.not().hasClass('selected');           
            var colourPickerActivatee = $('#colourPickerActivatee');
            var pdpColourPicker = $('#pdpColourPicker .pickerItem');
            var pdpFabricPicker = $('#pdpFabricPicker .pickerItem');
            var checkStockGo = $('.CheckStockActivator');
            //one click reserve
            var oneClickContainer = $('#oneClickContainer');
            var oneClickEnabled = oneClickContainer.find('input.oneClickEnabled');
            var oneClickResults = function() {};

            var self = this;
            var result = [];
            
                  
            
      
            
            function breadcrumbs() {                        
                  var breadcrumb = $('#breadcrumb li a');   
                  var results = [];       
                  $.each(breadcrumb, function() {
                        results.push($(this).text());
                  });
                  results.shift();
                  return results;
            }
            
            function checkExists(str) {
                  if (str == 'undefined') {
                        str = ' ';
                  } 
                  return str
            }
            
            this.CaptureBreadcrumbs = function() {
                  var breadCrumb = breadcrumbs();
                  var var21 = checkExists(breadCrumb[1]);
                  var var22 = checkExists(breadCrumb[2]);
                  var var23 = checkExists(breadCrumb[3]);
                  var var24 = checkExists(breadCrumb[4]);               
                  argos.tracking.set(this, "Set page variables", {
                        eVar21 : var21,
                        eVar22 : var22,
                        eVar23 : var23,
                        eVar24 : var24,
                        eVar3 : breadCrumb.join(' > ')
                  });   
            }           
            
            //on load
            var breadcrumb = basetag+argos.tracking.cleanString(argos.tracking.breadcrumb().join(':'))+':product:';
            var breadcrumbCat = basetag+'cat:'+argos.tracking.cleanString(argos.tracking.breadcrumb().join(':'))+':product:';
            
            var pagename = breadcrumb.replace(/undefined/g, "").replace(/home:/g, "").replace(/ar:/g, "")+'product:'
            var crumbs = breadcrumbs();
            
            argos.tracking.set(this, "set PDP on load", {
                  prop4 : breadcrumbCat.replace(/undefined/g, "").replace(/home:/g, ""),
                  eVar24 : basetag+argos.tracking.cleanString(crumbs[1]),
                  pageName : basetag+'cat:'+pagename,
                  channel : basetag+'productdetails:'
            });
            
            checkStockGo.bind('click', function() {                     
                  var breadcrumb = argos.tracking.cleanString('ar:'+argos.tracking.breadcrumb().join(':')+':pdp:lbstockcheck:');                  
                  argos.tracking.set(this, "colour Check Stock Go Button", {
                        prop4 : breadcrumb.replace(/undefined/g, ""),
                        channel : basetag+'lbstockcheck:'
                  });
            });
            
            pdpFabricPicker.bind('click', function() {      
                  argos.tracking.set(this, "colour Picker Activatee", {
                        eVar58 : basetag+'product:swatchfabric:'
                  });
            });
            
            pdpColourPicker.bind('click', function() {      
                  argos.tracking.set(this, "PDP Colour Picker", {
                        eVar58 : basetag+'product:swatch:'
                  });
            });         
            
            fullDetials.bind('click', function() {    
                  argos.tracking.set(this, "PDP Buy Or Reserve", {
                        prop25 : basetag+'product:fullproductinformation:'
                  });
            });
            
            buyOrReserve.bind('click', function() {   
                  argos.tracking.set(this, "PDP Buy Or Reserve", {
                        eVar51 : basetag+'product:buyreserve:', 
                        events : 'scAdd'
                  });
            });
            
            pdpAlternativeProducts.bind('click', function() {     
                  var categoryName = $(this).parent().parent().parent().parent().parent().find('h2').text();
                  var breadcrumbs = argos.tracking.breadcrumb();
                  argos.tracking.set(this, "PDP Alternative Products", {
                        prop25 : basetag+'product:alternatives:',
                        prop4 : basetag+'product:alternatives:quickinfo:',
                        eVar49 : basetag+'product:alternatives:productdetails:',
                        events : 'scAdd'
                  });   
            });
            
            pdpAlternativeProductsButton.bind('click', function() {
                  var breadcrumbs = argos.tracking.breadcrumb();
                  var lowestLevel;
                  var lowestLevel = argos.tracking.cleanString(breadcrumbs.pop(-1));    
                  argos.tracking.set(this, "PDP Product Alternatives Button", {
                        eVar46 : basetag+lowestLevel+':'+'alternatives:',
                        eVar49 : basetag+'alternatives:productdetails:',
                        prop4 : basetag+'product:alternatives:quickinfo:',
                        events : 'scAdd'
                  });   
            });
            
            
            alsoInRangeButton.bind('click', function() {
                  var breadcrumbs = argos.tracking.breadcrumb();
                  var lowestLevel = argos.tracking.cleanString(breadcrumbs.pop(-1)); 
                  var catNumber = $(this).parent().parent().find('.partnum').text();
                  var prodCatNumber = $('#pdpInformation').find('#pdpProduct .partnumber').text();
    
                  argos.tracking.set(this, "PDP Product Also In Range Button", {
                        eVar46 : basetag+lowestLevel+':'+'alsointhisrange:'+catNumber.replace(/\//g, "")+':'+prodCatNumber.replace(/\//g, "")+':',
                        eVar49 : basetag+'alsointhisrange:productdetails:',
                        prop4 : basetag+'product:alsointhisrange:quickinfo:',
                        events : 'scAdd'
                  });   
            });
            
            alsoLikeAnchor.bind('click', function() {
                  argos.tracking.set(this, "PDP Product You May Also Like Anchor", {
                        prop25 : basetag+'product:youmayalsolike:',
                        prop4 : basetag+'product:youmayalsolike:quickinfo:'
                  });   
            });
            
            alsoLikeButton.bind('click', function() {
                  var breadcrumbs = argos.tracking.breadcrumb();
                  var catNumber = $(this).parent().parent().find('.partnum').text();
                  var prodCatNumber = $('#pdpInformation').find('#pdpProduct .partnumber').text();
                  var lowestLevel = argos.tracking.cleanString(breadcrumbs.pop(-1));  
                      
                  argos.tracking.set(this, "PDP Product You May Also Like Button", {
                        prop25 : basetag+'product:youmayalsolike:',
                        prop4 : basetag+'product:youmayalsolike:quickinfo:',
                        eVar46 : basetag+lowestLevel+':'+'youmayalsolike:'+catNumber.replace(/\//g, "")+':'+prodCatNumber.replace(/\//g, "")+':',
                        eVar49 : basetag+'youmayalsolike:productdetails:',
                        events : 'scAdd'
                  });   
            });
            
            
            paging.bind('click', function() {   
                  var categoryName = $(this).parent().parent().parent().parent().parent().find('h2').text();
                  argos.tracking.set(this, "PDP Paging", {
                        prop25 : categoryName                     
                  });   
            });
            
            addToCart.bind('click', function() {      
      
                  var checkParent = $(this).parents('#pdpAlsoInThisRange').attr('id');
                  var categoryName = $(this).parents('.content').first().parent().find('h2').text(); 
                  var paging = $(this).parents('.carousel').find('.controller .paging span');
                  var catNumber = $(this).parent().parent().find('.partnum').text();
                  var prodCatNumber = $('#pdpInformation').find('#pdpProduct .partnumber').text();               
                  if (checkParent != 'pdpAlsoInThisRange') {                     
                	  var e46 = basetag+argos.tracking.cleanString(categoryName)+':'+catNumber.replace(/\//g, "")+':'+prodCatNumber.replace(/\//g, "")+':';  
                        if(categoryName == 'Essential extras')
                              e46 = basetag+argos.tracking.cleanString(crumbs.pop(-1))+':essentialextras:'+catNumber.replace("/","")+':'+prodCatNumber.replace("/","")+':'
                        if(categoryName =='Alternative products')
                              e46 = basetag+argos.tracking.cleanString(crumbs.pop(-1))+':alternatives:'+catNumber.replace("/","")+':'+prodCatNumber.replace("/","")+':'
                  argos.tracking.set(this, "PDP Add To Cart", {   
                              eVar46 : e46,
                        eVar49 : basetag+argos.tracking.cleanString(categoryName)+':productdetails:'
                  });   
                        
                  }
                  
            });

            chooseProductsButton.bind('click', function() {             
                  argos.tracking.set(this, "PDP Choose Product", {
                        prop25 : basetag+'product:specialoffers:',                        
                        events : 'scAdd'
                        
                  });   
            });
            
            addOfferToTrolley.bind('click', function() {
                  var promotionIdentifier = $(this).parent().find('input').attr('name','promotionIdentifier').attr('value');
                  argos.tracking.set(this, "PDP Add Offer To Trolley", {
                        eVar49 : basetag+'specialoffer:added:',
                        prop25 : 'ar:product:specialoffers:',
                        eVar56 : promotionIdentifier,
                        events : 'scAdd'
                  });   
            });
             
            reviewsAnchor.bind('click', function() {
                  var rating = $(this).find('img').attr('alt');
                  var reviews = $(this).find('.number').text();
                  argos.tracking.set(this, "PDP Reviews Link", {
                        eVar30 : reviews,
                        eVar31 : rating.split('out')[0].replace(/Customer rating /g, "")                                      
                  });   
            });         
            this.CaptureBreadcrumbs();
                  
      }
});

/*******************************************************************************
* One Click Confirmation
******************************************************************************/
argos.tracking.oneClickConfirmation = (new function() {     

      this.shuttle = function(lightboxForm) {
            var shutContent = lightboxForm.parent().parent().parent();
            var submit = lightboxForm.find('.submit');            
            //on load
            argos.tracking.set(this, "Oneclick Shuttle Offered", {
                  prop24 : 'shutloffered'                         
            });         
            submit.bind('click', function() {
                  argos.tracking.set(this, "ar:trolley:reservation:confirmationpage:shutl", {
                  
                  });   
            });         
      }
      
      this.init = function() {            
            var confirmationDetails = $('#confirmationDetails');
            // check to see if this is CSO
            var iscso = confirmationDetails.find('#iscso').length;            
            var firstProductNumber = $('.reservedItems .partnum').first().text()
            var productQty = confirmationDetails.find('#qty').text();         
            var price = $('.reservedItems .price .main').first().text().replace(" ","").replace("£","");
            var totalPrice = parseFloat(productQty*price).toFixed(2);
            var setEvent, setProduct, setCancel, setCancelEvent
            var store = $('.reservationInfo .store').text().replace(" ","");
            var resNo = confirmationDetails.find('.resNo').text();
            var confirmEssentialExtra = confirmationDetails.find('#pdpEssentialExtras a');
            var cancelReservation = confirmationDetails.find('#receipt .cancel');

            if (iscso == 1) { //if cso
                  setProduct = 'event54='+productQty+'|'+'event55='+totalPrice+'|'+
                  'event61='+productQty+'|'+'event62='+totalPrice+';';
                  setEvent = 'event53,event54,event55,event61,event62'; 
                  setCancel = ';;;event56=1|event59=1';
                  setCancelEvent = 'event56,event59';
            } else { //if not cso
                  setProduct = 'event54='+productQty+'|'+'event55='+totalPrice+'|'+
                  'event63='+productQty+'|'+'event64='+totalPrice+';';
                  setEvent = 'event53,event54,event55,event63,event64';
                  setCancel = ';;;event56=1';
                  setCancelEvent = 'event56';
            }           
            argos.tracking.set(this, "one click confirmation details", {
                  pageName : 'ar:trolley:reservation:confirmationpage:oneclick:',
                  prop4 : 'ar:trolley:reservation:confirmationpage:oneclick:',
                  prop9 : resNo,
                  prop24 : 'shutlnotoffered',               
                  channel : 'ar:trolley',
                  events : setEvent,
                  products : ';'+firstProductNumber+';;;'+setProduct,
                  eVar13 : 'Reserve',
                  eVar18 : store,
                  eVar20 : resNo          
            });

            confirmEssentialExtra.bind('click', function() {
                  argos.tracking.set(this, "Oneclick Confirm Essential Extras", {
                        var49 : 'ar:reservationconfirmation:essentialextra:',
                        prop41 : 'ar:reservationconfirmation:essentialextra:' 
                  });   
            });
            cancelReservation.bind('click', function() {
                  argos.tracking.set(this, "Oneclick Cancel Reservation", {
                        prop4 : 'ar:trolley:oneclick:cancellation:',
                        prop25 : 'ar:trolley:oneclick:cancellationyes:',
                        products : ';'+firstProductNumber+';;;event56=1',
                        events : setCancelEvent
                  });   
            });
      }
      

});



/* Location - to be replaced with argos.tracking.extractCatValues()
******************************************************************/
argos.tracking.location = (new function() {
      this.get = function() { 
            var results = [];
            
            var $body = argos.page.elements["body"];
            if ($body.hasClass("home")) {             
                  results.push('homepage')
            } else if ($body.hasClass("tvPage")) {
                  results.push('argostv')
            } else {
                  var pageName = s.pageName.replace(/ar:cat:/g, "").slice(0, -1);
                  results.push(pageName)
            
            }
            return results;
      }
      this.parseCategory = function(category) {
            if(category && category.split('|').length == 4){
                  category = category.split('|')[2];
            }
            return category;
      }
});

/*******************************************************************************
* Common QVP Lightbox tags for both PDP and Listers called from QVP ACTIVATEE
******************************************************************************/
argos.tracking.qvp = (new function() {
	this.fireTags = function(){
		var sProducts = ';'+this.product().number;
		var sProp4;
		
		if (argos.page.elements.body.hasClass('searchResults')) {
			//Search Lister
			sProp4 ='ar:search:mercadoresultslist:quickinfo:';
		} else if (argos.page.elements.body.hasClass('lister')){
			//Browse Lister
			var location = argos.tracking.location.get();
			sProp4 = argos.tracking.cleanString(location.join(':'))+':quickinfo:';
		}  else if (argos.page.elements.body.hasClass('pdp')) {
			//PDP
			var pdpGroup = this.property('activator').$node.parents('.pdpRelatedInformation').attr('id');		    
			sProp4 = _pdpArea(pdpGroup);			
		}
		argos.tracking.set(this, "Quick View Page", {
			prop4: sProp4,
			products : sProducts                      
		});
	}
	
	function _pdpArea(pdpGroup) {
		switch(pdpGroup){
        case 'pdpEssentialExtras' : sProp4 = 'ar:product:essentialextras:quickinfo:'; 
        	break;
        case 'pdpAdditionalItems' : sProp4 = 'ar:product:you:mayalsolike:quickinfo:'; 
        	break;
        case 'pdpPromotions' : sProp4 = 'ar:product:specialoffers:quickinfo:'; 
         	break;
        case 'pdpAlternativeProducts' : sProp4 = 'ar:product:alternatives:quickinfo:'; 
        	break;
        case 'pdpAlsoInThisRange' : sProp4 = 'ar:product:alsointhisrange:quickinfo:'; 
        	break;
		}
		return sProp4;
	}
});

/*******************************************************************************
* Initialise tagging events.
******************************************************************************/
$(window).load(function() {   
      
      //initiate tagging for specific pages 
      var $body = argos.page.elements["body"];
      var listerPageTag = 'ar:cat:';      
      var basetagVar = 'ar:cat:';
      var $rvi = $('#recentlyViewed');
      var $whatshot = $('#whatsNew');
      
      // Quickview
      $(".QpiActivator").each(function() {
            $(this).click(function() {
                  argos.tracking.page.capture();
                  argos.tracking.quickinfo.update();
                  argos.tracking.quickinfo.send();
                  argos.tracking.page.reset();
            });
      });
      
      //on load 
      argos.tracking.question.init();
      argos.tracking.globalNav.init();

      
      if ($rvi.length) {
            argos.tracking.rvi.init();    
      }
      if ($whatshot.length) {
            argos.tracking.whatshot.init();
      }
      if ($body.hasClass("lister")) { 
            if ($body.hasClass("searchResults")) {
                  var listerPageTag = 'ar:searchlist:';
            }                 
            argos.tracking.lister.init(listerPageTag)
      }
      if ($body.hasClass("login ")) { 
            argos.tracking.registration.init();
      }
      if ($body.hasClass("pdp")) {        
            argos.tracking.pdp.init();
      }
      if ($body.hasClass("category")) {         
            argos.tracking.catlanding.init();
      }
      if ($body.hasClass("oneClickConfirmation")) {         
            argos.tracking.oneClickConfirmation.init();
      }      
});