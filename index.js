/// CLAVE PRINCIPAL PARA LLAMADO DE API : k_w0x9nsxv ///
/// CLAVES DE REPUESTO SI SE AGOTAN LOS LLAMADOS:
///    k_ddwodv5z , k_pk8lnjxj , k_58z780e4 ,  k_ruh05m8g , k_rcjxz3o6  ///

/// Elementos del DOM ///
//Busqueda
const inputBuscador = document.getElementById('input-buscador');
const botonBuscador = document.querySelector('.button-buscador');

//Seccion Principal
const contenedorPeliculas = document.querySelector('.container-peliculas'); 

//Paginado
const botonPaginaInicial = document.querySelector(".button-pagina-inicial")
const botonPaginaPosterior = document.querySelector('.button-pagina-posterior')
const iconoPaginaPosterior = document.querySelector('.button-pagina-posterior i');
const botonPaginaAnterior = document.querySelector(".button-pagina-anterior")
const iconoPaginaAnterior = document.querySelector(".button-pagina-anterior i")
const botonPaginaFinal = document.querySelector(".button-pagina-final")

/// Fetch Inicial ///
const traerPeliculas = () => {
  fetch('https://imdb-api.com/en/API/Top250Movies/k_ruh05m8g')
    .then((res) => res.json())
    .then((data) => {
      crearTarjetas(data);
      entrarAPelicula();
    });
};
traerPeliculas();

/// Fetch para Buscar Pelicula especifica ///
const buscarPeliculas = () => {
  fetch(
    `https://imdb-api.com/es/API/SearchMovie/k_w0x9nsxv/${inputBuscador.value}`
  )
    .then((res) => res.json())
    .then((data) => {
    
    });
};
botonBuscador.onclick = (event) => {
  event.preventDefault();
  buscarPeliculas();
};

/// Crear Tarjetas ///
let paginaActual = 0
const crearTarjetas = (data) => {
  const arrayRecortado = data.items.slice(paginaActual,paginaActual+12)
  const html = arrayRecortado.reduce((acc, pelicula) => {
    return (
      acc +
      `<div class="tarjeta" data-id=${pelicula.id}>
        <img src="${pelicula.image}" class="img-portada-peliculas">
        <h1 class="titulo">${pelicula.title}</h1>
      </div>`
    );
  }, '');
  contenedorPeliculas.innerHTML = html;
};

/// Botones Paginado ///
botonPaginaInicial.onclick = () => {
  paginaActual = 0
  traerPeliculas();
}
botonPaginaAnterior.onclick = () => {
  if (paginaActual === 0) {
    iconoPaginaAnterior.style.color = "rgb(85, 80, 80)";
    prev.disabled = true
  };
  paginaActual = paginaActual-12
  traerPeliculas();
  
}
botonPaginaPosterior.onclick = () =>{
  if (paginaActual === 240) {
    iconoPaginaPosterior.style.color = 'rgb(85, 80, 80)';
    prev.disabled = true
  }
  paginaActual = paginaActual + 12
  traerPeliculas();
}
botonPaginaFinal.onclick = () => {
  paginaActual = 240;
  traerPeliculas();
};

const entrarAPelicula = () => {
  const tarjetas = document.querySelectorAll('.tarjeta');
  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () => {
      let id = tarjetas[i].dataset.id;
      llamadoParaMostrarPelicula(id);
    };
  }
};

/// Muestro descripcion de pelicula ///
const llamadoParaMostrarPelicula = (id) => {
  fetch(`https://imdb-api.com/es/API/Title/k_w0x9nsxv/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      mostrarPelicula(data)
    });
};

const mostrarPelicula = (dataPelicula) => {

}