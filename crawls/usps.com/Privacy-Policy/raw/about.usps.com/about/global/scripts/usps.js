/**
 * Main global USPS namespace.  Will contain all required functions.
 * @fileoverview
 */

/** 
 * @namespace 
 */
var USPS = {
		
	/**
	 * 
	 */
	Modal : null,
	
	/**
	 * 
	 */
	Hoverable : null,
	
	/**
	 * 
	 */
	DefaultTextValue : null,
	
	/**
	 * 
	 */
	isIE : dojo.isIE!=null,
	
	/**
	 * 
	 */
	Events : null,
	
	/**
	 * 
	 */
	settings : {
	
	/**
	 * 
	 */
		animation : {
			duration : {
				short : 250,
				normal : 500,
				long : 1000
			},
			easing : {
				linear : null,
				elastic : {
					In : null,
					Out : null,
					InOut : null
				},
				bounce : {
					In : null,
					Out : null,
					InOut : null
				},
				quint : {
					In : null,
					Out : null,
					InOut : null
				}
			}
		}
	},
	
	/**
	 * 
	 */
	utilBar : null,
	
	/**
	 * 
	 */
	initialize : function(){
		USPS.Events = [];
		USPS.domExtender = new usps.domExtenders();
		USPS.utilFunctions = new usps.utilFunctions();
		USPS.Hoverable = new usps.utils.Hoverable("hover",USPS.Events);
		USPS.DefaultTextValue = new usps.utils.DefaultTextValue("default",USPS.Events);
		this.utilBar = dojo.byId("utility-bar");
		dojo.connect(window,"onresize",function(){
			try{
				if (USPS.ModalFluid()) {USPS.ModalFluid().closeModal(USPS.ModalFluid());}
			} catch (e){
			}
		});
		/**
		 * For selected elements, dynamically inject a 'span' object with a class name of 'arrow'.
		 * This is used to inject the visual arrows on load instead of having them present in the html before hand.
		 * This way the initial html will be smaller, web crawlers will not read the extra arrow context, and screenreaders should be able avoid reading the arrows since they are added after the page has loaded.
		 */
		dojo.forEach(
			dojo.query("div.nav-tool h2",this.utilBar),
			function(el){
				dojo.place(dojo.create("span",{"class":"arrow"}),el,'last');
			}
		);
		
		/**
		 * To make keyboard based access work, add various anchors who's only purpose is to force focus to another
		 * anchor specified in the element's "rel" attribute
		 */
		dojo.query("a.force-jump").connect("onfocus",function(ev){
			var rel = dojo.attr(this,"rel");
			if (dojo.hasClass(this,"close")){
				dojo.query(".nav-tool",this.utilBar).removeClass("hover");
				dojo.query(".nav-tool .nav-window",this.utilBar).style({'height':'0px'});
			}
			dojo.byId(rel).focus();
		});
		
		this.settings.animation.easing.linear = dojo.fx.easing.linear;
		this.settings.animation.easing.elastic = {
			In : dojo.fx.easing.elasticIn,
			Out : dojo.fx.easing.elasticOut,
			InOut : dojo.fx.easing.elasticInOut
		};
		this.settings.animation.easing.bounce = {
			In : dojo.fx.easing.bounceIn,
			Out : dojo.fx.easing.bounceOut,
			InOut : dojo.fx.easing.bounceInOut
		},
		this.settings.animation.easing.quint = {
			In : dojo.fx.easing.quintIn,
			Out : dojo.fx.easing.quintOut,
			InOut : dojo.fx.easing.quintInOut
		}
		
		this.addGlobalEvents();
		
		//USPS.CompositeButton.initialize();
	},
	
	subscriptions : {
		preventModalClose : "/USPS/ModalFluid/canClose"
	},
	
	/**
	 * 
	 */
	addGlobalEvents : function(){
		/**
		 * For every span element with a class name of 'button link', add mouse hover functionality:
		 */
		dojo.forEach(
			dojo.query("span.button-link"),
			function(obj){
				USPS.Hoverable.connect(obj);
			}
		);
		
		/**
		 * For every input element with a class name of 'default', set the field to clear the value on focus
		 */
		dojo.forEach(
			dojo.query("input.default"),
			function(obj){
				USPS.DefaultTextValue.connect(obj);
			}
		);
		
	},
	
	/**
	 * 
	 */
	ForceBufferReload : function(){
		/**
		 * TBD...
		 */
		try{
			//The search-text will be there majority of the time, so we can try grabbing that.
			var obj = dojo.byId('search-text');

			//If the search text is not available, try grabbing another form field.
			if (!obj){
				obj = dojo.query('input[type=text]')[0];
				
				//If still no object, exit;
				if (!obj){
					return;
				}
			}
			
			//Save the value
			var value = obj.value;
			
			//Change the value
			obj.value = obj.value + "---";
			
			//Set the original value back
			obj.value = value;
		} catch (e){}
	},
	
	Paint : function(){
    		dojo.require("usps.widget.StyledDropdown"); 
        dojo.forEach(dojo.query('select:not(.no-paint)'), function (el) {
        	/*
		        	 * Add paint functionality here
		        	 * Inside styleddropdown.js, check if the dropdown has already been painted
		        	 * If so, then just add the JS handlers
		        	 * If not, paint and add the JS handlers
		        	 */
        	dojo.attr(el,'isPainted','inProgress');
			var selected = new usps.widget.StyledDropdown(el, function(){},false,null);
			USPS.Dropdowns.add(selected);
        	dojo.attr(el,'isPainted','true');
        });

		//Paint CheckBoxes
        dojo.forEach(dojo.query('input[type=checkbox]:not(.no-paint)'), function (el) {
									dojo.require("dijit.form.CheckBox");
        	new dijit.form.CheckBox({
        		name: el.name,
        		value: el.value, 
        		checked: el.checked, 
        		disabled: el.disabled
        	},
        	el);
        });
        
        // Paint Radio Buttons
        dojo.forEach(dojo.query('input[type=radio]:not(.no-paint)'), function (el) {
									dojo.require("dijit.form.RadioButton");
        	new dijit.form.RadioButton({
        		name: el.name,
        		value: el.value, 
        		checked: el.checked, 
        		disabled: el.disabled
        	},
        	el);
        });
        //console.log('To Do: paint styled dropdowns');
        
    }
}

/**
 * @description
 * @name USPS.Dropdowns
 * @namespace 
 */
USPS.Dropdowns = {
		
	/**
	 * @description
	 * @type Array
	 * @name USPS.Dropdowns._collection
	 */
	_collection : [],
	
	/**
	 * ???
	 */
	initialize : {
	},
	
	/**
	 * @description
	 * @name USPS.Dropdowns.byId
	 * @param {String} id
	 * @see USPS.Dropdowns._collection
	 */
	byId : function(id){
		var obj = null;
		dojo.forEach(
			this._collection,
			function(el){
				if (el._el.id == id){
					
					obj = el;
				}
			}
		);
		return obj;
	},
	
	/**
	 * @description
	 * @name USPS.Dropdowns.add
	 * @param {DOM} obj
	 * @see USPS.Dropdowns._collection
	 */
	add : function(obj){
		if (obj._el && obj._el && this.byId(obj._el.id) == null){
			this._collection.push(obj);
		}
		
	},
	
	/**
	 * @description
	 * @name USPS.Dropdowns.remove
	 * @param {DOM} obj
	 * @see USPS.Dropdowns._collection
	 */
	remove : function(obj){
		var index = -1;
		dojo.forEach(this._collection,function(_el,_index){
			if (obj._el.id==_el._el.id){
				index = _index;
			}
		});
		if (index!=-1){
			this._collection.splice(index, 1);
		}
	},
	
	/**
	 * @description
	 * @name USPS.Dropdowns.update
	 * @param {DOM} obj
	 * @see USPS.Dropdowns.remove
	 * @see USPS.Dropdowns.add
	 */
	update : function(obj){
		this.remove(obj);
		this.add(obj);
	}
};

/**
 * 
 * @namespace 
 */
USPS.CompositeButton = {
		
		/**
		 * 
		 */
	initialize : function(){
		dojo.forEach(
			dojo.query("input.buttons"),
			function(el){
				var btn = dojo.create("a",{
					innerHTML : el.value,
					href : '#',
					tabindex : '-1',
					className : el.className
				});
				dojo.place(btn,el,'after');
				dojo.addClass(el,'hide-fromsighted');
				dojo.connect(btn,'onclick',function(e){
					e.preventDefault();
					dojo.trigger(el.form,"onsubmit");
				});
			}
		);
	}
}

/**
 * Custom Sidebarism
 *
 */

if(dojo.byId('promo-sidebar')) {
 lastPromo = dojo.query('.promo-bucket:last-child')[0];
 promoPos = dojo.coords( lastPromo, true );
 body = dojo.coords( dojo.query('body')[0], true );
 if(body.h < ((promoPos.y + promoPos.h) + 200)) {
  dojo.addClass(lastPromo, 'special');
 }
}

/**
 * Search Form.  Initialization and other methods are defined here
 * @namespace
 */
USPS.SearchForm = {
		
	/**
	 * 
	 */
	el : "form-search",
	
	/**
	 * 
	 */
	initialize : function(){
		this.el = dojo.query("#"+this.el);		
	}
}

/**
 * Navigation
 * 
 * Set up the animation and behavior for the main navigation
 * @namespace
 */
USPS.Navigation = {
		
	/**
	 * 
	 */
	current : null,
	
	/**
	 * 
	 */
	nav_qt_wrapper : null,
	
	/**
	 * 
	 */
	initialize : function(){
		var _this = this;
		this.timer = null;
		this.nav_qt_wrapper = dojo.byId("nav_qt_wrapper");
		//Check if the navigation object exists.
		var nav = dojo.query("#navigation",this.nav_qt_wrapper);
		if (nav.length==0){
			return;
		}
		
		
		/*
		dojo.connect(dojo.byId("navigationEnd"),"onfocus",_this,_this.closeAll);
		dojo.forEach(
			dojo.query("#navigation a[id]",this.nav_qt_wrapper),
			function(el){
				var obj = dojo.byId(dojo.attr(el,"rel"));
				if (obj){
					dojo.connect(el,"onfocus",dojo.hitch(_this,_this.openV1,obj));
				}
			}
		);
		*/
		
		/*
		 * Since the navigation is a collection of list elements, iterate through each list to add the appropriate event handlers
		 */
		dojo.forEach(
			dojo.query("#navigation > ul > li",this.nav_qt_wrapper),
			function(el){
				/*
				 * Calculate the height on initialization and save it as an attribute.
				 * This should make the animations smoother as it will not have to perform a height calculation each time.
				 * Instead, the height will be pulled from the attribute.
				 */
				var wrapper = dojo.query('.wrapper',el)[0];
				wrapper = dojo.coords(wrapper);
				dojo.attr(el,'rel',wrapper.h+14);
				
				/*
				 * On mouse enter, tween the height of the dropdown height to what was calculated on load
				 */
				dojo.connect(el,"onmouseenter",dojo.hitch(el,_this.open));

				/*
				 * On mouse leave, tween the height of the dropdown to 0
				 */
				dojo.connect(el,"onmouseleave",dojo.hitch(el,_this.close));
				
				
				dojo.forEach(
					dojo.query("a",el),
					function(obj,index){
						dojo.connect(obj,"onfocus",dojo.hitch(el,_this.openAlt));
						dojo.connect(obj,"onblur",dojo.hitch(el,_this.closeAlt));
					}
				);		
			}
		);
		
		/*
		 * Adjust the list-wrapper heights for only IE6 to control extra spacing
		 */
		if (dojo.isIE == 6){
			dojo.forEach(
				dojo.query("#navigation .dropdown .list-wrapper"),
				function(el){
					dojo.style(el,'height',(dojo.coords(el).h-10)+"px");
				}
			);
		}
		
	},
	
	/**
	 * 
	 */
	open : function(){
		clearTimeout(USPS.Navigation.timer);
		dojo.query(this,USPS.Navigation.nav_qt_wrapper).addClass("hover");
		if (USPS.Navigation.current!=null && USPS.Navigation.current != this) return;
		
		var obj = dojo.query(".dropdown",this);
		
		//if(){
		
		//}
		//else{

			dojo.animateProperty({
				node : obj[0],
				duration : USPS.isIE?10:USPS.settings.animation.duration.short,
				properties : {
					height : dojo.attr(this,"rel"),
					opacity:{
						start:USPS.isIE?1:0,
						end:1
					}
				}
			}).play();
		//}
		USPS.Navigation.current = this;
	},
	
	
	/**
	 * 
	 */
	openAlt : function(){
		var _this = this;
		if (this==USPS.Navigation.current){
			clearTimeout(USPS.Navigation.timer);
			return;
		}
		dojo.query(this,USPS.Navigation.nav_qt_wrapper).addClass("hover");
		var obj = dojo.query(".dropdown",this)[0];

		if (USPS.Navigation.current && USPS.Navigation.current!=this){
			var forceClose = dojo.hitch(USPS.Navigation.current,USPS.Navigation.closeForce);
			//forceClose();
		}
		
		dojo.animateProperty({
			node : obj,
			duration : 5,
			properties : {
				height : dojo.attr(this,"rel"),
				opacity:{
					start:USPS.isIE?1:0,
					end:1
				}
			}
		}).play();
		
		dojo.style(obj,"overflow","visible");
		
		var fn = function(){
			USPS.Navigation.current = _this;
		}
		setTimeout(fn,100);
	},
	
	/**
	 * 
	 */
	close : function(){
		var _this = this;
		var fn = function(){
			dojo.query(_this,USPS.Navigation.nav_qt_wrapper).removeClass("hover");
			var obj = dojo.query(".dropdown",_this);
			dojo.animateProperty({
				node : obj[0],					
				duration : USPS.isIE?10:USPS.settings.animation.duration.short,
				properties : {
					height : 0,
					opacity:USPS.isIE?1:0
				}
			}).play();
			USPS.Navigation.current = null;
		}
		
		fn();
	},
	
	/**
	 * 
	 */
	closeAlt : function(isMouse){
		var _this = this;
		
		var fn = function(){
			dojo.query(_this,USPS.Navigation.nav_qt_wrapper).removeClass("hover");
			var obj = dojo.query(".dropdown",_this);
			dojo.style(obj[0],{
				height : '0px',
				opacity:USPS.isIE?1:0,
				overflow:'hidden'
			});
			USPS.Navigation.current = null;
		}
		USPS.Navigation.timer = setTimeout(fn,75);
	},
	
	
	/**
	 * 
	 */
	closeForce : function(){
		var _this = this;
		
		var fn = function(){
			dojo.query(_this,USPS.Navigation.nav_qt_wrapper).removeClass("hover");
			var obj = dojo.query(".dropdown",_this);
			dojo.style(obj[0],{
				height : '0px',
				opacity:USPS.isIE?1:0,
				overflow:'hidden'
			});
			USPS.Navigation.current = null;
		}
		fn();
	},
	
	/**
	 * 
	 */
	closeAll : function(){
		var _this = this;
		dojo.forEach(
			dojo.query("#navigation > ul > li",USPS.Navigation.nav_qt_wrapper),
			function(el){
				var close = dojo.hitch(el,_this.close);
				close();
			}
		);
	}
}

/**
 * 
 * @namespace
 */
USPS.SelectDropdowns = {
		
	/**
	 * 
	 */
	settings : {
		exceptionClass : 'always-show'
	},
	
	/**
	 * 
	 */
	initialize : function(){
		if (dojo.isIE == 6){
			//We don't need this anymore since we only have styled dropdowns
			
			//dojo.subscribe("hideSelects",this,this.toggle);
		}
	},
	
	/**
	 * 
	 */
	toggle : function(val){
		var _this = this;
		if (val){
			dojo.forEach(
				dojo.query("select"),
				function(el){
					if (!dojo.hasClass(el,_this.settings.exceptionClass)){
						dojo.style(el,{'visibility':'hidden'});
					}
				}
			);
		} else {
			dojo.query("select").style({'visibility':'visible'});
		}
	}
},

/**
 * 
 * @namespace
 * @description This object is used for personalization.
 */
USPS.User = {
	/**
	 * @name USPS.User.isLoggedIn
	 * @description A boolean representing if the current user is logged in or not.  Currently, the common-js include file determines the value to set for this attribute.  Via query string, you can set the value of this parameter: ?loggedIn=true|false.
	 * @default false
	 * @type Boolean
	 */
	isLoggedIn : false,
	/**
	 * @name USPS.User.initialize
	 * @description Currently nothing
	 * @function
	 */
	initialize : function(){
	}
}

dojo.addOnLoad(function(){
	//Setup modules
	dojo.registerModulePath("usps", "../../usps/modules/usps");
	dojo.registerModulePath("plugd", "../../external/plugd");
	
	dojo.require("dojo.parser");
	dojo.require("usps.domExtenders");
	dojo.require("usps.utilFunctions");
	dojo.require("dijit._base.place");
	// dojo.require("usps.utilityWidget");
	dojo.require("dojo.fx");
	dojo.require("dojo.fx.easing");
	dojo.require("usps.utils.trigger");
	dojo.require("usps.utils.Hoverable");
	dojo.require("usps.utils.DefaultTextValue");

	//Initialize global objects / methods
	
	
	USPS.initialize();
	USPS.Paint();

	
	//return;
	USPS.SearchForm.initialize();
	USPS.Navigation.initialize();
	USPS.SelectDropdowns.initialize();
	USPS.User.initialize();
});

dojo.addOnUnload(function(){
	dojo.forEach(USPS.Events, function(ev){
		dojo.disconnect(ev);
	});
});

// Search Client Hostname
var search_client_hostname = "";