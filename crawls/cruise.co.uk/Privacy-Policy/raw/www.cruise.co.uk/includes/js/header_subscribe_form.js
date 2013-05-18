var validateForm = {
    
    checkFields : function(formID){
        $(formID).isHappy({
			fields: {
			  '#subscribeTitle': {
				required: true,
				message: 'Please select a Title'				
			  },
			  '#subscribeFirstName': {
				required: true,
				message: 'Please enter your first name',
				test: happy.notEqual,
				arg: 'Enter first name here...'
			  },
			  '#subscribeLastName': {
				required: true,
				message: 'Please enter your surname',
				test: happy.notEqual,
				arg: 'Enter last name here...'
			  },
			  '#email': {
				required: true,
				message: 'Please enter your email address',
				test: happy.email // this can be *any* function that returns true or false
			  }
			}
		  });  
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
$(document).ready(function () {
	validateForm.checkFields('#popup_form');
});