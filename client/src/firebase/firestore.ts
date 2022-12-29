import { CollectionReference, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { app } from "./app";

const db = getFirestore(app);

export interface Product {
  /** name of product max length 60 characters. */
  name: string;
  /** description of product max length 1000 */
  description: string;
  /** unit price of product, nonegative integer*/
  price: number;
  /** quantity availible of product, nonegative integer */
  qty: number;
  /** Firebase User Uid of the current user */
  sellerUid: string;
}

export const productCollection = collection(db, "products") as CollectionReference<Product>;
