// on document ready
$(function(){   

  	$("#searchTop,#searchBot,#fmSearch2,#tickerValue").clearField();
	
	// setup ul.tabs to work as tabs for each div directly under div.panes
	$("ul.marketing-tabs, ul.news-tabs, ul.wide-tabs").tabs("div.panes > div");
	
	// initialize scrollable
	$(".scrollable").scrollable({ circular: false });
	
	//Add ender class on index page's section boxes headline lists	
	$("#sports li").last().addClass("ender");
	
	$("#news li").last().addClass("ender");
	
	$("#business li").last().addClass("ender");
	
	$("#lifestyles li").last().addClass("ender");
	
	$("#entertainment li").last().addClass("ender");
	
	$("#spotlight li").last().addClass("ender");
		 
	$("dt").last().addClass("ender"); //DTI specific list item type
	
	//Add ender class for homepage featured stories lists
	$("#featured-headlines li").last().addClass('ender');
	
	//Add ender class for article page related stories
	$("#story li").last().addClass('ender');
	
	$("#related-stories-container li").last().addClass('ender');
	
	//Remove the last <li> divider on the secondary nav
	$("#second-level-nav li.divider:last").remove();
	
	$(".second-nav li.divider:last").remove();
	
	// Dynamically add "middle" class to columnist boxes. It just makes it easier,
	// so when we add/remove columnists, we don't have to move all the "middle"
	// classes around. Big hassle.  --SAH 20110427
	$('div.columnists').find('.author-box').each(function(i) {
		if (i % 3 == 1) //i modulus 3.. middle box index could be 1, 4, 7, 10, etc
			$(this).addClass('middle');
	});
	
});

// Breaking News Alert cookie and bar
$(document).ready(function(){   
	
		//checks to see if the cookie has been set to a collapsed state
		var breakingNews = $.cookie('breakingNews');		
            if (breakingNews == 'collapsed') {                       
                        $('.collapseMessagebox').css("display","none");
                        $('#message_box').css('border','0');
                        $('#message_box').css("height","0px");
			  }
			else 
			  {  
				//if not, display the breaking news bar
				  var pos=parseInt($(window).scrollTop())+parseInt($(window).height());
					$('#message_box').css("top",pos-54+"px");
					$('#message_box').show(); //display the message box 
			  }			
			   //when the close button at right corner of the message box is clicked 
			   //then set the cookie with a lifetime of three minutes
				  $('.collapseMessagebox').click(function() {                        	
					$('#message_box').animate({ top:"-=0px", left:"-=2000px",opacity:0 }, "slow");
					$.cookie('breakingNews', 'collapsed', { expires: 7 });
			});
});







