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

  function createButton(className, iconSrc, labelText, target) {
    // Element
    const button = document.createElement("button")
    button.classList.add(className)

    // Icon
    const icon = document.createElement("img")
    icon.src = iconSrc
    button.appendChild(icon)

    // Label
    const label = document.createElement("span")
    label.textContent = labelText
    button.appendChild(label)

    // Append and return button
    target.appendChild(button)
    return button;
  }

  function addBookToDOM(book) {
    const listItem = document.createElement("li")

    const headerGroup = document.createElement("hgroup")
    listItem.appendChild(headerGroup)

    const name = document.createElement("h2")
    name.textContent = book.name
    headerGroup.appendChild(name)

    // Metadata
    const metadata = document.createElement("div")
    metadata.classList.add("metadata")
    headerGroup.appendChild(metadata)

    const author = document.createElement("p")
    author.textContent = book.author;
    metadata.appendChild(author)

    const pages = document.createElement("p")
    pages.textContent = book.pages + " pages"
    metadata.appendChild(pages)

    listItem.setAttribute("id", book.id)

    const buttons = document.createElement("div")
    buttons.classList.add("buttons")
    listItem.appendChild(buttons)

    const deleteButton = createButton("delete-button", "./img/delete.svg", "Delete", buttons)

    deleteButton.addEventListener("click", () => {
      list.removeChild(listItem)
      library = library.filter((obj) => {
        return obj.id !== book.id
      })
    })

    // Read Button
    function updateReadButton() {
      readButtonSpan.textContent = book.isRead ? "Mark unread" : "Mark read"
      readButtonIcon.src = book.isRead ? "img/unread.svg" : "img/check.svg"
    }

    const readButton = createButton("read-button", "img/check.svg", "", buttons)
    const readButtonSpan = readButton.querySelector("span");
    const readButtonIcon = readButton.querySelector("img")
    updateReadButton()

    readButton.addEventListener("click", () => {
      book.isRead = !book.isRead
      updateReadButton()
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

  // dialog.showModal()

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
      dialog.close()
    } else {
      form.reportValidity()
    }
  })
})
