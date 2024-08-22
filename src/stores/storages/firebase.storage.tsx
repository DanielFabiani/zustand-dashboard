import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl =
  "https://zustand-dashboard-storage-rea-default-rtdb.firebaseio.com/zuatnd";

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    return;
  },

  removeItem: function (name: string): void | Promise<unknown> {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
