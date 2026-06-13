document.addEventListener("DOMContentLoaded", () => {

    cargarProveedores();

    const form = document.getElementById("formProveedor");

    form.addEventListener("submit", guardarProveedor);

});

let provEdit = null;

async function cargarProveedores() {

    try {

        const res = await apiRequest("suppliers");

        const tabla = document.getElementById("tablaProveedores");

        tabla.innerHTML = "";

        res.data.forEach(p => {

            tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.email ?? ""}</td>
                <td>
                    <button onclick="editarProveedor(${p.id})">Editar</button>
                    <button onclick="eliminarProveedor(${p.id})">Eliminar</button>
                </td>
            </tr>
            `;

        });

    } catch (e) {
        console.error("Error cargar proveedores:", e);
    }

}

async function guardarProveedor(e) {

    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombreProveedor").value,
        email: document.getElementById("emailProveedor").value
    };

    try {

        if (provEdit) {

            await apiRequest(`suppliers/${provEdit}`, {
                method: "PUT",
                body: JSON.stringify(data)
            });

            provEdit = null;

        } else {

            await apiRequest("suppliers", {
                method: "POST",
                body: JSON.stringify(data)
            });

        }

        document.getElementById("formProveedor").reset();

        cargarProveedores();

    } catch (e) {
        console.error("Error guardar proveedor:", e);
    }

}

async function editarProveedor(id) {

    const res = await apiRequest(`suppliers/${id}`);

    document.getElementById("nombreProveedor").value = res.data.nombre;
    document.getElementById("emailProveedor").value = res.data.email;

    provEdit = id;

}

async function eliminarProveedor(id) {

    await apiRequest(`suppliers/${id}`, {
        method: "DELETE"
    });

    cargarProveedores();

}

 const btnLogout = document.getElementById("cerrarSesion");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {

            eliminarToken();
            eliminarUsuario();

            window.location.href = "login.html";

        });
    }