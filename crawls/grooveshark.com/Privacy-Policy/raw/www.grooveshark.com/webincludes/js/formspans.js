function initOverSpans () {
  if (!document.getElementById) return;      

  var spans, id, field;
  // Set focus and blur handlers to hide and show 
  // SPANs with 'overspan' class names.
  spans = document.getElementsByTagName('span');
  for (var i = 0; i < spans.length; i++) {
    
    if (spans[i].className == 'overspan') {
      // Skip spans that do not have a named association
      // with another field.
      id = spans[i].htmlFor || spans[i].getAttribute('for');
      if (!id || !(field = document.getElementById(id))) {
        continue;
      }
      // Change the applied class to hover the label 
      // over the form field.
      spans[i].className = 'overspan-apply';

      // Hide any fields having an initial value.
      if (field.value !== '') {
        hideSpan(field.getAttribute('id'), true);
      }

      // Set handlers to show and hide spans.
        $(field).focus(function () {
            hideSpan(this.getAttribute('id'), true);
        });
      
      $(field).blur(function () {
          if (this.value === '') { 
              hideSpan(this.getAttribute('id'), false);
          }
      });
      
    
      // Handle clicks to LABEL elements (for Safari).
      spans[i].onclick = function () {
        var id, field;
        id = this.getAttribute('for');
        if (id && (field = document.getElementById(id))) {
          field.focus();
        }
      };
    }
  }
};

// Swap out the CSS 
function hideSpan (field_id, hide) {
    var field_for;
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        field_for = spans[i].htmlFor || spans[i].getAttribute('for');
        if (field_for == field_id) {
            if (hide){
                spans[i].className = spans[i].className.replace("overspan-apply","overspan-hide");
            } else {
                spans[i].className = spans[i].className.replace("overspan-hide","overspan-apply");
            }
            return true;
        }
    }
return true;
}


$(document).ready(function() {
    //Because Safari sucks, and fills in saved username/password info AFTER window.onload
    initOverSpans();
});
window.onload = function() {
    // handle form auto fillers
    setTimeout(function() {initOverSpans();}, 1000);
}
