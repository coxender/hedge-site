import { render, html } from "lit";
import { Product, productCollection } from "./firebase/firestore";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { subscribeToUser } from "./firebase/auth";

let userId: string | undefined = undefined;

const userContainer = document.querySelector<HTMLDivElement>(".user-container");

async function updateUserProducts() {
  const userProductQuery = query(productCollection, where("sellerUid", "==", userId ?? ""), orderBy("price", "desc"));
  const querySnapshot = await getDocs(userProductQuery);

  const template = querySnapshot.docs.map((doc) => {
    const product: Product = doc.data();

    return html`<div class="user-card">
      <div class="user-card-header">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <span>Qty: ${product.qty}</span>
        <span>Offers: 1</span>
      </div>
      <div class="user-card-body">
        <span> Description:</span>
        <div>${product.description}</div>
      </div>
    </div>`;
  });

  if (userContainer == null) {
    throw new Error("user-container does not exist.");
  }
  render(template, userContainer);
}

const otherContainer = document.querySelector<HTMLDivElement>(".other-container");

async function updateOtherProducts() {
  const otherProductsQuery = query(
    productCollection,
    orderBy("sellerUid"),
    where("sellerUid", "!=", userId ?? ""),
    orderBy("price", "desc")
  );
  const querySnapshot = await getDocs(otherProductsQuery);
  const template = querySnapshot.docs.map((doc) => {
    const product: Product = doc.data();

    return html`<div class="other-card">
      <div class="other-card-header">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <span>Qty: ${product.qty}</span>
        <span>Seller: ${product.sellerUid}</span>
      </div>
      <div class="other-card-body">
        <span> Description:</span>
        <div>${product.description}</div>
      </div>
    </div>`;
  });

  if (otherContainer == null) {
    throw new Error("user-container does not exist.");
  }

  render(template, otherContainer);
}

subscribeToUser((user) => {
  userId = user?.uid;
  updateUserProducts();
  updateOtherProducts();
});

// TODO need to do filter for your id vs others\
// TODO need to get username from uid
