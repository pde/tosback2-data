// Make all external links use target="_blank"
$(document).ready(function () {
    $('a[href^="http://"]').attr('target', '_blank');
    $('a[href^="https://"]').attr('target', '_blank');
});