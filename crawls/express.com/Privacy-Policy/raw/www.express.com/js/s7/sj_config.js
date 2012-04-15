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

function S7ConfigObject(inVersion,inViewerRoot,inRoot)
{
	this.isVersion		= inVersion || "2.8";
	this.isViewerRoot	= inViewerRoot || "/is-viewers";
	this.isRoot		= inRoot || "/is/image/";
}

var S7Config		= new S7ConfigObject();

var sjroot		= S7Config.isViewerRoot;
var sjimageServer	= S7Config.isRoot;


