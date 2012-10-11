$(document).ready(function () {

    $(".toggle .invisi").prepend("<p><a href='#toggle'>Click to view this section in upper case</a></p>");
    $(".toggle .visi").prepend("<p><a href='#toggle'>Click to view this section in lower case</a></p>");

    $(".toggle").click(function () {
        $(this).children("div").toggleClass("visi invisi");
    });
});

