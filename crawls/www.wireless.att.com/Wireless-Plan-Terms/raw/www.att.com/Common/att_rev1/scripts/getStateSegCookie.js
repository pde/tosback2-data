var stateStr = "";
var segStr   = "";
var allstates = new Array ("arkansas","california","connecticut","illinois","indiana","kansas","michigan","missouri","nevada","ohio","oklahoma","texas","wisconsin");

function getTopCookie(name) {
	var dc = document.cookie;
    var cname = name + "=";
    var clen = dc.length;
    var cbegin = 0;
    while (cbegin < clen) {
	    var vbegin = cbegin + cname.length;
		if (dc.substring(cbegin, vbegin) == cname) {
	        var vend = dc.indexOf (";", vbegin);
            if (vend == -1) vend = clen;
	            return unescape(dc.substring(vbegin, vend));
            }
            cbegin = dc.indexOf(" ", cbegin) + 1;
            if (cbegin== 0) break;
        }
        return null;
}

function attLocalizationCookie()
{
	var localStr = getTopCookie("attPersistantLocalization");
	//alert('cookie is ' +  localStr);
	if ((localStr != null) && (localStr != "")) {
		var localArr = localStr.split("|");
		var localArr_length =localArr.length;
		for (i=0; i<localArr_length; i++) {
			if (localArr[i].indexOf("state") > -1) 
			{
				var stateArr = localArr[i].split("=");
				stateStr = stateArr[1];
				stateStr = stateStr.toLowerCase();
			}
			if (localArr[i].indexOf("segment") > -1) 
			{
				var stateArr = localArr[i].split("=");
				segStr = stateArr[1];
				segStr = segStr.toLowerCase();
			}

		}
	}
}
attLocalizationCookie();
//alert("state is : "   + stateStr);
//alert("segment is : " + segStr  );
var valid_state=false;
for (var i =0 ; i <= 12 ; i++)
{
	if (allstates[i].indexOf(stateStr) != -1)
	{
		//alert("state match : " + stateStr);
		valid_state = true;
		break;
	}
}

