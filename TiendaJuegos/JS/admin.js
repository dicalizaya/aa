document.addEventListener("DOMContentLoaded", () => {

    verificarAdmin();

    cargarVideojuegos();
    cargarCategorias();
    cargarPlataformas();
    cargarProveedores();

    const form = document.getElementById("formJuego");

    if (form) {
        form.addEventListener("submit", guardarVideojuego);
    }

    const btnLogout = document.getElementById("cerrarSesion");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {

            eliminarToken();
            eliminarUsuario();

            window.location.href = "login.html";

        });
    }

});

let juegoEditando = null;

function verificarAdmin() {

    const usuario = obtenerUsuario();

    if (!usuario || usuario.rol_id !== 1) {
        window.location.href = "interfazUsuario.html";
    }

}


async function cargarVideojuegos() {

    try {

        const response = await apiRequest("videogames");

        const tabla = document.getElementById("tablaJuegos");

        tabla.innerHTML = "";

        response.data.forEach(juego => {

            tabla.innerHTML += `
            <tr>
                <td>${juego.id}</td>
                <td>${juego.nombre}</td>
                <td>${juego.precio}</td>
                <td>${juego.stock}</td>
                <td>

                    <button onclick="editarJuego(${juego.id})">
                        Editar
                    </button>

                    <button onclick="eliminarJuego(${juego.id})">
                        Eliminar
                    </button>

                </td>
            </tr>
            `;

        });

    } catch (error) {
        console.error(error);
    }

}


async function guardarVideojuego(e) {

    e.preventDefault();

    try {

        const data = {

            nombre: document.getElementById("nombreJuego").value,
            descripcion: document.getElementById("descripcionJuego").value,
            precio: document.getElementById("precioJuego").value,
            stock: document.getElementById("stockJuego").value,
            imagen: document.getElementById("imagenJuego").value,
            categoria_id: document.getElementById("categoriaJuego").value,
            plataforma_id: document.getElementById("plataformaJuego").value,
            proveedor_id: document.getElementById("proveedorJuego").value

        };

        if (juegoEditando) {

            await apiRequest(`videogames/${juegoEditando}`, {
                method: "PUT",
                body: JSON.stringify(data)
            });

            juegoEditando = null;

        } else {

            await apiRequest("videogames", {
                method: "POST",
                body: JSON.stringify(data)
            });

        }

        document.getElementById("formJuego").reset();

        cargarVideojuegos();

    } catch (error) {
        console.error(error);
    }

}

async function editarJuego(id) {

    try {

        const res = await apiRequest(`videogames/${id}`);

        const j = res.data;

        document.getElementById("nombreJuego").value = j.nombre;
        document.getElementById("descripcionJuego").value = j.descripcion;
        document.getElementById("precioJuego").value = j.precio;
        document.getElementById("stockJuego").value = j.stock;
        document.getElementById("imagenJuego").value = j.imagen;
        document.getElementById("categoriaJuego").value = j.categoria_id;
        document.getElementById("plataformaJuego").value = j.plataforma_id;
        document.getElementById("proveedorJuego").value = j.proveedor_id;

        juegoEditando = id;

    } catch (error) {
        console.error(error);
    }

}

async function eliminarJuego(id) {

    if (!confirm("¿Eliminar videojuego?")) return;

    try {

        await apiRequest(`videogames/${id}`, {
            method: "DELETE"
        });

        cargarVideojuegos();

    } catch (error) {
        console.error(error);
    }

}

async function cargarCategorias() {

    const res = await apiRequest("categories");

    const select = document.getElementById("categoriaJuego");

    select.innerHTML = "";

    res.data.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    });

}

async function cargarPlataformas() {

    const res = await apiRequest("platforms");

    const select = document.getElementById("plataformaJuego");

    select.innerHTML = "";

    res.data.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });

}

async function cargarProveedores() {

    const res = await apiRequest("suppliers");

    const select = document.getElementById("proveedorJuego");

    select.innerHTML = "";

    res.data.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });

}