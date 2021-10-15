//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/carritos";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalCarritos = new bootstrap.Modal(document.getElementById('modalCarrito'))
const formcarrito = document.querySelector('form')
const idcarrito = document.getElementById('idcarrito')
const idproducto = document.getElementById('idproducto')
const session_id = document.getElementById('session_id')
const cantidad = document.getElementById('cantidad')


let opcion = ''

btnCrear.addEventListener('click', () => {
    idcarrito.value = '0'
    idproducto.value = ''
    session_id.value = ''
    cantidad.value = ''
    idcarrito.disabled = true
    modalCarritos.show()
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

            res.forEach((carritos) => {
                resultados += `<tr>
                        <td width="10%">${carritos.idcarrito}</td>
                        <td width="15%">${carritos.articulo_carrito}</td>
                        <td width="15%">${carritos.session_id}</td>
                        <td width="15%">${carritos.cantidad}</td>
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
        idcarrito.value = fila.children[0].innerHTML
        idproducto.value = fila.children[1].innerHTML
        session_id.value = fila.children[2].innerHTML
        cantidad.value = fila.children[3].innerHTML
        idcarrito.disabled = true
        opcion = 'editar'
        modalCarritos.show()
    }
})

formcarrito.addEventListener('submit', (e) => {
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
            "idcarrito": idcarrito.value,
            "idproducto": idproducto.value,
            "session_id": session_id.value,
            "cantidad": cantidad.value,
                        
        },
    });
    modalCarritos.hide()
})
