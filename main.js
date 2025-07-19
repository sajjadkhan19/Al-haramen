document.addEventListener("DOMContentLoaded", () => {

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // 🛒 Add to Cart Buttons
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      let name = btn.dataset.name;
      let price = parseFloat(btn.dataset.price);
      let cart = getCart();
      let exist = cart.find(item => item.name === name);

      if (exist) {
        exist.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCart(cart);
      alert(`${name} added to cart`);
    });
  });

  // 🧾 Display Cart
  let tbody = document.getElementById("cart-items");
  let totalDisplay = document.getElementById("total");
  
  if (tbody) {
    let cart = getCart();
    let total = 0;
    let summary = []; 
      tbody.innerHTML = "";

    cart.forEach(item => {
      const subtotal = item.qty * item.price;
      total += subtotal;
      summary.push(`${item.name} (${item.qty}) - PKR ${subtotal}`);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>PKR ${item.price}</td>
        <td>PKR ${subtotal}</td>
      `;
      tbody.appendChild(row);
    });

    totalDisplay.textContent =  `Total: PKR ${total}`;

    // Set cart summary for form
    const cartInput = document.getElementById("cartSummary");
    if (cartInput) cartInput.value = summary.join(", ");
  }

  // 🧹 Clear Cart
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });
  }

});
