if (!window.bam) {
	window.bam = {};
}

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
		requireVariableRegExp = /^function([\s]+)?\(([\s]+)?([\w]+)/,
		commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	/* Modules path - home path for all the modules */
	var moduleHome = "shared/scripts/bam/";

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

	function fillRelativePath( path, relativeTo ) {
		if (typeof relativeTo === 'string') {
			relativeTo = relativeTo.split('/');
		} else {
			relativeTo = relativeTo.slice();
		}
		var pathArray = path.split('/');
		while (pathArray[0] === '.') {
			pathArray.shift();
		}
		while (pathArray[0] === '..') {
			pathArray.shift();
			relativeTo.pop();
		}
		return relativeTo.concat(pathArray).join('/');
	}

	function convertArrayOfStringsToRequirementObjects( dependencies, modulePathAndName ) {
		//dependencies = dependencies.slice();
		var modulePathArray;
		var lastSlash = modulePathAndName.lastIndexOf('/');
		if (lastSlash !== -1) {
			//modulePath = '/'+modulePathAndName.substr(0, lastSlash);
			modulePathArray = modulePathAndName.substr(0, lastSlash).split('/');
		} else {
			modulePathArray = [];
		}
		// normalize dependency array
		for (var i = 0, dependency; dependency = dependencies[i]; i++ ) {
			if (dependency === 'require' || dependency === 'exports' || dependency === 'module') {
				dependencies.splice(i, 1);
				i--;
			}
			if(typeof dependency === 'string' && dependency.indexOf('/') !== -1) {
				if (dependency.indexOf('.css') !== -1) {
					dependency = dependency.split('!')[1];
					dependency = fillRelativePath( dependency, modulePathArray );
					registry['require.css']['1'].load( dependency, {toUrl: function(a){return a}}, $.noop, {});
					dependencies.splice(i,1);
					i -= 1;
					continue;
				}
				if (dependency.charAt(0) === '/') {
					window.console && console.warn && console.warn('Please remove leading slashes from require() calls.\nModule: '+modulePathAndName+'\nrequire('+dependency+')');
					dependency = dependency.substr(1);
				}
				if (dependency.charAt(0) === '.') {
					dependency = fillRelativePath( dependency, modulePathArray );
				}

				var nameAndVersion = getNameAndVersionFromPath( dependency );
				var name = nameAndVersion.name;
				
				dependency = '/'+dependency;

				dependencies[i] = {};
				dependencies[i][name] = dependency;
				dependencies[i].version = nameAndVersion.version;
			} else if (typeof dependency === 'string') {
				//dependencies[i] = parseModule( dependency ).path;
			}
		};
		return dependencies;
	}

	function getDependenciesFromFunction(fn, modulePathAndName) {
		var fnString = fn.toString().replace(commentRegExp, '');
		var requireResult = requireVariableRegExp.exec(fnString)
		var dependenceis;
		if (requireResult) {
			var requireVariable = requireResult[3];
			var requireRegex = new RegExp("[^\\w\\.]"+requireVariable+"\\(['\"]([^'\"]+)['\"]\\)", 'gm');
			dependencies = fnString.match(requireRegex) || [];
			for ( var i = 0, dependency; dependency = dependencies[i]; i++ ) {
				dependencies[i] = dependency.substring(requireVariable.length+3, dependency.length-2);
			}
		} else {
			dependencies = [];
		}
		return convertArrayOfStringsToRequirementObjects( dependencies, modulePathAndName );
	}

	var versionRegex = /\d\.\d/;
	var versionWithSlashRegex = /\/\d\.\d\//;
	var justASlash = /\//g;
	function getNameAndVersionFromPath( path ) {
		var version = +path.match(versionRegex);
		var name;
		if (version) {
			if (path.substr(0, moduleHome.length) === moduleHome) {
				// shared/scripts/bam/data/1.0/data -> data
				// shared/scripts/bam/data/tixdata/0.1/tixdata -> data.tixdata
				// shared/scripts/bam/data/1.0/util -> data.util
				// shared/scripts/bam/data/tixdata/0.1/util -> data.tixdata.util
				var pathArray = path.substr(moduleHome.length).replace(versionWithSlashRegex, '/').split('/');

				if (pathArray[pathArray.length-1] === pathArray[pathArray.length-2]) {
					pathArray.pop();
				}
				name = pathArray.join('.');
				
			} else {
				name = path.split(versionRegex)[1].substr(1);
			}
		} else {
			version = 1;
			name = path.substr(path.lastIndexOf('/')+1);
		}
		return {name: name, version: version};
	}

		/*
		 * Bam modules manifest. Used by "requires" pattern.
		 * WARNING: Use caution when modifying manifest declarations, these changes affect module selection in your code
		 */
	var manifest = {
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
			hogan: {
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
			text: {
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
			},
			jquery: {
				atbat: 1.0
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
					if (lib.charAt(0) === '.') {
						lib = fillRelativePath( lib, that.context.path );
					}
					lib = getNameAndVersionFromPath(lib).name;
				}
				if (lib.indexOf('-')) {
					lib = lib.split('-')[0];
				}
				if (that.context[lib]) {
					return that.context[lib];
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
						version = manifestEntry.atbat || 1;
					} else {
						throw new ModuleError("Unable to find module", moduleName, version, null);
					}
				}
				//If current version listed in manifest is greater than the version used
				if (manifestEntry) {
					if (manifestEntry.atbat + '' > version) {
						window.console && console.warn && console.warn("The version of [" + module + "] used is deprecated. Current version is " + manifestEntry.atbat);
						bam.trackDeprecated({
							module: module,
							version: version,
							method: "*"
						});
						//Else, check if a possible upgrade version is available
					} else if ((onDeck in manifestEntry) && version < manifestEntry.ondeck + '') {
						window.console && console.warn && console.warn("Updated version of [" + module + "] is available. Please try to update to version " + manifestEntry.ondeck);
					}
				}
				version = IS_NUMERIC.test(version) ? parseFloat(version) : version;
				pathVersion = typeof(version) !== STRING ? (version % 1 === 0) ? Number(version).toPrecision(2) : Number(version).toString() : version;
				modulePath = (moduleName.split('.').slice(0, -1).length ? moduleName.split('.') : [moduleName]).concat(pathVersion, module).join('/');
				out = {
					name: moduleName,
					version: version,
					path: '/' + moduleHome + modulePath + ".js"
				};
			} else if (typeof(module) === OBJECT) {
				//If you want to specify a custom module in custom location
				out = {};

				$.each(module, function(name, path) {
					out.name = name;
					out.version = getNameAndVersionFromPath(path).version;
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
		// if the first argument is a function, find its dependencies.
		if ($.isFunction(modules)) {
			opt = modules;
			modules = getDependenciesFromFunction(opt, 'bam.require statement');
		}

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
				if (typeof registeredModule !== 'string') {
					this.context[module.name] = isolate(registeredModule);
				} else {
					this.context[module.name] = registeredModule;
				}
				
				that.context[module.name].ver = module.version;
				(function(module) {
					setTimeout( function() {
						promise.trigger("onModuleReady", [module, that.context[module.name]]);
					}, 0);
				})(module)
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
		if (typeof(name) === STRING) {
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
	bam.define = function(identifier, dependencies, moduleConstructor) {

		if (typeof identifier !== 'string') {
			throw new TypeError('Module identifiers must be a string');
		}

		// bamDependencies is the dependencies with 'require', 'exports', and 'module' stripped out.
		var bamDependencies;

		if (typeof dependencies === 'function') {
			// CommonJS style BAM module
			moduleConstructor = dependencies;
			dependencies = ['require', 'exports', 'module'];
			bamDependencies = getDependenciesFromFunction(moduleConstructor, identifier);

		} else if ($.isArray( dependencies ) && typeof moduleConstructor === 'function') {
			// require module compiled with r.js
			bamDependencies = convertArrayOfStringsToRequirementObjects( dependencies.slice(), identifier );
		
		} else if (moduleConstructor === undefined) {
			// dependencies was not passed in and the constructor is not a function
			// so it will be used as the literal value of the module
			moduleConstructor = dependencies;
			bamDependencies = dependencies = [];
		}

		// get the version from the identifier so it can be declared
		var lastSlash = identifier.lastIndexOf('/');
		var version, path;
		if (lastSlash !== -1) {
			path = identifier.substr(0, lastSlash);
			var nameAndVersion = getNameAndVersionFromPath( identifier );
			version = nameAndVersion.version;
			identifier = nameAndVersion.name;
		} else {
			path = '';
			var splitId = identifier.split('-');
			identifier = splitId[0];
			version = +splitId[1] || null;
		}

		function registerModule() {
			if (typeof moduleConstructor === 'function') {
				
				// create the exports, module, and require objects
				// to be injected into the constructor.
				var ctx = this;
				ctx.path = path || identifier;
				var require = function require(lib){ 
					if (lib.indexOf('.css') !== -1) {
						return '';
					}
					return ctx(lib); 
				};
				
				var exports = {};

				var module = {
					id: path + '/' + identifier,
					exports: exports
				};

				// the arguments to this function are the modules provided by bam.
				// this adds the require, exports, and module objects back into them
				// if they were stripped out at the beginning of the define call.
				var argumentsForTheConstructor = Array.prototype.slice.apply(arguments);
				for (var i=0; i < dependencies.length; i += 1) {
					if (dependencies[i] === 'require') {
						argumentsForTheConstructor.splice(i, 0, require);
					} else if (dependencies[i] === 'exports') {
						argumentsForTheConstructor.splice(i, 0, exports);
					} else if (dependencies[i] === 'module') {
						argumentsForTheConstructor.splice(i, 0, module);
					}
				}

				exports = moduleConstructor.apply(window, argumentsForTheConstructor) || module.exports;
				bam.register(identifier, version, exports);
			} else {
				bam.register(identifier, version, moduleConstructor);
			}
		}

		if (bamDependencies && bamDependencies.length) {
			bam.require(bamDependencies, {useArguments:true}).done(registerModule);
		} else {
			registerModule();
		}
	}

	bam.require.getNameAndVersionFromPath = getNameAndVersionFromPath;

	window.define = bam.define;
	window.define.amd = true;

	window.requirejs = function( requirements, callback ) {
		requirements = convertArrayOfStringsToRequirementObjects( requirements, 'requirejs statement' );
		bam.require(requirements, {useArguments:true}).done(callback);
	};

	define('jquery', [], function() { return $ });
})(jQuery, bam);