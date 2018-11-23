import React from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

export default class ProductList extends React.Component {
	removeFns = [];

	render() {
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
		paddingTop: 14,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 14,
	},
	emptyListText: {
		fontSize: 18,
		textAlign: 'center',
	},
});
