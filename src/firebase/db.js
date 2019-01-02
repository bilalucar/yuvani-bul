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

export const updateProfile = (id, data) => {
    data.phone = data.phone ? data.phone : null;
    data.password = data.password ? data.password : null;
    data.city = data.city ? data.city : null;
    data.name = data.name ? data.name : null;
    data.profilePicture = data.profilePicture ? data.profilePicture : null;
    const { phone,
        password,
        email,
        username,
        city,
        name,
        profilePicture} = data;
    db.ref('users/' + id).update({
        phone,
        password,
        email,
        username,
        city,
        name,
        profilePicture
    })
};

export const deleteAdvert = (id) =>{
    db.ref('adverts/' + id).remove();
};

export const list = (callback) =>
  db.ref('adverts')
    .once('value').then(callback);

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

export const getProfile = (id) => (callback) =>
    db.ref('users/' + id)
        .once('value').then(callback);