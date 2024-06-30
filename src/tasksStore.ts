import create from 'zustand';
import { Task } from './models/Task';

type Store = {
  tasks: Task[];
  addTask: (title: string) => void;
  finishTask: (id: number) => void;
  moveTaskUp: (index: number) => void;
  moveTaskDown: (index: number) => void;
};

const useStore = create<Store>((set) => ({
  tasks: (() => {
    const tasksLocal = localStorage.getItem('tasks');
    // Pokud existuje něco v localStorage, načtou se data z localStorage, pokud ne -> defaultní hodnoty
    return tasksLocal ? JSON.parse(tasksLocal) : [
      {id:1, title: "Uvařit guláš"},
      {id:2, title: "Vyvenčit psa"},
      {id:3, title: "Dát si pivko"}
    ];
  })(),

  addTask: (title) => set((state) => {
    if (title === '') return state;
    const newTask = {
      id: Date.now(),
      title
    };
    const updatedTasks = [...state.tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
  }),

  finishTask: (id) => set((state) => {
    const updatedTasks = state.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
  }),

  moveTaskUp: (index) => set((state) => {
    if (index === 0) return state;
    const newTasks = [...state.tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  moveTaskDown: (index) => set((state) => {
    if (index === state.tasks.length - 1) return state;
    const newTasks = [...state.tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  })
}));

export default useStore;