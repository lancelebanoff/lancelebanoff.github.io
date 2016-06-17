function displayBookChapters(bookName, startChapterIndex, endChapterIndex) {
	viewedBookName = bookName;
	$("#scripture-text").html("");
	for(var i = startChapterIndex; i <= endChapterIndex; i++) {
		displayChapter(bookName, i);
	}
	waitThenHandleDefinitionPopovers();
}

function displayChapter(bookName, chapterIndex) {
	// Display chapter header
	var chapterHeader = document.createElement("h1");
	$(chapterHeader).addClass("chapter-header");
	$(chapterHeader).text(bookName + " " + indexAsString(chapterIndex));
	$("#scripture-text").append($(chapterHeader));
	var linebreak = document.createElement("br");
	$("#scripture-text").append($(linebreak));
	// Display verses
	var chapter = bibleObject[bookName][chapterIndex];
	for(verseIndex = 0; verseIndex < chapter.length; verseIndex++) {
		var verse = chapter[verseIndex];
		displayVerse(verse, verseIndex, chapterIndex);
	}
}

function waitThenHandleDefinitionPopovers() {
	if(lexiconIsParsed) {
		handleDefinitionPopovers();
		return;
	}
	setTimeout(waitThenHandleDefinitionPopovers, 50);
}

function displayVerse(verse, verseIndex, chapterIndex) {
	var verseIndexAsString = indexAsString(verseIndex);
	var chapterIndexAsString = indexAsString(chapterIndex);
	var verseSpan = document.createElement("span");
	$(verseSpan).attr("verse-number", verseIndexAsString);
	$(verseSpan).attr("chapter-number", chapterIndexAsString);
	$(verseSpan).addClass('verse');
	var wordIndex ;
	for(wordIndex = 0; wordIndex < verse.length; wordIndex++) {
		var wordSpan = document.createElement("span");
		$(wordSpan).text(verse[wordIndex].text);
		$(wordSpan).attr("word-number", indexAsString(wordIndex));
		$(wordSpan).attr("word-strong-number", verse[wordIndex].strongNumber);
		$(wordSpan).attr("word-morphology", verse[wordIndex].morphology);
		$(wordSpan).attr('verse-number', verseIndexAsString);
		$(wordSpan).attr("title", "Definition");
		$(wordSpan).attr("data-toggle", "popover");
		$(wordSpan).attr("data-html", "true");
		$(wordSpan).attr('chapter-number', chapterIndexAsString);
		$(wordSpan).addClass('word');
		$(verseSpan).append($(wordSpan));

		if (wordIndex != verse.length - 1) { //if we're not at the end of the verse, add a space after each word
			var spaceSpan = document.createElement('span');
			$(spaceSpan).text(' ');
			$(verseSpan).append(spaceSpan);
		}
	}
	$("#scripture-text").append($(verseSpan));
	// Add line breaks between verses
	for(i = 0; i < 2; i++) {
		var br = document.createElement("br");
		$("#scripture-text").append($(br));
	}
}