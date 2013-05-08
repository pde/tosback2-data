// New PDP Functionality
$(document).ready(function () {

      // On load/global actions
      //$('.cart .contents').show();
      //$('.button.area.chart').hide(); // Hides the "select from chart" button on load
      $('#chart').ddTableFilter(); // Loads ddTableFilter plugin - Filters for table columns
      $('#chart tr:even').css('background-color', '#f5f3eb'); // Colors every other tr differently

      // Multiple item link functionality
      $('div.button.area.add-more').click(
        function(){
          $('.chart.container').toggle(); // Shows chart
          $('#chart').ddTableFilter(); // Loads ddTableFilter plugin - Filters for table columns
          $('.button.area.add-more, .add-to.area .button.container.cart, .add-to.area .button.area.chart, .add-to.area .gg, .add-to.area .wish.list.container').toggle(); // Toggles visibility of "select from chart", "add to cart" and multiple item link in dropdown area
          //fixedHeader();
        }
      ); // End multiple item link functionality



      // Close the popup
      $('.button.close, .cart-popup-bg, .button.continue').click(function(){
          $(".cart-popup-bg, .cart-popup.container").toggle(); // Close the popup when clicking the background, the close button, or the continue shopping button
        }
      ); // end close popup

      $('.cart-popup.container').click(function(event){
         event.stopPropagation(); // Stop every element inside the popup from invoking the close action
       }
      );




/*
$(fixedHeader = function()
{

  var $window     = $(window),
    $tableHead  = $('.chart.container thead'),
    offset      = $tableHead.offset(),
    height 		= $('.chart.container').height(),
    $originalHeader = $('.chart.container thead:first', this),
    $clonedHeader = $originalHeader.clone();

    $(window).scroll(function(){

        if(($window.scrollTop() > offset.top) && ($window.scrollTop() < offset.top + height - $tableHead.height())){ // Once you scroll to the chart, make the header sticky
                        $originalHeader.after($clonedHeader);
            $originalHeader.removeClass('fixed');
            $clonedHeader.addClass('fixed');
                        $clonedHeader.css('display', 'table');
        } else { // Remove class that makes the header fixed set it to display:none
            $clonedHeader.removeClass('fixed');
                        $clonedHeader.css('display', 'none');
        };

    });
});
*/

// Some random function??

$(function(){

    var top = $('.product .chart.container th');
    var nav = $('#chart thead');
        //var scrollBottom = $(window).scrollTop() + $(window).height();
        //var scrollBottom = $(window).scrollTop() - $('#chart').height();
        var chartHeight = $('#chart').height();

    $(window).scroll(function(){

        /*if($(window).scrollTop() >= 800){
            border_bottom('0');
        } else if($(window).scrollTop() === 799){
            border_bottom('1');
        } else if($(window).scrollTop() === 798){
            border_bottom('2');
        } else if($(window).scrollTop() <= 797){
            border_bottom('3');
        }*/

                /*
                if($(window).scrollTop() = 10){ // Too far, the navigation needs to be set in place
                  nav.css('position', 'static');
                  nav.css('margin-top', '0px');
         top.css('background-color', 'pink');
         nav.css('z-index', '5000');
                  //nav.css('margin-top', '-800px');
        } else if($(window).scrollTop() >= 800){
                  nav.css('position', 'fixed');
                  nav.css('margin-top', '0px');
         top.css('background-color', 'pink');
         nav.css('z-index', '5000');
        } else if($(window).scrollTop() >= 800){
         top.css('background-color', 'lightblue');
                  nav.css('position', 'fixed');
                  nav.css('margin-top', '-100px');
        }
                */
/*
        if($(window).scrollTop() >= 800){ // Too far, the navigation needs to be set in place
            //nav.css('position', 'fixed');
            //nav.css('margin-top', '-800px');
            nav.css('position', 'static');
            nav.css('margin-top', '0');
        } else if($(window).scrollTop() <= 1050) {
                  nav.css('background-color', 'peru');
                } else if($(window).scrollTop() <= 1050) {
            //nav.css('position', 'static');
            //nav.css('margin-top', '0');
            nav.css('position', 'fixed');
            nav.css('margin-top', '-800px');

        }
*/
          /*
            var $window = $(window),
       $fixCart = $('#chart thead');
   var elTop = $fixCart.offset().top;
   $window.scroll(function() {
        var windowTop = $window.scrollTop();
        //$fixCart.toggleClass('fixed', windowTop > elTop);
        $fixCart.css('position', 'fixed');
        $fixCart.css('background', 'pink');
        $nav.css('margin-top', '-800px');
    });
        */
        });

});



      // Popup centering
      /*
      $(centerPopup = function()
      {
        var popup = $('.cart-popup.container');
        //popup.css("position","absolute");
        //popup.css("top", ( jQuery(window).height() - popup.height() ) / 2+jQuery(window).scrollTop() + "px");
        //popup.css("left", ( jQuery(window).width() - popup.width() ) / 2+jQuery(window).scrollLeft() + "px");
        popup.css("margin-top", ( jQuery(window).height() - popup.height() ) / jQuery(window).scrollTop() + "px");
        return this;
      });
      */

      // Popup stuff
      // create the function
      /*
      jQuery.fn.center = function () {
    //popup.css("background-color","green");
    //this.css("position","absolute");
    //this.css("top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");
    //this.css("left", ( jQuery(window).width() - this.width() ) / 2+jQuery(window).scrollLeft() + "px");

        this.css("margin-top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");
    return this;
      }
      */

     // Show the popup when clicking "add [all] to cart"
      //$(".cart-popup-bg").hide(); // Hides the bg of the cart popup

      //NEW POPUP CENTERING - this works on multi item pages (and I assume dropdowns), but not externally on regular chart pages
      // create the function

      /*
      jQuery.fn.center = function () {
    //this.css("top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");
    //this.css("left", ( jQuery(window).width() - this.width() ) / 2+jQuery(window).scrollLeft() + "px");
    //this.css("margin-top", ( jQuery(window).height() - this.height() ) / 2+jQuery(window).scrollTop() + "px");


    this.css("position", "absolute");
    this.css("margin-top", ( jQuery(window).height() - this.height() ) / 2 + "px");
    return this;
      }// end center function
      */


//OPC popup code
 /*jQuery.fn.center = function (topset) {
        this.css("position", "absolute");
        if ($(window).height() > this.height()) {
            this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
        } else {
            this.css("top", topset);
        }
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;

    }*/

      //OLD POPUP CENTERING - not sure if it ever worked...
      /*
      $('.product .cart.button a, li .cart.button a').click(
        function(){
        var popup = $('.cart-popup.container');
        var window = $(window);
        var winH = $('.cart-popup.container').height();
        var winW = $('.cart-popup.container').width();
        // Set the popup window to center
        window.css('top',  winH/2-window.height()/2);
        window.css('left', winW/2-window.width()/2);
        $(".cart-popup-bg").show(); // Toggles the cart popup background (and therefore the popup itself)
        //$(".cart-popup.container").centerPopup();
        //popup.css("position","absolute");
        //popup.css("top", ( jQuery(window).height() - popup.height() ) / 50+jQuery(window).scrollTop() + "px");
        //popup.css("left", ( jQuery(window).width() - popup.width() ) / 2+jQuery(window).scrollLeft() + "px");
        popup.css("margin-top", ( window.height() - popup.height() ) / jQuery(window).scrollTop() + "px");
        return this;


      // Pop in the middle of the screen
      //var popup = $('.cart-popup.container');
      //var winH = $('.cart-popup.container').height();
      //var winW = $('.cart-popup.container').width();
      //Set the popup window to center
      //window.css('top',  winH/2-window.height()/2);
      //window.css('left', winW/2-window.width()/2);

      //call the function
      //jQuery('.cart-popup.container').center();



        }
      ); // end "add to cart" button
      */


      // Only available in stores dropdown
      // NOTE: this code merely shows and hides on click. This is only for mockup purposes; we don't want to just toggle the visibility of the div every time they make a selection.
      $('form .stores.dropdown option').click(function(){
          $('.store.address.display').toggle(); // Toggle the store address div
        }
      ); // end Only available in stores dropdown


      // Show gg when selection made MOKCUPS ONLY

$('option#show-gg').click(function() {
  $('.middle.area .gg.suggest .price').show();
  $('.middle.area .gg.suggest .copy').show();
});
$('option#show-oos').click(function() {
  $('.add-to .actions .stock.out.button').show();
  $('.add-to .actions .cart.button').hide();
});


}); // End doc ready function
