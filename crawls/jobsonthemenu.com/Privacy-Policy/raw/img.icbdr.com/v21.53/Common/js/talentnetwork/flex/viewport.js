$(function () {
   UpdateViewportValue();
    //$(window).resize(UpdateViewportValue);
});

function UpdateViewportValue() {
    var meta = $('meta[name=viewport]');

    if (meta.length > 0) {
        if (window.innerWidth <= 600) {
            meta.attr('content', 'width=device-width, maximum-scale=1');
        }
        else {
            meta.attr('content', 'width=980');                   
        }
    }

//    if (window.innerWidth <= 600) {
//        if (meta.length == 0) {
//            $('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">').appendTo('head');
//        }
//    }
//    else
//        meta.remove()
}



