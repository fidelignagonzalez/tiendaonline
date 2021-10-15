//const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
const url = "http://localhost:8080/tiendaonline/api/categorias";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalCategorias = new bootstrap.Modal(document.getElementById('modalCategoria'))
const formcategoria = document.querySelector('form')
const idCategoria = document.getElementById('idCategoria')
const nombre_categoria = document.getElementById('nombre_categoria')
const imagen_categoria = document.getElementById('imagen_categoria')



let opcion = ''

btnCrear.addEventListener('click', () => {
    //console.log('estoy boton Crear')
    idCategoria.value = '0'
    nombre_categoria.value = ''
    imagen_categoria.value = ''
    idCategoria.disabled = true
    modalCategorias.show()
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

            res.forEach((categorias) => {
                resultados += `<tr>
                        <td width="10%">${categorias.idcategoria}</td>
                        <td width="15%">${categorias.nombre_categoria}</td>
                        <td width="15%">${categorias.imagen_categoria}</td>
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
        //console.log('estoy boton editar')
        const fila = e.target.parentNode.parentNode
        idCategoria.value = fila.children[0].innerHTML
        nombre_categoria.value = fila.children[1].innerHTML
        imagen_categoria.value = fila.children[2].innerHTML
        idCategoria.disabled = true
        //console.log('valor id categoria : '+fila.children[0].innerHTML)
        opcion = 'editar'
        modalCategorias.show()
    }
})

formcategoria.addEventListener('submit', (e) => {
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
            "idcategoria": idCategoria.value,
            "nombre_categoria": nombre_categoria.value,
            "imagen_categoria": imagen_categoria.value
             
        },
    });
    //console.log('valor data a editar : '+data)
    modalCategorias.hide()
})
