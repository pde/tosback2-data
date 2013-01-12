var dateTime = {

	datePicker: function(elem,controller,action){
		$(elem).datepicker({ 
			dateFormat: "d M yy",
			changeMonth: true,
			changeYear: true,			
			onSelect: function(date, instance) {
				alert($(this).id)
			}
		});		
		$(elem).datepicker( 'show' ) // important
		$('#ui-datepicker-div').css('z-index',32767); // !important  needs higher z-index than modal
	},
	
	timePicker: function(elem){
		$(elem).timepicker({});
		$(elem).timepicker( 'show' )
	},
	
	parseDate:	function (input) {
		  var parts = input.match(/(\d+)/g);
		  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
		}
}