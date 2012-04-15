  /*added for Jamei's SEO project by Allen 12/09/2011 */
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27486893-1']);
  _gaq.push(['_setDomainName', 'att.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  /*--------------------------------------------------*/
jQuery.noConflict();
var $jQuery = jQuery;

jQuery.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function isEmpty(ob){
    for(var i in ob){
        return false;
    }
    return true;
}

function getCookie(name) {
	var dc = document.cookie;
	var cname = name + "=";
	var clen = dc.length;
	var cbegin = 0;
	while (cbegin < clen) {
	var vbegin = cbegin + cname.length;
	if (dc.substring(cbegin, vbegin) == cname) {
		var vend = dc.indexOf (";", vbegin);
		if (vend == -1) vend = clen;
			return unescape(dc.substring(vbegin, vend));
		}
		cbegin = dc.indexOf(" ", cbegin) + 1;
		if (cbegin== 0) break;
	}
	return null;
}

function BubblePopup(){
    /*----------------------------------*/
    /*         method initial            */
    /*----------------------------------*/
    this.Initial = function(){
        var bubblePopup = this;
        var cnt = 1;
        var newId;
        var linkList = new Array();
        this.link = linkList;

        if (document.getElementsByTagName('a').length != 0 ){
            $jQuery('a').each(function(){
                if($jQuery(this).hasClass('BubblePopupLink')){
                    newId = "BubblePopup_" + cnt;
                    $jQuery(this).attr('id',newId);
                    bubblePopup.CreateOne(newId);
                    cnt++;
                }
            })
        };
			}


        /*----------------------------------*/
        /*         method CreateOne         */
        /*----------------------------------*/
        this.CreateOne = function(bubblePopupId){
            var paramsJSON;
            var totalParams = 0;
            var lbID = "#" + bubblePopupId;
            var imgElement = lbID + '> span > img';

            var bubbleText =  $jQuery(imgElement).attr('bubble');

            var bubbleHtmlStyle = '{color:"#333",width:"180px", "text-align":"left", "background-image":"url(/Common/smallbusiness/homepage/bid/images/1x1px_white.png)"}';

            paramsJSON = '{align : "right;"';
            paramsJSON += ', innerHtml : "' + bubbleText + '"';
            paramsJSON += ', innerHtmlStyle : ' + bubbleHtmlStyle + '';
            paramsJSON += ', themeName : "gray"';
						paramsJSON += ', themePath : "/Common/smallbusiness/homepage/bid/css/jquerybubblepopup-theme"';



            totalParams++;
            var box ={
                id : bubblePopupId,
                params:[]
            };

            paramsJSON += "} ";
            box.params = paramsJSON;
            this.link[bubblePopupId]= box;
        };

        
        /*----------------------------------*/
        /*         method Build            */
        /*----------------------------------*/
        this.Build = function(){
            var boxIndex = '';
            var box = null;

            var linksObj = this.link;
            for(key in linksObj){
                box = linksObj[key];
                boxIndex = "a#" + box['id']  ;

                var json = box['params'];
                var cmd = '$jQuery("'+boxIndex+'").CreateBubblePopup(' + json + ');'
                eval(cmd);

            }
        }
    }
		
			function carouselScroll(direction) {
				if (direction == 'right') {
					$jQuery('li').filter('.group1').css('display','none');
					$jQuery('li').filter('.arrow1').css('display','none');
					$jQuery('li').filter('.group2').css('display','block');
					$jQuery('li').filter('.arrow2').css('display','block');
				} else {
					$jQuery('li').filter('.group1').css('display','block');
					$jQuery('li').filter('.arrow1').css('display','block');
					$jQuery('li').filter('.group2').css('display','none');
					$jQuery('li').filter('.arrow2').css('display','none');
				}
			}
			
function ieSwitch() {
	if ($jQuery.browser.msie && parseInt($jQuery.browser.version, 10) == 7) {
		$jQuery('#manageMyAccount').css('background','url(/Common/smallbusiness/homepage/bid/images/loginwindow_img4_IE.png) no-repeat');
	}
}

function setCookie( name, value, expires, path, domain, secure ){
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name + "=" +( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function safariLinks() {
	if (detectIpad()) {
		$jQuery('a').bind('mouseover',function() {
			document.location = this.href;
		});		
		$jQuery('p.suggestProductItem_ShopNowBtn').bind('mouseover',function() {
			var linkURL = $jQuery(this).attr('linkURL');
			document.location=linkURL;
		});
		$jQuery('.iPadException').bind('mouseover',function() {
			eval($jQuery(this).attr('onclick'));
		});
	}
}

function detectIpad() {
	var navAgent = navigator.userAgent;
	if (navAgent.indexOf('Safari') != -1 && navAgent.indexOf('Chrome') == -1 && navAgent.match(/ipad/i) != null) {
		return true;
	} else {
		return false
	}
}