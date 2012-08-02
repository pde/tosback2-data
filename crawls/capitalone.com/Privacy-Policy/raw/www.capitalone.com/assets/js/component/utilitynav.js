// Adds the class "last" to the last item in the
// utility links to remove the right border
$(document).ready(function(){
        $('#utility-links li:last').addClass('last');
});
$.elReady("ul#utility-links li.print a",function(){
        $(this).click(function(){window.print();});
});