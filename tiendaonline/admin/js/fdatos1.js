
function enviarFormulario(){
    
    var mensaje = "Usuario no Registrado";
    
    
    var usuarior=document.miFormulario.usuario.value.toUpperCase();
    var passwordr=document.miFormulario.password.value;

    var usuarios = new Array(4);
    var claves = new Array(4);
    
    usuarios[0] = "ADMIN";
    usuarios[1] = "VENTAS";
    usuarios[2] = "PRODUCTOS";
    usuarios[3] = "ENVIOS";

    claves[0] = "1234"
    claves[1] = "1234"
    claves[2] = "1234"
    claves[3] = "1234"

    console.log('Enviando fromulario...');

    for (i=0; i<usuarios.length; i++){
        if (usuarios[i]==usuarior && claves[i]==passwordr){
            window.open("http://localhost/tiendaonline/admin/index.html", "_self");
            mensaje = "Bienbenido al Sistema :"+usuarior;
            break;
        }
    }

     
    alert(mensaje);
    //document.miFormulario.botonLimpiar.click();
    //document.miFormulario.usuario.focus();
  
  }