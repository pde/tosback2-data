// First party cookie implementation for use on a site not using a WebTrends Analytics JS Tag.
// Apply this javascript to all page on the site (will work on just landing pages).
// Change @@CUSTID@@ in the last line to reflect the correct account number.

function DcsDynamicSearch(cid){
	// private members
	var cname="WT_DSAI";
	var wt=(typeof(WT)=="object")?WT:{};

	// private methods
	function setAdInfo(){
		var value=getQueryParam("cshift_ck");
		if (value.length>0){
			var cur=new Date();
			var exp=new Date(cur.getTime()+315360000000);
			document.cookie=cname+"="+value+"; expires="+exp.toGMTString()+"; path=/";
		}
	}
	function getQueryParam(key){
		var qry=window.location.search.substring(1);
		if (qry.length>0){
			var params=qry.split("&");
			var count=params.length;
			for (var i=0;i<count;i++){
				var p=params[i].split("=");
				if (p[0]==key){
					return p[1];
				}
			}
		}
		return "";
	}

	function dcsGetCookie(name){
		var cookies=document.cookie.split("; ");
		var cmatch=[];
		var idx=0;
		var i=0;
		var namelen=name.length;
		var clen=cookies.length;
		for (i=0;i<clen;i++){
			var c=cookies[i];
			if ((c.substring(0,namelen+1))==(name+"=")){
				cmatch[idx++]=c;
			}
		}
		var cmatchCount=cmatch.length;
		if (cmatchCount>0){
			idx=0;
			if ((cmatchCount>1)&&(name==dcsInit.fpc)){
				var dLatest=new Date(0);
				for (i=0;i<cmatchCount;i++){
					var lv=parseInt(dcsGetCrumb(cmatch[i],"lv"));
					var dLst=new Date(lv);
					if (dLst>dLatest){
						dLatest.setTime(dLst.getTime());
						idx=i;
					}
				}
			}
			return unescape(cmatch[idx].substring(namelen+1));
		}	
		else{
			return null;
		}
	}
	
	function dcsGetCrumb(cval,crumb){
		var aCookie=cval.split(":");
		for (var i=0;i<aCookie.length;i++){
			var aCrumb=aCookie[i].split("=");
			if (crumb==aCrumb[0]){
				return aCrumb[1];
			}
		}
		return null;
	}

	// privileged methods
	this.getClientId=function(){
		return cid;
	};
	this.getAdInfo=function(){
		return dcsGetCookie(cname)||"";
	};
	this.getIsNew=function(){
		return 1;
	};
	// read query parameter, set cookie
	setAdInfo();
}

function getlink(link) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < 1000);
	window.open(link, 'newwin', 'status=1,toolbar=1,scrollbars=1,menubar=1');
}

var dcsDS=new DcsDynamicSearch(5056);












