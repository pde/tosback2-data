
$(document).ready(function(){var page_url=window.location.toString();showSubnav();hoverState();function showSubnav()
{$('#business_nav').hover(function(){$(this).children('ul').show();},function(){$(this).children('ul').hide();});}
function hoverState()
{$('#header_bar_nav > li').hover(function(){$(this).addClass('on');},function(){$(this).removeClass('on');});}});