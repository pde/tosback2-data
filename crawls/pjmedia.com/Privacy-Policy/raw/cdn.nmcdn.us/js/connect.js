if (window.NM === undefined) {
    var NM = new Object();
    var host = "cdn.nmcdn.us";
    //var host = "http://stagecms.newsmax.dev";
    NM.init = function (param) {
        if (param["host"]) {
            host = param["host"];
        }
        if (window.jQuery === undefined) {
            var script_tag = document.createElement('script');
            script_tag.setAttribute("type", "text/javascript");
            script_tag.setAttribute("id", "jNM");
            script_tag.setAttribute("src", "http://" + host + "/js/newsmax.jquery.min.js");
            if (script_tag.readyState) {
                script_tag.onreadystatechange = function () { // For old versions of IE
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        load_nmjs();
                    }
                };
            } else {
                script_tag.onload = load_nmjs;
            }
            // Try to find the head, otherwise default to the documentElement
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        } else {
            load_nmjs();
        }
        function load_nmjs() {
            
            var scriptUrl = "http://" + host + "/cmspages/newsmax/feed/GetScript.ashx?ClientID=" + param["ClientID"];
            if (host.indexOf('nmcdn') > 0)
                scriptUrl = scriptUrl + "&md=1";
            var js, id = 'nmWidgetjs' + param["ClientID"], ref = document.getElementsByTagName('script')[0];
            if (document.getElementById(id)) { return; }
            js = document.createElement('script'); js.id = id; js.async = true;
            js.src = scriptUrl;
            ref.parentNode.insertBefore(js, ref);
        }
    }
    window.NM = NM;
}