/* Ensighten Bootstrap -- PLEASE DO NOT REMOVE */
document.write(unescape('%3Cscript src="//nexus.ensighten.com/lenovo/Bootstrap.js"%3E%3C/script%3E'));

var countrySettings = function(country,language) {
	this.searchAction 	= "//shop.lenovo.com/SEUILibrary/controller/e/web/LenovoPortal/en_US/site.workflow:SimpleSiteSearch";
	this.searchValue 	= "Search";
	this.menuXml			= "/includes/menus/default.xml";
	
	if (country.toUpperCase() == 'AE' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_aeind_en_AE.xml';
			this.searchValue 	= "Search";
			this.searchAction 	= "//shop.lenovo.com/SEUILibrary/controller/e/aeind/LenovoPortal/en_AE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'AR' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_arweb.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/arweb/LenovoPortal/es_AR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'BR' && language.toLowerCase() == 'pt')  {
			this.menuXml= '/includes/menus/MenusExport_brweb.xml';
			this.searchValue = "Procurar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/brweb/LenovoPortal/pt_BR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'BO' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_boind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/boind/LenovoPortal/es_BO/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CL' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_clind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/clind/LenovoPortal/es_CL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CO' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_coweb.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/coweb/LenovoPortal/es_CO/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'MX' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_mxweb.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/mxweb/LenovoPortal/es_MX/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'EC' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_ecind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/ecind/LenovoPortal/es_EC/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'PE' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_peind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/peind/LenovoPortal/es_PE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'PY' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_pyind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/pyind/LenovoPortal/es_PY/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'UY' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_uyind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/uyind/LenovoPortal/es_UY/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'VE' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_veind.xml';
			this.searchValue = "Buscar";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/veind/LenovoPortal/es_VE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'AT' && language.toLowerCase() == 'de')  {
			this.menuXml= '/includes/menus/MenusExport_atweb_de_AT.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/atweb/LenovoPortal/de_AT/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'AU' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_auweb_en_AU.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/auweb/LenovoPortal/en_AU/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'BD' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_bdweb_en_BD.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/bdweb/LenovoPortal/en_BD/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'BE' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_beind_en_BE.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/beind/LenovoPortal/en_BE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'BG' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_bgind_en_BG.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/bgind/LenovoPortal/en_BG/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CH' && language.toLowerCase() == 'de')  {
			this.menuXml= '/includes/menus/MenusExport_chind_de_CH.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/chind/LenovoPortal/de_CH/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CH' && language.toLowerCase() == 'fr')  {
			this.menuXml= '/includes/menus/MenusExport_chind_fr_CH.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/chind/LenovoPortal/fr_CH/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CN' && language.toLowerCase() == 'zh')  {
			this.menuXml= '/includes/menus/MenusExport_cnweb_zh_CN.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/cnweb/LenovoPortal/zh_CN/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CZ' && language.toLowerCase() == 'cs')  {
			this.menuXml= '/includes/menus/MenusExport_czind_cs_CZ.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/czind/LenovoPortal/cs_CZ/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'DE' && language.toLowerCase() == 'de')  {
			this.menuXml= '/includes/menus/MenusExport_deweb_de_DE.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/deweb/LenovoPortal/de_DE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'DK' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_dkind_en_DK.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/dkind/LenovoPortal/en_DK/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'EG' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_egind_en_EG.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/egweb/LenovoPortal/en_EG/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'ES' && language.toLowerCase() == 'es')  {
			this.menuXml= '/includes/menus/MenusExport_esind_es_ES.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/esind/LenovoPortal/es_ES/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'FI' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_fiind_en_FI.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/fiind/LenovoPortal/en_FI/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'FR' && language.toLowerCase() == 'fr')  {
			this.menuXml= '/includes/menus/MenusExport_frweb_fr_FR.xml';
			this.searchValue = "Chercher";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/frweb/LenovoPortal/fr_FR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'GB' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_gbweb_en_GB.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/gbweb/LenovoPortal/en_GB/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'GR' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_grind_en_GR.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/grind/LenovoPortal/en_GR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'HK' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_hkweb_en_HK.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/hkweb/LenovoPortal/en_HK/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'HK' && language.toLowerCase() == 'zh')  {
			this.menuXml= '/includes/menus/MenusExport_hkweb_zh_HK.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/hkweb/LenovoPortal/zh_HK/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'HR' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_hrind_en_HR.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/hrind/LenovoPortal/en_HR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'HU' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_huind_en_HU.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/huind/LenovoPortal/en_HU/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'ID' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_idweb_en_ID.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/idweb/LenovoPortal/en_ID/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'IE' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_ieweb_en_IE.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/ieweb/LenovoPortal/en_IE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'IL' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_ilind_en_IL.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/ilind/LenovoPortal/en_IL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'IN' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_inweb_en_IN.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/inweb/LenovoPortal/en_IN/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'IT' && language.toLowerCase() == 'it')  {
			this.menuXml= '/includes/menus/MenusExport_itind_it_IT.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/itind/LenovoPortal/it_IT/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'JP' && language.toLowerCase() == 'ja')  {
			this.menuXml= '/includes/menus/MenusExport_jpweb_ja_JP.xml';
			this.searchValue = "検索";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/jpweb/LenovoPortal/ja_JP/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'KR' && language.toLowerCase() == 'ko')  {
			this.menuXml= '/includes/menus/MenusExport_krweb_ko_KR.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/krweb/LenovoPortal/ko_KR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'LK' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_lkweb_en_LK.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/lkweb/LenovoPortal/en_LK/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'MY' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_myweb_en_MY.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/myweb/LenovoPortal/en_MY/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'MP' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_mpind_en_MP.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/aeweb/LenovoPortal/en_AE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'NL' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_nlind_en_NL.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/nlind/LenovoPortal/en_NL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'NL' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_nlweb_en_NL.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/nlweb/LenovoPortal/en_NL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'NL' && language.toLowerCase() == 'nl')  {
			this.menuXml= '/includes/menus/MenusExport_nlweb_nl_NL.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/nlweb/LenovoPortal/nl_NL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'NO' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_noind_en_NO.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/noind/LenovoPortal/en_NO/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'NZ' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_nzweb_en_NZ.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/nzweb/LenovoPortal/en_NZ/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'PH' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_phweb_en_PH.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/phweb/LenovoPortal/en_PH/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'PL' && language.toLowerCase() == 'pl')  {
			this.menuXml= '/includes/menus/MenusExport_plind_pl_PL.xml';
			this.searchValue = "Szukaj";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/plind/LenovoPortal/pl_PL/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'RO' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_roind_en_RO.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/roind/LenovoPortal/en_RO/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'RU' && language.toLowerCase() == 'ru')  {
			this.menuXml= '/includes/menus/MenusExport_ruweb_ru_RU.xml';
			this.searchValue = "Поиск";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/ruweb/LenovoPortal/ru_RU/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'SA' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_saind_en_SA.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/saind/LenovoPortal/en_SA/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'SE' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_seind_en_SE.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/seind/LenovoPortal/en_SE/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'SG' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_sgweb_en_SG.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/sgweb/LenovoPortal/en_SG/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'SI' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_siind_en_SI.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/siind/LenovoPortal/en_SI/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'SK' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_skind_en_SK.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/skind/LenovoPortal/en_SK/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'TH' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_thweb_en_TH.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/thweb/LenovoPortal/en_TH/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'TR' && language.toLowerCase() == 'tr')  {
			this.menuXml= '/includes/menus/MenusExport_trind_tr_TR.xml';
			this.searchValue = "Ara";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/trind/LenovoPortal/tr_TR/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'TW' && language.toLowerCase() == 'zh')  {
			this.menuXml= '/includes/menus/MenusExport_twweb_zh_TW.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/twweb/LenovoPortal/zh_TW/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'UA' && language.toLowerCase() == 'ua')  {
			this.menuXml= '/includes/menus/MenusExport_uaweb_ua_UA.xml';
			this.searchValue = "Пошук";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/uaweb/LenovoPortal/ua_UA/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'VN' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_vnweb_en_VN.xml';
			this.searchValue = "Search";
			this.searchAction = "//shopap.lenovo.com/SEUILibrary/controller/e/vnweb/LenovoPortal/en_VN/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'US' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_web_en_US.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/web/LenovoPortal/en_US/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CA' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_webca_en_CA.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/webca/LenovoPortal/en_CA/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'CA' && language.toLowerCase() == 'fr')  {
			this.menuXml= '/includes/menus/MenusExport_webca_fr_CA.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/webca/LenovoPortal/fr_CA/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'ZA' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_zaind_en_ZA.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/zaind/LenovoPortal/en_ZA/site.workflow:SimpleSiteSearch";
	}
	else if (country.toUpperCase() == 'RS' && language.toLowerCase() == 'en')  {
			this.menuXml= '/includes/menus/MenusExport_rsind_en_RS.xml';
			this.searchValue = "Search";
			this.searchAction = "//shop.lenovo.com/SEUILibrary/controller/e/rsind/LenovoPortal/en_RS/site.workflow:SimpleSiteSearch";
	}
};

var LoadMastHead = function(country,language) {
	var searchAction 	= "//shop.lenovo.com/SEUILibrary/controller/e/web/LenovoPortal/en_US/site.workflow:SimpleSiteSearch";
	var searchValue 	= "Search";
	var menuXml			= "/includes/menus/default.xml";
	var mastheadHtml	= "/includes/masthead.html";
	

	
	this.buildMenuItemIE6 = function (item) {
		if (item != undefined) {
			$("<a>").attr('class','menu-ie').attr('href',$(item).attr("link")).html($(item).attr("label")).appendTo("#menus-cell");
		}
	};
	
	this.buildMainMenuItem = function (selector, item) {
		if (item != undefined) {
			var menuItem 	= $("<div>").attr('class','main-menu-item');
			var link 		= $("<a>").attr('href',$(item).attr("link")).html($(item).attr("label")).appendTo(menuItem);
			
			if ($(item).children('menu').length > 0) {
				var subMenu = $("<div class=\"sub-menu\">").appendTo(menuItem);
				
				$(item).children('menu').each(function(i) {
					buildMenuItem(subMenu,$(this));
				});
			}
			$(selector).append(menuItem);
		}
	}
	
	this.buildMenuItem = function (selector, item) {
		if (item != undefined) {
			var menuItem 	= $("<div>").attr('class','sub-menu-item');
			var link 		= $("<a>").attr('href',$(item).attr("link")).html($(item).attr("label")).appendTo(menuItem);
			
			if ($(item).children('menu').length > 0) {
				var subMenu = $("<div class=\"sub-menu\">").appendTo(menuItem);
				
				$(item).children('menu').each(function(i) {
					buildMenuItem(subMenu,$(this));
				});
			}
			$(selector).append(menuItem);
		}
	};
	
	this.buildMenus = function() {
		$.ajax({
			type: "GET",
			url: menuXml,
			dataType: "xml",
			success: function(data) {
				$(data).find('masthead:eq(0)').find('menu').each(function(){
					var masthead_label 	= $(this).attr('label')
					var masthead_link 	= $(this).attr('link')
					if (masthead_label.indexOf('{') == -1 && masthead_label.indexOf('}') == -1 && masthead_link) {
						$('<li>').html('<a href="' + masthead_link + '">' + masthead_label + '</a>').appendTo('#masthead ol');
					}
					else if (masthead_label.indexOf('{') == -1 && masthead_label.indexOf('}') == -1) {
						$('<li>').html(masthead_label).appendTo('#masthead ol');
					}
				});
				
				if ($.browser.msie && parseInt(jQuery.browser.version) == 5 ) {
					$(data).find('root').children('menu').each(function(i) {
						buildMenuItemIE6($(this));
					});
					
				} else {		
				
					var mainMenu = $("<div>").attr('class','main-menu').appendTo("#menus-cell");
					
					$(data).find('root').children('menu').each(function(i) {
						buildMainMenuItem(mainMenu,$(this));
					});
					
					//alert("Version 1.3");
					
					$(".main-menu-item").hover(function() {
								
								if ($(this).width() > $(this).children('div.sub-menu').width()) {
									$(this).children('div.sub-menu').css('width',($(this).width()+22)+'px');
								}
						
								$(this).children('div.sub-menu').css('left','0px');
								$(this).children('div.sub-menu').css('top',($(this).outerHeight(true)-1)+'px');
								//alert($(this).children('div.sub-menu').css('top'));
								$(this).children('div.sub-menu').show();
							},
							function(){
								$(this).children('div.sub-menu').hide();
							}
					);
					
					$("#menus-cell > ul > li").each(function() {
							var thisWidth = $(this).width()+12;
							$(this).children("ul").each(function(){
								if (thisWidth > $(this).width()) {
									$(this).width(thisWidth+30);
								}
							});
					});
				
				}
				
				addCartIcon();
			}
		});
	};
	
	this.setCountry=function() {
		$('#logo-link').attr('href','/'+country+'/'+language+'/');
		$('#country_select').find('option').each(function(i) {
			var path 	= '/'+country.toUpperCase()+'/'+language.toUpperCase()+'/';
			var title 	= $(this).attr('title').toUpperCase();
			
			if (country.toUpperCase() == 'GB') {
				path = '/UK/'+language.toUpperCase()+'/';
			}

			if (country.toUpperCase() == 'CA' && language.toUpperCase() == 'FR') {
				path = '/CA/'+language.toUpperCase()+'/';
			}
			
			if (title.indexOf(path) != -1 ) {
				$(this).attr('selected','selected');
			}
			else {
				$(this).removeAttr('selected');
			}
			
			$(this).attr('site',path.toLowerCase());
			
			
		});
		
		$("#country_select").change(function () {
	          $("#country_select option:selected").each(function (idx, element) {
	        	  document.cookie = "LenovoSite=" + escape($(element).attr('site')) + "; path="+escape("/")+"; expires=01/01/2020 00:00:00";
	        	  document.location.href=$(element).attr('title');
	          });
	    });

	};
	
	this.applySearch=function() {
		$(".site_search").find('input[name="q"]').attr('value',searchValue).focus(function(){
			$(this).attr('value','');
		});
		$(".site_search").find('input[name="lang"]').attr('value',language);
		$(".site_search").find('input[name="cc"]').attr('value',country);
		$(".site_search").attr('action',searchAction);
	};
	
	this.addCartIcon=function() {
		// add cart icon
		$('#masthead #utility-menu li a[href*="cart.workflow"]').css({
			'background': 'url("//shop.lenovo.com/SEUILibrary/lenovo-portal/images/icons/cart.gif") no-repeat 0 -1px transparent',
			'padding-left': '17px'
		});
	};
	
	
	searchAction 	= new countrySettings(country,language).searchAction;
	searchValue 	= new countrySettings(country,language).searchValue;
	menuXml 		= new countrySettings(country,language).menuXml;
	
	$.ajax({
		type: "GET",
		url: mastheadHtml,
		dataType: "html",
		success: function(data) {
			$('#masthead-container').replaceWith(data);	
			buildMenus();
			applySearch();
			setCountry();
		}
	});
};

var LoadFooter = function(country,language) {
	var footer	= "/includes/footers/"+language.toLowerCase()+"-"+country.toLowerCase()+".html";
	var searchAction = new countrySettings(country,language).searchAction;
	var searchValue  = new countrySettings(country,language).searchValue;
	
	$.ajax({
		type: "GET",
		url: footer,
		dataType: "html",
		success: function(data) {
			$('#footer-container').replaceWith(data);				
			// replaces the footer search as the correct format was not applied to the country files.
			$("#footer .site_search").replaceWith('<form action="" class="site_search" name="site_search" method="get"><input type="text" value="Search"  name="q" /><input type="hidden" value=""  name="cc" /><input type="hidden" value=""  name="lang" /><button class="submit_site_search"></button></form>');
			
			$(".site_search").find('input[name="q"]').attr('value',searchValue).focus(function(){
				$(this).attr('value','');
			});
			$(".site_search").find('input[name="lang"]').attr('value',language);
			$(".site_search").find('input[name="cc"]').attr('value',country);
			$(".site_search").attr('action',searchAction);
		},
		error:function() {
			$('#footer-container').replaceWith("/includes/footer.html");			
			// replaces the footer search as the correct format was not applied to the country files.
			$("#footer .site_search").replaceWith('<form action="" class="site_search" name="site_search" method="get"><input type="text" value="Search"  name="q" /><input type="hidden" value=""  name="cc" /><input type="hidden" value=""  name="lang" /><button class="submit_site_search"></button></form>');
			
			$(".site_search").find('input[name="q"]').attr('value',searchValue).focus(function(){
				$(this).attr('value','');
			});
			$(".site_search").find('input[name="lang"]').attr('value',language);
			$(".site_search").find('input[name="cc"]').attr('value',country);
			$(".site_search").attr('action',searchAction);
		}
	});
};


