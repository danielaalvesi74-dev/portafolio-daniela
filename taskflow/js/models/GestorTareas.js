import { Tarea } from "./Tarea.js";
import { saveTasks, loadTasks, clearTasks } from "../services/storage.js";

export class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  cargar() {
    const datos = loadTasks();
    this.tareas = datos.map((t) => new Tarea(t));
  }

  guardar() {
    saveTasks(this.tareas);
  }

  // ID realmente único (evita que cambie otra tarea por error)
  generarId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // respaldo por si algún navegador no tiene randomUUID
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  agregarTarea(descripcion, fechaLimiteISO = null) {
    const nueva = new Tarea({
      id: this.generarId(), // 👈 aquí el cambio importante
      descripcion,
      fechaLimite: fechaLimiteISO,
    });

    this.tareas = [...this.tareas, nueva];
    this.guardar();
    return nueva;
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
    this.guardar();
  }

  cambiarEstadoTarea(id) {
    const tarea = this.tareas.find((t) => t.id === id);
    if (tarea) tarea.cambiarEstado();
    this.guardar();
  }

  editarTarea(id, nuevaDescripcion) {
    const tarea = this.tareas.find((t) => t.id === id);
    if (tarea) tarea.editarDescripcion(nuevaDescripcion);
    this.guardar();
  }

  actualizarFechaLimite(id, fechaLimiteISO) {
    const tarea = this.tareas.find((t) => t.id === id);
    if (tarea) tarea.setFechaLimite(fechaLimiteISO);
    this.guardar();
  }

  limpiarTodo() {
    this.tareas = [];
    clearTasks();
  }

  buscarYFiltrar({ texto = "", estado = "todas" }) {
    const q = texto.trim().toLowerCase();

    return this.tareas.filter((t) => {
      const matchTexto = t.descripcion.toLowerCase().includes(q);
      const matchEstado = estado === "todas" ? true : t.estado === estado;
      return matchTexto && matchEstado;
    });
  }
}