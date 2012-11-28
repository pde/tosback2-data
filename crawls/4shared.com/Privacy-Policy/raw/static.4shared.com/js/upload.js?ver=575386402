var uploadStarts = false;

function checkFileLength(fileElement) {
    if (typeof FileReader != 'undefined' && typeof 'getFileSizeLimitErrorMessage' == 'string') {
        for (var j = 0; j < fileElement.files.length; j++) {
            var size = fileElement.files[j].size;
            if (size > getUploadFileSizeLimit() * 1024) {
                alert(getFileSizeLimitErrorMessage());
                return false;
            }
        }
    }
    return true;
}

function getNumberOfSelectedFiles(fileInput) {
    if (typeof FileReader == 'undefined') {
        return 1;
    } else {
        return fileInput.files.length;
    }
}

function uploadActionImpl(aUploadForm){
    var filesToUpload=0;
    var uplElems = aUploadForm.elements;


      for (var i = 0; i < uplElems.length; i++) {
          var currentUploadElement = uplElems[i]
          if (currentUploadElement.type == 'file') {
              if (currentUploadElement.value == '') {
                  // skip
              } else {
                  if (!checkFileLength(currentUploadElement)) {
                     return false;
                  }
                  filesToUpload += getNumberOfSelectedFiles(currentUploadElement);
              }
          }
      }
      if (filesToUpload < 1) {
          alert('You didn\'t select any file to upload yet.');
          return false;
    }


    aUploadForm.submit();
    uploadStarts = true;

    showProgressBar('upload');
    if( filesToUpload>0 ){
      // quick file size check to avoid long uploading being finally aborted
      window.setTimeout("checkFileSizeDuringUpload("+filesToUpload+");",10000);
    }
      return true;
  }
  function uploadAction(){
    uploadActionImpl(document.uploadForm);
  }

  function webGrabAction(){
      try {
        $("#webgrabUploadDir").val(UploadModule.getCurrentDirIdForUpload());
        document.webGrabForm.submit();
        uploadStarts = true;
        showProgressBar('webGrab');
      } catch (e){
          alert(e);
      }
  }

function refreshForm() {
        massAction(0);
}


function findTopOfDir(){
  var win = window;
  for(;;){
    if( win.document.getElementById('includeFileList') ){
      break;
    }
    if( win==win.parent ){
      break;
    }
    if( !win.parent ){
      break;
    }
    win = win.parent;
  }
  return win;
}