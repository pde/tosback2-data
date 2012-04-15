// JavaScript Document// BEGIN NEWS RELEASE INCLUDE//
// BEGIN NEWS RELEASE INCLUDE//


//NOTE: If Headline has a word that's 15+ characters (like YELLOWPAGES.COM) it may cause the 3rd column to wrap in IE browsers.
//CHECK all headlines in IE. If it's wrapping, look for a really wide word and either get the Comm folks to rewrite the headline or add a class of "first" to that row.

/// news items ////
var headlines = new Array();


// NO EDITS ABOVE THIS LINE !!!!!!!!


// News Release 1
headlines [0] = 
{
headline: 'AT&amp;T Expands U-verse DVR Management to More Places with New Click to Record Feature on U-verse Online',
date: 'September 23, 2010',
city: 'Dallas, Texas',
newsarticleid: '31228',
mapcode: 'consumer',
pid: '18537',
description:'AT&amp;T today announced the launch of new DVR features for AT&amp;T U-verse&#174; TV customers on U-verse Online, including the ability to schedule DVR recordings directly from the website and to easily see which of your DVR recordings are also available to view on U-verse Online.'
}



// News Release 2
headlines [1] = 
{
headline: 'AT&amp;T Launches Campaign to Raise Awareness Around Online Services',
date: 'September 21, 2010',
city: 'Dallas, Texas',
newsarticleid: '31225',
mapcode: 'enterprise',
pid: '18506',
description:'AT&amp;T today announced the Simplify Your Life video contest, an initiative that encourages customers to create and submit videos that show how AT&T&#39;s Online Services make life easier. Participants can enter at <a href="http://www.att.com/simplify">www.att.com/simplify</a> and have a chance to win awards of up to $20,000.'
}



// News Release3
headlines [2] = 
{
headline: 'AT&amp;T Included in Carbon Disclosure Project&#39;s Carbon Disclosure Leadership Index ',
date: 'September 21, 2010',
city: 'Dallas, Texas',
newsarticleid: '31224',
mapcode: 'consumer',
pid: '18528',
description:'AT&amp;T announced today that it has been included in Carbon Disclosure Project&#39;s (CDP) Carbon Disclosure Leadership Index (CDLI). The CDLI recognizes the top companies by category in the S&amp;P 500 (53 total) that provided the most comprehensive responses, in terms of the depth and breadth of their answers. The survey &#151; sent to more than 4,700 of the world&#39;s largest corporations &#151; collects data on greenhouse gas (GHG) emissions as well as risks and opportunities associated with climate change. CDP conducted the survey on behalf of 534 institutional investors holding $64 trillion in assets under management, and 60 purchasing organizations. '
}










// [pid=6080] Headlines definition
// [pid=3309] Headlines definition



// Newsroom Landing Page
function headlines6080()
{
 document.write ('<ul class="news-headlines">');
 for ( var i=0; i<3; i++ )
 {
  if ( headlines[i] == null ) { break; }
  document.write ('<li class="first"><a href="/gen/press-room?pid=' + headlines[i].pid + '&cdvn=news&newsarticleid=' + headlines[i].newsarticleid + '&mapcode=' + headlines[i].mapcode +'" title="' + headlines[i].headline +'">' + headlines[i].headline + '</a><br />');
  document.write ('<em>' + headlines[i].city + ', ' + headlines[i].date + '</em><br />');
  document.write (headlines[i].description + '</li>');
 }


// TEMPORARY TEMPORARY
// document.write ('<a title="West contract between AT&amp;T and CWA expires without work stoppage" href="/gen/press-room?pid=13365">West contract between AT&amp;T and CWA expires without work stoppage</a>');
// document.write ('<br/>');
// document.write ('<em>Dallas, Texas, April 5, 2009</em>');
// document.write ('<br/>');
// document.write ('<P>April 5 (2 a.m. CDT) � AT&amp;T Inc. and Communications Workers of America (CWA) Core wireline contracts in the West expired at 11:59 p.m. PDT on Saturday, April 4. The West is the last of the Core contracts set to expire in this round of negotiations. Union-represented employees covered by these contracts will work under the expired contracts.</P>');
// document.write ('<P> AT&amp;T stands ready to negotiate at any time in a continuing effort to reach an agreement.</P>');

// TEMPORARY TEMPORARY
// document.write ('<a title="Midwest, Southwest contracts between AT&amp;T and CWA expire without work stoppage" href="/gen/press-room?pid=13364">Midwest, Southwest contracts between AT&amp;T and CWA expire without work stoppage</a>');
// document.write ('<br/>');
// document.write ('<em>Dallas, Texas, April 4, 2009</em>');
// document.write ('<br/>');
// document.write ('<P>April 4 &#40;11&#58;59 p.m. CDT&#41; &#8211; Negotiations between AT&amp;T Inc. and the Communications Workers of America &#40;CWA&#41; for a contract covering 112,500 Core wireline employees of the company will continue in the Midwest and Southwest after the scheduled expiration of the current contracts at 11&#58;59 p.m. CDT on Saturday, April 4.</P> ');
// document.write ('<P>Union-represented employees covered by these contracts will work under the expired contracts. Negotiations are continuing in the West and an update will follow. AT&amp;T stands ready to negotiate at any time in a continuing effort to reach an agreement. </P>');
// document.write ('<P> AT&amp;T stands ready to negotiate at any time in a continuing effort to reach an agreement.</P>');

// TEMPORARY TEMPORARY
// document.write ('<a title="First contracts between AT&amp;T and CWA expire without work stoppage" href="/gen/press-room?pid=13363">First contracts between AT&amp;T and CWA expire without work stoppage.</a>');
// document.write ('<br/>');
// document.write ('<em>Dallas, Texas, April 4, 2009</em>');
// document.write ('<br/>');
// document.write ('<P>April 4 &#40;11 p.m. CDT&#41; &#8211; AT&amp;T Inc. and Communications Workers of America &#40;CWA&#41; Core wireline contracts in the eastern time zone expired at 11&#58;59 p.m. EDT on Saturday, April 4. Union-represented employees covered by these contracts will work under the expired contracts. Negotiations are continuing in the Midwest, Southwest and West and updates will follow.</P>');
// document.write ('<P>In the Southeast, where the contract does not expire until August 8, both parties have agreed to stop negotiations and reconvene this summer &#8211; as they would have under normal circumstances. </P>');
// document.write ('<P> AT&amp;T stands ready to negotiate at any time in a continuing effort to reach an agreement.</P>');


 document.write ('</ul>');
}


// About Us Landing Page
function headlines3309()
{
 document.write ('<ul class="news-headlines">');
 for ( var i=0; i<3; i++ )
 {
  if ( i == 2 )
  {
   document.write ('<li class="last">' + headlines[i].date + '<br/><a href="/gen/press-room?pid=' + headlines[i].pid + '&cdvn=news&newsarticleid=' + headlines[i].newsarticleid + '&mapcode=' + headlines[i].mapcode + '" title="' + headlines[i].headline + '">' + headlines[i].headline + '</a></li>');
  }
  else
  {
   if ( headlines[i] == null ) { break; }
   document.write ('<li>' + headlines[i].date + '<br/><a href="/gen/press-room?pid=' + headlines[i].pid + '&cdvn=news&newsarticleid=' + headlines[i].newsarticleid + '&mapcode=' + headlines[i].mapcode + '" title="' + headlines[i].headline + '">' + headlines[i].headline + '</a></li>');
  }
 }
 document.write ('</ul>');
}