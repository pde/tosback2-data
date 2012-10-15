// Display the carosel.
document.write('<div id="top-ten-side-carosel" class="side-carosel">');
document.write('</div>');

// Load the data.
$.getJSON('/top-ten-lists/carosel.php?max=2&offset=0&id=top-ten-side-carosel&pages=4&selected=top-10-most-popular-tweets-about-words,top-10-words-from-trademarks-vol-2', onCaroselLoaded);
