//jQuery OpenID Plugin 1.1 Copyright 2009 Jarrett Vance http://jvance.com/pages/jQueryOpenIdPlugin.xhtml
$.fn.openid = function() {
  var $this = $(this);
  var $id = $this.find('input[name=openid]');
  var $idrow = $this.find('table tr[id=openid_identifier]');
  var $idspan = $this.find('span[id=openid_identifier]');
  var $loginAndPassword = $this.find('span[id=userNameAndPasswordForm]');

  var $login = $this.find('input[name=login]');
  var $password = $this.find('input[name=password]');
  var $password2 = $this.find('input[name=password2]');

  var submitid = function() {
    if ($id.val().length < 1) {
      $id.focus();
      return false;
    }
    return true;

  };
  var direct = function() {
    var $li = $(this);
    $li.parent().find('li').removeClass('highlight');
    $li.addClass('highlight');
    $idrow.hide();

    $this.unbind('submit').submit(function() {
      $id.val($this.find("li.highlight span").text());
    });
    $this.submit();
    return false;
  };

  var openid = function() {
    var $li = $(this);
    $li.parent().find('li').removeClass('highlight');
    if(($idrow.length > 0 && $idrow.is(':visible')) || ($idspan.length > 0 && $idspan.is(':visible'))){
        $id.val('');
        if($idrow.length > 0){
            $login.removeAttr('disabled');
            $password.removeAttr('disabled');
            $password2.removeAttr('disabled');
            $idrow.hide();
        }else{
            $idspan.hide();
            $loginAndPassword.show();
        }
        $login.focus();
    }else{
        $li.addClass('highlight');
        if($idrow.length > 0){
            $login.attr('disabled', true);
            $password.attr('disabled', true);
            $password2.attr('disabled', true);
            $idrow.show();
        }else{
            $loginAndPassword.hide();
            $idspan.show();
        }
        $id.focus();
    }
    $this.unbind('submit').submit(submitid);
    return false;
  };

  $this.find('li.direct').click(direct);
  $this.find('li.openid').click(openid);

  $id.keypress(function(e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      return submitid();
    }
  });
  $this.find('li span').hide();
  $this.find('li').css('line-height', 0).css('cursor', 'pointer');
  if($idrow.length > 0)
    $idrow.hide();
  if($idspan.length > 0)
    $idspan.hide();
  $login.removeAttr('disabled');
  $password.removeAttr('disabled');
  $password2.removeAttr('disabled');

  return this;
};
