$(document).ready(function () {

    var docWidth = $(document).width();	
	
	//accessibility
    var firstLink = $(".content-wrapper").find("a").eq(0);
    var accessibility = new Accessibility();
    accessibility.customfunction1 = function (e, node, group, obj) {
        if (group.last().is(node) && e.shiftKey == false) {
            obj.prevNode = null;
            obj.setFocus(firstLink);
        }
    }
    accessibility.gotoSubmenu = function (e, node, group, obj) {
		//down arrow
		if(e.keyCode==40)
		{
			e.preventDefault();
			obj.prevNode = null;
			obj.setFocus(node.next().find("a").eq(0));
		}
    }
	accessibility.gotoSubmenuItems = function (e, node, group, obj) {
		//down arrow
		if(e.keyCode==39)
		{
			e.preventDefault();
			node.trigger("mouseenter");
		}
		else if(e.keyCode==37)
		{
			e.preventDefault();
			node.next(".col-two").css("display","none");
		}
    }
    accessibility.gotoNav = function (e, node, group, obj) {
        obj.toggleInfoBox();
        obj.updateToolTip(500);
        obj.selectedNodeNo = 0;
        obj.prevNodeNo = 0;
        obj.insideGroup = true;
        obj.setFocus($(".navigation > li > a").eq(0));
    }
    accessibility.gotoContent = function (e, node, group, obj) {
        obj.toggleInfoBox();
        obj.updateToolTip(500);
        obj.setFocus(firstLink);
    }
    accessibility.gotoFooter = function (e, node, group, obj) {
        obj.toggleInfoBox();
        obj.updateToolTip(500);
        obj.setFocus($("footer").find("a").eq(0));
    }
    accessibility.setInstructions($(".accessibility"));
    accessibility.setHideOnMouseMove(true);
    accessibility.setToolTipTemplate("<div class='tooltip'><!--text--><span class='point'></span></div>");
    //accessibility.addDirection($(".language select"),"bottom");
    //accessibility.addDirection($(".global-search-input input"),"bottom");

    accessibility.addToolTip($(".navigation > li > a"), "Press down arrow to navigate to sub menu items. Then press tab.");
    accessibility.addToolTip($(".dir-link > .arrow").parent(), "Press right/ left arrows to show/ hide menu items. And press tab to access items.");
    accessibility.addToolTip($("select"), "Press Alt + Up/ Down arrow");
    accessibility.addToolTip($(".global-search-input input"), "Type keywords to search");
    accessibility.addToolTip($(".search input"), "Press enter to search.");
    accessibility.addToolTip($(".btn-ql"), "Press enter to expand/collapse.");
    accessibility.addToolTip($("input[type=checkbox]"), "Press space bar to select/ deselect.");
    accessibility.addToolTip($("input[type=radio]"), "use arrow keys to select.");

    //rules for global nav
    accessibility.addRule("group .navigation > li > a");
    accessibility.addRule("focus on .navigation > li > a trigger mouseenter on parent()");
    accessibility.addRule("blur on .navigation > li > a trigger mouseleave on parent()");
    accessibility.addRule("focus on $('.content-wrapper').find('a').eq(0) trigger mouseleave on .navigation > li > a");
    accessibility.addRule("keydown on .navigation > li > a run gotoSubmenu(e,node,group,obj)");
    accessibility.addRule("keydown on .navigation li .dir-link run gotoSubmenuItems(e,node,group,obj)");
    accessibility.addRule("blur on .navigation > li > a run customfunction1(e,node,group,obj)");
    accessibility.addRule("click on #gotoNav run gotoNav(e,node,group,obj)");
    accessibility.addRule("click on #gotoContent run gotoContent(e,node,group,obj)");
    accessibility.addRule("click on #gotoFooter run gotoFooter(e,node,group,obj)");
    if (docWidth > 640) {
        accessibility.init();
    }
    else {
        accessibility.detectImageEnabled();
    }

    if (accessibility.exception != null)
        alert(accessibility.exception);
		
});