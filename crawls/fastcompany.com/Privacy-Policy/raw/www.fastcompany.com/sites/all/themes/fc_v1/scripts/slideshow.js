$(document).ready( function() {
  // Every twelve seconds execute the switchSlide() function
  slider = setInterval( "switchSlide()", 12000);
});

// This function takes the first .slide element and put at the end
function switchSlide() {
  var slide = $('.slideshow .slide:first');
  slide.hide();
  $('.slideshow').append(slide);
  slide.fadeIn('slow');
}

function nextSlide() {
  clearInterval(slider);
  var slide = $('.slideshow .slide:first');
  slide.hide();
  $('.slideshow').append(slide);
  slide.fadeIn('fast');
  slider = setInterval( "switchSlide()", 12000);
}

function prevSlide() {
  clearInterval(slider);
  var slide = $('.slideshow .slide:last');
  slide.hide();
  $('.slideshow').prepend(slide);
  slide.fadeIn('fast');
  slider = setInterval( "switchSlide()", 12000);
}