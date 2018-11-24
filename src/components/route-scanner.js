import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import ProductsContainer from '../state/products';
import CartsContainer from '../state/cart-history';
import Scanner from './scanner';
import ProductList from './product-list';
import Toolbar from './toolbar';

export default function RouteScanner() {
	return (
		<Subscribe to={[ProductsContainer, CartsContainer]}>
			{(products, carts) => (
				<View style={styles.container}>
					<StatusBar barStyle="light-content" />
					<Scanner onBarCodeRead={products.barCodeRead} />
					<ProductList
						products={products.state.products}
                        carts={carts}
						onRemove={products.remove}
						onRetry={products.retry}
                        footPrint={products.footPrint}
					/>
				</View>
			)}
		</Subscribe>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
