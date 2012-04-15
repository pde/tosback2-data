
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (ShoppingListAjaxService == null) var ShoppingListAjaxService = {};
ShoppingListAjaxService._path = '/dwr';
ShoppingListAjaxService.addItem = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'addItem', p0, false, false, callback);
}
ShoppingListAjaxService.updateItems = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'updateItems', p0, false, false, callback);
}
ShoppingListAjaxService.clearActiveList = function(callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'clearActiveList', false, false, callback);
}
ShoppingListAjaxService.saveItemsToActiveList = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'saveItemsToActiveList', p0, false, false, callback);
}
ShoppingListAjaxService.saveItemToActiveList = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'saveItemToActiveList', p0, false, false, callback);
}
ShoppingListAjaxService.deleteItemFromActiveList = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'deleteItemFromActiveList', p0, false, false, callback);
}
ShoppingListAjaxService.validateCouponLimit = function(p0, callback) {
  dwr.engine._execute(ShoppingListAjaxService._path, 'ShoppingListAjaxService', 'validateCouponLimit', p0, false, false, callback);
}
