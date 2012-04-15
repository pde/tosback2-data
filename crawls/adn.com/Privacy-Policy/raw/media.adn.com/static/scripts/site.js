// search **********************************************************************
/*
function searchFormSubmit(form) {
        if (form.aff.value == 'archives' || form.aff[1].checked == true) {
                window.location = "http://www.newslibrary.com/nlsearch.asp?search_mode=all&action=search&date_mode=year&year=last+180+days&sort=d%3Ah&nitems=10&region=mh&dbquery=" + form.keywords.value;
                return false;
        } else if (form.aff[2].checked == true) {
                window.location = "http://www.miamiherald.com/cgi-bin/mi/overture/overture.pl?Keywords=" + form.keywords.value;
                return false;
        }
        return true;
}
*/
// end search ******************************************************************
function today_string() {
	// dependant on date functions defined in mi-utilities.js
	var today = new Date();
	return today.getDayString()+', '+today.getMonthString()+' '+today.getDate()+', '+today.getFullYear();
}

// ppRichMedia *****************************************************************

function ppRichMedia(object, type) {
	
	// default flv playback
	var width = 470;
	var height = 520; 
	
	if (type == "mp3")
	{
		width = 340;
		height = 180;
	}
	
	var left = window.screen.width/2 - width/2;
	var top = window.screen.height/2 - height/2;
		
	window.open(object.href,'mh' + type ,'width=' + width + ',height=' + height + ',resizable=no,left=' + left + ',top=' + top + ',screenx=' + left + ',screeny=' + top);
	
	return false;
}

// setColWidth *****************************************************************

function setColWidth(leftRightWidth) {
	document.write("<style type=\"text/css\">\n");
	for ( var i = leftRightWidth.length - 1; i >= 0; i--)
	{
		if(i == (leftRightWidth.length - 1))
		{
			document.write("div.left_half { width: " + leftRightWidth[i][0] + "%; }\n");
			document.write("div.right_half { width: " + leftRightWidth[i][1] + "%; }\n");
		}
		else {
			document.write("div.Left_" + (i+1) + " { width: " + leftRightWidth[i][0] + "%; }\n");
			document.write("div.Right_" + (i+1) + " { width: " + leftRightWidth[i][1] + "%; }\n");
		}
	}
	document.write("</style>\n");
}



//***** Added for the Yahoo searchbar redirect between yahoo results and standard adn results *****
function searchFormSubmit(form) {

// ADN does not have a newsbank archive
//     if (form.aff.value == 'archives' || form.aff[1].checked == true) {
// Options are still under development.
//         window.location = "http://www.newslibrary.com/nlsearch.asp?search_mode=all&action=search&date_mode=year&year=last+180+days&sort=d%3Ah&nitems=10&region=mh&dbquery=" + form.keywords.value;
//             return false;
//     } 
//     else 
      if (form.aff[2].checked == true || form.aff.value == 'web') {
         var encoded_keywords = encodeURIComponent(form.keywords.value);
         var section_num = '2579';
         var url_version = 'ysr';
         var params = 'product=Yahoo%2COverture&' +
                      'collection=WEB&' +
                      'live_template=http%3A%2F%2Fwww.adn.com%2F' + section_num + 
					'%2Fv-' + url_version + '%2Findex.html&' + 
                      'error_template=http%3A%2F%2Fwww.adn.com%2F' + section_num + 
					'%2Fv-yerr%2Findex.html&' +
                      'preview_template=http%3A%2F%2Fpreview.adn.com%2F' + 
					section_num + '%2Fv-' + url_version + '%2Findex.html&' +
                      'results_per_page=10' +
		      '&prop_related=1&prop_dym=1';

         window.location = "http://search2.adn.com/search-bin/search.pl.cgi?sf_Keywords=" 
			+ encoded_keywords + '&' + params;
         return false;
     }
     return true;
 }
//***** Added for the Yahoo searchbar redirect between yahoo results and standard adn results *****

//***** Added for the Yahoo searchbar redirect between yahoo results and standard adn results ***** 
function getParams(params) {
   var Params = new Object ();
   if ( ! params ) return Params; // return empty object
   var Pairs = params.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;

}
//***** Added for the Yahoo searchbar redirect between yahoo results and standard adn results *****



