
var watrack = {};
watrack.simpleCall = function(opts) {
  var url = "/track.txt";
  var src = window.location.pathname;
  var query = window.location.search;
  if (typeof query != "undefined" && query != "") src += query;
  var data = {};
  var tid = null;
  var target = null;
  var callback = null;
  var href = null;
  if (typeof opts != "undefined") {
    if (typeof opts.url != "undefined") url = opts.url;
    if (typeof opts.src != "undefined") src = opts.src;
    if (typeof opts.data != "undefined") data = opts.data;
    if (typeof opts.callback != "undefined") callback = opts.callback;
    if (typeof opts.tid != "undefined") tid = opts.tid;
    if (typeof opts.target != "undefined") target = opts.target;
    if (typeof opts.href != "undefined") href = opts.href;
  }
  var flatdata = data; 
  if (typeof flatdata.src == "undefined") flatdata.src = src;
  if (typeof flatdata.href == "undefined" && typeof href == "string") flatdata.href = href;
  if (typeof flatdata.tid == "undefined" && typeof tid == "string") flatdata.tid = tid;
  $.ajax({
    "method" : "GET",
    "url" : url, 
    "data" : flatdata, 
    "complete" : function(d,s){
      if (typeof callback == "string") {
        if (typeof target != "undefined") window.open(callback, target);
	else window.location.href = callback;
      } else if (typeof callback == "function") {
	callback();
      }
    }
  });
}

watrack.initDefaults = function() {

  $("a.track-me").live("click",function(e){
    var href = null;
    var thishref = $(this).get(0).href;
    if (typeof thishref != "undefined" && thishref != "" && thishref != "#") {
      href = thishref;
    } /*else {
      e.preventDefault();
    }*/
    watrack.simpleCall({
      "href" : href
    });
  });

}
