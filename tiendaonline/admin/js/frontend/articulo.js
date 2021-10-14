//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/articulos";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalArticulos = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulos = document.querySelector('form')
const idarticulo = document.getElementById('idarticulo')
const articulo = document.getElementById('articulo')
const modelo = document.getElementById('modelo')
const marca = document.getElementById('marca')
const descripcion = document.getElementById('descripcion')
const imagen = document.getElementById('imagen')
const unidad = document.getElementById('unidad')
const accesorios = document.getElementById('accesorios')
const especificaciones = document.getElementById('especificaciones')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idarticulo.value = '0'
    articulo.value = ''
    modelo.value = ''
    marca.value = ''
    descripcion.value = ''
    imagen.value = ''
    unidad.value = ''
    accesorios.value = ''
    especificaciones.value = ''
    idarticulo.disabled = true
    modalArticulos.show()
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

            res.forEach((articulos) => {
                resultados += `<tr>
                        <td width="10%">${articulos.idarticulo}</td>
                        <td width="15%">${articulos.nombre_articulo}</td>
                        <td width="15%">${articulos.modelo}</td>
                        <td width="15%">${articulos.marca}</td>
                        <td width="15%">${articulos.descripcion_articulo}</td>
                        <td width="15%">${articulos.imagen_articulo}</td>
                        <td width="15%">${articulos.unidad}</td>
                        <td width="15%">${articulos.accesorios}</td>
                        <td width="15%">${articulos.especificaciones}</td>
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
        idarticulo.value = fila.children[0].innerHTML
        articulo.value = fila.children[1].innerHTML
        modelo.value = fila.children[2].innerHTML
        marca.value = fila.children[3].innerHTML
        descripcion.value = fila.children[4].innerHTML
        imagen.value = fila.children[5].innerHTML
        unidad.value = fila.children[6].innerHTML
        accesorios.value = fila.children[7].innerHTML
        especificaciones.value = fila.children[8].innerHTML
        idarticulo.disabled = true
        opcion = 'editar'
        modalArticulos.show()
    }
})

formArticulos.addEventListener('submit', (e) => {
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
            "idarticulo":idarticulo.value,
            "nombre_articulo":articulo.value,
            "modelo":modelo.value,
           "marca": marca.value,
            "descripcion_articulo":descripcion.value,
            "imagen_articulo":imagen.value,
            "unidad":unidad.value,
            "accesorios":accesorios.value,
            "especificaciones":especificaciones.value
            
        },
    });
    modalArticulos.hide()
})
