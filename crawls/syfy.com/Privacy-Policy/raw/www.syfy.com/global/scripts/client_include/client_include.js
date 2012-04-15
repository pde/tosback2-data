(function(jqN) {
	var targets = Array();
	
	jqN.fn.clientInclude = function(hostname,path) {
		this.each(function() {
			targets[path] = Array();
			targets[path].push(this);
		});

		var ci_url = 'http://'+hostname+'/jsonp_bridge.php';
	
		jqN.get(ci_url,{path:path},function(d) {
			for (i=0; i < targets[d.path].length; i++) {
				var target = targets[d.path][i];
				jqN(target).html(d.content);
			}
		},'jsonp');
	};
})(jqN);
