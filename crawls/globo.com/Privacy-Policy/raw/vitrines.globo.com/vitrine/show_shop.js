var publicidade = publicidade || {};

publicidade.Vitrine = function() {
    
    function getPositionTop(element){
        var offset = 0;
        while(element) {
            offset += element["offsetTop"];
            element = element.offsetParent;
        }
        return offset;
    }

    function isElementVisible(elt) {
        if (!elt) {
            return false;
        }
        var posTop = getPositionTop(elt);
        var posBottom = posTop + elt.offsetHeight;
        var visibleTop = (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop); 
        var visibleBottom = visibleTop + document.documentElement.clientHeight;

        return ((posBottom >= visibleTop) && (posTop <= visibleBottom));
    }

    function setLocationHash(location, value) {
        var endpos = location.length;
        if (location.lastIndexOf('#')>0) {
            endpos = location.lastIndexOf('#')
        }

      return location.substring(0, endpos) + "#" + value;
    }
    
    return {
        checkShopVisible: function() {
            var x = document.getElementsByName("globo_shop_frame")

            if (isElementVisible(x[0])) {
                x[0].src = setLocationHash(x[0].src, "visible");
            } else {
                x[0].src = setLocationHash(x[0].src, "invisible");
            }
        }
    };
};


(function(){
  

    function nulify(value){
        return value!=null?'"'+value+'"':'""'
    }
    
    function escape_value(value){
        if(typeof encodeURIComponent=="function"){
            return encodeURIComponent(value)
        }else{
            return escape(value)
        }
    }
    function error_handler(b,a,d){
        run();
        return true
    }
    function add_parameter(name,value){
        if(value){
            window.globo_shop_url+="&"+name+"="+value
        }
    }
    function add_escaped_parameter(name,value){
        if(value){
            add_parameter(name,escape_value(value))
        }
    }
    function add_color_parameter(name,value,timestamp){
        if(value&&typeof value=="object"){
            value=value[timstamp%value.length]
        }
        add_parameter("color_"+name,value)
    }
    function print_shop(theWindow,theDocument,theUrl){
        theUrl=theUrl.substring(0,1000);
        theUrl=theUrl.replace(/%\w?$/,"");
        if(theWindow.globo_ad_output=="js"){
            theDocument.write('<script type="text/javascript" src='+ nulify(theUrl) + '><\/script>')
        }
        else if(theWindow.globo_ad_output=="html"){
            if(theWindow.name!="globo_shop_frame"){
                theDocument.write('<iframe name="globo_shop_frame" width='+nulify(theWindow.globo_shop_width)+" height="+nulify(theWindow.globo_shop_height)+" frameborder="+0+" src="+nulify(theUrl)+' marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no">');
                theDocument.write("</iframe>");
                theDocument.write('<script type="text/javascript">var _vitrine = new publicidade.Vitrine();<\/script>')
            }
        }
        else if(theWindow.globo_ad_output=="textlink"){
            theDocument.write('<script type="text/javascript" src='+nulify(theUrl)+"><\/script>")
        }
    }    
    function reset_data(theWindow){
        var nil=null;
        theWindow.globo_page_url=nil;
        theWindow.globo_shop_client=nil;
        theWindow.globo_shop_slot=nil;
        theWindow.globo_shop_width=nil;
        theWindow.globo_shop_height=nil;
        theWindow.globo_shop_product_slots=nil;
        theWindow.globo_ad_output=nil;
        theWindow.globo_shop_tab_slots=nil;
        theWindow.globo_color_text=nil;
        theWindow.globo_color_link=nil;
    }
    function run(){
        var mynull=null;
        var mywindow=window;
        var mydocument=document;
        var mydate=new Date;
        var mytime=mydate.getTime();
        var ad_format=mywindow.globo_shop_format;  
        
        mywindow.globo_shop_url="http://vitrines.globo.com/vitrine/shop/"+mywindow.globo_shop_product_slots+"/"+mywindow.globo_shop_slot+".html?";
        
        add_escaped_parameter("url",mywindow.globo_page_url);
        add_parameter("sc",mywindow.globo_shop_client); 
        add_parameter("ss",mywindow.globo_shop_slot); 
        add_parameter("sw",mywindow.globo_shop_width); 
        add_parameter("sh",mywindow.globo_shop_height); 
        add_parameter("sps",mywindow.globo_shop_product_slots); 
        add_parameter("sts",mywindow.globo_shop_tab_slots); 
        add_parameter("output",mywindow.globo_ad_output);
        add_color_parameter("text",mywindow.globo_color_text,mytime);   
        add_color_parameter("link",mywindow.globo_color_link,mytime);   
        
        print_shop(mywindow,mydocument,mywindow.globo_shop_url);
        reset_data(mywindow);
        
    }
    function is_at_top(theWindow,theDocument){
        return theWindow.top.location==theDocument.location
    }
    function get_dimension(theWindow,theDocument){
        var docEl=theDocument.documentElement;
        if(is_at_top(theWindow,theDocument))
            return false;
        if(theWindow.globo_shop_width&&theWindow.globo_shop_height){
            var width=1;
            var height=1;
            if(theWindow.innerHeight){
                width=theWindow.innerWidth;
                height=theWindow.innerHeight
            }
            else if(docEl&&docEl.clientHeight){
                width=docEl.clientWidth;
                height=docEl.clientHeight
            }
            else if(theDocument.body){
                width=theDocument.body.clientWidth;
                height=theDocument.body.clientHeight
            }
            if(height>2*theWindow.globo_shop_height||width>2*theWindow.google_ad_width){
                return false
            }
        }
        return true
    }
    
    function calculate_width_for(product_quantity) {
        return 140 + 160 * product_quantity;
    }
    
    function setup(){
        var mywindow=window;
        var mydocument=document;
        var mylocation=document.location;
        var myreferer=document.referrer;
        var mynull=null;
        mywindow.globo_com_error_handler=mywindow.onerror;
        mywindow.onerror=error_handler;
        if(mywindow.globo_ad_output==mynull){
            mywindow.globo_ad_output="html"
        }
        
        if( mywindow.globo_shop_product_slots == null || isNaN(mywindow.globo_shop_product_slots) || mywindow.globo_shop_product_slots < 1 || mywindow.globo_shop_product_slots > 5) {
            mywindow.globo_shop_product_slots = 5;
        }
        
        if( mywindow.globo_shop_tab_slots == null || isNaN(mywindow.globo_shop_tab_slots)) {
            mywindow.globo_shop_tab_slots = mywindow.globo_shop_product_slots;
        }
        
        if(mywindow.globo_shop_width==mynull) {
            mywindow.globo_shop_width = calculate_width_for(globo_shop_product_slots);
        }
        if(mywindow.globo_shop_height==mynull) {
            mywindow.globo_shop_height = 348;
        }

        if(mywindow.globo_page_url==mynull){
            mywindow.globo_page_url=myreferer;
            if(!get_dimension(mywindow,mydocument)){
                mywindow.globo_page_url=mylocation;
                mywindow.globo_last_modified_time=Date.parse(mydocument.lastModified)/1000;
                mywindow.globo_referrer_url=myreferer
            }
        }else{
            mywindow.globo_page_location=myreferer;
            if(!get_dimension(mywindow,mydocument)){
                mywindow.globo_page_location=mylocation
            }
        }
    }
    setup();
    run();
})();