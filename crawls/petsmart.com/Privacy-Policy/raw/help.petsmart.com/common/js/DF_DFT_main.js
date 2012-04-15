//////////////////////////////////////core API object/////////////////////////////////////

var Dom = {

	//internet explorer detection (true|false)

	ie: function(){

		if(document.all)return 1

		return 0

	},

	

	//scanned html elements array

	tags: ['div','img','span','ul'],

	

	//(string|(full|att|single))

	fragment: function(str,type){

		if(type == 'att')return '(?:'+str+'=\".*?)((\n|\r|.)*?)(?:\")'

		if(type == 'single')return '(?:<'+str+'.*?)((\n|\r|.)*?)(?:\/>)'

		return '(?:<'+str+'.*?>)((\n|\r|.)*?)(?:<\/'+str+'>)'

	},

	

	//include needed JavaScript Files

	getJS: function(){

		var head = document.getElementsByTagName('head')[0]

		for(var i = 0; i < arguments.length; i++) {

			var include = document.createElement('script')

			include.src = arguments[i]

			include.type = "text/javascript"

			head.appendChild(include);

		}

	},

	

	//initiate the api

	father: function(opt){

		if(!opt)var opt = Dom.tags

		for(i=0; i<opt.length; i++){

			var obj = document.getElementsByTagName(opt[i])

			for(j=0; j<obj.length; j++){

				var elm = obj[j]

				if(elm.getAttribute('hotness')){

					Dom.json(elm,elm.getAttribute('hotness').exe())

				}	

			}	 

		}

	},

	

	//parse the JSON Object

	json: function(elm,obj){

		if(obj.ref){

		}

		if(obj.actions){

			for(var i=0; i<obj.actions.length; i++){

				for(property in obj.actions[i]){

					if(property == "para"){

						var thePara = obj.actions[i][property]

					}else{

						var theCall = obj.actions[i][property]

						var theCat = property

					}

				}

			window[theCat][theCall](elm,thePara)

			}

		}

		if(obj.end){

		}

	}

}


//holder for global variables

var Global = {}

Global.ie = Dom.ie()


//Wizzles object

var Wizzle = {}





//////////////////////////////////////////////////////////////////////

Object.extend = function(destination, source) {

  for (property in source) {

    destination[property] = source[property];

  }

  return destination;

}


///////////////////////////////find elements by ID/////////////////////////////

$ = function(){

 	var elements = [];

	for (var i = 0; i < arguments.length; i++) {

		var element = arguments[i];

		if (typeof element == 'string')element = document.getElementById(element);

		if (arguments.length == 1)return element;

		elements.push(element);

  	}

	return elements;

}


///////////////////////////////find elements by tag name////////////////

//ele = tag array

//obj = parent element

$T = function(ele,obj){

	var elements = [];

	for (var i = 0; i < ele.length; i++) {

		if(obj){

			var temp = $(obj).getElementsByTagName(ele[i])

		}else{

			var temp = document.getElementsByTagName(ele[i])

		}


		for(var j=0; j<temp.length; j++){

			elements.push(temp[j])

		}

	}

	return elements;

}


///////////////////////////////find elements by class name////////////////

$C = document.getElementsByClassName = function(className, parentElement) {

  var children = ($(parentElement) || document.body).getElementsByTagName('*');

  return $A(children).inject([], function(elements, child) {

    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))

      elements.push(child);

    return elements;

  });

}


$E = function(tag,elm,para){

	var obj = document.createElement(tag)

	if(para.className)obj.className = para.className

	if(para.id)obj.id = para.id

	if(para.href)obj.href = para.href

	if(para.src)obj.src = para.src

	if(para.html)obj.innerHTML = para.html

	if(para.element)obj.appendChild = para.element

	if(para.onclick)obj.onclick = para.onclick

	elm.appendChild(obj)

}


///////////////////////////////include js files //////////////////////

document.write('<script type="text/javascript" src="/common//js/LIB_core.js"></script>')

document.write('<script type="text/javascript" src="/common//js/LIB_common.js"></script>')

document.write('<script type="text/javascript" src="/common/js/LIB_ajax.js"></script>')

