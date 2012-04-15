
// ------------------------------------------------------------------------------------
// This file contains all the request type objects for the SiteLife JSON Direct API.
// Create instances of these objects, place them in a RequestBatch, and send them off.
// ------------------------------------------------------------------------------------

(function() { // wrapped in a function to keep the Class variable out of the global scope
var Class = function() {
  return function() {
    this.initialize.apply(this, arguments);
  }
};
// Identify a user
UserKey = Class();
UserKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.UserKey = data;
   }
};
// Identify a comment
CommentKey = Class();
CommentKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.CommentKey = data;
   }
};
// Identify an article
ArticleKey = Class();
ArticleKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.ArticleKey = data;
   }
};

// Identify a persona message
PersonaMessageKey = Class();
PersonaMessageKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.PersonaMessageKey = data;
   }
};

// Identify a review
ReviewKey = Class();
ReviewKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.ReviewKey = data;
   }
};
// Identify a gallery
GalleryKey = Class();
GalleryKey.prototype = {
    initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.GalleryKey = data;
    }
};
// Identify a photo
PhotoKey = Class();
PhotoKey.prototype = {
    initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.PhotoKey = data;
    }
};
// Identify a video
VideoKey = Class();
VideoKey.prototype = {
    initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.VideoKey = data;
    }
};

// Wrapper to request a comment page
CommentPage = Class();
CommentPage.prototype = {
   initialize: function(articleKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.ArticleKey = articleKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.CommentPage = data;
   }
};

// Wrapper to request a persona message page
PersonaMessagePage = Class();
PersonaMessagePage.prototype = {
   initialize: function(userKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.PersonaMessagePage = data;
   }
};

// Wrapper to request a review page
ReviewPage = Class();
ReviewPage.prototype = {
   initialize: function(articleKey, numberPerPage, onPage,sort) {
        var data = new Object();
        data.ArticleKey = articleKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.ReviewPage = data;
   }
};
// Wrapper of types a gallery can contain
MediaType = Class();
MediaType.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.MediaType = data;
    }
};
// Wrapper to request a page of public galleries
PublicGalleryPage = Class();
PublicGalleryPage.prototype = {
    initialize: function(numberPerPage, onPage, mediaType) {
        var data = new Object();
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.MediaType = mediaType;
        this.PublicGalleryPage = data;
    }
};
// Wrapper to request a page of user galleries
UserGalleryPage = Class();
UserGalleryPage.prototype = {
    initialize: function(userKey, numberPerPage, onPage, mediaType) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.MediaType = mediaType;
        this.UserGalleryPage = data;
    }
};
// Wrapper to request a page of photos
PhotoPage = Class();
PhotoPage.prototype = {
    initialize: function(galleryKey, numberPerPage, onPage) {
        var data = new Object();
        data.GalleryKey = galleryKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.PhotoPage = data;
    }
};
// Wrapper to request a page of videos
VideoPage = Class();
VideoPage.prototype = {
    initialize: function(galleryKey, numberPerPage, onPage) {
        var data = new Object();
        data.GalleryKey = galleryKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.VideoPage = data;
    }
};
// Wrapper to request a comment action
CommentAction = Class();
CommentAction.prototype = {
   initialize: function(commentOnKey, onPageUrl, onPageTitle, commentBody) {
        var data = new Object();
        data.CommentOnKey = commentOnKey;
        data.OnPageUrl = onPageUrl;
        data.OnPageTitle = onPageTitle;
        data.CommentBody = commentBody;
        this.CommentAction = data;
   }
};
// Wrapper to request a review action
ReviewAction = Class();
ReviewAction.prototype = {
   initialize: function(reviewOnThisKey, onPageUrl, onPageTitle, 
                        reviewTitle, reviewRating, reviewBody, reviewPros, reviewCons) {
        var data = new Object();
        data.ReviewOnKey = reviewOnThisKey;
        data.OnPageUrl = onPageUrl;
        data.OnPageTitle = onPageTitle;
        data.ReviewTitle = reviewTitle;
        data.ReviewRating = reviewRating;
        data.ReviewBody = reviewBody;
        data.ReviewPros = reviewPros;
        data.ReviewCons = reviewCons;
        this.ReviewAction = data;
   }
};
// Wrapper to request a recommend action
RecommendAction = Class();
RecommendAction.prototype = {
   initialize: function(recommendThisKey) {
        var data = new Object();
        data.RecommendThisKey = recommendThisKey;
        this.RecommendAction = data;
   }
};
// Wrapper to request a rate action
RateAction = Class();
RateAction.prototype = {
   initialize: function(rateThisKey, rating) {
        var data = new Object();
        data.RateThisKey = rateThisKey;
        data.Rating = rating;
        this.RateAction = data;
   }
};

// Permanently delete a gallery, video or photo
DeleteContentAction = Class();
DeleteContentAction.prototype = {
   initialize: function(deleteThisContent) {
        var data = new Object();
        data.DeleteThisContent = deleteThisContent;
        this.DeleteContentAction = data;
   }
};

// Email from the SiteLife system
EmailContentAction = Class();
EmailContentAction.prototype = {
   initialize: function(toAddress, subject, body) {
        var data = new Object();
        data.ToAddress = toAddress;
        data.Subject = subject;
        data.Body = body;
        this.EmailContentAction = data;
   }
};

// Wrapper to request a report abuse action
ReportAbuseAction = Class();
ReportAbuseAction.prototype = {
   initialize: function(reportThisKey, abuseReason, abuseDescription) {
        var data = new Object();
        data.ReportThisKey = reportThisKey;
        data.AbuseReason = abuseReason;
        data.AbuseDescription = abuseDescription;
        this.ReportAbuseAction = data;
   }
};
// Category used for discovery
Category = Class();
Category.prototype = {
   initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.Category = data;
   }
};
// Section used for discovery
Section = Class();
Section.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.Section = data;
    }
};
// Update or create an article
UpdateArticleAction = Class();
UpdateArticleAction.prototype = {
   initialize: function(updateArticle, onPageUrl, onPageTitle, section,categories) {
        var data = new Object();
        data.UpdateArticle = updateArticle;
        data.OnPageUrl = onPageUrl;
        data.OnPageTitle = onPageTitle;
        data.Section = section;
        data.Categories = categories;
        this.UpdateArticleAction = data;
   }
};
// Update or create a gallery
UpdateGalleryAction = Class();
UpdateGalleryAction.prototype = {
    initialize: function(updateGallery, galleryType, mediaType, title, description, tags, section, galleryPromo) {
        var data = new Object();
        data.UpdateGallery = updateGallery;
        data.GalleryType = galleryType;
        data.MediaType = mediaType;
        data.Title = title;
        data.Description = description;
        data.Tags = tags;
        data.Section = section;
        data.GalleryPromo = galleryPromo;
        this.UpdateGalleryAction = data;
    }
};
// Update or create a photo
UpdatePhotoAction = Class();
UpdatePhotoAction.prototype = {
    initialize: function(updatePhoto, title, description, tags, section) {
        var data = new Object();
        data.UpdatePhoto = updatePhoto;
        data.Title = title;
        data.Description = description;
        data.Tags = tags;
        data.Section = section;
        this.UpdatePhotoAction = data;
    }
};
// Update or create a video
UpdateVideoAction = Class();
UpdateVideoAction.prototype = {
    initialize: function(updateVideo, title, description, tags, section) {
        var data = new Object();
        data.UpdateVideo = updateVideo;
        data.Title = title;
        data.Description = description;
        data.Tags = tags;
        data.Section = section;
        this.UpdateVideoAction = data;
    }
};
// 
GalleryType = Class();
GalleryType.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.GalleryType = data;
    }
};
// GalleryPromo used for setting promotional text for public galleries
GalleryPromo = Class();
GalleryPromo.prototype = {
    initialize: function(title, body, photoKey) {
        var data = new Object();
        data.Title = title;
        data.Body = body;
        data.PhotoKey = photoKey;
        this.GalleryPromo = data;
    }
};
// UserTier used for discovery
UserTier = Class();
UserTier.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.UserTier = data;
    }
};
// Activity used for discovery
Activity = Class();
Activity.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.Activity = data;
    }
};
// Discovery on articles
DiscoverArticlesAction = Class();
DiscoverArticlesAction.prototype = {
   initialize: function(searchSections,searchCategories,limitToContributors,activity,age,maximumNumberOfDiscoveries) {
        var data = new Object();
        data.SearchSections = searchSections;
        data.SearchCategories = searchCategories;
        data.LimitToContributors = limitToContributors;
        data.Activity = activity;
        data.Age = age;
        data.MaximumNumberOfDiscoveries = maximumNumberOfDiscoveries;

        this.DiscoverArticlesAction = data;
   }
};

// Action used to add a friend
AddFriendAction = Class();
AddFriendAction.prototype = {
    initialize: function(friendUserKey) {
        var data = new Object();
        data.FriendUserKey = friendUserKey;
        this.AddFriendAction = data;
    }
};

// Action used to add a message
AddPersonaMessageAction = Class();
AddPersonaMessageAction.prototype = {
    initialize: function(toUserKey, body) {
        var data = new Object();
        data.ToUserKey = toUserKey;
        data.Body = body;
        this.AddPersonaMessageAction = data;
    }
};

// Action used to remove a message
RemovePersonaMessageAction = Class();
RemovePersonaMessageAction.prototype = {
    initialize: function(personaMessageKey) {
        var data = new Object();
        data.PersonaMessageKey = personaMessageKey;
        this.RemovePersonaMessageAction = data;
    }
};

// Action used to approve a friend
ApproveFriendAction = Class();
ApproveFriendAction.prototype = {
    initialize: function(friendUserKey, isApproved) {
        var data = new Object();
        data.FriendUserKey = friendUserKey;
        data.IsApproved = isApproved;
        this.ApproveFriendAction = data;
    }
};

// Action used to remove a friend
RemoveFriendAction = Class();
RemoveFriendAction.prototype = {
    initialize: function(friendUserKey) {
        var data = new Object();
        data.FriendUserKey = friendUserKey;
        this.RemoveFriendAction = data;
    }
};

// Wrapper to request a friend page
FriendPage = Class();
FriendPage.prototype = {
   initialize: function(userKey, numberPerPage, onPage, isPendingList) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.IsPendingList = isPendingList;
        this.FriendPage = data;
   }
};

// Wrapper to request if a given user key is a friend of the user specified by the second parameter
// if the userKey parameter is not specified, the currently logged-in user is used
IsFriend = Class();
IsFriend.prototype = {
   initialize: function(friendUserKey, userKey) {
        var data = new Object();
        data.FriendUserKey = friendUserKey;
        data.UserKey = userKey;
        this.IsFriend = data;
   }
};
												
// Discovery on content
DiscoverContentAction = Class();
DiscoverContentAction.prototype = {
   initialize: function(searchSections,searchCategories,limitToContributors,activity,contentType,age,maximumNumberOfDiscoveries, filterBySiteOfOrigin) {
        var data = new Object();
        data.SearchSections = searchSections;
        data.SearchCategories = searchCategories;
        data.LimitToContributors = limitToContributors;
        data.Activity = activity;
        data.ContentType = contentType;
        data.Age = age;
        data.MaximumNumberOfDiscoveries = maximumNumberOfDiscoveries;
        data.FilterBySiteOfOrigin = filterBySiteOfOrigin;
        this.DiscoverContentAction = data;
   }
};

// Content type for discovery
ContentType = Class();
ContentType.prototype = {
    initialize: function(name) {
        var data = new Object();
        data.Name = name;
        this.ContentType = data;
    }
};
												
UpdateUserProfileAction = Class();
UpdateUserProfileAction.prototype = {
   initialize: function(   userKey, 
                            aboutMe, 
                            location,
                            signature,
                            dateOfBirth, 
                            sex, 
                            personaPrivacyMode, 
                            commentsTabVisible, 
                            photosTabVisible, 
                            messagesOpenToEveryone, 
                            isEmailNotificationsEnabled, 
                            selectedStyleId, 
                            customAnswers, 
                            extendedProfile) {
                            
        var data = new Object();
        data.UserKey = userKey;
        data.AboutMe = aboutMe;
        data.Location = location;
        data.Signature = signature;
        data.DateOfBirth = dateOfBirth;
        data.Sex = sex;
		data.PersonaPrivacyMode = personaPrivacyMode;
		data.CommentsTabVisible = commentsTabVisible;
		data.PhotosTabVisible = photosTabVisible;
		data.MessagesOpenToEveryone = messagesOpenToEveryone;
		data.IsEmailNotificationsEnabled = isEmailNotificationsEnabled;
		data.SelectedStyleId = selectedStyleId;
		data.CustomAnswers = customAnswers;
		data.ExtendedProfile = extendedProfile;        
        this.UpdateUserProfileAction = data;
   }
};

SearchAction = Class();
SearchAction.prototype = {
   initialize: function(searchType, searchString, numberPerPage, onPage ) {
        var data = new Object();
        data.SearchType = searchType;
        data.SearchString = searchString;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.SearchAction = data;
   }
};

// Wrapper to request a watch item page
WatchItemPage = Class();
WatchItemPage.prototype = {
   initialize: function(userKey, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.WatchItemPage = data;
   }
};

// Wrapper to add a watch item
AddWatchItemAction = Class();
AddWatchItemAction.prototype = {
   initialize: function(userKey, watchTargetKey, title, url ) {
        var data = new Object();
        data.UserKey = userKey;
        data.WatchTargetKey = watchTargetKey;
        data.WatchItemTitle = title;
        data.WatchItemUrl = url;
        this.AddWatchItemAction = data;
   }
};

// Wrapper to delete a watch item
DeleteWatchItemAction = Class();
DeleteWatchItemAction.prototype = {
   initialize: function(userKey, watchTargetKey) {
        var data = new Object();
        data.UserKey = userKey;
        data.WatchTargetKey = watchTargetKey;
        this.DeleteWatchItemAction = data;
   }
};

// Identify a blog with this blog key
BlogKey = Class();
BlogKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.BlogKey = data;
   }
};

// Identify a blog post with this blog post key
BlogPostKey = Class();
BlogPostKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.BlogPostKey = data;
   }
};

// Wrapper to request a blog post page
BlogPostPage = Class();
BlogPostPage.prototype = {
   initialize: function(blogKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.BlogKey = blogKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.BlogPostPage = data;
   }
};


// Wrapper to request a blog post archive count
BlogPostArchiveCount = Class();
BlogPostArchiveCount.prototype = {
   initialize: function(blogKey) {
        var data = new Object();
        data.BlogKey = blogKey;
        this.BlogPostArchiveCount = data;
   }
};


// Wrapper to request a blog post archive content page
BlogPostArchiveContentPage = Class();
BlogPostArchiveContentPage .prototype = {
   initialize: function(blogKey, month, numberPerPage, onPage, sort) {
        var data = new Object();
        data.BlogKey = blogKey;
        data.Month = month;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.BlogPostArchiveContentPage = data;
   }
};


// Wrapper to request a user comment page
UserCommentPage = Class();
UserCommentPage.prototype = {
   initialize: function(userKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.UserCommentPage = data;
   }
};


// Wrapper to request blog tag 
RecentBlogTag = Class();
RecentBlogTag.prototype = {
   initialize: function(blogKey) {
        var data = new Object();
        data.BlogKey = blogKey;
        this.RecentBlogTag = data;
   }
};


// Wrapper to request recent user photo page
RecentUserPhotoPage = Class();
RecentUserPhotoPage.prototype = {
   initialize: function(userKey, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.RecentUserPhotoPage = data;
   }
};

// Wrapper to request recent user video page
RecentUserVideoPage = Class();
RecentUserVideoPage .prototype = {
   initialize: function(userKey, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.RecentUserVideoPage  = data;
   }
};


// Wrapper to request recent public gallery page
RecentPublicGalleryPage = Class();
RecentPublicGalleryPage .prototype = {
   initialize: function(userKey, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.RecentPublicGalleryPage  = data;
   }
};
    
    
// Wrapper to request recent user activity page
RecentUserActivity = Class();
RecentUserActivity .prototype = {
   initialize: function(userKey) {
        var data = new Object();
        data.UserKey = userKey;
       this.RecentUserActivity  = data;
   }
};


// Wrapper to request page of user media submission counts
UserMediaSubmissionsCountPage = Class();
UserMediaSubmissionsCountPage .prototype = {
    initialize: function(userKey, mediaType, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.MediaType = mediaType;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.UserMediaSubmissionsCountPage = data;
    }
};


// Wrapper to request recent forum discussion page
RecentForumDiscussionPage = Class();
RecentForumDiscussionPage .prototype = {
   initialize: function(userKey, numberPerPage, onPage) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        this.RecentForumDiscussionPage = data;
   }
};

    
// Wrapper to request user group forum page
UserGroupForumPage = Class();
UserGroupForumPage .prototype = {
   initialize: function(userKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.UserKey = userKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.UserGroupForumPage = data;
   }
};

// The blogRollEntry used in UpdateBlogAction
BlogRollEntry = Class();
BlogRollEntry.prototype = {
   initialize: function(name, url) {
        var data = new Object();
        data.Name = name;
        data.Url = url;
        this.BlogRollEntry = data;
   }
};

// Update or create a blog
UpdateBlogAction = Class();
UpdateBlogAction.prototype = {
   initialize: function(updateBlog, title, tagline, blogRollEntries) {
        var data = new Object();
        data.BlogKey = updateBlog;
        data.Title = title;
        data.Tagline = tagline;
        data.BlogRollEntries = blogRollEntries;
        this.UpdateBlogAction = data;
   }
};

// Update or create a blog post, key can be either a post key (update case)
// or a blog key (create case)
UpdateBlogPostAction = Class();
UpdateBlogPostAction.prototype = {
   initialize: function(key, title, body, tags, publishDate, published) {
        var data = new Object();
        data.TargetThis = key;
        data.Title = title;
        data.Body = body;
        data.Tags = tags;
        data.Date = publishDate;
        data.Published = published;
        this.UpdateBlogPostAction = data;
   }
};

// Identify a forum discussion with this DiscussionKey 
DiscussionKey = Class();
DiscussionKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.DiscussionKey = data;
   }
};

// Identify a custom item with this CustomItemKey
CustomItemKey = Class();
CustomItemKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.CustomItemKey = data;
   }
};

// Identify a custom collection with this CustomCollectionKey
CustomCollectionKey = Class();
CustomCollectionKey.prototype = {
   initialize: function(key) {
        var data = new Object();
        data.Key = key;
        this.CustomCollectionKey = data;
   }
};

// Update or create a custom item in storage
UpdateCustomItemAction = Class();
UpdateCustomItemAction.prototype = {
   initialize: function(customItemKey, name, mimeType, displayText, content, includeInRecentActivity) {
        var data = new Object();
        data.CustomItemKey = customItemKey;
        data.Name = name;
        data.MimeType = mimeType;
        data.DisplayText = displayText;
        data.Content = content;
        if ((typeof(includeInRecentActivity) == 'undefined') || (includeInRecentActivity == null)) {
            // Default to true for backwards compatibility
            includeInRecentActivity = true;
        }
        data.IncludeInRecentActivity = includeInRecentActivity
        this.UpdateCustomItemAction = data;
   }
};

// Add a new custom collection to storage
AddCustomCollectionAction = Class();
AddCustomCollectionAction.prototype = {
   initialize: function(customCollectionKey, customCollectionName) {
        var data = new Object();
        data.CustomCollectionKey = customCollectionKey;
        data.CustomCollectionName = customCollectionName;
        this.AddCustomCollectionAction = data;
   }
};

// Insert an item into a custom collection
InsertIntoCollectionAction = Class();
InsertIntoCollectionAction.prototype = {
   initialize: function(customCollectionKey, insertThisKey, position) {
        var data = new Object();
        data.CustomCollectionKey = customCollectionKey;
        data.InsertThisKey = insertThisKey;
        data.Position = position;
        this.InsertIntoCollectionAction = data;
   }
};

// Remove an item from a custom collection (position can be null to specify to remove all occurrences of item)
RemoveFromCollectionAction = Class();
RemoveFromCollectionAction.prototype = {
   initialize: function(customCollectionKey, removeThisKey, position) {
        var data = new Object();
        data.CustomCollectionKey = customCollectionKey;
        data.RemoveThisKey = removeThisKey;
        data.Position = position;
        this.RemoveFromCollectionAction = data;
   }
};

// Get a page of items out of a custom collection
CustomCollectionPage = Class();
CustomCollectionPage.prototype = {
   initialize: function(customCollectionKey, numberPerPage, onPage, sort) {
        var data = new Object();
        data.CustomCollectionKey = customCollectionKey;
        data.NumberPerPage = numberPerPage;
        data.OnPage = onPage;
        data.Sort = sort;
        this.CustomCollectionPage = data;
   }
};


// Get a page of items out of a custom collection
EditorMessageRequest = Class();
EditorMessageRequest.prototype = {
   initialize: function() {
      this.EditorMessageRequest = new Object();
   }
};

// Retrieve a user's tags for the given content type
UserTags = Class();
UserTags.prototype = {
   initialize: function(userKey, contentType) {
      var data = new Object();
      data.UserKey = userKey;
      data.ContentType = contentType;
      this.UserTags = data;
   }
};

})();