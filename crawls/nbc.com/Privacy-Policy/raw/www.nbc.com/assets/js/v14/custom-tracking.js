var pat=/www.nbcolympics/g;		

jqN(function() {				
	filterLinks();
});

function filterLinks(){
	jqN('a').filter(function(i){
		if(pat.test(this.href)){	
			var ci = jqN(this).find('img').length > 0 ? getFileName(jqN(this).find('img').attr('src')) : this.href;
			var ca = jqN(this).find('img').length > 0 ? jqN(this).find('img').attr('alt').replace(/\ /g,'%20')+":" : jqN(this).attr('title') || '';
			var pId = parentHasId(jqN(this));							
			grabImage(pId+":"+ci+ca);			
		}
	});
}

function getFileName(path) {
    return path.match(/[-_\w]+[.][\w]+$/i)[0];
}
    
function grabImage(value){
	var imgTrx = 'http://oimg.nbcuni.com/b/ss/nbcuglobal,nbcunetworkbu/1/H.8/'+randDARTNumber+'?pe=lnk_o&pev2=Olympics%20Ads&v18='
	
	var img = jqN('<img/>')
			.attr({src:imgTrx+value})
			.load(function(){
				jqN('body').append(this);
				jqN(this).show();
			})
			.css({position:'absolute', bottom:'0px', left:'0px'});
			
	if(window.console && window.console.log && !jqN.browser.msie)	
		console.log(imgTrx+value);			
}
	
function parentHasId(el){
	var found = false;
	var pe = jqN(el).parents().get();
	var t = [];
	jqN(pe).each(function(){
		if(jqN(this).attr('id')!= '')
			t.push(jqN(this).attr('id'));
	});
	return t[0];
}

NBC(document).ready(function() {
var url = window.location.href;
	if(url.indexOf('12193') > -1) {
	NBC(".sponsor-logo").html('<div style="float: right;margin:-80px -390px 0 0;;"><a href="https://www.facebook.com/SamsungMobileUSA?sk=app_177374352370624&app_data={%22path%22%3A%22%2Fdevice%2F6%22%2C%22referer%22%3A%22http%3A%2F%2Fwww.nbc.com%2Fassets%2Fscet%2Fcommon%2Fframes%2Fads%2F%3Fsize%3D300x250%26showCode%3Dvce%26sub%3Dvideo%26sub2%3Dvideo-cat-1372689%26daypart%3Dprimetime%26genre%3DReality%26sect%3Dvce%22}" target="_blank"><img src="http://www.nbc.com/the-voice/images/vscet-samsung.jpg" width="239"/></a></div>').css({height: 'auto'});
	}
}); 
