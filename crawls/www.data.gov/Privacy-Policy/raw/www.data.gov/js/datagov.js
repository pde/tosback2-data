function sortNumber(a, b) {
	return a - b;
}

function validateNotEmpty(fieldId, message){
	field = $("#" + fieldId);
	if(field.length == 0){
		return true;
	}
	if(field.val().length == 0){
		alert(message);
		return false;
	}
	return true;
}


function defaultRedirect() {
	return true;
	
	categoryId = $("#selCategories option:selected").val();
	if (categoryId == undefined) {
		categoryId = 0;
	}
	agencyId = $("#selAgencies option:selected").val();
	if (agencyId == undefined) {
		agencyId = 0;
	}
	window.location = '/catalog/category/' + categoryId + '/agency/' + agencyId
			+ '/filter//type';
	return false;
}

function catalogSearchRedirect() {
	return true;
	
	// Get the selected categories
	categories = $(".cb_category:checked");
	allCategories = $('#AllCategories');
	var categoryList = '';
	var agencyList = '';
	if (!allCategories.is(':checked')) {
		arrCategory = new Array(categories.length);
		for (i = 0; i < categories.length; i++) {
			arrCategory[i] = categories[i].value;
		}
		arrCategory.sort(sortNumber);
		for (i = 0; i < arrCategory.length; i++) {
			if (categoryList.length > 0) {
				categoryList += ",";
			}
			categoryList += arrCategory[i];
		}
	}
	if (categoryList.length == 0) {
		categoryList = 0;
	}

	// Get the selected agencies
	agencies = $(".cb_agency:checked");
	allAgencies = $("#AllAgencies");
	if (!allAgencies.is(':checked')) {
		arrAgency = new Array(agencies.length);
		for (i = 0; i < agencies.length; i++) {
			arrAgency[i] = agencies[i].value;
		}
		arrAgency.sort(sortNumber);
		for (i = 0; i < arrAgency.length; i++) {
			if (agencyList.length > 0) {
				agencyList += ",";
			}
			agencyList += arrAgency[i];
		}
	}
	if (agencyList.length == 0) {
		agencyList = 0;
	}

	searchFilter = $("#search2").val();
	//Replace non-alpha numeric characters
	searchFilter =  searchFilter.replace(/[^a-zA-Z\s0-9]+/g,'');
	typeFilter = '';
	if ($('#XML:checked').val() != null) {
		typeFilter += 'x';
	}
	if ($('#CSV-text:checked').val() != null) {
		typeFilter += 'c';
	}
	if ($('#KML-KMZ:checked').val() != null) {
		typeFilter += 'k';
	}
	if ($('#ESRI:checked').val() != null) {
		typeFilter += 'e';
	}
	if ($('#Other:checked').val() != null) {
		typeFilter += 'o';
	}

	window.location = '/catalog/category/' + categoryList + '/agency/'
			+ agencyList + '/filter/' + searchFilter + '/type/' + typeFilter;
	return false;
}

function toggleCollapsible(name){
	/*
	$("#collapsible_text").toggle();
	if($("#collapsible_label").text() == '(less)'){
		$("#collapsible_label").text('(more)');
	}
	else{
		$("#collapsible_label").text('(less)');
	}
	*/
	$("#" + name + "_text").toggle();
	if($("#" + name).text() == '(less)'){
		$("#" + name).text('(more)');
	}
	else{
		$("#" + name).text('(less)');
	}
	return false;
}

function popuprating()
{window.open('/popup-rating.html', '', 'width=400,height=550,resizable=0,status=0,scrollbars=0');}
function popupwid()
{window.open('/popup-widget.html', '', 'width=176,height=179,resizable=0,status=0,scrollbars=0');}
function popupgad()
{window.open('/popup-gadget.html', '', 'width=176,height=179,resizable=0,status=0,scrollbars=0');}
function popupext()
{window.open('/popup-extraction.html','','width=176,height=179,resizable=0,status=0,scrollbars=0');}
function popuppdf()
{window.open('/popup-pdf.html','','width=176,height=275,resizable=0,status=0,scrollbars=0');}
function popupfeeds()
{window.open('/popup-feeds.html','','width=176,height=170,resizable=0,status=0,scrollbars=0');}
function popupexcel()
{window.open('/popup-excel.html','','width=176,height=97,resizable=0,status=0,scrollbars=0');}
function popupxml()
{window.open('/popup-xml.html','','width=176,height=85,resizable=0,status=0,scrollbars=0');}
function popupcsv()
{window.open('/popup-csv.html','','width=176,height=111,resizable=0,status=0,scrollbars=0');}
function popupkml()
{window.open('/popup-kml.html','','width=176,height=85,resizable=0,status=0,scrollbars=0');}
function popupesri()
{window.open('/popup-esri.html','','width=176,height=120,resizable=0,status=0,scrollbars=0');}

// toggler script
function toggleVis(obj)
{
	var el = document.getElementById(obj);
	if ( el.style.display != 'none' )
	{
		el.style.display = 'none';
	}
	else
	{
		el.style.display = '';
	}
}

$(document).ready(function() {
	//Hide all collapsible fields
	$(".collapsible").hide();
	
	$(".cb_agency").click(function(){
		$("#AllAgencies").removeAttr('checked');
	});
	
	$("#AllAgencies").click(function(){
		$(".cb_agency").removeAttr('checked');
	});
	
	$(".cb_category").click(function(){
		$("#AllCategories").removeAttr('checked');
	});
	
	$("#AllCategories").click(function(){
		$('.cb_category').removeAttr('checked');
	});

    // Search box default message
    message = "Site search";
    $('#usagov-search').submit(function(){
        obj = $('#usagov-search input[name="query"]')
        if(obj.val()==message || obj.val()==''){
            obj.val("");
            return true;
        }
    });
    $('#usagov-search input[name="query"]').focus(function(){
        if($(this).val()== message){
            $(this).val("");
        };
    });
    $('#usagov-search input[name="query"]').blur(function(){
        if($(this).val()==''){
            $(this).val(message);
        }
    });

});

mainNav = function() {
	$("#topnav li").bind("mouseenter",function(){
                this.className += "_over over";
	}).bind("mouseleave",function(){
                this.className = this.className.replace("_over over", "");
	});
}
