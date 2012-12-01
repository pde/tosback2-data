// Called on all pages

// ----------
// Navigation
// ----------

$(document).ready(function(){

// rotation for home page during 2012 holidays
	$(function() {
$('#slideshow-content').cycle({
								fx:      'fade',
								pause: 1,
								speed: 500,
								easeIn: null,
								easeOut: null,
								timeout:  5000,        
								prev:    '#slideshow-prev',
								next:    '#slideshow-next',
								pager:   '#slideshow-navi',
								// callback fn that creates a thumbnail to use as pager anchor 
 								pagerAnchorBuilder: function(idx, slide) {
        var img = jQuery(slide).find("img").attr("alt");
        return '<li><a href="#">' + img + '</a></li>';
    } 
    });
	
    function pagerFactory(idx, slide) {
        var s = idx > 50 ? ' style="display:none"' : '';
        return '<li'+s+' class="navi"><a href="#">'+(idx+1)+'</a></li>';
    };
				
			
				$('.pause').click(function() { 
					$('#slideshow-content').cycle('pause'); 
				});
				
 				$('.resume').click(function() { 
					$('#slideshow-content').cycle('resume', true); 
				});
	});






  $("#pop-back-pdp").click(function () {
    $("#pop-back-pdp").css({
            "display": "none"
        });
        $("#disclaimerMain").css({
            "display": "none"
        });
     disclaimerShown=false;
    });

    $("#disclaimerClose").click(function () {
    $("#pop-back-pdp").css({
            "display": "none"
        });
        $("#disclaimerMain").css({
            "display": "none"
        });
     disclaimerShown=false;
    });

/*
  //$('#sublevel-bar').hide();
    $('.sublevel-navigation').hide();

    var tabval=$("#tabval").val();

    if(tabval=="tab1-nav"){
        $("#sublevel-bar").css("background-color","#354b1a");
    }else if (tabval=="tab2-nav"){
        $("#sublevel-bar").css("background-color","#67604c");
    }else if (tabval=="tab3-nav"){
        $("#sublevel-bar").css("background-color","#343434");
    }else if (tabval=="tab4-nav"){
      $("#sublevel-bar").css("background-color","#354b1a");
    }else if (tabval=="tab5-nav"){
      $("#sublevel-bar").css("background-color","#990000");
    }else if (tabval=="tab6-nav"){
      $("#sublevel-bar").css("background-color","#005693");
    }else if (tabval=="tab7-nav"){
      $("#sublevel-bar").css("background-color","#354b1a");
    }

    $("#"+tabval).show();
    $('#sublevel-bar').show();
*/
/*

// Tab (top level) navigation

// Tab 1
  $("#tab1").click(function(){
    $("#sublevel-bar").css("background-color","#354b1a");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab1 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab1-nav").show();

  });

// Tab 2
  $("#tab2").click(function(){
    $("#sublevel-bar").css("background-color","#67604c");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab2 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab2-nav").show();
  });

// Tab 3
  $("#tab3").click(function(){
    $("#sublevel-bar").css("background-color","#343434");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab3 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab3-nav").show();
  });

// Tab 4
    $("#tab4").click(function(){
    $("#sublevel-bar").css("background-color","#354b1a");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab4 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab4-nav").show();
  });

// Tab 5
    $("#tab5").click(function(){
    $("#sublevel-bar").css("background-color","#990000");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab5 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab5-nav").show();
  });

// Tab 6
 $("#tab6").click(function(){
    $("#sublevel-bar").css("background-color","#005693");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab6 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab6-nav").show();
  });

// Tab 7
  $("#tab7").click(function(){
    $("#sublevel-bar").css("background-color","#354b1a");
    $(".tab a").removeClass("active");
    $("#parent-level ul li#tab7 a").addClass("active");
    $('.sublevel-navigation').hide();
    $('.mockups').hide();
    $("#tab7-nav").show();
  });
*/

  });

//LOADS TOP NAVIGATION
function loadTopNavigation() {
    $('.sublevel-navigation').hide();

    var tabval=$("#tabval").val();

    if(tabval=="tab1-nav"){
        $("#sublevel-bar").css("background-color","#354b1a");
    }
        /*
        // 1Source
        else if (tabval=="tab2-nav"){
        $("#sublevel-bar").css("background-color","#990000");
    }
        */
        // Stores
        else if (tabval=="tab2-nav"){
        $("#sublevel-bar").css({"background-color":"#67604c","height":"6px"});
    }
        // Tracker
        else if (tabval=="tab3-nav"){
      $("#sublevel-bar").css("background-color","#343434");
    }
        // NYI (not yet implemented)
        else if (tabval=="tab4-nav"){
      $("#sublevel-bar").css("background-color","#354b1a");
    }
        // NYI (not yet implemented)
        else if (tabval=="tab4-nav"){
      $("#sublevel-bar").css("background-color","#354b1a");
    }
        // NYI (not yet implemented)
        else if (tabval=="tab5-nav"){
      $("#sublevel-bar").css("background-color","#990000");
    }
        // NYI (not yet implemented)
        else if (tabval=="tab6-nav"){
      $("#sublevel-bar").css("background-color","#005693");
    }
        // NYI (not yet implemented)
        else if (tabval=="tab7-nav"){
      $("#sublevel-bar").css("background-color","#354b1a");
    }

    $("#"+tabval).show();
    $('#sublevel-bar').show();
  }

// SUB LEVEL NAVIGATION




// ----------
// ONE PAGE CHECKOUT
// ----------

    $(document).ready(function () {
        //VISA
        $("a#pop-or-visa").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#or-visa-popup").center("500px").fadeIn("slow");
            return false;
        });

        //SHIPPING ADDRESS - USE THIS ADDRESS
        $("a#pop-shipping-address1").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#shipping-address1").center("300px").fadeIn("slow");
            return false;
        });


        $("a#pop-shipping-address-edit").click(function (e) {
              $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#shipping-address3").center("300px").fadeIn("slow");
            return false;
        });


        $("a#pop-shipping-address2").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#shipping-address2").center("300px").fadeIn("slow");
            return false;
        });

        $("#pop-additional-address").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#additional-address").center("300px").fadeIn("slow");
            return false;
        });


        $("#pop-billing-address2").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#billing-address2").center("1500px").fadeIn("slow");
            return false;
        });


        //WHAT'S THIS
        $("a#pop-whats-this1").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#whats-this1").center("500px").fadeIn("slow");
            return false;
        });
        $("a#pop-whats-this2").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#whats-this2").center("1150px").fadeIn("slow");
            return false;
        });
        $("a#pop-whats-this3").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#whats-this3").center("500px").fadeIn("slow");
            return false;
        });
        $("a#pop-card-balance").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#card-balance").center("500px").fadeIn("slow");
            return false;
        });


        //SHIPPING OPTIONS - LEARN MORE
        $("a#pop-learn-standard").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#learn-standard").center("500px").fadeIn("slow");
            return false;
        });
        $("a#pop-learn-3day").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#learn-3day").center("500px").fadeIn("slow");
            return false;
        });
        $("a#pop-learn-2day").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#learn-2day").center("500px").fadeIn("slow");
            return false;
        });
        $("a#pop-learn-1day").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#learn-1day").center("500px").fadeIn("slow");
            return false;
        });

        $("a#pop-special-delivery").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#special-delivery").center("500px").fadeIn("slow");
            return false;
        });

        $("a#pop-gift-message").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#gift-message").center("500px").fadeIn("slow");
            return false;
        });

        //REQUIRED QUESTIONS
        $("a#pop-required-questions").click(function (e) {
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $("#required-questions").center("500px").fadeIn("slow");
            return false;
        });

        //BELOW CLOSES ALL POPUPS
        $(".other.sprite.close").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".popups").fadeOut("slow");
        });
        $("#pop-back").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".popups").fadeOut("slow");
        });

        $(".other.sprite.close, .popup-cancel").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".popups").fadeOut("slow");
        });

        //EQUAL COLUMNS
        var biggestHeight1 = 0;
        var biggestHeight2 = 0;
        var biggestHeight3 = 0;
        $('.equal-height3').each(function () {
            if ($(this).height() > biggestHeight3) {
                biggestHeight3 = $(this).height();
            }
        });
        $('.equal-height3').height(biggestHeight3);

        $('.equal-height2').each(function () {
            if ($(this).height() > biggestHeight2) {
                biggestHeight2 = $(this).height();
            }
        });
        $('.equal-height2').height(biggestHeight2);

        $('.equal-height1').each(function () {
            if ($(this).height() > biggestHeight1) {
                biggestHeight1 = $(this).height();
            }
        });
        $('.equal-height1').height(biggestHeight1);

    });



// ----------
// one-source
// ----------
 jQuery.fn.center = function (topset) {
        this.css("position", "absolute");
        if ($(window).height() > this.height()) {
            this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
        } else {
            this.css("top", topset);
        }
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;

    }
    $(document).ready(function () {

        //WHAT'S THIS
        $(".one-source a#pop-whats-community").click(function (e) {
            $(".one-source #pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $(".one-source #whats-this-community-name").center().fadeIn("slow");
            return false;
        });
        $(".one-source a#pop-whats-birth").click(function (e) {
            $(".one-source #pop-back").css({
                "opacity": "0.85"
            }).fadeIn("slow");
            $(".one-source #whats-this-birth-gender").center().fadeIn("slow");
            return false;
        });
        //BELOW CLOSES ALL POPUPS
        $(".one-source .other.sprite.close").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".one-source .popups").fadeOut("slow");
        });
        $(".one-source #pop-back").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".one-source .popups").fadeOut("slow");
        });
        $(".one-source .other.sprite.close, .popup-cancel").click(function () {
            $("#pop-back").fadeOut("slow");
            $(".one-source .popups").fadeOut("slow");
        });



    });


// ----------
// MY ACCOUNT PAGE - Added 9/26/12
// ----------
$(document).ready(function () {
   $(".edit.card.container").hide();
   $("div.form.addcard").hide();
   $("div.newcard").hide();
//SHOW/HIDE WALLET CARD EDITS
    $(".pop-up.button.edit.card.discover").click(function(){
    $(".edit.card.container.visa,.edit.card.container.mastercard").hide();//hides all other cards
    $(".pop-up.button.edit.card.visa,.pop-up.button.edit.card.mastercard").text('Edit Card');//Resets all Cancel Links to Edit Links
    $(".edit.card.container.discover").slideToggle();
    $(".pop-up.button.edit.card.discover").text($(this).text() == 'Edit Card' ? 'Cancel Edit' : 'Edit Card');
    $('.columns.wallet.first input').attr('checked', true);
    });
    $("input.wallet.form.discover, input.wallet.form.mastercard").click(function(){
    $(".edit.card.container").slideUp();
    });
    $("input.wallet.form.visa, .pop-up.button.edit.card.visa").click(function(){
    $(".edit.card.container.discover,.edit.card.container.mastercard").hide();//hides all other cards
    $(".pop-up.button.edit.card.discover,.pop-up.button.edit.card.mastercard").text('Edit Card');//Resets all Cancel Links to Edit Links
    $(".edit.card.container.visa").slideToggle();
    $(".pop-up.button.edit.card.visa").text($('a.edit.card.visa').text() == 'Edit Card' ? 'Cancel Edit' : 'Edit Card');
    $("p.error.copy.expire.date").hide();
    $(".my.wallet .edit.card.container.visa form.expire.date").after('<p class="error copy expire date">Please verify the expiration date.</p>');
    $('.columns.wallet.second input').attr('checked', true);
    });
    $(".pop-up.button.edit.card.mastercard").click(function(){
    $(".edit.card.container.discover,.edit.card.container.visa").hide();//hides all other cards
    $(".pop-up.button.edit.card.discover,.pop-up.buttona.edit.card.visa").text('Edit Card');//Resets all Cancel Links to Edit Links
    $(".edit.card.container.mastercard").slideToggle();
    $(".pop-up.button.edit.card.mastercard").text($(this).text() == 'Edit Card' ? 'Cancel Edit' : 'Edit Card');
    $('.columns.wallet.third input').attr('checked', true);
    });
    $(".button.area.addcard").click(function(){
        if($(".columns.wallet.first").is(":visible")&&$(".columns.wallet.second").is(":visible")&&$(".columns.wallet.third").is(":visible")){
          $('p.wallet.intro').hide();
          $(".wallet.divider").before('<p class="error copy">Your wallet is full (max 3 cards). Please edit or delete a card.</p>');
        }
        else {
          $("div.newcard").slideToggle();
          }
    });
//THIS FUNCTIONALITY BELOW ADDS CARDS BACK TO WALLET IF ADD A NEW CARD SUBMIT BUTTON IS PRESSED
    $('a.submit').click(function(){
          $('.edit.card.container').slideUp(100);
          $('div.newcard').slideUp(100);
    });
    $('a.submit.new.card').click(function(){
          $('div.newcard').slideUp(100);
        if($(".columns.wallet.first").is(":visible")&&$(".columns.wallet.second").is(":visible")&&$(".columns.wallet.third").is(":hidden")){
          $('.columns.wallet.third').show();
        }
        else if($(".columns.wallet.first").is(":visible")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":visible")){
          $('.columns.wallet.second').show();
        }
        else if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":visible")){
          $('.columns.wallet.second').show();
            $('.columns.wallet.third').css({"border-left":"1px solid #d5caa2","margin":"0 0 0 5%","padding":"0 7%"});
      }
        else if($(".columns.wallet.first").is(":visible")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":hidden")){
          $('.columns.wallet.second').show();
          $('.columns.wallet.second').css({"border-left":"1px solid #d5caa2","margin":"0 0 0 5%","padding":"0 10%"});
        }
        else if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":hidden")){
          $('.columns.wallet.first').show();
        }
        else if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":visible")&&$(".columns.wallet.third").is(":visible")){
          $('.columns.wallet.first').show();
          $('.columns.wallet.second').css({"border-left":"1px solid #d5caa2","margin":"0 0 0 5%","padding":"0 10%"});
        }
    });
//WALLET DELETE POPUPS
    $('.pop-up.button.delete.card.discover').click(function(e){
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("fast");
            $("#popup-delete-card-discover").center("500px").fadeIn("fast");
            return false;
    });
    $('.pop-up.button.delete.card.visa').click(function(e){
            $("#pop-back").css({
                "opacity": "0.85"
            }).fadeIn("fast");
            $("#popup-delete-card-visa").center("500px").fadeIn("fast");
            return false;
    });
    $('.pop-up.button.delete.card.mastercard').click(function(e){
            $("#pop-back").css({"opacity": "0.85"}).fadeIn("fast");
            $("#popup-delete-card-mastercard").center("500px").fadeIn("fast");
            return false;
    });

//WALLET DELETE CARDS
    $(".popups.delete.card a.confirm.delete").click(function () {
        $("#pop-back").fadeOut("slow");
        $(".popups").fadeOut("slow");
        $("body").css("overflow", "auto");
         $(".edit.card.container").hide();
         $(".my.wallet p.error.copy").hide();
         $(".my.wallet p.wallet.intro").show();
    });
    $(".popups.delete.card a.confirm.delete.discover").click(function () {
        $('.columns.wallet.first').hide();
        $('.columns.wallet.second').css({"border-left":"none","padding-left":"0","margin-left":"0"});
        if($(".columns.wallet.second").is(":visible")){
          $('.columns.wallet.third').css({"border-left":"1px solid #d5caa2"})
          }
        else{
          $('.columns.wallet.third').css({"border-left":"none","padding-left":"0","margin-left":"0"})
          }
        if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":hidden")){
          $('p.wallet.intro').text("Your wallet is currently empty. Add a new card below.")
          $("hr.wallet.divider").hide();
          $("div.add.card").show();
          }
    });
    $(".popups.delete.card a.confirm.delete.visa").click(function () {
        $('.columns.wallet.second').hide();
        if($(".columns.wallet.first").is(":visible")){
          $('.columns.wallet.third').css({"border-left":"1px solid #d5caa2"})
          }
        else{
          $('.columns.wallet.third').css({"border-left":"none","padding-left":"0","margin-left":"0"})
          }
        if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":hidden")){
          $('p.wallet.intro').text("Your wallet is currently empty. Add a new card below.")
          $("hr.wallet.divider").hide();
          $("div.add.card").show();
          }
    });
    $(".popups.delete.card a.confirm.delete.mastercard").click(function () {
        $('.columns.wallet.third').hide();
        if($(".columns.wallet.first").is(":hidden")&&$(".columns.wallet.second").is(":hidden")&&$(".columns.wallet.third").is(":hidden")){
          $('p.wallet.intro').text("Your wallet is currently empty. Add a new card below.")
          $("hr.wallet.divider").hide();
          $("div.add.card").show();
          }
    });

//HIDE INITIAL BILLING ADDRESSES
        $("#pop-billing-address").ready(function (e) {
           $("#pop-back").hide();
            $("#billing-address1").hide();
            return false;
      });
    });

