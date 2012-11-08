function submitConnectRequest(connReqForm, minMessageLength, maxMessageLength,
  defaultMessage, successFunc, errorFunc) {

  jQuery("#btn-member-connect").attr("disabled", true);

  var processForm = false;
  var connectMessage = jQuery.trim( jQuery(connReqForm["network[intro]"]).val() );
  var friendId = jQuery(connReqForm["friend_id"]).val();

  if (connectMessage == defaultMessage) {
    jQuery(connReqForm["network[intro]"]).val("");
    alert("Please enter a message.");
  } else if (connectMessage.length < minMessageLength) {
    alert("Please enter a message at least " + minMessageLength + " characters in length.");
  } else if (connectMessage.length > maxMessageLength) {
    alert("Please limit your message to " + maxMessageLength + " characters.");
  } else {

    var memberConnectData = "intro=" + escape(connectMessage) + "&friend_id=" + friendId;
    processForm = true;

  }

  if (processForm) {

    jQuery.ajax({
      type: "POST",
      url: connReqForm.action,
      data: memberConnectData,
      dataType: "json",
      complete: function(XMLHttpRequest, textStatus, errorThrown){
        var response = eval('(' + XMLHttpRequest.responseText + ')');

        if (response.status == "success") {

          overlay.displaySuccessMessage(response.msg);
          if (successFunc) {
            successFunc(friendId);
          }

        } else if (response.status == "error") {

          overlay.displayErrorMessage(response.msg);
          if (errorFunc) {
            errorFunc(friendId);
          }

        }

      }
    });

  } else {
    jQuery("#btn-member-connect").attr("disabled", false);
  }

  return false;

}
  