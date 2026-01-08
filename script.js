// Setup library
let library = [];

function Book(name, author, pages, isRead) {
  this.id = crypto.randomUUID()
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Nodes

const list = document.getElementById("library")

// Add demo content

const book1 = new Book("The Client", "John Grisham", "188", true)
const book2 = new Book("Harry Potter", "J.K. Rowling", "512", true)
addBookToLibrary(book1)
addBookToLibrary(book2)

// Functions

function addBookToLibrary(book) {
  library.push(book)
}
function addBookToDOM(book) {
  const listItem = document.createElement("li")
  listItem.textContent = `${book.isRead ? "📗" : "📕"} ${book.name} by ${book.author} (${book.pages} pages)`
  listItem.setAttribute("id", book.id)

  // Delete Button
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-button")
  deleteButton.textContent = "Delete"
  listItem.appendChild(deleteButton)

  deleteButton.addEventListener("click", () => {
    list.removeChild(listItem)
    library = library.filter((obj) => {
      return obj.id !== book.id
    })
  })

  // Read Button
  const readButton = document.createElement("button")
  readButton.classList.add("read-button")
  readButton.textContent = "Read"
  listItem.appendChild(readButton)

  readButton.addEventListener("click", () => {
    book.isRead = !book.isRead
    const index = library.findIndex((obj) => obj.id === book.id)
    library.splice(index, 1, book)
  })

  list.appendChild(listItem)
}

// Create DOM elements
document.addEventListener("DOMContentLoaded", () => {

  library.forEach((book) => {
    addBookToDOM(book)
  })

  // Open Dialog Button
  const openDialogButton = document.getElementById("open-dialog")
  const dialog = document.querySelector("dialog")
  openDialogButton.addEventListener("click", () => {
    dialog.showModal()
  })
  const closeButton = dialog.querySelector("#close-dialog")
  closeButton.addEventListener("click", () => {
    dialog.close()
  })

  // Add Book Form
  const form = document.querySelector("form")
  const submitButton = form.querySelector("button")

  submitButton.addEventListener("click", (event) => {
    event.preventDefault()

    // Parse form data
    const data = new FormData(form)
    const name = data.get("name")
    const author = data.get("author")
    const pages = data.get("pages")
    const isRead = data.get("is-read")

    const book = new Book(name, author, pages, isRead)
    addBookToLibrary(book)
    addBookToDOM(book)
  })
})
