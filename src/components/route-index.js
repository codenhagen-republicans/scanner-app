import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer from '../state/router';

export default function RouteIndex() {
	return (
		<Subscribe to={[RouterContainer]}>
			{router => (
				<View style={styles.container}>
					<Text style={styles.title}>Welcome!</Text>
					<TouchableOpacity
						onPress={() => {
							router.goToScanner();
						}}
						style={styles.button}
					>
						<Text>Start</Text>
					</TouchableOpacity>
				</View>
			)}
		</Subscribe>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 26,
	},
	button: {
		marginTop: 30,
		fontSize: 16,
	},
});
