// Disney Forced Timestamp

(function ($) {

  Drupal.behaviors.timeWarp = {
    attach: function(context, settings) {
      $('#edit-forced-timestamp').change(function() {
        if (!isNaN($(this).val())) {
          $('#timewarp-submit').click();
        } 
        else if ($(this).val() == 'C') {
          $('#block-dimg-forced-timestamp-dimg-timewarp-popup').show();
        }
      });
      $('#timewarp_popup_close').click(function() {
        $('#block-dimg-forced-timestamp-dimg-timewarp-popup').hide();
      });
    }
  };

})(jQuery);
;
