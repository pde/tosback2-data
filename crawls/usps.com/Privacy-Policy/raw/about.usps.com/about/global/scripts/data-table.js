dojo.addOnLoad(function(){
 
 dojo.forEach(
  dojo.query("table.dataTable"),
   function(tb){
   
    dojo.query('tr th:first-child, tr td:first-child',tb).addClass('firstCol');
    dojo.query('tr th:last-child, tr td:last-child',tb).addClass('lastCol');
    dojo.query('tbody tr:last-child',tb).addClass('lastRow');
    dojo.query('tr:nth-child(even)',tb).addClass('even');
    
    var hasY = dojo.query('tbody th',tb);
    if(hasY.length != 0){
     dojo.query('thead th:first-child',tb).addClass('hasY');
    }
    
   }
 );
 
/* bioDetail
  .addClass( 'hide' )
  .at(0).removeClass( 'hide' );
 
 bioList
  .at(0).addClass( 'active' );
  
 bioList.onclick(function(e){
 
  dojo.stopEvent(e);

  // Removes previous active indicator and highlights clicked bio
  bioList.removeClass( 'active' );
  dojo.query(this).addClass( 'active' );

  // Hides previous bio and displays the current one
  var position = dojo.indexOf(bioList, this);
  bioDetail
   .addClass( 'hide' )
   .at(position).removeClass( 'hide' );
 
 }); */
    
});