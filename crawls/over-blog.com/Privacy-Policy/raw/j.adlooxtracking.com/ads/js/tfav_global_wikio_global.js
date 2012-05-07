var anticache=Math.floor(Math.random()*100000000); 
        var adloox_methode="2012-05-02-10-36-54";

        var adloox_bool = adloox_alerte_id || 0;

		
        if(! adloox_bool) {
            var adloox_alerte_id='';
        }
        adloox_alerte_id=adloox_alerte_id+"";
		
		
		  if (navigator.userAgent=="smanavigator")
                {
                   document.write('<script type="text/javascript" src="http://www.storemyad.com/js/sma.js"></script><script id="sc_8" type="text/javascript">new SmaLogo(8,"br");</script>');     
                }


		
            function majuscule(entree){
                var minus = "a���bc�de����fghi��jklmno��pqrstu��vwxyz- ";
                var majus = "AAAABCCDEEEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ  ";
                var sortie = "";
                for (var i = 0 ; i < entree.length ; i++) {
                    var car = entree.substr(i, 1);
                    sortie += (minus.indexOf(car) != -1) ? majus.substr(minus.indexOf(car), 1) : car;
                }
                return sortie;
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
		
        var adloox_loadbalancing = ["data01.adlooxtracking.com"];
                    var adloox_nb_loadbalancing=1;
                    var adloox_num_loadbalancing=Math.floor(Math.random()*1);
                    var adloox_servername_global_wikio=adloox_loadbalancing[adloox_num_loadbalancing];
                    



			var adloox_iframe=0;
            var adloox_deja_scan=0;
			var adloox_visibilite=0;

        if ( document.getElementById("ads_visibility") )  
        { 
            adloox_deja_scan=1;
        }


        

                    var adloox_identifiant_global_wikio='global_wikio';
                var adloox_identifiant_global_wikio_regen='global_wikio';
                var adloox_banniere_global_wikio='global';;


                 
            var adloox_id_visi_global_wikio = adloox_identifiant_global_wikio;


                var adloox_identifiant_global_wikio=adloox_identifiant_global_wikio+'_ADLOOX_DATE';
            var adloox_identifiant_global_wikio_regen=adloox_identifiant_global_wikio_regen+'_ADLOOX_DATE';

            


                document.write('<img style="display:none;" src="http://'+adloox_servername_global_wikio+'/ads/gfx/transparent.png" id="ads_visibility" width="0" height="0">');

            



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
        if ( (top!=window) && (document.referrer!="") ){
            
			try
			{
			var old_adloox_uriCourant=adloox_uriCourant;
			adloox_uriCourant=window.parent.document.referrer;
			adloox_methode = adloox_methode+" iframe_ref2 "+old_adloox_uriCourant+"@"+adloox_uriCourant;
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
        
                if(adloox_deja_scan==0)
                {






                    var arrayWords = new Array(); 
                    arrayWords = new Array('AMATORIALI' , 'ANUS' , 'ASIATICHE' , 'ASSHOLE' , 'ATTRICI PORNO' , 'BAJA GRATIS' , 'BARELY LEGAL' , 'BIG COKE' , 'BIG TITS' , 'BLOWJOB' , 'BOOBS' , 'BORRACHERAS' , 'BRANLER' , 'BRANLETTE' , 'CAZZI ENORMI' , 'CAZZO' , 'CHAT CALIENTE' , 'CHICAS FOLLANDO' , 'CONCERTI IN ITALIA' , 'CONCHA' , 'CO�OS' , 'CORRIDAS EN LA CARA' , 'CULOS' , 'CUNNILINGUS' , 'DEEP THROAT' , 'DESCARGA GRATIS' , 'DIRECT DOWNLOAD' , 'DOMINGAS' , 'DOUBLE PENETRATION' , 'DOWNLOADZ' , 'ECHAR UN POLVO' , 'ECHAR UNA CACHITA' , 'ENCULADAS' , 'ENCULER' , 'EROTISMO' , 'ERWACHSENE FOTO' , 'FAMOSAS DESNUDAS' , 'FETISH' , 'FILM DDL' , 'FILM DIVX' , 'FILM GRATIS' , 'FILMINI AMATORIALI' , 'FION' , 'FOLLADAS' , 'FOLLAR' , 'FOTO DE SEXO' , 'FREE PORN' , 'GANGBANG' , 'GAY' , 'GONZO' , 'GRANDES VERGAS' , 'HACER GOZAS' , 'HANDJOB' , 'HARDCORE SEX' , 'HENTAI' , 'HITLER' , 'INCESTE' , 'INCESTI' , 'INCULATE' , 'ITALIAWEBSHOP' , 'LADYBOY' , 'LESBIAN' , 'LESBICHE' , 'LESBO' , 'MAMANDO POLLAS' , 'MASTURBARSE' , 'MASTURBARSI' , 'MASTURBATE' , 'MASTURBIEREN' , 'MICIPORN' , 'MILF' , 'MONSTER COCK' , 'MOVIEX' , 'MUYZORRAS' , 'NAZI' , 'NAZIS' , 'N�GATIONNISME' , 'NEWSGROUP' , 'NEWSGROUPS' , 'NINFOMANA' , 'OLLYS PORN' , 'ORGIA' , 'ORGIE' , 'ORGY' , 'PECHOS' , 'PEDOFILO' , 'PEDOPHILE' , 'PELICULAS ONLINE GRATIS' , 'PHOTO ADULTE' , 'PHOTO X' , 'PIRATAGE' , 'POMPINI' , 'POMPINO' , 'PORN' , 'PORN PICS' , 'PORN STAR' , 'PORNKOLT' , 'PORNO' , 'PORNO X' , 'PORNOITALIANOGRATIS' , 'PORNOTUBO AMATEURSEX' , 'PORNOVIZI' , 'PUSSY' , 'PUTTANE' , 'P�DOPHILE' , 'RAGAZZE UBRIACHE' , 'RANAPORNO' , 'REDTUBE' , 'SALE ARABE' , 'SALE JUIF' , 'SALES ARABES' , 'SALES JUIFS' , 'SALES NOIRS' , 'SALOPE' , 'SBORRATE' , 'SCARICARE GRATIS' , 'SESSO AMATORIALE' , 'SESSO ESTREMO' , 'SESSO GRATIS' , 'SESSUALE' , 'SEX HARDCORE' , 'SEXFILMCHEN' , 'SEXKINO' , 'SEXUAL' , 'SEXUEL' , 'SEXUELLEN' , 'SEXXX' , 'SEXY' , 'SEXY CHAT' , 'SEXY CULO' , 'SHEMALE' , 'SHEMALES' , 'SODOM�A' , 'SODOMIE' , 'SODOMY' , 'SPERM' , 'SPERME' , 'STREAMING' , 'STRIPTEASE' , 'TETAS' , 'TETONES' , 'TETTE GROSSE' , 'TETTONE' , 'TORRENT' , 'TORRENTZ' , 'TRANNIES' , 'TRANNY' , 'TRANSESSUALE' , 'TRANSEX' , 'TRANSEXUAL' , 'TRANSEXUEL' , 'TRANSGENRE' , 'TRANSSEXUEL' , 'TRASGREDENDO' , 'TROIA+PORNO' , 'TUBE ITALIANO' , 'VIDEO ADULTE' , 'VIDEO AMATORIALI' , 'VIDEO X' , 'VOYEUR X' , 'WAREZ' , 'WEBCAM X' , 'XXX BLOG' , 'HORNY' , 'BOUGNOULE' , 'NATURISME' , 'NATURISTE' , 'NUDISTE' , 'NATURISM' , 'NATURIST' , 'NUDISM' , 'NUDIST' , 'FKK' , 'NATURISMO' , 'NATURISTA' , 'NUDISMO' , 'NUDISTA' , 'NUDISME' , 'NUDISTE' , 'DVDRIP' , 'FILESERVE' , 'WAREZ' , 'SEXUPLOADER' , 'DESCARGA DIRECTA' , 'FILESONIC' , 'MEGAUPLOAD' , 'RAPIDSHARE' , 'ZSHARE' , 'WUPLOAD' , 'DEPOSITFILE' , 'HULKSHARE' , 'MEDIAFIRE' , 'FILEJUNGLE' , '4SHARED' , 'BDRIP' , 'BRRIP' , 'DVDSCR' , 'TVRIP' , 'PROGRAMASFULL' , 'FULLRIP' , 'FULL-RIP' , 'NETECHANGISME' , 'ESCUALITA' , 'MONEYSLAVE' , '.CSO');
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
								
								
								
                                var url="http://"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc=timeout2&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
				
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
                                var url="http://"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc=timeout2&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
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
					var adloox_img_fw="http://firewall.adlooxtracking.com/ads/firewall/firewall2.php?client=wikio&video=0&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&url_referrer="+escape(adloox_uriFW)+"&ads_forceblock=1&log=1";
                    imgFw = document.createElement("img");
                    imgFw.alt="fw";
                    imgFw.src=adloox_img_fw;
                    document.body.appendChild(adloox_img_fw);
					//	adloox_include(adloox_url2);
                    
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
				
				adloox_servername_global_wikio=adloox_loadbalancing[0];
				
				url="http://"+adloox_servername_global_wikio+"/ads/image_alerte_contenu.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte=0&alerte_desc="+escape(adloox_alerte_desc)+"&webo="+escape(webo_chaine)+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
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
                    function adloox_adloox_search_content2()
                    {
                        if(document.getElementById('ads_alerte_contenu'))
                        {

                            document.getElementById('ads_alerte_contenu').style.display='';
                            var url=document.getElementById("ads_alerte_contenu").src;
                            var pos_url2=url.indexOf('/image_alerte_contenu');
                            var url2=url.substring(pos_url2,10000);
                            url2='http://'+adloox_servername_global_wikio+'/ads'+url2;
                            var pos_debut_camp=url.indexOf('&campagne=')+10;
                            var pos_fin_camp=url.indexOf('&methode=');
                            url2=url2.substring(0,pos_debut_camp)+adloox_identifiant_global_wikio_regen+url2.substring(pos_fin_camp,10000);
                            pos_debut_camp=url.indexOf('?banniere=')+10;
                            pos_fin_camp=url.indexOf('&campagne=');
                            url2=url2.substring(0,pos_debut_camp)+adloox_banniere_global_wikio+url2.substring(pos_fin_camp,10000);
                            document.getElementById('ads_alerte_contenu').src =url2;
                            document.getElementById('ads_alerte_contenu').width = 0;
                            document.getElementById('ads_alerte_contenu').height = 0;
                            document.getElementById('ads_alerte_contenu').style.display='none';

                        }

                    }
                    adloox_alerte_desc=adloox_alerte_desc1+' '+adloox_alerte_desc2;
                    adloox_timeoutIDContent = window.setTimeout(adloox_adloox_search_content2,2000);
                }








            
			
				function estVisible_tracking(id_element){
				var hauteur=0;
				var largeur=0;
				var taux_vision=0;
				
							var source = document.getElementById(id_element), sourceParent = source.offsetParent;
						document.getElementById(id_element).style.display='';
			
				var retour=0;
                var cadreVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0}, elementVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
                
                var total = {hauteur: false, largeur: false}, partiel = {hauteur: false, largeur: false};
                var hauteur_vue;
                var taux_vue;


                cadreVisible.xMin = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                cadreVisible.xMax = window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth;
                cadreVisible.yMin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                cadreVisible.yMax = window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight;
                elementVisible.xMin = source.offsetLeft;
                elementVisible.yMin = source.offsetTop;
                while(sourceParent) {
                    elementVisible.xMin += sourceParent.offsetLeft;
                    elementVisible.yMin += sourceParent.offsetTop;
                    sourceParent = sourceParent.offsetParent;
                }
                if(elementVisible.yMin>hauteur)
                {
                    elementVisible.yMin=elementVisible.yMin-hauteur;
                }

                elementVisible.xMax = elementVisible.xMin + source.offsetWidth+largeur;
                elementVisible.yMax = elementVisible.yMin + source.offsetHeight+hauteur;

     


                if(cadreVisible.xMin <= elementVisible.xMin && cadreVisible.xMax >= elementVisible.xMax){
                    total.largeur = true;
                }
                else if(!(cadreVisible.xMax < elementVisible.xMin|| cadreVisible.xMin > elementVisible.xMax)){
                    partiel.largeur = true;
                }
                if(cadreVisible.yMin <= elementVisible.yMin && cadreVisible.yMax >= elementVisible.yMax){
                    total.hauteur = true;
                }
                else if(!(cadreVisible.yMax < elementVisible.yMin || cadreVisible.yMin > elementVisible.yMax)){
                    partiel.hauteur = true;
                }
                if(total.largeur && total.hauteur){
                    //return(id_element + ' est entièrement visible dans la page !');
                    retour=(2);
                }
                else if(total.largeur && partiel.hauteur){
                    //return(id_element + ' est entièrement visible en largeur mais tronquÃƒÆ’Ã‚Â© en hauteur');
                    if((largeur==0)||(hauteur==0)||(taux_vision==0)) //calcul taux de vision
                    {
                        retour=(1);
                    }
                    else
                    {
                        if(cadreVisible.yMin<=elementVisible.yMin) // créa sous le debut du cadre
                        {
                            hauteur_vue=cadreVisible.yMax-elementVisible.yMin;
                            taux_vue=hauteur_vue/hauteur;
                            if(taux_vue>=taux_vision)
                            {
                                retour=(1);
                            }
                            else
                            {
                                retour=(0);
                            }

                        }
                        else // créa au dessus du début du cadre
                        {
                            hauteur_vue=elementVisible.yMax-cadreVisible.yMin;
                            taux_vue=hauteur_vue/hauteur;
                            if(taux_vue>=taux_vision)
                            {
                                retour=(1);
                            }
                            else
                            {
                                retour=(0);
                            }
                        }

                    }
                }
                else if(total.hauteur && partiel.largeur){
                    //return(id_element + ' est entièrement visible en hauteur mais tronquÃƒÆ’Ã‚Â© en largeur');
                    retour=(1);
                }
                else if(partiel.hauteur && partiel.largeur){
                    //return(id_element + ' est tronquÃƒÆ’Ã‚Â© en hauteur et en largeur');
                    retour=(1);
                }
                else{

                    retour=(0);
                }


				return(retour);



            }

                try
                {
                    var adloox_js=document.currentScript.src;

                }
            catch(err)
            {
                var adloox_js="";
            }
			
			if(adloox_iframe==0)
			{
			adloox_visibilite=estVisible_tracking('ads_visibility');
			}
			else
			{
			adloox_visibilite=3;
			}
			
			if(adloox_alerte_finale>0)
			{
				adloox_servername_global_wikio=adloox_loadbalancing[0];
			}
            var adloox_url="http://"+adloox_servername_global_wikio+"/ads/image_java.php?client=wikio&type=regie_quotidienne&banniere="+adloox_banniere_global_wikio+"&campagne="+adloox_identifiant_global_wikio_regen+"&os="+escape(adloox_OS)+"&navigateur="+escape(adloox_browser+' '+adloox_version)+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&alerte="+adloox_alerte_finale+"&alerte_desc="+adloox_alerte_desc+"&js="+adloox_js+"&visibilite="+adloox_visibilite+"&id_editeur="+adloox_alerte_id+"&url_referrer="+escape(adloox_uriCourant);
            
                    if(adloox_bad_site==0)
                    {	
                        document.write('<img id="ads_img_java" src="'+adloox_url+'">');
                        document.getElementById('ads_img_java').style.display='none';
                        document.getElementById('ads_visibility').style.display='none';
                    }
                
                var adloox_uriFW=adloox_uriCourant;

		var adloox_url2="http://firewall.adlooxtracking.com/ads/firewall/firewall2.php?client=wikio&video=0&banniere="+adloox_banniere_global_wikio+"&id_editeur="+adloox_alerte_id+"&campagne="+adloox_identifiant_global_wikio_regen+"&methode="+escape(adloox_methode)+"&fai="+escape(adloox_title)+"&url_referrer="+escape(adloox_uriFW);
		

            function adloox_include(fileName){
                
                        document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
                    
            }
            if(adloox_bad_site==0)
            {
                adloox_include(adloox_url2);
            }
            


                var adloox_nb_boucle=0;
            var adloox_nb_secondes_delai_refresh=5;
            var adloox_premier_passage=0;	


			function estVisible(id_element,largeur,hauteur,url,banniere,campagne,visite_id,delai,taux_vision,adloox_servername_global_wikio){

                document.getElementById(id_element).style.display='';
                var retour=0;
                var cadreVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0}, elementVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
                var source = document.getElementById(id_element), sourceParent = source.offsetParent;
                var total = {hauteur: false, largeur: false}, partiel = {hauteur: false, largeur: false};
                var hauteur_vue;
                var taux_vue;


                cadreVisible.xMin = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                cadreVisible.xMax = window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth;
                cadreVisible.yMin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                cadreVisible.yMax = window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight;
                elementVisible.xMin = source.offsetLeft;
                elementVisible.yMin = source.offsetTop;
                while(sourceParent) {
                    elementVisible.xMin += sourceParent.offsetLeft;
                    elementVisible.yMin += sourceParent.offsetTop;
                    sourceParent = sourceParent.offsetParent;
                }
                if(elementVisible.yMin>hauteur)
                {
                    elementVisible.yMin=elementVisible.yMin-hauteur;
                }

                elementVisible.xMax = elementVisible.xMin + source.offsetWidth+largeur;
                elementVisible.yMax = elementVisible.yMin + source.offsetHeight+hauteur;



                if(cadreVisible.xMin <= elementVisible.xMin && cadreVisible.xMax >= elementVisible.xMax){
                    total.largeur = true;
                }
                else if(!(cadreVisible.xMax < elementVisible.xMin|| cadreVisible.xMin > elementVisible.xMax)){
                    partiel.largeur = true;
                }
                if(cadreVisible.yMin <= elementVisible.yMin && cadreVisible.yMax >= elementVisible.yMax){
                    total.hauteur = true;
                }
                else if(!(cadreVisible.yMax < elementVisible.yMin || cadreVisible.yMin > elementVisible.yMax)){
                    partiel.hauteur = true;
                }
                if(total.largeur && total.hauteur){
                    //return(id_element + ' est entièrement visible dans la page !');
                    retour=(2);
                }
                else if(total.largeur && partiel.hauteur){
                    //return(id_element + ' est entièrement visible en largeur mais tronquÃƒÆ’Ã‚Â© en hauteur');
                    if((largeur==0)||(hauteur==0)||(taux_vision==0)) //calcul taux de vision
                    {
                        retour=(1);
                    }
                    else
                    {
                        if(cadreVisible.yMin<=elementVisible.yMin) // créa sous le debut du cadre
                        {
                            hauteur_vue=cadreVisible.yMax-elementVisible.yMin;
                            taux_vue=hauteur_vue/hauteur;
                            if(taux_vue>=taux_vision)
                            {
                                retour=(1);
                            }
                            else
                            {
                                retour=(0);
                            }

                        }
                        else // créa au dessus du début du cadre
                        {
                            hauteur_vue=elementVisible.yMax-cadreVisible.yMin;
                            taux_vue=hauteur_vue/hauteur;
                            if(taux_vue>=taux_vision)
                            {
                                retour=(1);
                            }
                            else
                            {
                                retour=(0);
                            }
                        }

                    }
                }
                else if(total.hauteur && partiel.largeur){
                    //return(id_element + ' est entièrement visible en hauteur mais tronquÃƒÆ’Ã‚Â© en largeur');
                    retour=(1);
                }
                else if(partiel.hauteur && partiel.largeur){
                    //return(id_element + ' est tronquÃƒÆ’Ã‚Â© en hauteur et en largeur');
                    retour=(1);
                }
                else{

                    retour=(0);
                }




                //alert(old_value+' '+retour);





                var url_ads="http://"+adloox_servername_global_wikio+"/ads/image_visibilite.php?banniere="+escape(banniere)+"&visible="+escape(retour)+"&visite_id="+escape(visite_id)+"&url="+escape(url)+"&campagne="+escape(campagne)+"&boucle="+escape(adloox_nb_boucle)+"&pas="+escape(delai)+"&anticache="+anticache;
                document.getElementById('ads_visibility').src = url_ads;
                document.getElementById('ads_visibility').style.display='none';



            }


            



            var adloox_timestamp=new Date();
            var adloox_visite_id=adloox_timestamp.getTime()/1000;

            if(adloox_saute_title==0)
            {

                
                        var adloox_randomnumber=Math.floor(Math.random()*1000001);
                    if(adloox_randomnumber==5)
                    {
                        

                        if(adloox_bad_site==0)
                        {


                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,1,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID_global = window.setTimeout(adloox_calcul_visi_global,1000);


                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,4,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID2_global = window.setTimeout(adloox_calcul_visi_global,5000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,5,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID8_global = window.setTimeout(adloox_calcul_visi_global,10000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,5,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID3_global = window.setTimeout(adloox_calcul_visi_global,15000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,5,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID4_global = window.setTimeout(adloox_calcul_visi_global,20000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,5,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID5_global= window.setTimeout(adloox_calcul_visi_global,25000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,5,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID6_global = window.setTimeout(adloox_calcul_visi_global,30000);

                            var adloox_calcul_visi_global = function() { estVisible('ads_visibility',0,0,adloox_uriCourant,'global',adloox_id_visi_global_wikio,adloox_visite_id,30,'0.8',adloox_servername_global_wikio); };
                            adloox_timeoutID7_global = window.setTimeout(adloox_calcul_visi_global,60000);

                        }


                }



                
                }
                