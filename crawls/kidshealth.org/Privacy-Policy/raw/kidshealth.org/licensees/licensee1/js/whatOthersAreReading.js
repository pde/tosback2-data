// This javaScript is used to dynamically pull What other people are reading content dynamically when ever mothership static pages 
// are loaded. The content is pulled from a xml file under /licensees/licensee1  which is updated whenever any changes are submitted 
// through the HomeSetupTool 
function setWhatOthersWant(section)
   {
       var req = null; 
 	       if(window.XMLHttpRequest)
			req = new XMLHttpRequest(); 
		else if (window.ActiveXObject)
			req  = new ActiveXObject("Microsoft.XMLHTTP"); //For IE

		req.onreadystatechange = function()
		{ 		
			if(req.readyState == 4)
			{
				if(req.status == 200)
				{
					// process a XML document here
					var xml = req.responseXML;
                                         i = 0;
                                         html = "";
                                         while (i >= 0) {
                                          whatOthersWantText = xml.getElementsByTagName("whatotherswant_text")[i];
                                          whatOthersWantURL = xml.getElementsByTagName("whatotherswant_url")[i];
                                          if (whatOthersWantText != null && whatOthersWantURL != null ) {
                                                whatOthersWantText = whatOthersWantText.firstChild.data;
                                                whatOthersWantURL = whatOthersWantURL.firstChild.data;
                                                html += "<li class=\"test999\"><a href=\"" + whatOthersWantURL + "\">" + whatOthersWantText + "</li>";
                                                i++;
                                           } else {
                                            i = -1;
                                           }
                                         }
                                  var othersString = document.getElementById("whatOthersWant");
								if(othersString != null) {
									othersString.innerHTML = html;
                                  //document.getElementById("whatOthersWant").innerHTML = html;
								}
				}	
				else	
				{
				 document.getElementById("whatOthersWant").innerHTML="Error: returned status code " +
                                 req.status + " " + req.statusText;
				}	
			} 
		}; 
                if(section == "Parents")
                {
                    req.open("GET", "/licensees/licensee1/whatotherswant_Parents.xml", true); 
                }else if(section == "Teens")
                {
                    req.open("GET", "/licensees/licensee1/whatotherswant_Teens.xml", true); 
                }else 
                {
                    req.open("GET", "/licensees/licensee1/whatotherswant_Kids.xml", true); 
                }
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
		req.send(' '); 
	}  

