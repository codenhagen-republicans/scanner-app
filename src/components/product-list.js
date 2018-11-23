import React from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

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
		const removeFn =
			this.removeFns[item.key] || (() => this.props.onRemove(item.key));

		if (item.loading) {
			return this.renderLoading();
		}

		return (
			<View style={styles.item}>
				<View style={styles.label}>
					<Text>{item.title}</Text>
				</View>
				<TouchableOpacity onPress={removeFn}>
					<Text>Remove</Text>
				</TouchableOpacity>
			</View>
		);
	};

	renderEmpty = () => {
		return (
			<View style={[styles.item, styles.emptyList]}>
				<Text style={styles.emptyListText}>
					Scan the first product to start
				</Text>
			</View>
		);
	};

	renderLoading = () => {
		return (
			<View style={styles.item}>
				<ActivityIndicator size="small" color="#999" style={styles.activity} />
				<View style={styles.label}>
					<Text style={styles.loadingText}>Loading…</Text>
				</View>
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
		paddingTop: 14,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 14,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	label: {
		flex: 1,
	},
	emptyList: {
		flexDirection: 'column',
		paddingTop: 28,
		paddingBottom: 28,
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
