/*
 * When you click a word, a popover appears with the morphology and definition
*/

// Adds definition and morphology to each word's popover
function addAllDefinitions() {
	$(".word").each(function(index) {
		// Gets the strong number without the letter
		var strongNum = $(this).attr("word-strong-number").substr(1);
		var item = findLexiconItem(strongNum);
		$(this).attr("title", "Definition");
		$(this).attr("data-toggle", "popover");
		$(this).attr("data-html", "true");
		if (item != null) {
			$(this).attr("data-content", "<i>" + item["morphology"] + "</i><br>" + item["long"]);
		}
		// If definition was not found
		else {
			$(this).attr("data-content", "<i>" + $(this).attr("word-morphology") + "</i><br>No definition found");
		}
	});
}

function findLexiconItem(strongNum) {
	if(strongNum in lexiconObject) {
		return lexiconObject[strongNum];
	}
	return null;
}

// By default, popovers don't disappear until the word is clicked, so this makes them disappear when clicked outside
function makePopoversHideable() {
	$('body').on('click', function (e) {
	    $('[data-toggle="popover"]').each(function () {
	        //the 'is' for buttons that trigger popups
	        //the 'has' for icons within a button that triggers a popup
	        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
	            $(this).popover('hide');
	        }
	    });
	});

	// Fixes a bug so only one click is needed to reopen a popover
	$('body').on('hidden.bs.popover', function (e) {
	    $(e.target).data("bs.popover").inState.click = false;
	});
}

// Main
$(function() {
	var lexiconFileNAme = "assets/json/lexicon-eph-english.json";
	var continueStartingFunction = function(lexiconText, deadParam) {
		return continueStarting(lexiconText, deadParam);
	};
	readTextFile(lexiconFileNAme, null, continueStartingFunction);
});

// Continues Main after async readTextFile()
function continueStarting(lexiconText, deadParam) {
	var lexiconJson = JSON.parse(lexiconText);
	parseLexicon(lexiconJson);
}

function parseLexicon(lexiconJson) {
	for(var wordIndex = 0; wordIndex < lexiconJson.length; wordIndex++) {
		parseLexiconWord(lexiconJson[wordIndex]);
	}
	lexiconIsParsed = true;
}

function parseLexiconWord(wordJson) {
	var strongNumber = wordJson["strongs"];
	var word = {};
	word["morphology"] = wordJson["morphology"];
	word["long"] = wordJson["long"];
	lexiconObject[strongNumber] = word;
}

function handleDefinitionPopovers() {
	addAllDefinitions();
	makePopoversHideable();
	// Creates popovers for all words
    $('[data-toggle="popover"]').popover(); 
}
