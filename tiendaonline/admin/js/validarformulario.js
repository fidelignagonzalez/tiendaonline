var nombre = document.getElementById("usuario");
var password= document.getElementById("password");
var error= document.getElementById("error");

//error.style.color="red";


//function enviarFormulario(){
    

var form=document.getElementById('formulario');
    form.addEventListener('submit',function(evt){
        evt.preventDefault();
        console.log('Enviando fromulario...');

        var mensajerror=[];
        
        if(nombre.value===null || nombre.value===""){
            mensajerror.push('Ingrese su Usuario');
        }

        if(password.value===null || password.value===""){
            mensajerror.push("Ingrese su Contraseña");
        }

        error.innerHTML=mensajerror.join(", ");

        return false;
    

    });

    
    

    
  