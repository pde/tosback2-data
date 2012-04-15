var expdate=new Date();expdate.setTime(expdate.getTime()+1000*60*60*24*3);document.cookie="j=1; expires="+expdate+"; domain=peekyou.com; path=/;";
var autos=$H({});var tosearch=new Array("first","middle","last","username","locs","country","region","city");var r=0;
function doNewSearch(A){
	//builds the url from values in the search bar and loads the url
	//A is a modifier to note that the work/school tab has been selected.
	//alert('donewsearch');
    url="";
    tagtype=0;
    
    // regex for clean string
    regexString = /^\s+|\s+$|@|%|\*|\^|\&|\(|\)|\+|\=|\[|\]|\[|\}|\{|\;|\~|\:|\'|\"|\<|\>|\?|\!|\\|\#|\||\$|\./g;
    
    if(A){
	if(A=="images"){
        var tag = "";
	    if($("tag").value!="Type in any possible keyword"){ tag = $("tag").value; }

        tag = tag.replace(/ /g,"_")
        url+="/pictures/"+escape(tag.replace(regexString,""));
	}
    if(A=="interest"){
	    if($("tag").value!="tags"&&$("tag").value!=""){
	    	if($("loc_drop").value!=""){url+=$('loc_drop').value;}
	    	var tag = $("tag").value;
	    	tag = tag.replace(/ /g,"_")
	    	url+="/interests/"+escape(tag.replace(regexString,""));
	    }
	}
	if(A=="work"){
	    if($("work_tag").value!="Business or Work Name"&&$("work_tag").value!=""){
	    	if($("loc_drop").value!=""){url+=$('loc_drop').value;}
	    	var tag = $("work_tag").value;
//	    	tag = tag.replace(/ /g,"_")
		    url+="/work/"+escape(tag.replace(regexString,""));
	    }
	}
	if(A=="school"){
        if($("school_tag").value!="School, College or University Name"&&$("school_tag").value!=""){
        	if($("loc_drop").value!=""){url+=$('loc_drop').value;}
        	var tag = $("school_tag").value;
        	tag = tag.replace(/ /g,"_")
            url+="/school/"+escape(tag.replace(regexString,""))}
    }	
	if(A=="phone"){
	    if($("phone").value!="phone"&&$("phone").value!=""){
		    //url+="/phone/"+escape($("phone").value.replace(/^\D*(\d{3})?\D*(\d{3}){1}\D*(\d{4}){1}$/g,""));
            url+="/phone/"+escape($("phone").value.replace(/\D/g,""));
	    }
	}
	if(A=='email'){
	    if($("email").value!="email"&&$("email").value!=""){
		    url+="/email/"+escape($("email").value.replace(/^\s+|\s+$|%|/g,""));
	    }
	}
        
      if(A=='username'){
            if($("username_search").value!="e.g popcontest"&&$("username_search").value!=""){
                
                    var emailSearchUsername = $("username_search").value;

                    if(emailSearchUsername.match(/@/)){
                         var emailSearch =  emailSearchUsername;   
                         var splitEmail = emailSearch.split(/@/);
                         url+="/username="+escape(splitEmail[0].replace(regexString,""));    // strip out the username from the (email search)
                    }else{

                        url+="/username="+escape(emailSearchUsername.replace(regexString,""));  
                    }
                  
            }
        }
        
    if(A=='city'){
        url = "/scripts/getlocation.php?drop=" + $("loc_drop").value + "&text=" + $("locs").value;
	}
	if(A=='as'){
			if((search_hash.get('age_range') || search_hash.get('gender')) && !(search_hash.get('region') || search_hash.get('first') || search_hash.get('middle') || search_hash.get('last') || search_hash.get('username') || search_hash.get('tag'))) {
				search_hash.set('age_range','');
				search_hash.set('gender','');
				$('m').checked = true;
				$('f').checked = true;
				alert('Please narrow your search criteria before using this tool');
				return false;
			}
			url+='/';
			
			if(search_hash.get('country')) url += search_hash.get('country').replace(' ','_')+'/';
			if(search_hash.get('region')) url += search_hash.get('region').replace(' ','_')+'/';
			if(search_hash.get('city')) url += search_hash.get('city').replace(' ','_')+'/';
			if(search_hash.get('age_range')) url += search_hash.get('age_range')+'/';
			if(search_hash.get('gender')) url += search_hash.get('gender')+'/';
			if(search_hash.get('first')||search_hash.get('last')||search_hash.get('middle'))
                {
                    if($("first_name").value&&$("last_name").value&&$("first_name").value!="First Name"&&$("last_name").value!="Last "
                            &&($("middle_name").value == "" || $("middle_name").value == "Middle")){
                                url+=(($("first_name").value!="First Name")?$("first_name").value.replace(regexString,""):"")+"_"+
                                    (($("last_name").value!="Last Name")?$("last_name").value.replace(regexString,""):"");
                            }
                    else{
                        url+=(($("first_name").value!="First Name")?$("first_name").value.replace(regexString,""):"")+"_"+
                            (($("middle_name").value!="Middle")?$("middle_name").value.replace(regexString,""):"")+"_"+
                            (($("last_name").value!="Last Name")?$("last_name").value.replace(regexString,""):"");
                    }
                }

			if(search_hash.get('username')){
                          
                            emailSearchUsername = search_hash.get('username');

                            if(emailSearchUsername.match(/@/)){
                                  emailSearch =  emailSearchUsername;   
                                  splitEmail = emailSearch.split(/@/);  
                                  url += '/username='+splitEmail[0]+'/';
                            }else{
                                  url += '/username='+emailSearchUsername+'/';
                            }
                          
                          
                          //url += '/username='+search_hash.get('username')+'/';
                        } 
                        
                        
			if(search_hash.get('tag')) {
				//url += 'tag/';
				if(search_hash.get('ttype') == 1)
					url += 'interests/';
				else if(search_hash.get('ttype') == 2)
					url += 'work/';
				else if(search_hash.get('ttype') == 4)
					url += 'school/';
				else if(search_hash.get('ttype') != 7)
					url += 'ttype='+search_hash.get('ttype')+'/';
				url += search_hash.get('tag')+'/';
			}
		}
    }
    else{    	
        if($("loc_drop").value!=""){url+=$('loc_drop').value;}
        if(($("first_name").value != "First Name" && $("first_name").value != '') &&
        		($("last_name").value != "Last Name" && $("last_name").value != '') &&
        		($("middle_name").value != "Middle" && $("middle_name").value != ''))
        {url+="/"+$("first_name").value.replace(regexString,"")+"_"+$("middle_name").value.replace(regexString,"")+"_"+$("last_name").value.replace(regexString,"");}
        else if(($("first_name").value != "First Name" && $("first_name").value != '') &&
        		($("last_name").value != "Last Name" && $("last_name").value != ''))
        {url+="/"+$("first_name").value.replace(regexString,"")+"_"+$("last_name").value.replace(regexString,"");}
        else if(($("first_name").value != "First Name" && $("first_name").value != ''))
        {url+="/"+$("first_name").value.replace(regexString,"")+"_";}
        else if(($("last_name").value != "Last Name" && $("last_name").value != ''))
        {url+="/_"+$("last_name").value.replace(regexString,"");}        
        
        if($("username").value!="or username"&&$("username").value!=""){
            
            emailSearchUsername = $("username").value;

            if(emailSearchUsername.match(/@/)){
                  emailSearch =  emailSearchUsername;   
                  splitEmail = emailSearch.split(/@/);
                 url+="/username="+escape(splitEmail[0].replace(regexString,""));    // strip out the username from the (email search)
            }else{

                url+="/username="+escape(emailSearchUsername.replace(regexString,""));  
            }
        
       //     url+="/username="+$("username").value.replace(regexString,"")
        
    
        }
        
        
        
    }
	if(url=="" || url=="/__"){
		url="/world";
	}
	var end = '/';
	if(A=='as' || url.substring(url.length-1) == '/') end = '';
	top.window.location="http://www.peekyou.com"+url;
	
	/* App Savvy */
	var expDate = new Date();
	var expDate = new Date(expDate.getTime() + 1000 * 60 * 60 * 24); 

	setCookieApp("appsavvy"+url,1,expDate);
	setCookieApp("oldpath",window.location.pathname,expDate);
	/* App Savvy */

	
	return false;
}

//showComplete fills in the popup for autocompletes
//function showComplete(B,A){var C="";$A(B).each(function(D){sv=D.split(":");if(A!="tag"){C+="<li id=\"li_"+sv[3]+"\" onclick=\"$('"+A+"').value = '"+sv[1]+"';$('"+A+"_c\').hide();\" onMouseOver=\"auto_sugg_clicked=true; this.className=\'selected\';\" onMouseOut=\"auto_sugg_clicked=false;this.className=\'\';\"  ><div class=\"suggestion\"><span class=\"suggestText\">"+sv[1].replace(eval('/'+sv[0]+'/gi'),'</span><span class="sameText">'+sv[0]+'</span><span class="suggestText">')+"</span></div><div class=\"informal\">"+sv[2]+"</div></li>"}else{C+="<li class=\"tag_auto\" onclick=\"$('"+A+"').value = '"+sv[1]+"';$('"+A+"_c\').hide();\" onMouseOver=\"this.className=\'selected\';\" onMouseOut=\"this.className=\'\';\"><div class=\"suggestion\" ><span class=\"suggestText\">"+sv[1].replace(eval('/'+sv[0]+'/i'),'</span><span class="sameText">'+sv[0]+'</span><span class="suggestText">')+"</span></div></li>"}});$(A+"_c").innerHTML="<ul>"+C+"</ul>";showAuto(A,A+"_c")}
var arg;

//showComplete fills in the popup for autocompletes
function showComplete(B,A,arg){
var C="";

if(arg) 
   exte = arg;
else 
   exte = "_c";

	$A(B).each(function(D){ 

		sv=D.split(":");
		if(A!="tag"){
			C+="<li id=\"li_"+sv[3]+"\" onclick=\"$('"+A+"').value = '"+sv[1]+"';$('"+A+exte+"').hide();\" onMouseOver=\"auto_sugg_clicked=true; this.className=\'selected\';\" onMouseOut=\"auto_sugg_clicked=false;this.className=\'\';\"  ><div class=\"suggestion\"><span class=\"suggestText\">"+sv[1].replace(eval('/'+sv[0]+'/gi'),'</span><span class="sameText">'+sv[0]+'</span><span class="suggestText">')+"</span></div><div class=\"informal\">"+sv[2]+"</div></li>"
		} else {
			C+="<li class=\"tag_auto\" onclick=\"$('"+A+"').value = '"+sv[1]+"';$('"+A+exte+"').hide();\" onMouseOver=\"this.className=\'selected\';\" onMouseOut=\"this.className=\'\';\"><div class=\"suggestion\" ><span class=\"suggestText\">"+sv[1].replace(eval('/'+sv[0]+'/i'),'</span><span class="sameText">'+sv[0]+'</span><span class="suggestText">')+"</span></div></li>"
			}
	});
	if($(A+exte))
	$(A+exte).innerHTML="<ul>"+C+"</ul>";showAuto(A,A+exte)

}



//showAuto is responsible for setting the autocomplete chooser box to visible.
function showAuto(A,B){$(B).style.position="absolute";if(foc==A){$(B).show()}}

//startAutocomplete sets a timer for the autocomplete to show.
//function startAutocomplete(B,A){$(A+"_c").hide();$(A+"_c").innerHTML="";r++;if(typeof (mytimer)!="undefined"){clearTimeout(mytimer)}if(B.length>=1){mytimer=setTimeout("getRes('"+A+":"+B+"')",300)}}

//startAutocomplete sets a timer for the autocomplete to show.

function startAutocomplete(B,A,arg){
	if(arg) 
	   DIV = $(A+arg);
	else 
	   DIV = $(A+"_c");
		
	if(DIV) {
		DIV.hide();
		DIV.innerHTML="";
		r++;
		if(typeof (mytimer)!="undefined") {
			clearTimeout(mytimer)
		}
		if(B.length>=1){
			mytimer=setTimeout("getRes('"+A+":"+B+":"+arg+"')",300)
		}
	}
}

//getRes runs the ajax request for an autocomplete set.
//function getRes(i){args=i.split(":");if(args[0] == 'tag'){if($("tags").checked==true){tagtype="life"}if($("employers").checked==true){tagtype="employers"}if($("schools").checked==true){tagtype="schools"}}if(eval("typeof("+args[0].replace(/ /gi,'__')+"_"+args[1].replace(/ /gi,'__')+")")=="undefined"){url="/autocomplete.php?a="+(args[0]=='tag'?(args[0]+'&tag_type='+tagtype):args[0])+"&v="+args[1]+"&r="+r;var jsel=document.createElement("SCRIPT");jsel.type="text/javascript";jsel.src=url;document.body.appendChild(jsel)}else{toeval=args[0].replace(/ /gi,'__')+"_"+args[1].replace(/ /gi,'__'); showComplete(eval(toeval),args[0]);}}

//getRes runs the ajax request for an autocomplete set.
function getRes(i){
		args=i.split(":");
		if(args[0] == 'tag'){
		if($("tags").checked==true){tagtype="life"}
		if($("employers").checked==true){tagtype="employers"}
		if($("schools").checked==true){tagtype="schools"}}
		if(eval("typeof("+args[0].replace(/ /gi,'__')+"_"+args[1].replace(/ /gi,'__')+")")=="undefined"){url="/autocomplete.php?a="+(args[0]=='tag'?(args[0]+'&tag_type='+tagtype):args[0])+"&v="+args[1]+"&r="+r;var jsel=document.createElement("SCRIPT");jsel.type="text/javascript";jsel.src=url;document.body.appendChild(jsel)}else{toeval=args[0].replace(/ /gi,'__')+"_"+args[1].replace(/ /gi,'__'); 
		showComplete(eval(toeval),args[0],args[2]);
	}
}

//autoComplete adds the autocomplete listeners to the relevant text input areas
function autoComplete(){if($('contact_country_id')){getRegions();} if(Form.getInputs("searchform","text").length>0){Form.getInputs("searchform","text").each(function(A){if(search_hash.get(A.name)){A.value=search_hash.get(A.name);search_hash.set(A.name.replace("_name",""),search_hash.get(A.name))}if(search_hash.get(A.name.replace("_name",""))){A.value=search_hash.get(A.name.replace("_name",""));search_hash.set(A.name+"_name",search_hash.get(A.name.replace("_name","")))}autos.set(A.name,0);if(A.name=="tag"){}})}}
/* this is where we set the tag (work/school) input value */
if(search_hash.get("tag")){$$(".taginput").each(function(A){A.value=search_hash.get("tag").replace(/_/g," ")})}
//runSearch is triggered when an area of the refine section is altered.
function runSearch(B,A){if(B.name=="tag"){return B.serialize()+"&"+$("searchform").serialize()}return A}
//if(typeof (search)!="undefined"&&typeof (needAutocomplete)=="object"&&profile_id=="new"&&typeof ($("1"))!="undefined"){searchsplit=$("1").value.split("|");if(searchsplit[0]){search.set("city_id",searchsplit[0])}}ajax=$H();if(!is_edit&&!is_map){if($$(".refineCell").length>0){$$(".refineCell").each(function(A){if((A.id=="refine_tags"&&is_profile)||(typeof (profile_id)!="undefined"&&profile_id=="new")){return }else{ajax.set(A.name, stupid = new Ajax.Updater(A,"/scripts/refine.php",{method:"get",parameters:"action="+$(A).id+"&"+search_hash.toQueryString()+(typeof(result_set)!='undefined'?"&result_set="+result_set:"")+(typeof(last_count)!='undefined'?"&last_count="+last_count:""),evalScripts:true}));/*this is control for ajax requests*/add_reqs(stupid);}})}}
function add_dim(){if($$(".icon").length>0){$$(".icon").each(function(A){A.observe("mouseover",function(B){A.toggleClassName("dim")},true);A.observe("mouseout",function(B){A.toggleClassName("dim")},true)})}}add_dim();autoComplete();if(typeof (needLogin)!="undefined"&&needLogin==true){GB_showCenter("Login","/login.php?ditch=true",300,500,dumpLinks)}if(is_map){var markers=Array();var points=Array();

var point=Array();locations.each(function(A){ll=A.split(",");point[ll[2]]=new GLatLng(ll[0],ll[1]);points.push(point[ll[2]]);markers[ll[2]]=new GMarker(point[ll[2]]);markers[ll[2]].bindInfoWindowHtml(document.getElementById(ll[2]).innerHTML);map.addOverlay(markers[ll[2]])});var bounds=new GLatLngBounds;for(var i=0;i<points.length;i++){bounds.extend(points[i])}map.centerAndZoomOnBounds(bounds)}; 
//if(!is_profile)	ajax.set('refine_locs',new Ajax.Updater('refine_locs','/scripts/refine.php',{method:'get',parameters:'u=4&action=refine_locs&'+search_hash.toQueryString(),evalScripts:true}));
//updateResults starts the loop to check for new results coming from live spider

function getRegions(){
	url="/scripts/getRegions.php?country_id="+$("contact_country_id").value;
	var A=document.createElement("script");
	A.type="text/javascript";
	A.src=url;
	document.body.appendChild(A);
}

var pavel_resultCheck = function(r,identifier,n){if(identifier!='')var prof=new Ajax.Request('/results.php?r='+r+'&identifier='+identifier+'&n='+n,{method:'get',onComplete:pavel_updateResults,evalScripts: true}); add_reqs(prof);}
function pavel_updateResults(req){	
	if(req.responseText=='norefresh'){
		clearTimeout(pavel_resultInt);
		$('ripper').fade({ duration: 3.0 });
        $('results_loading').hide();
        if(pvl_last_count == 0){ $('resultsContainerProfiles').innerHTML = '';}
	}else if(req.responseText!=''){
		//if(req.responseText.search('div class') != -1){
			//if(typeof($('results_loading')) != 'undefined')
				//$('results_loading').hide();
        //}
        $('resultsContainerProfiles').innerHTML += req.responseText;		
		req.responseText.evalScripts();		
		if($('country_load').innerHTML!=''){ $('country_load').innerHTML = pvl_last_count;}
		if($('region_load').innerHTML!=''){ $('region_load').innerHTML = pvl_last_count ;}		
		loading_ids = 0;		
	}else{loading_ids = 0; }
}
function popin(h){	
    for(var i in dynamic_pids){
            if( ((h + document.body.clientHeight + 140) > ($("div_"+dynamic_pids[i]).offsetTop)) && ($("div_"+dynamic_pids[i]).offsetTop > document.body.clientHeight - 50)) {
                    //$("div_"+dynamic_pids[i]).innerHTML = "hello "+i;
            		//$("admin_menu").innerHTML += "http://www.peekyou.com/showprofile.php?action=get_result&id="+dynamic_pids[i];
                    var dpid = new Ajax.Request("http://www.peekyou.com/showprofile.php?action=get_result&id="+dynamic_pids[i],{asynchronous:true, method: 'get', onComplete:function(req){pop_card_in(req,dynamic_pids[i]);}});
                    delete dynamic_pids[i];
            }
            else if($("div_"+dynamic_pids[i]).offsetTop > (h + document.body.clientHeight -50)) break;
    }
}
function load_profiles(profiles_need_reload){	
    //for(var i in profiles_need_reload){
	//alert('calling this');
	for ( j = 0; j < profiles_need_reload.length; j++){
		var dpid = new Ajax.Updater("div_"+profiles_need_reload[j],"http://www.peekyou.com/showprofile.php?action=get_result&id="+profiles_need_reload[j],{method: 'get'});
		Effect.Pulsate("div_"+profiles_need_reload[j], { pulses: 3, duration: 3 }, { afterFinish: $("div_"+profiles_need_reload[j]).style.opacity = 1 });
    //var dpid = new Ajax.Request("http://www.peekyou.com/showprofile.php?action=get_result&id="+profiles_need_reload[j],{asynchronous:false, method: 'get', onComplete:function(req){pop_card_in(req,profiles_need_reload[j]);}});
    //delete profiles_need_reload[j];
    }
}
function realod_profile(id){
	var dpid = new Ajax.Updater("div_"+id,"http://www.peekyou.com/showprofile.php?action=get_result&id="+id,{method: 'get'});
	Effect.Pulsate("div_"+id, { pulses: 2, duration: 2 },{ afterFinish: $("div_"+id).style.opacity = 1 });
}
function pop_card_in(req,id){
	//alert(req.responseText);
	if(req.responseText.length > 10){
	$("div_"+id).innerHTML = req.responseText;
	Effect.Pulsate("div_"+id, { pulses: 2, duration: 2 });
	}
}