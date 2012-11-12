    (function($){  
    $.fn.zipValidator = function(options) {  
      var defaults = {  
        val:"" ,
        errorVal: "Enter ZIP",
        errorValColor: "red",
        sendHREF: 'http://www3.samsclub.com/clublocator/club_listing.aspx?mySearch=zip&myZip=',
        productDate: 'true'  //true or false
        };  
       var options = $.extend(defaults, options); 
     
       return this.each(function() { 
                    
                    var obj = $(this),
                        sendBTN =  $('a', obj),
                        zipInput =  $('div.zipInput input', obj),
                        linkType =  $('div.zipInput').attr('linktype'),
                        zipValue = zipInput.val(options.val);      
                    
                                      
                    //.............blur and focus functions ........................//
                    zipInput.focus(function () {
                        zipInput.val('');
                    });
                    zipInput.blur(function () {
                        zipValue = zipInput.val();
                        if (zipValue == '') {
                            zipValue = zipInput.val(options.val);
                        }
                    });
                    //this portion loads website on click of button
                    sendBTN.click(function () {
                        zipValue = zipInput.val();
                        if (zipValue == '' || zipValue.length != '5' || isNaN(zipValue)) {
                            zipFailed();
                            return false;
                        }
                        else {
                            sendLink(linkType);
                            return true;
                        }
                    });

                    //this portion loads site on enter 
                   zipInput.keypress(function (event) {
                        zipValue = zipInput.val();
                        if (zipValue == '' && event.keyCode == 13 ) {
                            return false;
                        }
                        else if (zipValue.length != '5' && event.keyCode == 13) {
                            zipFailed();
                            return false;
                        }
                        else if (isNaN(zipValue) && event.keyCode == 13) {
                            zipFailed();
                            return false;
                        }
                        else if (event.keyCode == 13) {
                            sendLink(linkType);
                            return true;
                        }
                    });

                    //.............end find club location Zip Form validation ........................//
              function zipFailed () {
                zipValue = zipInput.val(options.errorVal);
                zipInput.css("color", options.errorValColor);
              }   
              function sendLink (a) {
                if(a == 'event'){
                    top.location = ('href', options.sendHREF + zipValue + '&Radius=30&Type=Product&Date=' + options.productDate); 
                 }else{
                    top.location = ('href', options.sendHREF + zipValue);
                 }
                            
              };  
       });  
    };  
    })(jQuery); 