describe('ShoppingCart', () => {

    let cart;
    let americano, macchiato, frappuccino;

    beforeEach(() => {
        cart = new ShoppingCart();
        americano = {itemId: 0, price: 4.00};
        macchiato = {itemId: 15, price: 5.99};
        frappuccino = {itemId: 22, price: 5.20};
    });

    afterEach(() => {
        cart = undefined;
        americano = undefined;
        macchiato = undefined;
        frappuccino = undefined;
    });


    describe('scan', () => {
        it('should add an item to the cart', () => {
            cart.scan(americano);
            expect(cart.items()).toEqual([americano]);
            cart.scan(macchiato);
            expect(cart.items()).toEqual([americano, macchiato]);
            cart.scan(macchiato);
            cart.scan(macchiato);
            cart.scan(frappuccino);
            expect(cart.items()).toEqual([americano, macchiato, macchiato, macchiato, frappuccino]);
        });

        it('should not add more than 5 items', () => {
            for (let i = 0; i < 5; i++) {
                cart.scan(americano);
            }
            expect(cart.scan(americano)).toBe('Your cart is full.');
            expect(cart.items()).toEqual([americano, americano, americano, americano, americano]);
            expect(cart.scan(macchiato)).toBe('Your cart is full.');
            expect(cart.items()).toEqual([americano, americano, americano, americano, americano]);
        });

    });

    describe('remove', () => {
        it('should remove an item from the cart', () => {
            cart.scan(macchiato);
            cart.scan(americano);
            cart.scan(macchiato);
            cart.remove(americano);
            expect(cart.items()).toEqual([macchiato, macchiato]);
            cart.remove(macchiato);
            expect(cart.items()).toEqual([macchiato]);
            cart.remove(macchiato);
            expect(cart.items()).toEqual([]);
        });

        it('should tell the cart is empty when nothing can be removed', () => {
            expect(cart.remove(americano)).toBe('Your cart is empty.');
            cart.scan(macchiato);
            cart.remove(macchiato);
            expect(cart.remove(macchiato)).toBe('Your cart is empty.');
        });
    });

    describe('total', () => {
        it('should return the total of all items in the cart', () => {
            expect(cart.total()).toBe(0);
            cart.scan(americano);
            expect(cart.total()).toBe(4);
            cart.scan(macchiato);
            expect(cart.total()).toBe(9.99);
            cart.scan(americano);
            expect(cart.total()).toBe(13.99);
            cart.remove(macchiato);
            expect(cart.total()).toBe(8);
        });
    });

    describe('discount', () => {
        it('should discount all items in the cart according to the given percentage', () => {
            cart.discount(20);
            expect(cart.total()).toBe(0);
            cart.scan(americano);
            expect(cart.total()).toBe(3.2);
            cart.scan(frappuccino);
            cart.discount(50);
            expect(cart.total()).toBe(4.6);
        });

        it('should not discount items more than 50%', () => {
            cart.scan(frappuccino);
            cart.discount(51);
            expect(cart.total()).toBe(2.6);
            cart.discount(100);
            expect(cart.total()).toBe(2.6);
        });
    });

})