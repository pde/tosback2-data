!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);


$(document).ready(function () {
	if(navigator.userAgent.indexOf('Mac') > 0)
    $('body').addClass('mac');
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
    $('body').addClass('safari');
	if( $.browser.opera )
   	$('body').addClass('opera');
	if( $.browser.msie )
   	$('body').addClass('ie');
	if( $.browser.msie && $.browser.version == '8.0' )
   	$('body').addClass('ie8');
});
	

function getVeriSign(strUrl) {
        var strUrl = "https://seal.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.cheapoair.COM&lang=en";
        window.open(strUrl, "VeriSign", "toolbar=no,status=no,resizable=no,scrollbars=yes,width=560,height=500,top=100,left=100");
    }
    function showGG() {
        window.open('/travel/travel_resources/goldenguarantee.asp', 'GG', 'width=820,height=630,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }

    function TaxesFeesInfo() {
        window.open('/Portals/92/taxes_fees.htm', 'taxfee', 'width=540,height=1000,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
    function ServiceFeesInfo() {
        window.open('/travel/service_fee.htm', 'taxfee', 'width=540,height=300,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
    function NLTC() {
        window.open('/travel/travel_resources/terms.asp#NEWSLETTERS_TERMS', 'taxfee', 'width=600,height=600,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
    function BaggageFeesInfo() {
        window.open('/Portals/92/baggage_fees.html', 'baggagefee', 'width=780,height=1000,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
    function termsAndCond() {
        window.open('/travel/travel_resources/terms.asp#termsCopy', 'termsAndCond', 'width=850,height=500,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
    function showTerms() {
        window.open('http://www.cheapoair.com/Desktopmodules/main/generaltermsandconditions.aspx', 'bookingTerms', 'width=550,height=630,resizable=no,scrollbars=yes,toolbar=no,status=no,titlebar=no');
    }
	


$(function () {
        var tabContainers = $('div.btmtab > div'); tabContainers.hide().filter(':first').show(); $('div.btmtab ul.tabNavigation a').click(function () {
            tabContainers.hide(); tabContainers.filter(this.hash).show(); $('div.btmtab ul.tabNavigation a').removeClass('selected'); $(this).addClass('selected');
            return false;
        }).filter(':first').click();
    });

$("#genralDisc").click(function () {
           if ($('#genralDisc').html() == '[+] General Disclaimer') {
               $("#genralDisc").html("[-] General Disclaimer");
               $('#genralDisctext').show();
           }
           else {
               $("#genralDisc").html("[+] General Disclaimer");
               $('#genralDisctext').hide();
           }

       });

 



/* Cookie Signup handler JS */
            function GetCookieVal(offset) {
                var endstr = document.cookie.indexOf(";", offset);
                if (endstr == -1) { endstr = document.cookie.length; }
                return unescape(document.cookie.substring(offset, endstr));
            } 

            function GetCookie(name) {
                
                var arg = name + "=";
                var alen = arg.length;
                var clen = document.cookie.length;
                var i = 0;
                while (i < clen) {
                    var j = i + alen;
                    if (document.cookie.substring(i, j) == arg) {
                        return GetCookieVal(j);
                    }
                    i = document.cookie.indexOf(" ", i) + 1;
                    if (i == 0) break;
                }
                return null;
            }

            function DeleteCookie(name, path, domain) {
                if (GetCookie(name)) {
                    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-2000 00:00:01 GMT";
                }
            }
            function SetCookie(name, value, expires, path, domain, secure) {

              
window.opener.document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
                
            }


            function signOutEvent(UserDetailsLable) {

    try {
        $('[id*=rowSignOut]').hide();
        $('[id*=divFbPic]').hide();
        document.getElementById(UserDetailsLable).innerHTML = "";

        //for setting cookie value null
        if (-1) {
            var date = new Date();
            date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = "REMUSERFIRSTNAME" + "=" + "" + expires + "; path=/";
        document.cookie = "PROFILELOGIN" + "=" + "" + expires + "; path=/";
        document.cookie = "REMUSERNAME" + "=" + "" + expires + "; path=/";

    }
    catch (e) {
    }

}

            function SignOut() {
                
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "DesktopModules/TravelerProfile/TravelerService.asmx/SignOut",
                    data: "",
                    success: function (response) {
                        var jSonResult = eval('(' + response.d + ')');
                        if (jSonResult != null && jSonResult != 'undefined') {
                            if (jSonResult.SessionExpired == false) {
                                if (jSonResult.IsSucceed == true) {
                                }
                                else {
                                    var errors = jSonResult.ErrorInfo.split('.');
                                    var errorHtml = "";
                                    $(errors).each(function () { if (this.trim() != "") errorHtml += "<li>" + this + "</li>"; });

                                }
                            }
                        }

                    },
                    error: function (xmlHttpRequest, status, err) {

                    }
                });
            }

            function FetchUserName(portalID, hiddenField) {

                var urlService = "/DesktopModules/TravelerProfile/TravelerService.asmx/FetchUserNameIfAuthenticated";
                try {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: urlService,
                        data: "{'portalId_' : '" + portalID + "'}",
                        success: function (response) {
                            var jSonResult = eval('(' + response.d + ')');
                            if (jSonResult != null && jSonResult != 'undefined') {
                                if (document.getElementById(hiddenField) != null) {
                                    if (jSonResult.IsAuthenticated == true)
                                        document.getElementById(hiddenField).value = jSonResult.Name;
                                    else
                                        document.getElementById(hiddenField).value = '';
                                }
                            }
                        },
                        error: function (xmlHttpRequest, status, err) {

                        }
                    });
                }
                catch (ex) {
                }
            }

            function UserNameAuthenticate(portalID, rowSignOutId, rowSignInId, IsPaymentPage, tabId) {

                var urlService = "/DesktopModules/TravelerProfile/TravelerService.asmx/FetchUserNameIfAuthenticated";
                try {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: urlService,
                        data: "{'portalId_' : '" + portalID + "'}",
                        success: function (response) {
                            var jSonResult = eval('(' + response.d + ')');
                            if (jSonResult != null && jSonResult != 'undefined') {
                                if (jSonResult.IsAuthenticated == true)
                                    UserSignInAuth(jSonResult.IsAuthenticated, rowSignOutId, rowSignInId, IsPaymentPage, tabId, jSonResult.Name);

                            }
                        },
                        error: function (xmlHttpRequest, status, err) {

                        }
                    });
                }
                catch (ex) {
                }
            }

            function UserSignInAuth(isAuthenticated, rowSignOutId, rowSignInId, IsPaymentPage, tabId, UserName) {

                var userFirstName;
                if (document.getElementById('sepaSignIn') != null) {
                    $('[id*=sepaSignIn]').show();
                }
                if (isAuthenticated == true) {
                    if (IsPaymentPage == "false") {
                        document.getElementById(rowSignOutId).style.display = 'inline';
                    }
                    if (document.getElementById(rowSignInId) != null) {
                        document.getElementById(rowSignInId).style.display = 'none';
                    }
                    if (document.getElementById('sepaMyAcc') != null) {
                        document.getElementById('sepaMyAcc').style.display = 'inline';
                    }
                    if (document.getElementById('sepaSignOut') != null) {
                        document.getElementById('sepaSignOut').style.display = 'inline';
                    }

                    if (document.getElementById('lnkSignedIn') != null) {
                        document.getElementById('lnkSignedIn').style.display = 'inline';
                    }

                    if (document.getElementById('lnkSignIn') != null) {
                        document.getElementById('lnkSignIn').style.display = 'none';
                    }

                    if (UserName != "") {
                        $('#lblUserDetail').html("Welcome " + UserName + ", ");
                        document.getElementById('hypMyAccount').style.display = 'inline';
                        document.getElementById('hypMyAccount').setAttribute('href', '/default.aspx?tabid=' + tabId);
                    }
                    else {
                        if (document.getElementById('hypMyAccount') != null) {

                            document.getElementById('hypMyAccount').style.display = 'none';
                        }
                        if (document.getElementById('sepaSignOut') != null) {
                            document.getElementById('sepaSignOut').style.display = 'none';
                        }
                        if (document.getElementById(rowSignOutId) != null) {
                            document.getElementById(rowSignOutId).style.display = 'none';
                        }
                        if (document.getElementById(rowSignInId) != null) {
                            document.getElementById(rowSignInId).style.display = 'inline';
                        }                       
                    }
                }
                else {
                    if (document.getElementById('hypMyAccount') != null) {
                        document.getElementById('hypMyAccount').style.display = 'none';
                    }
                    if (document.getElementById('sepaSignOut') != null) {
                        document.getElementById('sepaSignOut').style.display = 'none';
                    }
                }
            }

           

            function UserSignIn(isAuthenticated, rowSignOutId, rowSignInId, IsPaymentPage,tabId) {

                var userFirstName;
                if (document.getElementById('sepaSignIn') != null) {
                    $('[id*=sepaSignIn]').show();
                }
                if (isAuthenticated == "True") {
                    if (IsPaymentPage == "false") {
                        document.getElementById(rowSignOutId).style.display = 'inline';
                    }
                    if (document.getElementById(rowSignInId) != null) {
                        document.getElementById(rowSignInId).style.display = 'none';
                    }
                    if (document.getElementById('sepaMyAcc') != null) {
                        document.getElementById('sepaMyAcc').style.display = 'inline';
                    }
                    if (document.getElementById('sepaSignOut') != null) {
                        document.getElementById('sepaSignOut').style.display = 'inline';
                    }
                    if (document.cookie.length > 0) {
                        userFirstName = GetCookie('REMUSERNAME');
                        if (userFirstName != "null") {
                            $('#lblUserDetail').html("Welcome " + userFirstName + ", ");
                            document.getElementById('hypMyAccount').style.display = 'inline';
                            document.getElementById('hypMyAccount').setAttribute('href', '/default.aspx?tabid=' + tabId);
                        }
                        else {
                            if (document.getElementById('hypMyAccount') != null) {
                                document.getElementById('hypMyAccount').style.display = 'none';
                            }
                            if (document.getElementById('sepaSignOut') != null) {
                                document.getElementById('sepaSignOut').style.display = 'none';
                            }
                            if (document.getElementById(rowSignOutId) != null) {
                                document.getElementById(rowSignOutId).style.display = 'none';
                            }
                            if (document.getElementById(rowSignInId) != null) {
                                document.getElementById(rowSignInId).style.display = 'inline';
                            }
                        }
                    }
                }
                else {
                    if (document.getElementById('hypMyAccount') != null) {
                        document.getElementById('hypMyAccount').style.display = 'none';
                    }
                    if (document.getElementById('sepaSignOut') != null) {
                        document.getElementById('sepaSignOut').style.display = 'none';
                    }
                }
            }

            function signOutClick() {
            
                signOutEvent("lblUserDetail");
                window.location = "/Admin/Security/logoff.aspx";
                //document.getElementById('<%=rowSignIn.ClientID%>').style.display = 'inline';
            }

            function showfacebookPic() {

                try {
                    var isloggedInnViaProfile = GetCookie('PROFILELOGIN');
                    if (isloggedInnViaProfile == null) {
                        $('[id*=divFbPic]').show();
                        //for friends activity we are commenting because of design is pending
                        //$('[id$=tab4]').show();
                    }
                }
                catch (e) {
                }
            }

            function LogoutFB(applicationID) {
                try {
                    window.fbAsyncInit = function () {
                        FB.init({ appId: applicationID, status: true, cookie: true, xfbml: true });
                    };


                    FB.logout(function (response) {
                        // user is now logged out
                    });
                }
                catch (e) {
                }
                 
            }



            function facebookLoginMethods(applicationID, isAuthenticated) {
                try {

                    window.fbAsyncInit = function () {
                        FB.init({ appId: applicationID, status: true, cookie: true, xfbml: true });

                        /* All the events registered */
                        FB.Event.subscribe('auth.login', function (response) {
                            // do something with response
                            loginJS();
                        });
                        FB.Event.subscribe('auth.logout', function (response) {
                            // do something with response
                            logoutJS();
                        });

                        FB.getLoginStatus(function (response) {
                            if (response.authResponse) {
                                // logged in and connected user, someone you know
                                loginJS();
                                //for friends activity
                                if (window.location.href.search("FA=1") != -1) {
                                    getFriends();
                                }
                            }
                            else {
                                $('[id*=divFbPic]').hide();
                            }
                        });
                    };
                    (function () {
                        var e = document.createElement('script');
                        e.type = 'text/javascript';
                        e.src = document.location.protocol +
                    '//connect.facebook.net/en_US/all.js';
                        e.async = true;
                        document.getElementById('fb-root').appendChild(e);
                    } ());

                    function loginJS() {
                        FB.api('/me', function (response) {
                            fqlQueryJS();

                        });
                    }
                    function logoutJS() {

                        FB.api('/me', function (response) {

                        });
                    }
                    function fqlQueryJS() {
                        if (isAuthenticated == "True") {
                            showfacebookPic();
                        }
                    }
                }
                catch (e) {
                }
            }

            function getFriends() {
                try {
                    FB.api('/me/friends', function (response) {
                        if (response.data) {

                            var strUsers = "";
                            var totPage = 0;
                            var num = 0;

                            try {
                                totPage = parseInt(parseInt(response.data.length, 10) / 20, 10);
                                if (parseInt((response.data.length) % 20, 10) != 0) {
                                    totPage = totPage + 1;
                                }
                            } catch (ex) {

                            }
                            //  document.getElementById("content").innerHTML = "";
                            for (pg = 1; pg <= totPage; pg++) {
                                for (r = 1; r <= 4; r++) {
                                    strUsers = strUsers + "<div class=\"DivRow\">";
                                    for (c = 1; c <= 5; c++) {

                                        if (parseInt(response.data.length - 1, 10) > num) {
                                            strUsers = strUsers + "<div class=\"Friend\"><a href=\"http://www.facebook.com/profile.php?id=" + response.data[num].id + "\" target=\"_blank\"><img title=\"" + response.data[num].name + "\" src=\"http://graph.facebook.com/" + response.data[num].id + "/picture\"  width=\"30\" height=\"30\"/></a></div>"; //<br/>" + response.data[num].name + "
                                        }
                                        else { /* strUsers = strUsers + "<div class=\"Friend\"><img src=\"\"/></div>";*/ }
                                        num = num + 1;
                                        try {
                                            getCheckin(response.data[num].id)
                                        } catch (ex) { }
                                    }
                                    strUsers = strUsers + "</div>";
                                }
                            }

                            document.getElementById('content').innerHTML = strUsers;
                            getPaging();

                        } else {

                        }
                    });
                }
                catch (e) {
                }

            }

            function getDateMMDDYYYY(tempDate) {
                try {
                    var tmpStr = "";
                    if (tempDate.getMonth().toString().length == 1) {
                        tmpStr = tmpStr + "0" + tempDate.getMonth().toString();
                    }
                    else {
                        tmpStr = tmpStr + tempDate.getMonth().toString();
                    }
                    if (tempDate.getDate().toString().length == 1) {
                        tmpStr = tmpStr + "/0" + tempDate.getDate().toString();
                    }
                    else {
                        tmpStr = tmpStr + "/" + tempDate.getDate().toString();
                    }

                    tmpStr = tmpStr + "/" + tempDate.getFullYear().toString()
                    return tmpStr
                }
                catch (e) {
                }
            }

            function getCheckin(CheckinID) {
                try {

                    FB.api("/" + CheckinID + "/checkins", function (response) {
                        var strData = "#checkin";
                        TotalCkeckin = TotalCkeckin + parseInt(eval(response.data.length), 10);
                        var chkID = "";
                        var tempStr = "";
                        if (response.data && response.data.length > 0) {
                            for (i = 0; i <= response.data.length - 1; i++) {
                                var objFrom = response.data[i].from;
                                var objPlace = response.data[i].place;
                                if (i == 7) {
                                    $("#moreimg").show();
                                    strData = "#remcheckin";
                                }
                                tempStr = tempStr + "<div class=\"fa-fr\">";
                                tempStr = tempStr + "<div class=\"fa-pic\"><a href=\"http://www.facebook.com/profile.php?id=" + objFrom.id + "\" target=\"_blank\"><img title=\"" + objFrom.name + "\" src=\"http://graph.facebook.com/" + objFrom.id + "/picture\" width=\"36\" height=\"36\" /></a></div>";


                                var tempVar = response.data[i].created_time;
                                var tempArr = tempVar.split("-")
                                var tempDate = new Date(parseInt(tempArr[0], 10), parseInt(tempArr[1], 10) - 1, parseInt(tempArr[2].substr(0, 2), 10));

                                tempStr = tempStr + "<div class=\"fa-cont\">";
                                tempStr = tempStr + "<div class=\"fa-cont1\">&nbsp;" + objFrom.name + "<span>  Created On:" + getDateMMDDYYYY(tempDate) + "</span></div>";


                                tempStr = tempStr + "<div class=\"fa-cont1\" style=\"padding:10px 0 0 0;\">";

                                tempStr = tempStr + "<span class=\"fa-ht-cont\">";

                                tempStr = tempStr + "<span class=\"fa-ht\">" + objPlace.name + "</span>";

                                if (objPlace.location.city != undefined && objPlace.location.country != undefined) {


                                    tempStr = tempStr + "<br /><span>" + objPlace.location.city + ", " + objPlace.location.country + ".</span>";
                                }
                                else if (objPlace.location.city == undefined && objPlace.location.country != undefined) {
                                    tempStr = tempStr + "<br /><span>" + objPlace.location.country + ".</span>";
                                }
                                else if (objPlace.location.city != undefined && objPlace.location.country == undefined) {
                                    tempStr = tempStr + "<br /><span>" + objPlace.location.city + ".</span>";
                                }

                                tempStr = tempStr + "&nbsp;&nbsp;&nbsp;<a style=\"cursor:pointer\" onclick=\"ShowMap('" + objPlace.location.longitude + "','" + objPlace.location.latitude + "','" + objPlace.name + "');\">Map</a></span></div></div></div>";
                                $(strData).append(tempStr);
                                tempStr = "";



                            }


                            $("#TotCheckin").html(TotalCkeckin + " Check-ins");

                        }
                    });
                }
                catch (e) {
                }
            }





	  
