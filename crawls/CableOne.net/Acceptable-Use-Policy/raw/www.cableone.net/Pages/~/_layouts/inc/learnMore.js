sfHover = function() { 
var sfEls = document.getElementById("nav").getElementsByTagName("LI"); 
for (var i=0; i<sfEls.length; i++) {
sfEls[i].onmouseover=function() { 
this.className+=" sfhover"; 
}
sfEls[i].onmouseout=function() { 
this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
}
}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);


function showanswer(q_tr_id)
{
var tempq_tr_id = q_tr_id.id;
var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
var trclicked =  document.getElementById("a" + a_tr_id);
var movequestion = document.getElementById("x" + a_tr_id);
var arrowChanger = document.getElementById("v" + a_tr_id);
	
if  (trclicked.style.display == 'none') {
   trclicked.style.display='block';
   movequestion.style.borderBottomWidth='0px';
   movequestion.style.height='29px';
   arrowChanger.src='../../SiteCollectionImages/for Your Home/arrow_selec.gif';
   } 
else {
   trclicked.style.display='none';
   movequestion.style.borderBottomWidth='1px';
   movequestion.style.height='30px';
   arrowChanger.src='../../SiteCollectionImages/for Your Home/arrow_norm.gif';				}   
}

function showanswerphone(q_tr_id)
{
var tempq_tr_id = q_tr_id.id;
var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
var trclicked =  document.getElementById("a" + a_tr_id);
var movequestion = document.getElementById("x" + a_tr_id);
var arrowChanger = document.getElementById("v" + a_tr_id);
	
if  (trclicked.style.display == 'none') {
   trclicked.style.display='block';
   movequestion.style.borderBottomWidth='0px';
   movequestion.style.height='29px';
   arrowChanger.src='../../../SiteCollectionImages/for Your Home/arrow_selec.gif';
   } 
else {
   trclicked.style.display='none';
   movequestion.style.borderBottomWidth='1px';
   movequestion.style.height='30px';
   arrowChanger.src='../../../SiteCollectionImages/for Your Home/arrow_norm.gif';				}   
}

function hideanswer(q_tr_id)
{
var tempq_tr_id = q_tr_id.id;
var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
showhidden_answer = "a"+a_tr_id+'.style.display="none"';
eval(showhidden_answer);
}

function hideanswerphone(q_tr_id)
{
var tempq_tr_id = q_tr_id.id;
var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
showhidden_answer = "a"+a_tr_id+'.style.display="none"';
eval(showhidden_answer);
}