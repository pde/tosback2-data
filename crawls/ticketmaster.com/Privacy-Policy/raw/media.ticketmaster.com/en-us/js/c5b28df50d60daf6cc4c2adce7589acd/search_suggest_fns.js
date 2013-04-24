function sendRequest(keyword) {
    if( $("search_input").value == keyword ) {
        search_suggest.autoComplete(keyword);
    }
}

function updateInputText(input) {
    if(input.value == '') {
        input.value = search_text;
        input.style.color = '#898989';
    } 
}

function change_placeholder_color(input_id, placeholder_txt) {
    var input = $(input_id);
    if (input.value == placeholder_txt) {
           input.addClassName("placeholder");
    } else {
           input.removeClassName("placeholder");
    }
}

function initHiddenParam() {
    $('search_id').name = "";
    $('search_id').value = "";
}
