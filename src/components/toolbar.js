import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer, { SCANNER, LOGIN } from '../state/router';

export default function Toolbar() {
	return (
		<Subscribe to={[RouterContainer]}>
			{router => (
				<View style={styles.container}>
					<TouchableOpacity
						onPress={router.goToScanner}
						style={[
							styles.button,
							router.state.view === SCANNER && styles.buttonCurrent,
						]}
					>
						<Text style={styles.text}>Scan</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							router.state.view === 'TODO_FIX' && styles.buttonCurrent,
						]}
					>
						<Text style={styles.text}>Carts</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={router.goToLogin}
						style={[
							styles.button,
							router.state.view === LOGIN && styles.buttonCurrent,
						]}
					>
						<Text style={styles.text}>Log in</Text>
					</TouchableOpacity>
				</View>
			)}
		</Subscribe>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		height: 60,
		paddingLeft: 18,
		paddingRight: 18,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopColor: '#000',
	},
	buttonCurrent: {
		backgroundColor: '#333',
		borderTopColor: '#555',
	},
	text: {
		color: '#fff',
	},
});