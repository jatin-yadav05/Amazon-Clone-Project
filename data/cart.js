
export let cart = JSON.parse(localStorage.getItem('cart'));
export let totalCartQuantity;
if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}
export function updateCartItem() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });


    document.querySelector('.js-update-cart').innerHTML = `${cartQuantity} items`;
    totalCartQuantity=cartQuantity;
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


export function updateDeliveryOption(productId,deliveryOptId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptId;
    saveToLocal();

}