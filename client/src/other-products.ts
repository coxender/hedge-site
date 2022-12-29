import { render, html } from "lit";
import { Product, productCollection } from "./firebase/firestore";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { subscribeToUser } from "./firebase/auth";

const otherContainer = document.querySelector<HTMLDivElement>(".other-container");

let unsubscribe: () => void;

subscribeToUser((user) => {
  unsubscribe?.();
  const otherProductsQuery = query(
    productCollection,
    orderBy("sellerUid"),
    where("sellerUid", "!=", user?.uid ?? ""),
    orderBy("price", "desc")
  );
  unsubscribe = onSnapshot(otherProductsQuery, (querySnapshot) => {
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
  });
});
