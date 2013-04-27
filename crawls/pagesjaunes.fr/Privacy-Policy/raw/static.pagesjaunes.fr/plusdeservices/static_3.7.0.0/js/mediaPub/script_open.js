function OpenInfoVille(form) {
	var popup_name = "INFO_VILLE_POPUP";
   form.target = popup_name;
   window.name="main";
   w=window.open("", popup_name, "scrollbars=yes,resizable=no,width=740,height=571");
   w.focus();
   form.submit();
}

function OpenIG( form_name ) {
  w = window.open( "", "PJI_IG", "toolbar=no,menubar=no,location=no,scrollbars=yes,status=yes,resizable=yes,width=510,height=400" );
  w.focus(); // Passage en avant-plan
  //Si le div que l'on cherche est dupliqué, on charge la seconde
  g = document.getElementsByName( form_name );
  var taille = g.length;
  g2 = document.getElementsByName( form_name ).item(taille - 1);
  g2.submit();
}

function OpenEcranImpression(form) {
  w = window.open( "", "RP_ECRAN_PRINT", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=820,height=600");
  w.focus(); // Passage en avant-plan
  //Si le div que l'on cherche est dupliqué, on charge la seconde
  g = document.getElementsByName( form );
  var taille = g.length;
  g2 = document.getElementsByName( form ).item(taille - 1);
  g2.submit();
}

//------------------------------------
// Ouverture d'une page MMS+
function OpenMMS( theURL ) {
  url = ReEncodeURL(theURL);
  if ( curwinname == "pjipub_inscription" ) {   // page PUB
    if ( url.indexOf( "http://" ) == -1 ) url = DocumentBase() + "../../" + url;
    }
  WOpen(url, "PJI_PLANS", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=640,height=480" );
}

//------------------------------------
function WOpen( url, name_c, param ) {
  var nv = navigator.appName + navigator.appVersion;
  var MAC = (nv.indexOf( "Mac" ) != -1);
  var MSIE4=((nv.indexOf( "MSIE 6" ) != -1) || (nv.indexOf( "MSIE 5" ) != -1) || (nv.indexOf( "MSIE 4" ) != -1) || (nv.indexOf( "MSIE 3" ) != -1) || (nv.indexOf( "MSIE 2" ) != -1))
  var Opera = (nv.indexOf( "Opera" ) != -1);
  var NETSCAPE = (nv.indexOf( "Netscape" ) != -1);
  if (curwinname == "pjipub_inscription")
  	if ( (url.indexOf("../../") == -1) && (url.indexOf("http://") == -1))
	  url = "../../" + url;
  w = window.open( url,name_c, param );
  if ( !MSIE4 ) w.focus();
}

//------------------------------------
function ReEncodeURL( url_in ) {
  if ( url_in.indexOf( ".." ) != -1 ) {
	url_in = url_in.replace( /\.\./gi, "%252e%252e" )
	}

  index = url_in.indexOf( "?" )
  if ( index == -1 ) // Pas de paramètre: rien à faire
	return url_in;
  url = url_in.slice( 0, index + 1 );
  params = url_in.slice( index + 1 );

  param_array = params.split( "&" );
  for ( var i = 0 ; i < param_array.length ; i++ ) {
	param = param_array[i];
	name_d = param.slice( 0, param.indexOf( "=" ));
	value = param.slice( param.indexOf( "=" ) + 1 );
	url = url + name_d + "=" + escape( unescape( value )) + "&";
	}
  return url;
}

//------------------------------------
// Ouverture d'une page plan
var URL_PLAN = "";
function OpenPlan(theURL, scrollbars, width, height){
	url = ReEncodeURL(URL_PLAN + theURL);
	if(!scrollbars){
		scrollbars='no';
	}
	if(!width){
		width='640';
	}
	if(!height){
		height='480';
	}
	if(curwinname == "pjipub_inscription"){
		if(url.indexOf("http://") == -1) url = DocumentBase() + "../../" + url;
	}
	WOpen(url, "PJI_PLANS", "toolbar=no,menubar=no,location=no,scrollbars=" + scrollbars + ",resizable=yes,width=" + width + ",height=" + height);
}

//------------------------------------
// Ouverture d'une page photo
function OpenPhoto( theURL ) {
  url = ReEncodeURL(theURL);

  if ( curwinname == "pjipub_inscription" ) {	// page PUB
	if ( url.indexOf( "http://" ) == -1 ) url = DocumentBase() + "../../" + url;
	}

  WOpen(url, "PJI_PLANS", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=640,height=480" );
}

//------------------------------------
// Ouverture d'un site web externe
function OpenWeb( theURL ) {
  WOpen( ReEncodeURL( theURL ), "PJI_WEB", "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,width=630,height=460" );
}

//------------------------------------
// Ouverture d'un site mairie
function OpenMairie( theURL ) {
  WOpen( ReEncodeURL( theURL ), "PJI_MAIRIE", "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,width=630,height=460" );
}

//------------------------------------
// Ouverture d'une page publicitaire (CIP, DiapoFlash, SpotInfo et prochains objets pub)
var curwinname = ""; // pour que la variable soit toujours disponible

function OpenPub( theURL, params) {
  url = ReEncodeURL( theURL );
  params = (params && params != "")? params : "toolbar=no,status=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=670,height=780";
  
  if ( curwinname == "pjipub_inscription" ) {	// page PUB
	if ( url.indexOf( "http://" ) == -1 ) url = DocumentBase() + "../../" + url;
	w = window.open( url, "PJI_PUB", params );
	}
  else if ( curwinname == "inscription" ) {	// page photo/plan
	url = DocumentBase() + "../../" + url;
	WOpen( url, "_blank", params );
	}
  else WOpen( url, "_blank", params );
}

function OpenPopUpMail( theURL, width, height ) {
  url = ReEncodeURL( theURL );
  iWidth = ( "undefined" != typeof(width) && "" != width ) ? width : screen.availWidth;
  iHeight = ( "undefined" != typeof(height) && "" != height  ) ? height : screen.availHeight;  
  params = "toolbar=no,status=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width="+iWidth+",height="+iHeight;
  if ( curwinname == "pjipub_inscription" ) {	// page PUB
	if ( url.indexOf( "http://" ) == -1 ) url = DocumentBase() + "../../" + url;
		w = window.open( url, "PJI_PUB", params );
	}
  else if ( curwinname == "inscription" ) {	// page photo/plan
		url = DocumentBase() + "../../" + url;
		WOpen( url, "PJI_PUB", params );
	}
  else WOpen( url, "PJI_PUB", params );
}

//------------------------------------
// Ouverture de la page des tarifs telecom
function OpenTarif( theURL ) {
  WOpen( ReEncodeURL( theURL ), "PJI_TARIF", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=550,height=400" );
}

//------------------------------------
// Ouverture de la page des tarifs exact telecom
function OpenTarifExact( theURL ) {
  WOpen( ReEncodeURL( theURL ), "PJI_TARIF", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=330,height=170" );
}

//------------------------------------
// Ouverture d'une page de mention obligatoire gratuite (MOG) générique
function OpenMog( template ) {
  theURL = template;
  WOpen( ReEncodeURL( theURL ), "PJI_MOG", "toolbar=no,menubar=no,location=no,scrollbars=auto,resizable=yes,width=225,height=200" );
}

// Ouverture d'une page de mention obligatoire de Domiciliation (MOD) générique
function OpenMod( theURL ) {
  WOpen( ReEncodeURL( theURL ), "PJI_MOD", "toolbar=no,menubar=no,location=no,scrollbars=auto,resizable=yes,width=550,height=295" );
}



//------------------------------------
// Ouverture d'une page de "dossier" (objet éditorial en marge droite des pages réponses)
function PJDossier( url ) {
  WOpen( ReEncodeURL( url ), "PJI_DOSSIER", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=550,height=400" );
}

//------------------------------------
// Ouverture de la page d'envoi de mail
function OpenSAM(params, width, height){
	theURL = params;
	if(!width){
		width='640';
	}
	if(!height){
		height='480';
	}
	WOpen(ReEncodeURL(theURL), "PJI_SAM", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height);
}

//------------------------------------
// Choix d'un élément dans une ambiguïté géo ou un guide géo
function ChoixGeo( code ) {
  document.form1.input_image.value = code;
  document.form1.submit();
  return true;
}

//------------------------------------
// Fonctions pour colorer le fond du libellé de levée d'ambiguïté
var clrOver = "FFED00";
function mOvr( src ) {
  if ( !src.contains( event.fromElement )) {
	src.style.cursor = 'hand';
	src.bgColor = clrOver;
	}
}

function mOut( src ) {
  if ( !src.contains( event.toElement )) {
	src.style.cursor = 'default';
	src.bgColor = "";
	}
}

//------------------------------------
// Les boutons GUIDE sont extraits des <FORM>
// et les guides sont remplacés par un appel à cette fonction qui prend en paramètre le
// nom du bouton guide d'origine et optionnellement le FORM à utiliser
function AppelGuide( id, form ) {
  if ( form == null ) form = document.form;
  form.input_image.value = id;
  form.faire.value = "decode_input_image";
  form.submit();
  return true;
}



//------------------------------------
// Ouverture d'une fenêtre d'alerte avec conseils (pas disponible en mode portail)
function OpenAlerte( form, numero ) {
  lang=form.lang.value;
  if (( lang.toUpperCase() != "FR" ) && ( lang.toUpperCase() != "EN" )) lang = "FR";
  theURL = "pj.cgi?html=popup_alerte.html&num_alerte=" + numero + "&SRV=" + form.srv.value + "&lang=" + lang;
  WOpen( ReEncodeURL( theURL ), "PJI_Alerte", "toolbar=no,menubar=no,location=no,scrollbars=auto,resizable=yes,width=380,height=260" );
}

//------------------------------------
// Ouverture d'une fenêtre d'alerte avec conseils (pas disponible en mode portail)
function OpenAlerte2( form, key, url_alerte,langage, serviceAbbreviation, typeAlerte) {
  if (langage == "") langage="FR";
  else if (( langage.toUpperCase() != "FR" ) && ( langage.toUpperCase() != "EN" )) langage = "FR";
  theURL = url_alerte + "?key_alerte=" + key + "&serviceAbbreviation=" + serviceAbbreviation + "&langage=" + langage+ "&typeAlerte=" + typeAlerte;
  WOpen( ReEncodeURL( theURL ), "PJI_Alerte", "toolbar=no,menubar=no,location=no,scrollbars=auto,resizable=yes,width=380,height=260" );
}


//------------------------------------
// SPECIFIQUE portails: ouverture d'une page "carnet d'adresse"
var URL_CARNET = "";
function OpenCarnet( theURL ) {
  theURL = URL_CARNET + theURL;
  WOpen( ReEncodeURL( theURL ), "PJI_CARNET", "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,width=640,height=480" );
}
function open_aideappel(url_aideappel)
{
	aideappel = open(url_aideappel, 'eStara','width=700,status=no,resizable=yes,toolbar=no,scrollbars=yes,menubar=no,location=no');
	aideappel.focus();
}

//------------------------------------
// Ouverture Popup avec taille donnee
function OpenPopup( theURL, width, height) {
	url = ReEncodeURL( theURL );
	params = "toolbar=no,status=no,menubar=no,location=no,scrollbars=no,resizable=yes,width="+width+",height="+height;
	WOpen( url, "_blank", params );
}
