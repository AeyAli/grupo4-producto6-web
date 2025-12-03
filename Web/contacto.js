// Código mínimo para contacto.html (actualizaciones futuras)
document.addEventListener('DOMContentLoaded', function(){
  // placeholder - aquí puedes añadir lógica para cargar mapa o formularios
});

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