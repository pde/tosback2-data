var config = { 
	"twitter": {
		"username": "journeysshoes",
		"numtweets": 15,
		"curitem": 0,
		"firstrun":1,
		"speed":5000,
		"reloadtimeout":15000,  // 5 minute reload timeout
		"data": [] 
	},
	"atcnavitem": 0
};

var _g = {
	debug: 0
};

var infOn = false;
var youthOn = false;
var tweenOn = false;
var xmljson, promosjson, numPromos = 0, switchTimer, activeSlide, nextSlide, paused=false, numBrands = 0, brandTimer, hiddenBrands = new Array();
function randomXToY(minVal,maxVal,floatVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}
function clearPlayer(){
	clearTimeout(switchTimer);
	paused = true;
	activeSlide = $('ul#flip-nav li').index($('ul#flip-nav li.active'));
	nextSlide = ( activeSlide == numPromos -1 ) ? 0 : activeSlide + 1;
}
function setFlipper(){
    numPromos = $("div#flip-hero a.lnk-flip").length;
    $('div#flip-hero a.lnk-flip').each(function()
    {
        var $link = $(this);
        var newZ = 10 * (numPromos - $('div#flip-hero a.lnk-flip').index($link));
        $(this).css('z-index', newZ)
    });
    $('div#flip-hero a.lnk-flip:first').fadeIn().addClass('active');
}
function swapBrand(){
    var random = Math.floor( Math.random()*10 );
    var newGuy = hiddenBrands[0];
    var oldGuy = $('div#dvBrandCrave a.lnk-brand:eq(' + random + ')');
    var clone = $('div#dvBrandCrave a.lnk-brand:eq(' + random + ')').clone();
    var fadeSpeed = randomXToY(600,900);
    var swapTime = randomXToY(2500,3500);
    //console.log('swap', ' new: ' + newGuy.attr('href'), ' old: ' + newGuy.attr('href'));
    hiddenBrands.shift();
    hiddenBrands.push(clone);
    oldGuy.after(newGuy);
    newGuy.hide().css({
        'left': oldGuy.css('left'),
        'z-index': 99
    });
    oldGuy.fadeOut(fadeSpeed).delay(fadeSpeed).remove();
    newGuy.fadeIn(fadeSpeed).css('z-index',100);
    brandTimer = setTimeout(swapBrand, swapTime);
    var random = null;
    var newGuy = null;
    var oldGuy = null;
    var clone = null;
    var fadeSpeed = null;
    var swapTime = null;
}
function setBrands(){
    $('div#dvBrandCrave a.lnk-brand').each(function(){
        var left = 0;
        left = 73 * numBrands;
        $(this).css('left',left+'px');
        if (numBrands > 9) { 
            hiddenBrands.push($(this));
        }
        numBrands++;
    });
	brandTimer = setTimeout(swapBrand, 3000);
}
function changeSlide(gotoslide){
	$('div#flip-hero a.lnk-flip').removeClass('active').fadeOut();
	$('div#flip-hero a.lnk-flip:eq(' + gotoslide + ')').addClass('active').fadeIn();
	$('ul#flip-nav li').removeClass('active').css('width','');
	$('ul#flip-nav li:eq(' + gotoslide + ')').animate({width:'49px'}, 200).addClass('active');
	activeSlide = gotoslide;
	nextSlide = ( activeSlide == numPromos - 1 ) ? 0 : activeSlide + 1;
	if ( !paused ){
		switchTimer = setTimeout( function(){ changeSlide(nextSlide) }, 4000 )
	}
}

function moveDropCart() {
    var adj = 925;
    var maxSetLeft = 737;
    if ($("td.bgMain").length) {
        adj = 950;
        maxSetLeft = 637;
    }
    
    var setLeft = ($(window).width() / 2) - (950 / 2) + adj - $("#dropCart").width();
    if (setLeft <= maxSetLeft) { 
        setLeft = maxSetLeft;
    } 
    
    $("#dropCart").css({
        'left': setLeft,
        'right':'auto'
    });
}



$(window).resize(function() {
        moveDropCart()
});


$(function() {
	
	if (!$("#dropCart").length) { 
	    var dropCart = $('<div id="dropCart" />');
	    $('body').append(dropCart);
	    
	}
	
	
	//if ($("#dropCart").length) {
	    //console.log("dropCart exists");
	//}
	
	$("#dropCart").css({
	    'z-index':'500',
	    'top':'77px'    
	});
    moveDropCart();
	
	$("div.footer").hfdetach({
		'opt_obj': $("div.footerbar"),
		'zindex': 500
	});
	
	get_twitter_feed();
	ScrollMsg();

	
	if ($.client.browser == 'Explorer') {
		$("div.navbar a").css('display','block');
		$("div.navbar a img").css('margin','0px');
		$("div.navbar a.link_noise").css('margin-right','0px');
		$("input.searchbox").css('width','140px');
		
	}
	else if ($.client.browser == 'Firefox') {

	}
	
	if ( $("a#nav_link_infant img").attr('src') == '/images/_headerfooter/kz_infant_active.gif' ){
        infOn = true;
    }
    if ( $("a#nav_link_youth img:first").attr('src') == '/images/_headerfooter/kz_youth_active.gif' ){
        youthOn = true;
    }
    if ( $("a#nav_link_tween img").attr('src') == '/images/_headerfooter/kz_tween_active.gif' ){
        tweenOn = true;
    }
    
    $('a.lnk-flip').hide();
	switchTimer = setTimeout( function(){ changeSlide(1) }, 4000 );
	setFlipper();
	setBrands();
	$('a#flip-play-pause').live('click', function(e){
		activeSlide = $('ul#flip-nav li').index($('ul#flip-nav li.active'));
		var $link = $(this);
		if ( $link.hasClass('flip-btn-pause') ){
			clearPlayer();
		}else{
			paused = false;
			changeSlide(nextSlide);
		}
		$link.toggleClass('flip-btn-pause');
	});
	$('ul#flip-nav a.nav-num').live('click', function(e){
		clearPlayer();
		$('a#flip-play-pause').removeClass('flip-btn-pause');
		var $theLi = $(this).parent('li');
		var idx = $('ul#flip-nav li').index($theLi);
		changeSlide(idx);
	});
    
});


$("body").live('click', function() {
	hideCart();
});



$("input.searchbox").live('focus', function() {
	$(this).css('background','#9c9c9c');
}).live('blur', function() {
	$(this).css('background','#8d8d8d');
});

$("div.header-top-right a.store-locator, div.header-top-right_kidz a.store-locator, div.header-top-right_shi a.store-locator").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/storelocator_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/storelocator_normal.jpg');
});

$("div.header-top-right a.gift-cards, div.header-top-right_kidz a.gift-cards, div.header-top-right_shi a.gift-cards").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/giftcards_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/giftcards_normal.jpg');
});


$("div.header-top-right a.myaccount, div.header-top-right_kidz a.myaccount, div.header-top-right_shi a.myaccount").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/myaccount_hover.png');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/myaccount_normal.png');
});

// UNIVERSAL CART
$("div.header-top-right a.universalcart, div.header-top-right_shi a.universalcart, div.header-top-right_kidz a.universalcart, div.cart_text_section").live('mouseenter', function() {
	$("div.header-top-right a.universalcart img, div.header-top-right_kidz a.universalcart img, div.header-top-right_shi a.universalcart img").attr('src','/images/_headerfooter/universalcart_hover.png');
	$(this).css('cursor','hand');
}).live('mouseleave', function() {
	$("div.header-top-right a.universalcart img, div.header-top-right_kidz a.universalcart img, div.header-top-right_shi a.universalcart img").attr('src','/images/_headerfooter/universalcart_normal.png');
	$(this).css('cursor','normal');
}).live('click', function(e) {
	e.preventDefault();
	toggleCart();
    moveDropCart()
});

// subnav bar	===========================================

var menclick = 0;
var womenclick = 0;

$("div.navbar a.link_men").live('mouseenter', function() {
	if (menclick < 1) {
		$("img", this).attr('src','/images/_headerfooter/men_hover.jpg');
	}
}).live('mouseleave', function() {
	if (menclick < 1) {
		$("img", this).attr('src','/images/_headerfooter/men_normal.jpg');
	}
}).live('click', function(e) {
	e.preventDefault();
	if (menclick == 1) {
	    menclick = 0;
	    openSearch('guys', currProdType, true);
	    $("img", this).attr('src','/images/_headerfooter/men_hover.jpg');
	} else {
	    menclick = 1;
	    womenclick = 0;
	    $("img", this).attr('src','/images/_headerfooter/men_click.jpg');
	    $("div.navbar a.link_women img").attr('src','/images/_headerfooter/women_normal.jpg');
	    openSearch('guys', currProdType, false);
	}
});

$("div.navbar a.link_women").live('mouseenter', function() {
	if (womenclick < 1) {
		$("img", this).attr('src','/images/_headerfooter/women_hover.jpg');
	}
}).live('mouseleave', function() {
	if (womenclick < 1) {
		$("img", this).attr('src','/images/_headerfooter/women_normal.jpg');
	}
}).live('click', function(e) {
	e.preventDefault();
	if (womenclick == 1) {
	    womenclick = 0;
	    openSearch('girls', currProdType, true);
	    $("img", this).attr('src','/images/_headerfooter/women_hover.jpg');
	} else {
	    womenclick = 1;
	    menclick = 0;
	    $("img", this).attr('src','/images/_headerfooter/women_click.jpg');
	    $("div.navbar a.link_men img").attr('src','/images/_headerfooter/men_normal.jpg');
	    openSearch('girls', currProdType, false);
	}
});

$("div.navbar a.link_brands").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/brands_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/brands_normal.jpg');
});

$("div.navbar a.link_exclusives").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/exclusives_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/exclusives_normal.jpg');
});

$("div.navbar a.link_biggerfeet").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/biggerfeet_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/biggerfeet_normal.jpg');
});

$("div.navbar a.link_sale").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/sale_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/sale_normal.jpg');
});

$("div.navbar a.link_atc").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/atc_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/atc_normal.jpg');
});

$("div.navbar a.link_noise").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/noise_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/noise_normal.jpg');
});

//Kidz Nav

$("a#nav_link_infant").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_infant_active.gif');
}).live('mouseleave', function() {
	if ( infOn ){
        $("img", this).attr('src','/images/_headerfooter/kz_infant_active.gif');
    }else{
        $("img", this).attr('src','/images/_headerfooter/kz_infant_normal.gif');
    }
}).live('click', function(e){
    e.preventDefault();
    infOn = true;
    youthOn = false;
    tweenOn = false;
    var link = $(this);
    toggleShop('i');
    $("a#nav_link_youth img").attr('src','/images/_headerfooter/kz_youth_normal.gif');
    $("a#nav_link_tween img").attr('src','/images/_headerfooter/kz_tween_normal.gif');
    if ( $('div#shopNav').is(':visible') ){
        link.find('img').attr('src','/images/_headerfooter/kz_infant_active.gif');
    }else{
        link.find('img').attr('src','/images/_headerfooter/kz_infant_normal.gif');
    }
});

$("a#nav_link_youth").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_youth_active.gif');
}).live('mouseleave', function() {
	if ( youthOn ){
        $("img", this).attr('src','/images/_headerfooter/kz_youth_active.gif');
    }else{
        $("img", this).attr('src','/images/_headerfooter/kz_youth_normal.gif');
    }
}).live('click', function(e){
    e.preventDefault();
    infOn = false;
    youthOn = true;
    tweenOn = false;
    var link = $(this);
    toggleShop('y');
    $("a#nav_link_infant img").attr('src','/images/_headerfooter/kz_infant_normal.gif');
    $("a#nav_link_tween img").attr('src','/images/_headerfooter/kz_tween_normal.gif');
    if ( $('div#shopNav').is(':visible') ){
        link.find('img').attr('src','/images/_headerfooter/kz_youth_active.gif');
    }else{
        link.find('img').attr('src','/images/_headerfooter/kz_youth_normal.gif');
    }
});

$("a#nav_link_tween").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_tween_active.gif');
}).live('mouseleave', function() {
	if ( tweenOn ){
        $("img", this).attr('src','/images/_headerfooter/kz_tween_active.gif');
    }else{
        $("img", this).attr('src','/images/_headerfooter/kz_tween_normal.gif');
    }
}).live('click', function(e){
    e.preventDefault();
    infOn = false;
    youthOn = false;
    tweenOn = true;
    var link = $(this);
    toggleShop('t');
    $("a#nav_link_infant img").attr('src','/images/_headerfooter/kz_infant_normal.gif');
    $("a#nav_link_youth img").attr('src','/images/_headerfooter/kz_youth_normal.gif');
    if ( $('div#shopNav').is(':visible') ){
        link.find('img').attr('src','/images/_headerfooter/kz_tween_active.gif');
    }else{
        link.find('img').attr('src','/images/_headerfooter/kz_tween_normal.gif');
    }
});

$("div.navbar a.kz_link_exclusives").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_exclusives_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_exclusives_normal.jpg');
});

$("div.navbar a.kz_link_sale").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_sale_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_sale_normal.jpg');
});

$("div.navbar a.kz_link_promos").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_promos_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_promos_normal.jpg');
});

$("div.navbar a.kz_link_bdayclub").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_bdayclub_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/kz_bdayclub_normal.jpg');
});


$("a.rsslink").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/rss_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/rss_normal.jpg');
});


// FOOTER

$("div.footer_links a.link_share").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_share_hover.jpg');
	$("div.socialpop").show();
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_share_normal.jpg');
	$("div.socialpop").hide();
}).live('click', function(e) {
	e.preventDefault();
	$("div.socialpop").show();
});

$("div.socialpop").live('mouseenter', function() {
	$("div.socialpop").show();
	$("div.footer_links a.link_share img").attr('src','/images/_headerfooter/footer_share_hover.jpg');
}).live('mouseleave', function() {
	$("div.socialpop").hide();
	$("div.footer_links a.link_share img").attr('src','/images/_headerfooter/footer_share_normal.jpg');
});



$("div.footer_links a.link_facebook").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_facebook_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_facebook_normal.jpg');
});

$("div.footer_links a.link_youtube").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_youtube_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_youtube_normal.jpg');
});

$("div.footer_links a.link_twitter").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_twitter_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_twitter_normal.jpg');
});


// now handled by the livechat folks.
/*
$("div.footer_links a.link_livechat").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_livechat_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_livechat_normal.jpg');
});
*/

$("div.footer_links a.link_phone").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_phone_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_phone_normal.jpg');
});

$("div.footer_links a.link_signup").live('mouseenter', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_signup_hover.jpg');
}).live('mouseleave', function() {
	$("img", this).attr('src','/images/_headerfooter/footer_signup_normal.jpg');
});

	
	
$("div.sidebar a.sblink").live('mouseenter', function() {
	if (!$(this).hasClass('active')) {
		var src = $("img", this).attr('src');	
		var arr = src.split('/');
		var path = arr[0]+"/"+arr[1]+"/"+arr[2]+"/";
		var file = arr[3];
		var newfile = path + file.replace('_off_', '_on_');
		$("img", this).attr('src', newfile);
	}
}).live('mouseleave', function() {
	if (!$(this).hasClass('active')) {
		var src = $("img", this).attr('src');	
		var arr = src.split('/');
		var path = arr[0]+"/"+arr[1]+"/"+arr[2]+"/";
		var file = arr[3];
		var newfile = path + file.replace('_on_', '_off_');
		$("img", this).attr('src', newfile);
	}
});











//var SliderDest; //Where I want to end up
//var CurrentPage=1;
//var Timer;
//var Base = 950;

//function MoveTo(intPage){
//	if (!intPage) intPage=1;
//	SliderDest = (intPage-1) * Base;
//	$("div#listings").animate({
//		"right" : SliderDest + "px"
//	}, 700);
//}



//function drpop() {
//        _dm50_download();
//}





$.extend({
  	getUrlVars: function(){
    	var vars = [], hash;
    	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    	for(var i = 0; i < hashes.length; i++) {
      		hash = hashes[i].split('=');
      		vars.push(hash[0]);
      		vars[hash[0]] = hash[1];
    	}
    	return vars;
  	},
  	getUrlVar: function(name){
    	return $.getUrlVars()[name];
  	},
  	getHashTag: function() {
  	    var urlarr = window.location.href.split('#');
  	    return(urlarr[1]);
  	}
});




// ==============================================================
// handle livechat on or offline
/// wv_available is defined in the livechat script here which is in the footer code:
/// <script type="text/javascript" charset="UTF-8" src="http://as00.estara.com/webcare/public/linkjs.php?ulbid=879614"></script>
$(function() {
    if (typeof wv_available != 'undefined') {
        if (wv_available == false) {       
            $("div.liveChatHolder a.link_livechat").css('visibility','hidden');        
        } else if (wv_available == true) { 
            // if livechat is available, allow the hover effect
            $("div.footer_links a.link_livechat").live('mouseenter', function() {
	            $("img", this).attr('src','/images/_headerfooter/footer_livechat_hover.jpg');
            }).live('mouseleave', function() {
	            $("img", this).attr('src','/images/_headerfooter/footer_livechat_normal.jpg');
            });
        }
    }
});