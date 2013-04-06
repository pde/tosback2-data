function getValueFromThomasVideoPlayer(obj) {

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

function getValueFromFlashForAS1(eventID, eCatID, eActType, eActAttr46, eDetAttr47, eDetSubAttr48, eLength, eFullLength) 
{
    var obj = new Object();
    obj.event_id = eventID;
    obj.event_category_id = eCatID;
    obj.event_action_type = eActType;
    obj.event_action_attr46 = eActAttr46;
    obj.event_detail_attr47 = eDetAttr47;
    obj.event_detail_sub_attr48 = eDetSubAttr48;
    obj.event_length_attr49 = eLength;
    obj.event_length_full_attr50 = eFullLength;
    getValueFromFlash(obj);
}


function getValueFromFlash(obj) 
{
    //var gameName = document.getElementById("gameName").value;
    var gameName;
    if (document.getElementById("gameName") == null) 
    {
        gameName = document.getElementById("ItemId").innerHTML;
    }
    else 
    {
        gameName = document.getElementById("gameName").value;
    }

    utag.view({
        event_id: gameName,
        event_category_id: obj.event_category_id,
        //event_action_type: obj.event_action_type,
        event_type: 'element',
        event_action_attr46: obj.event_action_type,
        event_detail_attr47: obj.event_id,
        event_detail_sub_attr48: obj.event_detail_sub_attr48,
        event_length_attr49: obj.event_length_attr49,
        event_length_full_attr50: obj.event_length_full_attr50
    });
}