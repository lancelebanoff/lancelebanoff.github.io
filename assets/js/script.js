var jsonObject;
var bibleObject = {};
var lexiconObject = {};
var lexiconIsParsed = false;

$(function() {
	var bookName = "Ephesians";
	var bookFileName = "assets/json/Ephesians.json";
	var parseBookAndDisplayFunction = function(jsonText, bookName) {
		return parseBookAndDisplay(jsonText, bookName);
	};
	readTextFile(bookFileName, bookName, parseBookAndDisplayFunction);

	$(".dropdown-menu-chapter li a").click(function() {
		var selectedItem = $(this).parents(".dropdown").find('.btn');
		var selectedValue = $(this).text();
		$(selectedItem).html(selectedValue + ' <span class="caret"></span>');
		// $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
		displayBookChapter(bookName, parseInt(selectedValue) - 1);
	});
});

function parseBookAndDisplay(jsonText, bookName) {
	parseBook(jsonText, bookName);
	displayBookChapter(bookName, 0);
	fillChapterDropdown(bookName);
}

function fillChapterDropdown(bookName) {
	var book = bibleObject[bookName];
	var numChapters = book.length;
	var chaptersHtml = "";
	var i;
	for(i = 1; i <= numChapters; i++) {
		chaptersHtml += "<li><a>" + i + "</a></li>";
	}
	$(".dropdown-menu-chapter").html(chaptersHtml);
}