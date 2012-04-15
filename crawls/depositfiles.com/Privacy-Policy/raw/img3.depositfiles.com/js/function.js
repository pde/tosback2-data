function toggle(obj_name)
{
	name = obj_name.substr( 0, obj_name.lastIndexOf('_') );
	siz = obj_name.substr( obj_name.lastIndexOf('_') + 1 );

	obj = document.getElementById(obj_name);

	if (siz == 'big') siz2 = 'small'; else siz2 = 'big';
	obj2 = document.getElementById(name+'_'+siz2);
	obj.style.display = 'none';
	obj2.style.display = 'block';
}
/*
$(document).ready(function(){
	if (!$('#fmid'))
		return ;
	var ec=new xc();
	ec.get('dfmid',function (value,all) {
		if (value == '' || value == 'undefined' || typeof(value) == 'undefined')
		{
			ec.set('dfmid',$('#fmid').val());
		}
	});
});
*/
function cache_img(src)
{
	var img = new Image();
	img.src = src;
}

function is_copy_to_clipboard_enabled()
{
	if(window.clipboardData)
	{
		return true;
	}
	return swfobject.hasFlashPlayerVersion('3');
}
function enable_copy_to_cliboard_links()
{
	if(is_copy_to_clipboard_enabled())
	{
		var coll = document.getElementsByTagName('a');
		for(i=0;i<coll.length;i++)
		{
			if(coll[i].className.indexOf('copy_to_clipboard') >= 0)
			{
				coll[i].style.display = 'inline';
			}
		}
	}
}
function copy_to_clipboard(text)
{
	if (window.clipboardData)
	{
		window.clipboardData.setData("Text",text);
	}
	else
	{
		if(!document.getElementById('copy_to_clipboard_flash'))
		{
			var divholder = document.createElement('div');
			divholder.id = 'copy_to_clipboard_flash';
			document.body.appendChild(divholder);
		}
		swfobject.embedSWF(http_static_path+'/flash/clipboard.swf', 'copy_to_clipboard_flash', '0', '0', '3', null, {clipboard:escape(text)});
	}
}

function get_elements_by_class(class_name, parent, tag)
{
	var res = new Array();
	var coll = parent.getElementsByTagName(tag);
	var reg = new RegExp('(^|\s)'+class_name+'($|\s)');
	for(i=0;i<coll.length;i++)
	{
		if(coll[i].className.match(reg))
		{
			res.push(coll[i]);
		}
	}
	return res;
}
function zero_pad(num)
{
	num = num.toString();
	var pos = num.lastIndexOf('.');
	if(pos == -1)
	{
		pos = num.length;
		num += '.';
	}
	var need = 2-num.length+pos;
	for(var i=0;i<=need;i++)
	{
		num+='0';
	}
	return num;
}

function send_payoff(place)
{
	if(place == 'signup' && !$('.useragreement INPUT[name=agree]').is(':checked'))
		return false;
	var info = $('input[name=payoff_info]').val();
	if (place && place == 'signup' && info == '')
		return true;
	var type = $('input[name=payoff_type]:checked').val();
	if (info.match(/z[\d]{10,}/i)) {
		if (type != 'webmoney') 
			$('#pt_webmoney').attr('checked', true);
	}		
	else if (info.match(/.+@.+\.[\w]+/)) {
		if (!type || type=='webmoney') 
			$('#pt_paypal').attr('checked', true);
	}
	else {
		$('input[name=payoff_info]').focus();
		$('#error').show();
		return false;
	}
	return true;
}

