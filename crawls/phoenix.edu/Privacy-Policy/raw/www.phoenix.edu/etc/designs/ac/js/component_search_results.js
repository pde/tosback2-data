var strSearchMetaPath;
var aCategoryOpts=[];
var aValidCategoryStrings=[];
var aDefaultCategoryStrings=["","programs","admissions","colleges & divisions","courses","articles","news & media"];
var UPX_searchResults=function(){var w={resultsFacets:null,resultsContainer:null,totalCount:null,searchField:null,searchSubmit:null,searchForm:null};
var z={inputDefaultText:"Search"};
var d=["null","uncategorized"];
var k;
var l;
var c="#";
var q='<span class="linkSuffix">&#160;&#187;</span>';
var h='<span class="linkPrefix">&#171;&#160;</span>';
var o="||||";
var a="";
var b=10;
var x=10;
var n=new Array();
var s="";
var t="";
var e="";
var p="";
var v="7.0";
var j="7.0";
var g=false;
var m=160;
var i=/\&q\=([^\&]*)\&?/;
var y=/\&fq\=category\:([^\&]*)\&?/;
var u=/\&fq\=subcategory\:([^\&]*)\&?/;
var f=null;
var r=null;
return{init:function(B,C,F,G,H,A,E,D){l=G;
a=D;
b=B;
x=C;
k=F;
g=A;
m=E;
UPX_searchResults.cacheFormElements();
UPX_searchResults.bindEvents();
if(w.resultsContainer.length>0){p=UPX_searchResults.getDimAutoFilters();
$(window).unbind("hashchange.UPX_searchResults").bind("hashchange.UPX_searchResults",function(){UPX_searchResults.checkAnchorHash()
});
UPX_searchResults.runQuery(H,0)
}},bindEvents:function(){(w.searchField).off("focus.UPX_searchResults").on("focus.UPX_searchResults",function(B){var A=$(B.target);
if(A.val()&&A.val().match(/Search/)){A.val("")
}});
(w.searchField).off("blur.UPX_searchResults").on("blur.UPX_searchResults",function(B){var A=$(B.target);
if(!A.val()||A.val()===""){A.val(z.inputDefaultText)
}});
(w.searchForm).off("submit.UPX_searchResults").on("submit.UPX_searchResults",function(B){var B=B||window.event;
var A=$(B.target);
B.preventDefault();
UPX_searchResults.followEventBoundLink(A.find(".searchField").val())
});
(w.searchField).off("keyup.UPX_searchResults").on("keyup.UPX_searchResults",function(B){var A=$(B.target);
if(B.keyCode==13){UPX_searchResults.followEventBoundLink(A.val())
}});
UPX_autoComplete.init({searchInput:w.searchField,url:l+"/?wt=json&json.wrf=?&jsoncallback=?",delay:300,resultFn:function(A){UPX_searchResults.followEventBoundLink(A)
}})
},cacheFormElements:function(){w.resultsFacets=$("#apts_search_results_facets");
w.resultsContainer=$("#apts_search_page_frame");
w.totalCount=$("#apts_total_count");
w.searchField=$(".searchField");
w.searchSubmit=$(".searchSubmit");
w.searchForm=$(".searchForm")
},runQuery:function(B,A){var C=k+"/?wt=json&json.wrf=?&jsoncallback=?&"+B+p;
var E="/search/";
if(g){C+="&sort=page_views desc"
}if(!b){b=0
}var D=(A*b);
C+="&rows="+b+"&start="+D;
COMMONAjaxUtilities.doJSON(C,{},function(W){var ag;
var Y=0;
var S=W.response.docs;
var F=i.exec(B);
var U=y.exec(B);
var J=u.exec(B);
var H=null;
var L=null;
var V=null;
var af=B;
if((F!==null)&&(F.length===2)){H=F[1];
af="&q="+UPX_searchResults.escapeUrlForSearch(H);
f="javascript:UPX_searchResults.runQuery('"+af+"',0)"
}if((U!==null)&&(U.length===2)){L=U[1].replace(/\"/g,"");
E+=L+"/";
af="&q="+UPX_searchResults.escapeUrlForSearch(H)+"&fq=category:%22"+UPX_searchResults.escapeUrlForSearch(L)+"%22";
r="javascript:UPX_searchResults.followFacetLink('searchResultsFacet_"+L+"','"+af+"',0)"
}if((J!==null)&&(J.length===2)){V=J[1].replace(/\"/g,"");
E+=V+"/"
}c="#"+A+o+UPX_searchResults.escapeUrlForSearch(H)+o+UPX_searchResults.escapeUrlForSearch(L)+o+UPX_searchResults.escapeUrlForSearch(V);
var G=S.length;
var ah=W.response.numFound;
if(G>0){var ad="<ul>";
for(ag=Y;
ag<G;
ag++){var aj=S[ag];
var N=aj.blurb.substring(0,m);
N=N.substring(0,N.lastIndexOf(" "));
if(aj.blurb.length>m||aj.blurb.indexOf("...")!=-1){N+="..."
}ad+="<li>";
ad+="<div class='resultContent'><a href='"+aj.url+".html' name='searchResults_"+(aj.title).replace(/[^a-zA-Z0-9]+/gi,"_")+"'>"+aj.title+"</a><p>"+utils.replaceUnicodeCharactersForDisplay(N)+"</p></div>";
ad+="</li>"
}ad+="</ul>";
w.resultsContainer.addClass("bordered")
}else{var T=null;
ad="";
if(W.spellcheck.suggestions!==null&&W.spellcheck.suggestions.length>=2&&W.spellcheck.suggestions[1].suggestion!==null){var X=0;
var aa=null;
T=W.spellcheck.suggestions[1].suggestion;
if(T!==null&&T.length>0){ad+='<h2>Did you mean "';
X=T.length;
for(var ab=0;
ab<X;
ab++){aa=T[ab];
if(aa!==null){af="&q="+UPX_searchResults.escapeUrlForSearch(aa);
ad+="<a href=\"javascript:UPX_searchResults.runQuery('"+af+"',0)\">"+UPX_searchResults.unescapeUrlFromSearch(aa)+"</a>";
if(X>1){if(ab!==(X-1)){ad+=", "
}}}}ad+='?"</h2>'
}}ad+=$("#apts_search_noresults").html()
}w.resultsContainer.html(ad);
var Z=null;
var M=0;
if(L===null){Z=W.facet_counts.facet_fields.category;
if(Z){M=Z.length
}}else{if(L!==null){Z=W.facet_counts.facet_fields.subcategory;
if(Z){M=Z.length
}}}if(M>0){UPX_searchResults.showLeftColumn(Z,M,L,V,H,aValidCategoryStrings,G)
}if(G<=0){UPX_searchResults.removeLeftColumn()
}var ae=((A*b)+1);
var ac=((A*b)+b);
if(ac>ah){ac=ah
}var Q="";
if(ah>0){Q+="Displaying "+ae+"-"+ac+" of "
}Q+=ah+" results";
if(H!==null){Q+=' found for <span class="searchTermCrumbs">"';
if(V!==null){Q+='<a href="'+f+'">'+$("<div/>").text(UPX_searchResults.unescapeUrlFromSearch(H)).html()+"</a>";
Q+="&#160;&#187; ";
Q+='<a href="'+r+'">'+UPX_searchResults.unescapeUrlFromSearch(L)+"</a>";
Q+="&#160;&#187; ";
Q+=UPX_searchResults.unescapeUrlFromSearch(V)
}else{if(L!==null){Q+='<a href="'+f+'">'+$("<div/>").text(UPX_searchResults.unescapeUrlFromSearch(H)).html()+"</a>";
Q+="&#160;&#187; ";
Q+=UPX_searchResults.unescapeUrlFromSearch(L)
}else{Q+=$("<div/>").text(UPX_searchResults.unescapeUrlFromSearch(H)).html()
}}Q+='"</span>'
}w.totalCount.html(Q);
if(H!==null){w.searchField.val(UPX_searchResults.unescapeUrlFromSearch(H))
}var ai=Math.floor(parseInt(W.response.numFound)/b);
af="&q="+UPX_searchResults.escapeUrlForSearch(H);
if(L!==null){af+="&fq=category:%22"+UPX_searchResults.escapeUrlForSearch(L)+"%22"
}if(V!==null){af+="&fq=subcategory:%22"+UPX_searchResults.escapeUrlForSearch(V)+"%22"
}var O=0;
var K="<ul>";
if(A>0){K+="<li><a name='searchResults_previous' href=\"javascript:UPX_searchResults.runQuery('"+af+"',"+(A-1)+')">Previous</a></li>'
}else{if(ah>b){K+="<li class='apts_paginate_item_disabled'>Previous</li>"
}}var I=x/2;
var R=A-I;
if(R<0){R=0
}var P=R+x;
if(P>ai){if(parseInt(W.response.numFound)%b===0){P=ai-1
}else{P=ai
}}if(ah>b){for(O=R;
O<=P;
O++){if(O!=A){K+="<li><a name='searchResults_page"+(O+1)+"' href=\"javascript:UPX_searchResults.runQuery('"+af+"',"+O+')">'+(O+1)+"</a></li>"
}else{K+="<li class='current'>"+(O+1)+"</li>"
}}}if(A<P){K+="<li><a name='searchResults_next' href=\"javascript:UPX_searchResults.runQuery('"+af+"',"+((A*1)+1)+')">Next</a></li>'
}else{if(ah>b){K+="<li class='apts_paginate_item_disabled'>Next</li>"
}}K+="</ul>";
$("#apts_search_page_paginator_top").html(K);
$("#apts_search_page_paginator_bot").html(K);
if($("#apts_search_page_paginator_bot ul li").length>0){$("#bottomRow").show()
}$(".footerTab_1").css("display","none");
$(".footerTab_1").css("display","block");
document.location.hash=c;
c=document.location.hash;
if(typeof cmCreatePageviewTag=="function"){if(typeof coremetricsStartPath==="undefined"){window.coremetricsStartPath="/acloud"
}if(ah>0){cmCreatePageviewTag("Search Successful: Page "+(A+1),coremetricsStartPath+E,H,ah)
}else{cmCreatePageviewTag("Search Unsuccessful",coremetricsStartPath+E,H,ah)
}}})
},followFacetLink:function(E,C,B){E=utils.escapejQuerySelector(E);
var A=$("#"+E);
var D=null;
if($(A).hasClass("subcategory")){if($("#searchResultsCategoryName a").length==0){D=$("#searchResultsCategoryName span").text();
$("#searchResultsCategoryName").html("<a id='searchResults_viewCategory' href=\""+r+'">'+h+UPX_searchResults.unescapeUrlFromSearch(D)+"</a>")
}}else{D=$("#searchResultsCategoryName a").text();
$("#searchResultsCategoryName").html("<span id='searchResults_viewCategory'>"+UPX_searchResults.unescapeUrlFromSearch(D)+"</span>")
}A.parents("ul").find("a").removeClass("disabled");
UPX_searchResults.runQuery(C,B);
A.addClass("disabled")
},followNavigationalAnchorLink:function(C){var B=C.split(o);
var D="";
var A="";
if(B[1]!=="null"){D=B[1];
A+="&q="+D
}if(B[2]!=="null"){D=B[2];
if($.browser&&$.browser.mozilla){A+='&fq=category:"'+D+'"'
}else{A+="&fq=category:%22"+D+"%22"
}}if(B[3]!=="null"){D=B[3];
if($.browser&&$.browser.mozilla){A+='&fq=subcategory:"'+D+'"'
}else{A+="&fq=subcategory:%22"+D+"%22"
}}if($.browser&&$.browser.mozilla){UPX_searchResults.followFacetLink("searchResultsFacet_"+D,A,B[0].substr(1))
}else{window.location.href="javascript:UPX_searchResults.followFacetLink('searchResultsFacet_"+D+"','"+A+"', "+B[0].substr(1)+")"
}},checkAnchorHash:function(){var A=document.location.hash;
if((A.indexOf(o)>=0)&&(c!==A)){UPX_searchResults.followNavigationalAnchorLink(A)
}},followEventBoundLink:function(B){var A="#0"+o+UPX_searchResults.escapeUrlForSearch(B)+o+"null"+o+"null";
window.location.href="/search.html?solr_q="+escape("&q="+UPX_searchResults.escapeUrlForSearch(B))+A
},getDimAutoFilters:function(){var A="";
if(mDesignProps.enableLocationDim!=="false"){UPX_userDefaultValue.ready(function(){s=UPX_userDefaultValue.getOrga();
t=UPX_userDefaultValue.getState();
e=UPX_userDefaultValue.getPostalCode()
});
if(s!==""){if(mDesignProps.orgaBoost!==null){v=mDesignProps.orgaBoost
}A+="&bq=dim_orga:"+s+"^"+v
}if(t!==""){if(mDesignProps.stateBoost!==null){j=mDesignProps.stateBoost
}A+="&bq=dim_state:"+t+"^"+j
}}A+="&facet.field=category&facet.field=subcategory";
return A
},escapeUrlForSearch:function(A){if(A){A=A+"";
A=A.replace(":","\\:");
A=A.replace(/\'/g,"%27");
A=A.replace(/\&/g,"%26");
A=escape(A)
}return A
},unescapeUrlFromSearch:function(A){if(A){A=unescape(A);
A=A.replace(/%26/g,"&");
A=A.replace(/%27/g,"'");
A=A.replace("\\:",":")
}return A
},removeLeftColumn:function(){w.resultsFacets.html("");
w.resultsContainer.removeClass("bordered")
},showLeftColumn:function(C,A,G,E,F,B,D){if(E===null){if(D>0){if(B&&B.length<=0){var H="/bin/servlet/SearchServlet.categories.json/f/site/ac";
COMMONAjaxUtilities.doAjax({url:H,type:"GET",dataType:"json",async:false,timeout:500,success:function(L){var I=L.categories;
var K=I.length;
for(iCatLoop=0;
iCatLoop<K;
iCatLoop++){var J=I[iCatLoop];
if(J.searchFacet){B[J.facetOrder]=J.title.toLowerCase()
}}if(B.length===2){B=aDefaultCategoryStrings
}UPX_searchResults.populateLeftColumn(B,C,A,G,E,F,B,D)
},error:function(I){B=aDefaultCategoryStrings;
UPX_searchResults.populateLeftColumn(B,C,A,G,E,F,B,D)
},statusCode:{404:function(){B=aDefaultCategoryStrings;
UPX_searchResults.populateLeftColumn(B,C,A,G,E,F,B,D)
},500:function(){B=aDefaultCategoryStrings;
UPX_searchResults.populateLeftColumn(B,C,A,G,E,F,B,D)
}}})
}}}},populateLeftColumn:function(O,G,P,E,F,M,O,C){var L="";
var N="";
N+="<h2>Narrow Your Results</h2>";
var I=[];
N+='<ul class="facetCategoryLinks">';
if(E!==null){facetQry="&q="+UPX_searchResults.escapeUrlForSearch(M);
N+="<li><a id='searchResults_viewAllResults' href=\"javascript:UPX_searchResults.runQuery('"+facetQry+"',0)\">"+h+"All results</a></li>";
facetQry="&q="+UPX_searchResults.escapeUrlForSearch(M)+"&fq=category:%22"+UPX_searchResults.escapeUrlForSearch(E)+"%22";
N+="<li id='searchResultsCategoryName'><span id='searchResults_viewCategory'>"+UPX_searchResults.unescapeUrlFromSearch(E)+"</span></li>"
}else{N+="<li><span id='searchResults_viewAllResults'>&nbsp;</span></li>"
}for(countFacetsLoopCount=0;
countFacetsLoopCount<P;
countFacetsLoopCount++){var B=G[countFacetsLoopCount];
var H=true;
if((countFacetsLoopCount%2)===0){if($.inArray(B.toLowerCase(),d)>=0){H=false;
countFacetsLoopCount++
}if(E===null&&H){var A=$.inArray(B.toLowerCase(),O);
if(A>=0){facetQry="&q="+UPX_searchResults.escapeUrlForSearch(M)+"&fq=category:%22"+UPX_searchResults.escapeUrlForSearch(B)+"%22";
L="<a id='searchResultsFacet_"+B+"' href=\"javascript:UPX_searchResults.followFacetLink('searchResultsFacet_"+B+"','"+facetQry+"',0)\">"+B
}else{countFacetsLoopCount++
}}else{if(F===null&&H){facetQry="&q="+UPX_searchResults.escapeUrlForSearch(M)+"&fq=category:%22"+UPX_searchResults.escapeUrlForSearch(E)+"%22&fq=subcategory:%22"+UPX_searchResults.escapeUrlForSearch(B)+"%22";
L="<a class='subcategory' id='searchResultsFacet_"+B+"' href=\"javascript:UPX_searchResults.followFacetLink('searchResultsFacet_"+B+"','"+facetQry+"',0)\">"+B
}}}else{L+=" ("+B+")</a>";
if(B!==0){if(E===null){I[A]="<li>"+L+"</li>"
}else{N+="<li>"+L+"</li>"
}}else{break
}}}if(F===null){for(var K=1,J=I.length;
K<J;
K++){var D=I[K];
if(D&&D!=undefined){N+=D
}}}N+="</ul>";
w.resultsFacets.html(N)
}}
}();