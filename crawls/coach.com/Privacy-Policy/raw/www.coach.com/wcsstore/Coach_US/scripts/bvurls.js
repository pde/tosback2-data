// bvurls.js

// This function depends on the current environment and will
// provide the BazaarVoice staging URL for testing environments
// and production URL for the live production site
function getBazaarVoiceURL() {
	return location.protocol + "//coach-ssl.ugc.bazaarvoice.com";
}