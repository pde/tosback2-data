/*
 * A string-associative array that preserves the order in which items are added and supports item deletion.  It also
 * can convert to and from various name-value pair formats.
 *
 * todo: enable use of StringBuffer if this gets used for large data sets.
 */
function Properties()
{
	var self = this;
	var itsKeys;
	var itsMap;


	function skip(
		inString,
		inCharacters,
		inIndex,
		inNot)
	{
		if (inNot == undefined)
			inNot = false;
		if (inIndex == undefined)
			inIndex = 0;
		for ( ; inIndex < inString.length; inIndex++)
		{
			if (inCharacters.indexOf(inString.charAt(inIndex)) >= 0)
			{
				if (inNot)
					return (inIndex);
			}
			else
			{
				if (!inNot)
					return (inIndex);
			}
		}

		return (inIndex);
	}


	this.clear = function()
	{
		itsMap = new Object();
		itsKeys = new Array();
	};


	this.parseJavaPropertiesString = function(inString)
	{
		var theLines;
		var theLineIndex;
		var theLine;
		var theStart;
		var theEnd;
		var theName;
		var theResult;

		self.clear();
		if (inString === undefined || inString === null || inString == "")
			return (self);

		theLines = inString.replace(/\r/,"").split("\n");

		for (theLineIndex = 0; theLineIndex < theLines.length; theLineIndex++)
		{
			theLine = theLines[theLineIndex];
			if (theLine.length == 0 || theLine.charAt(0) == "#")
				continue;
			theStart = skip(theLine," \t");
			theEnd = skip(theLine,"= \t",theStart,true);
			theName = theLine.substring(theStart,theEnd);
			theStart = skip(theLine,"= \t",theEnd + 1);
			self.setProperty(theName,theLine.substr(theStart));
		}

		return (self);
	};


	this.asJavaPropertiesString = function()
	{
		var i;
		var theResult;
		var theValue;

//		theResult = new StringBuffer();
		theResult = "";
		for (i in itsMap)
		{
//			theResult.append(i + "\t" + itsMap[i] + "\n");
			theValue = itsMap[i];
			if (theValue !== undefined)
				theResult = theResult + i + "\t" + theValue + "\n";
		}

//		return (theResult.toString());
		return (theResult);
	};


	this.parseQueryString = function(inString)
	{
		var theProperties;
		var i;
		var theEqualsOffset;

		self.clear();
		if (inString === undefined || inString === null || inString == "")
			return (self);

		theProperties = inString.split("&");

		for (i = 0; i < theProperties.length; i++)
		{
			if (theProperties[i] == "")
				continue;
			theEqualsOffset = theProperties[i].indexOf("=");
			if (theEqualsOffset < 0)
				self.addProperty(decodeURIComponent(theProperties[i]),"");
			else
			{
				self.addProperty(
					decodeURIComponent(theProperties[i].substr(0,theEqualsOffset)),
					decodeURIComponent(theProperties[i].substr(theEqualsOffset + 1)));
			}
		}

		return (self);
	};


	this.asQueryString = function()
	{
		var i;
		var theResult;
		var theValue;
		var theEncodedName;

//		theResult = new StringBuffer();
		theResult = "";

		for (i in itsMap)
		{
			theEncodedName = encodeURIComponent(i);
			theValue = itsMap[i];

			if (theValue instanceof Array)
			{
				var j;

				for (j = 0; j < theValue.length; j++)
				{
//					if (theResult.getFragments().length > 0)
					if (theResult != "")
//						theResult.append("&");
						theResult = theResult + "&";
//					theResult.append(theEncodedName + "=" + encodeURIComponent(theValue[j]));
					theResult = theResult + theEncodedName + "=" + encodeURIComponent(theValue[j]);
				}
			}
			else if (theValue !== undefined)
			{
//				if (theResult.getFragments().length > 0)
				if (theResult != "")
//					theResult.append("&");
					theResult = theResult + "&";
//				theResult.append(theEncodedName + "=" + encodeURIComponent(theValue));
				theResult = theResult + theEncodedName + "=" + encodeURIComponent(theValue);
			}
		}

//		return (theResult.toString());
		return (theResult);
	};


	this.parseObject = function(inObject)
	{
		var theName;

		self.clear();
		for (theName in inObject)
			self.setProperty(theName,inObject[theName]);
		return (self);
	}


	this.asObject = function()
	{
		var theResult;
		var theKeys;
		var i;

		theResult = new Object();
		theKeys = self.getKeys();
		for (i = 0; i < theKeys.length; i++)
			theResult[theKeys[i]] = self.getProperty(theKeys[i]);
		return (theResult);
	}


	this.getProperty = function(inName)
	{
		return (itsMap[inName]);
	};


	this.setProperty = function(inName,inValue)
	{
		if (inValue === undefined)
		{
			self.removeProperty(inName);
			return (self);
		}

		if (itsMap[inName] === undefined)
			itsKeys[itsKeys.length] = inName;
		itsMap[inName] = inValue;

		return (self);
	};


	this.addProperty = function(inName,inValue)
	{
		var theValue;

		theValue = self.getProperty(inName);
		if (theValue === undefined)
			self.setProperty(inName,inValue);
		else if (theValue instanceof Array)
			theValue[theValue.length] = inValue;
		else
			self.setProperty(inName,[theValue,inValue]);

		return (self);
	};


	this.assignFrom = function(inProperties)
	{
		self.clear();
		self.setProperties(inProperties);
	};


	this.clone = function()
	{
		var theResult;

		theResult = new Properties();
		theResult.assignFrom(self);

		return (theResult);
	};


	this.setProperties = function(inProperties)
	{
		var theNames;
		var i;

		theNames = inProperties.getKeys();
		for (i = 0; i < theNames.length; i++)
			self.setProperty(theNames[i],inProperties.getProperty(theNames[i]));
		return (self);
	};


	this.addProperties = function(inProperties)
	{
		var theNames;
		var i;

		theNames = inProperties.getKeys();
		for (i = 0; i < theNames.length; i++)
			self.addProperty(theNames[i],inProperties.getProperty(theNames[i]));
		return (self);
	};


	this.removeProperty = function(inName)
	{
		var theIndex;

		if (itsMap[inName] !== undefined)
		{
			itsMap[inName] = undefined;
			if (Array.prototype.indexOf)
				theIndex = itsKeys.indexOf(inName);
			else
			{
				// This should use Arrays.indexOf or augment the prototype,
				// but the dependencies already hand-coded into pages deployed
				// makes that difficult.
				for (theIndex = 0; theIndex < itsKeys.length; theIndex++)
				{
					if (itsKeys[theIndex] == inName)
						break;
				}
			}
			itsKeys.splice(theIndex,1);
		}
		return (self);
	};


	this.removeProperties = function(inProperties)
	{
		if (!inProperties || inProperties.getKeys === undefined)
			return (self);
		return (self.removeKeys(inProperties.getKeys()));
	};


	this.removeKeys = function(inKeys)
	{
		var i;

		if (inKeys && inKeys.length !== undefined)
		{
			for (i = 0; i < inKeys.length; i++)
				self.removeProperty(inKeys[i]);
		}

		return (self);
	};


	this.getMap = function()
	{
		return (itsMap);
	};


	this.getKeys = function()
	{
		return (itsKeys.slice(0));
	};


	this.getValues = function()
	{
		var i;
		var theResult;

		theResult = new Array();
		theResult.length = itsKeys.length;

		for (i = 0; i < itsKeys.length; i++)
			theResult[i] = self.getProperty(itsKeys[i]);

		return (theResult);
	};


	this.containsKey = function(inName)
	{
		if (!inName)
			return (false);
		return (itsMap[inName] !== undefined ? true : false);
	};


	this.containsValue = function(inValue)
	{
		var theName;
		var theValue;

		for (theName in itsMap)
		{
			theValue = itsMap[theName];
			if (theValue !== undefined && theValue == inValue)
				return (true);
		}

		return (false);
	};


	this.remap = function(inMappings)
	{
		var i;
		var theMapping;
		var theValue;

		for (i = 0; i < inMappings.length; i++)
		{
			theMapping = inMappings[i];
			theValue = self.getProperty(theMapping[0]);
			if (theValue !== undefined)
			{
				self.removeProperty(theMapping[0]);
				self.setProperty(theMapping[1],theValue);
			}
		}

		return (self);
	};


	this.getSize = function()
	{
		return (itsKeys.length);
	};


	this.toString = function()
	{
		var theResult;
		var theName;
		var theValue;

		theResult = "{";
		for (theName in itsMap)
		{
			theValue = itsMap[theName];
			if (theValue !== undefined)
				theResult = theResult + " " + theName + "=" + theValue.toString()
		}
		theResult = theResult + " }";

		return (theResult);
	};


	this.clear();
}


Properties.removeIntersection = function(inProperties1,inProperties2)
{
	var theTemp;

	theTemp = inProperties2.clone();
	inProperties2.removeProperties(inProperties1);
	inProperties1.removeProperties(theTemp);
};


function QueryStringProperties(inQueryString)
{
	return ((new Properties()).parseQueryString(inQueryString));
}