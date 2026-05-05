const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout");

// DATA PRODUK (minimal 5)
const products = [
  { id: 1, name: "Produk 1", price: 10000, img: "https://picsum.photos/200?1" },
  { id: 2, name: "Produk 2", price: 15000, img: "https://picsum.photos/200?2" },
  { id: 3, name: "Produk 3", price: 20000, img: "https://picsum.photos/200?3" },
  { id: 4, name: "Produk 4", price: 25000, img: "https://picsum.photos/200?4" },
  { id: 5, name: "Produk 5", price: 30000, img: "https://picsum.photos/200?5" }
];

// STATE KERANJANG
let cart = [];

// RENDER PRODUK
function renderProducts() {
  productList.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>Rp ${p.price}</p>
      <button data-id="${p.id}">Tambah ke Keranjang</button>
    </div>
  `).join("");
}

// TAMBAH KE CART
function addToCart(id) {
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

// RENDER CART
function renderCart() {
  cartList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <strong>${item.name}</strong><br>
      Rp ${item.price} x ${item.qty}
      <div>
        <button data-action="minus" data-id="${item.id}">-</button>
        <button data-action="plus" data-id="${item.id}">+</button>
        <button data-action="remove" data-id="${item.id}">Hapus</button>
      </div>
    </div>
  `).join("");

  updateTotal();
}

// UPDATE TOTAL
function updateTotal() {
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;
  });

  totalEl.textContent = `Total: Rp ${total}`;
  cartCount.textContent = count;
}

// EVENT: TAMBAH PRODUK
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// EVENT: CART (delegation)
cartList.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  const action = e.target.dataset.action;

  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (action === "plus") item.qty++;
  if (action === "minus") item.qty--;

  if (action === "remove" || item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  renderCart();
});

// CHECKOUT
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let summary = "Ringkasan Order:\n";

  cart.forEach(item => {
    summary += `${item.name} x ${item.qty}\n`;
  });

  summary += totalEl.textContent;

  alert(summary);

  cart = [];
  renderCart();
});

// INIT
renderProducts();