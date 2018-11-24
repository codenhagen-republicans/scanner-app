import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';

import CartHistoryContaner from '../state/cart-history';
import RouterContainer from '../state/router';
import CartList from './cart-list';
import Toolbar from './toolbar';

export default function RouteCarts() {
    return (
        <Subscribe to={[CartHistoryContaner, RouterContainer]}>
            {(carts, router) => {
                return (<View style={styles.container}>
					<StatusBar barStyle="light-content" />
                    <CartList
                        carts={carts.state.carts}
                        onRemove={carts.removeCart}
                        onEdit={router.goToViewCart}
                        onMount={carts.load}
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
