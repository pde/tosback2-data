
/**
 * Undocumented Code!
 */
$.extend({
  getUrlVars: function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function (name) {
    return $.getUrlVars()[name];
  }
});

/**
 * WTF? This isn't used anywhere.
 */
Drupal.gigya = {};

/**
 * Undocumented Code!
 */
Drupal.gigya.logoutResponse = function (response) {
  if (response['status'] == 'OK') {
    document.getElementById('logoutMessage').innerHTML = "Successfully logged out, redirecting";
    window.location = Drupal.settings.gigya.logoutLocation;
  }
};

/**
 * Undocumented Code!
 */
Drupal.gigya.loginCallback = function (response) {
  urlObj = {'signature':response['signature'], 'timestamp':response['timestamp'], 'UID':response['UID']};
  if(response['provider'] != 'site' && Drupal.settings.gigya.loginDestination != undefined){
    window.location = Drupal.settings.gigya.loginDestination + '&' + $.param(urlObj);
  }
}

/**
 * Callback for the getUserInfo function.
 *
 * Takes the getUserInfo object and renders the HTML to display an array
 * of the user object
 *
 * TODO: probably should be removed in production, since its just for dumping
 * user output.
 */
Drupal.gigya.getUserInfoCallback = function (response) {
  if (response.status == 'OK') {
    var user = response['user'];
    // Variable which will hold property values.
    var str="<pre>";
    for (prop in user) {
      if (prop == 'birthYear' && user[prop] == 2009) {
        user[prop] = '';
      }
      if (prop == 'identities') {
        for (ident in user[prop]) {
          for (provide in user[prop][ident]) {
           str+=provide + " SUBvalue :"+ user[prop][ident][provide]+"\n";
          }
        }
      }
      // Concate prop and its value from object.
      str+=prop + " value :"+ user[prop]+"\n";
    }
    str+="</pre>";

    document.getElementById('userinfo').innerHTML = str;
  }
};

/**
 * Undocumented Code!
 */
Drupal.gigya.showLoginUI = function (loginUIParams) {
  var conf = Drupal.settings.gigya.conf;
  gigya.services.socialize.showLoginUI(conf, loginUIParams);
};

/**
 * Undocumented Code!
 */
Drupal.gigya.showAddConnectionsUI = function (connectUIParams) {
  var conf = Drupal.settings.gigya.conf;
  gigya.services.socialize.showAddConnectionsUI(conf, connectUIParams);
};

/**
 * Undocumented Code!
 */
Drupal.gigya.printResponse = function (res) {
  var spaces=' ';
  var str='';
  for (ppp in res) {
    var obj = res[ppp];
    if ( typeof res[ppp] != 'object' ) {
      str += spaces + ppp + ' :  ' + res[ppp] + '\n';
    }
    else {
      str += spaces+ppp+'\n';
      spaces = '   ';
      for (kk in obj) {
        var obj2 = obj[kk];
        if (typeof obj[kk] != 'object') {
          str += spaces + kk + ' :  ' + obj[kk] + '\n';
        }
        else {
          spaces = '     ';
          for (zz in obj2) {
            str += spaces + zz + ' :  ' + obj2[zz] + '\n';
          }
        }
      }
      spaces=' ';
    }
  }
  return str;
}

/**
 * Undocumented Code!
 */
Drupal.gigya.notifyLoginCallback = function (response) {
  if (response['status'] == 'OK') {
    setTimeout("$.get(Drupal.settings.basePath + 'socialize-ajax/notify-login')", 1000);
  }
};

/**
 * Undocumented Code!
 */
Drupal.gigya.getHTMLEncode  = function (t) {
  return t.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Undocumented Code!
 */
Drupal.gigya.initResponse = function (response) {
  if (null != response.user) {
    if (response.user.UID != Drupal.settings.gigya.notifyLoginParams.siteUID || !response.user.isLoggedIn) {
      gigya.services.socialize.notifyLogin(Drupal.settings.gigya.conf, Drupal.settings.gigya.notifyLoginParams);
    }
  }
}

/**
 * Undocumented Code!
 */
Drupal.gigya.showShareUI = function (shareUIParams) {
  shareUIParams.userAction = Drupal.gigya.buildUserAction(shareUIParams.userAction);
  gigya.services.socialize.showShareUI(Drupal.settings.gigya.conf, shareUIParams);
}

/**
 * Undocumented Code!
 */
Drupal.gigya.buildUserAction = function (userActionParams) {
  var act = new gigya.services.socialize.UserAction();
  $.each(userActionParams, function (index, value) {
    switch (index) {
    case 'user_message':
      act.setUserMessage(value);
      break;
    case 'title':
      act.setTitle(value);
      break;
    case 'description':
      act.setDescription(value);
      break;
    case 'link_back':
      act.setLinkBack(value);
      break;
    case 'template':
      act.setTemplate(value);
      break;
    case 'action_name':
      act.setActionName(value);
      break;
    case 'action_links':
      $.each(value, function (action_index, action_item) {
        act.addActionLink(action_item.title, action_item.href);
      });
      break;
    case 'template_fields':
      $.each(value, function (template_field_index, template_field_item) {
        act.setTemplateField(template_field_item.field_name, template_field_item.text, template_field_item.href);
      });
      break;
    case 'media_item':
      act.addMediaItem(value);
      break;
    }

  });
  return act;
}
