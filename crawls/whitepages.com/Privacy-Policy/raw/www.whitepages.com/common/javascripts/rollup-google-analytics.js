
var _gaq = _gaq || [], default_string = false;

// NOTE: these two trackers should use the same configuration, to avoid cookie conflicts.
// The only difference (at this stage) should be the account number.

// rollup tracker
_gaq.push([ 'rollup._setAccount', 'UA-28400209-1' ]);
_gaq.push([ 'rollup._setDomainName', WhitePagesMeta.site.domain ]);


function RollupVariables (){

  function sw(s, c){ // ensure prefix presence (e.g. leading slash on URI path)
    return s ? (s.substr(0,c.length) == c ? s : c + s) : '';
  }

  function st(s){ return s && s.toString() }


  var search_limit = 50, meta, L = document.location, actual = sw(L.pathname, '/') + sw(L.search, '?') + sw(L.hash, '#');
  

	/* Replace empty/blank values with defaults
	 * @param s: 	the given value
	 * @param d:  the default value to return if s is blank
	 * @param c:  (optional) the prefix value to prepend on s, if not present... (e.g. leading "/" on URLs)
	 */
  function def(s, d, c){ // wrap default values
    try {
			if(default_string && /^(undefined|null|false)$/.test(s)) s = null;
      return s ? (c ? sw(s, c) : s) : d;
    } catch (e) {
      return d
    }
  }

  try {
    meta = (window.WhitePagesMeta) || null;

		/* NOTE: most values in this section are passed through def(), which 
		 * gives default values if an empty/null/undefined value is present.
		 * See comments re: def() above.
		 * If an empty string is given as the default value to def(), the
		 * value can be overridden later with || (OR)...
     * Example:
     *
     *    var myvar = null;
     *    myvar = def(myvar, '');
     *    myvar = myvar || "my default";
     *
     * Javascript return the first non-empty value in such cases.
     *
     * GA's custom variables also require a non-empty string values. 
     *
		 */

   
    var section = [ def(meta && meta.page.section, ''), def(meta && meta.page.subsection, '') ],
        page = [ def(meta && meta.page.name, 'unnamed'), def(meta && meta.page.type, '') ],
        user = [ def(meta && meta.session.logged_in, ''), def(meta && meta.session.usertype, '') ],
				serp = def(meta && meta.page.serp_page_number, null),
        search = meta && meta.search;



    // Queue advanced tracking
    var url = sw([ section[0] || 'unnamed', section[1], page[1], serp || '' ].join('/').replace(/\/+/g, '/'), '/').replace('.',''),
      // terms = search && (search.last || search.first), q = (terms && terms == search.first),
      url = ('/virtualURI=[' + url + '],actualURI=[' + actual + ']');

    // Page attributes
    _gaq.push([ 'rollup._setCustomVar', 1, 'Section', section[0] || 'unnamed', 3 ]); // section name
    _gaq.push([ 'rollup._setCustomVar', 2, 'Page', page[0], 3 ]); // page name and page type if non-empty
    _gaq.push([ 'rollup._setCustomVar', 3, 'Subsection', (section[1] || 'unnamed'), 3 ]); // subsection name 
    if(serp) _gaq.push([ 'rollup._setCustomVar', 4, 'SERP Page', serp || '', 3 ]); // serp_page_number if non-empty

    // Session attributes
    // if(terms && !serp) _gaq.push([ 'rollup._setCustomVar', 4, (q ? 'First' : 'Last') + ' Search', terms.substr(0, search_limit), 2 ]);
		_gaq.push([ 'rollup._setCustomVar', 5, 'Logged In', user[0], 2 ]);
		
    // Standard tracking with Custom Variables
    _gaq.push([ 'rollup._trackPageview', url ], [ '_trackPageLoadTime']);

   
  } catch(e) {
    if(console && console.error) console.error(e);
  }

}

// Queue the custom-variable processing
_gaq.push(RollupVariables);



