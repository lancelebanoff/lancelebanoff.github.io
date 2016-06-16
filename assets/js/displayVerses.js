function displayBookChapter(bookName, chapterIndex) {
	$("#chapter-header").text(bookName + " " + indexAsString(chapterIndex));
	$("#scripture-text").html("");
	var chapter = bibleObject[bookName][chapterIndex];
	for(verseIndex = 0; verseIndex < chapter.length; verseIndex++) {
		var verse = chapter[verseIndex];
		displayVerse(verse, verseIndex);
	}
	waitThenHandleDefinitionPopovers();
}

function waitThenHandleDefinitionPopovers() {
	if(lexiconIsParsed) {
		handleDefinitionPopovers();
		return;
	}
	setTimeout(waitThenHandleDefinitionPopovers, 50);
}

function displayVerse(verse, verseIndex) {
	var verseIndexAsString = indexAsString(verseIndex);
	var verseSpan = document.createElement("span");
	$(verseSpan).attr("verse-number", verseIndexAsString);
	$(verseSpan).addClass('verse');
	var wordIndex ;
	for(wordIndex = 0; wordIndex < verse.length; wordIndex++) {
		var wordSpan = document.createElement("span");
		$(wordSpan).text(verse[wordIndex].text);
		$(wordSpan).attr("word-number", indexAsString(wordIndex));
		$(wordSpan).attr("word-strong-number", verse[wordIndex].strongNumber);
		$(wordSpan).attr("word-morphology", verse[wordIndex].morphology);
		$(wordSpan).attr('verse-number', verseIndexAsString);
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