/* Promo scroll globals*/
// autoScrollTime is millesecond delay between promo slide auto-animation
var autoScrollTime = 6000;
var animationTime = 1000;
var curIndex = 0;
var inClick = false;
var promoPos = ["0px", "-310px", "-620px", "-930px"];

$(document).ready(function () {
    $('.promocontrolsingle').click(function () {
        curIndex = this.id.substr(this.id.length - 1, 1);
        $('.promo_scroll').css('left', promoPos[curIndex - 1]);
        var promoId = '#promocontrol' + curIndex;
        setControls(promoId);
        setTimeout('endClick()', autoScrollTime * 2);
        inClick = true;
    });

    var aniPromo = function () {

        curIndex = (curIndex + 1) % 4;
        var newIndex = curIndex + 1;
        var promoId = '#promocontrol' + newIndex;

        $('.promo_scroll').animate({
            left: promoPos[curIndex]
        }, animationTime, setControls(promoId));
    };

    var setControls = function (promoId) {
        $(promoId).siblings().removeClass('conon');
        $(promoId).siblings().addClass('conoff');
        $(promoId).removeClass('conoff');
        $(promoId).addClass("conon");
        $(promoId).siblings().attr('title', 'Click to View Promotion');
        $(promoId).attr('title', '');
    };

    var endClick = function () {
        inClick = false;
    };

    var stopAni = function () {
        //alert('stopani');
        inClick = true;
    };

    var restartAni = function () {
        //alert('restartani');
        setTimeout('endClick()', autoScrollTime);
    };

    var autoBot = function() {

        if (!inClick) {
            aniPromo();
        }
        setTimeout(autoBot, autoScrollTime);
    };

    setTimeout(autoBot, autoScrollTime);

});