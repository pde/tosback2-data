function quickEditIsValidFileName(txtBox){
  var s = txtBox.value;
  var ok = true;
  for(i = 0; i < s.length; i++){
    var c = s.charAt(i);
    if(c == '<' || c == '>' || c == ':' || c == '"' || c == '/' || c== '\\' || c == '|' || c == '?' || c == '*'){
      ok = false;
      break;
    }
  }
  if(!ok){
    $('#writeDragDiv div span#editFileNameError').show();
    $('#dragDiv div span#editFileNameError').show();
  }
  return ok;
}

function quickEditIsValidCharForFileName(event){
  var c = '';
  if (event.which == null){
     c= String.fromCharCode(event.keyCode);    // IE
  }else if (event.which != 0 && event.charCode != 0){
     c= String.fromCharCode(event.which);	  // All others
  }

  if(c == '<' || c == '>' || c == ':' || c == '"' || c == '/' || c== '\\' || c == '|' || c == '?' || c == '*'){
    if(!quickEditErrorMsgShown){
      quickEditErrorMsgShown = true;
      $('#writeDragDiv div span#editFileNameError').show();
      $('#dragDiv div span#editFileNameError').show();
      setTimeout('quickEditCloseErrorMsg();', 3000);
    }
    return false;
  }
  return true;
}

var quickEditErrorMsgShown = false;

function quickEditCloseErrorMsg(){
  if(quickEditErrorMsgShown){
    quickEditErrorMsgShown = false;
    $('#writeDragDiv div span#editFileNameError').hide();
    $('#dragDiv div span#editFileNameError').hide();
  }
}