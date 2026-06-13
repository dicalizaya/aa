let usuarioEdit = null;

document.addEventListener("DOMContentLoaded", () => {

    cargarUsuarios();
    menuHamburguesa();

    const form = document.getElementById("formUsuario");
    if (form) {
        form.addEventListener("submit", guardarUsuario);
    }

});

async function cargarUsuarios() {

    const res = await apiRequest("users");

    const tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    res.data.forEach(u => {

        if (u.rol_id !== 1) {

            tabla.innerHTML += `
                <tr>
                    <td>${u.nombre}</td>
                    <td>${u.apellido_paterno}</td>
                    <td>${u.apellido_materno}</td>
                    <td>${u.email}</td>
                    <td>
                        <button onclick="editarUsuario(${u.id})">Editar</button>
                        <button onclick="eliminarUsuarioAdmin(${u.id})">Eliminar</button>
                    </td>
                </tr>
            `;

        }

    });

}

async function editarUsuario(id) {

    const res = await apiRequest(`users/${id}`);

    const u = res.data;

    document.getElementById("nombreUsuario").value = u.nombre;
    document.getElementById("appUsuario").value = u.apellido_paterno;
    document.getElementById("apmUsuario").value = u.apellido_materno;
    document.getElementById("emailU").value = u.email;

    usuarioEdit = id;

}

async function guardarUsuario(e) {

    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombreUsuario").value,
        apellido_paterno: document.getElementById("appUsuario").value,
        apellido_materno: document.getElementById("apmUsuario").value,
        email: document.getElementById("emailU").value
    };

    if (usuarioEdit) {

        await apiRequest(`users/${usuarioEdit}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        usuarioEdit = null;
    }

    cargarUsuarios();
}

async function eliminarUsuarioAdmin(id) {

    await apiRequest(`users/${id}`, {
        method: "DELETE"
    });

    cargarUsuarios();
}