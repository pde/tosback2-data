// Shopper's Club 'eligibility' balloon scripts

function balloon_on(me,status) {  
    if (status == 'member') {
        document.getElementById('shoppers-club-balloon-msg').innerHTML='<div class="short">$2.99 Shipping&mdash;any order, all the time. Click for account information.</div>';
    } else if (status == 'joined') {
       document.getElementById('shoppers-club-balloon-msg').innerHTML='<div class="short">You&quot;ve already joined! You will receive $2.99 standard shipping on this order.</div>';
    }

    // find the position of the eligibility logo by
    // iterating through positions of parent containers
    var x_pos = 0; var y_pos = 0;
    var temp = document.getElementById(me);
    while(temp != null) {
        x_pos += temp.offsetLeft;
        y_pos += temp.offsetTop;
        temp = temp.offsetParent;
    }
    
    var sc_balloon = document.getElementById('shoppers-club-balloon');
    sc_balloon.style.left = x_pos + 'px';
    sc_balloon.style.top = y_pos + 'px';
    sc_balloon.style.display = 'block';
}

function balloon_off() {
    var sc_balloon = document.getElementById('shoppers-club-balloon').style.display = 'none';
}
    
    
// pop-up window with correct link for microsite
function shoppers_club() {
    var clubURL = '/ShoppersClub/ShoppersClub.aspx';
    if (typeof(_runningFromMicrosite) == "undefined") {
	    if (location.pathname.search(/ShoppersClub/) >= 0) {
	        window.location.href = clubURL + location.search;
	    }
	    else if(location.pathname.search("EmptyShoppingBag") >= 0){
	        window.location.href = clubURL + '?ReturnUrl=/Shopping_bag/ShoppingBag.aspx';
	    }
	    else {
		    window.location.href = clubURL + '?ReturnUrl=' + escape(location.pathname+location.search);
		}    
	} else {
	    window.location.href= BaseURL + clubURL + '?ReturnUrl=' + escape(location.href+location.search);
	}
    void(0);
}

function shoppers_clubMember() {
    var clubURL = '/ShoppersClub/ShoppersClub.aspx?User=Member';
    if (typeof (_runningFromMicrosite) == "undefined") {

        if (location.pathname.search(/ShoppersClub/) >= 0) {
            window.location.href = clubURL + location.search;
        }
        else if (location.pathname.search("EmptyShoppingBag") >= 0) {
            window.location.href = clubURL + '&ReturnUrl=/Shopping_bag/ShoppingBag.aspx';
        }
        else {
            window.location.href = clubURL + '&ReturnUrl=' + escape(location.pathname + location.search);
        }
    } else {
        window.location.href = BaseURL + clubURL + '&ReturnUrl=' + escape(location.href + location.search);
    }
    void (0);
}
