try{
  if (!top.__nbcudigitaladops){
	var __nbcudigitaladops = {
		init : function(){
			this.version = '2.5';
			this.c_name = 'adops_master_kvs';
			this.c_expire_hour = 1440;

			this.sc('');

			var site = ''+location.hostname;
			site = site.replace(/^www\./,'').replace(/\./g,'_');
			document.write('<scr'+'ipt src="//www.nbcudigitaladops.com/hosted/jscript/'+site+'.js"></scr'+'ipt>');
		},
		dtprm : function(p){
			if(p==''||p==undefined){
				return false;
			}
			p = p.replace(/;+$/,'') + ';';
			var cd = this.gc( this.c_name );
			cd += p;
			this.sc(cd);
		},
		gc : function(n){
			var c=document.cookie;if(!c)return '';
			var i=c.indexOf(n+"=");if(-1==i)return '';
			var len=i+n.length+1;
			var end=c.indexOf(";", len);
			return unescape(c.substring(len,end<0?c.length:end));
		},
		sc: function(cd,cn,ch){
			if(cn==undefined){
				cn=this.c_name;
			}
			if(ch==undefined){
				ch=this.c_expire_hour;
			}
			var d = new Date;
			d.setHours(d.getHours()+ch);
			var c = cn+'='+escape(cd)+'; expires='+d.toGMTString()+'; path=/;';
			document.cookie = c;
		}

	};

	top.__nbcudigitaladops_header = top.__nbcudigitaladops;

	__nbcudigitaladops.init();
  }
}catch(e){};
