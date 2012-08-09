// JavaScript Document

 
function renderBanner() {
document.write('<div id="banner-map">'
			 + '<img id="banner-map-image"  class="ie6" src="/Common/about_us/images/service_publications/banner_map.gif" width="505" height="288" alt="" usemap="#servicePublications"/>'
			 + '<map name="servicePublications">'
			 + '<area href="javascript:void()" onclick="showStateLink(\'California\')"  title="California" coords="57,84,90,92,81,119,120,174,113,195,94,191,71,169,54,115" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Nevada\')"  title="Nevada" coords="91,93,134,100,121,171,83,119" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Oregon\')"  title="Oregon" coords="80,52,75,44,55,83,110,96,120,54" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Washington\')" title="Washington" coords="71,20,86,17,126,24,119,51,83,50,76,41" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Idaho\')" title="Idaho" coords="133,27,137,56,149,75,160,77,156,103,113,93,127,25" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Montana\')" title="Montana" coords="135,27,137,54,149,72,161,75,160,71,211,76,213,49,213,36" shape="poly"  />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Wyoming\')" shape="poly" coords="210,117,210,96,210,79,162,74,157,111" title="Wyoming" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Utah\')" shape="poly" coords="136,100,127,150,168,155,170,115,154,113,155,104" title="Utah" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Arizona\')" shape="poly" coords="127,153,115,194,147,214,161,213,166,157" title="Arizona" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Colorado\')" shape="poly" coords="170,155,172,115,226,118,222,159" title="Colorado" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NewMexico\')" shape="poly" coords="167,158,215,160,214,211,169,209,168,214,163,214" title="New Mexico" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NorthDakota\')" shape="poly" coords="215,37,260,37,267,66,215,65" title="North Dakota" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'SouthDakota\')" shape="poly" coords="214,68,264,67,266,80,267,101,257,98,243,96,211,97" title="South Dakota" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Nebraska\')" shape="poly" coords="211,114,212,97,248,99,259,99,269,104,278,127,226,127,226,116" title="Nebraska" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Kansas\')" shape="poly" coords="226,129,279,129,284,136,284,158,222,158" title="Kansas" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Oklahoma\')" shape="poly" coords="215,163,215,160,284,159,288,164,289,192,278,190,269,193,261,190,253,190,241,185,241,165" title="Oklahoma" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Texas\')" shape="poly" coords="216,165,239,166,240,186,251,191,259,191,269,194,277,191,291,193,292,209,297,218,298,231,280,243,268,255,269,275,250,269,244,257,234,246,233,238,225,233,217,235,211,242,201,235,196,221,186,212,216,210" title="Texas" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Minnesota\')" shape="poly" coords="261,37,273,35,276,32,279,37,287,39,295,42,302,44,312,42,308,47,301,54,297,58,296,65,293,70,294,78,303,82,307,89,299,90,286,90,276,90,269,90,267,71,269,63,265,49" title="Minnesota" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Iowa\')" shape="poly" coords="268,91,306,90,307,95,311,99,315,103,315,106,315,108,312,110,309,110,310,113,311,115,310,117,308,119,304,119,278,121,272,111,266,101" title="Iowa" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Missouri\')" shape="poly" coords="278,122,307,120,309,126,312,131,316,133,317,135,319,138,319,142,322,146,326,148,328,153,330,159,327,163,323,165,325,162,320,160,314,160,301,161,289,162,285,158,285,134,281,129" title="Missouri" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Arkansas\')" shape="poly" coords="289,163,320,160,322,163,321,167,326,165,327,167,325,170,322,173,322,177,320,180,318,185,316,189,315,193,316,198,292,198,292,192,290,191" title="Arkansas" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Louisiana\')" shape="poly" coords="293,199,316,199,320,202,319,208,320,206,318,207,318,210,317,214,317,217,316,219,320,220,323,219,325,219,328,218,332,218,331,221,333,223,335,225,335,226,338,229,340,232,341,237,337,237,333,236,330,236,327,239,323,238,319,234,314,235,308,234,303,233,299,233,300,224,298,217,296,212,293,207" title="Louisiana" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Wisconsin\')" shape="poly" coords="299,57,305,53,309,53,309,56,313,59,317,61,324,61,326,61,328,64,329,69,329,72,335,66,335,71,334,77,334,84,334,89,335,92,333,97,317,97,310,97,306,91,307,87,307,84,304,83,300,80,296,77,294,72,296,65" title="Wisconsin" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Illinois\')" shape="poly" coords="312,98,333,98,338,104,340,134,339,141,338,148,336,153,333,151,329,154,327,147,322,145,320,138,318,133,314,130,310,125,310,117,311,111,315,109,316,102" title="Illinois" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Michigan\')" shape="poly" coords="312,55,325,45,330,44,330,48,332,51,336,52,341,50,347,48,353,49,363,54,363,59,364,63,366,70,363,77,368,75,373,79,375,87,372,92,370,98,340,104,345,95,345,88,342,78,344,70,347,66,350,62,344,59,337,63,333,66,330,70,329,62,325,59,317,60" title="Michigan" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Indiana\')" shape="poly" coords="339,105,357,102,359,110,360,118,361,124,363,130,355,139,348,142,339,144,341,136,340,117,341,110" title="Indiana" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Ohio\')" shape="poly" coords="359,102,368,100,376,102,383,98,388,93,392,104,391,112,388,119,383,126,381,131,375,130,369,130,363,127" title="Ohio" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Kentucky\')" shape="poly" coords="329,159,333,152,336,155,339,146,343,144,351,142,358,137,362,132,364,128,369,131,375,132,381,134,383,139,387,141,382,146,375,152" title="Kentucky" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Tennessee\')" shape="poly" coords="327,162,346,157,365,155,380,153,391,150,389,155,380,161,374,164,372,169,322,176,327,169,328,164" title="Tennessee" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Mississippi\')" shape="poly" coords="323,177,342,174,342,197,342,208,344,216,345,222,338,223,336,225,333,221,334,217,329,216,325,218,317,218,320,209,322,205,322,201,314,197,317,192,318,187,321,181" title="Mississippi" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Alabama\')" shape="poly" coords="344,174,362,172,371,195,372,202,372,211,360,213,352,214,351,217,354,222,347,224,346,219,344,211,344,201,342,183" title="Alabama" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Florida\')" shape="poly" coords="352,215,373,212,376,216,398,212,402,215,402,209,406,210,417,228,418,233,426,245,428,256,428,263,423,269,418,266,415,259,411,256,401,246,398,239,398,230,386,220,377,226,371,225,365,221,360,221,356,223" title="Florida" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Georgia\')" shape="poly" coords="363,172,372,170,382,168,382,172,388,176,396,184,402,191,407,195,405,208,400,208,401,212,397,211,390,212,380,214,375,214,373,208,373,202,370,186" title="Georgia" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'SouthCarolina\')" shape="poly" coords="383,165,393,164,401,164,404,167,410,165,414,166,422,172,420,178,415,184,411,191,408,194,400,186,394,179,390,176,384,173" title="South Carolina" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NorthCarolina\')" shape="poly" coords="393,150,437,140,442,145,446,150,444,155,440,159,435,161,430,166,430,171,424,172,418,167,415,163,410,164,404,165,402,162,397,163,390,163,383,164,383,168,374,168,377,163,388,158" title="North Carolina" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Virginia\')" shape="poly" coords="388,141,395,142,400,138,405,127,408,125,412,121,413,116,418,118,423,118,426,122,432,128,433,134,438,138,406,146,388,150,377,151" title="Virginia" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'WestVirginia\')" shape="poly" coords="393,108,394,115,401,114,403,120,408,118,412,116,411,122,405,125,402,130,400,135,397,139,392,141,387,140,384,136,382,132,385,126,389,119" title="West Virginia" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'DistrictofColumbia\')" shape="poly" coords="426,118,430,121,433,125,437,128,439,131,440,137,452,150,450,143,453,150,458,151,463,150,471,150,475,151,475,154,475,159,475,162,469,161,463,162,458,161,457,157,457,150,454,147,450,142,447,140,443,137,438,132,434,127,429,123,425,118" title="District of Columbia" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Maryland\')" shape="poly" coords="403,113,409,113,413,111,424,109,428,108,431,113,432,117,434,120,437,123,443,127,445,129,448,133,451,136,455,136,459,134,463,133,472,134,478,134,477,141,477,144,469,145,459,145,457,139,439,126,434,122,420,116,416,114,404,118" title="Maryland" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Delaware\')" shape="poly" coords="433,107,434,111,438,115,443,119,453,115,449,119,450,115,455,116,461,116,466,119,468,123,468,127,462,128,455,128,450,127,448,122,439,123,434,118,432,113,429,108" title="Delaware" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Pennsylvania\')" shape="poly" coords="390,93,394,90,396,92,403,91,415,88,423,85,428,84,432,87,433,91,432,95,432,98,436,100,434,104,429,107,415,109,405,111,395,114,393,103" title="Pennsylvania" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NewJersey\')" shape="poly" coords="435,90,439,90,441,93,441,96,443,99,443,103,448,106,452,106,459,108,464,109,469,111,473,113,474,109,477,108,483,109,490,109,490,114,490,119,483,119,476,120,472,114,445,107,440,112,434,109,437,101,433,96" title="New Jersey" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NewYork\')" shape="poly" coords="395,89,401,83,401,80,398,78,403,75,409,74,415,73,418,69,417,65,415,62,419,58,424,53,428,51,433,50,435,57,437,63,439,68,441,74,441,82,443,88,448,85,450,88,450,89,452,90,450,91,446,93,442,92,441,88,436,89,430,83,412,87,399,90" title="New York" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Vermont\')" shape="poly" coords="435,50,430,47,424,43,416,38,409,37,404,32,403,25,407,20,413,20,419,21,423,24,422,30,422,35,438,46,444,46,448,50,448,49,447,56,447,60,447,66,447,70,441,70,439,64,436,56" title="Vermont" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Connecticut\')" shape="poly" coords="443,79,448,78,452,77,454,80,455,83,456,86,462,92,468,96,476,96,477,102,475,106,468,106,462,105,460,99,455,91,453,85,447,84,445,86,442,83" title="Connecticut" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'RhodeIsland\')" shape="poly" coords="455,76,458,77,462,79,466,80,470,82,475,80,481,79,487,80,490,84,490,89,488,92,481,91,473,91,470,86,463,83,456,81" title="Rhode Island" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Massachusetts\')" shape="poly" coords="442,72,447,72,451,69,457,66,461,67,465,68,471,64,475,60,479,55,484,56,491,55,495,58,496,63,494,68,485,69,472,69,470,72,472,75,471,80,468,77,461,75,456,75,450,76,442,78" title="Massachusetts " />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'NewHampshire\')" shape="poly" coords="430,11,437,10,443,10,449,9,451,13,450,18,450,22,446,24,446,29,447,34,448,37,449,42,450,47,453,55,456,61,458,65,452,66,448,69,449,53,448,47,441,23,433,23,428,19" title="New Hampshire" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Maine\')" shape="poly" coords="454,16,459,17,463,14,468,16,471,21,472,27,475,32,479,34,482,38,477,43,474,48,469,52,464,56,464,59,459,64,454,56,450,45,453,33,453,26" title="Maine" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Alaska\')" shape="poly" coords="30,183,38,181,48,179,57,180,64,184,74,185,80,191,81,203,85,222,85,236,94,241,100,237,110,246,119,252,124,261,117,267,108,268,80,243,70,246,59,253,56,262,42,270,27,273,19,275,8,273,7,264,17,258,27,256,24,246,18,243,11,235,15,228,11,223,5,216,8,208,13,210,17,217,21,221,24,215,17,207,22,201,28,198,22,193" title="Alaska" />'
			 + '<area href="javascript:void()" onclick="showStateLink(\'Hawaii\')" shape="poly" coords="134,233,141,228,151,225,159,227,171,232,184,236,190,240,200,245,205,249,209,255,217,262,219,270,213,273,206,277,195,279,185,278,176,277,173,266,179,260,190,262,195,257,179,248,163,239,151,237,143,240,134,240" title="Hawaii" />'
			 + '</map>'
			 + '<div id="banner-text">'
			 + '<h1>Service Publications:</h1>'
			 + '<p>Get the publications that contain the rates, service descriptions, and terms and conditions for your services.</p>'
			 + '<script>renderServicePubStates()</script>'
			 + '<p>or click on a state on the map.</p>'
			 + '<p class="other"><a href="#other" onclick="showStateLink(\'OtherTerr\')">Other U.S. territories, click here.</a></p>'
			 + '</div>'
			 + '</div>');
			 
			 
		
}


function renderServicePubStates() {
document.write('<form name="statedropdown">'
			 + '<select name="states" OnChange="location.href=statedropdown.states.options[selectedIndex].value">'
			 + '<option>Choose a State or Territory</option>'
			 + '<option value="/gen/public-affairs?pid=13531">Alabama</option>'
			 + '<option value="/gen/public-affairs?pid=13541">Alaska</option>'
			 + '<option value="/gen/public-affairs?pid=13542">Arizona</option>'
			 + '<option value="/gen/public-affairs?pid=13518">Arkansas</option>'
			 + '<option value="/gen/public-affairs?pid=13512">California</option>'
			 + '<option value="/gen/public-affairs?pid=13543">Colorado</option>'
			 + '<option value="/gen/public-affairs?pid=13516">Connecticut</option>'
			 + '<option value="/gen/public-affairs?pid=13544">Delaware</option>'
			 + '<option value="/gen/public-affairs?pid=13578">District of Columbia</option>'
			 + '<option value="/gen/public-affairs?pid=13532">Florida</option>'
			 + '<option value="/gen/public-affairs?pid=13533">Georgia</option>'
			 + '<option value="/gen/public-affairs?pid=13545">Hawaii</option>'
			 + '<option value="/gen/public-affairs?pid=13546">Idaho</option>'
			 + '<option value="/gen/public-affairs?pid=13524">Illinois</option>'
			 + '<option value="/gen/public-affairs?pid=13525">Indiana</option>'
			 + '<option value="/gen/public-affairs?pid=13547">Iowa</option>'
			 + '<option value="/gen/public-affairs?pid=13519">Kansas</option>'
			 + '<option value="/gen/public-affairs?pid=13534">Kentucky</option>'
			 + '<option value="/gen/public-affairs?pid=13535">Louisiana</option>'
			 + '<option value="/gen/public-affairs?pid=13548">Maine</option>'
			 + '<option value="/gen/public-affairs?pid=13549">Maryland</option>'
			 + '<option value="/gen/public-affairs?pid=13550">Massachusetts</option>'
			 + '<option value="/gen/public-affairs?pid=13528">Michigan</option>'
			 + '<option value="/gen/public-affairs?pid=13556">Minnesota</option>'
			 + '<option value="/gen/public-affairs?pid=13536">Mississippi</option>'
			 + '<option value="/gen/public-affairs?pid=13520">Missouri</option>'
			 + '<option value="/gen/public-affairs?pid=13557">Montana</option>'
			 + '<option value="/gen/public-affairs?pid=13558">Nebraska</option>'
			 + '<option value="/gen/public-affairs?pid=13513">Nevada</option>'
			 + '<option value="/gen/public-affairs?pid=13559">New Hampshire</option>'
			 + '<option value="/gen/public-affairs?pid=13560">New Jersey</option>'
			 + '<option value="/gen/public-affairs?pid=13561">New Mexico</option>'
			 + '<option value="/gen/public-affairs?pid=13562">New York</option>'
			 + '<option value="/gen/public-affairs?pid=13537">North Carolina</option>'
			 + '<option value="/gen/public-affairs?pid=13563">North Dakota</option>'
			 + '<option value="/gen/public-affairs?pid=13529">Ohio</option>'
			 + '<option value="/gen/public-affairs?pid=13521">Oklahoma</option>'
			 + '<option value="/gen/public-affairs?pid=13564">Oregon</option>'
			 + '<option value="/gen/public-affairs?pid=13565">Pennsylvania</option>'
			 + '<option value="/gen/public-affairs?pid=13570">Rhode Island</option>'
			 + '<option value="/gen/public-affairs?pid=13538">South Carolina</option>'
			 + '<option value="/gen/public-affairs?pid=13571">South Dakota</option>'
			 + '<option value="/gen/public-affairs?pid=13539">Tennessee</option>'
			 + '<option value="/gen/public-affairs?pid=13523">Texas</option>'
			 + '<option value="/gen/public-affairs?pid=13572">Utah</option>'
			 + '<option value="/gen/public-affairs?pid=13573">Vermont</option>'
			 + '<option value="/gen/public-affairs?pid=13574">Virginia</option>'
			 + '<option value="/gen/public-affairs?pid=13575">Washington</option>'
			 + '<option value="/gen/public-affairs?pid=13576">West Virginia</option>'
			 + '<option value="/gen/public-affairs?pid=13530">Wisconsin</option>'
			 + '<option value="/gen/public-affairs?pid=13577">Wyoming</option>'
			 + '<option value="/gen/public-affairs?pid=13579">Other</option>'
			 + '</select>'
			 + '</form>');
            
}


 function showStateLink(stateID) {
					 
					 	document.getElementById('state-box').style.display = 'block';
						document.getElementById('state-box').setAttribute('class',stateID);
						document.getElementById('state-box').setAttribute('className',stateID);
	 					var residential;
						var business;
	 

						
						if (stateID == 'OtherTerr') {stateID = 'Other U.S. Territories'; residential = '/gen/public-affairs?pid=13579#tab1'; business = '/gen/public-affairs?pid=13579#tab2';}
						if (stateID == 'DistrictofColumbia') {stateID = 'District of Columbia'; residential = '/gen/public-affairs?pid=13578#tab1'; business = '/gen/public-affairs?pid=13578#tab2'; }
						if (stateID == 'Alabama') {residential = '/gen/public-affairs?pid=13531#tab1'; business = '/gen/public-affairs?pid=13531#tab2';}	 
						if (stateID == 'Alaska') {residential = '/gen/public-affairs?pid=13541#tab1'; business = '/gen/public-affairs?pid=13541#tab2';}	 	
						if (stateID == 'Arizona') {residential = '/gen/public-affairs?pid=13542#tab1'; business = '/gen/public-affairs?pid=13542#tab2';}	 	
						if (stateID == 'Arkansas') {residential = '/gen/public-affairs?pid=13518#tab1'; business = '/gen/public-affairs?pid=13518#tab2';}	
						if (stateID == 'California') {residential = '/gen/public-affairs?pid=13512#tab1'; business = '/gen/public-affairs?pid=13512#tab2';}
						if (stateID == 'Colorado') {residential = '/gen/public-affairs?pid=13543#tab1'; business = '/gen/public-affairs?pid=13543#tab2';}	 	
						if (stateID == 'Connecticut') {residential = '/gen/public-affairs?pid=13516#tab1'; business = '/gen/public-affairs?pid=13516#tab2';}		
						if (stateID == 'Delaware') {residential = '/gen/public-affairs?pid=13544#tab1'; business = '/gen/public-affairs?pid=13544#tab2';}	
						if (stateID == 'Florida') {residential = '/gen/public-affairs?pid=13532#tab1'; business = '/gen/public-affairs?pid=13532#tab2';}	 	
						if (stateID == 'Georgia') {residential = '/gen/public-affairs?pid=13533#tab1'; business = '/gen/public-affairs?pid=13533#tab2';}	 	
						if (stateID == 'Hawaii') {residential = '/gen/public-affairs?pid=13545#tab1'; business = '/gen/public-affairs?pid=13545#tab2';}	 	
						if (stateID == 'Idaho') {residential = '/gen/public-affairs?pid=13546#tab1'; business = '/gen/public-affairs?pid=13546#tab2';}	
						if (stateID == 'Illinois') {residential = '/gen/public-affairs?pid=13524#tab1'; business = '/gen/public-affairs?pid=13524#tab2';}	 	
						if (stateID == 'Indiana') {residential = '/gen/public-affairs?pid=13525#tab1'; business = '/gen/public-affairs?pid=13525#tab2';}	 	
						if (stateID == 'Iowa') {residential = '/gen/public-affairs?pid=13547#tab1'; business = '/gen/public-affairs?pid=13547#tab2';}	 	
						if (stateID == 'Kansas') {residential = '/gen/public-affairs?pid=13519#tab1'; business = '/gen/public-affairs?pid=13519#tab2';}	
						if (stateID == 'Kentucky') {residential = '/gen/public-affairs?pid=13534#tab1'; business = '/gen/public-affairs?pid=13534#tab2';}		
						if (stateID == 'Louisiana') {residential = '/gen/public-affairs?pid=13535#tab1'; business = '/gen/public-affairs?pid=13535#tab2';}		
						if (stateID == 'Maine') {residential = '/gen/public-affairs?pid=13548#tab1'; business = '/gen/public-affairs?pid=13548#tab2';}	 	
						if (stateID == 'Maryland') {residential = '/gen/public-affairs?pid=13549#tab1'; business = '/gen/public-affairs?pid=13549#tab2';}	 	
						if (stateID == 'Massachusetts') {residential = '/gen/public-affairs?pid=13550#tab1'; business = '/gen/public-affairs?pid=13550#tab2';}	 	 	
						if (stateID == 'Michigan') {residential = '/gen/public-affairs?pid=13528#tab1'; business = '/gen/public-affairs?pid=13528#tab2';}	 	 	
						if (stateID == 'Minnesota') {residential = '/gen/public-affairs?pid=13556#tab1'; business = '/gen/public-affairs?pid=13556#tab2';}	 	
						if (stateID == 'Mississippi') {residential = '/gen/public-affairs?pid=13536#tab1'; business = '/gen/public-affairs?pid=13536#tab2';}	 	
						if (stateID == 'Missouri') {residential = '/gen/public-affairs?pid=13520#tab1'; business = '/gen/public-affairs?pid=13520#tab2';}	 	
						if (stateID == 'Montana') {residential = '/gen/public-affairs?pid=13557#tab1'; business = '/gen/public-affairs?pid=13557#tab2';}	 	
						if (stateID == 'Nebraska') {residential = '/gen/public-affairs?pid=13558#tab1'; business = '/gen/public-affairs?pid=13558#tab2';}	 		
						if (stateID == 'Nevada') {residential = '/gen/public-affairs?pid=13513#tab1'; business = '/gen/public-affairs?pid=13513#tab2';}	 	
						if (stateID == 'NewHampshire') {stateID = 'New Hampshire'; residential = '/gen/public-affairs?pid=13559#tab1';  business = '/gen/public-affairs?pid=13559#tab2'}
						if (stateID == 'NewJersey') {stateID = 'New Jersey'; residential = '/gen/public-affairs?pid=13560#tab1';  business = '/gen/public-affairs?pid=13560#tab2'}
						if (stateID == 'NewMexico') {stateID = 'New Mexico'; residential = '/gen/public-affairs?pid=13561#tab1';  business = '/gen/public-affairs?pid=13561#tab2'}
						if (stateID == 'NewYork') {stateID = 'New York'; residential = '/gen/public-affairs?pid=13562#tab1';  business = '/gen/public-affairs?pid=13562#tab2'}
						if (stateID == 'NorthCarolina') {stateID = 'North Carolina'; residential = '/gen/public-affairs?pid=13537#tab1';  business = '/gen/public-affairs?pid=13537#tab2'}
						if (stateID == 'NorthDakota') {stateID = 'North Dakota'; residential = '/gen/public-affairs?pid=13563#tab1';  business = '/gen/public-affairs?pid=13563#tab2'}
						if (stateID == 'Ohio') {residential = '/gen/public-affairs?pid=13529#tab1'; business = '/gen/public-affairs?pid=13529#tab2';}	 	
						if (stateID == 'Oklahoma') {residential = '/gen/public-affairs?pid=13521#tab1'; business = '/gen/public-affairs?pid=13521#tab2';}	 	
						if (stateID == 'Oregon') {residential = '/gen/public-affairs?pid=13564#tab1'; business = '/gen/public-affairs?pid=13564#tab2';}	 	
						if (stateID == 'Pennsylvania') {residential = '/gen/public-affairs?pid=13565#tab1'; business = '/gen/public-affairs?pid=13565#tab2';}	 	
						if (stateID == 'RhodeIsland') {stateID = 'Rhode Island'; residential = '/gen/public-affairs?pid=13570#tab1';  business = '/gen/public-affairs?pid=13570#tab2'}
						if (stateID == 'SouthCarolina') {stateID = 'South Carolina'; residential = '/gen/public-affairs?pid=13538#tab1';  business = '/gen/public-affairs?pid=13538#tab2'}
						if (stateID == 'SouthDakota') {stateID = 'South Dakota'; residential = '/gen/public-affairs?pid=13571#tab1';  business = '/gen/public-affairs?pid=13571#tab2'}
						if (stateID == 'Tennessee') {residential = '/gen/public-affairs?pid=13539#tab1'; business = '/gen/public-affairs?pid=13539#tab2';}	 		
						if (stateID == 'Texas') {residential = '/gen/public-affairs?pid=13523#tab1'; business = '/gen/public-affairs?pid=13523#tab2';}	 	
						if (stateID == 'Utah') {residential = '/gen/public-affairs?pid=13572#tab1'; business = '/gen/public-affairs?pid=13572#tab2';}	 	
						if (stateID == 'Vermont') {residential = '/gen/public-affairs?pid=13573#tab1'; business = '/gen/public-affairs?pid=13573#tab2';}	 	
						if (stateID == 'Virginia') {residential = '/gen/public-affairs?pid=13574#tab1'; business = '/gen/public-affairs?pid=13574#tab2';}	 	
						if (stateID == 'Washington') {residential = '/gen/public-affairs?pid=13575#tab1'; business = '/gen/public-affairs?pid=13575#tab2';}	 	
						if (stateID == 'WestVirginia') {stateID = 'West Virginia'; residential = '/gen/public-affairs?pid=13576#tab1';  business = '/gen/public-affairs?pid=13576#tab2'}
						if (stateID == 'Wisconsin') {residential = '/gen/public-affairs?pid=13530#tab1'; business = '/gen/public-affairs?pid=13530#tab2';}	 	
						if (stateID == 'Wyoming') {residential = '/gen/public-affairs?pid=13577#tab1'; business = '/gen/public-affairs?pid=13577#tab2';}	 	
						document.getElementById('state-box-title').innerHTML = '' + stateID + ' Service Publications';
						document.getElementById('residential-link').innerHTML = '<a href="' + residential + '" onclick="showTab(\'tab1\',\'tab2\',\'' + residential + '\');">Residential</a>';
						document.getElementById('business-link').innerHTML = '<a href="' + business + '" onclick="showTab(\'tab2\',\'tab1\',\'' + business + '\');">Business</a>';
						}
						
function showTab(tabOn,tabOff,url) {
	
	newURL = url;
	newURL = newURL.split('#');
	newURL = newURL[0];
	currentURL = location.href;
	currentURL = currentURL.split('/');
	currentURL = currentURL[4];
	currentURL = currentURL.split('#');
	currentURL = '/gen/' + currentURL[0];
	
	if (currentURL == newURL) {
	var tabLinkOn = tabOn + 'link';
	var tabLinkOff = tabOff + 'link';
	
	document.getElementById(tabOn).style.display = 'block';
	document.getElementById(tabOff).style.display = 'none';
	document.getElementById(tabLinkOn).setAttribute('class','active');
	document.getElementById(tabLinkOn).setAttribute('className','active');
	document.getElementById(tabLinkOff).removeAttribute('class','active');
	document.getElementById(tabLinkOff).removeAttribute('className','active');
	}
	else location.href = url;
}

function hideStateLink(stateID) {
document.getElementById('state-box').style.display = 'none';
}


function renderQuickLinksMenu() {
	var pid = location.href;
	pid = pid.split('=');
	pid = pid[1];document.write('<ul>'
			 + '<li><a target="_blank" href="http://www.att.com/guidebook/" title="Guidebooks">Guidebooks</a></li>'
//	         + '<li><a target="_blank" href="http://cpr.bellsouth.com/bst/product_line.htm" title="Price Lists (Southeast)">Price Lists (Southeast)</a></li>'
			 + '<li><a href="/gen/public-affairs?pid=11970" title="Service Guides">Service Guides</a></li>'
			 + '<li><a href="http://www.att.com/tariffs" title="Tariffs">Tariffs</a></li>'
			 + '<li><a href="/gen/public-affairs?pid=11973" title="For Additional Information">For Additional Information</a></li>'
			 + '<li><a href="/gen/public-affairs?pid=22134" title="Other Services">Other Services</a></li>');
	if ( pid == "9700" ) {
		residential = '/gen/public-affairs?pid=13512'; 
		business = '/gen/public-affairs/pid_13512';
		}
	else  {
document.write('<li><a href="/gen/public-affairs?pid=9700" title="Service Publications Home">Service Publications Home</a></li>'
			 + '</ul>');
	}
}


function renderTableHeaders() {
document.write('<table cellspacing="0" cellpadding="0" class="publications  headers" width="100%" border="0">'
			 + '<tr>'
			 + '<th width="105" class="first-col">COMPANY</th>'
			 + '<th width="133">STATE TARIFFS</th>'
			 + '<th width="113">STATE GUIDEBOOKS/<br />SERVICE GUIDES</th>'
			 + '<th width="103">SERVICE AGREEMENTS</th>'
			 + '<th width="180" class="last-header">INTERSTATE/INTERNATIONAL<br />GUIDEBOOKS/SERVICE<br />GUIDES/TARIFFS</th>'
			 + '</tr>'
			 + '</table>');
}


function renderHelpfulInfo() {
document.write('<h3 style="margin-left: 0;" class="accent1">Helpful Information:</h3>'
			 + '<p><strong>Tariffs:</strong> Documents filed with a state public utilities commission (for intrastate services) or the Federal Communications Commission (for interstate and international services) that contain the rates, service descriptions, and terms and conditions for the specific telecommunications services listed.</p>'
			 + '<p><strong>Guidebooks, Service Guides, and Price Lists (Guides):</strong> Documents that contain the rates, service descriptions, and terms and conditions for the specific telecommunications services listed, which are not offered pursuant to a filed tariff.     </p>'
			 + '<p><strong>Service Agreements:</strong> Customer agreements that contain the general terms and conditions that apply to services not offered pursuant to a filed tariff.</p>')
}

function renderInstructions() {
document.write('<div class="instructions">'
			 + '<p><strong>First, determine your service provider by</strong> looking at your bill under one of the following sections: "Terms and Conditions", "News You Can Use", "Important information about your local service", "Important information about your telephone service", or "Regulatory News Section".</p>'
			 + '<p><strong>Then, choose a publication.</strong></p>'
			 + '</div>')
}

function renderStateBox() {

document.write('<div id="state-box">'
			 + '<div class="state-box-text">'
			 + '<p><a class="close" href="#statelinks" onclick="hideStateLink()">&nbsp;</a></p>'
			 + '<h3 id="state-box-title"></h3>'
			 + '<p>Click on the link for the type of services you would like to review.</p>'
			 + '<p  id="residential-link"><a href="">Residential</a></p>'
			 + '<p id="business-link"><a href="">Business</a></p>'
			 + '</div>'
			 + '</div>');
			 

}

function renderSidelinks() {
document.write('<div class="mod_f">'
			 + '<h3 style="margin-left: 0;" class="accent1">Quick Links</h3>');
			 renderQuickLinksMenu();
document.write('</div>'
			 + '<div class="mod_f">');
			 renderHelpfulInfo();
document.write('</div>');
}
