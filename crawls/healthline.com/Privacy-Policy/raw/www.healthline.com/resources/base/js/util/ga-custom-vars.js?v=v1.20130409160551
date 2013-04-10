////////////////////////////////////////////////////////////////////////////////////////////////////////
// function: HL_ga_setCustomVars(cfg)
// description: validate page type site data prior to GA page load tracking
//
// INBOUND data:
// - topiccenter
// - toolCount
// - smartAnswerCount
// - isPlatformPageTypeResponsive
// - hcSubPage
// - expandablenav
// - adModel.dfpAdSite
// - adModel.dfpAds["Generic"]['k1']
// - adModel.dfpAds["Generic"]['k2']
// - imuid
// - adModel.msId
// - Marin ID
//

function HL_ga_setCustomVars(cfg) {

  _gaq.push(['hl._setAccount', cfg.account]);
  _gaq.push(['hl._setDomainName', cfg.domainName]);
  _gaq.push(['hl._setAllowLinker', true]); // enable cross-domain tracking functionality
  _gaq.push(['hl._setSiteSpeedSampleRate', cfg.siteSpeedSampleRate]);

  if(cfg.topiccenter) {
    _gaq.push(['hl._setCustomVar', 1,'Topic Center', cfg.topiccenter, 3]);
  } else {
    _gaq.push(['hl._setCustomVar', 1,'Topic Center', 'none', 3]);
  }

  // get this page's type
  var HL_GA_dfpSite = cfg.dfpAdSite;
  // page type info is the third and possibly fourth elements of dfpAdSite
  var HL_GA_dfpSiteArray = HL_GA_dfpSite.split('.');

  // build static page type arrays
  var HL_GA_hcSubPageArray = [
    {pageType: "home", pageLabel: "TC Home"},
    {pageType: "tab", pageLabel: "TC Tab"},
    {pageType: "article", pageLabel: "Original Article"},
    {pageType: "articlehrl", pageLabel: "Original Article"}
  ];

  var HL_GA_pageTypesArray = [
    {pageType: "hp", pageLabel: "Homepage", contentArea: "Original Content"},
    {pageType: "lc", pageLabel: "TC Tab", contentArea: "Original Content"},
    {pageType: "nw", pageLabel: "News", contentArea: "Original Content"},
    {pageType: "sld", pageLabel: "Slideshow", contentArea: "Original Content"},
    {pageType: "ser", pageLabel: "Site Search", contentArea: "Application"},
    {pageType: "dir", pageLabel: "Directory", contentArea: "Directory"},
    {pageType: "bm", pageLabel: "Body Map", contentArea: "Original Content"},
    {pageType: "bim", pageLabel: "BIM", contentArea: "Original Content"},
    {pageType: "ss", pageLabel: "Symptom Search", contentArea: "Application"},
    {pageType: "ts", pageLabel: "Treatment Search", contentArea: "Application"},
    {pageType: "di", pageLabel: "Drug Interactions", contentArea: "Application"},
    {pageType: "pf", pageLabel: "Pill Identifier", contentArea: "Application"},
    {pageType: "tl", pageLabel: "Drug Compare", contentArea: "Application"},
    {pageType: "ds", pageLabel: "Doctor Search", contentArea: "Application"},
    {pageType: "vid", pageLabel: "5min Video", contentArea: "Licensed Content"},
    {pageType: "x", subtype:
      [
        {pageType: "recipe",pageLabel: "Recipe", contentArea: "Original Content"},
        {pageType: "error",pageLabel: "Error", contentArea: "Application"}
      ]
    },
    {pageType: "art", subtype:
      [
        {pageType: "x",pageLabel: "Assessment", contentArea: "Original Content"},
        {pageType: "gl",pageLabel: "Gale Article", contentArea: "Licensed Content"}
      ]
    },
    {pageType: "dn", subtype:
      [
        {pageType: "x",pageLabel: "Drug Search", contentArea: "Application"},
        {pageType: "au",pageLabel: "Gold Article", contentArea: "Licensed Content"}
      ]
    },
    {pageType: "he", subtype:
      [
        {pageType: "toc", pageLabel: "Blog", contentArea: "Original Content"},
        {pageType: "post", pageLabel: "Blog Article", contentArea: "Original Content"},
        {pageType: "bio", pageLabel: "Blog Bio", contentArea: "Original Content"}
      ]
    }
  ];

  for( var ptItem = 0; ptItem < HL_GA_pageTypesArray.length; ptItem++ ) {
    if( HL_GA_dfpSiteArray[3] == HL_GA_pageTypesArray[ptItem].pageType ){
      if(typeof HL_GA_pageTypesArray[ptItem].subtype === "undefined"){
        // exception for Topic Center types
        if( HL_GA_dfpSiteArray[3] == "lc"){
          for( var hcItem = 0; hcItem < HL_GA_hcSubPageArray.length; hcItem++ ) {
            if(cfg.hcSubPage == HL_GA_hcSubPageArray[hcItem].pageType){
              _gaq.push(['hl._setCustomVar', 2,'Content Type', HL_GA_hcSubPageArray[hcItem].pageLabel, 3]);
              _gaq.push(['hl._setCustomVar', 4,'General Content Area', "Original Content", 3]);
            }
            if(cfg.hcSubPage == "articlehrl"){
              _gaq.push(['hl._setCustomVar', 3,'Content Grouping', "HRL", 3]);
            }
          }
        } else {
          _gaq.push(['hl._setCustomVar', 2,'Content Type', HL_GA_pageTypesArray[ptItem].pageLabel, 3]);
          _gaq.push(['hl._setCustomVar', 4,'General Content Area', HL_GA_pageTypesArray[ptItem].contentArea, 3]);
        }
        break; // stop searching
      } else if(HL_GA_dfpSiteArray[3] == "x") {
          if( cfg.isErrorPage ){
            _gaq.push(['hl._setCustomVar', 2,'Content Type', "Error", 3]);
            _gaq.push(['hl._setCustomVar', 4,'General Content Area', "Application", 3]);
            break;
          } else if(location.href.indexOf("health-recipes") !== -1) {
            _gaq.push(['hl._setCustomVar', 2,'Content Type', "Recipe", 3]);
            _gaq.push(['hl._setCustomVar', 4,'General Content Area', "Original Content", 3]);
            break;
          } else {
            _gaq.push(['hl._setCustomVar', 2,'Content Type', "General", 3]);
            _gaq.push(['hl._setCustomVar', 4,'General Content Area', "Application", 3]);
            break;
          }
      } else {
        for( var stItem = 0; stItem < HL_GA_pageTypesArray[ptItem].subtype.length; stItem++ ) {
          if( HL_GA_dfpSiteArray[4] == HL_GA_pageTypesArray[ptItem].subtype[stItem].pageType ){
            _gaq.push(['hl._setCustomVar', 2,'Content Type', HL_GA_pageTypesArray[ptItem].subtype[stItem].pageLabel, 3]);
            _gaq.push(['hl._setCustomVar', 4,'General Content Area', HL_GA_pageTypesArray[ptItem].subtype[stItem].contentArea, 3]);
            break; // stop searching
          }
        }

      }
    }
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////

  if(cfg.k1){
    _gaq.push(['hl._setCustomVar', 10,'K1', cfg.k1, 3]);
  }

  if(cfg.k2){
    _gaq.push(['hl._setCustomVar', 11,'K2', cfg.k2, 3]);
  }

  if(cfg.imuid){
    _gaq.push(['hl._setCustomVar', 12,'IMUID', cfg.imuid, 3]);
  }

  if(cfg.micrositeId){
    _gaq.push(['hl._setCustomVar', 13,'Sponsored Program ID', cfg.micrositeId, 3]);
  }

  if(cfg.marinId){
    cfg.marinId = cfg.marinId.replace("{ifsearch:s}{ifcontent:c}","");
    _gaq.push(['hl._setCustomVar', 14, 'Marin ID', cfg.marinId, 2]);
  }

  if(cfg.dfpAdSite){
    _gaq.push(['hl._setCustomVar', 15,'DFP Site', HL_GA_dfpSite, 3]);
  }

  if(cfg.isResponsive) {
    _gaq.push(['hl._setCustomVar', 20,'Design: Responsive', 'Yes', 3]);
  } else {
    _gaq.push(['hl._setCustomVar', 20,'Design: Responsive', 'No', 3]);
  }

  if(cfg.isExpandableNav) {
    _gaq.push(['hl._setCustomVar', 21,'Design: Expand/Collapse', 'Yes', 3]);
  }

} // HL_ga_custom_vars


////////////////////////////////////////////////////////////////////////////////////////////////////////
// function: HL_ga_sendPageView()
// description: call GA _trackPageview for ajax page views
// Notes: GA custom vars data from page load is included in each subsequent _trackPageview call

function HL_ga_sendPageView() {

  var pageURI = window.location.pathname + window.location.hash;
  _gaq.push(['hl._trackPageview', pageURI]);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// function: HL_ga_sendTrackEvent()
// description: call GA _trackEvent for user interactions
// Notes: GA custom vars data from page load is included in each _trackEvent call
// Required GA Track Event parameters: category, action
// Optional GA Track Event parameters: label, value, noninteraction

function HL_ga_sendTrackEvent(eventData) {

  var gaTrackEventData = ['hl._trackEvent'];
  var gaEventCategory,gaEventAction,gaEventLabel,gaEventValue,gaEventNonInteraction;

  if(eventData) {

    for ( var name in eventData ) {
      if (eventData.hasOwnProperty(name)) {
        if(name == 'gaEventCategory') {
          gaEventCategory = eventData[name];
        } else if(name == 'gaEventAction') {
          gaEventAction = eventData[name];
        } else if(name == 'gaEventLabel') {
          gaEventLabel = eventData[name];
        } else if(name == 'gaEventValue') {
          gaEventValue = eventData[name];
        } else if(name == 'gaEventNonInteraction') {
          gaEventNonInteraction = eventData[name];
        }
      }
    }

    if(gaEventCategory && gaEventAction) {
      gaTrackEventData.push(gaEventCategory,gaEventAction);
      if(gaEventLabel){
        gaTrackEventData.push(gaEventLabel);
      }
      if(gaEventValue){
        gaTrackEventData.push(gaEventValue);
      }
      if(gaEventNonInteraction){
        gaTrackEventData.push(gaEventNonInteraction);
      }
      _gaq.push(gaTrackEventData);
    }

  }

}