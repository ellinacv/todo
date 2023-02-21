import DB from '../data/db.json';

const COLORS_CACHE_KEY = '_colors';

const getInitialColors = () => [...DB.colors];

export const getUserColors = () =>
  new Promise((resolve, reject) => {
    try {
      const existed = window.localStorage.getItem(COLORS_CACHE_KEY);
      if (!existed) {
        const initial = getInitialColors();
        try {
          window.localStorage.setItem(
            COLORS_CACHE_KEY,
            JSON.stringify(initial),
          );
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
