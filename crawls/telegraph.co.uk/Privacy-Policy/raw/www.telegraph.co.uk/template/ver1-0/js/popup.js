/*
***************************************************************************
*
* Copyright (C) Telegraph Media Group Ltd.
* All Rights Reserved. No use, copying or distribution of this work may be
* made. This notice must be included on all copies, modifications and
* derivatives of this work.
*
* $Id: popup.js,v 1.7 2008/10/01 14:59:03 dysonl Exp $
*
***************************************************************************
*/

$(function() {
	$('.popMMP').click(function(){
		window.open($(this).attr('href'),'tcuk_mediaplayer','width=924,height=710,scrollbars=no');
		return false;
	});

	$('.popAudio').click(function(){
		window.open($(this).attr('href'),'Audio','width=260,height=350,scrollbars=no');
		return false;
	});

	$('.popMatt').click(function(){
		window.open($(this).attr('href'),'matt','width=392,height=470,scrollbars=no');
		return false;
	});

	$('.popAlex').click(function(){
		window.open($(this).attr('href'),'alex','width=820,height=690,scrollbars=no');
		return false;
	});

	$('.popTerms').click(function(){
		window.open($(this).attr('href'),'terms_and_conditions','height=400,width=400,scrollbars');
		return false;
	});

	$('.popMessageboard').click(function(){
		window.open($(this).attr('href'),'messageboard_post_message','height=450,width=305,scrollbars,resizable,directories');
		return false;
	});

	$('.popMessageboardPrint').click(function(){
		window.open($(this).attr('href'),'messageboard_post_message','height=600,width=600,scrollbars,resizable,toolbar,menubar,directories');
		return false;
	});

	$('.popAutotraderUsedCar').click(function(){
		window.open($(this).attr('href'),'autotrader_car_detail','height=700,width=700,scrollbars');
		return false;
	});
	
	$('.popAutotraderNewCar').click(function(){
		window.open($(this).attr('href'),'autotrader_car_detail','height=620,width=680,scrollbars');
		return false;
	});

	$('.popNewWindow').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
});


