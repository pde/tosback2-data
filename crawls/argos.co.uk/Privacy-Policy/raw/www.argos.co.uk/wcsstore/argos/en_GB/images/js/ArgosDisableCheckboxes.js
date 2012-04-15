var ArgosDisableCheckboxes = function(checkboxes, maxSize){
	if(checkboxes.length < 1) return;
	toggleCheckboxes();
	$(checkboxes).bind("click", toggleCheckboxes);
	
	/*
	 * toggle checkboxes state by determining if maxSize has been reached
	 * @param void
	 * @return void 
	 */
	function toggleCheckboxes() {
		var count = getCheckedCount();
		if (count>=maxSize) {
			disableRemainingCheckboxes();
		}
		else {
			enableCheckboxes();
		}
	}
	
	/*
	 * get the number of checked items
	 * @param void
	 * @return checked items as number
	 */
	function getCheckedCount() {
		var count = 0;
		for (var i=0;i<checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				count++
			}
		}
		return count;
	}
	
	/*
	 * disable remaining checkboxes
	 * @param void
	 * @return void
	 */
	function disableRemainingCheckboxes() {
		for (var i=0;i<checkboxes.length; i++) {
			if (!checkboxes[i].checked) {
				checkboxes[i].disabled = true;
			}
		}			
	}
	
	/*
	 * enable checkboxes
	 * @param void
	 * @return void
	 */
	function enableCheckboxes() {
		for (var i=0;i<checkboxes.length; i++) {
			checkboxes[i].disabled = false;
		}
	}
}