/**
 * Based on a condition, either show or hide element From:
 * http://old.nabble.com/show-hide-toggle:-suggestion-to-reduce-show-hide-code-td20554124s27240.html
 */
$.fn.extend({
    showIf: function(fn) {
        var result;
        switch (typeof fn) {
            case 'function':
                result = fn.call(this);
                break;
            default:
                result = fn;
        }
        if (result) {
            $(this).show();
        } else {
            $(this).hide();
        }
        return $(this);
    }
});

/**
 * Form text box hints.
 */
(function($) {
    $.fn.sethint = function(options) {
        return $(this).filter(':text,textarea').each(function() {
            $(this).focus(function() {
                if ($(this).val() == options.hint) {
                    if (options.classname != undefined) {
                        $(this).removeClass(options.classname)
                    }
                    $(this).val('');
                }
            }).blur(function() {

                if ($(this).val() == '') {
                    if (options.classname != undefined) {
                        $(this).addClass(options.classname)
                    }
                    $(this).val(options.hint);
                }
            }).blur();
        });
    };
    $.fn.hidehint = function(options) {
        return $(this).filter(':text,textarea').each(function() {

            if ($(this).val() == options.hint) {
                $(this).val('');
            }

        });
    };
})(jQuery);

$.fn.labelOver = function(overClass) {
	return this.each(function(){
		var label = jQuery(this);
		var f = label.attr('for');
		if (f) {
			var input = jQuery('#' + f);

			this.hide = function() {
			  label.css({ textIndent: -10000 })
			}

			this.show = function() {
			  if (input.val() == '') label.css({ textIndent: 0 })
			}

			// handlers
			input.focus(this.hide);
			input.blur(this.show);
		    label.addClass(overClass).click(function(){ input.focus() });

			if (input.val() != '') this.hide();
		}
	})
}

$.fn.bindFirst = function(name, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.bind(name, fn);

    // Thanks to a comment by @Martin, adding support for
    // namespaced events too.
    var handlers = this.data('events')[name.split('.')[0]];
    // take out the handler we just inserted from the end
    var handler = handlers.pop();
    // move it at the beginning
    handlers.splice(0, 0, handler);
};

(function($){

	/**
	 * Function for setting offset, created here so it's only created once rather than
	 * creating an anonymous function every time offset is called
	 */
	function setOffset(el, newOffset){
		var $el = $(el);

		// get the current css position of the element
		var cssPosition = $el.css('position');

		// whether or not element is hidden
		var hidden = false;

		// if element was hidden, show it
		if($el.css('display') == 'none'){
			hidden = true;
			$el.show();
		}

		// get the current offset of the element
		var curOffset = $el.offset();

		// if there is no current jQuery offset, give up
		if(!curOffset){
			// if element was hidden, hide it again
			if(hidden)
				$el.hide();
			return;
		}

		// set position to relative if it's static
		if (cssPosition == 'static') {
			$el.css('position', 'relative');
			cssPosition = 'relative';
		}

		// get current 'left' and 'top' values from css
		// this is not necessarily the same as the jQuery offset
		var delta = {
			left : parseInt($el.css('left'), 10),
			top: parseInt($el.css('top'), 10)
		};

		// if the css left or top are 'auto', they aren't numbers
		if (isNaN(delta.left)){
			delta.left = (cssPosition == 'relative') ? 0 : el.offsetLeft;
		}
		if (isNaN(delta.top)){
			delta.top = (cssPosition == 'relative') ? 0 : el.offsetTop;
		}

		if (newOffset.left || 0 === newOffset.left){
			$el.css('left', newOffset.left - curOffset.left + delta.left + 'px');
		}
		if (newOffset.top || 0 === newOffset.top){
			$el.css('top', newOffset.top - curOffset.top + delta.top + 'px');
		}

		// if element was hidden, hide it again
		if(hidden)
			$el.hide();
	}

	$.fn.extend({

		/**
		 * Store the original version of offset(), so that we don't lose it
		 */
		_offset : $.fn.offset,

		/**
		 * Set or get the specific left and top position of the matched
		 * elements, relative the the browser window by calling setXY
		 * @param {Object} newOffset
		 */
		offset : function(newOffset){
			return !newOffset ? this._offset() : this.each(function(){
				setOffset(this, newOffset);
			});
		}
	});

})($);

/**
 * Mock the console.log methid, if not defined (when firebug is not enabled,
 * etc..)
 */
if (! window.console) {
    window.console = {
        log: function() {}
    };
}

if (!JobGo) {
    var JobGo = {};
}

$(document).ready(function(){
    JobGo.Notice.getContainer().delay(5000).fadeOut(5000);
});

JobGo.attachmentRemoveHandler = function() {
    var removedFile = this;
    $(removedFile.parentNode.parentNode).remove();
    $.getJSON('/file/remove/id/'+this.id, function(data)
    {
        if (data.count)
        {
            if(data.count != 'undefined')
            {
                if (typeof(swfu) != 'undefined') {
                    swfu.setFileUploadLimit(10 - data.count);
                }

                totalUploadNum = data.count;
                $('#attachments .header-center').text("Attachments (" + totalUploadNum + ")");
                $('#attachmentContent div.progressWrapper:visible ').each(function (i){
                    var className = "progressWrapper";
                    className += (i % 2)?' odd':' even';
                    this.className = className;
                });
            }
        }
    });
    return false;
}

JobGo.isNewWindow = function() {
    if ($.browser.mozilla) {
        return history.length == 0;
    }
    return history.length == 1;
};

JobGo.Template = {
    Cities: {
        suggested:'<div>%3, <span>%2, %1</span></div>',
        selected:'%3, %2, %1'
    },
    Regions: {
        suggested:'<div>%2, <span>%1</span></div>',
        selected:'%2, %1'
    },
    Countries: {
        suggested:'<div>%1</div>',
        selected:'%1'
    },
    HIDDEN: {
        suggested:'<div>%0</div>',
        selected:'%0'
    }
}
JobGo.Notice = {
    types: {
        WARNING: 'warningMessage',
        ERROR: 'errorMessage',
        NOTICE: 'noticeMessage'
    },
    getContainer: function() {
        return $('.systemMessage');
    },
    display: function(msg, type) {
        var container =  this.getContainer();
        for (var t in this.types) {
            container.removeClass(this.types[t]);
        }
        container.removeClass('hidden').show().addClass(this.types[type]).find('.messageBody').html(msg);
        container.fadeOut(5000);
    },
    setNotice: function(msg) {
        this.display(msg, 'NOTICE');
    },
    setError: function(msg) {
        this.display(msg, 'ERROR');
    },
    setWarning: function(msg) {
        this.display(msg, 'WARNING');
    }
}

JobGo.Nav = {
    backUrl: '',
    currentUrl: '',
    init: function(currentUrl, backUrl) {
        JobGo.Nav.backUrl = backUrl;
        JobGo.Nav.currentUrl = currentUrl;
    },
    getCurrentUrl: function() {
        return JobGo.Nav.currentUrl;
    },
    getBackUrl: function() {
        return JobGo.Nav.backUrl;
    },
    goToUrl: function(url) {
        document.location.href = url;
        return false;
    },
    goBack: function() {
        return JobGo.Nav.goToUrl(JobGo.Nav.getBackUrl());
    },
    reload: function() {
        JobGo.Nav.goToUrl(document.location.href);
    }
}

JobGo.Image = {
    FOR_PERSON_HUGE: 'p110',
    FOR_PERSON_BIG: 'p80',
    FOR_PERSON_MEDIUM: 'p40',
    FOR_PERSON_SMALL: 'p27',
    FOR_JOB_HUGE: 'j166',
    FOR_JOB_BIG: 'j110',
    FOR_JOB_MEDIUM: 'j80',
    FOR_JOB_WIDGET: 'j60',
    FOR_JOB_SMALL: 'j40',
    FOR_COMPANY_HUGE: 'c166',
    FOR_COMPANY_BIG: 'c110',
    FOR_COMPANY_MEDIUM: 'c80',
    FOR_COMPANY_WIDGET: 'c60',
    FOR_COMPANY_SMALL: 'c40',

    FOR_COMPANY_CSS: 'cCss',

    FOR_HAPPENING_HUGE: 'h166',
    FOR_HAPPENING_BIG: 'h110',
    FOR_HAPPENING_MEDIUM: 'h80',
    FOR_HAPPENING_WIDGET: 'h60',
    FOR_HAPPENING_SMALL: 'h40',



    staticUrl: '',
    init: function(staticUrl) {
        JobGo.Image.staticUrl = staticUrl;

        this.Model_Db_Company = this.Model_Db_CompanyVerified = this.FOR_COMPANY_BIG;
        this.Model_Db_Person = this.FOR_PERSON_HUGE;
        this.Model_Db_Job = this.FOR_JOB_BIG;
        this.Model_Db_MessagetypeJobApplication = this.FOR_PERSON_HUGE;
        this.Model_Db_Happening = this.FOR_HAPPENING_BIG;
    },
    getUrlByFilename: function(pictureFile, forWhat) {
        if (!pictureFile) return JobGo.Image.getNoImageUrl(forWhat);

        return JobGo.Image.staticUrl + forWhat + '/' + pictureFile;
    },
    getNoImageUrl: function(forWhat)
    {
        switch (forWhat) {
            case this.FOR_PERSON_HUGE:
            case this.FOR_PERSON_BIG:
            case this.FOR_PERSON_MEDIUM:
            case this.FOR_PERSON_SMALL:
                return this.getMaleUrl(forWhat);
        }
        return "/images/noimage/" + forWhat + ".png";
    },
    getFemaleUrl: function(forWhat)
    {
        return "/images/noimage/female_" + forWhat + ".png";
    },
    getMaleUrl: function(forWhat)
    {
        return "/images/noimage/male_" + forWhat + ".png";
    }
}

JobGo.Multiplier = function (original, modifiers, attributes) {
    this.ATTR_MULTIPLIER = 'JobGo.Multiplier';
    this.ATTR_INDEX      = 'JobGo.Multiplier.Index';

    // Additional attributes
    this.attributes = (!attributes) ? {} : attributes;
    // Modifiers to call after cloning
    this.modifiers = (!modifiers) ? JobGo.Multiplier.defaultModifiers: modifiers;

    // This is what we clone
    this.original = $(original).clone(true);

    // this.original.css('display', 'none');
    this.rules = this.getRules($(original));

    // this.original.appendTo($(original).closest('form'));

    this.original.removeClass(JobGo.Multiplier.CLASS_PRERENDERED);
    JobGo.Multiplier.modifiers.clearValues(this.original, this);


    // this.copyRules(this.original);

    this.clones = {};
    this.cloneCnt = 0;
    // Initialize sequence
    this.init();

    var me = this;
    $('#' + me.attributes.id + '-' + me.attributes.buttons.clone.id).click(function(){
        me.doAppend();
    });
}
$.extend(JobGo.Multiplier, {
    CLASS_PRERENDERED: 'JobGoMultiplier-PreRendered',
    CLASS_CLONE: 'JobGoMultiplier-Clone',
    CLASS_DELETED: 'JobGoMultiplier-Deleted',
    CLASS_BTN_REMOVE: 'JobGoMultiplier-BtnRemove',
    CLASS_REMOVEAREA: 'JobGoMultiplier-AreaRemove',
    CLASS_HASMULTIPLYME: 'JobGoMultiplier-MultiplyMe',

    PLACEHOLDER_PREFIX: '__MULTIPLIER__',
    PLACEHOLDER_SUFIX: '__',

    EVENT_MULTIPLYME: 'jobGoMultiplyMe',



    _indexAttribute: function(attribute) {
        return function (clone, multiplier) {
            var multiplierIndex = multiplier.getIndex();
            clone.each(function (index, c) {
                c = $(c);
                var val = c.attr(attribute);
                if (val && -1 != val.indexOf('__MULTIPLIER__index__')) {
                    c.attr(attribute, val.replace(/__MULTIPLIER__index__/g, multiplierIndex));
                }
                c.find('['+ attribute +']').each(function (i, c) {

                    c = $(c);
                    var val = c.attr(attribute);

                    if (-1 != val.indexOf('__MULTIPLIER__index__')) {
                        c.attr(attribute, val.replace(/__MULTIPLIER__index__/g, multiplierIndex));
                    }
                });
            });
        }
    }
});
$.extend(JobGo.Multiplier, {
    instances: {},
    modifiers: {
        // Add index to "id" attributes
        indexId: JobGo.Multiplier._indexAttribute('id'),
        // Add index to "for" attributes
        indexFor: JobGo.Multiplier._indexAttribute('for'),
        // Add remove button
        addRemoveButton: function(clone, multiplier) {
            var btn = clone.find('.BtnMultiplierRemove');
            if (!btn.length) {
                var btn = $('<a>');
                btn.html(multiplier.attributes.buttons.remove.value);
                btn.attr('class', 'BtnMultiplierRemove');
            }
            clone.btnRemove = btn;
            var cloneCnt = multiplier.cloneCnt;
            btn.unbind('click').click(function(){
                multiplier.remove(cloneCnt);
            });

            var remove = clone.find('.MultiplierRemoveArea');

            if (!remove.length) {
                var remove = $('<div>').attr('class', 'MultiplierRemoveArea');
                remove.appendTo(clone.get(clone.length-1));
            }

            clone.areaRemove = remove;

            remove.append(btn);


        },
        // Clear form input values
        clearValues: function (clone, multiplier) {
            if (clone.hasClass(JobGo.Multiplier.CLASS_PRERENDERED)) {
                return;
            }
            clone.each(function (index, c) {
                c = $(c);
                c.find(':radio,:checkbox').each(function(i, e) {
                    $(e).attr('checked', '');
                });
                c.find('option').each(function(i, e) {
                    $(e).attr('selected', '');
                });
                c.find('input[type=text],input[type=hidden],textarea').each(function(i, e) {
                    $(e).val('');
                });
                c.find('select').each(function(){
                    $(this).data('JobGo.Multiplier.Cleared', 1);
                });
            });
        },
        // Call the multiplyMe event handler
        riseMultiplyMe: function (clone, multiplier) {
            clone.each(function (index, c) {
                $(c).find("." + JobGo.Multiplier.CLASS_HASMULTIPLYME).each(function (index, mMe) {
                    $(mMe).trigger(JobGo.Multiplier.EVENT_MULTIPLYME, [multiplier, clone, index]);
                });
            });
        },
        // Increment array indexes in elements with names like
        // name="breakfast[0][egg]" => name="breakfast[1][egg]"
        incrementNameArrayIndex: function(clone, multiplier){
            var multiplierIndex = multiplier.getIndex();
            if (multiplierIndex == 0) {
               // return;
            }
            clone.each(function(index, c){
                $(c).find('[name]').filter(':not(.Skip_incrementNameArrayIndex)').each(function(index, e){
                    e = $(e);
                    // Increment only the last [x] occurrence.
                    e.attr('name', e.attr('name').replace(/\[\d+\](?!.*\[\d+\])/g, '[' + multiplierIndex + ']', 'g'))
                });
            })
        }
    },
    addInstance: function(instance) {
        JobGo.Multiplier.instances[instance.original.selector] = instance;
    },
    getInstance: function(selector){
        return JobGo.Multiplier.instances[selector];
    },
    prototype: {
        init: function() {
            var attributes = this.attributes;
            this.setMultiplier();
            function gd(k, d)
            {
                if (attributes[k]) {
                    return attributes[k];
                }
                return d;
            }
            this.setIndex(gd('index', 0));


        },
        doAppend: function() {
            this.append(this.attributes.target);
        },

        getRules: function(element) {
            var rules = [];
            element.find(':input').each(function(i,e){
                rules.push($.validator.staticRules($(e)[0]));
            });
            return rules;
        },
        copyRules: function(clone) {
            var rules = this.rules;
            clone.find(':input').each(function(i, e) {
                $(e).rules('add', rules[i]);
            });
        },
        isMultiplier: function() {
            if (this.original.attr(this.ATTR_MULTIPLIER)) {
                return true;
            }
            return false;
        },
        setMultiplier: function() {
            if (this.isMultiplier()) {
                return;
            }
            this.original.attr(this.ATTR_MULTIPLIER, true);
            this.setIndex(0);
            return this;
        },
        getIndex: function() {
           

            return parseInt(this.original.attr(this.ATTR_INDEX));
        },
        setIndex: function(index) {
            this.original.attr(this.ATTR_INDEX, index);
            return this;
        },
        clone: function(copy) {
            if (!copy) {
                var copy = this.original.clone(true);
                $(copy).removeClass(JobGo.Multiplier.CLASS_PRERENDERED);
            }
            return this.makeClone(copy);
        },
        makeAndAddClone: function(selector) {
            var me = this;

            $(selector).each(function(i, e) {
                me.addClone(me.makeClone($(e)));
            });
            return this;
        },
        makeClone: function(selector) {
            var me = this;
            selector = $(selector);
            $.each(me.modifiers, function(index, func) {
                func(selector, me, me.getIndex());
            });
            return selector;
        },
        addClone: function(clone) {
            this.clones[this.cloneCnt] = clone;
            this.cloneCnt += 1;

            this.setIndex(this.getIndex() + 1);
            return this;
        },
        append: function(container, clone) {
            clone = this.clone(clone).appendTo($(container)).css('display', 'block');
            this.addClone(
                clone
            );
            this.copyRules(clone);
            return this;
        },
        prepend: function(container, clone) {
            this.addClone(
                this.clone(clone).prependTo($(container)).css('display', 'block')
            );
            return this;
        },
        get: function(index) {
            return this.clones[index];
        },
        remove: function(index) {
            var clone = this.clones[index];
            clone.find('.MultiplierItemIsDeleted').val(1);
            clone.find('input,radio,textarea,select').each(function(i,e){
                $(e).rules('remove');
            });
            clone.css('display', 'none');
            delete this.clones[index];
            return this;
        }
    }
});
$.extend(JobGo.Multiplier, {
    defaultModifiers: [
        JobGo.Multiplier.modifiers.indexId,
        JobGo.Multiplier.modifiers.indexFor,
        JobGo.Multiplier.modifiers.addRemoveButton,
        JobGo.Multiplier.modifiers.clearValues,
        JobGo.Multiplier.modifiers.incrementNameArrayIndex,
        JobGo.Multiplier.modifiers.riseMultiplyMe

    ]
});

JobGo.addSlashes = function(str)
{
    var res = str.replace(/\\/g,'\\\\');
    res = res.replace(/\'/g,'\\\'');
    res = res.replace(/\"/g,'\\"');
    res = res.replace(/\0/g,'\\0');
    return res;
}
JobGo.stripSlashes = function(str)
{
    var res = str.replace(/\\'/g,'\'');
    res = res.replace(/\\"/g,'"');
    res = res.replace(/\\0/g,'\0');
    res = res.replace(/\\\\/g,'\\');
    return res;
}

JobGo.Validator = {
    Element: {
        getType: function(element) {
            element = $(element);
            if (element.closest('.multiSelectOptions').length) {
                return 'MultiSelect';
            }
            return element.attr('type');
        },
        MultiSelect: {
            getId: function(element) {
                return $(element).closest('.multiSelectOptions').prev('.multiSelect').attr('id');
            }
        }
    },
    getErrorContainer: function(element) {
        element = $(element);
        // Try to find elements id
        var id = element.attr('id');
        // If it has no id, then maybe it is a special element like MultiSelect.
        // These have a complex html structure and the parent of the element is
        // found using
        // some more complex algorithm.
        if (!id) {
            try {
                id = JobGo.Validator.Element[JobGo.Validator.Element.getType(element)].getId(element);
            } catch(e) {
                id = null;
            }
        }
        if (id) {
            // Display error message in error container.
            var errorContainer = $('#'+ id +'-Errors');
            if (errorContainer.length) {
                return errorContainer;
            }
        }

        var form = element.closest('form');

        var errorContainer = $('#' + form.attr('id') + '-Errors');
        if (errorContainer.length) {
            return errorContainer;
        }

        return null;


    },

    createErrorContainer: function (element) {

        var form = element.closest('form');
        var errorContainer = $('<div class="error FormError">');
        errorContainer.attr('id', form.attr('id') + '-Errors');
        errorContainer.prependTo(form);
        return errorContainer;
    },
    errorPlacement: function(error, element) {

        if (!error) {
            return;
        }

        var errorContainer = JobGo.Validator.getErrorContainer(element);

        if (!errorContainer) {
            //errorContainer = JobGo.Validator.createErrorContainer(element);
            JobGo.Notice.setError(error.html());
            return;
        }
        // If error container not found, append the error message as a fallback
        // to form
        errorContainer.each(function (i, errorContainer){
            errorContainer = $(errorContainer);
            errorContainer.show();

            errorContainer.closest('.ErrorRow').show();
            errorContainer.html(error.html());
        });

    },
    unHighlight: function(element, errorClass) {
        element = $(element);
        // Remove highlight
        element.removeClass(errorClass);
        // Clear error message

        var errorContainer = JobGo.Validator.getErrorContainer(element);

        if (!errorContainer) return;

        JobGo.Validator.getErrorContainer(element).each(function (i, errorContainer){
            errorContainer = $(errorContainer);
            //errorContainer.closest('.ErrorRow').hide();
            //errorContainer.hide();
            errorContainer.html('');
        });
    }
}

JobGo.Form = {
    toggleLogo: function(displayAlternate,
        linkContainer,
        pictureContainer,
        mainPictureUrl,
        alternatePictureUrl
    ) {
        if (displayAlternate) {
            $(pictureContainer).attr('src', alternatePictureUrl);
            $(linkContainer).hide();
            return;
        }

        $(linkContainer).show();
        $(pictureContainer).attr('src', mainPictureUrl);
    },

    Invoices: {
        init: function()
        {
            $('#invoices_search').click(function(evt){
                $(evt.target).closest('form').attr('action', '').submit();
                return false;
            });
        }
    },

    Bonuses: {
        init: function()
        {
            $('#bonuses_search').click(function(evt){
                $(evt.target).closest('form').attr('action', '').submit();
                return false;
            });
        }
    },

    Contracts: {
        init: function()
        {
            $('#contract_create').click(function(evt){
                $(evt.target).closest('form').attr('action', '').submit();
                return false;
            });
        }
    },
    Admin: {
        Country: {
            init: function()
            {
                $('#property_save').click(function(evt){
                    $('#CountryForm').attr('action', '').submit();
                    return false;
                });

                $('#property_cancel').click(function(evt){
                    window.history(-1);
                    return false;
                });
            }
        },
        Property: {
            init: function()
            {
                $('#property_save').click(function(evt){
                    $('#PropertyForm').attr('action', '').submit();
                    return false;
                });

                $('#property_cancel').click(function(evt){
                    window.history(-1);
                    return false;
                });
            }
        },
        Company: {
            init: function()
            {
                $('#property_save').click(function(evt){
                    $('#CompanyForm').attr('action', '').submit();
                    return false;
                });

                $('#property_cancel').click(function(evt){
                    window.history(-1);
                    return false;
                });
            }

        }
    },


    Filters:{
        SetTheseIfEmpty: {
            doFilter: function(element, selector) {

                var container = element.closest('.' + JobGo.Multiplier.CLASS_CLONE);

                if (container.length) {
                    var collection = container.find(selector);
                } else {
                    var collection = $(selector);
                }

                if(element.val() != '') {
                    collection.each(function(i,e){
                        $(e).attr('disabled', false);
                        $(e).trigger('enableMe');
                    });
                    return;
                }
                collection.each(function(i,e){
                    $(e).attr('disabled', true);
                    $(e).trigger('disableMe');
                });
                return;
            },
            filter: function(element, selector) {
                element.addClass(JobGo.Multiplier.CLASS_HASMULTIPLYME).bind(JobGo.Multiplier.EVENT_MULTIPLYME, function(evt, multiplier, clone) {
                    JobGo.Form.Filters.SetTheseIfEmpty.doFilter($(evt.target), selector);
                });
                JobGo.Form.Filters.SetTheseIfEmpty.doFilter(element, selector);
                return;
            },
            getHandler: function(selector) {
                return function(evt){
                    return JobGo.Form.Filters.SetTheseIfEmpty.filter($(evt.target), selector);
                }
            }
        }
    },
    Questionary: {
        Edit: {
            init: function() {
                var me = this;

                $('.QuestionaryQuestionInputType').each(function() {
                    var $this = $(this);
                    me.showHideOptions($this.val(), $this.closest('table').find('.QuestionaryQuestionOptions'));
                    $this.change(function(){
                        var $this = $(this);
                        me.showHideOptions($this.val(), $this.closest('table').find('.QuestionaryQuestionOptions'));
                    });
                });
            },
            showHideOptions: function(inputType, context) {
                if (inputType == '' || inputType == 'Question') {
                    context.closest('tr').hide();
                    return;
                }
                context.closest('tr').show();
                return;
            }
        }
    },
    BillingInformation: {
        init: function(source) {
            $('.BillingInformationUseCompanyInformation').click($.proxy(function(e){this.flipCompanyInfo(e, source)}, this));
        },
        Source: {
            Json: function(companyId) {
                this.companyId = companyId;
            },
            CompanyCreateForm: function(selector) {
                this.form = $(selector);
            }
        },
        
        fetchCompanyInfo: function(source) {
            return source.execute(this);
        },

        setCompanyInfo: function(data)
        {
            if (data.COMPANY) $('#billing_information_company').val(data.COMPANY);
            if (data.ADDRESS) $('#billing_information_address').val(data.ADDRESS);
            if (data.POSTAL) $('#billing_information_postal').val(data.POSTAL);
            if (data.LOCATION_ID) $('#billing_information_location').val(data.LOCATION_ID);
            if (data.LOCATION) $('#billing_information_location_HR').val(data.LOCATION);
            if (data.VAT) $('#billing_information_vat').val(data.VAT);

            this.disableElements();
        },
        flipCompanyInfo: function(e, source) {
            if ($(e.target).attr('checked')) {
                this.useCompanyInfo(source);
                return;
            }
            this.dontUseCompanyInfo();
            return;
        },
        disableElements: function() {
            $('.BillingInformation').find('input').each(function(k, e) {
                var $e = $(e);
                if ($e.val()) {
                    $e.attr('readonly', true).css('background-color', '#d3d3d3');
                }
            });
        },
        enableElements: function () {
            $('.BillingInformation').find('input').each(function () {
                $(this).attr('readonly', false).css('background-color', '#ffffff');
            });
        },
        useCompanyInfo: function(source) {
            this.fetchCompanyInfo(
                source
            );
        },
        dontUseCompanyInfo: function () {
            this.enableElements();
        }
    },
    Permissions: {
        uri: '',
        sendInvitation: function(role, user, id, success) {

            if (!role || !user || !id) {
                return;
            }
            $.post(this.uri,
                {
                    role:role,
                    user:user,
                    id:id
                },
                function (data) {

                    if (data.code == 0) {
                        if (success) {
                            success();
                        }
                    }
                    if (data.message) {
                        if (data.code == 0) {
                            JobGo.Notice.setNotice(data.message);
                        } else {
                            JobGo.Notice.setError(data.message);
                        }
                    }
                }
            )
        },
        MultiplierModifier: function(clone, multiplier, id){

            // Act only if it is the last clone
            if (clone.next().length != 0) return;

            // Remove the remove button from the last clone
            if (clone.btnRemove) {
                clone.btnRemove.hide();
            };

            clone.find('.SendInvitation').click(function(){

                var sendUser = clone.find('.USER').val();

                if (!sendUser) {
                    sendUser = clone.find('.USER_HR').val();
                }



                var sendRole = clone.find('.ROLE').val();
                JobGo.Form.Permissions.sendInvitation(
                    sendRole,
                    sendUser,
                    id,
                    function () {


                        multiplier.doAppend();

                        clone.find('.IsSent').show();
                        clone.find('.NotSent').hide();
                        clone.btnRemove.show();
                        clone.find('.UserContainer').html('<div class="form-element-read-only-placeholder">' + clone.find('.USER_HR').val() + '</div>');
                        clone.find('.RoleContainer').html('<div class="form-element-read-only-placeholder">' + clone.find('.ROLE').find('option:selected').text() + '</div>');

                        clone.find('.ROLE').val('');
                        clone.find('.USER_ID').val('');
                    }
                );
            });



        }
    },


    Application: {
        attachmentSettings: function(params) {
            return {
                upload_url : params.upload_url,
                flash_url : '/flash/swfupload.swf?PHPSESSID=' + params.PHPSESSID,
                button_placeholder_id : params.button_placeholder_id,
                button_text: params.button_text,
                button_text_top_padding : 2,
                button_image_url : '/images/btn_pic_upload.png',
                button_width: 124,
                button_height: 24,
                button_cursor : SWFUpload.CURSOR.HAND,
                button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
                file_size_limit : '4 MB',
                file_types : '*.jpg;*.jpeg;*.png;*.gif;*.txt;*.doc;*.docx;*.pdf',
                file_types_description : 'JPEG PNG GIF Images DOC DOCX PDF files',
                file_queue_limit : 5,
                requeue_on_error : false,
                custom_settings : {
                    progressTarget : 'attachmentItems',
                    cancelButtonId : 'btnCancelUpload'
                },
                button_text_style: '.upload {text-align: center; text-decoration: none; color: #000000; font-family: Trebuchet MS, Verdana, sans-serif; font-weight: bold; font-size: 12px;}',
                file_upload_limit: params.file_upload_limit,
                debug: false,
                file_queued_handler : fileQueued,
                file_queue_error_handler : fileQueueError,
                file_dialog_complete_handler : fileDialogComplete,
                upload_start_handler : uploadStart,
                upload_progress_handler : uploadProgress,
                upload_error_handler : uploadError,
                upload_success_handler : uploadSuccess,
                upload_complete_handler : uploadComplete,
                queue_complete_handler : queueComplete
            };
        },
        Create: {
            picture: '',
            originalPicture: '',
            picUploadSuccess: function(file, serverData) {
                var fileName = '';
                for (var i in serverData.Ids) {
                    if (serverData.Ids[i]) {
                        fileName = serverData.Ids[i];
                    }
                }
                JobGo.Form.Application.picture = JobGo.Form.Application.originalPicture = JobGo.Image.getUrlByFilename(fileName, JobGo.Image.FOR_PERSON_HUGE);
            },
            init: function() {

                function submit(f) {
                    tinyMCE.triggerSave();
                    f.attr('action', '').submit();
                }

                $('#application_send').click(function(evt){
                    // Open the privacy settings dialog
                    /*
                    var d = $('#User_PrivacyForCompany_Dialog');
                    if (d.length > 0) {d.dialog('open');} else {
                        submit($(evt.target).closest('form'));
                    }
                    return false;
                    */


                    submit($(evt.target).closest('form'));
                });

                $('#application_cancel').click(JobGo.Nav.goBack);

                $('#user_privacyforcompany_done').click(function(evt){
                     submit($('#Application_Create'));
                });

                JobGo.Form.Application.picture = $('#PICTURE-photo').attr('src');
                JobGo.Form.Application.originalPicture = JobGo.Form.Application.picture;

                $('#application_use_person_picture').click(function() {JobGo.Form.toggleLogo(
                    $('#application_use_person_picture').attr('checked') == true,
                    $('#PICTURE-picture-links'),
                    $('#PICTURE-photo'),
                    JobGo.Form.Application.picture,
                    $('#person_picture_url').val()
                )});


                $('#lnkRemovePicture').click(function(){
                    JobGo.Form.Application.picture = JobGo.Form.Application.originalPicture
                        = JobGo.Image.getNoImageUrl(JobGo.Image.FOR_PERSON_HUGE);
                });

                JobGo.Form.toggleLogo(
                    $('#application_use_person_picture').attr('checked') == true,
                    $('#PICTURE-picture-links'),
                    $('#PICTURE-photo'),
                    JobGo.Form.Application.picture,
                    $('#person_picture_url').val()
                );

                // Work experience form elements toggle
                $('.IHaveExperience').each(function(i, e) {
                    var $e = $(e);
                    var elContainer = $e.closest('.JobGoMultiplier-Clone').find('.Elements');

                    $(document).ready(function() {
                        elContainer.find('input, select').each(function(i, e) {
                            var $e = $(e);

                            $e.rules('remove', "required");
                            $e.rules('remove', "valueNotAllowed");
                        });
                    });

                    $e.click(function(evt) {
                        var $e = $(evt.target);
                        if ($e.attr('checked')) {
                            elContainer.find('input, select').not('.COMPANY_ID').not('.StartDate').not('.EndDate').each(function(i, e) {
                                $(e).rules('add', {"required":true});
                                //$(e).rules('add', {"valueNotAllowed":true});
                            });
                            elContainer.show();
                            return;
                        }
                        elContainer.find('input, select').each(function(i, e) {
                            $(e).rules('remove', "required");
                            $(e).rules('remove', "valueNotAllowed");
                        });
                        elContainer.hide();

                        return;
                    })
                });

            }
        }
    },
    Message: {
        init: function() {
            $('#message_send').click(function(evt){
                $(evt.target).closest('form').attr('action', '').submit();
                return false;
            });
            $('#message_cancel').click(JobGo.Nav.goBack);
        },
        RecruitmentInvitation: {
            init: function() {
                JobGo.Form.Message.init();
                $('#joboffer_job_id').change(function(){
                    var $this = $(this);
                    $.get('/job/viewjson',
                        {'id':$this.val()},
                        function(data) {
                            if (data.code) {
                                // error
                                return;
                            }
                            console.log(data);
                            $('#BODY').val(data.DESCRIPTION ? data.DESCRIPTION : '&nbsp;');
                            $('#read-only-BODY').html(
                                data.DESCRIPTION ? data.DESCRIPTION : '&nbsp;'
                            );
                        }
                    );
                });
            }
        }
    },
    User: {
        SkillCloud: {
            config: {
                skillsDataContainer: '#skills-data-container',
                acSchoolUrl: '',
                acJobTitleUrl: '',
                acCompanyUrl: '',
                acSchoolHint: 'School name',
                acJobTitleHint: 'Job Title',
                acCompanyHint: 'Company'
            },
            initTagCloud: function() {
                var skills = [];
                $('.tagCloud').click(function() {
                    var t = $(this);
                    if(t.hasClass('tagSelected')) {
                        t.removeClass('tagSelected');
                        skills.splice(skills.indexOf(t.attr('name')), 1);
                        $('#selectedTags').val(
                            '{"selected":[' + skills.toString() + ']}'
                        );
                    } else {
                        t.addClass('tagSelected');
                        skills[skills.length] = t.attr('name');
                        $('#selectedTags').val(
                            '{"selected":[' + skills.toString() + ']}'
                        );
                    }
                });
            },
            initProfileOverlay: function() {
                var me = this;

                this.updateCloud(function () {
                    me.initTagModifiers();
                });
            },

            updateCloud: function(onSuccess, study, resp) {
                var me = this;
                var serviceUrl = me.getTagServiceUrl(me.config.locale, study, resp);
                $.ajax({url: serviceUrl, async: true, success: function(response){
                    function renderTag(fontSize, id, name) {
                        return '<span style="font-size:' + fontSize + 'px;" class="tagCloud" name="'+ id +'">'+ name +'</span>';
                    }

                    var i, weight, fontSize = 0;
                    var minFontSize = 12;
                    var maxFontSize = 30;
                    var maxCnt = response[0].COUNT;
                    var minCnt = response[response.length-1].COUNT;
                    var tags = [];

                    for (i=0; i < response.length; i++) {
                        weight = (Math.log(response[i].COUNT) - Math.log(minCnt)) / (Math.log(maxCnt) - Math.log(minCnt));
                        fontSize = minFontSize + Math.round((maxFontSize-minFontSize) * weight);
                        tags.push(renderTag(Math.floor(fontSize), response[i].SKILL_ID, response[i].Skills.SkillsTranslation[0].label));
                    }

                    function shuffle(o){ //v1.0
                        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                        return o;
                    }

                    $('#tagCloud').html(shuffle(tags).join(' '));
                    me.initTagCloud();

                    if (onSuccess) {
                        onSuccess();
                    }

                }});
            },

            initTagModifiers: function() {
                var me = this;
                $.each(['#responsibility', '#study'], function(idx, m) {
                    $(m).change(function() {
                        var content = $('#tagCloud').html();
                        var study = $('#study').val() || 0;
                        var resp = $('#responsibility').val() || 0;
                        var serviceUrl = me.getTagServiceUrl(me.config.locale, study, resp);

                        $('#tagCloud').html($.ajax({url: serviceUrl, async: false}).responseText);
                        me.initTagCloud();
                    });
                });
            },
            getTagServiceUrl: function(locale, study, responsibility) {
                var res = '/dictionary/skills/?locale=en&cloud=50';
                if (study) {
                    res += '&study' + study;
                }
                if (responsibility) {
                    res += '&study' + responsibility;
                }
                return res;
            }
        },
        TellAFriend: {
            init: function() {
                $('#message_send').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $('#message_cancel').click(function() {
                    JobGo.Nav.goToUrl(JobGo.Nav.getCurrentUrl() + '/skip/1');
                });
            }
        },
        Registration: {
            init: function()
            {
                $('#user_registration_register').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
            }
        },
        ChangePassword: {
            init: function()
            {
                $('#user_changepassword').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
            }
        },
        CloseAccount: {
            init: function()
            {
                $('#user_closeaccount').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });

            }
        },
        ChangeEmail: {
            init: function()
            {
                $('#user_changeemail_change').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $('#user_changeemail_cancel').click(JobGo.Nav.goBack);
            }
        },
        Privacy: {
            init: function() {
                $('#user_privacy_save').click(function(evt){
                    $(evt.target).closest('form').submit();
                    return false;
                });
                $('#user_privacy_cancel').click(function() {JobGo.Nav.goToUrl(JobGo.Nav.getCurrentUrl() + '/skip/1')});
            },
            HideForCompanies: {
                uri: '',
                send: function(company, success) {

                    if (!company) {
                        return;
                    }

                    $.post(this.uri,
                        {
                            company:company
                        },
                        function (data) {

                            if (data.code == 0) {
                                if (success) {
                                    success();
                                }
                            }
                            if (data.message) {
                                if (data.code == 0) {
                                    JobGo.Notice.setNotice(data.message);
                                } else {
                                    JobGo.Notice.setError(data.message);
                                }
                            }
                        }
                    )
                },
                MultiplierModifier: function(clone, multiplier){
                    // Act only if it is the last clone
                    if (clone.next().length != 0) return;

                    // Remove the remove button from the last clone
                    if (clone.btnRemove) {
                        clone.btnRemove.hide();
                    };


                    clone.find('.Send').click(function(){

                        JobGo.Form.User.Privacy.HideForCompanies.send(

                            clone.find('.COMPANY_ID').filter('input[type="hidden"]').val(),
                            function () {


                                multiplier.doAppend();

                                clone.find('.IsSent').show();
                                clone.find('.NotSent').hide();
                                clone.btnRemove.show();

                                clone.find('.CompanyContainer').html('<div class="form-element-read-only-placeholder"><input type="hidden" name="'+clone.find('.COMPANY_ID').filter('input[type="hidden"]').attr('name')+'" value="'+clone.find('.COMPANY_ID').filter('input[type="hidden"]').val()+'"/>' + clone.find('.COMPANY_ID').filter('input[type="text"]').val() + '</div>');

                                clone.find('.COMPANY_ID').filter('input[type="hidden"]').val('');
                                clone.find('.COMPANY_ID').filter('input[type="text"]').val('');
                            }
                        );
                    });
                }
            }
        },
        PrivacyForCompany: {
            init: function(selector, done, cancel, success) {

                var form = $(selector);


                if (!done) {
                    done = function() {
                        $(this).closest('form').submit();
                    }
                }
                if (!cancel) {
                    cancel = function() {
                        $(this).closest('.ui-dialog-content').dialog('close');
                    }
                }
                if (!success) {
                    success = function(data, form) {
                        JobGo.Notice.setNotice(data.message);
                        form.closest('.ui-dialog-content').dialog('close');
                    }
                }

                form.submit(function(e){
                    if (!$(this).valid()) {
                        return false;
                    }

                    $(this).ajaxSubmit(function(data){
                        try {
                            var data = eval('(' + data + ')');
                            if (data.code == 2) {
                                JobGo.Notice.setError(data.error);
                                return false;
                            }
                            success(data, form);
                            return true;
                        } catch(e) {
                            console.log(data);
                        }
                    });

                    return false;
                });
                form.find('#user_privacyforcompany_done').click(done);
                form.find('#user_privacyforcompany_cancel').click(cancel);
            }
        }
    },
    Company: {
        CompanyPermissions: {
            init: function()
            {
                $('#company_save').click(function(evt){
                    $(evt.target).closest('form').submit();
                    return false;
                });
                $("#company_cancel").click(JobGo.Nav.goBack);
            }
        },
        Claim: {
            init: function() {
                $('#company_claim').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#company_cancel").click(JobGo.Nav.goBack);
            }
        },
        Create: {
            init: function() {
                $('#company_create').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#company_cancel").click(JobGo.Nav.goBack);
            }
        },
        Edit: {
            originalPicture: '',
            picture: '',
            picUploadSuccess: function(file, serverData) {
                var fileName = '';
                for (var i in serverData.Ids) {
                    if (serverData.Ids[i]) {
                        fileName = serverData.Ids[i];
                    }
                }
                JobGo.Form.Company.Edit.picture = JobGo.Form.Company.Edit.originalPicture = JobGo.Image.getUrlByFilename(fileName, JobGo.Image.FOR_COMPANY_BIG);
            },
            init: function() {
                $('#company_save').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#company_cancel").click(JobGo.Nav.goBack);
            }
        },
        CreateInstant: {
            init: function() {

            }
        }
    },
    Happening: {
        attachmentSettings: function(params) {
            return {
                upload_url : params.upload_url,
                flash_url : '/flash/swfupload.swf?PHPSESSID=' + params.PHPSESSID,
                button_placeholder_id : params.button_placeholder_id,
                button_text: params.button_text,
                button_text_top_padding : 2,
                button_image_url : '/images/btn_pic_upload.png',
                button_width: 124,
                button_height: 24,
                button_cursor : SWFUpload.CURSOR.HAND,
                button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
                file_size_limit : '4 MB',
                file_types : '*.jpg;*.jpeg;*.png;*.gif;*.txt;*.doc;*.docx;*.pdf',
                file_types_description : 'JPEG PNG GIF Images DOC DOCX PDF files',
                file_queue_limit : 5,
                requeue_on_error : false,
                custom_settings : {
                    progressTarget : 'attachmentItems',
                    cancelButtonId : 'btnCancelUpload'
                },
                button_text_style: '.upload {text-align: center; text-decoration: none; color: #000000; font-family: Trebuchet MS, Verdana, sans-serif; font-weight: bold; font-size: 12px;}',
                file_upload_limit: params.file_upload_limit,
                debug: false,
                file_queued_handler : fileQueued,
                file_queue_error_handler : fileQueueError,
                file_dialog_complete_handler : fileDialogComplete,
                upload_start_handler : uploadStart,
                upload_progress_handler : uploadProgress,
                upload_error_handler : uploadError,
                upload_success_handler : uploadSuccess,
                upload_complete_handler : uploadComplete,
                queue_complete_handler : queueComplete
            };
        },
        Edit: {
            originalPicture: '',
            picture: '',
            picUploadSuccess: function(file, serverData) {
                var fileName = '';
                for (var i in serverData.Ids) {
                    if (serverData.Ids[i]) {
                        fileName = serverData.Ids[i];
                    }
                }

                JobGo.Form.Happening.Edit.picture = JobGo.Form.Happening.Edit.originalPicture = JobGo.Image.getUrlByFilename(fileName, JobGo.Image.FOR_HAPPENING_BIG);
            },
            init: function() {
                $('#happening-btn-add-end-time').click(function(){$('#happening-end-time-container').show();});
                $('#happening_save').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#happening_cancel").click(JobGo.Nav.goBack);
            }
        },
        Sessions: {
            init: function() {
                $('#happening_save').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#happening_cancel").click(JobGo.Nav.goBack);
            }
        },
        Participants: {
            Edit: {
                init: function() {
                    $('#happening_participant_save').click(function(evt){
                        $(evt.target).closest('form').attr('action', '').submit();
                        return false;
                    });
                    $("#happening_participant_cancel").click(JobGo.Nav.goBack);
                }
            },
            init: function() {
                $('#happening_save').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });
                $("#happening_cancel").click(JobGo.Nav.goBack);
            }
        }
    },
    Candidate: {
        Hire: {
            init: function() {
                $('#candidate_hire_confirm').click(function(evt){
                    var form = $(evt.target).closest('form');
                    form.submit();
                    return false;
                });

                $("#candidate_hire_cancel").click(JobGo.Nav.goBack);
            }
        },
        Profile: {
            init: function() {
                $('#candidate_save').click(function(evt){
                    $(evt.target).closest('form').attr('action', '').submit();
                    return false;
                });

                $('#candidate_continue').click(function(evt){
                    var form = $(evt.target).closest('form');
                    form.attr('action', form.attr('action') + '/continue/1').submit();
                    return false;
                });

                $("#candidate_cancel").click(JobGo.Nav.goBack);
                $('#job_preview').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    var form = $(evt.target).closest('form');
                    var attribute = form.attr('action');
                    attribute = attribute.replace('edit', 'preview') + '/actiontype/beforesave';
                    form.attr('action', attribute).submit();
                    return false;
                });
        }
        }
    },
    Person: {
        General: {
            init: function() {
                $('#person_save').click(function(evt){
                    if (document.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').submit();
                    return false;
                });
                $("#person_cancel").click(JobGo.Nav.goBack);
            }
        },
        AdditionalData:{
            init: function() {
                 $('#additionaldata_save').click(function(evt){
                    $(evt.target).closest('form').submit();
                    return false;
                });
            }
        },
        Edit: {
            PRIMARY_CONFIRMED: 1,
            PRIMARY_UNCONFIRMED: 2,
            init: function() {
                JobGo.Form.Person.General.init();
            },
            setAsPrimary: function($el) {
                // Fetch the row. This is going to be placed as first row in the
                // table.
                var clone = $el.closest('.JobGoMultiplier-Clone');
                var container = clone.closest('.CloneContainer');
                container.children().find('.section-content').removeClass('Primary');
                container.children().find('.IsHidden').val(0);
                container.find('.ButtonContainer>.Buttons').show();
                clone.prependTo(container);

                // Indicate that this is set as primary.
                clone.find('.section-content').addClass('Primary');
                // Hide the "Set as primary|remove" buttons
                clone.find('.ButtonContainer>.Buttons').hide();
                clone.find('.IsHidden').val(this.PRIMARY_UNCONFIRMED);
                // Cancel the click event.
                return false;
            }
        },
        Educations: {
            init: function() {
                JobGo.Form.Person.General.init();
                $('.ICurrentlyStudyHere').click(function(event) {
                    // If i state that i work in this company, then i don't have
                    // an end date for working period, so
                    var $e = $(event.target);
                    var $d = $e.closest('.JobGoMultiplier-Clone').find('.EndDate');

                    if ($e.attr('checked')) {
                        // Disable and hide the END_DATE element
                        $d
                            .attr('disabled', true)
                            .hide()
                            .closest('.EndDateContainer')
                                .hide();
                        return;
                    };
                    // Disable and hide the END_DATE element
                    $d
                        .attr('disabled', false)
                        .show()
                        .closest('.EndDateContainer')
                            .css('display', 'inline');
                    return;
                });

                $('.Ordering').click(function(){
                    $('.Ordering').not(this).attr('checked', false);
                });

            }
        },
        WorkExperience: {
            init: function() {
                JobGo.Form.Person.General.init();
                $('.ICurrentlyWorkHere').click(function(event) {
                    // If i state that i work in this company, then i don't have
                    // an end date for working period, so
                    var $e = $(event.target);
                    var $d = $e.closest('.JobGoMultiplier-Clone').find('.EndDate');
                    if ($e.attr('checked')) {
                        // Disable and hide the END_DATE element
                        $d
                            .attr('disabled', true)
                            .val('')
                            .hide()
                            .closest('.EndDateContainer')
                                .hide();
                        return;
                    };
                    // Disable and hide the END_DATE element
                    $d
                        .attr('disabled', false)
                        .show()
                        .closest('.EndDateContainer')
                            .css('display', 'inline');
                    return;
                });

                $('.Ordering').click(function(){
                    $('.Ordering').not(this).attr('checked', false);
                });
            }
        }
    },
    Job: {
        General: {
            init: function() {
                $('#job_save').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $(evt.target).closest('form').submit();
                    return false;
                });
                $('#job_save_add_new').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    $('#add-new').val(1);
                    var form = $(evt.target).closest('form');
                    form.attr('action', form.attr('action') + '/continue/1').submit();
                    return false;
                });
                $('#job_continue').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    var form = $(evt.target).closest('form');
                    form.attr('action', form.attr('action') + '/continue/1').submit();
                    return false;
                });
                $('#job_cancel').click(JobGo.Nav.goBack);

                $('#job_preview').click(function(evt){
                    if (window.tinyMCE) {
                        tinyMCE.triggerSave();
                    }
                    var form = $(evt.target).closest('form');
                    var attribute = form.attr('action');
                    attribute = attribute.replace('edit', 'preview') + '/actiontype/beforesave';
                    form.attr('action', attribute).submit();
                    return false;
                });
            }
        },
        Confirm: {
            expireDate: null,
            publishDate: null,
            dayDifference: 0,

            listingInterval: 30,

            // Expire date is chaneged automatically with posting date changes until the user changes the expire_date field.
            // After that this flag will be false and the expire date does not track the posting date anymore.
            expireDateTouched: false,

            updateDayDifference: function() {
                this.dayDifference = this.getDayDifference();
            },
            setListingInterval: function(interval) {
                this.listingInterval = interval;
                this.updateDayDifference();
            },
            getDayDifference: function() {
                if (this.expireDate && this.publishDate) {
                    // Store the difference
                    var s1 = this.expireDate.getTime();
                    var s2 = this.publishDate.getTime();

                    return ((s1-s2) / (1000*60*60*24) - this.listingInterval) ;
                }
            },
            init: function(listingInterval) {


                var now = Date.today();
                // Store the original expire date.
                this.expireDate = Date.parseExact($('#expire_date').val(), 'dd.MM.yyyy');
                // Store the original publish date
                this.publishDate =  Date.parseExact($('#publish_date').val(), 'dd.MM.yyyy');

                if (this.expireDate && this.publishDate) {
                     if (!listingInterval) {
                        listingInterval = 30;
                     }

                     this.setListingInterval(listingInterval);


                    var me = this;

                    $('#expire_date').change(function(){me.expireDateTouched=true;});
                    $('#publish_date').change(function(){
                        if (me.expireDateTouched) {
                            return;
                        }
                        var pD = Date.parseExact($(this).val(), 'dd.MM.yyyy');
                        var days = me.listingInterval + me.dayDifference;
                        pD.add(days).days();

                        $('#expire_date').val(pD.toString('dd.MM.yyyy'));
                    });
                }
            }
        },
        Create: {
            init: function() {
                $('#company_id').change(function(){
                    var $this = $(this);

                    if (!$this.val()) {
                        return;
                    }

                    $.get('/company/viewjson',
                        {'id':$this.val()},
                        function(data) {
                            if (data.code) {
                                // error
                                return;
                            }

                            if (data.CompanyIndustries && data.CompanyIndustries.length) {
                                $('#industry_id-__MULTIPLIER__index__').val(data.CompanyIndustries[0].INDUSTRY_ID);
                            }

                            if (data.CompanyLocation) { console.log(loc);
                                $('#region_id-__MULTIPLIER__index__').val(
                                    data.CompanyLocation.LOCATION_ID
                                );
                                var loc = [];
                                if (data.CompanyLocation.LocHeap.City) loc.push(data.CompanyLocation.LocHeap.City);
                                if (data.CompanyLocation.LocHeap.Region) loc.push(data.CompanyLocation.LocHeap.Region);
                                if (data.CompanyLocation.LocHeap.Country) loc.push(data.CompanyLocation.LocHeap.Country);

                                $('#region-__MULTIPLIER__index__').val(
                                    loc.join(', ')
                                );
                                $('#address-__MULTIPLIER__index__').val(data.CompanyLocation.ADDRESS);
                            }
                        },
                        'json'
                    );
                });
            }
        },
        Experience: {
            init: function() {
                JobGo.Form.Job.General.init();
            }
        },
        JobPermissions: {
            init: function()
            {
                JobGo.Form.Job.General.init();
            }
        },

        Details: {
            picture: '',
            originalPicture: '',
            picUploadSuccess: function(file, serverData) {
                var fileName = '';
                for (var i in serverData.Ids) {
                    if (serverData.Ids[i]) {
                        fileName = serverData.Ids[i];
                    }
                }
                JobGo.Form.Job.Details.picture = JobGo.Form.Job.Details.originalPicture = JobGo.Image.getUrlByFilename(fileName, JobGo.Image.FOR_JOB_BIG);
            },
            clickUseCompanyPicture: function() {JobGo.Form.toggleLogo(
                $('#use_company_picture').attr('checked') == true,
                $('#PICTURE-picture-links'),
                $('#PICTURE-photo'),
                JobGo.Form.Job.Details.picture,
                $('#company_picture_url').val()
            )},                    
            init: function () {
                var me = this;

                JobGo.Form.Job.General.init();

                JobGo.Form.Job.Details.picture = $('#PICTURE-photo').attr('src');
                JobGo.Form.Job.Details.originalPicture = JobGo.Form.Job.Details.picture;

                $('#use_company_picture').click(this.clickUseCompanyPicture);


                $('#lnkRemovePicture').click(function(){
                    JobGo.Form.Job.Details.picture = JobGo.Form.Job.Details.originalPicture
                        = JobGo.Image.getNoImageUrl(JobGo.Image.FOR_JOB_BIG);
                });

                JobGo.Form.toggleLogo(
                    $('#use_company_picture').attr('checked') == true,
                    $('#PICTURE-picture-links'),
                    $('#PICTURE-photo'),
                    JobGo.Form.Job.Details.picture,
                    $('#company_picture_url').val()
                );
            },
            VISIBLE_OUTSIDE:{
                click: function(me){
                    if (me.id=='visible_outside-2') {
                        $('#publish_date').attr('disabled', '');
                        $('#expire_date').attr('disabled', '');
                        $('#publish_date').closest('tr').show();
                        return;
                    }
                    $('#publish_date').attr('disabled', 'disabled');
                    $('#expire_date').attr('disabled', 'disabled');
                    $('#publish_date').closest('tr').hide();
                }
            }
        }
    }
}

JobGo.View = {
    Helpers: {
        Weight: {
            init: function(e) {
                var $e = $(e);
                $e.filter('div')
                    .bind('disableMe', JobGo.View.Helpers.Weight.disableHandler)
                    .bind('enableMe', JobGo.View.Helpers.Weight.enableHandler)
                    .bind('click', JobGo.View.Helpers.Weight.toggleWeight)
                    // Multiplier stuff
                    .addClass(JobGo.Multiplier.CLASS_HASMULTIPLYME)
                    .bind(JobGo.Multiplier.EVENT_MULTIPLYME, JobGo.View.Helpers.Weight.multiplyMe)
                    ;
            },
            createElement: function() {
                return $(
                        '<div class="weight"><table><tr><td>'
                    +   '    <div class="RadioContainer left">'
                    +   '        <input type="radio" checked="checked" style="display:none" value="1"/>'
                    +   '    </div>'
                    +   '    <div class="RadioContainer center inactive">'
                    +   '        <input type="radio" style="display:none" value="2"/>'
                    +   '    </div>'
                    +   '    <div class="RadioContainer right inactive">'
                    +   '        <input type="radio" style="display:none" value="3"/>'
                    +   '    </div>'
                    +   '</td></tr></table></div>'
                );
            },
            multiplyMe: function(evt, multiplier, clone) {
                if(clone.hasClass(JobGo.Multiplier.CLASS_PRERENDERED)) {
                    return;
                }
                JobGo.View.Helpers.Weight.clearHandler(evt);
                JobGo.View.Helpers.Weight.set($($(evt.target).find('input[type=radio]').get(0)).closest('div'));
            },
            clearHandler: function(evt) {
                $(evt.target).find('input[type=radio]').each(function(i,e){
                    JobGo.View.Helpers.Weight.clear($(e).closest('div'));
                });
            },
            disableHandler: function(evt) {
                $(evt.target).find('input[type=radio]').each(function(i,e){
                    JobGo.View.Helpers.Weight.disable($(e).closest('div'));
                });
            },
            enableHandler: function(evt) {
                $(evt.target).find('input[type=radio]').each(function(i,e){
                    var $e = $(e);
                    if ($e.attr('disabled') == true) {
                        JobGo.View.Helpers.Weight.enable($(e).closest('div'));
                    }
                });
            },
            isEnabled: function(switcher) {
                return $($(switcher).children().get(0)).attr('disabled') != true;
            },
            enable: function(switcher)
            {
                var $switcher = $(switcher);
                $($switcher.children().get(0)).attr('disabled', false);

            },
            disable: function(switcher)
            {
                var $switcher = $(switcher);
                $($switcher.children().get(0)).attr('disabled', true);
            },
            clear: function(switcher)
            {
                var $switcher = $(switcher);
                var me = this;
                var isSomethingSelected = false;
                $switcher.parent().children().each(function(k, e){
                    var $e = $(e);
                    if (me.isSet($e)) {
                        isSomethingSelected = true;
                        return;
                    }
                });

                if (!isSomethingSelected) {
                    this.set($switcher.parent().children().get(0));
                }
            },
            set: function(switcher) {
                var $switcher = $(switcher);
                JobGo.View.Helpers.Weight.enable($switcher);
                var $radio = $($switcher.children().get(0));
                $radio.attr('checked', true);
                $switcher.removeClass('inactive').addClass('active');
                $switcher.parent().children().not($switcher).each(function(k, e) {
                    JobGo.View.Helpers.Weight.unset($(e));
                });

            },
            get: function(switcher) {
                for (var i = 1; i <= 3; i++) {
                    var switcherLocal = (switcher + '_' + i);
                    if(JobGo.View.Helpers.Weight.isSet(switcherLocal)) {
                        return i;
                    }
                }
                return 2;
            },
            unset: function(switcher) {
                var $switcher = $(switcher);
                var $radio = $($switcher.children().get(0));
                $radio.attr('checked', false);
                $(switcher).removeClass('active').addClass('inactive');
                JobGo.View.Helpers.Weight.clear($switcher);
            },
            isSet: function(switcher) {
                return $(switcher).hasClass('active');
            },
            toggleWeight: function toggleWeight(e) {
                var $switcher = $(e.target);
                if (!JobGo.View.Helpers.Weight.isEnabled($switcher)) {
                    return;
                }

                if (!JobGo.View.Helpers.Weight.isSet($switcher)) {
                    JobGo.View.Helpers.Weight.set($switcher);
                } else {
                    // Disable unsetting the switcher by clicking on it.
                    JobGo.View.Helpers.Weight.unset($switcher);
                }
            }
        }
    }
}

JobGo.SkillSelector = {
    PersonExpertises: {
        onSave: function(s) {
            if (!s.getSelectedSkills().length && !s.getNewSkills().length && !s.getRemovedSkills()) {
                return '';
            }
            return '{"new":'+JobGo.SkillSelector.Category.List.toJson(s.getNewSkills())+',"selected":'+JobGo.SkillSelector.Category.List.toJson(s.getSelectedSkills())+', "removed":'+JobGo.SkillSelector.Category.List.toJson(s.getRemovedSkills())+'}'
        }
    },
    Category: {
        List: {
            toJson: function(lst) {
                var r = [];
                var k, l = lst.length;
                for (k = 0; k < l; k++) {

                    r.push(JobGo.SkillSelector.Category.toJson(lst[k]));
                }
                return '[' + r.join(',') + ']';
            }
        },
        toJson: function(cat) {
            if (!cat) {
                return '{}';
            }
            return '{'
              + '    "id":"'+cat.getId()+'",'
              + '    "structure_id":"'+cat.getStructureId()+'",'
              + '    "is_skill":'+cat.isLeaf()+','
              + '    "skill_level":'+cat.getSkillLevel()+','
              + '    "name":"'+cat.getName()+'",'
              + '    "weight":"'+cat.getWeight()+'",'
              + '    "selected":'+cat.isSelected()+','
              + '    "parent_id":"'+(cat.parent ? cat.parent.getStructureId() : null)+'"'
              +'}';
        }
    }
}

function CandidateSearchJobId()
{
    var re = /candidate\/search\//i;
    if(re.test(window.location))
    {
        var reId = /\/JOB_ID\/(\d+)\/?/i;
        var jobId = reId.exec(window.location);
        if(jobId != null && jobId.length > 1) {
            return jobId[1];
        }
    }
    return false;
}

JobGo.RegExp = {
	escape : function(text) {
		if (!arguments.callee.sRE) {
			var specials = [
			    '/', '.', '*', '+', '?', '|',
			    '(', ')', '[', ']', '{', '}', '\\'
			    ];
			arguments.callee.sRE = new RegExp(
				'(\\' + specials.join('|\\') + ')', 'g'
			);
		}
		return text.replace(arguments.callee.sRE, '\\$1');
	}
}

JobGo.Search = {
    GroupActions: {
        init: function() {
            $('#gActions').attr('disabled', true);
            var jobId = CandidateSearchJobId();
            var rxMessageSend = /\/message\/(sendmessage|invitetorecruitment)\//i;
            var rxTypeOffer = /\/type\/offer\//i;
            $('#chk-all').click(function() {
                $("input[name='itemCheckbox[]']").attr('checked', $('#chk-all').is(':checked'));
                var c = ''; // general id hash
                var jc = ''; // candidate id hash
                if(jobId)
                {
                    $("input[name='itemCheckbox[]']:checked")
                        .each(function(i,v)
                            {
                                var id = $(v).attr('id');
                                jc += id.replace(/ch/i,'') + ',';
                            });
                }

                $("input[name='itemCheckbox[]']:checked").each(function(i,v){c+=$(v).val() + ',';});
                c = c.replace(/,$/, '');
                jc = jc.replace(/,$/, '');
                $('#gActions')
                        .attr('disabled', c.length == 0)
                        .unbind()
                        .bind('change', function() {
                            var target = $("#gActions option:selected").val();
                            var newUrl = '';

                            //if(jobId && !rxMessageSend.test(target))
                            if(jobId)
                            {
                                newUrl = target + '/id/' + jobId + '/candidateId/' + jc;
                            }
                            else
                            {
                                if(rxTypeOffer.test(target))
                                {
                                    newUrl = target + c + '/jobId/' + jobId;
                                }
                                else
                                {
                                    newUrl = target + c;
                                }
                            }
                            window.location = newUrl;
                        });
            });
            $("input[name='itemCheckbox[]']").click(function() {
                var all = true;
                var c = ''; // general id hash
                var jc = ''; // candidate id hash
                if(jobId)
                {
                    $("input[name='itemCheckbox[]']:checked").each(function(i,v)
                    {
                        var id = $(v).attr('id');
                        jc += id.replace(/ch/i,'') + ',';
                    });
                }
                $("input[name='itemCheckbox[]']").each(function(i,v) {
                    if($(v).is(':checked')){c+=$(v).val() + ',';}
                    else{all = false;}
                });
                $('#chk-all').attr('checked', all);
                c = c.replace(/,$/, '');
                jc = jc.replace(/,$/, '');
                $('#gActions')
                        .attr('disabled', c.length == 0)
                        .unbind()
                        .bind('change', function() {
                            var target = $('#gActions option:selected').val();
                            var newUrl = '';
                            //if(jobId && !rxMessageSend.test(target))
                            if(jobId)
                            {
                                newUrl = target + '/id/' + jobId + '/candidateId/' + jc;
                            }
                            else
                            {
                                if(rxTypeOffer.test(target))
                                {
                                    newUrl = target + c + '/jobId/' + jobId;
                                }
                                else
                                {
                                    newUrl = target + c;
                                }
                            }
                            window.location = newUrl;
                        });
            });
        }
    },
    init: function(cpMap) {
         // Hide the advanced search on initialization.
        if(!$('.search-bar').is(":visible")) {
            var k, l = cpMap.length;
            for (k=0; k<l; k++) {
                $(cpMap[k][0]).children().appendTo($(cpMap[k][1]));
            }
        }
        // Quick search submit button.
        $('#dispatchTrigger').click(function(){
            JobGo.Search.toggleAdvanced(cpMap);
        });
        $('#quickSubmit').click(function(e){
            $(e.target).closest('form').submit();
        });
        $('.search-bar > div > label').hide();
    },

    toggleAdvanced: function(cpMap)
    {
        /**
         * cpMap = [ [quickContainer, advancedContainer], ... ]
         */
        // Show advanced
        if($('.search-bar').is(":visible"))
        {
            $('#search_is_advanced').val(1);
            $('.search-bar > div > label').show().css('display', 'block');
            $('.search-bar').hide();
            var k, l = cpMap.length;
            for (k=0; k<l; k++) {
                $(cpMap[k][0]).children().appendTo($(cpMap[k][1]));
            }
            $('.search-filters').show("slide", {direction: "up"}, 200);
            $('#dispatchTrigger').removeClass('adv').addClass('advDn');
            $("#RESPONSIBILITY_ID").css('width', "180px");
        }
        // Close advanced
        else
        {
            $('#search_is_advanced').val(0);
            $('.search-bar > div').html()
            $('.search-bar').show();
            var k, l = cpMap.length;
            for (k=0; k<l; k++) {
                $(cpMap[k][1]).children().appendTo($(cpMap[k][0]));
            }
            $('.search-bar > div > label').hide();
            $('.search-filters').hide("slide", {direction: "up"}, 200);
            $('#dispatchTrigger').removeClass('advDn').addClass('adv');
            $("#RESPONSIBILITY_ID").css('width', "100px");
        }
    }
}


JobGo.ChangeCompanyOwner = JobGo.ChangeJobOwner = {
    formatItem: function(row) {
        row = eval('(' + row + ')');
        return row['NAME'];
    },
    changeOwner:  function(url, data, onsuccess) {
        var row = eval('(' + data + ')');
        url += '/personId/' + row['ID'];

        $.getJSON(url, function (data) {
            var response = data['response'];
            if (response['code'] != 0) {
                JobGo.Notice.setError(response['message']);
                return;
            }
            JobGo.Notice.setNotice(response['message']);
            if (onsuccess) {
                onsuccess(row);
            }
        });
    }
}

JobGo.Google = {
    Maps: {
        Map: function(canvas) {
            this.markers = [];
            // This is the map container.
            this.canvas = $(canvas);
            // Geocoder
            this.geocoder = new google.maps.Geocoder();
            // Map center
            this.center = new google.maps.LatLng(-34.397, 150.644);
            // Map object
            this.map = new google.maps.Map(this.canvas.get(0), {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }
    }
}

var Map = JobGo.Google.Maps.Map;
$.extend(Map.prototype, {
    autoCenter: function() {
        var bounds = new google.maps.LatLngBounds();
        $.each(this.markers, function (index, marker) {
            bounds.extend(marker.position);
        });
        //set minmarkers if undefined
        if(!minmarkers)
        {
            var minmarkers = 1;
        }
        if(this.markers.length <= minmarkers)
        {
            this.map.setZoom( this.map.zoom );
        }
        else
        {
            this.map.fitBounds(bounds);
        }
        return this;
    },
    addInfoWindow: function(marker, content) {
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        var self = this;
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(self.map,  this);
        });
    },
    showMarker: function(loc, title, info) {
        if (undefined == title) {
            title = '';
        }
        this.setCenter(loc);
        var marker;
        this.markers.push(
            marker = new google.maps.Marker({
                map: this.map,
                position: loc,
                title: title
            })
        );
        this.autoCenter();

        if (info) {
            this.addInfoWindow(marker, info);
        }

        return marker;
    },
    setCenter: function(loc) {
        this.map.setCenter(loc);
    },
    addAddress: function(address, label, info, fallbackCoordinates) {
        var self = this;

        function addFallback(label, info, fallbackCoordinates)
        {
            if (!fallbackCoordinates) {
                return;
            }
            self.addCoordinates(
                fallbackCoordinates[0],
                fallbackCoordinates[1],
                label,
                'Accuracy of the location: City' + '<br/>' + info
            );
        }

        if (!address) {
            addFallback(label, info, fallbackCoordinates);
            return this;
        }

        this.geocoder.geocode({
            'address': address
        }, function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                    self.showMarker(results[0].geometry.location, label, info);
                } else {
                    //addFallback(label, info, fallbackCoordinates);
                }
            }
        );
        return this;
    },
    buildAddress: function(loc) {

        if (loc.Address == '' || loc.Address == null && (loc.Postal == '' || loc.Postal == null)) return null;

        return [
            loc.Postal,
            loc.Country.Name,
            // region often confuses the geocoder
            //loc.Region.Name,
            loc.City.Name,
            loc.Address
        ].join(',');
    },
    addCoordinates: function(lat, lng, label, info) {
        this.showMarker(new google.maps.LatLng(lat, lng), label, info);
        return this;
    },
    addLocation: function(loc) {
        if (typeof(loc.latitude) != 'undefined' && typeof(loc.longitude) != 'undefined') {
            return this.addCoordinates(loc, loc.Label, loc.Info);
        }
        return this.addAddress(this.buildAddress(loc), loc.Label, loc.Info
                ,[loc['City']['Latitude'], loc['City']['Longitude']]
        );
    },
    addLocations: function(locations) {
        var k,l = locations.length;
        for(k=0; k<l; k++) {
            this.addLocation(locations[k]);
        }
        return this;
    }
});


JobGo.Stat = {
    Job: {
        Apply:{
            send: function() {
                $.get('/stat/apply', function(data) {
                    //ignore response
                });
            }
        }
    }
}

JobGo.Dialog = {

    modalDialogs: [],

    Modal: function(selector, autoOpen, options) {
        this.overlay = null;
        this.area = null;
        this.selector = selector;
        this.options = {};
        if (options) {
            this.options = options;
        }
        this.init(autoOpen);


    }
}
$.extend(JobGo.Dialog.Modal.prototype, {
    reposition: function() {
        if (!this.area.dialog('isOpen')) {
            return;
        }

        var anchor = $('.systemMessage');
        var pos = anchor.position();

        if (pos) {
            if (anchor.css('display') != 'none' && pos.top) {
                var left = pos.left + anchor.width()/2 - (this.options['width'] / 2);
                var top = pos.top + anchor.height() + 40;

                this.area.dialog('option', 'position', [left, 0]);
            }
        }
    },
    init: function(autoOpen) {
        if (this.overlay) {
            return true;
        }

        this.area = $(this.selector);
        this.area.appendTo($('body'));

        var options = $.extend({
            modal:true,
            closeOnEscape: false,
            dialogClass: 'JobGoDialog',
            buttons: null,
            draggable: false,
            resizable: false,
            bgiframe: true,
            autoOpen: autoOpen,
            stack:true,
            position: ['center',50]
        }, this.options);

        this.options = options;

        $(window).resize($.proxy(this.reposition, this));
        $(window).scroll($.proxy(this.reposition, this));

        this.overlay = this.area.dialog(options);

        if (autoOpen) {
            //this.reposition();
        }
        var me = this;
        this.overlay.bind('dialogopen', function () {
            if (typeof(FB) != 'undefined')  {
                if (FB.Canvas) {
                    FB.Canvas.scrollTo(0,0);
                }
            }
            window.scrollTo(0, $('body').attr(0));

            $(this).dialog('option', 'position', ['center',130]);


        });

        var closeButton = this.area.find('.CloseButton');

        if (closeButton) {
            closeButton.click($.proxy(this.hide, this));
        }
    },
    show: function() {
        this.area.dialog('open');

        //this.reposition();
    },
    hide: function() {
        this.area.dialog('close');
    }
});

JobGo.Translate = {
    Classificator: {
        URL_SAVE: '/default/translation/saveclassificator',
        Source: {
            Select: function(classificator, elSelect) {
                this.classificator = classificator;
                this.elSelect = $(elSelect);
                this.options = this.elSelect.find('option');

                this._limit = this.options.length;
                this._offset = 0;


                this.data = [];
                var i = 0;

                var v;
                for (i; i < this._limit; i++) {
                    v = $(this.options[i]).val();
                    if (v) {
                        this.data.push({
                            key: v,
                            value: $(this.options[i]).attr('label')
                        });
                    }
                }

                this._limit = this.data.length;

                this.fetch = function() {
                    var data = [];
                    var i = this._offset;
                    for (i; i < this._limit; i++) {
                        data.push(this.data[i]);
                    }
                    return data;
                }
                this.limit = function(limit) {
                    this._limit = limit;
                    return this;
                }
                this.offset = function(offset) {
                    this._offset = offset;
                    return this;
                }
            },
            Checkbox: function(classificator, elCheckbox) {
                this.classificator = classificator;
                this.elCheckboxes = $(elCheckbox);
                this.checkboxes = $('.' + classificator);

                this._limit = this.checkboxes.length;
                this._offset = 0;


                this.data = [];
                var i = 0;

                var v;
                for (i; i < this._limit; i++) {
                    v = $(this.checkboxes[i]).val();
                    var label = $(this.checkboxes[i]).parent().contents().filter(function(){return this.nodeType==Node.TEXT_NODE;}).get(0);

                    if (label) {
                        if (v) {
                            this.data.push({
                                key: v,
                                value: label.nodeValue
                            });
                        }
                    }
                }

                this._limit = this.data.length;

                this.fetch = function() {
                    var data = [];
                    var i = this._offset;
                    for (i; i < this._limit; i++) {
                        data.push(this.data[i]);
                    }
                    return data;
                }
                this.limit = function(limit) {
                    this._limit = limit;
                    return this;
                }
                this.offset = function(offset) {
                    this._offset = offset;
                    return this;
                }
            }
        },
        view: {
            overlay: null,
            area: null,
            table: null,

            eventSave: new Talentor.Event('Save'),

            initOverlay: function() {
                if (!this.overlay) {
                    this.area = $('<div class="ClassificatorTranslationArea" id="ClassificatorTranslationArea"><div class="TableContainer"></div></div>')
                        .appendTo(document.body);
                    this.btnClose = $('<span class="Close">X</span>').prependTo(this.area);
                    this.table = $('<table>');
                    this.area.find('.TableContainer').append(this.table);

                    this.overlay = new JobGo.Dialog.Modal(this.area, false);
                }
            },
            createOpenButton: function () {
                return $('<span class="OpenClassificatorTranslator">TC</span>');
            },
            initOpenButtons: function (selector, clickHandler) {
                var me = this;
                $(selector).each(function(i, e){
                    var $e = $(e);
                    me.createOpenButton().insertAfter($e).click(function(event) {
                        event.data = $e;
                        clickHandler(event);
                    });
                });
            },
            open: function (classificatorSource) {
                this.classificatorSource = classificatorSource;
                this.render();
                this.overlay.show();
            },
            close: function() {
                this.overlay.hide();    
            },
            clear: function () {
                this.table.html('');
            },
            reposition: function() {
                this.overlay.reposition();
            },
            render: function() {
                var i = 0;
                var data = this.classificatorSource.fetch();
                this.clear();
                for (i; i < data.length; i++) {
                    this.renderRow(data[i]).appendTo(this.table);
                }
            },
            renderRow: function(row) {
                var me = this;

                var input = $('<input>')
                    .attr('name', row.key)
                    .val(row.value);

                return $('<tr>').append(
                    $('<td>')
                        .append(input)
                        .append(
                            $('<a><span class="btn-blue">Ok</span></a>').click(function(){
                                me.eventSave.trigger([{
                                    key: row.key,
                                    value: input.val()
                                }]);
                                var i = 0;
                                var options = me.classificatorSource.options;
                                var data = me.classificatorSource.data;
                                for (i; i < options.length; i++) {
                                    var opt = $(options.get(i));
                                    if (opt.val() == row.key) {
                                        opt.attr('label', input.val());
                                    }
                                }
                            })
                        )
                );
            }

        },

        _inited: false,
        init: function(classificator, selector) {
            var me = this;
            if (!this._inited) {
                this.view.initOverlay();

                this.view.btnClose.click($.proxy(this.close, this));
                this.view.eventSave.bind(function(data) {
                    me.save(data);
                });
                this._inited = true;
            }
            this.view.initOpenButtons(selector, function(event){
                var $elements = $('.' + classificator);
                var $e = $($elements.get(0));

                if ($e && $e.length) {
                    if ($e.attr('type') == 'checkbox') {
                        me.open(new me.Source.Checkbox(classificator, event.data));
                    } else {
                        me.open(new me.Source.Select(classificator, event.data));
                    }
                }


            });
        },
        open: function(classificatorSource) {
            this.classificatorSource = classificatorSource;
            this.view.open(classificatorSource);
        },
        close: function() {
            this.view.close();
        },
        save: function(data) {
            var me = this;
            data.classificator = this.classificatorSource.classificator;
            $.post(this.URL_SAVE,
                data,
                function (data) {
                    if (data) {
                        if (data.code == 0) {
                            JobGo.Notice.setNotice(data.message);
                        } else {
                            JobGo.Notice.setError(data.message);
                        }
                        me.view.reposition();
                    }
                }
            );
        }
    },

    overlay: null,
    area: null,

    labels: {},

    findSuitableElement: function(e) {
        var badContainers = ['A', 'SPAN'];
        var k,l = badContainers.length;
        var parent = e.parent();
        for (k=0;k<l;k++) {
            if (parent.get(0).tagName == badContainers[k]) {
                return this.findSuitableElement(parent);
            }
        }
        return parent;

    },
    init: function() {
        if (this.overlay) {
            return true;
        }
        this.area = new JobGo.Dialog.Modal($('<div class="TranslationArea" id="TranslationArea"></div>'), false, {width:'700px', resizable:true, draggable:true});
        this.overlay = this.area.overlay;
    },
    show: function(btn, label) {

        var $btn = $(btn);

        var self = this;
        label = encodeURIComponent(label);
        $.post('/translation/showform/?label=' + label, $.proxy(function(data) {

            self.overlay.html(data);
            self.overlay.find('.Close').click($.proxy(self.hide, self));

            var form = self.area.overlay.find('form');

            form.bind('submit', function() {
                form.ajaxSubmit(function(data) {
                    if (data) {
                        var parsed = eval('(' + data + ')');
                        try {

                            $btn.html(parsed['BODY']);
                            $btn.removeClass('JobGoTranslateUntranslated')
                                .addClass('JobGoTranslateTranslated');
                            $btn.css('background', 'green');
                            self.hide();
                        } catch(e) {
                            console.log(e);
                            JobGo.Notice.setWarning('Sorry, dynamic replacing failed. Please refresh the site to see the changes.');
                            self.hide();
                        }
                    }
                });
                return false;
            });

        }), this);

        this.area.show();
    },
    hide: function() {
        this.area.hide();
    }
}

JobGo.Message = {
    Widget: {
        JoinInvitation: function(selector) {
            this.uri = '/default/message/ajaxsendinvitation';

            this.widget = $(selector);
            this.btnSubmit = this.widget.find('.BtnSubmit');
            this.inputField = this.widget.find('.Email');

            this.btnSubmit.click($.proxy(this.submit, this));
        }
    }
}
$.extend(JobGo.Message.Widget.JoinInvitation.prototype, {
    submit: function() {
        var emails = this.inputField.val();
        if (!emails) return;
        var inputField = this.inputField;
        this.send(emails, function() {
            inputField.val('');
        });
    },
    send: function(emails, success) {
        $.post(this.uri,
            {'EMAIL':emails},
            function (data) {
                if (data.code == 0) {
                    if (success) {
                        success();
                    }
                }
                if (data.message) {
                    if (data.code == 0) {
                        JobGo.Notice.setNotice(data.message);
                    } else {
                        JobGo.Notice.setError(data.message);
                    }
                }
            }
        );
    }
});

JobGo.Happening = {
    Widthdraw: function() {
        $('.btn-happening-withdraw').click(function(e){

            if (!$(this).data('isConfirmed')) {
                return;
            }

            e.preventDefault();



            var $this = $(this);

            var happeningId = $this.attr("id").substr(23);

            $.post('/happening/withdraw/id/' + happeningId, {}, function(data){
                if (data.error) {
                    var msg = '';
                    if (data.message.join) {
                        msg = data.message.join(' ');
                    } else {
                        msg = data.message;
                    }
                    JobGo.Notice.setError(msg);
                } else {
                    if (data.message) {
                        var msg = '';
                        if (data.message.join) {
                            msg = data.message.join(' ');
                        } else {
                            msg = data.message;
                        }
                        JobGo.Notice.setNotice(msg);
                    }
                    $this.hide();
                    JobGo.Nav.reload();
                    $('#btn-happening-join-' + happeningId).show();
                }
            });
        });
    },

    Widget: {

    }
}

JobGo.Happening.Widget.Join = function($widget, $openButtons, success, failure, params) {
    this.widget = $widget;
    this.openButtons = $openButtons;
    this.openButton = null;
    this.useAjax = false;
    if (!params) {
        params = {};
    }
    this.params = params;

    if (!success) {
        success = function() {};
    }
    if (!failure) {
        failure = function() {};
    }

    this.success = success;
    this.failure = failure;
    this.init();
}
$.extend(JobGo.Happening.Widget.Join.prototype, {
    init: function() {
        var self = this;
        this.getOpenButtons().each(function(i, e){
            $(this).click(function(e){
                e.preventDefault();
                e.stopPropagation();
                self.openButton = $(this);
                self.setEventId($(e.currentTarget).attr("id").substr(19));
                self.getWidget().dialog('open');

                self.setEventName($(e.currentTarget).attr("title"));
            });
        });
    },
    getUseAjax: function () {
        return this.useAjax;
    },
    setUseAjax: function (flag) {
        this.useAjax = flag;
        if (this.formSubmitDelegated) return;
        var self = this;
        $(document).delegate('#' + self.getWidget().attr('id') + ' form', 'submit', function(e){
            if (!self.useAjax) {return true;}
            e.preventDefault();
            var $form = $(this);
            $.post($form.attr('action'), $form.serialize(), function(data){
                if (typeof data == 'object') {
                    if (!data.error) {
                        self.getSuccess()(self, data);
                    } else {
                        self.getFailure()(self, data);
                    }
                    self.handleJsonResponse(data);
                }
            });
            return false;
        });

        this.formSubmitDelegated = true;

    },
    getSuccess: function() {
        return this.success;
    },
    getFailure: function() {
        return this.failure;
    },
    getOpenButton: function() {
        return this.openButton;
    },
    handleJsonResponse: function(data) {
        if (data.error) {
            var msg = '';
            if (data.message.join) {
                msg = data.message.join('. ');
            } else {
                msg = data.message;
            }
            JobGo.Notice.setError(msg);
        } else {
            if (data.message) {
                var msg = '';
                if (data.message.join) {
                    msg = data.message.join('. ');
                } else {
                    msg = data.message;
                }
                JobGo.Notice.setNotice(msg);
            }
        }
        this.getWidget().dialog('close');
    },
    setEventName: function(name) {
        $('#ui-dialog-title-'+this.getWidget().attr('id')).find('.happening-widget-join-happeningname').html(name);
    },
    setEventId: function(id) {
        this.eventId = id;
        this.onSetEventId();

    },
    getEventId: function() {
        return this.eventId;
    },
    getWidget: function() {
        return this.widget;
    },
    getOpenButtons: function() {
        return this.openButtons;
    },
    onSetEventId: function() {
        if (this.params.dontFetchContents) return;
        this.updateDialogContent();
    },
    updateDialogContent: function() {
        var self = this;
        $.get('/happening/joindialog/id/' + this.getEventId(), function(data) {
            if (typeof data == 'object') {
                self.handleJsonResponse(data);
            }
            self.getWidget().html(data);
        });
    }

});

JobGo.Happening.Meeting = {
    Cancel: function() {
        $('.btn-happening-meeting-cancel').click(function(e){
            e.preventDefault();

            $this = $(this);
            var meetingId = $this.attr("id").substr(29);

            JobGo.DefaultConfirmDialog.confirm(null, function() {
                $.post('/happening/cancelmeeting/id/' + meetingId, {}, function(data){
                    if (data.error) {
                        var msg = '';
                        if (data.message.join) {
                            msg = data.message.join(' ');
                        } else {
                            msg = data.message;
                        }
                        JobGo.Notice.setError(msg);
                    } else {
                        if (data.message) {
                            var msg = '';
                            if (data.message.join) {
                                msg = data.message.join(' ');
                            } else {
                                msg = data.message;
                            }
                            JobGo.Notice.setNotice(msg);
                        }
                        $this.hide();
                        $this.parent().prev().html('');
                    }
                });
            });


        });
    },
    Widget:{}
}
JobGo.Happening.Meeting.Widget.Request = function($widget, $openButtons, success, failure, params) {
    this.widget = $widget;
    this.openButtons = $openButtons;
    this.openButton = null;
    this.useAjax = false;

    if (!success) {
        success = function() {};
    }
    if (!failure) {
        failure = function() {};
    }

    this.success = success;
    this.failure = failure;
    this.init();
}
$.extend(JobGo.Happening.Meeting.Widget.Request.prototype, {
    getDialogContentUrl: function() {
        if (this.getOpenButton().hasClass('btn-happening-participant-requestmeeting-company')) {
            return '/happening/requestmeetingdialog/happeningId/' + this.getHappeningId() + '/companyId/' + this.getCompanyId() ;
        } else {
            return '/happening/requestmeetingdialog/id/' + this.getParticipantId();
        }
    },
    init: function() {
        var self = this;
        this.getOpenButtons().each(function(i, e){
            $(this).click(function(e){
                e.preventDefault();
                e.stopPropagation();
                self.openButton = $(this);

                if (self.openButton.hasClass('btn-happening-participant-requestmeeting-company')) {

                    var ids = $(e.currentTarget).attr("id").substr(41).split('-');

                    self.setHappeningId(ids[0]);
                    self.setCompanyId(ids[1]);


                } else {
                    self.setParticipantId($(e.currentTarget).attr("id").substr(41));
                }

                self.getWidget().dialog('open');
                self.setEventName($(e.currentTarget).attr("title"));
            });
        });
    },
    getCompanyId: function() {
        return this.companyId;
    },
    setCompanyId: function(id) {
        this.companyId = id;
        this.updateDialogContent();
    },
    setHappeningId: function(id) {
        this.happeningId = id;
    },
    getHappeningId: function () {
        return this.happeningId;
    },
    getUseAjax: function () {
        return this.useAjax;
    },
    setUseAjax: function (flag) {
        this.useAjax = flag;
        if (this.formSubmitDelegated) return;
        var self = this;
        $(document).delegate('#' + self.getWidget().attr('id') + ' form', 'submit', function(e){
            if (!self.useAjax) {return true;}
            e.preventDefault();
            var $form = $(this);
            $.post($form.attr('action'), $form.serialize(), function(data){
                if (typeof data == 'object') {
                    if (!data.error) {
                        self.getSuccess()(self, data);
                    } else {
                        self.getFailure()(self, data);
                    }
                    self.handleJsonResponse(data);
                }
            });
            return false;
        });

        this.formSubmitDelegated = true;

    },
    getSuccess: function() {
        return this.success;
    },
    getFailure: function() {
        return this.failure;
    },
    getOpenButton: function() {
        return this.openButton;
    },
    handleJsonResponse: function(data) {
        if (data.error) {
            var msg = '';
            if (data.message.join) {
                msg = data.message.join('. ');
            } else {
                msg = data.message;
            }
            JobGo.Notice.setError(msg);
        } else {
            if (data.message) {
                var msg = '';
                if (data.message.join) {
                    msg = data.message.join('. ');
                } else {
                    msg = data.message;
                }
                JobGo.Notice.setNotice(msg);
            }
        }
        this.getWidget().dialog('close');
    },
    setEventName: function(name) {
        $('#ui-dialog-title-'+this.getWidget().attr('id')).find('.happening-meeting-widget-request-happeningname').html(name);
    },
    setParticipantId: function(id) {
        this.participantId = id;
        this.onSetParticipantId();

    },
    getParticipantId: function() {
        return this.participantId;
    },

    getWidget: function() {
        return this.widget;
    },
    getOpenButtons: function() {
        return this.openButtons;
    },
    onSetParticipantId: function() {
        this.updateDialogContent();
    },
    updateDialogContent: function() {
        var self = this;
        $.get(this.getDialogContentUrl(), function(data) {
            if (typeof data == 'object') {
                self.handleJsonResponse(data);
            }
            self.getWidget().html(data);
        });
    }
});


JobGo.Happening.Meeting.Widget.Confirm = function($widget, $openButtons, success, failure, params) {
    this.widget = $widget;
    this.openButtons = $openButtons;
    this.openButton = null;
    this.useAjax = false;

    if (!success) {
        success = function() {};
    }
    if (!failure) {
        failure = function() {};
    }

    this.success = success;
    this.failure = failure;
    this.init();
}
$.extend(JobGo.Happening.Meeting.Widget.Confirm.prototype, JobGo.Happening.Meeting.Widget.Request.prototype, {
    getDialogContentUrl: function() {
        return '/happening/confirmmeetingdialog/id/' + this.getParticipantId();
    },
    setEventName: function(name) {
        $('#ui-dialog-title-'+this.getWidget().attr('id')).find('.happening-meeting-widget-confirm-happeningname').html(name);
    }
});


if (typeof JobGo.Widget == 'undefined') {
    JobGo.Widget = {

    }
}

JobGo.Widget.FormDialog = function($widget, $openButtons, params) {
    this.widget = $widget;
    this.openButtons = $openButtons;
    this.openButton = null;
    this.useAjax = false;


    this.eventSubmitSuccess = new Talentor.Event('submitSuccess');
    this.eventSubmitFailure = new Talentor.Event('submitFailure');
    this.eventBeforeOpen = new Talentor.Event('beforeOpen');
    this.eventAfterOpen = new Talentor.Event('afterOpen');
    this.eventBeforeSubmit = new Talentor.Event('beforeSubmit');


    this.init(params);
}

$.extend(JobGo.Widget.FormDialog.prototype, {
    init: function (params) {
        if (params.eventBeforeOpen) {
            this.eventBeforeOpen.bind(params.eventBeforeOpen);
        }
        if (params.eventAfterOpen) {
            this.eventAfterOpen.bind(params.eventAfterOpen);
        }
        if (params.eventSubmitSuccess) {
            this.eventSubmitSuccess.bind(params.eventSubmitSuccess);
        }
        if (params.eventSubmitFailure) {
            this.eventSubmitFailure.bind(params.eventSubmitFailure);
        }
        if (params.eventBeforeSubmit) {
            this.eventBeforeSubmit.bind(params.eventBeforeSubmit);
        }



        var self = this;
        this.getOpenButtons().each(function(i, e){
            $(this).click(function(e){
                e.preventDefault();
                e.stopPropagation();
                self.openButton = $(this);
                self.eventBeforeOpen.trigger([self]);
                self.getWidget().dialog('open');
                self.eventAfterOpen.trigger([self]);
            });
        });
    },
    getWidget: function() {
        return this.widget;
    },
    getOpenButtons: function() {
        return this.openButtons;
    },
    getUseAjax: function () {
        return this.useAjax;
    },
    setUseAjax: function (flag) {

        this.useAjax = flag;

        if (this.formSubmitDelegated) return;

        var self = this;

        $(document).delegate('#' + self.getWidget().attr('id') + ' form', 'submit', function(e){
            if (!self.useAjax) {return true;}

            e.preventDefault();

            var $form = $(this);

            self.eventBeforeSubmit.trigger([self, $form]);

            $.post($form.attr('action'), $form.serialize(), function(data){
                if (typeof data == 'object') {

                    self.handleJsonResponse(data);

                    if (!data.error) {
                        self.eventSubmitSuccess.trigger([self, data, $form]);
                    } else {
                        self.eventSubmitFailure.trigger([self, data, $form]);
                    }

                }
            });
            return false;
        });

        this.formSubmitDelegated = true;

    },
    getOpenButton: function() {
        return this.openButton;
    },
    handleJsonResponse: function(data) {

        if (data.error) {
            var msg = '';
            if (data.message.join) {
                msg = data.message.join('. ');
            } else {
                msg = data.message;
            }

            if (data.formErrors) {
                var form =  $('#' + this.getWidget().attr('id') + ' form');
                if (form) {
                    var validator = form.validate();
                    if (validator) {
                        var formErrors = {};

                        for (var i in data.formErrors) {
                            formErrors[i]='';
                            for (var j in data.formErrors[i]) {
                                formErrors[i] += data.formErrors[i][j];
                            }
                        }
                        validator.showErrors(formErrors);
                    }
                }
            }
            JobGo.Notice.setError(msg);
        } else {
            if (data.message) {
                var msg = '';
                if (data.message.join) {
                    msg = data.message.join('. ');
                } else {
                    msg = data.message;
                }
                JobGo.Notice.setNotice(msg);
            }
        }
    },
    setTitle: function(title) {
        $('#ui-dialog-title-'+this.getWidget().attr('id')).html(title);
    }
});

JobGo.Widget.ConfirmDialog = function($widget, $openButtons, params) {
    this.widget = $widget;
    this.openButtons = $openButtons;
    this.openButton = null;

    var self = this;

    if (!params) {
        params = {};
    }

    this.init(params);
}

$.extend(JobGo.Widget.ConfirmDialog.prototype, {
    init: function (params) {
        var self = this;
        this.getOpenButtons().each(function(i, e){
            self.addOpenButton($(this));
        });
    },
    addOpenButton: function ($element) {
        var self = this;
        $element.click(function(e){

            self.openButton = $(this);
            self.event = e;

            if (self.getOpenButton().data('isConfirming')) return;

            e.preventDefault();

            self.setMessage(self.getOpenButton().attr('title'));

            self.open();
        });
    },
    open: function () {
        this.getWidget().dialog('open');
    },
    setMessage: function (message) {
        this.getWidget().find('.confirm-dialog-content').html(message);
    },
    confirm: function (message, allowAction) {
        if (message) this.setMessage(message);
        this._allowAction = allowAction;
        this.open();
    },
    getWidget: function() {
        return this.widget;
    },
    getOpenButtons: function() {
        return this.openButtons;
    },

    getOpenButton: function() {
        return this.openButton;
    },
    allowAction: function() {
        var event = this.event;
        this.getOpenButton().data('isConfirming', true);
        this.getOpenButton().data('isConfirmed', true);

        this.getOpenButton().click();
        if (this.getOpenButton().hasClass('jobgo-confirm-follow-link') && this.getOpenButton().attr('href')) {
            JobGo.Nav.goToUrl(this.getOpenButton().attr('href'));
        }
        this.getOpenButton().data('isConfirming', null);

        if (this._allowAction) {
            this._allowAction();
        }
        this._allowAction = null;
    }
});


$.extend(JobGo.Form.BillingInformation.Source.Json.prototype, {
    cache: null,
    execute: function(caller) {
        var companyId = this.companyId;
        var me = this;

        if (this.cache) {
            caller.setCompanyInfo(this.cache);
            return;
        }
        $.get('/company/viewjson',
            {'id':companyId},
            function(data) {
                if (data.code) {

                    return;
                }
                if (null == me.cache) {
                    me.cache = $.extend(
                        me.getDataFromCompany(data),
                        me.getDataFromBillingInformation(data)
                    )
                }

                caller.setCompanyInfo(me.cache);
            },
            'json'
        )
    },
    getDataFromBillingInformation: function (data) {
        if (!data.BillingInformation) {return {}}
        if (!data.BillingInformation.ID) {return {}}

        data = data.BillingInformation;

        var res = {
            LOCATION_ID:'',
            LOCATION:'',
            POSTAL:(data.POSTAL) ? data.POSTAL : '',
            VAT: (data.VAT) ? data.VAT : '',
            NAME: (data.COMPANY) ? data.COMPANY : '' ,
            ADDRESS: (data.ADDRESS) ? data.ADDRESS: ''
        }

        if (data.LocHeap) {
            if (data.LOCATION_ID) res.LOCATION_ID = data.LOCATION_ID;
            if (data.LocHeap) {
                res.LOCATION =
                    data.LocHeap.City
                  + ', '
                  + data.LocHeap.Region
                  + ', '
                  + data.LocHeap.Country;
            }
        }
        
        return res;
    },
    getDataFromCompany: function(data) {
        var res = {
            LOCATION_ID:'',
            LOCATION:'',
            POSTAL: '',
            VAT: (data.VAT) ? data.VAT : '',
            COMPANY: (data.NAME) ? data.NAME : '' ,
            ADDRESS: ''
        }

        if (data.NAME) $('#billing_information_company').val(data.NAME);
        if (data.CompanyLocation) {
            if (data.CompanyLocation.ADDRESS) res.ADDRESS = data.CompanyLocation.ADDRESS;
            if (data.CompanyLocation.POSTAL) res.POSTAL = data.CompanyLocation.POSTAL;
            if (data.CompanyLocation.LOCATION_ID) res.LOCATION_ID = data.CompanyLocation.LOCATION_ID;
            if (data.CompanyLocation.LocHeap) {
                res.LOCATION =
                    data.CompanyLocation.LocHeap.City
                  + ', '
                  + data.CompanyLocation.LocHeap.Region
                  + ', '
                  + data.CompanyLocation.LocHeap.Country;
            }
        }
        return res;
    }
});
$.extend(JobGo.Form.BillingInformation.Source.CompanyCreateForm.prototype, {
    execute: function(caller) {
        var res = {
            COMPANY: this.form.find('[name=NAME]').val(),
            LOCATION_ID: this.form.find('#location-__MULTIPLIER__index__').val(),
            LOCATION: this.form.find('#location-__MULTIPLIER__index___HR').val(),
            ADDRESS: this.form.find('#address-__MULTIPLIER__index__').val(),
            POSTAL: this.form.find('#postal-__MULTIPLIER__index__').val()
        }
        caller.setCompanyInfo(res);
        return res;
    }
});

JobGo.apiUrl = '';
JobGo.apiServer = null;

JobGo.api = function (path, params) {
    if (!JobGo.apiServer) {
        JobGo.apiServer = new jQuery.Zend.jsonrpc({url:JobGo.apiUrl});
    }
    return JobGo.apiServer.api(path, params)
}



JobGo.asyncApi = function (path, params, success, error) {
    if (!JobGo.asyncApiServer) {
        JobGo.asyncApiServer = new jQuery.Zend.jsonrpc({url:JobGo.apiUrl, async:true});
    }

    if (!error) {
        error = function () {};
    }

    if (!success) {
        success = function () {};
    }

    return JobGo.asyncApiServer.api(path, params, {
        success:success,
        error:error

    });
}

JobGo.asyncApi.prototype.success = function () {

}


JobGo.Three60 = {
    PersonSource: {

    }
};