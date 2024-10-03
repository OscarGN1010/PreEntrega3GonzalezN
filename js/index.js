function acceso() {
    let login = document.createElement("section")
    login.innerHTML = `
        <div class="section" id="section">
            <div class="section__login">
                <h1 class="section__login--title">Bienvenido a Expediciones Chajnantor</h1>
                <h3 class="section__login--subtitle">Iniciar sesion</h3>
                <form class="section__login--form" id="formInicioSesion">
                    <label>Nombre Usuario</label>
                    <input required id="nombreUsuario" type="text" name="nombreUsuario"></input>
    
                    <label>Contraseña</label>
                    <input required id="contrasenaUsuario" type="password" name="password"></input>
    
                    <input class="section__login--form-botton" type="submit" value ="Iniciar sesion"></input>
                </form>
    
                <p class="section__login--registrar" id="registrarme"> Registrarme </p>
            </div>
        </section>
    `
    document.body.append(login)
    
    let iniciarSesion = document.getElementById('formInicioSesion')
    iniciarSesion.addEventListener('submit', validarInicioSesion)

    function validarInicioSesion (event) {
        event.preventDefault()
        let sesionValida = false
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i) 
            let valor = localStorage.getItem(clave)
            let formInicioSesion = event.target    
            console.log(nombreUsuario.value.trim()) 
            console.log(clave) 
            console.log(JSON.parse(valor).contrasena) 
            console.log(contrasenaUsuario.value) 
            if (clave === nombreUsuario.value.trim() && JSON.parse(valor).contrasena === contrasenaUsuario.value) {
                alert('Sesion iniciada correctamente')
                sessionStorage.setItem('usuarioIniciado', nombreUsuario.value)
                formInicioSesion.reset()
                document.getElementById("section").remove()
                sesionValida = true
                break
            }
        } 
        if (!sesionValida) {
            alert('Nombre de usuario o Contraseña ingresados incorrectamente')
        }
    }
    
    let registrarme = document.getElementById('registrarme')
    registrarme.onclick = () => {
        let registro = document.createElement("section")
        registro.innerHTML = `
        <div class="sectionRegistro" id="sectionRegistro">
            <div class="section__login">
                <h1 class="section__login--title">Bienvenido a Expediciones Chajnantor</h1>
                <h3 class="section__login--subtitle">Registro</h3>
                <form class="section__login--form" id="formRegistro">
                    <label>Nombre</label>
                    <input required id="registroNombre"  type="text"></input>
    
                    <label>Apellido</label>
                    <input required id="registroApellido"  type="text"></input>
    
                    <label>Correo</label>
                    <input required id="registroCorreo"  type="text"></input>
    
                    <label>Nombre Usuario</label>
                    <input required id="registroUsuario"  type="text"></input>
    
                    <label>Contraseña</label>
                    <input required id="registroContrasena"  type="password"></input>
    
                    <input class="section__login--form-botton" type="submit" value ="Registrarme"></input>
                </form>
    
                <p class="section__login--registrar" id="inicioSesion"> Iniciar sesion </p>
            </div>
        </section>
        `
        document.body.append(registro)
        let formRegistro = document.getElementById("formRegistro")
        formRegistro.addEventListener('submit', validarRegistro)
        function validarRegistro (event) {
            let valido = true
            const regexEmail =  /^[a-zA-Z0-9._%+-]+@gmail\.com$/
            const regexNombre =  /^\S.*$/
            event.preventDefault()
            let datosRegistro = event.target
    
            if (!regexNombre.test(registroNombre.value) || registroNombre.value.length < 2 || !regexNombre.test(registroApellido.value) || registroApellido.value.length < 2) {
                alert('El nombre y apellido debe tener al menos 2 caracteres')
                datosRegistro.reset()
                valido = false
                return           
            }
    
            if(!regexEmail.test(registroCorreo.value)){
                alert('Mail no válido')
                datosRegistro.reset()
                valido = false
                return
            }
    
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i)      
                if (clave === registroUsuario.value.trim()) {
                    alert('Nombre de Usuario ya existe')
                    datosRegistro.reset()
                    valido = false
                    break
                }
            }
    
            if(registroContrasena.value.length < 5){
                alert('Contraseña no válida, debe tener al menos 5 caracteres')
                datosRegistro.reset()
                valido = false
                return
            }
    
            const nuevoUsuario = {
                nombre: registroNombre.value.trim(),
                apellido: registroApellido.value.trim(),
                correo: registroCorreo.value.trim(),
                contrasena: registroContrasena.value.trim(),
                canasta: false
            }
                
            localStorage.setItem(registroUsuario.value.trim(), JSON.stringify(nuevoUsuario))
    
            datosRegistro.reset()
    
            if (valido) {
                document.getElementById("sectionRegistro").remove()
            }
    
        }
    
        let inicioSesion = document.getElementById('inicioSesion')
        inicioSesion.onclick = () => {
            console.log('click inicio sesion')
            document.getElementById("sectionRegistro").remove()
        } 
    }
}

let sesionIniciada = true


acceso()

let cerrarSesion = document.getElementById('cerrarSesion')
cerrarSesion.onclick = () => {
    sessionStorage.clear()
    acceso()
}


