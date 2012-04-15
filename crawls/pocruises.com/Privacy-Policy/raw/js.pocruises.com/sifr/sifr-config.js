var praxis = { src: '/sifr/praxis.swf' };
var praxislight = { src: '/sifr/praxislight.swf' };
var amasislightitalic = { src: '/sifr/amasislightitalic.swf' };

sIFR.activate(amasislightitalic, praxis, praxislight);

// live rendering
sIFR.replace(amasislightitalic, {
	selector: '#home-links h1', 
	css: '.sIFR-root {color: #FFFFFF;}', 
	wmode: 'transparent',
	forceSingleLine: true
});

//for home social media title
sIFR.replace(praxislight, {
selector: '#social-home h2',
    css: '.sIFR-root {color: #FFFFFF;}',
    wmode: 'transparent',
    forceSingleLine: true
});

sIFR.replace(praxis, {
	selector: 'BODY#overlay div div div div h1', 
	css: '.sIFR-root {color: #514B46;}', 
	wmode: 'transparent',
	forceSingleLine: true
});

sIFR.replace(amasislightitalic, {
	selector: 'h1', 
	css: '.sIFR-root {color: #FFFFFF;}', 
	wmode: 'transparent',
	/*forceSingleLine: true,*/
	fixFocus: true,
	opaque: true
});

sIFR.replace(praxis, {
	selector: '#search-box h2.box',
	css: '.sIFR-root { color: #FFFFFF;}',
	wmode: 'transparent'
});

sIFR.replace(praxis, {
	selector: 'div.blue-box h2',
	css: '.sIFR-root {color: #FFFFFF; letter-spacing: -1;}',
	wmode: 'transparent'
});

sIFR.replace(praxislight, {
	selector: '#home-links UL LI H2',
	css: [
		'.sIFR-root { color: #FFFFFF; }',
		'a { text-decoration: none; color: #FFFFFF; }',
		'a:link { color: #FFFFFF; }',
		'a:hover { color: #FFFFFF; text-decoration: underline; }'
	],
	wmode: 'transparent',
	forceSingleLine: true,
	fixFocus: true
});

sIFR.replace(praxis, {
	selector: '#rhs-secondary-nav H2, #rhs-menu H2',
	css: [
		'.sIFR-root { color: #505E6E; }',
		'a { text-decoration: none; }',
		'a:link { color: #505E6E; }',
		'a:hover { color: #003070; text-decoration: none; }'
	],
	wmode: 'transparent',
	fixFocus: true
});

sIFR.replace(praxis, {
	selector: '#tbl-search-results TR TH H2',
	css: '.sIFR-root {color: #FFFFFF;}',
	wmode: 'transparent'
});

sIFR.replace(praxis, {
	selector: '#right h2',
	css: '.sIFR-root {color: #5D5853;}',
	wmode: 'transparent'
});

sIFR.replace(praxis, {
	selector: '.ships LI H2',
	css: [
		'.sIFR-root { color: #475667;}',
		'a { text-decoration: none; }',
		'a:link { color: #475667; }',
		'a:hover { color: #475667; text-decoration: underline; }'
	],
	wmode: 'transparent',
	fixFocus: true
});

sIFR.replace(praxis, {
	selector: '.promo-head p.main, #news-alert-lft',
	css: [
		'.sIFR-root { color: #475667; }',
		'a { text-decoration: none; }',
		'a:link { color: #475667; }',
		'a:hover { color: #475667; text-decoration: underline; }'
	],
	wmode: 'transparent',
	fixFocus: true
});

sIFR.replace(praxis, {
	selector: '.promo-head p.sub',
	css: [
		'.sIFR-root { color: #988642; }',
		'a { text-decoration: none; }',
		'a:link { color: #988642; }',
		'a:hover { color: #988642; text-decoration: none; }'
	],
	wmode: 'transparent',
	fixFocus: true
});

/*
sIFR.replace(praxis, {
	selector: 'ul.expanding li p.link',
	css: [
		'.sIFR-root { color: #FFFFFF; }',
		'a { text-decoration: none; }',
		'a:link { color: #FFFFFF; }',
		'a:hover { color: #FFFFFF; text-decoration: none; }'
	],
	wmode: 'transparent',
	fixFocus: true
});
*/
sIFR.replace(praxis, {
	selector: 'ul.map-interact li p.link',
	css: [
		'.sIFR-root { color: #CED5DE; }',
		'a { text-decoration: none; }',
		'a:link { color: #CED5DE; }',
		'a:hover { color: #FFFFFF; text-decoration: none; }'
	],
	wmode: 'transparent',
	fixFocus: true
});

sIFR.replace(praxis, {
	selector: 'UL#sitemap > li span',
	css: [
		'.sIFR-root {color: #475667;}',
		'a {color: #475667; text-decoration: none;}',
		'a:link {color: #475667; text-decoration: none;}',
		'a:hover {color: #475667; text-decoration: underline;}'
	],
	forceSingleLine: true,
	wmode: 'transparent',
	fixFocus: true
});

sIFR.replace(praxis, {
    selector: 'h2.home-page-blue',
    css: [
		'.sIFR-root {color: #0c3c7c;}',
		'a {color: #aa9750; text-decoration: none;}',
		'a:link {color: #aa9750; text-decoration: none;}',
		'a:hover {color: #aa9750; text-decoration: underline;}'
	],   
    wmode: 'transparent',
    forceSingleLine: true
});

sIFR.replace(praxis, {
    selector: 'h2.home-page-white',
    css: '.sIFR-root {color: #ffffff;}',
    wmode: 'transparent',
    forceSingleLine: true
});

sIFR.replace(praxis, {
    selector: 'h4.home-page-white',
    css: '.sIFR-root {color: #ffffff;font-size:80% !important;}',
    wmode: 'transparent',
    forceSingleLine: true
});

sIFR.replace(praxis, {
    selector: 'h2.searchboxtitle',
    css: '.sIFR-root {color: #ffffff !important;}',
    wmode: 'transparent',
    forceSingleLine: true
});


sIFR.replace(praxis, {
    selector: 'h4.home-page-blue',
    css: '.sIFR-root {color: #0c3c7c;}',
    wmode: 'transparent',
    forceSingleLine: true
});

sIFR.replace(praxis, {
	selector: 'h2',
	css: '.sIFR-root {color: #5D5853;}',
	wmode: 'transparent',
	forceSingleLine: true
});

sIFR.replace(praxis, {
    selector: 'DIV#search-box h4.searchbox',
    css: '.sIFR-root {color: #ffffff;font-size:80% !important;}',
    wmode: 'transparent',
    forceSingleLine: true
});





//sIFR.replace(praxis, {
//	selector: 'div.forgotPasswordIdentifier .nucleusHeading .detailsTitleContent',
//	css: '.sIFR-root {color: #5D5853;}',
//	wmode: 'transparent'
//});





