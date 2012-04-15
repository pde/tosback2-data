

(function() {
    var libraryChooser = (function() {//singleton whose methods will be copied to root ns (in this case BN)
        var libraries = {}, currentLib, defaultLib = jQuery;
        //TODO:add support for min and max version requesting
        return {
            setDefaultLibrary: function(n) { defaultLib = n; },
            addLibrary: function(name, libRoot) { libraries[name] = libRoot; },
            changeLibrary: function(n) { currentLib = n; },
            defaultLibrary: function() { currentLib = defaultLib; },
            getLibraryRoot: function() { return libraries[currentLib]; }
        };
    })();

    var rootNamespace = function(str, clean) {
        var old = undefined; //old value for rootname
        var lazyLoadFunctionName = str + 'LazyLoadMethod';
        var libraryRoots = {};
        var use = function(ns, require) {
            if (require && (typeof ns !== 'string' || ns.length === 0)) {
                throw new Error('Invalid or empty namespace- expected in string format');
            }
            var root = window[str];
            ns = ns.split('.');
            for (var i = (ns[0] === str ? 1 : 0); i < ns.length; i++) {
                if (typeof root[ns[i]] === 'undefined') {
                    if (require) {
                        throw new Error('The module ' + ns + ' does not exist. Object ' + root + ' has no property named ' + ns[i]);
                    } else {
                        root[ns[i]] = {};
                    }
                }
                root = root[ns[i]];
            }
            return root;
        };

        var applyObj = function(base, over, allowOverwrite, NSname) {
            for (var x in over) {
                if (over.hasOwnProperty(x)) {
                    if (allowOverwrite || !(base[x])) {
                        base[x] = over[x];
                    }
                    else {
                        throw new Error('Cannot overwrite ' + x + ' in safe mode. It already exists in the namespace ' + NSname + '.');
                    }
                }
            }
        };

        var resolveInterface = function(nsStr, arr, fn, overWrite, settings) {
            var nsInterface = {};
            var getArgumentOfType = function(type) {
                var result;
                var assignToResultIfMatch = function(param) {
                    var paramType = (param instanceof Array) ? 'array' : typeof param;
                    if (paramType === type) {
                        result = param;
                    }
                };

                assignToResultIfMatch(nsStr);
                assignToResultIfMatch(arr);
                assignToResultIfMatch(fn);
                assignToResultIfMatch(overWrite);
                assignToResultIfMatch(settings);
                return result;
            };
            nsInterface.ns = getArgumentOfType('string');
            nsInterface.resources = getArgumentOfType('array') || [];
            nsInterface.fn = getArgumentOfType('function') || function() { return {}; };
            nsInterface.over = getArgumentOfType('boolean');
            nsInterface.additionalSettings = getArgumentOfType('object') || {};
            return nsInterface;
        };

        var buildParamList = function(resources) {
            var params = [];
            params[0] = libraryChooser.getLibraryRoot();
            for (var i = 0; i < resources.length; i++) {
                params[i + 1] = use(resources[i], true); //require that the module exists  - for now,
            }
            params[params.length] = window;
            return params;
        };

        var getResultantInterface = function(options, paramList, ns) {
            var resultObj = {};
            if (options.additionalSettings.lazyLoad && options.fn) {
                resultObj[lazyLoadFunctionName] = function() {
                    var applyTo = (ns) ? ns : resultObj;
                    applyObj(applyTo, options.fn.apply({}, deLazyLoad(paramList)), options.over, options.ns);
                    delete applyTo[lazyLoadFunctionName];
                };
            } else if (options.fn) {
                options.fn =
		   		    resultObj = options.fn.apply({}, deLazyLoad(paramList));
            }
            return resultObj;
        };

        var deLazyLoad = function(obj) {
            var i;
            if (obj instanceof Array) {
                for (i = 0; i < obj.length; i++) {
                    if (obj[i][lazyLoadFunctionName]) {
                        obj[i][lazyLoadFunctionName]();
                    }
                }
            } else if (obj[lazyLoadFunctionName]) {
                obj[lazyLoadFunctionName]();
            }
            return obj;
        };



        var exec = function(nsStr, arrDependency, fn, overWrite, settings) {
            var options = resolveInterface(nsStr, arrDependency, fn, overWrite, settings);
            var ns, fnResult, paramList;

            if (options.ns) {
                ns = use(options.ns);
            }

            var newInterface = getResultantInterface(options, buildParamList(options.resources), ns);
            if (options.fn && options.ns) {
                deLazyLoad(ns);
                applyObj(ns, newInterface, options.over, options.ns);
            }
            return (options.ns) ? ns : fnResult;
        };



        if (!window[str] || clean) {
            old = window[str]; //backup old contents, just in case;
            window[str] = exec;
        } else {
            throw new Error('this namespace already existed. Cannot Overwrite');
        }
    };
    rootNamespace('BN');
    libraryChooser.addLibrary('jq', jQuery)
    //  libraryChooser.addLibrary('DUMMY2', { name: 'dummy2' })

    libraryChooser.setDefaultLibrary('jq');
    libraryChooser.defaultLibrary();

    BN.chooseLibrary = libraryChooser.changeLibrary;
    BN.chooseDefaultLibrary = libraryChooser.defaultLibrary;
})();



/***
	Accepts global host obect
	ex. BN.Environment.Host.init({COMMUNITY: "my.barnesandnoble.com", SHOP: "cart2.barnesandnoble.com"});
***/
BN('Environment.Host', function(){
	//default domains does not yet include all, but maybe should...
	var hosts = {
		WEB: "www.barnesandnoble.com",
		SHOP: "cart2.barnesandnoble.com",
		NETORDERPATH: "cart4.barnesandnoble.com",
		STORELOCATOR: "store-locator.barnesandnoble.com",
		COMMUNITY: "my.barnesandnoble.com",
		MUSIC:'music.barnesandnoble.com',
		SEARCH:'search.barnesandnoble.com',
		IMAGEHOST:'images.barnesandnoble.com',
		VIDEO:'video.barnesandnoble.com',
		VIDEOGAME:'videogames.barnesandnoble.com',
		GIFTS:'gifts.barnesandnoble.com',
		SECURE:'secure.barnesandnoble.com',
		CROSSPRODUCT:'books.barnesandnoble.com'
	};
		
	var init = function(hostobj){
		if(!hostobj || typeof hostobj !== "object" || typeof hostobj === "function" || hostobj instanceof Array == true) {
			throw new Error('Host object initialization failed!');
		}else{
			hosts = hostobj;
		}
	};
	
	var iterator=function(fn){
		var arr=[];
		for(var x in hosts){
			if(hosts.hasOwnProperty(x)){
				arr[arr.length]=fn(x,hosts[x]);
			}
		}
		return arr;
	};


	var resolveDomain = function(hostName){
		var result;
		if(!hostName || !hosts[hostName.toUpperCase()]){
			throw new Error(hostName + ' is an invalid host name! eg. IMAGEHOST or MUSIC etc.');
		}else {
			result = hosts[hostName.toUpperCase()]; // make uppercase because it's a Constant
		}
		return result;
	};
		
	return {
		iterator:iterator,
		init: init,
		getMappedDomain: resolveDomain
	}
});

/***
	Accepts store object
	ex. BN.Environment.Store.init({storeId: "0002", storeCode: "hp"}); 
***/
BN('Environment.Store', function(){	
	var bnStore = true;
	var settings = {
		storeId: "0001",
		storeCode: "bn",
		storeName: "Barnes &amp; Noble"
	};
	var init = function(storeObject){
		for(var store in storeObject){
			if(storeObject[store] != '' && storeObject.hasOwnProperty(store) && settings[store]){
				settings[store] = storeObject[store];
			}
		}
		var code = settings['storeCode'];
		bnStore = code === 'bn' || code === '';
	};
	var getFnGen=function(n){
		return function(){
			return settings[n];
		};
	};
	return {
		init:init,
		isBN: function() { return bnStore; },
		getStoreId:getFnGen('storeId'),
		getStoreCode:getFnGen('storeCode'),
		getStoreName:getFnGen('storeName')
	}
});

/***
	Accepts host object for services only (optional)
	ex. BN.Environment.ServiceLink.init({SHOP: "cart2.barnesandnoble.com"}); see v6 for orig implementation
***/

BN('Environment.ImageLink', function(){
	var wlsStoreRef = '/white-label/stores/';
	var storeObj=BN.Environment.Store;
	var getHost=BN.Environment.Host.getMappedDomain;
	
	var getImageBridge = function(){
		return  (storeObj.getStoreId() !== "0001" && storeObj.getStoreId() != "")? wlsStoreRef + storeObj.getStoreCode(): '';
	};
	var getPath=function(host,subpath){
		var result='';
		var sec = (window.location.protocol === 'https:');
		//if only one param defined - as should be
		if(typeof subpath === 'undefined'){
			subpath=host;
		}
		//if at least one param is defined...
		if(typeof subpath !== 'undefined'){
			result = getImageBridge() + subpath;
			result = ( sec )? result : 'http://' + getHost("IMAGEHOST") + result;
		}else{
			throw new Error("image path requires a path to process");
		}
		return result;
	};
	return {
		getPath:getPath,
		getPathModifier:getImageBridge
	};
});
//this is to be removed when the bnfooter is updated to include manageconfig.js and 0001.js
BN('WL.Config.Text',function(){return{'ShortName':'BN.com','LongName':'Barnes &amp; Noble','StoreName':'Barnes &amp; Noble','ArchiveName':'Archive',
'Device': 'nook','DeviceLink': '<a href="http://www.barnesandnoble.com/nook/index.asp">|[{Device}]|</a>', 'EReaderSoftwareName': 'B&N eReader', 'PhoneNum': '1-800-THE-BOOK (1-800-843-2665)', 'PrivacyLink': '<a href="http://www.barnesandnoble.com/help/nc_privacy_policy.asp">Privacy Policy</a>', 'Copyright': '1997-2009 Barnesandnoble.com llc', 'ItemsFrom': 'Items from |[{StoreName}]|', 'ShippingOptionsLabel': 'Shipping Options &amp; Gift Preferences', 'ArchiveTitle': '|[{ArchiveName}]|', 'CancelledSub': 'You have cancelled your subscription. ', 'StaticMyUpdates': '', 'DigitalManagementTitle': 'Digital Management', 'DigitalManagementFirstColHeader': 'Digital Downloads', 'eBookStoreFront': 'Go to eBooks Storefront', 'eBookStaticAccordion': '<h3>Start reading your eBook</h3><p>Use your |[{Device}]| &amp; start reading.</p>', 'SelectDigitalOrderLabel': 'Download Digital Items', 'PageHeader': 'My Account', 'PageSignInHeader': 'Sign In or Create An Account','LockOutMessage':' ', 'CreateAccountBenefits': '<ul class="personalizeOptions"><li>Create and email your wish lists</li><li>Fill your virtual library</li><li>Share your reviews</li><li>Get updates on local store events</li></ul>', 'HowToPurchase': '', 'CreateAccountHeader': 'Create a Barnes &amp; Noble.com Account', 'CreateAccountInstructions': 'Fill in the fields below to create a Barnes &amp; Noble.com account. You\'ll be able to shop and check out faster on your next visit; check your order status online and receive updates on special offers and events. ', 'mainAccountFeatureTxt': '', 'BNUserInstructions': '', 'DeliveryDetailsLabel': 'Delivery &amp; Gift Details', 'OnlinePriceLabel': 'Online Price', 'EBookOnlinePriceLabel': 'eBook Price','BuyNow':{'OwnerMessage':'<p>Download your |!P{itemType}P!| from your Library any time!<br /><a href="http://|!P{communityDomain}P!|/ebooks/ebookslibrary.html"> > Go To My Library<a/></p>','SampleAddedMessage': '<h3>Your Sample has been added to your eBooks Library.</h3>','SampleAddedDownloadMessage': '<p>Download your |!P{itemType}P!| from your Library any time!<br /><a href="http://|!P{communityDomain}P!|/ebooks/ebookslibrary.html"> > Go To My Library<a/></p>','OwnerInstructionSupport':'<ul><li class="top"><p>Use your ereader device or open HP - B&amp;N eReader on your computer or mobile device & start reading.</p></li>','OwnerDeviceHelpTitle':'<li class="info"><p><strong>Need to install our FREE eReader application?</strong></p></li>','AccordianPlaceHolder': '<div class="supportedDevices">Supported Devices</div>','OwnerDeviceInfoEnable': 'true'}, 'SignIn': { 'AccountBenefits': '<h2>Sign up now and enjoy these benefits:</h2><p class="errors" ></p><div id="newCustomersCopy"><ul><li>Create and email your wish lists</li><li>Champion your favorite titles</li><li>Fill your virtual library</li><li>Share your reviews</li><li>Get updates on local store events</li></ul></div>', 'LearnAboutBN': '<a href="http://|!P{WebDomain}P!|/my-bn/">Learn more about My B&amp;N</a>', 'CreateAccountInstructions': 'If you already have an account, please <a href="#" class="signInLink">sign in</a>.'}}}, true);
BN('Text.Tokenizer',function(){
	var TokenProcessor=function(s,e){
		var start=s||'{';
		var end = e||'}';
		var template=undefined;
		var setStart=function(sta){
			if(sta !== end){
				start=sta;
			}else{
				throw 'token start cant match token end';
			}
		};
		
		var setEnd=function(nd){
			if(nd !== start){
				end=nd;
			}else{
				throw 'token start cant match token end'; 
			}
		};
		
		var setSource= function(obj){
			template=obj;
		};
		
		var tokenize=function(str,tem){
			var sorce=tem || template;
			var arr=str.split(start);
			var temp='';
			if(sorce === undefined){
				throw 'tokenizer requires source to match against';
			}
			for(var i=1;i<arr.length;i++){
				temp=arr[i].split(end);
				arr[i]=sorce[temp[0]]+(temp[1] || '');
			}
			return arr.join('');			
		};

		return{
			setStart:setStart,
			setEnd:setEnd,
			setData:setSource,
			process:tokenize
		};
	};
	
	return {
		getTokenizer:function(s,e){
			return new TokenProcessor(s,e);
		}
	}
},true);

BN('Environment.Text',function(){
	var dataSource=BN.WL.Config.Text;
	
	//this will be removed
	var doRecursiveReplace=function(txt){
		var flatten=function(n){
		    var flatObj={};
		    var iterate=function(obj,str){
		        var myStr=str ||'';
		        for(var x in obj){
		            if(obj.hasOwnProperty(x)){
		                if(typeof obj[x] === 'string'){
		                    flatObj[myStr+x]=obj[x];
		                }else{
		                    iterate(obj[x],myStr+x+'.');
		                }
		            }
		        }
		    };
	    	iterate(n);
	    	return flatObj;
		};
		var tokenizer = BN.Text.Tokenizer.getTokenizer('|[{','}]|');
		var result = tokenizer.process(txt,flatten(dataSource));
		return result;
		
	};
	
	

	var findText=function(str,obj){
	    var pos=str.indexOf('.');
	    if(pos !== -1){
	        return findText(str.substring(pos+1),obj[str.substring(0,pos)])
	    }else{
	        if(typeof obj[str] === 'string'){
	            return obj[str];
	        }else{
	            throw str + ' is not a string. Replacement must terminate with a string';
	        }
	    }
	};
	
	var replaceText= function(txt,sorc){
		var tokenizer = BN.Text.Tokenizer.getTokenizer('|!P{','}P!|');
		return tokenizer.process(txt,sorc);
	};
	
	var locGetText=function(lookup,replaceObj){
		var result= findText(lookup,dataSource);
		if(replaceObj){
			result=replaceText(result,replaceObj);
		}
		//this does the token replacement....
		
		return doRecursiveReplace(result);
		//Following is after replacement is done in the tool.
		//return result;
	};
	
	return {getText:locGetText};	
},true);

