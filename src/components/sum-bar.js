import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SumBar({ sum, unit = 'kg CO₂' }) {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>Footprint</Text>
			</View>
			<View>
				<Text style={styles.text}>
					{sum} {unit}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 24,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
