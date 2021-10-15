//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/clientes";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalClientes = new bootstrap.Modal(document.getElementById('modalCliente'))
const formClientes = document.querySelector('form')
const Idcliente=document.getElementById('id')
const tipoDocumento = document.getElementById('tipo_documento')
const documento = document.getElementById('documento')
const nombresCliente = document.getElementById('nombres')
const apellidosCliente = document.getElementById('apellidos')
const telefonoCliente = document.getElementById('telefono')
const correoCliente = document.getElementById('correo')
const direccionCliente = document.getElementById('direccion')

let opcion = ''

btnCrear.addEventListener('click', () => {
    Idcliente.value = '0'
    tipoDocumento.value = ''
    documento.value = ''
    nombresCliente.value = ''
    apellidosCliente.value = ''
    telefonoCliente.value = ''
    correoCliente.value = ''
    direccionCliente.value = ''
    Idcliente.disabled = true
    modalClientes.show()
    console.log('estoy en btnCrear')
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
            //console.log(res);

            res.forEach((clientes) => {
                resultados += `<tr>
                        <td width="10%">${clientes.idcliente}</td>
                        <td width="15%">${clientes.tipo_documento}</td>
                        <td width="15%">${clientes.ndocumento}</td>
                        <td width="15%">${clientes.nombres}</td>
                        <td width="15%">${clientes.apellidos}</td>
                        <td width="15%">${clientes.telefono}</td>
                        <td width="15%">${clientes.correo_electronico}</td>
                        <td width="15%">${clientes.direccion}</td>
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
        console.log('Boton Editar')
        const fila = e.target.parentNode.parentNode
        Idcliente.value=fila.children[0].innerHTML
        tipoDocumento.value = fila.children[1].innerHTML
        documento.value = fila.children[2].innerHTML
        nombresCliente.value = fila.children[3].innerHTML
        apellidosCliente.value = fila.children[4].innerHTML
        telefonoCliente.value = fila.children[5].innerHTML
        correoCliente.value = fila.children[6].innerHTML
        direccionCliente.value = fila.children[7].innerHTML
        Idcliente.disabled = true
        opcion = 'editar'
        modalClientes.show()
    }
})
formClientes.addEventListener('submit', (e) => {
    //console.log('estoy agregando...',e)
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
            "tipo_documento": tipoDocumento.value,
            "ndocumento": documento.value,
            "direccion": direccionCliente.value,
            "idcliente":Idcliente.value,
            "nombres": nombresCliente.value,
            "apellidos": apellidosCliente.value,
            "telefono": telefonoCliente.value,
            "correo_electronico": correoCliente.value
        },
    });
    console.log('data a editar...',data)
    modalClientes.hide()
})
