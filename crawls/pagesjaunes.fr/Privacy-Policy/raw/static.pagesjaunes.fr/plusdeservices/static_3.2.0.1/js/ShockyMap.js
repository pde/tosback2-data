// **********************************************************************
// Initialisation des variables
// **********************************************************************
var isIE    = (navigator.appVersion.indexOf("MSIE")!=-1) ? true : false;
var isWin   = (navigator.appVersion.toLowerCase().indexOf("win")!=-1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera")!=-1) ? true : false;
var Shocky;

// **********************************************************************
// Initialisation de l'objet Shocky pour accès à l'API ShockyMap
// **********************************************************************
function ShockyInit()
  {
  Shocky = (navigator.appName.indexOf("Microsoft")!=-1) ? window["ShockyMap"] : document["ShockyMap"];
  }

// **********************************************************************
// Detection de la version si Netscape, Firefox, ...
// **********************************************************************
function GetVersion1()
  {
  var Ver = -1;

  if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"])
    {
    var Sfv = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
    var Des = navigator.plugins["Shockwave Flash" + Sfv].description;			
    var Lsd = Des.split(" ");
    var Ls1 = Lsd[2].split(".");
    var Ls2;
    var Ve1 = Ls1[0];
    var Ve2 = Ls1[1];
    if ( Lsd[3] != "" )
      { Ls2 = Lsd[3].split("r"); }
    else
      { Ls2 = Lsd[4].split("r"); }
    var Ve3 = Ls2[1]>0 ? Ls2[1] : 0;
    Ver = Ve1 + "." + Ve2 + "." + Ve3;
    }

  return Ver;
  }

// **********************************************************************
// Detection de la version si MSIE et Windows
// **********************************************************************
function GetVersion2()
  {
  var Ver;
  var Axo;
  var Err;

  try { Axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"); Ver = Axo.GetVariable("$version"); }
  catch (Err) {}

  if (!Ver)
    {
    try { Axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"); Ver = "WIN 6,0,21,0"; Axo.AllowScriptAccess = "always"; Ver = Axo.GetVariable("$version"); }
    catch (Err) {}
    }

  if (!Ver)
    {
    try { Axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"); Ver = Axo.GetVariable("$version"); }
    catch (Err) {}
    }

  if (!Ver)
    {
    try { Axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"); Ver = "WIN 3,0,18,0"; }
    catch (Err) {}
    }

  if (!Ver)
    {
    try { Axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); Ver = "WIN 2,0,0,11"; }
    catch (Err) { Ver = -1; }
    }

  return Ver;
  }

// **********************************************************************
// Retourne la version du Flash Player
// **********************************************************************
function GetFlashVer()
  {
  var Ver = -1;

  if (navigator.plugins!=null && navigator.plugins.length>0)
    { Ver = GetVersion1(); }
  else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1)
    { Ver = 4; }
  else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1)
    { Ver = 3; }
  else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1)
    { Ver = 2; }
  else if ( isIE && isWin && !isOpera )
    { Ver = GetVersion2(); }

  return Ver;
  }

// **********************************************************************
// Detect si le flash player et au mini de la version demandée
// **********************************************************************
function DetectFlashVer(Rmaj, Rmin, Rrev)
  {
  var Vers = GetFlashVer();

  if (Vers == -1 )
    {
    return false;
    }
  else if (Vers != 0)
    {
    if (isIE && isWin && !isOpera)
      {
      TmpL = Vers.split(" ");
      TmpS = TmpL[1];
      Vlst = TmpS.split(",");
      }
    else
      {
      Vlst = Vers.split(".");
      }
    var Vmaj = Vlst[0];
    var Vmin = Vlst[1];
    var Vrev = Vlst[2];
    var Done = Vmaj>Rmaj || (Vmaj==Rmaj && (Vmin>Rmin || (Vmin==Rmin && Vrev>=Rrev)))

    return Done;
    }
  }

// **********************************************************************
// Création du player Flash avec ShockyMap
// **********************************************************************
function ShockyInstall()
  {
  var MMP = (isIE==true) ? "ActiveX" : "PlugIn";
  var MMR = window.location;
  var MMD = document.title.slice(0, 47) + " - Flash Player Installation";
  var PRM = "MMredirectURL="+MMR+"&MMplayerType="+MMP+"&MMdoctitle="+MMD;
  var HTM = ""

  document.title = document.title;

  if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length)
    {
    HTM += '<embed type="application/x-shockwave-flash" quality="hight" scale="noscale" loop="false" menu="false" salign="tl" align="middle" allowScriptAccess="always" swLiveConnect="true" pluginspage="http://www.adobe.com/go/getflashplayer"';
    HTM += ' src="/Services/Modules/APP_FLA_INS.swf" width="550" height="300" id="FlashInstall" name="FlashInstall" bgcolor="#FFFFFF" wmode="opaque"';
    HTM += ' flashvars="' + PRM + '"';
    HTM += '/>';
    }
  else
    {
    HTM += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab" id="FlashInstall" width="550" height="330">';
    HTM += '<param name="movie" value="/Services/Modules/APP_FLA_INS.swf"/><param name="bgcolor" value="#FFFFFF"/><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"/><param name="loop" value="false"/><param name="menu" value="false"/><param name="quality" value="high"/><param name="scale" value="noscale"/><param name="salign" value="tl"/>';
    HTM += '<param name="flashvars" value="' + PM + '"/>';
    HTM += '</object>';
    }

  return HTM;
  }

// **********************************************************************
// Création du player Flash avec ShockyMap
// **********************************************************************
function ShockyPlayer(ID,DX,DY,CL,FL,PM)
  {
  var Flash = "";
  var UA = navigator.userAgent;
  var WM = UA.indexOf("MSIE")>=0 ? "transparent" : "transparent";

  if (!DetectFlashVer(6,0,65))
    {
    Flash = "Cette application requiere la version 8 de Adobe Flash Player";
    }
  else if (!DetectFlashVer(8,0,0))
    {
    Flash = ""; //ShockyInstall();
    }
  if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length)
    {
    Flash += '<embed type="application/x-shockwave-flash" quality="hight" scale="noscale" loop="false" menu="false" salign="tl" align="middle" allowScriptAccess="always" swLiveConnect="true" pluginspage="http://www.adobe.com/go/getflashplayer"';
    Flash += ' src="'       + FL + '"';
    Flash += ' width="'     + DX + '"';
    Flash += ' height="'    + DY + '"';
    Flash += ' id="'        + ID + '"';
    Flash += ' name="'      + ID + '"';
    Flash += ' bgcolor="'   + CL + '"';
    Flash += ' wmode="'     + WM + '"';
    Flash += ' flashvars="' + PM + '"';
    Flash += '/>';
    }
  else
    {
    Flash += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"';
    Flash += ' id="'        + ID + '"';
    Flash += ' width="'     + DX + '"';
    Flash += ' height="'    + DY + '"';
    Flash += '>';
    Flash += '<param name="movie"     value="' + FL + '"/>';
    Flash += '<param name="bgcolor"   value="' + CL + '"/>';
    Flash += '<param name="flashvars" value="' + PM + '"/>';
    Flash += '<param name=""wmode""   value="' + WM + '"/>';
    Flash += '<param name="allowScriptAccess" value="always"/><param name="loop" value="false"/><param name="menu" value="false"/><param name="quality" value="high"/><param name="scale" value="noscale"/><param name="salign" value="tl"/>';
    Flash += '</object>';
    }

  document.write(Flash);
  }