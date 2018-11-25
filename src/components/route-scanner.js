import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import CartContainer from '../state/cart';
import UserContainer from '../state/user';
import CartHistoryContaner from '../state/cart-history';
import Scanner from './scanner';
import ProductList from './product-list';
import Toolbar from './toolbar';

import cartLib from '../utilities/cart';

export default function RouteScanner() {
	return (
        <>
    		<Subscribe to={[CartContainer, CartHistoryContaner, UserContainer]}>
    			{(cart, history, auth) => (
    				<View style={styles.container}>
    					<StatusBar barStyle="light-content" />
    					<Scanner onBarCodeRead={cart.barCodeRead} />
    					<ProductList
    						products={cart.state.products}
                            isEditable={true}
    						onRemove={cart.remove}
                            onPlus={cart.add}
                            onMinus={cart.remove}
    						onRetry={cart.retry}
                            onSave={products => {
                                cartLib.upload(auth.state.axios, products);
                                history.newCart(products);
                                cart.clean();
                            }}
    					/>
    				</View>
    			)}
            </Subscribe>
            <Toolbar />
        </>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
