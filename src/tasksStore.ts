import create from 'zustand';
import { Task } from './models/Task';

type Store = {
  // Deklarujeme promenne a funkce pro zmenu stavu
  tasks: Task[];
  addTask: (title: string) => void;
  finishTask: (id: number) => void;
  moveTaskUp: (index: number) => void;
  moveTaskDown: (index: number) => void;
};

// Postupne je potreba veskere deklarovane funkce a promenne definovat

const useStore = create<Store>((set) => ({
  // Funkce vytvarejici tasky pri startu aplikace. Ty se nacitaji z localStorage - existuji-li tam. Pokud ne, vytvari se preddefinovane pole
  tasks: (() => {
    const tasksLocal = localStorage.getItem('tasks');
    return tasksLocal ? JSON.parse(tasksLocal) : [
      {id:1, title: "Uvařit guláš"},
      {id:2, title: "Vyvenčit psa"},
      {id:3, title: "Dát si pivko"}
    ];
  })(),

  // Funkce pro pridani tasku s osetrenim pridani prazdneho tasku
  // Pro prirazeni id Date.now() - jednoducha a efektivni forma prirazeni unikatniho id bez zasahu uzivatele
  // Vytvari se kopie s tasky ke ktere se appenduje novy task. Tato "vylepsena" kopie se uklada do localStorage a nasledne se s ni updatuje stav
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

  // Funkce pro dokonceni (smazani) tasku.
  // Vytvari se kopie pole s tasky, pri vytvareni se aplikuje pravidlo, ze se do kopie pridaji pouze tasky s jinym id nez je id dokonceneho tasku
  finishTask: (id) => set((state) => {
    const updatedTasks = state.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
  }),

  //Posunuti tasku nahoru, omezeni v pripdae, ze task uz je prvni
  // Vstupnim parametrem je index, coz je z .tsx pozice v seznamu tasku
  // Vytvorime kopii seznamu tasku a v teto kopii prehodime indexovany task s taskem, ktery je nad nim
  moveTaskUp: (index) => set((state) => {
    if (index === 0) return state;
    const newTasks = [...state.tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  // Posunuti tasku dolu, omezeni v pripade, ze task uz je posledni
  // Vstupnim parametrem je index, coz je z .tsx pozice v seznamu tasku
  // Jako v predesle funkci - vytvorime kopii seznamu tasku a teto kopii prehodime indexovany task s taskem, ktery je pred nim
  moveTaskDown: (index) => set((state) => {
    if (index === state.tasks.length - 1) return state;
    const newTasks = [...state.tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  })
}));

export default useStore;