var ind=0;
function callImageTag1(arrayImgPath,arrayImgWidth,arrayImgHeight,arrayImgAltText,arrayImgURL)
{
    var index = Math.floor(Math.random()*10);
    while(index >= arrayImgPath.length)
    {
        index = Math.floor(Math.random()*10);
    }
    ind=index;
    if(arrayImgURL[ind]!='')
    {
        document.write("<a href=" + replaceSpace(arrayImgURL[ind]) + " target='_top'><img src='" +  replaceSpace(arrayImgPath[index]) + "' border='0' width='" + arrayImgWidth[index] + "' height='" + arrayImgHeight[index] + "' alt=\"" + arrayImgAltText[index] + "\"></a>");
    }
    else
    {
        document.write("<img src='" + replaceSpace(arrayImgPath[index]) + "' border='0' width='" + arrayImgWidth[index] + "' height='" + arrayImgHeight[index] + "' alt=\"" + arrayImgAltText[index] + "\">");
    }
}

function replaceSpace(stringToSplit)
{
   var returnURL=' ';
          for(var i=0;i<stringToSplit.length;i++)
          {
		   if(stringToSplit.charAt(i) != ' ')
		   {
			if(returnURL!=' ')
			{
			   returnURL=returnURL + stringToSplit.charAt(i);
			}
		       else
			{
			   returnURL=stringToSplit.charAt(i);
			}
		    }
		    else
		     {
			  if(returnURL!=' ')
			   {
			       returnURL=returnURL+"_";
			   }
			 else
			   {
			      returnURL="_";
			   }

		      }
           
           }
        
       return returnURL;
}



function popUp(URL) 
{
    //URL = escape(URL); 
	pipeIndex = URL.indexOf("|");
	pipeIndexPlusOneVal = URL.substring(pipeIndex+1, pipeIndex+2);
    if (pipeIndex == -1){
    var leftOffset=0;
    var topOffset=0;    
    if(screen.width)
    {
        if(screen.width < 800)
        {
            leftOffset=60;
            topOffset=90;
        }
        else
        {
            if(screen.width>=800&&screen.width<1024)
            {
                leftOffset=160;
                topOffset=134;
            }
            else
            {
                if(screen.width>=1024)
                {
                    leftOffset=272;
                    topOffset=250;
                }
            }
        }
    }
    var winParam = "left=0,top=0,resizable=yes,scrollbars=yes,menubar=yes,location=yes,height="+screen.height+",width="+screen.width;
	}
	else if (pipeIndexPlusOneVal == "|")
	{
		var leftOffset=0;
	var topOffset=0;    
	if(screen.width)
	{
		if(screen.width < 800)
		{
			leftOffset=60;
			topOffset=90;
		}
		else
		{
			if(screen.width>=800&&screen.width<1024)
			{
				leftOffset=160;
				topOffset=134;
			}
			else
			{
				if(screen.width>=1024)
				{
					leftOffset=272;
					topOffset=250;
				}
			}
		}
	}
	var winParam = "left=0,top=0,resizable=yes,scrollbars=yes,menubar=yes,location=yes,height="+screen.height +",width="+screen.width;	
	}
	else {
		var winParam = URL.substring(pipeIndex+1, URL.length);
		URL = URL.substring(0, pipeIndex);
	}
    //alert(winParam);
    //var webWin=window.open(URL,"winview",'left='+leftOffset+',top='+topOffset+',screenx='+leftOffset+',screeny='+topOffset+',resizable=yes,scrollbars=yes,menubar=yes,location=yes');

    var webWin=window.open(URL,"winview",winParam);
	//var webWin=window.open(URL,"winview","menubar=1,resizable=1,width=600,height=510");
	//webWin.setSizeToFullscreen("noScale", "C");
	// webWin.document.focus();
    webWin.focus();
	//window.open (URL,"mywindow","menubar=1,resizable=1,width=600,height=510"); 
}

function callFlash(arrayImgPath,arrayImgWidth,arrayImgHeight)
{
    var index = Math.floor(Math.random()*10);
    while(index >= arrayImgPath.length)
    {
        index = Math.floor(Math.random()*10);
    }
    ind=index;

    if(hasRightVersion)
    {
       
	
       document.write("<embed src='" + arrayImgPath[index] + "' width='" + arrayImgWidth[index] + "' height='" + arrayImgHeight[index] + "'>");    
    }


}

               
