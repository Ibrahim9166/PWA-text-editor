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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
const db = await openDB('jate', 1);

const transaction = db.transaction('jate', 'readwrite');
const obStore = transaction.objectStore('jate');

//return 0 if empty
const count = (await obStore.get('counter')) || 0;
count++
const result = await obStore.put({ id: count, value: content });

await transaction.done;

return result;


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');
const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  const result = await obStore.getAll();

  await transaction.done;

  return result.value;
}

initdb();
