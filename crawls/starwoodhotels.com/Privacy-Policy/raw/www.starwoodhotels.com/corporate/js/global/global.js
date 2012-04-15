//Careers
function showHideLongDesc()	{
		if (document.getElementById("bioLongDescContainer").style.display != "none")	{
			document.getElementById("bioLongDescContainer").style.display = "none";
			document.getElementById("bioMidContainer").style.cursor = "pointer";
		}	else	{
			document.getElementById("bioLongDescContainer").style.display = "block";
			document.getElementById("bioMidContainer").style.cursor = "default";
		}

	}

SW.domWidget.toolTips.setEnabled(true);
SW.domWidget.inputLabels.setEnabled(true);
SW.domWidget.dhtmlSelect.setEnabled(true);
SW.domWidget.bodyClickHandler.setEnabled(true);