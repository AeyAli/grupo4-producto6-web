// Lógica del formulario en solo_carrera.html
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('compraForm');
  const resultado = document.getElementById('resultado');
  const dni = document.getElementById('dni');
  const tipo = document.getElementById('tipo');
  const zona = document.getElementById('zona');
  const precioInput = document.getElementById('precio');

  if (!form) return;

  // Normalizar DNI a mayúsculas mientras se escribe
  if (dni) {
    dni.addEventListener('input', () => {
      dni.value = dni.value.toUpperCase();
    });
  }

  // Cálculo y actualización del precio visible
  function calcularPrecio() {
    const t = tipo ? tipo.value : 'adulto';
    const z = zona ? zona.value : 'zona1';
    let precio;
    if (t === 'adulto') precio = z === 'zona1' ? 120 : 100;
    else precio = z === 'zona1' ? 60 : 50;
    return `${precio} €`;
  }

  function actualizarPrecioInput() {
    if (precioInput) precioInput.value = calcularPrecio();
  }

  if (tipo) tipo.addEventListener('change', actualizarPrecioInput);
  if (zona) zona.addEventListener('change', actualizarPrecioInput);

  // Inicializar precio al cargar
  actualizarPrecioInput();

  // Manejo del envío del formulario (resumen)
  if (form && resultado) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validación nativa
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const get = id => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');

      const data = {
        dni: get('dni').toUpperCase(),
        nombre: get('nombre'),
        apellidos: get('apellidos'),
        email: get('email'),
        tipo: get('tipo'),
        zona: get('zona'),
        edad: get('edad') || 'N/A',
        precio: get('precio') || calcularPrecio()
      };

      resultado.innerHTML = `
        <div class="resumen" role="status" aria-live="polite">
          <h3>Resumen de la compra</h3>
          <ul>
            <li><strong>DNI:</strong> ${escapeHtml(data.dni)}</li>
            <li><strong>Nombre:</strong> ${escapeHtml(data.nombre)} ${escapeHtml(data.apellidos)}</li>
            <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
            <li><strong>Tipo:</strong> ${escapeHtml(capitalize(data.tipo))}</li>
            <li><strong>Zona:</strong> ${escapeHtml(capitalize(data.zona))}</li>
            <li><strong>Edad:</strong> ${escapeHtml(data.edad)}</li>
            <li><strong>Precio:</strong> ${escapeHtml(data.precio)}</li>
          </ul>
          <p class="mensaje">Compra simulada correctamente. Se enviará confirmación (simulado).</p>
        </div>
      `;
    });
  }

  // Helpers
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (s) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s];
    });
  }
  function capitalize(s) { return (s || '').replace(/^\w/, c => c.toUpperCase()); }
});