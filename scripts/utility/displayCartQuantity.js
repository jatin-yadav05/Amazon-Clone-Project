import { cart } from "../../data/cart.js";

export function showCartQuantity(){
    console.log(cart);
    let cQuantity=0;
    cart.forEach(cartElement => {
        cQuantity+=cartElement.quantity;
    });
    if(cQuantity===0){
        cQuantity='';
    }
    return cQuantity;
}