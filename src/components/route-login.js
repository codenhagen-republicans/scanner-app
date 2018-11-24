import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Subscribe } from 'unstated';
import UserContainer from '../state/user';
import UserForm from './user-form';
import Toolbar from './toolbar';
import RouterContainer from '../state/router';
import NiceButton from './nice-button';

export default class RouteLogin extends React.Component {
	render() {
		return (
			<>
				<Subscribe to={[UserContainer, RouterContainer]}>
					{(user, router) => (
						<KeyboardAvoidingView style={styles.container} behaviour="padding">
							{!user.state.username ? (
								<>
									<Text style={styles.title}>Log in</Text>
									<UserForm
										submitting={user.state.submitting}
										errorMessage={user.state.errorMessage}
										onSubmit={(username, password) => {
											user.login(username, password);
										}}
										submitText='Log in'
										loadingText="Logging in…"
									/>
								</>
							) : (
								<>
									<Text style={styles.title}>Hello {user.state.username}!</Text>
									<NiceButton
										onPress={router.goToScanner}
										style={styles.okButton}
									>
										Start scanning
									</NiceButton>
								</>
							)}
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
	okButton: {
		marginTop: 20,
	},
});
