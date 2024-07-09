
export let cart;
loadFromStorage();
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [];
    }
}


export let totalCartQuantity;
export function updateCartItem() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    // console.log('heeiiii');
    document.querySelector('.js-update-cart').innerHTML = `${cartQuantity} items`;
    totalCartQuantity = cartQuantity;
    saveToLocal();
}

export function saveToLocal() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addtoCart(productId) {
    let matchingItem;
    let realQuantity = Number((document.querySelector(`.js-quantity-selector-${productId}`)).
        value);
    document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = '1';
    const addedBtn = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = '0';
    }, 1000);
    // clearTimeout(addedBtn,1200);
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {

        matchingItem.quantity += realQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: realQuantity,
            deliveryOptionId: '1'
        });
    }
    saveToLocal();
}



export function removeFromCart(productId) {
    const newcart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newcart.push(cartItem);
        }
    });
    cart = newcart;
    updateCartItem();
    saveToLocal();
}


export function updateDeliveryOption(productId, deliveryOptId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptId;
    saveToLocal();

}

export function loadCart(fun) {
    const productsReq = new XMLHttpRequest();
    productsReq.addEventListener('load', () => {
        console.log(productsReq.response);
        fun(); 
    });
    productsReq.open('GET', 'https://supersimplebackend.dev/cart');
    productsReq.send();
}