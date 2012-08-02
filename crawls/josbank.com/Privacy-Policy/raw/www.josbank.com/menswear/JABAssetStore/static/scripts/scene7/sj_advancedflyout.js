/*
ADOBE CONFIDENTIAL
Copyright 2011 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/
if (typeof(s7js) == 'undefined') {
	s7js = new Object();
}
if (typeof(s7js.flyout) == 'undefined') {
	s7js.flyout = new Object();
}

s7js.includeScript = function(inScriptUrl) {
	var codeBase = (typeof(sj_codebase) != 'undefined' ? sj_codebase : '');
	document.write('<script type="text/javascript" src="' + codeBase + inScriptUrl + '"></script>');
}

s7js.includeScript('4.4/sj_textloader.js');
s7js.includeScript('4.4/sj_utils.js');
s7js.includeScript('4.4/flyout/AdvancedFlyout.js');
s7js.includeScript('4.4/flyout/Config.js');
s7js.includeScript('4.4/flyout/FlyoutFrame.js');
s7js.includeScript('4.4/flyout/Utils.js');
s7js.includeScript('4.4/flyout/FlyoutView.js');
s7js.includeScript('4.4/flyout/Pager.js');
s7js.includeScript('4.4/flyout/Scroller.js');
s7js.includeScript('4.4/flyout/StaticImage.js');
s7js.includeScript('4.4/flyout/Swatch.js');
s7js.includeScript('4.4/flyout/Swatches.js');
s7js.includeScript('4.4/flyout/Transition.js');
s7js.includeScript('4.4/flyout/InfoMessage.js');
