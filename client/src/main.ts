import { render, html } from "lit";
import { Product, productCollection } from "./firebase/firestore";
import { getDocs, orderBy, query, where, addDoc } from "firebase/firestore";
import { subscribeToUser } from "./firebase/auth";

let userId: string | undefined = undefined;

const userContainer = document.querySelector<HTMLDivElement>(".user-container");
const addProductButton = document.querySelector<HTMLButtonElement>("#add-product-button");
const productForm = document.querySelector(".product-form") as HTMLFormElement;

addProductButton?.addEventListener("click", () => {
  productForm.classList.toggle("hidden");
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formInfo = new FormData(productForm);

  const name = formInfo.get("name");
  if (typeof name != "string") {
    throw new Error("name was not a string");
  }

  const description = formInfo.get("desc");
  if (typeof description != "string") {
    throw new Error("description was not a string");
  }

  const price = formInfo.get("price");
  if (typeof price != "string") {
    throw new Error("price was not a string");
  }

  const quantity = formInfo.get("qty");
  if (typeof quantity != "string") {
    throw new Error("quantity was not a string");
  }

  if (userId == undefined) {
    throw new Error("userId was undefined");
  }

  const product: Product = {
    name,
    description,
    price: parseInt(price),
    qty: parseInt(quantity),
    sellerUid: userId,
  };
  addDoc(productCollection, product);

  productForm.reset();
  updateUserProducts();
});

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
  if (user != null) {
    enableButtons();
  } else {
    disableButtons();
  }
});
function enableButtons() {
  const restrictedButtons = document.querySelectorAll<HTMLButtonElement>(".login-only");
  for (const button of restrictedButtons) {
    button.disabled = false;
  }
}

function disableButtons() {
  const restrictedButtons = document.querySelectorAll<HTMLButtonElement>(".login-only");
  for (const button of restrictedButtons) {
    button.disabled = true;
  }
}
