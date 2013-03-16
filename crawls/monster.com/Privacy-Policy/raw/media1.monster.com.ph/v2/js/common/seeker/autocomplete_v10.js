
var selectedSuggestionIndex;
var content="";
var autoData = new Array();
var typ = "";
var tempArray = new Array();
var lastTid = false;
var isBusy = false;
var txtBox;
var txtBoxWidth;
var autocompletelayer;
var focusme=false;
var layerColor1, layerColor1, layerColorSelect, fontColor, tableBorderColor;
var debug=false;
var numRequest=0;
var usedDevice="";
var suggestImg="";
var imgName='';
var arrKwdLogos = new Array();
 
if (! Mons) 
{
	var Mons={};
}

if (! Mons.BASE_SERVER)
{
	Mons.BASE_SERVER='monsterindia.com';
}

var autocompleteType = "";
function displayList(e,txtbox,type,div_id)
{
	if(div_id)
	{
		autocompleteType='resume';
		autocompletelayer = document.getElementById(div_id); //Div to display results
	}
	else
	{
		autocompletelayer = document.getElementById("autocompletedata"); //Div to display results
	}
	txtBox = txtbox; //Typed in value

	if(txtBox.id == 'lmy')
	{
		typ = 'loc';
	}
	else
	{
		if(type)
		{
			typ = type;
		}
		else
		{
			typ = 'kwd';
		}
	}

	if(autoData[typ] == undefined)
		autoData[typ] = new Array();
	
	txtBoxWidth = parseInt(txtBox.style.width) + 12; //width of the box
	if(isNaN(txtBoxWidth))
	{
		txtBoxWidth = 455; //width of the box for no location box available
	}
	var KeyID = (window.event) ? event.keyCode : e.keyCode; //handling IE and firefox

	if(KeyID==38 || KeyID==40 || KeyID==27) //up and down arrow
	{
		KeyCheck(KeyID);
	}
	else
	{
		if(lastTid)
			clearTimeout(lastTid); //If alredy timeout set cleat ir 

		lastTid = setTimeout("callHttp("+KeyID+")", 50); //Wait for 50ms and call HTTP Request
	}
}

function normal(selectedIndex)
{
	var showImage = 0;
var pageLoc = window.location.href ;
pageLoc =pageLoc.replace("#","");
var matchUrl = pageLoc.match(/www/ig);   
if(!matchUrl)
{
	pageLoc = pageLoc.replace("http://", "http://www.");
}

var homePageLoc = "http://www."+Mons.BASE_SERVER+"/";
if( (pageLoc == homePageLoc) || ( pageLoc.match(homePageLoc+"index.html" )) ){
	showImage=1;
}
//alert(Mons.BASE_SERVER);
					if(document.getElementById('autoSuggester')){
					var objTable = document.getElementById('autoSuggester');
					var x= objTable.rows.length;
					objTable.deleteRow(x-1);
					}
	imgName='';
	selectedSuggestionIndex = selectedIndex; 
	suggestions = content.split("|");
	var str="";
	if(suggestions.length > 0 && content.match("[a-zA-Z0-9]"))
	{
		str+='<table id="autoSuggester" BORDER="1" cellspacing="0" cellpadding="2" STYLE="border-color:#808080;border-collapse:collapse;width:'+txtBoxWidth+'px;" onmouseover="focusme=true;" onmouseout="focusme=false;">'+"\n";

		for(i=0;i<suggestions.length;i++)
		{

			var bgcolor, fontColor;
			namestr=suggestions[i];
			var varNameStr = namestr.substring(0,2);
			if(arrKwdLogos['kwd']){
				suggestImg = arrKwdLogos['kwd'][varNameStr.toLowerCase()]; 
			}
			if(suggestImg && showImage){
			var arrSuggestImg = suggestImg.split("||");
			for (var cnt=0 ;cnt<arrSuggestImg.length;cnt++){
				if(arrSuggestImg[cnt]){
				var arrSuggestImgDets = arrSuggestImg[cnt].split("~~");
				var keyName = namestr.toLowerCase();
				var suggestKeyName = arrSuggestImgDets[0].toLowerCase();
				if(keyName.match("^"+suggestKeyName)){
					 imgName = arrSuggestImgDets[1];
					var clickUrl = arrSuggestImgDets[2];
					var name = arrSuggestImgDets[3];
				}
				}
			}	
			}
			//namestr=namestr.split(":")[0];
			if(i%2==0)
			{
				bgcolor=' BGCOLOR="#ffffff"'; //'+layerColor1+'"';
				fontColor='color:#000000;';
			}
			else
			{
				bgcolor=' BGCOLOR="#ffffff"'; //'+layerColor2+'"';
				fontColor='color:#000000;';
			}
			if(autocompleteType == 'resume')
			{
				fontColor='color:#666666;';
			}
			if(i==selectedSuggestionIndex)
			{
			bgcolor=' BGCOLOR="#F1ECF5"'; //'+layerColorSelect+'"';
			if(autocompleteType == 'resume')
				{
					bgcolor='BGCOLOR="#e9f2d9"';
				}
				//fontColor='color:#ffffff;';
				fontColor='';
			}
			str+='<tr>';
			str+='<td class="frest" style="'+fontColor+'padding-left:5px;width:'+txtBoxWidth+'px"'+bgcolor+' onclick="endup(\'m\');autocompletelayer.style.display=\'none\';" onmousemove="normal(\''+i+'\');">'+namestr+'</td>';
			str+='</tr>'+"\n";
		}
		var tempUrl= getImageSubUrl();

		if(imgName != '' && imgName != undefined && showImage)
		{
			str+='<tr id="skillImg"><td valign="top" align="right" onclick="window.open(\''+clickUrl+'\',\'_top\')" style="border-bottom:solid 1px #bfbfbf; width:313px; height:96px; color:#376db0;" class="bg_white"><a style="text-decoration:none;" class="bold" href="#"><img width="313" height="96" src="http://media.'+Mons.BASE_SERVER+'/'+tempUrl+'/logos/'+imgName+'"></a></td></tr>';
		}
		str+='</table>';
	}
	autocompletelayer.style.display='block';
	autocompletelayer.innerHTML=str;
	//autocompletelayer.style.zIndex = '1000';
	autocompletelayer.style.zIndex = '4000';
	autocompletelayer.style.position = 'absolute';
	autocompletelayer.style.left = findPosX(txtBox)+ 'px';
	autocompletelayer.style.top = findPosY(txtBox)+ 'px';

	/// Spacial handling for edit resume page ///////////////////////
	var idStr = autocompletelayer.id;
	var browserName = navigator.appName;	
	if(idStr.match(/desig_autocompletedata_edit_/))
	{
		autocompletelayer.style.left = '175px';
	        autocompletelayer.style.top = '129px';
		if (browserName == "Microsoft Internet Explorer"){
			autocompletelayer.style.left = '172px';
			autocompletelayer.style.top = '137px';
		}
	}else if(idStr.match(/corp_autocompletedata_edit_/))
	{
		autocompletelayer.style.left = '175px';
                autocompletelayer.style.top = '165px';
		if (browserName == "Microsoft Internet Explorer"){
			autocompletelayer.style.left = '172px';
                        autocompletelayer.style.top = '173px';
                }


	}
	/////////////////////////////////////////////////////////////////

}

function allSuggestions(obj)
{
	content = obj;
	content  = obj.SUG_STR;
	var contentImg = content.split("#$#");
	suggestImg = contentImg[1];
	content = contentImg[0];
	autoData[typ][content.split("~")[1]] = content.split("~")[0];
	if(typ=='kwd' && suggestImg && content.split("~")[1] ){
		var con = content.split("~")[1];
		 if(arrKwdLogos[typ] == undefined)
                	arrKwdLogos[typ] = new Array();
		arrKwdLogos[typ][con] = suggestImg;
		
	}
	content = seprateContent(content.split("~")[0]);	
	if(matchResponse(content))
	{
		normal(-1);
	}
	else
	{
		autocompletelayer.innerHTML="";
	}
}

function removeElement(ele)
{
	if (document.getElementById(ele)) 
	{
		var child = document.getElementById(ele);        
        document.body.removeChild(child);
    }
	else 
	{
        //alert("Child div has already been removed or does not exist.");
        return false;
    }
}

function appendScriptTag(element,appendElementId,appendBody,atrArr,innHTML)
{	
	removeElement('scr_suggest');
	var browserName = navigator.appName;
	var eleTag;
	if (browserName == "Microsoft Internet Explorer"){
		eleTag	= document.createElement(element);}
	else{
		eleTag	= document.createElement(element);}
	if(innHTML != null && innHTML != 'undefined')
	{
		eleTag.innerHTML = innHTML;
	}
	for (var i in atrArr){ eleTag.setAttribute(i, atrArr[i]); }	
	
	var apId	= document.getElementById(appendElementId);
	if(apId != null && apId != 'undefined'){apId.appendChild(eleTag);}
	else if(appendBody == '1'){document.body.appendChild(eleTag);}
}

function callHttp(KeyID)
{
	// Find the value typed in autocomplete text Box	
	var str = txtBox.value.toLowerCase();
	str = refineText(str)
	// Calling when the text in autocomplete box has length > 2 
	if(str.length > 1 && str.match(new RegExp("[a-z]+", "i")) && KeyID!=37 && KeyID!=39)
	{
		if(!checkExists(str))
		{			
			autocompletelayer.innerHTML="";
			rand= 10000 * Math.random() ;
			str = str.substring(0,2);
			var regExp = new RegExp('\\#');
			str = str.replace(regExp, '%23');
			var regExp = new RegExp('\\+');
			str = str.replace(regExp, '%2B');
			// Overwriting rand because of day caching usage of browser.
			rand= (new Date()).getYear()+'-'+(new Date()).getMonth()+'-'+(new Date()).getDate();
			if(txtBox.id == 'lmy')
			{	
				var url ="http://"+Mons.BASE_SERVER+"/suggest.html?q="+str+"&type=loc&myrnd="+rand+"&JSONP=allSuggestions";
			}
			else
			{
				if(typ)
				{				
					var url ="http://"+Mons.BASE_SERVER+"/suggest.html?q="+str+"&myrnd="+rand+"&type="+typ+"&JSONP=allSuggestions";			
				}
				else
				{
					var url ="http://"+Mons.BASE_SERVER+"/suggest.html?q="+str+"&myrnd="+rand+"&JSONP=allSuggestions";
				}
			}
							
			var atArrSCRIPT = new Array();	
			atArrSCRIPT['type'] = 'text/javascript';	
			atArrSCRIPT['src'] = url;
			atArrSCRIPT['id'] = 'scr_suggest';
			appendScriptTag('script','','1',atArrSCRIPT);
			//content = httpObj.responseText;
		}
	}
	else if(KeyID!=37 && KeyID!=39)
	{
		autocompletelayer.innerHTML="";
	}
}

function checkExists(str)
{
	if(autoData[typ][str.substring(0,2)] == undefined)
	{
		return false;
	}
	else if(autoData[typ][str.substring(0,2)].match(new RegExp("[a-z]+","i")))
	{
		content = seprateContent(autoData[typ][str.substring(0,2)]);
		if(matchResponse(content))
		{
			normal(-1);
		}
		else
		{
			autocompletelayer.innerHTML="";
		}
		return true;
	}
	return false;
}

function seprateContent(str)
{
	var txtData = refineText(txtBox.value);
	var reg = new RegExp('[.]','g');
	txtData = txtData.replace(reg,'\\.');
	reg = new RegExp('[+]','g');
	txtData = txtData.replace(reg,'\\+');
	var freshContent = '';
	var tempStr = '';
	tempArray = str.split('|');
	var countsg = 0;
	for(sg in tempArray)
	{
		tempStr = refineText(tempArray[sg])
		if(tempStr.match(new RegExp(''+txtData,"i")))
		{
			freshContent+=tempArray[sg]+"|";
			countsg++;
		}
		if(countsg==10)
		{
			break;
		}
	}
	freshContent = freshContent.replace(/\|$/,"");
	return freshContent;
}

function KeyCheck(KeyID)
{
	var str = txtBox.value;
	var show=1;
	if(str.length > 0)
	{
		suggestions = content.split("|");
		if(KeyID==38)
		{
			if(selectedSuggestionIndex > 0)
			{
				selectedSuggestionIndex--;
			}
			else
			{
				selectedSuggestionIndex = suggestions.length-1;
			}
		}
		else if(KeyID==40)
		{
			if(selectedSuggestionIndex < suggestions.length-1)
			{
				selectedSuggestionIndex++;
			}
			else
			{
				selectedSuggestionIndex = 0;
			}
		}
		else if(KeyID==27)
		{
			show = 0;
			focusme	= false;
			hide();
		}
		
		if(show)
		{
			normal(selectedSuggestionIndex);
			endup('k');
		}
	}
}

function endup(device)
{
	suggestions = content.split("|");
	txtBox.value = suggestions[selectedSuggestionIndex].split(":")[0];
	lastSelectedValue = suggestions[selectedSuggestionIndex].split(":")[0];
	usedDevice=device;
	txtBox.focus();
	if(document.forms[0].ac) document.forms[0].ac.value=usedDevice+"~"+numRequest+"~"+lastSelectedValue;
}

function getPos()
{
	var str = txtBox.value;
	var pos = str.lastIndexOf(' ');
	if(str.lastIndexOf(',') > pos)
	{
		pos = str.lastIndexOf(',');
	}
	if(str.lastIndexOf(';') > pos)
	{
		pos = str.lastIndexOf(';');
	}
	return pos;
}

function checkAutoFocus()
{
	suggestions = content.split("|");
	txtBox.value = suggestions[selectedSuggestionIndex];
	txtBox.focus();
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent){
		while (obj.offsetParent){
			curleft += obj.offsetLeft;
			//curleft += obj.offsetRight;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent){
		curtop += obj.offsetHeight;
		while (obj.offsetParent){
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y){
		curtop += obj.y;
		curtop += obj.height;
	}
	return curtop;
}

function hide()
{
	if(focusme==false)
	{
		autocompletelayer = document.getElementById("autocompletedata");
		autocompletelayer.style.display='none';
	}
}

function initAutoComplete(layercolor1, layercolor2, layercolorselect, fontcolor, tablebordercolor)
{
	layerColor1 = layercolor1;
	layerColor2 = layercolor2;
	layerColorSelect = layercolorselect;
	fontColor = fontcolor;
	tableBorderColor = tablebordercolor;
}

function matchResponse(response)
{
	imgName='';
	var str="", qvalue=txtBox.value,suggestions=""; 
	qvalue = refineText(qvalue)
	var reg = new RegExp('[.]','g');
	qvalue = qvalue.replace(reg,'\\.');
	reg = new RegExp('[+]','g');
	qvalue = qvalue.replace(reg,'\\+');

	suggestions = response.split("|");
	if(suggestions.length > 0 && response.match("[a-zA-Z0-9]"))
	{
		for(i=0;i<suggestions.length;i++)
		{
			str=suggestions[i];
			str = refineText(str)
			if(!str.match(new RegExp(qvalue, "i")))
			{
				return false;
			}
		}
	}
	return true;
}

function refineText(rStr)
{
	rStr = rStr.replace(/[^a-z0-9_ .+#]+/ig," ");
	rStr = rStr.replace(/\s+/g," ");
	rStr = rStr.replace(/(^(\s*,\s*)+|(\s*,\s*)+$|^\s+)/g,"");
	return rStr;
}

function Debug()
{
	if(!debug)
	{
		debug=true;		
	}
	else
	{
		debug=false;		
	}
}

function getImageSubUrl()
{
	var baseUrl = Mons.BASE_SERVER;
	if(baseUrl.match(/sg/ig))
	{
		return 'sg';
	}
	else if(baseUrl.match(/id/ig))
	{
		return 'id';
	}
	else if(baseUrl.match(/ph/ig))
	{
		return 'ph';
	}
	else if(baseUrl.match(/th/ig))
	{
		return 'th';
	}
	else if(baseUrl.match(/my/ig))
	{
		return 'my';
	}
	else if(baseUrl.match(/vn/ig))
	{
		return 'vn';
	}
	else if(baseUrl.match(/hk/ig))
	{
		return 'hk';
	}
	else
	{
		return '';
	} 
}  