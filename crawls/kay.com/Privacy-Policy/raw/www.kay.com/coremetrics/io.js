//
// initialize cookies
//
var group_id      = [20];                           // random number between 0 and 99 inclusive - used for ab test group
var products      = [];                             // products (most recently viewed first)
var categories    = [];                             // categories (most recently viewed first)
var brands        = [];                             // brands (most recently viewed first)
var p_viewed      = [];                             // products viewed
var p_carted      = [];                             // products carted
var p_purchased   = [];                             // products purchased
var c_viewed      = [];                             // categories viewed
var c_n_views     = [];                             // categories number viewed
var b_viewed      = [];                             // brands viewed
var b_n_views     = [];                             // brands number viewed

var a_arrays = [];

arrays = [p_viewed.join(),p_carted.join(),p_purchased.join(),c_viewed.join(),c_n_views.join(),b_viewed.join(),b_n_views.join()];
var cookie_value = [group_id.join(), products.join('~'), categories.join('~'), brands.join('~'), arrays.join('|')].join('~|~'); 

IORequest.set_and_check_cookie(IORequest.state_cookie, cookie_value);
cmCreatePageviewTag('Home Page', '', '', '', cm_ClientID);

