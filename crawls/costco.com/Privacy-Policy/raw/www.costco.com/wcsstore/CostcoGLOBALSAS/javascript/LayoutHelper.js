//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
	jquery, get content from URL handler.  
	text/html result is populated in the resultDivId area of the page.
**/
function getContent(URLrequest,resultDivId) {
	$('#'+resultDivId).load(URLrequest);
}