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

function SjLayer(inParent, inElementId) {
	if (arguments[0] == 'empty') {
		return;
	}
	this.SjElement = SjElement;
	this.SjElement(inParent, inElementId);
	if (this._parent && this._parent._elementId){
		sjCreateDiv(this._parent._elementId , this._elementId);
	}else{
		sjCreateDiv(null , this._elementId);
	}
	this._content = sjGetElement(this._elementId);
};

SjLayer.prototype = new SjElement('empty');
