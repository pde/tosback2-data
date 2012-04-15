dojo.registerModulePath("mojo", "../../src");
dojo.registerModulePath("cox", "../../cox");
dojo.registerModulePath("stdlib", "../../stdlib");
dojo.registerModulePath("extLib", "../../lib");

//Provides the Omniture Suite with the ability to change suiteID's between
//different environments. Sometimes we don't want Omniture
//receiving metrics from our dev environments 

dojo.require("mojo.controller.Map");
dojo.require("cox.SiteMap");

if (typeof cox == "undefined")
	cox = { runmode: "development" }
else	
	cox.runmode = "development"

var init = function() {
	var ctrlIniter = mojo.controller.Map.getInstance();
	ctrlIniter.setSiteMap(cox.SiteMap);
	ctrlIniter.mapControllers(window.location.href);
}
dojo.addOnLoad(init);
