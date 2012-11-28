function gotoWengo(familyPm, posPm, xitiName) {

  var urlWengo='http://home.edt02.net/emc/banner/mstbc.php?c=';
  var trackWengo = '40060-174436-91631-335-306462';

  if(familyPm != '') {
    switch(familyPm) {
      case 100: 
      case '100': 
          trackWengo='40060-174390-91631-335-306416';
          xitiName += 'Livres';
          break;
      case 200: 
      case '200': 
          trackWengo='40060-174391-91631-335-306417';
          xitiName += 'Musique';
          break;
      case 300: 
      case '300': 
          trackWengo='40060-174392-91631-335-306418';
          xitiName += 'DVDVHS';
          break;
      case 400: 
      case '400': 
          trackWengo='40060-174393-91631-335-306419';
          xitiName += 'JeuxVideo';
          break;
      case 500: 
      case '500': 
          trackWengo='40060-174394-91631-335-306420';
          xitiName += 'TelPDA';
          break;
      case 600: 
      case '600':           
          trackWengo='40060-174395-91631-335-306421';
          xitiName += 'Informatique';
          break;
      case 700: 
      case '700': 
          trackWengo='40060-174399-91631-335-306425';
          xitiName += 'ImageSon';
          break;
      case 900: 
      case '900': 
          trackWengo='40060-174400-91631-335-306426';
          xitiName += 'MaisonElectromenager';
          break;
      case 1000: 
      case '1000': 
          trackWengo='40060-174398-91631-335-306424';
          xitiName += 'Enfant';
          break;
      case 1100: 
      case '1100': 
          trackWengo='40060-174397-91631-335-306423';
          xitiName += 'Mode';
          break;
      case 1400: 
      case '1400': 
          trackWengo='40060-174396-91631-335-306422';
          xitiName += 'SportLoisirs';
          break;
      case 1500: 
      case '1500': 
          trackWengo='40060-174401-91631-335-306427';
          xitiName += 'VinSaveur';
          break;
    }
  }
  else if(posPm != '') {
    switch(posPm) {
      case 1 : 
      case '1' : 
          trackWengo='40060-174436-91631-335-306462';
          break;
      case 2 : 
      case '2' : 
          trackWengo='40060-174439-91631-335-306465';
          break;
      case 3 : 
      case '3' : 
          urlWengo='http://home.edt02.net/emc/membership/mstac.php?c=';
          trackWengo='40060-23140-91631-0-154831';
          break;
      case 4 : 
      case '4' : 
          trackWengo='40060-174445-91631-335-306471';
          break;
    }
  }

  // xiti call
  if(xitiName != null) {
    xt_med('C','5',xitiName,'S');
  }

  // redirection to wengo tracked url
  window.open(urlWengo+trackWengo).focus();
}

/**
 * unespaceEntities
 *
 * @param cdata Data to process
 */
function unescapeEntities(cdata) {
    var buff='';
    for (var pos=0; pos<cdata.length; ) {
        if (cdata.substr(pos,'&#38;#60;'.length) == '&#38;#60;') {
              buff += '&lt;';
              pos += '&#38;#60;'.length;
        } else if (cdata.substr(pos, '&#62;'.length) == '&#62;') {
              buff += '&gt;';
              pos += '&#62;'.length;
        } else if (cdata.substr(pos, '&amp;amp;'.length) == '&amp;amp;') {
              buff += '&amp;';
              pos += '&amp;amp;'.length;
        } else if (cdata.substr(pos, '&amp;#39;'.length) == '&amp;#39;') {
              buff += '&#39;';
              pos += '&amp;#39;'.length;
        } else if (cdata.substr(pos, '&#34;'.length) == '&#34;') {
              buff += '&quot;';
              pos += '&#34;'.length;
        } else if (cdata.substr(pos, '&amp;'.length) == '&amp;') {
            buff += '&';
            pos += '&amp;'.length;
        } else  {
              buff += cdata.substr(pos, 1);
              ++pos;
        }
    }
    return buff;
}


/**
 * Write a popup (promo)
 */
function writePopup(url, width, height, wait, cookie_name, cookie_duration, probability, scrollbars) {
  // Default parameters
  if (arguments.length < 8) scrollbars = 0;
  if (arguments.length < 7) probability = 1; // Should be betwen 0 and 1
  if (arguments.length < 6) cookie_duration = null; // In days
  if (arguments.length < 5) cookie_name = 'popup';
  if (arguments.length < 4) wait = 0;

  // If cookie is present, popup must not be displayed
  if (document.cookie.indexOf(cookie_name) != -1)
  return;

  // If random (between 0 and 1) is over probability, popup must not be displayed
  if (Math.random() >= probability)
  return;

  // Build a cookie to prevent other display
  var c = cookie_name + '=1;Path=/';
  if (cookie_duration != null) {
    var d = new Date();
    d.setTime(d.getTime() + (cookie_duration*24*60*60*1000));
    c = c + ';expires=' + d.toGMTString();
  }
  document.cookie = c; 

  // Open popup
  setTimeout('popPromo(\"' + url + '\", ' + width + ', ' + height + ', \'' + scrollbars + '\')', Math.max(wait, 1));
}



/***********************************
POPUNDER
***********************************/

function ggr(pu_u,pu_m,pu_w,pu_h,pu_c,pu_l,pu_p,pu_hh,pu_n,pu_e,pu_hhh,pu_ta, debug) {
  ggr2(pu_u, pu_m, pu_w, pu_h, pu_c, pu_l, pu_n, pu_p, pu_hhh, pu_e, pu_hh, false, pu_ta, debug);
}

function ggr2(pu_u, pu_m, pu_w, pu_h, pu_c, pu_l, pu_n, pu_p, pu_hhh, pu_e, pu_hh, pu_ad, pu_ta, debug) {
  var cpu = PM.Cookie.get(pu_c);
  var lastTrackId = PM.Cookie.getParam("pm", "lasttracking");

  // Test condamned popunder
  if(cpu != null) {
    if(cpu < 0) return;
    // cookie update
    cpu = parseInt(cpu) + 1;
  }
  else {
    // init cpu
    cpu = 0;
  }

  var puTestsNeeded = (cpu == 0);

  var arrExclTracks = [112000,112001,2223740,2223741,2223742,2223840,2223841,2223640,2223641,2222840,1706041,2089340,316940,681049,681050,681051,681052,681053,681054,681055,681056,681057,681058,681059,681060,681061,681062,681063,775141,815140,815141,815142,815143,815144,815145,877140,935440,935441,935442,965641,969740,969741,969742,969743,969744,969745,969746,969747,969748,969749,969750,969751,1053740,1093740,1093741,1093742,1093743,1095840,1095841,1095842,1095843,1095844,1095845,1107840,1218040,1334040,2095340,2095341,2095342,2095345,2095346,2095347,2095348,2095349,2095350,2095351,2145440,2179340,2179341,2179342,2200240,2200241,2209040,2219140,2219143,2219240,2220240,2220440,2220640,2220641,2220642,2220643,2220644,2220645,2220646,2222840,965740,993740,993741,993742,993743,993744,993745,993746,993747,993748,993749,1061740,1061741,1061742,1061743,1160040,1160041,1160042,1288140,1843440,1843441,1843442,1843443,1843444,1843445,1843446,1843447,2095344,2179345,2179346,2209042,2219141,230000,230001,230002,230003,230004,230005,230006,375040,541040,627040,659042,681040,681041,681042,681043,681044,877141,887440,887441,887442,935443,935444,935445,1843448,1843449,1843450,1843451,1843452,1843453,1843454,1843455,2095343,2179343,2179344,2209041,2219142,1843640,1843641,1843642,1843643,1843644,1843645,1843646,1843647,1843648,1843649,1843650,1843651,1843652,1843653,1843654,1843655,1843656,1843657,1843658,1843659,1843660,1843661,62001,905640,905641,1294040,431042,431041,1091740,1414040,258840,269740,269741,269742,141040,1748141,2173341,7000,7001,7002,7003,7004,7005,7006,7007,7008,7009,7010,7011,7012,7013,7014,7050,7051,7100,7101,7102,7103,7104,7105,7106,7107,7108,7109,7110,7111,7112,7113,7114,7150,7151,7200,7201,7202,7203,7204,7205,7206,7207,7208,7209,7210,7211,7212,7213,7214,7250,7251,2237143,2237144,2237145,2237146,2237147,2237148,2237149,2237150,2227470,2227467,2227479,1706040];
  var arrInclTracks = [1001740,1017740,1021740,1031740,1041740,1041741,1055740,1063740,1085740,1095740,1111741,1113740,1121740,1142041,115000,1158240,1170040,1174040,1186040,1210040,1220040,1230040,1232040,1244140,1258040,1268040,1268041,1276040,1284040,1302040,1310040,1310141,1320140,1322040,1326040,1334140,1336040,1352041,1358140,1368140,1378040,1378141,1380240,1380241,1380242,1380243,1380244,1380245,1380246,1380247,1380248,1380249,1380250,1384040,1388040,1388140,1392240,1394040,1396040,1396041,1396042,1396043,1396044,1396045,1396046,1396047,1396048,1396049,1396050,1398040,1402040,1402140,1404040,1412040,1416040,1422040,1430040,1434040,1446040,1450140,1454040,1456040,1462040,1464040,1468040,1472040,1472041,1472042,1472043,1486040,1488040,1490040,1490041,1490042,1490141,1492140,1494040,1496040,1496041,1498140,1502140,1504040,1504041,1512040,1518041,1526140,1530040,1530140,1536040,1544040,1550040,1556040,1556041,1556042,1556043,1556044,1556045,1556046,1556047,1556048,1556049,1556050,1556051,1556052,1556053,1556054,1556055,1556056,1556057,1556058,1556059,1562040,1564140,1574040,1578140,1578240,1580040,1586040,1588040,1590040,1594041,1596040,1596041,1596042,1600040,1602040,1612040,1612041,1622040,1626040,1630140,1630141,1632040,1640141,1646040,1652040,1654040,1654140,1656040,1658040,1658041,1662240,1664140,1666140,1666141,1666142,1666143,1666144,1666145,1668040,1668140,1678040,1680040,1684041,1692040,1698140,1704040,1704041,1706040,1708041,1708140,1712040,1712140,1716040,1718140,1720040,1726040,1730040,1732040,1738040,1740040,1746040,1748040,1754040,1754042,1756040,1764040,1766040,1772040,1772041,1772042,1774040,1776040,1776041,1780040,1782040,1788040,1788041,1788042,1796140,1798040,1798041,1798042,1800140,1802140,1802440,1804140,1804141,1806140,1808140,1808240,1808241,1808242,1810240,1810241,1810242,1812140,1812141,1812240,1816240,1816241,1820240,1822141,1824140,1824440,1824441,1830240,1830241,1832340,1832341,1834540,1835041,1835042,1835043,1835340,1835640,1836140,1836240,1836340,1836440,1836640,1836840,1837140,1837440,1837640,1837840,1838140,1838240,1838540,1840740,1843140,1843141,1843340,1845040,1845140,1845141,1845142,1847140,1849040,1849041,1849042,1849043,1849044,1853140,1853440,1853441,1853442,1853540,1853640,1855040,1857040,1861040,1863040,1865040,1867240,1875040,1875041,1875042,1879040,1879041,1885040,1887140,1887240,1889040,1891040,1893040,1895040,1905040,1905041,1905042,1905043,1905044,1905045,1905046,1905047,1905048,1905049,1909040,1911040,1911140,1913040,1913041,1919040,1919041,1923040,1923041,1925040,1925041,1925042,1927140,1927141,1929040,1933040,1933140,1935040,1935041,1939040,1951041,1953040,1955040,1955140,1955141,1959040,1959140,1959141,1959142,1959240,1959340,1961040,1961140,1963340,1967240,1969340,1969341,1969342,1977240,1977540,1979240,1981440,1983340,1983440,1987240,1987241,1987242,1989240,1991340,1991341,1991342,1991343,1991344,1991345,1995240,1995241,1995242,1997240,1997440,1999240,20,2001240,2005440,2005441,2005442,2011240,2013240,2015240,2015241,2015242,2015243,2015244,2015245,2015246,2015247,2015248,2015340,2015440,2017240,2017241,2023240,2027240,2033240,2033340,2033341,2033342,2033343,2035240,2039240,2041340,2041341,2041342,2041440,2043240,2045440,2047240,2047241,2047242,2047243,2047244,2047245,2049240,2049241,2049242,2049243,2051240,2053240,2055240,2057240,2059240,2063340,2065240,2067340,2069240,2071240,2071241,2073240,2073241,2073242,2073243,2075240,2079240,2081240,2083240,2085340,2085341,2087440,2087441,2089240,2089241,2093340,2093440,2097240,2097340,2103240,2105240,2109240,2111340,2113240,2117240,2117340,2117440,2119440,2121340,2125540,2127340,2131440,2135340,2137340,2137440,2139440,2141340,2143340,2147440,2149340,2153340,2157340,2161340,2163340,2165440,2167540,2171340,2171440,2173440,2175340,2177340,2177341,2177342,2177343,2177440,2177541,2181340,2181341,2181342,2181440,2181441,2185340,2191740,2191840,2191841,2191842,2191940,2193440,2193540,2193541,2193542,2193944,2194440,2194441,2194442,2194540,2194541,2194640,2194940,2195440,2195441,2195540,2195940,2196348,2197540,2197840,2197841,2197842,2198240,2198340,2198740,2198741,2199640,2199641,2199642,2199643,2199644,2199645,2199646,2199647,2199648,2199649,2199650,2199651,2199652,2199653,2199654,2199655,2199840,2199941,2200140,2200440,2200740,2200741,2200840,2200841,2200842,2200843,2200844,2200845,2200940,2200941,2200942,2201240,2201340,2201341,2201342,2201343,2201344,2201345,2201346,2201347,2201348,2201349,2201350,2201351,2201352,2201353,2201440,2201441,2201442,2201540,2202140,2202240,2202241,2202242,2202243,2202440,2202540,2202840,2202841,2202842,2206040,2206140,2206240,2206241,2206242,2206243,2206244,2206245,2206246,2206247,2206340,2206541,2206940,2206941,2206942,2207040,2208240,2208340,2208341,2208342,2208440,2208441,2208442,2208443,2208444,2208445,2208446,2208447,2208448,2208449,2208450,2208451,2208452,2208453,2208454,2208455,2208540,2208841,2208842,2208940,2209140,2209240,2209440,2209740,2209741,2209742,2209743,2211240,2211241,2211242,2211243,2211244,2211340,2211341,2211342,2211343,2211344,2211345,2211346,2211347,2211348,2211349,2211350,2211351,2211352,2211353,2211840,2212040,2212041,2212240,2213240,2213440,2213441,2213442,2213443,2213444,2213445,2213446,2213447,2215140,2215241,2215242,2215243,2215440,2215540,2217240,2217241,2217340,2219241,2219440,2219441,2219442,2219640,2219840,2219841,2219842,2219843,2220140,2220141,2220142,2220143,2220144,2220145,2220146,2220147,2220148,2220540,2220840,2220841,2221040,2221240,2221440,2221441,2221540,244310,271740,271741,271742,271743,271744,271745,271746,271840,278340,280441,30,331040,391340,395040,40,403440,431042,451040,451041,451042,451043,451044,451045,451140,451141,451142,451143,451144,451145,451240,455040,465140,469040,477140,477242,481040,503040,505040,529040,537040,543040,547040,569140,581040,581041,607040,609040,62001,625040,655040,655140,655141,655142,671040,683040,715040,719240,723040,727140,727141,727142,727143,727144,727145,727146,729143,741040,745040,753040,759040,771040,779040,789041,795040,805040,811040,815041,825040,835240,841140,841141,849140,851140,857140,869240,869241,869242,869243,869244,869245,869246,871140,881140,881141,881142,883240,899440,899441,901440,905640,905641,911440,911540,923440,939440,939441,939442,939443,939444,939445,939446,939447,939448,939449,939450,941440,943440,943441,943442,943443,943444,943445,943446,943447,943448,943449,943450,949440,957440,965440,965441,965442,965540,965541,965542,965543,965544,965545,965546,977740];
  var arrRefNat = ["google","yahoo","search.live.com","search.msn","search.ke.voila.fr","www.altavista.com","search.free.fr","search.lycos.com"];

  
  // Execution of TESTS
  if(puTestsNeeded) {
    /****************************************
     * Blocking tests
     ***************************************/
    
    // New price user
    if(pu_hhh) {
      var cpm = PM.Cookie.get("pm");
      if(cpm != null) {
        // get last track timetamp to test with now date
        lastTrackTs = PM.Cookie.getParam("pm", "trackingts");
        var now_date = new Date();
        // if cookie date and now date are same, so this is a new user
        var diff = Math.abs(lastTrackTs-now_date.getTime());
        // compare the two dates with 10 sec of tolerance
        var sameDate = (diff >= 0 && diff <= 10000);
        if(sameDate == false) {
          if(debug) {
            // mode debug
            PM.Cookie.set("pu_debug", ": L'utilisateur n'est pas un nouvel utilisateur PM!");
          }
          // We condamn popunder display
          PM.Cookie.set(pu_c, -1, pu_l);
          return;
        }
      }
    }

    // Proba test
    if((Math.random() * 100) >= pu_p) {
         if(debug) {
          // mode debug
          PM.Cookie.set("pu_debug", ": Le test de proba a échoué!");

        }
        // We condamn popunder display
        PM.Cookie.set(pu_c, -1, pu_l);
        return;
    }

    // Tracking Exclusion test if necessary
    if(pu_e) {
        var bbExclTracks = false;
        // Test the last tracking id is excluded
        for(var i = 0; i < arrExclTracks.length; ++i) {
          if(arrExclTracks[i] == lastTrackId)
            bbExclTracks = true;
        }
        // test liens sponsos : si 7xxx, pas de popunder
        var matchTrackingLS = new RegExp('^'+PM.Constants.SL.trackingCodeRegExp+'$');
        if (matchTrackingLS .exec(lastTrackId) != null) bbExclTracks = true;
        if(lastTrackId != null && bbExclTracks) {
          if(debug) {
            // mode debug
            PM.Cookie.set("pu_debug", ": Le tracking "+lastTrackId+" est exclu!");
          }
          // We condamn popunder display
          PM.Cookie.set(pu_c, -1, pu_l);
          return;
        }
    }
    
    
    /***********************************************
     * 3 access tests (complementary tests):
     *  - direct acces
     *  - from ref nat
     *  - with tracking

     **********************************************/
     
    // Natural referencement test
    var ref = document.referrer;
    var refNatRequired  = pu_hh;
    var refNatFound = false;
    if(ref != null && !PM.Util.getInterrogationUrlParam("t")) {
      // Get domain name with the url referer
      var matcher = new RegExp("^[\\w]{2,6}:\\/\\/([\\w\\d\\.\\-]+).*$");
      var arrMatches = matcher.exec(ref);
      // 1 domain finded
      if(arrMatches && arrMatches.length == 2) {
        var domainName = arrMatches[1];
        // Test if the referer domain is from natural referencement
        for(var i = 0; i < arrRefNat.length; ++i) {
          if(domainName.indexOf(arrRefNat[i]) != -1) {
            refNatFound = true;
            break;
          }
        }
      }
    }

    // Tracking test if necessary
    if (typeof(pu_ta) == "boolean") {
      pu_ta = pu_ta ? arrInclTracks : null;
    }
    var trackingRequired = (pu_ta != null && pu_ta.length > 0);
    var allTrackingAllowed = (pu_ta != null && pu_ta.length == 1 && pu_ta[0] == 'all');
    var trackingRequiredFound = false;
    if(trackingRequired) {
      if(lastTrackId != null) {
        if(allTrackingAllowed) { 
          trackingRequiredFound = true;
        }
        else {
          for(var i=0; i<pu_ta.length; ++i) {
            if(lastTrackId == pu_ta[i]) {
              trackingRequiredFound = true;
              break;
            }
          }
        }
      }
    }
    
    var displayPU = false;
    var directAccessRequired = pu_ad;
    var trackingExistingInUrl = (lastTrackId != null);
    if(refNatRequired       && refNatFound)                                 { displayPU = true; }
    if(trackingRequired     && trackingRequiredFound)                       { displayPU = true; }
    if(directAccessRequired && !refNatFound     && !trackingExistingInUrl) { displayPU = true; }
    if(!refNatRequired      && !trackingRequired && !directAccessRequired)   { displayPU = true; }
    
    if(!displayPU) {
      if(debug) {
        // mode debug
        PM.Cookie.set("pu_debug",pu_c+"_refNatRequired_"+refNatRequired+"__refNatFound_"+refNatFound+"__trackingRequired_"+trackingRequired+"__trackingRequiredFound_"+trackingRequiredFound+"__directAccessRequired_"+directAccessRequired+"__directAccessFound_"+(!refNatFound && !trackingExistingInUrl));
      }
      // We condamn popunder display
      PM.Cookie.set(pu_c, -1, pu_l);
      return;
    }
  }

  // Test cpu value with ncr
  if(cpu < pu_n) {
    PM.Cookie.set(pu_c, cpu, pu_l);
    return;
  }
  else if(cpu == pu_n) {
    if(debug) {
      // mode debug
      PM.Cookie.set("pu_debug", "Le_nb_de_clicks_requis_a_ete_atteint");
    }
    // We condamn popunder display
    PM.Cookie.set(pu_c, -1, pu_l);
  }

  xt_med('C','0','Ggr2::Before::'+pu_c,'S');

  if(pu_m == "pop") {
    win=window.open('', 'pump', 'toolbar=no,location=no, status=0, menubar=0, scrollbars=yes, location=no, resizable=no, width=' + pu_w + ', height=' + pu_h);
  }
  else {
    win=window.open('', 'pump', 'toolbar=yes,location=yes, status=1, menubar=1, scrollbars=yes, location=yes, resizable=yes, width=' + pu_w + ', height=' + pu_h);
  }
  win.resizeTo(pu_w, pu_h);
  win.document.location.href = pu_u;
  win.blur();

  xt_med('C','0','Ggr2::After::'+pu_c,'S');
}

/**
 * Tools for promotions (3WRégie)
 *
 * @base PM
 */
PM.Promos = {}

PM.Promos.adFormat = {
  BANNER_CUSTOM_SHOP: 13898,
  BANNER: 7005, 
  SQUARE_300: 6788,
  SQUARE_2_300: 6792,
  SQUARE_3_300: 6873,
  SQUARE_4_300: 6875,
  BUTTON_1_300: 7010,
  BUTTON_2_300: 7011,
  BUTTON_1_120: 7006,
  BUTTON_2_120: 7007,
  BUTTON_3_120: 7008,
  BUTTON_4_120: 7009,
  DELIVERY: 8628,
  DELIVERY_BOTTOM: 12452,
  BUTTON_1_223: 8622,
  BUTTON_2_223: 8623,
  BUTTON_3_223: 8624,
  BUTTON_4_223: 8625,
  BUTTON_5_223: 14135,
  BUTTON_6_223: 14136,
  BODY: 6737,
  MEGABANNER_HP: 8620,
  MEGABANNER_MIDDLE: 8621,
  MVNO: 8626,
  TG: 8627,
  TAB: 8618,
  EVENT: 8700,
  SYNERGY_1: 8745,
  SYNERGY_2: 8746,
  BUTTON_GEOLOC_1: 10053,
  BUTTON_GEOLOC_2: 10054,
  OVERLAY: 6793,
  INTERSTITIEL: 10150,
  HEADER1: 11089,
  HEADER2: 11090,
  HEADER3: 11091,
  HEADER_EVENT: 11243,
  BACKGROUND: 6738
}

/**
 * Promotion channels
 *
 * @base PM.Promos
 */
PM.Promos.PromoChannels = {}

/**
 * Get promotion channel
 *
 * @param family the current familly
 * @param format format of the promotion
 * @param xiti   xiti label
 *
 * @base PM.Promos
 */
PM.Promos.getPromoChannel = function(family, format, categories) {
  var value = '';
  if (categories!=null && categories.indexOf('accessoires-auto') != -1) {
    family = 'auto_acc';
  }
  var values = PM.Promos.PromoChannels[family];

  if (values) {
    if (format) {
        value = values[format];
    } else {
        value = values[0];
    }
  }

  return value;
}

timers = {};

sas_tmstp=Math.round(Math.random()*10000000000);
sas_masterflag=1;
PM.Promos.generate = function(pageid, formatid, placeholder) {
  if (typeof(placeholder) != "undefined" && !$(placeholder)) return;
  var secure = (PM.Context.get('https') == true) ? "s" : "";

  timers[formatid] = new PM.Debug.Timer('Promo[' + pageid + '/' + formatid + ']', 3000);
  timers[formatid].start();

  if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
  document.write('<scr'+'ipt id="SmartScr' + formatid + '" src="http' + secure + '://ww381.smartadserver.com/call/pubj/15937/' + pageid + '/' + formatid + '/' + sas_master + '/' + sas_tmstp + '/' + escape(PM.Context.getFormattedCriterias()) + '?"></scr'+'ipt>');
}

PM.Promos.move = function(formatid, placeholder, options) {
  if (typeof(placeholder) != "undefined" && placeholder != null && !$(placeholder)) return;
  try {
    var scr = document.getElementById("SmartScr" + formatid);
    scr.parentNode.removeChild(scr);
    var secureDiv = $(placeholder + "Bottom");
    hasContent = PM.jq("div,a,iframe,p,span,object,embed", $(placeholder + "Bottom")).length > 0; // si Smart a retourné quelque chose
    if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(placeholder, hasContent, formatid);
    if (hasContent) {
      PM.Dom.removeChildren($(placeholder));
      $(placeholder).appendChild(secureDiv);
      var className = PM.Util.getOption(options, "className", null);
      if (className != null) {
        PM.Dom.Class.add($(placeholder), className);
      }
      var style = PM.Util.getOption(options, "style", null);
      if (style != null) {
        PM.jq($(placeholder)).css(style);
      }
    }
    timers[formatid].stop();
  } catch(e) {
    PM.Debug.log(e);
  }
}

PM.Promos.getPageId = function(page) {
  var pageId = "";

  try {
    pageId = eval("PM.Promos.pagesId." + page);
  } catch(e) {
    PM.Debug.log(e);
  }

  return pageId;
}

PM.Promos.add = function(pageId, formatId, target, options) {
  if (typeof(target) != "undefined" && target != null && !$(target)) return;
  if (typeof(PM.Promos.pages) == "undefined") PM.Promos.pages = {};
  if (typeof(PM.Promos.pages[pageId]) == "undefined") PM.Promos.pages[pageId] = {};
  
  var targetName = PM.Util.getOption(options, "name", target);
  PM.Promos.pages[pageId]["f" + formatId] = {"target": target, "options": options, "name": targetName};
}

PM.Promos.oneCall = function() {
  var pageIdCount = 0;
  var maxFormatsForPageCount = 0;
  
  for (pageId in PM.Promos.pages) { // choix des promos à récupérer
    var page = PM.Promos.pages[pageId];
    var formatsForPageCount = 0;
    for (formats in page) formatsForPageCount ++;
    if (formatsForPageCount > maxFormatsForPageCount) {
      maxFormatsForPageCount = formatsForPageCount;
      PM.Promos.formats = page;
      PM.Promos.pageId = pageId;
    }
    pageIdCount++;
  }
  
  if (pageIdCount > 1) PM.Debug.log("Warning : more than 1 pageId for AdServer OneCall (total : " + pageIdCount + "). Choosing pageId " + PM.Promos.pageId + " (more formats for this page).");
  
  // gestion du one call
  var formatIds = "";
  for (key in PM.Promos.formats) {
    formatIds += key.slice(1) + ",";
  }
  if (formatIds == "") return;
  formatIds = formatIds.slice(0,formatIds.length-1);
  
  var secure = (PM.Context.get('https') == true) ? "s" : "";
  document.write('<scr'+'ipt src="http' + secure + '://ww381.smartadserver.com/call2/pubjall/15937/' + PM.Promos.pageId + '/' + formatIds + '/' + sas_tmstp + '/' + escape(PM.Context.getFormattedCriterias()) + '?"></scr'+'ipt>');
}

PM.Promos.handleOneCallResults = function() {
  if (typeof(sas_manager) == "undefined") return;

    // on parcourt l'ensemble des pubs retournées par la fonction OneCall pour les afficher
    var formats = sas_manager.formats

    // Parcourt de tous les formats
    for (key in PM.Promos.formats) {
      // on cherche le format dans Smart
      var smartAd = formats[key];
      if (smartAd) { // si une pub a été trouvée dans la réponse Smart

        var targetName = PM.Promos.formats[key].name;
        try { 
          var scriptUrl = smartAd.scriptURL.call();

          var placeholder = PM.Promos.formats[key].target;
          if(scriptUrl.substr(1,6) == "iframe") {
            PM.Dom.removeChildren($(placeholder));
            $(placeholder).innerHTML = scriptUrl;
            PM.Promos.applyOptions(placeholder, PM.Promos.formats[key].options);

            if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(targetName, true, key.slice(1));
            delete PM.Promos.formats[key];
          } else { // c'est un script, on l'écrit
            document.write(scriptUrl);
          }
        } catch(e) {
          PM.Debug.log("AdServer Error - handleOneCallResults function :", PM.Debug.Type.INFO);
          PM.Debug.log(e);
	  if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(targetName  + " KO", false, key.slice(1));
	  delete PM.Promos.formats[key];
        }

      } else { // la pub n'a pas été trouvée
        if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(PM.Promos.formats[key].name, false, key.slice(1));
        delete PM.Promos.formats[key];
      }
    }

}


PM.Promos.isAd = function(obj) {
  return obj && (obj.tagName == "DIV" || obj.tagName == "A" || obj.tagName == "OBJECT" || obj.tagName == "TABLE")
}

PM.Promos.findAdNumber = function(num) {
  var i = -1;
  var currentChild = PM.Dom.firstChild($("SmartAllResults"));
  while(i < num) {
    if (i > -1) currentChild = PM.Dom.nextObject(currentChild);
    while(currentChild && !PM.Promos.isAd(currentChild)) {
      currentChild = PM.Dom.nextObject(currentChild);
    }
    i++;
  }
  return currentChild;
}

PM.Promos.moveAll = function() {
    
    var count = 0;
    for (key in PM.Promos.formats) { // premier parcourt pour remplir la map
      PM.Promos.formats[key].content = PM.Promos.findAdNumber(count);
      count++;
    }

    for (key in PM.Promos.formats) { // second parcourt pour afficher les promos
      try {
        var adContent = PM.Promos.formats[key].content;
        var options = PM.Promos.formats[key].options;
        var specificMoveFct = PM.Util.getOption(options, "move", null);
        var placeholder = PM.Promos.formats[key].target;

        if (specificMoveFct != null) { // fonction de déplacement spécifique
          specificMoveFct.call();
        } else {
          $(placeholder).appendChild(adContent);
        }

        PM.Promos.applyOptions(placeholder, options);

        if (typeof(PM.Spot) != "undefined" && typeof(PM.Spot.SmartServer) != "undefined") PM.Spot.SmartServer.log(PM.Promos.formats[key].name, true, key.slice(1));
        delete PM.Promos.formats[key];
      } catch(e) {
        PM.Debug.log("AdServer Error - moveAll function :", PM.Debug.Type.INFO);
        PM.Debug.log(e);
      }
    }

}

PM.Promos.applyOptions = function(placeholder, options) {
  placeholder = $(placeholder);
  var className = PM.Util.getOption(options, "className", null);
  if (className != null) {
    PM.Dom.Class.add(placeholder, className);
  }
  var style = PM.Util.getOption(options, "style", null);
  if (style != null) {
    PM.jq(placeholder).css(style);
  }
}



/**
 * Promotion page Id (3Wrégie)
 *
 * @base PM.Promos
 */
PM.Promos.pagesId = {
  books: {nav: 115432, fp: 115434, home: 115431, slideshow: 115436},
  music: {nav: 115482, fp: 115481, home: 115438, slideshow: 115439},
  games: {nav: 115448, fp: 115449, home: 115447, slideshow: 115450},
  video: {nav: 115443, fp: 115444, home: 115442, slideshow: 115445},
  baby: {nav: 115486, fp: 115487, home: 115485, slideshow: 115488},
  hifi: {nav: 115462, fp: 115463, home: 115461, slideshow: 115464},
  computer: {nav: 115458, fp: 115480, home: 115457, slideshow: 115459},
  sport: {nav: 115472, fp: 115473, home: 115471, slideshow: 115474},
  white: {nav: 115467, fp: 115468, home: 115466, slideshow: 115469},
  clothing: {nav: 115477, fp: 115478, home: 115476, slideshow: 115479},
  electronics: {nav: 115453, fp: 115454, home: 115452, slideshow: 115455},
  wine: {nav: 115495, fp: 115496, home: 115494, slideshow: 115497},
  sell_assist: 115593,
  sell: 115592,
  review: 115596,
  shop: 115590,
  help: 115594,
  homepage: 115440,
  my_account: 115595,
  my_account_hp: 139372,
  search: 115589,
  all_products: 115591,
  event: 140429,
  header: 140423,
  checkout_success: 139373,
  selling_process: 142341,
  pricetv: 159842
}

var seller_ministite_url_alias = "op/astuces_vendeur";
gotoSellerMinisite = function(xiti_tag) {

  var popup = false;
  var url_default = "/";
  var url            = "/info/no/" + seller_ministite_url_alias;
  var url_popup  = "/info/co/" + seller_ministite_url_alias;
  var anchor = "";

  switch(xiti_tag) {
    case 'MonCompte::PasVendeur::MiniSiteVendeur':
      popup = true;
      anchor = "hp_pas_vendeur";
      break;
    case 'MonCompte::DejaVendeur::MiniSiteVendeur':
      break;
    case 'Inventaire::MiniSiteVendeur':
      popup = true;
      break;
    case 'ToutesMesVentes::MiniSiteVendeur':
      anchor = "hp_deja_vendeur";
      break;
    case 'MonCompte::DetailVente::MiniSiteVendeur':
      popup = true;
      anchor = "reussir_premiere_vente";
      break;
    case 'Vendre::DejaVendeurBlocDroite::MiniSiteVendeur':
      popup = true;
      break;
    case 'Vendre::NouveauVendeurEtape2::MiniSiteVendeur':
      break;
    case 'Assistance::TrucsAstuces::MiniSiteVendeur':
      break;
    case 'VendezLeVotre::MiniSiteVendeur':
      popup = true;
      anchor = "creer_annonce_ideale";
      break;
    case '[PageConcernée]::BlocMiseEnVenteRapide::MiniSiteVendeur':
      popup = true;
      break;
    case 'ConfirmationCreationAnnonce::MiniSiteVendeur':
      popup = true;
      anchor = "cinq_conseils";
      break;
    case 'Assistance::AideALaVente::MiniSiteVendeur':
      popup = true;
      break;
    case 'ConfirmationAchat::PoursuivreNavigation::OperationCoupDouble':
      break;
    default:
      url = url_default;
      break;
  }
  
  xt_med('C','5',xiti_tag,'N');
  
  if (anchor != "") anchor = "#page="+anchor;

  if(popup == true) {
    var popup_param = (anchor != "")? "&popup=true": "#popup=true";
    win=window.open(url_popup + anchor + popup_param, '', 'width=965,height=525,toolbar=no,location=no, status=0, menubar=0, scrollbars=yes, location=no, resizable=no');
  }
  else {
    window.location = url + anchor;
  }
}

/************************
 ************************
 * AdServer Content
 ************************
************************/

// Set adServer context
PM.adServer = {};


// Ad array to store all the add to define in the page
PM.adServer.ad = [];

// Set the tag array
PM.adServer.tag = {};

// Set the placement array
PM.adServer.tag.placement = {
	BANDEAU_PREMIUM:{
		name:"bandeau_premium", 
		size:[728, 90]
	},
	HABILLAGE:{
		name:"habillage", 
		size:[1, 1]
	},
	GEOLOC:{
		name:"geoloc", 
		size:[300, 250]
	},
	HEADER1:{
		name:"header1_PM", 
		size:[200, 100]
	},
	HEADER2:{
		name:"header2_PM", 
		size:[200, 100]
	},
	BL_BANDEAU:{
		name:"bl_bandeau_PM", 
		size:[400, 90]
	},
	BL_BANDEAU_BAS:{
		name:"bl_bandeau_bas_PM", 
		size:[400, 90]
	},
	BOUTON_BAS_1:{
		name:"bouton_bas1_PM", 
		size:[[223, 90], [467, 90]]
	},
	BOUTON_BAS_2:{
		name:"bouton_bas2_PM", 
		size:[223, 90]
	},
	BOUTON_BAS_3:{
		name:"bouton_bas3_PM", 
		size:[[223, 90], [467, 90]]
	},
	BOUTON_BAS_4:{
		name:"bouton_bas4_PM", 
		size:[223, 90]
	},
	BOUTON_GAUCHE_1:{
		name:"bouton_gauche1_PM", 
		size:[223, 90]
	},
	BOUTON_GAUCHE_2:{
		name:"bouton_gauche2_PM", 
		size:[223, 90]
	},
	BOUTON_GAUCHE_3:{
		name:"bouton_gauche3_PM", 
		size:[223, 90]
	},
	INTERSTITIEL:{
		name:"interstitiel", 
		size:[1, 1]
	},
	MEGABANNER_HP:{
		name:"megabanner_HP_PM", 
		size:[458, 241]
	},
	MEGABANNER_MIDDLE:{
		name:"megabanner_middle_PM", 
		size:[980, 90]
	},
	MVNO:{
		name:"MVNO_PM", 
		size:[458, 32]
	},
	ONGLET:{
		name:"onglet", 
		size:[251, 39]
	},
	PAVE:{
		name:"pave", 
		size:[[300, 250], [300, 600]]
	},
	PAVE1:{
		name:"pave1", 
		size:[[300, 250], [300, 600]]
	},
	PAVE2:{
		name:"pave2", 
		size:[[300, 250], [300, 600]]
	},
        PAVE_300_250:{
		name:"pave", 
		size:[300, 250]
	},
        PAVE_300_600:{
		name:"pave", 
		size:[300, 600]
	},
	VENTE_FLASH:{
		name:"vente_flash_PM", 
		size:[720, 190]
	},
	BODY:{
		name:"body", 
		size:[720, 190]
	},
	CONTENU_EVENEMENT:{
		name:"contenu_evenement", 
		size:[1, 1]
	}
};
/************************
 ************************
 * DFP Content
 ************************
************************/

// Set dfp context
PM.adServer.dfp = {};

/**
 * Method used to set the customCriteria from the contextJs
 * Only the value set as "criteria" in the contextJs are setted
 * Param : the googleSlot created by googletag.defineSlot for the good adUnit
 * Return : the googleSlot with all the criteria setted
**/
PM.adServer.dfp.setCustomCriteriaFromContextJs = function(googleSlot, emplacement) {
	googleSlot = googleSlot.setTargeting("emplacement", emplacement);	
	for (key in PM.Context.data) {
		var elt = PM.Context.data[key];
		// check if it's a criteria
		if (typeof(elt.criteria) != "undefined") {
			googleSlot = googleSlot.setTargeting(key, elt.value.toString());		  
		}
	}
	return googleSlot;
};

PM.adServer.dfp.defineUnitsInLine = function(pagesAndPlacements) {
	googletag.cmd.push(function() {
	var googleUnits = [];
	var googleUnit = {};
	for(var i=0;i<pagesAndPlacements.length;i++) {
		googleUnit = googletag.defineUnit('/5263174/PriceMinister_FR/' + pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name , pagesAndPlacements[i].placement.size, pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name).addService(googletag.pubads());
		PM.adServer.dfp.setCustomCriteriaFromContextJs(googleUnit, pagesAndPlacements[i].placement.name);
		googleUnits.push(googleUnit);
	}
	googletag.pubads().refresh(googleUnits);
	for(var i=0;i<pagesAndPlacements.length;i++) {
		googletag.display(pagesAndPlacements[i].page + pagesAndPlacements[i].placement.name);
	}
	});	
}

PM.adServer.dfp.autopromo = function(autoPromoId, iframeId, elt) {
	PM.adServer.dfp.addEvent(iframeId, elt, "click", PM.Statistics.autopromoClick.bindObj(null, autoPromoId));
	return PM.Statistics.autopromoView(autoPromoId);
}

PM.adServer.dfp.addEvent = function(iframeId, obj, evType, fn, preventDefault){
	PM.Debug.store(["Ajout d'un événement", arguments], PM.Debug.Type.INFO); // log de l'ajout d'événement

	tempObj = window.frames[iframeId].document.getElementById(obj);

	if (!tempObj) {
		PM.Debug.log(["[Erreur] : Ajout d'événement sur un objet n'existant pas (" + obj + ")", arguments], PM.Debug.Type.DEBUG);
		return false; // l'objet n'existe pas
    	}

	if (tempObj.addEventListener){
   		if (evType != "mouseleave") { // "PM Image Ajax" DFP script goes here
        		if (preventDefault) tempObj.addEventListener(evType, function(e) { PM.Util.preventDefault(e); }, false);
        		tempObj.addEventListener(evType, fn, false);
     		 } else {
        		tempObj.addEventListener("mouseout", function(evt) {
          			if (!PM.Dom.withinElement(evt.relatedTarget, this.obj)) {
           				 fn.call(null, evt);
          			}
  	      		}.bindObj({obj: tempObj}), false);
		}
		return true; 
	} else if (tempObj.attachEvent){
      		if (preventDefault) tempObj.attachEvent("on"+evType, function(e) { PM.Util.preventDefault(e); })
      		var r = tempObj.attachEvent("on"+evType, fn);
      		return r; 
    	} else { 
     		return false; 
    	}	

}
PM.adServer.tag.pages = {
 	home:"home/home_",
	wine:{
		lp:"art_collection/lp_art_collection/lp_art_collection_",
		fp:"art_collection/fp_art_collection/fp_art_collection_",
		da:"art_collection/da_art_collection/da_art_collection_",
		home:"art_collection/home_art_collection/home_art_collection_",
		di:"art_collection/di_art_collection/di_art_collection_"
	},
	video:{
		lp:"dvd_blueray/lp_dvd_blueray/lp_dvd_blueray_",
		fp:"dvd_blueray/fp_dvd_blueray/fp_dvd_blueray_",
		da:"dvd_blueray/da_dvd_blueray/da_dvd_blueray_",
		home:"dvd_blueray/home_dvd_blueray/home_dvd_blueray_",
		di:"dvd_blueray/di_dvd_blueray/di_dvd_blueray_"
	},
	baby:{
		lp:"enfant/lp_enfant/lp_enfant_",
		fp:"enfant/fp_enfant/fp_enfant_",
		da:"enfant/da_enfant/da_enfant_",
		home:"enfant/home_enfant/home_enfant_",
		di:"enfant/di_enfant/di_enfant_"
	},
	hifi:{
		lp:"image_son/lp_image_son/lp_image_son_",
		fp:"image_son/fp_image_son/fp_image_son_",
		da:"image_son/da_image_son/da_image_son_",
		home:"image_son/home_image_son/home_image_son_",
		di:"image_son/di_image_son/di_image_son_"
	},
	computer:{
		lp:"informatique/lp_informatique/lp_informatique_",
		fp:"informatique/fp_informatique/fp_informatique_",
		da:"informatique/da_informatique/da_informatique_",
		home:"informatique/home_informatique/home_informatique_",
		di:"informatique/di_informatique/di_informatique_"
	},
	games:{
		lp:"jeux_video/lp_jeux_video/lp_jeux_video_",
		fp:"jeux_video/fp_jeux_video/fp_jeux_video_",
		da:"jeux_video/da_jeux_video/da_jeux_video_",
		home:"jeux_video/home_jeux_video/home_jeux_video_",
		di:"jeux_video/di_jeux_video/di_jeux_video_"
	},
	books:{
		lp:"livre/lp_livre/lp_livre_",
		fp:"livre/fp_livre/fp_livre_",
		da:"livre/da_livre/da_livre_",
		home:"livre/home_livre/home_livre_",
		di:"livre/di_livre/di_livre_"
	},
	white:{
		lp:"maison_electromenager/lp_maison_electromenager/lp_maison_electromenager_",
		fp:"maison_electromenager/fp_maison_electromenager/fp_maison_electromenager_",
		da:"maison_electromenager/da_maison_electromenager/da_maison_electromenager_",
		home:"maison_electromenager/home_maison_electromenager/home_maison_electromenager_",
		di:"maison_electromenager/di_maison_electromenager/di_maison_electromenager_"
	},
	clothing:{
		lp:"mode/lp_mode/lp_mode_",
		fp:"mode/fp_mode/fp_mode_",
		da:"mode/da_mode/da_mode_",
		home:"mode/home_mode/home_mode_",
		di:"mode/di_mode/di_mode_"
	},
	music:{
		lp:"musique/lp_musique/lp_musique_",
		fp:"musique/fp_musique/fp_musique_",
		da:"musique/da_musique/da_musique_",
		home:"musique/home_musique/home_musique_",
		di:"musique/di_musique/di_musique_"
	},
	sport:{
		lp:"sport_loisirs/lp_sport_loisirs/lp_sport_loisirs_",
		fp:"sport_loisirs/fp_sport_loisirs/fp_sport_loisirs_",
		da:"sport_loisirs/da_sport_loisirs/da_sport_loisirs_",
		home:"sport_loisirs/home_sport_loisirs/home_sport_loisirs_",
		di:"sport_loisirs/di_sport_loisirs/di_sport_loisirs_"
	},
	electronics:{
		lp:"tel_pda/lp_tel_pda/lp_tel_pda_",
		fp:"tel_pda/fp_tel_pda/fp_tel_pda_",
		da:"tel_pda/da_tel_pda/da_tel_pda_",
		home:"tel_pda/home_tel_pda/home_tel_pda_",
		di:"tel_pda/di_tel_pda/di_tel_pda_"
	},
	boutique:"boutique/boutique_",
	confirmation_paiement:"confirmation_paiement/confirmation_paiement_",
	evenement:"evenement/evenement_",
	faq_aide:"faq_aide/faq_aide_",
	mon_compte:{
		bon_livraison:"mon_compte/mon_compte_bon_livraison/mon_compte_bon_livraison_",
		hp:"mon_compte/mon_compte_hp/mon_compte_hp_",
		mes_paiements:"mon_compte/mon_compte_mes_paiements/mon_compte_mes_paiements_"
	},
	search:"search/search_",
	vente:{
		hp:"vente/vente_hp/vente_hp_",
		tunel_mev:"vente/vente_tunel_mev/vente_tunel_mev_"
	},
	toutes_les_pages:"toutes_les_pages/toutes_les_pages_"
};
