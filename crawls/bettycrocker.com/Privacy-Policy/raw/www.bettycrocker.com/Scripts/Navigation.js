jQuery(document).ready(function () {
    var positionFlyout = function (li) {
        var flyout = li.find('.gn-flyout ul');
        var availableWidth = jQuery('#globalNavigation').width();
        var flyoutWidth = flyout.width() || availableWidth;

        var distanceToCenterOfLiFromLeft = li.position().left + li.width() / 2;
        var distanceToCenterOfLiFromRight = availableWidth - distanceToCenterOfLiFromLeft;

        var flyoutPositionFromLeft = distanceToCenterOfLiFromLeft - flyoutWidth / 2;
        var flyoutPositionFromRight = distanceToCenterOfLiFromRight - flyoutWidth / 2;

        // Enforce left bound
        flyoutPositionFromLeft = Math.max(flyoutPositionFromLeft, 0);
        flyoutPositionFromRight = Math.max(flyoutPositionFromRight, 0);

        // Enforce right bound
        flyoutPositionFromLeft = Math.min(flyoutPositionFromLeft, availableWidth - flyoutWidth);
        flyoutPositionFromRight = Math.min(flyoutPositionFromRight, availableWidth - flyoutWidth);

        if (flyoutPositionFromLeft < flyoutPositionFromRight) {
            flyout.css('left', flyoutPositionFromLeft + 'px');
            flyout.css('right', 'auto');
        }
        else {
            flyout.css('left', 'auto');
            flyout.css('right', flyoutPositionFromRight + 'px');
        }
    };

    var topLevelNavItems = jQuery('#globalNavigation > ul > li');

    // Add "selected" class on click on mobile/tablet instead of following link (since they can't hover)
    topLevelNavItems.click(function (event) {
        var isSeeAllLink = jQuery(event.target).closest('a').is('.gn-seeAllParent');

        var navItem = jQuery(event.target).closest('li');
        var navItemHasFlyout = navItem.find('.gn-flyout').length;

        var isTabletSize = document.documentElement.clientWidth > 767 && document.documentElement.clientWidth < 1000;

        if (!isSeeAllLink && navItemHasFlyout && isTabletSize) {
            event.preventDefault();
            var wasSelected = jQuery(this).hasClass('selected');
            topLevelNavItems.removeClass('selected');
            jQuery(this).toggleClass('selected', !wasSelected);
            positionFlyout(jQuery(this));
        }
    });

    // Recalculate the flyout position on hover
    topLevelNavItems.hover(function () {
        positionFlyout(jQuery(this));
    });

    // Close flyout if user clicks elsewhere on the page
    jQuery('body').click(function (e) {
        var isNavClick = jQuery(e.target).closest('#globalNavigation, .navToggle').length;
        if (!isNavClick) {
            topLevelNavItems.removeClass('selected'); // tablet
            jQuery('body').removeClass('navVisible'); // mobile
        }
    });

    // Move the "See All" links from the main bar into the flyout
    jQuery('.gn-seeAllParent').each(function () {
        var $this = jQuery(this);
        var currentText = $this.text();
        $this.text(currentText.replace('See All', 'All'));
        $this.closest('.gn-flyout').find('ul').prepend($this).show();
    });

    // Highlight the item for the current page
    jQuery('#globalNavigation').find('ul.globalNavigation > li > a').each(function () {
        var mainMenu = jQuery(this);
        var href = mainMenu.attr('href');
        if (document.location.pathname.indexOf(href) > -1) {
            mainMenu.addClass('active');
        }
    });

    // Make the navigation toggle button work for mobile
    jQuery('.navToggle').click(function (e) {
        e.preventDefault();
        jQuery('body').toggleClass('navVisible');
    });
});