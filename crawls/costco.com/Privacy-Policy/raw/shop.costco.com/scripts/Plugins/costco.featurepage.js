jQuery(document).ready(function() {
    showDefaultContent();
    addClickEventToTabs();
});

function showDefaultContent() {
    jQuery(".contenttabs > DD > .tabadspot:not(:first)").hide();
    jQuery(".contenttabs > DD > .tabcontent:not(:first)").hide();
    jQuery(".contenttabs > DD > .tabadspot:first").css("left", "0");

    var activeTab = jQuery(".contenttabs > DT > A > IMG:first");
    if (activeTab.attr("src") != null) 
    {
        activeTab.attr("src", activeTab.attr("src").replace(/\.png$/, "_on.png"));
    }
}

function addClickEventToTabs() {
    jQuery(".contenttabs > DT > A").click(function() {
        var requestedTab = jQuery(this).parent().next("DD");
        if (requestedTab.children(".tabadspot:not(:visible)").length != 0) {
            hideActiveTab(requestedTab);
            markTabAsSelected(jQuery(this));
        };
    });
}

function markTabAsSelected(el) {
    jQuery(".contenttabs > DT > A > IMG").each(function() {
        this.src = this.src.replace(/_on\.png$/, '.png');
    });

    var tabImage = el.children("IMG");
    tabImage.attr("src", tabImage.attr("src").replace(/\.png$/, "_on.png"));
}

function hideActiveTab(el) {
    var activeTabAdSpot = jQuery(".contenttabs > DD > .tabadspot:visible");
    var activeTabContent = jQuery(".contenttabs > DD > .tabcontent:visible");
    activeTabAdSpot.animate({ left: -activeTabAdSpot.outerWidth() }, 500, "swing", showRequestedTab(el)).hide(50);
    activeTabContent.slideToggle(500);
}

function showRequestedTab(el) {
    var tabAdSpot = el.children(".tabadspot");
    var tabContent = el.children(".tabcontent");
    tabAdSpot.show(500).delay(100);
    tabAdSpot.animate({ left: 0 }, 500, "swing", function() {
        tabContent.slideToggle(500);
    }).delay(1000);
}