function getDim(el){
	for (var lx=0,ly=0;el!=null;
		lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
	return {x:lx,y:ly}
}

function pro25PageURL() {
    var sReturn = self.location.pathname.toUpperCase();
    return sReturn;
}
function loadDestination(){
}

var bFIDVis = false;
function showFID(oAnchor) {
    if(oAnchor) {
        if(oAnchor.blur) {
            oAnchor.blur();
        }
    }
    if(document.getElementById) {
		var oFID = document.getElementById("fid");
		if(oFID) {
		    if(bFIDVis==false) {
    		    oFID.style.display = "block";
	            bFIDVis = true;
	        } else {
    		    oFID.style.display = "none";
	            bFIDVis = false;
	        }
		}
	}
}
function setStageHeight() {
	if(document.getElementById) {
		var oMain = document.getElementById("main");
		var oBottom = document.getElementById("cont_c");
		var oLeft = document.getElementById("left");
		var oRight = document.getElementById("right");
		var iMinHeight = 741;
		var oDim = getDim(oBottom);

		if(oBottom) {	
		    if(oDim) {
			    if(oLeft) {
				   // oLeft.style.height = iMinHeight + "px";
			    }
			    if(oRight) {
				   // oRight.style.height = iMinHeight + "px";
			    }
			    if(oMain) {
				   // oMain.style.height = iMinHeight + "px";
			    }
		    }		
			oDim = getDim(oBottom);
			var iHeight = ((oDim.y *1) + 35);
			//alert(iHeight);
			if(iHeight < iMinHeight) {
			    iHeight = iMinHeight;
			}
			if(oDim) {
				if(oLeft) {
					oLeft.style.height = iHeight + "px";
				}
				if(oRight) {
					oRight.style.height = iHeight + "px";
				}
				if(oMain) {
					oMain.style.height = iHeight + "px";
				}
			}
		}
	}
	navlogotext(null,false);
}



function navlogotext(oAnchor, bOver) {
    if(document.getElementById) {
        var oNavLogoTextBackground=document.getElementById("logonavtextbackground");
        var oNavLogoText=document.getElementById("logonavtext");
        var oNavLogomiddlelay=document.getElementById("logonavmiddlelay");
        if(oNavLogoTextBackground && oNavLogoText && oNavLogomiddlelay) {
            if(bOver==false) {
                oNavLogoTextBackground.style.backgroundImage="url(/images/nav_text_background-off.jpg)";
                oNavLogoText.innerHTML = "";
                oNavLogomiddlelay.innerHTML = "";
            } else {
                oNavLogoTextBackground.style.backgroundImage="url('/images/nav_text_background-on.jpg')";
                oNavLogoText.innerText = oAnchor.id;
                var sNavText = oAnchor.id;;
                var sNavInnerAlign = "center";
                var sNavOuterAlign = "center";
                var sNavWidth = "300px";
                var sMiddleHTML = "";
                var currentTime = new Date()
                switch(oAnchor.id) {
                    case ("nav_autos"):
                        sNavText = "Honda Cars, Trucks, SUVs";
                        sNavInnerAlign = "left";
                        sNavWidth = "910px";
                        //sMiddleHTML = "<img src=\"/images/nav_logo_honda.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/nav_logo_honda.gif\">";
                        break;
                    case ("nav_acura"):
                        sNavText = "Acura Automobiles, SUVs";
                        sNavOuterAlign = "left";
                        sNavWidth = "395px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"132\" ><img src=\"/images/nav_logo_acura.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"132\" ><img src=\"/images/nav_logo_acura.gif\">";
                        break;
                    case ("nav_powersports"):
                        sNavText = "Motorcycles, ATVs, Scooters &amp; Personal Watercraft";
                        sNavOuterAlign = "left";
                        sNavWidth = "660px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"264\" ><img src=\"/images/nav_logo_powersports.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"264\" ><img src=\"/images/nav_logo_powersports.gif\">";
                        break;
                    case ("nav_hondajet"):
                        sNavText = "HondaJet";
                        sNavWidth = "920px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"396\" ><img src=\"/images/nav_logo_hondajet.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"396\" ><img src=\"/images/nav_logo_hondajet.gif\">";
                        break;
                    case ("nav_powerequipment"):
                        sNavText = "Lawn Equipment, Snowblowers, Generators &amp; Pumps";
                        sNavOuterAlign = "right";
                        sNavWidth = "660px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"528\" ><img src=\"/images/nav_logo_powerequipment.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"528\" ><img src=\"/images/nav_logo_powerequipment.gif\">";
                        break;
                    case ("nav_marine"):
                        sNavText = "Outboard Motors &amp; Jet Drives";
                        sNavOuterAlign = "right";
                        sNavWidth = "395px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"660\" ><img src=\"/images/nav_logo_marine.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"660\" ><img src=\"/images/nav_logo_marine.gif\">";
                        break;
                    case ("nav_engines"):
                        sNavText = "Commercial, Residential &amp; Mini 4-Stroke Engines";
                        sNavInnerAlign = "right";
                        sNavWidth = "910px";
                        //sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"788\" ><img src=\"/images/nav_logo_engines.gif?nocache="+escape(currentTime.getTime())+"\">";
                        sMiddleHTML = "<img src=\"/images/trans.gif\" height=\"1\" width=\"788\" ><img src=\"/images/nav_logo_engines.gif\">";
                        break;
                }
                oNavLogomiddlelay.innerHTML = sMiddleHTML;
                oNavLogoText.innerHTML = sNavText;
                oNavLogoText.style.textAlign = sNavInnerAlign;
                oNavLogoText.style.width = sNavWidth;
                switch (sNavOuterAlign) {
                    case ("right"):
                        oNavLogoText.style.margin="0px 0px 0px auto"
                        break;
                    case ("left"):
                        oNavLogoText.style.margin="0px auto 0px 0px"
                        break;
                    default:
                        oNavLogoText.style.margin="0px auto 0px auto"
                        break;
               }
               oNavLogoTextBackground.style.textAlign=sNavOuterAlign;
               
          
            }
            
        }
    
    }

}

var sSearchBoundries = "all";
function loadSearch(sSearchFormID) {
    if(document.getElementById) {
        var oSearchQuestion = document.getElementById('searchQuestion')
        var oSearchForm = document.getElementById('frmSearch')
        if(oSearchQuestion && oSearchForm) {
           var sURL = oSearchForm.action + "?s=" + escape(oSearchQuestion.value) + "#" +sSearchBoundries;
           if(oSearchQuestion.value) {
               self.location = sURL;
            }       
        }
    }
}

var bSearchOptionsOn = false;
var sSectionSelected = new Array();
function setSearch(sSearchBoundriesValue) {
     if(document.getElementById  && bSearchOptionsOn) {
        sSearchBoundries=sSearchBoundriesValue;
       
        var oSearchOptionLayer =document.getElementById("search_options");
        
        if(oSearchOptionLayer) {
            oSearchOptionLayer.style.display="none";
        }
        var oSearchOptionBtn =document.getElementById("btnSearchOption");
        if(oSearchOptionBtn.src) {
            oSearchOptionBtn.src = "/images/search/options-off.jpg"
        }
        bSearchOptionsOn = false;
     }
     //alert(oSearchBoundries.value);
     //searchOptions(2);
}

function searchOptions(iState) {
    if(document.getElementById) {
        var oSearchOptionBtn =document.getElementById("btnSearchOption");
        var oSearchOptionAnchor =document.getElementById("lnkSearchOption");
        var oSearchOptionLayer =document.getElementById("search_options");
        
        if(iState==2) {
        // Click
            if(bSearchOptionsOn) {
                bSearchOptionsOn = false;
                if(oSearchOptionLayer) {
                    oSearchOptionLayer.style.display="none";
                }
            } else {
                bSearchOptionsOn = true;
                if(oSearchOptionLayer) {
                    oSearchOptionLayer.style.display="inline";
                }
            }
            if(oSearchOptionAnchor) {
                if(oSearchOptionAnchor.blur) {
                    oSearchOptionAnchor.blur();
                }
            }
            if(bSearchOptionsOn==false && oSearchOptionBtn) {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-off.jpg"
                }
            } else {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-on.jpg"
                }
            }
            
        } else if(iState==1) {
        // Over 
            if(bSearchOptionsOn==false && oSearchOptionBtn) {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-over.jpg"
                }
            } else {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-on.jpg"
                }
            }
        } else {
        // Off
            iState = 0;
            if(bSearchOptionsOn==false && oSearchOptionBtn) {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-off.jpg"
                }
            } else {
                if(oSearchOptionBtn.src) {
                    oSearchOptionBtn.src = "/images/search/options-on.jpg"
                }
            }
        }
    }
}

function sectionOver(sSection,iItem,iState) {
    sectionOverWithOffState(sSection,iItem,iState,"off")
}

function sectionOverWithOffState(sSection,iItem,iState,sOffState) {
    if(document.getElementById) {
        var oTD1 = document.getElementById(sSection + "td1_" + iItem);
        var oTD2 = document.getElementById(sSection + "td2_" + iItem);
        var oImage = document.getElementById(sSection + "image_" + iItem);
        var oLink= document.getElementById(sSection + "link_" + iItem);
        if(oTD1 && oTD2 && oImage && oLink) {
            if(iState==2) {
                // Click
                if(iItem!=sSectionSelected[sSection]) {
                    var iOldItem = sSectionSelected[sSection];
                    if(sSection=="search") {
                        sSectionSelected[sSection] = iItem;
                    }
                    sectionOver(sSection,iItem,1);
                    //alert(sSection+" : "+iItem+" : "+1)
                    
                    sectionOver(sSection,iOldItem,0);
                  
              
                }
            }else if(iState==1) {
                // Over
                if(iItem!=sSectionSelected[sSection]) {
                    oTD1.className = "over";
                    oTD2.className = "over";
                    oLink.className = "over";
                    oImage.src="/images/hoverarrow.gif";
                }
            } else {
                // Off
                if(iItem!=sSectionSelected[sSection]) {
                    oTD1.className = sOffState;
                    oTD2.className = sOffState;
                    oLink.className = sOffState;
                    oImage.src="/images/trans.gif";
                }
            }
        }
    }
}
 
function setDefaultSearch() {
    if(document.getElementById) {
        var iItem = 1;
        var sSection = "search";
        var sSearchBoundriesValue = "all";
      //  alert(sSearchBoundries);
       // alert(aSearchLayerIds.length);
       // alert(sCurrentSearchLayerID);
       // var sTempasdkjhakjsdh = "";
        for(ii=0;ii<aSearchLayerIds.length;ii++) {
            // sTempasdkjhakjsdh+=ii+": "+aSearchLayerIds[ii]+"\n";
             if(aSearchLayerIds[ii]==sCurrentSearchLayerID){
                iItem = ii+1;
                sSearchBoundriesValue = aSearchLayerIds[ii];
             }
        }
       // alert(sTempasdkjhakjsdh);
        
        
        var oTD1 = document.getElementById(sSection + "td1_" + iItem);
        var oTD2 = document.getElementById(sSection + "td2_" + iItem);
        var oImage = document.getElementById(sSection + "image_" + iItem);
        var oLink= document.getElementById(sSection + "link_" + iItem);
        
        if(oTD1 && oTD2 && oImage && oLink ) {
            sSearchBoundries=sSearchBoundriesValue;
            sSectionSelected[sSection] = iItem;
            oTD1.className = "over";
            oTD2.className = "over";
            oLink.className = "over";
            oImage.src="/images/hoverarrow.gif";
        }
    }

}

function setDefaultSearchNews(iQuestionLength) {
    if(document.getElementById) {
        var iItem = 15;
        var sSection = "search";
        var sSearchBoundriesValue = "newsandviews";
        var oTD1 = document.getElementById(sSection + "td1_" + iItem);
        var oTD2 = document.getElementById(sSection + "td2_" + iItem);
        var oImage = document.getElementById(sSection + "image_" + iItem);
        var oLink= document.getElementById(sSection + "link_" + iItem);
        
        if(oTD1 && oTD2 && oImage && oLink ) {
            sSearchBoundries=sSearchBoundriesValue;
            sSectionSelected[sSection] = iItem;
            oTD1.className = "over";
            oTD2.className = "over";
            oLink.className = "over";
            oImage.src="/images/hoverarrow.gif";
        }
 
        if(document.getElementById("searchQuestion")) {
            document.getElementById("searchQuestion").value = "";
            document.getElementById("searchQuestion").style.width = iQuestionLength+"px";
        }
        if(document.getElementById("search_options")) {
            document.getElementById("search_options").style.width = (iQuestionLength+80)+"px";
        }
        
    }
}

var sCurrentModal = "";
var iCurrentModalTop = 215;
var iCurrentModalWidth = 356;
function hondamodal(sLayer, iModalTop, iModalWidth) {
    sCurrentModal = sLayer;
    iCurrentModalTop = iModalTop;
    iCurrentModalWidth = iModalWidth;
    showmodal();
}

function resizeCheckModal() {
    if(sCurrentModal) {
        showmodal();
    }
}
function showmodal() {
    if(document.getElementById) {
        var oModuleLayer = document.getElementById(sCurrentModal);
        var oBG = document.getElementById('hondamodal');
        var oBGImg = document.getElementById('imagemodal');
        var value = 4;
        var iHeight = 0;
        var iWidth = 0;
        if(iWidth < screen.availWidth) {
            //iWidth = screen.availWidth;
        }
         if(iWidth < window.scrollWidth) {
            //iWidth = window.scrollWidth;
        }
        if(iWidth < window.innerWidth) {
            //iWidth = window.innerWidth;
        }
        if(iWidth < document.width ) {
           // iWidth = document.width ;
        }
         if(iWidth <  document.body.clientWidth  ) {
            iWidth =  document.body.clientWidth ;
        }
        if(iWidth < document.body.scrollWidth) {
           iWidth = document.body.scrollWidth;
        }
        if(iHeight < screen.availHeight) {
          //  iHeight = screen.availHeight;
        }
        if(iHeight < window.scrollHeight) {
          //  iHeight = window.scrollHeight;
        }
        if(iHeight < window.innerHeight) {
           // iHeight = window.innerHeight;
        }
        
        if(iHeight < document.height ) {
           // iHeight = document.height ;
        }
       
       if(iHeight <  document.body.clientHeight ) {
            iHeight =  document.body.clientHeight ;
        }
        if(iHeight < document.body.scrollHeight) {
           iHeight = document.body.scrollHeight;
        }
        if(oBG && oBGImg && oModuleLayer) {
            oModuleLayer.style.display="block";
            oModuleLayer.style.top=iCurrentModalTop;
            oModuleLayer.style.left=(iWidth/2)-(iCurrentModalWidth/2);
            
            oBG.style.opacity = value/10;
	       oBG.style.filter = 'alpha(opacity=' + value*10 + ')';
	       oBG.style.display = "block";
	        oBG.style.height = iHeight;
	        oBG.style.width = iWidth;
	       oBG.style.overFlow = "hidden";
	       
	        oBGImg.height = iHeight-2;
	        oBGImg.width = iWidth-2;
        } else {
            hidemodal();
        }
    }

}
function hidemodal() {
    
     if(document.getElementById) {
        var oBG = document.getElementById('hondamodal');
        var oBGImg = document.getElementById('imagemodal');
        var oModuleLayer = document.getElementById(sCurrentModal);
        if(oBG && oBGImg  && oModuleLayer) {
            oBGImg.height = 1;
	        oBGImg.width = 1;
	        if(oBG.blur) {
	            oBG.blur();
	        }
	        oBG.style.display = "none";
	        oModuleLayer.style.display = "none";
	        
        } 
     }
     sCurrentModal = "";
}

var sExitLink = ""
function loadLink (sLink,sLinkIdentifier,sTrackingText) {
    //alert(sLink+"\n"+sLinkIdentifier+"\n"+sTrackingText);
    springBoard2009(sLinkIdentifier,sTrackingText);
    
    var bUseNewWindow = false
    
    if(bUseNewWindow) {
        if(document.getElementById) {
            oLinkOut = document.getElementById("frmLinkOut");
            if(oLinkOut) {
                oLinkOut.action = sLink;
                //alert(oLinkOut.action+"\n"+sLink)
                oLinkOut.submit();            
            } else {
                bUseNewWindow = false
            }
        } else {
            bUseNewWindow = false
        }
    }
    if(!bUseNewWindow) {
        sExitLink=sLink;
        setTimeout('selfExit()',500);
    }
}

function selfExit() {
    self.location=sExitLink;
}

var sCurrentSearchLayerID = "all";
var aSearchLayerIds= new Array();
var aSearchLayerDomains= new Array();
var aSearchLayerDomainNames= new Array();
var sSearchQuestion = "";
var sSearchResultsCount = "";
function setQuestionCount(sQuestionCount) {
    sSearchResultsCount = sQuestionCount
}
function setQuestion(sQuestion) {
       sSearchQuestion = sQuestion;
       var iQuestionLength=sQuestion.length * 5;
       
       if (iQuestionLength < 200) {
        iQuestionLength=200;
       }
        if (iQuestionLength > 700) {
        iQuestionLength=700;
       }
       
       if(document.getElementById) {
        if(document.getElementById("searchQuestion")) {
            document.getElementById("searchQuestion").value = sQuestion;
            document.getElementById("searchQuestion").style.width = iQuestionLength+"px";
        }
        if(document.getElementById("search_options")) {
            document.getElementById("search_options").style.width = (iQuestionLength+80)+"px";
        }
        
    }
}
function startResults() {
    if(initAddDomains) {
        initAddDomains();
    }
    var sQSDomain = getQS(true);
    if(!validateLayerID(sQSDomain)) {
        showSearch("all");
        setQS();
    } else {   
        showSearch(sQSDomain);
    }
    var ourInterval = setInterval("testQSvsCurrentLayerID()", 1500);
}


function testQSvsCurrentLayerID() {
    var sQSDomain = getQS(true);
    if(!validateLayerID(sQSDomain)) {
        //tempDebug("all - set " + sQSDomain);
        showSearch("all");
        setQS();
    } else {
        if(sQSDomain!=sCurrentSearchLayerID) {
            //tempDebug(sQSDomain+" - set");
            showSearch(sQSDomain);
            setQS();
       } else {
            //tempDebug("OK");
       }
    } 
}

function tempDebug(sValue) {
    if(document.getElementById) {
        if(document.getElementById("debug")) {
            document.getElementById("debug").innerHTML = sValue+"<br>A: "+document.location+"<br>B: " +sCurrentSearchLayerID;
        }
    }
}
function validateLayerID(sLayerID) {
    var sTempFilter = "";
    var sTempFilterGood = false;
    sTempFilter = sLayerID.replace(/\./g,"");
    if(MyIndexOf(aSearchLayerIds,sTempFilter)>-1) {
        sTempFilterGood = true;
       
     }
     return sTempFilterGood;
}
function getQS(bConvertToID) {
    var sLocation = document.location.href;
    
    if(sLocation.indexOf("#")>-1) {
        if(sLocation.indexOf("#")<sLocation.length) {
            sLocation = sLocation.substring(sLocation.indexOf("#")+1,sLocation.length);
        } else {
            sLocation = "";
        }
    } else {
        sLocation = "";
    }
    if(bConvertToID) {
        sLocation = sLocation.replace(/\./g,"");
    }
    return sLocation;
}
function setQS() {
    var sTempFilter = ""
    for(var i=0;i<aSearchLayerDomains.length;i++) {
        sTempFilter = aSearchLayerDomains[i].replace(/\./g,"");
        if(sCurrentSearchLayerID==sTempFilter) {
            document.location="#"+aSearchLayerDomains[i];
        }
    }
}



function showSearch(sLayerID) {
    if(MyIndexOf(aSearchLayerIds,sCurrentSearchLayerID)>-1) {
        hideSearch(sCurrentSearchLayerID);
    }
    if(MyIndexOf(aSearchLayerIds,sLayerID)>-1) {
         if(document.getElementById) {
            var oShowLayer = document.getElementById("search_results_"+sLayerID);
            if(oShowLayer) {
                oShowLayer.style.display="inline";
                sCurrentSearchLayerID =sLayerID;
            }
        }
    }
    setStageHeight(); 
    
    searchPageLoad(sLayerID);
    
}

var sdEbugWindow = ""
function searchPageLoad(sLayerID) {
    //alert(sLayerID);
    var iSPL = MyIndexOf(aSearchLayerIds,sLayerID);
    if(iSPL>-1) {
        s.pageName="SEARCH RESULTS SUMMARY"
        s.channel="PORTAL"
        s.prop8=sSearchQuestion.toUpperCase();
        s.prop9=aSearchLayerDomainNames[iSPL].toUpperCase();
        s.prop10=sSearchResultsCount.toUpperCase();
        s.prop25=self.location.href.substring(0,self.location.href.indexOf("#"));
        s.prop26="SEARCH"
        if(sLayerID=="all") {
            s.prop27="DEFAULT"
        } else {
            s.prop27="DOMAIN"
        }
        s.prop37 = s.channel+":"+s.prop26+":"+s.prop27+":"+s.pageName;
        s.eVar26=s.prop26
        s.eVar27=s.prop27
       // alert(s.prop8)
        s.t()
    }
}




function MyIndexOf(aArray,sLookUp) {
    for (var i = 0; i < aArray.length; i++) {
        if (aArray[i] == sLookUp) {
            return i;
        }
    }
    return -1;
}

function addDomain(sDomain, sDomainName) {
    if(MyIndexOf(aSearchLayerDomains,sDomain)==-1) {
        aSearchLayerDomains[aSearchLayerDomains.length]=sDomain;
    }
     if(MyIndexOf(aSearchLayerDomainNames,sDomainName)==-1) {
        aSearchLayerDomainNames[aSearchLayerDomainNames.length]=sDomainName;
    }
    var sLayerID = sDomain.replace(/\./g,"");
    if(MyIndexOf(aSearchLayerIds,sLayerID)==-1) {
        aSearchLayerIds[aSearchLayerIds.length]=sLayerID;
    }
    hideSearch(sLayerID);
}
function hideSearch(sLayerID) {
    
    if(document.getElementById) {
        var oHideLayer = document.getElementById("search_results_"+sLayerID);
        if(oHideLayer) {
            oHideLayer.style.display="none";
        }
    }
    setStageHeight(); 
}

function loadFirstAnchor(oDiv) {
    var oAnchor = oDiv.getElementsByTagName("a")
    if(oAnchor) {
        if(oAnchor.length>0){
            self.location = oAnchor[0].href;
        }
    }
}




function windowCreate(sName, sType, sScreenLocation, sScrollable, sResizable, iWidth, iHeight, sURL) {
	var sWindowParams="";
	var iWindowLeft=0;
	var iWindowTop=0;
	
	// Set "Is Scrollable" Default
	if(sScrollable !="yes" && sScrollable !="no") {
		sScrollable ="no"; 
	} 
	
	// Set "Is Resizable" Default
	if(sResizable !="yes" && sResizable !="no") {
		sResizable ="no"; 
	} 
	
	// Predefined Window Types
	switch (sType) {
		case "mini":	
			sWindowParams="resizable="+sResizable+",status=yes,location=yes,scrollbars="+sScrollable+",menubar=no,toolbar=no,directories=no,width="+iWidth+",height="+iHeight;
			break;
		case "compact":	
			sWindowParams="resizable="+sResizable+",status=no,location=no,scrollbars="+sScrollable+",menubar=no,toolbar=no,directories=no,width="+iWidth+",height="+iHeight;
			break;
		case "small":	
			sWindowParams="resizable="+sResizable+",status=yes,location=no,scrollbars="+sScrollable+",menubar=no,toolbar=no,directories=no,width="+iWidth+",height="+iHeight;
			break;
		default:
		case "standard":	
			sWindowParams="resizable=yes,status=yes,location=yes,scrollbars="+sScrollable+",menubar=yes,toolbar=yes,directories=yes,width="+iWidth+",height="+iHeight;
			break;
	}

	// Predefined Screen Locations
	switch (sScreenLocation) {
		case "topright":
			iWindowLeft = (screen.width-iWidth);
			iWindowTop = 0;
			break;
		case "topcenter":
			iWindowLeft = ( (screen.width-iWidth) >>1 );
			iWindowTop = 0;
			break;
		case "topleft":
			iWindowLeft = 0;
	   	  	iWindowTop = 0;
			break;		
		case "bottomright":
			iWindowLeft = (screen.width-iWidth);
			iWindowTop = (screen.height-iHeight);
			break;
		case "bottomcenter":
			iWindowLeft = ( (screen.width-iWidth) >>1 );
			iWindowTop = (screen.height-iHeight);
			break;
		case "bottomleft":
			iWindowLeft = 0;
	   	  	iWindowTop = (screen.height-iHeight);
			break;
		case "leftcenter":
			iWindowLeft = 0;
	   	  	iWindowTop = ( (screen.height-iHeight) >>1 );
			break;		
		case "rightcenter":
			iWindowLeft = (screen.width-iWidth);
			iWindowTop = ( (screen.height-iHeight) >>1 );
			break;
		default:
		case "center":
   			iWindowLeft = ( (screen.width-iWidth) >>1 );
	   	  	iWindowTop = ( (screen.height-iHeight) >>1 );
			break;
	}
	
	
	if (navigator.appName=="Microsoft Internet Explorer") {
		sWindowParams += ",top=" + iWindowTop + ",left=" + iWindowLeft;
  	} else if (navigator.appName=="Netscape") {
		sWindowParams += ",screenX=" + iWindowLeft + ",screenY=" + iWindowTop;
	}
	
	eval('WMWindow_'+sName+' = window.open("'+sURL+'", "WMWin_'+sName+'", "'+sWindowParams+'")');
	
	eval('setTimeout("existThenFocus(WMWindow_'+sName+')", 300)');
}

function existThenFocus(oWindowName) {
	if(oWindowName) {
		if(!oWindowName.closed) {
		    if(oWindowName.focus) {
    			oWindowName.focus();
	        }
		}
	}
}

function news2framebanner(id,offset) {
    if(document.getElementById) {
        oBanner = document.getElementById(id);
        if(oBanner) {
            oBanner.style.marginLeft=offset;
        }
    }
}

