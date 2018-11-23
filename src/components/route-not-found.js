import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer from '../state/router';

export default function RouteNotFound() {
	return (
		<Subscribe to={[RouterContainer]}>
			{router => (
				<View style={styles.container}>
					<Text style={styles.title}>Route not found</Text>
					<TouchableOpacity
						onPress={() => {
							router.go('start');
						}}
						style={styles.button}
					>
						<Text>Go back</Text>
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
