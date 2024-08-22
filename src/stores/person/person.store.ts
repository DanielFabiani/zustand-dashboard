import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWeddingBounceStore } from "../wedding";
//import { firebaseStorage } from "../storages/firebase.storage";



interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({

  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set( ({firstName: (value)}), false, 'setFirstName' ),
  setLastName: (value: string) => set( ({lastName: (value)}), false, 'setLastName' ),
});


export const usePersonStore = create<PersonState & Actions>()(
  
  //- los middlewares son funciones que envuelven los stores 
  // persist() guarda los datos en el navegador en el local storage

  devtools(
    persist(
      storeApi, 
      { 
        name: 'person-storage', 
        //storage: firebaseStorage
      }
    )
  )
  
);

usePersonStore.subscribe((nextState, /* prevState */) => {

  const { firstName, lastName } = nextState;

  useWeddingBounceStore.getState().setFirstName(firstName);
  useWeddingBounceStore.getState().setLastName(lastName);
  
})
