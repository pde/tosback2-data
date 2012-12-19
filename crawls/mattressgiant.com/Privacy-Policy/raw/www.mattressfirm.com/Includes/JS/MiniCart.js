function CloseWindow(Overlay, Root)
{
    var ctrlOverlay = document.getElementById(Overlay);
    ctrlOverlay .style.display = 'none';
    var ctrlRoot = document.getElementById(Root);        
    ctrlRoot.style.display = "none";
    return false;
}

function ChangeProfile(ctrl, altCtrl)
{
    var alt = document.getElementById(altCtrl);
    
    if (ctrl.src.indexOf('_unchecked') != -1)
    {
        ctrl.src = ctrl.src.replace('_unchecked', '_checked');
        alt.src = alt.src.replace('_checked', '_unchecked');
    }
    else
    {
        ctrl.src = ctrl.src.replace('_checked', '_unchecked');
        alt.src = alt.src.replace('_unchecked', '_checked');
    }
}

function CheckItem(ctrl)
{
    var cookieValue = getCookie();
    if(cookieValue == "True")
    {
        var imgAddToCart = document.getElementById(ctrl.id);
        var hidIsAdded = null;   
        
        for (var i = 0; i< imgAddToCart.parentNode.childNodes.length; i++)
        {
            var id = imgAddToCart.parentNode.childNodes[i].id;

            if (id != undefined && id.match("hidIsAdded") != null)
            {
                hidIsAdded = imgAddToCart.parentNode.childNodes[i];
            }    
        }
        if (imgAddToCart.src.indexOf("Check") > 0)
        {     
            if (!confirm("Click ok to remove this item from your cart."))
            {
                hidIsAdded.value = "1";
            }
            else
            {
                hidIsAdded.value = "0";
                imgAddToCart.src = imgAddToCart.src.replace("Check", "Lock");   
            }
        }
        else
        {
            imgAddToCart.src = imgAddToCart.src.replace("Lock", "Check");
            hidIsAdded.value = "1";
            CheckCart(ctrl);
        }
    }
    else
    {    
        var width = screen.width;
        if (width < 1000)
        {
            width = 1000;
        }
        var height = screen.height;
        if (height < 1500)
        {
            height = 1500;
        }
        
        var zcOverlay = document.getElementById('zcOverlay');
        zcOverlay.style.height = height + "px";
        zcOverlay.style.width = width + "px"; 

        zcOverlay.style.display = 'block';
        var ZipCodeRoot = document.getElementById("ZipCodeRoot");
        ZipCodeRoot.style.display = "block";
        return false;
    }
}

function getCookie() {
    var Value = "";

    c_name = "ZipCodeInService";
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            Value = unescape(document.cookie.substring(c_start, c_end));
        }
    }
    if (Value == "True") {
        c_name = "ProductAvailable";
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                Value = unescape(document.cookie.substring(c_start, c_end));
            }
        }
    }
    return Value;
}

function CheckBundleItem(ctrl) {
    var cookieValue = getCookie();
    //var isBundleInCart = BundleInCart();
    if (cookieValue == "True") {
        var imgAddToCart = document.getElementById(ctrl.id);
        var hidIsAdded = null;

            for (var i = 0; i < imgAddToCart.parentNode.childNodes.length; i++) {
                var id = imgAddToCart.parentNode.childNodes[i].id;

                if (id != undefined && id.match("hidIsAdded") != null) {
                    hidIsAdded = imgAddToCart.parentNode.childNodes[i];
                }
            }
            if (imgAddToCart.src.indexOf("Check") > 0) {
                if (!confirm("Click ok to remove this item from your cart.")) {
                    hidIsAdded.value = "1";
                }
                else {
                    hidIsAdded.value = "0";
                    imgAddToCart.src = imgAddToCart.src.replace("Check", "Lock");
                }
            }
            else {
                imgAddToCart.src = imgAddToCart.src.replace("Lock", "Check");
                hidIsAdded.value = "1";
            }
    }
    else {
        var width = screen.width;
        if (width < 1000) {
            width = 1000;
        }
        var height = screen.height;
        if (height < 1500) {
            height = 1500;
        }

        var zcOverlay = document.getElementById('zcOverlay');
        zcOverlay.style.height = height + "px";
        zcOverlay.style.width = width + "px";

        zcOverlay.style.display = 'block';
        var ZipCodeRoot = document.getElementById("ZipCodeRoot");
        ZipCodeRoot.style.display = "block";
        return false;
    }
}

/*function BundleInCart() {
    var Value = "";

    c_name = "IsBundleCart";
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            Value = unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return Value;
}*/



function CheckCart(ctrl)
{
    var imgAddToCart = document.getElementById(ctrl.id);
    var hidIsAdded = null;
    var hidVariationID = null;
    var hidName = null;
    var hidShowLow = null;
    
    for(var i = 0; i< imgAddToCart.parentNode.childNodes.length; i++)
    {
        var id = imgAddToCart.parentNode.childNodes[i].id;

        if (id != undefined && id.match("hidIsAdded") != null)
        {
            hidIsAdded = imgAddToCart.parentNode.childNodes[i];
        }        
        if (id != undefined && id.match("hidName") != null)
        {
            hidName = imgAddToCart.parentNode.childNodes[i];          
        }
        if (id != undefined && id.match("hidVariationID") != null)
        {
            hidVariationID = imgAddToCart.parentNode.childNodes[i];
        }
        if (id != undefined && id.match("hidShowLow") != null)
        {
            hidShowLow = imgAddToCart.parentNode.childNodes[i];
        }
    }
    
    if (imgAddToCart.src.indexOf("Check") > 0)
    {
        var mcRow3 = document.getElementById('mcRow3');
        if (hidShowLow.value == "1")
        {
            mcRow3.style.display = 'block';
            document.getElementById('mcRight').style.height = '350px';
            document.getElementById('mcLeft').style.height = '350px';
            document.getElementById('mcContent').style.height = '350px';
        }
        else
        {
            mcRow3.style.display = 'none';
            document.getElementById('mcRight').style.height = '230px';
            document.getElementById('mcLeft').style.height = '230px';
            document.getElementById('mcContent').style.height = '230px';
        }
        OpenMiniCart(hidVariationID.value, hidName.value);
    }
}

function OpenMiniCart(VariationID, ItemName)
{
    var lblMcSelected = document.getElementById('lblMcSelected');
    var hidID = document.getElementById('hidControlId');
    var hidMcSelected = document.getElementById(hidID.value);
    
    lblMcSelected.innerHTML = ItemName;
    hidMcSelected.value = VariationID;

    var width = screen.width;
    if (width < 1000)
    {
        width = 1000;
    }
    var height = screen.height;
    if (height < 1500)
    {
        height = 1500;
    }
    
    var mcOverlay = document.getElementById('mcOverlay');
    mcOverlay.style.height = height + "px";
    mcOverlay.style.width = width + "px";
    mcOverlay.style.display = 'block';
    var MiniCartRoot = document.getElementById("MiniCartRoot");        
    MiniCartRoot.style.display = "block";
    return false;
    
}