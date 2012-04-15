// FUNCTIONS TO DELAY THIRD PARTY VENDORS          
            
            
            
/**************** IGD CODE **************************/
            
            var IGDTimer;
			var domainUrl;

            // TEST FOR IGD CONTENT IF THERE IS CONTENT SET HEIGHT AUTO
            function testIGDContent() {
               for (i=0;i<igdDivs.length;i++) {
                 if (document.getElementById(igdDivs[i][0]).innerHTML != "") {
                   document.getElementById(igdDivs[i][0]).style.height="auto";
                   clearIgdTimer()
                  }
                }
              }
            
            // TIMER START
            function setIgdTimer() {
              IGDTimer = setInterval('testIGDContent()', 1000)
             } 
             
            // TIMER CLEAR
            function clearIgdTimer() {
              clearTimeout ( IGDTimer );
             } 
              
			function IgdDomain() {
				if ((window.location.href.indexOf('http://intpreview.') > -1) || 
					(window.location.href.indexOf('https://intpreview.') > -1) || 
					(window.location.href.indexOf('http://qaalpha.') > -1) || 
					(window.location.href.indexOf('https://qaalpha.') > -1) || 
					(window.location.href.indexOf('http://uat.') > -1) || 
					(window.location.href.indexOf('https://uat.') > -1)) {
					  domainUrl = "https://dbi-dev.recs.igodigital.com";
				} else {
					  domainUrl = "https://recs.igodigital.com";
				}
             } 
             
            // DYNAMICALLY CREATE SCRIPT TAG / CALL 3RD PARTY SCRIPTS
            function createScriptTag() {
				  IgdDomain();
                  var el = document.createElement('script');   
              		if ( typeof( window[ 'igdURLParam' ] ) != "undefined" ) {
                  el.src = domainUrl + '/a/igdrec/igdrec.js.aspx?' + igdURLParam;
                  } 
                  else {
                      el.src = domainUrl + '/a/igdrec/igdrec.js.aspx';
                  }   
              		document.getElementById('addIGDJS').appendChild(el); 
             } 
            
            function loadIGDFunctions() {

              // LOOP THRU IGD DIVS AND SET INITIAL HEIGHT
              if (document.getElementById('addIGDJS')) {
              for (i=0;i<igdDivs.length;i++) {
                   document.getElementById(igdDivs[i][0]).style.height=igdDivs[i][1];
                }
                
              createScriptTag()
              setIgdTimer()
              setTimeout('clearIgdTimer()',6000); //TURN OFF TIMER AFTER 6 SECONDS
              }
            }
            
/**************** IGD CODE **************************/            
            
            
/**************** OMNITURE CODE **************************/

            function loadOmnitureFunctions() {
              var s_code=s.t();
              if(s_code)document.write(s_code);   
            }
            
/**************** OMNITURE CODE **************************/       
 

/**************** YUI LAYER CODE **************************/ 
        
  
function holdOffYUILayers(){
   if (document.getElementById('yourCartNM') || document.getElementById('yourCart') ) {
      if(document.getElementById('yourCartContent')){
         document.getElementById('yourCartContent').setAttribute('style','display:block')
         document.getElementById('yourCartContent').style.display = "block";      
	 if (document.getElementById('withCart') && document.getElementById('yourCartNM') ){
	    document.getElementById('withCart').style.marginTop = eval (document.getElementById('yourCartNM').offsetHeight + 10);
	 }
      }
   }  
   if (document.getElementById('advancedSearchContent')) {
      document.getElementById('advancedSearchContent').setAttribute('style','display:block')
      document.getElementById('advancedSearchContent').style.display = "block";
   }
}

/**************** YUI LAYER CODE **************************/
            
            
            
            //FUNCTIONS TO LOAD 
            function initOnloadFunctions(){
              loadIGDFunctions()
              holdOffYUILayers()
              loadOmnitureFunctions()
            }
            
            //LOAD FUNCTIONS
            function addOnloadEvent(fnc){
                if ( typeof window.addEventListener != "undefined" )
                  window.addEventListener( "load", fnc, false );
                else if ( typeof window.attachEvent != "undefined" ) {
                  window.attachEvent( "onload", fnc );
                }
                else {
                  if ( window.onload != null ) {
                    var oldOnload = window.onload;
                    window.onload = function ( e ) {
                      oldOnload( e );
                      window[fnc]();
                    };
                  }
                  else
                    window.onload = fnc;
                }
              }
            	
            	addOnloadEvent(initOnloadFunctions)
            	
