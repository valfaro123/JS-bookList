//UI vars
const title = document.getElementById('title'),
        author= document.getElementById('author'),
        isbn= document.getElementById('isbn'),
        container = document.querySelector('.container'),
        form = document.querySelector('#book-form');

class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBook(book){

        const list = document.getElementById('book-list');

        //Create tr element for new book
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        //append to list
        list.appendChild(row);
        

    }

    showAlert(message,className){
        const div = document.createElement('div');
        
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        //insert alert to html
        container.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2500)
    

    }

    removeBook(target){
        if(target.className=='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        title.value='';
        author.value='';
        isbn.value = '';
    }

}

//Local Storage Class
class Store{

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            //Add book to UI
            ui.addBook(book);
        })
    }

    //save books to local storage
    static storeBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books==[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    

    static unstoreBook(isbn,){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
        
    }
}

//Event for load event
document.addEventListener('DOMContentLoaded',Store.displayBooks());

// Event Listener for create book
document.getElementById('book-form').addEventListener('submit',createBook);
//function to create new book object
function createBook(e){
    
    //create new book using form vals
    const tempBook = new Book(title.value,author.value,isbn.value);

    console.log(tempBook);
    //validate book
    validateBook(tempBook);
   
    e.preventDefault();
}


//event listener for delete book
document.getElementById('book-list').addEventListener('click',deleteBook);

function deleteBook(e){
    const ui = new UI();
    ui.removeBook(e.target);
    Store.unstoreBook(e.target.parentElement.previousElementSibling.textContent);
    //show alert
    ui.showAlert('Book successfully removed', 'success');

    e.preventDefault();
}

function validateBook(book){
    const ui = new UI();
    if(book.title ===''|| book.author=== ''|| book.isbn===''){
        ui.showAlert('Please enter all fields','error');

    }else{
        ui.addBook(book); 
        Store.storeBook(book);
        //clear fields after book is added
        ui.clearFields();
        ui.showAlert('Book successfully added','success')
    }

}