// SearchValidation.js
var searchLabel;
var searchLabel2;

/*****************************************************************
 - If javascript enabled, remove the search field label and use it as a placeholder in the search field.
 - When the user clicks into the field (focus) to add a search string, remove the placeholder.
 - When the user goes away from the field (blur) without entering a search string, replace the placeholder.
 - If the user has entered a search string, leave the string in place.
 - If javascript not enabled, search field label is visible.
*****************************************************************/
			
$(document).ready(function() {
  searchLabel = $('#CatalogSearchForm label').text();
  
  $('#searchTerm').addClass('placeholder').val(searchLabel).focus(function() {
    if (this.value == searchLabel) {
      $(this).removeClass('placeholder').val('');
    };
  }).blur(function() {
    if (this.value == '') {
      $(this).addClass('placeholder').val(searchLabel);
    };
  });
  $('#CatalogSearchForm').submit(function() {
    if ($('#searchTerm').val() == searchLabel) {
      $('#searchTerm').val('');
    }
  });
  
});


/*****************************************************************
 SEARCH BOX IN HEADER
*****************************************************************/

$(document).ready(function() {
  searchLabel2 = $('#frmFreeTextSearchForm label').text();
  $('#searchbox').addClass('placeholder').val(searchLabel2).focus(function() {
    if (this.value == searchLabel2) {
      $(this).removeClass('placeholder').val('');
    };
  }).blur(function() {
    if (this.value == '') {
      $(this).addClass('placeholder').val(searchLabel2);
    };
  });
  $('#frmFreeTextSearchForm').submit(function() {
    if ($('#searchbox').val() == searchLabel2) {
      $('#searchbox').val('');
    }
  });
});


/*****************************************************************
 This function will prevent submission of the specified 
 form if the value of the specified field is null or whitespace.

 If submission is prevented, the specified error will be 
 displayed in a messagebox.
*****************************************************************/

function doSubmit(form, fieldName, errorMessage) {
	var fieldValue = form.elements[fieldName].value;
	
	// Check to see if the search label is what's in the field - Exit with error message if so
	if ((fieldValue == searchLabel) || (fieldValue == searchLabel2)) {
		alert(errorMessage);
		return false;
	}
	// Trim the contents of the field, and if blank exit with error message
	var trimmed = fieldValue.replace(/^\s+|\s+$/g, '') ;
	if (trimmed=="") {
		alert(errorMessage);
		return false;
	} else {
		return true;
	}	
}


/*****************************************************************
 STORE LOCATOR
*****************************************************************/

$(document).ready(function() {
  var searchStores = $('#storelocatorform label').remove().text();
  $('#storelocatorform #address').addClass('placeholder').val(searchStores).focus(function() {
    if (this.value == searchStores) {
      $(this).removeClass('placeholder').val('');
    };
  }).blur(function() {
    if (this.value == '') {
      $(this).addClass('placeholder').val(searchStores);
    };
  });
  $('#storelocatorform').submit(function() {
    if ($('#storelocatorform #address').val() == searchStores) {
      $('#storelocatorform #address').val('');
    }
  });
});
