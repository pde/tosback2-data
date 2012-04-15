// JScript File
function ServerFeeding(args, context)
{
    if (args != ''){
        var result = args.substring(0,args.indexOf('**'))
        
        //Displaying the result on to div
        var ss = document.getElementById("resultmiles");
        ss.style.display = ""; //making the div visibility 
        ss.innerHTML = "<b>" + result + "</b>";        
        var k;
        if(args.indexOf('||') > 0){
            var cabintypearray = args.substring(args.indexOf('**') + 2, args.indexOf('||')).split(',');   //args.split(',');
            for (k=0; k<cabintypearray.length; k++){
                if(cabintypearray[k] == 'Business'){
                    document.forms[0].rdoCabin2.disabled = false;
                }
                else{
                    document.forms[0].rdoCabin2.disabled = true;
                }
                break;
            }
        }
        
        
        //retain the selection option on radio buttons
        //var argarray = args.substring(args.indexOf('**') + 2).split(',');   //args.split(',');
        var argarray = args.substring(args.indexOf('||') + 2).split(',');   //args.split(',');
        
        var i;
        var j = 0;
        for(i=0; i<document.forms[j].elements.length; i++)
        {
            if ((document.forms[j].elements[i].type == 'radio') || (document.forms[j].elements[i].type == 'checkbox'))
            {
                for (k=0; k<argarray.length; k++)
                {
                    if(argarray[k] == document.forms[j].elements[i].value){
                        document.forms[j].elements[i].checked = true;
                        break;
                    }
                    else
	                {
	                    if (document.forms[j].elements[i].type == 'checkbox')
	                    {
	                        document.forms[j].elements[i].checked = false;
	                    }
	                }
                }
            }
        }
    }
}

function callServer(args)
{
    var argValue = '';
    var i;
    var j;
    var flag;
    var radioname;
    
	for (j=0; j<document.forms.length; j++)
	{
		for(i=0; i<document.forms[j].elements.length; i++)
		{
		    if ((document.forms[j].elements[i].type == 'radio') || (document.forms[j].elements[i].type == 'checkbox'))
		    {
		    
		        radioname = document.forms[j].elements[i].id;
		        if ((radioname.substring(radioname.length - 3) != "rd1") && (radioname.substring(radioname.length - 3) != "rd2") && (radioname.substring(radioname.length - 3) != "rd3") && (radioname.indexOf("CustomerHeader") < 0))
		        {
		            if (document.forms[j].elements[i].checked){
		                argValue += document.forms[j].elements[i].value + ',';
		            }
		        }
		    }
		}
	}
    callBack (argValue,"ClientContext");
    return false;
}



//------------------------------------------------------------------
       
function callServerForLanguages(countriesValue)
{
    var ddl = document.getElementById(countriesValue);
    var myindex  = ddl.selectedIndex
	var argValue = ddl.options[myindex].value
    callBack (argValue,"ClientContext");
    return false;
}
function GetValues(countriesText)
{
	var argValue = "";
            
            var i;
            var j;
            var radioname;
	        for (j=0; j<document.forms.length; j++)
	        {
		        for(i=0; i<document.forms[j].elements.length; i++)
		        {
		            if ((document.forms[j].elements[i].type == 'radio') && (document.forms[j].elements[i].checked == true))
		            {
		                radioname = document.forms[j].elements[i].id;
		                if ((radioname.substring(radioname.length - 3) == "rd1") || (radioname.substring(radioname.length - 3) == "rd2") || (radioname.substring(radioname.length - 3) == "rd3"))
		                {
		                    //alert(document.forms[j].elements[i].checked + '---------------------' + radioname);
		                    argValue = document.forms[j].elements[i].value;
		                    break;
		                }
		            }
		        }
	        }
	//alert(argValue);
    document.getElementById(countriesText).value = argValue;
    //alert(document.getElementById(countriesText).value);
    return false;
}

function ServerRadios(args, context)
{
    if (args.indexOf('**') > 0)
    {
        ServerFeeding(args, context)
    }
    else
    {            
        if (args != ''){
        //alert(args + '--args');
        var argarray = args.split('*');   //args.split(',');
        var ss = document.getElementById("resultLang");
        ss.style.display = ""; //making the div visibility 
            
            
            var k;
            var l = 0;
            var i;
            var j;
            var radioname;
            var e;
            var f;
            var lang;
            
            
            l++;
            //Clear all the radio buttons first so that they can be made enabled if the selected country has choices, if not let the display be none
                //Iam doing this first because it is difficult to make display as visible later
                for (j=0; j<document.forms.length; j++)
	            {
		            for(i=0; i<document.forms[j].elements.length; i++)
		            {
		                f = "rd" + l;
		                if (document.forms[j].elements[i].type == 'radio')
		                {
		                    radioname = document.forms[j].elements[i].id;
    		                 
		                    if (radioname.substring(radioname.length - 3) == f)
		                    {
		                        document.forms[j].elements[i].style.display = "none";
		                        l++;
		                    }
		                }
		            }
	            }
                var rdresult = document.getElementById("rd1Name");
                rdresult.innerHTML =  "";
                rdresult = document.getElementById("rd2Name");
                rdresult.innerHTML =  "";
                rdresult = document.getElementById("rd3Name");
                rdresult.innerHTML =  "";

    	        
    	        
    	        
            l = 0;
            
            for (k=0; k<argarray.length; k++)
            {
                l = k + 1;
                e = "rd" + l + "Name";
                f = "rd" + l;
                //alert( e + "-e-" + f + "-f");
                
                
                
                //Get the language code and language descriptions and assign to variables
                
                var rdresult = document.getElementById(e);
                rdresult.innerHTML =  argarray[k];
                lang = argarray[k].substring(0, argarray[k].indexOf('/'));
                rdresult.innerHTML =  argarray[k].substring(argarray[k].indexOf('/')+1);
                
                
	            for (j=0; j<document.forms.length; j++)
	            {
		            for(i=0; i<document.forms[j].elements.length; i++)
		            {
		                //alert(document.forms[j].elements[i].type + ' -- type--' + document.forms[j].elements[i].id + '--name');
		                if (document.forms[j].elements[i].type == 'radio')
		                {
		                    radioname = document.forms[j].elements[i].id;
		                    //alert(radioname.substring(radioname.length - 3) + '----------' + f);
		                    if (radioname.substring(radioname.length - 3) == f)
		                    {
		                        //document.forms[j].elements[i].value = argarray[k];
		                        document.forms[j].elements[i].value = lang;
		                        document.forms[j].elements[i].style.display = ""
		                        break;
		                    }
		                }
		            }
    		        
	            } 
            }
        }
    }
}

//------------------------------------------------------------------

function ReceiveServerData(retValue) {
    document.getElementById("divRewardChart").innerHTML = retValue;
    if (retValue != '') {
        document.getElementById("divTRsrchbox").style.display = "";
        document.getElementById("divURsrchbox").style.display = "none";
        document.getElementById("printchart").style.display = "";
    }
    else {
        document.getElementById("divTRsrchbox").style.display = "none";
        document.getElementById("divURsrchbox").style.display = "none";
        document.getElementById("printchart").style.display = "none";
        document.getElementById('spheader').innerHTML = "";
    }
}