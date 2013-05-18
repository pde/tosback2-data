(function ($) {
  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.addDrupalComment = function(eventObj) {
      var data = {
        'commentText': eventObj.commentText,
        'UIDSignature': eventObj.user.UIDSignature,
        'uid': eventObj.user.UID,
        'timestamp': eventObj.user.signatureTimestamp,
        'nid': Drupal.settings.gigyaComments.commentsUIparams.streamID
      };
      var base = eventObj.context.id;
      var element_settings = {};
      element_settings.url = '/gigya/comments';
      element_settings.event = 'gigyaComments';
      var ajax = new Drupal.ajax(base, $('#' + eventObj.context.id), element_settings);
      ajax.options.data = data;
      $(ajax.element).trigger('gigyaComments');
  };

  /**
   * @todo Undocumented Code!
   */
  Drupal.behaviors.gigya_comments =  {
    attach: function(context) {
      if (typeof Drupal.settings.gigyaComments !== 'undefined') {
        Drupal.settings.gigyaComments.commentsUIparams.onCommentSubmitted = Drupal.gigya.addDrupalComment;
        gigya.services.socialize.showCommentsUI(Drupal.settings.gigyaComments.commentsUIparams);
      }
      else {
        return false;
      }
    }
  };
})(jQuery);

;
