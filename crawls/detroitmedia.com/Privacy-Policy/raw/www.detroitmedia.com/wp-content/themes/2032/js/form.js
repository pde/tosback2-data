/*    
	Form Validator
	Jquery plugin for form validation and quick contact forms
	Copyright (C) 2008 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

jQuery.iFormValidate = {
	build : function(user_options)
	{
		var defaults = {
			phpFile:"/assets-global/js/send.php",
			ajax: true
		};
		var user_options;  
		return $(this).each(
			function() {
			var options = $.extend(defaults, user_options);
			$inputs = $(this).find(":input").filter(":not(:submit)").filter(":not(:checkbox)");
			$(this).submit(function(){
				$("a.more-contact").fadeOut('slow');
				$checkboxes = $(this).find(":checkbox");
				var isValid = jQuery.iFormValidate.validateForm($inputs);
				if(!isValid){
					$("a.more-contact").fadeIn('slow');
					return false;
				}
				if(options.ajax){
					var data = {};
					$inputs.each(function(){
						data[this.name] = this.value;
					});
					$checkboxes.each(function(){
						if($(this).is(':checked')){
							data[this.name] = this.value;
						}else{
							data[this.name] = "";
						}
					});	
					$(this).fadeOut("slow", function(){
						$(this).parent('div').load(options.phpFile, data, function(){

							$(this).css("top", "0");
							$(this).fadeIn("slow");
						});						
					});
					return false;
				}else{
					return true;
				}
			});
			
			$inputs.bind("keyup", jQuery.iFormValidate.validate);
			$inputs.filter("select").bind("change", jQuery.iFormValidate.validate);
		});
	},
	validateForm : function($inputs)
	{
		var isValid = true; //benifit of the doubt?
		$inputs.filter(".is_required").each(jQuery.iFormValidate.validate);
		if($inputs.filter(".is_required").hasClass("invalid")){isValid=false;}
		return isValid;
	},
		
	validate : function(){
		var $val = $(this).val();
		var isValid = true;
		//Regex for DATE
		if($(this).hasClass('vdate')){
			var Regex = /^([\d]|1[0,1,2]|0[1-9])(\-|\/|\.)([0-9]|[0,1,2][0-9]|3[0,1])(\-|\/|\.)\d{4}$/;
			isValid = Regex.test($val);
		//Regex for Email
		}else if($(this).hasClass('vemail')){
			var Regex =/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!Regex.test($val)){isValid = false;}		
		//Regex for Phone
		}else if($(this).hasClass('vphone')){
			//var Regex =/^([0-9a-zA-Z]+([_+.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;
			var Regex = /^\(?[2-9]\d{9}/;
			if(!Regex.test($val)){isValid = false;}
		//Check for empty
		}else if($val.length === 0){
			isValid = false;
		}
		
		if(isValid){
			$(this).removeClass("invalid");
			$(this).addClass("valid");
		}else{
			$(this).removeClass("valid");
			$(this).addClass("invalid");
		}
		return isValid;
	}	
}
jQuery.fn.FormValidate = jQuery.iFormValidate.build;