jQuery.fn.paginate = function(settings) {
	
	var page = this;
		
	this.list = this.iterate(settings);
	
	this.settings = jQuery.extend({
		pageSize: 5,
		startPage: 1,
		navDiv: 'div.module_head'
		/*nextPageBtn: '.nextPageBtn',
		prevPageBtn: '.prevPageBtn'*/
	}, settings); 
	
	this.curPage = this.settings.startPage;
	this.numPages = Math.ceil(this.list.items.size() / this.settings.pageSize);
	
	this.onPage = null;
	this.offPage = null;
	
	/*jQuery(this.settings.nextPageBtn).click(
		function() { 
			page.nextPage();
		}
	);
	
	jQuery(this.settings.prevPageBtn).click(
		function() { 
			page.prevPage();
		}
	);*/
	
	this.hideItems = function(start, end) {
		while(this.list.valid()) {
			if(this.list.key() >= start && this.list.key() <= end) {
				this.list.currentItem().addClass('hidden');
			}
			
			this.list.counter = this.list.counter + 1;
		}
		
		this.list.rewind();
	}
	
	this.showItems = function(start, end) {
		var count = start;
		while(count <= end) {
			jQuery(this.list.items[count]).removeClass('hidden');
			count = count +1;
		}
	}
		
	this.gotoPage = function(pageNum) {
		var navElements = $(this.settings.id+' div.browse_tab_nav ul li.navRadio');
		var newNavElementNum = pageNum-1;
		
		navElements.each(function() {
			$(this).children('a').removeClass('selected');			 
		});
		
		$(navElements[newNavElementNum]).children('a').addClass('selected');
		
		if(pageNum <= this.numPages) {
			if(this.offPage) {
				this.offPage(this.curPage);	
			}
			
			this.list.items.removeClass('selected');
			
			this.list.items.addClass('hidden');
			this.curPage = pageNum;
			
			pageNum = pageNum - 1
					
			this.showItems(pageNum * this.settings.pageSize, ((pageNum * this.settings.pageSize) + this.settings.pageSize -1));

			if(this.onPage) {
				this.onPage(this.curPage);	
			}
		}
		
		this.list.children('li:not(.hidden):first').addClass('first');
		this.list.children('li:not(.hidden):last').addClass('last');
	}
	
	this.nextPage = function() {
		if(this.curPage < this.numPages) {
			this.gotoPage(this.curPage + 1);
			return true;
		} else {
			return false;	
		}
	}
	
	this.prevPage = function() {
		if(this.curPage > 1) {
			this.gotoPage(this.curPage - 1);	
			return true;
		} else {
			return false;
		}
	}

	//this.gotoPage(this.settings.startPage);
	
	return this;
}