function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}
function recentViewCode(domain) {
	var code = "";
	if(getCookie("RECENTSKULIST") == "") {
		code = code + "No Products Recently Viewed";
	} else {
		code =  code + "<ul>";
		var productArray = getCookie("RECENTSKULIST").split(",");
		for(var p = 0; p < productArray.length; p++) {
			var product = productArray[p].split(":");
			code = code + "<li><a href=\""+domain+"/product/model:"+product[1]+"/sku:"+product[0]+"\"><img src=\"//www.eastbay.com/images/products/cart/"+product[0]+"_c.jpg\" height=\"50\" width=\"50\" border=\"0\" /></a></li>";
			if(p == 4) {
				p = productArray.length;
			}
		}
		code = code + "</ul>";
	}
	document.getElementById("recentlyViewedBox").innerHTML = code;
}