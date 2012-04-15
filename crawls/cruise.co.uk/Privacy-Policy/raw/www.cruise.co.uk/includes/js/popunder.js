var clicked = 0; 

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

$(document).click(function() 
{
	var  is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var  is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
	
	var  cookie_support = getCookie('cookie_support');
	
	if(!is_chrome && !is_opera && cookie_support && clicked == 0)
	{
		clicked = 1;
		var features = 'toolbar=1,location=0,directories=1,status=1,menubar=1,scrollbars=1,resizable=1';
		CruisesWin = window.open("http://www.cruises.co.uk",'_blank', features);
		CruisesWin.blur();
                
	}

});
