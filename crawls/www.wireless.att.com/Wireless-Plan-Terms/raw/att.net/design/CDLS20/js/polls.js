function GetSelectedID(frm,key)
{
	boolbSelected = false;

	var frmval = document.getElementById(key).value;//searching for a poll with unique pollid
	var itemarr = frmval.split(";");
	itemid = itemarr[0];//initializing itemid for looping through polls in a tab
	boolflag = 0;//flag which holds the sum of all the poll ids present
	selpollflg = 0;//flag to check whether atleast one option is selected.
	i = 0;//counter for accessing item array
	while (document.getElementById("answer01_" + itemid) != null)
	{
		flag = 0;//flag which holds the sum of poll ids checked
		boolbSelected = false;
		pollid = 1;
		boolflag = boolflag + itemid;
				  ansstr = "answer0"

		while (document.getElementById(ansstr + pollid + "_" + itemid) != null)
		{
			
			if ( document.getElementById(ansstr + pollid + "_" + itemid).checked)
			{
				if (flag == "0")
				{
				flag = flag + itemid;
				selpollflg = selpollflg + itemid;
				boolbSelected = true;
				}
			}
			pollid = pollid + 1;
			if (pollid > 9) ansstr = "answer";
		}
		i = i + 1;
		itemid = itemarr[i];
	}

	if (boolflag != selpollflg) 
	{
		boolbSelected = false;
	}

	if (boolbSelected  == false )
	{
		alert("Please Select Your Vote!");
		return false;
	}
	return true;
}

function ismaxlength(obj){
var mlength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : ""
if (obj.getAttribute && obj.value.length>mlength)
obj.value=obj.value.substring(0,mlength)
}

