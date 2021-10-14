//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/detalletransportas";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalDetalletransportas = new bootstrap.Modal(document.getElementById('modalDetalletransporta'))
const formDetalletransporta = document.querySelector('form')
const idDetalletransporta = document.getElementById('idDetalletransporta')
const idTransporta = document.getElementById('idTransporta')
const idVenta = document.getElementById('idVenta')
const nGuia = document.getElementById('nGuia')
const peso_envio = document.getElementById('peso_envio')
const tipoenvio = document.getElementById('tipoenvio')
const fechaenvio = document.getElementById('fechaenvio')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idDetalletransporta.value = ''
    idTransporta.value = ''
    idVenta.value = ''
    nGuia.value = ''
    peso_envio.value = ''
    tipoenvio.value = ''
    fechaenvio.value = ''
    idDetalletransporta.disabled = false
    modalDetalletransportas.show()
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

            res.forEach((detalletransportas) => {
                resultados += `<tr>
                        <td width="10%">${detalletransportas.iddetalletransporta}</td>
                        <td width="15%">${detalletransportas.idtransporta}</td>
                        <td width="15%">${detalletransportas.idventa}</td>
                        <td width="15%">${detalletransportas.nguia}</td>
                        <td width="15%">${detalletransportas.peso_envio}</td>
                        <td width="15%">${detalletransportas.tipoenvio}</td>
                        <td width="15%">${detalletransportas.fechahoraenvio}</td>
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
        idDetalletransporta.value = fila.children[0].innerHTML
        idTransporta.value = fila.children[1].innerHTML
        idVenta.value = fila.children[2].innerHTML
        nGuia.value = fila.children[3].innerHTML
        peso_envio.value = fila.children[4].innerHTML
        tipoenvio.value = fila.children[5].innerHTML
        fecharegistro.value = fila.children[6].innerHTML
        fechaenvio.value = fila.children[7].innerHTML
        idDetalletransporta.disabled = true
        opcion = 'editar'
        modalDetalletransporta.show()
    }
})

formDetalletransporta.addEventListener('submit', (e) => {
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
            "idDetalletransporta": idDetalletransporta.value,
            "idTransporta": idTransporta.value,
            "idVenta": idVenta.value,
            "nGuia": nGuia.value,
            "peso_envio": peso_envio.value,
            "tipoenvio": tipoenvio.value,
            "fecharegistro": fecharegistro.value,
            "fechaenvio": fechaenvio.value
        },
    });
    modalDetalletransporta.hide()
})
