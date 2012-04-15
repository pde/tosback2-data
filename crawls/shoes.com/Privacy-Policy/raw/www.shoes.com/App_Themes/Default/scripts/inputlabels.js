function initOverLabels () {
  if (!document.getElementById) return;      

  var labels, id, field;

  // Set focus and blur handlers to hide and show 
  // labels with 'overlabel' class names.
  labels = document.getElementsByTagName('label');
  for (var ee = 0; ee < labels.length; ee++) {

    if (labels[ee].className == 'overlabel') {

      // Skip labels that do not have a named association
      // with another field.
      id = labels[ee].htmlFor || labels[ee].getAttribute ('for');
      if (!id || !(field = document.getElementById(id))) {
        continue;
      } 

      // Change the applied class to hover the label 
      // over the form field.
      labels[ee].className = 'overlabel-apply';

      // Hide any fields having an initial value.
      if (field.value !== '') {
        hideLabel(field.getAttribute('id'), true);
      }

      // Set handlers to show and hide labels.
      field.onfocus = function () {
        hideLabel(this.getAttribute('id'), true);
      };
      field.onblur = function () {
        if (this.value === '') {
          hideLabel(this.getAttribute('id'), false);
        }
      };

      // Handle clicks to label elements (for Safari).
      labels[ee].onclick = function () {
        var id, field;
        id = this.getAttribute('for');
        if (id && (field = document.getElementById(id))) {
          field.focus();
        }
      };

    }
  }
};

function hideLabel (field_id, hide) {
  var field_for;
  var labels = document.getElementsByTagName('label');
  for (var ee = 0; ee < labels.length; ee++) {
    field_for = labels[ee].htmlFor || labels[ee]. getAttribute('for');
    if (field_for == field_id) {
      labels[ee].style.textIndent = (hide) ? '-1000px' : '0px';
      return true;
    }
  }
}

// Initialize function in page HTML, because the window.onload was breaking another script
//window.onload = function () {
//  setTimeout(initOverLabels, 50);
//};