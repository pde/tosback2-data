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
                url: "/static/publish/region_apac/js/coupon/coupon-code-ph.xml",
                cache: false,
                dataType: "xml",
                success: function(xml) {
                    var URLString = String(window.location);
                    if (URLString.indexOf(".Hotel-Information") != -1) {
                        $(xml).find("msgRuleSection[Active='true']").each(function() {
							URLParam = $(this).attr('Param');
							var Pvalue = getQuerystring(URLParam); //get the value icmcid
							if (Pvalue != ""){
								$(this).find("msgRule[Active='true'][Lang='EN']").each(function() { 
								Includes = $(this).attr('Includes');
								Exncludes = $(this).attr('Excludes');
								if (CheckIncludes(Includes, Pvalue) && CheckExcludes(Exncludes, Pvalue)) 
									{
										Message = $(this).text();
										VoucherCode = $(this).attr('VoucherCode');
										ViewParams(); //display
										return false;
									}	
								});
							}
						});
					}
                }
			});
            clearInterval(timer);
    }
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
            if(Pvalue.toUpperCase().indexOf(ExArray[i].toUpperCase()) != -1) return false;
        }
    }
    else return true;
    return true;
}

function ViewParams() {
		document.getElementById('infositeHeader').innerHTML = Message + document.getElementById('infositeHeader').innerHTML ;
}

