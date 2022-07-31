import { initializeApp } from "firebase/app";
import { CollectionReference, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlCorjwKWeIT27bfClJljDGLVv__9PaRw",
  authDomain: "hedge-site.firebaseapp.com",
  projectId: "hedge-site",
  storageBucket: "hedge-site.appspot.com",
  messagingSenderId: "662700376854",
  appId: "1:662700376854:web:83529af948da8555dcc637",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export interface Product {
  name: string;
  description: string;
  price: number;
  qty: number;
  sellerUid: string;
}

export const productCollection = collection(db, "products") as CollectionReference<Product>;
