var omniVars = new Array("pageName","channel","prop1","prop2","prop3","prop4","prop5","prop6","prop7","prop8","prop9","prop10","prop11","prop12","prop13","prop14","prop15","prop16","prop17","prop18","prop19","prop20","prop23","prop24","prop25","prop26","prop27","prop28","prop29","prop30","products","events","eVar6","eVar19");
var s_code;
var editVars;
var locale;

function setLocale() {
	var loc;
	if (navigator.language!=null) {
		loc = navigator.language; // FF, Safari, Opera
	}
	if (navigator.userLanguage!=null) {
		loc = navigator.userLanguage; // for IE
	}	
	var split = loc.split("-");
	locale = split[0];
}

function trackIt(x,divisionID,editVars,tl,linkEl,useExists) 
{
	if(locale==null) {
		setLocale();
	}
	$.ajax({
			type: "GET",
			url: "/static/blank.html",
			async: true,
			data:{},
			success: function(data){
	    	  _trackIt(x,divisionID,editVars,tl,linkEl,useExists);
			},
			error:function(xhr, ajaxOptions, thrownError){
				 
			}
		});
	
}

function _trackIt(x,divisionID,editVars,tl,linkEl,useExists) {
	generageOmnitureObj();
	
 	if (!tl) { // this is not a click track, so completely clear tracking state
		clearS();
	}
	if (x) {	
		if(locale == null || locale.substring(0,2)=="en"){
			setVars(omniData[x]);
		}
		if(locale.substring(0,2)=="es"){
			setVars(omniData_es[x]);
		}
	}
	if (editVars!=null && !useExists) { // modifies default vars from x (omniData)
		setVars(editVars);
	}
	if (divisionID) {
		s.prop3 = divisionID;
		s.eVar6 = divisionID;
	}
	if(useExists)
	{
		if(locale == null || locale.substring(0,2)=="en"){
			setLinkVars(omniData[x], editVars);
		}
		if(locale.substring(0,2)=="es"){
			setLinkVars(omniData_es[x], editVars);
		}
	}
	
	if (!linkEl && linkEl != null) {
	    linkEl = this;
	}     
	if (!tl) {
	    s.products = cleanChars(s.products);
		s_code = s.t();
	} else { // this is legacy because we have trackLink to handle s.tl
		s.products = cleanChars(s.products);
		s_code = s.tl(linkEl,'o',null); // third parameter needs to be description of the link, setting to x[0][1] will just send the pageName breadcrumb 
	}
}


function trackLink(x,divisionID,editVars) { 
    clearS();     	
	linkDesc = x;   
	if(locale == null || locale.substring(0,2)=="en"){
		setLinkVars(omniData[x],editVars);
	}
	if(locale.substring(0,2)=="es"){
		setLinkVars(omniData_es[x],editVars);
	}
	s.products = cleanChars(s.products);
	s_code = s.tl(true,'o',x); // third parameter needs to be description of the link, setting to x[0][1] will just send the pageName breadcrumb 
}



function setVars(x) {
	for (i=0; i<x.length; i++) {
		if(x[i]){
			s[x[i][0]] = x[i][1];
		}
	}
}

function clearS() {	
	
	for (i=0; i<omniVars.length; i++) {
		s[omniVars[i]] = "";
	}
}

function setLinkVars(omniEntry, editVars) {

    var paramArr = new Array();
    var events;
    if(typeof(omniEntry) != 'undefined' && omniEntry != null) {
        $.each(omniEntry,function(i,n) {
        	 try{
             	if(n || n[0]){
             		paramArr.push(n[0]);  
             		s[n[0]]=n[1]; // set s
             		if (n[0]=='events') {
             			events=n[1]; 
             		} 
             	}
     			}catch(e){
     			    
     			}
        });
    }
    if(typeof(editVars) != 'undefined') {
        $.each(editVars,function(i,n) {
            if ($.inArray(n[0],paramArr)==-1) { // if it doesn't already exist 
                paramArr.push(n[0]); 
            }
            if (n[0]=='events') {
               events=events + ',' + n[1]; 
            }
            s[n[0]]=n[1]; // set s. will overwrite values from omniEntry                        
        });
    }  
    
    
    s.linkTrackVars=paramArr.join(",");
    s.linkTrackEvents = events;
    s.events = events;
    
    
}

function cleanChars(str) {
   return str; // add any necessary replace statements here
}