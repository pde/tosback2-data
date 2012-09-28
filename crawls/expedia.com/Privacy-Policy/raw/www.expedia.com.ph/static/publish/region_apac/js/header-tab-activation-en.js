var Includes = "";
var URLParam = "";
var Exncludes = "";
var FontColor = "";
var BackColor = "";
var Message = "";
var VoucherCode = "";

if (window.location.href.indexOf('.Hotel-Information') > 0) {
    var timer = setInterval("ShowMsgBar()", 5000);
}

function ShowMsgBar() {
    if (typeof jQuery != 'undefined') {
            $.ajax({
                type: "GET",
                url: "/daily/data/tripadvisor_en.xml",
                cache: false,
                dataType: "xml",
                success: function(xml) {
                    var URLString = String(window.location);
                    if (URLString.indexOf(".Hotel-Information") != -1) {
                        $(xml).find("msgRuleSection[Active='true']").each(function() {

                            URLParam = $(this).attr('Param');
                            $(this).find('msgRule').each(function() {
                                Includes = $(this).attr('Includes');
                                Exncludes = $(this).attr('Excludes');
                                Message = $(this).text();
                                VoucherCode = $(this).attr('VoucherCode');
                            });

                        });
                        ViewParams();
                    }
                }

            });
            clearInterval(timer);
    }
}


if (typeof jQuery != 'undefined') {
    $(document).ready(function() {

        $.ajax({
            type: "GET",
            url: "/daily/data/tripadvisor_en.xml",
            cache: false,
            dataType: "xml",
            success: function(xml) {
                var URLString = String(window.location);
                if (URLString.indexOf(".Hotel-Information") != -1) {
                    $(xml).find("msgRuleSection[Active='true']").each(function() {

                        URLParam = $(this).attr('Param');
                        $(this).find('msgRule').each(function() {
                            Includes = $(this).attr('Includes');
                            Exncludes = $(this).attr('Excludes');
                            Message = $(this).text();
                            VoucherCode = $(this).attr('VoucherCode');
                        });

                    });
                    ViewParams();
                }
            }

        });

    });
}

function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}

function CheckIncludes(Includes, Pvalue) {

    if (Includes != "") {

        var InArray = Includes.split(",");
        for (var i = 0; i < InArray.length; i++) {
            if (Pvalue.toUpperCase() == InArray[i].toUpperCase()) return true;
        }
    }
    else return true;
    return false;
}

function CheckExcludes(Excludes, Pvalue) {

    if (Excludes != "") {
        var ExArray = Excludes.split(",");
        for (var i = 0; i < ExArray.length; i++) {
            if (Pvalue.toUpperCase() == ExArray[i].toUpperCase()) return false;
        }
    }
    else return true;
    return true;
}

function ViewParams() {
    //alert(URLParam+","+Includes+","+Exncludes+","+FontColor+","+BackColor+","+Message+","+VoucherCode);

    var URLString = String(window.location);

    var Pvalue = getQuerystring(URLParam);
    if (Pvalue != "" && URLString.indexOf(".Hotel-Information") != -1 && CheckIncludes(Includes, Pvalue) && CheckExcludes(Exncludes, Pvalue)) {
        //alert(Message);
        document.getElementById('collapsedWizard').style.marginTop = "40px";
        document.getElementById('infosite_BColumn').style.marginTop = "25px";

        document.getElementById('collapsedWizard').innerHTML = document.getElementById('collapsedWizard').innerHTML + Message;
        //self.scrollTo(190, 0); this.onfocus = null;
    }


}