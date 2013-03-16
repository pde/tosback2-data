// Javascript to toggle the dropdowns
$(document).ready(function(){
  // Dropdowns
  $("body").bind("click", function(e) {
    $("ul.menu-dropdown").hide();
    $('a.menu').parent("li").removeClass("open").children("ul.menu-dropdown").hide();
  });
  $("a.menu").click(function() {
    if ($(this).parent("li").hasClass("open")) {
      $(this).parent("li").removeClass("open");
      $(this).siblings("ul.menu-dropdown").hide();
    } else {
      $(this).parent("li").addClass("open");
      $(this).siblings("ul.menu-dropdown").show();
    }
    $(this).parent("li").siblings("li").children("ul.menu-dropdown").hide();
    $(this).parent("li").siblings("li").removeClass("open");
    return false;
  });
});