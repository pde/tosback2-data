// ----------------------------------------------------------------------------
//       File Name: enduser.js
//       Subsystem: enduser
//   Document Type: Javascript include file
//         Purpose: contains all non-page specific enduser page Javascript
// ----------------------------------------------------------------------------
var inside_check_mask = 0;

function utf8_len(str)
{
    var i, sz, len = 0;

    for (i = 0, sz = str.length; i < sz; i++) 
        if (str.charCodeAt(i) < 0x0080)
            len += 1;
        else if (str.charCodeAt(i) < 0x0800)
            len += 2;
        else
            len += 3;

    return(len);
}

// ----------------------------------------------------------------------------

function utf8_excess_chars(str, maxlen)
{
    var i, sz, len = 0; excess = 0;

    for (i = 0, sz = str.length; i < sz; i++)
    {
        if (str.charCodeAt(i) < 0x0080)
            len += 1;
        else if (str.charCodeAt(i) < 0x0800)
            len += 2;
        else
            len += 3;

        if (len > maxlen)
            excess += 1;
    }

    return(excess);
}

// ----------------------------------------------------------------------------

function is_furigana_string(str)
{
    var i, sz, c;

    for (i = 0, sz = str.length; i < sz; i++)
    {
        c = str.charCodeAt(i);

        if ((c >= 0x3041  &&  c <= 0x309E) || // hiragana
            (c >= 0x30A1  &&  c <= 0x30FE) || // full-width katakana
            (c == 0x2212) || (c == 0x2025) || // full-width hyphens
            (c == 0xFF0E) || (c == 0x0020) || // nakaguro, ' '
            (c >= 0x0030  &&  c <= 0x0039) || // '0' - '9'
            (c >= 0x0041  &&  c <= 0x005A) || // 'A' - 'Z'
            (c >= 0x0061  &&  c <= 0x007A) || // 'a' - 'z'
            (c == 0x0028) || (c == 0x0029) || // '('   ')'
            (c == 0x002C) || (c == 0x002E) || // ','   '.'
            (c == 0x0026) || (c == 0x002D) || // '&'   '-'
            (c == 0xFF0D) || (c == 0xFF06) || // full-width hypen and ampersand
            (c == 0xFF08) || (c == 0xFF09) || // full-width parenthesis
            (c == 0x3000))                    // full-width space
            continue;

        return(false);
    }

    return(true);
}

// ----------------------------------------------------------------------------

function submenu(code, items)
{
    this.code  = code;
    this.items = items;
}

// ----------------------------------------------------------------------------

function subitem(code, name)
{
    this.code = code;
    this.name = name;
}

// ----------------------------------------------------------------------------

function field_data(int_msg, reqd_msg, not_complete_msg, oversz_msg,
                    ascii_msg, email_msg, furigana_msg, 
                    too_few_options_msg, too_many_options_msg,
                    mon_lbl, day_lbl, yr_lbl, hr_lbl, min_lbl,
                    email_expr, date_order, date_max_year, no_html_msg, pos_int_msg,
                    fld_too_mny_chars_msg, must_cont_valid_format_char_msg,                    
                    not_valid_format_char_msg, must_cont_valid_num_msg,
                    not_valid_num_msg, must_cont_valid_alphanum_msg,
                    not_valid_alphanum_msg, must_cont_valid_letter_msg,
                    not_valid_letter_msg, must_cont_valid_char_msg,
                    not_valid_char_msg, corr_fmt_is_msg, val_ent_lt_sm_val_fld_msg, val_ent_gt_lg_val_fld_msg, invalid_date_msg,
                    invalid_date_format_msg,
                    mm_abbreviation,
                    dd_abbreviation,
                    yyyy_abbreviation,
                    min_year_msg,
                    max_year_msg)
{
    this.int_msg                           = int_msg;
    this.reqd_msg                          = reqd_msg;
    this.not_complete_msg                  = not_complete_msg;
    this.oversz_msg                        = oversz_msg;
    this.ascii_msg                         = ascii_msg;
    this.email_msg                         = email_msg;
    this.furigana_msg                      = furigana_msg;
    this.no_html_msg                       = no_html_msg;    
    this.pos_int_msg                       = pos_int_msg;
    this.fld_too_mny_chars_msg             = fld_too_mny_chars_msg;
    this.must_cont_valid_format_char_msg   = must_cont_valid_format_char_msg;
    this.not_valid_format_char_msg         = not_valid_format_char_msg;
    this.must_cont_valid_num_msg           = must_cont_valid_num_msg;
    this.not_valid_num_msg                 = not_valid_num_msg;
    this.must_cont_valid_alphanum_msg      = must_cont_valid_alphanum_msg;
    this.not_valid_alphanum_msg            = not_valid_alphanum_msg;
    this.must_cont_valid_letter_msg        = must_cont_valid_letter_msg;
    this.not_valid_letter_msg              = not_valid_letter_msg;
    this.must_cont_valid_char_msg          = must_cont_valid_char_msg;
    this.not_valid_char_msg                = not_valid_char_msg;
    this.corr_fmt_is_msg                   = corr_fmt_is_msg;
    this.too_few_options_msg               = too_few_options_msg;
    this.too_many_options_msg              = too_many_options_msg;
    this.val_ent_lt_sm_val_fld_msg         = val_ent_lt_sm_val_fld_msg;
    this.val_ent_gt_lg_val_fld_msg         = val_ent_gt_lg_val_fld_msg;
    this.invalid_date_msg                  = invalid_date_msg;
    this.invalid_date_format_msg           = invalid_date_format_msg;
    this.mm_abbreviation                   = mm_abbreviation;
    this.dd_abbreviation                   = dd_abbreviation;
    this.yyyy_abbreviation                 = yyyy_abbreviation;
    this.min_year_msg                      = min_year_msg;
    this.max_year_msg                      = max_year_msg;

    this.date_order                        = date_order;
    this.date_max_year                     = date_max_year;

    // can't do a cfg_get in javascript, so store it in a javascript variable
    switch (date_order) 
    {
    case 0: // American
        this.dt_lbl     = new Array(mon_lbl, day_lbl, yr_lbl, hr_lbl, min_lbl);
        this.dt_sfx     = new Array('_mon', '_day', '_yr');
        break;
    case 1: // Japanese
        this.dt_lbl     = new Array(yr_lbl, mon_lbl, day_lbl, hr_lbl, min_lbl);
        this.dt_sfx     = new Array('_yr', '_mon', '_day');
        break;
    case 2: // European
        this.dt_lbl     = new Array(day_lbl, mon_lbl, yr_lbl, hr_lbl, min_lbl);
        this.dt_sfx     = new Array('_day', '_mon', '_yr');
        break;
    }

    email_expr = email_expr.replace(/^\s+|\s$/g,''); // trim any return characters or whitespace
    this.email_expr = new RegExp(email_expr ? email_expr : '.*');
}

// ----------------------------------------------------------------------------

function field(name, label, type, maxlen, flags)
{
    this.name   = name;
    this.label  = label;
    this.type   = type;
    this.maxlen = maxlen;

    // flags is a bitmask:
    //  0x0001  required
    //  0x0002  ascii only
    //  0x0004  must match email pattern
    //  0x0008  cannot contain HTML
    //  0x0010  valid furigana characters only
    //  0x0020  cannot contain < >
    //  0x0040  int must be greater than 0
    //  0x0080  field is a checkbox (unselected value doesn't show in post params)
    this.flags  = flags;
}

// ----------------------------------------------------------------------------

function _upd_submenu(menu, submenu, submenu_data, all_str)
{
    var i, j = 1, sz;

    submenu.length = 0;

    submenu.options[0]       = new Option();
    submenu.options[0].text  = all_str;
    submenu.options[0].value = '';

    for (i = 0, sz = submenu_data.length; i < sz; i++)
        if (submenu_data[i].code == menu.options[menu.selectedIndex].value)
        {
            for ( ; j <= submenu_data[i].items.length; j++)
            {
                submenu.options[j]       = new Option();
                submenu.options[j].text  = submenu_data[i].items[j-1].name;
                submenu.options[j].value = submenu_data[i].items[j-1].code;
            }

            break;
        }

    submenu.length        = j;
    submenu.selectedIndex = 0;
}

// ----------------------------------------------------------------------------

function _alp_onload(page, gridsort)
{
    if (document.grid)
    {
        if (document.grid.p_page)
            document.grid.p_page.selectedIndex = page - 1;
        if (document.grid.p_gridsort)
            document.grid.p_gridsort.value = gridsort;
    }
}

// ----------------------------------------------------------------------------

function _adp_print(url)
{
    window.open(url, 'print_answer', 'resizable,menubar,toolbar,scrollbars');
}

// ----------------------------------------------------------------------------

function _adp_email(url)
{
    window.open(url, 'email_answer', 'resizable,width=700,height=550');
}

// ----------------------------------------------------------------------------
// CDT_DATE and CDT_DATETIME components are processed as individual CDT_MENU
// fields

function _check_fields(form_name, fld_data, fields)
{
    var fld, i, j, numSet, str;
    var ws_exp      = new RegExp("(^\\s+|\\s*$)", "g");
    var strtok_exp  = new RegExp("%s");
    var numtok_exp  = new RegExp("%d");
    var valid_ascii = new RegExp("^[\x20-\x7e]+$");
    var no_html     = new RegExp("[<>]");
  
    with (fld_data) for (i = 0; (i < fields.length) && fields[i].type; i++)
    {
        if ((fields[i].type != 4) && (fields[i].type != 7))
            fld = eval('document.'+form_name+'.'+fields[i].name);
        
        switch (fields[i].type)
        {
        	
            case 1: // CDT_MENU
                if ((fields[i].flags & 1) &&
                    (fld.length > 1) && (fld.selectedIndex < 1))
                {
                    alert('\''+fields[i].label+'\' '+reqd_msg);
                    fld.focus();
                    return(false);
                }
                break;

            case 2: // CDT_BOOL
            case 8: // CDT_OPT_IN
                if ((fields[i].flags & 1) &&
                    !fld[0].checked && !fld[1].checked)
                {
                    alert('\''+fields[i].label+'\' '+reqd_msg);
                    fld[0].focus();
                    return(false);
                }
                break;

            case 3: // CDT_INT
				if(fld.value == null)
				break;
                fld.value = fld.value.replace(ws_exp, '');
                if (fld.value.length && isNaN(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+int_msg);
                    fld.focus();
                    return(false);
                }
                if (fields[i].flags & 0x40 && fld.value < 0)
                {
                    alert('\''+fields[i].label+'\' '+pos_int_msg);
                    fld.focus();
                    return(false);                     
                }
                
                if(parseInt(fld.value) > fld.maxval)
                {
                    alert('\''+fields[i].label+'\' '+val_ent_gt_lg_val_fld_msg + ' \'' + fld.maxval + '\'');
                    fld.focus();
                    return(false);                     
                }
                if(parseInt(fld.value) < fld.minval)
                {
                    alert('\''+fields[i].label+'\' '+ val_ent_lt_sm_val_fld_msg + ' \'' + fld.minval + '\'');
                    fld.focus();
                    return(false);                     
                }

                // I guess no one dares get rid of this deliberate drop through since
                // it was put in at the beginning of time!... just keep adding if's inside
                // the cases.  We're always so 
                // afraid of creating new bugs that we don't ever do the right thing!
                // deliberate drop through

            case 5: // CDT_VARCHAR
				if(fld.value == null)
				break;
                //check to see that the maxlenth is followed
                //not valid for CDT_INT
                if (fields[i].type != 3 && fields[i].maxlen && (fields[i].maxlen < fld.value.length))
                {
                    str = oversz_msg.replace(strtok_exp, fields[i].label);
                    str = str.replace(numtok_exp, fields[i].maxlen);
                    str = str.replace(numtok_exp,
                                      fld.value.length - fields[i].maxlen);

                    alert(str);
                    fld.focus();
                    return(false);
                }
                if(fields[i].label.toUpperCase() == 'ALTERNATEEMAIL' && !email_expr.test(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+email_msg);
                    fld.focus();
                    return(false);
                }
     case 6: // CDT_MEMO
				if(fld.value == null)
				break;
                //only happens for CDT_MEMO anyway
                if ((fields[i].type == 6) && fields[i].maxlen && (fields[i].maxlen < utf8_len(fld.value)))
                {
                    var extra;
                    var rough_mbcs = parseInt(utf8_len(fld.value) / (fld.value.length));
                    if(utf8_len(fld.value) % (fld.value.length) != 0)
                        rough_mbcs++;
                    str = oversz_msg.replace(strtok_exp, fields[i].label);
                    str = str.replace(numtok_exp, parseInt(fields[i].maxlen/rough_mbcs));
                    extra = parseInt((utf8_len(fld.value) - fields[i].maxlen)/rough_mbcs);
                    if((utf8_len(fld.value) - fields[i].maxlen) % (rough_mbcs) != 0)
                        extra++;
                    str = str.replace(numtok_exp, extra);

                    alert(str);
                    fld.focus();
                    return(false);
                }

                //only if not a CDT_INT
                if (fields[i].type != 3)
                    fld.value = fld.value.replace(ws_exp, '');

                //if required and not set
                if ((fields[i].flags & 1) && (fld.value.length == 0))
                {
                    alert('\''+fields[i].label+'\' '+reqd_msg);
                    fld.focus();
                    return(false);
                }

                // if not required and not set, don't do checks
                if ((fld.value.length == 0))
                    break;

                if ((fields[i].flags & 2) && !valid_ascii.test(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+ascii_msg);
                    fld.focus();
                    return(false);
                }

                if ((fields[i].flags & 4) && !email_expr.test(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+email_msg);
                    fld.focus();
                    return(false);
                }

                if ((fields[i].flags & 0x10) && !is_furigana_string(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+furigana_msg);
                    fld.focus();
                    return(false);
                }
                
                if (fields[i].flags & 0x20 && no_html.test(fld.value))
                {
                    alert('\''+fields[i].label+'\' '+ no_html_msg);
                    fld.focus();
                    return(false);
                }
                
                break;


            case 4: // CDT_DATETIME
            case 7: // CDT_DATE
                fld = new Array();

                fld[0] = eval('document.'+form_name+'.'+fields[i].name+dt_sfx[0]);
                fld[1] = eval('document.'+form_name+'.'+fields[i].name+dt_sfx[1]);
                fld[2] = eval('document.'+form_name+'.'+fields[i].name+dt_sfx[2]);

                //if any of the above three elements have a style of none, then
                //we need to use the new widget logic
                if (fld[0].type != "hidden")
                {
                //do old stuff
                if (fields[i].type == 4)
                {
                    fld[3] = eval('document.'+form_name+'.'+fields[i].name+'_hr');
                    fld[4] = eval('document.'+form_name+'.'+fields[i].name+'_min');
                }
                if (fld[0].value == '1' && fld[1].value == '1' && fld[2].value == '1970')
                {
                     alert('Due to TimeZone issues 1/1/1970 is not a valid date. \n Please reenter a more recent date. (e.g. 1/2/1970)');
                     fld[1].value = '2';
                     fld[0].focus();
                     return(false);
                }
                if (!(fields[i].flags & 1))  // not required
                {
                    for (j = numSet = 0; j < fld.length; j++)
                        numSet += (fld[j].selectedIndex > 0) ? 1 : 0;

                    if ((numSet > 0) && (numSet != fld.length))
                    {
                        // field is only partially filled out
                        alert('\''+fields[i].label+'\' '+not_complete_msg);
                        fld[0].focus();
                        return(false);
                    }

                    break;
                }

                for (j = 0; j < fld.length; j++)
                    if ((fld[j].selectedIndex < 1))
                    {
                        alert('\''+fields[i].label+' ('+dt_lbl[j]+')\' '+reqd_msg);
                        fld[j].focus();
                        return(false);
                    }

                break;
                }   //end if
                else
                {
                    //the old code just verifies that if the field is not required and one of the dropdowns is set, they should all be set
                    //then if it is required, it verifies that all the dropdowns are set.
                    //new code would verify that the textbox containing the date parsed to a date first 
                    //if it were a date_time, it would also do the old code stuff for the hours and minutes
                    //we are dealing with a text input and possibly some dropdowns
                    fld = new Array();
                    tempFld = eval('document.'+form_name+'.'+fields[i].name+'_mon');    //hidden input
                    //this is passed in through util.phph on the month hidden drop down
                    //perhaps something better can be done in trunk
                    fld[0] = document.getElementById(tempFld.correspondingTextInput)   //textbox

                    //add the date order to fld[0] to aid in validation
                    if(typeof(date_order) != "undefined")
                        fld[0].date_order = date_order;
                    else
                        fld[0].date_order = 0;  //default to american

                    if(typeof(date_max_year) != "undefined")
                        fld[0].date_max_year = date_max_year;
                    else
                        date_max_year = 2010;   //default to 2010

                    fld[1] = eval('document.'+form_name+'.'+fields[i].name+'_hr');
                    fld[2] = eval('document.'+form_name+'.'+fields[i].name+'_min');

                    var calObject = fld[0].correspondingCalendarObject;
                    monthPos = calObject.cfg.getProperty("MDY_MONTH_POSITION");
                    datePos = calObject.cfg.getProperty("MDY_DAY_POSITION");
                    yearPos = calObject.cfg.getProperty("MDY_YEAR_POSITION");
                    var tempArray = new Array();
                    tempArray[monthPos] = mm_abbreviation;
                    tempArray[datePos] = dd_abbreviation;
                    tempArray[yearPos] = yyyy_abbreviation;
                    var date_format_str = tempArray[1] + "/" + tempArray[2] + "/" + tempArray[3];
                    
                    //first check to see if the text field is a valid date
                    //returns false if it's not valid, else it returns the date parsed
                    if (!isTextPartValidDate(fld[0]) && fld[0].value != "")
                    {
                    	     if(fld[0].value == '1/1/1970' || fld[0].value == '01/01/1970' )
                           {
                              alert('Due to TimeZone issues 1/1/1970 is not a valid date. \n Please reenter a more recent date. (e.g. 1/2/1970)');
                              fld[0].value = '1/2/1970';
                           }
                           else
                           {
                            //text input is not valid
                            alert('\''+fields[i].label+'\' '+invalid_date_format_msg + ' ' + date_format_str + '\n'
                                    + min_year_msg + ' ' + '1970\n'
                                    + max_year_msg + ' ' + date_max_year);
                           }
                            //reset for next try
                            fld[0].focus();
                            return(false);
                    }
                    if (!(fields[i].flags & 1))  // not required
                    {
                        //if it's not required, then check to see if it is fully specified
                        //and not empty
                        //this function returns true or the 0 based index of the parameter that failed
                        var result = isDateOrTimeFullySpecified(fld[0], fld[1], fld[2]);
                        if(result !== true && !isDateOrTimeEmpty(fld[0], fld[1], fld[2]))
                        {
                            // field is only partially filled out
                            alert('\''+fields[i].label+'\' '+not_complete_msg);
                            fld[result].focus();
                            return(false);
                        }
                    }
                    else
                    {
                        //if it's required, then check first to see if it's fully specified and not empty 
                        //this function returns true or the 0 based index of the parameter that failed
                        var result = isDateOrTimeFullySpecified(fld[0], fld[1], fld[2]);
                        if(result !== true && isDateOrTimeEmpty(fld[0],fld[1],fld[2]))
                        {
                            //field is required and not fully specified and empty
                            alert('\''+fields[i].label+'\' '+reqd_msg);
                            fld[result].focus();
                            return(false);
                        }
                        else if(result !== true)
                        {
                            // field is only partially filled out and required
                            alert('\''+fields[i].label+'\' '+not_complete_msg);
                            fld[result].focus();
                            return(false);
                        }
                    }//end else
                    break; 
                }//end else
        }
    }

    return(true);
}
//returns true if the date or dttm widget is empty
function isDateOrTimeEmpty(textPart, hrPart, minPart)
{
    var textPartEmpty = textPart.value == "";
    var hrPartEmpty = typeof(hrPart) == "undefined" || hrPart.selectedIndex == 0;
    var minPartEmpty = typeof(minPart) == "undefined" || minPart.selectedIndex == 0;
    return textPartEmpty && hrPartEmpty && minPartEmpty;
}
//returns ture if the textPart can be parsed into a javascript Date object
//this provides the bulk of the validation for the textbox
//returns false if it is not valid, and the date we parsed if it is valid
//this is called onsubmit as you can see in this file, and 
//onchange when the textbox gets hand written, and when we show 
//the calendar (click on textbox) to decide the pagedate and selected config properties of the calendar
//param: textPart is a dom object (<input type = "text"...)
function isTextPartValidDate(textPart)
{
    var monthPos, datePos, yearPos;
    var d;
    var ret = false;
    
    var calObject = textPart.correspondingCalendarObject;
    monthPos = calObject.cfg.getProperty("MDY_MONTH_POSITION");
    datePos = calObject.cfg.getProperty("MDY_DAY_POSITION");
    yearPos = calObject.cfg.getProperty("MDY_YEAR_POSITION");

    d = new Date(textPart.value);
    var didDateParse = !isNaN(d) && typeof(d) != "undefined";
    if(didDateParse)
    {
        //if javascripts Date.parse couldn't make heads or tails of it, we won't be able to.
        //but if it does, we have to use regular expressions to verify, but at least 
        //we know we have something resembling a date
        //you can't always trust Date.parse (called automatically on the string arg to Date constructor)
        //for example 10/45/2007 gets parsed to 11/14/2007
        //allow leading and trailing spaces
        var re = /(\s*\d+)\/(\d+)\/(\d+\s*)/;
        var r;
        var s = textPart.value;
        r = s.match(re);
        //make sure we got something
        if(r != null)
        {
            //convert to ints
            for(var i = 1; i < 4; i++)
                r[i] = parseInt(r[i]);
                
            var tempString = r[monthPos] + "/" + r[datePos] + "/" + r[yearPos];
            d = new Date(tempString);
            //this tests to make sure that the Date.parse method isn't 
            //rolling months and years over automatically when given some strange date like 10/45/2007
            if(r[monthPos] == d.getMonth() + 1 && r[datePos] == d.getDate() && r[yearPos] == d.getFullYear())
            {
                //make sure that the date entered respects EU_MAX_YEAR and min date (oob = out of bounds)
                if(!textPart.correspondingCalendarObject.isDateOOB(d)) 
                    ret = d;
            }//end if things are in synch
        }//end if r!= null
    }//end if didDateParse
    return ret;
}
//returns true if fully specified
//else returns a 0, 1, or a 2 based on which parameter is incomplete
function isDateOrTimeFullySpecified(textPart, hrPart, minPart)
{
    var textPartValid = false;
    var hrPartValid = false;
    var minPartValid = false;
    var ret = false;
    if(isTextPartValidDate(textPart))
        textPartValid = true;
        
    if(typeof(hrPart) == "undefined" || typeof(minPart) == "undefined")
    {
        hrPart = new Object();
        minPart = new Object();
        hrPart.selectedIndex = 1;
        minPart.selectedIndex = 1;
    }
    if(hrPart.selectedIndex > 0)
        hrPartValid = true;
    if(minPart.selectedIndex > 0)
        minPartValid = true;
    
    ret = textPartValid && hrPartValid && minPartValid;
    if(ret)
        return ret;
    else if(!textPartValid)
        return 0;
    else if(!hrPartValid)
        return 1;
    else
        return 2;
}

// ----------------------------------------------------------------------------

function _validate_acctinfo(userid, passwd1, passwd2, min_passwd_len, msgs)
{
    var msg = -1, fld;

    if (userid.value.indexOf(' ') != -1)
         msg = 0, fld = userid;

    if (userid.value.indexOf('\"') != -1)
         msg = 1, fld = userid;

    if (passwd1 && (passwd1.value != passwd2.value))
         msg = 2, fld = passwd1;

    if (passwd1 && (passwd1.value.length < min_passwd_len))
        msg = 3, fld = passwd1;

    if (msg != -1)
    {
        alert(msgs[msg]);
        fld.focus();
        fld.select();
        return(false);
    }

    return(true);
}

// ----------------------------------------------------------------------------

var cursor_set = false;

function _set_cursor()
{
    var i, j;

    if (cursor_set)
        return;

    cursor_set = true;

    if (document.location.href.indexOf('#') > -1)
        return;

    for (i = 0; i < document.forms.length; i++)
        for (j = 0; j < document.forms[i].length; j++)
           with (document.forms[i])
               if (elements[j].type && ((elements[j].type == 'text') || (elements[j].type == 'textarea'))
                   && !elements[j].disabled)
               {
                   elements[j].focus();
                   if (elements[j].value.length)
                       elements[j].select();
                   return;
               }
}

// ----------------------------------------------------------------------------
 
function check_mask(mask_fld)
{
    var i, ln, js_msg = '';
    var val = '', code = '', echar = '', fchar = '';

    inside_check_mask = 1;

// QA #080424-000045 We no longer put the mask inside the field as a prompt,
//                   and following this conditional allows the user to enter
//                   the mask as the contents of the mask, which causes problems.
//     if (mask_fld.value == eval(mask_fld.name+'_dmask'))
//     {
//         inside_check_mask = 0;
//         return;
//     }

    if (eval(mask_fld.name + '_emask.length') < mask_fld.value.length)
        js_msg = fld_data.fld_too_mny_chars_msg;
    else        
        for (i = 0, ln = eval(mask_fld.name + '_emask.length'); i < ln; i++)
        {

            val = mask_fld.value.charAt(i);
            code = mask_fld.value.charCodeAt(i);
            echar = eval(mask_fld.name + '_emask.charAt(i)');
            fchar = eval(mask_fld.name + '_fstr.charAt(i)');

            if (fchar == 'F' && val != echar)
            {
                if (val == ' ')
                    js_msg = fld_data.must_cont_valid_format_char_msg;
                else
                    js_msg = val + ' ' + fld_data.not_valid_format_char_msg;
                break;
            }    
            else if ((echar == '#') &&
                (!((code >= 48) && (code <= 57))))
            {
                if (val == '')
                    js_msg = fld_data.must_cont_valid_num_msg;
                else
                    js_msg = val + ' ' + fld_data.not_valid_num_msg;
                break;
            }
            else if ((echar == 'A') &&
                    (!(((code >= 48) && (code <= 57)) || 
                      ((code >= 65) && (code <= 90)) ||
                      ((code >= 97) && (code <= 122)))))
            {
                if (val == '')
                    js_msg = fld_data.must_cont_valid_alphanum_msg;
                else            
                    js_msg = val + ' ' + fld_data.not_valid_alphanum_msg;
                break;
            }
            else if ((echar == 'L') &&
                    (!(((code >= 65) && (code <= 90)) || 
                      ((code >= 97) && (code <= 122)))))
            {
                if (val == '')
                    js_msg = fld_data.must_cont_valid_letter_msg;
                else
                    js_msg = val + ' ' + fld_data.not_valid_letter_msg;
                break;
            }
            else if ((echar == 'C') &&
                    (!(((code >= 32) && (code <= 126)) || 
                     ((code >= 128) && (code <= 255)))))
            {
                if (val == '')
                    js_msg = fld_data.must_cont_valid_char_msg;
                else
                    js_msg = val + ' ' + fld_data.not_valid_char_msg;
                break;
            }
            
            // ensure letters are propper case
            if (echar == 'L')
            {
                if (fchar == 'U')
                {
                    mask_fld.value = mask_fld.value.substring(0, i) +
                                     mask_fld.value.charAt(i).toUpperCase() +
                                     mask_fld.value.substring(i + 1);
                }
                else if (fchar == 'L')
                {
                    mask_fld.value = mask_fld.value.substring(0, i) +
                                     mask_fld.value.charAt(i).toLowerCase() +
                                     mask_fld.value.substring(i + 1);
                }
            }
        }
    
    if (js_msg)
    {
        alert(js_msg + ' ' + fld_data.corr_fmt_is_msg + ' ' + eval(mask_fld.name+'_dmask')+ '.');
        mask_fld.focus();
        inside_check_mask = 0;
        return(false);
    }
    inside_check_mask = 0;
    return(true);
}

// ----------------------------------------------------------------------------

function put_mask(mask_fld, val, formelm, nn)
{
    var mtmp = '', ftmp = '', dtmp = '';
    var i, sl;   

    for (i = 0, sl = val.length; i < sl; i++)
    {
        ftmp += val.charAt(i);

        if (val.charAt(i) == 'F')
            dtmp += val.charAt(i+1);
        else
            dtmp += (val.charAt(i+1) == '#') ? '#' : '@';

        mtmp += val.charAt(++i);

    }
    if (!nn)  
        eval("document.getElementById('"+mask_fld+"_mask').innerHTML='"+dtmp+"'");

    eval(mask_fld + '_fstr = ftmp');
    eval(mask_fld + '_emask = mtmp');
    eval(mask_fld + '_dmask = dtmp');

}

// ----------------------------------------------------------------------------

function answer_window_preview(ansid, created)
{
    var agt=navigator.userAgent.toLowerCase();
    var is_major = parseInt(navigator.appVersion);
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
        && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
        && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var query_str = location.search.substring(1);
    var pairs = query_str.split('&');
    var args = new Object( );
    var pos = 0;
    var argname = '';
    var value = '';
    var i = 0;
    var popup_args = "";

    for (i = 0; i < pairs.length; i++)
    {
        pos = pairs[i].indexOf('=');
        if (pos == -1)
            continue;
        argname = pairs[i].substring(0, pos);
        value = pairs[i].substring(pos + 1);
        args[argname] = unescape( value );
    } // end for i loop

    // Check browser version numbers.
    // Netscape version 6+ uses is_major == 5, previous versions < 5
    if(is_nav && (is_major < 5))
    {
        h_size = top.innerWidth;
        v_size = top.innerHeight;
    }
    // Netscape version 6+
    else if(is_nav && (is_major < 7))
    {
        h_size = document.body.offsetWidth;
        v_size = document.body.offsetHeight;
    }
    // All others (including IE)
    else
    {
        h_size = document.body.clientWidth;
        v_size = document.body.clientHeight;
    }

    h_size -= 20;
    v_size = Math.floor(v_size * 0.8);

    if (v_size < 200)
        v_size = 200;

    //calculate popup_args
    if(args.p_sid != undefined)
        popup_args += "&p_sid=" + args.p_sid;
    if(args.p_lva != undefined)
        popup_args += "&p_lva=" + args.p_lva;
    if(args.p_li != undefined)
        popup_args += "&p_li=" + args.p_li;
    if(args.p_redirect != undefined)
        popup_args += "&p_redirect=" + args.p_redirect;
    if(args.p_sp != undefined)
        popup_args += "&p_sp=" + args.p_sp;
    window.open('popup_adp.php?p_faqid=' + ansid + '&p_created=' + created + popup_args, 'suggested_answer',
                'scrollbars,resizable,toolbar,menubar,width=' + h_size +
                ',height=' + v_size);
}

// ----------------------------------------------------------------------------
function check_valid_ascii(fld, valid_ascii_msg)
{
    var valid_ascii = new RegExp("^[\x0a\x0d\x20-\x7e]+$");
    if (fld.value.length > 0 && valid_ascii.test(fld.value) == false)
    {
        alert(valid_ascii_msg);
        fld.focus();
    }
}
