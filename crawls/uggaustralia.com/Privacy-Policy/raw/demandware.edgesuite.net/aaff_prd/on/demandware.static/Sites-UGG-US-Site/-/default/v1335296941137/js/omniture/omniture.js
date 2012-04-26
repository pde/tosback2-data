//------------------------------------------
//------------- PRIVATE --------------------
//------------------------------------------
var _omnRequiredName = ["pageName", "events", "pageType"];
var _omnAvailableName = ["pageName", "campaign", "products", "events", "purchaseID", "state", "zip", "pageType"];
var _omnAvailableIndexedName = ["prop", "eVar"];

function _omnFindInArray(array, value){
	for(var i=0; i < array.length; i++) {
		if(array[i] == value){
			return true;
		}
	}
	
	return false;
}

function _omnPropertyValid (propName){
	if(_omnFindInArray(_omnAvailableName, propName)){
		return true;
	}
	
	for(var i=0; i < _omnAvailableIndexedName.length; i++) {
		var indexed = _omnAvailableIndexedName[i];
		
		var name = propName.substr(0, indexed.length);
		var propIndex = propName.substr(indexed.length);
		
		if(  name == indexed &&
				propIndex != "" && !isNaN(propIndex)){
			return true;
		}
	}
	
	return false;
}

function _omnError(e){
	app.error(e);
}

function _omnDataValid (data){
	
	for(prop in data){
		if(data[prop] == undefined){
			_omnError('Property: "' + prop + '" is undefined');
			return false;
		}
		
		if(!_omnPropertyValid(prop)){
			_omnError('Unknown property: "' + prop + '"');
			return false; 
		}
	}
	
	for(var i=0; i < _omnRequiredName.length; i++) {
		var required = _omnRequiredName[i];
		if(data[required] != undefined){
			return true;
		}
	}
	
	_omnError('Some value from: ' + _omnRequiredName.valueOf() +' is required.' );
	
	return false;
}

function _omnFormatObject(data){
	var result = '';
	for(prop in data){
		result += prop + ": '" + data[prop] + "'\n"
	}
	return result;
}

function _omnCopy(src, dst){
	for(prop in src){
		dst[prop] = src[prop];
	}
}

function _omnSend(data)
{
	if(!omnEnable){
		return true;
	}
	
	if(window.s != undefined){
		s_am = s;
	}
	
	try{
		
		_omnCopy(data, s_am);
		
		/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
		var s_code=s_am.t();if(s_code)document.write(s_code);
		/************* DO NOT ALTER ANYTHING BEFORE THIS LINE ! **************/
		
		//app.debug(_omnFormatObject(data));
		
	}finally{
		for(prop in data){
		if(prop !="pageName"){
			delete s_am[prop];
			}
		}
	}
}

function _omnAccumulate(src, dst){

	if(src.events != undefined && dst.events != undefined){
		src.events = dst.events + "," + src.events;
	}
	
	_omnCopy(src, dst);
}

function _omnCache(data){
	_omnAccumulate(data, window._omnitureCache);
}

//------------------------------------------
//---------- PUBLIC API --------------------
//------------------------------------------

function omnitureStartCache(){
	if(window._omnitureCache){
		app.error("omniture already switched in cache mode");
	}else{
		window._omnitureCache = {};
	}	
}

function omnitureFlush(){
	if(window._omnitureCache){
		var data = window._omnitureCache;
		window._omnitureCache = undefined;
		
		_omnSend(data);
	}
}

function omnitureTrack(data){
	
	if(!omnEnable){
		return true;
	}
		
	data.prop16 = app.date.omnitureTrackNowDate;
		
	if(omnnitureGlobal.zip != undefined){
		data.eVar44 = omnnitureGlobal.zip;
	}
	
	if(omnnitureGlobal.state != undefined){
		data.eVar43 = omnnitureGlobal.state;
	}
	
	if(omnnitureGlobal.country != undefined){
		data.prop12 = omnnitureGlobal.country;
		data.eVar28 = omnnitureGlobal.country;
	}
	
	if(_omnDataValid(data)){
		if(window._omnitureCache){
			_omnCache(data);
		}else{
			_omnSend(data);
		}
	}
	
	return true;
}

function omnitureTrackPage(data){
	
	if(data.shortSiteSection != undefined){
		data.siteSection = data.shortSiteSection;
	}
	
	if(data.shortCategory != undefined){
		data.category = data.siteSection + ":" + data.shortCategory;
	}
	
	if(data.shortSubCategory != undefined){
		data.subCategory = data.category + ":" + data.shortSubCategory;
	}
	
	if(data.category == undefined){
		data.category = data.siteSection;
		if(data.pageType == undefined){
			data.pageType = "site section";
		}
	}
	
	if(data.subCategory == undefined){
		data.subCategory = data.category;
		if(data.pageType == undefined){
			data.pageType = "category";
		}
	}else{
		if(data.pageType == undefined){
			data.pageType = "sub category";
		}
	}
	
	if(data.pageName == undefined){
		data.pageName = data.subCategory;
	}
	
	var trackData = {};
	if(data.custom != undefined){
		trackData = data.custom;
	}

	trackData.pageName = data.pageName;
	trackData.prop5    = data.siteSection;
	trackData.prop6    = data.category,
	trackData.prop7    = data.subCategory,
	trackData.prop8    = data.pageType
	
	omnitureTrack(trackData);
}