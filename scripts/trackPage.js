import { orders } from "../data/orders.js";
import { loadProducts, products ,loadProductsfetch} from "../data/products.js";
import { calculateDateWithDay } from "./utility/dateStr.js";

loadProducts(renderTrackPage);

let trackInnerHTML = '';


function  renderTrackPage(){

    
    const url = new URL(window.location.href);
    let orderId = url.searchParams.get('orderId');
    let productCurrentId = url.searchParams.get('productId');
    
    let date, img, quantity, name;
    
    orders.forEach(orderElement => {
        if (orderElement.id === orderId) {
            orderElement.products.forEach((property) => {
                if (property.productId === productCurrentId) {
                    quantity = property.quantity;
                    date = property.estimatedDeliveryTime;
                }
        });
    }
});


date = calculateDateWithDay(date);
products.forEach((product) => {
    if (product.id === productCurrentId) {
        img = product.image;
        name = product.name;
    }
});



function loadTrackingPage() {
    trackInnerHTML =
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>
    
    <div class="delivery-date">
    Arriving on ${date}
    </div>
    
    <div class="product-info">
    ${name}
    </div>
    
    <div class="product-info">
    Quantity: ${quantity}
    </div>
    
    <img class="product-image" src="${img}">
    
    <div class="progress-labels-container">
    <div class="progress-label">
    Preparing
    </div>
    <div class="progress-label current-status">
    Shipped
    </div>
    <div class="progress-label">
    Delivered
    </div>
    </div>
    
    <div class="progress-bar-container">
    <div class="progress-bar"></div>
    </div>
    `;
    const trackingContainer = document.querySelector('.js-order-tracking');
    trackingContainer.innerHTML = trackInnerHTML;
}
loadTrackingPage();
}