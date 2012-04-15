/*objectcount contains the count */
var count,itemNumbers,assetId,buyMoreMax,buyMorePerClick,coremtype,objectarray,extskuflag,seeAllStyleAAT,gpPsetIDs,seeAllstyle,showColorSelector,showSizeSelector,showSizeLabelFlag,showColorLabelFlag,GPSLabel,DisAttrLabel,DisAttrDrpDnType,ColorSelectorType,SizeSelectorType,StyleSelectorType,objectcount,errorflag,yesflag,Itemnumber,atpLengthChangeFlag,aatTF

function productJSfuncInit() {
	count = new Array();
	itemNumbers = new Array();
	assetId = new Array();
	buyMoreMax = new Array();
	buyMorePerClick = new Array();
	coremtype= new Array();
	objectarray=new Array();
	extskuflag = new Array();
	seeAllStyleAAT=new Array();
	gpPsetIDs = new Array();
	seeAllstyle=new Array();
	showColorSelector=new Array();
	showSizeSelector=new Array();
	showSizeLabelFlag=new Array();
	showColorLabelFlag=new Array();
	GPSLabel=new Array();
	DisAttrLabel=new Array();
	DisAttrDrpDnType=new Array();
	ColorSelectorType=new Array();
	SizeSelectorType=new Array();
	StyleSelectorType = new Array();
	objectcount=0;       
	errorflag=0;
	yesflag=0;
	Itemnumber;
	atpLengthChangeFlag=0;
	aatTF=false;
}
function setContinueBrowsingURL(){
	document.getElementById("contbrowsing").style.display="block";				
	document.getElementById("contbrowsingURL").href="";
var queryString="";
	if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf("searchcriteria=");
  if (c_start!=-1)
    { 
    c_start=c_start + "searchcriteria".length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length
     var queryString = unescape(document.cookie.substring(c_start,c_end));




    } 
  }


	document.getElementById("contbrowsingURL").href=collectionInfoJSON.continueBrowsingURL+queryString;
}

// Variable that will be set to false to disable multiple form submissions
//Removing this fix 9.29.10
//$(document).ready(function()
//{
//	selectionFormPosted = false;
//	$("p.margin-t-20 > a").bind('click', function()
//	{
//		if (selectionFormPosted == true) return false;
//		selectionFormPosted = true;
//		return true;
//	});
//});

var CatviewLink=null;
var catviewURL=null;

function trimAll(sString) 
{
while (sString.substring(0,1) == ' ') 
{ 
sString = sString.substring(1, sString.length); 
} 
while (sString.substring(sString.length-1, sString.length) == ' ') 
{ 
sString = sString.substring(0,sString.length-1); 
} 
return sString; 
} 

function stripHTML(htmlString){
var re= /<\S[^><]*>/g;
for (i=0; i<htmlString.length; i++){
htmlString=htmlString.replace(re, "");
}
htmlString=trimAll(htmlString);
htmlString=html_entity_decode(htmlString);
return htmlString;
}
//fix for defect 943 END
 function html_entity_decode(str)
  {
      var tarea=document.createElement('textarea');
      tarea.innerHTML = str; return tarea.value;
      tarea.parentNode.removeChild(tarea);
   }

function fire(el) {
	   if (document.createEvent && document.dispatchEvent) {
	  var evt = document.createEvent('HTMLEvents');
         evt.initEvent( "change", true, true);
         el.dispatchEvent(evt);
       } else if (document.createEventObject) {
		 el.fireEvent("onchange");
       }
   }
/* String trim functions start */
 
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/* String trim functions end */
function popup(pcount)
{
	var id1="vsImage_"+pcount;
	var somename=document.getElementById(id1);
	var href=somename.src;
	vsPopUp(href,'windowMed');
	return false;
}

function popupCrossSell(url)
{
	var href=url;
	vsPopUp(href,'windowMed');
	return false;
}

function OnStyleChange(dropdownsname,objectcount,gi){
		var indexOFSize;
		var dropdownname;
		var formname="form"+gi;
var drop = document.forms[formname].elements[dropdownsname];

if(drop.selectedIndex!=0){
 document.getElementById("ASSETID_"+objectcount).value= gpPsetIDs[gi][drop.selectedIndex-1];
}else{
document.getElementById("ASSETID_"+objectcount).value="";
}
	/* For getting the values of the selected option*/
	for( j = 0; j < drop.options.length; j++)
	{	
		if(drop.options[j].selected)
		{		
			//for removing the previous values selected during the selection of other productsets
			var splitDistinctAttrs = new Array();
			splitDistinctAttrs=objectarray[gi].Distinctattr;
			for(var k=0; k<splitDistinctAttrs.length; k++)
			{	
			if(splitDistinctAttrs[k]!="quantity" && splitDistinctAttrs[k]!=StyleSelectorType[gi])
				{	
					try{
						$('select[name="'+splitDistinctAttrs[k]+'_'+objectcount+'"]')[0].options.length=1;
					}catch(err){}
				}
			}
			if(!drop.options[0].selected)
			{
				var dropdownsarraynames= new Array();
				dropdownsarraynames=objectarray[gi].Distinctattr;				
				var dropdownnamesarraylength=dropdownsarraynames.length;
				var styles=0;
				for(var dropdowncount=0;dropdowncount<dropdownnamesarraylength;dropdowncount++)
				{
					if(dropdownsarraynames[dropdowncount]==StyleSelectorType[gi])
					{
					styles=1;
					}
					if(objectarray[gi].SelectorLabel[dropdowncount].toLowerCase()=="colorselectorlabel")
					{
						var dropdownname=dropdownsarraynames[dropdowncount]+"_"+objectcount;
						addDropDownValue(objectarray[gi].color[j-1],objectarray[gi].color[j-1],dropdownname,dropdowncount,gi);
					}
					if(objectarray[gi].extskuflag[0]!=true)
					{
						if (objectarray[gi].SelectorLabel[dropdowncount].toLowerCase()=="sizeselectorlabel")
						{
							var dropdownname=dropdownsarraynames[dropdowncount]+"_"+objectcount;
							addDropDownValue(objectarray[gi].sizevalue[j-1],objectarray[gi].size[j-1],dropdownname,dropdowncount,gi);
						}
					}
					if(objectarray[gi].SelectorLabel[dropdowncount].toLowerCase()=="distinctattrselectorlabel")
					{
						var dropdownname=dropdownsarraynames[dropdowncount]+"_"+objectcount;
						if(styles==1)
						{
							try
							{			
								addDropDownValue(objectarray[gi].lengthitemnumber[j-1],objectarray[gi].lengthdescription[j-1],dropdownname,dropdowncount,gi);							
							}catch(err){}
						}
						else
						{
							addDropDownValue(objectarray[gi].lengthitemnumber[j-1],objectarray[gi].length[j-1],dropdownname,dropdowncount,gi);
						}
					}
				}
			}
		}	
	}

	VSD.UI.destroySelectmenus("#overlay");
	$("select","#overlay").css({"visibility":"visible","display":"block"});
	
	VSD.UI.initSelectmenus("#overlay");
return true;
}
/*****************************************/
function OnLengthChange(dropdownsname,objectcount,gi,dropdowncount)
{

//alert("prodJSfunc onlength");
if(atpLengthChangeFlag==0){
var indexOFSize="";
var dropdownname="";
var formname="form"+gi;
var SelectorLabelTEMP=null;

SelectorLabelTEMP= objectarray[gi].SelectorLabel;
	 var index=0;
try{
	index=document.forms[formname].elements["style_"+gi].selectedIndex-1;
}catch(err){index=0;}
if (objectarray[gi].extskuflag[0]==true)
	{	
		var styleParentId='';
		var drop='';
		var styleParentIds=document.getElementsByTagName("select");				
		for(var i=0;i<styleParentIds.length;i++){
			if(styleParentIds[i].id.replace(".","")==dropdownsname.replace(".","")){
				styleParentId = styleParentIds[i].parentNode.id;
			}
		
		}
try{
	for (var i = 0; i < document.getElementById(styleParentId).childNodes.length; i++) 
	{
		  if (document.getElementById(styleParentId).childNodes[i].id.replace(".","")==dropdownsname.replace(".",""))
		 {
		        drop=document.getElementById(styleParentId).childNodes[i];
		 }
	}
}catch(err){}
		if(drop!=''){
		 //For getting the values of the selected option
		for( j = 0; j < drop.options.length; j++)
		{	
			if(drop.options[j].selected)
			{		
				//for removing the previous values selected during the selection of other productsets
				try{

				var x;
				indexOFSize=null;
				for(x=0;x<SelectorLabelTEMP.length;x++)
				{
					if(SelectorLabelTEMP[x].toLowerCase()=="sizeselectorlabel")
					{
					indexOFSize=x;
					break;				
					}
				}	
				dropdownname=objectarray[gi].Distinctattr[indexOFSize]+"_"+objectcount;
				document.forms[formname].elements[dropdownname].options.length=1;
				}catch(err){}
				if(!drop.options[0].selected)
				{	
					dropdownname=objectarray[gi].Distinctattr[indexOFSize]+"_"+objectcount;
					addDropDownValue(objectarray[gi].sizevalue[index].split("|")[j-1],objectarray[gi].size[index].split("|")[j-1],dropdownname,dropdowncount,gi);
					
				}
				else if(drop.options.length==1) {					
				}
			}	
		}
	}
	}
	}
return true;
}

/*retrieves the values of the object and calls the addDropDown fuction */
function GetObject(object,mi,gi)
{
		var dropdownnames=new Array();
		var dropdownlabels = new Array ();
		dropdownnames=object.Distinctattr;
		dropdownlabels=object.DistinctattrLabel;
		var dropdownnamesarraylength=dropdownnames.length;
		var styles=0;
		
	/*calls the addDropDown function for every dropdown to be created*/
	for(var dropdowncount=0;dropdowncount<dropdownnamesarraylength;dropdowncount++)
	{
				//if(dropdownnames[dropdowncount]=="style")
				if(dropdownnames[dropdowncount]==StyleSelectorType[gi])
				{
					styles=1;
				}
		addDropDown(object,mi,dropdownnames[dropdowncount],gi,styles,dropdownlabels[dropdowncount],dropdowncount);
	}
}

/*Creates the dropdowns and generates the values to it */
function addDropDown(object,objectcount,dropdownname,gi,styles,dropdownlabel,dropdowncount)
{
	
	var dropDownsInner=document.getElementById('dropDownSet_'+objectcount).innerHTML;

	var formname="form"+gi;
	if(dropdownname==StyleSelectorType[gi])
	{
		var dropdownname="style";
		dropdownsname=dropdownname+"_"+objectcount;

		var innerstring="class=\'m-b-5\' onchange=\'OnStyleChange(\""+dropdownsname+"\","+objectcount+","+gi+");\'";
		dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" "+innerstring+"><option name="+dropdownsname+" id="+dropdownsname+" value=''>"+dropdownlabel+"</option></select><br />";
		
		
		if(seeAllstyle.length > 0 && seeAllstyle[gi] != -1)
		{
			dropDownsInner=dropDownsInner+seeAllstyle[gi];
			seeAllstyle[gi] = -1 ;
		}
		
		//lastGIval=gi;		

		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;

		var myVarr=document.getElementById(dropdownsname);
		
		/*calls the addDropDownValue function for every dropdown value to be created*/
		addStyleDropDownValue(object.stylevalue,object.style,dropdownsname);


	}
	else if(object.SelectorLabel[dropdowncount].toLowerCase()=="distinctattrselectorlabel" )
	{
		var dropdownsname=dropdownname+"_"+objectcount;
		if (objectarray[gi].extskuflag[0]==true)
		{
			dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-r-5 m-b-5\'onchange=\'OnLengthChange(\""+dropdownsname+"\","+objectcount+","+gi+","+dropdowncount+");\'><option name="+dropdownsname+" id="+dropdownsname+"  value=''>"+dropdownlabel+"</option></select>";
		}
		else
		{
			dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-r-5 m-b-5\'><option name="+dropdownsname+" id="+dropdownsname+"  value=''>"+dropdownlabel+"</option></select>";
		}
		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
		if(styles==0)
		{
			addDropDownValue(objectarray[gi].lengthitemnumber[0],objectarray[gi].lengthdescription[0],dropdownname+"_"+objectcount,dropdowncount,gi);
		}
	}
	else if(object.SelectorLabel[dropdowncount].toLowerCase()=="sizeselectorlabel" )
	{
		var dropdownsname=dropdownname+"_"+objectcount;
		var sizeValue=objectarray[gi].sizevalue[0];
		var dispsize=objectarray[gi].size[0];
		newSizeArray=sizeValue.split(":");


		if(newSizeArray.length==2)
		{
		dropDownsInner=dropDownsInner+"<select style=\"display:none;\" name="+dropdownsname+" id="+dropdownsname+"></select>";
		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
		var AddOptionToObj=document.forms[formname].elements[dropdownsname];


    		var newOpt = document.createElement('option');
		newOpt.text = newSizeArray[0];
    		newOpt.value = newSizeArray[1];






		newOpt.selected=true;
    		try {
			AddOptionToObj.add(newOpt, null); // standards 

    		}
		 catch(ex) {
		AddOptionToObj.add(newOpt); // IE only

    		}
		//checking flag value set in createUpdateDropdowns function
		 if (showSizeLabelFlag[gi]==true)
		 	{ 	
				var newdispsize=dispsize.split(":")[1];
				var oneValue="";
				oneValue=oneValue +"<label for="+dropdownsname+" class=\'left m-r-5 m-b-5\'>"+dropdownlabel+": "+newdispsize+"</label>";
				document.getElementById('IfOneSize_'+gi).innerHTML=document.getElementById('IfOneSize_'+gi).innerHTML+oneValue;				
				// making the size flag as false
				showSizeLabelFlag[gi]=false;				
			}


		}
		else{
		dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-r-5 m-b-5\'><option name="+dropdownsname+" id="+dropdownsname+" value='' >"+dropdownlabel+"</option></select>";
		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
		if(styles==0 && objectarray[gi].extskuflag[gi]!=true)
		{
			addDropDownValue(objectarray[gi].sizevalue[0],objectarray[gi].size[0],dropdownname+"_"+objectcount,dropdowncount,gi);
		}
		else {
			addDropDownValue(objectarray[gi].sizevalue[0].split('|')[0],objectarray[gi].size[0].split('|')[0],dropdownname+"_"+objectcount,dropdowncount,gi);			
		}
		}
	
	}
	// To Add Color DropDown
	else if(object.SelectorLabel[dropdowncount].toLowerCase()=="colorselectorlabel")
	{
		var colValue=objectarray[gi].color[0];
		newColorArray=colValue.split(":");
		var dropdownsname=dropdownname+"_"+objectcount;
		if(newColorArray.length==1&&StyleSelectorType[gi]==-1)
		{
			dropDownsInner=dropDownsInner+"<div style=\"display:none;\"><select name="+dropdownsname+" id="+dropdownsname+" class=\'sel-color\'></select></div>";
			document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
			var AddOptionToObj=document.forms[formname].elements[dropdownsname];


    			var newOpt = document.createElement('option');
			newOpt.text = newColorArray[0].split("-")[1];
    			newOpt.value = newColorArray[0];
			newOpt.selected=true;


    			try {
			      AddOptionToObj.add(newOpt, null); // standards 

    				}
		    	catch(ex) {
			      AddOptionToObj.add(newOpt); // IE only

    			}


		//checking flag value set in createUpdateDropdowns function
		if (showColorLabelFlag[gi]==true)
		 	{ 	
				var colorDesc = trim(newColorArray[0].split("-")[1]);
				if(colorDesc != "")
				{
				var oneValue="";
				oneValue=oneValue+"<label for="+dropdownsname+" class=\'clear-both m-b-5\'>"+dropdownlabel+": "+newColorArray[0].split("-")[1]+"</label>";
				document.getElementById('IfOneSize_'+gi).innerHTML=document.getElementById('IfOneSize_'+gi).innerHTML+oneValue;				
				}

				//dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'sel-color\' style=\"display:none;\"><option name="+dropdownsname+" id="+dropdownsname+" value="+newColorArray[0].app+" >"+newColorArray[0].split("-")[1]+"</option></select>";
				//making the color flag as false
				showColorLabelFlag[gi]=false;
			}
		}else{
		dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-r-5 m-b-5\'><option name="+dropdownsname+" id="+dropdownsname+" value='' >"+dropdownlabel+"</option></select>";
		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
		if(styles==0)
		{
		addDropDownValue(objectarray[gi].color[0],objectarray[gi].color[0],dropdownname+"_"+objectcount,dropdowncount,gi);

		}
		}
	}
	
	else if(dropdownname=="quantity")
	{
	
		var dropdownsname=dropdownname+"_"+objectcount;

		////var div=document.getElementById('div5');
		////div.innerHTML = "<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-b-5\'><option name="+dropdownsname+" id="+dropdownsname+">"+"quantity"+"</option></select>";
		dropDownsInner=dropDownsInner+"<select name="+dropdownsname+" id="+dropdownsname+" class=\'left m-b-5\'><option name="+dropdownsname+" id="+dropdownsname+" value=''>"+"quantity"+"</option><option value=\"1\" id=\"1\">1<\/option><option value=\"2\" id=\"2\">2<\/option><option value=\"3\" id=\"3\">3<\/option><option value=\"4\" id=\"4\">4<\/option><option value=\"5\" id=\"5\">5<\/option><option value=\"6\" id=\"6\">6<\/option><option value=\"7\" id=\"7\">7<\/option></select><br/>";
		document.getElementById('dropDownSet_'+objectcount).innerHTML=dropDownsInner;
		var dropdownname="quantity"+"_"+objectcount;
		//var selectquantity=document.getElementById(dropdownname);
		//selectquantity.options.length=1;



	}else{}


}

/*Creates the dropdownsvalue and associates to the dropdown */
function addDropDownValue(key,value,dropdownsname,dropdowncount,gi)
{	
	var select='';
	var selectParentId='';
	var gIndex='';
	var oneUp=false;
	var selectParentIds=document.getElementsByTagName("select");				
	for(var i=0;i<selectParentIds.length;i++){
	
		if(selectParentIds[i].id.replace('.','')==dropdownsname.replace('.','')){
		selectParentId= selectParentIds[i].parentNode.id;
		if(selectParentId=='') {selectParentId=selectParentIds[i].parentNode.parentNode.id;oneUp=true;}
		try{
			
			grandParentId=document.getElementById(selectParentId).parentNode.id;		
			
			gIndex=grandParentId.split("_")[1];
			
			}catch(err){}
		}
	}	
try{
	if(oneUp) {
		for (var i = 0; i < document.getElementById(selectParentId).childNodes.length; i++) 
		{	
			for (var k = 0; k < document.getElementById(selectParentId).childNodes[i].childNodes.length; k++) 
			{					
				  if (document.getElementById(selectParentId).childNodes[i].childNodes[k].id.replace('.','')==dropdownsname.replace('.',''))
				 {
				     select=document.getElementById(selectParentId).childNodes[i].childNodes[k];
					 break;			
				 }
			}
		}
	}
	else {
			
		for (var i = 0; i < document.getElementById(selectParentId).childNodes.length; i++) 
		{			
			  if (document.getElementById(selectParentId).childNodes[i].id.replace('.','')==dropdownsname.replace('.',''))
			 {
			     select=document.getElementById(selectParentId).childNodes[i];
				 break;			
			 }
		}
	}
}catch(err){}
	if(select!=''){		
	newarray=value.split(":");
	newarraykey=key.split(":");	

	/* adding values to the dropdown*/
	for(var k=0;k<newarray.length;k++)
	{
        if(newarray[k].length!=0){
		
		var option = document.createElement("option");
		if (objectarray[gi].SelectorLabel[dropdowncount].toLowerCase()=="colorselectorlabel")
		{
			option.text = newarray[k].split("-")[1];
		}
		else
		{
			option.text = newarray[k];
		}
		option.value = newarraykey[k];
		option.name =newarray[k];
		option.id = newarray[k];
		try {

			select.add(option, null); //Standard

			}
		catch(error)
			{
			

			try{select.add(option); // IE only
	}catch(err){		
	var errorString='';
	for(i in err){
	errorString += i + ':' + err[i]+'\n';
	}
	
	}
		}
	 }
	}

		//need to move to checkout.js. -vk.
//	$(document).ready(function() {
//		VSD.UI.destroySelectmenus("#overlay");
//		$("select","#overlay").css({"visibility":"visible","display":"block"});
//		VSD.UI.initSelectmenus("#overlay");
//	});
}//If end
//return true;
}

function addStyleDropDownValue(key,value,dropdownsname)
{

		var styleParentId='';
		var styleParentIds=document.getElementsByTagName("select");				
		for(var i=0;i<styleParentIds.length;i++){
			
			if(styleParentIds[i].id==dropdownsname){
				styleParentId = styleParentIds[i].parentNode.id;
			}
		}
	
	var styleGi=document.getElementById(styleParentId).firstChild;

	//var select1=document.getElementById(styleParentId);



for(var k=0;k<value.length;k++)
{
var option = document.createElement("option");
option.text = value[k];
option.value = key[k];
option.name =value[k];
option.id = value[k];

try {
styleGi.add(option, null); //Standard
}
catch(error)
{
try{
styleGi.add(option);// IE only
}
catch(err){ }
}



}

}
function updateFormElements(isTF)
{
	var FormElements="";
	var dropDownElements="";
	var i;
	var j;
	var moduleIndexCounter=0;
	var templabel="";
	var splitDistinctAttrs = null;
	var distinctattr="";
	var tempDist=new Array();
	var tempVar="";
	$('#formElements').html("");
	for(i=0;i<count.length;i++)
	{	
		tempDist=new Array();
		
		distinctattr=objectarray[i].Distinctattr.join(",");
		for(var d=0;d<objectarray[i].Distinctattr.length;d++)
		{
			if(GPSLabel[i]!=null&&GPSLabel[i]==objectarray[i].Distinctattr[d])
			{
				continue;
			}else if(DisAttrLabel[i]!=null&&DisAttrLabel[i]==objectarray[i].Distinctattr[d]&&objectarray[i].extskuflag[0]==true)
			{
				continue;	
			}else{
			
				tempVar="";
				tempVar=objectarray[i].SelectorLabel[d]+"|"+objectarray[i].Distinctattr[d];
				tempVar=tempVar.toUpperCase();
				tempDist.push(tempVar);
			}
			
		}		
		if(GPSLabel[i]!="-1"){
			templabel="";
			templabel=GPSLabel[i]+"\,";
			distinctattr=distinctattr.replace(templabel,"");
		}

		if(objectarray[i].extskuflag[0]==true)
		{
			templabel="";
			templabel=DisAttrLabel[i]+"\,";
			distinctattr=distinctattr.replace(templabel,"");
		}
		dropDownElements="";
		$('#selectionControls_'+i).html("");
		FormElements=FormElements+"<input type=\"hidden\" id=\"COUNT_"+i+"\" name=\"COUNT_"+i+"\" VALUE=\""+count[i]+" \"/>\n";
		for(j=0;j<count[i];j++)
		{	
			if(itemNumbers[i]!=null &&itemNumbers[i].length!=0&&GPSLabel[i]=="-1")
			{
				FormElements=FormElements+"<input type=\"hidden\" id=\"ITEM_"+moduleIndexCounter+"\" name=\"ITEM_"+moduleIndexCounter+"\" VALUE=\""+itemNumbers[i]+"\"/>\n";
			}
			if(gpPsetIDs[i].length>1&&!(StyleSelectorType[i]=="-1")){
				FormElements=FormElements+"<input type=\"hidden\" id=\"ASSETID_"+moduleIndexCounter+"\" name=\"ASSETID_"+moduleIndexCounter+"\" VALUE=\"\"/>\n";
			}else{
				assetId=gpPsetIDs[i];
				FormElements=FormElements+"<input type=\"hidden\" id=\"ASSETID_"+moduleIndexCounter+"\" name=\"ASSETID_"+moduleIndexCounter+"\" VALUE=\""+assetId[0]+"\"/>\n";

			}
			FormElements=FormElements+"<input type=\"hidden\" id=\"DISTINCTATTRS_"+moduleIndexCounter+"\" name=\"DISTINCTATTRS_"+moduleIndexCounter+"\" VALUE=\""+tempDist.join(",")+"\"/>\n";
			//FormElements=FormElements+"<input type=\"hidden\" id=\"DISTINCTATTRS_"+moduleIndexCounter+"\" name=\"DISTINCTATTRS_"+moduleIndexCounter+"\" VALUE=\""+distinctattr.toUpperCase()+"\"/>\n";

			splitDistinctAttrs = new Array();
			splitDistinctAttrs=objectarray[i].Distinctattr;
			//splitDistinctAttrs=objectarray[i].Distinctattr.split(",");






			for(k=0;k<splitDistinctAttrs.length;k++)
			{
				if(GPSLabel[i]==splitDistinctAttrs[k])
					{
					FormElements=FormElements+"<input type=\"hidden\" id=\"STYLE_"+moduleIndexCounter+"\" name=\"STYLE_"+moduleIndexCounter+"\" value=\"\"/>\n";
				}
				else{
					FormElements=FormElements+"<input type=\"hidden\" id=\""+splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter+"\" name=\""+splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter+"\" value=\"\"/>\n";
				}
			}
			splitDistinctAttrs=null;
			dropDownElements=dropDownElements+"<div id=\"dropDownSet_"+moduleIndexCounter+"\" class=\"grp\"></div><div style=\"display: none;\" id=\"atp-msg-"+moduleIndexCounter+"\" class=\"atp-msg\"><div class=\"atp-msg-window\"><span class=\"atp-msg-cntnr\" ></span></div></div>";
			moduleIndexCounter++;
		}
		$('#selectionControls_'+i).html(dropDownElements);
	}

if (typeof(collectionInfoJSON) != "undefined" && collectionInfoJSON.SIMPLEPAGENAME != "null") {

		FormElements = FormElements
				+ "<input type=\"hidden\" name=\"SIMPLEPAGENAME\" value="+collectionInfoJSON.SIMPLEPAGENAME+"></input>";
	} else {
		FormElements = FormElements
				+ "<input type=\"hidden\" name=\"SIMPLEPAGENAME\" value=\"catalogue|catalogue\"></input>";
	}

if (typeof(collectionInfoJSON) != "undefined" && collectionInfoJSON.continueBrowsingURL != "") {

	FormElements = FormElements
			+ "<input type=\"hidden\" name=\"isFaceted\" value=\"true\"></input>";
}

	var splitCoremtype=new Array();
	try{
        splitCoremtypearray=new Array();
	splitCoremtype=coremtype[0].split(",");
	for(i=0;i<splitCoremtype.length;i++)
	{	
            splitCoremtypearray=objectarray[0].length[i].split(':');
                for(k=0;k<splitCoremtypearray.length;k++)
		{
              	FormElements=FormElements+"<input type=\"hidden\" id=\"COREMTYPE_"+splitCoremtype[i]+"\" name=\"COREMTYPE_"+splitCoremtypearray[k]+"\" VALUE=\"MAIN\"/>\n";
	        }
	}
 
	for(i=1;i<coremtype.length;i++)
	{
		splitCoremtype=null;
		splitCoremtype=new Array();
		splitCoremtype=coremtype[i].split(",");
             
		for(j=0;j<splitCoremtype.length;j++)

		 {		
               splitCoremtypearray=objectarray[i].length[j].split(':');
		
               for(k=0;k<splitCoremtypearray.length;k++)
		  {
	           FormElements=FormElements+"<input type=\"hidden\" id=\"COREMTYPE_"+splitCoremtype[j]+"\" name=\"COREMTYPE_"+splitCoremtypearray[k]+"\" VALUE=\"CROSS\"/>\n";
		  }
		}
		
	}
}catch(e){}	
	$('#formElements').html(FormElements);
	
	createUpdateDropdowns();
	if(isTF){
		aatTF=true;
		var tof=startOfAtp();
		return tof;
	}
}

function addMoreAAT(gi)
{
	var numControlsToAdd;
	eval("assetIdPrimary= document.SelectionForm.ASSETID_0");
	assetIdPrimaryParam=assetIdPrimary.value;
	saveForm(assetIdPrimaryParam);
	
	seeAllstyle[gi]=seeAllStyleAAT[gi];
	
	
	if((count[gi]+buyMorePerClick[gi])>buyMoreMax[gi])
	{
		numControlsToAdd=buyMoreMax[gi]-count[gi];
		
	}
	else
	{
		numControlsToAdd=buyMorePerClick[gi];
	} 
	//call to function to add selection controls
	
	 count[gi]=count[gi]+numControlsToAdd;
	 if(count[gi]>=buyMoreMax[gi])
	 {
	 	 //document.getElementById('addMoreAAT_'+gi).parentNode.style.display = 'none';
	 	 document.getElementById('addMoreAAT_'+gi).style.visibility = 'hidden';
		}

		var tf=updateFormElements(true);
		aatTF=false;
		//if(tf){alert("test1");}
		//restoreForm(assetIdPrimaryParam);
}
function createUpdateDropdowns()
{
	var moduleIndexCounter=0;
	for(var i=0;i<count.length;i++)
	{	
		//setting the flag values to be used in the addDropDown function
		//Showsizelabelflag = true;
		//showColorLabelFlag = true;
		
		for(j=0;j<count[i];j++)
		{
			//call Function to create dropdown GetDropDown(obj[i],moduleIndexCounter);
			GetObject(objectarray[i],moduleIndexCounter,i);
			moduleIndexCounter++;
		}
	}	
}
function consolidateForm()
{
saveForm();
var sel;
var qsel;
var key;
var KeysValue;
var i=0,j=0;
var moduleIndexCounter=0;
var splitDistinctAttrs = null;
var formname="";
	
for(i=0;i<count.length;i++)
	{	
		for(j=0;j<count[i];j++)
		{	
			formname="form"+i;	
			splitDistinctAttrs = new Array();
			splitDistinctAttrs=objectarray[i].Distinctattr;
			//splitDistinctAttrs=objectarray[i].Distinctattr.split(",");
			for(k=0;k<splitDistinctAttrs.length;k++)
			{
				if(objectarray[i].SelectorLabel[k].toLowerCase()=="distinctattrselectorlabel")
				{ 					
					if(!objectarray[i].extskuflag[0]==true)
					{
						try{
							if(document.forms[formname].elements[splitDistinctAttrs[k]+"_"+moduleIndexCounter].value =="null")
							{
								document.getElementById("ITEM_"+moduleIndexCounter).value=escape("");
							}
							else
							{
								if(itemNumbers[i]!=null &&itemNumbers[i].length!=0)
								{
									document.getElementById("ITEM_"+moduleIndexCounter).value=escape(document.forms[formname].elements[splitDistinctAttrs[k]+"_"+moduleIndexCounter].value);
								}														
								sel=document.forms[formname].elements[splitDistinctAttrs[k]+"_"+moduleIndexCounter];
								key ="";
								key = splitDistinctAttrs[k].toUpperCase();
								key=key+"_"+moduleIndexCounter;
								KeysValue="";
								if(sel.selectedIndex!=0)
								//breaks
								{
									KeysValue=sel.options[sel.selectedIndex].text;
									try{
										var tempdname="STYLE_"+moduleIndexCounter;
										document.SelectionForm.elements[tempdname].value=sel.options[sel.selectedIndex].value;
									}catch(e){}
								}
								document.SelectionForm.elements[key].value= KeysValue;
							}
							if(document.getElementById("ITEM_"+moduleIndexCounter).value!="null" &&document.getElementById("ITEM_"+moduleIndexCounter).value.length!=0)
							{
								if(sel.selectedIndex!=0)
									document.forms["SelectionForm"].elements[splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter].value =escape(document.getElementById(splitDistinctAttrs[k]+"_"+moduleIndexCounter)[document.getElementById(splitDistinctAttrs[k]+"_"+moduleIndexCounter).selectedIndex].innerHTML);
							}
							else
							{
								document.forms["SelectionForm"].elements[splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter].value="";
							}
						}
						catch(err)
						{}
					}
					else
					{
						try{						
								sel=document.forms[formname].elements[splitDistinctAttrs[k]+"_"+moduleIndexCounter];
								key ="";
								key = splitDistinctAttrs[k].toUpperCase();
								key=key+"_"+moduleIndexCounter;
								KeysValue="";
								if(sel.selectedIndex!=0)
									KeysValue=sel.options[sel.selectedIndex].text;
								document.SelectionForm.elements[key].value= KeysValue;
								if(document.getElementById("ITEM_"+moduleIndexCounter).value!="null" &&document.getElementById("ITEM_"+moduleIndexCounter).value.length!=0)


								{
									if(sel.selectedIndex!=0)
										document.forms["SelectionForm"].elements[splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter].value=escape(document.getElementById(splitDistinctAttrs[k]+"_"+moduleIndexCounter)[document.getElementById(splitDistinctAttrs[k]+"_"+moduleIndexCounter).selectedIndex].innerHTML);
								}
								else
								{
									document.forms["SelectionForm"].elements[splitDistinctAttrs[k].toUpperCase()+"_"+moduleIndexCounter].value="";
								}						
							}catch(err){}				
					}
				}
				//if not length/fit/swell
				else
				{
					try{
						var dname="";
						if(GPSLabel[i]!="-1"&&GPSLabel[i]==splitDistinctAttrs[k])
						{
							dname= "style";
						}else{
							dname=splitDistinctAttrs[k];
						}
							if(document.forms[formname].elements[dname+"_"+moduleIndexCounter].value =="null")
							{
								document.forms["SelectionForm"].elements[dname.toUpperCase()+"_"+moduleIndexCounter].value=escape("");
							}
							else
							{
								sel=document.forms[formname].elements[dname+"_"+moduleIndexCounter];
								qsel=document.forms[formname].elements["quantity_"+moduleIndexCounter];
								
								if(sel.options.length==1 && qsel.selectedIndex==0)
								{
									var elem=dname.toUpperCase()+"_"+moduleIndexCounter;
									document.SelectionForm.elements[elem].value=escape("");							
								}
								else{
								key ="";
								key = dname.toUpperCase();
								key=key+"_"+moduleIndexCounter;
								KeysValue="";
								KeysValue=sel.options[sel.selectedIndex].value;
								if(KeysValue!="")
									{
										document.SelectionForm.elements[key].value= KeysValue;}
								}
							}
						}
					catch(err){
						}}
			}
			splitDistinctAttrs=null;
			moduleIndexCounter++;
		}
	}

}
	function setFormUrlATW()
	{		
		document.SelectionForm.action=document.SelectionForm.action+"&ADDTOWISHLIST.X=49";
		if(VSD.ABTesting.is("commerce")){
			document.SelectionForm.action=document.SelectionForm.action.replace(VSD.www,VSD.swww);
			}
		if(null!=CatviewLink)
		{
			document.SelectionForm.action=document.SelectionForm.action+"&CatviewLink="+unescape(CatviewLink);
		}
		return true;
	}
	function setFormUrlATB(strUpdate) {
		if(VSD.ABTesting.is("commerce")){
			
			var actionUrl, form;
			//product page
			if (typeof cgName != "undefined" && $('form[name="SelectionForm"]')[0]) {
				actionUrl = document.SelectionForm.action;
				form = document.SelectionForm;
				$('form[name="SelectionForm"]').append('<input type="hidden" name="collectionName" value="' + encodeURIComponent(cgName.split(":")[0]) + '" />');
			//e gift card
			} else if ($('#EGiftCardAddToBagForm')[0]) {
				actionUrl = document.EGiftCardAddToBagForm.action;
				form = document.EGiftCardAddToBagForm;
				$('#EGiftCardAddToBagForm').append('<input type="hidden" name="collectionName" value="' + encodeURIComponent("EGC (E-GIFT CARD)") + '" />');
			//gift card
			} else if ($('#GiftCardATBForm')[0]) {
				actionUrl = document.GiftCardATBForm.action;
				form = document.GiftCardATBForm;
				$('#GiftCardATBForm').append('<input type="hidden" name="collectionName" value="' + encodeURIComponent("GC (GIFT CARD)") + '" />');
			// grids
			} else {
				actionUrl = document.SelectionForm.action;
				form = document.SelectionForm;
				$('form[name="SelectionForm"]').append('<input type="hidden" name="collectionName" value="' + encodeURIComponent(cmCategoryName) + '" />');
			}
			
			if(strUpdate=="updateEGC") 
				actionUrl =  actionUrl.replace("commerce/addToBagEGC.vs","commerce2/update/update")			
			else {
				//product add to bag url
				actionUrl =  actionUrl.replace("commerce/addToBag.vs", "commerce2/addtobag");
				//egc add to bag url
				actionUrl =  actionUrl.replace("commerce/addToBagEGC.vs", "commerce2/addtobag");
				//gc update url
				actionUrl =  actionUrl.replace("commerce/updateGiftCard.vs", "commerce2/update/update");
			}

			if(!form){
				form = document.SelectionForm;
			}
			
			actionUrl = VSD.swww + actionUrl.substr( actionUrl.indexOf("/commerce2"), actionUrl.length);
			form.action = actionUrl; 
		}
		if(null!=CatviewLink) {
			document.SelectionForm.action=document.SelectionForm.action+"&CatviewLink="+unescape(CatviewLink);
		}
		return true;
	}

	function setFormUrlUPDATE()
	{
		
		document.SelectionForm.action=document.SelectionForm.action+"&Update.x=44&Update.y=15";
		return true;
	}

	function updateCatviewUrl()
	{
		var divOBJ=document.getElementById("catview");
		divOBJ.style.display = "block";
		document.getElementById("catviewURL").href="";
		document.getElementById("catviewURL").href=catviewURL;
	}


/********************************18 mar****/

var cookie_domain = "";
if (location.host.indexOf("limited.com") != -1){
    cookie_domain = ".limited.com";
}else{
    cookie_domain = ".victoriassecret.com";
}

function setVSCookie(name, value, expires) {

    var eDate = "";
    if(expires != "" && expires != null)
    {
    	eDate = ";expires=" + expires.toGMTString() + ";";
    }
    var curCookie = name + "=" + escape(value) + "; path=/" + "; domain=" + cookie_domain + eDate; 
    document.cookie = curCookie;
    
}
function removeVSCookiePROD(c_name)
{
    var d = new Date();
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
	//alert(document.cookie);
	if (c_start!=-1)
	{ 
		c_start1=c_start + c_name.length+1 ;
		c_end=document.cookie.indexOf(";",c_start1);
		if (c_end==-1) c_end=document.cookie.length
		deletedCookieVal=(document.cookie.substring(c_start,c_end));
		//alert(deletedCookieVal)
	} 
   }
    document.cookie = deletedCookieVal+";expires=" + d.toGMTString() + ";" + ";";
    //alert(document.cookie);
}
function setVSCookiePROD(name, value, expires) {

    var eDate = "";
    if(expires != "" && expires != null)
    {
    	eDate = ";expires=" + expires.toGMTString() + ";";
    }
    var curCookie = name + "=" + value + "; path=/" + "; domain=" + cookie_domain + eDate; 
    document.cookie = curCookie;
    
}
function getVSCookie(name, overloaded){
	var result = "";
	var start = document.cookie.indexOf(name + "=");
	var end;
	if (start != -1){
		start += (name.length + 1);
		end = document.cookie.indexOf(";", start);
		if (end == -1)
			end = document.cookie.length;
		if(!overloaded)
			result = unescape(document.cookie.substring(start, end));
		else
			result = decodeURIComponent(document.cookie.substring(start, end));
	}
	return result;
}

/*****/
/*
 * Return the item number for a particular module
 *
 * The item number is either stored as a hidden field prefixed with a name of "ITEM_"
 * (for a single item) or a select box prefixed with a name of "STYLE_" (for a group of items).
 * The module number completes the name of the element.
 *
 */
function getItemNumber(moduleIndex,formname)
{
   
  	var itemNumber = null;

    // check if this module uses a hidden field
    //eval("style = document.SelectionForm.ITEM_" + moduleIndex);
	style = document.getElementById("ITEM_" + moduleIndex);

	
    if (style != null && typeof style != "undefined")
    {        

	itemNumber = style.value;
    }
    else
    {
      
	// check if this module uses a select box


       style=document.forms[formname].elements["style_"+moduleIndex];

	//style = document.getElementById("style_" + moduleIndex);
		

	try{
        if (style != null && typeof style != 'undefined')
        {
		itemNumber = style.options[style.selectedIndex].value;
	
        }
	}catch(e)
	{
	
	}
    }

    // if neither a hidden field or select box, we return null
    return itemNumber;
}

/*
 * Look at the item number of a module sets its value if it is a select box
 *
 * A module uses a hidden field for item number when it is a single item and a select box when it is a group
 * of items.  If the itemNumber passed in matches the item number of the module, a true is returned.
 * If the module is a group of items, the correct item in the select box is selected.
 * If the itemNumber passed in does not match, a false is returned.  If the module could not be found,
 * a null is returned.
 *
 */


function setItemNumber(moduleIndex, itemNumber,gi,formname)
{
	var styleValue = new Array();

    if (itemNumber == "") return null;

    // look for the hidden field single item

 	style = document.getElementById("ITEM_" + moduleIndex);


	if (style != null && typeof style != "undefined")
    {

		try{
			var temp=style.value.indexof(",");
			styleValue=style.value;
			}catch(e){
				styleValue.push(style.value);
			}
			for(var x=0;x<styleValue.length;x++){
				if(styleValue[x]==itemNumber){return true;}
		
			}
		return false;
    }

    // look for a select box of items
	style=document.forms[formname].elements["style_"+moduleIndex];

	if (style != null && typeof style != "undefined")
    {
        // go through the items in the list to find the one that matches the itemNumber passed in
        for (i = 0; i < style.options.length; i++)
        {
            if (style.options[i].value == itemNumber)
            {
                // we match the itemNumber passed in, so we select this item in the list
                style.options[i].selected = true;
			
                	// cause the rest of the attribute select boxes to repopulate
			//style.onchange();
                if(OnStyleChange("style_"+moduleIndex,moduleIndex,gi))
		{

		var el=style;
		  fire(el);
		  setTimeout('startOfAtp()',200);
                return true;
		}
            }
        }
        return false;
    }

    return null;
}
/***********SAVE-RESTORE CHANGE START**************************/
/*
 * Save the select box settings in a cookie
 *
 * The format of the cookie is:
 *
 * page_key:item_number,attribute1,attribute2,quantity:item_number2,attribute1,quantity
 *
 * page_key is category name plus item number to ensure we restore settings only for this page.
 * item_number is the item number without catalog code
 * the selected index of the select box is stored for attributes and quantity.
 */

function saveForm(assetIdPrimaryParam)
{   	
	maxModules = 40;
    	cookieValue = "";
	moduleIndex=0;
	
	for(grpIndex=0;grpIndex<count.length;grpIndex++)
	{	
		// loop through every module and get its attributes
		for (j = 0; j < count[grpIndex]; j++)
		{		
			try{
				distAttrArray=objectarray[grpIndex].Distinctattr;
				
				}
				catch(err)
				{
					//break;
				}
		var formname="form"+grpIndex;
		itemNumber = getItemNumber(moduleIndex,formname);
		
		if (itemNumber == "")
			{
				continue;
			}
		else if (itemNumber == null)
			{
				break;
			}
		try{

			cookieValue = cookieValue + ":" + itemNumber;
			
			// save the value of each distinct attribute select box
			for (i = 0; i < distAttrArray.length; i++)
			{	
				if(GPSLabel[grpIndex]==distAttrArray[i])
					{
					selectBox =document.forms[formname].elements["style_"+moduleIndex];
				}else{
					selectBox =document.forms[formname].elements[distAttrArray[i]+"_"+moduleIndex];
				}
				cookieValue = cookieValue + ";" + selectBox.selectedIndex;
			}
			}catch(err){
			return true;}
			moduleIndex++;

			}
	}
	setVSCookiePROD("selectedItems", escape(cookieValue));
}

/*
 * Restore the select box settings from the cookie
 *
 * See the saveForm function for a description of the cookie
 *
 */

/*
 * Restore the select box settings from the cookie
 *
 * See the saveForm function for a description of the cookie
 *
 */
function restoreForm(assetIdPrimaryParam)
{
	cookieValue = getVSCookie("selectedItems");

	// each module in the string is separated by a colon
    itemArray = cookieValue.split(":");
	
    // the page key is category name and item number so we only restore attributes on the right page
	gi=0;
	MaxModIndx=count[gi];
	
    // loop through the values for each module
    for (itemIndex = 1,moduleIndex=0;moduleIndex < MaxModIndx; moduleIndex++)
    {
	 try{
	distAttrArrayRestore=objectarray[gi].Distinctattr;
	}
	catch(err)
		{ 
		}
    	
        // the select box
	if(itemArray[itemIndex] != null)
	{
        values = itemArray[itemIndex].split(";");
        itemNumber = values[0];
	
	//style
	if(values[1]!=-1 && (itemNumber=='null' || itemNumber==''))
	{
		itemIndex++;
	}
	else{
	var formname="form"+gi;
        // try to set the item number for this module
		result = setItemNumber(moduleIndex, itemNumber,gi,formname);

        // the item number does not match the module, so we try the next module
        if (result == false)
        {
        	if(moduleIndex+1==MaxModIndx && count.length>(gi+1))
			{
				gi=gi+1;
				MaxModIndx=MaxModIndx+count[gi];

			}
        	 continue;
        }
        // this module was not even found, so we are done
        else if (result == null) break;

	try{
	// set the index for the attributes select boxes
	for (i = 1,jIndex=0; i < values.length ; i++)
        {
		if(distAttrArrayRestore[jIndex] != StyleSelectorType[gi])
			{
				selectBox = document.forms[formname].elements[distAttrArrayRestore[jIndex]+"_"+moduleIndex]; 

				selectBox.selectedIndex = values[i];
				fire(selectBox);

				var tempLabel=distAttrArrayRestore[jIndex].split(".");
				if(tempLabel[0]== "distinctattrselectorlabel" && objectarray[gi].extskuflag[0]==true)
				{
					atpLengthChangeFlag=0;
					OnLengthChange(distAttrArrayRestore[jIndex]+"_"+moduleIndex,moduleIndex,gi,jIndex);
				}
			//fire(selectBox);

			}
		jIndex++;
        }

	}catch(err){return true;}
        itemIndex++;
	}
	if(moduleIndex+1==MaxModIndx && count.length>(gi+1))
	{
	gi=gi+1;
	MaxModIndx=MaxModIndx+count[gi];

	}

	}
    }
	
	for(var gi=0;gi<count.length;gi++){	
	if(count[gi]==buyMoreMax[gi])
	 {	
	 	 document.getElementById('addMoreAAT_'+gi).style.visibility = 'hidden';
		}
	}
	//removeVSCookiePROD("selectedItems");
}

/*
 * Save the select box settings in a cookie
 *
 * The format of the cookie is:
 *
 * page_key:item_number,attribute1,attribute2,quantity:item_number2,attribute1,quantity
 *
 * page_key is category name plus item number to ensure we restore settings only for this page.
 * item_number is the item number without catalog code
 * the selected index of the select box is stored for attributes and quantity.
 */

function saveFormOnSubmit()
{
	eval("assetIdPrim= document.SelectionForm.ASSETID_0");
	assetIdPrimParam=assetIdPrim.value;
	maxModules = 40;
    	cookieValue = "";
	

	moduleIndex=0;
	
	for(grpIndex=0;grpIndex<count.length;grpIndex++)
	{
	
		// loop through every module and get its attributes
		for (j = 0; j < count[grpIndex]; j++)
		{
		
			try{
				distAttrArray=objectarray[grpIndex].Distinctattr;
				
				}
				catch(err)
				{
					//break;
				}
		var formname="form"+grpIndex;
		itemNumber = getItemNumber(moduleIndex,formname);
		
		if (itemNumber == "")
			{
				continue;
			}
		else if (itemNumber == null)
			{
				break;
			}
		try{
			cookieValue = cookieValue + ":" + itemNumber;
			
			// save the value of each distinct attribute select box
			for (i = 0; i < distAttrArray.length; i++)
			{
				selectBox =document.forms[formname].elements[distAttrArray[i]+"_"+moduleIndex];
				cookieValue = cookieValue + ";" + selectBox.selectedIndex;				
			}
			}catch(err){
			
			return true;}
			moduleIndex++;

			}
	}
	
    	setVSCookiePROD("selectedItems", escape(cookieValue));
}

/***********SAVE-RESTORE CHANGE**************************/

//********************18mar******/

//**********modified by siva for bug no:1339******/

function formatItemNumber(item_nbr)
{  
	item_nbr = item_nbr.toUpperCase();
	var parsed_item_nbr = "";
	for (i = 0; i < item_nbr.length; i++)
	{
		if (item_nbr.charAt(i) >= '0' && item_nbr.charAt(i) <= '9' ||
		    item_nbr.charAt(i) >= 'A' && item_nbr.charAt(i) <= 'Z' ||
			item_nbr.charAt(i) >= 'a' && item_nbr.charAt(i) <= 'z')
		{
			parsed_item_nbr=parsed_item_nbr + item_nbr.charAt(i);
			
		}
	}
	parsed_item_nbr = parsed_item_nbr.substring(0,2) + '-' + parsed_item_nbr.substring(2,8);
	return parsed_item_nbr;
}

function validate(CQOProdUrl2)
{
	var Itemnumber;
	Itemnumber=document.getElementById("item-number").value;
       if(Itemnumber==null || Itemnumber=="")
      window.location=CQOProdUrl2;
          
	if(Itemnumber.length>10 || Itemnumber.length<8)
	{      
        window.location=CQOProdUrl2;
         return false;
	}
	Itemnumber = formatItemNumber(Itemnumber);
	document.getElementById("item-number").value=Itemnumber;
	
		
	if(Itemnumber.length!=9){
	window.location=CQOProdUrl2;
       return false;
	 }
	
	//if(!isNaN(Itemnumber.substring(0,2))){
	 
	 //window.location=CQOProdUrl2;
       // return false;	
	 
	//}
	
	if(isNaN(Itemnumber.substring(3,6))){
	 
	window.location=CQOProdUrl2;
      return false;
	}
	
	if(isNaN(Itemnumber.substring(6,9))){
	 
		window.location=CQOProdUrl2;
          return false;
	}
	
	return true;
}

productJSfuncInit();