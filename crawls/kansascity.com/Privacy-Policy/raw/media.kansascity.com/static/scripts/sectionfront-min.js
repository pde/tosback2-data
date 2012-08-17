var mi=(!mi)?{'media_domain':''}:mi;mi.SideScrollAd=function(container){this.container=$(container).length?$(container):'';this.trigger_percentage=70;this.show=false;if(this.container!=='')
{this.right=this.container.css('right');$(window).bind('scroll',{obj:this},function(event){var obj=event.data.obj;if(obj.getScrollPosition()>obj.trigger_percentage&&obj.show===false)
{obj.container.stop().animate({'right':'0px'},850);obj.visible('true');}
else if(obj.getScrollPosition()<obj.trigger_percentage)
{obj.container.stop().animate({'right':obj.right},850);obj.visible('false');}});$("#closeSlideout a").bind('click',{obj:this},function(event){var obj=event.data.obj;obj.container.stop().animate({'right':obj.right},850);});}
else
{console.warn("Slide ad cannot be instantiated. "+container+" does not exist.");}};mi.SideScrollAd.prototype.visible=function(value)
{if(value===undefined)
{return this.show;}
else
{switch(value)
{case'true':case 1:this.show=true;break;case'false':case 0:this.show=false;break;default:break;}}};mi.SideScrollAd.prototype.getScrollPosition=function()
{var bottom=$(window).height()+$(window).scrollTop();var height=$(document).height();return Math.round(100*bottom/height);};mi.floorAd=function(container,repeat){mi.App.apply(this,arguments);this.container=$(container).length?$(container):'';this.wrapper=$(container+' #floorboard-wrapper');this.mainImg=$(container+' img:eq(0)');this.mainWidth=this.mainImg.width();this.mainHeight=this.mainImg.height();this.leaveImg=$(container+' img:eq(1)');this.leaveHeight=this.leaveImg.height();this.closeLink=$(container+' map[name="floorclosemap"]  area');this.openLink=$(container+' map[name="flooropenmap"] area');this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.cookie=new mi.Cookie(document,this.cookieName);this.cookie.load();if(this.container!=='')
{this.container.css({'position':'fixed','text-align':'left','bottom':'0','right':'0','left':'0'});if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod'||navigator.platform=='Linux armv7l')
{this.container.css("position","static");}
this.wrapper.css({'width':this.mainWidth+'px','text-align':'left','margin':'0 auto'});if(this.mainImg!=='')
{this.flightID=this.mainImg[0].getAttribute('data-flightid');if(this.flightID==null){this.leaveImg[0].getAttribute('data-flightid');}
this.flightID=this.flightID!=null?this.flightID:'';var minutesAgo=this.lastShown();if(minutesAgo>=0&&minutesAgo<=this.repeat){this.expand=false;}
this.setCookie();this.mainImg.css({'position':'absolute','border':'0','bottom':(-1*this.mainHeight),'z-index':'2147483647'});if(this.leaveImg!==''&&this.closeLink!=='')
{this.leaveImg.css({'visibility':'hidden','border':'0','position':'absolute','bottom':(-1*this.leaveHeight),'z-index':'2147483647'});this.closeAd=function(){$(container+' img:eq(1)').css({'visibility':'visible','bottom':(-1*$(container+' img:eq(0)').height())});$(container+' img:eq(0)').animate({'bottom':(-1*$(container+' img:eq(0)').height())});$('body').animate({'margin-bottom':$(container+' img:eq(1)').height()});$(container+' img:eq(1)').animate({'bottom':'0'});};this.closeLink.click(this.closeAd);if(this.openLink!='')
{this.openLink.click(function(){$(container+' img:eq(1)').animate({'bottom':(-1*$(container+' img:eq(1)').height())});$(container+' img:eq(0)').animate({'bottom':'0'});$('body').animate({'margin-bottom':$(container+' img:eq(0)').height()});});}}
var passAd2ready=this;$(document).ready(function(){if(passAd2ready.expand){$(container+' img:eq(1)').css({'bottom':(-1*$(container+' img:eq(1)').height())});$(container+' img:eq(0)').animate({'bottom':'0'});$('body').css({'margin-bottom':$(container+' img:eq(0)').height()});}
else{passAd2ready.closeAd();}});}
else
{console.warn("No floor ad images to display");}}
else
{console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");}};mi.floorAd.prototype.setCookie=function()
{var cookieData=new Array();var flightKey='fbid'+this.flightID;if(this.cookie){for(var prop in this.cookie){if(prop.indexOf('fbid')!=-1){var id_time=parseInt(this.cookie[prop]);if((this.timeStamp-id_time)<=this.repeat){cookieData[prop]=this.cookie[prop];}}}}
this.cookie.remove();this.cookie=new mi.Cookie(document,this.cookieName,this.getConf('repeat'),'/');this.cookie[flightKey]=this.timeStamp;for(var prop in cookieData){this.cookie[prop]=cookieData[prop];}
this.cookie.store();};mi.floorAd.prototype.lastShown=function(flightID)
{flightKey='fbid'+this.flightID;if(this.cookie){if(this.cookie[flightKey]){var id_time=parseInt(this.cookie[flightKey]);return(this.timeStamp-id_time);}
else{return-1;}}
return-1;}
$(window).load(function(){$('div[name=adx_al]').bind('click',function(){var $curMarg=$('body').css('margin-bottom').replace("px","");$curMarg=($curMarg==30)?110:30;$('body').css('margin-bottom',$curMarg+'px');});$('.advertisement img').each(function(index){if(this.height==1&&this.width==1){$(this).css("display","none");}});});var mi=(typeof mi=='undefined')?{'media_domain':''}:mi;if(window.miAppControler){mi.control=new miAppControler();}
mi.getArgs=function(){if(typeof mi.args=='undefined'){mi.args={};var query=location.search.substring(1);var pairs=query.split('&');for(var i=pairs.length-1;i>=0;i--){var pos=pairs[i].indexOf('=');if(pos==-1){continue;}
mi.args[pairs[i].substring(0,pos)]=unescape(pairs[i].substring(pos+1));}}
return mi.args;};mi._console=function(s){mi._console.log=(mi._console.log&&mi._console.log.length>0)?mi._console.log+'\n---------------------------------------------------\n'+s:s;};mi.fixConsole=function(){if(typeof window.console!="object"){window.console={};}
if(window.console.is_fixed){}
else{var firebugMethods=["log","debug","info","warn","error","assert","dir","dirxml","trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];var methodCount=firebugMethods.length;var args=mi.getArgs();var view=(args.viewlog&&args.viewlog=='1');for(var i=0;i<methodCount;i++){var methodName=firebugMethods[i];if(typeof window.console[methodName]!="function"){switch(methodName){case'log':if(view){window.console.log=mi._console;if(window.addEventListener){window.addEventListener("load",function(){alert(mi._console.log);},false);}else if(window.attachEvent){window.attachEvent("onload",function(){alert(mi._console.log);});}}else{window.console.log=function(){};}
break;default:eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase()+": '+ s)};");}}}}
window.console.is_fixed=true;};mi.fixConsole();mi.cloneObject=function(sourceObj){if(sourceObj==null||typeof sourceObj!='object'){return sourceObj;}
var temp=new sourceObj.constructor();for(var key in sourceObj){temp[key]=mi.cloneObject(sourceObj[key]);}
return temp;};mi.App=function(){var _configs={};this._manageConf=function(prop,val){return val;};this.setConf=function(){switch(arguments.length){case 1:for(var prop in arguments[0]){_configs[prop]=this._manageConf(prop,arguments[0][prop]);}
break;case 2:_configs[arguments[0]]=this._manageConf(arguments[0],arguments[1]);break;default:console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');}};this.getConf=function(prop){return _configs[prop];};this.viewConfs=function(){console.dir(_configs);};this.cache={};switch(arguments.length){case 1:this.setConf(arguments[0]);break;case 2:this.setConf(arguments[0],arguments[1]);break;}};mi.getEventSrc=function(e){if(!e){e=window.event;}
if(e.target){return e.target;}else if(e.srcElement){return e.srcElement;}};mi.templateVarPattern=/\@([^\@]+)\@/g;mi.templateParser=function(data,template){return template.replace(mi.templateVarPattern,function(){return data[arguments[1]];})};mi.makeHash=function(sourceData,firstDelimiter,secondDelimiter){if(sourceData&&firstDelimiter&&secondDelimiter){var hash={};var pairs=sourceData.split(firstDelimiter);var pos;for(var i=pairs.length-1;i>=0;i--){if(typeof(pairs[i+1])!='undefined'){pos=pairs[i].indexOf(secondDelimiter);if(pos==-1){continue;}
hash[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);}}
return hash;}
else{console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');}};mi.loadPageInfo=function(){if(window.pageInfo){var pi=window.pageInfo;if(this.pageInfo==undefined){this.pageInfo=this.cloneObject(pi);}else{for(var key in pi){if(key==='version'&&(parseFloat(pi[key])>parseFloat(this.pageInfo.version))){this.pageInfo.version=pi[key];}else if(this.pageInfo[key]==undefined){this.pageInfo[key]=this.cloneObject(pi[key]);}else if(typeof this.pageInfo[key]=='object'){for(var key2 in pi[key]){this.pageInfo[key][key2]=(this.pageInfo[key][key2])?this.pageInfo[key][key2]:this.cloneObject(pi[key][key2]);}}}}}
window.pageInfo=null;}
mi.wait_for_ready=function(time,target,callback){var checker,time_spent=0,interval=3000;_check_document=function(){if(null!==$(target)){clearInterval(checker);callback();}else{time_spent+=interval/1000;if(time_spent>=time){clearInterval(checker);}}};$(document).ready(function(){checker=setInterval(_check_document,interval);});};mi.Search=function(){mi.App.apply(this,arguments);mi.getArgs();this.kill;};mi.Search.prototype.submitForm=function(searchType){this.kill="false";switch(this.getConf("searchSelectorType")){case"option":searchType=document.miSearchForm.aff.value;break;case"radio":searchType=$('input:radio[name=aff]:checked').val();break;}
var queryInputField;if(document.miSearchForm.keywords){queryInputField=document.miSearchForm.keywords;}
else{queryInputField=document.miSearchForm.q;}
var searchText="";if($(queryInputField).attr("placeholder")){if(!(queryInputField.value==$(queryInputField).attr("placeholder"))){searchText=queryInputField.value;}}
else{searchText=queryInputField.value;}
if(searchType==parseInt(searchType)){return;}
else{this.searchParamConfig(searchType,searchText);this.buildForm(searchType);}
if(this.kill=="false"){document.miSearchForm.submit();}
else{return false;}};mi.Search.prototype.buildForm=function(search_type){var self=this;var searchInputContainer_div=document.getElementById("searchInputContainer").innerHTML;if(searchInputContainer_div){$("#searchInputContainer > input[type='hidden']").each(function(){$(this).remove();});}
$("#search_widget_form").attr('method',self.getConf("form_method"));try{jQuery.each(self.getConf("query_fields"),function(paramName,paramValue){paramName=paramName.replace(/(.*)_mihyphen_(.*)/,"$1-$2");$("<input type='hidden' name='"+paramName+"' value='"+paramValue+"' />").appendTo("#searchInputContainer");});}
catch(e){console.error("Script Caught Error - "+e);}
document.miSearchForm.action=self.getConf("form_action");};mi.Search.prototype.checkOption=function(){var self=this;if(typeof mi.args.collection!="undefined"){switch(self.getConf("searchSelectorType")){case"option":if(mi.args.collection=="WEB"){$("select#search_select option[value='web_search']").attr("selected",1);}else if(mi.args.collection=="ARCHIVES"){$("select#search_select option[value='archives']").attr("selected",1);}else{$("select#search_select option[value='h_archives']").attr("selected",1);}
break;case"radio":if(mi.args.collection=="WEB"){$("#search_web").attr("checked",1);}else if(mi.args.collection=="ARCHIVES"){$("#search_archives").attr("checked",1);}else{$("#search_history").attr("checked",1);}
break;}}};mi.Search.prototype.dropDownSelection=function(target){mi.search.cache.mi_search_type=target.children('a').attr("id");if(target.children('a').is('#site_search')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
else if(target.children('a').is('#web_search')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
else if(target.children('a').is('#archives')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
$("#search_keywords").focus();return false;}
mi.Search.prototype.configErrorReporter=function(){this.kill="true";alert("Option doesn't exist in your configuration. Please review your browsers error console.");console.error("Option doesn't exist in your configuration. Please submit a ticket to MI Support for assistance.");return false;}
mi.Search.prototype.setUp=function(){mi.search.searchParamConfig();mi.search.getConf("mi_search_dropdown_keys").hover(function(){mi.search.getConf("mi_search_drop_down").show();},function(){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_drop_down_link").bind("click",function(e){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_dropdown_input").focus(function(){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_selected").click(function(){mi.search.dropDownSelection($(this));return false;});mi.search.checkOption();mi.search.cache.mi_search_type=mi.search.getConf("defaultSearchType");var mi_search_form=document.miSearchForm;mi_search_form.onsubmit=function(){return mi.search.submitForm(mi.search.cache.mi_search_type);}}

// *****************************************************************************
// Function:	fetchKeywordUrlMap( 'myTargetSelector' )
// Arguments:	myKeywordUrlMap:  A string of URL to keyword mappings
//		myTargetSelector: JQuery style selector to inject keyword
//		mapping into.
// Purpose:	Based on keywords extrapolated from the current URL will compare
//		these keywords to a user generated mapping of URLs to Keywords
//		and if matched will output the URL link passed.
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchKeywordUrlMap = function( myKeywordUrlMap, myTargetSelector ){

    // If 'myKeywordUrlMap' has a trailing '++' then we need to strip this, the
    //   '++' is replaced by Template Toolkit for every line break, and having
    //   a trailing '++' means the page element had a trailing line break with
    //   no data after it
    if( myKeywordUrlMap.match( /\++$/ ) )
	myKeywordUrlMap = myKeywordUrlMap.replace( /\+*$/, '' );
	
    // This will contain all the HTML to be injected into the selector passed
    //   above after processing.
    var formattedOutput		= '';
    // All the keywords extrapolated from the current URL, urlKeyword == Array
    var urlKeywords		= this.fetch404Keywords( );
    
    // This array will house all objects of class type keywordUrlMapClass
    var keywordUrlMapObjects	= [];
    
    // Now we have to parse the Keyword -> URL mappings so we can match on the
    //   404 keywords found.
    myKeywordUrlMap 	= myKeywordUrlMap.split( '++' );
    for( var i in myKeywordUrlMap ){
	// Example Map: Link Name 1||http://www.link1.com||link1, test1, keyword
	
	// Split the current keyword / url map by '||' and create new object
	var currentKeywordUrlMap	= myKeywordUrlMap[i].split( '||' );
	// Create the object and set the name and URL
	keywordUrlMapObjects[i]	= new this.keywordUrlMapClass( currentKeywordUrlMap[0], currentKeywordUrlMap[1] );
	
	// Now split the 3rd( [2] ) part of data by ',' and add to list of
	//   keywords for this object
	var currentKeywords		= currentKeywordUrlMap[2].split( ',' );
	for( var x in currentKeywords ){
	    keywordUrlMapObjects[i].addKeyword( currentKeywords[x] );
	}
    }
    
    
    // Finally loop through all the 404 keywords extrapolated, and call the
    //   keywordUrlMapClass objects 'matchKeyword' method to see if any of the
    //   objects keywords match the 404 keyword
    for( var i in urlKeywords ){	
	for( var x in keywordUrlMapObjects ){
	    if( keywordUrlMapObjects[x].matchKeyword( urlKeywords[i] ) ){
		// Then add the output code
		formattedOutput += "\
		    <li><a href='" + keywordUrlMapObjects[x].url + "'>" +
			    keywordUrlMapObjects[x].name + "</a>\
		    </li>";
	    }
	}
    }
    
    // Output the final HTML to the page
    $( myTargetSelector ).append( formattedOutput );
    
    
}

/**
 * Construct a keywordUrlMapClass
 * @class Basic class to house keyword to url mappings, and any helper methods
 * needed.
 * @constructor
 * @param {String} myName The human readable link name, used for innerHTML of
 * the anchor when outputting to the user.
 * @param {String} myUrl The actual href URL for the anchor
 * @return A new keywordUrlMapClass
 */
mi.Search.prototype.keywordUrlMapClass = function( myName, myUrl){
    this.name		= myName;		// Name of link to display
    this.url		= myUrl;		// Actual URL
    this.keywords	= [];			// An array of keywords match
    this.matchedKeyword = false;		// This is set to true when we
						// match a keyword to prevent dups
        
    
     /**
    * Adds a new keyword to the Array 'keywords' for the current instance of
    * this object, also lowercases the keyword
    * @type String
    */
    this.addKeyword 	= function( myKeyword ){
	this.keywords.push( myKeyword.toLowerCase() );
    }
    
    /**
     * Given a passed keyword, see if it matches any keywords in this object,
     * if so then return true, and set that object as matchedKeyword == true
     * to prevent duplicate outputs
     * @type String
     * @return 'true' if match found, 'false' otherwise
    */
    this.matchKeyword 	= function( myKeyword ){
	
	if( ( !this.matchedKeyword ) && ( this.getKeywords().match( myKeyword ) ) ){
		this.matchedKeyword 	= true;
		return( true );
	}
	return( false );
    }
    
    /**
     * Will return a list of this objects instance keywords, in comma delimited
     * format.
     * @return String of comma delimited keywords
     */
    this.getKeywords 	= function( ){
	
	return( this.keywords.join( ', ' ) );
    }
    
}
// *****************************************************************************


// *****************************************************************************
// Function:	fetchSearchResults( 'myTargetSelector' )
// Arguments:	myTargetSelector: JQuery style selector to inject SOLR results in
// Purpose:	Based on keywords extrapolated from the current URL, will inject
// 		SOLR search results into the passed JQuery selector
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchSearchResults = function( myTargetSelector ){
    
    // 'keywordList' is a space separated list of keywords found in the URL
    var keywordList 	= '';
    
    // Get the URL and send to function to get keywords, will return an array
    //   of keywords.
    var keywords 		= this.fetch404Keywords( );
    
    // Here we loop through the keywords, and assemble into a space separated
    //   string that SOLR can parse
    for( var i in keywords ){
	keywordList += ' ' + keywords[i];
    }
    
    // Now inject the search results into the passed selector
    $( myTargetSelector ).load( '/search/ #search', { q: keywordList } );

}
// *****************************************************************************


// *****************************************************************************
// Function:	fetch404Keywords( )
// Purpose:	Will parse for all words between forward slashes after the
// 		domain name and return this list of words as an array
// Return:	An array of keywords found in the url after the domain name
// *****************************************************************************
mi.Search.prototype.fetch404Keywords = function( ){
    
    // This will be the array that holds the unedited version of all 404 keywords
    var keywordsArray 		= [];
    // This will be the array returned by this function containing all keywords
    //   after filtering out the 'bad' keywords as defined by the regex below
    var returnKeywordsList 	= [];
    
    // Get the list of 404 keywords from the current URL
    keywordsArray = window.location.pathname.toLowerCase().slice(1).split('/');
    
    // Go through all the keywords and filter out for 'invalid' keywords
    //   based on the regex in the loop.
    for( var x in keywordsArray ){	

	// If the current keyword doesn't match the regex then assign on the
	//   returned keyword array
	if(  ( keywordsArray[x].match( /story/ ) ) || ( keywordsArray[x].match( /[0-9]+/ ) ) ){
	    //console.log( 'INVALID KEYWORD FOUND: ' + keywordsArray[x] );
	} else {
	    //console.log( 'VALID KEYWORD FOUND: ' + keywordsArray[x] ); 
	    returnKeywordsList.push( keywordsArray[x] );
	}
    }
	
    return( returnKeywordsList );

}

mi.Search.prototype.searchParamConfig=function(search_type,search_text){this.setConf("searchSelectorType","option");if(search_type){switch(search_type){case"web_search":this.setConf("form_action","http://search.kansascity.com/search-bin/search.pl.cgi");this.setConf("query_fields",{sf_Keywords:search_text,product:"Yahoo,Overture",collection:"WEB",live_template:"http://www.kansascity.com/searchresults/v-ysr/index.html",error_template:"http://www.kansascity.com/searchresults/v-yerr/index.html",preview_template:"http://preview.kansascity.com/searchresults/v-ysr/index.html",results_per_page:"10",preview:"0",prop_related:"1",prop_dym:"1"});break;case"archives":this.setConf("form_action","http://www.newslibrary.com/nlsearch.asp?");this.setConf("query_fields",{search_mode:"all",date_mode:"year",year:"last+180+days",sort:"d%3Ah",nitems:"10",region:"kc",dbquery:search_text,collection:"ARCHIVES"});break;case"h_archives":this.setConf("form_action","http://nl.newsbank.com/nl-search/we/Archives?");this.setConf("query_fields",{p_product:"KRHA-KC",p_theme:"histpaper",p_action:"search",p_queryname:"1",p_perpage:"10",p_sort:"_rank_%3AD",p_bool_base_mihyphen_1:"and",p_field_base_mihyphen_1:"ProductID",p_text_base_mihyphen_1:"1126152C152E4978",p_text_base_mihyphen_0:search_text,collection:"HISTORIC_ARCHIVES"});break;default:this.configErrorReporter();}}};var mi=(typeof mi=='undefined')?{'media_domain':''}:mi;if(window.miAppControler){mi.control=new miAppControler();}
mi.getArgs=function(){if(typeof mi.args=='undefined'){mi.args={};var query=location.search.substring(1);var pairs=query.split('&');for(var i=pairs.length-1;i>=0;i--){var pos=pairs[i].indexOf('=');if(pos==-1){continue;}
mi.args[pairs[i].substring(0,pos)]=unescape(pairs[i].substring(pos+1));}}
return mi.args;};mi._console=function(s){mi._console.log=(mi._console.log&&mi._console.log.length>0)?mi._console.log+'\n---------------------------------------------------\n'+s:s;};mi.fixConsole=function(){if(typeof window.console!="object"){window.console={};}
if(window.console.is_fixed){}
else{var firebugMethods=["log","debug","info","warn","error","assert","dir","dirxml","trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];var methodCount=firebugMethods.length;var args=mi.getArgs();var view=(args.viewlog&&args.viewlog=='1');for(var i=0;i<methodCount;i++){var methodName=firebugMethods[i];if(typeof window.console[methodName]!="function"){switch(methodName){case'log':if(view){window.console.log=mi._console;if(window.addEventListener){window.addEventListener("load",function(){alert(mi._console.log);},false);}else if(window.attachEvent){window.attachEvent("onload",function(){alert(mi._console.log);});}}else{window.console.log=function(){};}
break;default:eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase()+": '+ s)};");}}}}
window.console.is_fixed=true;};mi.fixConsole();mi.cloneObject=function(sourceObj){if(sourceObj==null||typeof sourceObj!='object'){return sourceObj;}
var temp=new sourceObj.constructor();for(var key in sourceObj){temp[key]=mi.cloneObject(sourceObj[key]);}
return temp;};mi.App=function(){var _configs={};this._manageConf=function(prop,val){return val;};this.setConf=function(){switch(arguments.length){case 1:for(var prop in arguments[0]){_configs[prop]=this._manageConf(prop,arguments[0][prop]);}
break;case 2:_configs[arguments[0]]=this._manageConf(arguments[0],arguments[1]);break;default:console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');}};this.getConf=function(prop){return _configs[prop];};this.viewConfs=function(){console.dir(_configs);};this.cache={};switch(arguments.length){case 1:this.setConf(arguments[0]);break;case 2:this.setConf(arguments[0],arguments[1]);break;}};mi.getEventSrc=function(e){if(!e){e=window.event;}
if(e.target){return e.target;}else if(e.srcElement){return e.srcElement;}};mi.templateVarPattern=/\@([^\@]+)\@/g;mi.templateParser=function(data,template){return template.replace(mi.templateVarPattern,function(){return data[arguments[1]];})};mi.makeHash=function(sourceData,firstDelimiter,secondDelimiter){if(sourceData&&firstDelimiter&&secondDelimiter){var hash={};var pairs=sourceData.split(firstDelimiter);var pos;for(var i=pairs.length-1;i>=0;i--){if(typeof(pairs[i+1])!='undefined'){pos=pairs[i].indexOf(secondDelimiter);if(pos==-1){continue;}
hash[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);}}
return hash;}
else{console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');}};mi.loadPageInfo=function(){if(window.pageInfo){var pi=window.pageInfo;if(this.pageInfo==undefined){this.pageInfo=this.cloneObject(pi);}else{for(var key in pi){if(key==='version'&&(parseFloat(pi[key])>parseFloat(this.pageInfo.version))){this.pageInfo.version=pi[key];}else if(this.pageInfo[key]==undefined){this.pageInfo[key]=this.cloneObject(pi[key]);}else if(typeof this.pageInfo[key]=='object'){for(var key2 in pi[key]){this.pageInfo[key][key2]=(this.pageInfo[key][key2])?this.pageInfo[key][key2]:this.cloneObject(pi[key][key2]);}}}}}
window.pageInfo=null;}
mi.wait_for_ready=function(time,target,callback){var checker,time_spent=0,interval=3000;_check_document=function(){if(null!==$(target)){clearInterval(checker);callback();}else{time_spent+=interval/1000;if(time_spent>=time){clearInterval(checker);}}};$(document).ready(function(){checker=setInterval(_check_document,interval);});};Date.prototype.getDayString=function(){switch(this.getDay()){case 0:return'Sunday';case 1:return'Monday';case 2:return'Tuesday';case 3:return'Wednesday';case 4:return'Thursday';case 5:return'Friday';case 6:return'Saturday';}};Date.prototype.getMonthString=function(full){switch(this.getMonth()){case 0:return(full)?'January':'Jan';case 1:return(full)?'February':'Feb';case 2:return(full)?'March':'Mar';case 3:return(full)?'April':'Apr';case 4:return'May';case 5:return(full)?'June':'Jun';case 6:return(full)?'July':'Jul';case 7:return(full)?'August':'Aug';case 8:return(full)?'September':'Sep';case 9:return(full)?'October':'Oct';case 10:return(full)?'November':'Nov';case 11:return(full)?'December':'Dec';}};Date.prototype.spanishDay=function(){switch(this.getDay()){case 0:return'domingo';case 1:return'lunes';case 2:return'martes';case 3:return'mi&eacute;rcoles';case 4:return'jueves';case 5:return'viernes';case 6:return's&aacute;bado';}};Date.prototype.obtenerDia=Date.prototype.spanishDay;Date.prototype.spanishMonth=function(full){switch(this.getMonth()){case 0:return(full)?'enero':'ene';case 1:return(full)?'febrero':'feb';case 2:return(full)?'marzo':'mar';case 3:return(full)?'abril':'abr';case 4:return(full)?'mayo':'may';case 5:return(full)?'junio':'jun';case 6:return(full)?'julio':'jul';case 7:return(full)?'augusto':'aug';case 8:return(full)?'septiembre':'sep';case 9:return(full)?'octubre':'oct';case 10:return(full)?'noviembre':'nov';case 11:return(full)?'deciembre':'dec';}};Date.prototype.obtenerMes=Date.prototype.spanishMonth;Date.prototype.toFormattedString=function(f){var a,b;var d0=(this.getDate()<10)?'0'+this.getDate():this.getDate();var h0=(this.getHours()<10)?'0'+this.getHours():this.getHours();var m0=(this.getMinutes()<10)?'0'+this.getMinutes():this.getMinutes();var s0=(this.getSeconds()<10)?'0'+this.getSeconds():this.getSeconds();var mo0=this.getMonth()+1;mo0=(mo0<10)?'0'+mo0:mo0;f=f.replace(/%%/g,'%');f=f.replace(/%A/g,this.getDayString());f=f.replace(/%a/g,this.getDayString().substring(0,3));f=f.replace(/%B/g,this.getMonthString(true));f=f.replace(/%b/g,this.getMonthString());f=f.replace(/%c/g,this.getDayString().substring(0,3)+' '+
this.getMonthString()+' '+
d0+' '+h0+':'+m0+':'+s0+' '+
this.getFullYear());a=this.getFullYear()+'';a=a.substring(2);f=f.replace(/%D/g,mo0+'/'+d0+'/'+a);f=f.replace(/%d/g,d0);a=this.getDate();switch(a){case 1:case 21:case 31:a=a+'st';break;case 3:case 23:a=a+'rd';break;default:a=a+'th';}
f=f.replace(/%E/g,a);f=f.replace(/%e/g,this.getDate());f=f.replace(/%F/g,this.getFullYear()+'-'+mo0+'-'+d0);f=f.replace(/%H/g,h0);a=(this.getHours()>12)?this.getHours()-12:this.getHours();f=f.replace(/%I/g,(a<10)?'0'+a:a);f=f.replace(/%k/g,this.getHours());f=f.replace(/%l/g,(this.getHours()>12)?this.getHours()-12:this.getHours());f=f.replace(/%M/g,m0);f=f.replace(/%m/g,mo0);f=f.replace(/%O/g,this.spanishDay());f=f.replace(/%o/g,this.spanishDay().substring(0,3));f=f.replace(/%p/g,(this.getHours()>11)?'PM':'AM');f=f.replace(/%Q/g,this.spanishMonth(true));f=f.replace(/%q/g,this.spanishMonth().substring(0,3));f=f.replace(/%R/g,h0+':'+m0);a=(this.getHours()>12)?this.getHours()-12:this.getHours();a=(a<10)?'0'+a:a;b=(this.getHours()>11)?'PM':'AM';f=f.replace(/%r/g,a+':'+m0+':'+s0+' '+b);f=f.replace(/%S/g,s0);f=f.replace(/%s/g,Date.parse(this)/1000);f=f.replace(/%T/g,h0+':'+m0+':'+s0);f=f.replace(/%u/g,(this.getDay()===0)?7:this.getDay());f=f.replace(/%v/g,this.getDate()+'-'+this.getMonthString()+'-'+this.getFullYear());f=f.replace(/%w/g,this.getDay());f=f.replace(/%X/g,this.toLocaleTimeString());f=f.replace(/%Y/g,this.getFullYear());a=this.getFullYear()+'';f=f.replace(/%y/g,a.substring(2));return f;};mi.Comics=function(){mi.App.apply(this,arguments);var _manageConf=function(prop,val){switch(prop){case'displayMethod':if(val!='displayAllForDate'||val!='displayFirstAndList'||val!='displayCustom'){val='displayAllForDate';}
break;}
return val;};this.setConf('source','/static/includes/comics.xml');this.setConf('targetid','comics_target');this.setConf('limit',15);this.setConf('unavailable','Sorry, no comic strips are available for @date@.');this.setConf('template','@title@<br><img src="@img@">');this.setConf('displayMethod','displayAllForDate');this.setConf('navTemplate','<a href="?date=@previous@">&lt;&lt;<\/a> Comic strips for @active@ <a href="?date=@next@">&gt;&gt;<\/a>');this.setConf('dateDisplayFormat','%B %e, %Y');this.strips=[];mi.getArgs();};mi.Comics.prototype.load=function(){var self=this;var show=(arguments[0])?arguments[0]:true;var title,div,date;this.strips={'all':[],'byDate':{},'byTitle':{}};$.ajax({type:"GET",url:self.getConf('source'),dataType:"xml",success:function(xml){$(xml).find('item').each(function(){title=$(this).find('title').text();div=title.lastIndexOf(' - ');date=new Date(title.slice(div+3)).toFormattedString('%B %e, %Y');title=title.slice(0,div);self.strips.all[self.strips.all.length]={'title':title,'date':date,'link':$(this).find('link').text(),'img':$(this).find('Strip').text(),'rating':$(this).find('Rating').text(),'comment_count':$(this).find('Comments').text(),'votes':$(this).find('Votes').text()};if(!self.strips.byDate[date]){self.strips.byDate[date]=[];}
if(!self.strips.byTitle[title]){self.strips.byTitle[title]=[];}
self.strips.byDate[date][self.strips.byDate[date].length]=self.strips.all[self.strips.all.length-1];self.strips.byTitle[title][self.strips.byTitle[title].length]=self.strips.all[self.strips.all.length-1];});if(show&&document.getElementById(self.getConf('targetid'))){self.display(self.cache.date);}}});this.cache.target=document.getElementById(this.getConf('targetid'));this.determineDate();};mi.Comics.prototype.display=function(date){date=(!date)?new Date():date;this[this.getConf('displayMethod')](date);};mi.Comics.prototype.displayAllForDate=function(date){if(this.determineDate(date)){var output=this.cache.target.cloneNode(false);$(output).append(this.createDateNav());date=this.cache.date.toFormattedString('%B %e, %Y');var iters=this.strips.byDate[date].length;var strips=this.strips.byDate[date];for(var i=0;i<iters;i++){$(output).append('<div class="comicstrip">'+mi.templateParser(strips[i],this.getConf('template'))+'<\/div>');}
this.cache.originaltarget=$(this.cache.target).replaceWith(output);}};mi.Comics.prototype.displayFirstAndList=function(date){if(this.determineDate(date)){console.log('displayFirstAndList display method has been studded, but not developed yet');}};mi.Comics.prototype.displayCustom=function(){};mi.Comics.prototype.createDateNav=function(){var previous=new Date(this.cache.date);var next=new Date(this.cache.date);previous.setDate(previous.getDate()-1);next.setDate(next.getDate()+1);var dateFormat=this.getConf('dateDisplayFormat');var dates={'active':this.cache.date.toFormattedString(dateFormat),'previous':previous.toFormattedString(dateFormat),'next':next.toFormattedString(dateFormat)};return'<div id="comicDateNav">'+mi.templateParser(dates,this.getConf('navTemplate'))+'<\/div>';};mi.Comics.prototype.determineDate=function(date){this.cache.date=(date)?new Date(date):(mi.args.date)?new Date(mi.args.date):new Date();var today=new Date();if(this.cache.date!=today){if(isNaN(this.cache.date)||this.cache.date>today){this.cache.date=today;return true;}
var limit=new Date();limit.setDate(limit.getDate()-this.getConf('limit'));if(this.cache.date<limit){$(this.cache.target).html('<p class="error">'+mi.templateParser({'date':this.cache.date.toFormattedString(this.getConf('dateDisplayFormat'))},this.getConf('unavailable'))+'<\/p>');return false;}}
return true;};var mi=(!mi)?{'media_domain':''}:mi;mi.Cookie=function(document,name,minutes,path,domain,secure){this.$document=(document)?document:window.document;this.$name=(name)?name:'cookie';this.$expiration=(minutes)?new Date((new Date()).getTime()+minutes*60000):null;this.$path=(path)?path:null;this.$domain=(domain)?domain:null;this.$secure=(secure)?true:false;};mi.Cookie.prototype.store=function(){var cookieVal="";for(var prop in this){if((prop.charAt(0)=='$')||((typeof this[prop])=='function')){continue;}
if(cookieVal!==""){cookieVal+='&';}
cookieVal+=prop+':'+escape(this[prop]);}
var cookie=this.$name+'='+cookieVal;cookie+=(this.$expiration)?'; expires='+this.$expiration.toGMTString():'';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+=(this.$secure)?'; secure':'';this.$document.cookie=cookie;};mi.Cookie.prototype.load=function(){var allCookies=this.$document.cookie;if(allCookies===""){return false;}
var start=allCookies.indexOf(this.$name+'=');if(start==-1){return false;}
start+=this.$name.length+1;var end=allCookies.indexOf(';',start);if(end==-1){end=allCookies.length;}
var cookieVal=allCookies.substring(start,end);var a=cookieVal.split('&');if((a.length==1)&&(a[0].indexOf(':')==-1)){var prop=this.$name;this[prop]=unescape(cookieVal.replace(/\+/g,'%20'));return true;}
for(var i=0;i<a.length;i++){a[i]=a[i].split(':');}
for(i=0;i<a.length;i++){this[a[i][0]]=unescape(a[i][1]);}
return true;};mi.Cookie.prototype.remove=function(){var cookie=this.$name+'=';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+='; expires=Fri, 02-Jan-1970 00:00:00 GMT';this.$document.cookie=cookie;};mi.Commenting=function(){mi.App.apply(this,arguments);this._manageConf=function(prop,val){switch(prop){case'enabled':var v=parseInt(val);if(isNaN(v)){val=(val.toLowerCase)?val.toLowerCase():val;switch(val){case true:case'true':case'yes':case'on':v=1;break;default:v=0;break;}}
val=v;default:break;}
return val;};if(mi.control&&mi.control.commenting!=undefined){this.setConf('enabled',mi.control.commenting);}else{this.setConf('enabled',0);console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');}
mi.loadPageInfo();var splitHost=window.location.host.split('.');this.setConf('accountName',splitHost[splitHost.length-2]);this.setConf('target','commentingStage');this.finish();};mi.Commenting.prototype.finish=function(){};mi.Commenting.prototype.display=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('display commenting');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._renderCommenting();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('display commenting');}};mi.Commenting.prototype.displayPopular=function(count){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
var e=this.getConf('enabled');if(e!==0&&e!==3&&e!==4){this._displayPopular(count);}else{console.info('The popular comment threads widget has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}};mi.Commenting.prototype.displayCommentCount=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('comment count');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._displayCommentCount();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('comment count');}}
mi.Commenting.prototype.extended=true;var disqus_identifier,disqus_shortname,disqus_remote_auth_s2,disqus_title;if(typeof facebookXdReceiverPath=="undefined"){var facebookXdReceiverPath;}
mi.Commenting.prototype._displayCommentingDisqus=function(){window.disqus_identifier=this.getThreadId();var cookie=new mi.Cookie(document,'disqus');if(cookie.load()){window.disqus_remote_auth_s2=cookie.disqus;}
window.disqus_title=mi.pageInfo.asset.title;if(window.disqus_identifier!=undefined){var target=document.getElementById(this.getConf('target'));var thread=document.createElement('div');thread.id='disqus_thread';target.appendChild(thread);var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='http://'+this.getConf('accountName')+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}else{console.error('Commenting could not be loaded because there was no defined thread id.');}};mi.Commenting.prototype._renderCommenting=mi.Commenting.prototype._displayCommentingDisqus;mi.Commenting.prototype._displayPopularDisqus=function(count){count=(isNaN(count))?this.getConf('discoveryCount'):count;if(isNaN(count)){count=0;}
count=(count>0&&count<21)?Math.floor(count):5;document.write('<script type="text/javascript" src="http://disqus.com/forums/'+this.getConf('accountName')+'/popular_threads_widget.js?num_items='+count+'"></script>');};mi.Commenting.prototype._displayPopular=mi.Commenting.prototype._displayPopularDisqus;mi.Commenting.prototype._displayCommentCountDisqus=function(){window.disqus_identifier=this.getThreadId();window.disqus_shortname=this.getConf('accountName');document.getElementById('commentCount').href=document.getElementById('commentCount').href+'#disqus_thread';document.getElementById('commentCount').setAttribute('data-disqus-identifier',this.getThreadId());var s=document.createElement('script');s.async=true;s.src='http://disqus.com/forums/'+this.getConf('accountName')+'/count.js';(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild(s);};mi.Commenting.prototype._displayCommentCount=mi.Commenting.prototype._displayCommentCountDisqus;mi.Commenting.prototype.getThreadId=function(){return(mi.pageInfo&&mi.pageInfo.asset&&mi.pageInfo.asset.id)?mi.pageInfo.asset.id:undefined;};mi.Commenting.prototype.finish=function(){window.facebookXdReceiverPath='/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';}
mi.Commenting.prototype.reset_disqus_config=function(disqus_cookie_val,public_api_key){var mi_disqus_config=new disqus_config();var sso_name=mi_disqus_config.sso.name.toString();var sso_button=mi_disqus_config.sso.button.toString();var sso_url=mi_disqus_config.sso.url.toString();var sso_logout=mi_disqus_config.sso.logout.toString();var sso_width=mi_disqus_config.sso.width.toString();var sso_height=mi_disqus_config.sso.height.toString();disqus_config=function(){this.page.remote_auth_s3=disqus_cookie_val;this.page.api_key=public_api_key;this.sso={name:sso_name,button:sso_button,url:sso_url,logout:sso_logout,width:sso_width,height:sso_height};};}
mi.commenting = new mi.Commenting();

 var disqus_config = function () {
     this.sso = {
         name:    "Kansas City",
         button:  "http://media.kansascity.com/static/images/dsq-login-button-mi.png",
         url:     "http://www.kansascity.com/static/insite/disqus_login.html",
         logout:  "http://www.kansascity.com/reg-bin/tint.cgi?mode=logout",
         width:   "600",
         height:  "375"
     };
 };

