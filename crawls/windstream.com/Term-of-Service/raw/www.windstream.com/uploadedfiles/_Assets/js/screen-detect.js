/* ---------- Screen Detector ---------- */

var userAgent = '';
if (navigator && navigator.userAgent) {
    userAgent = navigator.userAgent.toLowerCase();
}

/*
detectDeviceandSetViewport = (function() {
    //$viewport = $('meta[name="viewport"]'),

    if (detectAndroid) {
        //$viewport.attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes');
    }
    else if (detectAndroidPhone) {
        //$viewport.attr('content', 'width=device-width, initial-scale=0.67, maximum-scale=1.0, user-scalable=yes');
    }
    else if (detectIPhone) {
        //$viewport.attr('content', 'width=device-width, initial-scale=0.67, maximum-scale=1.0, user-scalable=no');
    }
}()); */

function detectAndroid() {
    if (userAgent.search('android') > -1) {
        return true;
    }
    else {
        return false;
    }
}

function detectAndroidPhone() {
    if (detectAndroid() && (userAgent.search('mobile') > -1)) {
        return true;
    }
    else {
        return false;
    }
}

function detectIPad() {
    if (userAgent.search('ipad') > -1) {
        return true;
    }
    else {
        return false;
    }
}

function detectIPhone() {
    if (userAgent.search('iphone') > -1) {
        if (detectIPad()) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

var layoutWidth = 1024,

addBodyClass = function (documentWidth) {
	var currentClass = document.body.className;
	var classes = currentClass.split(" ");
	for (var x = 0; x < classes.length; x++) {
		if (classes[x].indexOf("snap-") >= 0) {
			classes[x] = "snap-" + documentWidth;
			break;
		}
	}
	document.body.className = classes.join(" ");
	layoutWidth = documentWidth;
},

isHiResMobile = function () {
    if (typeof window.devicePixelRatio !== undefined) {
        return (window.devicePixelRatio >= 1.5);
    }
},

funcsToRefire = function () {
    promoBar320();
    supportTabSlide();
    supportTabWizard();
    mod1AHeader();
    mobileSlideMenu();
    mobileUtilityLocation();
    normalizePlanHeight(refire=true);
    mobileLogo();

    $('.mod-009').each(function () { mod9Height($(this)); });
    $('.mod-018').each(function () { modSlide($(this)); });
    $('.module-product-grid').find('.product-row').each(function () { electronicsHeight($(this)); });
    $('.bundlizer-hsi').each(function () { modSlide($(this)); });
    $('.bundlizer-tv').each(function () { modSlide($(this)); });
},

setViewport = function () {
    if (document.body.className.indexOf("modal") >= 0)
        return;

    var viewportWidth;

    if (typeof window.innerWidth != 'undefined') {
        viewportWidth = window.innerWidth;
    }
    else {
        viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
    }

    if (isHiResMobile == true) {
        if (viewportWidth < 1024) {
            addBodyClass(320);
            funcsToRefire();

            if ( detectAndroidPhone() && detectAndroidPhone() ){
                $('body').addClass('android');
            }

            return;
        }
        else {
            addBodyClass(768);
            funcsToRefire();
            return;
        }
    } else {
        if (viewportWidth >= 1500) {
            addBodyClass(1600);
            funcsToRefire();
        }
        else if ((viewportWidth <= 1024) && (viewportWidth >= 768)) {
            addBodyClass(768);
            funcsToRefire();
        }
        else if (viewportWidth < 768) {
            addBodyClass(320);
            funcsToRefire();
            if ( detectAndroidPhone() && detectAndroidPhone() ){
                $('body').addClass('android');
            }
        }
        else {
            addBodyClass(1024);
            funcsToRefire();
        }
    }
};

// Init viewport
setViewport();

resizeTimer = false;
$(window).resize(function () {
	if(resizeTimer !== false) {
		clearTimeout(resizeTimer);
	}
	resizeTimer = setTimeout(setViewport, 300);
});


(function (win) {
    var doc = win.document;
    if (!location.hash && win.addEventListener) {

        //scroll to 1
        window.scrollTo(0, 1);
        var scrollTop = 1,
			getScrollTop = function () {
			    return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

        //reset to 0 on bodyready, if needed
			bodycheck = setInterval(function () {
			    if (doc.body) {
			        clearInterval(bodycheck);
			        scrollTop = getScrollTop();
			        win.scrollTo(0, scrollTop === 1 ? 0 : 1);
			    }
			}, 15);

        win.addEventListener("load", function () {
            setTimeout(function () {
                if (getScrollTop() < 20) {
                    //reset to hide addr bar at onload
                    win.scrollTo(0, scrollTop === 1 ? 0 : 1);
                }
            }, 0);
        });
    }
})(this);


if (navigator.userAgent.match(/iPhone/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
    document.body.addEventListener('gesturestart', function() {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}