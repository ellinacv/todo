import DB from '../data/db.json';

const LISTS_CACHE_KEY = '_lists';

const getInitialLists = () => [...DB.lists];

export const getUserLists = () =>
  new Promise((resolve, reject) => {
    try {
      const existed = window.localStorage.getItem(LISTS_CACHE_KEY);
      if (!existed) {
        const initial = getInitialLists();
        try {
          window.localStorage.setItem(LISTS_CACHE_KEY, JSON.stringify(initial));
        } catch (error) {
          // noop
        }
        resolve(initial);
        return;
      }

      resolve(JSON.parse(existed));
    } catch (error) {
      reject(error);
    }
  });

export const addList = ({ name, colorId }) =>
  new Promise((resolve, reject) => {
    try {
      const existed = window.localStorage.getItem(LISTS_CACHE_KEY);
      if (!existed) {
        const newItem = {
          id: 1,
          name,
          colorId,
        };
        window.localStorage.setItem(LISTS_CACHE_KEY, JSON.stringify([newItem]));

        resolve(newItem);
        return;
      }

      let edited = JSON.parse(existed);
      const newItem = {
        id: (edited[edited.length - 1] || { id: 0 }).id + 1,
        name,
        colorId,
      };
      edited = edited.concat(newItem);
      window.localStorage.setItem(LISTS_CACHE_KEY, JSON.stringify(edited));

      resolve(newItem);
    } catch (error) {
      reject(error);
    }
  });

export const deleteList = (listId) =>
  new Promise((resolve, reject) => {
    try {
      const existed = window.localStorage.getItem(LISTS_CACHE_KEY);
      if (!existed) {
        throw new Error('The list not found');
      }

      const parsed = JSON.parse(existed);
      const edited = parsed.filter((l) => l.id !== listId);

      if (edited.length !== parsed.length) {
        window.localStorage.setItem(LISTS_CACHE_KEY, JSON.stringify(edited));
      }

      resolve(listId);
    } catch (error) {
      reject(error);
    }
  });
