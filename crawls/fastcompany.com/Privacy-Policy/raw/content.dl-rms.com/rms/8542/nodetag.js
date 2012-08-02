(function(){ 
  var d=document,w=window;
  function r(){
	var z=d.createElement('SCRIPT');
	z.src='http://content.dl-rms.com/dt/s/8542/s.js';
	d.getElementsByTagName('head')[0].appendChild(z);
  }

 if(Math.random()<1) {
  if (d.readyState=="complete"){
	r();
  } else if (w.addEventListener){ 
	w.addEventListener("load", r, false);
  } else if (w.attachEvent){ 
	w.attachEvent("onload", r);
  }
 }
})();