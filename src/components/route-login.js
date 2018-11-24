import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Subscribe } from 'unstated';
import LoginContainer from '../state/login';
import LoginForm from './login-form';
import Toolbar from './toolbar';

export default class RouteLogin extends React.Component {
	render() {
		return (
			<>
				<Subscribe to={[LoginContainer]}>
					{login => (
						<KeyboardAvoidingView style={styles.container} behaviour="padding">
							<Text style={styles.title}>Log in</Text>
							<LoginForm
								errorMessage={login.state.errorMessage}
								onLogin={(username, password) => {
									login.authenticate(username, password);
								}}
							/>
						</KeyboardAvoidingView>
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
});
