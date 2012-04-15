
   function doClick(css){

   	show_popup=false;
    var optOne = document.myform.optone.options[document.myform.optone.selectedIndex].value;
   	var industry = document.myform.industry.options[document.myform.industry.selectedIndex].value;
   	var eduLvl = document.myform.eduLvl.options[document.myform.eduLvl.selectedIndex].value;
   	var PostUrl = document.myform.PostUrl.value;
   	//CB - 2/24/2009 added ValidateQDF() function
   	if (!ValidateQDF())
   	{return false;}

  /*different theme variables (dave)*/
  /*repolace for "css=" */
  /*advancement baby brain buttons click degrees focus graphs magnification */
  	//var url = "http://forms.elearners.com/regpath/elrn/track.aspx?CID=" + cid + "&css=" + css + "&industry=" + document.myform.opttwo.options[document.myform.opttwo.selectedIndex].text +
  	//	  "&edulvl=" + document.myform.optthree.options[document.myform.optthree.selectedIndex].value;
  	//var url = "http://localhost/forms/regpath/elrn/track.aspx?css=" + css + "&industry=" + document.myform.opttwo.options[document.myform.opttwo.selectedIndex].text +
  	//	  "&edulvl=" + document.myform.optthree.options[document.myform.optthree.selectedIndex].value;
	
	var url = PostUrl; 
	
    document.myform.action=url;
    document.myform.submit();



   }

   function setOptions(chosen) {
  var selbox = document.myform.opttwo;

  selbox.options.length = 0;
  if (chosen == " ") {
    selbox.options[selbox.options.length] = new Option('Please select one of the options above first',' ');

  }
  /*Arts &amp; Humanities*/
  if (chosen == "1") {
  selbox.options[selbox.options.length] = new Option('Communications','http://www.elearners.com/online-degrees/communications.htm');
  selbox.options[selbox.options.length] = new Option('Design','http://www.elearners.com/online-degrees/design.htm');
  selbox.options[selbox.options.length] = new Option('Fashion','http://www.elearners.com/online-degrees/fashion.htm');
  selbox.options[selbox.options.length] = new Option('General Arts','http://www.elearners.com/online-degrees/general-arts.htm');
  selbox.options[selbox.options.length] = new Option('Humanities','http://www.elearners.com/online-degrees/humanities.htm');
  selbox.options[selbox.options.length] = new Option('Liberal Arts','http://www.elearners.com/online-degrees/liberal-arts.htm');
  selbox.options[selbox.options.length] = new Option('Music','http://www.elearners.com/online-degrees/music.htm');
  selbox.options[selbox.options.length] = new Option('Religion','http://www.elearners.com/online-degrees/religion.htm');
  selbox.options[selbox.options.length] = new Option('Writing','http://www.elearners.com/online-degrees/writing.htm');

  }
  /*Business&amp;MBA*/
  if (chosen == "2") {
  selbox.options[selbox.options.length] = new Option('Accounting','http://www.elearners.com/online-degrees/accounting.htm');
  selbox.options[selbox.options.length] = new Option('Applied Management','http://www.elearners.com/online-degrees/applied-management.htm');
  selbox.options[selbox.options.length] = new Option('Business Administration and MBA','http://www.elearners.com/online-degrees/business-administration-and-mba.htm');
  selbox.options[selbox.options.length] = new Option('Business Communications','http://www.elearners.com/online-degrees/business-communications.htm');
  selbox.options[selbox.options.length] = new Option('Business Information Systems','http://www.elearners.com/online-degrees/business-information-systems.htm');
  selbox.options[selbox.options.length] = new Option('Business Leadership','http://www.elearners.com/online-degrees/business-leadership.htm');
  selbox.options[selbox.options.length] = new Option('eBusiness and eCommerce','http://www.elearners.com/online-degrees/ebusiness-and-ecommerce.htm');
  selbox.options[selbox.options.length] = new Option('Economics','http://www.elearners.com/online-degrees/economics.htm');
  selbox.options[selbox.options.length] = new Option('Finance','http://www.elearners.com/online-degrees/finance.htm');
  selbox.options[selbox.options.length] = new Option('Hotel and Hospitality Management','http://www.elearners.com/online-degrees/hotel-and-hospitality-management.htm');
  selbox.options[selbox.options.length] = new Option('Human Resources','http://www.elearners.com/online-degrees/human-resources.htm');
  selbox.options[selbox.options.length] = new Option('International Business','http://www.elearners.com/online-degrees/international-business.htm');
  selbox.options[selbox.options.length] = new Option('Management','http://www.elearners.com/online-degrees/management.htm');
  selbox.options[selbox.options.length] = new Option('Marketing','http://www.elearners.com/online-degrees/marketing.htm');
  selbox.options[selbox.options.length] = new Option('Organizational Management','http://www.elearners.com/online-degrees/organizational-management.htm');
  selbox.options[selbox.options.length] = new Option('Project Management','http://www.elearners.com/online-degrees/project-management.htm');
  selbox.options[selbox.options.length] = new Option('Risk Management','http://www.elearners.com/online-degrees/risk-management.htm');
  selbox.options[selbox.options.length] = new Option('Small Business Management','http://www.elearners.com/online-degrees/small-business-management.htm');

  }
  /*Computers &amp; I.T.*/
  if (chosen == "3") {
  selbox.options[selbox.options.length] = new Option('Computer Science and Engineering','http://www.elearners.com/online-degrees/computer-science-and-engineering.htm');
  selbox.options[selbox.options.length] = new Option('Computer Security','http://www.elearners.com/online-degrees/computer-security.htm');
  selbox.options[selbox.options.length] = new Option('Databases','http://www.elearners.com/online-degrees/databases.htm');
  selbox.options[selbox.options.length] = new Option('Graphics and Multimedia','http://www.elearners.com/online-degrees/graphics-and-multimedia.htm');
  selbox.options[selbox.options.length] = new Option('Information Systems','http://www.elearners.com/online-degrees/information-systems.htm');
  selbox.options[selbox.options.length] = new Option('Information Technology','http://www.elearners.com/online-degrees/information-technology.htm');
  selbox.options[selbox.options.length] = new Option('Internet','http://www.elearners.com/online-degrees/internet.htm');
  selbox.options[selbox.options.length] = new Option('Networks','http://www.elearners.com/online-degrees/networks.htm');
  selbox.options[selbox.options.length] = new Option('PC Repair','http://www.elearners.com/online-degrees/pc-repair.htm');
  selbox.options[selbox.options.length] = new Option('Programming','http://www.elearners.com/online-degrees/programming.htm');
  selbox.options[selbox.options.length] = new Option('Software','http://www.elearners.com/online-degrees/software.htm');
  selbox.options[selbox.options.length] = new Option('Software Engineering','http://www.elearners.com/online-degrees/software-engineering.htm');
  selbox.options[selbox.options.length] = new Option('Technology Management','http://www.elearners.com/online-degrees/technology-management.htm');
  selbox.options[selbox.options.length] = new Option('Telecommunications','http://www.elearners.com/online-degrees/telecommunications.htm');
  selbox.options[selbox.options.length] = new Option('Web Design','http://www.elearners.com/online-degrees/web-design.htm');
  selbox.options[selbox.options.length] = new Option('Web Development','http://www.elearners.com/online-degrees/web-development.htm');

  }

  /*Education &amp; Teaching*/
  if (chosen == "4") {
  selbox.options[selbox.options.length] = new Option('Adult and Higher Education','http://www.elearners.com/online-degrees/adult-and-higher-education.htm');
  selbox.options[selbox.options.length] = new Option('Curriculum and Instruction','http://www.elearners.com/online-degrees/curriculum-and-instruction.htm');
  selbox.options[selbox.options.length] = new Option('Distance Education','http://www.elearners.com/online-degrees/distance-education.htm');
  selbox.options[selbox.options.length] = new Option('Early Childhood Education','http://www.elearners.com/online-degrees/early-childhood-education.htm');
  selbox.options[selbox.options.length] = new Option('Educational Administration','http://www.elearners.com/online-degrees/educational-administration.htm');
  selbox.options[selbox.options.length] = new Option('Educational Leadership','http://www.elearners.com/online-degrees/educational-leadership.htm');
  selbox.options[selbox.options.length] = new Option('Educational Technology','http://www.elearners.com/online-degrees/educational-technology.htm');
  selbox.options[selbox.options.length] = new Option('General Education','http://www.elearners.com/online-degrees/general-education.htm');
  selbox.options[selbox.options.length] = new Option('K12 Education','http://www.elearners.com/online-degrees/k12-education.htm');
  selbox.options[selbox.options.length] = new Option('Library and Resource Management','http://www.elearners.com/online-degrees/library-and-resource-management.htm');
  selbox.options[selbox.options.length] = new Option('Special Education','http://www.elearners.com/online-degrees/special-education.htm');
  selbox.options[selbox.options.length] = new Option('Training','http://www.elearners.com/online-degrees/training.htm');


  }

  /*Health &amp; Medicine*/
  if (chosen == "5") {
  selbox.options[selbox.options.length] = new Option('Alternative Medicine','http://www.elearners.com/online-degrees/alternative-medicine.htm');
  selbox.options[selbox.options.length] = new Option('Counseling','http://www.elearners.com/online-degrees/counseling.htm');
  selbox.options[selbox.options.length] = new Option('Community Health','http://www.elearners.com/online-degrees/community-health.htm');
  selbox.options[selbox.options.length] = new Option('Health Administration','http://www.elearners.com/online-degrees/health-administration.htm');
  selbox.options[selbox.options.length] = new Option('Health Services','http://www.elearners.com/online-degrees/health-services.htm');
  selbox.options[selbox.options.length] = new Option('Human Services','http://www.elearners.com/online-degrees/human-services.htm');
  selbox.options[selbox.options.length] = new Option('Medical and Dental','http://www.elearners.com/online-degrees/medical-and-dental.htm');
  selbox.options[selbox.options.length] = new Option('Nursing','http://www.elearners.com/online-degrees/nursing.htm');
  selbox.options[selbox.options.length] = new Option('Pharmacy','http://www.elearners.com/online-degrees/pharmacy.htm');
  selbox.options[selbox.options.length] = new Option('Physical Therapy','http://www.elearners.com/online-degrees/physical-therapy.htm');
  selbox.options[selbox.options.length] = new Option('Psychology','http://www.elearners.com/online-degrees/psychology.htm');
  selbox.options[selbox.options.length] = new Option('Public Health','http://www.elearners.com/online-degrees/public-health.htm');
  selbox.options[selbox.options.length] = new Option('Radiology','http://www.elearners.com/online-degrees/radiology.htm');


  }
  /*Science &amp; Technology*/
  if (chosen == "6") {
  selbox.options[selbox.options.length] = new Option('Aviation','http://www.elearners.com/online-degrees/aviation.htm');
  selbox.options[selbox.options.length] = new Option('Engineering','http://www.elearners.com/online-degrees/engineering.htm');
  selbox.options[selbox.options.length] = new Option('Engineering Management','http://www.elearners.com/online-degrees/engineering-management.htm');
  selbox.options[selbox.options.length] = new Option('Environmental Sciences','http://www.elearners.com/online-degrees/environmental-sciences.htm');
  selbox.options[selbox.options.length] = new Option('Mathematics','http://www.elearners.com/online-degrees/mathematics.htm');
  selbox.options[selbox.options.length] = new Option('Science','http://www.elearners.com/online-degrees/science.htm');

  }
  /*Social Sciences*/
  if (chosen == "7") {
  selbox.options[selbox.options.length] = new Option('Criminal Justice','http://www.elearners.com/online-degrees/criminal-justice.htm');
  selbox.options[selbox.options.length] = new Option('History','http://www.elearners.com/online-degrees/history.htm');
  selbox.options[selbox.options.length] = new Option('Law','http://www.elearners.com/online-degrees/law.htm');
  selbox.options[selbox.options.length] = new Option('Paralegal','http://www.elearners.com/online-degrees/paralegal.htm');
  selbox.options[selbox.options.length] = new Option('Political Science','http://www.elearners.com/online-degrees/political-science.htm');
  selbox.options[selbox.options.length] = new Option('Public Administration','http://www.elearners.com/online-degrees/public-administration.htm');
  selbox.options[selbox.options.length] = new Option('Public Safety','http://www.elearners.com/search/online-degrees/public-safety.htm');
  selbox.options[selbox.options.length] = new Option('Sociology','http://www.elearners.com/online-degrees/sociology.htm');

  }

}

//CB - 2/24/2009 new function to separate validation from the doClick functionalitly
function ValidateQDF()
{
    var optOne = document.myform.optone.options[document.myform.optone.selectedIndex].value;
   	var industry = document.myform.industry.options[document.myform.industry.selectedIndex].value;
   	var eduLvl = document.myform.eduLvl.options[document.myform.eduLvl.selectedIndex].value;
   	
    if (eduLvl == "-1")
    {
	    alert("Please choose a degree level.");
	    return false;
    } 
    if (optOne == "-1"){
	    alert("Please choose a category.");
	    return false;
    }

    if (industry == "-1")
    {
	    alert("Please choose a subject.");
	    return false;
    }
    
    return true;
}

function getQDFTSource() {
    if (document.myform.tsource != null)
        return document.myform.tsource.value
    return ""
}

