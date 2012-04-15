function WaterMarkBusiness(txt, evt) {
    var defaultText = "Business Name, Type, URL, Phone";
    if (txt.value.length == 0 && evt.type == "blur") {
        txt.style.color = "gray";
        txt.value = defaultText;
    }

    if (txt.value == defaultText && evt.type == "focus") {
        txt.style.color = "black";
        txt.value = "";
    }
}

function WaterMarkPostal(txt, evt) {
    var defaultText = "City, State or Postal Code";
    if (txt.value.length == 0 && evt.type == "blur") {
        txt.style.color = "gray";
        txt.value = defaultText;
    }

    if (txt.value == defaultText && evt.type == "focus") {
        txt.style.color = "black";
        txt.value = "";
    }
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function getUrlEncode(location) {
    location = trim(location);
    location = location.replace("/", " ");
    location = location.replace("\\", " ");
    location = encodeURI(location);
    location = location.replace(/%20/gi, "+");
    return location;
}

function searchRedirect() {
	//edit url to equal the current BBB's search page
	if( !document.getElementById('local-url') ) {
		var url = "www.bbb.org/us/find-business-reviews/external"; // production national
	} else {
		var url = document.getElementById('local-url').value + "/find-business-reviews/external" // production local, edit domain to local domain
    }
    var searchParams;
    var searchIndex = document.getElementById("txtSearchbox").value.substr(0,13);
    if (searchIndex == "Business Name")
        document.getElementById("txtSearchbox").value = "";
    var searchLocation = document.getElementById("txtSearchlocation").value.substr(0,5);
    if (searchLocation == "City,")
        document.getElementById("txtSearchlocation").value = "";
    var isAccreditedSearch = document.getElementById("chbAccredited").checked;
    if (searchIndex == "")
        return;
    searchIndex = document.getElementById("txtSearchbox").value;
    searchLocation = document.getElementById("txtSearchlocation").value;
    searchIndex = trim(searchIndex);
    searchIndex = searchIndex.replace(/ /gi, "+");
    searchIndex = searchIndex.replace(/-/gi, "+");
    searchIndex = searchIndex.replace(/,/gi, "+");
    searchIndex = searchIndex.replace(/%/gi, "+");
    searchIndex = searchIndex.replace(/_/gi, "+");
    searchIndex = searchIndex.replace(/[.]/gi, "");
    searchIndex = searchIndex.replace(/&/gi, "-and-");

    searchIndex = encodeURI(searchIndex);
    searchParams = "/" + searchIndex;
    if (searchLocation != "")
        searchParams += "/" + getUrlEncode(searchLocation);

    if (isAccreditedSearch)
        searchParams += "/bbb-accredited";

    if (searchParams != "")
        url += searchParams + "/";

    url = "http://" + url;
    
    window.location.assign(url);
}
