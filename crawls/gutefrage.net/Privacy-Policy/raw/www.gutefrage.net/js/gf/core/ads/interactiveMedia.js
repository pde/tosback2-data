/*jslint white: false, browser: true, cap: false, eqeqeq: true, evil: true, laxbreak: true, onevar: true, nomen: true, regexp: false */
/*global $, gf, window */


gf.core.ads.interactiveMedia = (function () {
  
  /*
   * inits interactive media banners
   */
  this.init = function(options) {
    
    this.websiteIdentifier = 'gf';
    this.adGroupId = Math.round(Math.random() * 1000); // adgroupid needs to be set 1 time to allow im banners to communicate
    this.layout = options.layout || '';
    this.channel = options.channel || '';
    this.subChannel = options.subChannel || '';
    this.tags = options.tags || '';
    this.consultationHour = options.consultationHour || '';
  };
  
  
  /*
   * renders the adtag 
   */
  this.renderAdtag = function(options){
    
    if((options.type === 'mob' && gf.ext.gutefrage.settings.version === '-gf-desktop') || (options.type === 'dis' && gf.ext.gutefrage.settings.version === '-gf-mobile')) {
      return;
    }
    
    if(options.identifier === 'performance') {
      // exception call for performancebanner which has no additional parameters to pass
      document.write('<script src="' + options.adTag + '"></script>');
      
    } else {
      
      // all other banners behave the same and need the same script call  
      var channelAlias = this.websiteIdentifier + '_' + options.type + '_' + this.channel + '_' + options.identifier + ';', // i.e. gf_dis_fashion_beauty_sky
      misc = new Date().getTime(),                                                                                          // random number which needs to be set for each adTag individually
      adtagSuffix = (options.identifier === 'sky' || options.identifier === 'ma-bottom-5') ? 'sub1=last;' : '';             // suffix is needed for the last adcall on the page (sky + mobile bottom)                                                    
      
      document.write('<script src="' + options.adTag + 'alias=' + channelAlias + 'kvgftag=' + this.tags + ';kvgfsprechstd=' + this.consultationHour + ';kvgfseitentyp='+ this.layout + ';key=' + this.tags.replace(/:/g, '+') + ';kvgfsubcat=' + this.subChannel + ';' + adtagSuffix + 'loc=100;target=_blank;grp=' + this.adGroupId + ';misc=' + misc + '"></script>');
      
    }
    
  };
  
  // public functions to return
  return {
    renderAdtag: this.renderAdtag,
    init: this.init
  };
}());