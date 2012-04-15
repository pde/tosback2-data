/*
 * Functionality to support the tabbed content component
 * @namespace
 */
USPS.HeightCheck = {
	initialize : function(){
		var promos = dojo.query(".info-module, .promo-bucket");
		if (promos.length && promos.length > 0){
			dojo.forEach(
				promos,
				function(el){
					var d = dojo.coords(el);
					if (d.h < 100){
								dojo.addClass(el, "short");
					}
				}
			);
		}
	}
}


/*
 * Functionality to support the tabbed content component
 * @namespace
 */
USPS.TabComponent = {

		/**
		 * 
		 */	
	tabInit : false,

	/**
	 * 
	 */
	tabModes : ["1", "2", "3", "4", "5", "6"],
	
	/**
	 * 
	 */
	initialize : function(){
		var _this = this;
				
		//Initialize tabs
		dojo.forEach(
			dojo.query("#tabs li"),
			function(obj){
				dojo.connect(obj,"onmouseenter",function(){
					dojo.addClass(this,"hover");
				});
				dojo.connect(obj,"onmouseleave",function(){
					dojo.removeClass(this,"hover");
				});
			}
		);
		
		//Initialize tabs
		dojo.forEach(
			dojo.query("#tabs a"),
			function(obj,i){
				dojo.attr(obj,"rel",obj.innerHTML);
				dojo.connect(obj,"onclick",_this,_this.selectTab);
				dojo.attr(obj,"index",i);
				obj.title="";
			}
		);

		//set min width for IE6
		if (dojo.isIE == 6){
			dojo.forEach(
				dojo.query("#tabs li a"),
				function(obj){
					var w = dojo.coords(obj).w;
					if (w<_this.minWidth){
						dojo.style(obj,{
							'width':_this.minWidth+'px'
						});
					}
				}
			);
		}
		
		if ( dojo.byId("tabbed-content") ) {
			dojo.trigger(dojo.query("#tabs a")[dojo.byId("tab-mode").value],"click");
			if (dojo.isFF && dojo.isFF==2){
				USPS.TabComponent.selectTab();
			}
		}

	},
	
	/**
	 * 
	 */
	selectTab : function(ev){

		if (ev){
			ev.preventDefault();
			dojo.query("#tabbed-content #tabs ul li a").forEach(function(item,index){
				dojo.query(".active-ind").orphan();
				//item.title="";
				});
			if (this.tab){
				dojo.removeClass(this.tab.parentNode,"selected");
			}		
			this.tab = ev.currentTarget;
		} else {
			this.tab = dojo.query("li","tabs")[0].firstChild;
		}
		
		dojo.addClass(this.tab.parentNode,"selected");
		//this.tab.title="active";
		dojo.place('<span class="active-ind hide-fromsighted">, active</span>',this.tab);
		dojo.removeClass(this.tab,"hover");
		
		var oldIndex = dojo.byId('tab-mode').value;
		
		var index = dojo.attr(this.tab,"index");
		dojo.byId('tab-mode').value=index;
		dojo.forEach(USPS.TabComponent.tabModes, 
				function(entry){
					var panelId = "tab-content-"+entry;
					if ( dojo.byId(panelId) ) { dojo.addClass(dojo.byId(panelId), 'hidden'); }
				}
		);
		var tabId = "tab-content-" + USPS.TabComponent.tabModes[index];
		dojo.removeClass(dojo.byId(tabId), 'hidden');
		
		if ( USPS.TabComponent.tabInit == true ) { // this prevents endless recursion in IE 6 and 7
			USPS.TabComponent.tabInit = false;
		} else if ( oldIndex == 3 && dojo.isIE ) { // IE 6 and 7 cannot handle the rendering of the tab switch - this simulates the user clicking the tab a second time in those browsers
			USPS.TabComponent.tabInit = true;
			dojo.trigger(dojo.query("#tabs a")[dojo.byId("tab-mode").value],"click");		
		}

	}
}
/*
 * Functionality to support the content drawer component
 * @namespace
 */
USPS.DrawerComponent = {

	/**
	 * 
	 */	
	drawerInit : false,

	/**
	 * 
	 */
	drawerModes : ["1", "2", "3", "4", "5", "6"],

	/**
	 * 
	 */
	drawerPulls : null,

	/**
	 * 
	 */
	drawerBodies  : null,
	
	/**
	 * 
	 */
	initialize : function(){

		if ( dojo.query("div.content-drawers").length == 0 ) { return; };
		
		var _this = this;
		var index = dojo.byId("drawer-open").value - 1;
				
		_this.drawerPulls = dojo.query(".content-drawers dt");
		_this.drawerBodies = dojo.query(".content-drawers dd");
		
		dojo.addClass(_this.drawerPulls[index], "open");
		dojo.addClass(_this.drawerBodies[index], "open");
		dojo.style(_this.drawerBodies[index], "display","block");
		//Initialize drawers
		dojo.forEach(
			dojo.query(".content-drawers dt a"),
			function(obj,i){
				dojo.attr(obj,"rel",obj.innerHTML);
				dojo.connect(obj,"onclick",_this,_this.selectDrawer);
				dojo.attr(obj,"index",i+1);
			}
		);
		
	},
	
	/**
	 * 
	 */
	selectDrawer : function(ev){

		var _this = this;
		var eventTarget = ev.currentTarget;
		
		if (ev){
			ev.preventDefault();
			this.drawer = ev.currentTarget;
		} 

		var oldIndex = dojo.byId("drawer-open").value - 1;
		dojo.byId("drawer-open").value = dojo.attr(this.drawer, "index");
		var newIndex = dojo.byId("drawer-open").value - 1;
		
        var anim1 = dojo.fx.wipeOut({ node: _this.drawerBodies[oldIndex], duration: 500 });

        dojo.connect(anim1, "onBegin", function(){
	   		dojo.removeClass(_this.drawerPulls[oldIndex],"open");
			dojo.removeClass(_this.drawerBodies[oldIndex],"open");
        });
        dojo.connect(anim1, "onEnd", function(){
        	anim2.play();
        });
       
        var anim2 = dojo.fx.wipeIn({ node: _this.drawerBodies[newIndex], duration: 500 });
        dojo.connect(anim2, "onBegin", function(){
    		dojo.addClass(_this.drawerPulls[newIndex],"open");
    		dojo.addClass(_this.drawerBodies[newIndex],"open");
    		dojo.style(_this.drawerBodies[newIndex], "display","block");
       });
       
        dojo.fx.combine([anim2, anim1]).play();

	}
}



dojo.require("dojo.fx");

dojo.addOnLoad(function () {
	USPS.TabComponent.initialize();
	USPS.DrawerComponent.initialize();
	USPS.HeightCheck.initialize();
});

function gup( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    
	if( results == null)
        return null;
    else
        return results[1];
}
var tab = gup("showtab"); 
if(tab !=null && tab != ''){
	if(tab==0){tab=1;}
  //document.getElementById('tab-mode').value= tab - 1;
	if (dojo.byId("tab-mode")){
		dojo.byId("tab-mode").value= tab - 1;
//		dojo.trigger(dojo.query("#tabs a")[tab],"click");
	}
	if (dojo.byId("search-tabs")){
//		dojo.byId("#search-tabs ul").value= tab - 1;
		if(tab=="con" || tab=="jud"){
			dojo.trigger(dojo.query("#search-tabs li a")[1],"click");		
		}else{
			dojo.trigger(dojo.query("#search-tabs li a")[0],"click");
		}
	}
}