//*  BazaarVoice Coremetrics integration tag interface - switch is on
//* 
function jcpCreateCMBVTag(bvTotalReviewCount, bvAvgRating, bvRatingsOnlyRV, bvBuyAgainPerc)
{
	if (typeof jcpBvProdID != 'undefined' || typeof jcpBvProdName != 'undefined' || typeof jcpBvCmCatID != 'undefined')
		{
			cmCreateBazaarVoiceTag(jcpBvProdID, jcpBvProdName,jcpBvCmCatID,bvTotalReviewCount,bvAvgRating,bvRatingsOnlyRV,bvBuyAgainPerc);
		}
	
}