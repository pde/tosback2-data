var FSR = {
    'version': '6.5.0',
    'date': '05/06/2011',
    'enabled': true,
    'auto': true,
    'encode': false,
    'files': '/store/foresee/',
    'id': 'pgp1Ys8od4McM0JNxYNk5Q==',
    'sites': [{
        path: /\w+-?\w+\.(com|org|edu|gov|net)/
    }, {
        path: 'localhost'
    }, {
        path: '172.17.1.105'
    }, {
        path: '172.17.1.106'
    }, {
        path: '172.17.1.107'
    }, {
        path: '172.17.1.108'
    }, {
        path: '172.16.1.201'
    }, {
        path: '.',
        domain: 'default'
    }]
};
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="fsr.a"+(FSR.site.cookie?"."+FSR.site.cookie:"")+"="+A+";path=/"+((FSR.site.domain)?";domain="+FSR.site.domain+";":";")+(FSR.site.secure?"secure":"")
}(function(){if(window!=window.top){return }function G(K){if(typeof K=="object"){var J=K.constructor.toString().match(/array/i);
return(J!=null)}return false}var I=FSR.sites;for(var F=0,D=I.length;F<D;F++){var B;if(!G(I[F].path)){I[F].path=[I[F].path]
}for(var E=0,C=I[F].path.length;E<C;E++){if(B=document.location.href.match(I[F].path[E])){FSR.siteid=F;
FSR.site=FSR.sites[FSR.siteid];if(!FSR.site.domain){FSR.site.domain=B[0]}else{if(FSR.site.domain=="default"){FSR.site.domain=false
}}if(!FSR.site.secure){FSR.site.secure=false}if(!FSR.site.name){FSR.site.name=B[0]}var A=["files","js_files","image_files","html_files","css_files"];
for(var F=0,H=A.length;F<H;F++){if(FSR.site[A[F]]){FSR[A[F]]=FSR.site[A[F]]}}break}}if(B){break}}if(!window["fsr$timer"]){fsr$setAlive();
window["fsr$timer"]=setInterval(fsr$setAlive,1000)}})();