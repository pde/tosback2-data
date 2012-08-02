dojo.provide("dj.widget.networkHat.RCLoginHeader");
dojo.require("dj.util.queryParam");
dojo.require("dj.util.Cookie");
dojo.require("dj.util.User");
dojo.require("dj.util.Region");

dj.widget.networkHat.RCLoginHeader = {
  init: function(conf) {
    
    this._cfg = dojo.mixin(this.DEFAULT_CONFIG, conf);
    this.pageLoaded();
    
  },
  
  DEFAULT_CONFIG : {    
    isLoadJs: false,  // todo set true
    isLoadCss: true,
    isLoadHtml: true,
    version: 2.1,
    domNodeId: "riskComplianceId",
    mstPageId: "0_0_WP_rnc_login",
    loginInfoDiv:"riskComplianceLogInInfoDivId",
    loginInfoClose:".riskComplianceLogInClose",
    riskTabInHat:"hat_tab_risk",
    hatTabWithRiskSelected:"hat_div",
    
    cookie: {
      name: "RnC",
      on: "1",
      off: "0",
      ttl: 365  //in days
    }
  },
  
  
 
  pageLoaded:function(){
    dojo.addClass(dojo.byId(this._cfg.hatTabWithRiskSelected),"RiskLogIn");
    if(!this.isCookieSet()){
      this.showMarketingDialog();
      dojo.query(this._cfg.loginInfoClose).connect("click",this, function(event) {
        this.closeMarketingDialog();
      });
    }
  },
  
  showMarketingDialog: function() {
    dojo.removeClass(dojo.byId(this._cfg.loginInfoDiv), "hidden");
  },
  closeMarketingDialog: function() {
    dojo.addClass(dojo.byId(this._cfg.loginInfoDiv), "hidden");
    this.dropCookie();
  },
  isCookieSet: function() {
    var cookieCfg = this._cfg.cookie;
    return (dj.util.Cookie.getGroupCookie("DJCOOKIE", cookieCfg.name) === cookieCfg.on);
  },
  dropCookie: function() {
    var cookieCfg = this._cfg.cookie;
    dj.util.Cookie.setGroupCookie("DJCOOKIE", cookieCfg.name, cookieCfg.on, cookieCfg.ttl);
  }
};
