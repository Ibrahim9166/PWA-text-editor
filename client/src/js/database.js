import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  const dbPromise = initdb();

  // Function to add content to the database
  export const putDb = async (content) => {
    const db = await dbPromise;
    const transaction = db.transaction('jate', 'readwrite');
    const obStore = transaction.objectStore('jate');
  
    const count = await obStore.get('counter') || 0;
    const newCount = count + 1;
  
    await obStore.put(newCount, 'counter'); // Update the counter
    const result = await obStore.put({ id: newCount, value: content });
  
    await transaction.done;
    return result;
  };
  
  // Function to get all content from the database
  export const getDb = async () => {
    const db = await dbPromise;
    const transaction = db.transaction('jate', 'readonly');
    const obStore = transaction.objectStore('jate');
    const result = await obStore.getAll();
    await transaction.done;
    return result;
  };

initdb();
