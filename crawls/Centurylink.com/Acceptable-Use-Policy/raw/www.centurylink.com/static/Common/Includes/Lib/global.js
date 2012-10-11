/* Don't frame me in */
if (top != self) {
	top.location=self.location;
} 

/* Events for global (topnav) search form */
function initSearch() {
	$('#siteSearch label').click(function() {
		$('#searchText').focus();
	})
	st = document.getElementById('searchText');
	if(st) {
		st.onfocus = function() {this.className = 'active';}
		st.onblur = function() {this.className = '';}
	}
}
/* Open all pdfs in new window */
function popADoc() {
	$("a[href$='pdf']").attr('target','_blank');
	$("a[href$='doc']").attr('target','_blank');
	$("a[href$='wmv']").attr('target','_blank');
}
/* Remove Home Security evaluation */
function homeSecurityFix() {
	if(window.location.pathname.indexOf('/HomeSecurity/') > -1) {
		if(window.location.pathname.search('freeEvaluation|thankYou') > -1) {
			var oldhtml = $("#content").html();
			$("#content").html(oldhtml.replace(/FREE/g,''));
		}
	}
}
function lifelineFix() {
	if(window.location.pathname.indexOf('/Support/') > -1) {
		$("#menu li:contains('Link-Up') a").html('Lifeline');
	}
}


function redirectToPrivacyForm(){
	$.each( $("a[href^='mailto:']"), function(i,thisElem) {
		if ( $(thisElem).attr("href") == "mailto:Privacy@CenturyLink.com" || $(thisElem).attr("href") == "mailto:IT-privacypolicy@centurylink.com" ){
			$(thisElem).href="";
			$(thisElem).click(function(event){
				event.preventDefault();
				window.open('/static/Pages/AboutUs/Legal/PrivacyPolicy/privacyForm.html','PrivacyForm','resizable=1,location=0,status=0,scrollbars=0,menubar=0,width=640,height=540');
			});
		}
	});
}
function updateStoreLocator() {
	if(window.location.pathname.indexOf('/Support/') > -1) {
		$("#topnav a[href='/Pages/Support/storeLocator.html']").attr('href','http://storelocator.centurylinkapps.com/');
	}
}

function initTargetWindow() {
	$('.targetWindow').click(targetWindow);
}
function targetWindow() {
	targetWidth=parseInt($(this).attr('targetwidth'));
	targetHeight=parseInt($(this).attr('targetHeight'));
	var windowFeatures = "scrollbars,resizable" + (targetWidth > 0 ? ',width='+targetWidth:'') + (targetHeight > 0 ? ',width='+targetHeight:'');
	var win = window.open(this.href,this.target,windowFeatures);
	return false;
}
$(document).ready(initSearch);
$(document).ready(popADoc);
$(document).ready(homeSecurityFix);
$(document).ready(lifelineFix);
$(document).ready(redirectToPrivacyForm);
$(document).ready(initTargetWindow);
$(document).ready(updateStoreLocator);
