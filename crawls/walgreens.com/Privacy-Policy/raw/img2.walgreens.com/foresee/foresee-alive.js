var fsLoc = document.location.href;
if (fsLoc.indexOf('http://www.walgreens.com') > -1) {
    fsBaseUrl = 'http://img.walgreens.com';
}
else 
    if (fsLoc.indexOf('https://www.walgreens.com') > -1) {
        fsBaseUrl = 'https://www.walgreens.com';
    }
    else {
        fsBaseUrl = '';
    }
var FSR = {
    'version': '6.1.0',
    'date': '07/22/2010',
    'enabled': true,
    'auto': true,
    'encode': false,
    'files': fsBaseUrl + '/foresee/',
    'trkfiles': '/foresee/',
    'image_files': fsBaseUrl + '/images/foresee/',
    'id': 'B1ZhR5ZQJd0UNApU4E4ZAA==',
    'sites': [{
        path: 'walgreens.com',
        cookie: 'session',
        domain: 'walgreens.com'
    }]
};
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="fsr.a="+A+";path=/"+((FSR.sites.domain)?";domain="+FSR.sites.domain+";":";")
}(function(){if(window!=window.top){return }function G(K){if(typeof K=="object"){var J=K.constructor.toString().match(/array/i);
return(J!=null)}return false}var I=FSR.sites;for(var F=0,D=I.length;F<D;F++){var B;if(!G(I[F].path)){I[F].path=[I[F].path]
}for(var E=0,C=I[F].path.length;E<C;E++){if(B=document.location.href.match(I[F].path[E])){FSR.siteid=F;
FSR.sites=FSR.sites[FSR.siteid];if(!FSR.sites.domain){FSR.sites.domain=B[0]}else{if(FSR.sites.domain=="default"){FSR.sites.domain=false
}}if(!FSR.sites.name){FSR.sites.name=B[0]}var A=["files","js_files","image_files","html_files"];for(var F=0,H=A.length;
F<H;F++){if(FSR.sites[A[F]]){FSR[A[F]]=FSR.sites[A[F]]}}break}}if(B){break}}if(!window["fsr$timer"]){fsr$setAlive();
window["fsr$timer"]=setInterval(fsr$setAlive,1000)}})();