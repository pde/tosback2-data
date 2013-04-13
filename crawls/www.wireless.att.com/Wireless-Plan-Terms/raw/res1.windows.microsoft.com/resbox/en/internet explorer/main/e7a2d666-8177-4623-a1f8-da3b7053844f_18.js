/*set up namespaces*/
if (typeof Ms == 'undefined') Ms = {};
if (typeof Ms.Wol == 'undefined') Ms.Wol = {};
if (typeof Ms.Wol.CP == 'undefined') Ms.Wol.CP = {};
if (typeof Ms.Wol.CP.Checkbox == 'undefined') Ms.Wol.CP.Checkbox = {};


$(document).ready(function () {


    // urlChecked and textChecked store values to be inserted if box is checked
    Ms.Wol.CP.Checkbox.urlChecked = $('.table_checkbox a.navigationLink').last().attr('href');
    Ms.Wol.CP.Checkbox.textChecked = $('.table_checkbox a.navigationLink').last().text();

    // allows for linked images within checkbox table - only the last navigation link is hidden
    // IE CSS (asset 732366) contains - table.table_checkbox a.checkboxHiddenLink { display: none; }
    $('.table_checkbox a.navigationLink').last().addClass('checkboxHiddenLink');

    // there must be a checked href, some checked text and a link within the button for the script to do anything. Otherwise no checkbox is added.
    if (Ms.Wol.CP.Checkbox.urlChecked != '' && Ms.Wol.CP.Checkbox.textChecked != '' && $('.table_checkbox').parents('div.heroDockInnerElem').find('span.btnBase').children('a').length == 1) {

        // add an id to the <a> tag that will change when the box is checked or unchecked
        $('.table_checkbox').parents('div.heroDockInnerElem').find('span.btnBase').children('a').attr('id', 'wol_dlBtn');

        // urlUnChecked and textUnChecked store values to be inserted if box is NOT checked
        Ms.Wol.CP.Checkbox.urlUnChecked = $('#wol_dlBtn').attr('href');
        Ms.Wol.CP.Checkbox.textUnChecked = $('#wol_dlBtn').text();

        // inject a checkbox into the DOM
        $('.table_checkbox .para').prepend('<input type=\'checkbox\' id=\'wol_chkBox\' tabindex=\'0\' />&nbsp;');

        // event handler for the click function of the new checkbox
        $('#wol_chkBox').click(function () {

            switch ($('#wol_chkBox').prop('checked')) {


                // use urlChecked and textChecked if the box is checked         
                case true:
                    $('#wol_dlBtn').attr('href', Ms.Wol.CP.Checkbox.urlChecked);
                    //$('#wol_dlBtn').text(Ms.Wol.CP.Checkbox.textChecked);
                    break;

                //use urlUnChecked and textUnChecked if the box is not checked             
                case false:
                    $('#wol_dlBtn').attr('href', Ms.Wol.CP.Checkbox.urlUnChecked);
                    //$('#wol_dlBtn').text(Ms.Wol.CP.Checkbox.textUnChecked);
                    break;
            }
        });


        // sets the initial state if the table has a 'default_checked' class
        if ($('table.default_checked').length == 1) {
            $('#wol_chkBox').click();
            $('#wol_dlBtn').attr('href', Ms.Wol.CP.Checkbox.urlChecked);
            //$('#wol_dlBtn').text(Ms.Wol.CP.Checkbox.textChecked);
        }
    }
});

