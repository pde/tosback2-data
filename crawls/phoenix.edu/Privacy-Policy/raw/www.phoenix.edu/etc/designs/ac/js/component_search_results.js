UPX.searchResults=function(){var m,d,g=[],n=[],u=["","programs","admissions","colleges & divisions","courses","articles","news & media"],C={resultsFacets:null,resultsContainer:null,totalCount:null,searchField:null,searchSubmit:null,searchForm:null},F={inputDefaultText:"Search"},e=["null","uncategorized"],o,p,c="#",w='<span class="linkSuffix">&#160;&#187;</span>',j='<span class="linkPrefix">&#171;&#160;</span>',t="||||",a="",b=10,D=10,r=new Array(),z="",y="",f="",v="",B="7.0",l="7.0",i=false,q=160,k=/\&q\=([^\&]*)\&?/,E=/\&fq\=category\:([^\&]*)\&?/,A=/\&fq\=subcategory\:([^\&]*)\&?/,h=null,x=null;
return{init:function(){var H=UPX.getSearchResultsInitializationParams();
p=H.solrSuggestUrl;
a=H.prefix;
b=H.numResPerPage;
D=H.numPages;
o=H.solrSearchUrl;
UPXbSortPopularity=H.sortPopularity;
q=H.blurbLengthFromProp;
m=H.mDesignProps;
searchQuery=H.strQuery;
UPX.searchResults.cacheFormElements();
UPX.searchResults.bindEvents();
if(C.resultsContainer.length>0){v=UPX.searchResults.getDimAutoFilters();
$(window).unbind("hashchange.UPX.searchResults").bind("hashchange.UPX.searchResults",function(){UPX.searchResults.checkAnchorHash()
});
UPX.searchResults.runQuery(searchQuery,0)
}var G=H
},bindEvents:function(){(C.searchField).off("focus.UPX.searchResults").on("focus.UPX.searchResults",function(H){var G=$(H.target);
if(G.val()&&G.val().match(/Search/)){G.val("")
}});
(C.searchField).off("blur.UPX.searchResults").on("blur.UPX.searchResults",function(H){var G=$(H.target);
if(!G.val()||G.val()===""){G.val(F.inputDefaultText)
}});
(C.searchForm).off("submit.UPX.searchResults").on("submit.UPX.searchResults",function(H){var H=H||window.event;
var G=$(H.target);
H.preventDefault();
UPX.searchResults.followEventBoundLink(G.find(".searchField").val())
});
(C.searchField).off("keyup.UPX.searchResults").on("keyup.UPX.searchResults",function(H){var G=$(H.target);
if(H.keyCode==13){UPX.searchResults.followEventBoundLink(G.val())
}});
UPX_autoComplete.init({searchInput:C.searchField,url:p+"/?wt=json&json.wrf=?&jsoncallback=?",delay:300,resultFn:function(G){UPX.searchResults.followEventBoundLink(G)
}})
},cacheFormElements:function(){C.resultsFacets=$("#apts_search_results_facets");
C.resultsContainer=$("#apts_search_page_frame");
C.totalCount=$("#apts_total_count");
C.searchField=$(".searchField");
C.searchSubmit=$(".searchSubmit");
C.searchForm=$(".searchForm")
},runQuery:function(H,G){var I=o+"/?wt=json&json.wrf=?&jsoncallback=?&"+H+v,K="/search/",J;
if(i){I+="&sort=page_views desc"
}if(!b){b=0
}J=(G*b);
I+="&rows="+b+"&start="+J;
COMMONAjaxUtilities.doJSON(I,{},function(ac){var an,ae=0,Y=ac.response.docs,L=k.exec(H),aa=E.exec(H),P=A.exec(H),N=null,R=null,ab=null,am=H,M,ao;
if((L!==null)&&(L.length===2)){N=L[1];
am="&q="+UPX.searchResults.escapeUrlForSearch(N);
h="javascript:UPX.searchResults.runQuery('"+am+"',0)"
}if((aa!==null)&&(aa.length===2)){R=aa[1].replace(/\"/g,"");
K+=R+"/";
am="&q="+UPX.searchResults.escapeUrlForSearch(N)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(R)+"%22";
x="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+R+"','"+am+"',0)"
}if((P!==null)&&(P.length===2)){ab=P[1].replace(/\"/g,"");
K+=ab+"/"
}c="#"+G+t+UPX.searchResults.escapeUrlForSearch(N)+t+UPX.searchResults.escapeUrlForSearch(R)+t+UPX.searchResults.escapeUrlForSearch(ab);
M=Y.length;
ao=ac.response.numFound;
if(M>0){var ak="<ul>";
for(an=ae;
an<M;
an++){var aq=Y[an];
var T=aq.blurb.substring(0,q);
T=T.substring(0,T.lastIndexOf(" "));
if(aq.blurb.length>q||aq.blurb.indexOf("...")!=-1){T+="..."
}ak+="<li>";
ak+="<div class='resultContent'><a href='"+aq.url+".html' name='searchResults_"+(aq.title).replace(/[^a-zA-Z0-9]+/gi,"_")+"'>"+aq.title+"</a><p>"+utils.replaceUnicodeCharactersForDisplay(T)+"</p></div>";
ak+="</li>"
}ak+="</ul>";
C.resultsContainer.addClass("bordered")
}else{var Z=null;
ak="";
if(ac.spellcheck.suggestions!==null&&ac.spellcheck.suggestions.length>=2&&ac.spellcheck.suggestions[1].suggestion!==null){var ad=0;
var ag=null;
Z=ac.spellcheck.suggestions[1].suggestion;
if(Z!==null&&Z.length>0){ak+='<h2>Did you mean "';
ad=Z.length;
for(var ai=0;
ai<ad;
ai++){ag=Z[ai];
if(ag!==null){am="&q="+UPX.searchResults.escapeUrlForSearch(ag);
ak+="<a href=\"javascript:UPX.searchResults.runQuery('"+am+"',0)\">"+UPX.searchResults.unescapeUrlFromSearch(ag)+"</a>";
if(ad>1){if(ai!==(ad-1)){ak+=", "
}}}}ak+='?"</h2>'
}}ak+=$("#apts_search_noresults").html()
}C.resultsContainer.html(ak);
var af=null;
var S=0;
if(R===null){af=ac.facet_counts.facet_fields.category;
if(af){S=af.length
}}else{if(R!==null){af=ac.facet_counts.facet_fields.subcategory;
if(af){S=af.length
}}}if(S>0){UPX.searchResults.showLeftColumn(af,S,R,ab,N,n,M)
}if(M<=0){UPX.searchResults.removeLeftColumn()
}var al=((G*b)+1);
var aj=((G*b)+b);
if(aj>ao){aj=ao
}var W="";
if(ao>0){W+="Displaying "+al+"-"+aj+" of "
}W+=ao+" results";
if(N!==null){W+=' found for <span class="searchTermCrumbs">"';
if(ab!==null){W+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(N)).html()+"</a>";
W+="&#160;&#187; ";
W+='<a href="'+x+'">'+UPX.searchResults.unescapeUrlFromSearch(R)+"</a>";
W+="&#160;&#187; ";
W+=UPX.searchResults.unescapeUrlFromSearch(ab)
}else{if(R!==null){W+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(N)).html()+"</a>";
W+="&#160;&#187; ";
W+=UPX.searchResults.unescapeUrlFromSearch(R)
}else{W+=$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(N)).html()
}}W+='"</span>'
}C.totalCount.html(W);
if(N!==null){C.searchField.val(UPX.searchResults.unescapeUrlFromSearch(N))
}var ap=Math.floor(parseInt(ac.response.numFound)/b);
am="&q="+UPX.searchResults.escapeUrlForSearch(N);
if(R!==null){am+="&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(R)+"%22"
}if(ab!==null){am+="&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(ab)+"%22"
}var U=0;
var Q="<ul>";
if(G>0){Q+="<li><a name='searchResults_previous' href=\"javascript:UPX.searchResults.runQuery('"+am+"',"+(G-1)+')">Previous</a></li>'
}else{if(ao>b){Q+="<li class='apts_paginate_item_disabled'>Previous</li>"
}}var O=D/2;
var X=G-O;
if(X<0){X=0
}var V=X+D;
if(V>ap){if(parseInt(ac.response.numFound)%b===0){V=ap-1
}else{V=ap
}}if(ao>b){for(U=X;
U<=V;
U++){if(U!=G){Q+="<li><a name='searchResults_page"+(U+1)+"' href=\"javascript:UPX.searchResults.runQuery('"+am+"',"+U+')">'+(U+1)+"</a></li>"
}else{Q+="<li class='current'>"+(U+1)+"</li>"
}}}if(G<V){Q+="<li><a name='searchResults_next' href=\"javascript:UPX.searchResults.runQuery('"+am+"',"+((G*1)+1)+')">Next</a></li>'
}else{if(ao>b){Q+="<li class='apts_paginate_item_disabled'>Next</li>"
}}Q+="</ul>";
$("#apts_search_page_paginator_top").html(Q);
$("#apts_search_page_paginator_bot").html(Q);
if($("#apts_search_page_paginator_bot ul li").length>0){$("#bottomRow").show()
}$(".footerTab_1").css("display","none");
$(".footerTab_1").css("display","block");
document.location.hash=c;
c=document.location.hash;
if(typeof cmCreatePageviewTag=="function"){if(typeof coremetricsStartPath==="undefined"){window.coremetricsStartPath="/acloud"
}if(ao>0){cmCreatePageviewTag("Search Successful: Page "+(G+1),coremetricsStartPath+K,N,ao)
}else{cmCreatePageviewTag("Search Unsuccessful",coremetricsStartPath+K,N,ao)
}}var ah=window.setInterval(function(){try{if(s){window.clearInterval(ah);
sc.prop16="mktg:main";
sc.prop17=N.toLowerCase();
sc.prop18=(ao+"").toLowerCase();
sc.prop19=(typeof(R)=="string")?unescape(R).toLowerCase():"";
sc.prop20="";
sc.eVar21="D=c16";
sc.eVar22="D=c17";
if(ao>0){sc.events="event10"
}else{sc.events="event10,event11"
}sc.init();
s.t()
}}catch(ar){}},1000)
})
},followFacetLink:function(K,I,H){K=utils.escapejQuerySelector(K);
var G=$("#"+K),J=null;
if($(G).hasClass("subcategory")){if($("#searchResultsCategoryName a").length==0){J=$("#searchResultsCategoryName span").text();
$("#searchResultsCategoryName").html("<a id='searchResults_viewCategory' href=\""+x+'">'+j+UPX.searchResults.unescapeUrlFromSearch(J)+"</a>")
}}else{J=$("#searchResultsCategoryName a").text();
$("#searchResultsCategoryName").html("<span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(J)+"</span>")
}G.parents("ul").find("a").removeClass("disabled");
UPX.searchResults.runQuery(I,H);
G.addClass("disabled")
},followNavigationalAnchorLink:function(I){var H=I.split(t),J="",G="";
if(H[1]!=="null"){J=H[1];
G+="&q="+J
}if(H[2]!=="null"){J=H[2];
if($.browser&&$.browser.mozilla){G+='&fq=category:"'+J+'"'
}else{G+="&fq=category:%22"+J+"%22"
}}if(H[3]!=="null"){J=H[3];
if($.browser&&$.browser.mozilla){G+='&fq=subcategory:"'+J+'"'
}else{G+="&fq=subcategory:%22"+J+"%22"
}}if($.browser&&$.browser.mozilla){UPX.searchResults.followFacetLink("searchResultsFacet_"+J,G,H[0].substr(1))
}else{window.location.href="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+J+"','"+G+"', "+H[0].substr(1)+")"
}},checkAnchorHash:function(){var G=document.location.hash;
if((G.indexOf(t)>=0)&&(c!==G)){UPX.searchResults.followNavigationalAnchorLink(G)
}},followEventBoundLink:function(H){if(H!==""&&!H.match(/search/i)){var G="#0"+t+UPX.searchResults.escapeUrlForSearch(H)+t+"null"+t+"null";
window.location.href="/search.html?solr_q="+escape("&q="+UPX.searchResults.escapeUrlForSearch(H))+G
}},getDimAutoFilters:function(){var G="";
if(m.enableLocationDim!=="false"){UPX_userDefaultValue.ready(function(){z=UPX_userDefaultValue.getOrga();
y=UPX_userDefaultValue.getState();
f=UPX_userDefaultValue.getPostalCode()
});
if(z!==""){if(m.orgaBoost!==null){B=m.orgaBoost
}G+="&bq=dim_orga:"+z+"^"+B
}if(y!==""){if(m.stateBoost!==null){l=m.stateBoost
}G+="&bq=dim_state:"+y+"^"+l
}}G+="&facet.field=category&facet.field=subcategory";
return G
},escapeUrlForSearch:function(G){if(G){G=G+"";
G=G.replace(":","\\:");
G=G.replace(/\'/g,"%27");
G=G.replace(/\&/g,"%26");
G=escape(G)
}return G
},unescapeUrlFromSearch:function(G){if(G){G=unescape(G);
G=G.replace(/%26/g,"&");
G=G.replace(/%27/g,"'");
G=G.replace("\\:",":")
}return G
},removeLeftColumn:function(){C.resultsFacets.html("");
C.resultsContainer.removeClass("bordered")
},showLeftColumn:function(I,G,M,K,L,H,J){if(K===null){if(J>0){if(H&&H.length<=0){var N="/bin/servlet/SearchServlet.categories.json/f/site/ac";
COMMONAjaxUtilities.doAjax({url:N,type:"GET",dataType:"json",async:false,timeout:500,success:function(R){var O=R.categories,Q=O.length;
for(iCatLoop=0;
iCatLoop<Q;
iCatLoop++){var P=O[iCatLoop];
if(P.searchFacet){H[P.facetOrder]=P.title.toLowerCase()
}}if(H.length===2){H=u
}UPX.searchResults.populateLeftColumn(H,I,G,M,K,L,H,J)
},error:function(O){H=u;
UPX.searchResults.populateLeftColumn(H,I,G,M,K,L,H,J)
},statusCode:{404:function(){H=u;
UPX.searchResults.populateLeftColumn(H,I,G,M,K,L,H,J)
},500:function(){H=u;
UPX.searchResults.populateLeftColumn(H,I,G,M,K,L,H,J)
}}})
}}}},populateLeftColumn:function(U,M,V,K,L,S,U,I){var R="",T="<h2>Narrow Your Results</h2>",O=[];
T+='<ul class="facetCategoryLinks">';
if(K!==null){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(S);
T+="<li><a id='searchResults_viewAllResults' href=\"javascript:UPX.searchResults.runQuery('"+facetQry+"',0)\">"+j+"All results</a></li>";
facetQry="&q="+UPX.searchResults.escapeUrlForSearch(S)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(K)+"%22";
T+="<li id='searchResultsCategoryName'><span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(K)+"</span></li>"
}else{T+="<li><span id='searchResults_viewAllResults'>&nbsp;</span></li>"
}for(countFacetsLoopCount=0;
countFacetsLoopCount<V;
countFacetsLoopCount++){var H=M[countFacetsLoopCount];
var N=true;
if((countFacetsLoopCount%2)===0){if($.inArray(H.toLowerCase(),e)>=0){N=false;
countFacetsLoopCount++
}if(K===null&&N){var G=$.inArray(H.toLowerCase(),U);
if(G>=0){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(S)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(H)+"%22";
R="<a id='searchResultsFacet_"+H+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+H+"','"+facetQry+"',0)\">"+H
}else{countFacetsLoopCount++
}}else{if(L===null&&N){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(S)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(K)+"%22&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(H)+"%22";
R="<a class='subcategory' id='searchResultsFacet_"+H+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+H+"','"+facetQry+"',0)\">"+H
}}}else{R+=" ("+H+")</a>";
if(H!==0){if(K===null){O[G]="<li>"+R+"</li>"
}else{T+="<li>"+R+"</li>"
}}else{break
}}}if(L===null){for(var Q=1,P=O.length;
Q<P;
Q++){var J=O[Q];
if(J&&J!=undefined){T+=J
}}}T+="</ul>";
C.resultsFacets.html(T)
}}
}();
UPX.searchResults.init();