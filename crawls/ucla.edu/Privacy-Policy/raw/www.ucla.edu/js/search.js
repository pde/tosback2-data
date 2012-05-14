//short id search
function submitform()
{
  var searchterm= document.searchform.q.value;
  if (IsNumeric(searchterm) == true && searchterm.length>4){ 
    document.searchform.method='post';
	document.searchform.action='http://map.ais.ucla.edu/go/'+searchterm+'';
  }else{
    document.searchform.action='http://gsa.search.ucla.edu/search';
  }
  document.searchform.submit();
}
function IsNumeric(strString)
     {
   var strValidChars = "0123456789.-";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
}