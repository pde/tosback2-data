// $Id: tmjs.js,v 1.18 2008-08-26 19:26:30 brichmond Exp $ 

function SS_preloadImages() { 
  var d=document; if(d.images){ if(!d.SS_p) d.SS_p=new Array();
    var i,j=d.SS_p.length,a=SS_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.SS_p[j]=new Image; d.SS_p[j++].src=a[i];}}
}

function SS_swapImgRestore() { 
  var i,x,a=document.SS_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function SS_findObj(n, d) { 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=SS_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function SS_swapImage() { 
  var i,j=0,x,a=SS_swapImage.arguments; document.SS_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=SS_findObj(a[i]))!=null){document.SS_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

var is_khtml = "";

function check_is_khtml(){
var re_test = new RegExp("khtml","gi");
   if( navigator.userAgent.match(re_test) ) {
	return true;
   }
   else {
	return false;
   }
                      }


// Project: http://internaltools.tm.tmcs/Project/Z88JPY
// This random number is at the top of the page, because all of the ads on a page need to have the same random number.
// This will tell the ad server that the ads are on the same page 
// and that it should not serve ads from competing companies (ex: Delta Airlines & Continental Airlines)
random_number = Math.random();
random_number_10_digit = random_number * 10000000000;
random_integer_10_digit = Math.round(random_number_10_digit);
is_ie9pinned = (typeof ie9pinned === 'undefined') ? false : ie9pinned;
function appendTransID(my_ad,return_ad){
        // http://internaltools.tm.tmcs/Project/Z88JPY
        // Introduces the need to add a random number to the generated for ads that appear on the same page.
        var reg_ex_random_transactionID = new RegExp("&tid=","gi");
        var reg_ex_random_tile = new RegExp("tile=","gi");
        if( my_ad.match(reg_ex_random_transactionID) ) {
            var new_value = my_ad.match(reg_ex_random_transactionID) + random_integer_10_digit;
            var my_ad = my_ad.replace( reg_ex_random_transactionID, new_value );
            var new_value = my_ad.match(reg_ex_random_tile) + random_integer_10_digit;
            var tilepattern = /&tile=(?!\d+)/;
            my_ad = (is_ie9pinned) ? my_ad.replace('ie9pinned=false','ie9pinned=true') : my_ad;
            if(tilepattern.test(my_ad)){
                my_ad = my_ad.replace( reg_ex_random_tile, new_value );
            }
        }
        if( return_ad ) {
            return my_ad.replace(reg_ex,"");
        }
        else {
            document.writeln( my_ad.replace(reg_ex,"") );
        }
 }

function check_display( my_selector, my_ad ) {
if(check_is_khtml()){
       appendTransID(my_ad);
      }
else{
    var toCheck = document.getElementById(my_selector);
    if(window.getComputedStyle) {
        var y = window.getComputedStyle(toCheck,null).getPropertyValue('display');
    }
    else {
        var y = eval('toCheck.currentStyle.' + 'display');
    }

    if( y != "none" || my_selector == "leaderBoard") {
        var reg_ex_dma = new RegExp("dmaid=[0-9]{3,5}","gi");
        if( !my_ad.match(reg_ex_dma) ) {
            var new_dma = "&dmaid=" + find_dma();
            var reg_ex_mark = new RegExp("lang=[a-z|A-Z|-]{5}","gi");
            var my_match = my_ad.match(reg_ex_mark);
            // if there is a language, pass it along
            var new_value = (my_match) ? my_match[0] + new_dma : new_dma;
            my_ad = my_ad.replace( reg_ex_mark, new_value );
        }
        appendTransID(my_ad);
        var reg_ex = new RegExp("&bgcolor=.{6}","gi");
        my_color = "&bgcolor=" + get_bg_color();
        //document.writeln( my_ad.replace(reg_ex,my_color) );
    }
}

}

function get_bg_color() {
	var reg_ex = new RegExp("(rgb|[()])","g");
	var reg_ex2 = new RegExp("(\#)","g");

    if (Object.isElement($('mainContent'))){
        var toCheck = document.getElementById('mainContent');
    }else if (Object.isElement($('frame'))){
        var toCheck = document.getElementById('frame');
    }
    if (toCheck){
        var color_array = new Array();
        if(window.getComputedStyle) {
            var y = window.getComputedStyle(toCheck,null).getPropertyValue('background-color');
        }
        else {
            var y = eval('toCheck.currentStyle.' + 'backgroundColor');
        }
        if( y.match(reg_ex) ) {
            y = y.replace(reg_ex,"");
            y = y.split(", ");
            color_array[0] = parseInt(y[0]).toString(16);
            color_array[1] = parseInt(y[1]).toString(16);
            color_array[2] = parseInt(y[2]).toString(16);
            for( i = 0 ; i < color_array.length ; i++) {
                if( y[i] < 16 ) {
                    color_array[i] = "0" + color_array[i];
                }
            }
            final_value = color_array[0] + color_array[1] + color_array[2];
        }
        else {
            y = y.replace(reg_ex2,"");
            final_value = y;
        }
    	return final_value;
    }
}

var default_dma = "99999";
var located_dma = GetCookie('NPDMA');
var display_dma = located_dma ? located_dma : default_dma;
function find_dma() {
	return display_dma;
}




///////////////////// CODE BELOW HANDLES COOKIE ////////////////

function getCookieVal (offset) {
 var endstr = document.cookie.indexOf (";", offset);
 if (endstr == -1)
  endstr = document.cookie.length;

 //For bug 68417, to fix encode with encodeURI() but decode with unescape();
 return unescape(decodeURI(document.cookie.substring(offset, endstr))); 
}

function GetCookie (name) {
 var arg = name + "=";
 var alen = arg.length;
 var clen = document.cookie.length;
 var i = 0;
 while (i < clen) {
  var j = i + alen;
  if (document.cookie.substring(i, j) == arg)
   return getCookieVal (j);
  i = document.cookie.indexOf(" ", i) + 1;
  if (i == 0)
   break;
 }
 return null;
}

// ada & event usage- shoppinglist
function shoppinglist_cookie_remove(id) {
    var cart_list_array = cart_list || "";
    //  Removes the ID with the accompanying comma if it is last
    cart_list_array = cart_list_array.replace("," + id,"");
    //  Removes the ID with the accompanying comma if it is anywhere else
    cart_list_array = cart_list_array.replace(id + ",","");
    //  Removes ID, if it is the only one in the list
    cart_list_array = cart_list_array.replace(id,"");
    if (cart_list_array.match(/[a-zA-Z0-9]/)){
        SetCookie (shoppinglist_cookie_name, cart_list_array, shoppinglist_cookie_duration);   
    }
    else {
        deleteCookie (shoppinglist_cookie_name);    
    }
    cart_list = GetCookie (shoppinglist_cookie_name);
}

// ada & event usage - shoppinglist
function shopping_cart_total(){
    if (cart_list){
        var cart_list_array = cart_list.split(",");
        return (cart_list_array.length);
    }
    else{ return 0 }
}

function SetCookie (name, value, secs_to_live, domain)
{  
    var expdate = new Date();

    if (secs_to_live){
    expdate.setTime(expdate.getTime() + secs_to_live*1000);
    }
    else {
    expdate.setFullYear(expdate.getFullYear() + 1);
    }
    var tmp_str = name + "=" + escape (value) + "; path=/; expires="+expdate.toGMTString();
    if (domain) {
        tmp_str += "; domain=" + domain;
    }
    document.cookie = tmp_str; 
}

function deleteCookie(name, domain) {
  if (GetCookie(name)) {
    var lastyear = new Date();
    lastyear.setFullYear(lastyear.getFullYear() + -1);
    var tmp_str = name + "=; path=/; expires="+lastyear.toGMTString();
    if (domain) {
        tmp_str += " ;domain=" + domain;
    }
    document.cookie = tmp_str; 
  }
}  

function uncheckAll(field) {
    if (field.tagName) {
        field.checked = false;
    } else {
        for (i = 0; i < field.length; i++) {
            field[i].checked = false ;
        }	
    }
}

function openPrintWin(url,display_div){
    newwin = window.open(url,'','width=1000,height=600,menubar=0,toolbars=0,scrollbars=1,status=0');
}

// This function will allow you get the value of a specific CSS style, given a specific ID
// If you want to discover the "font weight" for an object, with the id "fname", and then assign that 
// value to another object
// new_cell = document.getElementById("lname");
// new_cell.style.fontWeight=getElementStyle("fname", "fontWeight", "font-weight");
//
// Example:
function getElementStyle(elemID, IEStyleProp, CSSStyleProp) {
    var elem = document.getElementById(elemID);
    if (elem.currentStyle) {
        return elem.currentStyle[IEStyleProp];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(elem, "");
        return compStyle.getPropertyValue(CSSStyleProp);
    }
    return "";
}

// Allows you to do a GREPlike call for an array such as:
Array.prototype.grep = function (match){
    for (var i = 0; i < this.length; ++i) {
        if (this[i] == match) return true;
    }
    return false;
}

// Since the innerHTML attribute works INCONSISTENTLY for IE, 
// This function will simulate it by looping through all the 
// child nodes and deleting them
function deleteinnerHTML(el){
    if (el){
        while (el.hasChildNodes())
            el.removeChild(el.lastChild);
    }
}

//generic openwindow
function openWindow(url) {
popUpWin = window.open(url,'demoWin','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=460,height=300');
	if (navigator.appName == 'Netscape') {
		popUpWin.focus();
	}
}

// Determines whether a keypress is the enter key
function enterKeyPressed(e) {
  var charCode;
    
  if (e && e.which) {
    charCode = e.which;
  } else if(window.event) {
    e = window.event;
    charCode = e.keyCode;
  }

  return charCode == 13 ? true : false;
}
