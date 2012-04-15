var myWindows = new Array();
function imageSwap(whichImage, toWhichImage){
if (document.images!= null)
{ document.images[whichImage].src = eval(toWhichImage); }	
}
function showSelected() {
var value = document.showSelect.showList.options[document.showSelect.showList.selectedIndex].value;
window.location.href=value;
}
function openWin(html, name, width, height, scroll) {
if (width == '')
var width = 350;
if (height == '')
var height = 650;
myWindows[myWindows.length] = open( html, name, 'width='+width+',height='+height+',status=no,scrollbars='+scroll+',resizable=yes,location=no,toolbar=no');
}
function openFooterWin(path, width, height) {
window.open(path, 'PopupWin', 'width='+width+',height='+height+',resizable=yes,scrollbars=auto,location=no,toolbar=no,status=no');
}
