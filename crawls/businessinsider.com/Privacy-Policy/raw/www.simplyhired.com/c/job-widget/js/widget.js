
function sh_iframe_widget(widget_id,c) {

  //default values
  var d = c.partner != undefined ? null : {num_jobs:5,ad_type:1,clickthrough:0};

  //url values
  var u = {d:'http://www.simplyhired.com','r':'/a/job-widget/list/','p':[],'q':[]};

  //url path params
  if (c.keywords != undefined) u.p.push('q-'+encodeURIComponent(c.keywords));
  if (c.location != undefined) u.p.push('l-'+encodeURIComponent(c.location));
  if (!d || c.num_jobs != d.num_jobs) u.p.push('ws-'+encodeURIComponent(c.num_jobs));
  if (c.publisher && c.publisher > 0) u.p.push('pub_id-'+encodeURIComponent(c.publisher));

  //url query params
  if (c.partner) u.q.push('partner='+encodeURIComponent(c.partner));
  if (c.ad_type != undefined && (!d || c.ad_type != d.ad_type)) u.q.push('ad_type='+encodeURIComponent(c.ad_type));
  if (c.clickthrough != undefined && (!d || c.clickthrough != d.clickthrough)) u.q.push('clickthrough='+encodeURIComponent(c.clickthrough));
  if (c.stylesheet) u.q.push('stylesheet='+encodeURIComponent(c.stylesheet));
  if (c.color_title) u.q.push('color_title='+encodeURIComponent(c.color_title));
  if (c.color_location) u.q.push('color_location='+encodeURIComponent(c.color_location));
  if (c.color_company) u.q.push('color_company='+encodeURIComponent(c.color_company));
  if (c.color_bg) u.q.push('color_bg='+encodeURIComponent(c.color_bg));
  if (c.header != undefined) u.q.push('header='+encodeURIComponent(c.header));
  if (c.header_image_url) u.q.push('header_image_url='+encodeURIComponent(c.header_image_url));
  if (c.searchbox != undefined && c.searchbox != 'on') u.q.push('searchbox='+encodeURIComponent(c.searchbox));
  if (c.searchlink != undefined && c.searchlink != 'on') u.q.push('searchlink='+encodeURIComponent(c.searchlink));
  if (c.poweredby != undefined && c.poweredby != 'on') u.q.push('poweredby='+encodeURIComponent(c.poweredby));
  if (c.ga_account) u.q.push('ga_account='+encodeURIComponent(c.ga_account));

  //for backwards compatibility
  if (c.organic_base_url) u.q.push('organic_base_url='+encodeURIComponent(c.organic_base_url));
  if (c.sponsored_base_url) u.q.push('sponsored_base_url='+encodeURIComponent(c.sponsored_base_url));

  //dynamic height
  if (!c.height || c.organic_base_url || c.sponsored_base_url) {

    var i = new Image();
    if (c.header_image_url) i.src = c.header_image_url;

    var h = {padding:10/*5*2*/,header:25/*15*1+10*/,job:55/*15*3+10*/,see_all_jobs:20/*15+5*/,search_form:30/*25*1+5*/,powered_by:15/*15*1*/};
    var w = c.width != undefined && c.width.search('px') ? parseInt(c.width) : 0;

    if (c.searchbox != 'on') h.search_form = 0;
    if (c.searchlink != 'on' || c.num_jobs <= 0) h.see_all_jobs = 0;
    if (c.poweredby != 'on') h.powered_by = 0;

    if (c.header == '') h.header = 0;
    if (c.header_image_url) h.header = (w && i.width > w) ? h.header+i.height : Math.max(h.header,i.height);

    if (w > 0) {
      if (w < 200) h.search_form = 55; /*25*2*/
      if (w < 130) h.powered_by = 30; /*15*2*/
      if (w > 250) h.job = 40; /*15*2+10*/
    }

    c.height = Math.ceil(h.padding + h.header + Math.abs(c.num_jobs)*h.job + h.see_all_jobs + h.search_form + h.powered_by) + 'px';
  }

  //iframe values
  var i = {s:[],a:['marginheight="0"','marginwidth="0"','frameborder="0"','scrolling="no"','noresize']};

  //iframe styles
  if (c.width) i.s.push('width:'+c.width);
  else i.s.push('width:100%');
  if (c.height) i.s.push('height:'+c.height);
  if (c.color_border) i.s.push('border:1px solid '+c.color_border);

  //widget
  var w = document.getElementById(widget_id);
  if (w) w.innerHTML = '<iframe id="'+widget_id+'_iframe" src="'+u.d+u.r+u.p.join('/')+'?'+u.q.join('&')+'" style="'+i.s.join(';')+'" '+i.a.join(' ')+'></iframe>'

}

try {
  var fn = function(e) {sh_iframe_widget('simplyhired_job_widget',simplyhired_widget)};
  if (window.addEventListener) window.addEventListener('load',fn,false);
  else if (window.attachEvent) window.attachEvent('onload',fn);
} catch(e) {}
