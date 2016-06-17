$(function() {
    $("#start-chapter-dropdown").val("1");
    $("#book-dropdown").change(function() {
        displayBookChapters(this.value, 0, 0);
        fillChapterDropdowns(this.value);
        $("#start-chapter-dropdown").val("1");
    });
    $("#start-chapter-dropdown").change(function() {
        fillEndDropDownWithRemainingChapters(viewedBookName);
        $("#end-chapter-dropdown").val(this.value);
        displayBookChapters(viewedBookName, this.value - 1, this.value - 1);
    });
    $("#end-chapter-dropdown").change(function() {
        displayBookChapters(viewedBookName, $("#start-chapter-dropdown").val() - 1, this.value - 1);
    });
});

function fillBooksDropdown(books) {
    var numBooks = books.length;
    var booksHtml = "";
    var i;
    for(i = 0; i < numBooks; i++) {
        booksHtml += "<option value='" + books[i] + "'>" + books[i] + "</option>";
    }
    $("#book-dropdown").html(booksHtml);
}

function fillChapterDropdowns(bookName) {
    var book = bibleObject[bookName];
    var numChapters = book.length;
    var chaptersHtml = "";
    var i;
    for(i = 1; i <= numChapters; i++) {
        chaptersHtml += "<option value='" + i + "'>" + i + "</option>";
    }
    $("#start-chapter-dropdown").html(chaptersHtml);
    $("#end-chapter-dropdown").html(chaptersHtml);
}

function fillEndDropDownWithRemainingChapters(bookName) {
    var selectedChapterNum = $("#start-chapter-dropdown").val();
    var book = bibleObject[bookName];
    var numChapters = book.length;
    var chaptersHtml = "";
    for(var i = parseInt(selectedChapterNum); i <= numChapters; i++) {
        chaptersHtml += "<option value='" + i + "'>" + i + "</option>";
    }
    $("#end-chapter-dropdown").html(chaptersHtml);
}