
(function($) {
	$.extend({
		
		tablesorterPager: new function() {
			
			function updatePageDisplay(c) {
				var s = $('.pagedisplay').val("Page : "+(c.page+1) + c.seperator + c.totalPages);
				 
				 
				 
			}
			 
				
				
			
			function setPageSize(table,size,cc) {
				
				if(isNaN(size)) {
					$('.firstTT,.next,.previous,.lastTT').hide();
					//c.size = c.TMPvar;
				} else {
					//c.TMPvar = c.size	
					$('.firstTT,.next,.previous,.lastTT').show();
				}
				if(size==undefined || size==null || size=='' || isNaN(size))
				{
					size=cc;
				}
				var c = table.config;
				c.size = size;
				
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				c.pagerPositionSet = false;
				moveToPage(table);
				//fixPosition(table);
			}
			
			function fixPosition(table) { 
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) { 
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {  
				var cc=$(table).find('tr').size();
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
					
				}
				
				//fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				
				 
				//alert(c.totalPages)
				//c.seperator + c.totalPages
				updatePageDisplay(c);
				return rows;
			}
			var doc=222;
			this.appender = function(table,rows) { 
				
				var c = table.config;
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				
				if(isNaN(c.size)) {
					c.size = c.zerosize;
				} else {
					c.zerosize = c.size	
				}				
				
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				 

				doc=renderTable(table,rows);
			};
			
			this.defaults = {
				size: 2,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.previous',
				cssFirst: '.firstTT',
				cssLast: '.lastTT',
				cssPageDisplay: '.pagedisplay',
				cssPageSize: '.pagesize',
				seperator: "/",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) { 
				return this.each(function() {	
					var dd=parseInt($(".pagesize",pager).val());
					if(isNaN(dd) || dd==undefined || dd==null)
					{
						$.tablesorterPager.defaults.size=$(table).find('tr').size();
						$('.firstTT,.next,.previous,.lastTT').hide();
					}
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					
					$(config.cssPageSize,pager).change(function() {
													
						setPageSize(table,parseInt($(this).val()),doc.length);
						return false;
					});
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({ 
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);				