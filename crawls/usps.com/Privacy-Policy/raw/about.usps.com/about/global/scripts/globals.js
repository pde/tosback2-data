/**
 * @fileoverview This file initializes all Singleton objects, such that they appear in the USPS namespace as well as to encapsulate the initialization functionality.
 * @author <a href="mailto:aziz.syed@akqa.com">Aziz Syed</a>
 * @requires usps.utils.Singleton
 */

/** 
 * @namespace 
 */

USPS.GlobalElements = {

	/**
	 * @description Corresponds to a Singleton instance of the usps.widget.CustomScroller module
	 * @type usps.utils.Singleton
	 */
	CustomScroller : null,

	/**
	 * @function
	 * @description Initialize the Singleton instances.  For CustomScroller & Tooltip objects, it queries the DOM to see if the instances need to be pre-initialized.  This method is called from usps.js.
	 */
	initialize : function(){
		dojo.require("usps.utils.Singleton");
		this.CustomScroller = new usps.utils.Singleton("usps.widget.CustomScroller");
		
		/**
		 * Query the dom to see if any elements with the specified class exist.  If so, initialize the object such that the object's constructor is called.
		 */
		if (dojo.query('.scrollContainer').length>0){
			this.CustomScroller.getObject();
		}
	}
}

/**
 * @type usps.widget.customScroller
 * @function
 */
USPS.CustomScroller = function(){
	return USPS.GlobalElements.CustomScroller.getObject();
};


dojo.addOnLoad(function(){
	USPS.GlobalElements.initialize();
});

/**
 * @fileoverview
 * @author <a href="mailto:aziz.syed@akqa.com">Aziz Syed</a>
 */
dojo.provide("usps.utils.Singleton");

/**
 * @name USPS.utils.Singleton
 * @namespace
 */
dojo.declare("usps.utils.Singleton", null, {
	/**
	 * @name USPS.utils.Singleton.isInitialized
	 * @description An attribute used to determine if initialization is needed
	 * @private
	 * @type Boolean
	 */
	_isInitialized : false,
	/**
	 * @name USPS.utils.Singleton.element
	 * @description Corresponds to an instance created by the specified module
	 * @private
	 * @type Object
	 */
	_element : null,
	/**
	 * @name USPS.utils.Singleton.module
	 * @description A string representation of the module class name to be instantiated
	 * @private
	 * @type String
	 */
	_module : null,

	/**
	 * @name USPS.utils.Singleton.constructor
	 * @function
	 * @description Constructor
	 * @param {String} fn The string name of the module to be built
	 */
	constructor : function(fn){
		this._module = fn;
	},
	/**
	 * @name USPS.utils.Singleton.initialize
	 * @function
	 * @description This function initializes the module, if needed. Otherwise, if instantiation has occurred, do nothing and exit the method.
	 * @private
	 */
	_initialize : function(){
		if (this._isInitialized){return;}
		eval("dojo.require(\""+this._module+"\");");
		eval("this._element = new "+this._module+"();");
		this._isInitialized = true;
	},
	/**
	 * @name USPS.utils.Singleton.getObject
	 * @function
	 * @description Return an instance of the module. If the instance is created, return it. This prevents numerous instances to be built.
	 * @type Object
	 */
	getObject : function(){
		if (!this._isInitialized){
			this._initialize();
		}
		return this._element;
	}
});