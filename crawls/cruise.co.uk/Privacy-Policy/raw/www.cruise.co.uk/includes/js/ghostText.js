/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ghostText(t, defaultValue){
      var value = $(t).val();
      if(value == defaultValue){
          $(t).val("");
      }
} 