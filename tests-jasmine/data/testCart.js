import { addtoCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suite: Add to cart',()=>{
    it('adds an exiting product to cart',()=>{

    });
    it('adds a new product to cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        // console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});