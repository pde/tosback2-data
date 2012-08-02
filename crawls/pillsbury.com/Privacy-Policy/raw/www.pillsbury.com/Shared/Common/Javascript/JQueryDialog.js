
/* Dialog start */

function openDialog(dialogId) {

   var dialog = jQuery('#' + dialogId).dialog("open");
   //    dialog.parent().appendTo(jQuery("form:first"));
   
}

function openVariableDialog(dialogId) {
  openDialog(dialogId);
  jQuery('.VariableWidth').css("overflow", "visible").addClass("VariableWidth-ui-dialog");
}

function autoOpenFixForASPNet(dialogId) {
    jQuery(document).ready(function() {

    jQuery('#' + dialogId).parent().appendTo(jQuery("form:first"));

    });
}

function autoOpenFixForASPNetVariable(dialogId) {
    jQuery(document).ready(function() {

        jQuery('#' + dialogId).parent().appendTo(jQuery("form:first"));
        jQuery('.VariableWidth').css("overflow", "visible").addClass("VariableWidth-ui-dialog");

    });
}

function closeDialog(dialogId, clearFormFields) {
    jQuery('#' + dialogId).dialog("close");
    if (clearFormFields) {
        jQuery('#' + dialogId + ' input').val("");
        jQuery('#' + dialogId + ' textarea').val("");
    }
}

/* Dialog End */






