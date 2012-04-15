
function correctStrVal(obj) {      
  var value="";   
  if(typeof(obj) != "undefined")   {            
    value = obj;        
    value = value.replace(/\|/g,' ');           
    value = value.replace(/&/g,'and');   
  }   
  return value;
}


function setCustomVar() {
custom_var= correctStrVal(WT.ti) + '|' + correctStrVal(DCSext.promotion) + '|' + correctStrVal(WT.cg_n) + '|' + correctStrVal(WT.cg_s) + '|' + correctStrVal(WT.dcsvid) + 
'|' + correctStrVal(DCSext.authStatus) + '|' + correctStrVal(DCSext.ExtraCare) + '|' + correctStrVal(WT.vhseg_2) + '|' + correctStrVal(WT.vhseg_1) + '|' + correctStrVal(WT.vhseg_3) +
'|' + correctStrVal(WT.pn_sku) + '|' + correctStrVal(DCSext.pn_sku_desc) + '|' + correctStrVal(DCSext.findMed) + '|' + correctStrVal(DCSext.genericSwitch) +
'|' + correctStrVal(WT.oss) + '|' + correctStrVal(WT.oss_r) + '|' + correctStrVal(DCSext.OSS_Health) + '|' + correctStrVal(DCSext.cvs_serverinstance) + '|' + correctStrVal(DCSext.OSS_Help) + '|' + correctStrVal(DCSext.OSS_Prescription) +
'|' + correctStrVal(DCSext.OSS_Products);
}