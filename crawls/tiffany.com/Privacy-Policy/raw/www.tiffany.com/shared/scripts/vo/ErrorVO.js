// ----------------------------------------------
// File:		ErrorVO.js
// Author:		Nathan Derksen
// Description:	Value Object - stores model information about an event
// ----------------------------------------------

function ErrorVO(errorMessage, errorDetail, priority, errorType, applicationName, moduleName, procName)
{
	this.errorMessage = "-";
	this.errorDetail = "-";
	this.priority = "1";
	this.errorType = "25";
	this.applicationName = "-";
	this.moduleName = "-";
	this.procName = "-";
	
	if (errorMessage)
	{
		this.errorMessage = errorMessage;
	}
	
	if (errorDetail)
	{
		this.errorDetail = errorDetail;
	}
	
	if (priority)
	{
		this.priority = priority;
	}
	
	if (errorType)
	{
		this.errorType = errorType;
	}
	
	if (applicationName)
	{
		this.applicationName = applicationName;
	}
	
	if (moduleName)
	{
		this.moduleName = moduleName;
	}
	
	if (procName)
	{
		this.procName = procName;
	}
}
