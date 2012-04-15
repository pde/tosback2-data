// ajax.js
var txt_value="";
var div_mouseoutflag= ""; 



function getList_theme()

   {
 
     var _txtInput;
 //This if condition is to check the input box is Querystring or QuerystringBottom
  
        _txtInput = escape(document.getElementById('searchString').value);
               
       
      
      //textbox empty check
      	if(_txtInput== "")
		_txtInput="&&"
		
	//JSON script for sending the post method with our qry is textbox value 
		var _post="{";
		
		var p1="qry:"+_txtInput;

				if(this._cmd=='cmd'){
					var p2=',command:clear';
				   _post+=p1+p2+"}";
					return _post;
				}else
		                   {
					var p2=',command:&&';
		  			_post+=p1+p2+"}";
		  			 return _post
                                   } 

   }


function AJAXObject_theme(url, callback) {



		    var req = init();
		    req.onreadystatechange = processRequest;
		    
		    function init() {
		      var xmlHttp = false;
		
			/*@cc_on @*/
			/*@if (@_jscript_version >= 5)
			try {
			  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
			try {
		    	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			 } catch (e2) {
		    	xmlHttp = false;
			  }
						}
			@end @*/
		
			if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
			  xmlHttp = new XMLHttpRequest();
			}
		
			return xmlHttp;
		    }
		    
		    function processRequest () {
		      if (req.readyState == 4) {
		        if (req.status == 200) {
		          if (callback) callback(req);
		        }
		      }
		    }
		
		    this.doGet = function() {
		      req.open("GET", url, true);
		      req.send(null);
		    }
		
		    
		    
		    this.doPost = function(body) {
		      req.open("POST", url, true);
		//	  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
			  req.setRequestHeader("Content-Type", "text/json");		
		      req.send(body);
    }
}

/*-------------------------BEGIN: AJAX CALL -----------------------------*/
// Send AJAX request
function suggest_request_theme() {
	
	var ajax = new AJAXObject_theme(this.servletPath+'?cmd_search='+'&uid='+Math.random(),this.callback);
	ajax.doPost(this.method());
}



// Recieve AJaX response
function suggest_response_theme(res){
	var result=eval(res.responseText);
	var chk_History=result[0];
		this.comboBox.ul.innerHTML = '';
		for(var i=0; i < result.length; i++){
			this.addItem(result[i],i);
		}
		var LIs = this.comboBox.ul.getElementsByTagName('LI');
			this.itemCount = LIs.length;
	  if(this.itemCount){
	  
			  if(chk_History.length > 105)
			     {

			      LIs[1].className = 'active';	
			      this.selIndex = 1;
			     }
			 else
			    {
				  LIs[0].className = 'active';	
				  this.selIndex = 0;
			    }
			    
	       }
	
}
/*-------------------------END: AJAX CALL -----------------------------*/

var onemorex; 
/*-------------------------BEGIN: SUGGEST OBJECT -----------------------------*/
//instantiate the object when a chosen input box recieves "focus"
function SuggestObject_theme(elm,mthd,_class,_servletPath,textbox){
	
	onemorex=textbox;
	this.method = mthd;
	this.request = suggest_request_theme;   
	this.callback = suggest_response_theme;	
	this.servletPath=_servletPath;
	this.txtInput = elm;
	this.txtInput.self = this;//so we can reference this object on the "Listener Events"
	this.txtInput.onkeyup = _OnKeyUp_theme;
	this.txtInput.onkeydown = _OnKeyDown_theme;
	this.txtInput.oldValue = elm.value;
	this.txtInput.historyIndex=0;	
	
	//set SUGGEST BOX properties
	this.itemCount = 0;
	this.selIndex = -1;
	this.comboBox = new suggestBox_theme(this.txtInput,_class,textbox);
	//for event mathcing
	e = window.event
 	this.selectItem = _selectItem_theme;
 	this.addItem = _addItem_theme;
	this._cmd='';
	this.txtInput.onblur = _OnBlur_theme;
}
//build the actual suggest box "div"
 function suggestBox_theme(fld,_class,textbox){
        
	 if( textbox.length > 25 )
		{
		  	this.ul = document.createElement('UL');
		  	this.div = document.createElement('DIV');
		  	this.div.className = _class;//'suggestBox';	  
		    var xy = getCoords_theme(fld);
	        this.div.style.left = xy.X
	  	    this.div.style.top=xy.Y 
		
		}	
	    else 
	    {
	     
	        this.ul = document.createElement('UL');
		    this.div = document.createElement('DIV');
	   	    this.div.className = _class;//'suggestBox';
	   	   //This mehod find out the left and top of our text box which we are using
	   	     var xy = getCoords_theme(fld);
	   	   //setting top and left
	   	    this.div.style.left = xy.X
	  	    this.div.style.top=xy.Y 
	   	        
		}	
		 
	    this.div.style.width = 150 
	    this.div.style.height  = 100 
	    this.div.style.overflow='auto'
	   
		this.div.appendChild(this.ul);
		document.body.appendChild(this.div);
		
		this.div.onblur = _OnBlur_div_theme;
		this.div.onmouseout= _OnMouseOut_theme
		this.div.onmouseover=_OnMouseOver_theme

}

//add items into the suggest box
function _addItem_theme(ct,idx){
var e;
	var obj = this;
	var A = document.createElement('A');
		A.onclick = function(){ 
			obj.selIndex = idx;
			_selectItem_theme(obj,e); 
		}
		A.style.cursor = 'pointer';
		A.innerHTML = ct;		
	
	var LI = document.createElement('LI');
		LI.appendChild(A);	
		
		this.comboBox.ul.appendChild(LI);
		
}

//choose an item from the suggest box
function _selectItem_theme(obj,e) {

   
	var li = obj.comboBox.ul.getElementsByTagName('LI');
	
	var value = '';
	if(li.length){
                 
		value = li[obj.selIndex].getElementsByTagName('A')[0].innerHTML;
		
	
	}else{
		
		value = obj.txtInput.value;
              			
	}
	vari=0;
	//This condition is for clear history event
	if(value=='<FONT color=red>Clear History</FONT>' || value=='<font color="red">Clear History</font>') {
		
			obj.comboBox.ul.innerHTML = '';
			this._cmd='cmd';
			this.self.request(); 
			obj.txtInput.focus();		
			return;
	}
	  //This condition is for to restric the user to select the History heading 
		if(value=='<FONT color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;History</FONT>' ||
		 value=='<font color="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;History</font>') 
		
		{
         
			this.txtInput.historyIndex=-999;
		  	return;
	
                }
		txt_value = value;
		obj.txtInput.value = value;
		obj.txtInput.oldValue = value;
		obj.comboBox.ul.innerHTML = '';
		
		if (e!=null)
		{
				if(e.keyCode!=9)
				{
						
				   document.SearchPageForm.searchString.value=value;
				   themeSearch_predictive();					
				}
				
		}		
		
		  else
		  {
		           document.SearchPageForm.searchString.value=value;
	                   themeSearch_predictive();
	  
		  }
		
	}//end of the selection method	
/*-------------------------END: SUGGEST OBJECT -----------------------------*/




/*-------------------------BEGIN: LISTENER EVENTS (to handle key up/down, etc..) -----------------------------*/
function _OnKeyUp_theme(e){
	var obj = this.self;
	if(obj.txtInput.oldValue != obj.txtInput.value){
		this.self.request(); // MAKE THE AJAX CALL
	}
}

//This mehod work for key board events
function _OnKeyDown_theme(e){

	var obj = this.self;
	var LIs = obj.comboBox.ul.getElementsByTagName('LI');
	obj.txtInput.oldValue = obj.txtInput.value;
	
	if (!e) e = window.event;

	switch (e.keyCode) {
		case 13: // enter
			_selectItem_theme(obj,e);
			return false;
		case 9: // tab
				_selectItem_theme(obj,e);
			        break;
		case 27: // escape
			obj.comboBox.ul.innerHTML = '';
			return false;
		case 38: // up arrow
			if(obj.selIndex > 0 ){
				LIs[obj.selIndex].className = '';
				obj.selIndex --;
				LIs[obj.selIndex].className = 'active';
			}
			return false;
		case 40: // down arrow
			if(obj.selIndex < (obj.itemCount-1) ){
				LIs[obj.selIndex].className = '';
				obj.selIndex ++;
				LIs[obj.selIndex].className = 'active';
			}
			
	 	  
			return false;
		}	
}
   //This mehod make div_mouseoutflag true when mouse over the  predictive search div
	function _OnBlur_theme(e){
	
	    	var obj = this.self;
	    	
	    //This if condition works for div_mouseoutflag only false 
	    //this particularly to solve the clear history and scroll bar vanish problem
	    if(div_mouseoutflag!=true)
	    {
	 
	    	this.self.comboBox.ul.innerHTML='';
            syncFieldVal(obj.txtInput.name);   		
  			
  		}
	
	}
   //This mehod make div_mouseoutflag false when mouse go out of the div
	function _OnMouseOut_theme(e){
	
	    	div_mouseoutflag=false;
		}
	//This mehod make div_mouseoutflag true when mouse over the  predictive search div
	function _OnMouseOver_theme(e)
	
	{      	
      
      	div_mouseoutflag=true;
     
	}
	//This method fire when we on blur the predictive search div
	function _OnBlur_div_theme(e)
	{
	  
	 _OnBlur_theme(e);
	
 	}
 	

   
   
   
	

/*-------------------------END: LISTENER EVENTS -----------------------------*/




/*-------------------------BEGIN: UTILITY FUNCTIONS -----------------------------*/
//This method find out the top and left position of text box with respect to body and browser 
function getCoords_theme(obj){
	var isIE = (navigator.appName.toLowerCase() == "microsoft internet explorer")
	var isNN = (navigator.appName.toLowerCase() == "netscape")
	
	var objParent = null;
	var intX = 0;
	var intY = 0;
	
	var el = obj
			
			var x = 0;
			var y = el.offsetHeight;
		
			//Walk up the DOM and add up all of the offset positions.
			while (el.offsetParent && el.tagName.toUpperCase() != 'BODY')
			{
				x += el.offsetLeft;
				y += el.offsetTop;
				el = el.offsetParent;
			}
	var ret = new Object();
			x += el.offsetLeft;
			y += el.offsetTop;
	
			//this.div.style.left = x + 'px';
			//this.div.style.top = y + 'px';
			ret.X= x + 'px';
			ret.Y = y + 'px';         
	

	return ret;
}
/*-------------------------END: UTILITY FUNCTIONS -----------------------------*/

//TO SHOW THE  SEARCH HISTORY IN SAME DIV

//for cookies




	
