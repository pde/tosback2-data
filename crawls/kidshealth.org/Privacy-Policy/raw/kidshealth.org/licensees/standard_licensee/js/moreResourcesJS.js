// More Resources JavaScript

function setVars()
	{
		_PKTtabParents = document.getElementById("PKTtabParents");
		_PKTtabTeens = document.getElementById("PKTtabTeens");
		_PKTtabKids = document.getElementById("PKTtabKids");
		//_PKTtabCollege = document.getElementById("PKTtabCollege");
		_navTabsPKT = document.getElementById("navTabsPKT");
		
		// Fetch list bodies if available
		if(document.getElementById("relatedArticlesListParents") != null)
			{
				_relatedArticlesListParents = document.getElementById("relatedArticlesListParents");
			}
			else
				{
					_relatedArticlesListParents = document.getElementById("zeroTester");
				}
			
		if(document.getElementById("relatedArticlesListTeens") != null)
			{
				_relatedArticlesListTeens = document.getElementById("relatedArticlesListTeens");
			}
			else
				{
					_relatedArticlesListTeens = document.getElementById("zeroTester");
				}
				
		if(document.getElementById("relatedArticlesListKids") != null)
			{
			_relatedArticlesListKids = document.getElementById("relatedArticlesListKids");
			}
			else
				{
				_relatedArticlesListKids = document.getElementById("zeroTester");
				}
				
		/*if(document.getElementById("relatedArticlesListCollege") != null)
			{
			_relatedArticlesListCollege = document.getElementById("relatedArticlesListCollege");
			}
			else
				{
				_relatedArticlesListCollege = document.getElementById("zeroTester");
				}*/
	}
	
function setSectionVariables(Section)
	{  
		if(Section.match("PKT") != null)
			{
				_navTabsPKT.style.display = "block";
			}
		
		_PKTtabTeens.style.display = "block";
		_PKTtabKids.style.display = "block";
		_PKTtabParents.style.display = "block";
		//_PKTtabCollege.style.display = "block";
		
		_relatedArticlesListParents.style.display = "none";
		_relatedArticlesListTeens.style.display = "none";
		_relatedArticlesListKids.style.display = "none";
		//_relatedArticlesListCollege.style.display = "none";
	
		if(Section.match("P") == null)
			_PKTtabParents.style.display = "none";
			
		if(Section.match("K") == null)
			_PKTtabKids.style.display = "none";
			
		if (Section.match("T") == null)
			_PKTtabTeens.style.display = "none";
			
		/*if(Section.match("C") == null)
			_PKTtabCollege.style.display = "none";*/
			
			
	
		if(Section.match("P") != null)
			{
				_PKTtabParents.className = "current";
				_relatedArticlesListParents.style.display = "block";
				
			} 
		
		else if(Section.match("K") != null)
			{
				_relatedArticlesListKids.style.display = "block";
				_PKTtabKids.className = "current";
			}
			
		else if (Section.match("T") != null)
			{
			_relatedArticlesListTeens.style.display = "block";
			_PKTtabTeens.className = "current";
			}
		
		/*else if (Section.match("C") != null)
			{
			_relatedArticlesListCollege.style.display = "block";
			_PKTtabCollege.className = "current";
			}*/
		
	}

function PKTJS(section)
	{    
		_PKTtabTeens.className = "wascurrent";
		_PKTtabParents.className = "wascurrent";
		_PKTtabKids.className = "wascurrent";
		//_PKTtabCollege.classname = "wascurrent";
		_relatedArticlesListParents.style.display = "none";
		_relatedArticlesListTeens.style.display = "none";
		_relatedArticlesListKids.style.display = "none";
		//_relatedArticlesListCollege.style.display = "none";
				 
		if(section == "Parents")
			{                  
				_PKTtabParents.className = "current";
				_relatedArticlesListParents.style.display = "block";
			}
		
		else if(section  == "Teens")
			{
				_PKTtabTeens.className = "current";
				_relatedArticlesListTeens.style.display = "block";
			}
		/*else if(section  == "College")
			{
				_PKTtabCollege.className = "current";
				_relatedArticlesListCollege.style.display = "block";
			}	
		*/
		
		else
			{
			_PKTtabKids.className = "current";
			_relatedArticlesListKids.style.display = "block";
			}
	} 

function noTabs() 
	{
		_PKTtabTeens.style.display = "none";
		_PKTtabKids.style.display = "none";
		_PKTtabParents.style.display = "none";
		//_PKTtabCollege.style.display = "none";
		_PKTtabTeens.className = "current";
		_relatedArticlesListParents.style.display = "none";
		_relatedArticlesListTeens.style.display = "none";
		_relatedArticlesListKids.style.display = "none";
		//_relatedArticlesListCollege.style.display = "none";
		document.getElementById("moreOnThisTopicHeader").style.display = "none";
		document.getElementById("boxBreaker").style.display = "none";
	}

	
function PKTChoose(parentCount, kidsCount, teensCount, collegeCount )
	{
		var section ="";
		/*if(parentCount > 0 && kidsCount > 0 && teensCount > 0)
			{
				collegeCount = 0;
			}
			*/
		if(parentCount > 0)
			{
				section = "P";
			} 
		if(kidsCount >0 )
			{
				section= section + "K";
			}
		if(teensCount > 0)
			{
				section = section + "T";
			}
			
		/*if(collegeCount > 0)
			{
				section= section +"C";
			}*/
		if(section == "")
			{
			noTabs();
			}
			
		else {
		setSectionVariables(section); 
		} 
	}

	
	/**/