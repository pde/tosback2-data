
function omnituretagging_header() {
	s.linkTrackVars='prop5,events,eVar2,eVar31,prop26,eVar49';
	s.linkTrackEvents='event17';
	s.prop5=document.getElementById('searchStr').value;
	s.eVar2='Search';
	s.eVar31=document.getElementById('searchStr').value;
	if (pageType == 'HomePage') {
		s.prop26='Homepage Main Search';
		s.eVar49='Homepage Main Search';
	} else if (pageType == 'BrowseCategory') {
	if (currentPage == 1) {
		s.prop26='Concert Page Main Search';
		s.eVar49='Concert Page Main Search';
	} else {
		s.prop26='Browse Category Search';
		s.eVar49='Browse Category Search';
	}
	} else if (pageType == 'BrowseEvent') {
		s.prop26='Browse Event Search';
		s.eVar49='Browse Event Search';
	} else {
		s.prop26='Other Main Search';
		s.eVar49='Other Main Search';
	}
	s.events='event17';
	s.tl(this,'o','Find Button');
}
function checkEnter_omnituretagging(e) {
	var key;
	if (navigator.appName == 'Microsoft Internet Explorer') {
	if(window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox
	
	if(key == 13) { 
		s.linkTrackVars='prop5,events,eVar2,eVar31,prop26,eVar49';
		s.linkTrackEvents='event17';
		s.prop5=document.getElementById('searchStr').value;
		s.eVar2='Search';
		s.eVar31=document.getElementById('searchStr').value;
		if (pageType == 'HomePage') {
			s.prop26='Homepage Main Search';
			s.eVar49='Homepage Main Search';
		} else if (pageType == 'BrowseCategory') {
			if (currentPage == 1) {
				s.prop26='Concert Page Main Search';
				s.eVar49='Concert Page Main Search';
			} else {
				s.prop26='Browse Category Search';
				s.eVar49='Browse Category Search';
			}
		} else if (pageType == 'BrowseEvent') {
			s.prop26='Browse Event Search';
			s.eVar49='Browse Event Search';
		} else {
			s.prop26='Other Main Search';
			s.eVar49='Other Main Search';
		}
		s.events='event17';
		s.tl(this,'o','Find Button');
		}	  
	}
}
