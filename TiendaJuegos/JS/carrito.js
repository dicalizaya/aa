document.addEventListener("DOMContentLoaded", () => {

    cargarCarrito();

    const btnVaciar = document.getElementById("vaciarCarrito");
    const btnFinalizar = document.getElementById("finalizarCompra");

    if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);
    if (btnFinalizar) btnFinalizar.addEventListener("click", finalizarCompra);

});

function cargarCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contenedor = document.getElementById("carrito-items");
    const totalElemento = document.getElementById("total");

    if (!contenedor || !totalElemento) return;

    contenedor.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        contenedor.innerHTML = `<p class="carrito-vacio">No hay productos en el carrito.</p>`;
        totalElemento.textContent = "Total: Bs. 0";

        return;
    }

    carrito.forEach(juego => {

        const subtotal = juego.precio * juego.cantidad;
        total += subtotal;

        contenedor.innerHTML += `

        <div class="carrito-item">

            <div>
                <h3>${juego.nombre}</h3>
                <p>Precio: Bs. ${juego.precio}</p>
                <p>Cantidad: ${juego.cantidad}</p>
                <p>Subtotal: Bs. ${subtotal}</p>
            </div>

            <button class="btn-eliminar" onclick="eliminarJuego(${juego.id})">
                Eliminar
            </button>

        </div>

        `;

    });

    totalElemento.textContent = `Total: Bs. ${total}`;

}

function eliminarJuego(id) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(juego => juego.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarCarrito();

}

function vaciarCarrito() {

    if (!confirm("¿Vaciar carrito?")) return;

    localStorage.removeItem("carrito");

    cargarCarrito();

}

function finalizarCompra() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("ultimaCompra", JSON.stringify(carrito));

    window.location.href = "compraFinal.html";

}