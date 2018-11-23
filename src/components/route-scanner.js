import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import ProductsContainer from '../state/products';
import Scanner from './scanner';
import ProductList from './product-list';

export default function RouteScanner() {
	return (
		<Subscribe to={[ProductsContainer]}>
			{products => (
				<View style={styles.container}>
					<Scanner onBarCodeRead={products.barCodeRead} />
					<ProductList
						products={products.state.products}
						onRemove={products.remove}
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