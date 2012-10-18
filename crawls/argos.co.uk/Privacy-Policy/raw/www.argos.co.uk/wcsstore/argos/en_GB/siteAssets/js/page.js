argos.page = (new function() {
	var _global = {
		menu : function() {
			$.ajax({
				url : "/webapp/wcs/stores/servlet/FetchDropdownMenuContentView?storeId=" + argos.app.storeId + "&langId=" + argos.app.langId,
				success : function(html) {
					new argos.classes.Menu($("#menu"), $(html), "ddm_");
				}
			});
		},

		search : function() {
			var $sf = $("#search form");
			var $sfText = $("input[type='text']", $sf);
			var sfInitTextValue = $sfText.val();
			
			$sf.bind("submit", function() {
				return argos.validation.applySearchValidation();
			});
			
			$sfText.focus(function() {
				if(sfInitTextValue == this.value){
					this.value = '';
				}
				this.select();
			});
		},
		
		messages : function() {
			// Set up queue for any product messages.
			argos.messages.productQueue = new argos.classes.ProductQueue();
			
			// Look for and set up Help/Information messages
			$.ajax({
				url : argos.app.contentDir + "messages.htm",
				success : function(html) {
					argos.messages.html = html;
					$(document).ready(function() {
						var activatee = new argos.classes.MessageActivatee();
						argos.messages.addToHtml($("[class*='messageActivatee']"));
						$("[class*='messageActivator'], .contextInformation").each(function() {
							new argos.classes.MessageActivator(this, activatee);
						});
					});
				}
			});
			
			// Fetch product information for those added to queue.
			$(window).load(function() {
				var xhr = argos.messages.productQueue.get();
				if(xhr) {
					xhr.done(function(html) {
						argos.messages.addProducts($(html).filter(".product"))
					});
				}
			});
		},
		
		qvc : function() {
			// QVC (User recognition / Sign in dropdown)
			argos.page.qvc	= new argos.classes.RecognitionController({
					activators : "a.logIn, a.myAccount",
					activateeId : "qvc",
					container : "#personal .userInformation",
					salutation : ".salutation",
					maxNameSize : 18
			});
		},
		
		qvt : function() {
			// QVT (Quick View Trolley)
			argos.page.qvt = new argos.classes.QvtActivator(
				$("#personal .trolleyInformation").get(0), 
				new argos.classes.QvtActivatee({
					displayLimit : 3,
					left: "697",
					top: "40"
				}, argos.page.user)
			);
		},
		
		rvi : function() {
			// RVI (Recently View Items)
			var rvi = new argos.classes.RviController($("#recentlyViewed").get(0), argos.page.user, {
				displayLimit : 3,
				removeButtonText : "remove",
				titleElement : "h2"
			});
			
			argos.page.rvi = rvi;
			if(rvi && rvi.$node) {
				rvi.fetch().done(function() {
					rvi.display();
					if(rvi.list().length > 0) {
						//restrict what's new to 3 items max
						$("#whatsNew .product").slice(3).hide();
					}
				});
			}
		}		
	}
	
	
	/* Public methods
	 *****************/
	this.isSecure = function() {
		return window.location.protocol == "https:";
	}
	
	this.init = function(item) {
		_global[item]();
	}
	 
});





/* Initialise global site features
 *********************************/
$(document).ready(function() {
	var initialise = new Array("menu", "search", "messages", "qvc", "qvt", "rvi");
	
	// Initialise user
	argos.page.user = new argos.classes.User();
	
	// Common lookups and reusable elements
	argos.page.elements = {
		body : $(document.body),
		main : $("#main"),
		lightbox : new argos.classes.LightboxActivatee({id:"lightbox"}),
		mandatoryLoginLightbox : new argos.classes.MandatoryLoginActivatee()
	}		
	
	// Control initialised components and features
	if(argos.page.elements.body.hasClass("tvPage")) {
		initialise = new Array("rvi");
	}
	
	for(var i=0; i<initialise.length; ++i) {
		argos.page.init(initialise[i]);
	}

});



/* Initialise page specific features
 ***********************************/
$(document).ready(function() {
	var $body = argos.page.elements["body"];
	
	// Category.
	if($body.hasClass("category")) {
		var $brands = $("#brands");
		
		/***TEMPORARY: DEVELOPMENT ONLY***/
		$("img", $brands).each(function() {
			// So we can see some images.
			this.src = this.src.replace(/(http[s]?:\/\/)argos\//, "$1www.argos.co.uk/");
		});
		/***TEMPORARY: END***/
		
		// Brand list expand/collapse
		if($brands.length > 0) {
			new argos.classes.Expander({
				container : $brands.get(0),
				openText : "Show all brands +",
				closeText : "Hide all brands -",
				hidden : $("ul", $brands).not(function(i){return i==0;})
			});
		}				
	}
	
	// RviLister
	if(argos.page.elements["body"].hasClass("rviLister")) {
		$("#products .product").each(function(i) {
			var $product = $(this);
			var partNumber = $(".partnum", this).text();
			var number = i+1;
			var activator = argos.page.rvi.removeActivator(this, number);
			activator.$node.unbind("click");
			activator.$node.click(function() {
				argos.page.rvi.remove(partNumber);
				window.location.reload();
			});
			$product.parent().append(activator.node);					
		});
	}
	
	// PDP
	if(argos.page.elements["body"].hasClass("pdp")) {
		$(window).load(function() {
			// argos.pdp.product set up in document.ready after one we're
			// in so add to window.load to make sure it's there before using.
			argos.page.rvi.add(argos.pdp.product.number);
		});
	}	
	
	// Sign In 
	if(argos.page.elements["body"].hasClass("login")) {
		$("#userRecognition").each(function() {
			// Bit hacky, but reusing toggle functionality originally designed for QVC, now in page version.
			argos.classes.RecognitionActivatee.prototype.addLoginFormToggle.call(this);
			$("input[type='radio']", this).each(function() {
				var $this = $(this);
				if($this.attr("checked") == "checked") {
					$this.click();
				}
			});
		});
	}
	
	// Trolley
	if($body.hasClass("trolley")) {
		/**
		new argos.classes.MandatoryLoginActivator({
			activator: $("#buyForHomeDeliveryButton").get(0),
			activatee: argos.page.elements.mandatoryLoginLightbox,
			user: argos.page.user
		});
		**/
		if($("body#pgPaymentDetails").length > 0) {
			argos.page.user.limitSession();
		}
	}
	
	// scene7 (multiple pages)
	if($body.is(".home, .category")) {
		new S7Video({server : "http://argos.scene7.com"});
		$(".bauComponentRow .s7video-button").parents(".mediaPlayer").addClass("scene7Player");
	}
	
	// Quickview (multiple pages).
	if($body.is(".lister, .pdp, .offerdetails")) {
		var qvpActivatee = new argos.classes.QvpActivatee();
		argos.page.elements.qvp = qvpActivatee.$node;
		
		$("#main dl.product").not('#main dl.noquickview, .product_selector').each(function() {
			new argos.classes.QvpActivator({
				container : $(".actions", this),
				product : this,
				activatee : qvpActivatee
			});
		});
		
		argos.page.elements.checkStockActivatee = new argos.classes.CheckStockActivatee();
		$("#checkStockGo, .emailMeBackInStock, .emailMe").each(function () {
			new argos.classes.CheckStockActivator(this, argos.page.elements.checkStockActivatee);
		});
	}
	
});



