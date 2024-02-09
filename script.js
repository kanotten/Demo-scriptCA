// let chair = {
//     color: "grey",
//     height: 100,
//     spin() {
//         console.log("it spins");
//     },
// };

// chair.spin();

// getting title from API and displaying it on html page.
const bookListDiv = document.getElementById("book-list");
const filter = document.getElementById("BTNFilter");
const drowpDownAuthorList = document.getElementById("authorList");
filter.addEventListener("click", () => {
  filterByAuthor(drowpDownAuthorList.value);
});

let bookData = [];

fetch("http://localhost:3000/books")
  .then((response) => response.json())
  .then((bookResultData) => {
    bookData = bookResultData;

    for (const book of bookData) {
      displayBook(book);
    }
    loadAuthorIntoDropDown();
  });

function displayBook(book) {
  const bookDiv = document.createElement("div");
  const bookTitlePara = document.createElement("p");
  bookTitlePara.innerText = book.title;
  const bookImg = document.createElement("img");
  bookImg.src = `http://localhost:3000/assets/images/${book.coverImg}`;
  bookImg.alt = "a picture of a book";
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookTitlePara);
  bookListDiv.appendChild(bookDiv);
}

// let user = {
//     fName: "Chris",
//     lName: "Berg",
//     age: 20,
// };

// sessionStorage.setItem("User", JSON.stringify(user));

function filterByAuthor(authorToFilter) {
  // filter the array
  const filteredResult = [];

  for (const book of bookData) {
    if (book.author === authorToFilter) {
      filteredResult.push(book);
    }
  }

  // update the dom
  // clear the old list
  bookListDiv.innerHTML = "";

  // loop through the filteredList
  for (const book of filteredResult) {
    // render each filteredbook
    displayBook(filteredResult);
  }
}

function loadAuthorIntoDropDown() {
  for (const book of bookData) {
    // create an option with author name
    const authorOption = document.createElement("option");
    authorOption.innerText = book.author;

    // add it to the dropdown
    drowpDownAuthorList.appendChild(authorOption);
  }
}
