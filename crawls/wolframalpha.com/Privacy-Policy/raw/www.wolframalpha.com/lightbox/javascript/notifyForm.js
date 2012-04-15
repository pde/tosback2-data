
function lboxBindNotify(target){
  $(target).each(function(){
    $(this).click(function(e){
      e.preventDefault();
      lboxShow("#lboxContent_notifyForm");
    });
  });
}

function setupNotifyForm(){
  $("#lboxContent_notifyForm .close").unbind("click").click(function(e){
    e.preventDefault();
    lboxHide("#lboxContent_notifyForm");
  });
  setupFormClose("#lboxContent_notifyForm .close","#lboxContent_notifyForm");
  $("#lboxContent_notifyThanks .close").unbind("click").live("click",function(e){
    e.preventDefault();
    lboxHide("#lboxContent_notifyThanks");
  });
  $("#lboxContent_notifyForm .sendImg").unbind("click").live("click",function(e){
    e.preventDefault();
    if (!validateDefaultForm("#notifyForm")) return;
    $.post("/input/sendFormData.jsp", $("#notifyForm").serialize(), function(d, status){
      $("#lboxContent_notifyForm").hide();
      lboxShow("#lboxContent_notifyThanks");
    });
  });
}

setupNotifyForm();


