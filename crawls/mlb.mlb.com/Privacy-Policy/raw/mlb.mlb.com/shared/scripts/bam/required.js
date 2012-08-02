// Enables required pattern for module loading
(function($, bam, undef) {
	var registry = {},
		OBJECT = "object",
		FUNCTION = "function",
		STRING = "string",
		DASH = "-",
		MODULE_RX = new RegExp("^([a-z\\-\\._]+)(?:\\-([\\d\\.]+))?$", "i"),
		IS_NUMERIC = /^\-?(0|[1-9]\d{0,2}(,?\d{3})*)(\.\d+)?$/,
		ModuleError, RequireError,
		everythingAfterLastSlash = /\/([^\/]*)$/,
		REQUIRE_VARIABLE_REGEX = /^function([\s]+)?\(([\s]+)?([\w]+)/;


	/**
	 * Custom error types
	 */
	ModuleError = function(message, name, version, module) {
		this.message = message || "Default Module Error";
		this.name = name;
		this.version = version;
		this.module = module;
	};
	ModuleError.prototype = new Error();
	ModuleError.prototype.constructor = ModuleError;

	RequireError = function(message, timeout, modules) {
		this.message = message || "Default Require Error";
		this.timeout = timeout;
		this.modules = modules;
	};
	RequireError.prototype = new Error();
	RequireError.prototype.constructor = RequireError;
	/**
	 * Isolate - preserves original cached version of a module
	 * This prevents overrides of registered modules through context
	 */

	var isolate = (function() {
		function F() {}

		return function(obj) {
			if (typeof(obj) === FUNCTION) {
				return obj;
			} else if (typeof(obj) === OBJECT) {
				F.prototype = obj;
				return new F();
			}
		};
	})();


	/* Modules path - home path for all the modules */
	var moduleHome = "/shared/scripts/bam/",
		/*
		 * Bam modules manifest. Used by "requires" pattern.
		 * WARNING: Use caution when modifying manifest declarations, these changes affect module selection in your code
		 */
		manifest = {
			actionMessages: {
				atbat: 1.0
			},
			array: {
				atbat: 1.0
			},
			'class': {
				atbat: 0.1
			},
			cookies: {
				atbat: 1.0
			},
			cryptography: {
				atbat: 0.1
			},
			css: {
				atbat: 0.5
			},
			data: {
				atbat: 0.1
			},
			datetime: {
				atbat: 1.0
			},
			formBuilder: {
				atbat: 1.0
			},
			formValidation: {
				atbat: 1.0
			},
			filters: {
				atbat: 1.0
			},
			jpath: {
				atbat: 1.0
			},
			number: {
				atbat: 1.0
			},
			object: {
				atbat: 1.0
			},
			soap: {
				atbat: 1.0,
				ondeck: 2.0
			},
			storage: {
				atbat: 0.1
			},
			string: {
				atbat: 1.0
			},
			url: {
				atbat: 1.0
			},
			util: {
				atbat: 1.0
			},
			validation: {
				atbat: 1.0
			},
			xml: {
				atbat: 1.0,
				ondeck: 2.0
			}
		},
		/* Context - Class that encapsulates "requires" set */
		Context = function() {
			if (!(this instanceof Context)) {
				return new Context();
			}
			var that = this;
			this.config = {
				timeout: 600000,
				callback: $.noop,
				useArguments: false,
				pollInterval: 1
			};
			this.context = function ctx(lib){ 
				if (lib.indexOf('/') !== -1) {
					lib = everythingAfterLastSlash.exec(lib)[1];
				}
				if (lib.indexOf('-')) {
					lib = lib.split('-')[0];
				}
				if (ctx[lib]) {
					return ctx[lib];
				} else {
					throw new Error('Tried to require '+lib+', which is not in the dependency list!');
				}
			};
			this.deferred = $.Deferred();
		};

	/**
	 * Parses module and returns an object with name and version
	 * @param {String|Object} module Module path or mapping
	 * @returns {Object} Formatted module descriptor Ex: { name: module, version: 1.0, path: "./../script.js" }
	 */

	var parseModule = (function() {
		var cache = {};
		return function parseModule(module) {
			var version, pathVersion, moduleTokens, moduleName, modulePath, manifestEntry, out, onDeck = 'ondeck',
				jss = typeof(module) === STRING ? module : JSON.stringify(module);
			if (jss in cache) {
				return cache[jss];
			}

			if (typeof(module) === STRING) {
				moduleTokens = MODULE_RX.exec(module); //module.split(DASH);
				moduleName = moduleTokens[1];
				module = moduleName.split('.').slice(-1).toString();
				version = moduleTokens[2]; //only parseFloat guarantees NaN for "" value (IE7 bug)
				//If version is embedded in the module name (ex. module-1.0)
				if (version) {
					//If module is registered in the manifest
					if (moduleName in manifest) {
						manifestEntry = manifest[moduleName];
					}

					//Version is not specified (assuming that we want to use the latest version available w/in major version release)
				} else {
					//If module is registered in the manifest
					if (moduleName in manifest) {
						manifestEntry = manifest[moduleName];
						//We check if versions atbat and ondeck are a part of minor upgrade, else we pick atbat version and issue a warning
						version = ((onDeck in manifestEntry) && (manifestEntry.atbat === manifestEntry.ondeck)) ? manifestEntry.ondeck : manifestEntry.atbat;
					} else {
						throw new ModuleError("Unable to find module", moduleName, version, null);
					}
				}
				//If current version listed in manifest is greater than the version used
				if (manifestEntry) {
					if (manifestEntry.atbat + '' > version) {
						console.warn("The version of [" + module + "] used is deprecated. Current version is " + manifestEntry.atbat);
						bam.trackDeprecated({
							module: module,
							version: version,
							method: "*"
						});
						//Else, check if a possible upgrade version is available
					} else if ((onDeck in manifestEntry) && version < manifestEntry.ondeck + '') {
						console.warn("Updated version of [" + module + "] is available. Please try to update to version " + manifestEntry.ondeck);
					}
				}
				version = IS_NUMERIC.test(version) ? parseFloat(version) : version;
				pathVersion = typeof(version) !== STRING ? (version % 1 === 0) ? Number(version).toPrecision(2) : Number(version).toString() : version;
				modulePath = (moduleName.split('.').slice(0, -1).length ? moduleName.split('.') : [moduleName]).concat(pathVersion, module).join('/');
				out = {
					name: moduleName,
					version: version,
					path: moduleHome + modulePath + ".js"
				};
			} else if (typeof(module) === OBJECT) {
				//If you want to specify a custom module in custom location
				out = {};
				$.each(module, function(name, path) {
					out.name = name;
					out.version = 1;
					out.path = path;
					return false;
				});
			}
			//Cache the module
			cache[jss] = out;
			return out;
		};
	})();

	/**
	 * Require must load scripts that represent modules
	 * - Each module registers itself with the loader, thus confirming its presense
	 * - Module regsters itself under a certain name assignable by the module itself
	 * - Modules are assigned to an isolated context that is being pushed into a callback as an argument
	 * @param  {String|Array}   modules  Module name or list of modules
	 * @param  {Function|Object} opt Callback function or configuration Options
	 * @param  {Function} opt.callback Callback function if opt is an Object
	 * @param  {int} opt.timeout Number of retries until script loading is timed out and error is resolved
	 * @param  {boolean} opt.useArguments If set to true, will return module reference as arguments into callback. Default: false
	 * @param  {int} opt.pollInterval Time in milliseconds for registration checking. Default: 1. Warning: DO NOT SET TO 0
	 * @return {Deferred}
	 */
	Context.prototype.require = function(modules, opt) {
		//Second argument is now treated as configuration options if its an Object
		if ($.isFunction(opt)) {
			this.config.callback = opt;
		} else if ($.type(opt) === OBJECT && !$.isEmptyObject(opt)) {
			$.extend(this.config, opt);
		}

		modules = $.isArray(modules) ? modules : [modules];

		var scriptUrl, that = this,
			t = 0,
			onDeck = 'ondeck',
			registeredModule, remaining = [],
			orderedModuleNames = [],
			unregistered = [],
			output, promise = $.bindable(this.deferred.promise());

		//Loop through all required script modules
		for (var i = 0, module, l = modules.length; l > i; i++) {
			//Parses module declaration (i.e. string-1.0) and extracts metadata associated with this module
			module = parseModule(modules[i]);
			orderedModuleNames.push(module.name);

			//Check if module is already registered (meaining executed and cached)
			registeredModule = (module.name in registry) ? registry[module.name][module.version] : undef;

			//If module w/ the right version is already registered
			if (registeredModule) {
				//Get the isolated version of the module (protects cached value from being overriden)
				this.context[module.name] = isolate(registeredModule);
				promise.trigger("onModuleReady", [module, that.context[module.name]]);
			} else {
				//Get a path to module (ex.: /shared/scripts/bam/module/1.0/module) ".js" is ommited
				scriptUrl = module.path;
				//Load file asynchronously
				unregistered.push(scriptUrl);
				remaining.push(module);
			}
		} //End loop
		//If there are no unregistered modules (all present and cached)
		if (!unregistered.length) {
			output = this.config.useArguments ? $.map(orderedModuleNames, function(n) {
				return that.context[n];
			}) : [this.context];
			this.deferred.resolveWith(this.context, output);
			this.config.callback.apply(this.context, output);
		} else {
			//Load all unregistered modules in paralell
			$js.load(unregistered, function jsLoaded() {
				var timerId, rLen, i;
				//Start polling for module presence
				timerId = setTimeout(function poll() {
					rLen = remaining.length;
					if (rLen) {
						for (i = 0, module; rLen > i; i++) {
							//Remove registered item from remaining queue
							module = remaining.shift();
							if (module) {
								registeredModule = (module.name in registry) && (module.version in registry[module.name]) && registry[module.name][module.version];
								if (registeredModule) {
									that.context[module.name] = isolate(registeredModule);
									that.context[module.name].ver = module.version;
									promise.trigger("onModuleReady", [module, that.context[module.name]]);
								} else {
									//Module is not yet registered, put it back in a queue
									remaining.push(module);
								}
							}
						}
						//Endless loop timeout. If timeout is set to 0, this heck will not be performed and loop will be endless.
						if (that.config.timeout > 0 && t++ === that.config.timeout) {
							clearTimeout(timerId);
							that.deferred.rejectWith(that, [new RequireError("Require block has timed out", that.config.timeout, remaining)]);
							throw new RequireError("Require block has timed out", that.config.timeout, remaining);
							//return;
						}

						timerId = setTimeout(arguments.callee, that.config.pollInterval);
					} else {
						t = 0;
						output = that.config.useArguments ? $.map(orderedModuleNames, function(n) {
							return that.context[n];
						}) : [that.context];
						clearTimeout(timerId);
						that.deferred.resolveWith(that.context, output);
						that.config.callback.apply(that.context, output);
					}
				}, that.config.pollInterval); //DO NOT SET THIS TO 0 - WILL BREAK IN IE!!!
			});
		}
		return promise;
	};

	/**
	 * Similar functionality to require() but it is designed to load only custom modules
	 * @param  {Object} map Map of module names to script paths
	 * @param  {Function|Object} opt This parameter doubles as a callback function or a configuration Object
	 * @return {Deferred}
	 * @example
	 * bam.using({ myModule: "scripts/mymodule/mymodule.js", myModule2: "scripts/mymodule/mymodule2.js"});
	 */
	Context.prototype.using = function(map, opt) {
		var modules = [],
			module;
		//Convert map to array of modules
		$.each(map, function(name, path) {
			module = {};
			module[name] = path;
			modules.push(module);
		});
		return this.require.apply(this, [modules, opt]);
	};
	/**
	 * Registers a loaded module with local cache registry
	 * [register description]
	 * @param  {String} name    Module registration name
	 * @param  {int|String} version Module version number
	 * @param  {Object|Function} module  Module body itself
	 */
	bam.register = function(name, version, module) {
		if (typeof(name) === STRING && (typeof(module) === OBJECT || typeof(module) === FUNCTION)) {
			registry[name] = registry[name] || {};
			registry[name][version || 1] = module;
		} else {
			throw new ModuleError("Unable to register a module", name, version, module);
		}
	};

	/**
	 * Loads required modules into a callback context
	 */
	bam.require = function() {
		var context = new Context();
		return context.require.apply(context, arguments);
	};

	/**
	 * Loads required modules into a callback context from custom locations
	 */
	bam.using = function() {
		var context = new Context();
		return context.using.apply(context, arguments);
	};

	/**
	 * Defines a commonjs module, loads its dependencies, and registers it.
	 */
	bam.define = function(identifier, dependencies, constructor) {

		if (typeof identifier !== 'string') {
			throw new TypeError('Module identifiers must be a string');
		}

		if (typeof dependencies === 'function') {
			// get dependencies from constructor.toString();
			constructor = dependencies;
			var constructorString = constructor.toString();
			var requireVariable = REQUIRE_VARIABLE_REGEX.exec(constructorString)[3];
			if (requireVariable) {
				var requireRegex = new RegExp("\\W"+requireVariable+"\\(['\"]([^'\"]+)['\"]\\)", 'gm');
				var dependencies = constructorString.match(requireRegex) || [];
				dependencies.forEach(function(dep, i){ dependencies[i] = dep.substring(requireVariable.length+3, dep.length-2)});
			}
		} else if (constructor === undefined) {
			// dependencies was not passed in
			// the constructor is not a function
			// so it must be the literal value of the module
			constructor = dependencies;
			dependencies = [];
		}

		if (dependencies.length && !dependencies.every(function(dep){ return typeof dep === 'string'})) {
			throw new TypeError('Dependencies must be a string!');
		}
			
		// get the version from the identifier so it can be declared
		var splitId = identifier.split('-');
		identifier = splitId[0];
		var version = +splitId[1] || null;
		
		// normalize dependency array
		dependencies.forEach(function(dependency, i) {
			if(typeof dependency === 'string' && dependency.indexOf('/') !== -1) {
				var name = everythingAfterLastSlash.exec(dependency)[1];
				dependencies[i] = {};
				dependencies[i][name] = dependency;
			}
		});
		
		// require and register the new module
		bam.require(dependencies).done(function(ctx) {
			if (typeof constructor === 'function') {
				// disable require['modulename'] for accessing modules
				var moduleRequire = function(lib) { return ctx(lib) };
				var moduleExports = {};
				var moduleModule = {
					id: identifier
				};
				// if the constructor returns something, that shall be the exports
				moduleExports = constructor(moduleRequire, moduleExports, moduleModule) || moduleExports;
				bam.register(identifier, version, moduleExports);
			} else {
				bam.register(identifier, version, constructor);
			}
		});
	}
})(jQuery, bam);
