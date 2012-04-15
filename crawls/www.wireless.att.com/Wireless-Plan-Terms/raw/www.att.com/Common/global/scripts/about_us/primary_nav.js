// JavaScript Document

	var site = '';

	thomson = location.href;
	thomson = thomson.indexOf('phoenix');
	//alert (thomson);
	if (thomson != '-1') {
		pid = 'thomson';
		site = 'http://www.att.com';
	}

	if (location.href.indexOf('historic_att_stock') == '27') {
		pid = 'historicattstock';
		site = 'http://www.att.com';
	}
	//alert(pid);
	
	rss = location.href;
	rss = rss.indexOf('rss');
	//alert('RSS:' + rss);
	if (rss != '-1') {
		pid = 'rss';
		site = 'http://www.att.com';
	}
	
	attexecutivenews = location.href;
	attexecutivenews = attexecutivenews.indexOf('executivenews');
	//alert(attexecutivenews);
	if (attexecutivenews != '-1') {
		pid = 'attexecutivenews';
		site = 'http://www.att.com';
	}

function renderGNTop() {
	document.write('<div id="wrapper"><div>'
				 + '<ul id="universalNav">'
				 + '<li class="accessibility"><a href="#content" title="Skip To Content">Skip To Content</a></li>'
				 + '</ul>'
				 + '</div>'
				 + '<div id="container">'
				 + '<div id="page">'
				 + '<div id="header">'
				 + '<ul class="topLeftTabs">'
				 + '<li id="per" class="first"><a href="http://www.att.com/gen/landing-pages?pid=3308" title="Personal">Personal</a></li>'
				 + '<li id="biz"><a href="http://www.att.com/gen/landing-pages?pid=9213" title="Business">Business</a>'
				 + '<ul>'
				 + '<li><a href="http://www.att.com/gen/landing-pages?pid=9213" title="Small Business">Small Business</a></li>'
				 + '<li><a href="http://www.att.com/gen/landing-pages?pid=9214" title="Enterprise Business">Enterprise Business</a></li>'
				 + '<li><a href="http://www.att.com/gen/general?pid=11624" title="Wholesale">Wholesale</a></li>'
				 + '<li><a href="http://www.att.com/gen/general?pid=11625" title="Government">Government</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li id="abt" class="selected"><a href="http://www.att.com/gen/landing-pages?pid=3309" title="About AT&amp;T">About AT&amp;T</a></li>'
				 + '<li id="last"><span> </span></li>'
				 + '</ul>'
				 + '</div>'
				 + '<div id="mainNavigation">');
				 renderPrimaryNav();
	document.write('</div>'
				 + '<div id="content-container">'
				 + '<div id="content">');
}
function renderGNBottom() {
	document.write('</div>'
				 + '</div>'
				 + '</div>'
				 + '</div>'
				 + '<div id="footer">'
				 + '<div class="w586 left">'
				 + '<p class="separator"><a class="begin" href="http://www.att.com/privacy/">Privacy Policy</a> <a href="http://www.att.jobs/">Careers</a> <a href="http://www.att.com/econtactus/">Contact Us</a> <a href="http://www.wireless.att.com/legal">Terms of Use</a> <a href="http://www.att.com/sitemap">Site Map</a> <a href="http://www.att.com/gen/general?pid=10190">Accessibility</a> <a target="_blank" href="http://www.att.com/internal/adchoices">Advertising Choices</a>  <a style="padding-left:6px" target="_blank" class="end" href="http://www.att.com/internal/broadbandinfo">Broadband Information</a</p>'
				 + '<p class="copyright"><a href="http://www.att.com/gen/privacy-policy?pid=2587">&#169; <script type="text/javascript">document.write(new Date().getFullYear());</script> AT&amp;T Intellectual Property</a>. All rights reserved. AT&amp;T, the AT&amp;T logo and all other AT&amp;T marks contained herein are trademarks of AT&amp;T Intellectual Property and/or AT&amp;T affiliated companies. AT&amp;T36USC220506</p>'
				 + '</div>'
				 + '<div class="w346 last dotSites"> <span class="dotCom"><a href="http://www.att.com/"><img src="//www.att.com/images/global/footer/logoATTdotcom.png" alt="att.com. Shop. Service. Support" /></a></span> <span class="dotNet"><a href="http://www.att.net/"><img src="//www.att.com/images/global/footer/logoATTdotnet.png"  alt="att.net. E-mail, News, Weather &amp; More" /></a></span> </div>'
				 + '<div class="clear"></div>'
				 + '<div class="logos"> <a href="http://www.ctia.org/" class="firstLogo"><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/CTIA.gif" alt="The first nationwide carrier to be awarded the Seal of Wireless Quality. For details, visit www.ctia.org" title="The first nationwide carrier to be awarded the Seal of Wireless Quality. For details, visit www.ctia.org" /></a> <a href="https://www.bbb.org/online/consumer/cks.aspx?id=110020911221" target="_blank" ><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/BBB.gif" alt="Click to verify BBB accreditation and to see a BBB report." title="Click to verify BBB accreditation and to see a BBB report."/></a> <a href="http://clicktoverify.truste.com/pvr.php?page=validate&amp;companyName=AT%26T&amp;sealid=101" target="_blank"><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/Truste.gif" alt="This site is certified by TRUSTe" title="This site is certified by TRUSTe" /></a> <a href="http://www.yellowpages.com" target="_blank"><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/ypcom.gif" alt="YP.com - the new yellowpages.com" title="YP.com - the new yellowpages.com" /> </a> <a href="http://www.realpageslive.com" target="_blank"><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/DWYPgs.gif" alt="Digital White &amp; Yellow Pages" title="Digital White &amp; Yellow Pages" class="yellowpages" /></a> <a href="http://www.att.net/teamusa"><img src="//www.att.com/homepage/Common/indc/homepage/images/footer/usa_sponsor.gif" alt="Proud Sponsor of the U.S. Olympic Team" /></a> </div>'
				 + '</div>'
				 + '</div>');
}
function renderPrimaryNav() {
	
	if (thomson != '-1') { 
		pid = 'thomson';
		site = 'http://www.att.com';
			var thomsonID = location.href; 
			checkURL = thomsonID.indexOf('p=');
			if(checkURL != '-1') {
				thomsonID = thomsonID.substr(checkURL+2);
				checkAnd = thomsonID.indexOf('&');
				if(checkAnd != '-1') {thomsonID=thomsonID.split('&');thomsonID=thomsonID[0];}
				checkAnc = thomsonID.indexOf('#');
				if(checkAnc != '-1') {thomsonID=thomsonID.split('#');thomsonID=thomsonID[0];}
				//alert(thomsonID);
				pid = thomsonID;
			//alert(thomsonID);
			}
			pid = pid.toLowerCase();
		}
	if (location.href.indexOf('historic_att_stock') != '-1') {
		pid = 'historicattstock';
		site = 'http://www.att.com';
	}
	if (location.href.indexOf('CSRBrochure10') != '-1') {
		pid = 'CSRBrochure10';
		site = 'http://www.att.com';
	}
	if (location.href.indexOf('consumernews') != '-1' || location.href.indexOf('consumerblog') != '-1') {
		pid = 'consumerblog';
		site = 'http://www.att.com';
	}
	
	
	//alert(location.href.indexOf('historic_att_stock'));

	document.write('<ul id="PrimaryNav">'
				 + '<li class="logo"><a href="http://www.att.com/"><img src="/Common/indc/images/new/att_logo_for_nav.gif" height="40" width="40" alt="AT&amp;T" title="AT&amp;T" /></a></li>'
				 + '<li');
				 if (pid == '3309' || pid == 'rss' || pid == 'CSRBrochure10' || pid == 'consumerblog' ) { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/landing-pages?pid=3309" title="ABOUT US" id="pn-compinfo">ABOUT US</a>'
				 + '<ul class="secondaryNav" id="about_us_nav">'
				 + '<li><a href="' + site + '/gen/investor-relations?pid=5711" title="Corporate Profile" id="au_corporate_profile_link">Corporate Profile</a>');
						au_corporate_profile_nav();
 	document.write('</li>'
				 + '<li><a href="' + site + '/Common/about_us/news.html" title="Media Resources" id="au_media_resources_link">Media Resources</a>');
						au_media_resources_nav();
 	document.write('</li>'
				 + '<li');
				 if (pid == 'consumerblog') { document.write(' class="selected"'); }
 	document.write('><a href="http://blogs.att.net/consumerblog" title="Consumer Blog" id="au_consumer_blog">Consumer Blog</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=11366" title="Serving Customers">Serving Customers</a></li>'
				 + '<li');
				 if (pid == 'CSRBrochure10') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/landing-pages?pid=7735" title="Sustainability" id="au_sustainability_link">Sustainability</a>');
						au_sustainability_nav();
 	document.write('</li>'
				 + '<li><a id="au_aspire_link" href="/gen/press-room?pid=2631"> AT&amp;T Aspire </a></li>'
				 + '<li><a href="http://att.jobs/" title="Careers" id="au_careers_link">Careers</a>');
						au_careers_nav();
 	document.write('</li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '4800') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/Common/about_us/news.html" title="NEWS" id="pn-news">NEWS</a>'
				 + '<ul class="secondaryNav" id="news_nav">'
				 + '<li><a href="' + site + '/gen/press-room?pid=9880" title="News Release Archives">News Release Archives</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '1841') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/press-room?pid=1841" title="WIRELESS" id="pn-wireless">WIRELESS</a>'
				 + '<ul class="secondaryNav" id="wireless_nav">'
				 + '<li><a href="' + site + '/gen/press-room?pid=1941" title="Wireless Information" id="w_wireless_innovation_link">Wireless Information</a>');
						w_wireless_innovation_nav();
 	document.write('</li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '2943') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/press-room?pid=2943" title="NETWORK" id="pn-network">NETWORK</a>'
				 + '<ul class="secondaryNav" id="network_nav">'
				 + '<li><a href="' + site + '/gen/press-room?pid=1941" title="Wireless Networks">Wireless Networks</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=2535" title="International Service Plans">International Service Plans</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=17541" title="Wi-Fi">Wi-Fi</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=7777" title="Broadband/Wi-Fi">Broadband/Wi-Fi</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '14209') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/press-room?pid=14209" title="INNOVATION" id="pn-innovation">INNOVATION</a>'
				 + '<ul class="secondaryNav" id="innovation_nav">'
				 + '<li><a href="' + site + '/gen/press-room?pid=14188" title="Labs">Labs</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=2949" title="Foundry">Foundry</a></li>'
				 + '<li><a href="http://www.attinnovationspace.com/" title="Innovation Space Blog">Innovation Space Blog</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '5838') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/press-room?pid=5838" title="U-verse" id="pn-uverse">U-VERSE</a>'
				 + '<ul id="uverse_nav" class="secondaryNav">'
				 + '<li><a id="uv_connect_comm" href="' + site + '/gen/press-room?pid=7881">Connected Communities</a>&nbsp;</li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '21436') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/press-room?pid=21436" title="BUSINESS" id="pn-business">BUSINESS</a>'
				 + '<ul class="secondaryNav" id="business_nav">'
				 + '<li><a href="" title="Enterprise Solutions" id="bn_enterprise_solutions_link">Enterprise Solutions</a>');
						bn_enterprise_solutions_nav();
 	document.write('</li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=2936" title="Small Business" id="bn_small_business_link">Small Business</a>');
						bn_small_business_nav();
 	document.write('</li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=18708" title="Other Markets" id="bn_other_markets_link">Other Markets</a>');
						bn_other_markets_nav();
 	document.write('</li>'
				 + '<li><a href="' + site + '/gen/general?pid=7512" title="Doing Business With Us" id="bn_doing_business_link">Doing Business With Us</a>');
						bn_doing_business_nav();
 	document.write('</li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=7658" title="AT&amp;T Interactive and AT&amp;T Advertising Solutions">AT&amp;T Interactive and AT&amp;T Advertising Solutions</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=5834" title="Business Media Kits">Business Media Kits</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				 if (pid == '5718' || pid == 'historicattstock' || pid == 'thomson' || thomson != '-1') { document.write(' class="selected"'); }
 	document.write('> <a id="pn-investor" title="INVESTOR RELATIONS" href="' + site + '/gen/landing-pages?pid=5718"> INVESTOR RELATIONS</a>'
				 + '<ul class="secondaryNav" id="investor_relations_nav">'
				 + '<li><a href="' + site + '/gen/investor-relations?pid=5609" id="ir_corporate_governance_link">Corporate Governance</a>');
ir_corporate_governance_nav();
 	document.write('</li>'
				 + '<li');
				 if (pid == "irol-sec" || pid == "irol-sectoc" || pid == "irol-sectoc" || pid == "irol-reportsannual") { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/investor-relations?pid=18777" id="ir_financial_reporting_link">Financial Reporting</a>');
ir_financial_reporting_nav();
 	document.write('</li>'
				 + '<li');
				 if (pid == "irol-stockquote" || pid == "irol-stockchart" || pid == "irol-analysts" || pid == "irol-stocklookup" || pid == 'historicattstock' ) { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/investor-relations?pid=18759" id="ir_stock_info_link">Stock Information</a>');
ir_stock_info_nav();
 	document.write('</li>'
				 + '<li> <a href="' + site + '/gen/investor-relations?pid=9533" id="ir_stockholder_services_link">Stockholder Services</a>');
ir_stockholder_services_nav();
 	document.write('</li>'
				 + '<li'); if (pid == "irol-alerts" || pid == "irol-alertsconfirm") { document.write(' class="selected"'); }
	document.write('><a href="' + site + '/gen/investor-relations?pid=9532" id="ir_investor_news_link">Investor News</a>');
ir_investor_news_nav();
 	document.write('</li>'
			 + '<li'); if (pid == 'irol-Guestbook' || pid == "irol-calendar" || pid == "irol-guestbook" || pid == "irol-eventdetails" || pid == "irol-eventremindersuccess") { document.write(' class="selected"'); }  document.write('><a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&amp;p=irol-calendar" id="ir_calendar_link">Calendar</a></li>'
				 + '<li><a href="' + site + '/gen/investor-relations?pid=5644" id="ir_contacts_link">Contacts</a></li>'
				 + '<li'); if (pid == "irol-faq") { document.write(' class="selected"'); }  document.write('><a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&amp;p=irol-faq" id="ir_faq_link">FAQ</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li');
				if (pid == '17564') { document.write(' class="selected"'); }
 	document.write('><a href="' + site + '/gen/general?pid=17564" title="ABOUT US SITE MAP" id="pn-sitemap">ABOUT US SITE MAP</a>'
//	'</li>'
//				 + '</ul>'
				 + '<ul class="secondaryNav" id="sitemap_secondary_nav">'
				 + '<li><a href="' + site + '/gen/investor-relations?pid=5711" id="sm_corporate_profile_link">Corporate Profile</a></li>'
				 + '<li><a href="' + site + '/gen/landing-pages?pid=7735" id="sm_sustainability_link">Sustainability</a></li>'
				 + '<li><a href="' + site + '/gen/press-room?pid=14209" id="sm_innovation_link">Innovation</a></li>'
				 + '<li><a href="' + site + '/gen/general?pid=7512" id="sm_doing_business_link">Doing Business With Us</a></li>'
				 + '<li><a href="' + site + '/diversity" id="sm_diversity_mgmt_link">Diversity Management</a></li>'
				 + '<li><a href="http://www.att.jobs/" id="sm_careers_link">Careers</a></li>'
				 + '</ul>'
				 + '</li>'
				 + '<li class="search">'
				 + '<form method="get" id="searchForm" name="searchForm" action="http://www.att.com/global-search/search.jsp">'
				 + '<fieldset>'
				 + '<input type="text" value="Search" name="q" id="search" title="Enter search keywords" onclick="if (this.value == \'Search\') { this.value=\'\' }" onfocus="if (this.value == \'Search\') { this.value=\'\' }" />'
				 + '<label for="searchSubmit">Go</label>'
				 + '<input type="image" src="http://www.att.com/Common/indc/images/new/btn_search.png" value="Search" alt="Submit search" class="btnGo" id="searchSubmit" />'
				 + '</fieldset>'
				 + '</form>'
				 + '</li>'
				 + '</ul>');
}
function renderThomsonTop() {	
		//alert(pid);
		renderGNTop();	
}

function renderThomsonBottom() {
		renderGNBottom();
}

function enterprise_secondary_news() {
}