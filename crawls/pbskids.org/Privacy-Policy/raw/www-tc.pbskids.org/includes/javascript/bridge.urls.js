function bridgeURLs(hostname, pathname) { 
	return ( hostname != 'www-tc.pbskids.org' ) 
            && ( pathname.indexOf('/redir/http') == -1 )
            && ( hostname != 'pbskids.org' )
            && ( hostname != 'www.pbskids.org' )
            && ( hostname != 'pbskidsgo.org' )
            && ( hostname != 'pbskidsplay.org' )
            && ( hostname != 'www.pbskidsplay.org' )
            && ( hostname != 'dipsy.pbs.org' )
            && ( hostname != 'soup.pbskids.org' )
            && ( hostname != 'ernie.pbskids.org' )
            && ( hostname != 'video.pbs.org' )
            && ( hostname != 'm-dev.pbskids.org' )
            && ( hostname != 'm.pbskids.org' )
            && ( hostname.length > 0 || pathname.length > 0 )
            // Relative URLs cause hostname to be blank in IE 8 or lower. These should not cause bridge overlay to appear.
            && ( !(navigator.appName == 'Microsoft Internet Explorer' && hostname.length == 0) )
            && ( pathname.indexOf('openVideoWin') == -1 )
            && ( pathname.indexOf('history.back') == -1 )
            || ( pathname.indexOf('parentsteachers') != -1 )
            || ( pathname.indexOf('caregiver') != -1 )
            || ( pathname.indexOf('itsmylife/parents') != -1 )
            || ( pathname.indexOf('animalia/parents_and_teachers') != -1 )
            || ( pathname.indexOf('parentsTeachers') != -1 )
            || ( pathname.indexOf('mamamirabelle/parents') != -1 )
            || ( pathname.indexOf('barney/pareduc') != -1 )
            || ( pathname.indexOf('zoom/grownups') != -1 )
            || ( pathname.indexOf('readingrainbow/parents_and_teachers') != -1 )
            || ( pathname.indexOf('wordgirl/parentsandteachers') != -1 )
            || ( pathname.indexOf('electriccompany/parentseducators') != -1 )
            || ( pathname.indexOf('wordworld/parentsandteachers') != -1 )
            || ( pathname.indexOf('wordworld/sitemap') != -1 )
            || ( pathname.indexOf('wordworld/contactus') != -1 )
            || ( pathname.indexOf('wordworld/activities') != -1 );
}

function bridgeURLTemplates(hostname, pathname, linkClass) {
		if ( (hostname == 'pbsparents.org' || hostname == 'www.pbsparents.org') || ( (hostname == 'pbs.org' || hostname == 'www.pbs.org') && bridgeLinkPathname.substring(0,9) == '/parents/' ) ) { return 'parents'; }
		if ( ( pathname.indexOf('animalia/parents_and_teachers') != -1 ) || ( pathname.indexOf('parentsteachers') != -1 ) || ( pathname.indexOf('itsmylife/parents') != -1 ) || ( pathname.indexOf('readingrainbow/parents_and_teachers') != -1 ) || ( pathname.indexOf('barney/pareduc') != -1 ) || ( pathname.indexOf('grownups') != -1 ) || ( pathname.indexOf('/caregiver') != -1 ) || ( pathname.indexOf('parents') != -1 ) ) { return 'parentsSection'; }
		else if ( (hostname == 'pbsteachers.org' || hostname == 'www.pbsteachers.org') || ( (hostname == 'pbs.org' || hostname == 'www.pbs.org') && bridgeLinkPathname.substring(0,10) == '/teachers/' ) ) { return 'teachers'; }
		else if (linkClass == 'pbskids_bridge_sponsor' ) { return 'sponsor'; }
		/* JPW 9-16-2011 */ else if (linkClass == 'pk-sponsor-link') { return 'pk-sponsor'; }
		else { return 'default'; };
}

function bridgeCursorFix(hostname, pathname) {
	if ( ( pathname.indexOf('teletubbies') != -1 ) || 
		( pathname.indexOf('sesame') != -1 ) ||
		( pathname.indexOf('panwapa') != -1 ) ||
		( pathname.indexOf('mamamirabelle') != -1 ) ||
		( pathname.indexOf('caillou') != -1 ) ||
		( pathname.indexOf('toopyandbinoo') != -1 ) ||
		( pathname.indexOf('/zoom/games/goldburgertogo/') != -1) )				   
	{
		return true;
	} else {
		return false;
	}
}

function bridgeNoConflict(hostname, pathname) {
	if (
		( pathname.indexOf('curiousgeorge') != -1 )				   
	) { return true; } else
	{ return false; }
}
