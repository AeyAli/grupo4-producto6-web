// Lógica de la página de acceso (acceso.html)
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const user = document.getElementById('usuario').value;
    document.getElementById('loginResult').innerHTML = '<p>Consulta simulada para <strong>' + user + '</strong>. Resultado: 1 entrada encontrada (simulado).</p>';
  });
});