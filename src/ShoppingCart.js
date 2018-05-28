class ShoppingCart {
    constructor() {
        this._items = [];
        this._discount = 0;
    }

    items() {
        return this._items;
    }

    scan(item) {
        if (this._items.length >= 5) {
            return 'Your cart is full.';
        }
        this._items.push(item);
    }

    remove(item) {
        if (this._items.length == 0) {
            return 'Your cart is empty.';
        }
        const index = this._items.findIndex(e => e.itemId === item.itemId);
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    }

    total() {
        const price = this._items.reduce((accu, item) => accu + item.price, 0);
        return price * (100 - this._discount) / 100;
    }

    discount(percentage) {
        this._discount = percentage > 50 ? 50 : percentage;
    }

}