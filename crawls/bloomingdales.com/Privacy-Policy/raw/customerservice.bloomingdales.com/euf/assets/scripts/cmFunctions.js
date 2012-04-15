var CONVERSION_INITIATE = 1;
var CONVERSION_COMPLETE = 2;
		
function cmProduct(productId, name, quantity, price)
{
	this.productId=productId;
	this.name=name;
	this.quantity=quantity;
	this.price=price;
}

BLOOMIES.namespace("coremetrics");

		BLOOMIES.coremetrics.getMMCVendor = function () {
            return getQueryValue('PartnerID');
        }
		BLOOMIES.coremetrics.getMMCPlacement = function () {
            return "N/A";
        }
		BLOOMIES.coremetrics.getMMCCategory = function () {
            return "N/A";
        }
		BLOOMIES.coremetrics.getMMCItem = function () {
            return getQueryValue('BannerID')||this.getLinkshareID();
        }
		BLOOMIES.coremetrics.getLinkshareID = function () {
        	return getQueryValue('LinkshareID'); //Linkshare creates this ID - an encrypted string
        }
		BLOOMIES.coremetrics.getCustomerID = function () {
            return getCookie("bloomingdales_online_uid") || "0000000000";
        }
		BLOOMIES.coremetrics.getMachineID = function () {
			return getCookie("bloomingdales_online");
        }
		BLOOMIES.coremetrics.countryName = function () {
			return getCookie("shippingCountry");
        }
		
        BLOOMIES.coremetrics.cmCreatePageviewTag = function(cmPageID, cmCategoryID, searchTerm, searchResults) {
			var customerID = this.getCustomerID;
			
        	cmCreatePageviewTag(	
        		cmPageID,
				cmCategoryID,
				searchTerm,
				searchResults,
				this.getMMCVendor(),
				this.getMMCCategory(),
				this.getMMCPlacement(),
				this.getMMCItem(),
				this.getMachineID(),
				this.getLinkshareID(),
				BLOOMIES.coremetrics.pageViewExploreAttributes.toString()
			);
        };
		
		// Pass the "Video Status:" "0"=Start; "1"=Pause; "2"=Play; "3"=Completion, videoWatchedTime and videoLength in seconds
        BLOOMIES.coremetrics.cmVideo = function(videoId, videoDescription, videoStatus, videoWatchedTime, videoLength){
			cmCreatePageElementTag(videoId, videoDescription, '-_--_--_--_--_--_--_--_--_--_--_--_-' + videoStatus + '-_-' + videoWatchedTime + '-_-' + videoLength);
		}
		
		/* Creates a Page Element Tag */
        BLOOMIES.coremetrics.cmCreatePageElementTag = function(cmCatId, cmCategory, attributes){
			cmCreatePageElementTag(cmCatId, cmCategory, attributes);
		}

		BLOOMIES.coremetrics.addToBag = function(products, cmPageID, cmCategoryID, exploreAttributes){
			this.cmCreatePageviewTag(cmPageID, cmCategoryID,"","");
			for (var product in products) {
				cmCreateShopAction5Tag(
					products[product].productId, 
					products[product].name.replace(/[,']/g,""), 
					products[product].quantity.toString(), 
					products[product].price.toString(), 
					cmCategoryID,
					exploreAttributes);
			}
			cmDisplayShop5s();
		}
		
		BLOOMIES.coremetrics.cmCreateConversionEventTag = function(eventID, actionType, cmCategoryID, points){
			cmCreateConversionEventTag(
				eventID, 
				actionType, 
				cmCategoryID, 
				points,
				""
				)
		}
		
		BLOOMIES.coremetrics.cmCreateConversionEventTag = function(eventID, actionType, cmCategoryID, points, attributes){
			cmCreateConversionEventTag(
				eventID, 
				actionType, 
				cmCategoryID, 
				points,
				attributes
				)
		}
		
		BLOOMIES.coremetrics.createRegistrationTag = function(emailAddress, city, state, zip, gender, isSubscribed) {
			cmCreateRegistrationTag(	
        		this.getCustomerID,
        		emailAddress,
        		city,
        		state,
        		zip,
        		gender,
        		"", //newsletter
        		isSubscribed,
        		"", //customerAge
        		"" //customerIncome
			);
        };
        
        /**
		 * @param {Object} arg - An Object of the form {1: "value1", 13: "value13"}, where indexes start from 1.
		 */
        BLOOMIES.coremetrics.exploreAttributes = function(arg) {
        	var _list = [];
       	   
			/**
			 * @param {Object} obj - An Object of the form {1: "value1", 13: "value13"}, where indexes start from 1.
			 */
			this.add = function(obj) {
			  		
				for (var ele in obj){
					_list[ele-1] = obj[ele];
				}
				   
				return this;
			};
			   
			this.toString = function(){
				return(_list.join('-_-'));
			};
       	   
			if(arg){
				this.add(arg);
			} 
        };
