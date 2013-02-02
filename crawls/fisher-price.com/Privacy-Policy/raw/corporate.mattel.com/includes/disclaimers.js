/*
File name: disclaimers.js
Autored by: Brian McCleery
Date authored: 08/13/2001
Modified by: Brian McCleery
Date last modified: 08/13/2001
Description:
	Disclaimers alert function declaration JavaScript include for Mattel.com.
*/

function disclaimer(whichOne) {

	// General disclaimer about updating (for Terms and Conditions)
	if (whichOne == "general"){
		window.alert("Mattel does not assume responsibility for continuously updating any page of this Web site.  Unless there is a specific statement on a page of the Web site that the page has been updated on a certain date, you should not assume that the page has been updated or that the content of the page remains current.");
	}
	
	// Language for timeline
	if (whichOne == "timeline"){
		window.alert("The information presented in this timeline represents selected highlights from Mattel's history and does not purport to be complete or comprehensive.  For further information about Mattel's history, please see the information in the Investors & Media section of the site and Mattel's historical SEC Filings.");
	}
	
	// Analyst list
	if (whichOne == "analyst"){
		window.alert("Mattel is currently followed by the brokerage firms and analysts listed below; this list may not be complete and is subject to change as firms add or delete coverage of Mattel.  Please note that any opinions, estimates or forecasts regarding Mattel's historical or predicted performance made by the analysts at these firms are theirs alone and do not represent opinions, forecasts or predictions of Mattel or its management,  Mattel is providing this listing as a service to its stockholders, and does not by listing these firms imply its endorsement of or concurrence with such information, conclusions or recommendations.  Interested persons may obtain copies of analysts' reports on their own; Mattel does not distribute these reports.  Various of these firms may be market-makers in Mattel stock and/or hold other long or short positions in the stock, and may provide compensated services to Mattel.");
	}
	
	// Additional verbiage for SEC Filings page
	if (whichOne == "sec") {
	    window.alert("Mattel files annual, quarterly and special reports, proxy statements and other information with the Securities and Exchange Commission (SEC). You may read and copy historical SEC Filings at the SEC's Public Reference Room, 100 F Street NE, Washington, DC 20549 and at the SEC's regional offices located at 3 World Financial Center, Suite 400, New York, NY 10281-1022 and 185 W. Jackson Boulevard, Suite 900, Chicago, IL  60604.  Please call the SEC at 1-800-SEC-0330 for further information on the public reference rooms.  Mattel's historical SEC Filings are also available to the public from commercial document retrieval services and at the Web site maintained by the SEC at www.sec.gov. You may inspect information that Mattel files with the NASDAQ Stock Market at the offices of the NASDAQ Stock Market at One Liberty Plaza, 165 Broadway, New York, NY 10006.");
	}
	
	// Hyperlinks to third-party sites
	if (whichOne == "linkOut"){
		window.alert("The information you are about to view is not part of Mattel's Web site, is not presented by Mattel, and has not been verified by Mattel.");
	}
	
	// Press releases
	if (whichOne == "press"){
		window.alert("You are now entering the Mattel press release archives.  These archived press releases are provided for reference by Mattel.  Each press release contains information that was current only as of the date of such press release.  Mattel does not update or delete outdated information contained in these releases, and it expressly disclaims any obligation to do so.");
	}
	
	// Financial information
	if (whichOne == "financial"){
		window.alert("You are now entering the Mattel Financial Information archives.  These archived documents are provided for reference by Mattel.  Each document contains information that was current only as of the dates specified in such document.  Mattel does not update or delete outdated information contained in these documents, and it expressly disclaims any obligation to do so.");
	}
	
	// Presentations
	if (whichOne == "presentations"){
		window.alert("You are now entering the Mattel presentation archives.  These archived presentations are provided for reference by Mattel.  Each presentation contains information that was current only as of the date of the presentation.  Mattel does not update or delete outdated information contained in these presentations, and it expressly disclaims any obligation to do so.\n The presentation files are the property of Mattel and any use, dissemination or republication of the files is prohibited without the express written consent of Mattel.");
	}
	
}