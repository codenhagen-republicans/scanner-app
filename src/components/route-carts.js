import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';

import CartHistoryContaner from '../state/cart-history';
import RouterContainer from '../state/router';
import UserContainer from '../state/user';
import CartList from './cart-list';
import Toolbar from './toolbar';

import cartLib from '../utilities/cart';

export default function RouteCarts() {
    return (
        <Subscribe to={[CartHistoryContaner, RouterContainer, UserContainer]}>
            {(carts, router, auth) => {
                return (<View style={styles.container}>
					<StatusBar barStyle="light-content" />
                    <CartList
                        carts={carts.state.carts}
                        onRemove={cart => {
                            cartLib.del(auth.state.axios, cart.key);
                            carts.removeCart(cart);
                        }}
                        onView={router.goToViewCart}
                        onMount={carts.load.bind(carts, auth.state.axios)}
                    />
                    <Toolbar />
                </View>);
            }}
        </Subscribe>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
});
