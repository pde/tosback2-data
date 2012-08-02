/*new overlay*/
var my_sfcPanel;
function generateSfcPanel(pid, header_title, body_content, pwidth,create_new_instance){
//alert("pid:" + pid + "pid:" + header_title);
//alert("body_content: " + body_content );
//alert("pwidth:" + pwidth + "create_new_instance:" + create_new_instance);

    if(typeof(create_new_instance) == 'undefined')
        create_new_instance = false;
    //alert("no error0!");

    if(typeof(my_sfcPanel) == 'undefined' || create_new_instance){
        //alert("new sfcPanel(pid)");
        my_sfcPanel = new sfcPanel(pid);
    }

    //alert("no error1!");
    my_sfcPanel.setProperties({
        width : pwidth,
        constraintoviewport : true,
        fixedcenter : true,
        underlay : "none",
        visible : false,
        draggable : false,
        //close : false,
        close : true,
        iframe: false,
        modal : true
    });

    ///my_sfcPanel.setHideOnMaskClick(true);
    my_sfcPanel.setHideOnMaskClick(false);
    ////my_sfcPanel.setHeader(header_title);
    my_sfcPanel.setBody(body_content);
    my_sfcPanel.show();
    //alert("no error2!");

    var panel_id = pid+"_sfc_panel";
    YAHOO.util.Event.onContentReady(panel_id, function () {
        my_sfcPanel.center();
    });

    return my_sfcPanel;
}


//function getPageOverlay(pid, header_title, url, panel_width, run_embedded_js, r_callback, create_new_instance){
function getPageOverlay(pid, header_title, url, panel_width, panel_height, run_embedded_js, r_callback, create_new_instance){
    //alert('getPageOverlay: ' + pid);
    run_embedded_js = run_embedded_js || -1;

    var sUrl = url;
    var r_func = function(){};

    if(typeof(r_callback) != 'undefined')
        r_func = r_callback;

    if(typeof(create_new_instance) == 'undefined')
        create_new_instance = false;

    //  justice: school uniforms
    //var img_width = '534px';
    //  brothers: the endless adventure!
    //var img_width = '675px';


    var callback = {
        success:function(o) {
            //var content_body = '<div id="sfcpanel_container" style="position: relative;">'
                //                    + o.responseText
                    //            +'</div>', panel;
            var content_body = '<div id="sfcpanel_container" style="position:relative; margin:0px; padding:0px;">'
                        +'<iframe name="overlay_ifr" id="overlay_ifr" src="'+url+'" scrolling="no" style="width:'+panel_width+';height:'+panel_height+'; background-color:transparent; margin:0px; padding:0px;" frameborder="0" >'
                        +o.responseText
                        +'</iframe>'
                   +'</div>';


            panel = generateSfcPanel(pid, header_title, content_body, panel_width, create_new_instance);
            if (run_embedded_js > 0 || run_embedded_js == true)
            {
                var sfcpanel = document.getElementById('sfcpanel_container');
                if (sfcpanel)
                {
                    var scripts = sfcpanel.getElementsByTagName('script');
                    for (var i=0; i < scripts.length; i++) {
                        try
                        {
                            eval(scripts[i].innerHTML);
                        }
                        catch(e) {}
                    };
                };
            };
            if(!create_new_instance)
                o.argument(panel);
        },
        failure:function(o) {
           var panel_width = "200px";
           var error_body = "<div style='height:50px;padding-top: 10px;'>"
                    +"<center><span class='overlay-content-darkgray-bold'>There was an error getting the content</span>"
                    +"</div>";
           generateSfcPanel(pid,'Error',error_body,panel_width);
        },
        argument: r_func
    };
    YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}


function swap_text(id, text, style, on_style)
{
    e = document.getElementById(id);
    e.className = on_style;
    if (e.value == '' || e.value == text) {
        e.value = '';
    };
    e.onblur = new Function("e = document.getElementById('"+id+"');if (e.value == '') {e.className = '"+style+"';e.value='"+text+"'}");
}

function hide_objects()
{
    els = document.getElementsByTagName('select');
    for (i in els) {
        if (els[i] && els[i].style) {
            els[i].style.visibility = "hidden";
        }
    }
}

function show_objects()
{
    els = document.getElementsByTagName('select');
    for (i in els) {
        if (els[i] && els[i].style) {
            els[i].style.visibility = "visible";
        }
    }
}

function trackLink(url, event) {
    urchinTracker(event);
    self.location = url;
}

function dollar_format(amount) {
    amount = parseFloat(amount);
    var sign = amount < 0 ? '-' : '';
    return sign + '$' + Math.abs(amount).toFixed(2);
}

function noDoubleClick(id,url, text)
{
    if (text == null) {
        text = "Processing, please wait...";
    }
    e = document.getElementById(id);
    e.innerHTML = "<span id=\""+id+"\">"+text+"</span>";
    //javascript redirect is required by ie.
    if(url)
        window.location = url;
    return true;
}

//
// addLoadEvent()
// Adds event to window.onload without overwriting currently assigned onload functions.
// Function found at Simon Willison's weblog - http://simon.incutio.com/
//
function addLoadEvent(func)
{
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    } else {
        window.onload = function(){
        oldonload();
        func();
        }
    }

}

function WinOpen(mypage, myname, w, h, winl, wint, scroll) {
    var wint = (screen.height - h) / 2;
    if (winl = 0 ){
        var winl = (screen.width - w) / 2 + winl;
    } else {
        var winl = (screen.width - w) / 2;
    }

    winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl
       + ',scrollbars='+scroll+',resizable=no, horizontalscrollbar=no, screenX='
       +winl+',screenY='+wint+'';
    win = window.open(mypage, myname, winprops);
    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }
}

// hides shopping shortcuts
function hideShoppingShortcuts(){
    var attributes = {
        height: { to: 0}
    };
    var anim = new YAHOO.util.Anim('shopping_shortcuts_content', attributes, 0.5, YAHOO.util.Easing.easeOut);
    anim.animate();
    document.getElementById('shopping_shortcuts_menu').innerHTML = "<a href='#' id='shopping_shortcuts_btn' onclick='showShoppingShortcuts();return false;'>" + "<img src='/images/shopping_shortcuts/show.jpg' id='shopping_shortcuts_btnimg' /></a>'";
}

// shows shopping shortcuts
function showShoppingShortcuts(){
    var attributes = {
        height: { to: 70}
    };
    var anim = new YAHOO.util.Anim('shopping_shortcuts_content', attributes, 0.5, YAHOO.util.Easing.easeOut);
    anim.animate();
    document.getElementById('shopping_shortcuts_menu').innerHTML = "<a href='#' id='shopping_shortcuts_btn' onclick='hideShoppingShortcuts();return false;'>" + "<img src='/images/shopping_shortcuts/hide.jpg' id='shopping_shortcuts_btnimg' /></a>'";
}

//for static top nav
function switchImage(id){
    if(id=='wishlist'){
        document.getElementById('wishlist').src="/images/layout/header/wishlist-on.gif";
    } else if(id=='gwof'){
        document.getElementById('gwof').src="/images/layout/header/gwof-on.jpg";
    } else if(id=='gcards'){
        document.getElementById('gcards').src="/images/layout/header/gift-cards-on.jpg";
    } else if(id=='bday'){
        document.getElementById('bday').src="/images/layout/header/monkey-on.jpg";
    } else{
        if(id=='limitedtoo'){
        document.getElementById(id).style.backgroundImage="url('/images/layout/wrapper/"+id+".gif')";
        } else{
        document.getElementById(id).style.backgroundImage="url('/images/layout/wrapper/"+id+".gif')";
        }
    }
}
function switchImageBack(id){
    if(id=='wishlist'){
        document.getElementById('wishlist').src="/images/layout/header/wishlist-off.gif";
    } else if(id=='gwof'){
        document.getElementById('gwof').src="/images/layout/header/gwof-off.jpg";
    } else if(id=='gcards'){
        document.getElementById('gcards').src="/images/layout/header/gift-cards-off.jpg";
    } else if(id=='bday'){
        document.getElementById('bday').src="/images/layout/header/monkey-off.jpg";
    } else{
        if(id=='limitedtoo'){
        document.getElementById(id).style.backgroundImage="url('/images/layout/wrapper/limitedtoo_default.gif')";
        } else{
        document.getElementById(id).style.backgroundImage="url('/images/layout/wrapper/blank.gif')";
        }
    }
}

function close_sl() {
    document.getElementById('sl_popup').style.display='none';
}

/*function open_sl() {
    document.getElementById('sl_popup').style.display='block';
}*/

//order tracking popup
var order_track_panel;
function loadOrderTrackPanel(){
    var width = 394;
    var height = 172;
    var x = (document.documentElement.clientWidth - width)/2;
    order_track_panel = new YAHOO.widget.Panel("order_track_base", {
        visible: false,
        y: 50,
        x: x,
        zIndex: 250,
        width: width+"px",
        height: height+"px",
        modal: true,
        close: false,
        draggable: false,        
        underlay: "none"
    });
    order_track_panel.render(document.body);
}

function showTrackPanel() {
    order_track_panel.show();
    order_track_panel.cfg.setProperty("zIndex",50);
}

function trackInputFocus(input) {
    if(input.value == "enter your order number") input.value = "";
}

YAHOO.util.Event.onContentReady("order_track_base", loadOrderTrackPanel);

//opens an url in a fullscreen popup 
function targetBlank (url) { 
    blankWin = window.open(url,'_blank','menubar=yes,toolbar=yes,location=yes,directories=yes,fullscreen=yes,titlebar=yes,hotkeys=yes,status=yes,scrollbars=yes,resizable=yes'); 
} 


var gwPanel;
function open_giftWrap() {
 	if(typeof gwPanel == 'undefined'){ 
 	   gwPanel = new sfcPanel('giftWrap'); 
 	   gwPanel.setProperties( 
	                   {
	                     width:'544px',
	                     fixedcenter:true,
	                     iframe:true,
	                     close:false,
	                     zindex:300,
	                     modal:true,
	                     constraintoviewport: false,
	                     scope:this                             
	                   });
	 	var close_btn = '<a href="" onclick="gwPanel.hide();return false;" clasS="container-close"><img src="close12_1.gif" /></a>'; 
	 	gwPanel.setBody(close_btn+"<img alt='' src='/images/cart/Overlay-FPO.jpg' style='border:0px;' />"); 
	 	gwPanel.setHideOnMaskClick(false);
	}
 	gwPanel.show(); 
}

var overlayPanel;
function openBrothersOverlay() {
 	overlayPanel = new sfcPanel('brothersOL'); 
 	overlayPanel.setProperties( 
	                   {
	                	 width:'850px',
	                	 height:'875px',
	                     fixedcenter:false,
	                     iframe:true,
	                     close:false,
	                     zindex:300,
	                     modal:true,
	                     constraintoviewport: false,
	                     scope:this,
	                     underlay:'none'
	                   });
 	overlayPanel.setHideOnMaskClick(false);
 	var close_btn = '<a href="" onclick="overlayPanel.setBody(\'\'); overlayPanel.hide(); return false;" class="container-close"><img src="close12_1.gif" /></a>'; 
 	overlayPanel.setBody(close_btn+'<iframe src="brothers" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:850px; height:875px;" allowTransparency="true"></iframe>'); 
 	overlayPanel.show(); 
}

function braguidePopup(){   
   overlayPanel = new sfcPanel('braguide');
 	overlayPanel.setProperties(
	                  {
                            width:'780px',
                            height:'750px',
	                    fixedcenter:false,
	                    iframe:true,
	                    close:false,
	                    zindex:300,
	                    modal:true,
	                    constraintoviewport: false,
	                    scope:this,
	                    underlay:'none'
	                   });
 	overlayPanel.setHideOnMaskClick(false);
 	var close_btn = '<a href="" onclick="overlayPanel.setBody(\'\'); overlayPanel.hide(); return false;" class="container-close" style="outline: none;"><img src="close12_1.gif"  /></a>';
 	overlayPanel.setBody(close_btn+'<iframe src="/braguide" scrolling="yes" frameborder="0" style="border:none; width:780px; height:750px;" ></iframe>');
 	overlayPanel.show();
    return false;
}

YAHOO.util.Event.onDOMReady(
		function()
		{
			var searchBox = document.getElementById('q');
			YAHOO.util.Event.addListener(searchBox, 'blur', 
					function(evt, _p)
					{
						if(_p.value == '')
							_p.value = 'search keyword or item #';
						else
							_p.value = _p.value.toLowerCase();
					}, searchBox);
			YAHOO.util.Event.addListener(searchBox, 'focus', 
					function(evt, _p)
					{
						YAHOO.util.Dom.removeClass(_p, 'qempty');
						if(_p.value == "Oops! Let's try again, enter search here." || _p.value == "search keyword or item #")
							_p.value = '';
					}, searchBox);
			YAHOO.util.Event.addListener(searchBox.parentNode, 'submit', 
					function(evt, _p)
					{
						if(_p.value == '' || _p.value == "Oops! Let's try again, enter search here." || _p.value == 'search keyword or item #') {
							_p.value = "Oops! Let's try again, enter search here.";
							YAHOO.util.Dom.addClass(_p, 'qempty');
							YAHOO.util.Event.preventDefault(evt);
							return false;
						}
						_p.value = _p.value.toLowerCase()
					}, searchBox);
		});

function openCheckage()
{
    window.open('http://www.shopjustice.com/account/checkage');
}