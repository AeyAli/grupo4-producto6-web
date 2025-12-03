// Lógica de la página de acceso (acceso.html)
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('loginForm');
  const usuario = document.getElementById('usuario');
  const contrasena = document.getElementById('contrasena');
  const toggle = document.getElementById('togglePwd');

  // toggle de visibilidad de contraseña
  if (toggle && contrasena) {
    toggle.addEventListener('change', function(){
      contrasena.type = this.checked ? 'text' : 'password';
    });
  }

  // validación de login
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const user = (usuario && usuario.value || '').trim();
      const pass = (contrasena && contrasena.value || '');
      if (user === 'alumno' && pass === 'sanluis') {
        alert('Todos los datos son correctos');
        // enviar a la página PHP que procesará los datos
        form.action = 'tratarDatos.php';
        form.submit();
      } else {
        alert('Usuario o contraseña incorrectos');
        if (usuario) usuario.focus();
      }
    });
  }

  // hover del logo
let logof1 = document.getElementById("logoF1")
 logof1.addEventListener("mouseover",agrandar );
 function agrandar(){
   logof1.style.width = "550px"
   logof1.style.width = "290px"
 }

 logof1.addEventListener("mouseout", minimizar)
 function minimizar(){
   logof1.style.width = "200px"
   logof1.style.height = "69px"
 }
});

