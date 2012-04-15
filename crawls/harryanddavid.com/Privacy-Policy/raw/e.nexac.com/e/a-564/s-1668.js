function na_getKwds()
{
  var meta = document.all ? document.all.tags('META') : (document.getElementsByTagName ? document.getElementsByTagName('META') : [] );

  var kwds='', s='', m=0, k=0, kmax=30;
  for(; m < meta.length; ++m) {
    if (meta[m].name == 'keywords') {
      kwds = kwds + s + meta[m].content;
      s = ',';
      if (++k > kmax) break;
    }
  }
  return kwds;
}

function crypt(a)
{
  var E = 'w9lyoOaRz1WHTKMdUBZVDgEQ5rN7xCGJAesI6qfFXcLnjit2ph4mbPYkvu0S38'
  var D = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var i,  k, z='';
  for(i=0; i<a.length; ++i) {
     k = E.indexOf(a.charAt(i));
     if (k<0) {
        z += a.charAt(i);
     } else {
        z += D.charAt(k);
     }
  }
  return z;
}


na_random = new String (Math.random()); na_random = na_random.substring(2,11);
na_url = location.href;
na_referrer = document.referrer;
na_title = document.title;
na_frame_url  = location.protocol + '//f.nexac.com/e/a-564/s-1668.xgi?na_random=' + na_random;
na_frame_url += '&na_url=' + escape(na_url);
na_frame_url += '&na_referrer=' + escape(na_referrer);
na_frame_url += '&na_title=' + escape(na_title);
na_frame_url += '&na_crypt=' + 'true';
na_frame_url += '&na_bksite=' + '5439';
na_frame_url += '&na_trncnv=' + '1DPJvGLKaUk52hnqFmAtsgOk7ngBIfMU3os5anvBVYwm547VMm6HujyM3dJl5p46hnG69ijEvy6ZiRRmPGEsdw';
na_frame_url += '&na_trntrg=' + 'Yh3ZZacfkQRADD-WodJX77MF3jQHzpPP1-jsVazf2dYm547VMm6HujyM3dJl5p46VjiuWQoYhmaOQvNupgJDVQ';
na_frame_url += '&na_trncrt=' + '';
na_frame_url += '&go_mmath=N';
var w = window;
if (w.na_ci) { na_frame_url += '&na_ci=' + escape(crypt(na_ci)); }
if (w.na_oi) { na_frame_url += '&na_oi=' + escape(na_oi); }
if (w.na_ov) { na_frame_url += '&na_ov=' + escape(na_ov); }
if (w.na_fn) { na_frame_url += '&na_fn=' + escape(crypt(na_fn)); }
if (w.na_ln) { na_frame_url += '&na_ln=' + escape(crypt(na_ln)); }
if (w.na_zc) { na_frame_url += '&na_zc=' + escape(crypt(na_zc)); }
if (w.na_cy) { na_frame_url += '&na_cy=' + escape(crypt(na_cy)); }
if (w.na_st) { na_frame_url += '&na_st=' + escape(crypt(na_st)); }
if (w.na_a1) { na_frame_url += '&na_a1=' + escape(crypt(na_a1)); }
if (w.na_a2) { na_frame_url += '&na_a2=' + escape(crypt(na_a2)); }
if (w.na_em) { na_frame_url += '&na_em=' + escape(crypt(na_em)); }
if (w.na_ev) { na_frame_url += '&na_ev=' + escape(na_ev); }
if (w.na_qr) { na_frame_url += '&na_qr=' + escape(na_qr); }

na_frame_url += '&na_kw=' + escape(na_getKwds());

document.write("<div id='nexacdiv'><iframe src='" + na_frame_url + "' name='naframe1' height='0' width='0' frameborder='0'></iframe></div>");

sensitive = 'N';
na_timeout = 2000;
if (sensitive != 'Y') {
	na_timeout = 6000;
}
 
setTimeout('timeOutTag()',na_timeout);

function timeOutTag() {
        document.getElementById('nexacdiv').innerHTML = '';
}