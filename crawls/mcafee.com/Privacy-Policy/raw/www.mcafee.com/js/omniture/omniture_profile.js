var urlPage=encodeURI(window.location.href);
var domainName = urlPage.split(/\/+/g)[1];
var finalUrl=urlPage.replace(/^[A-Za-z]+:\/\/\S+?(\/){1}/,"");
    finalUrl="/"+finalUrl;
var UrltoSplit =finalUrl.split('/');
var secondLevelInURL = UrltoSplit[2];

var profile_name;
//Checking the domain name and assigning the s_account value
//For Production
if(domainName == "www.mcafee.com" || domainName == "mcafee.com" || domainName == "secure.nai.com" || domainName == "vil.nai.com" || domainName == "www.foundstone.com" || domainName == "secure.mcafee.com" || domainName == "searchmcafee.mcafee.com")
{
 	profile_name = "mcafeeComGlobal"
}else if(domainName == "internal.nai.com")
{
	profile_name = "mcafeecorpintranet"
}
else if (domainName == "phoenix.corp.nai.org:8600" || domainName == "sphoenix.corp.nai.org:8443" )
{
    profile_name = "mcafeeComCorpSmbDev"
}
