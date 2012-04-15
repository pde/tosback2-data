//Change This to cahnge the limit of the table widths
var WidthLimit = 470;
var currTableHTML = '';

function smartLinkTables() {
	tableize(false);
}

//open the popup
function popTable(intTable) {
	tableize(true, parseInt(intTable));
}

function getCurrTableHTML() {
	return currTableHTML;
}

//Firefox needs this annoying property defined!
function getOuterHTML(obj) {
	var attrs = obj.attributes;
	var str = "<" + obj.tagName;
	for (var i = 0; i < attrs.length; i++) {
		str += " " + attrs[i].name + "=\"" + attrs[i].value + "\"";
	}
	return str + ">" + obj.innerHTML + "</" + obj.tagName + ">";
}


function tableize(blnPopup, intTable) {
	var objColl = document.getElementsByTagName('TABLE');
	var objTable, objTableBody, width, j;
	for (var i=0; i<objColl.length; i++) {
		objTable = objColl[i];
		if (objTable.className == 'blacktbl' || objTable.className == 'blackpic') {	//Check the class to make sure we have the correct type of table

			if (blnPopup && (intTable == i)) {
				currTableHTML = objTable.outerHTML;
				if (currTableHTML == null) {
					currTableHTML = getOuterHTML(objTable);		//Thanks Firefox!
				}
				var objTablePop = window.open('/htmlchunks/rxlist_tablePopup.html', 'popRX', 'directories=no, location=no, menubar =no, resizable=yes, status=no, toolbar=no, width=787, height=560');
			} else {

				j = 0;
				while (objTable.childNodes[j].tagName != 'TBODY') {		//Get TableBody because Firefox doesn't work correctly with the table width
					j++;
				}
				objTableBody = objTable.childNodes[j];
				
				if (parseInt(objTableBody.clientWidth) == 0) {
					width = parseInt(objTable.offsetWidth);
				} else {
					width = parseInt(objTableBody.clientWidth);
				}
				
				//alert( objTable.scrollWidth  + '  ' + objTable.clientWidth + '  ' + objTable.offsetWidth + ' -B- ' + objTableBody.scrollWidth  + '  ' + objTableBody.clientWidth + '  ' + objTableBody.offsetWidth);
				
				if (width > WidthLimit) {
					if (objTable.className == 'blacktbl') {
						objTable.style.display = 'none';
						var objLink = document.createElement("A");
						objLink.href = 'javascript:popTable(' + i + ');';
						objTable.parentNode.insertBefore(objLink, objTable);
						var objImage = document.createElement("IMG");
						objImage.src = 'http://images.rxlist.com/images/rxlist/View-Enlarged-Table-Button.gif';
						objImage.width = '127';
						objImage.height = '22';
						objImage.border = '0';
						objImage.alt = 'View Enlarged Table';
						objLink.appendChild(objImage);
					} else {
						objTable.style.display = 'none';
						var objLink = document.createElement("A");
						objLink.href = 'javascript:popTable(' + i + ');';
						objTable.parentNode.insertBefore(objLink, objTable);
						var objImage = document.createElement("IMG");
						objImage.src = 'http://images.rxlist.com/images/rxlist/View-Illustration.gif';
						objImage.width = '127';
						objImage.height = '22';
						objImage.border = '0';
						objImage.alt = 'View Enlarged Table';
						objLink.appendChild(objImage);
					}

				}
			}	
		}
	}
}
