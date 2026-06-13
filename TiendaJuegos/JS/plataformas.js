document.addEventListener("DOMContentLoaded", () => {

    cargarPlataformas();

    document.getElementById("formPlataforma")
        .addEventListener("submit", guardarPlataforma);

    menuHamburguesa();

});

let platEdit = null;

async function cargarPlataformas() {

    const res = await apiRequest("platforms");

    const tabla = document.getElementById("tablaPlataformas");

    tabla.innerHTML = "";

    res.data.forEach(p => {

        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>
                <button onclick="editarPlataforma(${p.id})">Editar</button>
                <button onclick="eliminarPlataforma(${p.id})">Eliminar</button>
            </td>
        </tr>
        `;

    });

}

async function guardarPlataforma(e) {

    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombrePlataforma").value,
    };

    if (platEdit) {

        await apiRequest(`platforms/${platEdit}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        platEdit = null;

    } else {

        await apiRequest("platforms", {
            method: "POST",
            body: JSON.stringify(data)
        });

    }

    document.getElementById("formPlataforma").reset();

    cargarPlataformas();

}

async function editarPlataforma(id) {

    const res = await apiRequest(`platforms/${id}`);

    document.getElementById("nombrePlataforma").value = res.data.nombre;
    platEdit = id;

}

async function eliminarPlataforma(id) {

    await apiRequest(`platforms/${id}`, {
        method: "DELETE"
    });

    cargarPlataformas();

}

 const btnLogout = document.getElementById("cerrarSesion");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {

            eliminarToken();
            eliminarUsuario();

            window.location.href = "login.html";

        });
    }