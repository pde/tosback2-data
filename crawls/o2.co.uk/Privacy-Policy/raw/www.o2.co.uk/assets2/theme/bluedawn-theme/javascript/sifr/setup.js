sIFR.useStyleCheck = true;

var frutigerl = {
  	src: flash_path+'frutiger_light.swf',
	ratios: [7,1.32,11,1.31,13,1.24,14,1.25,19,1.23,27,1.2,34,1.19,42,1.18,47,1.17,48,1.18,69,1.17,74,1.16,75,1.17,1.16]
};

if (!window.ie6){
	sIFR.activate(frutigerl);

	sIFR.replace(frutigerl, {selector: 'h2.sifr',
						css: { }});
	
	sIFR.replace(frutigerl, {selector: 'h1.sifr',
						css: { }});

	sIFR.replace(frutigerl, {selector: 'h2.sifr_white', 
						 css: {'.sIFR-root': { "color": "#ffffff" }},
						 wmode: 'transparent' });

	sIFR.replace(frutigerl, {selector: 'h3.sifr_sub', 
						 css: {'.sIFR-root': { "color": "#bfc5cc" }},
						 wmode: 'transparent' });
}
						 
