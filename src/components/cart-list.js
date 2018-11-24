import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import format from 'dateformat';

import round from '../utilities/round';

export default class CartList extends React.Component {
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
        var date = format(item.date, 'dd-mm-yyyy');
        return (
            <View style={styles.cart}>
                <View style={styles.cartSummary}>
                    <Text style={styles.cartDate}>{ date }</Text>
                    <Text>{round(item.footprint())} kg CO₂</Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.props.carts.length === 0) {
            return this.renderEmpty();
        }

        return (<>
        	<FlatList
        		data={this.props.carts}
        		style={styles.list}
				renderItem={this.renderItem}
        	/>
		</>);
    }
}

const styles = StyleSheet.create({
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
	list: {
		flex: 1,
		paddingTop: 10,
	},
    cart: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartSummary: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    cartDate: {

    }
});
