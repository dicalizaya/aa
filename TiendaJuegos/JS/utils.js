function mostrarError(mensaje) {

    alert(mensaje);

}

function mostrarExito(mensaje) {

    alert(mensaje);

}

function formatearPrecio(precio) {

    return `Bs. ${precio}`;

}

function cerrarSesion() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    localStorage.removeItem("ultimaCompra");

    window.location.href = "login.html";

}