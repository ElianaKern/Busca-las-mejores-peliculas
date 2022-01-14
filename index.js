/// CLAVES PARA LLAMADO DE LA API : 
// k_m9iw5lkn , k_dwwf2q9o , k_o4a8ehbp , k_ddwodv5z ,
// k_5to2z0cv,k_w0x9nsxv , k_pk8lnjxj , k_58z780e4 ,  
// k_rcjxz3o6 , k_mmzma8jv , k_sexpb7mq ,  k_ruh05m8g , k_j12bhuve ///
const API_KEY = 'k_5to2z0cv';

/// Elementos del DOM ///
// Header //
const imagenesDelHeader = document.querySelector('.imagenes-del-header');

// Nav Busqueda //
const inputBuscador = document.getElementById('input-buscador');
const botonBuscador = document.querySelector('.button-buscador');
const selectSort = document.getElementById("select-sort");

// Seccion Principal //
const contenedorPeliculas = document.querySelector('.container-peliculas'); 
const salirDeBusqueda = document.querySelector('.salir-de-busqueda');
const botonSalir = document.querySelector('.salir');

// Paginado //
const botonPaginaInicial = document.querySelector(".button-pagina-inicial")
const botonPaginaPosterior = document.querySelector('.button-pagina-posterior')
const iconoPaginaPosterior = document.querySelector('.button-pagina-posterior i');
const botonPaginaAnterior = document.querySelector(".button-pagina-anterior")
const iconoPaginaAnterior = document.querySelector(".button-pagina-anterior i")
const botonPaginaFinal = document.querySelector(".button-pagina-final")
const paginado = document.querySelector(".paginado")

// Seccion Descripcion Pelicula //
const descripcionPelicula = document.querySelector('.descripcion-pelicula');
const nav = document.querySelector("nav")
const imgDescripcionPelicula = document.querySelector(
  '.img-descripcion-pelicula'
)
const titulo = document.querySelector(".titulo-descripcion-pelicula")
const anio = document.querySelector('.anio')
const duracion = document.querySelector('.duracion')
const genero = document.querySelector('.genero')
const director = document.querySelector('.director')
const actores = document.querySelector('.actores')
const trama = document.querySelector('.trama')
const premios = document.querySelector('.premios')
const elenco = document.querySelector(".elenco")
const elencoPelicula = document.querySelector(".elenco-pelicula") 
const salirDePelicula = document.querySelector(".salir-de-pelicula")
const volverDeElenco = document.querySelector('.volver-de-elenco')
const trailer = document.querySelector('.trailer')

/// Fetch Inicial ///
const traerPeliculas = () => {
  fetch(`https://imdb-api.com/en/API/Top250Movies/${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      sort(data, selectSort.value);
      crearTarjetas(data);
      entrarAPelicula();
      
    });
};
traerPeliculas();

/// Fetch para Buscar Pelicula especifica ///
const buscarPeliculas = () => {
  fetch(
    `https://imdb-api.com/es/API/SearchMovie/${API_KEY}/${inputBuscador.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      crearTarjetasBusqueda(data);
      entrarAPelicula();
    });
};
botonBuscador.onclick = (event) => {
  event.preventDefault()
  buscarPeliculas()
}

/// Funcion que me da una tarjeta?????

/// Resultado de Busqueda ///
const crearTarjetasBusqueda = (data) => {
  const html = data.results.reduce((acc, pelicula) => {
    return (
      acc +
      `<div class="tarjeta" data-id=${pelicula.id}>
        <img src="${pelicula.image}" class="img-portada-peliculas">
        <h1 class="titulo">${pelicula.title}</h1>
      </div>`
    );
  }, '');
  contenedorPeliculas.innerHTML = html;
  botonSalir.style.display = 'block';
  paginado.style.display ="none"    
  botonSalir.onclick = () =>{
    traerPeliculas();
    paginado.style.display = 'flex';
    botonSalir.style.display = "none";
  }
  
};

/// Ordenar de A-Z , de Z-A y al azar ///
selectSort.onchange = () =>{
  traerPeliculas();
}
const sort = (data,valueUsuario) =>{
  if(valueUsuario === "a-z"){
    const aZ = data.items.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    const dataOrdenadaAz = {items:aZ}
    crearTarjetas(dataOrdenadaAz)
  }
  if (valueUsuario === 'z-a') {
    const zA = data.items.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    const dataOrdenadaZa = { items:zA};
    crearTarjetas(dataOrdenadaZa);
  }
  if(valueUsuario === "al-azar"){
    crearTarjetas(data);
  }
}

/// Crear Tarjetas ///
let paginaActual = 0
const crearTarjetas = (data) => {
  const arrayRecortado = data.items.slice(paginaActual,paginaActual+18)
  const html = arrayRecortado.reduce((acc, pelicula) => {
    return (
      acc +
      `<div class="tarjeta" data-id=${pelicula.id}>
        <img src="${pelicula.image}" class="img-portada-peliculas">
        <h1 class="titulo">${pelicula.title}</h1>
      </div>`
    )
  }, '')
  contenedorPeliculas.innerHTML = html
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
  paginaActual = paginaActual-18
  traerPeliculas();  
}
botonPaginaPosterior.onclick = () =>{
  if (paginaActual === 240) {
    iconoPaginaPosterior.style.color = 'rgb(85, 80, 80)';
    prev.disabled = true
  }
  paginaActual = paginaActual + 18
  traerPeliculas();
}
botonPaginaFinal.onclick = () => {
  paginaActual = 240;
  traerPeliculas();
}

/// Entrar a Pelicula ///
const entrarAPelicula = () => {
  const tarjetas = document.querySelectorAll('.tarjeta');
  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () => {
      let id = tarjetas[i].dataset.id;
      llamadoParaMostrarPelicula(id);
    };
  }
};
entrarAPelicula()

/////////// Seccion descripcion de Pelicula ////////////////////
const llamadoParaMostrarPelicula = (id) => {
  fetch(`https://imdb-api.com/es/API/Title/${API_KEY}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      mostrarPelicula(data);
      verTrailer(id);
    });
};

/// Muestro imagen y descripcion de pelicula
const mostrarPelicula = (dataPelicula) => {
  nav.style.display = 'none';
  contenedorPeliculas.style.display = "none"
  paginado.style.display = "none"
  //imagenesDelHeader.style.display = "none"//ver bien pq me desaparece definitivo
  descripcionPelicula.style.display = "flex"
  imgDescripcionPelicula.src = dataPelicula.image
  titulo.textContent = dataPelicula.title
  anio.textContent = dataPelicula.year
  duracion.textContent = dataPelicula.runtimeStr
  genero.textContent = dataPelicula.genres
  director.textContent = dataPelicula.directors
  actores.textContent = dataPelicula.stars
  premios.textContent = dataPelicula.awards
  trama.textContent = dataPelicula.plot
  elencoPelicula.style.display ="none";
  botonSalir.style.display = "none";
  mostrarElenco(dataPelicula)
  funcionSalirDePelicula()

}
/// Boton que muestra elenco
const mostrarElenco = (dataPelicula) => {
  elenco.onclick = () => {
    elencoPelicula.style.display = 'flex';
    descripcionPelicula.style.display = 'none';
    crearTarjetasElenco(dataPelicula)
  }
}

/// Muestra fotos del elenco y boton volver 
const crearTarjetasElenco = (dataPelicula) => {
  elencoPelicula.display = 'flex'
  const arrayElenco = dataPelicula.actorList
  const htmlElenco = arrayElenco.reduce((acc, curr)=>{
    return (
      acc +
        `<div class="foto-del-actor data-id="${curr.id}">
          <p class="nombre-del-actor">${curr.name}</p>
          <img src="${curr.image}" alt="foto del actor/actriz" class="img-actor-actriz">
          <p class="nombre-del-personaje">Personaje : ${curr.asCharacter}</p> 
        </div> `
    );
  },"")
  elencoPelicula.innerHTML = htmlElenco
  const botonVolver = document.querySelector(".volver")
  botonVolver.style.display = 'flex';
  botonVolver.onclick = () =>{
    mostrarPelicula(dataPelicula);
    botonVolver.style.display = "none"
  }
}

/// Llamado para mostrar Trailers 
const verTrailer = (id) => {
    fetch(`https://imdb-api.com/es/API/YouTubeTrailer/${API_KEY}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let er = /\=[a-zA-Z0-9_]\w+/;
      const arr = er.exec(data.videoUrl)
      trailer.src = `https://www.youtube.com/embed/${arr[0].split('=')[1]}`;
    })
 }

/// Boton para salir de Pelicula 
const funcionSalirDePelicula = () => {
  salirDePelicula.onclick = () => {
    descripcionPelicula.style.display = 'none'
    nav.style.display = 'flex'
    contenedorPeliculas.style.display = 'flex'
    paginado.style.display = 'flex'
    traerPeliculas();
  }
}

