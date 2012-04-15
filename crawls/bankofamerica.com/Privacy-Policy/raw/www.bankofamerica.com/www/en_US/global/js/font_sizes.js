/* Multiple the size of the font for each style sheet rule 
   for all linked and embedded style sheets
*/

var platform	   = navigator.platform.toLowerCase();	// Operating system
var userAgent     = window.navigator.userAgent;       // Browser user agent string

function multipleFontSize(factor)
{
   var styleSheet;
   var i;
   var done;

   if (platform.indexOf("win") != -1 && userAgent.indexOf("MSIE 5.2") == -1 && userAgent.indexOf("MSIE 5.1") == -1 && userAgent.indexOf("MSIE 5.0") == -1 && userAgent.indexOf("MSIE 4") == -1) 
   {
      for(i=0;i<document.styleSheets.length;i++)
      {
         styleSheet = document.styleSheets[i].cssText;
         styleSheet = styleSheet.toLowerCase();

         var pattern = /font-size\s*:\s*([\d\.]+)((em)|%)+/g;
         pattern.multiline = true;
         done = false;

         while (!done)
         {
            var result = pattern.exec(styleSheet);
            if (result == null)
            {
               done = true;
            }
            else
            {
               strLeft = styleSheet.substring(0, result.index-1);
               strMid = result[0];
               strRight = styleSheet.substring(result.index +  result[0].length);
               size = result[1];
               size *= factor;
               var number_pattern = /(\d*.?\d{0,2})\d*/;
               var number_result = number_pattern.exec(size);
               strMid = strMid.replace(result[1], number_result[1]);
               styleSheet = strLeft + strMid + strRight;
            }  // end if-else
          } // end while
         document.styleSheets[i].cssText= styleSheet;
      } // end for 
   } // end if
}  // end function

/* Examine the default page font 
   if too small, increase by a percent factor
*/
function examineFontSize(ref)
{ 
   if (document.getElementById)
      if (document.getElementById(ref).currentStyle)
      { 
	      var size = document.getElementById(ref).currentStyle.fontSize;
	      var index = size.indexOf("pt");
	      var newstr = parseInt(size.substr(0,index));

         if (newstr < 10)
	      {          
            convertUnits(); 
            multipleFontSize(1.3); 
 	      }
         else if (newstr < 12)
         {
            convertUnits();   
            multipleFontSize(1.2);
         }  // end if-else
      }  // end if	 
}  // end function

// convert em to %
function convertUnits()
{
   var styleSheet;
   var i;
   var done;

   if (platform.indexOf("win") != -1 && userAgent.indexOf("MSIE 5.2") == -1 && userAgent.indexOf("MSIE 5.1") == -1 && userAgent.indexOf("MSIE 5.0") == -1 && userAgent.indexOf("MSIE 4") == -1) 
   {
      for(i=0;i<document.styleSheets.length;i++)
      { 
         styleSheet = document.styleSheets[i].cssText;
         styleSheet = styleSheet.toLowerCase();
         
         var pattern = /(font-size\s*:\s*([\d\.]+))(em)+/g;
         pattern.multiline = true;
         done = false;
         
         while (!done)
         {  
            var result = pattern.exec(styleSheet);
            if (result == null)
            {    
               done = true;
            }
            else
            {      
               strLeft = styleSheet.substring(0, result.index-1);
               strMid = result[1]; 
               strRight = styleSheet.substring(result.index +  result[0].length);
               size = result[2];
               size *= 100;
               strMidReplace = "font-size: " + size + "%";
               strMid = strMid.replace(result[1], strMidReplace);
               styleSheet = strLeft + strMid + strRight;
             }  // end if-else
          } // end while
          document.styleSheets[i].cssText= styleSheet;
       } // end for
    } // end if
    
} // end function



