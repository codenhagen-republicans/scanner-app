import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	StatusBar,
} from 'react-native';

export default function NavBar({ goBack, title }) {
	return (
		<>
			<StatusBar barStyle="light-content" />
			<View style={styles.container}>
				{typeof goBack === 'function' && (
					<TouchableOpacity onPress={goBack} style={styles.backButton}>
						<Text style={styles.text}>Back</Text>
					</TouchableOpacity>
				)}
				{title && <Text style={[styles.text, styles.title]}>{title}</Text>}
				<Text style={styles.spacer} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		marginTop: Platform.OS === 'ios' ? 16 : 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backButton: {
		height: 48,
		width: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
	},
	title: {
		fontWeight: 'bold',
	},
	spacer: {
		width: 48,
	},
});
