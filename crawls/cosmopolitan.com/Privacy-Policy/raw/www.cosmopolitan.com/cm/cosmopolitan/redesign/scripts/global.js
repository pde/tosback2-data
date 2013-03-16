$(document).ready(function() {
	
	
			
	// ----- back to top button
	$(".backtotopbutton").click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	})
	
	// ----- search box
	$("#HDM_site #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
			$(this).val("");
		}
	})
	$("#HDM_site #aux_search").blur(function(){
		if ($(this).val()=="") {
			$(this).val("search cosmo...");
		}
	})
	// ----- stickymenu search box
	$(".stickymenu #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
			$(this).val("");
		}
	})
	$(".stickymenu #aux_search").blur(function(){
		if ($(this).val()=="") {
			$(this).val("search cosmo...");
		}
	})

	$(document).scroll(function(){
		$(".tyntShIh").removeClass("tyntIhHover");		
	})	
});

HDM.menu.init = function(){
	console.log("hello");
		// before we do *anything*, clone the nav and place it into the screen-menu element..
		$('[role=screen-menu]').insertBefore('[role=screen-top]')
		// this must be cloned before being occurs
		this._vars.jqNavOverlay = $("[role=screen-menuoverlay]");
		
		var panelHeader = $("#HDM_panelHeader")
		panelHeader.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		
		var panelHeaderClone = panelHeader.clone(true,true);
		panelHeaderClone.find("#mainheader span[id^='ams_']").remove();
		panelHeaderClone.appendTo(HDM.menu._vars.jqNavOverlay);
			
		console.log("1 : " + panelHeader);
		console.log("2 : " + panelHeaderClone);
		
		
//		$("#HDM_panelHeader").clone().appendTo(HDM.menu._vars.jqNavOverlay);
		var roleNavul = $('[role=navigation]>ul.nav').eq(1);
		roleNavul.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		roleNavul.clone(true,true).appendTo('[role=screen-menu]');
//		$('[role=navigation]>ul.nav').eq(1).clone().appendTo('[role=screen-menu]');
//		$("[role=screen-menu] .tier2").appendTo("[role=screen-menu]");// moving the t2 nav items to 'top level'
		this._vars.wrapscreen = document.querySelector("[role=screen-top]");
		this._vars.jqnavtier1 = $("ul.nav.tier1");
			if(this._vars.jqnavtier1.attr("role")=="menu-dropdown")
			this._vars.altDropDown = true;
		this._vars.jqWrap = $("[role=screen-top]");
		this._vars.jqMenuHeader = $("[role=menu-header]");
		this._vars.jqnavTarget = $("[topnavtarget]");
		this._vars.body = $(document.body);
		this._vars.domScreenTop = this._vars.jqWrap[0];



		var listonavs = document.querySelectorAll("a[topnav]");
		$(listonavs).bind('click',HDM.menu.click);
		var listocloset2 = document.querySelectorAll(".tier2 .tier2close")
		$(listocloset2).bind('click',HDM.menu.closetier2);


		$("[role=menusubback]").bind('click',function(){HDM.menu.tier2(-1);})
//		$("[role=screen-top]").bind('click',function(e){HDM.menu.close(e)})
//		$("[role=menuclose]").bind('click',function(e){HDM.menu.close(e)})
		HDM.menu._vars.domlistonavs = listonavs;
		$("[role=menuopen]").bind('click',function(e){HDM.menu.open(e)}).bind('touchstart',function(e){HDM.menu.open(e)});

		$(window).scroll(function(){
			var wo = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
//			console.log(wo,HDM.menu._vars.stickyScrollThreshold.top,HDM.menu._vars.stickyState)
			if((wo > HDM.menu._vars.stickyScrollThreshold.top) && (!HDM.menu._vars.stickyState)){
//				console.warn("SHOW STICKY STATE!")
				HDM.menu._vars.stickyState = true;
				HDM.menu._vars.jqNavOverlay.addClass("visible");
				$("#HDM_panelHeader").addClass("hidden");
			} else if((wo <= HDM.menu._vars.stickyScrollThreshold.top)&&(HDM.menu._vars.stickyState)){
//				console.warn("HIDE STICKY STATE!")
				HDM.menu._vars.stickyState = false;
				HDM.menu._vars.jqNavOverlay.removeClass("visible");
				$("#HDM_panelHeader").removeClass("hidden");
			}
		}).resize(function(){
			HDM.menu.fn.getNavScrollThreshold();
		});
		HDM.menu.fn.getNavScrollThreshold(); // at least run it once..

	}