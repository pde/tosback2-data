function getDataSourceType(controlName) {
    var autoCompleteTextBox = controlName.id;
    var dataSource = controlName.getAttribute('DataSource');
    var datavalue = controlName.getAttribute('DataValue');
    var params = controlName.getAttribute('MethodParameters');
    var minChar = controlName.getAttribute('MinChars');
    var errorMessages = controlName.getAttribute('ServiceCallExceptionMessages');

    var eventOnSelected = controlName.getAttribute('OnClientSelectedIndexChanging');
    var paramArray = params.split(",");
    if (controlName.getAttribute("DataSourceType") == "XML") {
        $(function () {
            $.ajax({
                url: dataSource,
                dataType: "xml",
                success: function (xmlResponse) {
                    var data = $(datavalue, xmlResponse).map(function () {
                        return {
                            value: $(this).text()
                        };
                    }).get();

                    $("#" + autoCompleteTextBox).autocomplete({
                        source: data,
                        minLength: minChar
                    }).data("autocomplete")._renderItem = function (ul, item) {
                        item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
                        return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append($("<a></a>").html(item.label))
                    .appendTo(ul);
                    };
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('Error: ' + xhr.statusText);
                }
            });
        });
    }
    else if (controlName.getAttribute("DataSourceType") == "WebService") {

        jQuery(function () {
            jQuery("#" + autoCompleteTextBox).autocomplete({
                select: function (event, ui) {
                    jQuery("#" + autoCompleteTextBox).val(ui.item.value);
                    eval(eventOnSelected);
                },

                source: function (request, response) {
                    var JSONDataSource = new Object();
                    var limit = 0;
                    for (var i = 0; i < paramArray.length; i++) {
                        var paramValue = paramArray[i];
                        if (paramValue.match("SearchText")) {
                            paramValue = paramValue.replace("SearchText", "")
                            JSONDataSource[paramValue] = request.term.trim() + "*";
                        }
                        else if (paramValue.match("SearchQuery")) {
                            paramValue = paramValue.replace("SearchQuery", "")
                            JSONDataSource[paramValue] = request.term.trim();
                        }
                        else if (paramValue.match("SearchLimit")) {
                            paramValue = paramValue.replace("SearchLimit", "")
                            JSONDataSource[paramValue.split(":")[0]] = paramValue.split(":")[1];
                            limit = paramValue.split(":")[1];
                        }
                        else if (paramValue.match("SearchTime")) {
                            paramValue = paramValue.replace("SearchTime", "")
                            JSONDataSource[paramValue] = (new Date()).getTime().toString();
                        }
                        else {
                            JSONDataSource[paramValue] = paramArray[i];
                        }
                    }
                    var term = request.term.trim().toLowerCase(),
	            element = this.element,
	            cache = this.element.data('autocompleteCache') || {},
	            foundInCache = false;
                    result = [];

                    jQuery.each(cache, function (key, data) {
                        if (term.indexOf(key) > 0 && data.length > 0) {
                            jQuery.each(data, function (item, val) {
                                actVal = val.toLowerCase();
                                if (actVal.indexOf(term) === 0) {
                                    result.push(val);
                                }
                            });

                            response(jQuery.map(parseAutoCompleteResultsByLimit(result, limit, false), function (item) {
                                return {
                                    label: __highlight(item, request.term.trim()),
                                    value: item.data
                                };
                            }));

                            foundInCache = true;
                            return;
                        }
                    });

                    if (foundInCache) return;

                    var ContentTypeEnum = {
                        None: "0",
                        Full: "1",
                        Recipe: "2",
                        Community: "3",
                        Article: "4",
                        MemberExclusive: "5",
                        RecipeGridView: "6",
                        RecipeListView: "7",
                        EasyMealFinder: "8",
                        Video: "9",
                        All: "1"
                    };
                    var searchResultTypeHiddenFieldID = document.getElementById("SearhResultTypeControlID").value;

                    if (jQuery("#" + searchResultTypeHiddenFieldID).val() == "") {
                        jQuery("#" + searchResultTypeHiddenFieldID).val(urlParams.st);
                    }
                    var contentType = "Recipe";
                    //alert(jQuery("#" + searchResultTypeHiddenFieldID).val());
                    switch (jQuery("#" + searchResultTypeHiddenFieldID).val()) {
                        case ContentTypeEnum.Recipe:
                            {
                                contentType = "Recipe";
                                break;
                            }
                        case ContentTypeEnum.Article:
                            {
                                contentType = "Article";
                                break;
                            }
                        case ContentTypeEnum.Video:
                            {
                                contentType = "Video";
                                break;
                            }
                        case ContentTypeEnum.Community:
                            {
                                contentType = "Community";
                                break;
                            }
                        case ContentTypeEnum.All:
                            {
                                contentType = "All";
                                break;
                            }
                    }

                    jQuery.ajax({
                        type: "Post",
                        url: "SearchHints.ashx?searchterm=" + term + "&contentType=" + contentType,
                        success: function (xmlResponse) {
                            cache[term] = xmlResponse;
                            element.data('autocompleteCache', cache);
                            response(jQuery.map(parseAutoCompleteResultsByLimit(xmlResponse, limit, false), function (item) {
                                return {
                                    label: __highlight(item, request.term.trim()),
                                    value: item.data
                                };
                            }))
                        },

                        error: function (request, status, errorThrown) 
                        {
////                            var errMsgs = errorMessages.split('|');
////                            if (request.status == 0) {
////                                alert(errMsgs[0]); //'Network error'
////                            } else if (request.status == 404) {
////                                alert(errMsgs[1]); //'404 Page not found'
////                            } else if (request.status == 500) {
////                                // assume msft brings error page back with a useful title
////                                var titleMatch = /(.*?)<\/title>/.exec(request.responseText);
////                                var titleString = titleMatch ? titleMatch[1] : '';
////                                //alert(errMsgs[2] + titleString); //'Oops!\n\n500 Internal Server Error\n\n'
////                            } else if (status == 'parsererror') {
////                                alert(errMsgs[3]); //'Error.\nParsing JSON Request failed.'
////                            } else if (status == 'timeout') {
////                                alert(errMsgs[4]); //'Request Time out.'
////                            } else {
////                                //alert(errMsgs[5] + ' ' + request.status + ' ' + request.statusText + ' - ' + dataSource); //Unkown error:
////                            }
                        }
                    });
                },
                minLength: minChar
            }).data("autocomplete")._renderItem = function (div, item) {
                if ((item.label.indexOf('ul') > -1)) {
                    return jQuery(div).html(item.label);
                }
                else {
                    jQuery(".ui-autocomplete").css("display", "none");
                }
            };
            function __highlight(s, t) {
                var matcher = new RegExp("(" + jQuery.ui.autocomplete.escapeRegex(t) + ")", "ig");
                return s.value.replace(matcher, "$1");
            }
        });
    }
}

function parseAutoCompleteResultsByLimit(data, limit, isMultipleArray) {
    var items;
    if (isMultipleArray) {
        items = data[1];
    } else {
        items = data;
    }
    var parsed = [];
    if (limit == 0 || limit > items.length)
        limit = items.length;

    parsed[0] = {
        data: [items],
        value: items,
        result: [items]
    };
    return parsed;
}


function setWaterMarkText(controlName, WaterMarkText) {
    var autoCompleteTextBox = controlName.id;
    var textValue = document.getElementById(autoCompleteTextBox).value;
    if (textValue == WaterMarkText || textValue.length == 0) {
        document.getElementById(autoCompleteTextBox).value = WaterMarkText;
    }
}

function removeWaterMarkText(controlName, WaterMarkText) {
    var autoCompleteTextBox = controlName.id;    
    if (document.getElementById(autoCompleteTextBox).value == WaterMarkText) {
        document.getElementById(autoCompleteTextBox).value = "";
    }
}

//function to call search button onclick event
function OnClientSelectedIndexChanging(controlid) {

    var onclick = document.getElementById(controlid).getAttribute("href");
    eval(onclick);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
//added to fix url issue in serach hint
jQuery("li.search a").live("click", function () {
    var theUrl = jQuery(this).attr("href");
    var newUrl = theUrl.replace(/ /g, '%20');
    jQuery(this).attr("href", newUrl);
});