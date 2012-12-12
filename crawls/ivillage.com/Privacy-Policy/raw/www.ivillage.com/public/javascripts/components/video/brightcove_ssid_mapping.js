var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );

function fw_config(ssid_param,assetid_param)
{
var ssid = ssid_param;
var assetid = assetid_param;
if (iOS)
{
return { adManagerUrl:"http://adm.fwmrm.net/p/nbcu_jsbrightcove_live/AdManager.js", networkId: 169843, serverUrl:"http://29773.v.fwmrm.net", playerProfile:"169843:nbcu_jsbrightcove_live", videoAssetCustomId:assetid, videoAssetNetworkId: 169843, siteSectionNetworkId: 169843, siteSectionId:ssid };
}
else
{
return { networkId:"169843", cb_profile:"169843:nbcu_live_as3", siteSectionNetworkId:"169843", videoAssetNetworkId:"169843", fw_server:"http://29773.v.fwmrm.net/ad/p/1", siteSection:ssid, autoplay:false, amLocation:"http://adm.fwmrm.net/p/nbcu_live/AdManager.swf", pemURLs:"http://adm.fwmrm.net/p/nbcu_live/CountdownTimerExtension.swf", videoAssetFallbackId: "36574267" };

}
}
