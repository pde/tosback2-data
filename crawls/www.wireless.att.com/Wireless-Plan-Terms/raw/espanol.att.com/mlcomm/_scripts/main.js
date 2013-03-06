// JavaScript Document




url = location.href;
breakURL = url.split('/');
section = breakURL[3];
checkHome2 = url.indexOf('.com/index')
if(checkHome2 != '-1') {section = 'home'}     
		if(section == 'home') {directory = ''}
		else {
		directory = breakURL[4];   
		checkDir = directory.indexOf('.html');
		if(checkDir != '-1') {directory = directory.substring(0,checkDir);} 
		if(breakURL.length <= 5) { page = ''}
		else {
		page = breakURL[5];  
		checkPage = page.indexOf('.html');
		if(checkPage != '-1') {page = page.substring(0,checkPage);}  
		}
		}
checkOrderform = url.indexOf('order_form');
if(checkOrderform != '-1') {section = 'order_form'}
checkTab = url.indexOf('tab=');
if(checkTab != '-1') {tab = url.substr(checkTab+4);} 
else {tab=0}

 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();  
  
 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();  

 

function renderTopNav(){
	document.write('	<ul id="top-nav">');
	document.write(' <li><a href="http://espanol.att.com/help/contact_us.html?id=' + state + '" title="Cont&aacute;ctanos">Cont&aacute;ctanos</a></li>');
	document.write(' <li><a href="http://att.com/gen/landing-pages?pid=3308" title="AT&amp;T en ingl&eacute;s">AT&amp;T en ingl&eacute;s</a></li>');
    document.write(' <li><a href="http://world.att.com" class="nb" title="">Otros Idiomas</a></li>');
	document.write(' <div class="clear"></div>');
	document.write(' </ul>');
	document.write(' <div class="clear"></div>');
}

function renderSearchNav() {
	document.write('<div id="searchNav">');
	document.write('<ul>');
	document.write('<li><a href="http://att.com/gen/landing-pages?pid=3308" title="Explorar">Explorar</a></li>');
	document.write('<li class="last"><a href="http://localization.att.com/loc/controller?cdvn=landinglocalization&pid=1080&cookieResetted=true&ltype=contactus" title="Contact AT&amp;T" class="pipe">Cont&aacute;ctenos</a></li>');
	document.write('<li id="searchLink">');
	document.write('<form method="get" id="searchForm" name="searchForm" action="http://www.att.com/global-search/search.jsp">');
	document.write('<fieldset>');
	document.write('<legend>Search AT&amp;T</legend>');
	document.write('<label for="search">Search</label>');
	document.write ("<input type=\"text\" value=\"Buscar\" name=\"q\" id=\"search\" title=\"Enter search keywords\" />");
	document.write('<label for="searchSubmit">Go</label>');
	document.write('<input type="image" src="/mlcomm/_images/template/btn_go.gif" value="Go" alt="Submit search" class="btnGo" id="searchSubmit" />');
	document.write('</fieldset>');
	document.write('</form>');
	document.write('</li>');
	document.write('</ul>');
	document.write('</div>');
}


/* ******************************************************************************************************************************************************************************************  */
/* Please make any updates to the IN SITE navigation in this function to the function directly below this one that renders the navigation on the EXTERNAL ORDER FORM found at https://www.att.com/Common/espanol/order_form.html.  */
/* ******************************************************************************************************************************************************************************************  */
function renderGlobalNav() {  
 
	document.write('<div id="global-nav">');
	document.write('<ul>');
	document.write('<li class="logo">');
	if(state == 'nostate') {document.write('<a  href="/index.html?id=' + state + '" title="P&aacute;gina principal de AT&amp;T"><img src="/mlcomm/_images/template/global_nav/global_logo.jpg" alt="Portada" /></a></li>') } 
	else {document.write('<a href="/index.html?id=' + state + '" title="P&aacute;gina principal de AT&amp;T"><img src="/mlcomm/_images/template/global_nav/global_logo.jpg" alt="Portada" /></a></li>');}
	
	if(state == 'nostate') {document.write('<li><a  href="javascript: stateSelectInitialize(\'comprar\')" title="Ordena paquetes y servicios para Internet, tel&eacute;fono m&oacute;vil y televisi&oacute;n digital"><img src="/mlcomm/_images/template/global_nav/global_comprar');}
	else {document.write('<li><a href="/residential_customers/index.html?id=' + state + '" title="Ordena paquetes y servicios para Internet, tel&eacute;fono m&oacute;vil y televisi&oacute;n digital"><img src="/mlcomm/_images/template/global_nav/global_comprar');}
	if(section == 'residential_customers' || directory == 'disclaimers' || section == '25oferta') {
	document.write('_on');
	}
	document.write('.jpg"  alt="Comprar" /></a>');
	document.write('</li>');
	if
	(state == 'nostate') {document.write('<li><a  href="/help/index.html?id=' + state + '" title="Servicio de ayuda al cliente "><img src="/mlcomm/_images/template/global_nav/global_ayuda');}
	else 
	{document.write('<li><a href="/help/index.html?id=' + state + '" title="Servicio de ayuda al cliente "><img src="/mlcomm/_images/template/global_nav/global_ayuda');}
	if(section == 'help' || section == 'privacy_policy') {
	document.write('_on');
	}
	document.write('.jpg" alt="Ayuda" /></a>') 
	document.write('</li>');
	if
	(state == 'nostate') {document.write('<li><a  href="/newsroom/index.html?id=' + state + '"  title="Paquetes para medios, comunicados de prensa, y archivo de noticias"><img src="/mlcomm/_images/template/global_nav/global_noticias')}
	else 
	{document.write('<li><a href="/newsroom/index.html?id=' + state + '" title="Paquetes para medios, comunicados de prensa, y archivo de noticias"><img src="/mlcomm/_images/template/global_nav/global_noticias');}
	if(section == 'newsroom') {
	document.write('_on');
	}
	document.write('.jpg"  alt="Noticias" /></a>'); 
	document.write('</li>');
	
	
	if(state == 'nostate') {document.write('<li><a href="/about_att/index.html?id=' + state + '" title="Informaci&oacute;n corporativa sobre AT&amp;T"> <img src="/mlcomm/_images/template/global_nav/global_acerca');}
	else {	
	document.write('<li><a href="/about_att/index.html?id=' + state + '" title="Informaci&oacute;n corporativa sobre AT&amp;T"> <img src="/mlcomm/_images/template/global_nav/global_acerca');
	}
	if(section == 'about_att') {
	document.write('_on');
	}
	document.write('.jpg"  alt="Acerca de AT&amp;T" /></a>'); 
	document.write('</li>');
	
	
	
	//OLYMPICS LINK
//	if(state == 'nostate') {document.write('<li><a  href="/MiTrayecto/index.html" title="Informaci&oacute;n corporativa sobre AT&amp;T"> <img src="/mlcomm/_images/template/global_nav/global_acerca');}
//	else {	
//	document.write('<li><a href="/MiTrayecto/index.html?id=' + state + '" title="Olimpiadas"> <img src="/mlcomm/_images/template/global_nav/global_acerca');
//	}
//	if(section == 'about_att') {
//	document.write('_on');
//	}
//	document.write('.jpg"  alt="OlÃ­mpiadas" /></a>'); 
//	document.write('</li>');
	
	
	document.write('</ul>');
	document.write('<div id="follow-fb-btn">')
	document.write('<a href="http://www.facebook.com/attlatino?v=app_4949752878" target="_blank" title="S&iacute;guenos en Facebook"><img src="/mlcomm/_images/content/btn_facebook_homepage.png" title="S&iacute;guenos en Facebook" alt="S&iacute;guenos en Facebook" ></a>')
	document.write('</div>')
	document.write('<div class="clear"></div>');	 
	//if(directory == 'att_uverse') {
//	document.write('<div id="uverse-availability">')
//	document.write('<h3>Busca U-verse en tu &aacute;rea</h3>')
//	document.write('<p><a href="http://www.att.com/u-verse/availability/index.jsp?source=IC00ya000000001U&fbid=SbQysdjdyMM" title="Busca U-verse en tu &aacute;rea" target="_blank">M&aacute;s informaci&oacute;n >></a></p>')
//	document.write('</div>')
//	}
	
	if(section == 'residential_customers'  || directory == 'disclaimers' || section == '25oferta') {
	document.write('<div  id="snav-comprar" class="secondary-menu" >');
	document.write('<ul> ');
	document.write('<li><a id="tlink-internet" ');
	if(directory == 'att_internet' || page == 'att_internet') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_internet/index.html?id=' + state + '" title="DSL, Wi-Fi, y servicio de internet de alta velocidad">Internet</a>');
	document.write('</li>');
	document.write('<li><a id="tlink-advancedtv" ');
	if(directory == 'att_advanced_tv' || page == 'att_advanced_tv') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_advanced_tv/index.html?id=' + state + '" title="Opciones en televisi&oacute;n digital">Televisi&oacute;n digital</a></li>');
	document.write('<li><a id="tlink-homephone" '); 
	if(directory == 'att_home_phone' || page == 'att_home_phone') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_home_phone/index.html?id=' + state + '" title="Servicio telef&oacute;nico residencial">Tel&eacute;fono residencial</a></li>');
	document.write('<li><a id="tlink-uverse" ');
	if(directory == 'att_uverse' || page == 'att_uverse' || section == '25oferta') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_uverse/index.html?id=' + state + '" title="AT&amp;T U-verse TV">U-verse</a></li>');
	document.write('<li><a id="tlink-wireless" ');
	if(directory == 'att_wireless') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_wireless/index.html?id=' + state + '" title="M&oacute;vil">M&oacute;vil</a></li>'); 
	document.write('<li><a " ');
	if(directory == 'att_bundles') { document.write('  class="current" ');}
	document.write(' href="/residential_customers/att_bundles/index.html?id=' + state + '" title="Paquetes y servicios de AT&amp;T">Paquetes</a></li>'); 
	
	document.write('<div class="tertiary-menu" id="tmenu-internet">');
	document.write('<ul>');
	document.write('<li><a href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '" title="DSL con servicio telef&oacute;nico fijo">DSL con servicio telef&oacute;nico fijo</a></li>');
	document.write('<li><a href="/residential_customers/att_internet/wifi.html?id=' + state + '" title="Wi-Fi de AT&amp;T">Wi-Fi de AT&amp;T</a></li>');
	document.write('<li><a href="/residential_customers/att_internet/dsl_direct.html?id=' + state + '" title="DSL sin servicio telef&oacute;nico">DSL sin servicio telef&oacute;nico</a></li>'); 
	document.write('<li><a href="/residential_customers/att_uverse/uverse_internet/index.html?id=' + state + '" title="Internet de Alta Velocidad de AT&amp;T U-verse">Internet de Alta Velocidad de AT&amp;T U-verse</a></li>'); 
	document.write('</ul>');
	document.write('</div>');
	
	document.write('<div class="tertiary-menu" id="tmenu-advancedtv">');
	document.write('<ul>');
	document.write('<li><a href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + state + '" title="AT&amp;T U-verse TV">AT&amp;T U-verse TV</a></li>');
	document.write('<li><a href="/residential_customers/att_advanced_tv/directv.html?id=' + state + '" title="AT&amp;T|DIRECTV">AT&amp;T | DIRECTV</a></li>');
	document.write('</ul>');
	document.write('</div>');
	
	document.write('<div class="tertiary-menu" id="tmenu-homephone">');
	document.write('<ul>');
	document.write('<li><a href="/residential_customers/att_home_phone/home_phone.html?id=' + state + '" title="Servicio local">Servicio local</a></li>');
	document.write('<li><a href="/residential_customers/att_home_phone/long_distance.html?id=' + state + '" title="Larga distancia domestica">Larga distancia domestica e internacional</a></li>');
	document.write('</ul>');
	document.write('</div>');
	
	document.write('<div class="tertiary-menu" id="tmenu-uverse">');
	document.write('<ul>'); 
	document.write('<li><a href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + state + '" title="AT&amp;T U-verse TV">AT&amp;T U-verse TV</a></li>');
	document.write('<li class="short"><a href="/residential_customers/att_uverse/uverse_offers/total_home_dvr.html?id=' + state + '" title="U-verse Total Home  DVR">U-verse Total Home  DVR</a></li>');
	document.write('<li><a href="/residential_customers/att_uverse/uverse_help/index.html?id=' + state + '" title="Servicio de tel&eacute;fono digital de AT&amp;T U-verse">Ayuda t&eacute;cnica  y soluci&oacute;n de problemas</a></li>'); 
	document.write('<li><a href="/residential_customers/att_uverse/uverse_internet/index.html?id=' + state + '" title="Internet de alta velocidad de AT&amp;T U-verse">Internet de alta velocidad de AT&amp;T U-verse</a></li>');
	document.write('<li class="short"><a href="/residential_customers/att_uverse/uverse_offers/index.html?id=' + state + '" title="Compara nuestras ofertas">Compara nuestras ofertas</a></li>');   
	document.write('<li><a href="https://www.att.com/olam/dashboardAction.olamexecute" title="Mi Cuenta (en ingl&eacute;s)" target="_blank">Mi Cuenta (en ingl&eacute;s)</a></li>');
	document.write('<li><a href="/residential_customers/att_uverse/uverse_voice/index.html?id=' + state + '" title="Servicio de tel&eacute;fono digital de AT&amp;T U-verse">Servicio de tel&eacute;fono digital de AT&amp;T U-verse</a></li>'); 
	document.write('<li class="short"><a href="/residential_customers/att_uverse/uverse_services/index.html?id=' + state + '" title="Servicios &uacute;nicos de AT&amp;T U-verse">Servicios &uacute;nicos de AT&amp;T U-verse</a></li>');   
	
	document.write('<li><a href="http://www.att.com/u-verse/availability/index.jsp?source=IC00ya000000001U" target="_blank" title="Disponibilidad en mi &aacute;rea">Disponibilidad en mi &aacute;rea</a></li>');   
	document.write('<li><a href="/residential_customers/att_uverse/uverse_wireless/index.html?id=' + state + '" title="Receptor inal&aacute;mbrico de TV de AT&amp;T U-verse<sup>&reg;</sup>">Receptor inal&aacute;mbrico de TV de AT&amp;T U-verse </a></li>');
	document.write('<li class="short"><a href="/residential_customers/att_uverse/uverse_help/uverse_guides.html?id=' + state + '" title="Gu&#237;a del usuario">Gu&#237;a del usuario</a></li>');
	document.write('</ul>');
	document.write('</div>');
	
	
	document.write('</ul>    ');   
	document.write('</div>');
	} 
	
	if(section == 'help' || section == 'privacy_policy') { 
	document.write('<div  id="snav-ayuda" class="secondary-menu" >');
	document.write('<ul> ');
	document.write('<li><a ');
	if(directory == 'faqs') { document.write('  class="current" ');}
	document.write(' href="/help/faqs/index.html?id=' + state + '" title="Preguntas frecuentes ">Preguntas frecuentes </a></li>');
	//document.write('<li><a href="/smartlimits/index.html" target="_blank" title="Controles parentales">Controles parentales</a></li>');
	document.write('<li><a ');
	if(directory == 'att_move' || directory == 'home_technology') { document.write('  class="current" ');}
	document.write(' href="/help/att_move/index.html?id=' + state + '" title="AT&amp;T Facilita Toda Tu Mudanza">AT&amp;T Facilita Toda Tu Mudanza</a></li>'); 
	document.write('<li><a ');
	if(directory == 'conectada') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/help/conectada/index.html" title="La Casa Conectada">La Casa Conectada</a></li>');}
	else {document.write(' href="/help/conectada/index.html?id=' + state + '" title="La Casa Conectada">La Casa Conectada</a></li>');}
	
	document.write('</ul>    ');   
	document.write('</div>');
	}
 
	if(section == 'newsroom') { 
	document.write('<div  id="snav-noticias" class="secondary-menu" >');
	document.write('<ul> ');
	document.write('<li><a ');
	if(directory == 'news_archive' || directory == 'news_releases') { document.write('  class="current" ');}
	document.write(' href="/newsroom/news_archive.html?id=' + state +'" title="Comunicados de prensa">Comunicados de prensa</a></li>');
	document.write('<li><a ');
	if(directory == 'media_kits') { document.write('  class="current" ');}
	document.write(' href="/newsroom/media_kits/index.html?id=' + state + '" title="Paquetes para medios">Paquetes para medios</a></li>'); 
	document.write('<li><a ');
	if(directory == 'useful_information') { document.write('  class="current" ');}
	document.write(' href="/newsroom/useful_information.html?id=' + state + '" title="Informaci&oacute;n de inter&eacute;s">Informaci&oacute;n de inter&eacute;s</a></li>');
	document.write('<li><a ');
	if(directory == 'social_media') { document.write('  class="current" ');}
	document.write(' href="/newsroom/social_media.html?id=' + state + '" title="Redes sociales">Redes sociales</a></li>');
	document.write('</ul>    ');   
	document.write('</div>');
	}
	
	if(section == 'about_att') {
	document.write('<div  id="snav-aboutus" class="secondary-menu" >');
	document.write('<ul> ');
	document.write('<li><a ');
	if(directory == 'corporate_information') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/about_att/corporate_information.html?id=' + state + '" title="Informaci&oacute;n Corporativa">Informaci&oacute;n Corporativa</a></li>');}
	else {document.write(' href="/about_att/corporate_information.html?id=' + state + '" title="Informaci&oacute;n Corporativa">Informaci&oacute;n Corporativa</a></li>');}
	
	document.write('<li><a ');
	if(directory == 'community') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/about_att/community.html?id=' + state + '" title="Comunidad">Comunidad</a></li>');}
	else {document.write(' href="/about_att/community.html?id=' + state + '" title="Comunidad">Comunidad</a></li>');}
	
	document.write('<li><a ');
	if(directory == 'volunteerism') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/about_att/volunteerism.html?id=' + state + '" title="Voluntarios">Voluntarios</a></li>');}
	else {document.write(' href="/about_att/volunteerism.html?id=' + state + '" title="Voluntarios">Voluntarios</a></li>');}
	
	document.write('<li><a ');
	if(directory == 'diversity') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/about_att/diversity.html" title="Diversidad">Diversidad</a></li>'); }
	else {document.write(' href="/about_att/diversity.html?id=' + state + '" title="Diversidad">Diversidad</a></li>'); }
	
	document.write('<li><a ');
	if(directory == 'awards') { document.write('  class="current" ');}
	if(state == 'nostate') {document.write(' href="/about_att/awards.html?id=' + state + '" title="Premios">Premios</a></li>');}
	else {document.write(' href="/about_att/awards.html?id=' + state + '" title="Premios">Premios</a></li>');}
	
	document.write('</ul>    ');   
	document.write('</div>');
	}
	 
	document.write('</div>'); 
}


/* ******************************************************************************************************************************************************************************************  */
/*  This function renders the site navigation for the EXTERNAL ORDER FORM found  at https://www.att.com/Common/espanol/order_form.html.  Please make any updates to the IN SITE navigation in this function, as well*/
/* ******************************************************************************************************************************************************************************************  */
function renderGlobalNavOrderForm() { 
 
 url = location.href;
 checkRSS = url.indexOf('feedsesp');
 
 
document.write('<div id="global-nav">');
				document.write('<ul>');
				document.write('<li class="logo">');
				document.write('<a href="http://espanol.att.com/index.html?id=' + state + '" title="PORTADA"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/template/global_nav/global_logo.jpg" alt="Portada" /></a></li>'); 
				document.write('<li><a href="http://espanol.att.com/residential_customers/index.html?id=' + state + '" title="COMPRAR"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/template/global_nav/global_comprar.jpg"  alt="Comprar" /></a>');
				document.write('</li>');
				document.write('<li><a href="http://espanol.att.com/help/index.html?id=' + state + '" title="AYUDA"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/template/global_nav/global_ayuda.jpg" alt="Ayuda" /></a>') 
				document.write('</li>');
				document.write('<li><a href="/newsroom/index.html?id=' + state + '" title="NOTICIAS"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/template/global_nav/global_noticias');
				if(checkRSS != '-1') {
				document.write('_on');
				}
				document.write('.jpg"  alt="Noticias" /></a>'); 
				document.write('</li>');
				document.write('<li><a href="http://espanol.att.com/about_att/index.html?id=' + state + '" title="ACERCA DE AT&amp;T"> <img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/template/global_nav/global_acerca.jpg"  alt="Acerca de AT&amp;T" /></a>'); 
				document.write('</ul>');
				document.write('<div class="clear"></div>');	 


	 
	document.write('</div>'); 
}
 
function renderStateSelect(whichPage) {  
	if(directory == 'thank_you.html')  {}
	else {
	document.write('<div  id="state-select"><ul>');
 if($('body').is('#home') || $('body').is('#page-404') || state == 'nostate'){
		if(state == 'nostate') {document.write('<li id="state-display nb"></li>'); 
		document.write('<li id="chooseState" class="' + whichPage + '" >Selecciona Tu Estado</li>')
		}
		else {	document.write('<li id="state-display"><strong>' + stateselect + '</strong></li>');
		document.write('<li id="chooseState" class="' + whichPage + '" >Selecciona Otro Estado</li> ');
		}
 	}
 else {
		if(state == 'nostate') {document.write('<li id="state-display"><strong> </strong></li>');
		}
		else {	document.write('<li id="state-display"><strong>' + stateselect + '</strong></li>');
		}
	document.write('<li id="chooseState" class="' + whichPage + '" >Selecciona Otro Estado</li> ');
 }
	document.write('</ul></div>    ');
}
}
 
function showStateSelect () {
	 $(document).ready(function() {
 $("#chooseState").trigger('click');
 });


}
function stateSelectInitialize(targetPage) { 
	$('#chooseState').removeClass().addClass(targetPage); 
 $("#chooseState").trigger('click');
	
	
}

function getQueryString() {
	var querystring = location.href;
	qPos = querystring.lastIndexOf('?');
	if(qPos != '-1') {
	querystring = querystring.split('?');
	querystring = querystring[1]; 
	}
	else querystring = 'noquery'
	return querystring;
}


function getState() {
	query = getQueryString();
	if(query == 'noquery') {state = 'nostate'} 
	else {
	idPos = query.lastIndexOf('id');
	idAnd = query.lastIndexOf('&');
	idAnc = query.lastIndexOf('&');
	if(idPos != '-1' && idAnd == '-1') {
		 state = query.split('=');
		 state = state[1];
	}
	else {
		 state = query.split('&');
		 state = state[0];
		 state = state.split('=');
		 state = state[1]; 
	}
	}
	isAnc = state.lastIndexOf('#');
	if(isAnc != '-1') {
	state = state.substr(0, isAnc);	
	}
	return state;
}


function displayState(stateID) {
	if(stateID == 'northcarolina') {capState = 'Carolina del Norte'}
	else if(stateID == 'southcarolina') {capState = 'Carolina del Sur'}
	else {
	initCap = stateID.charAt(0)
	initCap = initCap.toUpperCase()
	endState = stateID.substr(1,100);
	capState = initCap + endState;
	}
	 
	return capState;
	 
}




function renderSocialMediaAnimation() { 
var bodyURL = location.href;
checkURL = bodyURL.indexOf('?id=')
if(checkURL != '-1') {bodyURL  = bodyURL.substring(0,checkURL);}

 
document.write('<div id="social-media-sidebar">');

document.write('<div id="social-media-anilink"><img alt="social media" id="social-media-btn" src="/mlcomm/_images/template/social_media_ani_tab.gif" /></div>');
document.write('</div>');
document.write('<div id="social-media-anibox">'); 
document.write('<div id="inner-media">');
document.write('<p id="media-facebook"><a href="http://www.facebook.com/attlatino?v=app_4949752878" title="AT&amp;T Latino on Facebook" target="_blank">S&iacute;guenos en Facebook</a></p>');
document.write('<p id="media-youtube"><a href="http://www.youtube.com/attlatino" title="AT&amp;T Latino on YouTube" target="_blank">Suscr&iacute;bete a nosotros</a></p>'); 
document.write('<p id="media-share"><a href="mailto:?subject=PIENSA SIN LIMITES &body=Hola. Acabo de encontrar datos interesantes sobre una variedad de productos y servicios que ofrece AT%26T.%0D' + bodyURL + '" title="Share AT&amp;T Espanol">Comparte</a></p>');
document.write('<p id="anibox-more"><strong><a href="/newsroom/social_media.html?id=' + state +'" title="Aprende m&aacute;s">Aprende m&aacute;s >></a></strong></p>');
document.write('</div>');

document.write('</div>');
}


function renderQuickLinks() {
	document.write('<div id="quick-links">');
document.write('        		<div id="quick-links-box-01" class="quick-links-box">');
document.write('                <h6>Enlaces...</h6>');
document.write('                <ul>');
document.write('                <li><a href="javascript: stateSelectInitialize(\'home\')" title="Selecciona tu estado">Selecciona tu estado</a></li>'); 
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'awards\')"') } 
		else {document.write(' href="/about_att/awards.html?id=' + state  + '" ');}
												document.write(' title="Premios por recomendaciones">Premios por recomendaciones</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'help_billing\')"') } 
		else {document.write(' href="/help/faqs/billing.html?id=' + state + '" ');}
												document.write(' title="Opciones de facturaci&oacute;n y pago">Opciones de facturaci&oacute;n y pago</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'move_att\')"') } 
		else {document.write(' href="/help/att_move/index.html?id=' + state  + '" ');}
												document.write(' title="AT&amp;T facilita toda tu mudanza">AT&amp;T facilita toda tu mudanza</a></li>');
document.write('                <li><a href="http://elportal.att.net/" title="Mi Portal &ndash; entretenimiento y m&aacute;s">Mi Portal  &ndash; entretenimiento y m&aacute;s</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'legal_home\')"') } else {document.write(' href="/legal_terms/index.html?id=' + state  + '" ');}
												document.write(' title="T&eacute;rminos y condiciones">T&eacute;rminos y condiciones</a></li>');
document.write('                </ul>');
 document.write('               </div>');
                
document.write('        		<div id="quick-links-box-02" class="quick-links-box">');
document.write('                <h6>Internet...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'internet_home\')"') } else {document.write(' href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '&tab=1" ');}
												document.write('  title="B&aacute;sico">B&aacute;sico</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'internet_home\')"') } else {document.write(' href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '&tab=2" ');}
												document.write(' title="Express">Express</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'internet_home\')"') } else {document.write(' href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '&tab=3" ');}
												document.write(' title="Pro">Pro</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'internet_home\')"') } else {document.write(' href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '&tab=4" ');}
												document.write(' title="Elite">Elite</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'dsl_direct\')"') } else {document.write(' href="/residential_customers/att_internet/dsl_direct.html?id=' + state + '" ');}
												document.write(' title="Internet sin tel&eacute;fono">Internet sin tel&eacute;fono</a></li> ');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-03" class="quick-links-box">');
document.write('                <h6>Servicio telef&oacute;nico...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'phone_landing\')"') } else {document.write(' href="/residential_customers/att_home_phone/home_phone.html?id=' + state + '" ');}
												document.write(' title="Servicio local">Servicio local</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'long_distance\')"') } else {document.write(' href="/residential_customers/att_home_phone/long_distance.html?id=' + state + '" ');}
												document.write(' title="Larga distancia nacional">Larga distancia nacional</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'long_distance\')"') } else {document.write(' href="/residential_customers/att_home_phone/long_distance.html?id=' + state + '" ');}
												document.write(' title="Larga distancia internacional">Larga distancia internacional</a></li>');
document.write('                <li><a href="http://www.wireless.att.com/cell-phone-service/?locale=es_US" title="Servicio m&oacute;vil">Servicio m&oacute;vil</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-04" class="quick-links-box">');
document.write('                <h6>AT&amp;T U-verse...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_tv\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + state + '" ');}
												document.write(' title="U200 Latino">U200 Latino</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_tv\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + state + '" ');}
												document.write(' title="Canales en espa&ntilde;ol">Canales en espa&ntilde;ol</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_services\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_services/index.html?id=' + state + '" ');}
												document.write(' title="Servicios &uacute;nicos">Servicios &uacute;nicos</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_ofertas\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_offers/index.html?id=' + state + '" ');}
												document.write(' title="Ofertas">Ofertas</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-05" class="quick-links-box last">');
document.write('                <h6>Televisi&oacute;n digital de AT&amp;T...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'directv\')"') } else {document.write(' href="/residential_customers/att_advanced_tv/directv.html?id=' + state + '" ');}
												document.write(' title="AT&amp;T | DIRECTV">AT&amp;T | DIRECTV</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_home\')"') } else {document.write(' href="/residential_customers/att_uverse/index.html?id=' + state + '" ');}
												document.write(' title="U-verse">AT&amp;T U-verse</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        </div>');
}


function renderNewsroomBox() {
	

	
	
document.write(' <div id="alerts-box" class="section">');
document.write(' <h6>Alertas de Noticias</h6>');
document.write(' <p>Alertas de noticias actualizadas por medio de RSS</p>');
document.write(' <ul>');
document.write(' <li>');
document.write(' <ul id="rss-menu">');
document.write(' <li><a href="http://att.centralcast.net/rssespanol/" target="_blank" title="RSS">RSS</a></li>');
document.write(' <li class="nb"><a href="http://att.centralcast.net/rssespanol/" target="_blank" title="&iquest;Qu&eacute; es RSS?">&iquest;Qu&eacute; es RSS?</a></li>');
document.write(' </ul>');
document.write(' <div class="clear"></div>');
document.write(' </li>');
document.write(' <li><a href="#contact" id="contact-news" title="Contactos para medios de comunicaci&oacute;n">Contactos para medios<br />de comunicaci&oacute;n</a></li>');
document.write(' <li><a href="http://www.att.com/newsroom" title="English News Room">English News Room</a></li>');
document.write(' </ul>');
document.write(' </div>'); 
document.write(' <div id="conectada-box" class="section '); 
if(directory == 'media_kits' || directory == 'useful_information' ) {} else if (section == 'newsroom' && directory == 'index') {} else {document.write(' nbb');}
document.write(' ">');
document.write(' <h6>La Casa Conectada</h6>');
document.write('<p><a href="/help/conectada/index.html?id=' + state + '" title="La Casa Conectada">Columna con informaci&oacute;n relevante a tus necesidades, consejos y preguntas m&aacute;s comunes.</a></p>');
document.write(' </div>     ');
}

function renderLatestReleases() {
document.write('<div class="section nbb">');
document.write('<h6>Titulares</h6>');

document.write('<div class="rc-release-box">'); 
document.write('<p>26 de febrero de 2013<br />');
document.write('<a href="/newsroom/news_releases/hacemos_2-28-13.html?id=' + state + '" title="Hacemos celebra la jornada nacional de alta tecnolog&#237;a para inspirar a los estudiantes a seguir carreras de ciencias e ingenier&#237;a">Hacemos celebra la jornada nacional de alta tecnolog&#237;a para inspirar a los estudiantes a seguir carreras de ciencias e ingenier&#237;a</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>21 de febrero de 2013<br />');
document.write('<a href="/newsroom/news_releases/florida_2-21-13.html?id=' + state + '" title="AT&T invirti&#243; m&#225;s de $2.8 mil millones en Florida entre 2010 y 2012 para mejorar la velocidad, confiabilidad y rendimiento para los clientes">AT&T invirti&#243; m&#225;s de $2.8 mil millones en Florida entre 2010 y 2012 para mejorar la velocidad, confiabilidad y rendimiento para los clientes</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>31 de enero de 2013<br />');
document.write('<a href="/newsroom/news_releases/seguridad_en_linea_1-31-13.html?id=' + state + '" title="Seguridad en l&#237;nea&#58; herramientas y consejos para protegerse al usar el Internet">Seguridad en l&#237;nea&#58; herramientas y consejos para protegerse al usar el Internet</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>30 de enero de 2013<br />');
document.write('<a href="/newsroom/news_releases/blackberry_10_1_30_13.html?id=' + state + '" title="AT&#38;T planea lanzar al mercado los equipos smartphone Blackberry Z10 y Blackberry Q10 con Blackberry 10 para clientes particulares y comerciales">AT&#38;T planea lanzar al mercado los equipos smartphone Blackberry Z10 y Blackberry Q10 con Blackberry 10 para clientes particulares y comerciales</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>7 de enero de 2013<br />');
document.write('<a href="/newsroom/news_releases/puede_esperar_1_7_13.html?id=' + state + '" title="AT&#38;T ampliar&#225;  el alcance de la campa&#241;a &#8220;Puede esperar&#8221; en 2013">AT&#38;T ampliar&#225;  el alcance de la campa&#241;a &#8220;Puede esperar&#8221; en 2013</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">');
document.write('<p>19 de diciembre del 2012<br />');
document.write('<a href="/newsroom/news_releases/business_traveler_12_19_12.html?id=' + state + '" title="Lectores de Business Traveler nombran a AT&amp;T el mejor proveedor de telefonia movil y cobertura de datos a nivel mundial">Lectores de Business Traveler nombran a AT&amp;T el mejor proveedor de telefonia movil y cobertura de datos a nivel mundial</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>16 de noviembre de 2012<br />');
document.write('<a href="/newsroom/news_releases/global_messaging_11_15_12.html" title="Con los nuevos paquetes internacionales de AT&T, los viajeros pueden llamar, enviar mensajes de texto, publicar mensajes en Twitter y actualizaciones de estado desde el exterior a mejores precios">Con los nuevos paquetes internacionales de AT&T, los viajeros pueden llamar, enviar mensajes de texto, publicar mensajes en Twitter y actualizaciones de estado desde el exterior a mejores precios</a></p>');
document.write('</div>');

document.write('<div class="rc-release-box">'); 
document.write('<p>20 de septiembre de 2012<br />');
document.write('<a href="/newsroom/news_releases/att_company_of_year_9-20-12.html?id=' + state + '" title="AT&amp;T es nombrada empresa del a&ntilde;o por la c&aacute;mara de comercio hispana de los EE. UU.">AT&amp;T es nombrada empresa del a&ntilde;o por la c&aacute;mara de comercio hispana de los EE. UU.</a></p>');
document.write('</div>');



document.write('<div class="rc-release-box">');
document.write('<p class="arrow"> <a href="/newsroom/news_archive.html?id=' + state + '" title="Ver archivos">Ver archivos</a></p>');
document.write('</div>');

document.write('</div>');
}


function shareThis() {
	document.write('<div class="share-this"><scr' + 'ipt type="text/javasc' + 'ript" src="http://w.sharethis.com/button' + '/sharethis.js#publisher=f627f4e4-ac1c-41c0-8a6f-a3358d73fa59&type=website&buttonText=Compartir"></sc' + 'ript></div>');
}





function renderAyudaRightCol() { 
						document.write('<div id="premios-box" class="section">'); 
						document.write('<p><a href="https://referral.wireless.att.com/postpaid/es/home/landing.do " title="Recomienda a tus familiares y amigos">Recomienda a tus<br />familiares y amigos y<br />gana hasta $599<br /> al a&ntilde;o.</a></p>');
						document.write('</div>');
		 

						
						document.write('<div class="section nbb">');
 						document.write('<h6>Facturaci&oacute;n y Pago</h6>');
						document.write('<p><a href="/help/faqs/billing.html?id=' + state + '" title="Informaci&oacute;n sobre opciones de facturaci&oacute;n y pago">Informaci&oacute;n sobre opciones de facturaci&oacute;n y pago</a>.</p>');
 						document.write('<h6>Nuevo Servicio Telef&oacute;nico</h6>');
						document.write('<p><a href="https://www.att.com/Common/espanol/order_form.html?id=' + state + '&prod=new_phone_service" title="&iquest;Cliente nuevo? Suscr&iacute;bete aqu&iacute;.">&iquest;Cliente nuevo? Suscr&iacute;bete aqu&iacute;</a>.</p>');
 						document.write('<h6>AT&amp;T facilita toda tu mudanza</h6>');
						document.write('<p><a href="/help/att_move/index.html?id=' + state + '" title="&iquest;Te est&aacute;s mudando? Con AT&amp;T facilita toda tu mudanza, encontrar&aacute;s todo lo necesario para mudarte a tu nueva casa.">&iquest;Te est&aacute;s mudando? Con AT&amp;T Facilita Toda Tu Mudanza, encontrar&aacute;s todo lo necesario para mudarte a tu nueva casa.</a>.</p>');
 						document.write('<h6>La Casa Conectada</h6>');
						document.write('<p><a href="/help/conectada/index.html?id=' + state + '" title="Columna con informaci&oacute;n relevante a tus necesidades, consejos y preguntas m&aacute;s comunes.">Columna con informaci&oacute;n relevante a tus necesidades, consejos y preguntas m&aacute;s comunes</a>.</p>');
						document.write('</div>');
}


function renderMoveRightCol() {
						document.write('<div class="section nbb">');
						document.write('<h6>Recursos Adicionales</h6>');
						document.write('<p>Gu&iacute;a de mudanza para negocios<br /><a href="/help/att_move/moving_tips.html?id=' + state + '" title="Gu&iacute;a de mudanza para negocios"  >M&aacute;s Informaci&oacute;n >> </a> </p>');
						document.write('<p>Gu&iacute;a de mudanza para negocios<br /><a href="/mlcomm/documents/att_moving_guide.pdf"  title="Gu&iacute;a de mudanza para negocios PDF " target="_blank">Descargar el PDF >>  </a></p>');
						document.write('</div>');
}

//this include pulls into the contact us page
function renderLlamanosCol() {
		document.write('<div class="bottom-col">');
		document.write('<p class="header"><img src="/mlcomm/_images/help/contact/header_llamanos.jpg" width="300" height="115" alt="Call Us" /></p>');
		document.write('<p>Para servicio al cliente en espa&ntilde;ol, llama al <span class="orange-txt-col"></span> <strong>877-677-1330</strong> y 611  desde tu tel&eacute;fono m&oacute;vil.</p>');
		document.write('<p><span class="orange-txt-col">Star Services (*Services)</span> se ofrecen en cualquier equipo m&oacute;vil AT&amp;T. Esta funci&oacute;n es GRATIS y le permite a los clientes tener f&aacute;cil acceso a informaci&oacute;n sobre su cuenta desde sus tel&eacute;fonos m&oacute;vil.</p>');
		document.write('<p><em>Hay cuatro *servicios que se ofrecen en espa&ntilde;ol:</em></p>');
		document.write('<p><span class="orange-txt-col">Marca *USO# (*876#) y presiona Send</span> - Consulta tus minutos disponibles</p>');
		document.write('<p><span class="orange-txt-col">Marca *DATO# (*3286#) y presiona Send</span> - Consulta el saldo actual de tu plan de datos</p>');
		document.write('<p><span class="orange-txt-col">Marca *SAL# (*725#) y presiona Send</span> - Consulta tu factura y el &uacute;ltimo pago recibido</p>');
		document.write('<p><span class="orange-txt-col">Marca *PAGAR# (*72427#) y presiona Send</span> - Realiza el pago de una factura</p>');
		document.write('</div>');		
}

//this include pulls into the facebook tab
function renderLlamanosColFB() {
		document.write('<div class="bottom-col">');
		document.write('<p class="header"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/help/contact/header_llamanos.jpg" width="300" height="115" alt="Call Us" /></p>');
		document.write('<p>Para servicio al cliente en espa&ntilde;ol, llama al <span class="orange-txt-col"></span> <strong>877-677-1330</strong> y 611  desde tu tel&eacute;fono m&oacute;vil.</p>');
		document.write('<p><span class="orange-txt-col">Star Services (*Services)</span> se ofrecen en cualquier equipo m&oacute;vil AT&amp;T. Esta funci&oacute;n es GRATIS y le permite a los clientes tener f&aacute;cil acceso a informaci&oacute;n sobre su cuenta desde sus tel&eacute;fonos m&oacute;vil.</p>');
		document.write('<p><em>Hay cuatro *servicios que se ofrecen en espa&ntilde;ol:</em></p>');
		document.write('<p><span class="orange-txt-col">Marca *USO# (*876#) y presiona Send</span> - Consulta tus minutos disponibles</p>');
		document.write('<p><span class="orange-txt-col">Marca *DATO# (*3286#) y presiona Send</span> - Consulta el saldo actual de tu plan de datos</p>');
		document.write('<p><span class="orange-txt-col">Marca *SAL# (*725#) y presiona Send</span> - Consulta tu factura y el &uacute;ltimo pago recibido</p>');
		document.write('<p><span class="orange-txt-col">Marca *PAGAR# (*72427#) y presiona Send</span> - Realiza el pago de una factura</p>');
		document.write('</div>');		
}

//this include pulls into the contact us page
function renderPreguntasCol() {
		document.write('<div class="bottom-col">');
		document.write('<p class="header"><img src="/mlcomm/_images/help/contact/header_preguntas_frecuentes.jpg" width="327" height="114" alt="FAQs" /></p>');
		document.write('<p> &iquest;Tienes dudas sobre tus opciones de facturaci&oacute;n y pago, servicios disponibles para tu mudanza, u otros temas de inter&eacute;s? En esta secci&oacute;n podr&aacute;s encontrar las respuestas a las preguntas m&aacute;s comunes relacionadas a estos temas.<br />');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/faqs/billing.html?id=' + state + '" title="Facturaci&oacute;n" class="arrow">Facturaci&oacute;n</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/conectada/index.html?id=' + state + '" title="Casa Conectada" class="arrow">Casa Conectada</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/faqs/area_codes.html?id=' + state + '" title="C&oacute;digos de &aacute;rea" class="arrow">C&oacute;digos de &aacute;rea</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/att_move/index.html?id=' + state + '" title="Mudanza" class="arrow">Mudanza</a>');
		document.write('</p>');                  
		document.write('</div>');
}

//this include pulls into the facebook tab
function renderPreguntasColFB() {
		document.write('<div class="bottom-col">');
		document.write('<p class="header"><img src="https://www.att.com/Common/world_att/sp/mlcomm/_images/help/contact/header_preguntas_frecuentes.jpg" width="327" height="114" alt="FAQs" /></p>');
		document.write('<p> &iquest;Tienes dudas sobre tus opciones de facturaci&oacute;n y pago, servicios disponibles para tu mudanza, u otros temas de inter&eacute;s? En esta secci&oacute;n podr&aacute;s encontrar las respuestas a las preguntas m&aacute;s comunes relacionadas a estos temas.<br />');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/faqs/billing.html?id=' + state + '" title="Facturaci&oacute;n" class="arrow">Facturaci&oacute;n</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/conectada/index.html?id=' + state + '" title="Casa Conectada" class="arrow">Casa Conectada</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/faqs/area_codes.html?id=' + state + '" title="C&oacute;digos de &aacute;rea" class="arrow">C&oacute;digos de &aacute;rea</a>');
		document.write('</p>');
		document.write('<p>');
		document.write('<a href="/help/att_move/index.html?id=' + state + '" title="Mudanza" class="arrow">Mudanza</a>');
		document.write('</p>');                  
		document.write('</div>');
}


function renderFooter() {
	document.write('<div class="clear"></div>');
	document.write('<div id="inner-footer">');
	document.write('<ul id="footerNav">');
	document.write('    	<li><a href="/index.html?id=' + state + '" title="Portada">Portada</a></li>');
	document.write('    	<li><a href="/about_att/index.html?id=' + state + '" title="Acerca de AT&amp;T">Acerca de AT&amp;T </a></li>');
	document.write('    	<li><a href="http://www.att.com/gen/careers?pid=1" title="Empleos">Empleos</a></li>');
	document.write('    	<li><a href="http://www.wireless.att.com/find-a-store/" title="Buscar tienda">Buscar tienda</a></li>');
	document.write('    	<li><a href="/help/contact_us.html?id=' + state + '" title="Cont&aacute;ctanos">Cont&aacute;ctanos</a></li>');
	document.write('    	<li><a href="/privacy_policy/index.html?id=' + state + '" title="Pol&iacute;tica de privacidad">Pol&iacute;tica de privacidad</a></li>');
	document.write('    	<li><a href="/privacy_policy/privacy_terms_of_use.html?id=' + state + '" title="T&eacute;rminos de uso">T&eacute;rminos de uso</a></li>');
	document.write('    	<li><a href="/about_att/net_neutrality.html?id=' + state + '" class="nb" title="Broadband Management">Broadband Management</a></li>');
	document.write('    </ul>');
	document.write('    <div class="clear"></div>');
	document.write('    <p><a href="http://www.att.com/gen/privacy-policy?pid=2587" class="nb" title="AT&amp;T Intellectual Property">&copy; 2003-2012 AT&amp;T Intellectual Property.</a>  Todos los derechos reservados. <a href="http://www.yellowpages.com" class="nb">YELLOWPAGES.COM</a></p>');
	document.write('</div>');
	
	document.write('<div id="pop"> </div>');
}


function renderFooterOrderForm() {
	document.write('<div class="clear"></div>');
	document.write('<div id="inner-footer">');
	document.write('<ul id="footerNav">');
	document.write('    	<li><a href="http://espanol.att.com/index.html?id=' + state + '" title="Portada">Portada</a></li>');
	document.write('    	<li><a href="http://espanol.att.com/about_att/index.html?id=' + state + '" title="Acerca de AT&amp;T">Acerca de AT&amp;T </a></li>');
	document.write('    	<li><a href="http://www.att.com/gen/careers?pid=1" title="Empleos">Empleos</a></li>');
	document.write('    	<li><a href="http://www.wireless.att.com/find-a-store/" title="Buscar Tienda">Buscar Tienda</a></li>');
	document.write('    	<li><a href="http://espanol.att.com/help/contact_us.html?id=' + state + '" title="Cont&aacute;ctanos">Cont&aacute;ctanos</a></li>');
	document.write('    	<li><a href="/privacy_policy/index.html?id=' + state + '" title="Pol&iacute;tica de Privacidad">Pol&iacute;tica de Privacidad</a></li>');
	document.write('    	<li><a href="/privacy_policy/privacy_terms_of_use.html?id=' + state + '" title="T&eacute;rminos de uso">T&eacute;rminos de uso</a></li>');
	document.write('    	<li><a href="http://espanol.att.com/about_att/net_neutrality.html?id=' + state + '" class="nb" title="Broadband Management">Broadband Management</a></li>');
	document.write('    </ul>');
	document.write('    <div class="clear"></div>');
	document.write('    <p><a href="http://www.att.com/gen/privacy-policy?pid=2587" class="nb" title="AT&amp;T Intellectual Property">Â© 2003-2012 AT&amp;T Intellectual Property.</a>  Todos los derechos reservados. <a href="http://www.yellowpages.com" class="nb">YELLOWPAGES.COM</a></p>');
	document.write('</div>');	
	document.write('<div id="pop"> </div>');
	//added 10/11/2012 [KD]
	document.write('<s'+'cript src="//www.att.com/webtrends/scripts/dcs_tag.js" type="text/javascript"></script>');
}
 


function renderUverseProductMenu() {
	document.write('<div class="section">');
	document.write('<h6>Servicios AT&amp;T U-verse<sup>&reg;</sup></h6>');
	document.write('<ul id="uverse-products-menu">');
	document.write('<li id="bundles"><a href="/residential_customers/att_uverse/uverse_offers/index.html?id=' + state + '" title="Paquetes AT&amp;T U-verse&reg; Choice">Paquetes AT&amp;T U-verse<sup>&reg;</sup> Choice</a></li>');
	document.write('<li id="tv"><a href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + state + '" title="AT&amp;T U-verse&reg; TV">AT&amp;T U-verse<sup>&reg;</sup>  TV</a></li>');
	document.write('<li id="internet"><a href="/residential_customers/att_uverse/uverse_internet/index.html?id=' + state + '" title="Servicio de Internet de Alta Velocidad AT&amp;T U-verse<sup>&reg;</sup>">Servicio de Internet de Alta Velocidad AT&amp;T U-verse<sup>&reg;</sup></a></li>');
	document.write('<li id="dvr"><a href="/residential_customers/att_uverse/uverse_offers/total_home_dvr.html?id=' + state + '" title="Total Home DVR">Total Home DVR</a></li>');
	document.write('<li id="phone"><a href="/residential_customers/att_uverse/uverse_voice/index.html?id=' + state + '" title="Servicio Tel&eacute;fono Digital AT&amp;T U-verse<sup>&reg;</sup>">Servicio Tel&eacute;fono Digital AT&amp;T U-verse<sup>&reg;</sup></a></li>');
	document.write('<li id="wireless"><a href="/residential_customers/att_uverse/uverse_wireless/index.html?id=' + state + '" title="Receptor inal&aacute;mbrico de TV de AT&amp;T U-verse<sup>&reg;</sup>">Receptor inal&aacute;mbrico de TV de AT&amp;T U-verse<sup>&reg;</sup></a></li>');
	document.write('</ul>');
	document.write('</div>');
                    
	document.write('<div class="section ">');
	document.write('<h6>Gu&iacute;a de Canales</h6>');
	document.write('<p id="channel-guide"><a href="#canales" onclick="open(\'http://www.udigtv.com/urock/lineup/urd5.aspx?urockz\',\'\',\'width=775,height=750\')"  title="Ver los Canales">Ver los Canales</a><br />(en ingl&eacute;s)</p>');
            
	document.write('</div>');
                    
	document.write('<div class="section nbb">'); 
	document.write('<p class="arrow"><a href="/legal_terms/disclaimers/att_uverse.html?id=' + state +'" title="Informaci&oacute;n importante sobre las ofertas">Informaci&oacute;n importante</a> sobre las ofertas</p>');
            
	document.write('</div>');
}


function renderLandingPageBottom() {
	document.write('<div id="all-products-box" class="content-box-half"> ');
	document.write('<h6>&iquest;Tienes una pregunta con respecto a los productos y servicios de AT&amp;T?</h6>');
	document.write('<p><a href="/help/index.html?id=' + state + '" title="M&aacute;s informaci&oacute;n">M&aacute;s informaci&oacute;n >></a></p>');
	document.write('</div>');
                
	document.write('<div id="move-att-box" class="content-box-half last"> ');
	document.write('<h6><em>&iquest;Te est&aacute;s mudando?</em> AT&amp;T facilita toda tu mudanza</h6>');
	document.write('<p><a href="/help/att_move/index.html?id=' + state + '" title="M&aacute;s informaci&oacute;n">M&aacute;s informaci&oacute;n >></a></p>');
	//removed10/11/2012 [KD]
	/*document.write('<s'+'cript src="//www.att.com/webtrends/scripts/dcs_tag.js" type="text/javascript"></script>');*/
	document.write('</div>');
}





function renderAnalyticsCode() {
document.write("<script>");
document.write(" url = location.href; ");
document.write("checkLive = url.indexOf(\'espanol.att.com\');  ");  
document.write(" if(checkLive != \'-1\') { ");
document.write(" var _gaq = _gaq || []; ");  
document.write("  _gaq.push(['_setAccount', 'UA-273710-15']); ");  
document.write("  _gaq.push(['_setDomainName', '.att.com']); ");  
document.write("  _gaq.push(['_setAllowHash', false]);"); 
document.write("  _gaq.push(['_trackPageview']); "); 

document.write(" (function() {"); 
document.write("    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"); 
document.write("    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"); 
document.write("    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"); 
document.write("  })();"); 
document.write("}  "); 
document.write("</script>"); 
//added 10/11/2012 [KD]
	document.write('<s'+'cript src="//www.att.com/webtrends/scripts/dcs_tag.js" type="text/javascript"></script>');
document.write('<s'+'cript language="JavaScript" src="http://switch.atdmt.com/jaction/cntcin_HispanicVisitorsUAT_10"></script><noscript><iframe src="http://switch.atdmt.com/iaction/cntcin_HispanicVisitorsUAT_10" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe></noscript>');
}


function renderAnalyticsCodeOrderForm() {
document.write("<script>"); 
document.write(" var _gaq = _gaq || []; ");  
document.write("  _gaq.push(['_setAccount', 'UA-273710-15']); ");  
document.write("  _gaq.push(['_setDomainName', '.att.com']); ");  
document.write("  _gaq.push(['_setAllowHash', false]);"); 
document.write("  _gaq.push(['_trackPageview']); "); 

document.write(" (function() {"); 
document.write("    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"); 
document.write("    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"); 
document.write("    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"); 
document.write("  })();");  
document.write("</script>"); 

document.write('<s'+'cript language="JavaScript" src="http://switch.atdmt.com/jaction/cntcin_HispanicVisitorsUAT_10"></script><noscript><iframe src="http://switch.atdmt.com/iaction/cntcin_HispanicVisitorsUAT_10" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe></noscript>');
//added 10/11/2012 [KD]
	document.write('<s'+'cript src="//www.att.com/webtrends/scripts/dcs_tag.js" type="text/javascript"></script>');
}