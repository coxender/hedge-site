import { render, html } from "lit";

export interface Products {
  name: string;
  description: string;
  price: number;
  qty: number;
  sellerUID: string;
}

const products: Products[] = [
  {
    name: "Joe's Product",
    description: "lorem ipsum",
    price: 30.0,
    qty: 2,
    sellerUID: "saidygaiasydd",
  },
  {
    name: "Toy 1",
    description: "this is a toy",
    price: 0.3,
    qty: 30,
    sellerUID: "saidygaiasyd",
  },
  {
    name: "Toy 2",
    description: "this is a toy",
    price: 0.3,
    qty: 30,
    sellerUID: "saidygaiasyd",
  },
  {
    name: "Toy 3",
    description: "this is a toy",
    price: 0.3,
    qty: 30,
    sellerUID: "saidygaiasyd",
  },
];

const salesContainer = document.querySelector<HTMLDivElement>(".sales-container");
if (salesContainer == null) {
  throw new Error("sales-container does not exist.");
}

const template = products.map(
  (product) => html` <div class="sales-card">
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
  </div>`
);

render(template, salesContainer);
// TODO the same thing with buy but omit Offers
