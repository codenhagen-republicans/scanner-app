import { Container } from 'unstated';
import Config from 'react-native-config';

export default class UserContainer extends Container {
	state = {
		username: null,
		accessToken: '',
		refreshToken: '',
		submitting: false,
		errorMessage: null,
	};

	login = async (username, password) => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			console.log(JSON.stringify({ username, password }));
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string' ? body.message : 'Maybe?',
				username,
				accessToken: body.access_token,
				refreshToken: body.refresh_token,
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.message,
			});
		}
	};

	register = async (username, password) => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/registration`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string'
						? body.message
						: 'An error occurred.',
				username,
				accessToken: body.access_token,
				refreshToken: body.refresh_token,
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.message
			});
		}
	};

	logout = async () => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/logout/access`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.state.accessToken}`,
				},
			});

			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string' ? body.message : 'You were logged out.',
				username: null,
				accessToken: '',
				refreshToken: '',
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.message,
			});
		}
	};
}
