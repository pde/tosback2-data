$(document).ready(function () {

    if ($('#home-featured').length > 0) {
        $().homeFeature();
    }

    if ($('div.carousel div.panel').length == 1) {
        $().slider({
            holder: $('div.carousel div.panel'),
            btnNextStr: "btn-next",
            btnPrevStr: "btn-previous",
            numItems: $('div.carousel div.panel > .box').length,
            moveVal: $('div.carousel div.panel > .box').outerWidth(true),
            numItemsVisible: 4,
            swapFeature: true,
            swapHolder: $('.spotlight2'),
            swapHolderItemClass: ".spotlight-item",
            itemClass: "div.carousel div.panel > .box",
            autoRotate: true,
            autoRotateSpeed: 8000
        });
    }

    if ($('div.scroll ul.features-link').length == 1) {
        $().slider({
            direction: "vert",
            holder: $('.features-link'),
            btnNextStr: "btn-arrowDown",
            btnPrevStr: "btn-arrowUp",
            numItems: $('.features-link > li').length,
            moveItem: "li",
            numItemsVisible: 5,
            swapFeature: true,
            swapHolder: $('.scroll-features'),
            swapHolderItemClass: ".scroll-item",
            itemClass: ".features-link > li",
            autoRotate: true,
            autoRotateSpeed: 10000
        });
    }
});