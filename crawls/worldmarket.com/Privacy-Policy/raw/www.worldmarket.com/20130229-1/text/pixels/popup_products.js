// Generating Popus when clicked

jQuery(function () {
	jQuery('.LightingProductAdvisement1').click(function(){
		jQuery('.pqveMainContent').append('<div id="LightingProductAdvisement1" style="display:none; line-height:1.6"><p><strong>Our mix &amp; match lamp bases work with BOTH uno and harp socket lamp shades (each base includes attachable wire harp). They work with ALL of our mix &amp; match lamp shades.</strong></p><table width="90%" style="text-align:center; margin:0 auto; color:#666;  font-size:11px;"><tr><td style="border-right:1px solid #dfdfdf; vertical-align:bottom; width:50%"><img src="/text/content-slot-html/articles/2013/wk1/lamp-popups/uno-socket-small.png" width="62" height="93" alt=""/></td><td style="vertical-align:bottom; width:50%"><img src="/text/content-slot-html/articles/2013/wk1/lamp-popups/harp-socket.png" width="89" height="171" alt=""/></td></tr><tr><td style="border-right:1px solid #dfdfdf; text-align:left; padding-top:5px; line-height:1.3; padding-right:20px; vertical-align:top"><strong>Uno Socket</strong><br>An uno socket lamp base supports a lamp shade\'s metal ring directly on the socket.</td><td style="text-align:left; padding-top:5px; padding-left:20px; line-height:1.3; vertical-align:top"><strong>Harp Socket</strong><br>A harp socket lamp base has a wire frame that supports the lamp shade above the light bulb, held in place by a screw-on finial.</td></tr></table></div>');
		openDialogInfo('LightingProductAdvisement1','');
		return false;
	});
	jQuery('.LightingProductAdvisement2').click(function(){
		jQuery('.pqveMainContent').append('<div id="LightingProductAdvisement2" style="display:none; line-height:1.6"><p><strong>Our mix &amp; match lamp shades work ONLY with uno socket lamp bases. They work with ALL of our mix &amp; match lamp bases.</strong></p><table width="90%" style="text-align:center; margin:0 auto; font-size:12px; font-weight:bold"><tr><td style="height:180px"><img src="/text/content-slot-html/articles/2013/wk1/lamp-popups/uno-socket.png" width="93" height="139" alt=""/></td><td><img src="/text/content-slot-html/articles/2013/wk1/lamp-popups/uno-socket-shape.png" width="200" height="160" alt=""/></td></tr><tr><td style="height:25px">Uno Socket</td><td>Uno Socket Lamp Shade</td></tr></table><p style="font-size:12px; margin-bottom:0; padding-bottom:0">An uno socket lamp base supports a lamp shade\'s metal ring directly on the socket.</p></div>');
		openDialogInfo('LightingProductAdvisement2','');
		return false;
	});
	jQuery('.RugsProductAdvisement1').click(function(){
		jQuery('.pqveMainContent').append('<div id="RugsProductAdvisement1" style="display:none; line-height:1.6"><h2 style="padding-bottom:20px;">RUG PRODUCT ADVISEMENTS</h2><p style="line-height:1.6"><strong>Indoor Rugs</strong><br>We do not recommend placing rugs directly on top of carpeting or flooring, as color may transfer. We recommend using a Word Market Rug Pad.</p><p style="line-height:1.6"><strong>Indoor-Outdoor Rugs</strong><br>We do not recommend placing rugs directly on top of carpeting or flooring, as color may transfer.  For indoor use, we recommend using a Word Market Rug Pad.</p></div>');
		openDialogInfo('RugsProductAdvisement1','');
		return false;
	});
	jQuery('.caprop65PopUp').click(function(){
		jQuery('.pqveMainContent').append('<div id="caprop65PopUp" style="display:none; line-height:1.6"><h2 style="padding-bottom:20px;">ATTENTION CALIFORNIA RESIDENTS</h2><p style="line-height:1.6">The product warnings below have been made available to our customers in accordance with California\'s Safe Drinking Water and Toxic Enforcement Act of 1986 (Prop 65).</p><p style="line-height:1.6">To learn more about California Proposition 65, <a href="http://oehha.ca.gov/prop65/p65faq.html?ab=prop65:oehha:faq" target="_blank">visit the OEHHA\'s FAQ page for Proposition 65.</a></p><p style="line-height:1.6; padding-top:20px"><strong>TDCPP Warning</strong><br>This product contains TDCPP (a flame retardant), a chemical known to the State of California to cause cancer.</p></div>');
		openDialogInfo('caprop65PopUp','');
		return false;
	});
	jQuery('.caprop65PopUpAcrylamide').click(function(){
		jQuery('.pqveMainContent').append('<div id="caprop65PopUpAcrylamide" style="display:none; line-height:1.6"><h2 style="padding-bottom:20px;">ATTENTION CALIFORNIA RESIDENTS</h2><p style="line-height:1.6">The product warnings below have been made available to our customers in accordance with California\'s Safe Drinking Water and Toxic Enforcement Act of 1986 (Prop 65).</p><p style="line-height:1.6">To learn more about California Proposition 65, <a href="http://oehha.ca.gov/prop65/p65faq.html?ab=prop65:oehha:faq" target="_blank">visit the OEHHA\'s FAQ page for Proposition 65.</a></p><p style="line-height:1.6; padding-top:20px"><strong>Acrylamide Warning</strong><br>This product contains acrylamide, a chemical known to the State of California to cause birth defects and other reproductive harm.</p></div>');
		openDialogInfo('caprop65PopUpAcrylamide','');
		return false;
	});

// Removing Popups from the page when close popup
	jQuery('.popClose img').click(function(){
		jQuery('#LightingProductAdvisement1, #LightingProductAdvisement2, #RugsProductAdvisement1, #caprop65PopUp, #caprop65PopUpAcrylamide').remove();
	});
});