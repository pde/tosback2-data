var floatingMenuId = 'floatdiv';
var floatingMenu =
{
    //Set Position
    //Upper Right
    //targetX: -250,
    //targetY: 10,

    //Bottom Right
    targetX: -125,
    targetY: -125,

    hasInner: typeof (window.innerWidth) == 'number',
    hasElement: typeof (document.documentElement) == 'object'
        && typeof (document.documentElement.clientWidth) == 'number',

    menu:
        document.getElementById
        ? document.getElementById(floatingMenuId)
        : document.all
          ? document.all[floatingMenuId]
          : document.layers[floatingMenuId]
};

floatingMenu.move = function() {
    floatingMenu.menu.style.left = floatingMenu.nextX + 'px';
    floatingMenu.menu.style.top = floatingMenu.nextY + 'px';
}

floatingMenu.computeShifts = function() {
    var de = document.documentElement;

    floatingMenu.shiftX =
        floatingMenu.hasInner
        ? pageXOffset
        : floatingMenu.hasElement
          ? de.scrollLeft
          : document.body.scrollLeft;
    if (floatingMenu.targetX < 0) {
        floatingMenu.shiftX +=
            floatingMenu.hasElement
            ? de.clientWidth
            : document.body.clientWidth;
    }

    floatingMenu.shiftY =
        floatingMenu.hasInner
        ? pageYOffset
        : floatingMenu.hasElement
          ? de.scrollTop
          : document.body.scrollTop;
    if (floatingMenu.targetY < 0) {
        if (floatingMenu.hasElement && floatingMenu.hasInner) {
            // Handle Opera 8 problems   
            floatingMenu.shiftY +=
                de.clientHeight > window.innerHeight
                ? window.innerHeight
                : de.clientHeight
        }
        else {
            floatingMenu.shiftY +=
                floatingMenu.hasElement
                ? de.clientHeight
                : document.body.clientHeight;
        }
    }
}

floatingMenu.calculateCornerX = function() {
    if (floatingMenu.targetX != 'center')
        return floatingMenu.shiftX + floatingMenu.targetX;

    var width = parseInt(floatingMenu.menu.offsetWidth);

    var cornerX =
        floatingMenu.hasElement
        ? (floatingMenu.hasInner
           ? pageXOffset
           : document.documentElement.scrollLeft) +
          (document.documentElement.clientWidth - width) / 2
        : document.body.scrollLeft +
          (document.body.clientWidth - width) / 2;
    return cornerX;
};

floatingMenu.calculateCornerY = function() {
    if (floatingMenu.targetY != 'center')
        return floatingMenu.shiftY + floatingMenu.targetY;

    var height = parseInt(floatingMenu.menu.offsetHeight);

    // Handle Opera 8 problems   
    var clientHeight =
        floatingMenu.hasElement && floatingMenu.hasInner
        && document.documentElement.clientHeight
            > window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight

    var cornerY =
        floatingMenu.hasElement
        ? (floatingMenu.hasInner
           ? pageYOffset
           : document.documentElement.scrollTop) +
          (clientHeight - height) / 2
        : document.body.scrollTop +
          (document.body.clientHeight - height) / 2;
    return cornerY;
};

floatingMenu.doFloat = function() {
    // Check if reference to menu was lost due   
    // to ajax manipuations   
    if (!floatingMenu.menu) {
        menu = document.getElementById
            ? document.getElementById(floatingMenuId)
            : document.all
              ? document.all[floatingMenuId]
              : document.layers[floatingMenuId];

        initSecondary();
    }

    var stepX, stepY;

    floatingMenu.computeShifts();

    var cornerX = floatingMenu.calculateCornerX();

    var stepX = (cornerX - floatingMenu.nextX) * .5;
    if (Math.abs(stepX) < .5) {
        stepX = cornerX - floatingMenu.nextX;
    }

    var cornerY = floatingMenu.calculateCornerY();

    var stepY = (cornerY - floatingMenu.nextY) * .5;
    if (Math.abs(stepY) < .5) {
        stepY = cornerY - floatingMenu.nextY;
    }

    if (Math.abs(stepX) > 0 ||
        Math.abs(stepY) > 0) {
        floatingMenu.nextX += stepX;
        floatingMenu.nextY += stepY;
        floatingMenu.move();
    }

    setTimeout('floatingMenu.doFloat()', 20);
};

// addEvent designed by Aaron Moore   
floatingMenu.addEvent = function(element, listener, handler) {
    if (typeof element[listener] != 'function' ||
       typeof element[listener + '_num'] == 'undefined') {
        element[listener + '_num'] = 0;
        if (typeof element[listener] == 'function') {
            element[listener + 0] = element[listener];
            element[listener + '_num']++;
        }
        element[listener] = function(e) {
            var r = true;
            e = (e) ? e : window.event;
            for (var i = element[listener + '_num'] - 1; i >= 0; i--) {
                if (element[listener + i](e) == false)
                    r = false;
            }
            return r;
        }
    }

    //if handler is not already stored, assign it   
    for (var i = 0; i < element[listener + '_num']; i++)
        if (element[listener + i] == handler)
        return;
    element[listener + element[listener + '_num']] = handler;
    element[listener + '_num']++;
};

floatingMenu.init = function() {
    floatingMenu.initSecondary();
    floatingMenu.doFloat();
};

// Some browsers init scrollbars only after   
// full document load.   
floatingMenu.initSecondary = function() {
    floatingMenu.computeShifts();
    floatingMenu.nextX = floatingMenu.calculateCornerX();
    floatingMenu.nextY = floatingMenu.calculateCornerY();
    floatingMenu.move();
}

if (document.layers)
    floatingMenu.addEvent(window, 'onload', floatingMenu.init);
else {
    floatingMenu.init();
    floatingMenu.addEvent(window, 'onload',
        floatingMenu.initSecondary);
}   
