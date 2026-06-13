document.addEventListener(
    "DOMContentLoaded",
    iniciarSesion
);

function iniciarSesion() {

    const token =
        localStorage.getItem("token");

    if (!token) {

        window.location.href =
            "login.html";

        return;

    }

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    if (usuario) {

        const saludo =
            document.getElementById(
                "saludoUsuario"
            );

        if (saludo) {

            saludo.textContent =
                "Hola, "
                + usuario.nombre
                + " "
                + usuario.apellido_paterno;

        }

    }

}

function obtenerUsuario() {

    return JSON.parse(
        localStorage.getItem(
            "usuario"
        )
    );

}

function esAdmin() {

    const usuario =
        obtenerUsuario();

    if (!usuario) {

        return false;

    }

    return usuario.role.nombre_rol
        === "admin";

}

function esUsuario() {

    const usuario =
        obtenerUsuario();

    if (!usuario) {

        return false;

    }

    return usuario.role.nombre_rol
        === "usuario";

}

function verificarAdmin() {

    if (!esAdmin()) {

        window.location.href =
            "interfazUsuario.html";

    }

}

function verificarUsuario() {

    const usuario =
        obtenerUsuario();

    if (!usuario) {

        window.location.href =
            "login.html";

    }

}

function redirigirSegunRol() {

    if (esAdmin()) {

        window.location.href =
            "interfazAdmin.html";

    }

    else {

        window.location.href =
            "interfazUsuario.html";

    }

}

function cerrarSesion() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "usuario"
    );

    localStorage.removeItem(
        "carrito"
    );

    window.location.href =
        "index.html";

}