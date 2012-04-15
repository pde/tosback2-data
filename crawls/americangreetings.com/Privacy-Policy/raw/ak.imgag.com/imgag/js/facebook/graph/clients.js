/*
    $Rev: 151962 $
    XXX: REQUIREMENTS
        -- OOP.js
        -- facebook/graph/base.js
        -- facebook/graph/wallposters.js
        -- facebook/graph/birthdays.js
        -- facebook/graph/headers.js
*/


var AGI_FB = {

    ALLSITES: {
        BaseApp: function(pageAttrs, FBAttrs) {
            /* Create an instance of a ``base`` application.
               No extra fanciness, but still a lot of basic capabilities.
            */
            var nullFriendRenderer = undefined;
            var baseInterface = new OOP.Class(CommonInterface);

            return new baseInterface(nullFriendRenderer, pageAttrs, FBAttrs);
        },

        SelfPoster: function(pageAttrs, FBAttrs) {
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(SelfPoster);

            return new poster(pageAttrs, FBAttrs);
        }
    },

    JL: {
        EcardPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(JLPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        NotecardPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(JLNotecardPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        ChristmasLetterPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(JLChristmasLetterPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        BirthdayReminders: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var baseBirthdays = baseInterface.extend(BaseBirthdayReminders);
            var birthdays = baseBirthdays.extend(JLBirthdayReminders);

            return new birthdays(friendRenderer, pageAttrs, FBAttrs);
        },

        Header: function(pageAttrs, FBAttrs) {
            var friendRenderer = '';
            var baseInterface = new OOP.Class(CommonInterface);
            var header = baseInterface.extend(BaseHeader);

            return new header(friendRenderer, pageAttrs, FBAttrs);
        }


    },

    AG: {
        BackToSchoolContestPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(BackToSchoolContestPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        BirthdayReminders: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var birthdays = baseInterface.extend(BaseBirthdayReminders);

            return new birthdays(friendRenderer, pageAttrs, FBAttrs);
        },

        EcardPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var poster = baseInterface.extend(BasePoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        CNPPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(CNPPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        PicsWishesPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(PicsWishesPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        Headliner: function(type_, pageAttrs, FBAttrs) {

            // birthday headliner
            if (type_.toLowerCase() == 'birthday') {
                var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
                var baseInterface = new OOP.Class(CommonInterface);
                var baseBirthdays = baseInterface.extend(BaseBirthdayReminders);
                var birthdayProduct = baseBirthdays.extend(
                        BirthdayHeadlinerProduct);

                return new birthdayProduct(friendRenderer, pageAttrs, FBAttrs);
            }
        },

        Header: function(pageAttrs, FBAttrs) {
            var friendRenderer = '';
            var baseInterface = new OOP.Class(CommonInterface);
            var baseHeader = baseInterface.extend(BaseHeader);
            var header = baseHeader.extend(AGHeader);

            return new header(friendRenderer, pageAttrs, FBAttrs);
        }


    },

    BMA: {
        EcardPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(BMAPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        BirthdayReminders: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var baseBirthdays = baseInterface.extend(BaseBirthdayReminders);
            var birthdays = baseBirthdays.extend(BMABirthdayReminders);

            return new birthdays(friendRenderer, pageAttrs, FBAttrs);
        },

        Header: function(pageAttrs, FBAttrs) {
            var friendRenderer = '';
            var baseInterface = new OOP.Class(CommonInterface);
            var baseHeader = baseInterface.extend(BaseHeader);
            var header = baseHeader.extend(BMAHeader);

            return new header(friendRenderer, pageAttrs, FBAttrs);
        },

        CNPPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(CNPPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        },

        PetContestPoster: function(pageAttrs, FBAttrs) {
            var friendRenderer = new (new OOP.Class(BaseFriendRenderer));
            var baseInterface = new OOP.Class(CommonInterface);
            var basePoster = baseInterface.extend(BasePoster);
            var poster = basePoster.extend(PetContestPoster);

            return new poster(friendRenderer, pageAttrs, FBAttrs);
        }

    }
};
