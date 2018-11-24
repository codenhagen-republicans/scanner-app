import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer from '../state/router';
import ListButton from './list-button';

export default class RouteIndex extends React.Component {
	state = {
		fadeAnim: new Animated.Value(0),
	};

	componentDidMount() {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 650,
		}).start();
	}

	render() {
		return (
			<Subscribe to={[RouterContainer]}>
				{router => (
					<Animated.View
						style={[styles.container, { opacity: this.state.fadeAnim }]}
					>
						<Text style={styles.title}>Welcome!</Text>
						<ListButton
							onPress={() => {
								router.goToScanner();
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Start</Text>
						</ListButton>
						<ListButton
							onPress={() => {
								router.goToCarts();
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Carts</Text>
						</ListButton>
					</Animated.View>
				)}
			</Subscribe>
		);
	}
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
