import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDNV-psCBCMwrhbbrZQNbTuVdO863mQx8g',
  authDomain: 'react-notes-1b6a4.firebaseapp.com',
  databaseURL: 'https://react-notes-1b6a4.firebaseio.com',
  projectId: 'react-notes-1b6a4',
  storageBucket: 'react-notes-1b6a4.appspot.com',
  messagingSenderId: '550209967115',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

const fetchNotes = (callback) => {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
};

const createNote = (title) => {
  const newNoteKey = database.ref('notes').push().key;
  database.ref('notes').child(newNoteKey).set({
    title,
    content: '',
    x: Math.floor(Math.random() * (600 - 50)) + 50,
    y: Math.floor(Math.random() * (300 - 50)) + 50,
  });
};

const removeNote = (id) => {
  database.ref('notes').child(id).remove();
};

const dragNote = (id, pos) => {
  database.ref('notes').child(id).update({
    x: pos.x,
    y: pos.y,
  });
};

const editNote = (id, change) => {
  database.ref('notes').child(id).update({
    title: change[0],
    content: change[1],
  });
};

export { fetchNotes, createNote, removeNote, dragNote, editNote };
