// Opens a pop-up when the function is called.
function openPopUp(url, navStatus, name, height, width){
    //Opens the popup window.
    var newwindow;
    newwindow = window.open(url, name, 'height=' + height + ',width=' + width + ',scrollbars=' + navStatus + ',toolbar=' + navStatus + ',menubar=' + navStatus + ',status=yes');
}

function getXmlHttpRequestObject(){
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest(); //Not IE	
    }
    else 
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP"); //IE	
        }
        else {
            alert("Your browser doesn't support the XmlHttpRequest object.  Better upgrade to Firefox.");
        }
}

// Makes ajax call
function ajaxCall(url){

    var xmlHttpReq = getXmlHttpRequestObject();
    xmlHttpReq.onreadystatechange = function(){
        if (xmlHttpReq.readyState == 4) {
        }
    };
    var d = new Date();
    url += "&r=" + d.getTime();
    xmlHttpReq.open('GET', url, true);
    xmlHttpReq.send(null);
}

// Page level tagging. It fires ajax calls to jave request footprint. 
function VSPageTagging(){
    var VsPageInfo = new VsPage();
    Pg_Tag_url = getPageTaggingParameters(VsPageInfo);
    Pg_Tag_url = "/assets/img/visualscience/vs_img.gif" + Pg_Tag_url;
    ajaxCall(Pg_Tag_url);
}

//Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getPageTaggingParameters(VsPageInfo){

    Pg_Tag_url = "?log=" + VsPageInfo.log +
    "&System=" +
    VsPageInfo.system +
    "&LOB=" +
    VsPageInfo.lobId +
    "&TestCell=" +
    VsPageInfo.testCell +
    "&Segment=" +
    VsPageInfo.segment +
    "&Experience=" +
    VsPageInfo.experience +
    "&PageName=" +
    VsPageInfo.pageViewName +
    "&PageType=" +
    VsPageInfo.pageType +
    "&Layout=" +
    VsPageInfo.layout +
    "&EventType=page";
    
    return Pg_Tag_url;
}

function popup(url, navStatus, size){
    //Opens the popup window.
    var height = 400;
    var width = 450;
    if (size == "BIG") {
        height = 600;
        width = 450;
    }
    
    if (url.indexOf('?' != -1)) {
        url = url.replace("?", "?popUp=true&");
    }
    else {
        url = url + "?popUp=true";
    }
    
    var newwindow = window.open(url, '', 'height=' + height + ',width=' + width +
    ',scrollbars=yes' +
    ',toolbar=' +
    navStatus +
    ', menubar=' +
    navStatus +
    ',status=no');
}

//Populates the parameters to be passed for Page Tagging and returns in the form of a url.
function getComponentTaggingParameters(VsPageInfo){

    //Retrieving the Page Context. 	
    var page = bea.wlp.disc.context.Page.findByLabel(VsPageInfo.pageLabel);
    
    //Retriving the LOB name from the Page Context.
    var lob = VsPageInfo.lobId;
    
    //Retriving the Portlets Information from Page Context
    var placables = page.getPlaceables();
    
    //Retriving the page's Layout Information.	
    
    var temp = VsPageInfo.portlet;
    var index = temp.indexOf('_');
    
    var portletLocation = temp.substring(0, index);
    var portletTitle = temp.substring(index + 1);
    
    Cmpt_Tag_url = "?log=1" +
    "&LOB=" +
    lob +
    "&TestCell=" +
    VsPageInfo.testCell +
    "&PageName=" +
    VsPageInfo.pageViewName +
    "&Segment=" +
    VsPageInfo.segment +
    "&PortletLocation=" +
    portletLocation +
    "&ComponentName=" +
    portletTitle +
    "&EventType=component";
    
    if (VsPageInfo.strategy != 'null' && VsPageInfo.strategy != '') {
        Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentStrategy=" + VsPageInfo.strategy;
    }
    
    if (VsPageInfo.cmptTestCell != 'null' && VsPageInfo.cmptTestCell != '') {
        Cmpt_Tag_url = Cmpt_Tag_url + "&ComponentTestCell=" + VsPageInfo.cmptTestCell;
    }
    return Cmpt_Tag_url;
}

//Retrieves the link Tagging parameters from request 
function getLinkTaggingParameters(VsLinkInfo){
    var link_Tag_url;
    if (VsLinkInfo.lobId != 'null' && VsLinkInfo.lobId != '') {
    
        link_Tag_url = "&LOB=" + VsLinkInfo.lobId +
        "&Segment=" +
        VsLinkInfo.Segment +
        "&TestCell=" +
        VsLinkInfo.TestCell +
        "&PageName=" +
        VsLinkInfo.PageName +
        "&EventType=" +
        VsLinkInfo.EventType +
        "&ComponentType=" +
        VsLinkInfo.ComponentType +
        "&ContentElement=" +
        VsLinkInfo.ContentElement +
        "&TargetPageName=" +
        VsLinkInfo.TargetPageName;
        
        if (VsLinkInfo.PortletLocation != 'null' && VsLinkInfo.PortletLocation != '') {
            link_Tag_url = link_Tag_url + "&PortletLocation=" + VsLinkInfo.PortletLocation;
        }
        if (VsLinkInfo.ComponentName != 'null' && VsLinkInfo.ComponentName != '') {
            link_Tag_url = link_Tag_url + "&ComponentName=" + VsLinkInfo.ComponentName;
        }
        if (VsLinkInfo.ComponentStrategy != 'null' && VsLinkInfo.ComponentStrategy != '') {
            link_Tag_url = link_Tag_url + "&ComponentStrategy=" + VsLinkInfo.ComponentStrategy;
        }
        if (VsLinkInfo.ComponentTestCell != 'null' && VsLinkInfo.ComponentTestCell != '') {
            link_Tag_url = link_Tag_url + "&ComponentTestCell=" + VsLinkInfo.ComponentTestCell;
        }
        if (VsLinkInfo.TargetLOB != 'null' && VsLinkInfo.TargetLOB != '') {
            link_Tag_url = link_Tag_url + "&TargetLOB=" + VsLinkInfo.TargetLOB;
        }
    }
    return link_Tag_url;
}


//function to be called for tagging modal windows.
function modalTagging(){
    //Retrieving pageLabel,pageId,pageType from request.
    var Pg_Tag_url = null;
    var pgLbel = "${requestScope.pageDef_Label}";
    var pageId = "${requestScope.pageid}";
    var pageType = "${requestScope.pageType}";
    
    //Making a call to the tagging javascript to tag the parameters for the pop-up window.	
    Pg_Tag_url = getPageTaggingParameters(pgLbel, pageId, pageType);
    Pg_Tag_url = "${pageContext.request.contextPath}" + Pg_Tag_url;
    
    //Making ajax call to hit the webserver.
    var xmlHttpReq = new bea.wlp.disc.io.XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function(){
        if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
                var data = eval('(' + xmlHttpReq.responseText.toString() + ')');
            }
            else {
            }
        }
    };
    xmlHttpReq.open('GET', Pg_Tag_url, true);
    xmlHttpReq.send(null);
}