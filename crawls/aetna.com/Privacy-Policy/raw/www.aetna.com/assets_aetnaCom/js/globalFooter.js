function autoCopyright() { // v.aetna2010
AetnaCom_fulldate=new Date();
AetnaCom_autoupdateyear=AetnaCom_fulldate.getFullYear();
document.write('Copyright &copy; 2001-');
document.write(AetnaCom_autoupdateyear);
document.write('&nbsp;Aetna Inc.');
}

function globalFooterCopy() { // v.aetna2010
document.write("<div class='footerCopy'>");
autoCopyright();
document.write("</div>");
}


globalFooterCopy();

