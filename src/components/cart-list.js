import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import format from 'dateformat';

import NiceButton from './nice-button';
import Toolbar from './toolbar';
import round from '../utilities/round';
import cart from '../utilities/cart';

export default class CartList extends React.Component {
    componentWillMount() {
        this.props.onMount();
    }

    renderEmpty() {
        return (
            <View style={styles.emptyList}>
				<Text style={styles.emptyListText}>
					You haven't added any cart yet!
				</Text>
			</View>
        );
    }

    renderItem = ({ item }) => {
        var date = format(item.created_at, 'dd-mm-yyyy');
        return (
            <View style={styles.cart}>
                <View style={styles.cartSummary}>
                    <Text style={styles.cartDate}>Date: { date }</Text>
                    <Text>Footprint: {round(cart.footprint(item.products))} kg CO₂</Text>
                </View>
                <View style={styles.cartActions}>
                    <NiceButton
                            style={styles.action}
                            onPress={() => this.props.onView(item.products)}>
                        View
                    </NiceButton>
                    <NiceButton
                            style={styles.action}
                            onPress={() => this.props.onRemove(parseInt(item.key))}>
                        Remove
                    </NiceButton>
                </View>
            </View>
        );
    }

    render() {
        if (this.props.carts.length === 0) {
            return this.renderEmpty();
        }

        return (
            <FlatList
            	data={this.props.carts}
            	style={styles.list}
    			renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    emptyList: {
        paddingTop: 32,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 32,
        flex: 1,
        justifyContent: 'center',
    },
    emptyListText: {
        fontSize: 18,
        textAlign: 'center',
    },
	list: {
		flex: 1,
		paddingTop: 10,
	},
    cart: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        minHeight: 64,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cartSummary: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    cartActions: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },
    action: {
        margin: 2,
    }
});
