$(document).ready(function(){ 
						   	
	$('#girForm\\:sorttable').tablesorter( {sortList: [[0,1], [1,0]]} );
	$('#girForm\\:sorttable').tablesorterPager({container: $("#pager")}); 
	$('#girForm\\:sorttable').tablesorterPager({container: $("#pager1")}); 
	$('#pager .pagesize').change(function(){
										  
								$('#pager1 .pagesize').attr('selectedIndex',$('#pager .pagesize').attr('selectedIndex'));
								});
	$('#pager1 .pagesize').change(function(){
								$('#pager .pagesize').attr('selectedIndex',$('#pager1 .pagesize').attr('selectedIndex'));
								
								});
	$('#girForm\\:sorttable thead tr th').each(function(){
		  $(this).toggle(function(){
				var txt=$(this).text();
				 $('#girForm\\:sorttable thead tr th').each(function(){
								var txt2=$(this).text();
								$(this).html(txt2);								
				   });
				},
				function(){
				var txt=$(this).text();
				$('#girForm\\:sorttable thead tr th').each(function(){
								var txt2=$(this).text();
								$(this).html(txt2);								
				   });
				  }
				);
		  });
		$('.pagesize').selectedIndex=0;
	} 
	
); 