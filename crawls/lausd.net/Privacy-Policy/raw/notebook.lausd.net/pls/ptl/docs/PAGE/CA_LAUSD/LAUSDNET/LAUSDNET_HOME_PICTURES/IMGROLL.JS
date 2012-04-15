/****************************************************************************************
          Script to automate image rollovers and click effects, using just HTML
                  v1.1 written by Mark Wilton-Jones, 30-31/12/2003
                     updated 29/04/2004 for Konqeror XHTML fix
*****************************************************************************************

Please see http://www.howtocreate.co.uk/jslibs/ for details and a demo of this script
Please see http://www.howtocreate.co.uk/tutorials/jsexamples/testingRoll.html for examples
Please see http://www.howtocreate.co.uk/jslibs/termsOfUse.html for terms of use

To use this, insert the following HTML just before the </body> tag:

<script type="text/javascript" language="javascript1.2" src="PATH TO SCRIPT/imgRoll.js"></script>

To apply a hover or click effect to any image or image input, simply add the desired extra
attributes to the image or input definition. The attribute names must ALWAYS be written in
lower case:
	hoversrc="hover.gif"     produces a hover/rollover effect
	activesrc="hover.gif"    produces a click/active effect
The syntax of these attributes is identical to the src attribute.

	Regular image:
		<img src="root.gif" height="50" width="50" alt="" border="0">
	Hover:
		<img src="root.gif" hoversrc="hover.gif" height="50" width="50" alt="" border="0">
	Click:
		<img src="root.gif" activesrc="active.gif" height="50" width="50" alt="" border="0">
	Hover and click:
		<img src="root.gif" hoversrc="hover.gif" activesrc="active.gif" height="50" width="50" alt="" border="0">
	Hover and click on an image input:
		<input type="image" src="root.gif" hoversrc="hover.gif" activesrc="active.gif" height="50" width="50" alt="" border="0">

Warnings:

	This script attaches the following event handlers to the images; mouseover, mouseout, mousedown, mouseup
	These will override any that you specify
	They may also affect any mousedown and mouseup event detection on parent elements

	The HTML will not validadate as valid core HTML 4 (but adding custom attributes is a valid practice)
_______________________________________________________________________________________*/

var MWJ_img_cache = new Object();
for( var i = 0; i < 2; i++ ) {
	var ar = i ? ( document.getElementsByTagName ? document.getElementsByTagName('input') : ( document.all ? document.all.tags('INPUT') : [] ) ) : document.images;
	for( var x = 0; ar[x]; x++ ) {
		var im = ar[x];
		if( im.getAttribute ) { im.hoversrc = im.getAttribute('hoversrc'); im.activesrc = im.getAttribute('activesrc'); }
		if( im.hoversrc || im.activesrc ) {
			if( !MWJ_img_cache[im.src] ) { MWJ_img_cache[im.src] = new Image(); MWJ_img_cache[im.src].src = im.src; }
			im.rootsrc = im.src;
			im.onmouseout = function () { this.src = this.rootsrc; };
		}
		if( im.hoversrc ) {
			if( !MWJ_img_cache[im.hoversrc] ) { MWJ_img_cache[im.hoversrc] = new Image(); MWJ_img_cache[im.hoversrc].src = im.hoversrc; }
			im.onmouseover = function () { this.src = this.hoversrc; };
		}
		if( im.activesrc ) {
			if( !MWJ_img_cache[im.activesrc] ) { MWJ_img_cache[im.activesrc] = new Image(); MWJ_img_cache[im.activesrc].src = im.activesrc; }
			im.onmousedown = function (e) {
				e = e ? e : window.event;
				if( e.button > 1 || e.which > 1 ) { return; }
				this.src = this.activesrc;
			};
			im.onmouseup = function (e) {
				e = e ? e : window.event;
				if( e.button > 1 || e.which > 1 ) { return; }
				this.src = this.hoversrc ? this.hoversrc : this.rootsrc;
			};
		}
	}
}