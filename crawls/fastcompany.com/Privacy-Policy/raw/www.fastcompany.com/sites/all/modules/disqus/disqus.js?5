var disqus_shortname = '';
var disqus_developer = 0;
var disqus_url = '';
var disqus_title = '';
var disqus_identifier = '';
var disqus_config = null;
var disqus_def_name = null;
var disqus_def_email = null;

/**
 * Drupal Disqus behaviors.
 */
Drupal.behaviors.disqus = function(context) {
  // Process any Disqus links.
  if (Drupal.settings.disqusCommentDomain || false) {
    // Change the Disqus shortname.
    disqus_shortname = Drupal.settings.disqusCommentDomain;

    // Make the AJAX call to get the number of comments.
    jQuery.ajax({
      type: 'GET',
      url: 'http://' + disqus_shortname + '.disqus.com/count.js',
      dataType: 'script',
      cache: true
    });
  }

  // Process any Disqus threads.
  if (Drupal.settings.disqus || false) {
    // Only query if the Disqus thread exists.
    if (jQuery("#disqus_thread").length) {
      // Construct the settings.
      var disqus = Drupal.settings.disqus;
      disqus_shortname = disqus.shortname;
      disqus_developer = disqus.developer || 0;
      disqus_url = disqus.url;
      disqus_title = disqus.title;
      disqus_identifier = disqus.identifier;
      disqus_def_name = disqus.name || null;
      disqus_def_email = disqus.email || null;

      // Language and SSO settings are passed in through disqus_config().
      disqus_config = function() {
        if (disqus.language || false) {
          this.language = disqus.language;
        }
        if (disqus.remote_auth_s3 || false) {
          this.page.remote_auth_s3 = disqus.remote_auth_s3;
        }
        if (disqus.api_key || false) {
          this.page.api_key = disqus.api_key;
        }
        if (disqus.sso || false) {
          this.sso = disqus.sso;
        }
      };

      // Make the AJAX call for the comment thread.
      jQuery.ajax({
        type: 'GET',
        url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
        dataType: 'script',
        cache: true
      });
    }
  }
};

