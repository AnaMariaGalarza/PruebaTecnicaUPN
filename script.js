const API_URL1 = "https://mocki.io/v1/86690ca7-55f0-41c7-b4ef-103eadde6ffe";
const API_URL2 = "https://mocki.io/v1/ac390d7d-0bdd-4993-a149-cf50c60fe648";
let paginationList = document.getElementById("paginacion-lista");
let card1 = document.querySelector(".card_1");
let card2 = document.querySelector(".card_2");

let tagColors = {
    "#6941C6": "#F9F5FF",
    "#363F72": "#F8F9FC",
    "#027A48": "#ECFDF3",
}

function renderizarFetch(url, card){
    fetch(url)
    .then(response => response.json())
    .then(info => {
        info.forEach(element => {
            let html = renderizarInfo(element);
            card.innerHTML += html
        });
    })
    .catch(error => console.log(error))
}

function renderizarInfo(info) {
    return `
        <article>
            <img src= "${info.imagen}" alt= "${info.nombre}">
            <h5>${info.autor} • ${info.fecha}</h5>
            <h3>${info.nombre}</h3>
            <p>${info.descripcion}</p>
            <ul>${renderizarEtiquetas(info.etiquetas)}</ul>  
        </article>

    `
}

function renderizarEtiquetas(etiquetas) {
    return etiquetas.map(etiqueta => {
        let [color, backgroundColor] = obtenerColorRandom();
        return `<li style="color: ${color}; background-color: ${backgroundColor};">${etiqueta}</li>`
    }).join("");
}

function obtenerColorRandom() {
    let keys = Object.keys(tagColors);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomValue = tagColors[randomKey];
    return [randomKey, randomValue];
}

function crearPaginacion() {

    const paginasTotales = 10; 
    let paginaActual = 1;

    paginationList.innerHTML = "";

    for (let i = 1; i <= paginasTotales; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = i;
        if (i === paginaActual) {
            listItem.classList.add("active");
        }
        listItem.addEventListener("click", () => {
            paginaActual = i;
            crearPaginacion();
        });
        paginationList.appendChild(listItem);
    }
}

renderizarFetch(API_URL1, card1);
renderizarFetch(API_URL2, card2);
crearPaginacion();
