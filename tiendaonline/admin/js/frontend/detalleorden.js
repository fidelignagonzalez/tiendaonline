//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/detalleordens";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalDetalleordens = new bootstrap.Modal(document.getElementById('modalDetalleorden'))
const formDetalleorden = document.querySelector('form')
const idDetalleorden = document.getElementById('idDetalleorden')
const idOrden = document.getElementById('idOrden')
const idProducto = document.getElementById('idProducto')
const cantidad = document.getElementById('cantidad')
const valor_producto = document.getElementById('valor_producto')
const total_orden = document.getElementById('total_orden')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idDetalleorden.value = ''
    idOrden.value = ''
    idProducto.value = ''
    cantidad.value = ''
    valor_producto.value = ''
    total_orden.value = ''
    idDetalleorden.disabled = false
    modalDetalleordens.show()
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

            res.forEach((detalleordens) => {
                resultados += `<tr>
                        <td width="10%">${detalleordens.iddetalleorden}</td>
                        <td width="15%">${detalleordens.idorden}</td>
                        <td width="15%">${detalleordens.idproducto}</td>
                        <td width="15%">${detalleordens.cantidad}</td>
                        <td width="15%">${detalleordens.valor_producto}</td>
                        <td width="15%">${detalleordens.total_orden}</td>
                        
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
        idDetalleorden.value = fila.children[0].innerHTML
        idOrden.value = fila.children[1].innerHTML
        idProducto.value = fila.children[2].innerHTML
        cantidad.value = fila.children[3].innerHTML
        valor_producto.value = fila.children[4].innerHTML
        total_orden.value = fila.children[5].innerHTML
        idDetalleorden.disabled = true
        opcion = 'editar'
        modalDetalleordens.show()
    }
})

formDetalleorden.addEventListener('submit', (e) => {
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
            "idDetalleorden": idDetalleorden.value,
            "idOrden": idOrden.value,
            "idProducto": idProducto.value,
            "cantidad": cantidad.value,
            "valor_producto": valor_producto.value,
            "total_orden": total_orden.value,
            
        },
    });
    modalDetalleordens.hide()
})
