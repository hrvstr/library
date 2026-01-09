// Setup library
let library = [];

function Book(name, author, pages, isRead) {
  this.id = crypto.randomUUID()
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("library")

  // Add demo content
  const book1 = new Book("The Client", "John Grisham", "188", true)
  const book2 = new Book("Harry Potter", "J.K. Rowling", "512", false)
  addBookToLibrary(book1)
  addBookToLibrary(book2)

  // Functions

  function addBookToLibrary(book) {
    library.push(book)
  }

  function addBookToDOM(book) {
    const listItem = document.createElement("li")

    const name = document.createElement("h2")
    name.textContent = book.name
    listItem.appendChild(name)

    // Metadata
    const metadata = document.createElement("div")
    metadata.classList.add("metadata")
    listItem.appendChild(metadata)

    const author = document.createElement("p")
    author.textContent = book.author;
    metadata.appendChild(author)

    const pages = document.createElement("p")
    pages.textContent = book.pages + " pages"
    metadata.appendChild(pages)

    // listItem.textContent = `${book.isRead ? "📗" : "📕"} ${book.name} by ${book.author} (${book.pages} pages)`
    listItem.setAttribute("id", book.id)

    const buttons = document.createElement("div")
    buttons.classList.add("buttons")
    listItem.appendChild(buttons)

    // Delete button
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    deleteButton.textContent = "Delete"
    buttons.appendChild(deleteButton)

    deleteButton.addEventListener("click", () => {
      list.removeChild(listItem)
      library = library.filter((obj) => {
        return obj.id !== book.id
      })
    })

    // Read button
    const readButton = document.createElement("button")
    readButton.classList.add("read-button")
    readButton.textContent = "Read"
    buttons.appendChild(readButton)

    readButton.addEventListener("click", () => {
      book.isRead = !book.isRead
      const index = library.findIndex((obj) => obj.id === book.id)
      library.splice(index, 1, book)
    })

    list.appendChild(listItem)
  }

  // Create DOM elements

  library.forEach((book) => {
    addBookToDOM(book)
  })

  // Open dialog button
  const openDialogButton = document.getElementById("open-dialog")
  const dialog = document.querySelector("dialog")
  openDialogButton.addEventListener("click", () => {
    dialog.showModal()
  })

  // Close dialog button
  const closeButton = dialog.querySelector("#close-dialog")
  closeButton.addEventListener("click", () => {
    dialog.close()
  })

  // Add book Form
  const form = document.querySelector("form")
  const submitButton = form.querySelector("button")

  submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (form.checkValidity()) {
      // Parse form data
      const data = new FormData(form)
      const name = data.get("name")
      const author = data.get("author")
      const pages = data.get("pages")
      const isRead = data.get("is-read")
      const book = new Book(name, author, pages, isRead)
      addBookToLibrary(book)
      addBookToDOM(book)
      form.reset()
    } else {
      form.reportValidity()
    }
  })
})
