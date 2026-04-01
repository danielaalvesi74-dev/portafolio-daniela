const KEY = "taskflow_tareas";

export const saveTasks = (tareas) => {
  localStorage.setItem(KEY, JSON.stringify(tareas));
};

export const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export const clearTasks = () => {
  localStorage.removeItem(KEY);
};