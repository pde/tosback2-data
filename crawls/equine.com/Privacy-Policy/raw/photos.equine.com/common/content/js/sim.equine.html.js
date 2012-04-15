// A series of HTML Helpers, for client-side post-processing

jQuery.fn.roundedBox = function(width, cls, marginTop) {
    var top = '<div style="margin-top: 0px; height: 7px;" class=""><div class="results bg3 box_t_l"/><div style="width: 597px;" class="results bg3 box_t_m"/><div class="results bg3 box_t_r"/><div class="clear"/></div>';
    var bottom = '<div style="height: 7px;" class=""><div class="results bg3 box_b_l"/><div style="width: 597px;" class="results bg3 box_b_m"/><div class="results bg3 box_b_r"/><div class="clear"/></div>';
    var content = '<div style="padding: 0px; width: 609px;" class="results bg3 bd2 bd_no_t bd_no_b box_top"></div>';
    $(this).each(function() {
        // for each matching element
        $(this).wrap(top + content + bottom);
    });
}

jQuery.fn.roundedBoxContent = function(cls, style) {
    var top = '<div style="' + style + '" class="' + cls + '"></div>';
    $(this).wrapAll(top);
}

jQuery.fn.center = function()
{
    this.css("position", "absolute");
    this.css("top", (f_clientHeight() - this.height()) / 2 + f_scrollTop() + "px");
    this.css("left", (f_clientWidth() - this.width()) / 2 + f_scrollLeft() + "px");
    return this;
}

// f_clientWidth, f_clientHeight, f_scrollLeft, f_scrollTop and f_filterResults were found online by a very well written article
// http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
// -Nathan
function f_clientWidth()
{
    return f_filterResults(
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}
function f_clientHeight()
{
    return f_filterResults(
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}
function f_scrollLeft()
{
    return f_filterResults(
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop()
{
    return f_filterResults(
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body)
{
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}