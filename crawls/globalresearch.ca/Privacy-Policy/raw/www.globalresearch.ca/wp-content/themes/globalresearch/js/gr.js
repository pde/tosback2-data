jQuery(document).ready(function() {

  jQuery('a#toggleFont').click(function(event) {
    event.preventDefault();
    jQuery('div.content').toggleClass('biggerFont');
  });

});
