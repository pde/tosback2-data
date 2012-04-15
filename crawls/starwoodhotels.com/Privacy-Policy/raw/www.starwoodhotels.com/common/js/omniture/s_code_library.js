   if (s) {
       s.ctcTrack = function() {
           setOmniVars (s.charSet, s.server, s.channel, s.prop2 , s.prop3, s.prop1, '', 'Support', 'ClickToCall');
           s.t();
       };
       s.meetingsLinksTrack = function(varText) {
           setOmniVars (s.charSet, s.server, s.channel, s.prop2 , s.prop3, s.prop1, '', 'Meetings', varText);
           s.t();
       };
   }

   // Assembles an associated JS 1.0 array of the page naming vars
   function createParams (p0, p1, p2, p3, p4, p5, p6, p7) {
       return arguments;
   }

   // Delimits array members of associative param object and returns the string
   function delimit(params) {
       var i;
       var returnVal = [];
       for(i=0;i<params.length;i++){
            if(params[i]){
                returnVal.push(params[i]);
            }
       }
       return returnVal.join(":");
   }

   // sets all pertinent Omniture traffic vars
   function setOmniVarsYUI (omni_charset, omni_server, omni_channel, omni_brand, omni_lang, omni_propID, omni_hotelBrand, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3) {

      // Staying compatible with JS 1.0 specs
      // Handling undefined values being passed
      if (omni_charset == null) omni_charset = "";
      if (omni_server == null) omni_server = "";
      if (omni_channel == null) omni_channel = "";
      if (omni_brand == null) omni_brand = "";
      if (omni_lang == null) omni_lang = "";
      if (omni_propID == null) omni_propID = "noID";
      if (omni_hotelBrand == null) omni_hotelBrand = "";
      if (omni_section == null) omni_section = "";
      if (omni_subsection == null) omni_subsection = "";
      if (omni_page == null) omni_page = "";
      if (omni_detail1 == null) omni_detail1 = "";
      if (omni_detail2 == null) omni_detail2 = "";
      if (omni_detail3 == null) omni_detail3 = "";

      s.charSet = delimit(createParams(omni_charset));

      s.server = delimit(createParams(omni_server));
      s.channel = delimit(createParams(omni_channel));

      if ((omni_section.length > 0)) {
         s.pageName = delimit(createParams(omni_lang, omni_brand, omni_propID, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));
      }
      else {
         s.pageName = "";
      }

      s.prop1 = delimit(createParams(omni_propID));
      s.prop2 = delimit(createParams(omni_brand));
      s.prop3 = delimit(createParams(omni_lang));

      s.prop8 = delimit(createParams(omni_brand, omni_lang));

      s.prop9 = delimit(createParams(omni_section));
      s.prop10 = delimit(createParams(omni_section, omni_subsection));
      s.prop11 = delimit(createParams(omni_section, omni_subsection, omni_page));
      // s.prop12 = delimit(createParams(omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop13 = delimit(createParams(omni_brand, omni_section));
      s.prop14 = delimit(createParams(omni_brand, omni_section, omni_subsection));
      s.prop15 = delimit(createParams(omni_brand, omni_section, omni_subsection, omni_page));
      s.prop16 = delimit(createParams(omni_brand, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop17 = delimit(createParams(omni_lang, omni_section));
      s.prop18 = delimit(createParams(omni_lang, omni_section, omni_subsection));
      s.prop19 = delimit(createParams(omni_lang, omni_section, omni_subsection, omni_page));
      //s.prop20 = delimit(createParams(omni_lang, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop21 = delimit(createParams(omni_brand, omni_lang,omni_section));
      s.prop22 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection));
      //s.prop23 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection, omni_page));
      //s.prop24 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop25 = delimit(createParams(omni_propID, omni_section, omni_subsection));
      s.prop26 = delimit(createParams(omni_propID, omni_section, omni_subsection, omni_page));
      //s.prop27 = delimit(createParams(omni_propID, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop32 = delimit(createParams(omni_propID, omni_lang, omni_section, omni_subsection));
      //s.prop33 = delimit(createParams(omni_propID, omni_lang, omni_section, omni_subsection, omni_page));

      //s.prop34 = delimit(createParams(omni_propID, omni_section));

      if ((omni_propID.length > 0) && (omni_propID != "noID") && (omni_hotelBrand.length > 0)) {
         s.prop35 = delimit(createParams(omni_hotelBrand, omni_section, omni_subsection));
         //s.prop36 = delimit(createParams(omni_hotelBrand, omni_section, omni_subsection, omni_page));
         s.prop37 = delimit(createParams(omni_brand, omni_hotelBrand, omni_section, omni_subsection));
         //s.prop38 = delimit(createParams(omni_brand, omni_hotelBrand, omni_section, omni_subsection, omni_page));
      }
      else {
         s.prop35 = "";
         //s.prop36 = "";
         s.prop37 = "";
         //s.prop38 = "";
      }
      var s_code=s.t();
   }

   // sets all pertinent Omniture traffic vars
   function setOmniVars (omni_charset, omni_server, omni_channel, omni_brand, omni_lang, omni_propID, omni_hotelBrand, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3) {

      // Staying compatible with JS 1.0 specs
      // Handling undefined values being passed
      if (omni_charset == null) omni_charset = "";
      if (omni_server == null) omni_server = "";
      if (omni_channel == null) omni_channel = "";
      if (omni_brand == null) omni_brand = "";
      if (omni_lang == null) omni_lang = "";
      if (omni_propID == null) omni_propID = "noID";
      if (omni_hotelBrand == null) omni_hotelBrand = "";
      if (omni_section == null) omni_section = "";
      if (omni_subsection == null) omni_subsection = "";
      if (omni_page == null) omni_page = "";
      if (omni_detail1 == null) omni_detail1 = "";
      if (omni_detail2 == null) omni_detail2 = "";
      if (omni_detail3 == null) omni_detail3 = "";

      s.charSet = delimit(createParams(omni_charset));

      s.server = delimit(createParams(omni_server));
      s.channel = delimit(createParams(omni_channel));

      if ((omni_section.length > 0)) {
         s.pageName = delimit(createParams(omni_lang, omni_brand, omni_propID, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));
      }
      else {
         s.pageName = "";
      }

      s.prop1 = delimit(createParams(omni_propID));
      s.prop2 = delimit(createParams(omni_brand));
      s.prop3 = delimit(createParams(omni_lang));

      s.prop8 = delimit(createParams(omni_brand, omni_lang));

      s.prop9 = delimit(createParams(omni_section));
      s.prop10 = delimit(createParams(omni_section, omni_subsection));
      s.prop11 = delimit(createParams(omni_section, omni_subsection, omni_page));
      //s.prop12 = delimit(createParams(omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop13 = delimit(createParams(omni_brand, omni_section));
      s.prop14 = delimit(createParams(omni_brand, omni_section, omni_subsection));
      s.prop15 = delimit(createParams(omni_brand, omni_section, omni_subsection, omni_page));
      s.prop16 = delimit(createParams(omni_brand, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop17 = delimit(createParams(omni_lang, omni_section));
      s.prop18 = delimit(createParams(omni_lang, omni_section, omni_subsection));
      s.prop19 = delimit(createParams(omni_lang, omni_section, omni_subsection, omni_page));
      //s.prop20 = delimit(createParams(omni_lang, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop21 = delimit(createParams(omni_brand, omni_lang,omni_section));
      s.prop22 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection));
      //s.prop23 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection, omni_page));
      //s.prop24 = delimit(createParams(omni_brand, omni_lang,omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop25 = delimit(createParams(omni_propID, omni_section, omni_subsection));
      s.prop26 = delimit(createParams(omni_propID, omni_section, omni_subsection, omni_page));
      //s.prop27 = delimit(createParams(omni_propID, omni_section, omni_subsection, omni_page, omni_detail1, omni_detail2, omni_detail3));

      s.prop32 = delimit(createParams(omni_propID, omni_lang, omni_section, omni_subsection));
      //s.prop33 = delimit(createParams(omni_propID, omni_lang, omni_section, omni_subsection, omni_page));

      //s.prop34 = delimit(createParams(omni_propID, omni_section));

      if ((omni_propID.length > 0) && (omni_propID != "noID") && (omni_hotelBrand.length > 0)) {
         s.prop35 = delimit(createParams(omni_hotelBrand, omni_section, omni_subsection));
         //s.prop36 = delimit(createParams(omni_hotelBrand, omni_section, omni_subsection, omni_page));
         s.prop37 = delimit(createParams(omni_brand, omni_hotelBrand, omni_section, omni_subsection));
         //s.prop38 = delimit(createParams(omni_brand, omni_hotelBrand, omni_section, omni_subsection, omni_page));
      }
      else {
         s.prop35 = "";
         //s.prop36 = "";
         s.prop37 = "";
         //s.prop38 = "";
      }
   }
   