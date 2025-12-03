// Lógica del formulario en solo_carrera.html
document.addEventListener('DOMContentLoaded', function () {
  const dni = document.getElementById('dni');
  const tipo = document.getElementById('tipo');
  const zona = document.getElementById('zona');
  const edad = document.getElementById('edad');
  const precio = document.getElementById('precio');
  const form = document.getElementById('compraForm');
  const mensaje = document.getElementById('mensajeCompra'); // nuevo contenedor

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (s) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s];
    });
  }
  function capitalize(s) { return (s || '').replace(/^\w/, c => c.toUpperCase()); }

  // validación de edad según tipo
  function validateAgeForTipo() {
    if (!tipo) return { valid: true };
    const t = tipo.value;
    const eVal = edad && edad.value ? edad.value.trim() : '';
    if (t === 'infantil') {
      if (eVal === '') return { valid: false, message: 'Para la entrada "Infantil" debe indicar la edad (menor de 18 años).' };
      const e = Number(eVal);
      if (isNaN(e) || e >= 18) return { valid: false, message: 'La entrada "Infantil" es sólo para menores de 18 años.' };
    } else if (t === 'adulto') {
      if (eVal === '') return { valid: false, message: 'Para la entrada "Adulto" debe indicar la edad (18 años o más).' };
      const e = Number(eVal);
      if (isNaN(e) || e < 18) return { valid: false, message: 'La entrada "Adulto" es sólo para mayores de 18 años.' };
    }
    return { valid: true };
  }

  function calcPrecio(){
    // Nuevas tarifas: adulto zona1=80, adulto zona2=60, infantil=30 fijo
    const tarifasAdulto = { zona1: 80, zona2: 60 };
    const t = tipo ? tipo.value : 'adulto';
    const z = zona ? zona.value : 'zona1';
    let p = 0;
    if (t === 'infantil') {
      p = 30; // precio fijo para infantil
    } else {
      p = (tarifasAdulto[z]) ? tarifasAdulto[z] : 0;
      // mantener ajustes por edad sólo para adultos (si se desea)
      if (edad && edad.value){
        const e = Number(edad.value);
        if (!isNaN(e)) {
          if (e < 12) p = Math.round(p * 0.6);
          if (e >= 65) p = Math.round(p * 0.8);
        }
      }
    }
    if (precio) precio.value = p + ' €';
    return p;
  }

  // eventos básicos
  if (dni) dni.addEventListener('input', ()=> dni.value = dni.value.toUpperCase());
  if (tipo) tipo.addEventListener('change', calcPrecio);
  if (zona) zona.addEventListener('change', calcPrecio);
  if (edad) edad.addEventListener('input', calcPrecio);
  window.addEventListener('load', calcPrecio);

  // submit: validación y mostrar mensaje claro
  if (form) {
	// quitar el bloque anterior y usar este
	form.addEventListener('submit', function (ev) {
		ev.preventDefault(); // evitamos comportamiento por defecto para controlar el flujo

		// comprobar aceptación de condiciones (si existe)
		const acepto = document.getElementById('acepto');
		if (acepto && !acepto.checked) {
			alert('Debe aceptar las condiciones antes de comprar la entrada.');
			acepto.focus();
			return;
		}

		// validación HTML5 de campos
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		// validación específica: edad según tipo
		const valid = validateAgeForTipo();
		if (!valid.valid) {
			alert(valid.message);
			if (edad) edad.focus();
			return;
		}

		// Si llegamos aquí, todo es correcto
		alert('Todos los datos son correctos');

		// enviar al servidor (la página PHP definida en el action del form)
		// Se usa submit() para forzar el envío a pesar de haber llamado preventDefault()
		form.submit();
	});
  }

  // --- AÑADIDO: focus/blur para resaltar campos al editar ---
  function initFieldFocus() {
    const selector = 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="hidden"]), select, textarea';
    const fields = document.querySelectorAll(selector);
    if (!fields || fields.length === 0) return;
    fields.forEach(el => {
      if (el.disabled) return;
      // añadir transición suave si no existe
     
      // focus y blur
      el.addEventListener('focus', function () {
        this.style.backgroundColor = '#fa83b7ff'; // rosa claro
      });
      el.addEventListener('blur', function () {
        this.style.backgroundColor = '';
      });
    });
  }
  // invocar después de definir los listeners existentes
  initFieldFocus();
  // --- FIN AÑADIDO ---

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