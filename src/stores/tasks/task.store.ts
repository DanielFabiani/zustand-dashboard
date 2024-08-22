import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { v4 as uuidV4 } from "uuid"; 

interface TaskState {
  tasks: Record<string, Task>,  // {[key: string]: Task}

  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus)=> Task[];
  
  setDraggingTaskId: (taskId: string) => void;
  
  removeDraggingTaskId: () => void;
  
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  
  onTaskDrop: (status: TaskStatus) => void;

  addTask: (title: string, status: TaskStatus) => void;

}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },

  draggingTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) => { 
    const tasks = get().tasks
    // trae los valores del objeto
    return Object.values(tasks).filter((task) => task.status === status)
  },

  setDraggingTaskId: (taskId: string) => {
    set({draggingTaskId: taskId})
  },

  removeDraggingTaskId: () => {
    set({draggingTaskId: undefined})
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {

    /* const task = get().tasks[taskId];

    task.status = status; */

    //? mutado el estado con immer, sin hacer el spread del estado anterior
    set(state => {
      state.tasks[taskId] = {
        // mutamos el estado del task de objetos anidados
        ...state.tasks[taskId],
        status
      };
    })

    /* set((state) => ({
      tasks: {
        // hace es spread de todas las tareas anteriores
        ...state.tasks,
        [taskId]: task,
      }
    })) */
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;

    if(!taskId) return;

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId();
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = {id: uuidV4(), title, status};

    set(state => {
      state.tasks[newTask.id] = newTask;
    })

    /* set(state => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask
      }
    })) */
  }
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(storeApi),
      { name: 'task-store'}

    )
    
  )
)