import { render, html } from "lit";
import { Product, productCollection } from "./firebase";
import { getDocs } from "firebase/firestore";

const salesContainer = document.querySelector<HTMLDivElement>(".sales-container");

async function updateProducts() {
  const querySnapshot = await getDocs(productCollection);

  const template = querySnapshot.docs.map((doc) => {
    const product: Product = doc.data();

    return html`<div class="sales-card">
      <div class="sales-card-header">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <span>Qty: ${product.qty}</span>
        <span>Offers: 1</span>
      </div>
      <div class="sales-card-body">
        <span> Description:</span>
        <div>${product.description}</div>
      </div>
    </div>`;
  });

  if (salesContainer == null) {
    throw new Error("sales-container does not exist.");
  }
  render(template, salesContainer);
}

const purchaseContainer = document.querySelector<HTMLDivElement>(".purchase-container");
async function updatePurchases() {
  const querySnapshot = await getDocs(productCollection);
  const template = querySnapshot.docs.map((doc) => {
    const product: Product = doc.data();
    return html`<div class="purchase-card">
      <div class="purchase-card-header">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <span>Qty: ${product.qty}</span>
        <span>Seller: ${product.sellerUID}</span>
      </div>
      <div class="purchase-card-body">
        <span> Description:</span>
        <div>${product.description}</div>
      </div>
    </div>`;
  });

  if (purchaseContainer == null) {
    throw new Error("sales-container does not exist.");
  }

  render(template, purchaseContainer);
}
await updateProducts();
await updatePurchases();
//need to do filter for your id vs others\
// need to get username from uid
