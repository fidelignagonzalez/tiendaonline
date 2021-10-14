//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/usuarios";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalUsuarios = new bootstrap.Modal(document.getElementById('modalUsuario'))
const formusuario = document.querySelector('form')
const idusuario = document.getElementById('idusuario')
const nombre_usuario = document.getElementById('nombre_usuario')
const login = document.getElementById('login')
const passwd = document.getElementById('passwd')



let opcion = ''

btnCrear.addEventListener('click', () => {
    idusuario.value = '0'
    nombre_usuario.value = ''
    login.value = ''
    passwd.value = ''
    idusuario.disabled = true
    modalUsuarios.show()
    opcion = 'crear'
})


const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
};



const getAll = () => {
    ajax({
        url: url,
        success: (res) => {
            console.log(res);

            res.forEach((usuarios) => {
                resultados += `<tr>
                        <td width="10%">${usuarios.idusuario}</td>
                        <td width="15%">${usuarios.nombre_usuario}</td>
                        <td width="15%">${usuarios.login}</td>
                                                                      
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
            });

            contenedor.innerHTML = resultados
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};
document.addEventListener("DOMContentLoaded", getAll);
document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrar")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log(id)
        alertify.confirm(`¿Estás seguro de eliminar este Usuario ${id}?`,
            function () {
                ajax({
                    url: url + "/" + id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => location.reload(),
                    error: (err) => alert(err),
                });
                alertify.success('Registro eliminado')
            },
            function () {
                alertify.error('Cancel')
            });



    }
    if (e.target.matches(".btnEditar")) {
        const fila = e.target.parentNode.parentNode
        idusuario.value = fila.children[0].innerHTML
        nombre_usuario.value = fila.children[1].innerHTML
        login.value = fila.children[2].innerHTML
        passwd.value = fila.children[3].innerHTML
        idusuario.disabled = true
        opcion = 'editar'
        modalUsuarios.show()
    }
})

formusuario.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    if (opcion == 'editar') {
        metodo = "PUT"

    }
    ajax({
        url: url,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => location.reload(),
        error: (err) =>
            $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "idusuario": idusuario.value,
            "nombre_usuario": nombre_usuario.value,
            "login": login.value,
            "passwd": passwd.value,
            
            
        },
    });
    modalUsuarios.hide()
})
