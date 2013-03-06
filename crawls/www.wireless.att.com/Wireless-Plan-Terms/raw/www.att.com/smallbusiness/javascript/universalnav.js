$(document).ready(function() {

$("div#navBusiness").hover(
  function () {
    $("div#uniNav").css('background-position', '4px -74px');
	$("div#navBusiness a").css('color','#666666');
	$("div#navBusinessTray").show();
  }, 
  function () {
  }
);
$("div#navBusinessTray").hover(
  function () {
	$(this).stop(false, true).show();
    $("div#uniNav").css('background-position', '4px -74px');
	$("div#navBusiness a").css('color','#666666');	
  }, 
  function () {

  }
);
$("#uniNav").hover(
	function () {
	
	},
	function (){
		$("div#uniNav").css('background-position', '4px -11px');
		$("div#navBusinessTray").hide();
	}
);
$("#navPersonal,#navAtt").hover(
	function () {
		$("div#uniNav").css('background-position', '4px -11px');
		$("div#navBusinessTray").hide();	
	},
	function (){

	}
);
});
GeoLoc = {
	//type can be 1(Personal), 2(Small Business), 3(Enterprise Business), 4(Wholesale), or 5(Government)
	localize: function(type, zip, seg, url) {
		if (this.dtabCookie || this.subDtabCookie) {
			switch(type) {
			case 1:
				this.modifyCookie("DTAB","Tab=Res",365);
				this.modifyCookie("subDTAB","",-1);
				break;
			case 2:
				this.modifyCookie("DTAB","Tab=Bus",365);
				this.modifyCookie("subDTAB","",-1);
				break;
			case 3:
				this.modifyCookie("DTAB","Tab=Ent",365);
				this.modifyCookie("subDTAB","",-1);
				break;
			case 4:
				this.modifyCookie("DTAB","Tab=Ent",365);
				this.modifyCookie("subDTAB","WHOLESALE",365);
				break;
			case 5:
				this.modifyCookie("DTAB","Tab=Ent",365);
				this.modifyCookie("subDTAB","GOVERNMENT",365);
				break;
			}
			//alert("DTABs modified");
		}
		if (zip) {
			jQuery.ajax({
				url:"http://localization.att.com/loc/controller",
				type: "GET",
				data: { ltype: "rev", zip: zip, segment: seg },
				dataType: "jsonp",
				complete:function() {
					//alert("reverse localization occured");
					window.location.href = url;
				}
			});
		} else {
			//alert("attPersistentLocalization cookie not set");
			window.location.href = url;
		}
	},
	getCookie: function(name) {
		var tempCookies = document.cookie.split(";"), value = 0;
		jQuery.each(tempCookies,function(i,v) {
			if (v.indexOf(name) !== -1) {
				value = v;
				return false;
			}
		});
		return value;
	},
	modifyCookie: function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+value+expires+"; path=/; domain=.att.com";
	},
	getZip: function(value) {
		var zip = 0, tempZip, tempValue;
		if (value) {
			tempValue = value.split("|");
			jQuery.each(tempValue,function(i,v) {
				if (v.indexOf("zip") !== -1) {
					tempZip = v.split("=");
					zip = tempZip[1];
					return false;
				}
			});
		}
		return zip;
	},
	initialize: function() {
		this.locCookie = this.getCookie("attPersistantLocalization");
		this.dtabCookie = this.getCookie("DTAB");
		this.subDtabCookie = this.getCookie("subDTAB");
		this.userZip = this.getZip(this.locCookie);

		jQuery("#navPersonal a").click(function(e) { GeoLoc.localize(1,GeoLoc.userZip,"res",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery("#navBusiness a").click(function(e) { GeoLoc.localize(2,GeoLoc.userZip,"bus",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('#uniNavsmallBusiness').click(function(e) { GeoLoc.localize(2,GeoLoc.userZip,"bus",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('#uniNaventBusiness').click(function(e) { GeoLoc.localize(3,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('#uniNavwholesale').click(function(e) { GeoLoc.localize(4,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('#uniNavgovernment').click(function(e) { GeoLoc.localize(5,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
	}
}

jQuery(document).ready(function() {
	GeoLoc.initialize();
});

