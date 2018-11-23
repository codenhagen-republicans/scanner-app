import React from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
} from 'react-native';
import ListButton from './list-button';
import { LOADING, FAILED } from '../state/products';

export default class ProductList extends React.Component {
	removeFns = [];
	retryFns = [];

	render() {
		if (this.props.products.length === 0) {
			return this.renderEmpty();
		}

		const sumCo2 = this.props.products.reduce(
			(sum, product) => sum + product.co2 || 0,
			0
		);

		return (
			<>
				<FlatList
					data={this.props.products}
					style={styles.list}
					renderItem={this.renderItem}
				/>
				<View style={styles.sum}>
					<Text>Sum: {sumCo2} kg CO₂</Text>
				</View>
			</>
		);
	}

	renderItem = ({ item }) => {
		switch (item.status) {
			case LOADING:
				return this.renderItemLoading();
			case FAILED:
				return this.renderItemFailed(item);
		}

		const removeFn =
			this.removeFns[item.key] || (() => this.props.onRemove(item.key));

		return (
			<View style={styles.item}>
				<View style={styles.label}>
					<Text>{item.title}</Text>
				</View>
				<View style={styles.impact}>
					<Text>{item.co2} kg CO₂</Text>
				</View>
				<ListButton onPress={removeFn}>Remove</ListButton>
			</View>
		);
	};

	renderItemLoading = () => {
		return (
			<View style={styles.item}>
				<ActivityIndicator size="small" color="#999" style={styles.activity} />
				<View style={styles.label}>
					<Text style={styles.loadingText}>Loading…</Text>
				</View>
			</View>
		);
	};

	renderItemFailed = item => {
		const retryFn =
			this.retryFns[item.key] || (() => this.props.onRetry(item.key));
		const removeFn =
			this.removeFns[item.key] || (() => this.props.onRemove(item.key));

		return (
			<View style={styles.item}>
				<View style={styles.label}>
					<Text>Couldn’t load product information.</Text>
				</View>
				<ListButton onPress={retryFn} style={styles.retryButton}>
					Retry
				</ListButton>
				<ListButton onPress={removeFn}>Remove</ListButton>
			</View>
		);
	};

	renderEmpty = () => {
		return (
			<View style={styles.emptyList}>
				<Text style={styles.emptyListText}>
					Scan the first product to start
				</Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	sum: {
		paddingTop: 16,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 16,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 16,
		minHeight: 64,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	label: {
		flex: 1,
	},
	impact: {
		marginRight: 12,
	},
	emptyList: {
		paddingTop: 32,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 32,
	},
	emptyListText: {
		fontSize: 18,
		textAlign: 'center',
	},
	activity: {
		marginRight: 6,
	},
	loadingText: {
		color: '#aaa',
	},
	retryButton: {
		marginRight: 8,
	},
});
