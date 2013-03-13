function getValueFromThomasVideoPlayer(obj)
{
    /*alert(obj.event_detail_attr47);
    alert(obj.event_category_id);
    alert(obj.event_action_type);
    alert(obj.event_action_attr46);
    alert(obj.event_id);
    alert(obj.event_detail_sub_attr48);
    alert(obj.event_length_attr49);
    alert(obj.event_length_full_attr50);*/

utag.view({

      event_id:obj.event_detail_attr47,  //based on the request from mattel we have swapped the values with event_id & event_details_attr47   
      event_category_id:obj.event_category_id,
      event_action_type: '', 
      event_type:'element',
      event_action_attr46:obj.event_action_type,
      event_detail_attr47:obj.event_id,  //based on the request from mattel we have swapped the values with event_id & event_details_attr47
      event_detail_sub_attr48:obj.event_detail_sub_attr48,  
      event_length_attr49:obj.event_length_attr49, 
      event_length_full_attr50:obj.event_length_full_attr50
});


}


function getValueFromFlashVideo(obj)
{
    /*alert(obj.event_detail_attr47);
    alert(obj.event_category_id);
    alert(obj.event_action_type);
    alert(obj.event_action_attr46);
    alert(obj.event_id);
    alert(obj.event_detail_sub_attr48);
    alert(obj.event_length_attr49);
    alert(obj.event_length_full_attr50);*/

utag.view({

      event_id:obj.event_detail_attr47, //based on the request from mattel we have swapped the values with event_id & event_details_attr47    
      event_category_id:obj.event_category_id,
      event_action_type: '',
      event_type:'element',
      event_action_attr46:obj.event_action_type,
      event_detail_attr47:obj.event_id, //based on the request from mattel we have swapped the values with event_id & event_details_attr47 
      event_detail_sub_attr48:obj.event_detail_sub_attr48,  
      event_length_attr49:obj.event_length_attr49, 
      event_length_full_attr50:obj.event_length_full_attr50
});


}