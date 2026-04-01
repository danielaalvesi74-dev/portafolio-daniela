// ===============================
// TASKFLOW - Versión Completa Estable
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#formTarea");
  const inputDesc = document.querySelector("#inDesc");
  const inputDeadline = document.querySelector("#inDeadline");
  const lista = document.querySelector("#lista");
  const stats = document.querySelector("#stats");

  const btnDemo = document.querySelector("#btnDemo");
  const btnSync = document.querySelector("#btnSync");
  const btnClear = document.querySelector("#btnClear");

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // ===============================
  // UTILIDADES
  // ===============================

  function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  function generarId() {
    return Date.now() + Math.random();
  }

  function mostrarNotificacion(mensaje) {
    const div = document.createElement("div");
    div.textContent = mensaje;
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.right = "20px";
    div.style.background = "#222";
    div.style.color = "white";
    div.style.padding = "12px";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  }

  function esManana(fechaStr) {
    if (!fechaStr) return false;

    const hoy = new Date();
    const manana = new Date();
    manana.setDate(hoy.getDate() + 1);

    const fecha = new Date(fechaStr);

    return (
      fecha.getFullYear() === manana.getFullYear() &&
      fecha.getMonth() === manana.getMonth() &&
      fecha.getDate() === manana.getDate()
    );
  }

  function revisarRecordatorios() {
    tareas.forEach(t => {
      if (t.estado === "pendiente" && esManana(t.fechaLimite)) {
        mostrarNotificacion(`⚠️ Mañana debes: ${t.descripcion}`);
      }
    });
  }

  function actualizarContador() {
    stats.textContent = `${tareas.length} tarea(s)`;
  }

  // ===============================
  // CRUD
  // ===============================

  function agregarTarea(descripcion, fechaLimite) {
    tareas.push({
      id: generarId(),
      descripcion,
      fechaLimite,
      estado: "pendiente"
    });

    guardar();
    render();
  }

  function cambiarEstado(id) {
    tareas = tareas.map(t =>
      t.id === id
        ? { ...t, estado: t.estado === "pendiente" ? "completada" : "pendiente" }
        : t
    );

    guardar();
    render();
  }

  function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardar();
    render();
  }

  function limpiarTodo() {
    tareas = [];
    guardar();
    render();
  }

  // ===============================
  // RENDER
  // ===============================

  function render() {
    lista.innerHTML = "";

    tareas.forEach(t => {
      const li = document.createElement("li");
      li.dataset.id = t.id;

      li.innerHTML = `
        <div>
          <strong style="text-decoration:${t.estado === "completada" ? "line-through" : "none"}">
            ${t.descripcion}
          </strong>
          <br>
          <small>${t.fechaLimite || ""}</small>
        </div>
        <div>
          <button class="btnToggle">Cambiar</button>
          <button class="btnDelete">Eliminar</button>
        </div>
      `;

      lista.appendChild(li);
    });

    actualizarContador();
  }

  // ===============================
  // EVENTOS
  // ===============================

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputDesc.value) return;

    agregarTarea(inputDesc.value, inputDeadline.value);
    form.reset();
  });

  lista.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("btnToggle")) {
      cambiarEstado(id);
    }

    if (e.target.classList.contains("btnDelete")) {
      eliminarTarea(id);
    }
  });

  // ===============================
  // BOTÓN DEMO
  // ===============================

  btnDemo.addEventListener("click", () => {
    agregarTarea("Estudiar JavaScript", null);
    agregarTarea("Preparar evaluación", null);
    agregarTarea("Hacer ejercicio", null);

    mostrarNotificacion("✨ Tareas demo agregadas");
  });

  // ===============================
  // BOTÓN SINCRONIZAR API
  // ===============================

  btnSync.addEventListener("click", async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      const data = await response.json();

      data.forEach(item => {
        agregarTarea(item.title, null);
      });

      mostrarNotificacion("☁️ Tareas sincronizadas desde API");
    } catch (error) {
      mostrarNotificacion("❌ Error al consumir API");
    }
  });

  // ===============================
  // BOTÓN LIMPIAR
  // ===============================

  btnClear.addEventListener("click", () => {
    limpiarTodo();
    mostrarNotificacion("🧼 Lista limpiada");
  });

  // ===============================
  // INICIALIZAR
  // ===============================

  render();
  revisarRecordatorios();

});
