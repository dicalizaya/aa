let videojuegos = [];
let videojuegosFiltrados = [];

let paginaActual = 1;

const juegosPorPagina = 8;

document.addEventListener(
    "DOMContentLoaded",
    cargarVideojuegos
);

async function cargarVideojuegos() {

    try {

        const response =
            await apiRequest(
                "videogames"
            );

        videojuegos = response.data;
        videojuegosFiltrados = videojuegos;

        mostrarPagina();

        const btnAnterior =
            document.getElementById(
                "btnAnterior"
            );

        if (btnAnterior) {

            btnAnterior.addEventListener(
                "click",
                paginaAnterior
            );

        }

        const btnSiguiente =
            document.getElementById(
                "btnSiguiente"
            );

        if (btnSiguiente) {

            btnSiguiente.addEventListener(
                "click",
                paginaSiguiente
            );

        }

        const buscador =
            document.getElementById(
                "buscarJuego"
            );

        if (buscador) {

            buscador.addEventListener(
                "input",
                buscarJuego
            );

        }

    }

    catch (error) {

        console.error(
            "Error cargando videojuegos:",
            error
        );

    }

}

function mostrarPagina() {

    const contenedor =
        document.getElementById(
            "lista-juegos"
        );

    if (!contenedor) return;

    contenedor.innerHTML = "";

    const inicio =
        (paginaActual - 1)
        * juegosPorPagina;

    const fin =
        inicio + juegosPorPagina;

    const juegosPagina =
        videojuegosFiltrados.slice(
            inicio,
            fin
        );

    juegosPagina.forEach(
        juego => {

            contenedor.innerHTML += `

            <div class="juego-card">

                <img
                    src="${obtenerImagen(juego.nombre)}"
                    alt="${juego.nombre}">

                <div class="info-juego">

                    <h3>
                        ${juego.nombre}
                    </h3>

                    <p class="precio">
                        Bs. ${juego.precio}
                    </p>

                    <a
                        href="detalle_juego.html?id=${juego.id}"
                        class="btn-ver">

                        Ver más

                    </a>

                </div>

            </div>

            `;

        }
    );

    actualizarPaginacion();

}

function buscarJuego() {

    const texto =
        document.getElementById(
            "buscarJuego"
        )
        .value
        .toLowerCase();

    videojuegosFiltrados =
        videojuegos.filter(
            juego =>
            juego.nombre
            .toLowerCase()
            .includes(texto)
        );

    paginaActual = 1;

    mostrarPagina();

}

function actualizarPaginacion() {

    const numeroPagina =
        document.getElementById(
            "numeroPagina"
        );

    if (!numeroPagina) return;

    const totalPaginas =
        Math.ceil(
            videojuegosFiltrados.length
            / juegosPorPagina
        );

    numeroPagina.textContent =
        `Página ${paginaActual} de ${totalPaginas}`;

    document.getElementById(
        "btnAnterior"
    ).disabled =
        paginaActual === 1;

    document.getElementById(
        "btnSiguiente"
    ).disabled =
        paginaActual === totalPaginas
        || totalPaginas === 0;

}

function paginaAnterior() {

    if (paginaActual > 1) {

        paginaActual--;

        mostrarPagina();

    }

}

function paginaSiguiente() {

    const totalPaginas =
        Math.ceil(
            videojuegosFiltrados.length
            / juegosPorPagina
        );

    if (paginaActual < totalPaginas) {

        paginaActual++;

        mostrarPagina();

    }

}

function obtenerImagen(nombre) {

    const imagenes = {

        "Age of Empires IV":
        "../img/juegos/age-of-empires-4.png",

        "Call of Duty":
        "../img/juegos/Call-of-Duty.png",

        "EA Sports FC 25":
        "../img/juegos/fc25.png",

        "Forza Horizon 5":
        "../img/juegos/forza_horizon_5.png",

        "Resident Evil 4":
        "../img/juegos/resident_evil_4.png",

        "Elden Ring":
        "../img/juegos/tapa-Elden-Ring.png",

        "Grand Theft Auto V":
        "../img/juegos/Tapa-GTA-V.jpg",

        "The Sims 4":
        "../img/juegos/The-Sims-4.png",

        "Valorant":
        "../img/juegos/Valorant.png"

    };

    return imagenes[nombre]
        || "../img/juegos/LOGO.png";

}