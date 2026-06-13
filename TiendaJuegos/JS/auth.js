document.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarLogin();
        iniciarRegistro();

    }
);

function iniciarLogin() {

    const form =document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const mensaje =
                document.getElementById(
                    "mensajeLogin"
                );

            mensaje.textContent = "";

            try {

                const email =
                    document.getElementById(
                        "email"
                    ).value;

                const password =
                    document.getElementById(
                        "password"
                    ).value;

                const data =
                    await login(
                        email,
                        password
                    );

                guardarToken(
                    data.access_token
                );

                guardarUsuario(
                    data.user
                );

                mensaje.textContent =
                    "Ingreso exitoso";

                setTimeout(() => {

                    if (data.user.rol_id === 1) {
    window.location.href = "interfazAdmin.html";
} else {
    window.location.href = "interfazUsuario.html";
}

                }, 1000);

            }

            catch (error) {

                mensaje.textContent =
                    "Correo o contraseña incorrectos";

                console.error(error);

            }

        }
    );

}

function iniciarRegistro() {

    const form =
        document.getElementById(
            "registerForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const mensaje =
                document.getElementById(
                    "mensajeRegistro"
                );

            mensaje.textContent = "";

            try {

                const data =
                    await register({

                        nombre:
                            document.getElementById(
                                "nombre"
                            ).value,

                        apellido_paterno:
                            document.getElementById(
                                "apellido_paterno"
                            ).value,

                        apellido_materno:
                            document.getElementById(
                                "apellido_materno"
                            ).value,

                        email:
                            document.getElementById(
                                "email"
                            ).value,

                        password:
                            document.getElementById(
                                "password"
                            ).value

                    });

                guardarToken(
                    data.access_token
                );

                guardarUsuario(
                    data.user
                );

                mensaje.textContent =
                    "Registro exitoso";

                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1000);

            }

            catch (error) {

                mensaje.textContent =
                    "No se pudo registrar";

                console.error(error);

            }

        }
    );

}

