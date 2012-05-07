/****************************************************
    Search Engines for tracking with Google Analytics
	for ga.js - http://code.google.com/apis/analytics/docs/

	Martin Zima, Czech Republic
	zima@avast.com, http://www.avast.com

	Based on work of Brian J Clifton
     
     DESCRIPTION: Script for tracking regional and custom search engines. Requires ga.js
     READ: http://www.advanced-web-metrics.com/blog/2008/09/14/customising-the-list-of-search-engines-in-google-analytics/
          
     All scripts presented have been tested and validated by the author and are believed to be correct
     as of the date of publication or posting. The Google Analytics software on which they depend is 
     subject to change, however; and therefore no warranty is expressed or implied that they will
     work as described in the future. Always check the most current Google Analytics documentation.

****************************************************/
// Last updated Nov-2009 - see revisions to: see: http://code.google.com/apis/analytics/docs/gaJS/changelog.html#release-2009-10

// Base on the documentation at http://code.google.com/apis/analytics/docs/gaJS/gaJSApiSearchEngines.html#_gat.GA_Tracker_._addOrganic
// With thanks to Alex Ortiz (Google). Now with 92 additional SEs + GA defaults (130+ domains)
// Initial thanks to Simon Wang and Tomas Remotigue of Google


try{
// Google search domains
pageTracker._addOrganic("google.at", "q",true);
pageTracker._addOrganic("google.be", "q",true);
pageTracker._addOrganic("google.ca", "q",true);
pageTracker._addOrganic("google.ch", "q",true);
pageTracker._addOrganic("google.cn", "q",true);
pageTracker._addOrganic("google.co.in","q",true);
pageTracker._addOrganic("google.co.jp","q",true);
pageTracker._addOrganic("google.co.nz","q",true);
pageTracker._addOrganic("google.co.uk", "q",true);
pageTracker._addOrganic("google.co.th", "q",true); // Thailand
pageTracker._addOrganic("google.com","q",true);
pageTracker._addOrganic("google.com.ar","q",true); // Argentina
pageTracker._addOrganic("google.com.au","q",true);
pageTracker._addOrganic("google.com.br","q",true);
pageTracker._addOrganic("google.com.co","q",true); // Colombia
pageTracker._addOrganic("google.com.mx","q",true);
pageTracker._addOrganic("google.com.sg","q",true);
pageTracker._addOrganic("google.com.tr","q",true); // Turkey
pageTracker._addOrganic("google.com.tw","q",true); // Taiwan
pageTracker._addOrganic("google.com.ua","q",true); // Ukraine
pageTracker._addOrganic("google.cz", "q",true); // Czech Republic
pageTracker._addOrganic("google.de", "q",true);
pageTracker._addOrganic("google.dk", "q",true);
pageTracker._addOrganic("google.ee", "q",true); // Estonia
pageTracker._addOrganic("google.es", "q",true);
pageTracker._addOrganic("google.fi", "q",true);
pageTracker._addOrganic("google.fr", "q",true);
pageTracker._addOrganic("google.gr", "q",true);
pageTracker._addOrganic("google.ie", "q",true);
pageTracker._addOrganic("google.it", "q",true);
pageTracker._addOrganic("google.lt", "q",true);
pageTracker._addOrganic("google.lv", "q",true);
pageTracker._addOrganic("google.nl", "q",true);
pageTracker._addOrganic("google.no", "q",true);
pageTracker._addOrganic("google.pl", "q",true);
pageTracker._addOrganic("google.pt", "q",true);
pageTracker._addOrganic("google.ru", "q",true);
pageTracker._addOrganic("google.se", "q",true);
pageTracker._addOrganic("google.si", "q",true); // Slovenia


// Yahoo search domains
pageTracker._addOrganic("uk.search.yahoo","p",true);
pageTracker._addOrganic("es.search.yahoo","p",true);
pageTracker._addOrganic("pt.search.yahoo","p",true);
pageTracker._addOrganic("it.search.yahoo","p",true);
pageTracker._addOrganic("fr.search.yahoo","p",true);
pageTracker._addOrganic("nl.search.yahoo","p",true);
pageTracker._addOrganic("be.search.yahoo","p",true);
pageTracker._addOrganic("de.search.yahoo","p",true);
pageTracker._addOrganic("no.search.yahoo","p",true);
pageTracker._addOrganic("se.search.yahoo","p",true);
pageTracker._addOrganic("dk.search.yahoo","p",true);
pageTracker._addOrganic("fi.search.yahoo","p",true);
pageTracker._addOrganic("ch.search.yahoo","p",true);
pageTracker._addOrganic("at.search.yahoo","p",true);
pageTracker._addOrganic("ie.search.yahoo","p",true);
pageTracker._addOrganic("ru.search.yahoo","p",true);
pageTracker._addOrganic("pl.search.yahoo","p",true);
pageTracker._addOrganic("br.search.yahoo","p",true);
pageTracker._addOrganic("in.search.yahoo","p",true);
pageTracker._addOrganic("cn.search.yahoo","p",true);
pageTracker._addOrganic("id.search.yahoo","p",true);
pageTracker._addOrganic("mc.search.yahoo","p",true);
pageTracker._addOrganic("yahoo.co.jp","p",true);
pageTracker._addOrganic("asia.search.yahoo","p",true);
pageTracker._addOrganic("malaysia.search.yahoo","p",true);
pageTracker._addOrganic("tw.search.yahoo","p",true);
pageTracker._addOrganic("sg.search.yahoo","p",true);
pageTracker._addOrganic("tr.search.yahoo","p",true);
pageTracker._addOrganic("ca.search.yahoo","p",true);
pageTracker._addOrganic("espanol.search.yahoo","p",true);

// UK search domains
pageTracker._addOrganic("hotbot.co.uk","query",true);
pageTracker._addOrganic("excite","q",true);
pageTracker._addOrganic("bbc","q",true);
pageTracker._addOrganic("tiscali","query",true);
pageTracker._addOrganic("uk.ask.com","q",true);
pageTracker._addOrganic("blueyonder","q",true);
pageTracker._addOrganic("aol.co.uk","query",true);
pageTracker._addOrganic("ntlworld","q",true);
pageTracker._addOrganic("tesco.net","q",true);
pageTracker._addOrganic("orange.co.uk","q",true);
pageTracker._addOrganic("mywebsearch.com","searchfor",true);
pageTracker._addOrganic("uk.myway.com","searchfor",true);
pageTracker._addOrganic("searchy.co.uk","search_term",true);
pageTracker._addOrganic("msn.co.uk","q",true);
pageTracker._addOrganic("uk.altavista.com","q",true);
pageTracker._addOrganic("lycos.co.uk","query",true);
pageTracker._addOrganic("sky.com","term",true);
pageTracker._addOrganic("britishinformation.com", "search",true);


// Extras - last updated Sep 2009
pageTracker._addOrganic("images.google","prev",true);	// requires additional filter to grab keywords - see book Ch9
pageTracker._addOrganic("images.google","q",true);		// not applicable but here just in case G switch to this format
pageTracker._addOrganic("maps.google","q",true);
pageTracker._addOrganic("news.google","q",true);
pageTracker._addOrganic("video.google","q",true);
pageTracker._addOrganic("ananzi","qt",true);
pageTracker._addOrganic("anzwers","search",true);
pageTracker._addOrganic("araby.com","q",true);
pageTracker._addOrganic("dogpile","q",true);
pageTracker._addOrganic("elmundo.es","q",true);
pageTracker._addOrganic("eniro","search_word",true);		// Sweden and Nordics
pageTracker._addOrganic("eniro","geo_area",true);		// Sweden and Nordics
pageTracker._addOrganic("ezilon.com","q",true);
pageTracker._addOrganic("hotbot","query",true);
pageTracker._addOrganic("iafrica.funnel.co.za","q",true);
pageTracker._addOrganic("naver.com","query",true);		// Korean
pageTracker._addOrganic("mywebsearch.com","searchfor",true);
pageTracker._addOrganic("rambler.ru","query",true);		// Russian
pageTracker._addOrganic("search.aol.com","encquery",true);
pageTracker._addOrganic("searcheurope.com","query",true);
pageTracker._addOrganic("suche.web.de","su",true);		// German
pageTracker._addOrganic("kelkoo","contextKeywords",true); 	// not possible on Pricerunner or Amazon due to redirects
pageTracker._addOrganic("zinza.com","query",true);		// Arabic
pageTracker._addOrganic("maktoob.com","q",true);		// Arabic
}catch(err) {}