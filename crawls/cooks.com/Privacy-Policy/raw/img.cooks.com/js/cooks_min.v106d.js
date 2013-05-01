
function c_read(name){var jar=document.cookie.split(';');var id=name+"=";var result="";for(var i=0;i<jar.length;i++){var c=jar[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(id)==0){result=c.substring(id.length,c.length);break;}}
if(result.length==0)result=":";return(result);}
function c_inc(c,pre){var re=new RegExp("(:"+pre+"([\\d]+):)");var result=re.exec(c);if(result==null){c+=pre+"1:";}else{re=new RegExp(result[1],"g");var r=":"+pre+(parseInt(result[2])+1).toString()+":";c=c.replace(re,r);}
return(c);}
function c_update(name,pre){if(pre!=""){var c=c_read(name);c=c_inc(c,pre);document.cookie=name+"="+c+"; path=/; domain=.cooks.com;";}}
function switchfocus(){if(location.href.indexOf('#')==-1){if(document.topsearch.q){window.scrollTo(0,0);document.topsearch.q.focus();}}}
function settip(){var q=document.getElementById("topsearch-q");if(q&&q.value=='')q.className="searchtip";if(location.href.indexOf('#')==-1){show_fixed_search.status=false;$('#csfblock').hide();window.scrollTo(0,0);}
$('#grskinner-wrap').css('z-index','-2').css('top','260px');$('#grskinner-innerwrap').css('width','980px').css('left','-490px');}
function ch(id){document.getElementById(id).style.display='none';}
function cs(id){document.getElementById(id).style.display='block';}
function cooks_nl_submit(form){var email=form.email.value;if((email.length==0)||(email==null))return false;if(email.indexOf('@')==-1)return false;var e="document.getElementById('cooks_newsletter').innerHTML = '<B>Thanks for signing up!<\/B>'";eval(e);document.cookie="cooks_nl=:SUBMIT:; path=/;";var posturl="http://ec.cooks.com/form204?w=cooks_newsletter&e="+escape(email);window.location.href=posturl;}
function cooks_co_submit(form){var name=form.name.value;var email=form.email.value;var comment=form.comment.value;var url=form.url.value;var title=form.title.value;var rating=0;for(var i=0;i<form.rating.length;i++){if(form.rating[i].checked)
rating=form.rating[i].value;}
if((name.length==0)||(name==null))return false;if((email.length==0)||(email==null))return false;if(email.indexOf('@')==-1)return false;if((comment.length==0)||(comment==null))return false;if((url.length==0)||(url==null))return false;if((title.length==0)||(title==null))return false;var e="ch('c_co_f1'); ch('c_co_f2'); ch('c_co_f3'); ch('c_co_f4'); ch('c_co_f5'); document.getElementById('c_co_msg').innerHTML = '<B>Your comment has been sent. Thank you!<\/B>'";eval(e);var posturl="http://ec.cooks.com/form204?w=cooks_comment&n="+escape(name)+"&e="+escape(email)+"&r="+escape(rating)+"&c="+escape(comment)+"&u="+escape(url)+"&t="+escape(title);window.location.href=posturl;}
function show_fixed_search(){if(show_fixed_search.status==false){$('#csfblock').slideDown(100);}
show_fixed_search.status=true;}
if(window.jQuery){$(document).ready(function(){var csfblock_pos=$('#aftercsf').offset().top;show_fixed_search.status=false;$(document).scroll(function(){if($(this).scrollTop()>csfblock_pos){show_fixed_search();}else if(show_fixed_search.status==true){$('#csfblock').slideUp(100);show_fixed_search.status=false;}});$(window).bind("pageshow",function(event){settip();});settip();});}