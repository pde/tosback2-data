(function($){
  var templateCache = {};
  $.fn.template = function tmpl(template, data){
    return this.html($.template(template, data)); 
  }
  $.template = function tmpl(template, data){
  	try {
    var fn = !/\W/.test(template) ?
      templateCache[template] = templateCache[template] ||
        tmpl(document.getElementById(template).innerHTML) :
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        template
          .replace(/[\r\t\n]/g, "")
          .split("[!").join("\t")
          .replace(/((^|!\])[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)!\]/g, "',$1,'")
          .split("\t").join("');")
          .split("!]").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    return data ? fn( data ) : fn;
	  } catch (e) {
		 //in case the template script is not in the output, we don't want all js execution to stop 
	  }
  };
})(jQuery);

