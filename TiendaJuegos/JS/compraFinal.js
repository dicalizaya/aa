document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarResumenCompra();

        document
        .getElementById(
            "confirmarCompra"
        )
        .addEventListener(
            "click",
            confirmarCompra
        );

    }
);

function cargarResumenCompra() {

    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

    const contenedor =
        document.getElementById(
            "resumenCompra"
        );

    const totalElemento =
        document.getElementById(
            "totalCompra"
        );

    contenedor.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <h3>
                No hay productos para comprar.
            </h3>
        `;

        totalElemento.textContent =
            "Total: Bs. 0";

        return;
    }

    carrito.forEach(juego => {

        const subtotal =
            juego.precio *
            juego.cantidad;

        total += subtotal;

        contenedor.innerHTML += `

            <div class="juego-card">

                <h3>
                    ${juego.nombre}
                </h3>

                <p>
                    Precio:
                    Bs. ${juego.precio}
                </p>

                <p>
                    Cantidad:
                    ${juego.cantidad}
                </p>

                <p>
                    Subtotal:
                    Bs. ${subtotal}
                </p>

            </div>

            <br>

        `;

    });

    totalElemento.textContent =
        `Total: Bs. ${total}`;

}

async function confirmarCompra() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const token = localStorage.getItem("token");

    const detalles = carrito.map(item => ({
        videojuego_id: item.id,
        cantidad: item.cantidad
    }));

    try {

        const res = await fetch("http://127.0.0.1:8000/api/sales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                metodo_pago_id: 1,
                estado: "completado",
                detalles: detalles
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            throw new Error("Error al registrar venta");
        }

        localStorage.setItem("ultimaCompra", JSON.stringify(carrito));
        localStorage.removeItem("carrito");

        alert("Compra registrada correctamente");

        window.location.href = "factura.html";

    } catch (error) {
        console.error(error);
        alert("Error al procesar la compra");
    }
}
