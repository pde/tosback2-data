function logPageView(application, page, session, server, comefrom) {
 if(typeof server == "undefined") server = 'http://track.untd.com';
 if(typeof session == "undefined") session = 'default';
 if(typeof comefrom == "undefined") comefrom = ''; 
 var img = '<img src='+server+'/s/pv?s=999999&a='+application+'&p='+page+'&d=unknown&i='+session+'&cf='+comefrom+'&srt=0&crt=0& width=1 height=1 border=0>';
 document.write(img);
}