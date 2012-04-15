function Ajax()
{
    var xmlHttp = null;
    var verb = 'GET';var body = null;
    var url = '';handler = '';var element = '';
    var date = new Date();
        
    this.GetData = function(_url,_body,_verb,_handler)
    {
        if(_verb != '') {   verb = _verb;    }
        if(_body != '') {   body = _body;    }
        
        url = _url;
        handler = _handler;
        
        xmlHttp = AJ_X();
        if(xmlHttp != null)
        {
            xmlHttp.onreadystatechange = AJ_SC;
            xmlHttp.open(verb,url,true);
            xmlHttp.send(body);
        }
    }
    
    this.SendRequest = function(_url)
    {
		url = Ajax_AppendTimestamp(_url);
		
		xmlHttp = AJ_X();
        if(xmlHttp != null)
        {
			xmlHttp.onreadystatechange = function(){};
            xmlHttp.open(verb,url,true);
            xmlHttp.send(body);
        }
    }
    
    this.UpdateInnerHtml = function(_url,_element)
    {    
        url = _url;
        element = _element;
        
        xmlHttp = AJ_X();
        
        if(xmlHttp != null)
        {
            xmlHttp.onreadystatechange = Ajax_UpdateInnerHtml;
            xmlHttp.open(verb,url,true);
            xmlHttp.send(body);
        }
    }
	
	function Ajax_AppendTimestamp(_url){
		if(_url.indexOf('?') > -1){
			_url += '&nocache=' + date.getTime();
		}
		else{
			_url += '?nocache=' + date.getTime();
		}
		return _url;
	}

    function Ajax_UpdateInnerHtml(){
        if (xmlHttp.readyState == 4)
        {
            if (is404Page(xmlHttp.responseText))
                eval(handler + '(\'\')');
            else if (xmlHttp.status == 200)
            {
                document.getElementById(element).innerHTML = xmlHttp.responseText;
            }
        }
    }

    function AJ_SC()
    {
        if (xmlHttp.readyState == 4)
        {
            if (is404Page(xmlHttp.responseText))
                eval(handler + '(\'\')');
            else if (xmlHttp.status == 200)
            {
                var re = new RegExp('\'', 'gi');
                var r = xmlHttp.responseText.replace(re,'\\\'');
                var reNL = new RegExp('\n', 'g');
                r = r.replace(reNL,'');
                var reCR = new RegExp('\r', 'g');
                r = r.replace(reCR,'');
                eval(handler + '(\'' + r + '\')');
            }
        }
    }
    
    function AJ_X()
    {
        var oX = null;
        try
        {
            oX = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                oX = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(E)
            {
                oX = null;
            }
        }
        
        if((oX == null) && (typeof XMLHttpRequest != 'undefined'))
        {
            oX = new XMLHttpRequest();
        }
        return oX;
    }      
    
    function is404Page(sText) 
    {
        return sText.indexOf("The page you requested has been moved or does not exist") >= 0;
    }
}