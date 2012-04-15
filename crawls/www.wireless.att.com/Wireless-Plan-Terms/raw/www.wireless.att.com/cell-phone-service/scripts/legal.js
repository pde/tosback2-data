//Get value of specific field from querystring 
function querySt(field) {
	var query = window.location.search.substring(1);
	var pairs = query.split("&");
	for (var i=0;i<pairs.length;i++) {
		q = pairs[i].split("=");
		if (q[0] == field) {
			return q[1];
		}
	}
}
var termsKey = querySt("q_termsKey");
var termsName = querySt("q_termsName");

// Show only Section including subSection jumplinks
function showOnlySection(id) {
	var sectionHeader = document.getElementById(id+"_sectionHeader").innerHTML; // Replace jumplinked Section Header Title with Static Header Title
	document.getElementById(id+"_sectionListHeader").innerHTML = sectionHeader; // Section Header title
	document.title = sectionHeader.replace("&amp;", "&") +" - " + termsName.replace(/\+/g, " ");
	var divs = document.getElementsByTagName('div');
	// For each DOM <div> nodes
	for (var i = 0, ele; ele = divs[i]; i++) {
		// Hide divs with following classNames that do not match following ids
		if ((ele.className == "list" || ele.className == "section" || ele.className == "hide" || ele.className == "sectionHeader") && (ele.id != id+"_list" && ele.id != id+"_section")) {
			if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].style.display="none";// show/hide
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].display = 'none';
				} else { // IE 4
					document.all.divs[i].display = 'none';
				}
			}
		} else if (ele.id == "breadcrumb") { // Show breadcrumb div and add sectionHeader title to breadcrumb trail
			document.getElementById("breadcrumb_section_sub").innerHTML = sectionHeader;
			if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].style.display="block";// show/hide
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].display = 'block';
				} else { // IE 4
					document.all.divs[i].display = 'block';
				}
			}
		}
	}
}
// Show only subSection or subSubSection
function showOnlySubSection(id,subsub) { // subsub parameter is set to 'subsub' only for subSubSection function calls
	// Get Section/subSection/subSubSection Headers Titles and IDs for breadcrumb trail
	if (subsub == 'subsub'){ // subSubSection
		var sectionID = document.getElementById(id+"_subSubSection").parentNode.parentNode.parentNode.parentNode.id.replace("_section","");
		var sectionHeaderID = document.getElementById(id+"_subSubSection").parentNode.parentNode.parentNode.parentNode.id.replace("_section","_sectionHeader");
		var sectionHeader = document.getElementById(sectionHeaderID).innerHTML;
		var subSectionID = document.getElementById(id+"_subSubSection").parentNode.parentNode.id.replace("_subSection","");
		var subSectionHeaderID = document.getElementById(id+"_subSubSection").parentNode.parentNode.id.replace("_subSection","_subSectionHeader");
		var subSectionHeader = document.getElementById(subSectionHeaderID).innerHTML;
		var subSubSectionHeader = document.getElementById(id+"_subSubSectionHeader").innerHTML;
		var breadcrumb = "<a href='index.jsp?section=" + sectionID + "&q_termsKey=" + termsKey + "&q_termsName=" + termsName + "'>" + sectionHeader + "</a> > " + subSectionHeader + " > " + subSubSectionHeader;
		document.title = subSubSectionHeader.replace("&amp;", "&") +" - " + termsName.replace(/\+/g, " ");
	} else { // subSection
		var sectionID = document.getElementById(id+"_subSection").parentNode.parentNode.id.replace("_section","");
		var sectionHeaderID = document.getElementById(id+"_subSection").parentNode.parentNode.id.replace("_section","_sectionHeader");
		var sectionHeader = document.getElementById(sectionHeaderID).innerHTML;
		var subSectionHeader = document.getElementById(id+"_subSectionHeader").innerHTML;
		var breadcrumb = "<a href='index.jsp?section=" + sectionID + "&q_termsKey=" + termsKey + "&q_termsName=" + termsName + "'>" + sectionHeader + "</a> > " + subSectionHeader;
		document.title = subSectionHeader.replace("&amp;", "&") +" - " + termsName.replace(/\+/g, " ");
	}
	
	var divs = document.getElementsByTagName('div');
	// For each DOM <div> nodes
	for (var i = 0, ele; ele = divs[i]; i++) {
		// Hide divs with following classNames that do not match following ids
		if ((ele.className == "list" || ele.className == "section" || ele.className == "sectionHeader" || ele.className == "subSectionHeader" || ele.className == "subSection" || ele.className == "subSubSection" || ele.className == "hide" || ele.className == "hideSub") && (ele.id != id+"_list" && ele.id != id+"_section" && ele.id != id+"_subSection" && ele.id != id+"_subSubSection" && ele.id != id+"_subSectionHeader")) {
			if (ele.className == "subSubSection" && ele.parentNode.parentNode.id == id+"_subSection"){
				//For subSections with Child subSubSections, do not hide subSubSections
			}
			else if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].style.display="none";// show/hide
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].display = 'none';
				} else { // IE 4
					document.all.divs[i].display = 'none';
				}
			}
		// Show the subSection parent Section div
		} else if (ele.className == "subSection" && ele.id == id+"_subSection"){
			if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].parentNode.parentNode.style.display="block";// show/hide
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].parentNode.parentNode.display = 'block';
				} else { // IE 4
					document.all.divs[i].parentNode.parentNode.display = 'block';
				}
			}
		// Show the subSubSection parent subSection and parent Section
		} else if (ele.className == "subSubSection" && ele.id == id+"_subSubSection"){
			if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].parentNode.parentNode.style.display="block";// show/hide
				divs[i].parentNode.parentNode.parentNode.parentNode.style.display="block";
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].parentNode.parentNode.display = 'block';
					document.layers[divs[i]].parentNode.parentNode.parentNode.parentNode.display = 'block';
				} else { // IE 4
					document.all.divs[i].parentNode.parentNode.display = 'block';
					document.all.divs[i].parentNode.parentNode.parentNode.parentNode.display = 'block';
				}
			}
		} else if (ele.id == "breadcrumb") { // Show breadcrumb div and add sectionHeader, subSectionHeader and subSubSectionHeader titles to breadcrumb trail
			document.getElementById("breadcrumb_section_sub").innerHTML = breadcrumb;
			if (document.getElementById){ // DOM3 = IE5, NS6
				divs[i].style.display="block";// show/hide
			} else {
				if (document.layers){ // Netscape 4
					document.layers[divs[i]].display = 'block';
				} else { // IE 4
					document.all.divs[i].display = 'block';
				}
			}
		}
	}
}
//Add querystrings to related Link url
function relatedLink(id){
	window.location.href = "index.jsp?q_termsKey=" + termsKey + "&q_termsName=" + termsName + "#" + id;	
}