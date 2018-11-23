import React from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
} from 'react-native';
import RemoveButton from './remove-button';

export default class ProductList extends React.Component {
	removeFns = [];

	render() {
		if (this.props.products.length === 0) {
			return this.renderEmpty();
		}

		return (
			<FlatList
				data={this.props.products}
				style={styles.list}
				renderItem={this.renderItem}
			/>
		);
	}

	renderItem = ({ item }) => {
		if (item.loading) {
			return this.renderItemLoading();
		}

		const removeFn =
			this.removeFns[item.key] || (() => this.props.onRemove(item.key));

		return (
			<View style={styles.item}>
				<View style={styles.label}>
					<Text>{item.title}</Text>
				</View>
				<RemoveButton onPress={removeFn} />
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
});
