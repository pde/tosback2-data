ch_client = 'demandmedia';
ch_type = 'mobile';
ch_height = 50;
ch_width = 320;
ch_cid = 'mobile_nonhover_answerbag';
ch_sid = 'AnswerBag Mobile';
ch_hq = 1;
try {
	ch_query = document.getElementsByTagName('h1')[0].childNodes[0].nodeValue.replace(/^\s+|\s+$/g, '');
} catch(e) {
}
document.write(unescape("%3Cscript%20src%3D%22http%3A//scripts.chitika.net/eminimalls/amm.js%22%20type%3D%22text/javascript%22%3E%3C/script%3E"));
