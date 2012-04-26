/*
 * =============================================================================
 *
 *   PRICE MINISTER APPLICATION
 *   Copyright (c) 2000 Babelstore.
 *   All Rights Reserved.
 *
 *   $Source$
 *   $Revision$
 *   $Date$
 *   $Author$
 *
 * =============================================================================
 */

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                Misc functions
------------------------------------------------------------------------------*/
/**
 * Alias for document.getElementById
 *
 * @param elt Element's id
 */
if ( typeof($) == 'undefined' ) {
  function $(elt) {
    if (typeof(elt) == "string")
      return document.getElementById(elt);
    else return elt;
  }
}

var ie = (navigator.appName=='Microsoft Internet Explorer');

/**
 * @ignore
 */
Function.prototype.bindObj = function() {
  if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
  var __method = this, args = PM.Util.collectionToArray(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, args.concat(PM.Util.collectionToArray(arguments)));
  }
}

/**
 * @ignore
 */
Function.prototype.bindObjWithEvent = function() {
  var __method = this, args = PM.Util.collectionToArray(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [event || window.event].concat(args));
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                     Rollovers
------------------------------------------------------------------------------*/
/* Image swapping */
/**
 * @ignore
 */
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

/**
 * @ignore
 */
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

/**
 * @ignore
 */
function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

/**
 * @ignore
 */
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/**
 * @ignore
 */
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}


/**
 * @namespace Espace de nommage regroupant les fonctions PriceMinister.
 * 
 * @name PM
 */
if ( typeof(PM) == 'undefined' ) var PM = {};

/**
 * Alias pour jQuery
 * à privilégier dans les contenus IG
 */
PM.jq = $j;

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Debug
------------------------------------------------------------------------------*/
/**
 * @namespace Outils de déboggage JavaScript.
 */
PM.Debug = {
  /**
   * Type de debug.
   * <ul>
   *   <li><code>OFF</code> : pas d'affichage</li>
   *   <li><code>DEBUG</code> : affichage seulement en niveau DEBUG</li>
   *   <li><code>INFO</code> : affichage seulement en niveau INFO et DEBUG</li>
   * </ul>
   * 
   * @constant
   */
  Type: {
    OFF:   0,
    INFO:  1,
    DEBUG: 2
  }
}

/**
 * Niveau de débug actuel. Par défaut à OFF, activation via Property priceminister.javascript.debug.activation_level en overload.
 * @field
 */
PM.Debug.level = PM.Debug.Type.OFF;
if (typeof(JsDebugLevel) != "undefined") {
  PM.Debug.level = JsDebugLevel;
}

/**
 * Affiche un message dans la console du navigateur.<br/>
 * Utile pour le déboggage de scripts.<br/>
 * Ne fonctionne que lorsque le niveau de Debug est placé sur HIGH (debug) ou MEDIUM (info) via spot.
 * 
 * @param {String}        message Message à afficher
 * @param {Number|Object} options Options peut être un type de debug (<code>PM.Debug.type.DEBUG</code> ou <code>PM.Debug.type.INFO</code>)
 *                                pour lequel le message s'affichera ou un objet JSON :
 * <ul>
 * <li><code><b>type</b></code> : type de debug pour lequel le message s'affichera : <code>PM.Debug.type.DEBUG</code> ou <code>PM.Debug.type.INFO</code>.</li>
 * </ul>
 */
PM.Debug.log = function(message, options) {
  // si le debug est désactivé ou que la console n'est pas disponible, on ne fait rien
  if(typeof(console) == "undefined" || PM.Debug.level == PM.Debug.Type.OFF) return;
  // type de log
  var logType = PM.Debug.Type.DEBUG;
  if(typeof(options) == "number") {
    logType = options;
  } else if (typeof(options) == "object" && options.logType){
    logType = options.type;
  }
  
  // on teste si le type de debug demandé (logType) est permis par le niveau de debug (level)
  // seul cas à tester : logType = DEBUG et level = INFO ==> on sort de la fonction
  if (logType == PM.Debug.Type.DEBUG && PM.Debug.level == PM.Debug.Type.INFO) return;
  
  if (typeof(firebug) != "undefined") { // firebug lite
    switch(logType) {
      case PM.Debug.Type.INFO:
        firebug.d.console.cmd.info(message);
        break;
      case PM.Debug.Type.DEBUG:
      default:
        firebug.d.console.cmd.debug(message);
        break;
    }
    
    return;
  }
  if (typeof(console) != "undefined") { // firebug, safari
    if (!console.debug) { // console Safari
      window.console.log(message);
    } else { // Firebug
      switch(logType) {
        case PM.Debug.Type.INFO:
          window.console.info(message);
          break;
        case PM.Debug.Type.DEBUG:
        default:
          window.console.debug(message);
          break;
      }
    }
  }
}

PM.Debug.messages = new Array();

/**
 * Enregistre un message sans l'afficher.
 * Voir PM.Debug.log pour les options.
 * Utiliser PM.Debug.displayStack pour afficher les messages stockés
 */
PM.Debug.store = function(message, options) {
  PM.Debug.messages[PM.Debug.messages.length] = [message, options];
}

/**
 * Affiche tous les messages de Debug enregistrés
 */
PM.Debug.displayStack = function() {
  PM.Debug.log("------- Messages -------");
  for (var i = 0; i < PM.Debug.messages.length; i++) {
    PM.Debug.log(PM.Debug.messages[i][0], PM.Debug.messages[i][1]);
  }
}


/**
 * Outil de mesure de temps permettant d'envoyer un tag XiTi si une fonctionnalité met trop de temps à s'éxécuter.
 *
 * @class Outil de mesure de temps permettant d'envoyer un tag XiTi si une fonctionnalité met trop de temps à s'éxécuter.
 * @constructor
 *
 * @param name     {String}  Nom du timer (utilisé dans XiTi)
 * @param treshold {Integer} Durée (en ms) au-delà de laquelle on envoie un tag XiTi (0 par défaut)
 */
PM.Debug.Timer = function(name, treshold) {
  this.time = null;
  this.name = name;
  this.treshold = treshold || 0;
}

/**
 * Démarre le timer
 */
PM.Debug.Timer.prototype.start = function() {
  this.time = (new Date()).getTime();
}

/**
 * Stoppe le timer et envoie un tag XiTi si la durée a dépassé celle spécifiée dans le constructeur
 */
PM.Debug.Timer.prototype.stop = function() {
  if (this.time == null) return;

  var duration = (new Date()).getTime() - this.time;
  this.time = null;

  if (duration > this.treshold) {
    PM.Debug.log('Durée de ' + this.name + ' : ' + duration + 'ms');
    PM.Statistics.tagClick(PM.Statistics.Xtn2.OTHERS, "Timer::" + this.name + "::" + duration, PM.Statistics.Type.ACTION);
  }
}

/**
 * Fonction pour repérer les éléments HTML qui n'ont pas implémenté correctement
 * les classes first_child et last_child sur leurs enfants.
 * Traite les <li> dans les <ul> ou les <ol>, et les <dd> dans les <dl>.
 */
PM.Debug.checkHtml = function() {
  if(PM.Debug.level != PM.Debug.Type.OFF){
    var firstChildClass = "first_child";
    var lastChildClass = "last_child";    
    var badElts = new Array();  
    //pour les listes <ul> et <ol>
    var tabOlAndUl = $j("ul, ol");
    //pour chaque ul ou ol
    for(i=0;i<tabOlAndUl.length;i++){
      var ulOrOl = tabOlAndUl[i];
      var tabLi  = $j(ulOrOl).children("li");
      //pour chaque li dans ce ul ou ol
      for(j = 0 ; j < tabLi.length ; j++ ){
        var li = tabLi[j];
        //si c'est le premier éléments et qu'il n'a pas "first_child"
        //ou si c'est pas le premier élément mais qu'il a "first_child"
        //ou si c'est le dernier élément et qu'il n'a pas "last_child"
        //ou si c'est pas le dernier mais qu'il a "last_child"
        if(j == 0 && !PM.Dom.Class.has(li, firstChildClass)
        || j != 0 &&  PM.Dom.Class.has(li, firstChildClass)
        || j == tabLi.length-1 && !PM.Dom.Class.has(li, lastChildClass)
        || j != tabLi.length-1 &&  PM.Dom.Class.has(li, lastChildClass)){
          badElts.push(ulOrOl);
          break;
        }       
      }
    }
    //pour les listes de définitions <dl>
    var tabDl = $j("dl");
    //pour chaque dl
    for(i=0;i<tabDl.length;i++){
      var dl = tabDl[i];
      var tabDd = $j(dl).children("dd");
      //pour chaque dd dans ce dl
      for(j = 0 ; j < tabDd.length ; j++ ){
        var dd = tabDd[j];
        if(j == 0 && !PM.Dom.Class.has(dd, firstChildClass)
        || j != 0 &&  PM.Dom.Class.has(dd, firstChildClass)
        || j == tabDd.length-1 && !PM.Dom.Class.has(dd, lastChildClass)
        || j != tabDd.length-1 &&  PM.Dom.Class.has(dd, lastChildClass)){
          badElts.push(dl);
          break;
        }       
      }
    }     
    PM.Debug.log(badElts.length + " élément(s) n'implémentent pas correctement les classes .first_child et .last_child");
    $j(badElts).css("border", "2px solid red").css("background-color", "yellow");
    return badElts;
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                    PM.Context
------------------------------------------------------------------------------*/
/**
 * @namespace Contexte global JavaScript et outils associés.
 * 
 * @name PM.Context
 */
if ( typeof(PM.Context) == 'undefined' ) PM.Context = {};

/**
 * Retourne l'ensemble des critères formatées
 */
PM.Context.getFormattedCriterias = function() {
  var criterias = "";
  for (key in PM.Context.data) {
    var elt = PM.Context.data[key];
    // si c'est un critère, on l'ajoute à la liste
    if (typeof(elt.criteria) != "undefined") {
      criterias += key + "=" + elt.value + ";";
    }
  }

  return criterias;
}

/**
 * Retourne la valeur d'une donnée du contexte
 * 
 * @param key     {String}  Nom de la donnée
 */
PM.Context.get = function(key) {
  var value;
  if(typeof(PM.Context.data) != 'undefined' 
  && typeof(PM.Context.data[key]) != 'undefined') {
    value = PM.Util.tryToEvalString(PM.Context.data[key].value);
  }
  else {
    value = "";
  }
  return value;
}

/**
 * Ecrit une donnée contexte en utilisant document.write();
 */
PM.Context.write = function(key){
  document.write(PM.Context.get(key));
}

/**
 * Ajoute une donnée au contexte
 * 
 * @param key        {String}  Nom de la donnée
 * @param dataValue  {String}  Valeur de la donnée
 * @param isCriteria {boolean} Si la donnée est un critère. false par défaut.
 */
PM.Context.put = function(key, dataValue, isCriteria) {
  isCriteria = (typeof(isCriteria) == "boolean") ? isCriteria : false;
  PM.Context.data[key] = {"value" : dataValue, "criteria": isCriteria};
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.JSON
------------------------------------------------------------------------------*/
/**
 * @namespace Outils pour utiliser les objets JSON
 */
PM.JSON =  {}

/**
 * Crée un Objet JSON à partir d'une chaine de caractères.<br/>Si la création est impossible, alors retourne null.
 */
PM.JSON.fromString = function(jsonString) {
  try {
    eval("var jsonObj = " + jsonString);
  }
  catch(e) {
    PM.Debug.log(["Erreur lors du parsing JSON", e]);
    return null
  }

  return jsonObj;
}

/**
 * Concatène 2 JSON entre eux et retourne le résultat
 *
 * @return Objet JSON contenant les 2 JSON passés en paramètre.
 */
PM.JSON.concat = function(json1, json2) {
  for (var key in json2) {
   json1[key] = json2[key];
  }
  return json1;
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Util
------------------------------------------------------------------------------*/
/**
 * @namespace Fourre-tout des fonctions utiles PriceMinister <code>(Doc à revoir)</code>.
 */
PM.Util = {}

/**
 * Teste si la variable passée en paramètre est au format Json
 */
PM.Util.isJson = function(str) {
  if (trim(str) == '') return false;
  str = str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
  return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
 }

/** 
 * Form input triming
 * Removes spaces and tabs at the begin and the end of the string
 * 
 * @param s string to trim
 * @base PM.Util
 */
PM.Util.trim = function(s) {
  if(s == null)
    return '';
  return s.replace(/(^\s+)|(\s+$)/g,"");
}

/** 
 * Form input triming
 * Removes spaces and tabs at the begin and the end of the string
 * and removes duplicates spaces and tabs in the string
 * 
 * @param s string to trim
 * @base PM.Util
 */
PM.Util.trimStrongly = function(s) {
  if(s == null)
    return '';
  var encodedHtml = PM.LinkTool.URLRemoveSpecialCaracters(s);
  return PM.Util.trim(encodedHtml.replace(/(\s+)/g, " "));
}

PM.Util.deleteWhiteChar = function(s) {
  var result = "";
  var clist = s.split("");
  var c;
  for(var i = 0 ; i < clist.length ; i++){
      c = clist[i];
      if(c != ' ') result += c;
  }
  return result;
}

/**
 * remove specials characters
 */
PM.Util.alphaNumOnly = function(term) {
  return term.replace(/[^a-z0-9 ]/g, " ");
}

/**
 * remove specials characters and letters
 */
PM.Util.numOnly = function(term) {
  return term.replace(/[^0-9 ]/g, "");
}

/**
 * remove accents on a word
 */
PM.Util.removeAccents = function(term) {
  
  term=term.replace(/[àáâãäåæ]/g,"a");
  term=term.replace(/[ÁÀÂÄÃÆÅ]/g,"A");
  term=term.replace(/[ç]/g,"c");
  term=term.replace(/[Ç]/g,"C");
  term=term.replace(/[ð]/g,"d");
  term=term.replace(/[éèêë]/g,"e");
  term=term.replace(/[ÉÈËÊ]/g,"E");
  term=term.replace(/[ìíîï]/g,"i");
  term=term.replace(/[ÍÌÎÏ]/g,"I");
  term=term.replace(/[ñ]/g,"n");
  term=term.replace(/[Ñ]/g,"N");
  term=term.replace(/[ðòóôõöø]/g,"o");
  term=term.replace(/[ÓÔÖØÕÒ]/g,"O");
  term=term.replace(/[ß]/g,"ss");
  term=term.replace(/[ùúûü]/g,"u");
  term=term.replace(/[ÚÙÛÜ]/g,"U");
  term=term.replace(/[ýÿ]/g,"y");
  term=term.replace(/[Ý]/g,"Y");
  return term;
  
}

/**
 * Supprime les tags HTML d'une chaine de caractères.
 *
 * @param {String} text la chaine de caractère à nettoyer.
 *
 * @return {String} la chaine de caractère nettoyée de ses tags HTML.
 *
 * @see TextCleaner#removeHtmlTags (en java)
 */
PM.Util.removeHtmlTags = function(text) {
  return text.replace(/<[^>]*>/g, "").replace(/<|>/g, "");
}

/**
 * Concat arguments given as parameters
 *
 * @return concatenated arguments
 */
PM.Util.concat = function() {
  var s = '';
  for (i = 0; i < arguments.length; i++) {
    if (arguments[i]) s = s + arguments[i];
  }
  return s;
}


/**
 * Transforme une chaine de caractère en expression régulière matchant exactement cette chaine de caractères.
 * Echappe tous les caractères spéciaux des expressions régulière dans la chaine de caractères.
 *
 * @param {String} s la chaine de caractère à transformer
 *
 * @return {String] l'expression régulière matchant exactement la chaine donnée en paramètre.
 */

PM.Util.string2Regexp = function(s) {
  var regexp = s;
  regexp = regexp.replace(/([$^[\].\\(){}?*+|-])/g, '\\$1');
  return regexp;
}

/**
 * Textarea maxlength checking (return characters left counter)
 * For usage refer to .../display/back/FrontProductUpdate.jsp
 *
 * @param mytextarea text area to check
 * @param maxLength  maximum length value
 */
PM.Util.checkMaxInput = function(mytextarea, maxLength) {
  if (mytextarea.value.length > maxLength) { // if too long.... trim it!
    mytextarea.value = mytextarea.value.substring(0, maxLength);
    return 0;
  }

  // otherwise, return 'characters left' counter
  return (maxLength - mytextarea.value.length);
}


/**
 * Checks if max length is reached in a field.
 * Alert user if so, return true otherwise
 *
 * @param name   Field name
 * @param field  Field object to test
 * @param length Max length before alert
 */
PM.Util.checkLength = function(name, field, length) {
  if (field.value.length > length) {
    var alertString = PM.Util.variablesReplace(PM.Constants.Translation.js_check_length, [["name", name], ["maxLength", length], ["length", field.value.length]]);
    alert(alertString);
    field.focus();
    return false;
  }
  return true;
}


/**
 * Checks if the given filename has the correct extension
 *
 * @param fileName Input file name
 * @param ext      Extension filename should have
 *
 * @return true if extension is correct, false otherwise
 */
PM.Util.checkFileExtension = function(fileName, ext) {
  var fileExtension;
  if (fileName.length < ext.length) { // if file name is shorter than extension length, not good
      fileExtension = "";
  }
  else {
    fileExtension = fileName.substring(fileName.length-ext.length, fileName.length);
  }

  return fileExtension.toLowerCase() == ext.toLowerCase();
}


/**
 * Calculates the absolute position of an element
 *
 * @param elt HTML element
 * 
 * @return absolute position
 */
PM.Util.absolutePosition = function(elt) {
  var valueT = 0, valueL = 0;
  do {
    valueT += elt.offsetTop  || 0;
    valueL += elt.offsetLeft || 0;
    elt = elt.offsetParent;
  } while (elt);
  return [valueL, valueT];
}

/**
 * Récupère le scroll dans la page
 * 
 * @return {JSON} Valeur du scroll dans la page (sous la forme {x: 0, y: 10})
 */
PM.Util.getPageScroll = function() {
  var deltaX =  window.pageXOffset
    || document.documentElement.scrollLeft
    || document.body.scrollLeft
    || 0;
  var deltaY =  window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0;
  return {x: deltaX, y: deltaY};
}

/**
 * Récupère les dimensions de la fenêtre
 * 
 * @return {JSON} Dimensions de la fenêtre (sous la forme {w: 800, h: 600})
 */
PM.Util.getWindowSize = function() {
  var winW = winH = 0;
  if (self.innerHeight) {
   winW = self.innerWidth;
   winH = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) {
   winW = document.documentElement.clientWidth;
   winH = document.documentElement.clientHeight;
  } else
  if (document.body) {
   winW = document.body.clientWidth;
   winH = document.body.clientHeight;
  }
  return {w: winW, h: winH};
}

/**
 * Récupère les dimensions de l'objet
 * 
 * @return {JSON} Dimensions de l'objet (sous la forme {w: 800, h: 600})
 */
PM.Util.getElementSize = function(elt) {
  return {w: $j(elt).width(), h: $j(elt).height()};
}

/**
 * Add an event (unobtrusive way)
 *
 * @param obj    Object to add event to (ie. window)
 * @param evType Event Type (ie. load)
 * @param fn     Function to call
 * 
 * @See PM.Event.add
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
PM.Util.addEvent = function(obj, evType, fn){
  PM.Statistics.deprecatedFunctions("PM.Util.addEvent");
  PM.Event.add(obj, evType, fn);
}


/**
 * Add a page to bookmarks
 */
PM.Util.addBookmark = function() {
  var title = window.document.title;
  var url = window.location.href;
  if (navigator.appName != 'Microsoft Internet Explorer')
    window.sidebar.addPanel(title,url,"");
  else window.external.AddFavorite(url,title);
}

/**
 * Set page as homepage (ie only)
 */
PM.Util.setHomePage = function(elt,message) {
  if (ie) {
    elt.style.behavior = 'url(#default#homepage)';
    elt.setHomePage(window.location.href);
  } else {
    alert(message);
  }
}

/**
 * Récupère simplement un éventuel paramètre passé sous la forme #param=...
 * 
 * @param     paramName Nom du paramètre à rechercher
 * @returns   {string} Valeur du paramètre (si trouvé), null sinon
 */
 
PM.Util.getSimpleSharpUrlParam = function(paramName) {
  var regexD = new RegExp("[\\#&]"+paramName+"=([^&]*)");
  var resultsD = regexD.exec(window.location.href);
  if( resultsD != null) return resultsD[1];
  return null;
}

/**
 * Permit to get an url parameter after ?
 */
PM.Util.getInterrogationUrlParam = function(regName) {
  var regexND = "[\\?&](" + regName + ")=([^&#]*)";
  var regexND = new RegExp(regexND);
  var resultsND = regexND.exec(window.location.href);
  if(resultsND != null)
    return resultsND[2];
}

/**
 * Manage element focus
 * Called when loading the page
 */
PM.Util.whichFocus = null; // store the element having the focus
PM.Util.defaultFocus = null;

PM.Util.manageFocus = function() {
  var f = document.forms;

  PM.Util.whichFocus = PM.Util.defaultFocus;
    
  for (i=0; i < f.length; i++) {
    for (j = 0; j < f[i].elements.length; j++) {
      PM.Event.add(f[i].elements[j], "focus", function(evt) { var newTarget = evt["target"] ? evt["target"] : evt["srcElement"]; if(newTarget.tagName) { PM.Util.whichFocus= newTarget; } });
    }
  }
}

/**
 * Get navigator language
 */
PM.Util.getNavigatorLanguage = function() {
  var lct="fr";
  if (navigator.systemLanguage) {
    lct=navigator.systemLanguage.toLowerCase().substring(0, 2);
  } else if (navigator.language) {
    lct=navigator.language.toLowerCase().substring(0, 2);
  } else if (navigator.userLanguage) {
    lct=navigator.userLanguage.toLowerCase().substring(0, 2);
  } else if (navigator.userAgent.indexOf("[")!=-1) {
    var debut=navigator.userAgent.indexOf("[");
    var fin=navigator.userAgent.indexOf("]");
    lct=navigator.userAgent.substring(debut+1, fin).toLowerCase();
  }
  return lct;
}

/**
 * Get the option index from a value
 */
PM.Util.getOptionIndexFromValue = function(optionList, optionValue) {
  for (i = 0; i< optionList.length; i++) {
    if (optionList.options[i].value == optionValue) {
      return i;
    }
  }
}

/**
 * Remplace une variable de la forme {{var_name}} dans une chaine de caractères
 * 
 * @param  {String}  text     Chaine dans laquelle rechercher
 * @param  {String}  sSearch  Nom de la variable à rechercher
 * @param  {String}  sReplace Valeur de remplacement
 * @param  {boolean} noBrace  Remplacement simple de la variable (sans utiliser d'accolades). Valeur 'false' par défaut (on recherche avec les accolades)
 *
 * @returns Chaine avec la variable remplacée.
 */
PM.Util.variableReplace = function(text, sSearch, sReplace, noBrace) {
  var maReg = (noBrace)? new RegExp( sSearch, "ig"): new RegExp( "{{" + sSearch + "}}", "ig");
  return text.replace( maReg, sReplace );
}

/**
 * Remplace plusieurs variables de la forme {{var_name}} dans une chaine de caractères
 * 
 * @param  {String}  text             Chaine dans laquelle rechercher
 * @param  {Array}   searchAndReplace Tableau contenant le nom des variables à remplacer et les chaines de remplacement sous la forme :
 *                                    [["search", "replaceStr"],["search2", "replaceStr2"]]
 * @param  {boolean} noBrace  Remplacement simple de la variable (sans utiliser d'accolades). Valeur 'false' par défaut (on recherche avec les accolades)
 *
 * @returns Chaine avec les variables remplacées.
 */
PM.Util.variablesReplace = function(text, searchAndReplace, noBrace) {
  for (i = 0; i < searchAndReplace.length; i++) {
    text = PM.Util.variableReplace(text, searchAndReplace[i][0], searchAndReplace[i][1], noBrace);
  }
  return text;
}

/**
 * Get target element from event
 * Differs depending of the browser
 *
 * @param evt Event object
 *
 * @returns Target element
 */
PM.Util.getElementFromEvent = function(evt) {
  var elt = null;

  if (document.all) { // IE case
    elt = window.event.srcElement;
  } else {
    elt = evt.target;
  }

  return elt;
}


/**
 * Transform a collection into an array
 * Useful to concatenate getElementsByTagName collections
 *
 * @param col Collection to transform into an array
 *
 * @return Result array
 */
PM.Util.collectionToArray = function(col) {
  var a = new Array();
  for (var i = 0; i < col.length; i++)
    a[a.length] = col[i];
  return a;
}

/**
 * Insert un objet dans un tableau à un index donné.
 * 
 * @param array - Tableau dans lequel on souhaite insérer un objet
 * @param object - Objet à insérer
 * @param index - Index auquel on souhaite insérer l'objet dans le tablea. 
 *                Paramètre facultatif. Si non renseigné, l'objet sera inséré à la fin du tableau
 */
PM.Util.insertIntoArray = function(array, object, index) {
  index = index != null ? index : array.length;
  for (var j = array.length ; j > index ; j--) {
    array[j] = array[j-1];
  }
  array[index] = object;
}

/**
 * Disable the event default behavior.
 * Useful for stopping a click on a <a> element to follow the anchor, for example
 */
PM.Util.preventDefault = function(event) {
  // little trick so the anchor is not followed
  if (event.preventDefault)
    event.preventDefault();
  event.returnValue = false;
}

/**
 * Exécute l'action passée en paramètre si l'URL contient l'ancre avec la valeur souhaitée
 *
 * @param anchor {String|Array}    La ou les ancre(s) à détecter.<br/>Peut être une chaine de caractères ou un tableau de chaines de caractères
 * @param value  {String|'*'|null} Valeur que doit avoir l'ancre.<br/>Null signifie que l'anncre n'a pas de valeur (ancre normal), '*' qu'elle peut prendre n'importe quelle valeur.
 * @param action {Function}        L'action à exécuter si l'ancre a été trouvée. L'action est appelée avec en paramètre la valeur de l'ancre (si elle existe)
 */
PM.Util.handleAnchor = function(anchor, value, actionFct) {
  if (typeof(anchor) == "object") anchor = anchor.join("|");
  
  var regexText = "[\\#&](" + anchor + ")";
  if (value) regexText += "=([^&]*)(?:$|&)";
    else regexText += "(?:$|&|=)";
  
  var regexD = new RegExp(regexText);
  var resultsD = regexD.exec(window.location.href);
  if(resultsD != null) {
    if (!value || value == "*" || value == resultsD[2]) {
      actionFct.call(null, resultsD[2]);
    }
  }
}

/**
 * Exécute l'action passée en paramètre si l'URL contient le paramètre avec la valeur souhaitée
 *
 * @param param  {String|Array}    Le ou les paramètre(s) à détecter.<br/>Peut être une chaine de caractères ou un tableau de chaines de caractères
 * @param value  {String|'*'|null} Valeur que doit avoir le paramètre.<br/>Null signifie que le paramètre n'a pas de valeur, '*' qu'il peut prendre n'importe quelle valeur.
 * @param action {Function}        L'action à exécuter si le paramètre a été trouvée. L'action est appelée avec en paramètre la valeur du paramètre (si elle existe)
 */
PM.Util.handleParam = function(param, value, actionFct) {
  if (typeof(param) == "object") param = param.join("|");
  param += "|" + param.replace(/_/g, ""); // Pour gérer la suppression des '_' par l'application

  var regexText = "[\\?&](" + param + ")";
  if (value) {
    regexText += "=([^&#]*)(?:$|&|#)"; 
  }
  else {
    regexText += "(?:$|&|=|#)";
  }
  var regexD = new RegExp(regexText);
  var resultsD = regexD.exec(window.location.href);
  if(resultsD != null) {
    if (!value || value == "*" || value == resultsD[2]) {
      actionFct.call(null, resultsD[2]);
    }
  }
}

/**
 * Evalue un contenu en JS
 * 
 * @param content string to evaluate
 * @base PM.Util
 */
PM.Util.evalScript = function(content) {
  var scriptRegExp = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
  var matchAll = new RegExp(scriptRegExp, 'ig');
  var scriptsArray = content.match(matchAll);
  if(scriptsArray) {
    for(var i = 0; i < scriptsArray.length; i++) {
        try{
          var matchOne = new RegExp(scriptRegExp, 'i');
          var scriptContent = scriptsArray[i].match(matchOne);
          if(scriptContent) {
            eval(scriptContent[1]);
          }
      }catch(e){
        PM.Debug.log("Erreur dans le script : " + scriptContent[1] + "\n Nature de l'erreur: " + e.toString());
      }
    }
  }
}

/**
 * Evalue une string, la retourne sinon
 * 
 * @param content string to evaluate
 * @base PM.Util
 */
PM.Util.tryToEvalString= function(content) {
  try {
    var evalContent = eval(content);
    return (typeof(evalContent) != "undefined") ? evalContent : content;
  }
  catch (e){
    return content;
  }
}

/**
 * Permet de récupérer une option dans un objet options (utilisé pour les paramètres facultatifs des méthodes).
 * <p>
 * Si l'option n'est pas définie, on retourne la valeur par défaut
 */
PM.Util.getOption = function(options, name, defaultValue) {
  if (options && typeof(options[name]) != "undefined") return options[name];
  
  return defaultValue;
}

/**
 * Permet d'ajouter une option dans un objet options.
 * @param options         {Object} l'objet auquel on souhaite ajouter une option
 * @param name            {String} le nom de l'option
 * @param value           {String} la valeur de l'option
 * @param replaceIfExists {boolean} si on la positionne à true, on écrase l'option si elle exite déjà 
 * <p>
 * @return l'objet avec l'option ajoutée
 */
PM.Util.setOption = function(options, name, value, replaceIfExists) {
  if (options) {
    if(typeof(options[name]) != "undefined") {
      options[name] = value;
    }
    else if(replaceIfExists) {
      options[name] = value;
    }
  }
  return options;
}

/**
 * Permet de savoir si un objet est une liste. 
 * On peut accéder à ses éléments comme avec un array: <code>obj[n]</code>
 * @param obj l'objet à vérifier
 * <p>
 * @return true si l'objet est un array ou une collection, sinon false
 */
PM.Util.isArrayOrCollection = function(obj) {
  return PM.Util.isArray(obj) || PM.Util.isCollection(obj);
}

/**
 * Permet de savoir si un objet est un array.
 * @param obj l'objet à vérifier
 * <p>
 * @return true si l'objet est un array, sinon false
 */
PM.Util.isArray = function(obj) {
  return obj && obj.constructor == Array;
}

/**
 * Permet de savoir si un objet est une collection. 
 * Malheureusement on ne connait pas un test plus explicite que de vérifier l'existance des méthodes spécifiques...
 * @param obj l'objet à vérifier
 * <p>
 * @return true si l'objet est une collection, sinon false
 */
PM.Util.isCollection = function(obj) {
  return obj && obj.constructor == Object && typeof(obj.add) == 'function' && typeof(obj.remove) == 'function' && typeof(obj.length) == 'number';
}

/**
 * Permet de savoir si un objet est contenu dans un tableau
 * Attention utilise une comparaison stricte.
 * @param tab le tableau à parcourir
 * @param obj l'objet à rechercher
 * <p>
 * @return true si l'objet est dans le tableau, false sinon
 */
PM.Util.arrayContains = function(tab, obj){
  for(var i = 0; i<tab.length; i++) {
    if(tab[i] === obj){
      return true;
    }
  }
  return false;
}

/**
 * Transforme une array ou un objet JSON en parametres pour une URL
 * exemple : {param1:"foo", param2:bar} ---> param1=foo&param2=bar
 */
PM.Util.arrayToParam = function(array) {
  var result = "";
  $j.each(array, function(key, val) {
    if(val && "null" != val){
      result += key + "=" + val + "&";
    }
  });
  return result;
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.Util.trim
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function trim(s) {
  PM.Statistics.deprecatedFunctions("trim");
  return PM.Util.trim(s);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.Util.checkMaxInput
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function checkMaxInput(mytextarea, maxLen) {
  PM.Statistics.deprecatedFunctions("checkMaxInput");
  return PM.Util.checkMaxInput(mytextarea, maxLen);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.Util.checkFileExtension
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function checkFileExtension(sFileName, sExtension_) {
  PM.Statistics.deprecatedFunctions("checkFileExtension");
  return PM.Util.checkFileExtension(sFileName, sExtension_);
}

/* END : Kept for backward compatibility */



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Numbers
------------------------------------------------------------------------------*/

/**
 * @namespace Fonctions utilitaires pour les nombres (formattage, ...).
 */
PM.Numbers = {}

/** 
 * Ajoute un séparateur de millier au nombre passé en argument
 * 
 * @param nb - nombre à formatter
 * @base PM.Numbers
 */
PM.Numbers.addThousandsSeparator = function(nb) {
  nb += '';
  var formattedNumber = nb.substring(nb.length - 3, nb.length);
  for (var i = (nb.length -3) ; i > 0 ; i -= 3) {
    formattedNumber = nb.substring(i - 3, i) + PM.Constants.Price.thousandsSeparator + formattedNumber;
  }
  return formattedNumber;
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Event
------------------------------------------------------------------------------*/
/**
 * Permet de gérer les évenements PM
 * 
 * @namespace Event
 */
PM.Event = {
  methods: {}, // méthodes à appeler lors des différents événements

  Type: {
    BEGIN:          "evtBegin", // la page n'est pas chargée - début
    INIT:           "evtInit", // avant les tags de bas de page
    PRE_STATISTICS: "evtPreStatistics", // juste avant l'initialisation XiTi (quand les variables sont déjà settées)
    STATISTICS:     "evtStatistics", // après l'initialisation XiTi
    COMPLETE:       "evtComplete", // la page est entièrement chargée
    
    REDRAW:         "evtRedraw" // la page est redimensionnée, ou un élément bouge dans la page. Ne modifie pas le status.
  }
}

/**
 * Indique le status de chargement de la page
 * @field
 */
PM.Event.status = [PM.Event.Type.BEGIN];

/**
 * Indique si l'événement a été atteint
 * 
 * @return {boolean} Si l'événement a été atteint ou non
 */
PM.Event.hasReached = function(event) {
  return new RegExp(event, "i").test(PM.Event.status.toString());
}

/**
 * Retourne le dernier status passé (status courant de la page)
 * 
 * @return {PM.Event.Type} Status de la page
 */
PM.Event.getCurrentStatus = function() {
  return PM.Event.status[PM.Event.status.length-1];
}

/**
 * Ajoute un évenment (voie qui n'obstrue pas)
 *
 * @param obj Objet sur lequel on ajoute l'évenement (ie. window), ou une liste d'objets.
 * @param evType 
 *   <p>Type d'évenement (ie. load)
 *   <p>si cet évènement est <b>init</b> alors il faudra faire passer deux méthodes
 *   <ul>
 *     <li>une normale, qui sera appellée avant les tags XITI ou autres</li>
 *     <li>une finale, qui sera appellée à la fin du chargement de la page</li>
 *   </ul>
 * @param fn Function à appeller
 * @param preventDefault Est-ce que l'on veut que l'évenement ne soit pas exécuté
 */
PM.Event.add = function(obj, evType, fn, preventDefault){
  // Si on passe une liste d'objets en argument, on appelle chaque objet séparément
  if(PM.Util.isArrayOrCollection(obj)) {
    for (var n=0; n<obj.length; n++) {
      PM.Event.add(obj[n], evType, fn, preventDefault);
    }
    return;
  }

  PM.Debug.store(["Ajout d'un événement", arguments], PM.Debug.Type.INFO); // log de l'ajout d'événement
  
  // Cas particulier d'un événement PM, on enregistre l'événement dans un tableau
  if (evType == PM.Event.Type.INIT || evType == PM.Event.Type.STATISTICS || evType == PM.Event.Type.COMPLETE || evType == PM.Event.Type.REDRAW) {
    // si le tableau n'existe pas, on le crée
    if (!PM.Event.methods[evType]) PM.Event.methods[evType] = new Array();
    PM.Event.methods[evType][PM.Event.methods[evType].length] = fn;
  }
  else {
    tempObj = $(obj); // sécurisation = on récupère un seul événement
    if (!tempObj) {
      PM.Debug.log(["[Erreur] : Ajout d'événement sur un objet n'existant pas (" + obj + ")", arguments], PM.Debug.Type.DEBUG);
      return false; // l'objet n'existe pas
    }
    if (tempObj.addEventListener){
      if (evType != "mouseleave") {
        if (preventDefault) tempObj.addEventListener(evType, function(e) { PM.Util.preventDefault(e); }, false);
        tempObj.addEventListener(evType, fn, false);
      } else {
        tempObj.addEventListener("mouseout", function(evt) {
          if (!PM.Dom.withinElement(evt.relatedTarget, this.obj)) {
            fn.call(null, evt);
          }
        }.bindObj({obj: tempObj}), false);
      }
      return true; 
    } else if (tempObj.attachEvent){
      if (preventDefault) tempObj.attachEvent("on"+evType, function(e) { PM.Util.preventDefault(e); })
      var r = tempObj.attachEvent("on"+evType, fn); 
      return r; 
    } else { 
      return false; 
    }
  }
}

/**
 * Remove an event
 *
 * @param obj    Object to remove event from (ie. window)
 * @param evType Event Type (ie. load)
 * @param fn     Function called
 */
PM.Event.remove = function(obj, evType, fn){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, false);
    return true; 
  } else if (obj.detachEvent){ 
    var r = obj.detachEvent("on"+evType, fn);
    return r; 
  } else {
    return false;
  } 
}

/**
 * Cette méthode est appelée lorsqu'un événement est terminé (ex : après le chargement XiTi, après le chargement de la page mais avant les pubs...)
 */
PM.Event.eventReached = function(evtType) {
  //Parcourt le tableau des méthodes à appeler pour les exécuter
  if (PM.Event.methods[evtType]) {
    for(var i=0; i<PM.Event.methods[evtType].length; i++) {
      fn = PM.Event.methods[evtType][i];
      fn.call();
    }
  }
  
  if (evtType != PM.Event.Type.REDRAW) PM.Event.status.push(evtType);
}

PM.Event.add(window, "load", PM.Event.eventReached.bindObj(null, PM.Event.Type.COMPLETE)); // événement au chargement de la page
PM.Event.add(window, "resize", PM.Event.eventReached.bindObj(null, PM.Event.Type.REDRAW)); // au redimensionnement de la fenêtre

/**
 * Déclenche la fonction callback quand l'utilisteur arrive au niveau de l'élément ciblé en scrollant.
 * targetElt: Elément ciblé dont la distance au haut de la page sera utilisé pour déterminer à quel moment lancer la fonctino callback
 * callbackFunction: fonction appelée lorsque la cible est atteinte
 * deltaPx: distance en pixel permettant d'ajuster le déclenchement un peu plus haut ou plus bas que l'element ciblé (peut être négatif)
 * exemple d'utilisation dans navigationcartridge.js
 */
PM.Event.scrollToTarget = function(targetElt, callbackFunction, deltaPx){
  var targetBoxReached = false;
  var doCalculate = true;
  var targetBoxLoadStarter = PM.Util.absolutePosition(targetElt)[1];
  var pageHeight = document.documentElement.clientHeight;

  var scrollPosition = PM.Util.getPageScroll().y;

  if(scrollPosition + pageHeight > targetBoxLoadStarter + deltaPx) {
    callbackFunction.call();
  } else {
    PM.Event.add(window, "scroll",  function(){
      if (targetBoxReached == false) {
        setTimeout(function() {
          if (!doCalculate) {
            doCalculate = true;
          }
        }, 20);

        if (doCalculate) {
          doCalculate = false;
          scrollPosition = PM.Util.getPageScroll().y;
          if (scrollPosition + pageHeight > targetBoxLoadStarter + deltaPx) {
            targetBoxReached = true;
            callbackFunction.call();
          }
        }
      }
    });
  }
}
/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                         PM.UI
------------------------------------------------------------------------------*/
/**
 * @namespace Outil de l'interface utilisateur.
 */
PM.UI = {}

var shownClass = "ui-shown";
var hiddenClass = "ui-hidden";

/**
 * Affiche un ou plusieur éléments
 * @param element {DOM element} l'élément ou un tableau d'éléments à afficher
 * @param options Options
 * <ul>
 *   <li><code><b>changeDisplayStyle</b> (true)</code> : Doit-on changer le style de l'élément</li>
 *   <li><code><b>display</b> (block)</code> : display à appliquer si changeDisplayStyle = false</li>
 * </ul>
 */
PM.UI.show = function(element, options) {
  var displayStyle = PM.Util.getOption(options, "display", "block");
  var changeDisplayStyle = PM.Util.getOption(options, "changeDisplayStyle", true); 
  // element est-il un tableau ?
  if (PM.Util.isArrayOrCollection(element)) {
    for(var i=0; i<element.length; i++) {
      if (changeDisplayStyle){
        PM.UI.changeDisplayStyle(element[i], displayStyle);
      }
      
      // On enlève la classe hidden si elle existe et on rajoute la classe d'affichage
      PM.Dom.Class.remove(element[i],shownClass);
      PM.Dom.Class.remove(element[i],hiddenClass);
      PM.Dom.Class.add(element[i],shownClass);
    }
  }
  else {
    if (changeDisplayStyle){
      PM.UI.changeDisplayStyle(element, displayStyle);
    }
    // On enlève la classe hidden si elle existe et on rajoute la classe d'affichage
    PM.Dom.Class.remove(element,shownClass);
    PM.Dom.Class.remove(element,hiddenClass);
    PM.Dom.Class.add(element,shownClass);
  }

}

/**
 * Masque un ou plusieur éléments
 * @param element {DOM element} l'élément ou un tableau d'éléments à masquer
 *  * @param options Options
 * <ul>
 *   <li><code><b>changeDisplayStyle</b> (true)</code> : Doit-on changer le style de l'élément</li>
 * </ul>
 */
PM.UI.hide = function(element, options) {
  var changeDisplayStyle = PM.Util.getOption(options, "changeDisplayStyle", true);
  // element est-il un tableau ?
  if (PM.Util.isArrayOrCollection(element)) {
    for(var i=0; i<element.length; i++) {
      if (changeDisplayStyle) {
        PM.UI.changeDisplayStyle(element[i], "none");
      }
      // On enlève la classe shown si elle existe et on rajoute la classe hidden
      PM.Dom.Class.remove(element[i],shownClass);
      PM.Dom.Class.remove(element[i],hiddenClass); 
      PM.Dom.Class.add(element[i],hiddenClass);
    }
  }
  else {
    if (changeDisplayStyle) {
      PM.UI.changeDisplayStyle(element, "none");
    }
    // On enlève la classe shown si elle existe et on rajoute la classe hidden
    PM.Dom.Class.remove(element,shownClass);
    PM.Dom.Class.remove(element,hiddenClass); 
    PM.Dom.Class.add(element,hiddenClass);
  }
}

/**
 * Met à jour le titre de la page courante en lui ajoutannt la string avant le titre actuel
 * @param prefix {String} le préfixe à ajouter au title actuel
 */
PM.UI.prefixTitle = function(prefix) {
  var actualTitle = window.document.title;
  window.document.title = prefix+actualTitle;
}

/**
 * Change le style display d'un élément
 * @param element {DOM element} l'élément à modifier
 */
PM.UI.changeDisplayStyle = function(element, displayStyle) {
  element = $(element);
  element.style.display = displayStyle;
}

/**
 * Scrolle la fenêtre jusqu'à une position
 * @param elt {String|DOM element} identifiant ou élément jusqu'auquel on souhaite scroller
 */
PM.UI.scrollTo = function(elt) {
  var elt = $(elt);
  if (!elt) return;
  var pos = PM.Util.absolutePosition(elt);
  if (pos[1] <= 0) {
    var timer = setTimeout("PM.UI.scrollTo()",100);
    return;
  }
  window.scrollTo(0, pos[1]);
}

/**
 * Initie un scroll "doux" vers une ancre
 * 
 * @class Permet un scroll "doux" vers une ancre (identifiée par un id ou un élément DOM).<br/>
 * Le scroll est effectué de manière logarithmique.<br/>
 * Il faudrait ajouter deux options, pour gérer la vitesse (20 par défaut) et pouvoir scroller de manière linéaire.
 * @constructor
 * 
 * @param elt {id|DOM element} Élement vers lequel scroller
 */
PM.UI.SmoothScroll = function(elt) {  
  this.elt = $(elt);
  this.speed = 10;
  this.offsetTop = PM.Util.getPageScroll().y; // position du scroll dans la page
   
  this.interval = setInterval(this.render.bindObj(this), 10);
}

/**
 * Fonction appelée à chaque étape du scroll
 * @ignore
 * 
 */
PM.UI.SmoothScroll.prototype.render = function() {
  this.finalPos = PM.Util.absolutePosition(this.elt)[1];
  var scroll = PM.Util.getPageScroll().y;
  eltid = this.elt.id
  
  var winHeight = window.innerHeight || document.documentElement.clientHeight;
  var docHeight = document.body.scrollHeight;
  if (this.finalPos > scroll) {
    if (docHeight - this.finalPos > winHeight) {
      scroll += Math.ceil((this.finalPos - scroll) / this.speed);
    } else {
      scroll += Math.ceil((this.finalPos-scroll - (docHeight - this.finalPos)) / this.speed);
    }
  } else {
    scroll = scroll + (this.finalPos - scroll) / this.speed;
  }
  window.scrollTo(0, scroll);
  if (scroll == this.finalPos || this.offsetTop == scroll) {
    clearInterval(this.interval);
    // ajoute l'ancre dans la barre d'adresse
    if (eltid) {
      window.location.hash = eltid;
    }
  }
  this.offsetTop = scroll;
}


/**
 * Crée un bloc de désactivation d'un élément
 * 
 * @class Objet de désactivation/activation d'un élément avec un bloc gris.
 * @constructor
 *
 * @param {String|DOM element} elt        identifiant ou élément qu'on veut pouvoir désactiver
 * @param {JSON Object} options  Options
 * <ul>
 *   <li><code><b>withLoader</b> (false)</code> : Utilisation d'un loader ou non</li>
 *   <li><code><b>loaderText</b></code> : Texte du loader</li>
 *   <li><code><b>progressBar</b> (false)</code> : Affichage d'une barre de prgression ou non</li>
 * </ul>
 */
PM.UI.BlockDisabler = function(elt, options) {
  this.elt = $(elt);
  this.isActive = false;

  this.div = PM.Dom.createElement('div', {className: 'blk_disabler'});
  PM.UI.hide(this.div);
  PM.Dom.parent(this.elt).appendChild(this.div);
  var withLoader = PM.Util.getOption(options, "withLoader", false);
  this.progressBar = PM.Util.getOption(options, "progressBar", false);
  this.loaderText = PM.Util.getOption(options, "loaderText", PM.Constants.Translation.txt_loader);
  
  if (withLoader) {
    this.loader = PM.Dom.createElement('div', {className: 'blk_disabler_loader'});
    var p = PM.Dom.createElement('p');
    if (typeof(PM.Constants.Translation) == "undefined") {
      PM.Constants.Translation = { txt_loader: "" };
    }
    var progressTxt = this.progressBar ? "(0%)" : "";
    this.loaderSpan = PM.Dom.createElement('span', {content: this.loaderText + progressTxt});
    p.appendChild(this.loaderSpan);
    this.loader.appendChild(p);
    PM.UI.hide(this.loader);
    PM.Dom.parent(this.elt).appendChild(this.loader);
  }
  // only if ie6
  if (ie6) {
    this.ieDiv = PM.Dom.createElement('div');
    this.ieDiv.style.height = 0;
    this.ieDiv.innerHTML = '<iframe src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: 1970; height: 0; display:none;"></iframe>';
    PM.UI.hide(this.ieDiv);
    PM.Dom.parent(this.elt).appendChild(this.ieDiv);
  }

  PM.Event.add(window, PM.Event.Type.REDRAW, this.resize.bindObj(this));
}

/**
 * Désactive l'élément référencé avec un bloc gris.
 */
PM.UI.BlockDisabler.prototype.disable = function() {  
  this.isActive = true;

  // defining background if needed
  if (ie6) PM.UI.show(this.ieDiv);

  PM.UI.Effect.stop(this.div);
  PM.UI.Effect.fadeIn(this.div, {duration: 800, opacity: 0.75, callback: this.showLoader.bindObj(this)} );

  this.resize();
}

PM.UI.BlockDisabler.prototype.showLoader = function() {
  if (this.loader) {
    PM.UI.show(this.loader);
    this.resize();
  }
}

/**
 * Redéfinit les dimensions et position du bloc gris de désactivation.
 * @ignore
 */
PM.UI.BlockDisabler.prototype.resize = function() {
  if (this.isActive) {
    var wElt = this.elt.offsetWidth;
    var hElt = this.elt.offsetHeight;
    var pos = PM.Util.absolutePosition(this.elt);
    var posX = pos[0];
    var posY = pos[1];

    this.div.style.top = posY + 'px';
    this.div.style.left = posX + 'px';
    this.div.style.width = wElt + 'px';
    this.div.style.height = hElt + 'px';

    if (this.loader) {
      this.loader.style.top = (posY + Math.floor((hElt - this.loader.offsetHeight)/2)) + 'px';
      this.loader.style.left = (posX + Math.floor((wElt - this.loader.offsetWidth)/2)) + 'px';
    }

    if (ie6) { // ie6 iframe
      var ieFrame = $j('iframe', this.ieDiv)[0];
      ieFrame.style.top = posY + 'px';
      ieFrame.style.left = posX + 'px';
      ieFrame.style.width = wElt;
      ieFrame.style.height = hElt;
    }
  }
}

/**
 * Active l'élément référencé en enlevant le bloc gris.
 */
PM.UI.BlockDisabler.prototype.enable = function() {
  this.isActive = false;

  PM.UI.Effect.stop(this.div);
  PM.UI.Effect.fadeOut(this.div, {duration: 800} );

  if (this.loader) {
    PM.UI.hide(this.loader);
  }
  if (ie6) PM.UI.hide(this.ieDiv);
}

PM.UI.BlockDisabler.prototype.progress = function(done, total) {
  var percentAchieved = parseInt(done*100/total);
  var progressTxt = this.progressBar ? "(" + percentAchieved + "%)" : "";
  this.loaderSpan.innerHTML = this.loaderText + progressTxt;
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.UI.Effects
------------------------------------------------------------------------------*/
/**
 * @namespace Effets du framework PriceMinister (se reposant sur jQuery)
 */
PM.UI.Effect = {}

/**
 * Affiche un élément en fondu
 * 
 * @param elt     Élément à afficher
 * @param options Options
 * <ul>
 *   <li><code><b>duration</b> (1000)</code> : Durée de l'effet (en ms)</li>
 *   <li><code><b>opacity</b> (1.0)</code> : Opacité finale de l'élément (entre 0 et 1).<br />Utile si on veut par exemple rendre légèrement transparent un élément.</li>
 *   <li><code><b>callback</b> (undefined)</code> : Fonction de callback à appeler à la fin de l'affichage</li>
 * </ul>
 */
PM.UI.Effect.fadeIn = function(elt, options) {
  PM.UI.Effect.fadeTo(elt, PM.Util.getOption(options, "opacity", 1.0), options);
}


/**
 * Masque un élément en fondu
 * 
 * @param elt     Élément à masquer
 * @param options Options
 * <ul>
 *   <li><code><b>duration</b> (1000)</code> : Durée de l'effet (en ms)</li>
 *   <li><code><b>opacity</b> (0.0)</code> : Opacité finale de l'élément (entre 0 et 1).<br />Utile si on veut par exemple rendre légèrement transparent un élément.</li>
 *   <li><code><b>callback</b> (undefined)</code> : Fonction de callback à appeler lorsque la transition est terminée.</li>
 * </ul>
 */
PM.UI.Effect.fadeOut = function(elt, options) {
  var opacity = PM.Util.getOption(options, "opacity", 0.0);
  if (opacity > 0) {
    PM.UI.Effect.fadeTo(elt, PM.Util.getOption(options, "opacity", 0.0), options);
  } else { // si on utilise la méthode fadeTo pour une opacité de 0, l'élément ne sera pas complètement masqué. On utilise donc fadeOut
    elt = $j($(elt));
    elt.fadeOut(PM.Util.getOption(options, "duration", 1000), PM.Util.getOption(options, "callback", undefined));
  }
}


/**
 * Change l'opacité d'un élément en fondu
 * 
 * @param elt     Élément sur lequel on doit changer l'opacité
 * @param opacity Opacité finale de l'élément
 * @param options Options
 */
PM.UI.Effect.fadeTo = function(elt, opacity, options) {
  elt = $j($(elt));
  elt.fadeTo(PM.Util.getOption(options, "duration", 1000), opacity, PM.Util.getOption(options, "callback", undefined));
}

/**
 * Stoppe tous les effets en cours sur un élément
 * 
 * @param elt Élément concerné
 */
PM.UI.Effect.stop = function(elt) {
  elt = $j($(elt));
  
  elt.stop(true);
}

/**
 * Affiche un élément avec un effet de déroulement
 * 
 * @param elt     Élément à afficher
 * @param options Options
 * <ul>
 *   <li><code><b>scaleY</b> (true)</code> : Dérouler horizontalement</li>
 *   <li><code><b>scaleX</b> (false)</code> : Dérouler verticalement</li>
 *   <li><code><b>duration</b> (1000)</code> : Durée de l'effet (en ms)</li>
 *   <li><code><b>callback</b> (undefined)</code> : Fonction de callback à appeler lorsque la transition est terminée.</li>
 *   <li><code><b>afterEachStep</b> (undefined)</code> : Fonction de callback à appeler après chaque étape d'affichage.</li>
 * </ul>
 */
PM.UI.Effect.slideDown = function(elt, options) {
  var cssProperties = {};
  if (PM.Util.getOption(options, "scaleY", true)) cssProperties.height = 'show';
  if (PM.Util.getOption(options, "scaleX", false)) cssProperties.width = 'show';
  
  PM.UI.Effect.slide(elt, cssProperties, options);
}

/**
 * Masque un élément avec un effet d'enroulement
 * 
 * @param elt     Élément à masquer
 * @param options Options
 * <ul>
 *   <li><code><b>scaleY</b> (true)</code> : Enrouler horizontalement</li>
 *   <li><code><b>scaleX</b> (false)</code> : Enrouler verticalement</li>
 *   <li><code><b>duration</b> (1000)</code> : Durée de l'effet (en ms)</li>
 *   <li><code><b>callback</b> (undefined)</code> : Fonction de callback à appeler lorsque la transition est terminée.</li>
 *   <li><code><b>afterEachStep</b> (undefined)</code> : Fonction de callback à appeler après chaque étape de masquage.</li>
 * </ul>
 */
PM.UI.Effect.slideUp = function(elt, options) {
  var cssProperties = {};
  if (PM.Util.getOption(options, "scaleY", true)) cssProperties.height = 'hide';
  if (PM.Util.getOption(options, "scaleX", false)) cssProperties.width = 'hide';
  
  PM.UI.Effect.slide(elt, cssProperties, options);
}

/**
 * Gère le masquage/affichage d'un élément avec effet d'enroulement/déroulement
 * @param elt     Élément à masquer
 * @param options Options
 */
PM.UI.Effect.toggleSlide = function(elt, options) {

  if($(elt).style.display != "none") {
    // Si l'élément est affiché on le masque
    PM.UI.Effect.slideUp(elt, options);
  }
  else {
    // Sinon on l'affiche
    PM.UI.Effect.slideDown(elt, options);
  }
}

/**
 * Anime un élément pour le dérouler ou l'enrouler
 * 
 * @ignore
 */
PM.UI.Effect.slide = function(elt, cssProperties, options) {
  elt = $j($(elt));
  elt.animate(cssProperties,
      { duration: PM.Util.getOption(options, "duration", 1000),
        complete: PM.Util.getOption(options, "callback", undefined),
        step: PM.Util.getOption(options, "afterEachStep", undefined)});
}

/**
 * Déplace un élément
 * 
 * @param elt     Élément à déplacer
 * @param options Options
 * <ul>
 *   <li><code><b>left</b> ("+=0px")</code> : Déplacement horizontal. Peut être absolu ("10px") ou relatif ("+=10px")</li>
 *   <li><code><b>top</b> ("+=0px")</code> : Déplacement vertical. Peut être absolu ("10px") ou relatif ("+=10px")</li>
 *   <li><code><b>duration</b> (1000)</code> : Durée de l'effet (en ms)</li>
 *   <li><code><b>callback</b> (undefined)</code> : Fonction de callback à appeler lorsque le déplacement est terminé.</li>
 *   <li><code><b>afterEachStep</b> (undefined)</code> : Fonction de callback à appeler après chaque étape de déplacement.</li>
 * </ul>
 */
PM.UI.Effect.move = function(elt, options) {
  elt = $j($(elt));
  elt.animate({ left: PM.Util.getOption(options, "left", "+=0px"), top: PM.Util.getOption(options, "top", "+=0px") },
      { duration: PM.Util.getOption(options, "duration", 1000),
        complete: PM.Util.getOption(options, "callback", undefined),
        step: PM.Util.getOption(options, "afterEachStep", undefined)});
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                     PM.Notice
------------------------------------------------------------------------------*/
/**
 * @namespace Affichage des notifications <code>(Doc à revoir)</code>.
 */
PM.Notice = { }

PM.Notice.Type = {
  SUCCESS: 0,
  NOTICE: 1,
  ERROR: 2,
  INFORMATION: 3
}

PM.Notice.show = function(targetId, type, message, addParagraphTag) {
  if (typeof(addParagraphTag) == "undefined" || addParagraphTag == true) {
    $(targetId).innerHTML = "<p>" + message + "</p>";
  } else {
    $(targetId).innerHTML = message;
  }
  
  switch (type) {
    case PM.Notice.Type.SUCCESS:
      $(targetId).className = "notification success";
      break;
    case PM.Notice.Type.NOTICE:
      $(targetId).className = "notification notice";
      break;
    case PM.Notice.Type.INFORMATION:
      $(targetId).className = "notification information";
      break;
    case PM.Notice.Type.ERROR:
    default:
      $(targetId).className = "notification error";
      break;
  }
  
  PM.UI.Effect.fadeIn(targetId, {duration: 500 } );
}

/**
 * Permet de cacher la notification et d'appeller une éventuelle méthode de callBack
 * 
 * @param targetId Id de la notification
 * @param options Options éventuelles: comme une méthode de callBack
 */
PM.Notice.hide = function(targetId, callbackFunction) {
  PM.UI.hide(targetId);
  
  // Cas ou une méthode de callback a été définie
  if(callbackFunction) {
    callbackFunction.call();
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                         PM.BT
------------------------------------------------------------------------------*/
/**
 * @namespace Outils pour brouiller ou enlever le brouillage des liens <code>(doc à revoir)</code>.
 * 
 * BT stands for BlurTools
 * Formerly selfpoplink, link,...
 */
PM.BT = {}

/**
 * Tools to unblur & generate blurred links
 * BT stands for BlurTools
 * Formerly selfpoplink, link,...
 */
PM.BT.escape = function(s) {
  // Don't treat cgi-style URLs because of all the '&' and likewise problems
  if (s.indexOf('?') == -1) {
    // Strip off domain and anchor if exist to avoid encoding ':' (from port number for exemple) and '#'
    var split = new RegExp("([^:/]+://[^/]*)?([^#]*)(#.*)?", "").exec(s);
    var domain = split[1] || "";
    var query = split[2];
    var anchor = split[3] || "";

    // Unescape (does nothing if it wasn't escaped, but if it was, we avoid double escaping)
    query = unescape(query);

    // Escape, so we don't rely on the browser to do this (some IE versions don't!)
    query = escape(query);

    // Rejoin with eventual domain and anchor
    s = domain + query + anchor;
  }
  return s;   
}

/**
 * Unblur an URL
 *
 * @param strings the blurred URL
 * @return the unblurred URL
 */
PM.BT.ub = function() {
  //arguments.join = Array.prototype.join;
  //return arguments.join("/").replace(/\|/g, ".");
  var url = "";
  for (var i = 0; i < arguments.length; i++) {
    var word = arguments[i];
    if (typeof(word) == "string") {
      url = url + word;
    } else {
      url = url + String.fromCharCode(word);
    }
  }
  return url;
}

/**
 * Unblur an URL and open it in the current window
 *
 * @param strings the blurred URL
 *
 * @base PM.BT
 */
PM.BT.ubs = function() {
    window.top.location.href = PM.BT.escape(PM.BT.ub.apply(null, arguments));
}


/**
 * IE Temporary hack :
 * Unblur an URL and open it in the current window,
 * in a way which allows IE to transmit the referrer in the HTTP header
 * (see http://webbugtrack.blogspot.com/2008/11/bug-421-ie-fails-to-pass-http-referer.html)
 * 
 * @param strings the blurred URL
 * 
 * @base PM.BT
 */
PM.BT.ubsWithReferrer = function() {
  var url = PM.BT.escape(PM.BT.ub.apply(null, arguments));
  if(ie){
    var referLink = document.createElement('a');
    referLink.href = url;
    document.body.appendChild(referLink);
    referLink.click();
  } else {
    window.top.location.href = url;
  }  
}

/**
 * Unblur an URL and open it in a popup window
 *
 * @param strings the blurred URL
 * @param width   popup window width
 * @param height  popup window height
 */
PM.BT.ubp = function() {
  arguments.slice = Array.prototype.slice;
  var url = PM.BT.escape(PM.BT.ub.apply(null, arguments.slice(0, arguments.length - 2)));
  var width = arguments[arguments.length - 2];
  var height = arguments[arguments.length - 1];
  PM.PopUp.open(url, PM.PopUp.Type.LINK, width, height);
}

/**
 * Unblur an URL and open it in a new window
 *
 * @param strings
 */
PM.BT.ubw = function() {
  window.open(PM.BT.escape(PM.BT.ub.apply(null, arguments)));
}

/**
 * Types of Links
 *
 * @base PM.BT
 */
PM.BT.Action = {
  DEFAULT:        0,
  RETURN:         1, // return link unblurred
  SELF:           2, // open link in same window
  POP:            3, // open link in a new window (with parameters)
  POP_NO_OPTION : 4
}

/**
 * Unblur a link and return it (was previously called selfpoplink)
 *
 * @base PM.BT
 */
PM.BT.ubo = function() {
  var l = "";

  for (i = 0; i < arguments.length; i++) {
    l = l + arguments[i];
  }
  if (l.charAt(0)=='#') l = l.substring(1,l.length);
  
  return l;
}

/**
 * Unblur a link and either return it, open it in the same or in another window
 *
 * @base PM.BT
 */
PM.BT.li = function(action) {
  var l = "";
  var argsLength;
  (action == PM.BT.Action.POP)? argsLength = arguments.length - 2: argsLength = arguments.length;

  for (i = 1; i < argsLength; i++) { // starting at argument 1
    l = l + arguments[i];
  }
  if (l.charAt(0)=='#') l = l.substring(1,l.length);
  
  switch(parseInt(action)) {
    case PM.BT.Action.RETURN:
      return l;
      break;
    case PM.BT.Action.SELF:
      window.location.href = PM.BT.escape(l);
      break;
    case PM.BT.Action.POP:
      PM.PopUp.open(PM.BT.escape(l), PM.PopUp.Type.LINK, arguments[arguments.length-2], arguments[arguments.length-1]);
      break;
    case PM.BT.Action.POP_NO_OPTION:
      window.open(PM.BT.escape(l));
      break;
    default:
      return l;
  }
}

/**
 * Débrouille une url
 * Cette méthode est utilisée pour le nouveau systeme de brouillage (transformation du span en a). 
 * On récupère une chaine de caractère entiere
 * @param la chaine de caractères brouillée
 * @return la chaîne de caractères débrouillée
 */
PM.BT.ublr = function(s) {
  var list = s.split(',');
  var url = "";
  for (var i = 0; i < list.length; i++) {
    var word = list[i];
    if (isNaN(word)) {
      // On retire les simples quotes autour du string. 
      // Exemple: "'Livres'" devient "Livres"
      url = url + word.substring(1, word.length - 1).replace(/\\/g, "");
    } else {
      url = url + String.fromCharCode(word);
    }
  }
  return url;
}

PM.BT.transformSpans = function() {
  var spansToTransform = $j("span.spanlnk");
  for(var i=0; i<spansToTransform.length; i++) {
    var link = PM.Dom.createLink(PM.BT.ublr(spansToTransform[i].title), spansToTransform[i].firstChild, spansToTransform[i].id, spansToTransform[i].className);
    PM.Dom.parent(spansToTransform[i]).replaceChild(link, spansToTransform[i]);
  }
}

/**
 * Transforme les liens brouillés afin qu'ils soient cliquables par l'utilisateur.
 */
PM.BT.transformAll = function() {
  // On récupère tous les spans qui ont l'attribut data-pmbt.
  var spansToTransform = $j("span[data-pmbt]");
  
  for (var i = 0; i < spansToTransform.length; i++) {
    // On ne débrouille pas l'url si il s'agit d'un lien "js".
    var dataPmbt = spansToTransform[i].getAttribute("data-pmbt");
    var href = PM.Dom.Class.has(spansToTransform[i], "pmbtjs")
             ? dataPmbt
             : PM.BT.ublr(dataPmbt);
    
    // Créé le lien.
    var link = PM.Dom.createLink(href, "", spansToTransform[i].id, spansToTransform[i].className);
    link.innerHTML = spansToTransform[i].innerHTML;
    
    // Copie les attributs du <span> vers la <a>.
    var title = spansToTransform[i].getAttribute("title");
    var onclick = spansToTransform[i].getAttribute("onclick");
    var spotInfo = spansToTransform[i].getAttribute("data-spotinfo");
    var spotStyle = spansToTransform[i].getAttribute("data-spotstyle");
    var spotIgLink = spansToTransform[i].getAttribute("data-spotiglink");
    var name = spansToTransform[i].getAttribute("name");
    var style = spansToTransform[i].getAttribute("style");
   
    if (onclick != null) {
      link.setAttribute("onclick", onclick);
    }
    // On affiche le title que si il n'y a pas d'informations de spot à afficher sur le lien.
    if (title != null && spotInfo == null) {
      link.setAttribute("title", title);
    }
    if (spotInfo != null) {
      link.setAttribute("title", spotInfo);
    }
    // On affiche le style que si il n'y a pas d'informations de spot à afficher sur le lien.
    if (style != null && spotStyle == null) {
      link.setAttribute("style", style);    
    }
    if (spotStyle != null) {
      link.setAttribute("style", spotStyle);
    }
    if (spotIgLink != null) {
      link.setAttribute("onmouseover", spotIgLink);
    }
    if (name != null) {
      link.setAttribute("name", name);
    }
        
    // Remplace le span par le lien.
    PM.Dom.parent(spansToTransform[i]).replaceChild(link, spansToTransform[i]);    
  }
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.BT.ubo
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function selfpoplink() {
  PM.Statistics.deprecatedFunctions("selfpoplink");
  return PM.BT.ubo.apply(null,arguments);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.BT.li
 * @deprecated  <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function selflink() {
  PM.Statistics.deprecatedFunctions("selflink");
  var args = new Array(""+PM.BT.Action.SELF);
  for(i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  PM.BT.li.apply(null,args);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.BT.li
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function poplink() {
  PM.Statistics.deprecatedFunctions("poplink");
  var args = new Array(""+PM.BT.Action.POP);
  for(i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  PM.BT.li.apply(null,args);
}

/* END : Kept for backward compatibility */


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.PopUp
------------------------------------------------------------------------------*/
/**
 * @namespace Affichage des popups <code>(Doc à revoir)</code>.
 */
PM.PopUp = {}

/** 
 * Creates a popup window
 *
 * @param url    popup content url
 * @param type   popup type
 * @param width  [optional] popup window width
 * @param height [optional] popup window height
 * @param name   [optional] popup window name
 */
PM.PopUp.open = function(url, type, width, height, name, options) {
  if(!options) options = "";

  /* Help specific case */
  if (type === PM.PopUp.Type.HELP && url.indexOf("upload") != -1) {
    type = PM.PopUp.Type.UPLOAD;
  }
  
  switch(type) {
    case PM.PopUp.Type.COMPARATOR:
      name    = "compareTool";
      options = "scrollbars=yes, resizable, toolbar, menubar, width=750, height=600";
      break;
    case PM.PopUp.Type.HELP:
      name    = "help";
      options = "scrollbars=yes, resizable";
      break;
    case PM.PopUp.Type.CAMPAIGN:
      name    = "campaign";
      options = "scrollbars=yes, resizable";
      break;
    case PM.PopUp.Type.PICTURE:
      name    = "picture";
      options = "scrollbars=yes, resizable, status";
      break;
    case PM.PopUp.Type.PARTNER:
      name    = "partner";
      options = "scrollbars=yes, resizable, status, toolbar, menubar, screenX=10, screenY=10, top=10, left=10";
      break;
    case PM.PopUp.Type.WINDOW:
      name    = "window2";
      options = "scrollbars=yes, resizable, toolbar, menubar";
      break;
    case PM.PopUp.Type.UPLOAD:
      name    = "upload";
      options = "scrollbars=yes, resizable, status";
      break;
    case PM.PopUp.Type.LINK:
      name    = "poplink";
      options = "scrollbars=yes, resizable";
      break;
    case PM.PopUp.Type.CUSTOM:
      // custom options
      break;
    default:
      options = "scrollbars=yes, resizable";
  }
  
  if (width)  options += ", width="  + width;
  if (height) options += ", height=" + height;
  if (!name) name = 'popup';
  
  var win = window.open(url, name, options);
  if (win) {
    win.focus();
    //return win;
  }
  
  //return false;
}

/**
 * Types of Popups
 */
PM.PopUp.Type = {
  /*
  * @exec
  */
  DEFAULT:    0,
  COMPARATOR: 1,
  HELP:       2,
  CAMPAIGN:   3,
  PICTURE:    4,
  PARTNER:    5,
  WINDOW:     6,
  UPLOAD:     7,
  LINK:       8
}


/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.PopUp.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function popHelp(url, width, height) {
  PM.Statistics.deprecatedFunctions("popHelp");
  PM.PopUp.open(url, PM.PopUp.Type.HELP, width, height);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.PopUp.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function popPicture(url, width, height) {
  PM.Statistics.deprecatedFunctions("popPicture");
  PM.PopUp.open(url, PM.PopUp.Type.PICTURE, width, height);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.PopUp.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function popPartner(url, name, width, height) {
  PM.Statistics.deprecatedFunctions("popPartner");
  PM.PopUp.open(url, PM.PopUp.Type.PARTNER, width, height);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.PopUp.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function popWindow(url, width, height, posX, posY) {
  PM.Statistics.deprecatedFunctions("popWindow");
  options = 'scrollbars=yes, resizable';
  if (arguments.length > 3)
    options += ',left='+ posX + ',screenX='+ posX;
  if (arguments.length > 4)
    options += ',top='+ posY + ',screenY='+ posY;
  PM.PopUp.open(url, PM.PopUp.Type.CUSTOM, width, height, 'window', options);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.PopUp.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function pop(name, url, width, height, options) {
  PM.Statistics.deprecatedFunctions("pop");
  PM.PopUp.open(url, PM.PopUp.Type.CUSTOM, width, height, name, options);
}

/* END : Kept for backward compatibility */



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Alert
------------------------------------------------------------------------------*/
/**
 * Crée une nouvelle Ch'Clém'up.<br/>
 * <ul>
 * <li>Si le contenu une <b>chaine de caractères</b> ou un <b>div</b>, la Ch'Clém'up est stockée en mémoire mais non affichée. Il faut ensuite faire appel à {@link PM.Alert.show}.</li>
 * <li>Si le contenu est en <b>Ajax</b>, la Ch'Clém'up est affichée lorsque le contenu est chargé.</li>
 * </ul>
 * 
 * @class Génération et affichage des Ch'Clém'up (boite de dialogue Javascript/Ajax)<br/><img src="http://docs.pm.dev:8080/jsdoc/images/chclemup.jpg">
 * @constructor
 * 
 * @param {String|DOM Object} content Contenu de la Ch'Clem'Up. Ce paramètre peut être soit :
 * <ul>
 * <li>une <b>chaine texte</b> (ex : "Salut")</li>
 * <li>un <b>objet dom</b> contenant le texte à afficher (ex : un div)</li>
 * <li>une <b>url</b> : dans ce cas, il faut définir l'option <code>isAjax</code> à true</li>
 * </ul>
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>clickOutsideClose</b> (true)</code> : un clic en dehors de la Ch'Clém'up la ferme.</li>
 * <li><code><b>hasShutBox</b> (true)</code> : si la Ch'Clém'up a une case de fermeture ou pas</li>
 * <li><code><b>shutText</b> ("Fermer la fenêtre")</code> : définit le texte affiché à côté de la shutBox.</li>
 * <li><code><b>shutAction</b> (undefined)</code> : définit l'action à la fermeture</li>
 * <li><code><b>isModal</b> (false)</code> : si la variable est à true, alors un fond (gris par défaut) est affiché derrière la Ch'Clém'up, masquant le reste de la fenêtre.</li>
 * <li><code><b>backgroundColor</b> (grey)</code> : couleur du fond semi-opaque. Utile uniquement si isModal est à true.</li>
 * <li><code><b>btn1Label</b> (undefined)</code> : définit le label du bouton 1</li>
 * <li><code><b>btn1Action</b> (undefined)</code> : définit l'action du bouton 1</li>
 * <li><code><b>btn1Link</b> (undefined)</code> : définit un lien pour le bouton 1</li>
 * <li><code><b>btn2Label</b> (undefined)</code> : définit le label du bouton 2</li>
 * <li><code><b>btn2Action</b> (undefined)</code> : définit l'action du bouton 2</li>
 * <li><code><b>btn2Link</b> (undefined)</code> : définit un lien pour le bouton 2</li>
 * <li><code><b>isDraggable</b> (false)</code> : si la Ch'Clém'up est déplaçable ou non (au clic sur la barre de titre) <font color="red">(Pas encore implémenté)</font></li>
 * <li><code><b>isAjax</b> (false)</code> : définit si une requête Ajax doit être effectuée pour récupérer le contenu de la Ch'Clém'up. Dans ce cas, content doit être une url.</li>
 * <li><code><b>width</b> (PM.Alert.size.SMALL ou rien si nouvelle structure - à définir en CSS par défaut)</code> : taille de la Ch'Clém'up. Au choix :
 *   <ul>
 *     <li><code>PM.Alert.size.SMALL</code> (400px)</li>
 *     <li><code>PM.Alert.size.MEDIUM</code> (550px)</li>
 *     <li><code>PM.Alert.size.LARGE</code> (700px)</li>
 *     <li>Ou bien une taille personnalisée (ex : '730px')</li>
 *   </ul>
 * </li>
 * <li><code><b>title</b> (undefined)</code> : titre de la Ch'Clém'up. Dans ce cas, une barre de titre est ajoutée.</li>
 * <li><code><b>withoutEffects</b> (false)</code> : active ou pas les effets de la ch'clemup</li>
 * <li><code><b>useTable</b> (false)</code> : utilise l'ancienne structure d'affichage avec des "table". Ne pas utiliser pour de nouvelles Ch'Clém'up !</li>
 * </ul>
 */
PM.Alert = function(content, options) {
  
  // variables
  this.content = null;

  if (!content) content = ""; // it's possible to initialize a pmalert without content
  if (!options) options = {};
  
  // get the pmalert content
  if (options.isAjax) {
    this.isAjax = true;
  } else {
    if (typeof(content) == "string") {
      this.content = content;
    } else {
      if (PM.Dom.parent(content) != null) {
        this.content = PM.Dom.parent(content).removeChild(content); // so the content is not twice in the DOM !
        if (this.content.style && this.content.style.display == "none") {
          this.content.style.display = "";
        }
      } else {
        this.content = content;
      }
    }
  }
  
  // construit la Ch'Clém'up avec l'ancienne ou la nouvelle structure
  this.doBuildWithTable = PM.Util.getOption(options, "useTable", false);
  
  if (options.title) this.title = options.title; // pmalert title
  // pmalert size
  this.width = "";
  if (options.width) {
    this.width = options.width;
  } else if(this.doBuildWithTable) { // on ne définit la taille par défaut que dans le cas de l'ancienne structure (désormais fixée en CSS sinon)
    this.width = PM.Alert.size.SMALL;
  }
  
  // wether the pmalert has background or not ("blocker" pmalert)
  if (options.isModal) this.isModal = true;
  else this.isModal = false;
  
  // has margins or not
  if (options.hasMargin != undefined) {
    this.hasMargin = options.hasMargin;
  } else {
    this.hasMargin = true;
  }
  
  // if chclemup has shut box or not
  if (options.hasShutBox != undefined) {
    this.hasShutBox = options.hasShutBox;
  } else {
    this.hasShutBox = true;
  }
  if (options.shutAction) this.shutAction = options.shutAction;
  else this.shutAction = PM.Alert.close;
  
  if (options.shutText != undefined) this.shutText = options.shutText;
  else this.shutText = PM.Constants.Translation.close_clemup;
  
  // btns
  if (options.btn1Label) this.btn1Label = options.btn1Label;
  if (options.btn1Action) this.btn1Action = options.btn1Action;
  if (options.btn1Link) this.btn1Link = options.btn1Link;
  if (options.btn2Label) this.btn2Label = options.btn2Label;
  if (options.btn2Action) this.btn2Action = options.btn2Action;
  if (options.btn2Link) this.btn2Link = options.btn2Link;
  
  // if a click outside the window close it or not (default : true)
  if (options.clickOutsideClose != undefined) {
    this.clickOutsideClose = options.clickOutsideClose;
  } else {
    if(!this.isModal) this.clickOutsideClose = true;
      else this.clickOutsideClose = false;
  }

  this.callbackOnShow = PM.Util.getOption(options, "callbackOnShow", null);
  this.withoutEffects = PM.Util.getOption(options, "withoutEffects", false);
  
  if (this.isAjax) {
    // Ajax request before showing the video
    PM.Ajax.request(content, this.ajaxResult.bindObj(this), {method: PM.Ajax.GET});
  }
  
}

/**
 * Tailles de Ch'Clém'up prédéfinies.
 * <ul>
 *   <li><code>SMALL</code> (450px)</li>
 *   <li><code>MEDIUM</code> (550px)</li>
 *   <li><code>LARGE</code> (700px)</li>
 * </ul>
 * @constant
 */
PM.Alert.size = {
  /**
   * @constant
   */
  SMALL: "400px",
  MEDIUM: "550px",
  LARGE: "700px"
}

/**
 * Booléen indiquant si la Ch'Clém'up est affichée (<code>true</code>) ou pas (<code>false</code>)
 * @field
 */
PM.Alert.isActive = false;

PM.Alert.currentClickFction = null; // reference to the checkClick function - usefull to remove event
PM.Alert.resizeFction = null;

PM.Alert.shutAction = null;
PM.Alert.btn1Action = null;
PM.Alert.btn2Action = null;


/**
 * Construit une Ch'Clém'up en DOM et l'ajoute au document.
 * Cette fonction (statique) n'est appelée qu'une seule fois.
 * 
 * @ignore
 */
PM.Alert.build = function() { 
  // do nothing if Ch'Clém'up already in the DOM :
  if ($('pmalert_ctnt')) return true;

  // append element
  var appendElement = document.body;
  if ($("top_ctner")) appendElement = $("top_ctner");
  
  // Ch'Clem'up Background
  var pmalertBg = PM.Dom.createElement("div", {className: "box_blackout", id: "pmalert_bg"});
  pmalertBg.style.display = "none";
  appendElement.appendChild(pmalertBg);    
  
  // Ch'Clém'up main body
  var pmalertMainDiv = PM.Dom.createElement("div", {className: "pm_popin", id: "pmalert_alert"});
  pmalertMainDiv.style.display = "none";
  
  // head
  var divHead = PM.Dom.createElement("div", {className: "popin_head"});
  divHead.appendChild(PM.Dom.createElement("p", {className: "popin_title", id:"pmalert_title"}));
  var pClose = PM.Dom.createElement("p", {className: "pm_ui", id: "pmalert_close"});
  var aClose = PM.Dom.createLink("#", "", "pmalert_close_text", "pm_close");
  pClose.appendChild(aClose);
  divHead.appendChild(pClose);
  pmalertMainDiv.appendChild(divHead);
  
  // empty content div
  pmalertMainDiv.appendChild(PM.Dom.createElement("div", {id: "pmalert_ctnt", className: "popin_ctn"}));
  
  appendElement.appendChild(pmalertMainDiv);
  
  // only if ie6
  if (ie6) {
    var ieDiv = PM.Dom.createElement("div");
    ieDiv.innerHTML = '<iframe id="pmalert_iframe" src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: 1990; height: 0; display:none;"></iframe>';
    appendElement.appendChild(ieDiv);
  }
  
}

/**
 * Construit une Ch'Clém'up en DOM et l'ajoute au document.
 * Cette fonction (statique) n'est appelée qu'une seule fois.
 * 
 * @ignore
 */
PM.Alert.buildWithTable = function() { 
  // do nothing if Ch'Clém'up already in the DOM :
  if ($('pmalert_ctnt')) return true;

  // append element
  var appendElement = document.body;
  if ($("top_ctner")) appendElement = $("top_ctner");
  
  // Ch'Clem'up Background
  var pmalertBg = PM.Dom.createElement("div", {className: "box_blackout", id: "pmalert_bg"});
  pmalertBg.style.display = "none";
  appendElement.appendChild(pmalertBg);
  
  // Ch'Clém'up main body
  var pmalertMainTable = PM.Dom.createElement("table", {className: "pmalert_ctner", id: "pmalert_alert"});
  var pmalertTable = PM.Dom.createElement("tbody");
  pmalertMainTable.cellspacing = "0";
  pmalertMainTable.style.display = "none";
  
  
  // top border
  var pmalertTop = PM.Dom.createElement("tr");
  pmalertTop.appendChild(PM.Dom.createElement("td", {className: "pmalert_tl"}));
  pmalertTop.appendChild(PM.Dom.createElement("td", {className: "pmalert_t"}));
  pmalertTop.appendChild(PM.Dom.createElement("td", {className: "pmalert_tr"}));
  pmalertTable.appendChild(pmalertTop);
  
  // main content
  var pmalertContent = PM.Dom.createElement("tr");
  pmalertContent.appendChild(PM.Dom.createElement("td", {className: "pmalert_l"}));
  
  var pmalertTd = PM.Dom.createElement("td", {className: "pmalert"});
  var pmalertDiv = PM.Dom.createElement("div", {className: "pmalert_ctn"});
  
  // title
  pmalertDiv.appendChild(PM.Dom.createElement("div", {className: "pmalert_title", id:"pmalert_title"}));
  var pClose = PM.Dom.createElement("p", {className: "pmalert_close", id: "pmalert_close"});
  var contentClose = PM.Dom.createElement("span", {id: "pmalert_close_text"});
  var aClose = PM.Dom.createLink("#", contentClose);
  pClose.appendChild(aClose);
  pmalertDiv.appendChild(pClose);
  
  // empty content div
  pmalertDiv.appendChild(PM.Dom.createElement("div", {id: "pmalert_ctnt"}));
  
  // btns divs
  var btnsDiv = PM.Dom.createElement("div", {id: "pmalert_btns"});
  
  var btn1Div = PM.Dom.createElement("div", {className: "pmalert_btn"});
  btn1Div.appendChild(PM.Dom.createLink("#", "", "pmalert_btn1", "bluelinksmall"));
  btnsDiv.appendChild(btn1Div);
  
  var btn2Div = PM.Dom.createElement("div", {className: "pmalert_btn"});
  btn2Div.appendChild(PM.Dom.createLink("#", "", "pmalert_btn2", "bluelinksmall"));
  btnsDiv.appendChild(btn2Div);
  
  pmalertDiv.appendChild(btnsDiv);
  
  pmalertTd.appendChild(pmalertDiv);
  pmalertContent.appendChild(pmalertTd);
  
  pmalertContent.appendChild(PM.Dom.createElement("td", {className: "pmalert_r"}));
  pmalertTable.appendChild(pmalertContent);
  
  //bottom border
  var pmalertBottom = PM.Dom.createElement("tr");
  pmalertBottom.appendChild(PM.Dom.createElement("td", {className: "pmalert_bl"}));
  pmalertBottom.appendChild(PM.Dom.createElement("td", {className: "pmalert_b"}));
  pmalertBottom.appendChild(PM.Dom.createElement("td", {className: "pmalert_br"}));
  pmalertTable.appendChild(pmalertBottom);
  
  pmalertMainTable.appendChild(pmalertTable);
  appendElement.appendChild(pmalertMainTable);
  
  // only if ie6
  if (ie6) {
    var ieDiv = PM.Dom.createElement("div");
    ieDiv.innerHTML = '<iframe id="pmalert_iframe" src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: 1990; height: 0; display:none;"></iframe>';
    appendElement.appendChild(ieDiv);
  }
  
}

/**
 * Fonction appelée lorsque la requête Ajax a retourné un résultat.
 * La Ch'Chlém'up est alors affichée.
 * 
 * @param options Objet passé en paramètre par PM.Ajax.
 * @ignore
 */
PM.Alert.prototype.ajaxResult = function(options) {
  this.content = options.XmlHttpObject.responseText;
  
  // Gère le cas où l'utilisateur n'est pas connecté. 
  // Si l'utilisateur n'est pas connecté (en cas de session expirée par exemple), la requête Ajax renvoie du JSON. Il faut donc interpréter le JSON pour afficher la page d'identification.
  var tagRegExp = '{.*(values|"action":"AuthenticateAjaxResponseAction")+.*(values|"action":"AuthenticateAjaxResponseAction")+.*}';
  var matchTag = new RegExp(tagRegExp, 'i');
  
  if (this.content.match(matchTag)){
    eval("var res = " + content);
    PM.Ajax.authenticate({ loginURL : res.values.loginURL});
  }
  else {
    this.show();
  }
  
}

/**
 * Positionne la Ch'Clém'up dans la page.
 * Cette fonction est appelée à l'affichage et au redimensionnement de la fenêtre
 */
PM.Alert.displayInPage = function(isModal) {
  var pmalert = $('pmalert_alert');
  if (typeof(isModal) == "undefined") isModal = $('pmalert_bg').style.display != "none";

  // calculate window size to display the pmalert
  var winSize = PM.Util.getWindowSize();
  
  // calculate the document size (for background)
  var wDoc = document.body.offsetWidth;
  var hDoc = document.body.offsetHeight;
  if (winSize.h > hDoc) hDoc = winSize.h;

  // calculate element size
  var wElt = hElt = 0;
  var hasToDisplay = (pmalert.style.display == "none");
  if (hasToDisplay) {
    pmalert.style.visibility = "hidden";
    pmalert.style.display = "";
  }
  wElt = pmalert.offsetWidth;
  hElt = pmalert.offsetHeight;
  if (hasToDisplay) {
    pmalert.style.display = "none";
    pmalert.style.visibility = "visible";
  }
  
  // scroll in the page
  var scrollInPage = PM.Util.getPageScroll();
  var deltaX = scrollInPage.x;
  var deltaY = scrollInPage.y;
  
  var posX = parseInt(((winSize.w - wElt) / 2) + deltaX);
  if (posX < 0) posX = 0;    
  var posY = parseInt(((winSize.h - hElt) / 2) + deltaY);
  if (ie6) { // ie6 iframe
    var pmalert_frame = $('pmalert_iframe');
    if (isModal) {
      pmalert_frame.style.top = '0px';
      pmalert_frame.style.left = '0px';
      pmalert_frame.style.width = wDoc + 'px';
      pmalert_frame.style.height = hDoc + 'px';
    } else {
      pmalert_frame.style.top = posY + 'px';
      pmalert_frame.style.left = posX + 'px';
      pmalert_frame.style.width = wElt;
      pmalert_frame.style.height = hElt;
    }
  }
  pmalert.style.top  = posY + 'px';
  pmalert.style.left = posX + 'px';
  
  // defining background if needed
  if (isModal) {
    $('pmalert_bg').style.width = wDoc + "px";
    $('pmalert_bg').style.height = hDoc + "px";
  }
}

/**
 * Affiche la Ch'Clém'up dans la page.<br/>
 * 
 * @param {Function}    callbackFct Fonction de callback appelée une fois la Ch'Clém'up affichée (car les effets font que la Ch'Clém'up n'est pas affichée instantanément mais en fade in)
 * @param {JSON Object} options Redéfinition de certains paramètres.<br/>
 *   Il est en effet possible de redéfinir certains paramètre de la Ch'Clém'up tels que les actions associées au boutons.<br/>
 *   Options possibles :<br/>
 *   <ul>
 *     <li><code><b>btn1Action</b></code> : action associée au bouton 1</li>
 *     <li><code><b>btn2Action</b></code> : action associée au bouton 2</li>
 *   </ul>
 * 
 */
PM.Alert.prototype.show = function(callbackFct, options) {
  if (!options) options = {};
  // user can redefine some options such as button actions
  if (options.btn1Action) this.btn1Action = options.btn1Action;
  if (options.btn2Action) this.btn2Action = options.btn2Action;

  if (options.shutAction) this.shutAction = options.shutAction;
  
  if (!callbackFct && this.callbackOnShow) callbackFct = this.callbackOnShow; 
  
  PM.Alert.isActive = true;
  
  //APP-34922
  if(ie7){
    if ($('IE7') != undefined) {
      PM.Dom.Class.add($('IE7'), 'popin_active');
    }
  }
  
  
  // construct Ch'Clém'up in the DOM if not present already
  if (this.doBuildWithTable) {
    PM.Alert.buildWithTable();
  }   else {
    PM.Alert.build();
  }
  
  //deleting all childs from the ch'clemup
  var popupCtnt = $('pmalert_ctnt');
  while (popupCtnt.firstChild) {
    var ctn = popupCtnt.removeChild(popupCtnt.firstChild);
    delete ctn;
  }
  
  // filling content
  var contentToFill = $('pmalert_ctnt');
  if (this.hasMargin) {
    contentToFill = contentToFill.appendChild(PM.Dom.createElement("div", {className: "pmalert_ctnt_txt"}));
  }
  if (typeof(this.content) == "string") {
    contentToFill.innerHTML = this.content;
  } else {
    var tmpDiv = PM.Dom.createElement("div");
    tmpDiv.appendChild(this.content);
    contentToFill.innerHTML = tmpDiv.innerHTML;
    //contentToFill.appendChild(this.content);
  }
  
  // Dans le cas d'une requête AJAX pour remplir la ch'clemup, on évalue le JS
  if(this.isAjax) {
    PM.Util.evalScript(this.content);
  }
  
  // Ch'Clém'up title
  if (this.title) {
    $('pmalert_title').innerHTML = this.doBuildWithTable ? "<h6>" + this.title + "</h6>" : this.title;
    $('pmalert_title').style.display = "block";
  } else if ($('pmalert_title')) {
    $('pmalert_title').style.display = "none";
  }

  // Btns actions and labels
  $('pmalert_close_text').innerHTML = this.shutText;
  if (PM.Alert.shutAction && PM.Alert.shutAction != null) PM.Event.remove($('pmalert_close'), "click", PM.Alert.shutAction);
  PM.Alert.shutAction = this.shutAction;
  if (this.shutAction) PM.Event.add($('pmalert_close'), "click", this.shutAction);

  if (this.btn1Label) {
    $('pmalert_btn1').innerHTML = this.btn1Label;
    PM.Dom.parent($('pmalert_btn1')).style.display = "block";
    
    if (PM.Alert.btn1Action && PM.Alert.btn1Action != null) PM.Event.remove($('pmalert_btn1'), "click", PM.Alert.btn1Action);
    PM.Alert.btn1Action = this.btn1Action;
    if (this.btn1Action) PM.Event.add($('pmalert_btn1'), "click", this.btn1Action);
    if (this.btn1Link) $('pmalert_btn1').href = this.btn1Link; else $('pmalert_btn1').href = "#";
  } else if ($('pmalert_btn1')) {
    PM.Dom.parent($('pmalert_btn1')).style.display = "none";
  }

  if (this.btn2Label) {
    $('pmalert_btn2').innerHTML = this.btn2Label;
    PM.Dom.parent($('pmalert_btn2')).style.display = "block";
    
    if (PM.Alert.btn2Action && PM.Alert.btn2Action != null) PM.Event.remove($('pmalert_btn2'), "click", PM.Alert.btn2Action);
    PM.Alert.btn2Action = this.btn2Action;
    if (this.btn2Action) PM.Event.add($('pmalert_btn2'), "click", this.btn2Action);
    if (this.btn2Link) $('pmalert_btn2').href = this.btn2Link; else $('pmalert_btn2').href = "#";
  } else if ($('pmalert_btn2')) {
    PM.Dom.parent($('pmalert_btn2')).style.display = "none";
  }

  if (this.btn1Label && this.btn2Label) {
    $('pmalert_btns').className = "pmalert_btns pmalert_2_btns";
  } else if ($('pmalert_btns')) {
    $('pmalert_btns').className = "pmalert_btns pmalert_1_btns";
  }
  if (this.btn1Label || this.btn2Label) {
    $('pmalert_btns').style.display = "block";
  } else if ($('pmalert_btns')) {
    $('pmalert_btns').style.display = "none";
  }

  // setting size
  var pmalert = $('pmalert_alert');
  pmalert.style.width = this.width;
  
  // display shut box (or not)
  if (this.hasShutBox) $('pmalert_close').style.display = "block";
  else $('pmalert_close').style.display = "none";
  
  PM.Alert.displayInPage(true); // function to display the Ch'Clém'up

  // Ajout d'un événement au redimensionnement
  PM.Alert.resizeFction = PM.Alert.displayInPage;
  
  // Pour éviter un loop de resize avec l'iframe?
  if (!ie6) PM.Event.add(window, PM.Event.Type.REDRAW, PM.Alert.resizeFction);
  
  // Ajout d'un événement au chargement de la page si celle-ci n'est pas chargée
  if (!PM.Event.hasReached(PM.Event.Type.COMPLETE)) {
    PM.Event.add(window, PM.Event.Type.COMPLETE, PM.Alert.displayInPage);
  }

  // displaying
  var afterFinishFct = function() {
    if (callbackFct != undefined && callbackFct != null && typeof(callbackFct) == "function") callbackFct.apply(null);
    
    // if a click outside close the window, add a new event on click
    if (this.clickOutsideClose) {
      PM.Alert.currentClickFction = this.testClick.bindObj(this);
      // HACK, on met un timeout pour éviter l'ajout de l'évènement trop rapidement
      // Si la ch'clemup s'affiche trop rapidement, elle se referme immédiatement à cause de cet évènement
      setTimeout(function(){ PM.Event.add(document, "click", PM.Alert.currentClickFction) }, 1);
    }
  }.bindObj(this);

  if(this.withoutEffects) {
    PM.UI.show(pmalert);
    afterFinishFct();
  }
  else {
    // Affichage de la Ch'Clém'up avec Effet
    PM.UI.Effect.fadeIn(pmalert, {duration: 800, callback: afterFinishFct});
  }

  if (ie6) $('pmalert_iframe').style.display = "block";
  
  // if the popup is blocking, display the background
  if (this.isModal) {
     PM.UI.Effect.fadeIn($('pmalert_bg'), {duration: 800, opacity: 0.75});
  }
}

/**
 * Lie l'affichage d'une Ch'Clém'up à un élément de la page
 * 
 * @param {String/DOM Object} obj Id de l'élément ou élément DOM auquel lier l'affichage de la Ch'Clém'up
 * @param {String} event Événement déclencheur de l'affichage (ex : "<code>click</code>")
 */
PM.Alert.prototype.bindTo = function(obj, event) {
  if (typeof(obj) == "string") obj = $(obj);
  
  PM.Event.add(obj, event, this.show.bindObj(this));
}

/**
 * Teste si l'utilisateur a cliqué sur la Ch'Clém'up ou à côté.<br/>
 * Cette fonction est appelée automatiquement lorsque la Ch'Clém'up n'est pas bloquante.
 * 
 * @ignore
 */
PM.Alert.prototype.testClick = function(event) {
  var elt = PM.Util.getElementFromEvent(event);

  while (!(PM.Dom.parent(elt) == null || (elt.tagName == "BODY" && PM.Dom.parent(elt).tagName == "HTML"))) {
    if (elt.id == "pmalert_alert") { // si l'utilisateur a cliqué sur la Ch'Clém'up
      return;
    } else {
      elt = PM.Dom.parent(elt);
    }
  }
  // the click was not on the chlemup
  if (PM.Dom.parent(elt) != null) this.shutAction();
}

/**
 * Ferme la Ch'Clém'up
 */
PM.Alert.close = function(event) {  
  if (!$('pmalert_alert')) return false;
  if (event) PM.Util.preventDefault(event);
  
  $('pmalert_alert').style.display = "none";
  
  
  if (ie6) $('pmalert_iframe').style.display = "none";
  $('pmalert_bg').style.display = "none";
  
  // deleting current object and events
  PM.Event.remove(document, "click", PM.Alert.currentClickFction);
  PM.Alert.currentClickFction = null;
 
  PM.Alert.isActive = false;
  
  //APP-34922
  if(ie7){
    if ($('IE7') != undefined) {
      PM.Dom.Class.remove($('IE7'), 'popin_active');
    }
  }
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                        PM.Geo
------------------------------------------------------------------------------*/
/**
 * @namespace Objets géométriques <code>(Doc à revoir)</code>.
 */
PM.Geo = {}

/** 
 * Box
 * Defined by width and height
 * 
 * @param s string to trim
 * @base PM.Util
 */
PM.Geo.Box = function(width, height) {
  this.w = width;
  this.h = height;
  
  // test if values are a number or not
  if (isNaN(this.w)) this.w = 0;
  if (isNaN(this.h)) this.h = 0;
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Date
------------------------------------------------------------------------------*/
/**
 * @class Objet Date <code>(doc à revoir)</code>.
 * 
 * @constructor
 * 
 * @param dateStr Can be either "2007-06-06 13:00:00", "2007-06-06" or timestamp
 */
PM.Date = function(dateStr) {
  if (dateStr) {
    // we first try to split the date
    var dateTime = dateStr.split(" ");
    var dateYMD = dateTime[0].split("-");
  }

  // if dateYMD length < 3 or dateStr is null, we suppose the date is of type timestamp
  if (typeof(dateStr) == "undefined" || dateYMD.length != 3) {
    this.storedDate = new Date();
    if (typeof(dateStr) != "undefined") this.storedDate.setTime(dateStr);
  } else {
    if (dateTime == 2) { // date and time
      var dateHMS = dateTime[1].split(":");
      this.storedDate = new Date(dateYMD[0], dateYMD[1]-1, dateYMD[2], dateHMS[0], dateHMS[1], dateHMS[2]);
    } else { // date only
      this.storedDate = new Date(dateYMD[0], dateYMD[1]-1, dateYMD[2]);
    }
  }
  
}

/**
 * Get date according to the country langage (navigator locale)
 */
PM.Date.prototype.getLocaleDate = function() {
  // TODO return the date according to the locale
  var day = this.storedDate.getDate();
  if (day < 10) day = "0"+day;
  var month = this.storedDate.getMonth()+1;
  if (month < 10) month = "0"+month;
  return day + "/" + month + "/" + this.storedDate.getFullYear()
}

/**
 * Fait en sorte que la valeur de l'élément passé en paramètre ne contient que des nombres et des /.
 */
PM.Date.check = function(elt) {
  var reg = new RegExp('[^0-9/]', 'g');
  var temp = elt.value.replace(reg, '');
  // On ne remplace la valeur que si elle est différente : cela permet de naviguer avec les flèches dans le champ.
  if (elt.value != temp) {
    elt.value = temp;
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                   PM.LinkTool
------------------------------------------------------------------------------*/
/**
 * @namespace Outils pour les liens <code>(Doc à revoir)</code>.
 */
PM.LinkTool = {}

/**
 * Go to homepage
 *
 * @base PM.LinkTool
 */
PM.LinkTool.gotoHome = function() {
  PM.BT.li(PM.BT.Action.SELF, "/");
}

/**
 * Go to a specific page
 *
 * @param lnk Link value
 */
PM.LinkTool.gotoPage = function (lnk, root) {
  s = PM.LinkTool.build(lnk,root);
  window.top.location.href = s;
}

/**
 * Open an external page in a new window
 */
PM.LinkTool.gotoExternalPage = function(lnk) {
  s = PM.LinkTool.build(lnk, true);
  window.open(s);
}

/**
 * Build javascript url (formerly jsbuild)
 * @param link : lien a builder
 * @param root : Si false ou undefined un slash précède l'url
 */
PM.LinkTool.build = function(lnk,root) {
  s="";
  if (!root || typeof(root) == "undefined")
    s = "/";
  s = s + lnk.path;

  nb = lnk.arrParameter.length;
  if (nb > 0)
    s += "?";
    
  for (i=0; i < nb; i++) {
    s += lnk.arrParameter[i];
    if (i+1 < nb) {
      s += "&"
    }
  }
  if (lnk.anch != null)
    s += "#" + lnk.anch;
  
  return s;
}

/**
 * Remove special caracters ( < > | ' ")
 */
PM.LinkTool.URLRemoveSpecialCaracters = function(sStr) {
   var encodedHtml = sStr.replace(/</g," ");
   encodedHtml = encodedHtml.replace(/>/g," ");
   encodedHtml = encodedHtml.replace(/\|/g," ");
   encodedHtml = encodedHtml.replace(/\'/g," ");
   encodedHtml = encodedHtml.replace(/\"/g," ");

   return PM.Util.trim(encodedHtml);
}

/**
 * Encode URL replacing spaces by '+' and so on...
 */
PM.LinkTool.URLEncode = function(sStr) {

  var encodedHtml = escape(sStr.replace(/ /g,"+"));
  encodedHtml = encodedHtml.replace(/\//g,"%2F");
  encodedHtml = encodedHtml.replace(/\?/g,"%3F");
  encodedHtml = encodedHtml.replace(/=/g,"%3D");
  encodedHtml = encodedHtml.replace(/&/g,"%26");
  encodedHtml = encodedHtml.replace(/@/g,"%40");

  // euro
  encodedHtml = encodedHtml.replace(/%u20AC/g,"euro");

  return encodedHtml;
}

/**
 * Asks confirmation before following a link
 */
PM.LinkTool.askConfirmation = function(link, message) {
  if (confirm(message)) location.href = link;
}

/**
 * Go to Search page
 * this method is used in FrontHeader.java
 */
PM.LinkTool.gotoSearchPage = function(servlet_name, action_name,categ_param_name,category_param_value,sub_category_param_name,sub_category_param_value, keyword_name, keyword_value) {  
  
  var url_query=servlet_name+'/'+action_name+'/'+categ_param_name+'/'+category_param_value;
  if (sub_category_param_name!='') {
    url_query=url_query+'/'+sub_category_param_name+'/'+sub_category_param_value;
  }
  url_query=url_query+'/'+keyword_name+'/'+PM.LinkTool.URLEncode(keyword_value);
  
  document.location.href = "/" + url_query;
}

/**
 * Go to Search page (NG)
 * this method is used in FrontHeader.java
 */
PM.LinkTool.gotoSearchPageNg = function(action_name, categ_name, keyword_name, keyword_value) {
  var url_query = action_name + '/'+ categ_name.substring(2, categ_name.length) ;
  if (keyword_value != ''){
    url_query += '/' + keyword_name+'/' + PM.LinkTool.URLEncode(keyword_value);
  }
  PM.LinkTool.gotoPage(new PM.Link(url_query));
}

/**
 * Go to Search All
 */
PM.LinkTool.gotoSearchAll = function(servlet_url, keyword_value, root) {
  var url_query = servlet_url + '/' ;
  if (keyword_value != ''){
    url_query += PM.LinkTool.URLEncode(PM.Util.trimStrongly(keyword_value));
  }
  PM.LinkTool.gotoPage(new PM.Link(url_query),root);
}

/**
 * Go to Shop Search All
 */
PM.LinkTool.gotoShopSearchAll = function(servlet_url, keyword_value) {
  var url_query = servlet_url;
  if (keyword_value != ''){
    url_query += PM.LinkTool.URLEncode(PM.Util.trimStrongly(keyword_value));
  }
  PM.LinkTool.gotoPage(new PM.Link(url_query), true);
}

/**
 * Go to Shop page
 * this method is used in FrontHeader.java
 */
PM.LinkTool.gotoShopPage = function(servlet_url, keyword_value) {  
  var url_query = servlet_url + '&login=' + keyword_value;
  PM.LinkTool.gotoPage(new PM.Link(url_query));
}

/**
 * Go to identification page
 * this method is used in FrontHeader.java
 */
PM.LinkTool.gotoIdentificationPage = function(servlet_url, keyword_value) {
  var url_query = servlet_url + '&reference=' + keyword_value;
  PM.LinkTool.gotoPage(new PM.Link(url_query));
}


/**
 * Check if page is filter page
 */
PM.LinkTool.isFilterPage = function(category, prefix) {
  return (category.substring(0, 2) == prefix);
}

/**
 * Go to filter page
 * Dispatches to specific methods below
 */
PM.LinkTool.gotoFilterPage = function() {
  // From "Mise en vente" et "recherche globale"
  if (arguments.length <= 2) {
    PM.LinkTool.gotoFilterPage2(arguments[0], arguments[1]);
  }
  // From filter navigation
  else {
    PM.LinkTool.gotoFilterPage4(arguments[0], arguments[1], arguments[2], arguments[3]);
  }
}

/**
 * PRIVATE! use PM.LinkTool.gotoFilterPage instead
 * Go to filter page
 */
PM.LinkTool.gotoFilterPage2 = function(filters_url, kw_url) {
  if (kw_url != undefined){
    document.location.href = filters_url + kw_url;
  }else{
    document.location.href = filters_url;
  }
}
  
/**
 * PRIVATE! use PM.LinkTool.gotoFilterPage instead
 * Go to filter page in "Mise en vente"
 */
PM.LinkTool.gotoFilterPage4 = function(url, keyword_name, keyword_value, enter_wording) { 
  if (keyword_value != enter_wording)
    document.location.href = url + '/' + keyword_name + '/'+ PM.LinkTool.URLEncode(keyword_value);  
}

/**
 * Go to sort page
 */
PM.LinkTool.gotoSortPage = function(sort_url, selected_sorting) {
  if (selected_sorting == undefined || selected_sorting == 0){      
    document.location.href = sort_url.replace('/s/1', '');
  }else{      
    document.location.href = sort_url.replace('/s/1', '/s/'+selected_sorting);
  }  
}


/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.LinkTool.askConfirmation
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function askConfirmation(link, message) {
  PM.Statistics.deprecatedFunctions("askConfirmation");
  PM.LinkTool.askConfirmation(link, message);
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.LinkTool.gotoFilterPage
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
function gotoFilterPage() {
  PM.Statistics.deprecatedFunctions("gotoFilterPage");
  PM.LinkTool.gotoFilterPage.apply(null, arguments);
}

/* END : Kept for backward compatibility */

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Link
------------------------------------------------------------------------------*/
/**
 * @class Objet Link - création de liens <code>(Doc à revoir)</code>.
 * 
 * @constructor
 */
PM.Link = function(path) {
  this.path = path;
  this.anch = null;
  this.arrParameter = new Array();
}

PM.Link.prototype = {
  add: function(p) {
    this.arrParameter[this.arrParameter.length] = p;
    return this;
  },
  
  anchor: function(p) {
    this.anch = p;
    return this;
  }
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

var Link = PM.Link;

/* END : Kept for backward compatibility */


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                     PM.Cookie
------------------------------------------------------------------------------*/

/**
 * @namespace Création et lecture de cookies <code>(doc à revoir)</code>.
 */
PM.Cookie = {}
/**
 * Set a cookie with the given value and expiration date
 *
 * @param name         Cookie's name
 * @param value        Cookie's value
 * @param options      Options du cookie. Pour garder la rétro compatibilité, on teste le type.
 *                     Si c'est un type "int", correspond au nom de jours avant que le cookie expire.
 * <ul>
 *   <li><code><b>daysToExpire</b> {int} (undefined)</code> : Nom de jours avant l'expiration du cookie.</li>
 *   <li><code><b>expirationDate</b> {int} (undefined)</code> : Timestamp du moment où le cookie doit expirer.</li>
 *   <li><code><b>isSession</b> {boolean} (false)</code> : Permet de définir le cookie comme session.<br/>
 *       Attention, si le cookie n'est pas session et qu'on n'a pas de durée d'expiration, on crée un cookie qui expirera dans 30 jours.</li>
 * </ul>
 *
 * @base PM.Cookie
 */
PM.Cookie.set = function(name, value, options) {
  var path = '; path=/';
  var expire = '';
  
  if (typeof(options) == "number") {
    options = {daysToExpire: options};
  }
  if (typeof(options) == "object" && !PM.Util.getOption(options, "isSession", false)) {

      var expirationDate = PM.Util.getOption(options, "expirationDate", null);
      var timeToExpire = PM.Util.getOption(options, "timeToExpire", null);
      var daysToExpire = PM.Util.getOption(options, "daysToExpire", 30); // par défaut, 30 jours
            
      var d = new Date();
      if (expirationDate != null) d.setTime(expirationDate);
      else if (timeToExpire != null) d.setTime(d.getTime() + parseFloat(timeToExpire));
      else d.setTime(d.getTime() + (86400000 * parseFloat(daysToExpire)));
        
      expire = '; expires=' + d.toGMTString();
  }
  
  return (document.cookie = escape(name) + '=' + escape(value.toString() || '') + path + expire);
}

/**
 * Get the cookie value
 *
 * @param  Cookie's name
 * 
 * @return Value of the cookie
 */
PM.Cookie.get = function(name) {
  var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
  return (cookie? unescape(cookie[2]) : null);
}


/**
 * Get value of a parameter for a given cookie
 *
 * @param cookieName Name of the cookie to look in
 * @param paramName  Name of the param to get
 * 
 * @return Param value
 */
PM.Cookie.getParam = function(cookieName, paramName) {
  var cookie = PM.Cookie.get(cookieName);
  if( cookie != null ) {
    var param = cookie.match(new RegExp(escape(paramName) + '=([^&]*)'));
    if (param) {
      var strParam = decodeURIComponent(param[1]);
      return unescape(strParam);
    }
  }
  
  return null;
}

/**
 * Set value of a parameter for a given cookie
 * 
 * @param options : Options du cookie. Voir PM.Cookie.set.
 *
 */
PM.Cookie.setParam = function(cookieName, paramName, paramValue, options) {
  paramValue = encodeURIComponent(paramValue);
  
  var searchValue = new RegExp(paramName+'=([^&]*)');
  
  if(userCookie = PM.Cookie.get(cookieName)) {
    if(userCookie.match(searchValue))
      userCookie = userCookie.replace(searchValue,paramName+"="+paramValue);
    else userCookie += (paramName+"="+paramValue+"&");
  } else userCookie = paramName+"="+paramValue+"&";
  
  if (typeof(options) == "undefined") {
    options = {dayToExpire: 30000}; // rétro-compatibilité. Auparavant, si aucune date d'expiration n'était définie, on définissait par défaut à 30000 jours
    PM.Debug.log("Attention : appel à la méthode PM.Cookie.setParam sans définir une date d'expiration. On le positionne à 30000 jours par défaut");
  }
  PM.Cookie.set(cookieName, userCookie, options);
}

/**
 * Erase a cookie
 *
 * @param name Name of the cookie
 */
PM.Cookie.erase = function(name) {
  var cookie = PM.Cookie.get(name) || true;
  PM.Cookie.set(name, '', -1);
  return cookie;
}

/**
 * Check if cookies are enabled in the client navigator
 *
 * @return true (enabled) or false (not enabled)
 */
PM.Cookie.accept = function() {
  if (typeof navigator.cookieEnabled == 'boolean') {
    return navigator.cookieEnabled;
  }
  PM.Cookie.set('_test', '1');
  return (PM.Cookie.erase('_test') === '1');
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Menu
------------------------------------------------------------------------------*/

/**
 * @namespace Génération et affichage du menu PriceMinister <code>(Doc à revoir)</code>.
 */
PM.Menu = {
  /**
   * @member PM.Menu
   * @base PM.Menu
   * @final
   */
  height: 25,
  opening_delay: 200, // milliseconds before the submenu opens
  closing_delay: 150,
  nb_tabs: 0,
  section: "", // can be root or whatever
  active_menu: -1,
  is_positionned: false, // whether menu is positionned relatively to the page or isn't yet
  timer: -1,
  current_menu: -1,
  level1: "menu_cat", // menu depth 1 (categories)
  level2: "submenu" // menu depth 2 (submenus)
}
  
/**
 * Places submenu correctly (with absolute positions).
 * Function called when loading and resizing the page
 * @base PM.Menu
 */
PM.Menu.setPosition = function() {
  if ($(PM.Menu.level1+'_1')) {
    PM.Menu.height = $(PM.Menu.level1+'_1').offsetHeight;
    
    for (i = 1; i <= PM.Menu.nb_tabs; i++) {
      div = $(PM.Menu.level2+"_"+i);
    if(div) {
        pos = PM.Util.absolutePosition($(PM.Menu.level1+'_'+i));
        if(pos[0] > document.documentElement.clientWidth / 2) {
          pos[0] = pos[0] - div.offsetWidth - 1 + $(PM.Menu.level1+'_'+i).offsetWidth;
        }
        div.style.left = pos[0] + "px";
        div.style.top = pos[1] + PM.Menu.height + "px";

        if(ie6) {
          $('framemenu_'+i).style.left = div.style.left;
          $('framemenu_'+i).style.top = div.style.top;
          $('framemenu_'+i).style.width = div.offsetWidth+"px";
          $('framemenu_'+i).style.height = div.offsetHeight+"px";
        }
    }
    }
    PM.Menu.is_positionned = true;
  }
}

/**
 * Called when mouse enter or leave the menu
 * When leaving, starts a timer to hide it
 * 
 * @param state 0 if leaving, 1 in entering over
 */
PM.Menu.update = function(state) {
  if (state == 0 && PM.Menu.timer == -1) {
    PM.Menu.timer = setTimeout("PM.Menu.hide_submenu()",PM.Menu.closing_delay);
  } else if (state == 1 && PM.Menu.timer != -1) {
    clearTimeout(PM.Menu.timer);
    PM.Menu.timer = -1;
  }
}

/**
 * Show given submenu
 *
 * @param num Id of the submenu to show
 */
PM.Menu.show_submenu = function(num) {
  // blur the element having focus
  if(PM.Util.whichFocus) {
    PM.Util.whichFocus.blur();
  }
  
  if (PM.Menu.is_positionned == false) PM.Menu.setPosition();
  $(PM.Menu.level1+"_"+num).className = "highlight";
  submenu = $(PM.Menu.level2+"_"+num);
  if(submenu) {
    $(PM.Menu.level1+"_"+num).className += " expand"; 
    if (ie6) $("framemenu_"+num).style.display = "block";
    submenu.style.visibility = "visible";
  }
}

/**
 * Hides the active submenu
 */
PM.Menu.hide_submenu = function(noFocus) {
  if (PM.Menu.current_menu != PM.Menu.active_menu) $(PM.Menu.level1+"_"+PM.Menu.current_menu).className = "";
    else $(PM.Menu.level1+"_"+PM.Menu.current_menu).className = "cat_on";
  submenu = $(PM.Menu.level2+"_"+PM.Menu.current_menu);
  if(submenu) {
    submenu.style.visibility = "hidden";
    if (ie6) $("framemenu_"+PM.Menu.current_menu).style.display = "none";
  }
  PM.Menu.current_menu = -1;
  
  // focus the element that had focus before showing the submenus
  if(!noFocus && PM.Util.whichFocus) PM.Util.whichFocus.focus();
}

/**
 * Called when mouse is over the menu tabs or called by the over_timer
 * Shows menu or launch timer to hide it
 *
 * @param state 0 when mouseout, 1 when mouseover
 * @param num   Menu/Submenu id
 */
PM.Menu.over = function(state,num) {
  if (num != PM.Menu.current_menu) {
    if (PM.Menu.current_menu != -1) {
      PM.Menu.hide_submenu(true);
    }
    if (state == 1) {
      PM.Menu.update(1);
      PM.Menu.show_submenu(num);
      PM.Menu.current_menu = num;
    }
  } else {
    if (state==1) {
      PM.Menu.update(1);
    } else if (state==0) {
      PM.Menu.update(0);
    }
  }
  PM.Menu.timer_activation = -1;
}

/**
 * Called when mouse is over the menu tabs - can launch a timer to actually open or close the submenu
 * 
 * @param state 0 when mouseout, 1 when mouseover
 * @param num   Menu/Submenu id
 */
PM.Menu.over_delay = function(state,num) {
  if (state == 1 && PM.Menu.current_menu == -1) {
    PM.Menu.timer_activation = setTimeout("PM.Menu.over('"+state+"','"+num+"')",PM.Menu.opening_delay);
  } else if(state == 0 && PM.Menu.timer_activation != -1) {
    clearTimeout(PM.Menu.timer_activation);
    PM.Menu.timer_activation = -1;
  } else PM.Menu.over(state, num);
}

/**
 * Function called when rolling over the submenu
 * 
 * @param event Event created by Javascript
 * @param num   Submenu id
 * @param state 0 when mouseout, 1 when mouseover
 */
PM.Menu.roll = function(event,num,state) {
  if (num == PM.Menu.current_menu) {
    source=event.srcElement? event.srcElement: event.target;
    
    if (source.tagName != "A" && source.tagName != "DIV") return;
    PM.Menu.update(state);
  }
}


/**
 * Write menu directly within the HTML
 * 
 * @param tab Menu section to be written (ROOT, SELL...)
 */
PM.Menu.write = function(tab, prefix) {
  if(typeof(prefix) == 'undefined'){
    prefix = "";
  }
  if(typeof(price_menu) != 'undefined') {
    var menuBuffer = "";
    menuBuffer += '<table border="0" cellspacing="0" cellpadding="0" class="table_menu">\n';
    menuBuffer += '<tr>';
    
    PM.Menu.section=tab;
    if(eval("price_menu."+PM.Menu.section).length) PM.Menu.section = eval("price_menu."+PM.Menu.section);
    
    PM.Menu.nb_tabs = eval("price_menu."+PM.Menu.section+".menuitems").length;
    for(i=1;i<=PM.Menu.nb_tabs;i++) {
      var item = eval("price_menu."+PM.Menu.section+".menuitems["+(i-1)+"]");
    (i==1)?first_tag=' class="first"':first_tag='';
      menuBuffer += "<td onmouseover='PM.Menu.over_delay(1,"+i+");' onmouseout='PM.Menu.over_delay(0,"+i+");' id='"+PM.Menu.level1+"_"+i+"'>";
      menuBuffer += '<a'+first_tag+' target="_top" href="'+prefix+item.link+'" onmouseover="PM.Menu.update(1)">'+item.value+'</a>';
      menuBuffer += "</td>\n";
    }

    menuBuffer += '</tr>';
    menuBuffer += '</table>';
    $('price_menu').innerHTML = menuBuffer;
  }
}

/**
 * Write all the submenus
 */
PM.Menu.write_submenus = function() {
  var subBuffer = "";
  if (ie6) {
    for(i=1;i<=PM.Menu.nb_tabs;i++) {
      subBuffer += '<iframe id="framemenu_'+i+'" src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: 190; height: 0; display:none;"></iframe>';
    }
  }
  
  // special css if sell mode
  ($("header_menu").className=="menu_sell")? sellClass = " submenu_sell": sellClass = "";
  for(i=1;i<=PM.Menu.nb_tabs;i++) {
    var item = eval("price_menu."+PM.Menu.section+".menuitems["+(i-1)+"]");
    if(item.subitems && item.subitems.length > 0) {
        subBuffer += '<div class="submenu'+sellClass+'" style="visibility: hidden;" id="'+PM.Menu.level2+'_'+i+'" onmouseover="PM.Menu.roll(event,'+i+',1);" onmouseout="PM.Menu.roll(event,'+i+',0)">';
      for(j=0;j<item.subitems.length;j++) {
        subBuffer += '<a class="'+item.subitems[j].cssclass+'" href="'+item.subitems[j].link+'">'+item.subitems[j].value+'</a>';
      }
      subBuffer += '</div>\n';
    }
  }
  $('pm_submenu').innerHTML = subBuffer;
}

/**
 * Highlight the current section given by the breadcrumbs model
 *
 * @param breadcrumbs Breadcrumbs array
 */
PM.Menu.highlight = function(breadcrumbs) {
  if(PM.Menu.section != undefined && PM.Menu.section != ""){
    for (i=0; i < breadcrumbs.length; i++) {
      submenuid = eval("price_menu."+PM.Menu.section+".alias."+breadcrumbs[i]);
      if (submenuid) {
        $(PM.Menu.level1+"_"+submenuid).className = "cat_on";
        PM.Menu.active_menu = submenuid;
        return;
      }
    }
  }
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                        PM.Dom
------------------------------------------------------------------------------*/

/**
 * @namespace Outils d'utilisation du Dom <code>(doc à revoir)</code>.
 * Permet de créer et manipuler des éléments du Dom facilement.
 */
PM.Dom = { }

/**
 * Creates a new link and return it
 *
 * @param href            Location
 * @param text [optional] Link text
 * @param id [optional]   ID if any
 *
 * @return Link element
 *
 * @base PM.Dom
 */
PM.Dom.createLink = function(href,linkContent,id,className) {
  var newLink = document.createElement('a');
  newLink.href = href;
  if(linkContent) {
    if (typeof(linkContent) == "string")
      newLink.appendChild(document.createTextNode(linkContent));
    else
      newLink.appendChild(linkContent);
  }   
  if(id)        newLink.id = id;
  if(className) newLink.className = className;
  return newLink;
}

/**
 * Crée une nouvelle image et la retourne
 *
 * @param url   Image URL
 * @param alt   Text alternative (if any)
 *
 * @return Image element
 */
PM.Dom.createImage = function(url,alt) {
  var newImage = document.createElement('img');
  newImage.src = url;
  if(url)        newImage.alt = alt;
  
  return newImage;
}

/**
 * Retourne le premier fils d'un élément DOM. Ignore les noeuds DOM vides
 */
PM.Dom.firstChild = function(obj) {
  var firstChild = obj.firstChild;
  if (firstChild != null && firstChild.nodeType != 1) firstChild = PM.Dom.nextObject(firstChild);
  return firstChild;
}

/**
 * Retourne l'élément suivant d'un élément DOM. Ignore les noeuds DOM vides
 */
PM.Dom.nextObject = function(obj) {
  if(obj){
    do obj = obj.nextSibling;
    while (obj && obj.nodeType != 1);
    return obj;
  }
}

/**
 * Retourne l'élément précédent d'un élément DOM. Ignore les noeuds DOM vides
 */
PM.Dom.previousObject = function(obj) {
  do obj = obj.previousSibling;
  while (obj && obj.nodeType != 1);
  return obj;
}

/**
 * Retourne l'élément parent d'un élément DOM
 */
PM.Dom.parent = function(obj) {  
  obj = $(obj);
  
  if (document.all) { // IE case
    return obj.parentElement;
  } else {
    return obj.parentNode;
  }
}

/**
 * Efface tous les enfants d'un élément DOM
 */
PM.Dom.removeChildren = function(obj) {
  while (obj.childNodes.length >= 1 )
  {
    obj.removeChild(obj.firstChild);
  }
}

/**
 * Create a new DOM element and add it a class or/and an id
 * 
 * @param type  Type of the element to create (div, span,...)
 * @param options  Different options :
 *                  - className: Name of the class
 *                  - id: Id of the element
 *                  - content: element content (either string or dom element)
 */
PM.Dom.createElement = function(type, options) {
  var newElt = document.createElement(type);
  if (options) {
    if (options.className) newElt.className = options.className;
    if (options.id) newElt.id = options.id;
    if (options.content) {
      if (typeof(options.content) == "string")
        newElt.appendChild(document.createTextNode(options.content));
      else
        newElt.appendChild(options.content);
    }
    if (options.rowSpan) newElt.rowSpan = parseInt(options.rowSpan);
    if (options.href) newElt.href = options.href;
    if (options.display) newElt.style.display = options.display;
    if (options.title) newElt.title = options.title;
    if (options.htmlfor) newElt.htmlFor = options.htmlfor;
  }
  
  return newElt;
}

/**
 * 
 * @param {Object} child
 * @param {Object} parent
 */
PM.Dom.withinElement = function(child, parent) {
  while(child && child != parent) {
    child = PM.Dom.parent(child);
  }
  return child == parent;
}


/**
 * @namespace Gestion des classes (ajout, suppression, remplacement)
 */
PM.Dom.Class = {}

/**
 * Vérifie si une classe est présente ou non sur un élément
 * 
 * @param {String/DOM Object} obj - L'élément du DOM pour lequel on souhaite vérifier la présence d'une classe. 
 *        Ce paramètre peut être soit l'id, soit l'élément lui-même. 
 * @param {String} className - Classe CSS à vérifier.
 */
PM.Dom.Class.has = function(obj, className) {
  obj = $(obj);
    return (obj && className && obj.className.match(className)); 
}

/**
 * Ajoute une classe à un élément
 * 
 * @param {String/DOM Object} obj - L'élément du DOM auquel on souhaite ajouter une classe, ou une liste d'objets.
 *        Ce paramètre peut être soit l'id, soit l'élément lui-même, soit une liste d'objets. 
 * @param {String} className - Classe CSS à ajouter.
 */
PM.Dom.Class.add = function(obj, className) {
  if (PM.Util.isArrayOrCollection(obj)) {
    for (var n=0; n<obj.length; n++) {
      PM.Dom.Class.add(obj[n], className);
    }
    return;
  }
  if (!PM.Dom.Class.has(obj, className)) {
    obj.className += " " + className;
  }
}

/**
 * Remplace une classe d'un élément par une autre
 * 
 * @param {String/DOM Object/liste de DOM Objects} obj - L'élément du DOM sur lequel on souhaite remplacer une classe, ou une liste d'objets. 
 *        Ce paramètre peut être soit l'id, soit l'élément lui-même, soit une liste d'éléments. 
 * @param {String} sourceClassName - Classe CSS que l'on veut remplacer.
 * @param {String} targetClassName - Classe CSS par laquelle remplacer l'ancienne classe.
 */
PM.Dom.Class.replace = function(obj, sourceClassName, targetClassName) {
  if (PM.Util.isArrayOrCollection(obj)) {
    for (var n=0; n<obj.length; n++) {
      PM.Dom.Class.replace(obj[n], sourceClassName, targetClassName);
    }
    return;
  }
  obj = $(obj);
  if (obj) {
    if ('' == sourceClassName) {
      PM.Dom.Class.add(obj, targetClassName);
    } else {
      obj.className = obj.className.replace(new RegExp(sourceClassName, 'g'), targetClassName);
    }
  }
}

/**
 * Supprime une classe d'un élément
 * 
 * @param {String/DOM Object/liste de DOM Objects} obj - L'élément du DOM duquel on souhaite supprimer une classe, ou une liste d'objets. 
 *        Ce paramètre peut être soit l'id, soit l'élément lui-même, soit une liste d'éléments. 
 * @param {String} className - Classe CSS à supprimer.
 */
PM.Dom.Class.remove = function(obj, className) {
  PM.Dom.Class.replace(obj, className, "");
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Comparator
------------------------------------------------------------------------------*/

/**
 * @namespace Affichage du comparateur de produits Price <code>(doc à revoir)</code>.
 */
PM.Comparator = {
  separator:   "*", // WARNING : when changing this value, change it in "CompareAction.java" and "FrontRequest.java" as well
  maxProducts: 5
}
  
/**
 * Clear the comparator
 * 
 * @base PM.Comparator
 */
PM.Comparator.clear = function() {
  PM.Cookie.erase(PM.Comparator.Cookie.Product);
  PM.Cookie.erase(PM.Comparator.Cookie.Group);
}

/**
 * Checks if comparator has a product
 *
 * @param id Product id
 */
PM.Comparator.hasProduct = function(id) {
  var currentProduct = PM.Cookie.get(PM.Comparator.Cookie.Product);
  return (currentProduct.indexOf(PM.Comparator.separator + id + PM.Comparator.separator) >= 0);
}

/**
 * Checks if the comparator is full
 */
PM.Comparator.isFull = function() {
  var currentProduct = PM.Cookie.get(PM.Comparator.Cookie.Product);
  if(!currentProduct) return false;
  currentProduct = currentProduct.substring(1, currentProduct.length-1);
  var product_array = currentProduct.split(PM.Comparator.separator);
  
  if(product_array.length < PM.Comparator.maxProducts) return false; else return true;
}

/**
 * Checks if the comparator is empty
 */
PM.Comparator.isEmpty = function() {
  var currentProduct = PM.Cookie.get(PM.Comparator.Cookie.Product);
  if (!currentProduct || currentProduct == PM.Comparator.separator || currentProduct == '') return true; else return false;
}

/**
 * Checks if the comparator has elements from the same group
 *
 * @param group Group id to check
 */
PM.Comparator.isSameGroup = function(group) {
  var currentGroup = PM.Cookie.get(PM.Comparator.Cookie.Group);
  if (!currentGroup || currentGroup == '') {
    return true;
  } else {
    return (group == currentGroup);
  }
}

/**
 * Add a product of a group in the comparator
 *
 * @param url      URL of the compare tool
 * @param addMsg   Message to display when adding product
 * @param differentTypeMsg Alert when product to add is not in the same group than the product(s) in the comparator
 * @param fullMsg  Message displayed if the comparator is full
 * @param group    Product's group
 * @param id       Product's id
 * @param add      Add or remove the product
 */   
PM.Comparator.add = function(url, addMsg, differentTypeMsg, fullMsg, group, id, add) {
  if (!PM.Comparator.isSameGroup(group)) {
    if (confirm(differentTypeMsg)) {
      PM.Comparator.clear();
    } else {
      return false;
    }
  }
  else if (PM.Comparator.isFull()) {
    alert(fullMsg);
    PM.PopUp.open(url, PM.PopUp.Type.COMPARATOR);
    return false;
  }
  var isFirst = PM.Comparator.isEmpty();
  var currentProduct = PM.Comparator.separator;
  if (isFirst) {
    alert(addMsg);
  } else {
    currentProduct = PM.Cookie.get(PM.Comparator.Cookie.Product);
  }
  
  if (isFirst || !PM.Comparator.hasProduct(id))
    currentProduct = currentProduct + id + PM.Comparator.separator;

  // Overwrite cookies
  PM.Cookie.set(PM.Comparator.Cookie.Product, currentProduct);
  PM.Cookie.set(PM.Comparator.Cookie.Group, group);

  if (!isFirst)
    PM.PopUp.open(url, PM.PopUp.Type.COMPARATOR);
  window.location.reload();
  
  return false;
}

/**
 * Remove a product from the comparator
 *
 * @param url [optional] URL of the compare tool
 * @param id             ID of the product to remove
 */
PM.Comparator.remove = function(url, id) {
  var products = PM.Cookie.get(PM.Comparator.Cookie.Product);
  PM.Cookie.set(PM.Comparator.Cookie.Product, products.replace(PM.Comparator.separator + id,''));

  if(PM.Comparator.isEmpty()) PM.Comparator.clear();
  if (url) PM.PopUp.open(url, PM.PopUp.Type.COMPARATOR);
  
  window.location.reload();
}

/**
 * Cookies names
 *
 * @base PM.Comparator
 */
PM.Comparator.Cookie = {
    Group:      "comparegroup",
    Product:    "compareproduct"
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Cart
------------------------------------------------------------------------------*/

/**
 * @namespace Outil de gestion du pannier dans le header <code>(doc à revoir)</code>.
 */
PM.Cart = {
  Cookie: 'cart'
}
  
/**
 * Display the cart (new header).
 *
 * @param linkUrl the url of the link.
 * @param itemText the text for singular item.
 * @param itemsText the text for plural items.
 *
 * @base PM.Cart
 */
PM.Cart.display = function(linkUrl, itemText, itemsText, nbItems) {
  var cart = nbItems;
  var items = $('cart_items');
  if (items) {
    // clear
    for (var i = 0; i < items.childNodes.length; ++i) {
      items.removeChild(items.childNodes.item(i));
    }

    // fill
    items.appendChild(document.createTextNode('('));
    var elt = items;
    if (cart != null && cart > 0) {
      var cartLink = PM.Dom.createLink(linkUrl);
      items.appendChild(cartLink);
      elt = cartLink;
    } else {
      cart = 0;
    }
    if (cart > 1) {
      elt.appendChild(document.createTextNode(cart + ' ' + itemsText));
    } else {
      elt.appendChild(document.createTextNode(cart + ' ' + itemText));
    }
    items.appendChild(document.createTextNode(')'));
  }
}

/**
 * Display the cart (still used for cobrandings).
 *
 * @param needLabel indicator to know if the label is needed.
 * @param linkUrl the url of the link.
 * @param linkContent the text content of the link.
 * @param itemText the text for singular item.
 * @param itemsText the text for plural items.
 */
PM.Cart.display_cob = function(needLabel, linkUrl, linkContent, itemText, itemsText, nbItems) {
  var cart = nbItems;
  if (!cart || needLabel || cart != 0) {
    document.write('<a href="' + linkUrl + '" class="panier">' + linkContent + '</a>');
  }
  if(cart) {
    if (cart != 0) {
      document.write('<a href="' + linkUrl + '" class="nonu">');
      if (cart > 1) {
        document.write(cart + ' ' + itemsText);
      } else {
        document.write(cart + ' ' + itemText);
      }
      document.write('</a>');
    }
  }
}

/**
 * Return true if the cart exists, false otherwise
 */
PM.Cart.exists = function() {
  var value = PM.Cookie.getParam(PM.Cart.Cookie, "nb");
  if (value != "" && value != 0) return true; else return false;
}
  



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Memo
------------------------------------------------------------------------------*/

/**
 * @namespace Outils Memo <code>(Doc à revoir)</code>.
 */
PM.Memo = {
  Cookie: 'memo'
}
  
/**
 * Checks if memo exists
 *
 * @base PM.Memo
 */
PM.Memo.exists = function() {
  var value = PM.Cookie.get(PM.Memo.Cookie);
  return (value != "" && value != 0);
}


/**
 * Display the memo.
 *
 * @param vehicle  The text for sin?gular vehicule.
 * @param vehicles The text for plural vehicles.
 */
PM.Memo.display = function(vehicle, vehicles) {
  var value = PM.Cookie.get(PM.Memo.Cookie);
  if (value > 1) {
    document.write(value + ' ' + vehicles);
  } else {
    value = value == 1 ? value : 0;
    document.write(value + ' ' + vehicle);
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Spot
------------------------------------------------------------------------------*/

/**
 * @namespace Fonctions utilisées par l'outil Spot <code>(Doc à revoir)</code>.
 */
PM.Spot = { }
/**
 * Show IG button
 *
 * @param codecmsbutton Link for IG button
 * @param node          Element to show the button next to
 *
 * @base PM.Spot
 */
PM.Spot.showCmsButton = function(codecmsbutton, node) {
  //Write code into div balise
  $("divCms").innerHTML = "<a href=\"" + codecmsbutton + "\" class=\"bg_bo\">IG</a>";
  //find button's location from label's location
  var delta = node.offsetWidth;
  var coord = PM.Util.absolutePosition(node);
  var newX = coord[0] + delta;
  //Place the button
  if(document.all){
    // Code for IE
    $("divCms").style.setAttribute("cssText","position:absolute;left:" + newX + "px;top:" + coord[1] + "px;z-index:200");
  }
  else {
    // Code for other navigators
    $("divCms").setAttribute("style","position:absolute;left:" + newX + "px;top:" + coord[1] + "px;z-index:200");
  }
}

/**
 * Hide IG button
 */
PM.Spot.hideCmsButton = function() {
  $("divCms").setAttribute("style","display:none");
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Ajax
------------------------------------------------------------------------------*/

/**
 * @namespace Méthodes PriceMinister pour les requêtes Ajax.
 */
PM.Ajax = {
  GET:  1,
  POST: 2,
  
  activeRequests: {},
  disablers: {}
}
  
/**
 * Get XmlHttpRequest object according to the navigator.
 *
 * @return XMLHttpRequest or ActiveX object for Ajax
 * @ignore
 */
PM.Ajax.getXmlHttpObject = function() {
  if (window.XMLHttpRequest)
    return new XMLHttpRequest();
  else
    return new ActiveXObject("Microsoft.XMLHTTP");
}

/**
 * Met à jour le contenu d'un élément DOM après une requête Ajax
 *
 * @ignore
 * @param options  PM.Ajax options
 */
PM.Ajax.updateDiv = function(options) {
  if(options.updateId) {
    var content = options.XmlHttpObject.responseText;
    
    var tagRegExp = '{.*(values|"action":"AuthenticateAjaxResponseAction")+.*(values|"action":"AuthenticateAjaxResponseAction")+.*}';
    var matchTag = new RegExp(tagRegExp, 'i');
    
    if (content.match(matchTag)){
      eval("var res = " + content);
      PM.Ajax.authenticate({ loginURL : res.values.loginURL});
    }
    else {
      $(options.updateId).innerHTML = content;
      
      if(options.evalScripts) {
        PM.Util.evalScript(content);
      }
    }
  }
}

PM.Ajax.isNotAuthenticateAjaxResponse = function(content){
  var tagRegExp = '{.*(values|"action":"AuthenticateAjaxResponseAction")+.*(values|"action":"AuthenticateAjaxResponseAction")+.*}';
  var matchTag = new RegExp(tagRegExp, 'i');
  
  return content.match(matchTag);
}


/**
 * Exécute une requête Ajax puis appelle une fonction de callback
 *
 * @param {String}      url           URL à appeler en Ajax
 * @param {Function}    callFunction  Méthode à appeler lorsque la requête a retourné un résultat.
 *                                    Peut être 'null' si aucune fonction ne doit être appelée.
 * @param {JSON Object} options       Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 *   <li><code><b>method</b> (PM.Ajax.GET)</code> : Méthode utilisée (Get ou Post).</li>
 *   <ul>
 *     <li><code>PM.Ajax.GET</code></li>
 *     <li><code>PM.Ajax.POST</code></li>
 *   </ul>
 *   <li><code><b>urlParams</b></code> : paramètres de requête, sous la forme <code>toto=1&pm=yes</code>.</li>
 *   <li><code><b>waitId</b></code> : identifiant d'un div indiquant que la page est en cours de chargement ("loader").
 *   Ce div est affiché au début de la requête puis masqué lorsque celle-ci est terminée.</li>
 *   <li><code><b>updateId</b></code> : identifiant de l'élément à mettre à jour. Voir PM.Ajax#update</li>
 *   <li><code><b>isAsynchronous</b> (true)</code> : définit si la requête est asynchrone ou non</li>
 *   <li><code><b>errorCallback</b></code> : fonction de callback à appeler lorsque la requête Ajax retourne une erreur</li>
 *   <li><code><b>XmlHttpObject</b></code> : Objet résultat de la requête Ajax,  fourni à la fonction de callback.</li>
 *   <li><code><b>preventMultipleCalls</b></code> {id|DOM Object} (null) : Empêche les appels multiples lorsque la requête est en cours. Il faut associer un id ou un élément afin de pouvoir différencier les appels Ajax</li>
 *   <li><code><b>disableBlockWhenSubmitting</b></code> {boolean} (true si preventMultipleCalls définie) : Affiche un bloc grisé sur la zone dont l'identifiant a été passé en paramètre. Option valide uniquement si preventMultipleCalls est définie. L'id passé dans le paramètre preventMultipleCalls est alors utilisé comme zone à masquer.</li>
 *   <li><code><b>timeOut</b></code> {boolean} (null) : Interrompt la requête si elle est trop longue et appelle la méthode de callback errorCallback si elle est définie.
 * </ul>
 * Il est également possible de passer ses propres "options", qui seront transmises à la fonction de callback (ex: <code>options.toto</code>)
 */
PM.Ajax.request = function(url, callFunction, options) {
  if (!options) options={};
  
  var disableBlockWhenSubmitting = (typeof options.disableBlockWhenSubmitting=="undefined") || options.disableBlockWhenSubmitting;
  var isAsynchronous = (typeof options.isAsynchronous=="undefined") || options.isAsynchronous;
  var XmlHttpObject = PM.Ajax.getXmlHttpObject();
  
  
  // Si l'option preventMultipleCalls est activée ==> on empêche une multiple soumission
  if (options.preventMultipleCalls) {
    if (PM.Ajax.activeRequests[options.preventMultipleCalls] == true) {
      return false;
    }
    PM.Ajax.activeRequests[options.preventMultipleCalls] = true;
    
    if (disableBlockWhenSubmitting) { // permet d'afficher un bloc grisé
      if (typeof(PM.Ajax.disablers[options.preventMultipleCalls]) == "undefined") {
        PM.Ajax.disablers[options.preventMultipleCalls] = new PM.UI.BlockDisabler(options.preventMultipleCalls, {withLoader: true});
      }
      PM.Ajax.disablers[options.preventMultipleCalls].disable();
    }
  }
  
  if (isAsynchronous) {
    // function called on server answer
    /**
     * @ignore
     */
    XmlHttpObject.onreadystatechange = function() {
      if(XmlHttpObject.readyState == 4) { // if the request went fine
         // if the response is an HTML document, then there is an error :
         // the function display it, replacing the page content
         clearTimeout(options.timeOutRef); // suppression du timeout éventuellement mis
         response = XmlHttpObject.responseText;
         if (response != null) {
           if (!response.match(new RegExp("<html[^>]*>", "i"))) {
             // recherche d'un marquage XiTi
             var tagRegExp = '{.*(values|"action":"tag")+.*(values|"action":"tag")+.*}';
             var matchTag = new RegExp(tagRegExp, 'i');
             var tagArray = response.match(matchTag);
             response = response.replace(matchTag, "");
             
             if (XmlHttpObject.status == 200) { // call the given function if everything was allright
               // on redéfinit le XmlHttpObject, car il a pu être modifié avec la suppression des données XiTi
               options.XmlHttpObject = { responseText: response, responseXML: XmlHttpObject.responseXML };
               if (options.XmlHttpObject.responseText) options.responseText = response; // pour compatibilité avec Prototype
               
               if(callFunction) callFunction.apply(null, [options]);
               if(options.waitId && $(options.waitId)) {
                 $(options.waitId).style.visibility = "hidden";
               }
             }
             
             if (tagArray) {
               // on pose le tag XiTi avec les données fournies par la réponse :
               eval("var res = " + tagArray[0]);
               var tmp_xtpage = res.values.xtpage;
               if (res.values.xtparams) tmp_xtpage += "&" + res.values.xtparams;
               PM.Statistics.tagView(res.values.s2, tmp_xtpage);
             }
         
           } else { // if an error function is given in parameter, we call it
             if (options.errorCallback) options.errorCallback.apply(null, [options]);
             if(options.waitId) {
               $(options.waitId).style.visibility = "hidden";
             }
           }
       
         } // end is null
         
         if (options.preventMultipleCalls) {
           PM.Ajax.activeRequests[options.preventMultipleCalls] = false;
           
           if (disableBlockWhenSubmitting) {
             PM.Ajax.disablers[options.preventMultipleCalls].enable();
           }
         }
      }
    };
  }

  if (options.waitId && $(options.waitId)) {
    $(options.waitId).style.visibility = "visible";
  }
  
  
  
  // different method for GET and POST
  if(options.method && options.method == PM.Ajax.POST) {
    XmlHttpObject.open("POST", url, isAsynchronous);
    
    // Headers spécifiques
    if (options.requestHeaders) {
      for (key in options.requestHeaders) {
        XmlHttpObject.setRequestHeader(key, options.requestHeaders[key]);
      }
    }
    XmlHttpObject.setRequestHeader("X-AjaxRequest", "1");
    XmlHttpObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    if(options.urlParams)
      XmlHttpObject.send(options.urlParams);
    else
      XmlHttpObject.send(null);
  }
  else {
    if(options.urlParams) url += (url.match(/\?/) ? "&" : "?") + options.urlParams;
    XmlHttpObject.open("GET", url, isAsynchronous);
    XmlHttpObject.setRequestHeader("X-AjaxRequest", "1");
    XmlHttpObject.send(null);
  }
  
  var timeOutDelay = PM.Util.getOption(options, "timeOut", null);
  options.timeOutRef = null;
  if (timeOutDelay) options.timeOutRef = setTimeout(PM.Ajax.timeOut.bindObj(null, XmlHttpObject, options), timeOutDelay);

  if (! isAsynchronous) {
    options.XmlHttpObject = XmlHttpObject;
    
    clearTimeout(options.timeOutRef);
    if(callFunction) callFunction.apply(null, [options]);
    if(options.waitId) {
      $(options.waitId).style.visibility = "hidden";
    }
  }
}
/**
 * Appel à la méthode ajax de jquery de facon synchrone
 * Pour les options voir la doc jquery : http://api.jquery.com/jQuery.ajax/
 */
PM.Ajax.syncRequest = function(data){
  data.async = false;
  $j.ajax(data);
}

PM.Ajax.seekXitiTags = function(response){
//Recherche d'un marquage XITI
  if (!response.match(new RegExp("<html[^>]*>", "i"))) {
    var tagRegExp = '{.*(values|"action":"tag")+.*(values|"action":"tag")+.*}';
    var matchTag = new RegExp(tagRegExp, 'i');
    var tagArray = response.match(matchTag);
    response = response.replace(matchTag, "");
    if (tagArray) {
      // on pose le tag XiTi avec les données fournies par la réponse :
      eval("var res = " + tagArray[0]);
      var tmp_xtpage = res.values.xtpage;
      if (res.values.xtparams) tmp_xtpage += "&" + res.values.xtparams;
      PM.Statistics.tagView(res.values.s2, tmp_xtpage);
    }
  }
  return response;
}

/**
 * Méthode appelée en cas de timeout sur la requête
 * 
 * @ignore
 */
PM.Ajax.timeOut = function(XmlHttpObject, options) {
  PM.Debug.log("Requête Ajax interrompue - Timeout " + options.timeOut);
  XmlHttpObject.abort();
  
  // appel de la méthode d'erreur
  if (options.errorCallback) options.errorCallback.apply(null, [options]);
}

/**
 * Met à jour un élément du DOM avec le résultat d'une requête Ajax
 *
 * @param {String}            url     URL à appeler en Ajax
 * @param {String|DOM Object} divId   Élément DOM à mettre à jour
 * @param {JSON Object}       options Options supplémentaires. Voir PM.Ajax#request
 *
 * Il est également possible de passer ses propres "options", qui seront transmises à la fonction de callback (ex: <code>options.toto</code>)
 */
PM.Ajax.update = function(url, divId, options) {
  if (!options) options={};
  options.updateId = divId;
  PM.Ajax.request(url, PM.Ajax.updateDiv, options);
}



/**
 * Redirige vers une URL d'authentification après un retour Ajax.
 *
 * @param {JSON Object} options  Options PM.Ajax
 */
PM.Ajax.authenticate = function(options) {
  window.location.href = options.loginURL;
}

/**
 * Lance un "batch" de requêtes Ajax
 * 
 * @param {JSON Object} options  Options PM.Ajax contenant au minimum le paramètre suivant :
 * <ul>
 *   <li><code><b>requests</b></code> : tableau contenant les requêtes Ajax à effectuer</li>
 *   <li><code><b>onFinish</b></code> : méthode de callback à appeler lorsque toutes les requêtes ont été effectuées</li>
 *   <li><code><b>disabledBlock</b></code> : bloc à désactiver lors de la soumission</li>
 * </ul>
 */
PM.Ajax.chainedRequests = function(options) {  
  // on récupère la requête à effectuer
  var requests = PM.Util.getOption(options, "requests", null);
  var disabledBlock = PM.Util.getOption(options, "disabledBlock", null);
  if (requests == null) return; // s'il n'y a pas de requêtes à effectuer, on n'a rien à faire là
  var requestCount = PM.Util.getOption(options, "requestCount", -1) + 1; // requête en cours
  
  // premier appel : on affiche un bloc disabler seulement si bloc à désactiver passé en paramètre
  if (disabledBlock != null) {
    if (requestCount == 0) {
      options.disabler = new PM.UI.BlockDisabler(disabledBlock, {withLoader: true, loaderText: PM.Util.getOption(options, "loaderText", undefined), progressBar: true});
      options.disabler.disable();
    } else {
      options.disabler.progress(requestCount, requests.length);
      
      var results = PM.Util.getOption(options, "reqResults", new Array());
      results[results.length] = PM.Util.getOption(options, "responseText", "");
      options.reqResults = results;
    }
  }
  
  options.requestCount = requestCount;
  if (requestCount < requests.length) {
    var request = requests[requestCount];
    options.urlParams = request.urlParams;
    PM.Ajax.request(request.url, PM.Ajax.chainedRequests, options);
  } else {
    if (disabledBlock != null) {
      options.disabler.enable();
    }
    PM.Util.getOption(options, "onFinish", function() { }).apply(null, [PM.Util.getOption(options, "reqResults", new Array())]);
  }
}


PM.Ajax.HtmlAppender = function(url, divId, lastPaginationKey, hasMoreResults) {
  this.url               = url;
  this.divId             = divId;
  this.lastPaginationKey = lastPaginationKey;
  this.hasMoreResults    = hasMoreResults;
}

PM.Ajax.HtmlAppender.prototype.appendTo = function(options) {
  if (!options) options={};
  PM.Util.setOption(options, 'appendId', this.divId,true);
  PM.Util.setOption(options, 'urlParams', PM.Util.getOption(options,'urlPaginationKeyName') + '=' + this.lastPaginationKey, true);  
  PM.Ajax.request(this.url, PM.Ajax.HtmlAppender.appendToDiv.bindObj(this), options);
}

/**
 * Ajoute au contenu d'un élément DOM le contenu d'une requête Ajax
 *
 * @ignore
 * @param options  PM.Ajax options
 */
PM.Ajax.HtmlAppender.appendToDiv = function(options) {
  if(options.appendId) {
    var content = options.XmlHttpObject.responseText;
    var tagRegExp = '{.*(values|"action":"AuthenticateAjaxResponseAction")+.*(values|"action":"AuthenticateAjaxResponseAction")+.*}';
    var matchTag = new RegExp(tagRegExp, 'i');
    PM.Debug.log(content.match(matchTag));
    if (content.match(matchTag)){
      eval("var res = " + content);
      PM.Ajax.authenticate({ loginURL : res.values.loginURL});
    }
    else {
      matchTag = new RegExp('{"'+PM.Util.getOption(options,'urlPaginationKeyName')+'":"([0-9]*)","'+PM.Util.getOption(options,'hasMoreResultKeyName')+'":"(true|false)"}', 'i');
      var exec = matchTag.exec(content);
      this.lastPaginationKey = exec[1];
      this.hasMoreResults = exec[2];
      content = content.replace(matchTag, "");

      var noResultsFct = PM.Util.getOption(options, "noResultsFct");  

      if (this.hasMoreResults == 'false'){
        if (noResultsFct != null) noResultsFct.apply(null);
      }
    
      $j(content).appendTo($(options.appendId)) ;
    
      var callbackMethod = PM.Util.getOption(options,'callbackMethod');
      if (callbackMethod){
        callbackMethod.apply(null);
      }
    }
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Statistics
------------------------------------------------------------------------------*/

/**
 * Regroupe les outils statistiques PriceMinister
 *
 * @namespace
 */
PM.Statistics = {}

/**
  * <ul>
  *   <li><code>NAVIGATION</code> : Clic de navigation</li>
  *   <li><code>OUT</code> : Clic de sortie</li>
  *   <li><code>ACTION</code> : Clic d'action</li>
  * </ul>
*/
PM.Statistics.Type = {
    NAVIGATION: "N",
    OUT: "S",
    ACTION: "A"
}

PM.Statistics.Xtn2 = {
    ROOT: "0",
    MARKETING: "5",
    ACCOUNT: "6",
    CART: "26",
    FPDA: "31",
    OTHERS: "35",
    COMMUNITY: "38",
    SHOP: "24"
}

/**
 * Pose d'un tag XiTi de page vue.<br/>
 * Si la librairie XiTi n'est pas encore chargée, alors on ajoute un événement
 * pour le faire une fois la librairie chargée.
 * 
 * @param s2 {String|null} Site de niveau 2. Si s2 vaut null, alors le site de niveau 2 de la page (xtn2) est utilisé.
 * @param xtpage {String}  Page (ex : "Chapitre::Page")
 */
PM.Statistics.tagView = function(s2, xtpage) {
  if(typeof(xt_med) != "undefined") {
    if (s2 == null) s2 = window.xtn2; // si aucun site de niveau 2 n'est défini, on utilise celui global
    xt_med('F', s2, xtpage);
  }
  else {
    PM.Event.add(window, PM.Event.Type.STATISTICS, PM.Statistics.tagView.bindObj(window, s2, xtpage));
  }
}

/**
 * Pose d'un tag XiTi de clic.<br/>
 * Si la librairie XiTi n'est pas encore chargée, alors on ajoute un événement
 * pour le faire une fois la librairie chargée.
 *
 * @param s2 {String|null} Site de niveau 2. Si s2 vaut null, alors le site de niveau 2 de la page (xtn2) est utilisé.
 * @param name {String}    Nom du clic (ex : PageOrigine::BlocContenu::Destination)
 * @param type             Type de clic (de type PM.Statistics.Type) :
 *   <ul>
 *     <li><code>PM.Statistics.Type.NAVIGATION</code> (Clic de navigation)</li>
 *     <li><code>PM.Statistics.Type.OUT</code> (Clic de sortie)</li>
 *     <li><code>PM.Statistics.Type.ACTION</code> (Clic d'action)</li>
 *   </ul>
 */
PM.Statistics.tagClick = function(s2, name, type) {
  if(typeof(xt_med) != "undefined") {
    if (s2 == null) s2 = window.xtn2; // si aucun site de niveau 2 n'est défini, on utilise celui global
    xt_med('C', s2, name, type)
  }
  else {
    PM.Event.add(window, PM.Event.Type.STATISTICS, PM.Statistics.tagClick.bindObj(window, s2, name, type));
  }
  PM.Statistics.log("tagClick >> " + name + " (s2 = " + s2 + ", type = " + type + ")");
  PM.Debug.log("Tag de clic (s2 = " + s2 + ") >> " + name, PM.Debug.Type.DEBUG);
}

/**
 * Appel la fonction xt_ad lors d'un clic sur un tag Xiti
 * @param {String} autoPromoId  Identifiant d'un clic de la forme INT-X-Y
 */
PM.Statistics.autopromoClick = function(autoPromoId) {
  xt_ad(autoPromoId);
  PM.Statistics.log("addAutopromoClick " + autoPromoId);
}

/**
 * Ajoute un nouvel identifiant d'une campagne d'autopromotions
 * à la liste des identifiants existante.
 *
 * Les doublons sont automatiquement supprimés dans le cas ou un ID existant est ajouté dans la même page.
 * @param {String} autoPromoId  Identifiant d'une campagne d'autopromotion de la forme INT-X-Y||Z
 * @return true si l'autoPromo a bien été ajoutée, sinon false (par ex si c'est un doublon)
 */
PM.Statistics.autopromoView = function(autoPromoId) {
  var added = false;

  // Dans tous les cas (avant ou après le chargement de la page) on inscrit l'id dans la liste
  if (window.xt_ati != null) {
    // évite les doublons
    if(! window.xt_ati.match(new RegExp(PM.Util.string2Regexp(autoPromoId), "i"))) {
      window.xt_ati += "," + autoPromoId;
      added = true;
    }
  } else {
    window.xt_ati = autoPromoId;
    added = true;
  }

  // Cas ou l'id a bien été ajouté dans la liste et on est après le chargement de la page
  // On envoi une image pour faire un hit XITI
  if(added == true && (PM.Event.getCurrentStatus() == PM.Event.Type.COMPLETE || PM.Event.getCurrentStatus() == PM.Event.Type.STATISTICS)) {
    var url = "http://logc11.xiti.com/get.ad?xts=";
    if(PM.Context.get('https') == true) {
      url = "https://logs11.xiti.com/get.ad?xts=";
    }
    var im_autopromo_url = url+site_niveau1;
    var date = new Date();

    im_autopromo_url += "&ati=" + autoPromoId;
    im_autopromo_url += "&type=AT&rn="+date.getHours()+"x"+date.getMinutes()+"x"+date.getSeconds();
    im_autopromo_url += "&url=" + PM.Constants.blankImg;

    // Affiche l'image pour faire le hit
    PM.Image.load(im_autopromo_url);
  }

  if(added) {
    PM.Statistics.log("addAutopromoView " + autoPromoId);
  }

  return added;
}
/**
 * Ajoute un tag d'impression d'un autopromotion et un événement si on clique sur celle-ci
 *
 * @param {Object} elt  Element (autopromotion) sur lequel il faut placer le tag de click
 * @param {String} autoPromoId  Identifiant d'une campagne d'autopromotion de la forme INT-X-Y||Z
 * @return true si l'autoPromo a bien été ajoutée, sinon false (par ex si c'est un doublon)
 */
PM.Statistics.autopromo = function(autoPromoId, elt) {
  //Si on passe une liste d'objets en argument, on appelle chaque objet séparément
  if(PM.Util.isArrayOrCollection(elt)) {
    for(var n=0; n<elt.length; n++ ) {
     PM.Statistics.autopromo(autoPromoId, elt[n]);
    }
    return ;
  }
  
  PM.Event.add(elt, "click", PM.Statistics.autopromoClick.bindObj(null, autoPromoId));
  return PM.Statistics.autopromoView(autoPromoId);
}

PM.Statistics.log = function(message, options) {
  //PM.Debug.log(message, options);
  if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.TrackLog) != "undefined" && typeof(PM.Spot.TrackLog.log) != "undefined") {
    PM.Spot.TrackLog.log(message);
  }
}

/**
 * Envoi un tag xiti pour connaitre les fonctions deprecated utilisées
 * 
 * @param fctName {String}    Nom de la fonction
 */
PM.Statistics.deprecatedFunctions = function(fctName) {
  PM.Statistics.tagClick(PM.Statistics.Xtn2.OTHERS, "Deprecated::" + fctName, PM.Statistics.Type.ACTION);
}

/**
 * @class Objet contenant un ou plusieurs critères<br/>
 * Utilisé pour la création de critères de formulaires en JS
 */
PM.Statistics.Criteria = function() {
  this.tag = "";
}

/**
 * Ajoute un nouveau critère à l'objet
 * 
 * @param name  {String} Nom du critère
 * @param value {String} Valeur du critère
 */
PM.Statistics.Criteria.prototype.append = function(name, value) {
  this.tag += "&" + name + "=" + value;
}

/**
 * Réinitialise les critères
 */
PM.Statistics.Criteria.prototype.reset = function() {
  this.tag = "";
}

/**
 * Contient les méthodes d'appel AdServer
 * 
 * @namespace
 */
PM.AdServer = {}

PM.AdServer.createPromoBoxAjax = function(boxDiv,formatId,promosPageId){
  var sas_renderMode = 0;
  var sas_pageid = "15937/" + promosPageId;
  var sas_target = PM.Context.getFormattedCriterias();
  if(boxDiv.childNodes.length != 2){
      PM.Dom.removeChildren(boxDiv); 
      sas_formatid = formatId;
      SmartAdServerAjax(sas_pageid,promosPageId+"_"+sas_formatid,sas_target,sas_formatid);
  }
}

//author: HAF
//On a modifié les fonctions fournies par adserver pour recupérer une promo en ajax.
//L'unique modification consiste en l'ajout du pageid dans l'id du div cible en ajoutant un parametre a la fonction  SmartAdServerAjax
//Ce qui permet de dissocier l'appel de addserver de l'appel du div cible et affectation de l id
//On espere que adserver va modifier son code afin que nous puissions recoller avec leur code (maintenu)
//DEBUT ADSERVER

if(typeof(sas_scriptDomain)=="undefined")
{
  sas_scriptDomain="http://www.smartadserver.com"
}
if(typeof(sas_renderMode)=="undefined")
{
  sas_renderMode=0
}

var sas_ajax=true;
sas_d=document;
sas_w=window;
sas_tsn=sas_gtsf();
sas_mfb=1;
sas_olfb=0;
sas_fa=new Array();
sas_ta=new Array();
sas_aca=new Array();
sas_ccba=new Array();
//var icb=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var icb = false;
function sas_gtsf(){
  return Math.round(Math.random()*10000000000)
};


function SmartAdServerAjax(f,b,e,sas_formatid) {
  if(typeof(this.sas_pageid)=="undefined"){
    this.sas_pageid=f
  }
  var d=sas_gcf(b);

  if(sas_mfb==1){
    sas_mfb=0;
    sas_master="M"
  }

  else {
    sas_master="S"
  }

  sas_scripturl=sas_scriptDomain+"/call/pubj/"+f+"/"+sas_formatid+"/"+sas_master+"/"+sas_tsn+"/"+escape(e)+"?";

  if((typeof(d)=="undefined")||(d==null)){
    sas_fa.push(b);
    sas_ta.push(e);

    if(sas_renderMode==0){
      sas_d.write('<div id="sas_'+b+'"></div>');
      var a=sas_createScript(b,sas_scripturl);
      var c=sas_d.getElementById("sas_"+b);
      c.appendChild(a)
    }
    else {
      if(sas_renderMode==4){
        sas_d.write('<div id="sas_'+b+'"><script id="sas_s'+b+'" src="'+sas_scripturl+'"><\/script></div>')
      }
      else {
        sas_d.write('<div id="sas_'+b+'"></div>');
        if(sas_renderMode==1&&!sas_olfb) {
          sas_olfb=1;
          sas_addEvent(sas_w,"load",sas_callAds,false)
        }
      }
    }
  }

  else {
    var a=sas_createScript(b,sas_scripturl);
    sas_ccf(b);
    sas_appendToContainer(b,a)
  }
}

function sas_scriptLoadHandler(c) {
  var d;
  if(c.id!==undefined) {
    d=c.id.replace("sas_s","")
  }

  else {
    if(c.target!==undefined&&c.target.id!==undefined) {
      d=c.target.id.replace("sas_s","")
    }
  }

  if(d!=null&&typeof(sas_loadHandler)!="undefined") {
    var b=sas_gcf(d);
    var a={id:d};
    if(b!=null&&b.hasChildNodes()&&b.childNodes.length>1){ 
      a.hasAd=true
    }
    else{
      a.hasAd=false
    }
    sas_loadHandler(a)
  }
}
function sas_ccf(c){

  var b=sas_gcf(c);
  myLength=b.childNodes.length;

  if((b.childNodes!=null)&&(myLength>0)) {
    for(sas_cccn=0;sas_cccn<myLength;sas_cccn++)
    {
      b.removeChild(b.childNodes[0])
    }
  }

  if(sas_aca.length>=c) {
    if((typeof(sas_aca[c])!="undefined")&&(sas_aca[c]!=null)) {
      for(sas_aca_counter=0; sas_aca_counter<sas_aca[c].length; sas_aca_counter++) {
        var a=sas_aca[c][sas_aca_counter];
        if((typeof(a)!="undefined")&&(a!=null)) {
          a.parentNode.removeChild(a)
        }
      }

      sas_aca[c]=new Array()
    }
  }

  if(sas_ccba.length>=c) {
    if(typeof(sas_ccba[c])=="function") {
      sas_ccba[c]();
      sas_ccba[c]=null
    }
  }
}


function sas_fv(a) {
  var b=sas_gcf(a);
  if((typeof(b)!="undefined")&&(b!=null)) {
    b.style.visibility="visible"
  }
}

function sas_createScript(b,c) {
  var a=sas_d.createElement("script");
  a.id="sas_s"+b;
  a.type="text/javascript";
  a.src=c;
  a.onreadystatechange=function() {
    if(this.readyState=="loaded")
    {
      sas_scriptLoadHandler(this)
    }
  };

  if(window.opera===undefined) {
    a.onload=sas_scriptLoadHandler
  }

  a.async="async";
  return a
}


function sas_gcf(a) {
  return sas_d.getElementById("sas_"+a)
}

function sas_appendToContainer(c,a) {
  var d=sas_gcf(c);
  if((typeof(d)!="undefined")&&(d!=null)&&(typeof(a)!="undefined")&&(a!=null))
  {
    if(typeof(a)=="string") {
      var b=sas_d.createElement("div");
      b.innerHTML=a;
      a=b
    }

    d.appendChild(a), 1000;

    if(icb) {
      d.style.visibility="hidden";
      sas_w.setTimeout("sas_fv("+c+")",100)
    }
  }
}

//FIN ADSERVER

/**
 * Contient les méthodes de gestion du tracking (XiTi)
 * 
 * @namespace
 */
PM.Statistics.Tracking = {}

/**
 * Ajoute la chaine s2 à la chaine s1 si elles sont définies
 * 
 * @param {String} s1     Chaîne de caractères
 * àparam {String} prefix Préfixe à ajouter avant s2. Peut valoir null;
 * @param {String} s2     Chaîne de caractères à ajouter après s1
 */
PM.Statistics.Tracking.concat = function(s1, prefix, s2) {
  if (s2 != null) {
    if (typeof(s1) == "undefined") s1 = "";
    s1 += "&";
    if (prefix != null) s1 += prefix + "=";
    s1 += s2;
  }
  return s1;
}


var xitiTags = new Array();
/**
 * Écrit un tag de tracking XiTi en utilisant les variables globales XiTi définies.
 * Cette méthode doit être appelée pour créer un tag de page Ajax.
 * 
 * @param {String} specificXtpage Xtpage spécifique utilisé pour le tag. Si non défini, on utilise le xtpage global.
 * @param {String} specificXtn2 Xtn2 spécifique utilisé pour le tag. Si non défini, on utilise le xtn2 global.
 *
 */
PM.Statistics.Tracking.writeTag = function(specificXtpage, specificXtn2) {
  if (!window.xtsite) {
    // Le tag XiTi de la page courante n'est pas encore posé --> stockage pour appel après celui-ci
    window.ajaxSpecXtpage = specificXtpage;
    window.ajaxSpecXtn2 = specificXtn2;
  } else {
    if (specificXtpage == null) specificXtpage = window.xtpage;
    if (specificXtn2 == null) specificXtn2 = window.xtn2;
    var xitiparams = window.xtparam? "&" + window.xtparam: "";
    var date = new Date();
    var i = xitiTags.length;
    xitiTags[i] = new Image();
    xitiTags[i].src = xtsd+'.xiti.com/hit.xiti?s='+xtsite+'&s2='+specificXtn2+'&p='+specificXtpage+'&di='+xitiparams+'&hl='+date.getHours()+'x'+date.getMinutes()+'x'+date.getSeconds();
    PM.Debug.log('Envoi du tag XITI:' + specificXtpage, PM.Debug.Type.DEBUG);
  }
}

/**
 * <font style="color: red">Fonction dépréciée</font>
 * @see PM.Statistics.autopromoView
 * @deprecated <font style="color: red">Cette fonction ne doit plus être utilisée !</font>
 */
PM.Statistics.Tracking.addAutopromoId = function(autoPromoId) {
  PM.Statistics.deprecatedFunctions("PM.Statistics.Tracking.addAutopromoId");
  return PM.Statistics.autopromoView(autoPromoId);
}

PM.Statistics.Tracking.logAutopromos = function() {
  PM.Debug.store("Autopromos: " + window.xt_ati, PM.Debug.Type.DEBUG);
}

/**
 * Ajoute un nouvel identifiant d'une campagne publisher
 * à la liste des identifiants existante.
 * Alias de PM.Statistics.Tracking.addAutopromoId (utilise la même variable)
 */
PM.Statistics.Tracking.addPublisherId = function(atiVar) {
  PM.Statistics.Tracking.addAutopromoId(atiVar);
}


/**
 * Méthode appelée pour ajouter des paramètres d'A/B testing à l'objet tracking xtparams
 * 
 * @param {String} testName : nom du test
 * @param {String} chosenVariation : choix de l'ABTesting
 * @param {JSON Object} options : options supplémentaires
 * <ul>
 * <li>isAfterPageLoading (false) est-ce que l'ajout d'aBTesting se fait avant ou après le chargement de la page ?</li>
 * </ul>
 */
PM.Statistics.Tracking.addABTest = function(testName, chosenVariation, options) {
  if (!options) options={};

  this.tl = testName;
  this.tv = chosenVariation;
  var xtparams = "&tl=" + this.tl.replace(/[ \'<>&"]/g, '_') + "&tv=" + this.tv.replace(/[ \'<>&"]/g, '_');

  if(! options.isAfterPageLoading) {
    if (window.xtparam != null) {
      window.xtparam += xtparams;
    } else {
      window.xtparam = xtparams;
    }
  }
  else {
    // pour vider la mise en cache
    var date = new Date();

    // Crée l'url XITI
    var im_abtest_url = xtsd+'.xiti.com/hit.xiti?s='+xtsite+'&s2='+xtn2+ xtparams;

    im_abtest_url += "&type=AT&rn="+date.getHours()+"x"+date.getMinutes()+"x"+date.getSeconds();

    // Affiche l'image pour faire le hit
    PM.Image.load(im_abtest_url);

    PM.Debug.log("Impression XITI de l'ABTest " + testName + " : " + im_abtest_url, PM.Debug.Type.DEBUG);
  }
}

/**
 * Méthode permettant d'ajouter des paramètres de critères au tracking
 * Ces critères doivent d'abord être définis dans XiTi !
 * <p>
 * Ces critères peuvent être de type :
 * <ol>
 * <li>formulaire : fi=toto&fj=blabla (exemple : f1=testA&f5=4) </li> 
 * <li>multicritère : xi=toto&xk=blabla&xj=2 (exemple x6=2&x12=labelCusto) </li>
 * </ol>
 * </p>
 */
PM.Statistics.Tracking.computeABTestingCriteria = function(criteria) {
  var xt_multc = "";
  if (criteria) xt_multc += '&' + criteria;
  
  if (window.xtparam != null) {
        window.xtparam += xt_multc;
    } else {
      window.xtparam = xt_multc;
    }
}

/**
 * Méthode permettant d'ajouter des paramètres de MultiVariante testing au tracking.
 *
 * @param {JSON Object} test : test sous la forme {id: testId, name: testName, wave: testWaveId}
 * @param {JSON Object} version : version de test sous la forme {id: versionId, name: versionName}
 * @param {JSON Objects Array} variantes : tableau des variantes sous la forme {id: varianteId, name: varianteName, value_id: varianteValueId, value_name: varianteValueName}
 */
PM.Statistics.Tracking.addMVTest = function(test, version, variantes) {  
  var xt_abmv = "&abmvc=" + test.id + "[" + test.name.replace(/[ \'<>&"]/g, '_') + "]-" + test.wave + "-" + version.id + "[" + version.name.replace(/[ \'<>&"]/g, '_') + "]";

  function adch() {};
  if (window.xt_adch) {
    adch = window.xt_adch;
  }
  /**
   * @ignore
   */
  window.xt_adch = function() {
    adch();
    if (variantes.length > 0) {
      for (var i in variantes) {
        xt_addchain(variantes[i].id + "[" + variantes[i].name.replace(/[ \'<>&"]/g, '_') + "]-" + variantes[i].value_id + "[" + variantes[i].value_name.replace(/[ \'<>&"]/g, '_') + "]","abmv");
      }
    }
  }
  
  if(!PM.Event.hasReached(PM.Event.Type.STATISTICS)) {
    if (window.xtparam!=null) {
      window.xtparam+= xt_abmv;
    } else {
      window.xtparam = xt_abmv;
    }
  } else {
    // Cas ou l'id a bien été ajouté dans la liste et on est après le chargement de XiTi
    // On envoi une image pour faire un hit XITI
    var im_abtest_url = xtsd + ".xiti.com/hit.xiti?s=" + xtsite + "&s2=" + xtn2 + xt_abmv;
    
    var count = 1;
    if (variantes.length > 0) {
      for (var i in variantes) {
        if (variantes[i]) {
          im_abtest_url += "&abmv" + count + "=" + variantes[i].id + "[" + variantes[i].name.replace(/[ \'<>&"]/g, '_') + "]-" + variantes[i].value_id + "[" + variantes[i].value_name.replace(/[ \'<>&"]/g, '_') + "]";
          count++;
        }
      }
    }

    var date = new Date();

    im_abtest_url += "&type=AT&rn="+date.getHours()+"x"+date.getMinutes()+"x"+date.getSeconds();
    im_abtest_url += "&url=" + PM.Constants.blankImg;

    // Affiche l'image pour faire le hit
    PM.Image.load(im_abtest_url);
  }
}

/**
 * Affiche les informations de Tracking Xiti via PM.Debug.
 * Permet de connaître l'état de toutes les variables Xiti.
 */
PM.Statistics.Tracking.debug = function() {
  var xt = {};
  xt.xtnv = window.xtnv;
  xt.xtsd = window.xtsd;
  xt.xtsite = window.xtsite;
  xt.xtn2 = window.xtn2;
  xt.xtpage = window.xtpage;
  xt.xtdi = window.xtdi;
  xt.xto_force = window.xto_force;
  xt.xtparam = window.xtparam;
  
  PM.Debug.log(["Debug variables XiTi", xt], PM.Debug.Type.INFO);
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Image
------------------------------------------------------------------------------*/
/**
 * @namespace Outils de gestion des images
 */
PM.Image = {
    imgArray: new Array()
}

/**
 * Charge une image dont l'url est passée en paramètre.
 * Permet de conserver l'image en mémoire, même après la fin de la fonction.
 * 
 * @param img
 */
PM.Image.load = function(imgSrc) {
  var length = PM.Image.imgArray.length;
  PM.Image.imgArray[length] = new Image();
  PM.Image.imgArray[length].src = imgSrc;
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Provenance
------------------------------------------------------------------------------*/
/**
 * @namespace Outils pour "provenance" - redirection vers les sites ES, UK <code>(Doc à revoir)</code>.
 */
PM.Provenance = {}

PM.Provenance.condamn = function() {
  //write cookie PMUP
  var cook_prov = PM.Cookie.setParam("pmup", "pmup_provenance", 0);
  //close the popup
  PM.Alert.close();
}

PM.Provenance.execute = function() {

  // test cookie PMUP
  var cook_pmup = PM.Cookie.get("pmup");
  if(cook_pmup != null) {
    var cook_param_prov = PM.Cookie.getParam("pmup", "pmup_provenance");
    if(cook_param_prov != null && cook_param_prov != 1){
      return;
    }
  }

  // test cookie provenance
  var cook_prov = PM.Cookie.get("provenance");
  if(cook_prov == null) {
    PM.Cookie.set("provenance", 1);
  }
  else {
    return;
  }

  var platform = PM.Util.getNavigatorLanguage();
  platform = platform.toLowerCase();
  var bbInProvList = false;
  var i=0;
  while (i < prov_list.length  && bbInProvList != true ) {
    if ((platform.indexOf(prov_list[i]) != -1) && (navigator.userAgent.toLowerCase().indexOf("google") <= -1)) {
     bbInProvList = true;
    }
    i++;
  }

  if(bbInProvList == true) {
    new PM.Alert("/info/redirect_site_"+platform, {isAjax: true, shutText: "", hasMargin: false, clickOutsideClose: false, width: "427px", useTable: true});
  }
}
/* Events for Provenance */
// attach event to detect and execute provenance
if (!(typeof(noProvenance) != "undefined" && noProvenance == true)) {
  PM.Event.add(window, PM.Event.Type.INIT, PM.Provenance.execute);
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                               Events handling
------------------------------------------------------------------------------*/

/* Events for MENU */
// attach event to place the submenus when loading or resizing the window
PM.Event.add(window, 'resize', PM.Menu.setPosition);
PM.Event.add(window, 'load', PM.Menu.setPosition);

/* Events for Focus */
// attach event to store which element has the focus
PM.Event.add(window, 'load', PM.Util.manageFocus);
/* 


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                 Flash detection and utilities
                                                                     SWFObject
------------------------------------------------------------------------------*/
/**
 * PriceMinister flash
 *
 * @ignore
 */
PM.Flash = {}

/** 
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * @class Fonctions d'affichage des objets Flash.
 * @name  deconcept
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){/** Outils d'écriture de Flash */deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={/** @ignore */getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){/** @ignore */__flash_unloadHandler=function(){};/** @ignore */__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){/** @ignore */document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Tooltip
------------------------------------------------------------------------------*/

/** 
 * Crée un objet de type <code>PM.Tooltip</code>.
 * 
 * @class Génération et affichage d'un tooltip
 * @constructor
 * 
 * @param {String / DOM Object} targetId - Elément cible (cad l'élément déclencheur) ou son identifiant
 * @param {String / DOM Object} contentId - Elément contenant le code HTML à afficher dans le tooltip ou son identifiant
 * @param {String / DOM Object} globalId - Elément global conteneur du tooltip
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>positionning</b> (TOP_LEFT)</code> : manière de positionner le tooltip</li>
 * <li><code><b>timerIn</b> (100)</code> : timer avant l'affichage du tooltip (en Ms)</li>
 * <li><code><b>timerOut</b> (100)</code> : timer avant la fermeture du tooltip (en Ms)</li>
 * <li><code><b>width</b> (MEDIUM)</code> : taille du tooltip (SMALL, MEDIUM ou LARGE)</li>
 * <li><code><b>ajaxUrlUpdate</b> (undefined)</code> : On peut éventuellement définir une URL Ajax pour mettre à jour le contenu du tooltip 
 *                                                     (ou une partie de ce contenu). ATTENTION, une fois que le contenu a été récupéré, 
 *                                                     on l'enregistre et utilise pour éviter des requêtes en pagaille</li>
 * <li><code><b>updateDivId</b> (contentId)</code> : ID du div à mettre à jour (S'il n'est pas définit, on prend l'id du contenu du tooltip)</li>
 * <li><code><b>showCallMethod</b> (undefined)</code> : méthode appelée à l'affichage du tooltip
 * <li><code><b>hideCallMethod</b> (undefined)</code> : méthode appelée au masquage du tooltip
 * <li><code><b>clickCallMethod</b> (undefined)</code> : méthode appelée au clic sur le tooltip
 * <li><code><b>hideTootipOnTargetClick</b> (false)</code> : cache le tooltip au clic sur la target si celui-ci est affiché
 * <li><code><b>marginBottom</b> (0)</code> : Taille en px de l'espace entre la cible et le tooltip
 * <li><code><b>activeHackIeNavGrid</b> (false)</code> : Gros HACK IE(6,7) pour la nav par grille
 * <li><code><b>activeHackIeFpDesc</b> (false)</code> : Gros HACK IE(6) pour la fiche produit bloc de description en haut
 * <li><code><b>activeHackIePrdViewCount</b> (false)</code> : Gros HACK IE(6,7) pour le compteur annonce
 * </ul>
 */

PM.Tooltip = function(targetId, contentId, globalId, options) {

  // Elément cible (le lien qui déclenche l'affichage du tooltip)
  this.targetId = targetId;
  this.targetElt = $(targetId);
  
  // contenu du tooltip
  this.contentId = contentId;
  this.contentElt = $(contentId);
  
  // element conteneur du tooltip
  this.globalId = globalId;
  this.globalElt = $(globalId);
  
  // OPTIONS
  this.positionning   = PM.Util.getOption(options, "positionning", PM.Tooltip.positionning.TOP_LEFT);
  this.timerIn        = PM.Util.getOption(options, "timerIn",      100);
  this.timerOut       = PM.Util.getOption(options, "timerOut",     100);
  this.width          = PM.Util.getOption(options, "width",        PM.Tooltip.size.MEDIUM);
  this.updateDivId    = PM.Util.getOption(options, "updateDivId",  this.contentId);
  this.marginBottom   = PM.Util.getOption(options, "marginBottom", 0);
  this.hideTootipOnTargetClick = PM.Util.getOption(options, "hideTootipOnTargetClick", false);
  
  this.showCallMethod      = options.showCallMethod;
  this.hideCallMethod      = options.hideCallMethod;
  this.ajaxUrlUpdate       = options.ajaxUrlUpdate;
  this.clickCallMethod     = options.clickCallMethod;
  this.activeHackIeNavGrid = options.activeHackIeNavGrid;
  this.activeHackIeFpDesc  = options.activeHackIeFpDesc;
  this.activeHackIeOnlyForShippingMode = options.activeHackIeOnlyForShippingMode;
  this.activeHackIePrdViewCount = PM.Util.getOption(options, "activeHackIePrdViewCount", null);
 
  this.printConfiguration();
 
  this.waitId = "tooltip_wait";
  this.contentUpdated = false;
  this.displayed = false;
  
  // Timer pour l'affichage
  this.showTimer = null;
  
  // Timer pour le cachement
  this.hideTimer = null;
  
  // construit le tooltip
  this.build();
  
  // attache le tooltip à l'élément cible
  this.bindTo();
  
  // la methode clickCallMethod est en cours d'execution
  this.clicking = false;
}

/**
 * Instance du tooltip qui est affiché dans la page
 * @field
 */
PM.Tooltip.tooltipDisplayed = null;

/**
 * Instance du tooltip qui est en attente d'affichage
 * @field
 */
PM.Tooltip.tooltipWaiting = null;

/**
 * Taille du tooltip.
 * <ul>
 *   <li><code>SMALL</code> : 200 px</li>
 *   <li><code>MEDIUM</code> : 350 px</li>
 *   <li><code>LARGE</code> : 500 px</li>
 * </ul>
 * 
 * @constant
 */
PM.Tooltip.size = {
  SMALL: "tooltip_s",
  MEDIUM: "tooltip_m",
  LARGE: "tooltip_l"
}

/**
 * Positionnement du tooltip.<br/>
 * TODO : documenter
 * 
 * @constant
 */
PM.Tooltip.positionning = {
  TOP_LEFT: 1,
  TOP_MIDDLE: 2,
  TOP_RIGHT: 3,
  BOTTOM_LEFT: 4,
  BOTTOM_MIDDLE: 5,
  BOTTOM_RIGHT: 6,
  NO_POSITION: 7
}

PM.Tooltip.prototype.build = function() {

  // Classe pour la taille du contenu
  PM.Dom.Class.remove(this.contentElt, this.width);
  PM.Dom.Class.add(this.contentElt, this.width);
  
  // IE6: ajoute une iframe pour que le tootlip passe au dessus des formulaires
  if (ie6) {
    var appendElement = this.contentElt;
    var ieDiv = PM.Dom.createElement("div");
    ieDiv.innerHTML = '<iframe id="' + this.contentId + '_iframe" src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: -1; height: 0; display:none;"></iframe>';
    appendElement.appendChild(ieDiv);
  }
}

/**
 * Attache les évènements du tooltip
 */
PM.Tooltip.prototype.bindTo = function() {

  // Evt Affichage tooltip au passage de souris
  PM.Event.add(this.targetElt, "mouseover", this.mouseOverTargetDetected.bindObj(this));
  
  // Evt pour cacher le tooltip si l'utilisateur quitte la cible
  PM.Event.add(this.targetElt, "mouseleave", this.mouseLeaveTargetDetected.bindObj(this));
  
  // Evt pour cacher le tooltip si l'utilisateur le quitte
  PM.Event.add(this.contentElt, "mouseleave", this.mouseLeaveContentDetected.bindObj(this));
  
  // Evt pour arrêter le cachement du tooltip si l'utilisateur le survole
  PM.Event.add(this.contentElt, "mouseover", this.mouseOverContentDetected.bindObj(this));
  
  // Evt Click
  PM.Event.add(document, "click", this.testTooltipClick.bindObj(this));
}

//On entre dans une cible 
PM.Tooltip.prototype.mouseOverTargetDetected = function() {
  // Après un mouseOver sur un targetElmt, celui-ci passe en attente d'affichage (on écrase le tooltip précédemment en attente)
  if (PM.Tooltip.tooltipWaiting != this){
    if(PM.Tooltip.tooltipWaiting != null) 
      PM.Tooltip.tooltipWaiting.killShow();
    PM.Tooltip.tooltipWaiting = this;
  }
    
  // Si aucun tooltip n'est affiché et que la cible n'est pas en attente d'affichage alors on lance le timer pour l'afficher
  if (PM.Tooltip.tooltipDisplayed == null && !this.isWaitingForDisplay()){
    PM.Tooltip.tooltipWaiting.launchShow();
  }
  // Si le tooltip de la cible est affiché et qu'il est en attente pour se cacher alors on supprime le timer du cachement
  else if (PM.Tooltip.tooltipDisplayed == this && this.isWaitingForHide()){
    PM.Tooltip.tooltipDisplayed.killHide();
  }
}

// On quitte une cible 
PM.Tooltip.prototype.mouseLeaveTargetDetected = function() {
  // Si la cible est en attente alors on supprime le timer de l'affichage
  if (PM.Tooltip.tooltipWaiting == this){
    PM.Tooltip.tooltipWaiting.killShow();
  }

  // Si la cible est affichée on lance le timer pour la cacher
  if (PM.Tooltip.tooltipDisplayed == this){
    PM.Tooltip.tooltipDisplayed.launchHide();
  }
}

// On quitte le tooltip affiché 
PM.Tooltip.prototype.mouseLeaveContentDetected = function() {
  // Si le timer pour cacher n'était pas activé alors on le lance
  if (PM.Tooltip.tooltipDisplayed == this && !this.isWaitingForHide()) {
    this.launchHide();
  }
}

//On entre dans le tooltip affiché 
PM.Tooltip.prototype.mouseOverContentDetected = function() {
  // Si le timer pour cacher le tooltip était lancé alors on le stoppe 
  if (this.isWaitingForHide())
    this.killHide();
  
  // On stoppe le timer d'affichage d'une éventuelle cible
  if (PM.Tooltip.tooltipWaiting != null){
    PM.Tooltip.tooltipWaiting.killShow();
  }
  
}

/**
 * Le timer pour afficher le tooltip est-il lancé ?
 */   
PM.Tooltip.prototype.isWaitingForDisplay = function() {
  return this.showTimer!=null;
}

/**
 * Le timer pour cacher le tooltip est-il lancé ?
 */  
PM.Tooltip.prototype.isWaitingForHide = function() {
  return this.hideTimer!=null;
}

/**
 * Lance l'affichage du tooltip avec un timer
 */
PM.Tooltip.prototype.launchShow = function() {
  this.showTimer = setTimeout(this.show.bindObj(this), this.timerIn);
}

/**
 * Un clic sur la cible a été effectué, on affiche la cible  
 */
PM.Tooltip.prototype.clickOnTargetDetected = function(event) {
  // Cas du click droit, on laisse le comportement normal
  if(event.button == 2) {
    return;  
  }

  // Désactive l'evenement courant
  PM.Util.preventDefault(event);

  if (this.hideTootipOnTargetClick && (this.displayed)) {
    if (this.isWaitingForHide()){
      this.killHide();
    }
    this.hide();
  }
  else {
    PM.Tooltip.tooltipWaiting = this;
    this.show();
  }
  
}

/**
 * Un clic sur le tooltip a été effectué,   
 */
PM.Tooltip.prototype.clickOnTooltipDetected = function(event) {
  // Cas du click droit, on laisse le comportement normal
  if(event.button == 2) {
    return;  
  }
  
  if (this.clickCallMethod && !this.clicking) {
    // Désactive l'evenement courant
    PM.Util.preventDefault(event);
    
    this.clicking = true;
    this.clickCallMethod.apply(null);
    this.clicking = false;
  }
}

/**
 * Supprime le timer de l'affichage et annule la demande d'affichage
 */
PM.Tooltip.prototype.killShow = function() {
  PM.Tooltip.tooltipWaiting = null;
  clearTimeout(this.showTimer);
  this.showTimer = null;
}

/**
 * Supprime le timer pour cacher et annule la demande de cachement
 */
PM.Tooltip.prototype.killHide = function() {
  clearTimeout(this.hideTimer);
  this.hideTimer = null;
}

/**
 * Lance le timer pour cacher le tooltip 
 */
PM.Tooltip.prototype.launchHide = function() {
  if(this.displayed) {
    this.hideTimer = setTimeout(this.hide.bindObj(this), this.timerOut);
  }
}

/**
 * Teste si l'utilisateur a cliqué sur une cible, sur le tooltip ou à côté.
 * 
 * @ignore
 */
PM.Tooltip.prototype.testTooltipClick = function(event) {
  var elt = PM.Util.getElementFromEvent(event);
  var i = 0;
  
  // Parcourt tous les éléments parents
  while (PM.Dom.parent(elt) != null) {
    // Cas du target cliqué
    if (elt.id == this.targetId) {
      this.clickOnTargetDetected(event);
      return;
    } else if(elt.id == this.contentId) {
      this.clickOnTooltipDetected(event);
      return;
    }
    else {
      elt = PM.Dom.parent(elt);
    }
  }
  
  // Cache le tooltip dans le cas ou le click n'est ni sur le target ni sur le tooltip
  if (this.isWaitingForHide()){
    this.killHide();
    this.hide();
  }
}

/**
 * Positionne le tooltip sur la page
 */
PM.Tooltip.prototype.displayInPage = function() {
  // Taille du contenu
  var contentWidth = parseInt(this.contentElt.offsetWidth);
  var contentHeight = parseInt(this.contentElt.offsetHeight);
 
  // Taille de la cible
  var targetWidth = parseInt(this.targetElt.offsetWidth);
  var targetHeight = parseInt(this.targetElt.offsetHeight);

  // Taille du bloc global
  var globalWidth = parseInt(this.globalElt.offsetWidth);
  var globalHeight = parseInt(this.globalElt.offsetHeight);

  // Position du bloc global par rapport à l'écran
  var posGlobalScreen = PM.Util.absolutePosition(this.globalElt);
  var globalXScreen = parseInt(posGlobalScreen[0]);
  var globalYScreen = parseInt(posGlobalScreen[1]);

  // Calcule la nouvelle position
  var contentX = 0; 
  var contentY = 0;
    
  /**
   * ATTENTION, les positionnements doivent se faire par rapport au premier élément parent relatif
   * c'est à à dire l'élément global.
   */
  // En haut à gauche de la target
  if(this.positionning == PM.Tooltip.positionning.TOP_LEFT) {
    contentX = 0;
    contentY = 0 - contentHeight - this.marginBottom;
  }
  //En haut et centré par rapport au conteneur
  else if(this.positionning == PM.Tooltip.positionning.TOP_MIDDLE) {
    contentX = 0 - ((contentWidth / 2) - (globalWidth / 2));
    contentY = 0 - contentHeight - this.marginBottom;
  }
  // En haut à droite de la target
  else if(this.positionning == PM.Tooltip.positionning.TOP_RIGHT) {
    contentX = 0 - (contentWidth - globalWidth);
    contentY = 0 - contentHeight - this.marginBottom;
  }
  // En bas à gauche de la target
  if(this.positionning == PM.Tooltip.positionning.BOTTOM_LEFT) {
    contentX = 0;
    contentY = globalHeight + this.marginBottom;
  }
  //En bas et centré par rapport au conteneur
  else if(this.positionning == PM.Tooltip.positionning.BOTTOM_MIDDLE) {
    contentX = 0 - ((contentWidth / 2) - (globalWidth / 2));
    contentY = globalHeight + this.marginBottom;
  }
  // En bas à droite de la target
  else if(this.positionning == PM.Tooltip.positionning.BOTTOM_RIGHT) {
    contentX = 0 - (contentWidth - globalWidth);
    contentY = globalHeight + this.marginBottom;
  }
  
  // Test du bord gauche
  if((globalXScreen + contentX) < 0) {
    contentX = 0;
  }
  
  // Pour IE6, on positionne à (0,0) car l'iframe se positionne par rapport au premier div parent relatif
  // et ce div est le div du content
  if (ie6) {
    var tooltip_frame = $(this.contentId + "_iframe");
    tooltip_frame.style.top = (0 - this.marginBottom) + 'px';
    tooltip_frame.style.left = 0 + 'px';
    tooltip_frame.style.width = contentWidth + 'px';
    tooltip_frame.style.height = contentHeight + 'px';
    tooltip_frame.style.display = 'block';
  }
  
  // Positionne le tooltip
  this.contentElt.style.left = contentX + 'px';
  this.contentElt.style.top  = contentY + 'px';
}

/**
 * Affiche le tooltip au niveau affichage
 */
PM.Tooltip.prototype.show = function() {
  this.showTimer=null;
  
  // Pour ne pas afficher plusieurs tooltip à la fois
  if(PM.Tooltip.tooltipDisplayed != null || PM.Tooltip.tooltipWaiting == null) {
    return;
  }

  PM.Tooltip.tooltipDisplayed = this;
  this.displayed = true;
  PM.Tooltip.tooltipWaiting = null;
  
  // On active les classes CSS avant le calcul des positions car sinon les tailles ne sont pas les bonnes
  PM.Dom.Class.remove(this.globalElt, 'tooltip_inactive');
  PM.Dom.Class.add(this.globalElt, 'tooltip_active');

  // Avant d'afficher le tooltip, on lance éventuellement une requête Ajax pour mettre à jour ce contenu
  // Si ce contenu n'a pas déjà été mis à jour
  if(this.ajaxUrlUpdate && !this.contentUpdated) {
    PM.Ajax.request(this.ajaxUrlUpdate, this.fillContent.bindObj(this), {waitId : PM.Tooltip.waitId});
  }
  
  
  
  if(this.activeHackIeFpDesc && ie) {
    this.installHackIeOnlyForFpDesc(true);
  }
  
  if(ie6 || ie7) {
    
    if (this.activeHackIeNavGrid) {
      this.installHackIeOnlyForNavGrid(true);
    }
    if (this.activeHackIeOnlyForShippingMode) {
      this.installHackIeOnlyForShippingMode(true);
    }
    
    if (this.activeHackIePrdViewCount != null ) {
      this.hackIeOnlyForPrdViewCount(true);
    }
  
  }
  
  if (this.positionning != PM.Tooltip.positionning.NO_POSITION){
    this.displayInPage();
  }
  
  if (this.showCallMethod) {
    this.showCallMethod.apply(null);
  }
}

/**
 * Méthode appellée après l'updatage du tooltip
 * Utilisée principalement pour re-positionner le tooltip
 */
PM.Tooltip.prototype.fillContent = function(options) {
  var content = options.XmlHttpObject.responseText;
  $(this.updateDivId).innerHTML = content;
  this.contentUpdated = true;

  if (this.positionning != PM.Tooltip.positionning.NO_POSITION){
    this.displayInPage();
  }
}

/**
 * Cache le tooltip uniquement si il est affiché
 */
PM.Tooltip.prototype.hide = function() {
  this.hideTimer=null;
  if(PM.Tooltip.tooltipDisplayed == this || this.displayed) {
    PM.Tooltip.tooltipDisplayed = null;
    this.displayed = false;
    
    if (PM.Tooltip.tooltipWaiting != null){
      PM.Tooltip.tooltipWaiting.show();
      PM.Tooltip.tooltipWaiting = null;
    }
    
    PM.Dom.Class.remove(this.globalElt, 'tooltip_active');
    PM.Dom.Class.add(this.globalElt, 'tooltip_inactive');

    if (this.activeHackIeFpDesc && ie) {
      this.installHackIeOnlyForFpDesc(false);
    }

    if(ie6 || ie7) {
      
      if (this.activeHackIeNavGrid) {
        this.installHackIeOnlyForNavGrid(false);
      }
      if (this.activeHackIeOnlyForShippingMode) {
        this.installHackIeOnlyForShippingMode(false);
      }
    
      if (this.activeHackIePrdViewCount != null) {
        this.hackIeOnlyForPrdViewCount(false);
      }
    }
    
    if (this.hideCallMethod) {
      this.hideCallMethod.apply(null);
    }
    
  }
}

/**
 * Installe une classe CSS sur un div spécifique
 * uniquement pour IE6/7 et uniquement sur la nav par GRILLE
 * 
 * @ignore
 */
PM.Tooltip.prototype.installHackIeOnlyForNavGrid = function(activingTooltip) {

  var elt = this.globalElt;

  // Parcourt tous les éléments parents
  while (PM.Dom.parent(elt) != null) {
    if (elt.className.match("announce_blk")) {
      if(activingTooltip) {
        PM.Dom.Class.add(elt, 'announce_blk_ttip_active');
      } else {
        PM.Dom.Class.remove(elt, 'announce_blk_ttip_active');
      }
      return;
    }
    else {
      elt = PM.Dom.parent(elt);
    }
  }
}

/**
 * Installe une classe CSS sur un div spécifique
 * uniquement pour IE6/7 et uniquement pour les modes expeditions dans le panier
 * 
 * @ignore
 */
PM.Tooltip.prototype.installHackIeOnlyForShippingMode = function(activate) {

  var  idArray = this.targetId.split("_");
  
  if(PM.Tooltip.tooltipDisplayed != null && !activate)return; 
  
  var advertTargets = $j(".announce_blk","#seller_package_" + idArray[2]);
  for(i=0; i<advertTargets.length;i++) {
    if(activate) {
        PM.Dom.Class.add(advertTargets[i],"announce_blk_hide");
    }
    else {
      PM.Dom.Class.remove(advertTargets[i],"announce_blk_hide");      
   }
  }
  
  var rightBlocks = $j("#extra2 .blk_st");
  for(i=0; i<rightBlocks.length; i++) {
  var elt = rightBlocks[i];
    if(activate) {
      elt.style.position = "relative";
      elt.style.zIndex = "-1";
    }
    else {
      elt.style.zIndex = "";    
    }
  }
}

/**
 * Installe un style CSS sur un div spécifique
 * uniquement pour IE6 et uniquement sur la nav par GRILLE
 * 
 * @ignore
 */
PM.Tooltip.prototype.installHackIeOnlyForFpDesc = function(activingTooltip) {

  var elt = this.globalElt;
  var parentOfGlobal = PM.Dom.parent(elt);
  
  if(parentOfGlobal != null) {
    PM.Debug.log(activingTooltip);
    if(activingTooltip) {
      PM.Dom.Class.remove(parentOfGlobal, 'pm_ie');
    } else {
      PM.Dom.Class.add(parentOfGlobal, 'pm_ie');
    }
  }
}

/**
 * Hack affreux pour IE6 et IE7 sur le compteur annonces
 * 
 * @ignore
 */
PM.Tooltip.prototype.hackIeOnlyForPrdViewCount = function(active) {
  
  var elt = this.globalElt;
  var itemElt = PM.Dom.parent(PM.Dom.parent(PM.Dom.parent(PM.Dom.parent(PM.Dom.parent(elt)))));
  
  if (itemElt && itemElt.className && itemElt.className.indexOf("item") != -1) {
    if(active) {
      PM.Dom.Class.add(itemElt, 'item_cmptr');
    } else {
      PM.Dom.Class.remove(itemElt, 'item_cmptr');
    }
  }
}


PM.Tooltip.prototype.printConfiguration = function() {
  PM.Debug.log("Conf " + this.globalId + ": " + "pos=" + this.positionning + ", "
                              + "timerIn=" + this.timerIn + ", "
                              + "timerOut=" + this.timerOut + ", "
                              + "width=" + this.width + ", "
                              + "updateDivId=" + this.updateDivId + ", "
                              + "marginBottom=" + this.marginBottom, PM.Debug.Type.DEBUG);
}
