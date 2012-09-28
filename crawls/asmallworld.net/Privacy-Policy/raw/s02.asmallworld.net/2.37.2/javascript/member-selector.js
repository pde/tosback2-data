
		var friendIndex = new Array();
		var friendList = new Array();
		var sectionArray = new Array();
		var shareCount = 0;
		var checkAllSelected = false;
		var memberList = "";

    var ASW_MS = {};

		ASW_MS.render = function( _list, type ){
      shareCount = 0;

			var _node = document.getElementById( "member-list" );
      var memberListStr = "";

			for( var i = 0; i < _list.sections.length; i++ ){

				var _li = document.createElement( "li" );
        var _letter_header = document.createElement( "h4" );
				_li.className = "letter-item";
				_li.id = "section" + _list.sections[i].value;
				var _text = document.createTextNode( _list.sections[i].value );
				_letter_header.appendChild( _text );
				_li.appendChild(_letter_header);
				_node.appendChild( _li );

				sectionArray[i] = _list.sections[i].value;

				for( j = 0; j < _list.sections[i].members.length; j++ ){

					var _li = document.createElement( "li" );
					_li.id = "LI_" + _list.sections[i].members[j].id;
					_li.className = "member-item";

          var _text = document.createTextNode( _list.sections[i].members[j].name );
          id = _list.sections[i].members[j].id;

					var _check = document.createElement( "input" );
					_check.type = "checkbox";
          _check.className = "checkbox";
					_check.value = _list.sections[i].members[j].name;
					_check.id = id;
					_check["onclick"] = function(){
						memberSelected( this );
					}
					_li.appendChild( _check );

          if( !_list.sections[i].members[j].notify ){
            if ( type != "share" ) shareCount++;
						else _check.disabled = true;
            memberListStr += ( memberListStr == "" ) ? id : "," + id;
            _check.checked = true;
          }
					
          var _memberName= document.createElement( "label" );
          _memberName.setAttribute("for", id);
          _memberName.appendChild(_text);
					_li.appendChild( _memberName );
					_node.appendChild( _li );
				}

			}

			renderAlphabetList( sectionArray );

      if ( getSerializedList() != "" ) {
        document.getElementById( "member-list-temp").value = getSerializedList();
        deserialize();
      } else if ( type == "share" ){
        document.getElementById( "member-list-temp").value = memberListStr;
      }

	  
	    /* Initialize alphabet links to left of scrollbar ***********************/
	    // Need to position dynamically since scroller width varies cross browser
	    // and positioning relative to the member list causes alphabet to scroll 
	  
	    var alphaList = jQuery("#alphabet-list");
	    var scrollbarWidth =  getScrollBarWidth();
	  
	    alphaList.css( { 'right' : scrollbarWidth + "px" } );
	    alphaList.show();
			
			jQuery("#member-search h3").append("(" + _list.count + ")");
	
	    /* Initialize member selector */
	
	    /* Autocomplete code that we may need later... 
	    var memberNameField = jQuery("#member-selector-name"); 
			jQuery(memberNameField).focus(function() {
				this.value = "";
			})     
	    var source_url = "/service/network";    
	
	    var datasource = new jQueryDataSource(source_url);
	    datasource.scriptQueryParam = "name";
	    datasource.scriptQueryAppend = "type=json&max=50";
	    datasource.connTimeout = 3000;
	    
	    modAutoComplete.create("member-selector-name", "member-selector", datasource, {
	      pageSize : 5, 
	      minQueryLength : 3,
	      forceSelection : false, 
	      queryDelay : 0, 
	      cityField : false,
	      regionField : false,
	      setRegion : false,
	      arrowText : "new-",
				autocompleteType : "member-selector",
				scrollbarsToHide : [jQuery('#member-list-wrp')],
	      formatResult : function(item, query){
	        var name = item.name;
	        var userId = item.id;
					
          var html = [];
          html.push("<span class='autocomplete-item'>");
          html.push(modAutoComplete.onFormatName(name, query));
          html.push("</span>");
          return html.join(""); 

	      },
				preRequest: function(query){
					return true;
		    }
	    });
      */

		}

    function initializeInput( _list ){
      var memberListStr = "";
      for (var i = 0; i < _list.sections.length; i++) {
        for (j = 0; j < _list.sections[i].members.length; j++) {
          if (!_list.sections[i].members[j].notify) {
            id = _list.sections[i].members[j].id;
            memberListStr += ( memberListStr == "" ) ? id : "," + id;
          }
        }
      }
      document.getElementById( "member-list-input" ).value = memberListStr;
		}
    
		function memberSelected( _obj ){
		 
			if( checkAllSelected || _obj.checked ){
        addIdToHiddenInput( _obj.id );
				addToShareList( _obj );
			}
		
			if( _obj.checked == false ){
				removeUsingId( _obj.id );
			}
		}
    
    function scrollToLetter(sectionEl, listEl, wrapperEl){
      var letterObj = document.getElementById(sectionEl);
      var listObj = document.getElementById(listEl);
      var wrapperObj = document.getElementById(wrapperEl);
      var listHeight = listObj.offsetHeight;
      var maxScroll = listHeight - 425;
      var letterY = jQuery(letterObj).position().top;
      var listY = jQuery(listObj).position().top;
			var letterY = letterY - listY;
      if ( letterY > maxScroll) letterY = maxScroll;
      wrapperObj.scrollTop = letterY;
    }
		
		function renderAlphabetList( _sectionList ){
			var initAlphabetList = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
			var _node = document.getElementById( "alphabet-list" );
			
     var match = false;
     for( var a = 0; a < initAlphabetList.length; a++ ){
       for( var l = 0; l < _sectionList.length; l++ ){
         if( initAlphabetList[a].toUpperCase() == _sectionList[l].toUpperCase() ){
           match = true;
           break;
         }
       }
       if (match) {
          var _liEl = document.createElement( "li" );
						
					var _a = document.createElement( "a" );
          _a.href = "javascript: scrollToLetter('section" + initAlphabetList[a].toUpperCase() + "', 'member-list', 'member-list-wrp')";
          						
					var _text = document.createTextNode( initAlphabetList[a].toUpperCase() );
					
					_a.appendChild( _text );
					_liEl.appendChild( _a );
					_node.appendChild( _liEl );
          
         match = false;
       }
       else {
         var _liEl = document.createElement( "li" );
          _liEl.className = "disabled";
					
					var _text = document.createTextNode( initAlphabetList[a].toUpperCase() );
					
					_liEl.appendChild( _text );
					_node.appendChild( _liEl );
       }
     }

		}

    function getMemberIdFromElement(idString) {
     return idString.substring(idString.search("_") + 1)
    }

    function addIdToMemberList( id ) {
      var inputEl = document.getElementById( "member-list-input" );
      var idArray = inputEl.value.split(",");
      for (i = 0; i < idArray.length; i++) {
        if (idArray[i] == id) return
      }
      inputEl.value += ( inputEl.value == "" ) ? id : "," + id; 
    }

    function removeFromHiddenInput( id ) {
      var inputEl = document.getElementById( "member-list-temp" );
      var idArray = inputEl.value.split(",");
      for (i = 0; i < idArray.length; i++) {
        if (idArray[i] == id) {
          idArray.splice(i, 1);
          break;
        }
      }
      inputEl.value = idArray.join(","); 
    }
    
    function clearHiddenInput() {
      document.getElementById("member-list-temp").value = "";      
    }

		function addToShareList( obj ){
      if (obj == null) return;
      if (!obj.checked) obj.checked = "checked";

			var shareList = document.getElementById( "selected-members-list" );
			var elementId = "SE_" + obj.id;

      var _checkbox = document.createElement( "input" );
			_checkbox.setAttribute("type", "checkbox");
      _checkbox.setAttribute("class", "checkbox");
      _checkbox.id = elementId;
      _checkbox["onclick"] = function(){
        remove( this );
      };

      var _memberName = document.createElement( "label" );
      _memberName.setAttribute("for", obj.id);
      var _text = document.createTextNode( obj.value );
      _memberName.appendChild(_text);

			var _li = document.createElement( "li" );
      _li.id = "SE_" + obj.id;			
			_li.appendChild( _checkbox );
			_li.appendChild( _memberName );
						
			shareList.appendChild( _li );
      _checkbox.checked = "checked";

      if (!checkAllSelected) enforceMaxHeight();
			
      shareCount++;
		}
    
		function enforceMaxHeight() {

      var parentEl = document.getElementById( "selected-members-list-wrp" );
      var childEl = document.getElementById( "selected-members-list" );
			
      var maxHeight = jQuery(parentEl).css("max-height");     
      if (!maxHeight) maxHeight = jQuery(parentEl).css("height");

      maxHeight = getPixelValue(maxHeight);

      if (childEl.offsetHeight > maxHeight) {      
        jQuery(parentEl).css({ "height" : maxHeight + "px" });
        jQuery(parentEl).css({ "overflow-y" : "scroll" });
      } else {
        jQuery(parentEl).css({ "overflow-y" : "hidden" });
        jQuery(parentEl).css({ "height" : "auto" });
      }			
			
		}
		
    function toggleShareDivShadows(state) {
      var topShadow = jQuery('.shareWithContentContainer > .top-shadow')[0];
      var btmShadow = jQuery('.shareWithContentContainer > .btm-shadow')[0];
      if (state) {
        jQuery(topShadow).removeClass('hidden');
        jQuery(btmShadow).removeClass('hidden');
      } else {
        jQuery(topShadow).addClass('hidden');          
        jQuery(btmShadow).addClass('hidden');          
      }
    }
    
    function updateShareScrollbar(operation, count) {
      var listLimit = 17;
      if (!checkAllSelected) {
        var shareDiv = jQuery('.shareWithContentInnerDiv')[0];
        if (operation == "add") {
          if (count > listLimit) {
            if (!jQuery(shareDiv).hasClass('scrollpane')) {
              jQuery(shareDiv).addClass('scrollpane');
              toggleShareDivShadows(true);
            }
            jQuery(shareDiv).jScrollPane({
              showArrows: true,
              scrollbarWidth: 19
            });
          }
        } else {
          if (count == listLimit || count == 0) {
            toggleShareDivShadows(false);
          }
          jQuery(shareDiv).jScrollPane({
            showArrows: true,
            scrollbarWidth: 19
          });
        }
      }
    }
    
		function removeUsingId( _val ){
			var shareList = document.getElementById( "selected-members-list" );
			var _node = document.getElementById( "SE_" + _val );
			shareCount--;
			setListItemState( _val );
      removeFromHiddenInput(_val);					
			shareList.removeChild( _node );	
      if (!checkAllSelected) enforceMaxHeight();
		}
		
		function remove( _val ){
			var shareList = document.getElementById( "selected-members-list" );
			var _node = document.getElementById( _val.id );
			shareCount--;
			setListItemState( _val.id );

			_nodeId = getMemberIdFromElement(_val.id);
      removeFromHiddenInput(_nodeId);
      
			shareList.removeChild( _node );	
      if (!checkAllSelected) enforceMaxHeight();
		}
	
		function setListItemState( _id ){
			var _listItem = document.getElementById( "LI_" + _id.substring( _id.search( "_" ) + 1  ) );
			var _checkItem = document.getElementById( _id.substring( _id.search( "_" ) + 1  ) );
			_checkItem.checked = false;
		}
	
		function updateShareWithCount(){
			var _scount = document.getElementById( "shareCount" );
      var _text = document.createTextNode( " (" + shareCount + ")");

			if( _scount.childNodes.length > 1 )
				_scount.removeChild( _scount.childNodes[1] );
		  
      _scount.appendChild(_text);
			return _scount;
		}
		
		function selectAllMembers(){

      clearHiddenInput();
			checkAllSelected = true;
			clearShareList();
      			
      jQuery(makeCompatibleSelector("#member-list input[@type=checkbox]")).each(function() {
				if (this.id) {
          this.checked = true;
          memberSelected( this );					
				}
			});

      window.setTimeout( function() {
  			checkAllSelected = false;
        enforceMaxHeight();
      }, 500 );
		}
    
		function clearShareList(){

			jQuery("#selected-members-list li").each(function() {
			 var nodeId = getMemberIdFromElement(this.id);
			 jQuery("#" + nodeId).attr("checked", false);
			 jQuery(this).remove();
			 shareCount--;
			});
						
      if (!checkAllSelected) enforceMaxHeight();
			
      clearHiddenInput();
      shareCount = 0;
		}

    function getSerializedList(){
      return document.getElementById("member-list-input").value;
    }
    
    function getHiddenInputValue() {
      return document.getElementById( "member-list-temp" ).value;
    }
    
    function deserialize() {
      checkAllSelected = true;
      var memberList = getHiddenInputValue().split(",");
      
      for (i = 0; i < memberList.length; i++) {
        addToShareList(document.getElementById(memberList[i]));
      }
      
      window.setTimeout( function() {
        checkAllSelected = false;
        enforceMaxHeight();
      }, 500 );
    }

    function serialize() {
      document.getElementById("member-list-input").value = getHiddenInputValue();
      document.getElementById( "member-list-temp").value = "";
    }

    function postMemberList(url, list, msg, dontRequireItems, onSuccessFunc){
      if (shareCount > 0 || dontRequireItems) {
        jQuery.post(url, {
          member_list: list,
		      notification_message: msg
        }, onSuccessFunc);
      }
    }

    function addIdToHiddenInput( id ) {
      var inputEl = document.getElementById( "member-list-temp" );
      inputEl.value += ( inputEl.value == "" ) ? id : "," + id; 
    }