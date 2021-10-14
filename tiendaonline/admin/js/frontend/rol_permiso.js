//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/rol_permisos";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalRol_permisos = new bootstrap.Modal(document.getElementById('modalRol_permiso'))
const formrol_permiso = document.querySelector('form')
const idrol_permiso = document.getElementById('idrol_permiso')
const idrol = document.getElementById('idrol')
const idmenu = document.getElementById('idmenu')



let opcion = ''

btnCrear.addEventListener('click', () => {
    idrol_permiso.value = '0'
    idrol.value = ''
    idmenu.value = ''
    idrol_permiso.disabled = true
    modalRol_permisos.show()
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

            res.forEach((rol_permisos) => {
                resultados += `<tr>
                        <td width="10%">${rol_permisos.idrol_permiso}</td>
                        <td width="15%">${rol_permisos.idrol}</td>
                        <td width="15%">${rol_permisos.idmenu}</td>
                        
                        
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
        alertify.confirm(`¿Estás seguro de eliminar este Cliente ${id}?`,
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
        idrol_permiso.value = fila.children[0].innerHTML
        idrol.value = fila.children[1].innerHTML
        idmenu.value = fila.children[2].innerHTML
        idrol_permiso.disabled = true
        opcion = 'editar'
        modalRol_permisos.show()
    }
})

formrol_permiso.addEventListener('submit', (e) => {
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
            "idrol_permiso": idrol_permiso.value,
            "idrol": idrol.value,
            "idmenu": idmenu.value,
            
            
        },
    });
    modalRol_permisos.hide()
})
