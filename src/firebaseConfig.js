import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, get, set } from "firebase/database";
import { increment } from "firebase/database"

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
  const postsRef = ref(database, 'posts');
  const newPostRef = push(postsRef);
  const postId = newPostRef.key;

  set(ref(database, `posts/${postId}`), {
    likes: 0,
    title,
    mainDescription,
    secondaryDescription
  });
}

export function getCurrentUserId() {
  const user = auth.currentUser;
  return user ? user.uid : null;
}

export async function toggleLike(postId) {
  const userId = getCurrentUserId();

  if (!userId) {
    console.error('User not authenticated');
    return;
  }

  const postLikesRef = ref(database, `posts/${postId}/likes`);
  const userLikesRef = ref(database, `users/${userId}/likes/${postId}`);

  try {
    const postLikesSnapshot = await get(postLikesRef);
    const userLiked = await get(userLikesRef);

    const postLikes = postLikesSnapshot.val() || 0;

    if (userLiked.val()) {
      await set(postLikesRef, postLikes - 1);
      await set(userLikesRef, null); 
    } else {
      await set(postLikesRef, postLikes + 1);
      await set(userLikesRef, true);
    }

    console.log('Like toggled, post ID:', postId, 'for User ID:', userId);
  } catch (error) {
    console.error('Error toggling like, post ID:', postId, 'for User ID:', userId, error);
  }
}

export function getLikedPosts() {
  const userId = getCurrentUserId();

  if (!userId) {
    console.error('User not authenticated');
    return null;
  }

  const userLikesRef = ref(database, `users/${userId}/likes`);
  return onValue(userLikesRef);
}

export function likeCheck(postId) {
  const postLikesRef = ref(database, `posts/${postId}/likes`);

  return new Promise((resolve) => {
    onValue(postLikesRef, (snapshot) => {
      const currentLikes = snapshot.val();
      const isLiked = currentLikes > 0;
      resolve(isLiked);
    });
  });
}