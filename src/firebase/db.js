import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreateAdverts = (name, description, category, phone, date, storagePath, uid) =>
  db.ref('adverts').push({
      name,
      description,
      category,
      phone,
      date,
      storagePath,
      uid
  });

export const getAdverts = (callback) =>
  db.ref('adverts')
    .orderByKey()
    .limitToLast(100)
    .on('child_added', callback);

