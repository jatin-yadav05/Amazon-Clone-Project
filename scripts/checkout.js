import { renderProductSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js'  // Backend Used



async function loadPage() {
    await loadProductsfetch();

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    renderProductSummary();
    renderPaymentSummary();

    // return 'value1';        // Act as resolve('value1');
}

loadPage();

/*


Promise.all([
    loadProductsfetch(),
    new Promise((resolve) => {
        loadCart(() => {    // Second Step
            resolve('value2');
        });
    })
]).then((value) => {
    console.log(value);     // Gives an array of all values that are in arguement of resolve
    renderProductSummary();
    renderPaymentSummary();
});


*/

/*
// We can use promises to create as many as steps we needed.
// It actually waits for current step to finish before going to next step


new Promise((resolve) => {
    loadProducts(() => {    // First Step
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {    // Second Step
            resolve();
        });
    });
}).then(() => {             // Last Step
    renderProductSummary();
    renderPaymentSummary();
});

*/

/*
loadProducts(() => {
    loadCart(() => {
        renderProductSummary();
        renderPaymentSummary();
    });
});
*/

