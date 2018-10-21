import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyBfN17jHOnCYfU73K8fckr5XoSUexSJntQ",
    authDomain: "yuvani-bul.firebaseapp.com",
    databaseURL: "https://yuvani-bul.firebaseio.com",
    projectId: "yuvani-bul",
    storageBucket: "yuvani-bul.appspot.com",
    messagingSenderId: "791726684169"
};

const devConfig = {
    apiKey: "AIzaSyBfN17jHOnCYfU73K8fckr5XoSUexSJntQ",
    authDomain: "yuvani-bul.firebaseapp.com",
    databaseURL: "https://yuvani-bul.firebaseio.com",
    projectId: "yuvani-bul",
    storageBucket: "yuvani-bul.appspot.com",
    messagingSenderId: "791726684169"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};
