
//ON LOAD
jQuery(document).ready(function(){
//start fuctions//
//*************************************

	//nav forums
	jQuery("#crumbs-dropdown-wrp").hover(function(){
		jQuery("#vertical-nav").show();
		jQuery(this).addClass("hov")
		hideDropdowns(true, false);
	},function(){
		jQuery("#vertical-nav").hide();
		jQuery(this).removeClass("hov");
		hideDropdowns(false, false);
	});

	//nav forums
	jQuery("#crumbs-nav #vertical-nav-menu").hover(function(){
		hideDropdowns(true, false);
	},function(){
		window.setTimeout(function() {
			if( !jQuery("#crumbs-dropdown-wrp").hasClass("hov")) hideDropdowns(false, false);
		}, 100);
	});

	jQuery("#vertical-nav-menu li").hover(function(){
		jQuery(this).children('ul').show();
		jQuery(this).addClass("hov");
	},function(){
		jQuery(this).children('ul').hide();
		jQuery(this).removeClass("hov");
	});

	//main nav
	jQuery("#main_nav2 li").hover(function(){
		jQuery(this).children('ul').show();
		jQuery(this).addClass("cur")
	},function(){
		jQuery(this).children('ul').hide();
		jQuery(this).removeClass("cur");
	});

	//clear textarea
	jQuery(".clear-btn").click(function(){
		jQuery(".clear-obj-wrp textarea").val("");
	return false;
	});

	//expand collapse latest articles
	jQuery(".posts-latest-articles a").click(function(){
		var articlesContainer = this.parentNode.parentNode;
		var regEx = /expanded/;
		if ( articlesContainer.className.search(regEx) > 0 ) {
			jQuery(articlesContainer).removeClass("expanded");
			jQuery(articlesContainer).addClass("collapsed");
		} else {
			jQuery(articlesContainer).removeClass("collapsed");
			jQuery(articlesContainer).addClass("expanded");			
		}
	});


//*************************************
//end fuctions//
});

//soring class
function sorting()
{
	 this.refreshForumSorting = function(){
		//ajax sorting
		jQuery(".forumSorter a").click(function(){
			var strHref = this.href + "&partial=yes";
			var o = new overlay;
			o.show();
			jQuery.get(strHref, function(data){
				if(data.toString() != "")
				 {
				 	jQuery("#results-wrp").empty().append(data);
					o.hide();
					refreshForumSorting()
				 }
	 		});
			return false;
		});
	}
}
