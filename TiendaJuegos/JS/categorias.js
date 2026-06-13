document.addEventListener("DOMContentLoaded", () => {

    cargarCategorias();

    document.getElementById("formCategoria")
        .addEventListener("submit", guardarCategoria);

    document.getElementById("cerrarSesion")
        ?.addEventListener("click", cerrarSesion);

    menuHamburguesa();

});

let catEdit = null;

async function cargarCategorias() {

    const res = await apiRequest("categories");

    const tabla = document.getElementById("tablaCategorias");

    tabla.innerHTML = "";

    res.data.forEach(c => {

        tabla.innerHTML += `
        <tr>
            <td>${c.nombre}</td>
            <td>${c.descripcion ?? ""}</td>
            <td>
                <button onclick="editarCategoria(${c.id})">Editar</button>
                <button onclick="eliminarCategoria(${c.id})">Eliminar</button>
            </td>
        </tr>
        `;

    });

}

async function guardarCategoria(e) {

    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombreCategoria").value,
        descripcion: document.getElementById("descripcionCategoria").value
    };

    if (catEdit) {

        await apiRequest(`categories/${catEdit}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        catEdit = null;

    } else {

        await apiRequest("categories", {
            method: "POST",
            body: JSON.stringify(data)
        });

    }

    document.getElementById("formCategoria").reset();

    cargarCategorias();

}

async function editarCategoria(id) {

    const res = await apiRequest(`categories/${id}`);

    document.getElementById("nombreCategoria").value = res.data.nombre;
    document.getElementById("descripcionCategoria").value = res.data.descripcion;

    catEdit = id;

}

async function eliminarCategoria(id) {

    await apiRequest(`categories/${id}`, {
        method: "DELETE"
    });

    cargarCategorias();

}

 const btnLogout = document.getElementById("cerrarSesion");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {

            eliminarToken();
            eliminarUsuario();

            window.location.href = "login.html";

        });
    }