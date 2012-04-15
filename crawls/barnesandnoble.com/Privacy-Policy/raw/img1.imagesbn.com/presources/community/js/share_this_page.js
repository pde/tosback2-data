
var pageTitle;
var pageHref;


	
	function generateShareLink(optionalTitle, optionalHref) {
	    if(optionalTitle) {
	        pageTitle = encodeURIComponent(optionalTitle);
	    } else {
	        pageTitle = encodeURIComponent(document.title);
	    }
	
	    if(optionalHref) {
	        pageHref = encodeURIComponent(optionalHref);
	    } else {
			if($("#taf-permalink").exists() && $("#taf-permalink").text().length>0) {
					pageHref = $("#taf-permalink").text();
				}
			else {
				pageHref = encodeURIComponent(location.href);
			}
	   }
		
	    document.writeln('<div id="share">\n        <div id="shareLinkArrow">\n          <a href="javascript:void(0)" id="sharePageLink" class="down-arrow navLink">Share<\/a>\n        <\/div>\n\n        <div id="sharePageDropdown" class="sharePageDropdown">\n          <div class="linkItems" style="margin-left: 10px; margin-top: 5px; width: 145px; height: 105px;overflow: hidden; background-color: #FAFAFA;">\n           <ul style="list-display-style: none; margin-left: 0px; padding-left: 0px; margin-right: 10px; margin-top: 4px; margin-right: 6px;">\n              <li class="shareLink" name="0">\n                <a href="#">\n                  <div>\n                    <img src="' + $.hosts.resources + '\/pimages\/share\/digg.gif"\/>\n                    <span class="shareLinkText"> Digg<\/span>\n                  <\/div>\n                <\/a>\n              <\/li>\n              <li class="shareLink" name="1">\n                <a href="#">\n                  <div>\n                    <img src="' + $.hosts.resources + '\/pimages\/share\/celicious.gif"\/>\n                    <span class="shareLinkText"> Del.icio.us<\/span>\n                  <\/div>\n                <\/a>\n              <\/li>\n              <li class="shareLink" name="2">\n                <a href="#">\n                  <div>\n                    <img src="' + $.hosts.resources + '\/pimages\/share\/facebook.gif"\/>\n                    <span class="shareLinkText"> Facebook<\/span>\n                  <\/div>\n                <\/a>\n              <\/li>\n              <li class="shareLink" name="3">\n                <a href="#">\n                  <div>\n                    <img src="' + $.hosts.resources + '\/pimages\/share\/reddit.gif"\/>\n                    <span class="shareLinkText"> Reddit<\/span>\n                  <\/div>\n                <\/a>\n              <\/li>\n              <li class="shareLink" name="4">\n                <a href="#">\n                  <div>\n                    <img src="' + $.hosts.resources + '\/pimages\/share\/Stumbleupon.gif"\/>\n                    <span class="shareLinkText"> StumbleUpon<\/span>\n                  <\/div>\n                <\/a>\n              <\/li>\n              <\/ul>\n          <\/div>\n        <\/div>\n     <\/div>');
	
	    var container = $("#share");
	    container.pngFix();
	
	    initLinks();
	}
	
	function checkMeta() {
	  var metas = document.getElementsByTagName('META');
	  var i;
	  var TestVar = "";
	
	
	  for (i = 0; i < metas.length; i++)
	    if (metas[i].getAttribute('NAME') == "description")
	      break;
	  if (metas[i]) {
	  	TestVar = metas[i].getAttribute('CONTENT');
	  }
	  return TestVar;
	}
	
	function initLinks() {

		var menu=new Array()
	    menu[0]='http://www.digg.com/submit/?phase=2&url=' + pageHref + '&title=' + pageTitle + '&bodytext=' + encodeURIComponent(checkMeta());
	    menu[1]='http://del.icio.us/post?v=4&noui&jump=close&url=' + pageHref + '&title=' + pageTitle;
	    menu[2]='http://www.facebook.com/share.php?u=' + pageHref + '&title=' + pageTitle;
	    menu[3]='http://reddit.com/submit?url=' + pageHref + '&title=' + pageTitle;
	    menu[4]='http://www.stumbleupon.com/submit?url=' + pageHref + '&title=' + pageTitle;
	
	    //Initialize share link
	    var shareLink = $("#share");
	    shareLink.hover(function(e) {
	            showShareDropdown();
	        },
	        function(e) {
	            hideShareDropdown();
	    });
	
	    var shareLink = $(".shareLink");
	    shareLink.each(function(e) {
	        $(this).click(function(e) {
	        //    if(canUseEmailOrShare()) {
	                var url = $(this).attr("name");
	                window.open(menu[url]);
	        //    } else {
	        //        e.preventDefault(e);
	        //        showEmailSharePrivacyError("Share");
	        //    }
	        });
	
	        $(this).hover(function() {
	            $(this).addClass("shareLinkHover");
	            },
	            function() {
	            $(this).removeClass("shareLinkHover");
	        });
	    });
	}
	
	function showShareDropdown() {
	    var shareDrop = $("#sharePageDropdown");
	    shareDrop.show();
	}
	
	function hideShareDropdown() {
	    var shareDrop = $("#sharePageDropdown");
	    shareDrop.hide();
	}


 