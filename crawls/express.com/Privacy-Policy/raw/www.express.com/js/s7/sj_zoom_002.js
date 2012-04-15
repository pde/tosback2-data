/*
 ADOBE CONFIDENTIAL
 Copyright 2005 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or
 copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior
 written permission is obtained from Adobe Systems Incorporated.
 */

//////////////
// INCLUDE Function
sj = [];
//sj.path= S7ConfigClient.isDhtmlRoot;
sj.path = '/js/s7/';
if (typeof(sj_codebase) != "undefined") {
	if (sj_codebase.substring(sj_codebase.length - 1) != '/' && sj_codebase != '')
		sj_codebase += '/';
	sj.path = sj_codebase;
}
sj.setPath = function(path) {
	if (path.substring(path.length - 1) != '/' && path != '')
		path += '/';
	sj.path = path;
}
sj.include = function(js) {
	js = js.replace(/\:/g, '\/');
	document.write('<script language="javascript" type="text/javascript" src="' + sj.path + js + '.js"><\/script>');
}

sj.include('sj_resource')
sj.include('sj_config')
sj.include('sj_browser')
sj.include('sj_core')
sj.include('sj_textloader')
sj.include('sj_hashtable')
sj.include('sj_element')
sj.include('sj_layer')
sj.include('sj_picture')
sj.include('sj_zoom')
sj.include('sj_zoomviewer')
