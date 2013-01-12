/*************************************************************************
            Intellicast Ad Call Map Functions
************************************************************************ */

// Makes the Ad Calls
function makeAdCall(ad) {
  var el = document.getElementById(ad);
  var s = document.createElement('script');
  s.text = 'A21.notifyRegistered("' + ad + '");';
  el.parentNode.insertBefore(s, el.nextSibling);
}

// Map Has Loaded - Ready To Trigger Ads
function triggerAds() {
  if (document.getElementById('WX_PageCounter') != null && document.getElementById('WX_PageCounter') != undefined && document.getElementById('WX_PageCounter').innerHTML != '')
    return;
  try { makeAdCall('WX_PageCounter'); } catch (error) { }
  try { makeAdCall('WX_Top300Variable'); } catch (error) { }
  try { makeAdCall('WX_Mid300'); } catch (error) { }
  try { makeAdCall('WX_Hidden'); } catch (error) { }
  try { makeAdCall('WX_Tile1'); } catch (error) { }
  try { makeAdCall('WX_Tile2'); } catch (error) { }
  try { makeAdCall('WX_PaidSearch'); } catch (error) { }
}

// In Case Map Fails to Load - Call to Trigger Ads
setTimeout(triggerAds, 10000);



/*************************************************************************
            TWC Ad Call Initialization Functions
************************************************************************ */

'TWC' in window || (window.TWC = {});

if (TWC.initpco) {
  var pageId = "63527";
  var siteId = "52";
  var url = window.location.pathname.toUpperCase();
  if (url == "/")
    pageId = "63526";
  else if (url.indexOf("WXMAP") != -1)
    pageId = "63515";
  else if (url.indexOf("LOCAL/HOURLY") != -1)
    pageId = "63511";
  else if (url.indexOf("LOCAL/FORECAST") != -1)
    pageId = "63513";
  else if (url.indexOf("LOCAL/OBSERVATION") != -1)
    pageId = "63517";
  else if (url.indexOf("LOCAL/WEATHER") != -1)
    pageId = "63516";
  else if (url.indexOf("LOCAL") != -1)
    pageId = "63514";
  else if (url.indexOf("STORM/SEVERE") != -1)
    pageId = "63523";
  else if (url.indexOf("STORM/DEFAULT") != -1)
    pageId = "63522";
  else if (url.indexOf("STORM/HURRICANE") != -1)
    pageId = "63524";
  else if (url.indexOf("STORM") != -1)
    pageId = "63528";
  else if (url.indexOf("MARINE") != -1)
    pageId = "63518";
  else if (url.indexOf("SNOW") != -1)
    pageId = "63521";
  else if (url.indexOf("GOLFING") != -1 || url.indexOf("TURF") != -1)
    pageId = "63519";
  else if (url.indexOf("GARDENING") != -1)
    pageId = "63512";
  else if (url.indexOf("OUTDOORS") != -1)
    pageId = "63520";
  else if (url.indexOf("FLYING") != -1)
    pageId = "63501";
  else if (url.indexOf("DRIVING") != -1)
    pageId = "63502";
  else if (url.indexOf("TRAVEL/DEFAULT") != -1)
    pageId = "63503";
  else if (url.indexOf("TRAVEL") != -1)
    pageId = "63504";
  else if (url.indexOf("BADHAIRDAY") != -1)
    pageId = "63505";
  else if (url.indexOf("RESPIRATORY") != -1)
    pageId = "63507";
  else if (url.indexOf("ACHESPAINS") != -1)
    pageId = "63506";
  else if (url.indexOf("INFLUENZA") != -1)
    pageId = "63508";
  else if (url.indexOf("ULTRAVIOLET") != -1)
    pageId = "63510";
  else if (url.indexOf("HEALTH/DEFAULT") != -1)
    pageId = "63509";
  else if (url.indexOf("HEALTH") != -1)
    pageId = "63525";
  else
    pageId = "63527";

  TWC.pco = TWC.initpco(jQuery, null, pageId, "default", siteId, locationId);
}
