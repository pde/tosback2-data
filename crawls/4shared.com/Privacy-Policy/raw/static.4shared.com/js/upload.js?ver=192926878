
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

/*
function UploadModule(cfg) {
  var that = this;

  // The number of files selected for upload
  var filesToUpload = 0;

  cfg = $.extend(true, {
    // Static resources root folder
    static_resources_root: '',
    // The url for querying progress status
    progress_meter_url: null,
    // The maximum allowed file size
    max_file_size: 0,
    // Invisible frame which is upload target
    upload_frame_container: null,
    // Div with progress bar
    progress_bar_container : null,
    // Div with upload buttons
    upload_ui_elements_container: null,
    // The form which sends file to the server
    upload_form: null,
    // The button which starts upload
    upload_button : null,

    // Callback is invoked each time we receive updated progress status from sever
    progress_event_handler: function(progressStatus) {
      alert("don't forget to provide progress_event_handler");
    },

    // Callback is invoked after file upload is completed successfully
    upload_success_handler: function() {
      alert("don't forget to provide upload_success_handler");
    },

    // Cleanup handler is invoked after upload is finished successfully, cancelled or finished with error
    cleanup_handler: function() {
    },

    localized_messages : {
      // Message shown when the file size exceeds maximum allowed file size
      file_size_exceeded: null,
      upload_canceled: null
    }
  }, cfg);

  function makeUrl(url) {
    var re = new RegExp('/.*');
    var m = re.exec(url);
    if (m) {
      url = url.substr(1);
    }
    return  [cfg.static_resources_root, url].join('/');
  }

  var spacerGif = makeUrl('/images/spacer.gif');

  // Indicates that upload is in progress
  var uploadStarts = false;

  function markUploadStarted() {
    uploadStarts = true;
  }

  function showProgressBar() {
    $(cfg.upload_button).addClass("d");
    $(cfg.upload_button).removeClass("a");

    $(cfg.upload_ui_elements_container).hide();
    cfg.progress_event_handler({ percent: 0, sizeOk: "0 KB"});
    $(cfg.progress_bar_container).css('display', 'block');

    setTimeout(function() {
      doLoadXml();
    }, 3000);
  }

  that.hideProgressBar = function() {
    $(cfg.upload_button).removeClass("d");
    $(cfg.upload_button).addClass("a");
    cfg.upload_form.reset();
    $(cfg.progress_bar_container).hide();
    $(cfg.upload_ui_elements_container).show();
    cfg.cleanup_handler();
  }

  function createUploadTargetFrame() {
    var frameHtml = "<iframe name='uploadframe1' id='uploadframe1' style='display:none;' width='1' height='1' src='" +
        spacerGif + "'></iframe>";
    $(cfg.upload_frame_container).html(frameHtml);

    document.uploadForm.target = 'uploadframe1';
    document.uploadForm.action += '#uploadframe1'

    $('#uploadframe1').load(function() {
      uploadframe_onload();
    });
  }

  function checkFileLength(fileElement) {
    if (typeof FileReader != 'undefined') {
      for (var j = 0; j < fileElement.files.length; j++) {
        var size = fileElement.files[j].size;
        if (size > cfg.max_file_size) {
          alert(cfg.localized_messages.file_size_exceeded);
          return false;
        }
      }
    }
    return true;
  }

  that.uploadAction = function() {
    filesToUpload = 0;

    var uplElems = cfg.upload_form.elements;
    for (var i = 0; i < uplElems.length; i++) {
      if (uplElems[i].type == 'file') {
        if (uplElems[i].value == '') {
          // skip
        } else {
          if (!checkFileLength(uplElems[i])) {
            return false;
          }
          filesToUpload += getNumberOfSelectedFiles(uplElems[i]);
        }
      }
    }

    if (filesToUpload < 1) {
      alert('You didn\'t select any file to upload yet.');
      return false;
    }

    createUploadTargetFrame();

    setTimeout(function() {
      cfg.upload_form.submit();
    }, 10);

    setTimeout(function() {
      markUploadStarted();
    }, 20);

    showProgressBar();

    return true;
  }

  function stopUpload(callback) {
    uploadStarts = false;
    document.getElementById("uploadframe1").src = spacerGif;

    setTimeout(function() {
      if (callback) {
        callback();
      }
      that.hideProgressBar()
    }, 10);
  }

  that.cancelTransfer = function() {
    stopUpload(function() {
      alert(cfg.localized_messages.upload_canceled);
    });
  }


  function uploadframe_onload() {
    if (uploadStarts) {
      uploadStarts = false;
      var doc = getIFrameDocument('uploadframe1');
      if (doc != null && doc.getElementById('uploadedFileId') != null) {
        var sizeOk = doc.getElementById('sizeOk');
        cfg.progress_event_handler({ percent: 100, sizeOk: sizeOk ? sizeOk.value : null});
        setTimeout(
            function() {
              cfg.upload_success_handler(doc.getElementById('uploadedFileId').value);
            }, 300);

      } else if (doc != null && doc.getElementById('alert') != null) {
        doc.getElementById(doc.getElementById('alert').value);
        that.hideProgressBar();
      }
      else {
        alert('Error: Unable to retrieve information from upload subcomponent.');
      }
    }
  }

  function getIFrameDocument(frameId) {
    var iframeEl = document.getElementById(frameId);
    var doc = null;
    if (iframeEl.contentDocument) { // DOM
      doc = iframeEl.contentDocument;
    } else if (iframeEl.contentWindow) { // IE win
      doc = iframeEl.contentWindow.document;
    }
    return doc;
  }

  function doLoadXml() {
    //  /account/progressbar.jsp
    loadXMLDoc(cfg.progress_meter_url + '&random=' + Math.random());
  }

  function loadXMLDoc(url) {
    jQuery.ajax({
      url: url,
      cashe: false,
      success: function(data, textStatus, XMLHttpRequest) {
        parseReqXml(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus + '  ' + errorThrown);
      }
    });
  }

  function parseReqXml(xml) {
    if (uploadStarts) {
      var el = xml.getElementsByTagName("status")[0];

      var active = el.getAttribute("active");
      var percent = el.getAttribute("percent");
      var elapsedFormatted = el.getAttribute("elapsedFormatted");
      var timeleftFormatted = el.getAttribute("timeleftFormatted");
      var krate = el.getAttribute("krate");
      var sizeOk = el.getAttribute("sizeOk");
      var readBytes = el.getAttribute("readBytes");

      var progressStatus = {
        active : active,
        percent: percent,
        elapsedFormatted :elapsedFormatted,
        timeleftFormatted: timeleftFormatted,
        krate : krate,
        sizeOk : sizeOk,
        readBytes: readBytes
      };

      if (sizeOk) {
        cfg.progress_event_handler(progressStatus);

        //  Some browsers support multiple upload but don't support FileReader API, so we can't detect
        //   the number of uploaded files. If that is the case, then skip file size check.
        if (!Utils.isHtml5UploadSupport && cfg.max_file_size > 0 && readBytes > cfg.max_file_size * filesToUpload) {
          stopUpload(function() {
            alert(cfg.localized_messages.file_size_exceeded);
          });
          return;
        }
      }

      setTimeout(function() {
        doLoadXml();
      }, 2000);
    }
  }
}

UploadModule.readablizeBytes = function (bytes) {
  if (bytes == 0) {
    return '0 bytes'
  }
  var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
};

*/