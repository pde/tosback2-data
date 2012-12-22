
/*de.bild.liveArticle:27524130.5*/

var de = de || {};
de.bild = de.bild || {};
de.bild.liveArticle = (function($, SandBox) {
 var liveArticle = null,
 
     settings = {
   'activeClass' : 'active',
   'storageKey' : 'de.bild.liveArticle',
   'checkForNewMessagesInterval': 30000,    // in ms
   'defaultNumberOfMessages': 11,
   'MESSAGE_FILTER_PREFIX': 'Meldungen_',
   'NO_NEW_MESSAGES': 'KEINE NEUEN MELDUNGEN',
   'NEW_MESSAGES': ' NEUE MELDUNGEN',
   'ONE_NEW_MESSAGE': '1 NEUE MELDUNG',
   'MORE_THAN_TEN_NEW_MESSAGES': 'MEHR ALS 10 NEUE MELDUNGEN',
   'refreshClass' : 'refresh',
   'refreshingClass': 'refreshing',
   'manualRefreshClass': 'refreshButton',
   'autoUpdateInterval': 30000    // in ms
  },
  
  storage;
 
 var eventController = null;
 
 function init( $domNode ) {
     
     if(!eventController) {
            eventController = SandBox.getActionEvents('liveArticle'); 
        }     
  
  storage = SandBox.getStorage();
   
  if( !liveArticle && !SandBox.moduleIsInitialized($domNode) ) {
   liveArticle = LiveArticle.init( $domNode );
   return liveArticle;        
  }
    
        return false;  
 }
 
 
  
 
 
 
 
 
 
 
 var LiveArticle = {
     
     
     /** Module Variables, Properties, Maps */
     
     liveArticle : this,
     $container : null,
     $filterHeader : null,
        $refreshButton : null,
     jsonUrl : null,
     $htmlResponse: null,
     jsonData: null,
     $msgContainer : null,
     filters : {},
     userFilter : {
                "Sortierung": "Meldungen_absteigend",
                "Aktualisierung": "manuell"
        },
     autoUpdate : false,
     
     messageList : [],
     allMessages : [],
     hasNewMessages: false,
     
     lastModifiedSince: null,
     
     $autoRefreshCheckbox : null,
     
     currentFilter: '',
     currentFilterOption: '',
     currentSorting: 'asc',
     
     sortingOrderMap : {
         
         'asc' : 'aufsteigend',
         'desc' : 'absteigend'
         
     },
     
     autoUpdateTimer : null,
     checkForNewMsgTimer : null,
     newMessagesRequestFinished : true,
     
     $newMessagesStatus: null,
     
     messagesLabel : "Meldungen_",     
     
     jsonSuffixForFilterOptionMap : {
         
         'all' : '',
         'highlight' : '_highlights',
         'media' : '_media'
         
     },
     
     
     
     
     /** Methods */
     
     /** Init is called by the factory
      *  Sets all DOM references and triggers setup and ui-event binding
      *  @param $domElem - jQuery Object, representing the liveticker container
      *  */
     init: function( $domElem ){
         
         this.$container = $domElem;
         this.$filterHeader = $domElem.find('header');
         this.$autoRefreshCheckbox = $domElem.find('#refresh');
         this.$listContainer = $domElem.find('section').find('ol').first();
         this.$refreshButton = this.$filterHeader.find('.refreshButton');
         this.$filterOption = this.$filterHeader.find('#sort-filter');
         this.$sortingButtons = this.$filterHeader.find('.messageSorting');
         this.$newMessagesStatus = this.$filterHeader.find('.newMessagesStatus');
         this.jsonUrl = this.$container.attr('data-json-url');
         this.currentFilterOption = this.$filterOption.find('option:selected').val();
         settings.storageKey = settings.storageKey + '-' + this.$container.attr('data-lt-id');
         this.setup();        
         
         this.bindUiEvents();
         return this;
         
     },
     
     /** Fetches the JSON and start all methods needed by the liveticker
      * 
      *  Additionally subscribes to global events.
      *
      * */
     setup : function(){
                        
            var _this = this;
                        
            $.when( this.fetchJSON() )
            .done( function(){
                
                _this.getUserSettings();            
                _this.applyFilters();
                
                if(!_this.eventHasEnded()) {
                    _this.resetNewMessagesTimer();
                } else {
                    _this.setEventEndedState();
                }
                                                                
                SandBox.setModuleInitialized(_this.$container);                
                                
            })
            .fail( function(){
                console.error('Live Article: Could not start Live-Ticker.');
            });
            
            $.subscribe('liveArtikel.filterChanged', function(modifyView){
                if(modifyView) {
                    _this.modifyFilterValue();
                }                
                _this.loadAndShowNewMessagesForCurrentFilter();
            });
            
            $.subscribe('liveArtikel.hasNewMessages', function(){
                if(_this.autoUpdate) {                    
                    _this.reloadMessages();
                }
            });
            
        },     
     
     
     /** 
         *  Binds events to user interaction
         * 
         * */
     bindUiEvents: function(){
         
         var _this = this;
         
         /* Refresh Button */
         this.$refreshButton.on(eventController.click, function(event){             
             event.preventDefault();
             
                if(!_this.hasNewMessages) {
                    console.info('Live Article: No new messages to update');
                    return false;
                }
             
             _this.$refreshButton.removeClass(settings.refreshClass).addClass(settings.refreshingClass);        
             _this.reloadMessages();
             
         });
         
         
         /* Auto-Update checkbox */
         this.$autoRefreshCheckbox.on('change', function(){
             
             if($(this).attr('checked')) {
                    _this.userFilter.Aktualisierung = "auto";
                    _this.autoUpdate = true; 
             } else {
                 _this.userFilter.Aktualisierung = "manuell";
                 _this.autoUpdate = false;
             }
             
             _this.saveUserSettings();             
             _this.triggerAutoUpdater();
             
         });
         
         
         
         /* Select filter with options  */
         this.$filterOption.change(function(){
                               
                _this.currentFilterOption = _this.$filterOption.find('option:selected').val();                
                _this.updateFilter();
                
            });
            
            
            
         /* ASC-DESC Sorting Links */
         this.$sortingButtons.on(eventController.click, function(event){
             
             event.preventDefault();
                             
                _this.currentSorting = $(this).attr('data-sorting-order');
                               
                _this.updateFilter();
                
            });
         
     },
     
     
     
     
     eventHasEnded: function(){
         
         if (this.filters.EventEndeText === true) {
             return true;
         }
         
         
     },
     
     
     setEventEndedState: function(){
         
         this.autoUpdate = false;
            this.triggerAutoUpdater();
         
         this.currentSorting = 'desc';
         this.modifyFilterValue();
         
     },
     
     
     showHiddenElements: function(){
         
         var _this = this;
         
         //this.$window.scroll(function(){
                this.$listContainer.find('.hide').removeClass('hide');
         //});
         
     },
     
     
     
     reloadMessages: function() {
         
         var _this = this;
         
         if(!this.hasNewMessages) {
                console.info('Live Article: No new messages to update');
                return false;
            }
            
            this.hasNewMessages = false;
            
            $.when( this.fetchJSON() )
            .done( function(){
                _this.getNumberOfNewMessages();
                _this.loadAndShowNewMessagesForCurrentFilter();
            })
            .fail( function(){
                console.warn('Live Article: Could not fetch JSON and display new messages.');
            });
     },
     
     
     /** 
         *  Get messages for current Filter and add them to DOM.
         *  Additionally reset the auto-check for new messages.
         *
         * */
     loadAndShowNewMessagesForCurrentFilter: function(){
         
         this.resetNewMessagesTimer();         
         
         this.getMessagesForCurrentFilter( this.jsonData );                    
            this.displayMessagesForCurrentFilter();
            
            this.reinitContent();
            
            this.$refreshButton.removeClass(settings.refreshingClass);
            
            this.showHiddenElements();
            
     },
     
     /** 
         *  Reinitializes modules and custom widgets, e.g. Twitter Embed Blockquote
         *
         * */
     reinitContent: function(){
         
         SandBox.initModules( this.$listContainer );
         
         /* Twitter */
         if(window.twttr && twttr.widgets) {
             twttr.widgets.load();
         }
         
     },
     
     
     resetNewMessagesTimer: function(){
         
         if(this.eventHasEnded()) {
             return false;
         }
         
         var _this = this;
         
         if(this.checkForNewMsgTimer){
             clearInterval(this.checkForNewMsgTimer);
         }
         
         this.checkForNewMsgTimer = setInterval( function(){
                _this.getNumberOfNewMessages();
            }, settings.checkForNewMessagesInterval);
         
     },
     
     
     /** 
         *  Constructs {String}currentFilter from all three filters (auto-update, sorting order and filter).
         *  Additionaly saves the filter in the user object.
         *
         * */
     updateFilter : function(){
         
         this.currentFilter = this.messagesLabel + this.sortingOrderMap[this.currentSorting] + this.jsonSuffixForFilterOptionMap[this.currentFilterOption];
            this.userFilter.Sortierung =  this.currentFilter;
            
            $.publish('liveArtikel.filterChanged');
            this.saveUserSettings();
         
     },
     
     
     /** 
         *  Sets correct selected index for the dropdown list of filters, depending on current filter
         *
         * */
        modifyFilterValue : function(){
            
            var filterSuffix = 'all';
            if(this.currentFilter.indexOf('media') !== -1) {
                filterSuffix = 'media';
            } else if (this.currentFilter.indexOf('highlight') !== -1) {
                filterSuffix = 'highlight';
            }
                                    
            this.$filterOption.find('option').filter(function() {
                return $(this).val().indexOf(filterSuffix) !== -1; 
            }).attr('selected', true);
            
            
            this.$sortingButtons.removeClass(settings.activeClass);            
            if(this.currentSorting === 'asc') {
                this.$sortingButtons.filter('[data-sorting-order="asc"]').addClass(settings.activeClass);
            } else {
                this.$sortingButtons.filter('[data-sorting-order="desc"]').addClass(settings.activeClass);
            }
            
        },
     
     
     triggerAutoUpdater: function(){
         
         var _this = this;
         
         if(this.autoUpdate) {
             this.autoUpdateTimer = setInterval(function(){
                 _this.reloadMessages();
             }, settings.autoUpdateInterval);
         } else {
             clearInterval(this.autoUpdateTimer);
         }
     },
     
     
     
     saveUserSettings: function(){
                 
         try {
            storage.set( settings.storageKey, JSON.stringify(this.userFilter) );
         } catch(err){
                console.warn('Live Article: An Error occured while saving user settings.');
            }
        
     },
     
     
     /** 
      * Get User settings from session storage. If no user settings found, assign default settings from JSON.
      **/
     getUserSettings: function(){
         
         var uSettings = null;
         
         try {
                uSettings = storage.get( settings.storageKey );    
         } catch(err) {
             console.info('Live Article: User settings not found.');
         }
         
          
         if(!uSettings) {
             this.userFilter.Sortierung = this.filters.Sortierung;
             this.userFilter.Aktualisierung = this.filters.Aktualisierung;
             return false;
         }
         
         try {             
             this.userFilter = JSON.parse( uSettings );
         } catch(errFilter){
             console.warn('Live Article: Error while parsing user settings to JSON. Storage key exists but isn\'t a valid JSON and will be removed.');
             storage.remove( settings.storageKey );
         }
         
         
     },
     
     /** 
      *  Applies user filters and JSON filters to the current filter.  
         *  Strikt filters from JSON override user filters.
         * 
         * */
     applyFilters: function(){
         /* Aktualisierung */        
        if( this.filters.AktualisierungStrikt ) {
                this.autoUpdate = this.filters.Aktualisierung === "auto" ? true : false;
            } else {
                this.autoUpdate = this.userFilter.Aktualisierung === "auto" ? true : false;
            }
            
            if(this.autoUpdate) {
                this.triggerAutoUpdater();
            }
            
           /* Sortierung */           
           if( this.filters.SortierungStrikt ) {
                this.currentSorting = this.filters.Sortierung.toString().indexOf('absteigend') !== -1 ? 'desc' : 'asc';
                this.currentFilter = this.filters.Sortierung;
                return true;
           }
           
           if( this.userFilter.Sortierung != this.filters.Sortierung ) {
                this.currentSorting = this.userFilter.Sortierung.toString().indexOf('absteigend') !== -1 ? 'desc' : 'asc';
                this.currentFilter = this.userFilter.Sortierung;
                $.publish('liveArtikel.filterChanged', true);
           }
           
           /* Set default Filter */
            if (this.currentFilter === "") {
                this.currentFilter = this.messagesLabel + this.sortingOrderMap[this.currentSorting] + this.jsonSuffixForFilterOptionMap[this.currentFilterOption];
            }
            
     },
     
     
     /** 
      *  Sends a HEAD-Request to check for new messages.
         *
         * */
     getNumberOfNewMessages: function(){
         
         var _this = this;
         
         if( !this.newMessagesRequestFinished ) {
             return false;
         }
         
         this.newMessagesRequestFinished = false;
      
         $.ajax({
             
                url: _this.jsonUrl,
                type: 'HEAD',
                cache: true
                
            }).done(function( message, text, response ) {
                
                var newMsgCount = _this.numberOfNewMessages( response.getResponseHeader('X-LiveTicker-Messages') );
                
                _this.displayNumberOfNewMessages(newMsgCount);
                
                if(newMsgCount) {                    
                    $.publish('liveArtikel.hasNewMessages');
                    _this.hasNewMessages = true;
                    _this.$refreshButton.addClass(settings.refreshClass);
                } else {
                    _this.hasNewMessages = false;
                    _this.$refreshButton.removeClass(settings.refreshClass);
                }
                
                _this.newMessagesRequestFinished = true;
                                
            }).fail(function() {                
                console.warn('Live Article: getNumberOfNewMessages - AJAX failed.');
                _this.newMessagesRequestFinished = true;
            });
         
     },
     
     
     displayNumberOfNewMessages: function(newMsgCount){
         
         switch (newMsgCount) {
                    
                case 0:
                    this.$newMessagesStatus.html(settings.NO_NEW_MESSAGES);
                    break;
                
                case 1:
                    this.$newMessagesStatus.html(settings.ONE_NEW_MESSAGE);
                    break;
                
                default:
                    if(newMsgCount <= 10) {
                        this.$newMessagesStatus.html(newMsgCount + settings.NEW_MESSAGES);
                    } else {
                        this.$newMessagesStatus.html(settings.MORE_THAN_TEN_NEW_MESSAGES);
                    }
                    break;                    
            }
         
     },
     
     
     /** 
         *  Compars current message list with the given messages and return the number of new messages, which aren't in the current list.
         *  @param {Array} messages
         *  @return {Integer} number of new messages 
         * */
     numberOfNewMessages: function( messages ){
            
            var counter = 0;
            
            if(!messages) {
                return counter;
            }            
            messages = messages.split(',');
            
            var i = 0;
            for(i = 0; i < messages.length; i++) {
                messages[i] = parseInt(messages[i]);
                if( jQuery.inArray(messages[i], this.allMessages) === -1 ) {
                    counter++;
                }
            }                      
           
            return counter;
            
        },
     
     /** 
         *  Saves all messages from the given {JSON} MessageList into a global variable. 
      *  Only visible messages will be saved.
         *  @param jsonMsgList - {JSON} messages, wrapped in days e.g. {"2012-10-30": messages[{"id": 123}, {"id": 456}]}
         * */
     pushMessageIds: function( jsonMsgList ){
         
         var _this = this;         
         this.allMessages = [];       
         $.each( jsonMsgList, function(){                                
                $.each( this.messages, function(){                 
                    if( this.visible != "false" ) {
                        _this.allMessages.push(this.id);
                    }
                });
            });    
         
     },
     
     
     /** 
         *  Applies the current filter and saves all corresponding messages from the given {JSON} data into a global variable. 
         *  Only visible messages will be saved.
         *  @param data - {JSON} messages, wrapped in days e.g. {"2012-10-30": messages[{"id": 123}, {"id": 456}]}
         * */
     getMessagesForCurrentFilter: function ( data ) {
         
         var _this = this;
         
         var counter = 0;
         this.messageList = [];
         
         $.each( data[this.currentFilter], function(){
             _this.messageList.push(this.id);
             counter = 0;
             
             $.each( this.messages, function(){              
                 if( this.visible != "false" ) {
                     counter++;
                     _this.messageList.push(this.id);
                 }
             });
            
             if( counter === 0 ) {
                 _this.messageList.pop();
             }
             
         });
         
     },
     
     /** 
         *  Fetches the complete JSON for the LiveArticle. 
      *  OnSuccess saves the filters from the JSON and pushes all ascending messages into a global variable. 
         *  This method uses the jQuery Deffered Object.
         *  @return {jQuery} promise
         * */
     fetchJSON: function(){
            
            var _this = this;
            
            var deferred = $.Deferred();
            
            try {
                
                
                $.getJSON( this.jsonUrl, function(response, statusText, jqXHR) {
                
                    _this.jsonData = response;
                    _this.$htmlResponse = $(_this.jsonData.html);
                    
                    _this.filters = {
                        "Sortierung" :              _this.jsonData.Sortierung,
                        "SortierungStrikt" :        _this.jsonData.SortierungStrikt,
                        "Aktualisierung" :          _this.jsonData.Aktualisierung,
                        "AktualisierungStrikt" :    _this.jsonData.AktualisierungStrikt,
                        "EventEndeText" :           _this.jsonData.EventEndeText,
                        "InitialeAnzahlElemente" :  _this.jsonData.InitialeAnzahlElemente,
                        "Layout" :                  _this.jsonData.Layout
                    };
                                        
                    _this.pushMessageIds( _this.jsonData.Meldungen_aufsteigend );
                                        
                    deferred.resolve();
                
                });
                
            } catch(err) {
                deferred.reject();
                console.error('Live Article: failed to load and parse JSON (invalid JSON or the server responded with an error)');
            }
            
            return deferred.promise();
            
        },
     
     
    /** 
         *  Appends all messages (which were saved previously for current filter) into the DOM Container
         *  
         * */
     displayMessagesForCurrentFilter: function(){
            
            var _this = this;            
            this.$listContainer.empty();
            var i = 0;
            
            for(i=0; i < this.messageList.length; i++) {
                this.$listContainer.append( this.$htmlResponse.find('#'+this.messageList[i]).clone() );
            }
            
        },
        
        
        
        pushFreshMessagesInCorrectOrder: function(){
            
            var _this = this;
            var i = 0;
            for(i = 0; i < this.messageList.length; i++) {
                if(this.$listContainer.find('#'+this.messageList[i]).length === 0) {
                    
                    if(this.currentSorting === "asc") {
                        this.$listContainer.append( this.$htmlResponse.find('#'+this.messageList[i]) );
                    } else {
                        this.$listContainer.prepend( this.$htmlResponse.find('#'+this.messageList[i]) );
                    }
                    
                }
                
            }
        }     
     
     
     /** Methods END */
     
 }
  
 return {
  
  'init': function( $domNode ) {
   return init($domNode);
  },
  'getLiveArticle' : function() {
      return LiveArticle;
  }
  
 }
 
 
})(jQuery, de.bild.globalSandBox);