/*
	sb.googleAutocomplete is a facade for instantiating google autocomplete on
	the utility search input, using jqueru ui's autocomplete widget.

	Test partner/engine ids:
		en-CA Search engine unique ID:	015296957820465757838:sehukvapxpy
		fr-CA Search engine unique ID:	015296957820465757838:awqdhqvdzf4
		en-US Search engine unique ID:	015296957820465757838:whakofqfgxi 
		sample: 	017769575368669631555:c2qwdkjaxqq
*/

sb.googleAutocomplete = (function($){
	return {
		
		init: function(engineId, language){
			// instantite a jquery ui autocomplete instance on the utility search.
			$('#searchbox').autocomplete({
				source: function( request, response ) {
					$.ajax({
						url: "http://clients1.google.com/complete/search",
						dataType: "jsonp",
						data: {
							style: "basic",
							maxRows: 12,
							q: request.term,
							hl: language,
							//hl: sb.i18n.culture.toISOString(),
							client: "partner",
							"source": "gcsc",
							partnerid: engineId,
							ds:"cse"
						},
						success: function( data ) {
							sb.console.log('autocompletions', data[1]);
							response(data[1].map(function(v,i,a){ return v[0];}));
						}
					});
				},

				select: function( event, ui ) {
					if(ui.item){
					    $(this).val(ui.item.value);
						$(this).closest('form').submit();
					}
				}
			});
		}
	};
})(jQuery);