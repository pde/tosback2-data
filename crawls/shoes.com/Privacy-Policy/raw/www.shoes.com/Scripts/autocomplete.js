var AutoComplete = {
    initialize: function() {
        $('#Ntt').autocomplete("/WebServices/AutoComplete.ashx", { dataType:'text' });
    }
}

$(document).ready(AutoComplete.initialize);

