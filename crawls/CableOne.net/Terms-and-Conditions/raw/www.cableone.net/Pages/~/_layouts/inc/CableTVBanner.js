// JavaScript Document

var tempRawr = "crazy";
var tempAnswer = "";
var tempArrow = "";
var tempBorder = "";
var answerShow ="none";
var trclicked ="";

function BannerHideAnswer(){
	tempRawr = "0";
	answerShow = document.getElementById("hiddenELE1");
	answerShow.style.display="none";
	document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
	document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
	document.getElementById(tempBorder).style.borderBottomWidth="1px";
	document.getElementById(tempBorder).style.top="0px";
	document.getElementById(tempAnswer).style.display="none";
	
	
}

function BannerHideAnswerPhone(){
	tempRawr = "0";
	answerShow = document.getElementById("hiddenELE1");
	answerShow.style.display="none";
	document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
	document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
	document.getElementById(tempBorder).style.borderBottomWidth="1px";
	document.getElementById(tempBorder).style.top="0px";
	document.getElementById(tempAnswer).style.display="none";
	
	
}

function BannerShowAnswer(q_tr_id)
{
	var tempq_tr_id = q_tr_id.id;
	var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
	var cAnswer = document.getElementById("closeAnswer");
	var arrowChanger = document.getElementById("Y" + a_tr_id);
	var borderChanger = document.getElementById("B" + a_tr_id);
	answerShow = document.getElementById("hiddenELE1");
	trclicked =  document.getElementById("C" + a_tr_id);

	
	if  (answerShow.style.display == 'none' ) {
				trclicked.style.display="block";
				answerShow.style.display="block";
				arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
				borderChanger.style.borderBottomColor='#d9e2ea';
				borderChanger.style.top="1px";
				borderChanger.style.borderBottomWidth="0px";
				tempAnswer = trclicked.id;
				tempArrow = arrowChanger.id;
				tempBorder = borderChanger.id;
				tempRawr = trclicked.id;
			
			}
			
	else if (answerShow.style.display == 'block'){
				if (a_tr_id == 1){
						if (tempRawr == "C1"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C1";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
					
				else if (a_tr_id == 2){
						if (tempRawr == "C2"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C2";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
					
				else if (a_tr_id == 3){
						if (tempRawr == "C3"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
						tempRawr = "C3";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
				else if (a_tr_id == 4){
						if (tempRawr == "C4"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C4";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}	
				else if (a_tr_id == 5){
						if (tempRawr == "C5"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C5";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}	
		
	}
	
	else{
		tempRawr = "0";
		document.getElementById(tempAnswer).style.display="none";
		document.getElementById(tempArrow).src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
		document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
		document.getElementById(tempBorder).style.borderBottomWidth="1px";
		document.getElementById(tempBorder).style.top="0px";
		trclicked.style.display="none";
		answerShow.style.display="none";
		arrowChanger.src='../../SiteCollectionImages/For Your Home/arrow_norm.gif';
		borderChanger.style.borderBottomColor='#7c9fbf';
		borderChanger.style.top="0px";
		borderChanger.style.borderBottomWidth="1px";
		tempAnswer = trclicked.id;
		tempArrow = arrowChanger.id;
		tempBorder = borderChanger.id;
		

	}
}

function BannerShowAnswerPhone(q_tr_id)
{
	var tempq_tr_id = q_tr_id.id;
	var a_tr_id = tempq_tr_id.substr(1,tempq_tr_id.length);
	var cAnswer = document.getElementById("closeAnswer");
	var arrowChanger = document.getElementById("Y" + a_tr_id);
	var borderChanger = document.getElementById("B" + a_tr_id);
	answerShow = document.getElementById("hiddenELE1");
	trclicked =  document.getElementById("C" + a_tr_id);

	
	if  (answerShow.style.display == 'none' ) {
				trclicked.style.display="block";
				answerShow.style.display="block";
				arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
				borderChanger.style.borderBottomColor='#d9e2ea';
				borderChanger.style.top="1px";
				borderChanger.style.borderBottomWidth="0px";
				tempAnswer = trclicked.id;
				tempArrow = arrowChanger.id;
				tempBorder = borderChanger.id;
				tempRawr = trclicked.id;
			
			}
			
	else if (answerShow.style.display == 'block'){
				if (a_tr_id == 1){
						if (tempRawr == "C1"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C1";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
					
				else if (a_tr_id == 2){
						if (tempRawr == "C2"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C2";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
					
				else if (a_tr_id == 3){
						if (tempRawr == "C3"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
						tempRawr = "C3";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}
				else if (a_tr_id == 4){
						if (tempRawr == "C4"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C4";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}	
				else if (a_tr_id == 5){
						if (tempRawr == "C5"){
							tempRawr = "0";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="none";
							answerShow.style.display="none";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							borderChanger.style.borderBottomColor='#7c9fbf';
							borderChanger.style.top="0px";
							borderChanger.style.borderBottomWidth="1px";
							
						}
						else{
							tempRawr = "C5";
							document.getElementById(tempAnswer).style.display="none";
							document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
							document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
							document.getElementById(tempBorder).style.borderBottomWidth="1px";
							document.getElementById(tempBorder).style.top="0px";
							trclicked.style.display="block";
							answerShow.style.display="block";
							arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_selec.gif';
							borderChanger.style.borderBottomColor='#d9e2ea';
							borderChanger.style.top="1px";
							borderChanger.style.borderBottomWidth="0px";
							tempAnswer = trclicked.id;
							tempArrow = arrowChanger.id;
							tempBorder = borderChanger.id;
						}
				}	
		
	}
	
	else{
		tempRawr = "0";
		document.getElementById(tempAnswer).style.display="none";
		document.getElementById(tempArrow).src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
		document.getElementById(tempBorder).style.borderBottomColor='#7c9fbf';
		document.getElementById(tempBorder).style.borderBottomWidth="1px";
		document.getElementById(tempBorder).style.top="0px";
		trclicked.style.display="none";
		answerShow.style.display="none";
		arrowChanger.src='../../../SiteCollectionImages/For Your Home/arrow_norm.gif';
		borderChanger.style.borderBottomColor='#7c9fbf';
		borderChanger.style.top="0px";
		borderChanger.style.borderBottomWidth="1px";
		tempAnswer = trclicked.id;
		tempArrow = arrowChanger.id;
		tempBorder = borderChanger.id;
		

	}
}
	 
		
 	
 
