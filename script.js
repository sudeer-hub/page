const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// When clicking the Search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchBooks(query);
  }
});

// When pressing Enter key inside the input box
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchBooks(query);
    }
  }
});
function searchBooks(query) {
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      displayResults(data.items);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      resultsDiv.innerHTML = "<p>Something went wrong.</p>";
    });
}
function displayResults(books) {
  resultsDiv.innerHTML = "";

  if (!books || books.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  books.forEach(book => {
    const info = book.volumeInfo;
    const title = info.title || "No Title";
    const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
    const thumbnail = info.imageLinks?.thumbnail || "";
    const previewLink = info.previewLink || "#";

    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p><strong>Author:</strong>${authors}</p>
      <a href="${previewLink}" target="_blank">Preview</a>
    `;

    resultsDiv.appendChild(bookDiv);
  });
}

