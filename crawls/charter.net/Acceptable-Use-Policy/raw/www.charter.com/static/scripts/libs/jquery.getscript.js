(function($) {
	$.fn.script = function(options) {
		var domArray = this.get();
		var script = "<script language=\"JavaScript\" type=\"text/javascript\">"
		for(var i = 0; i < domArray.length; i++)
		{
			var domE = domArray[i];
			if(domE.tagName == "SCRIPT")
			{
				var $domE = $(domE);
				var src = $domE.attr("src");
				if(src != null && src != "")
				{
					$.getScript(src);
				}else{
					script += $domE.html();
				}
			}
		}
		script += "</script>";
		return script;
	}
})(jQuery);
