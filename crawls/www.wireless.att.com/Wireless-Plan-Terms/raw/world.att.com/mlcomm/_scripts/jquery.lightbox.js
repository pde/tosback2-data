/**
 * jQuery lightBox plugin
 * This jQuery plugin was inspired and based on Lightbox 2 by Lokesh Dhakar (http://www.huddletogether.com/projects/lightbox2/)
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-lightbox-0.5.js
 * @author Leandro Vieira Pinho - http://leandrovieira.com
 * @version 0.5
 * @date April 11, 2008
 * @category jQuery plugin
 * @copyright (c) 2008 Leandro Vieira Pinho (leandrovieira.com)
 * @license CCAttribution-ShareAlike 2.5 Brazil - http://creativecommons.org/licenses/by-sa/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */

// Offering a Custom Alias suport - More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
(function($) {
	/**
	 * $ is an alias to jQuery object
	 *
	 */
	$.fn.lightBox = function(settings) {
		// Settings to configure the jQuery lightBox plugin how you like
		settings = jQuery.extend({
			// Configuration related to overlay
			overlayBgColor: 		'#ffffff',		// (string) Background color to overlay; inform a hexadecimal value like: #RRGGBB. Where RR, GG, and BB are the hexadecimal values for the red, green, and blue values of the color.
			overlayOpacity:			0.8,		// (integer) Opacity value to overlay; inform: 0.X. Where X are number from 0 to 9
			// Configuration related to navigation
			fixedNavigation:		false,		// (boolean) Boolean that informs if the navigation (next and prev button) will be fixed or not in the interface.
			// Configuration related to images
			imageLoading:			'images/lightbox-ico-loading.gif',		// (string) Path and the name of the loading icon
			imageBtnPrev:			'images/lightbox-btn-prev.gif',			// (string) Path and the name of the prev button image
			imageBtnNext:			'images/lightbox-btn-next.gif',			// (string) Path and the name of the next button image
			imageBtnClose:			'images/lightbox-btn-close.gif',		// (string) Path and the name of the close btn
			imageBlank:				'images/lightbox-blank.gif',			// (string) Path and the name of a blank image (one pixel)
			// Configuration related to container image box
			containerBorderSize:	10,			// (integer) If you adjust the padding in the CSS for the container, #lightbox-container-image-box, you will need to update this value
			containerResizeSpeed:	400,		// (integer) Specify the resize duration of container image. These number are miliseconds. 400 is default.
			// Configuration related to texts in caption. For example: Image 2 of 8. You can alter either "Image" and "of" texts.
			txtImage:				'Image',	// (string) Specify text "Image"
			txtOf:					'of',		// (string) Specify text "of"
			// Configuration related to keyboard navigation
			keyToClose:				'c',		// (string) (c = close) Letter to close the jQuery lightBox interface. Beyond this letter, the letter X and the SCAPE key is used to.
			keyToPrev:				'p',		// (string) (p = previous) Letter to show the previous image
			keyToNext:				'n',		// (string) (n = next) Letter to show the next image.
			// Don´t alter these variables in any way
			imageArray:				[],
			activeImage:			0
		},settings);
		// Caching the jQuery object with all elements matched
		var jQueryMatchedObj = this; // This, in this context, refer to jQuery object
		/**
		 * Initializing the plugin calling the start function
		 *
		 * @return boolean false
		 */
		function _initialize() {
			_start(this,jQueryMatchedObj); // This, in this context, refer to object (link) which the user have clicked
			return false; // Avoid the browser following the link
		}
		/**
		 * Start the jQuery lightBox plugin
		 *
		 * @param object objClicked The object (link) whick the user have clicked
		 * @param object jQueryMatchedObj The jQuery object with all elements matched
		 */
		function _start(objClicked,jQueryMatchedObj) {
			// Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'hidden' });
			// Call the function to create the markup structure; style some elements; assign events in some elements.
			_set_interface();
			// Unset total images in imageArray
			settings.imageArray.length = 0;
			// Unset image active information
			settings.activeImage = 0;
			// We have an image set? Or just an image? Let´s see it.
			if ( jQueryMatchedObj.length == 1 ) {
				settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
			} else {
				// Add an Array (as many as we have), with href and title atributes, inside the Array that storage the images references		
				for ( var i = 0; i < jQueryMatchedObj.length; i++ ) {
					settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));
				}
			}
			while ( settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href') ) {
				settings.activeImage++;
			}
			// Call the function that prepares image exibition
			_set_image_to_view();
		}
		/**
		 * Create the jQuery lightBox plugin interface
		 *
		 * The HTML markup will be like that:
			<div id="jquery-overlay"></div>
			<div id="jquery-lightbox">
				<div id="lightbox-container-image-box">
					<div id="lightbox-container-image">
						<img src="../fotos/XX.jpg" id="lightbox-image">
						<div id="lightbox-nav">
							<a href="#" id="lightbox-nav-btnPrev"></a>
							<a href="#" id="lightbox-nav-btnNext"></a>
						</div>
						<div id="lightbox-loading">
							<a href="#" id="lightbox-loading-link">
								<img src="../images/lightbox-ico-loading.gif">
							</a>
						</div>
					</div>
				</div>
				<div id="lightbox-container-image-data-box">
					<div id="lightbox-container-image-data">
						<div id="lightbox-image-details">
							<span id="lightbox-image-details-caption"></span>
							<span id="lightbox-image-details-currentNumber"></span>
						</div>
						<div id="lightbox-secNav">
							<a href="#" id="lightbox-secNav-btnClose">
								<img src="../images/lightbox-btn-close.gif">
							</a>
						</div>
					</div>
				</div>
			</div>
		 *
		 */
		function _set_interface() {
			// Apply the HTML markup into body tag
			$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container" ><div id="lang-lines-container"><div class="ll-close" id="close-top">Close X</div><div id="lang-lines-inner-container"><div id="lang-lines-left"><img src="/mlcomm/_images/template/title_pick_a_language.jpg" alt="Pick a Language" /></div><div id="lang-lines-right"><ul><li id="farsi">Farsi</li><li id="polish">Polish</li><li id="armenian">Armenian</li><li id="hmong">Hmong</li><li id="punjabi">Punjabi</li><li id="chinese">Chinese</li><li id="japanese">Japanese</li><li id="russian">Russian</li><li id="english">English</li><li id="korean">Korean</li><li id="vietnamese">Vietnamese</li></div><div class="clear"></div></div><div class="clear"></div><div class="ll-close" id="close-bottom">Close X</div></div><div class="clear"></div></div></div>');	
			
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#armenian')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-armenian.jpg" alt="Armenian" /></div><div id="details-body"><p>AT&amp;T &#1377;&#1398;&#1409;&#1398;&#1400;&#1410;&#1396; &#1383; &#1389;&#1400;&#1401;&#1384;&#1398;&#1380;&#1400;&#1407; &#1392;&#1377;&#1398;&#1380;&#1387;&#1405;&#1377;&#1409;&#1400;&#1394; &#1388;&#1381;&#1382;&#1406;&#1377;&#1391;&#1377;&#1398; &#1377;&#1408;&#1379;&#1381;&#1388;&#1412;&#1384; &#1396;&#1387;&#1388;&#1387;&#1400;&#1398;&#1377;&#1406;&#1400;&#1408; &#1396;&#1377;&#1408;&#1380;&#1391;&#1377;&#1398;&#1409; &#1392;&#1377;&#1396;&#1377;&#1408;, &#1400;&#1408;&#1400;&#1398;&#1409; &#1392;&#1377;&#1396;&#1377;&#1408; &#1377;&#1398;&#1379;&#1388;&#1381;&#1408;&#1381;&#1398;&#1384; &#1396;&#1377;&#1397;&#1408;&#1381;&#1398;&#1387; &#1388;&#1381;&#1382;&#1400;&#1410; &#1401;&#1383;, &#1415; &#1400;&#1406;&#1412;&#1381;&#1408; &#1409;&#1377;&#1398;&#1391;&#1377;&#1398;&#1400;&#1410;&#1396; &#1381;&#1398; &#1413;&#1379;&#1407;&#1406;&#1381;&#1388; &#1391;&#1381;&#1398;&#1405;&#1377;&#1391;&#1377;&#1398; &#1392;&#1377;&#1394;&#1400;&#1408;&#1380;&#1377;&#1391;&#1409;&#1396;&#1377;&#1398; &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398;&#1398;&#1381;&#1408;&#1387;&#1409;: &#1344;&#1377;&#1396;&#1377;&#1379;&#1400;&#1408;&#1390;&#1377;&#1391;&#1409;&#1381;&#1388;&#1400;&#1406; Language Line &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398;&#1398;&#1381;&#1408;&#1387; &#1392;&#1381;&#1407;`  AT&amp;T  &#1405;&#1377;&#1392;&#1396;&#1377;&#1398;&#1377;&#1411;&#1377;&#1391; &#1377;&#1398;&#1379;&#1388;&#1381;&#1408;&#1381;&#1398; &#1387;&#1396;&#1377;&#1409;&#1400;&#1394; &#1402;&#1377;&#1407;&#1406;&#1387;&#1408;&#1377;&#1407;&#1400;&#1410;&#1398;&#1381;&#1408;&#1387;&#1398; &#1400;&#1410;&#1394;&#1387;&#1394; &#1392;&#1381;&#1404;&#1377;&#1389;&#1400;&#1405;&#1377;&#1391;&#1377;&#1402;&#1400;&#1406; &#1407;&#1408;&#1377;&#1396;&#1377;&#1380;&#1408;&#1400;&#1410;&#1396; &#1383; &#1385;&#1377;&#1408;&#1379;&#1396;&#1377;&#1398;&#1387;&#1401;&#1398;&#1381;&#1408;, &#1400;&#1406;&#1412;&#1381;&#1408; &#1377;&#1403;&#1377;&#1391;&#1409;&#1400;&#1410;&#1396; &#1381;&#1398;  &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1377;&#1398;&#1384;:</p>              <p><span class="orange-header"><strong>&#1348;&#1381;&#1398;&#1412; &#1389;&#1400;&#1405;&#1400;&#1410;&#1396; &#1381;&#1398;&#1412; &#1345;&#1381;&#1408; &#1388;&#1381;&#1382;&#1406;&#1400;&#1406;</strong></span><br />                &#1329;&#1406;&#1381;&#1388;&#1387; &#1412;&#1377;&#1398; 160 &#1388;&#1381;&#1382;&#1400;&#1410; &#1383; &#1377;&#1404;&#1391;&#1377; Language Line-&#1400;&#1410;&#1396;`  &#1396;&#1381;&#1408; &#1385;&#1377;&#1408;&#1379;&#1396;&#1377;&#1398;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398; &#1392;&#1381;&#1404;&#1377;&#1389;&#1400;&#1405;&#1400;&#1406; &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398;&#1384; &#1384;&#1398;&#1380;&#1379;&#1408;&#1391;&#1400;&#1410;&#1396; &#1383; &#1348;&#1387;&#1377;&#1409;&#1397;&#1377;&#1388; &#1350;&#1377;&#1392;&#1377;&#1398;&#1379;&#1398;&#1381;&#1408;&#1400;&#1410;&#1396; &#1377;&#1396;&#1381;&#1398;&#1377;&#1407;&#1377;&#1408;&#1377;&#1390;&#1406;&#1377;&#1390; &#1388;&#1381;&#1382;&#1400;&#1410;&#1398;&#1381;&#1408;&#1384;, &#1398;&#1381;&#1408;&#1377;&#1404;&#1397;&#1377;&#1388;`</p>				<ul style="float: left;">                  <li>&#1344;&#1377;&#1397;&#1381;&#1408;&#1381;&#1398;</li>                  <li style="margin-bottom: 7px;">&#1353;&#1387;&#1398;&#1377;&#1408;&#1381;&#1398;<br />                    (&#1396;&#1377;&#1398;&#1380;&#1377;&#1408;&#1387;&#1398; &#1415; &#1391;&#1377;&#1398;&#1407;&#1400;&#1398;&#1381;&#1408;&#1381;&#1398;)</li>                  <li>&#1329;&#1398;&#1379;&#1388;&#1381;&#1408;&#1381;&#1398;</li>                  <li>&#1354;&#1377;&#1408;&#1405;&#1391;&#1381;&#1408;&#1381;&#1398;</li>                  <li>&#1344;&#1396;&#1400;&#1398;&#1379;&#1387; &#1388;&#1381;&#1382;&#1400;&#1410;</li>                 </ul>                  <ul style="float: left;">                    <li>&#1347;&#1377;&#1402;&#1400;&#1398;&#1381;&#1408;&#1381;&#1398; </li>                    <li>&#1343;&#1400;&#1408;&#1381;&#1381;&#1408;&#1381;&#1398;</li>                    <li>&#1340;&#1381;&#1392;&#1381;&#1408;&#1381;&#1398;</li>                    <li>&#1363;&#1400;&#1410;&#1398;&#1403;&#1377;&#1378;&#1381;&#1408;&#1381;&#1398;</li>                    <li>&#1337;&#1377;&#1379;&#1377;&#1388;&#1400;&#1379;</li>                    <li>&#1358;&#1387;&#1381;&#1407;&#1398;&#1377;&#1396;&#1381;&#1408;&#1381;&#1398;</li>                  </ul>              <div class="clear"></div>              <p><span class="orange-header"><strong>&#1365;&#1379;&#1407;&#1406;&#1381;&#1371;&#1412; AT&amp;T&#39-&#1387; &#1398;&#1381;&#1408;&#1388;&#1381;&#1382;&#1406;&#1377;&#1397;&#1387;&#1398;                &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398;&#1398;&#1381;&#1408;&#1387;&#1409;`</strong></span> <br />                &#1354;&#1377;&#1407;&#1406;&#1387;&#1408;&#1377;&#1407;&#1400;&#1410;&#1398;&#1398;&#1381;&#1408;&#1384; &#1402;&#1377;&#1408;&#1382;&#1377;&#1402;&#1381;&#1405; &#1392;&#1377;&#1406;&#1377;&#1412;&#1400;&#1410;&#1396; &#1381;&#1398; 1-800-203-8600 &#1415; &#1389;&#1398;&#1380;&#1408;&#1400;&#1410;&#1396;                &#1390;&#1377;&#1404;&#1377;&#1397;&#1400;&#1410;&#1385;&#1397;&#1400;&#1410;&#1398;` &#1387;&#1408;&#1381;&#1398;&#1409; &#1398;&#1377;&#1389;&#1384;&#1398;&#1407;&#1408;&#1377;&#1390; &#1388;&#1381;&#1382;&#1406;&#1400;&#1406;:                &#1329;&#1398;&#1379;&#1388;&#1387;&#1377;&#1389;&#1400;&#1405; &#1398;&#1381;&#1408;&#1391;&#1377;&#1397;&#1377;&#1409;&#1400;&#1410;&#1409;&#1387;&#1401;&#1384; &#1400;&#1410;&#1394;&#1387;&#1394;                &#1391;&#1377;&#1402;&#1400;&#1406; &#1391;&#1396;&#1387;&#1377;&#1409;&#1398;&#1387; &#1402;&#1377;&#1407;&#1406;&#1387;&#1408;&#1377;&#1407;&#1400;&#1410;&#1387;&#1398; &#1388;&#1381;&#1382;&#1406;&#1387;                &#1392;&#1396;&#1400;&#1410;&#1407; &#1415; &#1396;&#1377;&#1405;&#1398;&#1377;&#1379;&#1381;&#1407; &#1392;&#1381;&#1404;&#1377;&#1389;&#1400;&#1405;&#1377;&#1397;&#1387;&#1398;                &#1385;&#1377;&#1408;&#1379;&#1396;&#1377;&#1398;&#1401;&#1387; &#1392;&#1381;&#1407;, &#1400;&#1408;&#1398; &#1383;&#1388; &#1391;&#1377;&#1403;&#1377;&#1391;&#1409;&#1387;                &#1387;&#1408;&#1377;&#1391;&#1377;&#1398;&#1377;&#1409;&#1398;&#1381;&#1388; &#1392;&#1381;&#1404;&#1377;&#1389;&#1400;&#1405;&#1377;&#1397;&#1387;&#1398; &#1381;&#1404;&#1377;&#1391;&#1400;&#1394;&#1396;                &#1382;&#1408;&#1400;&#1410;&#1397;&#1409;` &#1382;&#1377;&#1398;&#1379;&#1377;&#1392;&#1377;&#1408;&</div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#chinese')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-chinese.jpg" alt="Chinese" /></div><div id="details-body"><p>AT&amp;T&#27798;&#30772;&#35486;&#35328;&#38556;&#38552;&#29234;&#25104;&#21315;&#19978;&#33836;&#38750;&#26412;&#22303;&#35611;&#33521;&#35486;&#32773;&#25552;&#20379;&#37325;&#35201;&#36890;&#20449;&#26381;&#21209;&#12290; &#33287;&#35486;&#35328;&#26381;&#21209;&#32218;&#32879;&#30431;&#65292; AT&amp;T&#29234;&#33521;&#35486;&#35486;&#35328;&#26377;&#38480;&#30340;&#39015;&#23458;&#25552;&#20379;&#29694;&#22580;&#38651;&#35441;&#32763;&#35695;&#26381;&#21209;&#12290;</p>              <p>&#25105;&#20497;&#35611;&#24744;&#30340;&#35486;&#35328;&#12290;&#36890;&#36942;&#35486;&#35328;&#26381;&#21209;&#32218;&#25552;&#20379;&#30340;160&#22810;&#31278;&#35486;&#35328;&#65292;&#25105;&#20497;&#30340;&#38651;&#35441;&#32763;&#35695;&#26381;&#21209;&#21487;&#29992;&#22312;&#32654;&#22283;&#20351;&#29992;&#26368;&#24291;&#27867;&#30340;&#35486;&#35328;&#29234;&#24744;&#26381;&#21209;&#12290;&#36889;&#20123;&#35486;&#35328;&#21253;&#25324;&#65306;</p>              				<ul style="float: left;">       <li>&#20126;&#32654;&#23612;&#20126;&#35486; </li>                  <li style="margin-bottom: 7px;">&#28450;&#35486;<br />                    (&#26222;&#36890;&#35441;&#21644;&#24291;&#26481;&#35441;)</li>                  <li>&#33521;&#35486; </li>                  <li>&#27874;&#26031;&#35486; </li>                  <li>Hmong </li>                 </ul>                  <ul style="float: left;">                    <li>&#26085;&#35486; </li>                    <li>&#38867;&#22283;&#35486; </li>                    <li>&#27874;&#34349;&#35486; </li>                    <li>Punjabi </li>                    <li>&#20182;&#21152;&#31103;&#35486; </li>                    <li>&#36234;&#21335;&#35486;</li>                  </ul>              <div class="clear"></div>              <p>&#35370;&#21839;AT&amp;T&#30340;&#22312;&#32218;&#35486;&#35328;&#26381;&#21209;&#12290;  &#39015;&#23458;&#20497;&#21482;&#35201;&#25765;&#25171;1-800-203-8600&#23601;&#21487;&#20197;&#29992;&#20182;&#20497;&#24931;&#29992;&#30340;&#35486;&#35328;&#35531;&#27714;&#26381;&#21209;&#12290; &#35611;&#33521;&#25991;&#30340;&#26381;&#21209;&#21729;&#26371;&#25509;&#36890;&#32147;&#36942;&#23560;&#26989;&#35347;&#32244;&#30340;&#22312;&#32218;&#32763;&#35695;&#65292;&#22312;&#39015;&#23458;&#65292;AT&amp;T&#26381;&#21209;&#20195;&#34920;&#65292;&#21644;&#21475;&#35695;&#21729;&#20043;&#38291;&#36890;&#36942;&#21441;&#26041;&#36890;&#35441;&#30340;&#20132;&#35527;&#26041;&#24335;&#23436;&#25104;&#26381;&#21209;&#12290;</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#english')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-english.jpg" alt="English" /></div><div id="details-body"><p>AT&amp;T breaks the language barrier for millions of limited-English speaking customers wishing to access vital communication services. In partnership with Language Line services, AT&amp;T provides limited-English speaking customers with AT&amp;T services in select states. </p>              <p><span class="orange-header"><strong>We speak your language </strong></span><br />                Available in over 160 languages through Language Line, our over-the-phone interpretation service covers the most widely spoken languages in the United States including: </p>              	<ul style="float: left;">  <li>Armenian </li>                  <li style="margin-bottom: 7px;">Chinese <br />                    (Mandarin and Cantonese)</li>                  <li>English</li>                  <li>Farsi </li>                  <li>Hmong </li>                 </ul>                  <ul style="float: left;">                    <li>Japanese</li>                    <li>Korean </li>                    <li>Polish </li>                    <li>Punjabi </li>                    <li>Tagalog</li>                    <li>Vietnamese</li>                  </ul>              <div class="clear"></div>              <p><span class="orange-header"><strong>Accessing AT&amp;T&#39;s in-language services</strong></span> <br />                Customers in California simply dial 1-800-203-8600  and ask for service in the language they prefer most. An English-speaking representative  will connect the customer to a live, expertly-trained Language Line interpreter  from  Language Line Services. The interpreter will join the  caller and AT&amp;T service representative in a three-way conversation to complete  the service.</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#farsi')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-farsi.jpg" alt="Farsi" /></div><div id="details-body"><p>AT&amp;T &#1605;&#1588;&#1705;&#1604;&#1575;&#1578; &#1586;&#1576;&#1575;&#1606; &#1585;&#1575; &#1576;&#1585;&#1575;&#1740; &#1605;&#1740;&#1604;&#1740;&#1608;&#1606; &#1607;&#1575; &#1606;&#1601;&#1585;&#1740; &#1705;&#1607; &#1575;&#1606;&#1711;&#1604;&#1740;&#1587;&#1740; &#1586;&#1576;&#1575;&#1606; &#1605;&#1575;&#1583;&#1585;&#1740; &#1588;&#1575;&#1606; &#1606;&#1740;&#1587;&#1578; &#1608; &#1605;&#1575;&#1740;&#1604;&#1606;&#1583; &#1575;&#1586; &#1582;&#1583;&#1605;&#1575;&#1578; &#1605;&#1582;&#1575;&#1576;&#1585;&#1575;&#1578;&#1740; &#1575;&#1587;&#1575;&#1587;&#1740; &#1575;&#1587;&#1578;&#1601;&#1575;&#1583;&#1607; &#1705;&#1606;&#1606;&#1583;&#1548; &#1576;&#1585;&#1591;&#1585;&#1601; &#1587;&#1575;&#1582;&#1578;&#1607; &#1575;&#1587;&#1578;. AT&amp;T &#1576;&#1575; &#1607;&#1605;&#1705;&#1575;&#1585;&#1740; &#1582;&#1583;&#1605;&#1575;&#1578; Language Line &#1576;&#1607; &#1605;&#1588;&#1578;&#1585;&#1740;&#1575;&#1606;&#1740; &#1705;&#1607; &#1578;&#1587;&#1604;&#1591; &#1670;&#1606;&#1583;&#1575;&#1606;&#1740; &#1576;&#1585; &#1586;&#1576;&#1575;&#1606; &#1575;&#1606;&#1711;&#1604;&#1740;&#1587;&#1740; &#1606;&#1583;&#1575;&#1585;&#1606;&#1583; &#1578;&#1585;&#1580;&#1605;&#1607; &#1588;&#1601;&#1575;&#1607;&#1740; &#1586;&#1606;&#1583;&#1607; &#1578;&#1604;&#1601;&#1606;&#1740; &#1575;&#1585;&#1575;&#1574;&#1607; &#1605;&#1740; &#1705;&#1606;&#1583; &#1578;&#1575; &#1576;&#1578;&#1608;&#1575;&#1606;&#1606;&#1583; &#1575;&#1586; &#1582;&#1583;&#1605;&#1575;&#1578; &#1576;&#1607; &#1606;&#1581;&#1608; &#1575;&#1581;&#1587;&#1606; &#1575;&#1587;&#1578;&#1601;&#1575;&#1583;&#1607; &#1705;&#1606;&#1606;&#1583;. </p>              <p><span class="orange-header"><strong>&#1586;&#1576;&#1575;&#1606; &#1588;&#1605;&#1575; &#1586;&#1576;&#1575;&#1606; &#1605;&#1575;&#1587;&#1578;.</strong></span><br />                &#1582;&#1583;&#1605;&#1575;&#1578; &#1578;&#1585;&#1580;&#1605;&#1607; &#1588;&#1601;&#1575;&#1607;&#1740; &#1578;&#1604;&#1601;&#1606;&#1740; &#1605;&#1575; &#1705;&#1607; &#1575;&#1586; &#1591;&#1585;&#1740;&#1602; Language Line &#1576;&#1607; &#1576;&#1740;&#1588; &#1575;&#1586; 160 &#1586;&#1576;&#1575;&#1606; &#1602;&#1575;&#1576;&#1604; &#1583;&#1587;&#1578;&#1585;&#1587; &#1605;&#1740;&#8204;&#1576;&#1575;&#1588;&#1606;&#1583;&#1548; &#1575;&#1705;&#1579;&#1585; &#1586;&#1576;&#1575;&#1606; &#1607;&#1575;&#1740; &#1585;&#1575;&#1740;&#1580; &#1583;&#1585; &#1570;&#1605;&#1585;&#1740;&#1705;&#1575; &#1585;&#1575; &#1662;&#1608;&#1588;&#1588; &#1605;&#1740; &#1583;&#1607;&#1583;. &#1575;&#1586; &#1580;&#1605;&#1604;&#1607; &#1586;&#1576;&#1575;&#1606; &#1607;&#1575;&#1740; &#1578;&#1581;&#1578; &#1662;&#1608;&#1588;&#1588; &#1605;&#1740; &#1578;&#1608;&#1575;&#1606; &#1576;&#1607; &#1575;&#1740;&#1606;&#1607;&#1575; &#1575;&#1588;&#1575;&#1585;&#1607; &#1705;&#1585;&#1583;:</p>              	<ul style="float: left;">    <li>&#1575;&#1585;&#1605;&#1606;&#1740; </li>                  <li style="margin-bottom: 7px;">&#1670;&#1740;&#1606;&#1740; <br />                    (&#1605;&#1575;&#1606;&#1583;&#1575;&#1585;&#1740;&#1606; &#1608; &#1705;&#1575;&#1606;&#1578;&#1608;&#1606;&#1740;)</li>                  <li>&#1575;&#1606;&#1711;&#1604;&#1740;&#1587;&#1740;</li>                  <li>&#1601;&#1575;&#1585;&#1587;&#1740; </li>                  <li>&#1607;&#1605;&#1608;&#1606;&#1711; </li>                 </ul>                  <ul style="float: left;">                    <li>&#1688;&#1575;&#1662;&#1606;&#1740;</li>                    <li>&#1705;&#1585;&#1607; &#1575;&#1740; </li>                    <li>&#1604;&#1607;&#1587;&#1578;&#1575;&#1606;&#1740; </li>                    <li>&#1662;&#1606;&#1580;&#1575;&#1576;&#1740; </li>                    <li>&#1578;&#1711;&#1608;&#1604;&#1608;&#1711;</li>                    <li>&#1608;&#1740;&#1578;&#1606;&#1575;&#1605;&#1740;</li>                  </ul>              <div class="clear"></div>             <p><span class="orange-header"><strong>&#1583;&#1587;&#1578;&#1585;&#1587;&#1740; &#1576;&#1607; &#1582;&#1583;&#1605;&#1575;&#1578; AT&amp;T &#1576;&#1607; &#1586;&#1576;&#1575;&#1606; &#1583;&#1604;&#1582;&#1608;&#1575;&#1607;: </strong></span> <br />                &#1605;&#1588;&#1578;&#1585;&#1740;&#1575;&#1606; &#1711;&#1585;&#1575;&#1605;&#1740; &#1705;&#1575;&#1601;&#1740; &#1575;&#1587;&#1578; &#1576;&#1607; &#1588;&#1605;&#1575;&#1585;&#1607; &#1578;&#1604;&#1601;&#1606; 1-800-203-8600 &#1586;&#1606;&#1711; &#1586;&#1583;&#1607; &#1608; &#1583;&#1585;&#1582;&#1608;&#1575;&#1587;&#1578; &#1705;&#1606;&#1606;&#1583; &#1582;&#1583;&#1605;&#1575;&#1578; &#1576;&#1607; &#1586;&#1576;&#1575;&#1606; &#1583;&#1604;&#1582;&#1608;&#1575;&#1607; &#1588;&#1575;&#1606; &#1575;&#1585;&#1575;&#1574;&#1607; &#1711;&#1585;&#1583;&#1583;. &#1740;&#1705; &#1605;&#1587;&#1574;&#1608;&#1604; &#1575;&#1606;&#1711;&#1604;&#1740;&#1587;&#1740; &#1586;&#1576;&#1575;&#1606;&#1548; &#1605;&#1588;&#1578;&#1585;&#1740; &#1585;&#1575; &#1576;&#1575; &#1740;&#1705; &#1605;&#1578;&#1585;&#1580;&#1605; &#1607;&#1605;&#1586;&#1605;&#1575;&#1606; &#1705;&#1575;&#1585;&#1570;&#1586;&#1605;&#1608;&#1583;&#1607; &#1578;&#1604;&#1601;&#1606;&#1740; &#1583;&#1585; Language Line &#1575;&#1585;&#1578;&#1576;&#1575;&#1591; &#1582;&#1608;&#1575;&#1607;&#1583; &#1583;&#1575;&#1583; &#1608; &#1576;&#1583;&#1740;&#1606; &#1578;&#1585;&#1578;&#1740;&#1576; &#1740;&#1705; &#1605;&#1705;&#1575;&#1604;&#1605;&#1607; &#1587;&#1607; &#1606;&#1601;&#1585;&#1607; &#1605;&#1740;&#1575;&#1606; &#1605;&#1588;&#1578;&#1585;&#1740; &#1578;&#1605;&#1575;&#1587; &#1711;&#1740;&#1585;&#1606;&#1583;&#1607;&#1548; &#1605;&#1587;&#1574;&#1608;&#1604; AT&amp;T &#1608; &#1605;&#1578;&#1585;&#1580;&#1605; &#1576;&#1585;&#1602;&#1585;&#1575;&#1585; &#1605;&#1740; &#1588;&#1608;&#1583; &#1608; &#1605;&#1588;&#1578;&#1585;&#1740; &#1605;&#1740; &#1578;&#1608;&#1575;&#1606;&#1583; &#1583;&#1585;&#1582;&#1608;&#1575;&#1587;&#1578; &#1607;&#1575;&#1740; &#1582;&#1583;&#1605;&#1575;&#1578;&#1740; &#1582;&#1608;&#1583; &#1585;&#1575; &#1576;&#1585;&#1575;&#1581;&#1578;&#1740; &#1605;&#1591;&#1585;&#1581; &#1587;&#1575;&#1586;&#1583;.</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#hmong')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-hmong.jpg" alt="Hmong" /></div><div id="details-body"><p>AT&amp;T daws tau teebmeem thiab muab kev pab txuas lus tau rau ntau vam neeg kws muaj thawj hom lus txawv lus Aakiv.  Hauv kev koom tes nrog sab txhais lus raws xovtooj, AT&amp;T pab txuas lus thiab txhais lus tam sis rau cov neeg kws paub lus Aakiv tsis zoo kom lawv tau txais kev pab. </p>              <p><span class="orange-header"><strong>Peb hais nej hom lus.</strong></span><br />                Muaj tshaj li 160 hom lus hauv sab txhais lus raws xovtooj, peb kev pab txhais lus raws xovtooj muaj yuav luag txwm txhua hom lus uas tshwmsim hais heev nyob hauv teb chaws Amelika, xws li:</p>              	<ul style="float: left;">  <li>Armenian </li>                  <li style="margin-bottom: 7px;">Suav <br />                    (Mandarin thiab Cantonese) </li>                  <li>Aakiv</li>                  <li>Farsi </li>                  <li>Hmoob </li>                 </ul>                  <ul style="float: left;">                    <li>Zib Peeb </li>                    <li>Kaulim </li>                    <li>Polish </li>                    <li>Punjabi </li>                    <li>Tagalog </li>                    <li>Nyab Laj </li>                  </ul>              <div class="clear"></div>            <p><span class="orange-header"><strong>Txheeb AT&amp;T cov kev pab ntau hom lus:</strong></span> <br />                Tib neeg cia li ntaus 1-800-203-8600 thiab nug kev pab raws hom lus lawv nyiam tshaj.  Ib leej neeg sawv cev AT&amp;T yuav los txuas nej rau tus neeg txhais lus kws paub nej hom lus zoo; nws yuav pab nej saum huabcua raws peb sab xov lus los ntawm tus hu, tus neeg sawv cev, thiab tus txhais lus.</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#japanese')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-ja.jpg" alt="Japanese" /></div><div id="details-body"><p>AT&amp;T&#12364;&#33521;&#35486;&#12434;&#27597;&#22269;&#35486;&#12392;&#12373;&#12428;&#12394;&#12356;&#12362;&#23458;&#27096;&#12395;&#12418;&#12372;&#21033;&#29992;&#12356;&#12383;&#12384;&#12369;&#12427;&#12467;&#12511;&#12517;&#12491;&#12465;&#12540;&#12471;&#12519;&#12531;&#12469;&#12540;&#12499;&#12473;&#12434;&#38283;&#22987;&#12356;&#12383;&#12375;&#12414;&#12377;&#12290;<br />                &#33521;&#35486;&#12364;&#23569;&#12293;&#33510;&#25163;&#12392;&#12373;&#12428;&#12427;&#26041;&#12398;&#12383;&#12417;&#12395;&#12289;AT&amp;T&#12364;&#12521;&#12531;&#12464;&#12456;&#12483;&#12472;&#183;&#12521;&#12452;&#12531;&#12392;&#25552;&#25658;&#12375;&#12390;&#12289;<br />                &#38651;&#35441;&#12434;&#36890;&#12376;&#12390;&#29983;&#12391;&#36890;&#35379;&#12434;&#12372;&#21033;&#29992;&#12356;&#12383;&#12384;&#12369;&#12427;&#12469;&#12540;&#12499;&#12473;&#12434;&#25552;&#20379;&#12375;&#12414;&#12377;&#12290; </p>              <p>&#12362;&#23458;&#27096;&#12398;&#27597;&#22269;&#12434;&#35441;&#12379;&#12414;&#12377;&#12290;AT&amp;T&#12364;&#12362;&#23626;&#12369;&#12377;&#12427;&#38651;&#35441;&#12434;&#36890;&#12375;&#12390;&#12398;160&#12534;&#22269;&#35486;&#20197;&#19978;&#12398;&#12459;&#12473;&#12479;&#12510;&#12540;&#183;&#12469;&#12540;&#12499;&#12473;&#12399;&#12289;<br />                &#20197;&#19979;&#12398;&#12392;&#12362;&#12426;&#12289;&#31859;&#22269;&#20869;&#12391;&#26368;&#12418;&#38971;&#32321;&#12395;&#20351;&#12431;&#12428;&#12390;&#12356;&#12427;&#12411;&#12392;&#12435;&#12393;&#12398;&#35328;&#35486;&#12391;&#12372;&#21033;&#29992;&#12395;&#12394;&#12428;&#12414;&#12377;&#12290;</p>                 <ul style="float: left;">  <li>&#12450;&#12523;&#12510;&#12491;&#12450;&#35486;</li>                    <li style="margin-bottom: 7px;">&#20013;&#22269;&#35486;<br />                    &#65288;&#21271;&#20140;&#35486;&#183;&#24195;&#26481;&#35486;&#65289;</li>                    <li>&#33521;&#35486;</li>                    <li>Hmong </li>                    <li>&#12506;&#12523;&#12471;&#12450;&#35486;</li>                 </ul>                  <ul style="float: left;">                    <li> &#26085;&#26412;&#35486;</li>                    <li>&#38867;&#22269;&#35486;</li>                    <li>&#12509;&#12540;&#12521;&#12531;&#12489;&#35486;</li>                    <li>&#12497;&#12531;&#12472;&#12515;&#12502;&#35486;</li>                    <li>&#12479;&#12460;&#12525;&#12464;&#35486;</li>                  </ul>              <div class="clear"></div>              <p>AT&amp;T&#22806;&#22269;&#35486;&#12469;&#12540;&#12499;&#12473;&#12398;&#12372;&#21033;&#29992;&#26041;&#27861;&#65306;&#12372;&#21033;&#29992;&#12398;&#12362;&#23458;&#27096;&#12395;&#12399;1-800-203-8600&#12395;&#12362;&#38651;&#35441;&#12356;&#12383;&#12384;&#12365;&#12414;&#12375;&#12390;&#12289;&#12372;&#21033;&#29992;&#12395;&#12394;&#12426;&#12383;&#12356;&#35328;&#35486;&#12434;&#12362;&#20253;&#12360;&#12356;&#12383;&#12384;&#12365;&#12414;&#12377;&#12290;<br />                &#33521;&#35486;&#12391;&#23550;&#24540;&#12377;&#12427;&#12458;&#12506;&#12524;&#12540;&#12479;&#12540;&#12364;&#12289;&#12362;&#23458;&#12373;&#12414;&#12364;&#12362;&#36984;&#12403;&#12395;&#12394;&#12387;&#12383;&#35328;&#35486;&#12398;&#36890;&#35379;&#12395;&#25509;&#32154;&#12375;&#12289;<br />                &#19977;&#32773;&#21516;&#26178;&#36890;&#35441;&#12391;AT&amp;T&#12398;&#12469;&#12540;&#12499;&#12473;&#12372;&#25552;&#20379;&#12356;&#12383;&#12375;&#12383;&#12414;&#12377;&#12290;</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#korean')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-korean.jpg" alt="Korean" /></div><div id="details-body"><p>AT&amp;T&#45716; &#50689;&#50612; &#51060;&#50808;&#51032; &#50616;&#50612;&#47484; &#49324;&#50857;&#54616;&#45716; &#49548;&#48708;&#51088;&#46308;&#51060; &#51328;&#45908; &#54200;&#47532;&#54616;&#44172; AT&amp;T&#51032; &#49436;&#4870;&#49828;&#47484; &#51060;&#50857;&#54624; &#49688; &#51080;&#46020;&#47197; &#46037;&#44256;&#51088;, &#47924;&#47308; &#53685;&#50669; &#49436;&#48708;&#49828;&#47484; &#51228;&#44277;&#54616;&#44256; &#51080;&#49845;&#45768;&#45796;. AT&amp;T&#51032; &#47924;&#47308; &#53685;&#50669; &#49436;&#48708;&#49828;&#47484; &#53685;&#54644; &#49548;&#48708;&#51088;&#45716; &#47784;&#44397;&#50612;&#47196; AT&amp;T&#51032; &#49436;&#48708;&#49828;&#47484; &#49888;&#52397;&#54616;&#49892; &#49688; &#51080;&#51012; &#49104;&#47564; &#50500;&#45768;&#46972;, &#49548;&#48708;&#51088; &#49468;&#53552;&#50640;&#49436; &#51060;&#47364;&#51648;&#45716; &#47784;&#46304; &#49436;&#48708;&#49828;&#47484; &#48155;&#51004;&#49892; &#49688; &#51080;&#49845;&#45768;&#45796;. </p>              <p>AT&amp;T&#45716; &#45817;&#49888;&#51032; &#50616;&#50612;&#47196; &#47564;&#45225;&#45768;&#45796;. Language Line&#51012; &#53685;&#54620; &#51204;&#54868;&#49345; &#51204;&#47928; &#53685;&#50669; &#49436;&#48708;&#49828;&#45716; 160&#44060; &#51060;&#49345;&#51032; &#50616;&#50612;&#47196; &#44032;&#45733;&#54633;&#45768;&#45796;. &#45796;&#51020;&#51008; &#48120;&#44397;&#50640;&#49436; &#44032;&#51109; &#47566;&#51060; &#50416;&#51060;&#45716; &#50689;&#50612; &#51060;&#50808;&#51032; &#50616;&#50612;&#47196;, AT&amp;T&#51032; &#47924;&#47308; &#53685;&#50669; &#49436;&#48708;&#49828;&#44032; &#44032;&#45733;&#54620; &#50616;&#50612;&#51032; &#50696;&#51077;&#45768;&#45796;:</p>                 <ul style="float: left;">    <li>&#50689;&#50612;</li>                  <li>&#50500;&#46989;&#50612;</li>                  <li>&#50508;&#47560;&#45768;&#50612;</li>                  <li>Hmong </li>                  <li>&#51473;&#44397;&#50612;</li>                 </ul>                  <ul style="float: left;">                    <li>&#51068;&#48376;&#50612;</li>                    <li>&#48288;&#53944;&#45224;&#50612;</li>                    <li>&#53440;&#44040;&#47196;&#44536;&#50612;</li>                    <li>&#47084;&#49884;&#50500;&#50612;</li>                    <li>&#54260;&#46976;&#46300;&#50612;</li>                  </ul>              <div class="clear"></div>              <p>AT&amp;T&#51032; &#47924;&#47308; &#53685;&#50669; &#49436;&#48708;&#49828; &#51060;&#50857;&#48169;&#48277;: 1-800-203-8600&#48264;&#51004;&#47196; &#51204;&#54868;&#47484; &#44152;&#50612; &#54620;&#44397;&#50612; &#53685;&#50669;&#51012; &#50896;&#54620;&#45796;&#44256; &#47568;&#50432;&#54616;&#49884;&#47732; &#46121;&#45768;&#45796;. AT&amp;T&#51032; &#47924;&#47308; &#53685;&#50669; &#49436;&#48708;&#49828;&#45716; AT&amp;T &#51204;&#54868;&#49468;&#53552;, &#49548;&#48708;&#51088;&#50752; Language Line Services&#51032; &#51204;&#47928; &#53685;&#50669;&#50896; &#44036;&#51032; &#49340;&#51088;&#53685;&#54868;&#47196; &#51060;&#47364;&#51665;&#45768;&#45796;. </p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#polish')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-polish.jpg" alt="Polish" /></div><div id="details-body"><p>Firma AT&amp;T niweluje bariery j&#281;zykowe dla milion&#243;w os&#243;b, kt&#243;re pos&#322;uguj&#261; si&#281; j&#281;zykiem angielskim, ale nie pochodz&#261; z kraj&#243;w angloj&#281;zycznych &#8212; dzi&#281;ki temu poszerza grono u&#380;ytkownik&#243;w us&#322;ug telekomunikacyjnych. AT&amp;T &#8212; we wsp&#243;&#322;pracy z Language Line &#8212; oferuje w czasie rozm&#243;w telefonicznych pomoc t&#322;umaczy symultanicznych. Jest to oferta skierowana do klient&#243;w pos&#322;uguj&#261;cych si&#281; j&#281;zykiem angielskim w ograniczonym zakresie.</p>              <p><span class="orange-header"><strong>M&#243;wimy w Twoim j&#281;zyku.</strong></span><br />                Dost&#281;pne w ponad 160 j&#281;zykach za po&#347;rednictwem Language Line &#8212; nasze us&#322;ugi symultanicznego t&#322;umaczenia rozm&#243;w telefonicznych s&#261; dost&#281;pne dla j&#281;zyk&#243;w najcz&#281;&#347;ciej u&#380;ywanych w USA:</p>                 <ul style="float: left;">       <li>Arme&#324;ski</li>                  <li style="margin-bottom: 7px;">Chi&#324;ski</span><br />                    (mandary&#324;ski i kanto&#324;ski)</li>                  <li>Angielski</li>                  <li>Farsi</li>                  <li>Hmong</li>                 </ul>                  <ul style="float: left;">                    <li>Japo&#324;ski</li>                    <li>Korea&#324;ski</li>                    <li>Polski</li>                    <li>Punjabi</li>                    <li>Tagalog</li>                    <li>Wietnamski</li>                  </ul>              <div class="clear"></div>              <p><span class="orange-header"><strong>Dost&#281;p do pomocy j&#281;zykowych AT&amp;T:</strong></span> <br />                Wystarczy wybra&#263; numer 1-800-417-1588 (Midwest), 1-800-203-8600 (Calif.) i poprosi&#263; o obs&#322;ug&#281; w preferowanym j&#281;zyku. Przedstawiciel m&#243;wi&#261;cy po angielsku po&#322;&#261;czy klienta z t&#322;umaczem symultanicznym Language Line, kt&#243;ry u&#322;atwi korzystanie z us&#322;ugi, poniewa&#380; b&#281;dzie t&#322;umaczy&#322; rozmow&#281; klienta i przedstawiciela AT&amp;T.</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#punjabi')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-punjabi.jpg" alt="Punjabi" /></div><div id="details-body"><img src="/mlcomm/_images/lang_lines/punjabi/para-1.jpg" alt="" /> <img src="/mlcomm/_images/lang_lines/punjabi/subheader-1.jpg" alt="" width="320" height="27" /><br />              <img src="/mlcomm/_images/lang_lines/punjabi/para-2.jpg" alt="" />              <div style="width: 540px; margin-left: 35px;"> <img src="/mlcomm/_images/lang_lines/punjabi/column-2.jpg" alt="" style="float: right;" /> <img src="/mlcomm/_images/lang_lines/punjabi/column-1.jpg" alt="" /> </div>              <div style="clear:both;"></div>              <img src="/mlcomm/_images/lang_lines/punjabi/subheader-2.jpg" alt="" width="560" height="37" /><br />              <img src="/mlcomm/_images/lang_lines/punjabi/para-3.jpg" alt="" width="587" height="54" /></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#russian')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-russian.jpg" alt="Russian" /></div><div id="details-body"><p>AT&amp;T &#1091;&#1089;&#1090;&#1088;&#1072;&#1085;&#1103;&#1077;&#1090; &#1103;&#1079;&#1099;&#1082;&#1086;&#1074;&#1086;&#1081; &#1073;&#1072;&#1088;&#1100;&#1077;&#1088; &#1076;&#1083;&#1103; &#1084;&#1080;&#1083;&#1083;&#1080;&#1086;&#1085;&#1086;&#1074; &#1083;&#1102;&#1076;&#1077;&#1081;, &#1076;&#1083;&#1103; &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1093; &#1072;&#1085;&#1075;&#1083;&#1080;&#1081;&#1089;&#1082;&#1080;&#1081;                 &#1085;&#1077; &#1103;&#1074;&#1083;&#1103;&#1077;&#1090;&#1089;&#1103; &#1088;&#1086;&#1076;&#1085;&#1099;&#1084; &#1103;&#1079;&#1099;&#1082;&#1086;&#1084;, &#1078;&#1077;&#1083;&#1072;&#1102;&#1097;&#1080;&#1093; &#1087;&#1086;&#1083;&#1091;&#1095;&#1080;&#1090;&#1100; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087; &#1082; &#1078;&#1080;&#1079;&#1085;&#1077;&#1085;&#1085;&#1086; &#1074;&#1072;&#1078;&#1085;&#1099;&#1084;                 &#1091;&#1089;&#1083;&#1091;&#1075;&#1072;&#1084; &#1089;&#1074;&#1103;&#1079;&#1080;. &#1057;&#1086;&#1074;&#1084;&#1077;&#1089;&#1090;&#1085;&#1086; &#1089;&#1086; &#1089;&#1083;&#1091;&#1078;&#1073;&#1072;&#1084;&#1080; &#1103;&#1079;&#1099;&#1082;&#1086;&#1074;&#1086;&#1081; &#1087;&#1086;&#1076;&#1076;&#1077;&#1088;&#1078;&#1082;&#1080; Language Line                 &#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1103; AT&amp;T &#1087;&#1088;&#1077;&#1076;&#1086;&#1089;&#1090;&#1072;&#1074;&#1083;&#1103;&#1077;&#1090; &#1079;&#1072;&#1082;&#1072;&#1079;&#1095;&#1080;&#1082;&#1072;&#1084;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1077; &#1085;&#1077; &#1084;&#1086;&#1075;&#1091;&#1090; &#1089;&#1074;&#1086;&#1073;&#1086;&#1076;&#1085;&#1086; &#1086;&#1073;&#1097;&#1072;&#1090;&#1100;&#1089;&#1103; &#1085;&#1072;                 &#1072;&#1085;&#1075;&#1083;&#1080;&#1081;&#1089;&#1082;&#1086;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;, &#1091;&#1089;&#1083;&#1091;&#1075;&#1080; &#1091;&#1089;&#1090;&#1085;&#1099;&#1093; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1076;&#1095;&#1080;&#1082;&#1086;&#1074; &#1087;&#1088;&#1080; &#1086;&#1073;&#1097;&#1077;&#1085;&#1080;&#1080; &#1087;&#1086; &#1090;&#1077;&#1083;&#1077;&#1092;&#1086;&#1085;&#1091;.</p>              <p><span class="orange-header"><strong>&#1052;&#1099; &#1075;&#1086;&#1074;&#1086;&#1088;&#1080;&#1084; &#1085;&#1072; &#1074;&#1072;&#1096;&#1077;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;.</strong></span><br />                &#1044;&#1086;&#1089;&#1090;&#1091;&#1087;&#1085;&#1099;&#1077; &#1073;&#1086;&#1083;&#1077;&#1077; &#1095;&#1077;&#1084; &#1085;&#1072; 160 &#1103;&#1079;&#1099;&#1082;&#1072;&#1093; &#1073;&#1083;&#1072;&#1075;&#1086;&#1076;&#1072;&#1088;&#1103; Language Line, &#1085;&#1072;&#1096;&#1080; &#1091;&#1089;&#1083;&#1091;&#1075;&#1080; &#1091;&#1089;&#1090;&#1085;&#1086;&#1075;&#1086; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1076;&#1072; &#1087;&#1086; &#1090;&#1077;&#1083;&#1077;&#1092;&#1086;&#1085;&#1091; &#1086;&#1093;&#1074;&#1072;&#1090;&#1099;&#1074;&#1072;&#1102;&#1090; &#1096;&#1080;&#1088;&#1086;&#1082;&#1080;&#1081; &#1076;&#1080;&#1072;&#1087;&#1072;&#1079;&#1086;&#1085; &#1103;&#1079;&#1099;&#1082;&#1086;&#1074;, &#1085;&#1072; &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1093; &#1075;&#1086;&#1074;&#1086;&#1088;&#1103;&#1090; &#1074; &#1057;&#1086;&#1077;&#1076;&#1080;&#1085;&#1077;&#1085;&#1085;&#1099;&#1093; &#1064;&#1090;&#1072;&#1090;&#1072;&#1093;, &#1074;&#1082;&#1083;&#1102;&#1095;&#1072;&#1103;:</p>                 <ul style="float: left;">                          <li>&#1040;&#1088;&#1084;&#1103;&#1085;&#1089;&#1082;&#1080;&#1081;</li>                  <li style="margin-bottom: 7px;">&#1050;&#1080;&#1090;&#1072;&#1081;&#1089;&#1082;&#1080;&#1081;</span><br />                    (&#1084;&#1072;&#1085;&#1076;&#1072;&#1088;&#1080;&#1085;&#1089;&#1082;&#1080;&#1081; &#1080; &#1082;&#1072;&#1085;&#1090;&#1086;&#1085;&#1089;&#1082;&#1080;&#1081;)</li>                  <li>&#1040;&#1085;&#1075;&#1083;&#1080;&#1081;&#1089;&#1082;&#1080;&#1081;</li>                  <li>&#1060;&#1072;&#1088;&#1089;&#1080;</li>                  <li>&#1061;&#1084;&#1086;&#1085;&#1075;</li>                 </ul>                  <ul style="float: left;">                    <li>&#1071;&#1087;&#1086;&#1085;&#1089;&#1082;&#1080;&#1081;</li>                    <li>&#1050;&#1086;&#1088;&#1077;&#1081;&#1089;&#1082;&#1080;&#1081;</li>                    <li>&#1055;&#1086;&#1083;&#1100;&#1089;&#1082;&#1080;&#1081;</li>                    <li>&#1055;&#1077;&#1085;&#1076;&#1078;&#1072;&#1073;&#1089;&#1082;&#1080;&#1081;</li>                    <li>&#1058;&#1072;&#1075;&#1072;&#1083;&#1100;&#1089;&#1082;&#1080;&#1081;</li>                    <li>&#1042;&#1100;&#1077;&#1090;&#1085;&#1072;&#1084;&#1089;&#1082;&#1080;&#1081;</li>                  </ul>              <div class="clear"></div>              <p><span class="orange-header"><strong>&#1055;&#1086;&#1083;&#1091;&#1095;&#1077;&#1085;&#1080;&#1077; &#1076;&#1086;&#1089;&#1090;&#1091;&#1087;&#1072; &#1082; &#1103;&#1079;&#1099;&#1082;&#1086;&#1074;&#1099;&#1084; &#1091;&#1089;&#1083;&#1091;&#1075;&#1072;&#1084; AT&amp;T:</strong></span> <br />                &#1047;&#1072;&#1082;&#1072;&#1079;&#1095;&#1080;&#1082;&#1072;&#1084; &#1085;&#1091;&#1078;&#1085;&#1086; &#1085;&#1072;&#1073;&#1088;&#1072;&#1090;&#1100; 1-800-203-8600 &#1080; &#1087;&#1086;&#1087;&#1088;&#1086;&#1089;&#1080;&#1090;&#1100; &#1086;&#1073; &#1091;&#1089;&#1083;&#1091;&#1075;&#1072;&#1093; &#1085;&#1072; &#1090;&#1086;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1086;&#1085;&#1080; &#1087;&#1088;&#1077;&#1076;&#1087;&#1086;&#1095;&#1080;&#1090;&#1072;&#1102;&#1090;. &#1057;&#1086;&#1090;&#1088;&#1091;&#1076;&#1085;&#1080;&#1082;, &#1075;&#1086;&#1074;&#1086;&#1088;&#1103;&#1097;&#1080;&#1081;  &#1087;&#1086;-&#1072;&#1085;&#1075;&#1083;&#1080;&#1081;&#1089;&#1082;&#1080;, &#1089;&#1086;&#1077;&#1076;&#1080;&#1085;&#1080;&#1090; &#1079;&#1072;&#1082;&#1072;&#1079;&#1095;&#1080;&#1082;&#1072; &#1089; &#1082;&#1074;&#1072;&#1083;&#1080;&#1092;&#1080;&#1094;&#1080;&#1088;&#1086;&#1074;&#1072;&#1085;&#1085;&#1099;&#1084; &#1091;&#1089;&#1090;&#1085;&#1099;&#1084; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1076;&#1095;&#1080;&#1082;&#1086;&#1084; &#1080;&#1079; &#1089;&#1083;&#1091;&#1078;&#1073;&#1099; Language Line, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1081; &#1087;&#1086;&#1084;&#1086;&#1078;&#1077;&#1090; &#1079;&#1072;&#1082;&#1072;&#1079;&#1095;&#1080;&#1082;&#1091; &#1087;&#1086;&#1083;&#1091;&#1095;&#1080;&#1090;&#1100; &#1085;&#1091;&#1078;&#1085;&#1091;&#1102; &#1091;&#1089;&#1083;&#1091;&#1075;&#1091; &#1074; &#1087;&#1088;&#1086;&#1094;&#1077;&#1089;&#1089;&#1077; &#1090;&#1088;&#1077;&#1093;&#1089;&#1090;&#1086;&#1088;&#1086;&#1085;&#1085;&#1077;&#1075;&#1086; &#1088;&#1072;&#1079;&#1075;&#1086;&#1074;&#1086;&#1088;&#1072; &#1089; &#1087;&#1086;&#1079;&#1074;&#1086;&#1085;&#1080;&#1074;&#1096;&#1080;&#1084; &#1079;&#1072;&#1082;&#1072;&#1079;&#1095;&#1080;&#1082;&#1086;&#1084;, &#1087;&#1088;&#1077;&#1076;&#1089;&#1090;&#1072;&#1074;&#1080;&#1090;&#1077;&#1083;&#1077;&#1084; &#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1080; AT&amp;T &#1080; &#1091;&#1089;&#1090;&#1085;&#1099;&#1084; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1076;&#1095;&#1080;&#1082;&#1086;&#1084;.</p></div></div>');
						} 
				});
				$('#lang-lines-right li').click(function() { 
						if($(this).is('#vietnamese')) {
								$('#lang-lines-inner-container').css('padding',' 30px 60px ').html('<div class="lang-details"><div id="details-left"><img src="/mlcomm/_images/template/bg_language_lines.jpg" alt="Language Lines" /></div><div id="details-right"><img src="/mlcomm/_images/lang_lines/lang_line_banner-vietnamese.jpg" alt="Vietnamese" /></div><div id="details-body"><p>AT&amp;T ph&#225; v&#7905; r&#224;o c&#7843;n v&#7873; ng&#244;n ng&#7919; cho h&#224;ng                tri&#7879;u ng&#432;&#7901;i kh&#244;ng ph&#7843;i l&#224; ng&#432;&#7901;i n&#243;i ti&#7871;ng M&#7929;                b&#7843;n x&#7913; mu&#7889;n s&#7917; d&#7909;ng c&#225;c d&#7883;ch v&#7909; truy&#7873;n th&#244;ng                quan tr&#7885;ng. C&#249;ng ph&#7889;i h&#7907;p v&#7899;i Language Line,                AT&amp;T cung c&#7845;p d&#7883;ch v&#7909; th&#244;ng d&#7883;ch tr&#7921;c ti&#7871;p qua                &#273;i&#7879;n tho&#7841;i cho c&#225;c kh&#225;ch h&#224;ng kh&#244;ng n&#243;i Anh                ng&#7919; th&#244;ng th&#7841;o &#273;&#7875; gi&#250;p h&#7885; s&#7917; d&#7909;ng c&#225;c d&#7883;ch v&#7909;.</p>              <p><span class="orange-header"><strong>Ch&#250;ng t&#244;i n&#243;i ng&#244;n ng&#7919; c&#7911;a qu&#253; v&#7883;.</strong></span><br />                V&#7899;i h&#417;n 160 ng&#244;n ng&#7919; qua Language Line, d&#7883;ch                v&#7909; th&#244;ng d&#7883;ch qua &#273;i&#7879;n tho&#7841;i c&#7911;a ch&#250;ng t&#244;i c&#243;                th&#7875; gi&#250;p &#273;&#7905; c&#225;c kh&#225;ch h&#224;ng n&#243;i c&#225;c ng&#244;n ng&#7919;                ph&#7893; bi&#7871;n nh&#7845;t t&#7841;i Hoa K&#7923;, trong &#273;&#243; bao g&#7891;m:</p>                 <ul style="float: left;">    <li>Armenian</li>                  <li style="margin-bottom: 7px;">Chinese</span><br />                    (Mandarin and Cantonese)</li>                  <li>English</li>                  <li>Farsi</li>                  <li>Hmong</li>                 </ul>                  <ul style="float: left;">                    <li>Japanese</li>                    <li>Korean</li>                    <li>Polish</li>                    <li>Punjabi</li>                    <li>Tagalog</li>                    <li>Vietnamese</li>                  </ul>              <div class="clear"></div>             <p><span class="orange-header"><strong>S&#7917; d&#7909;ng c&#225;c d&#7883;ch v&#7909; th&#244;ng d&#7883;ch c&#7911;a AT&amp;T:</strong></span> <br />                Kh&#225;ch h&#224;ng ch&#7881; c&#7847;n quay s&#7889; 1-800-203-8600 v&#224;                &#273;&#7873; ngh&#7883; cung c&#7845;p d&#7883;ch v&#7909; th&#244;ng d&#7883;ch cho ng&#244;n                ng&#7919; m&#224; h&#7885; mu&#7889;n s&#7917; d&#7909;ng. M&#7897;t &#273;&#7841;i di&#7879;n n&#243;i ti&#7871;ng                Anh s&#7869; n&#7889;i m&#225;y cho kh&#225;ch h&#224;ng t&#7899;i g&#7863;p m&#7897;t                th&#244;ng d&#7883;ch vi&#234;n tr&#7921;c ti&#7871;p &#273;&#227; &#273;&#432;&#7907;c hu&#7845;n luy&#7879;n                chuy&#234;n nghi&#7879;p c&#7911;a Language Line. Th&#244;ng d&#7883;ch                vi&#234;n n&#224;y s&#7869; gi&#250;p cung c&#7845;p d&#7883;ch v&#7909; cho kh&#225;ch                h&#224;ng qua h&#236;nh th&#7913;c &#273;i&#7879;n &#273;&#224;m ba chi&#7873;u v&#7899;i ng&#432;&#7901;i                g&#7885;i, &#273;&#7841;i di&#7879;n d&#7883;ch v&#7909; c&#7911;a AT&amp;T v&#224; th&#244;ng d&#7883;ch                vi&#234;n.</p></div></div>');
						} 
				});
			
			
			
			// Get page sizes
			var arrPageSizes = ___getPageSize();
			// Style overlay and show it
			$('#jquery-overlay').css({
				backgroundColor:	settings.overlayBgColor,
				opacity:			settings.overlayOpacity,
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			// Get page scroll
			var arrPageScroll = ___getPageScroll();
			// Calculate top and left offset for the jquery-lightbox div object and show it
			$('#jquery-lightbox').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			}).show();
			// Assigning click events in elements to close overlay
			$('.ll-close').click(function() {
				_finish();									
			});
			// Assign the _finish function to lightbox-loading-link and lightbox-secNav-btnClose objects
			$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
				_finish();
				return false;
			});
			// If window was resized, calculate the new overlay dimensions
			$(window).resize(function() {
				// Get page sizes
				var arrPageSizes = ___getPageSize();
				// Style overlay and show it
				$('#jquery-overlay').css({
					width:		arrPageSizes[0],
					height:		arrPageSizes[1]
				});
				// Get page scroll
				var arrPageScroll = ___getPageScroll();
				// Calculate top and left offset for the jquery-lightbox div object and show it
				$('#jquery-lightbox').css({
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				});
			});
		}
		/**
		 * Prepares image exibition; doing a image´s preloader to calculate it´s size
		 *
		 */
		function _set_image_to_view() { // show the loading
			// Show the loading
			$('#lightbox-loading').show();
			if ( settings.fixedNavigation ) {
				$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			} else {
				// Hide some elements
				$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			}
			// Image preload process
			var objImagePreloader = new Image();
			objImagePreloader.onload = function() {
				$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);
				// Perfomance an effect in the image container resizing it
				_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
				//	clear onLoad, IE behaves irratically with animated gifs otherwise
				objImagePreloader.onload=function(){};
			};
			objImagePreloader.src = settings.imageArray[settings.activeImage][0];
		};
		/**
		 * Perfomance an effect in the image container resizing it
		 *
		 * @param integer intImageWidth The image´s width that will be showed
		 * @param integer intImageHeight The image´s height that will be showed
		 */
		function _resize_container_image_box(intImageWidth,intImageHeight) {
			// Get current width and height
			var intCurrentWidth = $('#lightbox-container-image-box').width();
			var intCurrentHeight = $('#lightbox-container-image-box').height();
			// Get the width and height of the selected image plus the padding
			var intWidth = (intImageWidth + (settings.containerBorderSize * 2)); // Plus the image´s width and the left and right padding value
			var intHeight = (intImageHeight + (settings.containerBorderSize * 2)); // Plus the image´s height and the left and right padding value
			// Diferences
			var intDiffW = intCurrentWidth - intWidth;
			var intDiffH = intCurrentHeight - intHeight;
			// Perfomance the effect
			$('#lightbox-container-image-box').animate({ width: intWidth, height: intHeight },settings.containerResizeSpeed,function() { _show_image(); });
			if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
				if ( $.browser.msie ) {
					___pause(250);
				} else {
					___pause(100);	
				}
			} 
			$('#lightbox-container-image-data-box').css({ width: intImageWidth });
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ height: intImageHeight + (settings.containerBorderSize * 2) });
		};
		/**
		 * Show the prepared image
		 *
		 */
		function _show_image() {
			$('#lightbox-loading').hide();
			$('#lightbox-image').fadeIn(function() {
				_show_image_data();
				_set_navigation();
			});
			_preload_neighbor_images();
		};
		/**
		 * Show the image information
		 *
		 */
		function _show_image_data() {
			$('#lightbox-container-image-data-box').slideDown('fast');
			$('#lightbox-image-details-caption').hide();
			if ( settings.imageArray[settings.activeImage][1] ) {
				$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
			}
			// If we have a image set, display 'Image X of X'
			if ( settings.imageArray.length > 1 ) {
				$('#lightbox-image-details-currentNumber').html(settings.txtImage + ' ' + ( settings.activeImage + 1 ) + ' ' + settings.txtOf + ' ' + settings.imageArray.length).show();
			}		
		}
		/**
		 * Display the button navigations
		 *
		 */
		function _set_navigation() {
			$('#lightbox-nav').show();

			// Instead to define this configuration in CSS file, we define here. And it´s need to IE. Just.
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
			
			// Show the prev button, if not the first image in set
			if ( settings.activeImage != 0 ) {
				if ( settings.fixedNavigation ) {
					$('#lightbox-nav-btnPrev').css({ 'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat' })
						.unbind()
						.bind('click',function() {
							settings.activeImage = settings.activeImage - 1;
							_set_image_to_view();
							return false;
						});
				} else {
					// Show the images button for Next buttons
					$('#lightbox-nav-btnPrev').unbind().hover(function() {
						$(this).css({ 'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat' });
					},function() {
						$(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
					}).show().bind('click',function() {
						settings.activeImage = settings.activeImage - 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			
			// Show the next button, if not the last image in set
			if ( settings.activeImage != ( settings.imageArray.length -1 ) ) {
				if ( settings.fixedNavigation ) {
					$('#lightbox-nav-btnNext').css({ 'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat' })
						.unbind()
						.bind('click',function() {
							settings.activeImage = settings.activeImage + 1;
							_set_image_to_view();
							return false;
						});
				} else {
					// Show the images button for Next buttons
					$('#lightbox-nav-btnNext').unbind().hover(function() {
						$(this).css({ 'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat' });
					},function() {
						$(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
					}).show().bind('click',function() {
						settings.activeImage = settings.activeImage + 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			// Enable keyboard navigation
			_enable_keyboard_navigation();
		}
		/**
		 * Enable a support to keyboard navigation
		 *
		 */
		function _enable_keyboard_navigation() {
			$(document).keydown(function(objEvent) {
				_keyboard_action(objEvent);
			});
		}
		/**
		 * Disable the support to keyboard navigation
		 *
		 */
		function _disable_keyboard_navigation() {
			$(document).unbind();
		}
		/**
		 * Perform the keyboard actions
		 *
		 */
		function _keyboard_action(objEvent) {
			// To ie
			if ( objEvent == null ) {
				keycode = event.keyCode;
				escapeKey = 27;
			// To Mozilla
			} else {
				keycode = objEvent.keyCode;
				escapeKey = objEvent.DOM_VK_ESCAPE;
			}
			// Get the key in lower case form
			key = String.fromCharCode(keycode).toLowerCase();
			// Verify the keys to close the ligthBox
			if ( ( key == settings.keyToClose ) || ( key == 'x' ) || ( keycode == escapeKey ) ) {
				_finish();
			}
			// Verify the key to show the previous image
			if ( ( key == settings.keyToPrev ) || ( keycode == 37 ) ) {
				// If we´re not showing the first image, call the previous
				if ( settings.activeImage != 0 ) {
					settings.activeImage = settings.activeImage - 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
			// Verify the key to show the next image
			if ( ( key == settings.keyToNext ) || ( keycode == 39 ) ) {
				// If we´re not showing the last image, call the next
				if ( settings.activeImage != ( settings.imageArray.length - 1 ) ) {
					settings.activeImage = settings.activeImage + 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
		}
		/**
		 * Preload prev and next images being showed
		 *
		 */
		function _preload_neighbor_images() {
			if ( (settings.imageArray.length -1) > settings.activeImage ) {
				objNext = new Image();
				objNext.src = settings.imageArray[settings.activeImage + 1][0];
			}
			if ( settings.activeImage > 0 ) {
				objPrev = new Image();
				objPrev.src = settings.imageArray[settings.activeImage -1][0];
			}
		}
		/**
		 * Remove jQuery lightBox plugin HTML markup
		 *
		 */
		function _finish() {
			$('#jquery-lightbox').remove();
			$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
			// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'visible' });
		}
		/**
		 / THIRD FUNCTION
		 * getPageSize() by quirksmode.com
		 *
		 * @return Array Return an array with page width, height and window width, height
		 */
		function ___getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				if(document.documentElement.clientWidth){
					windowWidth = document.documentElement.clientWidth; 
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			// for small pages with total height less then height of the viewport
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < windowWidth){	
				pageWidth = xScroll;		
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
			return arrayPageSize;
		};
		/**
		 / THIRD FUNCTION
		 * getPageScroll() by quirksmode.com
		 *
		 * @return Array Return an array with x,y page scroll values.
		 */
		function ___getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;	
			}
			arrayPageScroll = new Array(xScroll,yScroll);
			return arrayPageScroll;
		};
		 /**
		  * Stop the code execution from a escified time in milisecond
		  *
		  */
		 function ___pause(ms) {
			var date = new Date(); 
			curDate = null;
			do { var curDate = new Date(); }
			while ( curDate - date < ms);
		 };
		// Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
		return this.unbind('click').click(_initialize);
	};
})(jQuery); // Call and execute the function immediately passing the jQuery object