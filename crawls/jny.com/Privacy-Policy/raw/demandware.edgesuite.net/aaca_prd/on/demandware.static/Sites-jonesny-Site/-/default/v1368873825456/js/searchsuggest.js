JSONDecoder = new (function(){
	this.decode = function(json){
		return eval("(" + json + ')');
	};
})();

var searchReq;
var idPrefix = '';
function doServerQuery(searchTerm) {

		searchReq = new Ajax.Request(searchSuggestURL, {
			method : "get",
			parameters : "q=" + encodeURI(searchTerm),
			onComplete: function(response){
				handleSearchSuggest(response.responseText);
			}
		});

}

/**
 * Starts a delayed search suggest. 
 */
function suggest(idP)
{
	idPrefix = idP;
	window.setTimeout('searchSuggest()', 500);
}

/**
 * Does the actual suggest.
 */
function searchSuggest() {
	var ss = document.getElementById(idPrefix+'search_suggest');
	ss.innerHTML = '';
	ss.style.visibility = "hidden";
	
	if(idPrefix == 'adv')
		var str = document.getElementById('mainQuery').value;
	else
		var str = document.getElementById('query').value;
	//do not ask server for suggestions if user typed in 0 characters,
	//because of the huge amount of suggestions this would make no sense
	if(str.length == 0) return;

	//do a server call only if there is no request still on the run
	//because it keeps us from making requests quicker than we recieve them
	if (searchReq==undefined || searchReq.transport.readyState == 4 || searchReq.transport.readyState == 0) {
		doServerQuery(str);
	}
}

/**
 * Handles the returned JSON response.
 */
function handleSearchSuggest(responseText) {
	var ss = document.getElementById(idPrefix+'search_suggest');
	ss.innerHTML = '';
	ss.style.visibility = "hidden";

	var jsonPayload	= JSONDecoder.decode(responseText);

	if(jsonPayload.suggestions.length==0) return;

	for(i=0; i < jsonPayload.suggestions.length; i++) {
		//Build our element string.  This is cleaner using the DOM, but
		//IE doesn't support dynamically added attributes.
		var suggest = '<div class="suggestItem" onmouseover="javascript:suggestOver(this);" ';
		suggest += 'onmouseout="javascript:suggestOut(this);" ';
		suggest += 'onclick="javascript:setSearch(this);" ';
		suggest += 'suggestion="'+ jsonPayload.suggestions[i].suggestion + '" ';
		suggest += '><span class="term">' + jsonPayload.suggestions[i].suggestion +'</span></div>';
		ss.innerHTML += suggest;
	}
	ss.style.visibility = "visible";
}

/**
 * Handles mouse over
 */
function suggestOver(div_value) {
	div_value.className = 'suggestItem over';
}

/**
 * Handles mouse out
 */
function suggestOut(div_value) {
	div_value.className = 'suggestItem';
}

/**
 * Handles suggest click (alternative 1)
 */
function setSearch(divNode) {
	if(idPrefix == 'adv')
		document.getElementById('mainQuery').value = divNode.getAttribute('suggestion');
	else
		document.getElementById('query').value = divNode.getAttribute('suggestion');
	//document.getElementById('query').value = value;
	var ss = document.getElementById(idPrefix+'search_suggest');
	ss.innerHTML = '';
	ss.style.visibility = "hidden";
	if(idPrefix != 'adv')
		document.forms.SimpleSearchForm.submit();
}

/**
 * Handles suggest click (alternative 2)
 */
function setSearchTerm(divNode) {
	if(idPrefix == 'adv')
		document.getElementById('mainQuery').value = divNode.getAttribute('suggestion');
	else
		document.getElementById('query').value = divNode.getAttribute('suggestion');
	var ss = document.getElementById(idPrefix+'search_suggest');
	ss.innerHTML = '';
	ss.style.visibility = "hidden";
}