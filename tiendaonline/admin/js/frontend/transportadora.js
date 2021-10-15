//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/transportas";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modaltransporta = new bootstrap.Modal(document.getElementById('modaltransporta'))
const formtransporta = document.querySelector('form')
const idtransporta = document.getElementById('idtransporta')
const transportadora = document.getElementById('transportadora')
const telefono_transporta = document.getElementById('telefono_transporta')
const direccion_transporta = document.getElementById('direccion_transporta')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idtransporta.value = '0'
    transportadora.value = ''
    telefono_transporta.value = ''
    direccion_transporta.value = ''
    idtransporta.disabled = true
    modaltransporta.show()
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

            res.forEach((transportas) => {
                resultados += `<tr>
                        <td width="10%">${transportas.idtransporta}</td>
                        <td width="10%">${transportas.transportadora}</td>
                        <td width="10%">${transportas.telefono_transporta}</td>
                        <td width="10%">${transportas.direccion_transporta}</td>
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
        alertify.confirm(`¿Estás seguro de eliminar este articulo ${id}?`,
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
        idtransporta.value = fila.children[0].innerHTML
        transportadora.value = fila.children[1].innerHTML
        telefono_transporta.value = fila.children[2].innerHTML
        direccion_transporta.value = fila.children[3].innerHTML
        idtransporta.disabled = true
        opcion = 'editar'
        modaltransporta.show()
    }
})

formtransporta.addEventListener('submit', (e) => {
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
            "idtransporta": idtransporta.value,
            "transportadora": transportadora.value,
            "telefono_transporta": telefono_transporta.value,
            "direccion_transporta": direccion_transporta.value,
            
        },
    });
    modaltransporta.hide()
})