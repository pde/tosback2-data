/* BEGIN TEMPORARY OVERRIDES */

Target.controller.grda.getGrda = function (postData, postURL, currentHit) {    	
    var self		= this,
    	derivedObj	= {},
    	extObj2		= {dataType: 'jsonp',jsonp: 'jsonp'};

    currentHit = (currentHit) ? currentHit : 0;
    $.ajaxSetup({
        traditional: true,
        cache: false
    });
    if(postData instanceof Object){        	
    	postData['jsRequest'] = "true";
    }else{
    	postData += "&jsRequest=true";
    } 

	
	
    var extObj1 = {
            url: TGT3P.config.getURL(postURL),
            // This service responds with a json
            data: postData,
            type: 'GET',
            dataType: 'json',                
            curtain: false,
            cache: false,
            success: function (response, status, xhr) {        	      	
                if (response != null) {
                	var rStatus		= (typeof response != 'undefined') ? response.status : "";
                    if (rStatus === 'inprogress') {
                        self.delayParam += 100;
                        currentHit += 1;
                        if (currentHit < self.options.maxHits) {                            	
                            self.callInit(self.options.delayParam, response, postURL, currentHit);
                        } else {
                            currentHit = 0;
                        }
                    } else if (rStatus === 'complete') {
                        self.grdaData['responseData'] = response;
                        if (self.grdaParam.hasClass('grdaHover')) {
                        	var _resType = (typeof response.registryType != "undefined") ? response.registryType : "";
                        	if(self._hoverType === _resType) {
                        		self.grdaParam.next().html(response.registryData);
                        	}
                        }

                        if (typeof(self.callback) == 'function') {
                            self.callback(response);
                        }

                    } else if (rStatus === 'completePage') {
                        window.location = postURL + '?' + $.param(response);
                    } else if (rStatus === 'completePageLink') {

                        window.location = postURL.substring(0, postURL.indexOf("?")) + '?' + $.param(response);
                    } else if (rStatus === 'customeventcomplete') {
                        if (typeof(self.callback) == 'function') {
                            self.callback(response);
                        }
                    } else if (rStatus === 'command') {
                        if ($.overlay.activeOverlay) {
                            var overlay = $.overlay.currentOverlay;
                            if (overlay.data('options').overlayId === 'wait') $.overlay.currentOverlay.trigger('close.overlay');
                        }
                    } else if (rStatus === 'redirect') {
                        window.location = response.redirectURL;
                    } else if (rStatus === 'htmlReplace') {
                        self.callback(response);
                    } else if (rStatus === 'waitRedirect') {
                        window.location = response.redirectURL + '?' + $.param(response);
                    } else if (rStatus === 'avsError') {
                        Target.controller.avs.openModal(response, 'small', 'force');
                    } else if (rStatus === 'redirectOverLay') {
                        $.overlay.load({
                            content: response.redirectURL,
                            overlayId: response.overLayId,
                            overlayType: 'modal'
                        });
                    } else if (rStatus === 'listOverLay') {
                        var width	= (typeof response.width != "undefined") ? response.width : "",
                        	template= (typeof response.template != "undefined") ? response.template : "",	
                            obj		= obj1 = obj2 = {};
                        $.hideCurtain();
                        // to open the quick create/ add to list overlays
                        obj1 = {
                            contentOverride	: response.overlayHtml,
                            overlayId		: response.overLayId,                            
                            overlayType		: 'modal',
                            width			: "",
                            template		:'default'
                        };

                        if(width != "") { obj2.width = width; }
                        if(template != "") { obj2.template = template; }

                        obj = $.extend(obj1, obj2);
                        $.overlay.load(obj);
                    }
                }
            },

            error: function (err) {
                console.log();
                return window.location.href = '/GenericApplicationError';
            }
        };       

    if(self._hoverType) {
    	derivedObj = $.extend(extObj1, extObj2);
    } else {
    	derivedObj = extObj1;
    }
    var xhr = $.ajax(derivedObj);
    if(xhr) {
    	self._xhr.push(xhr);
    }
};

Target.controller.miniCart.getContent = function(handler) {
	var self	= this;
	var url		= self.cartWrapper.attr('ajaxsrc');
	
	if (url.substr(0,1) == '/') {
	    url = TGT3P.config.URLs.base + url;
    } else {
		url = TGT3P.config.getURL(url)
	}

	$.ajax({
		url: url,
		type: 'GET',
		cache: false,
		curtain: false,
		dataType: 'jsonp',
		jsonp:'jsonp',
		success: function(data) {				
			handler(data);
		},
		error: function() {
			console.log('Request failed'); 	
		}
	});
};
/* END TEMPORARY OVERRIDES */

TGT3P = {}; //create namespace
/**
 * Configuration values for 3rd party navigation behavior
 **/
TGT3P.config = {
    URLs: 
    {
        base: '//www-secure.target.com',
        categoryJSONP: 'PortableCategoryJsonView'
    },
	getURL: function(url) { // functon to return the constucted URL based on protocol
		var cURL	= TGT3P.config.URLs.base;
		if(url) {
			url	= url.split("/")[3];
			cURL= (url !== undefined) ? cURL+'/'+url : cURL;
		}
		return cURL;
	}
}

/*
DT: Attempt to determine which protocol is being used and set the domain appropriately.
 */
try {
      if(window.location.protocol == 'http:')
            TGT3P.config.URLs.base = 'http://www.target.com';
      else
            TGT3P.config.URLs.base = 'https://www-secure.target.com';
}
catch(e) {
      TGT3P.config.URLs.base = '//www-secure.target.com';
}

TGT3P.nav = {}; //initialize package
isredCard = (window.location.protocol=="https:")?true:false;
/**
 * navigationLoader is responsible for consuming all of the JSONP APIs that
 * provide data for the header, including categories, global promise,
 * utility nav, TargetList, Registry, and related flyouts.
 **/
TGT3P.nav.navigationLoader = (function ($) {
    /**
     * Retrieve JSONP catalog
     * @return void
     **/
    function getCategories() {
        var jsonpConfig = {
            url: TGT3P.config.URLs.base + '/' + TGT3P.config.URLs.categoryJSONP,
            jsonp: 'jsonp',
            jsonpCallback: 'categories',
            success: function(response) {
                TGT3P.nav.navigationLoader.categoryCallback(response);
            },
            dataType: 'jsonp'
        };
        $.ajax(jsonpConfig);
    }

    /**
     * Build category links and flyouts from API data
     * @param Object json - category data from API
     * @return void
     **/
    //var seeMore = $("#MainMenu>li:last").html();
    function loadCategoryNav(json) {
        var categories = json.nav_categories;
        var metadata = null;
        var mainCat = null;
        var mainCatId = null;
        var mainCatElement = null;
        var column = null;
        var columnIndexes = ['col1', 'col2', 'col3'];
        var subCatList = null;
        var categoryListElement = $('#MainMenu');
        var promoElement = null;
		var promoWrapUl = null;
		var promoWrapLi = null;
		var isOldJSON	= false;
		
        // removed temporarily because of invalid placeholder class assignments
        //categoryListElement.find('li.placeholder').remove();
        // instead walk the elements in main menu, but keep the first one
        categoryListElement.find('li').each(function(index) {
    	    if (index > 0) $(this).remove();
    	});

		/***
		* Below condition to Support Old JSON structure: Needs to be removed later
		*
		*/
		
		isOldJSON = checkCompatibleVersion(categories);
		
		if ( isOldJSON ) {
			//
			console.log(" [Old JSON Response] ");
			for (var mainCatId = 0; mainCatId < categories.length; mainCatId++)
			{
				mainCat = categories[mainCatId];
				metadata = getCategoryMetadata(mainCat);
				mainCatElement = createMainCategoryElement(metadata, mainCatId);
				hoverListElement = $(document.createElement('div'));
				hoverListElement.addClass('hover');
				hoverListElement.addClass('extended');

				for (var colId = 0; colId < columnIndexes.length; colId++)
				{            	
					column = mainCat[columnIndexes[colId]];
					switch(column.type) {
						case 'list':
							subCatList = createSubCategoryList(column.contents);
							hoverListElement.append(subCatList);
							break;
						case 'promo':
							promoElement = $(document.createElement('div'));
							promoElement.addClass(column.className);
							promoContent = column.contents;                       
							promoElement.html(promoContent);
							hoverListElement.prepend(promoElement);                       
							break;
					}
				}
				mainCatElement.append(hoverListElement);
				categoryListElement.append(mainCatElement);
			}
			
			//to apply style to maintain layout alignment			
			$("ul#MainMenu li div.hover.extended .side").css({'width':'130px','float':'right'});
			
		} else { //for support 5 column flyout
			//
			$.each(categories, function(index, catObj) {
				//mainCat = categories[mainCatId];
				var css = "hover";
				css = css+" "+getActiveColumnsCount(catObj);
				metadata = getCategoryMetadata(catObj);
				mainCatElement = createMainCategoryElement(metadata, index);
				hoverListElement = $(document.createElement('div'));
				hoverListElement.addClass(css);
				hoverListElement.addClass('extended');
				
				$.each(catObj.columns, function(cindex, colObj) {
					column = colObj;
					if(column === undefined) return false;
					switch(column.type) {
						case 'list':
							subCatList = createSubCategoryList(column.contents);
							if(subCatList.html()) {
								hoverListElement.append(subCatList);
							}
							break;
						case 'promo':
							promoWrapUl	= $('<ul>');
							promoWrapLi = $('<li>');
							//promoWrapUl.append(promoWrapLi);
							promoElement = $('<div>');
							if(column.className !== undefined) {
								promoElement.addClass(column.className);
							}
							promoContent = column.contents;
							promoElement.html(promoContent);
							//console.log(" [promoContent] " +promoContent);						
							promoWrapLi.append(promoElement);
							promoWrapUl.addClass('last').append(promoWrapLi);
							hoverListElement.append(promoWrapUl);
							break;
					}
				});
				mainCatElement.append(hoverListElement);
				categoryListElement.append(mainCatElement);
			});
			
		}
		
		/*
        if($("#MainMenu>li:last .extended ul").find("li").length==0) {
        	$("#MainMenu>li:last").remove();
        	$("#MainMenu").append('<li class="more rightmenu" linktype="rightmenu">'+seeMore+'</li>');
        }
		*/
        $("."+column.className).find("a").each(function(){
			if($(this).attr("href").indexOf("http")<0) {
				$(this).attr("href", TGT3P.config.URLs.base+$(this).attr("href").replace("#?lnk=null|null",""))
			}
        })
        $("#globalPromise").find("a").each(function(){
			if($(this).attr("href").indexOf("http")<0) {
				$(this).attr("href", TGT3P.config.URLs.base+$(this).attr("href").replace("#?lnk=null|null",""))
			}		
        })
		
        if(window.location.protocol != "http:") {
	        var cartObj = $("#ShopMenu #mini-cart-wrapper");
        	cartObj.attr("ajaxsrc", (cartObj.attr("ajaxsrc").indexOf("http")<0)?"https://www-secure.target.com"+cartObj.attr("ajaxsrc"):cartObj.attr("ajaxsrc").replace("http://www.target.com","https://www-secure.target.com"));	        
        }
		
		$("#ShopMenu").find(".grdaHover").each(function() {
			//$(this).attr("grdalink",$(this).attr("grdalink").replace("http://www.target.com/webapp/wcs/stores/servlet","https://www-secure.target.com"));
			var url = lastPos = _curl = null;
			url = $(this).attr("grdalink");
			if(url !== undefined) {
				try {
					lastPos = url.lastIndexOf("/");
					_curl = url.substring(parseInt(lastPos));
					$(this).attr("grdalink",TGT3P.config.URLs.base+_curl);
				} catch(e) {};
			}
	    });
		
        $("#mini-cart .items-set").bind("mouseenter",function(){
        	$(this).find("a").each(function(){	        	
        		if($(this).attr("href").indexOf("http")<0){
        			$(this).attr("href", TGT3P.config.URLs.base+$(this).attr("href"))
        		}	        	
        	})
        })
		//need to call equal heights from Target Header controller
		//Target.controller.header.equalHeights(Target.controller.header.heightParam);
		
		//to update form action
		$("form#Search").attr('action', TGT3P.config.URLs.base+"/s");
    }
	
	/**
	* Check the JSON response compatible version
	*
	*/
	function checkCompatibleVersion(categoryarr) {
		
		var oldJson = mergedJson = 0, flag = false;
		
		$.each(categoryarr, function(key, obj) {
			var keys = Objectkeys(obj);
			oldJson	= $.inArray("col1", keys);
			mergedJson	= $.inArray("columns", keys);
			if( oldJson >=0 && mergedJson >=0 ) { //invoke new
				flag = false;
			} else if ( oldJson >=0 && mergedJson === -1 ) { //invoke old
				flag = true;
			} else if ( oldJson === -1 && mergedJson >=0 ) { //invoke new
				flag = false;				
			}
			return false;
		});
		return flag;
	}
	
	/**
	* Return keys in an object interms of array
	* @param Object
	*/
	
	function Objectkeys(object) {
		var results = [];
		for (var property in object)
		  results.push(property);
		return results;
	}
	
	
	/**
     * Builds a list element of subcategories from provided data object
     * @param Object category Object
     * @return constructed css classname with active columns ex: column-1 
     **/

	function getActiveColumnsCount(obj) {
		var count = 0, col;
		if(typeof obj === "object") {
			col = obj.columns ? obj.columns : [];
			if( col.length > 0 ) {
				$.each(col, function(key, valueObj) {
					var type = valueObj.type ? valueObj.type : "";
					var cols = valueObj.contents ? valueObj.contents : [];
					if(type === "list" && cols.length > 0) {
						count++;
					}
				});
			}
		}
		count = (count ==0)? 1 : count;		
		return "column-"+count;
	}
	
    /**
     * Builds a list element of subcategories from provided data object
     * @param Object subCatData
     * @return HTMLElement
     **/
    function createSubCategoryList(subCatData) {
        var subCat = null;
        var subCatLink = null;
        var subCatItem = null;
        var metadata = null;
		var childCat = null;		
        var subCatList = $('<ul>');		
        for (var i = 0; i < subCatData.length; i++)
        {
            subCat = subCatData[i];
            subCatItem = $('<li>');
            metadata = getCategoryMetadata(subCat);
            subCatLink = createCategoryLink(metadata);
			childCat = (subCat.child_categories !== undefined) ? subCat.child_categories : null;			
			
            if(!subCatLink.attr('href') && i != 0) {
                subCatList.append('<div class="menu-seperator"></div>');
            }
            subCatItem.append(subCatLink);
			if(childCat) {
				subCatItem.append(createNLevelCategory(metadata.childCat));
			}
			if(subCatItem) {
				subCatList.append(subCatItem);
			}
        }
        return subCatList;
    }

	function createNLevelCategory(obj) {
	
		var len = function(obj) {
					var L=0;
					$.each(obj, function(i, elem) { L++; });
					return L;
				};
		var catList = $('<ul>');
		if(len(obj.contents) > 0) {
			//console.log("inside if" +obj.contents);			
			$.each(obj.contents, function(key,objValue) {
				//console.log(key +"<==>"+ objValue.desc);
				var _catItem = $('<li>');
				var _metadata = getCategoryMetadata(objValue);
				var _catLink = createCategoryLink(_metadata);
				_catItem.append(_catLink);
				catList.append(_catItem);
			});
		}
		return catList;
	}
	
    /**
     * Creates a main navigation category element from provided category data
     * @param Object metadata - category metadata
     * @return HTMLElement
     **/
    function createMainCategoryElement(metadata, index) {
        var mainLink = null;
        var mainCatElement = null;
		var calculatePos = function(elem, pos) {		
			var leftPos,TotWi,EleWi,rightPos;
			if(elem) {
				if(isredCard){
					leftPos = Math.round(elem.position().left)-140; 
					elem.find(".column-4,.column-3").css('left',-leftPos);				
				}
				leftPos	= Math.round(elem.position().left); 
				TotWi	= $("#Core").width();
		    	EleWi	= elem.width();
		    	rightPos= TotWi-(leftPos+EleWi);
				$(".leftmenu .column-4,.leftmenu .column-3").css('left',-(leftPos-66));	
				$(".rightmenu .column-4,.rightmenu .column-3").css('right',-(rightPos-3));
			}
		}		
		
        mainCatElement = $('<li>');
        if(index > 5)
        {		
            mainCatElement.addClass('rightmenu');
			mainCatElement.attr('linktype', 'rightmenu');
        } else {
            mainCatElement.addClass('leftmenu');
			mainCatElement.attr('linktype', 'leftmenu');
        }
        mainCatElement.bind('mouseenter', function() {
			var $self = $(this);				
			// Target.controller.header.state(this);
			$(this).parent().find("li").each(function(){$(this).attr("class",$(this).attr("linktype"))})
			$("#MainMenu li .hover").hide();
			if(isredCard){
				if($(this).hasClass("leftmenu")) {
					$(this).addClass("listHoverMenu");
					calculatePos($self, 'left');
				} else {
					$(this).addClass("listRightHoverMenu");	
					calculatePos($self, 'right');	
				}
			}
				$(this).addClass("showMenu");
				$(this).find(".hover").show();
			
			 });
        mainLink = createCategoryLink(metadata);
        mainCatElement.append(mainLink);
        mainCatElement.append('<div class="tgt_gn_acc_title"><a href="#mainBody">Expand '+metadata.text+'</a></div>');
        return mainCatElement;
    }

    /**
     * Creates a link for a category or subcategory
     * @param Object metadata
     * @return HTMLElement
     **/
    function createCategoryLink(metadata) {
        catLink = $(document.createElement('a'));
        catLink.attr('title', metadata.desc);
        if(metadata.href) {
            catLink.attr('href',  metadata.href);
            catLink.html(metadata.text);
            return catLink;
        }
        else
        {
            var strong = $(document.createElement('strong'));
            strong.html(metadata.text);
            return strong;
        }
    }

    /**
     * Builds an object containing category metadata
     * @param Object a category object from the API
     * @return Object
     **/
    function getCategoryMetadata(catObj) {
        var md =  {href: '', text: '', desc: '', childCat: ''};
        try{
            md.href = catObj.location;
        } catch(e) { }
        try{
            md.text = catObj.text;
        } catch(e) { }
        try{
            md.desc = catObj.desc;
        } catch(e) { }
		try{
            md.childCat = (catObj.child_categories !== undefined) ? catObj.child_categories : ""; 
        } catch(e) { }		
		
        return md;
    }

    /**
     * Creates an element for a subcategory
     * @param Object category metadata
     * @return HTMLElement
     **/
    function createSubcategoryElement(metadata) {
            var subCat = null;
            var subLink = null;
            subCat = $(document.createElement('li'));
            subCat.addClass('leftmenu');
            subLink = $(document.createElement('a'));
            subLink.attr('href',  metadata.href);
            subLink.attr('title', metadata.desc);
            subLink.html(metadata.text);
            return subCat;
    }


    /**
     * Creates Global Promise HTML
     * @param Object json
     * @return void
     **/
    function loadGlobalPromise(json) {
        var promise = json.global_promise.contents;
        var promiseUtility = document.createElement('div');
        promiseUtility.id = 'TGT3PpromiseUtility';
        $(promiseUtility).append(promise);
        var utilityData = json.utility_categories;
        var utilityList = createUtilityList(utilityData);
/*
*/
        $(promiseUtility).append(utilityList);
        $('#Header').append(promiseUtility);
        //$('#Header div:last').prepend(promise);
		$("body").undelegate(".grdaLink", "click");
    }



    /**
     * Creates utility nav HTML
     * @param Object data - global promise data from Category API
     **/
    function createUtilityList(data) {
        var utilityList = $('#ShopMenu');
        var miniCart = $('#mini-cart-wrapper');
        var link = null;
        var listItem = null;
        var navItem = null;
        $('.shop-menu-item').remove();
		targetReg = '<div class="section"><span>Target Wedding registry</span><p class="messageReg">Home of happily ever after</p><p>			<a href="http://www.target.com/WedRegistryPortalView" title="find">find</a> | <a title="create" href="http://www.target.com/RegistryListMenuCmd?registryType=WD&amp;catalogId=10051&amp;linkAction=create" class="grdaLink" grda="http://www.target.com/RegistryListMenuCmd?registryType=WD&amp;catalogId=10051&amp;linkAction=create">create</a> | <a title="manage" href="http://www.target.com/RegistryListMenuCmd?registryType=WD&amp;catalogId=10051&amp;linkAction=manage" class="grdaLink" grda="http://www.target.com/RegistryListMenuCmd?registryType=WD&amp;catalogId=10051&amp;linkAction=manage">manage</a></p></div><div><span>Target Baby registry</span><p class="messageReg">Your one stop cutest-of-all shop</p><p><a href="http://www.target.com/BabyRegistryPortalView" title="find">find</a> | <a title="create" href="http://www.target.com/RegistryListMenuCmd?registryType=BB&amp;catalogId=10051&amp;linkAction=create" class="grdaLink" grda="http://www.target.com/RegistryListMenuCmd?registryType=BB&amp;catalogId=10051&amp;linkAction=create">create</a> | <a title="manage" href="http://www.target.com/RegistryListMenuCmd?registryType=BB&amp;catalogId=10051&amp;linkAction=manage" class="grdaLink" grda="http://www.target.com/RegistryListMenuCmd?registryType=BB&amp;catalogId=10051&amp;linkAction=manage">manage</a></p></div><div class="recentlyViewed"><input type="hidden" value="http://www.target.com/RegistryGiftGiverCmd?" name="newListGGVURL" /><span>recently viewed registries</span></div>';
		targetList= '<div class="j-list-usertype j-guest hidden"><span>Target Lists makes it easy!</span><p class="makeItEasy">to share, to organize, to shop!<a href="https://www-secure.target.com/EverestLoginView?catalogId=10051&amp;registryView=TargetListPortalView">sign in</a>	or <a href="https://www-secure.target.com/GuestRegistration?catalogId=10051">create an account</a> to get started.</p><p><a href="http://www.target.com/TargetListPortalView" class="createListLink">						create a list</a></p></div><div class="j-list-usertype j-registered hidden"><ul class="yourList"><li class="seeallList"><a href="http://www.target.com/TargetListPortalView"class="seeAllLists">							see all your lists</a></li><li class="createNewList"><a href="" grda="http://www.target.com/TargetListCreateView?action=CreateTargetList&operation=openModal&overlayId=CreateTargetList" class="grdaLink newList" title="create a new list.">create a new list</a></li></ul></div><input type="hidden" value="http://www.target.com/TargetListGiftGiverCmd?registryType=OT" name="newListGGVURL" /><ul class="recentlyViewedLists"><p class="findList"><span>recently viewed lists</span></p></ul><p class="findList"><a href="http://www.target.com/TargetListPortalView" title="find">find a list</a></p>';
        for (var i = 0; i < data.length; i++)
        {
            navItem = data[i];
            listItem = document.createElement('li');
            listItem.className = 'shop-menu-item';
            var link = null;
            if(navItem.location.search(/Registry|TargetList/) > -1) {
                link = $('<a href="'+navItem.location+'" class="grdaLink grdaHover" grdalink="'+navItem.svc+'" grda="'+navItem.location+'" title="'+navItem.text+'">'+navItem.text+'</a>');
                $(listItem).append(link);
                if(navItem.location.search(/TargetList/) > -1) {
                    $(listItem).append('<div class="hover" id="guest">'+targetList+'</div>'); //do this for lists
                }
                else
                {
                    $(listItem).append('<div class="hover">'+targetReg+'</div>'); //do this for registries
                }				
            }
            else
            {
                link = $(document.createElement('a'));
                link.attr('href', navItem.location);
                link.attr('title', navItem.text);
                link.attr('innerHTML', navItem.text);
                $(listItem).append(link);
            }
            $(listItem).insertBefore(miniCart);
        }
        // bind for global hover menu
		 /*
        utilityList.delegate(".grdaHover", "mouseenter", function (e) {
            var self = this,
                type = "",    
                obj     = {context: self, etype: "hover"};
            
            var uSerialize = Target.controller.header.unSerialize($(this).attr("grda").split("?")[1]);
            type = (typeof uSerialize.registryType != "undefined") ? uSerialize.registryType : "";
            
            Target.controller.header._setGRDALink(false);
            Target.controller.grda.HandleGRDAResponse(obj, function (response) {
                //Here needs to ne differentiate the type and retrieve the cookie
                if(type === "L" || type === "R") {
                    Target.controller.grda._updateRecentlyViewed(type);
                }
                Target.controller.header._setGRDALink(true);
                Target.controller.header.getPhoto(response.listIds, response.evenTypes, response.photoKeys);
                Target.controller.header._removeCookie();
            });
        });
		 */
        return utilityList;
    }

    //Return public methods and properties
    return {
        categoryCallback: function (json) {
            loadGlobalPromise(json);
            loadCategoryNav(json);
        },
        loadNavContent: function () {
            getCategories(); 
        }
    };
})($);
//load navigation when the DOM is ready
$(document).ready(function() {
    TGT3P.nav.navigationLoader.loadNavContent();
	$("#MainMenu").mouseleave(function(){$(".hover:visible").hide();})
});

//catalog.target.com fixes
/*
document.getElementById("Search").action = document.getElementById("Search").action.replace("catalog", "www");
document.getElementById("mini-cart-icon").href = document.getElementById("mini-cart-icon").href.replace("catalog", "www");
$.validator = function(){};
*/