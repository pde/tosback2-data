(function(){
var DATA={
  "api_host": "api", 
  "experiments": {
    "4892091": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "/doctors/dentist/NY/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/CA/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/TX/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/FL/..."
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "Doc Search Pilot", 
      "variation_ids": [
        "4918044", 
        "4928013"
      ]
    }, 
    "5657183": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "www.healthline.com/symptomsearch\\?.*addterm=[dD]epression"
            }, 
            {
              "match": "regex", 
              "value": "www.healthline.com/symptomsearch\\?.*addterm=[aA]nxiety"
            }, 
            {
              "match": "regex", 
              "value": "om/symptomsearch\\?.*addterm=[sS]tress"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_WSR object#FLASH_AD embed:eq(0)": "wsl_ad", 
        "div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)": "new_ad"
      }, 
      "name": "SS - center ad", 
      "variation_ids": [
        "5657184", 
        "5785147", 
        "5777148", 
        "5774098", 
        "5849038"
      ]
    }, 
    "5687082": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/doctors/psychiatrist/scot-maclean/2680666"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/doctors/psychiatrist/scot-maclean/2680666 Experiment", 
      "variation_ids": [
        "5654198", 
        "5669138"
      ]
    }, 
    "5691097": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "http://www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0) img:eq(0)": "Smoking Slideshow", 
        "div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div.noText div.bottom": "SSx DSA"
      }, 
      "name": "KW - replace /health DSA with Slideshow Promos", 
      "variation_ids": [
        "5714173", 
        "5657140", 
        "5636168"
      ]
    }, 
    "5763020": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/symptomsearch/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_WSR div:eq(0)": "ad", 
        "div.rc-170 div:eq(0) a:eq(0) img:eq(0)": "promo"
      }, 
      "name": "Symptom Search WS Ads", 
      "variation_ids": [
        "5751010", 
        "5725040", 
        "5647037", 
        "5755030", 
        "5684059", 
        "5628050"
      ]
    }, 
    "5802080": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "http://www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0) img:eq(0)": "Smoking Slideshow", 
        "div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div.noText div.bottom": "SSx DSA"
      }, 
      "name": "KW - replace /health DSA with Slideshow Promos (2)", 
      "variation_ids": [
        "5789108", 
        "5802081", 
        "5633175"
      ]
    }, 
    "5890102": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "www.healthline.com/.."
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/health/asthma Experiment", 
      "variation_ids": [
        "5885131", 
        "5885132"
      ]
    }, 
    "5890171": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(10)": "Treatment Search", 
        "div#clinicalAppCallout div:eq(5)": "Doctor Search", 
        "div.noText": "SSx"
      }, 
      "name": "kw - order of DSAs on /health", 
      "variation_ids": [
        "5890172", 
        "5890173", 
        "6024043", 
        "5950078", 
        "6043008"
      ]
    }, 
    "5897214": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/adamcontent"
            }, 
            {
              "match": "substring", 
              "value": "www.healthline.com/galecontent"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(10)": "Treatment Search", 
        "div#clinicalAppCallout div:eq(5)": "Doctor Search", 
        "div.noText": "SSx"
      }, 
      "name": "kw - order of DSAs on Adam/Gale", 
      "variation_ids": [
        "5902136", 
        "6013189", 
        "5902137", 
        "6013190", 
        "6055017"
      ]
    }, 
    "5900048": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/diabetes"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#rightRail a:eq(0) img:eq(0)": "Symptom Search", 
        "div#rightRail a:eq(1) img:eq(0)": "heart attack", 
        "div#rightRail a:eq(1) img:eq(1)": "heart attack", 
        "div#rightRail a:eq(2) img:eq(0)": "tips"
      }, 
      "name": "NH-DAS Test", 
      "variation_ids": [
        "5902255", 
        "5902256", 
        "6095027"
      ]
    }, 
    "5903185": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/bipolar"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/fibromyalgia"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/beauty-skin-care"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/dental-and-oral-health"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/quit-smoking"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/pain-relief"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/add-adhd-attention-deficit"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "kw - sharecare LCs with Q&A Removed", 
      "variation_ids": [
        "5903186", 
        "6039045"
      ]
    }, 
    "5904011": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/doctors/dentist/NY/new-york"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#teaserMap": "map clicks"
      }, 
      "name": "dr - dsx - new york - map test", 
      "variation_ids": [
        "5931011", 
        "5898026"
      ]
    }, 
    "5905049": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "/doctors/dentist/NY/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/CA/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/TX/..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/dentist/FL/..."
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "kw - doc search 2", 
      "variation_ids": [
        "5924028", 
        "5924029"
      ]
    }, 
    "5909070": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "www.healthline.com/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(10)": "Treatment DSA", 
        "div#clinicalAppCallout div:eq(4) div:eq(0) img:eq(0)": "Smoking Slide", 
        "div#clinicalAppCallout div:eq(5)": "Doctor DSA", 
        "div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)": "Depression Slide", 
        "div#clinicalAppCallout div:eq(7) div:eq(0) img:eq(0)": "Smoking Slide", 
        "div.noText": "SSx DSA"
      }, 
      "name": "kw - replace adam/gale DSA with slideshows", 
      "variation_ids": [
        "5953059", 
        "5975043", 
        "6018012", 
        "6018013"
      ]
    }, 
    "5925327": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/diabetes"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#rightRail a:eq(0) img:eq(0)": "Symptom Search", 
        "div#rightRail a:eq(1) img:eq(0)": "heart attack", 
        "div#rightRail a:eq(1) img:eq(1)": "heart attack", 
        "div#rightRail a:eq(2) img:eq(0)": "tips"
      }, 
      "name": "NH-DAS Test (1)", 
      "variation_ids": [
        "6127006", 
        "5925328", 
        "6031110"
      ]
    }, 
    "5939037": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "kw: all healthline", 
      "variation_ids": [
        "6000013", 
        "5892041"
      ]
    }, 
    "5950057": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/bipolar-disorder"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#leftRail div:eq(0) ul:eq(0) li:eq(1) a:eq(0)": "LOC Symptoms", 
        "div#leftRail div:eq(0) ul:eq(0) li:eq(2) a:eq(0)": "LOC Causes", 
        "table.padding tbody:eq(0) tr:eq(1) td:eq(1)": "All of Question 1", 
        "table.padding tbody:eq(0) tr:eq(1) td:eq(1) a:eq(1)": "View Answer 1", 
        "table.padding tbody:eq(0) tr:eq(2) td:eq(1)": "All of Question 2", 
        "table.padding tbody:eq(0) tr:eq(2) td:eq(1) a:eq(2)": "View Answer 2", 
        "table.padding tbody:eq(0) tr:eq(3) td:eq(1) strong:eq(0) a:eq(0)": "View All Answers"
      }, 
      "name": "kw - sharecare bipolar page", 
      "variation_ids": [
        "5975065", 
        "5950058"
      ]
    }, 
    "5965002": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "www.healthline.com/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)": "Depression DSA", 
        "div.noText a:eq(0)": "SS DSA"
      }, 
      "name": "KW - replace DSAs on adam/gale", 
      "variation_ids": [
        "5984010", 
        "5862015"
      ]
    }, 
    "5984014": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1)": "DOC DSA", 
        "div.noText div.bottom": "DSA SSx"
      }, 
      "name": "kw: remove dsa from /health", 
      "variation_ids": [
        "5874031", 
        "5952006", 
        "5960033", 
        "5934010"
      ]
    }, 
    "5995007": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/adamcontent/diabetes"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "KW - replace DSAs on adam/gale", 
      "variation_ids": [
        "5901019", 
        "5879022"
      ]
    }, 
    "6059030": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/depression"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)": "SSx 1", 
        "div#rightRail div:eq(2) a:eq(0) div:eq(0) img:eq(0)": "SSx 2", 
        "div#rightRail div:eq(4) a:eq(0) div:eq(0) img:eq(0)": "Depression Slide", 
        "div#rightRail div:eq(6) a:eq(0) div:eq(0) img:eq(0)": "Schizophrenia Slide"
      }, 
      "name": "kw - /health/depression with better DSAs", 
      "variation_ids": [
        "5916048", 
        "6059031", 
        "5916049"
      ]
    }, 
    "6411027": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)": "Find Recipes"
      }, 
      "name": "www.healthline.com Experiment", 
      "variation_ids": [
        "6497011", 
        "7053099"
      ]
    }, 
    "6987322": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "/doctors/dentist/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/family-practice-physician/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/psychiatrist/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/pediatrician/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/pedia.*/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/derma.*/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/car.*/../..."
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "a#dxs-compare": "Compare Providers", 
        "div.ui-bordered-box": "Click Callout Box", 
        "li.filter a:eq(0)": "Filter Directory", 
        "li.map a:eq(0)": "Map Providers"
      }, 
      "name": "kw: doc search callouts", 
      "variation_ids": [
        "7321050", 
        "7197190", 
        "7140311", 
        "7168347"
      ]
    }, 
    "6993199": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/symptomsearch/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_WSR div:eq(0)": "ad", 
        "div.rc-170 div:eq(0) a:eq(0) img:eq(0)": "promo"
      }, 
      "name": "Symptom Search WS Ads (1)", 
      "variation_ids": [
        "6993200", 
        "7114245", 
        "7193025", 
        "7181050", 
        "6987207", 
        "7019178"
      ]
    }, 
    "7001077": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com Experiment", 
      "variation_ids": [
        "7001078", 
        "7001079"
      ]
    }, 
    "7003124": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.div-twocol-lc div:eq(0) div:eq(0)": "Click Jumbotron"
      }, 
      "name": "Homepage JB - BM vs. Recipes", 
      "variation_ids": [
        "7003125", 
        "6987143"
      ]
    }, 
    "7009112": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "http://www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0) img:eq(0)": "Smoking Slideshow", 
        "div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)": "Depression Slideshow", 
        "div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0) img:eq(0)": "Stretching Slideshow", 
        "div.noText div.bottom": "SSx DSA"
      }, 
      "name": "KW - replace /health DSA with Slideshow Promos (3)", 
      "variation_ids": [
        "7147125", 
        "7064144", 
        "7116105"
      ]
    }, 
    "7009114": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "www.healthline.com/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout div:eq(10)": "Treatment DSA", 
        "div#clinicalAppCallout div:eq(4) div:eq(0) img:eq(0)": "Smoking Slide", 
        "div#clinicalAppCallout div:eq(5)": "Doctor DSA", 
        "div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)": "Depression Slide", 
        "div#clinicalAppCallout div:eq(7) div:eq(0) img:eq(0)": "Smoking Slide", 
        "div.noText": "SSx DSA"
      }, 
      "name": "kw - replace adam/gale DSA with slideshows (1)", 
      "variation_ids": [
        "7054066", 
        "7064146", 
        "7064147", 
        "7054067"
      ]
    }, 
    "7051173": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/goldcontent/amoxicillin"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/goldcontent/amoxicillin Experiment", 
      "variation_ids": [
        "6983177", 
        "7048156"
      ]
    }, 
    "7057299": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout": "Any DSA Callout", 
        "div#clinicalAppCallout div:eq(0)": "SSx DSA", 
        "div#clinicalAppCallout div:eq(10)": "TSx DSA", 
        "div#clinicalAppCallout div:eq(5)": "DocSx DSA", 
        "div#container": "Anywhere", 
        "div#navFooter": "Footer", 
        "div#navTop": "Header", 
        "div#postNav": "Body"
      }, 
      "ignore": 93, 
      "name": "kw: lcs - registration vs. dsa callouts (2)", 
      "variation_ids": [
        "7244048", 
        "7116212"
      ]
    }, 
    "7059166": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "www.healthline.com/goldcontent/amoxicillin"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "css": "h2{\ncolor: #333;\npadding: 12px 0px 8px 0px;\n}\n\na{\ncolor: #006599;\ntext-decoration: none;\n}\n\nbody{\ncolor: #444;\n}\n\n.paging a{\ncolor: #006599;\ntext-decoration: none;\n}\n\n.paging {\ncolor: #444;\nfont-size: 12px;\n}\n\n.paging span{\nbackground: none;\n}", 
      "events": {
        "div.tableofcontents a:eq(1)": "Side Effects - New TOC", 
        "div.tableofcontents a:eq(6)": "Side Effects - Old TOC"
      }, 
      "name": "www.healthline.com/goldcontent/amoxicillin Experiment", 
      "variation_ids": [
        "7176130", 
        "7171129", 
        "7169064"
      ]
    }, 
    "7065263": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.adBox-mr": "MR1", 
        "div.div-twocol-lc div:eq(0) div:eq(0)": "Jumbotron", 
        "div.div-twocol-lc div:eq(36) div:eq(0)": "Search Widgets", 
        "div.div-twocol-rc div:eq(18) div:eq(0)": "Foods That Help", 
        "embed[name=DCF240084080]": "Banner"
      }, 
      "ignore": 85, 
      "name": "kw: Recipe in Jumbotron", 
      "variation_ids": [
        "7065264", 
        "7065265"
      ]
    }, 
    "7078122": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://sfc-stage02.healthline.com/doctors/acupuncturist/CA/berkeley"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "sfc-stage02.healthline.com/doctors/acupuncturist/CA/berkeley Experiment", 
      "variation_ids": [
        "7000225", 
        "7194044"
      ]
    }, 
    "7079082": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)": "Find Recipes", 
        "div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0) a:eq(0) img:eq(0)": "Recipe Search"
      }, 
      "ignore": 90, 
      "name": "Adding Recipe Search to Homepage", 
      "variation_ids": [
        "7079083", 
        "7168042"
      ]
    }, 
    "7086155": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "http://www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email sign up", 
        "span#loginFBnewsletter": "Facebook sign up"
      }, 
      "name": "LC - Registration - No spam", 
      "variation_ids": [
        "7180067", 
        "7180068", 
        "7008131"
      ]
    }, 
    "7089253": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/depression"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email sign up", 
        "span#loginFBnewsletter": "Facebook sign up"
      }, 
      "name": "LC - Registration - Depression", 
      "variation_ids": [
        "7082226", 
        "7089254", 
        "7191066"
      ]
    }, 
    "7092167": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.adBox-mr": "MR1", 
        "div.div-twocol": "click in body", 
        "div.div-twocol-lc div:eq(0) div:eq(0)": "Jumbotron", 
        "div.div-twocol-lc div:eq(36) div:eq(0)": "Search Widgets", 
        "div.div-twocol-rc div:eq(18) div:eq(0)": "Foods That Help", 
        "embed[name=DCF240084080]": "Banner"
      }, 
      "ignore": 85, 
      "name": "kw: jumbotron: body maps, recipes, fitness", 
      "variation_ids": [
        "7151054", 
        "7127183", 
        "7082331", 
        "7085302"
      ]
    }, 
    "7099128": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_MR": "MR1", 
        "div#clinicalAppCallout": "DSA", 
        "div#clinicalAppCallout div:eq(0)": "SSx", 
        "div#clinicalAppCallout div:eq(10)": "TSx", 
        "div#clinicalAppCallout div:eq(5)": "RSx", 
        "div#hlmenus div:eq(0)": "Global Navigation", 
        "div.hl_serp_box_container": "Global Search", 
        "embed[name=17975/Homepage_728x90_Levemir.]": "Banner"
      }, 
      "ignore": 75, 
      "name": "kw: recipe callout in adam/gale DSA", 
      "variation_ids": [
        "7175055", 
        "7099129"
      ]
    }, 
    "7108241": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/quit-smoking"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email sign up", 
        "span#loginFBnewsletter": "Facebook Sign Up", 
        "span#loginFBnewsletter span:eq(0)": "Facebook new span"
      }, 
      "name": "LC - Registration - Smoking", 
      "variation_ids": [
        "7019171", 
        "7104168", 
        "7010207"
      ]
    }, 
    "7108294": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/quit-smoking"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email signup", 
        "span#loginFBnewsletter": "Facebook signup"
      }, 
      "name": "LC - Registration - Smoking - Grey Header", 
      "variation_ids": [
        "6983255", 
        "6983256"
      ]
    }, 
    "7116137": {
      "conditions": [
        {
          "type": "query", 
          "values": [
            {
              "key": "q1", 
              "value": "amoxicillin"
            }
          ]
        }, 
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/search?q1=amoxicillin"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.drug-interactions": "Drug Interactions", 
        "div.serp-column-main-content div:eq(14)": "Related Searches", 
        "div.serp-column-main-content div:eq(17)": "Pricing", 
        "div.serp-column-main-content div:eq(19)": "Web Results", 
        "div.serp-column-main-content div:eq(4)": "HL Result", 
        "div.serp-column-related div:eq(0) div:eq(0)": "RHS - Classes", 
        "div.serp-column-related div:eq(0) div:eq(2)": "RHS - Drug compare", 
        "div.serp-column-related div:eq(5) div:eq(0)": "RHS - Videos", 
        "div.serp-smart-result-wrapper h2:eq(0) a:eq(0)": "Callout", 
        "ul#-hhs-serp-sa li:eq(0) a:eq(0)": "Callout - Side effects", 
        "ul#-hhs-serp-sa li:eq(1)": "Callout - Dosage", 
        "ul#-hhs-serp-sa li:eq(2) a:eq(0)": "Callout - interactions"
      }, 
      "name": "Drug - Side Effects - SERP - Amoxicillin (2)", 
      "variation_ids": [
        "7137358", 
        "7108246"
      ]
    }, 
    "7127272": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "ignore": 93, 
      "name": "kw: lcs - registration vs. dsa callouts", 
      "variation_ids": [
        "7127273", 
        "7127274"
      ]
    }, 
    "7132014": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/recipe-search"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/recipe-search Experiment", 
      "variation_ids": [
        "7142001", 
        "7132015"
      ]
    }, 
    "7138243": {
      "code": "CE2.set(1, 'Original');", 
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.adBox-mr": "MR1", 
        "div.div-twocol-lc div:eq(0) div:eq(0)": "Jumbotron", 
        "div.div-twocol-lc div:eq(36) div:eq(0)": "Search Widgets", 
        "div.div-twocol-rc div:eq(0) div:eq(0)": "Accordian", 
        "div.div-twocol-rc div:eq(18) div:eq(0)": "Foods That Help", 
        "embed[name=DCF240084080]": "Banner"
      }, 
      "name": "kw: homepage house ad up w/crazy", 
      "variation_ids": [
        "6999300", 
        "7138244"
      ]
    }, 
    "7152247": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/quit-smoking"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email sign up", 
        "span#loginFBnewsletter": "Facebook signup"
      }, 
      "name": "LC - Registration - Smoking - No spam", 
      "variation_ids": [
        "7162108", 
        "7061189", 
        "7082270"
      ]
    }, 
    "7177170": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_MR": "MR1", 
        "div#clinicalAppCallout": "DSA", 
        "div#clinicalAppCallout div:eq(0)": "SSx", 
        "div#clinicalAppCallout div:eq(10)": "TSx", 
        "div#clinicalAppCallout div:eq(5)": "RSx", 
        "div#hlmenus div:eq(0)": "Global Navigation", 
        "div.hl_serp_box_container": "Global Search", 
        "embed[name=17975/Homepage_728x90_Levemir.]": "Banner"
      }, 
      "ignore": 80, 
      "name": "kw: recipe callout in adam/gale DSA (1)", 
      "variation_ids": [
        "7177171", 
        "7050158"
      ]
    }, 
    "7180095": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/goldcontent/amoxicillin"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#div-threecol-mc h2:eq(6) a:eq(0) img:eq(0)": "Center well callout", 
        "div.tableofcontents a:eq(1)": "TOC - Side Effects (2nd pos)", 
        "div.wrapper-980 div:eq(21) a:eq(0) img:eq(0)": "Right rail callout"
      }, 
      "name": "Drugs - Slideshow Experiment - Amoxicillin", 
      "variation_ids": [
        "7105279", 
        "7009223", 
        "7089271"
      ]
    }, 
    "7193024": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/fibromyalgia"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "button.spr-signupnow": "Email signup", 
        "span#loginFBnewsletter": "Facebook signup"
      }, 
      "name": "LC - Registration - Fibromyalgia", 
      "variation_ids": [
        "6993198", 
        "7019177"
      ]
    }, 
    "7219027": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_MR": "MR1", 
        "div#clinicalAppCallout": "DSA", 
        "div#clinicalAppCallout div:eq(0)": "SSx", 
        "div#clinicalAppCallout div:eq(10)": "TSx", 
        "div#clinicalAppCallout div:eq(5)": "RSx", 
        "div#hlmenus div:eq(0)": "Global Navigation", 
        "div.hl_serp_box_container": "Global Search", 
        "embed[name=17975/Homepage_728x90_Levemir.]": "Banner"
      }, 
      "ignore": 80, 
      "name": "kw: recipe callout in /health", 
      "variation_ids": [
        "7144137", 
        "7195050"
      ]
    }, 
    "7414274": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#clinicalAppCallout > div:eq(0)": "SSx", 
        "div#clinicalAppCallout > div:eq(1)": "DocSearch", 
        "div#clinicalAppCallout > div:eq(2)": "TreatSx", 
        "div#clinicalAppCallout > div:eq(3)": "Recipe Sx"
      }, 
      "ignore": 80, 
      "name": "kw: adding recipe as 4th callout to adam/gale", 
      "variation_ids": [
        "7412273", 
        "7481449"
      ]
    }, 
    "7467032": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "regex", 
              "value": "/doctors/dentist/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/family-practice-physician/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/psychiatrist/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/pediatrician/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/pedia.*/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/derma.*/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/car.*/../..."
            }, 
            {
              "match": "regex", 
              "value": "/doctors/optometrist/../..."
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "a#dxs-compare": "Compare Providers", 
        "div#teaserMap": "Map", 
        "div.ui-bordered-box": "Click Callout Box", 
        "li.filter a:eq(0)": "Filter Directory", 
        "li.map a:eq(0)": "Map Providers"
      }, 
      "name": "kw: doc search callouts (2)", 
      "variation_ids": [
        "7470072", 
        "7470073", 
        "7454021", 
        "7473026", 
        "7469020"
      ]
    }, 
    "7480469": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/fibromyalgia/fatigue"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#ad-anchor": "CTR on Ad", 
        "embed[name=DCF239204659]": "Cymbalta"
      }, 
      "name": "kw: fibromyalgia and cymbalta (2)", 
      "variation_ids": [
        "7656002", 
        "7622105"
      ]
    }, 
    "7481441": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_MR": "MR1", 
        "div#clinicalAppCallout": "DSA", 
        "div#clinicalAppCallout > div:eq(0)": "SSx 2", 
        "div#clinicalAppCallout > div:eq(0) > a:eq(0) > div:eq(1)": "SSx", 
        "div#clinicalAppCallout > div:eq(1)": "DocSearch", 
        "div#clinicalAppCallout > div:eq(1) > a:eq(0) > div:eq(1)": "DocSearch", 
        "div#clinicalAppCallout > div:eq(2)": "TSx 2", 
        "div#clinicalAppCallout > div:eq(2) > a:eq(0) > div:eq(1)": "TSx", 
        "div#clinicalAppCallout > div:eq(3)": "RSx 2", 
        "div#clinicalAppCallout > div:eq(3) > a:eq(0) > div:eq(1)": "RecipeSx", 
        "div#clinicalAppCallout div:eq(0)": "SSx", 
        "div#clinicalAppCallout div:eq(10)": "TSx", 
        "div#clinicalAppCallout div:eq(5)": "RSx", 
        "div#hlmenus div:eq(0)": "Global Navigation", 
        "div.hl_serp_box_container": "Global Search", 
        "embed[name=17975/Homepage_728x90_Levemir.]": "Banner"
      }, 
      "ignore": 80, 
      "name": "kw: recipe callout added to adam/gale DSA", 
      "variation_ids": [
        "7620065", 
        "7633023"
      ]
    }, 
    "7515028": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/recognizing-depression-symptoms/anxiety-irritability"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/health-slideshow/recognizing-depression-symptoms/anxiety-irritability Experiment", 
      "variation_ids": [
        "7515029", 
        "7515030"
      ]
    }, 
    "7543391": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/ Experiment", 
      "variation_ids": [
        "7630017", 
        "7518172"
      ]
    }, 
    "7614040": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/fibromyalgia/fatigue"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "embed[name=DCF239204659]": "Cymbalta"
      }, 
      "name": "kw: fibromyalgia and cymbalta", 
      "variation_ids": [
        "7532040", 
        "7532041"
      ]
    }, 
    "7695141": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#adTop div.dfp-lb": "LB1 CTR", 
        "div#test > p:eq(0) > a:eq(0) > img:eq(0)": "BM Ad CTR", 
        "input#hlGlobalInput": "Search Entry CTR", 
        "input#searchButton": "Search Button CTR"
      }, 
      "ignore": 90, 
      "name": "kw- modified header layout", 
      "variation_ids": [
        "7433366", 
        "7551448"
      ]
    }, 
    "7762076": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#adTop div.dfp-lb": "LB1 CTR", 
        "div#test > p:eq(0) > a:eq(0) > img:eq(0)": "BM Ad CTR", 
        "input#hlGlobalInput": "Search Entry CTR", 
        "input#searchButton": "Search Button CTR"
      }, 
      "ignore": 90, 
      "name": "kw- modified header layout (1)", 
      "variation_ids": [
        "7762077", 
        "7762078"
      ]
    }, 
    "7840153": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/fibromyalgia/resources"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "kw - fibro slideshow w/ad in slide: version 2", 
      "variation_ids": [
        "7841160", 
        "7837146"
      ]
    }, 
    "7875282": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/health-slideshow/alzheimers-symptoms/more-information"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.storyArea": "Body Content CTR", 
        "div.storyArea > div:eq(1) > div:eq(0)": "More Slideshows CTR", 
        "embed[name='DCF238888739']": "MR1 CTR"
      }, 
      "name": "kw - alzheimer's disease slideshow with ad moved", 
      "variation_ids": [
        "7875283", 
        "7871283"
      ]
    }, 
    "8022167": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/alzheimers-symptoms/more-information"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/health-slideshow/alzheimers-symptoms/more-information Experiment", 
      "variation_ids": [
        "8022168", 
        "8017274"
      ]
    }, 
    "8032005": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/treat-psoriasis-symptoms-home/more-answers"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.box > div.left": "Related Stories CTR", 
        "div.box > div.right": "More Slideshows Bottom CTR", 
        "div.storyArea > div:eq(1) > div:eq(0)": "More Slideshow CTR", 
        "embed[name='DCF238888739']": "MR1 CTR"
      }, 
      "ignore": 84, 
      "name": "kw - psoriasis slideshow with MR1 in center", 
      "variation_ids": [
        "8090011", 
        "8126002"
      ]
    }, 
    "8039159": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/schizophrenia/living-with-schizophrenia"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "name": "www.healthline.com/health-slideshow/schizophrenia/living-with-schizophrenia Experiment", 
      "variation_ids": [
        "8059075", 
        "8061085"
      ]
    }, 
    "8057341": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/health-slideshow/healthy-date-ideas/farmers-market"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.storyArea": "Body Content CTR", 
        "div.storyArea > div:eq(1) > div:eq(0)": "More Slideshows CTR", 
        "embed[name='DCF238888739']": "MR1 CTR"
      }, 
      "name": "kw - test - slideshow ad", 
      "variation_ids": [
        "8084020", 
        "8021044"
      ]
    }, 
    "8060092": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/health-slideshow/schizophrenia/living-with-schizophrenia"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div.storyArea": "Body Content CTR", 
        "div.storyArea > div:eq(1) > div:eq(0)": "More Slideshows CTR", 
        "embed[name='DCF238888739']": "MR1 CTR"
      }, 
      "name": "kw - schizophrenia slideshow with ad moved", 
      "variation_ids": [
        "8059073", 
        "8060093"
      ]
    }, 
    "8143036": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/sleep-sanctuary/next-steps"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#ad-anchor": "Ad CTR"
      }, 
      "name": "kw - test run ad CTR on slideshows", 
      "variation_ids": [
        "8143037", 
        "8114045"
      ]
    }, 
    "8152213": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health/depression"
            }, 
            {
              "match": "substring", 
              "value": "http://www.healthline.com/health/psoriasis"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#marketplace-wrapper > div:eq(0) > a:eq(0) > img:eq(0)": "First link - image", 
        "div#marketplace-wrapper > div:eq(0) > p:eq(0) > a:eq(0)": "First link - headline", 
        "div#marketplace-wrapper > div:eq(1) > a:eq(0) > img:eq(0)": "second link - image", 
        "div#marketplace-wrapper > div:eq(1) > p:eq(0) > a:eq(0)": "second link - headline", 
        "div#marketplace-wrapper > div:eq(2) > a:eq(0) > img:eq(0)": "third link - image", 
        "div#marketplace-wrapper > div:eq(2) > p:eq(0) > a:eq(0)": "third link - headline", 
        "div#marketplace-wrapper > div:eq(3) > a:eq(0) > img:eq(0)": "fourth link - image", 
        "div#marketplace-wrapper > div:eq(3) > p:eq(0) > a:eq(0)": "fourth link - headline"
      }, 
      "ignore": 35, 
      "is_site_catalyst_enabled": "null", 
      "name": "Marketplace ADs", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "8166197", 
        "8167199", 
        "8166214", 
        "10352308"
      ]
    }, 
    "8203142": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/health/migraine"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#ad-anchor > div:eq(2) > a:eq(0) > img:eq(0)": "MR2", 
        "div#adTop div.dfp-lb": "LB1 CTR", 
        "div#centerWell > div.primary": "Overview Block", 
        "div#centerWell > div:eq(2) > div:eq(0)": "BodyMaps Block", 
        "div#hlmenus > div.bd": "Navigation", 
        "div#leftRail > div.box": "TOC", 
        "div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)": "Home", 
        "div#rightRail > div.borderWhiteBgTanShadow": "Registration", 
        "div#test > p:eq(0) > a:eq(0) > img:eq(0)": "BM Ad CTR", 
        "div.breadcrumb": "breadcrumb", 
        "div.quaternary": "SEO block", 
        "div.quinaryMiddle": "Vidoes & Images", 
        "div.reg-links": "Utility Nav", 
        "div.secondary": "Popular topics blocs", 
        "div.ssb-content": "Feat Articles Block", 
        "input#hlGlobalInput": "Search Entry CTR", 
        "input#searchButton": "Search Button CTR"
      }, 
      "name": "NH-modified head \u00bb Engagement Test on Migraine LC", 
      "variation_ids": [
        "8158223", 
        "8124197"
      ]
    }, 
    "8203147": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "exact", 
              "value": "http://www.healthline.com/health/migraine-symptoms"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#ad-anchor > div:eq(2) > a:eq(0) > img:eq(0)": "MR2", 
        "div#adTop div.dfp-lb": "LB1 CTR", 
        "div#centerWell > div.primary": "Overview Block", 
        "div#centerWell > div:eq(2) > div:eq(0)": "BodyMaps Block", 
        "div#hlmenus > div.bd": "Navigation", 
        "div#leftRail > div.box": "TOC", 
        "div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)": "Home", 
        "div#rightRail > div.borderWhiteBgTanShadow": "Registration", 
        "div#test > p:eq(0) > a:eq(0) > img:eq(0)": "BM Ad CTR", 
        "div.breadcrumb": "breadcrumb", 
        "div.byBlock": "article 1", 
        "div.contentMore": "news", 
        "div.nextBlock > p:eq(0) > a:eq(0)": "next page", 
        "div.quaternary": "SEO block", 
        "div.quinaryMiddle": "Vidoes & Images", 
        "div.reg-links": "Utility Nav", 
        "div.secondary": "Popular topics blocs", 
        "div.ssb-content": "Feat Articles Block", 
        "div.textBlock": "article 2", 
        "input#hlGlobalInput": "Search Entry CTR", 
        "input#searchButton": "Search Button CTR", 
        "object#DCF242964630": "MR1", 
        "object#DCF242964634": "WS Ad"
      }, 
      "name": "NH-modified head \u00bb Engagement Test on Symptoms for Migraine", 
      "variation_ids": [
        "8002158", 
        "8078252"
      ]
    }, 
    "8367837": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "homepage search", 
      "variation_ids": [
        "8442502", 
        "8453351"
      ]
    }, 
    "8405374": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "www.healthline.com/health"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#adTop div.dfp-lb": "LB1 CTR", 
        "div#hlmenus > div.bd": "General Navigation", 
        "div#leftRail > div.box": "TOC", 
        "div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)": "Home Link", 
        "div#rightRail > div.borderWhiteBgTanShadow": "Registration", 
        "div#test > p:eq(0) > a:eq(0) > img:eq(0)": "BM Ad CTR", 
        "div.ads-block-marketplace-container": "Market Place", 
        "div.boxBorder > div:eq(0)": "Footer", 
        "div.breadcrumb": "Breadcrumb", 
        "div.reg-links": "Utility nav", 
        "input#hlGlobalInput": "Search Entry CTR", 
        "input#searchButton": "Search Button CTR"
      }, 
      "ignore": 50, 
      "is_site_catalyst_enabled": "null", 
      "name": "NH- modified header layout (4) \u00bb /Health Test", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "8396137", 
        "8402342"
      ]
    }, 
    "8405837": {
      "conditions": [
        {
          "not": true, 
          "type": "browser", 
          "values": [
            "mobile", 
            "ie6", 
            "ie7", 
            "ie8", 
            "ie9"
          ]
        }, 
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/healthy-lunch-ideas-for-kids/back-to-school-information"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_MR": "Ad CTR 1", 
        "div#ad-anchor": "Ad CTR 2", 
        "div.box > div.storyArea > div:eq(1) > div:eq(0)": "More Slideshows CTR", 
        "div.senary": "Lower Content Links CTR", 
        "div.storyArea > div:eq(1) > div:eq(0)": "More Slideshows CTR", 
        "embed[name='DCF234061755']": "Ad CTR"
      }, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - slideshow healthy lunch, ad in slide position", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "8415618", 
        "8711836", 
        "9050668"
      ]
    }, 
    "8438178": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/healthy-lunch-ideas-for-kids/back-to-school-information"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "www.healthline.com/health-slideshow/healthy-lunch-ideas-for-kids/back-to-school-information Experiment", 
      "variation_ids": [
        "8415620", 
        "8437202"
      ]
    }, 
    "8772679": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/living-with-epilepsy/when-to-change-treatments"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "Navigator A/B", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "8766884", 
        "9201141"
      ]
    }, 
    "8861938": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "HL.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "MS - Homepage Testing", 
      "variation_ids": [
        "8893772", 
        "8860906"
      ]
    }, 
    "9215106": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.helpfordepression.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "HFD", 
      "variation_ids": [
        "9206143", 
        "9213092"
      ]
    }, 
    "9642086": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/adamcontent/asthma"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - navigator test licensed v1", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "9628499", 
        "9641298"
      ]
    }, 
    "10212781": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/insomnia"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#ad-anchor > div:eq(2) > a:eq(0) > img:eq(0)": "MS clicks"
      }, 
      "ignore": 90, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "ss - test experiment insomnia", 
      "variation_ids": [
        "10349468", 
        "10351369"
      ]
    }, 
    "10247813": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/asthma"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#centerWell > div:eq(1) > div:eq(0) > div:eq(1) > a:eq(0) > div:eq(0)": "BM Try It Now"
      }, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - cc homepage remove ads", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "10265245", 
        "10243881", 
        "10247828", 
        "10265249"
      ]
    }, 
    "10355848": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/insomnia"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "ss - test experiment insomnia", 
      "variation_ids": [
        "10351975", 
        "10370254"
      ]
    }, 
    "10561476": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/asthma"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/diabetes"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/menopause"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/depression"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/crohns-disease"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/insomnia"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/breast-cancer"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/alzheimers-disease"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/osteoarthritis"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/multiple-sclerosis"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_L > a:eq(0) > img:eq(0)": "LB1 CTR", 
        "div#ad-anchor > div:eq(2)": "MR2 CTR", 
        "embed[name='DCF237091679']": "MR1 CTR", 
        "object#idSWFAVX1300833283812 > embed:eq(0)": "WSL CTR"
      }, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - ad variations on cc homepages", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "10574229", 
        "10561477", 
        "10540622", 
        "10565385", 
        "10569877", 
        "10578096", 
        "10565398"
      ]
    }, 
    "10949225": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/adamcontent/"
            }, 
            {
              "match": "substring", 
              "value": "/galecontent/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#page_1": "Body Text", 
        "div#postNav": "Body of Page"
      }, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - navigator test licensed v2", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "10971683", 
        "10949226"
      ]
    }, 
    "11682637": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/asthma"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/diabetes"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/menopause"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/depression"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/crohns-disease"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/insomnia"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/breast-cancer"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/alzheimers-disease"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/osteoarthritis"
            }, 
            {
              "match": "simple", 
              "value": "www.healthline.com/health/multiple-sclerosis"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "events": {
        "div#DFPAD_L > a:eq(0) > img:eq(0)": "LB1 CTR", 
        "div#ad-anchor > div:eq(2)": "MR2 CTR", 
        "embed[name='DCF237091679']": "MR1 CTR", 
        "object#idSWFAVX1300833283812 > embed:eq(0)": "WSL CTR"
      }, 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - ad variations on cc homepages (1)", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "11685834", 
        "11688901", 
        "11698231", 
        "11683430", 
        "11637938", 
        "11682639", 
        "11692279"
      ]
    }, 
    "12037066": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "substring", 
              "value": "/health/menopause"
            }, 
            {
              "match": "substring", 
              "value": "/health/breast-cancer"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "menopause survey callout", 
      "site_catalyst_evar": 1, 
      "variation_ids": [
        "12033211", 
        "12034270"
      ]
    }, 
    "12878322": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health/psoriasis/healthline-interview-caridee-english"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "kw - elijah redirect to survey or email", 
      "variation_ids": [
        "12872344", 
        "12886360"
      ]
    }, 
    "13307929": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/asthma"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "homepage icon", 
      "variation_ids": [
        "13318206", 
        "13307930"
      ]
    }, 
    "13429699": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-video/knee-pain-assessment"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "ss - video assessment", 
      "variation_ids": [
        "13454208", 
        "13423779"
      ]
    }, 
    "13989655": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/diabetes"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "diabetes center", 
      "variation_ids": [
        "14084469", 
        "14084470", 
        "14088809"
      ]
    }, 
    "14521522": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "http://www.healthline.com/health-slideshow/reduce-healthcare-costs#8"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "Test", 
      "variation_ids": [
        "14484594", 
        "14521523"
      ]
    }, 
    "17613016": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "Homepage Test Browser", 
      "variation_ids": [
        "17575741", 
        "17604118"
      ]
    }, 
    "20380790": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.healthline.com/health/diabetes"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "is_site_catalyst_enabled": "disabled", 
      "name": "Diabetes Jumbotron Images", 
      "variation_ids": [
        "20622588", 
        "20622589"
      ]
    }
  }, 
  "id": 3613006, 
  "log_host": "log3", 
  "public_suffixes": {
    "": [
      ""
    ], 
    "healthline.com": [
      "sfc-stage02.healthline.com", 
      "www.healthline.com"
    ], 
    "helpfordepression.com": [
      "www.helpfordepression.com"
    ], 
    "hl.com": [
      "HL.com"
    ], 
    "om": [
      "om"
    ]
  }, 
  "revision": 1386, 
  "variations": {
    "4918044": {
      "name": "Original Page"
    }, 
    "4928013": {
      "code": "$j(\"div#teaserMap\").css({\"visibility\":\"hidden\"});\n\n$j(\"a#teaserMapLink img:eq(0)\").css({\"visibility\":\"hidden\"});\n\n$j(\"a#teaserMapLink\").css({\"visibility\":\"hidden\"});\n\n$j(\"div#teaserMap\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 247px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span>\\n<span style=\\\"color: #cb4021;\\\"><span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\"><br>Find possible cause of:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=bad%20breath\\\">Bad Breath</a></li>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=mouth%20pain\\\">Mouth Pain</a></li>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=fluttering%20heart\\\">Fluttering Heart</a></li>\\n</ul>\\n</span>\\n<br><img src=\\\"https://cdn.optimizely.com/img/3613006/72946fd0d66a4cf0a5b50a7f8aef47a8.png\\\" style=\\\"position: relative; z-index: 2147483645; left: 19px; top: -21px;\\\"><br></span></div>\\n\\n <div style=\\\"width:280px; height:335px; margin:0 0 10px 0; overflow:hidden; border:2px solid #d5d5d5; background:#f7f7f7;\\\" id=\\\"teaserMap\\\">\\n                  <span style=\\\"color:#7eabc2; font-size:20px; font-weight:bolder; float:left; margin:0 0 0 10px; padding:0; \\\">Map View</span>\\n                  <a id=\\\"teaserMapLink\\\" style=\\\"text-align:center; padding:10px;\\\" href=\\\"/doctors/__dentist_doctors?city=New York&amp;state=NY&amp;tb=1\\\"></a>\\n              </div>\");\n\n$j(\"td.rightCell div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 147px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span>\");\n$j(\"td.rightCell div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 147px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span></div>\");", 
      "name": "Variation #1"
    }, 
    "5628050": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/98381f47830540fb8ee3b5ac890265e1.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/98381f47830540fb8ee3b5ac890265e1.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\"});", 
      "name": "WS Top - Arthritis"
    }, 
    "5633175": {
      "code": "$j(\"div.noText\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9797216681484d4ca3b53835a96e6e91.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/523311b0098a4ff2ac891332105eed3e.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b2ec4283c7194049965e5c93ddf34780.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(6)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(11)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0)\").attr({\"href\":\"/health-slideshow/quit-smoking-timeline\"});", 
      "name": "3 Slideshow Links"
    }, 
    "5636168": {
      "code": "$j(\"div.noText\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9797216681484d4ca3b53835a96e6e91.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/523311b0098a4ff2ac891332105eed3e.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b2ec4283c7194049965e5c93ddf34780.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(6)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(11)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0)\").attr({\"href\":\"/health-slideshow/quit-smoking-timeline\"});", 
      "name": "3 Slideshow Links"
    }, 
    "5647037": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\"});", 
      "name": "WS Top - Smoking"
    }, 
    "5654198": {
      "name": "Original Page"
    }, 
    "5657140": {
      "code": "$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/5cde8895032b455ca33acf6e00fefed9.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9f09ac396a42474bbe30af8ea0ad54f5.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(9)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(14)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":5});", 
      "name": "2 Slideshow Links"
    }, 
    "5657184": {
      "name": "Original Page"
    }, 
    "5669138": {
      "name": "Variation #1"
    }, 
    "5684059": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/0486fbd6be7b41c68a0874be7587d106.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/fibromyalgia\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/fibromyalgia\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/0486fbd6be7b41c68a0874be7587d106.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "WS Top - Fibromyalgia"
    }, 
    "5714173": {
      "name": "Original Page"
    }, 
    "5725040": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");", 
      "name": "WS Top - Depression"
    }, 
    "5751010": {
      "name": "Original Page"
    }, 
    "5755030": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/menopause-perimenopause\"});", 
      "name": "WS Top - Menopause"
    }, 
    "5774098": {
      "code": "$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" />\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) div:eq(0) span:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><span>1</span>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0)\").replaceWith(\"<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><div style=\\\"padding-bottom:8px;\\\">\\n<div class=\\\"pagingdefault float-right\\\" style=\\\"padding-left:10px;\\\">\\n<span>1</span>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">2</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=3&amp;addterm=Depression\\\">3</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=4&amp;addterm=Depression\\\">4</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">Next &gt;</a>\\n                </div><h1 style=\\\"color:#000;font-size:100%;font-weight:normal;\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" style=\\\"display: none; \\\"><b>40</b> possible causes of <span style=\\\"font-weight:bold;\\\">'Depression'</span></h1>\\n\\n              <div id=\\\"filterDiv\\\" class=\\\"filterResults\\\">\\n                    <a id=\\\"filterSettingsLink\\\" href=\\\"javascript:void(0);\\\"></a>\\n                  </div>\\n                </div>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\\n</a>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/6d18b853143e4b75b7e2a91ab75a0444.jpg\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/b1d0a1057b154c97b109969425ed14ed.jpg\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "No image, two lines"
    }, 
    "5777148": {
      "code": "$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" />\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) div:eq(0) span:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><span>1</span>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0)\").replaceWith(\"<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><div style=\\\"padding-bottom:8px;\\\">\\n<div class=\\\"pagingdefault float-right\\\" style=\\\"padding-left:10px;\\\">\\n<span>1</span>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">2</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=3&amp;addterm=Depression\\\">3</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=4&amp;addterm=Depression\\\">4</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">Next &gt;</a>\\n                </div><h1 style=\\\"color:#000;font-size:100%;font-weight:normal;\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" style=\\\"display: none; \\\"><b>40</b> possible causes of <span style=\\\"font-weight:bold;\\\">'Depression'</span></h1>\\n\\n              <div id=\\\"filterDiv\\\" class=\\\"filterResults\\\">\\n                    <a id=\\\"filterSettingsLink\\\" href=\\\"javascript:void(0);\\\"></a>\\n                  </div>\\n                </div>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\\n</a>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/6d18b853143e4b75b7e2a91ab75a0444.jpg\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "No image, one line"
    }, 
    "5785147": {
      "code": "$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" />\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) div:eq(0) span:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><span>1</span>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0)\").replaceWith(\"<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><div style=\\\"padding-bottom:8px;\\\">\\n<div class=\\\"pagingdefault float-right\\\" style=\\\"padding-left:10px;\\\">\\n<span>1</span>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">2</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=3&amp;addterm=Depression\\\">3</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=4&amp;addterm=Depression\\\">4</a>\\n                    <a rel=\\\"nofollow\\\" href=\\\"/symptomsearch?pagenum=2&amp;addterm=Depression\\\">Next &gt;</a>\\n                </div><h1 style=\\\"color:#000;font-size:100%;font-weight:normal;\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" style=\\\"display: none; \\\"><b>40</b> possible causes of <span style=\\\"font-weight:bold;\\\">'Depression'</span></h1>\\n\\n              <div id=\\\"filterDiv\\\" class=\\\"filterResults\\\">\\n                    <a id=\\\"filterSettingsLink\\\" href=\\\"javascript:void(0);\\\"></a>\\n                  </div>\\n                </div>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n<img style=\\\"padding-bottom:10px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\\n</a>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").replaceWith(\"<img style=\\\"padding-bottom: 10px; height: auto; width: auto; \\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":0});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"left\":3, \"top\":118});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"left\":-1, \"top\":-2});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"left\":-1, \"top\":4});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) b:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\"><b>40</b>\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) a:eq(0) img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) img:eq(1)\").replaceWith(\"<img style=\\\"padding: 10px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) h1:eq(0) img:eq(1)\").css({\"display\":\"none\"});", 
      "name": "Ad with image"
    }, 
    "5789108": {
      "name": "Original Page"
    }, 
    "5802081": {
      "code": "$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/5cde8895032b455ca33acf6e00fefed9.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9f09ac396a42474bbe30af8ea0ad54f5.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(9)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(14)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":5});", 
      "name": "2 Slideshow Links"
    }, 
    "5849038": {
      "code": "$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\" />\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) img:eq(0)\").replaceWith(\"<img style=\\\"padding: 10px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\");\n$j(\"div#div-twocol-785-lc div:eq(16) div:eq(48) div:eq(0) img:eq(0)\").replaceWith(\"<img style=\\\"padding-bottom:20px\\\" src=\\\"//cdn.optimizely.com/img/3613006/859f495b35b848e2bf68c4123c9e95a4.jpg\\\">\");", 
      "name": "Variation #4"
    }, 
    "5862015": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10)\").css({\"display\":\"none\"});\n\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"display\":\"none\"});\n$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/275cad81ab8f4db099f4d69ebe6ac878.jpg\\\" />\");", 
      "name": "Variation #1"
    }, 
    "5874031": {
      "name": "Original Page"
    }, 
    "5879022": {
      "name": "Variation #1"
    }, 
    "5885131": {
      "name": "Original Page"
    }, 
    "5885132": {
      "name": "Variation #1"
    }, 
    "5890172": {
      "name": "Original Page"
    }, 
    "5890173": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":68});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "Doc/SSx/TSx"
    }, 
    "5892041": {
      "name": "Variation #1"
    }, 
    "5898026": {
      "name": "Variation #1"
    }, 
    "5901019": {
      "name": "Original Page"
    }, 
    "5902136": {
      "name": "Original Page"
    }, 
    "5902137": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":136});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "Doc/TSx/SSx"
    }, 
    "5902255": {
      "name": "Original Page"
    }, 
    "5902256": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(1) p:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div.noText div.bottom\").css({\"display\":\"none\"});\n$j(\"div.noText div.top\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<div><img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -10px; top: 11px;></div>\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px;\\\">\");\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/128c97d6cb964070a65e300d1c676756.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/90a30d34cdd148a5a72a8ea7434e3718.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/073608193dd24db9874a1b5d5e99cc95.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/8f25f781e2ea4fc0a76e2856c84c2b3e.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/adece9eec7e64760bb03da79ac215da4.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\"style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 1px; \\\">\");\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; \\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<a href=\\\"http://www.healthline.com/directory/symptoms\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/heart-attack\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/10-ways-to-relieve-stress\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");", 
      "name": "Red Call-out"
    }, 
    "5903186": {
      "name": "Original Page"
    }, 
    "5916048": {
      "name": "Original Page"
    }, 
    "5916049": {
      "code": "$j(\"div#clinicalAppCallout\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n \\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\");\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/3921f901e9984fcea1726fd9f77c6e11.jpg\\\" />\");\n$j(\"div#rightRail div:eq(0) a:eq(0)\").attr({\"href\":\"/slide\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/1b1dc0a6ad7d47e8b53c4a7ef669566c.gif\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/7b5434652889413d8af047570d826e9f.gif\\\" />\");\n$j(\"div#rightRail div:eq(4)\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\" style=\\\"\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\" style=\\\"\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\");\n$j(\"div#rightRail div:eq(4) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/08ce01475834406b9a14290a0f15734b.gif\\\" />\");\n$j(\"div#rightRail div:eq(6) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/25d5aa8f46c14dcabc70b7d4f39c0cd9.gif\\\" />\");\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-11, \"top\":11});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-11, \"top\":-11});\n$j(\"div#rightRail div:eq(4) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":-30});\n$j(\"div#rightRail div:eq(6) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":-49});\n$j(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-2, \"top\":-75});\n$j(\"div#rightRail div:eq(0) a:eq(0)\").attr({\"href\":\"/symptomsearch?addterm=Depression\"});\n$j(\"div#rightRail div:eq(4) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#rightRail div:eq(6) a:eq(0)\").attr({\"href\":\"/health-slideshow/faces-of-schizophrenia\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7da155fa407b4f12afec6dccfef68ef5.gif\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/a524e1210dd94ade9fbf40ac9fda3050.gif\"});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "Red Callout"
    }, 
    "5924028": {
      "name": "Original Page"
    }, 
    "5924029": {
      "code": "$j(\"div#teaserMap\").css({\"visibility\":\"hidden\"});\n\n$j(\"a#teaserMapLink img:eq(0)\").css({\"visibility\":\"hidden\"});\n\n$j(\"a#teaserMapLink\").css({\"visibility\":\"hidden\"});\n\n$j(\"div#teaserMap\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 247px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span>\\n<span style=\\\"color: #cb4021;\\\"><span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\"><br>Find possible cause of:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=bad%20breath\\\">Bad Breath</a></li>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=mouth%20pain\\\">Mouth Pain</a></li>\\n<li><a href=\\\"http://www.healthline.com/symptomsearch?addterm=fluttering%20heart\\\">Fluttering Heart</a></li>\\n</ul>\\n</span>\\n<br><img src=\\\"https://cdn.optimizely.com/img/3613006/72946fd0d66a4cf0a5b50a7f8aef47a8.png\\\" style=\\\"position: relative; z-index: 2147483645; left: 19px; top: -21px;\\\"><br></span></div>\\n\\n <div style=\\\"width:280px; height:335px; margin:0 0 10px 0; overflow:hidden; border:2px solid #d5d5d5; background:#f7f7f7;\\\" id=\\\"teaserMap\\\">\\n                  <span style=\\\"color:#7eabc2; font-size:20px; font-weight:bolder; float:left; margin:0 0 0 10px; padding:0; \\\">Map View</span>\\n                  <a id=\\\"teaserMapLink\\\" style=\\\"text-align:center; padding:10px;\\\" href=\\\"/doctors/__dentist_doctors?city=New York&amp;state=NY&amp;tb=1\\\"></a>\\n              </div>\");\n\n$j(\"td.rightCell div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 147px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment:<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span>\");\n$j(\"td.rightCell div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 0px; margin-right: 0px; margin-bottom: 10px; margin-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(213, 213, 213); border-right-color: rgb(213, 213, 213); border-bottom-color: rgb(213, 213, 213); border-left-color: rgb(213, 213, 213); background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(247, 247, 247); width: 309px; height: 147px; background-position: initial initial; background-repeat: initial initial; \\\" id=\\\"teaserMap\\\"><span style=\\\"color: #cb4021;\\\">\\n<span style=\\\"font-size: medium; font-weight: bolder; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">Learn more before your appointment<br><br></span></span>\\n<span style=\\\"color: #3366ff;\\\"><span style=\\\"font-size: medium; float: left; margin: 0pt 0pt 0pt 10px; padding: 0pt;\\\">\\n<ul>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-dentist-questions\\\">5 Questions to Ask Your Dentist</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-prevention\\\">Keeping Your Smile Healthy and Bright</a></li>\\n<li><a href=\\\"http://www.healthline.com/health/dental-oral-health-cavities\\\">What Causes Cavities?</a></li>\\n</ul>\\n</span></span></div>\");", 
      "name": "Variation #1"
    }, 
    "5925328": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(1) p:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div.noText div.bottom\").css({\"display\":\"none\"});\n$j(\"div.noText div.top\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<div><img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -10px; top: 11px;></div>\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px;\\\">\");\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/128c97d6cb964070a65e300d1c676756.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/90a30d34cdd148a5a72a8ea7434e3718.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/073608193dd24db9874a1b5d5e99cc95.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/8f25f781e2ea4fc0a76e2856c84c2b3e.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/adece9eec7e64760bb03da79ac215da4.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\"style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 1px; \\\">\");\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; \\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<a href=\\\"http://www.healthline.com/directory/symptoms\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/heart-attack\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/10-ways-to-relieve-stress\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");", 
      "name": "Red Call-out"
    }, 
    "5931011": {
      "name": "Original Page"
    }, 
    "5934010": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"display\":\"none\"});\n$j(\"div.noText\").css({\"display\":\"none\"});", 
      "name": "No DSA"
    }, 
    "5950058": {
      "code": "$j(\"table.padding tbody:eq(0) tr:eq(1) td:eq(1) a:eq(0) strong:eq(0)\").html(\"What causes bipolar disease?\");\n$j(\"table.padding tbody:eq(0) tr:eq(1) td:eq(1) a:eq(1)\").attr({\"href\":\"http://www.sharecare.com/question/what-is-bipolar-disorder#cmpid=hl00002\"});\n$j(\"table.padding tbody:eq(0) tr:eq(2) td:eq(1) strong:eq(0) a:eq(0)\").html(\"<strong><a class=\\\"bodyText\\\" target=\\\"_blank\\\" href=\\\"http://www.sharecare.com/question/symptoms-of-bipolar-disorder#cmpid=hl00002\\\">What are the symptoms of bipolar disorder? &nbsp; &nbsp;&nbsp;</a>\\n    </strong>\");\n$j(\"table.padding tbody:eq(0) tr:eq(2) td:eq(1) a:eq(2)\").attr({\"href\":\"http://www.sharecare.com/question/symptoms-of-bipolar-disorder#cmpid=hl00002\"});", 
      "name": "Variation #1"
    }, 
    "5950078": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":136});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":0});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-136});", 
      "name": "TSx/Doc/SSx"
    }, 
    "5952006": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10)\").css({\"display\":\"none\"});", 
      "name": "2 DSAs"
    }, 
    "5953059": {
      "name": "Original Page"
    }, 
    "5960033": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"display\":\"none\"});", 
      "name": "1 DSA"
    }, 
    "5975043": {
      "code": "$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <div>&nbsp;</div>\\n  \\n              </div>\\n\\n<div>\\n              <div>&nbsp;</div>\\n  \\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/e0e3eb01166242049950ed1d99ccb520.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(7) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/a271ea1b26c6461286ffd87dafaefa00.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(9)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(14)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":6});\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)\").replaceWith(\"<a href=www.healthline.com/health-slideshow/recognizing-depression-symptoms>\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/e0e3eb01166242049950ed1d99ccb520.jpg\\\" style=\\\"z-index: 2147483645; position: relative; left: 0px; top: 6px; \\\">\\n  \\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(7) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/arthritis-stretching-tips\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/a271ea1b26c6461286ffd87dafaefa00.jpg\\\">\\n\\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});", 
      "name": "2 Slideshow"
    }, 
    "5975065": {
      "name": "Original Page"
    }, 
    "5984010": {
      "name": "Original Page"
    }, 
    "6000013": {
      "name": "Original Page"
    }, 
    "6013189": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":68});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "Doc/SSx/TSx"
    }, 
    "6013190": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":136});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":0});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-136});", 
      "name": "TSx/Doc/SSx"
    }, 
    "6018012": {
      "name": "No Slideshows"
    }, 
    "6018013": {
      "code": "$j(\"div.noText\").replaceWith(\"<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\\n\\n<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\\n\\n<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c0054fbebe1348b590c8d624ae0c2a0d.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(2) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2ef9aef3b905403d9a49ec4b44d32d8d.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(4) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/375e99f9505047ad810aec724fe7d8f2.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(6) a:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(11)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(0) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/recognizing-depression-symptoms\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/c0054fbebe1348b590c8d624ae0c2a0d.jpg\\\">\\n  \\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(2) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/arthritis-stretching-tips\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/2ef9aef3b905403d9a49ec4b44d32d8d.jpg\\\">\\n  \\n\\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(4) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/quit-smoking-timeline\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/375e99f9505047ad810aec724fe7d8f2.jpg\\\">\\n  \\n\\n</a>\");", 
      "name": "3 Slideshows"
    }, 
    "6024043": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":136});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "Doc/TSx/SSx"
    }, 
    "6031110": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(1) p:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div.noText div.bottom\").css({\"display\":\"none\"});\n$j(\"div.noText div.top\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<div><img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -10px; top: 11px;></div>\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px;\\\">\");\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/128c97d6cb964070a65e300d1c676756.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/90a30d34cdd148a5a72a8ea7434e3718.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/073608193dd24db9874a1b5d5e99cc95.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/8f25f781e2ea4fc0a76e2856c84c2b3e.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/adece9eec7e64760bb03da79ac215da4.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\"style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 1px; \\\">\");\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; \\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<a href=\\\"http://www.healthline.com/directory/symptoms\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/heart-attack\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/10-ways-to-relieve-stress\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail a:eq(1) img:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/62fb896084a5425aaacaa48e9dca319b.jpg\\\" />\");\n$j(\"div#rightRail a:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b0d5a93796d14208a42ba5ade16d3308.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail a:eq(1) img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b0d5a93796d14208a42ba5ade16d3308.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/abafc460feca4d8b9fd77ad365136793.jpg\"});\n$j(\"div#rightRail a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail a:eq(1) img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2b0f924eaff94043b4a0ea47555939d5.jpg\\\" />\");\n$j(\"div#rightRail a:eq(2) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/fae1292f43d441ce9c64ea307db2fdef.jpg\"});\n$j(\"div#rightRail a:eq(2) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "No Red Call-out"
    }, 
    "6039045": {
      "code": "$j(\"table.padding tbody:eq(0)\").css({\"display\":\"none\"});", 
      "name": "Q&A Removed"
    }, 
    "6043008": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":0});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":68});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "SSx/TSx/Doc"
    }, 
    "6055017": {
      "code": "$j(\"div.noText\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":0});\n$j(\"div#clinicalAppCallout div:eq(5)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":68});\n$j(\"div#clinicalAppCallout div:eq(10)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":-68});", 
      "name": "SSx/TSx/Doc"
    }, 
    "6059031": {
      "code": "$j(\"div#clinicalAppCallout\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n \\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\");\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/3921f901e9984fcea1726fd9f77c6e11.jpg\\\" />\");\n$j(\"div#rightRail div:eq(0) a:eq(0)\").attr({\"href\":\"/slide\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/1b1dc0a6ad7d47e8b53c4a7ef669566c.gif\"});\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/7b5434652889413d8af047570d826e9f.gif\\\" />\");\n$j(\"div#rightRail div:eq(4)\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\" style=\\\"\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\" style=\\\"\\\">\\n          <div>&nbsp;</div>\\n                \\n              </a>\\n              </div>\");\n$j(\"div#rightRail div:eq(4) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/08ce01475834406b9a14290a0f15734b.gif\\\" />\");\n$j(\"div#rightRail div:eq(6) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/25d5aa8f46c14dcabc70b7d4f39c0cd9.gif\\\" />\");\n$j(\"div#rightRail div:eq(0) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":11});\n$j(\"div#rightRail div:eq(2) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":-11});\n$j(\"div#rightRail div:eq(4) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":-30});\n$j(\"div#rightRail div:eq(6) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-10, \"top\":-49});\n$j(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":-2, \"top\":-75});\n$j(\"div#rightRail div:eq(0) a:eq(0)\").attr({\"href\":\"/symptomsearch?addterm=Depression\"});\n$j(\"div#rightRail div:eq(4) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#rightRail div:eq(6) a:eq(0)\").attr({\"href\":\"/health-slideshow/faces-of-schizophrenia\"});\n$j(\"div#rightRail div:eq(0) a:eq(0)\").attr({\"href\":\"/symptomsearch?addterm=Depression\"});", 
      "name": "No Red Callout"
    }, 
    "6095027": {
      "code": "$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(10) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(1) p:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").css({\"display\":\"none\"});\n$j(\"div.noText div.bottom\").css({\"display\":\"none\"});\n$j(\"div.noText div.top\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<div><img src=\\\"//cdn.optimizely.com/img/3613006/ad46492dd6b745cc9295b058865911e7.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -10px; top: 11px;></div>\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/0b037ef40734453191d6baaf5b4ca040.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px;\\\">\");\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/128c97d6cb964070a65e300d1c676756.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/90a30d34cdd148a5a72a8ea7434e3718.jpg\"});\n$j(\"div#rightRail img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/073608193dd24db9874a1b5d5e99cc95.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/8f25f781e2ea4fc0a76e2856c84c2b3e.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/adece9eec7e64760bb03da79ac215da4.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\"style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" />\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c3e6e46ec9504fd89284b28fb40ed3c9.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 11px; \\\">\");\n$j(\"div#rightRail img:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; top: 1px; \\\">\");\n$j(\"div#rightRail img:eq(1)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/1048e3369f0546898848d2e9df2a4eea.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px; \\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail img:eq(2)\").replaceWith(\"<a href=\\\"http://www.healthline.com/directory/symptoms\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/95d89e8056f14e2a878efe29e7ce6132.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(3)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/heart-attack\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/9c11aa8f1a40403da47f80aaaf4e3a2c.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail img:eq(4)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/10-ways-to-relieve-stress\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/411dcbddaa7b44b9aaeb881184f53069.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\\n</a>\");\n$j(\"div#rightRail a:eq(1) img:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/62fb896084a5425aaacaa48e9dca319b.jpg\\\" />\");\n$j(\"div#rightRail a:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b0d5a93796d14208a42ba5ade16d3308.jpg\\\" />\");\n$j(\"div#rightRail img:eq(1)\").css({\"display\":\"none\"});\n$j(\"div#rightRail a:eq(1) img:eq(0)\").replaceWith(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b0d5a93796d14208a42ba5ade16d3308.jpg\\\" style=\\\"height: auto; width: auto; z-index: 2.14748e+09; position: relative; left: -5px;\\\">\");\n$j(\"div#rightRail a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/abafc460feca4d8b9fd77ad365136793.jpg\"});\n$j(\"div#rightRail a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div#rightRail a:eq(1) img:eq(1)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2b0f924eaff94043b4a0ea47555939d5.jpg\\\" />\");\n$j(\"div#rightRail a:eq(2) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/fae1292f43d441ce9c64ea307db2fdef.jpg\"});\n$j(\"div#rightRail a:eq(2) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "No Red Call-out"
    }, 
    "6127006": {
      "name": "Original Page"
    }, 
    "6497011": {
      "name": "Original Page"
    }, 
    "6983177": {
      "name": "Original Page"
    }, 
    "6983255": {
      "name": "Original Page"
    }, 
    "6983256": {
      "code": "$(\"p#newsbubble span:eq(0)\").css({\"display\":\"none\"});\n$(\"p#newsbubble\").css({\"display\":\"none\"});\n$(\"div#signupBody div:eq(0)\").css({\"display\":\"none\"});\n$(\"div#rightRail div.borderInside\").replaceWith(\"<div class=\\\"borderInside\\\" style=\\\"align:left\\\"><span style=\\\"align:left; font-weight:bold\\\">Get updates for Fibromyalgia</span>\\n        <div id=\\\"signupBody\\\" class=\\\"reg-enterEmail\\\" style=\\\"position: relative; margin-top: 50px; \\\">\\n          <div style=\\\"position: absolute; top: -20px; left: 30px; background-image: url(http://www.healthline.com/images/sprite-registration.png); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; width: 18px; height: 8px; display: none; background-position: -1588px -20px; background-repeat: no-repeat no-repeat; \\\"></div>\\n          <form action=\\\"\\\" onsubmit=\\\"HL.registration.signup(this);return false;\\\">\\n                <label>Email Address:</label>\\n                <input type=\\\"text\\\" id=\\\"email\\\" name=\\\"email\\\" value=\\\"\\\" class=\\\"email required inputShadow\\\">\\n                <button type=\\\"submit\\\" class=\\\"spr-signupnow\\\">Sign Up Now</button>\\n                <input type=\\\"hidden\\\" name=\\\"k1\\\" value=\\\"Fibromyalgia\\\">\\n              </form>\\n\\n              <div class=\\\"or-divider\\\"><span>Or</span></div>\\n              <div class=\\\"reg-disclaimer\\\" style=\\\"margin-top:10px;color:#069\\\"><a style=\\\"float:right\\\" href=\\\"/privacypolicy.jsp\\\">Privacy Policy</a><span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span></div>\\n            </div>\\n      </div>\");\n$(\"div#rightRail div.borderInside\").replaceWith(\"<div class=\\\"borderInside\\\" style=\\\"text-align:left\\\"><span style=\\\"font-weight:bold; color:#444\\\">Get updates for Fibromyalgia</span>\\n        <div id=\\\"signupBody\\\" class=\\\"reg-enterEmail\\\" style=\\\"position: relative; margin-top: 20px; \\\">\\n          <div style=\\\"position: absolute; top: -20px; left: 30px; background-image: url(http://www.healthline.com/images/sprite-registration.png); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; width: 18px; height: 8px; display: none; background-position: -1588px -20px; background-repeat: no-repeat no-repeat; \\\"></div>\\n          <form action=\\\"\\\" onsubmit=\\\"HL.registration.signup(this);return false;\\\">\\n                <label style=\\\"font-size:12px;\\\">Email address:</label>\\n                <input type=\\\"text\\\" id=\\\"email\\\" name=\\\"email\\\" value=\\\"\\\" class=\\\"email required inputShadow\\\">\\n                <button type=\\\"submit\\\" class=\\\"spr-signupnow\\\">Sign Up Now</button>\\n                <input type=\\\"hidden\\\" name=\\\"k1\\\" value=\\\"Fibromyalgia\\\">\\n              </form>\\n\\n              <div class=\\\"or-divider\\\"><span>Or</span></div>\\n              <div class=\\\"reg-disclaimer\\\" style=\\\"margin-top:10px;color:#069\\\"><a style=\\\"float:right\\\" href=\\\"/privacypolicy.jsp\\\">Privacy Policy</a><span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span></div>\\n            </div>\\n      </div>\");\n$(\"div#rightRail div.borderInside span:eq(0)\").html(\"Get updates for Smoking\");", 
      "name": "Variation #1"
    }, 
    "6987143": {
      "code": "$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height:250px;width:660px;\\\">\\n<div id=\\\"edit-block-1\\\">\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &lt;a href=\\\"/human-body-maps/\\\"&gt;\\n        &lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&gt;\\n       &lt;/a&gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-0\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/bone-health?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-health.jpg\\\" alt=\\\"Build Stronger Bones Now. Lower your risk for osteoporosis later.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/bone-metastases?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-metastases.jpg\\\" alt=\\\"Cancer, Metastases, and Bone Health - The skeleton is a common target for the spread of cancer. Learn everything you need to know about metastases, from prevention to pain management.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "Rec in First, BM Second"
    }, 
    "6987207": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/0486fbd6be7b41c68a0874be7587d106.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/fibromyalgia\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/fibromyalgia\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/0486fbd6be7b41c68a0874be7587d106.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});", 
      "name": "WS Top - Fibromyalgia"
    }, 
    "6993198": {
      "name": "Original Page"
    }, 
    "6993200": {
      "name": "Original Page"
    }, 
    "6999300": {
      "name": "Original Page"
    }, 
    "7000225": {
      "name": "Original Page"
    }, 
    "7001078": {
      "name": "Original Page"
    }, 
    "7001079": {
      "code": "CE2.set(1, 'VariationOne');\n\n \n$(\"div#hlBody\")\n$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 1; \\\">\\n<div id=\\\"edit-block-1\\\">\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &lt;a href=\\\"/human-body-maps/\\\"&gt;\\n        &lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&gt;\\n       &lt;/a&gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-0\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display: none; \\\">\\n  <a href=\\\"/health/bone-health?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-health.jpg\\\" alt=\\\"Build Stronger Bones Now. Lower your risk for osteoporosis later.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display: block; \\\">\\n  <a href=\\\"/health/bone-metastases?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-metastases.jpg\\\" alt=\\\"Cancer, Metastases, and Bone Health - The skeleton is a common target for the spread of cancer. Learn everything you need to know about metastases, from prevention to pain management.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width: 20px; color: rgb(255, 255, 255); background-color: rgb(117, 116, 114); \\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width: 20px; color: rgb(117, 116, 114); background-color: rgb(255, 255, 255); \\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "Variation #1"
    }, 
    "7003125": {
      "name": "Original Page"
    }, 
    "7008131": {
      "code": "$(\"p#newsbubble span:eq(0)\").html(\"Get the latest news for Depression\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label style=\\\"color:#444\\\">Email address:</label>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").html(\"Email address (we won't spam you!)\");\n$(\"p#newsbubble span:eq(0)\").html(\"Get updates for Depression\");", 
      "name": "Variation #2"
    }, 
    "7009223": {
      "code": "$(\"div.tableofcontents\").replaceWith(\"<div class=\\\"tableofcontents\\\" style=\\\"width:170px;overflow:hidden;float:right;border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-right:2px solid #fff;width:174px;padding-bottom:10px;padding-left:10px;margin-bottom:15px;\\\">\\n    <a href=\\\"/goldcontent/amoxicillin#H1\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-is-this-medicine')\\\">What is...?</a>\\n  <a href=\\\"health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">Side Effects (14)</a>\\n<a href=\\\"/goldcontent/amoxicillin#H2\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-tell-my-health-care-provider-before-I-take-this-medicine')\\\">Most Important</a>\\n<a href=\\\"/goldcontent/amoxicillin#H3\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/How-should-I-use-this-medicine')\\\">How to Take</a>\\n<a href=\\\"/goldcontent/amoxicillin#H4\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-if-I-miss-a-dose')\\\">Missed Dose</a>\\n<a href=\\\"/goldcontent/amoxicillin#H5\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-may-interact-with-this-medicine')\\\">Interactions</a>\\n<a href=\\\"/goldcontent/amoxicillin#H6\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-watch-for-while-using-this-medicine')\\\">Watch For</a>\\n<a href=\\\"/goldcontent/amoxicillin/2#H8\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/Where-should-I-keep-my-medicine')\\\">Where to Store</a>\\n</div>\");\n$(\"div.tableofcontents a:eq(2)\").css({\"display\":\"none\"});\n$(\"div#div-threecol-mc h2:eq(6)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\" />\");\n$(\"div#div-threecol-mc h2:eq(6)\").replaceWith(\"<h2><img src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\"> </h2>\");\n$(\"div#div-threecol-mc h2:eq(6) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">\\n<img style=\\\"padding: 10px 0px 20px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\">\\n</a>\");\n$(\"div.tableofcontents a:eq(1)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">Side Effects (14)</a>\");\n$(\"div#div-threecol-mc h2:eq(6) a:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshows/14-side-effects-amoxicillin-amoxil-trimox\\\"><img style=\\\"padding: 10px 0px 20px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\">\\n</a>\");\n$(\"div#div-threecol-mc h2:eq(6) a:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\"});", 
      "name": "Variation #1"
    }, 
    "7010207": {
      "code": "$(\"div#signupBody form:eq(0)\").css({\"display\":\"none\"});\n$(\"div#signupBody div.or-divider\").css({\"display\":\"none\"});\n$(\"span#loginFBnewsletter img.spr-facebookicon\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/563474c4d9dd4e4d9c9885be3a6c9494.png)\"});\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\" style=\\\"width:30px; height:30px; background-image: url(http://cdn.optimizely.com/img/3613006/563474c4d9dd4e4d9c9885be3a6c9494.png); \\\"><span style=\\\"font-size:16px;\\\">Sign up with Facebook</span></span>\");\n$(\"span#loginFBnewsletter img.spr-facebookicon\").replaceWith(\"<img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\" style=\\\"width:30px; height:30px; background-image: url(http://cdn.optimizely.com/img/3613006/563474c4d9dd4e4d9c9885be3a6c9494.png); \\\">\");\n$(\"span#loginFBnewsletter img.spr-facebookicon\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/f0bbd021d26e4c9dae263cb473374e63.png)\"});\n$(\"span#loginFBnewsletter img.spr-facebookicon\").replaceWith(\"<img src=\\\"/images/clear.gif\\\" alt=\\\"\\\" style=\\\"width: 30px; height: 30px; background-image: url(http://cdn.optimizely.com/img/3613006/f0bbd021d26e4c9dae263cb473374e63.png); \\\">\");\n$(\"span#loginFBnewsletter span:eq(0)\").replaceWith(\"<span style=\\\"font-size:16px;font-weight:bold;\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody div.reg-disclaimer\").replaceWith(\"<div class=\\\"reg-disclaimer\\\" style=\\\"margin-top:10px;color:#069\\\"><span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img src=\\\"/images/clear.gif\\\" alt=\\\"\\\" style=\\\"width: 30px; height: 30px; background-image: url(http://cdn.optimizely.com/img/3613006/f0bbd021d26e4c9dae263cb473374e63.png); \\\"><span style=\\\"font-size:16px;font-weight:bold;\\\">Sign up with Facebook</span></span><a style=\\\"float:right\\\" href=\\\"/privacypolicy.jsp\\\">Privacy Policy</a></div>\");\n$(\"span#loginFBnewsletter span:eq(0)\").css({\"position\":\"relative\", \"left\":11, \"top\":-9});\n$(\"div#signupBody div.reg-disclaimer a:eq(0)\").css({\"position\":\"relative\", \"left\":-145, \"top\":-8});\n$(\"div#signupBody div.reg-disclaimer a:eq(0)\").css({\"display\":\"none\"});", 
      "name": "Variation #2"
    }, 
    "7019171": {
      "name": "Original Page"
    }, 
    "7019177": {
      "code": "$(\"p#newsbubble span:eq(0)\").css({\"display\":\"none\"});\n$(\"p#newsbubble\").css({\"display\":\"none\"});\n$(\"div#signupBody div:eq(0)\").css({\"display\":\"none\"});\n$(\"div#rightRail div.borderInside\").replaceWith(\"<div class=\\\"borderInside\\\" style=\\\"align:left\\\"><span style=\\\"align:left; font-weight:bold\\\">Get updates for Fibromyalgia</span>\\n        <div id=\\\"signupBody\\\" class=\\\"reg-enterEmail\\\" style=\\\"position: relative; margin-top: 50px; \\\">\\n          <div style=\\\"position: absolute; top: -20px; left: 30px; background-image: url(http://www.healthline.com/images/sprite-registration.png); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; width: 18px; height: 8px; display: none; background-position: -1588px -20px; background-repeat: no-repeat no-repeat; \\\"></div>\\n          <form action=\\\"\\\" onsubmit=\\\"HL.registration.signup(this);return false;\\\">\\n                <label>Email Address:</label>\\n                <input type=\\\"text\\\" id=\\\"email\\\" name=\\\"email\\\" value=\\\"\\\" class=\\\"email required inputShadow\\\">\\n                <button type=\\\"submit\\\" class=\\\"spr-signupnow\\\">Sign Up Now</button>\\n                <input type=\\\"hidden\\\" name=\\\"k1\\\" value=\\\"Fibromyalgia\\\">\\n              </form>\\n\\n              <div class=\\\"or-divider\\\"><span>Or</span></div>\\n              <div class=\\\"reg-disclaimer\\\" style=\\\"margin-top:10px;color:#069\\\"><a style=\\\"float:right\\\" href=\\\"/privacypolicy.jsp\\\">Privacy Policy</a><span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span></div>\\n            </div>\\n      </div>\");\n$(\"div#rightRail div.borderInside\").replaceWith(\"<div class=\\\"borderInside\\\" style=\\\"text-align:left\\\"><span style=\\\"font-weight:bold; color:#444\\\">Get updates for Fibromyalgia</span>\\n        <div id=\\\"signupBody\\\" class=\\\"reg-enterEmail\\\" style=\\\"position: relative; margin-top: 20px; \\\">\\n          <div style=\\\"position: absolute; top: -20px; left: 30px; background-image: url(http://www.healthline.com/images/sprite-registration.png); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; width: 18px; height: 8px; display: none; background-position: -1588px -20px; background-repeat: no-repeat no-repeat; \\\"></div>\\n          <form action=\\\"\\\" onsubmit=\\\"HL.registration.signup(this);return false;\\\">\\n                <label style=\\\"font-size:12px;\\\">Email address:</label>\\n                <input type=\\\"text\\\" id=\\\"email\\\" name=\\\"email\\\" value=\\\"\\\" class=\\\"email required inputShadow\\\">\\n                <button type=\\\"submit\\\" class=\\\"spr-signupnow\\\">Sign Up Now</button>\\n                <input type=\\\"hidden\\\" name=\\\"k1\\\" value=\\\"Fibromyalgia\\\">\\n              </form>\\n\\n              <div class=\\\"or-divider\\\"><span>Or</span></div>\\n              <div class=\\\"reg-disclaimer\\\" style=\\\"margin-top:10px;color:#069\\\"><a style=\\\"float:right\\\" href=\\\"/privacypolicy.jsp\\\">Privacy Policy</a><span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span></div>\\n            </div>\\n      </div>\");", 
      "name": "Variation #1"
    }, 
    "7019178": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/98381f47830540fb8ee3b5ac890265e1.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/98381f47830540fb8ee3b5ac890265e1.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\"});", 
      "name": "WS Top - Arthritis"
    }, 
    "7048156": {
      "name": "Variation #1"
    }, 
    "7050158": {
      "code": "$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\"});\n$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#clinicalAppCallout div:eq(10)\").css({\"position\":\"relative\", \"left\":0, \"top\":-68});\n$(\"div#clinicalAppCallout div:eq(5)\").css({\"position\":\"relative\", \"left\":0, \"top\":68});\n$(\"div#clinicalAppCallout div:eq(5)\").replaceWith(\"<div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 68px; \\\">\\n          <a href=\\\"/recipe-search\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find food and nutrition</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "Find food and nutrition in 3rd spot"
    }, 
    "7053099": {
      "code": "$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)\").replaceWith(\"<div style=\\\"float:right;margin-right:0px;background:url( /images/ts/doctor_search_background.v1.20110513172101.jpg ) top left no-repeat;width:212px;height:185px;\\\">\\n  \\n</div>\");\n$\n$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/96c1ba6f6111486bb1711c79de673958.png)\"});", 
      "name": "Recipe Search Box"
    }, 
    "7054066": {
      "name": "Original Page"
    }, 
    "7054067": {
      "code": "$j(\"div.noText\").replaceWith(\"<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\\n\\n<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\\n\\n<div>\\n\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/c0054fbebe1348b590c8d624ae0c2a0d.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(2) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2ef9aef3b905403d9a49ec4b44d32d8d.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(4) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/375e99f9505047ad810aec724fe7d8f2.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(6) a:eq(0)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(11)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(0) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/recognizing-depression-symptoms\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/c0054fbebe1348b590c8d624ae0c2a0d.jpg\\\">\\n  \\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(2) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/arthritis-stretching-tips\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/2ef9aef3b905403d9a49ec4b44d32d8d.jpg\\\">\\n  \\n\\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(4) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/quit-smoking-timeline\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/375e99f9505047ad810aec724fe7d8f2.jpg\\\">\\n  \\n\\n</a>\");", 
      "name": "3 Slideshows"
    }, 
    "7061189": {
      "code": "$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label>Email address:</label>\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold;\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");", 
      "name": "Variation #1"
    }, 
    "7064144": {
      "code": "$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/5cde8895032b455ca33acf6e00fefed9.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9f09ac396a42474bbe30af8ea0ad54f5.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(9)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(14)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(7) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":5});", 
      "name": "2 Slideshow Links"
    }, 
    "7064146": {
      "code": "$j(\"div.noText\").replaceWith(\"<div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n\\n<div>\\n              <div>&nbsp;</div>\\n  \\n              </div>\\n\\n<div>\\n              <div>&nbsp;</div>\\n  \\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/e0e3eb01166242049950ed1d99ccb520.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(7) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/a271ea1b26c6461286ffd87dafaefa00.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(9)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(14)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\", \"left\":0, \"top\":6});\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) img:eq(0)\").replaceWith(\"<a href=www.healthline.com/health-slideshow/recognizing-depression-symptoms>\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/e0e3eb01166242049950ed1d99ccb520.jpg\\\" style=\\\"z-index: 2147483645; position: relative; left: 0px; top: 6px; \\\">\\n  \\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(7) div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"/health-slideshow/arthritis-stretching-tips\\\">\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/a271ea1b26c6461286ffd87dafaefa00.jpg\\\">\\n\\n</a>\");\n$j(\"div#clinicalAppCallout div:eq(5) div:eq(0) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});", 
      "name": "2 Slideshow"
    }, 
    "7064147": {
      "name": "No Slideshows"
    }, 
    "7065264": {
      "name": "Original Page"
    }, 
    "7065265": {
      "code": "$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 1; \\\">\\n<div id=\\\"edit-block-1\\\" style=\\\"display:none;\\\">\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &lt;a href=\\\"/human-body-maps/\\\"&gt;\\n        &lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&gt;\\n       &lt;/a&gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-0\\\">\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/bone-health?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-health.jpg\\\" alt=\\\"Build Stronger Bones Now. Lower your risk for osteoporosis later.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/bone-metastases?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_bone-metastases.jpg\\\" alt=\\\"Cancer, Metastases, and Bone Health - The skeleton is a common target for the spread of cancer. Learn everything you need to know about metastases, from prevention to pain management.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "Recipes in Slot 1"
    }, 
    "7079083": {
      "name": "Original Page"
    }, 
    "7082226": {
      "name": "Original Page"
    }, 
    "7082270": {
      "code": "$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label>Email address:</label>\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold;\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").html(\"Email address (we won't spam you!)\");", 
      "name": "Variation #2"
    }, 
    "7082331": {
      "code": "$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 1; \\\">\\n<div id=\\\"edit-block-1\\\" style=\\\"display:none;\\\">\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &lt;a href=\\\"/human-body-maps/\\\"&gt;\\n        &lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&gt;\\n       &lt;/a&gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/advancing-ms?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_ms-tysabri.jpg\\\" alt=\\\"Advancing MS: Know Your Options - Understanding the progression of MS will help you better manage the disease. Learn how to assess symptoms and find the best treatment plan for you.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-0\\\" >\\n  <a href=\\\"/health/everyday-fitness?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_everyday-fitness.jpg\\\" alt=\\\"Everyday Fitness. Did you know that you could lose up to four pounds a year by laughing more? Read how.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "fitness, bm, recipe"
    }, 
    "7085302": {
      "code": "$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 1; \\\">\\n<div id=\\\"edit-block-0\\\" >\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &amp;lt;a href=\\\"/human-body-maps/\\\"&amp;gt;\\n        &amp;lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&amp;gt;\\n       &amp;lt;/a&amp;gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/advancing-ms?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_ms-tysabri.jpg\\\" alt=\\\"Advancing MS: Know Your Options - Understanding the progression of MS will help you better manage the disease. Learn how to assess symptoms and find the best treatment plan for you.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-1\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/everyday-fitness?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_everyday-fitness.jpg\\\" alt=\\\"Everyday Fitness. Did you know that you could lose up to four pounds a year by laughing more? Read how.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "bm. fitness, recipe"
    }, 
    "7089254": {
      "code": "$(\"p#newsbubble span:eq(0)\").html(\"Get the latest news for Depression\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label style=\\\"color:#444\\\">Email address:</label>\");\n$(\"p#newsbubble span:eq(0)\").html(\"Get updates for Depression\");", 
      "name": "Variation #1"
    }, 
    "7089271": {
      "code": "$(\"div.tableofcontents\").replaceWith(\"<div class=\\\"tableofcontents\\\" style=\\\"width:170px;overflow:hidden;float:right;border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-right:2px solid #fff;width:174px;padding-bottom:10px;padding-left:10px;margin-bottom:15px;\\\">\\n    <a href=\\\"/goldcontent/amoxicillin#H1\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-is-this-medicine')\\\">What is...?</a>\\n  <a href=\\\"health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">Side Effects (14)</a>\\n<a href=\\\"/goldcontent/amoxicillin#H2\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-tell-my-health-care-provider-before-I-take-this-medicine')\\\">Most Important</a>\\n<a href=\\\"/goldcontent/amoxicillin#H3\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/How-should-I-use-this-medicine')\\\">How to Take</a>\\n<a href=\\\"/goldcontent/amoxicillin#H4\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-if-I-miss-a-dose')\\\">Missed Dose</a>\\n<a href=\\\"/goldcontent/amoxicillin#H5\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-may-interact-with-this-medicine')\\\">Interactions</a>\\n<a href=\\\"/goldcontent/amoxicillin#H6\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-watch-for-while-using-this-medicine')\\\">Watch For</a>\\n<a href=\\\"/goldcontent/amoxicillin/2#H8\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/Where-should-I-keep-my-medicine')\\\">Where to Store</a>\\n</div>\");\n$(\"div.tableofcontents a:eq(2)\").css({\"display\":\"none\"});\n$(\"div#div-threecol-mc h2:eq(6)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\" />\");\n$(\"div#div-threecol-mc h2:eq(6)\").replaceWith(\"<h2><img src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\"> </h2>\");\n$(\"div#div-threecol-mc h2:eq(6) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">\\n<img style=\\\"padding: 10px 0px 20px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/624b17c9c98b4ca68934101b422e0450.jpg\\\">\\n</a>\");\n$(\"dl#accordion-menu\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/dc9f67e37d794a1893738cce065c9d04.jpg\\\" />\");\n$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"dl#accordion-menu\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">\\n<img style=\\\"padding: 15px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/dc9f67e37d794a1893738cce065c9d04.jpg\\\">\\n</a>\");\n$(\"div#div-threecol-mc h2:eq(6) a:eq(0) img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.tableofcontents a:eq(1)\").replaceWith(\"<a href=\\\"www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\">Side Effects (14)</a>\");\n$(\"div.wrapper-980 div:eq(21) a:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\\\"><img style=\\\"padding: 15px 0px\\\" src=\\\"//cdn.optimizely.com/img/3613006/dc9f67e37d794a1893738cce065c9d04.jpg\\\">\\n</a>\");\n$(\"div.wrapper-980 div:eq(21) a:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\"});\n$(\"div.tableofcontents a:eq(1)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\"});", 
      "name": "Variation #2"
    }, 
    "7099129": {
      "code": "$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\"});\n$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#clinicalAppCallout div:eq(10)\").css({\"position\":\"relative\", \"left\":0, \"top\":-68});\n$(\"div#clinicalAppCallout div:eq(5)\").css({\"position\":\"relative\", \"left\":0, \"top\":68});\n$(\"div#clinicalAppCallout div:eq(5)\").replaceWith(\"<div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 68px; \\\">\\n          <a href=\\\"/doctors/diabetes___doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find recipes</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "Find recipes in 3rd spot"
    }, 
    "7104168": {
      "code": "$(\"div#signupBody div.or-divider\").css({\"display\":\"none\"});\n$(\"span#loginFBnewsletter\").css({\"display\":\"none\"});\n$(\"div#signupBody div.reg-disclaimer a:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-28});", 
      "name": "Variation #1"
    }, 
    "7105279": {
      "name": "Original Page"
    }, 
    "7108246": {
      "code": "$(\"ul#-hhs-serp-sa li:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/14-side-effects-amoxicillin-amoxil-trimox\"});\n$(\"ul#-hhs-serp-sa li:eq(0) a:eq(0)\").html(\"Side Effects (14)\");\n$(\"ul#-hhs-serp-sa li:eq(4)\").css({\"display\":\"none\"});\n$(\"ul#-hhs-serp-sa li:eq(3)\").css({\"visibility\":\"hidden\"});", 
      "name": "Variation #1"
    }, 
    "7114245": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");", 
      "name": "WS Top - Depression"
    }, 
    "7116105": {
      "code": "$j(\"div.noText\").replaceWith(\"<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\\n\\n<div>\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n\\n              </a>\\n              </div>\");\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/9797216681484d4ca3b53835a96e6e91.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/523311b0098a4ff2ac891332105eed3e.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0) div:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/b2ec4283c7194049965e5c93ddf34780.jpg\\\" />\");\n$j(\"div#clinicalAppCallout div:eq(6)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(11)\").css({\"display\":\"none\"});\n$j(\"div#clinicalAppCallout div:eq(2) a:eq(0)\").attr({\"href\":\"/health-slideshow/arthritis-stretching-tips\"});\n$j(\"div#clinicalAppCallout div:eq(0) a:eq(0)\").attr({\"href\":\"/health-slideshow/recognizing-depression-symptoms\"});\n$j(\"div#clinicalAppCallout div:eq(4) a:eq(0)\").attr({\"href\":\"/health-slideshow/quit-smoking-timeline\"});", 
      "name": "3 Slideshow Links"
    }, 
    "7116212": {
      "code": "$(\"div#rightRail div.borderWhiteBgTanShadow\").replaceWith(\"<div id=\\\"clinicalAppCallout\\\">\\n    <div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n            <div class=\\\"box button noText\\\">\\n          <a href=\\\"/doctors/diabetes___doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n</div>\\n          </div>\\n          </a>\\n        </div>\\n        <div class=\\\"box button \\\">\\n          <a href=\\\"/treatments/diabetes__\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n              <p>for Diabetes</p></div>\\n          </div>\\n          </a>\\n        </div>\\n        </div>\");\n$(\"div#clinicalAppCallout div:eq(5) a:eq(0)\").replaceWith(\"<a href=\\\"/doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n</div>\\n          </div>\\n          </a>\");\n$(\"div#clinicalAppCallout div:eq(10)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/treatments\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n</div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "dsa callouts"
    }, 
    "7127183": {
      "code": "$(\"div.div-twocol-lc div:eq(0) div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n                        <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 1; \\\">\\n<div id=\\\"edit-block-1\\\" style=\\\"display:none;\\\">\\n  \\n\\n    <embed width=\\\"660\\\" height=\\\"250\\\" src=\\\"/corporate/images/homepage/feature_bodymaps.swf\\\" quality=\\\"high\\\" pluginspage=\\\"http://www.adobe.com/go/getflashplayer\\\" play=\\\"true\\\" loop=\\\"false\\\" scale=\\\"showall\\\" wmode=\\\"transparent\\\" devicefont=\\\"false\\\" allowfullscreen=\\\"false\\\" allowscriptaccess=\\\"sameDomain\\\" type=\\\"application/x-shockwave-flash\\\"> \\n   \\n    <noscript>\\n       &lt;a href=\\\"/human-body-maps/\\\"&gt;\\n        &lt;img src=\\\"/corporate/images/homepage/feature_bodymaps.jpg\\\" alt=\\\"bodymaps\\\" border=\\\"0\\\" width=\\\"660\\\" height=\\\"250\\\"/&gt;\\n       &lt;/a&gt;\\n    </noscript>\\n</div>\\n<div id=\\\"edit-block-0\\\" >\\n  <a href=\\\"/recipe-search?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feature_recipes_foodily_laptop.jpg\\\" alt=\\\"Find Recipes Online. Browse, compare, and share your favorites from the world's largest recipe network.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-3\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/advancing-ms?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_ms-tysabri.jpg\\\" alt=\\\"Advancing MS: Know Your Options - Understanding the progression of MS will help you better manage the disease. Learn how to assess symptoms and find the best treatment plan for you.\\\" border=\\\"0\\\"></a></div>\\n<div id=\\\"edit-block-2\\\" style=\\\"display:none;\\\">\\n  <a href=\\\"/health/everyday-fitness?utm_medium=hptron\\\"><img src=\\\"/corporate/images/homepage/feat_everyday-fitness.jpg\\\" alt=\\\"Everyday Fitness. Did you know that you could lose up to four pounds a year by laughing more? Read how.\\\" border=\\\"0\\\"></a></div>\\n</div>\\n<div class=\\\"nav_block_wrapper\\\">\\n<div class=\\\"nav_button\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"clickPause\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickPause(this)\\\" style=\\\"width:55px;background:#fff;color:#757472;\\\"><div style=\\\"padding-top:3px;\\\">PAUSE</div></div>\\n<div id=\\\"clickGo\\\" class=\\\"nav_button_body\\\" onclick=\\\"hl_edit_block_loop.clickGo(this)\\\" style=\\\"width:55px;display:none;background:#757472;color:#fff;\\\"><div style=\\\"padding-top:3px;\\\">PLAY</div></div>\\n</div></div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_3\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(3)\\\">\\n<div style=\\\"padding-top:3px;\\\">4</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_2\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(2)\\\">\\n<div style=\\\"padding-top:3px;\\\">3</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_1\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(1)\\\">\\n<div style=\\\"padding-top:3px;\\\">2</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n<div class=\\\"nav_button\\\" style=\\\"width:24px;\\\">\\n<div class=\\\"nav_boxShadow\\\"><div class=\\\"nav_boxBorder\\\">\\n<div id=\\\"nav_button_0\\\" class=\\\"nav_button_body\\\" style=\\\"width:20px;color:#fff;background-color:#757472;\\\" onclick=\\\"hl_edit_block_loop.clickJumpTo(0)\\\">\\n<div style=\\\"padding-top:3px;\\\">1</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div>\\n</div></div>\");", 
      "name": "recipe, bm,fitness"
    }, 
    "7127273": {
      "name": "Original Page"
    }, 
    "7127274": {
      "code": "$(\"div#rightRail div.borderWhiteBgTanShadow\").replaceWith(\"<div id=\\\"clinicalAppCallout\\\">\\n    <div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n            <div class=\\\"box button noText\\\">\\n          <a href=\\\"/doctors/diabetes___doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n</div>\\n          </div>\\n          </a>\\n        </div>\\n        <div class=\\\"box button \\\">\\n          <a href=\\\"/treatments/diabetes__\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n              <p>for Diabetes</p></div>\\n          </div>\\n          </a>\\n        </div>\\n        </div>\");\n$(\"div#clinicalAppCallout div:eq(5) a:eq(0)\").replaceWith(\"<a href=\\\"/doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n</div>\\n          </div>\\n          </a>\");\n$(\"div#clinicalAppCallout div:eq(10)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/treatments\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n</div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "dsa callouts"
    }, 
    "7132015": {
      "name": "Variation #1"
    }, 
    "7137358": {
      "name": "Original Page"
    }, 
    "7138244": {
      "code": "CE2.set(1, 'house ad up');\n$(\"div.div-twocol-rc div:eq(18) div:eq(0)\").css({\"position\":\"relative\", \"left\":0, \"top\":-548});\n$(\"div.div-twocol-rc div:eq(0)\").css({\"position\":\"relative\", \"left\":0, \"top\":530});\n\n\n$(\"div.adBox-mr\").css({\"position\":\"relative\", \"left\":0, \"top\":-17});", 
      "name": "move house ad up"
    }, 
    "7140311": {
      "code": "$(\"li.map a:eq(0)\").css({\"display\":\"none\"});\n$(\"li.filter a:eq(0)\").css({\"display\":\"none\"});\n$(\"a#dxs-compare\").css({\"display\":\"none\"});\n$(\"ul.actions\").css({\"display\":\"none\"});", 
      "name": "Only Show Callout"
    }, 
    "7142001": {
      "name": "Original Page"
    }, 
    "7144137": {
      "name": "Original Page"
    }, 
    "7147125": {
      "name": "Original Page"
    }, 
    "7151054": {
      "name": "Original Page"
    }, 
    "7162108": {
      "name": "Original Page"
    }, 
    "7168042": {
      "code": "$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)\").replaceWith(\"<div style=\\\"float:right;margin-right:0px;background:url( /images/ts/doctor_search_background.v1.20110513172101.jpg ) top left no-repeat;width:212px;height:185px;\\\">\\n  \\n</div>\");\n$\n\n\n$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0)\").replaceWith(\"<div style=\\\"float: right; margin-right: 0px; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial; width: 212px; height: 185px; background-image: url(http://cdn.optimizely.com/img/3613006/96c1ba6f6111486bb1711c79de673958.png); background-position: 0% 0%; background-repeat: no-repeat no-repeat; \\\">\\n\\n <a href=\\\"/health-slideshow/foods-that-help-you-heal\\\">\\n                            <img src=\\\"/images/3D/housead_healing_foods_mr.jpg\\\" alt=\\\"foods that help you heal\\\">  \\n</div>\");\n$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/435ce96c7a2b47ceb8edbaa74840905d.png\"});\n$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div.div-twocol-lc div:eq(36) div:eq(0) div:eq(0) a:eq(0)\").attr({\"href\":\"/recipe-search\"});", 
      "name": "Recipe Search Box"
    }, 
    "7168347": {
      "code": "$(\"div.ui-bordered-box\").css({\"display\":\"none\"});\n$(\"li.filter a:eq(0)\").css({\"display\":\"none\"});\n$(\"li.map a:eq(0)\").css({\"display\":\"none\"});\n$(\"a#dxs-compare\").css({\"display\":\"none\"});\n$(\"ul.actions\").css({\"display\":\"none\"});", 
      "name": "Do Not Show Callout or Buttons"
    }, 
    "7169064": {
      "code": "$(\"div.tableofcontents\").replaceWith(\"<div class=\\\"tableofcontents\\\" style=\\\"width:170px;overflow:hidden;float:right;border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-right:2px solid #fff;width:174px;padding-bottom:10px;padding-left:10px;margin-bottom:15px;\\\">\\n    <a href=\\\"/goldcontent/amoxicillin#H1\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-is-this-medicine')\\\">What is...?</a>\\n  <a href=\\\"/goldcontent/amoxicillin#H7\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-side-effects-may-I-notice-from-receiving-this-medicine')\\\">Side Effects</a>\\n<a href=\\\"/goldcontent/amoxicillin#H2\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-tell-my-health-care-provider-before-I-take-this-medicine')\\\">Most Important</a>\\n<a href=\\\"/goldcontent/amoxicillin#H3\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/How-should-I-use-this-medicine')\\\">How to Take</a>\\n<a href=\\\"/goldcontent/amoxicillin#H4\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-if-I-miss-a-dose')\\\">Missed Dose</a>\\n<a href=\\\"/goldcontent/amoxicillin#H5\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-may-interact-with-this-medicine')\\\">Interactions</a>\\n<a href=\\\"/goldcontent/amoxicillin#H6\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-watch-for-while-using-this-medicine')\\\">Watch For</a>\\n<a href=\\\"/goldcontent/amoxicillin/2#H8\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/Where-should-I-keep-my-medicine')\\\">Where to Store</a>\\n</div>\");\n$(\"div.tableofcontents a:eq(2)\").css({\"display\":\"none\"});\n$(\"div.tableofcontents a:eq(4)\").css({\"display\":\"none\"});\n$(\"div.tableofcontents a:eq(7)\").css({\"display\":\"none\"});\n$(\"div#sectionHeader\").css({\"display\":\"none\"});\n$(\"div.pagetitle\").css({\"display\":\"none\"});\n$(\"dl#accordion-menu\").css({\"display\":\"none\"});\n$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"ul#drugtab\").css({\"display\":\"none\"});\n$(\"div.article-generic\").replaceWith(\"<div class=\\\"article-generic\\\" style=\\\"border-bottom:1px dotted #1888bc\\\">\\n    <div class=\\\"licensed licensed-tab\\\">Licensed from <a rel=\\\"nofollow\\\" href=\\\"/popup_goldlicense.jsp\\\" onclick=\\\"popUp(this.href,'news',640,480);return false;\\\" target=\\\"newsWin\\\"><img src=\\\"/images/logo_gold_license.gif\\\" alt=\\\"\\\"></a></div>\\n      Amoxicillin Trihydrate Oral capsule</div>\");\n$(\"div.article-generic\").replaceWith(\"<div class=\\\"article-generic\\\" style=\\\"border-bottom:1px dotted #1888bc; padding-bottom:10px; margin-bottom: 10px;\\\">\\n    <div class=\\\"licensed licensed-tab\\\"> <a rel=\\\"nofollow\\\" href=\\\"/popup_goldlicense.jsp\\\" onclick=\\\"popUp(this.href,'news',640,480);return false;\\\" target=\\\"newsWin\\\"><img src=\\\"/images/logo_gold_license.gif\\\" alt=\\\"\\\"></a></div>\\n      Amoxicillin Trihydrate Oral capsule</div>\");\n$(\"div#sectionFooter\").css({\"display\":\"none\"});", 
      "name": "Stripped TOC"
    }, 
    "7171129": {
      "code": "$(\"div.tableofcontents\").replaceWith(\"<div class=\\\"tableofcontents\\\" style=\\\"width:170px;overflow:hidden;float:right;border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-right:2px solid #fff;width:174px;padding-bottom:10px;padding-left:10px;margin-bottom:15px;\\\">\\n    <a href=\\\"/goldcontent/amoxicillin#H1\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-is-this-medicine')\\\">What is...?</a>\\n  <a href=\\\"/goldcontent/amoxicillin#H7\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-side-effects-may-I-notice-from-receiving-this-medicine')\\\">Side Effects</a>\\n<a href=\\\"/goldcontent/amoxicillin#H2\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-tell-my-health-care-provider-before-I-take-this-medicine')\\\">Most Important</a>\\n<a href=\\\"/goldcontent/amoxicillin#H3\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/How-should-I-use-this-medicine')\\\">How to Take</a>\\n<a href=\\\"/goldcontent/amoxicillin#H4\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-if-I-miss-a-dose')\\\">Missed Dose</a>\\n<a href=\\\"/goldcontent/amoxicillin#H5\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-may-interact-with-this-medicine')\\\">Interactions</a>\\n<a href=\\\"/goldcontent/amoxicillin#H6\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/What-should-I-watch-for-while-using-this-medicine')\\\">Watch For</a>\\n<a href=\\\"/goldcontent/amoxicillin/2#H8\\\" onclick=\\\"urchinTracker('/navclick/gold/TOC/Where-should-I-keep-my-medicine')\\\">Where to Store</a>\\n</div>\");", 
      "name": "Reordered TOC"
    }, 
    "7175055": {
      "name": "Original Page"
    }, 
    "7176130": {
      "name": "Original Page"
    }, 
    "7177171": {
      "name": "Original Page"
    }, 
    "7180067": {
      "name": "Original Page"
    }, 
    "7180068": {
      "code": "$(\"p#newsbubble span:eq(0)\").html(\"Get the latest news for Depression\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label style=\\\"color:#444\\\">Email address:</label>\");\n$(\"p#newsbubble span:eq(0)\").html(\"Get updates for Depression\");", 
      "name": "Variation #1"
    }, 
    "7181050": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/7ae5cef9bd7d4a86b9f9f88dfc190789.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/menopause-perimenopause\"});", 
      "name": "WS Top - Menopause"
    }, 
    "7191066": {
      "code": "$(\"p#newsbubble span:eq(0)\").html(\"Get the latest news for Depression\");\n$(\"span#loginFBnewsletter\").replaceWith(\"<span id=\\\"loginFBnewsletter\\\" style=\\\"cursor:pointer; font-size:12px; font-weight:bold\\\"><img class=\\\"spr-facebookicon\\\" src=\\\"/images/clear.gif\\\" alt=\\\"\\\">Sign up with Facebook</span>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").replaceWith(\"<label style=\\\"color:#444\\\">Email address:</label>\");\n$(\"div#signupBody form:eq(0) label:eq(0)\").html(\"Email address (we won't spam you!)\");\n$(\"p#newsbubble span:eq(0)\").html(\"Get updates for Depression\");", 
      "name": "Variation #2"
    }, 
    "7193025": {
      "code": "$j(\"div.ads-box-header-ws\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\" />\");\n$j(\"div.ads-box-header-ws img:eq(0)\").replaceWith(\"<img style=\\\"margin-bottom:15px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\");\n$j(\"div.ads-box-header-ws\").replaceWith(\"<div><img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\"></div><div class=\\\"ads-box-header-ws\\\">Advertisement</div>\");\n$j(\"div.rc-170 div:eq(0) img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/health-slideshow/recognizing-depression-symptoms\\\">\\n  <img style=\\\"margin-bottom:5px;\\\" src=\\\"//cdn.optimizely.com/img/3613006/ad26b12acecc48cf8510e801737cbe03.jpg\\\">\\n</a>\");\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/9f0462d225394dceaccff450c26d8b5d.jpg\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$j(\"div.rc-170 div:eq(0) a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\"});", 
      "name": "WS Top - Smoking"
    }, 
    "7194044": {
      "name": "Variation #1"
    }, 
    "7195050": {
      "code": "$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\"});\n$(\"div#clinicalAppCallout div:eq(5) a:eq(0) div:eq(1) div:eq(0) img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#clinicalAppCallout div:eq(10)\").css({\"position\":\"relative\", \"left\":0, \"top\":-68});\n$(\"div#clinicalAppCallout div:eq(5)\").css({\"position\":\"relative\", \"left\":0, \"top\":68});\n$(\"div#clinicalAppCallout div:eq(5)\").replaceWith(\"<div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 68px; \\\">\\n          <a href=\\\"/recipe-search\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find food and nutrition</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");\n$(\"div#rightRail div.borderWhiteBgTanShadow\").replaceWith(\"<div id=\\\"clinicalAppCallout\\\">\\n    <div class=\\\"box button noText\\\">\\n              <a href=\\\"/symptomsearch\\\">\\n              <div class=\\\"top\\\">&nbsp;</div>\\n              <div class=\\\"bottom clearfix\\\">\\n                <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssSmp.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n                <div class=\\\"textArea\\\"><h3>Check your symptoms</h3></div>\\n              </div>\\n              </a>\\n              </div>\\n            <div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 68px; \\\">\\n          <a href=\\\"/recipe-search\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find food and nutrition</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\\n        <div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: -68px; \\\">\\n          <a href=\\\"/treatments\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\\n        </div>\");", 
      "name": "Find food and nutrition in 3rd spot"
    }, 
    "7197190": {
      "code": "$(\"div.ui-bordered-box\").css({\"display\":\"none\"});", 
      "name": "Only Show Three Buttons"
    }, 
    "7244048": {
      "name": "Original Page"
    }, 
    "7321050": {
      "name": "Original Page"
    }, 
    "7412273": {
      "name": "Original Page"
    }, 
    "7433366": {
      "name": "Original Page"
    }, 
    "7454021": {
      "code": "$(\"li.map a:eq(0)\").css({\"display\":\"none\"});\n$(\"li.filter a:eq(0)\").css({\"display\":\"none\"});\n$(\"a#dxs-compare\").css({\"display\":\"none\"});\n$(\"ul.actions\").css({\"display\":\"none\"});", 
      "name": "Only Show Callout"
    }, 
    "7469020": {
      "code": "$(\"div#teaserMap\").css({\"display\":\"none\"});", 
      "name": "Do Not Show Map"
    }, 
    "7470072": {
      "name": "Original Page"
    }, 
    "7470073": {
      "code": "$(\"div.ui-bordered-box\").css({\"display\":\"none\"});", 
      "name": "Only Show Three Buttons"
    }, 
    "7473026": {
      "code": "$(\"div.ui-bordered-box\").css({\"display\":\"none\"});\n$(\"li.filter a:eq(0)\").css({\"display\":\"none\"});\n$(\"li.map a:eq(0)\").css({\"display\":\"none\"});\n$(\"a#dxs-compare\").css({\"display\":\"none\"});\n$(\"ul.actions\").css({\"display\":\"none\"});", 
      "name": "Do Not Show Callout or Buttons"
    }, 
    "7481449": {
      "code": "$(\"div#clinicalAppCallout > div:eq(2)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/treatments/diabetes__\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\\n\\n<div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 0px; \\\">\\n          <a href=\\\"/recipe-search\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find food and nutrition</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");\n$(\"div#clinicalAppCallout > div:eq(1)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/doctors/diabetes___doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "Recipe Callout Added"
    }, 
    "7515029": {
      "name": "Original Page"
    }, 
    "7515030": {
      "code": "<script type=\"text/javascript\" src=\"http://ad.doubleclick.net/adj/hn.us.hl.sld.x.x.x/depression;kw=depression,2791170,ev2;k1=depression;k2=mentalhealth;k3=health;ac=32688|32431|32457|34497|32463;pos=mr2;pv=867;type=top_rb;url=/health-slideshow/recognizing-depression-symptoms/anxiety-irritability;bf=no;tile=2;sz=300x600,300x250;ord=2496387716292511;u=depression,2791170,ev2|depression|mentalhealth|health|32688,32431,32457,34497,32463|mr1|867|||/health-slideshow/recognizing-depression-symptoms/anxiety-irritability|top_rb||www.healthline.com?\" language=\"JavaScript\">\n$(\"div.hBlock div.imageArea img:eq(0)\").replaceWith(\"<script type=\\\"text/javascript\\\" src=\\\"http://ad.doubleclick.net/adj/hn.us.hl.sld.x.x.x/depression;kw=depression,2791170,ev2;k1=depression;k2=mentalhealth;k3=health;ac=32688|32431|32457|34497|32463;pos=mr1;pv=867;type=top_rb;url=/health-slideshow/recognizing-depression-symptoms/anxiety-irritability;bf=no;tile=2;sz=300x600,300x250;ord=2496387716292511;u=depression,2791170,ev2|depression|mentalhealth|health|32688,32431,32457,34497,32463|mr1|867|||/health-slideshow/recognizing-depression-symptoms/anxiety-irritability|top_rb||www.healthline.com?\\\" language=\\\"JavaScript\\\">\");\n$(\"div.storyArea p:eq(1)\").css({\"visibility\":\"hidden\"});", 
      "name": "Variation #1"
    }, 
    "7518172": {
      "name": "Variation #1"
    }, 
    "7532040": {
      "name": "Original Page"
    }, 
    "7532041": {
      "code": "$(\"div.storyArea > p:eq(1)\").css({\"visibility\":\"hidden\"});\n$(\"div.storyArea > h1:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n\n\n\n\n\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#ad-anchor\").css({\"left\":-600, \"top\":-96});", 
      "name": "Variation #1"
    }, 
    "7551448": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});", 
      "name": "Modified Header Layout"
    }, 
    "7620065": {
      "name": "Original Page"
    }, 
    "7622105": {
      "code": "$(\"div.storyArea > p:eq(1)\").css({\"visibility\":\"hidden\"});\n$(\"div.storyArea > h1:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n\n\n\n\n\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#ad-anchor\").css({\"left\":-600, \"top\":-96});\n$(\"div#navTop\").css({\"z-index\":2147483645, \"position\":\"relative\"});", 
      "name": "Variation #1"
    }, 
    "7630017": {
      "name": "Original Page"
    }, 
    "7633023": {
      "code": "$(\"div#clinicalAppCallout > div:eq(2)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/treatments/diabetes__\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssTrt.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Explore treatments</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\\n\\n<div class=\\\"box button noText\\\" style=\\\"position: relative; left: 0px; top: 68px; \\\">\\n          <a href=\\\"/recipe-search\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"//cdn.optimizely.com/img/3613006/5e8cdae147c24d9ab50f1ec3109f7049.png\\\" width=\\\"46\\\" height=\\\"42\\\" style=\\\"height: auto; width: auto; \\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find food and nutrition</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");\n\n$(\"div#clinicalAppCallout > div:eq(3)\").css({\"left\":0, \"top\":0});\n$(\"div#clinicalAppCallout > div:eq(1)\").replaceWith(\"<div class=\\\"box button noText\\\">\\n          <a href=\\\"/doctors/diabetes___doctors\\\">\\n          <div class=\\\"top\\\">&nbsp;</div>\\n          <div class=\\\"bottom clearfix\\\">\\n            <div class=\\\"imageArea\\\"><img src=\\\"/media/images/rightRail/ssDoc.png\\\" width=\\\"46\\\" height=\\\"42\\\"></div>\\n            <div class=\\\"textArea\\\">\\n              <h3>Find a doctor</h3>\\n              </div>\\n          </div>\\n          </a>\\n        </div>\");", 
      "name": "add recipe callout"
    }, 
    "7656002": {
      "name": "Original Page"
    }, 
    "7762077": {
      "name": "Original Page"
    }, 
    "7762078": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});", 
      "name": "Modified Header Layout"
    }, 
    "7837146": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.quaternary\").css({\"width\":724, \"height\":335});\n\n$(\"div.storyArea > p:eq(1)\").css({\"visibility\":\"hidden\"});\n$(\"div.storyArea > h1:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n\n\n\n\n\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#ad-anchor\").css({\"left\":-600, \"top\":-96});\n$(\"div.hBlock\").css({\"width\":704, \"height\":307});\n$(\"div.quaternary\").css({\"width\":918, \"height\":337});\n$(\"div.hBlock\").css({\"width\":777, \"height\":309});\n$(\"div.storyArea > ul:eq(0)\").css({\"position\":\"relative\", \"left\":-106, \"top\":-4});", 
      "name": "Variation #1"
    }, 
    "7841160": {
      "name": "Original Page"
    }, 
    "7871283": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div#rightRail\").css({\"position\":\"relative\", \"left\":-635, \"top\":15});\n$(\"div.quaternary\").css({\"width\":934, \"height\":331});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"width\":591, \"height\":163});\n$(\"div.pageTools\").css({\"width\":283, \"height\":28});\n$(\"div.pageTools\").css({\"left\":531, \"top\":-9});\n$(\"div.pageTools\").css({\"left\":652, \"top\":-15});\n$(\"div.byBlock\").css({\"width\":937, \"height\":58});\n$(\"div.contentHeader\").css({\"width\":938, \"height\":72});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  <div id=\\\"moreslideshows\\\">\\n    <p>More Slideshows</p>\\n  </div>\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul><div id=\\\"test\\\" width=\\\"auto\\\" height=\\\"auto\\\"><p>This is a test div</p></div>\\n      </div>\");\n$(\"div.pageTools\").css({\"left\":519, \"top\":-15});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.pageTools\").css({\"width\":407, \"height\":30});\n$(\"div.storyArea\").css({\"width\":593, \"height\":269});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top:25px;font-size:15px;font-weight:bold;color:#f00\\\">More Slideshows</div>\\n  <div style=\\\"margin-top:10px;border:1px solid\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.quaternary > div.top\").replaceWith(\"<div class=\\\"top\\\" style=\\\"background:none\\\">&nbsp;</div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;background:none\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.hBlock\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\" />\");\n$(\"div.hBlock > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png) no-repeat\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(&quot;http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png&quot;) no-repeat scroll 0% 0% transparent;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").css({\"width\":957, \"height\":380});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n\n$(\"div.quaternary\").css({\"left\":-9, \"top\":-1});\n\n$(\"div.hBlock\").replaceWith(\"<div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        \\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>Get More Information</h1>\\n        <p class=\\\"subhead\\\"></p><p>While there is no cure for Alzheimer\u2019s, there are several treatments that can slow its progression. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p><p>The best defense against Alzheimer\u2019s is early detection. This includes knowing your risk factors and taking steps to prevent the disease.</p> <p>Visit the Alzheimer\u2019s Disease Learning Center to find out more. </p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        \\n      </div>\\n    </div>\");\n$(\"div.storyArea > div:eq(1)\").replaceWith(\"<div style=\\\"margin-top: 10px;\\\">\\n    <div style=\\\"\\\">\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/rheumatoid-arthritis/arthritis_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Foods That Reduce Inflammation</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/homegrown-herbs/110x90-Directory.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Homegrown Herbal Remedies</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/arthritis-stretches/arthritis-stretches_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\\\" style=\\\"font-weight: bold;\\\">Stretches to Keep You Moving</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/germs/Germy_Places.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/germy-places\\\" style=\\\"font-weight: bold;\\\">The Dirtiest Places in Your Home</a></div>\\n      </div>\\n      <div style=\\\"clear: both;\\\"></div>\\n    </div>\\n  </div>\");\n$(\"div.storyArea\").css({\"width\":595, \"height\":335});\n$(\"div.byBlock\").css({\"width\":939, \"height\":42});\n\n\n\n\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(0)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/fibromyalgia/fibromyalgia_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/fibromyalgia\\\" style=\\\"font-weight: bold;\\\">Is it Fibromyalgia?</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(1)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/celebrities-with-hiv\\\" style=\\\"font-weight: bold;\\\">Famous Faces of HIV & AIDS</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(2)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/smoking-timeline/smoking_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\\\" style=\\\"font-weight: bold;\\\">What Happens When You Quit</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(3)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px;\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/erectile-dysfunction/erectile-dysfunction_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/erectile-dysfunction\\\" style=\\\"font-weight: bold;\\\">Treating Erectile Dysfunction</a></div>\\n      </div>\");\n\n\n$(\"div#ad-anchor\").css({\"left\":-8, \"top\":120});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>While there is no cure for Alzheimer\u2019s, there are <a href=\\\"/health/alzheimers-disease-symptoms\\\">several treatments that can slow its progression</a>. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>The best defense against Alzheimer\u2019s is early detection. This includes <a href=\\\"/health/alzheimers-disease-risk-factors\\\">knowing your risk factors</a> and <a href=\\\"/health/alzheimers-disease-prevention\\\">taking steps to prevent the disease</a>. </p>\");\n$(\"div.storyArea > p:eq(3)\").replaceWith(\"<p>Visit the <a href=\\\"/health/alzheimers-disease\\\" title=\\\"Alzheimer's Disease Information\\\">Alzheimer\u2019s Disease Learning Center</a> to find out more.&nbsp;</p>\");\n$(\"div.storyArea > div:eq(1) > div:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");", 
      "name": "Variation #1"
    }, 
    "7875283": {
      "name": "Original Page"
    }, 
    "8002158": {
      "name": "Original Page"
    }, 
    "8017274": {
      "name": "Variation #1"
    }, 
    "8021044": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div#rightRail\").css({\"position\":\"relative\", \"left\":-635, \"top\":15});\n$(\"div.quaternary\").css({\"width\":934, \"height\":331});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"width\":591, \"height\":163});\n$(\"div.pageTools\").css({\"width\":283, \"height\":28});\n$(\"div.pageTools\").css({\"left\":531, \"top\":-9});\n$(\"div.pageTools\").css({\"left\":652, \"top\":-15});\n$(\"div.byBlock\").css({\"width\":937, \"height\":58});\n$(\"div.contentHeader\").css({\"width\":938, \"height\":72});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  <div id=\\\"moreslideshows\\\">\\n    <p>More Slideshows</p>\\n  </div>\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul><div id=\\\"test\\\" width=\\\"auto\\\" height=\\\"auto\\\"><p>This is a test div</p></div>\\n      </div>\");\n$(\"div.pageTools\").css({\"left\":519, \"top\":-15});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.pageTools\").css({\"width\":407, \"height\":30});\n$(\"div.storyArea\").css({\"width\":593, \"height\":269});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top:25px;font-size:15px;font-weight:bold;color:#f00\\\">More Slideshows</div>\\n  <div style=\\\"margin-top:10px;border:1px solid\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.quaternary > div.top\").replaceWith(\"<div class=\\\"top\\\" style=\\\"background:none\\\">&nbsp;</div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;background:none\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.hBlock\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\" />\");\n$(\"div.hBlock > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png) no-repeat\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(&quot;http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png&quot;) no-repeat scroll 0% 0% transparent;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").css({\"width\":957, \"height\":380});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n\n$(\"div.quaternary\").css({\"left\":-9, \"top\":-1});\n\n$(\"div.hBlock\").replaceWith(\"<div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        \\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>Get More Information</h1>\\n        <p class=\\\"subhead\\\"></p><p>While there is no cure for Alzheimer\u2019s, there are several treatments that can slow its progression. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p><p>The best defense against Alzheimer\u2019s is early detection. This includes knowing your risk factors and taking steps to prevent the disease.</p> <p>Visit the Alzheimer\u2019s Disease Learning Center to find out more. </p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        \\n      </div>\\n    </div>\");\n$(\"div.storyArea > div:eq(1)\").replaceWith(\"<div style=\\\"margin-top: 10px;\\\">\\n    <div style=\\\"\\\">\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/rheumatoid-arthritis/arthritis_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Foods That Reduce Inflammation</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/homegrown-herbs/110x90-Directory.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Homegrown Herbal Remedies</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/arthritis-stretches/arthritis-stretches_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\\\" style=\\\"font-weight: bold;\\\">Stretches to Keep You Moving</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/germs/Germy_Places.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/germy-places\\\" style=\\\"font-weight: bold;\\\">The Dirtiest Places in Your Home</a></div>\\n      </div>\\n      <div style=\\\"clear: both;\\\"></div>\\n    </div>\\n  </div>\");\n$(\"div.storyArea\").css({\"width\":595, \"height\":335});\n$(\"div.byBlock\").css({\"width\":939, \"height\":42});\n\n\n\n\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(0)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/fibromyalgia/fibromyalgia_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/fibromyalgia\\\" style=\\\"font-weight: bold;\\\">Is it Fibromyalgia?</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(1)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/celebrities-with-hiv\\\" style=\\\"font-weight: bold;\\\">Famous Faces of HIV & AIDS</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(2)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/smoking-timeline/smoking_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\\\" style=\\\"font-weight: bold;\\\">What Happens When You Quit</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(3)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px;\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/erectile-dysfunction/erectile-dysfunction_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/erectile-dysfunction\\\" style=\\\"font-weight: bold;\\\">Treating Erectile Dysfunction</a></div>\\n      </div>\");\n\n\n$(\"div#ad-anchor\").css({\"left\":-8, \"top\":120});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>While there is no cure for Alzheimer\u2019s, there are <a href=\\\"/health/alzheimers-disease-symptoms\\\">several treatments that can slow its progression</a>. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>The best defense against Alzheimer\u2019s is early detection. This includes <a href=\\\"/health/alzheimers-disease-risk-factors\\\">knowing your risk factors</a> and <a href=\\\"/health/alzheimers-disease-prevention\\\">taking steps to prevent the disease</a>. </p>\");\n$(\"div.storyArea > p:eq(3)\").replaceWith(\"<p>Visit the <a href=\\\"/health/alzheimers-disease\\\" title=\\\"Alzheimer's Disease Information\\\">Alzheimer\u2019s Disease Learning Center</a> to find out more.&nbsp;</p>\");\n$(\"div.storyArea > div:eq(1) > div:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.storyArea > h1:eq(0)\").replaceWith(\"<h1>\\n<h1>Living with Schizophrenia</h1>\\n</h1>\");\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Advances in medication and other therapies are helping schizophrenics \\nevery day, but there is no cure. Many schizophrenics also benefit from \\nrehabilitation or assisted living, which help prevent other problems \\nlike substance abuse, self-harm, physical illness, or relapses of \\nsymptoms.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>Keeping up with <a href=\\\"http://www.healthline.com/treatments/schizophrenia__\\\">schizophrenia treatments</a> is the best way to prevent symptoms from recurring, but getting help &ndash; for yourself or a loved one &ndash; is most important. <a href=\\\"http://www.healthline.com/search?q1=Schizophrenia\\\">Continuing to learn about schizophrenia</a> can help you reach treatment goals of living a functional and happy life.&nbsp;</p>\");\n$(\"div.storyArea > p:eq(3)\").css({\"display\":\"none\"});", 
      "name": "Variation #1"
    }, 
    "8022168": {
      "name": "Original Page"
    }, 
    "8059073": {
      "name": "Original Page"
    }, 
    "8059075": {
      "name": "Original Page"
    }, 
    "8060093": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div#rightRail\").css({\"position\":\"relative\", \"left\":-635, \"top\":15});\n$(\"div.quaternary\").css({\"width\":934, \"height\":331});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"width\":591, \"height\":163});\n$(\"div.pageTools\").css({\"width\":283, \"height\":28});\n$(\"div.pageTools\").css({\"left\":531, \"top\":-9});\n$(\"div.pageTools\").css({\"left\":652, \"top\":-15});\n$(\"div.byBlock\").css({\"width\":937, \"height\":58});\n$(\"div.contentHeader\").css({\"width\":938, \"height\":72});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  <div id=\\\"moreslideshows\\\">\\n    <p>More Slideshows</p>\\n  </div>\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul><div id=\\\"test\\\" width=\\\"auto\\\" height=\\\"auto\\\"><p>This is a test div</p></div>\\n      </div>\");\n$(\"div.pageTools\").css({\"left\":519, \"top\":-15});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.pageTools\").css({\"width\":407, \"height\":30});\n$(\"div.storyArea\").css({\"width\":593, \"height\":269});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top:25px;font-size:15px;font-weight:bold;color:#f00\\\">More Slideshows</div>\\n  <div style=\\\"margin-top:10px;border:1px solid\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.quaternary > div.top\").replaceWith(\"<div class=\\\"top\\\" style=\\\"background:none\\\">&nbsp;</div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;background:none\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.hBlock\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\" />\");\n$(\"div.hBlock > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png) no-repeat\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(&quot;http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png&quot;) no-repeat scroll 0% 0% transparent;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").css({\"width\":957, \"height\":380});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n\n$(\"div.quaternary\").css({\"left\":-9, \"top\":-1});\n\n$(\"div.hBlock\").replaceWith(\"<div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        \\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>Get More Information</h1>\\n        <p class=\\\"subhead\\\"></p><p>While there is no cure for Alzheimer\u2019s, there are several treatments that can slow its progression. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p><p>The best defense against Alzheimer\u2019s is early detection. This includes knowing your risk factors and taking steps to prevent the disease.</p> <p>Visit the Alzheimer\u2019s Disease Learning Center to find out more. </p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        \\n      </div>\\n    </div>\");\n$(\"div.storyArea > div:eq(1)\").replaceWith(\"<div style=\\\"margin-top: 10px;\\\">\\n    <div style=\\\"\\\">\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/rheumatoid-arthritis/arthritis_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Foods That Reduce Inflammation</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/homegrown-herbs/110x90-Directory.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Homegrown Herbal Remedies</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/arthritis-stretches/arthritis-stretches_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\\\" style=\\\"font-weight: bold;\\\">Stretches to Keep You Moving</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/germs/Germy_Places.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/germy-places\\\" style=\\\"font-weight: bold;\\\">The Dirtiest Places in Your Home</a></div>\\n      </div>\\n      <div style=\\\"clear: both;\\\"></div>\\n    </div>\\n  </div>\");\n$(\"div.storyArea\").css({\"width\":595, \"height\":335});\n$(\"div.byBlock\").css({\"width\":939, \"height\":42});\n\n\n\n\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(0)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/fibromyalgia/fibromyalgia_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/fibromyalgia\\\" style=\\\"font-weight: bold;\\\">Is it Fibromyalgia?</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(1)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/celebrities-with-hiv\\\" style=\\\"font-weight: bold;\\\">Famous Faces of HIV & AIDS</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(2)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/smoking-timeline/smoking_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\\\" style=\\\"font-weight: bold;\\\">What Happens When You Quit</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(3)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px;\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/erectile-dysfunction/erectile-dysfunction_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/erectile-dysfunction\\\" style=\\\"font-weight: bold;\\\">Treating Erectile Dysfunction</a></div>\\n      </div>\");\n\n\n$(\"div#ad-anchor\").css({\"left\":-8, \"top\":120});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>While there is no cure for Alzheimer\u2019s, there are <a href=\\\"/health/alzheimers-disease-symptoms\\\">several treatments that can slow its progression</a>. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>The best defense against Alzheimer\u2019s is early detection. This includes <a href=\\\"/health/alzheimers-disease-risk-factors\\\">knowing your risk factors</a> and <a href=\\\"/health/alzheimers-disease-prevention\\\">taking steps to prevent the disease</a>. </p>\");\n$(\"div.storyArea > p:eq(3)\").replaceWith(\"<p>Visit the <a href=\\\"/health/alzheimers-disease\\\" title=\\\"Alzheimer's Disease Information\\\">Alzheimer\u2019s Disease Learning Center</a> to find out more.&nbsp;</p>\");\n$(\"div.storyArea > div:eq(1) > div:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.storyArea > h1:eq(0)\").replaceWith(\"<h1>\\n<h1>Living with Schizophrenia</h1>\\n</h1>\");\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Advances in medication and other therapies are helping schizophrenics \\nevery day, but there is no cure. Many schizophrenics also benefit from \\nrehabilitation or assisted living, which help prevent other problems \\nlike substance abuse, self-harm, physical illness, or relapses of \\nsymptoms.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>Keeping up with <a href=\\\"http://www.healthline.com/treatments/schizophrenia__\\\">schizophrenia treatments</a> is the best way to prevent symptoms from recurring, but getting help &ndash; for yourself or a loved one &ndash; is most important. <a href=\\\"http://www.healthline.com/search?q1=Schizophrenia\\\">Continuing to learn about schizophrenia</a> can help you reach treatment goals of living a functional and happy life.&nbsp;</p>\");\n$(\"div.storyArea > p:eq(3)\").css({\"display\":\"none\"});", 
      "name": "Variation #1"
    }, 
    "8061085": {
      "code": "$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.storyArea > p:eq(1)\").css({\"visibility\":\"hidden\"});\n$(\"div#clinicalAppCallout > div:eq(1) > a:eq(0) > div:eq(1) > div:eq(1) > h3:eq(0)\").css({\"visibility\":\"hidden\"});", 
      "name": "Variation #1"
    }, 
    "8078252": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\nCE2.set(1, 'header-symtom2');\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});\n$(\"div.hl_serp_box_container\").css({\"left\":284, \"top\":5});\n$(\"div.hl_serp_box_container\").css({\"z-index\":2147483645});\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(http://www.healthline.com/images/base/search_field.v1.20110726130741.gif)\"});\n$(\"div.date-ctr\").css({\"left\":-267, \"top\":-27});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":-1});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-33});\nCE2.set(1, 'header-search');\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":71});\n$(\"object#DCF244028733\").css({\"position\":\"relative\", \"left\":-5, \"top\":13});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":135});\n$(\"object#DCF244028733\").css({\"left\":-5, \"top\":-1});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":6});\n$(\"div.date-ctr\").css({\"left\":-269, \"top\":-25});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"width\":257, \"height\":49});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":62});\n$(\"div.reg-links\").css({\"left\":5, \"top\":-63});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-69});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":22});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div.hl_serp_box_container\").css({\"left\":28, \"top\":2});\n$(\"div#navTopTop\").css({\"position\":\"relative\", \"left\":0, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"display\":\"none\"});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":86});\n$(\"div.hl_serp_box_container\").css({\"left\":198, \"top\":13});\n$(\"div#navTopTop\").css({\"width\":984, \"height\":20});\n$(\"div#navTopTop\").css({\"display\":\"none\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/118e24c81b174a3d9e1936f4d3ad8487.jpg\\\" />\");\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"position\":\"relative\", \"left\":-4, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-1, \"top\":-2});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-2, \"top\":-2});\n$(\"div#adTop > div.dfp-lb-wrapper\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2dcdad3fa5174936aa0585bc038e80dd.jpg\\\" />\");\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"position\":\"relative\", \"left\":-4, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-3, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-2, \"top\":0});\n$(\"div.date-ctr\").css({\"left\":-255, \"top\":-33});\n$(\"div.hl_serp_box_container\").css({\"width\":478, \"height\":52});\n$(\"div.date-ctr\").css({\"left\":-245, \"top\":-33});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div#navTop > div.top\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/e469d88f5f914ca5bea81ee943375149.jpg\\\" />\");\n$(\"div#navTop > div.top > img:eq(0)\").css({\"position\":\"relative\", \"left\":-573, \"top\":12});\n$(\"div#navTop > div.top > img:eq(0)\").css({\"left\":-581, \"top\":11});\n$(\"div.reg-links\").css({\"left\":6, \"top\":-65});\n$(\"div.hl_serp_box_container\").css({\"left\":485, \"top\":13});\n$(\"div.date-ctr\").css({\"left\":-248, \"top\":-75});\n$(\"div#navTop > div.top > img:eq(0)\").css({\"left\":-580, \"top\":13});", 
      "name": "Modified Header Layout"
    }, 
    "8084020": {
      "name": "Original Page"
    }, 
    "8090011": {
      "name": "Original Page"
    }, 
    "8114045": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div#rightRail\").css({\"position\":\"relative\", \"left\":-635, \"top\":15});\n$(\"div.quaternary\").css({\"width\":934, \"height\":331});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"width\":591, \"height\":163});\n$(\"div.pageTools\").css({\"width\":283, \"height\":28});\n$(\"div.pageTools\").css({\"left\":531, \"top\":-9});\n$(\"div.pageTools\").css({\"left\":652, \"top\":-15});\n$(\"div.byBlock\").css({\"width\":937, \"height\":58});\n$(\"div.contentHeader\").css({\"width\":938, \"height\":72});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  <div id=\\\"moreslideshows\\\">\\n    <p>More Slideshows</p>\\n  </div>\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul><div id=\\\"test\\\" width=\\\"auto\\\" height=\\\"auto\\\"><p>This is a test div</p></div>\\n      </div>\");\n$(\"div.pageTools\").css({\"left\":519, \"top\":-15});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.pageTools\").css({\"width\":407, \"height\":30});\n$(\"div.storyArea\").css({\"width\":593, \"height\":269});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top:25px;font-size:15px;font-weight:bold;color:#f00\\\">More Slideshows</div>\\n  <div style=\\\"margin-top:10px;border:1px solid\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.quaternary > div.top\").replaceWith(\"<div class=\\\"top\\\" style=\\\"background:none\\\">&nbsp;</div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;background:none\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.hBlock\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\" />\");\n$(\"div.hBlock > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png) no-repeat\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(&quot;http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png&quot;) no-repeat scroll 0% 0% transparent;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").css({\"width\":957, \"height\":380});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n\n$(\"div.quaternary\").css({\"left\":-9, \"top\":-1});\n\n$(\"div.hBlock\").replaceWith(\"<div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        \\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>Get More Information</h1>\\n        <p class=\\\"subhead\\\"></p><p>While there is no cure for Alzheimer\u2019s, there are several treatments that can slow its progression. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p><p>The best defense against Alzheimer\u2019s is early detection. This includes knowing your risk factors and taking steps to prevent the disease.</p> <p>Visit the Alzheimer\u2019s Disease Learning Center to find out more. </p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        \\n      </div>\\n    </div>\");\n$(\"div.storyArea > div:eq(1)\").replaceWith(\"<div style=\\\"margin-top: 10px;\\\">\\n    <div style=\\\"\\\">\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/rheumatoid-arthritis/arthritis_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Foods That Reduce Inflammation</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/homegrown-herbs/110x90-Directory.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Homegrown Herbal Remedies</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/arthritis-stretches/arthritis-stretches_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\\\" style=\\\"font-weight: bold;\\\">Stretches to Keep You Moving</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/germs/Germy_Places.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/germy-places\\\" style=\\\"font-weight: bold;\\\">The Dirtiest Places in Your Home</a></div>\\n      </div>\\n      <div style=\\\"clear: both;\\\"></div>\\n    </div>\\n  </div>\");\n$(\"div.storyArea\").css({\"width\":595, \"height\":335});\n$(\"div.byBlock\").css({\"width\":939, \"height\":42});\n\n\n\n\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(0)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/fibromyalgia/fibromyalgia_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/fibromyalgia\\\" style=\\\"font-weight: bold;\\\">Is it Fibromyalgia?</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(1)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/celebrities-with-hiv\\\" style=\\\"font-weight: bold;\\\">Famous Faces of HIV & AIDS</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(2)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/smoking-timeline/smoking_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\\\" style=\\\"font-weight: bold;\\\">What Happens When You Quit</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(3)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px;\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/erectile-dysfunction/erectile-dysfunction_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/erectile-dysfunction\\\" style=\\\"font-weight: bold;\\\">Treating Erectile Dysfunction</a></div>\\n      </div>\");\n\n\n$(\"div#ad-anchor\").css({\"left\":-8, \"top\":120});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>While there is no cure for Alzheimer\u2019s, there are <a href=\\\"/health/alzheimers-disease-symptoms\\\">several treatments that can slow its progression</a>. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>The best defense against Alzheimer\u2019s is early detection. This includes <a href=\\\"/health/alzheimers-disease-risk-factors\\\">knowing your risk factors</a> and <a href=\\\"/health/alzheimers-disease-prevention\\\">taking steps to prevent the disease</a>. </p>\");\n$(\"div.storyArea > p:eq(3)\").replaceWith(\"<p>Visit the <a href=\\\"/health/alzheimers-disease\\\" title=\\\"Alzheimer's Disease Information\\\">Alzheimer\u2019s Disease Learning Center</a> to find out more.&nbsp;</p>\");\n$(\"div.storyArea > div:eq(1) > div:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.storyArea > h1:eq(0)\").replaceWith(\"<h1>\\n<h1>Living with Schizophrenia</h1>\\n</h1>\");\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Advances in medication and other therapies are helping schizophrenics \\nevery day, but there is no cure. Many schizophrenics also benefit from \\nrehabilitation or assisted living, which help prevent other problems \\nlike substance abuse, self-harm, physical illness, or relapses of \\nsymptoms.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>Keeping up with <a href=\\\"http://www.healthline.com/treatments/schizophrenia__\\\">schizophrenia treatments</a> is the best way to prevent symptoms from recurring, but getting help &ndash; for yourself or a loved one &ndash; is most important. <a href=\\\"http://www.healthline.com/search?q1=Schizophrenia\\\">Continuing to learn about schizophrenia</a> can help you reach treatment goals of living a functional and happy life.&nbsp;</p>\");\n$(\"div.storyArea > p:eq(3)\").css({\"display\":\"none\"});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Unfortunately, there is no one single answer to stop psoriasis. What's  \\nworse is not everything works for everyone. Using some of the tips shown\\n  here, as well as <a href=\\\"http://www.healthline.com/treatments/psoriasis__\\\">using other  treatment options,</a> you can custom-tailor your daily routine to keep  problem itching and flaking to a minimum.</p>\");\n$(\"div.storyArea > p:eq(2)\").css({\"visibility\":\"hidden\"});\n$(\"div.storyArea > h1:eq(1)\").replaceWith(\"<h1>\\n<h1>No One Answer</h1>\\n</h1>\");", 
      "name": "Variation #1"
    }, 
    "8124197": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\nCE2.set(1, 'header-lc2');\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});\n$(\"div.hl_serp_box_container\").css({\"left\":284, \"top\":5});\n$(\"div.hl_serp_box_container\").css({\"z-index\":2147483645});\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(http://www.healthline.com/images/base/search_field.v1.20110726130741.gif)\"});\n$(\"div.date-ctr\").css({\"left\":-267, \"top\":-27});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":-1});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-33});\nCE2.set(1, 'header-search');\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":71});\n$(\"object#DCF244028733\").css({\"position\":\"relative\", \"left\":-5, \"top\":13});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":135});\n$(\"object#DCF244028733\").css({\"left\":-5, \"top\":-1});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":6});\n$(\"div.date-ctr\").css({\"left\":-269, \"top\":-25});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"width\":257, \"height\":49});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":62});\n$(\"div.reg-links\").css({\"left\":5, \"top\":-63});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-69});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":22});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div.hl_serp_box_container\").css({\"left\":28, \"top\":2});\n$(\"div#navTopTop\").css({\"position\":\"relative\", \"left\":0, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"display\":\"none\"});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":86});\n$(\"div.hl_serp_box_container\").css({\"left\":198, \"top\":13});\n$(\"div#navTopTop\").css({\"width\":984, \"height\":20});\n$(\"div#navTopTop\").css({\"display\":\"none\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/118e24c81b174a3d9e1936f4d3ad8487.jpg\\\" />\");\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"position\":\"relative\", \"left\":-4, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-1, \"top\":-2});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-2, \"top\":-2});\n$(\"div#adTop > div.dfp-lb-wrapper\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/2dcdad3fa5174936aa0585bc038e80dd.jpg\\\" />\");\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"position\":\"relative\", \"left\":-4, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-3, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper > img:eq(0)\").css({\"left\":-2, \"top\":0});\n$(\"div.date-ctr\").css({\"left\":-255, \"top\":-33});\n$(\"div.hl_serp_box_container\").css({\"width\":478, \"height\":52});\n$(\"div.date-ctr\").css({\"left\":-245, \"top\":-33});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div#navTop > div.top\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/e469d88f5f914ca5bea81ee943375149.jpg\\\" />\");\n$(\"div#navTop > div.top > img:eq(0)\").css({\"position\":\"relative\", \"left\":-573, \"top\":12});\n$(\"div#navTop > div.top > img:eq(0)\").css({\"left\":-581, \"top\":11});\n$(\"div.reg-links\").css({\"left\":6, \"top\":-65});\n$(\"div.hl_serp_box_container\").css({\"left\":485, \"top\":13});\n$(\"div.date-ctr\").css({\"left\":-248, \"top\":-75});\n$(\"div#navTop > div.top > img:eq(0)\").css({\"left\":-580, \"top\":13});", 
      "name": "Modified Header Layout"
    }, 
    "8126002": {
      "code": "$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"visibility\":\"hidden\"});\n$(\"div#rightRail\").css({\"position\":\"relative\", \"left\":-635, \"top\":15});\n$(\"div.quaternary\").css({\"width\":934, \"height\":331});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"width\":591, \"height\":163});\n$(\"div.pageTools\").css({\"width\":283, \"height\":28});\n$(\"div.pageTools\").css({\"left\":531, \"top\":-9});\n$(\"div.pageTools\").css({\"left\":652, \"top\":-15});\n$(\"div.byBlock\").css({\"width\":937, \"height\":58});\n$(\"div.contentHeader\").css({\"width\":938, \"height\":72});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  <div id=\\\"moreslideshows\\\">\\n    <p>More Slideshows</p>\\n  </div>\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul><div id=\\\"test\\\" width=\\\"auto\\\" height=\\\"auto\\\"><p>This is a test div</p></div>\\n      </div>\");\n$(\"div.pageTools\").css({\"left\":519, \"top\":-15});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 591px; height: 163px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.pageTools\").css({\"width\":407, \"height\":30});\n$(\"div.storyArea\").css({\"width\":593, \"height\":269});\n$(\"div.storyArea\").replaceWith(\"<div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top:25px;font-size:15px;font-weight:bold;color:#f00\\\">More Slideshows</div>\\n  <div style=\\\"margin-top:10px;border:1px solid\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\");\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.quaternary > div.top\").replaceWith(\"<div class=\\\"top\\\" style=\\\"background:none\\\">&nbsp;</div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px;background:none\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.hBlock\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\" />\");\n$(\"div.hBlock > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png) no-repeat\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").replaceWith(\"<div style=\\\"width: 934px; height: 331px; background: url(&quot;http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png&quot;) no-repeat scroll 0% 0% transparent;\\\" class=\\\"box quaternary\\\">\\n    <div class=\\\"top\\\" style=\\\"background: none repeat scroll 0% 0% transparent;\\\">&nbsp;</div>\\n    <div class=\\\"hBlock clearfix\\\"><img style=\\\"display: none;\\\" src=\\\"//cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        <img style=\\\"visibility: hidden;\\\" src=\\\"/hlcmsresource/images/slideshow/fibromyalgia/slide09-fibromyalgia-resources.jpg\\\" alt=\\\"Woman smiling with her husband smiling in the background\\\">\\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>More Fibromyalgia Resources</h1>\\n        <p class=\\\"subhead\\\"></p><p>Fibromyalgia pain, sleeplessness, and fatigue can drastically affect the quality of your life. This disorder has many myths about it; that\u2019s why getting the right information is so important. <strong></strong></p><ul><li>Visit the <a href=\\\"/health/fibromyalgia\\\" title=\\\"Fibromyalgia Information\\\">Fibromyalgia Learning Center</a> for more information.</li><li>Learn how doctors are now <a href=\\\"/health/fibromyalgia-diagnosis\\\" title=\\\"New Way of Diagnosing Fibromyalgia\\\">diagnosing fibromyalgia.</a> The process was <a href=\\\"/health/fibromyalgia-tests\\\" title=\\\"New Tests for Fibromyalgia\\\">updated in May 2010.</a></li><li>Read about <a href=\\\"/health/fibromyalgia-alternative-treatments\\\" title=\\\"Fibromyalgia Alternative Treatments\\\">alternative treatments</a> that can ease fibromyalgia symptoms.</li></ul><p></p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        <ul style=\\\"display: none;\\\" class=\\\"pageNav\\\">\\n          <li>\\n              <a href=\\\"/health-slideshow/fibromyalgia/treatments\\\">\\n                <div class=\\\"left\\\">&nbsp;</div>\\n                <div class=\\\"center\\\">\\n                  <p>Previous</p>\\n                </div>\\n                <div class=\\\"right\\\">&nbsp;</div>\\n              </a>\\n            </li>\\n          <li>\\n            <div class=\\\"center noBG\\\">\\n              <p><span>9 of 9</span></p>\\n            </div>\\n          </li>\\n\\n          </ul>\\n      </div>\\n    </div>\\n    <div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\");\n$(\"div.quaternary\").css({\"width\":957, \"height\":380});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n\n$(\"div.quaternary\").css({\"left\":-9, \"top\":-1});\n\n$(\"div.hBlock\").replaceWith(\"<div class=\\\"hBlock clearfix\\\">\\n\\n      <div class=\\\"imageArea\\\">\\n        \\n        <br></div>\\n      <div style=\\\"width: 593px; height: 269px;\\\" class=\\\"storyArea\\\">\\n        <h1>Get More Information</h1>\\n        <p class=\\\"subhead\\\"></p><p>While there is no cure for Alzheimer\u2019s, there are several treatments that can slow its progression. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p><p>The best defense against Alzheimer\u2019s is early detection. This includes knowing your risk factors and taking steps to prevent the disease.</p> <p>Visit the Alzheimer\u2019s Disease Learning Center to find out more. </p>\\n  \\n  <div style=\\\"margin-top: 25px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\\n  <div style=\\\"margin-top: 10px; border: 1px solid;\\\">\\n    box for more slideshow thumbnails\\n  </div>\\n\\n\\n        \\n      </div>\\n    </div>\");\n$(\"div.storyArea > div:eq(1)\").replaceWith(\"<div style=\\\"margin-top: 10px;\\\">\\n    <div style=\\\"\\\">\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/rheumatoid-arthritis/arthritis_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Foods That Reduce Inflammation</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/homegrown-herbs/110x90-Directory.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/treating-rheumatoid-arthritis\\\" style=\\\"font-weight: bold;\\\">Homegrown Herbal Remedies</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/arthritis-stretches/arthritis-stretches_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/arthritis-stretching-tips\\\" style=\\\"font-weight: bold;\\\">Stretches to Keep You Moving</a></div>\\n      </div>\\n      <div style=\\\"float: left; width: 110px; padding-right: 20px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/germs/Germy_Places.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/germy-places\\\" style=\\\"font-weight: bold;\\\">The Dirtiest Places in Your Home</a></div>\\n      </div>\\n      <div style=\\\"clear: both;\\\"></div>\\n    </div>\\n  </div>\");\n$(\"div.storyArea\").css({\"width\":595, \"height\":335});\n$(\"div.byBlock\").css({\"width\":939, \"height\":42});\n\n\n\n\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(0)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/fibromyalgia/fibromyalgia_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/fibromyalgia\\\" style=\\\"font-weight: bold;\\\">Is it Fibromyalgia?</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(1)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/celebrities-with-hiv\\\" style=\\\"font-weight: bold;\\\">Famous Faces of HIV & AIDS</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(2)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/smoking-timeline/smoking_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/quit-smoking-timeline\\\" style=\\\"font-weight: bold;\\\">What Happens When You Quit</a></div>\\n      </div>\");\n\n$(\"div.storyArea > div:eq(1) > div:eq(0) > div:eq(3)\").replaceWith(\"<div style=\\\"float: left; clear: none; width: 118px;\\\">\\n        <div><img src=\\\"http://www.healthline.com/hlcmsresource/images/slideshow/erectile-dysfunction/erectile-dysfunction_slideshow-thumb.jpg\\\" alt=\\\"\\\" style=\\\"padding: 3px; border: 1px solid rgb(204, 204, 204);\\\" height=\\\"90\\\" width=\\\"110\\\"></div>\\n        <div style=\\\"margin-top: 5px;\\\"><a href=\\\"http://www.healthline.com/health-slideshow/erectile-dysfunction\\\" style=\\\"font-weight: bold;\\\">Treating Erectile Dysfunction</a></div>\\n      </div>\");\n\n\n$(\"div#ad-anchor\").css({\"left\":-8, \"top\":120});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>While there is no cure for Alzheimer\u2019s, there are <a href=\\\"/health/alzheimers-disease-symptoms\\\">several treatments that can slow its progression</a>. There are also treatments to help manage symptoms, such as loss of sleep and agitation.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>The best defense against Alzheimer\u2019s is early detection. This includes <a href=\\\"/health/alzheimers-disease-risk-factors\\\">knowing your risk factors</a> and <a href=\\\"/health/alzheimers-disease-prevention\\\">taking steps to prevent the disease</a>. </p>\");\n$(\"div.storyArea > p:eq(3)\").replaceWith(\"<p>Visit the <a href=\\\"/health/alzheimers-disease\\\" title=\\\"Alzheimer's Disease Information\\\">Alzheimer\u2019s Disease Learning Center</a> to find out more.&nbsp;</p>\");\n$(\"div.storyArea > div:eq(1) > div:eq(0)\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div.storyArea > div:eq(0)\").replaceWith(\"<div style=\\\"margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);\\\">More Slideshows</div>\");\n$(\"div.storyArea > h1:eq(0)\").replaceWith(\"<h1>\\n<h1>Living with Schizophrenia</h1>\\n</h1>\");\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Advances in medication and other therapies are helping schizophrenics \\nevery day, but there is no cure. Many schizophrenics also benefit from \\nrehabilitation or assisted living, which help prevent other problems \\nlike substance abuse, self-harm, physical illness, or relapses of \\nsymptoms.</p>\");\n$(\"div.storyArea > p:eq(2)\").replaceWith(\"<p>Keeping up with <a href=\\\"http://www.healthline.com/treatments/schizophrenia__\\\">schizophrenia treatments</a> is the best way to prevent symptoms from recurring, but getting help &ndash; for yourself or a loved one &ndash; is most important. <a href=\\\"http://www.healthline.com/search?q1=Schizophrenia\\\">Continuing to learn about schizophrenia</a> can help you reach treatment goals of living a functional and happy life.&nbsp;</p>\");\n$(\"div.storyArea > p:eq(3)\").css({\"display\":\"none\"});\n$(\"div.storyArea > p:eq(1)\").replaceWith(\"<p>Unfortunately, there is no one single answer to stop psoriasis. What's  \\nworse is not everything works for everyone. Using some of the tips shown\\n  here, as well as <a href=\\\"http://www.healthline.com/treatments/psoriasis__\\\">using other  treatment options,</a> you can custom-tailor your daily routine to keep  problem itching and flaking to a minimum.</p>\");\n$(\"div.storyArea > p:eq(2)\").css({\"visibility\":\"hidden\"});\n$(\"div.storyArea > h1:eq(1)\").replaceWith(\"<h1>\\n<h1>No One Answer</h1>\\n</h1>\");", 
      "name": "Variation #1"
    }, 
    "8143037": {
      "name": "Original Page"
    }, 
    "8158223": {
      "name": "Original Page"
    }, 
    "8166197": {
      "name": "Original Page"
    }, 
    "8166214": {
      "code": "$(\"div.ads-box-header-marketplace-right\").replaceWith(\"<div class=\\\"ads-box-header-marketplace-right\\\"></div>\");\n$(\"div.ads-margin-small > table:eq(0) > tbody:eq(0)\").replaceWith(\"<tbody></tbody>\");\n$(\"div.ads-box-header-marketplace\").replaceWith(\"<div class=\\\"ads-box-header-marketplace ads-margin\\\"></div>\");\n$(\"div.ads-box-header-marketplace\").css({\"display\":\"none\"});\n$(\"div.ads-margin-small\").css({\"display\":\"none\"});\n$(\"div.ads-block-marketplace\").css({\"display\":\"none\"});\n$(\"div.ads-block-marketplace-container\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").replaceWith(\"<div id=\\\"ad-anchor\\\" class=\\\"ads-box\\\">\\n  <div class=\\\"ads-margin ads-box-header\\\">Advertisement</div>\\n              <div class=\\\"ads-medium-rect\\\">\\n              <div id=\\\"DFPAD_MR\\\">\\n            <!-- Copyright 2008 DoubleClick, a division of Google Inc. All rights reserved. -->\\n<!-- Code auto-generated on Thu Jul 07 11:46:57 EDT 2011 -->\\n\\n<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" id=\\\"DCF237091679\\\" width=\\\"300\\\" height=\\\"250\\\"><param name=\\\"movie\\\" value=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\"><param name=\\\"flashvars\\\" value=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\"><param name=\\\"quality\\\" value=\\\"high\\\"><param name=\\\"wmode\\\" value=\\\"opaque\\\"><param name=\\\"base\\\" value=\\\"http://s0.2mdn.net/2070086\\\"><param name=\\\"AllowScriptAccess\\\" value=\\\"never\\\"><embed src=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\" flashvars=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\" width=\\\"300\\\" height=\\\"250\\\" type=\\\"application/x-shockwave-flash\\\" quality=\\\"high\\\" swliveconnect=\\\"true\\\" wmode=\\\"transparent\\\" name=\\\"DCF237091679\\\" base=\\\"http://s0.2mdn.net/2070086\\\" allowscriptaccess=\\\"never\\\"></object>\\n<noscript></noscript>\\n\\n            </div>\\n        </div>\\n        <div class=\\\"ads-medium-rect ads-margin\\\">\\n              \\n<div class=\\\"optimizely-avoid\\\">If you want to test the content of this frame, <a href=\\\"https://optimizely.appspot.com/edit#url=http://contextlinks.netseer.com/dsatserving2/servlet/BannerServer?tagid=2578&amp;params=%26segment%3Dasthma&amp;adh=250&amp;adw=300&amp;frd=1312219299758\\\" style=\\\"cursor: pointer !important\\\" target=\\\"_blank\\\">click here to load it in a new window</a>.</div>\\n\\n              </div>\\n            <!-- MARKETPLACE ADS BEGIN -->\\n      <!-- MARKETPLACE ADS BEGIN -->\\n  <style type=\\\"text/css\\\">\\n.mp {width:280px; padding:10px; font-family:Arial, Helvetica, sans-serif; font-size:12px; border-bottom:1px dotted #a19c96;}\\n.mp p {margin:0px; color:#333333;}\\n.mp a {color:#006699; text-decoration:none; font-weight:bold;}\\n.mp a:hover {text-decoration:underline;}\\n.blue {background-color:#e6f2f7;}\\n</style>\\n\\n\\n<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p>There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p>Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p>Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p>Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\\n  \\n  <!-- MARKETPLACE ADS END -->\\n  \\n  \\n<!-- MARKETPLACE ADS END -->\\n    </div>\");\n$(\"div#marketplace-wrapper\").replaceWith(\"<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px; margin:10px 0px; text-align:left;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p>There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p>Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p>Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p>Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\");\n$(\"div#marketplace-wrapper\").replaceWith(\"<style type=\\\"text/css\\\">\\n.mp {width:280px; padding:10px; font-family:Arial, Helvetica, sans-serif; font-size:12px; border-bottom:1px dotted #a19c96;}\\n.mp img {padding:1px; border:1px solid #CCC; float:left; margin:0px 10px 0px 0px;}\\n.mp p {margin:0px; color:#333333;}\\n.mp a {color:#006699; text-decoration:none; font-weight:bold;}\\n.mp a:hover {text-decoration:underline;}\\n.blue {background-color:#e6f2f7;}\\n</style>\\n\\n\\n<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px; margin:10px 0px; text-align:left;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-crohns.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n       <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p style=\\\"font-size:11px;\\\">There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    \\n    <div class=\\\"mp blue\\\">\\n      <a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-depression.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p style=\\\"font-size:11px;\\\">Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    \\n    <div class=\\\"mp\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-ms.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p style=\\\"font-size:11px;\\\">Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    \\n    <div class=\\\"mp blue\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-uc.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p style=\\\"font-size:11px;\\\">Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\");\n$(\"div#ad-anchor\").replaceWith(\"<div id=\\\"ad-anchor\\\" class=\\\"ads-box\\\">\\n  <div class=\\\"ads-margin ads-box-header\\\">Advertisement</div>\\n              <div class=\\\"ads-medium-rect\\\">\\n              <div id=\\\"DFPAD_MR\\\">\\n            <!-- Copyright 2008 DoubleClick, a division of Google Inc. All rights reserved. -->\\n<!-- Code auto-generated on Thu Jul 07 11:46:57 EDT 2011 -->\\n\\n<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" id=\\\"DCF237091679\\\" height=\\\"250\\\" width=\\\"300\\\"><param name=\\\"movie\\\" value=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\"><param name=\\\"flashvars\\\" value=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\"><param name=\\\"quality\\\" value=\\\"high\\\"><param name=\\\"wmode\\\" value=\\\"opaque\\\"><param name=\\\"base\\\" value=\\\"http://s0.2mdn.net/2070086\\\"><param name=\\\"AllowScriptAccess\\\" value=\\\"never\\\"><embed src=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\" flashvars=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\" type=\\\"application/x-shockwave-flash\\\" quality=\\\"high\\\" swliveconnect=\\\"true\\\" wmode=\\\"transparent\\\" name=\\\"DCF237091679\\\" base=\\\"http://s0.2mdn.net/2070086\\\" allowscriptaccess=\\\"never\\\" height=\\\"250\\\" width=\\\"300\\\"></object>\\n<noscript></noscript>\\n\\n            </div>\\n        </div>\\n        <div class=\\\"ads-medium-rect ads-margin\\\">\\n              \\n<div class=\\\"optimizely-avoid\\\">If you want to test the content of this frame, <a href=\\\"https://optimizely.appspot.com/edit#url=http://contextlinks.netseer.com/dsatserving2/servlet/BannerServer?tagid=2578&amp;params=%26segment%3Dasthma&amp;adh=250&amp;adw=300&amp;frd=1312219299758\\\" style=\\\"cursor: pointer ! important;\\\" target=\\\"_blank\\\">click here to load it in a new window</a>.</div>\\n\\n              </div>\\n            <!-- MARKETPLACE ADS BEGIN -->\\n      <!-- MARKETPLACE ADS BEGIN -->\\n<style type=\\\"text/css\\\">\\n.mp {width:280px; height:45px; padding:10px; font-family:Arial, Helvetica, sans-serif; font-size:12px; border-bottom:1px dotted #a19c96;}\\n.mp img {padding:1px; border:1px solid #CCC; float:left; margin:0px 10px 0px 0px;}\\n.mp p {margin:0px; color:#333333;}\\n.mp a {color:#006699; text-decoration:none; font-weight:bold;}\\n.mp a:hover {text-decoration:underline;}\\n.blue {background-color:#e6f2f7;}\\n</style>\\n\\n\\n<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px; margin:10px 0px; text-align:left;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-crohns.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n       <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p style=\\\"font-size:11px;\\\">There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    \\n    <div class=\\\"mp blue\\\">\\n      <a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-depression.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p style=\\\"font-size:11px;\\\">Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    \\n    <div class=\\\"mp\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-ms.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p style=\\\"font-size:11px;\\\">Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    \\n    <div class=\\\"mp blue\\\">\\n      <a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\"><img src=\\\"/corporate/images/marketplace/mp-uc.jpg\\\" width=\\\"50\\\" height=\\\"45\\\" alt=\\\"Woman holding stomach\\\" /></a>\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p style=\\\"font-size:11px;\\\">Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\\n  \\n  <!-- MARKETPLACE ADS END -->\\n  \\n  \\n<!-- MARKETPLACE ADS END -->\\n    </div>\");\n$(\"div#ad-anchor > div:eq(2)\").replaceWith(\"<div class=\\\"ads-medium-rect ads-margin\\\">\\n              \\n\\n\\n              </div>\");", 
      "name": "Variation - Images"
    }, 
    "8167199": {
      "code": "$(\"div.ads-box-header-marketplace-right\").replaceWith(\"<div class=\\\"ads-box-header-marketplace-right\\\"></div>\");\n$(\"div.ads-margin-small > table:eq(0) > tbody:eq(0)\").replaceWith(\"<tbody></tbody>\");\n$(\"div.ads-box-header-marketplace\").replaceWith(\"<div class=\\\"ads-box-header-marketplace ads-margin\\\"></div>\");\n$(\"div.ads-box-header-marketplace\").css({\"display\":\"none\"});\n$(\"div.ads-margin-small\").css({\"display\":\"none\"});\n$(\"div.ads-block-marketplace\").css({\"display\":\"none\"});\n$(\"div.ads-block-marketplace-container\").css({\"display\":\"none\"});\n$(\"div#ad-anchor\").replaceWith(\"<div id=\\\"ad-anchor\\\" class=\\\"ads-box\\\">\\n  <div class=\\\"ads-margin ads-box-header\\\">Advertisement</div>\\n              <div class=\\\"ads-medium-rect\\\">\\n              <div id=\\\"DFPAD_MR\\\">\\n            <!-- Copyright 2008 DoubleClick, a division of Google Inc. All rights reserved. -->\\n<!-- Code auto-generated on Thu Jul 07 11:46:57 EDT 2011 -->\\n\\n<object classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" id=\\\"DCF237091679\\\" width=\\\"300\\\" height=\\\"250\\\"><param name=\\\"movie\\\" value=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\"><param name=\\\"flashvars\\\" value=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\"><param name=\\\"quality\\\" value=\\\"high\\\"><param name=\\\"wmode\\\" value=\\\"opaque\\\"><param name=\\\"base\\\" value=\\\"http://s0.2mdn.net/2070086\\\"><param name=\\\"AllowScriptAccess\\\" value=\\\"never\\\"><embed src=\\\"http://s0.2mdn.net/2070086/SQLXR_DTC_U_UB2B_UF_BPD_LearnMore_StartHere_300x250.swf\\\" flashvars=\\\"moviePath=http://s0.2mdn.net/2070086/&amp;moviepath=http://s0.2mdn.net/2070086/&amp;clickTag1=http%3A//ad.doubleclick.net/click%253Bh%253Dv8/3b56/3/0/%252a/q%253B237091679%253B0-0%253B0%253B60701291%253B4307-300/250%253B35888527/35906405/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bpc%253DDFP241937621%253B%253B%257Efdr%253D241937621%253B0-0%253B1%253B51062276%253B4307-300/250%253B41110575/41128362/1%253Bu%253Dasthma%252C2800541%7Casthma%7Crespiratory%7Chealth%7C32688%252C32431%252C32457%252C34042%252C32463%7Cmr1%7C21555%7C%7C%7C/health/asthma%253B%257Eokv%253D%253Bkw%253Dasthma%252C2800541%253Bk1%253Dasthma%253Bk2%253Drespiratory%253Bk3%253Dhealth%253Bac%253D32688%7C32431%7C32457%7C34042%7C32463%253Bpos%253Dmr1%253Bpv%253D21555%253Btype%253Dtop_rb%253Burl%253D/health/asthma%253Foptimizely_disable-true%2526optimizely_host-optimizely.appspot.com%2526optimizely_load_innie-true%2526optimizely_log-false%2526optimizely_redirect-true%2526optimizely_cache_buster-1312219297626%253Bbf%253Dno%253B%257Esscs%253D%253fhttp%3A//www.seroquelxr.com/index.aspx%3Fsource%3D2856%26utm_source%3Dhealthline%26utm_medium%3Dbanner%26utm_term%3Dbpd_u%26utm_content%3Dlearnmore_starthere_f%26utm_campaign%3Dub2b%26umedium%3Dbanner%26uadpub%3Dhealthline%26ucreative%3Dlearnmore_starthere_f%26ucampaign%3Dub2b%26uindrive%3Dbpd%26ubrandrive%3Du\\\" width=\\\"300\\\" height=\\\"250\\\" type=\\\"application/x-shockwave-flash\\\" quality=\\\"high\\\" swliveconnect=\\\"true\\\" wmode=\\\"transparent\\\" name=\\\"DCF237091679\\\" base=\\\"http://s0.2mdn.net/2070086\\\" allowscriptaccess=\\\"never\\\"></object>\\n<noscript></noscript>\\n\\n            </div>\\n        </div>\\n        <div class=\\\"ads-medium-rect ads-margin\\\">\\n              \\n<div class=\\\"optimizely-avoid\\\">If you want to test the content of this frame, <a href=\\\"https://optimizely.appspot.com/edit#url=http://contextlinks.netseer.com/dsatserving2/servlet/BannerServer?tagid=2578&amp;params=%26segment%3Dasthma&amp;adh=250&amp;adw=300&amp;frd=1312219299758\\\" style=\\\"cursor: pointer !important\\\" target=\\\"_blank\\\">click here to load it in a new window</a>.</div>\\n\\n              </div>\\n            <!-- MARKETPLACE ADS BEGIN -->\\n      <!-- MARKETPLACE ADS BEGIN -->\\n  <style type=\\\"text/css\\\">\\n.mp {width:280px; padding:10px; font-family:Arial, Helvetica, sans-serif; font-size:12px; border-bottom:1px dotted #a19c96;}\\n.mp p {margin:0px; color:#333333;}\\n.mp a {color:#006699; text-decoration:none; font-weight:bold;}\\n.mp a:hover {text-decoration:underline;}\\n.blue {background-color:#e6f2f7;}\\n</style>\\n\\n\\n<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p>There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p>Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p>Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p>Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\\n  \\n  <!-- MARKETPLACE ADS END -->\\n  \\n  \\n<!-- MARKETPLACE ADS END -->\\n    </div>\");\n$(\"div#marketplace-wrapper\").replaceWith(\"<div id=\\\"marketplace-wrapper\\\" style=\\\"width:300px; margin:10px 0px; text-align:left;\\\">\\n    <p style=\\\"font-size:10px; color:#555555; text-align:right; font-family:Arial, Helvetica, sans-serif; margin:0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p>There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p>Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p>Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541|asthma|respiratory|health||mp1|||||||hptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p>Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\");\n$(\"div#ad-anchor > div:eq(2)\").replaceWith(\"<div class=\\\"ads-medium-rect ads-margin\\\">\\n              \\n\\n\\n              </div>\");\n$(\"div#marketplace-wrapper\").replaceWith(\"<div id=\\\"marketplace-wrapper\\\" style=\\\"width: 300px; margin: 15px 0px; text-align: left;\\\">\\n    <p style=\\\"font-size: 10px; color: rgb(85, 85, 85); text-align: right; font-family: Arial,Helvetica,sans-serif; margin: 0px 0px 1px;\\\">Healthline Marketplace</p>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/k%3B241253160%3B0-0%3B5%3B51062276%3B1835-290/50%3B36874041/36891919/1%3Bu%3Dasthma%2C2800541%7Casthma%7Crespiratory%7Chealth%7C%7Cmp1%7C%7C%7C%7C%7C%7C%7Chptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/crohns-disease-take-control.html\\\" target=\\\"_blank\\\">Managing Crohn's Disease</a></p>\\n        <p>There's a difference between living with Crohn's Disease and living - learn more.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://www.healthline.com/health/living-with-depression\\\" target=\\\"_blank\\\">Depression Facts</a></p>\\n        <p>Know your major depressive disorder treatment options on this sponsored site.</p>\\n    </div>\\n    <div class=\\\"mp\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/v%3B242318923%3B0-0%3B6%3B51062276%3B1835-290/50%3B42542847/42560634/1%3Bu%3Dasthma%2C2800541%7Casthma%7Crespiratory%7Chealth%7C%7Cmp1%7C%7C%7C%7C%7C%7C%7Chptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/health/advancing-ms\\\" target=\\\"_blank\\\">The Progression of MS</a></p>\\n        <p>Know what to expect and learn how to better manage the disease.</p>\\n    </div>\\n    <div class=\\\"mp blue\\\">\\n        <p><a href=\\\"http://ad.doubleclick.net/click%3Bh%3Dv8/3b56/3/0/%2a/t%3B243217677%3B0-0%3B1%3B51062276%3B1835-290/50%3B35535073/35552891/1%3Bu%3Dasthma%2C2800541%7Casthma%7Crespiratory%7Chealth%7C%7Cmp1%7C%7C%7C%7C%7C%7C%7Chptron%3B%7Eokv%3D%3Btn%3D5%3Bto%3Dv%3Bta%3Dleft%3Btcs%3D5%3Bkw%3Dasthma%2C2800541%3Bk1%3Dasthma%3Bk2%3Drespiratory%3Bk3%3Dhealth%3Bpos%3Dmp1%3Btile%3D4%3B%7Esscs%3D%3fhttp://www.healthline.com/channel/ulcerative-colitis-take-control.html\\\" target=\\\"_blank\\\">Do You Have Ulcerative Colitis?</a></p>\\n        <p>Get Strategies for Managing this Chronic Disease of the Colon.</p>\\n    </div>\\n</div>\");", 
      "name": "Variation- No images"
    }, 
    "8396137": {
      "name": "Original Page"
    }, 
    "8402342": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});\n$(\"div.hl_serp_box_container\").css({\"left\":284, \"top\":5});\n$(\"div.hl_serp_box_container\").css({\"z-index\":2147483645});\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(http://www.healthline.com/images/base/search_field.v1.20110726130741.gif)\"});\n$(\"div.date-ctr\").css({\"left\":-267, \"top\":-27});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":-1});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-33});\nCE2.set(1, 'header-search');\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":71});\n$(\"object#DCF244028733\").css({\"position\":\"relative\", \"left\":-5, \"top\":13});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":135});\n$(\"object#DCF244028733\").css({\"left\":-5, \"top\":-1});\n$(\"div.hl_serp_box_container\").css({\"left\":282, \"top\":6});\n$(\"div.date-ctr\").css({\"left\":-269, \"top\":-25});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"width\":257, \"height\":49});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":62});\n$(\"div.reg-links\").css({\"left\":5, \"top\":-63});\n$(\"div.date-ctr\").css({\"left\":-268, \"top\":-69});\n$(\"div.hl_serp_box_container\").css({\"left\":232, \"top\":22});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":76});\n$(\"div.hl_serp_box_container\").css({\"left\":28, \"top\":2});\n$(\"div#navTopTop\").css({\"position\":\"relative\", \"left\":0, \"top\":0});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"display\":\"none\"});\n$(\"div#navTop > div.top\").css({\"width\":982, \"height\":86});\n$(\"div.hl_serp_box_container\").css({\"left\":198, \"top\":13});", 
      "name": "Modified Header Layout"
    }, 
    "8415618": {
      "name": "Original Page"
    }, 
    "8415620": {
      "name": "Original Page"
    }, 
    "8437202": {
      "name": "Variation #1"
    }, 
    "8442502": {
      "name": "Original Page"
    }, 
    "8453351": {
      "code": "$(\"div.div-twocol-lc > div:eq(0) > div:eq(0)\").replaceWith(\"<div class=\\\"boxBorder\\\">\\n            <style type=\\\"text/css\\\">\\n  .nav_block_wrapper{margin-top:-30px;width:653px;position:absolute;font-weight:bold;z-index:888;}\\n  .nav_boxBorder{border-right:1px solid #8c8882;border-bottom:1px solid #8c8882;}\\n  .nav_boxShadow{border-right:1px solid #b6b1aa;border-bottom:1px solid #b6b1aa;}\\n  .nav_button{height:24px;float:right;margin-left:5px;cursor:pointer;}\\n  .nav_button_body{height:20px;border:1px solid #fff;text-align:center;font-size:11px;color:#757472;background:#fff;}\\n</style>\\n\\n<div style=\\\"background:#F0EEEB url(/images/base/nav_bk.jpg) top left repeat-x;\\\">\\n<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; opacity: 0.21688979591836732; \\\">\\n\\n<div class=\\\"hl_serp_box_container\\\" style=\\\"height:64px;\\\">\\n\\n              \\n<div style=\\\"padding:0px 0px 0px 12px;margin-top:10px;\\\">\\n  <form name=\\\"sf1\\\" action=\\\"http://www.healthline.com/search\\\" method=\\\"get\\\" onsubmit=\\\"this.q1.value=this.q1.value==df?dq:this.q1.value;ntptAddPair('search_term',this.q1.value);return ntptSubmitTag(this,'ev=formsubmit&amp;form=sf1');\\\">\\n    <div id=\\\"globalACDiv\\\" class=\\\"hl_serp_box_wrapper yui-ac\\\" style=\\\"position:relative;height:17px;\\\">\\n      <input id=\\\"hlGlobalInput\\\" tabindex=\\\"1\\\" name=\\\"q1\\\" type=\\\"text\\\" class=\\\"hl_serp_box yui-ac-input\\\" onfocus=\\\"hs_q1(this,true)\\\" onblur=\\\"hs_q1(this,false)\\\" autocomplete=\\\"off\\\" value=\\\"\\\" style=\\\"color: rgb(153, 153, 153); \\\">\\n      <div id=\\\"hlGlobalACContainer\\\" class=\\\"hl_autocomplete yui-ac-container\\\" style=\\\"margin-left:-1px;\\\"><div class=\\\"yui-ac-content\\\" style=\\\"display: none; \\\"><div class=\\\"yui-ac-hd\\\" style=\\\"display: none; \\\"></div><div class=\\\"yui-ac-bd\\\"><ul><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li></ul></div><div class=\\\"yui-ac-ft\\\" style=\\\"display: none; \\\"></div></div></div>\\n    </div>\\n    <input id=\\\"searchButton\\\" type=\\\"submit\\\" class=\\\"button\\\" style=\\\"width:76px;background-repeat:no-repeat;\\\" value=\\\"\\\" title=\\\"Search\\\">\\n  </form>\\n</div>\\n  \\n  \\n</div>\\n</div>\\n</div>\\n</div></div>\");\n$(\"div.hl_head > div.hl_serp_box_container\").css({\"visibility\":\"hidden\"});\n$(\"div#edit-block-wrapper\").replaceWith(\"<div id=\\\"edit-block-wrapper\\\" style=\\\"height: 250px; width: 660px; \\\">\\n\\n<div class=\\\"hl_serp_box_container\\\" style=\\\"height:64px;\\\">\\n\\n              \\n<div style=\\\"padding:0px 0px 0px 12px;margin-top:10px;\\\">\\n  <form name=\\\"sf1\\\" action=\\\"http://www.healthline.com/search\\\" method=\\\"get\\\" onsubmit=\\\"this.q1.value=this.q1.value==df?dq:this.q1.value;ntptAddPair('search_term',this.q1.value);return ntptSubmitTag(this,'ev=formsubmit&amp;form=sf1');\\\">\\n    <div id=\\\"globalACDiv\\\" class=\\\"hl_serp_box_wrapper yui-ac\\\" style=\\\"position:relative;height:17px;\\\">\\n      <input id=\\\"hlGlobalInput\\\" tabindex=\\\"1\\\" name=\\\"q1\\\" type=\\\"text\\\" class=\\\"hl_serp_box yui-ac-input\\\" onfocus=\\\"hs_q1(this,true)\\\" onblur=\\\"hs_q1(this,false)\\\" autocomplete=\\\"off\\\" value=\\\"\\\" style=\\\"color: rgb(153, 153, 153); \\\">\\n      <div id=\\\"hlGlobalACContainer\\\" class=\\\"hl_autocomplete yui-ac-container\\\" style=\\\"margin-left:-1px;\\\"><div class=\\\"yui-ac-content\\\" style=\\\"display: none; \\\"><div class=\\\"yui-ac-hd\\\" style=\\\"display: none; \\\"></div><div class=\\\"yui-ac-bd\\\"><ul><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li><li style=\\\"display: none; \\\"></li></ul></div><div class=\\\"yui-ac-ft\\\" style=\\\"display: none; \\\"></div></div></div>\\n    </div>\\n    <input id=\\\"searchButton\\\" type=\\\"submit\\\" class=\\\"button\\\" style=\\\"width:76px;background-repeat:no-repeat;\\\" value=\\\"\\\" title=\\\"Search\\\">\\n  </form>\\n</div>\\n  \\n  \\n</div>\\n</div>\");", 
      "name": "Variation #1"
    }, 
    "8711836": {
      "code": "$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.storyArea > p:eq(1)\").css({\"display\":\"none\"});\n$(\"div.storyArea > h1:eq(0)\").css({\"display\":\"none\"});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea\").replaceWith(\"<div style='background-image: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png); background-attachment: scroll; background-origin: initial; background-clip: initial; background-color: transparent; background-position: 0% 0%; background-repeat: no-repeat no-repeat; ' class='box quaternary'><div class='storyArea'><h1>Head Back to School With Confidence</h1><p style='margin-right:40px; line-height:20px; font-weight: normal;'>There are always mixed emotions sending your child back to school at the end of each summer. We\u2019ve got plenty of great articles to help prepare you and your favorite student for a brand new school year.</p><ul><li><a href='http://www.healthline.com/health-feature/school-health-tips' title='Stay Healthy at School'><strong>Back-to-School Health Tips</strong></a></li><li><strong><a href='http://www.healthline.com/health-feature/backpack-safety-tips' title='Backpack Safety'>Backpack Safety</a><br></strong></li><li><a href='http://www.healthline.com/health-feature/how-to-stop-bullying' title='How to Stop Bullies'><strong>Bullying Prevention Clinic</strong></a></li><li><a href='http://www.healthline.com/health-feature/cyberbullying' title='Cyberbullying Information'><strong>Cyberbullying 101</strong></a></li></ul><div style='margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);'>More Slideshows</div><div style='margin-top: 10px;'><div style='position: relative; z-index: 3171010; '><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/foods-for-healthy-skin' ><img src='//cdn.optimizely.com/img/3613006/b0b10f0993a74b90abace329768a2281.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/foods-for-healthy-skin' style='font-weight: bold;'>10 Foods for Healthy Skin</a></div></div><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/celebrities-with-hiv' ><img src='http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/celebrities-with-hiv' style='font-weight: bold;'>Famous Faces of HIV &amp; AIDS</a></div></div><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/healthy-places'  ><img src='//cdn.optimizely.com/img/3613006/25c1d0c692c7405db87762f74eae07d2.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/healthy-places' style='font-weight: bold;'>Best Places to Visit for a Healthier You</a></div></div><div style='float: left; clear: none; width: 118px;'><div><a href='http://www.healthline.com/health-slideshow/alzheimers-symptoms' ><img src='//cdn.optimizely.com/img/3613006/b6abf6588fab4fdd801c870572e25f89.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/alzheimers-symptoms' style='font-weight: bold;'>Symptoms of Alzheimer\u2019s Disease</a></div></div><div style='clear: both;'></div></div></div></div></div>\");\n$(\"div.geShareTool\").css({\"display\":\"none\"});\n$(\"div.quaternary\").css(\"width\",\"auto\");\n$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css(\"float\",\"right\");\n$(\"div.storyArea\").css(\"width\",\"640px\");\n$(\"div.slideshow > div.quaternary\").css({\"background\":\"none\",\"border\":\"none\"});\n$(\"div.quaternary > div.top\").css({\"display\":\"none\"});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css(\"margin-top\",\"20px\");\n$(\"div.senary\").css({\"width\":629,\"margin-left\":\"15px\"});\n$(\"div.storyArea\").css(\"margin-left\",\"15px\");\n$(\"div.storyArea\").css({\"float\":\"right\",\"margin-left\":\"330px\"});\n$(\"div#rightRail\").css({\"width\":\"0px\",\"height\":\"0px\",\"left\":\"-940px\",\"top\":\"150px\",\"position\":\"relative\",\"z-index\":\"20\"});\n$(\"div.slideshow\").css({\"width\":\"975px\"});\n$(\"div.contentHeader\").css({\"margin-left\":\"15px\"});\n$(\"div.byBlock\").css({\"margin-left\":\"10px\",\"width\":\"960px\"});\n$(\"div.byline\").css({\"margin-left\":\"15px\"});\n$(\"div.hBlock > div.box\").css(\"height\",\"373px\");\n$(\"div.box > div.storyArea\").css({\"position\":\"relative\", \"left\":-1, \"top\":-9});", 
      "name": "move ad to center"
    }, 
    "8766884": {
      "name": "Original Page"
    }, 
    "8860906": {
      "name": "Variation #1"
    }, 
    "8893772": {
      "name": "Original Page"
    }, 
    "9050668": {
      "code": "$(\"div.hBlock > div.imageArea > img:eq(0)\").css({\"display\":\"none\"});\n$(\"div.storyArea > p:eq(1)\").css({\"display\":\"none\"});\n$(\"div.storyArea > h1:eq(0)\").css({\"display\":\"none\"});\n$(\"ul.pageNav\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css({\"display\":\"none\"});\n$(\"div.hBlock > div.imageArea\").replaceWith(\"<div style='background-image: url(http://cdn.optimizely.com/img/3613006/cfb15896f1a545899968e85f9a4a933b.png); background-attachment: scroll; background-origin: initial; background-clip: initial; background-color: transparent; background-position: 0% 0%; background-repeat: no-repeat no-repeat; ' class='box quaternary'><div class='storyArea'><h1>Head Back to School With Confidence</h1><p style='margin-right:40px; line-height:20px; font-weight: normal;'>There are always mixed emotions sending your child back to school at the end of each summer. We\u2019ve got plenty of great articles to help prepare you and your favorite student for a brand new school year.</p><ul><li><a href='http://www.healthline.com/health-feature/school-health-tips' title='Stay Healthy at School'><strong>Back-to-School Health Tips</strong></a></li><li><strong><a href='http://www.healthline.com/health-feature/backpack-safety-tips' title='Backpack Safety'>Backpack Safety</a><br></strong></li><li><a href='http://www.healthline.com/health-feature/how-to-stop-bullying' title='How to Stop Bullies'><strong>Bullying Prevention Clinic</strong></a></li><li><a href='http://www.healthline.com/health-feature/cyberbullying' title='Cyberbullying Information'><strong>Cyberbullying 101</strong></a></li></ul><div style='margin-top: 15px; font-size: 15px; font-weight: bold; color: rgb(200, 63, 31);'>More Slideshows</div><div style='margin-top: 10px;'><div style='position: relative; z-index: 3171010; '><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/foods-for-healthy-skin' ><img src='//cdn.optimizely.com/img/3613006/b0b10f0993a74b90abace329768a2281.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/foods-for-healthy-skin' style='font-weight: bold;'>10 Foods for Healthy Skin</a></div></div><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/celebrities-with-hiv' ><img src='http://www.healthline.com/hlcmsresource/images/slideshow/celebrities-with-aids/110x90_celebrity-HIV.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/celebrities-with-hiv' style='font-weight: bold;'>Famous Faces of HIV &amp; AIDS</a></div></div><div style='float: left; clear: none; width: 118px; margin-right: 10px; padding-right: 10px; border-right: 1px dotted rgb(204, 204, 204);'><div><a href='http://www.healthline.com/health-slideshow/healthy-places'  ><img src='//cdn.optimizely.com/img/3613006/25c1d0c692c7405db87762f74eae07d2.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/healthy-places' style='font-weight: bold;'>Best Places to Visit for a Healthier You</a></div></div><div style='float: left; clear: none; width: 118px;'><div><a href='http://www.healthline.com/health-slideshow/alzheimers-symptoms' ><img src='//cdn.optimizely.com/img/3613006/b6abf6588fab4fdd801c870572e25f89.jpg' alt='' style='padding: 3px; border: 1px solid rgb(204, 204, 204);'></a></div><div style='margin-top: 5px;'><a href='http://www.healthline.com/health-slideshow/alzheimers-symptoms' style='font-weight: bold;'>Symptoms of Alzheimer\u2019s Disease</a></div></div><div style='clear: both;'></div></div></div></div></div>\");\n$(\"div.geShareTool\").css({\"display\":\"none\"});\n$(\"div.quaternary\").css(\"width\",\"auto\");\n$(\"div#clinicalAppCallout\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css(\"float\",\"right\");\n$(\"div.storyArea\").css(\"width\",\"640px\");\n$(\"div.slideshow > div.quaternary\").css({\"background\":\"none\",\"border\":\"none\"});\n$(\"div.quaternary > div.top\").css({\"display\":\"none\"});\n$(\"div.quaternary > div.bottom\").css({\"display\":\"none\"});\n$(\"div.storyArea\").css(\"margin-top\",\"20px\");\n$(\"div.senary\").css({\"width\":629,\"margin-left\":\"15px\"});\n$(\"div.storyArea\").css(\"margin-left\",\"15px\");\n$(\"div.storyArea\").css({\"float\":\"right\",\"margin-left\":\"330px\"});\n$(\"div#rightRail\").css({\"width\":\"0px\",\"height\":\"0px\",\"left\":\"-940px\",\"top\":\"150px\",\"position\":\"relative\",\"z-index\":\"20\"});\n$(\"div.slideshow\").css({\"width\":\"975px\"});\n$(\"div.contentHeader\").css({\"margin-left\":\"15px\"});\n$(\"div.byBlock\").css({\"margin-left\":\"10px\",\"width\":\"960px\"});\n$(\"div.byline\").css({\"margin-left\":\"15px\"});\n$(\"div.hBlock > div.box\").css(\"height\",\"373px\");\n$(\"div.box > div.storyArea\").css({\"position\":\"relative\", \"left\":-1, \"top\":-9});\n$(\"div.senary\").css({\"display\":\"none\"});", 
      "name": "move ad to center and remove bottom"
    }, 
    "9201141": {
      "code": "/* _optimizely_evaluate=force */\nwindow.optimizelySaysOk = false;\n/* _optimizely_evaluate=safe */\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\")", 
      "name": "Variation #1"
    }, 
    "9206143": {
      "name": "Original Page"
    }, 
    "9213092": {
      "code": "$(\"div#node-79 div.field-item\").replaceWith(\"<div class=\\\"field-item even\\\" property=\\\"content:encoded\\\"><!--smart_paging_autop_filter-->Combination therapy is using more than one treatment method to address depression symptoms. Dozens of methods exist because there is no consensus on either the cause or the best approach to treating depression..<a href=\\\"/combination-therapy\\\" class=\\\"learnmore\\\">Learn More</a></div>\");", 
      "name": "Variation #1"
    }, 
    "9628499": {
      "name": "Original Page"
    }, 
    "9641298": {
      "code": "/* _optimizely_evaluate=force */\nwindow.optimizelySaysOk = false;\n/* _optimizely_evaluate=safe */\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\")\n$(\"div#page_1 > p:eq(4)\").replaceWith(\"<p>Most people with asthma have wheezing attacks separated by symptom-free periods. Some patients have long-term shortness of breath with episodes of increased shortness of breath. In others, a cough may be the main symptom. Asthma attacks can last minutes to days and can become dangerous if the airflow becomes severely restricted..</p>\");", 
      "name": "Variation #1"
    }, 
    "10243881": {
      "code": "$(\"div#ads-box-header-wsl1\").css({\"display\":\"none\"});\n$(\"div.textArea > p:eq(1)\").replaceWith(\"<p><strong>Asthma</strong> (also called <strong>bronchial asthma</strong>) is a chronic lung disease that affects more than 22 million people in the United States. <strong>Asthma symptoms</strong> include coughing, wheezing, difficulty breathing, and tightness in the chest. Asthma affects people of all ages but often starts during childhood. Asthma in children (pediatric asthma) affects approximately 7 million American children.</p>\");", 
      "name": "Variation #1"
    }, 
    "10247828": {
      "name": "Variation #2"
    }, 
    "10265245": {
      "name": "Original Page"
    }, 
    "10265249": {
      "name": "Variation #3"
    }, 
    "10349468": {
      "name": "Original Page"
    }, 
    "10351369": {
      "code": "$(\"div.textArea > p:eq(1)\").replaceWith(\"<p>\\nFinding the source of your insomnia, who to consult about it, and how it can be prevented is the key to treating it properly so you can rest easy at night. </p>\");", 
      "name": "Variation #1"
    }, 
    "10351975": {
      "name": "Original Page"
    }, 
    "10352308": {
      "name": "Variation #3"
    }, 
    "10370254": {
      "name": "Variation #1"
    }, 
    "10540622": {
      "code": "$(\"div#marketplace-wrapper\").css({\"display\":\"none\"});\n$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});", 
      "name": "MR2 Removed"
    }, 
    "10561477": {
      "code": "$(\"div.dfp-ws\").css({\"display\":\"none\"});\n$(\"div#ads-box-header-wsl1\").css({\"display\":\"none\"});", 
      "name": "WSL Removed"
    }, 
    "10565385": {
      "code": "$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});\n$(\"div#DFPAD_MR\").css({\"display\":\"none\"});\n$(\"div.ads-box-header\").css({\"display\":\"none\"});", 
      "name": "MR1, MR2 Removed"
    }, 
    "10565398": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});\n\n$(\"div#leftRail\").replaceWith(\"<div id=\\\"leftRail\\\" class=\\\"size165\\\">\\n    <div class=\\\"box primary\\\">\\n    <div class=\\\"top\\\">&nbsp;</div>\\n    <h2>\\n      <span style=\\\"\\\">Asthma Home\\n          </span>\\n    </h2>\\n    <ul>\\n      <li><a title=\\\"Overview\\\" href=\\\"http://www.healthline.com/health/asthma-overview-types-of-asthma\\\">Overview</a></li>\\n      <li><a title=\\\"Symptoms\\\" href=\\\"http://www.healthline.com/health/asthma-symptoms\\\">Symptoms</a></li>\\n      <li><a title=\\\"Causes\\\" href=\\\"http://www.healthline.com/health/asthma-causes\\\">Causes</a></li>\\n      <li><a title=\\\"Risk Factors\\\" href=\\\"http://www.healthline.com/health/asthma-risk-factors\\\">Risk Factors</a></li>\\n      <li><a title=\\\"Diagnosis\\\" href=\\\"http://www.healthline.com/health/asthma-diagnosis\\\">Diagnosis</a></li>\\n      <li><a title=\\\"Tests\\\" href=\\\"http://www.healthline.com/health/asthma-tests\\\">Tests</a></li>\\n      <li><a title=\\\"Treatments\\\" href=\\\"http://www.healthline.com/health/asthma-treatments\\\">Treatments</a></li>\\n      <li><a title=\\\"Alternative Treatments\\\" href=\\\"http://www.healthline.com/health/natural-asthma-treatment-and-alternative-therapies\\\">Alternative Treatments</a></li>\\n      <li><a title=\\\"Drugs\\\" href=\\\"http://www.healthline.com/health/asthma-medication-and-drugs\\\">Drugs</a></li>\\n      <li><a title=\\\"Complications\\\" href=\\\"http://www.healthline.com/health/asthma-complications\\\">Complications</a></li>\\n      <li><a title=\\\"Prevention\\\" href=\\\"http://www.healthline.com/health/asthma-prevention\\\">Prevention</a></li>\\n      <li class=\\\"noBorder\\\"><a title=\\\"Doctors\\\" href=\\\"http://www.healthline.com/health/asthma-doctors\\\">Doctors</a></li>\\n      </ul>\\n\\n    <!-- Resources -->\\n    <!--controller class: CmsResourcesLhsTileController.java-->\\n<h3 class=\\\"plain\\\"><span>Asthma Resources</span></h3>\\n  <ul class=\\\"noBorder noMarginTop\\\">\\n    <li><a title=\\\"Asthma&nbsp;News\\\" href=\\\"http://www.healthline.com/news/asthma\\\">News</a></li>\\n    <li><a title=\\\"Asthma&nbsp;Videos\\\" href=\\\"http://www.healthline.com/health/asthma/videos\\\">Videos</a></li>\\n    <li><a title=\\\"Asthma&nbsp;Images\\\" href=\\\"http://www.healthline.com/health/asthma/images\\\">Images</a></li>\\n    <li class=\\\"noBorder\\\"><a title=\\\"Asthma&nbsp;Articles\\\" href=\\\"http://www.healthline.com/health/asthma/articles\\\">Articles</a></li>\\n    </ul>\\n<div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\\n<!-- In Depth -->\\n\\n\\n      </div>\");\n$(\"div#marketplace-wrapper\").css({\"display\":\"none\"});\n$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});", 
      "name": "LB1 Moved, WSL and MR2 Removed"
    }, 
    "10569877": {
      "code": "$(\"div.dfp-ws\").css({\"display\":\"none\"});\n$(\"div#ads-box-header-wsl1\").css({\"display\":\"none\"});\n\n\n$(\"div#ad-anchor\").css({\"display\":\"none\"});", 
      "name": "WSL, MR1, MR2 Removed"
    }, 
    "10574229": {
      "name": "Original Page"
    }, 
    "10578096": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});", 
      "name": "LB1 Moved"
    }, 
    "10949226": {
      "code": "/* _optimizely_evaluate=force */\nwindow.optimizelySaysOk = false;\n/* _optimizely_evaluate=safe */\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\")\n$(\"div#page_1 > p:eq(4)\").replaceWith(\"<p>Most people with asthma have wheezing attacks separated by symptom-free periods. Some patients have long-term shortness of breath with episodes of increased shortness of breath. In others, a cough may be the main symptom. Asthma attacks can last minutes to days and can become dangerous if the airflow becomes severely restricted..</p>\");", 
      "name": "without navigator"
    }, 
    "10971683": {
      "name": "Original Page"
    }, 
    "11637938": {
      "code": "$(\"div.dfp-ws\").css({\"display\":\"none\"});\n$(\"div#ads-box-header-wsl1\").css({\"display\":\"none\"});\n\n\n$(\"div#ad-anchor\").css({\"display\":\"none\"});", 
      "name": "WSL, MR1, MR2 Removed"
    }, 
    "11682639": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});", 
      "name": "LB1 Moved"
    }, 
    "11683430": {
      "code": "$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});\n$(\"div#DFPAD_MR\").css({\"display\":\"none\"});\n$(\"div.ads-box-header\").css({\"display\":\"none\"});", 
      "name": "MR1, MR2 Removed"
    }, 
    "11685834": {
      "name": "Original Page"
    }, 
    "11688901": {
      "code": "$(\"div.dfp-ws\").css({\"display\":\"none\"});\n$(\"div#ads-box-header-wsl1\").css({\"display\":\"none\"});", 
      "name": "WSL Removed"
    }, 
    "11692279": {
      "code": "$(\"div#hlmenus\").after(\"<div id='test' width='auto' height='auto'><p></p>\");\n\n$(\"div.middle\").css({\"display\":\"none\"});\n$(\"div.hl_serp_box_container\").css({\"position\":\"relative\", \"left\":282, \"top\":6});\n$(\"div.reg-links\").css({\"position\":\"relative\", \"left\":0, \"top\":-6});\n$(\"div.date-ctr\").css({\"position\":\"relative\", \"left\":-169, \"top\":-26});\n\n$(\"div#test > p:eq(0)\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" />\");\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-319, \"top\":3});\n$(\"div#adTop div.dfp-lb\").css({\"position\":\"relative\", \"left\":138, \"top\":202});\n$(\"div#adTop div.dfp-lb\").css({\"left\":119, \"top\":204});\n\n$(\"div#navTop\").css({\"width\":980, \"height\":216});\n$(\"div#navTopBottom\").css({\"display\":\"none\"});\n$(\"div#postNavTop\").css({\"display\":\"none\"});\n\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":982, \"height\":10});\n$(\"div#adTop div.dfp-lb\").css({\"left\":120, \"top\":121});\n$(\"div#test > p:eq(0) > img:eq(0)\").css({\"left\":-380, \"top\":2});\n$(\"div.date-ctr\").css({\"left\":-287, \"top\":-28});\n$(\"div.reg-links\").css({\"left\":1, \"top\":-18});\n$(\"div#navTop > div.top > div:eq(0) > a:eq(0) > img:eq(0)\").css({\"position\":\"relative\", \"left\":-3, \"top\":-7});\n$(\"div#hlmenus > div.bd\").css({\"z-index\":2147483645, \"position\":\"relative\"});\n$(\"div#adTop > div.dfp-lb-wrapper\").css({\"width\":984, \"height\":10});\n$(\"div#test > p:eq(0) > img:eq(0)\").replaceWith(\"<a href=\\\"http://www.healthline.com/human-body-maps\\\" >\\n\\n<img src=\\\"//cdn.optimizely.com/img/3613006/840b675771da4b178d5264148f009175.jpg\\\" style=\\\"position: relative; left: -380px; top: 2px; \\\">\\n  \\n</a>\");\n\n$(\"div.hl_serp_box_container\").css({\"background-image\":\"url(//cdn.optimizely.com/img/3613006/c8346403d3e844029998848c0d5c4df3.jpg)\"});\n$(\"div.hl_serp_box_container\").css({\"left\":262, \"top\":4});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-378, \"top\":2});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").attr({\"src\":\"//cdn.optimizely.com/img/3613006/ffaf065bf0d344e1b1c9c2ef1c67c254.jpg\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"height\":\"auto\", \"width\":\"auto\"});\n$(\"div#test > p:eq(0) > a:eq(0) > img:eq(0)\").css({\"left\":-381, \"top\":2});\n\n$(\"div#leftRail\").replaceWith(\"<div id=\\\"leftRail\\\" class=\\\"size165\\\">\\n    <div class=\\\"box primary\\\">\\n    <div class=\\\"top\\\">&nbsp;</div>\\n    <h2>\\n      <span style=\\\"\\\">Asthma Home\\n          </span>\\n    </h2>\\n    <ul>\\n      <li><a title=\\\"Overview\\\" href=\\\"http://www.healthline.com/health/asthma-overview-types-of-asthma\\\">Overview</a></li>\\n      <li><a title=\\\"Symptoms\\\" href=\\\"http://www.healthline.com/health/asthma-symptoms\\\">Symptoms</a></li>\\n      <li><a title=\\\"Causes\\\" href=\\\"http://www.healthline.com/health/asthma-causes\\\">Causes</a></li>\\n      <li><a title=\\\"Risk Factors\\\" href=\\\"http://www.healthline.com/health/asthma-risk-factors\\\">Risk Factors</a></li>\\n      <li><a title=\\\"Diagnosis\\\" href=\\\"http://www.healthline.com/health/asthma-diagnosis\\\">Diagnosis</a></li>\\n      <li><a title=\\\"Tests\\\" href=\\\"http://www.healthline.com/health/asthma-tests\\\">Tests</a></li>\\n      <li><a title=\\\"Treatments\\\" href=\\\"http://www.healthline.com/health/asthma-treatments\\\">Treatments</a></li>\\n      <li><a title=\\\"Alternative Treatments\\\" href=\\\"http://www.healthline.com/health/natural-asthma-treatment-and-alternative-therapies\\\">Alternative Treatments</a></li>\\n      <li><a title=\\\"Drugs\\\" href=\\\"http://www.healthline.com/health/asthma-medication-and-drugs\\\">Drugs</a></li>\\n      <li><a title=\\\"Complications\\\" href=\\\"http://www.healthline.com/health/asthma-complications\\\">Complications</a></li>\\n      <li><a title=\\\"Prevention\\\" href=\\\"http://www.healthline.com/health/asthma-prevention\\\">Prevention</a></li>\\n      <li class=\\\"noBorder\\\"><a title=\\\"Doctors\\\" href=\\\"http://www.healthline.com/health/asthma-doctors\\\">Doctors</a></li>\\n      </ul>\\n\\n    <!-- Resources -->\\n    <!--controller class: CmsResourcesLhsTileController.java-->\\n<h3 class=\\\"plain\\\"><span>Asthma Resources</span></h3>\\n  <ul class=\\\"noBorder noMarginTop\\\">\\n    <li><a title=\\\"Asthma&nbsp;News\\\" href=\\\"http://www.healthline.com/news/asthma\\\">News</a></li>\\n    <li><a title=\\\"Asthma&nbsp;Videos\\\" href=\\\"http://www.healthline.com/health/asthma/videos\\\">Videos</a></li>\\n    <li><a title=\\\"Asthma&nbsp;Images\\\" href=\\\"http://www.healthline.com/health/asthma/images\\\">Images</a></li>\\n    <li class=\\\"noBorder\\\"><a title=\\\"Asthma&nbsp;Articles\\\" href=\\\"http://www.healthline.com/health/asthma/articles\\\">Articles</a></li>\\n    </ul>\\n<div class=\\\"bottom\\\">&nbsp;</div>\\n  </div>\\n<!-- In Depth -->\\n\\n\\n      </div>\");\n$(\"div#marketplace-wrapper\").css({\"display\":\"none\"});\n$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});", 
      "name": "LB1 Moved, WSL and MR2 Removed"
    }, 
    "11698231": {
      "code": "$(\"div#marketplace-wrapper\").css({\"display\":\"none\"});\n$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});", 
      "name": "MR2 Removed"
    }, 
    "12033211": {
      "name": "Original Page"
    }, 
    "12034270": {
      "code": "$(\"div#ad-anchor\").css({\"position\":\"relative\", \"left\":0, \"top\":50});\n$(\"div#rightRail > div.borderWhiteBgTanShadow\").css({\"top\":32});\n$(\"div#rightRail > div.borderWhiteBgTanShadow > img:eq(0)\").css({\"position\":\"relative\", \"left\":-2, \"top\":0});\n\n$(\"div#rightRail > div.borderWhiteBgTanShadow\").prepend(\"<img src=\\\"//cdn.optimizely.com/img/3613006/8c3703ea2a95467f8c337e21308c9e5a.jpg\\\" />\");\n$(\"div#rightRail div.borderInside\").css({\"display\":\"none\"});\n$(\"p#newsbubble > span:eq(0)\").css({\"display\":\"none\"});\n$(\"p#newsbubble\").css({\"display\":\"none\"});\n$(\"div#ad-anchor > div:eq(2)\").css({\"display\":\"none\"});\n\n\n\n$(\"div#rightRail > div.borderWhiteBgTanShadow > img:eq(0)\").replaceWith(\"<a href=\\\"/doctors/diabetes___doctors\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/8c3703ea2a95467f8c337e21308c9e5a.jpg\\\"\\n            >\\n</a>\");\n$(\"div#rightRail > div.borderWhiteBgTanShadow > a:eq(0)\").attr({\"href\":\"http://www.surveymonkey.com/s/MQP2BS7\"});\n$(\"div#rightRail > div.borderWhiteBgTanShadow > a:eq(0)\").replaceWith(\"<a href=\\\"http://www.surveymonkey.com/s/MQP2BS7\\\" target=\\\"_blank\\\">\\n<img src=\\\"//cdn.optimizely.com/img/3613006/8c3703ea2a95467f8c337e21308c9e5a.jpg\\\">\\n</a>\");", 
      "name": "survey callout"
    }, 
    "12872344": {
      "name": "Original Page"
    }, 
    "12886360": {
      "code": "$(\"div.textBlock > p:eq(28) > em:eq(0) > a:eq(0)\").attr({\"href\":\"http://www.healthline.com/health/psoriasis/true-stories-call-for-submissions\"});", 
      "name": "Email Page"
    }, 
    "13307930": {
      "code": "$(\"a#lcLILink\").css({\"width\":90, \"height\":17});\n$(\"a#hcLILink\").css({\"width\":88, \"height\":17});\n$(\"a#sxsLILink\").css({\"width\":139, \"height\":17});\n$(\"a#txsLILink\").css({\"width\":129, \"height\":17});\n$(\"a#dxsLILink\").replaceWith(\"<a id=\\\"dxsLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/doctors\\\" style=\\\"border-right: 0px; padding-left: 25px; padding-right: 25px;\\\">&nbsp; &nbsp;Find A Doctor</a>\");\n$(\"a#lcLILink\").replaceWith(\"<a id=\\\"lcLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/health-centers\\\" style=\\\"width: 90px; height: 17px;\\\">&nbsp; &nbsp; &nbsp;Health A to Z</a>\");\n$(\"a#hcLILink\").replaceWith(\"<a id=\\\"hcLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/directory/healthy-living\\\" style=\\\"width: 88px; height: 17px;\\\">&nbsp; &nbsp;Healthy Living</a>\");\n$(\"a#sxsLILink\").replaceWith(\"<a id=\\\"sxsLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/directory/symptoms\\\" style=\\\"width: 139px; height: 17px;\\\">&nbsp; &nbsp; &nbsp;Check Your Symptoms</a>\");\n$(\"a#dxsLILink\").replaceWith(\"<a id=\\\"dxsLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/doctors\\\" style=\\\"border-right: 0px; padding-left: 25px; padding-right: 25px;\\\">&nbsp; &nbsp; &nbsp; &nbsp; Find A Doctor</a>\");\n$(\"a#txsLILink\").css({\"width\":142, \"height\":19});\n$(\"a#txsLILink\").replaceWith(\"<a id=\\\"txsLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/directory/drugstreatments\\\" style=\\\"width: 142px; height: 19px;\\\">&nbsp; &nbsp; &nbsp; Drugs &amp; Treatments</a>\");\n$(\"a#sxsLILink\").replaceWith(\"<a id=\\\"sxsLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/directory/symptoms\\\" style=\\\"width: 139px; height: 17px;\\\">&nbsp; &nbsp; Check Your Symptoms</a>\");\n$(\"a#lcLILink\").replaceWith(\"<a id=\\\"lcLILink\\\" class=\\\"yuimenubaritemlabel yuimenubaritemlabel-hassubmenu\\\" href=\\\"http://www.healthline.com/health-centers\\\" style=\\\"width: 90px; height: 17px;\\\">&nbsp; &nbsp; Health A to Z</a>\");\n$(\"a#sxsLILink\").css({\"width\":145, \"height\":19});\n\n$(\"li#yui-gen0 > a.yuimenubaritemlabel\").css({\"visibility\":\"hidden\"});", 
      "name": "Remove Home"
    }, 
    "13318206": {
      "name": "Original Page"
    }, 
    "13423779": {
      "name": "Variation #1"
    }, 
    "13454208": {
      "name": "Original Page"
    }, 
    "14084469": {
      "name": "Original Page"
    }, 
    "14084470": {
      "code": "$(\"p.textBody\").replaceWith(\"<p class=\\\"textBody\\\">Diabetes learning center, blah, blah</p>\");", 
      "name": "Variation #1"
    }, 
    "14088809": {
      "name": "Variation #2"
    }, 
    "14484594": {
      "name": "Original Page"
    }, 
    "14521523": {
      "name": "Variation #1"
    }, 
    "17575741": {
      "name": "Original Page"
    }, 
    "17604118": {
      "name": "Variation #1"
    }, 
    "20622588": {
      "name": "Original Page"
    }, 
    "20622589": {
      "name": "Variation #1"
    }
  }
};

var optly={Cleanse:{}};optly.Cleanse.each=function(a,d,b){var c=!!Object.prototype.__lookupGetter__,e;for(e in a)if(a.hasOwnProperty(e)){var f=c?a.__lookupGetter__(e):null;d.call(b,e,!f?a[e]:null,f)}};
optly.Cleanse.finish=function(){if(optly.Cleanse.running)optly.Cleanse.running=!1,optly.Cleanse.each(optly.Cleanse.types,function(a,d){Object.prototype.__defineGetter__&&optly.Cleanse.each(optly.Cleanse.getters[a],function(b,c){d.prototype.__defineGetter__(b,c);optly.Cleanse.log("restored getter",a,b)});optly.Cleanse.each(optly.Cleanse.properties[a],function(b,c){d.prototype[b]=c;optly.Cleanse.log("restored property",a,b)})}),optly.Cleanse.log("finish")};
optly.Cleanse.log=function(a,d,b){d?(d=d.replace(/_/g,""),optly.Cleanse.logs.push("Optimizely / Info / Cleanse / "+a+": "+d+"."+b)):optly.Cleanse.logs.push("Optimizely / Info / Cleanse / "+a)};
optly.Cleanse.start=function(){var a=/^https?:\/\/[^\/]*\//.exec(window.location.href);if(!a||!(a[0].indexOf("optimizely")!==-1&&a[0].indexOf("edit")===-1))optly.Cleanse.log("start"),optly.Cleanse.running=!0,optly.Cleanse.each(optly.Cleanse.types,function(a,b){optly.Cleanse.getters[a]={};optly.Cleanse.properties[a]={};optly.Cleanse.each(b.prototype,function(c,e,f){f?(optly.Cleanse.getters[a][c]=f,optly.Cleanse.log("cleansed getter",a,c)):(optly.Cleanse.properties[a][c]=e,optly.Cleanse.log("cleansed property",
a,c));delete b.prototype[c]})})};optly.Cleanse.getters={};optly.Cleanse.logs=[];optly.Cleanse.properties={};optly.Cleanse.types={Object_:Object};window.optly=window.optly||{};window.optly.Cleanse=window.optly.Cleanse||{finish:optly.Cleanse.finish,logs:optly.Cleanse.logs};optly.Cleanse.start();

var $=function(B,o){var r=B.document,J=B.navigator,C=function(){function a(){if(!b.isReady){try{r.documentElement.doScroll("left")}catch(c){setTimeout(a,1);return}b.ready()}}var b=function(c,a){return new b.fn.init(c,a,t)},p=B.jQuery,g=B.$,t,m=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,u=/\S/,k=/^\s+/,z=/\s+$/,e=/\d/,h=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,s=/^[\],:{}\s]*$/,f=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,y=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l=/(?:^|:|,)(?:\s*\[)+/g,
n=/(webkit)[ \/]([\w.]+)/,q=/(opera)(?:.*version)?[ \/]([\w.]+)/,v=/(msie) ([\w.]+)/,d=/(mozilla)(?:.*? rv:([\w.]+))?/,c=/-([a-z]|[0-9])/ig,i=/^-ms-/,A=function(c,a){return(a+"").toUpperCase()},x=J.userAgent,j,w,K=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,D=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};b.fn=b.prototype={constructor:b,init:function(c,a,d){var i;if(!c)return this;if(c.nodeType)return this.context=this[0]=c,this.length=
1,this;if(c==="body"&&!a&&r.body)return this.context=r,this[0]=r.body,this.selector=c,this.length=1,this;if(typeof c==="string")if((i=c.charAt(0)==="<"&&c.charAt(c.length-1)===">"&&c.length>=3?[null,c,null]:m.exec(c))&&(i[1]||!a))if(i[1])return d=(a=a instanceof b?a[0]:a)?a.ownerDocument||a:r,(c=h.exec(c))?b.isPlainObject(a)?(c=[r.createElement(c[1])],b.fn.attr.call(c,a,!0)):c=[d.createElement(c[1])]:(c=b.buildFragment([i[1]],[d]),c=(c.cacheable?b.clone(c.fragment):c.fragment).childNodes),b.merge(this,
c);else{if((a=r.getElementById(i[2]))&&a.parentNode){if(a.id!==i[2])return d.find(c);this.length=1;this[0]=a}this.context=r;this.selector=c;return this}else return!a||a.jquery?(a||d).find(c):this.constructor(a).find(c);else if(b.isFunction(c))return d.ready(c);if(c.selector!==o)this.selector=c.selector,this.context=c.context;return b.makeArray(c,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(c){return c==null?this.toArray():
c<0?this[this.length+c]:this[c]},pushStack:function(c,a,d){var i=this.constructor();b.isArray(c)?F.apply(i,c):b.merge(i,c);i.prevObject=this;i.context=this.context;if(a==="find")i.selector=this.selector+(this.selector?" ":"")+d;else if(a)i.selector=this.selector+"."+a+"("+d+")";return i},each:function(c,a){return b.each(this,c,a)},ready:function(c){b.bindReady();j.done(c);return this},eq:function(c){return c===-1?this.slice(c):this.slice(c,+c+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},
slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(c){return this.pushStack(b.map(this,function(a,d){return c.call(a,d,a)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var c,a,d,i,x,j=arguments[0]||{},A=1,h=arguments.length,e=!1;typeof j==="boolean"&&(e=j,j=arguments[1]||{},A=2);typeof j!=="object"&&!b.isFunction(j)&&(j=
{});h===A&&(j=this,--A);for(;A<h;A++)if((c=arguments[A])!=null)for(a in c)d=j[a],i=c[a],j!==i&&(e&&i&&(b.isPlainObject(i)||(x=b.isArray(i)))?(x?(x=!1,d=d&&b.isArray(d)?d:[]):d=d&&b.isPlainObject(d)?d:{},j[a]=b.extend(e,d,i)):i!==o&&(j[a]=i));return j};b.extend({noConflict:function(c){if(B.$===b)B.$=g;if(c&&B.jQuery===b)B.jQuery=p;return b},isReady:!1,readyWait:1,holdReady:function(c){c?b.readyWait++:b.ready(!0)},ready:function(c){if(c===!0&&!--b.readyWait||c!==!0&&!b.isReady){if(!r.body)return setTimeout(b.ready,
1);b.isReady=!0;c!==!0&&--b.readyWait>0||(j.resolveWith(r,[b]),b.fn.trigger&&b(r).trigger("ready").unbind("ready"))}},bindReady:function(){if(!j){j=b._Deferred();if(r.readyState==="complete")return setTimeout(b.ready,1);if(r.addEventListener)r.addEventListener("DOMContentLoaded",w,!1),B.addEventListener("load",b.ready,!1);else if(r.attachEvent){r.attachEvent("onreadystatechange",w);B.attachEvent("onload",b.ready);var c=!1;try{c=B.frameElement==null}catch(d){}r.documentElement.doScroll&&c&&a()}}},
isFunction:function(c){return b.type(c)==="function"},isArray:Array.isArray||function(c){return b.type(c)==="array"},isWindow:function(c){return c&&typeof c==="object"&&"setInterval"in c},isNaN:function(c){return c==null||!e.test(c)||isNaN(c)},type:function(c){return c==null?String(c):I[K.call(c)]||"object"},isPlainObject:function(c){if(!c||b.type(c)!=="object"||c.nodeType||b.isWindow(c))return!1;try{if(c.constructor&&!E.call(c,"constructor")&&!E.call(c.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(var d in c);
return d===o||E.call(c,d)},isEmptyObject:function(c){for(var a in c)return!1;return!0},error:function(c){throw c;},parseJSON:function(c){if(typeof c!=="string"||!c)return null;c=b.trim(c);if(B.JSON&&B.JSON.parse)return B.JSON.parse(c);if(s.test(c.replace(f,"@").replace(y,"]").replace(l,"")))return(new Function("return "+c))();b.error("Invalid JSON: "+c)},parseXML:function(c){var a,d;try{B.DOMParser?(d=new DOMParser,a=d.parseFromString(c,"text/xml")):(a=new ActiveXObject("Microsoft.XMLDOM"),a.async=
"false",a.loadXML(c))}catch(i){a=o}(!a||!a.documentElement||a.getElementsByTagName("parsererror").length)&&b.error("Invalid XML: "+c);return a},noop:function(){},globalEval:function(c){c&&u.test(c)&&(B.execScript||function(c){B.eval.call(B,c)})(c)},camelCase:function(a){return a.replace(i,"ms-").replace(c,A)},nodeName:function(c,a){return c.nodeName&&c.nodeName.toUpperCase()===a.toUpperCase()},each:function(c,a,d){var i,j=0,A=c.length,x=A===o||b.isFunction(c);if(d)if(x)for(i in c){if(a.apply(c[i],
d)===!1)break}else for(;j<A;){if(a.apply(c[j++],d)===!1)break}else if(x)for(i in c){if(a.call(c[i],i,c[i])===!1)break}else for(;j<A;)if(a.call(c[j],j,c[j++])===!1)break;return c},trim:G?function(c){return c==null?"":G.call(c)}:function(c){return c==null?"":c.toString().replace(k,"").replace(z,"")},makeArray:function(c,a){var d=a||[];if(c!=null){var i=b.type(c);c.length==null||i==="string"||i==="function"||i==="regexp"||b.isWindow(c)?F.call(d,c):b.merge(d,c)}return d},inArray:function(c,a){if(!a)return-1;
if(H)return H.call(a,c);for(var d=0,i=a.length;d<i;d++)if(a[d]===c)return d;return-1},merge:function(c,a){var d=c.length,i=0;if(typeof a.length==="number")for(var j=a.length;i<j;i++)c[d++]=a[i];else for(;a[i]!==o;)c[d++]=a[i++];c.length=d;return c},grep:function(c,a,d){for(var i=[],j,d=!!d,A=0,x=c.length;A<x;A++)j=!!a(c[A],A),d!==j&&i.push(c[A]);return i},map:function(c,a,d){var i,j,A=[],x=0,h=c.length;if(c instanceof b||h!==o&&typeof h==="number"&&(h>0&&c[0]&&c[h-1]||h===0||b.isArray(c)))for(;x<
h;x++)i=a(c[x],x,d),i!=null&&(A[A.length]=i);else for(j in c)i=a(c[j],j,d),i!=null&&(A[A.length]=i);return A.concat.apply([],A)},guid:1,proxy:function(c,a){if(typeof a==="string")var d=c[a],a=c,c=d;if(!b.isFunction(c))return o;var i=D.call(arguments,2),d=function(){return c.apply(a,i.concat(D.call(arguments)))};d.guid=c.guid=c.guid||d.guid||b.guid++;return d},access:function(c,a,d,i,j,A){var x=c.length;if(typeof a==="object"){for(var h in a)b.access(c,h,a[h],i,j,d);return c}if(d!==o){i=!A&&i&&b.isFunction(d);
for(h=0;h<x;h++)j(c[h],a,i?d.call(c[h],h,j(c[h],a)):d,A);return c}return x?j(c[0],a):o},now:function(){return(new Date).getTime()},uaMatch:function(c){c=c.toLowerCase();c=n.exec(c)||q.exec(c)||v.exec(c)||c.indexOf("compatible")<0&&d.exec(c)||[];return{browser:c[1]||"",version:c[2]||"0"}},sub:function(){function c(a,d){return new c.fn.init(a,d)}b.extend(!0,c,this);c.superclass=this;c.fn=c.prototype=this();c.fn.constructor=c;c.sub=this.sub;c.fn.init=function(d,i){i&&i instanceof b&&!(i instanceof c)&&
(i=c(i));return b.fn.init.call(this,d,i,a)};c.fn.init.prototype=c.fn;var a=c(r);return c},browser:{}});b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(c,a){I["[object "+a+"]"]=a.toLowerCase()});x=b.uaMatch(x);if(x.browser)b.browser[x.browser]=!0,b.browser.version=x.version;if(b.browser.webkit)b.browser.safari=!0;u.test("\u00a0")&&(k=/^[\s\xA0]+/,z=/[\s\xA0]+$/);t=b(r);r.addEventListener?w=function(){r.removeEventListener("DOMContentLoaded",w,!1);b.ready()}:r.attachEvent&&
(w=function(){r.readyState==="complete"&&(r.detachEvent("onreadystatechange",w),b.ready())});return b}();(function(a){var b="done fail isResolved isRejected promise then always pipe".split(" "),p=[].slice;a.extend({_Deferred:function(){var b=[],p,m,u,k={done:function(){if(!u){var m=arguments,e,h,s,f,y;p&&(y=p,p=0);for(e=0,h=m.length;e<h;e++)s=m[e],f=a.type(s),f==="array"?k.done.apply(k,s):f==="function"&&b.push(s);y&&k.resolveWith(y[0],y[1])}return this},resolveWith:function(a,e){if(!u&&!p&&!m){e=
e||[];m=1;try{for(;b[0];)b.shift().apply(a,e)}finally{p=[a,e],m=0}}return this},resolve:function(){k.resolveWith(this,arguments);return this},isResolved:function(){return!(!m&&!p)},cancel:function(){u=1;b=[];return this}};return k},Deferred:function(p){var t=a._Deferred(),m=a._Deferred(),u;a.extend(t,{then:function(a,b){t.done(a).fail(b);return this},always:function(){return t.done.apply(t,arguments).fail.apply(this,arguments)},fail:m.done,rejectWith:m.resolveWith,reject:m.resolve,isRejected:m.isResolved,
pipe:function(b,m){return a.Deferred(function(e){a.each({done:[b,"resolve"],fail:[m,"reject"]},function(h,s){var f=s[0],b=s[1],l;if(a.isFunction(f))t[h](function(){if((l=f.apply(this,arguments))&&a.isFunction(l.promise))l.promise().then(e.resolve,e.reject);else e[b+"With"](this===t?e:this,[l])});else t[h](e[b])})}).promise()},promise:function(a){if(a==null){if(u)return u;u=a={}}for(var m=b.length;m--;)a[b[m]]=t[b[m]];return a}});t.done(m.cancel).fail(t.cancel);delete t.cancel;p&&p.call(t,t);return t},
when:function(b){function t(a){return function(s){m[a]=arguments.length>1?p.call(arguments,0):s;--o||e.resolveWith(e,p.call(m,0))}}var m=arguments,u=0,k=m.length,o=k,e=k<=1&&b&&a.isFunction(b.promise)?b:a.Deferred();if(k>1){for(;u<k;u++)m[u]&&a.isFunction(m[u].promise)?m[u].promise().then(t(u),e.reject):--o;o||e.resolveWith(e,m)}else e!==b&&e.resolveWith(e,k?[b]:[]);return e.promise()}})})(C);(function(a){a.support=function(){var b=r.createElement("div"),p=r.documentElement,g,t,m,u,k,o;b.setAttribute("className",
"t");b.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";g=b.getElementsByTagName("*");t=b.getElementsByTagName("a")[0];if(!g||!g.length||!t)return{};m=r.createElement("select");u=m.appendChild(r.createElement("option"));g=b.getElementsByTagName("input")[0];k={leadingWhitespace:b.firstChild.nodeType===3,tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/top/.test(t.getAttribute("style")),
hrefNormalized:t.getAttribute("href")==="/a",opacity:/^0.55$/.test(t.style.opacity),cssFloat:!!t.style.cssFloat,checkOn:g.value==="on",optSelected:u.selected,getSetAttribute:b.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0};g.checked=!0;k.noCloneChecked=g.cloneNode(!0).checked;m.disabled=!0;k.optDisabled=!u.disabled;try{delete b.test}catch(e){k.deleteExpando=!1}!b.addEventListener&&
b.attachEvent&&b.fireEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).fireEvent("onclick"));g=r.createElement("input");g.value="t";g.setAttribute("type","radio");k.radioValue=g.value==="t";g.setAttribute("checked","checked");b.appendChild(g);t=r.createDocumentFragment();t.appendChild(b.firstChild);k.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked;b.innerHTML="";b.style.width=b.style.paddingLeft="1px";m=r.getElementsByTagName("body")[0];t=r.createElement(m?
"div":"body");u={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};m&&a.extend(u,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in u)t.style[o]=u[o];t.appendChild(b);p=m||p;p.insertBefore(t,p.firstChild);k.appendChecked=g.checked;k.boxModel=b.offsetWidth===2;if("zoom"in b.style)b.style.display="inline",b.style.zoom=1,k.inlineBlockNeedsLayout=b.offsetWidth===2,b.style.display="",b.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=b.offsetWidth!==2;b.innerHTML=
"<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";m=b.getElementsByTagName("td");g=m[0].offsetHeight===0;m[0].style.display="";m[1].style.display="none";k.reliableHiddenOffsets=g&&m[0].offsetHeight===0;b.innerHTML="";if(r.defaultView&&r.defaultView.getComputedStyle)g=r.createElement("div"),g.style.width="0",g.style.marginRight="0",b.appendChild(g),k.reliableMarginRight=(parseInt((r.defaultView.getComputedStyle(g,null)||{marginRight:0}).marginRight,10)||0)===0;t.innerHTML=
"";p.removeChild(t);if(b.attachEvent)for(o in{submit:1,change:1,focusin:1})p="on"+o,g=p in b,g||(b.setAttribute(p,"return;"),g=typeof b[p]==="function"),k[o+"Bubbles"]=g;t=t=m=u=m=g=b=g=null;return k}();a.boxModel=a.support.boxModel})(C);(function(a){function b(b,p,k){if(k===o&&b.nodeType===1)if(k="data-"+p.replace(t,"-$1").toLowerCase(),k=b.getAttribute(k),typeof k==="string"){try{k=k==="true"?!0:k==="false"?!1:k==="null"?null:!a.isNaN(k)?parseFloat(k):g.test(k)?a.parseJSON(k):k}catch(r){}a.data(b,
p,k)}else k=o;return k}function p(a){for(var b in a)if(b!=="toJSON")return!1;return!0}var g=/^(?:\{.*\}|\[.*\])$/,t=/([A-Z])/g;a.extend({cache:{},uuid:0,expando:"jQuery"+(a.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(b){b=b.nodeType?a.cache[b[a.expando]]:b[a.expando];return!!b&&!p(b)},data:function(b,p,k,g){if(a.acceptData(b)){var e=a.expando,h=typeof p==="string",s=b.nodeType,f=s?a.cache:b,y=s?b[a.expando]:
b[a.expando]&&a.expando;if(y&&(!g||!y||!f[y]||f[y][e])||!(h&&k===o)){if(!y)s?b[a.expando]=y=++a.uuid:y=a.expando;if(!f[y]&&(f[y]={},!s))f[y].toJSON=a.noop;if(typeof p==="object"||typeof p==="function")g?f[y][e]=a.extend(f[y][e],p):f[y]=a.extend(f[y],p);b=f[y];g&&(b[e]||(b[e]={}),b=b[e]);k!==o&&(b[a.camelCase(p)]=k);if(p==="events"&&!b[p])return b[e]&&b[e].events;h?(k=b[p],k==null&&(k=b[a.camelCase(p)])):k=b;return k}}},removeData:function(b,g,k){if(a.acceptData(b)){var o,e=a.expando,h=b.nodeType,
s=h?a.cache:b,f=h?b[a.expando]:a.expando;if(s[f]){if(g&&(o=k?s[f][e]:s[f]))if(o[g]||(g=a.camelCase(g)),delete o[g],!p(o))return;if(k&&(delete s[f][e],!p(s[f])))return;g=s[f][e];a.support.deleteExpando||!s.setInterval?delete s[f]:s[f]=null;if(g){s[f]={};if(!h)s[f].toJSON=a.noop;s[f][e]=g}else h&&(a.support.deleteExpando?delete b[a.expando]:b.removeAttribute?b.removeAttribute(a.expando):b[a.expando]=null)}}},_data:function(b,p,g){return a.data(b,p,g,!0)},acceptData:function(b){if(b.nodeName){var p=
a.noData[b.nodeName.toLowerCase()];if(p)return!(p===!0||b.getAttribute("classid")!==p)}return!0}});a.fn.extend({data:function(p,g){var k=null;if(typeof p==="undefined"){if(this.length&&(k=a.data(this[0]),this[0].nodeType===1))for(var t=this[0].attributes,e,h=0,s=t.length;h<s;h++)e=t[h].name,e.indexOf("data-")===0&&(e=a.camelCase(e.substring(5)),b(this[0],e,k[e]));return k}else if(typeof p==="object")return this.each(function(){a.data(this,p)});var f=p.split(".");f[1]=f[1]?"."+f[1]:"";return g===o?
(k=this.triggerHandler("getData"+f[1]+"!",[f[0]]),k===o&&this.length&&(k=a.data(this[0],p),k=b(this[0],p,k)),k===o&&f[1]?this.data(f[0]):k):this.each(function(){var h=a(this),e=[f[0],g];h.triggerHandler("setData"+f[1]+"!",e);a.data(this,p,g);h.triggerHandler("changeData"+f[1]+"!",e)})},removeData:function(b){return this.each(function(){a.removeData(this,b)})}})})(C);(function(a){function b(b,g,t){var m=g+"defer",r=g+"queue",k=g+"mark",z=a.data(b,m,o,!0);z&&(t==="queue"||!a.data(b,r,o,!0))&&(t==="mark"||
!a.data(b,k,o,!0))&&setTimeout(function(){!a.data(b,r,o,!0)&&!a.data(b,k,o,!0)&&(a.removeData(b,m,!0),z.resolve())},0)}a.extend({_mark:function(b,g){b&&(g=(g||"fx")+"mark",a.data(b,g,(a.data(b,g,o,!0)||0)+1,!0))},_unmark:function(p,g,t){p!==!0&&(t=g,g=p,p=!1);if(g){var t=t||"fx",m=t+"mark";(p=p?0:(a.data(g,m,o,!0)||1)-1)?a.data(g,m,p,!0):(a.removeData(g,m,!0),b(g,t,"mark"))}},queue:function(b,g,t){if(b){var g=(g||"fx")+"queue",m=a.data(b,g,o,!0);t&&(!m||a.isArray(t)?m=a.data(b,g,a.makeArray(t),!0):
m.push(t));return m||[]}},dequeue:function(p,g){var g=g||"fx",o=a.queue(p,g),m=o.shift();m==="inprogress"&&(m=o.shift());m&&(g==="fx"&&o.unshift("inprogress"),m.call(p,function(){a.dequeue(p,g)}));o.length||(a.removeData(p,g+"queue",!0),b(p,g,"queue"))}});a.fn.extend({queue:function(b,g){typeof b!=="string"&&(g=b,b="fx");return g===o?a.queue(this[0],b):this.each(function(){var o=a.queue(this,b,g);b==="fx"&&o[0]!=="inprogress"&&a.dequeue(this,b)})},dequeue:function(b){return this.each(function(){a.dequeue(this,
b)})},delay:function(b,g){b=a.fx?a.fx.speeds[b]||b:b;g=g||"fx";return this.queue(g,function(){var o=this;setTimeout(function(){a.dequeue(o,g)},b)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(b){function g(){--k||t.resolveWith(m,[m])}typeof b!=="string"&&(b=o);var b=b||"fx",t=a.Deferred(),m=this,r=m.length,k=1,z=b+"defer",e=b+"queue";b+="mark";for(var h;r--;)if(h=a.data(m[r],z,o,!0)||(a.data(m[r],e,o,!0)||a.data(m[r],b,o,!0))&&a.data(m[r],z,a._Deferred(),!0))k++,h.done(g);
g();return t.promise()}})})(C);(function(a){var b=/[\n\t\r]/g,p=/\s+/,g=/\r/g,t=/^(?:button|input)$/i,m=/^(?:button|input|object|select|textarea)$/i,u=/^a(?:rea)?$/i,k=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,z,e;a.fn.extend({attr:function(h,b){return a.access(this,h,b,!0,a.attr)},removeAttr:function(h){return this.each(function(){a.removeAttr(this,h)})},prop:function(h,b){return a.access(this,h,b,!0,a.prop)},removeProp:function(h){h=
a.propFix[h]||h;return this.each(function(){try{this[h]=o,delete this[h]}catch(a){}})},addClass:function(h){var b,e,g,l,n,q,v;if(a.isFunction(h))return this.each(function(d){a(this).addClass(h.call(this,d,this.className))});if(h&&typeof h==="string"){b=h.split(p);for(e=0,g=this.length;e<g;e++)if(l=this[e],l.nodeType===1)if(!l.className&&b.length===1)l.className=h;else{n=" "+l.className+" ";for(q=0,v=b.length;q<v;q++)~n.indexOf(" "+b[q]+" ")||(n+=b[q]+" ");l.className=a.trim(n)}}return this},removeClass:function(h){var e,
f,g,l,n,q,v;if(a.isFunction(h))return this.each(function(d){a(this).removeClass(h.call(this,d,this.className))});if(h&&typeof h==="string"||h===o){e=(h||"").split(p);for(f=0,g=this.length;f<g;f++)if(l=this[f],l.nodeType===1&&l.className)if(h){n=(" "+l.className+" ").replace(b," ");for(q=0,v=e.length;q<v;q++)n=n.replace(" "+e[q]+" "," ");l.className=a.trim(n)}else l.className=""}return this},toggleClass:function(h,b){var e=typeof h,g=typeof b==="boolean";return a.isFunction(h)?this.each(function(e){a(this).toggleClass(h.call(this,
e,this.className,b),b)}):this.each(function(){if(e==="string")for(var l,n=0,q=a(this),v=b,d=h.split(p);l=d[n++];)v=g?v:!q.hasClass(l),q[v?"addClass":"removeClass"](l);else if(e==="undefined"||e==="boolean")this.className&&a._data(this,"__className__",this.className),this.className=this.className||h===!1?"":a._data(this,"__className__")||""})},hasClass:function(a){for(var a=" "+a+" ",e=0,f=this.length;e<f;e++)if(this[e].nodeType===1&&(" "+this[e].className+" ").replace(b," ").indexOf(a)>-1)return!0;
return!1},val:function(b){var e,f,k=this[0];if(!arguments.length){if(k){if((e=a.valHooks[k.nodeName.toLowerCase()]||a.valHooks[k.type])&&"get"in e&&(f=e.get(k,"value"))!==o)return f;f=k.value;return typeof f==="string"?f.replace(g,""):f==null?"":f}return o}var l=a.isFunction(b);return this.each(function(f){var g=a(this);if(this.nodeType===1&&(f=l?b.call(this,f,g.val()):b,f==null?f="":typeof f==="number"?f+="":a.isArray(f)&&(f=a.map(f,function(a){return a==null?"":a+""})),e=a.valHooks[this.nodeName.toLowerCase()]||
a.valHooks[this.type],!e||!("set"in e)||e.set(this,f,"value")===o))this.value=f})}});a.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(b){var e,f=b.selectedIndex,g=[],l=b.options,b=b.type==="select-one";if(f<0)return null;for(var n=b?f:0,k=b?f+1:l.length;n<k;n++)if(e=l[n],e.selected&&(a.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!a.nodeName(e.parentNode,"optgroup"))){e=
a(e).val();if(b)return e;g.push(e)}return b&&!g.length&&l.length?a(l[f]).val():g},set:function(b,e){var f=a.makeArray(e);a(b).find("option").each(function(){this.selected=a.inArray(a(this).val(),f)>=0});if(!f.length)b.selectedIndex=-1;return f}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(b,s,f,g){var l=b.nodeType;if(!b||l===3||l===8||l===2)return o;if(g&&s in a.attrFn)return a(b)[s](f);if(!("getAttribute"in b))return a.prop(b,
s,f);var n,q;if(g=l!==1||!a.isXMLDoc(b))s=a.attrFix[s]||s,(q=a.attrHooks[s])||(k.test(s)?q=e:z&&(q=z));return f!==o?f===null?(a.removeAttr(b,s),o):q&&"set"in q&&g&&(n=q.set(b,f,s))!==o?n:(b.setAttribute(s,""+f),f):q&&"get"in q&&g&&(n=q.get(b,s))!==null?n:(n=b.getAttribute(s),n===null?o:n)},removeAttr:function(b,e){var f;if(b.nodeType===1&&(e=a.attrFix[e]||e,a.attr(b,e,""),b.removeAttribute(e),k.test(e)&&(f=a.propFix[e]||e)in b))b[f]=!1},attrHooks:{type:{set:function(b,e){if(t.test(b.nodeName)&&b.parentNode)a.error("type property can't be changed");
else if(!a.support.radioValue&&e==="radio"&&a.nodeName(b,"input")){var f=b.value;b.setAttribute("type",e);if(f)b.value=f;return e}}},value:{get:function(b,e){return z&&a.nodeName(b,"button")?z.get(b,e):e in b?b.value:null},set:function(b,e,f){if(z&&a.nodeName(b,"button"))return z.set(b,e,f);b.value=e}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",
frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(b,e,f){var g=b.nodeType;if(!b||g===3||g===8||g===2)return o;var l,n;if(g!==1||!a.isXMLDoc(b))e=a.propFix[e]||e,n=a.propHooks[e];return f!==o?n&&"set"in n&&(l=n.set(b,f,e))!==o?l:b[e]=f:n&&"get"in n&&(l=n.get(b,e))!==null?l:b[e]},propHooks:{tabIndex:{get:function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?parseInt(b.value,10):m.test(a.nodeName)||u.test(a.nodeName)&&a.href?0:o}}}});a.attrHooks.tabIndex=a.propHooks.tabIndex;
e={get:function(b,e){var f;return a.prop(b,e)===!0||(f=b.getAttributeNode(e))&&f.nodeValue!==!1?e.toLowerCase():o},set:function(b,e,f){e===!1?a.removeAttr(b,f):(e=a.propFix[f]||f,e in b&&(b[e]=!0),b.setAttribute(f,f.toLowerCase()));return f}};if(!a.support.getSetAttribute)z=a.valHooks.button={get:function(a,b){var e;return(e=a.getAttributeNode(b))&&e.nodeValue!==""?e.nodeValue:o},set:function(a,b,e){var g=a.getAttributeNode(e);g||(g=r.createAttribute(e),a.setAttributeNode(g));return g.nodeValue=b+
""}},a.each(["width","height"],function(b,e){a.attrHooks[e]=a.extend(a.attrHooks[e],{set:function(a,b){if(b==="")return a.setAttribute(e,"auto"),b}})});a.support.hrefNormalized||a.each(["href","src","width","height"],function(b,e){a.attrHooks[e]=a.extend(a.attrHooks[e],{get:function(a){a=a.getAttribute(e,2);return a===null?o:a}})});if(!a.support.style)a.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||o},set:function(a,b){return a.style.cssText=""+b}};if(!a.support.optSelected)a.propHooks.selected=
a.extend(a.propHooks.selected,{get:function(){return null}});a.support.checkOn||a.each(["radio","checkbox"],function(){a.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}});a.each(["radio","checkbox"],function(){a.valHooks[this]=a.extend(a.valHooks[this],{set:function(b,e){if(a.isArray(e))return b.checked=a.inArray(a(b).val(),e)>=0}})})})(C);(function(a){function b(){return!1}function p(){return!0}function g(d,c,i){var b=a.extend({},i[0]);b.type=d;b.originalEvent=
{};b.liveFired=o;a.event.handle.call(c,b);b.isDefaultPrevented()&&i[0].preventDefault()}function t(d){var c,i,b,e,j,w,h,f,l,g,n,s=[];e=[];j=a._data(this,"events");if(!(d.liveFired===this||!j||!j.live||d.target.disabled||d.button&&d.type==="click")){d.namespace&&(n=RegExp("(^|\\.)"+d.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)"));d.liveFired=this;var k=j.live.slice(0);for(h=0;h<k.length;h++)j=k[h],j.origType.replace(u,"")===d.type?e.push(j.selector):k.splice(h--,1);e=a(d.target).closest(e,
d.currentTarget);for(f=0,l=e.length;f<l;f++){g=e[f];for(h=0;h<k.length;h++)if(j=k[h],g.selector===j.selector&&(!n||n.test(j.namespace))&&!g.elem.disabled){w=g.elem;b=null;if(j.preType==="mouseenter"||j.preType==="mouseleave")d.type=j.preType,(b=a(d.relatedTarget).closest(j.selector)[0])&&a.contains(w,b)&&(b=w);(!b||b!==w)&&s.push({elem:w,handleObj:j,level:g.level})}}for(f=0,l=s.length;f<l;f++){e=s[f];if(i&&e.level>i)break;d.currentTarget=e.elem;d.data=e.handleObj.data;d.handleObj=e.handleObj;n=e.handleObj.origHandler.apply(e.elem,
arguments);if(n===!1||d.isPropagationStopped())if(i=e.level,n===!1&&(c=!1),d.isImmediatePropagationStopped())break}return c}}function m(a,c){return(a&&a!=="*"?a+".":"")+c.replace(z,"`").replace(e,"&")}var u=/\.(.*)$/,k=/^(?:textarea|input|select)$/i,z=/\./g,e=/ /g,h=/[^\w\s.|`]/g,s=function(a){return a.replace(h,"\\$&")};a.event={add:function(d,c,i,e){if(!(d.nodeType===3||d.nodeType===8)){if(i===!1)i=b;else if(!i)return;var x,j;if(i.handler)x=i,i=x.handler;if(!i.guid)i.guid=a.guid++;if(j=a._data(d)){var w=
j.events,h=j.handle;if(!w)j.events=w={};if(!h)j.handle=h=function(c){return typeof a!=="undefined"&&(!c||a.event.triggered!==c.type)?a.event.handle.apply(h.elem,arguments):o};h.elem=d;for(var c=c.split(" "),f,l=0,g;f=c[l++];){j=x?a.extend({},x):{handler:i,data:e};f.indexOf(".")>-1?(g=f.split("."),f=g.shift(),j.namespace=g.slice(0).sort().join(".")):(g=[],j.namespace="");j.type=f;if(!j.guid)j.guid=i.guid;var n=w[f],s=a.event.special[f]||{};if(!n&&(n=w[f]=[],!s.setup||s.setup.call(d,e,g,h)===!1))d.addEventListener?
d.addEventListener(f,h,!1):d.attachEvent&&d.attachEvent("on"+f,h);if(s.add&&(s.add.call(d,j),!j.handler.guid))j.handler.guid=i.guid;n.push(j);a.event.global[f]=!0}d=null}}},global:{},remove:function(d,c,i,e){if(!(d.nodeType===3||d.nodeType===8)){i===!1&&(i=b);var x,j,w=0,h,f,l,g,n,k,q=a.hasData(d)&&a._data(d),v=q&&q.events;if(q&&v){if(c&&c.type)i=c.handler,c=c.type;if(!c||typeof c==="string"&&c.charAt(0)===".")for(x in c=c||"",v)a.event.remove(d,x+c);else{for(c=c.split(" ");x=c[w++];)if(g=x,h=x.indexOf(".")<
0,f=[],h||(f=x.split("."),x=f.shift(),l=RegExp("(^|\\.)"+a.map(f.slice(0).sort(),s).join("\\.(?:.*\\.)?")+"(\\.|$)")),n=v[x])if(i){g=a.event.special[x]||{};for(j=e||0;j<n.length;j++)if(k=n[j],i.guid===k.guid){if(h||l.test(k.namespace))e==null&&n.splice(j--,1),g.remove&&g.remove.call(d,k);if(e!=null)break}if(n.length===0||e!=null&&n.length===1)(!g.teardown||g.teardown.call(d,f)===!1)&&a.removeEvent(d,x,q.handle),delete v[x]}else for(j=0;j<n.length;j++)if(k=n[j],h||l.test(k.namespace))a.event.remove(d,
g,k.handler,j),n.splice(j--,1);if(a.isEmptyObject(v)){if(c=q.handle)c.elem=null;delete q.events;delete q.handle;a.isEmptyObject(q)&&a.removeData(d,o,!0)}}}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(d,c,i,b){var e=d.type||d,j=[],w;e.indexOf("!")>=0&&(e=e.slice(0,-1),w=!0);e.indexOf(".")>=0&&(j=e.split("."),e=j.shift(),j.sort());if(i&&!a.event.customEvent[e]||a.event.global[e]){d=typeof d==="object"?d[a.expando]?d:new a.Event(e,d):new a.Event(e);d.type=e;d.exclusive=w;d.namespace=
j.join(".");d.namespace_re=RegExp("(^|\\.)"+j.join("\\.(?:.*\\.)?")+"(\\.|$)");if(b||!i)d.preventDefault(),d.stopPropagation();if(i){if(!(i.nodeType===3||i.nodeType===8)){d.result=o;d.target=i;c=c!=null?a.makeArray(c):[];c.unshift(d);j=i;b=e.indexOf(":")<0?"on"+e:"";do{w=a._data(j,"handle");d.currentTarget=j;w&&w.apply(j,c);if(b&&a.acceptData(j)&&j[b]&&j[b].apply(j,c)===!1)d.result=!1,d.preventDefault();j=j.parentNode||j.ownerDocument||j===d.target.ownerDocument&&B}while(j&&!d.isPropagationStopped());
if(!d.isDefaultPrevented()){var h,j=a.event.special[e]||{};if((!j._default||j._default.call(i.ownerDocument,d)===!1)&&!(e==="click"&&a.nodeName(i,"a"))&&a.acceptData(i)){try{if(b&&i[e])(h=i[b])&&(i[b]=null),a.event.triggered=e,i[e]()}catch(f){}h&&(i[b]=h);a.event.triggered=o}}return d.result}}else a.each(a.cache,function(){var i=this[a.expando];i&&i.events&&i.events[e]&&a.event.trigger(d,c,i.handle.elem)})}},handle:function(d){var d=a.event.fix(d||B.event),c=((a._data(this,"events")||{})[d.type]||
[]).slice(0),i=!d.exclusive&&!d.namespace,b=Array.prototype.slice.call(arguments,0);b[0]=d;d.currentTarget=this;for(var e=0,j=c.length;e<j;e++){var w=c[e];if(i||d.namespace_re.test(w.namespace)){d.handler=w.handler;d.data=w.data;d.handleObj=w;w=w.handler.apply(this,b);if(w!==o)d.result=w,w===!1&&(d.preventDefault(),d.stopPropagation());if(d.isImmediatePropagationStopped())break}}return d.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(d){if(d[a.expando])return d;for(var c=d,d=a.Event(c),i=this.props.length,b;i;)b=this.props[--i],d[b]=c[b];if(!d.target)d.target=d.srcElement||r;if(d.target.nodeType===3)d.target=d.target.parentNode;if(!d.relatedTarget&&d.fromElement)d.relatedTarget=d.fromElement===d.target?d.toElement:d.fromElement;if(d.pageX==null&&d.clientX!=null)i=d.target.ownerDocument||r,c=i.documentElement,i=i.body,d.pageX=d.clientX+(c&&c.scrollLeft||i&&i.scrollLeft||0)-(c&&c.clientLeft||i&&i.clientLeft||0),d.pageY=
d.clientY+(c&&c.scrollTop||i&&i.scrollTop||0)-(c&&c.clientTop||i&&i.clientTop||0);if(d.which==null&&(d.charCode!=null||d.keyCode!=null))d.which=d.charCode!=null?d.charCode:d.keyCode;if(!d.metaKey&&d.ctrlKey)d.metaKey=d.ctrlKey;if(!d.which&&d.button!==o)d.which=d.button&1?1:d.button&2?3:d.button&4?2:0;return d},guid:1E8,proxy:a.proxy,special:{ready:{setup:a.bindReady,teardown:a.noop},live:{add:function(d){a.event.add(this,m(d.origType,d.selector),a.extend({},d,{handler:t,guid:d.handler.guid}))},remove:function(d){a.event.remove(this,
m(d.origType,d.selector),d)}},beforeunload:{setup:function(d,c,i){if(a.isWindow(this))this.onbeforeunload=i},teardown:function(a,c){if(this.onbeforeunload===c)this.onbeforeunload=null}}}};a.removeEvent=r.removeEventListener?function(a,c,i){a.removeEventListener&&a.removeEventListener(c,i,!1)}:function(a,c,i){a.detachEvent&&a.detachEvent("on"+c,i)};a.Event=function(d,c){if(!this.preventDefault)return new a.Event(d,c);d&&d.type?(this.originalEvent=d,this.type=d.type,this.isDefaultPrevented=d.defaultPrevented||
d.returnValue===!1||d.getPreventDefault&&d.getPreventDefault()?p:b):this.type=d;c&&a.extend(this,c);this.timeStamp=a.now();this[a.expando]=!0};a.Event.prototype={preventDefault:function(){this.isDefaultPrevented=p;var a=this.originalEvent;if(a)a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=p;var a=this.originalEvent;if(a)a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=
p;this.stopPropagation()},isDefaultPrevented:b,isPropagationStopped:b,isImmediatePropagationStopped:b};var f=function(d){var c=d.relatedTarget,i=!1,b=d.type;d.type=d.data;if(c!==this&&(c&&(i=a.contains(this,c)),!i))a.event.handle.apply(this,arguments),d.type=b},y=function(d){d.type=d.data;a.event.handle.apply(this,arguments)};a.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(d,c){a.event.special[d]={setup:function(i){a.event.add(this,c,i&&i.selector?y:f,d)},teardown:function(i){a.event.remove(this,
c,i&&i.selector?y:f)}}});if(!a.support.submitBubbles)a.event.special.submit={setup:function(){if(a.nodeName(this,"form"))return!1;else a.event.add(this,"click.specialSubmit",function(d){var c=d.target,i=a.nodeName(c,"input")||a.nodeName(c,"button")?c.type:"";(i==="submit"||i==="image")&&a(c).closest("form").length&&g("submit",this,arguments)}),a.event.add(this,"keypress.specialSubmit",function(d){var c=d.target,i=a.nodeName(c,"input")||a.nodeName(c,"button")?c.type:"";(i==="text"||i==="password")&&
a(c).closest("form").length&&d.keyCode===13&&g("submit",this,arguments)})},teardown:function(){a.event.remove(this,".specialSubmit")}};if(!a.support.changeBubbles){var l,n=function(d){var c=a.nodeName(d,"input")?d.type:"",i=d.value;if(c==="radio"||c==="checkbox")i=d.checked;else if(c==="select-multiple")i=d.selectedIndex>-1?a.map(d.options,function(c){return c.selected}).join("-"):"";else if(a.nodeName(d,"select"))i=d.selectedIndex;return i},q=function(d,c){var i=d.target,b,e;if(k.test(i.nodeName)&&
!i.readOnly&&(b=a._data(i,"_change_data"),e=n(i),(d.type!=="focusout"||i.type!=="radio")&&a._data(i,"_change_data",e),!(b===o||e===b)))if(b!=null||e)d.type="change",d.liveFired=o,a.event.trigger(d,c,i)};a.event.special.change={filters:{focusout:q,beforedeactivate:q,click:function(d){var c=d.target,i=a.nodeName(c,"input")?c.type:"";(i==="radio"||i==="checkbox"||a.nodeName(c,"select"))&&q.call(this,d)},keydown:function(d){var c=d.target,i=a.nodeName(c,"input")?c.type:"";(d.keyCode===13&&!a.nodeName(c,
"textarea")||d.keyCode===32&&(i==="checkbox"||i==="radio")||i==="select-multiple")&&q.call(this,d)},beforeactivate:function(d){d=d.target;a._data(d,"_change_data",n(d))}},setup:function(){if(this.type==="file")return!1;for(var d in l)a.event.add(this,d+".specialChange",l[d]);return k.test(this.nodeName)},teardown:function(){a.event.remove(this,".specialChange");return k.test(this.nodeName)}};l=a.event.special.change.filters;l.focus=l.beforeactivate}a.support.focusinBubbles||a.each({focus:"focusin",
blur:"focusout"},function(d,c){function i(i){var d=a.event.fix(i);d.type=c;d.originalEvent={};a.event.trigger(d,null,d.target);d.isDefaultPrevented()&&i.preventDefault()}var b=0;a.event.special[c]={setup:function(){b++===0&&r.addEventListener(d,i,!0)},teardown:function(){--b===0&&r.removeEventListener(d,i,!0)}}});a.each(["bind","one"],function(d,c){a.fn[c]=function(i,d,b){var e;if(typeof i==="object"){for(var w in i)this[c](w,d,i[w],b);return this}if(arguments.length===2||d===!1)b=d,d=o;c==="one"?
(e=function(c){a(this).unbind(c,e);return b.apply(this,arguments)},e.guid=b.guid||a.guid++):e=b;if(i==="unload"&&c!=="one")this.one(i,d,b);else{w=0;for(var h=this.length;w<h;w++)a.event.add(this[w],i,e,d)}return this}});a.fn.extend({unbind:function(d,c){if(typeof d==="object"&&!d.preventDefault)for(var i in d)this.unbind(i,d[i]);else{i=0;for(var b=this.length;i<b;i++)a.event.remove(this[i],d,c)}return this},delegate:function(a,c,i,b){return this.live(c,i,b,a)},undelegate:function(a,c,i){return arguments.length===
0?this.unbind("live"):this.die(c,null,i,a)},trigger:function(d,c){return this.each(function(){a.event.trigger(d,c,this)})},triggerHandler:function(d,c){if(this[0])return a.event.trigger(d,c,this[0],!0)},toggle:function(d){var c=arguments,i=d.guid||a.guid++,b=0,e=function(i){var e=(a.data(this,"lastToggle"+d.guid)||0)%b;a.data(this,"lastToggle"+d.guid,e+1);i.preventDefault();return c[e].apply(this,arguments)||!1};for(e.guid=i;b<c.length;)c[b++].guid=i;return this.click(e)},hover:function(a,c){return this.mouseenter(a).mouseleave(c||
a)}});var v={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};a.each(["live","die"],function(d,c){a.fn[c]=function(i,d,e,j){var w=0,h,f,l=j||this.selector,g=j?this:a(this.context);if(typeof i==="object"&&!i.preventDefault){for(h in i)g[c](h,d,i[h],l);return this}if(c==="die"&&!i&&j&&j.charAt(0)===".")return g.unbind(j),this;if(d===!1||a.isFunction(d))e=d||b,d=o;for(i=(i||"").split(" ");(j=i[w++])!=null;)if(h=u.exec(j),f="",h&&(f=h[0],j=j.replace(u,"")),j==="hover")i.push("mouseenter"+
f,"mouseleave"+f);else if(h=j,v[j]?(i.push(v[j]+f),j+=f):j=(v[j]||j)+f,c==="live"){f=0;for(var n=g.length;f<n;f++)a.event.add(g[f],"live."+m(j,l),{data:d,selector:l,handler:e,origType:j,origHandler:e,preType:h})}else g.unbind("live."+m(j,l),e);return this}});a.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(d,c){a.fn[c]=function(a,d){d==
null&&(d=a,a=null);return arguments.length>0?this.bind(c,a,d):this.trigger(c)};a.attrFn&&(a.attrFn[c]=!0)})})(C);(function(){function a(c,a,d,b,e,w){for(var e=0,h=b.length;e<h;e++){var f=b[e];if(f){for(var l=!1,f=f[c];f;){if(f.sizcache===d){l=b[f.sizset];break}if(f.nodeType===1&&!w)f.sizcache=d,f.sizset=e;if(f.nodeName.toLowerCase()===a){l=f;break}f=f[c]}b[e]=l}}}function b(c,a,d,b,j,h){for(var j=0,f=b.length;j<f;j++){var l=b[j];if(l){for(var g=!1,l=l[c];l;){if(l.sizcache===d){g=b[l.sizset];break}if(l.nodeType===
1){if(!h)l.sizcache=d,l.sizset=j;if(typeof a!=="string"){if(l===a){g=!0;break}}else if(e.filter(a,[l]).length>0){g=l;break}}l=l[c]}b[j]=g}}}var p=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,g=0,t=Object.prototype.toString,m=!1,u=!0,k=/\\/g,z=/\W/;[0,0].sort(function(){u=!1;return 0});var e=function(c,a,b,x){var b=b||[],j=a=a||r;if(a.nodeType!==1&&a.nodeType!==9)return[];if(!c||typeof c!=="string")return b;var f,
g,n,k,q,v=!0,o=e.isXML(a),m=[],y=c;do if(p.exec(""),f=p.exec(y))if(y=f[3],m.push(f[1]),f[2]){k=f[3];break}while(f);if(m.length>1&&s.exec(c))if(m.length===2&&h.relative[m[0]])g=d(m[0]+m[1],a);else for(g=h.relative[m[0]]?[a]:e(m.shift(),a);m.length;)c=m.shift(),h.relative[c]&&(c+=m.shift()),g=d(c,g);else if(!x&&m.length>1&&a.nodeType===9&&!o&&h.match.ID.test(m[0])&&!h.match.ID.test(m[m.length-1])&&(f=e.find(m.shift(),a,o),a=f.expr?e.filter(f.expr,f.set)[0]:f.set[0]),a){f=x?{expr:m.pop(),set:l(x)}:e.find(m.pop(),
m.length===1&&(m[0]==="~"||m[0]==="+")&&a.parentNode?a.parentNode:a,o);g=f.expr?e.filter(f.expr,f.set):f.set;for(m.length>0?n=l(g):v=!1;m.length;)f=q=m.pop(),h.relative[q]?f=m.pop():q="",f==null&&(f=a),h.relative[q](n,f,o)}else n=[];n||(n=g);n||e.error(q||c);if(t.call(n)==="[object Array]")if(v)if(a&&a.nodeType===1)for(c=0;n[c]!=null;c++)n[c]&&(n[c]===!0||n[c].nodeType===1&&e.contains(a,n[c]))&&b.push(g[c]);else for(c=0;n[c]!=null;c++)n[c]&&n[c].nodeType===1&&b.push(g[c]);else b.push.apply(b,n);else l(n,
b);k&&(e(k,j,b,x),e.uniqueSort(b));return b};e.uniqueSort=function(c){if(q&&(m=u,c.sort(q),m))for(var a=1;a<c.length;a++)c[a]===c[a-1]&&c.splice(a--,1);return c};e.matches=function(c,a){return e(c,null,null,a)};e.matchesSelector=function(c,a){return e(a,null,null,[c]).length>0};e.find=function(c,a,d){var b;if(!c)return[];for(var e=0,f=h.order.length;e<f;e++){var l,g=h.order[e];if(l=h.leftMatch[g].exec(c)){var n=l[1];l.splice(1,1);if(n.substr(n.length-1)!=="\\"&&(l[1]=(l[1]||"").replace(k,""),b=h.find[g](l,
a,d),b!=null)){c=c.replace(h.match[g],"");break}}}b||(b=typeof a.getElementsByTagName!=="undefined"?a.getElementsByTagName("*"):[]);return{set:b,expr:c}};e.filter=function(c,a,d,b){for(var j,f,l=c,g=[],n=a,k=a&&a[0]&&e.isXML(a[0]);c&&a.length;){for(var s in h.filter)if((j=h.leftMatch[s].exec(c))!=null&&j[2]){var m,q,v=h.filter[s];q=j[1];f=!1;j.splice(1,1);if(q.substr(q.length-1)!=="\\"){n===g&&(g=[]);if(h.preFilter[s])if(j=h.preFilter[s](j,n,d,g,b,k)){if(j===!0)continue}else f=m=!0;if(j)for(var p=
0;(q=n[p])!=null;p++)if(q){m=v(q,j,p,n);var r=b^!!m;d&&m!=null?r?f=!0:n[p]=!1:r&&(g.push(q),f=!0)}if(m!==o){d||(n=g);c=c.replace(h.match[s],"");if(!f)return[];break}}}if(c===l)if(f==null)e.error(c);else break;l=c}return n};e.error=function(c){throw"Syntax error, unrecognized expression: "+c;};var h=e.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(c){return c.getAttribute("href")},type:function(c){return c.getAttribute("type")}},relative:{"+":function(c,a){var d=
typeof a==="string",b=d&&!z.test(a),d=d&&!b;b&&(a=a.toLowerCase());for(var b=0,j=c.length,f;b<j;b++)if(f=c[b]){for(;(f=f.previousSibling)&&f.nodeType!==1;);c[b]=d||f&&f.nodeName.toLowerCase()===a?f||!1:f===a}d&&e.filter(a,c,!0)},">":function(c,a){var d,b=typeof a==="string",j=0,f=c.length;if(b&&!z.test(a))for(a=a.toLowerCase();j<f;j++){if(d=c[j])d=d.parentNode,c[j]=d.nodeName.toLowerCase()===a?d:!1}else{for(;j<f;j++)(d=c[j])&&(c[j]=b?d.parentNode:d.parentNode===a);b&&e.filter(a,c,!0)}},"":function(c,
d,e){var f,j=g++,h=b;typeof d==="string"&&!z.test(d)&&(f=d=d.toLowerCase(),h=a);h("parentNode",d,j,c,f,e)},"~":function(c,d,e){var f,j=g++,h=b;typeof d==="string"&&!z.test(d)&&(f=d=d.toLowerCase(),h=a);h("previousSibling",d,j,c,f,e)}},find:{ID:function(c,a,d){if(typeof a.getElementById!=="undefined"&&!d)return(c=a.getElementById(c[1]))&&c.parentNode?[c]:[]},NAME:function(c,a){if(typeof a.getElementsByName!=="undefined"){for(var d=[],b=a.getElementsByName(c[1]),e=0,f=b.length;e<f;e++)b[e].getAttribute("name")===
c[1]&&d.push(b[e]);return d.length===0?null:d}},TAG:function(c,a){if(typeof a.getElementsByTagName!=="undefined")return a.getElementsByTagName(c[1])}},preFilter:{CLASS:function(c,a,d,b,e,f){c=" "+c[1].replace(k,"")+" ";if(f)return c;for(var f=0,h;(h=a[f])!=null;f++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(c)>=0)?d||b.push(h):d&&(a[f]=!1));return!1},ID:function(c){return c[1].replace(k,"")},TAG:function(c){return c[1].replace(k,"").toLowerCase()},CHILD:function(c){if(c[1]===
"nth"){c[2]||e.error(c[0]);c[2]=c[2].replace(/^\+|\s*/g,"");var a=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(c[2]==="even"&&"2n"||c[2]==="odd"&&"2n+1"||!/\D/.test(c[2])&&"0n+"+c[2]||c[2]);c[2]=a[1]+(a[2]||1)-0;c[3]=a[3]-0}else c[2]&&e.error(c[0]);c[0]=g++;return c},ATTR:function(c,a,d,b,e,f){a=c[1]=c[1].replace(k,"");!f&&h.attrMap[a]&&(c[1]=h.attrMap[a]);c[4]=(c[4]||c[5]||"").replace(k,"");c[2]==="~="&&(c[4]=" "+c[4]+" ");return c},PSEUDO:function(c,a,d,b,j){if(c[1]==="not")if((p.exec(c[3])||"").length>1||
/^\w/.test(c[3]))c[3]=e(c[3],null,null,a);else return c=e.filter(c[3],a,d,1^j),d||b.push.apply(b,c),!1;else if(h.match.POS.test(c[0])||h.match.CHILD.test(c[0]))return!0;return c},POS:function(c){c.unshift(!0);return c}},filters:{enabled:function(c){return c.disabled===!1&&c.type!=="hidden"},disabled:function(c){return c.disabled===!0},checked:function(c){return c.checked===!0},selected:function(c){return c.selected===!0},parent:function(c){return!!c.firstChild},empty:function(c){return!c.firstChild},
has:function(c,a,d){return!!e(d[3],c).length},header:function(c){return/h\d/i.test(c.nodeName)},text:function(c){var a=c.getAttribute("type"),d=c.type;return c.nodeName.toLowerCase()==="input"&&"text"===d&&(a===d||a===null)},radio:function(c){return c.nodeName.toLowerCase()==="input"&&"radio"===c.type},checkbox:function(c){return c.nodeName.toLowerCase()==="input"&&"checkbox"===c.type},file:function(c){return c.nodeName.toLowerCase()==="input"&&"file"===c.type},password:function(c){return c.nodeName.toLowerCase()===
"input"&&"password"===c.type},submit:function(c){var a=c.nodeName.toLowerCase();return(a==="input"||a==="button")&&"submit"===c.type},image:function(c){return c.nodeName.toLowerCase()==="input"&&"image"===c.type},reset:function(c){var a=c.nodeName.toLowerCase();return(a==="input"||a==="button")&&"reset"===c.type},button:function(c){var a=c.nodeName.toLowerCase();return a==="input"&&"button"===c.type||a==="button"},input:function(c){return/input|select|textarea|button/i.test(c.nodeName)},focus:function(c){return c===
c.ownerDocument.activeElement}},setFilters:{first:function(c,a){return a===0},last:function(c,a,d,b){return a===b.length-1},even:function(c,a){return a%2===0},odd:function(c,a){return a%2===1},lt:function(c,a,d){return a<d[3]-0},gt:function(c,a,d){return a>d[3]-0},nth:function(c,a,d){return d[3]-0===a},eq:function(c,a,d){return d[3]-0===a}},filter:{PSEUDO:function(c,a,d,b){var j=a[1],f=h.filters[j];if(f)return f(c,d,a,b);else if(j==="contains")return(c.textContent||c.innerText||e.getText([c])||"").indexOf(a[3])>=
0;else if(j==="not"){a=a[3];d=0;for(b=a.length;d<b;d++)if(a[d]===c)return!1;return!0}else e.error(j)},CHILD:function(a,d){var b=d[1],e=a;switch(b){case "only":case "first":for(;e=e.previousSibling;)if(e.nodeType===1)return!1;if(b==="first")return!0;e=a;case "last":for(;e=e.nextSibling;)if(e.nodeType===1)return!1;return!0;case "nth":var b=d[2],j=d[3];if(b===1&&j===0)return!0;var f=d[0],h=a.parentNode;if(h&&(h.sizcache!==f||!a.nodeIndex)){for(var l=0,e=h.firstChild;e;e=e.nextSibling)if(e.nodeType===
1)e.nodeIndex=++l;h.sizcache=f}e=a.nodeIndex-j;return b===0?e===0:e%b===0&&e/b>=0}},ID:function(a,d){return a.nodeType===1&&a.getAttribute("id")===d},TAG:function(a,d){return d==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===d},CLASS:function(a,d){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(d)>-1},ATTR:function(a,d){var b=d[1],b=h.attrHandle[b]?h.attrHandle[b](a):a[b]!=null?a[b]:a.getAttribute(b),e=b+"",j=d[2],f=d[4];return b==null?j==="!=":j==="="?e===f:j==="*="?e.indexOf(f)>=
0:j==="~="?(" "+e+" ").indexOf(f)>=0:!f?e&&b!==!1:j==="!="?e!==f:j==="^="?e.indexOf(f)===0:j==="$="?e.substr(e.length-f.length)===f:j==="|="?e===f||e.substr(0,f.length+1)===f+"-":!1},POS:function(a,d,b,e){var f=h.setFilters[d[2]];if(f)return f(a,b,d,e)}}},s=h.match.POS,f=function(a,d){return"\\"+(d-0+1)},y;for(y in h.match)h.match[y]=RegExp(h.match[y].source+/(?![^\[]*\])(?![^\(]*\))/.source),h.leftMatch[y]=RegExp(/(^(?:.|\r|\n)*?)/.source+h.match[y].source.replace(/\\(\d+)/g,f));var l=function(a,
d){a=Array.prototype.slice.call(a,0);return d?(d.push.apply(d,a),d):a};try{Array.prototype.slice.call(r.documentElement.childNodes,0)}catch(n){l=function(a,d){var b=0,e=d||[];if(t.call(a)==="[object Array]")Array.prototype.push.apply(e,a);else if(typeof a.length==="number")for(var f=a.length;b<f;b++)e.push(a[b]);else for(;a[b];b++)e.push(a[b]);return e}}var q,v;r.documentElement.compareDocumentPosition?q=function(a,d){return a===d?(m=!0,0):!a.compareDocumentPosition||!d.compareDocumentPosition?a.compareDocumentPosition?
-1:1:a.compareDocumentPosition(d)&4?-1:1}:(q=function(a,d){if(a===d)return m=!0,0;else if(a.sourceIndex&&d.sourceIndex)return a.sourceIndex-d.sourceIndex;var b,e,f=[],h=[];b=a.parentNode;e=d.parentNode;var l=b;if(b===e)return v(a,d);else if(b){if(!e)return 1}else return-1;for(;l;)f.unshift(l),l=l.parentNode;for(l=e;l;)h.unshift(l),l=l.parentNode;b=f.length;e=h.length;for(l=0;l<b&&l<e;l++)if(f[l]!==h[l])return v(f[l],h[l]);return l===b?v(a,h[l],-1):v(f[l],d,1)},v=function(a,d,b){if(a===d)return b;
for(a=a.nextSibling;a;){if(a===d)return-1;a=a.nextSibling}return 1});e.getText=function(a){for(var d="",b,f=0;a[f];f++)b=a[f],b.nodeType===3||b.nodeType===4?d+=b.nodeValue:b.nodeType!==8&&(d+=e.getText(b.childNodes));return d};(function(){var a=r.createElement("div"),d="script"+(new Date).getTime(),b=r.documentElement;a.innerHTML="<a name='"+d+"'/>";b.insertBefore(a,b.firstChild);if(r.getElementById(d))h.find.ID=function(a,c,d){if(typeof c.getElementById!=="undefined"&&!d)return(c=c.getElementById(a[1]))?
c.id===a[1]||typeof c.getAttributeNode!=="undefined"&&c.getAttributeNode("id").nodeValue===a[1]?[c]:o:[]},h.filter.ID=function(a,c){var d=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&d&&d.nodeValue===c};b.removeChild(a);b=a=null})();(function(){var a=r.createElement("div");a.appendChild(r.createComment(""));if(a.getElementsByTagName("*").length>0)h.find.TAG=function(a,c){var d=c.getElementsByTagName(a[1]);if(a[1]==="*"){for(var b=[],e=0;d[e];e++)d[e].nodeType===
1&&b.push(d[e]);d=b}return d};a.innerHTML="<a href='#'></a>";if(a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#")h.attrHandle.href=function(a){return a.getAttribute("href",2)};a=null})();r.querySelectorAll&&function(){var a=e,d=r.createElement("div");d.innerHTML="<p class='TEST'></p>";if(!(d.querySelectorAll&&d.querySelectorAll(".TEST").length===0)){e=function(d,b,f,i){b=b||r;if(!i&&!e.isXML(b)){var g=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(d);
if(g&&(b.nodeType===1||b.nodeType===9))if(g[1])return l(b.getElementsByTagName(d),f);else if(g[2]&&h.find.CLASS&&b.getElementsByClassName)return l(b.getElementsByClassName(g[2]),f);if(b.nodeType===9){if(d==="body"&&b.body)return l([b.body],f);else if(g&&g[3]){var n=b.getElementById(g[3]);if(n&&n.parentNode){if(n.id===g[3])return l([n],f)}else return l([],f)}try{return l(b.querySelectorAll(d),f)}catch(k){}}else if(b.nodeType===1&&b.nodeName.toLowerCase()!=="object"){var g=b,s=(n=b.getAttribute("id"))||
"__sizzle__",q=b.parentNode,m=/^\s*[+~]/.test(d);n?s=s.replace(/'/g,"\\$&"):b.setAttribute("id",s);if(m&&q)b=b.parentNode;try{if(!m||q)return l(b.querySelectorAll("[id='"+s+"'] "+d),f)}catch(v){}finally{n||g.removeAttribute("id")}}}return a(d,b,f,i)};for(var b in a)e[b]=a[b];d=null}}();(function(){var a=r.documentElement,d=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(d){var b=!d.call(r.createElement("div"),"div"),f=!1;try{d.call(r.documentElement,"[test!='']:sizzle")}catch(j){f=
!0}e.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!e.isXML(a))try{if(f||!h.match.PSEUDO.test(c)&&!/!=/.test(c)){var j=d.call(a,c);if(j||!b||a.document&&a.document.nodeType!==11)return j}}catch(l){}return e(c,null,null,[a]).length>0}}})();(function(){var a=r.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName&&a.getElementsByClassName("e").length!==0&&(a.lastChild.className="e",a.getElementsByClassName("e").length!==
1))h.order.splice(1,0,"CLASS"),h.find.CLASS=function(a,c,d){if(typeof c.getElementsByClassName!=="undefined"&&!d)return c.getElementsByClassName(a[1])},a=null})();e.contains=r.documentElement.contains?function(a,d){return a!==d&&(a.contains?a.contains(d):!0)}:r.documentElement.compareDocumentPosition?function(a,d){return!!(a.compareDocumentPosition(d)&16)}:function(){return!1};e.isXML=function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?a.nodeName!=="HTML":!1};var d=function(a,d){for(var b,
f=[],j="",l=d.nodeType?[d]:d;b=h.match.PSEUDO.exec(a);)j+=b[0],a=a.replace(h.match.PSEUDO,"");a=h.relative[a]?a+"*":a;b=0;for(var g=l.length;b<g;b++)e(a,l[b],f);return e.filter(j,f)};C.find=e;C.expr=e.selectors;C.expr[":"]=C.expr.filters;C.unique=e.uniqueSort;C.text=e.getText;C.isXMLDoc=e.isXML;C.contains=e.contains})();(function(a){function b(b,h,g){h=h||0;if(a.isFunction(h))return a.grep(b,function(a,b){return!!h.call(a,b,a)===g});else if(h.nodeType)return a.grep(b,function(a){return a===h===g});
else if(typeof h==="string"){var f=a.grep(b,function(a){return a.nodeType===1});if(m.test(h))return a.filter(h,f,!g);else h=a.filter(h,f)}return a.grep(b,function(b){return a.inArray(b,h)>=0===g})}var p=/Until$/,g=/^(?:parents|prevUntil|prevAll)/,r=/,/,m=/^.[^:#\[\.,]*$/,u=Array.prototype.slice,k=a.expr.match.POS,z={children:!0,contents:!0,next:!0,prev:!0};a.fn.extend({find:function(b){var h=this,g,f;if(typeof b!=="string")return a(b).filter(function(){for(g=0,f=h.length;g<f;g++)if(a.contains(h[g],
this))return!0});var k=this.pushStack("","find",b),l,n,q;for(g=0,f=this.length;g<f;g++)if(l=k.length,a.find(b,this[g],k),g>0)for(n=l;n<k.length;n++)for(q=0;q<l;q++)if(k[q]===k[n]){k.splice(n--,1);break}return k},has:function(b){var h=a(b);return this.filter(function(){for(var b=0,e=h.length;b<e;b++)if(a.contains(this,h[b]))return!0})},not:function(a){return this.pushStack(b(this,a,!1),"not",a)},filter:function(a){return this.pushStack(b(this,a,!0),"filter",a)},is:function(b){return!!b&&(typeof b===
"string"?a.filter(b,this).length>0:this.filter(b).length>0)},closest:function(b,h){var g=[],f,m,l=this[0];if(a.isArray(b)){var n,q={},v=1;if(l&&b.length){for(f=0,m=b.length;f<m;f++)n=b[f],q[n]||(q[n]=k.test(n)?a(n,h||this.context):n);for(;l&&l.ownerDocument&&l!==h;){for(n in q)f=q[n],(f.jquery?f.index(l)>-1:a(l).is(f))&&g.push({selector:n,elem:l,level:v});l=l.parentNode;v++}}return g}n=k.test(b)||typeof b!=="string"?a(b,h||this.context):0;for(f=0,m=this.length;f<m;f++)for(l=this[f];l;)if(n?n.index(l)>
-1:a.find.matchesSelector(l,b)){g.push(l);break}else if(l=l.parentNode,!l||!l.ownerDocument||l===h||l.nodeType===11)break;g=g.length>1?a.unique(g):g;return this.pushStack(g,"closest",b)},index:function(b){return!b?this[0]&&this[0].parentNode?this.prevAll().length:-1:typeof b==="string"?a.inArray(this[0],a(b)):a.inArray(b.jquery?b[0]:b,this)},add:function(b,h){var g=typeof b==="string"?a(b,h):a.makeArray(b&&b.nodeType?[b]:b),f=a.merge(this.get(),g);return this.pushStack(!g[0]||!g[0].parentNode||g[0].parentNode.nodeType===
11||!f[0]||!f[0].parentNode||f[0].parentNode.nodeType===11?f:a.unique(f))},andSelf:function(){return this.add(this.prevObject)}});a.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(b){return a.dir(b,"parentNode")},parentsUntil:function(b,h,g){return a.dir(b,"parentNode",g)},next:function(b){return a.nth(b,2,"nextSibling")},prev:function(b){return a.nth(b,2,"previousSibling")},nextAll:function(b){return a.dir(b,"nextSibling")},prevAll:function(b){return a.dir(b,
"previousSibling")},nextUntil:function(b,h,g){return a.dir(b,"nextSibling",g)},prevUntil:function(b,h,g){return a.dir(b,"previousSibling",g)},siblings:function(b){return a.sibling(b.parentNode.firstChild,b)},children:function(b){return a.sibling(b.firstChild)},contents:function(b){return a.nodeName(b,"iframe")?b.contentDocument||b.contentWindow.document:a.makeArray(b.childNodes)}},function(b,h){a.fn[b]=function(k,f){var m=a.map(this,h,k),l=u.call(arguments);p.test(b)||(f=k);f&&typeof f==="string"&&
(m=a.filter(f,m));m=this.length>1&&!z[b]?a.unique(m):m;if((this.length>1||r.test(f))&&g.test(b))m=m.reverse();return this.pushStack(m,b,l.join(","))}});a.extend({filter:function(b,h,g){g&&(b=":not("+b+")");return h.length===1?a.find.matchesSelector(h[0],b)?[h[0]]:[]:a.find.matches(b,h)},dir:function(b,g,m){for(var f=[],b=b[g];b&&b.nodeType!==9&&(m===o||b.nodeType!==1||!a(b).is(m));)b.nodeType===1&&f.push(b),b=b[g];return f},nth:function(a,b,g){for(var b=b||1,f=0;a;a=a[g])if(a.nodeType===1&&++f===
b)break;return a},sibling:function(a,b){for(var g=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&g.push(a);return g}})})(C);(function(a){function b(b,c){if(c.nodeType===1&&a.hasData(b)){var e=a.expando,f=a.data(b),g=a.data(c,f);if(f=f[e]){var j=f.events,g=g[e]=a.extend({},f);if(j){delete g.handle;g.events={};for(var h in j){e=0;for(f=j[h].length;e<f;e++)a.event.add(c,h+(j[h][e].namespace?".":"")+j[h][e].namespace,j[h][e],j[h][e].data)}}}}}function p(b,c){var e;if(c.nodeType===1){c.clearAttributes&&c.clearAttributes();
c.mergeAttributes&&c.mergeAttributes(b);e=c.nodeName.toLowerCase();if(e==="object")c.outerHTML=b.outerHTML;else if(e==="input"&&(b.type==="checkbox"||b.type==="radio")){if(b.checked)c.defaultChecked=c.checked=b.checked;if(c.value!==b.value)c.value=b.value}else if(e==="option")c.selected=b.defaultSelected;else if(e==="input"||e==="textarea")c.defaultValue=b.defaultValue;c.removeAttribute(a.expando)}}function g(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):
[]}function t(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function m(b){a.nodeName(b,"input")?t(b):"getElementsByTagName"in b&&a.grep(b.getElementsByTagName("input"),t)}function u(b,c){c.src?a.ajax({url:c.src,async:!1,dataType:"script"}):a.globalEval((c.text||c.textContent||c.innerHTML||"").replace(q,"/*$0*/"));c.parentNode&&c.parentNode.removeChild(c)}var k=/ jQuery\d+="(?:\d+|null)"/g,z=/^\s+/,e=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
h=/<([\w:]+)/,s=/<tbody/i,f=/<|&#?\w+;/,y=/<(?:script|object|embed|option|style)/i,l=/checked\s*(?:[^=]|=\s*.checked.)/i,n=/\/(java|ecma)script/i,q=/^\s*<!(?:\[CDATA\[|\-\-)/,v={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",
""]};v.optgroup=v.option;v.tbody=v.tfoot=v.colgroup=v.caption=v.thead;v.th=v.td;if(!a.support.htmlSerialize)v._default=[1,"div<div>","</div>"];a.fn.extend({text:function(b){return a.isFunction(b)?this.each(function(c){var e=a(this);e.text(b.call(this,c,e.text()))}):typeof b!=="object"&&b!==o?this.empty().append((this[0]&&this[0].ownerDocument||r).createTextNode(b)):a.text(this)},wrapAll:function(b){if(a.isFunction(b))return this.each(function(c){a(this).wrapAll(b.call(this,c))});if(this[0]){var c=
a(b,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&c.insertBefore(this[0]);c.map(function(){for(var a=this;a.firstChild&&a.firstChild.nodeType===1;)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(b){return a.isFunction(b)?this.each(function(c){a(this).wrapInner(b.call(this,c))}):this.each(function(){var c=a(this),e=c.contents();e.length?e.wrapAll(b):c.append(b)})},wrap:function(b){return this.each(function(){a(this).wrapAll(b)})},unwrap:function(){return this.parent().each(function(){a.nodeName(this,
"body")||a(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});else if(arguments.length){var b=a(arguments[0]);b.push.apply(b,this.toArray());return this.pushStack(b,
"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});else if(arguments.length){var b=this.pushStack(this,"after",arguments);b.push.apply(b,a(arguments[0]).toArray());return b}},remove:function(b,c){for(var e=0,f;(f=this[e])!=null;e++)if(!b||a.filter(b,[f]).length)!c&&f.nodeType===1&&(a.cleanData(f.getElementsByTagName("*")),a.cleanData([f])),f.parentNode&&f.parentNode.removeChild(f);return this},
empty:function(){for(var b=0,c;(c=this[b])!=null;b++)for(c.nodeType===1&&a.cleanData(c.getElementsByTagName("*"));c.firstChild;)c.removeChild(c.firstChild);return this},clone:function(b,c){b=b==null?!1:b;c=c==null?b:c;return this.map(function(){return a.clone(this,b,c)})},html:function(b){if(b===o)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(k,""):null;else if(typeof b==="string"&&!y.test(b)&&(a.support.leadingWhitespace||!z.test(b))&&!v[(h.exec(b)||["",""])[1].toLowerCase()]){b=
b.replace(e,"<$1></$2>");try{for(var c=0,f=this.length;c<f;c++)if(this[c].nodeType===1)a.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=b}catch(g){this.empty().append(b)}}else a.isFunction(b)?this.each(function(c){var e=a(this);e.html(b.call(this,c,e.html()))}):this.empty().append(b);return this},replaceWith:function(b){if(this[0]&&this[0].parentNode){if(a.isFunction(b))return this.each(function(c){var e=a(this),f=e.html();e.replaceWith(b.call(this,c,f))});typeof b!=="string"&&(b=
a(b).detach());return this.each(function(){var c=this.nextSibling,e=this.parentNode;a(this).remove();c?a(c).before(b):a(e).append(b)})}else return this.length?this.pushStack(a(a.isFunction(b)?b():b),"replaceWith",b):this},detach:function(a){return this.remove(a,!0)},domManip:function(b,c,e){var f,g,h,n=b[0],m=[];if(!a.support.checkClone&&arguments.length===3&&typeof n==="string"&&l.test(n))return this.each(function(){a(this).domManip(b,c,e,!0)});if(a.isFunction(n))return this.each(function(f){var g=
a(this);b[0]=n.call(this,f,c?g.html():o);g.domManip(b,c,e)});if(this[0]){f=n&&n.parentNode;f=a.support.parentNode&&f&&f.nodeType===11&&f.childNodes.length===this.length?{fragment:f}:a.buildFragment(b,this,m);h=f.fragment;if(g=h.childNodes.length===1?h=h.firstChild:h.firstChild){c=c&&a.nodeName(g,"tr");g=0;for(var k=this.length,q=k-1;g<k;g++)e.call(c?a.nodeName(this[g],"table")?this[g].getElementsByTagName("tbody")[0]||this[g].appendChild(this[g].ownerDocument.createElement("tbody")):this[g]:this[g],
f.cacheable||k>1&&g<q?a.clone(h,!0,!0):h)}m.length&&a.each(m,u)}return this}});a.buildFragment=function(b,c,e){var f,g,h,n;c&&c[0]&&(n=c[0].ownerDocument||c[0]);n.createDocumentFragment||(n=r);if(b.length===1&&typeof b[0]==="string"&&b[0].length<512&&n===r&&b[0].charAt(0)==="<"&&!y.test(b[0])&&(a.support.checkClone||!l.test(b[0])))g=!0,(h=a.fragments[b[0]])&&h!==1&&(f=h);f||(f=n.createDocumentFragment(),a.clean(b,n,f,e));g&&(a.fragments[b[0]]=h?f:1);return{fragment:f,cacheable:g}};a.fragments={};
a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(b,c){a.fn[b]=function(e){var f=[],e=a(e),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1)return e[c](this[0]),this;else{for(var g=0,h=e.length;g<h;g++){var l=(g>0?this.clone(!0):this).get();a(e[g])[c](l);f=f.concat(l)}return this.pushStack(f,b,e.selector)}}});a.extend({clone:function(d,c,e){var f=d.cloneNode(!0),h,l,n;if((!a.support.noCloneEvent||
!a.support.noCloneChecked)&&(d.nodeType===1||d.nodeType===11)&&!a.isXMLDoc(d)){p(d,f);h=g(d);l=g(f);for(n=0;h[n];++n)l[n]&&p(h[n],l[n])}if(c&&(b(d,f),e)){h=g(d);l=g(f);for(n=0;h[n];++n)b(h[n],l[n])}return f},clean:function(b,c,g,l){c=c||r;typeof c.createElement==="undefined"&&(c=c.ownerDocument||c[0]&&c[0].ownerDocument||r);for(var k=[],j,q=0,o;(o=b[q])!=null;q++)if(typeof o==="number"&&(o+=""),o){if(typeof o==="string")if(f.test(o)){o=o.replace(e,"<$1></$2>");j=(h.exec(o)||["",""])[1].toLowerCase();
var p=v[j]||v._default,t=p[0],u=c.createElement("div");for(u.innerHTML=p[1]+o+p[2];t--;)u=u.lastChild;if(!a.support.tbody){t=s.test(o);p=j==="table"&&!t?u.firstChild&&u.firstChild.childNodes:p[1]==="<table>"&&!t?u.childNodes:[];for(j=p.length-1;j>=0;--j)a.nodeName(p[j],"tbody")&&!p[j].childNodes.length&&p[j].parentNode.removeChild(p[j])}!a.support.leadingWhitespace&&z.test(o)&&u.insertBefore(c.createTextNode(z.exec(o)[0]),u.firstChild);o=u.childNodes}else o=c.createTextNode(o);var y;if(!a.support.appendChecked)if(o[0]&&
typeof(y=o.length)==="number")for(j=0;j<y;j++)m(o[j]);else m(o);o.nodeType?k.push(o):k=a.merge(k,o)}if(g){b=function(a){return!a.type||n.test(a.type)};for(q=0;k[q];q++)l&&a.nodeName(k[q],"script")&&(!k[q].type||k[q].type.toLowerCase()==="text/javascript")?l.push(k[q].parentNode?k[q].parentNode.removeChild(k[q]):k[q]):(k[q].nodeType===1&&(c=a.grep(k[q].getElementsByTagName("script"),b),k.splice.apply(k,[q+1,0].concat(c))),g.appendChild(k[q]))}return k},cleanData:function(b){for(var c,e,f=a.cache,g=
a.expando,h=a.event.special,l=a.support.deleteExpando,n=0,k;(k=b[n])!=null;n++)if(!k.nodeName||!a.noData[k.nodeName.toLowerCase()])if(e=k[a.expando]){if((c=f[e]&&f[e][g])&&c.events){for(var m in c.events)h[m]?a.event.remove(k,m):a.removeEvent(k,m,c.handle);if(c.handle)c.handle.elem=null}l?delete k[a.expando]:k.removeAttribute&&k.removeAttribute(a.expando);delete f[e]}}})})(C);(function(a){function b(b,f,g){var k=f==="width"?b.offsetWidth:b.offsetHeight,d=f==="width"?e:h;if(k>0)return g!=="border"&&
a.each(d,function(){g||(k-=parseFloat(a.css(b,"padding"+this))||0);g==="margin"?k+=parseFloat(a.css(b,g+this))||0:k-=parseFloat(a.css(b,"border"+this+"Width"))||0}),k+"px";k=s(b,f,f);if(k<0||k==null)k=b.style[f]||0;k=parseFloat(k)||0;g&&a.each(d,function(){k+=parseFloat(a.css(b,"padding"+this))||0;g!=="padding"&&(k+=parseFloat(a.css(b,"border"+this+"Width"))||0);g==="margin"&&(k+=parseFloat(a.css(b,g+this))||0)});return k+"px"}var p=/alpha\([^)]*\)/i,g=/opacity=([^)]*)/,t=/([A-Z]|^ms)/g,m=/^-?\d+(?:px)?$/i,
u=/^-?\d/,k=/^([\-+])=([\-+.\de]+)/,z={position:"absolute",visibility:"hidden",display:"block"},e=["Left","Right"],h=["Top","Bottom"],s,f,y;a.fn.css=function(b,e){return arguments.length===2&&e===o?this:a.access(this,b,e,!0,function(b,e,d){return d!==o?a.style(b,e,d):a.css(b,e)})};a.extend({cssHooks:{opacity:{get:function(a,b){if(b){var e=s(a,"opacity","opacity");return e===""?"1":e}else return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,
zIndex:!0,zoom:!0},cssProps:{"float":a.support.cssFloat?"cssFloat":"styleFloat"},style:function(b,e,f,g){if(b&&!(b.nodeType===3||b.nodeType===8||!b.style)){var d,c=a.camelCase(e),h=b.style,m=a.cssHooks[c],e=a.cssProps[c]||c;if(f!==o){g=typeof f;if(g==="string"&&(d=k.exec(f)))f=+(d[1]+1)*+d[2]+parseFloat(a.css(b,e)),g="number";if(!(f==null||g==="number"&&isNaN(f)))if(g==="number"&&!a.cssNumber[c]&&(f+="px"),!m||!("set"in m)||(f=m.set(b,f))!==o)try{h[e]=f}catch(p){}}else return m&&"get"in m&&(d=m.get(b,
!1,g))!==o?d:h[e]}},css:function(b,e,f){var g,d,e=a.camelCase(e);d=a.cssHooks[e];e=a.cssProps[e]||e;e==="cssFloat"&&(e="float");if(d&&"get"in d&&(g=d.get(b,!0,f))!==o)return g;else if(s)return s(b,e)},swap:function(a,b,e){var f={},d;for(d in b)f[d]=a.style[d],a.style[d]=b[d];e.call(a);for(d in b)a.style[d]=f[d]}});a.curCSS=a.css;a.each(["height","width"],function(e,f){a.cssHooks[f]={get:function(e,g,d){var c;if(g){if(e.offsetWidth!==0)return b(e,f,d);else a.swap(e,z,function(){c=b(e,f,d)});return c}},
set:function(a,b){if(m.test(b)){if(b=parseFloat(b),b>=0)return b+"px"}else return b}}});if(!a.support.opacity)a.cssHooks.opacity={get:function(a,b){return g.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(b,e){var f=b.style,g=b.currentStyle,d=a.isNaN(e)?"":"alpha(opacity="+e*100+")",c=g&&g.filter||f.filter||"";f.zoom=1;if(e>=1&&a.trim(c.replace(p,""))===""&&(f.removeAttribute("filter"),g&&!g.filter))return;f.filter=p.test(c)?c.replace(p,
d):c+" "+d}};a(function(){if(!a.support.reliableMarginRight)a.cssHooks.marginRight={get:function(b,e){var f;a.swap(b,{display:"inline-block"},function(){f=e?s(b,"margin-right","marginRight"):b.style.marginRight});return f}}});r.defaultView&&r.defaultView.getComputedStyle&&(f=function(b,e){var f,g,e=e.replace(t,"-$1").toLowerCase();if(!(g=b.ownerDocument.defaultView))return o;if(g=g.getComputedStyle(b,null))f=g.getPropertyValue(e),f===""&&!a.contains(b.ownerDocument.documentElement,b)&&(f=a.style(b,
e));return f});r.documentElement.currentStyle&&(y=function(a,b){var e,f=a.currentStyle&&a.currentStyle[b],d=a.runtimeStyle&&a.runtimeStyle[b],c=a.style;if(!m.test(f)&&u.test(f)){e=c.left;if(d)a.runtimeStyle.left=a.currentStyle.left;c.left=b==="fontSize"?"1em":f||0;f=c.pixelLeft+"px";c.left=e;if(d)a.runtimeStyle.left=d}return f===""?"auto":f});s=f||y;if(a.expr&&a.expr.filters)a.expr.filters.hidden=function(b){var e=b.offsetHeight;return b.offsetWidth===0&&e===0||!a.support.reliableHiddenOffsets&&(b.style.display||
a.css(b,"display"))==="none"},a.expr.filters.visible=function(b){return!a.expr.filters.hidden(b)}})(C);return C}(window);
var h=void 0,i=null;function aa(a,b){b=b===!0;if(!j)return!1;var c=i,d=[],e=[];k(a)?d.push(a):n(o(),function(a){t(a,"manual")&&d.push(a)});n(d,function(a){if(b||ba(a,!0))(c=ca(a,b))&&e.push(a)});da(e);ea();fa()}
function ga(a,b,c){ha=!0;j&&c!==!0&&u.f(document.location.href);a=String(a);b=String(b);if(b==="-1"){v[a]&&delete v[a];ia[a]&&delete ia[a];for(b=0;b<w.length;b++)w[b].j===a&&w.splice(b,1);ja()}else if((c=y(a))&&c.length>0){a:{for(var c=y(a),d=0;d<c.length;d++){var e=ka(c[d]);if(z(e,b)){c=c[d];break a}}c=""}A[a]=A[a]||{};A[a][c]=b;B("Distributor","Preferring variation partial "+b+" of section "+c+" of experiment "+a);a=la(a);a.length===1&&C(a[0],"api.bucketUser",!1,!0)}else C(b,"api.bucketUser",!1,
!0);ea()}function ma(){na=j=!1}function oa(a,b){var c=[],d=b;D(b)&&(c=pa(b,1),d=b[0]);var e=a[d];e?(B("API",'Called function "'+d+'"'),d!=="acknowledgePreviewMode"&&qa(d,{type:"api"}),e.apply(i,c)):B("API",'Error for unknown function "'+d+'"');sa()}
function ta(){ua={};E={};va={};n(wa(),function(a){var b=F(a);ua[b]=a.split("_");var c=E,d;a:{var e=F(a);d=y(e);if(d.length===0){d=xa(e);for(e=0;e<d.length;e++)if(d[e]===a){d=e;break a}}else{for(var e=a.split("_"),f=[],g=0;g<d.length;g++)for(var l=ka(d[g]),q=0;q<l.length;q++)l[q]===e[g]&&f.push(q);if(f!==[]){d=f;break a}}d=-1}c[b]=d;va[b]=ya(a)});za(window.optimizely,{activeExperiments:Aa,allExperiments:Ba(),all_experiments:Ba(),variationIdsMap:ua,variationMap:E,variationNamesMap:va,variation_map:E})}
function Ca(a){if(!k(a))return!1;Da=Number(a)}function Ea(){Fa=!0}var ua={},E={},va={};function z(a,b){for(var c=0;c<a.length;c++)if(b==a[c])return!0;return!1}function Ga(a){var b=a.length;if(b===0)return i;if(b===1)return 0;for(var c=0,d=0;d<b;d++)c+=a[d];c*=Math.random();for(d=0;d<b;d++){if(c<a[d])return d;c-=a[d]}return Math.floor(Math.random()*b)}function Ha(a,b){var c=pa(arguments,1);return function(){var b=pa(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}
function n(a,b){var c=i;if(D(a))for(var d=a.length,e=0;e<d;++e){if(c=b.call(h,a[e],e),Ia(c))break}else for(d in a)if(Object.prototype.hasOwnProperty.call(a,d)&&(c=b.call(h,d,a[d]),Ia(c)))break;return c}function za(a,b){n(b,function(b,d){a[b]=d})}function Ja(a,b){for(var c=[],d=0,e=a.length;d<e;d++){var f=a[d];b(f)&&c.push(f)}return c}function Ka(a,b){return n(b,function(b){if(b===a)return!0})||!1}function D(a){return a&&typeof a==="object"&&a.length&&typeof a.length==="number"}
function Ia(a){return typeof a!=="undefined"}function k(a){return(typeof a==="number"||typeof a==="string")&&Number(a)==a}function La(a){La=Object.keys||function(a){var c=[];n(a,function(a){c.push(a)});return c};return La.call(i,a)}function Ma(a){var b=document.C||document.getElementsByTagName("head")[0]||document.documentElement,c=document.createElement("script");c.src=a;c.type="text/javascript";b.appendChild(c)}
function G(a,b,c){var d=window.console;if(H&&d&&d.log){var e=pa(arguments,1);e[0]="Optimizely / "+a+" / "+b;Function.prototype.apply.call(d.log,d,e)}}function pa(a,b){return Array.prototype.slice.call(a,b||0,a.length)}function Na(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function Oa(){Pa===i&&(Pa=Ja(o(),Ra));return Pa}function Sa(){Ta===i&&(Ta=Ja(I("click_goals")||[],function(a){return a.experiments?!1:Ua(a.url_conditions||[])}));return Ta}function Va(a){var b={},c=t(a,"events")||{};n(c,function(a,c){b[a]=[c]});for(var c=Ja(I("click_goals")||[],function(b){return z(b.experiments||[],a)}),d=0;d<c.length;d++){var e=c[d];b[e.selector]||(b[e.selector]=[]);b[e.selector].push(e.event_name)}return b}function Ba(){return I("experiments")||{}}
function o(){return La(I("experiments")||{})}function J(a){return'experiment "'+(t(a,"name")||"")+'" ('+a+")"}function y(a){return t(a,"section_ids")||[]}function xa(a){return t(a,"variation_ids")||[]}function Wa(a){var b={},c=I("public_suffixes")||{};n(c,function(a,c){n(c,function(c){b[c]=a})});Wa=function(a){return b[a]||""};return Wa.call(i,a)}function ka(a){return I("sections",a,"variation_ids")||[]}
function Xa(a){var b=[];n(a.split("_"),function(a){(a=I("variations",a,"code"))&&b.push(a)});return b.join("\n")}function F(a){var b={};n(o(),function(a){n(y(a),function(d){n(ka(d),function(d){b[d]=a})});n(xa(a),function(d){b[d]=a})});F=function(a){return b[a.split("_")[0]]||""};return F.call(i,a)}function ya(a){var b;return Ya(a).join(b||", ")}function Ya(a){var b=[];n(a.split("_"),function(a){b.push(I("variations",a,"name")||"Unnamed")});return b}function Ra(a){return!!t(a,"active")}
function Za(a){return t(a,"is_site_catalyst_enabled")==="custom_variables"}function t(a,b){return I("experiments",a,b)}function I(a){var b=DATA;if(n(arguments,function(a){a=b[a];if(Ia(a))b=a;else return i})!==i)return b}function $a(a){var a=I(a),b=document.location.protocol;b==="chrome-extension:"&&(b="http:");return b+"//"+a+".optimizely.com"}var Pa=i,Ta=i;function qa(a,b){b=b||{};window.optimizelyPreview=window.optimizelyPreview||[];ab||(window.optimizelyPreview.push(["addEvent",window.location.href,{type:"url"}]),ab=!0);window.optimizelyPreview.push(["addEvent",a,b])}function bb(){B("Preview","Preview acknowledgement received")}var ab=!1,cb=[];function db(){var a=window.location.search||"";a.indexOf("?")===0&&(a=a.substring(1));for(var a=a.split("&"),b=[],c=0;c<a.length;c++){var d="",e="",f=a[c].split("=");f.length>0&&(d=f[0]);f.length>1&&(e=f[1]);b.push([d,e])}return b}function eb(){for(var a=window.location.search,b,c=/optimizely_([^=]+)=([^&]*)/g,d={};b=c.exec(a);)d[b[1]]=decodeURIComponent(b[2]);return d}
function fb(a,b){var c=y(a),d=[];if(c.length===b.length)n(c,function(a,c){var e=b[c];if(e=ka(a)[e])d.push(e);else return d=[],i});else if(b.length===1){var c=xa(a),e=b[0],f=c[e];!f&&z(c,e)&&(f=e);f&&d.push(f)}return d.join("_")}var gb="//cdn.optimizely.com/,https://cdn.optimizely.com/,//optimizely.appspot.com/,https://optimizely.appspot.com/,//www.local/,https://www.local/,//www-local.optimizely.com/,https://www-local.optimizely.com/".split(",");function ba(a,b){b=b===!0;B("Condition","Testing experiment "+a);var c=Ra(a),d=t(a,"manual")||!1;if(c)if(hb(a)){if(!b&&d)return B("Condition"," Failed for experiment "+a+" (manual activation mode)"),K[a]="it is set to use manual activation mode",!1}else return B("Condition","Failed for experiment "+a+" (condition failed)"),!1;else return B("Condition","Failed for experiment "+a+" (paused)"),K[a]="it is paused",!1;return!0}
function hb(a){var b=t(a,"conditions")||[],c=!0;n(b,function(b){var e=b.type;if(b.only_first_time&&ib(a))B("Condition",e+" condition passed because it only gets checked when bucketing",!0);else{var f=!b.not,g=(0,jb[e])(b),b=g!==f,g=g?"passed":"failed",f=f?"pass":"fail";B("Condition",e+" condition "+g+" when expected to "+f,!b);if(b)return c=!1,K[a]=e+" condition "+g+" when expected to "+f,!1}});return c}
function Ua(a){for(var b=window.location.href,c=0;c<a.values.length;c++){var d=a.values[c],e=d.value,d=d.match,f=kb(b,e,d);B("Condition","Testing URL "+b+" against  "+e+" ("+d+")",!0);if(f)return!0}return!1}
var jb={browser:function(a){var b=lb(),c=mb(),d=!1,e=nb();n(a.values,function(a){e!=="unknown"?d=a==="mobile":a.indexOf(b)===0&&(a=a.substr(b.length),d=a===""||a<=c&&c<Number(a)+1);if(d)return i});return d},code:function(a){a=a.value;if(a===h)return!0;try{return Boolean(eval(a))}catch(b){return!1}},cookies:function(a){for(var b=!1,c=a.names||[],a=a.values||[],d=0;d<c.length;d++){var e=L(c[d]);if(b=Ia(a[d])&&Na(a[d])!==""?b||a[d]===e:b||e!==i&&e!==h)return!0}return!1},event:function(a){var b=L("optimizelyCustomEvents")||
"{}";try{b=M(b)}catch(c){b={}}var d=b[ob()]||[];D(d)||(d=[]);var e=!1;n(a.values,function(a){if($.inArray(a,d)!==-1)return e=!0});return e},language:function(a){var b=pb(),c=!1;n(a.values,function(a){if(c=a==="any"||b.indexOf(a)===0)return i});return c},location:function(a){var b;b=GEOTARGETING;var c="",d="",e="",f="";try{d=b.country.toUpperCase()||""}catch(g){d=""}try{e=b.region.toUpperCase()||""}catch(l){e=""}e==="N/A"&&(e="");try{f=b.city.toUpperCase()||""}catch(q){f=""}f==="N/A"&&(f="");try{c=
b.continent.toUpperCase()||""}catch(ra){c=""}c==="N/A"&&(c="");b={city:f,continent:c,country:d,region:e};for(c=0;c<a.values.length;c++){var d=a.values[c].split("|"),e=$.trim(d[0]),f=$.trim(d[1]),Qa=$.trim(d[2]),p=$.trim(d[3]);switch(d.length){case 1:if(b.country===e)return!0;break;case 2:if(b.region===f&&b.country===e)return!0;break;case 3:if(b.city===Qa&&(b.region===f||""===f)&&b.country===e)return!0;break;case 4:if(b.continent===p)return!0}}return!1},query:function(a){if(a.values.length===0)return!0;
var b=!1,c=db();n(a.values,function(a){for(var e=a.key,a=a.value||"",f=0;f<c.length;f++){var g=c[f],l=g[0],g=g[1];if(e!==""&&e===l&&(a===""||a===g))return b=!0}});return b},referrer:function(a){for(var b=document.referrer,c=0;c<a.values.length;c++){var d=a.values[c],e=d.value,d=d.match,f=kb(b,e,d);B("Condition","Testing referrer "+b+" against  "+e+" ("+d+")",!0);if(f)return!0}return!1},url:Ua,visitor:function(a){var b=qb?"returning":"new";switch(a.value){case "new":return b==="returning"?!1:!0;case "returning":return b===
"returning"}return!0}};var rb="com,local,net,org,xxx,edu,es,gov,biz,info,fr,nl,ca,de,kr,it,me,ly,tv,mx,cn,jp,il,in,iq".split(","),sb=/\/\* _optimizely_variation_url( +include="([^"]*)")?( +exclude="([^"]*)")?( +match_type="([^"]*)")?( +include_match_types="([^"]*)")?( +exclude_match_types="([^"]*)")? \*\//;function L(a){var b=a+"=",c=[];n((document.cookie||"").split(/\s*;\s*/),function(a){a.indexOf(b)===0&&c.push(decodeURIComponent(a.substr(b.length)))});var d=c.length;d>1&&G("Cookie","Values found for %s: %s",a,d);return d===0?i:c[0]}
function P(a,b,c){var d=Q||R,e=document.location.hostname;!Q&&I("remote_public_suffix")&&tb.push({t:c,name:a,value:b});Q&&Q!==R&&(ub(a,e),ub(a,R));vb(a,b,d,c);var f=L(a);f===b?G("Cookie","Successful set %s=%s on %s",a,b,d):(G("Cookie","Setting %s on %s apparently failed (%s != %s)",a,d,f,b),G("Cookie","Setting %s on %s",a,e),vb(a,b,e,c),f=L(a),f===b&&(G("Cookie","Setting %s on %s worked; saving as new public suffix",a,e),R=e))}
function ub(a,b){G("Cookie","Deleting %s on %s",a,b);document.cookie=[a,"=; domain=.",b,"; path=/; expires=",(new Date(0)).toUTCString()].join("")}function wb(a){Q=a.public_suffix;G("Cookie","Public suffix request returned: %s",Q);P("optimizelyPublicSuffix",Q,31536E4);if(Q!==R)for(;tb.length>0;)a=tb.shift(),P(a.name,a.value,a.t);tb=[]}
function xb(a){var a=$a("api_host")+"/iapi/public_suffix?host="+encodeURIComponent(a),b="callback"+Math.random().toString().replace("0.",""),c=document,d=c.C||c.getElementsByTagName("head")[0]||c.documentElement,c=c.createElement("script");window.optimizely[b]=wb;c.async="async";c.src=[a,a.indexOf("?")!==-1?"&":"?","callback=optimizely.",b].join("");d.insertBefore(c,d.firstChild)}
function vb(a,b,c,d){a=[a,"=",encodeURIComponent(b),"; domain=.",c,"; path=/"];d&&a.push("; expires=",(new Date(+new Date+d*1E3)).toUTCString());document.cookie=a.join("")}var R="",Q="",tb=[];function yb(){var a=navigator.userAgent,b=zb([{id:"gc",substring:"Chrome",g:"Chrome"},{id:"safari",J:navigator.vendor,substring:"Apple",g:"Version"},{id:"ff",substring:"Firefox",g:"Firefox"},{id:"opera",prop:window.opera,g:"Opera"},{id:"ie",substring:"MSIE",g:"MSIE"},{id:"mo",substring:"Gecko",g:"rv"}],a),c=zb([{id:"android",substring:"Android"},{id:"blackberry",substring:"BlackBerry"},{id:"ipad",substring:"iPad"},{id:"iphone",substring:"iPhone"},{id:"ipod",substring:"iPod"},{id:"windows phone",substring:"Windows Phone"}],
a),d=i,e=b.g;e&&(d=Ab(a,e)||Ab(navigator.appVersion,e));return{u:b.id||"unknown",v:d||"unknown",H:c.id||"unknown"}}function Ab(a,b){var c=a.indexOf(b),d=i;c!==-1&&(c+=b.length+1,d=parseFloat(a.substring(c)));return d}function zb(a,b){return n(a,function(a){var d=a.J||b;if(d&&d.indexOf(a.substring)!==-1||a.prop)return a})||{}};var Da=0,j=!0,S=!1,T="",H=!1,Bb=!1,ha=!1,Fa=!1,na=!0;function ca(a,b){var b=b===!0,c=Cb(a);if(c&&c.length>0)return B("Distributor","Not distributing experiment "+a+" (already in plan)"),!0;if(b||a in v)return B("Distributor","Not distributing experiment "+a+" (is ignored)"),!1;c=t(a,"active_variation_ids")||[];if(c.length===0)return B("Distributor","Permanently ignoring experiment "+a+" (no active variations)"),Db(a),!1;else{var d=t(a,"ignore")||0;if(d>Math.floor(Math.random()*100))return B("Distributor","Permanently ignoring experiment "+a+"("+d+"% likelihood)"),
Db(a),!1;else{d=c;A[a]!==h&&(B("Distributor","Taking into account bucketUser variations for experiment "+a),d=la(a));var e;e=d;for(var f=t(a,"active_variation_weights")||{},g=[],l=0,q=e.length;l<q;l++)g.push(f[e[l]]);e=Ga(g);d=d[e];B("Distributor","Picked variation "+d+" [index "+e+" of "+c.length+"]");C(d,"distributor",!1);return!0}}}
function la(a){for(var b=t(a,"active_variation_ids")||[],c=[],d=0;d<b.length;d++){var e=!0,f=h;for(f in A[a])b[d].indexOf(A[a][f])===-1&&(e=!1);e&&c.push(b[d])}return c}var A={};function da(a){if(j){D(a)?Eb(a):(a=[],Eb());a=a.concat(U);U=[];for(var b=0;b<a.length;b++)z(Aa,a[b])||Aa.push(a[b]);a=Fb(a);V.push.apply(V,a);Gb()}}
function Gb(){var a=!1;Hb=i;for(B("Evaluator",Ib+" times waited");!a&&V.length>0;){B("Evaluator",V.length+" steps remaining");var b=V.shift(),c=b,a=!1;if(c.M&&!Jb)B("Evaluator","Document not ready yet"),a=!0;else if(c.h&&!Jb&&(c=c.e))for(var c=D(c)?c:[c],d=0;d<c.length;d++){var e=c[d];if(!(e===i||e===h||!e.length)&&$(e).length===0)B("Evaluator","'"+e+"' not found"),a=!0}a?V.unshift(b):b.i?(B("Evaluator","Bound event "+b.i+" to selector "+b.e),Kb(b.e,b.i)):b.code&&(B("Evaluator","Run code: "+b.code),
Lb(b.code))}a?(Hb=setTimeout(Gb,Ib===0?10:50),Ib++):B("Evaluator",Ib+" total times waited")}
function Lb(a){if(a.indexOf("_optimizely_redirect")!==-1){B("Evaluator","Redirect detected");var b=L("optimizelyRedirect");if(b===h||b===i||b==="")B("Evaluator","OK to redirect"),P("optimizelyRedirect",window.location.href,5),P("optimizelyReferrer",document.referrer||"http://www.optimizely.com/redirect-no-referrer");else{B("Evaluator","NOT OK to redirect");return}}eval("var $j = $;");try{eval(a)}catch(c){b=H,H=!0,B("Evaluator","Error: "+c.message),B("Evaluator","Code: "+a),H=b,B("Evaluator","Failed to run code: "+
c.message)}}function Kb(a,b){if(!Mb[a]||!Mb[a][b]){var c="mousedown",d=nb();if(d==="iphone"||d==="ipad"||d==="ipod")c="touchstart";$(a).bind(c,function(){u.f.call(u,b,"custom")});Mb[a]||(Mb[a]={});Mb[a][b]=c}}function Nb(a){Ob=a}function Eb(a){a||(a=o());for(var b=0;b<a.length;b++){var c=a[b],d=K[c];d?(qa("Not activating "+J(c)+" because "+d+".",{type:"explanation"}),delete K[c]):qa("Activating "+J(c)+".",{type:"explanation"})}}var Mb={},Aa=[],U=U||[],Ob=0,Jb=!1,K={},V=[],Hb=i,Ib=0;
$(function(){Jb=!0;Hb!==i&&(B("Evaluator","Document is ready"),clearTimeout(Hb),Ob>0?setTimeout(Gb,Ob):Gb())});var M,Pb;
(function(){function a(a){d.lastIndex=0;return d.test(a)?'"'+a.replace(d,function(a){var b=g[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function b(c,d){var g,p,m,N,O=e,x,r=d[c];typeof l==="function"&&(r=l.call(d,c,r));switch(typeof r){case "string":return a(r);case "number":return isFinite(r)?String(r):"null";case "boolean":case "null":return String(r);case "object":if(!r)return"null";e+=f;x=[];if(Object.prototype.toString.apply(r)==="[object Array]"){N=
r.length;for(g=0;g<N;g+=1)x[g]=b(g,r)||"null";m=x.length===0?"[]":e?"[\n"+e+x.join(",\n"+e)+"\n"+O+"]":"["+x.join(",")+"]";e=O;return m}if(l&&typeof l==="object"){N=l.length;for(g=0;g<N;g+=1)typeof l[g]==="string"&&(p=l[g],(m=b(p,r))&&x.push(a(p)+(e?": ":":")+m))}else for(p in r)Object.prototype.hasOwnProperty.call(r,p)&&(m=b(p,r))&&x.push(a(p)+(e?": ":":")+m);m=x.length===0?"{}":e?"{\n"+e+x.join(",\n"+e)+"\n"+O+"}":"{"+x.join(",")+"}";e=O;return m}}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,f,g={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},l;Pb=function(a,c,d){var g;f=e="";if(typeof d==="number")for(g=0;g<d;g+=1)f+=" ";else typeof d==="string"&&(f=d);if((l=c)&&typeof c!=="function"&&(typeof c!=="object"||typeof c.length!=="number"))throw Error("JSON.stringify");return b("",{"":a})};M=function(a,b){function d(a,c){var e,
f,g=a[c];if(g&&typeof g==="object")for(e in g)Object.prototype.hasOwnProperty.call(g,e)&&(f=d(g,e),f!==h?g[e]=f:delete g[e]);return b.call(a,c,g)}var e,a=String(a);c.lastIndex=0;c.test(a)&&(a=a.replace(c,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),typeof b===
"function"?d({"":e},""):e;throw new SyntaxError("JSON.parse");}})();function Qb(){if(na){var a=Rb||(typeof window.s!=="undefined"?window.s:i);a?n(wa(),function(b){var c=F(b);if(Ra(c)){var d=!Za(c)?-1:t(c,"site_catalyst_evar")||-1,e=!Za(c)?-1:t(c,"site_catalyst_prop")||-1,b=Sb(c,b,100,100,25);d!==-1&&(a["eVar"+d]=b.key+": "+b.value);e!=-1&&(a["prop"+e]=b.key+": "+b.value)}}):B("Integrator","Error with SiteCatalyst integration: 's' variable not defined")}}function Tb(a,b){return a.replace(/[^a-zA-Z0-9\.\~\!\*\(\)\']+/g,"_").substring(0,b)}
function Sb(a,b,c,d,e){a=Ub+(t(a,"name")||"");b=Ya(b);b.length>1?(b=$.map(b,function(a){return a.substr(0,e-1)}),b=b.join("~")):b=b[0];a=Tb(a,c);b=Tb(b.replace("#",""),d);return{key:a,value:b}}
function fa(){na&&n(wa(),function(a){var b=F(a);if(t(b,"google_analytics_slot")){window._gaq=window._gaq||[];var c=t(b,"google_analytics_slot")||0,d=window._gaq,e=Sb(b,a,28,24,5);try{d.push(["_setCustomVar",c,e.key,e.value,2])}catch(f){B("Integrator","Error sending Google Analytics data for "+J(b))}}if(I("kissmetrics")){window._kmq=window._kmq||[];c=window._kmq;a=Sb(b,a,100,100,15);d={};d[a.key]=a.value;try{c.push(["set",d])}catch(g){B("Integrator","Error sending KISSmetrics data for "+J(b))}}})}
function Vb(){var a=L("optimizelyReferrer");if(a&&a.length>0){a="_gaq.push(['_setReferrerOverride', '"+a+"']);";try{eval(a)}catch(b){B("Integrator","Error with _gaq.push (Google Analytics integration):"+a)}P("optimizelyReferrer","")}}function Wb(a){Ub=a}function Xb(a){Rb=a}var Ub="Optimizely_",Rb=i;function C(a,b,c,d){var c=c===!0,d=d===!0,e=F(a);if(e&&(d||!ib(e))){if(d&&ib(e))for(d=0;d<w.length;d++)w[d].j===e&&w.splice(d,1);w.push({j:e,id:a,source:b});c&&(U=U||[],U.push(e));ia[e]=!0;ja();B("Plan","Added experiment "+e+" and variation id "+a+" to the plan, source is "+b,!0)}}function ib(a){return a in v||a in ia}function Yb(a){for(var b=Sa(),c=0,d=b.length;c<d;c++)a.push({i:b[c].event_name,e:b[c].selector,type:"event '"+b[c].event_name+"' (click goal)",h:!0})}
function Fb(a){a===h?a=[]:k(a)&&(a=[a]);var b=wa(a),c=[],d=[],e=[],f=[];Yb(c);n(a,function(a){Zb(a,c,e,d,f)});n(b,function(a){for(var a=Xa(a),a=a.split("\n"),b=[],c=!0,e=0,Qa=a.length;e<Qa;e++){var p=$.trim(a[e]);if(p==="/* _optimizely_variation_url_end */")c=!0;else if(p!==""){var m=sb.exec(p);if(m&&m.length===11){var N=m[2]?m[2].split(" "):[],p=m[4]?m[4].split(" "):[],O=m[6]?m[6]:"substring",x=m[8]?m[8].split(" "):[],m=m[10]?m[10].split(" "):[];N.length>0&&(c=$b(N,x,O),c=Ua(c));c&&p.length>0&&(c=
$b(p,m,O),c=!Ua(c))}else c&&b.push(p)}}a=b.join("\n");ac(a,d,f)});a=[];a.push.apply(a,d);a.push.apply(a,e);a.push.apply(a,f);a.push.apply(a,c);return a}function Cb(a){var b=i;n(w,function(c){if(a==c.j)b=c.id});return b}function wa(a){var b=[],c=!Ia(a),a=a||[];n(w,function(d){(c||z(a,d.j))&&b.push(d.id)});return b}function Db(a){var b;if(b===!0||!ib(a))v[a]=!0,ja()}function ea(){var a={};n(w,function(b){var c=F(b.id);a[c]=b.id});n(v,function(b){a[b]="0"});P("optimizelyBuckets",Pb(a),31536E4)}
function ja(){n(bc,function(a){a()})}
function Zb(a,b,c,d,e){var f=Va(a);n(f,function(c,d){n(d,function(d){b.push({i:d,e:c,type:"event '"+d+"' (experiment "+a+")",h:!0})})});var f=t(a,"css")||"",g=t(a,"code")||"",l=t(a,"html")||"";l&&c.push({code:'$("body").append("<div style=\'display:none\'>'+l.replace(/([\f\n\r\t\\'"])/g,"\\$1")+'</div>");',e:"body",type:"global html (experiment "+a+")",h:!0});f&&c.push({code:'$("body").append("<style>'+f.replace(/([\f\n\r\t\\'"])/g,"\\$1")+'</style>");',e:"body",type:"global css (experiment "+a+")",
h:!0});g&&ac(g,d,e)}
function ac(a,b,c){if(a.indexOf("_optimizely_redirect")!==-1)b.push({code:a,type:"code forced (redirect)"});else{for(var a=a.split("\n"),d=!1,e=[],f=[];a.length>0;){var g=Na(a.shift()),l=f.length>0;if(g)if(g.indexOf("_optimizely_evaluate=force")!==-1)d=!0;else if(g.indexOf("_optimizely_evaluate=safe")!==-1)d=!1;else if(d)e.push(g);else{if(!l){var q=cc.exec(g),ra=[];q?(ra.push(q[1]),(q=dc.exec(g))&&q.length>4&&ra.push(q[4]),c.push({code:g,e:ra,type:"safe jquery",h:!0})):l=!0}l&&f.push(g)}}e.length>
0&&b.push({code:e.join("\n"),type:"forced evaluation"});f.length>0&&c.push({code:f.join("\n"),type:"safe non-jquery",M:!0})}}function $b(a,b,c){for(var d={values:[]},e=0,f=a.length;e<f;e++)d.values.push({value:a[e],match:b[e]||c});return d}var bc=[],v={},cc=/^\$j?\(['"](.+?)['"]\)\..+;\s*$/,dc=/^\$j?\(['"](.+?)['"]\)\.detach\(\)\.(appendTo|insertAfter|insertBefore|prependTo)\(['"](.+?)['"]\);\s*$/,ia={},w=[];function B(a,b,c){ec.push({z:new Date,w:a,message:b,m:c||!1});fc&&sa()}function sa(){H&&(n(ec,function(a){if(!a.F&&(!a.m||a.m===Bb)){var b=+a.z;G(a.w,a.message+(" [time "+(gc?b-gc:0)+" +"+(hc?b-hc:0)+"]"));hc=b;gc||(gc=b);a.F=!0}}),fc=!0)}var hc=i,gc=i,ec=[],fc=!1;var u={};u.r=function(a,b){var c={},c=b&&k(b)?{revenue:Number(b)}:b;u.f(a,"custom",c)};u.f=function(a,b,c){c=c||{};S&&(k(c.revenue)?qa(a,{value:c.revenue}):qa(a));na&&(u.k.push({name:a,type:b,options:c}),u.q&&u.n(),B("Tracker","Tracking event '"+a+"'"))};u.A=function(){$("html").one("mousedown",Ha(u.f,"engagement"))};u.B=function(a){return function(){u.I(a)}};
u.l=function(){var a=L("optimizelyPendingLogEvents")||"[]",b=[];try{b=M(a)}catch(c){}if(D(b))for(var a=0,d=b.length;a<d;a++){var e=b[a];if(typeof e!=="string"){b=[];break}else try{M(e);b=[];break}catch(f){}}else b=[];return b};u.G=function(a,b){var c=new Image,d=$a("log_host");c.onload=b;c.src=d+"/event?"+a};u.I=function(a){for(var b=u.l(),c=0,d=b.length;c<d;c++)if(b[c]===a){b.splice(c,1);break}u.p(b)};u.k=[];u.q=!1;
u.n=function(){var a=["a="+I("id"),"y="+!!I("ip_anonymization")];ha&&a.push("override=true");n(wa(),function(b){var c=F(b);a.push("x"+c+"="+b)});a.push("f="+Oa().join(","));var b=a.join("&"),c=[];n(u.k,function(a){var b=[];a.name&&b.push("n="+encodeURIComponent(a.name));a.options.revenue&&b.push("v="+encodeURIComponent(a.options.revenue));a.options.anonymous!==!0&&b.push("u="+ob());b.push("t="+ +new Date);c.push(b.join("&"));if(a.type==="custom")try{u.L(a.name)}catch(d){}});var d=c.concat(u.l());
u.p(d);d=u.o?c:d;u.o=!0;for(var e=0,f=d.length;e<f;e++){var g=d[e];u.G(b+"&"+g,u.B(g))}u.k=[];u.q=!0};u.p=function(a){for(var b=Pb(a);b.length>1536;)a=a.slice(0,-1),b=Pb(a);P("optimizelyPendingLogEvents",b,15)};
u.L=function(a){var b=ob(),c=L("optimizelyCustomEvents")||"{}";try{c=M(c)}catch(d){c={}}var e=c[b]||(c[b]=[]),e=D(e)?e:[];$.inArray(a,e)!==-1&&e.splice($.inArray(a,e),1);e.push(a);e.length>10&&e.shift();c[b]=e;var a=0,e=i,f=0,g;for(g in c)if(c.hasOwnProperty(g)&&(a++,c[g].length>f&&g!==b))e=g,f=c[g].length;a>10&&e!==i&&delete c[e];P("optimizelyCustomEvents",Pb(c),31536E4)};u.o=!1;var W;function lb(){function a(){return W.u}W=W||yb();lb=a;return a()}function pb(){var a="";try{a=navigator.userLanguage||window.navigator.language,a=a.toLowerCase()}catch(b){a=""}return a}function mb(){function a(){return W.v}W=W||yb();mb=a;return a()}function ob(){var a=L("optimizelyEndUserId");a||(a="oeu"+ +new Date+"r"+Math.random(),P("optimizelyEndUserId",a,31536E4));return a}function nb(){function a(){return W.H}W=W||yb();nb=a;return a()}var qb=h;function kb(a,b,c){switch(c){case "exact":return a=X(a),a=ic(a,"optimizely_log"),a=ic(a,"optimizely_verbose"),a===X(b);case "regex":try{return Boolean(a.match(b))}catch(d){return!1}case "simple":return a=X(jc(a)),b=X(jc(b)),a===b;case "substring":return a=X(a),b=X(b),a.indexOf(b)!==-1;default:return!1}}function jc(a){var b=a.indexOf("?");b!==-1&&(a=a.substring(0,b));b=a.indexOf("#");b!==-1&&(a=a.substring(0,b));return a}
function ic(a,b){return a.replace("&"+b+"=true","").replace("?"+b+"=true&","?").replace("?"+b+"=true","")}function X(a){for(var a=a.toLowerCase(),b=a.charAt(a.length-1);b==="/"||b==="&"||b==="?";)a=a.substring(0,a.length-1),b=a.charAt(a.length-1);for(var b=kc.length,c=0;c<b;c++){var d=kc[c];a.indexOf(d)===0&&(a=a.substring(d.length))}return a}var kc=["http://edit.local/","http://preview.optimizely.com/","http://","https://","www."];function lc(a){return function(b){if(typeof b==="object"&&mc()){var c=i,d;for(d in b)b.hasOwnProperty(d)&&(c=a.call(this,d,b[d]));return c}else return a.apply(this,arguments)}}function mc(){for(var a in{})return!0;return!1};var Y=$;Y.fn.attr=lc(Y.fn.attr);Y.fn.css=lc(Y.fn.css);Y.fn.extend=lc(Y.fn.extend);Y.each=function(){var a=Y.each;return function(b,c,d){if((b.length===h||Y.isFunction(b))&&mc())if(d)for(var e in b){if(b.hasOwnProperty(e)&&c.apply(b[e],d)===!1)break}else for(e in b){if(b.hasOwnProperty(e)&&!c.call(b[e],e,b[e])===!1)break}else a.apply(this,arguments);return b}}();
Y.fn.D=function(){var a=Y.fn.D;return function(b,c,d){return typeof b==="string"&&c&&Y.type(c)==="object"&&mc()?(b=new a(b,h,d),b.attr(c),b):new a(b,c,d)}}();B("Main","Started, revision "+I("revision"));
(function(){var a=eb(),b=/x(\d+)/,c=!1;n(a,function(a,d){var g=b.exec(a);if(g&&(c=!0,g=g[1],d!=="-1")){var l=fb(g,d.split("_"));C(l,"query",!0);cb.push(g)}});if(a.opt_out==="true"||a.opt_out==="false")P("optimizelyOptOut",a.opt_out,31536E4),P("optimizelyBuckets",a.opt_out,31536E4),a.opt_out==="true"&&alert("You have successfully opted out of Optimizely for this domain.");j=a.disable!=="true"&&a.opt_out!=="true"&&L("optimizelyOptOut")!=="true";S=(a.preview||S)&&j&&!a.cross_browser;T=a.load_script;
H=a.log==="true";Bb=a.verbose==="true";na=!c||a.force_tracking==="true";a.client==="false"&&(j=!1,T="js/"+I("id")+".js");if(T){var d=!1;n(gb,function(a){if(T.substring(0,a.length)==a)return d=!0});d||(T="")}})();var nc=document.location.hostname,Z=nc.split("."),oc=nc,pc=Z[Z.length-1];Z.length>2&&Z[Z.length-2]==="appspot"&&pc==="com"?oc=Z[Z.length-3]+".appspot.com":Z.length>1&&Ka(pc,rb)&&(oc=Z[Z.length-2]+"."+pc);R=oc;G("Cookie","Guessed public suffix: %s",R);Q=Wa(nc);
G("Cookie","Public suffix (from data): %s",Q);Q||(Q=L("optimizelyPublicSuffix")||"",G("Cookie","Public suffix (from cookie): %s",Q));!Q&&I("remote_public_suffix")&&(G("Cookie","Making request for public suffix on DOM ready"),$(Ha(xb,nc)));var qc=L("optimizelyBuckets"),qb=qc!==h&&qc!==i;
(function(){var a=L("optimizelyBuckets");if(a){try{a=M(a)}catch(b){a={}}var c={};n(a,function(a,b){var b=String(b),f=F(b);y(f).length>1&&b.indexOf("_")===-1?(c[f]=c[f]||{},c[f][a]=b):b!=="0"?C(b,"cookie",!1):Db(a)});n(c,function(a,b){var c;a:{c=[];for(var g=y(a),l=0;l<g.length;l++){var q=b[g[l]];if(q==="0"){c="";break a}c.push(q)}c=c.join("_")}c.length>0?C(c,"cookie",!1):Db(a)})}})();
(function(){bc.push(ta);var a={$:$,activeExperiments:Aa||[],allExperiments:Ba(),all_experiments:Ba(),allVariations:I("variations")||{},revision:I("revision"),variationIdsMap:ua,variation_map:E,variationMap:E,variationNamesMap:va},b={},c=Ha(oa,b);za(b,{acknowledgePreviewMode:bb,activate:aa,bucketUser:ga,delayDomReadyEval:Nb,delayPageviewTracking:Ca,disable:ma,integrationPrefix:Wb,push:c,sc_activate:Qb,sc_svar:Xb,skipPageTracking:Ea,trackEvent:u.r});za(a,b);b=window.optimizely;D(b)&&n(b,function(a){c(a)});
window.optimizely=a})();B("Info","Is enabled: "+j);B("Info","Is previewing: "+S);B("Info","Script to load: "+(T||"none"));B("Info","Browser type: "+lb());B("Info","Browser version: "+mb());var rc=nb();rc!=="unknown"&&B("Info","Mobile browser type: "+rc);B("Info","Visitor type: "+(qb?"returning":"new"));B("Info","User ID: "+ob());T&&Ma(T);
j&&(n(o(),function(a){if(!Ka(a,U)&&ba(a)){B("Distributor","Going to distribute "+J(a));var b=ca(a),c=!1;S&&cb.length>0&&!z(cb,a)&&(B("Distributor","Not going to evaluate because of preview mode, for "+J(a)),c=!0,K[a]="it is not being previewed");b&&!c&&(U=U||[],U.push(a))}}),ea(),u.A(),Fa||(Da>0?setTimeout(function(){u.f(document.location.href)},Da):u.f(document.location.href)),u.n(),fa(),Vb());
H&&(n(v,function(a){var b=t(a,"name")||"";B("Plan","Ignore experiment '"+b+"' ("+a+")")}),n(w,function(a){var b=F(a.id),c=ya(a.id);B("Plan",J(b)+' in variation "'+c+'" ('+a.id+")")}));j&&(da(),ta(),sa());
if(S)window.optimizelyPreview=window.optimizelyPreview||[],B("Preview","Will load preview script"),$(document).ready(function(){var a="//optimizely.s3.amazonaws.com/js/"+I("id")+"_preview.js?account_id="+I("id")+"&no_cache="+Math.floor(1E9*Math.random());Ma(a);B("Preview","Now loading preview script "+a)});

optly.Cleanse.finish();
})();
