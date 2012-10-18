function fw_config(ssid) {
  return {
    networkId:"169843",
    cb_profile:"169843:nbcu_live_as3", //nbcu_live_as3_Video  +cmpn
    siteSectionNetworkId:"169843",
    videoAssetNetworkId:"169843",
    fw_server:"http://29773.v.fwmrm.net/ad/p/1",
    siteSection:ssid,
    autoplay:false,
    amLocation:"http://adm.fwmrm.net/p/nbcu_live/AdManager.swf",
    pemURLs:"http://adm.fwmrm.net/p/nbcu_live/CountdownTimerExtension.swf",
    videoAssetFallbackId: "36574267"
  }; 
};
