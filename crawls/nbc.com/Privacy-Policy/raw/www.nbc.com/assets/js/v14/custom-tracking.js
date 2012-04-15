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