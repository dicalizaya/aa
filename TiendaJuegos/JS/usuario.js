document.addEventListener("DOMContentLoaded", () => {

    cargarCategorias();
    cargarPlataformas();
    cargarMisVentas();

});

async function cargarCategorias() {

    try {

        const res = await apiRequest("categories");
        const cont = document.getElementById("lista-categorias");

        if (!cont) return;

        cont.innerHTML = "";

        (res.data || []).forEach(c => {

            cont.innerHTML += `
                <div class="card-simple">
                    ${c.nombre}
                </div>
            `;

        });

    } catch (error) {
        console.error("Error categorías:", error);
    }

}

async function cargarPlataformas() {

    try {

        const res = await apiRequest("platforms");
        const cont = document.getElementById("lista-plataformas");

        if (!cont) return;

        cont.innerHTML = "";

        (res.data || []).forEach(p => {

            cont.innerHTML += `
                <div class="card-simple">
                    ${p.nombre}
                </div>
            `;

        });

    } catch (error) {
        console.error("Error plataformas:", error);
    }

}

async function cargarMisVentas() {

    const cont = document.getElementById("lista-ventas");
    if (!cont) return;

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            cont.innerHTML = `
                <p class="texto-vacio">
                    Debes iniciar sesión para ver tus compras.
                </p>
            `;
            return;
        }

        const res = await fetch("http://localhost:8000/api/sales/mine", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!res.ok) {

            const errorText = await res.text();
            console.error("Error backend ventas:", errorText);

            cont.innerHTML = `
                <p class="texto-vacio">
                    Error al cargar tus compras.
                </p>
            `;

            return;
        }

        const json = await res.json();

        const ventas = json.data;

        cont.innerHTML = "";

        if (!ventas || ventas.length === 0) {

            cont.innerHTML = `
                <p class="texto-vacio">
                    No tienes compras aún.
                </p>
            `;

            return;
        }

        ventas.forEach(venta => {

            cont.innerHTML += `
                <div class="card-venta">
                    <h4>Venta #${venta.id}</h4>
                    <p><b>Estado:</b> ${venta.estado ?? 'N/A'}</p>
                    <p><b>Fecha:</b> ${venta.fecha ?? 'N/A'}</p>
                    <p><b>Total:</b> Bs. ${venta.total ?? 0}</p>
                </div>
            `;

        });

    } catch (error) {
        console.error("Error ventas:", error);
        cont.innerHTML = `
            <p class="texto-vacio">
                Error inesperado al cargar compras.
            </p>
        `;
    }

}

