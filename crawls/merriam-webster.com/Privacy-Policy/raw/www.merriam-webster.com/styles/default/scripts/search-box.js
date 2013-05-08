// Output the search box.
document.write('<form id="ref-search-box" action="#" method="get" class="search-box-no-focus" onsubmit="return doReferenceSearch(this);">');
document.write('<ol class="dictionary">');
document.write('<li class="dictionary"><a href="#" onclick="this.parentNode.parentNode.className = this.parentNode.className; document.getElementById(\'ref\').value = this.parentNode.className; doReferenceSwitch(1); return false;"><span>Dictionary</span></a></li>');
document.write('<li class="thesaurus"><a href="#" onclick="this.parentNode.parentNode.className = this.parentNode.className; document.getElementById(\'ref\').value = this.parentNode.className; doReferenceSwitch(2); return false;"><span>Thesaurus</span></a></li>');
document.write('<li class="spanish"><a href="#" onclick="this.parentNode.parentNode.className = this.parentNode.className; document.getElementById(\'ref\').value = this.parentNode.className; doReferenceSwitch(3); return false;"><span>Spanish</span></a></li>');
document.write('<li class="medical"><a href="#" onclick="this.parentNode.parentNode.className = this.parentNode.className; document.getElementById(\'ref\').value = this.parentNode.className; doReferenceSwitch(4); return false;"><span>Medical</span></a></li>');
document.write('<li class="concise"><a href="#" onclick="this.parentNode.parentNode.className = this.parentNode.className; document.getElementById(\'ref\').value = this.parentNode.className; doReferenceSwitch(5); return false;"><span>Concise Encyclopedia</span></a></li>');
document.write('</ol>');
document.write('<div>');
document.write('<input id="ref" name="ref" type="hidden" value="dictionary" />');
document.write('<input type="submit" class="search-button" value="" />');
document.write('<input id="search_box_terms" name="word" type="text" value="" class="word" autocomplete="no" onfocus="document.getElementById(\'ref-search-box\').className=\'search-box-focus\';" onblur="document.getElementById(\'ref-search-box\').className=\'search-box-no-focus\';" />');
document.write('<span id="selection"></span>');
document.write('</div>');
document.write('</form>');

// This function performs a reference search.
function doReferenceSearch (the_form)
	{	document.location = '/' + the_form.ref.value + '/' + the_form.word.value;
		return false;
	};

// This function performs a reference search.
function doReferenceSwitch (ref)
	{	//var search_box = document.getElementById('search_box_terms');
		//search_box.autocomplete.cachedResponse = [];
		//search_box.focus();
		if ( document.getElementById('search_box_terms').value.replace(/\s+/, '') != '' )
			{	document.location = '/' + document.getElementById('ref').value + '/' + encodeURIComponent(document.getElementById('search_box_terms').value);
			};
		return false;
	};

// Set it up.
jQuery(function()
	{	// This callback handles all suggestion clicks.
		var onAutocompleteSelect = function(value, data)
			{	// $('#selection').html('<img src="\/global\/flags\/small\/' + data + '.png" alt="" \/> ' + value);
				// alert(data);
				document.location = "/" + document.getElementById('ref').value + "/" + value;
			};

		// Autocomplete options.
		var options =
			{	serviceUrl: '/autocomplete',
				maxHeight: 164,
				width: 434,
				delimiter: /(,|;)\s*/,
				onSelect: onAutocompleteSelect,
				deferRequestBy: 0, //miliseconds
				params: { ref: function() { var ids= {'dictionary' : 1, 'thesaurus' : 2, 'spanish' : 3, 'medical' : 4, 'concise' : 5 }; return ids[document.getElementById('ref').value] } },
				noCache: false // set to true, to disable caching
			};

		// Set up the autocomplete field.
		a1 = $('#search_box_terms').autocomplete(options);		
		//document.getElementById('search_box_terms').autocomplete = a1;
	});
