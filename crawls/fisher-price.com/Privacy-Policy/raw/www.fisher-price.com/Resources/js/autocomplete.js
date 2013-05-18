//var url = "js/autocomplete.txt?st=10&e=autocompletesearch&autocomplete=true&N=0&timer=false&Dp=10&Nty=1";
var url = localInfo + "/Search/GetSearchSuggestions";
$("input#keyword_box").autocomplete(url,
       { minChars: 2,
           delay: 0, //time in ms before it triggers
           scroll: false, //will show scrollbars              
           selectFirst: false,
           max: 10, // number of items to show in dropdown
           formatItem: function (row) {
               var items = row[0].split(","); //Dimension Id

               //category descriptin can have ",". Combine the category description together.
               var itemDescription = "";
               for (var i = 1; i < items.length; i++) {
                   itemDescription = itemDescription + items[i] + ",";
               }
               //remove the trailing ","
               if (itemDescription.charAt(itemDescription.length - 1) == ",") {
                   itemDescription = itemDescription.substring(0, itemDescription.length - 1);
               }

               var itemclass = (row[1] % 2 == 0) ? "ac_even" : "ac_odd";
               //return "<li id=\"" + items[0] + "\">" + itemDescription + "</li>";
               return "<li onclick = serachPage('" + items[0] + "') class=\"" + itemclass + "\" id=\"" + items[0] + "\">" + itemDescription + "</li>";

           }
       });


function getSearchString() {
        getSearchString_Intl('#keyword_box');
}

function getSearchString_Intl(inputFieldId) {
    var searchString = encodeURIComponent($(inputFieldId).val());
    if ((searchString !== "Search all of fisher-price.com") && ($(inputFieldId).val() !== "")) {
            window.location.href = localInfo + "/searchresult.html?N=0&Ntk=Products&Ntx=mode+matchallany&type=keyword&Ntt=" + searchString;
    }
    if ($(inputFieldId).val() === "" || $(inputFieldId).val() === 'Search all of fisher-price.com') {
        $(inputFieldId).val("Enter keyword or item #")
        $(inputFieldId).removeClass("ac_input").addClass("ac_input error");
        return false;
    }
}

function serachPage(liID) {
    var id = "#" + liID;
        window.location.href = localInfo + "/searchresult.html?N=" + liID + "&Ntk=Products&Ntx=mode+matchallany&type=keyword&Nty=1";
};

$('#keywordsearch').keyup(function (event) {
    if (event.which === 13) {
        getSearchString();
    };
});
