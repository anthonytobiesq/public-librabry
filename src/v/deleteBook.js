pl.v.deleteBook = {
    setupUserInterface: function () {
      const formEl = document.forms["Book"],
          deleteButton = formEl.commit,
          selectBookEl = formEl.selectBook;
      Book.retrieveAll();  // load all book objects
      // populate the selection list with books
      for (const key of Object.keys( Book.instances)) {
        const book = Book.instances[key];
        const optionEl = document.createElement("option");
        optionEl.text = book.title;
        optionEl.value = book.isbn;
        selectBookEl.add( optionEl, null);
      }
      // set an event handler for the submit/delete button
      deleteButton.addEventListener("click",
          pl.v.deleteBook.handleDeleteButtonClickEvent);
      // handle the event when the browser window/tab is closed
      window.addEventListener("beforeunload", Book.saveAll);
    },

    
    handleDeleteButtonClickEvent: function () {
        const selectEl = document.forms["Book"].selectBook,
              isbn = selectEl.value;
        if (isbn) {
          Book.destroy( isbn);
          // remove deleted book from select options
          selectEl.remove( selectEl.selectedIndex);
        }
      }
};