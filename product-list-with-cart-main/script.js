const desserts = [];
const cart = [];
const container = document.querySelector('.container');

const dessertContainer = document.createElement("div");
dessertContainer.classList.add("dessert-container");

const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-container");
cartContainer.classList.add("card");

container.appendChild(dessertContainer);
container.appendChild(cartContainer)

function loadDesserts() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        desserts.push(data)
        desserts.forEach((dessert, index) => {
            dessert.id = index
            renderDessertCard(dessert)
        })
    })
}

function renderDessertCard(desserts) {
    const headingEL = document.createElement('h1');
    headingEL.textContent = 'Desserts';

    const dessertFlex = document.createElement("div");
    dessertFlex.classList.add("dessert-flex")

    dessertContainer.appendChild(headingEL);
    dessertContainer.appendChild(dessertFlex);

    desserts.forEach(dessert => {
            //Desserts part
        const dessertItem = document.createElement("div");
        dessertItem.classList.add("dessert-item");

        const itemImg = document.createElement("div");
        itemImg.classList.add("item-img");

        const img = document.createElement("img");
        img.src = dessert.image.desktop;

        const button = document.createElement("button");
        button.classList.add("add-cart-btn");
        button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg"> Add to Cart`

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");

        const para1 = document.createElement("p");
        para1.textContent = dessert.category;

        const para2 = document.createElement("p");
        para2.textContent = dessert.name;

        const para3 = document.createElement("p");
        para3.textContent = `$${dessert.price.toFixed(2)}`;

        dessertFlex.appendChild(dessertItem);
        dessertItem.appendChild(itemImg);
        dessertItem.appendChild(itemInfo);
        itemImg.appendChild(img);
        itemImg.appendChild(button);
        itemInfo.appendChild(para1);
        itemInfo.appendChild(para2);
        itemInfo.appendChild(para3);

        button.addEventListener('click', () => {
            addToCart(dessert);
            showquantity();
        })

        itemImg.addEventListener('', (e) => {
            showquantity()
        })
    });
}

    function addToCart(dessert) {
        const existingItem = cart.find(item => item.id === dessert.id);

        if (!existingItem) {
            cart.push({
            id: dessert.id,
            name: dessert.name,
            price: dessert.price.toFixed(2),
            image: dessert.image,
            quantity: 1
            });
        } else {
            existingItem.quantity += 1;
        }

        updateCartDisplay()
    }

function updateCartDisplay() {
    cartContainer.innerHTML = "";

    const cartHeading = document.createElement("h2");
    cartHeading.textContent = `Your Cart (${cart.length})`;
    cartContainer.appendChild(cartHeading)


            //Empty cart display
  if(cart.length === 0) {
        const value = document.createElement("div");
        const valueImg = document.createElement("img");
        const paragraph = document.createElement("p");

        valueImg.style.margin = '20px 100px';
        valueImg.src = `assets/images/illustration-empty-cart.svg`;
        paragraph.textContent = 'Your added items will appear here';

        cartContainer.append(value);
        value.append(valueImg, paragraph);
        return;
  }

            //Filled Cart display
        let totalPrice = 0;
  cart.forEach(item => {
      totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const eachOrder = document.createElement("div");
        eachOrder.classList.add("each-order");

        const detailText = document.createElement("div");
        detailText.classList.add("detail-text");

        const removeImg = document.createElement("img");
        removeImg.src = "assets/images/icon-remove-item.svg";

        const orderPara = document.createElement("p");
        orderPara.textContent = item.name

        const quantityPrice = document.createElement("div");
        quantityPrice.classList.add("quantity-price");

        const span1 = document.createElement("span");
        span1.textContent = `x${item.quantity}`;

        const span2 = document.createElement("span");
        span2.textContent = `@$${parseFloat(item.price)}`;

        const span3 = document.createElement("span");
        span3.textContent = `₦${item.price * item.quantity}`;

        container.appendChild(cartContainer);
        cartContainer.append(eachOrder);
        eachOrder.append(detailText, removeImg);
        detailText.append(orderPara, quantityPrice);
        quantityPrice.append(span1, span2, span3);
    });
    
            //Total price of cart
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

        cartContainer.appendChild(confirmBtn);


}

function showquantity() {

}

window.addEventListener("DOMContentLoaded", () => {
  loadDesserts();
  updateCartDisplay();
});
