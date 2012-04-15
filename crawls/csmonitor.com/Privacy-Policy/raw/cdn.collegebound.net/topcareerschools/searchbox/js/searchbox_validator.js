$(document).ready(function(){
    jQuery.validator.addMethod("zipUSCAN", 
            function(postalcode, element) {
                return this.optional(element) || postalcode.match(/^\d{5}-\d{4}|\d{5}|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/);
            }, 
            "Please specify a valid zip/postal code");
    
    jQuery.validator.addMethod("zipUS", 
            function(postalcode, element) {
                return this.optional(element) || postalcode.match(/^\d{5}([\-]\d{4})?$/);
            }, 
            "Please specify a valid zip/postal code");
    
    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please specify a valid phone number");
    
    $('form').submit(function(){
        if($('form').valid()) return true;
        return false;
    });
    jQuery.extend(jQuery.validator.messages, {
        required: ''
    });
    
    $('#country').change(function(){
       switch($(this).val()){
           case 'USA':
               $('#zip').addClass("required");
               $('#zip').addClass("zipUS");
               $('#zip').removeClass("zipUSCAN");
               break;
           case 'CAN':
               $('#zip').addClass("required");
               $('#zip').removeClass("zipUS");
               $('#zip').addClass("zipUSCAN");
               break;
           default:
               $('#zip').removeClass("required");
               $('#zip').removeClass("zipUS");
               $('#zip').removeClass("zipUSCAN");
       }
    });
});