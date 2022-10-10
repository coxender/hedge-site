import { CollectionReference, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { app } from "./app";

const db = getFirestore(app);

export interface Product {
  name: string;
  description: string;
  price: number;
  qty: number;
  sellerUid: string;
}

export const productCollection = collection(db, "products") as CollectionReference<Product>;
