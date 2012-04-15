// JavaScript Document
// POPUP FUNCTIONS (NEED FOR OTHER FUNCTIONS TO WORK)
function rawPopUp(url, width, height, features, target) {

   // main raw popup
   // written by Peter Mahnke 20 May 2004
   //
   // attempt to clean up all random js popups

   var u = url;
   var t = target;
   var w = width;
   var h = height;
   var f = features;

  // return if there is no URL
  if (u == null) {
      return false;
  }

   // set up default values if none passed
   t = t ? t : "_blank";
   w = w ? w : 750;
   h = h ? h : 550;
   f = f ? f : "resizable=yes,scrollbars=yes,toolbar=no";

   // find middle x and y position of the screen
   var left = (window.screen.width - w)/2;
   var top  = (window.screen.height - h)/2;

   var newWin=null;
   var settings = 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left + ', ' + f;

   newWin = window.open(u, t, settings);
   newWin.focus();
   return(newWin);

}

function openResultHome(href) {
// opens documents from homepage with no referrer (the referrer is hardcoded in hpg temp)
rawPopUp(href,'798','569','resizable=no,scrollbars=yes,menubar=yes,resizable=yes,status=yes','_blank');
return false;
}

function openResult(href) {
// appending referrer for webtrends
// opens documents from anywhere on the site
href = href + "&amp;ref=g_noreg";
return openResultHome(href);
}

//OpenDocResult - popup from homepage

function openDocResult(href){
href =  href + "&amp;ref=g_emalert";
return openResultHome(href);
}

function openDocPopup(id){
href =  "/DisplayDocument?id=" + id + "&amp;ref=g_emalert";
return openResultHome(href);
}


function openDocFromDoc(href) {
// appending referrer for webtrends
href = href + "&amp;ref=g_fromdoc";

// opens a research document from within another research document
rawPopUp(href, '798', '569', 'scrollbars=yes,menubar=yes,resizable=yes,status=yes','_blank');
return false;
}

function openBio(href) {
// opens Analysts Bio
rawPopUp(href, '579', '450', 'scrollbars=yes,resizable=yes','_blank');
return false;
}

function popUpQuadrant(id){
// opens MQ
rawPopUp('/DisplayDocument?doc_cd=' + id, '798', '569', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes','_blank');
return false;
}


// select jumplink function opens in same window
function doSel(obj) {
     for (i = 1; i < obj.length; i++)
        if (obj[i].selected == true)
           eval(obj[i].value);
}


// select jumplink function opens in new window
function doSel_a(obj) {
			//open page according to selected value
		   window.open(obj.options[obj.selectedIndex].value,'_blank');
} 


