var playMedia_width = 200;
var playMedia_height = 200;
playMedia.playerVersion = ''

function playMedia(doc, downloadLink, ext, haveFlv, streamer, w, h, options) {
  if (Utils.getFlashVersion() == 0) {
    $('<div>').addClass("fakePlayer").appendTo($('#music1'))
    $('<div>').appendTo($('#music1 .fakePlayer'))
    $('<span>').html('<b><t:t>You need to upgrade your Adobe Flash Player</t:t></b><br />').appendTo($('#music1 .fakePlayer div'))
    $('<span>').html('<a href="http://www.adobe.com/support/flashplayer/downloads.html"><t:t>Download it from Adobe</t:t></a>').appendTo($('#music1 .fakePlayer div'))
    return
  }

  playMedia.playerVersion =  options ? options.playerVersion ? options.playerVersion + '/' : '' : '';

  var s;
  ext = ext.toLowerCase();
  if (haveFlv) {
    s = getVideoFlashPlayer(downloadLink, streamer, w, h);
    /*getMediaPlayer(downloadLink);*/
    return;
  }
  else if (ext == "swf") {
    s = getFlash(downloadLink);
  }
  else {
    if (ext == "mpg" ||
        ext == "mpeg" ||
        ext == "3gp" ||
        ext == "m4a" ||
        ext == "mov") {
      s = getQuickTime(downloadLink);
    }
    else {
      if (ext == "mp3") {
          s = getAudioFlashPlayer(downloadLink, w, h);
          /*getMediaPlayer(downloadLink);*/        
        return;
      } else {
        s = getMediaPlayer(downloadLink);
        /*getVideoFlashPlayer(downloadLink);*/
        /*return;*/
      }
    }
  }
  doc.getElementById('music1').innerHTML = s;
}

function playMedia2(doc, downloadLink, ext, haveFlv, streamer, w, h, options) {
  if (Utils.getFlashVersion() == 0) {
    $('<div>').addClass("fakePlayer").appendTo($('#music2'))
    $('<div>').appendTo($('#music2 .fakePlayer'))
    $('<span>').html('<b><t:t>You need to upgrade your Adobe Flash Player</t:t></b><br />').appendTo($('#music2 .fakePlayer div'))
    $('<span>').html('<a href="http://www.adobe.com/support/flashplayer/downloads.html"><t:t>Download it from Adobe</t:t></a>').appendTo($('#music1 .fakePlayer div'))
    return
  }

  playMedia.playerVersion =  options ? options.playerVersion ? options.playerVersion + '/' : '' : '';

  var s;
  ext = ext.toLowerCase();
  if (haveFlv) {
    s = getVideoFlashPlayer2(downloadLink, streamer, w, h);
    /*getMediaPlayer(downloadLink);*/
    return;
  }
  else if (ext == "swf") {
    s = getFlash(downloadLink);
  }
  else {
    if (ext == "mpg" ||
        ext == "mpeg" ||
        ext == "3gp" ||
        ext == "m4a" ||
        ext == "mov") {
      s = getQuickTime(downloadLink);
    }
    else {
      if (ext == "mp3") {
        s = getAudioFlashPlayer2(downloadLink, w, h);
        /*getMediaPlayer(downloadLink);*/
        return;
      } else {
        s = getMediaPlayer(downloadLink);
        /*getVideoFlashPlayer(downloadLink);*/
        /*return;*/
      }
    }
  }

  $('#music2').html(s)
}

function checkHtml5Audio(type) {
  var audio = document.createElement('audio');
  return !DetectFlashVer(9,0,0) && !!audio.canPlayType && audio.canPlayType(type);
}


function getAudioHtml5Player(downloadLink, w, h) {
  return "<video src='"+downloadLink+"' controls autoplay width='"+w+"' height='"+h+"'/>";
}

function getAudioFlashPlayer(downloadLink, width, height) {  
  var so = new SWFObject('/flash/player/' + playMedia.playerVersion + 'player.swf', 'ply', width ? width : "300", height ? height : "24", '8');
  so.addParam('allowfullscreen', 'false');
  so.addParam('allowscriptaccess', 'always');
  so.addParam('flashvars', 'file=' + downloadLink + '&volume=50&logo.file=/images/logo.png&logo=/images/logo.png&autostart=true');

  so.write('music1');
}

function getAudioFlashPlayer2(downloadLink, width, height) {
  var so = new SWFObject('/flash/player/' + playMedia.playerVersion + 'player.swf', 'ply', width ? width : "300", height ? height : "24", '8');
  so.addParam('allowfullscreen', 'false');
  so.addParam('allowscriptaccess', 'always');
  so.addParam('flashvars', 'file=' + downloadLink + '&volume=50&logo.file=/images/logo.png&logo=/images/logo.png&autostart=true');

  so.write('music2');
}

function getVideoFlashPlayer(downloadLink, streamer, width, height) {

  var so = new SWFObject("/flash/player/" + playMedia.playerVersion + "player.swf", "ply", width ? width : "300", height ? height : "245", "8");
  so.addParam("allowfullscreen", "true");
  so.addParam('allowscriptaccess', 'always');
  var s = streamer === true ? "&streamer=" + downloadLink : "";
  so.addParam('flashvars', 'file=' + downloadLink + s + '&volume=50&logo.file=/images/logo.png&logo=/images/logo.png&autostart=true');

  so.write('music1');


}

function getVideoFlashPlayer2(downloadLink, streamer, width, height) {
  var so = new SWFObject("/flash/player/" + playMedia.playerVersion + "player.swf", "ply", width ? width : "300", height ? height : "245", "8");
  so.addParam("allowfullscreen", "true");
  so.addParam('allowscriptaccess', 'always');
  var s = streamer === true ? "&streamer=" + downloadLink : "";
  so.addParam('flashvars', 'file=' + downloadLink + s + '&volume=50&logo.file=/images/logo.png&logo=/images/logo.png&autostart=true');

  so.write('music2');
}

function getMediaPlayer(downloadLink) {
  return "<object id='Player' name='Player' width='" + playMedia_width + "' height='" + playMedia_height + "' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6' standby='Loading Video...' type='application/x-oleobject'>" +
      "<param name='URL' value='" + downloadLink + "'>" +
      "<param name='AllowChangeDisplaySize' value='True'>" +
      "<param name='AutoSize' value='False'>" +
      "<param name='DisplaySize' value=0>" +
      "<param name='ShowControls' value='True'>" +
      "<param name='showstatusbar' value='True'>" +
      "<param name='AutoRewind' value='True'>" +
      "<param name='autoStart' value='true'>" +
      "<embed name='Player' src='" + downloadLink + "' type='application/x-mplayer2' width='" + playMedia_width + "' height='" + playMedia_height + "' ShowStatusBar='1' AutoSize='true' loop='true' DisplaySize='0' pluginspage='http://www.microsoft.com/Windows/Downloads/Contents/Products/MediaPlayer/'>" +
      "</embed>" +
      "</object>"
}


function getFlash(downloadLink) {
  return "<object id='globalnav-object'" +
      "classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'" +
      "codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0'" +
      "width='" + playMedia_width + "'" +
      "height='" + playMedia_height + "'>" +
      "<param name='movie' value='" + downloadLink + "' />" +
      "<param name='FlashVars' value='loc=en_US' />" +
      "<param name='menu' value='false' />" +
      "<param name='quality' value='high' />" +
      "<param name='salign' value='tl' />" +
      "<param name='scale' value='auto' />" +
      "<embed id='globalnav-embed'" +
      "src='" + downloadLink + "'" +
      "type='application/x-shockwave-flash'" +
      "pluginspage='http://www.macromedia.com/go/getflashplayer'" +
      "flashvars='loc=en_US'" +
      "menu='true'" +
      "quality='high'" +
      "salign='tl'" +
      "scale='auto'" +
      "width='" + playMedia_width + "'" +
      "height='" + playMedia_height + "'>" +
      "</embed>" +
      "</object>";
}

function getQuickTime(downloadLink) {
  return "<OBJECT CLASSID='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'" +
      "WIDTH='" + playMedia_width + "'" +
      "HEIGHT='" + playMedia_height + "'" +
      "CODEBASE='http://www.apple.com/qtactivex/qtplugin.cab'>" +
      "<PARAM NAME='src' VALUE='" + downloadLink + "'>" +
      "<PARAM NAME='controller' VALUE='true'>" +
      "<PARAM NAME='autoplay' VALUE='true'>" +
      "<PARAM NAME='target' VALUE='myself'>" +
      "<PARAM NAME='pluginspage' VALUE='http://www.apple.com/quicktime/download/index.html'>" +
      "<PARAM NAME='cache' VALUE='true'>" +
      "<PARAM NAME='scale' VALUE='tofit'>" +
      "<EMBED WIDTH='" + playMedia_width + "'" +
      "HEIGHT='" + playMedia_height + "'" +
      "CONTROLLER='true'" +
      "autoplay='true'" +
      "TARGET='myself'" +
      "SRC='" + downloadLink + "'" +
      "BORDER='0'" +
      "cache='true'" +
      "scale='tofit'" +
      "PLUGINSPAGE='http://www.apple.com/quicktime/download/index.html'>" +
      "</EMBED>" +
      "</OBJECT>";
}

function setInnerHtml(elementId, htmlText) {
  // used to create flash controls
  // must be in external script, otherwise MSIE requires extra click to activate control
  document.getElementById(elementId).innerHTML = htmlText;
}

function documentWrite(htmlText) {
  // used to create flash controls
  // must be in external script, otherwise MSIE requires extra click to activate control
  document.write(htmlText);
}
