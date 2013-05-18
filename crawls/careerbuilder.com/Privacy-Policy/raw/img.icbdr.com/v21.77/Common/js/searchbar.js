cbj(document).ready(function() {
    if (cbj('.savedSearches') != undefined) {
        cbj('.savedSearches').change(function() {
            if (this.value != '')
                window.location = this.value;
        });
    }

    if (cbj('.savedJobs') != undefined) {
        cbj('.savedJobs').change(function () {
            if (this.value != '')
                window.location = this.value;
        });
    }
});