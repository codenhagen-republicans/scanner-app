import React from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';
import { Subscribe } from 'unstated';
import RouterContainer from '../state/router';
import NiceButton from './nice-button';
import Toolbar from './toolbar';

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
			<>
				<Subscribe to={[RouterContainer]}>
					{router => (
						<Animated.View
							style={[styles.container, { opacity: this.state.fadeAnim }]}
						>
							<Text style={styles.title}>Welcome!</Text>
							<NiceButton
								onPress={() => {
									router.goToScanner();
								}}
								style={styles.button}
							>
								<Text style={styles.buttonText}>Start scanning</Text>
							</NiceButton>
						</Animated.View>
					)}
				</Subscribe>
				<Toolbar />
			</>
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
	login: {
		marginTop: 40,
	},
});
