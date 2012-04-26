$(document).ready(function () {
    // add a click handler to all links 
    // that point to same-page targets (href="#...")        
    $("a[href^='#main-content']").click(function () {
        // get the href attribute of the internal link
        // then strip the first character off it (#)
        // leaving the corresponding id attribute
        $("#" + $(this).attr("href").slice(1) + "")
        // give that id focus (for browsers that didn't already do so)
        .focus()
    });
});