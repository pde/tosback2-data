function loadAccordion(x) 
{
	var num = (eval(x))-1;
	var topAccordion = new accordion('accordion', {
		classNames : {
			toggle : 'accToggler',
			toggleActive : 'toggleActive',
			content : 'accContent'
		},
		defaultSize : {
			width : 230
		},
		direction : 'vertical'
	});	

	$$(".accToggler").each(function(element){
		element.removeClassName("toggleActive");
	});
	topAccordion.activate($$('#accordion .accToggler')[num]);
}