// Mercado — comportamiento mínimo compartido por las maquetas.
// No guarda nada: solo muestra cómo responde la interfaz a cada acción.
(function () {
  'use strict';

  var pesos = function (n) {
    return '$' + Math.round(n).toLocaleString('es-CO');
  };

  // =========================================================
  // Cinta de precios: pausar o seguir (WCAG 2.2.2). El estado lo dice aria-pressed.
  // =========================================================
  document.querySelectorAll('.ticker-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var pausada = b.closest('.ticker').classList.toggle('paused');
      b.setAttribute('aria-pressed', String(pausada));
    });
  });

  // =========================================================
  // Aviso flotante. La región existe desde que carga la página para que el
  // lector de pantalla anuncie el primer mensaje. Si trae "Deshacer", el foco
  // va al botón; al cerrarse, vuelve a donde corresponde.
  // =========================================================
  var aviso = document.createElement('div');
  aviso.className = 'toast';
  aviso.setAttribute('role', 'status');
  var telefono = document.querySelector('.phone');
  if (telefono) telefono.insertBefore(aviso, telefono.querySelector('.tabbar'));
  else document.body.appendChild(aviso);

  var temporizador = null;
  var restante = 0;
  var inicio = 0;
  var volverA = null;
  var focoPorCodigo = false;   // el foco que pone el código no pausa el aviso; solo el de la persona

  function cerrarAviso() {
    clearTimeout(temporizador);
    var teniaFoco = aviso.contains(document.activeElement);
    aviso.classList.remove('show');
    if (teniaFoco && volverA && document.body.contains(volverA)) volverA.focus();
  }
  function correr(ms) {
    restante = ms;
    inicio = Date.now();
    clearTimeout(temporizador);
    temporizador = setTimeout(cerrarAviso, ms);
  }
  function pausar() {
    if (!aviso.classList.contains('show')) return;
    clearTimeout(temporizador);
    restante -= Date.now() - inicio;
  }
  function seguir() {
    if (aviso.classList.contains('show')) correr(Math.max(restante, 2500));
  }
  aviso.addEventListener('mouseenter', pausar);
  aviso.addEventListener('mouseleave', seguir);
  aviso.addEventListener('focusin', function () { if (!focoPorCodigo) pausar(); });
  aviso.addEventListener('focusout', function (e) {
    if (!aviso.contains(e.relatedTarget)) seguir();
  });
  aviso.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarAviso();
    // Tab no se escapa al final de la página: vuelve a la lista
    if (e.key === 'Tab' && volverA && document.body.contains(volverA)) {
      e.preventDefault();
      volverA.focus();
    }
  });

  // opciones: { deshacer: fn, enlace: { texto, href }, volverA: elemento }
  function avisar(texto, opciones) {
    opciones = opciones || {};
    volverA = opciones.volverA || null;
    aviso.textContent = '';
    var p = document.createElement('p');
    p.textContent = texto;
    aviso.appendChild(p);
    var accion = null;
    if (opciones.deshacer) {
      accion = document.createElement('button');
      accion.type = 'button';
      accion.textContent = 'Deshacer';
      accion.addEventListener('click', function () {
        clearTimeout(temporizador);
        aviso.classList.remove('show');
        opciones.deshacer();
      });
    } else if (opciones.enlace) {
      accion = document.createElement('a');
      accion.href = opciones.enlace.href;
      accion.textContent = opciones.enlace.texto;
    }
    if (accion) aviso.appendChild(accion);
    aviso.classList.add('show');
    correr(10000);
    if (opciones.deshacer) {
      focoPorCodigo = true;
      accion.focus();
      focoPorCodigo = false;
    }
  }

  // =========================================================
  // Agregar a mi canasta (Hoy, Producto)
  // =========================================================
  document.querySelectorAll('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ya = Number(b.dataset.have || 0);
      var texto = ya
        ? 'Ahora tienes ' + (ya + 1) + ' × ' + b.dataset.add + ' en tu canasta.'
        : 'Agregaste 1 × ' + b.dataset.add + ' a tu canasta.';
      if (ya) {
        b.dataset.have = ya + 1;
        var nota = document.querySelector('[data-have-note]');
        if (nota) nota.textContent = 'Ya tienes ' + (ya + 1) + ' en tu canasta.';
      }
      avisar(texto, { enlace: { texto: 'Ver canasta', href: 'canasta.html' } });
    });
  });

  // =========================================================
  // Producto: validar el precio objetivo mientras se escribe
  // =========================================================
  var objetivo = document.getElementById('objetivo');
  if (objetivo) {
    var avisoMeta = document.getElementById('objetivo-aviso');
    var hoy = Number(objetivo.dataset.today);
    var revisar = function (alEnviar) {
      var valor = objetivo.value.trim();
      var numero = Number(valor.replace(/[.\s$]/g, ''));
      var mensaje = '';
      if (!valor) { if (alEnviar) mensaje = 'Escribe tu precio objetivo, por ejemplo 4.000.'; }
      else if (/[^\d.\s$]/.test(valor) || !numero) mensaje = 'Escribe solo el número, por ejemplo 4.000.';
      else if (numero >= hoy) mensaje = 'Hoy ya está a ' + pesos(hoy) + ': con esa meta te avisaríamos hoy mismo. Prueba con un precio más bajo.';
      avisoMeta.textContent = mensaje;
      objetivo.setAttribute('aria-invalid', String(Boolean(mensaje)));
      objetivo.closest('.money').classList.toggle('is-invalid', Boolean(mensaje));
      return !mensaje;
    };
    objetivo.addEventListener('input', function () { revisar(false); });
    // Al salir del campo, 4500 se escribe como 4.500
    objetivo.addEventListener('blur', function () {
      var numero = Number(objetivo.value.replace(/[.\s$]/g, ''));
      if (numero && /^[\d.\s$]+$/.test(objetivo.value)) objetivo.value = numero.toLocaleString('es-CO');
    });
    objetivo.form.setAttribute('novalidate', '');
    objetivo.form.addEventListener('submit', function (e) {
      if (!revisar(true)) { e.preventDefault(); objetivo.focus(); }
    });
  }

  // =========================================================
  // Mi canasta: lista, plan y tirilla salen de un solo conjunto de datos de ejemplo
  // =========================================================
  var lista = document.querySelector('.basket-list');
  if (lista && document.querySelector('.tirilla')) {
    var productos = [
      { id: 'arroz', nombre: 'Arroz blanco 1 kg', corto: 'Arroz blanco 1 kg', cant: 2, med: 1, unidad: 'el kilo', p: { 'D1': 4290, 'Olímpica': 4520, 'Éxito': 4690, 'Jumbo': 4880 } },
      { id: 'leche', nombre: 'Leche entera 1,1 L', corto: 'Leche entera 1,1 L', cant: 6, med: 1.1, unidad: 'el litro', p: { 'D1': 4650, 'Olímpica': 4950 } },
      { id: 'lenteja', nombre: 'Lenteja 500 g', corto: 'Lenteja 500 g', cant: 2, med: 0.5, unidad: 'el kilo', p: { 'D1': 3900, 'Olímpica': 4200 } },
      { id: 'atun', nombre: 'Atún en aceite 160 g', corto: 'Atún 160 g', cant: 3, med: 0.16, unidad: 'el kilo', p: { 'D1': 4900, 'Olímpica': 5900 } },
      { id: 'pasta', nombre: 'Pasta spaghetti 500 g', corto: 'Pasta 500 g', cant: 2, med: 0.5, unidad: 'el kilo', p: { 'D1': 3100, 'Olímpica': 3430, 'Éxito': 2950 } },
      { id: 'huevos', nombre: 'Huevos AA x30', corto: 'Huevos AA x30', cant: 1, med: 30, unidad: 'cada uno', p: { 'D1': 16200, 'Olímpica': 15900, 'Éxito': 16900 } },
      { id: 'aceite', nombre: 'Aceite vegetal 1 L', corto: 'Aceite vegetal 1 L', cant: 1, med: 1, unidad: 'el litro', p: { 'D1': 10200, 'Olímpica': 9850 } },
      { id: 'panela', nombre: 'Panela 500 g', corto: 'Panela 500 g', cant: 2, med: 0.5, unidad: 'el kilo', p: { 'D1': 2750, 'Olímpica': 2700 } },
      { id: 'cafe', nombre: 'Café molido 500 g', corto: 'Café molido 500 g', cant: 1, med: 0.5, unidad: 'el kilo', p: { 'Olímpica': 18950, 'Jumbo': 18400 } },
      { id: 'azucar', nombre: 'Azúcar 1 kg', corto: 'Azúcar 1 kg', cant: 1, med: 1, unidad: 'el kilo', p: { 'D1': 4300, 'Olímpica': 4100 } }
    ];
    var TIENDAS = ['D1', 'Olímpica', 'Éxito', 'Jumbo'];
    var planes = { 1: ['Olímpica'], 2: ['D1', 'Olímpica'], 3: ['D1', 'Olímpica', 'Jumbo'] };
    var PASAJE = 3000;            // supuesto de ejemplo: por debajo de esto, otra tienda no compensa el viaje
    var plan = 2;

    var activos = function () { return productos.filter(function (x) { return !x.fuera; }); };
    var faltan = function (t) { return activos().filter(function (x) { return !x.p[t]; }); };
    // El ahorro se mide contra la tienda más barata entre las que tienen TODA la lista
    var tiendaBase = function () {
      var completas = TIENDAS.filter(function (t) { return !faltan(t).length; });
      var costo = function (t) { return activos().reduce(function (s, x) { return s + x.p[t] * x.cant; }, 0); };
      completas.sort(function (a, b) { return costo(a) - costo(b); });
      planes[1] = [completas[0]];
      return { tienda: completas[0], unica: completas.length === 1 };
    };
    // La tienda más barata en general que no alcanza para toda la lista (para explicarlo)
    var incompleta = function (base) {
      var t = planes[2].filter(function (s) { return s !== base && faltan(s).length; })[0];
      return t ? { tienda: t, falta: faltan(t).map(function (x) { return x.corto.split(' ')[0].toLowerCase(); }) } : null;
    };
    var dondeCompra = function (x, tiendas) {
      var mejor = null;
      tiendas.forEach(function (t) { if (x.p[t] && (!mejor || x.p[t] < x.p[mejor])) mejor = t; });
      return mejor;
    };
    var totalPlan = function (n) {
      return activos().reduce(function (s, x) { var t = dondeCompra(x, planes[n]); return s + (t ? x.p[t] * x.cant : 0); }, 0);
    };
    var porUnidad = function (x, precio) {
      return x.unidad === 'cada uno' ? pesos(precio / x.med) + ' cada uno' : pesos(precio / x.med) + ' ' + x.unidad;
    };
    var el = function (html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };
    var ICON_MENOS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>';
    var ICON_MAS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';
    var ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
    var anuncio = document.getElementById('plan-anuncio');

    var fila = function (x, tienda) {
      var precio = x.p[tienda];
      var nota = (tienda !== 'D1' && planes[plan].indexOf('D1') > -1 && !x.p['D1']) ? ' · <span class="row-note">no lo hay en D1</span>' : '';
      var minimo = x.cant === 1 ? ' aria-disabled="true"' : '';
      return '<li class="basket-row" data-id="' + x.id + '">' +
        '<div class="br-info"><span class="br-name">' + x.nombre + '</span><span class="br-unit">' + pesos(precio) + ' c/u · ' + porUnidad(x, precio) + nota + '</span></div>' +
        '<div class="stepper" role="group" aria-label="Cantidad de ' + x.nombre + '">' +
        '<button type="button" data-step="-1"' + minimo + ' aria-label="Quitar uno de ' + x.nombre + '">' + ICON_MENOS + '</button>' +
        '<output>' + x.cant + '</output>' +
        '<button type="button" data-step="1" aria-label="Agregar uno de ' + x.nombre + '">' + ICON_MAS + '</button></div>' +
        '<span class="br-total">' + pesos(precio * x.cant) + '</span>' +
        '<button type="button" class="br-remove" aria-label="Sacar ' + x.nombre + ' de la lista">' + ICON_X + '</button></li>';
    };

    var pintar = function () {
      var b = tiendaBase();
      var BASE = b.tienda;
      var corta = incompleta(BASE);
      var tiendas = planes[plan];
      var grupos = {};
      tiendas.forEach(function (t) { grupos[t] = []; });
      activos().forEach(function (x) { var t = dondeCompra(x, tiendas); if (t) grupos[t].push(x); });

      // Lista agrupada por tienda
      lista.querySelectorAll('.store-group').forEach(function (g) { g.remove(); });
      var nota = lista.querySelector('.basket-note');
      tiendas.forEach(function (t) {
        if (!grupos[t].length) return;
        var sub = grupos[t].reduce(function (s, x) { return s + x.p[t] * x.cant; }, 0);
        var id = 'g-' + t.toLowerCase().replace(/[^a-z0-9]/g, '');
        var sec = el('<section class="store-group" aria-labelledby="' + id + '"><div class="store-head"><h2 id="' + id + '">' + t + '</h2>' +
          '<span class="mono">' + grupos[t].length + (grupos[t].length === 1 ? ' producto' : ' productos') + ' · ' + pesos(sub) + '</span></div>' +
          '<ul>' + grupos[t].map(function (x) { return fila(x, t); }).join('') + '</ul></section>');
        lista.insertBefore(sec, nota);
      });

      // Costo de cada plan en su tarjeta
      var base = totalPlan(1);
      var ahorro2 = base - totalPlan(2);
      var ahorro3 = base - totalPlan(3);
      document.querySelectorAll('input[name="plan"]').forEach(function (r) {
        var n = Number(r.value);
        var small = r.nextElementSibling.querySelector('small');
        var aviso3 = r.nextElementSibling.querySelector('.plan-warn');
        if (n === 1) {
          small.textContent = BASE + ' · ' + pesos(base);
          var nota1 = r.nextElementSibling.querySelector('.plan-note');
          if (!nota1) { nota1 = document.createElement('em'); nota1.className = 'plan-note'; r.nextElementSibling.appendChild(nota1); }
          nota1.textContent = b.unica ? 'la única que tiene todo' : 'la más barata con todo';
        }
        if (n === 2) small.textContent = 'ahorras ' + pesos(ahorro2);
        if (n === 3) {
          small.textContent = 'ahorras ' + pesos(ahorro3);
          var extra = ahorro3 - ahorro2;
          if (!aviso3) { aviso3 = document.createElement('em'); aviso3.className = 'plan-warn'; r.nextElementSibling.appendChild(aviso3); }
          aviso3.textContent = extra < PASAJE ? 'solo ' + pesos(extra) + ' más que con 2: menos que un pasaje (' + pesos(PASAJE) + ')' : '';
          aviso3.hidden = extra >= PASAJE;
        }
      });

      // Tirilla
      var tirilla = document.querySelector('.tirilla');
      tirilla.querySelector('.t-plan').textContent = 'PLAN ' + plan + (plan === 1 ? ' TIENDA' : ' TIENDAS');
      tirilla.querySelectorAll('.t-group').forEach(function (g) { g.remove(); });
      var corte = tirilla.querySelectorAll('.t-rule')[1];
      tiendas.forEach(function (t) {
        if (!grupos[t].length) return;
        var sub = grupos[t].reduce(function (s, x) { return s + x.p[t] * x.cant; }, 0);
        var g = el('<div class="t-group"><p class="t-store"><span>» ' + t.toUpperCase() + '</span><span>' + grupos[t].length + (grupos[t].length === 1 ? ' producto' : ' productos') + '</span></p>' +
          grupos[t].map(function (x) { return '<p class="t-line"><span>' + x.cant + ' × ' + x.corto + '</span><span>' + (x.p[t] * x.cant).toLocaleString('es-CO') + '</span></p>'; }).join('') +
          '<p class="t-sub-total"><span>SUBTOTAL</span><span>' + pesos(sub) + '</span></p></div>');
        tirilla.insertBefore(g, corte);
      });
      var total = totalPlan(plan);
      var ahorro = base - total;
      tirilla.querySelector('.t-total span:last-child').textContent = pesos(total);
      var comparar = tirilla.querySelector('.t-compare');
      comparar.hidden = plan === 1;
      comparar.querySelector('span').textContent = 'Todo en ' + BASE;
      comparar.querySelector('s').textContent = pesos(base);
      tirilla.querySelector('.t-save').hidden = plan === 1;
      tirilla.querySelector('.t-save-value').textContent = pesos(ahorro);
      var porque = corta ? ' ' + corta.tienda + ' sería más barata, pero no tiene ' + corta.falta.join(' ni ') + '.' : '';
      var fino = tirilla.querySelector('.t-fine');
      if (plan === 1) fino.textContent = 'Todo en ' + BASE + ', ' + (b.unica ? 'la única tienda con los ' : 'la más barata con los ') + activos().length + ' productos de tu lista.' + porque;
      if (plan === 2) fino.textContent = 'Comparado con comprar todo en ' + BASE + ', ' + (b.unica ? 'la única tienda que tiene toda tu lista.' : 'la más barata con toda tu lista.') + porque + ' Si el pasaje a la segunda tienda te cuesta más de ' + pesos(ahorro) + ', te conviene ir a una sola.';
      if (plan === 3) fino.textContent = 'Comparado con comprar todo en ' + BASE + '. Ir a Jumbo por el café solo suma ' + pesos(ahorro3 - ahorro2) + ' frente al plan de 2 tiendas: menos que un pasaje, que aquí suponemos de ' + pesos(PASAJE) + '.';

      // Barra móvil
      var barra = document.querySelector('.basket-bar');
      if (barra) {
        barra.querySelector('strong').textContent = pesos(total);
        var bs = barra.querySelector('.bb-save');
        bs.textContent = 'ahorras ' + pesos(ahorro);
        bs.hidden = plan === 1;
      }
      return { total: total, ahorro: ahorro };
    };

    var decir = function (texto) { if (anuncio) anuncio.textContent = texto; };

    lista.addEventListener('click', function (e) {
      var paso = e.target.closest('[data-step]');
      var sacar = e.target.closest('.br-remove');
      if (!paso && !sacar) return;
      var li = e.target.closest('.basket-row');
      var x = productos.filter(function (p) { return p.id === li.dataset.id; })[0];
      if (paso) {
        var d = Number(paso.dataset.step);
        if (d === -1 && x.cant === 1) {
          decir('Ya tienes solo 1 × ' + x.nombre + '. Para sacarlo de la lista usa la ×.');
          return;
        }
        x.cant = Math.max(1, x.cant + d);
        var r = pintar();
        var nuevo = lista.querySelector('.basket-row[data-id="' + x.id + '"] [data-step="' + d + '"]');
        if (nuevo) nuevo.focus();
        decir(x.cant + ' × ' + x.nombre + '. Total ' + pesos(r.total) + '.');
      } else {
        var filas = Array.prototype.slice.call(lista.querySelectorAll('.basket-row'));
        var i = filas.indexOf(li);
        var vecino = (filas[i + 1] || filas[i - 1] || null);
        var vecinoId = vecino && vecino.dataset.id;
        x.fuera = true;
        pintar();
        var destino = vecinoId ? lista.querySelector('.basket-row[data-id="' + vecinoId + '"] .br-remove') : document.getElementById('nuevo');
        avisar('Sacaste ' + x.nombre + ' de la lista.', {
          volverA: destino,
          deshacer: function () {
            x.fuera = false;
            pintar();
            lista.querySelector('.basket-row[data-id="' + x.id + '"] .br-remove').focus();
            decir('Volvió ' + x.nombre + ' a tu lista.');
          }
        });
      }
    });

    document.querySelectorAll('input[name="plan"]').forEach(function (r) {
      r.addEventListener('change', function () {
        plan = Number(r.value);
        var res = pintar();
        decir('Plan de ' + plan + (plan === 1 ? ' tienda' : ' tiendas') + ': total ' + pesos(res.total) + (plan === 1 ? '.' : ', ahorras ' + pesos(res.ahorro) + '.'));
      });
    });

    // Agregar a la lista: en la maqueta no hay buscador real, así que se explica qué pasaría
    var agregar = document.querySelector('.basket-add');
    if (agregar) {
      agregar.addEventListener('submit', function (e) {
        e.preventDefault();
        var campo = agregar.querySelector('input');
        var texto = campo.value.trim();
        if (!texto) { campo.focus(); return; }
        campo.value = '';
        avisar('Agregaste «' + texto + '». Si no lo encontramos en las tiendas, queda en tu lista sin precio.');
      });
    }

    pintar();
  }

  // =========================================================
  // Alertas: borrar con deshacer; el foco nunca se pierde
  // =========================================================
  var contador = document.querySelector('[data-alert-count]');
  var contar = function () {
    if (contador) contador.textContent = document.querySelectorAll('.alert-list .alert-row:not([hidden])').length;
  };
  document.querySelectorAll('[data-delete]').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.closest('li');
      var menu = b.closest('details');
      if (menu) menu.open = false;
      var siguiente = li.nextElementSibling;
      while (siguiente && siguiente.hidden) siguiente = siguiente.nextElementSibling;
      var destino = siguiente ? siguiente.querySelector('summary') : document.getElementById('lista-t');
      li.hidden = true;
      contar();
      avisar('Borraste la alerta de ' + b.dataset.delete + '.', {
        volverA: destino,
        deshacer: function () {
          li.hidden = false;
          contar();
          if (menu) menu.querySelector('summary').focus();
        }
      });
    });
  });

  // =========================================================
  // Menús desplegables: uno a la vez; se cierran con Escape, clic afuera o al sacar el foco
  // =========================================================
  var menus = Array.prototype.slice.call(document.querySelectorAll('details.ar-menu, details.new-alert'));
  menus.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        menus.forEach(function (o) { if (o !== d) o.open = false; });
        var campo = d.querySelector('input');
        if (campo) campo.focus();
      }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.open) {
        d.open = false;
        d.querySelector('summary').focus();
      }
    });
    d.addEventListener('focusout', function (e) {
      if (d.open && e.relatedTarget && !d.contains(e.relatedTarget)) d.open = false;
    });
  });
  document.addEventListener('click', function (e) {
    menus.forEach(function (d) {
      if (d.open && !d.contains(e.target)) d.open = false;
    });
  });
})();
