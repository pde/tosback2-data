// This is a generic JS footer file that is included in all of our website
// pages.  The purpose of this is to easily drop in JS that is controlled
// to load when the end JSP for a page has loaded.

var     g_sBayNoteProducts = null;
try{ g_sBayNoteProducts = s.products } catch(e) {}

var g_oOmnitureObject = s;
