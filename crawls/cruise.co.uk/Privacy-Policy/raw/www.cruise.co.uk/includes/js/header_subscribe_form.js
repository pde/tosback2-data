/*$(document).ready(function(){
 $("#subscribe_box").click(function(){
 event.stopPropagation();
 $("div#mainsearchbarform").animate({height:'40px',top:'-22px'}, 300);
 });
 $(document).click(function(){
 $("div#mainsearchbarform").animate({height:'20px',top:'0'}, 300);
 });
 });
 */
var validateForm = {
    
    checkFields : function(formID){
            var inputPath = formID + ' > input';
            var selectPath = formID + ' > select';
            if( !$(inputPath).val() ||
                !$(selectPath).val() ||
                $(inputPath).val() === "email address" ||
                $(inputPath).val() === "first name" ||
                $(inputPath).val() === "last name" ||
                $(inputPath).val() === "Enter email address here..." ||
                $(inputPath).val() === "Enter first name here..." ||
                $(inputPath).val() === "Enter last name here..."
            ) {
                alert('Please fill out all fields.');
                return false;
            }else{
                return true;
            }
    }
    
}

var animateForm = {

    showForm : function(elemId){
        $(elemId).animate({height:'40px', top:'-22px'}, 300);
    },
    
    hideForm : function(elemId){
        $(elemId).animate({height:'20px', top:'0'}, 300);
    }
    
}