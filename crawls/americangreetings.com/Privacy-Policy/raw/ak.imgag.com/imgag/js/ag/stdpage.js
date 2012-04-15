// description: home agx.currentPage initializer for pw

//waits for required layers, then requires the agx.currentPage resource, which
//in turn calls the generated javascript on the page
if(!agx.currentPage)agx.currentPage={};
agx.currentPage.waiter = agx.wait_for_events(
    ["/ag.layers.core/loaded/"],
    function(){
        dojo.require('ag.controllers.StandardPage');
        dojo.require('agi.go.popup');
        dojo.require('agi.go.join');
        dojo.require('agi.popaway');
        
        dojo.addOnLoad(function(){
            controller = new ag.controllers.StandardPage(agx.currentPage);
            agx.currentPage.controller = controller;
        });
    }
);
