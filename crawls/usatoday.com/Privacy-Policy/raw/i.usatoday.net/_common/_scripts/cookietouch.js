var usatCookieExpDate = new Object();
usatCookieExpDate['zagCookie'] = "2020-11-31";
usatCookieExpDate['RDB']       = "2020-11-31";
usatCookieExpDate['RMID']      = "2020-11-31";
usatCookieExpDate['qqCookie']  = "2020-11-31";
usatCookieExpDate['wpLocID']   = "2020-11-31";
usatCookieExpDate['USATINFO']  = "2020-11-31";
usatCookieExpDate['v1us']      = "1999-12-31"; //delete
usatCookieExpDate['v1st']      = "1999-12-31"; //delete
usatCookieExpDate['UID']       = "1999-12-31"; //delete
usatCookieExpDate['bullsbears']       = "1999-12-31";
usatCookieExpDate['movieviewers']     = "1999-12-31";
usatCookieExpDate['lookersbookers']   = "1999-12-31";
usatCookieExpDate['tirekickers']      = "1999-12-31";

for (var usatCookie in usatCookieExpDate) {
   var usatCookieValue = usat.cookie.get(usatCookie);
   if (usatCookieValue != null) {
      var datearray = usatCookieExpDate[usatCookie].split("-");
      var expdate = new Date(datearray[0], datearray[1], datearray[2]);
      usat.cookie.set(usatCookie, usatCookieValue,
         expdate, '/', '.usatoday.com');
   } //if
} //for
