  // BB-893 : legacy site uses AJAX hashes(#) URLs.
  var legacy_url = window.location.href.split("#/");
  if (typeof legacy_url[1] !== 'undefined' && legacy_url[1] !== null) {
    document.location.href = legacy_url[0] + legacy_url[1];
  }
  ;
