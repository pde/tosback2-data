function showhide(the_div_id, numberofdivs)
	{
//alert("this is the navPageStyle:************" );
           	for(var i=1; i<=numberofdivs; i++)
		{
			document.getElementById('NavigatePage' + i).style.display = 'none';
		}
		document.getElementById(the_div_id).style.display = "";
                window.location = '#';
	}
function showhide1(the_div_id, numberofdivs, navpagestyle)
	{
//alert("this is the navPageStyle:" +  navpagestyle);
           	for(var i=1; i<=numberofdivs; i++)
		{
			document.getElementById('NavigatePage' + i).style.display = 'none';
			// revert style for page number
document.getElementById('navi_pagenumber_' + i).style.fontWeight = 'normal';
document.getElementById('navi_pagenumber_' + i).style.textDecoration = 'underline';
document.getElementById('navi_pagenumber_' + i).style.fontSize = '10px';
document.getElementById('navi_pagenumber_' + i).style.color = '#0066cc';/**/
/*var theIdPrefix = 'navi_pagenumber_';
var theNumberHere = i;
var theIdName = theIdPrefix+theNumberHere;
alert(theIdPrefix);
alert(theNumberHere);
alert(theIdName);*/



		} //toggleClass(theIdName,'pageNaviActive','pageNaviNormal');
		document.getElementById(the_div_id).style.display = "";
			// set style for page number
              document.getElementById(navpagestyle).style.fontWeight = 'bold';
				document.getElementById(navpagestyle).style.textDecoration = 'none';
				document.getElementById(navpagestyle).style.fontSize = '14px';
				document.getElementById(navpagestyle).style.color = '#cccccc';/*  */
				
                window.location = '#';
	}
function setDivStyleToNone(i)
        {
 
            document.getElementById('NavigatePage' + i).style.display = 'none';
        }

function showImage(image_name, alt_text, next_page_text)
{
    html = "<img alt='" + alt_text + "' src='" + image_name + "'border='0'>" + next_page_text;
    document.write(html);
}

