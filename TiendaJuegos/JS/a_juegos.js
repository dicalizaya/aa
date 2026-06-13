document.addEventListener("DOMContentLoaded", () => {

    cargarJuegos();

    cargarCategorias();
    cargarPlataformas();
    cargarProveedores();

    const form = document.getElementById("formJuego");

    if (form) {
        form.addEventListener("submit", guardarJuego);
    }

});

let juegoEditando = null;


async function cargarJuegos() {

    const res = await apiRequest("videogames");

    const tabla = document.getElementById("tablaJuegos");

    tabla.innerHTML = "";

    res.data.forEach(j => {

        tabla.innerHTML += `
        <tr>
            <td>${j.nombre}</td>
            <td>${j.precio}</td>
            <td>${j.stock}</td>
            <td>

                <button onclick="editarJuego(${j.id})">
                    Editar
                </button>

                <button onclick="eliminarJuego(${j.id})">
                    Eliminar
                </button>

            </td>
        </tr>
        `;

    });

}

async function guardarJuego(e) {

    e.preventDefault();

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

    cargarJuegos();

}

async function editarJuego(id) {

    const res = await apiRequest(`videogames/${id}`);

    const j = res.data;

    document.getElementById("nombreJuego").value = j.nombre;
    document.getElementById("descripcionJuego").value = j.descripcion;
    document.getElementById("precioJuego").value = j.precio;
    document.getElementById("stockJuego").value = j.stock;
    document.getElementById("imagenJuego").value = j.imagen;

    juegoEditando = id;

}

async function eliminarJuego(id) {

    if (!confirm("¿Eliminar juego?")) return;

    await apiRequest(`videogames/${id}`, {
        method: "DELETE"
    });

    cargarJuegos();

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


 const btnLogout = document.getElementById("cerrarSesion");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {

            eliminarToken();
            eliminarUsuario();

            window.location.href = "login.html";

        });
    }