var adloox_tab_firewall=['firewall04.adlooxtracking.com','firewall05.adlooxtracking.com','firewall06.adlooxtracking.com','firewall07.adlooxtracking.com','firewall03.adlooxtracking.com','firewall01.adlooxtracking.com','firewall02.adlooxtracking.com'];

			var adloox_tab_firewall_l=adloox_tab_firewall.length;
		var adloox_fw_ip=adloox_tab_firewall[Math.floor(Math.random()*adloox_tab_firewall_l)];

		
			var adloox_visite_id=Math.floor(Math.floor((Math.random()*100000000000)+1));
		var anticache=Math.floor(Math.random()*100000000); 
		var adloox_methode="2013-04-03-16-30-01";

		try
		{
			var compil_adloox_alerte_id_wikio='';
			var adloox_bool_alerte;
			for(i=0;i<tab_adloox_alerte_id_wikio.length;i++)
			{
				adloox_bool_alerte=tab_adloox_alerte_id_wikio[i]!=undefined;
				if(adloox_bool_alerte)
				{
					compil_adloox_alerte_id_wikio=compil_adloox_alerte_id_wikio+tab_adloox_alerte_id_wikio[i]+'_ADLOOX_ID_';
	}
	}
	var adloox_alerte_id_wikio=compil_adloox_alerte_id_wikio;

	}
	catch(err)
	{
		//erreur
	}



	var adloox_bool = adloox_alerte_id || 0;


	if(! adloox_bool) {
		var adloox_alerte_id='';
	}
	adloox_alerte_id=adloox_alerte_id+"";

	if(typeof adloox_alerte_id_wikio=="undefined"){
		adloox_alerte_id=adloox_alerte_id;
	}
else
{
   adloox_alerte_id_wikio=adloox_alerte_id_wikio.replace(/ /gi, "_ADLOOX_ID_");
   adloox_alerte_id=adloox_alerte_id_wikio;
	}		
	var adloox_loadbalancing = ["data01.adlooxtracking.com" , "data02.adlooxtracking.com" , "data03.adlooxtracking.com" , "data04.adlooxtracking.com" , "data05.adlooxtracking.com" , "data06.adlooxtracking.com" , "data07.adlooxtracking.com" , "data08.adlooxtracking.com" , "data09.adlooxtracking.com" , "data10.adlooxtracking.com" , "data11.adlooxtracking.com" , "data12.adlooxtracking.com" , "data13.adlooxtracking.com" , "data14.adlooxtracking.com"];
		var adloox_nb_loadbalancing=14;
		var adloox_serveur_alerte="data01.adlooxtracking.com";
		var adloox_num_loadbalancing=Math.floor(Math.random()*14);
		var adloox_servername_global_wikio=adloox_loadbalancing[adloox_num_loadbalancing];
		



		var adloox_iframe=0;
	var adloox_deja_scan=0;
	var adloox_visibilite=0;

	if ( document.getElementById("ads_visibility_global_wikio") )  
	{ 
		adloox_deja_scan=1;
	}


	

		var adloox_identifiant_global_wikio='global_wikio';
	var adloox_identifiant_global_wikio_regen='global_wikio';
	var adloox_banniere_global_wikio='global';;


	 
		var adloox_id_visi_global_wikio = adloox_identifiant_global_wikio;


			var adloox_identifiant_global_wikio=adloox_identifiant_global_wikio+'_ADLOOX_DATE';
		var adloox_identifiant_global_wikio_regen=adloox_identifiant_global_wikio_regen+'_ADLOOX_DATE';

		
			document.write('<img style="display:none;" src="//'+adloox_servername_global_wikio+'/ads/gfx/transparent.png" id="ads_visibility_global_wikio" width="0" height="0">');

		document.write('<img style="display:none;" src="//'+adloox_servername_global_wikio+'/ads/gfx/transparent.png" name="_adimjava_" id="ads_visibility_java_global_wikio_'+adloox_visite_id+'" width="0" height="0">');
		if(document.getElementById("ads_visibility_global_wikio")==null){
			var adloox_elii = document.createElement('img');
			adloox_elii.src = '//'+adloox_servername_global_wikio+'/ads/gfx/transparent.png';
			adloox_elii.id = "ads_visibility_global_wikio";
			adloox_elii.width = 0;
			adloox_elii.height = 0;
			adloox_elii.style.display='none';
			document.body.appendChild(adloox_elii);

			var adloox_elii_java = document.createElement('img');
			adloox_elii_java.src = '//'+adloox_servername_global_wikio+'/ads/gfx/transparent.png';
			adloox_elii_java.id = "ads_visibility_java_global_wikio"+adloox_visite_id;
			adloox_elii_java.width = 0;
			adloox_elii_java.height = 0;
			adloox_elii_java.style.display='none';
			document.body.appendChild(adloox_elii_java);
	}

	
		function adloox_strrpos (haystack, needle, offset) {
			var adloox_i = -1;
			if (offset) {
				adloox_i = (haystack+'').slice(offset).lastIndexOf(needle); 
				if (adloox_i !== -1) {
					adloox_i += offset;
	}
	}    else {
		adloox_i = (haystack+'').lastIndexOf(needle);
	}
	return adloox_i >= 0 ? adloox_i : false;
	}

	var adloox_saute_title=0;
	var adloox_alerte_desc;

	var adloox_detect = navigator.userAgent.toLowerCase();
	var adloox_OS,adloox_browser,adloox_version,adloox_total,adloox_thestring;

	if (adloox_checkIt('konqueror'))
	{
		adloox_browser = "Konqueror";
		adloox_OS = "Linux";
	}
else if (adloox_checkIt('chrome')) adloox_browser = "chrome";
else if (adloox_checkIt('firefox')) adloox_browser = "firefox";
else if (adloox_checkIt('safari')) adloox_browser = "Safari";
else if (adloox_checkIt('omniweb')) adloox_browser = "OmniWeb";
else if (adloox_checkIt('opera')) adloox_browser = "Opera";
else if (adloox_checkIt('webtv')) adloox_browser = "WebTV";
else if (adloox_checkIt('icab')) adloox_browser = "iCab";
else if (adloox_checkIt('msie')) adloox_browser = "Internet Explorer";
else if (!adloox_checkIt('compatible'))
{
	adloox_browser = "Netscape Navigator";
	adloox_version = adloox_detect.charAt(8);
	}
else adloox_browser = "inconnu";

if (!adloox_version) adloox_version = adloox_detect.charAt(adloox_place + adloox_thestring.length);
var adloox_browserVer=parseInt(navigator.appVersion); 

if (!adloox_OS)
{
	if (adloox_checkIt('linux')) adloox_OS = "Linux";
	else if (adloox_checkIt('x11')) adloox_OS = "Unix";
	else if (adloox_checkIt('mac')) adloox_OS = "Mac";
	else if (adloox_checkIt('win')) adloox_OS = "Windows";
	else adloox_OS = "inconnu";
	}
	var adloox_data_os=navigator.userAgent;


	if(adloox_data_os.indexOf("Windows NT 6.1")>0)
	{
		adloox_OS="Windows Seven";
	}
	if(adloox_data_os.indexOf("Windows NT 6.0")>0)
	{
		adloox_OS="Windows Vista";
	}
	if(adloox_data_os.indexOf("Windows NT 5.2")>0)
	{
		adloox_OS="Windows XP 64bits";
	}
	if(adloox_data_os.indexOf("Windows NT 5.1")>0)
	{
		adloox_OS="Windows XP";
	}
	if(adloox_data_os.indexOf("Windows NT 5.0")>0)
	{
		adloox_OS="Windows 2000";
	}
	if(adloox_data_os.indexOf("Win 9x 4.90")>0)
	{
		adloox_OS="Windows Me";
	}
	if(adloox_data_os.indexOf("Win98")>0)
	{
		adloox_OS="Windows 95/98";
	}


	function adloox_checkIt(string)
	{
		adloox_place = adloox_detect.indexOf(string) + 1;
		adloox_thestring = string;
		return adloox_place;
	}

	var adloox_uriCourant ="";


	try{		
		adloox_uriCourant=window.parent.parent.document.location.href;
	}
	catch(adloox_err)
	{
		try{

			var adloox_uriCourant=window.parent.document.location.href;
	}
	catch(adloox_err)
	{
		adloox_saute_title=1;
		if(adloox_strrpos (adloox_err.message,'<',0))
		{
			adloox_uriCourant=adloox_err.message.substring(adloox_strrpos (adloox_err.message,'<',0)+1,adloox_strrpos (adloox_err.message,'>',0));
	}
else
{
	adloox_uriCourant=window.document.location.href;

	}				
	}
	}
	if ( (top!=window)  ){

		try
		{
			var old_adloox_uriCourant=adloox_uriCourant;
			adloox_uriCourant=window.document.referrer;
			adloox_methode = adloox_methode+" iframe_ref2 "+window.parent.document.referrer;
			adloox_iframe=1;
	}
	catch(err)
	{
		adloox_uriCourant = document.referrer;
		adloox_methode = adloox_methode+err.message+" iframe_ref "+adloox_uriCourant;
		adloox_iframe=1;
	}


	}
else{
	adloox_methode+=" location_href"+" "+document.referrer;
	}
	if(adloox_uriCourant=="")
	{
		adloox_uriCourant=old_adloox_uriCourant;
	}
	var adloox_bad_site=0;

	if(adloox_strrpos (adloox_uriCourant,'onlinevideoconverter.com',0))
	{
		adloox_bad_site=1;
	}
	if(adloox_saute_title==0)
	{
		var adloox_title=window.document.title;
	}

	var adloox_alerte;
	var adloox_url_alerte;
	var adloox_url_alerte_min;

	adloox_alerte=0;
	var adloox_alerte2=0;
	adloox_url_alerte=escape(adloox_uriCourant);
	adloox_url_alerte_min=adloox_url_alerte.toUpperCase();


	adloox_title_alerte=escape(adloox_title);
	adloox_title_alerte_min=adloox_title_alerte.toUpperCase();

	var adloox_alerte_finale=0;
	var adloox_alerte_desc1='';
	var adloox_alerte_desc2='';
	
			if(adloox_deja_scan==0) {
				var arrayWords = new Array(); 
				arrayWords = new Array('AMATORIALI' , 'ANUS' , 'ASSHOLE' , 'ATTRICI PORNO' , 'BAJA GRATIS' , 'BARELY LEGAL' , 'BIG COKE' , 'BIG TITS' , 'BLOWJOB' , 'BOOBS' , 'BORRACHERAS' , 'BRANLER' , 'BRANLETTE' , 'CAZZI ENORMI' , 'CHAT CALIENTE' , 'CHICAS FOLLANDO' , 'CONCHA' , 'COñOS' , 'CORRIDAS EN LA CARA' , 'CULOS' , 'CUNNILINGUS' , 'DEEP THROAT' , 'DESCARGA GRATIS' , 'DIRECT DOWNLOAD' , 'DOMINGAS' , 'DOUBLE PENETRATION' , 'DOWNLOADZ' , 'ECHAR UN POLVO' , 'ECHAR UNA CACHITA' , 'ENCULADAS' , 'ENCULER' , 'EROTISMO' , 'ERWACHSENE FOTO' , 'FAMOSAS DESNUDAS' , 'FETISH' , 'FILM DDL' , 'FILM DIVX' , 'FILM GRATIS' , 'FILMINI AMATORIALI' , 'FION' , 'FOLLADAS' , 'FOLLAR' , 'FOTO DE SEXO' , 'FREE PORN' , 'GANGBANG' , 'GONZO' , 'GRANDES VERGAS' , 'HACER GOZAS' , 'HANDJOB' , 'HARDCORE SEX' , 'HENTAI' , 'HITLER' , 'INCESTE' , 'INCESTI' , 'INCULATE' , 'ITALIAWEBSHOP' , 'LADYBOY' , 'LESBIAN' , 'LESBICHE' , 'LESBO' , 'MAMANDO POLLAS' , 'MASTURBARSE' , 'MASTURBARSI' , 'MASTURBATE' , 'MASTURBIEREN' , 'MICIPORN' , 'MILF' , 'MONSTER COCK' , 'MOVIEX' , 'MUYZORRAS' , 'NAZI' , 'NAZIS' , 'NéGATIONNISME' , 'NEWSGROUP' , 'NEWSGROUPS' , 'NINFOMANA' , 'OLLYS PORN' , 'ORGIA' , 'ORGIE' , 'ORGY' , 'PECHOS' , 'PEDOFILO' , 'PEDOPHILE' , 'PELICULAS ONLINE GRATIS' , 'PHOTO ADULTE' , 'PHOTO X' , 'PIRATAGE' , 'POMPINI' , 'POMPINO' , 'PORN' , 'PORN PICS' , 'PORN STAR' , 'PORNKOLT' , 'PORNO' , 'PORNO X' , 'PORNOITALIANOGRATIS' , 'PORNOTUBO AMATEURSEX' , 'PORNOVIZI' , 'PUSSY' , 'PUTTANE' , 'PäDOPHILE' , 'RAGAZZE UBRIACHE' , 'RANAPORNO' , 'REDTUBE' , 'SALE ARABE' , 'SALE JUIF' , 'SALES ARABES' , 'SALES JUIFS' , 'SALES NOIRS' , 'SALOPE' , 'SBORRATE' , 'SCARICARE GRATIS' , 'SESSO AMATORIALE' , 'SESSO ESTREMO' , 'SESSO GRATIS' , 'SESSUALE' , 'SEX HARDCORE' , 'SEXFILMCHEN' , 'SEXKINO' , 'SEXUAL' , 'SEXUEL' , 'SEXUELLEN' , 'SEXXX' , 'SEXY' , 'SEXY CHAT' , 'SEXY CULO' , 'SHEMALE' , 'SHEMALES' , 'SODOMíA' , 'SODOMIE' , 'SODOMY' , 'SPERM' , 'SPERME' , 'STREAMING' , 'STRIPTEASE' , 'TETAS' , 'TETONES' , 'TETTE GROSSE' , 'TETTONE' , 'TORRENT' , 'TORRENTZ' , 'TRANNIES' , 'TRANNY' , 'TRANSESSUALE' , 'TRANSEX' , 'TRANSEXUAL' , 'TRANSEXUEL' , 'TRANSGENRE' , 'TRANSSEXUEL' , 'TRASGREDENDO' , 'TROIA+PORNO' , 'TUBE ITALIANO' , 'VIDEO ADULTE' , 'VIDEO AMATORIALI' , 'VIDEO X' , 'VOYEUR X' , 'WAREZ' , 'WEBCAM X' , 'XXX BLOG' , 'HORNY' , 'BOUGNOULE' , 'NATURISME' , 'NATURISTE' , 'NUDISTE' , 'NATURISM' , 'NATURIST' , 'NUDISM' , 'NUDIST' , 'FKK' , 'NATURISMO' , 'NATURISTA' , 'NUDISMO' , 'NUDISTA' , 'NUDISME' , 'NUDISTE' , 'DVDRIP' , 'FILESERVE' , 'WAREZ' , 'SEXUPLOADER' , 'DESCARGA DIRECTA' , 'FILESONIC' , 'MEGAUPLOAD' , 'RAPIDSHARE' , 'ZSHARE' , 'WUPLOAD' , 'DEPOSITFILE' , 'HULKSHARE' , 'MEDIAFIRE' , 'FILEJUNGLE' , '4SHARED' , 'BDRIP' , 'BRRIP' , 'DVDSCR' , 'TVRIP' , 'PROGRAMASFULL' , 'FULLRIP' , 'FULL-RIP' , 'NETECHANGISME' , 'ESCUALITA' , 'MONEYSLAVE' , '.CSO' , 'NSFW');
					function majuscule(entree){
						var minus = "aàâäbcçdeéèêëfghiîïjklmnoôöpqrstûuüvwxyz- ";
						var majus = "AAAABCCDEEEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ  ";
						var sortie = "";
						for (var i = 0 ; i < entree.length ; i++) {
							var car = entree.substr(i, 1);
							sortie += (minus.indexOf(car) != -1) ? majus.substr(minus.indexOf(car), 1) : car;
	}
	return sortie;
	}
	function force_fw(){

	}
	function set_fw(){
		var fw_tous=document.getElementsByTagName("*");
		for(fw_elmt in fw_tous){
			var fw_id=fw_tous[fw_elmt].id;
			var fw_class=fw_tous[fw_elmt].className;
			var fw_bool;
			var fw_html;
			fw_bool=fw_id || 0;
			if(fw_bool && (fw_id!="")){
				if(fw_id.indexOf("A_")>=0){
					fw_html=fw_tous[fw_elmt].innerHTML;
					if(fw_html.indexOf("solution.weborama")>=0){
						fw_tous[fw_elmt].innerHTML="";
						break;
	}
	}
	}
	}	
	}

	if(arrayWords.length>0){
		for(var i= 0; i < arrayWords.length; i++){
			var adloox_i;
			var adloox_chaine_alerte=arrayWords[i];
			var adloox_tab_chaine_alerte=adloox_chaine_alerte.split("+");
			var adloox_nb_occ=adloox_tab_chaine_alerte.length;
			if(adloox_nb_occ>1)    {
				for (adloox_i=0;adloox_i<adloox_nb_occ;adloox_i=adloox_i+1)
				{
					if(adloox_alerte>=0)
					{
						adloox_alerte=(adloox_url_alerte_min.indexOf(adloox_tab_chaine_alerte[adloox_i]));
	}
	if(adloox_alerte2>=0)
	{
		adloox_alerte2=(adloox_title_alerte_min.indexOf(adloox_tab_chaine_alerte[adloox_i]));
	}
	}
	}
	else
	{			
		adloox_alerte=(adloox_url_alerte_min.indexOf(arrayWords[i]));
		adloox_alerte2=(adloox_title_alerte_min.indexOf("%20" + arrayWords[i] + "%20"));
	}					
	if(adloox_alerte>=0)
	{
		adloox_alerte_finale=1;
		adloox_alerte_desc1="url : "+arrayWords[i] ;
		if(adloox_alerte_id!="")
		{
			adloox_alerte_desc1=adloox_alerte_desc1;
	}

	}				
	if(adloox_alerte2>=0)
	{
		adloox_alerte_finale=1;
		adloox_alerte_desc2="titre :"+arrayWords[i] ;
		if(adloox_alerte_id!="")
		{
			adloox_alerte_desc2=adloox_alerte_desc2;
	}
	}
	}
	}var arrayWordsBlock = new Array(); 
	var isForced = false;
	if(arrayWordsBlock.length>0){
		for(var i= 0; i < arrayWordsBlock.length; i++){
			var adloox_i;
			var adloox_chaine_alerte=arrayWordsBlock[i];
			var adloox_tab_chaine_alerte=adloox_chaine_alerte.split("+");
			var adloox_nb_occ=adloox_tab_chaine_alerte.length;
			if(adloox_nb_occ>1) {
				for (adloox_i=0;adloox_i<adloox_nb_occ;adloox_i=adloox_i+1){
					if(adloox_alerte>=0) {
						adloox_alerte=(adloox_url_alerte_min.indexOf(adloox_tab_chaine_alerte[adloox_i]));
	}
	if(adloox_alerte2>=0){
		adloox_alerte2=(adloox_title_alerte_min.indexOf(adloox_tab_chaine_alerte[adloox_i]));
	}
	}
	}else{	
		adloox_alerte=(adloox_url_alerte_min.indexOf(arrayWordsBlock[i]));
		adloox_alerte2=(adloox_title_alerte_min.indexOf("%20" + arrayWordsBlock[i] + "%20"));
	}					
	if(adloox_alerte>=0){
		adloox_alerte_finale=1;
		isForced = true;
		adloox_alerte_desc1+="url : "+arrayWords[i] ;
		if(adloox_alerte_id!=""){
			adloox_alerte_desc1+=adloox_alerte_desc1;
	}
	}				
	if(adloox_alerte2>=0){
		adloox_alerte_finale=1;
		isForced = true;
		adloox_alerte_desc2="titre :"+arrayWords[i] ;
		if(adloox_alerte_id!=""){
			adloox_alerte_desc2=adloox_alerte_desc2;
	}
	}
	}
	}
		var adloox_alerte_desc3='';
	var adloox_alerte3=0;
	var adloox_alerte_finale3=0;


	function adloox_search_content(){
		var webo_debut;
		var webo;
		var webo_fin;
		var webo_chaine;
		var alerte_desc3;

		var adloox_tpsexec_debut_global_wikio=new Date(); 
			var bodyContent = "";
		has_innerText = (document.body.innerText != undefined) ? true : false;
		if(!has_innerText){
			has_textContent = (document.body.textContent != undefined) ? true : false;
			if(!has_textContent){
				bodyContent = majuscule(document.body.innerHTML);
	}else{
		bodyContent = majuscule(document.body.textContent);
	}
	}else{
		bodyContent = majuscule(document.body.innerText);
	}

	for(var i= 0; i < arrayWords.length; i++){
		var adloox_tpsexec_fin_global_wikio=new Date(); 

		if((adloox_tpsexec_fin_global_wikio-adloox_tpsexec_debut_global_wikio)>6000){
			var webo_bool = webo_chaine || 0;

			if(! webo_bool) {
				var webo_chaine='';
	}



	var url="//"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc=timeout2&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);

	var img_alerte = document.createElement('img');
	img_alerte.id='ads_alerte_contenu';
	img_alerte.src = url;
	img_alerte.width = 0;
	img_alerte.height = 0;
	img_alerte.style.display='none';
	document.body.appendChild(img_alerte);
	return;
	}
	var chaine_alerte=arrayWords[i];
	var tab_chaine_alerte=chaine_alerte.split("+");
	var nb_occ=tab_chaine_alerte.length;


	if(nb_occ>1)
	{
		for (adloox_i=0;adloox_i<nb_occ;adloox_i=adloox_i+1)
		{
			if(adloox_alerte3>=0)
			{
				adloox_alerte3=(bodyContent.indexOf((tab_chaine_alerte[adloox_i])));
	}

	}
	}
	else
	{	
		adloox_alerte3=bodyContent.indexOf(" "+(arrayWords[i])+" ");
	}
	if(adloox_alerte3>=0)
	{
		adloox_alerte_finale3=1;
		alerte_desc3="contenu :"+arrayWords[i];
	}
	}var adloox_tpsexec_debut_global_wikio=new Date(); 
		var adloox_alerte_block;
	for(var i= 0; i < arrayWordsBlock.length; i++){
		var adloox_tpsexec_fin_global_wikio=new Date();
		if((adloox_tpsexec_fin_global_wikio-adloox_tpsexec_debut_global_wikio)>6000){
			var webo_bool = webo_chaine || 0;

			if(! webo_bool) {
				var webo_chaine='';
	}
	var url="//"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc=timeout2&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
	var img_alerte = document.createElement('img');
	img_alerte.id='ads_alerte_contenu';
	img_alerte.src = url;
	img_alerte.width = 0;
	img_alerte.height = 0;
	img_alerte.style.display='none';
	document.body.appendChild(img_alerte);
	return;
	}
	var chaine_alerte=arrayWordsBlock[i];
	var tab_chaine_alerte=chaine_alerte.split("+");
	var nb_occ=tab_chaine_alerte.length;
	var bodyContent = "";
	has_innerText = (document.body.innerText != undefined) ? true : false;
	if(!has_innerText){
		has_textContent = (document.body.textContent != undefined) ? true : false;
		if(!has_textContent){
			bodyContent = document.body.innerHTML;
	}else{
		bodyContent = document.body.textContent;
	}
	}else{
		bodyContent = document.body.innerText;
	}

	if(nb_occ>1) {
		for (adloox_i=0;adloox_i<nb_occ;adloox_i=adloox_i+1){
			if(adloox_alerte_block>=0){
				adloox_alerte_block=(bodyContent.indexOf(tab_chaine_alerte[adloox_i]));
	}
	}
	}
	else{	
		adloox_alerte_block=bodyContent.indexOf(" "+arrayWordsBlock[i]+" ");
	}
	if(adloox_alerte_block>=0){
		isForced = true;
		adloox_alerte_finale3=1;
		alerte_desc3="contenu :"+arrayWordsBlock[i];
	}
	if(isForced){
		set_fw();
		var adloox_img_fw="//"+adloox_fw_ip+"/ads/firewall/firewall_u.php?version=2&client=wikio&video=&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&url_referrer="+escape(adloox_uriFW)+"&ads_forceblock=1&log=1";
		scriptFw = document.createElement("script");
		scriptFw.src=adloox_img_fw;
		document.body.appendChild(scriptFw);
		//adloox_include(adloox_img_fw);
	}
	}

	

		adloox_alerte_desc=alerte_desc3;
	var img_alerte = document.createElement('img');

	if(adloox_alerte_finale3>0)
	{				

		if(adloox_alerte_id!='')
		{
			adloox_alerte_desc=adloox_alerte_desc;
	}
	var webo_bool = webo_chaine || 0;

	if(! webo_bool) {
		var webo_chaine='';
	}
	var url = "";

	adloox_servername_global_wikio=adloox_serveur_alerte;

	url="//"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc="+escape(adloox_alerte_desc)+"&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
	img_alerte.id='ads_alerte_contenu';
	img_alerte.src = url;
	img_alerte.width = 0;
	img_alerte.height = 0;
	img_alerte.style.display='none';
	document.body.appendChild(img_alerte);
	return;


	}


	}
	adloox_alerte_desc=adloox_alerte_desc1+' '+adloox_alerte_desc2;
	adloox_timeoutIDContent = window.setTimeout(adloox_search_content,2000);
	}
	else
	{
	   //rien




	}








	

			try{
				adloox_js_ob=document.currentScript;
				if(adloox_js_ob!=null){
					var adloox_js = adloox_js_ob.src;
	}

	}
	catch(err)
	{
		var adloox_js="";
	}

	if(adloox_alerte_finale>0)
	{
		adloox_servername_global_wikio=adloox_serveur_alerte;
	}
	
			var adloox_uriFW=adloox_uriCourant;

		var adloox_url2="//"+adloox_fw_ip+"/ads/firewall/firewall_u.php?version=2&client=wikio&video=&banniere="+adloox_banniere_global_wikio+"&id_editeur="+adloox_alerte_id+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&url_referrer="+escape(adloox_uriFW);


		function adloox_include(fileName){
			
					document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
				
	}

	
		adloox_include(adloox_url2);
	
		document.getElementById("ads_visibility_java_global_wikio_"+adloox_visite_id).src = "//" + adloox_servername_global_wikio + "/ads/image_java.php?client=wikio&id_editeur=" + escape(adloox_alerte_id) + "&type=regie_quotidienne&banniere=global&campagne=" + escape(adloox_identifiant_global_wikio) + "&os=" + escape(adloox_OS) + "&navigateur=" + escape(adloox_browser+"_"+adloox_browserVer) + "&methode=" + escape(adloox_methode) + "&fai=" + escape(document.title) + "&alerte=" + escape(adloox_alerte_finale) + "&alerte_desc=" + escape(adloox_alerte_desc) + "&js=" + escape(adloox_js) +  "&url_referrer=" + escape(adloox_uriCourant);
	window.fnVisiState = function(){ return true; };
	if (typeof document.hidden !== "undefined") {
		window.fnVisiState = function(){ return(document.visibilityState=="visible") };
	} else if (typeof document.mozHidden !== "undefined") {
		window.fnVisiState = function(){ return(document.mozVisibilityState=="visible") };
	} else if (typeof document.msHidden !== "undefined") {
		window.fnVisiState = function(){ return(document.msVisibilityState=="visible") };
	} else if (typeof document.webkitHidden !== "undefined") {
		window.fnVisiState = function(){ return(document.webkitVisibilityState=="visible") };
	}
	/*
* Calcul de visi en Flash
*/

var adl_F_Visi =function(client,banniere,server,campagne,hauteur,largeur,visite_id,url,method,userP,id_regen,visi,isVid){
	this.visible    = new Array();
	this.i          = 0;
	this.isVid      = isVid;
	this.server     = server;
	this.nSent      = 0;
	this.sumVisible = 0;
	this.indulgence = 50;
	this.delay      = 1;
	this.repeatV    = 0;
	this.ended      = true;
	this.url        = url;
	this.prevDiff   = new Date().getTime();
	this.client     = client;
	this.campagne   = campagne;
	this.banniere   = banniere;
	this.hasVisi    = visi;
	this.size       = {"height":hauteur,"width":largeur};
	this.browser    = userP.browser;
	this.method     = method;
	this.title      = "frame";
	this.method     = method;
	this.boucle     = 1;
	/**
	 *   Function retournant l\'object flash selon le browser
	 *   Utilise pour envoyer des donnees a l\'animation flash
	 **/
	this.getBrowser =function(){
		var d=navigator.appName,b=navigator.userAgent,c,a=b.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(a&&null!=(c=b.match(/version\/([\.\d]+)/i)))a[2]=c[1];return a=a?a[1]+"_"+parseInt(a[2]):d+"_"+navigator.appVersion
	};

	this.writeImg = function(){
		document.write('<div id="adlPPix"><object type="application/x-shockwave-flash" data="//j.adlooxtracking.com/ads/pix.swf" width="1" height="1" id="adlooxFPix" style="visibility: visible; "><param name="allowScriptAccess" value="always"><param name="flashvars" value="n=0&amp;idF=adlooxFPix&dom=' + document.location.hostname + '"></object></div>');
		//Check if image was actually writted
		_this = this;
		setTimeout(
			function(){
				if(document.getElementById('adlPPix')==null){
				_this.appendImg();
			}
			},500
		);
	}

	this.appendImg = function(){
		obD = document.createElement("div");
		obD.setAttribute("id","adlPPix");
		ob = document.createElement("Object");
		ob.setAttribute("type","application/x-shockwave-flash");
		ob.setAttribute("data","//j.adlooxtracking.com/ads/pix.swf");
		ob.setAttribute("width","1");
		ob.setAttribute("height","1");
		ob.setAttribute("id","adlooxFPix");
		al = document.createElement("param");
		al.setAttribute("name","allowScriptAccess");
		al.setAttribute("value","always");
		al2 = document.createElement("param");
		al2.setAttribute("name","flashvars");
		al2.setAttribute("value","n=0&idF=adlooxFPix&dom="+document.location.hostname);
		ob.appendChild(al);
		ob.appendChild(al2);
		obD.appendChild(ob);
		obb = document.body.appendChild(obD);
	}

	this.getFlashMovie = function (movieName) {
		//return document[movieName];
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		return (isIE) ? window[movieName] : document[movieName];
	}

	/**
	 *   Function inserant le flash dans le DOM
	 *   TODO se passer de la classe swfobject
	 **/
	this.insertFlash = function (n) {
		var params = {
			allowScriptAccess: "always"
		};
		var flashvars = {
			n: n,
			idF: "adlooxFPix"
		}
		if(this.isVid){
			this.appendImg();
		}else{
			this.writeImg();
		}
		function getAd(){
			this.ad = document.getElementById("adlPPix");
			try{
				pos = this.getPos(n);
				this.ad.setAttribute("style", "position:absolute;top:" + pos['y'] + "px;left:" + pos['y'] + "px");
			}catch(e){
				this.ad = null;
			}
		}
		window.setTimeout(getAd,1000);
	}

	this.send = function (vis) {
		if(this.nSent <= 11 && this.delay<= 40){
			if(this.repeatV<=7){
				visite_id        = (adloox_visite_id);
				adloox_nb_boucle = this.delay;
				retour           = vis;
				anticache        = Math.floor(Math.random() * 100000000);
				var url_ads = "//" + this.server + "/ads/image_visibilite2.php?client="+ this.client + "&banniere=" + escape(this.banniere) + "&visible=" + escape(retour) + "&visite_id=" + escape(visite_id) + "&url=" + escape(this.url) + "&campagne=" + escape(this.campagne) + "&boucle=" + escape(this.boucle) + "&pas=" + escape(this.delay) + "&browser="+ this.browser +"&anticache=" + anticache;
				document.getElementById("ads_visibility_"+id_regen).src = url_ads;
				document.getElementById("ads_visibility_"+id_regen).style.display = "none";
				this.nSent ++;
				this.boucle ++;
			}
		}
	}

	//Repositionne le pixel et call flash pour relancer le timediff
	this.redraw = function (i) {
		this.i = i;
		if (this.i == 3) {
			var vis;
			if(!window.fnVisiState()){
				vis = 0;
			}else{
				vis = this.sumVisible >= 2 ? 2 : 0;
			}
			//this.visible = [];
			this.sumVisible = 0;
			if(this.hasVisi){
				this.lstChk = vis == 2;
				this.send(vis);
			}
			//this.i = -1;
		}
		this.i++;
		this.ad  = document.getElementById("adlPPix");
		this.pix = document.getElementById("pix");
		pos      = this.getPos(this.i);
		this.ad.setAttribute("style", "position:absolute;top:" + pos['y'] + "px;left:" + pos['x'] + "px;height:1px;width:1px");
		this.getFlashMovie("adlooxFPix").setIFromJs(this.i);
	}


	/**
	 *  Function d\'initialisation
	 **/
	this.start = function () {
		this.insertFlash(0);
		bb = this.getBrowser();
		this.browser = bb.length>0 ? bb : navigator.userAgent ;
	}
	/**
	 *   Function retournant la taille de l\'iframe contenant la pub
	 **/
	this.getSize = function () {
		this.height = document.body.clientHeight;
		this.width  = document.body.clientWidth;
		this.method = this.width+"x"+this.height+" _ "+this.method;
	}
	this.getPos = function (i) {
		pos = new Array();
		switch(i){
			case 0:
				pos["x"] = (this.width / 2) -1;
				pos["y"] = (this.height / 2) -1;
				break;
			case 1:
				pos["x"] = (this.width / 2) +1;
				pos["y"] = (this.height / 2) +1;
				break;
			case 2:
				pos["x"] = (this.width / 2) -1;
				pos["y"] = (this.height / 2) +1;
				break;
			case 3:
				pos["x"] = (this.width / 2) +1;
				pos["y"] = (this.height / 2) -1;
				break;
		}
		return pos;
	}


	/**
	 *  Function appele par le flash 
	 **/
	this.setVisibility = function (bool) {
		this.j ++;
		this.visible[this.repeatV] = 1;
		//Des qu\'on recoit l\'info, on sette notre tableau de visibilite et on contacte flash pour n+1
		if (bool) {
			this.sumVisible += 1;
		}
		this.redraw(this.i);
	}


	//Fonction appele par le flash quand celui ci a fini de parcourir l\'integralite de l\'animation flash
	this.setEnded = function(bool){
		this.ended = bool;
	}

	this.checkVisible = function (delay) {
		if(this.ended){
			cTime         = new Date().getTime();
			nDelay        = parseInt(Math.ceil((cTime - this.prevDiff)/1000));
			this.delay    = nDelay>0 ? nDelay : 1;
			this.prevDiff = cTime;
			this.ended    = false;
			this.redraw(-1);
		}
	}


	//Init
	this.getSize();
	this.start();
	//document.getElementById("ads_visibility_"+id_regen).src = "//" + this.server + "/ads/image_java.php?client="+escape(this.client)+"&id_editeur=" + escape(this.alerte_id) + "&type=regie_quotidienne&banniere=" + escape(this.banniere) + "&campagne=" + escape(this.campagne) + "&os=" + escape(this.os) + "&navigateur=" + escape(this.browser) + "&methode=" + escape(this.method) + "&fai=" + escape(this.title) + "&alerte=" + escape(this.alerte.alerte) + "&alerte_desc=" + escape(this.alerte.desc) + "&js=" + escape(this.js) + "&visibilite=0&url_referrer=" + escape(this.url);
	_this = this;
	if (navigator.appName.indexOf("Microsoft")==-1) {
		if(this.hasVisi){
			var interval_id = setInterval(function () {
				_this.checkVisible(2)
				if (++_this.repeatV === 7) {
					window.clearInterval(interval_id);
				}
			}, 2000);
			window.setTimeout(function () {
				_this.checkVisible(5)
			}, 20000);
			window.setTimeout(function () {
				_this.checkVisible(5)
			}, 25000);
			window.setTimeout(function () {
				_this.checkVisible(5)
			}, 30000);
			window.setTimeout(function () {
				_this.checkVisible(30)
			}, 60000);
		}
	}
}
/*
 * Calcul de visi en JS
 */

adl_J_Visi = function(client,banniere,server,campagne,hauteur,largeur,visite_id,url,method,userP,id_regen,visi){
	this.ad          = new Object();
	this.client      = client;
	this.banniere    = banniere;
	this.server      = server;
	this.campagne    = campagne;
	this.visite_id   = visite_id;
	this.pas         = 1;
	this.taux_vision = 0.5;
	this.url         = url;
	this.repeatV     = 0;
	this.hasVisi     = visi;
	this.fnVisiState = function(){return true};
	this.nSent       = 0;
	this.size        = {"height":hauteur,"width":largeur};
	this.browser     = userP.browser;
	this.method      = method;
	this.boucle      = 1;

	this.seekScript  = function () {
		/**
		 * TODO On parcours tous les objects script et on recherche un tfav
		 **/
		if (window.adlScUsed == null) {
			window.adlScUsed = []
		}
		sc          = document.getElementsByTagName('script')
		script_name = campagne.replace(new RegExp("_ADLOOX_DATE", "g"), "") + "_" + banniere;
		for (i = 0; i < sc.length; i++) {
			s = sc.item(i);
			if (s.src && s.src.indexOf(script_name) != -1 && window.adlScUsed[i] == null) {
				//Avant de retourner le js on fait savoir qu'on utilise deja ce script pour calculer la visi en instanciant une variable global contenant la position du script dans la liste de site
				window.adlScUsed[i] = 1;
				return s;
			}
		}
		throw "SCRIPT_NOT_FOUND";
	}

	/**
	 * @return htmlElement
	 **/
	this.seekAd = function(){
		try{
			this.script = this.seekScript();
			var el = this.script.parentNode;
		}catch(e){
			var el = document.body;
		}
		var descendantElements = el.getElementsByTagName("*");
		for (var i = 0; i < descendantElements.length; i++) {
			if ((descendantElements[i].tagName == "OBJECT") || (descendantElements[i].tagName == "EMBED") || (descendantElements[i].tagName == "IFRAME")) {
				child   = descendantElements[i];
				this.size.height = this.size.height != 0 ? this.size.height : child.clientHeight;
				this.size.width = this.size.width != 0 ? this.size.width : child.clientWidth;
				this.method = this.size.width+"x"+this.size.height+" _ "+this.method;
				return {"element":child, "height":this.size.height, "width":this.size.width};
			}
		}
		this.size.height = this.size.height != 0 ? this.size.height : 1;
		this.size.width = this.size.width != 0 ? this.size.width : 1;
		this.method = this.size.width+"x"+this.size.height+" _ "+this.method;
		return {"element":el, "height":this.size.height, "width":this.size.width};
	}

	/**
	 * Envoi les donnes au serveur
	 **/
	this.send = function(pas){
		var isVi;
		if(!window.fnVisiState()){
			isVi = 0;
		}else{
			isVi = this.isVisible() ? "2" : "0";
		}
		//on charge limage_visibilite 2 
		if(this.nSent<=11){
			document.getElementById("ads_visibility_"+id_regen).src = "//" + this.server + "/ads/image_visibilite2.php?client="+escape(this.client)+"&banniere=" + escape(this.banniere) + "&visible=" + escape(isVi) + "&visite_id=" + escape(this.visite_id) + "&url=" + escape(this.url) + "&campagne=" + escape(this.campagne) + "&boucle="+escape(this.boucle)+"&pas=" + escape(pas) + "&browser="+this.browser+"&anticache=" + Math.floor(Math.random() * 100000000);
			document.getElementById("ads_visibility_"+id_regen).style.display = "none";
			this.boucle++;
			this.nSent++;
		}
	}


	//Retourne vrai si page est visible ou false si elle ne l'est pas ou alors que l'api page visibility n'est pas dispo pour ce browser
	this.isPageVisible = function(){
	}

	/**
	 *
	 **/
	this.isVisible = function(){
		//this.ad.element.style.display = "";
		var retour                    = 0;
		var cadreVisible              = new Object();
		var elementVisible            = new Object();
		var sourceParent              = this.ad.element.offsetParent;
		var hauteur_vue;
		var taux_vue;

		//Calcul crossbrowser de la taille de la page + viewport
		cadreVisible.xMin = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
		cadreVisible.xMax = window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth;
		cadreVisible.yMin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		cadreVisible.yMax = window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight;
		elementVisible.xMin = this.ad.element.offsetLeft;
		elementVisible.yMin = this.ad.element.offsetTop;

		//On calcul la somme des offset parent pour trouver la position relative au bord de la fenetre
		while (sourceParent) {
			elementVisible.xMin += sourceParent.offsetLeft;
			elementVisible.yMin += sourceParent.offsetTop;
			sourceParent = sourceParent.offsetParent;
		}

		elementVisible.xMax = elementVisible.xMin + this.ad.element.offsetWidth + this.ad.width;
		elementVisible.yMax = elementVisible.yMin + this.ad.element.offsetHeight + this.ad.height;

		//TODO ameliorable, calculer le range ou la pub est visible
		vHauteur = (((cadreVisible.yMax - elementVisible.yMin) / this.ad.height) >= this.taux_vision);
		if(cadreVisible.yMin > elementVisible.yMin){
			vHauteur = (((cadreVisible.yMin-elementVisible.yMin) / this.taux_vision) <= this.ad.height);
		}

		//TODO quand on voit 70% de la hauteur mais 1% de la largeur doit retourner false
		return (((cadreVisible.xMax - elementVisible.xMin) / this.ad.width) >= this.taux_vision) && vHauteur;
	}

	this.init = function(){
		this.browser = this.browser.length>0 ? this.browser : navigator.userAgent;
		this.ad = this.seekAd();
		this.send(0)
		if(this.hasVisi){
			if(typeof(adlI)==="undefined"){ adlI = -1; }
			adlI ++;
			window['_this_'+adlI] = this;

			if(adlI==0){
				window['_int_id_'+adlI] = setInterval(function () {
					Sender.send(2);
					if (++window['_this_'+adlI].repeatV === 7) {
						window.clearInterval(window['_int_id_'+0]);
					}
				}, 2000);
				window.setTimeout(function () {
					Sender.send(6);
				}, 20000);
				window.setTimeout(function () {
					Sender.send(5);
				}, 25000);
				window.setTimeout(function () {
					Sender.send(5);
				}, 30000);
				window.setTimeout(function () {
					Sender.send(30);
				}, 60000);
			}

		}
	}

	this.init();

}

		Sender = function(){};
	Sender.send = function(sec){
		for(i=0;i<=adlI;i++){
			window["_this_"+i].send(sec);
	}
	}

	var adloox_timestamp=new Date();
	
			if(adloox_bad_site==0) {
				if(adloox_iframe==1){
					adFPix = new adl_F_Visi("wikio","global",adloox_servername_global_wikio,adloox_identifiant_global_wikio,0,0,adloox_visite_id ,adloox_uriCourant,adloox_methode,{"browser":adloox_browser+"_"+adloox_browserVer,"os":adloox_OS},"global_wikio",true,false);
	}else{
		adl_J_Visi_global_wikio = new adl_J_Visi("wikio","global",adloox_servername_global_wikio,adloox_identifiant_global_wikio,0,0,adloox_visite_id ,adloox_uriCourant,adloox_methode,{"browser":adloox_browser+"_"+adloox_browserVer,"os":adloox_OS},"global_wikio",true);
	}
	}
	