import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { Subscribe } from 'unstated';
import UserContainer from '../state/user';
import UserForm from './user-form';
import Toolbar from './toolbar';
import RouterContainer from '../state/router';
import NiceButton from './nice-button';

const LOGIN = 'PAGE_LOGIN';
const REGISTER = 'PAGE_REGISTER';

export default class RouteAccount extends React.Component {
	state = {
		page: LOGIN,
	};

	render() {
		return (
			<>
				<Subscribe to={[UserContainer, RouterContainer]}>
					{(user, router) =>
						!user.state.username
							? this.renderUserIsLoggedOut(user, router)
							: this.renderUserIsLoggedIn(user, router)
					}
				</Subscribe>
				<Toolbar />
			</>
		);
	}

	renderUserIsLoggedOut = (user, router) => (
		<KeyboardAvoidingView style={styles.container} behaviour="padding">
			{this.state.page === LOGIN && (
				<>
					<Text style={styles.title}>Log in</Text>
					<UserForm
						submitting={user.state.submitting}
						errorMessage={user.state.errorMessage}
						onSubmit={(username, password) => {
							user.login(username, password);
						}}
						submitText="Log in"
						loadingText="Logging in…"
					/>
					<View style={styles.switchPage}>
						<TouchableOpacity
							onPress={() => {
								this.setState({ page: REGISTER });
							}}
						>
							<Text>Don't have an account yet? Register</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
			{this.state.page === REGISTER && (
				<>
					<Text style={styles.title}>Register</Text>
					<UserForm
						submitting={user.state.submitting}
						errorMessage={user.state.errorMessage}
						onSubmit={(username, password) => {
							user.register(username, password);
						}}
						submitText="Register"
						loadingText="Registering…"
					/>
					<View style={styles.switchPage}>
						<TouchableOpacity
							onPress={() => {
								this.setState({ page: LOGIN });
							}}
						>
							<Text>Already have an account? Log in</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</KeyboardAvoidingView>
	);

	renderUserIsLoggedIn = (user, router) => (
		<KeyboardAvoidingView style={styles.container} behaviour="padding">
			<Text style={styles.title}>Hello {user.state.username}!</Text>
			<NiceButton onPress={router.goToScanner} style={styles.pad}>
				Start scanning
			</NiceButton>
			<NiceButton onPress={user.logout} style={styles.pad}>
				Log out
			</NiceButton>
			{user.state.errorMessage && (
				<View style={styles.pad}>
					<Text>{user.state.errorMessage}</Text>
				</View>
			)}
		</KeyboardAvoidingView>
	);
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
	pad: {
		marginTop: 20,
	},
	switchPage: {
		marginTop: 30,
		paddingTop: 10,
		width: 260,
		borderTopWidth: 1,
		borderTopColor: '#eee',
	},
});
