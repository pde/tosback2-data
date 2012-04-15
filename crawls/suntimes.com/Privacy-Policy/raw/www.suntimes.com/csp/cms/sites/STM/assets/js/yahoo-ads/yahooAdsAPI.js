/* ******************************************************************************************************************
 *  Yahoo Ads API                                                                                                    *
 *                                                                                                                   *
 ********************************************************************************************************************/
var pubidJSON;
var sitenameJSON;
var topicsJSON;
var categoriesJSON;
var contenttypeJSON;
var enableJSON;


//Defines the size of each slot position
var slotPosition =[];
slotPosition["OneByTwo"]=["100x100"];
slotPosition["Top1Right"]=["234x60"];
slotPosition["Top1"]=["728x90"];
slotPosition["Top2"] = ["950x30"];
slotPosition["Top3"] =["950x250"];
slotPosition["TopLeft"]=["120x90"];
slotPosition["Left1"] = ["120x600"];
slotPosition["Bottom"] = ["728x90"];
slotPosition["TopRight"]=["300x250"];
slotPosition["Middle"]=["300x250"];
slotPosition["Middle2"] =["300x250"];
slotPosition["Middle3"] =["300x250"];
slotPosition["x01"] = ["160x90"];
slotPosition["x02"] = ["160x90"];
slotPosition["x03"] = ["160x90"];
slotPosition["x04"]=["160x600"];
slotPosition["iPhone"] =["318x60"];
slotPosition["Frame1"] = ["720x300"];
slotPosition["Frame2"] =["800x600"];
slotPosition["OneByOne"] =["1x1"];
slotPosition["PromoRight"] =["300x100"];
slotPosition["PromoBottom"] =["336x280"];
slotPosition["IWantItCube"] =["180x150"];
slotPosition["NavAd"] =["160x30"];





//Monster Top Job Ad Slots
slotPosition["mon01"]=["300x200"]; //For now this will be its own unique size
slotPosition["mon02"]=["168x28"];
slotPosition["mon03"]=["168x28"];
slotPosition["mon04"]=["168x28"];
slotPosition["mon05"]=["168x28"];
slotPosition["mon06"]=["168x28"];
slotPosition["mon07"]=["168x28"];
slotPosition["mon08"]=["168x28"];
slotPosition["mon09"]=["168x28"];
slotPosition["mon10"]=["168x28"];
slotPosition["mon11"]=["168x28"];
slotPosition["mon12"]=["168x28"];
slotPosition["mon13"]=["168x28"];
slotPosition["mon14"]=["168x28"];
slotPosition["mon15"]=["168x28"];


//Define Delivery Mode
var slotDelivery =[];
slotDelivery["OneByTwo"]=["ipatf"];
slotDelivery["Top1Right"]=["ipatf"];
slotDelivery["Top1"]=["ipatf"];
slotDelivery["Top2"] = ["ipatf"];
slotDelivery["Top3"] = ["ipatf"];
slotDelivery["TopLeft"]=["ipatf"];
slotDelivery["Left1"] = ["ipbtf"];
slotDelivery["Bottom"] = ["ipbtf"];
slotDelivery["TopRight"]=["ipatf"];
slotDelivery["Middle"]=["ipbtf"];
slotDelivery["Middle2"]=["ipstf"];
slotDelivery["Middle3"]=["ipstf"];
slotDelivery["x01"]=["ipbtf"];
slotDelivery["x02"] = ["ipbtf"];
slotDelivery["x03"] = ["ipbtf"];
slotDelivery["x04"] = ["ipbtf"];
slotPosition["iPhone"] =["ipatf"];
slotDelivery["Frame1"] = ["ipatf"];
slotDelivery["Frame2"] =["ipatf"];
slotDelivery["OneByOne"] =["ipatf"];
slotDelivery["PromoRight"]=["ipatf"];
slotDelivery["PromoBottom"]=["ipbtf"];
slotDelivery["IWantItCube"] =["ipatf"];
slotDelivery["NavAd"] =["ipbtf"];



//Monster Top Job Ad Slots
slotDelivery["mon01"]=["ipbtf"];
slotDelivery["mon02"]=["ipbtf"];
slotDelivery["mon03"]=["ipbtf"];
slotDelivery["mon04"]=["ipbtf"];
slotDelivery["mon05"]=["ipbtf"];
slotDelivery["mon06"]=["ipbtf"];
slotDelivery["mon07"]=["ipbtf"];
slotDelivery["mon08"]=["ipbtf"];
slotDelivery["mon09"]=["ipbtf"];
slotDelivery["mon10"]=["ipbtf"];
slotDelivery["mon11"]=["ipbtf"];
slotDelivery["mon12"]=["ipbtf"];
slotDelivery["mon13"]=["ipbtf"];
slotDelivery["mon14"]=["ipbtf"];
slotDelivery["mon15"]=["ipbtf"];


/******************************************************************************************************************
 * Use on standard CDS templates to dynamically grab channel specific ad data via tag call that returns json obj  *
 *                                                                                                                *
 * Basic usage within templates:   generateAdSlotsCDS(adObjectCDS, <content:section-ad-data/>);                   *
 * Overwite paramters available on yahooAdsObjectCDS:                                                             *
 *          -containertypeValue (default js),                                                                     *
 *          -requesttypeValue (default ac),                                                                       *
 *          -adformatlistValue,                                                                                   *
 *          -admarkerValue,                                                                                       *
 *          -contentlanguageValue,                                                                                *
 *          -countryValue,                                                                                        *
 *          -customsectionValue,                                                                                  *
 *          -disablecontentsendValue,                                                                             *
 * Overwrite paramters available through the tag call                                                             *
 *          -contentTopics                                                                                        *
 *          -contentType                                                                                          *
 *          -customContentCategory                                                                                *
 ******************************************************************************************************************/
function generateAdSlotsCDS(yahooAdsObjectCDS, json) {

    processJSON(json);

    if (enableJSON){

        //STATIC PARAMETERS:  NOT PASSED BY CDS TAG - SET VIA TEMPLATE CALL ONLY
        yld_mgr = {};
        yld_mgr.slots = {};

        if(yahooAdsObjectCDS.getContainerType()!=null){
            yld_mgr.container_type=yahooAdsObjectCDS.getContainerType();
        } else{
            yld_mgr.container_type="js";
        }
        if(yahooAdsObjectCDS.getRequestType()!=null){
            yld_mgr.request_type=yahooAdsObjectCDS.getRequestType();
        } else{
            yld_mgr.request_type="ac";
        }
        if(yahooAdsObjectCDS.getCustomSection()!=null){
            yld_mgr.cstm_sctn_list = [yahooAdsObjectCDS.getCustomSection()];
        } else{
            yld_mgr.cstm_sctn_list = ["Primary Front"];
        }
        if(yahooAdsObjectCDS.getAdFormatList()!=null){
            yld_mgr.ad_format_list = yahooAdsObjectCDS.getAdFormatList() ;
        }
        if(yahooAdsObjectCDS.getAdMarker()!=null){
            yld_mgr.ad_marker = yahooAdsObjectCDS.getAdMarker();
        }
        if(yahooAdsObjectCDS.getContentLanguage()!=null){
            yld_mgr.content_lang = yahooAdsObjectCDS.getContentLanguage();
        }
        if(yahooAdsObjectCDS.getCountry()!=null){
            yld_mgr.user_country =yahooAdsObjectCDS.getCountry();
        }
        if(yahooAdsObjectCDS.getDisableContentSend()!=null){
            yld_mgr.disable_content_send = yahooAdsObjectCDS.getDisableContentSend();
        }

        //SLOTS
        var slots = yahooAdsObjectCDS.getSlots();

        for (var i in slots) {
            var ysStarter = 'yld_mgr.slots.';
            var adDeliverMode ='.ad_delivery_mode';
            var adSizeList='.ad_size_list';
            var slotName = slots[i];
						var deliverMode = slotDelivery[slots[i]][0];
						
						/* if(yahooAdsObjectCDS.getAdDeliveryMode()!=null){
                deliverMode = "ipany";
            } else{
               deliverMode = yahooAdsObjectCDS.getAdDeliveryMode();
            } */
						
						eval(ysStarter+slotName+'= {}');
						eval(ysStarter+slotName+adDeliverMode+'='+'"'+deliverMode+'"')
						eval(ysStarter+slotName+adSizeList+'='+'["'+slotPosition[slotName]+'"]');

						//Custom Content Categories are passed by slot, not globally
						if(categoriesJSON !="unknown"){
							eval(ysStarter+slotName+'.cstm_content_cat_list = ["'+categoriesJSON+'"]');
	  	      }
						
        }

        //DYNAMIC PARAMTERS: RETURNED BY CDS TAG CALL AS A JSON OBJECT
        if(pubidJSON !=null){
            yld_mgr.pub_id=pubidJSON;
        }
        if(sitenameJSON !=null){
            yld_mgr.site_name=sitenameJSON;
        }
        if(topicsJSON !=null){
            yld_mgr.content_topic_id_list=[topicsJSON];
        }
        if(contenttypeJSON !=null){
            yld_mgr.content_type_list = contenttypeJSON;
        }
    }
}


/******************************************************************************************************************
 * Use on NON-CDS third party pages to generate required javascript to pass to Yahoo for ads generation           *
 *                                                                                                                *
 * Basic usage within templates:   generateAdSlotsCDS(adObject);                                                  *
 *                                                                                                                *
 * Overwite paramters available on yahooAdsObjectCDS:                                                             *
 *          -containertypeValue (default js),                                                                     *
 *          -requesttypeValue (default ac),                                                                       *
 *          -adformatlistValue,                                                                                   *
 *          -admarkerValue,                                                                                       *
 *          -contentlanguageValue,                                                                                *
 *          -countryValue,                                                                                        *
 *          -customsectionValue,                                                                                  *
 *          -disablecontentsendValue,                                                                             *
 *          -contentTopics                                                                                        *
 *          -contentType                                                                                          *
 *          -customContentCategory                                                                                *
 *          -pubId                                                                                                *
 *          -siteName                                                                                             *
 ******************************************************************************************************************/
function generateAdSlots(yahooAdsObject) {

    yld_mgr = {};
    yld_mgr.slots = {};

    if(yahooAdsObject.getContainerType()!=null){
        yld_mgr.container_type=yahooAdsObject.getContainerType();
    }else{
        yld_mgr.container_type="js";
    }
    if(yahooAdsObject.getRequestType()!=null){
        yld_mgr.request_type=yahooAdsObject.getRequestType();
    }else{
        yld_mgr.request_type="ac";
    }
    if(yahooAdsObject.getCustomSection()!=null){
        yld_mgr.cstm_sctn_list = [yahooAdsObject.getCustomSection()];
    }else{
        yld_mgr.cstm_sctn_list = ["Primary Front"];
    }

    if(yahooAdsObject.getAdFormatList()!=null){
        yld_mgr.ad_format_list = yahooAdsObject.getAdFormatList() ;
    }
    if(yahooAdsObject.getAdMarker()!=null){
        yld_mgr.ad_marker = yahooAdsObject.getAdMarker();
    }
    if(yahooAdsObject.getContentLanguage()!=null){
        yld_mgr.content_lang = yahooAdsObject.getContentLanguage();
    }
    if(yahooAdsObject.getCountry()!=null){
        yld_mgr.user_country =yahooAdsObject.getCountry();
    }
    if(yahooAdsObject.getDisableContentSend()!=null){
        yld_mgr.disable_content_send = yahooAdsObject.getDisableContentSend();
    }

    var slots = yahooAdsObject.getSlots();

    for (var i in slots) {
            var ysStarter = 'yld_mgr.slots.';
            var adDeliverMode ='.ad_delivery_mode';
            var adSizeList='.ad_size_list';
            var slotName = slots[i];
						var deliverMode = slotDelivery[slots[i]][0];

            /* if(yahooAdsObjectCDS.getAdDeliveryMode()!=null){
                deliverMode = "ipany";
            } else{
                deliverMode = yahooAdsObjectCDS.getAdDeliveryMode();
            } */

					eval(ysStarter+slotName+'= {}');
					eval(ysStarter+slotName+adDeliverMode+'='+'"'+deliverMode+'"')
					eval(ysStarter+slotName+adSizeList+'='+'["'+slotPosition[slotName]+'"]');
    }

    if(yahooAdsObject.getPubId()!=null){
        yld_mgr.pub_id=yahooAdsObject.getPubId();
    }
    if(yahooAdsObject.getSiteName()!=null){
        yld_mgr.site_name=yahooAdsObject.getSiteName();
    }
    if(yahooAdsObject.getTopics()!=null){
        yld_mgr.content_topic_id_list=yahooAdsObject.getTopics();
    }
    if(yahooAdsObject.getCategories()!=null){
        yld_mgr.custom_content_cat_list = yahooAdsObject.getCategories();
    }
    if(yahooAdsObject.getContentType()!=null){
        yld_mgr.content_type_list = yahooAdsObject.getContentType();
    }
}

/******************************************************************************************************************
 * Process JSON tag data                                                                                          *
 ******************************************************************************************************************/
function processJSON(myAd){
    if(myAd.pub_id!=null){
        pubidJSON =  myAd.pub_id;
    }
    if(myAd.site_name!=null){
        sitenameJSON = myAd.site_name;
    }
    if(myAd.content_topic_id_list!=null){
        topicsJSON = myAd.content_topic_id_list;
    }
    if(myAd.custom_content_cat_list !=null){
        categoriesJSON = myAd.custom_content_cat_list;
    }
    if(myAd.content_type_list !=null ){
        contenttypeJSON= myAd.content_type_list;
    }
    if(myAd.enable_ads !=null){
        enableJSON = myAd.enable_ads;
    }
    else{  //assume turn on for ads
        enableJSON = true;
    }
}

/******************************************************************************************************************
 * Use on NON-CDS third party pages to generate required javascript to pass to Yahoo for ads generation           *
 *                                                                                                                *
 * Basic usage within templates:   displayAdSlot("Middle");                                                       *
 ******************************************************************************************************************/
function displayAdSlot(slt) {
    yld_mgr.place_ad_here(slt);
}