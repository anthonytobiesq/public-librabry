function Book( slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
  };

  /*
  A class-level property Book.instances representing the collection of all Book instances managed by the application in the form of an entity table.

A class-level method Book.retrieveAll for loading all managed Book instances from the persistent data store.

A class-level method Book.saveAll for saving all managed Book instances to the persistent data store.

A class-level method Book.add for creating a new Book instance.

A class-level method Book.update for updating an existing Book instance.

A class-level method Book.destroy for deleting a Book instance.

A class-level method Book.createTestData for creating a few example book records to be used as test data.

A class-level method Book.clearData for clearing the book datastore.

  */

  Book.instances = {};

  Book.add = function ( slots) {
    const book = new Book( slots);
    Book.instances[slots.isbn] = book;
    console.log(`Book with ISBN ${slots.isbn} created!`);
  }

  Book.convertRec2Obj = function (bookRec) {
    return new Book(bookRec);
  };

  Book.retrieveAll = function () {
    var booksString="";  
    try {
      if (localStorage["books"]) {
        booksString = localStorage["books"];
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (booksString) {
      const books = JSON.parse( booksString);
      const keys = Object.keys( books);
      console.log(`${keys.length} books loaded.`);
      for (const key of keys) {
        Book.instances[key] = Book.convertRec2Obj( books[key]);
      }
    }
  };




  Book.update = function (slots) {
    const book = Book.instances[slots.isbn],
          year = parseInt( slots.year);  // convert string to integer
    if (book.title !== slots.title) book.title = slots.title;
    if (book.year !== year) book.year = year;
    console.log(`Book ${slots.isbn} modified!`);
  };


  Book.destroy = function (isbn) {
    if (Book.instances[isbn]) {
      console.log(`Book ${isbn} deleted`);
      delete Book.instances[isbn];
    } else {
      console.log(`There is no book with ISBN ${isbn} in the database!`);
    }
  };


  Book.saveAll = function () {
    var error = false;
    try {
      const booksString = JSON.stringify( Book.instances);
      localStorage["books"] = booksString;
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
      error = true;
    }
    if (!error) {
      const nmrOfBooks = Object.keys( Book.instances).length;
      console.log(`${nmrOfBooks} books saved.`);
    }
  };


  Book.createTestData = function () {
    Book.instances["006251587X"] = new Book(
        {isbn:"006251587X", title:"Weaving the Web", year:2000});
    Book.instances["0465026567"] = new Book(
        {isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
    Book.instances["0465030793"] = new Book(
        {isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
    Book.saveAll();
  };

  Book.clearData = function () {
    if (confirm("Do you really want to delete all book data?")) {
      localStorage["books"] = "{}";
    }
  };