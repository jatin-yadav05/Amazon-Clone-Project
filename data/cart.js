
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}
export function updateCartItem(){
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.js-update-cart').innerHTML=`${cartQuantity} items`;
    saveToLocal();
  }

export function saveToLocal(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function addtoCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
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