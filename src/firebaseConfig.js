import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, runTransaction, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQ0sleHQM9IQiR7TfKS86PmSpK-QJHC9w",
  authDomain: "pract-project-44b40.firebaseapp.com",
  projectId: "pract-project-44b40",
  storageBucket: "pract-project-44b40.appspot.com",
  messagingSenderId: "1089065586227",
  appId: "1:1089065586227:web:51e43dd69191f63a261d46",
  measurementId: "G-M87PVB60YX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth, ref, onValue };

export function addNewPost(title, mainDescription, secondaryDescription) {

  set(ref(database, `posts/${postId}`), {
    likes: 0,
    title,
    mainDescription,
    secondaryDescription
  });
}

const newPostRef = ref(database, 'posts'); 
const newPost = push(newPostRef);
const postId = newPost.key; 


export function toggleLike(postId) {
  const postLikesRef = ref(database, `posts/${postId}/likes`);

  runTransaction(postLikesRef, (currentLikes) => {
    return currentLikes ? currentLikes - 1 : 1; 
  }).then(() => {
    console.log('like toggled post ID:', postId);
  }).catch((error) => {
    console.error('u suck:', postId, error);
  });
}