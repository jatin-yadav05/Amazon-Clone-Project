import { cart, removeFromCart, saveToLocal, updateCartItem, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utility/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  // default export
import { deliveryOptions } from '../data/deliveryOptions.js'


function rederProductSummary(){
let cartHtml = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingItem;
  products.forEach((product) => {
    if (product.id===productId) {
      matchingItem = product;
    }
  }); 

  const deliveryOptId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartHtml += `
     <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem.id, cartItem)}
              </div>
            </div>
          </div>
          `;
});

function deliveryOptionsHTML(matchingItem, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE -' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingItem}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem}">
           <div>
             <div class="delivery-option-date">
               ${dateString}
             </div>
             <div class="delivery-option-price">
               ${priceString} Shipping
             </div>
            </div>
      </div>
      `
  });
  return html;
}


document.querySelector('.js-order-summary').innerHTML = cartHtml;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      console.log(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.remove();
    });
  });

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      rederProductSummary();
    });
  });

}
rederProductSummary();