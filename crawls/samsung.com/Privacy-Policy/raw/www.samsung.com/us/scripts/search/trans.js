/**
 * Constructor for EnKoTransformer.
 * created by choong10
 * created date 2008-05-20
 */
function EnKoTransformer() {
	this.__reg_h = "[" + this.__en_h + "]"; 
	this.__reg_exp = new RegExp("("+this.__reg_h+")("+this.__reg_b+")((?:"+this.__reg_f+")(?=(?:"+this.__reg_h+")(?:"+this.__reg_b+"))|(?:"+this.__reg_f+"))","g");
}

//
// Private members
//
EnKoTransformer.prototype.__en_h = "rRseEfaqQtTdwWczxvg";
EnKoTransformer.prototype.__reg_h = null;
EnKoTransformer.prototype.__en_b = {  k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20 };
EnKoTransformer.prototype.__reg_b  = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l"; 
EnKoTransformer.prototype.__en_f = {  "":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27 } ;
EnKoTransformer.prototype.__reg_f = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|"; 
EnKoTransformer.prototype.__reg_exp = null;

//
// Public methods
//
EnKoTransformer.prototype.transform = function(str) {	
	var transfromStr ="";
	
	if ( this.__isAlphabet( str)) {
			if (str.length >= 4 ) {
				transfromStr = this.__toKorean( str );
			} 
	} else {
			//alert( "not english");
			transfromStr = "";
	}
	
	return transfromStr;
};


//
// Private methods
//
EnKoTransformer.prototype.__toKorean = function(str) {
	return str.replace(this.__reg_exp, replace); 
};

/*
 문제점 : this.__en_h,  this.__en_b, this.__en_f에 값이 undefined로 나옴.
 해결방법 : 일반 함수와 일반 전역 변수를 사용하여 replace함수를 정의함
EnKoTransformer.prototype.replace = function(str,h,b,f) {
	return String.fromCharCode( this.__en_h.indexOf(h)*21*28 + this.__en_b[b]*28 + this.__en_f[f] + 44032); 
};
*/

EnKoTransformer.prototype.__containsCharsOnly = function(str,chars) {
  for (var inx = 0; inx < str.length; inx++) {
     if (chars.indexOf(str.charAt(inx)) == -1)
         return false;
  }
  return true;
};
	
EnKoTransformer.prototype.__isAlphabet = function(str) {	
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	return this.__containsCharsOnly(str,chars);	
};


//
// normal function & global variables
//
var __en_h = "rRseEfaqQtTdwWczxvg";
var __en_b = {  k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20 };
var __en_f = {  "":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27 } ;
	
function replace (str,h,b,f) {
	return String.fromCharCode( __en_h.indexOf(h)*21*28 + __en_b[b]*28 + __en_f[f] + 44032); 
};