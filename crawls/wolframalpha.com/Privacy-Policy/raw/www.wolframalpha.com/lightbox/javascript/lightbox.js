/*function lboxShow(id){
  $(id).show();
  $("#lightboxOverlay").show();
}
*/
function getScrollY(){
  var Y = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    Y = window.pageYOffset;
  } else if( document.body && document.body.scrollTop ) {
    Y = document.body.scrollTop;
  } else if( document.documentElement && document.documentElement.scrollTop ) {
    Y = document.documentElement.scrollTop;
  }
  return Y;
}
function lboxShow(id, customOffset, customOffsetType){
  if (typeof customOffset == "undefined" || customOffset == null) customOffset = 120;  // this is an optional arg
  if (typeof customOffsetType !== "string" || customOffsetType == null) customOffsetType = "px";  // this is an optional arg
  if ($("#lightboxOverlay").length < 1) $("body").append("<div id='lightboxOverlay'></div>");
  $(id).show();
  $("#lightboxOverlay").show();
  y = getScrollY() + customOffset;
  $(id).css("top",y + customOffsetType);
}

function lboxHide(id){
  $(id).hide();
  $("#lightboxOverlay").hide();
}


function validateDefaultForm(formSelect){
  errors = false;
  form = $(formSelect);
  fields = form.find("input.required, textarea.required");
  for (var i = 0; i < fields.length; i++){
    var el = fields.slice(i, i+1);
    if ($.trim(el.val()) == "" || $.trim(el.val()) == "required") {
      el.val("required");
      errors = true;
      el.css("color","red").one("focus", function(e){
        $(this).css("color","").val("");
      });
    } else if (el.attr("name") == "email" || el.attr("name") == "Email") {
      var atPos = $.trim(el.val()).indexOf("@");
      if (atPos == -1 || atPos == 0 || atPos == $.trim(el.val()).length - 1) {
        el.val("valid email required");
        errors = true;
        el.css("color","red").one("focus",function(e){
          $(this).css("color","").val("");
        });
      }
    }
  }
  return !errors;
}

function setupFormClose(closeSelect, lboxContent){
  $(closeSelect).unbind("click").live("click",function(e){
    e.preventDefault();
    lboxHide(lboxContent);
  });
}

function setupFormLinkedIn(formSelect){
  $(formSelect).find(".linkedin, *[name=linkedin]").each(function(){
    $(this).val("http://").css("color","#999").bind("focus", function(){
      $(this).css("color","");
    }).bind("blur", function(){
      if($(this).val() == "http://")
        $(this).css("color","#999");
    });
  });
}

function setupFormPhone(formSelect){
  var byPhoneBox = $(formSelect).find("input#byPhone[type=checkbox]");
  setupFormPhone_internal(formSelect, byPhoneBox);
  byPhoneBox.change(function(e){
    setupFormPhone_internal(formSelect, this);
  });
}

function setupFormPhone_internal(formSelect, that){
    if ($(that).attr("checked") == true){
      $(formSelect).find("*[name=phone]").addClass("required").siblings("label").find(".optional").hide();
    } else {
      var phoneField = $(formSelect).find("*[name=phone]");
      phoneField.removeClass("required").siblings("label").find(".optional").show();
      if (phoneField.val() == "required")
        phoneField.css("color","").val("");
    }
}
