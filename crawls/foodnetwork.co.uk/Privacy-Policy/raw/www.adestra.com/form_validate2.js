// (c) 2003-2005 Adestra Ltd.
// dan@adestra.com
// Do not reproduce without the permission of the author
// 
var groups = new Object();
var debugTxt = '';		
function validateForm(it){
	debugTxt = '';
	var bad = 0;
	for (i in groups){
		groups[i] = 0;
	}
	var els = it.getElementsByTagName('*');
	for (var i=0; i<els.length; i++){
		
		var loopbad = 0;
		var el = els[i];
		//if (el.getAttribute('validate')){alert(el.getAttribute('validate'))}
		if (el.getAttribute('validate') == 'notempty' && (el.value == '' || el.value == ' ')){
			loopbad = 1;
		}else if (el.getAttribute('validate') == 'email' && !el.value.match(/^[\w\d\.\_\-\']+@[\w\d\.\-]+\.[\w]+$/)){
			loopbad = 1;
		}else if (el.getAttribute('validate') == 'custom' && !el.value.match(el.getAttribute('regexp'))){
			loopbad = 1;
		}else if (el.getAttribute('validate') == 'checkbox' && !el.checked){
			loopbad = 1;
		}else{
			if (el.getAttribute('validate')){
				debugTxt += 'The validation type: '+ el.getAttribute('validate') +' is unknown (for element: '+ el.name +')\n'
			}
			markGood(el);
		}
		if (el.getAttribute('group') && loopbad == 1){
			if (groups[el.getAttribute('group')] == 1){
				loopbad = 0;
				markGood(el)
			}else{
				markBad(el);
			}
		}
		if (loopbad == 1 && !el.getAttribute('group')){
			markBad(el)
			bad =1;
		}
	}
	for (i in groups){
		if (groups[i] == 0){
			bad = 1;
		}
	}

	if (debug == 1){
		if (debugTxt != ''){
			alert('DEBUG OUTPUT\n\n'+debugTxt);
		}else{
			alert('DEBUG MODE IS ON\nRemember to disable it before releasing to the wild ;)')
		}
	}						
	if (bad == 1){
		alert(errorText);
		return false;
	}
}
function markBad(el){
	if (el.getAttribute('group')){
		if (groups[el.getAttribute('group')] != 1){
			groups[el.getAttribute('group')] = 0;
		}
		if (document.getElementById(el.getAttribute('group'))){
			document.getElementById(el.getAttribute('group')).style.backgroundColor = badGrpCol
		}else{
			debugTxt += 'You need a container element for the group: '+ el.getAttribute('group') +' (for element: '+ el.name +')\n';
		}
	}else{
		el.style.backgroundColor = badCol;
	}
}
function markGood(el){
	el.style.backgroundColor = '';
	if (el.getAttribute('group')){
		groups[el.getAttribute('group')] = 1;
		if (document.getElementById(el.getAttribute('group'))){
			document.getElementById(el.getAttribute('group')).style.backgroundColor = '';
		}else{
			debugTxt += 'You need a container element for the group: '+ el.getAttribute('group') +' (for element: '+ el.name +')\n';
		}
	}
}
