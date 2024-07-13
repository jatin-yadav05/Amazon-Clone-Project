import { orders } from "../data/orders.js";
import { formatCurrency } from "./utility/money.js";
import { loadProductsfetch, loadProducts, products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { calculateDate } from "./utility/dateStr.js";



// console.log(products);
let orderDetailsHTML = '';

// function fullOrderPage(){

// }

function renderOrderPage() {

    orders.forEach((orderElement) => {
        let orderDate = calculateDate(orderElement.orderTime);
        console.log(orderElement);
        orderDetailsHTML +=
            `
        <div class="order-container">
        <div class="order-header">
        <div class="order-header-left-section">
        <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${orderDate}</div>
        </div>
        <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatCurrency(orderElement.totalCostCents)}</div>
        </div>
        </div>
        
        <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${orderElement.id}</div>
        </div>
        </div>
          <div data-order-id="${orderElement.id}" class="order-details-grid js-order-details-grid">
          ${renderOrderDetails(orderElement, orderElement.id)}
          </div>
        </div>
          `;
    });
    const orderContainer = document.querySelector('.js-order-grid');
    orderContainer.innerHTML = orderDetailsHTML;

}

function renderOrderDetails(order, orderId) {
    let innerOrderDetails = '';

    let matchingItem = [];

    order.products.forEach((product) => {
        let deliveryTime = calculateDate(product.estimatedDeliveryTime);
        products.forEach((oneProduct) => {
            if (oneProduct.id === product.productId) {
                matchingItem = oneProduct;
            }
        });
        innerOrderDetails +=
            `
            <div class="product-image-container">
            <img src="${matchingItem.image}">
            </div>
            <div class="product-details">
            <div class="product-name">
           ${matchingItem.name}
            </div>
        <div class="product-delivery-date">
        Arriving on: ${deliveryTime}
        </div>
        <div class="product-quantity">
        Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        </button>
        </div>
        
        <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${matchingItem.id}">
        <button class="track-package-button button-secondary js-track-package-${matchingItem.id}">
        Track package
        </button>
        </a>
        </div>
        `;
    });
    return innerOrderDetails;
}
loadProducts(renderOrderPage);





// onclick="
// cart.push({
// productId: ${matchingItem.id},
// quantity: 1,
// deliveryOptionId: '1'
// });
// window.location.href = 'checkout.html';"



