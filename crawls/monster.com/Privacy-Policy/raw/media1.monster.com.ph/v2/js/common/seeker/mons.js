function getMediaDomain()
{
    return document.domain.replace(/^.*?monster/,'media1.monster');
}

var opOnblankdiv = function ()
{       
        var allDivToOperate = document.getElementsByTagName('div');
        for (var cntDiv in allDivToOperate)
        {
        	var divToOperate = allDivToOperate[cntDiv];
            if ( divToOperate && divToOperate.style && divToOperate.style.width && divToOperate.style.height && divToOperate.style.width == '4px' && divToOperate.style.height == '4px' && divToOperate.innerHTML == '' )
        	{
        	        divToOperate.innerHTML = '<img src="http://'+getMediaDomain()+'/v2.1/trans.gif" width="4px" height="4px">';
        	}
        }
}

            
if (window.addEventListener)
        window.addEventListener("load", opOnblankdiv, false);
else if (window.attachEvent)
        window.attachEvent("onload", opOnblankdiv);
else if (document.getElementById)
        window.onload=opOnblankdiv;


