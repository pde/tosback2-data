jQuery(document).ready(function () {

    // Initialize Spotlight Control
    if (jQuery('#home-featured').length > 0) {
        jQuery().homeFeature();
    }

    // Initialize Horizontal Slider Control
    if (jQuery('div.carousel div.panel').length == 1) {
        jQuery().slider({
            holder: jQuery('div.carousel div.panel'),
            btnNextStr: "btn-next",
            btnPrevStr: "btn-previous",
            numItems: jQuery('div.carousel div.panel > .box').length,
            moveVal: jQuery('div.carousel div.panel > .box').outerWidth(true),
            numItemsVisible: 4,
            swapFeature: true,
            swapHolder: jQuery('.spotlight2'),
            swapHolderItemClass: ".spotlight-item",
            itemClass: "div.carousel div.panel > .box",
            autoRotate: true,
            autoRotateSpeed: 8000
        });
    }

    // Initialize Vertical Slider Control
    if (jQuery('div.scroll ul.features-link').length == 1) {
        jQuery().slider({
            direction: "vert",
            holder: jQuery('.features-link'),
            btnNextStr: "btn-arrowDown",
            btnPrevStr: "btn-arrowUp",
            numItems: jQuery('.features-link > li').length,
            moveItem: "li",
            numItemsVisible: 5,
            swapFeature: true,
            swapHolder: jQuery('.scroll-features'),
            swapHolderItemClass: ".scroll-item",
            itemClass: ".features-link > li",
            autoRotate: true,
            autoRotateSpeed: 10000
        });
    }
});