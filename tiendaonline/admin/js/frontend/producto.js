//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/productos";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalProductos = new bootstrap.Modal(document.getElementById('modalProducto'))
const formproducto = document.querySelector('form')
const idproducto = document.getElementById('id')
const idarticulo = document.getElementById('idarticulo')
const cantidad = document.getElementById('cantidad')
const idcategoria = document.getElementById('idcategoria')
const idtransporta = document.getElementById('idtransporta')
const valor_venta = document.getElementById('valor_venta')
const estado_producto = document.getElementById('estado_producto')


let opcion = ''

btnCrear.addEventListener('click', () => {
    idproducto.value = '0'
    idarticulo.value = ''
    cantidad.value = ''
    idcategoria.value = ''
    idtransporta.value = ''
    valor_venta.value = ''
    estado_producto.value = ''
    idproducto.disabled = true
    modalProductos.show()
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

            res.forEach((productos) => {
                idarticulo.value = productos.idarticulo
                idcategoria.value = productos.idcategoria
                idtransporta.value = productos.transportadora
                //console.log('valor id articulo')
                //console.log(productos.idarticulo)
                resultados += `<tr>
                        <td width="10%">${productos.idproducto}</td>
                        <td width="10%">${productos.nombre_articulo}</td>
                        <td width="10%">${productos.catidad}</td>
                        <td width="10%">${productos.nombre_categoria}</td>
                        <td width="10%">${productos.transportadora}</td>
                        <td width="10%">${productos.valor_venta}</td>
                        <td width="10%">${productos.estado_producto}</td>
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
        idproducto.value = fila.children[0].innerHTML
        //idarticulo.value = ${productos.idarticulo}
        cantidad.value = fila.children[2].innerHTML
        //idcategoria.value = fila.children[3].innerHTML
        //idtransporta.value = fila.children[4].innerHTML
        valor_venta.value = fila.children[5].innerHTML
        estado_producto.value = fila.children[6].innerHTML
        
        idproducto.disabled = true
        opcion = 'editar'
        modalProductos.show()
    }
})

formproducto.addEventListener('submit', (e) => {
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
            "idproducto": idproducto.value,
            "idarticulo": idarticulo.value,
            "catidad": cantidad.value,
            "idcategoria": idcategoria.value,
            "idtransporta": idtransporta.value,
            "valor_venta": valor_venta.value,
            "estado_producto": estado_producto.value,
            
        },
    });
    
    modalProductos.hide()
})