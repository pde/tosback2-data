
function MM_findObj(n, d) //v4.01
{
    var p,i,x;

    if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}

    if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];

    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);

    if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() //v3.0
{
    var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
    if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_preloadImages() //v3.0
{
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function mmLoadMenus()
{
    if (window.mm_menu_0023011436_0) return;

    window.mm_menu_0023011436_0 = new Menu("root",120,18,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#ffffff","#ffffff","left","middle",0,0,1000,-5,7,true,false,false,10,false,false);
    mm_menu_0023011436_0.addMenuItem("Home","location='index.php'");
    mm_menu_0023011436_0.fontWeight="bold";
    mm_menu_0023011436_0.hideOnMouseOut=true;
    mm_menu_0023011436_0.menuBorder=0;
    mm_menu_0023011436_0.menuLiteBgColor='#ffffff';
    mm_menu_0023011436_0.menuBorderBgColor='#555555';
    mm_menu_0023011436_0.bgColor='#ffffff';

    window.mm_menu_0020153310_0 = new Menu("root",150,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020153310_0.addMenuItem("Company&nbsp;Overview","location='http://www.linkline.com/company/company_overview.php'");
    mm_menu_0020153310_0.addMenuItem("Company&nbsp;History","location='http://www.linkline.com/company/company_history.php'");
    mm_menu_0020153310_0.addMenuItem("Mission&nbsp;Statement","location='http://www.linkline.com/company/mission_statement.php'");
    mm_menu_0020153310_0.addMenuItem("Careers","location='http://www.linkline.com/company/careers.php'");
    mm_menu_0020153310_0.addMenuItem("Contact&nbsp;Information","location='http://www.linkline.com/company/contact_information.php'");
    mm_menu_0020153310_0.fontWeight="bold";
    mm_menu_0020153310_0.hideOnMouseOut=true;
    mm_menu_0020153310_0.menuBorder=0;
    mm_menu_0020153310_0.menuLiteBgColor='#990000';
    mm_menu_0020153310_0.menuBorderBgColor='#000000';
    mm_menu_0020153310_0.bgColor='#000000';

	//window.mm_menu_0020154525_1_1 = new Menu("VoIP&nbsp;Services",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#e0990f","#e8b34b","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    //mm_menu_0020154525_1_1.addMenuItem("Residential VoIP","location='http://www.linkline.com/internet_services/voip_residential.php'");
    //mm_menu_0020154525_1_1.addMenuItem("Business VoIP","location='http://www.linkline.com/internet_services/voip_business.php'");
    //mm_menu_0020154525_1_1.addMenuItem("Features","location='http://www.linkline.com/internet_services/voip_features.php'");
    //mm_menu_0020154525_1_1.addMenuItem("Calling Rates","location='http://www.linkline.com/internet_services/voip_rates.php'");
	//mm_menu_0020154525_1_1.addMenuItem("411 & 911 Compliance","location='http://www.linkline.com/internet_services/voip_compliance.php'");
    //mm_menu_0020154525_1_1.addMenuItem("VoIP Glossary","location='http://www.linkline.com/internet_services/voip_glossary.php'");
	//mm_menu_0020154525_1_1.addMenuItem("Network Design","location='http://www.linkline.com/internet_services/voip_net_design.php'");
	//mm_menu_0020154525_1_1.fontWeight="bold";
    //mm_menu_0020154525_1_1.hideOnMouseOut=true;
    //mm_menu_0020154525_1_1.menuBorder=0;
    //mm_menu_0020154525_1_1.menuLiteBgColor='#990000';
    //mm_menu_0020154525_1_1.menuBorderBgColor='#999999';
    //mm_menu_0020154525_1_1.bgColor='#999999';

    window.mm_menu_0020154525_1_1 = new Menu("DSL&nbsp;Services",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020154525_1_1.addMenuItem("ISP&nbsp;Switch","location='http://www.linkline.com/internet_services/isp_switch.php'");
    mm_menu_0020154525_1_1.addMenuItem("Additional&nbsp;IPs","location='http://www.linkline.com/internet_services/request_additional_ips.php'");
    mm_menu_0020154525_1_1.addMenuItem("Residential&nbsp;DSL","location='http://www.linkline.com/internet_services/residential_dsl.php'");
    mm_menu_0020154525_1_1.addMenuItem("Business&nbsp;DSL","location='http://www.linkline.com/internet_services/business_dsl.php'");
    mm_menu_0020154525_1_1.addMenuItem("DSL&nbsp;Glossary","location='http://www.linkline.com/internet_services/dsl_glossary.php'");
    mm_menu_0020154525_1_1.addMenuItem("DSL&nbsp;FAQ","location='http://www.linkline.com/internet_services/dsl_faq.php'");
    mm_menu_0020154525_1_1.fontWeight="bold";
    mm_menu_0020154525_1_1.hideOnMouseOut=true;
    mm_menu_0020154525_1_1.menuBorder=0;
    mm_menu_0020154525_1_1.menuLiteBgColor='#990000';
    mm_menu_0020154525_1_1.menuBorderBgColor='#999999';
    mm_menu_0020154525_1_1.bgColor='#999999';

    window.mm_menu_0020154525_1_2 = new Menu("Web&nbsp;Site&nbsp;Hosting",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020154525_1_2.addMenuItem("Packages","location='http://www.linkline.com/internet_services/hosting_packages.php'");
    mm_menu_0020154525_1_2.addMenuItem("Comparison","location='http://www.linkline.com/internet_services/hosting_package_comparison.php'");
    mm_menu_0020154525_1_2.addMenuItem("Options","location='http://www.linkline.com/internet_services/hosting_options.php'");
    mm_menu_0020154525_1_2.addMenuItem("Features","location='http://www.linkline.com/internet_services/hosting_features.php'");
    mm_menu_0020154525_1_2.fontWeight="bold";
    mm_menu_0020154525_1_2.hideOnMouseOut=true;
    mm_menu_0020154525_1_2.menuBorder=0;
    mm_menu_0020154525_1_2.menuLiteBgColor='#990000';
    mm_menu_0020154525_1_2.menuBorderBgColor='#999999';
    mm_menu_0020154525_1_2.bgColor='#999999';

    window.mm_menu_0020154525_1 = new Menu("root",176,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020154525_1.addMenuItem("Overview","location='http://www.linkline.com/internet_services/overview.php'");
    //mm_menu_0020154525_1.addMenuItem(window.mm_menu_0020154525_1_1,"location='http://www.linkline.com/internet_services/voip_services.php'");
	mm_menu_0020154525_1.addMenuItem(window.mm_menu_0020154525_1_1,"location='http://www.linkline.com/internet_services/dsl_services.php'");
    mm_menu_0020154525_1.addMenuItem("Frame&nbsp;Relay","location='http://www.linkline.com/internet_services/frame_relay.php'");
    mm_menu_0020154525_1.addMenuItem("T1/T3/OCX","location='http://www.linkline.com/internet_services/t1_t3_ocx.php'");
    mm_menu_0020154525_1.addMenuItem("Co-Location","location='http://www.linkline.com/internet_services/colocation.php'");
    //mm_menu_0020154525_1.addMenuItem("Wireless&nbsp;Internet","location='http://www.linkline.com/internet_services/wireless_internet.php'");
    mm_menu_0020154525_1.addMenuItem(window.mm_menu_0020154525_1_2, "location='http://www.linkline.com/internet_services/website_hosting.php'");
    mm_menu_0020154525_1.addMenuItem("SuperWAN","location='http://www.linkline.com/internet_services/superwan.php'");
    mm_menu_0020154525_1.addMenuItem("Managed&nbsp;Servers","location='http://www.linkline.com/internet_services/managed_servers.php'");
    mm_menu_0020154525_1.addMenuItem("Managed&nbsp;Firewalls","location='http://www.linkline.com/internet_services/managed_firewalls.php'");
    mm_menu_0020154525_1.addMenuItem("Sabrenet&nbsp;Wireless","location='http://www.sabrenet.us'");
    mm_menu_0020154525_1.addMenuItem("Support Center","location='http://www.linkline.com/internet_services/support_center.php'");
    mm_menu_0020154525_1.addMenuItem("Contact&nbsp;Sales","location='http://www.linkline.com/internet_services/contact_sales.php'");
    mm_menu_0020154525_1.fontWeight="bold";
    mm_menu_0020154525_1.hideOnMouseOut=true;
    mm_menu_0020154525_1.menuBorder=0;
    mm_menu_0020154525_1.menuLiteBgColor='#990000';
    mm_menu_0020154525_1.menuBorderBgColor='#999999';
    mm_menu_0020154525_1.bgColor='#999999';

    window.mm_menu_0020161203_2_1 = new Menu("Servers",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020161203_2_1.addMenuItem("Entry-Level&nbsp;Server","location='http://www.linkline.com/computer_systems/entry_level_file_server.php'");
    //mm_menu_0020161203_2_1.addMenuItem("Mid-Range&nbsp;File&nbsp;Server","location='http://www.linkline.com/computer_systems/mid_range_file_server.php'");
    mm_menu_0020161203_2_1.addMenuItem("Enterprise&nbsp;Server","location='http://www.linkline.com/computer_systems/high_volume_file_server.php'");
    mm_menu_0020161203_2_1.fontWeight="bold";
    mm_menu_0020161203_2_1.hideOnMouseOut=true;
    mm_menu_0020161203_2_1.menuBorder=0;
    mm_menu_0020161203_2_1.menuLiteBgColor='#990000';
    mm_menu_0020161203_2_1.menuBorderBgColor='#999999';
    mm_menu_0020161203_2_1.bgColor='#999999';

    window.mm_menu_0020161203_2 = new Menu("root",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
	mm_menu_0020161203_2.addMenuItem("Data Sabre&trade;","location='http://www.linkline.com/datasabre/'");
    mm_menu_0020161203_2.addMenuItem("Contact&nbsp;Sales","location='http://www.linkline.com/computer_systems/contact_sales.php'");
    mm_menu_0020161203_2.fontWeight="bold";
    mm_menu_0020161203_2.hideOnMouseOut=true;
    mm_menu_0020161203_2.menuBorder=0;
    mm_menu_0020161203_2.menuLiteBgColor='#990000';
    mm_menu_0020161203_2.menuBorderBgColor='#999999';
    mm_menu_0020161203_2.bgColor='#999999';

    window.mm_menu_0023012515_3 = new Menu("root",110,18,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,10,false,false);
    mm_menu_0023012515_3.addMenuItem("AIS","location='https://ais.linkline.com/'");
	mm_menu_0023012515_3.addMenuItem("Webmail","location='https://webmail.linkline.com/'");
    mm_menu_0023012515_3.fontWeight="bold";
    mm_menu_0023012515_3.hideOnMouseOut=true;
    mm_menu_0023012515_3.menuBorder=0;
    mm_menu_0023012515_3.menuLiteBgColor='#ffffff';
    mm_menu_0023012515_3.menuBorderBgColor='#555555';
    mm_menu_0023012515_3.bgColor='#ffffff';

    window.mm_menu_0020161906_3 = new Menu("root",135,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020161906_3.addMenuItem("System&nbsp;Status","location='http://www.linkline.com/network/system_status.php'");
    mm_menu_0020161906_3.fontWeight="bold";
    mm_menu_0020161906_3.hideOnMouseOut=true;
    mm_menu_0020161906_3.menuBorder=0;
    mm_menu_0020161906_3.menuLiteBgColor='#990000';
    mm_menu_0020161906_3.menuBorderBgColor='#999999';
    mm_menu_0020161906_3.bgColor='#999999';

    window.mm_menu_0020215701_4 = new Menu("root",110,20,"Verdana, Arial, Helvetica, sans-serif",10,"#ffffff","#ffffff","#000000","#666666","left","middle",0,0,1000,-5,7,true,false,true,15,false,false);
    mm_menu_0020215701_4.addMenuItem("Our&nbsp;Partners","location='http://www.linkline.com/partners/our_partners.php'");
    mm_menu_0020215701_4.fontWeight="bold";
    mm_menu_0020215701_4.hideOnMouseOut=true;
    mm_menu_0020215701_4.menuBorder=0;
    mm_menu_0020215701_4.menuLiteBgColor='#990000';
    mm_menu_0020215701_4.menuBorderBgColor='#999999';
    mm_menu_0020215701_4.bgColor='#999999';

    mm_menu_0023011436_0.restoreParam = 'restore_img.gif'
    mm_menu_0020154525_1.restoreParam = 'restore_img.gif'
    mm_menu_0020154525_1.restoreParam = 'restore_img.gif'
    mm_menu_0020161203_2.restoreParam = 'restore_img.gif'
    mm_menu_0023012515_3.restoreParam = 'restore_img.gif'
    mm_menu_0020161906_3.restoreParam = 'restore_img.gif'
    mm_menu_0020215701_4.restoreParam = 'restore_img.gif'

    mm_menu_0020215701_4.writeMenus();
}



