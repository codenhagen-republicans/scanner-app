import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import ProductList from './product-list';
import Toolbar from './toolbar';

var nop = () => null;

export default function RouteCarts(props) {
    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ProductList
                    products={props.cart}
                    cart={{
                        add: nop,
                        store: nop
                    }}
                    onRemove={nop}
                    onRetry={nop}
                    clean={nop}
                    footprint={nop}
                />
            </View>
            <Toolbar />
        </>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
