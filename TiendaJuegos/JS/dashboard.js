document.addEventListener("DOMContentLoaded", () => {

    const usuario = obtenerUsuario();

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    const titulo = document.getElementById("tituloAdmin");

    if (titulo) {
        titulo.textContent = `STORE.GG ADMIN - Hola, ${usuario.nombre}`;
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