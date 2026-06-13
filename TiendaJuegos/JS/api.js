const API_URL = "http://localhost:8000/api";

function getToken() {
    return localStorage.getItem("token");
}

function guardarToken(token) {
    localStorage.setItem(
        "token",
        token
    );
}

function eliminarToken() {
    localStorage.removeItem("token");
}

async function apiRequest(endpoint,options = {}) {
    const token = getToken();
    const config = {
        headers: {
            "Content-Type":
                "application/json",
            ...(token && {
                Authorization:
                    `Bearer ${token}`
            })
        },
        ...options
    };

    const response =
        await fetch( `${API_URL}/${endpoint}`,config );

    const data =
        await response.json();

    if (!response.ok) {

        throw data;

    }

    return data;

}

async function login(
    email,
    password
) {

    return await apiRequest(
        "auth/login",
        {

            method: "POST",

            body: JSON.stringify({

                email,
                password

            })

        }
    );

}

async function register(datos) {

    return await apiRequest(
        "auth/register",
        {

            method: "POST",

            body: JSON.stringify(
                datos
            )

        }
    );

}
async function logout() {

    return await apiRequest(
        "auth/logout",
        {

            method: "POST"

        }
    );

}

function guardarUsuario(usuario) {

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

}

function obtenerUsuario() {

    return JSON.parse(

        localStorage.getItem(
            "usuario"
        )

    );

}

function eliminarUsuario() {

    localStorage.removeItem(
        "usuario"
    );

}

function usuarioLogueado() {

    return getToken() != null;

}

function getRol() {
    const usuario = obtenerUsuario();
    return usuario ? usuario.rol_id : null;
}
