// Gestion de l'affichage / masquage des questions - réponses dans la page FAQ
function FaqEvtclick(o){
	o.blur();
	if(o.chld.style.display=='none'){
		o.className = "N6_faq_q_moins";
		o.chld.style.display='block';
		o.title = "Masquer la réponse à la question "+o.ind;
	}
	else{
		o.chld.style.display='none';
		o.className = "N6_faq_q_plus";
		o.title = "Afficher la réponse à la question "+o.ind;
	}
	return false;
}

// Ouverture de la demo CarteDeVoeux
function openDemoCDV(sUrl) {
	if( sUrl != "" ){
		var sParams = "width=800,height=600, resizable=1, scrollbars=0, menubar=0, status=0, location=0, toolbar=0";
		var newWin = window.open( sUrl , "Voeux", sParams );
				newWin.focus();
	}
}

// Ouverture de la commencer CarteDeVoeux
function openCommencerCDV(sUrl) {
	if( sUrl != "" ){
		var sParams = "width=845,height=730, resizable=1, scrollbars=1, menubar=0, status=0, location=0, toolbar=0";
		var newWin = window.open( sUrl , "VoeuxCommencer", sParams );
				newWin.focus();
	}
}


// éléments pages de type AUTRES
function PJ_init_rds(){
	// Gestion de l'affichage / masquage des questions - réponses dans la page FAQ
	Faq = getElementsByClassName(document, "div", "N3_faq");
	if(Faq.length==0){
		Faq = getElementsByClassName(document, "div", "N3_aide");
	}

	// Initialisation FAQ
	for(i=0; i<Faq.length; i++) {	
		Faq[i].style.display = "none";
		FaqCol = Faq[i].getElementsByTagName("DIV");
		for(j=0;j<FaqCol.length;j++){
			if(FaqCol[j].className!="")
				continue;
			FaqCol[j].style.display = "none";
			if(FaqCol[j].parentNode.getElementsByTagName("DIV")[1] != null) {
				FaqEvt = FaqCol[j].parentNode.getElementsByTagName("A")[0];
				FaqEvt.chld = FaqCol[j].parentNode.getElementsByTagName("DIV")[1];
				FaqEvt.ind = Math.round(j/2);
				if (FaqEvt.className.indexOf("N6_faq_q_plus") == -1){
					FaqEvt.className += " N6_faq_q_plus";
				}
				FaqEvt.title = "Afficher la réponse à la question "+FaqEvt.ind;
				FaqEvt.onclick = function(){
					return FaqEvtclick(this);
				}			
			}
		}
		Faq[i].style.display = "block";
	}
}
//-------------------------------
if( "undefined" != typeof(addEvent) ) {
	addEvent(window, "load", PJ_init_rds , false );
}else{
	PJ_init_rds();
} 

// pjinside_gps.js ------------------------------------------------------------------
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_changeProp(objName,x,theProp,theValue) { //v6.0
  var obj = MM_findObj(objName);
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
    if (theValue == true || theValue == false)
      eval("obj."+theProp+"="+theValue);
    else eval("obj."+theProp+"='"+theValue+"'");
  }
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'url(img/bg_moov_200.gif)':(v=='hide')?'url(img/bg_moov_200_gris.gif)':v; }
	obj.backgroundImage=v; } 
	for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
		if (obj.style) { obj=obj.style; v=(v=='show')?'#000000':(v=='hide')?'#888888':v; }
	obj.color=v; }
}
function MM_showHideLayers2() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers2.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show2')?'url(img/bg_moov_330.gif)':(v=='hide2')?'url(img/bg_moov_330_gris.gif)':v; }
	obj.backgroundImage=v; } 
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show2')?'#000000':(v=='hide2')?'#888888':v; }
    obj.color=v; }
}

// Sur mon GPS Mio Moov : affichage diaporama
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


// Sur mon GPS Mio Moov : 
// Fonctions d'affichage et masquage des calques contenant les 
// infos concernant les produits : 'MIO 200', 'MIO 330' et 'MIO 370'
function closeMioDetail( sMioType ) {
	var oClq = document.getElementById( sMioType );
	if(oClq){
		oClq.style.display = 'none';
		document.getElementById(sMioType+"_list").className="mio_list";
		
		// (ré)Affichage du bloc texte.
		showOrHideTeaserAndMiotexte("");
	}
}
function showMioDetail(sMioType){
	var aMioTypes = new Array('mio_200', 'mio_330', 'mio_370');
	
	for (var i = 0; i < aMioTypes.length; i++) {
		var oClq = document.getElementById(aMioTypes[i]);
		
		if (oClq) {
			oClq.style.display = (aMioTypes[i] == sMioType) ? 'block' : 'none';
			
			if (aMioTypes[i] == sMioType) {
				document.getElementById(sMioType+"_list").className=sMioType+"_selected";
			} else {
				document.getElementById(aMioTypes[i]+"_list").className="mio_list";
			}
			
			// Masquage du bloc texte Teaser.
			showOrHideTeaserAndMiotexte("none");
		}
	}
}

// Cette fonction permet d'afficher ou de faire disparaître le teaser, ainsi que les 
// deux paragraphes du bas.
// Prend le paramètre valeurDisplay, qui est soit "none", soit "".
function showOrHideTeaserAndMiotexte(valeurDisplay) {
	var oTeaser = document.getElementById('teaser');
	var oMioTexte = document.getElementById('mio_detail');
	
			if(oTeaser){
		oTeaser.style.display = valeurDisplay;
		}
	
	if(oMioTexte){
		oMioTexte.style.display = valeurDisplay;
	}
}
