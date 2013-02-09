var regFocus = ""; function focusOnEmailField() { document.getElementById("mail").focus(); } function focusOnUserNameField() { document.getElementById("username").focus(); } function setFocus() { if (document.getElementById("fName")) { document.getElementById("fName").focus(); } } function showMap(club_id, url) { var href = url + "&myClub=" + club_id; if (!window.focus) return true; window.open(href, '', 'width=625, height=500, menubar=yes, scrollbars=yes,resizable=yes'); } function updateNeedHaveQunatities(formObj) { var needQts = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('need' + counter) != null) { var name = document.getElementById('need' + counter).name; var value = document.getElementById('need' + counter).value; needQts = needQts + name + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.updateNeed"].value = needQts; var haveQts = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('have' + counter) != null) { var name = document.getElementById('have' + counter).name; var value = document.getElementById('have' + counter).value; haveQts = haveQts + name + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.updateHave"].value = haveQts; var storeDeliverQuantities = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('delqty' + counter) != null) { var name = document.getElementById('delgiftItemid' + counter).name; var value = document.getElementById('delqty' + counter).value; storeDeliverQuantities = storeDeliverQuantities + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storeDeliverQuantities"].value = storeDeliverQuantities; var storePickupQuantities = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('pickqty' + counter) != null) { var name = document.getElementById('pickqty' + counter).name; var value = document.getElementById('pickqty' + counter).value; storePickupQuantities = storePickupQuantities + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storePickupQuantities"].value = storePickupQuantities; /* * * * * R2 * * * EGiftCards * * * VGDESAI * * * start */ var storeEGiftCardAmount = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('eGiftCardAmount' + counter) != null) { var name = document.getElementById('eGiftCardAmount' + counter).name; var value = document.getElementById('eGiftCardAmount' + counter).value; storeEGiftCardAmount = storeEGiftCardAmount + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storeEGiftCardAmounts"].value = storeEGiftCardAmount; /* * * * * R2 * * * EGiftCards * * * VGDESAI * * * end */ formobj.submit(); } function addMapPriceToCartDelivary() { document.getElementById("delivary").value = '1'; document.MapPriceToCart.submit(); } function addMapPriceToCartPickup() { document.getElementById("pickup").value = '1'; document.MapPriceToCartPickup.submit(); } function addToMapPickup(form, pickup) { form.elements[pickup].value = '1'; form.submit(); } function updateClubSelection(form, clubId) { document.getElementById("clubId").value = clubId; } function addToMapDelivary(form, delivary) { form.elements[delivary].value = '1'; form.submit(); } function submitOptOut() { document.privacyOptOutForm.optOutSub.value = 'submit'; document.privacyOptOutForm.submit(); } function isPageloaded(id, value) { if (isloaded == null) { document.getElementById(id).href = value; } else { document.getElementById(id).href = '#'; } } function selectAll(elemId) { if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } else { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } for (i = 0; i < size; i++) { var item = document.getElementById(elemId + i); if (item != null) { if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) { item.checked = true; } else { item.checked = false; } } } } function SelectAll2(elemId) { var checkedd = ''; for (i = 0; i < size; i++) { var item = document.getElementById(elemId + i); if (item != null && !item.checked) { checkedd = 'false'; } } if (checkedd == 'false') { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } else { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } } function deleteList(formObj, name) { var wishcheckboxchecked = "false"; var shopcheckboxchecked = "false"; for (counter = 1; counter <= wishlistsize; counter++) { var wishlist = document.getElementById('wish' + counter).checked; if (wishlist) { wishcheckboxchecked = "true"; } } for (counter = 1; counter <= shoppinglistsize; counter++) { var shoplist = document.getElementById('shop' + counter).checked; if (shoplist) { shopcheckboxchecked = "true"; } } if (wishcheckboxchecked == "true" || shopcheckboxchecked == "true") { formObj.name.value = 'submit'; formObj.submit(); } else { document.getElementById('listError').innerHTML = '<div class="scrollingPromo"><div align="center"><span class="errorRed">Please select one or more lists to remove! </span></div></div>'; } } function callSubmit(formObj) { var checkboxchecked = "false"; var giftListIds = ""; for (counter = 0; counter < size; counter++) { var checkBoxName = document.getElementById('giftCheck' + counter); if (checkBoxName.checked) { giftListIds = giftListIds + checkBoxName.value + ","; checkboxchecked = "true"; } } if (checkboxchecked == "true") { formObj["/atg/commerce/gifts/GiftlistFormHandler.selectedGiftListItem"].value = giftListIds; formObj.submit(); } else { document.getElementById('listError').innerHTML = '<div class="scrollingPromo"><div align="center"><span class="errorRed">Uh-oh!...It looks like you forgot to select a list item. Please select a list item before proceeding.</span></div></div>'; } } function Check(formObj, chk) { var total = ""; checkCount = 0; count = 0; var objField = formObj.elements[chk]; count = objField.length; if (count != null) { for (i = 0; i < count; i++) { if (objField[i].checked) { total = checkCount + 1; checkCount++; } else if (objField[i] == "") { total = checkCount + 1; checkCount++; } } } else { total = 1; if (objField.checked) { count = 1; } else { count = 0; } } if (total == count) { unCheckAll(formObj); if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } else { checkAll(formObj); if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } } function Check2(formObj, chk) { var objField = formObj.elements[chk]; total = objField.length; if (total != null) { count = 0; checkCount = 0; for (i = 0; i < total; i++) { if (objField[i].checked) { count = checkCount + 1; checkCount++; } } if (total == count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } if (total != count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } } else { if (objField.checked) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } else { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } } } function selectRefreshMultiplePay(param, value) { var URL = ""; if (value == 'combination') { var formObj = document.selectpmfrm; formObj["/atg/commerce/order/purchase/PaymentGroupFormHandler.populateProfileCardsIntoOrder"].value = "submit"; formObj.submit(); } else { URL = window.location.pathname + '?' + param + '=' + value; window.location.href = URL; } } function selectRefresh(param, value) { var URL = window.location.pathname + '?' + param + '=' + value; window.location.href = URL; } function checkAll(formObj) { count = formObj.elements.length; for (i = 0; i < count; i++) { formObj.elements[i].checked = true; } } function confirmDeletion() { if (confirm("Are you Sure You Want to Delete this List(s)?")) { return true; } else { return false; } } function confirmDeletionForItems() { if (confirm("Are you Sure You Want to Delete items from the List")) { return true; } else { return false; } } function unCheckAll(formObj) { count = formObj.elements.length; for (i = 0; i < count; i++) { formObj.elements[i].checked = false; } } function deleteAddress(formObj, name) { formObj.elements[name].value = 'submit'; formObj.submit(); } function submitFormOnEnter(form, ev) { var keycode; if (window.event) { keycode = window.event.keyCode; } else if (ev) { keycode = ev.which; } else { return true; } if (keycode == 13) { if (regFocus.length == 0) { trimFormElements(form); form.submit(); return false; } } else { return true; } return false; } function setCookie() { var name = "usernameCookie"; var docCookie = document.cookie; var value = document.loginForm.username.value; if (docCookie.length > 0 && value != "") { var expiry = new Date(); expiry.setTime(expiry.getTime() + (1000 * 60 * 60 * 24 * 30)); document.cookie = name + "=" + escape(value) + "; path=/" + ((expiry == null) ? "" : "; expires=" + expiry.toGMTString()); } } function getCookie() { var cookieName = "usernameCookie"; var cookieValue; var nameEQ = cookieName + '='; var splittedCookie = document.cookie.split(';'); for ( var i = 0; i < splittedCookie.length; i++) { var temp = splittedCookie[i]; while (temp.charAt(0) == ' ') temp = temp.substring(1, temp.length); if (temp.indexOf(nameEQ) == 0) cookieValue = unescape(temp.substring(nameEQ.length, temp.length)); if (cookieValue != null) { var emailId = cookieValue.replace(/\"/g, ""); document.loginForm.username.value = emailId; } } return null; } function clearTextBoxes() { var itemNumberBoxes = document.searchbyitemnumber["/com/walmart/ecommerce/samsclub/search/SearchFormHandler.itemNumber"]; var itemNumberBoxes1 = document.searchbyitemnumber["/com/walmart/ecommerce/samsclub/search/ShopByItemNumberFormHandler.itemNumber"]; if (itemNumberBoxes != undefined && itemNumberBoxes != null) { if (itemNumberBoxes.length != undefined) { for ( var i = 0; i < itemNumberBoxes.length; i++) { itemNumberBoxes[i].value = ""; } } else { itemNumberBoxes.value = ""; } } if (itemNumberBoxes1 != undefined && itemNumberBoxes1 != null) { if (itemNumberBoxes1.length != undefined) { for ( var i = 0; i < itemNumberBoxes1.length; i++) { itemNumberBoxes1[i].value = ""; } } else { itemNumberBoxes1.value = ""; } } } function clearAllTextBoxes() { var itemNumberBoxes = document.searchbykeyword["/com/walmart/ecommerce/samsclub/search/SearchFormHandler.keywordsArray"]; if (itemNumberBoxes != undefined && itemNumberBoxes != null) { if (itemNumberBoxes.length != undefined) { for ( var i = 0; i < itemNumberBoxes.length; i++) { itemNumberBoxes[i].value = ""; } } else { itemNumberBoxes.value = ""; } } } function clearTextArea() { document.searchbyitemnumbers.itemNumbersTextArea.value = ""; } function selectAllCheckBoxes() { var skuCheckBoxes = document.getElementsByName('skuCheckBox'); if (skuCheckBoxes != undefined && skuCheckBoxes != null) { if (skuCheckBoxes.length != undefined) { for ( var i = 0; i < skuCheckBoxes.length; i++) { skuCheckBoxes[i].checked = true; } } else { skuCheckBoxes.checked = true; } } } function clearFormElements(form) { var noOfFormElements = form.elements.length; for ( var i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "text" || form.elements[i].type == "textarea") { form.elements[i].value = ""; } if ((form.elements[i].type == "radio") || (form.elements[i].type == "checkbox")) { form.elements[i].checked = false; } if (form.elements[i].type == 'select-one') { if (form.elements[i].name == "where") { var temp = form.elements[i]; temp.value = "Home"; } else { if (form.elements[i].name == "whereb") { var temp1 = form.elements[i]; temp1.value = "Mobile"; } else { form.elements[i].value = ""; } } } } } function populatevalue(form, ptype) { var formElem = form.elements; for ( var i = 0; i <= formElem.length; i++) { if (formElem[i]) { if (formElem[i].type == 'select-one') { var elem = formElem[i].options; for ( var j = 0; j <= formElem[i].length; j++) { if (elem[j]) { if (elem[j].value == formElem[i].id) { elem[j].selected = true; } } } } if (formElem[i].type == 'radio') { if (formElem[i].id == 'Credit/Debit Card') { if (formElem[i].value == 0) { formElem[i].checked = true; } } if (formElem[i].id == 'Sams Club Credit') { if (formElem[i].value == 1) { formElem[i].checked = true; } } } } } } function populateField(form, query) { var arr1 = new Array(); var str = query; arr1 = str.substring(0, str.length).split("&"); for ( var i = 0; i <= arr1.length; i++) { if (arr1[i] != null) { var val = arr1[i].toString(); var key = val.substring(0, val.indexOf('=')); var valuess = val.substring(val.indexOf('=') + 1); if (key != 'status_code_msg' && key != 'cardCvv') { if (form.elements[key]) { form.elements[key].value = valuess; } if (key == 'defaultPaymentMethod' || key == 'saveAsDefault' || key == 'saveInfo' || key == 'autoRenewMembership') { form.elements[key].checked = true; } } } } } function formReset() { var skuCheckBoxes = document.searchResults.skuCheckBox; if (skuCheckBoxes != undefined && skuCheckBoxes != null) { if (skuCheckBoxes.length != undefined) { for ( var i = 0; i < skuCheckBoxes.length; i++) { skuCheckBoxes[i].checked = false; } } else { skuCheckBoxes.checked = false; } } } function addSingleItemToOrder(skuItemId, productID) { var formObjOne = document.searchResults; var formObjTwo = document.searchResultsformtwo; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds"].value = skuItemId; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.productId"].value = productID; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.quantity"].value = formObjOne[skuItemId].value; formObjTwo.submit(); } function hideErrorMessage() { document.getElementById("Error").style.display = 'none'; } function hideAll(a1) { for ( var iCounter = 0; iCounter <= Size; iCounter++) { if (document.getElementById(a1 + iCounter)) { document.getElementById(a1 + iCounter).style.display = 'none'; } if (document.getElementById('change' + iCounter)) { document.getElementById('change' + iCounter).innerHTML = showSubCatgoryMessage; document.getElementById('change' + iCounter).className = "blueCircleUp"; } } intialChecking(intiallySelected); } function showAll(a3) { for ( var iCounter = 0; iCounter <= Size; iCounter++) { if (document.getElementById(a3 + iCounter)) { document.getElementById(a3 + iCounter).style.display = 'inline'; } if (document.getElementById('change' + iCounter)) { document.getElementById('change' + iCounter).innerHTML = hideSubCatgoryMessage; document.getElementById('change' + iCounter).className = "blueCircleDown"; } } } function switchVisibility(a5, a8) { if (document.getElementById(a5).style.display == "inline") { document.getElementById(a8).innerHTML = showSubCatgoryMessage; document.getElementById(a8).className = "blueCircleUp"; document.getElementById(a5).style.display = 'none'; } else { document.getElementById(a8).innerHTML = hideSubCatgoryMessage; document.getElementById(a8).className = "blueCircleDown"; document.getElementById(a5).style.display = 'inline'; } } function checkboxSelected() { var size = 0; var check = ''; var formElements = document.survey.elements; for ( var i = 0; i < formElements.length; i++) { if (formElements[i].type == "checkbox" && formElements[i].id.indexOf('belongsTorootCat') == 0 && formElements[i].checked) { size += 1; if (Number(selectedSize) + size > 25) { formElements[i].checked = false; check = 'true' } } if (formElements[i].type == "checkbox" && formElements[i].id.indexOf('rootCat') == 0 && formElements[i].checked && check == 'true') { formElements[i].checked = false; } } return size; } function intialChecking(count) { var size = checkboxSelected(); if (size != 0) { if (count < 25) { checkForMaxSelected(); } else { selectedSize = count; displayErrormessage(count); } } else { selectedSize = count; if (count < 25) { checkForMaxSelected(); } else { displayErrormessage(count); } } } function checkForMaxSelected() { var tempSize = checkboxSelected(); var size = Number(selectedSize) + tempSize; displayErrormessage(size); } function displayErrormessage(size) { var noOfFormElements = document.survey.elements.length; var formElements = document.survey.elements; if (size >= 25) { document.getElementById("Error").style.display = 'inline'; for ( var i = 0; i < noOfFormElements; i++) { if (!formElements[i].checked) { var tagName = formElements[i].id; if ((tagName.indexOf('belongsTorootCat') >= 0) || (tagName.indexOf('rootCat') >= 0)) { formElements[i].disabled = true; selectedSize = 0; } } } window.scrollTo(0, 0); } else { document.getElementById("Error").style.display = 'none'; for ( var i = 0; i < noOfFormElements; i++) { formElements[i].disabled = false; } } } 
function clearAllCheckBoxes() { var formElements = document.survey.elements; for ( var i = 0; i < formElements.length; i++) { if (formElements[i].type == "checkbox") { formElements[i].checked = false; } } intialChecking(intiallySelected); } function nextbox(fldobj, nbox, ev) { var key_code; if (window.event) { key_code = event.keyCode } else if (ev.which) { key_code = ev.which } if (key_code != '39' && key_code != '37' && key_code != '16' && key_code != '9') { if (fldobj.value.length == fldobj.maxLength) { fldobj.form.elements[nbox].focus(); } } else if (key_code == '39' && fldobj.selectionEnd == 3) { fldobj.form.elements[nbox].focus(); } else { var txt = fldobj.value; var len = txt.length; var erg = txt.split("\n"); var pos = -1; if (typeof document.selection != "undefined") { range_sel = document.selection.createRange(); range_obj = fldobj.createTextRange(); range_obj.moveToBookmark(range_sel.getBookmark()); range_obj.moveEnd('character', fldobj.value.length); pos = len - range_obj.text.length; if (pos == 3) { fldobj.form.elements[nbox].focus(); } } } } function submitRegistration() { var formObj = document.registrationForm; formObj["/atg/userprofiling/ProfileFormHandler.createSuccessURL"].value = formObj["/atg/userprofiling/ProfileFormHandler.createSuccessURL"].value; formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value = formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value; if (validatePasswordAndConfirmPassword(formObj)) { trimFormElements(formObj); formObj.submit(); } } function displaySelectEmailAddress() { document.getElementById('Error').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' + selectEmailAddress + '</h2></div>'; document.getElementById('Error').style.display = "inline"; } function checkEnterAndSubmitFindForShopByKeyWord(e) { if (checkEnter(e)) { document.getElementById("updateButton").name = ""; document.getElementById("findButton").click(); return false; } } function checkPasswordAndConfirmPassword(formObj) { var password = formObj.ypass.value; var confirmpassword = formObj.cpass.value; if (password != "" && confirmpassword != "") { if (password != confirmpassword) { document.getElementById('passwordError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">Password and Confirm Password fields do not match</h2></div>'; document.getElementById('passwordError').style.display = "inline"; document.getElementById('Password').style.color = "red"; document.getElementById('confirmPassword').style.color = "red"; regPassword = formObj.ypass.value; regConfirmPassword = formObj.cpass.value; formObj.ypass.value = ""; formObj.cpass.value = ""; return false; } else { document.getElementById('passwordError').style.display = "none"; document.getElementById('Password').style.color = ""; document.getElementById('confirmPassword').style.color = ""; regPassword = ""; regConfirmPassword = ""; return true; } } return true; } function validatePasswordAndConfirmPassword(formObj) { var password = regPassword; var confirmpassword = regConfirmPassword; if (password != "" && confirmpassword != "") { if (password != confirmpassword) { document.getElementById('passwordError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">Password and Confirm Password fields do not match</h2></div>'; document.getElementById('Password').style.color = "red"; document.getElementById('confirmPassword').style.color = "red"; formObj.ypass.value = ""; formObj.cpass.value = ""; return false; } else { document.getElementById('passwordError').style.visibility = "hidden"; document.getElementById('Password').style.color = ""; document.getElementById('confirmPassword').style.color = ""; return true; } } return true; } function submitRemoveInterest(category, frmObj) { frmObj["/com/walmart/ecommerce/samsclub/inmyclub/ItemsOfInterestFormHandler.removeCategory"].value = category; frmObj.submit(); } function clearRegFormElements(form) { var noOfFormElements = form.elements.length; for ( var i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "checkbox") { form.elements[i].checked = false; } if (form.elements[i].type == "text") { form.elements[i].value = ""; } if (form.elements[i].type == "password") { form.elements[i].value = ""; } form.suffix.value = ""; } } function trimAll(sString) { while (sString.substring(0, 1) == ' ') { sString = sString.substring(1, sString.length); } while (sString.substring(sString.length - 1, sString.length) == ' ') { sString = sString.substring(0, sString.length - 1); } return sString; } function trimFormElements(form) { var noOfFormElements = form.elements.length; var i = 0; for (i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "text") { form.elements[i].value = trimAll(form.elements[i].value); } } } function openNewWindow(URL, popUpName) { if (!window.focus) return true; var href; if (typeof (URL) == 'string') href = URL; window.open(href, popUpName, 'resizable=0,width=600,height=250,left = 440,top = 212'); return false; } function submitRenewal(form, change) { window.location.href = window.location.pathname; form["/com/walmart/ecommerce/samsclub/profile/MyAccountProfileFormHandler.changeRenewalSetting"].value = change; form.submit(); window.focus(); } function closeWindow(URL, closeme, closeonly) { if (!(window.focus && window.opener)) return true; window.opener.focus(); if (!closeonly) window.opener.location.href = URL; if (closeme) window.close(); return false; } function checkEnter(e) { var characterCode; if (e && e.which) { e = e; characterCode = e.which; } else { e = event; characterCode = e.keyCode; } if (characterCode == 13) { return true; } else { return false; } } function checkEnterAndSubmitUpdate(e) { if (checkEnter(e)) { document.getElementById("findButton").name = ""; document.getElementById("updateButton").click(); return false; } } function checkEnterAndSubmitFind(e) { if (checkEnter(e)) { document.getElementById("updateButton").name = ""; document.getElementById("findButton").click(); return false; } else { return isNumberKey(e); } } function checkEnterAndSubmitToCart(e, index) { var cartElement = "addtocartsingle"; if (index != null && index.length > 0 && index != '') { cartElement = cartElement + index; } if (checkEnter(e)) { document.getElementById(cartElement).click(); return false; } } function checkEnterAndSubmitSearch(e) { if (checkEnter(e)) { document.getElementById("searchButton").click(); return false; } } var xmlHttp; var clubId; function dispalyPopup(productId, club, param, contextRoot) { xmlHttp = GetXmlHttpObject(); clubId = "club" + param; var contextPath = contextRoot + "/common"; if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = contextPath + "/selectClub.jsp"; url = url + "?productId=" + productId; url = url + "&clubId=" + club; xmlHttp.open("GET", url, true); xmlHttp.onreadystatechange = clubStateChanged; xmlHttp.send(null); } function clubStateChanged() { if (xmlHttp.readyState == 4) { var clubResponse = xmlHttp.responseText; var clubAvailable = new String(clubResponse); clubAvailable = clubAvailable.trim(); var club = document.getElementById(clubId); if (clubAvailable == "true") { club.style.visibility = "visible"; } } } String.prototype.trim = function() { return this.replace(/^\s*/, "").replace(/\s*$/, ""); }; function GetXmlHttpObject() { var xmlHttp = null; try { xmlHttp = new XMLHttpRequest(); } catch (e) { try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); } } return xmlHttp; } function setValue() { regFocus = "onlink"; } function clearValue() { regFocus = ""; } function addMultipleItemsToCart(formobj) { var length = document.getElementById("formCount").value;	 for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null || document.getElementById('delqty' + i) != undefined) { if (document.getElementById('multidelqty' + i + formobj) != null || document.getElementById('multidelqty' + i + formobj) != undefined) { document.getElementById('multidelqty' + i + formobj).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null || document.getElementById('pickqty' + i) != undefined) { if (document.getElementById('multipickqty' + i + formobj) != null || document.getElementById('multipickqty' + i + formobj) != undefined) { document.getElementById('multipickqty' + i + formobj).value = document .getElementById('pickqty' + i).value; } } if (document.getElementById('delgiftItemid' + i) != null || document.getElementById('delgiftItemid' + i) != undefined) { if (document.getElementById('multidelgiftitemids' + i + formobj) != null || document.getElementById('multidelgiftitemids' + i + formobj) != undefined) { document.getElementById('multidelgiftitemids' + i + formobj).value = document .getElementById('delgiftItemid' + i).value; } } if (document.getElementById('pickgiftItemid' + i) != null || document.getElementById('pickgiftItemid' + i) != undefined) { if (document.getElementById('multipickgiftitemids' + i + formobj) != null || document.getElementById('multipickgiftitemids' + i + formobj) != undefined) { document.getElementById('multipickgiftitemids' + i + formobj).value = document .getElementById('pickgiftItemid' + i).value; } } /* R2 EGiftCards VGDESAI start */		 if (document.getElementById('eGiftCardAmount' + i) != null || document.getElementById('eGiftCardAmount' + i) != undefined) { if (document.getElementById('multiEGiftAmounts' + i + formobj) != null || document.getElementById('multiEGiftAmounts' + i + formobj) != undefined) { document.getElementById('multiEGiftAmounts' + i + formobj).value = document .getElementById('eGiftCardAmount' + i).value; } } /* R2 EGiftCards VGDESAI end */ } formobj.submit(); } function checkIsProductsSelected(requestUri) { var length = formCount; var flag = false; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null) { var delQty = document.getElementById('delqty' + i).value; if (delQty > 0) { flag = true; } } } for (i = 0; i < length; i++) { if (document.getElementById('pickqty' + i) != null) { var pickQty = document.getElementById('pickqty' + i).value; if (pickQty > 0) { flag = true; } } } if (flag) { document.getElementById('addMultipleItems').style.display = 'inline'; document.getElementById('continue').href = requestUri; document.getElementById("addCount").value = length; } else { document.location.href = requestUri; } } function addProductsSelected(formobj) { var length = formCount; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null) { if (document.getElementById('multidelqty' + i + formobj.name) != null) { document.getElementById('multidelqty' + i + formobj.name).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null) { if (document.getElementById('multipickqty' + i + formobj.name) != null) { document.getElementById('multipickqty' + i + formobj.name).value = document .getElementById('pickqty' + i).value; } } } formobj.submit(); } function cartformselectall() { var total = ""; checkCount = 0; count = 0; var objField = document.cartform.elements["removalcommmerceids"]; if (objField != undefined) { count = objField.length; if (count != null) { for (i = 0; i < count; i++) { if (document.cartform.removalcommmerceids[i].checked) { total = checkCount + 1; checkCount++; } else if (document.cartform.removalcommmerceids[i] == "") { total = checkCount + 1; checkCount++; } } } else { total = 1; if (document.cartform.removalcommmerceids.checked) { count = 1; } else { count = 0; } } if (total == count) { unCheckAllItems(); document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage;/* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */  document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */} else { checkAllItems(); document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /*Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage;/* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } function checkAllItems() { count = document.cartform.removalcommmerceids.length; if (count != undefined) { for (i = 0; i < count; i++) { document.cartform.removalcommmerceids[i].checked = true; } } else { document.cartform.removalcommmerceids.checked = true; } } function unCheckAllItems() { count = document.cartform.removalcommmerceids.length; if (count != undefined) { for (i = 0; i < count; i++) { document.cartform.removalcommmerceids[i].checked = false; } } else { document.cartform.removalcommmerceids.checked = false; } } function onmyinput(o) { if (o.value.length >= o.getAttribute("maxlength")) { if (o.value.length > o.getAttribute("maxlength")) o.value = o.value.substring(0, o.getAttribute("maxlength")); return false; } return true; } function onmypaste(o) { var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : ""; if (document.all) { if (document.selection.createRange().text.length > 0) { var ovalueandclipboarddata = o.value + window.clipboardData.getData("Text"); if (o.getAttribute && ovalueandclipboarddata.length - document.selection.createRange().text.length > nMaxLen) { if (window.clipboardData.getData("Text").substring( 0, document.selection.createRange().text.length + nMaxLen - o.value.length) != "") { window.clipboardData .setData( "Text", window.clipboardData .getData("Text") .substring( 0, document.selection .createRange().text.length + nMaxLen - o.value.length)); } else { return false; } } } else { var ovalueandclipboarddata = o.value + window.clipboardData.getData("Text"); if (o.getAttribute && ovalueandclipboarddata.length > nMaxLen) { if (ovalueandclipboarddata.substring(0, nMaxLen - o.value.length) != "") window.clipboardData.setData("Text", ovalueandclipboarddata .substring(0, nMaxLen - o.value.length)); else return false; } } return true; } } function onmykeypress(o) { if (!document.all) { var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : ""; if (onmykeypress.caller.arguments[0].ctrlKey == true) { if (onmykeypress.caller.arguments[0].which == 118) { if (o.selectionStart < o.selectionEnd) { var ovalueandclipboarddata = o.value + mygetclipdata(); if (o.getAttribute && (ovalueandclipboarddata.length - o.selectionEnd + o.selectionStart > nMaxLen)) { if (mygetclipdata().substring( 0, o.selectionEnd - o.selectionStart + nMaxLen - o.value.length) != "") { mysetclipdata(mygetclipdata().substring( 0, o.selectionEnd - o.selectionStart + nMaxLen - o.value.length)); } else { return false; } } } else { var ovalueandclipboarddata = o.value + mygetclipdata(); if (o.getAttribute && ovalueandclipboarddata.length > nMaxLen) { if (ovalueandclipboarddata.substring(0, nMaxLen - o.value.length) != "") { mysetclipdata(ovalueandclipboarddata.substring(0, nMaxLen - o.value.length)); } else { return false; } } } return true; } } if (onmykeypress.caller.arguments[0].which == 0 || onmykeypress.caller.arguments[0].which == 8) return true; if (o.value.length >= o.getAttribute("maxlength")) { if (o.selectionStart < o.selectionEnd) return true; if (o.value.length > o.getAttribute("maxlength")) o.value = o.value.substring(0, o.getAttribute("maxlength")); return false; } else return true; } else { if (document.selection.createRange().text.length > 0) return true; if (o.value.length >= o.getAttribute("maxlength")) return false; else return true; } } function selectAddOnype(form, elementId, number) { var element = document.getElementById(elementId); if (element.selectedIndex == 0) { form["/com/walmart/ecommerce/samsclub/profile/MyAccountProfileFormHandler.editMembership"].value = number; form.submit(); } if (element.selectedIndex == 1) { window.location.href = 'replaceBusinessAddon.jsp?cardToUpdate=' + number; } } function submitAddBusinessAddonToForm(param, form) { var param1 = param; if (param1 == 'addon') { form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.addAddOnMembershipToCart"].name = ""; form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.attachAdditionalAddonAccount"].value = "submit"; ; form.submit(); } else if (param1 = 'continue') { form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.attachAdditionalAddonAccount"].name = ""; form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.addAddOnMembershipToCart"].value = "submit"; ; form.submit(); } } function selectType(form, pSams, pCredit) { if (form.value == 0) { form.checked = true; document.getElementById(pCredit).style.display = 'inline'; document.getElementById(pSams).style.display = 'none'; } if (form.value == 1) { form.checked = true; document.getElementById(pCredit).style.display = 'none'; document.getElementById(pSams).style.display = 'inline'; } } var commerceIds = new Array(); function setCommerceIds(pCommerceIds) { commerceIds = pCommerceIds; } function cartformsubmit(method) { if (method == 'updatecart') { var length = document.getElementById("cartItemsCount").value; for ( var j = 0; j < commerceIds.length; j++) { document.getElementById(commerceIds[j] + 'updateqty').value = document .getElementById(commerceIds[j] + 'qty').value; } document.getElementById("removefromcart").name = ""; document.cartupdateform.submit(); } if (method == 'deleteselected') { document.getElementById("updatecart").name = ""; document.cartform.submit(); } } function cartupdateformsubmit() { document.getElementById("removefromcart").name = ""; var length = document.getElementById("cartItemsCount").value; for ( var j = 0; j < commerceIds.length; j++) { document.getElementById(commerceIds[j] + 'updateqty').value = document .getElementById(commerceIds[j] + 'qty').value; } document.cartupdateform.submit(); return false; } function addServiceAgg(commmerceItemId, serviceAgreementId) { document.getElementById("selectedCommerceItem").value = commmerceItemId; document.getElementById("serviceAgreement").value = serviceAgreementId; document.AddServiceAgreement.submit(); } function changeDate(deliveryDate, ClubcommerceItemId) { if (deliveryDate == "") return; document.getElementById("ClubDeliveryDate").value = deliveryDate; document.getElementById("ClubCommerceItemId").value = ClubcommerceItemId; document.changeDateInCommerceItem.submit(); } function ShippingMethodChange(commerceItemId, shippingMethod) { document.getElementById('commId').value = commerceItemId; document.getElementById('changedShippingMethod').value = shippingMethod; document.changeShippingMethod.submit(); } function pickupClubChange(contextpath, commerceItemId, newClubId) { if (newClubId == "selectnewclub") { window.location.href = contextpath + '/shoppingtools/selectaclub.jsp?page=cart&commerceItemId=' + commerceItemId; } else { document.getElementById('assosciatedCommId').value = commerceItemId; document.getElementById('selectedPickupClub').value = newClubId; document.changeSelectedClub.submit(); } } function showdeselect(formObj, chk) { var objField = formObj.elements[chk]; total = objField.length; if (total != null) { count = 0; checkCount = 0; for (i = 0; i < total; i++) { if (objField[i].checked) { count = checkCount + 1; checkCount++; } } if (total == count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage;/* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } if (total != count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } else { if (objField.checked) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } else { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } } function isNumberKey(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } else { return true; } } function allownumbersonly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 48 && charCode <= 57) || (charCode == 8))) { return false; } else { return true; } } function allowAlphabeticsonly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 8))) { return false; } else { return true; } } function allowAlphabeticsAndSpecialCharsOnly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 8) || (charCode == 45))) { return false; } else { return true; } } function show() { var check = document.getElementById('aam'); var tr = document.getElementById('grandtotal'); if (check.checked) { tr.style.display = 'block'; } else { tr.style.display = 'none'; } } function populateBillingAddress(addressKey, path) { if (addressKey == "novalue") { document.getElementById("fName").value = ""; document.getElementById("midl").value = ""; document.getElementById("lName").value = ""; document.addPayment.elements['suffix'].options[0].selected = true; document.getElementById("bizOrg").value = ""; document.getElementById("srtAddress").value = ""; document.getElementById("city").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; document.addPayment.elements['state'].options[0].selected = true; document.getElementById("address2").value = ""; document.getElementById("address3").value = ""; document.addPayment.elements['phoneType'].options[0].selected = true; document.addPayment.elements['phoneType2'].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/checkout/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateBillingAddressFields; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateBillingAddressFields() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { var suffixVal = xmlDoc.getElementsByTagName("suffix")[0].childNodes[0].nodeValue; var suffixprop = document.addPayment.elements['suffix']; ; var elem = suffixprop.options; for ( var j = 0; j <= suffixprop.length; j++) { if (elem[j] != null) { if (elem[j].value == suffixVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['suffix'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("srtAddress").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("phoneType")[0] != null) { var phoneTypeVal = xmlDoc.getElementsByTagName("phoneType")[0].childNodes[0].nodeValue; var phoneTypeProp = document.addPayment.elements['phoneType']; var elem = phoneTypeProp.options; for ( var j = 0; j <= phoneTypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phoneTypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneType'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneType2")[0] != null) { var phone2TypeVal = xmlDoc.getElementsByTagName("phoneType2")[0].childNodes[0].nodeValue; var phone2TypeProp = document.addPayment.elements['phoneType2']; var elem = phone2TypeProp.options; for ( var j = 0; j <= phone2TypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phone2TypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneType2'].options[2].selected = true; } if (xmlDoc.getElementsByTagName("state")[0] != null) { var stateVal = xmlDoc.getElementsByTagName("state")[0].childNodes[0].nodeValue; var stateProp = document.addPayment.elements['state']; var elem = stateProp.options; for ( var j = 0; j <= stateProp.length; j++) { if (elem[j] != null) { if (elem[j].value == stateVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['state'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("address2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("address2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("address3").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("address3").value = ""; } } } } function populateAddress(addressKey, path) { if (addressKey == "") { document.getElementById("fName").value = ""; document.getElementById("lName").value = ""; document.getElementById("midl").value = ""; document.getElementById("bizOrg").value = ""; document.getElementById("srtAddress").value = ""; document.getElementById("address2").value = ""; document.getElementById("city").value = ""; document.getElementById("address3").value = ""; document.getElementById("nickName").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; document.getElementById("state").value = ""; document.getElementById("address2").value = ""; document.getElementById("address3").value = ""; document.addPayment.elements['suffix'].options[0].selected = true; document.addPayment.elements['phoneNumberType'].options[0].selected = true; document.addPayment.elements['phone2Type'].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateAddressValue; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateAddressValue() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } else { document.getElementById("lname").value = ""; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { var suffixVal = xmlDoc.getElementsByTagName("suffix")[0].childNodes[0].nodeValue; var suffixprop = document.addPayment.elements['suffix']; var elem = suffixprop.options; for ( var j = 0; j <= suffixprop.length; j++) { if (elem[j] != null) { if (elem[j].value == suffixVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['suffix'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("srtAddress").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("address2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("address2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("address3").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("address3").value = ""; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("state")[0] != null) { var stateVal = xmlDoc.getElementsByTagName("state")[0].childNodes[0].nodeValue; var stateProp = document.addPayment.elements['state']; var elem = stateProp.options; for ( var j = 0; j <= stateProp.length; j++) { if (elem[j] != null) { if (elem[j].value == stateVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['state'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneNumberType")[0] != null) { var phoneTypeVal = xmlDoc .getElementsByTagName("phoneNumberType")[0].childNodes[0].nodeValue; var phoneTypeProp = document.addPayment.elements['phoneNumberType']; var elem = phoneTypeProp.options; for ( var j = 0; j <= phoneTypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phoneTypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneNumberType'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phone2Type")[0] != null) { var phone2TypeVal = xmlDoc.getElementsByTagName("phone2Type")[0].childNodes[0].nodeValue; var phone2TypeProp = document.addPayment.elements['phone2Type']; var elem = phone2TypeProp.options; for ( var j = 0; j <= phone2TypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phone2TypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phone2Type'].options[2].selected = true; } if (xmlDoc.getElementsByTagName("nickName")[0] != null) { document.getElementById("nickName").value = xmlDoc .getElementsByTagName("nickName")[0].childNodes[0].nodeValue; } else { document.getElementById("nickName").value = ""; } } } } function populateCheckingAddress(addressKey, form, path) { if (addressKey == "") { document.getElementById("fName").value = ""; document.getElementById("lName").value = ""; document.getElementById("midl").value = ""; document.getElementById("bizOrg").value = ""; document.getElementById("suffix").options[0].selected = true; document.getElementById("stAdd").value = ""; document.getElementById("add2").value = ""; document.getElementById("addressInfo").value = ""; document.getElementById("city").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; form.elements["states"].options[0].selected = true; form.elements["phoneNumberType"].options[0].selected = true; form.elements["phone2Type"].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateCheckingAddressValue; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateCheckingAddressValue() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } else { document.getElementById("lName").value = ""; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { document.getElementById("suffix").value = xmlDoc .getElementsByTagName("suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("suffix").options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("stAdd").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("add2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("add2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("addressInfo").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("addressInfo").value = ""; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("state")[0] != null) { document.getElementById("states").value = xmlDoc .getElementsByTagName("state")[0].childNodes[0].nodeValue; } else { document.getElementById("states").options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneNumberType")[0] != null) { document.getElementById("phoneNumberType").value = xmlDoc .getElementsByTagName("phoneNumberType")[0].childNodes[0].nodeValue; } else { document.getElementById("phoneNumberType").options[0].selected = true; } if (xmlDoc.getElementsByTagName("phone2Type")[0] != null) { document.getElementById("phone2Type").value = xmlDoc .getElementsByTagName("phone2Type")[0].childNodes[0].nodeValue; } else { document.getElementById("phone2Type").options[2].selected = true; } } } } function limitTextArea(limitField, limitNum) { if (limitField.value.length > limitNum) { limitField.value = limitField.value.substring(0, limitNum); } } function selectedCommerceItems() { count = 0; var objField = document.cartform.elements["removalcommmerceids"]; if (objField != undefined) { count = objField.length; if (count != undefined) { for (i = 0; i < count; i++) { if (document.cartform.removalcommmerceids[i].checked) { document.getElementById('hideSelectedItems' + i).value = document.cartform.removalcommmerceids[i].value; } else { document.getElementById('hideSelectedItems' + i).name = ""; } } } else { document.getElementById('hideSelectedItems' + 0).name = ""; } } } function selectedSaveForLaterItems() { count = 0; var objField = document.giftform.elements["giftItems"]; if (objField != undefined) { count = objField.length; if (count != undefined) { for (i = 0; i < count; i++) { if (document.giftform.giftItems[i].checked) { document .getElementById('hideSelectedSaveForLaterItems' + i).value = document.giftform.giftItems[i].value; } else { document .getElementById('hideSelectedSaveForLaterItems' + i).name = ""; } } } else { document.getElementById('hideSelectedSaveForLaterItems' + 0).name = ""; } } } function isSpaceEntered(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode == 32) { return false; } else { return true; } } function submitFormOnEnterOnChooseAList(form, ev) { selectedCommerceItems(); submitFormOnEnter(form, ev); } function submitFormOnEnterOnChooseAListOnSaveForLater(form, ev) { selectedSaveForLaterItems(); submitFormOnEnter(form, ev); } function isDoubleValue(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) { return false; } else { return true; } } function addToCartPopUpEnter(form, ev) { var keycode; if (window.event) { keycode = window.event.keyCode; } else if (ev) { keycode = ev.which; } else { return true; } if (keycode == 13) { form.submit(); return false; } else { return true; } return false; } function mtrackdown() { document.getElementById('serverdownError').innerHTML = '<div class="scrollingPromo"><center><strong><font color="#CC0033">Server down please try after some time</font></strong></center></div>'; document.getElementById('serverdownError').style.display = "inline"; } function saveanywayAddAddress() { var formObj = document.saveanywayform; var selected = document.getElementById('add1'); if (selected.checked) { document.getElementById('selected').value = true; formObj.submit(); } } function editaddress(param) { document.getElementById("editkey").value = document.getElementById("key").value; document.getElementById("editaddressSuccessURL").value = document .getElementById("updateAddressSuccessURL").value; document.getElementById("editaddressType").value = document .getElementById("addressType").value; document.getElementById("editfirstName").value = document .getElementById("firstName").value; document.getElementById("editlastName").value = document .getElementById("lastName").value; document.getElementById("editmiddleName").value = document .getElementById("middleName").value; document.getElementById("editcompanyName").value = document .getElementById("companyName").value; document.getElementById("editsuffix").value = document .getElementById("suffix").value; document.getElementById("editaddress1").value = document .getElementById("address1").value; document.getElementById("editaddress2").value = document .getElementById("address2").value; document.getElementById("editaddress3").value = document .getElementById("address3").value; document.getElementById("editpostalCode").value = document .getElementById("postalCode").value; document.getElementById("editphoneAreaCode").value = document .getElementById("phoneAreaCode").value; document.getElementById("editphonePrefix").value = document .getElementById("phonePrefix").value; document.getElementById("editphoneSuffix").value = document .getElementById("phoneSuffix").value; document.getElementById("editphone2AreaCode").value = document .getElementById("phone2AreaCode").value; document.getElementById("editphone2Prefix").value = document .getElementById("phone2Prefix").value; document.getElementById("editphone2Suffix").value = document .getElementById("phone2Suffix").value; document.getElementById("editphoneNumberType").value = document .getElementById("phoneNumberType").value; document.getElementById("editphone2Type").value = document .getElementById("phone2Type").value; document.getElementById("editphone2").value = document .getElementById("phone2").value; document.getElementById("editnickName").value = document .getElementById("nickName").value; if (param == 'suggestedaddress') { document.getElementById("editcity").value = document .getElementById("validCity").value; document.getElementById("editstate").value = document .getElementById("validState").value; } else { document.getElementById("editcity").value = document .getElementById("city").value; document.getElementById("editstate").value = document .getElementById("state").value; } document.editaddress.submit(); } function submitSearchForm1(contextpath) { var searchTerm = document.getElementById("searchBar").value; var catId = document.getElementById("searchSelect").value; var path = contextpath + "/search/searchResults.jsp?searchTerm=" + searchTerm + "&searchCategoryId=" + catId; document.searchForm.action = path; return true; } function shwhidecategories(a8, a5, a9) { if (document.getElementById(a8).checked == true) { document.getElementById(a5).style.display = 'inline'; document.getElementById(a9).innerHTML = hideSubCatgoryMessage; document.getElementById(a9).className = "blueCircleDown"; } else { document.getElementById(a9).innerHTML = showSubCatgoryMessage; document.getElementById(a9).className = "blueCircleUp"; document.getElementById(a5).style.display = 'none'; } } function savegiftlistitems(formobj) { var length = document.getElementById("formCount").value; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null || document.getElementById('delqty' + i) != undefined) { if (document.getElementById('multidelqty' + i + formobj) != null || document.getElementById('multidelqty' + i + formobj) != undefined) { document.getElementById('multidelqty' + i + formobj).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null || document.getElementById('pickqty' + i) != undefined) { if (document.getElementById('multipickqty' + i + formobj) != null || document.getElementById('multipickqty' + i + formobj) != undefined) { document.getElementById('multipickqty' + i + formobj).value = document .getElementById('pickqty' + i).value; } } /* R2 EGiftCards VGDESAI start */ if (document.getElementById('eGiftCardAmount' + i) != null || document.getElementById('eGiftCardAmount' + i) != undefined) { if (document.getElementById('multiEGiftAmounts' + i + formobj) != null || document.getElementById('multiEGiftAmounts' + i + formobj) != undefined) { document.getElementById('multiEGiftAmounts' + i + formobj).value = document .getElementById('eGiftCardAmount' + i).value; } } /* R2 EGiftCards VGDESAI end */ } var formNameObj = document.getElementsByName(formobj); formNameObj[0].submit(); } function submitListForm() { document.chooseListForm.submit(); } 
function copyValues() {	
	if (document.getElementById('delqty') != null || document.getElementById('delqty') != undefined) { 
		document.getElementById("haveShipQty").value = document .getElementById("delqty").value; 
		}
		if (document.getElementById('pickqty') != null || document.getElementById('pickqty') != undefined) {
			document.getElementById("pickUpQty").value = document .getElementById("pickqty").value; 
			} /* R2 EGiftCards VGDESAI start */
			if (document.getElementById('eGiftCardAmount') != null || document.getElementById('eGiftCardAmount') != undefined) {
				document.getElementById('eGiftCardAmount').value = document .getElementById('eGiftCardAmount0').value;
				} /* R2 EGiftCards VGDESAI end */
				 document.getElementById("giftListItemId").value = document.getElementById("selectedGiftlistId").value;
				 document.getElementById("giftlistId").value = document.getElementById("selectedGiftlistId").value;
				 document.ChooseList.submit();				
				}
function checkParent(objForm, strName, parCatName, parentCatNumber) { 
     var objField = document.survey.elements[strName]; 
	 var parent = document.survey.elements[parCatName]; 
	 var TotalNumbers = 0; 
	 var TotalChecked = 0; 
	 var length=objField.length; 
	 if (length == undefined) { 
	     length=1;
	     if (!parent.checked) { 
		     TotalChecked = 0; 
		 } else { 
		     TotalChecked = 1; 
		 }
	 }else{
	     length=objField.length;
	 }
	 for ( var iCounter = 0; iCounter <length; iCounter++) { 
	      if (objField[iCounter].checked) { 
		       TotalNumbers = TotalNumbers + 1; 
			   if (objField[iCounter].checked) {
   			         TotalChecked = TotalChecked + 1; 
			   } 
		   } 
	 } 	
	 
	 if (TotalChecked > 0) { 
		  //Start Bleum Support 12.6 Site Stabilization-Defect Fix<9211> 
		     if(TotalNumbers==objField.length){
	               parent.checked = true; 
	         }else{
	               parent.checked = false;
	         }
	      //End Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 } else { 
	      parent.checked = false; 
		  intialChecking(intiallySelected);
	 }
	 
	 checkForMaxSelected(); 
}
function checkChild(checObj, parCatName, parentCatNumber) { 
     
     var subcatParamNumber = "SubCategory" + parentCatNumber; 
	 var changeParamNumber = "change" + parentCatNumber;  
	 //Start Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 //showhidecategories(parCatName, subcatParamNumber, changeParamNumber); 
	 //switchVisibility(subcatParamNumber,changeParamNumber);
	 //End Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 var combinString = "belongsTo" + parCatName; 
	 var totalChildCheckBox = document.survey.elements[combinString]; 
	 if (totalChildCheckBox) { 
	      var childBoxSize = totalChildCheckBox.length; 
		  if (childBoxSize == undefined) { 
		         if (totalChildCheckBox.checked) {
				         totalChildCheckBox.checked = false; 
				 } else { 
				         totalChildCheckBox.checked = true; 
			     } 
		  } 
		  if (checObj.checked) { 
		  
		         for ( var iCounter = 0; iCounter < childBoxSize; iCounter++) {
				        totalChildCheckBox[iCounter].checked = true; 
				 } 
		 } else { 
		        for ( var iCounter = 0; iCounter < childBoxSize; iCounter++) { 
				     totalChildCheckBox[iCounter].checked = false; 
				} 
				intialChecking(intiallySelected); 
		} 
    } 
    checkForMaxSelected(); 
}
/* R2 EGiftCards VGDESAI start */
function copyValuesSearch1(index, productId) {
	copyValuesSearch(index);
	if (document.getElementById('eGiftCardAmount' + productId) != null
			|| document.getElementById('eGiftCardAmount' + productId) != undefined) {
		document.getElementById('eGiftCardAmountPopup_' + productId).value = document
				.getElementById('eGiftCardAmount' + productId).value;
	}
}
/* R2 EGiftCards VGDESAI end */
function copyValuesSearch(index) {
	if (document.getElementById('delqty' + index) != null
			|| document.getElementById('delqty' + index) != undefined) {
		document.getElementById("haveShipQty" + index).value = document
				.getElementById("delqty" + index).value;
	}
	if (document.getElementById('pickqty' + index) != null
			|| document.getElementById('pickqty' + index) != undefined) {
		document.getElementById("pickUpQty" + index).value = document
				.getElementById("pickqty" + index).value;
	}
}
/* R2 EGiftCards VGDESAI start */
function onmessagepaste(o) {
	var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : "";
	if (document.all) {
		if (o.value.length > 0) {
			var clipboarddata = window.clipboardData.getData("Text");
			if (o.getAttribute
					&& o.value.length + clipboarddata.length > nMaxLen) {
				if (window.clipboardData.getData("Text").substring(0,
						nMaxLen - o.value.length) != "") {
					window.clipboardData.setData("Text", window.clipboardData
							.getData("Text").substring(0,
									nMaxLen - o.value.length));
				} else {
					window.clipboardData.setData("Text", "");
					return false;
				}
			}
		} else {
			var clipboarddata = window.clipboardData.getData("Text");
			if (o.getAttribute && clipboarddata.length > nMaxLen) {
				if (clipboarddata.substring(0, nMaxLen - o.value.length) != "") {
					window.clipboardData.setData("Text", clipboarddata
							.substring(0, nMaxLen - o.value.length));
				} else {
					return false;
				}
			}
		}
		return true;
	}
}
/* R2 EGiftCards VGDESAI end */
function addToList(form, giftId, index,prodIndex) {
	form.elements["giftId"].value = giftId;
	form.target = '_top';
	if (document.getElementById('delqty' + index) != null
			|| document.getElementById('delqty' + index) != undefined) {
		form.haveItShipped.value = document.getElementById("delqty" + index).value;
	}
	if (document.getElementById('pickqty' + index) != null
			|| document.getElementById('pickqty' + index) != undefined) {
		form.pickUpInClub.value = document.getElementById("pickqty" + index).value;
	}
	/* R2 EGiftCards VGDESAI start */
	if (document.getElementById('eGiftCardAmount' + prodIndex) != null
			|| document.getElementById('eGiftCardAmount' + prodIndex) != undefined) {
		document.getElementById('eGiftCardAmount_' + prodIndex).value = document
				.getElementById('eGiftCardAmount' + prodIndex).value;
	}
	/* R2 EGiftCards VGDESAI end */
	form.submit();
}
function addMultipleItemsToCart2(formobj, id) {
	var length = document.getElementById("formCount").value;
	var check = "";
	var productIds = document.getElementsByName("eGiftCardAmountProductIds"); // R2 EGiftCards VGDESAI start
	for (i = 0; i < length; i++) {
		if (document.getElementById('delqty' + i) != null
				|| document.getElementById('delqty' + i) != undefined) {
			if (document.getElementById('multidelqty' + i + formobj) != null
					|| document.getElementById('multidelqty' + i + formobj) != undefined) {
				document.getElementById('multidelqty' + i + formobj).value = document
						.getElementById('delqty' + i).value;

			}
		}
		if (document.getElementById('pickqty' + i) != null
				|| document.getElementById('pickqty' + i) != undefined) {
			if (document.getElementById('multipickqty' + i + formobj) != null
					|| document.getElementById('multipickqty' + i + formobj) != undefined) {
				document.getElementById('multipickqty' + i + formobj).value = document
						.getElementById('pickqty' + i).value;
			}
		}
		if (document.getElementById('delgiftItemid' + i) != null
				|| document.getElementById('delgiftItemid' + i) != undefined) {
			if (document.getElementById('multidelgiftitemids' + i + formobj) != null
					|| document.getElementById('multidelgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multidelgiftitemids' + i + formobj).value = document
						.getElementById('delgiftItemid' + i).value;
			}
		}
		if (document.getElementById('pickgiftItemid' + i) != null
				|| document.getElementById('pickgiftItemid' + i) != undefined) {
			if (document.getElementById('multipickgiftitemids' + i + formobj) != null
					|| document.getElementById('multipickgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multipickgiftitemids' + i + formobj).value = document
						.getElementById('pickgiftItemid' + i).value;
			}
		}
		/* R2 EGiftCards VGDESAI start */
		if(productIds != null && productIds != undefined && productIds[i] != null && productIds[i] != undefined){
			var productId = productIds[i].value;
			if(productId != null && productId != undefined){
				if (document.getElementById('eGiftCardAmount' + productId) != null
						|| document.getElementById('eGiftCardAmount' + productId) != undefined) {
					if (document.getElementById('multiEGiftAmounts' + i + formobj) != null
							|| document.getElementById('multiEGiftAmounts' + i
									+ formobj) != undefined) {
						document.getElementById('multiEGiftAmounts' + i + formobj).value = document
								.getElementById('eGiftCardAmount' + productId).value;
					}
				}				
			}
		}  /* R2 EGiftCards VGDESAI end */
	}

	for (j = 0; j < length; j++) {
		var item = document.getElementById('giftCheck' + j);
		if (item != null && item.checked) {
			check = check + 'true' + ",";
		} else {
			check = check + "false" + ",";
		}
	}

	document.getElementById("samsAddItemToCartSubselected" + id).value = check;
	formobj.submit();
}
function addMultipleItemsToCart1(formobj, id) {

	var length = document.getElementById("formCountDummy").value;
	var check = "";
	for (i = 0; i < length; i++) {
		if (document.getElementById('delqty' + i) != null
				|| document.getElementById('delqty' + i) != undefined) {
			if (document.getElementById('multidelqty' + i + formobj) != null
					|| document.getElementById('multidelqty' + i + formobj) != undefined) {
				document.getElementById('multidelqty' + i + formobj).value = document
						.getElementById('delqty' + i).value;

			}
		}
		if (document.getElementById('pickqty' + i) != null
				|| document.getElementById('pickqty' + i) != undefined) {
			if (document.getElementById('multipickqty' + i + formobj) != null
					|| document.getElementById('multipickqty' + i + formobj) != undefined) {
				document.getElementById('multipickqty' + i + formobj).value = document
						.getElementById('pickqty' + i).value;
			}
		}
		if (document.getElementById('delgiftItemid' + i) != null
				|| document.getElementById('delgiftItemid' + i) != undefined) {
			if (document.getElementById('multidelgiftitemids' + i + formobj) != null
					|| document.getElementById('multidelgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multidelgiftitemids' + i + formobj).value = document
						.getElementById('delgiftItemid' + i).value;
			}
		}
		if (document.getElementById('pickgiftItemid' + i) != null
				|| document.getElementById('pickgiftItemid' + i) != undefined) {
			if (document.getElementById('multipickgiftitemids' + i + formobj) != null
					|| document.getElementById('multipickgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multipickgiftitemids' + i + formobj).value = document
						.getElementById('pickgiftItemid' + i).value;
			}
		}
		/* R2 EGiftCards VGDESAI start */
		if (document.getElementById('eGiftCardAmount' + i) != null
				|| document.getElementById('eGiftCardAmount' + i) != undefined) {
			if (document.getElementById('multiEGiftAmounts' + i + formobj) != null
					|| document.getElementById('multiEGiftAmounts' + i
							+ formobj) != undefined) {
				document.getElementById('multiEGiftAmounts' + i + formobj).value = document
						.getElementById('eGiftCardAmount' + i).value;
			}
		} /* R2 EGiftCards VGDESAI end */
	}

	for (j = 0; j < length; j++) {
		var item = document.getElementById('giftCheck' + j);
		if (item != null && item.checked) {
			check = check + 'true' + ",";
		} else {
			check = check + "false" + ",";
		}
	}

	document.getElementById("samsAddItemToCartSubselected" + id).value = check;
	var formNameObj = document.getElementsByName(formobj);
	formNameObj[0].submit();

}
function deleteGiftlistitem(formobj) {

	var formNameObj = document.getElementsByName(formobj);
	formNameObj[0].submit();
}
function selectAllShoppingList(elemId) {
	if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) {
		document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage;
	} else {
		document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage;
	}

	for (i = 0; i < size; i++) {

		var item = document.getElementById(elemId + i);
		if (item != null || item != undefined) {
			if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) {
				item.checked = true;
			} else {
				item.checked = false;
			}
		}
	}
}

//R2 shipping enh s1sivap changes start

function dockSubmit() {
	var objDockDoorChkBox = document.getElementById('dockDoorPresentCheckBox');
	if (objDockDoorChkBox != null) {
		if(objDockDoorChkBox.checked && 
				!objDockDoorChkBox.disabled) {		
			document.getElementById('dockDoorPresent').value='Y';
		}
	}	
	showhide('dockDoorTerms');
}

function dockCancel() {
	document.getElementById('dockDoorPresentCheckBox').checked = false;
	document.getElementById('dockDoorPresent').value = 'N';
	showhide('dockDoorTerms');
}

function showDockDoorTerms() {	
	if (document.getElementById('dockDoorPresentCheckBox').checked==true)
	{
		showhide('dockDoorTerms');		
	} else {
		hidePopUp('dockDoorTerms');
		document.getElementById('dockDoorPresent').value='N';
	}
}

function showDockDoorCheck() {
	var objDockDoorCheckBox = document.getElementById('addOrChangeAddress');
	if (objDockDoorCheckBox != null) {
		if (document.getElementById('com').checked) {
			objDockDoorCheckBox.style.display='';
		} else if (document.getElementById('res').checked) {
			objDockDoorCheckBox.style.display='none';
			document.getElementById('dockDoorPresent').value='N';
		}
	} else if (document.getElementById('changeCommAddr') != null) {
		if (document.getElementById('com').checked) {
			document.getElementById('changeCommAddr').style.display='';
		} else if (document.getElementById('res').checked) {
			document.getElementById('changeCommAddr').style.display='none';
			document.getElementById('dockDoorPresent').value='N';
		}
	}
}

function checkFormSubmit(ev) {
	if (chkDisablePopupSubmit == "notDefault") {
		return false;
	} else {
		return true;
	}
}

//R2 shipping enh s1sivap changes end
/* Start PASupport:: 25th April, 2011 :: AutoRenew */
function submitForm()
{	    
	if(document.getElementById('autoRenewMembership').checked){
		if(document.getElementById('autoRenewYes').checked || 
				document.getElementById('autoRenewNo').checked){
			
			if(document.getElementById('autoRenewYes').checked && !(document.getElementById('saveAsDefault').checked)){
				document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectDefaultPaymentmethod+ '</h2></div>';
			}else{
				document.addPayment.submit(); 
			}
		}else{
			document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectAutoRenewYes+ '</h2></div>';
		}
	}else{
		document.addPayment.submit(); 
	}

}
function submitFormOnEnterIn(form, ev) { 
	var keycode; 
	if (window.event) 
	{ keycode = window.event.keyCode;
	} else if (ev) {
	keycode = ev.which;
	} else
	 { return true; 
	 } 
	if (keycode == 13) {
	if (regFocus.length == 0) {  
	trimFormElements(form);
	submitForm();	
	return false; 
	} }	else {
	return true; 
	} 
	return false;
}
function submitAutoRenewForm(){
	if(document.getElementById("autoRenewTrue") || document.getElementById("autoRenewFalse")){
		if(document.getElementById("autoRenewTrue").checked  || document.getElementById("autoRenewFalse").checked){
		document.changeRenewalSetting.submit();
		}else{
			document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectAutoRenewYes+ '</h2></div>';
		}
	}
}
 /* End PASupport:: 25th April, 2011 :: AutoRenew */
/* Start PASupport: 22Mar2011 for 8384 (GE-PO Issue) */
function isAlphnumericKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode; 
	if (!(charCode>=48 && charCode<=57 || charCode>=65 && charCode<=90 || charCode>=97 && charCode<=122)) {
		return false; }
	else { 
		return true; 
	}
}
/* End PASupport: 22Mar2011 for 8384 (GE-PO Issue) */
//Start PASupport Site-Enhancements 07 dec 2011 : Adding new method to update fields on click on swatches
function changeFieldsForSwatches(skuId,productId)
{

	$('#swatchSKUID').html('<input value="'+skuId+'" name="/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds" id="mainForm'+skuId+'" type="hidden"><input value=" " name="_D:/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds" type="hidden">'); 

	$.get("/sams/shop/product/ajax/skuPickerAjax.jsp?skuId="+skuId+"&productId="+productId, displayResult);
	
}
//End PASupport

function displayResult(data) {
       //begin of 12.8 site stabilization refresh the inventory lable 
 	   $("div#productDisplayName").html( data.productDisplayName);
 	   //end of 12.8 site stabilization refresh the inventory lable 
	   $("div#price").html( data.price);
       $("#model").html( data.model);
	   $("#item").html( data.item);
		$("div#shopFilter").html( data.shopFilter);
		$("div#variance").html( data.vari);
		$("div#shippingIncluded").html( data.shippingIncluded);
		// Start Add YP for the swatch bug 01-05-2012
		if(document.getElementById('swatchImg')){
		   $("div#swatchImg").html( data.swatchImg);
		}
		
  }

//Start    PASupport Site-Enhancements User Story 3 18 jan 2012 : Adding new method to display club locator pop-up
function callClubLocatorOverlay(productId,skuId,rdURL){
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(rdURL));
	  }
}
//End PASupport
//Start PASupport Site-Enhancements User Story 5 27 jan 2012 : Adding new method to update fields on changing variance
function changesDetailsAfterSelection(productId,variance)
{
	var position = "side";
	selectedVariance = variance;
	$('.loadVarianceCircle').css("display",'block');
	$('#eveDisplay').load("/sams/eValues/shop/displayevalueicon.jsp?productId="+productId+"&variance="+selectedVariance+"&position="+position);
	$.get("/sams/shop/product/ajax/getSkuOfSelectedVariance.jsp?productId="+productId+"&variance="+variance,getResults);
	$('.loadVarianceCircle').animate({fontSize: "1em"},4000).fadeOut('slow');

}


function getResults(result){	
	if(result!= null){
		var imageName=result.largeImageName;
		imageName=imageName.substring(0,imageName.lastIndexOf("_"));
		sjPD.changeImage(imageName,result.skuId,result.productId);
	}
}

//End PASupport
$(document).ready(function() {
	$('#updateEmail #updateEmaillink').click(function() {	
	var newEmail=$('#updateEmail #newEmail').val();
	var confirmEmailAddress=$('#updateEmail #confirmEmailAddress').val();
	var password=$('#updateEmail #password').val();
	//alert("newEmail="+newEmail+"\nconfirmEmailAddress="+confirmEmailAddress+"\npassword="+password);
	var dataString = 'newEmail='+newEmail+'&confirmEmailAddress='+confirmEmailAddress+'&password='+password;
		$.ajax({
			
			type: "POST",
			url: "/sams/preference/preferenceUpdateEmailAjax.jsp",
			data: dataString,
			success: function(msg) {	
			alert(msg);
				if(msg.trim()=='success') {	
					$('#ErrorMessage').html("");
					$('#SuccessPage').show();					
				} 
				else {
					$('#SuccessPage').hide();
					$('#ErrorMessage').html(msg.trim());
				}
			}
		});
		return false;
	});
});
function step1form(){
document.step1Form.submit();
}
function step2form(){
	document.step2Form.submit();
	}
/* Start PASupport: 29 March 2012, S2 evalues  */
$(document).ready(function(){
	 
	$('.test').click(function(){
		var itemId;
		if(!$('#cnpItemNumber').val()){
			itemId=$('#onlineItemNumber').val();
		}
		if(!$('#onlineItemNumber').val()){
			itemId=$('#cnpItemNumber').val();
		}
		var response = {
				evaluerequest:{
	        	itemnumber:itemId,
	        	page:'productDetail'
	    	}
		}
		var data = $.parseJSON(response);
		$.ajax({			
			type:"GET",
				url:"/sams/product.jsp?jsonRequest="+JSON.stringify(response),
					contentType:'application/json charset=utf-8',						
							success:function(data) {
					}
					
		});
		
	});
	
	

});

function showEvalueMsg() { 
      if (document.getElementById) {
            if(document.getElementById('eValuesMsg')){
                  document.getElementById('eValuesMsg').style.visibility = 'visible'; 
                  document.getElementById('eValuesMsg').style.display = 'block';
            }
      } 
}

/* End PASupport: 29 March 2012, S2 evalues  */


/* Start PASupport: 7 April 2012 for S2 */

/*defined a namespace to define global vars for pdp json and modal window related activities - pj*/
pdpJson = {
		pdpJsonUrl:''
}

/* Comment		: This method is used to load the pop-up window, the inner content will be loaded after reading from pdp json file. */
function eValModal(eValJSONUrl, prodId, pageName){
	var eValJSONUrlVal = eValJSONUrl;
	var prodIdVal = prodId;
	var pageNameVal = pageName;		
	//url being saved in a global var 
	pdpJson.pdpJsonUrl = eValJSONUrl+'?productId='+prodId+'&itemNumber='+pageName+'&src=web';
	//alert(pdpJson.pdpJsonUrl);
}

$(document).ready(function(){
	//set modal window status = close	
	var modalStatus = false;
	
	  
	//adds the class on-the-fly
	$('.evalButn').click(function(){
		
		//keeping a check if modal window is already open
		if (modalStatus == false){
		//assign an id to the link on-the-fly 
		$(this).attr('id','myEvalButn');		
		
		// load and populate modal window - start //
		
		var mainHtml = '<div class="evaluesOverlay">';		  
		  mainHtml += '<div class="evaluesTitle forModal"><h2 class="jsonTitle"></h2><img src="/sams/images/BTN_Close-modal_19x20.gif" alt="Close" title="Close" /></div>';
		  mainHtml += '<div class="scroll">';		  
		
		 
		  /* Currently this has a static URLs and is not posting JSON request yet, this will be replaced by a dynamic one by Onsite */	
		  $('body').delegate("a#myEvalButn","click",(function() {				
				//set modal window status = open
			  modalStatus = true;
			  
			  //
				$.getJSON(pdpJson.pdpJsonUrl,function(sampData){
					
					//following lines truncates the evalue title (in modal window) to 41 chars and adds 3 ellipses to it 
					var truncTitle = sampData['producttitle'];
					var availability = sampData['availability'];
					if (truncTitle.length > 41){
						truncTitle = truncTitle.substring(0,41)+'...';
					}
					$('.evaluesTitle h2').html(truncTitle);
					 
				$('.scroll').empty(); 	
				
				if(sampData['evalue'] != ''){//check if json data not available
				
				var productid = sampData.productid;				
					/* Looping only the eValue (Level-1)*/
					var html = '<ul id="eValueItems"><div class="ConditionText">'+availability+'</div>';							
					
					$.each(sampData['evalue'], function(idx1, val1){ 	
						
						var eValTypeInt = val1['eValueType'];
						
						//$('.jsonTitle').html(producttitle);					
						var evalID =val1.eValueId;
						html += '<li class="eValListItems">';				
		                html += '<div class="ProductImage"><img src="'+val1['eValueImage']+'" alt="'+val1['title']+'" title="'+val1['title']+'" width="80" /></div>';  				 
		                html +='<div class="ProductDesc"><div class="HeaderText">' + val1['title']+'</div>';
													
						
						// Loop through the skuvariants
						/*
							$.each(val1['skuvariants'], function(idx2, val2){													
									var skunumber = val2.skunumber;							
									var titleVal = val2.title;	
									var imgPath	= val2.image;
									var url = val2.url;
									var description = val2.desc;
									var descriptionText=new Array();							
									$.each(val2['desc'], function(idx3, val3){								
										descriptionText[idx3]=val2.desc[idx3]+'<li>';								
									});
									//
									var spid = "p"+skunumber+idx2;
									//						
									html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
								});
							
						html += '</ul></div>'; 				
						html += '<div class="ProductAvailability">';
						//html += '<div class="ProductAvailabilityText">Available...'+val1['availStart']+'</div>';
						html += '<div class="ProductAvailabilityText">'+val1['startDateStatus']+'...'+val1['availStart']+'</div>';						
		                */						
						/* -- */
						/* loop to get coreskus*/ 		
															
						if (eValTypeInt == 1 || eValTypeInt == 2){
							
							html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';		
							html +='<span class="myeValLimit">'+val1['usage']+'</span>';		
												
						// Loop through the coreskus
							$.each(val1['coreSkus'], function(idx2, val2){													
								var skunumber = val2.skunumber;							
								var titleVal = val2.title;	
								var imgPath	= val2.image;
								var url = val2.url;
								var description = val2.desc;
								var descriptionText=new Array();							
								$.each(val2['desc'], function(idx3, val3){								
									descriptionText[idx3]=val2.desc[idx3]+'<li>';								
								});
								//
								var spid = "p"+skunumber+idx2;
								//						
								html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
							});
						
					html += '</ul>'; 	
						
						}else if(eValTypeInt == 3 || eValTypeInt == 4){	
							
							html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';	
							html +='<div class="isSubHeadPdp"><strong>'+val1['seedTitle']+'</strong></div>';
							html +='<div class="clearfix"></div><span class="myeValLimit">'+val1['usage']+'</span>';		
							
							// Loop through the seedskus
							html +=''
								$.each(val1['seedSkus'], function(idx2, val2){													
									var skunumber = val2.skunumber;							
									var titleVal = val2.title;	
									var imgPath	= val2.image;
									var url = val2.url;
									var description = val2.desc;
									var descriptionText=new Array();							
									$.each(val2['desc'], function(idx3, val3){								
										descriptionText[idx3]=val2.desc[idx3]+'<li>';								
									});
									//
									var spid = "p"+skunumber+idx2;
									//						
									html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
								});
							
						html += '</ul>'; 	
						
						html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';	
						html +='<div class="isSubHeadPdp"><strong>'+val1['rewardTitle']+'</strong></div>';
						html +='<span class="myeValLimit">'+val1['usage']+'</span>';		
						
						// Loop through the rewardskus	
						
						html +=''
							$.each(val1['rewardSkus'], function(idx2, val2){													
								var skunumber = val2.skunumber;							
								var titleVal = val2.title;	
								var imgPath	= val2.image;
								var url = val2.url;
								var description = val2.desc;
								var descriptionText=new Array();							
								$.each(val2['desc'], function(idx3, val3){								
									descriptionText[idx3]=val2.desc[idx3]+'<li>';								
								});
								//
								var spid = "p"+skunumber+idx2;
								//						
								html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
							});
						
					html += '</ul>'; 				
							
						}else{
							//nothing
						}
						html += '</div>';	
						/* -- */
						
						/* condition to check if it is expires or expires soon */
						html += '<div class="ProductAvailability">';
						//html += '<div class="ProductAvailabilityText">Available...'+val1['availStart']+'</div>';
						html += '<div class="ProductAvailabilityText">'+val1['startDateStatus']+'...'+val1['availStart']+'</div>';
						
						var expFlag = (val1['expiryFlag']);
						if (expFlag == 1){
							html += '<div class="ProductExpiryText"><span class="expires">'+val1['availStatus']+'</span><span class="expiryDate">...'+val1['availEnd']+'</span></div>';				
						}
						else{
							html += '<div class="ProductExpiryText"><span class="expiresSoon">'+val1['availStatus']+'</span><span class="expiryDate">...'+val1['availEnd']+'</span></div>';				
						}
		                /**/
						html += '</div></li>';							
					  });	
					  html +='</ul>';
					 $('.scroll').append(html); 
					 
				} else{
					$('.scroll').html('<h2 class="jsonError">Sorry, please try later.</h2>');//rendering error if no data available				
				}
					 });	
						
		        
				$(".evaluesOverlay").show("fast");	
								
		        return false;  
		     }));  
		        $("body").delegate("div.evaluesTitle img","click", (function(event){
				$(".evaluesOverlay").hide("fast");
				$('body').find('a').attr('id','');
				//removes the class that was assigned on the fly while clicking on 'view savings'
				$(".evaluesOverlay").remove();
				//set modal window status = close
				modalStatus = false;
		      }));
		   mainHtml += '</div></div>';
		   $("a#myEvalButn").after(mainHtml);
		  //load and populate modal window - end //
		   
			
	
	}
		
	
	});
	  
});

setTimeout(function() {
 	$('.evaluesOverlay').ready(function(){
		
				/* see all - start - p0joshi */
				/* find an eValue with more than 2 skus */
				var liSize = $(".ItemsChoicePDP").find("li:gt(2)");
				//add a class to hide the li 
				$(liSize).addClass('hideLi');
				$(liSize).parent().addClass('add-SeeAll');
				$('.add-SeeAll').after('<a href="#/" class="seeallLink">...See all</a>');		
					
				//display 'see all' and enable a click on it
				$('.seeallLink').click(function(){
					$(this).parent().find('.hideLi').removeClass('hideLi');		
					$(this).parent().find('.seeallLink').hide('fast');		
				});	
				/* see all - end - p0joshi */
				});
}, 5000);

	/* Function		: fnShowPopUp takes the ID, Image Path, Title & the Description as input parameters */	
	/* Last Editor	: Sathya */
	/* Date			: 03/27/2012 */
	/* Comment		: This method is used to show the child pop-up upon mouse over corresponding to the Link-ID */

	 function fnShowPopUp(skunumber,spid,imgPath,titleText,descriptionText){	
		jQuery(".triangle-border").empty();		
		var arrElements = new Array();	
		arrElements = descriptionText.split('<li>,');		
		var htm = '<div class="opImage">';
		htm += '<img src="'+imgPath+'" /></div>';
		htm += '<div class="opBody"><h1>' + titleText +'</h1>';
		htm += '<ul class="opDesc">';
		for(var ival=0;ival<arrElements.length;ival++){		
			htm += '<li>' + arrElements[ival].replace('<li>','') + '</li>';
		}	
		htm += '</ul></div><div class="itemNo">Item #: '+skunumber+'</div><div class="clearfix"></div>';
		htm += '<div>&nbsp;</div><span class="eVarrow"></span>';//added span tag to create arrow at the bottom of pop-up box (by Stan 05-16-2012)	

		$("#"+spid).append(htm);
		var boxHeight = $("#"+spid).height();
		
		var vOffset = 35;
		if ($.browser.webkit) {
           vOffset=47;
          }
		var vertPos = boxHeight+vOffset;// Fix for Google Chrome! (by Stan 6-9-2012)

        $("#"+spid).css('margin-top', '-'+vertPos+'px');//setting vertical offset of each pop-up box (by Stan 05-15-2012)                
        $("#"+spid).css('display', 'block');
		
		$("#"+spid).insertAfter('.scroll').fadeIn();
		$("body").delegate("ul.ItemsChoicePDP li a", "mousemove", function(e){
			$('#'+spid).offset({left:e.pageX - 53, top:e.pageY - 134});
		});
	}
	/* Function		: fnHidePopUp takes the ID as input parameter */	
	/* Last Editor	: Sathya */
	/* Date			: 03/27/2012 */
	/* Comment		: This method is used to hide the child pop-up corresponding to the ID */
	function fnHidePopUp(id){
		document.getElementById(id).style.display='none';
		$("body").undelegate("ul.ItemsChoicePDP li a","mousemove");
	}
	function setRegOnlineAndSubmit(){
		var formObj = document.registrationForm;
		if((document.getElementById("checkboxOnline")!=null ||
				document.getElementById("checkboxOnline")!=undefined) && 
					document.getElementById("checkboxOnline").checked){
			formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value=
				formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value+"&regOnline=true";
		} else {
			formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value=
				formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value+"&regOnline=false";
		}
		submitRegistration();
  	}
	
	/* to open an overlay window on the new My Sams page - p0joshi*/
	function fnOpenMySamsOverlay(){	
		//alert("mysams overlay");
			var MySamsPostion = $(document).scrollTop();
			MySamsPostion = MySamsPostion + 20;	
			$('.mySamsModalContainer').css('display','block');
			$('.mySamsModalContainer').empty();
			
			var urlPath = '/sams/shoppingtools/justforyou/justForYouModal.jsp';
			$.ajax({
				type: 'GET',
				url : urlPath,
				cache:false,                                                        
				//data: "commerceItemId="+commerceItemId,                                                                                    
				success:function(result){                                                             
					$('.mySamsModalContainer').html(result); 
				}                                                                              
			});		
		$('.mySamsModalContainer').css("top",MySamsPostion);		
		$('.mySamsModalContainer').css("position","absolute");
		$('.mySamsModalContainer').css("z-index","99999");
		$('.mySamsModalContainer').css("left","5px");
		$('.mySams_overlayBG').css('display','block');
		//
		}	
/* End PASupport: 7 April 2012 for S2 */

//StartPA Support  for 12.8

/* Function		: fnCalculateTotal  */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: Amount will be set as a part of the input parameter for each radio button field. Upon selecting the radio button, this method calculates the TOTAL amount for the number of quantities if applicable. */	
	function fnCalculateTotal(amount,commerceId){
		var radioButtonsVal = document.getElementsByName('ProtectPlanOption');				
		var rdx = 0;			
		for (rdx = 0; rdx < radioButtonsVal.length; rdx ++) {					
			if (radioButtonsVal[rdx].checked) {
					var serviceAgrement = radioButtonsVal[rdx].value;						
					//$('.slidingDiv').load('/sams/cart/protectionplanSpecifications.jsp?id='+serviceAgrement+'&comerceItemId='+commerceId);									
					//$('.slidingDiv').html('');
					var urlDataPath = '/sams/cart/protectionplanSpecifications.jsp';
					var PPDataString = 'id='+serviceAgrement+'&comerceItemId='+commerceId;
					$.ajax({
						type: 'GET',
						url : urlDataPath,
						cache:false,				
						data: PPDataString,						
						success:function(result){				
							$('.slidingDiv').html(result); 			
						}						 					 
					});
				}
		}
		var Quantity=0;
					if(amount!='0'){				
						document.getElementById('QtyDDValue').disabled = false;						
						if(document.getElementById('QtyDDValue').value !=null && document.getElementById('QtyDDValue').value!='' ){							
							Quantity= document.getElementById('QtyDDValue').value;						
							amount = parseFloat(amount.replace('$','') * Quantity);							
							$('#GrandTotal').html('$'+amount.toFixed(2));							
						}
					else if(document.getElementById('qtyLbl').value !=null && document.getElementById('qtyLbl').value!='' ){
							Quantity= document.getElementById('QtyDDValue').value;						
							amount = parseFloat(amount.replace('$','') * Quantity);								
							$('#GrandTotal').html('$'+amount.toFixed(2));	
						}						
						else{
							$('#GrandTotal').html('$'+amount);	
						}
					}else{					
						document.getElementById('QtyDDValue').disabled = true;
						$('#GrandTotal').html('$00.00');	
					}
					
		}
/* Function		: EnableQty */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: This method is used to enable the dropdown on the page load based on the number quantity */	
		function EnableQty(QuantityCount,totalItems){	
				if(QuantityCount >1 && (document.getElementById('QtyLbl')!=null)){
				document.getElementById('QtyLbl').style.display = '';
				$('#QtyCount').html(QuantityCount);
				document.getElementById('QtyDD').style.display = '';
				document.getElementById('QtyDDValue').style.display = ''
				var iCount=0;		
				//Dynamically add the numer of quantities in the drop down list in the Descending order...
				for(iCount=QuantityCount;iCount>0;iCount--){				
					var optn = document.createElement("OPTION");
					optn.text = iCount;
					optn.value = iCount;
					document.getElementById('QtyDDValue').options.add(optn); 
				}	
				//document.getElementById('QtyDDValue').options[0].selected = true;						
				var radioButtons = document.getElementsByName('ProtectPlanOption');
				for (var x = 0; x < radioButtons.length; x ++) {
					  if ((radioButtons[x].checked) && (radioButtons[x].value=='0')) {  
						//Disable the dropdown if no protection plan is selected.
						 document.getElementById('QtyDDValue').disabled=true;
						 break;
						}
					 }			 
				}
				if(totalItems!=null && totalItems !=''){					
					document.getElementById('QtyLbl').style.display = '';
					$('#QtyCount').val('');
					$('#QtyCount').html(totalItems);
				}
				
		}	
		

/* Function		: fnDropdownTotal  */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: Amount will be set as a part of the input parameter for each radio button field. Upon choosing the Drop down value (When enabled), this method calculates the TOTAL amount */	
	function fnDropdownTotal(quantity){
			var radioButtonsVal = document.getElementsByName('ProtectPlanOption');			
			var planAmount =0;	
			var rdx = 0;			
			for (rdx = 0; rdx < radioButtonsVal.length; rdx ++) {					
				if (radioButtonsVal[rdx].checked) {
					if(radioButtonsVal[rdx].value !='0') {
						var serviceAgriment = document.getElementById(radioButtonsVal[rdx].value);						
						planAmount = parseFloat(serviceAgriment.innerHTML.replace('$','') * quantity);						
						$('#GrandTotal').html('$'+planAmount.toFixed(2));	
						break;
					}					
					else{ 					
						//document.getElementById('GrandTotal').innerHTML = '$00.00';											
						$('#GrandTotal').html('$00.00');	
						break;						
					}
				}
			}				
		}
		
/* Function		: fnUpdateProtectionPlan*/           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: This method will be triggered when the user is in Cart page and clicks on Edit link */			
	function fnEditProtectionPlan(prodCount,planCount){
		// Show the quantity label on top regardless if the no of product is just 1
		document.getElementById('QtyLbl').style.display = '';
		document.getElementById('QtyCount').innerHTML =prodCount;		
		
		//show the corresponding radio button option which was opted earlier
		//Show the total number of plan count. Here we need to show the label instead of the drop down. Regardless if it is 1
		document.getElementById('QtyDD').style.display = '';
		document.getElementById('QtyDDValue').style.display = 'none';
		document.getElementById('qtyLbl').style.display = '';
		document.getElementById('qtyLbl').innerHTML =planCount;		
	}

	//StartPA Support  for 12.8
	$('#addtocartsingleajax').live('click',function() {			
		$('.loadPPOverlayCircle').css('display','block');
	    var dataString = "/sams" + $("#addToCartSingleForm").serialize();		
		var PDPaction = $("#addToCartSingleForm").attr("action");	
		$('.Protectionplan-Overlay-Container').empty();
	    var res = false;		  
		var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
		var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
		$('.loadPPOverlayCircle').css('display','block');
		$('.loadPPOverlayCircle').css("position","absolute");
		$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('.loadPPOverlayCircle').css("left", "100px");		
		$.ajax({               
			type: "POST",
			url:PDPaction,
			data: dataString,
			dataType: "json",
			cache: false,
			success: function(respObj) {		
				if(respObj != undefined && respObj != 'undefined' && respObj != null){
					var comeerceItemId= respObj.commerceItemId;
					var prdId = respObj.pId;
					var zipcodepageurl = respObj.GEZipcodePageUrl;				 
					var gepage = respObj.GEZipCodepage;				 
					if(gepage =='GE'){					
						window.location.href= zipcodepageurl;
					} else {
						if(respObj.isOverlay && respObj.isSuccess){
						//	Here is the nested Ajax call to load the actual protection plan upon Success...
							var urlCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var cartDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
						$.ajax({
							type: 'GET',
							url : urlCartPath,
							cache:false,				
							data: cartDataString,						
							success:function(result){				
								$('.Protectionplan-Overlay-Container').html(result); 
								$('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top', overlayPos+ "px");
								$('.Protectionplan-Overlay-Container').css('position','absolute');	
								$('.Protectionplan-Overlay-Container').css("left","80px");
								$('.Protectionplan-Overlay-Container').css("z-index","99999");									
								$('.Protectionplan-Overlay-Container').css('display','block');								
							});							 
							fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});		        
				} else if(respObj.isSuccess && !respObj.isOverlay){
					window.location.href="/sams/cart/addToCartConfirmPage.jsp";
				} else{
					if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
						$('#delqty').css("border","solid 2px #CC0000");
						$('#pickqty').css("border","solid 2px #CC0000");
					}				
					//Consolidated the error case and calling fnShowErrorCode method...
					fnShowErrorCode(respObj.Error_Code);
				}
			}
		}else{
			fnRecallJustOnce();
			//fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }, 
      error: function(respObj){				
		//Consolidated the error case and calling fnShowErrorCode method...	
		if(respObj != undefined && respObj != 'undefined' && respObj != null){
			fnShowErrorCode(respObj.Error_Code);
		} else {
			fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }
	});
		return res;	
	});
	
	function fnRecallJustOnce(){			
		$('.loadPPOverlayCircle').css('display','block');
	    var dataString = "/sams" + $("#addToCartSingleForm").serialize();		
		var PDPaction = $("#addToCartSingleForm").attr("action");	
		$('.Protectionplan-Overlay-Container').empty();
	    var res = false;		  
		var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
		var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
		$('.loadPPOverlayCircle').css('display','block');
		$('.loadPPOverlayCircle').css("position","absolute");
		$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('.loadPPOverlayCircle').css("left", "100px");		
		$.ajax({               
			type: "POST",
			url:PDPaction,
			data: dataString,
			dataType: "json",
			cache: false,
			success: function(respObj) {				
				if(respObj != undefined && respObj != 'undefined' && respObj != null){
					var comeerceItemId= respObj.commerceItemId;
					var prdId = respObj.pId;
					var zipcodepageurl = respObj.GEZipcodePageUrl;				 
					var gepage = respObj.GEZipCodepage;				 
					if(gepage =='GE'){					
						window.location.href= zipcodepageurl;
					} else {
						if(respObj.isOverlay && respObj.isSuccess){
						//	Here is the nested Ajax call to load the actual protection plan upon Success...
							var urlCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var cartDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
						$.ajax({
							type: 'GET',
							url : urlCartPath,
							cache:false,				
							data: cartDataString,						
							success:function(result){				
								$('.Protectionplan-Overlay-Container').html(result); 
								$('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top', overlayPos+ "px");
								$('.Protectionplan-Overlay-Container').css('position','absolute');	
								$('.Protectionplan-Overlay-Container').css("left","80px");
								$('.Protectionplan-Overlay-Container').css("z-index","99999");									
								$('.Protectionplan-Overlay-Container').css('display','block');								
							});							 
							fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});		        
				} else if(respObj.isSuccess && !respObj.isOverlay){
					window.location.href="/sams/cart/addToCartConfirmPage.jsp";
				} else{
					if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
						$('#delqty').css("border","solid 2px #CC0000");
						$('#pickqty').css("border","solid 2px #CC0000");
					}				
					//Consolidated the error case and calling fnShowErrorCode method...
					fnShowErrorCode(respObj.Error_Code);
				}
			}
		}else{									
			fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }, 
      error: function(respObj){				
		//Consolidated the error case and calling fnShowErrorCode method...		
		fnShowErrorCode(respObj.Error_Code);	
      }
	});
		return res;		
	}
	
	
	
	
		$('.searchAddtocart').live('click',function() {					
				var formId=this.form.id;
				var action = $("#"+formId).attr("action");
				var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
				var popupRePosition = $(document).scrollTop() +10;
						overlayPos = popupRePosition +40;
				$('.loadPPOverlayCircle').css('display','block');
				$('.loadPPOverlayCircle').css("position","absolute");
				$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
				$('.loadPPOverlayCircle').css("left", "100px");
				var dataString = "/sams" + $("#"+formId).serialize();
				$('.Protectionplan-Overlay-Container').empty();
				var res = false;		
				$.ajax({
				  context: this,	
				  type: "POST",
				   url:action,
				  data: dataString,
				  dataType: "json",
				  cache: false,
				  success: function(data) {
				   if(data!=null && data!=''){
					var comeerceItemId= data.commerceItemId;
					var prdId = data.pId;
					 var zipcodepageurl = data.GEZipcodePageUrl;				 
					 var gepage = data.GEZipCodepage;				 
					 if(gepage =='GE'){					
					window.location.href= zipcodepageurl;
					 }else {
					 if(data.isOverlay && data.isSuccess){
					//Here is the nested Ajax call to load the actual protection plan upon Success...
					var urlSearchtoCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var searchDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
					$('#'+prdId).html('');
					$.ajax({
						type: 'GET',
						url : urlSearchtoCartPath,
						cache:false,				
						data: searchDataString,						
						success:function(result){				
							$('#'+prdId).html(result); 
							 $('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top',popupRePosition);								
									$('.Protectionplan-Overlay-Container').css('position','absolute');	
									$('.Protectionplan-Overlay-Container').css("left","80px");
									$('.Protectionplan-Overlay-Container').css("z-index","99999");										
										$('#'+prdId).css('display','block');
								});							  
							  //$('#ajaxCartLoad').load('/sams/common/myCart.jsp');
							   fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});
				   }else if(data.isSuccess && !data.isOverlay){
					   if(data.fromShippingList){
						   window.location.href="/sams/cart/addToCartConfirmPage.jsp?shoppinglist=true";
					   }else{
						   window.location.href="/sams/cart/addToCartConfirmPage.jsp"; 
					   }						
					 }					 
				   else{						
						//Consolidated the error case and calling fnShowErrorCode method...
						fnShowErrorCode(data.Error_Code);
						if(data.fromShippingList){
							addErrorInListpage(data);
						}
				    	 
		             }
					 }
					 }
					 //The response object is empty hence throwing the error message...
							else{						
								fnShowErrorCode('m_error_reset_wrong_att_system_fail'); 
							}
					}, 
					error: function(data){						
						//Consolidated the error case and calling fnShowErrorCode method...
						fnShowErrorCode(data.Error_Code);
					}
				});
		return res;
		});
		



	function callProtectionplanOverlay(commerceItemId){		
		var newTopPostion = $(document).scrollTop();
		newTopPostion = newTopPostion + 80;					
		$('#'+commerceItemId).empty();
		$('#'+commerceItemId).css('display','none');
		var urlPath = '/sams/cart/cartProtectionplanSelctor.jsp';
		$.ajax({
		type: 'GET',
		url : urlPath,
		cache:false,                                                        
		data: "commerceItemId="+commerceItemId,                                                                                    
		success:function(result){                                                             
				$('#'+commerceItemId).html(result);
				$('#'+commerceItemId).css("top",newTopPostion);
				$('#'+commerceItemId).css("left","80px");
				$('#'+commerceItemId).css("position","absolute");
				$('#'+commerceItemId).css("z-index","99999");                                
				$('#'+commerceItemId).css('display','block');	
			}                                                                              
		});
			
}
	/* Threshold Shipping begins */
	/* function to bring up the tooltip on simple saver logo - prashant - 6/25/2012*/
		$(".threshold-tooltip").ready(function () {          

			var htm1 = '<div>&nbsp;</div><span class="eVarrow"></span>';
			$(".simpleSaverToolTip").append(htm1);		
					
			$('.simpleSaverLogo .simpleSaverLogoSideCart').ready(function() {
			$('.simpleSaverLogo, .simpleSaverLogoSideCart').each(function () {	
			
			var boxHeight = $(".simpleSaverToolTip").height();
			//alert("boxHeight = "+boxHeight);
			var vOffset = 55;
			if ($.browser.webkit) {
				vOffset=55;
		    }
			
			var distance = boxHeight-vOffset;// Fix for Google Chrome! (by Stan 6-9-2012)
			//var distance = 20;
			var time = 50;
			var hideDelay = 500;
			var hideDelayTimer = null;
			var beingShown = false;
			var shown = false;
			var trigger = $('.shipsFreeCopy', this);
			var info = $('.threshold-tooltip', this).css('display', 'none');
			$([trigger.get(0), info.get(0)]).mouseover(function () {
				if (hideDelayTimer) clearTimeout(hideDelayTimer);
				if (beingShown || shown) {
					// don't trigger the animation again
					return;
				} else {
					
					//var sfContainerOffset = $('.simpleSaverLogoSideCart').position();
					var sfOffset = $('.shipsFreeCopy').position();
					var xPos = sfOffset.left  - ($('.simpleSaverToolTip').width())/2 +15;					
					var yPos = sfOffset.top  - ($('.simpleSaverToolTip').height())*2;					
				
						if ($(this).parents('div').hasClass("simpleSaverLogoSideCart")){
						//positioning for side cart related bubble
							// reset position of info box
							beingShown = true;
							info.css({
							top: -110,							
							display: 'block'							
						}).animate({
							top: '-110px'
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
							});
						}else{
						//positioning for non side cart related bubble
						// reset position of info box
							beingShown = true;
							info.css({
							top: -93,
							left:0,
							display: 'block'							
						}).animate({
							top: '-93'
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
							});
						}					
				}
					return false;
			}).mouseout(function () {
				if (hideDelayTimer) clearTimeout(hideDelayTimer);
					hideDelayTimer = setTimeout(function () {
						hideDelayTimer = null;
						info.css({
							'display':'none'
						}).animate({
							top: '-=' + distance + 'px'
						}
						, time, 'swing', function () {
							shown = false;
						});
					}, hideDelay);
					return false;
				});
			});
		});
		//--> 		
		});
		
		/* function to pull up a modal window for Threshold Shipping banner on homepage */
		/* This function has been commented as the modal window is no more required */
		/*$(function(){				
			$('.tsShipsFreeDONT').click(function(){				
				fnOpenShipsFreeOverlay();
			})							
		});  
		
		function fnOpenShipsFreeOverlay(){	
			var ShipsFreePostion = $(document).scrollTop();
			ShipsFreePostion = ShipsFreePostion + 20;	
			$('.shipsFreeModalContainer').css('display','block');
			$('.shipsFreeModalContainer').empty();
			//
				var urlPath = '/sams/shop/product/common/thresholdShippingOverlay.jsp';
				$.ajax({
				type: 'GET',
				url : urlPath,
				cache:false,                                                        
				//data: "commerceItemId="+commerceItemId,                                                                                    
				success:function(result){                                                             
				$('.shipsFreeModalContainer').html(result); 
							}                                                                              
		});		
		$('.shipsFreeModalContainer').css("top",ShipsFreePostion);				
		$('.shipsFreeModalContainer').css("position","absolute");
		$('.shipsFreeModalContainer').css("z-index","99999");
		$('.shipsFree_overlayBG').css('display','block');		
		}*/		
				
	/* Threshold Shipping ends */
function fnOpenPPDetailsOverlay(protectionPlanItemId){	
	var ppDetailsPostion = $(document).scrollTop();
	ppDetailsPostion = ppDetailsPostion + 20;	
	$('.ProtectionplanDetails-Overlay-Container').css('display','block');
	$('.ProtectionplanDetails-Overlay-Container').empty();
	$.get('/sams/cart/protectionPlanDetails.jsp?ppItemId='+protectionPlanItemId, function(ppContent){
		$('.ProtectionplanDetails-Overlay-Container').html(ppContent); 
	});
		$('.ProtectionplanDetails-Overlay-Container').css("top",ppDetailsPostion);		
		$('.ProtectionplanDetails-Overlay-Container').css("position","absolute");
		$('.ProtectionplanDetails-Overlay-Container').css("z-index","99999");
}
function fnOpenPPDetailsOverlaypCart(protectionPlanItemId){		
	var ppDetailsPostion = $(document).scrollTop();
	ppDetailsPostion = ppDetailsPostion + 20;	
	$('.persistentCart').append('<div class="ProtectionplanDetails-Overlay-Container"></div>');
	$('.ProtectionplanDetails-Overlay-Container').css('display','block');
	$('.ProtectionplanDetails-Overlay-Container').empty();
	$.ajax({               
				type: "GET",
				url:'/sams/cart/protectionPlanDetails.jsp',
				data: 'ppItemId='+protectionPlanItemId,				
				cache: false,
				success: function(ppContent) {	
					$('.ProtectionplanDetails-Overlay-Container').html(ppContent); 
				}
		});
		$('.ProtectionplanDetails-Overlay-Container').css("top",ppDetailsPostion);		
		$('.ProtectionplanDetails-Overlay-Container').css("position","absolute");
		$('.ProtectionplanDetails-Overlay-Container').css("left","150px");		
		$('.ProtectionplanDetails-Overlay-Container').css("z-index","99999");
}
function callProtectionplanOverlayOrderHistory(commerceItemId,orderId,sgId){	
		var newTopPostion = $(document).scrollTop();
		newTopPostion = newTopPostion + 20;			
		$('#'+commerceItemId).empty();	
		$('#'+commerceItemId).css('display','none');
		$.get('/sams/cart/orderhistoryprotectionplanselector.jsp?commerceItemId='+commerceItemId+'&orderId='+orderId+'&ShGrpId='+sgId, function(result){
			$('#'+commerceItemId).html(result); 
		});
		$('#'+commerceItemId).css("top",newTopPostion);
		$('#'+commerceItemId).css("left","80px");
		$('#'+commerceItemId).css("position","absolute");
		$('#'+commerceItemId).css("z-index","99999");	
		$('#'+commerceItemId).css('display','block');				
}



$('#express').live('click',function() {	
	$('.loadPPOverlayCircle').css('display','block');
    var dataString = "/sams" + $("#addToCartSingleForm").serialize();
	   var action = $("#addToCartSingleForm").attr("action");	
	  $('.Protectionplan-Overlay-Container').empty();
    var res = false;		  
	  var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
	  var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
			$('.loadPPOverlayCircle').css('display','block');
			$('.loadPPOverlayCircle').css("position","absolute");
			$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
			$('.loadPPOverlayCircle').css("left", "100px");				
	      $.ajax({                
	        type: "POST",
	        url:action,
	        data: dataString,
	        dataType: "json",
	        cache: false,
	        success: function(data) {
	    	  var comeerceItemId= data.commerceItemId;
	    	  var prdId = data.pId;
				 var page='express';
				 var zipcodepageurl = data.GEZipcodePageUrl;				 
				 var gepage = data.GEZipCodepage;				 
				 if(gepage =='GE'){					
				window.location.href= zipcodepageurl;
				 }else {
			 if(data.isOverlay && data.isSuccess){
					//Here is the nested Ajax call to load the actual protection plan upon Success...
					var urlExpressCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var expressDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId+'&page='+page;
					$('.Protectionplan-Overlay-Container').html('');
					$.ajax({
						type: 'GET',
						url : urlExpressCartPath,
						cache:false,				
						data: expressDataString,						
						success:function(result){				
						$('.Protectionplan-Overlay-Container').html(result); 
						$('.Protectionplan-Overlay-Container').ready(function(){
							$('.loadPPOverlayCircle').hide();
							$('.Protectionplan-Overlay-Container').css('top', popupPosition+ "px");
							$('.Protectionplan-Overlay-Container').css('position','absolute');	
							$('.Protectionplan-Overlay-Container').css("left","80px");
							$('.Protectionplan-Overlay-Container').css("z-index","99999");									
							$('.Protectionplan-Overlay-Container').css('display','block');								
						});							 
						  //$('#ajaxCartLoad').load('/sams/common/myCart.jsp');	
						   fnUpdateRHSCart();	
						$(this).css({
							"display" : "block",
							"left" : ($("body").width()-$(this).width())/2
						});
						}					 
					});
		     }else if(data.isSuccess && !data.isOverlay){
		    	window.location.href='/sams/shop/product.jsp?productId='+prdId+'&checkout='+page;
			 }else{
				 //Start Modified for 12.9 site enhancements
				 if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
		                $('#delqty').css("border","solid 2px #CC0000");
	                    $('#pickqty').css("border","solid 2px #CC0000");
				     }
				 //end modified for 12.9 site enhancement changes								
				//Consolidated the error case and calling fnShowErrorCode method...
				fnShowErrorCode(data.Error_Code);
		    	 
             }
				 }
	      	}, 
	            error: function(data){							
				//Consolidated the error case and calling fnShowErrorCode method...
				fnShowErrorCode(data.Error_Code);
			}
	  });
	  return res;
	});
// Start12.9 site enhancement changes 
function SelectaClub(productId,skuId,rdurl,cId,page){	
	$('#pickup'+cId).show();
	$('#selectaclub'+cId).hide();
	
	$('#CartZipCode'+cId).live('click',function() {
		var zipCodeValue = $("#cartZip"+cId).val();
		if($("#cartZip"+cId).val().length == 0  || $("#cartZip"+cId).val()=="Enter ZIP, City or State"){
				$('#zipcodeError'+cId).css('display','block');
				$('#cartZip'+cId).addClass('cart_zipCodeErrorStroke');
		}
		else{
				$('#zipcodeError'+cId).css('display','none');					
				$('#cartZip'+cId).removeClass('cart_zipCodeErrorStroke').addClass('cart_zipCode');			
				
				callClubLocatorOverlayFromCartPage(productId,skuId,rdurl,cId,page);
			} 
	});
	
}
function callClubLocatorOverlayFromCartPage(productId,skuId,rdURL,cId,page){
	 var decodeUrl = decodeURIComponent(rdURL) 
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(decodeUrl)+"&page="+page+"&cID="+cId);
	  }
}

function changeClubFromCartPage(productId,skuId,rdURL,cId,page){	
	var changeclub = true;	
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&changeclub="+changeclub+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(rdURL)+"&page="+page+"&cID="+cId);
	  }
}


//end 12.9 site enhancement changes

function fnUpdateRHSCart(){	
	var urlRHSCartPath = '/sams/common/myCart.jsp';
    $.ajax({
           type: 'GET',
           url : urlRHSCartPath,
           cache:false,                                                                                                                                                    
           success:function(result){                                                             
                  // $('#ajaxCartLoad').html(result); 
				    $('.persistentCart').html(result); 
          }                                                                              
    });
}

$('#enableNotifyBtn').live('click',function() {
	 $('#mainAddToCart').empty();
	 document.getElementById('mainAddToCart').disabled=true;
		document.addToCartSingleForm.submit();
		
	 });
	 
function fnShowErrorCode(errCode){
		$('#ajaxError').empty();
		var msgurlPath = '/sams/common/getmessagekey.jsp';	
		if(!(errCode != '' && errCode !=null)){				
				errCode = 'm_error_reset_wrong_att_system_fail';
		}		
			$.ajax({
			type: 'GET',
			url : msgurlPath,
			cache:false,                                                        
			data: "key="+errCode,                                                                                    
			success:function(result){
							$('#ajaxError').addClass("orangeBg-whiteBrdr smMargB"); 						
							$('#displayError').hide();
							$('#ajaxError').html(result); 	
							$('#ajaxError').show();
							$('.loadPPOverlayCircle').hide();												
				}                                                                              
			});		
}
/* Start PA Modified :12.9 S2(Cash back) requirement */
function selectCashBack(){ 
	if(document.getElementById('cashPaymentGroupIds').checked){
		$.get("/sams/checkout/payment/addCashBack.jsp",function(sampData){								
			var payId = $.trim(($(sampData).find(".cashbackdiv")).html());				
			document.getElementById("cashPaymentGroupIds").value = payId;				
		});
	}else{		
		$.get("/sams/checkout/payment/removeCashBack.jsp",function(sampData){
		});
	}	
}
/* End PA Modified :12.9 S2(Cash back) requirement */
	
/* Start PA Modified :12.9 S2(MVP) requirement */

function submitCheckBoxForm(form, type) {
	if (type == 'select')
	{
		form.pilotpurchase.value = 'submit';
		if(form.selectMemType && !form.selectMemType.checked) {
		form.memType.value='Advantage Plus';
		} else {
		form.memType.value='Business Plus';
		}
		document.getElementById('pilotsetmemberInfo').disabled=true; 
		form.submit();
	} else {
		form.pilotpurchase.value = '';
		form.memType.value= '';
		document.getElementById('pilotpurchase').disabled=true;
		document.getElementById('pilotsetmemberInfo').disabled=false;
		}
  }
/* End PA support 12.9(MVP) changed */

function addErrorInListpage(data){
	$('.ajaxerr').removeClass("errorRed");
	$('#ajaxErrorTag'+data.pId).addClass("errorRed");
	if(window.location.href.indexOf("#") > -1) {
		window.location.href = document.URL	
	}else{
		window.location.href = document.URL+'#'
	}
}
/* Start PASupport 12.9 MVP Changes */

function submitFormOnEnterForPilot(form, ev) {
	var keycode;
	if (window.event) {
		keycode = window.event.keyCode;
	} else if (ev) {
		keycode = ev.which;
	} else {
		return true;
	}
	if (keycode == 13) {
		if (regFocus.length == 0) {
			trimFormElements(form);
			fetchPilotStatus('OnEnter', form);			
			return false;
		}
	} else {
		return true;
	}
	return false;
}

function fetchPilotStatus(content, form) {
	var zipCode = $("#zip").val();
	$.get("/sams/account/signin/fetchPilotStatus.jsp?zipCode=" + zipCode,
			function(result) {
				var reslength = result.length;			
				if (content == 'OnEnter') {
					if ((result != null || result != undefined)
							&& reslength > 0) {
						alert(result);
						form.submit();
					} else {
						form.submit();
					}
				} else {
					if ((result != null || result != undefined)
							&& reslength > 0) {
						alert(result);
						$("#purchaseAdvForm").submit();
					} else {
						$("#purchaseAdvForm").submit();
					}
				}
			});

}
/* End PASupport 12.9 MVP Changes */
/* Start PASupport 13.2 S2 Changes */

function joinNowButton(membershipType){
	var targetURL = '/sams/common/purchasemembership.jsp';
    $.ajax({
	    type: 'GET',
	    url : targetURL,
	    cache:false,                                                        
	    data: "membershipType="+membershipType,                                                                                    
	    success:function(responseElement){
		    if(responseElement == ''){                            
		        window.location.href="/sams/checkout/membership/purchaseMembership.jsp?tab=information";
		    }else{
		         $("#aboutSamsError").replaceWith(responseElement);        
		    }                                                                                                                                                              
		},
		error: function(responseElement){				
			$("#aboutSamsError").replaceWith(responseElement);	
	    }
    });
}
function submitCheckoutForm() {
	if(document.getElementById('aam') && document.getElementById('aam').checked) {
		document.checkoutAdvantageItem.submit();
     } else {
	    document.checkoutNowForm.submit();
     }
}
$(document).ready(function() { 
	$('.checkOutBtn').click(function(){
		var displayOverlayType = this.id;
		if (displayOverlayType != null && displayOverlayType != "" && displayOverlayType != "none") {
			/*Ajax call starts*/ 
			$.ajax({
				type: 'GET',
				url : '/sams/account/membership/membershipRenewalOverlay.jsp',
				cache:false,				
				data: 'displayOverlayType='+displayOverlayType,						
				success:function(responseOBJ){				
						$('#overlayHolder').html(responseOBJ);
						$('#overlayHolder').css('display','block')
						$('#overlayHolder').fadeIn('fast');
					
				},
				error: function(responseOBJ, status, xhr){							
						var msg = "Sorry but there was an error: ";
						$('#overlayHolder').html(msg + xhr.status + " " + xhr.statusText);
						$('#overlayHolder').css('display','block');
				}						
			});
			/*Ajax call ends*/
			return false;
		} else {
			return true;
		}
	});
	$('.overlayHead img').live("click",function(){
	        $('#overlayHolder').fadeOut('fast',function(){
	        submitCheckoutForm();
	    });
	});
	$('.toggleDet').live("click",function(){
		$('.toggleDet a').toggle();
		$('.membDetails').toggle();		
	});
	$('#renewOverlayCtnBtn').live("click",function(){
		var form  = document.getElementById("renewMembershipOverlay");
		var itemTypeEle = form.itemType;
		var itemType = '';
		for (i=0; i < itemTypeEle.length; i++) {
            if (itemTypeEle[i].checked == true) {
            	itemType = itemTypeEle[i].value;
            	break;
           	}
        }
		if (itemType == "renew" || itemType == "upgrade") {
			form.submit();
		} else {
			if ($('#dontShow').attr('checked')) {
				$('#displayRenewalOverlay').val("false");
			}
			submitCheckoutForm();
		}
	});
	
});	
/* End PASupport 13.2 S2 Changes */
/* Adding the CSS Selector style on the page load */
$(document).ready(function(){					
	$('ul.topSellerItems li:first-child').addClass( 'FirstItem' );
})