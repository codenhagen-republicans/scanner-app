import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Scanner extends React.Component {
	render() {
		return (
			<View style={styles.videoContainer}>
				<RNCamera
					style={styles.camera}
					ratio="4:3"
					onBarCodeRead={this.props.onBarCodeRead}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	videoContainer: {
		backgroundColor: '#000',
	},
	camera: {
		width: '100%',
		aspectRatio: 4 / 3,
	},
});
