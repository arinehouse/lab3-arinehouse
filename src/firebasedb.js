// import firebase from 'firebase';
//
// // Initialize Firebase
// const config = {
//   apiKey: 'AIzaSyDNV-psCBCMwrhbbrZQNbTuVdO863mQx8g',
//   authDomain: 'react-notes-1b6a4.firebaseapp.com',
//   databaseURL: 'https://react-notes-1b6a4.firebaseio.com',
//   projectId: 'react-notes-1b6a4',
//   storageBucket: 'react-notes-1b6a4.appspot.com',
//   messagingSenderId: '550209967115',
// };
// firebase.initializeApp(config);
//
// // Get a reference to the database service
// const database = firebase.database();
//
// const fetchNotes = () => {
//   database.ref('notes').on('value', (snapshot) => {
//   });
// };
//
// const removeNote = (id) => {
//   firebase.database().ref('notes').child(id).remove();
// };
//
// export { fetchNotes, removeNote };
