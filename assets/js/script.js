var jsonObject;
var bibleObject = {};
var lexiconObject = {};
var lexiconIsParsed = false;
var viewedBookName = "";

$(function() {
	findAndParseAllBooks();
});