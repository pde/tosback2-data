
$(document).ready(function(){$('#modal_email,#modal_bill,#modal_account').click(function(){modal_content='<iframe src ="'+$(this).attr('i_href')+'" width="'+$(this).attr('i_width')+'" height="'+$(this).attr('i_height')+'" frameborder="0" scroll="auto"></iframe>';SL_modal.display_modal(modal_content);return false;});var myModalValue=getUrlVars()["modal"];if((myModalValue=="email")||(myModalValue=="bill")||(myModalValue=="account"))
{$('#modal_'+myModalValue).trigger('click');}
function getUrlVars()
{var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++)
{hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
return vars;}});