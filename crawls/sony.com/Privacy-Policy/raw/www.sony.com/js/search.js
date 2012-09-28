var search = (function(){
	var $search,
		$searchContainer,
		$searchBtn;
	
	/****** public methods ******/
	return{
		init:function(){
			$search = $('#search-input');
			$searchContainer = $('#search');
			$searchBtn = $('#search-button');
			search.btn = $searchBtn;
			setSearch();
		},
		open:function(){
			$searchBtn.removeClass('closed').addClass('open');
			$searchContainer.addClass('show');
		},
		close: function(){
			$searchBtn.removeClass('open').addClass('closed');
			$searchContainer.removeClass('show');
		}
	}
	/****** private methods ******/
	function setSearch(){		
		$search.addClass('empty').attr('value', 'Search');

		$searchBtn.children('a').click(function() {
			var $this = $(this),
				$parent = $this.parent();

			nav.animateMenu("hide");

			if($searchBtn.hasClass('closed')){
				search.open();
			} else {
				search.close();
			}

			return false;
		});
		
		$search.focus(function(){
			if($search.attr('value') == "Search"){
				$search.removeClass('empty').attr('value', '');
			}
		});
		$search.blur(function(){
			if($search.attr('value') == ""){
				$search.addClass('empty').attr('value', 'Search');
			}
		});
	};
})();


function sanitize(string) {

	var character = "";
	var sanitizedString = "";

	for(var i=0; i < string.length; i++)
	{
	character = string.charCodeAt(i);
	
		if(character == 32)
		{
			sanitizedString += string[i];
		}
		else if( (character > 47 && character < 58) || (character > 62 && character < 127))
		{
			sanitizedString += string[i];
		}
		else
		{
			sanitizedString += "&#" + character + ";";
		}
	}

	return sanitizedString;
}

bSearchEntered = false;

function isEmpty(obj) {
    if(obj == null || obj.value.length == 0) {
	return true;
    }
}
function errorFormSubmit(){
	sStr = document.forms['error_search_form'].error_search_box.value;
	formSubmit(true, sStr, document.forms['error_search_form']);	
}

function formSubmit(doSearch, sSearchStr,  oForm) {
    var doSearchFld = document.forms['formSony'].action;  
    if(arguments.length == 1){
    	var searchTermFld = document.forms['formSony'].st;
	    if(!bSearchEntered || (doSearch && isEmpty(searchTermFld))) {
			alert("Please enter a search term and then click the GO button.")
			return;
	    }
		if(!isEmpty(searchTermFld)) {
			doSearchFld.value = 'search';
		}
		document.forms['formSony'].st = document.forms['formSony'].st; //sanitize(document.forms['formSony'].st); //edit 
		document.forms['formSony'].submit();
    }else if(arguments.length == 2){
    	oForm = document.forms['formSony'];
    	if(sSearchStr.length == 0){
    		alert("Please enter a search term and then click the GO button.")
			return;
    	}
    	oForm.st.value = sSearchStr; //sanitize(sSearchStr); //edit
    	oForm.submit();
    }else{
    	oForm.st.value = sSearchStr; //sanitize(sSearchStr); //edit
    	oForm.submit();
    }
}
	
function validForm(passForm) 
{
	if (passForm.st.value == "" || passForm.st.value == "Search" || passForm.st.value == "search") 
	{
		return false;
	}
	return true;
}