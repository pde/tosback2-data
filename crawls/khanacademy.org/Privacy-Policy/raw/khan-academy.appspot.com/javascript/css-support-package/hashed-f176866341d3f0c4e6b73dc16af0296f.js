// Create a dummy version of each HTML5 element we use so that IE 6-8 can style
// them. Include me before <body> or these bunnies will be sad:
// http://i.imgur.com/T1bsH.jpg
(function(){var a=["header","footer","nav","article","section","menu"];for(var b=0;b<a.length;b++)document.createElement(a[b])})();