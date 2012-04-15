function initOverLabels () {
  if (!document.getElementById) return;  	

  var labels, id, field;

  // Set focus and blur handlers to hide and show 
  // LABELs with 'overlabel' class names.
  labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
	
    if (labels[i].className == 'overlabel') {	
      // Skip labels that do not have a named association
      // with another field.
      id = labels[i].htmlFor || labels[i].getAttribute('for');
      if (!id || !(field = document.getElementById(id))) {
        continue;
      }

      // Change the applied class to hover the label 
      // over the form field.
      labels[i].className = 'overlabel-apply';

      // Hide any fields having an initial value.
      if (field.value !== '') {
        hideLabel(field.getAttribute('id'), true);
      }

      // Set handlers to show and hide labels.
      $(field).focus(function () {
		hideLabel(this.getAttribute('id'), true);
		$(this).parent().addClass('active');
      });
	  
      $(field).blur(function () {
        if (this.value === '') { 
          hideLabel(this.getAttribute('id'), false);
        }
        $(this).parent().removeClass('active');
      });
	  
	  /* old
	   field.onfocus = function () {
        hideLabel(this.getAttribute('id'), true);
      };
      field.onblur = function () {
        if (this.value === '') {
          hideLabel(this.getAttribute('id'), false);
        }
      };
	  */

      // Handle clicks to LABEL elements (for Safari).
      labels[i].onclick = function () {
        var id, field;
        id = this.getAttribute('for');
        if (id && (field = document.getElementById(id))) {
          field.focus();
        }
      };

    }
  }
};

/* Swap out the CSS */
function hideLabel (field_id, hide) {
  var field_for;
  var labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
    field_for = labels[i].htmlFor || labels[i].getAttribute('for');
    if (field_for == field_id) {
	  if (hide){
		labels[i].className = labels[i].className.replace("overlabel-apply","overlabel-hide");
	  } else {
		labels[i].className = labels[i].className.replace("overlabel-hide","overlabel-apply");
	  }
      return true;
    }
  }
}

$(document).ready(function() {
    //Because Safari sucks, and fills in saved username/password info AFTER window.onload
    initOverLabels();
});

window.onload = function() {
	// handle form auto fillers
    setTimeout(function() {initOverLabels();}, 1000);
}
