/*
 -ref		Prototype
 -type		Static Class
 -note		Prototype Namespace
 -returns	Object
*/
/*
 -ref		Prototype.Browser
 -extends	Prototype
 -type		Static Class
 -note		Browser Detection
 -returns	Object
*/
/*
 -ref		Prototype.Browser.ie6
 -type		Static Parameter
 -returns	Boolean
 -example	<script type="text/javascript">
			if(Prototype.Browser.ie6 ){
				alert('hack away');
			}
		</script>
*/
/*
 -ref		Prototype.Browser.ie7
 -type		Static Parameter
 -returns	Boolean
 -example	<script type="text/javascript">
			if(Prototype.Browser.ie7 ){
				alert('hack away');
			}
		</script>
*/
Object.extend(Prototype.Browser, {
	ie6: navigator.userAgent.toLowerCase().indexOf("msie 6") > -1,
	ie7: navigator.userAgent.toLowerCase().indexOf("msie 7") > -1
});

/*
 -ref		Df
 -note		Base Static Class or Namespace for the API
 -returns	Object
 -type		Static Class
*/
var Df = {}

/*
 -ref		Df.version
 -note		version of the API
 -type		Static Parameter
 -returns	String
 -example	<script type="text/javascript">
			alert(Df.VERSION)
		</script>
*/
Df.version = "1.4.0";

/*
 -ref		Df.classPath
 -returns	String
 -note		location where importModule looks for files
 -type		Static Parameter
 -example	<script type="text/javascript">
			Df.classPath = '/js/df/';
		</script>
*/
Df.classPath = '../js/df/';

Df.debug = {
	clock: function(){},
	log: function(){}
}

/*
 -ref           Object
 -type          Class
 -returns       Object
 -note          Javascript native object
*/
/*
 -ref		Object.toArray
 -type		Static Method
 -returns	Array
 -note		returns an array of anything sent to it
 -example	<script type="text/javascript">
			Object.toArray(1, 2, 3)
			//[1,2,3]

			Object.toArray()
			//[]

			Object.toArray([1,2,3])
			//[1,2,3]
		</script>
*/
Object.toArray = function() {
    if($A(arguments).length == 0){
	return []
    } else if($A(arguments).length == 1 && Object.isArray($A(arguments)[0])) {
        return $(arguments)[0]
    } else if ($A(arguments).length == 1) {
	return [$(arguments)[0]]
    } else {
	return $A(arguments)
    }
}

/*
 -ref		Element
 -note		a prototype extended element.
 -note		Use $('xxx') syntax instead of new Element('xxx')
 -returns	Element
 -type		Class
 -arg		String|Object element
 -example	<script type="text/javascript">
			var y = $('xxx')
		</script>
*/
Element.addMethods({

	/*
	 -ref		Element.getPointerX
	 -type		Method
	 -note		gets the mouse X position relative to the element
	 -returns	Number
	 -example	<script type="text/javascript">
				$('element').getPointerX())
			</script>
	*/
	getPointerX: function(element, e) {
		return Event.pointerX(e) - $(element).cumulativeOffset().left
	},

	/*
	 -ref		Element.getPointerY
	 -type		Method
	 -note		gets the mouse Y position relative to the element
	 -returns	Number
	 -example	<script type="text/javascript">
				$('element').getPointerY())
			</script>
	*/
	getPointerY: function(element, e) {
		return Event.pointerY(e) - $(element).cumulativeOffset().top
	},

	/*
	 -ref		Element.e
	 -note		creates a new element and inserts it relative to the Element instance
	 -note		returns the newly created element
	 -returns	Element
	 -type		Method
	 -arg		tag String
	 -arg		position String options are before, after, top, bottom
	 -arg		pars Object element attributes to add to element
	 -example	<script type="text/javascript">
				$('xxx').e('div', 'bottom')
			</script>
	*/
	e: function (element, tag, position, pars) {
	    //position : before, after, top, bottom
	    element = $(element)
	    var obj = $(document.createElement(tag))
	    if (pars) Object.extend(obj, pars)

	    if (Object.isUndefined(position)) {
		element.insert(obj);
	    }
	    else {
		var pos = {}
		pos[position] = obj
		element.insert(pos)
	    }
	    return obj;
	},

	/*
	 -ref		Element.setAttributes
	 -note		adds attributes to an element
	 -returns	Element
	 -type		Method
	 -arg		pars Object element attributes to add to element
	 -example	<script type="text/javascript">
				$('xxx').setAttributes({id:'test', className:'testClass'})
			</script>
	*/
	setAttributes: function(element, pars){
	    element = $(element)
	    Object.extend(element, pars)
	    return element
	},

	/*
	 -ref		Element.animate
	 -note		Shortcut for creating and running an animation object on an extended element
	 -returns	Df.Animate
	 -delegate	Df.Animate
	 -type		Method
	 -arg		Object pars
	 -example	<script type="text/javascript">
				$('xxx').animate({
					opacity: 0.5,
					height: 50
				});
			</script>
	*/
	animate: function(element,pars){
		return new Df.Animate($(element)).run(pars);
	},

	/*
	 -ref		Element.toggleAnimation
	 -note		Shortcut for creating and setting an animation object with toggle event listeners on an extended element
	 -returns	Df.Animate
	 -delegate	Df.Animate.toggleBy
	 -type		Method
	 -arg		String action choices are click and hover
	 -arg		Object pars
	 -example	<script type="text/javascript">
				$('xxx').toggleAnimation('click', {
					opacity: 0.5,
					height: 50
				});
			</script>
	*/
	toggleAnimation: function(element, action, pars){
		return Df.Animate.toggleBy( $(element) , action , pars )
	},

	/*
	 -ref		Element.dragable
	 -note		Shortcut for creating and setting a drag object on an extended element
	 -returns	Df.Drag
	 -delegate	Df.Drag
	 -type		Method
	 -arg		Object pars
	 -example	<script type="text/javascript">
				$('xxx').drag();
			</script>
	*/
	dragable: function(element,pars){
		return new Df.Drag($(element), pars).enable();
	},

	/*
	 -ref		Element.resizable
	 -note		Shortcut for creating and setting a resize object on an extended element
	 -returns	Df.Resize
	 -delegate	Df.Resize
	 -type		Method
	 -arg		Object pars
	 -example	<script type="text/javascript">
				$('xxx').resize();
			</script>
	*/
	resizable: function(element,pars){
		return new Df.Resize($(element), pars).enable();
	},

	/*
	 -ref		Element.ui
	 -note		Shortcut for creating and setting a Df.Ui object on an extended element
	 -returns	Df.Ui
	 -delegate	Df.Ui
	 -type		Method
	 -arg		Object pars
	 -example	<script type="text/javascript">
				$('xxx').ui({
					animate: {
						width: 600
					},
					drag: {}
				});
			</script>
	*/
	ui: function(element,pars){
		new Df.Ui($(element), pars);
	},

	/*
	 -ref		Element.createNS
	 -note		Shortcut for creating a namespace object
	 -returns	Object
	 -delegate	Df.Namespace.create
	 -type		Method
	 -arg		String namespace
	 -example	<script type="text/javascript">
				$('xxx').createNS('xxx.yyy.zzz')
			</script>
	*/
	createNS: function(element,namespace){
		return Df.Namespace.create(namespace,$(element));
	},

	/*
	 -ref		Element.center
	 -note		Centers the element relative to its parent.
	 -returns	Element
	 -type		Method
	 -hint		Element must be positioned Absolute
	 -hint		Parent must be positioned Absolute or Relative
	 -example	<script type="text/javascript">
				$('xxx').center()
			</script>
	*/
	center: function(element){
	    element = $(element)
	    var holder = element.up()
	    var hHeight
	    var hWidth
	    if (holder == document.body) {
		hHeight = document.viewport.getHeight()
		hWidth = document.viewport.getWidth()
	    } else {
		hHeight = holder.getHeight()
		hWidth = holder.getWidth()
	    }
	    var top = (hHeight - element.getHeight()) / 2
	    var left = (hWidth - element.getWidth()) / 2

	    if(element.getStyle('position') != 'fixed' && holder == document.body){
		var offsets = document.viewport.getScrollOffsets()
		top += offsets.top
		left += offsets.left
	    }
	    return element.setStyle({
		left : parseInt(left) + 'px',
		top : parseInt(top) + 'px'
	    })
	},

	/*
	 -ref		Element.distributeChildElements
	 -returns	Element
	 -type		Method
	 -example	<script type="text/javascript">
				$('xxx').distributeChildElements(3, {minimumChildren: 20})
			</script>
	*/
	distributeChildElements: function(element, groups, options){
		var tag = element.down().tagName
		var nodes = element.down().childElements()
		if(options && options.minimumChildren && nodes.length < options.minimumChildren){
		} else {
			nodes = $A(nodes).distributeEvenly(groups)
			nodes.each(function(v){
				var node = Df.e(tag)
				v.each(function(vv){
					node.insert(vv)
				})
				element.insert(node)
			})
			element.down().remove()
		}

		return element
	},

	/*
	 -ref		Element.chunkChildElements
	 -returns	Element
	 -type		Method
	 -example	<script type="text/javascript">
				$('xxx').chunkChildElements(3, {minimumChildren: 20})
			</script>
	*/
	chunkChildElements: function(element, size, options){
		var tag = element.down().tagName
		var nodes = element.down().childElements()
		if(options && options.minimumChildren && nodes.length < options.minimumChildren){
		} else {
			nodes = $A(nodes).eachSlice(size)
			nodes.each(function(v){
				var node = Df.e(tag)
				v.each(function(vv){
					node.insert(vv)
				})
				element.insert(node)
			})
			element.down().remove()
		}

		return element
	}
});

/*
 -ref		String
 -returns	String
 -type		Class
 -arg		String string
*/
Object.extend(String.prototype,{

	/*
	 -ref		String.uId
	 -note		Created a Unique string based on a timestamp and random number
	 -returns	String
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = ''.uId()
			</script>
	*/
	uId: function(){
		return this + "u" + new Date().getTime() + parseInt(10000*Math.random());
	},

	/*
	 -ref		String.exe
	 -note		Evaluates a String using eval
	 -note		Wraps the string in an array and returns the zero index
	 -returns	Object
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = '{"a":"b"}'.exe()
			</script>
	*/
	exe: function(){
		return(eval('[' + this + ']')[0]);
	},

	/*
	 -ref		String.capFirstChar
	 -note		Capitalizes the first character of a string
	 -returns	String
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = 'test'.capFirstChar()
				//Test
			</script>
	*/
	capFirstChar: function(){
	    return this.charAt(0).toUpperCase() + this.substring(1, this.length)
	},

	/*
	 -ref		String.hexToRGB
	 -note		parses a hex string into an rgb array
	 -returns	Array
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = "#FFFF00".hexToRGB()
				//[256, 256, 0]
			</script>
	*/
	hexToRGB: function() {
	    var hexColor, red, green, blue;
	    hexColor = this.cssToHex()
	    if (hexColor) {
		red = parseInt(hexColor.slice(1, 3), 16);
		green = parseInt(hexColor.slice(3, 5), 16);
		blue = parseInt(hexColor.slice(5, 7), 16);
		return [red,green,blue]
	    }
	    return undefined
	},

	/*
	 -ref		String.cssToHex
	 -note		parses a properly formatted 6-digit hex color spec from hex or rgb string
	 -returns	String
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = "rgb(256,256,0)".cssToHex()
				//#FFFF00
			</script>
	*/
	cssToHex: function() {
	    var color = '#'
	    var rgbRe = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(this)
	    var hexRe = /^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(this)

	    if(rgbRe) {
		var part;
		for (var i=1; i<=3; i++) {
		    part = Math.max(0, Math.min(255, parseInt(rgbRe[i])));
		    color += (part.toColorPart());
		}
		return color;
	    }
	    else if (hexRe) {
		if(hexRe[1].length == 3) {
		    for (var i=0; i<3; i++) {
			color += hexRe[1].charAt(i) + hexRe[1].charAt(i);
		    }
		    return color;
		}
		return color += hexRe[1];
	    }
	    return false;
	}

});

/*
 -ref		Array
 -returns	Array
 -type		Class
*/
Object.extend(Array.prototype,{

	/*
	 -ref		Array.distributeEvenly
	 -note		distributes elements of an array into a multi-dimetional array as evenly as posible based on a set amount of groups
	 -returns	Array
	 -type		Method
	 -example	<script type="text/javascript">
				var nodes = nodes.distributeEvenly(4)
			</script>
	*/
	distributeEvenly: function(groups){
		var a = []
		var s = Math.floor(this.length / groups)
		new Number(groups).times(function(n){
			a.push(s)
		})
		var r = this.length % groups
		while (r) {
			a[r-1]++
			r--
		}
		for(var i=0; i<a.length; i++){
			a[i] = this.splice(0, a[i])
		}

		return a
	},

	/*
	 -ref		Array.sum
	 -note		sums elements in an array
	 -returns	Number
	 -type		Method
	 -example	<script type="text/javascript">
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
	 -ref		Array.descend
	 -note		sorts elements in an array in desending order
	 -returns	Array
	 -type		Method
	*/
	descend: function(p){
		this.sort(function(a,b){
			if(p){
				a = a[p]
				b = b[p]
			}
			if(!parseInt(a)){
				a = String(a).toUpperCase()
			}
			if(!parseInt(b)){
				b = String(b).toUpperCase()
			}
			if (a > b) return -1;
			if (b > a) return 1;
			return 0;
		});
	},

	/*
	 -ref		Array.ascend
	 -note		sorts elements in an array in ascending order
	 -returns	Array
	 -type		Method
	*/
	ascend: function(p){
		this.sort(function(a,b){
			if(p){
				a = a[p]
				b = b[p]
			}
			if(!parseInt(a)){
				a = String(a).toUpperCase()
			}
			if(!parseInt(b)){
				b = String(b).toUpperCase()
			}

			if (a > b)return 1;
			if (b > a)return -1;
			return 0;
		});
	}
});

/*
 -ref		Number
 -returns	Number
 -type		Class
*/
Object.extend(Number.prototype, {

	/*
	 -ref		Number.suff
	 -note		returns the number given plus the suffix from that number as a string
	 -returns	String
	 -type		Method
	 -example	<script type="text/javascript">
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
	 -ref		Number.roundTo
	 -note		returns the number given plus the suffix from that number as a string
	 -note		provides a decimal places argument to prototypes round method
	 -override
	 -returns	String
	 -arg		Number places optional argument for the decimal places to round the number to
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = (6.4567).roundTo(2)
			</script>
	*/
	roundTo: function(places){
		if(places){
			return Math.round((this+1-1)*(Math.pow(10,places)))/Math.pow(10,places);
		} else {
			return Math.round()
		}
	},

	/*
	 -ref		Number.dollars
	 -note		returns the number given as an American Currency String
	 -returns	String
	 -type		Method
	 -example	<script type="text/javascript">
				var xxx = (6.4567).dollars()
			</script>
	*/
	dollars: function(){
		var num = this.roundTo(2)
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
	 -ref		Number.toRange
	 -note		returns the number if in the range given else return the min or max of the range
			depending on if the number is less then or greater then min and max of the range
	 -returns	Number
	 -type		Method
	 -arg		Number min the minimum number in the range
	 -arg		Number max the maximum number in the range
	 -example	<script type="text/javascript">
				var xxx = (6.4567).toRange(0,5)
				//returns xxx = 5
			</script>
	*/
	toRange: function(min, max){
		return new Number(this).toMin(min).toMax(max)
	},

	/*
	 -ref		Number.toMin
	 -note		returns the number if greater then min else return min
	 -returns	Number
	 -type		Method
	 -arg		Number min the minimum number
	 -example	<script type="text/javascript">
				var xxx = (6.4567).toMin(7)
				//returns xxx = 7
			</script>
	*/
	toMin: function(min){
		if(this >= min){
			return this
		} else {
			return min
		}
	},

	/*
	 -ref		Number.toMax
	 -note		returns the number if less then max else return min
	 -returns	Number
	 -type		Method
	 -arg		Number max the maximum number
	 -example	<script type="text/javascript">
				var xxx = (6.4567).toMax(5)
				//returns xxx = 5
			</script>
	*/
	toMax: function(max){
		if(this <= max){
			return this
		} else {
			return max
		}
	}
});

/*
 -ref		Df.importModule
 -note		load javascript files through inline as the page loads, n waits for n-1 to load
 -type		Static Method
 -arg		*String arguments the filename of the javascript file without the extention or path.
		Uses Df.ClassPath for the path. Multiple arguments allowed
 -example	<script type="text/javascript">
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
 -ref		Df.loadJS
 -type		Static Method
 -arg		*String arguments the filename of the javascript file with the extention and path.
		Multiple arguments allowed
 -note		load javascript files through inline as the page loads, n waits for n-1 to load
 -example	<script type="text/javascript">
			Df.loadJS('/js/df/Df.Tip.js', '/js/df/Df.Navigation.js')
		</script>
*/
Df.loadJS = function () {
	for (var i = 0; i < arguments.length; i++) {
		document.write('<script type="text/javascript" src="'+ arguments[i] +'"></script>');
	}
};


/*
 -ref		Df.ImageCache
 -type		Class
 -returns	Df.ImageCache
 -note		Base class for preloading images and storing as a Hash
 -example	<script type="text/javascript">
			var ImageCache = new Df.ImageCache(
				"xxx","xxx","xxx"
			)
		</script>
 -example	<script type="text/javascript">
			var ImageCache = new Df.ImageCache().load(
				"xxx","xxx","xxx"

			)

			ImageCache.imageHash[escape('xxx')]
		</script>
*/
Df.ImageCache = Class.create({

	initialize: function(){

		/*
		 -ref		Df.ImageCache.imageHash
		 -type		Parameter
		 -arg		*String Images
		 -returns	Hash {escapedUrl: 'ImageObject'}
		 -note		Method for loading an array of images into the DOM
		 -example	<script type="text/javascript">
					var images = new Df.ImageCache(
						"xxx","yyy","zzz"
					)

					images.imageHash.get(escape('xxx'))
				</script>
		*/
		this.imageHash = $H();

		if(arguments && arguments.length > 0){
			this.load($A(arguments))
		}

		return this
	 },

	/*
	 -ref		Df.ImageCache.load
	 -type		Method
	 -arg		*String Images or Array
	 -returns	Df.ImageCache
	 -note		Method for loading images into the dom
	 -example	<script type="text/javascript">
				var ImageCache = new Df.ImageCache().load(
					"xxx","yyy","zzz"

				)
			</script>
	*/
	load: function(){
		var  ary = arguments[0]
		if(arguments.length > 1 || arguments[0].constructor == String){
			ary = $A(arguments)
		}

		for(var i=0; i < ary.length ; i++){
			var image = new Image()
			image.src = ary[i]
			this.imageHash.set([escape(ary[i])], image)
		}
		return this
	},

	/*
	 -ref		Df.ImageCache.get
	 -type		Method
	 -arg		*String Images
	 -returns	ImageObject
	 -note		Method for loading images into the dom
	 -example	<script type="text/javascript">
				var ImageCache = new Df.ImageCache().load(
					"xxx","yyy","zzz"

				)

				ImageCache.get('yyy')
			</script>
	*/
	get: function(url){
		return this.imageHash.get(escape(url))
	}
});

/*
 -ref		Df.e
 -note		creates an element
 -returns	Element
 -type		Method
 -arg		tag String the element to be created
 -arg		pars Object attributes to be applied
 -example	<script type="text/javascript">
			var xxx = Df.e('div',{className: 'testClass'})
		</script>
*/
Df.e = function (tag, pars) {
    var obj = $(document.createElement(tag))
    if (pars) Object.extend(obj, pars)
    return obj
}

/*
 -ref		Df.Namespace
 -returns	Object
 -note		This is the class to use to create or determine if a namespace exists
 -type		Static Class
*/
Df.Namespace = {
	_ary: null,
	_obj: null,
	_exists: false,

	/*
	 -ref		Df.Namespace.create
	 -note		create or retrieve a namespace
	 -note		returns last Object in the namespace string
	 -note		namespaces are created from blank objects if they don't already exist
	 -type		Static Method
	 -arg		String str the complete namespace as a string
	 -arg		Object scope the object to append the namespace objects to. This argument is
			optional. It defaults to window
	 -returns	Object
	 -example	<script type="text/javascript">
				var ns = Df.Namespace.create('Df.xxx.yyy.zzz', window)
			</script>
	 -example	<script type="text/javascript">
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
	 -ref		Df.Namespace.exists
	 -note		checks for the existance of a namespace
	 -type		Static Method
	 -returns	Boolean
	 -arg		String str the complete namespace as a string
	 -arg		Object scope of the namespace object. This argument is
			optional. It defaults to window
	 -example	<script type="text/javascript">
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
 -ref		Df.Event
 -note		this is a mixin for enableing custom events to objects
 -returns	Object
 -type		Static Class
*/
Df.Event = {
	/*
	 -ref		Df.Event.registerEvent
	 -note		registers a new event type.
	 -returns	Df.Event
	 -type		Method
	 -arg		*String name the name of the custom event
	 -example	<script type="text/javascript">
				var e = new Df.Base().registerEvent(':set', ':get', ':delete')
			</script>
	*/
	registerEvent: function () {
		Df.Namespace.create('events', this)

		for (var i = 0; i < arguments.length; i++ ) {
			this.events[arguments[i]] = [];
			this.events[arguments[i]].before = [];
			this.events[arguments[i]].after = [];
		}
		return this;
	},

	/*
	 -ref		Df.Event.unregisterEvent
	 -note		unregisters a new event type.
	 -note		this will also remove all observers
	 -returns	Df.Event
	 -type		Method
	 -arg		*String name the name of the custom event
	 -example	<script type="text/javascript">
				var e = new Df.Base().unregisterEvent(':set', ':get', ':delete')
			</script>
	*/
	unregisterEvent: function () {
		Df.Namespace.create('events', this)

		for (var i = 0; i < arguments.length; i++ ) {
			if (this.events[arguments[i]]) {
				delete this.events[arguments[i]];
			}
		}
		return this;
	},

	/*
	 -ref		Df.Event.observe
	 -note		registers observer functions on an event type.
	 -note		the event types are scoped to the object that initialized the event object
	 -returns	Df.Event
	 -type		Method
	 -arg		String onx the name of the custom event to listen for
	 -arg		Function fn the function that runs on dispatch of the event
	 -example	<script type="text/javascript">
				var e = new Df.Base().register(':set', ':get', ':delete')

				e.observe(':set', function(e){
					alert(e.memo)
				})
			</script>
	 -example	<script type="text/javascript">
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
		Df.Namespace.create('events', this)
		if (Object.isUndefined(this.events[onx]))
			this.registerEvent(onx);
		this.events[onx].push(fn);
		return this;
	},

	observeBefore: function (onx, fn) {
		Df.Namespace.create('events', this)
		if (Object.isUndefined(this.events[onx]))
			this.registerEvent(onx);
		this.events[onx].before.push(fn);
		return this;
	},

	observeAfter: function (onx, fn) {
		Df.Namespace.create('events', this)
		if (Object.isUndefined(this.events[onx]))
			this.registerEvent(onx);
		this.events[onx].after.push(fn);
		return this;
	},

	/*
	 -ref		Df.Event.stopObserving
	 -note		unregisters observer functions on an event type.
	 -note		the event types are scoped to the object that initialized the event object
	 -note		parameter references to binded functions make unobserving posiable
	 -returns	Df.Event
	 -type		Method
	 -arg		String onx the name of the custom event
	 -arg		Function fn the function that is to be removed
	 -example	<script type="text/javascript">
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
		Df.Namespace.create('events', this)
		for (var i = 0; i < this.events[onx].length; i += 1) {
			if (this.events[onx][i] === fn) {
				this.events[onx].splice(i, 1);
			}
		}
		return this;
	},

	stopObservingBefore: function (onx ,fn) {
		Df.Namespace.create('events', this)
		for (var i = 0; i < this.events[onx].before.length; i += 1) {
			if (this.events[onx].before[i] === fn) {
				this.events[onx].before.splice(i, 1);
			}
		}
		return this;
	},

	stopObservingAfter: function (onx ,fn) {
		Df.Namespace.create('events', this)
		for (var i = 0; i < this.events[onx].after.length; i += 1) {
			if (this.events[onx].after[i] === fn) {
				this.events[onx].after.splice(i, 1);
			}
		}
		return this;
	},

	/*
	 -ref		Df.Event.fire
	 -note		fires custom events.
	 -returns	Df.Event
	 -type		Method
	 -arg		String onx the name of the custom event
	 -arg		Object memo object to send to the listener functions
	 -example	<script type="text/javascript">
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
		Df.Namespace.create('events', this)

		if(this.events[onx]){
			var r

			for (var i = 0; i < this.events[onx].before.length; i++) {
				r = this.events[onx].before[i]({target: this, memo: memo});
				if (r && r.memo)
					memo = r.memo
				else if (r === false){
					return this
				}
			}

			for (var i = 0; i < this.events[onx].length; i++) {
				r = this.events[onx][i]({target: this, memo: memo});
				if (r && r.memo)
					memo = r.memo
				else if (r === false){
					return this
				}
			}


			for (var i = 0; i < this.events[onx].after.length; i++) {
				r = this.events[onx].after[i]({target: this, memo: memo});
				if (r && r.memo)
					memo = r.memo
				else if (r === false){
					return this
				}
			}
		}
		return this;
	}

}

/*
 -ref		Df.Base
 -note		Creates a custom event Object and parameters
 -note		Intended to by used on non dom based objects
 -returns	Df.Base
 -extends	Df.Event
 -type		Class
 -example	<script type="text/javascript">
			var e = new Df.Base()
		</script>
*/
Df.Base = Class.create(Df.Event, {
	initialize: function(pars) {

		/*
		 -ref		Df.Base.instances
		 -type		Static Method
		 -returns	Array
		 -note		returns an array of all class instances of Class Type
		 -example	<script type="text/javascript">
					if(Df.Base.instances){
						Df.Base.instances.each(function(v){
							alert(v.constructor)
						})
					}
				</script>
		*/
		this._addThisInstance()
		this._initPars(pars)
		this._setup()

		return this;
	},

	_setup: function(){

	},

	/*
	 -ref		Df.Base.setPars
	 -note		Overrides and or adds parameters to the parameters object
	 -type		Method
	 -returns	Df.Base
	 -arg		Object pars the parameters object
	 -example	<script type="text/javascript">
				var base = new Df.Base().setPars({xxx:"yyy"})
			</script>
	*/
	setPars: function(pars){
		Df.Namespace.create('pars', this)
		if(pars){
			Object.extend( this.pars, pars);
		}
		return this;
	},

	/*
	 -ref		Df.Base.getInstances
	 -type		Static Method
	 -returns	Array
	 -note		returns an array of all class instances of Class Type
	 -example	<script type="text/javascript">
			    if(Df.Base.getInstances()){
				    Df.Base.getInstances().each(function(v){
					    alert(v.constructor)
				    })
			    }
			</script>
	*/
	_addThisInstance: function(){
	    if(Object.isUndefined(this.constructor._instances)){
		this.constructor._instances = []
		this.constructor.getInstances = function(){
		    return this.constructor._instances
		}.bind(this)
	    }
	    this.constructor._instances.push(this)
	},

	_createGettersAndSetters: function(){
	    this._createSetters()
	    this._createGetters()
	    return this
	},

	_createSetters: function(){
		for(p in this.pars){
		    var pl = p.capFirstChar()

		    if (!this['set' + pl]) {
			this['set' + pl] = function (p, obj) {
			    this.pars[p] = obj
			    return this
			}.bind(this, p)
		    }
		}
		return this
	},

	_createGetters: function(){
		for(p in this.pars){
		    var pl = p.capFirstChar()

		    if (!this['get' + pl]) {
			this['get' + pl] = function (p) {
			    return this.pars[p]
			}.bind(this, p)
		    }
		}
		return this
	},

	_initPars: function(pars) {
		this.setPars(pars)
	}
});

/*
 -ref		Df.Element
 -note		creates an Element object
 -returns	Df.Element
 -type		Class
 -extends	Df.Base
 -example	<script type="text/javascript">
			var e = new Df.Element('xxx')
		</script>
*/
Df.Element = Class.create(Df.Base, {

	initialize: function($super, element, pars){
		this.element = this.createOrGetElementReference(element);
		$super(pars)
		return this
	},

	_setup: function($super){
		this._stopBubble()
		$super()
	},

	/*
	 -ref		Df.Element.createOrGetElementReference
	 -type		Method
	 -arg		element String|Node optional
	 -returns	Node
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
	 -ref		Df.Ui.getElement
	 -type		Method
	 -note		gets the native element that was used to create the instance of Df.Ui
	 -returns	Element
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set()
				var nativeNode = element.getElement()
			</script>
	*/
	getElement: function() {
		return this.element;
	},

	_stopBubble: function() {
		if(this.pars.stopBubble && this.pars.stopBubble.length > 0){
			this.pars.stopBubble.each(function(v){
				this.element.observe(v, function(e){
					e.stop()
				})
			}.bind(this))
		}
	}

})

/*
 -ref		Df.Ui
 -type		Class
 -returns       Df.Ui
 -note		Base class for instance based classes that are build on a ui object
 -event		this.element :set fires when the set method is complete
 -event		this.element :show fires when the elements is told to show itself
 -event		this.element :shown fires when the element is finished its show process
 -event		this.element :hide fires when the elements is told to hide itself
 -event		this.element :hidden fires when the element is finished its hide process
 -arg		String|Element element an extended dom node or dom node id string
 -extends	Df.Element
 -example	<script type="text/javascript">
			var element = new Df.Ui('xxx')
		</script>
*/
Df.Ui = Class.create(Df.Element, {

	_setup: function($super){

		this.togglePanes = []
		this.status = false
		this.displayStatus = false

		$super()

		this._animationCompleteEvent = this.animationCompleteEvent.bindAsEventListener(this)

		if(this.pars.animate){
			this.animate = new Df.Animate(this.getElement(), this.pars.animate);
			this.animate.getElement().observe(':complete', this._animationCompleteEvent);

		} else {
			this.animate = false
		}

		if(this.pars.drag){
			this.drag = new Df.Drag(this.getElement(), this.pars.drag);
			this.drag.enable()
		}else {
			this.drag = false
		}

		if(this.pars.resize){
			this.resize = new Df.Resize(this.getElement(), this.pars.resize);
			this.resize.enable()
		}else {
			this.resize = false
		}

		if(this.pars.scroll){
			this.scroll = new Df.Scroll(this.getElement(), this.pars.scroll);
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

		if(this.pars.displayStateId){
			this._displayStateCookie = new Df.Cookie({
				name: 'df_ui_display_state'
			})

			var o = this._displayStateCookie.getCookie()

			if(o && o[this.pars.displayStateId] == 1){
				this._displayStateFirstRunFlag = true
				this.show()
			}
		}

		return this;
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({

			/*
			 -ref		Df.Ui.pars.displayStateId
			 -type		Parameter
			 -returns	String
			 -default	false
			 -note		unique at for storing the display state of the ui instance
			*/
			displayStateId: false,

			/*
			 -ref		Df.Ui.pars.showClassName
			 -type		Parameter
			 -returns	String
			 -default	df_element_show
			 -note		classname to assign during the show process of the element
			*/
			showClassName: 'df_element_show',

			/*
			 -ref		Df.Ui.pars.hideClassName
			 -type		Parameter
			 -returns	String
			 -default	df_element_hide
			 -note		classname to assign during the hide process of the element
			*/
			hideClassName: 'df_element_hide',

			/*
			 -ref		Df.Ui.pars.animate
			 -type		Parameter
			 -returns	Boolean|Df.Animate.pars
			 -default	false
			 -note		pars object you want to initialize Df.Animate with
			 -example	<script type="text/javascript">
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
			 -ref		Df.Ui.pars.drag
			 -type		Parameter
			 -returns	Boolean|Df.Drag.pars
			 -default	false
			 -note		pars object you want to initialize Df.Drag with
			 -example	<script type="text/javascript">
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
			 -ref		Df.Ui.pars.resize
			 -type		Parameter
			 -returns	Boolean|Df.Resize.pars
			 -default	false
			 -note		pars object you want to initialize Df.Drag with
			 -example	<script type="text/javascript">
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
			 -ref		Df.Ui.pars.scroll
			 -type		Parameter
			 -returns	Boolean|Df.Scroll.pars
			 -default	false
			 -note		pars object you want to initialize Df.Scroll with
			 -example	<script type="text/javascript">
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
			 -ref		Df.Ui.pars.iframe
			 -type		Parameter
			 -returns	Boolean
			 -default	false
			 -note		if set to true an iframe will be prepended to the element on show
					of the element.
			 -note		It will be hiddden on hide of the element
			*/
			iframe: false,

			/*
			 -ref		Df.Ui.pars.onSet
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onSet: false,

			/*
			 -ref		Df.Ui.pars.onHide
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onHide: false,

			/*
			 -ref		Df.Ui.pars.onShow
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onShow: false,

			/*
			 -ref		Df.Ui.pars.onHidden
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onHidden: false,

			/*
			 -ref		Df.Ui.pars.onShown
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onShown: false
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.Ui.togglePane
	 -type		Method
	 -delegate	Df.TogglePane
	 -arg		Element|String element
	 -arg		Df.TogglePane.pars pars appends this as the controller par
	 -note		Creates an instance of Df.TogglePane with this as the controller
	 -returns	Df.TogglePane
	 -example	<script type="text/javascript">
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
		var togglePane = new Df.TogglePane(element, pars)
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
	 -ref		Df.Ui.show
	 -type		Method
	 -note		Shows the element by running its animation and assigning showClassName parameter
	 -note		show sets this.status = true and then calls this.showByStatus
	 -returns	Df.Ui
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()
			</script>
	 -example	<script type="text/javascript">
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
	 -ref		Df.Ui.showByStatus
	 -type		Method
	 -note		Shows the element by running its animation and assigning showClassName parameter
	 -note		showByStatus checks to make sure that this.status is true and
			this.displayStatus is false and then calls this.showActions
	 -returns	Df.Ui
	*/
	showByStatus: function(e){
		if( this.status && !this.displayStatus ){
			this.showActions(e)
		}
		return this;
	},

	/*
	 -ref		Df.Ui.showActions
	 -type		Method
	 -note		Shows the element by running its animation and assigning showClassName parameter
	 -note		Shows the element only if it is not already being shown
	 -fire		this.element :show
	 -fire		this.element :shown
	 -returns	Df.Ui
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).showActions()
			</script>
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					showClassName: 'displayNow'
				).showActions()
			</script>
	*/
	showActions: function(e){
		this.status = true

		if(!this.displayStatus ){

			this.displayStatus = true

			if(this.pars.showClassName) {
				this.getElement().addClassName(this.pars.showClassName)
			}

			if(this.pars.hideClassName){
				this.getElement().removeClassName(this.pars.hideClassName)
			}

                        this.element.fire(':show');

			if(this.pars.onShow){
				this.pars.onShow(this)
			}

			if (this.animate) {
				if (this.animate.getHistoryCount() == 0) {
					var f = null
					if(this._displayStateFirstRunFlag){
						var f = true
					}
					this.animate.run(false, false, f);
					this._displayStateFirstRunFlag = null

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

		if(Prototype.Browser.ie6 && this.pars.iframe){
			this.showIframe();
		}

		this.element.fire(':shown');

		if(this.pars.onShown){
			this.pars.onShown(this)
		}

		if(this.pars.displayStateId){
			var o = this._displayStateCookie.getCookie()
			if(!o){
				var o = {}
			}
			o[this.pars.displayStateId] = 1
			this._displayStateCookie.setData(o)
		}
	},

	/*
	 -ref		Df.Ui.hide
	 -type		Method
	 -note		Hides the element by reverting its animation and assigning hideClassName parameter
	 -note		hide sets this.status = false and then calls this.hideByStatus
	 -returns	Df.Ui
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()

				element.getElement().observe('click', element.hide)
			</script>
	 -example	<script type="text/javascript">
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
	 -ref		Df.Ui.hideByStatus
	 -type		Method
	 -note		Hides the element by reverting its animation and assigning hideClassName parameter
	 -note		checks to make sure that this.status is false and
			this.displayStatus is true and then calls this.hideActions
	 -returns	Df.Ui
	*/
	hideByStatus: function(e){
		if(!this.status && this.displayStatus){
			this.hideActions(e)
		}
		return this
	},

	/*
	 -ref		Df.Ui.hideActions
	 -type		Method
	 -note		Hides the element by reverting its animation and assigning hideClassName parameter
	 -note		hideActions only runs if this.displayStatus is true
	 -fire		this.element :hide
	 -fire		this.element :hidden
	 -returns	Df.Ui
	 -example	<script type="text/javascript">
				var element = new Df.Ui('xxx').set(
					animate: {
						opacity: .75
					}
				).show()

				element.getElement().observe('click', element.hideActions)
			</script>
	 -example	<script type="text/javascript">
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

                if(Prototype.Browser.ie6 && this.pars.iframe){
			this.hideIframe();
		}

		this.element.fire(':hidden');

		if(this.pars.onHidden){
			this.pars.onHidden(this)
		}

		if(this.pars.displayStateId){
			var o = this._displayStateCookie.getCookie()
			if(!o){
				var o = {}
			}
			o[this.pars.displayStateId] = 0
			this._displayStateCookie.setData(o)
		}
	},

	/*
	 -ref		Df.Ui.showIframe
	 -type		Method
	 -note		creates or displays blocking iframe for ie6
	 -note		attempts to size and position the frame to the element
	 -note		prepends the iframe to the element
	 -note		called by this.showActions
	 -returns	Df.Ui
	*/
	showIframe: function(){
		if(this.iframe){
			this.iframe.style.display = "block";
		}else{
			var html = '<iframe class="ie6BlockerFrame" src="/js/blank.html" style="display:block; left:'+ this.element.getStyle('left') +'; position:absolute; top:'+ this.element.getStyle('top') +'; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" src="javascript:void(0);" frameborder="0" height="'+ parseInt( this.element.offsetHeight) +'px" width="'+ parseInt( this.element.offsetWidth) +'px"></iframe>'
			this.element.insert({before: html});
			this.iframe = this.element.previous('iframe')
		}
		return this
	},

	/*
	 -ref		Df.Ui.hideIframe
	 -type		Method
	 -note		hides the iframe
	 -note		called by this.hideActions
	 -returns	Df.Ui
	*/
	hideIframe: function(){
		if(this.iframe){
			this.iframe.style.display = "none";
		}
		return this
	}
});

/*
 -ref		Df.UiCollection
 -type		Class
 -returns	Df.UiCollection
 -extends	Df.Ui
 -arg		String|Element element an extended dom node or dom node id string
 -note		Base class for instance based classes that are collections of ui objects
*/
Df.UiCollection = Class.create(Df.Ui, {

	_setup: function($super){
		this.items = [];
		this.buildItems();
		$super()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({
			/*
			 -ref		Df.UiCollection.pars.collection
			 -type		Parameter
			 -returns	Df.UiCollection
			 -note		passed to collection items as a reference back to the collection
			*/
			collection: this
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.UiCollection.getItems
	 -type		Method
	 -returns	Array
	 -note		gets all the items of the collection
	*/
	getItems: function () {
		return this.items;
	},

	/*
	 -ref		Df.UiCollection.getItem
	 -type		Method
	 -returns	Df.Ui
	 -arg		Number i index of the items array to return
	 -note		gets an item of the collection
	*/
	getItem: function (i) {
		return this.items[i];
	},

	/*
	 -ref		Df.UiCollection.showOnlyItem
	 -type		Method
	 -returns	Df.Ui
	 -arg		Number|Df.Ui type index of the items array or ui instance to display
	 -note		shows an ui instance of the collection
	 -note		all other ui instances with be hidden
	*/
	showOnlyItem: function (type) { //index or instance
		var openItems = this.getShownItems()
		for(var i=0; i < openItems.length; i++){
			openItems[i].hide();
		}
		return this.showItem(type)
	},

	/*
	 -ref		Df.UiCollection.getShownItems
	 -type		Method
	 -returns	Array
	 -note		gets an array of all items in the collection that have this.displayStatus set to true
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
	 -ref		Df.UiCollection.getHiddenItems
	 -type		Method
	 -returns	Array
	 -note		gets an array of all items in the collection that have this.displayStatus set to false
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
	 -ref		Df.UiCollection.getInstanceItemIndex
	 -type		Method
	 -returns	Number
	 -arg		Df.Ui
	 -note		gets the index in the collection for an item instance
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
	 -ref		Df.UiCollection.showItem
	 -type		Method
	 -returns	Df.Ui
	 -arg		Df.Ui|Number type index of the items array or ui instance to display
	 -note		shows an item in the collection
	*/
	showItem: function (type) { //index or instance
		if(type.constructor == Number){
			return this.items[type].show();
		}else{
			return type.show();
		}
	},

	/*
	 -ref		Df.UiCollection.showItems
	 -type		Method
	 -returns	Df.UiCollection
	 -note		shows all the items of the collection
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
	 -ref		Df.UiCollection.hideItem
	 -type		Method
	 -returns	Df.Ui
	 -arg		Number index index of the items array to hide
	 -note		hides an item of the collection
	*/
	hideItem: function (index) {
		return this.items[index].hide();
	},

	/*
	 -ref		Df.UiCollection.hideItems
	 -type		Method
	 -returns	Df.UiCollection
	 -note		hides all the items of the collection
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
	 -ref		Df.UiCollection.toggleItem
	 -type		Method
	 -returns	Df.UiCollection
	 -arg		Number index index of the items array to toggle
	 -note		toggles show or hide of an item of the collection
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
	 -ref		Df.UiCollection.toggleItems
	 -type		Method
	 -returns	Df.UiCollection
	 -note		toggles the display of all items in the collection
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
	 -ref		Df.UiCollection.buildItems
	 -type		Method
	 -returns	Df.UiCollection
	 -note		method used to build the items of the collection
	 -note		intended to be overridden
	 -example	<script type="text/javascript">
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
			if(this.pars.displayStateId){
				this.pars.displayStateId += '_' + i
			}
			this.items.push( new Df.Ui( $(elem[i]) ).set(this.pars) );
		}
	}
});

/*
 -ref		Df.TogglePane
 -extends	Df.Ui
 -returns	Df.TogglePane
 -demo		../demos/toggleElements.html simple example showing how easy it is to control elements
		through events and animation
 -type		Class
 -arg		string|Element element an extended dom node or dom node id string
 -note		Base class for instance based classes that panes contolled visually by another ui object
 -example	<script type="text/javascript">
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

	_setup: function($super){
		this._controllerClickObserver = this.controllerClickObserver.bindAsEventListener(this)
		this._controllerHoverOverObserver = this.controllerHoverOverObserver.bindAsEventListener(this)
		this._controllerHoverOutObserver = this.controllerHoverOutObserver.bindAsEventListener(this)
		this._paneHoverOverObserver = this.paneHoverOverObserver.bindAsEventListener(this)
		this._paneHoverOutObserver = this.paneHoverOutObserver.bindAsEventListener(this)

		this.element.observe(':show', this.addActiveTitleState.bind(this));
		this.element.observe(':hidden', this.removeActiveTitleState.bind(this));

		$super()

		this.eventType()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({
			/*
			 -ref		Df.TogglePane.pars.toggleShowDelay
			 -type		Parameter
			 -returns	Number
			 -default	250
			 -note		milliseconds to pause before showing element
			 -hint		Only available for hover event type
			 -example	<script type="text/javascript">
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
			 -ref		Df.TogglePane.pars.toggleHideDelay
			 -type		Parameter
			 -default	250
			 -returns	Number
			 -note		milliseconds to pause before hiding element
			 -hint		Only available for hover event type
			 -example	<script type="text/javascript">
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
			 -ref		Df.TogglePane.pars.activeControllerClassName
			 -type		Parameter
			 -returns	String
			 -default	activeController
			 -note		class assigned to the controller element on show of the toggle element
			*/
			activeControllerClassName: 'activeController',

			/*
			 -ref		Df.TogglePane.pars.treatAsMenu
			 -type		Parameter
			 -default	true
			 -returns	Boolean
			 -hint		only available for hover event type
			 -note		allows you to move your mouse onto the toggle element and keep it displayed
			 -note		used for ui types like tips and dropnavs
			*/
			treatAsMenu: true,

			/*
			 -ref		Df.TogglePane.pars.controller
			 -type		Parameter
			 -default	false
			 -returns	Df.Ui
			 -hint		this parameter must be set
			 -note		the controlling ui element for the showing and hiding of the
					toggle element
			*/
			controller: false,

			/*
			 -ref		Df.TogglePane.pars.eventType
			 -type		Parameter
			 -default	hover
			 -choice	hover
			 -choice	click
			 -returns	String
			 -hint		this parameter must be set
			 -note		the event type that triggers showing and hiding the toggle element
			*/
			eventType: 'hover' //hover|click
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.TogglePane.eventType
	 -type		Method
	 -returns	Df.TogglePane
	 -arg		Df.TogglePane.pars.eventType type can be click, hover, false
	 -note		sets or changes the event type handlers
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
	 -ref		Df.TogglePane.addHoverEvent
	 -type		Method
	 -note		sets up the event handlers for hover
	 -note		not intended to use used directly
	 -note		intended to be overriden
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
	 -ref		Df.TogglePane.removeHoverEvent
	 -type		Method
	 -note		removes the event handlers for hover
	 -note		not intended to use used directly
	 -note		intended to be overriden
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
	 -ref		Df.TogglePane.addClickEvent
	 -type		Method
	 -note		sets up the event handlers for click
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	addClickEvent: function(){
		this.pars.controller.getElement().observe(
			'click',
			this._controllerClickObserver
		);
	},

	/*
	 -ref		Df.TogglePane.removeClickEvent
	 -type		Method
	 -note		removes the event handlers for click
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	removeClickEvent: function(){
		this.pars.controller.getElement().stopObserving(
			'click',
			this._controllerClickObserver
		);
	},

	/*
	 -ref		Df.TogglePane.controllerClickObserver
	 -type		Method
	 -note		adds the event handlers for click on the controller element
	 -note		called as part of addClickEvent
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	controllerClickObserver: function(e){
		if(this.status && this.displayStatus){
			this.hideClickObserver(e)
		}
		else if (!this.status && !this.displayStatus) {
			this.showClickObserver(e)
		}
	},

	/*
	 -ref		Df.TogglePane.hideClickObserver
	 -type		Method
	 -note		adds the event handlers for click on the element
	 -note		called as part of controllerClickObserver
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	hideClickObserver: function(e){
		this.hide(e)
	},

	/*
	 -ref		Df.TogglePane.showClickObserver
	 -type		Method
	 -note		adds the event handlers for click on the element
	 -note		called as part of controllerClickObserver
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	showClickObserver: function(e){
		this.show(e)
	},

	/*
	 -ref		Df.TogglePane.controllerHoverOverObserver
	 -type		Method
	 -note		adds the event handlers for hover on the controller element
	 -note		called as part of addHoverEvent
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	controllerHoverOverObserver: function(e){
		Event.stop(e);
		this.status = true
		setTimeout( this.showByStatus.bind(this), this.pars.toggleShowDelay)
	},

	/*
	 -ref		Df.TogglePane.controllerHoverOutObserver
	 -type		Method
	 -note		adds the event handlers for hover on the controller element
	 -note		called as part of addHoverEvent
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	controllerHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		setTimeout( this.hideByStatus.bind(this), this.pars.toggleHideDelay)
	},

	/*
	 -ref		Df.TogglePane.paneHoverOverObserver
	 -type		Method
	 -note		adds the event handlers for hover on the toggle element
	 -note		called as part of addHoverEvent
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	paneHoverOverObserver: function(e){
		Event.stop(e);
		this.status = true
	},

	/*
	 -ref		Df.TogglePane.paneHoverOutObserver
	 -type		Method
	 -note		adds the event handlers for hover on the toggle element
	 -note		called as part of addHoverEvent
	 -note		not intended to use used directly
	 -note		intended to be overriden
	*/
	paneHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		setTimeout( this.hideByStatus.bind(this), this.pars.toggleHideDelay)
	},

	/*
	 -ref		Df.TogglePane.removeActiveTitleState
	 -type		Method
	 -returns	Df.TogglePane
	 -note		removes the activeControllerClassName parameter to the controller element on hide
	*/
	removeActiveTitleState: function(e){
		Event.stop(e)
		if( this.pars.activeControllerClassName){
			this.pars.controller.element.removeClassName( this.pars.activeControllerClassName );
		}
		return this
	},

	/*
	 -ref		Df.TogglePane.addActiveTitleState
	 -type		Method
	 -returns	Df.TogglePane
	 -note		adds the activeControllerClassName parameter to the controller element on show
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
 -ref		Df.Cookie
 -extends	Df.Base
 -returns	Df.Cookie
 -demo		../demos/cookie.html create, show, modify, delete cookies
 -note		Makes document.cookie object easy to work with
 -type		Class
 -event		this :get
 -event		this :set
 -event		this :delete
*/
Df.Cookie = Class.create(Df.Base, {
	_setup: function($super) {
		$super()
		this._createGetters()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({

			/*
			 -ref		Df.Cookie.pars.name
			 -type		Parameter
			 -returns	String
			 -default	df
			 -note		the name of the cookie
			*/
			name: 'df',

			/*
			 -ref		Df.Cookie.pars.path
			 -type		Parameter
			 -returns	Boolean|String
			 -default	false
			 -note		the path of the cookie
			*/
			path: false,

			/*
			 -ref		Df.Cookie.pars.domain
			 -type		Parameter
			 -returns	Boolean|String
			 -default	false
			 -note		the domain of the cookie
			*/
			domain:false,

			/*
			 -ref		Df.Cookie.pars.expires
			 -type		Parameter
			 -returns	Boolean|String
			 -default	false
			 -note		the expiration date of the cookie
			*/
			expires:false,

			/*
			 -ref		Df.Cookie.pars.data
			 -type		Parameter
			 -returns	Boolean|String|Object|Array|Number
			 -default	false
			 -note		the date of the cookie
			*/
			data: false,

			/*
			 -ref		Df.Cookie.pars.onSet
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onSet: false,

			/*
			 -ref		Df.Cookie.pars.onGet
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onGet: false,

			/*
			 -ref		Df.Cookie.pars.onDelete
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onDelete: false
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.Cookie.setName
	 -fire		this :set
	 -arg		name String
	 -type		method
	 -returns	Df.Cookie
	*/
	/*
	 -ref       	Df.Cookie.getName
	 -type      	method
	 -returns   	String
	*/
	setName: function (name) {
		this.pars.name = name
		this.setCookie()
		return this
	},

	/*
	 -ref		Df.Cookie.setData
	 -fire		this :set
	 -arg		data Object
	 -type		method
	 -returns	Df.Cookie
	*/
	/*
	 -ref       	Df.Cookie.getData
	 -type      	method
	 -returns   	String
	*/
	setData: function (data) {
		this.pars.data = data
		this.setCookie()
		return this
	},

	/*
	 -ref		Df.Cookie.setPath
	 -fire		this :set
	 -arg		path String
	 -type		method
	 -returns	Df.Cookie
	*/
	/*
	 -ref       	Df.Cookie.getPath
	 -type      	method
	 -returns   	String
	*/
	setPath: function (path) {
		this.pars.path = path
		this.setCookie()
		return this
	},

	/*
	 -ref		Df.Cookie.setDomain
	 -fire		this :set
	 -arg		domain String
	 -type		method
	 -returns	Df.Cookie
	*/
	/*
	 -ref       	Df.Cookie.getDomain
	 -type      	method
	 -returns   	String
	*/
	setDomain: function (domain) {
		this.pars.domain = domain
		this.setCookie()
		return this
	},

	/*
	 -ref		Df.Cookie.setExpires
	 -fire		this :set
	 -arg		expires Date
	 -type		method
	 -returns	Df.Cookie
	*/
	/*
	 -ref       	Df.Cookie.getExpires
	 -type      	method
	 -returns   	String
	*/
	setExpires: function (expires) {
		this.pars.expires = expires
		this.setCookie()
		return this
	},

	/*
	 -ref		Df.Cookie.setCookie
	 -type		Method
	 -returns	Df.Cookie
	 -arg		Df.Cookie.pars pars
	 -fire		this :set sends cookie as a memo
	 -note		writes the cookie
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
	 -ref		Df.Cookie.deleteCookie
	 -type		Method
	 -returns	Df.Cookie
	 -fire		this :delete sends cookie as a memo
	 -note		deletes the cookie
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
	 -ref		Df.Cookie.getCookie
	 -type		Method
	 -returns	Df.Cookie
	 -fire		this :get sends cookie as a memo
	 -note		returns the cookie data
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
 -ref		Df.Scroll
 -extends	Df.Element
 -type		Class
 -returns	Df.Scroll
 -arg		String|Element element an extended dom node or dom node id string
 -event		this.element :mousewheel
*/
Df.Scroll = Class.create(Df.Element, {

	_setup: function($super){

		this.startPointerX
		this.startPointerY
		this.startScrollTop
		this.startScrollLeft

		this.__mouseWheelObserver = this._mouseWheelObserver.bind(this)
		this.__scrollContentObserver = this._scrollContentObserver.bind(this)
		this.__mouseMoveObserver = this._mouseMoveObserver.bind(this)
		this.__mouseDownDragObserver = this._mouseDownDragObserver.bind(this)

		$super()

                this.element.observe("mousewheel", this.__mouseWheelObserver);
		this.element.observe("DOMMouseScroll", this.__mouseWheelObserver);
		this.element.observe(':resize', this.adjustToContent.bind(this))

		if(this.pars.moveEvent == 'drag'){
			Event.observe(document, 'mouseup', function(e){
				this.element.stopObserving('mousemove', this.__mouseMoveObserver)
			}.bind(this))
			this.element.observe('click', function(e){
				e.stop()
			}.bind(this))
		}

                this.adjustToContent()
        },

	_initPars: function($super, pars){
		$super()
		this.setPars({
			onMousewheel: false,
			moveEvent: false, //hover|drag|false
			incrementPercent: .02,
			incrementPixel: false
		})
		this.setPars(pars)
	},

	adjustToContent: function(e){
                this.element.stopObserving(':mousewheel', this.__scrollContentObserver)
		this.element.stopObserving('mousedown', this.__mouseDownDragObserver)
		this.element.stopObserving('mousemove', this.__mouseMoveObserver)

		if(this.element.getHeight() < this.element.scrollHeight || this.element.getWidth() < this.element.scrollWidth){

			if(this.pars.moveEvent == 'drag'){
				this.element.observe('mousedown', this.__mouseDownDragObserver)
			}

			if(this.pars.moveEvent == 'hover'){
				this.element.observe('mousemove', this.__mouseMoveObserver)
			}

			if (this.element.getHeight() < this.element.scrollHeight) {
				this.element.observe(':mousewheel', this.__scrollContentObserver);
			}
		}
	},

	_getIncrementY: function(){
		if(this.pars.incrementPixel){
			return this.pars.incrementPixel
		}else{
			return parseInt(this.pars.incrementPercent * this.element.scrollHeight)
		}
	},

	_getIncrementX: function(){
		if(this.pars.incrementPixel){
			return this.pars.incrementPixel
		}else{
			return parseInt(this.pars.incrementPercent * this.element.scrollWidth)
		}
	},

	incrementUp: function(){
		return this.moveY(this.element.scrollTop - this._getIncrementY())
	},

	incrementDown: function(){
		return this.moveY(this.element.scrollTop + this._getIncrementY())
	},

	incrementLeft: function(){
		return this.moveX(this.element.scrollLeft + this._getIncrementX())
	},

	incrementRight: function(){
		return this.moveX(this.element.scrollLeft - this._getIncrementX())
	},

	moveY: function(y){
		y = y.toRange(0, this.element.scrollHeight)
		if(y != this.element.scrollTop){
			this.element.scrollTop = y
			this.element.fire(':scrollY', {y: y, instance: this})
		}
		return this;
	},

	moveX: function(x){
		x = x.toRange(0, this.element.scrollWidth)
		if(x != this.element.scrollLeft){
			this.element.scrollLeft = x
			this.element.fire(':scrollX', {x: x, instance: this})
		}
		return this
	},

	zoomLeftPosition: function(e){
		return  parseInt((this.element.getPointerX(e) / this.element.getWidth()) * (this.element.scrollWidth - this.element.getWidth()));
	},

	zoomTopPosition: function(e){
		return  parseInt((this.element.getPointerY(e) / this.element.getHeight()) * (this.element.scrollHeight - this.element.getHeight()));
	},

	zoomLeftPositionDrag: function(e){
		return this.startScrollLeft + (this.startPointerX - this.element.getPointerX(e))
	},

	zoomTopPositionDrag: function(e){
		return this.startScrollTop + (this.startPointerY - this.element.getPointerY(e))
	},

	mouseWheelDelta: function(e){
		var delta = 0;
		if (e.wheelDelta){
			delta = e.wheelDelta/120;
			if (window.opera)
				delta = -delta;
		}
		else if(e.detail){
			delta = -e.detail/3;
		}
		return delta;
	},

	_mouseMoveObserver: function(e){
		e.stop()
		if(this.pars.moveEvent === 'hover'){
			this.moveY(this.zoomTopPosition(e))
			this.moveX(this.zoomLeftPosition(e))
		}
		else if (this.pars.moveEvent === 'drag'){
			this.moveY(this.zoomTopPositionDrag(e))
			this.moveX(this.zoomLeftPositionDrag(e))
		}
	},

	_mouseDownDragObserver: function(e){
		e.stop()
		this.startPointerX = this.element.getPointerX(e)
		this.startPointerY = this.element.getPointerY(e)
		this.startScrollTop = this.element.scrollTop
		this.startScrollLeft = this.element.scrollLeft
		this.element.observe('mousemove', this.__mouseMoveObserver)
	},

        _mouseWheelObserver: function(e){
                e.stop()
                this.element.fire(':mousewheel',{delta:this.mouseWheelDelta(e)});

                if(this.pars.onMousewheel)
                        this.pars.onMousewheel(this, e)
	},

	_scrollContentObserver: function(e){
		if(e.memo.delta > 0){
			this.incrementUp()
		}
		else if(e.memo.delta < 0){
			this.incrementDown()
		}
		return this
	}

});

/*
 -ref		Df.Transitions
 -type		Static Class
 -returns	Object
 -note		adds a ton of Robert Penner's Easings equations
 -author	Robert Penner, <http://www.robertpenner.com/easing/>
 -license	Easing Equations v1.5, (c) 2003 Robert Penner, all rights reserved. Open Source BSD License.
 -example	<script type="text/javascript">
			$('xxx').animate({
				padding: 600,
				ease: Df.Transitions.cubicOut
			})
		</script>
*/
Df.Transitions = {

	/*
	 -ref		Df.Transitions.linear
	 -type		Static Method
	 -returns	Number
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -note		the default easing for Df.Animate
	*/
	linear: function(t, b, c, d){
		return c*t/d + b;
	},

	/*
	 -ref		Df.Transitions.quadIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quadIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},

	/*
	 -ref		Df.Transitions.quadOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quadOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},

	/*
	 -ref		Df.Transitions.quadInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quadInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},

	/*
	 -ref		Df.Transitions.cubicIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	cubicIn: function(t, b, c, d){
		return c*(t/=d)*t*t + b;
	},

	/*
	 -ref		Df.Transitions.cubicOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	cubicOut: function(t, b, c, d){
		return c*((t=t/d-1)*t*t + 1) + b;
	},

	/*
	 -ref		Df.Transitions.cubicInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	cubicInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},

	/*
	 -ref		Df.Transitions.quartIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quartIn: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},

	/*
	 -ref		Df.Transitions.quartOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quartOut: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},

	/*
	 -ref		Df.Transitions.quartInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quartInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},

	/*
	 -ref		Df.Transitions.quintIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quintIn: function(t, b, c, d){
		return c*(t/=d)*t*t*t*t + b;
	},

	/*
	 -ref		Df.Transitions.quintOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quintOut: function(t, b, c, d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},

	/*
	 -ref		Df.Transitions.quintInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	quintInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},

	/*
	 -ref		Df.Transitions.sineIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	sineIn: function(t, b, c, d){
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},

	/*
	 -ref		Df.Transitions.sineOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	sineOut: function(t, b, c, d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},

	/*
	 -ref		Df.Transitions.sineInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	sineInOut: function(t, b, c, d){
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},

	/*
	 -ref		Df.Transitions.expoIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	expoIn: function(t, b, c, d){
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},

	/*
	 -ref		Df.Transitions.expoOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	expoOut: function(t, b, c, d){
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},

	/*
	 -ref		Df.Transitions.expoInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	expoInOut: function(t, b, c, d){
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},

	/*
	 -ref		Df.Transitions.circIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	circIn: function(t, b, c, d){
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},

	/*
	 -ref		Df.Transitions.circOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	circOut: function(t, b, c, d){
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},

	/*
	 -ref		Df.Transitions.circInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	circInOut: function(t, b, c, d){
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},

	/*
	 -ref		Df.Transitions.elasticIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number a factor optional
	 -arg		Number p factor optional
	 -returns	Number
	*/
	elasticIn: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3; if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},

	/*
	 -ref		Df.Transitions.elasticOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number a factor optional
	 -arg		Number p factor optional
	 -arg		Number a factor optional
	 -arg		Number p factor optional
	 -returns	Number
	*/
	elasticOut: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3; if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},

	/*
	 -ref		Df.Transitions.elasticInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number a factor optional
	 -arg		Number p factor optional
	 -returns	Number
	*/
	elasticInOut: function(t, b, c, d, a, p){
		if (t==0) return b; if ((t/=d/2)==2) return b+c; if (!p) p=d*(.3*1.5); if (!a) a = 1;
		if (a < Math.abs(c)){ a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin(c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},

	/*
	 -ref		Df.Transitions.backIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number s factor optional
	 -returns	Number
	*/
	backIn: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},

	/*
	 -ref		Df.Transitions.backOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number s factor optional
	 -returns	Number
	*/
	backOut: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},

	/*
	 -ref		Df.Transitions.backInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -arg		Number s factor optional
	 -returns	Number
	*/
	backInOut: function(t, b, c, d, s){
		if (!s) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},

	/*
	 -ref		Df.Transitions.bounceIn
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	bounceIn: function(t, b, c, d){
		return c - Df.Transitions.bounceOut (d-t, 0, c, d) + b;
	},

	/*
	 -ref		Df.Transitions.bounceOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
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
	 -ref		Df.Transitions.bounceInOut
	 -type		Static Method
	 -arg		Number t current iteration
	 -arg		Number b current value
	 -arg		Number c total value delta
	 -arg		Number d total iterations
	 -returns	Number
	*/
	bounceInOut: function(t, b, c, d){
		if (t < d/2) return Df.Transitions.bounceIn(t*2, 0, c, d) * .5 + b;
		return Df.Transitions.bounceOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
	},

	/*
	 -ref		Df.Transitions.highlight
	 -type		Static Method
	 -returns	Number
	 -arg		t Number current iteration
	 -arg		b Number current value
	 -arg		c Number total value delta
	 -arg		d Number total iterations
	 -note		the rails like notices
	 -example	<script type="text/javascript">
			    $('xxx').setStyle({opacity:0})
				    .animationOptions({transition: Df.Transitions.highlight})
				    .animate({opacity:1})
			</script>
	*/
	highlight: function(t, b, c, d){
	    if(t/d < .2){
		return c*t/d/.2 + b
	    } else if(t/d > .6){
		return c*(1-t/d)/.4 + b
	    } else {
		return b + c
	    }
	}

};

/*
 -ref		Df.Animate
 -extends	Df.Element
 -note		give an element a convenient way to change its visual properties in a stepping way
 -type		Class
 -arg		String|Element element an extended dom node or dom node id string
 -hint		Element must be positioned Absolute or relative if animating top or left
 -hint		Animation parameters map to and change css styles
 -hint		no color keywords allowed
 -demo		../demos/animate_easing.html interactive demo allows you to choose easing, duration, and pause between each iteration. Also
		tracks the animation history and allows you to revert to previous animation steps.
 -demo		../demos/animate_selectors.html interactive demo allows you to choose any selectors and values
		to animate
 -event		this.element :complete
 -event		this.element :iteration
 -event		this :complete
 -event		this :iteration
*/
Df.Animate = Class.create(Df.Element, {

	_setup: function($super){

		this.possibleSelectors = [
			'width','height','color','left','top','fontSize', 'lineHeight', 'letterSpacing',
			'paddingLeft','paddingRight','paddingTop','paddingBottom',
			'marginLeft','marginRight','marginTop','marginBottom',
			'opacity','backgroundColor', 'backgroundPosition',
			'borderColor','borderWidth'
		];

		this.running = false;
		this.iterations = false;
		this.currentIteration = false;
		this.animators = [];
		this.coords = [];
		this.history = [];
		this.hpointer = 0;
		this._timeout

		$super()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({

			stopBubble: [':complete', ':iteration'],

			/*
			 -ref		Df.Animate.pars.time
			 -type		Parameter
			 -returns	Number|Boolean
			 -choice	false
			 -choice	Number
			 -default	250
			 -note		time in milliseconds to run the complete animation
			 -hint		use time and pase together or pause and skip
			 -hint		easing is only available when using time and pause
			*/
			time: 250,

			/*
			 -ref		Df.Animate.pars.pause
			 -type		Parameter
			 -returns	Number
			 -default	40
			 -note		time in milliseconds wait between each iteration
			 -hint		use time and pase together or pause and skip
			 -hint		easing is only available when using time and pause
			*/
			pause: 40,

			/*
			 -ref		Df.Animate.pars.skip
			 -type		Parameter
			 -returns	Number|Boolean
			 -choice	false
			 -choice	Number
			 -default	false
			 -note		pixels to skip between each iteration
			 -hint		use time and pase together or pause and skip
			 -hint		easing is only available when using time and pause
			*/
			skip:false,

			/*
			 -ref		Df.Animate.pars.ease
			 -type		Parameter
			 -returns	Function
			 -default	Df.Transitions.linear
			*/
			ease: Df.Transitions.linear,

			/*
			 -ref		Df.Animate.pars.width
			 -type		Parameter
			 -returns	Number|Boolean
			 -default	false
			 -note		animates the css property of width
			*/
			width: false,

			/*
			 -ref		Df.Animate.pars.height
			 -type		Parameter
			 -returns	Number|Boolean
			 -default	false
			 -note		animates the css property of height
			*/
			height: false,

			/*
			 -ref		Df.Animate.pars.color
			 -type		Parameter
			 -returns	Boolean|String
			 -choice	false
			 -choice	hex as a string like '#ffffff'
			 -choice	rgb as a string like 'rgb(255,255,255)'
			 -default	false
			 -note		animates the css property of color
			*/
			color: false,

			/*
			 -ref		Df.Animate.pars.backgroundColor
			 -type		Parameter
			 -returns	Boolean|String
			 -choice	false
			 -choice	hex as a string like '#ffffff'
			 -choice	rgb as a string like 'rgb(255,255,255)'
			 -default	false
			 -note		animates the css property of background-color
			*/
			backgroundColor: false,

			/*
			 -ref		Df.Animate.pars.borderColor
			 -type		Parameter
			 -returns	Boolean|String
			 -choice	false
			 -choice	hex as a string like '#ffffff'
			 -choice	rgb as a string like 'rgb(255,255,255)'
			 -default	false
			 -note		animates the css property of border-color
			*/
			borderColor: false,

			/*
			 -ref		Df.Animate.pars.backgroundPosition
			 -type		Parameter
			 -returns	Boolean|String
			 -choice	false
			 -choice	String like '1px 4px'
			 -default	false
			 -note		animates the css property of background-position
			*/
			backgroundPosition: false,

			/*
			 -ref		Df.Animate.pars.borderWidth
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of border-width
			*/
			borderWidth: false,

			/*
			 -ref		Df.Animate.pars.left
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of left
			*/
			left: false,

			/*
			 -ref		Df.Animate.pars.top
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of top
			*/
			top: false,

			/*
			 -ref		Df.Animate.pars.opacity
			 -type		Parameter
			 -returns	Boolean|Number
			 -choice	false
			 -choice	decimal 0.0001 - 0.9999
			 -hint		use values between 0.0001 - 0.9999
			 -hint		prototype does not like cap case. in css use filter:alpha(opacity=50)
			 -default	false
			 -note		animates the css property of opacity
			*/
			opacity: false,

			/*
			 -ref		Df.Animate.pars.fontSize
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of font-size
			*/
			fontSize: false,

			/*
			 -ref		Df.Animate.pars.lineHeight
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of line-height
			*/
			lineHeight: false,

			/*
			 -ref		Df.Animate.pars.letterSpacing
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of letter-spacing
			*/
			letterSpacing: false,

			/*
			 -ref		Df.Animate.pars.paddingLeft
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of padding-left
			*/
			paddingLeft: false,

			/*
			 -ref		Df.Animate.pars.paddingRight
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of padding-right
			*/
			paddingRight: false,

			/*
			 -ref		Df.Animate.pars.paddingTop
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of padding-top
			*/
			paddingTop: false,

			/*
			 -ref		Df.Animate.pars.paddingBottom
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of padding-bottom
			*/
			paddingBottom: false,

			/*
			 -ref		Df.Animate.pars.marginLeft
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of margin-left
			*/
			marginLeft: false,

			/*
			 -ref		Df.Animate.pars.marginRight
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of margin-right
			*/
			marginRight: false,

			/*
			 -ref		Df.Animate.pars.marginTop
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of margin-top
			*/
			marginTop: false,

			/*
			 -ref		Df.Animate.pars.marginBottom
			 -type		Parameter
			 -returns	Boolean|Number
			 -default	false
			 -note		animates the css property of margin-bottom
			*/
			marginBottom: false,

			/*
			 -ref		Df.Animate.pars.onComplete
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onComplete: false,

			/*
			 -ref		Df.Animate.pars.onIteration
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onIteration: false,

			selectors: []
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.Animate.run
	 -type		Method
	 -returns	Df.Animate
	 -arg		Df.Animate.pars pars
	 -arg		Boolean fromHistory run the animation at the current pointer
	 -note		runs the animation based on the pars sent in or a step from the history
	*/
	run: function(pars, fromHistory, skip){
		clearTimeout(this._timeout)

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
			if(skip){
				this.skipToEnd.bind(this).defer()
			}else{
				this.stepThroughAnimation.bind(this).defer()
			}
		}
		return this;
	},

	/*
	 -ref		Df.Animate.getPossibleSelectors
	 -type		Method
	 -returns	Array
	 -note		gets all the available css selectors that can be animated
	*/
	getPossibleSelectors: function(){
		return this.possibleSelectors
	},

	/*
	 -ref		Df.Animate.getHistoryCount
	 -type		Method
	 -returns	Number
	 -note		gets the total number of animation steps ran on this instance
	*/
	getHistoryCount: function(){
		return this.history.length;
	},

	/*
	 -ref		Df.Animate.clear
	 -type		Method
	 -returns	Df.Animate
	 -note		stops the animation
	 -note		clears all memory of the instance
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
	 -ref		Df.Animate.terminate
	 -type		Method
	 -returns	Df.Animate
	 -note		stops the animation
	 -note		clears all memory of the current animation that is running
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
	 -ref		Df.Animate.pause
	 -type		Method
	 -returns	Df.Animate
	 -note		pauses the animation
	*/
	pause: function(ms){
		this.running = false;

		if (ms) {
			setTimeout(this.resume.bind(this), ms);
		}

		return this;
	},

	/*
	 -ref		Df.Animate.resume
	 -type		Method
	 -returns	Df.Animate
	 -note		resumes the animation
	*/
	resume: function(){
		this.running = true;
		this.stepThroughAnimation()
		return this
	},

	/*
	 -ref		Df.Animate.back
	 -type		Method
	 -returns	Df.Animate
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		runs the previous animation in the history
	*/
	back: function(pars, skip){
		if(this.hpointer > 0){
			this.hpointer--;
			if(pars){
				Object.extend( this.history[ this.hpointer ], pars );
			}
			this.run(false, true, skip);
		}
	},

	/*
	 -ref		Df.Animate.next
	 -type		Method
	 -returns	Df.Animate
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		runs the next animation in the history
	*/
	next: function(pars, skip){
		if( (this.hpointer + 1) < this.history.length ){
			this.hpointer++;
			if(pars){
				Object.extend( this.history[ this.hpointer ], pars );
			}
			this.run(false, true, skip);
		}
	},

	/*
	 -ref		Df.Animate.first
	 -type		Method
	 -returns	Df.Animate
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		animates back to its original css properties
	*/
	first: function(pars, skip){
		this.hpointer = 0;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true, skip);
	},

	/*
	 -ref		Df.Animate.last
	 -type		Method
	 -returns	Df.Animate
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		animates to the last index in the history
	*/
	last: function(pars, skip){
		this.hpointer = this.history.length-1;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true, skip);
	},

	/*
	 -ref		Df.Animate.index
	 -type		Method
	 -returns	Df.Animate
	 -arg		Number index a specific index in the history to animate to
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		animates to a specific index in the history
	*/
	index: function(index, pars, skip){
		this.hpointer = index-1;
		if(pars){
			Object.extend( this.history[ this.hpointer ], pars );
		}
		this.run(false, true, skip);
	},

	/*
	 -ref		Df.Animate.toggle
	 -type		Method
	 -returns	Df.Animate
	 -arg		Number index a specific index in the history to animate to
	 -arg		Df.Animate.pars you can override or add any pars to the history before the
			animation is carried out
	 -note		toggles the history between 1 and 0
	 -note		runs the animation for the first time if not run yet
	 -hint		the static method of Df.Animate.toggleBy works well for common observers
			like click or hover
	 -example	<script type="text/javascript">
				var el = new Df.Animate($('xxx')).setPars({
					opacity: .5
				})

				el.getElement().observe('click', function(e){
					this.toggle()
				}.bind(el))
			</script>
	*/
	toggle: function(pars, skip){
		if( this.history.length == 0 ){
			this.run(pars, false, skip);
		}
		else if( this.hpointer == 1 ){
			this.first(pars, skip);
		}
		else if( this.hpointer == 0 ){
			this.last(pars, skip);
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

				if (elem == 'borderWidth'){
					if (this.element.style.borderWidth == ''){
						this.element.style.borderWidth = '0px';
					}
				}

				if (elem == 'borderColor'){
					if (this.element.getStyle('borderTopColor') != '' || this.element.getStyle('borderRightColor') != '' || this.element.getStyle('borderBottomColor') != '' || this.element.getStyle('borderLeftColor') != ''){
						this.element.style.borderColor = this.element.getStyle('borderTopColor');
					}
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
		clearTimeout(this._timeout)
		if( this.running ){
			try{
				if( this.iterations > this.currentIteration){

					this.element.setStyle( this.coords[this.currentIteration] );
					this.currentIteration++;

					this.fire(':iteration', { iteration: this.currentIteration, iterations: this.iterations } );

					this.element.fire(':iteration', { iteration: this.currentIteration, iterations: this.iterations } );

					if( this.history[this.hpointer].onIteration){
						this.history[this.hpointer].onIteration(this);
					}

					this._timeout = setTimeout( this.stepThroughAnimation.bind(this), this.history[this.hpointer].pause);
				}else{
					this.running = false;

					this.fire(':complete', {pointer: this.hpointer});

					this.element.fire(':complete', {pointer: this.hpointer});

					if( this.history[this.hpointer].onComplete){
						this.history[this.hpointer].onComplete(this);
					}
				}
			}catch(e){}
		}
	},

	skipToEnd: function(){
		clearTimeout(this._timeout)
		if( this.running ){
			this.currentIteration = this.iterations - 1
			this.element.setStyle( this.coords[this.currentIteration] );
			this.running = false;
			this.fire(':complete', {pointer: this.hpointer});
			this.element.fire(':complete', {pointer: this.hpointer});
			if( this.history[this.hpointer].onComplete){
				this.history[this.hpointer].onComplete(this);
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
			| elem == 'borderWidth'
		   ){
			val = parseInt(val);
		}else if(elem == 'opacity'){
			val = val/100;
		}
		else if(elem == 'color' | elem == 'backgroundColor' | elem == 'borderColor'){
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
			| elem == 'borderWidth'
		   ){
			val = parseInt(val);
		}
		else if(elem == 'opacity'){
			val = parseInt(val * 100);
		}
		else if(elem == 'color' | elem == 'backgroundColor' | elem == 'borderColor'){
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

	//(NEEDS SOME WORK) takes color info in the form of #ffffff or rgb(255,255,255) and converts it to [255,255,255]
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
				if (val[i].indexOf(')') > -1){
					val[i] = Number(val[i].substr(0,val[i].indexOf(')')));
				} else {
					val[i] = Number(val[i]);
				}
			}
		}
		return val
	}
});

/*
 -ref		Df.Animate.toggleBy
 -note		This is a factory method for creating an instance of Df.Animate complete with listeners for
		toggling an animation object.
 -type		Static Method
 -returns	Df.Animate
 -arg		String|Element element
 -arg		String action choose between click and hover
 -arg		Df.Animate.pars pars
 -example	<script type="text/javascript">
			var animate = Df.Animate.toggleBy($('xxx'), 'click', {
				opacity: .65
			})
		</script>
*/
Df.Animate.toggleBy = function(element, action, pars){
	var animate = new Df.Animate(element, pars);
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
 -ref		Df.Drag
 -extends	Df.Element
 -returns	Df.Drag
 -note		Makes an element dragable
 -hint		Element must be positioned Absolute,
 -type		Class
 -arg		String|Element element an extended dom node or dom node id string
 -event		this.element :start
 -event		this.element :stop
 -event		this.element :drag
 -event		this.element :dragX
 -event		this.element :dragY
 -event		this.element :enable
 -event		this.element :disable
*/
Df.Drag = Class.create(Df.Element, {

	_setup: function($super){

		this._offsetX
		this._offsetY
		this._curX
		this._curY

		this._followIt = this.followIt.bindAsEventListener(this)
		this._startIt = this.startIt.bindAsEventListener(this)
		this._stopIt = this.stopIt.bindAsEventListener(this)

		$super()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({
			/*
			 -ref		Df.Drag.pars.dirX
			 -type		Parameter
			 -returns	object|Boolean
			 -choice	true
			 -choice	false
			 -choice	hash with values for min and or max {min:,max:}
			 -default	false
			 -note		rules for draging left and right
			*/
			dirX: true,

			/*
			 -ref		Df.Drag.pars.dirY
			 -type		Parameter
			 -returns	object|Boolean
			 -choice	true
			 -choice	false
			 -choice	hash with values for min and or max {min:,max:}
			 -default	false
			 -note		rules for draging up and down
			*/
			dirY: true,

			/*
			 -ref		Df.Drag.pars.onStart
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onStart: false,

			/*
			 -ref		Df.Drag.pars.onDrag
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onDrag: false,

			/*
			 -ref		Df.Drag.pars.onDragX
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onDragX: false,

			/*
			 -ref		Df.Drag.pars.onDragY
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onDragY: false,

			/*
			 -ref		Df.Drag.pars.onStop
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onStop: false,

			/*
			 -ref		Df.Drag.pars.onEnable
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onEnable: false,

			/*
			 -ref		Df.Drag.pars.onDisable
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onDisable: false,

			/*
			 -ref		Df.Drag.pars.dragElement
			 -type		Parameter
			 -returns	Array
			 -default	false
			 -note		accepts string CSS selector like 'div.dragable'
			*/
			dragElement: false
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.Drag.enable
	 -type		Method
	 -returns	Df.Drag
	 -arg		Df.Drag.pars pars
	 -fire		this.element :enable
	 -note		enables the element to be dragable
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
	 -ref		Df.Drag.disable
	 -type		Method
	 -returns	Df.Drag
	 -arg		Df.Drag.pars pars
	 -fire		this.element :disable
	 -note		disable the element from being dragged
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
	 -ref		Df.Drag.startIt
	 -type		Method
	 -returns	Df.Drag
	 -arg		Df.Drag.pars pars
	 -fire		this.element :start
	 -note		not intended to be called directly
	*/
	startIt: function(e){
/*		if(this.element.style.cursor == 'auto')
		{
			return;
		}*/
		Event.stop(e);

		Event.observe(document.body,'mousemove', this._followIt);
		Event.observe(document.body,'mouseup', this._stopIt);

		this._offsetX = this.offsetX(e);
		this._offsetY = this.offsetY(e);

		this.element.fire(':start', {e: e})

		if(this.pars.onStart){
			this.pars.onStart(this, e)
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
	 -ref		Df.Drag.stopIt
	 -type		Method
	 -returns	Df.Drag
	 -fire		this.element :stop
	 -note		not intended to be called directly
	*/
	stopIt: function(e){
		Event.stop(e);
		Event.stopObserving(document.body,'mousemove', this._followIt)
		Event.stopObserving(document.body,'mouseup',this._stopIt)

		if(this.pars.onStop){
			this.pars.onStop(this, e)
		}
		this.element.fire(':stop', {e: e})

		return this
	},

	/*
	 -ref		Df.Drag.followIt
	 -type		Method
	 -returns	Df.Drag
	 -fire		this.element :drag
	 -note		not intended to be called directly
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
			this.pars.onDrag(this, e)
		}
		this.element.fire(':drag', {e: e})

		return this
	},

	/*
	 -ref		Df.Drag.dirX
	 -type		Method
	 -returns	Df.Drag
	 -fire		this.element :dragX
	 -note		not intended to be called directly
	*/
	dirX: function(e){

		this._curX = Event.pointerX(e) - this._offsetX;

		if(this.pars.dirX.min || this.pars.dirX.min == 0){
			this.minDirX(e)
		}

		if(this.pars.dirX.max || this.pars.dirX.max == 0){
			this.maxDirX(e)
		}

		this.element.style.left = this._curX + 'px'

		if(this.pars.onDragX){
			this.pars.onDragX(this, e)
		}
		this.element.fire(':dragX', {e: e})
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
	 -ref		Df.Drag.dirY
	 -type		Method
	 -returns	Df.Drag
	 -fire		this.element :dragY
	 -note		not intended to be called directly
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
			this.pars.onDragY(this, e)
		}
		this.element.fire(':dragY', {e: e})
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
 -ref		Df.Resize
 -type		Class
 -extends	Df.Drag
 -returns	Df.Resize
 -event		this.element :size
 -event		this.element :sizeHeight
 -event		this.element :sizeWidth
 -arg		string|Element element an extended dom node or dom node id string
*/
Df.Resize = Class.create(Df.Drag, {

	_setup: function($super){

		delete this.pars.dragElement

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

		$super()
	},

	_initPars: function($super, pars){
		$super()
		this.setPars({

			/*
			 -ref		Df.Resize.pars.hitDepth
			 -type		Parameter
			 -returns	Number
			 -default	20
			 -note		padding inside the element that triggers resizing
			*/
			hitDepth: 20,

			/*
			 -ref		Df.Resize.pars.dirH
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize height
			*/
			dirH: true,

			/*
			 -ref		Df.Resize.pars.dirT
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize top
			*/
			dirT: true,

			/*
			 -ref		Df.Resize.pars.dirB
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize bottom
			*/
			dirB: true,

			/*
			 -ref		Df.Resize.pars.dirW
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize width
			*/
			dirW: true,

			/*
			 -ref		Df.Resize.pars.dirL
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize left side
			*/
			dirL: true,

			/*
			 -ref		Df.Resize.pars.dirR
			 -type		Parameter
			 -returns	Boolean
			 -default	true
			 -note		can resize right side
			*/
			dirR: true,

			/*
			 -ref		Df.Resize.pars.onSizeHeight
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onSizeHeight: false,

			/*
			 -ref		Df.Resize.pars.onSizeWidth
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onSizeWidth: false,

			/*
			 -ref		Df.Resize.pars.onSize
			 -type		Parameter
			 -returns	Function
			 -default	false
			 -note		anonymous function
			 -note		sends class instance as the only argument
			*/
			onSize: false
		});
		this.setPars(pars)
	},

	/*
	 -ref		Df.Resize.enable
	 -override
	 -type		Method
	 -returns	Df.Resize
	 -fire		this.element :enable
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
	 -ref		Df.Resize.disable
	 -override
	 -returns	Df.Resize
	 -type		Method
	 -fire		this.element :disable
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
		this._pointerX = this.element.getPointerX(e)
		this._pointerY = this.element.getPointerY(e)

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
				this.element.style.cursor = 'nw-resize'
			}
			else if(this._sizeWidth == 'left' && this._sizeHeight == 'bottom'){
				this.element.style.cursor = 'ne-resize'
			}
			if(this._sizeWidth == 'right' && this._sizeHeight == 'top'){
				this.element.style.cursor = 'sw-resize'
			}
			else if(this._sizeWidth == 'right' && this._sizeHeight == 'bottom'){
				this.element.style.cursor = 'se-resize'
			}
		}
		else if(this._sizeWidth == false && this._sizeHeight !== false ){
			this.element.style.cursor = 'n-resize'
		}
		else if(this._sizeWidth !== false && this._sizeHeight == false){
			this.element.style.cursor = 'e-resize'
		}
		else {
			this.element.style.cursor = 'auto'
		}
	},

	/*
	 -ref		Df.Resize.followIt
	 -override
	 -returns	Df.Resize
	 -fire		this.element :start
	 -type		Method
	 -note		not intended to be called directly
	*/
	startIt: function(e){
		if(this.element.style.cursor == 'auto')
		{

			return;
		}
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
			this.pars.onStart(this, e)
		}

		this.element.fire(':start', {e: e})

		return this
	},

	stopIt: function($super, e){
		$super(e)
		Event.observe(this.element,'mousemove', this._followCursor);
		return this
	},

	/*
	 -ref		Df.Resize.followIt
	 -override
	 -returns	Df.Resize
	 -type		Method
	 -fire		this.element :size
	 -note		not intended to be called directly
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

		if(this.pars.onSize){
			this.pars.onSize(this, e)
		}
		this.element.fire(':size', {e: e})

		return this
	},

	/*
	 -ref		Df.Resize.dirH
	 -type		Method
	 -fire		this.element :sizeHeight
	 -note		not intended to be called directly
	*/
	dirH: function(e){
		if(this._sizeHeight == 'top' && this.pars.dirT){
			this._curH = this._startH + (this._startT - this._curY)
		} else if (this._sizeHeight == 'bottom' && this.pars.dirB){
			this._curH = this.element.getPointerY(e) + (this._startH - this._pointerY)
		}

		this.element.style.height = this._curH + 'px'

		if(this.pars.onSizeHeight){
			this.pars.onSizeHeight(this, e)
		}
		this.element.fire(':sizeHeight', {e: e})
	},

	/*
	 -ref		Df.Resize.dirW
	 -type		Method
	 -fire		this.element :sizeHeight
	 -note		not intended to be called directly
	*/
	dirW: function(e){
		if(this._sizeWidth == 'left' && this.pars.dirL){
			this._curW = this._startW + (this._startL - this._curX)
		} else if (this._sizeWidth == 'right' && this.pars.dirR){
			this._curW = this.element.getPointerX(e) + (this._startW - this._pointerX)
		}

		this.element.style.width = this._curW + 'px'

		if(this.pars.onSizeWidth){
			this.pars.onSizeWidth(this, e)
		}
		this.element.fire(':sizeWidth', {e: e})
	}
});

/*
 -ref           Df.DictionaryCollection
 -extends       Df.Event
 -type          Class
 -arg           pars Array array of objects
 -returns       Df.DictionaryCollection
*/
Df.DictionaryCollection = Class.create(Df.Event, {
	initialize: function(ary){
	    this.ary = ary || []
	},

	'get': function(){
	    return this.ary
	},

	'set': function(ary){
	    this.ary = ary
	    return this
	},

	'push': function(hash){
	    this.ary.push(hash)
	    return this
	},

	'splice': function(index, howmany){
	    this.ary.splice(index, howmany)
	    return this
	},

	keys: function(){
	    return $H(this.ary[0]).keys()
	},

	extend: function(ary){
	    this.ary = this.ary.concat(ary)
	    return this
	},

	getBy: function(filters){
	    return Df.DictionaryCollection.getRecordsByAttributes(this.ary, filters)
	},

	getByGroups: function(attributes){
	    if(Object.isUndefined(attributes)){
		attributes = this.keys()
	    }
	    return Df.DictionaryCollection.groupRecordsByAttributes(this.ary, attributes)
	},

	getAttributeValues: function(attribute){
	    return Df.DictionaryCollection.getAttributeValues(this.ary, attribute)
	}
})

Df.DictionaryCollection.getAttributeValues = function(records, attribute){
	var h = []
	var l = records.length
	for(var i=0; i<l; i++){
		if(!h.include(records[i][attribute])){
		    h.push(records[i][attribute])
		}
	}
	return h
}

Df.DictionaryCollection.groupRecordsByAttributes = function(records, attributes){
	var h = {}
	var l = records.length
	for(var i=0; i<l; i++){
		for(p in records[i]){
			if(Object.toArray(attributes).include(p)){
			    if(Object.isUndefined(h[p])){
				h[p] = []
			    }
			    if(h[p].find(function(v){
				    if(this.par == v[0]){
					v[1].push(this.rec)
					return true
				    }else{
					return false
				    }
				}.bind({par:records[i][p], rec:records[i]}))){
			    }else{
				h[p].push([records[i][p], [records[i]]])
			    }
			}
		}
	}
	return h
}

Df.DictionaryCollection.getRecordsByAttributes = function(records, filters){
	return records.findAll(function(v){
	    var test = true
	    for (var p in filters) {
		if(!Object.toArray(filters[p]).include(v[p])){
		    test = false
		}
	    }
	    return test
	})
}


Df.XMLDocument = Class.create({
        initialize: function(string){

            this.document

            if(string){
                this.load(string)
            }
            return this
        },

        load: function(string){
                try{
			this.document = new DOMParser().parseFromString(string,"text/xml")
			return this
                } catch(e){
                    try{
			this.document = new ActiveXObject("Microsoft.XMLDOM")
			this.document.async="false"
			this.document.loadXML(string)
			return this
                    } catch(e) {
                        return false
                    }

                }
        },

        getRoot: function(){
            return $XML(this.document.firstChild)
        },

        xpath: function(exp){
                try{
                        var nodes = this.document.evaluate(exp, this.document, null, XPathResult.ANY_TYPE, null)
                        var a = []
                        var r = nodes.iterateNext()
                        while (r) {
                                a.push(r)
                                r = nodes.iterateNext()
                        }
                        return a
                } catch (e) {
                        try {
                                this.document.setProperty("SelectionLanguage","XPath")
                                return this.document.selectNodes(exp)
                        } catch (e) {
                                return false
                        }
                }
        }
})

Df.XMLNode = {
    _df_extended: true,

    remove: function(){
        this.parentNode.removeChild(this)
        return this
    },

    childElements: function(){
        var a = []
        for(var i=0; i<this.childNodes.length; i++){
            if(this.childNodes[i].nodeType == 1)
                a.push($XML(this.childNodes[i]))
        }
        return $A(a)
    },

    previousSiblings: function(){
        function previous(node){
            if(node.nodeType == 1){
                a.push(node)
            }
            if(node.previousSibling){
                next(node.previousSibling)
            }
        }

        var a = []

        if(this.previousSibling)
            previous(this.previousSibling)

        return $A(a)
    },

    previous: function(){
        s = this.previousSiblings()
        if(s.length > 0)
            return s[0]
        else
            return null
    },

    nextSiblings: function(){
        function next(node){
            if(node.nodeType == 1){
                a.push(node)
            }
            if(node.nextSibling){
                next(node.nextSibling)
            }
        }

        var a = []

        if(this.nextSibling)
            next(this.nextSibling)

        return $A(a)
    },

    next: function(){
        s = this.nextSiblings()
        if(s.length > 0)
            return s[0]
        else
            return null
    },

    down: function(){
        if(this.childElements().length > 0)
            return this.childElements()[0]
        else
            return null
    },

    up: function(){
        return $XML(this.parentNode)
    }
}

var $XML = function(node){
    if(Object.isUndefined(node._df_extended)){
        Object.extend(node, Df.XMLNode)
    }
    return node
}


/*
 -ref           Df.AjaxCacheManager
 -extends       Df.Base
 -type          Class
 -arg           pars Object Class Options Object
 -note          caches ajax calls based on a url
 -returns       Df.AjaxCacheManager
 -event         this :LoadSuccess
 -event         this :ItemSelection
 -event         this :LoadFailure
 -event         this :LoadException
*/
Df.AjaxCacheManager = Class.create(Df.Base, {

    _setup: function($super){

	this._loadSuccessObserver = this.loadSuccessObserver.bind(this)
	this.observe(':LoadSuccess', this._loadSuccessObserver)

	$super()

	this._createGetters()
	this._createSetters()
    },

    _initPars: function($super, pars){
	$super()
	this.setPars({
		ajaxRequestOptions: {},
		serviceBaseUrl: '',
		cacheInstance: $H(),
		uri: 'uri'
        })
	this.setPars(pars)
    },

    /*
     -ref               Df.AjaxCacheManager.get
     -type              method
     -returns           Df.AjaxCacheManager
     -arg               uri String
    */
    'get': function(uri){
	if(this.getCacheInstance().get(uri)){
	    this.fireSelectionEvent(uri)
	} else {
	    this.callService(uri)
	}
	return this
    },

    fireSelectionEvent: function(uri){
	this.fire(':ItemSelection', {object: this.getCacheInstance().get(uri)})
    },

    loadSuccessObserver: function(e){
	var json = e.memo.transport.responseText.evalJSON()
	this.getCacheInstance().set( json.uri, json )
	this.fireSelectionEvent(json.uri)
    },

    uriFormatter: function(uri){
	var u = {}
	u[this.getUri()] = uri
	return u
    },

    callService: function(uri){
	var opts = {
	    onSuccess: function(transport) {
		this.fire(':LoadSuccess', {transport: transport})
	    }.bind(this),

	    onFailure: function(transport, e) {
		this.fire(':LoadFailure', {transport: transport, error: e})
	    }.bind(this),

	    onException: function(transport, e) {
		this.fire(':LoadException', {transport: transport, exception: e})
	    }.bind(this)
	}

	Object.extend(opts, this.getAjaxRequestOptions())
	if(opts.parameters && this.getUri()){
		Object.extend(opts.parameters, this.uriFormatter(uri))
	}
	new Ajax.Request(this.getServiceBaseUrl(), opts);
    }
})

/*
 -ref		Df.Anchor
 -type		Static Class
 -returns	Df.Scripts
 -note		Class for managing achchor tags
 -example	<script type="text/javascript">
			$(document).observe('dom:loaded', function(e){
				$(document.body).observe('click', function(ee){
					Df.Anchor.rewriteHandler(ee)
				})
			})
		</script>
*/
Df.Anchor = {
	/*
	 -ref		Df.Anchor.addClickHandlers
	 -type		Static Method
	 -extends	Df.Base
	 -returns	Df.Scripts
	 -note		Rewrite all anchor tags with rel tags set as indicated below
	 -note		syntax
	 -note		rel="redir:p+n=v|p-n=v|h+v|h-
	 -note		p+ adds a name value pair
	 -note		p- removes a name value pair
	 -note		h+ changes the hash
	 -note		h- removes the hash
	 -hint		don't attach to individual a tags. this is meant to bubble.
	 -example	<script type="text/javascript">
				$(document).observe('dom:loaded', function(e){
					$(document.body).observe('click', function(ee){
						Df.Anchor.rewriteHandler(ee)
					})
				})
			</script>
	*/
	rewriteHandler: function(e) {
		// Rewrite all anchor tags with rel tags set as indicated below
		//syntax
		//rel="redir:p+n=v|p-n=v|h+v|h-
		//p+ adds a name value pair
		//p- removes a name value pair
		//h+ changes the hash
		//h- removes the hash

		//disect current href
		e.stop();
		if(e.target.tagName.toLowerCase() == "a"){
			if(e.target.rel.match(/^redir:/)){
				var url = {q:[]}
				var parts = e.target.href.split(/\?|\#/)
				url.d = parts.shift()
				while(parts.length > 0){
					var p = parts.shift()
					if (p.indexOf('=') > -1)
						url.q = p.split('&')
					else
						url.h = p
				}
				//append redir
				parts = e.target.rel.replace('redir:','').split('|')
				while(parts.length > 0){
					var p = parts.shift()
					if (p.indexOf('p+') > -1)
						url.q.push(p.replace('p+',''))
					else if (p.indexOf('p-') > -1)
						url.q = $A(url.q).without(p.replace('p-',''))
					else if (p.indexOf('h+') > -1)
						url.h = p.replace('h+','')
					else if (p.indexOf('h-') > -1)
						url.h = false
				}
				//change href
				var newLocation = url.d
				if(url.q.length > 0) newLocation += '?' + url.q.join('&')
				if(url.h) newLocation += '#' + url.h
				window.location = newLocation
			}
		}
	}
}

//Dummy Class For Debugging in Console
Df.console = {
	log: function(){
		return;
	},

	debug: function(){
		return;
	},

	info: function(){
		return;
	},

	warn: function(){
	       return;
	},

	error: function(){
		return;
	},

	dir: function(){
		return;
	}
}