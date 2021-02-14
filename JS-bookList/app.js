
//UI vars
const title = document.getElementById('title'),
        author= document.getElementById('author'),
        isbn= document.getElementById('isbn'),
        container = document.querySelector('.container'),
        form = document.querySelector('#book-form');


// Book Constructor 
function Book(title,author,isbn){
    this.title = title;
    this.author= author;
    this.isbn= isbn;
}

//UI Constructor 
function UI(){}

//delete book
UI.prototype.removeBook= function(target){

    if(target.className=='delete'){
        target.parentElement.parentElement.remove();
    }

}
//add book too list
UI.prototype.addBookToList= function(book){
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
//Show alert
UI.prototype.showAlert= function(message,className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //insert alert to html
    container.insertBefore(div,form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2500)
    
}

//clears fields on form
UI.prototype.clearFields= function(){
    title.value='';
    author.value='';
    isbn.value = '';

}

// Event Listener for create book
document.getElementById('book-form').addEventListener('submit',createBook);
//function to create new book object
function createBook(e){
    
    //create new book using form vals
    const tempBook = new Book(title.value,author.value,isbn.value);

    
    //validate book
    validateBook(tempBook);
   
    e.preventDefault();
}
//event listener for delete book
document.getElementById('book-list').addEventListener('click',deleteBook);

function deleteBook(e){
    const ui = new UI();
    ui.removeBook(e.target);
    //show alert
    ui.showAlert('Book successfully removed', 'success');

    e.preventDefault();
}

function validateBook(book){
    const ui = new UI();
    if(book.title ===''|| book.author=== ''|| book.isbn===''){
        ui.showAlert('Please enter all fields','error');

    }else{
        ui.addBookToList(book); 
        //clear fields after book is added
        ui.clearFields();
        ui.showAlert('Book successfully added','success')
    }

}


