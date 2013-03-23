function toggle(obj_name)
{
	name = obj_name.substr( 0, obj_name.lastIndexOf('_') );
	siz = obj_name.substr( obj_name.lastIndexOf('_') + 1 );

	obj = document.getElementById(obj_name);

	if (siz == 'big') siz2 = 'small'; else siz2 = 'big';
	obj2 = document.getElementById(name+'_'+siz2);
	obj.style.display = 'none';
	obj2.style.display = 'block';
}
/*
$(document).ready(function(){
	if (!$('#fmid'))
		return ;
	var ec=new xc();
	ec.get('dfmid',function (value,all) {
		if (value == '' || value == 'undefined' || typeof(value) == 'undefined')
		{
			ec.set('dfmid',$('#fmid').val());
		}
	});
});
*/
function cache_img(src)
{
	var img = new Image();
	img.src = src;
}

function is_copy_to_clipboard_enabled()
{
	if(window.clipboardData)
	{
		return true;
	}
	return swfobject.hasFlashPlayerVersion('3');
}
function enable_copy_to_cliboard_links()
{
	if(is_copy_to_clipboard_enabled())
	{
		var coll = document.getElementsByTagName('a');
		for(i=0;i<coll.length;i++)
		{
			if(coll[i].className.indexOf('copy_to_clipboard') >= 0)
			{
				coll[i].style.display = 'inline';
			}
		}
	}
}
function copy_to_clipboard(text)
{
	if (window.clipboardData)
	{
		window.clipboardData.setData("Text",text);
	}
	else
	{
		if(!document.getElementById('copy_to_clipboard_flash'))
		{
			var divholder = document.createElement('div');
			divholder.id = 'copy_to_clipboard_flash';
			document.body.appendChild(divholder);
		}
		swfobject.embedSWF(http_static_path+'/flash/clipboard.swf', 'copy_to_clipboard_flash', '0', '0', '3', null, {clipboard:escape(text)});
	}
}

function get_elements_by_class(class_name, parent, tag)
{
	var res = new Array();
	var coll = parent.getElementsByTagName(tag);
	var reg = new RegExp('(^|\s)'+class_name+'($|\s)');
	for(i=0;i<coll.length;i++)
	{
		if(coll[i].className.match(reg))
		{
			res.push(coll[i]);
		}
	}
	return res;
}
function zero_pad(num)
{
	num = num.toString();
	var pos = num.lastIndexOf('.');
	if(pos == -1)
	{
		pos = num.length;
		num += '.';
	}
	var need = 2-num.length+pos;
	for(var i=0;i<=need;i++)
	{
		num+='0';
	}
	return num;
}

function send_payoff(place)
{
	if(place == 'signup' && !$('.useragreement INPUT[name=agree]').is(':checked'))
		return false;
	var info = $('input[name=payoff_info]').val();
	if (place && place == 'signup' && info == '')
		return true;
	var type = $('input[name=payoff_type]:checked').val();
	if (info.match(/z[\d]{10,}/i)) {
		if (type != 'webmoney') 
			$('#pt_webmoney').attr('checked', true);
	}		
	else if (info.match(/.+@.+\.[\w]+/)) {
		if (!type || type!='payza')
			$('#pt_payza').attr('checked', true);
	}
	else if(info.match(/\d{3}-\d{6}/)) {
		if (!type || type!='epayments')
			$('#pt_epayments').attr('checked', true);
	}
	else {
		$('input[name=payoff_info]').focus();
		$('#error').show();
		return false;
	}
	return true;
}

/* DFUtils */
var DFUtils = DFUtils || {};

DFUtils.read_get_param = function(params_str, name) {
	var result = '',
		name_eq = name + '=',
		params_arr = decodeURIComponent(params_str).split('&'),
		i, c;
	
	for (i = 0; i < params_arr.length; i++) {
		c = params_arr[i];
		if (c.indexOf(name_eq) != -1) {
			result = c.substring(c.indexOf(name_eq) + name_eq.length, c.length);
		}
	}            
	return result;
};

DFUtils.makeSize = function(sz) {
	var sizes = ['B', 'KB', 'MB', 'GB', 'TB'],
		cursize = 0;
	
	if (typeof sz == 'undefined') {
		return window[lang] && window[lang]['unknown'] ? window[lang]['unknown'] : 'Unknown';
	}
	if (sz < 0) {
		return '0 ' + sizes[cursize];
	}
	while (sz > 1024) {
		cursize++;
		sz = Math.round((sz/1024)*100)/100;
	}
	return sz + ' ' + sizes[cursize];
};

DFUtils.getCountItems = function(obj) {
	var count = 0, i;
	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
};

DFUtils.get_message = function(code) {
	var msg = code;
	code = code ? code.replace(/[^a-zA-Z0-9_]/g, '') : 'UNKNOWN_ERROR';
	msg = window[lang] && window[lang][code] ? window[lang][code] : msg;
	if (code == 'incorrect_file_name') {
		msg += ' *|\:"<>?/';
	}
	return msg;
};

DFUtils.zebra = function($wrapper) {
	if ($wrapper.is('tbody')) {
		$wrapper.parent().find('tbody tr').removeClass('odd even').filter(':visible:odd').addClass('odd').end().filter(':visible:even').addClass('even');
	} else {
		$wrapper.children().removeClass('odd even').filter(':odd').addClass('odd').end().filter(':even').addClass('even');
	}
};
	
DFUtils.getFileType = function(name) {
	name = name.split('.').pop().toLowerCase();
	var ret = 'data',
		fileTypes = {
		'audio':['4mp','669','6cm','8cm','8med','8svx','a2m','aa','aa3','aac','aax','abc','abm','ac3','acd','act','adg','ahx','aif','aifc','aiff','ais','akp','al','alaw','all','amf','amr','ams','ams','aob','ape','ase','atrac','au','aud','aup','avr','band','bap','bdd','box','bwf','c01','caf','cda','cdr','cel','cidb','cmf','copy','cpr','csh','cwp','d00','d01','dcf','dcm','dct','dewf','df2','dfc','dig','dig','dls','dm','dmf','dsf','dsm','dsp','dss','dtm','dts','dvf','DWD','ear','efa','efe','efk','efq','efs','efv','emd','esps','f2r','f32','f3r','f64','far','fff','flac','flp','fls','fsm','fzb','fzf','fzv','g721','g723','g726','gig','gp5','gpk','gsm','gsm','ics','iff','ins','ins','it','iti','its','jam','k25','k26','kar','kin','kmp','koz','koz','krz','ksc','ksf','ktp','l','la','lso','lvp','lwv','m1a','m3u','m4a','m4b','m4p','m4r','ma1','mdl','med','mgv','mid','midi','miniusf','mka','mmf','mo3','mod','mp1','mp2','mp3','mpa','mpc','mpd','mpga','mpu','mp_','msv','mt2','mte','mti','mtm','mtp','mts','mus','mws','mzp','nap','nki','nrt','nsa','nsf','nst','ntn','nwc','odm','oga','ogg','okt','oma','omf','omg','omx','ots','ove','pac','pat','pbf','pca','pcg','pcm','peak','phy','pk','pla','pls','pna','prg','prg','psm','ptf','ptm','pts','pvc','qcp','r','r1m','ra','ram','raw','rbs','rex','rfl','rmf','rmi','rmj','rmm','rmx','rng','rol','rsn','rso','rti','rtm','rts','s3i','s3m','saf','sam','sb','sbi','sbk','sc2','sd','sd','sd2','sds','sdx','ses','sf','sf2','sfk','sfl','shn','sib','sid','sid','smf','smp','snd','snd','snd','sng','sou','sppack','sprg','sseq','ssnd','stm','stx','sty','svx','sw','swa','syh','syw','syx','td0','tfmx','thx','toc','tsp','txw','u','ub','ulaw','ult','ulw','uni','usf','usflib','uw','uwf','vag','val','vc3','vmd','vmf','vmf','voc','voi','vox','vpl','vqf','vrf','vyf','w01','wav','wave','wax','wfb','wfd','wfp','wma','wow','wpk','wproj','wrk','wus','wut','wv','wvc','wwu','xfs','xi','xm','xmf','xmi','xp','xrns','xsb','xspf','xt','xwb','zvd'],
		'backup':['$$$','$db','001','001','113','abbu','abk','acr','bac','backupdb','bak','bak','bck','bckp','bcm','bdb','bkc','bkf','bkp','bks','bpa','bpb','bpm','bps','bup','bup','cbk','da0','dbk','dov','fbc','fbf','fbk','fbk','fbu','ful','gb1','gho','ghs','ipd','iv2i','jbk','llx','mem','nb7','nbf','nbf','nbk','nbu','nco','nrs','oeb','old','ori','oyx','paq','qbb','qbx','qic','qsf','rbc','rbf','rbf','rbk','rbs','rdb','rrr','sdc','skb','sn1','sn2','sna','spg','sqb','tbk','tmp','uci','v2i','win','win','xlk'],
		'compressed':['000','7z','a00','a01','a02','ace','ain','alz','apz','ar','arc','ari','arj','ark','axx','b64','ba','bh','boo','bz','bz2','bzip','bzip2','c00','c01','c02','car','cbr','cbz','cp9','cpgz','cpt','dar','dd','deb','dgc','dist','ecs','efw','f','fdp','gca','gz','gzi','gzip','ha','hbc','hbc2','hbe','hki','hki1','hki2','hki3','hpk','hyp','ice','ipg','ipk','ish','j','jgz','jic','kgb','lbr','lemon','lha','lnx','lqr','lzh','lzm','lzma','lzo','lzx','md','mint','mpkg','mzp','p7m','package','pae','pak','paq6','paq7','paq8','par','par2','pbi','pcv','pea','pf','pim','pit','piz','pkg','pup','pup','puz','pwa','qda','r00','r01','r02','r03','rar','rev','rk','rnc','rp9','rpm','rte','rz','rzs','s00','s01','s02','s7z','sar','sdc','sdn','sea','sen','sfs','sfx','sh','shar','shk','shr','sit','sitx','spt','sqx','sqz','tar','taz','tbz','tbz2','tg','tgz','tlz','tz','uc2','uha','vsi','wad','war','wot','xef','xez','xmcdz','xpi','xx','y','yz','z','z01','z02','z03','z04','zap','zfsendtotarget','zip','zipx','zix','zoo','zz'],
		'data':['$er','123','1pe','1ph','3dt','4dl','4dv','a3l','a3m','a3w','a4l','a4m','a4w','a5l','a5w','a65','ab','ab1','ab3','abcd','abi','abp','acc','accdb','ade','adp','adt','adx','aft','aifb','alc','ald','ali','amb','an1','anme','apr','ask','asm','ast','awg','azw','bafl','bci','bcm','bdf','bdic','bgl','bgt','bin','bk','bkk','blb','bok','box','brd','btf','btif','btm','cap','cat','cbg','cch','ccr','cct','cdf','cdf','cdr','cdx','celtx','chg','chk','chn','ckd','ckt','clix','clp','cna','crd','csa','csv','ctf','ctt','cvn','cwk','cws','cwz','cxt','cyo','cys','daf','dal','dam','das','dat','db','db2','dbc','dbd','dbf','dbf','dbx','dcf','dcl','dcm','dcmd','ddc','ddcx','dem','des','dex','dex','dfm','dfproj','dft','dgb','dif','dii','dlg','dll','dm2','dmo','dmo','dockzip','dp1','dpn','drl','dsb','dsk','dsy','dsz','dtr','dvdproj','dwi','e00','eap','ebuild','eco','ecx','edb','edf','eep','emb','emb','emd','emlxpart','enc','epp','epp','epub','epw','er1','esp','ess','est','ev','evy','exp','exp','exx','fa','fasta','fcd','fcs','fdb','fdb','fdb','ffd','ffwp','fhc','fid','fil','flame','fll','flo','flo','flp','flt','fm','fm5','fmp','fo','fob','fop','fox','fp','fp3','fp4','fp5','fp7','frl','frm','frm','fro','frx','fsb','fsc','ftm','ftw','gan','gbr','gc','gcx','gdb','ged','gedcom','gen','ggb','gml','gms','gnp','gp3','gpx','gra','grade','grf','grf','grib','grk','grr','gs','gst','gtp','gwk','gxl','hda','hdf','hdi','hdl','hif','hl','hml','hs2','hst','i5z','ib','ics','idx','idx','igc','ihx','iif','ink','inp','ins','ip','irock','irr','irx','isf','itdb','itl','itm','itn','itw','itx','ivt','jef','jph','jude','kdb','kid','kmz','kpf','kpp','kpr','kpx','kpz','l','l6t','lbx','lcd','lcf','lcm','ldif','lgc','lgf','lgh','lgi','lib','lif','lix','lix','llb','lms','lnt','lp7','lsf','lsl','lsp','lsr','lst','lsu','lw4','m','mag','mai','map','mat','mbg','mbg','mbl','mbp','mbx','mc1','mc9','mcd','md','mdb','mdc','mdf','mdf','mdl','mdl','mdn','mdt','mdx','mdx','mdz','mem','mex','mfo','mfp','mgc','mls','mm','mmap','mmc','mmf','mmp','mmp','mnc','mng','mnk','mno','mny','mobi','moho','mosaic','mox','mpp','mpt','mpx','mq4','mth','mud','mw','mws','mxd','myd','myi','nb','ndf','ndk','ndx','net','neta','nitf','nmind','notebook','np','npl','npt','ns2','ns3','ns4','nsf','nsf','ntx','numbers','nvl','nyf','oab','obj','odb','odf','odp','ods','odx','ofc','ofm','oft','ofx','omcs','omp','ond','one','oo3','opf','opx','opx','or2','or3','or4','or5','or6','org','orx','otf','otl','otln','ots','ov2','ova','ova','ovf','p96','p97','pab','pan','pbd','pc','pcap','pcb','pdas','pdb','pdb','pdb','pdb','pdd','pdm','pds','peb','pex','pfc','pfl','phm','pi','pis','pjx','pka','pkb','pkh','pks','pkt','pln','plw','pmd','pmr','pnproj','pnpt','pod','postal','pot','potx','pp2','ppf','pps','ppsx','ppt','pptm','pptx','prc','prf','prj','prj','prm','prs','psa','psf','psf','psm','pst','ptb','ptf','ptk','ptm','ptt','pub','pvl','pwd','pxj','qbw','qdf','qdf','qdfm','qel','qfx','qif','qpb','qph','qpm','qpw','ral','rbt','rcd','rcg','rdb','rdf','rdx','ret','rf1','rfa','rge','rgn','rgo','rnq','rod','rog','roi','roi','rou','rpt','rrt','rsd','rsw','rte','rte','rvt','rzb','s85','saf','sar','sav','sbf','sca','scf','sch','sdb','sdb','sdb','sdc','sdf','sdf','sdp','sdq','sds','sds','seo','seq','ser','sgml','shp','shx','skc','skv','skv','skx','sle','slp','soundpack','spo','sps','spub','spv','sq','sqd','sql','sqr','sta','stc','stk','stl','stm','str','stt','stw','styk','stykz','svc','swk','sxc','sxi','t01','t02','t03','t04','t05','t06','t07','t2','t3001','tax2008','tb','tbk','tcx','tda','tda','tdl','te','te3','tef','tet','tfa','tfd','tfrd','thmx','tjp','tk3','tkfl','tmw','tol','topc','tpb','tps','tr3','tra','trd','trs','trs','tst','tsv','ttk','txa','txd','txf','udb','ulf','ulz','upoi','uvf','val','val','vcd','vce','vcf','vcs','vdx','vi','vmt','voi','vok','vrd','vscontent','vsx','vtx','vxml','wab','wdb','wea','wfm','wgp','wgt','wgt','wjr','wk1','wk2','wk3','wk4','wk5','wki','wks','wks','wku','wmdb','wor','wpf','wtb','wtr','xdb','xdp','xef','xem','xfo','xft','xl','xlc','xlgc','xlr','xls','xlsb','xlsm','xlsx','xlt','xltm','xltx','xlw','xmcd','xml','xmlper','xpg','xpj','xpm','xpt','xrp','xsl','xslt','xsn','xtp','xxd','yam','zap','zdb','zdb','zdc','zix','zpl','^^^','~hm'],
		'developer':['$01','4db','4dd','a','a2w','ab','abc','acd','ada','adb','ads','aep','agi','am4','am5','am6','am7','apa','as','asm','au3','b','bas','bb','bbc','bcp','bet','bpg','bpl','bs2','c','c','cap','cbl','cc','ccn','cd','class','cls','cob','cod','config','cp','cp','cpp','cs','csi','csi','cst','ctl','ctx','d','dcp','dcu','dec','def','def','dev','dex','df1','dfm','dob','dox','dpk','dpl','dpr','dsk','dsp','dsym','dtd','dylib','ent','eql','ex','f','f90','fbp','fgl','fic','fla','for','fpa','fpd','fpm','fpp','fpp','framework','frm','frx','fsproj','ged','glade','global','gls','gm6','gmd','gmk','gmo','gorm','gs3','h','has','hh','hhh','hpf','hpp','hs','i','idb','iml','inc','isc','iss','iws','j','jav','java','jed','jic','jpd','jpr','jpx','json','kb','kdevdlg','kdevelop','kdevprj','lbi','lbs','lds','lgo','lhs','licenses','licx','lis','lit','lnt','lproj','lsp','lua','m','m4','magik','mak','md','med','mer','mf','mfa','mk','mo','mod','mom','mpr','mvx','mxml','myapp','nib','nxc','o','oca','ocx','omo','owl','p','p','pas','pb','pbproj','pch','pdm','pl','pl','pl1','plc','ple','pli','pm','po','pod','pot','prg','ptl','py','pyd','pyw','qpr','qx','r','r','rb','rb','rbc','rbp','rc','res','res','rnc','rsrc','ru','rul','s','s19','sas','sc','sh','sln','sma','snippet','so','spt','src','ssc','sud','suo','sup','swc','swd','t','targets','tcl','tds','tk','tpu','tpx','tu','tur','ui','vac','var','vbg','vbp','vbproj','vbx','vbz','vc','vc4','vcproj','vcx','vdm','vdproj','vgc','vhd','vic','vpc','vspscc','vssscc','wdl','wsc','x','xaml','xap','xcode','xcodeproj','xib','xsd','xt','yab','ymp'],
		'disk':['aa','adf','adz','atr','b5i','b5t','bdf','bif','bin','bwa','bwi','bws','bwt','c2d','ccd','cd','cdi','cif','cl5','cso','cue','cue','d64','d88','daa','dao','dax','dcf','disk','dmg','dms','dsk','dvd','eda','ede','edk','edq','eds','edv','eui','fcd','fdi','flp','gbi','gcd','gi','gi','gkh','hdd','i00','i01','i02','ibp','ibq','ima','image','img','img','ipf','iso','isz','ixa','lcd','lnx','mbi','md0','md1','md1','md2','mdf','mds','mds','ncd','nn','nrg','nri','p01','p01','partimg','pdi','pqi','pvm','pxi','ratdvd','rcl','rdf','simg','smi','sopt','sparsebundle','sparseimage','sqfs','st','t64','tao','tc','td0','tib','toast','tzx','uibak','uif','vaporcd','vc4','vcd','vcd','vdi','vdi','vhd','vmdk','vmwarevm','x64','xa','xmd','xmf'],
		'encoded':['afp','bfa','bhx','bin','ccf','clx','cpio','cpt','dc4','dcd','dcf','dco','dim','dime','dlc','efl','efr','efu','enc','fsm','fss','hex','hqx','mfs','mim','mime','mme','mse','pdc','rsdf','rzk','rzx','sef','shy','spd','spdf','suf','switch','uu','uud','uue','vlt','xxe'],
		'executable':['a6p','ac','acr','action','ahk','air','apk','app','app','app','applescript','awk','bat','bin','cgi','cmd','com','csh','cyw','dek','dld','dmc','ds','ebm','ecf','elf','elf','es','esh','exe','exe','ezs','fas','fky','frs','fxp','gadget','gpe','gpu','hms','hpf','hta','icd','iim','inx','ipa','ipf','isu','jar','js','jse','jsx','kix','ksh','m3g','mcr','mel','mem','mpx','mrc','ms','mst','mxe','obs','osx','paf','pex','pif','plsc','prc','prg','prg','pvd','pwc','pyc','pyo','qpx','rbx','rgs','rox','rpj','rxe','sca','scar','scb','scpt','scr','script','sct','seed','shb','shs','spr','thm','tms','u3p','udf','vb','vbe','vbs','vbscript','vdo','vlx','wcm','widget','workflow','wpk','ws','wsf','xap','xqt'],
		'font':['abf','acfm','afm','amfm','bdf','cha','chr','dfont','eot','ffil','fnt','fon','gdr','lwfn','otf','pfa','pfb','pfm','pfr','suit','ttc','ttf','xfn','xft'],
		'image':['001','2bp','2d','3d','3d2','3d4','3da','3df','3dl','3dm','3dmf','3ds','3dv','3dx','8pbs','abm','ac5','ac6','acr','act','adc','adi','afp','agif','agp','ai','aic','ais','amu','an8','anm','apng','ard','arr','art','art','asat','awd','awd','bcf','bcp','bip','biz','blend','blkrt','blz','bmc','bmc','bmf','bmf','bmp','br3','br4','br5','bro','bro','btw','bvh','c4','c4d','cag','cal','cal','cals','cam','can','catpart','cd2','cd5','cdr','cdt','ce','cel','cgm','cil','cin','cit','cld','cm2','cmp','cmp','cmx','cmz','cnv','comicdoc','cpc','cpd','cph','cps','cpt','cr2','cr2','crw','crz','csd','csf','csm','cut','cv5','cvg','cvi','cvi','cvs','cvx','dae','dc','dcd','dcm','dcr','dcs','dcx','ddb','ddrw','dds','des','des','design','dff','dfx','dgn','dib','djvu','dng','dpd','dpp','dpr','dpx','drw','drw','drwdot','dtp','dtw','dvl','dwf','dwfx','dwg','dxb','dxf','emf','emz','enc','eps','exif','fac','face','fal','fax','fbm','fbx','fc2','fcd','fcw','fcz','fd2','fh9','fhd','fig','fil','fits','flx','fm','fp3','fpf','fpx','fs','fxg','g','gcd','gds','gem','gem','geo','gfb','gif','gks','gmf','gpd','graffle','grn','gro','grob','gry','gsd','gsm','gxc','gxd','hcx','hd2','hdp','hdr','hdz','hf','hip','hipnc','hmk','hpgl','hpi','hpl','hr','hr2','hrf','hrz','htz4','iam','ic1','ic2','ic3','ica','icb','icn','icon','ics','idw','iff','iges','igs','ilbm','ildoc','imj','ind','indd','indt','info','ink','ink','int','inx','ipt','ithmb','ivr','j','j2c','j2k','jas','jbf','jbig','jbr','jfi','jfif','jia','jif','jiff','jng','jp2','jpc','jpd','jpe','jpeg','jpf','jpg','jpw','jpx','jt','jtf','kdc','kdk','kfx','kic','kmc','kmcobj','kodak','kpg','lab','lbm','lin','lt2','ltz','lwo','lws','lxf','m3d','ma','mac','mag','max','max','max','mb','mbm','mc5','mc6','mcs','mcx','mcz','mdi','meb','mesh','mfo','mfp','mft','mgf','mgs','mic','mip','mix','mix','mma','mng','mnm','model','mp','mrb','mrw','msk','msp','mtx','mtz','nav','ncd','nef','neo','nff','nif','ntc','ntf','obj','odc','odg','odi','odif','off','ola','omf','opd','opf','orf','ota','otb','otc','otg','oti','ovw','p21','p2z','p3d','p65','pac','pal','pap','pat','pat','pbm','pc1','pc2','pc3','pc6','pc7','pcd','pct','pcx','pd','pdd','pdf','pdg','pdn','pe4','pe4','pef','pfl','pfr','pgm','pi1','pi2','pi2','pi3','pi4','pi5','pi6','pic','pic','pic','picnc','pict','pictclipping','pix','pl','pl0','pl1','pl2','pla','pln','plt','plt','ply','pm','pm3','pm4','pm5','pm6','png','pnt','pov','pov','pp2','ppm','ppp','ppx','ppz','prn','prt','prt','prw','ps','psb','psd','psf','psg','psid','psm','psp','pspimage','ptx','ptx','pwp','pws','px','pxr','pz2','pz3','pzz','qdf','qif','qti','qtif','qxd','qxp','qxt','raf','ras','raw','ray','rdl','rds','rft','rgb','rgb','ric','rif','rix','rle','rsr','sar','sat','sbk','scg','sci','scp','sct','scu','scv','sda','sdb','sdm','sdr','sdt','sff','sfw','sgi','sh3d','sh3f','shg','shp','si','sid','sig','sim','sk2','skl','skp','sldasm','slddrt','slddrw','sldprt','smp','snp','sp','spc','spe','spiff','spp','spt','spu','sr','srf','std','step','stl','sto','stp','sun','suniff','sup','svg','svgz','sxd','taac','tcd','tct','tcw','tcx','tddd','tex','tfw','tg4','tga','thm','thm','thumb','tif','tiff','tjp','tlc','tn1','tn2','tn3','tny','trif','u','u3d','ufo','urt','v','v3d','vda','vff','vic','viff','vna','vnd','vrl','vsd','vss','vst','vst','vtx','vue','vvd','vwx','wbmp','wdp','web','wgs','wi','wic','wmf','wmp','wnk','wpg','wrl','wrp','wrz','x3d','xar','xbm','xcf','xdw','xif','xof','xpm','xsi','xwd','xws','y','yal','yaodl','ydl','yuv','zgm','zif','zno','zt'],
		'misc':['!ut','83p','8xp','aawdef','abr','ac$','acb','acl','acs','ad','add','adi','adm','afploc','ahd','ahi','aif','aim','alt','aod','aoi','aol','arr','atz','avl','awc','awd','bc','bc!','bdr','bfc','bnd','bootskin','bp2','bp3','bpl','bst','buf','ca','cache','calb','cam','cbt','ceb','cfl','chk','chw','clkk','clkt','clkw','clkx','clr','cmm','cnc','cp3','cpt','ctf','ctf','ctg','dal','dap','dat','db','dbv','dbx','dc1','dct','dctmp','dcx','dek','desktop','dgc','dic','diskdefines','dlm','dpb','dqy','dr','drc','dsc','dskin','dst','dstudio','dt_','dus','dwc','dwn','ebn','efl','eml','eqn','exd','ext','eyb','fdr','file','flf','flp','fls','fnc','fpfv','fpk','frk','frm','frz','ftil','ftploc','fw','gau','gbx','gg','gly','gp4','gp4','gpg','growlregdict','h1q','hex','hgl','his','hlb','hlx','hm3','hmx','hs','hus','id','idlk','iix','iml','imy','in','ind','inetloc','ing','inm','ipsw','isn','itc','iva','iws','jad','jc','jc!','jrs','key','khd','khi','kth','kyr','lck','ldb','lid','link','linx','logonvista','logonxp','ltf','lwtp','lxa','lyr','mab','mad','maf','mam','maq','mar','mas','mat','mau','mav','maw','mci','mco','md5','mde','mdf','mdl','mdw','mhs','mif','mls','mmo','mmp','mnx','mod','mpcpl','mps','mrk','ms-tnef','msf','msi','mso','mso','mss','msu','mtf','mtf','mvi','mvs','mwf','nav2','nch','nick','njb','nk2','nss','nth','nwm','nwp','ob!','odf','ods','olb','ost','otf','otp','owg','owm','p2p','pando','pap','part','pes','pgp','pid','pla','playset','plsk','pnf','pnz','potm','ppf','ppsm','prb','prc','prs','prt','psar','psf','psi','pss','psw','pth','ptr','pvm','pwrep','qxl','rem','rjs','rmr','rnd','rnd','rom','rov','rtm','rtp','sbk','scd','scw','scx','sdd','sec','sew','sfcache','sfv','shortcut','shw','shx','sis','sisx','skindex','skr','smm','snm','sqm','sr0','ssd','sslf','ssw','std','sth','sti','stmb','svn-work','sxm','t$m','tag','tax','tbs','tdl','temp','thm','tip','tla','tlb','tls','tmb','tnef','toc','torrent','tpl','tpm','tpm','tps','trc','tstream','ttx','tub','tvl','uls','ver','vfs','vir','vmg','vol','vor','vpa','vpc7','vs','wal','wba','wcm','wpl','wpm','wsz','wwd','wzmul','xlm','xlnk','xmp','xnk','xol','xol','xpr','xwf','ybk','ymg','yps','z1','zm1','zm2','zm3','zm9','zml','ztf','ztr'],
		'settings':['a2m','acrodata','aea','ahl','ahs','ams','arp','asl','ast','atf','atn','atz','avs','bcmx','bcp','bgi','blob','blt','cfg','cfg','cha','chl','clr','cm','cnf','conf','csf','cui','cwf','dbb','dbg','directory','dolphinview','downloadhost','drm','dsw','ds_store','env','eqf','eql','eqp','eum','exp','fcc','fev','fmt','fnc','fwt','gid','growlticket','gws','hid','ica','icc','icd','icm','idf','ihw','iip','inf','ini','ini','ini','isp','jws','key','kyb','kys','lang','lbu','lic','lop','m2s','mailhost','mgm','mlk','msf','mskn','msm','msn','mtf','nd','ndc','nvc','nwv','ops','opt','ovpn','pen','ph','pie','pip','plist','pls','pmc','pref','prf','prf','prf','prf','profimail','propdesc','properties','prs','prx','psf','ptf','pvs','qf','rb','rdf','rdo','rdp','reg','rpb','rpk','rps','rrr','rts','set','set','sfo','sif','ski','skz','sl','slt','sol','srs','sss','style','sw2','sz','tdf','the','themepack','tsk','tsm','tsz','twc','uis','vmtm','vmx','vmx','vnc','vph','vsw','vue','wms','wmz','wpp','xem','xep','xes','xet','xev','xgs','xlb','xpaddercontroller','xtreme','xwk','zap','zon'],
		'system':['adm','ani','ann','bmk','cab','cgz','cnt','cpi','cpl','cur','desklink','dev','dmp','drv','dss','dvd','ffa','ffl','ffo','ffx','fpbf','ftg','fts','grl','grp','hdmp','hhc','hhk','hlp','hpj','htt','icl','icns','ico','idx','ins','ion','its','kbd','kext','key','lnk','manifest','mapimail','mdmp','msc','msp','msstyle','msstyles','mui','mum','mydocs','nfo','nt','p7b','pdr','pfx','pid','pk2','pol','ppd','prefpane','prf','prt','pwl','qvm','reg','savedsearch','saver','scf','scr','sdb','str','swp','sys','sys','theme','vga','vgd','vxd','wdgt','wer','wpx'],
		'text':['1st','abw','act','adt','aim','ans','asc','asc','ascii','ase','aty','bad','bbs','bdp','bdr','bean','bib','bib','bna','boc','charset','chord','crd','crwl','cyi','dbt','dct','dgs','diz','dne','doc','doc','docm','docx','dot','dotm','dotx','dvi','dx','email','emlx','epp','err','err','etf','etx','euc','faq','fb2','fbl','fdf','fdr','fds','fes','flr','fpt','fpt','frt','fxc','gio','gio','gpn','gsd','gthr','gv','hht','hs','hwp','hz','idx','iil','imapmbox','ipf','jis','jp1','klg','klg','kml','knt','kon','kwd','latex','lbt','lis','lit','lnt','log','lp2','lrc','lst','lst','ltr','luf','lwp','lxfml','lyt','lyx','man','mbox','mell','mellel','mnt','msg','mw','mwd','mwp','nfo','notes','now','nwctxt','nzb','ocr','odm','odt','ofl','opml','ott','p7s','pages','pfx','pjt','prt','psw','pvj','pvm','pwi','qdl','rad','readme','rng','rpt','rst','rt','rtd','rtf','rtfd','rtx','run','rzk','rzn','saf','safetext','sam','save','scc','scm','sct','scw','sdm','sdw','sgm','sig','sls','sms','ssa','strings','stw','sty','sub','sxw','tab','tab','tdf','tdf','tex','text','thp','tlb','tm','tmx','tpc','tvj','txt','u3i','unauth','unx','upd','utf8','utxt','vct','vnt','wbk','wbk','wcf','wgz','wn','wp','wp4','wp5','wp6','wp7','wpa','wpd','wpd','wpl','wps','wps','wpt','wri','wsh','xdl','xdl','xlf','xps','xwp','xwp','xwp','xy','xy3','xyp','xyw','ybk','yml','zw'],
		'video':['3g2','3gp','3gp2','3gpp','3mm','60d','aep','ajp','amv','amx','arf','asf','asx','avb','avi','avs','avs','axm','bik','bin','bix','box','bsf','byu','camrec','cvc','d2v','d3v','dat','dce','dif','dir','divx','dmb','dpg','dsy','dv','dvr-ms','dvx','dxr','evo','eye','f4v','fbr','fbz','fcp','flc','flh','fli','flv','flx','gl','grasp','gvi','gvp','hkm','ifo','imovieproj','imovieproject','ivf','ivr','ivs','izz','izzy','lsf','lsx','m1pg','m1v','m21','m21','m2a','m2t','m2ts','m2v','m4e','m4u','m4v','mgv','mj2','mjp','mjpg','mkv','mnv','mod','modd','moov','mov','movie','mp21','mp21','mp2v','mp4','mp4v','mpe','mpeg','mpg','mpg2','mpv2','mqv','msdvd','msh','mswmm','mts','mtv','mvb','mvc','mvd','nsv','nvc','ogm','ogv','par','pds','piv','playlist','pmf','prel','pro','prproj','pva','pxv','qt','qtch','qtl','qtz','rcproject','rdb','rec','rm','rmvb','roq','rp','rts','rts','rum','rv','sbk','scm','scm','scn','sfvidcap','smi','smil','smk','smv','spl','srt','ssm','str','stx','svi','swf','swi','swt','tda3mt','tivo','tod','tp','tpr','trp','ts','vc1','vdo','veg','vf','vfw','vgz','vid','viewlet','viv','vivo','vlab','vob','vp6','vp7','vro','w32','wcp','wm','wmd','wmmp','wmv','wmx','wvx','xvid','yuv','zm1','zm2','zm3','zmv'],
		'web':['adr','ap','aro','asa','ascx','ashx','asmx','asp','aspx','asr','atom','bml','bok','cdf','cer','cfm','cha','chat','chm','cms','con','crt','csp','css','dap','dbm','dcr','dhtml','disco','discomap','dll','do','download','dwt','ece','epibrw','esproj','fmp','gne','hdm','hdml','htaccess','htm','html','htx','hxs','idc','iqy','jcz','jhtml','jnlp','js','jsp','jspa','jspx','jvs','jws','lasso','lbc','map','master','mht','mhtml','moz','mspx','nxg','ognc','oth','p12','pem','php','php3','php4','php5','phtm','phtml','psp','qf','qrm','rhtml','rjs','rss','rw3','rwp','rwsw','saveddeck','sdb','sht','shtm','shtml','site','srf','stl','stm','stml','svr','url','vbd','vlp','vrml','vsdisco','wdgt','webarchive','webloc','whtt','wml','woa','wpp','wrf','wsdl','xht','xhtml','xpd','xul','zfo','zhtml','zvz']
	};
	
	$.each(fileTypes, function(category, types) {
		if ($.inArray(name, types) != -1) {
			ret = category;
		}
	});
	return ret;
};


