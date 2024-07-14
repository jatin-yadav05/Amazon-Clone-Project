import { orders } from "../data/orders.js";
import { formatCurrency } from "./utility/money.js";
import { loadProductsfetch, loadProducts, products } from "../data/products.js";
import { cart, updateDeliveryOption } from "../data/cart.js";
import { calculateDate } from "./utility/dateStr.js";
import { saveToLocal } from "../data/cart.js";
import { showCartQuantity } from "./utility/displayCartQuantity.js";


// console.log(products);
let orderDetailsHTML = '';
// function fullOrderPage(){

// }

function renderOrderPage() {
    let orderReal;
    orders.forEach((orderElement) => {
        orderReal = orderElement;
        let orderDate = calculateDate(orderElement.orderTime);
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

    document.querySelector('.js-cart-quantity').innerHTML = showCartQuantity();


    console.log('history');
    document.querySelectorAll(`.js-buy-again-button`).forEach((againBtn) => {
        againBtn.addEventListener('click', () => {
            const productElementId = againBtn.dataset.itemId;
            console.log(productElementId);
            cart.push({
                deliveryOptionId: "1",
                productId: productElementId,
                quantity: 1
            });
            saveToLocal();
            document.querySelector('.js-cart-quantity').innerHTML = showCartQuantity();
            const messageSpan = againBtn.querySelector('.buy-again-message');
            const successSpan = againBtn.querySelector('.buy-again-success');

            messageSpan.style.display = 'none';
            successSpan.style.display = 'inline';

            setTimeout(() => {
                successSpan.style.display = 'none';
                messageSpan.style.display = 'inline';
            }, 1500);
        });
    });
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
        <button data-item-id="${matchingItem.id}" class="button-primary buy-again-button js-buy-again-button">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        <span class="buy-again-success"> ✓ Added</span>
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
