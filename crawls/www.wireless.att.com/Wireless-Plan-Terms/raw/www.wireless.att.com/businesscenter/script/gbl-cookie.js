GeoLoc = {
	/*type can be 1(Personal), 2(Small Business), 3(Enterprise Business), 4(Wholesale), or 5(Government)*/
	localize: function(type, zip, seg, url) {

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
		/*alert("DTABs modified");*/

		if (zip) {
			jQuery.ajax({
				url:"http://localization.att.com/loc/controller",
				type: "GET",
				data: { ltype: "rev", zip: zip, segment: seg },
				dataType: "jsonp",
				complete:function() {
					/*alert("reverse localization occured");*/
					window.location.href = url;
				}
			});
		} else {
			/*alert("attPersistentLocalization cookie not set");*/
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

		jQuery("#segMenuItemPersonal").click(function(e) { GeoLoc.localize(1,GeoLoc.userZip,"res",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery("#segMenuItemBusiness").click(function(e) { GeoLoc.localize(2,GeoLoc.userZip,"bus",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('a[name*="Small Business"]').click(function(e) { GeoLoc.localize(2,GeoLoc.userZip,"bus",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('a[name*="Enterprise Business"]').click(function(e) { GeoLoc.localize(3,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('a[name*="Wholesale"]').click(function(e) { GeoLoc.localize(4,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
		jQuery('a[name*="Government"]').click(function(e) { GeoLoc.localize(5,GeoLoc.userZip,"ent",this.href); e.preventDefault();e.stopPropagation(); });
	}
}

jQuery(document).ready(function() {
	GeoLoc.initialize();
	jQuery('a[href*=".pdf"]').click(function(e) { 
	dcsMultiTrack('DCS.dcsuri',this.href, 'DCS.dcsref',window.location.href, 
					'DCSext.wtEvent','File_Download','DCSext.wtNoHit','1','DCSext.wtStatusMsg','SUCCESS');
	});	
});