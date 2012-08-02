function fireMarin(action) {
   
        var src;
        // Switch on page action
        switch (action) {
            case "BC_VideoPlayButton":
                // Activity Name for this tag is: BC_VideoPlayButton
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||eba_v526||||';
                break;
            case "Email_BC":
                // Activity Name for this tag is: Email_BC
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||email358||||';
                break;
            case "print_coupon_bc":
                // Activity Name for this tag is: print_coupon_bc
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||print882||||';
                break;
            case "print_recipe_bc":
                // Activity Name for this tag is: print_recipe_bc
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||print184||||';
                break;
            case "Save_BC":
                // Activity Name for this tag is: Save_BC
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||save771||||';
                break;
            case "search_bc":
                // Activity Name for this tag is: search_bc
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||searc369|||';
                break;
            case "Thankyou_BC":
                // Activity Name for this tag is: Thankyou_BC
                src = 'tracker.marinsm.com/tp?act=2&cid=613fk36341&trans=UTM:I||Core||||';
                break;
            case "Register_bc":
                // Activity Name for this tag is: Register
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||combined||||';
                break;
            case "view_recipe_bc":
                // Activity Name for this tag is: view_recipe_bc
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||revie595||||';
                break;
            case "add_list_bc":
                // Activity Name for this tag is: add_list_bc
                src = 'tracker.marinsm.com/tp?act=2&cid=6138as5057&trans= UTM:I||addli054||||';
                break;
            default:
                // JS Console error output (trackable in Firebug)
                console.log(action + ": Activity Not Found");
                throw (action + ": Activity not found");
        }
       
        var marinImage = new Image();
        marinImage.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + src;

        jQuery(document).ready(function () {
            jQuery('body').append(marinImage);
        });   
};


