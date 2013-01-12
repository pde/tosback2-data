/*1357862349,178130467*/

if (self.CavalryLogger) { CavalryLogger.start_js(["wdvfS"]); }

__d("queryThenMutateDOM",["function-extensions","requestAnimationFrame"],function(a,b,c,d,e,f){b('function-extensions');var g=b('requestAnimationFrame');function h(n,o,p){if(!n&&!o)return;if(p&&i.hasOwnProperty(p)){return;}else if(p)i[p]=1;m();o&&j.push(o);n&&k.push(n);}var i={},j=[],k=[];function l(){var n=k;k=[];var o=j;j=[];i={};var p;for(p=0;p<n.length;++p)n[p]();for(p=0;p<o.length;++p)o[p]();}function m(){if(!k.length&&!j.length)g(g.curry(l));}e.exports=h;});