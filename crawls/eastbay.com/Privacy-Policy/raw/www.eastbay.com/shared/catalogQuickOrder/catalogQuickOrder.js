var row2focusSet = false;
var row3focusSet = false;
var productFound = new Array();
var productNotFound = new Array();
function searchKeyPress(e, index) {
	// look for window.event in case event isn't passed in 
	//if (window.event) { e = window.event; } 
	if (e.keyCode == 13) { 
		rearrangeitem(parseInt(index),"");
	}
	/*else if (e.keyCode == 8 || e.keyCode == 46) {
		var item = "#quickorder_item" + index;
		var itemVal = $.trim($(item).val());
		if (itemVal.length == 0) {
			rearrangeitem(parseInt(index),"deteleitem");
		}
	}*/
} 

function getproduct(index) {
	rearrangeitem(index,"");
}

function loadProduct(index) {
	var itemarray=new Array();
	var i = 0;
	$(".quickorder_item").each(function() {
		var item = $.trim($(this).attr("value"));
		if (item != "") {
			itemarray[i] = item;
			i++;
		}
	});

	var qtyarray=new Array();
	var q = 0;
	$(".quickorder_quantityinput").each(function() {
		var qty = $.trim($(this).attr("value"));
		//if (qty != "") {
			qtyarray[q] = qty;
			q++;
		//}
	});
	
	var sizearray=new Array();
	var s = 0;
	$(".quickorder_sizeinput").each(function() {
		var size = $.trim($(this).attr("value"));
		//if (size != "") {
			sizearray[s] = size;
			s++;
		//}
	});
	
	var selecteditemarray=new Array();
	var c = 0;
	$(".addtocartcheckbox").each(function() {
		var selecteditem = $.trim($(this).attr("value"));
		//alert(selectedite);
		if (selecteditem != "") {
			//alert($(this).is(':checked'));
			selecteditemarray[c] = $(this).is(':checked');
			
		}
		else {
			selecteditemarray[c] = false;
		}
		c++;
	});
	//alert(selecteditemarray);
	//var removeditem = 0;
	/*var getitem = "#quickorder_item" + index;

	if ($.trim($(getitem).val()) == "") {
		removeditem = index;
	}*/
	
	$("#quickorder_searchResultContainer").load(quickordersearchtemplate, {item: itemarray.join(','), coreMetricsDo: coreMetricsDo, cm_to_wishlist: cm_to_wishlist, qty: qtyarray, size: sizearray, selecteditem: selecteditemarray.join(','), coreMetricDoneAlready: coreMetricDoneAlready});
}

function addToCart() {
	var index = $("#index").val();
	var err = "";
	var checkedProductCount = 0;
	for (var i = 1; i <= index; i++) {
		var sku = "#sku_" + i;
		var size = "#size_" + i;
		var qty = "#qty_" + i;
		var addtocart = "#addtocart_" + i;
		
		$(size).css("background-color", "white");
		$(qty).css("background-color", "white");
		
		if (typeof($(addtocart).val()) != "undefined" && $(addtocart).attr('checked')) {
			checkedProductCount++;
			if ($.trim($(size).val()) == -1) {
				err = err + "Select a size for product " + $.trim($(sku).val()) + "\n";
				$(size).css("background-color", "#FFCCCC");
			}
			if ($.trim($(qty).val()) <= 0 || $.trim($(qty).val()) == "" || $.trim($(qty).val()) > 255) {
				err = err + "Enter valid quantity from 1 to 255 for product " + $.trim($(sku).val()) + "\n";
				$(qty).css("background-color", "#FFCCCC");
			}
			else if (isNaN($.trim($(qty).val()))) {
				err = err + "Enter valid quantity for product " + $.trim($(sku).val()) + "\n";
				$(qty).css("background-color", "#FFCCCC");
			}
		}
	}

	if (checkedProductCount == 0) {
		err = err + "Please select any available product(s) from the product search result.\n";
	}
	
	if (err != "") {
		alert(err);
	}
	else {
		// disable the submit button
		$("#quickorder_addToCartButton").hide();
		$("#quickorder_addToCartButtonProcessing").show();
		// submit the form	
		document.getElementById('quickorder_add_product_form').submit(); 
	}
}

function rearrangeitem(index, type) {
	var itemarray=new Array();
	var i = 0;
	$(".quickorder_item").each(function() {
		var item = $.trim($(this).attr("value"));
		if (item != "") {
			itemarray[i] = item;
			i++;
		}
	});
	
	$(".quickorder_item").each(function() {
		$(this).val("");
	});
	
	var itemindex = 1
	for (var a = 0; a < itemarray.length; a++) {
		if (type == "addwishlist") {
			if ((index != a + 1)) {
				var item = "#quickorder_item" + itemindex;
				$(item).val(itemarray[a]);
				itemindex++;
			}
		}
		else {
			var item = "#quickorder_item" + itemindex;
			$(item).val(itemarray[a]);
			itemindex++;
		}
	}
	var lineitem = "#lineitem_" + index;
	$(lineitem).remove();
	showNextRow();
	var focusitemfield = "#quickorder_item" + index;
	if ($(focusitemfield).val() != "") {
		loadProduct(index);
	}
}

function showNextRow() {
	var itemarray=new Array();
	var i = 0;
	$(".quickorder_item").each(function() {
		var item = $.trim($(this).attr("value"));
		if (item != "") {
			itemarray[i] = item;
			i++;
		}
	});
	
	if (itemarray.length >= 4 && itemarray.length < 8) {
		$("#quickorder_input_row2").show();
		if (itemarray.length == 4 && row2focusSet == false) {
			$("#quickorder_item5").focus();
			row2focusSet = true;
		}
		$("#quickorder_input_row3").hide();
	}
	else if (itemarray.length >= 8) {
		$("#quickorder_input_row2").show();
		$("#quickorder_input_row3").show();
		if (itemarray.length == 8 && row3focusSet == false) {
			$("#quickorder_item9").focus();
			row3focusSet = true;
		}
	}
	else if (itemarray.length < 4) {
		$("#quickorder_input_row2").hide();
		if (row2focusSet == true) {
			row2focusSet = false;
		}
		$("#quickorder_input_row3").hide();
	}
	else if (itemarray.length < 8 && itemarray.length >=4) {
		$("#quickorder_input_row2").show();
		$("#quickorder_input_row3").hide();
		if (row3focusSet == true) {
			row3focusSet = false;
		}
	}
}
