
var nowcalendarIframeBlockResize = function() {
	var myiframe = document.getElementById("nowcalendar-block-iframe");
	myiframe.style.height = myiframe.contentWindow.document.body.offsetHeight + 1 + 'px';
	myiframe.style.width = '100%';
	setTimeout(nowcalendarIframeBlockResize, 100);
}

jQuery(document).ready(function() {
	var today = new Date();
	month = (today.getMonth() + 1).toString();
	if (month.length == 1) { month = '0' + month; }
	day = today.getDate().toString();
	if (day.length == 1) { day = '0' + day; }
	jQuery('#nowcalendar-d6-block').html('<iframe id="nowcalendar-block-iframe" frameborder="0" scrolling="no"></iframe>');
	jQuery('#nowcalendar-d6-block iframe').load(function() {
		setTimeout(nowcalendarIframeBlockResize, 0);
	}).attr('src', '/calendar/now-block/' + today.getFullYear().toString() + '-' + month + '-' + day );
});
