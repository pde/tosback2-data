//top nav
$(".main-nav a, .slide-menu ul a, .mobile-main-nav a").click(function () {
    var text = $(this).text().trim();
    if ($(this).closest(".sub-nav").length > 0)
        text = $(this).closest(".sub-nav").siblings("a").text().trim() + ":" + text;
    trackClick("Top Nav:" + text);
});

//footer
$(".footer a").click(function () {
    trackClick("Footer:" + $(this).text().trim());
});

//mod 1
$(".mod-001 a").click(function () {
    trackClick("Body:" + $(this).closest(".slide").children("h2").text().trim() + ":" + $(this).text().trim());
});

$(".mod-001a a").click(function () {
    trackClick("Body:" + $(this).closest(".top-container").children(".first").children("h2").text().trim() + ":" + $(this).text().trim());
});

//mod 3
$(".mod-003 a").click(function () {
    trackClick("Body:" + $(this).closest(".product-row").children("h2").text().trim() + ":" + $(this).text().trim());
});

//mod 5
$(".mod-005 a").click(function () {
    trackClick("Body:" + $(this).parent().children("p").text().trim() + ":" + $(this).text().trim());
});

//mod 8
$(".mod-008 .location a").click(function () {
    trackClick("Body:" + $(this).closest(".mod-content").children("h2").text().trim() + ":" + $(this).text().trim());
});

$(".mod-008 .column a").click(function () {
    trackClick("Body:" + $(this).closest(".column").children(".resolution-big").children("h2").text().trim() + ":" + $(this).text().trim());
});

//mod 9
$(".mod-009 a").click(function () {
    trackClick("Body:" + $(this).closest(".mod-009").children(".first").children("h2").text().trim() + ":" + $(this).text().trim());
});

//mod 10
$(".mod-010-wide a").click(function () {
    trackClick("Body:" + $(this).closest(".mod-010-wide").children("h2").text().trim() + ":" + $(this).text().trim());
});

$(".mod-010-split a").click(function () {
    trackClick("Body:" + $(this).closest(".showcase").children("h3").text().trim() + ":" + $(this).text().trim());
});

//mod 11
$(".mod-011 a").click(function () {
    trackClick("Body:" + $(this).closest(".mod-content").children("h2").text().trim() + ":" + $(this).text().trim());
});

//mod 12
$(".mod-012 a").click(function () {
    trackClick("Body:" + $(this).siblings("h3").text().trim() + ":" + $(this).text().trim());
});

//mod 14
$(".mod-014 a").click(function () {
    trackClick("Tab:" + $(this).closest(".mod-014").siblings(".electronics-nav").find("a[class~='current']").text().trim() + ":" + $(this).text().trim());
});

//mod 20
$(".mod-020 a").click(function () {
    trackClick("Body:" + $(this).attr("title"));
});

//option listing
$(".module-option a").click(function () {
    trackClick("Body:" + $(this).closest(".module-option").children("h1").text().trim() + ":" + $(this).text().trim());
});

//modal
$(".mod-modal a").click(function () {
    trackClick("Body:" + $(this).closest(".wrapper").children("h2").text().trim() + ":" + $(this).text().trim());
});

//product category listing
$(".product-row a").click(function () {
    trackClick("Body:" + $(this).closest(".product-row").children("h2").text().trim() + ":" + $(this).text().trim());
});

//product detail
$(".product-modal a").click(function () {
    trackClick("Body:" + $(this).closest(".product-modal").children("h1").text().trim() + ":" + $(this).text().trim());
});

//support header
$(".support-header a").click(function () {
    trackClick("Tab:" + $(this).closest(".support-header").siblings(".support-nav").find("a[class~='current']").text().trim() + ":" + $(this).text().trim());
});

//support, left rail tracking in /usercontrols/leftrailcallout.ascx
$(".agent").click(function () {
    trackClick("Body:" + $(this).text().trim());
});

$(".tab-navigation a").click(function () {
    trackClick("Body:Tab:" + $(this).text().trim());
});

//shopping cart selections
$(".save-cart, .cart-link, .cart-buttons a").click(function () {
    trackClick("Body:" + $(this).text().trim());
});

//shopping cart bundlizer

//shopping cart customize

//shopping cart your infromation

//shopping cart submit order

//shopping cart confirmation