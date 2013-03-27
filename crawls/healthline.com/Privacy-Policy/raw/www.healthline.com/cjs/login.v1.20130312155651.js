if(typeof YAHOO.HL == "undefined"){window.YAHOO.HL = {}}
YAHOO.HL.login = {
  formObj: null,
  hostName: 'http://www.healthline.com',
  toggle: function(e) {
    var sb = document.getElementById('loginbox');
    if(sb.style.display == 'block'){
      sb.style.display = 'none';
      if (document.getElementById('error')) {
        document.getElementById('error').innerHTML = '';
      }
      YAHOO.util.Event.removeListener(document, 'click', YAHOO.HL.login.close, this, true);
      YAHOO.util.Event.removeListener(document.getElementById("closeloginbox"), 'click', YAHOO.HL.login.closelib, this, true);
    } else {
      var elTarget = document.getElementById('signin');
      var elTargetPos = YAHOO.util.Dom.getXY(elTarget);
      sb.style.display = 'block';
      elTargetPos[0] = elTargetPos[0] - 175;
      elTargetPos[1] = elTargetPos[1] + elTarget.offsetHeight + 7;
      YAHOO.util.Dom.setXY(sb,elTargetPos);
      YAHOO.util.Event.addListener(document, 'click', YAHOO.HL.login.close, this, true);
      YAHOO.util.Event.addListener(document.getElementById("closeloginbox"), 'click', YAHOO.HL.login.closelib, this, true);
    }
  },
  sendrequest: function(form) {
    var errors = hlFormValidator.is_valid(form);
    if (errors == '') {
      YAHOO.HL.login.formObj = form;
      YAHOO.util.Connect.asyncRequest('GET', '/myhealthline/login?email='+form.email.value+'&password='+form.password.value, YAHOO.HL.login, null);
    } else {
      if (!document.getElementById('error')) {
        YAHOO.HL.login.createErrorDiv(form);
      }
      document.getElementById('error').innerHTML = '<div class="loginbox-err"><div class="lb-err-box"><img class="spr-erroricon" src="/images/clear.gif" alt=""/></div><div class="lb-err-msg-box">' + errors + '</div><div class="clear"></div></div>';
    }
  },
  success: function(o){
    JSONobj = eval('(' + o.responseText + ')');
    if (JSONobj.status == false) {
      if (!document.getElementById('error')) {
        YAHOO.HL.login.createErrorDiv(YAHOO.HL.login.formObj);
      }
       var jsonmsg = JSONobj.message;
       var jsonmsg_href_pos = jsonmsg.indexOf('href');
      if(jsonmsg_href_pos >= 0) {
        var jsonmsg_tmp1 = jsonmsg.substring(0,jsonmsg_href_pos+6);
        var jsonmsg_tmp2 = jsonmsg.substring(jsonmsg_href_pos+6,jsonmsg.length);
        jsonmsg = jsonmsg_tmp1.concat(YAHOO.HL.login.hostName,jsonmsg_tmp2);
      }
      document.getElementById('error').innerHTML = '<div class="loginbox-err"><div class="lb-err-box"><img class="spr-erroricon" src="/images/clear.gif" alt=""/></div><div class="lb-err-msg-box">' + jsonmsg + '</div><div class="clear"></div></div>';
    } else {
      window.location.href = YAHOO.HL.login.hostName+'/myhealthline';
    }
  },
  createErrorDiv: function(form) {
    var emailerror = document.createElement('div');
    emailerror.id = 'error';
    emailerror.className = 'field-error';
    form.insertBefore(emailerror,form.firstChild);
  },
  close: function(e){
    var lib = document.getElementById('loginbox');
    var sib = document.getElementById('signin');
    var silb = document.getElementById('siLink');
    var el = YAHOO.util.Event.getTarget(e);
    if (el == sib || el == silb) {
      return;
    }
    while (el = YAHOO.HL.login.node_parent(el)) {
      if (el == lib || el == sib) {
        YAHOO.util.Event.stopPropagation(e);
        return;
      }
    }
    lib.style.display = 'none';
  },
  closelib: function(e){
    var lib = document.getElementById('loginbox');
    lib.style.display = 'none';
  },
  node_parent: function(child){
    var parent = (child.parentElement != undefined) ? child.parentElement : child.parentNode;
    return parent;
  }
};