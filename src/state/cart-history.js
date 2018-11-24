import { Container } from 'unstated';
import Config from 'react-native-config';

import Cart from './products';

export default class CartHistoryContaner extends Container {
    state = {
        carts: []
    }

    addCart = cart => {
        cart.date = cart.date ? new Date() : new Date(cart.date);

        this.setState({
            carts: this.state.carts.concat([cart])
        });
    }

    removeCart = cartId => {
        var filterFunction = null;

        if (cartId instanceof Date) {
            cartId = cartId.getTime();
            var filterFunction = cart => cart.date.getTime() != cartId;
        }
        else if (cartId < this.state.carts.length) {
            var filterFunction = (_, index) => index != cartId;
        }

        if (filterFunction) {
            this.setState({
                carts: this.state.carts.filter(filterFunction)
            });
        }
    }


}
