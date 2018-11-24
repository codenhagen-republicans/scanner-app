import React from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import ListButton from './list-button';

export default class UserForm extends React.Component {
	state = {
		username: '',
		password: '',
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>Username</Text>
				<TextInput
					returnKeyType={'next'}
					value={this.state.username}
					onChangeText={this.handleUsernameInput}
					onSubmitEditing={this.focusPassword}
					blurOnSubmit={false}
					style={styles.input}
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					textContentType="password"
					secureTextEntry
					returnKeyType={'send'}
					value={this.state.password}
					onChangeText={this.handlePasswordInput}
					onSubmitEditing={this.handleSubmit}
					style={styles.input}
					ref={el => {
						this.passwordInput = el;
					}}
				/>
				<ListButton style={styles.submit}>Log in</ListButton>
				{this.props.submitting && (
					<View style={styles.submitting}>
						<ActivityIndicator
							size="small"
							color="#000"
							style={styles.activity}
						/>
						<Text>{this.props.loadingText || 'Logging in…'}</Text>
					</View>
				)}
				{!this.props.submitting && this.props.errorMessage && (
					<View style={styles.errorMessage}>
						<Text>{this.props.errorMessage}</Text>
					</View>
				)}
			</View>
		);
	}

	handleUsernameInput = username => {
		this.setState({ username });
	};

	handlePasswordInput = password => {
		this.setState({ password });
	};

	focusPassword = () => {
		if (this.passwordInput) {
			this.passwordInput.focus();
		}
	};

	handleSubmit = () => {
		// todo should submit
		if (this.props.submitting) {
			return;
		}
		this.props.onSubmit(this.state.username, this.state.password);
	};
}

const spacing = 20;

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
	},
	label: {
		marginTop: spacing,
		marginBottom: 4,
		fontSize: 18,
	},
	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		width: 260,
		fontSize: 18,
		paddingTop: 8,
		paddingLeft: 6,
		paddingRight: 6,
		paddingBottom: 8,
	},
	submit: {
		marginTop: spacing,
	},
	errorMessage: {
		backgroundColor: '#fcc',
		marginTop: spacing,
		paddingTop: 10,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 10,
	},
	submitting: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: spacing,
	},
	activity: {
		marginRight: 6,
	},
});
