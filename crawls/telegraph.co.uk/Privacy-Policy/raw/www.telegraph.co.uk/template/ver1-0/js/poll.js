var currForm=null;
function done(str) {
	currForm.innerHTML = str;
	currForm=null;
}
function send(form) {
	currForm=form;
	var value=null;
	for (var i=0; i < form.vote.length; i++) {
		if (form.vote[i].checked) {
			value=form.vote[i].value;
		}
	}
	if (value){
		var timestamp = new Date();
		timestamp = timestamp.getTime();
		var params = 'mentometerId=' + escape(form.mentometerId.value);
		params += '&publicationId=' + escape(form.publicationId.value);
		params += '&sec=' + escape(form.sec.value);
		params += '&vote=' + escape(value);
		params += '&displayNow=true&timestamp=' + timestamp;
		var ajax = new AJAXInteraction('http://' + window.location.host	+ '/pollVote.do?' + params, null, done);
		ajax.doGet();
	}
}
function display(form) {
	currForm=form;
	var timestamp = new Date();
	timestamp = timestamp.getTime();
	var params = 'mentometerId=' + escape(form.mentometerId.value);
	params += '&publicationId=' + escape(form.publicationId.value);
	params += '&sec=' + escape(form.sec.value);
	params += '&displayNow=true&timestamp=' + timestamp;
	var ajax = new AJAXInteraction('http://' + window.location.host + '/template/ver1-0/templates/fragments/epoll/response.jsp?' + params, null, done);
	ajax.doGet();
}

$(function initPoll() {
	var pollForms=document.getElementsByTagName('form');
	for (var i=0; i < pollForms.length; i++) {
		if (pollForms[i].className =='pollForm'){
			pollForms[i].onsubmit= function() {send(this);return false;};
		}
	}
	pollForms=null;
	var pollLinks=document.getElementsByTagName('a');
	for (var i=0; i < pollLinks.length; i++) {
		if (pollLinks[i].className =='resultsLink'){

				pollLinks[i].onclick= function() {display(this.parentNode.parentNode);return false;};
		}
	}
	pollLinks=null;
});