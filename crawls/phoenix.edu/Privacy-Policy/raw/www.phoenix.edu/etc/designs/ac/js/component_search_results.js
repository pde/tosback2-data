UPX.searchResults=function(){var m,d,g=[],n=[],t=["","programs","admissions","colleges & divisions","courses","articles","news & media"],B={resultsFacets:null,resultsContainer:null,totalCount:null,searchField:null,searchSubmit:null,searchForm:null},E={inputDefaultText:"Search"},e=["null","uncategorized"],o,p,c="#",v='<span class="linkSuffix">&#160;&#187;</span>',j='<span class="linkPrefix">&#171;&#160;</span>',s="||||",a="",b=10,C=10,r=new Array(),y="",x="",f="",u="",A="7.0",l="7.0",i=false,q=160,k=/\&q\=([^\&]*)\&?/,D=/\&fq\=category\:([^\&]*)\&?/,z=/\&fq\=subcategory\:([^\&]*)\&?/,h=null,w=null;
return{init:function(){var F=UPX.getSearchResultsInitializationParams();
p=F.solrSuggestUrl;
a=F.prefix;
b=F.numResPerPage;
C=F.numPages;
o=F.solrSearchUrl;
i=F.sortPopularity;
q=F.blurbLengthFromProp;
m=F.mDesignProps;
searchQuery=F.strQuery;
UPX.searchResults.cacheFormElements();
UPX.searchResults.bindEvents();
if(B.resultsContainer.length>0){u=UPX.searchResults.getDimAutoFilters();
$(window).unbind("hashchange.UPX.searchResults").bind("hashchange.UPX.searchResults",function(){UPX.searchResults.checkAnchorHash()
});
UPX.searchResults.runQuery(searchQuery,0)
}},bindEvents:function(){(B.searchField).off("focus.UPX.searchResults").on("focus.UPX.searchResults",function(G){var F=$(G.target);
if(F.val()&&F.val().match(/Search/)){F.val("")
}});
(B.searchField).off("blur.UPX.searchResults").on("blur.UPX.searchResults",function(G){var F=$(G.target);
if(!F.val()||F.val()===""){F.val(E.inputDefaultText)
}});
(B.searchForm).off("submit.UPX.searchResults").on("submit.UPX.searchResults",function(G){var G=G||window.event;
var F=$(G.target);
G.preventDefault();
UPX.searchResults.followEventBoundLink(F.find(".searchField").val())
});
(B.searchField).off("keyup.UPX.searchResults").on("keyup.UPX.searchResults",function(G){var F=$(G.target);
if(G.keyCode==13){UPX.searchResults.followEventBoundLink(F.val())
}});
UPX_autoComplete.init({searchInput:B.searchField,url:p+"/?wt=json&json.wrf=?&jsoncallback=?",delay:300,resultFn:function(F){UPX.searchResults.followEventBoundLink(F)
}})
},cacheFormElements:function(){B.resultsFacets=$("#apts_search_results_facets");
B.resultsContainer=$("#apts_search_page_frame");
B.totalCount=$("#apts_total_count");
B.searchField=$(".searchField");
B.searchSubmit=$(".searchSubmit");
B.searchForm=$(".searchForm")
},runQuery:function(G,F){var H=o+"/?wt=json&json.wrf=?&jsoncallback=?&"+G+u,J="/search/",I;
if(i){H+="&sort=page_views desc"
}if(!b){b=0
}I=(F*b);
H+="&rows="+b+"&start="+I;
COMMONAjaxUtilities.doJSON(H,{},function(ab){var al,ad=0,X=ab.response.docs,K=k.exec(G),Z=D.exec(G),O=z.exec(G),M=null,Q=null,aa=null,ak=G,L,am;
if((K!==null)&&(K.length===2)){M=K[1];
ak="&q="+UPX.searchResults.escapeUrlForSearch(M);
h="javascript:UPX.searchResults.runQuery('"+ak+"',0)"
}if((Z!==null)&&(Z.length===2)){Q=Z[1].replace(/\"/g,"");
J+=Q+"/";
ak="&q="+UPX.searchResults.escapeUrlForSearch(M)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(Q)+"%22";
w="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+Q+"','"+ak+"',0)"
}if((O!==null)&&(O.length===2)){aa=O[1].replace(/\"/g,"");
J+=aa+"/"
}c="#"+F+s+UPX.searchResults.escapeUrlForSearch(M)+s+UPX.searchResults.escapeUrlForSearch(Q)+s+UPX.searchResults.escapeUrlForSearch(aa);
L=X.length;
am=ab.response.numFound;
if(L>0){var ai="<ul>";
for(al=ad;
al<L;
al++){var ao=X[al];
var S=ao.blurb.substring(0,q);
S=S.substring(0,S.lastIndexOf(" "));
if(ao.blurb.length>q||ao.blurb.indexOf("...")!=-1){S+="..."
}ai+="<li>";
ai+="<div class='resultContent'><a href='"+ao.url+".html' name='searchResults_"+(ao.title).replace(/[^a-zA-Z0-9]+/gi,"_")+"'>"+ao.title+"</a><p>"+utils.replaceUnicodeCharactersForDisplay(S)+"</p></div>";
ai+="</li>"
}ai+="</ul>";
B.resultsContainer.addClass("bordered")
}else{var Y=null;
ai="";
if(ab.spellcheck.suggestions!==null&&ab.spellcheck.suggestions.length>=2&&ab.spellcheck.suggestions[1].suggestion!==null){var ac=0;
var af=null;
Y=ab.spellcheck.suggestions[1].suggestion;
if(Y!==null&&Y.length>0){ai+='<h2>Did you mean "';
ac=Y.length;
for(var ag=0;
ag<ac;
ag++){af=Y[ag];
if(af!==null){ak="&q="+UPX.searchResults.escapeUrlForSearch(af);
ai+="<a href=\"javascript:UPX.searchResults.runQuery('"+ak+"',0)\">"+UPX.searchResults.unescapeUrlFromSearch(af)+"</a>";
if(ac>1){if(ag!==(ac-1)){ai+=", "
}}}}ai+='?"</h2>'
}}ai+=$("#apts_search_noresults").html()
}B.resultsContainer.html(ai);
var ae=null;
var R=0;
if(Q===null){ae=ab.facet_counts.facet_fields.category;
if(ae){R=ae.length
}}else{if(Q!==null){ae=ab.facet_counts.facet_fields.subcategory;
if(ae){R=ae.length
}}}if(R>0){UPX.searchResults.showLeftColumn(ae,R,Q,aa,M,n,L)
}if(L<=0){UPX.searchResults.removeLeftColumn()
}var aj=((F*b)+1);
var ah=((F*b)+b);
if(ah>am){ah=am
}var V="";
if(am>0){V+="Displaying "+aj+"-"+ah+" of "
}V+=am+" results";
if(M!==null){V+=' found for <span class="searchTermCrumbs">"';
if(aa!==null){V+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(M)).html()+"</a>";
V+="&#160;&#187; ";
V+='<a href="'+w+'">'+UPX.searchResults.unescapeUrlFromSearch(Q)+"</a>";
V+="&#160;&#187; ";
V+=UPX.searchResults.unescapeUrlFromSearch(aa)
}else{if(Q!==null){V+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(M)).html()+"</a>";
V+="&#160;&#187; ";
V+=UPX.searchResults.unescapeUrlFromSearch(Q)
}else{V+=$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(M)).html()
}}V+='"</span>'
}B.totalCount.html(V);
if(M!==null){B.searchField.val(UPX.searchResults.unescapeUrlFromSearch(M))
}var an=Math.floor(parseInt(ab.response.numFound)/b);
ak="&q="+UPX.searchResults.escapeUrlForSearch(M);
if(Q!==null){ak+="&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(Q)+"%22"
}if(aa!==null){ak+="&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(aa)+"%22"
}var T=0;
var P="<ul>";
if(F>0){P+="<li><a name='searchResults_previous' href=\"javascript:UPX.searchResults.runQuery('"+ak+"',"+(F-1)+')">Previous</a></li>'
}else{if(am>b){P+="<li class='apts_paginate_item_disabled'>Previous</li>"
}}var N=C/2;
var W=F-N;
if(W<0){W=0
}var U=W+C;
if(U>an){if(parseInt(ab.response.numFound)%b===0){U=an-1
}else{U=an
}}if(am>b){for(T=W;
T<=U;
T++){if(T!=F){P+="<li><a name='searchResults_page"+(T+1)+"' href=\"javascript:UPX.searchResults.runQuery('"+ak+"',"+T+')">'+(T+1)+"</a></li>"
}else{P+="<li class='current'>"+(T+1)+"</li>"
}}}if(F<U){P+="<li><a name='searchResults_next' href=\"javascript:UPX.searchResults.runQuery('"+ak+"',"+((F*1)+1)+')">Next</a></li>'
}else{if(am>b){P+="<li class='apts_paginate_item_disabled'>Next</li>"
}}P+="</ul>";
$("#apts_search_page_paginator_top").html(P);
$("#apts_search_page_paginator_bot").html(P);
if($("#apts_search_page_paginator_bot ul li").length>0){$("#bottomRow").show()
}$(".footerTab_1").css("display","none");
$(".footerTab_1").css("display","block");
document.location.hash=c;
c=document.location.hash;
if(typeof cmCreatePageviewTag=="function"){if(typeof coremetricsStartPath==="undefined"){window.coremetricsStartPath="/acloud"
}if(am>0){cmCreatePageviewTag("Search Successful: Page "+(F+1),coremetricsStartPath+J,M,am)
}else{cmCreatePageviewTag("Search Unsuccessful",coremetricsStartPath+J,M,am)
}}})
},followFacetLink:function(J,H,G){J=utils.escapejQuerySelector(J);
var F=$("#"+J),I=null;
if($(F).hasClass("subcategory")){if($("#searchResultsCategoryName a").length==0){I=$("#searchResultsCategoryName span").text();
$("#searchResultsCategoryName").html("<a id='searchResults_viewCategory' href=\""+w+'">'+j+UPX.searchResults.unescapeUrlFromSearch(I)+"</a>")
}}else{I=$("#searchResultsCategoryName a").text();
$("#searchResultsCategoryName").html("<span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(I)+"</span>")
}F.parents("ul").find("a").removeClass("disabled");
UPX.searchResults.runQuery(H,G);
F.addClass("disabled")
},followNavigationalAnchorLink:function(H){var G=H.split(s),I="",F="";
if(G[1]!=="null"){I=G[1];
F+="&q="+I
}if(G[2]!=="null"){I=G[2];
if($.browser&&$.browser.mozilla){F+='&fq=category:"'+I+'"'
}else{F+="&fq=category:%22"+I+"%22"
}}if(G[3]!=="null"){I=G[3];
if($.browser&&$.browser.mozilla){F+='&fq=subcategory:"'+I+'"'
}else{F+="&fq=subcategory:%22"+I+"%22"
}}if($.browser&&$.browser.mozilla){UPX.searchResults.followFacetLink("searchResultsFacet_"+I,F,G[0].substr(1))
}else{window.location.href="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+I+"','"+F+"', "+G[0].substr(1)+")"
}},checkAnchorHash:function(){var F=document.location.hash;
if((F.indexOf(s)>=0)&&(c!==F)){UPX.searchResults.followNavigationalAnchorLink(F)
}},followEventBoundLink:function(G){var F="#0"+s+UPX.searchResults.escapeUrlForSearch(G)+s+"null"+s+"null";
window.location.href="/search.html?solr_q="+escape("&q="+UPX.searchResults.escapeUrlForSearch(G))+F
},getDimAutoFilters:function(){var F="";
if(m.enableLocationDim!=="false"){UPX_userDefaultValue.ready(function(){y=UPX_userDefaultValue.getOrga();
x=UPX_userDefaultValue.getState();
f=UPX_userDefaultValue.getPostalCode()
});
if(y!==""){if(m.orgaBoost!==null){A=m.orgaBoost
}F+="&bq=dim_orga:"+y+"^"+A
}if(x!==""){if(m.stateBoost!==null){l=m.stateBoost
}F+="&bq=dim_state:"+x+"^"+l
}}F+="&facet.field=category&facet.field=subcategory";
return F
},escapeUrlForSearch:function(F){if(F){F=F+"";
F=F.replace(":","\\:");
F=F.replace(/\'/g,"%27");
F=F.replace(/\&/g,"%26");
F=escape(F)
}return F
},unescapeUrlFromSearch:function(F){if(F){F=unescape(F);
F=F.replace(/%26/g,"&");
F=F.replace(/%27/g,"'");
F=F.replace("\\:",":")
}return F
},removeLeftColumn:function(){B.resultsFacets.html("");
B.resultsContainer.removeClass("bordered")
},showLeftColumn:function(H,F,L,J,K,G,I){if(J===null){if(I>0){if(G&&G.length<=0){var M="/bin/servlet/SearchServlet.categories.json/f/site/ac";
COMMONAjaxUtilities.doAjax({url:M,type:"GET",dataType:"json",async:false,timeout:500,success:function(Q){var N=Q.categories,P=N.length;
for(iCatLoop=0;
iCatLoop<P;
iCatLoop++){var O=N[iCatLoop];
if(O.searchFacet){G[O.facetOrder]=O.title.toLowerCase()
}}if(G.length===2){G=t
}UPX.searchResults.populateLeftColumn(G,H,F,L,J,K,G,I)
},error:function(N){G=t;
UPX.searchResults.populateLeftColumn(G,H,F,L,J,K,G,I)
},statusCode:{404:function(){G=t;
UPX.searchResults.populateLeftColumn(G,H,F,L,J,K,G,I)
},500:function(){G=t;
UPX.searchResults.populateLeftColumn(G,H,F,L,J,K,G,I)
}}})
}}}},populateLeftColumn:function(T,L,U,J,K,R,T,H){var Q="",S="<h2>Narrow Your Results</h2>",N=[];
S+='<ul class="facetCategoryLinks">';
if(J!==null){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(R);
S+="<li><a id='searchResults_viewAllResults' href=\"javascript:UPX.searchResults.runQuery('"+facetQry+"',0)\">"+j+"All results</a></li>";
facetQry="&q="+UPX.searchResults.escapeUrlForSearch(R)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(J)+"%22";
S+="<li id='searchResultsCategoryName'><span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(J)+"</span></li>"
}else{S+="<li><span id='searchResults_viewAllResults'>&nbsp;</span></li>"
}for(countFacetsLoopCount=0;
countFacetsLoopCount<U;
countFacetsLoopCount++){var G=L[countFacetsLoopCount];
var M=true;
if((countFacetsLoopCount%2)===0){if($.inArray(G.toLowerCase(),e)>=0){M=false;
countFacetsLoopCount++
}if(J===null&&M){var F=$.inArray(G.toLowerCase(),T);
if(F>=0){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(R)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(G)+"%22";
Q="<a id='searchResultsFacet_"+G+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+G+"','"+facetQry+"',0)\">"+G
}else{countFacetsLoopCount++
}}else{if(K===null&&M){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(R)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(J)+"%22&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(G)+"%22";
Q="<a class='subcategory' id='searchResultsFacet_"+G+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+G+"','"+facetQry+"',0)\">"+G
}}}else{Q+=" ("+G+")</a>";
if(G!==0){if(J===null){N[F]="<li>"+Q+"</li>"
}else{S+="<li>"+Q+"</li>"
}}else{break
}}}if(K===null){for(var P=1,O=N.length;
P<O;
P++){var I=N[P];
if(I&&I!=undefined){S+=I
}}}S+="</ul>";
B.resultsFacets.html(S)
}}
}();
UPX.searchResults.init();