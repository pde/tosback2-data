var expdate = new Date ();
expdate.setTime (expdate.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year from now
document.cookie="JS=ON; expires=" + expdate.toGMTString() + "; path=/; domain="+document.domain;

