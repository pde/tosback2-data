var company_name = '';
var primary_sic = '';
var city = '';
var state = '';
 
// Demandbase Callback
function dbase_parse(data) {
if (! data) return '';
    try { // minor error handling
        company_name = data['company_name'] || 'N/A';
        primary_sic = data['primary_sic'] || 'N/A';
        city = data['city'] || 'N/A';
        state = data['state'] || 'N/A';
    } catch(e) { } // do nothing on error
}