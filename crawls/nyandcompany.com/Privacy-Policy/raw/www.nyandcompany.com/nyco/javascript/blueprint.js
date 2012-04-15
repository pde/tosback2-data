/**
 * This file contains Javascript utility functions used throughout the blueprint application.
 */

dojo.provide("atg.b2cblueprint.util");

atg.b2cblueprint.util={
  /** 
   * Used on the cart page to autoselect the giftnote when 
   * a user selects the gift wrap option
   */
  autoSelectGiftNote: function() {    
    if (document.cartform.atg_b2cblueprint_addWrap.checked &&
        !document.cartform.atg_b2cblueprint_addNote.checked) {       
      document.cartform.atg_b2cblueprint_addNote.click();
    }  
  },
  
  /**
   * The email campaign popup.  First check the form fields to 
   * make sure we can submit.
   */ 
  emailSignup: function(URL) {  
    // need to make sure the required fields are not null
    var openWindow = true;
    /**
    // check to see if we have an email address at all
    var addressEntered = theForm.emailAddress.value;
    if (dojo.string.trim(addressEntered) === "") {
      openWindow = false;
    }
    
    //if email id is not valid don't open the window
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressEntered))){
      openWindow = false;
    }
     */ 
    // don't open window if we had a form error
    if (openWindow) {
      document.open(URL,"","scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=yes,width=1024,height=750");
      //Line below are for setting the Omnitute variables.
      s.events='event7'; 
      s.eVar18='Sign Up';
      //alert("s.eVar18:"+s.eVar18);
      //alert("s.events:"+s.events);
      var s_code=s.t();if(s_code)document.write(s_code)
    }
  },
  
  /**
   * The product details popup 
   */
  detailsPopup: function(URL) {
    document.open(URL,"","scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=yes,width=450,height=525");
  },
  
  /**
   * The notify me when in-stock popup 
   */
  notifyMePopup: function(URL) {
    document.open(URL,"","scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=yes,width=480,height=500");
  },

  /**
   * Return false if the key pressed in the event object is the return key, true otherwise
   */
  killEnter: function(evt) {
    if(evt.keyCode == 13 || evt.which == 13) {
      return false;
    }
    return true;
  },

  /**
   * Update facet trail value
   */
  updateFacetTrail: function(xkeyword){
    var trltxt = dojo.string.trim(document.facetSearch.trailtext.value);
    if(trltxt === "" || trltxt === dojo.string.trim(xkeyword)){
      document.facetSearch.addFacet.value="";
      document.facetSearch.trailtext.value="";
    }
    else{
      document.facetSearch.addFacet.value="SRCH:"+trltxt;
    }
    return true;
  }, 
  /**
   * Display block if none 
   */
  toggleDiv: function(divName){
    var displayStyle = document.getElementById(divName).style.display;
    displayStyle=(displayStyle!="block")? "block" : "none";
    document.getElementById(divName).style.display=displayStyle; 
  },
  /**
   * Display blocks as per number of facetIndex
   */
  compressDiv: function(i){
    var displayStyleBlock = "block";
    var displayStyleNone = "none";
    if (document.getElementById("moreDiv"+i) != null) {
      document.getElementById("moreDiv"+i).style.display=displayStyleBlock;
      document.getElementById("lessDiv"+i).style.display=displayStyleNone;
    }
  },
  /**
   * Caller function for toggleDIv and compressDiv
   */
  toggleBothDiv: function(idx, totalFacet){
    atg.b2cblueprint.util.toggleDiv("moreDiv"+idx);
    atg.b2cblueprint.util.toggleDiv("lessDiv"+idx);
    for (i=0;i<totalFacet;i++) {
      if (i != idx) {
        atg.b2cblueprint.util.compressDiv(i);
      }
      else {
        continue;
      }
    }
  },
  /**
   * Display the catalog flyout menus in IE6. All other browsers handle flyouts via CSS.
   */
  catalogNavIE: function(){
    if (!dojo.render.html.ie60){
      // Only apply to IE6
      return;
    }
    
    var catNav = dojo.byId('atg_b2cblueprint_catalogNav');
    if (!catNav){
      return;
    }
    
    var navItems = catNav.getElementsByTagName('ul');
  
    for(i=1; i<navItems.length; i++){    
      // Add the "over" class if the current list item doesn't have the class "active"
      dojo.event.connect(navItems[i].parentNode, "onmouseover", function(evt){
        if(!dojo.html.hasClass(evt.currentTarget, "active")){
          dojo.html.addClass(evt.currentTarget, "over");
         }
      });
    
      // Remove the "over" class   
      dojo.event.connect(navItems[i].parentNode, "onmouseout", function(evt){
        dojo.html.removeClass(evt.currentTarget, "over");
        evt.stopPropagation();
      });
    }
  },

  /**
   * Text Area character counter
   */
  textAreaCounter: function(htmlTextArea , currentCounter, maxCounter) {
    var maxLimit = document.getElementById(maxCounter).firstChild.nodeValue;
    var currentCount = document.getElementById(currentCounter);

    if (htmlTextArea.value.length > maxLimit){
      htmlTextArea.value = htmlTextArea.value.substring(0, maxLimit);
    }else{
      currentCount.innerHTML = htmlTextArea.value.length;
    }
  },
  
  /**
   * Disable nodes that have atg_behavior_disableOnClick CSS class applied to them when they are clicked.
   * 
   * Expects the following attributes passed in on the params object
   *   cssClass: CSS class denoting the behavior
   *   defaultDisabledValue: Text value that will be set on the node when clicked and disabled
   *   freezeWidth: boolean signifying whether the width of the nodes should be retained
   * 
   * Any node that the behavior is attached to will be disabled whenever a click event is intercepted. This
   * should help prevent any double submit errors on the server.
   * 
   * A 'disabledValue' attribute may be set on the node itself. This value will override any default 
   * value that is set on this function.
   */
  applyDisableOnClickBehavior: function(params){
    var elements=dojo.html.getElementsByClass(params.cssClass);
    dojo.debug("Applying DisableOnClick behavior to "+elements.length+" nodes with class ["+params.cssClass+"]");
    
    for (var i=0; i<elements.length; i++){
      var node=elements[i];
      dojo.debug(node);
      
      dojo.event.connect(node,"onclick",function(evt){  
        var node=evt.target;
        if (node.justClicked){
          dojo.debug("Ignoring click");
          // Node has already been clicked and is being handled, so ignore this click
          evt.preventDefault();
          evt.stopPropagation();
          return false;
        }
        
        dojo.debug("Disabling node before form submission");
        dojo.debug(node);
        
        // retain original node width - prevents node from resizing when disabled value text is set on it
        if (params.freezeWidth){
          node.style.width=dojo.html.getBorderBox(node).width+"px";
        }
        
        // Get disabled text from node if set, otherwise use default passed to this function. If default not
        // set, just use the existing value on the button.
        var disabledValue=node.getAttribute("disabledValue");
        var originalValue=(node.nodeName=="INPUT" ? node.value : node.innerHTML);
        if (!disabledValue) { 
          disabledValue=(params.defaultDisabledValue ? params.defaultDisabledValue : originalValue);
        }
        
        if (node.nodeName=="INPUT"){
          // Create hidden form element to copy submit button's value into. Need to do this as disabled elements
          // are not submitted from a form by the browser.
          var replacementNode=document.createElement("INPUT");
          replacementNode.type="hidden";
          replacementNode.name=node.name;
          replacementNode.value=node.value;
          
          // Append this to the parent form
          var formNode=dojo.html.getParentByType(node,"FORM");
          formNode.appendChild(replacementNode);
          
          // Disable the node
          node.value=disabledValue;
          node.name="";
          node.disabled=true;
          
          // Disabling the submit button prevents the form from being submitted in IE, so submit it here
          evt.preventDefault();
          formNode.submit();        
        } 
        else if (node.nodeName=="A"){
          node.innerHTML=disabledValue;
          node.justClicked=true; // Prevent further clicks from causing default behavior
        }
        
        // Continue with normal browser processing of click event
        return true;
      });
    }
  },

  noenter: function() {
    return !(window.event && window.event.keyCode == 13); 
  }
};
