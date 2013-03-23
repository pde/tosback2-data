UPX.searchResults=function(){var n,d,g=[],o=[],C=[],v=["","programs","admissions","colleges_divisions","courses","faculty_article","news_and_media"],l={"":"",programs:"Programs",colleges_divisions:"Colleges & Divisions",courses:"Courses",faculty_article:"Articles",news_and_media:"News & Media"},E={resultsFacets:null,resultsContainer:null,totalCount:null,searchField:null,searchSubmit:null,searchForm:null},H={inputDefaultText:"Search"},e=["null","uncategorized"],p,q,c="#",x='<span class="linkSuffix">&#160;&#187;</span>',j='<span class="linkPrefix">&#171;&#160;</span>',u="||||",a="",b=10,F=10,t=new Array(),A="",z="",f="",w="",D="7.0",m="7.0",i=false,r=160,k=/\&q\=([^\&]*)\&?/,G=/\&fq\=category\:([^\&]*)\&?/,B=/\&fq\=subcategory\:([^\&]*)\&?/,h=null,y=null;
return{init:function(){var J=UPX.getSearchResultsInitializationParams();
q=J.solrSuggestUrl;
a=J.prefix;
b=J.numResPerPage;
F=J.numPages;
p=J.solrSearchUrl;
UPXbSortPopularity=J.sortPopularity;
r=J.blurbLengthFromProp;
n=J.mDesignProps;
searchQuery=J.strQuery;
UPX.searchResults.cacheFormElements();
UPX.searchResults.bindEvents();
if(E.resultsContainer.length>0){w=UPX.searchResults.getDimAutoFilters();
$(window).unbind("hashchange.UPX.searchResults").bind("hashchange.UPX.searchResults",function(){UPX.searchResults.checkAnchorHash()
});
UPX.searchResults.runQuery(searchQuery,0)
}var I=J
},bindEvents:function(){(E.searchField).off("focus.UPX.searchResults").on("focus.UPX.searchResults",function(J){var I=$(J.target);
if(I.val()&&I.val().match(/Search/)){I.val("")
}});
(E.searchField).off("blur.UPX.searchResults").on("blur.UPX.searchResults",function(J){var I=$(J.target);
if(!I.val()||I.val()===""){I.val(H.inputDefaultText)
}});
(E.searchForm).off("submit.UPX.searchResults").on("submit.UPX.searchResults",function(J){var J=J||window.event;
var I=$(J.target);
J.preventDefault();
UPX.searchResults.followEventBoundLink(I.find(".searchField").val())
});
(E.searchField).off("keyup.UPX.searchResults").on("keyup.UPX.searchResults",function(J){var I=$(J.target);
if(J.keyCode==13){UPX.searchResults.followEventBoundLink(I.val())
}});
UPX_autoComplete.init({searchInput:E.searchField,url:q+"/?wt=json&json.wrf=?&jsoncallback=?",delay:300,resultFn:function(I){UPX.searchResults.followEventBoundLink(I)
}})
},cacheFormElements:function(){E.resultsFacets=$("#apts_search_results_facets");
E.resultsContainer=$("#apts_search_page_frame");
E.totalCount=$("#apts_total_count");
E.searchField=$(".searchField");
E.searchSubmit=$(".searchSubmit");
E.searchForm=$(".searchForm")
},runQuery:function(J,I){var K=p+"/?wt=json&json.wrf=?&jsoncallback=?&"+J+w,M="/search/",L;
if(i){K+="&sort=page_views desc"
}if(!b){b=0
}L=(I*b);
K+="&rows="+b+"&start="+L;
COMMONAjaxUtilities.doJSON(K,{},function(af){var aq,ah=0,ab=af.response.docs,N=k.exec(J),ad=G.exec(J),R=B.exec(J),P=null,T=null,ae=null,ap=J,O,ar;
if((N!==null)&&(N.length===2)){P=N[1];
ap="&q="+UPX.searchResults.escapeUrlForSearch(P);
h="javascript:UPX.searchResults.runQuery('"+ap+"',0)"
}if((ad!==null)&&(ad.length===2)){T=ad[1].replace(/\"/g,"");
M+=T+"/";
ap="&q="+UPX.searchResults.escapeUrlForSearch(P)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(T)+"%22";
y="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+T+"','"+ap+"',0)"
}if((R!==null)&&(R.length===2)){ae=R[1].replace(/\"/g,"");
M+=ae+"/"
}c="#"+I+u+UPX.searchResults.escapeUrlForSearch(P)+u+UPX.searchResults.escapeUrlForSearch(T)+u+UPX.searchResults.escapeUrlForSearch(ae);
O=ab.length;
ar=af.response.numFound;
if(O>0){var an="<ul>";
for(aq=ah;
aq<O;
aq++){var au=ab[aq];
var V=au.blurb.substring(0,r);
V=V.substring(0,V.lastIndexOf(" "));
if(au.blurb.length>r||au.blurb.indexOf("...")!=-1){V+="..."
}var Z=au.url;
if(Z.charAt(0)=="/"){Z+=".html"
}an+="<li>";
an+="<div class='resultContent'><a href='"+Z+"' name='searchResults_"+(au.title).replace(/[^a-zA-Z0-9]+/gi,"_")+"'>"+au.title+"</a><p>"+utils.replaceUnicodeCharactersForDisplay(V)+"</p></div>";
an+="</li>"
}an+="</ul>";
E.resultsContainer.addClass("bordered")
}else{var ac=null;
an="";
if(af.spellcheck.suggestions!==null&&af.spellcheck.suggestions.length>=2&&af.spellcheck.suggestions[1].suggestion!==null){var ag=0;
var aj=null;
ac=af.spellcheck.suggestions[1].suggestion;
if(ac!==null&&ac.length>0){an+='<h2>Did you mean "';
ag=ac.length;
for(var al=0;
al<ag;
al++){aj=ac[al];
if(aj!==null){ap="&q="+UPX.searchResults.escapeUrlForSearch(aj);
an+="<a href=\"javascript:UPX.searchResults.runQuery('"+ap+"',0)\">"+UPX.searchResults.unescapeUrlFromSearch(aj)+"</a>";
if(ag>1){if(al!==(ag-1)){an+=", "
}}}}an+='?"</h2>'
}}an+=$("#apts_search_noresults").html()
}E.resultsContainer.html(an);
var ai=null;
var U=0;
if(T===null){ai=af.facet_counts.facet_fields.category;
if(ai){U=ai.length
}}else{if(T!==null){ai=af.facet_counts.facet_fields.subcategory;
if(ai){U=ai.length
}}}if(U>0){UPX.searchResults.showLeftColumn(ai,U,T,ae,P,o,O)
}if(O<=0){UPX.searchResults.removeLeftColumn()
}var ao=((I*b)+1);
var am=((I*b)+b);
if(am>ar){am=ar
}var Y="";
if(ar>0){Y+="Displaying "+ao+"-"+am+" of "
}Y+=ar+" results";
if(P!==null){Y+=' found for <span class="searchTermCrumbs">"';
if(ae!==null){Y+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(P)).html()+"</a>";
Y+="&#160;&#187; ";
Y+='<a href="'+y+'">'+C[UPX.searchResults.unescapeUrlFromSearch(T).toLowerCase()]+"</a>";
Y+="&#160;&#187; ";
Y+=UPX.searchResults.unescapeUrlFromSearch(ae)
}else{if(T!==null){Y+='<a href="'+h+'">'+$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(P)).html()+"</a>";
Y+="&#160;&#187; ";
Y+=C[UPX.searchResults.unescapeUrlFromSearch(T).toLowerCase()]
}else{Y+=$("<div/>").text(UPX.searchResults.unescapeUrlFromSearch(P)).html()
}}Y+='"</span>'
}E.totalCount.html(Y);
if(P!==null){E.searchField.val(UPX.searchResults.unescapeUrlFromSearch(P))
}var at=Math.floor(parseInt(af.response.numFound)/b);
ap="&q="+UPX.searchResults.escapeUrlForSearch(P);
if(T!==null){ap+="&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(T)+"%22"
}if(ae!==null){ap+="&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(ae)+"%22"
}var W=0;
var S="<ul>";
if(I>0){S+="<li><a name='searchResults_previous' href=\"javascript:UPX.searchResults.runQuery('"+ap+"',"+(I-1)+')">Previous</a></li>'
}else{if(ar>b){S+="<li class='apts_paginate_item_disabled'>Previous</li>"
}}var Q=F/2;
var aa=I-Q;
if(aa<0){aa=0
}var X=aa+F;
if(X>at){if(parseInt(af.response.numFound)%b===0){X=at-1
}else{X=at
}}if(ar>b){for(W=aa;
W<=X;
W++){if(W!=I){S+="<li><a name='searchResults_page"+(W+1)+"' href=\"javascript:UPX.searchResults.runQuery('"+ap+"',"+W+')">'+(W+1)+"</a></li>"
}else{S+="<li class='current'>"+(W+1)+"</li>"
}}}if(I<X){S+="<li><a name='searchResults_next' href=\"javascript:UPX.searchResults.runQuery('"+ap+"',"+((I*1)+1)+')">Next</a></li>'
}else{if(ar>b){S+="<li class='apts_paginate_item_disabled'>Next</li>"
}}S+="</ul>";
$("#apts_search_page_paginator_top").html(S);
$("#apts_search_page_paginator_bot").html(S);
if($("#apts_search_page_paginator_bot ul li").length>0){$("#bottomRow").show()
}$(".footerTab_1").css("display","none");
$(".footerTab_1").css("display","block");
document.location.hash=c;
c=document.location.hash;
if(typeof cmCreatePageviewTag=="function"){if(typeof coremetricsStartPath==="undefined"){window.coremetricsStartPath="/acloud"
}if(ar>0){cmCreatePageviewTag("Search Successful: Page "+(I+1),coremetricsStartPath+M,P,ar)
}else{cmCreatePageviewTag("Search Unsuccessful",coremetricsStartPath+M,P,ar)
}}var ak=window.setInterval(function(){try{if(s){window.clearInterval(ak);
sc.searchQuery=k.exec(unescape(strQuery));
if(sc.searchQuery!==null&&sc.searchQuery.length>1){sc.searchQuery=sc.searchQuery[1]
}else{sc.searchQuery=J
}sc.searchQuery=sc.searchQuery.toLowerCase();
sc.prop16="mktg:main search";
sc.prop17=sc.searchQuery;
sc.prop18=(ar+"").toLowerCase();
var aw=(typeof(T)=="string")?unescape(T).toLowerCase():"all";
sc.prop19=sc.prop16+":"+aw+":"+sc.prop17;
sc.eVar16="D=c19";
sc.eVar21="D=c16";
sc.eVar22="D=c17";
if(ar>0){sc.events="event10"
}else{sc.events="event10,event11"
}sc.init();
s.t()
}}catch(av){}},1000)
})
},followFacetLink:function(M,K,J){M=utils.escapejQuerySelector(M);
var I=$("#"+M),L=null;
if($(I).hasClass("subcategory")){if($("#searchResultsCategoryName a").length==0){L=$("#searchResultsCategoryName span").text();
$("#searchResultsCategoryName").html("<a id='searchResults_viewCategory' href=\""+y+'">'+j+UPX.searchResults.unescapeUrlFromSearch(L)+"</a>")
}}else{L=$("#searchResultsCategoryName a").text();
$("#searchResultsCategoryName").html("<span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(L)+"</span>")
}I.parents("ul").find("a").removeClass("disabled");
UPX.searchResults.runQuery(K,J);
I.addClass("disabled")
},followNavigationalAnchorLink:function(K){var J=K.split(u),L="",I="";
if(J[1]!=="null"){L=J[1];
I+="&q="+L
}if(J[2]!=="null"){L=J[2];
if($.browser&&$.browser.mozilla){I+='&fq=category:"'+L+'"'
}else{I+="&fq=category:%22"+L+"%22"
}}if(J[3]!=="null"){L=J[3];
if($.browser&&$.browser.mozilla){I+='&fq=subcategory:"'+L+'"'
}else{I+="&fq=subcategory:%22"+L+"%22"
}}if($.browser&&$.browser.mozilla){UPX.searchResults.followFacetLink("searchResultsFacet_"+L,I,J[0].substr(1))
}else{window.location.href="javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+L+"','"+I+"', "+J[0].substr(1)+")"
}},checkAnchorHash:function(){var I=document.location.hash;
if((I.indexOf(u)>=0)&&(c!==I)){UPX.searchResults.followNavigationalAnchorLink(I)
}},followEventBoundLink:function(J){if(J!==""){var I="#0"+u+UPX.searchResults.escapeUrlForSearch(J)+u+"null"+u+"null";
window.location.href="/search.html?solr_q="+escape("&q="+UPX.searchResults.escapeUrlForSearch(J))+I
}},getDimAutoFilters:function(){var I="";
if(n.enableLocationDim!=="false"){UPX_userDefaultValue.ready(function(){A=UPX_userDefaultValue.getOrga();
z=UPX_userDefaultValue.getState();
f=UPX_userDefaultValue.getPostalCode()
});
if(A!==""){if(n.orgaBoost!==null){D=n.orgaBoost
}I+="&bq=dim_orga:"+A+"^"+D
}if(z!==""){if(n.stateBoost!==null){m=n.stateBoost
}I+="&bq=dim_state:"+z+"^"+m
}}I+="&facet.field=category&facet.field=subcategory";
return I
},escapeUrlForSearch:function(I){if(I){I=I+"";
I=I.replace(":","\\:");
I=I.replace(/\'/g,"%27");
I=I.replace(/\&/g,"%26");
I=escape(I)
}return I
},unescapeUrlFromSearch:function(I){if(I){I=unescape(I);
I=I.replace(/%26/g,"&");
I=I.replace(/%27/g,"'");
I=I.replace("\\:",":")
}return I
},removeLeftColumn:function(){E.resultsFacets.html("");
E.resultsContainer.removeClass("bordered")
},showLeftColumn:function(K,I,O,M,N,J,L){if(M===null){if(L>0){if(J&&J.length<=0){var P="/bin/servlet/SearchServlet.categories.json/f/site/ac";
COMMONAjaxUtilities.doAjax({url:P,type:"GET",dataType:"json",async:false,timeout:500,success:function(T){var Q=T.categories,S=Q.length;
for(iCatLoop=0;
iCatLoop<S;
iCatLoop++){var R=Q[iCatLoop];
if(R.searchFacet){J[R.facetOrder]=R.name;
C[R.name]=R.title
}}if(J.length===2){J=v
}UPX.searchResults.populateLeftColumn(J,K,I,O,M,N,J,L)
},error:function(Q){J=v;
C=l;
UPX.searchResults.populateLeftColumn(J,K,I,O,M,N,J,L)
},statusCode:{404:function(){J=v;
C=l;
UPX.searchResults.populateLeftColumn(J,K,I,O,M,N,J,L)
},500:function(){J=v;
C=l;
UPX.searchResults.populateLeftColumn(J,K,I,O,M,N,J,L)
}}})
}}}},populateLeftColumn:function(W,O,X,M,N,U,W,K){var T="",V="<h2>Narrow Your Results</h2>",Q=[];
V+='<ul class="facetCategoryLinks">';
if(M!==null){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(U);
V+="<li><a id='searchResults_viewAllResults' href=\"javascript:UPX.searchResults.runQuery('"+facetQry+"',0)\">"+j+"All results</a></li>";
facetQry="&q="+UPX.searchResults.escapeUrlForSearch(U)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(M)+"%22";
V+="<li id='searchResultsCategoryName'><span id='searchResults_viewCategory'>"+UPX.searchResults.unescapeUrlFromSearch(M)+"</span></li>"
}else{V+="<li><span id='searchResults_viewAllResults'>&nbsp;</span></li>"
}for(countFacetsLoopCount=0;
countFacetsLoopCount<X;
countFacetsLoopCount++){var J=O[countFacetsLoopCount];
var P=true;
if((countFacetsLoopCount%2)===0){if($.inArray(J.toLowerCase(),e)>=0){P=false;
countFacetsLoopCount++
}if(M===null&&P){var I=$.inArray(J.toLowerCase(),W);
if(I>=0){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(U)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(J)+"%22";
T="<a id='searchResultsFacet_"+J+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+J+"','"+facetQry+"',0)\">"+C[J.toLowerCase()]
}else{countFacetsLoopCount++
}}else{if(N===null&&P){facetQry="&q="+UPX.searchResults.escapeUrlForSearch(U)+"&fq=category:%22"+UPX.searchResults.escapeUrlForSearch(M)+"%22&fq=subcategory:%22"+UPX.searchResults.escapeUrlForSearch(J)+"%22";
T="<a class='subcategory' id='searchResultsFacet_"+J+"' href=\"javascript:UPX.searchResults.followFacetLink('searchResultsFacet_"+J+"','"+facetQry+"',0)\">"+C[J.toLowerCase()]
}}}else{T+=" ("+J+")</a>";
if(J!==0){if(M===null){Q[I]="<li>"+T+"</li>"
}else{V+="<li>"+T+"</li>"
}}else{break
}}}if(N===null){for(var S=1,R=Q.length;
S<R;
S++){var L=Q[S];
if(L&&L!=undefined){V+=L
}}}V+="</ul>";
E.resultsFacets.html(V)
}}
}();
UPX.searchResults.init();