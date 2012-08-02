/*Gomez tag version: 7.1.2b*/
var gomez=gomez?gomez:{};

//copy s to d
gomez.extend=function(d, s)
{
    for (var p in s)
    {
        d[p]=s[p];
    }
    return d;
};

gomez.extend(gomez,
{
    randomSample : function(r)
    {
        if(r<=0)return false;
        return Math.random()<=r&&r;  // r&&r is to check r is valid value
    },
    getCookie: function(n)  //get cookie value, n: cookie name
    {
        var c=document.cookie;
        var v=c.match(new RegExp(';[ ]*'+n+'=([^;]*)'));
        if(!v) v=c.match(new RegExp('^'+n+'=([^;]*)'));
        if (v) return unescape(v[1]);
        return '';
    },
    setCookie: function(n,v,e,p,d,s)  //n: cookie name, v: cookie value, e: cookie expire, p: cookie path, d: cookie domain, s: cookie secure
    {
        try
        {
            var t=this,a=t.domain?t.domain:location.hostname;
            var c=n+'='+escape(v)+
                (e?';expires='+e.toGMTString():'')+ 
                (p?';path='+p:';path=/')+ 
                (d?';domain='+d:';domain=' +a) +
                (s?';secure':''); 
            document.cookie=c;
        }
        catch(e){}
    },
    getCombineCookie:function(n) //get n value from cookie __g_c
    {
        var t=this;
        if(n)
        {
            var s = t.getCookie("__g_c");
            if(!s) return '';
            var v=s.match(new RegExp(n+':([^\|]*)'));
            if(v) return unescape(v[1]);
            return '';
        }
        else return '';
    },
    setCombineCookie:function(n,m) //set n value as m of cookie __g_c
    {
        var t=this;
        if(n)
        {
            var s=t.getCookie("__g_c");
            if(s)
            {
                if(s.indexOf(n+':') != -1) s=s.replace(new RegExp('('+n+':[^\|]*)'),n+':'+m);
                else s=s==' '?n+':'+m:s+'|'+n+':'+m;
                t.setCookie("__g_c",s);
            }
            else t.setCookie("__g_c",n+':'+m);
        };
    },
    
    
    //in tag 7.1.2b, this method is called by script to set the uniqueId and session id when the visitor first visit.
    //b2 is used to set visitor id and session id for end user;
    //v is the visitor id while s stands for the session id. visitor id is unique globally;
    //this function is also a callback function, it is trigger from server side.  946080000000=30 years   
    b2 : function(v,s)
    {
        var t=this,f=new Date(t.gt()+946080000000),g=''+v+'_'+s;
        t.setCookie('__g_u',g,f);
        t.gc.c=v;
        t.gc.d=s;
        //set a session cookie
        t.setCombineCookie('c',v);
        t.setCombineCookie('d',s);
    },
    gt: function(){return new Date().getTime()},
    grt: function(){return new Date().getTime()-gomez.gs},
    filterHost:function(h)
    {
        if(h)
        {
            if(h.indexOf('<')!=-1 || h.indexOf('%3C')!=-1 || h.indexOf('%3c')!=-1) return null;
            if(window.decodeURIComponent) return decodeURIComponent(h);
            else return unescape(h);
        }
        return null;
    },
    formatUrl: function(u,t)
    {
        try
        {
            if (u)
            {
                if(!/(^http|^https)/.test(u))
                {
                    if(t==1) return gomez.filterHost(location.hostname);
                    else return u;
                }
                var p=new RegExp('(^http|^https|):\/{2}([^\?#;]*)');
                if(t==1) p=new RegExp('(^http|^https|):\/{2}([^\/\?]*)');
                var r=u.match(p);
                if(r&&t==1) return gomez.filterHost(r[2]); else if(r) return r[0];
            }
            return null;
        }
        catch(e){return null;}
    },
    
    setClickTime:function(n) 
    {
        try
        {       	
	        var t = this,key = escape((window.location + n).replace(new RegExp("([:\/\.])","gm"),""));
	        if(key&&key.length>100)
	        {
	        	key = key.substring(0,100);
	        }	        
	        if (window.localStorage)
	        {
	            window.localStorage.setItem(key, t.gt());
	        }
	        else
	        {
	        		t.setCombineCookie('r',key+'___'+t.gt());
	        }
        }
        catch(e){return ;}	          
    },    
    getClickTime:function() 
    {
        try
        {       	
	        var m,t = this,key = escape((document.referrer + window.location).replace(new RegExp("([:\/\.])","gm"),""));
	        if(key&&key.length>100)
	        {
	        	key = key.substring(0,100);
	        }
	        if (window.localStorage)
	        { 
	        		m = window.localStorage.getItem(key);
	        }
	        if(!m)
	        {
	            var c=t.getCombineCookie("r");
	            if(c)
	            {
	                var r=c.split('___');
	                if(r && r[0]==key)
	                {
	                    m=r[1];
	                }
	            };
	        };
	        t.clearClickTime();
	        return m;
        }
        catch(e){return ;}	          
    }, 
    clearClickTime:function()
    {
        try
        {       	
	        var t = this;
	        if (window.localStorage)
	        {
	        	  var key = escape((document.referrer + window.location).replace(new RegExp("([:\/\.])","gm"),""));
			        if(key&&key.length>100)
			        {
			        	key = key.substring(0,100);
			        }	        	  
	            window.localStorage.removeItem(key);
	        }
	        else
	        {
	        		t.setCombineCookie('r', '');
	        }
        }
        catch(e){return ;}	          
    },    
    newGuid:function()
    {
        var ret='';
        for(var i=0; i<3; i++)
        {
            ret = ret + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        ret = parseInt(ret, 16);
        return ret;
    },
    sRInCookie:function()
    {
        var t = this;
        var g = t.getCookie("__g_u");
        if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1)
        {
            var r = g.split("_");
            if (r.length>5)
            {
                //if cookie is expired return 1; else return the right value
                if (parseInt(r[5]) < new Date().getTime())
                {
                    return undefined;
                }
                else
                {
                    return parseFloat(r[2]);
                }
            }
        }
        return undefined;
    }   
});

gomez.Packager=function(){};
gomez.Packager.prototype=
{
   
    hash: function(o)
    {
        if(!o) return '';
        var t=this,s='{n:'+t.filter(o['n'])+'|';
        for(var i in o) 
        {
            if(i=='n') continue;
            if(typeof(o[i]) == 'string' || typeof(o[i]) == 'number') s += i+':'+t.filter(o[i])+'|';
        };
        s=s.substring(0,s.length-1);
        return s+'}';
    },
   
    filter: function(s)
    {
        s='' + s;//convert s to a string
        s=s.replace(new RegExp("[|]","gm"),"#$#").replace(':','$*$').replace('{','@#@').replace('}','*@*').replace('&','!*!');
        return s;
    },
    makeCommon: function()//u is capture time. if u is given we need add a x property to common information. otherwise we should remove the x property;
    {
        var t=this,z=gomez;
        if(z.grpIds)z.extend(z.gc,z.grpIds);
        if(z.wrate)z.gc.r=z.wrate;
        z.gc.e=z.grpId;  //gomez.gc is PageCommon
        z.gc.v='7.1.2b';
        for (var i=1; i<5; i++)
        {
            if (z["grpId"+i] != undefined)
            {
                z.gc["e"+i] = z["grpId"+i];
            }
        }
        z.gc.b=z.pgId;
        z.gc.l=z.formatUrl(z.url,2);
        
        if (self.screen)
        {
            z.gc.m=screen.width;
            z.gc.o=screen.height;
        }
        else if (self.java)
        {
            var j=java.awt.Toolkit.getDefaultToolkit();
            var s=j.getScreenSize();
            z.gc.m=s.width;
            z.gc.o=s.height;
        };
        z.gc.p=navigator.platform;
        if(navigator.cpuClass)
            z.gc.q=navigator.cpuClass;
        if(!z.gc.f&&!z.gc.g)
        {
            //get connection type in IE
            try
            {
                var a=new Array("MSIE","Firefox","Opera","Safari","Chrome"),b=document.createElement('div');
                if (b.addBehavior&&document.body)
                {
                    b.addBehavior('#default#clientCaps');
                    z.gc.k=b.connectionType;
                }
            }
            catch(e){};
            for(var i=0;i<a.length;i++)
            {
                if(navigator.userAgent.indexOf(a[i])!=-1)
                {
                    z.gc.g=a[i];
                    var c=navigator.userAgent.match('Version')?'Version':a[i];
                    z.gc.f=(new String(navigator.userAgent.substring(navigator.userAgent.indexOf(c)).match(/[\d.]+/))).substring(0);     
                }
            }
            if(!z.gc.f&&!z.gc.g)//for other browsers(not "MSIE","Firefox","Opera","Safari")
            {
                z.gc.g=navigator.vendor||navigator.appName;
                z.gc.f=(new String(navigator.appVersion.match(/[\d.]+/))).substring(0);
            }
        }
        return t.hash(z.gc);
    }
};

try
{
	gomez.gc={'n':'c'};//Because we need set the visitor id and session id by calling b2, we must init the gomez.gc first.
	var iU = gomez.getCookie('__g_u');
	if (iU==undefined || iU=='')
	{
	    gomez.b2(gomez.newGuid(), 0);
	}
	
	//Get sample rate and wrate. if sample rate or wrate don't exist, set their value as  1;
	var sR = gomez.sRInCookie();
	if (sR == undefined)
	{
	    sR = 1;
	    gomez.isFirstVi = true; //isFirstVi indicate this is thf first visit to this page, we need request sample rate.
	}
	else
	{
	    gomez.isFirstVi = false;
	}
	var wR = gomez.wrate?parseFloat(gomez.wrate):(gomez.wrate==0?0:1); 
	wR = wR<0?0:(wR>1?1:wR);
	/*Check sample*/
	gomez.inSample = gomez.getCombineCookie('a');
	if (!gomez.inSample || gomez.inSample=='')
	{
	    if(gomez.randomSample(wR*sR))
	    {
	        gomez.inSample = 1;
	    }
	    else
	    {
	        gomez.inSample = 0;
	    }
	    gomez.setCombineCookie('a', gomez.inSample);
	}
	else
	{
	    gomez.inSample = parseInt(gomez.inSample);
	}
	gomez.runFlg = gomez.inSample>0;
	
	//Changed end
	if(gomez.runFlg)
	{
	gomez.clickT = gomez.getClickTime();
	
	gomez.getVar=function(v,d){return v?v:d};
	gomez.gs=gomez.getVar(gomez.gs,new Date().getTime());  //first byte time
	gomez.acctId=gomez.getVar(gomez.acctId,''); //will be defined by our customer
	gomez.pgId=gomez.getVar(gomez.pgId,''); //will be defined by our customer
	gomez.grpId=gomez.getVar(gomez.grpId, ''); //will be defined by our customer
	gomez.EventListener=function(c){this.s=c;};
	gomez.EventListener.prototype = 
	{
	    listen: function(e)
	    {
	        var t=gomez,i=t.getObject(e);
	        if(i) i.e=t.grt();  //i.e is object endtime
	    }
	};
	gomez.Poller=function(m){this.a=m;};
	gomez.Poller.prototype = 
	{
	    poll: function(m)
	    {  
	        var t=gomez,n=t.grt();
	        var s=document.getElementsByTagName(m);
	        var e=t.cssStore;
	        if(m=='script') e=t.scriptStore;
	        if(m=='iframe') e=t.frameStore;
	        if(s)
	        {
	            var l=s.length;
	            for(var i=0;i<l;i++)
	            {
	                var u = s[i].href || s[i].src;	                
	                if(u && !e[u])
	                {
	                    var r = new gomez.EventListener(e);
	                    t.grm[u]=r;
	                    e[u]=new t.objectRecord(u, n);    // n is object start time
	                    if(t.gIE&&m=='script') t.addEvent(s[i],'readystatechange',t.scriptStateChanged,false);
	                    else t.addEvent(s[i],'load',r.listen,false);
	                }
	            }
	        }
	    }
	};
	gomez.Poller.m=new Object;
	gomez.Sender=function()
	{
	    var t=this,h=gomez.dns?gomez.dns:gomez.acctId+".r.axf8.net";
	    //h="10.0.11.5";
	    t.recHttpUrl=('https:' == location.protocol ?'https:' : 'http:')+'//'+h+'/mr/b.gif?'; 
	    t.pvHttpUrl=('https:' == location.protocol ?'https:' : 'http:')+'//'+h+'/mr/e.gif?';//e.fig
	    t.abHttpUrl=('https:' == location.protocol ?'https:' : 'http:')+'//'+h+'/mr/f.gif?';//f.gif
	
	};
	gomez.Base=function(m){this.n=m};
	//RUM function defined
	gomez.init=function()
	{
	    var t=this;
	    t.gIE=false;
	    t.imageStore=new Object;
	    t.lastImage=0;
	    t.scriptStore=new Object;
	    t.cssStore=new Object;
	    t.frameStore=new Object;
	    t.url=location.href;
	    t.dom_time=-1;
	    t.onload_time=-1;
	    t.intervals=new Array; //interval objects
	    t.verboseneed=false;
	    t.gSfr=/KHTML|WebKit/i.test(navigator.userAgent);   //check Safari browser
	    t.grm = new Object;
	    t.postedSummary; //basic info post back
	    t.gomez_cansend=false;
	    t.superneed=false;
	    t.pUtil=new gomez.Sender; //create a Sender
	    t.request=false;
	    t.h6=false;
	    t.n1=0;
	    t.postload_done=false;
	    
      t.postunload_done=false;
      t.stop_time=-1;
      t.sendid;
      t.imgSrcMapId=new Array;
      t.last_visible=0;
      t.lastobj_above;
      t.basic_info=new gomez.Base('b'); //store basic info  n:b
      t.page_info=new gomez.Base('v'); //store verbose info  n:v
      t.hostImages=new Array; //every host's image count info
      t.hostFlashes=new Array; //every host's flash count info
      t.hostSpecialObjects=new Array; //every host's Special Object count info
      t.imgInfos=new Array;
      t.flashes=new Array;
      t.errorInfos='';
      t.flgRescn=false; //indicate whether the response time has been stored
      t.flashStore=new Object;
      t.rescn='r'; //response Cookie Name
      t.eventSqno=new Object;
      t.evn= new Array;	    
	};
	var wa=0;
	gomez.extend(gomez,
	{    
	    // Sends the RPC given in url. The server will return JavaScript that will carry out the required actions.
	    sendByScript: function(u)
	    {
	        try
	        {
	            var s=document.createElement('script');
	            s.async = true;
	            if(navigator.userAgent.indexOf('Firefox/3.5')!=-1)
	            {
	            	s.defer = true;
	            }	            
			        s.src=u;
			        s.type='text/javascript';
			        if (document.body) document.body.appendChild(s);
			        else if (document.documentElement.getElementsByTagName('head')[0]) document.documentElement.getElementsByTagName('head')[0].appendChild(s);
	        }
	        catch(e)
	        {
	            var t=gomez;
	            if (t.gSfr) document.write("<scr"+"ipt src='"+u+"'"+"><\/scr"+"ipt>");
	        }
	    },
	    getConfiguration : function()
	    {    
	        var t=gomez,i= t.getCombineCookie('a'),g=t.getCookie('__g_u'),h=t.getCombineCookie('h'), b=t.getCombineCookie('b');
	        //get page sequence id,then increase 1
	        t.gc.h=b;
	        if(h)t.n1=parseInt(h);
	        if(!t.gc.h) t.gc.h=1;
	        t.setCombineCookie('b',parseInt(t.gc.h)+1);
	        if(i)
	        {        
	            t.inSample=parseInt(i);
	            if(t.inSample==1)
	            {
	                t.verboseneed=true;
	            }
	            else if(t.inSample==3)
	            {
	                t.superneed=true;
	                t.verboseneed=true;
	            };        
	            t.gomez_cansend=true;
	        }        
	        if(!t.gc.a) return;
	        if(b)
	        {	            
	            t.gc.c=t.getCombineCookie('c');          
	            t.gc.i=t.getCombineCookie('e');
	            t.gc.j=t.getCombineCookie('f');
	            t.iFS = false;     //set is first session = false
	        }
	        else 
	        {	            
	            var s='v=1';  //v=1 means need to allocate a new visitor id and session id
	            //check cookie,if can set cookie, get visitor id every times.
	            t.setCookie('__g_u','1',new Date(t.gt()+1000)); //for check whether we can set cookie
	            t.iFS = true;     //set is first session = true
	            if(t.getCookie('__g_u') && g && g!='1' && g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1)
	            {
	                s='v=0';
	                var r=g.split('_');
	                t.b2(parseInt(r[0]),parseInt(r[1])+1);//b2 is used to set visitor id and session id for end user;
	                if(r[4]&&r[4]!='0'&&t.gt() < parseInt(r[5])&&r[2]&&r[2]!='0')
	                {
	                    t.b1(parseFloat(r[2]),parseFloat(r[3]),parseFloat(r[4]),parseInt(r[5]));
	                    if(r[6])t.n0(parseInt(r[6]));
	                  };
	            };
	            t.h6=true;          
	        };
          t.gc.d=t.getCombineCookie('d');  //session key, if it is 0, set it to 1
          if(!t.gc.d || (t.gc.d && t.gc.d==0))
          {         	
          	t.setCombineCookie('d',1);
          	t.gc.d=1;
          } 	        
	        t.postedSummary=t.getCombineCookie('g');  //postedSummary is a flag for send basic_info,one session only send basic_info once
	        t.sendCommonInfo();//send pv info
	        //if(i && !t.isFirstVi && t.verboseneed && !t.request){t.requestGtag3();t.request=true;};
	    },
	    //requestGtag3:function()
	    //{
	    //    var t=gomez,u=t.tloc?t.tloc:('https:' == location.protocol ?'https:' : 'http:')+'//'+t.acctId+'.t.axf8.net/js/gtag7.1.2.js';
	    //    t.sendByScript(u);
	    //},
	    //n0 is used to set the flag which indicate whether collect host information or not;
	    //the value of h is 1 or 0;
	    //this function is a callback function, it will be triggered from server side.
	    //because this flag value is stored in cookie, so we should update the flag with latest value every time.
	    n0:function(h)
	    {
	        var t=gomez,f=new Date(t.gt()+946080000000),g=t.getCookie('__g_u');
	        t.n1=h;
	        t.setCombineCookie('h',h);
	        if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1)
	        {
	            var r=g.split('_');
	            g=''+r[0]+'_'+r[1]+'_'+r[2]+'_'+r[3]+'_'+r[4]+'_'+r[5]+'_'+h;
	            t.setCookie('__g_u',g,f);
	        };
	    },
	    //hook by server
	    //b1 is used to set verbose sample rate and super verbose rate;
	    //v indicates the verbose sample rate, its value is between 0 and 1; 
	    //because by far we do not use super verbose rate, so s is always 0;
	    //b1 is also a callback function like b2, both of them are triggered from server side;
	    //q and f are passed to function h4, we can get details in h4;    
	    b1 : function(v,s,q,f)
	    {
	        var t=this;
	        if (s == undefined) s = 1;
	        t.gomez_cansend=true;
	        t.setCombineCookie('e',v);
	        t.setCombineCookie('f',s);      
	        t.gc.i=v;
	        t.gc.j=s;
	        t.h4(v,s,q,f);
	    },
	    
	    //hook at server,  e.gif will call this method
	    //i value is 0, 1, 2, undefined. if 0 and 1, need to write sample rate to cookie, and change current inSample. if 2, update cookie, if undefined, do nothing
	    //v indicates the verbose sample rate, its value is between 0 and 1; 
	    //because by far we do not use super verbose rate, so s is always 0;
	    b3:function(i, v, s)
	    {
	        var t = this;
	
	        t.gomez_cansend=true;
	        if (s == undefined) s = 1;
	        if (i==0 || i==1)
	        {
	            t.inSample = i;
	            if(i==1)
	            {
	            	t.verboseneed = true;  //if not insample, don't send f.gif
	            	//if(!t.request) {t.requestGtag3();t.request=true;};
	            }
	            else
	            {
	            	t.verboseneed = false;
	            	t.gomez_cansend = false;
	            }
	            t.setCombineCookie('a',t.inSample);
	            if (v != undefined)
	            {
	                t.b1(v, s);
	            }
	        }
	        else if (i==2)
	        {
	            t.h4(v, s);
	        }
	    },
	    
	    //h4 is used to set the expire time of sample rate which is stored at cookie;
	    //o is verbose rate,p is super verbose rate, they are passed from function b1;
	    //q is the expire days while d stands for the real expire time period; 946080000000=30 years, 432000000 = 5 days
	    h4 : function(o,p,q,d)
	    {
	        var t=this,f=new Date(t.gt()+946080000000),g=t.getCookie('__g_u');
	        if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1)
	        {
	            var r=g.split('_'),s;
	            if(d)s=d;
	            else if(q&&q>=0)s=new Date(t.gt()+parseInt(q*86400000)).getTime();
	            else{q=5;s=new Date(t.gt()+432000000).getTime();};
	             g=''+r[0]+'_'+r[1]+'_'+o+'_'+p+'_'+q+'_'+s;
	             t.setCookie('__g_u',g,f);
	        };
	    },
	    domLoaded: function()
	    {
	        var t=gomez;
	        t.dom_time=t.grt();  //dom ready time
	    },
	    
      allObjectsLoaded: function()
      {  
          var t=gomez; 
          wa++;
          if(t.gc.i==undefined && wa < 4) //wait for g.gif return sample rate, not more than 1.5 seconds.
          {
          	setTimeout(t.allObjectsLoaded, 500);
          }
          else
          {
	          // We can stop polling now because all objects have been loaded
	          t.clearPollInterval();
	          if(!t.jbo)
	          {
	              // One last call to make sure all images,scripts,CSSes and frames are recorded
	              t.pollImages();
	          }
	          if (!t.stopped && t.gc.i!=undefined && t.gc.i!='') //if no sample rate, don't send b.gif
	          {
	              t.onload_time=t.grt();
	              t.stopped=true;
	              if(!t.postunload_done && !t.postload_done && t.postLoad) t.postLoad();
	          }
	          t.postload_done=true;
        	}
      },	    
	    
	    objectRecord: function(u, s)
	    {
	        var t=this;t.url=u;t.s=s;
	    },
	    pollImages: function()
	    {
	        var t=gomez,n=t.grt(),l=document.images.length;
	        if (l>t.lastImage)
	        {
	            for(var i=t.lastImage; i<l; ++i)
	            {
	                var u = document.images[i].href || document.images[i].src;	                
	                if(u)
	                {   
	                    var r = new gomez.EventListener(t.imageStore);
	                    t.grm[u]=r;
	                    t.imageStore[u]=new t.objectRecord(u, n);  
	                    t.addEvent(document.images[i],'load',t.imageLoaded,false);
	                    t.addEvent(document.images[i],'error',t.imageError,false);
	                    t.addEvent(document.images[i],'abort',t.imageAbort,false);  
	                }
	            }
	        }
	        t.lastImage=l;
	    },
	    imageLoaded: function(e)
	    {
	        var t=gomez,i=t.getObject(e);
	        if(i) i.e=t.grt();
	    },
	    imageError: function(e)
	    {
	        var t=gomez,i=t.getObject(e);
	        if(i) {i.e=t.grt();i.b=1;}
	    },
	    imageAbort: function(e)
	    {
	        var t=gomez,i=t.getObject(e);
	        if(i) i.a=t.grt();
	    },
	    getObject: function(e)
	    {
	        var t=gomez,e= window.event?window.event:e,a=t.searchElement(e),i;
	        if (t.grm[a.href || a.src] && t.grm[a.href || a.src].s) i = t.grm[a.href || a.src].s[a.href || a.src];	        
	        return i;
	    },
	    scriptStateChanged: function()
	    {
	        var t=gomez;
	        var e= window.event?window.event:e,s=t.searchElement(e);
	        if(s.readyState == 'loaded' || s.readyState == 'complete')
	        {
	            var o = t.scriptStore[s.href || s.src];	            
	            if(o) o.e=t.grt();
	        }
	    },
	    nameEvent: function(n)
	    {
	        var t=this;
	        t.addInterval(n,1);
	    },
	    startInterval: function(n)
	    {
	        var t=this;
	        t.addInterval(n,2,1);
	    },
	    endInterval: function(n)
	    { 
	        var t=this;
	        t.addInterval(n,2,2);
	    },	    
      addInterval: function(n,p,b)
      {    
      	  if(n&&n.length>250) n=n.substring(0,250); 
          var t=this,f=t.intervals;
          if(p==3)
          {
              f[f.length] = {'n':'a','a':n,'b':b,'e':p,'f':undefined};
           }
           else
          { 
             f[f.length] = {'n':'a','a':n,'b':t.grt(),'e':p,'f':b};
           }

          if(t.pUtil) t.sendEvent();
      },	    

	    customValue:function(n,v)
	    {
	      var t=this;
	      if(typeof(v)!='number')
	       {
	          return;
	       }
	      t.addInterval(n,3,v);
	     },
	    searchElement: function(e)
	    {
	        if(gomez.gIE) return e.srcElement || {}; else return e.currentTarget || e.target || {};
	    },
	    addEvent: function(e,p,f,c)
	    {
	        var n='on'+p;
	        if (e.addEventListener) e.addEventListener(p,f,c);
	        else if(e.attachEvent) e.attachEvent(n, f);
	        else
	        {
	            var x=e[n];
	            if (typeof e[n]!='function') e[n]=f;
	            else e[n]=function(a) {x(a);f(a);};
	        }
	    },
	    
        getObjectByProperty: function(a,h,p)
        {
            if(!a) return null;
            var l=a.length;
            for(var i=0;i<l;i++)
                if(a[i][p] == h) return a[i];
            return null;
        },
        calculateWindowSize: function()
        {
            var x,y;
            if (self.innerHeight)
            {
                x=self.innerWidth;
                y=self.innerHeight;
            }
            else if (document.documentElement&&document.documentElement.clientHeight)
            {
                x=document.documentElement.clientWidth;
                y=document.documentElement.clientHeight;
            }
            else if (document.body)
            {
                x=document.body.clientWidth;
                y=document.body.clientHeight;
            }
            this.w=x;this.h=y;
        },
        getPos: function(e)   
        {
            if (document.getBoxObjectFor)
            {
                var b=document.getBoxObjectFor(e);
                e.xLoc=b.x;e.yLoc=b.y;
            }
            else if (e.getBoundingClientRect)
            {
                var r=e.getBoundingClientRect();
                e.xLoc=r.left;e.yLoc=r.top;
            }
        },
        addSummaryData: function()
        {
            var t=this;
            t.calculateWindowSize();
            t.basic_info.m=t.w;   //basic_info is basic
            t.basic_info.o=t.h;
            if(navigator.javaEnabled())
                t.basic_info.j=1;
            else t.basic_info.j=0;
            t.basic_info.l=t.supportFlash();
            //Timezone of minutes
            t.basic_info.f=-1 * (new Date().getTimezoneOffset());
            if (navigator.language) t.basic_info.e=navigator.language.toLowerCase();
            else if (navigator.browserLanguage) t.basic_info.e=navigator.browserLanguage.toLowerCase();
            t.basic_info.r=t.inSample;
            t.basic_info.s=t.formatUrl(t.url,2);
            t.basic_info.t='7.1.2b';
        },
        addVerboseData: function()
        {
            var t=this;
            if(!t.jbo)  //jbo, a flag to return object level information, like wrate, can set it to 1 or 0
            {
                t.calculateWindowSize();
                t.interrogatePageElements();  //set page_info value
                t.page_info.h += t.page_info.f;
            }
            else
            {
                t.page_info.g=0;
                t.page_info.h=0;
                t.page_info.k=0;
                t.page_info.f=0;
                t.page_info.o=t.dom_time>=0?t.dom_time:0;
            }
            t.page_info.b=t.gs;            
            try{t.page_info.u=(window.opener&&window.opener.gomez&&window.opener.gomez.gc.b)?(window.opener.gomez.gc.b):'';}
            catch(e){t.page_info.u='';};
            try{t.page_info.v=(window.opener&&window.opener.gomez&&window.opener.gomez.gs)?(t.gs-window.opener.gomez.gs):'';}
            catch(e){t.page_info.v='';};
            t.page_info.w=document.referrer?t.formatUrl(document.referrer,2):'';
            if(t.dom_time>=0) t.page_info.c=t.dom_time;
            if(t.onload_time>=0) t.page_info.d=t.onload_time; //calculate the page's loadTime
            if(t.page_info.x&&t.page_info.x>0&&t.onload_time>=0) t.page_info.x += t.onload_time;
            else t.page_info.x=-1;
        },
        postLoad: function()
        {
            var t=gomez;
            t.getResponseTime();
            if (!t.postedSummary)
            {
                t.addSummaryData();
            }
            t.addVerboseData();
            if (t.gomez_cansend) t.gomez_sendData();
            else t.sendid=setInterval(gomez.gomez_sendData,100);
        },
        gomez_sendData : function()
        {
            var t=gomez;
            if (t.isFirstVi && t.inSample<1)
            {
                return;
            }
            if (t.gomez_cansend)
            {
                if(t.sendid) clearInterval(t.sendid);
                t.setCombineCookie('g', '1');
                if (t.postedSummary) t.basic_info=null;
                var s = '';
                var p=new gomez.Packager();
                if(!t.jbo)
                {
                    if(!t.superneed)
                    {
                        t.imgInfos = null;
                    };
                    //2007-4-13,Added by Way,merge all special types into one type
                    var m=new Array,h=t.hostSpecialObjects;
                    for(var k=0;k<h.length;k++)
                    {
                        var o=h[k];
                        var b=t.getObjectByProperty(m,o.a,'a');
                        if(!b)m[m.length]=o;
                        else
                        {
                            b.c+=o.c;b.d+=o.d;
                            if(b.k>o.k) b.k=o.k;
                            if(b.l<o.l) b.l=o.l;
                            b.j=b.l-b.k;
                        };
                    };
                    if(!t.n1)
                    {
                        t.hostImages = null;
                        m=null;
                    };
                    s=p.makePackage(t.basic_info,t.page_info,t.hostImages,t.imgInfos,m);
                }
                else
                {
                    s=p.makePackage(t.basic_info,t.page_info);
                }
                
                t.pUtil.sendString(s);
                t.postload_done=true;
                t.postedSummary=1;
            };
        },
        getIdFromImgSrc:function(s)
        {
            var t=this;
            for(var i=0;i<t.imgSrcMapId.length; ++i)
                if(t.imgSrcMapId[i] == s) return i+1;
            return -1;
        },
        n2:function(o)
        {
            if(!o)return true;
            if(o['complete']==false)
            {
                return true;
            }
            else if(o['naturalWidth']==0 && o['naturalHeight']==0)
            {
                return true;
            }
            else if(navigator.userAgent.indexOf('Opera')!=-1)
            {
                try
                {
                    var c = o.cloneNode(false);
                    if(!c)return false;
                    c.removeAttribute("width");
                    c.removeAttribute("height");
                    var d = {};
                    d['w']=c['width'];
                    d['h']=c['height'];
                    c=null;
                    if(d['w']==0 && d['h']==0)return true;
                }
                catch(e){};
            };
            return false;
        },
        interrogatePageElements: function()   
        {
            var t=this,l=document.images.length,y=0;
            t.page_info.g=0;
            t.page_info.h=0;
            t.page_info.k=0;
            t.page_info.f=0;
            t.page_info.o=0;
            for(var i=0;i<l;i++)
            {
                var x=document.images[i];
                var v=x.href || x.src;  
                var a=t.formatUrl(v,1);    //get host name from image's src                
                var b=t.getObjectByProperty(t.hostImages,a,'g');
                var c=t.getIdFromImgSrc(v); 
                var d=false;
                if(c == -1)
                {
                    t.imgSrcMapId[t.imgSrcMapId.length]=v; 
                    c=t.getIdFromImgSrc(v); 
                }
                else d=true;
                if(!b)
                {
                    b=new gomez.Base('i');  //n:i
                    b.a=0;b.c=0;b.d=0;b.e=0;b.f=0;b.g=a;b.h=0;
                    //host total size of all images,now only in IE
                    //b.i=0;
                    b.j=0;b.k=0;b.l=0;b.o=t.onload_time;
                    t.hostImages[t.hostImages.length]=b;
                }
                var fe=0;
                var ir=t.imageStore[v];
                b.a++;
                t.page_info.f++;
                if (ir&&(!ir.e||(ir.e-ir.s<20))&&ir.b!=1)
                {
                    var de = true;
                    if(!ir.e&&navigator.userAgent.indexOf('Chrome')!=-1)
                    {
                        de = false;
                    };
                    if(de&&t.n2(x))  //whether image is loaded success
                    {
                        b.d++;
                        t.page_info.h--;
                    }
                    else
                    {
                        b.c++;
                        t.page_info.k++;
                    }
                    if(ir.e && ir.s)
                    {
                    	b.h +=ir.e - ir.s;
                    }
                }
                else if(ir)
                {
                    if (ir.e)
                    {
                        fe=ir.e;
                        var fd=ir.e - ir.s;
                        if(b.l<fe || b.l==0) b.l=fe;
                        if(b.k>ir.s || b.k==0) b.k=ir.s;
                        if (d)
                        {
                            fe=0;
                            fd=0;
                        }
                        b.h += fd;
                    }
                    if (ir.b || t.n2(x))
                    {
                        b.d++;
                        t.page_info.h--;
                    }
                    else if (ir.a)
                    {
                        b.f++;
                        t.page_info.h--;
                        b.h += ir.a - ir.s;
                        if(b.l<ir.a || b.l==0) b.l=ir.a;
                        if(b.k>ir.s || b.k==0) b.k=ir.s;
                    }
                };
                b.j = b.l-b.k;
                t.getPos(x);
                if (x.xLoc <= t.w && x.yLoc <= t.h)
                {
                    if(x.width > 10&&x.height > 10) t.lastobj_above=v; // only pick meaningful one as last obj above the fold 
                    b.e++;
                    //just comment for version 1, do not remove this code.
                    t.page_info.i=i;
                    //t.page_info.j=x.src;
                    t.page_info.g++;
                    if(fe>y) y=fe;
                }
                //t.imgInfos[t.imgInfos.length]=f;
            }
            t.page_info.o=y?y:t.dom_time;    //perceived render time
        },
        supportFlash: function()
        {
            var p=navigator.plugins;
            if (p&&p.length)
            {
                for(var i=0;i<p.length;i++)
                    if (p[i].name.indexOf('Shockwave Flash')!=-1) return p[i].description.split('Shockwave Flash ')[1];
            }
            else if (window.ActiveXObject)
            {
                for(var i=10;i>=2;i--)
                {
                    try
                    {
                        var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"');");
                        if(fl) return i+'.0';
                    }
                    catch(e){};
                }
            };
            return 0;
        },
        postUnload: function(e)
        {
            var t=gomez,u=t.grt();   //u is onunload time
            if(t.n3)return;
            t.n3=true;
            //add by Jiny 2007-12-14 when unload, send event to server
            t.sendEvent(true);
            if(!t.verboseneed || t.gc.i==undefined || t.gc.i=='') return false;
            var p=new gomez.Packager();        
            if(!t.postload_done)//browse away, onload event doesn't happen and onunload event happen
            {
                var s=p.makeCommon();//indicate the abondment 
                if(!t.jbo)s+=p.hashArr(t.hostFlashes);
                if(!t.postedSummary)
                {
                    t.addSummaryData();
                    t.setCombineCookie('g', '1');
                    s+=p.hash(t.basic_info);
                    t.postedSummary=1;
                }
                //hard stop in IE6, click stop in IE
                if(t.stop_time != -1) //calcutlate the page's abort time
                {
                    s+='{n:u|c:'+t.stop_time+'|b:1|s:'+t.gs+'|u:'+u+'|e:2}'; //e =2, indicates that this is an abondonment message.  and we need send f.gif request.                          
                }
                else
                {
                    s+='{n:u|c:'+u+'|b:2|s:'+t.gs+'|u:'+u+'|e:2}';            
                }                  
                if(t.verboseneed&&t.pUtil.sendString) t.pUtil.sendString(s, 1);
                t.postunload_done=true;
            }
        		for(var i=0;i<1000000;i++){}//do while circle, leave time to send message
        },
        pageStop:function()
        {
            var t=gomez;
            t.clearPollInterval();
            if (!t.stopped)
            {
                t.stop_time=t.grt();   //onabort time
                t.onload_time=t.grt();
                t.stopped=true;
                //if(!t.postload_done && t.postLoad) t.postLoad();
            }
        },
        sawKeyDown: function(e)
        {
            var t=gomez;
            var e= window.event?window.event:e;
            var s=t.searchElement(e);
            //the following code is for links in firefox or opera
            if(!t.gIE && (s.gomez || s.target==undefined))
            {
                s=e.target;
            };
            if((e.keyCode==13 && s && s.href) || (e.keyCode==116))  //13=Enter 116=F5
            {
                t.setClickTime(s.href);
                t.postUnload();             
            }  
        },
        sawMouseDown: function(e)
        {
            var t=gomez;
            var e= window.event?window.event:e;
            if(e.button != 1 && e.button != 0) return;
            var s=t.searchElement(e);
            //the following code is for links in firefox or opera
            if(!t.gIE && (s.gomez || s.target==undefined))
            {
                s=e.target;
            }
            var g=s.tagName ? s.tagName : '';
            if (g.toUpperCase() == 'A') 
            {
                t.setClickTime(s.href);
                if(s.target == '_self' || s.target == '')
                	t.postUnload();
            };
            if (g.toUpperCase() == 'IMG') 
            {
            		if(s.parentNode)
            		{
                	t.setClickTime(s.parentNode.href);
	                if(s.parentNode.target == '_self' || s.parentNode.target == '')
	                	t.postUnload();
                }
            };             
        },
        getResponseTime: function()
        {
            var t=gomez;       
            if(!document.referrer)
            {
                t.setCombineCookie(t.rescn,'');
                return;
            };
            if (t.clickT)
            {
                t.page_info.x=t.gs - t.clickT;
            }
            if(t.page_info.x && t.page_info.x < 0) t.page_info.x = -1;
        },
        getCommonInfo:function()
        {
            var t=gomez;
            var o=new Object();
            o.a=t.acctId;
            o.b=t.pgId;
            o.c=t.grpId;
            o.d=t.gc.c?t.gc.c:''; //visitor id
            o.e=t.gc.d?t.gc.d:''; //session id
            o.f=t.gc.i?t.gc.i:''; //verbose rate
            o.g=t.gc.l?t.gc.l:''; //page url
            o.h=t.gs; //tag start time
            o.i=t.gc.h?t.gc.h:''; //page sequence
            return o;        
        },        
        sendEvent: function(bl)
        { 
            var t=this;
            //add by Jiny 2007-12-24,when configuration not get back or verboseneed is false, do not send event.
            if(!t.verboseneed || t.gc.i==undefined || t.gc.i=='') return;
            //add end.
            var f=t.intervals,l=f.length,a=new Array,b=new Array;            
            for(var i=0;i<l;i++)
            {
                if(f[i].e==1||f[i].e==3)
                {
                    if(t.eventSqno[f[i].a]) f[i].d = 1+t.eventSqno[f[i].a]++;
                    else
                    {
                        t.eventSqno[f[i].a] = 1;
                        f[i].d = 1;
                    }
                    f[i].f=0;
                }
                else if(f[i].f==1)
                {
                    if(t.eventSqno[f[i].a]&&!f[i].d) f[i].d = 1+t.eventSqno[f[i].a]++;
                    else if(!f[i].d)
                    {
                        t.eventSqno[f[i].a] = 1;
                        f[i].d = 1;
                    }
                    a[a.length] = f[i];
                }
                else
                {
                    for(k=0;k<a.length;k++)
                    {
                        if((a[k].a == f[i].a) && (a[k].f != 0))
                        {
                            a[k].f=f[i].f=0;
                            a[k].c=f[i].b;                        
                        }
                    }
                };                
            }
            i=0;
            while(i<f.length)
            {
                if(f[i].f == 0)
                {
                    if(f[i].e==1||f[i].e==3|| f[i].c!=undefined) b[b.length] = f[i];
                    f.splice(i,1);
                }
                else i++;
            }
            var n=0;
             n = b.length;
             for(var j=0;j<n;j++)
             {
                t.evn.push(b[j]);
             };
             n= t.evn.length;
             if(n==0) return;    
             var p=new gomez.Packager();
             if(bl)
             {
                t.pUtil.sendString(p.makeCommon()+p.hashArr(t.evn));
                t.evn.length=0;
             }
             else
             {
                if(t.num==''||t.num==undefined)
                {
                    t.num=1;
                }
                if(typeof(t.num)!="number")
                {
                    try
                    {
                        t.num=parseInt(t.num);
                    }
                    catch(e)
                    {
                        return;
                    }
                    
                }
                if(n>=t.num)
                {
                    t.pUtil.sendString(p.makeCommon()+p.hashArr(t.evn));
                    t.evn.length=0;
                }
             }
        },	    
	    
	    clearPollInterval: function()
	    {          
	        var t=this;
	        if(t.pollId1)clearInterval(t.pollId1);
	    },	    
	    
	    IEContentLoaded: function()
	    {
	        var d = window.document, done = false,
	        // only fire once
	        i2 = function () {
	            if (!done) {
	                done = true;
	                gomez.domLoaded();
	                gomez.getConfiguration();
	            }
	        };
	        // polling for no errors
	        (function () {
	            try {
	                // throws errors until after ondocumentready
	                d.documentElement.doScroll('left');
	            } catch (e) {
	                setTimeout(arguments.callee, 50);  //run function() again after 50 ms
	                return;
	            }
	            // no errors, fire
	            i2();
	        })();
	        // trying to always fire before onload
	        d.onreadystatechange = function() {
	            if (d.readyState == 'complete') {
	                d.onreadystatechange = null;
	                i2();
	            }
	        };
	    },
	            
	    //newAdd
	    sendPv: function(s, toUrl)
	    {
	        try
	        {
	            var t=this,z=gomez;
	            if (!s) return;
	            s+= "{n:u|e:1}";//in e.gif,  we need send the unload data information, e=1 indicate this data is unload data
	            var p = '';
	            if (t.isFirstVi)// this is the first visit
	            {
	                p='&a='+z.acctId+'&r=1&s=1';// if is first visit, we  need add the flag s to indicate that we need the sample rate.
	            }
	            else if (t.iFS) // indicate this is the first session;
	            {
	                p='&a='+z.acctId + '&r=' + t.sRInCookie();
	            }
	            if(window.encodeURIComponent) s=encodeURIComponent(s);
	            else s=escape(s);
	            z.sendByScript(z.checkUrl(toUrl) + 'info='+s+p);
	        }
	        catch(err)
	        {
	        }
	        return;
	    },
	    checkUrl: function(u) //apply '?' or '&' to be the end of url if that is need.
	    {
	        if (!/\?|&/.test(u))
	            if (!/\?/.test(u)) u += '?'; else u += '&';
	        return u;
	    },
	    sendCommonInfo:function()
	    {
	        var t=gomez, p=new gomez.Packager();
	        var s=p.makeCommon();
	        t.sendPv(s, t.pUtil.pvHttpUrl);
	    },
	
	    instrumentPage: function()
	    {
	        try
	        {
	            var t=gomez;
	            t.gc.a=t.acctId; 
	            /*@cc_on t.gIE=true;@*/ 
	            if(!t.gIE)
	            	t.gIE = !-[1,];
	            if(t.gIE)
	            {
	                t.IEContentLoaded();
	                window.attachEvent('onload', t.allObjectsLoaded);
                  window.attachEvent('onunload', t.postUnload);
                  document.attachEvent('onkeydown',t.sawKeyDown);
                  document.attachEvent('onmousedown',t.sawMouseDown);
                  document.attachEvent('onstop',t.pageStop);              
	            }
	            else if(window.addEventListener)// nonIE,DOM2
	            {
	                window.addEventListener('DOMContentLoaded', t.domLoaded, false);
	                window.addEventListener('load', t.allObjectsLoaded, false);
                  window.addEventListener('unload', t.postUnload, false);
                  window.addEventListener('click', t.sawMouseDown, true);
                  window.addEventListener('keydown', t.sawKeyDown, false);             
	            }
	            else if (t.gSfr)//Safari
	            {
	                var m=setInterval(function()
	                {
	                    if (/loaded|complete/.test(document.readyState))
	                    {
	                        clearInterval(m);
	                        delete m;
	                        t.domLoaded();
	                        t.allObjectsLoaded();
	                    }
	                }, 10);
	                window.addEventListener('click', t.sawMouseDown, false);
	            }
	            else return;
	            if(!t.jbo)
	            {
	                t.pollImages();
	                t.pollId1=setInterval(t.pollImages, 10);
	            }
	            if(!t.gIE)t.getConfiguration();
	
	        }
	        catch(e){return;}
	    }
	});
	
	gomez.Sender.prototype=
	{
	    sendByImage: function(u)
	    {
	        var i;
	        try
	        {
	            if(window.parent!=window&&navigator.userAgent.indexOf('Firefox')!=-1)
	            {
	                i=window.parent.document.createElement('img');
	            }
	            else
	            {
	                i=new Image(1,1);
	            }
	        }
	        catch(f)
	        {
	            i=new Image(1,1);
	        };
	        i.src=u;
	        i.onload = function(e){return;};
	    },
	    //this method can be used to post a formatted data string.
	    sendString: function(s, url)
	    {
	        var t=this,n='',z=gomez;
	        if (!s) return;
	        if (url==undefined)
	        {
	            url = t.recHttpUrl;
	        }
	        else
	        {
	        		url = t.abHttpUrl;
	        }        
	        if(window.encodeURIComponent) n=encodeURIComponent(s);
	        else n=escape(s);
	        
	        s=n;
	        var k = s.indexOf("%7D");
	        var q = s.substring(0,k+3);
	        s = s.substring(k+3);
	        while(s.length > 0 && k > 0)
	        {
	            n = s.substring(0,1650);
	            var c = n.substring(n.length-3,n.length);
	            if(c != "%7D")
	            {
	                k = n.lastIndexOf("%7D");
	                n = n.substring(0,k+3);
	                s = s.substring(k+3);
	                if(n.indexOf('%7Bn%3Ab')!=-1 && !z.h6)
	                { 
	                    z.sendByScript(t.checkUrl(url) + 'info='+q+n);
	                }
	                else t.sendByImage(t.checkUrl(url) + 'info='+q+n);
	          }
	            else
	            {
	                s = s.substring(n.length);
	                if(n.indexOf('%7Bn%3Ab')!=-1 && !z.h6)
	                {
	                    z.sendByScript(t.checkUrl(url) + 'info='+q+n);
	                }
	                else t.sendByImage(t.checkUrl(url) + 'info='+q+n);    
	            };
	            k = s.indexOf("%7D");
	        }
	        return;
	    },
	    checkUrl: function(u) //apply '?' or '&' to be the end of url if that is need.
	    {
	        if (!/\?|&/.test(u))
	            if (!/\?/.test(u)) u += '?'; else u += '&';
	        return u;
	    }
	};
	gomez.Packager.prototype.makePackage=function()
	{
	    var t=this,a=arguments,s=t.makeCommon();
	    for(var i=0;i<a.length;i++)
	    {
	        if(a[i] instanceof Array) s+=t.hashArr(a[i]); else s+=t.hash(a[i]);
	    }
	    return s;
	};
	   
	gomez.Packager.prototype.hashArr=function(a)
	{
	    if(!a) return '';
	    var l=a.length,s='',t=this;
	    for(var j=0;j<l;j++) s+=t.hash(a[j]);
	    return s;
	};	
	
	//init user func to collect data
	gomez.init();
	gomez.instrumentPage();
	}
}
catch(e){};