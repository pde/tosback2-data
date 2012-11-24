





if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
    CQ_Analytics.ProfileDataMgr.addListener("update", function(event, property) {
        var authorizableId = this.getProperty("authorizableId");
        if (!authorizableId || authorizableId == "anonymous") {
            $CQ(".cq-cc-profile-not-anonymous").hide();
            $CQ(".cq-cc-profile-anonymous").show();
        } else {
            $CQ(".cq-cc-profile-not-anonymous").show();
            $CQ(".cq-cc-profile-anonymous").hide();
        }
    });

    
        CQ_Analytics.ProfileDataMgr.loadInitProperties({
  "membershipGroup": "anonymous",
  "membershipGroup_xss": "anonymous",
  "avatar": "/etc/designs/default/images/collab/avatar.png",
  "path": "/home/users/a/anonymous/profile",
  "isLoggedIn": false,
  "isLoggedIn_xss": "false",
  "authorizableId": "anonymous",
  "authorizableId_xss": "anonymous",
  "formattedName": "",
  "formattedName_xss": "",
  "memberSince": "26 Jun 2011 10:57 PM"
});
    

    CQ_Analytics.ProfileDataMgr.init();
}





if( CQ_Analytics && CQ_Analytics.SurferInfoMgr) {
    CQ_Analytics.SurferInfoMgr.loadInitProperties({
  "IP": "10.18.8.222",
  "keywords": ""
}, true);
}if( CQ_Analytics && CQ_Analytics.TagCloudMgr) {
    CQ_Analytics.TagCloudMgr.init([
]);
}


if( CQ_Analytics && CQ_Analytics.PageDataMgr) {
    CQ_Analytics.PageDataMgr.loadInitProperties({
  "random": "0.68"
}, true);
}
