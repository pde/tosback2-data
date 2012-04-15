function addToFavorites(){var title,url;title=document.title;url=location.href;if(window.sidebar){window.sidebar.addPanel(title,url,"");}else if(window.external){window.external.AddFavorite(url,title);}
else if(window.opera&&window.print){return true;}}
function changeHeaderClass(elementID,newClass){var elem=document.getElementById(elementID);if(elem){elem.className=newClass;}}
function addTargetAttr(elementID,newTragetAttr){var elem=document.getElementById(elementID);if(elem){elem.setAttribute('target',newTragetAttr);}}
function mapSelection(state,abbr){updateStateList(abbr,null);}
function updateStateList(stateCode,dirCode){var elem=document.getElementById("sl_States");if(elem){elem.value=stateCode;var index=elem.selectedIndex;var selectedText=elem.options[index].text;SetRegion(stateCode,selectedText,dirCode);}}
function submitExistingStateSearch(){var elem=document.getElementById("sl_States");if(elem){var index=elem.selectedIndex;var selectedText=elem.options[index].text;SearchBtn_onclick(elem.value,"");}
return false;}
function OnStateChange_DirectoryList(){if(xmlhttp.readyState==4&&xmlhttp.status==200){var lang=document.forms[0].lang.value;var titleElem=document.getElementById("mapFrameTitle");if(titleElem){var title="Directories list for <b>"+document.getElementById('sp_States').innerHTML+"</b>: ";if(lang&&lang=='sp')
title="Lista de guías telefónicas para <b>"+document.getElementById('sp_States').innerHTML+"</b>: ";titleElem.innerHTML=title;}
var frameElem=document.getElementById("mapFrame");if(frameElem){frameElem.innerHTML=xmlhttp.responseText;}}}
function OnStateChange_RecentDirectory(){if(xmlhttp.readyState==4&&xmlhttp.status==200){var lang=document.forms[0].lang.value;var titleElem=document.getElementById("mapFrameTitle");if(titleElem){var title="Latest accessed online directory: ";if(lang&&lang=='sp')
title="La última guía telefónica abierta: ";titleElem.innerHTML=title;}
var end=xmlhttp.responseText.indexOf("$$");var htmlText="";if(end){htmlText=xmlhttp.responseText.substring(0,end);var start=end+2;var end=xmlhttp.responseText.indexOf("$$",start);var dirCode=xmlhttp.responseText.substring(start,end);var start=end+2;var end=xmlhttp.responseText.indexOf("$$",start);var dirName=xmlhttp.responseText.substring(start,end);var start=end+2;var end=xmlhttp.responseText.indexOf("$$",start);var dirUrl=xmlhttp.responseText.substring(start,end);SetDirectory(dirCode,dirName,dirUrl);}
var frameElem=document.getElementById("mapFrame");if(frameElem){frameElem.innerHTML=htmlText;}}}
function OnStateChange_DownloadStateChanged(){if(xmlhttp.readyState==4&&xmlhttp.status==200){var directoryDDDiv=document.getElementById("directoryDDDiv");var start=xmlhttp.responseText.indexOf("$$");if(start){start=start+2;var end=xmlhttp.responseText.indexOf("$$",start);var content=xmlhttp.responseText.substring(start,end);directoryDDDiv.innerHTML=content;}}}
function SearchBtn_onclick(){var lang=document.forms[0].lang.value;var searchKeyword=document.getElementById('searchKeyword').value;var directorySelect=document.getElementById('sl_Directories');if(directorySelect){var directoryCode=directorySelect.value;var state=document.getElementById('sl_States').value;var directoryUrl=document.getElementById('sl_DirectoriesURL').value;setDirCookie(directoryCode,state);if(directoryUrl&&directoryUrl!=''){directoryUrl=buildBookUrl(directoryUrl);window.open(directoryUrl,"_top");}}}
function onSelectState(dirCode){var lang=document.forms[0].lang.value;var selectedState=document.getElementById('sl_States').value;if(selectedState&&selectedState=="DUMMY")
selectedState=null;if(dirCode&&dirCode=="DUMMY")
dirCode=null;if(selectedState!=null){if(dirCode==null){callback("skin/entrymap/_att/ajax_directory_list.aspx?SelectedState="+selectedState,OnStateChange_DirectoryList);var dirName="- Select a Directory -";if(lang&&lang=='sp')
dirName="- Seleccione un libro -";SetDirectory("DUMMY",dirName,"");}else{callback("skin/entrymap/_att/ajax_recent_directory.aspx?DirCode="+dirCode,OnStateChange_RecentDirectory);}
callback1("skin/entrymap/_att/ajax_directory_dropdown.aspx?SelectedState="+selectedState+"&lang="+lang,OnStateChange_DirectoryDropDown);}else{SetDirectory("","","");var directoryCustomSelect=document.getElementById("directoryCustomSelect_dropdown");if(directoryCustomSelect){directoryCustomSelect.innerHTML="";}
var frameElem=document.getElementById("mapFrame");if(frameElem){frameElem.innerHTML="";}
var titleElem=document.getElementById("mapFrameTitle");if(titleElem){titleElem.innerHTML="";}}
return true;}
function OnStateChange_DirectoryDropDown(){if(xmlhttp1.readyState==4&&xmlhttp1.status==200){var directoryCustomSelect=document.getElementById("directoryCustomSelect_dropdown");if(directoryCustomSelect){directoryCustomSelect.innerHTML=xmlhttp1.responseText;}}}
function SetRegion(stateKey,stateVal,dirCode){document.getElementById('sp_States').value=stateKey;document.getElementById('sp_States').innerHTML=stateVal;document.getElementById('sl_States').value=stateKey;onSelectState(dirCode);}
function SetDirectory(dirKey,dirVal,dirURL){document.getElementById('sp_Directories').value=dirKey;document.getElementById('sp_Directories').innerHTML=dirVal;document.getElementById('sl_Directories').value=dirKey;if(dirURL){document.getElementById('sl_DirectoriesURL').value=dirURL;}else{document.getElementById('sl_DirectoriesURL').value='';}}
function validEmail(email){invalidChars=" /:,;'"
if(email==""){return true;}
for(i=0;i<invalidChars.length;i++){badChar=invalidChars.charAt(i)
if(email.indexOf(badChar,0)>-1){return false}}
atPos=email.indexOf("@",1)
if(atPos==-1){return false}
if(email.indexOf("@",atPos+1)>-1){return false}
periodPos=email.indexOf(".",atPos)
if(periodPos==-1){return false}
if(periodPos+3>email.length){return false}
return true}
function isNum(passedVal){if(passedVal==""){return false}
for(i=0;i<passedVal.length;i++){if(passedVal.charAt(i)<"0"){return false}
if(passedVal.charAt(i)>"9"){return false}}
return true}
function validZip(inZip){if(inZip==""){return true}
if(isNum(inZip)){return true}
return false}
function checkForm(passForm,lang){var stateElem=document.getElementById("statesDD");var selecteState="";if(stateElem){selecteState=stateElem.value;}
if(stateElem==""){var msg="You must select a State";if((lang)&&lang=="sp")
msg="Seleccione el Estado";alert(msg);stateElem.focus();return false;}
var dirElem=document.getElementById("directoryDD");var selectedDir="";if(dirElem){selectedDir=dirElem.value;}
if((selectedDir=="")||(selectedDir=="-- No Directories Found --")||(selectedDir=="-- No existen estos libros --")){var msg="You must select a Book";if((lang)&&lang=="sp")
msg="Seleccione un Libro";alert(msg);if(dirElem){dirElem.focus();}
return false;}
if(passForm.FirstName.value==""){var msg="You must enter a First Name";if((lang)&&lang=="sp")
msg="Indique su nombre";alert(msg);passForm.FirstName.focus();return false;}
if(passForm.LastName.value==""){var msg="You must enter a Last Name";if((lang)&&lang=="sp")
msg="Indique su appellido";alert(msg);passForm.LastName.focus();return false;}
if(passForm.Address1.value==""){var msg="You must enter an Address";if((lang)&&lang=="sp")
msg="Indique su dirección postal";alert(msg);passForm.Address1.focus();return false;}
if(passForm.City.value==""){var msg="You must enter a City Name";if((lang)&&lang=="sp")
msg="Indique la Ciudad";alert(msg);passForm.City.focus();return false;}
if(passForm.ZipCode.value==""){var msg="You must enter a Zip Code";if((lang)&&lang=="sp")
msg="Indique el Código Postal";alert(msg);passForm.ZipCode.focus();return false;}
if(!validZip(passForm.ZipCode.value)){var msg="Invalid Zip code";if((lang)&&lang=="sp")
msg="Código postal inválido";alert(msg);passForm.ZipCode.focus()
passForm.ZipCode.select()
return false;}
if(passForm.Email.value==""){var msg="You must enter an Email Address";if((lang)&&lang=="sp")
msg="Indique el correo electrónico";alert(msg);passForm.Email.focus();return false;}
if(!validEmail(passForm.Email.value)){var msg="Invalid email address";if((lang)&&lang=="sp")
msg="Correo electrónico inválido";alert(msg);passForm.Email.focus()
passForm.Email.select()
return false;}
var elem=document.forms[0].formPosted;if(elem){elem.value="true";}
beforeOrderForm();passForm.submit();return true;}
function resetFormPost(){var elem=document.forms[0].formPosted;if(elem){elem.value="";}
return true;}
function resetFormTarget(){document.getElementById("mainForm").target="_self";}
function checkFormClick(){updateSelectedDir();var elem=document.getElementById("directoryDD");if(elem){if((elem.value!=null)&&elem.value!=""&&(elem.value!="-- No Directories Found --")&&(elem.value!="-- No existen estos libros --")){document.getElementById("mainForm").target="_blank";}else{document.getElementById("mainForm").target="_self";}}else{document.getElementById("mainForm").target="_self";}}
function updateSelectedDir(){var directoryDDVal=document.getElementById("directoryDDVal");if(directoryDDVal){var directoryDD=document.getElementById("directoryDD");if(directoryDD){directoryDDVal.value=directoryDD.value;}else{directoryDDVal.value="";}}}
function beforeOrderForm(){var directoryDDVal=document.getElementById("directoryDDVal");if(directoryDDVal){var directoryDD=document.getElementById("directoryDD");if(directoryDD){directoryDDVal.value=directoryDD.value;}else{directoryDDVal.value="";}}}
function setCookie(dirCode,state,url){setDirCookie(dirCode,state);if(url&&url!=''){url=buildBookUrl(url);window.open(url,"_top");}}
function setDirCookie(dirCode,state){if(dirCode&&dirCode!="DUMMY"&&state&&state!="DUMMY"){var value="dirCode="+dirCode+"&state="+state;Set_Cookie("amddCookie",value,1000);}}
function downloadStateChanged(){var lang=document.forms[0].lang.value;var selectedState=document.getElementById('statesDD').value;if(selectedState&&selectedState!=""&&selectedState!="DUMMY"){callback("skin/entrymap/_att/ajax_download_directory_dropdown.aspx?SelectedState="+selectedState+"&lang="+lang,OnStateChange_DownloadStateChanged);}else{var directoryDDDiv=document.getElementById("directoryDDDiv");directoryDDDiv.innerHTML="";}}
function orderCDStateChanged(){var lang=document.forms[0].lang.value;var selectedState=document.getElementById('statesDD').value;if(selectedState&&selectedState!=""&&selectedState!="DUMMY"){callback("skin/entrymap/_att/ajax_order_cd_directory_dropdown.aspx?SelectedState="+selectedState+"&lang="+lang,OnStateChange_DownloadStateChanged);}else{var directoryDDDiv=document.getElementById("directoryDDDiv");directoryDDDiv.innerHTML="";}
var stateInAddress=document.getElementById('State');stateInAddress.value=selectedState;}
function buildBookUrl(baseUrl){var url=baseUrl;var lang=document.forms[0].lang.value;var searchKeyword=trim(document.getElementById('searchKeyword').value);if(lang&&lang=='sp')
url=url+"&lang=es-ES";if(searchKeyword)
url=url+"&search="+encodeURIComponent(searchKeyword);return url;}
function homePageOnLoad(){var cookie=Get_Cookie("amddCookie");if(cookie){var dirCode=Get_Key(cookie,"dirCode");var state=Get_Key(cookie,"state");if(state){updateStateList(state,dirCode);}}}
function Get_Cookie(name){var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length))){return null;}
if(start==-1)return null;var end=document.cookie.indexOf(";",len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));}
function Get_Key(queryString,key){var start=queryString.indexOf(key+"=");var len=start+key.length+1;if((!start)&&(key!=queryString.substring(0,key.length))){return null;}
if(start==-1)return null;var end=queryString.indexOf("&",len);if(end==-1)end=queryString.length;return queryString.substring(len,end);}
function Set_Cookie(name,value,expires){var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+escape(value)+
((expires)?";expires="+expires_date.toGMTString():"");}
function callback(url,func){if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=func;xmlhttp.open("GET",url,true);xmlhttp.send();}
function callback1(url,func){if(window.XMLHttpRequest){xmlhttp1=new XMLHttpRequest();}
else{xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp1.onreadystatechange=func;xmlhttp1.open("GET",url,true);xmlhttp1.send();}
function trim(str,chars){return ltrim(rtrim(str,chars),chars);}
function ltrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("^["+chars+"]+","g"),"");}
function rtrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("["+chars+"]+$","g"),"");}
function preventEnterOnDoc(e){var key;if(window.event)
key=window.event.keyCode;else
key=e.which;if(key==13){return false;}else
return true;}
function handleSearchKey(e){var key;if(window.event)
key=window.event.keyCode;else
key=e.which;if(key==13){submitExistingStateSearch(e);return false;}
return true;}
function backButtonOverride(){setTimeout("backButtonOverrideBody()",1);}
function backButtonOverrideBody(){try{history.forward();}catch(e){}
setTimeout("backButtonOverrideBody()",500);}