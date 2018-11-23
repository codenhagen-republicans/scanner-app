import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, Subscribe } from 'unstated';
import ProductsContainer from './state/products';
import Scanner from './components/scanner';
import ProductList from './components/product-list';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
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
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
});
