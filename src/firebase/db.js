import { db } from './firebase';

// User API

export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const create = (name, description, category, phone, date, imageUrl, uid, id, gender,age , city) =>
  db.ref('adverts').push({
      name,
      description,
      category,
      phone,
      date,
      imageUrl,
      uid,
      id,
      gender,
      age,
      city,
  });

export const writeAdvertsId = (id) => {
    db.ref('adverts/' + id).update({
        id
    })
};


export const list = (callback) =>
  db.ref('adverts')
    .orderByKey()
    .limitToLast(100)
    .on('child_added', callback);

export const get = (id) => (callback) =>
    db.ref('adverts/' + id)
        .on('value', callback);

export const getGender = (callback) =>
    db.ref('cinsiyet')
        .on('child_added', callback);

export const getCities = (callback) =>
    db.ref('sehirler')
        .once('value').then(callback);

export const getCategory = (callback) =>
    db.ref('adverts')
        .once('value').then(callback);

export const getYas = (callback) =>
    db.ref('yas')
        .once('value').then(callback);
