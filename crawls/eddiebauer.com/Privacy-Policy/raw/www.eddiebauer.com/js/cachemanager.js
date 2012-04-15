function createCacheObject() {
    var cacheObject = new Object();
    cacheObject.contentKeyNamesArray = new Array();
    cacheObject.set = set;
    cacheObject.get = get;
    cacheObject.displayAll = displayAll;
    cacheObject.removeContent = removeContent;
        function  set(contentKey,value) { cacheObject[contentKey] = value;
        cacheObject.contentKeyNamesArray[cacheObject.contentKeyNamesArray.length] = contentKey;
        }
        function  get(contentKey) { return cacheObject[contentKey];}
     function displayAll() {
         var displayContent = '';
         if (cacheObject.contentKeyNamesArray.length > 0) {
             for (var index=0; index < cacheObject.contentKeyNamesArray.length ; index++) {
                 var keyName = cacheObject.contentKeyNamesArray[index];
                 displayContent = displayContent + keyName+"="+cacheObject.get(keyName)+"**";
             }
         }
         return displayContent;
     }

    function removeContent(contentKey) {
        var location = -1;
        for (var index=0; index < cacheObject.contentKeyNamesArray.length; index++) {
            if (contentKey == cacheObject.contentKeyNamesArray[index] ) {
                location = index;
                break;
            }
        }        
        if (location != -1) {
            cacheObject.contentKeyNamesArray.splice(location,1);
            delete cacheObject[contentKey];
        }
    }
    return cacheObject;
};

function createCacheManager() {
	var cacheManagerObj = new Object();
	cacheManagerObj.cacheKeysArray = new Array();
	cacheManagerObj.cacheKeysLength = 0; //initial it is empty
	cacheManagerObj.setCache = setCache;
	cacheManagerObj.getCache = getCache;
	cacheManagerObj.getCacheContent = getCacheContent;
	cacheManagerObj.isCacheAvailable = isCacheAvailable;
	cacheManagerObj.displayCacheContents = displayCacheContents;
	cacheManagerObj.removeCache = removeCache;
	cacheManagerObj.removeCacheContent = removeCacheContent;

	function setCache(cacheKey,cacheContentKey,cacheContentObj) {
          // Check is there any existing cache for this cacheKey ?
          var cacheObj = cacheManagerObj.getCache(cacheKey);
          if (cacheObj == null || cacheObj == undefined) {
              // create new cache object.
              cacheObj = createCacheObject();
              cacheObj.set(cacheContentKey, cacheContentObj);
              cacheManagerObj.cacheKeysArray[cacheManagerObj.cacheKeysLength] = cacheKey;
              cacheManagerObj.cacheKeysLength = cacheManagerObj.cacheKeysLength + 1;
              cacheManagerObj[cacheKey] = cacheObj;
          } else {
              // get the existing cache object, and set this cacheContentKey, and cacheContentObj.
              cacheObj.set(cacheContentKey, cacheContentObj);
          }
        };
      function getCache(cacheKey) { return cacheManagerObj[cacheKey]; }
      function getCacheContent(cacheKey, cacheContentKey) {
            cacheObj = cacheManagerObj.getCache(cacheKey);
            if (cacheObj != undefined)
                return cacheObj.get(cacheContentKey);
            else
                return null;
        };
    function removeCache(cacheKey) {
        var location = -1;
        if (cacheManagerObj.cacheKeysLength > 0 ) {
            for (var index=0; index < cacheManagerObj.cacheKeysLength; index++) {
                if (cacheKey == cacheManagerObj.cacheKeysArray[index]) {
                    location = index;
                    break;
                }
            }
        }

        if (location != -1) {
          cacheManagerObj.cacheKeysArray.splice(location);
          delete cacheManagerObj[cacheKey];
          cacheManagerObj.cacheKeysLength = cacheManagerObj.cacheKeysLength - 1;
       }
    };
    function removeCacheContent(cacheKey, cacheContentKey) {
        cacheObj = cacheManagerObj.getCache(cacheKey);
        if (cacheObj != undefined) {
            cacheObj.removeContent(cacheContentKey);
        }
    }
      function isCacheAvailable(cacheKey, cacheContentKey) {
           if (cacheManagerObj.getCacheContent(cacheKey, cacheContentKey) == null) {
               return false;
           }
           else {
               return true;
           }
       }
       function displayCacheContents() {
           var displayContent = '';
           if (cacheManagerObj.cacheKeysLength > 0 ) {
               for (var index=0; index < cacheManagerObj.cacheKeysLength; index++) {
                   cacheKey = cacheManagerObj.cacheKeysArray[index];
                   cacheObj = cacheManagerObj.getCache(cacheKey);
                   displayContent = displayContent + cacheObj.displayAll();
               }
           } else {
               displayContent = "No Cache Contents available";
           }
           return displayContent;
       }
    return cacheManagerObj;
};

var globalCacheManagerObj;
function getCacheManager() {
    if (globalCacheManagerObj == undefined) {
        globalCacheManagerObj = createCacheManager();
    }
	return globalCacheManagerObj;
}



