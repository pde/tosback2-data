//revised rray adlibrary - 7-15-2008 - rl & bb

// Escape special characters
function escapevars(input){
   var under = '_';
   var output;
   output = input.replace(/-/gi,under);
   output = input.replace(/''/gi,under);
   output = output.replace(/&/gi,under);
   output = output.replace(/;/gi,under);
   return output;
}

// site, category, section, subsection, pageid variables passed from the page
var base
var keygroup = '';
var ingregroup = '';
var sitesec = 'PARTNERS';
var cat = 'RR';
var vgn     = escapevars(category.toUpperCase());
var subsec  = escapevars(subsection.toUpperCase());
var pid     = escapevars(pageid.toUpperCase());
var keyword = escapevars(keywords);
var topic = escapevars(topic.toUpperCase());
var debug   = bug;

// Ad call function on pages
function RRAd(adtype,pos,ingredients) {

//Loop through ingredients
var ingre = ingredients.split(",");
if(ingredients != "" | ingre != "null"){
    for(i = 0; i < ingre.length; i++) {
        ingreword = (ingre[i]);
        ingreword1 = ('ingredient='+ ingreword);
        ingregroup = ingregroup + '&' + ingreword1;
    }
}
    
//Loop through keywords 
    var words = keywords.split(",");
if(keywords != "" | ingre != "null"){
    for(i = 0; i < words.length; i++) {
        key = (words[i]);
        keyword1 = ('keyword='+ key);
        keygroup = keygroup + '&' + keyword1;
    }
}

// Generating ord value for cache busting adcalls and Generating tile value for ad synching
    if (typeof(gnm_ord)=='undefined') gnm_ord=Math.random()*10000000000000000;
    if (typeof(gnm_tile)=='undefined') gnm_tile=Math.random()*10000000000000000;

//Checking for debug value to point to Dev Adservers for testing
    if (debug != '1'){
            base = 'http://adsremote.scrippsnetworks.com/js.ng/';
        }
        else {
            base = 'http://devadsremote.scrippsnetworks.com/js.ng/';
        }
    
//building ads object to be written to the page based on variables passed from page, and adcall arguments
    ads=new Object;
    ads[adtype] ='\
        <!--Ad Unit -->\
        <script language="JavaScript" type="text/javascript" src="' + base + 'site=' + sitesec + '&amp;category=' + cat + '&amp;topic=' + topic + '&amp;vgncontent=' + vgn + '&amp;subsection=' + subsec + '&amp;uniqueid=' + pid + '&amp;adtype=' + adtype + '&amp;PagePos=' + pos  + keygroup + ingregroup + '&amp;tile='+ gnm_tile +'&amp;ord=' + gnm_ord + '"></script>';
    
    document.write(ads[adtype]);
    keygroup = "";
    ingregroup = "";
}
