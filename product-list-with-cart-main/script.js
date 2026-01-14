let desserts = [];
let cart = loadCart();
const container = document.querySelector('.container');
const modalHouse = document.querySelector('.modal-house');

const dessertContainer = document.createElement("div");
dessertContainer.classList.add("dessert-container");

const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-container");
cartContainer.classList.add("card");

container.append(dessertContainer, cartContainer);

function loadDesserts() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((dessert, index) => {
        dessert.id = index;
        desserts.push(dessert);
        });
        renderDesserts(desserts);
        resetAllDessertActions();
        updateCartDisplay();
    })
}

function renderDesserts(desserts) {
  dessertContainer.innerHTML = '';

    const headingEL = document.createElement('h1');
    headingEL.textContent = 'Desserts';

    const dessertFlex = document.createElement("div");
    dessertFlex.classList.add("dessert-flex")

    dessertContainer.append(headingEL, dessertFlex);

    desserts.forEach(dessert => {
            //Desserts part
        const dessertItem = document.createElement("div");
        dessertItem.classList.add("dessert-item");
        dessertItem.dataset.name = dessert.name;

        const actionDiv = document.createElement('div');
        actionDiv.classList.add('dessert-action');

        const img = document.createElement("img");
        img.src = getResponsiveImage(dessert.image)
        img.dataset.name = dessert.image.desktop;

        const button = document.createElement("button");
        button.classList.add("add-cart-btn");
        button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`;

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");

        const para1 = document.createElement("p");
        para1.textContent = dessert.category;

        const para2 = document.createElement("p");
        para2.textContent = dessert.name;

        const para3 = document.createElement("p");
        para3.textContent = `$${parseFloat(dessert.price.toFixed(2))}`; 

            // Append structure
        dessertFlex.appendChild(dessertItem);
        dessertItem.append(actionDiv, itemInfo);
        actionDiv.append(img, button);
        itemInfo.append(para1, para2, para3);


    // EVENT LISTENERS
    button.addEventListener('click', () => {
      resetAllDessertActionsExcept(dessert.name);
      handleAddToCart(dessert)
    });
    img.addEventListener('click', () => {
      resetAllDessertActions()
      showQuantityControl(dessert)
    });
  });
}

function handleAddToCart(dessert) {
  const itemInCart = cart.find(i => i.name === dessert.name);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    // cart.push({ ...dessert, quantity: 1 });
    cart.push({
            id: dessert.id,
            name: dessert.name,
            price: parseFloat(dessert.price.toFixed(2)),
            image: dessert.image,
            quantity: 1
            })
  }

  saveCart()
  updateDessertAction(dessert.name, dessert.image);
  updateCartDisplay();
}

function updateDessertAction(dessertName, dessertImage) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  const actionDiv = dessertItem.querySelector('.dessert-action');
  actionDiv.innerHTML = '';

  const controlDiv = document.createElement('div');
  controlDiv.classList.add('quantity-control');
  controlDiv.classList.add('add-cart-btn')

    const img = document.createElement("img");
    img.src = getResponsiveImage(dessertImage);

  const decrement = document.createElement('img');
  decrement.src = 'assets/images/icon-decrement-quantity.svg';
  decrement.classList.add('decrement');

  const increment = document.createElement('img');
  increment.src = 'assets/images/icon-increment-quantity.svg';
  increment.classList.add('increment');

  const quantityValue = document.createElement('span');
  const item = cart.find(i => i.name === dessertName);
  quantityValue.textContent = item ? item.quantity : 1;
  quantityValue.classList.add('quantity-value');

  controlDiv.append(decrement, quantityValue, increment);
  actionDiv.append(img, controlDiv);

   highlightSelectedImage(dessertName)

  increment.addEventListener('click', () => changeQuantity(dessertName, 1));
  decrement.addEventListener('click', () => changeQuantity(dessertName, -1));
}

function changeQuantity(dessertName, change) {
  const item = cart.find(i => i.name === dessertName);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== dessertName);
    revertToAddButton(dessertName);
  }

  saveCart()
  updateDessertQuantityUI(dessertName);
  updateCartDisplay();
}

function updateDessertQuantityUI(dessertName) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  const quantityValue = dessertItem.querySelector('.quantity-value');
  const item = cart.find(i => i.name === dessertName);
  if (quantityValue && item) {
    quantityValue.textContent = item.quantity;
  }
}

function revertToAddButton(dessertName) {
  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  if (!dessertItem) return;

  const actionDiv = dessertItem.querySelector('.dessert-action');
  actionDiv.innerHTML = '';

  const dessert = desserts.find(d => d.name === dessertName);
  if (!dessert) return;

  const img = document.createElement('img');
  img.src = getResponsiveImage(dessert.image);
  img.dataset.name = dessert.image.desktop;

  const button = document.createElement('button');
  button.classList.add('add-cart-btn');
  button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`;

  actionDiv.append(img, button);

  button.addEventListener('click', () => handleAddToCart(dessert));
  img.addEventListener('click', () => showQuantityControl(dessert));
}

function showQuantityControl(dessert) {
  const itemInCart = cart.find(i => i.name === dessert.name);

  if (itemInCart) {
    updateDessertAction(dessert.name, dessert.image);
  } else {
    return
    // handleAddToCart(dessert);
  }
}

function resetAllDessertActions() {
  const dessertItems = document.querySelectorAll('.dessert-item');

  dessertItems.forEach(item => {
    const name = item.dataset.name;
    const dessertObj = desserts.find(d => d.name === name);
    if (!dessertObj) return;

    const actionDiv = item.querySelector('.dessert-action');
    actionDiv.innerHTML = '';

    const img = document.createElement('img');
    img.src = getResponsiveImage(dessertObj.image);
    img.alt = dessertObj.name;
    img.dataset.name = dessertObj.image.desktop;

    const button = document.createElement('button');
    button.classList.add('add-cart-btn');
    button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`;

    actionDiv.append(img, button);

    img.addEventListener('click', () => {
      resetAllDessertActions();
      showQuantityControl(dessertObj);
    });

    button.addEventListener('click', () => {
      resetAllDessertActions();
      handleAddToCart(dessertObj)
    });
  });
}

function resetAllDessertActionsExcept(currentDessertName) {
  const dessertItems = document.querySelector('.dessert-items');

  dessertItems.forEach(item => {
    if(item.dataset.name === currentDessertName) {
      return
    }
    resetAllDessertActions()
  })
}

function resetDessertItemsUI() {
  const dessertItems = document.querySelectorAll(".dessert-item");

  dessertItems.forEach(item => {
    const dessertName = item.dataset.name;
    const dessert = desserts.find(d => d.name === dessertName);
    if (!dessert) return;

    const actionDiv = item.querySelector(".dessert-action");
    actionDiv.innerHTML = '';

    const img = document.createElement("img");
    img.src = dessert.image.desktop;
    img.dataset.name = dessert.image.desktop;

    const button = document.createElement("button");
    button.classList.add("add-cart-btn");
    button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`;

    actionDiv.append(img, button);

    button.addEventListener('click', () => handleAddToCart(dessert));
    img.addEventListener('click', () => showQuantityControl(dessert));
  });
}

function updateCartDisplay() {
  cartContainer.innerHTML = "";

  const cartHeading = document.createElement("h2");
  cartHeading.textContent = `Your Cart (${cart.length})`;
  cartContainer.appendChild(cartHeading);

  if (cart.length === 0) {
    const value = document.createElement("div");
    const valueImg = document.createElement("img");
    const paragraph = document.createElement("p");

    valueImg.style.margin = '20px 100px';
    valueImg.src = `assets/images/illustration-empty-cart.svg`;
    paragraph.textContent = 'Your added items will appear here';

    cartContainer.appendChild(value);
    value.append(valueImg, paragraph);
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
    span3.textContent = `$${item.price * item.quantity}`;

    cartContainer.appendChild(eachOrder);
    eachOrder.append(detailText, removeImg);
    detailText.append(orderPara, quantityPrice);
    quantityPrice.append(span1, span2, span3);
  });

  // Total 
  const orderTotal = document.createElement("div");
  orderTotal.classList.add("order-total");

  const totalPara = document.createElement("p");
  totalPara.textContent = "Order Total";

  const totalValue = document.createElement("p");
  totalValue.classList.add("total-value");
  totalValue.textContent = `$${totalPrice}`;

  cartContainer.appendChild(orderTotal);
  orderTotal.append(totalPara, totalValue);

      //Delivery type
    const deliveryType = document.createElement("div");
    deliveryType.classList.add("delivery-type");

    const deliveryTypeImg = document.createElement("img");
    deliveryTypeImg.src = "assets/images/icon-carbon-neutral.svg";

    const deliveryTypePara = document.createElement("p");
    deliveryTypePara.innerHTML = `<p>This is a <span> carbon-neutral</span> delivery </p>`

    cartContainer.appendChild(deliveryType)
    deliveryType.append(deliveryTypeImg, deliveryTypePara)

        //Confirm Button
    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("confirm-btn");
    confirmBtn.textContent = "Confirm Order";
    confirmBtn.addEventListener('click', showOrderConfirmed);

    cartContainer.appendChild(confirmBtn);

}

function showOrderConfirmed() {
  const modal = document.createElement("div");
  modal.classList.add('modal')

  const orderConfirmationModal = document.createElement("div");
  orderConfirmationModal.classList.add("order-confirmation-modal", "card");

  const logo = document.createElement("img");
  logo.src = "assets/images/icon-order-confirmed.svg";

  const confirmationHeading = document.createElement("h1");
  confirmationHeading.textContent = "Order Confirmed";

  const confirmationPara = document.createElement("p");
  confirmationPara.textContent = "We hope you enjoy your food!";

  const allOrders = document.createElement("div");
  allOrders.classList.add("all-orders");

  cart.forEach(item => {

      const eachOrder = document.createElement("div");
      eachOrder.classList.add("each-order");
    
      const orderDetails = document.createElement("div");
      orderDetails.classList.add("order-details");
    
      const confirmationTotalPrice = document.createElement("div");
      confirmationTotalPrice.classList.add("total-price");
      confirmationTotalPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    
      const orderThumbnail = document.createElement("div");
      orderThumbnail.classList.add("order-thumbnail");
    
      const detailText = document.createElement("div");
      detailText.classList.add("detail-text");
    
      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = `${item.image.thumbnail}`;
    
      const thumbnailPara = document.createElement("p");
      thumbnailPara.textContent = `${item.name}`;
    
      const confirmedQuantityPrice = document.createElement("div");
      confirmedQuantityPrice.classList.add("quantity-price");
    
      const confirmSpan1 = document.createElement("span");
      confirmSpan1.textContent = `x${item.quantity}`;
    
      const confirmSpan2 = document.createElement("span");
      confirmSpan2.textContent = `$${item.price}`;

      confirmedQuantityPrice.append(confirmSpan1, confirmSpan2);
      detailText.append(thumbnailPara, confirmedQuantityPrice);
      orderThumbnail.appendChild(thumbnailImage);
      orderDetails.append(orderThumbnail, detailText);
      eachOrder.append(orderDetails, confirmationTotalPrice);
      allOrders.appendChild(eachOrder);
  })

            // Total 
        const orderTotal = document.createElement("div");
        orderTotal.classList.add("order-total");

        const totalPara = document.createElement("p");
        totalPara.textContent = "Order Total";

        const totalValue = document.createElement("p");
        totalValue.classList.add("total-value");
        const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        totalValue.textContent = `$${totalPrice.toFixed(2)}`;

        orderTotal.append(totalPara, totalValue);
        allOrders.appendChild(orderTotal)


            // Start New Order button
        const newOrderBtn = document.createElement("button");
        newOrderBtn.classList.add("confirm-btn");
        newOrderBtn.textContent = "Start New Order";
        newOrderBtn.addEventListener("click", () => {
            cart = [];
            saveCart()
            updateCartDisplay();
            resetAllDessertActions();
            highlightSelectedImage();
            modal.remove();
            
        });
        
  orderConfirmationModal.append(logo, confirmationHeading, confirmationPara, allOrders, newOrderBtn);
  modal.appendChild(orderConfirmationModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
    });
  modalHouse.appendChild(modal);
}

function getResponsiveImage(images) {
  const width = window.innerWidth;

  if(width <= 767) {
    return images.mobile;
  } else if(width <= 1023) {
    return images.tablet;
  } else {
    return images.desktop;
  }
}

function updateDessertImages() {
  const dessertItems = document.querySelectorAll('.dessert-item');

  dessertItems.forEach((item) => {
    const name = item.dataset.name;
    const dessertObj = desserts.find(d => d.name === name);
    if (!dessertObj) return;

    const actionImg = item.querySelector('.dessert-action img');
    if (actionImg) {
      actionImg.src = getResponsiveImage(dessertObj.image);
    }
  });
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
  const storedItem = localStorage.getItem("cart");
  if(storedItem) {
    return JSON.parse(storedItem)
  }
  return []
}

function highlightSelectedImage(dessertName) {
  document.querySelectorAll('.dessert-action img:first-child').forEach(img => {
    img.classList.remove('selected-img');
  });

  const dessertItem = document.querySelector(`[data-name="${dessertName}"]`);
  if (!dessertItem) return;

  const img = dessertItem.querySelector('.dessert-action img:first-child');
  if (img) img.classList.add('selected-img');
}


window.addEventListener("resize", updateDessertImages);

window.addEventListener("DOMContentLoaded", () => {
  loadDesserts();
});