// !! Need the shelf help JSON server to be running on http://localhost:3000
const bookListDiv = document.getElementById("book-list");
const filterButton = document.getElementById("btnFilter");

filterButton.addEventListener("click", () => {
  filterByAuthor("Stephen Gundry");
});

let bookData = [];
// fetch the book data.
fetch("http://localhost:3000/books")
  .then((response) => {
    return response.json();
  })
  .then((bookResultData) => {
    bookData = bookResultData;

    for (const book of bookData) {
      displayBook(book);
    }

    // remove loading message
  });

// Defines a function to display a book's information in the DOM
function displayBook(book) {
  // Creates a new div element to hold the book's details
  const bookDiv = document.createElement("div");
  // Creates a new paragraph element for the book's title
  const bookTitlePara = document.createElement("p");
  // Sets the text of the paragraph to the book's title
  bookTitlePara.innerText = book.title;
  // Creates a new img element for the book's cover image
  const bookImg = document.createElement("img");
  // Sets the source of the image to the URL path of the book's cover image
  bookImg.src = `http://localhost:3000/assets/images/${book.coverImg}`;
  // Sets the alt text for the image for accessibility purposes
  bookImg.alt = "a picture of a book";
  // Appends the image element to the book div
  bookDiv.appendChild(bookImg);
  // Appends the title paragraph to the book div
  bookDiv.appendChild(bookTitlePara);

  // Finally, appends the book div to a parent div in the DOM,
  // represented here as `bookListDiv`, which should be predefined in the broader scope
  bookListDiv.appendChild(bookDiv);
}

function filterByAuthor(authorToFilterBy) {
  // filter the array by authors name
  let filteredResults = [];

  for (const book of bookData) {
    if (book.author === authorToFilterBy) {
      filteredResults.push(book);
    }
  }

  console.log(filteredResults);

  // update the dom to show the new array
  // pending .... next lesson
}

// Alternative function to create and insert the HTML to display a book but with templating
function displayBookAlt(book) {
  // Create the div element for the book
  const bookDiv = document.createElement("div");
  // Use template literals to construct the inner HTML of the bookDiv
  bookDiv.innerHTML = `
    <img src="http://localhost:3000/assets/images/${book.coverImg}" alt="a picture of a book">
    <p>${book.title}</p>
  `;
  // Append the bookDiv to the bookListDiv
  bookListDiv.appendChild(bookDiv);
}
