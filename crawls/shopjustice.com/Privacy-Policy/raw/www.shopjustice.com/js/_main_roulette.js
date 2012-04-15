function mainRoulette(name, pageName){
    var carrousel_widths = new Array() ;
    carrousel_widths['cargo'] = '675';
    carrousel_widths['tanks'] = '675';
    carrousel_widths['default'] = '675';
    var carrousel_heights = new Array() ;
    carrousel_heights['cargo'] = '400';
    carrousel_heights['tanks'] = '400';
    carrousel_heights['default'] = '400';

    parent.getPageOverlay('roulette', 'roulette', '/roulette/'+name, carrousel_widths['default']+'px', carrousel_heights['default']+'px', null, null, true);
    
    if(typeof(pageName) != 'undefined' && typeof(s) != 'undefined') {
    	var sObj = new Object();
    	sObj.pageName = pageName;
    	sObj.channel = s.channel;
    	sObj.prop1 = s.prop1;
    	sObj.prop2 = s.prop2;
    	sObj.prop3 = 'Modal';
    	s.t(sObj);
    }
}
