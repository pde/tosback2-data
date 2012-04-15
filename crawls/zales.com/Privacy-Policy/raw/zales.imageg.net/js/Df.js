/**
* @fileoverview
* Df Global API Library.
*
* @requires  prototype.js v1.5 or above
* @author    Brad Hurley
*/
var Df = {
	
	/**
	* The version of the Df api core.
	* @type Float
	* @public
	*/
	
	version: "1.2.1",
	
	/**
	* load javascript files through inline as the page loads, n waits for n-1 to load
	* @type Void
	* @note uses document.write
	* @public
	*/
	loadJS: function(){
		for(var i = 0; i < arguments.length; i++) {
			document.write('<script type="text/javascript" src="'+arguments[i]+'"></script>');
		}
	},
	
	/**
	* browser detection
	* @type Object
	* @public
	*/
	browser: function(){
		
		var obj = {
			mac : 0,
			safari : 0,
			firefoxMac : 0,
			pc : 0,
			ie : 0,
			ie6 : 0,
			ie7 : 0,
			netscape : 0,
			firefox : 0
		};
		
		var ua = navigator.userAgent.toLowerCase();
		
		if(ua.indexOf("macintosh")!==-1){
			obj.mac = 1;
			if(ua.indexOf("safari")!==-1){
				obj.safari = 1;
			}else if(ua.indexOf("firefox")!==-1){
				obj.firefoxMac = 1;
			}
		}else{
			obj.pc = 1;
			if(ua.indexOf("msie")!==-1){
				obj.ie = 1;
				if(ua.indexOf("msie 6")!==-1 || ua.indexOf("msie 5")!==-1){
					obj.ie6 = 1;
				}else if(ua.indexOf("msie 7")!==-1){
					obj.ie7 = 1;
				}
			}else if(ua.indexOf("netscape")!==-1){
				obj.netscape = 1;
			}else if(ua.indexOf("firefox")!==-1){
				obj.firefox = 1;
			}
		}
		return obj;
	},
	
	/**
	* browser detection
	* @type Object
	* @note shortcut for document.compatMode
	* @public
	*/
	renderMode: function(){
		return document.compatMode;	
	},
	
	/**
	* concatination of function arguments
	* @type String
	* @public
	*/
	concat: function(){
		var ary = [];
		for(var i=0; i<arguments.length; i++){
			ary.push(arguments[i]);
		}
		return ary.join('');
	},
	
	/**
	* create namespace
	* @type void
	* @param {String} str The complete Namespace as a string
	* @param {Node} scope the scope to add the namespace
	* @public
	* @example
	Df.createNS('df.something.somethingelse',$('xxx'))
	// creates
	$('xxx').df.something.somethingelse = {}
	*/
	createNS: function(str,scope){
		var ary = str.split('.');
		
		if(!scope){
			scope = window
		}
		
		if(scope[ary[0]]){
		}else{
			scope[ary[0]] = {};
		}
		
		if(ary[1]){
			next(scope[ary[0]],1);
		}
			
		function next(base,i){
			if(base[i]){
				interate(base,i);
			}else{
				base[ary[i]] = {};
				interate(base,i);
			}
		}
		
		function interate(base,i){
			if(ary[i+1]){
				next(base[ary[i]],i+1);
			}
		}
   }
};
///////////////////////////////include js files //////////////////////

//load javascript files through inline as the page loads, n waits for n-1 to load(document.write)
Df.loadJS	(
			"../js/prototype1_6.js",
			"../js/prototype1_6_extend.js",
			"../js/Df.Animate.js"
		);
