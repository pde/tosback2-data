// JavaScript Document

//Hide Back buttons if there is no goback parameter in the url string
//(if the user did not get to this page from it's parent page)

if (String(window.location).indexOf("goback", 0) == -1) {
    document.write('<style>a.back {display:none;}</style>');
}


//Share it script
/*function shareThis() {
document.write('<p><b>sharethis goes here</b></p>');
}*/
//
//        //  In my case I want to load them onload, this is how you do it!
//        // 
//
//        Event.observe(window, 'load', loadAccordions, false);
//
//        //
//        //    Set up all accordions
//        //
//
//        function loadAccordions() {
// 
//
//            var bottomAccordion = new accordion('vertical_container', {
//              classNames : {
//                    toggle : 'accordion_toggle',
//                    toggleActive : 'accordion_toggle_active',
//                    content : 'accordion_content'
//                }
//            });
//
//            // Open first one
//            //bottomAccordion.activate($$('#vertical_container .accordion_toggle')[0]);
//            }


function showGroup(divID) {
	 
	var groups = new Array ('group01','group02','group03','group04','group05','group06','group07','group08','group09','group10','group11','group12','group13','group14','group15','group16','group17','group18','group19','group20');
	 
	for(m=0; m<groups.length; m++) { 
		if (divID != groups[m]) {
	document.getElementById(groups[m]).style.display = 'none';
		}
		else if (divID == groups[m]) {
		document.getElementById(divID).style.display = 'block';
		}
	}
		 location.href = location.href + "#top";
	
	}
	
function determineSection(url) {
	
url = url.split('?');
url = url[1];
url2 = url.split('&');
divID = url2[1];
divID = divID.split('=');
divID = divID[1];
return divID;
}
	
function determineGroup(url) {
	
url = url.split('?');
url = url[1];
url2 = url.split('&');
sectionID = url2[2];
sectionID = sectionID.split('=');
sectionID = sectionID[1];
return sectionID;
}
	
	

function assignPID(sectionID) {
 
if(sectionID == 'broadband') {
	var pidNO = '12888'
	}
else if(sectionID == 'citizenship') {
	var pidNO = '12896'
	}
else if(sectionID == 'disability') {
	var pidNO = '12897'
	}
else if(sectionID == 'network') {
	var pidNO = '12898'
	}
else if(sectionID == 'online') {
	var pidNO = '13030'
	}
else if(sectionID == 'other') {
	var pidNO = '12899'
	}
else if(sectionID == 'privacy') {
	var pidNO = '12901'
	}
else if(sectionID == 'safety') {
	var pidNO = '12902'
	}
else if(sectionID == 'investments') {
	var pidNO = '12903'
	}
else if(sectionID == 'usf') {
	var pidNO = '12904'
	}
else if(sectionID == 'video') {
	var pidNO = '12905'
	}
else if(sectionID == 'wireless') {
	var pidNO = '12906'
	}
else var pidNO = '12907';	
return pidNO;	
}
 

//Main Menu script

function renderMainNav(curPage) {

document.write('<div id="vertical_container" >');

//To add animation, add **class="accordion_toggle"** to the h1 tag and remove the <a href> tags ////
	document.write('<h1');
		if(curPage == 'pphome') { document.write(' class="current"'); }
	document.write('><a href="/gen/public-affairs?pid=12907" title="Public Policy Home">Public Policy Home</a></h1>');
	
	document.write('<h1');
		if(curPage == 'broadband') { document.write(' class="current">'); }
	document.write('><a href="/gen/public-affairs?pid=12888" title="Broadband">Broadband</a></h1>');
	
/*	document.write('<!-- Use this for animated drop down sub-menus -->');
	document.write('<!--<div class="accordion_content">');
	document.write('<ul>');
	document.write('<li>sub cat here</li>');
	document.write('</ul>');
	document.write('</div>-->');*/
//  Broadband "sub category" item

	document.write('<h1><a href="/gen/public-affairs?pid=13741&goback=group01&article=broadband" title="FCC NOI">&nbsp;&nbsp;&nbsp;&nbsp;FCC NOI</a></h1>');
	  
	document.write('<h1');
		if(curPage == 'citizenship') { document.write(' class="current"'); }
	document.write('><a href="/gen/public-affairs?pid=12896" title="Citizenship and Sustainability">Citizenship and Sustainability</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'disability') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12897" title="Disability Issues">Disability Issues</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'network') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12898" title="Network Management">Network Management</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'online') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=13030" title="Online Safety and Security">Online Safety and Security</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'other') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12899" title="Other Policy Topics">Other Policy Topics</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'privacy') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12901" title="Privacy">Privacy</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'safety') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12902" title="Public Safety">Public Safety</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'investments') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12903" title="Investments">Investments</a></h1>');
	
	document.write('<h1 class="twoline');
	  if(curPage == 'usf') { document.write(' current'); } 
	document.write('"><a href="/gen/public-affairs?pid=12904" title="Universal Service Fund and Intercarrier Compensation">Universal Service Fund and Intercarrier Compensation</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'video') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12905" title="Video Choice">Video Choice</a></h1>');
	
	document.write('<h1');
	  if(curPage == 'wireless') { document.write(' class="current"'); } 
	document.write('><a href="/gen/public-affairs?pid=12906" title="Wireless">Wireless</a></h1>');
	
	document.write('</div>');
	document.write('<div class="clear"></div>');
}