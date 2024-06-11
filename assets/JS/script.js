let rowBook = document.getElementById('book');
let bookList = [];
let cart = [];
let totalCart = 0;

window.addEventListener('DOMContentLoaded', () => {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(result => {
            bookList = result;
            renderBooks(bookList);
        });
});

function renderBooks(books) {
    rowBook.innerHTML = "";
    books.forEach(book => {
        let bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <img src='${book.img}' class='img-fluid'>
            <h5>${book.title}</h5>
            <span>${book.price}€</span>
            <span class='mt-3'>
                <a class='detailBook' href='./dettagli.html?asin=${book.asin}'>Anteprima</a>
                <button class='mt-3 addCart' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">Aggiungi al carrello</button>
                <button class='mt-3 hide'>Nascondi</button>
            </span>`;
        bookDiv.classList.add('card', 'col-6', 'col-md-4', 'col-lg-2', 'gy-5', 'gx-3');
        rowBook.appendChild(bookDiv);

        bookDiv.querySelector('.addCart').addEventListener('click', () => addCart(book));
        bookDiv.querySelector('.hide').addEventListener('click', () => bookDiv.style.display = 'none');
    });
}

function searchFilter() {
    let ricerca = document.getElementById('searchInput').value.toLowerCase();
    let risultatoRicerca = bookList.filter(book => book.title.toLowerCase().includes(ricerca));
    renderBooks(risultatoRicerca);

    if (risultatoRicerca.length === 0) {
        let avviso = document.createElement('h2');
        avviso.innerHTML = 'Mi dispiace ma la ricerca non ha prodotto alcun risultato';
        rowBook.appendChild(avviso);
    }
}

function addCart(book) {
    cart.push(book)
    totalCart += book.price
    displayCart();
}

function displayCart(){
    let cartContainer = document.getElementById('productCart');
    let totalContainer = document.getElementById('cartTotal');
    cartContainer.innerHTML = "";
    cart.forEach(book => {
        let productCart = document.createElement('li');
        productCart.innerHTML = `<img src='${book.img}' alt='Copertina di ${book.title}'> - ${book.price}€`;
        productCart.classList.add('mb-5')
        cartContainer.appendChild(productCart);
    });

    totalContainer.innerHTML = ` ${totalCart}€`;
}

function emptyCart(){
    cart = []
    totalCart = 0
    let cartContainer = document.getElementById('productCart')
    let totalContainer = document.getElementById('cartTotal');
    cartContainer.innerHTML = ""
    totalContainer.innerHTML = ""
}
