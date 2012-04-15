/* ******************************************************************************************************************
 *  Encapsulation of "static" Yahoo paramters NOT returned by CDS tag                                               *
 *                                                                                                                  *
 ********************************************************************************************************************/
function YahooAdsObjectCDS(slotsValue, containertypeValue, addelivermodeValue, adformatlistValue, admarkerValue,
                           contentlanguageValue, countryValue, customsectionValue, disablecontentsendValue,
                           requesttypeValue, reportingTagValue){

    //"STATIC" PARAMTERS ONLY (PASSED VIA JS CALL OR HAVE DEFAULT; THE REST ARE GRABBED VIA THE CDS TAG CALL)

    this.slots = slotsValue;                                         /* slots could be inventoryIDs  TBD            */

    this.containertype= containertypeValue;                          /* yld_mgr.container_type       :  recommended */
    this.requesttype = requesttypeValue;                             /* yld_mgr.request_type         :  required    */
    this.addeliverymode = addelivermodeValue;                        /* yld_mgr.ad_delivery_mode     :  conditional */

    this.adformatlist = adformatlistValue;                           /* yld_mgr.ad_format_list       :  conditional */
    this.admarker = admarkerValue;                                   /* yld_mgr.ad_marker            :  optional    */
    this.contentlanguage =  contentlanguageValue;                    /* yld_mgr.content_lang         :  optional    */
    this.country = countryValue;                                     /* yld_mgr.user_country         :  optional    */
    this.customsection = customsectionValue;                         /* yld_mgr.cstm_sctn_list       :  optional    */
    this.disablecontentsend = disablecontentsendValue;               /* yld_mgr.disable_content_send :  optional    */
    this.reportingtag = reportingTagValue;                           /* yld_mgr.reporting_tag_list   :  optional    */

    this.getSlots = function(){
        return this.slots;
    };
    this.setSlots = function(slotsValue){
        this.slots =slotsValue;
    };
    this.getContainerType = function(){
        return this.containertype;
    };
    this.setContainerType = function(containertypeValue){
        this.containertype =containertypeValue;
    };
    this.getRequestType = function(){
        return this.requestType;
    };
    this.setRequestType = function(requesttypeValue){
        this.requestType =requesttypeValue;
    };
    this.getAdFormatList = function(){
        return this.adformatlist;
    };
    this.setAdFormatList = function(adformatlistValue){
        this.adformatlist =adformatlistValue;
    };
    this.getAdMarker = function(){
        return this.admarker;
    };
    this.setAdMarker = function(admarkerValue){
        this.admarker =admarkerValue;
    };
    this.getContentLanguage = function(){
        return this.contentlanguage;
    };
    this.setContentLanguage = function(contentlanguageValue){
        this.contentlanguage =contentlanguageValue;
    };
    this.getCountry = function(){
        return this.country;
    };
    this.setCountry = function(countryValue){
        this.country =countryValue;
    };
    this.getCustomSection = function(){
        return this.customsection;
    };
    this.setCustomSection = function(customsectionValue){
        this.customsection =customsectionValue;
    };
    this.getDisableContentSend = function(){
        return this.disablecontentsend;
    };
    this.setDisableContentSend = function(disablecontentsendValue){
        this.disablecontentsend =disablecontentsendValue;
    };
    this.getAdDeliveryMode = function(){
        return this.addeliverymode;
    };
    this.setAdDeliveryMode = function(addeliverymodeValue){
        this.addeliverymode =addeliverymodeValue;
    };
    this.getReportingTagList = function(){
        return this.reportingtag;
    };
    this.setReportingTagList = function(reportingTagValue){
        this.reportingtag =reportingTagValue;
    };
}