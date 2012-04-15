function InstructablesScript() {

  // Tags and Dependencies
  this.tags = [
      { name : "prototype",
	    isLoaded : function () {return typeof Prototype != "undefined"}
	  },
	  { name : "prototype-ex",
	    requires : ["prototype"]
	  },
          { name : "prototype-ui.packed",
            requires : ["prototype"]
          },
	  { name : "cookie",
	    requires : ["prototype"]
	  },
          { name : "ballotbox",
	    requires : ["prototype", "cookie"]
	  },
	  { name : "deprecation",
	    requires : ["prototype"]
	  },
	  { name : "base64"
	  },
	  { name : "us/scriptaculous",
	    requires : ["prototype"]
	  },
	  { name : "us/builder",
	    requires : ["prototype"]
	  },
	  { name : "us/effects",
	    requires : ["prototype"]
	  },
	  { name : "excanvas",
	    isLoaded : function () { return !Prototype.Browser.IE } // Only IE needs this
	  },
	  { name : "canvas2image"
	  },
          {
	      name: "login",
	      requires: ["prototype"]
	  },
	  { name : "canvastext"
	  },
	  { name : "flotr",
	    requires : ["excanvas", "prototype", "base64", "canvas2image", "canvastext"]
	  },
	  { name : "starbox",
	    requires : ["prototype","us/scriptaculous","us/effects"]
	  },
	  { name : "instructstarbox",
	    requires : ["starbox"]
	  },
	  { name : "us/dragdrop",
	    requires : ["prototype"]
	  },
	  { name : "us/controls",
	    requires : ["prototype"]
	  },
	  { name : "us/slider",
	    requires : ["Base","prototype"]
	  },
	  { name : "us/sound",
	    requires : ["prototype"]
	  },
	  { name : "effect.scroll",
	    requires : ["us/effects"]
	  },
	  { name : "Base"
	  },
	  { name : "quarantiner"
	  },
	  { name : "carousel",
	    requires : ["us/effects"]
	  },
	  { name : "instructcarousel",
	    requires : ["carousel"]
	  },
	  { name : "validation",
	    requires : ["us/effects"]
	  },
	  { name : "blox",
	    requires : ["prototype", "us/builder", "us/effects"]
	  },
	  { name : "helpbubble",
	    requires : ["Base", "prototype"]
	  },
	  { name : "thumbsupdown",
	    requires : ["prototype", "us/builder", "helpbubble", "blox"]
	  },
	  { name : "favoriter",
	    requires : ["blox"],
	    tagOnly : true
	  },
	  { name : "instruct",
	    requires : ["prototype-ex", "Base", "us/builder", "us/effects","us/slider"]
	  },
	  { name : "tabs",
	    requires : ["instruct"],
	    tagOnly : true
	  },
	  { name : "itemscroller",
	    requires : ["instruct"],
	    tagOnly : true
	  },
	  // TODO: place the categorychanger config on the only place it is still used, forum topics
	  { name : "categorychanger",
	    requires : ["instruct"],
	    tagOnly : true
	  },
	  { name : "Tooltip",
	    requires : ["us/effects", "us/builder"]
	  },
	  { name : "imagespot",
	    requires : ["instruct", "Tooltip"]
	  },
	  { name : "library",
	    requires : [
			"Base",
			"us/builder",
			"instruct",
			"progressindicator",
			"Tooltip",
			"us/slider"
			]
	  },
	  { name : "calendar"
	  },
	  { name : "calendar-en",
	    requires : ["calendar"]
	  },
	  { name : "flickr",
	    requires : ["library","calendar-en"]
	  },
	  { name : "filebucket",
	    requires : ["library", "us/dragdrop"]
	  },
	  { name : "related-content",
	    requires : ["prototype", "Base", "us/builder"]
	  },

	  { name : "addressbookimporter",
	    requires : ["feedback","prototype", "us/effects","us/builder"]
	  },

	  { name : "comment",
	    requires : ["us/effects"]
	  },
	  { name : "lightbox",
	    requires : ["prototype", "us/effects"]
	  },
	  { name : "lightbox-text",
	    requires : ["prototype", "us/effects"]
	  },

	  { name : "upload",
	    requires :
            ["instruct", "us/effects", "us/builder", "feedback"]
	  },
	  { name : "progressindicator",
	    requires : ["Base", "prototype", "us/builder"]
	  },
	  { name : "feedback",
	    requires : ["Base", "prototype", "us/effects"]
	  },
	  { name : "ajaxdomload",
	    requires : ["progressindicator", "feedback"]
	  },
	  { name : "flag",
	    requires : ["instruct", "feedback"],
	    tagOnly : true
	  },
	  { name : "itemscroller",
	    requires : ["instruct"],
	    tagOnly : true
	  },
	  { name : "keywordtagger",
	    requires : ["instruct", "Tooltip"],
	    tagOnly : true
	  },

	  { name : "keywordtagger",
	    requires : ["instruct", "Tooltip"],
	    tagOnly : true
	  },

	  { name : "form",
	    requires : ["blox", "feedback", "us/effects","addressbookimporter", "instruct"],
	    tagOnly : true
	  },
	  { name : "commentable",
	    requires : ["instruct", "imagespot", "comment", "lightbox", "form", "instructstarbox","quarantiner", "helpbubble" ],
	    tagOnly : true
	  },
	  { name : "editable",
	    requires : ["imagespot", "feedback","validation", "filebucket", "upload","addressbookimporter"],
	    tagOnly : true
	  },
	  { name : "collaboration",
	    requires : ["instruct","addressbookimporter"],
	    tagOnly : true
	  },
	  {
          name : "gift",
          requires : ["instruct", "feedback"]
	  },

	  // SWFUpload code
	  { name : "swfupload/swfupload" },
	  { name : "swfupload/simple/swfupload.queue", requires : ["swfupload/swfupload", "prototype"] },
	  { name : "swfupload/simple/fileprogress", requires : ["swfupload/swfupload", "prototype"] },
	  { name : "swfupload/simple/handlers", requires : ["swfupload/swfupload", "us/effects"] },
	  { name : "swfupload", // the tag
	    tagOnly : true,
	    requires : [
			"swfupload/swfupload",
			"swfupload/simple/swfupload.queue",
			"swfupload/simple/fileprogress",
			"swfupload/simple/handlers"
			]
	  }
	  ];

  // Figure out what tags to load
  this.toLoad = "none";
  this.tagNamesToLoad = [];
  this.delayUntilLoad = "true";

}
InstructablesScript.prototype.init = function(){

    if (this.toLoad == "all") {
	this.tagNamesToLoad = [
	    "prototype",
	    "us/scriptaculous",
	    "us/builder",
	    "us/effects",
	    "us/dragdrop",
	    "us/controls",
	    "us/slider",
	    "us/sound",
	    "Base",
	    "validation",
	    "blox",
	    "feedback",
	    "thumbsupdown",
	    "instruct",
	    "tabs",
	    "Tooltip",
	    "imagespot",
	    "library",
	    "flickr",
	    "filebucket",
	    "related-content",
	    "comment",
	    "lightbox",
	    "upload",
	    "progressindicator",
	    "form",
	    "calendar-en",
	    "gift",
        "login"
	];
    } else {
        this.tagNamesToLoad = this.toLoad.split(" ");
    }
}
