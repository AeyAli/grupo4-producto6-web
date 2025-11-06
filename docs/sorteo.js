// Lógica del sorteo en sorteo.html
document.addEventListener('DOMContentLoaded', function(){
  const pilotos = ['Oscar Piastri','Lando Norris','Charles Leclerc','Lewis Hamilton','Gearge Russell','Kimi Antonelli','Max Verstappen','Yuki Tsunoda','Alexander Albon','Carlos Sainz','Liam Lawson','Isack Hadjar','Lance Stroll','Fernando Alonso','Esteban Ocon','Oliver Bearman','Nico Hulkenberg','Gabriel Bortoleto','Pierre Gastly','Franco Colapinto'];
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');
  const p3 = document.getElementById('p3');
  const boton = document.getElementById('botonSorteo');
  const comprobar = document.getElementById('comprobar');
  const resultados = document.getElementById('resultadosSorteo');
  if (!p1 || !p2 || !p3 || !boton || !resultados) return;

  function fill(select){
    select.innerHTML = pilotos.map(p => `<option value="${p}">${p}</option>`).join('');
  }
  fill(p1); fill(p2); fill(p3);

  // Evitar opciones repetidas mostrando/deshabilitando duplicados
  function actualizarOpciones(){
    const sel = [p1.value, p2.value, p3.value];
    [p1,p2,p3].forEach((s) => {
      Array.from(s.options).forEach(opt => {
        opt.disabled = sel.includes(opt.value) && opt.value !== s.value;
      });
    });
  }
  p1.addEventListener('change', actualizarOpciones);
  p2.addEventListener('change', actualizarOpciones);
  p3.addEventListener('change', actualizarOpciones);

  function elegirAleatorio(){
    const copia = pilotos.slice();
    const seleccion = [];
    for (let i=0;i<3;i++){
      const idx = Math.floor(Math.random()*copia.length);
      seleccion.push(copia.splice(idx,1)[0]);
    }
    return seleccion;
  }

  function avatarColor(name){
    let h = 0;
    for (let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) % 360;
    return `linear-gradient(135deg,hsl(${h} 80% 55%),hsl(${(h+60)%360} 75% 45%))`;
  }

  function crearCard(piloto, puesto){
    const div = document.createElement('div');
    div.className = 'piloto-result';
    const avatar = document.createElement('div');
    avatar.className = 'piloto-avatar';
    avatar.textContent = piloto.charAt(0);
    avatar.style.background = avatarColor(piloto);
    const nombre = document.createElement('div');
    nombre.className = 'piloto-name';
    nombre.textContent = piloto;
    const badge = document.createElement('div');
    badge.className = 'puesto-badge';
    badge.textContent = `Puesto ${puesto}`;
    div.appendChild(avatar);
    div.appendChild(nombre);
    div.appendChild(badge);
    return div;
  }

  function mostrarResultado(ganadores){
    resultados.innerHTML = '';
    const cont = document.createElement('div');
    cont.className = 'resultado-final';
    ganadores.forEach((g, i) => cont.appendChild(crearCard(g, i+1)));
    resultados.appendChild(cont);

    const picks = [p1.value, p2.value, p3.value];
    let aciertos = 0;
    for (let i=0;i<3;i++) if (picks.includes(ganadores[i])) aciertos++;
    const texto = document.createElement('div');
    texto.className = 'aciertos';
    texto.textContent = aciertos>0 ? `Has acertado ${aciertos} piloto(s).` : 'No has acertado ninguno.';
    resultados.appendChild(texto);
  }

  boton.addEventListener('click', function(){
    const ganadores = elegirAleatorio();
    mostrarResultado(ganadores);
  });

  comprobar && comprobar.addEventListener('click', function(){
    actualizarOpciones();
    const picks = [p1.value, p2.value, p3.value];
    const uniques = new Set(picks);
    const mensaje = document.createElement('div');
    mensaje.className = 'aciertos';
    if (uniques.size < 3) mensaje.textContent = 'No se permiten selecciones repetidas. Elige pilotos distintos.';
    else mensaje.textContent = 'Tus picks están listos. Pulsa "Sorteo aleatorio" para comparar.';
    resultados.innerHTML = '';
    resultados.appendChild(mensaje);
  });

  // inicializa
  actualizarOpciones();
});

