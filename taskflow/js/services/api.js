const BASE_URL = "https://jsonplaceholder.typicode.com";

export const obtenerTareasAPI = async (limit = 5) => {
  const res = await fetch(`${BASE_URL}/todos?_limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

export const guardarTareaAPI = async (tarea) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};