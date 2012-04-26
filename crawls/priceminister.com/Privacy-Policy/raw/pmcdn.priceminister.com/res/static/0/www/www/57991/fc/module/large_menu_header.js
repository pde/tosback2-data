if ( typeof(PM.Header) == 'undefined' ){
    PM.Header = {};
}
/**
 * Variable commune aux fichiers large_menu_header.js et jquery.pm.autocomplete.js
 * indiquant si l'utilisateur survole actuellement un des home-univers
 * @see jquery.pm.autocomplete.js, méthode "$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete" "
 */
PM.Header.isMouseOver = false;

PM.Header.countCartArticles = function(nbrArticles, articleLblSingle, articleLblMultiple){
  var parent = $('cartArticleCount')
  
  if(1 == nbrArticles){
    parent.innerHTML = nbrArticles + " " + articleLblSingle;
  }
  
  else if(nbrArticles > 1){
    parent.innerHTML = nbrArticles + " " + articleLblMultiple;
  }
  
  else {
      PM.Dom.parent(parent).removeChild(parent);
  }
}

PM.Header.createUniverses = function(universesUl, isExternalHeaderAction, mouseOverCallBackMethod) {
    //On récupére l array de large_menu.js
  var menusData = price_menu;
  
  if(ie6){
    var iframe = PM.Dom.createElement("div");
    iframe.innerHTML = '<iframe id="ie_frame" src="javascript:false;" style="width:992px; position: absolute; top:34px; left:0px; filter:alpha(opacity=0); z-index: 1990; height: 262px; display:none;"></iframe>';
    universesUl.appendChild(iframe);
  }
    
    
  var menusCount = menusData.length;
  for(var i = 0; i<menusCount; i++) {
    var universData = menusData[i]
    var universLabel = universData.Un;
    var universLink = universData.L;
    var universId = ("hdr_" + PM.Header.getUniversNameFromUrl(universLink)).toLowerCase();

    var isSellMenu = menusCount - 2 == i;
    var isHelpMenu = menusCount - 1 == i;
    var isFirst = 0 == i;
    var menuFooterClasses;
    
    var universLi = PM.Dom.createElement("li", {id:universId});
    var universA = PM.Dom.createElement("a", {href:universLink});
    universA.innerHTML = universLabel;
    universLi.appendChild(universA);
    
    if(isFirst) {
        //Si premier bouton on ajoute la css first_child
        PM.Dom.Class.add(universLi, "first_child");
    }
    
    if(isSellMenu) {
        //Style différent si l'on est sur le bouton vendre
        PM.Dom.Class.add(universLi, "pm-sell");
        PM.Dom.Class.add(universA, "sell-lnk");
        menuFooterClasses = {left:"lnkl", right:"lnkr"};
    }else if(isHelpMenu) {
        //Style différent si l'on est sur le bouton aide
        PM.Dom.Class.add(universLi, "pm-help last_child");
        PM.Dom.Class.add(universA, "help-lnk");
        menuFooterClasses = {left:"lnkl", right:"lnkr"};
    }else {
        //Sinon on ajoute le style standard des boutons univers
        PM.Dom.Class.add(universLi, "hdr-univers " + universId);
        PM.Dom.Class.add(universA, "univers");
        menuFooterClasses = {left:"all-products", right:"sell"};
    }
    
    if(PM.Util.deleteWhiteChar(universLabel).indexOf("<br/>") != -1) {
        //Si le nom de l'univers contient un <br/> on lui applique le style line_break
        PM.Dom.Class.add(universLi,"line_break");
    }
  
    if(!isExternalHeaderAction) {
        //Creation des menus déroulants
        PM.Header.createXlMenu(universLi, universData, menuFooterClasses, mouseOverCallBackMethod);
    }
    universesUl.appendChild(universLi);
  };
}

PM.Header.createXlMenu = function(parent, universData, menuFooterClasses, mouseOverCallBackMethod) {
    
    var navCtnDiv = PM.Dom.createElement("div", {className:"nav-ctn"});
    var menuData = universData.CL;
    PM.UI.hide(navCtnDiv);

    var universCtnDiv = PM.Dom.createElement("div", {className:"univers-ctn"});  
    
    var pmTipsDiv = PM.Dom.createElement("div", {className:"pm-tips"});
    PM.Header.createTipsColumn(pmTipsDiv, menuData[0])
    
    var subNavCtnDiv = PM.Dom.createElement("div", {className:"sub-nav-ctn"});
    // On ne récupère ni la premiere ni les deux dernières colonnes de la liste des colonnes menuData, qui sont respectivement bon plans, promos et footer
    PM.Header.createSubNavCtn(subNavCtnDiv, menuData.slice(1, menuData.length - 2));
    
    // Creation du Footer a partir du dernier element de la liste menuData
    PM.Header.createFooter(subNavCtnDiv, menuData[menuData.length - 1], menuFooterClasses);

    //Colonne des autopromos
    var omorpotauBoxsDiv = PM.Dom.createElement("div", {className:"omorpotau-boxs"});
    //Le remplissage des colonnes est géré depuis IG
    
    universCtnDiv.appendChild(pmTipsDiv);
    universCtnDiv.appendChild(subNavCtnDiv);
    universCtnDiv.appendChild(omorpotauBoxsDiv);
    
    navCtnDiv.appendChild(universCtnDiv);
    parent.appendChild(navCtnDiv);

    var mouseoverTimer;
    var mouseoutTimer;
    var delayMouseOver = 500;
    var delayMouseLeave = 500;
//Ajout de l'action mouseover sur les menus
    PM.Event.add(parent, "mouseover", 
      function(){
        window.clearTimeout(mouseoutTimer);
        mouseoverTimer = window.setTimeout(
          function(){
              PM.Header.onMouseOver(parent, navCtnDiv,universData.PID,universData.AID, mouseOverCallBackMethod);},delayMouseOver);
      });
      
    PM.Event.add(parent, "mouseleave", 
      function(){
          window.clearTimeout(mouseoverTimer);
          mouseoutTimer = window.setTimeout(
            function(){
                PM.Header.onMouseOut(parent, navCtnDiv);},delayMouseLeave);});
}
 
var isOnMouseOver = false;
PM.Header.onMouseOver = function(parent, divToShow,promosPageId,autopromoId,mouseOverCallBackMethod){
    if( isOnMouseOver){
     return;
    }
    PM.Header.isMouseOver= true;
    
    //On retire le focus pour éviter les bugs de superposition avec l'autocomplete ou les combo boxes
    parent.firstChild.focus();
    parent.firstChild.blur();
    
    //APP-35480
    if(ie6 || ie7){
      $j("#nav_headline #FB_like").hide();
    }
    
    //On désactive l'autocomplétion pour éviter la superposition avec l'affichage du header   
    var ac_results = $j('div.ac_results');
    ac_results.hide();

    // Fermeture de la dropdown "Types d'offre"
    var dropdown_typeoffer = $j('select#ft');
    dropdown_typeoffer.blur();
  
    PM.UI.show(divToShow);
    if(ie6){
      PM.UI.show($('ie_frame'));
    }

    PM.Dom.Class.add(parent,"hover");
    if(PM.Dom.Class.has(parent,"pm-sell") ){
      PM.Dom.Class.add($j('.sell-lnk',parent),"hover");
    }
    
    PM.Statistics.autopromo("INT-" + autopromoId + "-intext", divToShow);
    
    if (mouseOverCallBackMethod){
      mouseOverCallBackMethod.apply();
    }
}


PM.Header.onMouseOut = function(parent, divToShow){
    PM.Header.isMouseOver = false;
    PM.UI.hide(divToShow);
    if(ie6){
      PM.UI.hide($('ie_frame'));
    }
    
    //APP-35480
    if(ie6 || ie7){
      $j("#nav_headline #FB_like").show();
    }
    
    PM.Dom.Class.remove(parent,"hover");
    if(PM.Dom.Class.has(parent,"pm-sell") ){
      PM.Dom.Class.remove($j('.sell-lnk',parent),"hover");
    }
}
 


PM.Header.createTipsColumn = function(parent, colData) {
    // Une colonne de bons plans a la même structure qu'une colonne de nav
    PM.Header.createNavColumn(parent,colData);
    PM.Header.setFirstChildLastChildClass($j('dl', parent));
}

PM.Header.createSubNavCtn = function(parent, colsData) {
    var colCount = colsData.length;
    var navCtnUl = PM.Dom.createElement("ul", {className:"categories col-" + colCount});
    PM.Header.createNavColumns(navCtnUl,colsData);
    PM.Header.setFirstChildLastChildClass($j('li', navCtnUl));
    parent.appendChild(navCtnUl);
}

PM.Header.createFooter = function(parent, footerColumnData, menuFooterClasses) {
    var footerData = footerColumnData.GR[0].CT;
    // Ajout des liens Vendez le votre et Voire tous les produits de la catégorie
    var otherLinks = PM.Dom.createElement("div", {className:"more-lnks"});
    
    if(footerData.length > 0){
      var seeAllInCatLnk = PM.Dom.createElement("a", {href:footerData[0].L, className:menuFooterClasses.left});
      seeAllInCatLnk.innerHTML = footerData[0].V
      otherLinks.appendChild(seeAllInCatLnk);
    }
    
    if(footerData.length > 1){
      var sellYourLnk = PM.Dom.createElement("a", {href:footerData[1].L, className:menuFooterClasses.right});
      sellYourLnk.innerHTML = footerData[1].V;
      otherLinks.appendChild(sellYourLnk);
     }
     
    parent.appendChild(otherLinks);
}

//creation des 1/2/3 colonnes de nav 
PM.Header.createNavColumns = function(parent, colsData) {
    for(var i = 0; i < colsData.length; i++){
        var colsLi = PM.Dom.createElement("li");
        PM.Header.createNavColumn(colsLi, colsData[i]);
        PM.Header.setFirstChildLastChildClass($j('dl',colsLi));
        parent.appendChild(colsLi);
    }
}

//creation d'une colonne de nav
PM.Header.createNavColumn = function(parent,colData) {
    for(var i = 0; i < colData.GR.length; i++){
        var colDl = PM.Dom.createElement("dl");
        PM.Header.createGroup(colDl,colData.GR[i]);
        //On set le param firstChildIndex à 1 pour éviter le <dt> et appliquer la classe first_child au premier <dd>
        PM.Header.setFirstChildLastChildClass($j('dd',colDl));
        parent.appendChild(colDl);
    }
}

//creation d'un group de nav
PM.Header.createGroup = function(parent, groupData) {
    var grpDt = PM.Dom.createElement("dt");
    grpDt.innerHTML = groupData.T;
    parent.appendChild(grpDt);
    
    for(var i = 0; i<groupData.CT.length; i++){
        var catDd = PM.Dom.createElement("dd");
        var catA = PM.Dom.createElement("a", {href: groupData.CT[i].L});
        catA.innerHTML = groupData.CT[i].V;
        
        catDd.appendChild(catA);
        parent.appendChild(catDd);
    }
}

PM.Header.createOmorpotauColumn = function(parent, promoId) {
  
    var box1 = PM.Dom.createElement("div", {id:"sas_"+promoId+"_11089",className:"box-1 first_child"});
    var box2 = PM.Dom.createElement("div", {id:"sas_"+promoId+"_11090",className:"box-2"});
    var box3 = PM.Dom.createElement("div", {id:"sas_"+promoId+"_11091",className:"box-3 last_child"});
  
    parent.appendChild(box1);  
    parent.appendChild(box2);
    parent.appendChild(box3);
}

PM.Header.getUniversNameFromUrl = function(link) {
    var lst = link.split("/");
    return lst[lst.length - 1];
}

PM.Header.largeMenuHeaderHighlight = function(categoryName) {
    var highlightedCat = $("hdr_" + categoryName.toLowerCase());
    if(highlightedCat){//la catégorie peut ne pas être présente : si on est sur un custom shop
      PM.Dom.Class.add(highlightedCat,"current");
    }
}

PM.Header.setFirstChildLastChildClass = function(elementList) {
    if(elementList.length > 0){
      PM.Dom.Class.add(elementList[0], "first_child");
      PM.Dom.Class.add(elementList[elementList.length - 1], "last_child");
    }
}

PM.Header.addOpenNewWindow = function(links) {
  for (var i=0; i < links.length ; i++ ) {
    links[i].target = "_blank";
  }
}

PM.Header.addIeElements = function() {
    var parentList = $j(".pm-tips");
    for(var i = 0; i < parentList.length; i++){
        var divToAddBefore = PM.Dom.createElement("div", {className: "corner_t corner_tt"});
        divToAddBefore.innerHTML = "&nbsp;";
        var divToAddAfter = PM.Dom.createElement("div", {className: "corner_t corner_tb"});
        divToAddAfter.innerHTML = "&nbsp;";
        var newPmTips = parentList[i];
        var firstChild = parentList[i].firstChild;
        newPmTips.insertBefore(divToAddBefore, firstChild);
        newPmTips.appendChild(divToAddAfter);
    }
}

PM.Header.setExportableHeaderTarget = function() {
  var headerTable = $("headerpm");
  var links = $j('a', headerTable);
  var sellLink = $j('.sell a', headerTable);
  
  for(var i = 0; i < links.length; i++){
    link = links[i];
    if (!link.target && link.href!=sellLink[0].href) {
      link.target = "_top"
    }
    
  }
}

// KPI

PM.Header.Kpi = function() {
  // tags click de nav
  var headerTable = $("headerpm");
  PM.Debug.store("mise en place tags click de nav sur le header");
  
  //
  //Top header
  var logoLinksList = $j(".top-header a.pm-logo", headerTable);
  for (var i = 0 ; i < logoLinksList.length ; i++) { //Logo
    PM.Event.add(logoLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LogoPM::HomePage', PM.Statistics.Type.NAVIGATION));
  }
  
  //
  //Dashboard
  var inscriptionLinksList = $j("#dashboard .subscribe a", headerTable);
  for (var i = 0 ; i < inscriptionLinksList.length ; i++) { //Inscription
    PM.Event.add(inscriptionLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienInscription::FormulaireInscription', PM.Statistics.Type.NAVIGATION));
  }
  
  var parrainageLinksList = $j("#dashboard .sponsorship a", headerTable);
  for (var i = 0 ; i < parrainageLinksList.length ; i++) { //parrainage
    PM.Event.add(parrainageLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienParrainage::PageParrainage', PM.Statistics.Type.NAVIGATION));
  }
  
  var autologLinksList = $j("#dashboard .autologged a", headerTable);
  for (var i = 0 ; i < autologLinksList.length ; i++) { //autolog
    PM.Event.add(autologLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Autolog::Identification::Formulaire::Autre', PM.Statistics.Type.NAVIGATION));
  }
  
  var sellLinksList = $j("#dashboard li.sell a", headerTable);
  for (var i = 0 ; i < sellLinksList.length ; i++) { //lien Vendre dashboard
    PM.Event.add(sellLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienVendre::HomeVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  var accountLinksList = $j("div.dashboard li.account a", headerTable);
  for (var i = 0 ; i < accountLinksList.length ; i++) { //Mon compte
    PM.Event.add(accountLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMonCompte::HomeMonCompte', PM.Statistics.Type.NAVIGATION));
  }
  
  var cartLinksList = $j("div.dashboard li.cart a", headerTable);
  for (var i = 0 ; i < cartLinksList.length ; i++) { //Mon panier
    PM.Event.add(cartLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMonPanier::MonPanier', PM.Statistics.Type.NAVIGATION));
  }
  
  //
  //Top navigation
  var globalSearchLinksList = $j("#submitbtn", headerTable);
  for (var i = 0 ; i < globalSearchLinksList.length ; i++) { //Recherche globale
    PM.Event.add(globalSearchLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::BoutonRechercheGlobale::RechercheGlobale', PM.Statistics.Type.NAVIGATION));
  }
  
  var avalLinksList = $j("ul.pm-syn li:eq(0) a", headerTable);
  for (var i = 0 ; i < avalLinksList.length ; i++) { //premium 1
    PM.Event.add(avalLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Premium1::PagePremium1', PM.Statistics.Type.NAVIGATION));
  }
  
  var priceTVLinksList = $j("ul.pm-syn li:eq(1) a", headerTable);
  for (var i = 0 ; i < priceTVLinksList.length ; i++) { //premium 2
    PM.Event.add(priceTVLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Premium2::PagePremium2', PM.Statistics.Type.NAVIGATION));
  }
  
  var carsLinksList = $j("ul.pm-syn li:eq(2) a", headerTable);
  for (var i = 0 ; i < carsLinksList.length ; i++) { //premium 3
    PM.Event.add(carsLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Premium3::PagePremium3', PM.Statistics.Type.NAVIGATION));
  }
  
  var voyagerLinksList = $j("ul.pm-syn li:eq(3) a", headerTable);
  for (var i = 0 ; i < voyagerLinksList.length ; i++) { //premium 4
    PM.Event.add(voyagerLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Premium4::PagePremium4', PM.Statistics.Type.NAVIGATION));
  }
  
  //
  //Navigation
  var universeLinksList = $j("#navigation a.univers", headerTable);
  for (var i = 0 ; i < universeLinksList.length ; i++) { //univers
    PM.Event.add(universeLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::OngletUnivers::HomeUnivers', PM.Statistics.Type.NAVIGATION));
  }
  
  var helpLinksList = $j("#navUl li.pm-sell a.sell-lnk", headerTable);
  for (var i = 0 ; i < helpLinksList.length ; i++) { //HomeAide
    PM.Event.add(helpLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::OngletVendre::HomeVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  var sellLinksList = $j("#navUl li.pm-help a.help-lnk", headerTable);
  for (var i = 0 ; i < sellLinksList.length ; i++) { //Onglet Vendre
    PM.Event.add(sellLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::OngletAide::GuideDutilisation', PM.Statistics.Type.NAVIGATION));
  }
  
  //
  //Sous menu : gauche [*| | ]
  var tipsLinksList = $j("#navigation .hdr-univers .pm-tips dl:even a", headerTable);
  for (var i = 0 ; i < tipsLinksList.length ; i++) { //bon plans
    PM.Event.add(tipsLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::BonsPlans::PageBonsPlans', PM.Statistics.Type.NAVIGATION));
  }
  
  var tips2LinksList = $j("#navigation .hdr-univers .pm-tips dl:odd a", headerTable);
  for (var i = 0 ; i < tips2LinksList.length ; i++) { //bon plans 2
    PM.Event.add(tips2LinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::Astuces::PageAstuces', PM.Statistics.Type.NAVIGATION));
  }
  
  var sellLeftLinksList = $j("#navigation li.pm-sell div.pm-tips a", headerTable);
  for (var i = 0 ; i < sellLeftLinksList.length ; i++) { //lien menu gauche vendre
    PM.Event.add(sellLeftLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuGaucheVendre::CategorieVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  var helpLeftLinksList = $j("#navigation li.pm-help div.pm-tips a", headerTable);
  for (var i = 0 ; i < helpLeftLinksList.length ; i++) { //lien menu gauche aide
    PM.Event.add(helpLeftLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuGaucheAide::CategorieVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  //Sous-menus : centre [ |*| ]
  var categoryLinksList = $j("#navigation li.hdr-univers div.sub-nav-ctn ul.categories a", headerTable);
  for (var i = 0 ; i < categoryLinksList.length ; i++) { //categories de navigation
    PM.Event.add(categoryLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienCategorieHeader::Categorie', PM.Statistics.Type.NAVIGATION));
  }
  
  var categorySellLinksList = $j("#navigation li.pm-sell div.sub-nav-ctn ul.categories a", headerTable);
  for (var i = 0 ; i < categorySellLinksList.length ; i++) { //liens central sous onglet MeV
    PM.Event.add(categorySellLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuCentralVendre::CategorieVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  var categoryHelpLinksList = $j("#navigation li.pm-help div.sub-nav-ctn ul.categories a", headerTable);
  for (var i = 0 ; i < categoryHelpLinksList.length ; i++) { //liens central sous onglet Help
    PM.Event.add(categoryHelpLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuCentralAide::CategorieAide', PM.Statistics.Type.NAVIGATION));
  }
  
  //Sous menu : footer [_| |_]
  var subCategorySellLinksList = $j("#navigation .sell", headerTable);
  for (var i = 0 ; i < subCategorySellLinksList.length ; i++) { //Footer Univers : mise en vente
    PM.Event.add(subCategorySellLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienUniversMeV::HomeVendre::Categorie', PM.Statistics.Type.NAVIGATION));
  }
  
  var subCategoryAllList = $j("#navigation a.all-products", headerTable);
  for (var i = 0 ; i < subCategoryAllList.length ; i++) { //Footer Univers : toutes les catégories
    PM.Event.add(subCategoryAllList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienUnivers::HomeUnivers::Categorie', PM.Statistics.Type.NAVIGATION));
  }
  
  var sellFooterLinksList = $j("#navigation li.pm-sell div.sub-nav-ctn .more-lnks a", headerTable);
  for (var i = 0 ; i < sellFooterLinksList.length ; i++) { //lien menu footer vendre
    PM.Event.add(sellFooterLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuFooterVendre::CategorieVendre', PM.Statistics.Type.NAVIGATION));
  }
  
  var helpFooterLinksList = $j("#navigation li.pm-help div.sub-nav-ctn .more-lnks a", headerTable);
  for (var i = 0 ; i < helpFooterLinksList.length ; i++) { //lien menu footer aide
    PM.Event.add(helpFooterLinksList[i], "click", PM.Statistics.tagClick.bindObj(null, PM.Statistics.Xtn2.Header, 'Header::LienMenuFooterAide::CategorieAide', PM.Statistics.Type.NAVIGATION));
  }
}

PM.Header.Search = {};

// données à remplir par la JSP
PM.Header.Search.settings = {
    brandSearchServletUrl: '',
    shopSearchServletUrl: '',
    isExternalHeaderAction: false
}

PM.Header.Search.Type = {
    BRAND: "brand",
    SHOP:  "shop"
}

PM.Header.Search.launch = function(keyword, searchType) {
  prepareAndSetCookie(keyword);
  if (keyword != search_default_value 
   && PM.Util.trim(keyword) != '') {
    if (typeof(searchType) != "undefined" && searchType == PM.Header.Search.Type.SHOP) {
      PM.LinkTool.gotoShopSearchAll(PM.Header.Search.settings.shopSearchServletUrl, 
                                    keyword);
    } else {
      PM.LinkTool.gotoSearchAll(PM.Header.Search.settings.brandSearchServletUrl, 
                                keyword,
                                PM.Header.Search.settings.isExternalHeaderAction);
    }
  }
  return false;
}

PM.Header.Search.Select = function(containerId) {
  this.container = $j("#" + containerId);
  this.selectField = this.container.children(".ui-selectmenu"); 
  this.selectMenu = this.container.children(".ui-selectmenu-menu");
  this.selectMenuOptions = this.selectMenu.children("li");
  
  this.selectedOption = this.selectMenu.children(".ui-selectmenu-item-selected");
  this.newSelectedOption = this.selectedOption;
  this.updateSelectField();
  
  PM.Event.add(document, "click", this.testSelectClick.bindObj(this));
}

PM.Header.Search.Select.prototype.testSelectClick = function(event) {
  var elt = PM.Util.getElementFromEvent(event);
  
  // Parcourt tous les éléments parents
  while (elt != null) {
    if ($j(elt).get(0) == this.selectField.get(0)) {
      // Cas du champ select cliqué
      this.showMenu();
      return;
    } else {
      // Cas d'une option cliquée
      for(var i = 0 ; i < this.selectMenuOptions.length ; i++) {
        if ($j(elt).get(0) == this.selectMenuOptions[i]) {
          this.selectOption(i);
          return;
        }
      }
    }
    elt = PM.Dom.parent(elt);
  }
  
  // Cache le menu dans le cas ou le click est à l'extérieur
  if(this.isMenuDisplayed()) {
    this.hideMenu();
  } 
}

PM.Header.Search.Select.prototype.selectOption = function(index) {
  this.newSelectedOption = $j(this.selectMenuOptions[index]);

  this.switchSelectedOption();
  this.updateSelectField();
  this.hideMenu();
}

PM.Header.Search.Select.prototype.switchSelectedOption = function() {
  PM.Dom.Class.remove(this.selectedOption, "ui-selectmenu-item-selected");
  PM.Dom.Class.remove(this.selectedOption, "ui-selected");
  
  PM.Dom.Class.add(this.newSelectedOption, "ui-selectmenu-item-selected");
  PM.Dom.Class.add(this.newSelectedOption, "ui-selected");
  
  this.selectedOption = this.newSelectedOption;
}

PM.Header.Search.Select.prototype.updateSelectField = function() {
  this.selectField.children(".a").html(this.selectedOption.children(".a").html());
  this.container.children("input.ui-selectvalue").val(this.selectedOption.children("input").val());
}

PM.Header.Search.Select.prototype.showMenu = function() {
  PM.Dom.Class.add(this.selectMenu, "ui-selectmenu-show");
  PM.Dom.Class.remove(this.selectMenu, "ui-selectmenu-hide");
}

PM.Header.Search.Select.prototype.hideMenu = function() {
  PM.Dom.Class.remove(this.selectMenu, "ui-selectmenu-show");
  PM.Dom.Class.add(this.selectMenu, "ui-selectmenu-hide");
}

PM.Header.Search.Select.prototype.isMenuDisplayed = function() {
  return this.selectMenu.hasClass("ui-selectmenu-show");
}
