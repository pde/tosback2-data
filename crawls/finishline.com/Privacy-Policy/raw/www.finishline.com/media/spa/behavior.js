/**
 *  This is a quick function for extending (or merging) two objects. The baseObj
 *  basically absorbs all the properties of the newObj.
 *
 *  @param object baseObj
 *  @param object newObj
 *  @return object
 */
function extendObj(baseObj, newObj) {
    var prop;
    if (typeof baseObj == 'object' && typeof newObj == 'object') {
        for (prop in newObj) {
            if (newObj.hasOwnProperty(prop)) {
                baseObj[prop] = newObj[prop];
            }
        }
    }
    return baseObj;
}


/**
 *	This function will target an element containing a number and count
 *	it down to zero, incrementing every second.
 *
 *  @param string elementID The id attribute of the element which contains seconds.
 *	@param int    seconds
 */
function startTimer(elementID, seconds) {
	var el = document.getElementById(elementID)
        , i;

	if (el && seconds > 0) {
		el.innerHTML = seconds--;
		setTimeout(function(){
			startTimer(elementID, seconds);
		}, 1000);
	}
}


/**
 *  This is the default data that will show if the incoming spaData object is missing.
 */
var defaultSpaData = {
        pageTitle:  'Finishline.com',
        bodyCopy:   [
            'But, unfortunately, so is everyone else.',
            'Sit back, relax and count your lucky stars as the browser will automatically send you to your page as soon as there is an open spot.',
            'Happy Shopping!',
        ]
    }
    , i, htmlStr = '';

// overwrite default properties with the spaData object properties
if (typeof spaData != 'object') {
    var spaData = {};
}
spaData = extendObj(defaultSpaData, spaData);

// insert the HTML
$('head title').html(spaData.pageTitle);
for (i = 0; i < spaData.bodyCopy.length; i++) {
    htmlStr += '<p>' + spaData.bodyCopy[i] + '</p>';
}
$('#bodyCopyOnly').html(htmlStr);
