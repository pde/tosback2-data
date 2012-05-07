function storeSREDID() {
    var thirtyDays = (60*60*1000*24)*30;
    var vals = document.location.search;
    start = vals.indexOf("SREDID=");
    if (start != -1) {
        var end = vals.indexOf("&", start);
        if (end == -1){ end = vals.length }
        var date = new Date();date.setTime(date.getTime()+ thirtyDays);
        document.cookie= vals.substring(start,end) + "; expires=" + date.toGMTString() + "; path=/";
    }
}
function getSREDID(){
   var n = "SREDID=";
   var cookies = document.cookie;
   var start = cookies.indexOf(n);
   if (start == -1){ return null; }
   start += n.length ;
   var end = cookies.indexOf(";", start);
   if (end == -1){ end = cookies.length }
   return cookies.substring(start, end);
}