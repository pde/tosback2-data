/*****************************
 * BPS TAG FRAMEWORK UTILS
 *****************************
   Misc Utilities:
 *****************************
 *  isEmpty
 *  isSecurePage
 *  getHttpProtocol
 *  getNumberValue
 *	isArray
 *	hasURLParameter
 *	errorHandler
 *	clearTextElements
 *	clearTextElementsByName
 *	clearTextElementById
 *****************************/
function isEmpty(value)
{
	if(value && value != null && value.length && value.length > 0)
		return false;
	else
		return true;
}

function isSecurePage()
{
	if("https:" == document.location.protocol)
		return true;
	else
		return false;
}

function getHttpProtocol()
{
	if(isSecurePage())
		return "https";
	else
		return "http";
}

function getNumberValue(value)
{
	var number = Number(value);

	if(number.toString() == "NaN")
		return 0;
	else
		return number;
}

function isArray(arr)
{
	var isArray = false;

	try
	{
		if(arr instanceof Array || arr[0])
			isArray = true;
	}
	catch(notArray)
	{}

	return isArray;
}

function hasURLParameter(parameter)
{
	try
	{
		var checkURLParameters = window.location.href.toLowerCase();
		parameter = parameter.toLowerCase();

		return (checkURLParameters.indexOf(("&"+parameter)) != -1 || window.location.href.indexOf(("?"+parameter)) != -1);
	}
	catch(ignore)
	{}

	return false;
}

function getURLParameter(parameter)
{
	try
	{
		var xURLParameters = window.location.href.toLowerCase();
		parameter = parameter.toLowerCase();

		var start = xURLParameters.indexOf((parameter+"="));

		if(start != -1)
		{
			start += (parameter.length + 1);
			var end = xURLParameters.indexOf("&", start);

			if(end == -1)
				return xURLParameters.substring(start, xURLParameters.length);
			else
				return xURLParameters.substring(start, end);
		}
	}
	catch(ignore)
	{}

	return null;
}

function errorHandler(jsFile, method, err)
{
	if(hasURLParameter("showerr=true"))
	{
		if(isEmpty(method))
			method = "Error Message";

		if(!isEmpty(jsFile))
			method = ("\"" + jsFile + "\" " + method);

		if(err)
			alert(method + ":\n[" + err.message + "]");
	}

	if(hasURLParameter("passerr=true"))
		throw err;
}

function clearTextElements(clearElements)
{
	if(isArray(clearElements))
	{
		for(var i = 0; i < clearElements.length; i++)
		{
			if(clearElements[i] && clearElements[i].innerHTML)
			{
				clearElements[i].innerHTML = "";
				clearElements[i].style.display = "none";

//				if(clearElements[i].parent)
//					clearElements[i].parent.style.display = "none";
			}
		}
	}
}

function clearTextElementsByName(clearElementName)
{
	clearTextElements(document.getElementsByName(clearElementName));
}

function clearTextElementById(clearElementId)
{
	clearTextElements([document.getElementById(clearElementId)]);
}

function ltrim(value)
{
	if(value)
		return value.replace(/^\s\s*/, '');
	else
		return null;
}

function rtrim(value)
{
	if(value)
		return value.replace(/[^\S]+$/, '');
	else
		return null;
}

function trim(value)
{
	return rtrim(ltrim(value));
}

/*****************************
 * BPS TAG FRAMEWORK [BPSTF]
 *****************************
   Core Framework:
 *****************************
 *	Tag
 *	TagEvent
 *	TagProducts
 *  PageTypes
 *  FinderTypes
 *  PaymentTypes
 *  ShipTypes
 *****************************/

var tags_filename = "bps_tags.js";
var DIV = " : ";
var SEP = ";";

//================
// TAGGING OBJECT
//================
Tag = function()
{
	this.dept = null;
	this.deptId = null;
	this.subdept = null;
	this.subdeptId = null;
	this.category = null;
	this.categoryId = null;
	this.category = null;
	this.subcategory = null;
	this.includePageName = null;
	this.replaceDisplayType = null;
	this.types = new Array();
	this.refinementTypes = new Array();
	this.refinementValues = new Array();
	this.guid = null;
	this.user = null;
	this.session = null;
	this.parentTextIds = new Array();
	this.childSKUs = new Array();
	this.search = null;
	this.originSearch = null;
	this.results = 0;
	this.pageNumber = null;
	this.article = null;
	this.store = null;
	this.application = null;
	this.order = null;
	this.orderSubtotal = null;
	this.promotion = "4601";
	this.finder = null;
	this.payMethods = new Array();
	this.payAmounts = new Array();
	this.shipType = null;
	this.shipAmount = null;
	this.tax = null;
	this.rating = null;
	this.catalog = null;
	this.outOf = new Array();
	this.state = null;
	this.zipcode = null;
	this.country = null;
};

Tag.prototype =
{
	isType: function(pType)
	{
		pType = trim(pType);

		for(var i = 0; i < this.types.length; i++)
		{
			if((this.types[i] == pType))
				return true;
		}

		if(!isEmpty(this.category) && (PageTypes.CATEGORY == pType))
			return true;
		else if(!isEmpty(this.subdept) && (PageTypes.SUBDEPT == pType))
			return true;
		else if(!isEmpty(this.dept) && (PageTypes.DEPT == pType))
			return true;

		return false;
	},

	isAnyTypes: function(pTypes)
	{
		if(isArray(pTypes))
		{
			for(var i = 0; i < pTypes.length; i++)
			{
				if(this.isType(pTypes[i]))
					return true;
			}

			return false;
		}
		else
			return this.isType(pTypes);
	},

	appendType: function(pType)
	{
		pType = trim(pType);

		if(isEmpty(pType))
			this.types.length = 0;
		else if(!this.isType(pType))
			this.types[this.types.length] = pType;
	},

	insertType: function(pType, position)
	{
		pType = trim(pType);

		for(var i = this.types.length; i > 0; i--)
		{
			this.types[i] = this.types[(i - 1)];
		}

		this.types[0] = pType;
	},

	replaceType: function(pType, position)
	{
		pType = trim(pType);

		if(position <= this.types.length)
			this.types[position] = pType;
	},

	getTypesAsString: function(separator)
	{
		var typesAsStr = "";

		for(var i = 0; i < this.types.length; i++)
		{
			if(i > 0)
				typesAsStr += separator;

			typesAsStr += this.types[i];
		}

		return typesAsStr;
	},

	appendPageName: function(pName)
	{
		pName = trim(pName);

		if(isEmpty(pName))
			this.includePageName = null;
		else if(isEmpty(this.includePageName))
			this.includePageName = pName;
		else
			this.includePageName += (DIV + pName);
	},

	appendPayment: function(pMethod, pAmount)
	{
		if(isEmpty(pMethod) || isEmpty(pAmount))
		{
			this.payMethods.length = 0;
			this.payAmounts.length = 0;
		}
		else
		{
			this.payMethods[this.payMethods.length] = pMethod;
			this.payAmounts[this.payAmounts.length] = pAmount;
		}
	},

	appendParentTextId: function(parentId)
	{
		if(isEmpty(parentId))
			this.parentTextIds.length = 0;
		else
			this.parentTextIds[this.parentTextIds.length] = parentId;
	},

	replaceWithCustomDisplayTypes: function(pTypes)
	{
		if(isArray(pTypes) && pTypes.length > 0)
		{
			this.replaceDisplayType = pTypes[0];

			for(var i = 1; i < pTypes.length; i++)
			{
				this.replaceDisplayType += (DIV + pTypes[i]);
			}
		}
		else
			this.replaceDisplayType = null;
	},

	hasAutoCorrectedSearch: function()
	{
		if(this.isType(PageTypes.SEARCH) && this.search != this.originSearch)
			return true;
		else
			return false;
	},

	setIds: function()
	{
		try
		{
			this.user = bpsuid;
			this.guid = getId('BPSGUID');
			this.session = getId('JSESSIONID');
		}
		catch(ignore)
		{}
	}
};

//=============================
// TAGGING IMPLENTATION OBJECT
//=============================
TagImpl = function()
{
	var Tag = null;
};

TagImpl.enableTagByParameter = function(parameter, defaultEnabled)
{
	try
	{
		if(hasURLParameter((parameter + "=true")))
			return true;
		else if(hasURLParameter((parameter + "=false")))
			return false;
	}
	catch(ignore)
	{}

	return defaultEnabled;
};

TagImpl.prototype =
{
	setTag: function(tag)
	{
		this.Tag = tag;
	},

	/* Override and implement this method:
	 *
	 * Example:
	 *
	 *	// Place in the implementation section of this JS file.
	 *	var MyTag = function(){};
	 * 	MyTag.prototype = new TagImpl();
	 * 	MyTag.base = TagImpl.prototype;
	 *
	 *	// Add additional functions to implementation.
	 * 	MyTag.prototype.initialize() = function()
	 * 	{
	 * 		// Implementation code goes here
	 * 	};
	 *
	 *	// Override function 'execute' to finalize tagging call.
	 * 	MyTag.prototype.execute() = function()
	 * 	{
	 * 		// Implementation goes here
	 * 	};
	 *
	 *	// Place within the HTML to instantiate implemented TagImpl object.
	 *	var myTag = new MyTag();
	 * 	myTag.setTag(tag);
	 * 	myTag.execute();
	 */
	execute: function()
	{}
};

//=========================
// TAGGING PRODUCTS OBJECT
//=========================
TagProducts = function()
{
	var list = new Array();
	var currentPosition = -1;
	var productId = null;
	var quantity = 0;
	var price = 0.00;
};

TagProducts.prototype =
{
	setProductProperties: function(position)
	{
		try
		{
			if(isArray(this.list) && !isEmpty(this.list) && position != this.currentPosition && this.list.length > position)
			{
				var productPosList = this.list[position].split(",");
				this.currentPosition = position;

				if(productPosList.length > 0)
					this.productId = productPosList[0];

				if(productPosList.length > 1)
					this.quantity = getNumberValue(productPosList[1]);

				if(productPosList.length > 2)
					this.price = getNumberValue(productPosList[2]);
			}
		}
		catch(error)
		{
			errorHandler(js_filename, "TagProducts.setProductProperties()", error);
		}
	},

	init: function()
	{
		if(this.currentPosition == -1)
			setProductProperties(0);
	},

	getProductLineTotal: function()
	{
		this.init();
		return (this.quantity * this.price);
	},

	getProductSubTotal: function()
	{
		var previousPosition = this.currentPosition;
		var subtotal = 0.00;

		try
		{
			if(isArray(this.list) && !isEmpty(this.list))
			{
				for(var i = 0; i < this.list.length; i++)
				{
					this.setProductProperties(i);
					subtotal += this.getProductLineTotal();
				}
			}

			this.currentPosition = previousPosition;
		}
		catch(error)
		{
			errorHandler(js_filename, "TagProducts.getProductSubTotal()", error);
		}

		return subtotal;
	},

	getProductTotal: function(subtotal, tax, shipping)
	{
		if(subtotal != null)
			return (getNumberValue(subtotal) + getNumberValue(tax) + getNumberValue(shipping));
		else
			return (this.getProductSubTotal() + getNumberValue(tax) + getNumberValue(shipping));
	},

	getProductTotal: function(tax, shipping)
	{
		return this.getProductTotal(null, tax, shipping);
	}
};

//==========================
// TAGGING PAGE TYPE OBJECT
//==========================
PageTypes = function(){};
PageTypes.HOME = "Homepage";
PageTypes.DEPT = "Department";
PageTypes.SUBDEPT = "SubDepartment";
PageTypes.CATEGORY = "Category";
PageTypes.SEARCH = "Search Results";
PageTypes.PRODUCT = "Product Details";
PageTypes.ARTICLE = "Article";
PageTypes.OUTDOOR = "Outdoor Library";
PageTypes.LOGIN = "Sign In";
PageTypes.CHECKOUT = "Checkout";
PageTypes.CART = "Shopping Cart";
PageTypes.MCART = "Mini Cart";
PageTypes.ADDRESS = "Address/Billing";
PageTypes.SHIP = "Shipping";
PageTypes.PAY = "Payment";
//PageTypes.REVIEW = "Review";
PageTypes.COMPLETE = "Order Confirmation";
PageTypes.CLEARANCE = "Clearance";
PageTypes.GIFTCARDS = "Gift Cards";
PageTypes.STORE = "Store Locator";
PageTypes.CATALOG = "Catalog";
PageTypes.QORDER = "Quick Order";
PageTypes.CSERVICE = "Customer Service";
PageTypes.HELP = "Cust Help";
PageTypes.LINKS = "Useful Links";
PageTypes.CONTENT = "Content";
PageTypes.COMPANY = "Company Info";
PageTypes.LINKS = "Useful Links";
PageTypes.ERROR = "Error Page";
PageTypes.ACCOUNT = "My Account";

//============================
// TAGGING FINDER TYPE OBJECT
//============================
FinderTypes = function(){};
FinderTypes.BROWSE = "Browse";
FinderTypes.DEPT = "Browse - Dept Flyout";
FinderTypes.SUBDEPT = "Browse - SubDept Flyout";
FinderTypes.SEARCH = "Search";
FinderTypes.PROMO = "Promotions";
FinderTypes.CROSS = "Cross-sell";
FinderTypes.WISH = "Wish-list";
FinderTypes.TOP = "Top-sellers";
FinderTypes.EXTERNAL = "External Campaign";
FinderTypes.CATALOG = "Catalog Quick Order";
FinderTypes.ONLINE = "Online Catalog";
FinderTypes.CIRCULAR = "Online Circular";
FinderTypes.ARTICLE = "Articles";
FinderTypes.OUTDOOR = "Outdoor Answers";
FinderTypes.HOME = "HP: Top-sellers";
FinderTypes.ALSO = "Also Viewed";
FinderTypes.ULTIMATE = "Ultimately Purchased";
FinderTypes.CUSTOMER = "Customer Viewed";
FinderTypes.RELATED = "Related Products";
FinderTypes.FEATURED = "Featured Clearance";

//=============================
// TAGGING PAYMENT TYPE OBJECT
//=============================
PaymentTypes = function(){};
PaymentTypes.REWARDS = "Outdoor Rewards VISA";
PaymentTypes.VISA = "VISA";
PaymentTypes.MC = "MC";
PaymentTypes.AE = "AE";
PaymentTypes.DISC = "DISC";
PaymentTypes.GC = "Gift Card";
PaymentTypes.GC_REWARDS = "Outdoor Rewards VISA: Gift Card";
PaymentTypes.GC_VISA = "VISA: Gift Card";
PaymentTypes.GC_MC = "MC: Gift Card";
PaymentTypes.GC_AE = "AE: Gift Card";
PaymentTypes.GC_DISC = "DISC: Gift Card";

PaymentTypes.getPaymentType = function(payMethods)
{
	try
	{
		if(isArray(payMethods) && payMethods.length > 0)
		{
			var giftCard = false;
			var creditCard = null;

			for(var i = 0; i < payMethods.length; i++)
			{
				if(payMethods[i] == this.GC)
					giftCard = true;
				else
					creditCard = payMethods[i];
			}

			if(giftCard && !isEmpty(creditCard))
			{
				if(creditCard == this.REWARDS)
					return this.GC_REWARDS;
				else if(creditCard == this.VISA)
					return this.GC_VISA;
				else if(creditCard == this.MC)
					return this.GC_MC;
				else if(creditCard == this.AE)
					return this.GC_AE;
				else if(creditCard == this.DISC)
					return this.GC_DISC;
			}
			else if(giftCard)
				return this.GC;
			else
				return creditCard;
		}
	}
	catch(ignore)
	{}

	return null;
};

//==========================
// TAGGING SHIP TYPE OBJECT
//==========================
ShipTypes = function(){};
ShipTypes.US_STD = "US: Standard";
ShipTypes.US_3D = "US: 3-Day";
ShipTypes.US_2D = "US: 2-Day";
ShipTypes.US_1D = "US: 1-Day";
ShipTypes.CA_STD = "CA: Standard";
ShipTypes.CA_PRI = "CA: Priority";
ShipTypes.INTL = "INTL: Air Delivery";
