/****************************** START ARRAY EXTENSIONS **************************************/
Array.prototype.contains = Array.contains || function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}
/****************************** END ARRAY EXTENSIONS **************************************/