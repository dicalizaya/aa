document.addEventListener("DOMContentLoaded", cargarFactura);

function cargarFactura() {

    const compra =
        JSON.parse(localStorage.getItem("ultimaCompra")) || [];

    const contenedor =
        document.getElementById("datos-factura");

    if (compra.length === 0) {

        contenedor.innerHTML = `
            <div class="factura-vacia">
                <h3>No existe ninguna compra.</h3>
            </div>
        `;

        return;
    }

    let total = 0;

    let html = `
        <div class="factura-header">
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <hr>

        <div class="factura-items">
    `;

    compra.forEach(juego => {

        const subtotal =
            juego.precio * juego.cantidad;

        total += subtotal;

        html += `
            <div class="factura-item">

                <h3>${juego.nombre}</h3>

                <p>Precio: Bs. ${juego.precio}</p>
                <p>Cantidad: ${juego.cantidad}</p>
                <p>Subtotal: Bs. ${subtotal}</p>

            </div>
        `;
    });

    html += `
        </div>

        <hr>

        <div class="factura-total">
            <h3>Total Pagado: Bs. ${total}</h3>
        </div>

        <div class="factura-mensaje">
            <h2 class="exito">¡Compra realizada correctamente!</h2>
            <p>Gracias por comprar en STORE.GG</p>
        </div>
    `;

    contenedor.innerHTML = html;

    localStorage.removeItem("carrito");

    document.getElementById("volverInicio")
        .addEventListener("click", () => {
            window.location.href = "interfazUsuario.html";
        });
}