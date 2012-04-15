$(function(){
if ($.browser.msie && parseInt($.browser.version) < 7)
{
$("#nav li").hover(
  function(){$(this).addClass("sf");},
  function(){$(this).removeClass("sf");});
$(".Flyout li").hover(
  function(){$(this).addClass("sf");},
  function () { $(this).removeClass("sf"); });
}});

function swipe(state){
var text = "Enter City, State, Country or U.S. Zip code or Airport Id";
if (state == 'on' && $("#searchBox").val() == text){
  $("#searchBox").val("");$("#searchBox").css("font-size", "11px");$("#searchBox").css("color", "#454545");}
else if ($("#searchBox").val() == ""){
  $("#searchBox").val(text);$("#searchBox").css("font-size", "10px");$("#searchBox").css("color", "#999");}}

function refer(state){
if (state == 'open') { $("#referral").css("visibility", "visible"); }
else {$("#referral").css("visibility", "hidden");}}

function setCookie(c_name, value, expiredays) {
var exdate = new Date();
exdate.setDate(exdate.getDate() + expiredays);
document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";path=/;expires=" + exdate.toGMTString());}

function getCookie(c_name){
if (document.cookie.length > 0) {
  c_start = document.cookie.indexOf(c_name + "=")
  if (c_start != -1) {
    c_start = c_start + c_name.length + 1
    c_end = document.cookie.indexOf(";", c_start)
    if (c_end == -1) c_end = document.cookie.length
    return unescape(document.cookie.substring(c_start, c_end))
  }} return ""}

  $(document).ready(function () {
    $("#searchBox").autocomplete("/Search.axd", {
      dataType: 'jsonp',
      parse: function (data) {
        var rows = new Array();
        for (var i = 0; i < data.results.count; i++) {
          rows[i] = { data: data.results.locations.location[i], value: data.results.locations.location[i].name, result: data.results.locations.location[i].name };
        }
        return rows;
      },
      minChars: 3,
      formatItem: function (row, i, n) { return row.name } 
    });
    $("#searchBox").result(function (event, data, formatted) {
      location.href = '/Local/Weather.aspx?location=' + data.id;
    });
    $('#local').hover(
      function(){ if ($('#recent', this).length) { $(this).addClass('loc-hvr').find('#recent').show(); } },
      function(){ if ($('#recent', this).length) { $(this).removeClass('loc-hvr').find('#recent').hide(); } });
  });

function search(query){
if (query != "")
  location.href = '/Local/Default.aspx?query=' + query;}

function webSearch(){
var webTerm = document.getElementById("WebTerm");
if (webTerm.value != "") {
  window.open("http://www.google.com/custom?q=" + webTerm.value + "&client=pub-4858314627001604&forid=1&ie=ISO-8859-1&oe=ISO-8859-1&cof=GALT%3A%23ADAB9A%3BGL%3A1%3BDIV%3A%236F6C54%3BVLC%3AFF6600%3BAH%3Acenter%3BBGC%3A383737%3BLBGC%3A383737%3BALC%3AFFFFFF%3BLC%3AFFFFFF%3BT%3AFFFFFF%3BGFNT%3ACCCCCC%3BGIMP%3ACCCCCC%3BFORID%3A1%3B&hl=en");}}

function StringBuilder(value) { this.strings = new Array(""); this.append(value); }
StringBuilder.prototype.append = function(value) { if (value) { this.strings.push(value); } }
StringBuilder.prototype.clear = function() { this.strings.length = 1; }
StringBuilder.prototype.toString = function() { return this.strings.join(""); }

function INavAdd() {
  var iNavUrl = getPathAndQuery();
  $.post("/INav.axd", { iNavName: $("#iNavText").val(), iNavUrl: iNavUrl });
  location.href = iNavUrl;
}

function getPathAndQuery() {
  var url = new StringBuilder();
  url.append(location.pathname);
  if (location.search.substring(1).length > 0) {
    url.append("?");
    url.append(location.search.substring(1));
  }
  return url.toString();
}

function SendReferral(){
if ($("#FromName").val() == '')
  window.alert("Please provide your name.");
if ($("#FromEmail").val() == '')
  window.alert("Please provide your email address.");
if ($("#ToEmail").val() == '')
  window.alert("Please provide friend's email address.");
if (($("#FromName").val() != '') && ($("#FromName").val() != '') && ($("#FromName").val() != '')) {
  $.post("/referral.axd", { name: $("#FromName").val(), from: $("#FromEmail").val(), to: $("#ToEmail").val(), url: getPathAndQuery() });
  $("#referralForm").hide();
  $("#referralMessage").show();}}
  
function FeedbackResponse()
{
  $.post("/Feedback.axd", { toEmail: $("#feedbackResponseToEmail").val(), response: $("#feedbackResponseText").val() } );
  location.reload(true);
}