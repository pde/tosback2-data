$(document).ready(function(){
    if($("#quotes_list")[0]){
        //$('#quotes_list li:active').css("opacity", 0.99);
        
        setInterval(function(){
            quotesCycle('quotes_list');
        }, 6000);
    }

    if($("li.email")[0]){
        //fixEmails("Contact");
    }
    
    handleApi();
});

// Does the slide up/down for panes 
function slidePanes(id){
    
    var selector = "#"+id;
    $(selector).siblings(":visible").slideUp("slow",function(id){
        $(selector).slideDown("slow");
    });
    
    return false;
}

// Does the fade in/out for quotes 
function quotesCycle(id){
    
    var selector = "#" + id;
    var next;
    
    $(selector).children(".active").animate({opacity: 0.0},"slow", function(){
        $(this).toggleClass("active");
        next = $(this).next();
        if(next[0]) { 
            //next.fadeIn(); 
            next.animate({opacity: 0.99},"slow");
            next.toggleClass("active");
        } else {
            next = $($(selector).children()[0]);
            //next.fadeIn();
            next.animate({opacity: 0.99},"slow");
            next.toggleClass("active");
        }
    });

}

var fixEmails = function(text){

    $("li.email").each(function(i){
    
        var email = $(this).html();
        if (text == ""){text = email;}
        email = email.replace(" (at) ", "@");
        $(this).html("<a href='mailto: "+ email +"'>" + text + "</a>");
        
    });
}

function handleApi() {
    $("div.api a.docToggle").click(function() {
        var docBlock = $(this.parentNode.parentNode).siblings("dl");
        $(docBlock).slideToggle(300).toggleClass("closed");
        
        if(docBlock.hasClass("closed")) {
            $(this).text("Hide Documentation");
        } else {
            $(this).text("Show Documentation");
        }
        return false;
    });
}


function lightbox(anchor){

   // create modal box
	var options = {
		ajax: $(anchor).attr('href'),
		onHide: function(hash) {
			gs.modal_hide(hash);
		},
		onShow: function(hash) {
			gs.modal_show(hash);
		}
	};
	var divinfo = {
		newid: 'lightbox',
		newclass: 'info'
	};
	gs.lbFactory.newModalBox(options, divinfo, true);
	
	return false;
}

function toggleInfo(anchor){
	$(anchor).siblings('.infoBox').slideToggle('fast');	
}
