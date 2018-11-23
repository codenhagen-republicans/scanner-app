import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer from '../state/router';
import ListButton from './list-button';

export default function RouteIndex() {
	return (
		<Subscribe to={[RouterContainer]}>
			{router => (
				<View style={styles.container}>
					<Text style={styles.title}>Welcome!</Text>
					<ListButton
						onPress={() => {
							router.goToScanner();
						}}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Start</Text>
					</ListButton>
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
		padding: 10,
		paddingLeft: 16,
		paddingRight: 16,
	},
	buttonText: {
		fontSize: 20,
	},
});
