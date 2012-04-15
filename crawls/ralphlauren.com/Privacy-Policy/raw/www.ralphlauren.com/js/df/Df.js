/*
 ref:		Df
 note:		Base Static Class or Namespace for the API
 returns:	Object
 type:		Static Class
*/
var Df = {}

Df.debug = {
	clock: function(){},
	log: function(){}
}

/*
 ref:		Df.Conditions
 note:		this is a mixin for native javascript object types
 note:		adds ruby style conditionals
 returns:	Object
 type:		Static Class
 example:	<script type="text/javascript">
			var s = 'wertew'.df_if(1==10).df_else('erwr')
			alert(s)
		</script>
 example:	<script type="text/javascript">
			var s = 'rrr'.df_unless(1==1).df_else('ttt')
			alert(s)
		</script>
 example:	<script type="text/javascript">
			var s = $A([
				'rrr'.df_if(10==1),
				'sss'.df_if(1==10),
				'fff'
			]).detect(function(v){return v})
			
			alert(s)
		</script>
*/
Df.Conditions = {
	/*
	 ref:		Df.Conditions.df_if
	 hint:		use as a mixin
	 hint:		not to be used in its staic form
	 returns:	this|false
	 type:		Static Method
	 arg:		Expression condition
	*/
	df_if: function(condition){
		if(condition){
			if(this.constructor && this.constructor == Function){
				return this()
			} else {
				return this
			}
		} else {
			return false
		}
	},
	/*
	 ref:		Df.Conditions.df_unless
	 hint:		use as a mixin
	 hint:		not to be used in its staic form
	 returns:	this|false
	 type:		Static Method
	 arg:		Expression condition
	*/
	df_unless: function(condition){
		if(condition){
			return false
		} else {
			if(this.constructor && this.constructor == Function){
				return this()
			} else {
				return this
			}
		}
	},
	/*
	 ref:		Df.Conditions.df_else
	 hint:		use as a mixin
	 hint:		not to be used in its staic form
	 returns:	this|false
	 type:		Static Method
	 arg:		Object a 
	*/
	df_else: function(a){
		if(this == false){	
			if(a.constructor && a.constructor == Function){
				return a()
			} else {
				return a
			}
		} else {
			if(this.constructor && this.constructor == Function){
				return this()
			} else {
				return this
			}
		}
	}
}
/*
 ref:		Df.Conditions.df_then
 hint:		use as a mixin
 hint:		not to be used in its staic form
 returns:	this|false
 type:		Static Method
 arg:		Object a 
*/
Df.Conditions.df_then = Df.Conditions.df_else

/*
 ref:		Number.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Number.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Number.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		Number.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(Number.prototype, Df.Conditions)

/*
 ref:		String.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		String.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		String.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		String.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(String.prototype, Df.Conditions)

/*
 ref:		Array.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Array.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Array.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		Array.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(Array.prototype, Df.Conditions)

/*
 ref:		Boolean
 returns:	Boolean
 type:		Class
*/
/*
 ref:		Boolean.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Boolean.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Boolean.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		Boolean.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(Boolean.prototype, Df.Conditions)

/*
 ref:		Function
 returns:	Function
 type:		Class
*/
/*
 ref:		Function.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Function.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Function.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		Function.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(Function.prototype, Df.Conditions)

/*
 ref:		Hash.df_if
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Hash.df_unless
 returns:	this|false
 type:		Method
 arg:		Expression condition
*/
/*
 ref:		Hash.df_else
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
/*
 ref:		Hash.df_then
 returns:	this|false
 type:		Method
 arg:		Object a 
*/
Object.extend(Hash.prototype, Df.Conditions)

// ---------------------------------------- extending prototype ---------------------------------------

/*
 ref:		Element
 note:		a prototype extended element.
 note:		Use $('xxx') syntax instead of new Element('xxx')
 returns:	Element
 type:		Class
 arg:		String|Object element
 example:	<script type="text/javascript">
			var y = $('xxx')
		</script>
*/
Element.addMethods({
	
	/*
	 ref:		Element.animate
	 note:		Shortcut for creating and running an animation object on an extended element
	 returns:	Element
	 expando:	Element.df.animate
	 delegate:	Df.Animate
	 type:		Method
	 arg:		Object pars
	 example:	<script type="text/javascript">
				$('xxx').animate({
					opacity: 0.5,
					height: 50
				});
			</script>
	*/
	animate: function(element,pars){
		element = $(element);
		Df.Namespace.create('df.animate',element).animate = new Df.Animate(element).run(pars);	
		return element;
	},
	
	/*
	 ref:		Element.toggleAnimation
	 note:		Shortcut for creating and setting an animation object with toggle event listeners on an extended element
	 returns:	Element
	 expando:	Element.df.toggleAnimation
	 delegate:	Df.Animate.toggleBy
	 type:		Method
	 arg:		String action choices are click and hover
	 arg:		Object pars
	 example:	<script type="text/javascript">
				$('xxx').toggleAnimation('click', {
					opacity: 0.5,
					height: 50
				});
			</script>
	*/
	toggleAnimation: function(element, action, pars){
		element = $(element);
		Df.Animate.toggleBy( element , action , pars )
		return element;
	},
	
	/*
	 ref:		Element.dragable
	 note:		Shortcut for creating and setting a drag object on an extended element
	 returns:	Element
	 expando:	Element.df.drag
	 delegate:	Df.Drag
	 type:		Method
	 arg:		Object pars
	 example:	<script type="text/javascript">
				$('xxx').drag();
			</script>
	*/
	dragable: function(element,pars){
		element = $(element);
		Df.Namespace.create('df', element).drag = new Df.Drag(element).set(pars).enable();
		return element;
	},
	
	/*
	 ref:		Element.resizable
	 note:		Shortcut for creating and setting a resize object on an extended element
	 returns:	Element
	 expando:	Element.df.resize
	 delegate:	Df.Resize
	 type:		Method
	 arg:		Object pars
	 example:	<script type="text/javascript">
				$('xxx').resize();
			</script>
	*/
	resizable: function(element,pars){
		element = $(element);
		Df.Namespace.create('df', element).resize = new Df.Resize(element).set(pars).enable();
		return element;
	},
	
	/*
	 ref:		Element.ui
	 note:		Shortcut for creating and setting a Df.Ui object on an extended element
	 returns:	Element
	 delegate:	Df.Ui
	 expando:	Element.df.ui
	 type:		Method
	 arg:		Object pars
	 example:	<script type="text/javascript">
				$('xxx').ui({
					animate: {
						width: 600
					},
					drag: {}
				});
			</script>
	*/
	ui: function(element,pars){
		element = $(element);
		Df.Namespace.create('df', element).ui = new Df.Ui(element).set(pars);
		return element;
	},
	
	/*
	 ref:		Element.createNS
	 note:		Shortcut for creating a namespace object
	 returns:	Object
	 delegate:	Df.Namespace.create
	 type:		Method
	 arg:		String namespace
	 example:	<script type="text/javascript">
				$('xxx').createNS('xxx.yyy.zzz')
			</script>
	*/
	createNS: function(element,namespace){
		return Df.Namespace.create(namespace,$(element));
	},
	
	/*
	 ref:		Element.center
	 note:		Centers the element relative to its parent.
	 returns:	Element
	 type:		Method
	 hint:		Element must be positioned Absolute
	 hint:		Parent must be positioned Absolute or Relative
	 example:	<script type="text/javascript">
				$('xxx').center()
			</script>
	*/
	center: function(element){
		element = $(element);
		holder = element.up()
		
		var hHeight
		var hWidth 
		if (holder == document.body) {
			hHeight = document.viewport.getHeight()/2
			hWidth = document.viewport.getWidth()/2
		}else{
			hHeight = holder.getHeight()/2
			hWidth = holder.getWidth()/2
		}
		
		element.style.left = hWidth-(element.getWidth()/2) + 'px'
		element.style.top = hHeight-(element.getHeight()/2) + 'px'
		
		return element
	}
});

/*
 ref:		String
 returns:	String
 type:		Class
 arg:		String string
*/			  
Object.extend(String.prototype,{
	
	/*
	 ref:		String.uId
	 note:		Created a Unique string based on a timestamp and random number
	 returns:	String
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = ''.uId()
			</script>
	*/
	uId: function(){
		return this + "u" + new Date().getTime() + parseInt(10000*Math.random());
	},
	
	/*
	 ref:		String.exe
	 note:		Evaluates a String using eval
	 note:		Wraps the string in an array and returns the zero index
	 returns:	Object
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = '{"a":"b"}'.exe()
			</script>
	*/
	exe: function(){
		return(eval('[' + this + ']')[0]);
	},
	
	/*
	 ref:		String.trim
	 note:		trims whitespace from the beginning and end of a string
	 returns:	String
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = '  vvv '.trim()
			</script>
	*/
	trim: function(){
		return this.replace(/^[\s]+ |[\s]+$/g,'');	
	}
	
});

/*
 ref:		Array
 returns:	Array
 type:		Class
*/
Object.extend(Array.prototype,{
	/*
	 ref:		Array.sum
	 note:		sums elements in an array
	 returns:	Number
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = [2,4,5].sum()
			</script>
	*/
	sum:function(){
		var s = 0;
		for(var i=0; i<this.length; i++){
			s += this[i];
		}
		return s;
	},
	
	/*
	 ref:		Array.descend
	 note:		sorts elements in an array in desending order
	 returns:	Array
	 type:		Method
	*/
	descend: function(p){
		if(p){
			this.sort(function(a,b){
				x = a[p]
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b[p]
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return -1;
				if (y > x)return 1;
				return 0;
			});
		}else{
			this.sort(function(a,b){
				
				x = a
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				
				if (x > y)return -1;
				if (y > x)return 1;
				return 0;
			});
		}
	},
	
	/*
	 ref:		Array.ascend
	 note:		sorts elements in an array in ascending order
	 returns:	Array
	 type:		Method
	*/
	ascend: function(p){
		if(p){
			this.sort(function(a,b){
				x = a[p]
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b[p]
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return 1;
				if (y > x)return -1;
				return 0;
			});
		}else{
			this.sort(function(a,b){
				
				x = a
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return 1;
				if (y > x)return -1;
				return 0;
			});
		}
		
		
	}
});

/*
 ref:		Hash
 note:		a prototype extended object
 note:		Use $H(obj) syntax instead of new Hash(obj)
 arg:		Object obj
 returns:	Hash
 type:		Class
 example:	<script type="text/javascript">
			var xxx = $H({a:'aa'; b:'bb'})
		</script>
*/
Object.extend(Hash.prototype,{
	
	/*
	 ref:		Hash.arrayAndHash
	 note:		Extends a hash to have an array counterpart
	 note:		The Array is the values of the Hash
	 returns:	Hash&Array
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = $H({a:'aa'; b:'bb'}).arrayAndHash()
				
				alert(xxx.a)
				
				alert(xxx[0])
			</script>
	*/
	arrayAndHash: function(){
		var r = this.values()
		for(p in this){
			r[p] = this[p]
		}
		return r
	}
});

/*
 ref:		Number
 returns:	Number
 type:		Class
*/
Object.extend(Number.prototype, {
	
	/*
	 ref:		Number.toReadableTimeStamp
	 note:		returns milliseconds formated in hours, minutes, seconds, milliseconds
	 returns:	String
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = 624235234552345324.toReadableTimeStamp()
			</script>
	*/
	toReadableTimeStamp: function(){
		if(this < 1000){
			return this + ' milliseconds'	
		}
		else if (this < 1000 * 60) {
			return (Math.floor(this/1000)) + ' seconds and ' + (this%1000) + ' milliseconds'
		}
		else if (this < 1000 * 60 * 60) {
			return (Math.floor(this/(1000 * 60))) + ' minutes, ' + (Math.floor((this%(1000 * 60))/1000)) + ' seconds and ' + ((this%(1000 * 60))%1000) + ' milliseconds'
		}
		else if (this < 1000 * 60 * 60 * 24) {
			return (Math.floor(this/(1000 * 60 * 60))) + ' hours, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60))) + ' minutes, ' + (Math.floor((this%(1000 * 60))/1000)) + ' seconds and ' + ((this%(1000 * 60))%1000) + ' milliseconds' 
		}
		else if (this < 1000 * 60 * 60 * 24 * 365) {
			return (Math.floor(this/(1000 * 60 * 60 * 24))) + ' days, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60 * 24))) + ' hours, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60))) + ' minutes, ' + (Math.floor((this%(1000 * 60))/1000)) + ' seconds and ' + ((this%(1000 * 60))%1000) + ' milliseconds'
		}
		else {
			return (Math.floor(this/(1000 * 60 * 60 * 24 * 365))) + ' years, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60 * 24 * 365))) + ' days, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60 * 24))) + ' hours, ' + (Math.floor((this%(1000 * 60 * 60))/(1000 * 60))) + ' minutes, ' + (Math.floor((this%(1000 * 60))/1000)) + ' seconds and ' + ((this%(1000 * 60))%1000) + ' milliseconds'
		}
	},
	
	/*
	 ref:		Number.suff
	 note:		returns the number given plus the suffix from that number as a string
	 returns:	String
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = 6.suff()
			</script>
	*/
	suff: function(){
		var str = this.toString()
		var count = parseInt(str.length -1)
		if(this == 0)return this
		if((str[count]>3 && str[count]<10) || str[count-1]==1 && count != 0 )return this + "th"
		if(str[count] == 1)return this + "st"
		if(str[count] == 2)return this + "nd"
		if(str[count] == 3)return this + "rd"
			return this + "th"
	},
	
	/*
	 ref:		Number.round
	 note:		returns the number given plus the suffix from that number as a string
	 note:		provides a decimal places argument to prototypes round method
	 override:
	 returns:	String
	 arg:		Number places optional argument for the decimal places to round the number to
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = (6.4567).round(2)
			</script>
	*/
	round: function(places){
		if(places){
			return Math.round((this+1-1)*(Math.pow(10,places)))/Math.pow(10,places);
		} else {
			return Math.round()
		}
	},
	
	/*
	 ref:		Number.dollars
	 note:		returns the number given as an American Currency String
	 returns:	String
	 type:		Method
	 example:	<script type="text/javascript">
				var xxx = (6.4567).dollars()
			</script>
	*/
	dollars: function(){
		var num = this.round(2)
		num = num.toString()
		var dec = num.indexOf(new String('.'))
		if(dec == -1){
			num = num.concat(new String('.00'))   
		}else if(((num.length-1) - dec) == 1){
			num = num.concat(new String('0'))
		}
		return '$'+num
	},
	
	/*
	 ref:		Number.toRange
	 note:		returns the number if in the range given else return the min or max of the range
			depending on if the number is less then or greater then min and max of the range
	 returns:	Number
	 type:		Method
	 arg:		Number min the minimum number in the range
	 arg:		Number max the maximum number in the range
	 example:	<script type="text/javascript">
				var xxx = (6.4567).setInRange(0,5)
				//returns xxx = 5
			</script>
	*/
	toRange: function(min, max){
		if(this >= min){
			if(this <= max){
				return this
			} else {
				return max
			}
		} else {
			return min
		}
	}
});

/*
 ref:		Df.version
 note:		version of the API
 type:		Static Parameter
 returns:	String
 example:	<script type="text/javascript">
			alert(Df.VERSION)
		</script>
*/
Df.version = "1.3.9";

/*
 ref:		Df.classPath
 returns:	String
 note:		location where importModule looks for files
 type:		Static Parameter
 example:	<script type="text/javascript">
			Df.classPath = '/js/df/';
		</script>
*/
Df.classPath = '../js/df/';

/*
 ref:		Df.importModule
 note:		load javascript files through inline as the page loads, n waits for n-1 to load
 type:		Static Method
 arg:		*String arguments the filename of the javascript file without the extention or path.
		Uses Df.ClassPath for the path. Multiple arguments allowed
 example:	<script type="text/javascript">
			Df.importModule("Df.Navigation", "Df.Tip" )
		</script>
*/
Df.importModule = function () {
	for (var i = 0; i < arguments.length; i++) {
		if(Df.Namespace.exists(arguments[i])){
		}else{
			document.write('<script type="text/javascript" src="' + Df.classPath + arguments[i] + '.js"></script>');
		}
	}
};

/*
 ref:		Df.loadJS
 type:		Static Method
 arg:		*String arguments the filename of the javascript file with the extention and path.
		Multiple arguments allowed
 note:		load javascript files through inline as the page loads, n waits for n-1 to load
 example:	<script type="text/javascript">
			Df.loadJS('/js/df/Df.Tip.js', '/js/df/Df.Navigation.js')
		</script> 
*/
Df.loadJS = function () {
	for (var i = 0; i < arguments.length; i++) {
		document.write('<script type="text/javascript" src="'+ arguments[i] +'"></script>');
	}
};

/*
 ref:		Df.loadImage
 note:		loads image file
 note:		intended to be used as a preloader
 arg:		*String arguments the filename of the image file with the extention and path.
		Multiple arguments allowed
 type:		Static Method
 example:	<script type="text/javascript">
			Df.loadImage('/images/x.jpg', '/images/y.jpg', '/images/y.jpg')
		</script>
*/
Df.loadImage = function () {
	for (var i = 0; i < arguments.length; i++) {
		new Image().src = arguments[i];
	}
};
	
/*
 ref:		Df.browser
 type:		Static Method
 note:		Browser Detection
 returns:	{
			mac : (0|1),
			safari : (0|1),
			firefoxMac : (0|1),
			pc : (0|1),
			ie : (0|1),
			ie6 : (0|1),
			ie7 : (0|1),
			netscape : (0|1),
			firefox : (0|1)
		}
 example:	<script type="text/javascript">
			if(Df.browser().ie6 ){
				alert('hack away');
			}
		</script>
*/
Df.browser = function () {
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
	
	if (ua.indexOf("macintosh") !== -1) {
		obj.mac = 1;
		if (ua.indexOf("safari") !== -1) {
			obj.safari = 1;
		}
		else if (ua.indexOf("firefox") !== -1) {
			obj.firefoxMac = 1;
		}
	} else {
		obj.pc = 1; 
		if (ua.indexOf("msie") !== -1) {
			obj.ie = 1;
			if (ua.indexOf("msie 6") !== -1 || ua.indexOf("msie 5") !== -1) {
				obj.ie6 = 1;
			}
			else if (ua.indexOf("msie 7") !== -1) {
				obj.ie7 = 1;
			}
		}
		else if (ua.indexOf("netscape") !== -1) {
			obj.netscape = 1;
		}
		else if (ua.indexOf("firefox") !== -1) {
			obj.firefox = 1;
		}
	}
	return obj;
};	
	
/*
 ref:		Df.e
 note:		creates an element and appends it to another
 returns:	Element
 type:		Static Method
 example:	<script type="text/javascript">
			Df.e('div', document.body, {innerHTML: 'new element', className: 'new'} )
		</script>
*/
Df.e = function(tag,elm,para){
	var obj = document.createElement(tag);
	if(para){
		Object.extend(obj,para);
	}
	elm.appendChild($(obj));
	return $(obj);
};

/*
 ref:		Df.Namespace
 returns:	Object
 note:		This is the class to use to create or determine if a namespace exists
 type:		Static Class
*/
Df.Namespace = {
	_ary: null,
	_obj: null,
	_exists: false,
	
	/*
	 ref:		Df.Namespace.create
	 note:		create or retrieve a namespace
	 note:		returns last Object in the namespace string
	 note:		namespaces are created from blank objects if they don't already exist
	 type:		Static Method
	 arg:		String str the complete namespace as a string
	 arg:		Object scope the object to append the namespace objects to. This argument is
			optional. It defaults to window
	 returns:	Object
	 example:	<script type="text/javascript">
				var ns = Df.Namespace.create('Df.xxx.yyy.zzz', window)
			</script>
	 example:	<script type="text/javascript">
				var ns = Df.Namespace.create('Df.xxx.yyy.zzz', $('xxx'))
			</script>
	*/
	create: function (str, scope) {
		Df.Namespace._ary = str.split('.');
		
		if (!scope) {
		    scope = window;
		}
		
		if (!scope[Df.Namespace._ary[0]]) {
		    scope[Df.Namespace._ary[0]] = {};
		}
		
		Df.Namespace._obj = scope[Df.Namespace._ary[0]];
		
		if (Df.Namespace._ary[1]) {
		    Df.Namespace._next(1);
		}
		
		return Df.Namespace._obj;
	},
	
	/*
	 ref:		Df.Namespace.exists
	 note:		checks for the existance of a namespace
	 type:		Static Method
	 returns:	Boolean
	 arg:		String str the complete namespace as a string
	 arg:		Object scope of the namespace object. This argument is
			optional. It defaults to window
	 example:	<script type="text/javascript">
				if(Df.Namespace.exists('Df.xxx.yyy.zzz')
			</script>
	*/
	exists: function (str, scope) {
		Df.Namespace._ary = str.split('.');
		Df.Namespace._exists = false;
		
		if (!scope) {
		    scope = window;
		}
		
		if (!scope[Df.Namespace._ary[0]]) {
		    scope[Df.Namespace._ary[0]] = {};
		}
		
		Df.Namespace._obj = scope[Df.Namespace._ary[0]];
		
		if (Df.Namespace._ary[1]) {
		    Df.Namespace._exists = true;
		    Df.Namespace._checkNext(1);
		} else {
		    Df.Namespace._exists = false;
		}
		
		return Df.Namespace._exists;
	},
	
	_next: function (i) {
		if (!Df.Namespace._obj[Df.Namespace._ary[i]]) {
		    Df.Namespace._obj[Df.Namespace._ary[i]] = {};
		}
		
		Df.Namespace._obj = Df.Namespace._obj[Df.Namespace._ary[i]];
		
		if (Df.Namespace._ary[i + 1]) {
		    Df.Namespace._next(i + 1);
		}
	},
	
	_checkNext: function (i) {
		if (Df.Namespace._obj[Df.Namespace._ary[i]]) {
			Df.Namespace._obj = Df.Namespace._obj[Df.Namespace._ary[i]];
			if (Df.Namespace._ary[i + 1]) {
				Df.Namespace._checkNext(i + 1);
			} else {
				Df.Namespace._exists = true;
			}
		} else {
			Df.Namespace._exists = false;
		}
	}
}

/*
 ref:		Df.Base
 note:		Creates a custom event Object and parameters
 note:		Intended to by used on non dom based objects
 returns:	Df.Base
 type:		Class
 example:	<script type="text/javascript">
			var e = new Df.Base()
		</script>
*/
Df.Base = Class.create({
	initialize: function() {
		
		/*
		 ref:		Df.Base.instances
		 type:		Static Method
		 returns:	Array
		 note:		returns an array of all class instances of Class Type
		 example:	<script type="text/javascript">
					if(Df.Base.instances){
						Df.Base.instances.each(function(v){
							alert(v.constructor)
						})
					}
				</script>
		*/
		if(this.constructor.instances){
		}else{
			this.constructor.instances = $A([])
		}
		this.constructor.instances.push(this)
		
		this.events = {};
		
		this.pars = {};
		
		return this;	
	},
	
	/*
	 ref:		Df.Base.registerEvent
	 note:		registers a new event type.
	 returns:	Df.Base
	 type:		Method
	 arg:		*String name the name of the custom event
	 example:	<script type="text/javascript">
				var e = new Df.Base().register(':set', ':get', ':delete')
			</script>
	*/
	registerEvent: function () {
	    for (var i = 0; i < arguments.length; i++ ) {
		this.events[arguments[i]] = [];
	    }
	    return this;
	},
	
	/*
	 ref:		Df.Base.unregisterEvent
	 note:		unregisters a new event type.
	 note:		this will also remove all observers
	 returns:	Df.Base
	 type:		Method
	 arg:		*String name the name of the custom event
	 example:	<script type="text/javascript">
				var e = new Df.Base().unregister(':set', ':get', ':delete')
			</script>
	*/
	unregisterEvent: function () {
	    for (var i = 0; i < arguments.length; i++ ) {
		if (this.events[arguments[i]]) {
			delete this.events[arguments[i]];
		}
	    }
	    return this;
	},
	
	/*
	 ref:		Df.Base.observe
	 note:		registers observer functions on an event type.
	 note:		the event types are scoped to the object that initialized the event object
	 returns:	Df.Base
	 type:		Method
	 arg:		String onx the name of the custom event to listen for
	 arg:		Function fn the function that runs on dispatch of the event
	 example:	<script type="text/javascript">
				var e = new Df.Base().register(':set', ':get', ':delete')
				
				e.observe(':set', function(e){
					alert(e.memo)
				})
			</script>
	 example:	<script type="text/javascript">
				var event = new Df.Base().register(':set', ':get', ':delete')
				
				var Df.Test = class.Create({
					initialize: function(){
						event.observe(':set', this.meth1.bind(this))
					},
					
					meth1: function(e){
						alert(e.memo)
						alert(this)
					}
				});
				
			</script>
	*/
	observe: function (onx, fn) {
		if (this.events[onx]) {
		} else {
			this.registerEvent(onx);
		}
		this.events[onx].push(fn);
		return this;
	},
	
	/*
	 ref:		Df.Base.stopObserving
	 note:		unregisters observer functions on an event type.
	 note:		the event types are scoped to the object that initialized the event object
	 note:		parameter references to binded functions make unobserving posiable
	 returns:	Df.Base
	 type:		Method
	 arg:		String onx the name of the custom event
	 arg:		Function fn the function that is to be removed
	 example:	<script type="text/javascript">
				var event = new Df.Base().register(':set', ':get', ':delete')
				
				var Df.Test = class.Create({
					initialize: function(){
						this._meth1 = this.meth1.bind(this)
						
						event.observe(':set', this._meth1)
						
						event.stopObserving(':set', this._meth1)
					},
					
					meth1: function(e){
						alert(e.memo)
						alert(this)
					}
				});
				
			</script>
	*/
	stopObserving: function (onx ,fn) {
		for (var i = 0; i < this.events[onx].length; i += 1) {
			if (this.events[onx][i] === fn) {
				this.events[onx].splice(i, 1);
			}
		}
		return this;
	},

	/*
	 ref:		Df.Base.fire
	 note:		fires custom events.
	 returns:	Df.Base
	 type:		Method
	 arg:		String onx the name of the custom event
	 arg:		Object memo object to send to the listener functions
	 example:	<script type="text/javascript">
				var event = new Df.Base().register(':set', ':get', ':delete')
				
				var Df.Test = class.Create({
					initialize: function(){
						this._meth1 = this.meth1.bind(this)
						event.observe(':set', this._meth1)
					},
					
					meth1: function(e){
						alert(e.memo)
						alert(this)
					}
				});
				
				var test = new Df.Test()
				
				event.fire(':set')
				
			</script>
	*/
	fire: function (onx, memo) {
		if(this.events[onx]){
			for (var i = 0; i < this.events[onx].length; i += 1) {
				this.events[onx][i]({target: this, memo: memo});
			}
		}
		return this;
	},
	
	/*
	 ref:		Df.Base.setPars
	 note:		Overrides and or adds parameters to the parameters object
	 type:		Method
	 returns:	Df.Base
	 arg:		Object pars the parameters object
	 example:	<script type="text/javascript">
				var base = new Df.Base().setPars({xxx:"yyy"})
			</script>
	*/
	setPars: function(pars){
		if(pars){
			Object.extend( this.pars, pars);
		}
		return this;
	}
});

/*
 ref:		Df.Ui
 type:		Class
 note:		Base class for instance based classes that are build on a ui object
 event:		this.element :set fires when the set method is complete
 event:		this.element :show fires when the elements is told to show itself
 event:		this.element :shown fires when the element is finished its show process
 event:		this.element :hide fires when the elements is told to hide itself
 event:		this.element :hidden fires when the element is finished its hide process
 arg:		String|Element element an extended dom node or dom node id string
 extends:	Df.Base
 example:	<script type="text/javascript">
			var element = new Df.Ui('xxx')
		</script>
*/
Df.Ui = Class.create(Df.Base, {
	initialize: function($super, element) {
		
		$super(element)
		
		this.setPars({
			
			/*
			 ref:		Df.Ui.pars.showClassName
			 type:		Parameter
			 returns:	String
			 default:	df_element_show
			 note:		classname to assign during the show process of the element
			*/
			showClassName: 'df_element_show',
			
			/*
			 ref:		Df.Ui.pars.hideClassName
			 type:		Parameter
			 returns:	String
			 default:	df_element_hide
			 note:		classname to assign during the hide process of the element
			*/
			hideClassName: 'df_element_hide',
			
			/*
			 ref:		Df.Ui.pars.animate
			 type:		Parameter
			 returns:	Boolean|Df.Animate.pars
			 default:	false
			 note:		pars object you want to initialize Df.Animate with
			 example:	<script type="text/javascript">
						var el = new Df.Ui($('el')).set({
							animate: {
								opacity:0.35,
								time: 250
							}
						});
					</script>
			*/
			animate: false,
			
			/*
			 ref:		Df.Ui.pars.drag
			 type:		Parameter
			 returns:	Boolean|Df.Drag.pars
			 default:	false
			 note:		pars object you want to initialize Df.Drag with
			 example:	<script type="text/javascript">
						var el = new Df.Ui($('el')).set({
							animate: {
								opacity:0.35,
								time: 250
							},
							drag: {}
						});
					</script>
			*/
			drag: false,
			
			/*
			 ref:		Df.Ui.pars.resize
			 type:		Parameter
			 returns:	Boolean|Df.Resize.pars
			 default:	false
			 note:		pars object you want to initialize Df.Drag with
			 example:	<script type="text/javascript">
						var el = new Df.Ui($('el')).set({
							animate: {
								opacity:0.35,
								time: 250
							},
							resize:{}
						});
					</script>
			*/
			resize: false,
			
			/*
			 ref:		Df.Ui.pars.resize
			 type:		Parameter
			 returns:	Boolean|Df.Scroll.pars
			 default:	false
			 note:		pars object you want to initialize Df.Scroll with
			 example:	<script type="text/javascript">
						var el = new Df.Ui($('el')).set({
							animate: {
								opacity:0.35,
								time: 250
							},
							scroll:{}
						});
					</script>
			*/
			scroll: false,
			
			/*
			 ref:		Df.Ui.pars.iframe
			 type:		Parameter
			 returns:	Boolean
			 default:	false
			 note:		if set to true an iframe will be prepended to the element on show
					of the element.
			 note:		It will be hiddden on hide of the element
			*/
			iframe: false,
			
			/*
			 ref:		Df.Ui.pars.onSet
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onSet: false,
			
			/*
			 ref:		Df.Ui.pars.onHide
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument 
			*/
			onHide: false,
			
			/*
			 ref:		Df.Ui.pars.onShow
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument 
			*/
			onShow: false,
			
			/*
			 ref:		Df.Ui.pars.onHidden
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onHidden: false,
			
			/*
			 ref:		Df.Ui.pars.onShown
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onShown: false
		});
		
		this.element = this.createOrGetElementReference(element);
		
		this.togglePanes = []
		
		this.status = false
		this.displayStatus = false
		
		this._animationCompleteEvent = this.animationCompleteEvent.bindAsEventListener(this)
		
		return this;
	},

	/*
	 ref:		Df.Ui.createOrGetElementReference
	 type:		Method
	 arg:		element String|Node optional
	 returns:	Node
	*/	
	createOrGetElementReference: function(element){
		if(element){
			try{
				return $(element)
			} catch (e) {
				var el = document.createElement('div')
				el.id = element
				return $(el)
			}	
		} else {
			return $(document.createElement('div'))
		}
	},	
		
	
	/*
	 ref:		Df.Ui.set
	 type:		Method
	 note:		sets the instance to use the given parameters
	 note:		required the set the ui object into action
	 note:		the second part of the constructor
	 fire:		this.element :set
	 arg:		Df.Ui.pars pars
	 returns:	Df.Ui
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .6,
						ease: Df.Transitions.cubicOut
					},
					drag: {}
				)
			</script>
	*/
	set: function(pars){
		
		this.setPars(pars);
		
		if(this.pars.animate){
			this.animate = new Df.Animate(this.getElement());
			Object.extend(this.animate.pars, this.pars.animate);
			
			this.animate.getElement().observe(':complete', this._animationCompleteEvent);
			
		} else {
			this.animate = false
		}
		
		if(this.pars.drag){
			this.drag = new Df.Drag(this.getElement());
			Object.extend(this.drag.pars, this.pars.drag);
			this.drag.set(this.drag.pars).enable()
		}else {
			this.drag = false
		}
		
		if(this.pars.resize){
			this.resize = new Df.Resize(this.getElement());
			Object.extend(this.resize.pars, this.pars.resize);
			this.resize.set(this.resize.pars).enable()
		}else {
			this.resize = false
		}
		
		if(this.pars.scroll){
			this.scroll = new Df.Scroll(this.getElement());
			Object.extend(this.scroll.pars, this.pars.scroll);
			this.scroll.set(this.scroll.pars)
		}else {
			this.scroll = false
		}
		
		try{
			this.getElement().fire(':set')
		} catch (e){
			
		}
		
		if(this.pars.onSet){
			this.pars.onSet(this)
		}
		
		return this
	},

	/*
	 ref:		Df.Ui.getElement
	 type:		Method
	 note:		gets the native element that was used to create the instance of Df.Ui
	 returns:	Element
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set()
				var nativeNode = element.getElement()
			</script>
	*/
	getElement: function() {
		return this.element;
	},

	/*
	 ref:		Df.Ui.getPointerX
	 type:		Method
	 note:		gets the mouse X position relative to the element 
	 returns:	Number
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set()
				
				element.getElement().observe('mousemove', function(e){
					alert(element.getPointerX())
				});
			</script>
	*/
	getPointerX: function(e) {
		return Event.pointerX(e) - this.getElement().cumulativeOffset().left 
	},

	/*
	 ref:		Df.Ui.getPointerY
	 type:		Method
	 note:		gets the mouse Y position relative to the element 
	 returns:	Number
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set()
				
				element.getElement().observe('mousemove', function(e){
					alert(element.getPointerY())
				});
			</script>
	*/
	getPointerY: function(e) {
		return Event.pointerY(e) - this.getElement().cumulativeOffset().top 
	},
	
	/*
	 ref:		Df.Ui.togglePane
	 type:		Method
	 delegate:	Df.TogglePane
	 arg:		Element|String element
	 arg:		Df.TogglePane.pars pars appends this as the controller par
	 note:		Creates an instance of Df.TogglePane with this as the controller
	 returns:	Df.TogglePane
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set()
				
				var tp = element.togglePane($('yyy'), {
					animate: {
						height: 40,
						width:40
					},
					toggleShowDelay: 100
				});
			</script>
	*/
	togglePane: function(element, pars){
		Object.extend(pars, {controller: this})
		var togglePane = new Df.TogglePane(element).set(pars)
		this.togglePanes.push(togglePane)
		return togglePane;
	},
	
	animationCompleteEvent: function(e){
		e.stop()
		if(e.memo.pointer == 0){
			this._finishHide(e)
		}
		else if(e.memo.pointer == 1) {
			this._finishShow(e)
		}
	},
	
	/*
	 ref:		Df.Ui.show
	 type:		Method
	 note:		Shows the element by running its animation and assigning showClassName parameter
	 note:		show sets this.status = true and then calls this.showByStatus
	 returns:	Df.Ui
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()
			</script>
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					showClassName: 'displayNow'
				).show()
			</script>
	*/
	show: function(e){
		this.status = true
		this.showByStatus(e)
		return this
	},
	
	/*
	 ref:		Df.Ui.showByStatus
	 type:		Method
	 note:		Shows the element by running its animation and assigning showClassName parameter
	 note:		showByStatus checks to make sure that this.status is true and
			this.displayStatus is false and then calls this.showActions
	 returns:	Df.Ui
	*/
	showByStatus: function(e){
		if( this.status && !this.displayStatus ){
			this.showActions(e)
		}
		return this;
	},
	
	/*
	 ref:		Df.Ui.showActions
	 type:		Method
	 note:		Shows the element by running its animation and assigning showClassName parameter
	 note:		Shows the element only if it is not already being shown
	 fire:		this.element :show
	 fire:		this.element :shown
	 returns:	Df.Ui
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).showActions()
			</script>
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					showClassName: 'displayNow'
				).showActions()
			</script>
	*/
	showActions: function(e){
		this.status = true
		
		if(!this.displayStatus ){
			
			this.displayStatus = true
			
			this.element.fire(':show');
			
			if(this.pars.onShow){
				this.pars.onShow(this)
			}
				
			if(this.pars.showClassName) {
				this.getElement().addClassName(this.pars.showClassName)
			}
			
			if(this.pars.hideClassName){
				this.getElement().removeClassName(this.pars.hideClassName)
			}
			
			if (this.animate) {
				if (this.animate.getHistoryCount() == 0) {
					this.animate.run();	
				} else {
					this.animate.last();
				}
			} else {
				this._finishShow(e)
			}
		}
		return this
	},
	
	_finishShow: function(e){
		
		if((Df.browser()).ie6 && this.pars.iframe){
			this.showIframe();
		}
		
		this.element.fire(':shown');
		
		if(this.pars.onShown){
			this.pars.onShown(this)
		}
	},
	
	/*
	 ref:		Df.Ui.hide
	 type:		Method
	 note:		Hides the element by reverting its animation and assigning hideClassName parameter
	 note:		hide sets this.status = false and then calls this.hideByStatus
	 returns:	Df.Ui
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()
				
				element.getElement().observe('click', element.hide)
			</script>
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					showClassName: 'displayNow'
				).show()
				
				element.getElement().observe('click', element.hide)
			</script>
	*/
	hide: function(e){
		this.status = false
		this.hideByStatus(e)
	},
	
	/*
	 ref:		Df.Ui.hideByStatus
	 type:		Method
	 note:		Hides the element by reverting its animation and assigning hideClassName parameter
	 note:		checks to make sure that this.status is false and
			this.displayStatus is true and then calls this.hideActions
	 returns:	Df.Ui
	*/
	hideByStatus: function(e){
		if(!this.status && this.displayStatus){
			this.hideActions(e)
		}
		return this 
	},
	
	/*
	 ref:		Df.Ui.hideActions
	 type:		Method
	 note:		Hides the element by reverting its animation and assigning hideClassName parameter
	 note:		hideActions only runs if this.displayStatus is true
	 fire:		this.element :hide
	 fire:		this.element :hidden
	 returns:	Df.Ui
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()
				
				element.getElement().observe('click', element.hideActions)
			</script>
	 example:	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					showClassName: 'displayNow'
				).show()
				
				element.getElement().observe('click', element.hideActions)
			</script>
	*/
	hideActions: function(e){
		this.status = false
		
		if(this.displayStatus ){
			
			this.displayStatus = false
			
			this.element.fire(':hide');
			
			if(this.pars.onHide){
				this.pars.onHide(this)
			}
			
			if( this.animate && this.animate.getHistoryCount() > 0){
				this.animate.first();
			}else{
				this._finishHide(e)
			}
		}
		return this
	},
	
	_finishHide: function(e){
			
		if(this.pars.hideClassName) {
			this.getElement().addClassName(this.pars.hideClassName)
			
		}
		if(this.pars.showClassName){
			this.getElement().removeClassName(this.pars.showClassName)
		}
		
		if((Df.browser()).ie6 && this.pars.iframe){
			this.hideIframe();
		}
		
		this.element.fire(':hidden');
		
		if(this.pars.onHidden){
			this.pars.onHidden(this)
		}
	},
	
	/*
	 ref:		Df.Ui.showIframe
	 type:		Method
	 note:		creates or displays blocking iframe for ie6
	 note:		attempts to size and position the frame to the element
	 note:		prepends the iframe to the element
	 note:		called by this.showActions
	 returns:	Df.Ui
	*/
	showIframe: function(){
		if(this.iframe){
			this.iframe.style.display = "block";
		}else{
			var html = '<iframe class="ie6BlockerFrame" style="display:block; left:'+ this.element.getStyle('left') +'; position:absolute; top:'+ this.element.getStyle('top') +'; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" src="javascript:void(0);" frameborder="0" height="'+ parseInt( this.element.offsetHeight) +'px" width="'+ parseInt( this.element.offsetWidth) +'px"></iframe>'
			this.element.insert({before: html});
			this.iframe = this.element.previous('iframe')
		}
		return this
	},

	/*
	 ref:		Df.Ui.hideIframe
	 type:		Method
	 note:		hides the iframe
	 note:		called by this.hideActions
	 returns:	Df.Ui
	*/
	hideIframe: function(){
		if(this.iframe){
			this.iframe.style.display = "none";
		}
		return this
	}
});

/*
 ref:		Df.UiCollection
 type:		Class
 returns:	Df.UiCollection
 extends:	Df.Ui
 arg:		String|Element element an extended dom node or dom node id string
 note:		Base class for instance based classes that are collections of ui objects
*/
Df.UiCollection = Class.create(Df.Ui, {
	initialize: function($super, element){
		$super(element)
		
		this.setPars({
			/*
			 ref:		Df.UiCollection.pars.collection
			 type:		Parameter
			 returns:	Df.UiCollection
			 note:		passed to collection items as a reference back to the collection
			*/
			collection: this
		});
		
		this.items = [];
		
		return this
	},
	
	/*
	 ref:		Df.UiCollection.set
	 type:		Method
	 arg:		Df.Ui.pars pars
	 returns:	Df.UiCollection
	 note:		builds the collection of Df.Ui and sets the parameters object
	*/
	set: function($super, pars){
		$super(pars);
		
		this.buildItems();
		
		return this;
	},

	/*
	 ref:		Df.UiCollection.getItems
	 type:		Method
	 returns:	Array
	 note:		gets all the items of the collection
	*/
	getItems: function () {
		return this.items;
	},

	/*
	 ref:		Df.UiCollection.getItem
	 type:		Method
	 returns:	Df.Ui
	 arg:		Number i index of the items array to return
	 note:		gets an item of the collection
	*/
	getItem: function (i) {
		return this.items[i];
	},

	/*
	 ref:		Df.UiCollection.showOnlyItem
	 type:		Method
	 returns:	Df.Ui
	 arg:		Number|Df.Ui type index of the items array or ui instance to display
	 note:		shows an ui instance of the collection
	 note:		all other ui instances with be hidden
	*/
	showOnlyItem: function (type) { //index or instance
		var openItems = this.getShownItems()
		for(var i=0; i < openItems.length; i++){
			openItems[i].hide();
		}
		return this.showItem(type)
	},

	/*
	 ref:		Df.UiCollection.getShownItems
	 type:		Method
	 returns:	Array
	 note:		gets an array of all items in the collection that have this.displayStatus set to true
	*/
	getShownItems: function () {
		var items = []
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].displayStatus){
				items.push(this.items[i]);
			}
		}
		return items
	},

	/*
	 ref:		Df.UiCollection.getHiddenItems
	 type:		Method
	 returns:	Array
	 note:		gets an array of all items in the collection that have this.displayStatus set to false
	*/
	getHiddenItems: function () {
		var items = []
		for(var i=0; i<this.items.length; i++){
			if(!this.items[i].displayStatus){
				items.push(this.items[i]);
			}
		}
		return items
	},
	
	/*
	 ref:		Df.UiCollection.getInstanceItemIndex
	 type:		Method
	 returns:	Number
	 arg:		Df.Ui
	 note:		gets the index in the collection for an item instance
	*/
	getInstanceItemIndex: function(ins){
		var index = false
		loopy:
		for(var i=0; i<this.items.length; i++){
			if( this.items[i] === ins){
				index = i
				break loopy
			}
		}
		return index
	},
	
	/*
	 ref:		Df.UiCollection.showItem
	 type:		Method
	 returns:	Df.Ui
	 arg:		Df.Ui|Number type index of the items array or ui instance to display
	 note:		shows an item in the collection
	*/
	showItem: function (type) { //index or instance
		if(type.constructor == Number){
			return this.items[type].show();
		}else{
			return type.show();
		}
	},
	
	/*
	 ref:		Df.UiCollection.showItems
	 type:		Method
	 returns:	Df.UiCollection
	 note:		shows all the items of the collection
	*/
	showItems: function () {
		for(var i=0; i<this.items.length; i++){
			if( !this.items[i].displayStatus){
				this.items[i].show();
			}
		}
		return this
	},
	
	/*
	 ref:		Df.UiCollection.hideItem
	 type:		Method
	 returns:	Df.Ui
	 arg:		Number index index of the items array to hide
	 note:		hides an item of the collection
	*/
	hideItem: function (index) {
		return this.items[index].hide();
	},
	
	/*
	 ref:		Df.UiCollection.hideItems
	 type:		Method
	 returns:	Df.UiCollection
	 note:		hides all the items of the collection
	*/
	hideItems: function(){
		for(var i=0; i<this.items.length; i++){
			if( this.items[i].displayStatus){
				this.items[i].hide();
			}
		}
		return this;
	},
	
	/*
	 ref:		Df.UiCollection.toggleItem
	 type:		Method
	 returns:	Df.UiCollection
	 arg:		Number index index of the items array to toggle
	 note:		toggles show or hide of an item of the collection
	*/
	toggleItem: function (index) {
		
		if(this.getItem(index).displayStatus){
			this.hideItem(index)
		}else{
			this.showItem(index)
		}
		return this
	},
	
	/*
	 ref:		Df.UiCollection.toggleItems
	 type:		Method
	 returns:	Df.UiCollection
	 note:		toggles the display of all items in the collection
	*/
	toggleItems: function () {
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].displayStatus){
				this.items[i].hide()
			}else{
				this.items[i].show()
			}
		}
		return this
	},
	
	/*
	 ref:		Df.UiCollection.buildItems
	 type:		Method
	 returns:	Df.UiCollection
	 note:		method used to build the items of the collection
	 note:		intended to be overridden
	 example:	<script type="text/javascript">
				var myCollection = Class.create(Df.UiCollection, {
					buildItems: function(){
						var elem = this.element.select('div.includeMe');
		
						for(var i=0; i<elem.length; i++){
							this.items.push( new Df.Ui( $(elem[i]) ).set(this.pars) );	
						}	
					}
				});
				
				var myIns = new myCollection($('xxx')).set({
					animate: {
						height: 200
					}
				});
			</script>
	*/
	buildItems: function(){
		
		var elem = this.element.immediateDescendants();
		
		for(var i=0; i<elem.length; i++){
			this.items.push( new Df.Ui( $(elem[i]) ).set(this.pars) );	
		}
	}
});

/*
 ref:		Df.TogglePane
 extends:	Df.Ui
 returns:	Df.TogglePane
 demo:		../demos/toggleElements.html simple example showing how easy it is to control elements
		through events and animation
 type:		Class
 arg:		string|Element element an extended dom node or dom node id string
 note:		Base class for instance based classes that panes contolled visually by another ui object
 example:	<script type="text/javascript">
			var xxx = new Df.TogglePane('yyy').set({
				controller: new Df.Ui('zzz').set(),
				animate: {
					width: 500,
					time: 1500
				}
			});
		</script>
*/
Df.TogglePane = Class.create(Df.Ui, {
	initialize: function($super, element) {
		$super(element)
		
		this.setPars({
			/*
			 ref:		Df.TogglePane.pars.toggleShowDelay
			 type:		Parameter
			 returns:	Number
			 default:	250
			 note:		milliseconds to pause before showing element
			 hint:		Only available for hover event type
			 example:	<script type="text/javascript">
						var xxx = new Df.TogglePane('yyy').set({
							controller: new Df.Ui('zzz').set(),
							animate: {
								width: 500,
								time: 1500
							},
							toggleShowDelay: 1500
						});
					</script>
			*/
			toggleShowDelay: 250,
			
			/*
			 ref:		Df.TogglePane.pars.toggleHideDelay
			 type:		Parameter
			 default:	250
			 returns:	Number
			 note:		milliseconds to pause before hiding element
			 hint:		Only available for hover event type
			 example:	<script type="text/javascript">
						var xxx = new Df.TogglePane('yyy').set({
							controller: new Df.Ui('zzz').set(),
							animate: {
								width: 500,
								time: 1500
							},
							toggleHideDelay: 1500
						});
					</script>
			*/
			toggleHideDelay: 250,
			
			/*
			 ref:		Df.TogglePane.pars.activeControllerClassName
			 type:		Parameter
			 returns:	String
			 default:	activeController
			 note:		class assigned to the controller element on show of the toggle element
			*/
			activeControllerClassName: 'activeController',
			
			/*
			 ref:		Df.TogglePane.pars.treatAsMenu
			 type:		Parameter
			 default:	true
			 returns:	Boolean
			 hint:		only available for hover event type
			 note:		allows you to move your mouse onto the toggle element and keep it displayed
			 note:		used for ui types like tips and dropnavs
			*/
			treatAsMenu: true,
			
			/*
			 ref:		Df.TogglePane.pars.controller
			 type:		Parameter
			 default:	false
			 returns:	Df.Ui
			 hint:		this parameter must be set
			 note:		the controlling ui element for the showing and hiding of the
					toggle element
			*/
			controller: false,
			
			/*
			 ref:		Df.TogglePane.pars.eventType
			 type:		Parameter
			 default:	hover
			 choice:	hover
			 choice:	click
			 returns:	String
			 hint:		this parameter must be set
			 note:		the event type that triggers showing and hiding the toggle element
			*/
			eventType: 'hover' //hover|click
		});
		
		this._controllerClickObserver = this.controllerClickObserver.bindAsEventListener(this)
		this._controllerHoverOverObserver = this.controllerHoverOverObserver.bindAsEventListener(this)
		this._controllerHoverOutObserver = this.controllerHoverOutObserver.bindAsEventListener(this)
		this._paneHoverOverObserver = this.paneHoverOverObserver.bindAsEventListener(this)
		this._paneHoverOutObserver = this.paneHoverOutObserver.bindAsEventListener(this)
		
		return this;
	},
	
	/*
	 ref:		Df.TogglePane.set
	 type:		Method
	 arg:		Df.TogglePane.pars pars
	 returns:	Df.TogglePane
	 note:		sets the event handlers on the controller and toggle element
	*/
	set: function($super, pars) {
		$super(pars)
		
		this.eventType()
		
		this.element.observe(':show', this.addActiveTitleState.bind(this));
		
		this.element.observe(':hidden', this.removeActiveTitleState.bind(this));
		
		return this;
	},
	
	/*
	 ref:		Df.TogglePane.eventType
	 type:		Method
	 returns:	Df.TogglePane
	 arg:		Df.TogglePane.pars.eventType type can be click, hover, false
	 note:		sets or changes the event type handlers
	*/
	eventType: function(type) {
		if(type === this.pars.eventType){
			return this
		} else {
			if(type === false){
				this.pars.eventType = false
			} else if( type ) {
				this.pars.eventType = type
			}
			
			if (this.pars.eventType == 'hover') {
				this.removeClickEvent()
				this.addHoverEvent()
			}
			else if (this.pars.eventType == 'click') {
				this.removeHoverEvent()
				this.addClickEvent()
			}
			else if (this.pars.eventType === false) {
				this.removeHoverEvent()
				this.removeClickEvent()
			}
			return this	
		}
	},
	
	/*
	 ref:		Df.TogglePane.addHoverEvent
	 type:		Method
	 note:		sets up the event handlers for hover
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	addHoverEvent: function(){
		this.pars.controller.getElement().observe(
			'mouseover',
			this._controllerHoverOverObserver
		);
		
		this.pars.controller.getElement().observe(
			'mouseout',
			this._controllerHoverOutObserver
		);
		
		if (this.pars.treatAsMenu) {
			this.getElement().observe(
				'mouseover',
				this._paneHoverOverObserver
			);
			
			this.getElement().observe(
				'mouseout',
				this._paneHoverOutObserver
			);
		}
	},
	
	/*
	 ref:		Df.TogglePane.removeHoverEvent
	 type:		Method
	 note:		removes the event handlers for hover
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	removeHoverEvent: function(){
		this.pars.controller.getElement().stopObserving(
			'mouseover',
			this._controllerHoverOverObserver
		);
		
		this.pars.controller.getElement().stopObserving(
			'mouseout',
			this._controllerHoverOutObserver
		);
		
		if (this.pars.treatAsMenu) {
			this.getElement().stopObserving(
				'mouseover',
				this._paneHoverOverObserver
			);
			
			this.getElement().stopObserving(
				'mouseout',
				this._paneHoverOutObserver
			);
		}	
	},
	
	/*
	 ref:		Df.TogglePane.addClickEvent
	 type:		Method
	 note:		sets up the event handlers for click
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	addClickEvent: function(){
		this.pars.controller.getElement().observe(
			'click',
			this._controllerClickObserver
		);
	},
	
	/*
	 ref:		Df.TogglePane.removeClickEvent
	 type:		Method
	 note:		removes the event handlers for click
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	removeClickEvent: function(){
		this.pars.controller.getElement().stopObserving(
			'click',
			this._controllerClickObserver
		);
	},
	
	/*
	 ref:		Df.TogglePane.controllerClickObserver
	 type:		Method
	 note:		adds the event handlers for click on the controller element
	 note:		called as part of addClickEvent
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	controllerClickObserver: function(e){
		Event.stop(e);
		if(this.status && this.displayStatus){
			this.hideClickObserver(e)
		}
		else if (!this.status && !this.displayStatus) {
			this.showClickObserver(e)
		}
	},
	
	/*
	 ref:		Df.TogglePane.hideClickObserver
	 type:		Method
	 note:		adds the event handlers for click on the element
	 note:		called as part of controllerClickObserver
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	hideClickObserver: function(e){
		this.hide(e)
	},
	
	/*
	 ref:		Df.TogglePane.showClickObserver
	 type:		Method
	 note:		adds the event handlers for click on the element
	 note:		called as part of controllerClickObserver
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	showClickObserver: function(e){
		this.show(e)
	},
	
	/*
	 ref:		Df.TogglePane.controllerHoverOverObserver
	 type:		Method
	 note:		adds the event handlers for hover on the controller element
	 note:		called as part of addHoverEvent
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	controllerHoverOverObserver: function(e){
		Event.stop(e);
		this.status = true
		setTimeout( this.showByStatus.bind(this), this.pars.toggleShowDelay)
	},
	
	/*
	 ref:		Df.TogglePane.controllerHoverOutObserver
	 type:		Method
	 note:		adds the event handlers for hover on the controller element
	 note:		called as part of addHoverEvent
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	controllerHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		setTimeout( this.hideByStatus.bind(this), this.pars.toggleHideDelay)
	},
	
	/*
	 ref:		Df.TogglePane.paneHoverOverObserver
	 type:		Method
	 note:		adds the event handlers for hover on the toggle element
	 note:		called as part of addHoverEvent
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	paneHoverOverObserver: function(e){
		Event.stop(e);
		this.status = true
	},
	
	/*
	 ref:		Df.TogglePane.paneHoverOutObserver
	 type:		Method
	 note:		adds the event handlers for hover on the toggle element
	 note:		called as part of addHoverEvent
	 note:		not intended to use used directly
	 note:		intended to be overriden
	*/
	paneHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		setTimeout( this.hideByStatus.bind(this), this.pars.toggleHideDelay)
	},
	
	/*
	 ref:		Df.TogglePane.removeActiveTitleState
	 type:		Method
	 returns:	Df.TogglePane
	 note:		removes the activeControllerClassName parameter to the controller element on hide
	*/
	removeActiveTitleState: function(e){
		Event.stop(e)
		if( this.pars.activeControllerClassName){
			this.pars.controller.element.removeClassName( this.pars.activeControllerClassName );
		}
		return this
	},
	
	/*
	 ref:		Df.TogglePane.addActiveTitleState
	 type:		Method
	 returns:	Df.TogglePane
	 note:		adds the activeControllerClassName parameter to the controller element on show
	*/
	addActiveTitleState: function(e){
		Event.stop(e)
		if( this.pars.activeControllerClassName){
			this.pars.controller.element.addClassName( this.pars.activeControllerClassName );
		}
		return this
	}
});

/*
 ref:		Df.Cookie
 extends:	Df.Base
 returns:	Df.Cookie
 demo:		../demos/cookie.html create, show, modify, delete cookies 
 note:		Makes document.cookie object easy to work with
 type:		Class
 event:		this :get
 event:		this :set
 event:		this :delete
*/
Df.Cookie = Class.create(Df.Base, {
	initialize: function($super, element) {
		$super(element)
		
		this.setPars({
			
			/*
			 ref:		Df.Cookie.pars.name
			 type:		Parameter
			 returns:	String
			 default:	df
			 note:		the name of the cookie
			*/
			name: 'df',
			
			/*
			 ref:		Df.Cookie.pars.path
			 type:		Parameter
			 returns:	Boolean|String
			 default:	false
			 note:		the path of the cookie
			*/
			path: false,
			
			/*
			 ref:		Df.Cookie.pars.domain
			 type:		Parameter
			 returns:	Boolean|String
			 default:	false
			 note:		the domain of the cookie
			*/
			domain:false,
			
			/*
			 ref:		Df.Cookie.pars.expires
			 type:		Parameter
			 returns:	Boolean|String
			 default:	false
			 note:		the expiration date of the cookie
			*/
			expires:false,
			
			/*
			 ref:		Df.Cookie.pars.data
			 type:		Parameter
			 returns:	Boolean|String|Object|Array|Number
			 default:	false
			 note:		the date of the cookie
			*/
			data: false,
			
			/*
			 ref:		Df.Cookie.pars.onSet
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onSet: false,
			
			/*
			 ref:		Df.Cookie.pars.onGet
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onGet: false,
			
			/*
			 ref:		Df.Cookie.pars.onDelete
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onDelete: false
		});
		
		return this;
	},
	
	/*
	 ref:		Df.Cookie.setCookie
	 type:		Method
	 returns:	Df.Cookie
	 arg:		Df.Cookie.pars pars
	 fire:		this :set sends cookie as a memo
	 note:		writes the cookie
	*/
	setCookie: function(pars) {
		
		this.setPars(pars);
		
		var serial = false;
		
		if (this.pars.data.constructor == Array || this.pars.data.constructor == Object) {
			serial = escape(Object.toJSON(this.pars.data));
		} else {
			serial = escape(this.pars.data);
		}
		
		var value = this.pars.name + '=' + serial + ';'
		if (this.pars.expires) {
			value += ' expires=' + this.pars.expires + ';'
		}
		if (this.pars.path) {
			value += ' path=' + this.pars.path + ';'
		}
		if (this.pars.domain) {
			value += ' domain=' + this.pars.domain + ';'
		}
		document.cookie = value;
		
		this.fire(':set', {cookie: this} );
		
		if(this.pars.onSet){
			this.pars.onSet(this)
		}
		
		return this;
	},
	
	/*
	 ref:		Df.Cookie.deleteCookie
	 type:		Method
	 returns:	Df.Cookie
	 fire:		this :delete sends cookie as a memo
	 note:		deletes the cookie
	*/
	deleteCookie: function(){
		var cookie_date = new Date ( );
		cookie_date.setTime( cookie_date.getTime() - 1 );
		document.cookie = this.pars.name + "=; expires=" + cookie_date.toGMTString();
		
		this.fire(':delete', {cookie: this} );
		
		if(this.pars.onDelete){
			this.pars.onDelete(this)
		}
		
		return this;
	},
	
	/*
	 ref:		Df.Cookie.getCookie
	 type:		Method
	 returns:	Df.Cookie
	 fire:		this :get sends cookie as a memo
	 note:		returns the cookie data
	*/
	getCookie: function(){
		var result = document.cookie.match ( this.pars.name + '=(.*?)(;|$)' );
		
		if( result ){
			
			this.fire(':get', {cookie: this} );
			
			if(this.pars.onGet){
				this.pars.onGet(this)
			}
			
			try{
				return unescape(result[1]).evalJSON()
			}catch(e){
				return unescape(result[1]);
			}
		}else{
			return undefined;
		}
	}
});


/*
 ref:		Df.Scroll
 extends:	Df.Ui
 type:		Class
 returns:	Df.Scroll
 arg:		String|Element element an extended dom node or dom node id string
 event:		this.element :mousewheel
*/
Df.Scroll = Class.create(Df.Ui, {
	initialize: function($super, element) {
		$super(element)
	},
	
	/*
	 ref:		Df.Scroll.set
	 type:		Method
	 returns:	Df.Scroll
	 arg:		Df.Ui.pars pars
	 fire:		this.element :mousewheel calls mouseWheelDelta based on dom event listeners
	*/
	set: function($super, pars){
		$super(pars)
		
		this.setPars({
			/*
			 ref:		Df.Scroll.pars.onMousewheel
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the first argument
			 note:		sends event as the second argument
			*/
			onMousewheel: false
		})
		
		Event.observe( this.element, "mousewheel", function(e){
			e.stop()
			this.element.fire(':mousewheel',{delta:this.mouseWheelDelta(e)});
			
			if(this.pars.onMousewheel){
				this.pars.onMousewheel(this, e)
			}
		}.bind(this));
		
		Event.observe( this.element, "DOMMouseScroll", function(e){
			e.stop()
			this.element.fire(':mousewheel',{delta:this.mouseWheelDelta(e)});
			
			if(this.pars.onMousewheel){
				this.pars.onMousewheel(this, e)
			}
		}.bind(this));
		
		//Event.observe( this.element, "keyPress", function(e){
		//	if(e.target.){
				
		//	}
		//}.bind(this));
		
		return this;
	},
	
	/*
	 ref:		Df.Scroll.set
	 type:		Method
	 note:		attempts to create some consistancy for reading mousewheel interations
	 note:		not intended to be called directly
	*/
	mouseWheelDelta: function(e){
		var delta = 0;
		
		if (e.wheelDelta){
	
			delta = e.wheelDelta/120;
	
			if (window.opera){
				delta = -delta;
			}
		}
		else if(e.detail){
			delta = -e.detail/3;
		}
		return delta;
	}

});

// ---------------------------------------- animation classes ---------------------------------------

//Author: Robert Penner, <http://www.robertpenner.com/easing/>
//License: Easing Equations v1.5, (c) 2003 Robert Penner, all rights reserved. Open Source BSD License.

/*
 ref:		Df.Transitions
 type:		Static Class
 returns:	Object
 note:		adds a ton of Robert Penner's Easings equations
 example:	<script type="text/javascript">
			$('xxx').animate({
				padding: 600,
				ease: Df.Transitions.cubicOut
			})
		</script>
*/
Df.Transitions = {
	
	/*
	 ref:		Df.Transitions.linear
	 type:		Static Method
	 returns:	Number
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 note:		the default easing for Df.Animate
	*/
	linear: function(t, b, c, d){
		return c*t/d + b;
	},
	
	/*
	 ref:		Df.Transitions.quadIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quadIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	
	/*
	 ref:		Df.Transitions.quadOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quadOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},

	/*
	 ref:		Df.Transitions.quadInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quadInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},

	/*
	 ref:		Df.Transitions.cubicIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	cubicIn: function(t, b, c, d){
		return c*(t/=d)*t*t + b;
	},

	/*
	 ref:		Df.Transitions.cubicOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	cubicOut: function(t, b, c, d){
		return c*((t=t/d-1)*t*t + 1) + b;
	},

	/*
	 ref:		Df.Transitions.cubicInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	cubicInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},

	/*
	 ref:		Df.Transitions.quartIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quartIn: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},

	/*
	 ref:		Df.Transitions.quartOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quartOut: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},

	/*
	 ref:		Df.Transitions.quartInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quartInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},

	/*
	 ref:		Df.Transitions.quintIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quintIn: function(t, b, c, d){
		return c*(t/=d)*t*t*t*t + b;
	},

	/*
	 ref:		Df.Transitions.quintOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quintOut: function(t, b, c, d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},

	/*
	 ref:		Df.Transitions.quintInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	quintInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},

	/*
	 ref:		Df.Transitions.sineIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	sineIn: function(t, b, c, d){
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},

	/*
	 ref:		Df.Transitions.sineOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	sineOut: function(t, b, c, d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},

	/*
	 ref:		Df.Transitions.sineInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	sineInOut: function(t, b, c, d){
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},

	/*
	 ref:		Df.Transitions.expoIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	expoIn: function(t, b, c, d){
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},

	/*
	 ref:		Df.Transitions.expoOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	expoOut: function(t, b, c, d){
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},

	/*
	 ref:		Df.Transitions.expoInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	expoInOut: function(t, b, c, d){
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},

	/*
	 ref:		Df.Transitions.circIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	circIn: function(t, b, c, d){
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},

	/*
	 ref:		Df.Transitions.circOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	circOut: function(t, b, c, d){
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},

	/*
	 ref:		Df.Transitions.circInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	circInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},

	/*
	 ref:		Df.Transitions.elasticIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number a factor optional
	 arg:		Number p factor optional
	 returns:	Number
	*/
	elasticIn: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3; if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},

	/*
	 ref:		Df.Transitions.elasticOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number a factor optional
	 arg:		Number p factor optional
	 arg:		Number a factor optional
	 arg:		Number p factor optional
	 returns:	Number
	*/
	elasticOut: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3; if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},

	/*
	 ref:		Df.Transitions.elasticInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number a factor optional
	 arg:		Number p factor optional
	 returns:	Number
	*/
	elasticInOut: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d/2)==2) return b+c; if (!p) p=d*(.3*1.5); if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},

	/*
	 ref:		Df.Transitions.backIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number s factor optional
	 returns:	Number
	*/
	backIn: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},

	/*
	 ref:		Df.Transitions.backOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number s factor optional
	 returns:	Number
	*/
	backOut: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},

	/*
	 ref:		Df.Transitions.backInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 arg:		Number s factor optional
	 returns:	Number
	*/
	backInOut: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},

	/*
	 ref:		Df.Transitions.bounceIn
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	bounceIn: function(t, b, c, d){
		return c - Df.Transitions.bounceOut (d-t, 0, c, d) + b;
	},

	/*
	 ref:		Df.Transitions.bounceOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)){
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)){
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)){
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},

	/*
	 ref:		Df.Transitions.bounceInOut
	 type:		Static Method
	 arg:		Number t current iteration
	 arg:		Number b current value
	 arg:		Number c total value delta
	 arg:		Number d total iterations
	 returns:	Number
	*/
	bounceInOut: function(t, b, c, d){
		if (t < d/2) return Df.Transitions.bounceIn(t*2, 0, c, d) * .5 + b;
		return Df.Transitions.bounceOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
	}

};

/*
 ref:		Df.Animate
 extends:	Df.Ui
 note:		give an element a convenient way to change its visual properties in a stepping way
 type:		Class
 arg:		String|Element element an extended dom node or dom node id string
 hint:		Element must be positioned Absolute or relative if animating top or left
 hint:		Animation parameters map to and change css styles
 hint:		no color keywords allowed
 demo:		../demos/animate_easing.html interactive demo allows you to choose easing, duration, and pause between each iteration. Also
		tracks the animation history and allows you to revert to previous animation steps.
 demo:		../demos/animate_selectors.html interactive demo allows you to choose any selectors and values
		to animate
 event:		this.element :complete
 event:		this.element :iteration
 event:		this :complete
 event:		this :iteration
*/
Df.Animate = Class.create(Df.Ui, {
	initialize: function($super, element) {
		
		$super(element)
		
		this.setPars({
			
			/*
			 ref:		Df.Animate.pars.time
			 type:		Parameter
			 returns:	Number|Boolean
			 choice:	false
			 choice:	Number
			 default:	250
			 note:		time in milliseconds to run the complete animation
			 hint:		use time and pase together or pause and skip
			 hint:		easing is only available when using time and pause
			*/
			time: 250,
			
			/*
			 ref:		Df.Animate.pars.pause
			 type:		Parameter
			 returns:	Number
			 default:	40
			 note:		time in milliseconds waint between each iteration
			 hint:		use time and pase together or pause and skip
			 hint:		easing is only available when using time and pause
			*/
			pause: 40,
			
			/*
			 ref:		Df.Animate.pars.skip
			 type:		Parameter
			 returns:	Number|Boolean
			 choice:	false
			 choice:	Number
			 default:	false
			 note:		pixels to skip between each iteration
			 hint:		use time and pase together or pause and skip
			 hint:		easing is only available when using time and pause
			*/
			skip:false,
			
			/*
			 ref:		Df.Animate.pars.ease
			 type:		Parameter
			 returns:	Function
			 default:	Df.Transitions.linear
			*/
			ease: Df.Transitions.linear,
			
			/*
			 ref:		Df.Animate.pars.width
			 type:		Parameter
			 returns:	Number|Boolean
			 default:	false
			 note:		animates the css property of width
			*/
			width: false,
			
			/*
			 ref:		Df.Animate.pars.height
			 type:		Parameter
			 returns:	Number|Boolean
			 default:	false
			 note:		animates the css property of height
			*/
			height: false,
			
			/*
			 ref:		Df.Animate.pars.color
			 type:		Parameter
			 returns:	Boolean|String
			 choice:	false
			 choice:	hex as a string like '#ffffff'
			 choice:	rgb as a string like 'rgb(255,255,255)'
			 default:	false
			 note:		animates the css property of color
			*/
			color: false,
			
			/*
			 ref:		Df.Animate.pars.backgroundColor
			 type:		Parameter
			 returns:	Boolean|String
			 choice:	false
			 choice:	hex as a string like '#ffffff'
			 choice:	rgb as a string like 'rgb(255,255,255)'
			 default:	false
			 note:		animates the css property of background-color
			*/
			backgroundColor: false,
			
			/*
			 ref:		Df.Animate.pars.backgroundPosition
			 type:		Parameter
			 returns:	Boolean|String
			 choice:	false
			 choice:	String like '1px 4px'
			 default:	false
			 note:		animates the css property of background-position
			*/
			backgroundPosition: false,
			
			/*
			 ref:		Df.Animate.pars.left
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of left
			*/
			left: false,
			
			/*
			 ref:		Df.Animate.pars.top
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of top
			*/
			top: false,
			
			/*
			 ref:		Df.Animate.pars.opacity
			 type:		Parameter
			 returns:	Boolean|Number
			 choice:	false
			 choice:	decimal 0.0001 - 0.9999
			 hint:		use values between 0.0001 - 0.9999
			 hint:		prototype does not like cap case. in css use filter:alpha(opacity=50)
			 default:	false
			 note:		animates the css property of opacity
			*/
			opacity: false,
			
			/*
			 ref:		Df.Animate.pars.fontSize
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of font-size
			*/
			fontSize: false,
			
			/*
			 ref:		Df.Animate.pars.lineHeight
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of line-height
			*/
			lineHeight: false,
			
			/*
			 ref:		Df.Animate.pars.letterSpacing
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of letter-spacing
			*/
			letterSpacing: false,
			
			/*
			 ref:		Df.Animate.pars.paddingLeft
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of padding-left
			*/
			paddingLeft: false,
			
			/*
			 ref:		Df.Animate.pars.paddingRight
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of padding-right
			*/
			paddingRight: false,
			
			/*
			 ref:		Df.Animate.pars.paddingTop
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of padding-top
			*/
			paddingTop: false,
			
			/*
			 ref:		Df.Animate.pars.paddingBottom
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of padding-bottom
			*/
			paddingBottom: false,
			
			/*
			 ref:		Df.Animate.pars.marginLeft
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of margin-left
			*/
			marginLeft: false,
			
			/*
			 ref:		Df.Animate.pars.marginRight
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of margin-right
			*/
			marginRight: false,
			
			/*
			 ref:		Df.Animate.pars.marginTop
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of margin-top
			*/
			marginTop: false,
			
			/*
			 ref:		Df.Animate.pars.marginBottom
			 type:		Parameter
			 returns:	Boolean|Number
			 default:	false
			 note:		animates the css property of margin-bottom
			*/
			marginBottom: false,
			
			/*
			 ref:		Df.Animate.pars.onComplete
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onComplete: false,
			
			/*
			 ref:		Df.Animate.pars.onIteration
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onIteration: false,
			
			selectors: []
		});
		
		this.possibleSelectors = [
			'width','height','color','left','top','fontSize', 'lineHeight', 'letterSpacing',
			'paddingLeft','paddingRight','paddingTop','paddingBottom',
			'marginLeft','marginRight','marginTop','marginBottom',
			'opacity','backgroundColor', 'backgroundPosition'
		];
		
		this.running = false;
		this.iterations = false;
		this.currentIteration = false;
		this.animators = [];
		this.coords = [];
		this.history = [];
		this.hpointer = 0;
		
		return this;	
	},
	
	/*
	 ref:		Df.Animate.run
	 type:		Method
	 returns:	Df.Animate
	 arg:		Df.Animate.pars pars
	 arg:		Boolean fromHistory run the animation at the current pointer
	 note:		runs the animation based on the pars sent in or a step from the history
	*/
	run: function(pars,fromHistory){
		this.setPars(pars);
		
		//load with initial state of element
		if( this.history.length == 0 ){
			this.loadInitialState();
			this.hpointer = 0;
		}
		
		//load record in history array
		if( !fromHistory ){
			this.loadState();
			this.hpointer = this.history.length -1
		}
		
		//create an array of selector to animate
		this.createAnimators();
		
		
		if( this.animators.length == 0 && !fromHistory ){
			this.history.pop()
			this.hpointer--
		}
		
		//determine the iterations the animation will take
		this.setIterations();
		
		//create an array of interation steps, how the selectors are set for each iteration
		this.createCoordHash();
		
		//run though the coords array with the set pause value
		if( this.coords.length > 0 ){
			this.running = true;
			this.stepThroughAnimation();
		}
		return this;
	},
	
	/*
	 ref:		Df.Animate.getPossibleSelectors
	 type:		Method
	 returns:	Array
	 note:		gets all the available css selectors that can be animated
	*/
	getPossibleSelectors: function(){
		return this.possibleSelectors
	},
	
	/*
	 ref:		Df.Animate.getHistoryCount
	 type:		Method
	 returns:	Number
	 note:		gets the total number of animation steps ran on this instance
	*/
	getHistoryCount: function(){
		return this.history.length;
	},
	
	/*
	 ref:		Df.Animate.clear
	 type:		Method
	 returns:	Df.Animate
	 note:		stops the animation
	 note:		clears all memory of the instance
	*/
	clear: function(){
		this.running = false;
		this.animators = [];
		this.history = [];
		this.hpointer = 0;
		this.iterations = false;
		this.currentIteration = false;
		this.coords = [];
		return this;
	},
	
	/*
	 ref:		Df.Animate.terminate
	 type:		Method
	 returns:	Df.Animate
	 note:		stops the animation
	 note:		clears all memory of the current animation that is running 
	*/
	terminate: function(){
		running = false;
		coords = [];
		iterations = false;
		currentIteration = false;
		animators = [];
		return this;
	},
	
	/*
	 ref:		Df.Animate.pause
	 type:		Method
	 returns:	Df.Animate
	 note:		pauses the animation
	*/
	pause: function(ms){
		this.running = false;
		
		if (ms) {
			setTimeout(this.resume.bind(this), ms);
		}
		
		return this;
	},

	/*
	 ref:		Df.Animate.resume
	 type:		Method
	 returns:	Df.Animate
	 note:		resumes the animation
	*/
	resume: function(){
		this.running = true;
		this.stepThroughAnimation()
		return this
	},
	
	/*
	 ref:		Df.Animate.back
	 type:		Method
	 returns:	Df.Animate
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		runs the previous animation in the history 
	*/
	back: function(pars){
		if(this.hpointer > 0){
			this.hpointer--;	
			if(pars){
				Object.extend( this.history[ this.hpointer ], pars );
			}
			this.run(false, true);
		}
	},
	
	/*
	 ref:		Df.Animate.next
	 type:		Method
	 returns:	Df.Animate
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		runs the next animation in the history 
	*/
	next: function(pars){
		if( (this.hpointer + 1) < this.history.length ){
			this.hpointer++;	
			if(pars){
				Object.extend( this.history[ this.hpointer ], pars );
			}
			this.run(false, true);
		}
	},
	
	/*
	 ref:		Df.Animate.first
	 type:		Method
	 returns:	Df.Animate
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		animates back to its original css properties 
	*/
	first: function(pars){
		this.hpointer = 0;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true);
	},
	
	/*
	 ref:		Df.Animate.last
	 type:		Method
	 returns:	Df.Animate
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		animates to the last index in the history
	*/
	last: function(pars){
		this.hpointer = this.history.length-1;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true);
	},
	
	/*
	 ref:		Df.Animate.index
	 type:		Method
	 returns:	Df.Animate
	 arg:		Number index a specific index in the history to animate to
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		animates to a specific index in the history
	*/
	index: function(index, pars){
		this.hpointer = index-1;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true);
	},
	
	/*
	 ref:		Df.Animate.toggle
	 type:		Method
	 returns:	Df.Animate
	 arg:		Number index a specific index in the history to animate to
	 arg:		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 note:		toggles the history between 1 and 0
	 note:		runs the animation for the first time if not run yet
	 hint:		the static method of Df.Animate.toggleBy works well for common observers
			like click or hover
	 example:	<script type="text/javascript">
				var el = new Df.Animate($('xxx')).setPars({
					opacity: .5
				})
				
				el.getElement().observe('click', function(e){
					this.toggle()
				}.bind(el))
			</script>
	*/
	toggle: function(pars){
		if( this.history.length == 0 ){
			this.run(pars);	
		}
		else if( this.hpointer == 1 ){
			this.first(pars);
		}
		else if( this.hpointer == 0 ){
			this.last(pars);
		}
	},
    
	loadInitialState: function(){
		
		this.createSelectors();
		
		var copy = Object.clone( this.pars );
		
		var obj = {}
		for( var i=0; i<copy.selectors.length; i++ ){
			
			var val = this.element.getStyle(copy.selectors[i]);
			
			if(val != undefined){
				obj[copy.selectors[i]] = val ;  
			}else{
				obj[copy.selectors[i]] = false;  
			}
		}
		
		this.history.push( Object.extend(copy,obj) );
	},
	
	loadState: function(){
		this.createSelectors();
		this.history.push( Object.extend( {}, this.pars ) );
	},
	
	createSelectors: function(){
		this.pars.selectors.length == 0
		this.possibleSelectors.each(function(v){
			if( this.pars[v] !== false ){
				this.pars.selectors.push(v)
			}
		}.bind(this));
	},
	
	createAnimators: function(){
		this.animators = [];
		
		for(var i=0; i<this.history[this.hpointer].selectors.length; i++){
			var elem = this.history[this.hpointer].selectors[i];
			
			if(this.history[this.hpointer][elem] !== false){
				
				var rawTargetValue = this.history[this.hpointer][elem]
				
				//execute value function
				if(rawTargetValue.constructor == Function){
					rawTargetValue = rawTargetValue(this);
				}
				
				var val = this.element.getStyle(elem);
				
			var currentValue = this.getCurrentValue(elem,val);
				
				var targetValue = this.getCurrentValue(elem,rawTargetValue);
				
				var units = this.getUnits(rawTargetValue);
				if(!units){
					units = this.getUnits(val);
				}
				
				var delta = this.getDelta(targetValue,currentValue);
				
				if(delta){
					this.animators.push({selector:elem,delta:delta,current:currentValue,units:units});
				}
			}
		}
	},
	
	setIterations: function(){
		var p = this.history[this.hpointer];
		if(p.pause && p.time){
			this.iterations = Math.ceil(p.time/p.pause);
		}
		else if(p.skip && p.pause){
			this.iterations = Math.ceil( this.getMaxAbsVal() / p.skip);
		}
		this.currentIteration = 0;
	},
	
	createCoordHash: function(){
		this.coords = [];
		if( this.animators.length > 0 ){
			for(var i=0; i<this.iterations; i++){
				this.coords.push( this.buildAnimateStep(i) );
			}
		}
	},
	
	//recursive function that steps through the coords array based on pause value
	stepThroughAnimation: function(){
		if( this.running ){
			if( this.iterations > this.currentIteration){
				this.element.setStyle( this.coords[this.currentIteration] );
				this.currentIteration++;
				
				this.fire(':iteration', { iteration: this.currentIteration, iterations: this.iterations } );
				
				this.element.fire(':iteration', { iteration: this.currentIteration, iterations: this.iterations } );
				
				if( this.history[this.hpointer].onIteration){
					this.history[this.hpointer].onIteration(this);
				}
				
				setTimeout( this.stepThroughAnimation.bind(this), this.history[this.hpointer].pause);
			}else{
				this.running = false;
				
				this.fire(':complete', {pointer: this.hpointer});
				
				this.element.fire(':complete', {pointer: this.hpointer});
				
				if( this.history[this.hpointer].onComplete){
					this.history[this.hpointer].onComplete(this);
				}
			}
		}
	},
	
	getMaxAbsVal: function(){
		var ary = [];
		for(var i=0; i<this.animators.length; i++){
			var val = this.animators[i].delta;
			if(val.constructor == Array){
				for(var j=0; j<val.length; j++){
					ary.push( Math.abs(val[j]) );
				}
			}else{
				ary.push( Math.abs(val) );
			}
		}
		return ary.max();
	},
	
	buildAnimateStep: function(rec){
		var obj = {}
		
		for(var i=0; i<this.animators.length; i++){
			var elem = this.animators[i];
			
			var val = this.getInteratedValue(elem,rec);
			
			if(rec == (this.iterations-1)){
				
				var rawTargetValue = this.history[this.hpointer][elem.selector]
				//execute value function
				if(rawTargetValue.constructor == Function){
				     rawTargetValue = rawTargetValue(this);
				}
				
				val = this.getCurrentValue( elem.selector, rawTargetValue );
			}
			obj[elem.selector] = this.setDisplayValue( elem.selector, val, elem.units );
		}
		return obj;
	},
	
	getInteratedValue: function(elem,rec){
			
		var ease = false;
		if( this.history[this.hpointer].ease.constructor == Function){
			ease = this.history[this.hpointer].ease
		}else{
			ease = this.history[this.hpointer].ease[elem.selector]
		}
		
		var val = false;
		if(elem.delta.constructor == Array){
			val = [];
			
			for(var i=0; i<elem.delta.length; i++){
				if( this.history[this.hpointer].pause && this.history[this.hpointer].time){
					val.push( this.getEasedValueForTime(elem.current[i], rec+1, elem.delta[i], ease ) );
				}
				else if( this.history[this.hpointer].pause && this.history[this.hpointer].skip){
					
					val.push( this.plotSkipValue( elem.current[i], elem.delta[i], rec ));
				}
			}
		}else{
			if( this.history[this.hpointer].pause && this.history[this.hpointer].time){
				val = this.getEasedValueForTime( elem.current, rec+1, elem.delta, ease )
			}
			else if(this.history[this.hpointer].pause && this.history[this.hpointer].skip){
				val = this.plotSkipValue(elem.current,elem.delta,rec);
			}
			
		}
		return val;
	},
	
	getEasedValueForTime: function(currentValue, interationStep, delta, ease ){
		return ease(interationStep, currentValue, delta, this.iterations )
	},
	
	plotSkipValue: function(current,delta,rec){
		if(delta > 0){
			var plot = current + ((rec+1) * ( this.history[this.hpointer].skip));
			
			if(plot <= current + delta){
				plot = plot;
			}else{
				plot = current + delta;
			}
		}else if(delta < 0){
			var plot = current - ((rec+1) * ( this.history[this.hpointer].skip));
			
			if(plot >= current + delta){
				plot = plot;
			}else{
				plot = current + delta;
			}
		}else{
			var plot = 0;
		}
		return plot;
	},
	
	//takes two numeric values or two numeric arrays and returns the difference of the numbers or an array of the differences of each number in the array
	getDelta: function(targetValue,currentValue){
		var res = false;
		var keepIt = false;
		if(targetValue.constructor == Array | currentValue.constructor == Array){
			res = [];
			for(var i=0; i<targetValue.length; i++){
				var delta = targetValue[i] - currentValue[i]
				if(delta){
					keepIt = true;
				}
				res.push(delta);
			}
			if(!keepIt){
				res = false;	
			}
		}else{
			res = targetValue - currentValue;
		}
		return res;
	},
	
	//takes a raw value and returns the unit measurement of that value
	getUnits: function(val){
		var str = false;
		if(/px$/.test(val)){
			str = 'px';	
		}else if(/%$/.test(val)){
			str = '%';	
		}else if(/em$/.test(val)){
			str = 'em';	
		}
		return str;
	},
	
	//(NEEDS SOME WORK on UNITS) takes a selector, a number or an array of numbers, and a unit and returns the presentation ready value of the number(s)
	setDisplayValue: function(elem,val,units){
		if(
			elem == 'width' | elem == 'height' | elem == 'top' | elem == 'left' | elem == 'fontSize'| elem == 'lineHeight'| elem == 'letterSpacing'
			| elem == 'paddingLeft' | elem == 'paddingRight' | elem == 'paddingTop' | elem == 'paddingBottom'
			| elem == 'marginLeft' | elem == 'marginRight' | elem == 'margingTop' | elem == 'marginBottom'
		   ){
			val = parseInt(val);
		}else if(elem == 'opacity'){
			val = val/100;
		}
		else if(elem == 'color' | elem == 'backgroundColor' ){
			val = this.hexFromArray(val);
		}
		else if(elem == 'backgroundPosition'){
			val = this.toBackgroundPositionString(val);
		}
		
		if(units && elem != 'backgroundPosition'){
			val += units;
		}
		
		return val;
	},
	
	//(NEEDS SOME WORK on UNITS) takes a numbers array [1,1] and returns the presentation value 1px 1px
	toBackgroundPositionString: function(val){
		str = '';
		for(var i=0; i<val.length; i++){
			str += Math.round(val[i]) + 'px ';
		}
		return str;
	},
	
	//takes a numbers array [255,255,255] and returns the presentation value #ffffff
	hexFromArray: function(val){
		var str = '#';
		for(var i=0; i<val.length; i++){
			str += parseInt(val[i]).toColorPart();
		}
		return str;
	},
	
	// takes a selector and a mixed raw value and returns the value(s) as a number or an array of numbers
	getCurrentValue: function(elem,val){
		if(
			elem == 'width' | elem == 'height' | elem == 'top' | elem == 'left' | elem == 'fontSize' | elem == 'lineHeight'| elem == 'letterSpacing'
			| elem == 'paddingLeft' | elem == 'paddingRight' | elem == 'paddingTop' | elem == 'paddingBottom'
			| elem == 'marginLeft' | elem == 'marginRight' | elem == 'marginTop' | elem == 'marginBottom'
		   ){
			val = parseInt(val);
		}
		else if(elem == 'opacity'){
			val = parseInt(val * 100);
		}
		else if(elem == 'color' | elem == 'backgroundColor' ){
			val = this.toColorArray(val);
		}
		else if(elem == 'backgroundPosition'){
			val = this.toBackgroundPositionArray(val);
		}
		
		return val;
	},
	
	//(NEEDS SOME WORK) takes background position info in the form of 1px 1px and converts it to [1,1]
	toBackgroundPositionArray: function(val){
		val = val.split(' ');
		for(var i=0; i<val.length; i++){
			val[i] = parseInt(val[i])
		}
		return val
	},
	
	//(NEEDS SOME WORK) takes color info in the form of #ffffff or rgb(255,255,255) and conterts it to [255,255,255] 
	toColorArray: function(val){
		if(/^#/.test(val)){
			val = val.replace(/^#/g,'').replace(/(..)/g,"$1,").replace(/,$/g,'').split(',');
			for(var i=0; i<val.length; i++){
				if(val[i].constructor == String){
					val[i] = parseInt(val[i],16);	
				}
				val[i] = Number(val[i])
			}
			
		}else if(/^rgb/.test(val)){
			val = val.replace(/^rgb\(|\)$/g,'').split(',');
			for(var i=0; i<val.length; i++){
				val[i] = Number(val[i])
			}
		}
		return val
	}
});

/*
 ref:		Df.Animate.toggleBy
 note:		This is a factory method for creating an instance of Df.Animate complete with listeners for
		toggling an animation object.
 type:		Static Method
 returns:	Df.Animate
 arg:		String|Element element
 arg:		String action choose between click and hover
 arg:		Df.Animate.pars pars
 example:	<script type="text/javascript">
			var animate = Df.Animate.toggleBy($('xxx'), 'click', {
				opacity: .65
			})
		</script>
*/
Df.Animate.toggleBy = function(element, action, pars){
	var animate = new Df.Animate(element);
	Object.extend( animate.pars, pars );
	if(action == 'click'){
		element.observe('click', function(e){
			animate.toggle()
		}.bind(animate));
		
	}else if(action == 'hover'){
		element.observe('mouseover', function(e){
			animate.toggle()
		}.bind(animate));
		
		element.observe('mouseout', function(e){
			animate.toggle()
		}.bind(animate));
	}
	return animate;
}

/*
 ref:		Df.Drag
 extends:	Df.Ui
 returns:	Df.Drag
 note:		Makes an element dragable
 hint:		Element must be positioned Absolute,
 type:		Class
 arg:		String|Element element an extended dom node or dom node id string
 event:		this.element :start
 event:		this.element :stop
 event:		this.element :drag
 event:		this.element :dragX
 event:		this.element :dragY
 event:		this.element :enable
 event:		this.element :disable
*/
Df.Drag = Class.create(Df.Ui, {
	initialize: function($super, element){
		$super(element)
		
		this.setPars({
			/*
			 ref:		Df.Drag.pars.dirX
			 type:		Parameter
			 returns:	object|Boolean
			 choice:	true
			 choice:	false
			 choice:	hash with values for min and or max {min:,max:}
			 default:	false
			 note:		rules for draging left and right
			*/
			dirX: true, 
			
			/*
			 ref:		Df.Drag.pars.dirY
			 type:		Parameter
			 returns:	object|Boolean
			 choice:	true
			 choice:	false
			 choice:	hash with values for min and or max {min:,max:}
			 default:	false
			 note:		rules for draging up and down
			*/
			dirY: true,
			
			/*
			 ref:		Df.Drag.pars.onStart
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onStart: false,
			
			/*
			 ref:		Df.Drag.pars.onDrag
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onDrag: false,
			
			/*
			 ref:		Df.Drag.pars.onDragX
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onDragX: false,
			
			/*
			 ref:		Df.Drag.pars.onDragY
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onDragY: false,
			
			/*
			 ref:		Df.Drag.pars.onStop
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onStop: false,
			
			/*
			 ref:		Df.Drag.pars.onEnable
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onEnable: false,
			
			/*
			 ref:		Df.Drag.pars.onDisable
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onDisable: false,
			
			/*
			 ref:		Df.Drag.pars.dragElement
			 type:		Parameter
			 returns:	Array
			 default:	false
			 note:		accepts string CSS selector like 'div.dragable'
			*/
			dragElement: false
		});
		
		this._offsetX
		this._offsetY
		this._curX
		this._curY
		
		this._followIt = this.followIt.bindAsEventListener(this)
		this._startIt = this.startIt.bindAsEventListener(this)
		this._stopIt = this.stopIt.bindAsEventListener(this)
		
		return this
	},
	
	/*
	 ref:		Df.Drag.enable
	 type:		Method
	 returns:	Df.Drag
	 arg:		Df.Drag.pars pars
	 fire:		this.element :enable
	 note:		enables the element to be dragable
	*/
	enable: function(pars){
		this.setPars(pars)
		
		this.element.fire(':enable');
			
		if(this.pars.onEnable){
			this.pars.onEnable(this)
		}
		
		if(this.pars.dragElement){
			this.element.select(this.pars.dragElement).each(function(v){
				Event.observe(v,'mousedown', this._startIt);
			}.bind(this));
		}else{
			Event.observe(this.element,'mousedown', this._startIt);
		}
		
		return this
	},
	
	/*
	 ref:		Df.Drag.disable
	 type:		Method
	 returns:	Df.Drag
	 arg:		Df.Drag.pars pars
	 fire:		this.element :disable
	 note:		disable the element from being dragged
	*/
	disable: function(pars){
		this.setPars(pars)
		
		this.element.fire(':disable');
			
		if(this.pars.onDisable){
			this.pars.onDisable(this)
		}
		
		if(this.pars.dragElement){
			this.element.select(this.pars.dragElement).each(function(v){
				Event.stopObserving(v,'mousedown', this._startIt);
			}.bind(this));
		}else{
			Event.stopObserving(this.element,'mousedown', this._startIt);
		}
		
		return this
	},
	
	/*
	 ref:		Df.Drag.startIt
	 type:		Method
	 returns:	Df.Drag
	 arg:		Df.Drag.pars pars
	 fire:		this.element :start
	 note:		not intended to be called directly
	*/
	startIt: function(e){
		Event.stop(e); 
		
		Event.observe(document.body,'mousemove', this._followIt);
		Event.observe(document.body,'mouseup', this._stopIt);
		
		this._offsetX = this.offsetX(e)
		this._offsetY = this.offsetY(e)
		
		this.element.fire(':start')
		
		if(this.pars.onStart){
			this.pars.onStart(this)
		}
		
		return this
	},
	
	offsetX: function(e){
		return Event.pointerX(e) - this.getElement().positionedOffset().left
	},
	
	offsetY: function(e){
		return Event.pointerY(e) - this.getElement().positionedOffset().top
	},
	
	/*
	 ref:		Df.Drag.stopIt
	 type:		Method
	 returns:	Df.Drag
	 fire:		this.element :stop
	 note:		not intended to be called directly
	*/
	stopIt: function(e){
		Event.stop(e); 
		Event.stopObserving(document.body,'mousemove', this._followIt)
		Event.stopObserving(document.body,'mouseup',this._stopIt)
		
		if(this.pars.onStop){
			this.pars.onStop(this)
		}
		this.element.fire(':stop')
		
		return this
	},
	
	/*
	 ref:		Df.Drag.followIt
	 type:		Method
	 returns:	Df.Drag
	 fire:		this.element :drag
	 note:		not intended to be called directly
	*/
	followIt: function(e) {
		Event.stop(e); 
		
		if(this.pars.dirX){
			this.dirX(e)
		}
		
		if(this.pars.dirY){
			this.dirY(e)
		}
		
		if(this.pars.onDrag) {
			this.pars.onDrag(this)
		}
		this.element.fire(':drag')
		
		return this
	},
	
	/*
	 ref:		Df.Drag.dirX
	 type:		Method
	 returns:	Df.Drag
	 fire:		this.element :dragX
	 note:		not intended to be called directly
	*/
	dirX: function(e){
		this._curX = Event.pointerX(e) - this._offsetX
		
		if(this.pars.dirX.min || this.pars.dirX.min == 0){
			this.minDirX(e)
		}
		
		if(this.pars.dirX.max || this.pars.dirX.max == 0){
			this.maxDirX(e)
		}
		
		this.element.style.left = this._curX + 'px'
		
		if(this.pars.onDragX){
			this.pars.onDragX(this)
		}
		this.element.fire(':dragX')
	},
	
	minDirX: function(e){
		if(this._curX < this.pars.dirX.min){
			this._curX = this.pars.dirX.min
		}
	},
	
	maxDirX: function(e){
		if(this._curX > this.pars.dirX.max){
			this._curX = this.pars.dirX.max
		}
	},
	
	/*
	 ref:		Df.Drag.dirY
	 type:		Method
	 returns:	Df.Drag
	 fire:		this.element :dragY
	 note:		not intended to be called directly
	*/
	dirY: function(e){
		this._curY = Event.pointerY(e) - this._offsetY
		
		if(this.pars.dirY.min || this.pars.dirY.min == 0){
			this.minDirY(e)
		}
		
		if(this.pars.dirY.max || this.pars.dirY.max == 0){
			this.maxDirY(e)
		}
		
		this.element.style.top = this._curY + 'px'
		
		if(this.pars.onDragY){
			this.pars.onDragY(this)
		}
		this.element.fire(':dragY')
	},
	
	minDirY: function(e){
		if(this._curY < this.pars.dirY.min){
			this._curY = this.pars.dirY.min
		}
	},
	
	maxDirY: function(e){
		if(this._curY > this.pars.dirY.max){
			this._curY = this.pars.dirY.max
		}
	}
});

/*
 ref:		Df.Resize
 type:		Class
 extends:	Df.Drag
 returns:	Df.Resize
 event:		this.element :size
 event:		this.element :sizeHeight
 event:		this.element :sizeWidth
 arg:		string|Element element an extended dom node or dom node id string
*/
Df.Resize = Class.create(Df.Drag, {
	initialize: function($super, element) {
		$super(element)
		
		delete this.pars.dragElement

		this.setPars({
			
			/*
			 ref:		Df.Resize.pars.hitDepth
			 type:		Parameter
			 returns:	Number
			 default:	20
			 note:		padding inside the element that triggers resizing
			*/
			hitDepth: 20,
			
			/*
			 ref:		Df.Resize.pars.dirH
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize height
			*/
			dirH: true,
			
			/*
			 ref:		Df.Resize.pars.dirT
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize top
			*/
			dirT: true,
			
			/*
			 ref:		Df.Resize.pars.dirB
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize bottom
			*/
			dirB: true,
			
			/*
			 ref:		Df.Resize.pars.dirW
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize width
			*/
			dirW: true,
			
			/*
			 ref:		Df.Resize.pars.dirL
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize left side
			*/
			dirL: true,
			
			/*
			 ref:		Df.Resize.pars.dirR
			 type:		Parameter
			 returns:	Boolean
			 default:	true
			 note:		can resize right side
			*/
			dirR: true,
			
			/*
			 ref:		Df.Resize.pars.onSizeHeight
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onSizeHeight: false,
			
			/*
			 ref:		Df.Resize.pars.onSizeWidth
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onSizeWidth: false,
			
			/*
			 ref:		Df.Resize.pars.onSize
			 type:		Parameter
			 returns:	Function
			 default:	false
			 note:		anonymous function 
			 note:		sends class instance as the only argument
			*/
			onSize: false
		});
		
		this._curH
		this._curW
		this._pointerX
		this._pointerY
		this._sizeHeight = false
		this._sizeWidth = false
		this._startH
		this._startW
		this._startL
		this._startT
		this._followCursor = this.followCursor.bindAsEventListener(this)
		
		return this
	},
	
	/*
	 ref:		Df.Resize.enable
	 override:
	 type:		Method
	 returns:	Df.Resize
	 fire:		this.element :enable
	*/
	enable: function(pars){
		this.setPars(pars)
	
		this.element.fire(':enable');
			
		if(this.pars.onEnable){
			this.pars.onEnable(this)
		}
		
		Event.observe(this.element,'mousemove', this._followCursor);
		
		Event.observe(this.element,'mousedown', this._startIt);
		
		return this
	},
	
	/*
	 ref:		Df.Resize.disable
	 override:
	 returns:	Df.Resize
	 type:		Method
	 fire:		this.element :disable
	*/
	disable: function(pars){
		this.setPars(pars)
		
		this.element.style.cursor = 'auto'
		
		this.element.fire(':disable');
			
		if(this.pars.onDisable){
			this.pars.onDisable(this)
		}
		
		Event.stopObserving(this.element,'mousemove', this._followCursor);
		
		Event.stopObserving(this.element,'mousedown', this._startIt);
		
		return this
	},
	
	followCursor: function(e){
		this._pointerX = this.getPointerX(e)
		this._pointerY = this.getPointerY(e)
		
		if(this._pointerY <= this.pars.hitDepth){
			this._sizeHeight = 'top'
		}else if (this._pointerY >= this.element.getHeight() - this.pars.hitDepth) {
			this._sizeHeight = 'bottom'
		} else {
			this._sizeHeight = false
		}
		
		if(this.element.getWidth() <= this.pars.hitDepth){
			if(this.pars.dirR){
				this._sizeWidth = 'right'	
			}
		}
		else if(this._pointerX <= this.pars.hitDepth){
			this._sizeWidth = 'left'
		} else if (this._pointerX >= this.element.getWidth() - this.pars.hitDepth){
			this._sizeWidth = 'right'
		} else {
			this._sizeWidth = false
		}
		
		if(this._sizeWidth !== false && this._sizeHeight !== false){
			if(this._sizeWidth == 'left' && this._sizeHeight == 'top'){
				this.element.style.cursor = 'nwse-resize'
			}
			else if(this._sizeWidth == 'left' && this._sizeHeight == 'bottom'){
				this.element.style.cursor = 'nesw-resize'
			}
			if(this._sizeWidth == 'right' && this._sizeHeight == 'top'){
				this.element.style.cursor = 'nesw-resize'
			}
			else if(this._sizeWidth == 'right' && this._sizeHeight == 'bottom'){
				this.element.style.cursor = 'nwse-resize'
			}
		}
		else if(this._sizeWidth == false && this._sizeHeight !== false ){
			this.element.style.cursor = 'ns-resize'
		}
		else if(this._sizeWidth !== false && this._sizeHeight == false){
			this.element.style.cursor = 'ew-resize'
		}
		else {
			this.element.style.cursor = 'auto'
		}
	},
	
	/*
	 ref:		Df.Resize.followIt
	 override:
	 returns:	Df.Resize
	 fire:		this.element :start
	 type:		Method
	 note:		not intended to be called directly
	*/
	startIt: function(e){
		Event.stop(e); 
		Event.stopObserving(this.element,'mousemove', this._followCursor);
		
		this._offsetX = this.offsetX(e)
		this._offsetY = this.offsetY(e)
		
		this._startH = this.element.getHeight()
		this._startW = this.element.getWidth()
		
		this._startL = parseInt(this.element.getStyle('left'))
		this._startT = parseInt(this.element.getStyle('top'))
		
		this._curX = Event.pointerX(e) - this._offsetX
		this._curY = Event.pointerY(e) - this._offsetY
		
		if(this._sizeHeight || this._sizeWidth){
			Event.observe(document.body,'mousemove', this._followIt);
			Event.observe(document.body,'mouseup', this._stopIt);
		}
		
		if(this.pars.onStart){
			this.pars.onStart(this)
		}
		
		this.element.fire(':start')
		
		return this
	},
	
	stopIt: function($super, e){
		$super(e)
		Event.observe(this.element,'mousemove', this._followCursor);
		return this
	},
	
	/*
	 ref:		Df.Resize.followIt
	 override:
	 returns:	Df.Resize
	 type:		Method
	 fire:		this.element :size
	 note:		not intended to be called directly
	*/
	followIt: function($super, e) {
		Event.stop(e); 
		
		if(this.pars.dirH && this._sizeHeight ){
			if(this._sizeHeight == 'top' && this.pars.dirT){
				this.dirY(e)
			}
			this.dirH(e)
		}
		
		if(this.pars.dirW && this._sizeWidth){
			if(this._sizeWidth == 'left' && this.pars.dirL){
				this.dirX(e)
			}
			this.dirW(e)
		}
		
		this.element.fire(':size')
		
		return this
	},
	
	/*
	 ref:		Df.Resize.dirH
	 type:		Method
	 fire:		this.element :sizeHeight
	 note:		not intended to be called directly
	*/
	dirH: function(e){
		if(this._sizeHeight == 'top' && this.pars.dirT){
			this._curH = this._startH + (this._startT - this._curY)
		} else if (this._sizeHeight == 'bottom' && this.pars.dirB){
			this._curH = this.getPointerY(e) + (this._startH - this._pointerY)
		}
		
		this.element.style.height = this._curH + 'px'
		
		if(this.pars.onSizeHeight){
			this.pars.onSizeHeight(this)
		}
		this.element.fire(':sizeHeight')
	},
	
	/*
	 ref:		Df.Resize.dirW
	 type:		Method
	 fire:		this.element :sizeHeight
	 note:		not intended to be called directly
	*/
	dirW: function(e){
		if(this._sizeWidth == 'left' && this.pars.dirL){
			this._curW = this._startW + (this._startL - this._curX)
		} else if (this._sizeWidth == 'right' && this.pars.dirR){
			this._curW = this.getPointerX(e) + (this._startW - this._pointerX)
		}
		
		this.element.style.width = this._curW + 'px'
		
		if(this.pars.onSizeWidth){
			this.pars.onSizeWidth(this)
		}
		this.element.fire(':sizeWidth')
	}
});	