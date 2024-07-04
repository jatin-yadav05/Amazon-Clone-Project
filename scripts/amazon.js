// import { cart,addtoCart } from '../data/cart.js';
import * as cartModule from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utility/money.js';

let productsHtml = '';


function updateCart() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-select-quantity')

  document.querySelector('.cart-quantity').innerHTML = `${cartQuantity}`;
}


products.forEach((product) => {
  productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${10 * product.rating.stars}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

document.querySelector('.js-products-grid').innerHTML = productsHtml;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // document.querySelector('.js-added-to-cart').style.opacity = '1';
    const productId = button.dataset.productId;
    addtoCart(productId);
    updateCart();
    // document.querySelector('.js-update-cart').innerHTML = `${cartQuantity} items`
    // document.querySelectorAll('.js-added-to-cart').style.opacity = '1';
  })
});



