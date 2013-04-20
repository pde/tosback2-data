(function(j, global){

	if (typeof j.telligent === 'undefined')
		j.telligent = {};

	if (typeof j.telligent.evolution === 'undefined')
		j.telligent.evolution = {};

	if (typeof j.telligent.evolution.widgets === 'undefined')
		j.telligent.evolution.widgets = {};

	var _speed = 200,
		_locks = {},
		_processChildren = function(context, jQ)
		{
			jQ.find('.hierarchy-item.with-children a.internal-link.expand-collapse')
				.click(function()
				{
					var p = $(this).parent().parent();
					var c = p.children('.hierarchy-children');
					if (c && c.length > 0)
					{
						var img = p.find('a.internal-link.expand-collapse img:first');
						if (c.css('display') == 'none')
							c.slideDown(_speed, function() { img.attr('src', context.expandedUrl).attr('alt','-') });
						else
							c.slideUp(_speed, function() { img.attr('src', context.collapsedUrl).attr('alt','+') });
					}
					else
						_load(context, p);

					return false;
				});
		},
		_load = function(context, jQ)
		{
			var parentPageid = jQ.find('input').val();
			if (_locks[parentPageid])
				return;
			_locks[parentPageid] = true;
			j.telligent.evolution.get({
				url: context.pagesUrl,
				data: {w_wikiId: context.wikiId, w_parentPageid: parentPageid},
				success: function(response)
				{
					var pages = j(response);
					_processChildren(context, pages);
					pages
						.hide()
						.appendTo(jQ)
						.slideDown(_speed, function() { jQ.find('a.internal-link.expand-collapse img:first').attr('src', context.expandedUrl).attr('alt','-') });
					_locks[parentPageid] = false;
				}
			});
		};

	j.telligent.evolution.widgets.wikiPageHierarchy = {
		register: function(context) {
			_processChildren(context, context.hierarchy);
		}
	};

})(jQuery, window);