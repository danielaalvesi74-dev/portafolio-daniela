export class Tarea {
  constructor({
    id,
    descripcion,
    estado = "pendiente",
    fechaCreacion = new Date().toISOString(),
    fechaLimite = null
  }) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaLimite = fechaLimite; // ISO string o null
  }

  cambiarEstado() {
    this.estado = this.estado === "pendiente" ? "completada" : "pendiente";
  }

  editarDescripcion(nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  }

  setFechaLimite(fechaLimiteISO) {
    this.fechaLimite = fechaLimiteISO || null;
  }
}