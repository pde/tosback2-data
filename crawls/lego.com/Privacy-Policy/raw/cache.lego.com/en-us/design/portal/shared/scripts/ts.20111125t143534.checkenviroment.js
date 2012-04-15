$(document).ready(function () {
   var showOldBrowserMessage = false;

   BrowserDetect.init();

   if (BrowserDetect.OS == "iPhone/iPod" || BrowserDetect.OS == "iPad") {
      return;
   }

    var currentUrlLanguage = get_UrlLanguage();

   if (BrowserDetect.browser != "An unknown browser"
    && BrowserDetect.minimum != "unknown"
    && BrowserDetect.version < BrowserDetect.minimum) {
      showOldBrowserMessage = true;
   }

   function get_cookie(Name) {
      var search = Name + "="
      var returnvalue = "";
      if (document.cookie.length > 0) {
         offset = document.cookie.indexOf(search)
         if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
         }
      }
      return returnvalue;
   }

   function create_cookie(Name, Value) {
      document.cookie = Name + "=" + Value + ';path=/;domain=.lego.com';
   }

    function get_UrlLanguage() {
        var url = window.location.href;
        var nohttp = url.split('//')[1];
        var language = nohttp.split('/')[1];

        var language_ok = check_language(language);

        if (language_ok == false) {
            language = nohttp.split('/')[2];
            language_ok = check_language(language);
        }

        if (language_ok == false) {
            language = "";
        }
        else {
            language = "/" + language + "/";
        }

        return language;
    }

    function check_language(language) {
        if (language == null) return false;
        if (language == "") return false;
        if (language.length > 5) return false;
        if (language.length < 5) return false;
        if (language.indexOf('-') != 2) return false;

        return true;
    }

   if (showOldBrowserMessage == true) {
      if (get_cookie('old_browser_msg_shown') != "true") {
         $.ghcolorbox({
                href: currentUrlLanguage + "Shared/Messages/OldBrowser",
            iframe: true,
            width: 690,
            height: 450,
            speed: 600,
            transition: "elastic",
            overlayClose: false,
            initialWidth: 45,
            initialHeight: 30,
            opacity: 0.75,
            scrolling: false
         });
         create_cookie('old_browser_msg_shown', 'true');
      }
      else {
         showOldBrowserMessage = false;
      }
   }
   // If flashdetect is not available - then flash is not used on this page...
   if (typeof FlashDetect == "object")
      UseFlash = FlashDetect.versionAtLeast(10, 0);
   else
      UseFlash = true;
   if (UseFlash == false && showOldBrowserMessage == false) {
      if (get_cookie('flash_msg_shown') != "true") {
         $.ghcolorbox({
                href: currentUrlLanguage + "Shared/Messages/MissingFlash",
            iframe: true,
            width: 645,
            height: 450,
            speed: 450,
            transition: "elastic",
            overlayClose: false,
            initialWidth: 45,
            initialHeight: 30,
            opacity: 0.75
         });
         create_cookie('flash_msg_shown', 'true');
      }
   }
});

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.minimum = this.searchMinimum(this.dataBrowser) || "Unknown";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";

    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    searchMinimum: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].minimum;
            }
            else if (dataProp)
                return data[i].minimum;
        }
    },
    dataBrowser: [
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version",
		    minimum: "4"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox",
		    minimum: "3"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE",
		    minimum: "7"
		}
        ],
		dataOS: [
        {
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        }
	]
};
