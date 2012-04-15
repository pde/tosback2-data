/*****************************************************************************
It is adviced to place the sIFR JavaScript calls in this file, keeping it
separate from the `sifr.js` file. That way, you can easily swap the `sifr.js`
file for a new version, while keeping the configuration.

You must load this file *after* loading `sifr.js`.

That said, you're of course free to merge the JavaScript files. Just make sure
the copyright statement in `sifr.js` is kept intact.
*****************************************************************************/

// NOTE: This path may need to change based on context.
var frutiger_medium = { src: '/en_US/_flash/frutiger_next_pro/medium.swf' };
var frutiger_heavy = { src: '/en_US/_flash/frutiger_next_pro/heavy.swf' };
var frutiger_bold = { src: '/en_US/_flash/frutiger_next_pro/bold.swf' };

// One setting you probably want to use is `sIFR.useStyleCheck`. Before you do that,
// read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad>.

// sIFR.useStyleCheck = true;

// Next, activate sIFR:
sIFR.activate(frutiger_medium, frutiger_heavy, frutiger_bold);


/* SIDEBAR NAVIGATION *************************************/
sIFR.replace(frutiger_heavy, {
	selector: '#brands .active-box .nav-header.current .sifr-header',
	css: '.sIFR-root a { color: #444444; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .active-box .nav-header.current .sifr-header',
	css: '.sIFR-root a { color: #444444; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.active-box .nav-header.current .sifr-header',
	css: '.sIFR-root a { color: #444444; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_heavy, {
	selector: '#brands .active-box .nav-header .sifr-header',
	css: '.sIFR-root a { color: #F06900; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .active-box .nav-header .sifr-header',
	css: '.sIFR-root a { color: #6EB820; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.active-box .nav-header .sifr-header',
	css: '.sIFR-root a { color: #0046AD; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});


/* HEADER AREAS *******************************************/
sIFR.replace(frutiger_heavy, {
	selector: '#brands .small-header',
	css: '.sIFR-root { color: #F06900; leading: 3; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .small-header',
	css: '.sIFR-root { color: #6EB820; leading: 3; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.small-header',
	css: '.sIFR-root { color: #0046AD; leading: 3; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_medium, {
	selector: '#brands .medium-header',
	css: '.sIFR-root { color: #F06900; leading: 3; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_medium, {
	selector: '#sustainability .medium-header',
	css: '.sIFR-root { color: #6EB820; leading: 3; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_medium, {
	selector: '.medium-header',
	css: '.sIFR-root { color: #0046AD; leading: 3; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_heavy, {
	selector: '#brands .large-header',
	css: '.sIFR-root { color: #F06900; letter-spacing: -1; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .large-header',
	css: '.sIFR-root { color: #6EB820; letter-spacing: -1; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.large-header',
	css: '.sIFR-root { color: #0046AD; letter-spacing: -1; }',
	wmode: 'transparent'
});

/* contact header */
sIFR.replace(frutiger_heavy, {
	selector: '#brands .contact-header',
	css: '.sIFR-root { color: #F06900; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .contact-header',
	css: '.sIFR-root { color: #6EB820; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.contact-header',
	css: '.sIFR-root { color: #0046AD; }',
	wmode: 'transparent'
});

/* BRANDS *******************************************/
sIFR.replace(frutiger_heavy, {
	selector: '.brand-intro h2',
	css: '.sIFR-root { color: #0046AD; leading: 0; }',
	tuneHeight: -2,
	offsetTop: 2,
	wmode: 'transparent'
});
sIFR.replace(frutiger_medium, {
	selector: '.brand-intro h3',
	css: '.sIFR-root { color: #0046AD; leading: 4; letter-spacing: -1; }',
	tuneHeight: -4,
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.brand-detail .highlighted',
	css: '.sIFR-root { color: #444444; }',
	wmode: 'transparent'
});

/* NEWS AND VIEWS LANDING *******************************************/
sIFR.replace(frutiger_medium, {
	selector: '.news-and-views-title',
	css: '.sIFR-root { color: #0046AD; leading: 0; }',
	wmode: 'transparent'
});
/*
sIFR.replace(frutiger_heavy, {
	selector: '.bubble-title',
	css: '.sIFR-root { color: #ffffff; leading: 0; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.news-and-views-landing .content-title, #investor-relations .content-title',
	css: '.sIFR-root { color: #0046AD; leading: 0; }',
	wmode: 'transparent'
});
*/

/* BRANDS *******************************************/

sIFR.replace(frutiger_bold, {
	selector: '#brands .related-content-teaser h3.subhead',
	css: '.sIFR-root { color: #333333; }',
	wmode: 'transparent',
	tuneHeight: -5
});



/* WORLDWIDE OPERATIONS *******************************************/
sIFR.replace(frutiger_bold, {
	selector: '#worldwide-ops-intro p.intro-lead',
	css: '.sIFR-root { color: #0046AC; } .sIFR-root a { color: #00A0DE; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_medium, {
	selector: '#worldwide-ops-intro p.intro-more',
	css: '.sIFR-root { color: #0046AC; } .sIFR-root a { color: #00A0DE; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_medium, {
	selector: 'body.worldwide-operations .content-subtitle',
	css: '.sIFR-root { color: #0046AC; } .sIFR-root a { color: #00A0DE; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});




/* MISC HEADERS *******************************************/
sIFR.replace(frutiger_heavy, {
	selector: '#brands .content-title',
	css: '.sIFR-root { color: #444444; } .sIFR-root sub { font-size: 60%; } .sIFR-root a { color: #F06900; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});


sIFR.replace(frutiger_heavy, {
	selector: '#careers .content-title',
	css: '.sIFR-root { color: #444444;} .sIFR-root small { font-size: 60%; font-weight:normal; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_heavy, {
	selector: '#careers.home #lead-career .content-title',
	css: '.sIFR-root { color: #ff0000;} .sIFR-root small { font-size: 60%; font-weight:normal; }',
	wmode: 'transparent',
	flashvars: 'textalign=center' 
});


sIFR.replace(frutiger_heavy, {
	selector: '#sustainability .content-title',
	css: '.sIFR-root { color: #444444; } .sIFR-root sub { font-size: 60%; } .sIFR-root a { color: #6EB820; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});
sIFR.replace(frutiger_heavy, {
	selector: '.content-title',
	css: '.sIFR-root { color: #444444; } .sIFR-root sub { font-size: 60%; } .sIFR-root a { color: #0046AD; text-decoration: none; } .sIFR-root a:hover { color: #444444; text-decoration: underline; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_medium, {
	selector: '.content-subtitle',
	css: '.sIFR-root { color: #444444; leading: 3; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_heavy, {
	selector: '.grouping-title',
	css: '.sIFR-root { color: #444444; }',
	wmode: 'transparent'
});

/* seen on the investor relations age */
sIFR.replace(frutiger_bold, {
	selector: '.report-title',
	css: '.sIFR-root { color: #ffffff; } .sIFR-root .emph { color: #A0DEE9; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_heavy, {
	selector: '.related-title',
	css: '.sIFR-root { color: #FFFFFF; }',
	wmode: 'transparent'
});

sIFR.replace(frutiger_medium, {
	selector: '.lead-title',
	css: '.sIFR-root { color: #333333; }',
	wmode: 'transparent'
});



