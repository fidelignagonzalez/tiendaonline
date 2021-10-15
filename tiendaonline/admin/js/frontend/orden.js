//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/ordens";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalOrdens = new bootstrap.Modal(document.getElementById('modalOrden'))
const formOrden = document.querySelector('form')
const idOrden = document.getElementById('idOrden')
const nOrden = document.getElementById('nOrden')
const idCliente = document.getElementById('idCliente')
const idEstado = document.getElementById('idEstado')
const fecha_orden = document.getElementById('fecha_orden')
const total_orden = document.getElementById('total_orden')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idOrden.value = ''
    nOrden.value = ''
    idCliente.value = ''
    idEstado.value = ''
    fecha_orden.value = ''
    total_orden.value = ''
    idOrden.disabled = false
    modalOrdens.show()
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

            res.forEach((ordens) => {
                resultados += `<tr>
                        <td width="10%">${ordens.idorden}</td>
                        <td width="15%">${ordens.norden}</td>
                        <td width="15%">${ordens.idcliente}</td>
                        <td width="15%">${ordens.idestado}</td>
                        <td width="15%">${ordens.fecha_orden}</td>
                        <td width="15%">${ordens.total_orden}</td>
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
        idOrden.value = fila.children[0].innerHTML
        nOrden.value = fila.children[1].innerHTML
        idCliente.value = fila.children[2].innerHTML
        idEstado.value = fila.children[3].innerHTML
        fecha_orden.value = fila.children[4].innerHTML
        total_orden.value = fila.children[5].innerHTML
        idOrden.disabled = true
        opcion = 'editar'
        modalOrdens.show()
    }
})

formOrden.addEventListener('submit', (e) => {
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
            "idOrden": idOrden.value,
            "nOrden": nOrden.value,
            "idCliente": idCliente.value,
            "idEstado": idEstado.value,
            "fecha_orden": fecha_orden.value,
            "total_orden": total_orden.value,
           
        },
    });
    modalOrdens.hide()
})
