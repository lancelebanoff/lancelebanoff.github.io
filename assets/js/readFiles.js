function readTextFile(fileName, callBackFunction)
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
                return callBackFunction(allText);
            }
        }
    }
    rawFile.send(null);
}

function findAndParseAllBooks() {
    var fileListFileName = "assets/json/file-list.json";
    var parseAllBooksFunction = function(jsonText) {
        return parseAllBooks(jsonText);
    }
    readTextFile(fileListFileName, parseAllBooksFunction);
}

function parseAllBooks(fileListJsonText) {
    var fileList = JSON.parse(fileListJsonText);
    var books = fileList["books"];
    fillBooksDropdown(books);
    // Parse first book and display its first chapter
    var bookName = books[0];
    var bookFileName = "assets/json/books/" + bookName + ".json";
    var parseBookAndDisplayFunction = function(bookJsonText) {
        return parseBookAndDisplay(bookJsonText, bookName);
    };
    readTextFile(bookFileName, parseBookAndDisplayFunction);
    // Parse the rest of the books
    for(var i = 1; i < books.length; i++) {
        bookName = books[i];
        bookFileName = "assets/json/books/" + bookName + ".json";
        var parseBookFunction = function(bookJsonText) {
            return parseBook(bookJsonText, bookName);
        };
        readTextFile(bookFileName, parseBookFunction);
    }
}

function parseBookAndDisplay(jsonText, bookName) {
    parseBook(jsonText, bookName);
    displayBookChapters(bookName, 0, 0);
    fillChapterDropdowns(bookName);
}
