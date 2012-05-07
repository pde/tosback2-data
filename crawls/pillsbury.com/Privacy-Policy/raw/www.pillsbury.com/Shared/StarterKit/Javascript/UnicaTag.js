//***********************************Unica Tagging Javascript code starts*****************************************************************
var NTPT_PGEXTRA = "";
function ApplyUnicaEventTag(EventTagText) {
    if (UnicaTagEnabled == true) {
        ntptEventTag(EventTagText);
    }
}
function ApplyUnicaAddPairTag(Key, Value) {
    if (UnicaTagEnabled == true) {
        ntptAddPair(Key, Value);
    }
}
function ApplyCookingReferalTag() {
    var currUrl = document.location.href;
    ApplyUnicaEventTag('ev=offsiteclick&URL=' + currUrl);
}
function SetRecipePageVariableWithRecipeInfo(recipeID, recipeTitle) {
    if (UnicaTagEnabled == true) {
        if (NTPT_PGEXTRA.lastIndexOf('&') != NTPT_PGEXTRA.length - 1 && NTPT_PGEXTRA.length > 0) NTPT_PGEXTRA += "&";
        NTPT_PGEXTRA += 'RecipeId=' + recipeID + '&RecipeTitle=' + recipeTitle;
    }
}
function SetRecipePageVariableWithUserInfo(userID, userStatus) {
    if (UnicaTagEnabled == true) {
        if (NTPT_PGEXTRA.lastIndexOf('&') != NTPT_PGEXTRA.length - 1 && NTPT_PGEXTRA.length > 0) NTPT_PGEXTRA += "&";
        NTPT_PGEXTRA += 'UserId=' + userID + '&UserStatus=' + userStatus;
    }
}
function SetNTPTPageVariable(key, value) {
    if (UnicaTagEnabled == true) {
        if (NTPT_PGEXTRA.lastIndexOf('&') != NTPT_PGEXTRA.length - 1 && NTPT_PGEXTRA.length > 0) NTPT_PGEXTRA += "&";
        NTPT_PGEXTRA += key + '=' + value;
    }
}



//***********************************Unica Tagging Javascript code starts*****************************************************************
