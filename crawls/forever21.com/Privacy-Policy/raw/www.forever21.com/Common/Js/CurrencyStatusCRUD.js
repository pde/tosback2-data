<!--
    function fn_RefreshCurrenct(response) {
        if(response.value)
            document.getElementById('imgCurrency').src = SiteImagePath +'/menu/currency_'+response.value+'.gif';

        document.getElementById('imgCurrency').style.cursor = 'default';
        document.getElementById('imgCurrency').style.display = 'block';
    } 

    function fn_CurrenctDispalyAjax() {
        //F21Commerce.WebCore.UKBasePage.GetNowCurrencyType(fn_RefreshCurrenct); 
    }

    function fn_ShowCurrencyList() {

    }

    function fn_CloseCurrencyList() {
        if (document.getElementById('dvCurrencyDesign')) {
            document.getElementById('dvCurrencyDesign').style.display = 'none';
        }
    }

    function fn_UpdateCurrencyAjax(currencyType) {
        F21Commerce.WebCore.UKBasePage.UpdateCurrency(currencyType);
        fn_CurrenctDispalyAjax();
        fn_ChangeCurrency();
    }

    function fn_ChangeCurrency(language) {
        showPopWin(AppPath+'/Common/CurrencyLoading.htm', 60, 60, null, 'center');
        document.getElementById('popCloseBox').style.display = "none";
    
        var url = AppPath+'/Ajax/SetCurrency.aspx';
        var xmlHttpCurrency = new XMLHttpRequest();
        xmlHttpCurrency.open('get', url, true);

        xmlHttpCurrency.onreadystatechange = function () 
        {
            if (xmlHttpCurrency.readyState == 4) {
                if (xmlHttpCurrency.status == 200) {
                    var response = xmlHttpCurrency.responseText;
                }
            }

            setTimeout('location.href=location.href;', 2300);
        }
    
        xmlHttpCurrency.send(null);
    }

    /************************************************************************/
    function fn_GetServerName(response) {
        //document.getElementById('spServerName').innerHTML = '<font color="#b4b4b3"><br>' + response.value.toString().replace('.forever21.com', '').replace('euecom', '') + '</font>';
    }

    function fn_RunGetServerNameAjax() {
        //F21Commerce.WebCore.UKBasePage.GetServerName(fn_GetServerName); 
    }
    /************************************************************************/
//-->