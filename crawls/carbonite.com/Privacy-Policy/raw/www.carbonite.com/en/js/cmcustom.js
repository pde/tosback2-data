cmSetupOther({"cm_FormPageID":true}); 
function cmCustomLinkClickHandler(e) 
{
 if (e.href.indexOf(".pdf") > -1) {
 cmCreateConversionEventTag(e.href,"2","PDFDOWNLOAD"); 
}
 if (e.href.indexOf("mailto:") > -1) {
 cmCreateConversionEventTag(e.href,"2","MAILTO LINK");
 }       
}