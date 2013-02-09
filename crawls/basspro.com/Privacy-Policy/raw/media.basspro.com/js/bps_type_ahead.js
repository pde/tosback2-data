//This js has all the front end logic for type ahead

var typeAheadEnabled = true;

var lastSearch = "";
//This method creates the typeahead popup
function typeAheadResults(textValue,event, storeId, langId, catalogId)
{
  if(event.keyCode == 27) {
    $('#type-ahead-container').css("display", "none");
  }
  var searchText = textValue.value;
  searchText = searchText.toLowerCase();
  // Remove special characters from search text and make sure its length is between 3 to 20 characters
  searchText = searchText.replace(/[^a-zA-Z0-9\s]+/g,'');
  searchText = searchText.replace(/^\s*/, '').replace(/\s*$/, '');
  if(!(searchText == lastSearch)) {
    if(searchText.length >= 3 && searchText.length <= 20) {
      var ajaxOptions = {
        type: "POST",
        url: "/webapp/wcs/stores/servlet/AjaxBPSTypeAheadSearchCmd",
        dataType: "json",
        data: "storeId="+storeId+"&langId="+langId+"&catalogId="+catalogId+"&searchTerm="+searchText,

        beforeSend: function() {
          $('#type-ahead-container').css("display", "none");
        },

        success: function(json) {
          var successResp = json.JSON;
          var errorResp = json.JSONError;
          if(successResp != null){
            var catHtml = "";
            var categoriesFullHtml = "";
            var brandHtml = "";
            var brandsFullHtml = "";
            var typAheadTotalHtml = "";
            $.each(successResp, function(i) {
              if(i == 'Category') {
                $.each(this, function(k, v) {
                  $.each(this, function(a, b) {
                    var cat = a.replace(/[{}"]+/g,'');
                      var category = cat.split(':');
                      if(b == null || b == ''){
                        catHtml = catHtml + "<li><a href='/"+category[0].replace(/[']+/g,'')+"/_/"+category[1]+"' title='"+category[0]+"'>"+category[0]+"</a></li>";
                      } else {
                        var subCatHtml = "";
                        catHtml = catHtml + "<li><a href='/"+category[0].replace(/[']+/g,'')+"/_/"+category[1]+"' title='"+category[0]+"'>"+category[0]+"</a><ul>";
                        $.each(this, function(x, y) {
                          $.each(this, function(c, d) {
                            subCatHtml = subCatHtml + "<li><a href='/"+category[0].replace(/[']+/g,'')+"/_/"+category[1]+"' title='"+c+"'>in "+c+"</a></li>";
                          });
                        });
                        catHtml = catHtml + subCatHtml + "</ul></li>";
                      }
                   });
                  });
                  if(catHtml != "") {
                    categoriesFullHtml = "<div id='type-ahead-container-category' class='section category'><p class='header'>Shop by Category</p><p><ul id='type-ahead-categories'>" + catHtml + "</ul></p></div>";
                  }
                }
              if(i == 'Brand') {
                $.each(this, function(k, v) {
                  $.each(this, function(x, y) {
                    brandHtml = brandHtml + "<li><a href='/"+x.replace(/[']+/g,'')+"/_/"+y+"' title='"+x+"'>"+x+"</a></li>";
                  });
                });
                if(brandHtml != "") {
                  brandsFullHtml = "<div id='type-ahead-container-brand' class='section brand'><p class='header'>Shop by Brand</p><p><ul id='type-ahead-brands'>" + brandHtml + "</ul></p></div>";
                }
              }
            });
            typAheadTotalHtml = categoriesFullHtml + brandsFullHtml;
            if(typAheadTotalHtml != "") {
              $('#type-ahead-container').css("display", "block");
              $('#type-ahead-container').html(typAheadTotalHtml);
            }
          } else if(errorResp != null) {
            $('#type-ahead-container').css("display", "none");
          }
        },
      };
    $.ajax(ajaxOptions);
    } else {
      $('#type-ahead-container').css("display", "none");
    }
  }
  lastSearch = searchText;
}
