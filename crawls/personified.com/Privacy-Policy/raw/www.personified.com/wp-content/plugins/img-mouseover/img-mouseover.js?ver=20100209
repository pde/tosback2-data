jQuery(document).ready(function($) { /* document.ready */
	$('img.mouseover').each(function() {
		// {{{ - switchMouseover(link)
		this.switchMouseover = function(link) {
			if (this.linkSelected) {
				if (this.linkSelected == link) {
					// restore original value {{{
					this.src = this.originalObj.src;
					this.outSrc = this.originalObj.outSrc;
					this.title = this.originalObj.title;
					this.overImg = this.originalObj.overImg;
					this.clickImg = this.originalObj.clickImg;
					this.linkSelected = null;
					// }}}
					return false;
				} else {
					$(this.linkSelected).removeClass('selected');
				}
			} else {
				// save original value {{{
				this.originalObj = {
					src: this.src,
					outSrc: this.src,
					title: this.title,
					overImg: this.overImg,
					clickImg: this.clickImg
					};
				// }}}
			}
			this.linkSelected = link;
			var attr = link.getAttribute('data-src');
			if (!attr) { attr = link.getAttribute('src'); }
			if (attr) {
				this.src = attr;
				this.outSrc = attr;
			}
			var attr = link.getAttribute('title');
			if (attr) {
				this.title = attr;
			}
			var attr = link.getAttribute('data-oversrc');
			if (!attr) { attr = link.getAttribute('oversrc'); }
			if (attr) {
				this.overImg = new Image();
				this.overImg.src = attr;
			} else {
				this.overImg = null;
			}
			var attr = link.getAttribute('data-clicksrc');
			if (!attr) { attr = link.getAttribute('clicksrc'); }
			if (attr) {
				this.clickImg = new Image();
				this.clickImg.src = attr;
			} else {
				this.clickImg = null;
			}
			return true;
		};
		// }}}
		// preload mouseover images{{{
		var img_url = this.getAttribute('data-oversrc');
		if (!img_url) { img_url = this.getAttribute('oversrc'); }
		if (img_url) {
			// preload image
			this.overImg = new Image();
			this.overImg.src = img_url;
		}
		var click_img_url = this.getAttribute('data-clicksrc');
		if (!click_img_url) { click_img_url = this.getAttribute('clicksrc'); }
		if (click_img_url) {
			this.clickImg = new Image();
			this.clickImg.src = click_img_url;
		}
		// cache values
		this.noresize = (this.getAttribute('data-noresize'));
		if (!this.noresize) { this.noresize = this.getAttribute('noresize'); }
		this.outSrc = this.src;
		this.outWidth = this.width;
		this.outHeight = this.height;
		// }}}
	}).mouseover(function() {
		// handle mouseover {{{
		if (!this.overImg) { return; }
		this.src = this.overImg.src;
		if (!this.noresize) { return; }
		this.width = this.overImg.width;
		this.height = this.overImg.height;
		// }}}
	}).mouseout(function() {
		// handle mouseout {{{
		if (!this.overImg) { return; }
		this.src = this.outSrc;
		if (!this.noresize) { return; }
		this.width = this.outWidth;
		this.height = this.outHeight;
		// }}}
	}).click(function() {
		// handle onclick {{{
		if (!this.clickImg) { return true; }
		this.src = this.clickImg.src;
		if (!this.noresize) { return; }
		this.width = this.clickImg.width;
		this.height = this.clickImg.height;
		return false;
		// }}}
	});
	$('a.mouseover').click(function() {
		var attr = this.getAttribute('data-for');
		if (!attr) { attr = this.getAttribute('for'); }
		if (attr) {
			var img = document.getElementById(attr);
			if (img.switchMouseover(this)) {
				$(this).addClass('selected');
				var attr = this.getAttribute('data-for_link');
				if (attr) {
					var link = document.getElementById(attr);
					link.old_href = link.getAttribute('href');
					link.setAttribute('href',this.getAttribute('href'));
				}
			} else {
				$(this).removeClass('selected');
				var attr = this.getAttribute('data-for_link');
				if (!attr) { attr = this.getAttribute('for_link'); }
				if (attr) {
					var link = document.getElementById(attr);
					link.setAttribute('href',link.old_href);
					link.old_href = '';
				}
			}
		}
		return false;
	});
});
