
/** Dummy function that only returns Ephesians but will return current chapter, 
 *  probably located in another script
 */
 function getCurrentBook() {
 	return viewedBookName;
 }

function getCurrentChapter(word) {
	var verseElement = word.parentElement;
	if ($(verseElement).is('.verse') == true) {
		return $(verseElement).attr('chapter-number');
	}
	else {
		return $(word).attr('chapter-number');
	}
	return '0';
}

/**Copy function that gets the selected text from document and copies reference information with it */
function copyFunction() {
	var words = getSelectedElements();
	if (typeof words != "undefined") {	
		if (words.length > 0) {
			//get the first and last word that the user highlighted
			var firstWord = words[0];
			var lastWord = words[words.length - 1];
			var firstVerse = $(firstWord.parentElement).attr('verse-number');
			var lastVerse = $(lastWord.parentElement).attr('verse-number');	
			var reference;
			//make the reference, but in different formats according to how many chapters/verses
			// the user selected
			if (getCurrentChapter(firstWord) == getCurrentChapter(lastWord)) {
				if (firstVerse == lastVerse) { /*there is a bug that only allows the verse number to be 
												found from the word span rather than verse span if this 'if statement' succeeds*/
					reference = getCurrentBook() + " " + getCurrentChapter(firstWord) + ':' + $(firstWord).attr('verse-number');
				}
				else {
					reference = getCurrentBook() + ' ' + getCurrentChapter(firstWord) + ':' + firstVerse + ' - ' + lastVerse;
				}
			}
			else {
				reference = getCurrentBook() + ' ' + getCurrentChapter(firstWord) + ':' + $(firstWord).attr('verse-number') +
				' - ' + getCurrentChapter(lastWord) + ':' + $(lastWord).attr('verse-number');
			}
			var output = '';
			var currentVerseNumber = $(firstWord).attr('verse-number');
			for (var i = 0; i < words.length; i++) { /*append the selected words to the output with spaces and line breaks
														as appropriate
														*/
				if (currentVerseNumber != $(words[i]).attr('verse-number')) {
					currentVerseNumber = $(words[i]).attr('verse-number');
					output += '\n';
				}
				output += $(words[i]).text();
				
				if (i < words.length - 1) {
					output += ' ';
				}
			}
			output += '\n' + reference; //append reference at the end
			toastr.info('Copied!');    /* this shows a toast message letting the 
										user know their selection was successfully copied
										*/
			return output;
			/*
			console.log('output: ' + output);
			var copyElement = document.createElement('div');
			copyElement.innerHtml = output;
			$(copyElement).attr('id', 'copy-target');
			$(copyElement).attr('data-clipboard-text', '#copy-target');
			
			*/
			
			/*
			document.execCommand('copy');
			//clearLastSelection();
			*/
		}
	}

}

$(function() { //createss the clipboard object from the external script
	var clipboard = new Clipboard('#copy-button',
		{
			text: function(trigger) { /*calls the copyFunction and copies the string it returns
										to the clipboard
										*/
				return copyFunction();
			}
		});
});