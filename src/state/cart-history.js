import { AsyncStorage } from 'react-native';
import { Container } from 'unstated';
import Config from 'react-native-config';

import cartLib from '../utilities/cart';

export default class CartHistoryContaner extends Container {
    state = {
        carts: [
            // {
            //     created_at: new Date(),
            //     key: '0',
            //     products: [
            //         {
            //             key: '8410076400024',
            //             status: 'PRODUCT_LOADED',
            //             name: 'Old El Paso original salsa 340g hot',
            //             footprint: 0.16864000000000004,
            //             image: 'https://public.keskofiles.com/f/k-ruoka/product/8410076400024'
            //         }
            //     ]
            // }
        ],
    }

    nextKey = () => this.state.carts.length.toString();

    newCart = products => {
        var cart = {
            created_at: new Date(),
            key: this.nextKey(),
            products: products
        };
        this.setState({
            carts: this.state.carts.concat([cart])
        });
    }

    addCart = cart => {
        cart.key = this.nextKey();
        this.setState({
            carts: this.state.carts.concat([cart])
        });
    }

    load = async axios => {
        const carts = await cartLib.download(axios);
        this.setState({
            carts: carts,
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
        else if (cartId.key) {
            cartId = cartId.key;
            var filterFunction = cart => cart.key != cartId;
        }

        if (filterFunction) {
            this.setState({
                carts: this.state.carts.filter(filterFunction)
            });
        }
    }
}
