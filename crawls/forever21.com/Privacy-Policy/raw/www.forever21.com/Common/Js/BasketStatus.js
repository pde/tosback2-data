//현재 바스켓 상태를 보여준다.
function fnGetBasketStatus() {
    var url = AppPath+'/Ajax/GetBasketStatus.aspx';
    var xmlHttpGetBasket = new XMLHttpRequest();
    xmlHttpGetBasket.open('get', url, true);
    xmlHttpGetBasket.onreadystatechange = function () {

        if (xmlHttpGetBasket.readyState == 4) {
            if (xmlHttpGetBasket.status == 200) {
                var response = xmlHttpGetBasket.responseText;
                document.getElementById(haveBasketID).innerHTML = '<a href="'+AppPath+'/Product/Basket.aspx?br=f21" class="item">' + response.split('|')[0] + '</a></span>';
                document.getElementById(haveTotalID).innerHTML = formatCurrency(response.split('|')[2]).replace("$", response.split('|')[1]);
            }
        }
    }
    xmlHttpGetBasket.send(null);
}
