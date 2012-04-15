
/**
 * Author :      Statik
 * Name :        MCY_FormValidation
 * Version:      v1.1
 * Desc:         Form Validation scripts
 * todo:         prototype other validations to it
 */
 
/**
 * init form error obj array
 */
MCY_FormErrorObj_ = new Array();

/* constructor for form error obj */
function MCY_FormErrorObj(name)
{
    this.name                   = name;
    this.state                  = 0;
    this.hasBeenPressed         = hasBeenPressed;
    this.stringValue            = "";
    this.setStringValueFromForm = setStringValueFromForm;
    this.getStringValueFromForm = getStringValueFromForm;
}

/* hasBeenPressed method */
function hasBeenPressed()
{
    if(this.state == 0)
    {
        this.state = 1;
        return false;
    }
    else
    {
        return true;
    }
}

/* method to set the stringValue of an obj */
function setStringValueFromForm()
{
    this.stringValue = this.getStringValueFromForm();
}

/* method used to create a simple comma delimited set of NVP's from the form elements */
function getStringValueFromForm()
{
    var form = document[this.name];
    var deLimiter = ",";
    var str = "";
    
	/* make sure the form has elements */
	if(form.elements)
	{
	    for(var i = 0; i < form.elements.length; i++)
	    {
	        if (form.elements[i].type == "checkbox" && form.elements[i].checked == true)
	        {
	            str += form.elements[i].name + "=" + form.elements[i].value + deLimiter;
	        }
	        else if (form.elements[i].type == "checkbox" && form.elements[i].checked == false)
	        {
	            str += form.elements[i].name + "=" + "NULL" + deLimiter;
	        }
	        else 
	        {
	            str += form.elements[i].name + "=" + form.elements[i].value + deLimiter;
	        }
	    }
	}
 
	 
    return str;
    
}

/**
 * call this function to create a new form object with error checking
 */
function createNewFormErrorObj(objName)
{
  /* set the ID based off of how many objects already exist */
  var ID = eval(MCY_FormErrorObj_.length);
  var objExists = false;
  
  /* make sure object does not already exist */
  for(i = 0; i < MCY_FormErrorObj_.length; i++)
  {
    if(MCY_FormErrorObj_[i].name == objName)
    {
        objExists = true;
    }
  }
  
  /* if object does not exist create a new object */
  if(!objExists)
  {
    MCY_FormErrorObj_[ID] = new MCY_FormErrorObj(objName);
  }
}


/**
 * This should be called on most forms to do client side error checking
 * by default it supresses accidental dbl submission
 * it takes one param the FORM_NAME
 *
 * summary of dbl submission code:
 * it basically tokenizes the form on the clientside and
 * supresses dbl submission if the form values have not changed since last submission
 * effectively eliminating accidental dbl submission of forms
 *
 * TODO: add in a generic error object that can be prototyped if need be and extract out dbl submit to it
 */
 
 

function isValidSubmit(objName)
{ 
	retValid = false;
    createNewFormErrorObj(objName);
    
    for(i = 0; i < MCY_FormErrorObj_.length; i++)
    {
        if(MCY_FormErrorObj_[i].name == objName)
        {
            if(!MCY_FormErrorObj_[i].hasBeenPressed())
            {
                /* capture from values and save them to obj */
                MCY_FormErrorObj_[i].setStringValueFromForm();
                
                retValid = true;
            }
            else if(MCY_FormErrorObj_[i].hasBeenPressed() && (MCY_FormErrorObj_[i].getStringValueFromForm() != MCY_FormErrorObj_[i].stringValue))
            {
                /* capture from values and save them to obj */
                MCY_FormErrorObj_[i].setStringValueFromForm();
                
                retValid = true;
            }
            else
            {
                retValid = false;
            }
        }
    }
    
  
  return retValid;
 
}

/* end */