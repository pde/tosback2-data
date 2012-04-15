<!--
/*
var attribute_set = "LCI Articles";
var idSeperator = "_";

// *********************************************************************************************************************
// ***************************************Do not change the code below this line.***************************************
// *********************************************************************************************************************

var crrItemID = getCrrItemId();
var rn = Math.floor(Math.random() * new Date().getMilliseconds());
attachScript("http://media.easy2.com/myo_crr/easy2_myo_crr_serverscript.aspx?aSet=" + attribute_set + "&id=" + escape(crrItemID) + "&refreshFile=n&rn=" + rn + "&rpp=5&page=1&sort=n2o&reffcn=y", "crr_init();");

function attachScript(url, onload) {
    //detect if script is already there
    var scriptExists = false;
    var heads = document.getElementsByTagName('head');
    //iterate through the child nodes of <head>
    for (var i = 0; i < heads[0].childNodes.length; i++) {
        //find the script tag
        if (heads[0].childNodes[i].nodeName.toLowerCase() == 'script') {
            //find the script tag we want to remove
            if (heads[0].childNodes[i].src == url) { scriptExists = true;}
        }
    }

    if(!scriptExists){
	var js=document.createElement('script');
    js.setAttribute('type','text/javascript');
    js.setAttribute('src',url);
    if(onload) { js.text = onload; }
	var head = document.getElementsByTagName('head')[0];
    head.appendChild(js);
    }
}


function getCrrItemId() {
  var itemID = '';
	var url = unescape(window.location.href.toString());
	var urlparts = url.split(idSeperator);

	if(urlparts.length > 1) {
        itemID = unescape(urlparts[urlparts.length - 2]);
        if(unescape(urlparts[urlparts.length - 3]).search(/Blog/g) > 0) {
            attribute_set = "LCI Blogs";
        } else {
            attribute_set = "LCI Articles";
        }
	}

	return itemID
}

//-->
*/
/* Above code commented out by jjohnson | 9/27/10 to remove easy 2 R&R on article general to prepare for future bazaarvoice integration */

(function(){
	
	$('#article-rail').find('#easy2_myo_crr_quickform').remove();
	
})();