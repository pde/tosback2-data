// setup container for new divs
$('#wrapper').prepend('<div id="DivContainer" style="position: relative; width:0px; top:0px; left:0px; z-index: 10000;"></div>');

//MEN TOP NAV SET BORDER	
/*$(document).ready(function() {
	$('#divCon').css('border','1px solid #000000 !important');
	$('#ifm_divCon').css('border','1px solid #000000 !important');   
	$('#ifm_divCon').css('*border','none');   
});*/

//willis	
$(document).ready(function() {
	$.getScript('/us/willis/js/jquery.scrollTo-min.js');
	$.getScript('/us/willis/js/willis.js');

	
});

function popWillis(){
	//alert('willis shop');
	COACH.willis.initWillis('popup');	
}


//DIV FROM TOP NAV
//$(document).ready(function(){
	if($("#ifm_divCon").parent('div').css('display')=="block"){
		alert("topnav div is openned");
	}

//});


function closeMe()
		{
			$('#DivContainer').html('');
           	$('#divCon').html('');
		   	$('#divCon').remove();
		}
//Coach and The Glow div
function popGlow(){
$('#DivContainer').prepend('<div id="glowDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2600;border: 1px solid #000000;  background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeGlow()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="glowFrame" id="glowFrame" src="/us/201205/glow/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'glowDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "glow";
	s.eVar16 = "glow";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeGlow() {
	$('#glowFrame').remove();
	$('#glowDiv').remove();
	window.onresize = null; 

}	
		
//Mom's Gift Guide div
function popMothersDay(){
$('#DivContainer').prepend('<div id="mothersDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2600;border: 1px solid #000000;  background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeMothersDay()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="mothersFrame" id="mothersFrame" src="/us/201205/mothersday/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'mothersDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "Mothersday";
	s.eVar16 = "Mothersday";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeMothersDay() {
	$('#mothersFrame').remove();
	$('#mothersDiv').remove();
	window.onresize = null; 

}
		
//Apply to Jobs
function popApplyJobs(){
$('#DivContainer').prepend('<div id="applyJobsDiv" style="visibility:visible; width:800px; top: 60px; *top:-80px; height:715px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2;border: 1px solid #000000;  background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeApplyJobs()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:800px; height:715px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="applyJobsFrame" id="applyJobsFrame" src="https://www.Coach.apply2jobs.com/index.cfm" scrolling="auto" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'applyJobsDiv';
	divwidth = 800;
	divheight = 715;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "Apply to Jobs popup";
	s.eVar16 = "Apply to Jobs popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeApplyJobs() {
	$('#applyJobsFrame').remove();
	$('#applyJobsDiv').remove();
	window.onresize = null; 

}	
		
//Coach Foundation
function popFoundation(){
$('#DivContainer').prepend('<div id="foundationDiv" style="visibility:visible; width:784px; top: 60px; *top:-80px; height:678px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2;border: 1px solid #000000;  background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeFoundation()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:784px; height:678px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="foundationFrame" id="foundationFrame" src="/us/foundation/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'foundationDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "Coach Foundation popup";
	s.eVar16 = "Coach Foundation popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeFoundation() {
	$('#foundationFrame').remove();
	$('#foundationDiv').remove();
	window.onresize = null; 

}	
		
//Men's Washed Canvas Beach Tote
function popWashedCanvas(){
$('#DivContainer').prepend('<div id="washedDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2;border: 1px solid #000000;  background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeWashed()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="washedFrame" id="washedFrame" src="/us/201205/washed/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'washedDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "Washed Canvas popup";
	s.eVar16 = "Washed Canvas popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeWashed() {
	$('#washedFrame').remove();
	$('#washedDiv').remove();
	window.onresize = null; 

}	


//JAMES NARES
function popNares(){
$('#DivContainer').prepend('<div id="naresDiv" style="visibility:visible; width:842px; top: 60px; *top:-80px; height:557px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:2;border: 1px solid #000000;  background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeNares()" style="position: absolute; right: 0px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:842px; height:557px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="naresFrame" id="naresFrame" src="/us/201205/nares/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'naresDiv';
	divwidth = 842;
	divheight = 557;
	window.onresize =  divPos;
	divPos();	
 
		
	//OMNITURE TRACKER	
	s.pageName = "James Nares popup";
	s.eVar16 = "James Nares popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeNares() {
	$('#naresFrame').remove();
	$('#naresDiv').remove();
	window.onresize = null; 

}		

//BOLEX
function popBolex(){
$('#DivContainer').prepend('<div id="bolexDiv" style="visibility:visible; width:400px; height:143px;top: 60px; *top:-80px;  background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeBolex()" style="position: absolute; right: 0px; top:0px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><img style="width:398px; height:141px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:none;" name="bolexFrame" id="bolexFrame" src="/us/201203/home/bolex.jpg" /></div>');
	  
	 // REPOSITION DIV
	divname = 'bolexDiv';
	divwidth = 398;
	divheight = 141;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "Learn more - popup";
	s.eVar16 = "Learn more - popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeBolex() {
	$('#bolexFrame').remove();
	$('#bolexDiv').remove();
	window.onresize = null; 

}	

//CROSBY
function popCrosby(){
$('#DivContainer').prepend('<div id="crosbyDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeCrosby()" style="position: absolute; right: -1px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:852px; height:552px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="crosbyFrame" id="crosbyFrame" src="/us/men_crosby/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'crosbyDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "Crosby popup";
	s.eVar16 = "Crosby popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeCrosby() {
	$('#crosbyFrame').remove();
	$('#crosbyDiv').remove();
	window.onresize = null; 

}
	
		
//monogram info only	
function popMono(){
	//$('#DivContainer').prepend('<div id="monoinfoDiv" style="visibility:visible; width:565px; height:248px; top: 60px; *top:-80px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;"><a href="javascript:closeMono()" style="position: absolute; right: 0px; top:0px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><img style="width:565px; height:248px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:none;" src="/us/201202/mono/info.jpg"/></div>'); V1

	$('#DivContainer').prepend('<div id="monoinfoDiv" style="visibility:visible; width:852px; height:552px; top: 60px; *top:-80px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeMono()" style="position: absolute; right: 0px; top:0px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:852px; height:552px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:none;" src="/us/men_monogram/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	
	 // REPOSITION DIV
	divname = 'monoinfoDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "monogram information popup";
	s.eVar16 = "monogram information popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeMono() {
	$('#monoinfoDiv').remove();
	window.onresize = null; 

}

//Hugo
function popHugo(){
	window.location="/online/handbags/-hugo_guinness_collection-10551-10051-5000000000000283804-en?t1Id=82&t2Id=5000000000000283804&tier=2&LOC=WWCM";
/*$('#DivContainer').prepend('<div id="hugoDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:10; border:none;"><a href="javascript:closeHugo()" style="position: absolute; right: -3px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:2px solid #000000;"" name="hugoFrame" id="hugoFrame" src="/us/201202/hugo/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'hugoDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "Hugo Guiness popup";
	s.eVar16 = "Hugo Guiness popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
*/	
}
	
/*
function closeHugo() {
	$('#hugoFrame').remove();
	$('#hugoDiv').remove();
	window.onresize = null; 

}*/



//Tony Duquette video
function popTony(){
	popVideo('tony');
}

//VDAY QUIZ
function popVday(){
$('#DivContainer').prepend('<div id="vdayDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeVday()" style="position: absolute; right: -3px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:2px solid #000000;"" name="vdayFrame" id="vdayFrame" src="/us/201202/quiz/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'vdayDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "valentine day quiz popup";
	s.eVar16 = "valentine day quiz popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeVday() {
	$('#vdayFrame').remove();
	$('#vdayDiv').remove();
	window.onresize = null; 

}



//SPOTTED
function popSpot(){
$('#DivContainer').prepend('<div id="spotDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeSpot()" style="position: absolute; right: -2px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:1px solid #000000;"" name="spotFrame" id="spotFrame" src="/us/spotted/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'spotDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "spotted popup";
	s.eVar16 = "spotted popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeSpot() {
	$('#spotFrame').remove();
	$('#spotDiv').remove();
	window.onresize = null; 

}

//Earn Your Stripes PR Collaboration
function popupStripes(){
$('#DivContainer').prepend('<div id="stripesDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:100; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeStripes()" style="position: absolute; right: -2px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:1px solid #000000;"" name="stripesFrame" id="stripesFrame" src="/us/stripes/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'stripesDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "stripes popup";
	s.eVar16 = "stripes popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeStripes() {
	$('#stripesFrame').remove();
	$('#stripesDiv').remove();
	window.onresize = null; 

}


//URL
function goLink(linkwwcm){
	switch(linkwwcm){
		case 'down'://download
		window.location = "/online/handbags/genWCM-10551-10051-en-/Coach_US/StaticPage/downloads?LOC=WWCM";
		break;

		case 'ecard'://ecard
		window.location = "/online/handbags/genWCM-10551-10051-en-/Coach_US/StaticPage/gift_cards?LOC=LN?LOC=WWCM";
		break;

		case 'ship'://shipping info
		window.location = "/online/handbags/genWCM-10551-10051-en-/Coach_US/CustomerService/OrderInformation/SHIPPING+METHODS+AND+FEES?LOC=WWCM";
		//window.location = "/online/handbags/genWCM-10551-10051-en-/Coach_US/StaticPage/gift_cards?LOC=LN?LOC=WWCM";
		break;
		
		case 'allshoes'://view all shoes
		window.location = "/online/handbags/-poppy_collection-10551-10051-105-en?viewType=viewall&t1Id=105&t2Id=105&LOC=WWCM";
		break;		
		case 'allwal'://view all wallet
		window.location = "/online/handbags/-poppy_collection-10551-10051-5000000000000013510-en?viewType=viewall&t1Id=5000000000000013510&t2Id=5000000000000013510&LOC=WWCM";
		break;

		case 'vdaywomen'://vday women
		window.location = "/online/handbags/-giftshop_vdayher-10551-10051-5000000000000218801-en?t1Id=5000000000000000007&t2Id=5000000000000218801&tier=2&LOC=WWCM";
		break;		

		case 'vdaymen':////vday men
		window.location = "/online/handbags/-giftshop_vdayhim-10551-10051-5000000000000286301-en?t1Id=5000000000000000007&t2Id=5000000000000286301&tier=2&LOC=WWCM";
		break;
		
		case 'tony':////tony duquette shop
		window.location = "/online/handbags/-tony_duquette_collection-10551-10051-5000000000000283803-en?t1Id=5000000000000000001&t2Id=5000000000000283803&tier=2&LOC=WWCM";
		break;

		case 'techM':////men techcase shop
		window.location = "/online/handbags/-men_s_tech_cases-10551-10051-5000000000000281301-en?t1Id=82&t2Id=5000000000000281301&tier=2&LOC=WWCM";
		break;		

		case 'mono': //monogramm men shop
		window.location = "/online/handbags/-mens_monogramming-10551-10051-5000000000000286302-en?t1Id=82&t2Id=5000000000000286302&tier=2&LOC=WWCM";
		break;
		
		case 'stripes': //stripes shop
		window.location = "/online/handbags/-newatcoach_earnyourstripes-10551-10051-5000000000000295301-en?t1Id=5000000000000000001&t2Id=5000000000000295301&tier=2&LOC=WWCM";
		break;
		
		case 'baseball': //men's baseball shop
		window.location="/online/handbags/-men_heritage-10551-10051-5000000000000298301-en?t1Id=82&t2Id=5000000000000298301&tier=2&LOC=WWCM";
		break;
		
		case 'nares': //james nares shop
		window.location="/online/handbags/-men_jamesnares-10551-10051-5000000000000298302-en?t1Id=82&t2Id=5000000000000298302&tier=2&LOC=WWCM";
		break;
		
		case 'momFB': //facebook you, your mom and coach
		window.open('https://www.facebook.com/Coach/app_356975334348552','_blank');
		break;
		}
		
}


//HANGTAG 
function popupTag(){//gallery //intro
	$('#DivContainer').prepend('<div id="tagDiv" style="visibility:visible; top: 60px; *top:-80px; width:741px; height:497px; background-color:#000000; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeTag()" style="position: absolute; right: -3px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:740px; height:480px; margin-left:0px; margin-top:17px; z-index:80000; _hasLayout:true; border:2px solid #000000;"" name="tagFrame" id="tagFrame" src="http://70th.coach.com/hangtag/us/app.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'tagDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "hangtag popup";
	s.eVar16 = "hangtag popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeTag() {
	$('#tagFrame').remove();
	$('#tagDiv').remove();
	window.onresize = null; 

} 


//SHARE ANIMATION
function popupAnim(){
	popupShare();
}

function popupShare(video){
	//alert(video);
	//videoL = video.length;
	if(video!=null){
		$('#DivContainer').prepend('<div id="shareDiv" style="visibility:visible; width:834px; top: 60px; *top:-80px; height:514px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:834px; height:514px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:1px solid #000000;"" name="shareFrame" id="shareFrame" src="/201112/share/share.html#'+video+'" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');	
	}else{
		$('#DivContainer').prepend('<div id="shareDiv" style="visibility:visible; width:834px; top: 60px; *top:-80px; height:514px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:834px; height:514px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:1px solid #000000;"" name="shareFrame" id="shareFrame" src="/201112/share/share.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');		
	}

	  
	 // REPOSITION DIV
	divname = 'shareDiv';
	divwidth = 834;
	divheight = 514;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "share animation popup";
	s.eVar16 = "share animatio popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closeShare() {
	$('#shareFrame').remove();
	$('#shareDiv').remove();
	window.onresize = null; 

} 

//POPPY 
function popupPop(){
	$('#DivContainer').prepend('<div id="poppyDiv" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; border:none;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:850px; height:550px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border:2px solid #000000;"" name="poppyFrame" id="poppyFrame" src="/201104/popfav/index.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	  
	 // REPOSITION DIV
	divname = 'poppyDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();		
		
	//OMNITURE TRACKER	
	s.pageName = "poppy favorites popup";
	s.eVar16 = "poppy favorites popup";
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
}
	

function closePop() {
	$('#poppyFrame').remove();
	$('#poppyDiv').remove();
	window.onresize = null; 

} 
// blank
function popContent(content){
	//var content;
		
	$('#DivContainer').html('');
	$('#DivContainer').prepend('<div id="contentDiv" style="width:850px; height:550px; background:none; position:absolute; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:90000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeContent()" style="position: absolute; right: -3px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a></div>');
	
switch(content){ 
	case 'wardrobe':
	$('#contentDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/hbshape/index.html" name="contentFrame" id="contentFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Handbags by Shape: Pop-Up";
	s.eVar16 = "pop-up>handbags by shape";
	break;		
	
	case 'madison':
	$('#contentDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201110/madison/index.html" name="contentFrame" id="contentFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Madison: Pop-Up";
	s.eVar16 = "pop-up>madison";
	break;	
	
	default:
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/mothersday/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Mother's Day Gift Guide: Pop-Up";
	s.eVar17 = "pop-up>mother's day gift guide";
	break;	
	}
	
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	  // REPOSITION DIV
	  divname = 'contentDiv';
	  divwidth = 850;
	  divheight = 550;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeContent() {
	$('#contentDiv').remove();
	window.onresize = null; 

} 

// LEGACY
function popLegacy(content){
	//var content;
		
	$('#DivContainer').html('');
	$('#DivContainer').prepend('<div id="legacyDiv" style="width:850px; height:550px; background:none; position:absolute; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeLegacy()" style="position: absolute; right: -3px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a></div>');
	
switch(content){ 
	case 'd':
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/legacy/design/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Legacy Workshop 1: Pop-Up";
	s.eVar16 = "pop-up>legacy design";
	break;	

	case 'l':
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/legacy/leather/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Legacy Leather: Pop-Up";
	s.eVar16 = "pop-up>legacy leather";
	break;	
	
	case 'w':
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/legacy/workshop/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Legacy Workshop 2: Pop-Up";
	s.eVar16 = "pop-up>legacy workshop";
	break;	
	
	case 'c':
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/legacy/classic/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Legacy Workshop 2: Pop-Up";
	s.eVar16 = "pop-up>legacy classic";
	break;	
	
	default:
	$('#legacyDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/legacy/design/index.html" name="legacyFrame" id="legacyFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Legacy Design: Pop-Up";
	s.eVar17 = "pop-up>legacy design";
	break;	
	}
	
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	  // REPOSITION DIV
	  divname = 'legacyDiv';
	  divwidth = 850;
	  divheight = 550;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeLegacy() {
	$('#legacyDiv').remove();
	window.onresize = null; 

} 

// VIDEO 
function popVideo(content){
	//var content;
	$('#DivContainer').html('');
	$('#DivContainer').prepend('<div id="videoDiv" style="width:700px; height:394px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="#" onclick="javascript:closeVideo(); return false;" style="position: absolute; right: -2px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a></div>');
	

	
	switch(content){ 
	
	case 'tote':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/video/totes.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Totes Video Popup";
	s.eVar16 = "totes video popup";
	break;	
	
	case 'poppy':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201107/video/poppy.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Poppy Video Popup";
	s.eVar16 = "poppy video popup";
	break;		   
	
	case 'mens':
	$('#videoDiv').prepend('<iframe style="width:704px; height:400px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201107/men/mensVideo.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Mens Video Popup";
	s.eVar16 = "mens video popup";
	break;	
	
	case 'floral':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/video/madison_floral_div.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Madison Floral Video Popup";
	s.eVar16 = "madison floral video popup";
	break;
	
	case 'whitebags':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/video/whitebags_div.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "White Bags Video Popup";
	s.eVar16 = "white bags video popup";
	break;
	
	case 'summer':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/video/mens.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Men's Summer Video Popup";
	s.eVar16 = "men's summer video popup";
	break;

	case 'tony':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/video/duquette.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Tony Duquette Video Popup";
	s.eVar16 = "Tony Duquette video popup";
	break;

	case 'shoes':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/video/shoes.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "2012 Shoes Video Popup";
	s.eVar16 = "2012 Shoes video popup";
	break;
	
	case 'sun':
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/us/video/sunglasses.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "2012 Sunglasses Video Popup";
	s.eVar16 = "2012 Sunglasses video popup";
	break;
	
	default:
	$('#videoDiv').prepend('<iframe style="width:700px; height:394px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201105/video/whitebags_div.html" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "White Bags Video Popup";
	s.eVar16 = "white bags video popup";
	break;	
	}
	
		if (navigator.userAgent.indexOf('iPad') != -1) {
		//alert('ipad');
		$('#videoDiv').css('height','414px');
		$('#videoFrame').css('position','absolute');		
		$('#videoFrame').css('top','17px');
	}
	
	  // REPOSITION DIV
	  divname = 'videoDiv';
	  divwidth = 700;
	  divheight = 394;
	  window.onresize =  divPos;
	  divPos();
	  
	 var s_code=s.t();
	if(s_code)document.write(s_code);
}
 
function closeVideo() {
	$('#videoDiv').remove();
	window.onresize = null; 

} 

//KRISTIN LEATHER DIV
function popupKris() {

	$('#DivContainer').prepend('<div id="DivKris" style="width:851px; height:651px; background:none; visibility:hidden; position:fixed;z-index:90000;border:1px solid #bab7bf;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:851px; height:651px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; " src="/201103/kris/index.html" name="krisFrame" id="krisFrame" frameborder="0px" scrolling="no"></iframe></div>');
	
	document.getElementById('DivKris').style.visibility='visible';
	document.getElementById('DivKris').style.zIndex='9000';
	document.getElementById('krisFrame').style.zIndex='8000';
 
 	s.pageName = "Kristin leather popup";
	s.eVar16 = "Kristin leather popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
   	// REPOSITION DIV
	divname = 'DivKris';
	divwidth = 851;
	divheight = 651;
	window.onresize =  divPos;
	divPos();
 }
 
function closeKris() {
    $('#DivKris').remove();
	window.onresize = null; 
} 

//DID YOU KNOW NEW
function popupDYK(dyk){
	popDYK(dyk);
}

function popDYK(dyk) {
	$('#DivContainer').html('');
	$('#divCon').remove();
	$('#DivContainer').prepend('<div id="dykDiv" style="width:850px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; position:absolute;top:0px;" src="/us/dyk/embed.html" name="dykFrame" id="dykFrame" scrolling="no" frameborder="0"></iframe></div>');
	
	switch(dyk){ 		
	case 'hardware':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=1');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;

	case 'edge':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=2');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;		

	case 'glove':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=3');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;	

	case 'burnished':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=4');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;	

	case 'wallet':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=5');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;			
		
	case 'store':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=6');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Store Popup";
		s.eVar16 = "mens did you know: Store popup";
		break;
		
	case 'func':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=7');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Function Popup";
		s.eVar16 = "mens did you know: function popup";
		break;

	case 'collar':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=8');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Collar Popup";
		s.eVar16 = "mens did you know: Collar popup";
		break;

	case 'signature':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=9');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Signature Popup";
		s.eVar16 = "mens did you know: Signature popup";
		break;		

	case 'logo':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=10');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Logo Popup";
		s.eVar16 = "mens did you know: Logo popup";
		break;	

	case 'mono':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=11');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Monogramming Popup";
		s.eVar16 = "mens did you know: Monogramming popup";
		break;

	case 'hand':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=12');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: hardware Popup";
		s.eVar16 = "mens did you know: hardware popup";
		break;

	case 'vach':
		$('#dykFrame').attr('src','/us/dyk/embed.html#origin=verticalShops&moduleId=13');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know: Vachetta Popup";
		s.eVar16 = "mens did you know: Vachetta popup";
		break;	
		
	default:
		$('#dykFrame').attr('src','/us/dyk/embed.html');	
		$('#closing').css('right','0');
		s.pageName = "Mens Did You Know Popup";
		s.eVar16 = "mens did you know popup";
		break;		
	}
		
   	// REPOSITION DIV
	divname = 'dykDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();
	
 	var s_code=s.t();
	if(s_code)document.write(s_code);
}

function closDYK() {
	$('#dykDiv').remove();
	window.onresize = null; 
} 

function closePopUp_didYouKnow()
		{
			$('#DivContainer').html('');
           	$('#divCon').html('');
		   	$('#divCon').remove();
			$('#videoDiv').remove();
		}
		
	
function openDivDidYouKnow(moduleId)  
{
    //alert('* openDivDidYouKnow / ' + 'moduleId: ' + moduleId )  ;   
      
        $('#DivContainer').html('');
		
        $('#DivContainer').prepend('<div id="videoDiv" style="width:850px; height:550px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;"></div>');

        $('#videoDiv').prepend('<iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="" name="videoFrame" id="videoFrame" scrolling="no" frameborder="0"></iframe>'); 
var embedString =  "/us/dyk2/embed.html#origin=verticalShops&moduleId=" + moduleId; 
$('#videoFrame').attr('src', embedString);  
       
        // REPOSITION DIV
      divname = 'videoDiv';
      divwidth = 850;
      divheight = 550;
      window.onresize =  divPos;
      divPos();  
    
    
        s.pageName = "Did You Know Popup";
        s.eVar16 = "did you know popup";
}


//MENS COLLECTION
function popMensCollection(contentmen) {
	//var contentmen;
	$('#DivContainer').html('');
	$('#divCon').remove();
	$('#DivContainer').prepend('<div id="mensCollectionDiv" style="width:850px; height:550px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"></div>');
	
	switch(contentmen){ 
	case 'grain':
	$('#mensCollectionDiv').prepend('<iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true;" src="/us/grains/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
    s.pageName = "Guide to Grain Popup";
    s.eVar16 = "guide to grain popup";
	break;	
	
	case 'bike':
	$('#mensCollectionDiv').prepend('<iframe style="width:850px; height:550px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201108/bike/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
    s.pageName = "Men's Bike Popup";
    s.eVar16 = "men's bike popup";
	break;	
	
	case 'looks':
	$('#mensCollectionDiv').prepend('<iframe style="width:850px; height:550px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid #000000;" src="/201109/looks/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
    s.pageName = "Men's Looks Popup";
    s.eVar16 = "men's looks popup";
	break;	
	
	case 'shopstore':
	$('#mensCollectionDiv').prepend('<iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true;" src="/us/men_store/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
    //s.pageName = "Shop Bleecker Street Store Popup";
    //s.eVar16 = "shop bleecker street store popup";
	break;	
	
	case 'crosby':
	$('#mensCollectionDiv').prepend('<iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: none;" src="/201109/crosby/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
    s.pageName = "Mens Bleecker Legacy Popup";
    s.eVar16 = "mens bleecker legacy popup";
	break;
	
	case 'dyk':
	$('#mensCollectionDiv').remove();
	popDYK();
	break;
	
	case 'hardware':
	$('#mensCollectionDiv').remove();
	popDYK('hardware');
	break;
	
	case 'buckle':
	$('#mensCollectionDiv').remove();
	popDYK('buckle');
	break;
	
	case 'edge':
	$('#mensCollectionDiv').remove();
	popDYK('edge');
	break;
	
	case 'glove':
	$('#mensCollectionDiv').remove();
	popDYK('glove');
	break;
	
	case 'burnished':
	$('#mensCollectionDiv').remove();
	popDYK('burnished');
	break;
	
	case 'wallet':
	$('#mensCollectionDiv').remove();
	popDYK('wallet');
	break;
	
	case 'store':
	$('#mensCollectionDiv').remove();
	popDYK('store');
	break;
	
	case 'func':
	$('#mensCollectionDiv').remove();
	popDYK('func');
	break;
	
	case 'collar':
	$('#mensCollectionDiv').remove();
	popDYK('collar');
	break;
	
	case 'signature':
	$('#mensCollectionDiv').remove();
	popDYK('signature');
	break;
	
	case 'party':
	$('#mensCollectionDiv').prepend('<iframe style="width:850px; height:550px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; position:absolute;top:0px;" src="/us/dyk2/embed.html#origin=verticalShops&moduleId=10" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
	$('#mensCollectionDiv').css({
		'border':'1px solid #000000',
		//'height':'567px',
		'background-color':'#FFFFFF'
		});
	$('#closing').css('right','0');
    s.pageName = "Mens Did You Know: Party Popup";
    s.eVar16 = "mens did you know: party popup";
	break;
	
	case 'stripe':
	$('#mensCollectionDiv').prepend('<iframe style="width:850px; height:550px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; position:absolute;top:0px;" src="/us/dyk2/embed.html#origin=verticalShops&moduleId=9" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
	$('#mensCollectionDiv').css({
		'border':'1px solid #000000',
		//'height':'567px',
		'background-color':'#FFFFFF'
		});
	$('#closing').css('right','0');
    s.pageName = "Mens Did You Know: Stripe Popup";
    s.eVar16 = "mens did you know: stripe popup";
	break;
	
	case 'craftvideo':
	$('#mensCollectionDiv').remove;
	$('#closing').remove;
	popHeritage('men');
		
    s.pageName = "Mens craftvideo Popup";
    s.eVar16 = "mens craftvideo popup";
	break;
	
	default:
	$('#mensCollectionDiv').prepend('<iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true;" src="/201107/harrison/index.html" name="menFrame" id="menFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Mens Collection Popup";
	s.eVar16 = "mens collection popup";
	break;	
	}
		
   	// REPOSITION DIV
	divname = 'mensCollectionDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();
	
 	var s_code=s.t();
	if(s_code)document.write(s_code);
}

function closeMensCollection() {
$('#mensCollectionDiv').remove();
window.onresize = null; 

} 

//JEWELRY DIV
function popJw(content){
	//var content;
		
	$('#DivContainer').html('');
	$('#DivContainer').prepend('<div id="jwDiv" style="width:850px; height:550px; background-color:#ffffff; position:absolute; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeJw();" style="position: absolute; right: -1px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a></div>');
	
switch(content){ 
	case 'swa':
	$('#jwDiv').prepend('<iframe src="/us/jewelrydiv/swa.html" name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Swarovski: Pop-Up";
	s.eVar16 = "pop-up>Jewelry Swarovski";
	break;	

	case 'ena':
	$('#jwDiv').prepend('<iframe src="/us/jewelrydiv/ena.html" name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Enamel: Pop-Up";
	s.eVar16 = "pop-up>Jewelry Enamel";
	break;	
	
	case 'sterling':
	$('#jwDiv').prepend('<iframe src="/us/jewelrydiv/sil.html" name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Sterling silver: Pop-Up";
	s.eVar16 = "pop-up>Jewelry Sterling silver";
	break;	

	case 'sil':
	$('#jwDiv').prepend('<iframe src="/us/jewelrydiv/sil.html" name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Sterling silver: Pop-Up";
	s.eVar16 = "pop-up>Jewelry Sterling silver";
	break;	
	
	case 'care':
	$('#jwDiv').prepend('<iframe src="/us/jewelrydiv/car.html" name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Care: Pop-Up";
	s.eVar16 = "pop-up>Jewelry care";
	break;	
	
	default:
	$('#jwDiv').prepend('<iframe name="jwFrame" id="jwFrame" scrolling="no" frameborder="0"></iframe>');	
	s.pageName = "Jewelry Swarovski: Pop-Up";
	s.eVar16 = "pop-up>Jewelry Swarovski";
	break;		
	}
	$('#jwFrame').css({
		'width':'850px',
		'height':'549px',
		'margin-left': 0,
		'margin-top': 0,
		'z-index': 80000,
		'_hasLayout':true,
		'background-color':'#ffffff',
		'border': '1px solid #000000'
	});
	
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	  // REPOSITION DIV
	  divname = 'jwDiv';
	  divwidth = 850;
	  divheight = 550;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeJw() {
	$('#jwDiv').remove();
	window.onresize = null; 

} 
/*function popJw(content) {

	var content;
	if (content == 'sterling') {
		
	$('#DivContainer').prepend('<div id="jewelryDiv" style="width:766px; height:468px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;border:"><img id="jewelrycontent" name="jewelrycontent" src="/us/images/div/sterling.jpg" usemap="#wishMap"><map name="wishMap" id="wishMap"><area shape="rect" coords="536,0,559,21" href="javascript:closeDiv();" />  </map></div>');
	
	s.pageName = "Sterling Jewelry Popup";
	s.eVar16 = "sterling jewelry popup";

	}

else if	(content == 'swa') {
	$('#DivContainer').prepend('<div id="jewelryDiv" style="width:766px; height:468px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;"><img id="jewelrycontent" name="jewelrycontent" src="/us/images/div/swarovski.jpg" usemap="#wishMap"><map name="wishMap" id="wishMap"><area shape="rect" coords="536,0,559,21" href="javascript:closeDiv();" />  </map></div>');
	
		s.pageName = "Swarovksi Jewelry Popup";
	s.eVar16 = "swarovski jewelry popup";
}
	
else {
	$('#DivContainer').prepend('<div id="jewelryDiv" style="width:766px; height:468px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;"><img id="jewelrycontent" name="jewelrycontent" src="/us/images/div/swarovski.jpg" usemap="#wishMap"><map name="wishMap" id="wishMap"><area shape="rect" coords="536,0,559,21" href="javascript:closeDiv();" />  </map></div>');

// window.frames['leatherFrame'].location = '/leather-us/index'+hb+'.html';

	s.pageName = "Swarovksi Jewelry Popup";
	s.eVar16 = "swarovski jewelry popup";
}
	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	  // REPOSITION DIV
	  divname = 'jewelryDiv';
	  divwidth = 558;
	  divheight = 558;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeDiv() {
	$('#jewelryDiv').remove();
	window.onresize = null; 

}*/

//WISHLIST 
function popupWishlist() {

	$('#DivContainer').prepend('<div id="wishDiv" style="width:766px; height:468px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><img src="/201011/7reasons_wishlist.jpg" usemap="#wishMap"><map name="wishMap" id="wishMap"><area shape="rect" coords="739,7,758,27" href="javascript:closeWishlist();" />  <area shape="rect" coords="447,428,757,455" href="javascript:openWish();" /></map></div>');

 
	  // REPOSITION DIV
	  divname = 'wishDiv';
	  divwidth = 766;
	  divheight = 468;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeWishlist() {
	$('#wishDiv').remove();
	window.onresize = null; 

}  

function openWish() {
	//parent.location.protocol = 'https';	
	var wishpage = parent.location.href;
	var wishlength = wishpage.length;
	var wishpage2 = wishpage.slice(0,wishlength-1); 
	var wishpage3 = wishpage2.slice(4); 
	//alert('wishpage3: '+wishpage3);	
	var wishpage4 = 'https'+wishpage3+'&login2MyWishlist=1';
	//alert('wishpage4: '+wishpage4);	
	parent.location = wishpage4;
	//alert('parentloc: '+parent.location);	

	
} 


//MEN LOOK
function delaylook(){
$('#lookFrame').attr('src','/201101/looks/casual/mens_looks.html');
}

function popupLook() {
	//setTimeout('delaylook()', 3000);
	
	//$('#DivContainer').prepend('<div id="DivLook" style="width:763px; height:464px; background:none; visibility:hidden; position:fixed;z-index:90000;"><iframe style="width:763px; height:464px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 0px solid black;" src="/201101/looks/index.html" name="lookFrame" id="lookFrame" scrolling="no"></iframe></div>'); OLD SIZE
	
	$('#DivContainer').prepend('<div id="DivLook" style="width:850px; height:550px; background:none; visibility:hidden; position:fixed;z-index:90000;border:1px solid #000000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeLook()" style="position: absolute; right: 0px;_left:835;px;z-index:85000;" id="closing"><img border="0"  style="display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 0px solid black;" src="/201109/looks/index.html" name="lookFrame" id="lookFrame" frameborder="0px" scrolling="no"></iframe></div>');
	
	document.getElementById('DivLook').style.visibility='visible';
	document.getElementById('DivLook').style.zIndex='9000';
	document.getElementById('lookFrame').style.zIndex='8000';
 
 	s.pageName = "Looks Popup";
	s.eVar16 = "looks popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
   	// REPOSITION DIV
	divname = 'DivLook';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();
 }
 
 function delaylookNB(){
$('#lookFrame').attr('src','/201011/looks/indexNB.html');
}
 
 function popupLookNB() {
	setTimeout('delaylookNB()', 3000);
	
	$('#DivContainer').prepend('<div id="DivLook" style="width:764px; height:466px; background:none; visibility:hidden; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:764px; height:466px;margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true; border: 1px solid black;" src="/201011/looks/0.html" name="lookFrame" id="lookFrame" frameborder="0px" scrolling="no"></iframe></div>');
	
 	document.getElementById('DivLook').style.visibility='visible';
	document.getElementById('DivLook').style.zIndex='9000';
	document.getElementById('lookFrame').style.zIndex='8000';
	
   	// REPOSITION DIV
	divname = 'DivLook';
	divwidth = 764;
	divheight = 466;
	window.onresize =  divPos;
	divPos();
 }

function lookLinkP(url){
//var url;
window.location=url;
}

function closeLook() {
    $('#DivLook').remove();
	window.onresize = null; 
} 

//WALLETS


function popupWallets() {

	$('#DivContainer').prepend('<div id="DivWallet" style="width:852px; height:552px; background:none; visibility:hidden; position:fixed; top: 60px; *top:-80px;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:852px; height:552px;margin-left: 0px; margin-top: 0px; _hasLayout:true; border: 0px solid black;" src="/us/wallet_guide/index.html" name="walletFrame" id="walletFrame" frameborder="0px" scrolling="no"></iframe></div>');
	
	document.getElementById('DivWallet').style.visibility='visible';
	document.getElementById('DivWallet').style.zIndex='9000';
	document.getElementById('walletFrame').style.zIndex='8000';
	
	s.pageName = "Wallets Popup";
	s.eVar16 = "wallets popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
   	// REPOSITION DIV
	divname = 'DivWallet';
	divwidth = 852;
	divheight = 552;
	window.onresize =  divPos;
	divPos();
	
}

function walletLinkP(url){
//var url;
window.location=url;
}

function closeWallets() {
    $('#DivWallet').remove();
	window.onresize = null; 
} 

//SOCIAL INFO
function popInfo() {
	$('#DivContainer').prepend('<div id="infoDiv" style="width:608px; height:317px; background:none; visibility:hidden; position:fixed;top: 60px; *top:-80px; border: 1px #000 solid;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><img src="/us/images/div/social_rank.jpg" usemap="#infoMap"></a><map name="infoMap" id="infoMap"><area shape="rect" coords="348,291,426,304" href="/online/handbags/genWCM-10551-10051-en-/Coach_US/SecurityAndPrivacy/ratings_reviews_sweepstakes?LOC=OT" target="new" /><area shape="rect" coords="588,1,607,19" href="javascript:closeInfo()" /></map></div>');
	
	document.getElementById('infoDiv').style.visibility='visible';
	document.getElementById('infoDiv').style.zIndex='9000';

	s.pageName = "Social info";
	s.eVar16 = "social info";
	
	/*function getQueryVariable(variable) {
  		var query = window.location.search.substring(1);
  		var vars = query.split("&");
  		for (var i=0;i<vars.length;i++) {
    		var pair = vars[i].split("=");
			
    		if (pair[0] == variable) {
      		return pair[1];
			}	    		
  		}
		
	}
	alert( getQueryVariable("LOC") );
		if (getQueryVariable("LOC=LN")) {
		"LOC=WCCM";
	}
	
	else {
	self.parent.location.replace(window.location.href + '&LOC=WCCM'); }*/


	var s_code=s.t();
	if(s_code)document.write(s_code);
					
   	// REPOSITION DIV
	divname = 'infoDiv';
	divwidth = 608;
	divheight = 317;
	window.onresize =  divPos;
	divPos();
 
}

function closeInfo() {
$('#infoDiv').remove();
window.onresize = null; 

} 

//BABY BAGS
function popBaby() {
	$('#DivContainer').html('');

	$('#DivContainer').prepend('<div id="babybagsDiv" style="width:850px; height:550px; background:#fff; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; border:1px solid #000; z-index:900000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeBabybags()" style="position: absolute; right: 0px;_left:680px;" id="closing"><img border="0" style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:850px; height:550px; margin-left: 0px; margin-top: 0px; _hasLayout:true;" src="/us/babybags/slider.html" name="babybagsFrame" id="babybagsFrame" frameborder="0px" scrolling="no"></iframe></div>');	
	
	// REPOSITION DIV
	divname = 'babybagsDiv';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();
	
	s.pageName = "Baby Bags Popup";
	s.eVar16 = "baby bags popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
   	
 
}

function closeBabybags() {
$('#babybagsDiv').remove();
window.onresize = null; 

} 

//MEN CRAFTED
function delayer(){
$('#SOutFrame').attr('src','/201103/crafted/mens_crafted.html');
}

function popupSOut() {
	$('#DivContainer').prepend('<div id="DivSOut" style="visibility:visible; width:762px; height:464px; background:none; position:fixed; _position: absolute; top: 30%; left: 30%; _top:60px; _left:60px; z-index:8999; border: 1px #000 solid;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:762px; height:464px; margin-left: 0px; margin-top: 0px; z-index: 80000; _hasLayout:true;" src="/201103/crafted/index.html" name="SOutFrame" id="SOutFrame" frameborder="0px" scrolling="no"></iframe></div>');
	
	setTimeout('delayer()', 7000);
	
 	s.pageName = "Men Styled Out Popup";
	s.eVar16 = "men styled out popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
   	// REPOSITION DIV
	divname = 'DivSOut';
	divwidth = 762;
	divheight = 464;
	window.onresize =  divPos;
	divPos();
 
 
}

function styleLinkP(url){
//var url;
window.location=url;
}


function closeSOut() {
$('#DivSOut').remove();
window.onresize = null; 

} 

  //MEN HERITAGE VIDEO
function popHeritage(popheri) {

	$('#DivContainer').prepend('<div id="heritageDiv" style="visibility:visible; width:702px; top: 60px; *top:-80px; height:396px; background:none; position:fixed; _position: absolute; z-index:999990;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeHeritage()" style="position: absolute; right: -3px;_left:688px;z-index:85000;" id="closing"><img border="0"  style="display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a></div>');
	
	  // REPOSITION DIV
	  divname = 'heritageDiv';
	  divwidth = 700;
	  divheight = 394;
	  window.onresize =  divPos;
	  divPos();
	  
	if(popheri == 'men'){
		$('#heritageDiv').prepend('<iframe style="position:absolute;width:706px; height:400px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" src="/us/video/heritage_men.html" name="heri_men" id="heri_men" scrolling="no" frameborder="0" allowtransparency="true"></iframe>');
		s.pageName = "Men's Heritage Video Popup";
		s.eVar16 = "men's heritage video popup";

	}else{		
		$('#heritageDiv').prepend('<iframe style="position:absolute;width:700px; height:394px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true; border: 1px solid #000000;" src="/us/video/heritage_women.html" name="heri_women" id="heri_women" scrolling="no" frameborder="0" allowtransparency="true"></iframe>');
		s.pageName = "Women's heritage video popup";
		s.eVar16 = "Women's heritage video popup";
	}
	
	if (navigator.userAgent.indexOf('iPad') != -1) {
		//alert('ipad');
		$('#heritageDiv').css('height','413px');
		$('#heri_men').css('top','17px');
		$('#heri_women').css('top','17px');
	}
	
	//OMNITURE TRACKER
	var s_code=s.t();
	if(s_code)document.write(s_code);		
   
}

function closeHeritage() {
	$('#heritageDiv').remove();
	$('#mensCollectionDiv').remove();
	window.onresize = null; 

}  

  //MEN TIMELINE
function popupMenTime() {
	$('#DivContainer').prepend('<div id="menTimeDiv" style="visibility:visible; width:749px; top: 60px; *top:-80px; height:645px; background-color:#FFF; position:fixed; _position: absolute; z-index:9000;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:751px; height:647px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true" position:absolute;top:0px;" src="/men-history/index-us.html" name="menTimeFrame" id="menTimeFrame" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
 
 	s.pageName = "Men Timeline Popup";
	s.eVar16 = "men timeline popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	  // REPOSITION DIV
	  divname = 'menTimeDiv';
	  divwidth = 749;
	  divheight = 645;
	  window.onresize =  divPos;
	  divPos();
	 
}
 
function closeMenTime() {
	$('#menTimeDiv').remove();
	window.onresize = null; 

}  


//HISTORY OF TOTE

function popTote() {
// setup divTote
$('#DivContainer').prepend('<div id="divTote" style="visibility:visible; width:850px; top: 60px; *top:-80px; height:550px; background-color:#FFFFFF; position:fixed; _position: absolute; z-index:1; background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeTote()" style="position: absolute; right: -1px; top:0px; _left:680px;" id="closing"><img border="0"  style="float:right;display:block;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width:852px; height:552px; margin-left:0px; margin-top:0px; z-index:80000; _hasLayout:true;" name="toteFrame" id="toteFrame" src="/tote-history/index-us.html" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
	

	
	document.getElementById('divTote').style.visibility='visible';
	document.getElementById('divTote').style.zIndex='9000';
	document.getElementById('toteFrame').style.zIndex='8000';
 
 	s.pageName = "History of Tote Popup";
	s.eVar16 = "history of tote popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
 // REPOSITION DIV
   	divname = 'divTote';
	divwidth = 750;
	divheight = 550;
	window.onresize =  divPos;
	divPos();
}


function closeTote() {
	$('#divTote').remove();
	window.onresize = null; 
} 

 
//TIMELINE
function popTime(){
	popupTime();
}
function popupTime() {		
	$('#DivContainer').prepend('<div id="DivTime" style="border:1px solid #000000; backgroundColor:transparent; visibility:visible; width:749px; top: 60px; *top:-80px; height:645px; position:fixed;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><iframe style="width:749px; height:645px; margin-left:0px; margin-top:0px; _hasLayout:true" src="/timeline/index-us.html" name="timeFrame" id="timeFrame" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>');
 
 	s.pageName = "Timeline Popup";
	s.eVar16 = "timeline popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	 // REPOSITION DIV
	divname = 'DivTime';
	divwidth = 749;
	divheight = 645;
	window.onresize =  divPos;
	divPos();	 
}
 
function closeTime() {
	$('#DivTime').remove();
	window.onresize = null; 
}  

// MENS LEATHER
function popupMenLeather() {
	$('#DivContainer').prepend('<div id="MenLeather" style="visibility:visible; width: 850px; top: 60px; *top: 80px; height:550px; background:#ffffff; position:fixed; _position: absolute; z-index:1; background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;"><a href="javascript:closeMenLeather()" style="height: 20px; position: absolute; right: 0px; top: 0px; width: 20px; z-index: 900;"><img border="0" id="closing" style="float:right;" src="/wcsstore/Coach_US/images/btn_detail_close.gif"/></a><iframe style="width: 852px; height: 552px; margin-left:0px; margin-top: 0px; z-index: 80000; _hasLayout:true" src="/us/men-leather/index.html" name="menLeatherFrame" id="menLeatherFrame" scrolling="no" frameborder="0"></iframe></div> ');
	
	s.pageName = "Men Leather Popup";
	s.eVar16 = "men leather popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	//reposition
	divname = 'MenLeather';
	divwidth = 849;
	divheight = 650;
	window.onresize =  divPos;
	divPos();
}


function closeMenLeather() {
	document.getElementById('branding_wrapper').style.zIndex='1';
	$('#MenLeather').remove();
	window.onresize = null; 	
}  


// LEATHER
function popLeather(hb) {
	document.getElementById('branding_wrapper').style.zIndex='-5000';
	
	$('#DivContainer').prepend('<div id="DivLeather" style="width: 850px; *width:847px;height:550px; top: 60px; *top: 80px;position:fixed;background-image:url(\'/popup/loader.gif\'); background-position: center center; background-repeat: no-repeat;background-color: #FFFFFF;"><a href="javascript:closeLeather()" title="" target="" id="closeLink" style="position: absolute; background-color: #000000; height: 25px;*height: 29px; top: 1px; right: 4px;*right: 4px; width: 25px;_left:817px;_z-index:10000005"><img border="0" id="closing" src="/wcsstore/Coach_US/images/btn_detail_close.gif" style="padding-left:5px; padding-top:4px;*padding-top:6px;"/></a><iframe style="width: 850px;*width:847px; height: 550px; *margin-top: 0px; z-index: 8000; _hasLayout:true;border: none;" src="/leather-us/index.html" name="leatherFrame" id="leatherFrame" scrolling="no" frameborder="0"></iframe></div> ');
	
	s.pageName = "Learn About This Leather Popup";
	s.eVar16 = "learn about this leather popup";

	var s_code=s.t();
	if(s_code)document.write(s_code);
	
	// REPOSITION DIV
	divname = 'DivLeather';
	divwidth = 850;
	divheight = 550;
	window.onresize =  divPos;
	divPos();	
	
	if(hb=='men'){
		$('#closeLink').remove();
		$('#DivLeather').css({
			'border':'none',
			'background':'transparent'		
		});			
		$('#leatherFrame').attr('src','/us/men-leather/index.html');
		$('#leatherFrame').css({
			'width':'852px',
			'height':'552px',
			'background':'transparent'		
		});		
	}else if(hb==null){
		$('#leatherFrame').attr('src','/leather-us/index.html');	
	}else{
		$('#leatherFrame').attr('src','/leather-us/index.html');	
	}
		
}

function closeLeather() {
	document.getElementById('branding_wrapper').style.zIndex='1';
	$('#DivLeather').remove();
	window.onresize = null; 	
}  


/*
function popup(div,frame,url,width,height) {
	
	var div;
	var frame;
	var url;
	var width;
	var height;

	 document.getElementById(div).style.visibility='visible';
	 document.getElementById(div).style.zIndex='9000';
	 document.getElementById(frame).style.zIndex='8000';
	 //document.getElementById('branding_wrapper').style.zIndex='-5000';
	 
	 alert(div);
	 alert(frame);
	 
	  // REPOSITION DIV
	  divname = div;
	  divwidth = width;
	  divheight = height;
	  window.onresize =  divPos;
	  divPos();
	 
	   if (window.frames[frame] ) {
		window.frames[frame].location = url;
		window.frames[frame].onload = document.getElementById(div).style.visibility='visible';
		}
}
*/
//UPDATE POPUPDIV POSITION
function divPos(){
	//alert (divname); //name of the div
	//alert (divheight); //height of the div
	//alert (divwidth); //width of the div
	
    var myWidth = 0;
	var myHeight = 0;
	
	// get browser size
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
		myHeight= window.pageYOffset;
        browserHeight = window.innerHeight;		 
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.scrollTop;
		browserHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
	}

 
	
//alert('myHeight=' + myHeight + ', browserHeight=' + browserHeight);
	// set the newY
	//var newY = Math.floor((myHeight - divheight) / 2);
    var newY = Math.floor((browserHeight - divheight) / 2);
	if (newY < 0){ // check to see if its less than 0, so the top of the div doesn't disappear offscreen
		newY = 0;

	}
	
	// set the newX
    var newX = Math.floor((myWidth - divwidth)) / 2;
	if (newX < 150){ // check to see if its less than 150, so we don't interfere with the left nav
		newX = 150;
	} 
	
	if (navigator.userAgent.indexOf('iPad') != -1) {
		//Ipad users
		if (( orientation == 0 ) || (orientation == 180)){  
			//alert ('Landscape Mode, Home Button bottom');  
			//alert ('Landscape Mode, Home Button top');  
			newY = 74;	
			newX = 100;	
			//alert('y = '+newY+' x = '+newX );	 
		} 		
	}
	


	
	//if (myHeight < divheight || myWidth < (divwidth+150)){ // check to see if the div height is too big on a small screen
		document.getElementById(divname).style.position='absolute';
		// apply values
		document.getElementById(divname).style.bottom = 'auto';
		document.getElementById(divname).style.top = newY + myHeight + 'px';
		document.getElementById(divname).style.left = newX + 'px';		
			
	//}else{
	//	document.getElementById(divname).style.position='absolute';
		// apply values
		//document.getElementById(divname).style.bottom = 'auto';
	//	document.getElementById(divname).style.top = '50%';
	//	alert(document.getElementById(divname).style.top);
	//	document.getElementById(divname).style.left = '50%';
	//	document.getElementById(divname).style.marginTop = -myHeight + 'px';
		//document.getElementById(divname).style.marginTop = newY + 'px';
	//	document.getElementById(divname).style.left = newX + 'px';		
		
	//}	
}

//Popup Hash
//load the page
window.onload = function () { 

	  //if hash or converted hash tag exists
	  if((window.location.hash) || (window.location.href.search('%23')!=-1)) {
		if(!($.browser.msie)) { //no IE
			console.log("Hash tag is found.");
		}
				//get full url
				var url = window.location.href;

				
				if(window.location.hash){
								split = '#';
				}else{
								split = '%23';
				}
				//grab the hash part
				url = url.split(split);
				var popdiv = url[1];          
				
				//fire the function, else log the error
				var popdiv = popdiv.toLowerCase();
				switch(popdiv){
					case "spotted":
						popSpot();
						break;
					case "leather":
						popLeather();
						break;
					case "crosby":
						popCrosby();
						break;
					case "shoes_video":
						popVideo('shoes')
						break;
					case "heritage":
						popHeritage();
						break;
					case "stripes":
						popupStripes();
						break;
					case "baby":
						popBaby();
						break;
					case "nares":
						popNares();
						break;
					case "washed":
						popWashedCanvas();
						break;
					case "mothersday":
						popMothersDay();
						break;
					case "glow":
						popGlow();
						break;
					default:
						if(!($.browser.msie)) { //no IE
							console.log("Hash tag has no popup function.");
						}
				}              
	  }else{
			  //no hash tag
			if(!($.browser.msie)) { //no IE
				console.log("No hash tag found in the URL.");
			}
	  }
}