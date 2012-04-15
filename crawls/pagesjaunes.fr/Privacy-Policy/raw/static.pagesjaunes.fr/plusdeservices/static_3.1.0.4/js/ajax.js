/** *****************FOURNIT DES METHODES COMMUNES D'APPEL VIA AJAX ************** **/

/** le traitement javascript à appeler lors du retour du serveur */
var TRAITEMENT_RETOUR;

/** Le retour ajax */	
var ajax;

	/**
	 * Recupere un objet XMLHttpRequest
	 * @return Un objet XMLHttpRequest ou false si le browser ne supporte pas l'objet
	 */
	function getXMLHttpRequest() {
		if (window.XMLHttpRequest) { // Firefox, IE 7, Opera, Safari, ...
			return new XMLHttpRequest();
		}
		else if (window.ActiveXObject) { // IE 5.X, IE 6
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		else {
			return false;
		}
	}
	/* 
     * APPEL AJAX AU SERVEUR 
	 * @param action action struts à appeler
	 * @param params les paramètres à ajouter à l'action
	 */
	function appelAjax(action, params, sync){
		appelAjaxCType(action, params, sync, 'application/x-www-form-urlencoded');
	}
	
	/* 
     * APPEL AJAX AU SERVEUR 
	 * @param action action struts à appeler
	 * @param params les paramètres à ajouter à l'action
	 */
	function appelAjaxCType(action, params, sync, contentType){
		// Recuperation de l'objet XMLHttpRequest pour appel serveur
		ajax = getXMLHttpRequest();
		// Seuleument si une action (dispatch) est definie et que l'objet a ete corretement recupere
		if (ajax) {
			// Creation des parametres de la requete POST
			var sendContent = "";
			if(params){
				sendContent = params;
			}
			// Détermination du synchronisme
			var asynchrone = true;
			if (sync) {
				asynchrone = false;
			}
	
			// Initialisation de l'objet
			ajax.open('POST', action, asynchrone); // Async.
			ajax.setRequestHeader('Content-Type', contentType);
			ajax.setRequestHeader('Content-Length', sendContent.length);
	
			// Definition de la fonction a appeler lors d'un changement d'etat,
			// soit le traitement le la reponse
			// Cette methode est definie AVANT l'appel au serveur
			ajax.onreadystatechange = TRAITEMENT_RETOUR;
			
			// Appel au serveur
			ajax.send(sendContent);
		}
	}		