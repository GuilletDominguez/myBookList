class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }

}
class UI {
    static displayBooks() {
        defaultBooks.forEach((book) => UI.addBookToList(book))
        let listBooks= Store.getBooks();
        listBooks.forEach((book) => UI.addBookToList(book));


    };
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row)
    }

    static clearFieldsUI() {

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';


    }

    static deleteBook() {
        document.querySelector('#book-list').addEventListener('click', (e) => {
            Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
            if (e.target.classList.contains('delete')) {
                e.target.parentElement.parentElement.remove();
            }
            UI.showAlert('Book Removed', 'success');
        });


    }




    static showAlert(message, className) {
        let booker = document.getElementById('book-form');
        booker.innerHTML += `<div id ="quite" class= "alert alert-${className}">${message}</div>`
        removeAlert();


    }

}
class Store {
    static getBooks() {

        let pico = JSON.parse(localStorage.getItem('books'));


        if (pico == null) {

            return []
        }

        else {
            return pico
        }

    }


    static addBook(books) {

        localStorage.setItem('books', JSON.stringify(books))




    }
    static removeBook(isbn) {
        const deletBook = Store.getBooks();
        deletBook.forEach((pico, index) => {
            if (pico.isbn === isbn) {
                deletBook.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(deletBook));
    }

}



const defaultBooks = [
    {
        title: 'Book 1',
        author: 'Brad Traversy',
        isbn: '12345'
    },
    {
        title: 'Book 2',
        author: 'Mehul Mohan',
        isbn: '6789'
    }
]

const books = JSON.parse(localStorage.getItem('books')) || [];


document.querySelector('#book-form').addEventListener('submit', addABook, false)

function addABook(e) {
    e.preventDefault()
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;
    let newBook = new Book(title, author, isbn);
    if (title == '' || author == '' || isbn == '') {
        UI.showAlert('Please enter correct details', 'danger')
    }

    else {
        UI.showAlert('Book Added', 'success');
        books.push(newBook)

        UI.addBookToList(newBook);
        UI.clearFieldsUI(newBook);
        Store.addBook(books);
    }

}

UI.deleteBook()

function removeAlert() {
    setTimeout(
        function () {
            let quite = document.getElementById('quite')

            quite.remove()

        }, 2000);
}


Store.getBooks()

UI.displayBooks()

