//jQuery.noConflict();

var autocompleteDisplay;

function updateHidden(query, original) {
   
original.value = query.value;
}

function set_css() {
	jQuery(".jqac-menu").css({
		'color': '#333333',
		'background-color': 'white',
		'border': '1px solid #aaa',
		'font-family': 'Arial',
		'font-size': '12px'
		});
	jQuery(".jqac-menu ul").css({
		'list-style':'none',
		'margin':'1px',
		'padding':'1px',
		'overflow':'hidden',
		'background-color': 'white'
		});
	jQuery(".jqac-menu em").css({'text-decoration':'none'});
	jQuery(".jqac-menu .jqac-match").css({'text-decoration':'none'});
	jQuery(".jqac-menu .jqac-link").css({'cursor':'hand',
		'cursor':'pointer',
		'display':'block',
		'overflow':'hidden'
		});
}

jQuery(document).click(function() {
    jQuery('.jqac-menu').hide();
});

jQuery(".jqac-menu").click(function() {
    return false;
});



jQuery(document).ready(function() {
    if (document.searchBox != "undefined") {
        jQuery("#searchInput").autocomplete({ ajax_get: jsonSearchCall });

        jQuery("#searchInput").click(function() {
            if (document.searchBox.searchInput.value == searchBox_default) {
                document.searchBox.searchInput.value = "";
                document.searchBox.searchInput.focus();
                return false;
            }
        });



        jQuery("#searchBtn").click(
			function() {
        if (!document.searchBox.searchInput.value || document.searchBox.searchInput.value == searchBox_default) {
			        document.searchBox.searchInput.value = "";
			        document.searchBox.searchInput.focus();
			        return false;
			    }
			});
    }

});

    // ----------------------------------------------------------------------------
    // All these are JSON Call Specific functions:
    // ----------------------------------------------------------------------------
    // Constructor -- pass a REST request URL to the constructor
    //
    function SearchRequest(fullUrl) {
        // REST request path
        this.fullUrl = fullUrl;
        // Keep IE from caching requests
        this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
        // Get the DOM location to put the script tag
        this.headLoc = document.getElementsByTagName("head").item(0);
        // Generate a unique script tag id
        this.scriptId = 'SearchScriptId' + SearchRequest.scriptCounter++;
    }

    // Static script ID counter
    SearchRequest.scriptCounter = 1;

    // buildScriptTag method
    //
    SearchRequest.prototype.buildScriptTag = function() {

        // Create the script tag
        this.scriptObj = document.createElement("script");

        // Add script object attributes
        this.scriptObj.setAttribute("type", "text/javascript");
        this.scriptObj.setAttribute("charset", "utf-8");
        // this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
        this.scriptObj.setAttribute("src", this.fullUrl);
        this.scriptObj.setAttribute("id", this.scriptId);
        
    }

    // removeScriptTag method
    //
    SearchRequest.prototype.removeScriptTag = function() {
        this.headLoc.removeChild(this.scriptObj);
    }

    // addScriptTag method
    //
    SearchRequest.prototype.addScriptTag = function() {
        // Create the script tag
        this.headLoc.appendChild(this.scriptObj);
    }

    // Define the personalization callback function
    function processSearchResponse(jsonData) {
        jsonData = jsonData.split(",");
        var res = [];
        if (jsonData && jsonData.length > 2) {
            for (var i = 2; i < jsonData.length; i = i + 2) {
                var val = jsonData[i];
                val = val.replace(/"/g, '');
                val = val.replace(/\\/g, '"');
                val = val.replace(/\[/g, '');
                val = val.replace(/\]/g, '');
                res.push({ id: i, value: val });
            }
            autocompleteDisplay(res);
            set_css();

            if (searchObj) {
                searchObj.removeScriptTag();
            }
        }
       
    }

    function jsonSearchCall(v, cont) {
        autocompleteDisplay = null;
        autocompleteDisplay = cont;

        var c = document.getElementById('qc').value;

        //location: for production:
        var querycompletion = "http://sfesearch.statefarm.com/Gateway/QueryCompletion.aspx?q=";

        //location for canada production
        if (c == "ca") {
            querycompletion = "http://sfesearch.statefarm.ca/Gateway/QueryCompletion.aspx?q=";
        }
        
        // Create a new request object
        searchObj = new SearchRequest(querycompletion + v + "&c=" + c);
        // Build the dynamic script tag
        searchObj.buildScriptTag();
        
        // Add the script tag to the page
        searchObj.addScriptTag();
    }


   