import { Container } from 'unstated';
import Config from 'react-native-config';

export default class LoginContainer extends Container {
	state = {
		username: null,
		token: '',
		refreshToken: '',
		errorMessage: null,
	};

	authenticate = async (username, password) => {
		try {
			const res = await fetch(`${Config.API_URL}/login`, {
				method: 'post',
				body: JSON.stringify({ username, password }),
			});
			const body = await res.json();

			console.log('Response body', body);
			this.setState({ errorMessage: 'Logged in…?' });
		} catch (e) {
			this.setState({ errorMessage: 'Error 😱' });
		}
	};
}
