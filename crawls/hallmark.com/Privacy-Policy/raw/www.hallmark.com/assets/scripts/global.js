/* ---------------------------------------------------------------------
 Global JavaScript & jQuery

 Target Browsers: All
 Authors: Angela N
 ------------------------------------------------------------------------ */
require(
    [
        'jquery',
        'assets/scripts/presenters/Header',
        'assets/scripts/presenters/ScrollTop',
        'assets/scripts/presenters/MyHallmark',
        'assets/scripts/presenters/modals/ModalBuilder',
        'assets/scripts/presenters/modals/ModalSecondaryBuilder'
    ],
    function ($, Header, ScrollTop, MyHallmark, ModalBuilder, ModalSecondaryBuilder) {
        "use strict";
        $(function () {

            var header = new Header();
            var myHallmark = new MyHallmark();

            if ($('.back-to-top').length !== 0) {
                var backToTop = new ScrollTop();
            }
            var ModalSecondarySelector = '#js-modal-container[data-modal-persistence] a[data-modal-type]';
            var modalSelector = 'a[data-modal-type]:not(' + ModalSecondarySelector + ')';
            // get all of the modal links on the page
            var myModalLinks = $(modalSelector);

            // iterate over each result, instantiating modal links appropriately
            if (myModalLinks.length !== 0) {
                var self = this;

                var myModals = new ModalBuilder();
                myModals.bind(modalSelector);

                var secondaryBuilder = new ModalSecondaryBuilder();
                secondaryBuilder.bind(ModalSecondarySelector);
            }
        });

    }
);


