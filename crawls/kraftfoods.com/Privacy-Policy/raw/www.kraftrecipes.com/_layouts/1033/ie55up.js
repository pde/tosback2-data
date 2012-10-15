var StrNewNamespace="http://schemas.microsoft.com/WebPart/v2";
function SplitIndex(Index)
{
	var sPropURN="";
	var sPropName="";
	var pos=Index.lastIndexOf("#");
	if( -1==pos )
	{
		pos=Index.lastIndexOf(":");
	}
	if( -1==pos )
	{
		sPropName=Index;
	}
	else
	{
		sPropName=Index.substring(pos+1, Index.length);
		sPropURN=Index.substring(0, pos);
	}
	var Splitted={PropURN : sPropURN, PropName : sPropName};
	return Splitted;
}
function String2XML(Value)
{
	var XMLString="";
	var re=/&/g;
	XMLString=Value.replace(re,"&amp;");
	re=/</g;
	XMLString=XMLString.replace(re,"&lt;");
	re=/>/g;
	XMLString=XMLString.replace(re,"&gt;");
	re=/"/g;
	XMLString=XMLString.replace(re,"&quot;");
	re=/'/g;
	XMLString=XMLString.replace(re,"&apos;");
	return XMLString;
}
function URL2Unicode(strURL)
{
	return Utf8ToUnicode(unescape(strURL));
}
function Unicode2URL(strUnicode)
{
	return URLEncode(strUnicode);
}
function URLEncode(strURL)
{
	var strSpecialUrl=" <>\"#%{}|^~[]`'&?+=";
	var strEncode="";
	var i;
	var chUrl;
	var iCode;
	strURL+="";
	for (i=0; i<strURL.length; i++)
	{
		chUrl=strURL.charAt(i);
		iCode=chUrl.charCodeAt(0);
		if (iCode<=parseInt(0x7F))
		{
			if (strSpecialUrl.indexOf(chUrl) !=-1)
			{
				strEncode+="%"+iCode.toString(16).toUpperCase();
			}
			else
			{
				strEncode+=chUrl;
			}
		}
		else
		{
			strEncode+=GetUTFCode(iCode);
		}
	}
	return strEncode;
}
function GetUTFCode(UniCode)
{
	var BitLen=11;
	var ByteLen=2;
	var UTFCode="";
	var FirstByte=0xC0;	
	var i;
	while(UniCode >=(1<<BitLen))
	{
		FirstByte=FirstByte>>1;
		BitLen+=5;
		ByteLen++;
	}
	for( i=0; i < ByteLen; i++)
	{
		var Code=0x80 | (UniCode & 0x3f);
		UniCode=UniCode >>> 6;
		if( i==ByteLen-1 )
		{
			Code |=FirstByte;
		}
		UTFCode="%"+Code.toString(16).toUpperCase()+UTFCode;
	}
	return UTFCode;
}
function Utf8ToUnicode(strUtf8)
{
	if(strUtf8==null)
	{
		return "";
	}
	var bstr="";
	var nTotalChars=strUtf8.length;	
	var nOffset=0;					
	var nRemainingBytes=nTotalChars;	
	var nOutputPosition=0;
	var iCode, iCode1, iCode2;			
	while (nOffset < nTotalChars)
	{
		iCode=strUtf8.charCodeAt(nOffset);
		if ((iCode & 0x80)==0)			
		{
			if ( nRemainingBytes < 1 )
			{	
				break;
			}
			bstr+=String.fromCharCode(iCode & 0x7F);
			nOffset++;
			nRemainingBytes -=1;
		}
		else if ((iCode & 0xE0)==0xC0)	
		{
			iCode1=strUtf8.charCodeAt(nOffset+1);
			if ( nRemainingBytes < 2 || 		
			   (iCode1 & 0xC0) !=0x80 )		
			{
				break;
			}
			bstr+=String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
			nOffset+=2;
			nRemainingBytes -=2;
		}
		else if ((iCode & 0xF0)==0xE0)	
		{
			iCode1=strUtf8.charCodeAt(nOffset+1);
			iCode2=strUtf8.charCodeAt(nOffset+2);
			if ( nRemainingBytes < 3   ||		
			   (iCode1 & 0xC0) !=0x80 ||		
			   (iCode2 & 0xC0) !=0x80 )
			{
				break;
			}
			bstr+=String.fromCharCode(((iCode & 0x0F) << 12) |
					((iCode1 & 0x3F) <<  6) |
					(iCode2 & 0x3F));
			nOffset+=3;
			nRemainingBytes -=3;
		}
		else
		{
			break;
		}
	}
	if (0 !=nRemainingBytes)
	{
		bstr="";
	}
	return bstr;
}
function SPSoapRequestBuilder(functionName)
{
	var object=new Object();
	function AddParameter(parameterName, parameterValue)
	{
		var index=this.parameterNameList.length;
		this.parameterNameList[index]=parameterName;
		this.parameterValueList[index]=parameterValue;
	}
	function SendSOAPMessage(xmlhttp)
	{
		var funcName=this.functionName;
		var paramNames=this.parameterNameList;
		var paramValues=this.parameterValueList;
		xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		xmlhttp.setRequestHeader("SOAPAction", "http://microsoft.com/sharepoint/webpartpages/"+funcName);
		var soapData='<?xml version="1.0" encoding="utf-8"?>'+						'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+						'<soap:Body>'+						'<'+funcName+' xmlns="http://microsoft.com/sharepoint/webpartpages">';
		for(var i=0; i < paramNames.length; i++)
		{
			var soapParam=(typeof(paramValues[i])=="string") ? String2XML(paramValues[i]) : paramValues[i];
			soapData+='<'+paramNames[i]+'>'+soapParam+'</'+paramNames[i]+'>';
		}
		soapData+='</'+funcName+'>'+						'</soap:Body>'+						'</soap:Envelope>'
		xmlhttp.Send(soapData);
		return xmlhttp;
	}
	object.functionName=functionName;
	object.parameterNameList=new Array();
	object.parameterValueList=new Array();
	object.AddParameter=AddParameter;
	object.SendSOAPMessage=SendSOAPMessage;
	return object;
}
function Collection()
{
	function Item(Index)
	{
		var Obj=null;
		if(Index !=null)
		{
			var realIndex=parseInt(Index);
			if (!isNaN(realIndex) && realIndex >=0 && realIndex < this.length)
				Obj=this[realIndex];
		}
		return Obj;
	}
	function Find(Object)
	{
		var i;
		var obj=null;
		for (i=0; i<this.length; i++)
		{
			if (this[i]==Object)
			{
				obj=this[i];
				break;
			}
		}
		return obj;
	}
	function FindByName(Name, Qualifier)
	{
		var i;
		var obj=null;
		for (i=0; i<this.length; i++)
		{
			if (this[i].Name==Name && this[i].Qualifier==Qualifier)
			{
				obj=this[i];
				break;
			}
		}
		return obj;
	}
	function Add(Object)
	{
		var ArraySize=this.length;
		this[ArraySize]=Object;
		return this[ArraySize];
	}
	function Remove(Index)
	{
		var i;
		var realIndex=parseInt(Index);
		if (isFinite(realIndex) && realIndex >=0 && realIndex < this.length)
		{
			for (i=realIndex; i<this.length-1; i++)
				this[i]=this[i+1];
			this.length--;
		}
	}
	function RemoveObject(Object)
	{
		var i;
		for (i=0; i<this.length; i++)
		{
			if (this[i]==Object)
			{
				this.Remove(i);
				break;
			}
		}
	}
	function Count()
	{
		return this.length;
	}
	var obj=Array();
	obj.Item=Item;
	obj.Count=Count;
	obj.Add=Add;
	obj.Remove=Remove;
	obj.Find=Find;
	obj.FindByName=FindByName;
	obj.RemoveObject=RemoveObject;
	return obj;
}
function PartDef(WebPartQualifier, StorageKey, DOMObject)
{
	function GetPropertyDwpXmlString(propertyNode)
	{
		var differentNameSpace=(propertyNode.NamespaceURN.toLowerCase() !=StrNewNamespace.toLowerCase());
		return currentXML="<"+propertyNode.SchemaElement+((differentNameSpace) ? " xmlns='"+String2XML(propertyNode.NamespaceURN)+"'": " ")+">"+String2XML(propertyNode.Value.toString())+"</"+propertyNode.SchemaElement+">";
	}
	function Save(async, callBack)
	{
		if(!this.Properties.PropertiesLoaded)
		{
			return;
		}
		var partXml=null;
		if (this.Properties.IsWebPartFile)
		{
			var xmlDoc=this.Properties.ResponseXML;
			if (null !=xmlDoc)
			{	
				var propertiesElement=xmlDoc.selectSingleNode("\webParts/webPart/data/properties")
				if (null !=propertiesElement)
				{
					var properties=propertiesElement.selectNodes("\property");
					if (null !=properties)
					{
						var index=properties.length;
						while(index > 0)
						{
							--index;
							propertiesElement.removeChild(properties[index]);
						}
					}
					for(var index=0; index < this.Properties.length; index++)
					{
						var propNode=this.Properties[index];
						var xmlAttribute;
						var propertyElement=xmlDoc.createElement("property");
						xmlAttribute=xmlDoc.createAttribute("name");
						xmlAttribute.value=String2XML(propNode.SchemaElement);
						propertyElement.setAttributeNode(xmlAttribute);
						if (null !=propNode.Type)
						{
							xmlAttribute=xmlDoc.createAttribute("type");
							xmlAttribute.value=String2XML(propNode.Type);
							propertyElement.setAttributeNode(xmlAttribute);
						}
						xmlAttribute=xmlDoc.createAttribute("xmlns");
						xmlAttribute.value="http://schemas.microsoft.com/WebPart/v3";
						propertyElement.setAttributeNode(xmlAttribute);
						propertyElement.text=String2XML(propNode.Value.toString());
						propertiesElement.appendChild(propertyElement);
					}
				}
				partXml=xmlDoc.xml;
			}
		}
		else
		{
			partXml="<WebPart xmlns='"+StrNewNamespace+"'>"+							GetPropertyDwpXmlString(this.Properties.AssemblyInfo)+							GetPropertyDwpXmlString(this.Properties.TypeNameInfo);
			for(var index=0; index < this.Properties.length; index++)
			{
				partXml+=GetPropertyDwpXmlString(this.Properties[index]);
			}
			partXml+="</WebPart>";
		}
		try
		{
			var varPart=eval('varPart'+this.WebPartQualifier);
			var xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
			this.xmlhttp=xmlhttp;
			varPart.callBackUsed=false;
			var postDataUrl=GetUrlFromWebUrlAndWebRelativeUrl(
				WPSC.WebPartPage.WebServerRelativeURL,
				"_vti_bin/WebPartPages.asmx");
			xmlhttp.Open('POST', postDataUrl,(async !=true) ? false : true);
			if (callBack !=null)
			{
				this.callBackFunction=callBack;
				xmlhttp.onreadystatechange=new Function("varPart"+this.WebPartQualifier+".SaveHandler()");
			}
			var soapBuilder=SPSoapRequestBuilder("SaveWebPart2");
			soapBuilder.AddParameter("pageUrl", document.location.href);
			soapBuilder.AddParameter("storageKey", this.StorageKey);
			soapBuilder.AddParameter("webPartXml", partXml);
			soapBuilder.AddParameter("storage", 'None');
			soapBuilder.AddParameter("allowTypeChange", 'false');
			soapBuilder.SendSOAPMessage(xmlhttp);
		}
		catch(exception)
		{
			var varPart=eval('varPart'+this.WebPartQualifier);
			if(callBack !=null && varPart.callBackUsed !=true)
			{
				callBack(false, "");
				varPart.callBackUsed=true;
			}
		}
	}
	function SaveHandler()
	{
		var varPart=eval('varPart'+this.WebPartQualifier);
		if(this.xmlhttp.readyState==4 && this.callBackFunction !=null && varPart.callBackUsed !=true)
		{
			var saveSucceeded=(this.xmlhttp.responseXML.getElementsByTagName("SaveWebPart2Response")[0] !=null);
			var soapStatus=this.xmlhttp.status;
			var soapExceptionText="";
			if(!saveSucceeded)
			{
				var soapException=this.xmlhttp.responseXML.getElementsByTagName("soap:Fault")[0];
				if(soapException !=null)
				{
					var soapExceptionTextXml=soapException.getElementsByTagName("detail")[0];
					if(soapExceptionTextXml !=null)
					{
						soapExceptionText=soapExceptionTextXml.text;
					}
				}
			}
			varPart.callBackUsed=true;
			this.callBackFunction(saveSucceeded, soapExceptionText, soapStatus);
		}
	}
	this.SaveHandler=SaveHandler;
	this.DOMObject=DOMObject;
	this.WebPartQualifier=WebPartQualifier;
	this.StorageKey=StorageKey;
	this.Properties=new PropColDef();
	this.Properties.Owner=this;
	this.Save=Save;
}
function PropertyDef(URN, SchemaElement, Value,Type)
{
	this.OriginalValue=Value;
	this.NamespaceURN=URN;
	this.SchemaElement=SchemaElement;
	this.Value=Value;
	this.Type=Type;
}
function PropColDef()
{
	var PropCol=new Collection();
	function GetPropCol(ItemID, bGlobal)
	{
		var returnValues=new Array();
		try
		{
			var xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
			if (xmlhttp==null) return;
			var postDataUrl=GetUrlFromWebUrlAndWebRelativeUrl(
				WPSC.WebPartPage.WebServerRelativeURL,
				"_vti_bin/WebPartPages.asmx");
			xmlhttp.Open('POST', postDataUrl, false);
			var soapBuilder=SPSoapRequestBuilder("GetWebPart2");
			soapBuilder.AddParameter("pageurl", document.location.href);
			soapBuilder.AddParameter("storageKey", ItemID);
			soapBuilder.AddParameter("storage", 'None');
			soapBuilder.AddParameter("behavior", 'Version3');
			soapBuilder.SendSOAPMessage(xmlhttp);			
			xmlhttp.responseXML.loadXML(xmlhttp.responseXML.text);
			var dwpWebPartElement=null;
			var isDwpFile=false;
			var webPartWebPartElement=null;
			var isWebPartFile=false;
			var dwpWebPartElements=xmlhttp.responseXML.getElementsByTagName("WebPart");
			if (null !=dwpWebPartElements && dwpWebPartElements.length > 0)
			{
				dwpWebPartElement=dwpWebPartElements[0];
				if (dwpWebPartElement.namespaceURI=="http://schemas.microsoft.com/WebPart/v2")
				{
					isDwpFile=true;
				}
			}
			if (false==isDwpFile)
			{
				var webPartWebPartElements=xmlhttp.responseXML.getElementsByTagName("webPart");
				if (null !=webPartWebPartElements && webPartWebPartElements.length > 0)
				{
					webPartWebPartElement=webPartWebPartElements[0];
					if (webPartWebPartElement.namespaceURI=="http://schemas.microsoft.com/WebPart/v3")
					{
						isWebPartFile=true;
					}
				}
			}
			returnValues.IsWebPartFile=isWebPartFile;
			if (isWebPartFile)
			{
				var propertiesElement=webPartWebPartElement.selectSingleNode("\data/properties");
				if (null !=propertiesElement)
				{
					var properties=propertiesElement.selectNodes("\property");
					if (null !=properties)
					{
						for(var index=0; index < properties.length; index++)
						{
							var property=properties[index];
							var nameAttributeValue=property.getAttributeNode("name").value;
							var typeAttributeValue=null;
							var typeAttribute=property.getAttributeNode("type");
							if (null !=typeAttribute)
							{
								typeAttributeValue=typeAttribute.value;
							}
							var nodeValue=property.nodeTypedValue;
							var prop=new PropertyDef("" ,nameAttributeValue,nodeValue,typeAttributeValue);
							returnValues[returnValues.length]=prop;
						}
					}
				}
				returnValues.ResponseXML=xmlhttp.responseXML;
			}
			else if(isDwpFile)
			{
				var propertiesListXML=dwpWebPartElement.childNodes;
				for(var index=0; index < propertiesListXML.length; index++)
				{
					var node=propertiesListXML.item(index);
					var prop=new PropertyDef(node.namespaceURI, node.baseName, node.nodeTypedValue,null);
					returnValues[returnValues.length]=prop;
				}
			}
			else
			{
				alert(MSOStrings.GetPropertiesFailure);
			}
		}
		catch (e)
		{
			alert(MSOStrings.GetPropertiesFailure);
		}
		return returnValues;
	}
	function FindProp(Index)
	{
		var nIndex=-1;
		var property=null;
		if (isNaN(Index))
		{
			var Splitted=SplitIndex(Index);
			var PropURN=Splitted.PropURN;
			var PropName=Splitted.PropName;
			var i;
			for (i=0; i<PropCol.Count(); i++)
			{
				var Item=PropCol[i];
				var itemNamespace=new String(Item.NamespaceURN);
				var schemaMatch=(Item.SchemaElement.toLowerCase()==PropName.toLowerCase());
				var namespaceMatch=(itemNamespace.toLowerCase()==PropURN.toLowerCase());
				if(schemaMatch && namespaceMatch)
				{
					nIndex=i;
					property=Item;
					break;
				}
			}
		}
		else
		{
			if (Index < 0 || Index >=PropCol.Count())
			{
				nIndex=-1;
				property=null;
			}
			else
			{
				nIndex=Index;
				property=PropCol[Index]
			}
		}
		return property;
	}
	function Item(Index)
	{	
		var Property=null;
		if(Index !=null)
		{
			if(!(this.PropertiesLoaded))
			{
				this.LoadProperties();
			}
			Property=FindProp(Index);
		}
		return Property;
	}
	function Init(Properties, Owner)
	{
		this.Owner=Owner;
		this.IsWebPartFile=Properties.IsWebPartFile;
		this.ResponseXML=Properties.ResponseXML;
		for(var i=0; i < Properties.length; i++)
		{
			var node=Properties[i];
			if(node.SchemaElement=="Assembly" && !Properties.IsWebPartFile)
			{
				this.AssemblyInfo=node;
			}
			else if(node.SchemaElement=="TypeName"  && !Properties.IsWebPartFile)
			{
				this.TypeNameInfo=node;
			}
			else
			{
				this[this.length]=node;
			}
		}
	}
	function Count()
	{
		if(!(this.PropertiesLoaded))
		{
			this.LoadProperties();
		}
		return this.length;
	}
	function LoadProperties()
	{
		this.Init(GetPropCol(this.Owner.StorageKey, false), this.Owner);
		this.PropertiesLoaded=true;
	}
	PropCol.Owner=null;				
	PropCol.Item=Item;
	PropCol.Init=Init;
	PropCol.Count=Count;
	PropCol.LoadProperties=LoadProperties;
	PropCol.PropertiesLoaded=false;
	PropCol.AssemblyInfo=null;
	PropCol.TypeNameInfo=null;
	PropCol.IsWebPartFile=false;
	PropCol.ResponseXML=null;
	return PropCol;
}
function PartColDef()
{
	var ThisPartCol=new Collection();
	function FindPart(Index)
	{
		var nIndex=-1;
		if (isNaN(Index))
		{
			var i;
			for (i=0; i<ThisPartCol.Count(); i++)
			{
				if (ThisPartCol.Item(i).WebPartQualifier==Index)
				{
					nIndex=i;
					break;
				}
			}
		}
		else
		{
			if (Index < 0 || Index >=ThisPartCol.Count())
				nIndex=-1;
			else
				nIndex=Index;
		}
		return nIndex;
	}
	function Item(Index)
	{
		var Part=null;
		if(Index !=null)
		{
			var PartIndex=FindPart(Index);
			if (PartIndex >=0)
				Part=ThisPartCol.Item(PartIndex);
		}
		return Part;
	}
	function Register(WebPartQualifier, StorageKey, DOMPart)
	{
		var NewPart;
		var PartIndex=FindPart(WebPartQualifier);
		if (PartIndex >=0)
		{
			NewPart=ThisPartCol.Item(PartIndex);
		}
		else
		{
			NewPart=new PartDef(WebPartQualifier, StorageKey, DOMPart);
			ThisPartCol.Add(NewPart);
			this.Count=ThisPartCol.Count();
		}
		return NewPart;
	}
	function UnRegister(Index)
	{
		ThisPartCol.Remove(FindPart(Index));
		this.Count=ThisPartCol.Count();
	}
	this.Item=Item;
	this.Register=Register;
	this.UnRegister=UnRegister;
	this.Count=ThisPartCol.Count();
}
function WebPartPageDef(DOMObj)
{
	this.Parts=new PartColDef();
	this.DOMObject=DOMObj;
	this.Properties=new PropColDef();
}
function EventDef(EventName)
{
	var EventHandlers=new Collection();
	function FindEventHandler(CallbackFunction)
	{
		return EventHandlers.Find(CallbackFunction);
	}
	function AddHandler(CallbackFunction)
	{
		return EventHandlers.Add(CallbackFunction);
	}
	function RemoveHandler(CallbackFunction)
	{
		EventHandlers.RemoveObject(CallbackFunction);
	}
	function Raise(Param)
	{
		var i;
		for (i=0; i<EventHandlers.Count(); i++)
			EventHandlers.Item(i)(Param);
	}
	this.Name=EventName;
	this.FindEventHandler=FindEventHandler;
	this.AddHandler=AddHandler;
	this.RemoveHandler=RemoveHandler;
	this.Raise=Raise;
}
function NotificationServiceDef()
{
	var Events=new Collection();
	function RegisterSupportedBrowserEvent(eventName, eventFunction)
	{
		switch(eventName)
		{
			case "onafterprint":
			case "onbeforeprint":
			case "onbeforeunload":
			case "onblur":
			case "onclose":
			case "onload":
			case "onresize":
			case "onfocus":
				window.attachEvent(eventName, eventFunction);
				break;
			case "onclick":
			case "onhelp":
				window.document.attachEvent(eventName, eventFunction);
				break;
			default:
				break;
		}
	}
	function UnRegisterSupportedBrowserEvent(eventName, eventFunction)
	{
		switch(eventName)
		{
			case "onafterprint":
			case "onbeforeprint":
			case "onbeforeunload":
			case "onblur":
			case "onclose":
			case "onload":
			case "onresize":
			case "onfocus":
				window.detachEvent(eventName, eventFunction);
				break;
			case "onclick":
			case "onhelp":
				window.document.detachEvent(eventName, eventFunction);
				break;
			default:
				break;
		}
	}
	function RaiseEvent(Namespace, Event, Data)
	{
		var Event;
		var EventName;
		EventName=Namespace+"::"+Event;
		Event=Events.FindByName(EventName);
		if (null !=Event)
			Event.Raise(Data);
	}
	function RegisterForEvent(Namespace, Event, CallbackFunction, Qualifier)
	{
		var EventObject;
		var EventName;
		EventName=Namespace+"::"+Event;
		EventObject=Events.FindByName(EventName, Qualifier);
		if (EventObject==null)
		{
			EventObject=new EventDef(EventName);
			EventObject.Qualifier=Qualifier;
			Events.Add(EventObject);
		}
		if (EventObject.FindEventHandler(CallbackFunction)==null)
		{
			if(Namespace=="urn:schemas-microsoft-com:dhtml")
			{
				RegisterSupportedBrowserEvent(Event, CallbackFunction);
			}
			EventObject.AddHandler(CallbackFunction);
		}
	}
	function UnRegisterForEvent(Namespace, Event, CallbackFunction, Qualifier)
	{
		var EventObject;
		var EventName;
		EventName=Namespace+"::"+Event;
		EventObject=Events.FindByName(EventName, Qualifier);
		if ((EventObject !=null) && (EventObject.FindEventHandler(CallbackFunction) !=null))
		{
			if(Namespace=="urn:schemas-microsoft-com:dhtml")
			{
				UnRegisterSupportedBrowserEvent(Event, CallbackFunction);
			}
			EventObject.RemoveHandler(CallbackFunction);
		}
	}
	this.RegisterForEvent=RegisterForEvent;
	this.RaiseEvent=RaiseEvent;
	this.UnRegisterForEvent=UnRegisterForEvent;
}
function MessageDef(MessageName)
{
	this.Name=MessageName;
	this.Value="";
}
function StateServiceDef()
{
	var SaveCallbacks=new Array();
	function IsScriptHREF()
	{
		var returnValue=false;
		if(event !=null)
		{
			var srcElement=event.srcElement;
			while(srcElement !=null && srcElement.tagName !='A' && srcElement.tagName !='BODY')
			{
				srcElement=srcElement.parentElement;
			}
			if(srcElement !=null && srcElement.tagName=='A')
			{
				var href=srcElement.href.toLowerCase( );
				returnValue=(href.indexOf('javascript:')==0 || href.indexOf('vbscript:')==0)
			}
		}
		return returnValue;
	}
	function BeforeUnloading()
	{
		if(!MSOWebPartPage_hideNextBeforeUnload)
		{
			try
				{
				if (WPSCinpreview==true)
					{
					}
				}
			catch (e)
				{
				WPSC.RaiseEvent("urn:schemas-microsoft-com:dhtml","onunload",null);
				}
			ProcessDirtyParts();
		}
		MSOWebPartPage_hideNextBeforeUnload=false;
	}
	function ProcessDirtyParts()
	{
		if (MSOWPSC_SavePerformed==false && SaveCallbacks.length > 0)
		{
			var i;
			var prompt=false;
			for (i=0;i<SaveCallbacks.length;i++)
			{
				SaveCallbacks[i].Dirty=SaveCallbacks[i].IsDirtyCallbackFunction(SaveCallbacks[i].Param);
				prompt=prompt || SaveCallbacks[i].Dirty;
			}
			if (prompt==true && window.confirm(MSOStrings.SaveDirtyPartsDialogText))
			{
				for (i=0;i<SaveCallbacks.length;i++)
				{
					if (SaveCallbacks[i].Dirty==true)
					{
						SaveCallbacks[i].SaveCallbackFunction(SaveCallbacks[i].Param);
						SaveCallbacks[i].Dirty=false;
					}
				}
			}
		}
		if(typeof(event.returnValue)=="undefined")
		{
			MSOWPSC_SavePerformed=true;
		}
	}
	function RegisterForPromptedSave(IsDirtyCallbackFunction, SaveCallbackFunction, Param)
	{
		var Callback=new CallbackParamDef(IsDirtyCallbackFunction, SaveCallbackFunction, Param);
		SaveCallbacks[SaveCallbacks.length++]=Callback;
	}
	this.BeforeUnloading=BeforeUnloading;
	this.IsScriptHREF=IsScriptHREF;
	this.RegisterForPromptedSave=RegisterForPromptedSave;
	this.ProcessDirtyParts=ProcessDirtyParts;
}
function CallbackParamDef(IsDirtyCallbackFunction, SaveCallbackFunction, Param)
{
	this.IsDirtyCallbackFunction=IsDirtyCallbackFunction;
	this.SaveCallbackFunction=SaveCallbackFunction;
	this.Param=Param;
	this.Dirty=false;
}
function WPSCDef()
{
	var InternalWebPartPage;
	var NotificationService=new NotificationServiceDef();
	function FirePartCommunicationEvents(connectedParts, isInit)
	{		
		var interfaceObject;
		for (var i=0; i < connectedParts.length; i++)
		{
			interfaceObject=eval(connectedParts[i]);
			if (interfaceObject !=null)
			{
				if (isInit)
				{
					try
					{
						interfaceObject.PartCommunicationInit(WPSC);
					}
					catch (e)
					{
					}
				}
				else
				{
					try
					{
						interfaceObject.PartCommunicationMain();
					}
					catch (e)
					{
					}	
				}
			}
		}
	}
	function InitPartCommunication()
	{
		var xmlNodes;
		if (MSOConnections==null)
			return;
		xmlNodes=MSOConnections.selectNodes("Connections/Connection");
		if (xmlNodes==null)
			return;
		var connectedParts=new Array();
		var isProviderInList=false;
		var isConsumerInList=false;
		var xmlProviderRef=null;
		var xmlConsumerRef=null;
		for (var i=0; i < xmlNodes.length; i++)
		{
			xmlProviderRef=xmlNodes.item(i).selectSingleNode("@ProviderObject");
			xmlConsumerRef=xmlNodes.item(i).selectSingleNode("@ConsumerObject");			
			isProviderInList=false;
			isConsumerInList=false;
			if (xmlProviderRef !=null && xmlConsumerRef !=null)
			{			
				for (var j=0; j < connectedParts.length; j++)
				{
					if (connectedParts[j]==xmlProviderRef.text)
					{
						isProviderInList=true;
					}
					if (connectedParts[j]==xmlConsumerRef.text)
					{
						isConsumerInList=true;
					}
				}
				if (!isProviderInList)
				{
					connectedParts[connectedParts.length]=xmlProviderRef.text;
				}		
				if (!isConsumerInList)
				{
					connectedParts[connectedParts.length]=xmlConsumerRef.text;
				}
			}
		}
		FirePartCommunicationEvents(connectedParts, true);
		FirePartCommunicationEvents(connectedParts, false);
	}
	function RaiseConnectionEventSpecial(InterfaceName, EventName, EventArgsNames, EventArgsValues)
	{
		var eventArgs=new Object();
		var tempNames=ConvertVBArrayIfNecessary(EventArgsNames);
		var tempValues=ConvertVBArrayIfNecessary(EventArgsValues);
		if (tempNames.length==tempValues.length)
		{
			for (var i=0; i < tempNames.length; i++)
			{
				eval("eventArgs."+tempNames[i]+"=ConvertVBArrayIfNecessary(tempValues[i])");
			}
			RaiseConnectionEvent(InterfaceName, EventName, eventArgs);
		}
	}
	function ConvertVBArrayIfNecessary(vbarray)
	{
		try
		{
			var a=new VBArray(vbarray);
			return a.toArray();
		}
		catch(e)
		{
			return vbarray;
		}
	}
	function RaiseConnectionEvent(InterfaceName, EventName, EventParams)
	{
		var fProvider=false;
		var xmlNodes;
		var xmlSourceRef;
		var xmlTargetRef;
		var strEval;
		if (MSOConnections.selectSingleNode("Connections/Connection[@ProviderIntName='"+InterfaceName+"']") !=null)
		{
			fProvider=true;
		}
		if (fProvider)
		{
			xmlNodes=MSOConnections.selectNodes("Connections/Connection[@ProviderIntName='"+InterfaceName+"']");
		}
		else
		{
			xmlNodes=MSOConnections.selectNodes("Connections/Connection[@ConsumerIntName='"+InterfaceName+"']");
		}
		if (xmlNodes !=null)
		{
			for (var i=0; i < xmlNodes.length; i++)
			{
				if (fProvider)
				{
					xmlSourceRef=xmlNodes.item(i).selectSingleNode("@ProviderObject");
					xmlTargetRef=xmlNodes.item(i).selectSingleNode("@ConsumerObject");
				}
				else
				{
					xmlSourceRef=xmlNodes.item(i).selectSingleNode("@ConsumerObject");
					xmlTargetRef=xmlNodes.item(i).selectSingleNode("@ProviderObject");
				}
				if (xmlSourceRef !=null && xmlTargetRef !=null)
				{
					strEval=xmlTargetRef.text;
					strEval+="."+EventName;
					strEval+="("+xmlSourceRef.text+", EventParams)";
					eval (strEval);
				}			
			}
		}			
	}
	function RegisterForPromptedSave(IsDirtyCallbackFunction, SaveCallbackFunction, Param)
	{
		StateService.RegisterForPromptedSave(IsDirtyCallbackFunction, SaveCallbackFunction, Param);
	}
	function Init(DOMObj)
	{
		window.attachEvent("onbeforeunload", StateService.BeforeUnloading);
		if (null !=document.body)
		{
			document.body.attachEvent("onclick", new Function("if(StateService.IsScriptHREF()) {MSOWebPartPage_hideNextBeforeUnload=true;}"));
		}
		this.WebPartPage=new WebPartPageDef(DOMObj);
		return this.WebPartPage;
	}
	function Convert(InputString, InputType, OutputType)
	{
		var Converted=InputString;
		if( "URL"==InputType )
		{
			if( "UNICODE"==OutputType )
				Converted=URL2Unicode(InputString);
		}
		else if( "UNICODE"==InputType )
		{
			if( "URL"==OutputType )
				Converted=Unicode2URL(InputString);
		}
		return Converted;
	}
	function MSOMenu_GetMenuItem(MenuClientID, MenuOptionID)
	{
		var menuItem=null;
		var menu=document.all.item(MenuClientID);
		if(menu !=null)
		{
			menuItem=menu.all.item(MenuOptionID);
		}
		return menuItem;
	}
	function MSOMenu_SetChecked(MenuClientID, MenuOptionID, SetValue)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			menuItem.checked=(SetValue) ? 'true' : 'false';
		}
	}
	function MSOMenu_SetVisible(MenuClientID, MenuOptionID, SetValue)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			menuItem.style.display=(SetValue) ? '' : 'none';
		}
	}
	function MSOMenu_SetEnabled(MenuClientID, MenuOptionID, SetValue)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			menuItem.disabled=!(SetValue==true);
		}
	}
	function MSOMenu_GetChecked(MenuClientID, MenuOptionID)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			return (menuItem.checked=='true') ? true : false;
		}
		return null;
	}
	function MSOMenu_GetVisible(MenuClientID, MenuOptionID)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			return (menuItem.style.display !='none') ? true : false;
		}
		return null;
	}
	function MSOMenu_GetEnabled(MenuClientID, MenuOptionID)
	{
		var menuItem=MSOMenu_GetMenuItem(MenuClientID, MenuOptionID);
		if(menuItem !=null)
		{
			return (menuItem.disabled !=true) ? true : false;
		}
		return null;
	}
	this.RaiseConnectionEvent=RaiseConnectionEvent;
	this.RaiseConnectionEventSpecial=RaiseConnectionEventSpecial;
	this.InitPartCommunication=InitPartCommunication;
	this.RaiseEvent=NotificationService.RaiseEvent;	
	this.RegisterForEvent=NotificationService.RegisterForEvent;
	this.UnRegisterForEvent=NotificationService.UnRegisterForEvent;
	this.RegisterForPromptedSave=RegisterForPromptedSave;
	this.Init=Init;
	this.WebPartPage=InternalWebPartPage;
	this.Convert=Convert;
	this.MSOMenu_SetChecked=MSOMenu_SetChecked;
	this.MSOMenu_SetVisible=MSOMenu_SetVisible;
	this.MSOMenu_SetEnabled=MSOMenu_SetEnabled;
	this.MSOMenu_GetChecked=MSOMenu_GetChecked;
	this.MSOMenu_GetVisible=MSOMenu_GetVisible;
	this.MSOMenu_GetEnabled=MSOMenu_GetEnabled;
}
var StateService=new StateServiceDef();
var WPSC=new WPSCDef();
var MSOWPSC_SavePerformed=false;
function MSOWPSC_OnSubmit()
{
	StateService.ProcessDirtyParts();
}
function Row2ParamsIn_GetRow(paramsInIntName,rowFields,paramsInNames)
{
	var paramsIndex=new Array(paramsInNames.length);
	var fieldsIndex=new Array(paramsInNames.length);
	for (var i=0; i < paramsIndex; i++)
		paramsIndex[i]=-1;
	for (var i=0; i < fieldsIndex; i++)
		fieldsIndex[i]=-1;
	var params=paramsInNames;
	var fieldNames=rowFields;
	var name=paramsInIntName;
	var paramsLength=0;
	this.RowProviderInit=Row2ParamsIn_RowProviderInit;
	this.RowReady=Row2ParamsIn_RowReady;
	this.ParametersInConsumerInit=Row2ParamsIn_ParamsInInit;
	function Row2ParamsIn_ParamsInInit(sender,args)
	{
		var paramProps=args.ParameterInProperties;
		paramsLength=paramProps.length;
		if (paramProps !=null && paramProps.length > 0)
			for (var i=0; i < paramProps.length; i++)
				for (var j=0; j < params.length; j++)
					if ((paramProps[i]).ParameterName==params[j])
						paramsIndex[j]=i;
	}
	function Row2ParamsIn_RowProviderInit(sender,args)
	{
		var fields=args.FieldList;
		if (fields !=null && fields.length > 0)
			for (var i=0; i < fields.length; i++)
				for (var j=0; j < fieldNames.length; j++)
					if (fields[i]==fieldNames[j])
						fieldsIndex[j]=i;
	}
	function Row2ParamsIn_ParamsInReadyArgs(value)
	{
		this.ParameterValues=value;
	}	
	function Row2ParamsIn_RowReady(sender,args)
	{
		var rs=args.Rows;
		if (args.SelectionStatus=="Standard" || args.SelectionStatus=="New")
		{
			if (rs !=null)
			{
				rs.MoveFirst();
				var paramValues=new Array(paramsLength);
				for (var i=0; i < paramsLength; i++)
				{
					var found=false;
					try
					{
						for (var j=0; j < paramsIndex.length; j++)
							if (paramsIndex[j]==i)
							{
								if (rs.Fields.Item(fieldsIndex[j]).Value !=null)
								{
									var type=rs.Fields.Item(fieldsIndex[j]).Type;
									var varValue=rs.Fields.Item(fieldsIndex[j]).Value;
									paramValues[i]=String(varValue);
									if (type==12)
									{
										if (typeof(varValue)=="date")
										{
											paramValues[i]=P2P_DateToString(paramValues[i]);
										}
									}
									else if (type==7 || type==133 || type==134 || type==135)
									{
										paramValues[i]=P2P_DateToString(paramValues[i]);
									}
								}
								else
								{
									paramValues[i]="";
								}
								found=true;
							}
					}
					catch( e )
					{
						found=false;
					}
					if (!found)
						paramValues[i]="";
				}
				WPSC.RaiseConnectionEvent(name, "ParametersInReady", new Row2ParamsIn_ParamsInReadyArgs(paramValues));
			}
		}
		else
			WPSC.RaiseConnectionEvent(name, "NoParametersIn", null);
	}
}
function Row2Cell_GetRow(cellIntName,xform)
{
	var field=xform;
	var index=-1;
	var name=cellIntName;
	this.RowProviderInit=Row2Cell_RowProviderInit;
	this.RowReady=Row2Cell_RowReady;
	function Row2Cell_RowProviderInit(sender,args)
	{
		var fields=args.FieldList;
		var fieldDisplayList=args.FieldDisplayList;
		if (fields !=null && fields.length > 0)
			for (var i=0; i < fields.length; i++)
				if (fields[i]==field)
				{
					index=i;
					var displayField=null;
					if (fieldDisplayList !=null && fieldDisplayList.length > i)
					{
						displayField=fieldDisplayList[i];
					}
					WPSC.RaiseConnectionEvent(name, "CellProviderInit", new Row2Cell_CellInitArgs(field, displayField));
				}
	}
	function Row2Cell_CellInitArgs(name, displayName)
	{
		this.FieldName=name;
		this.FieldDisplayName=displayName;
	}
	function Row2Cell_CellReadyArgs(value)
	{
		this.Cell=value;
	}
	function Row2Cell_RowReady(sender,args)
	{
		var rs=args.Rows;
		if (rs !=null)
		{
			rs.MoveFirst();
			if (args.SelectionStatus && (args.SelectionStatus=="Standard" || args.SelectionStatus=="New") && index !=-1 && rs.Fields !=null && rs.Fields.Item(index) !=null)
				WPSC.RaiseConnectionEvent(name, "CellReady", new Row2Cell_CellReadyArgs(rs.Fields.Item(index).Value));
			else
				WPSC.RaiseConnectionEvent(name, "CellReady", new Row2Cell_CellReadyArgs(null));
		}
	}
}
function Row2Cell_GetCell()
{
	this.CellConsumerInit=Row2Cell_CellInit;
	function Row2Cell_CellInit(sender,args){}
}
function Row2Filter_GetFilter()
{
	this.FilterConsumerInit=Row2Filter_FilterInit;
	function Row2Filter_FilterInit(sender,args){}
}
function Row2Filter_GetRow(filterIntName,fieldFilter,fieldRow)
{
	var field=fieldRow;
	var filter=fieldFilter;
	var index=-1;
	var name=filterIntName;
	this.RowProviderInit=Row2Filter_RowInit;
	this.RowReady=Row2Filter_RowReady;
	function Row2Filter_RowInit(sender,args)
	{
		var fields=args.FieldList;
		if (fields !=null && fields.length > 0)
			for (var i=0; i < fields.length; i++)
				if (fields[i]==field)
					index=i;
	}
	function Row2Filter_SetFilterArgs(value)
	{
		this.FilterExpression=value;
	}
	function P2P_DateToString(dateString)
	{
		function MakeNumberTwoDigits(number)
		{
			if (number < 10)
				return "0"+number;
			else
				return number;
		}
		var date=new Date(Date.parse(dateString));
		var newValue=MakeNumberTwoDigits(date.getMonth()+1)+"/";
		newValue+=MakeNumberTwoDigits(date.getDate())+"/";
		newValue+=date.getFullYear()+" ";
		newValue+=MakeNumberTwoDigits(date.getHours())+":";
		newValue+=MakeNumberTwoDigits(date.getMinutes())+":";
		newValue+=MakeNumberTwoDigits(date.getSeconds());
		return newValue;
	}
	function Row2Filter_RowReady(sender,args)
	{
		var rs=args.Rows;
		if ((args.SelectionStatus=="Standard" || args.SelectionStatus=="New") && index !=-1)
		{
			if (rs !=null)
			{
				rs.MoveFirst();
				var filterValue="";
				try
				{
					if (rs.Fields.Item(index).Value !=null)
					{
						var varValue=rs.Fields.Item(index).Value;
						var type=rs.Fields.Item(index).Type;
						filterValue=String(varValue);
						if (type==12)
						{
							if (typeof(varValue)=="date")
							{
								filterValue=P2P_DateToString(filterValue);
							}
						}
						else if (type==7 || type==133 || type==134 || type==135)
						{
							filterValue=P2P_DateToString(filterValue);
						}
					}
				}
				catch (e)
				{
				}
				WPSC.RaiseConnectionEvent(name, "SetFilter", new Row2Filter_SetFilterArgs("FilterField1="+WPSC.Convert(filter, "UNICODE", "URL")+"&FilterValue1="+WPSC.Convert(filterValue, "UNICODE", "URL")));
			}
			else
			{
				WPSC.RaiseConnectionEvent(name, "SetFilter", new Row2Filter_SetFilterArgs("FilterField1="+WPSC.Convert(filter, "UNICODE", "URL")+"&FilterValue1="));
			}
		}
		else
			WPSC.RaiseConnectionEvent(name, "NoFilter", null);
	}
}
function ParamsOut2In_GetParamsOut(paramsInIntName, paramsOutNames, paramsInNames)
{
	var paramsInIndex=new Array(paramsInNames.length);
	var paramsOutIndex=new Array(paramsInNames.length);
	var paramsIn=paramsInNames;
	var paramsOut=paramsOutNames;
	var name=paramsInIntName;
	var paramsInLength=0;
	this.ParametersOutProviderInit=ParamsOut2In_ParamsOutProviderInit;
	this.ParametersOutReady=ParamsOut2In_ParamsOutReady;
	this.ParametersInConsumerInit=ParamsOut2In_ParamsInInit;
	this.NoParametersOut=ParametersOut2In_NoParametersOut;
	function ParametersOut2In_NoParametersOut(sender, args)
	{
		WPSC.RaiseConnectionEvent(name, "NoParametersIn", null);
	}
	function ParamsOut2In_ParamsInInit(sender, args)
	{
		var paramProps=args.ParameterInProperties;
		paramsInLength=paramProps.length		
		if (paramProps !=null && paramProps.length > 0)
			for (var i=0; i < paramProps.length; i++)
				for (var j=0; j < paramsIn.length; j++)
					if ((paramProps[i]).ParameterName==paramsIn[j])
						paramsInIndex[j]=i;
	}
	function ParamsOut2In_ParamsOutProviderInit(sender, args)
	{
		var paramProps=args.ParameterOutProperties;
		if (paramProps !=null && paramProps.length > 0)
			for (var i=0; i < paramProps.length; i++)
				for (var j=0; j < paramsOut.length; j++)
					if ((paramProps[i]).ParameterName==paramsOut[j])
						paramsOutIndex[j]=i;
	}
	function ParamsOut2In_ParamsInReadyArgs(value)
	{
		this.ParameterValues=value;
	}
	function ParamsOut2In_ParamsOutReady(sender, args)
	{
		var tempParams=args.ParameterValues;
		if (tempParams !=null && tempParams.length > 0)
		{
			var paramValues=new Array(paramsInLength);
			for (var i=0; i < paramsInLength; i++)
			{
				var found=false;
				for (var j=0; j < paramsInIndex.length; j++)
				{
					if (paramsInIndex[j]==i)
					{
						paramValues[i]=tempParams[paramsOutIndex[j]];
						found=true;
					}
				}
				if (!found)
					paramValues[i]="";
			}
			WPSC.RaiseConnectionEvent(name, "ParametersInReady", new ParamsOut2In_ParamsInReadyArgs(paramValues));
		}
	}
}
var MSOLayout_inDesignMode=false;
var MSOLayout_currentDragMode=0;
var MSOLayout_zoneDragOver=0;
var MSOLayout_rowToDrop=0;
var MSOLayout_cellToDrop=0;
var MSOLayout_oDropLocation=0;
var MSOLayout_iBar=(document.createElement !=null ? document.createElement("div") : null);
var MSOLayout_horzZoneIBar=0;
var MSOLayout_vertZoneIBar=0;
var MSOLayout_horzBodyZoneIBar=0;
var MSOLayout_vertBodyZoneIBar=0;
var MSOLayout_moveObject=0;
var MSOLayout_maintainOriginalZone=0;
var MSOLayout_topObject=document.body;
var MSOLayout_galleryView=0;
var MSOLayout_unsavedChanges=new Array();
var MSOLayout_FormSubmit=null;
var MenuWebPartID=null;
var MenuWebPart=null;
var MSOConn_SourceWpNode=null;
var MSOConn_TargetWpNode=null;
var MSOConn_XformInfo1=null;
var MSOConn_XformInfo2=null;
var MSOConn_AspXformInfo=null;
var MSOConn_ConnCancelled=false;
var MSOConn_MultipleTargetGroups=false;
var MSOConn_TargetGroupNode=null;
var MSOConn_SourceGroupNode=null;
var MSOConn_BackButtonClicked=false;
function MSOLayout_RemoveQueryParametersFromUrl(url)
{
	url=RemoveQueryParameterFromUrl(url, "[p|P][a|A][g|G][e|E][v|V][i|I][e|E][w|W]");
	url=RemoveQueryParameterFromUrl(url, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
	url=RemoveQueryParameterFromUrl(url, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
	return url;
}
function MSOLayout_ChangeLayoutMode(bPersonalView, bExitDesignMode)
{
	if(bPersonalView !=null)
	{
				MSOLayout_SaveChanges();
		var url=document.forms[MSOWebPartPageFormName].action;
		url=RemoveQueryParameterFromUrl(url, "[p|P][a|A][g|G][e|E][v|V][i|I][e|E][w|W]");
		url=RemoveQueryParameterFromUrl(url, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
		url=RemoveQueryParameterFromUrl(url, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
		if (url.indexOf("?") < 0)
			url+="?";
		else
			url+="&";
		if(bPersonalView==true)
		{
			document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=1;
			document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Design';
			url+="PageView=Personal";
			document.forms[MSOWebPartPageFormName].action=url;
		}
		else
		{
			document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=1;
			document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Design';
			url+="PageView=Shared";
			document.forms[MSOWebPartPageFormName].action=url;
		}
	} else if (bExitDesignMode !=null && bExitDesignMode)
	{
		var url=document.forms[MSOWebPartPageFormName].action;
		url=RemoveQueryParameterFromUrl(url, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
		url=RemoveQueryParameterFromUrl(url, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
		document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value="";
		document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=0;
		document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Browse';
		document.forms[MSOWebPartPageFormName].action=url;
	}
	__doPostBack(MSOWebPartPageFormName, '');
}
function MSOLayout_ToggleLayoutMode()
{
	var inDesignMode=document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
	if(inDesignMode !=1)
	{
		document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=1;
		document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Design';
	}
	else
	{
		document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=0;
		document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Browse';
	}
	__doPostBack(MSOWebPartPageFormName, '');
}
function MSOLayout_ToggleView(bPersonalView)
{
	var url=document.forms[MSOWebPartPageFormName].action;
	url=MSOLayout_RemoveQueryParametersFromUrl(url);
	document.forms[MSOWebPartPageFormName].action=url;
	if(bPersonalView==true)
	{
		document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value="false";
	}
	else
	{
		document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value="true";
	}
	document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value=0;
	document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Browse';
	__doPostBack(MSOWebPartPageFormName, '');
}
function MSOLayout_SetupLayoutFlags()
{
	MSOLayout_inDesignMode=true;
	MSOLayout_topObject=(document.body.all.item('MSOTlPn_WebPartPageDiv') !=null) ?
								document.body.all.item('MSOTlPn_WebPartPageDiv') :
								document.body;
}
//function MSOLayout_GetRealOffset(StartingObject,OffsetType, EndParent)
//{
//	var realValue=0;
//	if(!EndParent) EndParent=document.body;
//	for (var currentObject=StartingObject; currentObject !=EndParent && currentObject !=document.body; currentObject=currentObject.offsetParent)
//	{
//		realValue+=eval('currentObject.offset'+OffsetType)
//	}
//	return realValue;
//}

function MSOLayout_GetRealOffset(StartingObject, OffsetType, EndParent)            
{                
	var realValue=0;
	if (!EndParent) EndParent=document.body;
	for (var currentObject=StartingObject; currentObject && currentObject !=EndParent && currentObject != document.body; currentObject=currentObject.offsetParent)                
	{                    
		var offset = eval('currentObject.offset'+OffsetType);                    
		if (offset) realValue+=offset;                
	}                
	return realValue;            
}        

function MSOLayout_MoveWebPartStart(ZoneTableCell, WebPartCaption, Gallery)
{
	if (event.button !=1) return;
	MSOLayout_currentDragMode='move';
	document.selection.empty();
	MSOLayout_galleryView=(Gallery==true) ? true : false;
	MSOLayout_CreateDragObject(WebPartCaption);
	MSOLayout_CreateIBar();
	MSOLayout_oDropLocation=ZoneTableCell;
	MSOLayout_maintainOriginalZone=(ZoneTableCell.allowZoneChange=='0') ? MSOLayout_GetParentTable(ZoneTableCell) : '0';
	if (MSOLayout_galleryView && ZoneTableCell.dzc !=null)
	{
		var zones=document.all['MSOZone'];
		if (zones !=null && zones.length > 1)
		{
			for (i=0; i<zones.length; i++)
				if (zones[i].zoneID==ZoneTableCell.zoneid)
				{
					MSOLayout_maintainOriginalZone=zones[i];
					break;
				}
		}
	}
	MSOLayout_iBar.goodDrop='false';
	var zone=MSOLayout_GetParentTable(ZoneTableCell);
	if(zone.id=='MSOZone')
	{
		MSOLayout_zoneDragOver=zone;
		MSOLayout_zoneDragOver.className="ms-SPZoneSelected";
	}
	if(!MSOLayout_galleryView)
	{
		MSOLayout_MoveIBar(ZoneTableCell);
	}
	document.body.attachEvent('ondragover', MSOLayout_MoveWebPartBodyDragOver);
	var oldDragEnd=document.body.ondragend;
	var oldDrop=document.body.ondrop;
	document.body.ondragend=new Function("window.event.returnValue=false;");
	document.body.ondrop=new Function("MSOLayout_iBar.goodDrop='true';");
	ZoneTableCell.ondragstart=new Function("try {event.dataTransfer.effectAllowed='move';} catch (exception) {}");
	ZoneTableCell.attachEvent("ondrag",MSOLayout_MoveDragObject);
	ZoneTableCell.dragDrop();
	document.body.detachEvent('ondragover', MSOLayout_MoveWebPartBodyDragOver);
	document.body.ondragend=oldDragEnd;
	document.body.ondrop=oldDrop;
	ZoneTableCell.detachEvent("ondrag",MSOLayout_MoveDragObject);
	MSOLayout_moveObject.style.display='none';
	MSOLayout_currentDragMode=0;
	if(navigator.userAgent.toLowerCase().indexOf("msie 5.5") !=-1)
	{
		ZoneTableCell.swapNode(ZoneTableCell);
	}
	event.returnValue=false;
}
function MSOLayout_MoveWebPartDragZoneEnter(ZoneTable)
{
	if(MSOLayout_currentDragMode !='move') return;
	if(ZoneTable !=MSOLayout_zoneDragOver)
	{
		MSOLayout_zoneDragOver.className='ms-SPZone';
		MSOLayout_zoneDragOver=ZoneTable;
		event.dataTransfer.dropEffect='move';
	}
	MSOLayout_MoveWebPartStopEventBubble()
}
function MSOLayout_MoveWebPartDragEnter(ZoneTableCell)
{
	if(MSOLayout_currentDragMode !='move') return;
	event.dataTransfer.dropEffect='move';
	MSOLayout_cellToDrop=ZoneTableCell.cellIndex;
	MSOLayout_rowToDrop=MSOLayout_GetParentRow(ZoneTableCell).rowIndex;
}
function MSOLayout_MoveWebPartDragOver(ZoneTableCell,NeedsSetup)
{
	if(MSOLayout_currentDragMode !='move') return;
	event.dataTransfer.dropEffect='move';
	var needSetup=(NeedsSetup=="True")? true:false;
	MSOLayout_SetupDropLocation(ZoneTableCell, needSetup);
	MSOLayout_oDropLocation=MSOLayout_zoneDragOver.rows[MSOLayout_rowToDrop].cells[MSOLayout_cellToDrop];
	MSOLayout_MoveIBar(MSOLayout_oDropLocation);
	if(MSOLayout_galleryView && MSOLayout_maintainOriginalZone=='0') MSOLayout_UpdateZoneDropDown();
	MSOLayout_MoveWebPartStopEventBubble()
}
function MSOLayout_MoveWebPartBodyDragOver()
{
	if(MSOLayout_currentDragMode !='move') return;
	event.dataTransfer.dropEffect='none';
	MSOLayout_iBar.style.display='none';
	if(MSOLayout_zoneDragOver.className !='ms-SPZone') MSOLayout_zoneDragOver.className='ms-SPZone';
	window.event.returnValue=false;
}
function MSOLayout_MoveWebPartStopEventBubble()
{
	if(MSOLayout_currentDragMode !='move' || MSOLayout_iBar.style.display=='none')  return;
	window.event.returnValue=false;
	window.event.cancelBubble=true;
}
function MSOLayout_MoveWebPart(OriginalTableCell,DestinationTableCell)
{
	MSOLayout_iBar.style.display='none';
	MSOLayout_zoneDragOver.className='ms-SPZone';
	if(MSOLayout_currentDragMode !='move'
		|| MSOLayout_iBar.goodDrop !='true'
		|| OriginalTableCell==DestinationTableCell) return;
	var newTableCell;									
	var originalZone=MSOLayout_GetParentTable(OriginalTableCell);	
	var originalIndex=(OriginalTableCell.orientation=='Horizontal') ? OriginalTableCell.cellIndex : OriginalTableCell.parentElement.rowIndex;
	var destinationZone;									
	var destinationIndex;									
	destinationZone=MSOLayout_GetParentTable(DestinationTableCell);
	var zonesChanged=(destinationZone !=originalZone);
	if(DestinationTableCell.orientation=='Horizontal')
	{
		destinationIndex=DestinationTableCell.cellIndex;
		newTableCell=MSOLayout_GetParentRow(DestinationTableCell).insertCell(destinationIndex);
	}
	else
	{
		destinationIndex=DestinationTableCell.parentElement.rowIndex;
		newTableCell=destinationZone.insertRow(MSOLayout_GetParentRow(DestinationTableCell).rowIndex).insertCell();
	}
	newTableCell.swapNode(OriginalTableCell);
	if(OriginalTableCell.orientation=='Horizontal') newTableCell.removeNode(true);
	else MSOLayout_GetParentRow(newTableCell).removeNode(true);
	OriginalTableCell.orientation=DestinationTableCell.orientation;
	if(zonesChanged)
	{
		var originalEmptyZoneText=originalZone.all.item('MSOZoneCell_emptyZoneText');
		var destinationEmptyZoneText=destinationZone.all.item('MSOZoneCell_emptyZoneText')
		if(originalEmptyZoneText !=null)
		{
			originalEmptyZoneText.webPartsInZone--;
			if(originalEmptyZoneText.webPartsInZone==0)
			{
				originalEmptyZoneText.style.display='';
				originalEmptyZoneText.parentElement.style.padding='';
			}
		}
		if(destinationEmptyZoneText !=null)
		{
			destinationEmptyZoneText.webPartsInZone++;
			destinationEmptyZoneText.style.display='none';
			destinationEmptyZoneText.parentElement.style.padding='0';
		}
	}
	if(zonesChanged || (destinationIndex !=originalIndex && destinationIndex !=originalIndex+1))
	{
		if(originalZone !=destinationZone)
		{
			MSOLayout_AddChange(eval(OriginalTableCell.relatedWebPart), "Zone", destinationZone.zoneID);
			MSOLayout_UpdatePartOrderAfterMove(originalZone, 0);
		}
		MSOLayout_UpdatePartOrderAfterMove(destinationZone, 0);
	}
}
function MSOLayout_UpdatePartOrderAfterMove(Zone, StartingIndex)
{
	var index;
	if(Zone.orientation=='Horizontal')
	{
		var parentRow=Zone.rows[0];
		for(index=StartingIndex; index < parentRow.cells.length; index++)
		{
			MSOLayout_AddChange(eval(parentRow.cells[index].relatedWebPart), "ZoneIndex", index);
		}
	}
	else
	{
		for(index=StartingIndex; index < Zone.rows.length; index++)
		{
			MSOLayout_AddChange(eval(Zone.rows[index].cells[0].relatedWebPart), "ZoneIndex", index);
		}
	}
}
function MSOLayout_CreateDragObject(WebPartTitle)
{	
	var titleText;
	if(!MSOLayout_moveObject)
	{
		MSOLayout_moveObject=document.body.insertAdjacentElement("afterBegin", document.createElement('DIV'));
		MSOLayout_moveObject.className='UserCellSelected';
		MSOLayout_moveObject.style.cssText="font-size:8pt;position:absolute;overflow:hidden;display:none;z-index:100";
		MSOLayout_moveObject.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=75)";
		titleText=MSOLayout_moveObject.insertBefore(document.createElement('NOBR'));
		titleText.style.cssText="padding-top:2px;width:147px;height:1.5em;overflow:hidden;text-overflow:ellipsis";
	}
	else titleText=MSOLayout_moveObject.children(0);
	titleText.innerText=WebPartTitle;
}
function MSOLayout_MoveDragObject()
{
	if(MSOLayout_currentDragMode !='move') return;
	if(MSOLayout_moveObject.style.display=='none') MSOLayout_moveObject.style.display='';
	if(MSOLayout_moveObject.style.width=='')
	{
		MSOLayout_moveObject.realWidth=MSOLayout_moveObject.offsetWidth;
		MSOLayout_moveObject.realHeight=MSOLayout_moveObject.offsetHeight;
	}
	var newWidth=MSOLayout_moveObject.realWidth;
	var newHeight=MSOLayout_moveObject.realHeight;
	var newLeft=event.clientX+document.body.scrollLeft - (newWidth / 2);
	var newTop=event.clientY+document.body.scrollTop+1;
	if(newLeft+newWidth > document.body.scrollWidth) newWidth -=(newLeft+newWidth - document.body.scrollWidth);
	if(newTop+newHeight > document.body.scrollHeight) newHeight -=(newTop+newHeight - document.body.scrollHeight);
	if(newHeight <=0 || newWidth <=0)
	{
		MSOLayout_moveObject.style.display='none';
		newWidth=newHeight=0;
	}
	else MSOLayout_moveObject.style.display='';
	MSOLayout_moveObject.style.width=newWidth;
	MSOLayout_moveObject.style.height=newHeight;
	MSOLayout_moveObject.style.pixelLeft=newLeft;
	MSOLayout_moveObject.style.pixelTop=newTop;
}
function MSOLayout_CreateIBar()
{
	if(!MSOLayout_vertZoneIBar || !MSOLayout_horzZoneIBar)
	{
		var iBarBuilder=document.createElement('TABLE');
		iBarBuilder.style.cssText="font-size:1pt; position:absolute; display:none; border-collapse:collapse";
		iBarBuilder.className='ms-SPZoneIBar';
		iBarBuilder.cellSpacing='0';
		iBarBuilder.cellPadding='0';
		iBarBuilder.attachEvent('ondragenter', MSOLayout_MoveWebPartStopEventBubble);
		iBarBuilder.attachEvent('ondragover', MSOLayout_MoveWebPartStopEventBubble);
		var insideIBarCell=iBarBuilder.insertRow().insertCell();
		insideIBarCell.align='center';
		var insideIBar=insideIBarCell.insertBefore(document.createElement('DIV'));
		insideIBar.id="MSOLayout_insideIBar";
		insideIBar.className='ms-SPZoneIBar';
		insideIBar.style.backgroundColor=iBarBuilder.currentStyle.borderColor;
		insideIBar.style.background="transparent";
		insideIBar.style.borderWidth="2px";
		insideIBar.style.position="relative";		
		MSOLayout_horzZoneIBar=MSOLayout_topObject.appendChild(iBarBuilder.cloneNode(true));
		MSOLayout_vertZoneIBar=MSOLayout_topObject.appendChild(iBarBuilder.cloneNode(true));
		var insideHorzIBar=MSOLayout_horzZoneIBar.all["MSOLayout_insideIBar"];
		var insideVertIBar=MSOLayout_vertZoneIBar.all["MSOLayout_insideIBar"];
		MSOLayout_horzZoneIBar.style.width=6;
		MSOLayout_horzZoneIBar.style.borderStyle="solid none";
		insideHorzIBar.style.height='100%';
		insideHorzIBar.style.width='33%';
		insideHorzIBar.style.borderStyle="none solid none none";
		insideHorzIBar.style.posTop=0;
		MSOLayout_vertZoneIBar.style.height=6;
		MSOLayout_vertZoneIBar.style.borderStyle="none solid";
		insideVertIBar.style.width='100%';
		insideVertIBar.style.height='2';
		insideVertIBar.style.borderStyle="solid none none none";
		insideVertIBar.style.posTop=1;
		if(MSOLayout_topObject !=document.body)
		{
			MSOLayout_horzBodyZoneIBar=document.body.appendChild(MSOLayout_horzZoneIBar.cloneNode(true));
			MSOLayout_vertBodyZoneIBar=document.body.appendChild(MSOLayout_vertZoneIBar.cloneNode(true));
		}
	}
	MSOLayout_iBar=MSOLayout_vertZoneIBar;
}
function MSOLayout_MoveIBar(ZoneTableCell)
{
	if(MSOLayout_iBar) MSOLayout_iBar.style.display='none';
	var insideLayoutDiv=MSOLayout_topObject.contains(ZoneTableCell);
	if(MSOLayout_maintainOriginalZone=='0' || MSOLayout_GetParentTable(ZoneTableCell)==MSOLayout_maintainOriginalZone)
	{
		var insideIBar;
		if(ZoneTableCell.orientation=='Horizontal')
		{
			var rightOffset=((document.dir=="rtl") ? ZoneTableCell.offsetWidth - ((ZoneTableCell.cellIndex==0) ? 3 : 0) : 0);
			MSOLayout_iBar=(insideLayoutDiv) ? MSOLayout_iBar=MSOLayout_horzZoneIBar : MSOLayout_horzBodyZoneIBar;
			insideIBar=MSOLayout_iBar.all["MSOLayout_insideIBar"];
			MSOLayout_iBar.style.pixelLeft=MSOLayout_GetRealOffset(ZoneTableCell, 'Left', MSOLayout_topObject) - ((ZoneTableCell.cellIndex==0) ? 0 : 3);
			MSOLayout_iBar.style.pixelLeft+=rightOffset;
			MSOLayout_iBar.style.pixelTop=MSOLayout_GetRealOffset(MSOLayout_zoneDragOver, 'Top', MSOLayout_topObject)+1;
			MSOLayout_iBar.style.height=MSOLayout_zoneDragOver.clientHeight;
			if(ZoneTableCell.id=="MSOZone_EmptyZoneCell")
			{
				var emptyZoneText=ZoneTableCell.all.item('MSOZoneCell_emptyZoneText');
				if(emptyZoneText !=null && emptyZoneText.webPartsInZone > 0)
				{
					MSOLayout_iBar.style.pixelLeft -=3;
				}
			}
		}
		else
		{
			MSOLayout_iBar=(insideLayoutDiv) ? MSOLayout_vertZoneIBar : MSOLayout_vertBodyZoneIBar;
			insideIBar=MSOLayout_iBar.all["MSOLayout_insideIBar"];
			MSOLayout_iBar.style.pixelLeft=MSOLayout_GetRealOffset(MSOLayout_zoneDragOver, 'Left', MSOLayout_topObject)+1;
			MSOLayout_iBar.style.pixelTop=MSOLayout_GetRealOffset(ZoneTableCell, 'Top', MSOLayout_topObject) - ((MSOLayout_GetParentRow(ZoneTableCell).rowIndex==0) ? 0 : 4);
			MSOLayout_iBar.style.width=MSOLayout_zoneDragOver.clientWidth;
			if(ZoneTableCell.id=="MSOZone_EmptyZoneCell")
			{
				MSOLayout_iBar.style.pixelTop -=1;
			}
		}
		if(MSOLayout_zoneDragOver.className !='ms-SPZoneSelected') MSOLayout_zoneDragOver.className='ms-SPZoneSelected';
		MSOLayout_iBar.style.display='inline';
	}
}
function MSOLayout_UpdateZoneDropDown()
{
	var dropd=document.all[zoneChooserID];
	if(dropd !=null)
	{
		for (i=0; i<dropd.options.length; i++)
		{
			if (dropd.options[i].value==MSOLayout_zoneDragOver.zoneID)
				dropd.options[i].selected=true;
		}
	}
}
function MSOLayout_SetupDropLocation(ZoneTableCell, CheckSize)
{
	if(ZoneTableCell.orientation=='Vertical')
	{
		var parentRow=MSOLayout_GetParentRow(ZoneTableCell);
		if(!parentRow) return;
		if(ZoneTableCell.id !="MSOZone_EmptyZoneCell" && (!CheckSize || (event.clientY+MSOLayout_topObject.scrollTop - MSOLayout_GetRealOffset(ZoneTableCell, 'Top')) > (ZoneTableCell.offsetHeight / 2)))
			MSOLayout_rowToDrop=parentRow.rowIndex+1;
		else
			MSOLayout_rowToDrop=parentRow.rowIndex;
	}
	else
	{
		var rtlPage=(document.dir=="rtl"),	
			maxCells=ZoneTableCell.parentElement.childNodes.length,
			nextCellIndex=ZoneTableCell.cellIndex+1;
		if(ZoneTableCell.id !="MSOZone_EmptyZoneCell" && (!CheckSize || (event.clientX+MSOLayout_topObject.scrollLeft - MSOLayout_GetRealOffset(ZoneTableCell, 'Left')) > (ZoneTableCell.offsetWidth / 2)))
			MSOLayout_cellToDrop=(rtlPage) ? ZoneTableCell.cellIndex : ZoneTableCell.cellIndex+1;
		else
		{
			if (rtlPage)	
				MSOLayout_cellToDrop=(nextCellIndex >=maxCells) ? ZoneTableCell.cellIndex : ZoneTableCell.cellIndex+1;
			else
				MSOLayout_cellToDrop=ZoneTableCell.cellIndex;
		}
	}
}
function MSOLayout_UpdatePropertySheet(WebPart,PropertyName,PropertyValue)
{
	var toolPane=document.all.item("MSOTlPn_MainTD");
	if(WebPart.SelectedWebPart && toolPane)
	{
		for(Elements=toolPane.all, ElementIndex=0; ElementIndex < Elements.length; ElementIndex++)
		{
			if(Elements[ElementIndex].layoutID==PropertyName)
			{
				if(PropertyName=="ChromeState")
				{
					for(radioElements=Elements[ElementIndex].all, radioIndex=0; radioIndex <  radioElements.length; radioIndex++)
					{
						if(radioElements[radioIndex].value==PropertyValue)
						{
							radioElements[radioIndex].checked=true;
							break;
						}
					}
				}
				else if (PropertyName=="Height" || PropertyName=="Width")
				{
					for(radioElements=Elements[ElementIndex].all, radioIndex=0; radioIndex <  radioElements.length; radioIndex++)
					{
						if(radioElements[radioIndex].id.indexOf("YesOption") !=-1)
						{
							radioElements[radioIndex].checked=true;
						}
						else if(radioElements[radioIndex].id.indexOf("SizeTextBox") !=-1)
						{
							radioElements[radioIndex].value=PropertyValue;
						}
						else if(radioElements[radioIndex].id.indexOf("UnitsDropdown") !=-1)
						{
							radioElements[radioIndex].value="Pixel";
						}
					}
				}
				else
				{
					Elements[ElementIndex].value=PropertyValue;
				}
			}
		}
	}
}
function MSOLayout_MinimizeRestore(WebPart)
{
	var newValue;
	var newValueIndex;
	if(WebPart.style.display !='none')
	{
		newValue='Minimized';
		newValueIndex=1;
		WebPart.style.display='none';
	}
	else
	{
		newValue='Normal';
		newValueIndex=0;
		WebPart.style.display='';
	}
	MSOLayout_UpdatePropertySheet(WebPart, "ChromeState", newValue);
	MSOLayout_AddChange(WebPart, "chromeState", newValueIndex)
}
function MSOLayout_PageViewerMinimizeRestore(WebPart, PageViewerIFrameID)
{
	var PageViewerIFrame=document.all.item(PageViewerIFrameID);
	if (PageViewerIFrame !=null)
	{
		if(WebPart.style.display !='none')
		{
			if (PageViewerIFrame.src !=PageViewerIFrame.ddf_src)
			{
				PageViewerIFrame.src=PageViewerIFrame.ddf_src;
			}
		}
	}
}
function MSOLayout_FindAncestorByAttribute(Element, AttributeName)
{
	while (Element !=null)
	{
		if (Element.getAttribute(AttributeName) !=null)
			break;
		Element=Element.parentElement;	
	}
	return Element;
}
function MSOLayout_MinimizeRestoreToolPart(ToolPart, partTitle, strImgName, strAnchorName, strImageAnchorName)
{
	var fieldID=ToolPart+'ChromeState';
	var containingFrame=ToolPart+'Chrome';
	var stateFieldValue;
	var tooltipTemplate;
	if( document.all.item(containingFrame).style.display=='none' )
	{
		document.all.item(containingFrame).style.display='inline';
		document.images[strImgName].src='/_layouts/images/TPMin1.gif';
		tooltipTemplate=MSOStrings.ToolPartCollapseToolTip;
		stateFieldValue="Normal";
	}
	else
	{
		document.all.item(containingFrame).style.display='none';
		document.images[strImgName].src='/_layouts/images/TPMax1.gif';
		tooltipTemplate=MSOStrings.ToolPartExpandToolTip;
		stateFieldValue="Minimized";
	}
	   var tooltipString=tooltipTemplate.replace("%0", partTitle);
	   document.images[strImgName].alt=tooltipString;
	   document.all.item(strImageAnchorName).title=tooltipString;
	   document.all.item(strAnchorName).title=tooltipString;
	if(document.all[fieldID] !=null)
	{
		document.all[fieldID].value=stateFieldValue;
	}
}
function MSOLayout_RemoveWebPart(webPart)
{
	MSOLayout_AddChange(webPart, "isIncluded", "False")
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value=19;
	if(webPart.SelectedWebPart) MSOTlPn_onToolPaneCloseClick();
	else __doPostBack(MSOWebPartPageFormName, '');
}
function MSOLayout_RefreshIFrame(IFrame)
{
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value=23;
	IFrame.src=IFrame.src;
}
function MSOLayout_GetStyleFromClass(sClass,sRule)
{
	document.body.insertAdjacentHTML( 'beforeEnd', "<div style='display:none' id='temp' class='"+sClass+"'></div>");
	var sReturnValue=eval('temp.currentStyle.'+sRule );
	temp.removeNode();
	return sReturnValue;
}
function MSOLayout_AddChange(WebPart,Property,NewValue)
{
	if(!WebPart) return;
	var WebPartGUID=WebPart.WebPartID;
	if(WebPart.layoutChanges)
	{
		var propertyIndex=MSOLayout_SearchArray(WebPart.layoutChanges,Property);
		if(propertyIndex !=-1) WebPart.layoutChanges[propertyIndex+1]=NewValue;
		else
		{
			WebPart.layoutChanges.push(Property);
			WebPart.layoutChanges.push(NewValue);
		}
	}
	else
	{
		WebPart.layoutChanges=new Array();
		WebPart.layoutChanges.push(Property);
		WebPart.layoutChanges.push(NewValue);	
	}
	if(MSOLayout_SearchArray(MSOLayout_unsavedChanges,WebPartGUID)==-1)
	{
		MSOLayout_unsavedChanges.push(((MSOLayout_unsavedChanges.length) ? "|" : "")+WebPartGUID);
		MSOLayout_unsavedChanges.push(WebPart.layoutChanges);
	}
	document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value=MSOLayout_unsavedChanges;
	MSOLayout_UpdatePropertySheet(WebPart,Property,NewValue);
	if(MSOLayout_FormSubmit==null)
	{
		MSOLayout_FormSubmit=document.forms[MSOWebPartPageFormName].submit;
		document.forms[MSOWebPartPageFormName].submit=new Function("MSOLayout_OnSubmit(); MSOLayout_FormSubmit();");
		document.forms[MSOWebPartPageFormName].attachEvent("onsubmit", MSOLayout_OnSubmit);
		window.attachEvent("onunload", MSOLayout_SaveChanges);
	}
}
function MSOLayout_OnSubmit()
{
	window.detachEvent("onunload", MSOLayout_SaveChanges);
}
function MSOLayout_SaveChanges()
{
	if(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges !=null && document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value !="")
	{
		var pageUrl=document.URLUnencoded;
		var hashMarkExpression=/\#/;
		var hashMarkIndex=pageUrl.search(hashMarkExpression);
		if(hashMarkIndex !=-1)
		{
			pageUrl=pageUrl.substring(0, hashMarkIndex);
		}
		pageUrl=encodeURI(pageUrl)
		var xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		xmlhttp.Open('POST',pageUrl,false);
		var formData='&__REQUESTDIGEST='+URLEncode(document.forms[MSOWebPartPageFormName].__REQUESTDIGEST.value)+'&MSOLayout_LayoutChanges='+URLEncode(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.Send(formData);
		document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value="";
	}
}
function MSOLayout_SearchArray(SearchArray, Value)
{
	for(var index=0; index < SearchArray.length; index++)
	{
		if(SearchArray[index]==Value || SearchArray[index]=="#"+Value) return index;
	}
	return -1;
}
function MSOWebPartPage_OpenMenu(MenuToOpen,SourceElement,WebPart,InConnectionsMode)
{
	if(WebPart)
	{
		MenuWebPart=WebPart
		MenuWebPartID=WebPart.WebPartID;
		var minOption=MenuToOpen.all.item('MSOMenu_Minimize');
		var restoreOption=MenuToOpen.all.item('MSOMenu_Restore');
		var closeOption=MenuToOpen.all.item('MSOMenu_Close');
		var deleteOption=MenuToOpen.all.item('MSOMenu_Delete');
		var exportOption=MenuToOpen.all.item('MSOMenu_Export');
		var resetPersOption=MenuToOpen.all.item('MSOMenu_RestorePartDefaults');
		var helpOption=MenuToOpen.all.item('MSOMenu_Help');
		var connectionOption=MenuToOpen.all.item('MSOMenu_Connections');
		if(minOption)
		{
			minOption.style.display=(WebPart.allowMinimize=='false' || WebPart.style.display=='none') ? 'none' : '';
		}
		if(restoreOption)
		{
			restoreOption.style.display=(WebPart.allowMinimize=='false' || WebPart.style.display !='none') ? 'none' : '';
		}
		if(closeOption)
		{
			closeOption.style.display=(WebPart.allowRemove=='false') ? 'none' : '';
		}
		if(deleteOption)
		{
			deleteOption.style.display=(MSOLayout_inDesignMode && WebPart.allowDelete !='false') ? '' : 'none';
		}
		if(exportOption)
		{
			exportOption.style.display=(WebPart.allowExport=='false') ? 'none' : '';
		}
		if(helpOption)
		{
			helpOption.style.display=(WebPart.helpLink==null) ? 'none' : "";
		}
		if(resetPersOption)
		{
			resetPersOption.style.display=(MSOLayout_inDesignMode && WebPart.HasPers=='true' && WebPart.OnlyForMePart !='true') ? '' : 'none';
		}
		if(connectionOption)
		{
			connectionOption.style.display=(MSOLayout_inDesignMode ? '' : 'none');
		}
		if(InConnectionsMode !='False')
		{	
			var connMenu=document.all.item('MSOMenu_Connections'+WebPart.id);
			if(connectionOption !=null && connMenu !=null)
			{	
				connectionOption.outerHTML=connMenu.innerHTML;
			}
		}
	}
	MenuHtc_show(MenuToOpen, SourceElement, true, null, null);
	return true;
}
function  MSOConn_IsXFormUINeeded()
{
	var tinterface=MSOConn_TargetGroupNode.selectSingleNode('tInterface');
	var isXFormUINeeded=false;
	var xFormNode=tinterface.selectSingleNode('xForm');
	if(xFormNode !=null && tinterface.selectSingleNode("mi").getAttribute("isXFormUINeeded")=="True")
	{
		isXFormUINeeded=true;
		if(MSOConn_TargetGroupNode.getAttribute("isConn")=="True")
		{
			document.all.MSOConn_Button.value="edit";
		}
		if(xFormNode.getAttribute("type")=="RowCellTransform")
		{
			MSOConn_ShowRowCellXForm(tinterface);
		}
		else if(xFormNode.getAttribute("type")=="RowFilterTransform")
		{
			MSOConn_ShowRowFilterXForm(tinterface);
		}
		else
		{
			MSOConn_ShowAspXForm(tinterface);
		}
	}
	if(!isXFormUINeeded && MSOConn_TargetGroupNode.getAttribute("isConn")=="True" && MSOConn_BackButtonClicked==false)
	{
		document.all.MSOConn_Button.value="remove";
	}
}
function  MSOConn_ShowRowFilterXForm(targetInterface)
{
	var rowProInitArgNode;
	var filConInitArgNode;
	var providerPart;
	var consumerPart;
	var sMatchInterfaceName=targetInterface.selectSingleNode("mi").getAttribute("id");
	var xFormInfo=targetInterface.selectSingleNode("mi").getAttribute("xInfo");
	var sInterfaceNode=MSOConn_SourceGroupNode.selectSingleNode("sInterfaces/sInterface[@id='"+sMatchInterfaceName+"']");
	rowProInitArgNode=targetInterface.selectSingleNode("InitEventArgs/RowProviderInitEventArgs");
	var isConnected=MSOConn_TargetGroupNode.getAttribute("isConn");
	if(rowProInitArgNode==null)
	{
		rowProInitArgNode=sInterfaceNode.selectSingleNode("InitEventArgs/RowProviderInitEventArgs");
		filConInitArgNode=targetInterface.selectSingleNode("InitEventArgs/FilterConsumerInitEventArgs");
		consumerPart=MSOConn_TargetWpNode;
		providerPart=MSOConn_SourceWpNode;
	}
	else
	{
		filConInitArgNode=sInterfaceNode.selectSingleNode("InitEventArgs/FilterConsumerInitEventArgs");
		consumerPart=MSOConn_SourceWpNode;
		providerPart=MSOConn_TargetWpNode;
	}
	if(rowProInitArgNode !=null && filConInitArgNode !=null)
	{
		var rowFieldList=new Array();
		var rowFieldDisplayList=new Array();
		var rowFieldListNodes=rowProInitArgNode.selectNodes("Field");
		var filterFieldListNodes=filConInitArgNode.selectNodes("Field");
		var filterFieldList=new Array();
		var filterFieldDisplayList=new Array();
		if(rowFieldListNodes==null || rowFieldListNodes.length==0)
		{
			var cref=rowProInitArgNode.getAttribute("cref");
			if(cref !=null)
			{
				var strVal=cref+".GetInitEventArgs()";
				var args=null;
				try
				{
					args=eval(strVal);
				}
				catch(e)
				{
				}
				if(args !=null)
				{
					rowFieldList=args.FieldList;
					rowFieldDisplayList=args.FieldDisplayList;
				}
			}
		}
		else
		{
			for(var i=0 ; i< rowFieldListNodes.length; i++)
			{
				var displayListSet=false;
				rowFieldList[i]=rowFieldListNodes[i].getAttribute("FieldName");
				if(rowFieldListNodes[i].getAttribute("FieldDisplayName") !=null)
				{
					rowFieldDisplayList[i]=rowFieldListNodes[i].getAttribute("FieldDisplayName");
					displayListSet=true;
				}
				else if(displayListSet==true)
				{
					rowFieldDisplayList=null;
				}
			}
		}
		if(filterFieldListNodes==null || filterFieldListNodes.length==0)
		{
			var cref=filConInitArgNode.getAttribute("cref");
			if(cref !=null)
			{
				var strVal=cref+".GetInitEventArgs()";
				var args=null;
				try
				{
					args=eval(strVal);
				}
				catch(e)
				{
				}
				if(args !=null)
				{
					filterFieldList=args.FieldList;
					filterFieldDisplayList=args.FieldDisplayList;
				}
			}
		}
		else
		{
			for(var i=0 ; i< filterFieldListNodes.length; i++)
			{
				var displayListSet=false;
				filterFieldList[i]=filterFieldListNodes[i].getAttribute("FieldName");
				if(filterFieldListNodes[i].getAttribute("FieldDisplayName") !=null)
				{
					filterFieldDisplayList[i]=filterFieldListNodes[i].getAttribute("FieldDisplayName");
					displayListSet=true;
				}
				else if(displayListSet==true)
				{
					filterFieldDisplayList=null;
				}
			}
		}
		if((rowFieldList !=null && rowFieldList.length !=0 && filterFieldList !=null && filterFieldList.length !=0) || isConnected=='True' )
		{
			var rfxFormInfo;
			var rowList=rowFieldList;
			if(rowFieldDisplayList !=null && rowFieldDisplayList.length==rowFieldList.length)
			{
				rowList=rowFieldDisplayList;
			}
			var sFeatures="dialogHeight:210px;dialogWidth:460px;center:yes;help:no;status:no;scroll:no;resizable:no;";
			var url=document.all.MSOConn_RFProXform.value+"?part=provider";
			var arguments=new Array(rowList, isConnected, providerPart.getAttribute("title"), consumerPart.getAttribute("title"),MSOConn_MultipleTargetGroups, xFormInfo, rowFieldList);
			 var rfxFormInfoRowIndex=showModalDialog(url, arguments, sFeatures);	
			if(rfxFormInfoRowIndex==null || rfxFormInfoRowIndex=="undefined")
			{
			  	MSOConn_ConnCancelled=true;
			}
			else if(rfxFormInfoRowIndex=="remove")
			{
				document.all.MSOConn_Button.value="remove";
				rfxFormInfo="";
			}
			else if(rfxFormInfoRowIndex=="choose")
			{
				MSOConn_ShowTargetGroupsDialog();
				MSOConn_ShowXFormsAndPersist();
				MSOConn_ConnCancelled=true;
			}
			else
			 {
				var filterList=filterFieldList;
				if(filterFieldDisplayList !=null && filterFieldList.length==filterFieldDisplayList.length)
				{
					filterList=filterFieldDisplayList;
				}
				var selectedRowDisplayFieldName=rowList[rfxFormInfoRowIndex];
				arguments=new Array(filterList, selectedRowDisplayFieldName, isConnected,consumerPart.getAttribute("title"),xFormInfo, filterFieldList);
				var rfxFormInfoFilterIndex=showModalDialog(document.all.MSOConn_RFConXform.value, arguments ,sFeatures);
				if(rfxFormInfoFilterIndex==null)
				{
					MSOConn_ConnCancelled=true;
				}
				else if(rfxFormInfoFilterIndex=="remove")
				{
					document.all.MSOConn_Button.value="remove";
					rfxFormInfo="";
				}
				else if(rfxFormInfoFilterIndex=="previous")
				{
					MSOConn_ShowRowFilterXForm(targetInterface);
				}
				else if(MSOConn_ConnCancelled !=true)
				{
					MSOConn_XformInfo1=filterFieldList[rfxFormInfoFilterIndex];
					MSOConn_XformInfo2=rowFieldList[rfxFormInfoRowIndex];	
				}
			}
		}
		else
		{
			MSOConn_InitArgsError();
			MSOConn_ConnCancelled=true;
		}
	}
	else
	{
		MSOConn_InitArgsError();
		MSOConn_ConnCancelled=true;
	}
}
function  MSOConn_ShowRowCellXForm(targetInterface)
{
	var rowProInitArgNode=null;
	var cellConInitArgNode=null;
	var providerPart=null;
	var consumerPart=null;
	var rcxFormInfo=null;
	var sMatchInterfaceName=targetInterface.selectSingleNode("mi").getAttribute("id");
	var xFormInfo=targetInterface.selectSingleNode("mi").getAttribute("xInfo");
	var sInterfaceNode=MSOConn_SourceGroupNode.selectSingleNode("sInterfaces/sInterface[@id='"+sMatchInterfaceName+"']");
	rowProInitArgNode=targetInterface.selectSingleNode("InitEventArgs/RowProviderInitEventArgs");
	var isConnected=MSOConn_TargetGroupNode.getAttribute("isConn");
	if( rowProInitArgNode==null)
	{	
		rowProInitArgNode=sInterfaceNode.selectSingleNode("InitEventArgs/RowProviderInitEventArgs");
		cellConInitArgNode=targetInterface.selectSingleNode("InitEventArgs/CellConsumerInitEventArgs");
		providerPart=MSOConn_SourceWpNode;
		consumerPart=MSOConn_TargetWpNode;
	}
	else
	{
		cellConInitArgNode=sInterfaceNode.selectSingleNode("InitEventArgs/CellConsumerInitEventArgs");
		providerPart=MSOConn_TargetWpNode;
		consumerPart=MSOConn_SourceWpNode;
	}
	if(rowProInitArgNode !=null && cellConInitArgNode !=null)
	{
		var fieldList=new Array();
		var fieldDisplayList=new Array();
		var fieldListNodes=rowProInitArgNode.selectNodes("Field");
		if(fieldListNodes==null || fieldListNodes.length==0)
		{
			var cref=rowProInitArgNode.getAttribute("cref");
			if(cref !=null)
			{
				var strVal=cref+".GetInitEventArgs()";
				var args=null;
				try
				{
					args=eval(strVal);
				}
				catch(e)
				{
				}
				if(args !=null)
				{
					fieldList=args.FieldList;
					fieldDisplayList=args.FieldDisplayList;
				}
			}
		}
		else
		{
			for(var i=0 ; i< fieldListNodes.length; i++)
			{
				var displayListSet=false;
				fieldList[i]=fieldListNodes[i].getAttribute("FieldName");
				if(fieldListNodes[i].getAttribute("FieldDisplayName") !=null)
				{
					fieldDisplayList[i]=fieldListNodes[i].getAttribute("FieldDisplayName");
					displayListSet=true;
				}
				else if(displayListSet==true)
				{
					fieldDisplayList=null;
				}
			}
		}
		var cell=cellConInitArgNode.getAttribute("FieldName");
		var cellDisplayName=cellConInitArgNode.getAttribute("FieldDisplayName");
		if(cell==null)
		{
			var cref=cellConInitArgNode.getAttribute("cref");
			if(cref !=null)
			{
				var strVal=cref+".GetInitEventArgs()";
				var args=null;
				try
				{
					args=eval(strVal);
				}
				catch(e)
				{
				}
				if(args !=null)
				{
					cell=args.FieldName;
					cellDisplayName=args.cellDisplayName;
				}
			}
		}
		if((fieldList !=null  && fieldList.length !=0 && cell !=null) || isConnected=='True')
		{
			var cellName=cell;
			var rowList=fieldList;
			if(fieldDisplayList !=null && fieldDisplayList.length==fieldList.length)
			{
				rowList=fieldDisplayList;
			}
			if(cellDisplayName !=null)
			{
				cellName=cellDisplayName;
			}
			var arguments=new Array(rowList, cellName, isConnected , providerPart.getAttribute("title"), consumerPart.getAttribute("title"),MSOConn_MultipleTargetGroups, xFormInfo, fieldList);
			var sFeatures="dialogHeight:210px;dialogWidth:460px;center:yes;help:no;status:no;scroll:no;resizable:no;";
			var rcxFormInfoIndex=showModalDialog(document.all.MSOConn_RCXform.value,arguments,sFeatures);
			if(rcxFormInfoIndex=="undefined" || rcxFormInfoIndex==null)
			{
				MSOConn_ConnCancelled=true;
			}
			else if(rcxFormInfoIndex=="remove")
			{
				document.all.MSOConn_Button.value="remove";
				rcxFormInfo="";
			}
			else if(rcxFormInfoIndex=="choose")
			{
				MSOConn_ShowTargetGroupsDialog();
				MSOConn_ShowXFormsAndPersist();
				MSOConn_ConnCancelled=true;
			}
			else
			{
				rcxFormInfo=fieldList[rcxFormInfoIndex];
			}
		}
		else
		{	
			MSOConn_InitArgsError();
			MSOConn_ConnCancelled=true;
		}
	}
	else
	{
		MSOConn_InitArgsError();
		MSOConn_ConnCancelled=true;
	}
	if(rcxFormInfo !=null && MSOConn_ConnCancelled !=true)
	{
		MSOConn_XformInfo1=rcxFormInfo;
	}
}
function  MSOConn_ShowAspXForm(targetInterface)
{
	var xFormNode=targetInterface.selectSingleNode('xForm');
	var xFormType=xFormNode.getAttribute("type");
	var xFormInfo=targetInterface.selectSingleNode("mi").getAttribute("xInfo");
	var isConnected=MSOConn_TargetGroupNode.getAttribute("isConn");
	var tGroupId=targetInterface.getAttribute("id");
	var isMultiGroup;
	if (MSOConn_MultipleTargetGroups)
	{
		isMultiGroup="True";
	}
	else
	{
		isMultiGroup="False";
	}
	var sFeatures="dialogHeight:210px;dialogWidth:460px;center:yes;help:no;status:no;scroll:no;resizable:no;";
	var xFormUrl=document.all.MSOConn_AspXformUrl.value;
	xFormUrl+="?pageUrl=";
	xFormUrl+=escapeProperly(document.location.href);
	xFormUrl+="&sWpId=";
	xFormUrl+=escapeProperly(document.all.MSOConn_SWpId.value);
	xFormUrl+="&sGroupId=";
	xFormUrl+=escapeProperly(document.all.MSOConn_SGroupId.value);
	xFormUrl+="&tWpId=";
	xFormUrl+=escapeProperly(document.all.MSOConn_TWpId.value);
	xFormUrl+="&tGroupId=";
	xFormUrl+=escapeProperly(tGroupId);
	xFormUrl+="&xFormType=";
	xFormUrl+=escapeProperly(xFormType);
	xFormUrl+="&xFormInfo=";
	xFormUrl+=escapeProperly(xFormInfo);
	xFormUrl+="&isMultiGroup=";
	xFormUrl+=escapeProperly(isMultiGroup);
	xFormUrl+="&isConnected=";
	xFormUrl+=escapeProperly(isConnected);
	var returnInfo=window.showModalDialog(xFormUrl, null, sFeatures);
	if (returnInfo==null)
	{
		returnInfo=new Array(null, null);
	}
	var action=returnInfo[0];
	var serializedConfig=returnInfo[1];
	if(action=="undefined" || action==null)
	{
		MSOConn_ConnCancelled=true;
	}
	else if(action=="remove")
	{
		document.all.MSOConn_Button.value="remove";
		serializedConfig="";
	}
	else if(action=="choose")
	{
		MSOConn_ShowTargetGroupsDialog();
		MSOConn_ShowXFormsAndPersist();
		MSOConn_ConnCancelled=true;
	}
	if(serializedConfig !=null && MSOConn_ConnCancelled !=true)
	{
		MSOConn_AspXformInfo=serializedConfig;
	}
}
function MSOConn_InitArgsError()
{
	document.body.style.cursor='auto';
	alert(MSOStrings.NoInitArgs);
}
function MSOConn_ShowTargetGroupsDialog()
{
	var connected=false;
	if(MSOConn_TargetWpNode.selectNodes("tg") !=null && MSOConn_TargetWpNode.selectNodes("tg").length !=0)
	{
		var targetGroupNodes=MSOConn_TargetWpNode.selectNodes("tg");
		if(targetGroupNodes !=null)
		{
			for(i=0; i< targetGroupNodes.length;i++)
			{
				var tg=targetGroupNodes.item(i);
				if(tg.getAttribute('isConn')=='True')
				{
					connected=true;
					MSOConn_TargetGroupNode=tg;
					break;
				}
			}
		}
		if(!connected)
		{
			var sFeatures="dialogHeight:210px;dialogWidth:460px;center:yes;help:no;status:no;scroll:no;resizable:no;";
			var rValues=showModalDialog(document.all.MSOConn_GroupUrl.value, MSOConn_TargetWpNode,sFeatures);
			if(rValues !=null)
			{
				document.all.MSOConn_Button.value=rValues[0];
				var targetGroupNodes=MSOConn_TargetWpNode.selectNodes('tg');
				for (var j=0; targetGroupNodes.length; j++)
				{
					if (targetGroupNodes[j].getAttribute('id')==rValues[1])
					{
						MSOConn_TargetGroupNode=targetGroupNodes[j];
						break;
					}
				}
			}
			else
			{
				MSOConn_ConnCancelled=true;
			}
		}
	}
	else
	{
		MSOConn_ConnCancelled=true;
	}
}
function MSOConn_ConfirmRemoveConnection(sourceTitle, targetTitle)
{
	var errMsg=MSOStrings.RemoveConnection;
	var titleArray=new Array();
	titleArray[0]=sourceTitle;
	titleArray[1]=targetTitle;
	if(titleArray !=null)
	{
		for(var index=0; index < titleArray.length; index++)
		{
			errMsg=errMsg.replace("%"+index, titleArray[index]);
		}
	}
	return errMsg;
}
function MSOConn_ShowXFormsAndPersist()
{
	if(!MSOConn_ConnCancelled && MSOConn_TargetGroupNode !=null)
	{
		if(document.all.MSOConn_Button.value !="remove")
		{
			MSOConn_IsXFormUINeeded();
		}
		if(!MSOConn_ConnCancelled)
		{
			if(document.all.MSOConn_Button.value=="remove")
			{
				var errMsg=MSOConn_ConfirmRemoveConnection( MSOConn_SourceWpNode.getAttribute("title"), MSOConn_TargetWpNode.getAttribute("title"));
				if(confirm(errMsg))
				{
					MSOConn_PersistConnection();
				}
			}
			else
			{
				MSOConn_PersistConnection();
			}
		}
	}
	document.all.MSOConn_Button.value="none";
	MSOConn_ConnCancelled=false;
	MSOConn_XformInfo1=null;
	MSOConn_XformInfo2=null;
	MSOConn_AspXformInfo=null;
	MSOConn_SourceWpNode=null;
	MSOConn_TargetWpNode=null;
	MSOConn_MultipleTargetGroups=false;
	MSOConn_TargetGroupNode=null;
	MSOConn_SourceGroupNode=null;
}
function MSOConn_CreateConnectionStep1(sourceGuid,
												targetGuid,
												sourceTitle,
												targetTitle,
												sGroupID,
												connected,
												isXFormNeeded,
												tGroupID)
{
	document.all.MSOConn_SWpId.value=sourceGuid;
	document.all.MSOConn_TWpId.value=targetGuid;
	document.all.MSOConn_SGroupId.value=sGroupID;
	document.all.MSOConn_Button.value="save";
	document.all.MSOConn_TGroupId.value="";
	document.all.MSOConn_XForm1.value="";
	document.all.MSOConn_XForm2.value="";
	document.all.MSOConn_AspXForm.value="";
	var submit=true;
	if(tGroupID)
	{
		document.all.MSOConn_TGroupId.value=tGroupID;
	}
	if(connected=="True" && tGroupID !=null && isXFormNeeded !=null && isXFormNeeded=="False")
	{
		var errMsg=MSOConn_ConfirmRemoveConnection(sourceTitle, targetTitle);
		if(confirm(errMsg))
		{
			document.all.MSOConn_Button.value="remove";
		}
		else
		{
			submit=false;
		}
	}
	else if(connected=="True" && tGroupID==null)
	{
		document.all.MSOConn_Button.value="edit";
	}
	if(submit==true)
	{
		document.all.MSOConn_CreationStep.value="1";
		document.body.style.cursor="wait";
		__doPostBack(MSOWebPartPageFormName, '');
	}
}
function MSOConn_CreateConnectionStep2(sourceGuid, targetGuid, sourceID, targetID, sGroupID, tGroupID)
{	
	var targetGroupID=null;
	var targetGpNode=null;
	document.all.MSOConn_SWpId.value=sourceGuid;
	document.all.MSOConn_TWpId.value=targetGuid;
	document.all.MSOConn_SGroupId.value=sGroupID;
	document.all.MSOConn_TGroupId.value=tGroupID;
	var sourceWpNode=MSOConn_Compatibility.selectSingleNode("ConnDesign/sWebPart[@id='MSOConn_"+sourceID+"']");
	if(sourceWpNode !=null)
	{
		MSOConn_SourceWpNode=sourceWpNode;
		var sourceGpNode=null;
		var sourceGpNodes=sourceWpNode.selectNodes('sg');
		for (var i=0; sourceGpNodes.length; j++)
		{
			if (sourceGpNodes[i].getAttribute('id')==sGroupID)
			{
				sourceGpNode=sourceGpNodes[i];
				break;
			}
		}
		if(sourceGpNode !=null)
		{
			MSOConn_SourceGroupNode=sourceGpNode;
			var targetWpNode=sourceGpNode.selectSingleNode("tParts/tWebPart[@id='MSOConn_"+targetID+"']");
			if(targetWpNode !=null)
			{
				MSOConn_TargetWpNode=targetWpNode;
				if(!tGroupID)
				{
					MSOConn_MultipleTargetGroups=true;
					MSOConn_ShowTargetGroupsDialog();
				}
				else
				{
					var targetGroupNodes=targetWpNode.selectNodes('tg');
					for (var j=0; targetGroupNodes.length; j++)
					{
						if (targetGroupNodes[j].getAttribute('id')==tGroupID)
						{
							MSOConn_TargetGroupNode=targetGroupNodes[j];
							break;
						}
					}
				}
				MSOConn_ShowXFormsAndPersist();			
			}
		}
	}
	document.body.style.cursor="auto";
}
function MSOConn_PersistConnection()
{
	document.all.MSOConn_SGroupId.value=MSOConn_SourceGroupNode.getAttribute('id');
	document.all.MSOConn_TGroupId.value=MSOConn_TargetGroupNode.getAttribute('id');
	if(document.all.MSOConn_Button.value !="remove" && document.all.MSOConn_Button.value !="edit")
	{
		document.all.MSOConn_Button.value="save";
	}
	if(MSOConn_XformInfo1 !=null)
	{
		document.all.MSOConn_XForm1.value=MSOConn_XformInfo1;
	}
	if(MSOConn_XformInfo2 !=null)
	{
		document.all.MSOConn_XForm2.value=MSOConn_XformInfo2;
	}
	if(MSOConn_AspXformInfo !=null)
	{
		document.all.MSOConn_AspXForm.value=MSOConn_AspXformInfo;
	}
	__doPostBack(MSOWebPartPageFormName, '');
}
function MSOLayout_ShowErrorDetails()
{
	var src=event.srcElement.parentElement;
	 MSOLayout_ShowHideErrorDetails(src.nextSibling, src);
}
function MSOLayout_HideErrorDetails()
{
	var src=event.srcElement.parentElement.parentElement;
	 MSOLayout_ShowHideErrorDetails(src.previousSibling, src);
}
function MSOLayout_ShowHideErrorDetails(show, hide)
{
	hide.style.display='none';
	show.style.display='inline';
}
function MSOLayout_ShowQuickAddDialog(siteId, webId, encodedQuickAddGroups, showListsAndLibraries, numberOfWebPartsInZone, maxWebPartsInZone,callbackMethod, enCodedZoneDisplayName, popUpPage,feature)
{
	var queryString='?SiteId='+siteId+'&WebId='+webId;
	if(encodedQuickAddGroups !='')
	{
		queryString+='&Groups='+encodedQuickAddGroups;
	}
	if(showListsAndLibraries==false)
	{
		queryString+='&ShowListsAndLibraries=false';
	}
	queryString+='&NumberOfWebPartsInZone='+numberOfWebPartsInZone;
	queryString+='&MaxWebPartsInZone='+maxWebPartsInZone;
	if(enCodedZoneDisplayName !='')
	{
		queryString+='&ZoneDisplayName='+enCodedZoneDisplayName;
	}
	commonShowModalDialog(popUpPage+queryString, feature, callbackMethod);        	
}
var MSOTlPn_prevBuilder=null;
var MSOTlPn_prevWidth=0;
var MSOTlPn_prevHeight=0;
var MSOTlPn_shownViewChangeWarning=false;
var MSOWebPartPage_hideNextBeforeUnload=false;
var MSOWebPartPage_partDeleted="";
var MSOChangeInToolPaneWidth=120;
function ConvertToAspPartDisplayMode(view)
{
	var displayMode;
	switch(view)
	{
		case '-1': displayMode='ExtensibleView';
			break;
		case '0': displayMode='Browse';
			break;
		case '1': displayMode='Edit';
			break;
		case '2': displayMode='Catalog';
			break;
		case '3': displayMode='GallerySearch';
			break;
		case '4': displayMode='Navigation';
			break;
		case '5': displayMode='Import';
			break;
		case '6': displayMode='DownLevelWebPartMenu';
			break;
		case '7': displayMode='ToolPaneErr';
			break;
		}
	return displayMode;
}
function MSOTlPn_ShowToolPane2(displayModeName)
{
	if (document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible)
		document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value='false';
	document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value=displayModeName;
	if (arguments.length > 1)
	{
		document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_StartWebPartEditingName.value='true';
		document.forms[MSOWebPartPageFormName].MSOTlPn_SelectedWpId.value=arguments[1];
	}
	__doPostBack(MSOWebPartPageFormName,'');
}
function MSOTlPn_ShowToolPane2Wrapper(displayModeName, source)
{
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value=source;
	if( arguments[2]==null )
		MSOTlPn_ShowToolPane2(displayModeName);
	else
		MSOTlPn_ShowToolPane2(displayModeName, arguments[2]);
}
function MSOTlPn_ShowToolPane(view)
{
	if (arguments.length > 1)
		MSOTlPn_ShowToolPane2(ConvertToAspPartDisplayMode(view), arguments[1]);
	else
		MSOTlPn_ShowToolPane2(ConvertToAspPartDisplayMode(view));
}
function MSOTlPn_ShowToolPaneWrapper(view, source)
{
	if (arguments[2]==null)
		MSOTlPn_ShowToolPane2Wrapper(ConvertToAspPartDisplayMode(view), source);
	else
		MSOTlPn_ShowToolPane2Wrapper(ConvertToAspPartDisplayMode(view), source, arguments[2]);
}
function MSOLayout_CheckAndSaveChanges()
{
	if(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges !=null && document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value !="")
	{
		MSOLayout_SaveChanges();
	}
}
function MSOWebPartPage_ExportCheckWarning(address, hasPersonalizations)
{
	var doexport=true;
	if (hasPersonalizations)
	{
		if (!confirm(MSOStrings.ExportPersonalizationDialogText))
		{
			doexport=false;
		}
	}
	if (doexport)
	{
		var oldSavePerformed=false;
		if(typeof(MSOWPSC_SavePerformed)=="boolean")
		{
			oldSavePerformed=MSOWPSC_SavePerformed;
		}
		MSOWebPartPage_SetWindowLocation(address);
		if(typeof(MSOWPSC_SavePerformed)=="boolean")
		{
			MSOWPSC_SavePerformed=oldSavePerformed;
			MSOWebPartPage_hideNextBeforeUnload=true;
		}
	}
}
function MSOMode_SetMode(bAllUsers)
{
	var newUrl=MSOMode_GetNewUrl(bAllUsers);
	MSOLayout_CheckAndSaveChanges();
	if(document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value !='Navigation')
	{
		document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value='Browse';
		var toolPaneViewExpression=/[& | \?]ToolPaneView=[-0-9A-Z]*/ig;
		var displayModeExpression=/[& | \?]DisplayMode=[a-zA-Z]*/ig;
		newUrl=MSOMode_RemoveMode(newUrl, toolPaneViewExpression);
		newUrl=MSOMode_RemoveMode(newUrl, displayModeExpression);
	}
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value=bAllUsers ? "true" : "false";
	document.forms[MSOWebPartPageFormName].action=newUrl;
	__doPostBack(MSOWebPartPageFormName,'');
}
function MSOMode_GetNewUrl(bAllUsers, newUrl)
{
	if (newUrl==null)
	{
		newUrl=document.location.href;
	}
	var personalViewExpression=/[& | \?]PageView=Personal/ig;
	var allUsersViewExpression=/[& | \?]PageView=Shared/ig;
	var newMode="PageView="+(bAllUsers ? "Shared" : "Personal");
	newUrl=MSOMode_RemoveMode(newUrl, personalViewExpression);
	newUrl=MSOMode_RemoveMode(newUrl, allUsersViewExpression);
	newUrl=MSOMode_AddMode(newUrl, allUsersViewExpression, newMode);
	return newUrl;
}
function MSOMode_RemoveMode(newUrl, regExpression)
{
	var hashMarkExpression=/\#/;
	var hashMarkIndex=newUrl.search(hashMarkExpression);
	if(hashMarkIndex !=-1)
	{
		newUrl=newUrl.substring(0, hashMarkIndex);
	}
	var questionMarkExpression=/\?/;
	var questionMarkIndex=newUrl.search(questionMarkExpression);
	if(questionMarkIndex !=-1)
	{
		var pathString=newUrl.substring(0, questionMarkIndex);
		var queryString=newUrl.substring(questionMarkIndex, newUrl.length);
		queryString=queryString.replace(regExpression,'');
		if(queryString.length !=0 && queryString.charAt(0) !='?')
		{
			queryString="?"+queryString;
		}
		newUrl=pathString+queryString;
	}
	return newUrl;
}
function MSOMode_AddMode(newUrl, regExpression, stringToAdd)
{
	var hashMarkExpression=/\#/;
	var hashMarkIndex=newUrl.search(hashMarkExpression);
	if(hashMarkIndex !=-1)
	{
		newUrl=newUrl.substring(0, hashMarkIndex);
	}
	var questionMarkExpression=/\?/;
	var questionMarkIndex=newUrl.search(questionMarkExpression);
	if(questionMarkIndex==-1 )
	{
		newUrl+='?'+stringToAdd;
	}
	else
	{
		var queryString=newUrl.substring(questionMarkIndex, newUrl.length);
		if(queryString.search(regExpression)==-1)
		{
			newUrl+='&'+stringToAdd;
		}
	}
	return newUrl;
}
function MSOPGrid_BuilderVisible(builderID)
{
	MSOPGrid_HidePrevBuilder();
	MSOTlPn_prevBuilder=null;
	builderID.style.display='inline';
}
function MSOPGrid_HidePrevBuilder()
{
	if(MSOTlPn_prevBuilder !=null)
	{
		eval(MSOTlPn_prevBuilder).style.display='none';
	}
}
function MSOPGrid_doBuilder(builderUrl, editorId, dialogFeatures)
{
	var pReturnValue=showModalDialog(builderUrl,editorId,dialogFeatures);
	editorId.value=pReturnValue;
//@cc_on
//@if (@_jscript_version >=5)
//@     try { editorId.focus(); } catch (exception) {}
//@else
//@end
}
function MSOWebPartPage_RestorePageDefault()
{
	if(confirm(MSOStrings.ResetPagePersonalizationDialogText))
	{
		var newInput=document.createElement('INPUT');
		//@cc_on
		//@if (@_jscript_version >=5)
		//@     try
		//@else
		//@end
		{
			newInput.type='hidden';
		}
		//@cc_on
		//@if (@_jscript_version >=5)
		//@     catch(e){newInput.style.display='none';}
		//@else
		//@end
		newInput.name='MSOWebPartPage_RestorePageDefault';
		newInput.value='true';
		document.forms[MSOWebPartPageFormName].appendChild(newInput);
		if(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges !=null)
		{
			document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value="";
		}
		MSOMode_SetMode(false);
	}
}
function MSOWebPartPage_RestorePartDefaults(webPartID)
{
	if(confirm(MSOStrings.ResetPartPersonalizationDialogText))
	{
		var newInput=document.createElement('INPUT');
		//@cc_on
		//@if (@_jscript_version >=5)
		//@     try
		//@else
		//@end
		{
			newInput.type='hidden';
		}
		//@cc_on
		//@if (@_jscript_version >=5)
		//@     catch(e){newInput.style.display='none';}
		//@else
		//@end
		newInput.name='MSO_RestoreSettings';
		newInput.value=webPartID;
		document.forms[MSOWebPartPageFormName].appendChild(newInput);
		MSOMode_SetMode(false);
	}
}
function MSOWebPartPage_MenuDoPostBack(eventTarget, eventArgument)
{
	var theform=document.forms[MSOWebPartPageFormName];
	var eventTargetField=theform.__EVENTTARGET;
	var eventArgumentField=theform.__EVENTARGUMENT;
	if(eventTargetField==null)
	{
		eventTargetField=document.createElement('INPUT');
		eventTargetField.style.display='none';
		eventTargetField.name='__EVENTTARGET';
		document.forms[MSOWebPartPageFormName].appendChild(eventTargetField);
	}
	if(eventArgumentField==null)
	{
		eventArgumentField=document.createElement('INPUT');
		eventArgumentField.style.display='none';
		eventArgumentField.name='__EVENTARGUMENT';
		document.forms[MSOWebPartPageFormName].appendChild(eventArgumentField);
	}
	__doPostBack(eventTarget, eventArgument);
}
function MSOWebPartPage_SignIn()
{
	var newInput=document.createElement('INPUT');
	//@cc_on
	//@if (@_jscript_version >=5)
	//@     try
	//@else
	//@end
	{
		newInput.type='hidden';
	}
	//@cc_on
	//@if (@_jscript_version >=5)
	//@     catch(e){newInput.style.display='none';}
	//@else
	//@end
	newInput.name='MSOWebPartPage_AnonymousAccessLogIn';
	newInput.value="1";
	document.forms[MSOWebPartPageFormName].appendChild(newInput);
	__doPostBack(MSOWebPartPageFormName,'');
}
function MSOWebPartPage_SetWindowLocation(newLocation)
{
	var newLocationLowerCase=newLocation.toLowerCase();
	if(newLocationLowerCase.indexOf('javascript:')==0 || newLocationLowerCase.indexOf('vbscript:')==0)
	{
		MSOWebPartPage_hideNextBeforeUnload=true;
	}
	window.location=newLocation;
}
function MSOWebPartPage_SetNewWindowLocation(helpUrl, helpMode)
{
	if (helpMode==0 || helpMode==1)
	{
		if (helpMode==0)
		{
			var dialogInfo="edge: Sunken; center: yes; help: no; resizable: yes; status: no";
			window.commonShowModalDialog(helpUrl, dialogInfo);
		}
		else
		{
			window.open(helpUrl, null, "scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no");
		}
	}
	else if (helpMode==2)
	{
		window.location=helpUrl;
	}
}
function MSOTlPn_onToolPaneCloseClick()
{
	var DisplayModeBrowse='Browse';
	var PostbackSourceSettingsHide='49';
	MSOTlPn_ShowToolPane2Wrapper(DisplayModeBrowse, PostbackSourceSettingsHide);
}
function MSOPGrid_InvokeFPBuilder(type,arguments,editorCtrl)
{
	editorCtrl.value=window.external.InvokeBuilder(type,arguments,editorCtrl.id);
	editorCtrl.focus();
}
function MSOMenu_KeyboardClick(widget)
{
	for(var index=1; index < arguments.length; index++)
	{
		if(event.keyCode==arguments[index])
		{
			widget.click();
			event.returnValue=false;
			return;
		}
	}
}
function MSOTlPn_ToggleDisplay(strID,strImgName,strAnchorName,strAltExpandText,strAltCollapseText, strImageAnchorName)
{
	var fieldID=strID+'_STATEFIELD';
	var stateFieldValue;
	var group=document.getElementById(strID);
	var image=document.getElementById(strImgName);
	var anchor=document.getElementById(strAnchorName);
	var imgAnchor=document.getElementById(strImageAnchorName);
	if( group.style.display=='none' )
	{
		group.style.display='';
		image.src='/_layouts/images/TPMin2.gif';
		image.alt=strAltCollapseText;
		imgAnchor.title=strAltCollapseText;
		anchor.title=strAltCollapseText;
		stateFieldValue="1";
	}
	else
	{
		group.style.display='none';
		image.src='/_layouts/images/TPMax2.gif';
		image.alt=strAltExpandText;
		imgAnchor.title=strAltExpandText;
		anchor.title=strAltExpandText;
		stateFieldValue="0";
	}
	var field=document.getElementById(fieldID);
	if(field !=null)
	{
		field.value=stateFieldValue;
	}
}
function MSOTlPn_onToolPaneMaxClick()
{
	var mod=1;
	var minMaxIcon=document.all['MSOTlPn_minMaxIcon'];
	var newSrc=minMaxIcon.src.substring(0, minMaxIcon.src.lastIndexOf('/')+1);
	if (document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value=="False")
	{
		document.all['MSOTlPn_Tbl'].style.width=(parseInt(document.all['MSOTlPn_Tbl'].offsetWidth)+MSOChangeInToolPaneWidth).toString()+"px";
		newSrc+=((document.dir=="rtl") ? "tpmax.gif" : "tpmin.gif");
		minMaxIcon.title=MSOStrings.ToolPaneShrinkToolTip;
		minMaxIcon.alt=MSOStrings.ToolPaneShrinkToolTip;
		minMaxIcon.parentElement.title=MSOStrings.ToolPaneShrinkToolTip;
		document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value="True";
	}
	else
	{
		document.all['MSOTlPn_Tbl'].style.width="225px";
		newSrc+=((document.dir=="rtl") ? "tpmin.gif" : "tpmax.gif");
		minMaxIcon.title=MSOStrings.ToolPaneWidenToolTip;
		minMaxIcon.alt=MSOStrings.ToolPaneWidenToolTip;
		minMaxIcon.parentElement.title=MSOStrings.ToolPaneWidenToolTip;
		mod=-1;
		document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value="False";
	}
	minMaxIcon.src=newSrc;
	var x=document.all['MSOTlPn_Tbl'];
	for(var i=0; i < x.all.length; i++)
	{
//@cc_on
//@if (@_jscript_version >=5)
//@     try
//@else
//@end
		{
			if (x.all(i).getAttribute('ms-TlPnWiden')=="true")
			{
			   x.all(i).style.pixelWidth+=mod*MSOChangeInToolPaneWidth;
			}
		}
//@cc_on
//@if (@_jscript_version >=5)
//@     catch (e)
//@else
//@end
		{
		}
	}
}
function MSOTlPn_WindowResize()
{
	var objToolPane=document.all['MSOTlPn_MainTD'];
	if (objToolPane==null || objToolPane.offsetWidth==0) return;
	var widthToolPane=objToolPane.offsetWidth;
	var docFrame=(document.body.offsetWidth - document.body.clientWidth);
	var spDiv=document.all['MSOTlPn_WebPartPageDiv'];
	if ((spDiv.offsetWidth+objToolPane.offsetWidth)==document.body.clientWidth)
	{
		return;
	}
	var widthAncestors=0;
	var next=spDiv.offsetParent;
	var elementWidth=0;
	while (next !=null)
	{
		if (document.dir !="rtl")
		{
			elementWidth=next.offsetLeft+(next.offsetWidth - (next.clientLeft+next.clientWidth));
			if (next.offsetParent !=null)
			{
				elementWidth+=next.offsetParent.clientLeft;
			}
		}
		else
		{
			elementWidth=(next.offsetParent !=null) ? (next.offsetParent.offsetWidth - (next.offsetLeft+next.offsetWidth)) : 0;
		}
		widthAncestors+=elementWidth;
		next=next.offsetParent;
	}
	widthAncestors -=docFrame;
	var widthCenter=document.body.clientWidth - (widthAncestors+widthToolPane);
	if (widthCenter < 250)
		widthCenter=250;
	document.all['MSO_tblPageBody'].style.pixelWidth=widthCenter+widthToolPane;
	spDiv.style.pixelWidth=widthCenter;
	if (window.event.type=="load" && document.all.MSOTlPn_TlPnCaptionSpan!=null)
		document.all.MSOTlPn_TlPnCaptionSpan.scrollIntoView(false);
}
function MSOTlPn_CheckUrl()
{
	var toolPaneViewExpression=/[& | \?]ToolPaneView=[-0-9A-Z]*/ig;
	var displayModeExpression=/[& | \?]DisplayMode=[a-zA-Z]*/ig;
	var formAction=document.forms[MSOWebPartPageFormName].action;
	var newUrl;
	newUrl=MSOMode_RemoveMode(document.forms[MSOWebPartPageFormName].action, toolPaneViewExpression);
	newUrl=MSOMode_RemoveMode(document.forms[MSOWebPartPageFormName].action, displayModeExpression);
	document.forms[MSOWebPartPageFormName].action=newUrl;
}
function MSOTlPn_Resize(obj)
{
	if (MSOTlPn_prevWidth !=obj.clientWidth)
	{
		MSOTlPn_prevWidth=obj.clientWidth;
		MSOTlPn_WindowResize();
	}
	if (MSOTlPn_prevHeight !=document.body.clientHeight)
	{
		MSOTlPn_prevHeight=document.body.clientHeight;
		var spDiv=document.all['MSOTlPn_WebPartPageDiv'];
		spDiv.style.height="100%";
		spDiv.style.height=spDiv.offsetHeight;
	}
}
function MSOWebPartPage_SetupFixedWidthWebParts()
{
	var fixedWidthTitles=document.all['MSOFixedWidthTitle'];
	if(fixedWidthTitles !=null)
	{
		if(fixedWidthTitles.length > 0)
		{
			for(var elementIndex=0; elementIndex < fixedWidthTitles.length; elementIndex++)
			{
				fixedWidthTitles[elementIndex].style.width=MSOWebPartPage_AllocateSpaceForFirstTD(fixedWidthTitles[elementIndex]);
			}
		}
		else
		{
			fixedWidthTitles.style.width=MSOWebPartPage_AllocateSpaceForFirstTD(fixedWidthTitles);
		}
	}
}
function MSOWebPartPage_AllocateSpaceForFirstTD(titleDiv)
{
	var tempElement=document.createElement("DIV");
	tempElement.style.width=titleDiv.fixedWidth;
	document.body.appendChild(tempElement);
	var pixelSize=tempElement.offsetWidth;
	document.body.removeChild(tempElement);
	var tempTable=MSOLayout_GetParentTable(titleDiv).cloneNode(true);
	if(tempTable !=0)
	{
		document.body.appendChild(tempTable);
		var tempTableRow=tempTable.rows(0);
		for(var index=1; index < tempTableRow.cells.length; index++)
		{
			pixelSize -=tempTableRow.cells(index).offsetWidth;
		}
		document.body.removeChild(tempTable);
	}
	return (pixelSize < 1) ? 1 : pixelSize;
}
function MSOWebPartPage_FindControlName(name)
{
   var labelcollection=document.all.tags("label");
   if (labelcollection !=null)
   {
	   for (i=0; i < labelcollection.length; i++)
	   {
			var label=labelcollection[i];
			if (label.innerText==name)
			{
				if (label.htmlFor.indexOf("_EDITOR") !=-1)
				{
					return(label.htmlFor);
				}
			}
	   }
	}
	return null;
}
function MSOTlPn_ListViewChange(strWarningText)
{
	if (MSOTlPn_shownViewChangeWarning)
		return;
	alert(strWarningText);
	MSOTlPn_shownViewChangeWarning=true;
}
function MSOTlPn_CustomWindowResize()
{
	var objToolPane=document.all['MSOTlPn_Tbl'];
	if (objToolPane==null || objToolPane.offsetWidth==0) return;
	objToolPane.style.pixelWidth=document.body.clientWidth;
}
function MSOTlPn_ShowListFilter()
{
	if (document.all['WebPartListFilter'].style.display=='none')
	{
		document.all['WebPartListFilter'].style.display='block';
		document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value="true";
	}
	else
	{
		document.all['WebPartListFilter'].style.display='none';
		document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value="false";
	}
}
function MSOGallery_GetCookie(name)
{
	var prefix=name+"=";
	var cookieStartIndex=document.cookie.indexOf(prefix);
	if (cookieStartIndex==-1)
	{
		return null;
	}
	var cookieEndIndex=document.cookie.indexOf(";", cookieStartIndex+prefix.length);
	if (cookieEndIndex==-1)
	{
		cookieEndIndex=document.cookie.length;
	}
	return unescape(document.cookie.substring(cookieStartIndex+prefix.length, cookieEndIndex));
}
function MSOTlPn_ShowAllUsersToolPane(displayMode, source, storageKey)
{
	MSOLayout_CheckAndSaveChanges();
	document.forms[MSOWebPartPageFormName].action=MSOMode_GetNewUrl(true);
	MSOTlPn_ShowToolPane2Wrapper(displayMode, source, storageKey);
}
function MSOLayout_MakeInvisibleIfEmpty()
{
	var allElements=document.getElementsByName("_invisibleIfEmpty");
	var agt=navigator.userAgent.toLowerCase();
	var isNav=((agt.indexOf('mozilla')!=-1)&&((agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible')==-1)));
	var isIE=(agt.indexOf("msie")!=-1);
	for (var curElement=0; curElement < allElements.length; curElement++)
	{
		if ((isIE && allElements[curElement].childNodes.length==0)
			|| (isNav && allElements[curElement].childNodes.length <=1))
		{
			allElements[curElement].style.display="none";
		}
	}
}
function MSOLayout_GetParentRow(tableCell)
{
	var parentRow=tableCell.parentElement;
	while(parentRow.tagName !="TR" && parentRow.tagName !="BODY") parentRow=parentRow.parentElement;
	if(parentRow.tagName !="TR")
	{
		return null;
	}
	else
	{
		return parentRow;
	}
}
function MSOLayout_GetParentTable(TableCell)
{
	for (var currentObject=TableCell; currentObject.tagName !='TABLE'; currentObject=currentObject.parentElement)
	{
		if(currentObject==document.body) return 0;
	}
	return currentObject;
}

