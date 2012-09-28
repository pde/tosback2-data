// $Id: cufon-drupal.js,v 1.1 2009/07/13 21:41:46 eads Exp $

// Initialize Cufon based on Drupal settings
for (o in Drupal.settings.cufonSelectors) { 
  s = Drupal.settings.cufonSelectors[o];
  Cufon.replace(s.selector, s.options)
}

// Work around Internet Explorer rendering delay
Cufon.now();
