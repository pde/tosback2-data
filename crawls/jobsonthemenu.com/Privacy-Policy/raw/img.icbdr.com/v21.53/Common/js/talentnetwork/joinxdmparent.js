var setupMessaging;

setupMessaging = function(iframe) {
  var messageHandlers, onMessage, postMessage, storage;

  if (typeof window.postMessage === 'undefined' || typeof JSON === 'undefined') {
    return false;
  }
  storage = {};
  postMessage = function(event, data) {
    var match, targetOrigin;

    match = /([^:]+):\/\/([^\/]+)\//.exec(iframe.attr('src'));
    targetOrigin = match[1] + '://' + match[2];
    data.event = event;
    data.frameId = storage.id;
    return iframe[0].contentWindow.postMessage(JSON.stringify(data), targetOrigin);
  };
  messageHandlers = {
    sizeChange: function(data) {
      return iframe.css({
        height: data.height + 'px'
      }).attr({
        scrolling: 'no'
      });
    },
    redirect: function(data) {
      return window.location = data.url;
    },
    joinSubmit: function(data) {
      storage.joinSubmit = true;
      $(document.body).trigger('joinSubmitted');
      if ($('.ui-dialog').length > 0) {
        return window.scrollTo(0, $('.ui-dialog').position().top - 40);
      } else {
        return window.scrollTo(0, $('.form-frame').position().top - 40);
      }
    },
    joinSuccess: function(data) {
      if (!storage.joinSubmit && data.continueUrl.toLowerCase().indexOf('/apply') > -1) {
        window.location = data.continueUrl;
      }
      if (data.memberToken != null) {
        $.ajax(data.memberToken);
      }
      return $(document.body).trigger('joinCompleted');
    },
    joinContinue: function(data) {
      if (data.continueUrl.toLowerCase().indexOf('/apply') > -1 || $('#join-ajax-form').length < 1) {
        return window.location = data.continueUrl;
      } else {
        return $('#join-ajax-form').dialog('close');
      }
    },
    joinAlreadyUser: function(data) {
      return $(document.body).trigger('joinAlreadyUser');
    },
    joinWithProfile: function(data) {
      return $(document.body).trigger('joinWithProfile');
    },
    closeDialog: function(data) {
      var popup;

      popup = $('#join-ajax-form');
      if (popup.length > 0) {
        popup.dialog('close');
        return $(document.body).trigger('refreshStatus');
      } else {
        return window.location = ScriptVariables.Get('SitePath');
      }
    },
    refresh: function(data) {
      return window.location = window.location.href;
    },
    analyticsEvent: function(data) {
      var _gaq;

      _gaq = window._gaq || [];
      return _gaq.push(['tn._trackEvent', data.category, data.action, data.label]);
    },
    loginStatus: function(data) {
      window.TN = window.TN || {};
      window.TN.Profile = window.TN.Profile || {};
      window.TN.Profile.IsLoggedIn = data.isLoggedIn;
      return $(document.body).trigger('updateLoginStatus', [data.isLoggedIn]);
    },
    formclose: function(data) {
      return $('#join-ajax-form').dialog('close');
    },
    loginAction: function(data) {
      var closeSpan, dialog, frame;

      if ($("#profile-login-dialog").length > 0) {
        return;
      }
      closeSpan = $('<span id="spnCancelImg" />').on("click", function() {
        return dialog.remove();
      });
      dialog = $("<div>").appendTo($("#profile-login-container")).attr("id", "profile-login-dialog").append(closeSpan).dialog("open").css("width", "350px");
      frame = $("<iframe class='profile-login-frame' frameborder='0'></iframe>").attr("src", ScriptVariables.Get("ProfileLoginUrl")).css("width", "350px").appendTo(dialog);
      return setupMessaging(frame);
    },
    loginActionSucccess: function(data) {
      $("#profile-login-dialog").remove();
      return $(document.body).trigger('refreshStatus');
    },
    closeDialogOpenJoinAction: function(data) {
      $('#spnCancelImg').trigger('click');
      return $('.hlJoinTalentNetwork').trigger('click');
    },
    closeJoinOpenDialog: function(data) {
      var closeSpan, dialog, frame;

      $('#spnCancelImg').trigger('click');
      if ($("#profile-login-dialog").length > 0) {
        return;
      }
      closeSpan = $('<span id="spnCancelImg" />').on("click", function() {
        return dialog.remove();
      });
      dialog = $("<div>").appendTo($("#profile-login-container")).attr("id", "profile-login-dialog").append(closeSpan).dialog("open").css("width", "350px");
      frame = $("<iframe class='profile-login-frame' frameborder='0'></iframe>").attr("src", ScriptVariables.Get("ProfileLoginUrl")).css("width", "350px").appendTo(dialog);
      return setupMessaging(frame);
    }
  };
  onMessage = function(e) {
    var data;

    if (!/careerbuilder.com$/.test(e.origin)) {
      return;
    }
    data = JSON.parse(e.data);
    if (typeof storage.id === 'undefined') {
      storage.id = data.frameId;
    }
    if (storage.id !== data.frameId) {
      return;
    }
    return messageHandlers[data.event](data);
  };
  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('message', onMessage, false);
  } else {
    window.attachEvent('onmessage', onMessage);
  }
  if (typeof iframe !== 'undefined' && iframe.length > 0) {
    iframe.load(function(e) {
      storage.id = Math.random();
      return postMessage('initialize', {
        initiatingUrl: window.location.href
      });
    });
  }
  return postMessage;
};
