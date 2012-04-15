// This function plays an audio file.
function au (file, word, pr_text)
	{	popWin('/audio.php?file=' + escape(file) + '&word=' + escape(word) + '&text=' + (typeof(pr_text) != 'undefined' ? pr_text : ''));
	};

// This function opens a popup window to playback the pronunciation of a word.
function popWin (the_url)
	{	aWindow = window.open(the_url,"pron_window","toolbar=no,scrollbars=yes,status=no,resizable=yes,menubar=no,width=650,height=270");
	};

// This function opens a popup window to playback the pronunciation of a word.
function popConjWin (the_url)
	{	aWindow = window.open(the_url,"pron_window","toolbar=no,scrollbars=yes,status=no,resizable=yes,menubar=no,width=850,height=270");
	};

// This function opens an art window.
function artWin (the_url)
	{	aWindow = window.open(the_url,"art_window","toolbar=no,scrollbars=yes,status=no,resizable=yes,menubar=no,width=650,height=450");
	};

// This function sets up a reference entry.
function setupEntry ()
	{	// Look for the entry.
		var entry = document.getElementById("mwEntryData");

		if ( entry )
			{	// Grab all the span classes.
				var spans = entry.getElementsByTagName("span");

				// Setup all the pron bubbles.
				for (var index = 0; index < spans.length; index++ )
					{	var pr_span = spans.item(index);
						if ( pr_span.className == "pr" )
							{	// Change the class name to prevent an infinite loop.
								// pr_span.className = "deleted";

								// Get the document location.
								var loc			= document.location + '/';
								var is_medical	= loc.indexOf('/medical/') > 0;

								if ( !is_medical )
									{	// Get the previous audio link.
										var prev = spans.item(index).previousSibling;

										while ( prev )
											{	if ( prev.nodeName.toLowerCase() == 'input' && prev.className == 'au' )
													{	var pr_text		= encodeURIComponent(pr_span.innerHTML.replace(/\n/g, ' ')).replace(/'/g, "\\'");

														while ( prev && prev.nodeName.toLowerCase() == 'input' && prev.className == 'au' )
															{	var new_call	= "" + prev.onclick;
																new_call		= new_call.substr(new_call.indexOf('au'), new_call.length).replace(/\}\s*$/, '');
																new_call		= 'return ' + new_call.replace(');', ', \'' + pr_text + '\');');

																prev.onclick = new Function(new_call);

																prev = prev.previousSibling;
															};
														
														break;
													};											
												prev = prev.previousSibling;
											};
									}
								else
									{	// Get the previous audio link.
										var prev = spans.item(index).nextSibling;

										var pr_text	= encodeURIComponent(pr_span.innerHTML.replace(/\n/g, ' ')).replace(/'/g, "\\'");

										while ( prev )
											{	if ( prev.nodeName.toLowerCase() == 'input' && prev.className == 'au' )
													{	var new_call	= "" + prev.onclick;
																new_call		= new_call.substr(new_call.indexOf('au'), new_call.length).replace(/\}\s*$/, '');
																new_call		= 'return ' + new_call.replace(');', ', \'' + pr_text + '\');');

																prev.onclick = new Function(new_call);
													}
												else if ( prev.nodeName.toLowerCase() == 'span' && prev.className == 'pr' )
													{	break;
													};
												
												prev = prev.nextSibling;
											};
									};
							};
					};
			};
	};

// This function sets up a reference entry.
function setupEntry_8_10_2010 ()
	{	// Look for the entry.
		var entry = document.getElementById("mwEntryData");

		if ( entry )
			{	// Grab all the span classes.
				var spans = entry.getElementsByTagName("span");

				// Setup all the pron bubbles.
				for (var index = 0; index < spans.length; index++ )
					{	if ( spans.item(index).className == "pr" )
							{	// Change the class name to prevent an infinite loop.
								spans.item(index).className = "deleted";
					
								// Create the container.
								var container = document.createElement("a");
								container.href		= "";
								container.onclick	= function () { return false; };
								container.className	= "pr-bubble";		

								// Create the new button.
								var button			= document.createElement('input');
								button.className	= "pr-button";
								button.type			= "button";
								container.appendChild(button);	
								
								// Create the text.
								var text = document.createElement("div");
								text.className = "text";
								text.innerHTML	=
										'<div class="corner-top-left">' +
										'<div class="corner-top-right">' +
										'<div class="border-top">' +
											'<div class="header"></div>' +
										'</div>' +
										'</div>' +
										'</div>' +
										'<div class="border-left">' +
										'<div class="border-right">' +
											'<div class="data">' +
												spans.item(index).innerHTML +
											'</div>' +
										'</div>' +
										'</div>' +
										'<div class="corner-bottom-left">' +
										'<div class="corner-bottom-right">' +
										'<div class="footer">' +
										'<div class="border-bottom">' +
										'</div>' +
										'</div>' +
										'</div>' +
										'</div>';
								container.appendChild(text);						
								spans.item(index).parentNode.insertBefore(container, spans.item(index));
								spans.item(index).parentNode.removeChild(spans.item(index));
							};
					};
			};
	};

// This function sets up a reference entry.
function setupEntry7_15_2010 ()
	{	// Look for the entry.
		var entry = document.getElementById("mwEntryData");

		// Grab all the span classes.
		var spans = entry.getElementsByTagName("span");

		// Setup all the pron bubbles.
		for (var index = 0; index < spans.length; index++ )
			{	if ( spans.item(index).className == "pr" )
					{	spans.item(index).className	= "pr-bubble-over";
						spans.item(index).innerHTML	=
							'<div class="text">' +
								'<div class="corner-top-left">' +
								'<div class="corner-top-right">' +
								'<div class="border-top">' +
									'<div class="header"></div>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'<div class="border-left">' +
								'<div class="border-right">' +
									'<div class="data">' +
										spans.item(index).innerHTML +
									'</div>' +
								'</div>' +
								'</div>' +
								'<div class="corner-bottom-left">' +
								'<div class="corner-bottom-right">' +
								'<div class="footer">' +
								'<div class="border-bottom">' +
								'</div>' +
								'</div>' +
								'</div>' +
								'</div>' +
							'</div>';

					};
			};
	};