/* FLASH DETECTION */
var WM_startTagFix = '<\/';

var msie_windows = 0;
var WM_detect_through_vb = 0;

if ((navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1)){
  msie_windows = 1;
  document.writeln('<script language="VBscript">');
  //document.writeln('Dim WM_detect_through_vb');
  document.writeln('WM_detect_through_vb = 0');
  document.writeln('If ScriptEngineMajorVersion >= 2 then');
  document.writeln('  WM_detect_through_vb = 1');
  document.writeln('End If');
  document.writeln('Function WM_activeXDetect(activeXname)');
  document.writeln('  on error resume next');
  document.writeln('  If ScriptEngineMajorVersion >= 2 then');
  document.writeln('     WM_activeXDetect = False');
  document.writeln('     WM_activeXDetect = IsObject(CreateObject(activeXname))');
  document.writeln('     If (err) then');
  document.writeln('        WM_activeXDetect = False');
  document.writeln('     End If');
  document.writeln('   Else');
  document.writeln('     WM_activeXDetect = False');
  document.writeln('   End If');
  document.writeln('End Function');
  document.writeln(WM_startTagFix+'script>');
}

function WM_pluginDetect(plugindescription, pluginxtension, pluginmime, activeXname){
  var i,plugin_undetectable=0,detected=0, daPlugin=new Object();

  if (msie_windows && WM_detect_through_vb) {
  //if (msie_windows){
      plugin_undetectable = 0;
  } 
  
  else {
      plugin_undetectable = 1;
  }  
  
  if(navigator.plugins) {
      numPlugins = navigator.plugins.length;
      if (numPlugins > 1) {
	  if (navigator.mimeTypes && navigator.mimeTypes[pluginmime] && navigator.mimeTypes[pluginmime].enabledPlugin && (navigator.mimeTypes[pluginmime].suffixes.indexOf(pluginxtension) != -1)) { // seems like we have it, let's just make sure and check the version (if specified)
	      if ((navigator.appName == 'Netscape') && (navigator.appVersion.indexOf('4.0') != -1)) { // stupid, stupid Netscape can't handle the references to navigator.plugins by number, sooo...
		  for(i in navigator.plugins) {
		      if ((navigator.plugins[i].description.indexOf(plugindescription) != -1) || (i.indexOf(plugindescription) != -1)) { // some versions of quicktime have no description. feh!
			  detected=1;
			  break;
		      }
		  }
	      } else {
		  for (i = 0; i < numPlugins; i++) {
		      daPlugin = navigator.plugins[i];
		      if ((daPlugin.description.indexOf(plugindescription) != -1) || (daPlugin.name.indexOf(plugindescription) != -1)) {
			  detected=1;
			  break;
		      }
		  }
	      }	      // Mac weirdness
      if (navigator.mimeTypes[pluginmime] == null) {
		  detected = 0;
	      }
	  }
	  return detected;
      } 
	  
	  else if((msie_windows == 1) && !plugin_undetectable){
	  return WM_activeXDetect(activeXname);
      } 
	  
	  else { 		
	  return 0;
      }
  } 
  
  else {
      return 0;
  }
}

var isItThere  = WM_pluginDetect('Flash', 'swf', 'application/x-shockwave-flash', 'ShockwaveFlash.ShockwaveFlash');
