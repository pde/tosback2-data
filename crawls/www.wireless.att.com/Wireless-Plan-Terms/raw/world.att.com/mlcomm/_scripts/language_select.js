// JavaScript Document

 


function renderLanguageSelectMenu(setLanguage) {   
if($('#order-now').is('.lightboxon')) {
	 currentLocation = '.att.com/Common/world/' + setLanguage + '/order_form.html';
	 stateID = ' ';
	 linkTitle = "Order Now";
	  $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }

if($('#chinese-drop').is('.lightboxon') || $('#chinese-drop1').is('.lightboxon') || $('#chinese-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#chinese-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('&#36984;&#25799;&#24744;&#23621;&#20303;&#30340;&#24030;');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>&#28858;&#20102;&#33021;&#25552;&#20379;&#24744;&#26356;&#20339;&#30340;&#26381;&#21209;&#65292;&#35531;&#36984;&#19968;&#31278;&#35486;&#35328;&#21644;&#19968;&#20491;&#24030;&#12290;&#36889;&#27171;&#21487;&#21332;&#21161;&#25105;&#20497;&#28858;&#24744;&#25214;&#20986;&#36020;&#22320;&#21312;&#30340; AT&amp;T &#27597;&#35486;&#26381;&#21209;&#12289;&#20419;&#37559;&#27963;&#21205;&#12289;&#21644;&#29986;&#21697;&#12290;</p>');
	 $('.ss-close').html('&#38364;&#38281; X');
 }
 if($('#japanese-drop').is('.lightboxon') || $('#japanese-drop1').is('.lightboxon') || $('#japanese-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#japanese-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('&#12362;&#20303;&#12414;&#12356;&#12398;&#24030;&#12434;&#36984;&#25246;&#12375;&#12390;&#12367;&#12384;&#12373;&#12356;');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>&#12362;&#23458;&#27096;&#12395;&#12424;&#12426;&#12424;&#12356;&#12469;&#12540;&#12499;&#12473;&#12434;&#12362;&#23626;&#12369;&#12391;&#12365;&#12427;&#12424;&#12358;&#12395;&#12289;&#35328;&#35486;&#12392;&#24030;&#12434;&#36984;&#25246;&#12375;&#12390;&#12367;&#12384;&#12373;&#12356;&#12290;&#12371;&#12428;&#12395;&#12424;&#12426;AT&amp;T&#12399;&#12289;&#12362;&#20303;&#12414;&#12356;&#12398;&#22320;&#22495;&#12391;&#12372;&#21033;&#29992;&#12356;&#12383;&#12384;&#12369;&#12427;&#12362;&#23458;&#27096;&#12398;&#35328;&#35486;&#12391;&#12398;&#12469;&#12540;&#12499;&#12473;&#12289;&#12503;&#12525;&#12514;&#12540;&#12471;&#12519;&#12531;&#12289;&#35069;&#21697;&#12434;&#29305;&#23450;&#12377;&#12427;&#12371;&#12392;&#12364;&#12391;&#12365;&#12414;&#12377;&#12290;</p>');
	 $('.ss-close').html('&#38281;&#12376;&#12427; X');
 }
 if($('#korean-drop').is('.lightboxon') || $('#korean-drop1').is('.lightboxon') || $('#korean-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#korean-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('&#44144;&#51452;&#54616;&#49884;&#45716; &#51452;&#47484; &#49440;&#53469;&#54616;&#49901;&#49884;&#50724;.');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>&#44256;&#44061;&#45784;&#44760; &#45908;&#50865; &#45208;&#51008; &#49436;&#48708;&#49828;&#47484; &#51228;&#44277;&#54624; &#49688; &#51080;&#46020;&#47197; &#50616;&#50612; &#48143; &#51452;&#47484; &#49440;&#53469;&#54644; &#51452;&#49901;&#49884;&#50724;. &#44144;&#51452;&#51648;&#50669;&#51032; AT&amp;T &#49436;&#48708;&#49828; &#48143; &#51228;&#54408;, &#54861;&#48372; &#54665;&#49324;&#47484; &#48372;&#49892; &#49688; &#51080;&#49845;&#45768;&#45796;.</p>');
	 $('.ss-close').html('&#52285;&#45803;&#44592; X');
 }
 if($('#tagalog-drop').is('.lightboxon') || $('#tagalog-drop1').is('.lightboxon') || $('#tagalog-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#tagalog-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('Piliin ang estado na iyong kinaroroonan');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>Para matulungan kami na ikaw ay mapagsilbihan nang mas mahusay, pumili ng wika at estado. Ito ang magbibigyang-daan sa amin na matukoy kung alin sa mga serbisyong nasa wika, promo at produkto ng AT&T ang makukuha sa iyong lugar.</p>');
	 $('.ss-close').html('Isara X');
 }
 if($('#vietnamese-drop').is('.lightboxon') || $('#vietnamese-drop1').is('.lightboxon') || $('#vietnamese-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#vietnamese-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('Ch&#7885;n ti&#7875;u bang qu&#253; v&#7883; c&#432; ng&#7909;');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>&#272;&#7875; gi&#250;p ch&#250;ng t&#244;i ph&#7909;c v&#7909; qu&#253; v&#7883; t&#7889;t h&#417;n, xin vui l&#242;ng ch&#7885;n m&#7897;t ng&#244;n ng&#7919; v&#224; ti&#7875;u bang. &#272;i&#7873;u n&#224;y s&#7869; cho ch&#250;ng t&#244;i nh&#7853;n di&#7879;n nh&#7919;ng d&#7883;ch v&#7909; n&#224;o c&#7911;a AT&amp;T c&#243; cung c&#7845;p ng&#244;n ng&#7919; t&#7841;i ch&#7895;, c&#225;c qu&#7843;ng c&#225;o h&#7841; gi&#225; v&#224; s&#7843;n ph&#7849;m c&#243; s&#7861;n trong khu v&#7921;c c&#7911;a qu&#253; v&#7883;.</p>');
	 $('.ss-close').html('&#272;&#243;ng X');
 }
 if($('#polish-drop').is('.lightboxon') || $('#polish-drop1').is('.lightboxon') || $('#polish-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#polish-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('Wybierz stan, w kt&#243;rym mieszkasz');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>Aby&#347;my mogli lepiej Pa&#324;stwa obs&#322;u&#380;y&#263;, prosimy wybra&#263; j&#281;zyk i stan. Pozwoli nam to odpowiednio dobra&#263; us&#322;ugi, promocje i produkty dost&#281;pne w wybranym j&#281;zyku na danym terenie.</p>');
	 $('.ss-close').html('Zamknij X');
 }
 if($('#russian-drop').is('.lightboxon') || $('#russian-drop1').is('.lightboxon') || $('#russian-drop2').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Chinese";
	 $('.lang-box').hide();
	 $('#russian-box').show();
	 $('#ss-left h3').hide();
	 $('#lang-title h3').html('&#1042;&#1099;&#1073;&#1077;&#1088;&#1080;&#1090;&#1077; &#1096;&#1090;&#1072;&#1090;, &#1074; &#1082;&#1086;&#1090;&#1086;&#1088;&#1086;&#1084; &#1074;&#1099; &#1087;&#1088;&#1086;&#1078;&#1080;&#1074;&#1072;&#1077;&#1090;&#1077;.');
	 $('#lang-title2 h3').hide();
	 $('#lang-top-text').html('<p>&#1055;&#1088;&#1086;&#1089;&#1080;&#1084; &#1074;&#1099;&#1073;&#1088;&#1072;&#1090;&#1100; &#1103;&#1079;&#1099;&#1082; &#1080; &#1096;&#1090;&#1072;&#1090;: &#1101;&#1090;&#1086; &#1087;&#1086;&#1084;&#1086;&#1078;&#1077;&#1090; &#1087;&#1086;&#1076;&#1086;&#1073;&#1088;&#1072;&#1090;&#1100; &#1076;&#1083;&#1103; &#1074;&#1072;&#1089; &#1091;&#1089;&#1083;&#1091;&#1075;&#1080; &#1080; &#1088;&#1077;&#1082;&#1083;&#1072;&#1084;&#1085;&#1099;&#1077; &#1087;&#1088;&#1077;&#1076;&#1083;&#1086;&#1078;&#1077;&#1085;&#1080;&#1103; AT&amp;T &#1085;&#1072; &#1074;&#1072;&#1096;&#1077;&#1084; &#1088;&#1086;&#1076;&#1085;&#1086;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;, &#1087;&#1088;&#1077;&#1076;&#1086;&#1089;&#1090;&#1072;&#1074;&#1083;&#1103;&#1077;&#1084;&#1099;&#1077; &#1087;&#1086; &#1084;&#1077;&#1089;&#1090;&#1091; &#1074;&#1072;&#1096;&#1077;&#1075;&#1086; &#1078;&#1080;&#1090;&#1077;&#1083;&#1100;&#1089;&#1090;&#1074;&#1072;.</p>');
	 $('.ss-close').html('&#1047;&#1072;&#1082;&#1088;&#1099;&#1090;&#1100; X');
 }
if($('#shop').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/index.html';
	 stateID = ' ';
	 linkTitle = "Shop";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#help').is('.lightboxon')) {
	 currentLocation = '.att.com/help/index.html';
	 stateID = ' ';
	 linkTitle = "Shop";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#news').is('.lightboxon')) {
	 currentLocation = '.att.com/newsroom/index.html';
	 stateID = ' ';
	 linkTitle = "Shop";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#about').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/index.html';
	 stateID = ' ';
	 linkTitle = "Shop";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 
 if($('#about2').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/index.html';
	 stateID = ' ';
	 linkTitle = "Shop";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#advanced-tv').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_advanced_tv/index.html';
	 stateID = ' ';
	 linkTitle = "Advanced Television";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#internet').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_internet/index.html';
	 stateID = ' ';
	 linkTitle = "Advanced Television";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#telephone').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_home_phone/index.html';
	 stateID = ' ';
	 linkTitle = "Advanced Television";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();	 
 }
if($('#contact').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/contact_us.html';
	 stateID = ' ';
	 linkTitle = "Advanced Television";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#contact2').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/contact_us.html';
	 stateID = ' ';
	 linkTitle = "Advanced Television";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#promo-uverse').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#promo-uverse1').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#safety-seniors').is('.lightboxon')) {
	 currentLocation = '.att.com/help/internet_safety_seniors.html';
	 stateID = ' ';
	 linkTitle = "Online Safety for Seniors";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#newsroom').is('.lightboxon')) {
	 currentLocation = '.att.com/newsroom/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T News";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickLang').is('.lightboxon')) {
	 currentLocation = '.att.com/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T World";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickPromo').is('.lightboxon')) {
	 currentLocation = '.att.com/legal_terms/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Promotions";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickLegal').is('.lightboxon')) {
	 currentLocation = '.att.com/legal_terms/index.html';
	 stateID = ' ';
	 linkTitle = "AT&T Promotions";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickContact').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/contact_us.html';
	 stateID = ' ';
	 linkTitle = "AT&T Promotions";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#quickContact2').is('.lightboxon')) {
	 currentLocation = '.att.com/about_att/contact_us.html';
	 stateID = ' ';
	 linkTitle = "AT&T Promotions";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickHSI').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_internet/high_speed_internet.html';
	 stateID = ' ';
	 linkTitle = "AT&T High Speed Internet";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#quickHSI2').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_internet/high_speed_internet.html';
	 stateID = ' ';
	 linkTitle = "AT&T High Speed Internet";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickDSL').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_internet/dsl_direct.html';
	 stateID = ' ';
	 linkTitle = "AT&T High Speed Internet";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickUverse').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_tv.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickPhone').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_home_phone/home_phone.html';
	 stateID = ' ';
	 linkTitle = "AT&T Home Phone";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickDLD').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_home_phone/domestic_long_distance.html';
	 stateID = ' ';
	 linkTitle = "AT&T Home Phone";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickLDI').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_home_phone/international_long_distance.html';
	 stateID = ' ';
	 linkTitle = "AT&T Home Phone";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#quickLDI2').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_home_phone/international_long_distance.html';
	 stateID = ' ';
	 linkTitle = "AT&T Home Phone";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickUverseTV').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_tv.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 if($('#quickUverseTV2').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_tv.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickUverseVoice').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_voice.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickUverseInternet').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_internet.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickUverseProg').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_uverse/uverse_programming.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickDTV').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_advanced_tv/directv.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
if($('#quickDTVProg').is('.lightboxon')) {
	 currentLocation = '.att.com/residential_customers/att_advanced_tv/directv_programming.html';
	 stateID = ' ';
	 linkTitle = "AT&T U-verse";
	 $('#japanese-box').hide();
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }
 
 if($('#TWD_nr').is('.lightboxon')) {
	 currentLocation = '.att.com/newsroom/releases/2012/att_twd_8-15-12.html';
	 stateID = ' ';
	 linkTitle = "It can wait";
	 $('#lang-title h3').hide();
	 $('#lang-title2 h3').show();
 }

	//DO NOT CHANGE THE ORDER OF THIS LIST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  WHEN ADDING A NEW STATE, PLEASE BE AWARE THAT THE STATES POPULATE HORIZONTALLY ACROSS THE SCREEN
	
	if(setLanguage == 'chinese') {
	var allStatesZh  = {  
									'alabama-zh' : '&#38463;&#25289;&#24052;&#39340;&#24030;',
									'illinois-zh':'&#20234;&#21033;&#35582;&#24030;', 
									'michigan-zh':'&#23494;&#35199;&#26681;&#24030;',   
									'oklahoma-zh':'&#20420;&#20811;&#25289;&#33655;&#39340;&#24030;', 
									'arkansas-zh' : '&#38463;&#32943;&#33394;&#24030;', 
									'indiana-zh':'&#21360;&#22320;&#23433;&#37027;&#24030;',
									'mississippi-zh' : '&#23494;&#35199;&#35199;&#27604;&#24030;',
									'southcarolina-zh' : '&#21335;&#21345;&#32645;&#20358;&#32013;&#24030;',
									'california-zh' : '&#21152;&#24030;', 
									'kansas-zh':'&#22570;&#34217;&#26031;&#24030;', 
									'missouri-zh': '&#23494;&#34311;&#37324;&#24030;',  
									'tennessee-zh':'&#30000;&#32013;&#35199;&#24030;',   
									'florida-zh' : '&#20315;&#32645;&#37324;&#36948;&#24030;',
									'kentucky-zh' : '&#32943;&#22612;&#22522;&#24030;',
									'northcarolina-zh' : '&#21271;&#21345;&#32645;&#20358;&#32013;&#24030;',
									'texas-zh':'&#24503;&#24030;',
									'georgia-zh' : '&#21932;&#27835;&#20126;&#24030;',
									'louisiana-zh' : '&#36335;&#26131;&#35199;&#23433;&#37027;&#24030;',
									'ohio-zh':'&#20420;&#20133;&#20420;&#24030;',
									'wisconsin-zh':'&#23041;&#26031;&#24247;&#36763;&#24030;'
									}
									$.each(allStatesZh, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#chinesemenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesZh, function(index, value) {    
									 a = index.split('-');
									 stateID = a[0];
									  $('#chinesemenu li#' + index).html('<a href="http://chinese' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
	
	
	
	
	if(setLanguage == 'japanese') {
	var allStatesJa  = {   
									'arkansas-ja' : '&#12450;&#12540;&#12459;&#12531;&#12477;&#12540;&#24030;',
									'kansas-ja' : '&#12459;&#12531;&#12470;&#12473;&#24030;',
									'oklahoma-ja' : '&#12458;&#12463;&#12521;&#12507;&#12510;&#24030;',
									'california-ja' : '&#12459;&#12522;&#12501;&#12457;&#12523;&#12491;&#12450;&#24030;',
									'missouri-ja' : '&#12511;&#12474;&#12540;&#12522;&#24030;',
									'texas-ja' : '&#12486;&#12461;&#12469;&#12473;&#24030;'
									}										   
									$.each(allStatesJa, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#japanesemenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesJa, function(index, value) {   
									 a = index.split('-');
									 stateID = a[0];
									  $('#japanesemenu li#' + index).html('<a href="http://japanese' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									   
									});  
	 
	}
	
	
	
	
	
	if(setLanguage == 'korean') {
	var allStatesKo  = {  
									'alabama-ko' : '&#50536;&#46972;&#48176;&#47560;',
									'illinois-ko':'&#51068;&#47532;&#45432;&#51060;', 
									'michigan-ko':'&#48120;&#49884;&#44148;',   
									'oklahoma-ko':'&#50724;&#53364;&#46972;&#54840;&#47560;', 
									'arkansas-ko' : '&#50500;&#52856;&#49548;', 
									'indiana-ko':'&#51064;&#46356;&#50528;&#45208;',
									'mississippi-ko' : '&#48120;&#49884;&#49884;&#54588;',
									'southcarolina-ko' : '&#49324;&#50864;&#49828;&#52880;&#47204;&#46972;&#51060;&#45208;',
									'california-ko' : '&#52888;&#47532;&#54252;&#45768;&#50500;', 
									'kansas-ko':'&#52884;&#51088;&#49828;', 
									'missouri-ko': '&#48120;&#51452;&#47532;',  
									'tennessee-ko':'&#53580;&#45348;&#49884;',   
									'florida-ko' : '&#54540;&#47196;&#47532;&#45796;',
									'kentucky-ko' : '&#52996;&#53552;&#53412;',
									'northcarolina-ko' : '&#45432;&#49828;&#52880;&#47204;&#46972;&#51060;&#45208;',
									'texas-ko':'&#53581;&#49324;&#49828;',
									'georgia-ko' : '&#51312;&#51648;&#50500;',
									'louisiana-ko' : '&#47336;&#51060;&#51648;&#50528;&#45208;',
									'ohio-ko':'&#50724;&#54616;&#51060;&#50724;',
									'wisconsin-ko':'&#50948;&#49828;&#53080;&#49888;'
									}										   
									$.each(allStatesKo, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#koreanmenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesKo, function(index, value) {   
									 a = index.split('-');
									 stateID = a[0];
									  $('#koreanmenu li#' + index).html('<a href="http://korean' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
	
	
	
	
	
	if(setLanguage == 'tagalog') {
	var allStatesTl  = {   
									'california-tl' : 'California',
									'indiana-tl':'Indiana',
									'ohio-tl':'Ohio',
									'illinois-tl':'Illinois', 
									'michigan-tl':'Michigan',   
									'wisconsin-tl':'Wisconsin'
									}											   
									$.each(allStatesTl, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#tagalogmenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesTl, function(index, value) {   
									 a = index.split('-');
									 stateID = a[0];
									  $('#tagalogmenu li#' + index).html('<a href="http://tagalog' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
	
	
	
	
	
	if(setLanguage == 'vietnamese') {
	var allStatesVi  = {  
									'alabama-vi' : 'Alabama',
									'illinois-vi':'Illinois', 
									'michigan-vi':'Michigan',   
									'oklahoma-vi':'Oklahoma', 
									'arkansas-vi' : 'Arkansas', 
									'indiana-vi':'Indiana',
									'mississippi-vi' : 'Mississippi',
									'southcarolina-vi' : 'South Carolina',
									'california-vi' : 'California', 
									'kansas-vi':'Kansas', 
									'missouri-vi': 'Missouri',  
									'tennessee-vi':'Tennessee',   
									'florida-vi' : 'Florida',
									'kentucky-vi' : 'Kentucky',
									'northcarolina-vi' : 'North Carolina',
									'texas-vi':'Texas',
									'georgia-vi' : 'Georgia',
									'louisiana-vi' : 'Louisiana',
									'ohio-vi':'Ohio',
									'wisconsin-vi':'Wisconsin'
									}										   
									$.each(allStatesVi, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#vietnamesemenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesVi, function(index, value) {  
									 a = index.split('-');
									 stateID = a[0]; 
									  $('#vietnamesemenu li#' + index).html('<a href="http://vietnamese' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
	
	
	
	
	
	if(setLanguage == 'russian') {
	var allStatesRu  = {   
									'california-ru' : '&#1050;&#1072;&#1083;&#1080;&#1092;&#1086;&#1088;&#1085;&#1080;&#1103;'
									}	 										   
									$.each(allStatesRu, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#russianmenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesRu, function(index, value) {   
									 a = index.split('-');
									 stateID = a[0];
									  $('#russianmenu li#' + index).html('<a href="http://russian' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
	
	
	
	
	
	if(setLanguage == 'polish') {
	var allStatesPo  = {   
									'california-po' : 'Kalifornia',
									'indiana-po':'Indiana',
									'ohio-po':'Ohio',
									'illinois-po':'Illinois', 
									'michigan-po':'Michigan',   
									'wisconsin-po':'Wisconsin'
									}										   
									$.each(allStatesPo, function(index, value) {  
									   if(($('#state-display').text() != index)) {$('#state-display').text('')}
									  $('#polishmenu').append('<li id="'+ index + '"></li>');
									});
								  
									 $.each(allStatesPo, function(index, value) {   
									 a = index.split('-');
									 stateID = a[0];
									  $('#polishmenu li#' + index).html('<a href="http://polish' + currentLocation +  '?id=' + stateID + '" title="' + value + '" class="initCap">' + value + '</a>');
									}); 
	 
	}
				
									
								
	


}