const traerPeliculas = () =>{
  fetch('https://imdb-api.com/en/API/Top250Movies/k_um0torf2')
    .then((res) => res.json())
    .then((data) => {
      crearTarjetas(data);
    });
}
traerPeliculas()
const contenedorPeliculas= document.querySelector(".peliculas")
const inputBuscador= document.getElementById("input-buscador")
const boton=document.querySelector(".boton")

const buscarPeliculas = () => {
  fetch(`https://imdb-api.com/en/API/SearchMovie/k_w0x9nsxv/${inputBuscador.value}`)
  .then((res) => res.json())
    .then((data) => {
     console.log(data)
    });

}
boton.onclick = (event) => {
  event.preventDefault()
  buscarPeliculas()
}

const crearTarjetas = (data) => {
const html = data.items.reduce((acc,pelicula) => {
    return (
      acc +
      `<div class="tarjeta" data-id=${pelicula.id}>
        <h1 cass="titulo">${pelicula.title}</h1>
        <img src="${pelicula.image}" class="img-portada-pelis">
      </div>`
    );
},"")
contenedorPeliculas.innerHTML = html
}