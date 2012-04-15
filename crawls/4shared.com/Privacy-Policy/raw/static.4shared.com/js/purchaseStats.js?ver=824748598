/**
 * Created by IntelliJ IDEA.
 * User: tinedel
 * Date: 11/15/11
 * Time: 11:21 AM
 * To change this template use File | Settings | File Templates.
 */

function PurchaseStats() {
    return this;
}

PurchaseStats.registerShow = function (ppVisited) {
    $.post("/rest/purchase/stats/show", {ppVisited: ppVisited},
            function (data) {

            }, "json");
};

PurchaseStats.registerClick = function (ppVisited) {
    $.post("/rest/purchase/stats/click", {ppVisited: ppVisited},
            function (data) {

            }, "json");
};