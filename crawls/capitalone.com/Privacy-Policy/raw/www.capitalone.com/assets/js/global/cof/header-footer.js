var xmlHttpReq;
var zipCodeValue=null;
var regionValue=null;
var protocol= window.location.protocol + "//";


function getXmlHttpRequestObject()
{
		if (window.XMLHttpRequest) 
		{
			return new XMLHttpRequest(); //Not IE	
		} 
		else if(window.ActiveXObject) 
		{		
			return new ActiveXObject("Microsoft.XMLHTTP"); //IE	
		}
		else
	    {		
			alert("Your browser doesn't support the XmlHttpRequest object.  Better upgrade to Firefox.");
		}
}

function getZipCode()
{
    url =  "/SubmitZipCode";
	xmlHttpReq = getXmlHttpRequestObject();

	if (xmlHttpReq!=null)
  	{
	  	xmlHttpReq.onreadystatechange = state_Change;
		xmlHttpReq.open('POST', url, true);
		xmlHttpReq.send(null);
  	}
	else
  	{
  		alert("Your browser does not support XMLHTTP.");
  	}
  				
}
function state_Change()
{
	var patternNorth=null;
	var patternSouth=null;

if (xmlHttpReq.readyState==4)
  {// 4 = "loaded"
  if (xmlHttpReq.status==200)
    {// 200 = "OK"


    data = xmlHttpReq.responseText;

    if (data != null & data != '')
    {

      var index = data.indexOf('|');
      var length =  data.length;


      zipCodeValue = data.substring(0, index);
      regionValue = data.substring(index+1,length);
      		if(regionValue != null && regionValue!=''){
	   			
	   		 patternNorth = regionValue.toLowerCase().match(/north/); 
	   	     patternSouth = regionValue.toLowerCase().match(/south/);
	   		} 
	   	    	   	    
	   		if(patternNorth == 'north' || patternSouth =='south')
	   	  	{
	   	  		
	   	  		$('#header div.cap-one-logo-sprite img').removeClass('logo-cap-one-default').addClass('logo-cap-one-bank');
	   	  	}
	   	  	else
	   	  	{
	   	  			
	   	  	    $('#header div.cap-one-logo-sprite img').removeClass('logo-cap-one-bank').addClass('logo-cap-one-default');
	   	  	}
      if (zipCodeValue != null && zipCodeValue != '')
      {
        var legendForZIP = document.getElementById('zipLegend');
        if (legendForZIP)
        {
         legendForZIP.innerHTML = 'View products for ZIP:'+ zipCodeValue;
         window.c1zip = zipCodeValue;
        }
      }
    }
    }
  else
    {
    alert("Problem retrieving data:" + xmlHttpReq.statusText);
    }
  }
}
function showHeader(lobName,domainName){

	   getZipCode();
	   if(lobName=='Corporate')
	   	{
		  document.write("<div id='header'><a class='skip-link' id='skip-link' href='#page-body'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainName+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><form id='c1-search-form' class='search' name='c1-search-form' method='get' accept-charset='charset=UTF-8' action='"+protocol+""+domainName+"/search/'><div id='search'><label for='search-field'>Ask your question here.</label><input type='text' class='search-field' id='search-field' name='qt' size='20' maxlength='100' value='' /><input type='submit' class='search-btn' id='search-btn' alt='Search tool &mdash; Enter a term or question here' title='Site search tool' value='Search' /></div></form><ul id='nav-global'><li class='find-branch first'><form method='get' action='http://maps.capitalone.com/locator/BranchSearch.action'><fieldset><legend align='left'>Find a bank branch/ATM</legend><div class='branch-atm-locator'><input type='hidden' name='search' value='' /><input type='hidden' name='_sourcePage' value='index.jsp' /> <input type='hidden' name='searchType' value='branchSearch' /><div><input name='search value' size='5' id='bank-zipcode' class='bank-zipcode-input' type='text' value='' />&nbsp;<input class='submit' type='image' src='/assets/img/global/btn/info_body_go.gif' title='Field to enter your ZIP code to find a branch or ATM nearest you. Link to advanced search.' alt='ZIP code branch finder tool &mdash; enter your ZIP code' /></div><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_BANK_A1CDDB1CC5C1CC4D1CCF_BKPSNL_H2_01_T_BPFIND&amp;dest=http://maps.capitalone.com'>Advanced Search</a></div></fieldset></form></li><li class='zip-product-search'><form method='post' action='/SubmitZipCode' id='change-zip' name='change-zip' ><fieldset>");
		  //cookie = GetCookie('caponesn');
		  if(zipCodeValue !=null && zipCodeValue != ''){
		  	document.write("<legend id='zipLegend' class='alt-message'>View products for ZIP:"+zipCodeValue+"</legend>");  
	      }else{
	      	document.write("<legend id='zipLegend' class='alt-message'>Enter your five-digit ZIP Code</legend>");
	      }
	      document.write("<div class='zip'><label for='zipcode'>View products and features in your area</label><input type='text' size='5' maxlength='5' name='zip' id='zipcode' class='zipcode-input' />&nbsp;<input type='image'  src='/assets/img/global/btn/info_body_go.gif' title='Link to view products for this ZIP code' alt='Link to view products for this ZIP code' /></div></fieldset></form></li><li class='account'><span><span>Access your account</span></span><ul class='account-access'><li class='first'><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_CARD_Z_BCOM_H2_01_G_OASL&Log=1&dest=https://servicing.capitalone.com/c1/login.aspx'>Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_BANK_Z_BCOM_H2_02_G_OLB&Log=1&dest=https://onlinebanking.capitalone.com'>Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_SAVG_Z_BCOM_H2_03_G_SPL&Log=1&dest=https://onlinebanking.capitalone.com'>Direct Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_AUTO_Z_BCOM_H2_04_G_MYA&Log=1&dest=https://onlinebanking.capitalone.com/capitalone/Login.aspx?ori=coafPartner'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/rewards/service-login.php?linkid=WWW_Z_CARD_Z_BCOM_H2_05_G_RWSLG'>Redeem Rewards</a></li><li><a href='https://top.capitalonebank.com/cashplus/'>Treasury Optimizer</a></li><li class='last'><a href='"+protocol+""+domainName+"/login.php?linkid=WWW_Z_Z_Z_BCOM_H2_06_G_MYA'>Other Accounts</a></li></ul></li></ul><ul id='nav-primary' class='nav-primary-menu'><li><a href='"+protocol+""+domainName+"/creditcards/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_01_T_CB1'>Credit Cards</a><ul class='first'><li class='first'><a href='"+protocol+""+domainName+"/creditcards/products/most-popular/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_02_T_CCPMP'>View Popular Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/creditcards/products/compare/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_03_T_CCPCP'>Compare All Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_04_T_EXP&amp;dest=https://cardfinder.capitalone.com/CapOne/findMyOffer.do?ex=R&amp;pr=&amp;id=&amp;tg=4'>See if You're Pre-Qualified</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_05_T_GMC&amp;dest=https://getmycard.capitalone.com/cof.jsp?logtype=GMC'>Respond to a Mail Offer</a></li><li class='last'><a href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_06_T_SBCD'>Small Business Credit Cards</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_07_T_BKPSNL'>Banking</a><ul class='sub-business'><li class='first regional'><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_08_T_BKPSNL'>Personal Banking</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/checking-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_09_T_CKACTHOME'>Checking Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_10_T_SVACTHOME'>Savings Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/money-market/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_11_T_SVACTMM'>Money Market Accounts</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/certificates-deposit/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_12_T_CDHOME'>Certificates of Deposit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/investments/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_13_T_BINV'>Investments</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/private/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_14_T_BSPC'>Private Client Group</a></li><li class='regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_15_T_BSB'>Small Business Banking</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_16_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/loans/index_regional.php?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_17_T_LNHPR'>Loans</a><ul><li class='first'><a href='"+protocol+""+domainName+"/autoloans/?linkid=WWW_Z_AUTO_A1B75B1BA1C1BB8D1B65_OBTF_H1_18_T_AC1'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/bank/homeloandsandmortgages/?linkid=WWW_Z_MORT_A1B75B1BA1C1BB8D1B65_OBTF_H1_19_T_BHL'>Home Loans</a></li><li class='last'><a href='"+protocol+""+domainName+"/bank/loansandloc/?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_20_T_BLL'>Personal Loans</a></li></ul></li><li><a href='"+protocol+""+domainName+"/bank/business/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_21_T_SB1'>For Business</a><ul class='sub-business'><li class='first regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_22_T_SB1'>Small Business</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_23_T_SBCD'>Business Credit Cards</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/banking.php?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_24_T_SBPROV'>Banking Checking and Savings</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/loansandloc/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_25_T_Z'>Business Loans &amp; Lines of Credit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/merchantservices/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_26_T_Z'>Merchant Services</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/cashmanagement/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_27_T_Z'>Treasury Management</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_28_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_29_T_CU1'>Customer Service</a><ul><li class='first'><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_30_T_CU1'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/contactus/faq.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_31_T_FAQ'>Frequently Asked Questions</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest=http://maps.capitalone.com/locator/'>Find a Branch / ATM</a></li><li><a href='"+protocol+""+domainName+"/contactus/olbsupport.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_33_T_CUOLB'>Online Banking Support</a></li><li class='last'><a href='"+protocol+""+domainName+"/sitemap/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_34_T_STMP'>Site Map</a></li></ul></li></ul></div>"+
	      "<div id='zipcode-overlay-content'><h6>Please enter your five-digit ZIP Code</h6>"+
	      "<p>We ask for your ZIP Code as product offerings and features may differ among geographic locations. "+
	      "You may change your ZIP Code at any time.</p>"+
	      "<form method='post' id='zipcode-overlay-form' name='zipcode-overlay-form' action='/SubmitZipCode'>"+
		      "<label for='zipcode-overlay-input'>ZIP Code:</label>"+
		      "<input name='zip' id='zipcode-overlay-input' class='zipcode-input' type='text' size='6' maxlength='5' />"+
		      "<input class='zipcode-continue'  name='Continue' type='image' src='/assets/img/global/btn/action_body_continue.png' alt='Continue'/>"+
	      "</form></div>");
		}
		else
		{
		  document.write("<div id='header'><a class='skip-link' href='#page-body'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainName+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; Bank logo with a link to the home page' alt='Capital One&reg; Bank logo' height='187' width='150'/></a></div><form id='c1-search-form' class='search' name='c1-search-form' method='get' accept-charset='charset=UTF-8' action='"+protocol+""+domainName+"/search/'><div id='search'><label for='search-field'>Ask your question here.</label><input type='text' class='search-field' id='search-field' name='qt' size='20' maxlength='100' value='' /><input type='submit' class='search-btn' id='search-btn' alt='Search tool &mdash; Enter a term or question here' title='Site search tool' value='Search' /></div></form><ul id='nav-global'><li class='find-branch first'><form method='get' action='http://maps.capitalone.com/locator/BranchSearch.action'><fieldset><legend align='left'>Find a bank branch/ATM</legend><div class='branch-atm-locator'><input type='hidden' name='searchType' value='branchSearch' /><input name='search value' size='5' maxlength='5' id='bank-zipcode' class='bank-zipcode-input' type='text' value='' />&nbsp;<input class='submit' type='image' src='/assets/img/global/btn/info_body_go.gif' title='Field to enter your ZIP code to find a branch or ATM nearest you. Link to advanced search.' alt='ZIP code branch finder tool &mdash; enter your ZIP code' /><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_BANK_A1CDDB1CC5C1CC4D1CCF_BKPSNL_H2_01_T_BPFIND&amp;dest=http://maps.capitalone.com'>Advanced Search</a></div></fieldset></form></li><li class='zip-product-search'><form method='post' action='/SubmitZipCode' id='change-zip' name='change-zip' ><fieldset>");
		  //cookie = GetCookie('caponesn');
		  if(zipCodeValue !=null && zipCodeValue != ''){
		  	document.write("<legend id='zipLegend' class='alt-message'>View products for ZIP:"+zipCodeValue+"</legend>");  
	      }else{
	      	document.write("<legend id='zipLegend' class='alt-message'>Enter your five-digit ZIP Code</legend>");
	      }
	      document.write("<div class='zip'><label for='zipcode'>View products and features in your area</label><input type='text' size='5' maxlength='5' name='zip' id='zipcode' class='zipcode-input' />&nbsp;<input type='image'  src='/assets/img/global/btn/info_body_go.gif' title='Link to view products for this ZIP code' alt='Link to view products for this ZIP code' /></div></fieldset></form></li><li class='account'><span><span>Access your account</span></span><ul class='account-access'><li class='first'><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_CARD_Z_BCOM_H2_01_G_OASL&Log=1&dest=https://servicing.capitalone.com/c1/login.aspx'>Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_BANK_Z_BCOM_H2_02_G_OLB&Log=1&dest=https://onlinebanking.capitalone.com'>Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_SAVG_Z_BCOM_H2_03_G_SPL&Log=1&dest=https://onlinebanking.capitalone.com'>Direct Banking</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?linkid=WWW_Z_AUTO_Z_BCOM_H2_04_G_MYA&Log=1&dest=https://onlinebanking.capitalone.com/capitalone/Login.aspx?ori=coafPartner'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/rewards/service-login.php?linkid=WWW_Z_CARD_Z_BCOM_H2_05_G_RWSLG'>Redeem Rewards</a></li></li><li><a href='#'>Treasury Optimizer</a></li><li class='last'><a href='"+protocol+""+domainName+"/login.php?linkid=WWW_Z_Z_Z_BCOM_H2_06_G_MYA'>Other Accounts</a></li></ul></li></ul><ul id='nav-primary' class='nav-primary-menu'><li><a href='"+protocol+""+domainName+"/creditcards/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_01_T_CB1'>Credit Cards</a><ul class='first'><li class='first'><a href='"+protocol+""+domainName+"/creditcards/products/most-popular/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_02_T_CCPMP'>View Popular Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/creditcards/products/compare/?linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_03_T_CCPCP'>Compare All Credit Cards</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_04_T_EXP&amp;dest=https://cardfinder.capitalone.com/CapOne/findMyOffer.do?ex=R&amp;pr=&amp;id=&amp;tg=4'>See if You're Pre-Qualified</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CARD_A1B75B1BA1C1BB8D1B65_OBTF_H1_05_T_GMC&amp;dest=https://getmycard.capitalone.com/cof.jsp?logtype=GMC'>Respond to a Mail Offer</a></li><li class='last'><a href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_06_T_SBCD'>Small Business Credit Cards</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_07_T_BKPSNL'>Banking</a><ul class='sub-business'><li class='first regional'><a rel='zipcode' href='"+protocol+""+domainName+"/banking/personal/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_08_T_BKPSNL'>Personal Banking</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/checking-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_09_T_CKACTHOME'>Checking Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_10_T_SVACTHOME'>Savings Accounts</a></li><li class='regional'><a class='submenu-items' rel='zipcode' href='"+protocol+""+domainName+"/savings-accounts/money-market/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_11_T_SVACTMM'>Money Market Accounts</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/certificates-deposit/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_12_T_CDHOME'>Certificates of Deposit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/investments/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_13_T_BINV'>Investments</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/services/private/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_14_T_BSPC'>Private Client Group</a></li><li class='regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_15_T_BSB'>Small Business Banking</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_BANK_A1B75B1BA1C1BB8D1B65_OBTF_H1_16_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/loans/index_regional.php?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_17_T_LNHPR'>Loans</a><ul><li class='first'><a href='"+protocol+""+domainName+"/autoloans/?linkid=WWW_Z_AUTO_A1B75B1BA1C1BB8D1B65_OBTF_H1_18_T_AC1'>Auto Loans</a></li><li><a href='"+protocol+""+domainName+"/bank/homeloandsandmortgages/?linkid=WWW_Z_MORT_A1B75B1BA1C1BB8D1B65_OBTF_H1_19_T_BHL'>Home Loans</a></li><li class='last'><a href='"+protocol+""+domainName+"/bank/loansandloc/?linkid=WWW_Z_PERS_A1B75B1BA1C1BB8D1B65_OBTF_H1_20_T_BLL'>Personal Loans</a></li></ul></li><li><a href='"+protocol+""+domainName+"/bank/business/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_21_T_SB1'>For Business</a><ul class='sub-business'><li class='first regional'><a href='"+protocol+""+domainName+"/bank/smallbusiness/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_22_T_SB1'>Small Business</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/smallbusiness/cards/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_23_T_SBCD'>Business Credit Cards</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/banking.php?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_24_T_SBPROV'>Banking Checking and Savings</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/loansandloc/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_25_T_Z'>Business Loans &amp; Lines of Credit</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/merchantservices/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_26_T_Z'>Merchant Services</a></li><li class='regional'><a class='submenu-items' href='"+protocol+""+domainName+"/bank/smallbusiness/cashmanagement/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_27_T_Z'>Treasury Management</a></li><li class='last regional'><a href='"+protocol+""+domainName+"/bank/commercial/?linkid=WWW_Z_SBUS_A1B75B1BA1C1BB8D1B65_OBTF_H1_28_T_BCOM'>Commercial Banking (Over $10 MM in Revenue)</a></li></ul></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_29_T_CU1'>Customer Service</a><ul><li class='first'><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_30_T_CU1'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/contactus/faq.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_31_T_FAQ'>Frequently Asked Questions</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest=http://maps.capitalone.com/locator/'>Find a Branch / ATM</a></li><li><a href='"+protocol+""+domainName+"/contactus/olbsupport.php?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_33_T_CUOLB'>Online Banking Support</a></li><li class='last'><a href='"+protocol+""+domainName+"/sitemap/?linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_34_T_STMP'>Site Map</a></li></ul></li></ul></div>"+
	      "<div id='zipcode-overlay-content'><h6>Please enter your five-digit ZIP Code</h6>"+
	      "<p>We ask for your ZIP Code as product offerings and features may differ among geographic locations. "+
	      "You may change your ZIP Code at any time.</p>"+
	      "<form method='post' id='zipcode-overlay-form' name='zipcode-overlay-form' action='/SubmitZipCode'>"+
		      "<label for='zipcode-overlay-input'>ZIP Code:</label>"+
		      "<input name='zip' id='zipcode-overlay-input' class='zipcode-input' type='text' size='6' maxlength='5' />"+
		      "<input class='zipcode-continue'  name='Continue' type='image' src='/assets/img/global/btn/action_body_continue.png' alt='Continue'/>"+
	      "</form></div>");

		}	      
      //<![CDATA[
          jQuery('#search-field').val(jQuery('#search label').remove().text());
          jQuery('#search-btn').val('');
      //]]>
}

function showHeaderPopUp(lobName,domainNameJS)
{

	if(lobName=='Corporate')
	   	{
		  document.write("<div id='header'><a id='skip-link' class='skip-link' href='#page-body' title='Skip to content'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainNameJS+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><div id='popup-close' align='right'><a href='#' onclick='javascript:window.close();'><img src='/assets/img/global/btn/btn_close_window.gif' alt='Close window'/></a></div></div>");
		}
	else
	{
		document.write("<div id='header'><a id='skip-link' class='skip-link' href='#page-body' title='Skip to content'>Skip to content</a><div class='cap-one-logo-sprite'><a href='"+protocol+""+domainNameJS+"/' title='Back to Capital One&reg; home'><img class='logo-cap-one-default' src='/assets/img/global/logo/sprite/header.gif' title='Capital One&reg; logo with a link to the home page' alt='Capital One&reg; logo' height='187' width='150'/></a></div><div id='popup-close' align='right'><a href='#' onclick='javascript:window.close();'><img src='/assets/img/global/btn/btn_close_window.gif' alt='Close window'/></a></div></div>");	
	}	

}

function showFooter(domainName,getLob,getYearValue,getBusinessNameValue){

   document.write("<div id='footer' class='row alpha omega'><div class='column grid-2 first'><div class='genericA'><h6>CapitalOne.com</h6><ul><li><a title='Capital One Home' href='"+protocol+""+domainName+"'>Capital One Home</a></li><li><a href='"+protocol+""+domainName+"/creditcards/' title='Credit Cards'>Credit Cards</a></li><li><a rel='zipcode' href='"+protocol+""+domainName+"/banking' title='Banking'>Banking</a></li><li><a href='"+protocol+""+domainName+"/loans/' title='Banking'>Loans</a></li><li><a href='/smallbusiness/' title='Small Business'>Small Business</a></li><li><a href='"+protocol+""+domainName+"/bank/commercial/' title='Commercial Banking'>Commercial Banking</a></li><li><a href='"+protocol+""+domainName+"/sitemap/' title='Site Map'>Site Map</a></li></ul></div><div class='genericB'></div></div><div class='column grid-3'><div class='genericA'><h6>Corporate Information</h6><ul><li><a href='/about/' title='About Capital One'>About Capital One</a></li><li><a href='"+protocol+""+domainName+"/contactus/?linkid=WWW_Z_Z_Z_GBLFO_FO_02_T_CU1' target='_blank' title='Contact Us'>Contact Us</a></li><li><a href='"+protocol+""+domainName+"/careers/?linkid=WWW_Z_Z_Z_GBLFO_FO_03_T_CAR1' target='_blank' title='Careers'>Careers</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_04_T_A17&dest="+protocol+"phx.corporate-ir.net/phoenix.zhtml?c=70667&p=irol-irhome' target='_blank' title='Investors'>Investors</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_05_T_PHXIR&dest="+protocol+"phx.corporate-ir.net/phoenix.zhtml?c=70667&p=irol-news' target='_blank' title='Press'>Press</a></li><li><a href='"+protocol+""+domainName+"/financialeducation/?linkid=WWW_Z_Z_Z_GBLFO_FO_06_T_FIN' title='Financial Education'>Financial Education</a></li></ul></div><div class='genericB'></div></div><div class='column grid-2'><div class='genericA'><h6>Locations</h6><ul><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&amp;linkid=WWW_Z_CUST_A1B75B1BA1C1BB8D1B65_OBTF_H1_32_T_BPFIND&amp;dest="+protocol+"maps.capitalone.com/locator/' target='_blank' title='Find a Branch or ATM'>Find a Branch/ATM</a></li></ul><h6>Worldwide</h6><ul><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_06_T_ISCAN&dest="+protocol+"www.capitalone.ca' target='_blank'>Canada</a></li><li><a href='"+protocol+""+domainName+"/redirect.php?Log=1&linkid=WWW_Z_Z_Z_GBLFO_FO_07_T_ISUK&dest="+protocol+"www.capitalone.co.uk' target='_blank'>UK</a></li></ul></div><div class='genericB'></div></div><div class='column grid-2'><div class='genericA'><h6>Legal</h6><ul><li><a href='"+protocol+""+domainName+"/legal/privacy.php?linkid=WWW_Z_Z_Z_GBLFO_F1_01_T_FO1' target='_blank'>Privacy</a></li><li><a href='"+protocol+""+domainName+"/legal/security.php?linkid=WWW_Z_Z_Z_GBLFO_F1_02_T_FO4' target='_blank'>Security</a></li><li><a href='"+protocol+""+domainName+"/legal/terms.php?linkid=WWW_Z_Z_Z_GBLFO_F1_03_T_FO5' target='_blank'>Terms &amp; Conditions</a></li></ul></div><div class='genericB'><img id='logo-fdic' src='/assets/img/global/logo/fdic.png' title='FDIC logo' alt='Capital One Bank is FDIC insured' width='97' height='12' /><div><img id='logo-ehl' src='/assets/img/global/logo/ehl.png' title='Equal Housing Lender logo' alt='Capital One is an Equal Housing Lender' width='26' height='27' border='0' /><span>Equal Housing Lender</span></div></div></div>"+
   "<div class='genericA' id='footerInfo'><p>This site provides information about and access to financial services offered by the Capital One family of companies, including Capital One Bank (USA), N.A. and Capital One, N.A., Members FDIC.<br />&copy;"+getYearValue+" "+getBusinessNameValue+"</p><p>Capital One is a federally registered service mark. All rights reserved.Blank Check&reg; is a registered trademark of Capital One Services, Inc.Capital One does not provide, endorse, nor guarantee and is not liable for third party products, services, educational tools, or other information available through this site.<br/><a href='"+protocol+""+domainName+"/capitaloneplace/disclosures.php?linkid=WWW_Z_Z_Z_GBLFO_FO_08_T_DIS1' target='_blank'>Read additional disclosures</a>.</p></div><div class='genericB'></div></div>");

}
function showFooterPopUp(domainName,getLob,getYearValue,getBusinessNameValue){

	document.write("<div id='footer' class='row alpha omega'>&copy;"+getYearValue+" "+getBusinessNameValue+". The trademarks used herein are owned by "+getBusinessNameValue+".All rights reserved</p><br><p align='center'><a href='#' onclick='javascript:window.close();' id='popup-close-btm'>Close window</a></p>");
}

/**function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return unescape(document.cookie.substring(offset, endstr));
  }

function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal (j);
      }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
    }
  return null;
  }

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
  }**/