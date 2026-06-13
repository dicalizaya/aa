document.addEventListener("DOMContentLoaded", cargarDetalle);

async function cargarDetalle() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {

        return;

    }

    try {

        const response = await apiRequest(`videogames/${id}`);

        console.log("Respuesta API:", response);

        const juego = response.data;

        document.getElementById("nombreJuego").textContent =
            juego.nombre;

        document.getElementById("descripcionJuego").textContent =
            juego.descripcion;

        document.getElementById("precioJuego").textContent =
            `Bs. ${juego.precio}`;

        document.getElementById("categoriaJuego").textContent =
            juego.category?.nombre || "Sin categoría";

        document.getElementById("imagenJuego").src =
            obtenerImagen(juego.nombre);

        const boton =
            document.getElementById("btnCarrito");

        if (boton) {

            boton.addEventListener(
                "click",
                () => agregarAlCarrito(juego)
            );

        }

    }

    catch (error) {

        console.error(
            "Error cargando detalle:",
            error
        );

    }

}

function agregarAlCarrito(juego) {

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const existe =
        carrito.find(
            item => item.id === juego.id
        );

    if (existe) {

        existe.cantidad++;

    }

    else {

        carrito.push({
            id: juego.id,
            nombre: juego.nombre,
            precio: juego.precio,
            cantidad: 1
        });

    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    console.log(
        "Carrito actual:",
        carrito
    );

    alert(
        "Juego agregado al carrito"
    );

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

