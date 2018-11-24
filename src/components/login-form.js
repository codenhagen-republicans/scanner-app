import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import NiceButton from './nice-button';

export default class LoginForm extends React.Component {
	state = {
		username: '',
		password: '',
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>Username</Text>
				<TextInput
					value={this.state.username}
					onChangeText={this.handleUsernameInput}
					style={styles.input}
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					textContentType="password"
					secureTextEntry
					value={this.state.password}
					onChangeText={this.handlePasswordInput}
					style={styles.input}
				/>
				<NiceButton>Log in</NiceButton>
				{this.props.errorMessage && <Text>{this.props.errorMessage}</Text>}
			</View>
		);
	}

	handleUsernameInput = username => {
		this.setState({ username });
	};

	handlePasswordInput = password => {
		this.setState({ password });
	};
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignItems: 'flex-start',
	},
	label: {
		marginTop: 10,
		fontSize: 22,
	},
	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		width: 200,
		fontSize: 22,
	},
});
