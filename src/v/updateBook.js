pl.v.updateBook = {
    setupUserInterface: function () {
      const formEl = document.forms["Book"],
          saveButton = formEl.commit,
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
      // when a book is selected, fill the form with its data
      selectBookEl.addEventListener("change", 
          pl.v.updateBook.handleBookSelectionEvent);
      // set an event handler for the submit/save button
      saveButton.addEventListener("click",
          pl.v.updateBook.handleSaveButtonClickEvent);
      // handle the event when the browser window/tab is closed
      window.addEventListener("beforeunload", Book.saveAll);
    },
    
    //A book selection event is caught via a listener for change events on the select element. 
    // When a book is selected, the form is filled with its data:

    handleBookSelectionEvent: function () {
        const formEl = document.forms["Book"],
              selectBookEl = formEl.selectBook,
              key = selectBookEl.value;
        if (key) {
          const book = Book.instances[key];
          formEl.isbn.value = book.isbn;
          formEl.title.value = book.title;
          formEl.year.value = book.year;
        } else {
          formEl.reset();
        }
      },

      //When the save button is activated, a slots record is created from the form field values
      //  and used as the argument for calling Book.update:


      handleSaveButtonClickEvent: function () {
        const formEl = document.forms["Book"],
              selectBookEl = formEl.selectBook;
        const slots = { isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };
        Book.update( slots);
        // update the selection list option element
        selectBookEl.options[selectBookEl.selectedIndex].text = slots.title;
        formEl.reset();
      }
    
  };