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
 * @license CC Attribution-No Derivative Works 2.5 Brazil - http://creativecommons.org/licenses/by-nd/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */

// Offering a Custom Alias suport - More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
(function($) {
	/**
	 * $ is an alias to jQuery object
	 *
	 */
	$.fn.popup = function(settings) {
		// Settings to configure the jQuery lightBox plugin how you like
		settings = jQuery.extend({
// Configuration related to overlay
overlayBgColor: 		'#ffffff',		// (string) Background color to overlay; inform a hexadecimal value like: #RRGGBB. Where RR, GG, and BB are the hexadecimal values for the red, green, and blue values of the color.
overlayOpacity:0.8,		// (integer) Opacity value to overlay; inform: 0.X. Where X are number from 0 to 9
// Configuration related to navigation
fixedNavigation:		false,		// (boolean) Boolean that informs if the navigation (next and prev button) will be fixed or not in the interface.
// Configuration related to images
imageLoading:'/mlcomm/_images/lightbox/lightbox-ico-loading.gif',		// (string) Path and the name of the loading icon
imageBtnPrev:'images/lightbox-btn-prev.gif',// (string) Path and the name of the prev button image
imageBtnNext:'images/lightbox-btn-next.gif',// (string) Path and the name of the next button image
imageBtnClose:'images/lightbox-btn-close.gif',		// (string) Path and the name of the close btn
imageBlank:	'images/lightbox-blank.gif',// (string) Path and the name of a blank image (one pixel)
// Configuration related to container image box
containerBorderSize:	10,// (integer) If you adjust the padding in the CSS for the container, #lightbox-container-image-box, you will need to update this value
containerResizeSpeed:	400,		// (integer) Specify the resize duration of container image. These number are miliseconds. 400 is default.
// Configuration related to texts in caption. For example: Image 2 of 8. You can alter either "Image" and "of" texts.
txtImage:	'Image',	// (string) Specify text "Image"
txtOf:		'of',		// (string) Specify text "of"
// Configuration related to keyboard navigation
keyToClose:	'c',		// (string) (c = close) Letter to close the jQuery lightBox interface. Beyond this letter, the letter X and the SCAPE key is used to.
keyToPrev:	'p',		// (string) (p = previous) Letter to show the previous image
keyToNext:	'n',		// (string) (n = next) Letter to show the next image.
// Don´t alter these variables in any way
imageArray:	[],
activeImage:0
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
									<img id="lightbox-image">
										<div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="../_sripts/' + settings.imageLoading + '"></a></div>
										<div id="lightbox-container-image-data-box">
												<div id="lightbox-container-image-data">
													<div id="lightbox-image-details">
															<span id="lightbox-image-details-caption"></span>
															</div>
													</div>
												<div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose">Close <strong>X</strong></a></div>
										</div>
									</div>
							</div>
					</div>
		 *
		 */
		function _set_interface() {
// Apply the HTML markup into body tag


					
				
			 	if($('#hbo-go').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box short" style="padding-top: 50px;"><img src="/mlcomm/_images/att_uverse/uverse_television/logo_hbo_go.jpg" alt="HBO GO"  style="float: left; margin-top: 20px;"/><p style="border-left: 1px solid #CCCCCC; float: left; margin-left: 30px; padding-left: 20px;  width: 435px;">HBO GO es gratis para todos los clientes de U-verse que se subscriban a HBO. La aplicaci&oacute;n puede usarse en cualquier localidad dentro de los Estados Unidos con una conexi&oacute;n inal&aacute;mbrica 3G. Para obtener acceso inmediato a la programaci&oacute;n, los usuarios de U-verse y HBO pueden registrarse en HBOGO.com. Deber&aacute; utilizar su nombres de usuario y contrase&ntilde;a de U-verse para autentificar el sitio.</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 								
				}	
					

				
			 	if($('#contact-news').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box short"><h5>Contactos   para medios de communicaci&oacute;n</h5>  <p><strong>Ray Fohr</strong><br />    (713) 513-9503<br />    <a href="mailto:rfohr@attnews.us">rfohr@attnews.us</a></p>  <p><strong>Vanessa Astros</strong><br />    (713) 513-9521 <br />    <a href="mailto:vastros@attnews.us">vastros@attnews.us</a></p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 								
				}	
					

				
			 	if($('#flickr').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box"><h5>AT&amp;T Fotos de Internet de Flickr</h5>  <p>AT&amp;T Online Photos from Flickr&trade; es una forma que  le permite a miembros de AT&amp;T U-verse<sup>&reg;</sup> poder ver fotos en su  televisi&oacute;n que colocaron en l&iacute;nea en <a href="http://www.flickr.com/" target="_blank" title="Flickr">www.Flickr.com</a>.  Todos los clientes de AT&amp;T U-verse<sup>&reg;</sup>    e Internet de Alta Velocidad reciben una  suscripci&oacute;n b&aacute;sica gratis a   Flickr. Debes ingresarte con tu cuenta principal de Internet de Alta   Velocidad de AT&amp;T y organizar tus fotos en grupos (sets)  para   poderlas ver en tu pantalla de televisi&oacute;n. </p>  <p>Ya que una foto especifica haya sido seleccionada,  un <em>slideshow </em>(cuando   se muestran  im&aacute;genes continuas autom&aacute;ticamente) de todas las fotos en   ese grupo o "set" se  ver&aacute;n en pantalla. Debes notar que existe un   l&iacute;mite de 200 fotos por grupo y no  pueden ser m&aacute;s grande, en tama&ntilde;o,   que 100MB de fotos (10MB por foto). Cada mes,  si un grupo contiene m&aacute;s   de 200 fotos, s&oacute;lo las m&aacute;s recientes fotos a&ntilde;adidas se  podr&aacute;n ver. Las   dem&aacute;s no podr&aacute;n verse en esta aplicaci&oacute;n. </p>  <p>Esta aplicaci&oacute;n se encuentra en el canal 91 y en la  pantalla del   Men&uacute;. Los usuarios podr&aacute;n oprimir "91" en su control remoto,  elegir el   canal desde la gu&iacute;a, o en el Men&uacute; bajo el titulo. </p>  <p><strong>La calidad de la foto en la televisi&oacute;n puede variar dependiendo   de la resoluci&oacute;n de la foto tomada y de las caracter&iacute;sticas de la    televisi&oacute;n.</strong></p> <img src="/mlcomm/_images/att_uverse/uverse_internet/slide1.jpg" alt="" /> <img src="/mlcomm/_images/att_uverse/uverse_internet/slide2.jpg" alt=""  /> <img src="/mlcomm/_images/att_uverse/uverse_internet/slide3.jpg" alt=""   /> <p><strong>Instrucciones</strong></p>  <p>Para ver las fotos en un grupo (set) de &aacute;lbum: </p>  <ul type="disc">    <li>Usa las flechas para mover al set de fotos y en el control remoto, oprime <strong>OK</strong>.</li>    <li>Navega de izquierda a derecha sobre el filme dentro del grupo (set). Oprime <strong>OK</strong> para ver la foto. Un <em>slideshow</em> comenzar&aacute; autom&aacute;ticamente desde ese punto.</li>    <li>Para quedarte en la foto, presiona <strong>OK</strong> de nuevo para pararlo. Oprime <strong>OK</strong> de nuevo para que comience una vez mas.</li>  </ul>  <p>(*) No disponible en todas las &aacute;reas. Si "Online Photos" no   aparece en el canal 91 o en el Men&uacute;, esta aplicaci&oacute;n aun no est&aacute;   disponible en tu ciudad.</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 								
				}	

				
			 	if($('#service-chart').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" ><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box"><h5>La Competencia de AT&amp;T U-verse<sup>&reg;</sup></h5><table width="100%" id="service-chart">       <tr class="gray">        <td>&nbsp;</td>        <td width="120">Servicio Tel&eacute;fono Digital <nobr>U-verse</nobr><sup>&reg;</sup>Ilimitado</td>       <td width="120">Servicio Tel&eacute;fono Digital <nobr>U-verse</nobr><sup>&reg; </sup>Voice 250</td>      </tr>      <tr>        <td class="tLeft">&nbsp;</td>        <td>Desde  $35/mes</td>        <td>Desde $25/mes</td>      </tr>      <tr class="blue-row">        <td class="tLeft">Minutos</td>        <td>Minutos ilimitados</td>        <td>250 minutos cada mes</td>      </tr>      <tr>        <td class="tLeft">Precio Por Minuto</td>        <td>Ninguno</td>        <td>5&cent; por <strong>minuto (despu&eacute;s de 250 minutos cada mes)</strong></td>      </tr>      <tr class="gray">        <td class="tLeft" colspan="3">Detalles</td>      </tr>      <tr>        <td class="tLeft">Llamadas Locales y de Larga Distancia dentro de Estados Unidos y sus territorios (Puerto Rico, Guam, Las Islas Virgenes E.U., y Las Marianas del Norte)</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Llamadas a Canad&aacute;</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>      </tr>      <tr>        <td class="tLeft">Llamadas internacionales, incluyendo cargos de llamadas hechas a tel&eacute;fonos de servicio m&oacute;vil internacional no son incluidos y son facturados por separado</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Primer listado publicado en el directorio incluido sin cargo adicional (m&aacute;s opciones abajo)</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Mensajes de Texto AT&amp;T&nbsp;<nobr>U-verse</nobr><sup>&reg;</sup>  con la capacidad de integrar tus servicios de tel&eacute;fono digital <nobr>U-verse</nobr><sup>&reg; </sup>y tu servicio m&oacute;vil en un solo paquete</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Acceso a Administraci&oacute;n de la cuenta por Internet para  personalizar tu Servicio Tel&eacute;fono Digital <nobr>U-verse</nobr><sup>&reg;</sup></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Funciones de llamadas tradicionales: bloqueador de llamadas,  re-envi&oacute; de llamadas an&oacute;nimas, re-env&iacute;o de llamada ocupada llamada en espera, identificador de llamadas, llamadas en espera exclusivas, llamadas entre tres</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Funciones de Llamadas Avanzadas: re-env&iacute;o de llamadas an&oacute;nimas, re-env&iacute;o de llamadas ocupadas, historial de llamadas, filtraci&oacute;n de llamadas, transferencia de llamadas, bloqueador de identificador de llamadas, haz clic para llamar, asistencia de operador, no molestar, bloqueador de llamadas internacionales, funci&oacute;n de ubicaci&oacute;n, hacer una llamada, no contestar re-env&iacute;o de llamada, re-env&iacute;o de llamada seguro,  cuentas adicionales, AT&amp;T&nbsp;<nobr>U-verse</nobr><sup>&reg;</sup>  <sup>SM</sup> Messaging</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="gray">        <td class="tLeft" colspan="3">Funciones Opcionales (ver cargos adicionales abajo)</td>      </tr>      <tr>        <td class="tLeft">Segunda l&iacute;nea ($15.00)</td>        <td>Disponible</td>        <td>Disponible (minutos se comparten)</td>      </tr>      <tr class="blue-row">        <td class="tLeft">Call Trace ($8.00)</td>        <td>Disponible</td>        <td>Disponible</td>      </tr>      <tr>        <td class="tLeft">Listados en el directorio<br/>          Publicaciones adicionales ($1.50)<br/>          Cargo por no participar en la lista ($2.25)<br/>          Cargo por no publicarse  ($4.95)</td>        <td>Disponible</td>        <td>Disponible</td>      </tr>      <tr class="blue-row">        <td class="tLeft">Asistencia de operador ($2.00)<br/>          (incluye finalizar la llamada) </td>        <td>Disponible</td>        <td>Disponible</td>      </tr>      <tr>        <td class="tLeft">Asistencia de operador ($2.00)</td>        <td>Disponible</td>        <td>Disponible</td>      </tr>    </table> </div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 								
				}	
				
				
				
				
				
				
			 	if($('#voice-chart').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" ><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box"><h5>La Competencia de AT&amp;T U-verse<sup>&reg;</sup></h5><table width="100%" id="compare-chart">      <tr>        <th width="120">&nbsp;</th>        <th  width="130">AT&amp;T U-verse<sup>&reg;</sup> Voice</th>        <th  width="100">Charter</th>       <th  width="88">Comcast</th>        <th width="80">Cox</th>        <th width="85">Time Warner</th>        <th width="100">CableVision</th>      </tr>      <tr class="title-row">        <td colspan="7" class="tLeft">Funci&oacute;n</td>      </tr>      <tr>        <td class="tLeft">Llamada en Espera</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Re-env&iacute;o de Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Llamada entre tres personas</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Identificador de Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Identificador de Llamada en Espera</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Timbre de Prioridad</td>        <td></td>        <td>Timbre Personalizado</td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td>Timbre Para Gente Importante</td>      </tr>      <tr>        <td class="tLeft">Regresar Llamada</td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Marcado Automatico Repetitivo</td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Marcar N&uacute;mero Ocupado</td>        <td></td>        <td>Marcar N&uacute;mero Ocupado</td>      </tr>      <tr>        <td class="tLeft">Llamadas Seguras</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Filtraci&oacute;n de Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Re-env&iacute;o de Llamada Exclusiva</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>      </tr>      <tr>        <td class="tLeft">Bloquear Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Filtraci&oacute;n de Llamada</td>        <td>Filtraci&oacute;n de Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Bloqueador de Llamadas An&oacute;nimas</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Cargo Adicional</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Bloqueador de Identificador de Llamada</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Bloqueador de Identificador de Llamadas Llamada por (*82)</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Correo de Voz</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Cargo Adicional</td>        <td>Cargo Adicional</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">SpeedDial</td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>      </tr>      <tr>        <td class="tLeft">No Molestar</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>        <td></td>        <td></td>        <td></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Funci&oacute;n de Ubicaci&oacute;n</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Historial de Llamadas por Acceso del Internet</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Solo Detalles de Llamadas Mensuales</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Acceso al Correo de Voz por el Internet</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Clic Para Llamar</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>        <td></td>        <td></td>        <td></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Apoyo de Fax/M&oacute;dem</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>      </tr>      <tr>        <td class="tLeft">Entrega de mensajes a un n&uacute;mero alternativo en el evento de interrupci&oacute;n a servicio de luz</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td></td>      </tr>      <tr class="blue-row">        <td class="tLeft">Respaldo de Bater&iacute;a Inicial</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td>Disponible para Comprar</td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td><img src="/mlcomm/_images/att_uverse/uverse_voice/icn_orange_dot.gif"/></td>        <td></td>        <td>Disponible para Comprar</td>      </tr>    </table>    <p>Se basa en la informaci&oacute;n contenida en los siguentes sitios de Internet: <a href="http://www.charter.com">www.charter.com</a>, <a href="http://www.comcast.com">www.comcast.com</a>, <a href="http://www.cox.com">www.cox.com</a>, <a href="http://www.timewarnercable.com">www.timewarnercable.com</a> y <a href="http://www.cablevision.com">www.cablevision.com</a> desde el 10 de Diciembre 2007.</p> </div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 								
				}							
				
				
				
				
				
				
			 	if($('#dvr-faq').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" ><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box"><h5>AT&amp;T Total Home DVR</h5><p><strong>&iquest;Qu&eacute; es una videograbadora digital (DVR)?</strong></p>          		          <p>Una videograbadora digital (DVR) te permite grabar, almacenar y   reproducir en forma digital tus programas preferidos. La DVR procesa   hasta cuatro transmisiones de video que ingresan a tu casa. </p>          		          <p>Las funciones incluyen: </p>          		          <ul>          		            <li>La habilidad de poner en pausa y retroceder programas de televisi&oacute;n en vivo en el televisor conectado a la DVR </li>          		            <li>Grabaci&oacute;n de hasta 4 programas simult&aacute;neamente </li>          		            <li><strong>Graba hasta 233 horas de TV est&aacute;ndar o 65 horas  de programaci&oacute;n en HD: </strong> A clientes nuevos que ordenen U450 servicio de tecnolog&iacute;a HD se les   garantiza un DVR con capacidad grande  de 233 horas de grabaci&oacute;n de TV   est&aacute;ndar y hasta 65 horas de grabaci&oacute;n HD. DVR  con 133 horas de   grabaci&oacute;n de TV est&aacute;ndar o 37 horas de grabaci&oacute;n de TV HD es  provisto   en otros casos. Mejoras al DVR  son sujetas a disponibilidad y cargos   adicionales. </li>	            </ul>                           <p><strong>&iquest;C&oacute;mo se utiliza la DVR?</strong></p>                          <p>Los clientes de Televisi&oacute;n Digital de AT&amp;T pueden programar y   administrar los programas de televisi&oacute;n grabados 1) directamente por el   televisor a trav&eacute;s de la gu&iacute;a de programaci&oacute;n en pantalla, 2) por   Internet, desde el portal de AT&amp;T, o 3) a trav&eacute;s de un tel&eacute;fono   m&oacute;vil de AT&amp;T con la capacidad. </p>                          <p><strong>1) En pantalla</strong> <br />                            Usa la gu&iacute;a de programaci&oacute;n (Program Guide) en pantalla para   buscar programaci&oacute;n actual y de hasta una semana en adelantado. Con la   DVR puedes parar y repetir programas de televisi&oacute;n en vivo o programar   grabaciones por una sola vez o programar una suscripci&oacute;n a series   televisivas. Puedes mirar los programas grabados cuando gustes,   adelantar los anuncios comerciales, pausar y repetir como gustes.</p>                          <p><strong>2) Acceso remoto por Internet (s&oacute;lo para AT&amp;T U-verse<sup>&reg;</sup>   )</strong><br />                            Como suscriptor de Televisi&oacute;n Digital de AT&amp;T, puedes   programar la grabaci&oacute;n de programas de televisi&oacute;n en forma remota, desde   tu casa, el trabajo u otra ciudad, en cualquier lugar que tengas acceso   a Internet. Para ello, debes usar el acceso remoto por Internet de   AT&amp;T. </p>                          <ol>                            <li>Visita <a href="http://att.my.yahoo.com" title="Yahoo!" target="_blank">http://att.my.yahoo.com</a> (en ingl&eacute;s).</li>                            <li>Ingresa con tu identificaci&oacute;n y contrase&ntilde;a.</li>                            <li>Selecciona el servicio de televisi&oacute;n al que est&aacute;s suscrito.</li>                            <li>Programa las grabaciones.</li>                          </ol>                          <p><strong>3) Acceso remoto por tel&eacute;fono m&oacute;vil (s&oacute;lo para AT&amp;T U-verse<sup>&reg;</sup> )</strong><br />                            Puedes usar la interfaz de acceso remoto por tel&eacute;fono m&oacute;vil para interactuar  con la DVR de U-verse<sup>&reg;</sup> (espa&ntilde;ol.att.com.uverse)   a trav&eacute;s de un tel&eacute;fono m&oacute;vil u otro aparato port&aacute;til compatible con el   protocolo para aplicaciones inal&aacute;mbricas (WAP) 2.0. Esta interfaz de   acceso remoto por tel&eacute;fono m&oacute;vil se ofrece sin costo alguno a los   suscriptores de Televisi&oacute;n Digital de AT&amp;T. (El servicio m&oacute;vil y el   uso de datos se deben pagar por separado.)</p>                          <p>Sigue estos sencillos pasos para tener acceso remoto por tel&eacute;fono m&oacute;vil a AT&amp;T U-verse<sup>&reg;</sup>   y programar grabaciones:</p>                          <ol>                            <li>Desde tu tel&eacute;fono m&oacute;vil, visita <a href="http://us.m.yahoo.com/p/wra" title="Yahoo!" target="_blank">http://us.m.yahoo.com/p/wra</a> (en ingl&eacute;s) para ingresar en el acceso remoto por tel&eacute;fono m&oacute;vil de   AT&amp;T. Si no has ingresado, te pedir&aacute; que ingreses con la   identificaci&oacute;n de usuario y contrase&ntilde;a de AT&amp;T.</li>                            <li>Aparecer&aacute; el acceso remoto por tel&eacute;fono m&oacute;vil de AT&amp;T con   un cuadro de b&uacute;squeda y tres enlaces principales de navegaci&oacute;n: My   Recordings (mis grabaciones), Scheduled Recordings (grabaciones   programadas) y Series Recordings (grabaci&oacute;n de series). </li>                            <li>Escribe el nombre de un programa en el cuadro de b&uacute;squeda. </li>                            <li>Selecciona el programa que deseas grabar de los resultados de la b&uacute;squeda. </li>                            <li>Se mostrar&aacute;n los detalles del programa y tendr&aacute;s la opci&oacute;n de grabarlo por &uacute;nica vez o como una serie. </li>                            <li>El acceso remoto por tel&eacute;fono m&oacute;vil de AT&amp;T tambi&eacute;n te   permite ver o modificar tu lista de programas grabados, grabaciones   programadas o grabaciones de series.</li>                          </ol> </div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 				
				}			
			 	
				
			 	if($('#wifi-premier').is('.lightboxon')) { 
				 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" ><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box"><h5>Wi-Fi de AT&amp;T Premier</h5><table>  <tr>   <th width="16%">Producto</th>    <th width="18%">Costo</th>    <th width="18%">Ubicaciones de hotspots Wi-Fi de AT&amp;T</th>    <th width="22%"><em>Hotspots Asociados*</em></th>    <th width="30%"><em>Disponible para</em></th>  </tr>  <tr>    <td>Wi-Fi B&aacute;sico de AT&amp;T sin costo adicional</td>    <td>SIN COSTO ADICIONAL</td>    <td align="center"><img src="/mlcomm/_images/att_internet/wifi_check.gif" /></td>    <td></td>    <td>Clientes de Internet de Alta Velocidad de AT&amp;T o U-verse, de planes de todas las velocidades, y subscriptores de LaptopConnect con planes que califiquen.**</td>  </tr>    <tr>    <td>Wi-Fi de AT&amp;T Premier</td>    <td>$19.99<br />      por mes<br />      (con un contrato de 1 a&ntilde;o)</td>    <td align="center"><img src="/mlcomm/_images/att_internet/wifi_check.gif" /></td>    <td align="center"><img src="/mlcomm/_images/att_internet/wifi_check.gif" /></td>    <td>Cualquier cliente.      No necesitas ser un subscriptor de Internet de Alta Velocidad de AT&amp;T. </td>  </tr>  <tr>    <td>AT&amp;T Wi-Fi On the Spot</td>    <td>De $3.99 a $7.99<br />      por sesi&oacute;n<br />      (precios y tiempo de sesiones var&iacute;an por ubicaci&oacute;n del hotspot)</td>    <td align="center"><img src="/mlcomm/_images/att_internet/wifi_check.gif" /></td>    <td></td>    <td>Cualquier cliente.      No necesitas ser un subscriptor de Internet de Alta Velocidad de AT&amp;T.</td>  </tr>  <tr class="last">    <td></td>    <td></td>    <td></td>    <td>*Incluyendo miles de zonas de conexi&oacute;n Wi-Fi.</td>    <td>Cualquier cliente.      No necesitas ser un subscriptor de Internet de Alta Velocidad de AT&amp;T.</td>  </tr></table></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 				
				}			
			 	
				
				if($('#ppm-countries-e').is('.lightboxon')) { 
				 
 
				$('body').append('<style>#popup-ppm .ppm-popup .hide {right: -7px;} </style><script>$("li").click(function() { $(".ppm-popup").hide(); current = $(this).attr("id"); current = "#" + current + "-box";  $(current).show();	}); $(".hide").click(function() { $(".ppm-popup").hide();});</script><div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-ppm"><ul><li id="argentina">Argentina</li><li id="belize">Belize</li><li id="bolivia">Bolivia</li><li id="brazil">Brasil</li><li id="chile">Chile</li><li id="colombia">Colombia</li></ul><ul><li id="costarica">Costa Rica</li><li id="ecuador">Ecuador</li><li id="honduras">Honduras</li><li id="mexico">Mexico</li><li id="nicaragua">Nicaragua</li><li id="panama">Panama</li></ul><ul><li id="paraguay">Paraguay</li><li id="peru">Peru</li><li id="uruguay">Uruguay</li><li id="venezuela">Venezuela</li></ul><div class="ppm-popup" id="argentina-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Argentina $0.17</h6><p class="hide">Close</p></div><div class="ppm-popup" id="belize-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Belize $0.49</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="bolivia-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Bolivia $0.33</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="brazil-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Brasil $0.15</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="chile-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Chile $0.19</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="colombia-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Colombia $0.17</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="costarica-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Costa Rica $0.27</h6><p class="hide">Close</p></div>								<div class="ppm-popup" id="ecuador-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Ecuador $0.32</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="honduras-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Honduras $0.41</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="mexico-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Mexico $0.09 y $0.10</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="nicaragua-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Nicaragua $0.40</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="panama-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Panama $0.35</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="paraguay-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Paraguay $0.40</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="peru-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Peru $0.22</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="uruguay-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Uruguay $0.40</h6><p class="hide">Close</p></div>				<div class="ppm-popup" id="venezuela-box"><p class="details"><strong>Prices<br />Description</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Term</strong> Per month<br /><strong>Price</strong> $5.00</p><h6>Venzuela $0.20</h6><p class="hide">Close</p></div> </div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 
				}
			
			 	if($('#ppm-countries').is('.lightboxon')) { 
 
				$('body').append('<script>$("li").click(function() { $(".ppm-popup").hide(); current = $(this).attr("id"); current = "#" + current + "-box";  $(current).show();	}); $(".hide").click(function() { $(".ppm-popup").hide();});</script><div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-ppm"><ul><li id="argentina">Argentina</li><li id="belize">Belice</li><li id="bolivia">Bolivia</li><li id="brazil">Brasil</li><li id="chile">Chile</li><li id="colombia">Colombia</li></ul><ul><li id="costarica">Costa Rica</li><li id="ecuador">Ecuador</li><li id="honduras">Honduras</li><li id="mexico">M&eacute;xico</li><li id="nicaragua">Nicaragua</li><li id="panama">Panam&aacute;</li></ul><ul><li id="paraguay">Paraguay</li><li id="peru">Per&uacute;</li><li id="uruguay">Uruguay</li><li id="venezuela">Venezuela</li></ul><div class="ppm-popup" id="argentina-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Argentina $0.17</h6><p class="hide">Cerrado</p></div><div class="ppm-popup" id="belize-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Belice $0.49</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="bolivia-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Bolivia $0.33</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="brazil-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Brasil $0.15</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="chile-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Chile $0.19</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="colombia-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Colombia $0.17</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="costarica-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Costa Rica $0.27</h6><p class="hide">Cerrado</p></div>								<div class="ppm-popup" id="ecuador-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Ecuador $0.32</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="honduras-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Honduras $0.41</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="mexico-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>M&eacute;xico $0.09 y $0.10</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="nicaragua-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Nicaragua $0.40</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="panama-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Panam&aacute; $0.35</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="paraguay-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Paraguay $0.40</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="peru-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Per&uacute; $0.22</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="uruguay-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Uruguay $0.40</h6><p class="hide">Cerrado</p></div>				<div class="ppm-popup" id="venezuela-box"><p class="details"><strong>Precios<br />Descripci&oacute;n</strong><br />AT&amp;T Worldwide<br />Value Calling<sup>SM</sup> <br /> <strong>Plazo</strong> Por mes<br /><strong>Precio</strong> $5.00</p><h6>Venzuela $0.20</h6><p class="hide">Cerrado</p></div> </div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div></div></div>');	 
				}
				

			
			 	if($('#functions').is('.lightboxon')) { 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image" class="popup-long"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-functions"><h5>Informaci&oacute;n sobre las funciones de llamadas</h5><table><tr><td class="header" colspan="2">Manejo de llamadas</th></tr><tr><td class="left-col"><p><strong>Call Notes<sup>&reg;</sup></strong></p></td><td><p>Te permite recibir recados, o correo de voz, cuando est&eacute;s fuera de casa, en el tel&eacute;fono, o en l&iacute;nea. </p><ul>        <li>Si te pierdes una llamada, te pueden dejar un recado sin que tengas que comprar una contestadora autom&aacute;tica.</li>      </ul>    </td></tr><td class="left-col"><p><strong>Call Notes<sup>&reg;</sup> Plus</strong></p></td><td><p>Incluye todos los beneficios de Call Notes<sup>&reg;</sup>, m&aacute;s funciones extras:</p><ul>        <li>Cuatro buzones adicionales para miembros de tu hogar, se pueden comprar m&aacute;s si gustas.</li>        <li>La habilidad de enviar los recados a cualquier otro n&uacute;mero telef&oacute;nico incluyendo tel&eacute;fono m&oacute;vil, por si estas fuera de casa.</li>        <li>Puedes recibir alertas para citas importantes.</li>      </ul>    </td></tr><tr><td class="left-col"><p><strong>AT&amp;T Unified Messaging<sup>SM</sup></strong></p></td><td><p>Combina el correo de voz de tel&eacute;fono de cable con el servicio de correo de voz del tel&eacute;fono m&oacute;vil, fax y correo electr&oacute;nico. </p><ul>        <li>Te permite enviar un recado, o correo de voz, que hayas recibido en casa a tu correo electr&oacute;nico del trabajo; recibir&aacute;s una alerta a tu tel&eacute;fono m&oacute;vil al recibir un recado en casa.</li>        <li>Podr&aacute;s revisar tus recados, faxes, o e-mail por medio de tu tel&eacute;fono o computadora</li>      </ul>    </td></tr><tr><td colspan="2" class="header">Re-env&iacute;o de llamadas</td></tr><tr><td class="left-col"><p><strong>Call forwarding</strong></p></td> <td><p>Re-env&iacute;o de llamadas a otro n&uacute;mero telef&oacute;nico. </p><ul>        <li>Te permite recibir llamadas hechas a tu n&uacute;mero telef&oacute;nico en casa de otros por medio de la l&iacute;nea telef&oacute;nica de ellos.</li>      </ul></td></tr><tr><td class="left-col"><p><strong>Selective Call Forwarding</strong></p></td><td><p>Re-env&iacute;a llamadas a tu gusto a otro n&uacute;mero telef&oacute;nico.      <ul>        <li>Te permite recibir llamadas hechas de n&uacute;meros selectos a tu n&uacute;mero telef&oacute;nico en casa de otros por medio de la l&iacute;nea telef&oacute;nica de ellos.</li>      </ul>  </td></tr><tr><td class="header" colspan="2">Marcado autom&aacute;tico</td></tr><tr><td class="left-col"><p><strong>Auto Redial</strong></p></td><td><p>Autom&aacute;ticamente llama a un n&uacute;mero que este ocupado hasta que est&eacute; disponible.</td></tr> <tr><td class="left-col"><p><strong>Speed Calling 8</strong></p></td><td><p>Programaci&oacute;n de ocho n&uacute;meros telef&oacute;nicos para marcar con rapidez.</td></tr> <tr><td class="left-col"><p><strong>Call Return</strong></p></td><td><p>Autom&aacute;ticamente &ndash; al oprimir un bot&oacute;n &ndash; marca al n&uacute;mero de origen de la ultima llamada recibida.</td></tr><tr><td colspan="2" class="header">Bloquear llamadas</td></tr><tr><td class="left-col"><p><strong>Anonymous Call Rejection</strong></p></td><td><p>Rechaza llamadas de personas o n&uacute;meros telef&oacute;nicos an&oacute;nimos.</td></tr> <tr><td class="left-col"><p><strong>Call Blocker</strong></p></td><td><p>Previene llamadas que originan de hasta 10 n&uacute;meros telef&oacute;nicos.</td></tr><td colspan="2" class="header">Bloquear llamadas</p></td></tr><tr><td class="left-col"><p><strong>Call Trace</strong></p></td><td><p>Inmediatamente tomas acci&oacute;n contra llamadas ofensivas. Al oprimir tres botones se reporta la llamada a las autoridades.</td></tr><tr><td class="left-col"><p><strong>Caller ID</strong></p></td><td><p>Identificador de llamadas que te permite ver en una pantalla quien te esta marcando.</td></tr><tr><td class="left-col"><p><strong>Call Waiting</strong></p></td><td><p>Te permite contestar una llamada mientras estas en otra.</td></tr><tr><td class="left-col"><p><strong>Call Waiting ID</strong></p></td><td><p>Ve el nombre y n&uacute;mero telef&oacute;nico de la persona llam&aacute;ndote mientras estas en otra llamada.</td></tr><tr><td class="left-col"><p><strong>Call Waiting ID Options</strong></p></td><td><p>Si est&aacute;s en una llamada y recibes otra, este identifica a la persona llam&aacute;ndote y te presta opciones de que hacer con la llamada entrante. Podr&aacute;s:      <ul>        <li>Dirigir a la llamada entrante a dejarte un recado en Call Notes<sup>&reg;</sup> sin contestarla;</li>        <li>Contestar la llamada entrante y colocar a la llamada en la que est&eacute;s en espera;</li>        <li>A&ntilde;adir a la persona llam&aacute;ndote a la llamada en la que est&aacute;s;</li>        <li>Enviar un mensaje a la persona llamadote que le diga "espera" o "ll&aacute;mame despu &eacute;s".</li>      </ul>    </td></tr><tr><td class="left-col"><p><strong>Priority Call</strong></p></td><td><p>Asigna timbres distinguidos para quien quieras de tu lista de prioridad.</td></tr><tr><td class="left-col"><p><strong>Privacy Manager<sup>&reg;</sup></strong></p></td><td><p>Te permite reconocer cuando una persona privada, no identificada, an&oacute;nima o fuera del &aacute;rea te esta llamando.</td></tr> <tr><td class="left-col"><p><strong>Personalized Ring</strong></p></td><td><p>Te permite asignar timbres distinguidos a hasta tres n&uacute;meros telef&oacute;nicos en una sola l&iacute;nea.</td></tr></table></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div> </div></div>');	 
		       
				}	
			 	if($('#billing').is('.lightboxon')) { 
 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box">   	<div id="lightbox-container-image" class="popup-long"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div> <div class="popup-box" id="popup-billing"><h5>Entendiendo Tu Factura</h5><p> Esta informaci&oacute;n, junto con la muestra de la factura residencial, est&aacute; dise&ntilde;ada para resaltar algunas de las caracter&iacute;sticas de las facturas de AT&amp;T y contestar las preguntas m&aacute;s frecuentes de nuestros clientes.</p><p><strong>Cargos Mensuales Parciales</strong></p><ul type="disc">  <li>Cargos mensuales parciales se llevar&aacute;n a cabo si se agregan o eliminan servicios durante el ciclo de facturaci&oacute;n antes de que venza la fecha de pago de la factura. </li>  <li>Los servicios que son cobrados por adelantado se identifican al ser agregados o eliminados durante el ciclo de facturaci&oacute;n antes de la fecha de pago de la factura. La cantidad actualizada es calculada de acuerdo a la cantidad de d&iacute;as que el servicio fue utilizado durante el ciclo de facturaci&oacute;n de la factura corriente. Por ejemplo, si el servicio se utilizo por &uacute;nicamente 15 d&iacute;as durante el ciclo, solamente se te cobrar&aacute; por ese tiempo de uso. </li></ul><p><strong>Cobro por Adelantado</strong></p><ul type="disc">  <li>Varios cargos recurrentes son actualizados un mes en adelante, como Cargos por Opciones Personalizadas de Llamadas, Planes de Llamadas, Servicios Locales, y Llamadas de Emergencia al 911. </li></ul><p><strong>Cobro Postergado</strong></p><ul type="disc">  <li>Algunos cargos, incluyendo cargos de uso actual, son cobrados en el momento que se incurren, lo cual puede retrasarlos en el ciclo de facturaci&oacute;n. Ejemplo de estos cargos incluyen el uso local y el pago por uso. </li></ul><p><strong>Impuestos</strong></p><ul type="disc">  <li>Impuestos pueden ser a&ntilde;adidos a varios de los cargos por servicios y productos incluidos en tu factura.<br />    <strong>Nota:</strong> Los impuestos espec&iacute;ficos var&iacute;an por estado y localidad. </li></ul><p><strong>Recargos y Otros Cargos</strong></p><ul type="disc">  <li>Estos son cargos autorizados por la ley (a parte de impuestos) y pueden incluir recargos espec&iacute;ficos del estado o cargos por regulaci&oacute;n, Cargo Federal por L&iacute;nea Suscrita y un Cargo Federal de Servicio Universal, entre otros. </li></ul><p>Si tienes preguntas o comentarios adicionales, por favor llama al n&uacute;mero de servicio local listado bajo la secci&oacute;n "Resumen" de tu factura. Agradecemos el poder brindarte los productos y servicios de la m&aacute;s alta calidad respaldados por un servicio cordial de atenci&oacute;n al cliente.</p></div><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div></div></div>');	 
				
				}	
			 	if($('#autopay').is('.lightboxon')) { 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box">   	<div id="lightbox-container-image" class="popup-long"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-autopay"><h5>Pagos autom&aacute;ticos </h5><p>  Paga tu factura telef&oacute;nica autom&aacute;ticamente haciendo los arreglos para que el monto total de tu factura se cargue a tu tarjeta de cr&eacute;dito/d&eacute;bito, o para que se descuente de tu cuenta de cheques o de ahorros en un banco, cooperativa de cr&eacute;dito o sociedad de ahorros y pr&eacute;stamos. El pago autom&aacute;tico elimina el problema de facturas olvidadas y se descuenta autom&aacute;ticamente; no necesitas comunicarte con nosotros cada mes. Tu factura programada normalmente se pagar&aacute; autom&aacute;ticamente en la fecha de vencimiento. Ofrecemos dos programas de pago autom&aacute;tico: <a href="http://www.att.com/gen/general?pid=5401#ATTDirect#ATTDirect" title="AT&amp;T Direct Payment" target="_blank">AT&amp;T Direct Payment</a> y <a href="http://www.att.com/gen/general?pid=5401#ATTEasyCharge#ATTEasyCharge"  target="_blank" title="AT&amp;T EasyCharge">AT&amp;T EasyCharge</a>.</p><p><strong>AT&amp;T Direct Payment</strong></p><p>El servicio <strong>AT&amp;T Direct Payment</strong>, o sea pago directo a AT&amp;T te permite pagar tu factura telef&oacute;nica autom&aacute;ticamente al autorizar que se descuente el monto total de su factura de una cuenta de cheques o ahorros en un banco, cooperativa de cr&eacute;dito o sociedad de ahorros y pr&eacute;stamos.</p><ul>  <li>Ahorra tiempo al no tener que hacer cheques para pagar sus facturas. </li>  <li>Ahorra dinero en estampillas y sobres. </li></ul><p>Con el servicio AT&amp;T Direct Payment tu factura telef&oacute;nica se pagar&aacute; autom&aacute;ticamente en la fecha de vencimiento. Ya no tendr&aacute;s que preocuparte de enviar por correo tus pagos, o no poder pagar tus facturas cuando est&eacute;s de vacaciones o en un viaje de negocios. Suscribirte es muy f&aacute;cil. Simplemente selecciona el enlace suscr&iacute;base en l&iacute;nea que se encuentra m&aacute;s abajo en esta p&aacute;gina y siga los pasos para enviar una solicitud.</p><p>Por favor, espera de 4 a 6 semanas para que el servicio AT&amp;T Direct Payment entre en vigor. Sigue pagando tu cuenta como siempre hasta que aparezca un mensaje en la factura telef&oacute;nica indicando que se debitar&aacute; tu cuenta bancaria. Su pago aparecer&aacute; en la pr&oacute;xima factura telef&oacute;nica mensual y en el estado de cuenta que reciba de tu instituci&oacute;n financiera. Si nota alguna discrepancia en tu factura, por favor comun&iacute;cate con la oficina de servicio en tu &aacute;rea igual que lo har&iacute;as si estuvieras enviando tu pago por correo. Si cambias de bancos o si cambias el tipo de cuenta o el n&uacute;mero de cuenta a debitar, puedes cambiar AT&amp;T Direct Payment s&oacute;lo con presentar una nueva solicitud en l&iacute;nea.</p><p>El servicio AT&amp;T Direct Payment<strong> </strong>es la manera pr&aacute;ctica, confiable y econ&oacute;mica de pagar tu factura telef&oacute;nica. No hay cargos por suscribirte o usar la opci&oacute;n del servicio AT&amp;T Direct Payment. &iexcl;Suscr&iacute;bete hoy! Entre m&aacute;s pronto lo hagsa, m&aacute;s pronto empezar&aacute;s a ahorrar tiempo y dinero.</p><p>El servicio AT&amp;T Direct Payment tambi&eacute;n funciona con AT&amp;T Account Manager y AT&amp;T eBill.</p><p>Suscr&iacute;bete al servicio AT&amp;T Direct Payment<strong> </strong><br />  Si te interesa AT&amp;T Direct Payment, <a href="http://localization.att.com/loc/controller?prod-snip=enrollauto" title="Suscr&iacute;bete en l&iacute;nea" target="_blank">suscr&iacute;bete en l&iacute;nea</a>.&nbsp;<br />  Tambi&eacute;n puedes suscribirte por medio de AT&amp;T Account Manager. <a href="https://www06.sbc.com/myaccount/Controller?pf=frameworkEntry&e=feAutoPayEnroll&ReturnUrl=http://www.att.com/localization%3Fprod_snip%3Denrollauto" title="Suscr&iacute;bete a AT&amp;T Account Manager" target="_blank">Suscr&iacute;bete a AT&amp;T Account Manager</a>.</p><p><strong>AT&amp;T EasyCharge</strong><br />  AT&amp;T EasyCharge te permite pagar autom&aacute;ticamente tu factura telef&oacute;nica haciendo que el pago total de tu factura se cargue a una tarjeta de cr&eacute;dito/d&eacute;bito.</p><ul>  <li>Ahorre tiempo al no tener que hacer cheques para pagar tus facturas.</li>  <li>Ahorre dinero en estampillas y sobres.</li></ul><p>Con el servicio AT&amp;T EasyCharge tu factura telef&oacute;nica se pagar&aacute; autom&aacute;ticamente en la fecha de vencimiento. Ya no tendr&aacute;s que preocuparte de enviar por correo sus pagos, o no poder pagar tus facturas cuando est&eacute;s de vacaciones o en un viaje de negocios. Suscribirte es muy f&aacute;cil. Simplemente selecciona el enlace suscr&iacute;bate en l&iacute;nea que se encuentra m&aacute;s abajo en esta p&aacute;gina y siga los pasos para enviar una solicitud.</p><p>Por favor, espere de 4 a 6 semanas para que el servicio AT&amp;T EasyCharge entre en vigor. Sigue pagando tu cuenta como siempre hasta que aparezca un mensaje en la factura telef&oacute;nica indicando que se cargar&aacute; a la tarjeta de cr&eacute;dito/d&eacute;bito. Tu pago aparecer&aacute; en la pr&oacute;xima factura telef&oacute;nica mensual y en el estado de cuenta que recibas de tu instituci&oacute;n financiera. Si notas alguna discrepancia en su factura, por favor comun&iacute;cate con la oficina de servicio en tu &aacute;rea igual que lo har&iacute;as si estuvieras enviando tu pago por correo. Si cambias el n&uacute;mero de cuenta de tu tarjeta de cr&eacute;dito/d&eacute;bito o recibes una nueva fecha de vencimiento, AT&amp;T EasyCharge puede cambiarte simplemente enviando en l&iacute;nea una nueva solicitud.</p><p>El servicio AT&amp;T EasyCharge es la manera pr&aacute;ctica, confiable y econ&oacute;mica de pagar tu factura telef&oacute;nica. No se cobra cuota alguna por suscribirte o usar el servicio AT&amp;T EasyCharge. &iexcl;Suscr&iacute;bete hoy! Entre m&aacute;s pronto lo haga, m&aacute;s pronto empezar&aacute; a ahorrar tiempo y dinero.<br />  El servicio AT&amp;T EasyCahrge tambi&eacute;n funciona con AT&amp;T Account Manager y AT&amp;T eBill.</p><p>Reg&iacute;strese para AT&amp;T EasyCharge<br />  Si te interesa AT&amp;T EasyCharge, <a href="https://www06.sbc.com/myaccount/Controller?pf=sotaEntry&e=st200&sessionID=x&toURL=https%3A%2F%2Febill04.sbc.com%2Fxbill%2Fautopay%2FuserLogin.perform%3FepayLoginCancel%3Dhttp%253A%252F%252Fwww.att.com%252Fgen%252Fgeneral%253Fpid%253D3820&cancelURL=http%3A%2F%2Fwww.att.com%2Fgen%2Fgeneral%3Fpid%3D3820&getCpni=N" title="Suscr&iacute;bete en l&iacute;nea" target="_blank">suscr&iacute;bete en l&iacute;nea.</a>&nbsp;<br />  Tambi&eacute;n puedes suscribirte por medio de AT&amp;T Account Manager. <a href="https://www06.sbc.com/myaccount/Controller?pf=frameworkEntry&e=feAutoPayEnroll&ReturnUrl=http://www.att.com/localization%3Fprod_snip%3Denrollauto" title="Suscr&iacute;bete a AT&amp;T Account Manager" target="_blank">Suscr&iacute;bete a AT&amp;T Account Manager</a>.</p></div><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div></div></div>');
				}
				
				
				
			 	if($('#billing-contact').is('.lightboxon')) { 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-functions"><h5>Centros de servicio al cliente biling&uuml;es</h5><p><strong>Arkansas, Kansas, Missouri, Texas, Oklahoma</strong><br />  1-800-632-2179</p><p><strong>Illinois, Indiana, Michigan, Ohio, Wisconsin</strong><br />  1-877-534-4263</p><p><strong>California y Nevada</strong><br />  1-800-550-8453</p><p><strong>Connecticut</strong><br />  1-800-526-6844</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div> </div></div>');	 
				}
				
				
				
			 	if($('#billing-mail').is('.lightboxon')) { 
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div> <div class="popup-box" id="popup-functions"><h5>Por Correo</h5><p><strong>Arkansas, Kansas, Missouri, Texas, Oklahoma</strong><br />  AT&amp;T Payment Center<br />  P. O. Box 930170<br />  Dallas, TX 75393-0170</p><p><strong>Illinois, Michigan, Ohio, Wisconsin</strong><br />  AT&amp;T<br />  P.O. Box 8100<br />  Aurora, IL 60507-8100</p><p><strong>Indiana</strong><br />  AT&amp;T Payment Center<br />  PO Box 660011<br />  Dallas, TX 75266-0011</p><p><strong>California y Nevada</strong><br />  AT&amp;T Payment Center<br />  Sacramento, CA 95887-0001</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div> </div></div>');	 
				}
				
				
			 	if($('#reward').is('.lightboxon')) { 
				 				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box medium"><h5>$100 AT&amp;T Reward Card</h5><p><strong>Tarjeta de recompensa de AT&amp;T por $100:</strong> disponible para clientes residenciales que cambian su servicio de Internet por cable a Internet de Alta Velocidad AT&amp;T U-verse y ordenan un plan de servicio de voz U-verse Voice. El cliente debe satisfacer todas las obligaciones pendientes con su proveedor de cable actual. S&oacute;lo un cambio de cable a Internet de alta velocidad AT&amp;T U-verse por cada cuenta de U-verse. Requiere canje del reembolso en l&iacute;nea. La oferta vence el 5 de noviembre de 2011. </p>        <p><strong>T&eacute;rminos del reembolso:</strong> La tarjeta se env&iacute;a despu&eacute;s de 4 a 6 semanas del procesamiento a los clientes que mantengan el/los servicio(s) que califique(n). La tarjeta Visa<sup>&reg;</sup> prepagada de reembolso de AT&amp;T no se puede canjear por efectivo ni se puede usar para retirar efectivo de cajeros autom&aacute;ticos, ni en las bombas de gasolina autom&aacute;ticas. No puede ser usada para pagar el servicio telef&oacute;nico provisto por AT&amp;T y/u otros servicios en algunos estados. La tarjeta vence a los 90 d&iacute;as a partir de la fecha de emisi&oacute;n.</p>        <p><strong>Para otros t&eacute;rminos y condiciones</strong>, ve el contrato del tarjetahabiente y al emisor de la tarjeta. Para obtener m&aacute;s detalles, visita rewardcenter.att.com/myrewardcard/agreement.pdf. U.S. Bank National Association es el emisor de las tarjetas prepagadas Visa, de acuerdo con la licencia de Visa U.S.A. Inc.</p>        <p><strong>Internet de Alta Velocidad de AT&amp;T:</strong> Para clientes residenciales &uacute;nicamente. Los precios, la programaci&oacute;n y las ofertas est&aacute;n sujetos a cambio sin previo aviso. La o las referencias a la velocidad representan las velocidades de carga y descarga m&aacute;ximas. Las velocidades pueden variar y no est&aacute;n garantizadas. Las velocidades reales dependen de muchos factores. Es posible que el servicio de Internet de alta velocidad de U-verse se vea afectado por el uso de otros servicios de U-verse. Existen restricciones crediticias y de otro tipo. Se requiere la compra de U-verse TV para poder ordenar Internet de Alta Velocidad de AT&amp;T U-verse. Se cobrar&aacute; una cuota de $3 al mes por el equipo de Internet de alta velocidad a los nuevos suscriptores de Internet.</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div></div></div>');	 								
				}	
				
				
				
			 	if($('#dtv-details').is('.lightboxon')) { 
				
				  $('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box long"><p><strong>&#42;OFERTA DE PROGRAMACI&#211;N Y CR&#201;DITO EN LA FACTURA&#58; SI AL FINAL DE LOS PER&#205;ODOS DE PROMOCI&#211;N&#44; EL CLIENTE NO SE PONE EN CONTACTO CON DIRECTV PARA CAMBIAR EL SERVICIO&#44; &#201;STE CONTINUAR&#193; PREST&#193;NDOSE AUTOM&#193;TICAMENTE SEG&#218;N LAS TARIFAS VIGENTES EN ESA FECHA&#44; INCLUSO LA CUOTA DE ALQUILER&#46;</strong> SHOWTIME gratis durante 3 meses&#44; un ahorro de &#36;38&#46;97&#46; HBO&#44; Starz&#44; SHOWTIME y Cinemax gratis durante 3 meses&#44; un ahorro de &#36;135&#46; EXISTE UN L&#205;MITE DE UNA OFERTA DE PROGRAMACI&#211;N POR CUENTA&#46; Nombres y precios de los paquetes en promoci&#243;n&#58; &#211;PTIMO M&#193;S por &#36;46&#46;99 al mes&#894; M&#193;S ULTRA por &#36;62&#46;99 al mes&#894; LO M&#193;XIMO por &#36;119&#46;99 al mes&#46; En algunos mercados se cobrar&#225; una cuota de &#36;3&#47;mes por el RSN &#40;Regional Sports Network&#41; con el paquete CHOICE O SUPERIOR Y mas ultra o superior&#46; <strong>Precios incluyen un cr&#233;dito instant&#225;neo en la factura de  por </strong> &#211;PTIMO M&#193;S o paquetes superiores y un descuento de &#36;5 d&#243;lares por <strong>el paquete M&#193;S ULTRA o superior&#46; Para ser elegible para recibir este descuento instant&#225;neo de &#36;5&#44; debe combinar su facturaci&#243;n de AT&#38;T con la de DIRECTV en su factura de AT&#38;T si tiene servicio local&#46;</strong> <strong>&#8224;OFERTA DE &#36;10 DE</strong> <strong>CR&#201;DITO&#58; Los clientes deben activar y mantener el paquete</strong> M&#193;S ULTRA o superior para recibir un descuento adicional de &#36;10 de cr&#233;dito en la factura por 12 meses&#46; <strong>OFERTA DE NFL SUNDAY TICKET&#58;</strong> el paquete incluye todos los partidos de la NFL &#40;basado en la direcci&#243;n del cliente&#41; transmitidos por FOX y CBS&#46; Las transmisiones locales est&#225;n sujetas a reglamentos de bloqueo&#46; Otras condiciones aplican&#46; El precio regular del 2012 NFL SUNDAY TICKET de la temporada regular es de &#36;199&#46;95&#46; El precio regular del 2012 NFL SUNDAY TICKET MAX de la temporada regular es de $299.95. Los clientes que activen el paquete LO MAXIMO autom&#225;ticamente recibir&#225;n el NFL SUNDAY Ticket de al temporada 2012 disponible sin costo adicional. La suscripcci&#243;n ser&#225; renovada cada a&#241;o a tarifas especiales de renovaci&#243;n a menos de que el cliente cancele el servicio antes del comienzo de la temporada. La suscripcci&#243;n no puede ser cancelada una vez que haya comenzado la temporada y el costo de suscipcci&#243;n no ser&#225; reembolsado. La cuentea debe estar al d&#237;a con DIRECTV, seg&#250;n lo determine DIRECTV a su entera discreci&#243;n, para ser elegible par otras ofertas.</p><p><strong>&#42;&#42;ACUERDO DE 24 MESES&#58; SI SE DA POR TERMINADO EL SERVICIO ANTES DE LA FECHA DE FINALIZACI&#211;N DEL CONTRATO&#44; SE COBRAR&#193; UN CARGO POR CANCELACI&#211;N DE &#36;20 POR CADA MES QUE FALTE PARA CUMPLIR EL PLAZO DEL CONTRATO&#46;</strong> Se requiere la suscripci&#243;n a cualquier paquete de programaci&#243;n b&#225;sico de DIRECTV por 24 meses consecutivos&#46; Se requiere el Advanced Receiver&#45;DVR fee &#40;&#36;8&#47;mes&#41; para el arrendamiento del DVR&#46; Se requiere el Advanced Receiver&#45;HD fee &#40;&#36;10&#47;mes&#41; para el arrendamiento del receptor HD&#46; Se requiere el Advanced Receiver fee &#40;&#36;20&#47;mes&#41; para el arrendamiento del HD DVR y el HD DVR TiVo de DIRECTV&#46; Se requiere una cuota de servicio TiVo &#40;&#36;5&#47;mes&#41; para el arrendamiento del HD DVR TiVo de DIRECTV&#46; Si tiene dos receptores o un receptor y una TV compatible&#44; se le cobrar&#225; una cuota adicional de &#36;6&#46; Se le cobrar&#225; una cuota adicional de &#36;6 por cada receptor adicional en su cuenta&#46; <strong>SI EL CLIENTE NO ACTIVA TODO EL EQUIPO DEL SISTEMA DIRECTV DE ACUERDO CON EL AP&#201;NDICE DEL ALQUILER DEL EQUIPO&#44; ES POSIBLE QUE SE COBRE UN CARGO DE &#36;150 POR CADA RECEPTOR QUE NO SE HAYA ACTIVADO&#46;&#46; TODO EL EQUIPO SE ALQUILA Y TIENE QUE DEVOLVERSE A DIRECTV AL CANCELAR EL SERVICIO O SE COBRAR&#193;N CARGOS POR EQUIPO NO DEVUELTO&#46; VISITAR directv&#46;com O LLAMAR AL 1&#45;800&#45;DIRECTV PARA OBTENER M&#193;S INFORMACI&#211;N&#46;</strong> El reembolso instant&#225;neo del equipo avanzado requiere la activaci&#243;n de un paquete OPTIMO M&#193;S o superior &#40;para un receptor DVR &#44; se requiere el paquete M&#193;S LATINO&#41;&#46; OFERTA MEJORA A UN GENIE HD DVR: incluye reembolsos instant&#225;neos en un Advanced Whole-Home DVR y hasta 3 Clientes DIRECTV al activar el paquete de entretenimiento o superior; OPTIMO MAS o superior; paquete Jadeworld; o cualquier servicio combinado internacional que califique, que incluye el paquete PREFERRED CHOICE.  <strong>INSTALACION&#58;</strong> S&#243;lo instalaci&#243;n profesional est&#225;ndar en hasta 4 habitaciones&#894; la instalaci&#243;n personalizada tiene un cargo adicional&#46;</p><p>DIRECTV ON DEMAND: el acceso a la programaci&#243;n disponible de DIRECTV On Demand est&#225; basado en el tipo de paquete que seleccione. El n&#250;mero de programas y pel&#237;culas puede variar. Se cobrar&#225;n tarifas adicionales por estrenos recientes. Alguna programaci&#243;n On Demand requiere un HD DVR (HR20 o superior) o DVR (R22 o superior), un kit de DIRECTV CINEMA, y servicio de Internet de banda ancha con velocidades de 750 kbps o superior y un router de red con una fuente y conexi&#243;n Ethernet. Visita directv.com/cinema para m&#225;s detalles.</p><p>Para tener acceso a la programaci&#243;n de DIRECTV en alta definici&#243;n se requiere equipo HD. El n&#250;mero de canales en alta definici&#243;n est&#225; basado en el tipo de paquete elegido. Elegibilidad para canales locales depende de la direcci&#243;n del servicio. No todas las cadenas de televisi&#243;n est&#225;n disponibles en todos los mercados. La programaci&#243;n, el precio as&#237; como los t&#233;rminos y condiciones est&#225;n sujetos a cambio en todo momento. Los precios son residenciales. No se incluyen los impuestos. La programaci&#243;n de DIRECTV est&#225; sujeta al contrato del cliente de DIRECTV. Se puede consultar una copia en directv.com/legal (en ingl&#233;s), que tambi&#233;n se env&#237;a a los clientes el primer mes. AT&T | DIRECTV es un servicio de marca compartida prestado por DIRECTV. AT&T act&#250;a como agente de ventas para DIRECTV, el cual es responsable de la prestaci&#243;n del servicio. En caso de consultas con respecto al servicio, los clientes pueden llamar a DIRECTV al 1-800-531-5000. NFL, el dise&#241;o del escudo de NFL, y el nombre y logotipo de NFL SUNDAY TICKET son marcas registradas de NFL y sus afiliados. Los nombres de los equipos de la NFL y los dise&#241;os de los uniformes de los equipos son marcas registradas de los equipos indicados. DIRECTV y el logotipo de Cyclone Design, M&#225;S LATINO, &#243;PTIMOS M&#225;S, M&#225;S ULTRA, y LO M&#225;XIMO son marcas registradas de DIRECTV, LLC. Cualquier otra marca es la propiedad de su respectivo due&#241;o.</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div></div></div>');	 								
				}	
				
			 	if($('#oferta-box').is('.lightboxon')) { 
				
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup" style="padding-bottom: 30px;"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box" style="height: 300px;"><h5 style="font-weight: bold;">Detalles de la oferta</h5><p style="color: #6ebb1f; font-size: 2em; line-height: 28px;">&iquest;Est&aacute;s listo para tener el mejor servicio de TV? Este es el momento de ordenar AT&amp;T U-verse TV.</p><p><strong> TV a $25 al mes por 6 meses</strong></p><p> La oferta termina el 31 de diciembre de 2011. Para clientes nuevos residenciales de U-verse que ordenan U-family TV en mercados selectos. Despu&eacute;s de 6 meses, aplica la tarifa est&aacute;ndar a menos que sea cancelado por el cliente. Aplican impuestos y otros cargos online. Cargo &uacute;nico de activaci&oacute;n de TV de $36. Incluye DVR listo para alta definici&oacute;n sin cargo extra.  Aplican restricciones geogr&aacute;ficas y de servicio a los servicios de AT&T U-verse. Para m&aacute;s detalles, llama al 1-877-ATT-2990 (1-877-288-2990).  </p><p><strong>Paquete Espa&ntilde;ol GRATIS por 6 meses</strong><br />La oferta termina el 5 de noviembre de 2011. Disponible para clientes nuevos residenciales de U-verse TV en &aacute;reas selectas que agregan Paquete Espa&ntilde;ol. Despu&eacute;s de 6 meses, aplican las tarifas est&aacute;ndar vigentes a menos que sea cancelado por el cliente. Los t&iacute;tulos y logotipos de Univision, TeleFutura y Galavision son las marcas de Univision Communications Inc. Los t&iacute;tulos y logotipos de Bandamax y De Pelicula son las marcas de Televisa, S.A. de C.V. Aplican restricciones geogr&aacute;ficas y de servicio a los servicios de AT&T U-verse. Para m&aacute;s detalles, llama al 1-877-ATT-2990 (1-877-288-2990).</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div></div></div>');	 								
				}	
				
			 	if($('#oferta-box-02').is('.lightboxon')) { 
				
				$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box" class="uverse-internet"><div id="lightbox-container-image" class="popup" style="padding-bottom: 30px;"><div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div><div id="popup-functions" class="popup-box" style="height: 240px;"><h5 style="font-weight: bold;">Detalles de la oferta</h5><p style="color: #6ebb1f; font-size: 2em; line-height: 28px;">&iquest;Est&aacute;s listo para tener el mejor servicio de TV? Este es el momento de ordenar AT&T U-verse TV.</strong></p><p><strong>TV a $25 al mes por 6 meses</strong><br /> La oferta termina el 31 de diciembre de 2011. Para clientes nuevos residenciales de U-verse que ordenan U-family TV en mercados selectos. Despu&eacute;s de 6 meses, aplica la tarifa est&aacute;ndar a menos que sea cancelado por el cliente. Aplican impuestos y otros cargos online. Cargo &uacute;nico de activaci&oacute;n de TV de $36. Incluye DVR listo para alta definici&oacute;n sin cargo extra. <strong>Aplican restricciones geogr&aacute;ficas y de servicio a los servicios de AT&T U-verse</strong>. Para m&aacute;s detalles, llama al 1-877-ATT-2990 (1-877-288-2990). </p><p><strong>Obt&eacute;n hasta 182 canales con HBO<sup>&reg;</sup> y Cinemax<sup>&reg;</sup>  GRATIS por 3 meses</strong><br />La oferta termina el 31 de diciembre de 2012. Despu&eacute;s de tres meses, aplica la tarifa est&aacute;ndar. HBO<sup>&reg;</sup>, Cinemax<sup>&reg;</sup> y los canales y marcas de servicio relacionados son propiedad de Home Box Office Inc.</p></div><div class="clear"></div> <div class="ss-close"><img alt="Cerrar" src="/mlcomm/_images/template/btn_ss_close.jpg" /></div><div class="printable"   onclick="window.print()"><img alt="Imprimir" src="/mlcomm/_images/template/btn_popup_print.jpg" /></div><div class="clear"></div></div></div>');	 								
				}	
				
				
// Get page sizes
var arrPageSizes = ___getPageSize();
// Style overlay and show it
$('#jquery-overlay').css({
	backgroundColor:	settings.overlayBgColor,
	opacity:settings.overlayOpacity,
	width:	arrPageSizes[0],
	height:	arrPageSizes[1]
}).fadeIn();
// Get page scroll
var arrPageScroll = ___getPageScroll();
// Calculate top and left offset for the jquery-lightbox div object and show it
$('#jquery-lightbox').css({
	top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
	left:	arrPageScroll[0]
}).show();
// Assigning click events in elements to close overlay
$('#jquery-lightbox #ssmenu a, .ss-close').click(function() {
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