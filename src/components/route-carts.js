import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';

import CartHistoryContaner from '../state/cart-history';
import RouterContainer from '../state/router';
import CartList from './cart-list';
import Toolbar from './toolbar';
import PieChart from './pie-chart';
import UserContainer from '../state/user';

export default class RouteCarts extends React.Component {
    render() {
        return (
            <Subscribe to={[CartHistoryContaner, RouterContainer, UserContainer]}>
                {(carts, router, user) => {
                    return (<View style={styles.container}>
                        <PieChart user={user} />
                        <CartList
                            carts={carts.state.carts}
                            onRemove={carts.removeCart}
                            onView={router.goToViewCart}
                            onMount={carts.load}
                        />
                        <Toolbar />
                    </View>);
                }}
            </Subscribe>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        marginTop: 20,
	},
});
