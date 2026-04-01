export const showToast = (msg) => {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
};

export const toDatetimeLocalValue = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

export const humanCountdown = (iso) => {
  if (!iso) return "Sin fecha límite";
  const ms = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(ms)) return "Fecha inválida";
  if (ms <= 0) return "Vencida ⛔";

  const mins = Math.floor(ms / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (days > 0) return `Faltan ${days} día(s)`;
  if (hrs > 0) return `Faltan ${hrs} hora(s)`;
  return `Faltan ${mins} minuto(s)`;
};