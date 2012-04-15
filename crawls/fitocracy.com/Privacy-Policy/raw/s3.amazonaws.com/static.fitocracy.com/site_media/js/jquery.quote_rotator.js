/**
 * Quote Rotator - Simple jQuery plugin which cause a set of list
 * items to fade-in and fade-out. 
 * 
 * Homepage: http://coryschires.com/jquery-quote-rotator-plugin/
 * Source Code: https://github.com/coryschires/quote-rotator
 * 
 * Copyright (c) 2011 Cory Schires (coryschires.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0.0
 */

(function($) {

  $.quote_rotator = {
    defaults: {
      rotation_speed: 5000,
      pause_on_hover: true,
      randomize_first_quote: false,
      buttons: false
    }
  }

  $.fn.extend({
    quote_rotator: function(config) {
      
      var config = $.extend({}, $.quote_rotator.defaults, config);
      
      return this.each(function() {
        var rotation;
        var quote_list = $(this);
        var list_items = quote_list.find('li');
        var rotation_active = true;
        var rotation_speed = config.rotation_speed < 2000 ? 2000 : config.rotation_speed;
        
        var add_active_class = function() {
          var active_class_not_already_applied = quote_list.find('li.active').length === 0;
          if (config.randomize_first_quote) {
            var random_list_item = $(list_items[Math.floor( Math.random() * (list_items.length) )]);
            random_list_item.addClass('active');
          } else if (active_class_not_already_applied) {
              quote_list.find('li:first').addClass('active');
          }
        }();
        
        var get_next_quote = function(quote) {
          return quote.next('li').length ? quote.next('li') : quote_list.find('li:first');
        }
        
        var get_previous_quote = function(quote) {
          return quote.prev('li').length ? quote.prev('li') : quote_list.find('li:last');
        }
        
        var rotate_quotes = function(direction) {
          var active_quote = quote_list.find('li.active');
          var next_quote = direction === 'forward' ? get_next_quote(active_quote) : get_previous_quote(active_quote)
          
          active_quote.animate({
            opacity: 0
          }, 1000, function() {
            active_quote.hide();
            list_items.css('opacity', 1);
            next_quote.fadeIn(1000);
          });
          
          active_quote.removeClass('active');
          next_quote.addClass('active');
        };
        
        var start_automatic_rotation = function() {
          rotation = setInterval(function() {
            if (rotation_active) { rotate_quotes('forward'); }
          }, rotation_speed);
        };

        var pause_rotation_on_hover = function() {
          quote_list.hover(function() {
            rotation_active = false;
          }, function() {
            rotation_active = true;
          });
        };
        
        var include_next_previous_buttons = function() {
          quote_list.append(
            '<div class="qr_buttons">\
              <button class="qr_previous">'+ config.buttons.previous +'</button>\
              <button class="qr_next">'+ config.buttons.next +'</button>\
            </div>'
          );
          quote_list.find('button').click(function() {
            clearInterval(rotation);
            rotate_quotes( $(this).hasClass('qr_next') ? 'forward' : 'backward' );
            start_automatic_rotation();
          });
        };
        
        if (config.buttons) { include_next_previous_buttons(); }
        if (config.pause_on_hover) { pause_rotation_on_hover(); }
        
        list_items.not('.active').hide();
        
        start_automatic_rotation();
      })
    }
  })

})(jQuery);