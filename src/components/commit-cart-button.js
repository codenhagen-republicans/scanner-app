import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CommitCartButton({ children, style, ...props }) {
	return (
		<TouchableOpacity
			style={[styles.button, style]}
			activeOpacity={0.35}
			{...props}
		>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#000',
		borderRadius: 100,
		padding: 5,
		paddingLeft: 8,
		paddingRight: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
