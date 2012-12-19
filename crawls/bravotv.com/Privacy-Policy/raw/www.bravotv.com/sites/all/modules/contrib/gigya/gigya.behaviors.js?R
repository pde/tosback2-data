
/**
 * Undocumented Code!
 */
Drupal.behaviors.gigyaNotifyFriends = function (context) {
  $('.friends-ui:not(.gigyaNotifyFriends-processed)', context).addClass('gigyaNotifyFriends-processed').each(
    function () {
      gigya.services.socialize.getUserInfo(Drupal.settings.gigya.conf, {callback:Drupal.gigya.notifyFriendsCallback});
      gigya.services.socialize.addEventHandlers(Drupal.settings.gigya.conf, { onConnect:Drupal.gigya.notifyFriendsCallback, onDisconnect:Drupal.gigya.notifyFriendsCallback});
    });
};

/**
 * Undocumented Code!
 */
Drupal.behaviors.gigyaInit = function (context) {
  if (Drupal.settings.gigya.notifyLoginParams != undefined) {
    Drupal.settings.gigya.notifyLoginParams.callback = Drupal.gigya.notifyLoginCallback;
    gigya.services.socialize.getUserInfo(Drupal.settings.gigya.conf, {callback: Drupal.gigya.initResponse});
  }

  // Attach event handlers.
  gigya.services.socialize.addEventHandlers(Drupal.settings.gigya.conf, {onLogin:Drupal.gigya.loginCallback});

  // Display LoginUI if necessary.
  if (Drupal.settings.gigya.loginUIParams != undefined) {
    $.each(Drupal.settings.gigya.loginUIParams, function (index, value) {
      Drupal.gigya.showLoginUI(value);
    });
  }

  // Display ConnectUI if necessary.
  if (Drupal.settings.gigya.connectUIParams != undefined) {
    $.each(Drupal.settings.gigya.connectUIParams, function (index, value) {
      Drupal.gigya.showAddConnectionsUI(value);
    });
  }

  // Call ShareUI if it exists.
    if (Drupal.settings.gigya.shareUIParams !== undefined) {
      $('#btnShare').click( function (e) {
        e.perventDefault;
        var imgs = $('.node img');
        if (imgs.size() > 1) {
          var media = { type: 'image', src: imgs[0].src, href: imgs[0].baseURI};
          Drupal.settings.gigya.shareUIParams.userAction.media_item = media;
          }
        Drupal.gigya.showShareUI(Drupal.settings.gigya.shareUIParams);
        });
      }

}
