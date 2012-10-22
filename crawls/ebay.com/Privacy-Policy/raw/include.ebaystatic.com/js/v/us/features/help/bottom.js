//<!--
//1@@m3

function ebSCGetPageName()
{var u="undefined",s,n,oDoc=ebay.oDocument,rcode="rcode",sRC,oRC;s="__";n=window.location.pathname.split("/").join(s).substr(2);sRC=oDoc.getQueryValue(rcode);if(!sRC&&n.toLowerCase().indexOf("contact_us")!=-1)
{oRC=oDoc.getFormElem(rcode);if(oRC)
sRC=oRC.value;}
s=sRC?s:"";return n+s+sRC;}
var pageName=ebSCGetPageName();
// b=15468344 -->