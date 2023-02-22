import { nanoid } from 'nanoid';

const TASKS_CACHE_KEY = '_tasks';

export const getAllUserTasks = () =>
  new Promise((resolve, reject) => {
    try {
      const tasks = window.localStorage.getItem(TASKS_CACHE_KEY);
      if (!tasks) {
        resolve([]);
        return;
      }
      resolve(JSON.parse(tasks));
    } catch (error) {
      reject(error);
    }
  });

export const getListTasks = async (listId) => {
  const allTasks = await getAllUserTasks();
  return allTasks.filter((t) => t.listId === listId);
};

export const addTask = ({ text, listId }) =>
  new Promise((resolve, reject) => {
    try {
      const newItem = {
        id: nanoid(),
        text,
        listId,
        completed: false,
      };

      const existed = window.localStorage.getItem(TASKS_CACHE_KEY);
      if (!existed) {
        window.localStorage.setItem(TASKS_CACHE_KEY, JSON.stringify([newItem]));
      } else {
        let parsed = JSON.parse(existed);
        if (Array.isArray(parsed) !== true) {
          parsed = [];
        }
        window.localStorage.setItem(
          TASKS_CACHE_KEY,
          JSON.stringify(parsed.concat(newItem)),
        );
      }

      resolve(newItem);
    } catch (error) {
      reject(error);
    }
  });

export const deleteTask = (taskId) =>
  new Promise((resolve, reject) => {
    try {
      const tasks = window.localStorage.getItem(TASKS_CACHE_KEY);
      if (!tasks) {
        throw new Error('User tasks not found');
      }

      const parsed = JSON.parse(tasks);
      const edited = parsed.filter((t) => t.id !== taskId);

      if (edited.length !== parsed.length) {
        window.localStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(edited));
      }

      resolve(taskId);
    } catch (error) {
      reject(error);
    }
  });

export const editTask = (taskId, dto) =>
  new Promise((resolve, reject) => {
    if (typeof dto !== 'object' || dto === null) {
      throw new Error('Invalid task data');
    }

    try {
      const tasks = window.localStorage.getItem(TASKS_CACHE_KEY);
      if (!tasks) {
        throw new Error('User tasks not found');
      }

      const forEdit = JSON.parse(tasks);
      const taskIdx = forEdit.findIndex((t) => t.id === taskId);

      if (taskIdx < 0) {
        throw new Error('The task not found');
      }

      forEdit[taskIdx] = {
        ...forEdit[taskIdx],
        ...dto,
      };

      window.localStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(forEdit));

      resolve(forEdit[taskIdx]);
    } catch (error) {
      reject(error);
    }
  });
