

/** Returns currently highlighted text */
function getSelectedText() {
		var text = "";

		//check for window or document selections and return in var

		if (window.getSelection) {
			text = window.getSelection().toString();
		}
		else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
}

function clearLastSelection(e) {
	//console.log('e: ' + e);
	//console.log('target: ' + e.target);
	//console.log('Target is copy-button?: ' + $(e.target).is('#copy-button'));
	if (typeof e == "undefined" || $(e.target).is('#copy-button') == false) {
		//console.log('clearLastSelection');
		if (window.getSelection) {
		  if (window.getSelection().empty) {  // Chrome
		    window.getSelection().empty();
		  } else if (window.getSelection().removeAllRanges) {  // Firefox
		    window.getSelection().removeAllRanges();
		  }
		} else if (document.selection) {  // IE?
		  document.selection.empty();
		}
	}
}

/** Returns the selected elements in an array
 *  but only the elements that are words in each verse */
function getSelectedElements() {
	var selection = window.getSelection(); //get what the user selected
	if (selection.rangeCount <= 0) {
		return;
	}
	var range = selection.getRangeAt(0);   //extract the range
	var docFragment = range.cloneContents(); //clone it into a doc fragment, which is like a 'cut-out' of the original html doc
	var words = docFragment.querySelectorAll('[word-number]'); //filter out everything except for words in verses
	return words;
	/*
	console.log('First Word: ' + words[0].innerText);
	console.log('Last Word: ' + words[words.length - 1].innerText);
	console.log('Words: ' + words);
	console.log(selection.anchorNode);
	console.log('Anchor offset: ' + selection.anchorOffset);
	console.log('Range Count: ' + selection.rangeCount);
	*/
}

function get_selection() {
	var selection = window.getSelection();
	return selection;
}

/** Returns the string 'Selected word x from verse y to ...' after user has made a selection */
function getSelectionInformation(opts) {
	var words;
	if (opts) {
		words = opts['words'];
	}
	else {
		words = getSelectedElements();
	}
	if (words.length > 0) {
		var firstWord = words[0];
		var lastWord = words[words.length - 1];
		var firstVerse = $(firstWord.parentElement).attr('verse-number');
		var lastVerse = $(lastWord.parentElement).attr('verse-number');	
		var firstChapter = 0;
		var lastChapter = 0;
		if (firstWord.parentElement) {
			firstChapter = $(firstWord.parentElement).attr('chapter-number');
		}
		if (lastWord.parentElement) {
			lastChapter = $(lastWord.parentElement).attr('chapter-number');
		}
		console.log('FirstChapter: ' + firstChapter);
		console.log('LastChapter: ' + lastChapter);
		if (firstChapter == lastChapter) {
			if (firstVerse == lastVerse) {
				if (firstWord == lastWord) {
					return "Selected word " + $(firstWord).attr('word-number') + " from verse " + $(firstWord).attr('verse-number');
				}
				return "Selected words " + $(firstWord).attr('word-number') + ' - ' + 
				$(lastWord).attr('word-number') + ' from verse ' + $(firstWord).attr('verse-number');
			}
			else {
				return "Selected word " + $(firstWord).attr('word-number') + ' from verse ' + 
				firstVerse + ' to word ' + $(lastWord).attr('word-number') + ' from verse ' + lastVerse;
			}
		}
		else {
			return "Selected word " + $(firstWord).attr('word-number') + ' from ' + firstChapter + ':' + firstVerse +
			' to word ' + $(lastWord).attr('word-number') + ' from ' + lastChapter + ':' + lastVerse;
		}
	}
	return "";
}

/** Called everytime a mouseup event is received. Checks for selected text and notifies user what words they selected and from
 *  from what verses 
 */
function doSomethingWithSelectedText(e) {
	//console.log('E: ' + e);
	//console.log('E.target: ', e.target);
	//console.log('E.target == false?: ' + $(e.target).is('#copy-button') == false);
	if ($(e.target).is('#copy-button') == false) {
		var words = getSelectedElements();
		if (words && words.length > 0) {
			openDialog(getSelectionInformation());
		}
	}
}

/** A function to count how many words are located in the selected text */
function wordCount(str) {
	var words = str.split(" ");
	for (var i = words.length - 1; i >= 0; i--) {
		if (words[i] === "") {
			words.splice(i, 1);
		}
	}
	return words.length;
}

/** This is called when page loads. It checks for selected text to keep the page persistent */
function checkForSelectedText() {
	doSomethingWithSelectedText();
}

$(function() {
	document.addEventListener('mouseup', doSomethingWithSelectedText, true);
	//document.getElementById('copy-button').addEventListener("click", copyFunction, true);
	document.addEventListener('mousedown', clearLastSelection, true);
	//document.addEventListener('copy', copyFunction, true);

	document.onload = checkForSelectedText;
})