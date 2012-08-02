/*
Script: strip_tables.js
version: v1.0.1
*/

// JavaScript Document
function stripe(sTable) {
	/* recolor here */
	if (typeof sTable == "string") {
		sTable = document.getElementById(sTable);
	}
	
	// check if the table is defined before continuing
	if(sTable != undefined) {
		var row = null;
		
		// counter for visible rows
		var vr = 0;
		
		// go through each row in the table
		for(var i=0; i<sTable.getElementsByTagName("TBODY")[0].rows.length; i++) {
			row = sTable.getElementsByTagName("TBODY")[0].rows[i];
			if(i == 0) {
				prevRow = row;
				row.className = "odd";
			} else {
				prevRow =	sTable.getElementsByTagName("TBODY")[0].rows[i-1];
			}

			spanningRow = false;
			groupedRow = false;
			
			// compare row IDs
			if(row.id.length > 0 && prevRow.id.length > 0) {
				hLocR = row.id.indexOf("-");
				hLocP = prevRow.id.indexOf("-");
				if (hLocR > -1 && hLocP > -1) {
					if(row.id.substring(0,hLocR) == prevRow.id.substring(0,hLocP)) {
						groupedRow = true;
						if(vr == 0) vr=1;
					}
				}
			}
		
			//	alert(row.childNodes[1].attributes.getNamedItem("colspan").value + "//" + row.childNodes[1].innerHTML);

			//	if(row.childNodes[0].hasAttribute && row.childNodes[0].hasAttribute("colspan")) {
		//	if(row.childNodes[0].nodeName != "#text") {
				//if(row.childNodes[0].attributes.getNamedItem("colspan").value > 1 ) { //&& prevRow.childNodes[0].attributes.getNamedItem("colspan").value == 1
					/*spanningRow = true;*/
				//} else {
		//			spanningRow = false;
				//}
		//} else if(row.childNodes[1].hasAttribute("colspan")) { // && !prevRow.childNodes[1].hasAttribute("colspan")

					/*spanningRow = true;*/
		//		} else {
		//			spanningRow = false;
		//	}


			// check if the row is visible... don't want to stripe invisible rows
			if(row.style.display != "none" && !spanningRow && !groupedRow) {
				vr++;
				// if the row index is even, set the row class to the even
				if(vr % 2 == 0) {
					row.className = "even";
				}
				else
				{
					row.className = "odd";
				}		
			}	else if(spanningRow || groupedRow) {
					row.className = prevRow.className;
			}
			
		} // end for loop
	}
}