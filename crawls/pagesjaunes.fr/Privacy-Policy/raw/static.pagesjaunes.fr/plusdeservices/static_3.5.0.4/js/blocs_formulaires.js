// Actions du formulaire express
function frm_exp_submit()	{
	boite_close_all();
	Ok = true;
	
	var form = this;
	if(form){
		razAlerteClassique(form);
		cleanForm(form);
		if(form.flashInactif){
			form.flashInactif.value=!flashActif;
		}
		var champQuoi = form.quoiqui;
		var champOu = form.ou;
		// Expressions régulières
		RgxAlert = new RegExp("^alerte");		
		if (champOu.value == ""){
			var alerte = champOu.parentNode.parentNode;
			masqueAfficherAlert(alerte, "block");
			if (champQuoi.value == "") {
				if( champQuoi.focus ){
					champQuoi.blur();
				}
				alerte = champQuoi.parentNode.parentNode;
				masqueAfficherAlert(alerte, "block");
			}

			Ok = false;
		}					
		// alerte si une chaine de caracteres du champs 'ou' dépasse 50
		if((new RegExp('\\S{50}')).test(champOu.value)){						
			var	elt = document.getElementById("alerteOuTropLong");
			if(elt != null){
				elt.style.display = "block";
				Ok = false;
			}
		}
	}

	return Ok;
} 
	

// Actions du formulaire détaillé
function frm_det_submit()	{
	boite_close_all();
	Ok = true;

	var form = this;
	if(form){
		razAlerteAvance(form);//masquage des alertes dejà présentes
		cleanForm(form);
		if(form.flashInactif){
			form.flashInactif.value=!flashActif;
		}
		//récupération des champs du formulaire
		var champActivite = form.activite;
		var champNom = form.nom;
		var champAdresse = form.adresse;
		var champLocalite = form.localite;
		var champDepartement = form.depreg;
		var champProxi = form.proximite;
		
		//initalisation des alertes
		var alerteLocaliteDepAccueil =  getElementsByClassName(form, "div", "al_departement")[0];
		var alerteLocaliteDep =  getElementsByClassName(form, "div", "al_departement_liste")[0];
		var alerteActivite = champActivite.parentNode.parentNode;
		var alertGlobal = getElementsByClassName(form, "div", "al_general_liste")[0];
		var alertGlobalDet = getElementsByClassName(form, "div", "al_general_liste")[1];
		var alertGlobalAccueil = getElementsByClassName(form, "div", "al_general")[0];
		
		if (trim(champActivite.value)=="" && trim(champNom.value)=="" && 
				(trim(champAdresse.value)=="" && trim(champLocalite.value)=="" && trim(champDepartement.value)=="")){
			//tous les champs sont vides
			if(alertGlobal){
				alertGlobal.style.display = 'block';
			}
			if(alertGlobalAccueil){
				alertGlobalAccueil.style.display = 'block';
			}
			Ok = false;
			
		} else if((trim(champActivite.value)!="" || trim(champNom.value)!="") 
				&& trim(champAdresse.value)=="" && trim(champLocalite.value)=="" && trim(champDepartement.value)==""){
			//les champs du où sont vides : erreur où
			if(alerteLocaliteDepAccueil){
				alerteLocaliteDepAccueil.style.display = 'block';
			}else if(alerteLocaliteDep){
				alerteLocaliteDep.style.display = 'block';
			}
			Ok = false;
			
		} else if (trim(champActivite.value)=="" && trim(champNom.value)=="" && 
				trim(champAdresse.value)=="" && (trim(champLocalite.value)!="" || trim(champDepartement.value)!="")){
			//les champs du quoi ne sont pas renseignés et l'adresse est vide : erreur quoiqui
			if(alerteActivite){
				masqueAfficherAlert(alerteActivite,'block');
			}
			Ok = false;
			
		} else if (trim(champActivite.value)=="" && trim(champNom.value)=="" && trim(champLocalite.value)==""){
			//les champs du quoi, où et localité ne sont pas renseignés
			if(alertGlobal){
				alertGlobal.style.display = 'block';
			}
			if(alertGlobalDet){
				alertGlobalDet.style.display = 'block';
			}
			if(alertGlobalAccueil){
				alertGlobalAccueil.style.display = 'block';
			}
			Ok = false;
			
		}
	}

	return Ok;
} // Fin function


// Actions du formulaire express
function frm_detAJ_submit()	{
	boite_close_all();
	Ok = true;
	
	// !!! modif Yes affichage des alertes suivants le fonctionnel !!! //
	var form = this;
	if(form){
		razAlerteAJ(form);
		cleanForm(form);
		var champQuoi = form.quoi;
		var champServices = form.services;
		var champOu = form.ou;
		var champTypeRecherche = form.typeRecherche;
		// Expressions régulières
		RgxAlert = new RegExp("^alerte");
		if ((champTypeRecherche.value == "IMMO" 
			||  champTypeRecherche.value == "SERVICES")&& champOu && champOu.value == ""){
			var alerte = champOu.parentNode.parentNode;
			masqueAfficherAlert(alerte, "block");
			Ok = false;
		}
		if (champQuoi && champQuoi.value == "") {
			alerte = champQuoi.parentNode.parentNode;
			masqueAfficherAlert(alerte, "block");
			Ok = false;
		}
		if (champServices && (champServices.value == "" || champServices.value == "-1")){
			alerte = champServices.parentNode.parentNode;
			masqueAfficherAlert(alerte, "block");
			Ok = false;
		}
	}
	if (Ok) {
		ouvrirFenetreAJ(form);
		Ok = false; // soumission par ajax
	}					
	return Ok;
} 

// Actions du formulaire express
function frm_carte_submit()	{
	boite_close_all();
	Ok = true;

	var form = this;
	if(form){
		razAlerteCarteForm(form);
		cleanForm(form);
		//var champQuoi = form.quoiqui;
		var champQuoi = document.getElementById("quoiquic");
		// Expressions régulières
		RgxAlert = new RegExp("^alerte");		
		if (champQuoi.value == "") {
			champQuoi.blur();
			alerte = champQuoi.parentNode.parentNode;
			masqueAfficherAlert(alerte, "block");
			Ok = false;
			removeEvent(champQuoi, "keyup", txt_keyup, true);
			champQuoi.focus();
			window.setTimeout(function(){ addEvent( champQuoi, "keyup", txt_keyup, true )},500);
		}		
	}
	return Ok;
}


// Actions des boutons d'aide "?"
function hlp_click(ev){
	boite_close_all();
	Obj = check_event(this);
	RgxGde = new RegExp(" guide");
	Gde = Obj;
	while(Gde.parentNode) {
		Gde = Gde.parentNode;
		if( (Gde.nodeName.toLowerCase() == "div") && (Gde.className.toLowerCase().substring(0,6) == "sclear") ) {
			break;
		}
	}
	while(Gde.nextSibling) {
		Gde = Gde.nextSibling;
		if(RgxGde.test(Gde.className) == true) {
			Gde.style.display = "block";
			break;
		}
	}
}

// Formulaires express / détaillé
bINITFORMS = false;
function PJ_init_forms(iScan){
    if(bINITFORMS == false){
		var maxScan = 20;// nbre max de recherche
		var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;// compteur de recherche
		
		PJ_init_boites();
		
		// Actions des boutons d'aide "?"
		Hlps = getElementsByClassName(document, "a", "N4_form_aide");
		for(i=0; i<Hlps.length; i++){
			if(typeof(Hlps[i].onclick) != 'function'){
				var oDate = new Date();
				Hlps[i].id = "a" + Math.floor( Math.random() * i + oDate.getTime() ) + 1;
				addEvent(Hlps[i], "click", hlp_click, true);
				Hlps[i].onclick = _false;
			}
		}
		
		// Actions des champs textes
		Txts = getElementsByClassName(document, "input", "N4_form_txt");
		for(i=0; i<Txts.length; i++){
			if(typeof(Txts[i].onkeyup) != 'function'){
				addEvent(Txts[i], "keyup", txt_keyup, true);
			}
		}
		
		// Formulaire Express - Gestion des boîtes de dialogues
		FrmsExp = getElementsByClassName(document, "form", "N2_formulaire_express");
		if(FrmsExp.length > 0){
			for(i=0; i<FrmsExp.length; i++){
				if(typeof(FrmsExp[i].onsubmit) != 'function'){
					FrmsExp[i].onsubmit = frm_exp_submit;
				}
			}
		}
		
		// Formulaire Détaillé - Gestion des boîtes de dialogues
		FrmsDet = getElementsByClassName(document, "form", "N2_formulaire_detaille");
		if(FrmsDet.length > 0){
			for(i=0; i<FrmsDet.length; i++){
				//Test si un évènement est déjà attaché ou pas
				if(typeof(FrmsDet[i].onsubmit) != 'function'){
				 	// Le formulaire détaillé YES.
					if(FrmsDet[i].name == 'rechercherAvanceForm'){
						FrmsDet[i].onsubmit = frm_det_submit;
					}
					// Le formulaire détaillé des annonces jaunes.
					else if(FrmsDet[i].name == 'formqui'){ 
						FrmsDet[i].onsubmit = frm_detAJ_submit;
					}
				}
			}
		}
		
		// Formulaire Carte - Gestion des boîtes de dialogues
		objFormCarte = document.getElementById("formCarte");
		if( objFormCarte && typeof(objFormCarte.onsubmit) != 'function' ){
			objFormCarte.onsubmit = frm_carte_submit;
		}
		// Formulaire Carte - Gestion des boîtes de dialogues
		objbtnFormCarte = document.getElementById("buttonFormCarte");
		if( objbtnFormCarte && typeof(objbtnFormCarte.onclick) != 'function' ){
			objbtnFormCarte.onclick = frm_carte_submit;
		}
		// Rechargement de la fonction si les formulaires ne sont pas chargés.
		if((FrmsExp.length < 2) && (FrmsDet.length < 2) && (lvScan < maxScan)){
			window.setTimeout(function(){
				lvScan++;
				PJ_init_forms(lvScan);
			}, 200);
		}else{
	        bINITFORMS = true;
		}
		
		// Checkbox tout selectionné
		Ttsl = getElementsByClassName(document, "input", "boite_toutsel");
		for(i=0; i<Ttsl.length; i++){
			if( typeof(Ttsl[i].onclick) != 'function' ){
				Ttsl[i].onclick = amb_toutsel_click;
			}
		}
	}
}

//-------------------------------------------
/* 
 * DONNE LE FOCUS A UN CHAMP 
 * @param sInputId id du champ auquel on veut donner le focus
 * @param iScan nombre de scans en cours
 */
// Variable globale d'enregistrement de 
// l'id du champ texte recevant le focus
var vgInputFocused = "";

// Initialisation du focus sur le champ par défaut
function focusToInput( sInputId, iScan ){
	saveFocusedInputId();
	var maxScan = 10;// nbre max de recherche
	var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;// compteur de recherche
	var bOdjLoaded = false;
	_sInputId = (vgInputFocused == "") ? sInputId : vgInputFocused;
	var oInput = document.getElementById(_sInputId);
	if(oInput){
		oInput.focus();
		oInput.value = oInput.value;
		bOdjLoaded = true;
		return;
	}
	else {
		if(!bOdjLoaded && (lvScan < maxScan ) ){
			window.setTimeout(function(){
				lvScan++;
				focusToInput( _sInputId, lvScan );
			}, 1000);
		} else {
			return false;
		}
	}
}

//-----------------------------------------------
// PAGES BLANCHES
//if( /trouverunnom/.test(document.location) ){
// Formulaire classique Accueil et Liste réponses:
function pbFocusToInput(){
	if( document.body != null ) {
		if(/PB/.test(document.body.className) ){
			focusToInput( 'nom' );
			return true;
		}else{
			return false;
		}
	} else {
		window.setTimeout( "pbFocusToInput()", 200 );
	}
}
pbFocusToInput();
// VED
//else if( /villeendirect/.test(document.location) ){
//	focusToInput( 'quoiqui' );
//}
// YES - Voila - Qui Donc - AJ
//else( !/trouverunnom/.test(document.location) ){
if( ! pbFocusToInput()) {
	if( getQueryVariable('avance') == 'true' || ( GetCookie("myFormPref") == "D" ) ){
		// Formulaire avancé Accueil :
		focusToInput( 'activite' );
	}
	else if (getQueryVariable('rechercheAvance') == 'true' ){
			// Formulaire avancé Liste réponses:
			focusToInput( 'activiteh' );
	}
	else if( /annoncesJaunes.do/.test(document.location) ){
		// Formulaire annonces jaunes :
		focusToInput( 'quoi' );
	}
	else if( /quiDonc.do/.test(document.location) ){
		// Formulaire Qui Donc :
		focusToInput( 'FRM_TEL');
	}
	else if( /aquiestcenumero.do/.test(document.location) ){
		// Formulaire Qui Donc :
		focusToInput( 'numeroTelephone');
	}
	else if( /quiportecenom.do/.test(document.location) ){
		// Formulaire Qui Donc :
		focusToInput( 'nom');
	}
	else if( /voila.do/.test(document.location) ){
		// Formulaire Voila :
		focusToInput( 'voila');
	}
	else { // Formulaire classique PJ Accueil et Liste réponses: + VED
		if( (/villeendirect/.test(document.location) == false) && (/aquiestcenumero.do/.test(document.location) == false) && (/quiportecenom.do/.test(document.location) == false) ){
			focusToInput( 'quoiqui' );
		}
	}
  // Initialisation des evts forms
  PJ_init_forms();
}
//-----------------------------------------------

function saveFocusedInputId(){
	var oFormContainer = ( document.getElementById("N1_formulaire") ) ?  document.getElementById("N1_formulaire") :  document.getElementById("N1_form_haut");
	if( oFormContainer ){
		var oForm = oFormContainer.getElementsByTagName("FORM")[0];
		if(oForm){
			var aInput = oForm.getElementsByTagName("INPUT");
			for(var i=0; i<aInput.length; i++){
				if( aInput[i].type == "text" ){
					aInput[i].onfocus = function (){
						vgInputFocused = this.id;
					}
				}
			}
		}
	}
}


/* -------------------------------------------------------------------------- */
/*                                                                                              */
/*                     GESTION PB LEVEE D'AMBIGUITE                      */
/*                                                                                              */
/* -------------------------------------------------------------------------- */
var vgTimer = null;
var fYes = null;
var fVed = null;
var fYesDet = null;
loadingForm(0);

/** Fonction de gestion du chargement des objets
 * @param	iScan : compteur pour le timer de la fonction
 */
function loadingForm(iScan){
	var maxScan = 10;//nbre max de recherche
	var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;//compteur de recherche
	var bFormLoaded = false;
	
	//Récupération des fomulaires concernés
	fYes = document.getElementById("formClassiqueHaut");
	fVed = document.getElementById("formulaire_express");
	fYesDet = document.getElementById("formAvanceHaut");
	
	if(fYes != null || fVed != null || fYesDet != null){
		bFormLoaded = true;
		window.clearTimeout(vgTimer);
		vgTimer = null;
		var champ = null;
		
		//récupération du champ concerné par la lévée d'ambiguité
		if(fYes || fVed){
			champ = document.getElementById("quoiqui");
		}else if(fYesDet){
			champ = document.getElementById("activite");
			if(champ == null){
				champ = document.getElementById("activiteh");
			}
		}
		
		//on attache la fonction isKeyPress sur l'évenement onkeypress du champ sélectionné
		champ.onkeypress = function(event){
			isKeyPress(event, this);
		}
		
		return;
	}else{
		//timer permettant de traiter la fonction dès que les éléments recherchés sont chargés
		window.clearTimeout(vgTimer);
		if(!bFormLoaded && (lvScan<maxScan)){
			vgTimer = window.setTimeout(function(){
				lvScan++;
				loadingForm(lvScan);
			}, 500);
		}
	}
}

/** Fonction de gestion de la fermeture de la boite d'ambiguité selon la touche appuyée
 * @param	evt : événement produit
 * 				obj : objet sur lequel l'événement est produit
 */
function isKeyPress(evt, obj){
	var charCode = (ie) ? event.keyCode : evt.keyCode;
	
	//si on a appuyé sur n'importe quelle touche sauf "Enter"
	if(charCode != 13){
		//Fermeture des alertes
		var al_activite = getElementsByClassName(document, "div", "alerte al_activite");
		
		if(al_activite && al_activite.length>0){
			al_activite[0].style.display='none';
		}
		var alerte_bd = getElementsByClassName(document, "div", "alerte_bd");
		if(alerte_bd && alerte_bd.length>0){
			alerte_bd[0].style.display='none';
		}
		//Fermeture et RAZ de la boite d'ambiguité
		var ambiguite = document.getElementById("ambiguiteQuoi");
		if(ambiguite){
			ambiguite.innerHTML = "";
			ambiguite.style.display = "none";
		}
	}
}
/* ---------------------------------- FIN ---------------------------------- */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                                                                                              */
/*            GESTION DU FOCUS DU BI-CHAMPS SUR IE6             */
/*                                                                                              */
/* -------------------------------------------------------------------------- */
//on vérifie si on est sur IE6
if(ie && !ie7){
	var vgTimer = null;
	var tabChamps = new Array();
	var champsForm = null;
	var formYes = null;
	var formYesDet = null;
	var formPB = null;
	var formQDnum = null;
	var formQDnom = null;
	var bWebAppVed = false;
	var objInputFocused = null;
	
	formLoad(0);
	
	addEvent(window, 'load', function(){
		if(!bWebAppVed && (formYes != null || formYesDet != null || formPB != null || formQDnum != null || formQDnom != null)){
			if(objInputFocused == null){
				if (tabChamps != null && tabChamps.length>0) {
					//si aucun champ n'a pris le focus avant la fin du chargement
					if(formYesDet && tabChamps[0].type == "checkbox"){
						//pour le formulaire détaillé, on donne le focus 
						//au 2ème élément du tableau si le premier est un checkbox
						tabChamps[1].focus();
					}else{
						//sinon, on sélectionne le 1er champ du tableau
						tabChamps[0].focus();
					}
				}
			}else{
				//sinon, on sélectionne le champ qui a pris le focus pdt le chargement
				objInputFocused.focus();
			}
		}
	}, false);
}

/** Fonction de gestion du chargement des objets
 * @param	iScan : compteur pour le timer de la fonction
 */
function formLoad(iScan){
	var maxScan = 10;//nbre max de recherche
	var lvScan = (typeof(iScan) != 'undefined' ) ? iScan : 0;//compteur de recherche
	var bFormLoaded = false;
	
	formYes = document.getElementById("formClassiqueHaut");
	formYesDet = document.getElementById("formAvanceHaut");
	formPB = document.getElementById("formAccueil");
	if(/aquiestcenumero.do/.test(document.location)){
		formQDnum = document.getElementById("form_numero");
	}else if(/quiportecenom.do/.test(document.location)){
		formQDnom = document.getElementById("form_nom");
	}
	
	if(formYes != null || formYesDet != null || formPB != null || formQDnum != null || formQDnom != null){
		bFormLoaded = true;
		
		if(document.body){//Est-on dans la WebApp VED ?
			bWebAppVed = (/^ved /.test(document.body.className));
		}
		window.clearTimeout(vgTimer);
		vgTimer = null;
		var t = 0;
		
		//test des formulaires pour récupérer les input concernés
		if(formYes){
			champsForm = formYes.getElementsByTagName("input");
		}else if(formYesDet){
			champsForm = formYesDet.getElementsByTagName("input");
		}else if(formPB){
			champsForm = formPB.getElementsByTagName("input");
		}else if(formQDnum){
			champsForm = formQDnum.getElementsByTagName("input");
		}else if(formQDnom){
			champsForm = formQDnom.getElementsByTagName("input");
		}else{
			champsForm = null;
		}
		
		if(champsForm != null){
			for(var i=0; i<champsForm.length; i++){
				//sélection des champs souhaités
				if(champsForm[i].type == "text" || champsForm[i].type == "checkbox" || champsForm[i].type == "image"){
					attachKeydown(champsForm[i]);
					tabChamps[t] = champsForm[i];
					t++;
				}
			}
		}
		return;
	}else{
		//timer permettant de traiter la fonction dès que les éléments recherchés sont chargés
		window.clearTimeout(vgTimer);
		if(!bFormLoaded && (lvScan<maxScan)){
			vgTimer = window.setTimeout(function(){
				lvScan++;
				formLoad(lvScan);
			}, 500);
		}
	}
}

/** Fonction d'affectation d'un fonction sur l'évènement "KeyDown"
 * @param	obj : objet concerné
 */
function attachKeydown(obj){
	obj.onkeydown = function(event){ 
		isEnterKey(event, this);
	}
}

/** Fonction de gestion du passage du focus entre les champs
 * @param	evt : événement produit
 * 				obj : objet sur lequel l'événement est produit
 */
function isEnterKey(evt, obj){
	//récupération de l'évènement
	var charCode = (ie) ? event.keyCode : evt.keyCode;
	
	//si la touche pressée est la tabulation, charCode == 9
	if(charCode == 9){
		var cc=0;
		
		//on recherche le champ suivant celui sélectionné
		while(cc<tabChamps.length && tabChamps[cc] != obj){
			cc++;
		}
		
		if(cc>tabChamps.length){
			objInputFocused = null;
		}else{
			//on donne le focus au champ trouvé 
			//on est obligé de se positionner sur le champ recherché car
			//la tabulation est prise en compte après avoir forcé le focus
			tabChamps[cc].focus();
			//on enregistre le champ suivant dans une variable globale
			objInputFocused = tabChamps[cc+1];
		}
	}
}
/* ---------------------------------- FIN ---------------------------------- */
/* -------------------------------------------------------------------------- */

// ### ADD YES
//masquage des alerte sur le formulaire classique	
function razAlerteClassique(form) {
	// Expressions régulières
	RgxAlert = new RegExp("^alerte");
	if(form){
		if (form.quoiqui) {
			masqueAfficherAlert(form.quoiqui.parentNode.parentNode, "none");
		}
		if (form.ou) {
			masqueAfficherAlert(form.ou.parentNode.parentNode, "none");
		}
		var alertesGlobales = getElementsByClassName(document, "div", "al_general_liste");
		if(alertesGlobales) {
			for(i=0;i<alertesGlobales.length;i++){
				alertesGlobales[i].style.display="none";
			}
		}
	}
}


//masquage des alerte sur le formulaire classique
function razAlerteAJ(form) {
	// Expressions régulières
	RgxAlert = new RegExp("^alerte");
	if(form){
		var oQuoi = ("undefined" != typeof(form.quoi))? form.quoi : false;
		var oOu = ("undefined" != typeof(form.ou))? form.ou : false; 
		if(oQuoi ){
			masqueAfficherAlert(oQuoi.parentNode.parentNode, "none");
		}
		if( oOu ){
			masqueAfficherAlert(oOu.parentNode.parentNode, "none");
		}
		var alertesGlobales = getElementsByClassName(document, "div", "al_general_liste");
		if(alertesGlobales) {
			for(i=0;i<alertesGlobales.length;i++){
				alertesGlobales[i].style.display="none";
			}
		}
	}
}

//masquage des alertes sur un formulaire detaille
function razAlerteAvance(form) {
	// Expressions régulières
	RgxAlert = new RegExp("^alerte");
	if(form){
		
		var oAlNom = ( 'undefined' != typeof(form.nom) )? form.nom : false ;
		if( oAlNom ){
			masqueAfficherAlert(oAlNom.parentNode.parentNode, "none");
		}
		var alerteLocaliteDepAccueil =  getElementsByClassName(form, "div", "al_departement");
		if(alerteLocaliteDepAccueil && alerteLocaliteDepAccueil[0]){
			alerteLocaliteDepAccueil[0].style.display="none";
		}
		var alerteLocaliteDep =  getElementsByClassName(form, "div", "al_departement_liste");
		if(alerteLocaliteDep && alerteLocaliteDep[0]){
			alerteLocaliteDep[0].style.display="none";
		}
		var alerteLocaliteAccueil =  getElementsByClassName(form, "div", "al_localite");
		if(alerteLocaliteAccueil && alerteLocaliteAccueil[0]){
			alerteLocaliteAccueil[0].style.display="none";
		}
		var alerteLocalite =  getElementsByClassName(form, "div", "al_localite_liste");
		if(alerteLocalite && alerteLocalite[0]){
			alerteLocalite[0].style.display="none";
		}
		var alerteGlobaleAccueil = getElementsByClassName(form, "div", "al_general");
		if(alerteGlobaleAccueil && alerteGlobaleAccueil[0]){
			alerteGlobaleAccueil[0].style.display="none";
		}
		var alertesGlobales = getElementsByClassName(document, "div", "al_general_liste");
		if(alertesGlobales) {
			for(i=0;i<alertesGlobales.length;i++){
				alertesGlobales[i].style.display="none";
			}
		}
	}
}

//masquage des alerte sur le formulaire carte
function razAlerteCarteForm(form) {
	// Expressions régulières
	RgxAlert = new RegExp("^alerte");
	if(form){
		if( form.quoiqui ){
			masqueAfficherAlert(form.quoiqui.parentNode.parentNode, "none");
		}
		if( form.ou ){
			masqueAfficherAlert(form.ou.parentNode.parentNode, "none");
		}
		var alertesGlobales = getElementsByClassName(document, "div", "al_general_liste");
		if(alertesGlobales) {
			for(i=0;i<alertesGlobales.length;i++){
				alertesGlobales[i].style.display="none";
			}
		}
	}
}


// masquage des alerte au clic sur le bouton close des levées 
// d'ambiguité et/ou des aides.  (bug #0006063)
// Initialisation auto. de la fonction onload de la page
addEvent(window, 'load', 
					function(){
						var aImgs = document.getElementsByTagName("IMG");
						for(var i=0; i<aImgs.length;i++){
							if(aImgs[i].className == "close"){
								aImgs[i].onclick = function(){ 
									var alertesGlobales = getElementsByClassName(document, "div", "alerte");
									if(alertesGlobales) {
										for(i=0;i<alertesGlobales.length;i++){
											alertesGlobales[i].style.display="none";
										}
									}
								}
							}
						}
					}
					, false);



// suppression des espaces et caractères spéciauux sur les champs des formulaires
function cleanForm(pForm) {
	var tabInput = pForm.getElementsByTagName("input"); 
	for (var i = 0; i < tabInput.length; i++) { 
	    if (tabInput[i].getAttribute("type") == "text") {
			tabInput[i].value = trim(tabInput[i].value);     
	    }
	}
}

//--------------------------------------------------------------------------------------------
// Wrap long lines for Ffox (bug #0009184)
function wrapLongDLForFirefox(){
	var allP = document.getElementsByTagName("p");
	var aBAddr = Array();
	for(var i=0; i<allP.length; i++){
		if(allP[i].className == "N5_bloc_parution_adresse"){
			aBAddr.push(allP[i]);
		}
	} 
	var cpt = 0;
	while(cpt < aBAddr.length){
		var oStg = aBAddr[cpt].getElementsByTagName("STRONG")[0];
		if(oStg){
			var sCt = oStg.innerHTML;
			if( String(sCt).length > 25 ) {
				oStg.innerHTML = wrapLn(sCt, "-");
			}
		}
		cpt ++;
	}
}
function wrapLn(sIn, sep){
	var sLgt = 30; 
	var i=1;
	var sOut = sIn;
	while(i<sOut.length){
		if( ( i>=sLgt) && (i%sLgt == 0) ) {
			var iSpr = sOut.indexOf(sep, i+1);
			var s1 = sOut.substr(0, iSpr+1);
			var s2 = sOut.substring(iSpr+1);
			if(s1 != "" && s2 != ""){
				sOut = s1+"<br/>"+s2;
			}
			
		}	
		i++;
	}
	return sOut;
}
if( moz ) { window.addEventListener('load', wrapLongDLForFirefox, false); }
//--------------------------------------------------------------------------------------------
