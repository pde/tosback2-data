
// Actions de la boite rechercher une autre ville
function flt_choisir_ville_click(ev){
	boite_close_all();
	Obj = getElementsByClassName(document, "div", "boite choix_autre_localite")[0];
	if(Obj) {
		Obj.style.display = "block";
	}
}

// Checkbox "Tout sélectionner"
function amb_toutsel_click(ev) {
	Obj = check_event(this);
	Ctn = Obj.parentNode;
	while(Ctn.nextSibling) {
		Ctn = Ctn.nextSibling;
		if(Ctn.className == "formulaire") {
			break;
		}
	}
	Ipt = Ctn.getElementsByTagName("input");
	for(i=0; i<Ipt.length; i++) {
		if(Ipt[i].type == "checkbox") {
			Ipt[i].checked = true;
		}
	}
	removeEvent(Obj, "click", amb_toutsel_click, true);
	addEvent(Obj, "click", amb_toutdesel_click, true);
}

// Checkbox "Tout désélectionner"
function amb_toutdesel_click(ev) {
	Obj = check_event(this);
	Ctn = Obj.parentNode;
	while(Ctn.nextSibling) {
		Ctn = Ctn.nextSibling;
		if(Ctn.className == "formulaire") {
			break;
		}
	}
	Ipt = Ctn.getElementsByTagName("input");
	for(i=0; i<Ipt.length; i++) {
		if(Ipt[i].type == "checkbox") {
			Ipt[i].checked = false;
		}
	}
	removeEvent(Obj, "click", amb_toutdesel_click, true);
	addEvent(Obj, "click", amb_toutsel_click, true);
}

// Actions envoi par SMS/MMS
function env_click(ev){
	Obj = check_event(this);
	PpTop  = eval((screen.height / 2) - 240);
	PpLeft = eval((screen.width / 2) - 320);
	window.open(Obj.href, 'PopUp', 'top='+PpTop+',left='+PpLeft+',toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,width=640,height=463');
}
function env_click2(ev){
	Obj = check_event(this);
	PpTop  = eval((screen.height / 2) - 240);
	PpLeft = eval((screen.width / 2) - 320);
	window.open(Obj.href, 'PopUp', 'top='+PpTop+',left='+PpLeft+',toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,width=670,height=490');
}
function plein_ecran_click(ev) {
	window.resizeTo(screen.width, screen.height);
	window.moveTo(0, 0);
}
function reduire_ecran_click(ev) {
	window.resizeTo(680, 550);
	window.moveTo(eval((screen.height / 2) - 240), eval((screen.width / 2) - 320));
}



// masque ou affiche une alerte en fonction de l'action passée en paramètre
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
