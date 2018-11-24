import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import ProductList from './product-list';
import Toolbar from './toolbar';

export default function RouteCarts(props) {
    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ProductList
                    isEditable={false}
                    products={props.cart}
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
