import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreateAdverts = (name, description, category, phone, date, imageUrl, uid, id) =>
  db.ref('adverts').push({
      name,
      description,
      category,
      phone,
      date,
      imageUrl,
      uid,
      id
  });

export const writeAdvertsId = (id) => {
    db.ref('adverts/' + id).update({
        id
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
};


export const getAdverts = (callback) =>
  db.ref('adverts')
    .orderByKey()
    .limitToLast(100)
    .on('child_added', callback);

