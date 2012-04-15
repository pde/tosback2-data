//************************************************************************************
// Description : Get Cookie Value
// Parameter: Cookie name
// Return: Cookie value
// Usage: 
//************************************************************************************
function getCookieRV(name) {
    var flag = document.cookie.indexOf(name+'=');
    if (flag != -1) {
        flag += name.length + 1;
        end = document.cookie.indexOf(';', flag) ;
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(flag, end));
    } else {
    	return "";
    }
}

/*
 * get product code count to cookie
 */
function getCookieRVCnt(type) {

	var dummy_cnt = 0;
	var pro_cd =getCookieRV("dk_" + type + "_pro_cd");
	if(pro_cd == "" )   dummy_cnt=0;
	else if( pro_cd.indexOf("||")==0 || pro_cd.indexOf("||")==-1) dummy_cnt=1;
	else   dummy_cnt=pro_cd.split("||").length;

	return dummy_cnt
}

/**
 * service method for product detail page
 * @param name
 * @param value
 * @param expires
 * @param path
 */
function setCookieData (name, value, expires, path) {
	var cookieDate = new Date();
	cookieDate.setDate(cookieDate.getDate() + parseInt(expires));

	document.cookie = name + "=" + escape(value) + ";domain=.samsung.com;expires=" + cookieDate.toGMTString() + "; path=/;";
}

/**
 * check same product code in cookie.
 * @param name
 * @param modelCode
 * @returns {Boolean}
 */
function productCheckCookie(name, modelCode) {
	var t_modelCode	= getCookieRV(name);
	if (t_modelCode.indexOf(modelCode) > -1 && t_modelCode != "") {
		return true;
	} else {
		return false;
	}
}

var siteCode = "us";

function setCookieInfoForRView(category, modelCode) {
	if (modelCode == "") return;
	setCookieRV("rv", category, modelCode);
}

/**
 * set cookie recently product code
 * @param type
 * @param cate
 * @param cd
 * @returns {Boolean}
 */
function setCookieRV(type, cate, cd) {
	var limit = 5;

	var name = new Array;
	name[0] = "dk_" + type + "_pro_site";
	name[1] = "dk_" + type + "_pro_path";
	name[2] = "dk_" + type + "_pro_cd";

	var value = new Array;
	value[0]	= siteCode;
	value[1]	= cate;
	value[2]	= cd;
	
	if (productCheckCookie(name[2], cd) == true) {
		return;
	}

	var typeCnt	= parseInt(getCookieRVCnt(type ));
	if (!typeCnt || typeCnt < 0) { typeCnt = 0; }

	if (typeCnt >= limit) {
		// push cookie data to first product code.
		pushRVCookie(type, name, value);
	}

	var getData = "";
	var arr_data		= new Array;
	for (var n=0; n<name.length;n++) {
		arr_data[n] = new Array;

		getData = getCookieRV(name[n]);
		if (getData) {
			arr_data[n] 	= getData.split("||");
			arr_data[n][arr_data[n].length] = value[n];
		} else {
			arr_data[n][0] 	= value[n];
		}
	}

	typeCnt	= parseInt(getCookieRVCnt(type ));

	if (!typeCnt || typeCnt < 0) { typeCnt = 0; }

	if (typeCnt < limit) {
		setCookieData(type + "_pro_cnt", parseInt(typeCnt + 1), 3650, "");
		for (var i =0; i < arr_data.length; i++) {
			if (arr_data[i]) {
				setCookieData(name[i], arr_data[i].join("||"), 3650, "");
			} else {
				setCookieData(name[i], arr_data[i], 3650, "");
			}
		}
	}
	return true;
}

function pushRVCookie(type, name, value) {
	var cntTitle = "_pro_cnt";

	var tmp_cnt = 0;
	tmp_cnt	= parseInt(getCookieRV(type+cntTitle))-1;
	setCookieData(type+cntTitle, tmp_cnt, 3650, "");

	var tmp_str = "";
	var tmp_col;

	for (var n=0; n<name.length; n++) {
		tmp_str = getCookieRV(name[n]);
		tmp_col =	tmp_str.indexOf("||") + 2;
		setCookieData(name[n], tmp_str.substring(tmp_col, tmp_str.length), 3650, "")
	}
}

function tagRecentlyViewed()
{
	try {
		ss_link_click_track(
				'prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event12'
				,''
				,'recently viewed,' + s.pageName 
					+ '>recently viewed,' + s.pageName 
					+ '>top nav>recently viewed,recently viewed,' + s.pageName 
					+ '>recently viewed,' + s.pageName 
					+ '>top nav>recently viewed,events'
				,'o'
				,'recently viewed');
		
	} catch (e) {alert("Exception");}
	return true;
}
var home_url_path = "http://"+window.location.host;

/**
 * read cookie product code and read database product information to ajax. 
 */
function callRecentlyViewData () {
	var ajax_url = "/us/function/recentlyViewList.do";
	var type = "rv";
	var dummy_cnt = getCookieRVCnt(type);

	if (dummy_cnt > 0) {
		$.ajax({
			url:ajax_url,
			type:'GET',
			cache: true,
			global:false,
			data: {},
//			dataType: "xml",
			dataType:($.browser.msie) ? "text" : "xml",
			success: function (xml){
				var data;
				data = xml;
				if (typeof xml == "string") {
				   data = new ActiveXObject("Microsoft.XMLDOM");
				   data.async = false;
				   data.loadXML(xml);
				 } else {
				   data = xml;
				 }
				 var idx = 0;
				$("#recently-viewed-content").find("ul").html("");
				var products = $(data).find("product");
				products.each (function () {
					if(idx < 5) {
						var htmlContent = ''; 
						var prd_mdl_cd = $("prd_mdl_cd", this).text();
						var display_prd_mdl_name = $("display_prd_mdl_name", this).text();
						var file_full_path = home_url_path + $("file_full_path", this).text();
						var file_xl_full_path = home_url_path + $("file_xl_full_path", this).text();
						var prd_price = $("prd_price", this).text();
						var detail_url = $("detail_url", this).text();
						
						if (idx == products.length-1 || idx == 4) {
							htmlContent += '<li class="last">';
						} else {
							htmlContent += '<li>';
						}
						htmlContent += '<a href="' + detail_url + '" class="recent-product-img" onclick="return tagRecentlyViewed();"><img src="' + file_xl_full_path + '" alt="' + prd_mdl_cd + '" width="100px"></a>';
						htmlContent += '<a href="' + detail_url + '" onclick="return tagRecentlyViewed();">' + display_prd_mdl_name + '</a>';
						htmlContent += '</li>';
						$("#recently-viewed-content > ul").append(htmlContent);
						idx++;
					}
				});
			}
		});
	}
}

/**
 * to visit another national site.
 * cookie data delete all.
 */
function recently_view_cookie_init()
{ 
	 var us_site = "us";
	 var cookie_site =  getCookieRV("dock_site");
	 if (us_site != cookie_site )
	 {
	   if(us_site != '')
       {  
		   setCookieData("dock_site", us_site, 3650, "");

		   setCookieData("s_pro_cnt"        ,"",-1,"");
		   setCookieData("dk_s_pro_site"    ,"",-1,"");
		   setCookieData("dk_s_pro_path"    ,"",-1,"");
		   setCookieData("dk_s_pro_cd"      ,"",-1,"");

		   setCookieData("rv_pro_cnt"       ,"",-1,"");
		   setCookieData("dk_rv_pro_site"   ,"",-1,"");
		   setCookieData("dk_rv_pro_path"   ,"",-1,"");
		   setCookieData("dk_rv_pro_cd"     ,"",-1,"");
	      	      	       
		   setCookieData("c_pro_cnt"        ,"",-1,"");
		   setCookieData("dk_c_pro_site"    ,"",-1,""); 
		   setCookieData("dk_c_pro_path"    ,"",-1,"");
		   setCookieData("dk_c_pro_cd"      ,"",-1,"");
	      
		   setCookieData("clist_pro_cnt"    ,"",-1,"");
		   setCookieData("dk_clist_title"   ,"",-1,"");
		   setCookieData("dk_clist_time"    ,"",-1,"");
		   setCookieData("dk_clist_url"     ,"",-1,""); 
     }
   }
}

function funcReplaceAll(oldStr, findStr, repStr) {
	if (!oldStr) return oldStr;
	var srchNdx = 0;
	var newStr = "";
	while (oldStr.indexOf(findStr, srchNdx) != -1) {
		newStr += oldStr.substring(srchNdx, oldStr.indexOf(findStr, srchNdx));
		newStr += repStr;
		srchNdx = (oldStr.indexOf(findStr, srchNdx) + findStr.length);
	}
	newStr += oldStr.substring(srchNdx, oldStr.length);
	return newStr;
}

