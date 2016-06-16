function readTextFile(fileName, bookName, callBackFunction)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                return callBackFunction(allText, bookName);
            }
        }
    }
    rawFile.send(null);
}

function parseBook(jsonText, bookName) {
	jsonObject = JSON.parse(jsonText);
	bibleObject[bookName] = [];
	var bookObject = bibleObject[bookName];
	var bookJson = jsonObject[bookName];
	parseChapters(bookObject, bookJson);
}

function parseChapters(bookObject, bookJson) {
	var chapterIndex = 0;
	while(indexAsString(chapterIndex) in bookJson) {
		var chapterJson = bookJson[indexAsString(chapterIndex)];
		var newNumChapters = bookObject.push([]);
		var chapterObject = bookObject[newNumChapters - 1];
		parseChapter(chapterObject, chapterJson);
		chapterIndex++;
	}
}

function parseChapter(chapterObject, chapterJson) {
	var verseIndex = 0;
	while(indexAsString(verseIndex) in chapterJson) {
		var verseText = chapterJson[indexAsString(verseIndex)];
		parseVerse(chapterObject, verseText);
		verseIndex++;
	}
}

function parseVerse(chapterObject, verseText) {
	var verseObject = [];
	verseText = removeExtraCharactersFromVerse(verseText);
	var verseArray = verseText.split(" ");
	var wordIndex = 0;
	while(wordIndex < verseArray.length) {
		// Retrieve word text and strong number
		var wordText = verseArray[wordIndex];
		var strongNumber = verseArray[wordIndex + 1];
		// Skip extra strong numbers if they exist and retrieve morphology
		wordIndex += 2;
		var regex = /G([0-9])+/;
		while(wordIndex < verseArray.length && regex.test(verseArray[wordIndex])) {
			wordIndex++;
		}
		var morphology = verseArray[wordIndex];
		// Save the word as an object in the verse object
		var wordObject = {};
		wordObject.text = wordText;
		wordObject.strongNumber = strongNumber;
		wordObject.morphology = morphology;
		verseObject.push(wordObject);
		// Go to next Greek word
		wordIndex++;
	}
	chapterObject.push(verseObject);
}

function removeExtraCharactersFromVerse(verseText) {
	// Remove square brackets and everything inside curly braces
	verseText = verseText.replace("[", "")
						.replace("]", "")
						.replace(/ *\{[^}]*\}/g, "");

	return verseText;
}

function indexAsString(index) {
	return "" + (index + 1);
}