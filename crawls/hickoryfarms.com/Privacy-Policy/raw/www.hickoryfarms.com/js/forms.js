function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
function getRadioValue(radioObj)
{
	if(!radioObj) return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
			
	for(var i = 0; i < radioLength; i++)
	{
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}
function checkQty(tval)
{
	var strPass = tval.value;
	var strLength = strPass.length;
	var lchar = tval.value.charAt((strLength) - 1);
	var cCode = CalcKeyCode(lchar);
	if (cCode < 48 || cCode > 57 ) {
		var myNumber = tval.value.substring(0, (strLength) - 1);
		tval.value = myNumber;
	}
	return false;
}
function updateCart(inID)
{
	var qty = document.getElementById('qty_' + inID).value;
	var sku = document.getElementById('sku_' + inID).value;
	var cartID = document.getElementById('cartid').value;
	var Updateurl = "/cart-item.asp?prc=upd&rid=" + inID + "&cartid=" + cartID + "&sku=" + sku + "&qty=" + qty;
	window.location.replace(Updateurl)
}