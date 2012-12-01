// Listing of shared scripts across the global pwc.com layer

// .pdf link auto tracking code:
// D.Montana 23-FEB-11: Commented out this auto tracking functionality so that the new WT JS code base tracking could be turned on.
//$(function(){
//	$("a[href$=.pdf]>img").parent().each(function(){
//		if(this.onclick && this.onclick !="")
//			{this.onclick="";}
//	}).click(function(){
//		var ti, x;
//		if (this.title && this.title != "")
//			{ti = this.title;} 
//		else{
//			x=$(this).children("img:first")[0];
//			if(x.alt && x.alt !="") {ti = x.alt;}
//			else {ti = document.title;}
//		}
//		x=this.pathname+"_img"; 
//		
//		wrs_trackclick('DCS.dcsuri=' + x, 'WT.ti='+ti);
//	});
//	
//	$("a[href$=.pdf]:not(:has(img))").each(function(){
//		if(this.onclick && this.onclick != "")
//			{this.onclick = "";}
//	}).click(function(){
//		var ti,uri;
//		if (this.title && this.title != "")
//			{ti = this.title;} 
//		else{
//			ti = $(this).text();}
//		uri = this.pathname;
//		wrs_trackclick('DCS.dcsuri=' + uri, 'WT.ti='+ti);
//	});
//});
//


if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());


function PDFGenStats(data){
	
	data = JSON.parse(data);
	var categories = data.categories,
	    cover = data.cover,
	    download = data.download,
	    subs = [], subcat = {}, subname="", catname="", fname="", article="";
	    
	for(var i = 0; i< categories.length; i++){  // loop through each category
		catname = categories[i].name;
		subs = categories[i].subcategories
		
		for(var j = 0; j<subs.length; j++){ // loop through the sub-categories
			subcat = subs[j];
			subname = subcat.name;
			fname = subcat.file.value;
			article = subcat.file.name;
			
			wrs_trackclick('DCS.dcsuri='+location.pathname+"_pdf_widget",
					'WT.ti='+article,
					'WT.z_pdf_category='+catname,
					'WT.z_pdf_sub='+subname,
					'WT.z_pdf_name='+fname);
		}
	}
}

// This function is for the view all / view less button on the global tax newsletter index pages. D.Montana 29-NOV-2012
$(function(){
	if( $("div.issue-by-month:gt(5)").hide().length) $("#showControl").show();
	$("#showControl a").click(function(){
		$("#showControl a, div.issue-by-month:gt(5) ").toggle();
		return false;
	});
});