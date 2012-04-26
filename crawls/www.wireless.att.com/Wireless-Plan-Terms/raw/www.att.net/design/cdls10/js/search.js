// Global Variables
var d = document;
// st_A = Search Type (Web, YP, Images, etc..)
// sp_A = Search Page Results
// sv_A = Search Button Value (not needed in Webmail)
var st_A = new Array ('web', 'yp', 'ppl', 'img', 'vid');
var sp_A = new Array ('search/webresults.htm','search/ypresults.htm','search/pplresults.htm','search/imgresults.htm','search/vidresults.htm');
var sv_A = new Array ('Web Search', 'Local Search', 'People Search', 'Images Search', 'Video Search');
var ss_A = new Array ('APYWEBHM', 'APYYPOTH', 'APYPPLHM', 'APYIMGHM', 'APYVIDHM');
var usrTxt = 0;
var ypOn = 0;
checked = false;
var channel = new Array ('wifi', 'entertainment', 'fanzone', 'toolbar');

function searchinit() {

	
	var st = d.getElementById('url_searchType').value;
	var i = 0;
	if (st == '') 
		st = 'web';
	else	{
		for (;st_A [i] != st && i < 6; i++);
	}
	if (i == 6) {i = 0; st = 'web';}
	d.getElementById('spage').value = sp_A[i];
	var urlSource = d.getElementById('url_Source').value;
	if (urlSource == '')
		urlSource = ss_A[i];
	d.getElementById('source').value = urlSource;
	d.getElementById('searchType').value = st_A[i];
	d.getElementById(st_A[i]).style.fontWeight = 'bold';
	d.getElementById(st_A[i]).style.color = '#333';
	//d.getElementById(st_A[i]).style.fontSize = '12px';
	d.getElementById('sm').value = sv_A[i];

	var fpobj = d.getElementById('fp');
	if (i == 1 || i == 2)	{	
		var whobj = d.getElementById('where');
		fpobj.style.width = '150px';
		d.getElementById('ypSrch').style.display = 'inline';
		d.getElementById('fp').parentNode.style.backgroundImage = 'url(/design/CDLS10/img/ui/srchTxtShort.png)';
		if (whobj.value != 'City, State or Zip Code' && whobj.value == ''){
			whobj.value = 'City, State or Zip Code';
		}
	}
	else	{
		fpobj.style.width = '335px';
		d.getElementById('ypSrch').style.display = 'none';
		
	}
	
	if (fpobj.value == '')
		d.forms.fs.fp.focus();

	var u = window.location.href;
	if (u.indexOf ('editorial.dll') > -1)	{
		d.fs.string.value = ''
	}
	if(urlSource =='APYWEBTLBR')
    {
        d.getElementById('url_Channel').value='toolbar';
        d.getElementById('channel').value='toolbar';
    }       
}

function searchToggle(val) {
	
	var st = val;
	var li = d.getElementsByName('srchm');
	
	for (var i = 0; i < li.length; i++){
		if (li[i].style.fontWeight == 'bold'){
			li[i].style.fontWeight = 'normal';
			li[i].style.color = '#585858';
			//d.getElementById(st_A[i]).style.fontSize = '11px';
		}
		else{
			d.getElementById(st_A[i]).style.fontWeight = 'normal';
		}
	}
	d.getElementById(st_A[st]).style.fontWeight = 'bold';
	d.getElementById(st_A[st]).style.color = '#333';
	//d.getElementById(st_A[st]).style.fontSize = '12px';
	d.getElementById('spage').value = sp_A[st];
	d.getElementById('searchType').value = st_A[st];
	d.getElementById('source').value = ss_A[st];
	
	    
	var fpobj = d.getElementById('fp');
	var whobj = d.getElementById('where');
	if (st == 1)	{
		fpobj.style.width = '150px';
		d.getElementById('ypSrch').style.display = 'inline';
		d.getElementById('fp').parentNode.style.backgroundImage = 'url(/design/CDLS10/img/ui/srchTxtShort.png)';
		d.getElementById('pbyLogo').style.backgroundImage = 'url(/design/CDLS10/img/Logos/YPLogo_112x20.png)';
		//d.getElementById('pbyLogo').style.display = 'none';
		if (fpobj.value != 'Business or Category' && (fpobj.value == '' || fpobj.value == 'Last Name'))
			fpobj.value = 'Business or Category';
		if (whobj.value != 'City, State or Zip Code' && whobj.value == '')
			whobj.value = 'City, State or Zip Code';
	}
	else
	if (st == 2)	{
		if (fpobj.value != 'Last Name' && (fpobj.value == '' || fpobj.value == 'Business or Category'))
			fpobj.value = 'Last Name';
		fpobj.style.width = '150px';
		d.getElementById('ypSrch').style.display = 'inline';
		d.getElementById('fp').parentNode.style.backgroundImage = 'url(/design/CDLS10/img/ui/srchTxtShort.png)';
		d.getElementById('pbyLogo').style.display = 'block';
		d.getElementById('pbyLogo').style.backgroundImage = 'url(/design/CDLS10/img/Logos/AnyWhoLogo_112x20.png)';
		
		if (whobj.value != 'City, State or Zip Code' && whobj.value == '')
			whobj.value = 'City, State or Zip Code';
	}
	else	{
		if (fpobj.value == 'Last Name' || fpobj.value == 'Business or Category')
			fpobj.value = '';

		fpobj.style.width = '335px';
		d.getElementById('ypSrch').style.display = 'none';
		d.getElementById('fp').parentNode.style.backgroundImage = 'url(/design/CDLS10/img/ui/srchTxtLong.png)';
		d.getElementById('pbyLogo').style.display = 'block';
		d.getElementById('pbyLogo').style.backgroundImage = 'url(/design/CDLS10/img/Logos/ysearch_logo.png)';
	}

	d.getElementById('sm').value = sv_A[st];
	
	/**** start YWA Reports *****/
	d.getElementById('sm').setAttribute("rel","globalheader|Global Search|"+st_A[st]+"|"+sv_A[st]);
	//d.getElementById('sm').setAttribute('onclick','captureReporting("globalheader","search","'+st_A[st]+'","searchnow",15)');
	/**** end YWA Reports *****/
	

	// if not on home page and if not on People / yellow pages do a auto submit.
	var urlsrchType = d.getElementById('url_searchType').value;
	if (urlsrchType != '') {
		if (val != 1 && val !=2)
		    submitSearch();
	}
}

function submitSearch(){
	var url;
	var st = d.getElementById('searchType').value;
	var urlChannel = d.getElementById('url_Channel').value;
	if (st == 'shop'){
		d.getElementById('returl').value = 'http://shopping.yahoo.com/search?p='+ escape(escape(d.getElementById('fp').value));
		d.getElementById("shopform").submit();
		return false;
	}
	else{
         if(!srchExp(urlChannel))
         {   
    	    //url = 'XXHTTPCOBRANDXX/s/s.dll?spage=' + d.getElementById('spage').value;		
		    url = d.getElementById('url_HTTPCobrand').value;
		    url = url  + '/s/s.dll?spage=' + d.getElementById('spage').value;
		    url = url  + '&source=' + d.getElementById('source').value;
		    url = url  + '&searchtype=' + d.getElementById('searchType').value;
		    url = url  + '&string=' + escape(d.getElementById('fp').value);
		    url = url  + '&ch=' + escape(d.getElementById('url_ch').value);
		    //if(d.getElementById('channel').value != '')
		    var urlChannel = d.getElementById('channel').value;
    		
		    if (urlChannel != '') 
			    url = url  + '&channel=' + escape(d.getElementById('channel').value);

		    //if (st == 'yp' || st == 'ppl')
		    //{
			    url = url  + '&where=' + d.getElementById('where').value;
		    //}
		    window.location = url;
		 }
	}
    return false;
}

function clearfpTxt(){
	var st = d.getElementById('searchType').value;
	var fpobj = d.getElementById('fp');
	if (st == 'yp' && fpobj.value == 'Business or Category')
		fpobj.value = '';
	if (st == 'ppl' && fpobj.value == 'Last Name')
		fpobj.value = '';
}

function clearwhereTxt() {
	var whobj = d.getElementById('where');
	if (whobj.value == 'City, State or Zip Code')
		whobj.value = '';
}

function submitYPDistSearch(){
	var url = String(document.location);
	var val = d.getElementById('yprad').value;
	var index = url.indexOf('&ypradius=');
	if (val == 1){
		if (index == -1){
			return;
		}
		else	{
			var rest = url.slice(index);
			var rest1 = url.slice(index + 1);
			var index2 = rest1.indexOf('&');
			if (index2 == -1){
				url = url.substr(0,index);
			}
			else{
				var remain = rest.slice(index2 + 1);
				url = url.substr(0,index);
				url = url.concat(remain);
			}
		}
	}
	else{
		if (url.match("&ypradius=")){
			var rest3 = url.slice(index);
			var rest4 = url.slice(index + 1);
			var index3 = rest4.indexOf('&');
			if (index3 == -1){
				url = url.substr(0,index);
				url = url + '&ypradius=' + d.getElementById('yprad').value;
			}
			else{
				var remain = rest3.slice(index3 + 1);
				url = url.substr(0,index);
				url = url + '&ypradius=' + d.getElementById('yprad').value;
				url = url.concat(remain);
			}
		}
		else{
			var url = url + '&ypradius=' + d.getElementById('yprad').value;
		}
	}
	window.location = url;
}

function ParseString(schStr){	
	var str = String(schStr);
	var rtnstr;	
	if(str.length > 100){
		rtnstr = '"' + str.substr(0,75) + '.........."';
		return rtnstr;
	}	
	else	{
		rtnstr = '"' + str + '"';
		return rtnstr;
	}		
}

function checkAll(){
 if (checked == false)	{
		checked = true;
	}
	else{
		checked = false;
	}
	for (var i = 0; i < document.forms["categoryList"].elements.length; i++){
		document.forms["categoryList"].elements[i].checked = checked;
	}
}

function handleRogueSeperator(){
	// The following chunk of code is specific to YellowPages search. 
	// Check the city,st format. If the user entered a seperator other than comma(,), change it to comma.
	if (d.getElementById('searchType').value == 'yp')	{
		var tmpWhere = d.getElementById('where').value;
		if (isNaN(tmpWhere))		{
			var tmpLen = tmpWhere.length;
			var curSepSym = tmpWhere.charAt(tmpLen - 3);
			var i = 3;
			while (curSepSym == ' ')	{
				i++;
				curSepSym = tmpWhere.charAt(tmpLen -i);
			}
			var patt1 = new RegExp("[\,\.\;\:\'\"]","g");
			var newSepSym = curSepSym.match(patt1);
			if (newSepSym != null && newSepSym != ',')	{
				var correctWhere = tmpWhere.substr(0, tmpLen - i) + "," + tmpWhere.substr(tmpLen - 2, tmpLen);
				d.getElementById('where').value = correctWhere;
			}
		}
	}
}
/*search pointing to yahoo!*/
function OnSubmitForm()
{
	
   var ip = d.getElementById('IPTYPE').value;
   var cobrand = d.getElementById('searchcobrand').value;
   var srchType = d.getElementById('searchType').value;
   var urlChannel = d.getElementById('url_Channel').value;
    
    if(srchExp(urlChannel) && (srchType == 'web' || srchType == 'img' || srchType == 'vid'))
    {
        
		var str = d.fs.action;
        d.fs.action = str.replace("s.dll", "context.dll"); 
        var srchString =escape(escape(d.getElementById('fp').value));
        
        if(srchType == "web" ) 
        {   
            d.getElementById('returl').value="http://us.yhs4.search.yahoo.com/yhs/search?hspart=att&hsimp=yhs-att_001&p="+srchString;
            d.getElementById('name').value="attcategories.yahoo.search.web";
        }
        else if ( srchType == "img")
        {
            d.getElementById('returl').value="http://images.search.yahoo.com/search/images?p="+srchString+"&ei=UTF-8&fr=att_image&type=imgagesearch&.partner=sbc";
            d.getElementById('name').value="attcategories.yahoo.search.image";
        }   
        else if(srchType == "vid")
        {
            d.getElementById('returl').value="http://video.search.yahoo.com/search/video?p="+srchString+"&ei=UTF-8&fr=att_video&type=videosearch&.partner=sbc";
            d.getElementById('name').value="attcategories.yahoo.search.video";
        } 
        var node = d.getElementById('searchParams');     
        while(node.firstChild)
        { 
            node.removeChild(node.firstChild);
        }  
        var e = document.getElementById("Hidden2"); e.parentNode.removeChild(e);
        e = document.getElementById("fp"); e.parentNode.removeChild(e);
        e = document.getElementById("where"); e.parentNode.removeChild(e);
        e = document.getElementById("sm"); e.parentNode.removeChild(e);
       
    }
    else if(srchType == 'yp' || srchType == 'ppl')
    {
		
	   clearfpTxt();
        clearwhereTxt();
        //d.getElementById('ypcomsearchterm').value=escape(escape(d.getElementById('fp').value));
        if(srchType == 'ppl')
            formatInpt();
        if(srchType == 'yp')
        {
            var e = document.getElementById("url_searchType"); e.parentNode.removeChild(e);
            e = document.getElementById("url_Source"); e.parentNode.removeChild(e);
            e = document.getElementById("url_Channel"); e.parentNode.removeChild(e);
            e = document.getElementById("url_HTTPCobrand"); e.parentNode.removeChild(e);
        }    
        //remove unncessary url params.
        var node = d.getElementById('searchYhoo');     
        while(node.firstChild)
        { 
            node.removeChild(node.firstChild);
        } 
    }  
   return true;
}

function srchExp(channel_)
{
    var x;
    for (x in channel)
    {
        if(channel[x] == channel_)
            return false;
    }
    return true;
}

function formatInpt()
{
    var inpt = d.getElementById('where').value;
    var index = inpt.indexOf(",");
    if(index>-1 && inpt.charAt(index+1)!=' ')
        d.getElementById('where').value = inpt.substr(0,index) + ", " + inpt.substr(index+1) 
}

function sortYPresults(sel)
{
    
    var url = String(document.location);
	var val = d.getElementById(sel).value;
	var index = url.indexOf('&sort=');
	
	if (url.match("&sort=")){
		var rest3 = url.slice(index);
		var rest4 = url.slice(index + 1);
		var index3 = rest4.indexOf('&');
		if (index3 == -1){
			url = url.substr(0,index);
			url = url + '&sort=' + d.getElementById(sel).value;
		}
		else{
			var remain = rest3.slice(index3 + 1);
			url = url.substr(0,index);
			url = url + '&sort=' + d.getElementById(sel).value;
			url = url.concat(remain);
		}
	}
	else{
		var url = url + '&sort=' + d.getElementById(sel).value;
	}
	window.location = url;            

}
function sortYPreviews(sel)
{
    
    var url = String(document.location);
	var val = d.getElementById(sel).value;
	var index = url.indexOf('&sort=');
	
	if (url.match("&sort=")){
		var rest3 = url.slice(index);
		var rest4 = url.slice(index + 1);
		var index3 = rest4.indexOf('&');
		if (index3 == -1){
			url = url.substr(0,index);
			url = url + '&sort=' + d.getElementById(sel).value;
		}
		else{
			var remain = rest3.slice(index3 + 1);
			url = url.substr(0,index);
			url = url + '&sort=' + d.getElementById(sel).value;
			url = url.concat(remain);
		}
	}
	else{
		var url = url + '&sort=' + d.getElementById(sel).value;
	}
	window.location = url;            

}
