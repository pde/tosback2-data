/************/
/*properties*/
/************/
var msie = navigator.appVersion.match('MSIE') ? !navigator.appVersion.match('MSIE 7.0') : false;
String.prototype.trim = StringTrim;
var lastcolor;
var lastlen;
/************/
/*functions*/
/***********/
function setScreenWidthForACure(){
  if (document.getElementById('screenwidth'))  {
    var screenwidth = document.getElementById('screenwidth');
    if (YAHOO.util.Dom.getViewportWidth() <= 820)    {
          screenwidth.style.width = "778px";
    } else if(YAHOO.util.Dom.getViewportWidth() >= 960) {
          screenwidth.style.width = "960px";
    } else {
          screenwidth.style.width = YAHOO.util.Dom.getViewportWidth() - 3;
    }
  }
  if (document.getElementById('navigationwidget-marker')){
    //setNavigationWidget() ;
  }
}
function hideIt(menuOld, trgOld, trigdivOld){
  var openarrow = "/images/icon_showall.gif";
  xHide(menuOld);
  trigdivOld.style.backgroundColor = "#ffffff";
  var parent =  node_parent(trgOld);
  if (parent){
    if(node_after(parent).className == "clear"){
      node_after(parent).style.backgroundColor = "#ffffff";
    }
    var trgparentnodes = parent.childNodes;
    for (var i = 0; i < trgparentnodes.length; i++){
      if (trgparentnodes[i].nodeType == 1 && trgparentnodes[i].getAttribute("href") != null){
        trgparentnodes[i].style.background = "#ffffff";
      }
    }
  }
  var trgnodes = trgOld.childNodes;
  for (var i = 0; i < trgnodes.length; i++){
    if ((trgnodes[i].nodeType == 1) && (trgnodes[i].nodeName == "IMG")){
      trgnodes[i].src = openarrow;
    }
  }
}
//new email friend js
function verifyfield(obj) {
  if (obj.name == "to" || obj.name == "from") {
    var emailarray = obj.value.split(/\,/);
    for(var x = 0; x < emailarray.length; x++){
      if (!validateemail(emailarray[x].trim())) {
        processerror(obj, "Please check the format of your email");
        return;
      }
    }
    obj.style.backgroundColor = "";
  }
}
function processerror(obj, msg) {
  $('error').style.background = "#ffffff";
  $('error').style.width = "100%";
  $('error').style.display = "block";
  obj.style.backgroundColor = "#feead4";
  node_after(first_child($('error'))).innerHTML = msg;
  window.setTimeout(switchoff,10000);
}
function switchoff(){Effect.SwitchOff($('error'));}
function switchoff2(){Effect.SwitchOff($('div-emailthispage'));}
function ie6LayerFix(x,y,width,height,TurnOn){
  if(msie){
   var ie6Layer=document.getElementById('ieFix');
   ie6Layer.className = TurnOn ? '':'hidden';
   ie6Layer.style.left = x + "px";
   ie6Layer.style.top = y + "px";
   ie6Layer.style.width = width + "px";
   ie6Layer.style.height = height + "px";
  }
}
function SaveLink(title, url, action, contenttype){
  document.form2.title.value = title;
  document.form2.url.value = url;
  document.form2.contenttype.value = contenttype;
  document.form2.action = action;
  document.form2.submit();
}
function SubmitPageForm(action, theForm){
  theForm.action = action;
  theForm.submit();
}
function closeNavWidgetMenus(){
  if(document.getElementById('menuimage-A')){
    hideIt(document.getElementById('menufull-A'), document.getElementById('menuimage-A'), document.getElementById('menu-A'));
  }
  if(document.getElementById('menuimage-B')){
    hideIt(document.getElementById('menufull-B'), document.getElementById('menuimage-B'), document.getElementById('menu-B'));
  }
  if(document.getElementById('menuimage-C')){
    hideIt(document.getElementById('menufull-C'), document.getElementById('menuimage-C'), document.getElementById('menu-C'));
  }
  if(document.getElementById('menuimage-D')){
    hideIt(document.getElementById('menufull-D'), document.getElementById('menuimage-D'), document.getElementById('menu-D'));
  }
}
function xMenu1(triggerId, triggerDiv, menuId, mouseMargin, openColor){
  var trg = document.getElementById(triggerId);
  var trgdiv = document.getElementById(triggerDiv);
  var mnu = document.getElementById(menuId);
  var widgethead = openColor;
  var widgetbody = "#FFFFFF";
  var closearrow = "/images/icon_showless.gif";
  var openarrow = "/images/icon_showall.gif";
  var flag = xVisibility(mnu);
  closeNavWidgetMenus();
  if (flag == '' || flag == 'hidden'){
    xWidth(mnu, xWidth(trgdiv));
    xShow(mnu);
    trgdiv.style.backgroundColor = widgethead;
    if (trg.parentNode){
      if(node_after(trg.parentNode).className == "clear"){
        node_after(trg.parentNode).style.backgroundColor = widgethead;
      }
      var trgparentnodes = trg.parentNode.childNodes;
      for (var i = 0; i < trgparentnodes.length; i++){
        if (trgparentnodes[i].nodeType == 1 && trgparentnodes[i].getAttribute("href") != null){
          trgparentnodes[i].style.backgroundColor = widgethead;
        }
      }
    }
    var trgnodes = trg.childNodes;
    for (var i = 0; i < trgnodes.length; i++){
      if ((trgnodes[i].nodeType == 1) && (trgnodes[i].nodeName == "IMG")){
        trgnodes[i].src = closearrow;
      }
    }
  }
}
function sw_form(thisform){
  var count = 0;
  if(thisform.symptom0 != null){
    if(thisform.symptom0.checked){
      thisform.action += "&addterm=" + thisform.symptom0.value;
      count++;
    }
  }
  if(thisform.symptom1 != null){
    if(thisform.symptom1.checked){
      thisform.action += "&addterm=" + thisform.symptom1.value;
      count++;
    }
  }
  if(thisform.symptom2 != null){
    if(thisform.symptom2.checked){
      thisform.action += "&addterm=" + thisform.symptom2.value;
      count++;
    }
  }
  if(count > 0){
    location.href = thisform.action;
  }
  else{
    alert("Please check one or more boxes, then press search.")
  }
}
function md_hp_form(thisform){
  if(thisform.q1.value.trim() == "" || thisform.q1.value.trim() == "Enter a term"){
    thisform.action += "health";
  } else {
    thisform.action += thisform.q1.value;
  }
  return true;
}
function dic_home_foc(thisinput){
  thisinput.value = "";
}
function StringTrim(){
  var TestString = this;
  TestString = TestString.replace( /^\s+/g,"");
  TestString = TestString.replace( /\s+$/g,"");
  return TestString;
}
function morehealthmaps(link){
  if (YAHOO.util.Dom.getStyle('healthmap_full','display') == 'none'){
    YAHOO.util.Dom.setStyle('healthmap_full', 'display', 'block');
    link.innerHTML = "&laquo; less";
  } else {
    YAHOO.util.Dom.setStyle('healthmap_full', 'display', 'none');
    link.innerHTML = "more &raquo;";
  }
}
function checklength(obj, len, id) {
  var color = "#666640";
  var count = "";
  if (obj.value.length >= len) {
    color = "red";
    obj.value = obj.value.substring(0, len);
  } else if (len - obj.value.length < len * 0.25)
    color = "#666640";

  if (obj.value.length != lastlen) {
    count = len - obj.value.length;
    document.getElementById(id).innerHTML = count;
  }
  if (color != lastcolor) {
    lastcolor = color;
    document.getElementById(id).style.color = color;
  }
}
function validateemail(strValue) {
  var objRegExp  = new RegExp("^[a-z0-9][a-z0-9_.-]*[a-z0-9_]@[a-z0-9][a-z0-9-]*[a-z0-9](\\.[a-z0-9][a-z0-9-]*[a-z0-9])+\\.?$","i");
  return objRegExp.test(strValue);
}
function validatescreenname(strValue) {
  if (strValue.length < 3) {
    return false;
  }
  var objRegExp  = new RegExp("[<>&\\\\]", "i");
  return !objRegExp.test(strValue);
}
function validatezip(strValue) {
  var objRegExp  = new RegExp("^[0-9]{5}$", "i");
  return objRegExp.test(strValue);
}
function validfield(strValue){
  var objRegExp = new RegExp("[^ \t\n]");
  return objRegExp.test(strValue);
}
function validname(strValue){
  var objRegExp  = new RegExp("[<>&\\\\]", "i");
  return !objRegExp.test(strValue);
}
function validphone(strValue){
  return (/\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}/.test(strValue));
}
function is_all_ws(nod){
  return !(/[^\t\n\r ]/.test(nod.data));
}
function is_ignorable(nod){
  return ( nod.nodeType == 8) || ( (nod.nodeType == 3) && is_all_ws(nod) );
}
function node_parent(child){
 var parent = (child.parentElement!=undefined) ? child.parentElement : child.parentNode;
  return parent;
}
function node_before(sib){
  while ((sib = sib.previousSibling)){
    if (!is_ignorable(sib))
      return sib;
  }
  return null;
}
function node_after(sib){
  while ((sib = sib.nextSibling)){
    if (!is_ignorable(sib))
      return sib;
  }
  return null;
}
function last_child(par){
  var res=par.lastChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.previousSibling;
  }
  return null;
}
function first_child(par){
  var res=par.firstChild;
  while(res){
    if (!is_ignorable(res))
      return res;
    res = res.nextSibling;
  }
  return null;
}
function data_of(txt){
  var data = txt.data;
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data.charAt(0) == " ")
    data = data.substring(1, data.length);
  if (data.charAt(data.length - 1) == " ")
    data = data.substring(0, data.length - 1);
  return data;
}
function kwbold(el,keyword) {
  for (var i = 0; i < el.length; i++) {
    if (window.RegExp && el[i].type == 'text') {
      var rawq = keyword.replace("'","&#39;");
      var rawarr = rawq.split(/\s+/);
      for (x = 0; x < rawarr.length; x++) {
        var regline = new RegExp("\\b" + rawarr[x] + "\\b", "i");
        for (y = 1; y < 4; y++) {
          if (y == 1) {
            strline = el[i].line1;
          }
          else if (y == 2) {
            strline = el[i].line2;
          }
          else {
            strline = el[i].line3;
          }
          if (matchfound = regline.exec(strline)) {
            for (var j = 0; j < matchfound.length; j++) {
              if (y == 1) {
                google_ads[i].line1 = strline.replace(matchfound[j], "<strong>" + matchfound[j] + "</strong>");
              }
              else if (y == 2) {
                google_ads[i].line2 = strline.replace(matchfound[j], "<strong>" + matchfound[j] + "</strong>");
              }
              else {
                google_ads[i].line3 = strline.replace(matchfound[j], "<strong>" + matchfound[j] + "</strong>");
              }
            }
          }
        }
      }
    }
  }
}
function popUp(strURL,strType,strWidth,strHeight){
  var strOptions="";
  if (strType=="news") strOptions="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+strHeight+",width="+strWidth+",top=100,left=100";
  else if (strType=="symptomsearchresult") strOptions="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+strHeight+",width="+strWidth+",top=100,left=100";
  window.open(strURL, 'newWin', strOptions);
}
function tohtmlchars(objValue){
  var strValue = objValue;
  strValue = strValue.replace(/[\<]+/g,"&lt;");
  strValue = strValue.replace(/[\>]+/g,"&gt;");
  return strValue;
}
function CreateBookmarkLink() {
  if (window.sidebar) { // Mozilla Firefox Bookmark
    alert("Please press CTRL + D on your keyboard to bookmark this page.");
  } else if(navigator.appVersion.indexOf("MSIE") > 0) { // IE Favorite
    window.external.AddFavorite( location.href, document.title);
  }
}
//Staywell Harvard type 78 page processing
function processHrAnswer(object, pageId) {

  try {
    var parent = object.parentNode
    parent = parent.parentNode;
    var children = parent.childNodes;
    if (children == undefined || children == null) {
      return;
    }
    var ps = null;

    // Set selected answer styles
    document.getElementById(pageId).style.display = "block";
    object.style.color = "#CC6600";
    object.style.fontStyle = "normal";
    object.style.cursor = "default";
    object.onclick = "";


    // Remove unselected alternatives
    for (var i=0;i<children.length;i++) {
      ps = children[i].childNodes;
      for (var j=0; j<ps.length; j++) {
        if (ps[j].nodeType == 1 && ps[j].onclick != "" && ps[j].onclick != undefined) {
          children[i].style.display = "none";
        }
      }
    }
  }
  catch(err) {
    return;
  }
}
//Placeholders for wide Staywell Harvard table processors
function grabHrTable (obj) {/*dummy*/}
function dropHrTable (obj) {/*dummy*/}
/*********/
/*objects*/
/*********/
HL_pasteHealthmap = {
  pasteMap:function(imuid, display, cfUrl){
    this.healthmapContainerId = "healthmap-container";
    this.healthmapHtml = "<div class=\"hmap-close\"><a href=\"javascript:HL_pasteHealthmap.closeMap();\"><img src=\"/images/close_hmap.gif\" alt=\"\" border=\"0\"/></a></div><div class=\"hmap-title\"> " + display + " : HealthMap &reg;</div><div class=\"hmap-directions div-margin-medium\">Click a box to search the web</div>" +
      "<div id=\"map_layer\"><OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0\" WIDTH=\"750\" HEIGHT=\"500\" id=\"" + imuid + "\">" +
      "<PARAM NAME=movie VALUE=\"/corporate/test/bod_map.swf?imuid=" + imuid + "\">" +
      "<PARAM NAME=quality VALUE=high>" +
      "<PARAM NAME=wmode VALUE=transparent>" +
      "<PARAM NAME=bgcolor VALUE=#FFFFFF>" +
      "<EMBED src=\"/corporate/test/bod_map.swf?imuid=" + imuid +"\" quality=high bgcolor=#FFFFFF WIDTH=\"750\" HEIGHT=\"500\"" +
      "NAME=\"" + imuid + "\" ALIGN=\"\" TYPE=\"application/x-shockwave-flash\" wmode=\"transparent\"" +
      "PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT></div>" +
      "<div id=\"dfp-hmap-ad-lb2\"></div>"+
      "<div class=\"div-margin-medium text-align-center\">Copyright &copy; 2005-2008 Healthline Networks, Inc. All Rights Reserved Worldwide.</div>" +
      "<div class=\"hmap-close\"><a href=\"javascript:HL_pasteHealthmap.closeMap();\"><img src=\"/images/close_hmap.gif\" alt=\"\" border=\"0\"/></a></div>";

    this.healthmapContainerObj = document.getElementById(this.healthmapContainerId);
    //clear out any potential previous healthmaps before adding new child
    if(this.healthmapContainerObj.hasChildNodes())
    {
      while(this.healthmapContainerObj.childNodes.length >= 1)
      {
        this.healthmapContainerObj.removeChild(this.healthmapContainerObj.firstChild);
      }
    }
    this.healthmapDiv = document.createElement("div");
    this.healthmapDiv.id = "healthmap-div";
    this.healthmapDiv.className = "healthmap-div";
    this.healthmapDiv.innerHTML = this.healthmapHtml;

    this.healthmapContainerObj.appendChild(this.healthmapDiv);
    getHmapAd(imuid);
  },
  closeMap:function(){
    if (this.healthmapContainerObj) {
       this.healthmapContainerObj.removeChild(this.healthmapContainerObj.lastChild);
    }
  }
}

var input_buttons = {
  init: function() {
    inputDiv = document.getElementById('input-buttons');
    YAHOO.util.Event.addListener(inputDiv,'mouseover',input_buttons.hover);
    YAHOO.util.Event.addListener(inputDiv,'mouseout',input_buttons.clear);
  },
  hover: function(e) {
    var elTarget = YAHOO.util.Event.getTarget(e);
    while (elTarget.id != inputDiv.id) {
      if(elTarget.nodeName.toUpperCase() == "BUTTON") {
        YAHOO.util.Dom.addClass(elTarget,'button-hover');
        break;
      } else {
        elTarget = elTarget.parentNode;
      }
    }
  },
  clear: function(e) {
    var elTarget = YAHOO.util.Event.getTarget(e);
    while (elTarget.id != inputDiv.id) {
      if(elTarget.nodeName.toUpperCase() == "BUTTON") {
        if (YAHOO.util.Dom.hasClass(elTarget,'button-hover')) {
          YAHOO.util.Dom.removeClass(elTarget,'button-hover')
        }
        break;
      } else {
        elTarget = elTarget.parentNode;
      }
    }
  }
}

function getHmapAd(imuid) {
  var loader = new YAHOO.util.YUILoader();
  loader.base = yuiPath;
  loader.allowRollup = true;
  loader.require("connection");
  loader.loadOptional = true;
  loader.onSuccess = function(o) {
    callback = {
      success : function(o) {
        document.getElementById("dfp-hmap-ad-lb2").innerHTML = o.responseText;
      },
      failure : function() {
      }
    },
    YAHOO.util.Connect.asyncRequest('GET', "/adajax?imuid=" + imuid, callback, null);
  };
  loader.insert();
}

emailPageLoad = {
  init: function(pageURL,emailType){
    pu = pageURL;
    et = emailType;
    var eloader = new YAHOO.util.YUILoader();
    eloader.base = yuiPath;
    eloader.allowRollup = true;
    eloader.require('connection','dom','yahoo');
    eloader.onSuccess = function() {
        var loader = new YAHOO.util.YUILoader();
        loader.base = '/cjs/';
        loader.addModule({name:'emailpage', type:'js', path:'emailpage.v1.20130312155651.js'});
        loader.require("emailpage");
        loader.loadOptional = true;
        loader.onSuccess = function(o) {
          emailpage.open(pu,et);
        };
        loader.insert();
      }
    eloader.insert();
  }
}

 videoPopupLoad = {
  init: function(pageURL,videoSrc){
    pu = pageURL;
    et = videoSrc;
    var eloader = new YAHOO.util.YUILoader();
    eloader.base = "/cjs/";
    eloader.addModule({name:'videopopup', type:'js', path:'videopopup.v1.20130312155651.js'});
    eloader.require("videopopup");
    eloader.loadOptional = true;
    eloader.onSuccess = function(o) {
      videopopup.open(pu,et);
    };
    eloader.insert()
  }
}




