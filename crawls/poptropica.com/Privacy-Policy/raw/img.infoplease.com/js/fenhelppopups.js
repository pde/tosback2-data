function popUpHelp(url) {
agent = navigator.userAgent;
windowName = "moduleWin";
params = "";
params += "toolbar=1,";
params += "location=0,";
params += "directories=0,";
params += "status=0,";
params += "border=0,";
params += "menubar=0,";
params += "scrollbars=1,";
params += "resizable=0,";
if (agent.indexOf("Netscape6")!= -1) {
params += "width=660,";
params += "height=481";
}
else if (agent.indexOf("MSIE")!= -1) {
 params += "width=600,";
 params += "height=481";
}
else if (agent.indexOf("Mozilla/4")!= -1) {
 params += "width=660,";
 params += "height=481";
}
else {
 params += "width=600,";
 params += "height=481";
}
win = window.open(url, windowName , params);
 if (agent.indexOf ("Mozilla/2") != -1 && agent.indexOf("Win") == -1) {
 win = window.open(url, windowName , params);
}
if (!win.opener) { win.opener = window; }
else {win.focus();}
}

function openWindow(url,winname,toolbar,location,directories,status,border,menubar,scrollbars,resizable,ns6width,ns6height,iewidth,ieheight,ns4width,ns4height,width,height,top,left) {
agent = navigator.userAgent;
// names current window "parentwindow"
self.name = "parentwindow";
windowName = "PopUpWindow";
// set default attributes to false
if (toolbar=='') {toolbar=0}; 
if (location=='') {location=0};
if (directories=='') {directories=0};
if (status=='') {status=0};
if (border=='') {border=0};
if (menubar=='') {menubar=0};
if (scrollbars=='') {scrollbars=0};
if (resizable=='') {resizable=0};
if (ns6width=='') {ns6width=0};
if (ns6height=='') {ns6height=0};
if (iewidth=='') {iewidth=0};
if (ieheight=='') {ieheight=0};
if (ns4width=='') {ns4width=0};
if (ns4height=='') {ns4height=0};
if (width=='') {width=0};
if (height=='') {height=0};
if (top=='') {top=0};
if (left=='') {left=0}; 
params = ""; 
params += "toolbar="+toolbar+",";
params += "location="+location+",";
params += "directories="+directories+",";
params += "status="+status+",";
params += "border="+border+",";
params += "menubar="+menubar+",";
params += "scrollbars="+scrollbars+",";
params += "resizable="+resizable+",";
if (agent.indexOf("Netscape6")!= -1) {
params += "screenX="+left+",";
params += "screenY="+top+",";
params += "width="+ns6width+",";
params += "height="+ns6height;
}
else if (agent.indexOf("MSIE")!= -1) {
params += "left="+left+",";
params += "top="+top+",";
params += "width="+iewidth+",";
params += "height="+ieheight;
}
else if (agent.indexOf("Mozilla/4")!= -1) {
params += "screenX="+left+",";
params += "screenY="+top+",";
params += "width="+ns4width+",";
params += "height="+ns4height;
}
else { 
params += "left="+left+",";
params += "top="+top+",";
params += "width="+width+",";
params += "height="+height;
}
LNwin = window.open(url, winname , params);
if (agent.indexOf("Mozilla/2") != -1 && agent.indexOf("Win") == -1) {
LNwin = window.open(url, windowName , params);
}
if (!LNwin.opener) { LNwin.opener = window; } 
else {LNwin.focus();} 
} 