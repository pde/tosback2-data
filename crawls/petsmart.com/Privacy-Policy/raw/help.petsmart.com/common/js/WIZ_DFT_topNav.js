Object.extend(Wizzle,
	{
	//JSON object of new paramerters and methods
	
	dropNav: function(obj,para){
		var elm = Element.getChildElements(obj,'li')
		for(var i=0; i<elm.length; i++){
			var ele = elm[i]
			//drop it down
			ele.onmouseover = function(){
				if(Element.getChildElements(this,'ul')[0]){
					var temp = Element.getChildElements(this,'ul')[0]
					temp.style.display ="block"
					
					//create iframe layer
					if(Global.ie){
						var dem = {}
						dem.width = parseInt(temp.offsetWidth)
						dem.height = parseInt(temp.offsetHeight)
						if(Element.getChildElements(this,'div').length > 0){
							Element.getChildElements(this,'div')[0].style.display = 'block'
						}else{
							var oDiv = document.createElement('div')
							oDiv.className = "oDiv"
							oDiv.style.display = 'block'
							oDiv.style.height = dem.height+'px'
							oDiv.style.width = dem.width+'px'
							oDiv.innerHTML = "<iframe style='filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);' scrolling='no' src='javascript:false;' frameborder='0' height='" +  dem.height + "px' width='" + dem.width + "px'></iframe>"
							this.insertBefore(oDiv,Element.getChildElements(this,'ul')[0])
						}
					}
				}
			}
			
			//bring it up
			ele.onmouseout = function(){
				if(Element.getChildElements(this,'ul')[0]){
					Element.getChildElements(this,'ul')[0].style.display ="none"
					if(Global.ie)Element.getChildElements(this,'div')[0].style.display ="none"
				}
			}
		}
	}

//END JSON object
});

//mouseover functions
function imgOn(imgName)
{
	if (document.images && document.getElementById(imgName).src.indexOf("_on") < 0)
	{
    	document.getElementById(imgName).src = eval(imgName + "_over.src");
	}
}

function imgOff(imgName)
{
	if (document.images && document.getElementById(imgName).src.indexOf("_on") < 0)
	{
		document.getElementById(imgName).src = eval(imgName + "_off.src");
	}
}

if (document.images)
{
	var path = "/common/images/";
	//topnav preload images
	topnav1_off = new Image();		topnav1_off.src = path + "topnav1_off.gif";
	topnav2_off = new Image();		topnav2_off.src = path + "topnav2_off.gif";
	topnav3_off = new Image();		topnav3_off.src = path + "topnav3_off.gif";
	topnav4_off = new Image();		topnav4_off.src = path + "topnav4_off.gif";
	topnav5_off = new Image();		topnav5_off.src = path + "topnav5_off.gif";
	topnav6_off = new Image();		topnav6_off.src = path + "topnav6_off.gif";
	topnav7_off = new Image();		topnav7_off.src = path + "topnav7_off.gif";

	topnav1_on = new Image();		topnav1_on.src = path + "topnav1_on.gif";
	topnav2_on = new Image();		topnav2_on.src = path + "topnav2_on.gif";
	topnav3_on = new Image();		topnav3_on.src = path + "topnav3_on.gif";
	topnav4_on = new Image();		topnav4_on.src = path + "topnav4_on.gif";
	topnav5_on = new Image();		topnav5_on.src = path + "topnav5_on.gif";
	topnav6_on = new Image();		topnav6_on.src = path + "topnav6_on.gif";
	topnav7_on = new Image();		topnav7_on.src = path + "topnav7_on.gif";
}