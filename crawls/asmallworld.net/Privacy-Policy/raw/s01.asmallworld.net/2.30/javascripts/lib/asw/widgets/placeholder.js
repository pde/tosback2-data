jQuery(document).ready(function(){
  if (!supports_input_placeholder()) {
    var affected_inputs = jQuery(':input[placeholder], :textarea[placeholder]');
    affected_inputs.each(function () {
      replace_val_with_placeholder(jQuery(this));
    });
    jQuery('form').submit(function () {
      affected_inputs.each(function () {
        if ( !jQuery(this).hasClass('no-clear-on-submit') ) {
          remove_placeholder_text(jQuery(this));
        }
      });
    });
  }
});

function supports_input_placeholder() {
  var i = document.createElement('input');
  return 'placeholder' in i;
}

function remove_placeholder_text (input) {
  return function (input) {
    if (input.val() === input.attr('placeholder')) {
      input.val('');
    }
  }(input);
}

function replace_val_with_placeholder (input) {
  return function (input) {
    // Set the default text to be whatever's in the placeholder attribute
    if (input.val() === '') {
      input.val(input.attr('placeholder')).css("color", "#a9a9a9");
    }
    // On focus clear the input box
    input.focus(function(){
      if (input.val() === input.attr('placeholder')) {
        input.val('').css("color", "#000");
      }
    });
    input.blur(function(){
      if (input.val() === '') {
        input.val(input.attr('placeholder')).css("color", "#a9a9a9");
      }
    });
  }(input);
}