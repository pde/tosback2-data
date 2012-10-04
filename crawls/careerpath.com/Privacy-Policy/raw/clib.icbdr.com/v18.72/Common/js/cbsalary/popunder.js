/*
 * popUnder
 * Duo Consulting
 * www.duoconsulting.com
 */	

var showPopUnder = true
var siteidExclusions = [ /^sep.*/i,       // Block for yahoo and google paid search placements
												  /^clicksor$/i    // Block clicksor affiliate
												]

/* Client-side access to querystring name=value pairs
 * Version 1.2.3
 * 22 Jun 2005
 * Adam Vandenberg
 */
function queryString(qs) { this.params = new Object()
	this.get=Querystring_get
	if (qs == null)
		qs=location.search.substring(1,location.search.length)
	if (qs.length == 0) return
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &
	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=')
		var name = unescape(pair[0])
		if (pair.length == 2)
			value = unescape(pair[1])
		else
			value = name
		this.params[name] = value
	}
}
function Querystring_get(key, default_) {
	if (default_ == null) default_ = null;
	var value=this.params[key]
	if (value==null) value=default_;
	return value
}
/* by Mike New, with special thanks to Jeff Phillips of classadrivers.com
 * Downloaded from Java-scripts.net
 * More scripts at http://www.java-scripts.net 
 */
function get_cookie(Name) {
  var search = Name + "="
  var returnvalue = "";
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search)
    if (offset != -1) { // if the cookie exists
      offset += search.length
      //set the index of beginning value
      end = document.cookie.indexOf(";", offset);
      
    if (end == -1) // set the index of the end of cookie value
         end = document.cookie.length;
         returnvalue = unescape(document.cookie.substring(offset, end))
      }
   }
  return returnvalue;
}


// Build qs object and get siteid
var qs = new queryString()
var siteid = qs.get("siteid")

// Test siteid for exclusion
for (i in siteidExclusions) {
	if (siteidExclusions[i].test(siteid))	showPopUnder = false;
}

if (showPopUnder && get_cookie('popunder')==''){
	document.cookie="popunder=yes"


	var popUnder = {
		
		/* defaults */
		src: null, name: 'popWin',
		width: 720, height: 345, status: 0, toolbar: 0,
		scrollbars: 'no', resizable: 'no', location: 'no',
		
		/* build features string */
		features: function () { return ("width="+this.width+",height="+this.height+",status="+this.status+",toolbar="+this.toolbar+",scrollbars="+this.scrollbars+",resizable="+this.resizable+",location="+this.location) },
		
		/* show method */
		show: function (src) {
			if (src) { this.src = src; }
			if (this.src) { popWin = window.open(this.src, this.name, this.features()); popWin.blur(); top.window.focus(); }
		}
	
	}
	
	// This variable was sent down from the page through the ScriptVariables manager
	popUnder.show(ScriptVariables.Get('sAdUrl'));
}

