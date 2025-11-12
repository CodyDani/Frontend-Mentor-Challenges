function displayEmptyCart() {
        //Cart Part
    const cartHeading = document.createElement("h2");
    cartHeading.innerHTML = `Your Cart (0)`;
    
    const value = document.createElement("div");
    const valueImg = document.createElement("img");
    valueImg.style.margin = '20px 100px';
    valueImg.src = `assets/images/illustration-empty-cart.svg`;
    
    const paragraph = document.createElement("p");
    paragraph.textContent = 'Your added items will appear here';
    
    cartContainer.appendChild(cartHeading);
    cartContainer.appendChild(value);
    value.appendChild(valueImg);
    value.appendChild(paragraph);
}

function fillCart() {
        let clickNo = 1;
        let newClickNo = parseInt(clickNo)

        var eachOrder = document.createElement("div");
        eachOrder.classList.add("each-order");

        const detailText = document.createElement("div");
        detailText.classList.add("detail-text");

        const removeImg = document.createElement("img");
        removeImg.src = "assets/images/icon-remove-item.svg";

        const orderPara = document.createElement("p");
        orderPara.textContent = order.name

        const quantityPrice = document.createElement("div");
        quantityPrice.classList.add("quantity-price");

        const span1 = document.createElement("span");
        span1.textContent = `${newClickNo}x`;

        const span2 = document.createElement("span");
        span2.textContent = `@$${order.price}`;

        const span3 = document.createElement("span");
        span3.textContent = `$${order.price * newClickNo}`;

        const orderTotal = document.createElement("div");
        orderTotal.classList.add("order-total");

        const totalPara = document.createElement("p");
        totalPara.textContent = "Order Total";

        const totalValue = document.createElement("p");
        totalValue.classList.add("total-value");
        totalValue.textContent = `$${46.00}`;

        cartContainer.appendChild(eachOrder);
        cartContainer.appendChild(orderTotal);
        eachOrder.appendChild(detailText);
        eachOrder.appendChild(removeImg);
        detailText.appendChild(orderPara);
        detailText.appendChild(quantityPrice);
        quantityPrice.appendChild(span1);
        quantityPrice.appendChild(span2);
        quantityPrice.appendChild(span3);
        orderTotal.appendChild(totalPara);
        orderTotal.appendChild(totalValue);

        value.remove()
}




document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if(data) {
            console.log(data)
            renderDesserts(data)
        }
        else {
            document.querySelector(".container").innerHTML = `<p> No data found </p>`
        }
    })
})

const carts = [];

function renderDesserts(orders) {
    const container = document.querySelector('.container');

    const dessertContainer = document.createElement("div");
    dessertContainer.classList.add("dessert-container");

    const headingEL = document.createElement('h1');
    headingEL.textContent = 'Desserts';

    const dessertFlex = document.createElement("div");
    dessertFlex.classList.add("dessert-flex")

    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");
    cartContainer.classList.add("card");

    container.appendChild(dessertContainer);
    container.appendChild(cartContainer);
    dessertContainer.appendChild(headingEL);
    dessertContainer.appendChild(dessertFlex)

    orders.forEach(order => {
            //Desserts part
        const dessertItem = document.createElement("div");
        dessertItem.classList.add("dessert-item");

        const itemImg = document.createElement("div");
        itemImg.classList.add("item-img");

        const img = document.createElement("img");
        img.src = order.image.desktop;

        const button = document.createElement("button");
        button.classList.add("add-cart-btn");
        button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");

        const para1 = document.createElement("p");
        para1.textContent = order.category;

        const para2 = document.createElement("p");
        para2.textContent = order.name;

        const para3 = document.createElement("p");
        para3.textContent = `$${order.price}`;

        dessertFlex.appendChild(dessertItem);
        dessertItem.appendChild(itemImg);
        dessertItem.appendChild(itemInfo);
        itemImg.appendChild(img);
        itemImg.appendChild(button);
        itemInfo.appendChild(para1);
        itemInfo.appendChild(para2);
        itemInfo.appendChild(para3);
        

        button.addEventListener('click', () => {
            if(carts[order.id].includes(order.id)) {
                carts.quantity + 1;
            } else {
                carts.push({order.id, order.name, order.price, quantity:1 })
            }
        })
    });

}



















// how to ASSIGN a generated id to its index position in the array
const originalArray = [
  { name: "Item A", value: 10 },
  { name: "Item B", value: 20 },
  { name: "Item C", value: 30 }
];

// Method 1: Using forEach to modify existing objects
originalArray.forEach((item, index) => {
  item.id = index; // Assign the index as the ID
});

console.log("Array after forEach (modifying existing objects):");
console.log(originalArray);

// Method 2: Using map to create a new array with IDs
const newArrayWithIds = originalArray.map((item, index) => {
  return { ...item, id: index + 1 }; // Assign index + 1 as ID for 1-based indexing
});

console.log("\nNew array created with map (1-based IDs):");
console.log(newArrayWithIds);

// Method 3: Combining with a more complex ID generation
const arrayWithGeneratedIds = originalArray.map((item, index) => {
  const uniqueId = `item-${index}-${Date.now()}`; // Combine index with timestamp for uniqueness
  return { ...item, id: uniqueId };
});

console.log("\nArray with more complex generated IDs:");
console.log(arrayWithGeneratedIds);














// Assuming you already have your desserts JSON loaded
// Example: desserts = [ {name: 'Chocolate Cake', price: 5, image: '...'}, ... ];

const container = document.querySelector('.container');

// Create dessert and cart sections
const dessertContainer = document.createElement('div');
dessertContainer.classList.add('dessert-container');

const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');

// Append in the correct order
container.append(dessertContainer, cartContainer);

// Your cart array
let cart = [];

/* ---------------------------
   1️⃣ Render Dessert List
---------------------------- */
function renderDesserts(desserts) {
  dessertContainer.innerHTML = ''; // clear old items

  desserts.forEach(dessert => {
    const dessertItem = document.createElement('div');
    dessertItem.classList.add('dessert-item');
    dessertItem.dataset.name = dessert.name;

    // Image
    const img = document.createElement('img');
    img.src = dessert.image;
    img.classList.add('dessert-img');

    // Name & price
    const name = document.createElement('h3');
    name.textContent = dessert.name;

    const price = document.createElement('p');
    price.textContent = `$${dessert.price}`;

    // Action area (will toggle)
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('dessert-action');

    // Default button
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add to Cart';
    addBtn.classList.add('add-btn');
    actionDiv.appendChild(addBtn);

    // Append structure
    dessertItem.append(img, name, price, actionDiv);
    dessertContainer.appendChild(dessertItem);

    // --- EVENT LISTENERS ---
    addBtn.addEventListener('click', () => handleAddToCart(dessert));
    img.addEventListener('click', () => showQuantityControl(dessert));
  });
}

/* ---------------------------
   2️⃣ Handle Add to Cart
---------------------------- */
function handleAddToCart(dessert) {
  const itemInCart = cart.find(i => i.name === dessert.name);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({ ...dessert, quantity: 1 });
  }

  updateDessertAction(dessert.name);
  updateCartDisplay();
}

/* ---------------------------
   3️⃣ Update Dessert Action
   (Replace Add Btn with +/-)
---------------------------- */
function updateDessertAction(dessertName) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  const actionDiv = dessertItem.querySelector('.dessert-action');
  actionDiv.innerHTML = ''; // clear previous button

  const controlDiv = document.createElement('div');
  controlDiv.classList.add('quantity-control');

  const decrement = document.createElement('img');
  decrement.src = 'assets/images/icon-decrement.svg';
  decrement.classList.add('decrement');

  const increment = document.createElement('img');
  increment.src = 'assets/images/icon-increment.svg';
  increment.classList.add('increment');

  const quantityValue = document.createElement('span');
  const item = cart.find(i => i.name === dessertName);
  quantityValue.textContent = item ? item.quantity : 1;
  quantityValue.classList.add('quantity-value');

  controlDiv.append(decrement, quantityValue, increment);
  actionDiv.appendChild(controlDiv);

  // Listeners
  increment.addEventListener('click', () => changeQuantity(dessertName, 1));
  decrement.addEventListener('click', () => changeQuantity(dessertName, -1));
}

/* ---------------------------
   4️⃣ Change Quantity
---------------------------- */
function changeQuantity(dessertName, change) {
  const item = cart.find(i => i.name === dessertName);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== dessertName);
    revertToAddButton(dessertName);
  }

  updateDessertQuantityUI(dessertName);
  updateCartDisplay();
}

/* ---------------------------
   5️⃣ Update Dessert Quantity UI
---------------------------- */
function updateDessertQuantityUI(dessertName) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  const quantityValue = dessertItem.querySelector('.quantity-value');
  const item = cart.find(i => i.name === dessertName);
  if (quantityValue && item) {
    quantityValue.textContent = item.quantity;
  }
}

/* ---------------------------
   6️⃣ Revert to Add Button
---------------------------- */
function revertToAddButton(dessertName) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  const actionDiv = dessertItem.querySelector('.dessert-action');
  actionDiv.innerHTML = '';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add to Cart';
  addBtn.classList.add('add-btn');
  actionDiv.appendChild(addBtn);

  const dessert = { name: dessertName }; // find in JSON if needed
  addBtn.addEventListener('click', () => handleAddToCart(dessert));
}

/* ---------------------------
   7️⃣ Show Quantity Control on Image Click
---------------------------- */
function showQuantityControl(dessert) {
  const itemInCart = cart.find(i => i.name === dessert.name);
  if (itemInCart) {
    updateDessertAction(dessert.name);
  } else {
    handleAddToCart(dessert);
  }
}

/* ---------------------------
   8️⃣ Update Cart Display (existing logic, fixed)
---------------------------- */
function updateCartDisplay() {
  cartContainer.innerHTML = "";

  const cartHeading = document.createElement("h2");
  cartHeading.textContent = `Your Cart (${cart.length})`;
  cartContainer.appendChild(cartHeading);

  if (cart.length === 0) {
    const value = document.createElement("div");
    const valueImg = document.createElement("img");
    const paragraph = document.createElement("p");

    value.classList.add("hid");
    valueImg.style.margin = '20px 100px';
    valueImg.src = `assets/images/illustration-empty-cart.svg`;
    paragraph.textContent = 'Your added items will appear here';

    value.append(valueImg, paragraph);
    cartContainer.append(cartHeading, value);
    return;
  }

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  cart.forEach(item => {
    const eachOrder = document.createElement("div");
    eachOrder.classList.add("each-order");

    const detailText = document.createElement("div");
    detailText.classList.add("detail-text");

    const removeImg = document.createElement("img");
    removeImg.src = "assets/images/icon-remove-item.svg";
    removeImg.addEventListener('click', () => changeQuantity(item.name, -item.quantity));

    const orderPara = document.createElement("p");
    orderPara.textContent = item.name;

    const quantityPrice = document.createElement("div");
    quantityPrice.classList.add("quantity-price");

    const span1 = document.createElement("span");
    span1.textContent = `x${item.quantity}`;

    const span2 = document.createElement("span");
    span2.textContent = `@$${item.price}`;

    const span3 = document.createElement("span");
    span3.textContent = `₦${item.price * item.quantity}`;

    detailText.append(orderPara, quantityPrice);
    quantityPrice.append(span1, span2, span3);
    eachOrder.append(detailText, removeImg);
    cartContainer.appendChild(eachOrder);
  });

  // Total once
  const orderTotal = document.createElement("div");
  orderTotal.classList.add("order-total");

  const totalPara = document.createElement("p");
  totalPara.textContent = "Order Total";
  const totalValue = document.createElement("p");
  totalValue.classList.add("total-value");
  totalValue.textContent = `$${totalPrice}`;
  orderTotal.append(totalPara, totalValue);
  cartContainer.appendChild(orderTotal);
}

/* ---------------------------
   9️⃣ Start App (example)
---------------------------- */
fetch('data.json')
  .then(res => res.json())
  .then(data => renderDesserts(data));
