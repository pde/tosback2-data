var g_dummyCityKey = "DUMMY";
var g_dummyCityVal = "- Enter a City -";
var g_dummyCityValSp = "- Entrar un ciudad -";

var g_dummyDirKey = "DUMMY";
var g_dummyDirVal =  "- Enter a Directory -";
var g_dummyDirValSp = "- Entrar un libro -";   

var g_dummyStateKey = "DUMMY";
var g_dummyStateVal = "- Enter a State -";
var g_dummyStateSp = "- Entrar un estado -";   

var g_headerValue = "header";

// Building of Header for Autocomplete input elements: State, City, Directory
var autocompleteHeaderParams = document.getElementById("sl_AutocompleteHeaderParams").value.split("_");
var param1 = "<a class='suggestionHeaderParam' style='line-height:80%;color:#0080c0'>" + autocompleteHeaderParams[0] + "</a>";
var param2 = "<a class='searchHeaderParam' style='line-height:100%;color:#0080c0'>" + autocompleteHeaderParams[1] + "</a>";
var param3 = "<a class='byHeaderParam' style='line-height:100%;color:#6E6E6E;padding-left:20px'>";
var param4 = "</a>";
var param5 = "<a a class='separatorHeaderParam' style='line-height:150%;color:#6E6E6E'>...............................................................................................................................................................................................................................................................................................</a>";
// Building of Header for State autocomplete
var g_stateHeader = "<div>" + param1 + param2 + param3 + autocompleteHeaderParams[2] + param4 + param5 + "</div>"; 
// Building of Header for State field autocomplete
var g_cityHeader = "<div>" + param1 + param2 + param3 + autocompleteHeaderParams[3] + param4 + param5 + "</div>"; 
// Building of Header for State field autocomplete
var g_directoryHeader = "<div>" + param1 + param2 + param3 + autocompleteHeaderParams[4] + param4 + param5 + "</div>"; 

// Create Abbreviations Array for City Autocomplete Drop Down list: e.g. if the user will enter 'St' - the words with 'Saint' will be also displayed in the list
var g_CityAbbreviationArray = [["Saint" , "St"], ["Saint", "St."], ["Sainte" , "Ste"], ["Sainte", "Ste."],["Fort" , "Ft"], ["Fort", "Ft."],  ["Mount" , "Mt"], ["Mount", "Mt."]];
        
function addToFavorites() {
    var title, url;
    title = document.title;
    url = location.href;

    if (window.sidebar) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(title, url, "");
    } else if (window.external) { // IE Favorite
        window.external.AddFavorite(url, title);
    }
    else if (window.opera && window.print) { // Opera Hotlist
        return true;
    }
}

function changeHeaderClass(elementID, newClass) {
    var elem = document.getElementById(elementID);
    if (elem) {
        elem.className = newClass;
    }
}

function addTargetAttr(elementID, newTragetAttr) {
    var elem = document.getElementById(elementID);
    if (elem) {
        elem.setAttribute('target', newTragetAttr);
    }
}

/* Handle map */
function mapSelection(state, abbr) {
    updateStateList(abbr,state, null, null);
}

function updateStateList(stateCode, stateValue, dirCode, city) {
    //var elem = document.getElementById("sl_States"); //Ella - rem
    //var value = document.getElementById("sp_States").value;  //Ella
    //if (elem) {  //Ella - rem
        document.getElementById("sl_States").value = stateCode;
        //var index = elem.selectedIndex;  //Ella - rem
        //var selectedText = elem.options[index].text;  //Ella - rem
        document.getElementById("sp_States").value = stateValue; 
        //var selectedText = value;  //Ella - rem
        SetRegion(stateCode, stateValue, dirCode, city);
        //SearchBtn_onclick(elem.value, "");
    //}
}

//Ella - start
function loadCities (stateKey, city) {
    
        var lang = document.forms[0].lang.value;
        var cityKey = g_dummyCityKey;
        var cityVal = g_dummyCityVal;
        
        if (lang && lang == 'sp')
           cityVal = g_dummyCityValSp;
           
        if((city != null) && (city !=  cityKey)){
            cityKey = city;
            cityVal = city;
        }
        
        SetCity(cityKey, cityVal);
        callback2("skin/entrymap/_att/ajax_city_dropdown.aspx?SelectedState=" + stateKey + "&lang=" + lang, OnStateChange_CityDropDown);
}
//Ella - end

function submitExistingStateSearch() {
    var elem = document.getElementById("sl_States");
    if (elem) {
      //  var index = elem.selectedIndex;  
      //  var selectedText = elem.options[index].text;
        SearchBtn_onclick(elem.value, "");
    }
    return false;
}

function OnStateChange_DirectoryList() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var lang = document.forms[0].lang.value;
        
        var city = document.getElementById("sl_Cities").value;
        var titleElem = document.getElementById("mapFrameTitle");
        if (titleElem) {
        
            //var title = "Directories list for <b>" + document.getElementById('sp_States').innerHTML + "</b>: ";  //Ella - rem
            var title = "Directories list for <b>" + document.getElementById('sp_States').value;              //Ella
            if (lang && lang == 'sp')
                //title = "Lista de guías telefónicas para <b>" + document.getElementById('sp_States').innerHTML + "</b>: "; //Ella - rem
                title = "Lista de guías telefónicas para <b>" + document.getElementById('sp_States').value;              //Ella 
            //Ella - start
            if(city != g_dummyCityKey){
                 title = title + "/" + city;
            }
            title = title +  "</b>: ";
            //Ella - end
            
            titleElem.innerHTML = title;
        }
        var frameElem = document.getElementById("mapFrame");
        if (frameElem) {
            frameElem.innerHTML = xmlhttp.responseText;
        }
    }
}

function OnStateChange_RecentDirectory() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var lang = document.forms[0].lang.value;
        var titleElem = document.getElementById("mapFrameTitle");
        if (titleElem) {
            var title = "Latest accessed online directory: ";
            if (lang && lang == 'sp')
                title = "La &uacute;ltima gu&iacute;a telef&oacute;nica abierta: ";
            titleElem.innerHTML = title;
        }

        //parse the response
        var end = xmlhttp.responseText.indexOf("$$");
        var htmlText = "";
        if (end) {
            htmlText = xmlhttp.responseText.substring(0, end);
            var start = end + 2;
            var end = xmlhttp.responseText.indexOf("$$", start);
            var dirCode = xmlhttp.responseText.substring(start, end);
            var start = end + 2;
            var end = xmlhttp.responseText.indexOf("$$", start);
            var dirName = xmlhttp.responseText.substring(start, end);
            var start = end + 2;
            var end = xmlhttp.responseText.indexOf("$$", start);
            var dirUrl = xmlhttp.responseText.substring(start, end);
            SetDirectory(dirCode, dirName, dirUrl);
        }
 
        var frameElem = document.getElementById("mapFrame");
        if (frameElem) {
            frameElem.innerHTML = htmlText;
        }
    }
}

function OnStateChange_DownloadStateChanged() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var directoryDDDiv = document.getElementById("directoryDDDiv");
        var start = xmlhttp.responseText.indexOf("$$");
        if (start) {
            start = start + 2;
            var end = xmlhttp.responseText.indexOf("$$", start);
            var content = xmlhttp.responseText.substring(start , end);
            directoryDDDiv.innerHTML = content;
        }
    }
}

function SearchBtn_onclick() {
    var lang = document.forms[0].lang.value;
    var searchKeyword = document.getElementById('searchKeyword').value;
    var directorySelect = document.getElementById('sl_Directories');
    if (directorySelect) {
        var directoryCode = directorySelect.value;
        var state = document.getElementById('sl_States').value;
        var stateValue = document.getElementById('sp_States').value;
        var directoryUrl = document.getElementById('sl_DirectoriesURL').value;
        var city = document.getElementById('sl_Cities').value;  //Ella
        setDirCookie(directoryCode, state, stateValue, city);
        if (directoryUrl && directoryUrl != '') {
            directoryUrl = buildBookUrl(directoryUrl);
            window.open(directoryUrl, "_top");
        }
    }
}

function onSelectState(dirCode, city) {

    var lang = document.forms[0].lang.value;
    var selectedState = document.getElementById('sl_States').value;
    
    //Ella - start
    if (city && city == g_dummyCityKey){
        city = null;
    }
    //Ella - end
        
    var selectedCity = "";
    if(city != null){
        selectedCity = city
    } else {   
        selectedCity = document.getElementById('sl_Cities').value;
    }
    
    if (selectedState && selectedState == g_dummyStateKey)
        selectedState = null;
    if (dirCode && dirCode == g_dummyDirKey)
        dirCode = null;
    
    if (selectedState != null) {
            callback1("skin/entrymap/_att/ajax_directory_dropdown.aspx?SelectedState=" + selectedState + "&lang=" + lang + "&SelectedCity=" + selectedCity, OnStateChange_DirectoryDropDown); //Ella            
            
        if (dirCode == null) {
        
            //var dirName = "- Select a Directory -";  //Ella - rem
            var dirName = g_dummyDirVal;   //Ella
            if (lang && lang == 'sp')
                //dirName = "- Seleccione un libro -";  //Ella - rem
                dirName = g_dummyDirValSp;  //Ella
            SetDirectory(g_dummyDirKey, dirName, "null");
            //callback("skin/entrymap/_att/ajax_directory_list.aspx?SelectedState=" + selectedState , OnStateChange_DirectoryList); //Ella - rem
            callback("skin/entrymap/_att/ajax_directory_list.aspx?SelectedState=" + selectedState  + "&SelectedCity=" + selectedCity , OnStateChange_DirectoryList);  //Ella

            /*var dirName = "- Select a Directory -";
            if (lang && lang == 'sp')
                dirName = "- Seleccione un libro -";
            SetDirectory("DUMMY", dirName, "null");*/
        } else {
            //callback("skin/entrymap/_att/ajax_recent_directory.aspx?DirCode=" + dirCode, OnStateChange_RecentDirectory); //Ella - rem
            callback("skin/entrymap/_att/ajax_recent_directory.aspx?DirCode=" + dirCode + "&City=" + selectedCity, OnStateChange_RecentDirectory);  //Ella
        }
        //Ella - start rem. Moved Up and changed
         //callback1("skin/entrymap/_att/ajax_directory_dropdown.aspx?SelectedState=" + selectedState + "&lang=" + lang, OnStateChange_DirectoryDropDown);
         //Ella - end rem
    } else {
    
        SetCity("", "");  //Ella
        
        SetDirectory("", "", "");
        /*var directoryCustomSelect = document.getElementById("directoryCustomSelect_dropdown");
        if (directoryCustomSelect) {
            directoryCustomSelect.innerHTML = "";
        }*/
        
        var frameElem = document.getElementById("mapFrame");
        if (frameElem) {
            frameElem.innerHTML = "";
        }
        var titleElem = document.getElementById("mapFrameTitle");
        if (titleElem) {
            titleElem.innerHTML = "";
        }        
    }    
    return true;
}

function OnStateChange_DirectoryDropDown() {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            
            var dataAutoCompArray = new Array();
            var response = xmlhttp1.responseText;
            //Get List of Directories
            var dirList = response.split("###");
            var lastDir;
            for(var i =0; i < dirList.length; i++ ){
                // split data fror specific directory: DirCode, DirName, DirURL                
                var dirDataArray = dirList[i].split("$$$");           
                var obj = new Object();
                obj.code = dirDataArray[0];
                obj.value = dirDataArray[1];
                obj.URL = dirDataArray[2];
                if(dirDataArray != ""){
                    lastDir = obj;
                    dataAutoCompArray.push(obj);
                }
            }
            
            loadDirAutocomplete(dataAutoCompArray); 
            
            if(dirList.length == 2){
                var dirCode = lastDir.code;
                var dirName = lastDir.value;
                var dirURL =  lastDir.URL;
                SetDirectory(dirCode, dirName, dirURL);
            }           
    }
}

//Ella - start
function loadDirAutocomplete(data){
                          
          var dummyKey = g_dummyDirKey;
          var dummyVal = g_dummyDirVal;

          var lang = document.forms[0].lang.value;
          if (lang && lang == 'sp')
              dummyVal = g_dummyDirValSp; 

          var selectedItem = null;
          var focusItem = null;
          
          $("#sp_Directories").autocomplete({ source: data,
                                            delay: 20, 
                                            minLength: 0,
                                            selectFirst: true,
                                            maxListLength: 25,         /* Num of rows to be displayed in the list */
                                            header: g_directoryHeader, /* Autocomplete Header */
                                            
           		        select: function( event, ui ) {
           		        
					        if ( ui.item ) {
					        
				                if ( ui.item.value == g_headerValue) {
                                  return false;
                                }
                                
                                selectedItem = ui.item.option;
                                
							    SetDirectory(selectedItem.code, selectedItem.value, selectedItem.URL);
							    
						    }
						    return true;	
						},
						
						focus: function( event, ui ) {
						
                            if ( ui.item.value == g_headerValue) {
                                    return false;
                            }
                            
                            focusItem = ui.item.option;
                            
                            return true;
        			    },
        			    
						open: function( event, ui ) {
						    selectedItem = null;
						    
					        $(this).focus();
							return true;
						},
						
						close: function( event, ui ) {
						
						    if(this.value == ""){
						    
	                            SetDirectory(dummyKey, dummyVal, "null");
	                            
	                        } else if(focusItem.value.toLowerCase() == this.value.toLowerCase()){
	                        
	                            selectedItem = focusItem;
	                            
	                            SetDirectory(focusItem.code, focusItem.value, focusItem.URL);
	                            
	                        }
					        return true;
					    },
					    
					    change: function( event, ui ) {
					    
					        if(selectedItem == null){                  
					            SetDirectory(dummyKey, dummyVal, "null"); 
					        }
					        
					        return true;
					    }
					    
         }); 
         
         
         $( "#sp_Directories" ).autocomplete('widget').css('padding', '9px 5px 9px 5px');
         $( "#sp_Directories" ).autocomplete('widget').css('min-width', '174px');  
         $( "#sp_Directories" ).autocomplete('widget').css('max-width', '270px');     
       
}

function loadStateAutocomplete(){

      var data = new Array();      
      var stateList = sp_SitiesData.value.split("###");
 
      for(var i =0; i < stateList.length; i++ ){
           // split data for specific State: State Code, State Name
           var stateDataArray = stateList[i].split("$$$");
           if(stateDataArray != ""){
                var obj = new Object();
                obj.code = stateDataArray[0];
                obj.value = stateDataArray[1]; 
                data.push(obj);
            }
      }
      
      var dummyKey = g_dummyStateKey;
      var dummyVal = g_dummyStateVal;
      var lang = document.forms[0].lang.value;
      if (lang && lang == 'sp')
          dummyVal = g_dummyStateVal;
      var selectedItem = null;
      var focusItem = null;
      $("#sp_States").autocomplete({ source: data,
                                            delay: 20,
                                            minLength: 0,
                                            selectFirst: true,
                                            maxListLength: 30, /* Num of rows to be displayed in the list */                                            
                                            header: g_stateHeader, /* Autocomplete Header */   
           		        select: function( event, ui ) {
           		       
					        if ( ui.item ) {
				                
				                if ( ui.item.value == g_headerValue) {
                                    return false;
                                }
                            
                                selectedItem = ui.item.option;
							    SetRegion(selectedItem.code, selectedItem.value, null, null);
						    
						    }						    
						    return true;	
						    
						},

						focus: function( event, ui ) {
						   
                            if ( ui.item.value == g_headerValue) {
                            
                                    return false;
                            }
                            
                            focusItem = ui.item.option;
                            
                            return true;
                        },
                        
                        open: function( event, ui ) {  
                           
                            selectedItem = null;
                            $(this).focus();
                            
							return true;
						},
						
						close: function( event, ui ) {
						
					        if(this.value == ""){
					        
					            SetRegion(dummyKey, dummyVal, null, null);
					            
					        } else if(focusItem.value.toLowerCase() == this.value.toLowerCase()){
					        
	                            selectedItem = focusItem;
	                            SetRegion(focusItem.code, focusItem.value, null, null);	                            
	                        }				 	        
					        return true;
					    },
					    
					    change: function( event, ui ) {
					    
					        if(selectedItem == null){					        
					            SetRegion(dummyKey, dummyVal, null, null);
					        }
            					        
					        return true;
					    }
        					
     }); 

     $( "#sp_States").autocomplete('widget').css('padding', '9px 5px 9px 5px');
     $( "#sp_States").autocomplete('widget').css('min-width', '142px');
     $( "#sp_States").autocomplete('widget').css('max-width', '142px');
}

function OnStateChange_CityDropDown() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                var val = xmlhttp2.responseText;
                loadCityAutocomplete(val.split("_"));
    }
}
//Ella - end

function setAbbreviation(val) {

        var abbrArray = new Array();
        for(var i = 0; i < g_CityAbbreviationArray.length; i++){
            if(val.indexOf(g_CityAbbreviationArray[i][0]) != -1){
                var abbr = val.replace(g_CityAbbreviationArray[i][0], g_CityAbbreviationArray[i][1]);          
                abbrArray.push(abbr);
            }
        }
        return abbrArray;
}

function loadCityAutocomplete(m_data){
                                                          
          var city = document.getElementById('sp_Cities').value;
          var dummyKey = g_dummyCityKey;
          var dummyVal = g_dummyCityVal;
          var data = new Array();
          for(var i =0; i < m_data.length; i++ ){
            // split data fror specific city: City Name, City Valye, City Abbreviation,
            var obj = new Object();
            obj.value = m_data[i];
            obj.abbrevArray = setAbbreviation(obj.value);
            data.push(obj);
          }
      
          var lang = document.forms[0].lang.value;
          if (lang && lang == 'sp')
              dummyVal = g_dummyCityValSp;
              
             var selectedItem = null;
             var focusItem = null;
             $("#sp_Cities").autocomplete({ source: data,
                                            delay: 20, 
                                            minLength: 0,
                                            selectFirst: true,
                                            maxListLength: 25,   /* Num of rows to be displayed in the list */ 
                                            header: g_cityHeader,  /* Autocomplete Header */          
                        select: function( event, ui ) {
                        
					        if ( ui.item ) {
					            
						        if ( ui.item.value == g_headerValue) {
                                    return false;
                                }
                                
                                selectedItem = ui.item.option;
						        onSelectCity(selectedItem.value, selectedItem.value);
						    }							
						    return true;
						    
						},
						
						focus: function( event, ui ) {
						
                            if ( ui.item.value == g_headerValue) {
                                    return false;
                            }
                            
                            focusItem = ui.item.option;
                            
        					return true;
					    },
					    
						open: function( event, ui ) {
						
							selectedItem = null;
							
							$(this).focus();
							
							return true;
							
						},
						
						close: function( event, ui ) {
						
                            if(this.value == ""){
                                onSelectCity(dummyKey, dummyVal);
                            } else if(focusItem.value.toLowerCase() == this.value.toLowerCase()){
	                            selectedItem = focusItem;
	                            onSelectCity(focusItem.value, focusItem.value);
	                        }	
                            
        					return true;
					    },
					    
					    change: function( event, ui ) {
					    
					        if(selectedItem == null){
					            onSelectCity(dummyKey,dummyVal); 
					        }
					            
					        return true;
					    }
         }); 
         
         $( "#sp_Cities").autocomplete('widget').css('padding', '9px 5px 9px 5px');
         $( "#sp_Cities").autocomplete('widget').css('min-width', '174px');
         $( "#sp_Cities").autocomplete('widget').css('max-width', '174px');
 
}
         

function SetRegion(stateKey, stateVal, dirCode, city) {

   //Close City and Directory drop downs if the State was changed
    closeAutocompleteList([$('#sp_Directories'),$('#sp_Cities')]);    
    SetState(stateKey, stateVal);
    loadCities(stateKey, city);
    onSelectState(dirCode, city);

}

function closeAutocompleteList(elementArray){
    for(var i = 0; i <elementArray.length; i++){
        elementArray[i].autocomplete('close');
        elementArray[i].value = "";
    }
}

function SetDirectory(dirKey, dirVal, dirURL) {
    document.getElementById('sl_Directories').value = dirKey;
    document.getElementById('sp_Directories').value = dirVal;
    //document.getElementById('sp_Directories').innerHTML = dirVal;
    if (dirURL && dirURL != "null") {
        document.getElementById('sl_DirectoriesURL').value = dirURL;
    } else {

        document.getElementById('sl_DirectoriesURL').value = '';
    }
}

function SetState(stateKey, stateVal){

    document.getElementById('sp_States').value = stateVal;
//    document.getElementById('sp_States').innerHTML = stateVal;
    document.getElementById('sl_States').value = stateKey;
    //Ella - start
    var disableInd = false;
    if(stateKey == g_dummyStateKey || stateKey == ""){
        disableInd = true;
    }
    
    disableAutocomplete(disableInd);
    //Ella - end
}

//Ella - start
function disableAutocomplete(disableInd){
    if ( disableInd && $("#sp_Cities").autocomplete( "widget" ).is( ":visible" ) ) {
        closeAutocompleteList([$("#sp_Cities")]);
    }
    $("#sp_Cities").autocomplete( "option", "disabled", disableInd );
    $("#sp_Cities").attr( "disabled", disableInd); 
    
    if ( disableInd && $("#sp_Directories").autocomplete( "widget" ).is( ":visible" ) ) {
        closeAutocompleteList([$("#sp_Directories")]);
    }
    
    $("#sp_Directories").autocomplete( "option", "disabled", disableInd );
    $("#sp_Directories").attr( "disabled", disableInd); 
    
}

function SetCity(cityKey, cityVal ) {
    document.getElementById('sp_Cities').value = cityVal;
    document.getElementById('sl_Cities').value = cityKey;
}

function onSelectCity(cityKey, cityVal) {
    //Close Directory drop down if the city was changed
    closeAutocompleteList([$('#sp_Directories')]);
    SetCity(cityKey, cityVal);
    onSelectState(g_dummyDirKey, cityKey);
}
//Ella - end

/* Validate Form */
function validEmail(email) {
    invalidChars = " /:,;'"

    if (email == "") {
        return true;
    }
    for (i = 0; i < invalidChars.length; i++) {
        badChar = invalidChars.charAt(i)
        if (email.indexOf(badChar, 0) > -1) {
            return false
        }
    }
    atPos = email.indexOf("@", 1)
    if (atPos == -1) {
        return false
    }
    if (email.indexOf("@", atPos + 1) > -1) {
        return false
    }
    periodPos = email.indexOf(".", atPos)
    if (periodPos == -1) {
        return false
    }
    if (periodPos + 3 > email.length) {
        return false
    }
    return true
}

function isNum(passedVal) {
    if (passedVal == "") {
        return false
    }
    for (i = 0; i < passedVal.length; i++) {
        if (passedVal.charAt(i) < "0") {
            return false
        }
        if (passedVal.charAt(i) > "9") {
            return false
        }
    }
    return true
}

function validZip(inZip) {
    if (inZip == "") {
        return true
    }
    if (isNum(inZip)) {
        return true
    }
    return false
}

function checkForm(passForm, lang) {

    var stateElem = document.getElementById("statesDD");
    var selecteState = "";
    if (stateElem) {
        selecteState = stateElem.value;
    }
    if (stateElem == "") {
        var msg = "You must select a State";
        if ((lang) && lang == "sp")
            msg = "Seleccione el Estado";
        alert(msg);
        stateElem.focus();
        return false;
    }
    var dirElem = document.getElementById("directoryDD");
    var selectedDir = "";
    if (dirElem) {
        selectedDir = dirElem.value;
    }
    if ((selectedDir == "") ||
            (selectedDir == "-- No Directories Found --") ||
            (selectedDir == "-- No existen estos libros --")) {
        var msg = "You must select a Book";
        if ((lang) && lang == "sp")
            msg = "Seleccione un Libro";
        alert(msg);
        if (dirElem) {
            dirElem.focus();
        }
        return false;
    }
    if (passForm.FirstName.value == "") {
        var msg = "You must enter a First Name";
        if ((lang) && lang == "sp")
            msg = "Indique su nombre";
        alert(msg);
        passForm.FirstName.focus();
        return false;
    }
    if (passForm.LastName.value == "") {
        var msg = "You must enter a Last Name";
        if ((lang) && lang == "sp")
            msg = "Indique su appellido";
        alert(msg);
        passForm.LastName.focus();
        return false;
    }
    if (passForm.Address1.value == "") {
        var msg = "You must enter an Address";
        if ((lang) && lang == "sp")
            msg = "Indique su dirección postal";
        alert(msg);
        passForm.Address1.focus();
        return false;
    }
    if (passForm.City.value == "") {
        var msg = "You must enter a City Name";
        if ((lang) && lang == "sp")
            msg = "Indique la Ciudad";
        alert(msg);
        passForm.City.focus();
        return false;
    }

    if (passForm.ZipCode.value == "") {
        var msg = "You must enter a Zip Code";
        if ((lang) && lang == "sp")
            msg = "Indique el Código Postal";
        alert(msg);
        passForm.ZipCode.focus();
        return false;
    }

    if (!validZip(passForm.ZipCode.value)) {
        var msg = "Invalid Zip code";
        if ((lang) && lang == "sp")
            msg = "Código postal inválido";
        alert(msg);
        passForm.ZipCode.focus()
        passForm.ZipCode.select()
        return false;
    }

    if (passForm.Email.value == "") {
        var msg = "You must enter an Email Address";
        if ((lang) && lang == "sp")
            msg = "Indique el correo electrónico";
        alert(msg);
        passForm.Email.focus();
        return false;
    }

    if (!validEmail(passForm.Email.value)) {
        var msg = "Invalid email address";
        if ((lang) && lang == "sp")
            msg = "Correo electrónico inválido";
        alert(msg);
        passForm.Email.focus()
        passForm.Email.select()
        return false;
    }

    var elem = document.forms[0].formPosted;
    if (elem) {
        elem.value = "true";
    }
    beforeOrderForm();
    passForm.submit();
    return true;
}

function resetFormPost() {
    var elem = document.forms[0].formPosted;
    if (elem) {
        elem.value = "";
    }
    return true;
}

function resetFormTarget() {
    document.getElementById("mainForm").target = "_self";
}

function checkFormClick() {
    updateSelectedDir();
    var elem = document.getElementById("directoryDD");
    if (elem) {
        if ((elem.value != null) && elem.value != "" && (elem.value != "-- No Directories Found --") &&
                (elem.value != "-- No existen estos libros --")) {
            document.getElementById("mainForm").target = "_blank";
        } else {
            document.getElementById("mainForm").target = "_self";
        }
    } else {
        document.getElementById("mainForm").target = "_self";
    }
}

function updateSelectedDir() {
    var directoryDDVal = document.getElementById("directoryDDVal");
    if (directoryDDVal) {
        var directoryDD = document.getElementById("directoryDD");
        if (directoryDD) {
            directoryDDVal.value = directoryDD.value;
        } else {
            directoryDDVal.value = "";
        }
    }
}

function beforeOrderForm() {
    var directoryDDVal = document.getElementById("directoryDDVal");
    if (directoryDDVal) {
        var directoryDD = document.getElementById("directoryDD");
        if (directoryDD) {
            directoryDDVal.value = directoryDD.value;
        } else {
            directoryDDVal.value = "";
        }
    }
}

/* Set Cookie functionality */
function setCookie(dirCode, state, stateValue, city, url) {

    setDirCookie(dirCode, state, stateValue,  city);
    if (url && url != '') {
        url = buildBookUrl(url);
        window.open(url, "_top");
    }
}


function setDirCookie(dirCode, state, stateValue, city) {
    if (dirCode && dirCode != g_dummyDirKey && state && state !=  g_dummyStateKey) {
        //var value = "dirCode=" + dirCode + "&state=" + state;  //Ella - rem
        var value = "dirCode=" + dirCode + "&state=" + state + "&stateValue=" + stateValue + "&city=" + city;  //Ella
        Set_Cookie("amddCookie", value, 1000);
    }
}


function downloadStateChanged() {
    var lang = document.forms[0].lang.value;
    var selectedState = document.getElementById('statesDD').value;
    if (selectedState && selectedState != "" && selectedState != "DUMMY") {
        callback("skin/entrymap/_att/ajax_download_directory_dropdown.aspx?SelectedState=" + selectedState + "&lang=" + lang, OnStateChange_DownloadStateChanged);
    } else {
        var directoryDDDiv = document.getElementById("directoryDDDiv");
        directoryDDDiv.innerHTML = "";
    }
}


function orderCDStateChanged() {
    var lang = document.forms[0].lang.value;
    var selectedState = document.getElementById('statesDD').value;
    if (selectedState && selectedState != "" && selectedState != "DUMMY") {
        callback("skin/entrymap/_att/ajax_order_cd_directory_dropdown.aspx?SelectedState=" + selectedState + "&lang=" + lang, OnStateChange_DownloadStateChanged);
    } else {
        var directoryDDDiv = document.getElementById("directoryDDDiv");
        directoryDDDiv.innerHTML = "";
    }
    var stateInAddress = document.getElementById('State');
    //if (!stateInAddress.value || stateInAddress.value == "" || stateInAddress.value == "DUMMY") {
        stateInAddress.value = selectedState;
    //}
    
}


function buildBookUrl(baseUrl) {
    var url = baseUrl;
    var lang = document.forms[0].lang.value;
    var searchKeyword = trim(document.getElementById('searchKeyword').value);
    if (lang && lang == 'sp')
        url = url + "&lang=es-ES";
    if (searchKeyword)
        url = url + "&search=" + encodeURIComponent(searchKeyword);

    return url;
}


/* Home Page onLoad handling */
function homePageOnLoad() {
 
    var cookie = Get_Cookie("amddCookie");
    if (cookie) {
        var dirCode = Get_Key(cookie, "dirCode");
        var state = Get_Key(cookie, "state");
        //Ella - start
        var stateValue = Get_Key(cookie, "stateValue");  
        if(stateValue == null || stateValue == "" ){
            state = g_dummyStateKey;
            stateValue = g_dummyStateVal; 
            dirCode = "";
            city = "";
        }
        
        var city = Get_Key(cookie, "city");
        //Ella - end
        if (state) {
            updateStateList(state, stateValue, dirCode, city);  //Ella - add city
        }
    }
}

function Get_Cookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) &&
         (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function Get_Key(queryString, key) {
    var start = queryString.indexOf(key + "=");
    var len = start + key.length + 1;
    if ((!start) &&
         (key != queryString.substring(0, key.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = queryString.indexOf("&", len);
    if (end == -1) end = queryString.length;
    return queryString.substring(len, end);
}


function Set_Cookie(name, value, expires) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" + escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "");
}


function callback(url, func) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = func;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function callback1(url, func) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp1 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp1.onreadystatechange = func;
    xmlhttp1.open("GET", url, true);
    xmlhttp1.send();
}

function callback2(url, func) {
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp2 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp2.onreadystatechange = func;
    xmlhttp2.open("GET", url, true);
    xmlhttp2.send();
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function preventEnterOnDoc(e) {
    var key;
    if (window.event)
        key = window.event.keyCode;     //IE
    else
        key = e.which;     //firefox
    if (key == 13) {
        return false;
    } else
        return true;
}


function handleSearchKey(e) {
    var key;
    if (window.event)
        key = window.event.keyCode;     //IE
    else
        key = e.which;     //firefox

    if (key == 13) {
        submitExistingStateSearch(e);
        return false;
    }
    return true;
}

function backButtonOverride() {
    // Work around a <strong class="highlight">Safari</strong> bug
    // that sometimes produces a blank page
    setTimeout("backButtonOverrideBody()", 1);

}

function backButtonOverrideBody() {
    // Works if we backed up to get here
    try {
        history.forward();
    } catch (e) {
        // OK to ignore
    }
    // Every quarter-second, try again. The only
    // guaranteed method for Opera, Firefox,
    // and <strong class="highlight">Safari</strong>, which don't always call
    // onLoad but *do* resume any timers when
    // returning to a page
    setTimeout("backButtonOverrideBody()", 500);
}

