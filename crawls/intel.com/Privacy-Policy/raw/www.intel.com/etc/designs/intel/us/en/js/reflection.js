/*!
	reflection.js for jQuery v1.03
	(c) 2006-2009 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/

(function ($) {

    $.fn.extend({
        reflect: function (options) {
            options = $.extend({
                height: 1 / 3,
                opacity: 0.1,
                gap: 1,
                border: 0
            }, options);

            return this.unreflect().each(function () {
                var img = this;
                if (/^img$/i.test(img.tagName)) {
                    function doReflect() {
                        var imageWidth = img.width, imageHeight = img.height, reflection, reflectionHeight, wrapper, context, gradient;
                        reflectionHeight = Math.floor((options.height > 1) ? Math.min(imageHeight, options.height) : imageHeight * options.height);

                        if ($.browser.msie) {
                            reflection = $("<img />").attr("src", img.src).css({
                                width: imageWidth,
                                height: imageHeight,
                                marginBottom: reflectionHeight - imageHeight,
                                marginTop: options.gap + 'px',
                                border: options.border + 'px',
                                filter: "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + (options.opacity * 100) + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + (reflectionHeight / imageHeight * 100) + ")"
                            })[0];
                        } else {
                            reflection = $("<canvas />")[0];
                            if (!reflection.getContext) return;
                            context = reflection.getContext("2d");
                            try {
                                $(reflection).attr({ width: imageWidth, height: reflectionHeight });
                                $(reflection).css('marginTop', options.gap + 'px');
                                context.save();
                                context.translate(0, imageHeight - 1);
                                context.scale(1, -1);
                                context.drawImage(img, 0, 0, imageWidth, imageHeight);
                                context.restore();
                                context.globalCompositeOperation = "destination-out";

                                gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
                                gradient.addColorStop(0, "rgba(255, 255, 255, " + (1 - options.opacity) + ")");
                                gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
                                context.fillStyle = gradient;
                                context.rect(0, 0, imageWidth, reflectionHeight);
                                context.fill();
                            } catch (e) {
                                return;
                            }
                        }
                        $(reflection).css({ float: 'left',display: "block", border: 0 , 'left': options.border+'px','position':'relative'});

                        var isLink = /^a$/i.test(img.parentNode.tagName);
                        wrapper = $(isLink ? "<span />" : "<div />").insertAfter(img).append(
                            $(isLink ? "<span />" : "<div />").css({float: 'left','border': options.border + 'px solid black','padding':'0px','margin':'0px'}).addClass('img-box').append(img)).append(reflection)[0];
                        wrapper.className = img.className;
                        $.data(img, "reflected", wrapper.style.cssText = img.style.cssText);
                        $(wrapper).css({ margin: '0 auto', width: imageWidth + 2 * options.border, height: imageHeight + reflectionHeight + 2 * options.border, overflow: "hidden" }).addClass('img-wrapper');
                        img.style.cssText = "display: block; border: 0px";
                        img.className = "reflected";
                    }

                    if (img.complete) doReflect();
                    else $(img).load(doReflect);
                }
            });
        },

        unreflect: function () {
            return this.unbind("load").each(function () {
                var img = this, reflected = $.data(this, "reflected"), wrapper;

                if (reflected !== undefined) {
                    wrapper = img.parentNode.parentNode;
                    img.className = wrapper.className;
                    img.style.cssText = reflected;
                    $.removeData(img, "reflected");
                    wrapper.parentNode.replaceChild(img, wrapper);
                }
            });
        }
    });

})(jQuery);