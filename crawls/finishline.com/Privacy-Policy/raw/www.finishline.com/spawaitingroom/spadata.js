/**
 *  - The following settings are shared by both www. and m. sites.
 *  - This file should exists at: www.finishline.com/spawaitingroom/spadata.js
 *  - Both sites also share: www.finishline.com/media/spa/behavior.js
 *  - The default messaging can be found in behavior.js.
 *  - When this file has been edited, it should be re-uploaded to Akamai and the
 *      file should be purged via the Control Utility.
 *
 *  NOTE: Some characters in strings will need to be escaped with a backslash so as
 *      not to break the JS. When using apostrophes ('), specifying the HTML entity
 *      is preferable (e.g. &rsquo;). Also be sure to include a comma after any
 *      string in the bodyCopy array. Individual array items can be commented out.
 */
var spaData = {
    pageTitle:  'Finishline.com',
    bodyCopy:   [
        '<ol>'
            + '<li><span>Verify with your financial institution that you have the necessary funds available on your credit card to cop your Js.</span></li>'
            + '<li><span>Be sure that the personal info submitted on your order matches the personal info your financial institution has on file.</span></li>'
            + '<li><span>Make sure your billing address and shipping address are the SAME or your order will be denied.</span></li>'
            + '<li><span>To avoid placing multiple holds on your bank account, only submit your order once. If you submit more than once, your bank may take up to 72 hours to release those holds.</span></li>'
            + '<li><span>If you&rsquo;ve had troubles in the past, consider purchasing a gift card prior to the release to use as your payment type.</span></li>'
        + '</ol>',
        '<font color="red"><strong>We are not able to take phone orders at this time.</strong></font>',
        'Sit back, relax and count your lucky stars as the browser will automatically send you to your page as soon as there is an open spot.',
        'Happy Shopping!',
    ]
};


