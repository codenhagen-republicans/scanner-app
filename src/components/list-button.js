import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ListButton({ children, style, ...props }) {
	return (
		<TouchableOpacity
			style={[style, styles.button]}
			activeOpacity={0.35}
			{...props}
		>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#eee',
		borderRadius: 20,
		padding: 5,
		paddingLeft: 8,
		paddingRight: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: { color: '#000' },
});