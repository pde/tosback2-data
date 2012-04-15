//******************************************************************************
// Get User Agent
var ua		= navigator.userAgent;
var opera	= /opera [56789]|opera\/[56789]/i.test(ua);
var ie = !opera && /msie [56789]/i.test(ua);
var ie6 = ie && /msie 6/i.test(ua);
var ie7 = ie && /msie 7/i.test(ua);
var moz		= !opera && /mozilla\/[56789]/i.test(ua);
var safari = /safari/i.test(ua);
var flashActif = ("undefined" != typeof(DetectFlashVer)) ? DetectFlashVer(8, 0, 0) : false;
//******************************************************************************
//  Cookie Functions -- "Night of the Living Cookie" Version (25-Jul-96)
//  Written by:  Bill Dortch, hIdaho Design <bdortch@hidaho.com>

//  "Internal" function to return the decoded value of a cookie
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

//  Function to return the value of the cookie specified by "name".
function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
	i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}

//  Function to create or update a cookie.
//  SetCookie (myCookieVar, cookieValueVar, null, "/myPath", null, true);
//
function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "") + 
    "";//"; expires=Thu, 31-Dec-2050 00:00:00 GMT";
}

//  Function to delete a cookie. (Sets expiration date to start of epoch)
function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
// ******************************* FONCTION SPECIFIQUES AUX TABLEAUX ***************************************** //
function sortListe(_array, methodeComparaison) {
	// Recopie Array
	var newArray = new Array();
	for (var i = 0; i < _array.length; i++) {
		newArray[i] = _array[i];
	}
	// Tri
	try {
		for (var current = 1; current < newArray.length; current++) {
			var challenger = current - 1;
			while (challenger >= 0 && methodeComparaison(newArray[challenger + 1],newArray[challenger]) < 0) {
				var temp = newArray[challenger];
				newArray[challenger] = newArray[challenger + 1];
				newArray[challenger + 1] = temp;
				challenger--;
			}
		}
	}
	catch (e) {
		alert('Comparator can\'t sort Array');
	}
	return newArray;
}
//******************************************************************************/
// Actions des champs textes
function txt_keyup(ev){
	Obj = check_event(this);
	RgxAlert = new RegExp("^alerte");
	Alert = Obj.parentNode.parentNode;
	while(Alert.previousSibling) {
		Alert = Alert.previousSibling;
		if(RgxAlert.test(Alert.className) == true) {
			Alert.style.display = "none";
			//break;
		}
	}
}

// Détection objet source événement
function check_event(o){
	return ((window.event)?window.event.srcElement:o);
}

// fonction qui retourne la valuer false, permet d'éviter la prise en compte des liens de type "#"
function _false(){
	return false;
}
//=============================================================================================

// Actions sur les boutons de fermeture des boîtes de dialogue
function getStaticPath(){
	var  sPath = (typeof(staticPath)!='undefined') ? staticPath + "/" : "";
  return sPath;
}

function btn_mouseover(ev){
    Obj = check_event(this);
    Obj.src = String(Obj.src).replace("-off","-on");
}
function btn_mouseout(ev){
    Obj = check_event(this);
    Obj.src = String(Obj.src).replace("-on","-off");
}
function btnp_mouseover(ev){
    Obj = check_event(this);
    Obj.src = String(Obj.src).replace("-off-popup","-on-popup");
}
function btnp_mouseout(ev){
    Obj = check_event(this);
    Obj.src = String(Obj.src).replace("-on-popup","-off-popup");
}
function btn_click(ev){
	Obj = check_event(this);
	Obj.parentNode.parentNode.parentNode.style.display = 'none';
	afficher_tout_aff();
	masquer_tout_masq();
}
function btn_click_effal(ev)	{
	Obj = check_event(this);
	Obj.parentNode.parentNode.parentNode.style.display = 'none';
	Obj.effalobj.style.display = "none";
}
function btn_click_w(ev){
	window.close();
}

// Masque boîtes les boîtes d'aide
function boite_close_all(){
	Boxes = getElementsByClassName(document, "div", "boite");
	for(i=0; i<Boxes.length; i++) {
		Boxes[i].style.display = "none";
	}
}



// Masque ou affiche une alerte en fonction de l'action passée en paramètre
// l'attribut alerte correspond à la div de l'alerte
function masqueAfficherAlert(alerte, action){
	while(alerte.previousSibling) {
		alerte = alerte.previousSibling;
		if(RgxAlert.test(alerte.className) == true) {
			alerte.style.display = action;
			break;
		}
	}
} 
// Masque toutes les alertes
function alerte_close_all(){
	Boxes = getElementsByClassName(document, "div", "alerte");
	for(i=0; i<Boxes.length; i++) {
		Boxes[i].style.display = "none";
	}
}

// Afficher tous les filtres
function afficher_tout_aff(){
	Boxes = getElementsByClassName(document, "a", "Aff_N5_filtres_sel_a");
	for(i=0; i<Boxes.length; i++) {
		Boxes[i].style.display = "block";
	}
}

// Masquer tous les filtres
function masquer_tout_masq(){
	Boxes = getElementsByClassName(document, "a", "Masq_N5_filtres_sel_a");
	for(i=0; i<Boxes.length; i++) {
		Boxes[i].style.display = "none";
	}
}

// enlève les caractères spéciaux et fait un trim sur un libelle
function trim(pLibelle) {
	var strLib = new String(pLibelle);
	if(strLib!=null){
		// (désactivé) suppression des caractères spéciaux
		//strLib = strLib.replace(/[\\\/\-_+,;><!^~#\{\}\(\).\':=]/g,'');
		
		//suppression des espaces de début et fin
		strLib = strLib.replace(/(?:^\s+|\s+$)/g, "");		
	}
	return strLib.toString();
}


// Lecture de l'URL du document courant, de la forme "http://.../src/files/tmp/xxx.html"
// et on coupe au dernier "/"
function DocumentBase() {
	cur_url = document.URL;
	// on retire la query string qui pourrait contenir un "/"
	var iPos = cur_url.indexOf("?");
	if(iPos > 0) {
		cur_url = cur_url.substring(0, iPos);
	}	
	document_base = cur_url.substring( 0, cur_url.lastIndexOf( "/" )) + "/";
	return document_base;
}


/* Combo Nous écrire */
function nousecrire_obj_init(){
	document.getElementById("selectSujet").obj_vals = new Array("Merci de préciser l'objet de votre message", "", "", "Merci de préciser quelle recherche vous avez effectué (Quoi/Qui/Où), si vous avez activé la fonction « à côté de... » et de décrire l'anomalie rencontrée afin que nous puissions la corriger.", "Merci de préciser quelle recherche vous avez effectué (Qui/Où) et de décrire l'anomalie rencontrée afin que nous puissions la corriger.", "Merci de décrire le plus précisément possible l'anomalie rencontrée afin que nous puissions la corriger.");

	document.getElementById("message").onclick = document.getElementById("message")._click = function(){
		this.value = "";
		this.onclick = null;
	}

	document.getElementById("selectSujet").onchange = function(){
		document.getElementById("message").value = this.obj_vals[this.selectedIndex];
		document.getElementById("message").onclick = document.getElementById("message")._click;
	}
}


// Boîtes de dialogue
function PJ_init_boites(){
	// Actions sur les boutons de fermeture des boîtes de dialogue
	Btns = getElementsByClassName(document, "img", "close");
	for(i=0; i<Btns.length; i++) {
		addEvent(Btns[i], "mouseover", btn_mouseover, true);
		addEvent(Btns[i], "mouseout", btn_mouseout, true);
		addEvent(Btns[i], "click", btn_click, true);
		if(Btns[i].className.indexOf("eff_alerte")>0){
	   o = Btns[i];
	   while(getElementsByClassName(o, "div", "alerte").length==0)
		  o = o.parentNode;
	   Btns[i].effalobj = getElementsByClassName(o, "div", "alerte")[0];
		 addEvent(Btns[i], "click", btn_click_effal, true);
		}
		Btns[i].parentNode.onclick = _false;
	}

	BtnsW = getElementsByClassName(document, "img", "closewindow");
	for(i=0; i<BtnsW.length; i++) {
		removeEvent(BtnsW[i], "click", btn_click, true);
		addEvent(BtnsW[i], "click", btn_click_w, true);
		BtnsW[i].onclick = _false;
	}

	BtnsP = getElementsByClassName(document, "img", "closepopup");
	for(i=0; i<BtnsP.length; i++) {
		addEvent(BtnsP[i], "mouseover", btnp_mouseover, true);
		addEvent(BtnsP[i], "mouseout", btnp_mouseout, true);
	}
}



// Détection de navigateur
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},
		{string: navigator.vendor,subString: "Apple",identity: "Safari"},
		{prop: window.opera,identity: "Opera"},
		{string: navigator.vendor,subString: "iCab",identity: "iCab"},
		{string: navigator.vendor,subString: "KDE",identity: "Konqueror"},
		{string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},
		{string: navigator.vendor,subString: "Camino",identity: "Camino"},
		{/*for newer Netscapes (6+)*/string: navigator.userAgent,subString: "Netscape",identity: "Netscape"},
		{string: navigator.userAgent,subString: "MSIE",identity: "Explorer",versionSearch: "MSIE"},
		{string: navigator.userAgent,subString: "Gecko",identity: "Mozilla",versionSearch: "rv"},
		{/*for older Netscapes (4-)*/string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
	],
	dataOS : [
		{string: navigator.platform,subString: "Win",identity: "Windows"},
		{string: navigator.platform,subString: "Mac",identity: "Mac"},
		{string: navigator.platform,subString: "Linux",identity: "Linux"}
	]

};
BrowserDetect.init();

// récupération d'informations utilisateur
function getInfoUtilisateur() {
	var info = "Flash version : " + GetSwfVer();
	info += " - Résolution écran : " + screen.width + "*" + screen.height;
	return info;
}

// Détection des maps Flash...
// N1_carte

function afficheBtnsFlashMap( iScan ){
	var maxScan = 50;// nbre max de recherche
	var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;// compteur de recherche
	var bFlash = ("undefined" != typeof(DetectFlashVer)) ? DetectFlashVer(8, 0, 0) : false;
	var oActionContainer = 	document.getElementById("N1_actions_carte");
	if( oActionContainer ){
		var collLi = oActionContainer.getElementsByTagName("LI");
		var cpt = 0;
		while(cpt < collLi.length ){
			var oLi = collLi[cpt]; 
			if(bFlash || (oLi.id!="sendByMail" && oLi.id!="displayPhoto" && oLi.id!="displayItineraire") ){
				oLi.style.visibility = 'visible';
			}
			cpt ++;
		} 
	}else if(lvScan < maxScan){	 // Rechargement de la fonction.
		window.setTimeout(function(){
			lvScan++;
			afficheBtnsFlashMap( lvScan );
		}, 200);
	}
}
afficheBtnsFlashMap();

function afficheBtnsAgrandirCarte( iScan ){
	var maxScan = 50;// nbre max de recherche
	var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;// compteur de recherche
	
	var oBouton = document.getElementById("actionAgrandirCarte");
	if(oBouton){
		oBouton.style.visibility = "visible";
	}else if(lvScan < maxScan){ // Rechargement de la fonction.
		window.setTimeout(function(){
			lvScan++;
			afficheBtnsAgrandirCarte( lvScan );
		}, 200);
	}
}
afficheBtnsAgrandirCarte();

//--------------------------------------------------
//Gestion des id de session dans les liens.
function initWinLinks(){
	
	var docLinks = document.getElementsByTagName("A");
	var i=0;
	while(i < docLinks.length){
		var oLink = docLinks[i];
		
		if( oLink.href != "" && (-1 == oLink.href.indexOf("javascript")) 
          && (-1 == oLink.href.indexOf("#null")) && (oLink.href.lastIndexOf("#") != (oLink.href.length - 1))){
			var  text = oLink.innerHTML;	
			// traitement si une ancre est detectee dans l'url
			var valeurAncre = '';
			var isAncre = false;
			var indexDiese = oLink.href.indexOf("#");					
			if(indexDiese != -1 && ((oLink.href.length -  indexDiese)> 1)){
					valeurAncre = oLink.href.substr(indexDiese,oLink.href.length); 	
					if(valeurAncre.length > 0){
						isAncre = true;
						// suppression et sauvegarde de l'ancre
						oLink.href = oLink.href.substr(0,indexDiese);					
					}
			}
			oLink.href = addIdContextPortail(oLink.href,isAncre);			
			// ajout de l'ancre apres l'ajout des parametres context et portail
			if(valeurAncre.length > 0){
				oLink.href = oLink.href + valeurAncre;
			}			
			// Mantis 15284
			if ( ie){
				oLink.innerHTML = text;
			}			
		}
		i++;
	}
}	

// -------------------------------------------------
function initWinForms(){
	var docForms = document.getElementsByTagName("FORM");
	var i=0;
	while(i < docForms.length){
		var oForm = docForms[i];
		oForm.action = addIdContextPortail(oForm.action,false);
		i++;
	}
}		

// -------------------------------------------------
function addIdContextPortail(hurl,ancre){
	var sHostName = window.location.hostname;
	var bTestUrl = ((hurl.indexOf(sHostName) >= 0 || /$(\/)/.test(hurl) || (hurl.charAt(0) == '/')) != false) ? true : false;
	
	this.addUrlParam = function(sIdHidden, sUrlParam){
		var hiddenObj = document.getElementById(sIdHidden);
		var isAncreSurPageActuelle = false;
		
		if((ancre) && (hurl.indexOf(document.location.href) != -1)){
			isAncreSurPageActuelle=true;
		}	
		if(( hurl.indexOf(sUrlParam) == -1) && !isAncreSurPageActuelle){
			if(hiddenObj){
				var sIdContext = hiddenObj.value;
				if(sIdContext!="" && (bTestUrl)){				
					var sConcat = (hurl.indexOf("?") != -1) ? "&": "?";
					hurl = hurl +sConcat+sUrlParam+"="+sIdContext;
				}
			}
		}
	}
	this.addUrlParam("idContext", 'idContext' );
	this.addUrlParam('idPortail','portail' );
	
	return hurl;
}

// Initialisation des liens au chargement.
addEvent(window, 'load', initWinLinks, false);
// Initialisation des formulaires au chargement.
addEvent(window, 'load', initWinForms, false);

/********************************************
* Récupération des variables passées dans 
* l'URL
*********************************************/
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
}
// Analyse les champs du formulaire en paramètre et les renvoie sous la forme
// param1=value1&param2=value2&param3=value3 ...
// Utile notamment pour poster les paramètres via ajax
function getUrlParamsFromFormElements(pForm) {
	var sParams = "";
	if (pForm) {
		var iNbFormElements = pForm.elements.length;
		for (var i=0;i<iNbFormElements;i++) {
			var oParam = pForm.elements[i];
			if (oParam.name != undefined) {
				if (oParam.type != "radio" || oParam.checked) {
					sParams += oParam.name + "=" + oParam.value;
					if (i != (iNbFormElements - 1)) {
						sParams += "&";
					}
				}
			}
		}
	}
	return sParams;
}

// Extrait les paramètres d'une url sous la forme
// param1=value1&param2=value2&param3=value3 ...
function getParamsFromUrl(pUrl) {
	var sUrlParams = "";
	if (pUrl) {
		var indexParam = pUrl.indexOf("?");
		if(indexParam != -1){
			sUrlParams = pUrl.substring(indexParam+1, pUrl.length);
		}
	}
	return sUrlParams;
}

/* 
Correctly handle PNG transparency in Win IE 5.5 & 6.
http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.
*/
if ( ie && !ie7 ) {
	for(var i=0; i<document.images.length; i++) {
		iePngFix( document.images[i] );
	}		
}
function iePngFix( oImg ){
    var imgName = oImg.src.toUpperCase();
    if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
    {
       var imgID = (oImg.id) ? "id='" + oImg.id + "' " : ""
       var imgClass = (oImg.className) ? "class='" + oImg.className + "' " : ""
       var imgTitle = (oImg.title) ? "title='" + oImg.title + "' " : "title='" + oImg.alt + "' "
       var imgStyle = "display:inline-block;" + oImg.style.cssText 
       if (oImg.align == "left") imgStyle = "float:left;" + imgStyle
       if (oImg.align == "right") imgStyle = "float:right;" + imgStyle
       if (oImg.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
       var strNewHTML = "<span " + imgID + imgClass + imgTitle
       + " style=\"" + "width:" + oImg.width + "px; height:" + oImg.height + "px;" + imgStyle + ";"
       + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
       + "(src=\'" + oImg.src + "\', sizingMethod='scale');\"></span>" 
       oImg.outerHTML = strNewHTML
       //j = j-1
    }
}
