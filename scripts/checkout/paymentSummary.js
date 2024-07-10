import { cart, totalCartQuantity } from '../../data/cart.js';
import { products, loadProducts } from "../../data/products.js";
import { formatCurrency } from '../utility/money.js';
import { addOrder } from '../../data/orders.js';


function calculateTotal() {
  let totalPrice = 0;
  let totalShippingCharges = 0;
  let totalTax = 0;
  cart.forEach(cartItem => {
    let productId;
    productId = cartItem.productId;
    products.forEach((product) => {
      if (product.id === productId) {
        totalPrice += (product.priceCents) * (cartItem.quantity);
      }
    });
    let deliveryOption;
    deliveryOption = cartItem.deliveryOptionId;
    if (deliveryOption === '1') {
      totalShippingCharges += 0;
    } else if (deliveryOption === '2') {
      totalShippingCharges += 499;
    } else if (deliveryOption === '3') {
      totalShippingCharges += 999;
    }
  });
  totalTax = (totalPrice + totalShippingCharges) * 0.1;
  return [totalPrice, totalShippingCharges, totalTax];
}


let paymentSummaryHTML = '';

export function renderPaymentSummary() {
  let [moneyTotal, shippingChargesTotal, taxTotal] = calculateTotal();
  let totalBeforeTax = moneyTotal + shippingChargesTotal
  let orderTotal = totalBeforeTax + taxTotal

  paymentSummaryHTML = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div class="js-payment-quantity">Items (${totalCartQuantity}):</div>
          <div class="payment-summary-money js-payment-total">$${formatCurrency(moneyTotal)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-total-shipping-charges">$${formatCurrency(shippingChargesTotal)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money js-total-before-tax">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money js-estimated-tax">$${formatCurrency(taxTotal)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-final-total-money">$${formatCurrency(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {

        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json();
        // console.log(order); 
        addOrder(order);
      } catch (error) {
        console.log(`Unexpected Error. Please try again later. \n--> ${error} `);
      }
      window.location.href = 'orders.html';
    });

}




