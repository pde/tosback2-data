





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
  "membershipGroup": "IntEmpAllCntntVwr,iBL_User,Employee,PrivateUser",
  "membershipGroup_xss": "IntEmpAllCntntVwr,iBL_User,Employee,PrivateUser",
  "avatar": "http://www.gravatar.com/avatar/0e5f6f65b608808234de671f12978cad?d=/etc/designs/default/images/collab/avatar.png&r=g",
  "path": "/home/users/M/MAD\\arabbani/profile",
  "isLoggedIn": true,
  "isLoggedIn_xss": "true",
  "authorizableId": "MAD\\arabbani",
  "authorizableId_xss": "MAD\\arabbani",
  "formattedName": "ALI RABBANI",
  "formattedName_xss": "ALI RABBANI",
  "email": "ali.rabbani@intel.com",
  "email_xss": "ali.rabbani@intel.com",
  "givenName": "ALI",
  "givenName_xss": "ALI",
  "familyName": "RABBANI",
  "familyName_xss": "RABBANI",
  "isInternal": "Y",
  "isInternal_xss": "Y"
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
  "random": "0.07"
}, true);
}
