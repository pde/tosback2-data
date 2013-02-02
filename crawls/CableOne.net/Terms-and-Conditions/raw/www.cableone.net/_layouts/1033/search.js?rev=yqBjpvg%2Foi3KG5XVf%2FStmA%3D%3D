var i7F = parseInt("0x7F");
var i7FF = parseInt("0x7FF");
var iFFFF = parseInt("0xFFFF");
var i1FFFFF = parseInt("0x1FFFFF");
var i3FFFFFF = parseInt("0x3FFFFFF");
var i7FFFFFFF = parseInt("0x7FFFFFFF");

function canonicalizedUtf8FromUnicode(strURL) 
{
    var strSpecialUrl = " <>\"#%{}|^~[]`&?+";
    var strEncode="";
    var i;
    var chUrl;
    var iCode;
    var num;
    var iCodeBin;
    var tempBin;
    var j, leadingzeros;

    strURL += "";
    for (i=0; i<strURL.length; i++) {
        chUrl = strURL.charAt(i);
        iCode = chUrl.charCodeAt(0);
        if (iCode<=i7F)
        {
            if (strSpecialUrl.indexOf(chUrl)!=-1)
            {

                strEncode+="%"+iCode.toString(16).toUpperCase();
            }
            else
            {

                strEncode+=chUrl;
            }
        }
        else
        {
            leadingzeros="";
            iCodeBin=iCode.toString(2)
            if (iCode<=i7FF)
            {

                for (j=11; j>iCodeBin.length; j--) leadingzeros+="0";
                iCodeBin=leadingzeros+iCodeBin

                tempBin="110"+iCodeBin.substr(0,5);
                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                tempBin="10"+iCodeBin.substr(5,6);
                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
            }
            else
            {
                if (iCode<=iFFFF)
                {

                    for (j=16; j>iCodeBin.length; j--) leadingzeros+="0";
                    iCodeBin=leadingzeros+iCodeBin

                    tempBin="1110"+iCodeBin.substr(0,4);
                    strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                    tempBin="10"+iCodeBin.substr(4,6);
                    strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                    tempBin="10"+iCodeBin.substr(10,6);
                    strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                }
                else
                {
                    if (iCode<=i1FFFFF)
                    {

                        for (j=21; j>iCodeBin.length; j--) leadingzeros+="0";
                        iCodeBin=leadingzeros+iCodeBin

                        tempBin="11110"+iCodeBin.substr(0,3);
                        strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                        tempBin="10"+iCodeBin.substr(3,6);
                        strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                        tempBin="10"+iCodeBin.substr(9,6);
                        strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                        tempBin="10"+iCodeBin.substr(15,6);
                        strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                    }
                    else
                    {
                        if (iCode<=i3FFFFFF)
                        {

                            for (j=26; j>iCodeBin.length; j--) leadingzeros+="0";
                            iCodeBin=leadingzeros+iCodeBin

                            tempBin="111110"+iCodeBin.substr(0,2);
                            strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                            tempBin="10"+iCodeBin.substr(2,6);
                            strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                            tempBin="10"+iCodeBin.substr(8,6);
                            strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                            tempBin="10"+iCodeBin.substr(14,6);
                            strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                            tempBin="10"+iCodeBin.substr(20,6);
                            strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                        }
                        else
                        {
                            if (iCode<=i7FFFFFFF)
                            {

                                for (j=31; j>iCodeBin.length; j--) leadingzeros+="0";
                                iCodeBin=leadingzeros+iCodeBin

                                tempBin="1111110"+iCodeBin.substr(0,1);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                                tempBin="10"+iCodeBin.substr(1,6);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                                tempBin="10"+iCodeBin.substr(7,6);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                                tempBin="10"+iCodeBin.substr(13,6);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                                tempBin="10"+iCodeBin.substr(19,6);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                                tempBin="10"+iCodeBin.substr(25,6);
                                strEncode+="%"+parseInt(tempBin,2).toString(16).toUpperCase()
                            }
                        }
                    }   
                }           
            }
        }
    }
    return strEncode;
}

function GetItemUrl(a)
{
    var isIE=false;
    if(null != window.clientInformation){
        isIE = (window.clientInformation.userAgent.indexOf("MSIE ") > 0);
    }
    var h = document.getElementById(a);
    if (null != h)
    {
        if(isIE){
            var h2 = h.outerHTML;
            var s = h2.indexOf('href="');
            if(s > 0){
                s += 6;
                var e = h2.indexOf('"', s);
                if(e > 0){
                    h2 = h2.substring(s, e);
                    h2 = h2.replace(/&#39;/ig, "'");
                    h2 = h2.replace(/&quot;/ig, '"');
                    h2 = h2.replace(/&amp;/ig, '&');
                    return h2;
                }
            }
        }

        return h.href;
    }
    return '';
}

function GoToItemUrl(a)
{
    window.location.href = GetItemUrl(a);
}

function ConCatGoToUrl()
{
    var a = "";
    for (var i=0; i<arguments.length; i++) a += arguments[i];
    window.location.href = a;
}

function GetCookieExpireTime()
{
    var ce = new Date();        
    var m = ce.getMonth();
    if(m == 11){
        ce.setMonth(0);
        ce.setYear(ce.getYear() + 1);
    }else{
        ce.setMonth(m+1);
    }
    return ce.toGMTString();
}

function _ppsi(lid, fieldID)        
{
    return lid + fieldID;
}

function OnshdCB(lid)       
{
    Onshd(lid, 'c', '', '', '');
}

function Onshd(lid, ct, eid, th, ts)    
{
    var f = document.forms[0];
    var s = _ppsi(lid, 'shd');
    var c, b;                   
    var g = document.styleSheets(s).rules[0].style;
    if (null ==f || null == g) return;
    b = false;      

    if ('a' == ct)      
    {
        c = _ppsi(lid, 'spssSHDH');
        if(null != f.elements[c]) b = (f.elements[c].value == "false");
    }
    else
    {
        c = _ppsi(lid, 'spssSHDC');
        if(null != f.elements[c]) b = (f.elements[c].checked);
    }
    if(b){
        g.display = "";
        if ('a' == ct)
        { 
            if(null != f.elements[c]) f.elements[c].value = "true";
            document.links.item(eid).innerText = th;
        }
        document.cookie = s + "=true; expires=" + GetCookieExpireTime();
    } else {
        g.display = "none";
        if ('a' == ct) 
        { 
            if(null != f.elements[c]) f.elements[c].value = "false";
            document.links.item(eid).innerText = ts;
        }
        document.cookie = s + "=false; expires=" + GetCookieExpireTime();
    }
}

function OnPTP(lid)
{
    var f=document.forms[0];
    if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value = "PageToPrevious";
    f.submit();
}

function OnPTN(lid)
{
    var f=document.forms[0];
    if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value = "PageToNext";
    f.submit();
}

function OnPTT(a, event, lid, isIE)
{
    var f=document.forms[0];
    if(isIE){
        var kCode = String.fromCharCode(event.keyCode);
        if(kCode == "\n" || kCode == "\r"){
            if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value="DirectPageTo";
            if(null != f.elements[_ppsi(lid, "spssAPNH")]) f.elements[_ppsi(lid, "spssAPNH")].value=a.value;
            f.submit();
        }
    } else {
        if((event.which == 10) || (event.which == 13)){
            if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value="DirectPageTo";
            f.submit();
        }
    }
}
function OnPTD(a, lid)
{
    var f=document.forms[0];
    if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value="DirectPageTo";
    if(null != f.elements[_ppsi(lid, "spssAPNH")]) f.elements[_ppsi(lid, "spssAPNH")].value=a.value;
    f.submit();
}

function OnChangeGroupBySelection(lid, cid)
{
    if(null != document.forms[0].elements[cid])
        OnGroupBy(lid, document.forms[0].elements[cid].value);
}
function OnGroupBy(lid, strURI)     
{
    var f=document.forms[0];
    if(null != f.elements[_ppsi(lid, "spssWFEH")]) f.elements[_ppsi(lid, "spssWFEH")].value="GroupBy";

    if(null != f.elements[_ppsi(lid, "spssGBKH")]) f.elements[_ppsi(lid, "spssGBKH")].value=strURI;
    f.submit();
}

function OnChangeSortBySelection(lid, cid)
{
    var s="";
    if(null != document.forms[0].elements[cid]) s = document.forms[0].elements[cid].value;
    var d = s.toUpperCase().lastIndexOf(' DESC');
    if(d>=0){
        s=s.substring(0, d);
    }
    var q = '"';
    var is = s.indexOf(q);
    var ie = s.lastIndexOf(q);
    if(is >=0){
        if(ie > is) s=s.substring(0, ie);
        s=s.substring(is + q.length, s.length);
    }
    OnCCT(lid, s, d>=0?'DESC':'ASC');
}
function OnCCT(lid, uri, o)         
{
    var strTitleHiden = _ppsi(lid, 'spssSBCTH');
    var f = document.forms[0];
    if(null != f.elements[strTitleHiden])
    {
        f.elements[strTitleHiden].value = '\"' + uri + '\"';
        if( o.toUpperCase() == 'DESC'){
            f.elements[strTitleHiden].value +=' DESC';
        }
    }
    if(null != document.forms[0].elements[_ppsi(lid, "spssWFEH")]) document.forms[0].elements[_ppsi(lid,"spssWFEH")].value="SortBy";
    if(null != document.forms[0].elements[_ppsi(lid, "SBCH")]) document.forms[0].elements[_ppsi(lid,"SBCH")].value="1";
    document.forms[0].submit();
}

function toggleMgmtAdv(lid, m)      
{
    var h = document.forms[0].elements["SPSHASOO"];
    if(h != null) {
        if ( 'spl' == m){
            h.value="Off";
        } else {
            h.value="On";
        }
        if(null != document.forms[0].elements["SPSSBWFEHC"]) document.forms[0].elements["SPSSBWFEHC"].value="Advanced";
    }

    var t=document.forms[0].elements[_ppsi(lid, "mvmh")];
    if(null != t) t.value=m;

    if ( 'spl' == m)
    {

        OnResultView(lid, 'vbs');
        return;
    }
    document.forms[0].submit();
}

function OnResultView(lid, vt)      
{

    var f = document.forms[0];

    var sb, gb;         
    switch (vt)
    {
        case 'slv':     
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'NoneNone';
            var c = _ppsi(lid, 'spssSHDH');
            f.elements[c].value = "false";
            break;
        case 'vbs':
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'urn:schemas.microsoft.com:fulltextqueryinfo:sitename';
        break;
        case 'vba':
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'urn:schemas-microsoft-com:office:office#Author';
        break;
        case 'vbr':
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'NoneNone';
        break;
        case 'vrd':
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'DAV:getlastmodified';
        break;
        case 'vbc':
            sb = '"urn:schemas.microsoft.com:fulltextqueryinfo:rank" DESC';
            gb = 'urn:schemas-microsoft-com:publishing:Category';
        break;
        case 'Recent':
            sb = '"CreationDate" DESC';
            gb = 'CreationDate';
        break;
        case 'SiteRegTopics':
            sb = '"Title" DESC';
            gb = 'Location';
        break;
        case 'SiteRegSimple':
            sb = '"Title" DESC';
            gb = 'NoneNone';
        break;
        case 'SiteRegTeams':
            sb = '"Title" DESC';
            gb = 'NoneNone';
        break;
    }

    var sth = _ppsi(lid, 'spssSBCTH');
    if(null != f.elements[sth])f.elements[sth].value = sb;
    if(null != document.forms[0].elements[_ppsi(lid, "spssWFEH")])
        document.forms[0].elements[_ppsi(lid, "spssWFEH")].value="GroupBy";
    if(null != document.forms[0].elements[_ppsi(lid, "spssGBKH")])
        document.forms[0].elements[_ppsi(lid, "spssGBKH")].value=gb;
    if(null != document.forms[0].elements[_ppsi(lid, "mvth")])
        document.forms[0].elements[_ppsi(lid, "mvth")].value = vt;
    document.forms[0].submit();
}

function OnGFL(lid, s, t)       
{

    if(null != document.forms[0].elements[_ppsi(lid, "spssWFEH")])
        document.forms[0].elements[_ppsi(lid, "spssWFEH")].value="SeeFullListLink";
    if(null != document.forms[0].elements[_ppsi(lid, "spssWMCH")])
        document.forms[0].elements[_ppsi(lid, "spssWMCH")].value=s;
    if(null != document.forms[0].elements[_ppsi(lid, "spssWMDH")])
        document.forms[0].elements[_ppsi(lid, "spssWMDH")].value=t;
    document.forms[0].submit();
}

function ShowHideGroup(eid, gid, bE)        
{
    var elem = document.getElementById(eid);
    if ( null == elem) return;

    var prefix = eid.substring(0, eid.indexOf('_t'));
    var sMatch = new RegExp(prefix+"_g"+gid+"_r");
    var oAll = document.getElementsByTagName("TR");
    var l = oAll.length;
    for(var i=0; i<l; i++)
    {
        var tmp=oAll[i];
        if(tmp.id.search(sMatch) >= 0)
        {
            if(bE) 
            {
                tmp.className = tmp.className.replace(/groupHide/g, "groupShow");
            }
            else
            {
                tmp.className = tmp.className.replace(/groupShow/g, "groupHide");
            }
        }
    }

    var ns, fs;
    if(bE){
        ns = eid.replace("_te_", "_tc_");
    }else{
        ns = eid.replace("_tc_", "_te_");
    }
    fs = document.getElementById(ns);
    if(null != fs) fs.style.display = "";
    elem.style.display = "none";

    try {
        ResizePeopleImages();
    }
    catch (e) {
    }
}

function OnToggleAllGroups(lid, cid, eid, te, tc)       
{
    var f = document.forms[0];
    if(null != document.forms[0].elements[_ppsi(lid, "spssECAH")])
    {
        var bGCE = !(document.forms[0].elements[_ppsi(lid, "spssECAH")].value=='true');
        OnExpandCollapseAll(lid, cid, bGCE)
        document.links.item(eid).innerText = (bGCE)?tc:te;
    }
}

function OnExpandCollapseAll(lid, cid, expand)
{
    var sMatch = new RegExp(_ppsi(lid,"_g([\\d]+)_r[\\d]"));    
    var oAll = document.getElementsByTagName("TR");
    var l = oAll.length;
    var i, temp, rg, fid, flk, exid, exlk;
    var ngid, gid = -1;

    for(i=0; i<l; i++){
        tmp=oAll[i];
        if(null != sMatch.exec(tmp.id))
        {
            ngid = RegExp.$1;
            if ( ngid != gid )  
            {

                fid = _ppsi(lid,  "_tc_" + RegExp.$1); flk = document.links.item(fid);
                exid = _ppsi(lid, "_te_" + RegExp.$1); exlk = document.links.item(exid);

                if (null != exlk){
                    exlk.style.display = expand?"none":"";
                    if (null != flk)  flk.style.display =  expand?"":"none";
                }

                gid = ngid;     
            }

            if(expand)
            {
                tmp.className = tmp.className.replace(/groupHide/g, "groupShow");
            }
            else 
            {
                tmp.className = tmp.className.replace(/groupShow/g, "groupHide");
            }
        }
    }

    if(null != document.forms[0].elements[_ppsi(lid, "spssAGECH")])
        document.forms[0].elements[_ppsi(lid, "spssAGECH")].value = expand;
    document.cookie = cid + "="+expand+"; expires=" + GetCookieExpireTime();
    if(null != document.forms[0].elements[_ppsi(lid, "spssECAH")])
        document.forms[0].elements[_ppsi(lid, "spssECAH")].value = expand;
}

function GetPinLink(lid)
{
    var o = document.forms[0].elements[_ppsi(lid, "spssQI")];
    if(null != o){
        var i=document.URL.indexOf('?');
        if(i>=0) return document.URL.substring(0, i)+'?'+o.value;
        else return document.URL+'?'+o.value;
    }
    else return null;
}

function GoSearch(PmtId, TbId, HdQId, bApQ, bSc, DDId, HdSId, HdLId, HdFId, Url, thisSite, thisList, thisFolder, relatedSites, csUrl)
{
    try 
    {
    AddSearchoptionsToQuery();
    }
    catch(e) {}
    var k = document.forms[0].elements[TbId].value;
    k = k.replace( /\s*$/, '' );
    var ui = '1';
    if (PmtId){
        ui = document.forms[0].elements[PmtId].Value;
    }                                                   
    if(k == '' || ui == '0'){
        alert('Please enter one or more search words.');
        if(null != event){
            event.returnValue = false;
            return false;
        }
        else return;
    }                               
    var sch = '?k=' + encodeURIComponent(k);

    if(null != HdQId){
        var sa = document.forms[0].elements[HdQId].value;     
        if (bApQ)
            sch += canonicalizedUtf8FromUnicode(" "+sa);
        else
            sch += '&a='+canonicalizedUtf8FromUnicode(" "+sa);              
    }
    if(bSc){
        var s='', cs='', u='', selVal='';
        var d = document.forms[0].elements[DDId];
        var fIsCS = false;
        s = d.options[d.selectedIndex].text;
        selVal = d.options[d.selectedIndex].value;
        if (selVal==thisSite){
            cs =selVal; s='';
            u=document.forms[0].elements[HdSId].value;
            fIsCS = true;            
        }
        if (selVal==thisList){
            cs =selVal; s='';
            u=document.forms[0].elements[HdLId].value; 
            fIsCS = true;         
        }
        if (selVal==thisFolder){
            cs =s; s='';
            u=document.forms[0].elements[HdFId].value;   
            fIsCS = true;        
        }
        if (s == relatedSites) {
            s = d.options[d.selectedIndex].value;
            fIsCS = true;
        }
        if(fIsCS)
        {
            Url = csUrl;
        }
        if (s != ''){                               
            sch += "&s=" + encodeURIComponent(s);
            if (d.options[d.selectedIndex].value != '' && !fIsCS) {
                Url = d.options[d.selectedIndex].value;
            }        
        }
        if (cs != ''){          
            sch += "&cs=" + encodeURIComponent(cs);
        }
        if (u != ''){
            sch += '&u=' + encodeURIComponent(u);
        }                                
    }
    var F=document.forms[0];

    try {external.AutoCompleteSaveForm(F);} catch (err) {}

    window.location = Url + sch;

    try {if(null    != event) event.returnValue = false;} catch (err) {}
    return; 
}

function SetCrawlLogFilters(TBId, CSId, STId, SMId, Url, MinDtId, MaxDtId,CatId)
{   
        var sch = Url; 
    var delim = '?';
    var k = document.forms[0].elements[TBId].value;
        k = k.replace( /\s*$/, '' );
    if(k != '')
    {   
        sch += delim + 'u=' + canonicalizedUtf8FromUnicode(k);
        delim = '&';    
    }

        if ( null != CSId)
        {
            var d_cs = document.forms[0].elements[CSId];
        var t_cs = d_cs.options[d_cs.selectedIndex].text;   
            var v_cs = d_cs.options[d_cs.selectedIndex].value;
        if (v_cs != '-1'){
            sch += delim + 'cs=' + canonicalizedUtf8FromUnicode(v_cs);
            delim = '&';            
            }
    }

    if (null != STId)
    {
        var d_st = document.forms[0].elements[STId];    
            var v_st = d_st.options[d_st.selectedIndex].value;
        if (v_st != '-1'){
            sch += delim + 'st=' + canonicalizedUtf8FromUnicode(v_st);
            delim = '&';
            }
    }

    if (null != SMId)
    {
                var d_id = document.forms[0].elements[SMId].value;
        var d_sm = document.forms[0].elements[d_id];    
            var v_sm = d_sm.options[d_sm.selectedIndex].value;

        if (v_sm != '-1'){          
            sch += delim + 'sm=' + canonicalizedUtf8FromUnicode(v_sm);
            delim = '&';
            }
    }

    if (null != MinDtId)
    {

        var elmDate = document.getElementById(g_strDateTimeControlIDs[MinDtId]);

        if (elmDate != null && elmDate.value != null && elmDate.value != ''){
            var min = elmDate.value
            var elmHours = document.getElementById(g_strDateTimeControlIDs[MinDtId]+"Hours");
            if (elmHours != null )
                min += ' ' + elmHours.selectedIndex + ':';      
            else
                min += ' 00:';
            var elmMinutes  = document.getElementById(g_strDateTimeControlIDs[MinDtId]+"Minutes");
            if (elmMinutes != null)
                min += elmMinutes.selectedIndex*5 + ':00';
            else
                min += ':00:00';        
            sch += delim + 'min=' + canonicalizedUtf8FromUnicode(min);
            delim = '&';
        }
    }

    if (null != MaxDtId)
    {

        var elmMaxDate = document.getElementById(g_strDateTimeControlIDs[MaxDtId]);
        if (elmMaxDate != null && elmMaxDate.value != null && elmMaxDate.value != ''){
            var max = elmMaxDate.value
            var elmMaxHours = document.getElementById(g_strDateTimeControlIDs[MaxDtId] +"Hours");
            if (elmMaxHours != null)
                max += ' ' + elmMaxHours.selectedIndex + ':';   
            else
                max += ' 00:';
            var elmMaxMinutes = document.getElementById(g_strDateTimeControlIDs[MaxDtId] + "Minutes");
            if (elmMaxMinutes != null)
                max += elmMaxMinutes.selectedIndex*5 + ':00';
            else
                max += ':00:00';
            sch += delim + 'max=' + canonicalizedUtf8FromUnicode(max);
        }
    }

    if (sch == Url){
            alert('Please choose one of the filters.');
            if(null != event){
                event.returnValue = false;
                return false;
            }
            else return;
        }
        if (null != CatId && CatId != '')
    {
        sch += delim + 'cl=' + canonicalizedUtf8FromUnicode(CatId);
        delim = '&';        
    }

    window.top.window.location = sch;
        if (null != event) event.returnValue = false;
        return; 
}

function SetSpecialTermFilters(TBId, DDId, Url)
{
    var sch = Url; 
    var k = document.forms[0].elements[TBId].value;
        k = k.replace( /\s*$/, '' );
    if(k != '')
    {   
        sch += '&k=' + canonicalizedUtf8FromUnicode(k);
        delim = '&';    
    }
    if (sch == Url){         
            if(null != event){
                event.returnValue = false;
                return false;
            }
            else return;
        }  

        if ( null != DDId)
        {
            var d_cs = document.forms[0].elements[DDId];    
            var v_cs = d_cs.options[d_cs.selectedIndex].value;
        sch += '&ft=' + canonicalizedUtf8FromUnicode(v_cs);

  }
  window.top.window.location = sch;
  if (null != event) event.returnValue = false;
  return;
}

function XmlEscape(text)
{
  return (text)?text.replace('&','&amp;').replace('>', '&gt;').replace('<','&lt;'):'';
}

function SendClick(postUrl, soapAction, env, startPos, elem) 
{
    var id = elem.id;
    var relPosStr = /\d+$/.exec(id);
    var relPos = (relPosStr ? parseInt(relPosStr[0],10) : 0)
    var cont = /^(CSR_RV|CSR_MRL|SRP_)/.exec(id);
    var bestBet = null;
    var nonClickedXml = null;

    if (/^BBR_/.exec(id))
    {
        var bbelem = document.getElementById('BBR_'+relPosStr);
        if (bbelem) bestBet = bbelem.innerHTML;
    }
    else if (relPos > 1 && startPos == 0 && /^CSR_/.exec(id))
    {
        nonClickedXml = '';
        for (var i = 1; i < relPos && i < 10; i++)
        {
            var nonClickedElem = document.getElementById('CSR_'+i);
            if (nonClickedElem)
            {
                nonClickedXml += '<z>'+nonClickedElem.href+'</z>';
            }
        }
    }
    SendSoap(postUrl, soapAction, env, (cont ? null : elem.href), relPos + startPos, bestBet, cont, nonClickedXml);
}

function SendSoap(postUrl, soapAction, env, clickUrl, pos, bestBet, cont, nonClickedXml)
{
    var req = (window.XMLHttpRequest) ? (new XMLHttpRequest())
            : (window.ActiveXObject) ? (new ActiveXObject('Msxml2.XMLHTTP')) : null;
    if (req)
    {
        req.open('POST', postUrl, true);
        req.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        req.setRequestHeader('SOAPAction', soapAction);
        if (clickUrl) env = env.replace("</i>", '<c>' + XmlEscape(clickUrl) + '</c>' + "</i>");
        if (pos) env = env.replace('<r>0','<r>'+pos);
        if (cont) env = env.replace('<f>false','<f>true');
        if (bestBet) env = env.replace("</i>", '<y>' + XmlEscape(bestBet) + '</y>' + "</i>");
        if (nonClickedXml) env = env.replace("</i>", nonClickedXml + "</i>");
        req.send(env);
    }
}

