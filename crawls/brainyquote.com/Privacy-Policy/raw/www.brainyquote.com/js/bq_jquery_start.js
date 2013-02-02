function searchResultsUpdated(){$("html, body").animate({scrollTop:0},"fast");}
function bqStickyCallback(data){if(BQ_MBL){if(data.show){$(".gsc-search-box").show();$("#bq-nav-below").show();}
else{$(".gsc-search-box").hide();$("#bq-nav-below").hide();}}}
$(window).load(function(){$("input.gsc-search-button").on('click',searchResultsUpdated);$('.gsc-input').keydown(function(e){var keycode=(e.keyCode?e.keyCode:e.which);if(keycode==13){searchResultsUpdated();}});});$(function(){$("#bq-nav-bar-wrapper").sticky({topSpacing:0});});