Typostream.applyMySelectors = function()
{
	Typostream.applySelector('#Header .extra p a',202,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'7pt',
		'font-weight':'bold',
		'text-transform':'uppercase',
		'text-align': 'right',
		'fill':'#FFFFFF'
	});
	Typostream.applySelector('#PrimaryNavigation ul li a',103,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'text-transform':'uppercase',
		'fill':'#734800'
	});
        Typostream.applySelector('#PrimaryNavigation ul li a:hover',113,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'fill':'#FFFFFF'
	});
        Typostream.applySelector('#PrimaryNavigation ul li.active a',113,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'fill':'#FFFFFF'
	});
        Typostream.applySelector('#PrimaryNavigation ul li ul li a',105,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'text-transform':'normal',
		'fill':'#FFFFFF'
	});
        Typostream.applySelector('#PrimaryNavigation ul li ul li a:hover',115,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'fill':'#FFFFFF'
	});
        Typostream.applySelector('#PrimaryNavigation ul li.active ul li a',115,{
		'font-family':'Gotham',
		'font-stretch':'normal',
		'font-size':'9pt',
		'font-weight':'bold',
		'fill':'#FFFFFF'
	});
	Typostream.applySelector('#Content-Text .text-block-component h3',201,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#StockImage .text-block-component h3',201,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#Content-Text .text-block-component h3 strong',202,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#f57900'
	});
	Typostream.applySelector('#StockImage .text-block-component h3 strong',202,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#f57900'
	});
	Typostream.applySelector('#Main.blog #Content-Text .module h3.title',501,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#Content-Text .blog-module h3.title',301,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#Content-Text .form-component h3',201,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'24pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.zillans-wanted #Content-Text h3',301,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'18pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'text-align':'center',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.why-join #Content-Text h3',301,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'18pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'text-align':'center',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.who-we-are #Content-Text h3',301,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'18pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'text-align':'center',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.meet-us #Content-Text h3',301,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'18pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'text-align':'center',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.benefits-perks #Content-Text .text-block-component h3',401,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'18pt',
		'font-weight':'300',
		'text-transform':'uppercase',
		'fill':'#666666'
	});
	Typostream.applySelector('#Main.careers-us #Content-Text h6',400,{
		'font-family':'Helvetica LT Std',
		'font-stretch':'condensed',
		'font-size':'22pt',
		'font-weight':'300',
		'text-transform':'normal',
		'fill':'#0600A2'
	});
};

var Shopzilla = (function() {
	
	var langs = ['us', 'uk', 'ger', 'fra'];
	
	function BuildLanguageTabs() {
		setTimeout(function() {
			if($('Main').hasClass('leadership')) return;
			
			var ContentText = $('Content-Text'),
				tabRow = ContentText.getElement('div.tab-row'),
				tabModules = tabRow.getElements('div.tab-panes .module'),
				tabBtns = tabRow.getElements('.tab-panel');
			
			
			//loop the tabs content and find all Lang divs
			tabModules.forEach(function(tab, index) {
				var screenshots = tab.getElements('.screenshot'),
					btns = collectLangs(tab, index, screenshots),
					langHolder = new Element('div', { 'class': 'langs' });
				
				if(btns.length) {
					btns.forEach(function(btn) {
						langHolder.grab(btn);
					});
					tabBtns[index].grab(langHolder);
					new Tabs(btns, screenshots);
					
					//center the langHolder in the tab-panel
					langHolder.setStyle('left', (tabBtns[index].getSize().x - langHolder.getSize().x) / 2);
				}
			});
		}, 13);
	}
	
	function collectLangs(tab, index, screenshots) {
		var langBtns = [];
		screenshots.forEach(function(lang) {
			for(var i = 0; i < langs.length; i++) {
				if(lang.hasClass(langs[i])) {
					langBtns.push(new Element('a', {
						'class': 'lang ' + langs[i],
						'text': langs[i],
						'href': '#',
						'events': {
							'click': function(e) {
								
							}
						}
					}));
				}
			}
		});
		return langBtns;
	}
	
	
	return {
		init: function() {
			if('Tabs' in window && Tabs) {
				BuildLanguageTabs();
			}
		}
	}
})();

YAHOO.util.Event.onDOMReady(function() {
	Shopzilla.init();
	
	if(!Typostream.ie6) {
		Typostream.applyMySelectors();
		Typostream.applyStyles();
	}
});