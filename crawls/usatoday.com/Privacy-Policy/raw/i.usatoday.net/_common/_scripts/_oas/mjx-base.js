function Include_Javascript_File(jsFile)
{

document.write('<script type="text/javascript" src="' + jsFile + '"></scr' + 'ipt>');

}


Include_Javascript_File('http://i.usatoday.net/_common/_scripts/_oas/ad_code_adtech.js');

function OAS_AD(ad_position_name)
{
	get_ad_content(ad_position_name);
}