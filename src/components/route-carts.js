import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';

import CartHistoryContaner from '../state/cart-history';
import CartList from './cart-list';

export default function RouteCarts() {
    return (
        <Subscribe to={[CartHistoryContaner]}>
            {carts => (
                <View style={styles.container}>
					<StatusBar barStyle="light-content" />
                    <CartList
                        carts={carts.state.carts}
                        onAdd={carts.addCart}
                        onRemove={carts.removeCart}
                    />
                </View>
            )}
        </Subscribe>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
});
