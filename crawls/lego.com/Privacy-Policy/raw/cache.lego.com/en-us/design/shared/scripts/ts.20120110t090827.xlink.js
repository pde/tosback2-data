/*
    06-01-2012: Peter Kobel-Svenningsen
    Added Function so that 



*/ 

jQuery(document).ready(function () {
    AddXLinkClass();
});

function AddXLinkClass() {

    $("a[href*='LEGOXLinked']").each(function () {
        $(this).addClass("modalOverlayXLink");

        var pattern = /(\?|&)LEGOXLinked\=(.{38})/;
        var pageId = pattern.exec(this.href)[2];
        this.href = this.href.replace(/(\?|&)LEGOXLinked\=.{38}/, '');
        var thisHref = this.href;
        $(this).bind('click', function () {
            var href = thisHref.replace('http://', 'http%3A%2F%2F');
            var pos = href.indexOf('/');

            while (pos > 0) {
                href = href.replace('/', '%2F');
                pos = href.indexOf('/');
            }

            $.ghcolorbox({
                href: "Shared/Messages/XLink?pageid=" + pageId,
                iframe: true,
                width: 645,
                height: 450,
                speed: 450,
                transition: "elastic",
                overlayClose: false,
                initialWidth: 45,
                initialHeight: 30,
                opacity: 0.75
            });

            // To prevent link to be executed if modal window is closed.
            return false;
        });        
    });


    $("a[href*='#xlink']").each(function () {
        $(this).addClass("modalOverlayXLink");
        this.href = this.href.replace(/#xlink/, '');
        var thisHref = this.href;
        $(this).bind('click', function () {
            var href = thisHref.replace('http://', 'http%3A%2F%2F');
            var pos = href.indexOf('/');

            while (pos > 0) {
                href = href.replace('/', '%2F');
                pos = href.indexOf('/');
            }

            $.ghcolorbox({
                href: "Shared/Messages/XLink?url=" + href,
                iframe: true,
                width: 645,
                height: 450,
                speed: 450,
                transition: "elastic",
                overlayClose: false,
                initialWidth: 45,
                initialHeight: 30,
                opacity: 0.75
            });

            // To prevent link to be executed if modal window is closed.
            return false;
        });
    });
    
};
