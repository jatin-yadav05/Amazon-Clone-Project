import { renderProductSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js'  // Backend Used
loadProducts(() => {
    renderProductSummary();
    renderPaymentSummary();
});
