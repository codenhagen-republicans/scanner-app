import React from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	Image,
	ActivityIndicator,
} from 'react-native';
import { LOADING, FAILED, MISSING } from '../state/cart';
import SumBar from './sum-bar';
import NiceButton from './nice-button';
import round from '../utilities/round';
import cart from '../utilities/cart';

export default class ProductList extends React.Component {
	removeFns = [];
	addFns = [];
	retryFns = [];

    componentWillUnmount() {
        if (this.props.isEditable && this.props.onUnmount) {
            this.props.onUnmount();
        }
    }

	render() {
		if (this.props.products.length === 0) {
			return this.renderEmpty();
		}

		return (
			<>
				<FlatList
					data={this.props.products}
					style={styles.list}
					renderItem={this.renderItem}
				/>
                { this.props.isEditable
                    ? (<View style={styles.centeredLine}>
                            <NiceButton onPress={() => this.props.onSave(this.props.products)}>
                                Save cart
                            </NiceButton>
                        </View>)
                    : <></>}
				<SumBar sum={round(cart.footprint(this.props.products))} />
			</>
		);
	}

	renderItem = ({ item }) => {
		switch (item.status) {
			case LOADING:
				return this.renderItemLoading();
			case FAILED:
				return this.renderItemFailed(item);
			case MISSING:
				return this.renderItemMissing(item);
		}

		const removeFn =
			this.removeFns[item.key] || (() => this.props.onMinus(item.key));
		const addFn =
			this.addFns[item.key] || (() => this.props.onPlus(item));

		return (
			<View style={styles.itemContainer}>
				<View style={styles.item}>
					<Image source={{ uri: item.image }} style={styles.image} />
					<View style={styles.label}>
						<Text style={styles.labelText}>{item.name}</Text>
					</View>
					<View style={styles.impact}>
						<Text>{round(item.footprint)} kg CO₂</Text>
					</View>
					<View style={styles.quantity}>
						{ this.props.isEditable
								? (<NiceButton onPress={addFn}>+</NiceButton>)
								: <></>}
						<Text>{ item.quantity }</Text>
						{ this.props.isEditable
								? (<NiceButton onPress={removeFn}>-</NiceButton>)
								: <></>}
					</View>
				</View>
				{ !item.recommended ? <></> : 
					<>
						<Text style={styles.recommendedLabel}>Recommended</Text>
						<View style={styles.item}>
							<Image source={{ uri: item.recommended.image }} style={styles.image} />
							<View style={styles.label}>
								<Text style={styles.labelText}>{item.recommended.name}</Text>
							</View>
							<View style={styles.impact}>
								<Text>{round(item.recommended.footprint)} kg CO₂</Text>
							</View>
							<View style={styles.recommendedPadding}/>
						</View>
					</>
				  }
			</View>
		);
	};

	renderItemLoading = () => {
		return (
			<View style={[styles.item, styles.itemLoading]}>
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
                { this.props.isEditable
                    	? (<>
                                <NiceButton onPress={retryFn} style={styles.retryButton}>
                                    Retry
                                </NiceButton>
				                <NiceButton onPress={removeFn}>Remove</NiceButton>
                            </>)
                       : <></>}
			</View>
		);
	};

	renderItemMissing = item => {
		const removeFn =
			this.removeFns[item.key] || (() => this.props.onRemove(item.key));

		return (
			<View style={styles.item}>
				<View style={styles.label}>
					<Text>Product could not be found.</Text>
				</View>
				{ this.props.isEditable
                    ? (<NiceButton onPress={removeFn}>OK</NiceButton>)
                    : <></>}
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
		paddingTop: 10,
	},
	itemContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
		minHeight: 64,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	itemLoading: {
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 64,
		height: 64,
		backgroundColor: '#eee',
		marginRight: 12,
	},
	label: {
		flex: 1,
	},
	labelText: {
		fontWeight: 'bold',
	},
    recommendedLabel: {
		width: '50%',
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		textAlign: 'center',
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
	centeredLine: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
	},
	quantity: {
		flexDirection: 'column',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		minWidth: 30,
	},
	recommendedPadding: {
		minWidth: 30,
	},
});
