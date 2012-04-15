/* Popup handling. */

function popup(url) {
  var features = 'location=0,statusbar=0,menubar=0,scrollbars=1,width=615,height=700';
  var theWindow = window.open(url,'_blank',features);
  theWindow.focus();
  return theWindow;
}

/* Example html:
   <a href="http://www.google.com" target="_blank" onclick="popup('http://www.google.com'); return false">pop me up</a>
*/   
