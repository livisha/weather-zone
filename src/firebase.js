import firebase from 'firebase';

// Firebase library imported for the use of firebase functions to connect through firebase cloud and perform the functionality.
// Firebase project is initialized by creating account on firebase.com than starting a web project 
// after successfully creating the project and information about the project i.e. 
// the apikey, ID is given by the firebase to connect the project with the project cloud.
const firebaseConfig = {
  apiKey: "AIzaSyAkHhuNNsCRWArWh4zCrfjgg79TFpQnQs4",
  authDomain: "project-1cc06.firebaseapp.com",
  projectId: "project-1cc06",
  storageBucket: "project-1cc06.appspot.com",
  messagingSenderId: "336526294869",
  appId: "1:336526294869:web:694d33bec7ce8bebd0f9dc"
};

// Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);

// Exported as fire
