setTimeout('runRailAd()', 2000);

function runRailAd() {
    if ((typeof (railAdBg) != 'undefined') && (railAdBg)) {
        //get image dimensions
        var img = new Image(),
            imgHt, imgWth;
        img.onload = function () {
            imgWth = this.width;
            imgHt = this.height;
            // site specific custom background code.
            if (NBC('#site').length) {
                NBC('#site').css({
                    'background-image': 'url(' + railAdBg + ')',
                    'background-position': 'center top',
                    '-webkit-background-size': imgWth + 'px ' + imgHt + 'px'
                });
            } else {
                NBC('body').css({
                    'background-image': 'url(' + railAdBg + ')',
                    'background-position': 'center top',
                    '-webkit-background-size': imgWth + 'px ' + imgHt + 'px'
                });
            }
        };
        img.src = railAdBg;
    }
    if ((typeof (railAdBgColor) != 'undefined') && (railAdBgColor)) {
        // site specific custom background color code.
        if (NBC('#site').length) {
            NBC('#site').css({
                'background-color': '#' + railAdBgColor.replace(/#/, '')
            });
            NBC('#site-header, #show-header').css({
                'z-index': '1'
            });
        } else {
            NBC('body').css({
                'background-color': '#' + railAdBgColor.replace(/#/, '')
            });
        }
    }
    if ((typeof (railAdBgRepeat) != 'undefined') && (railAdBgRepeat)) {
        // site specific custom background repeat code.
        NBC('body').css({
            'background-repeat': railAdBgRepeat
        });
    } else {
        //NBC('body').css({'background-repeat':'no-repeat!important'}); //was this originally, threw a js error.
        //  NBC('body').css({'background-repeat':'no-repeat'});
    }

    if ((typeof (railAdBgClickthru) != 'undefined') && (railAdBgClickthru)) {

        if (NBC('body').attr('id') == '') {
            NBC('body').attr('id', 'railAdBody');
        }

        NBC('body').click(function (e) {
            evt = e || window.event;
            if (e.target) {
                targ = e.target;
            } else if (e.srcElement) {
                targ = e.srcElement;
            }
            //alert(targ.id);
            if (targ.nodeType == 3) // Safari bug
            targ = targ.parentNode;

            if (targ.id.toLowerCase() == 'container' || (targ.id == NBC('body').attr('id')) || (targ.id == 'site')) {
                window.open(railAdBgClickthru);
            }
        });
    }
}
/* OPA */
NBC('.ad728x90').parent().show();
var adWidth = NBC('.ad728x90 object').width() || NBC('.ad728x90 swf').width() || NBC('.ad728x90 img').width() || NBC('.ad728x90 div').width() || NBC('.ad728x90 table').width();
if (adWidth == 970) {
    NBC('.ad728x90').parent().height("auto");
}
