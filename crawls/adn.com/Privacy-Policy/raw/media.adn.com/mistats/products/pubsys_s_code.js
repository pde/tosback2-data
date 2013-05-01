(function ()
{
   var i;
   var scripts;
   
   scripts = document.getElementsByTagName('script');
   for (i = 0; !mistats.prodPath && i < scripts.length; i++)
      mistats.prodPath = (scripts[i].src || '').match(/https*:\/\/media2*\.[^\.]+\.com\/mistats\/products/i);

   mistats.prodPath = mistats.prodPath ? mistats.prodPath[0] : 'http://media.kentucky.com/mistats/products';
})();

if ((mistats.bizunit || '').match(/TCH|LED/))
   document.write('<scr' + 'ipt type="text/javascr' + 'ipt" src="' + mistats.prodPath + '/pubsys_s_code_25.4.js"></scr' + 'ipt>');
else
   document.write('<scr' + 'ipt type="text/javascr' + 'ipt" src="' + mistats.prodPath + '/pubsys_s_code_20.3.js"></scr' + 'ipt>');

