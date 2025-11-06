// Lógica del formulario en solo_carrera.html
document.addEventListener('DOMContentLoaded', function(){
  const dni = document.getElementById('dni');
  const tipo = document.getElementById('tipo');
  const zona = document.getElementById('zona');
  const edad = document.getElementById('edad');
  const precio = document.getElementById('precio');
  const form = document.getElementById('compraForm');
  const resultado = document.getElementById('resultado');

  function calcPrecio(){
    const tarifas = {
      adulto: { zona1: 120, zona2: 90 },
      infantil: { zona1: 60, zona2: 45 }
    };
    const t = tipo.value;
    const z = zona.value;
    let p = tarifas[t][z];
    if (edad.value){
      const e = Number(edad.value);
      if (e < 12) p = Math.round(p * 0.6);
      if (e >= 65) p = Math.round(p * 0.8);
    }
    precio.value = p + ' €';
    return p;
  }

  if (dni) dni.addEventListener('input', ()=> dni.value = dni.value.toUpperCase());
  if (tipo) tipo.addEventListener('change', calcPrecio);
  if (zona) zona.addEventListener('change', calcPrecio);
  if (edad) edad.addEventListener('input', calcPrecio);
  window.addEventListener('load', calcPrecio);

  if (form) form.addEventListener('submit', function(ev){
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const resumen = {
      dni: dni.value,
      nombre: document.getElementById('nombre').value,
      apellidos: document.getElementById('apellidos').value,
      email: document.getElementById('email').value,
      tipo: tipo.value,
      zona: zona.value,
      edad: edad.value,
      precio: precio.value
    };
    resultado.innerHTML = '<pre>' + JSON.stringify(resumen, null, 2) + '</pre><p>Compra simulada correctamente. Se enviará confirmación (simulado).</p>';
  });
});