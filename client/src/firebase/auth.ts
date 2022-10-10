import { getAuth, signInWithPopup, deleteUser, User, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

export function signInGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
  return auth.signOut();
}

export function deleteAccount() {
  if (auth.currentUser == null) {
    throw new Error("No user is signed in.");
  }
  return deleteUser(auth.currentUser);
}

export function subscribeToUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
