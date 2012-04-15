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

//String key, Object value
function SjHashtable(){
    this.hashtable = new Array();
}                

SjHashtable.prototype.clear = function (){
    this.hashtable = new Array();
	for (var key in this.hashtable){
		this.remove(key);
	}
}

SjHashtable.prototype.containsKey = function(key){
    var exists = false;
    for (var i in this.hashtable) {
        if (i == key && this.hashtable[i] != null) {
            exists = true;
            break;
        }
    }
    return exists;
}

SjHashtable.prototype.indexOfKey = function(key){
	var result = -1;
    var exists = false;
    for (var i in this.hashtable) {
		result++;
		if (i == key){
			if( this.hashtable[i] != null) {
				exists = true;
				break;
			}
        }
    }
    return exists ? result:-1;
};

SjHashtable.prototype.containsValue = function(value){
    var contains = false;
    if (value != null) {
        for (var i in this.hashtable) {
            if (this.hashtable[i] == value) {
                contains = true;
                break;
            }
        }
    }
    return contains;
}

SjHashtable.prototype.indexOfValue = function(value){
	var result = -1;
	var contains = false;
    if (value != null) {
        for (var i in this.hashtable) {
			result++;
            if (this.hashtable[i] == value) {
                contains = true;
                break;
            }
        }
    }
    return contains ? result : -1;
};

SjHashtable.prototype.get = function(key){
    return this.hashtable[key];
}

SjHashtable.prototype.isEmpty = function(){
    return (this.size == 0) ? true : false;
}

SjHashtable.prototype.keys = function(){
    var keys = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null) 
            keys.push(i);
    }
    return keys;
}

SjHashtable.prototype.put = function(key, value){
    if (key == null || value == null) {
        throw "NullPointerException {" + key + "},{" + value + "}";
    }else{
        this.hashtable[key] = value;
    }
}

SjHashtable.prototype.remove = function(key){
    var rtn = this.hashtable[key];
    this.hashtable[key] = null;
    return rtn;
}

SjHashtable.prototype.size = function(){
    var size = 0;
    for (var i in this.hashtable){
        if (this.hashtable[i] != null) 
            size ++;
    }
    return size;
}

SjHashtable.prototype.toString = function(){
    var result = "";
    for (var i in this.hashtable){      
        if (this.hashtable[i] != null) 
            result += "{" + i + "},{" + this.hashtable[i] + "}\n";   
    }
    return result;
}

SjHashtable.prototype.values = function(){
    var values = new Array();
    for (var i in this.hashtable) {
        if (this.hashtable[i] != null) 
            values.push(this.hashtable[i]);
    }
    return values;
}

