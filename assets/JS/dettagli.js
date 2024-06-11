document.addEventListener("DOMContentLoaded", async () =>{
    params = new URLSearchParams(location.search)
    asin = params.get('asin')
    fetch ('https://striveschool-api.herokuapp.com/books?asin=' + asin).then(response =>{
        response.json()
        .then(result => {
            titoloPagina = document.getElementsByTagName('title')
            titoloPagina.innerHTML = `${result[0].title}`
            book = document.getElementById('detBook')
            book.innerHTML = `<img class='img-fluid' src='${result[0].img}'>`
            titolo = document.createElement('h5')
            titolo.innerHTML = `${result[0].title}`
            book.appendChild(titolo)
            prezzo = document.createElement('span')
            prezzo.innerHTML = `${result[0].price} €`
            book.appendChild(prezzo)
            back= document.createElement('p')
            back.innerHTML = `<button><a href='./index.html'>Indietro</button>`
            book.appendChild(back)
    })
})
})