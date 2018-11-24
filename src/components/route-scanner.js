import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import CartContainer from '../state/cart';
import CartHistoryContaner from '../state/cart-history';
import Scanner from './scanner';
import ProductList from './product-list';
import Toolbar from './toolbar';

export default function RouteScanner() {
	return (
        <>
    		<Subscribe to={[CartContainer, CartHistoryContaner]}>
    			{(cart, history) => (
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
                                history.newCart(products);
                                cart.clean();
                            }}
                            onUnmount={cart.save}
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
