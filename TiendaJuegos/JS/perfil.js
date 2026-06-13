document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuario();

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("nombrePerfil").value = usuario.nombre;
    document.getElementById("emailPerfil").value = usuario.email;

    document.getElementById("formPerfil")
        .addEventListener("submit", actualizarPerfil);

});

async function actualizarPerfil(e) {

    e.preventDefault();

    const usuario = obtenerUsuario();

    const data = {

        nombre: document.getElementById("nombrePerfil").value,
        email: document.getElementById("emailPerfil").value,
        password: document.getElementById("passwordPerfil").value

    };

    await apiRequest(`users/${usuario.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

    const actualizado = await apiRequest(`users/${usuario.id}`);

    guardarUsuario(actualizado.data);

    alert("Perfil actualizado correctamente");

}