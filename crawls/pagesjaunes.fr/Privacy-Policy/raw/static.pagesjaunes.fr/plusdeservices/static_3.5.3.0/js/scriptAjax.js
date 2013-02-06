/**
 * Détection si le navigateur supporte l'object XMLHttpRequest
 */
var xhr = null; 
function getXhr()
{
	if(window.XMLHttpRequest) // Firefox et autres
	{
		xhr = new XMLHttpRequest(); 
	}
	else if(window.ActiveXObject) // Internet Explorer
	{
		try 
		{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else // XMLHttpRequest non supporté par le navigateur 
	{
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
		xhr = false; 
	} 
}
/**
 * Chargement d'une url de manière asynchrone
 */
function chargerPage(url,idDivARafraichir)
{
	getXhr();
	if(xhr)
	{
		// On défini ce qu'on va faire quand on aura la réponse
		xhr.onreadystatechange = function()
		{
			// On ne fait quelque chose que si on a tout reçu et que le serveur est ok
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				var divARecharger = document.getElementById(idDivARafraichir);
				
				if(divARecharger){
					divARecharger.innerHTML = xhr.responseText;
					var aLinks = divARecharger.getElementsByTagName("A");
					var areaLinks = divARecharger.getElementsByTagName("AREA");
					var aIframes = divARecharger.getElementsByTagName("IFRAME");
					var aForms = divARecharger.getElementsByTagName("FORM");
					_pjStatInitEvents(aLinks,areaLinks,aIframes,aForms);
				}
				
			}
		}
		
		var action = "";
		var params = "";		
		var indexParam = url.indexOf("?");
		if(indexParam!=-1){
			var longueurUrl = url.length;
			action = url.substring(0,indexParam);
			params = url.substring(indexParam+1, longueurUrl);
			params = params.replace(/\'/g,"\\'");
			params = params.replace(/\"/g,'\\"');		
		} else {
			action = url;
		}

		// Initialisation de l'objet
		xhr.open('POST', action, true); // Async.
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Content-Length', params.length);
		
		// Appel au serveur
		xhr.send(params);
	}
}
/**
 * Chargement d'une url de manière asynchrone
 */
function chargerPagePlusStat(url,idDivARafraichir)
{

	getXhr();
	if(xhr)
	{
		// On défini ce qu'on va faire quand on aura la réponse
		xhr.onreadystatechange = function()
		{
			// On ne fait quelque chose que si on a tout reçu et que le serveur est ok
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				var divARecharger = document.getElementById(idDivARafraichir);
				
				if(divARecharger){
					divARecharger.innerHTML = xhr.responseText;
					var aLinks = divARecharger.getElementsByTagName("A");
					var areaLinks = divARecharger.getElementsByTagName("AREA");
					var aIframes = divARecharger.getElementsByTagName("IFRAME");
					var aForms = divARecharger.getElementsByTagName("FORM");
					_pjStatInitEvents(aLinks,areaLinks,aIframes,aForms);
				}
			}
		}
		
		var action = "";
		var params = "";		
		var indexParam = url.indexOf("?");
		if(indexParam!=-1){
			var longueurUrl = url.length;
			action = url.substring(0,indexParam);
			params = url.substring(indexParam+1, longueurUrl);
			params = params.replace(/\'/g,"\\'");
			params = params.replace(/\"/g,'\\"');		
		} else {
			action = url;
		}

		// Initialisation de l'objet
		xhr.open('POST', action, true); // Async.
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Content-Length', params.length);
		
		// Appel au serveur
		xhr.send(params);
	}
}